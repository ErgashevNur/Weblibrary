import { useEffect, useState } from "react";
import Authors from "../components/Authors";
import SearchSection from "../components/SearchSection";

function Jadidlar() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://library-1dmu.onrender.com/get_authors")
      .then((res) => res.json())
      .then((data) => {
        setAuthors(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API xatosi:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (query) => {
    fetch(
      `https://library-1dmu.onrender.com/search_authors?name=${encodeURIComponent(query)}`,
    )
      .then((res) => res.json())
      .then((data) => setAuthors(data))
      .catch((error) => console.error("Qidiruv xatosi:", error));
  };

  return (
    <>
      <SearchSection onSearch={handleSearch} />
      <Authors authors={authors} loading={loading} />
    </>
  );
}

export default Jadidlar;
