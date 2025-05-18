import { useEffect, useState } from "react";
import SearchSection from "../components/SearchSection";
import BooksList from "../components/BooksList";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://library-1dmu.onrender.com/get_books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API xatosi:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (query) => {
    fetch(
      `https://library-1dmu.onrender.com/search_books?title=${encodeURIComponent(query)}`,
    )
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Qidiruv xatosi:", error));
  };

  return (
    <>
      <SearchSection onSearch={handleSearch} />
      <BooksList books={books} loading={loading} />
    </>
  );
}

export default Home;
