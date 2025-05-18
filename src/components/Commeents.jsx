import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { MessageSquare, ChevronLeft, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "../components/ui/skeleton";

function AllCommentsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("newest"); // 'newest' yoki 'oldest'

  const capitalizeName = (name) => {
    return name?.charAt(0).toUpperCase() + name?.slice(1).toLowerCase();
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://library-1dmu.onrender.com/get_comments",
        );
        const data = await response.json();

        // Agar kommentlarda date maydoni string bo'lsa, uni Date objectga o'tkazamiz
        const processedComments = data.map((comment) => ({
          ...comment,
          dateObject: new Date(
            comment.date.replace(/(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3"),
          ),
        }));

        setComments(processedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [id]);

  const sortedComments = [...comments].sort((a, b) => {
    if (sortOrder === "newest") {
      return b.dateObject - a.dateObject;
    } else {
      return a.dateObject - b.dateObject;
    }
  });

  const formatDate = (dateString) => {
    // "21:51, 21.1.2025" formatini "21:51, 21-yanvar, 2025" ga o'zgartiramiz
    const [time, date] = dateString.split(", ");
    const [day, month, year] = date.split(".");

    const monthNames = [
      "yanvar",
      "fevral",
      "mart",
      "aprel",
      "may",
      "iyun",
      "iyul",
      "avgust",
      "sentabr",
      "oktabr",
      "noyabr",
      "dekabr",
    ];

    return `${time}, ${day}-${monthNames[parseInt(month) - 1]}, ${year}`;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#121212]">
        <Navbar />
        <div className="mx-auto mt-10 w-full max-w-4xl p-4">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-[#C9AC8C] text-[#C9AC8C] hover:bg-[#C9AC8C]/10"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Orqaga</span>
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2 border-[#C9AC8C] text-[#C9AC8C] hover:bg-[#C9AC8C]/10"
            onClick={() =>
              setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
            }
          >
            <ArrowUpDown className="h-4 w-4" />
            <span>{sortOrder === "newest" ? "Eskilari" : "Yangilari"}</span>
          </Button>
        </div>

        <div className="mb-8 flex items-center gap-3">
          <MessageSquare className="h-6 w-6 text-[#C9AC8C]" />
          <h2 className="text-2xl font-bold text-[#C9AC8C]">
            {sortOrder === "newest" ? "Eng yangi fikrlar" : "Eng eski fikrlar"}
          </h2>
          <span className="ml-2 rounded-full bg-[#C9AC8C] px-2 py-1 text-xs font-bold text-[#3C2710]">
            {comments.length}
          </span>
        </div>

        <div className="space-y-6">
          {sortedComments.length > 0 ? (
            sortedComments.map((comment) => (
              <div
                key={comment._id}
                className="rounded-xl border border-[#333] bg-[#1e1e1e] p-6 shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-[#e8c282]">
                      {capitalizeName(comment.member_info?.memberName)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(comment.date)}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-gray-300">{comment.comment}</p>
              </div>
            ))
          ) : (
            <div className="rounded-xl bg-[#1e1e1e] p-8 text-center">
              <MessageSquare className="mx-auto h-10 w-10 text-gray-600" />
              <p className="mt-4 text-gray-400">Hozircha izohlar mavjud emas</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllCommentsPage;
