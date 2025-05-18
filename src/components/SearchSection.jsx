import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

function SearchSection({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      return;
    }
    onSearch(searchQuery);
  };

  const category = [
    { title: "Badiiy kitoblar", href: "/" },
    { title: "Jadid adabiyoti", href: "/authors" },
    // { title: "Temuriylar davri", href: "#" },
    // { title: "Sovet davri", href: "#" },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section>
      <div className="shadow[0px_0px_0px_3px_rgba(77,77,77,1)] relative bottom-[45px] mx-auto flex max-w-[1200px] flex-col items-center justify-center rounded-xl bg-[#191919] px-32 shadow-lg">
        <h2 className="pt-[39px] text-center font-dancing text-[31px] uppercase text-[#C9AC8C]">
          Qidirish
        </h2>

        <div className="flex items-center gap-[15px] pb-[35px] pt-[13px]">
          <input
            className="w-[709px] rounded-xl bg-[#404040] px-[27px] py-[12px]"
            placeholder="Adiblar, kitoblar, aftorlar..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button
            className="flex items-center gap-3 rounded-xl bg-[#C9AC8C] px-[37px] py-[12px] text-[16px] text-[#3C2710]"
            onClick={handleSearch}
          >
            <Search className="text-[#3C2710]" /> Izlash
          </button>
        </div>
      </div>

      {/* Kategoriya qismi */}
      <div className="flex flex-col items-center justify-center gap-[40px] text-center">
        <h2 className="font-dancing text-[35px] uppercase text-[#C9AC8C]">
          Asosiy Kategoriyalar
        </h2>

        <ul className="font-steinbeck flex items-center gap-[60px] text-[20px]">
          {category.map((item, index) => (
            <li
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`cursor-pointer tracking-wide transition-colors duration-200 ${
                activeIndex === index
                  ? "text-[#C9AC8C]"
                  : "hover:text-[#C9AC8C]"
              }`}
            >
              <Link to={item.href}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default SearchSection;
