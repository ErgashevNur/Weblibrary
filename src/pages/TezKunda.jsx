import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Home, Instagram, Twitter } from "lucide-react";
import { buttonVariants } from "../components/ui/button";

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const countdownDate = new Date("2025-06-15T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = countdownDate - now;

      if (diff < 0) {
        clearInterval(interval);
        setTimeLeft("Tayyor!");
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft(
          `${days} kun ${hours} soat ${minutes} daqiqa ${seconds} soniya`,
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-black to-slate-800">
      {/* Poyezd animatsiyasi */}
      <img
        src="/13-30-08-292_512.webp"
        alt="Train"
        className="animate-train absolute bottom-6 z-0 w-96"
      />

      {/* Stansiyaga o‘xshatgan div */}
      <div className="relative z-10 w-[90%] max-w-xl rounded-t-3xl border-x border-t border-gray-500 bg-gradient-to-b from-gray-700 to-gray-900 px-6 py-8 text-center shadow-2xl">
        <div className="absolute -top-5 left-1/2 h-3 w-28 -translate-x-1/2 rounded-full bg-yellow-400 shadow-md blur-sm"></div>

        <h1 className="mb-4 text-4xl font-bold tracking-wider md:text-5xl">
          Tez kunda!
        </h1>
        <p className="mb-6 text-lg">
          Yangi tajriba, yangi imkoniyatlar... Saytimiz ustida ishlayapmiz.
        </p>
        <div className="mb-6 font-mono text-xl">{timeLeft}</div>
        <div className="mb-4 flex justify-center gap-2 text-black">
          <a
            href="/"
            className={buttonVariants({
              variant: "outline",
            })}
          >
            <Home /> Asosiy sahifa
          </a>
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <Facebook className="h-6 w-6 cursor-pointer hover:text-blue-500" />
          <Instagram className="h-6 w-6 cursor-pointer hover:text-pink-500" />
          <Twitter className="h-6 w-6 cursor-pointer hover:text-sky-400" />
        </div>
        <div className="mt-6 h-2 w-full rounded-full bg-yellow-500 opacity-50 blur-sm" />
      </div>

      <style jsx>{`
        @keyframes train {
          0% {
            transform: translateX(100vw);
          }
          100% {
            transform: translateX(-100vw);
          }
        }

        .animate-train {
          animation: train 12s linear infinite;
        }
      `}</style>
    </div>
  );
}
