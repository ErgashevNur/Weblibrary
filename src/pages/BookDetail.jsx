import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  AudioLinesIcon,
  Book,
  Loader2,
  MessageSquare,
  Send,
  Star,
  ChevronRight,
  MessagesSquare,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FaFilePdf } from "react-icons/fa";
import { Skeleton } from "../components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { toast, Toaster } from "sonner";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("read");
  const [rating, setRating] = useState(5);

  const formatNumber = (num) => {
    return num ? num.toLocaleString("ru-RU").replace(/,/g, " ") : "0";
  };

  const capitalizeName = (name) => {
    return name?.charAt(0).toUpperCase() + name?.slice(1).toLowerCase();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [commentsRes, bookRes, booksRes] = await Promise.all([
          fetch("https://library-1dmu.onrender.com/get_comments"),
          fetch(`https://library-1dmu.onrender.com/get_one_book/${id}`),
          fetch("https://library-1dmu.onrender.com/get_books"),
        ]);

        const [commentsData, bookData, booksData] = await Promise.all([
          commentsRes.json(),
          bookRes.json(),
          booksRes.json(),
        ]);

        setComments(commentsData);
        setBook(bookData);
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    const token = localStorage.getItem("token"); // login paytida saqlangan token

    fetch(`https://library-1dmu.onrender.com/add_to_shelf/${book._id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Xatolik: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Kitob muvaffaqiyatli qo‘shildi:", data);
        // Masalan: alert('Qo‘shildi') yoki UI yangilash
      })
      .catch((err) => {
        console.error("Xatolik:", err.message);
        // Masalan: alert('Qo‘shib bo‘lmadi')
      });
  };

  async function refreshAccessToken() {
    const rToken = localStorage.getItem("refreshToken");

    console.log(rToken);

    const res = await fetch("https://library-1dmu.onrender.com/refresh", {
      method: "POST",

      headers: {
        refreshtoken: rToken,
      },
    });

    const data = await res.json();
    console.log(data);

    return data.accessToken;
  }

  refreshAccessToken()
    .then((token) => console.log(token))
    .catch((err) => console.error(err));

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    setCommentLoading(true);
    try {
      // YUBORISH (API chaqiruvi)
      const response = await fetch(
        "https://library-1dmu.onrender.com/add_comment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment: newComment,
            rating: rating,
          }),
        },
      );

      const data = await response.json();

      // Faqatgina backend muvaffaqiyatli bo‘lsa, qo‘shish
      if (response.ok) {
        setComments([...comments, data]); // Backenddan qaytgan komment
        setNewComment("");
        setActiveTab("read");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading || !book) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="ml-16 mt-5 flex gap-8 p-4">
          <Skeleton className="h-[500px] w-[350px] rounded-lg bg-slate-500" />
          <div className="space-y-2">
            <div className="mb-4 flex flex-col gap-5">
              <Skeleton className="h-6 w-[250px] bg-slate-600" />
              <Skeleton className="h-5 w-[200px] bg-slate-600" />
            </div>
            <Skeleton className="h-3 w-[250px] bg-slate-600" />

            <div className="pb-5 pt-5">
              <Skeleton className="h-36 w-[800px] bg-slate-600" />
            </div>
            <Skeleton className="h-6 w-[150px] bg-slate-600" />

            <div className="flex items-center gap-4 pb-4 pt-2">
              <Skeleton className="h-[84px] w-[200px] bg-slate-600" />
              <Skeleton className="h-[84px] w-[200px] bg-slate-600" />
              <Skeleton className="h-[84px] w-[200px] bg-slate-600" />
            </div>

            <Skeleton className="h-[50px] w-[230px] bg-slate-600" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <div className="ml-16 px-4 py-8">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex-shrink-0">
            <img
              src={book?.img || "/placeholder-book.jpg"}
              alt={book?.title}
              className="h-[500px] w-[350px] rounded-xl object-cover shadow-lg transition-all hover:shadow-xl"
            />
          </div>

          <div className="flex-1">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold capitalize text-[#e8c282]">
                {book?.title}
              </h1>
              <p className="text-xl capitalize text-[#e8c282]">
                {capitalizeName(book?.author)}
              </p>

              <div className="flex gap-4 text-sm text-gray-400">
                <span>Sahifalar: {book?.pages}</span>
                <span>|</span>
                <span>Nashr yili: {book?.year}</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-[#C9AC8C]" />
                <h3 className="text-lg font-semibold text-[#C9AC8C]">
                  Kitob haqida
                </h3>
              </div>
              <p className="mt-2 text-gray-300">{book?.description}</p>
            </div>

            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-[#C9AC8C]">
                Formatlar
              </h3>
              <div className="flex gap-4">
                <div className="w-full max-w-[180px] cursor-default rounded-lg bg-[#1e1e1e] p-3">
                  <div className="mt-1 flex items-center gap-3">
                    <Book className="h-5 w-5 text-[#C9AC8C]" />
                    <span className="text- font-medium">Qog'oz kitob</span>
                  </div>
                  <p className="mt-2 text-sm font-black">
                    {formatNumber(Number(book?.price))} so'm
                  </p>
                </div>

                <div className="w-full max-w-[180px] cursor-not-allowed rounded-lg bg-[#1e1e1e] p-4 opacity-70">
                  <div className="flex items-center gap-3">
                    <AudioLinesIcon className="h-5 w-5 text-gray-500" />
                    <span className="font-medium text-gray-500">
                      Audio kitob
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-black text-gray-500">
                    Mavjud emas
                  </p>
                </div>

                <div className="w-full max-w-[180px] cursor-not-allowed rounded-lg bg-[#1e1e1e] p-4 opacity-70">
                  <div className="flex items-center gap-3">
                    <FaFilePdf className="h-6 w-6 text-gray-500" />
                    <span className="font-medium text-gray-500">
                      Elektron kitob
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-black text-gray-500">
                    Mavjud emas
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              className="mt-6 h-12 bg-[#C9AC8C] px-8 text-[#3C2710] hover:bg-[#d4b78a]"
            >
              <Plus className="text-[#3C2710]" />
              Javonga qo'shish
            </Button>
          </div>
        </div>

        {/* Izohlar bo'limi */}
        <div className="mt-16">
          <div className="mb-8 flex items-center gap-3">
            <MessagesSquare className="h-6 w-6 text-[#C9AC8C]" />
            <h2 className="text-2xl font-bold text-[#C9AC8C]">
              Fikr-mulohazalar
            </h2>
            <span className="ml-2 rounded-full bg-[#C9AC8C] px-2 py-1 text-xs font-bold text-[#3C2710]">
              {comments.length}
            </span>
          </div>

          {/* Tab navigatsiya */}
          <div className="mb-6 flex border-b border-[#333]">
            <button
              className={`flex items-center gap-2 px-4 py-2 ${
                activeTab === "read"
                  ? "border-b-2 border-[#C9AC8C] text-[#C9AC8C]"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("read")}
            >
              <MessageSquare className="h-5 w-5" />
              <span>O'qish</span>
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 ${
                activeTab === "write"
                  ? "border-b-2 border-[#C9AC8C] text-[#C9AC8C]"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("write")}
            >
              <Send className="h-5 w-5" />
              <span>Yozish</span>
            </button>
          </div>

          {activeTab === "read" ? (
            <>
              {/* Tasodifiy 2 ta komment */}
              <div className="flex gap-4">
                {comments
                  .sort(() => 0.5 - Math.random())
                  .slice(0, 2)
                  .map((comment) => (
                    <div
                      key={comment._id}
                      className="w-[500px] rounded-2xl border border-[#333] p-4 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#e8c282]">
                          {comment.member_info?.memberName
                            ? capitalizeName(comment.member_info.memberName)
                            : "Foydalanuvchi"}
                        </span>
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              fill={
                                i < (comment.rating || 5) ? "#fbbf24" : "none"
                              }
                              stroke="#fbbf24"
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {comment.date}
                      </span>
                      <div className="mt-2">
                        <strong className="text-[#C9AC8C]">Izoh: </strong>
                        <span className="text-gray-300">{comment.comment}</span>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Barcha kommentlarni ko'rish tugmasi */}
              <div className="mt-10 flex justify-center">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-[#C9AC8C] text-gray-950 hover:bg-gray-600/10 hover:text-white"
                  onClick={() => navigate(`/book/comments`)}
                >
                  Barcha fikrlarni ko'rish ( {comments.length} )
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            /* Koment yozish formasi */
            <div className="rounded-xl bg-[#1e1e1e] p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-semibold text-[#e8c282]">
                Fikringizni qoldiring
              </h3>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[120px] bg-[#2b2b2b] text-white placeholder-gray-500 focus:border-[#C9AC8C] focus-visible:ring-[#C9AC8C]"
                    placeholder="Kitob haqida fikringiz..."
                  />
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={24}
                          className="cursor-pointer"
                          fill={i < rating ? "#fbbf24" : "none"}
                          stroke="#fbbf24"
                          onClick={() => setRating(i + 1)}
                        />
                      ))}
                    </div>
                    <Button
                      onClick={handleSubmitComment}
                      disabled={commentLoading || !newComment.trim()}
                      className="flex items-center gap-2 bg-[#C9AC8C] text-[#3C2710] hover:bg-[#d4b78a]"
                    >
                      {commentLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Yuborish</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tavsiya etilgan kitoblar */}
        <div className="mt-20">
          <h2 className="mb-8 text-2xl font-bold text-[#C9AC8C]">
            Sizga yoqishi mumkin
          </h2>
          <ScrollArea className="w-full">
            <div className="flex w-full gap-6 pb-4">
              {books.map((book) => (
                <div
                  key={book._id}
                  onClick={() => navigate(`/book/${book._id}`)}
                  className="group w-40 flex-shrink-0 cursor-pointer"
                >
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={book.img}
                      alt={book.title}
                      className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-2 line-clamp-1 text-sm font-medium group-hover:text-[#C9AC8C]">
                    {book.title}
                  </h3>
                  <p className="line-clamp-1 text-xs text-gray-500">
                    {capitalizeName(book.author)}
                  </p>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default BookDetails;
