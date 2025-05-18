// MainLayout.jsx
import Navbar from "../components/Navbar";
import { HeaderCorusel } from "../components/HeaderCorusel";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

function MainLayout() {
  return (
    <div
      className="min-h-screen bg-no-repeat"
      style={{
        backgroundImage: "url('/bg.svg')",
        backgroundSize: "1000px 900px",
        backgroundPosition: "860px 450px",
      }}
    >
      <Navbar className="border-b border-[#292929]" />
      <HeaderCorusel />
      <Outlet /> {/* Bu yerda sizning sahifalar joylashadi */}
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default MainLayout;
