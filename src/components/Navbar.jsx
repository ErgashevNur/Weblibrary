import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaAngleDown, FaAngleUp, FaUser } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { MdSecurity } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from "../lib/zustand";
import { Button } from "./ui/button";

function Navbar({ className }) {
  const [isUp, setIsUp] = useState(false);
  const user = useAppStore((state) => state.user);

  const menus = [
    {
      txt: "Bosh sahifa",
      url: "/",
    },
    {
      txt: "Nasr",
      url: "/*",
    },
    {
      txt: "Nazm",
      url: "/*",
    },
    {
      txt: "Maqola",
      url: "/*",
    },
    {
      txt: "Forum",
      url: "/*",
    },
  ];

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("https://library-1dmu.onrender.com/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/login", { replace: true });
    }
  };

  const logout = useAppStore((state) => state.logout);
  const Logout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className={`${className} mt-[25px] flex items-center justify-between pb-[25px]`}
    >
      <h1 className="ml-[81px] mr-96 font-dancing text-[25px] uppercase text-[#C9AC8C]">
        <a href="/">badiiyat</a>
      </h1>

      <ul className="mt-5 flex items-center gap-[35px]">
        {menus.map((menu, index) => (
          <li className="mb-[25px] text-white hover:underline" key={index}>
            <a href={menu.url}>{menu.txt}</a>
          </li>
        ))}
      </ul>

      {user ? (
        <div className="mr-[81px]">
          <DropdownMenu onOpenChange={(open) => setIsUp(open)}>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-3 focus:outline-none focus:ring-0">
                <CgProfile className="h-[35px] w-[35px]" />
                {isUp ? <FaAngleUp size={20} /> : <FaAngleDown size={20} />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to="/profile">
                <DropdownMenuItem>
                  <CgProfile /> Profil
                </DropdownMenuItem>
              </Link>
              <Link to="/security">
                <DropdownMenuItem>
                  <MdSecurity />
                  Xavfsizlik
                </DropdownMenuItem>
              </Link>
              <Link to="/kitoblar_javoni">
                <DropdownMenuItem>
                  <IoLibrary /> Kitoblar javoni
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={Logout}>
                <LogOutIcon /> Chiqish
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Button
          variant="outline"
          className="mr-20 text-black"
          onClick={() => {
            navigate("/login");
          }}
        >
          Kirish
        </Button>
      )}
    </div>
  );
}

export default Navbar;
