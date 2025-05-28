import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Globe } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "../components/ui/skeleton";

function AuthorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const capitalizeSentence = (text) => {
    return text
      ?.split(". ")
      .map(
        (sentence) =>
          sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase(),
      )
      .join(". ");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const year = date.getFullYear();
    const uzMonths = [
      "Yan",
      "Fev",
      "Mart",
      "Apr",
      "May",
      "Iyun",
      "Iyul",
      "Avg",
      "Sen",
      "Okt",
      "Noy",
      "Dek",
    ];
    const month = uzMonths[date.getMonth()];
    return `${day}-${month} ${year}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const authorRes = await fetch(
          `https://library-1dmu.onrender.com/get_one_author/${id}`,
        );
        const authorData = await authorRes.json();
        setAuthor(authorData);

        const booksRes = await fetch(
          "https://library-1dmu.onrender.com/get_books",
        );
        const booksData = await booksRes.json();

        const authorBooks = booksData.filter(
          (book) =>
            authorData.full_name?.toLowerCase() === book.author?.toLowerCase(),
        );

        setBooks(authorBooks);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading || !author) {
    return (
      <div className="flex min-h-screen flex-col bg-[#121212]">
        <Navbar />
        <div className="mx-auto mt-10 flex w-full max-w-6xl gap-8 p-4">
          <Skeleton className="h-[500px] w-[350px] rounded-xl" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex-shrink-0">
            <img
              src={author?.img || "/placeholder-book.jpg"}
              alt={author?.full_name}
              className="h-[500px] w-[350px] rounded-xl object-cover shadow-lg transition-all hover:shadow-xl"
            />
            <div className="mt-10 flex gap-4 text-sm text-gray-300">
              <p className="flex flex-col">
                Tavallud sanasi:
                <span className="mt-3 font-dancing text-[30px]">
                  {formatDate(author?.dateOfBirth)}
                </span>
              </p>
              <span className="h-16 w-[1px] bg-gray-500"></span>
              <p className="flex flex-col">
                Vafot sanasi:
                <span className="mt-3 font-dancing text-[30px]">
                  {formatDate(author?.dateOfDeath)}
                </span>
              </p>
            </div>
          </div>

          <div className="flex-1">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-[#e8c282]">
                {author?.full_name}
              </h1>
              <p className="text-xl text-[#e8c282]">
                {capitalizeSentence(author?.bio)}
              </p>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-[#C9AC8C]" />
                <h3 className="text-lg font-semibold text-[#C9AC8C]">
                  {author?.country}
                </h3>
              </div>

              <div className="mt-20">
                <h2 className="mb-8 text-2xl font-bold text-[#C9AC8C]">
                  Asarlari
                </h2>
                <ScrollArea className="w-full">
                  <div className="flex gap-6 pb-4">
                    {books.length > 0 ? (
                      books.map((book) => (
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
                        </div>
                      ))
                    ) : (
                      <p className="italic text-gray-400">
                        Muallifning kitoblari mavjud emas.
                      </p>
                    )}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorDetails;
