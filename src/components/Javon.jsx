import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
import Navbar from "./Navbar";

function Javon() {
  // const { cartItems } = useCart();
  const navigate = useNavigate();

  // if (cartItems.length === 0) {
  return (
    <div
      className="flex h-screen flex-col bg-[length:800px_850px] bg-[position:950px_100px] bg-no-repeat"
      style={{ backgroundImage: "url('/bg.svg')" }}
    >
      <Navbar />
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <img
          src="/no-book.png"
          alt="No books"
          className="h-60 w-60 object-contain"
        />
        <p className="text-center text-xl font-semibold text-white">
          Javon hozircha bo'sh
        </p>
        <p className="max-w-xs text-center text-sm text-gray-400">
          Sevimli kitoblaringizni qo‘shish uchun katalogdan tanlang va "Javonga
          qo‘shish" tugmasini bosing.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
        >
          Katalogga qaytish
        </button>
      </div>
    </div>
  );
}

// return (
<div>
  <Navbar />
  {/* {cartItems.map((item, idx) => (
        <p key={idx}>
          {item.title} — {item.price} so'm
        </p>
      ))} */}

  {/* <ul className="mt-5 grid grid-cols-6 justify-center gap-5 space-y-2 px-20">
      {cartItems?.map((book) => (
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
    </ul> */}
</div>;
// );
// }

export default Javon;
