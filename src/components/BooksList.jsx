import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function BooksList({ books, loading }) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <Button className="mx-auto my-12 flex items-center" disabled>
        <Loader2 className="animate-spin" />
        Malumotlar yuklanmoqda...
      </Button>
    );
  }

  if (books?.length === 0) {
    return (
      <div className="my-20 text-center">
        <h2 className="text-lg font-semibold">Hech qanday kitob topilmadi.</h2>
      </div>
    );
  }

  return (
    <ul className="mt-5 grid grid-cols-6 justify-center gap-5 space-y-2 px-20">
      {books?.map((book) => (
        <li
          key={book?._id}
          className="mt-2 w-[200px] transform cursor-pointer overflow-hidden rounded-lg p-4 shadow-md transition-transform hover:scale-105"
          onClick={() => navigate(`/book/${book._id}`)}
        >
          <img
            src={book?.img}
            alt={book?.title}
            className="h-60 w-full rounded-lg object-cover"
          />
          <h3 className="mt-2 font-dancing text-[20px] font-normal uppercase">
            {book?.title}
          </h3>
          <p className="text-[12px] font-light capitalize text-gray-600">
            {book?.author}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default BooksList;
