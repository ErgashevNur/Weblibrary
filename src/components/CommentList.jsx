import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CommentList({ bookId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://library-1dmu.onrender.com/get_comments")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (comment) => comment.book_info?._id === bookId,
        );
        setComments(filtered);
        setLoading(false);
        console.log(filtered);
      })
      .catch((err) => {
        console.error("Xatolik:", err);
        setLoading(false);
      });
  }, [bookId]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (comments.length === 0) {
    return <p className="text-center text-muted-foreground">Kommentlar yo'q</p>;
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      {comments.map((comment) => (
        <Card key={comment._id} className="mb-4">
          {comment.book_info?.title && (
            <div className="text-sm text-muted-foreground">
              Kitob: {comment.book_info.title}
            </div>
          )}

          <CardContent className="space-y-1">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>@{comment.member_info?.memberName || "Foydalanuvchi"}</span>
              <span>{comment.date}</span>
            </div>
            <p className="text-base">{comment.comment}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
