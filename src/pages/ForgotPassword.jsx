import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://library-1dmu.onrender.com/get_forgot_password_code",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      if (res.ok) {
        setSuccess(true);
        setError("");
        setResendMessage("");
      } else {
        const err = await res.json();
        setError(err.message || "Noma'lum xatolik");
      }
    } catch (err) {
      setError("Tizimda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      const res = await fetch(
        "https://library-1dmu.onrender.com/resend_recover_password_code",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      if (res.ok) {
        setResendMessage("Kod qayta yuborildi.");
      } else {
        const err = await res.json();
        setResendMessage("Xatolik: " + (err.message || "Yuborib bo‘lmadi"));
      }
    } catch (err) {
      setResendMessage("Tizimda xatolik yuz berdi");
    } finally {
      setIsResending(false);
    }
  };

  const ranglar = [
    "#A0E7E5", // pastel cyan
    "#B4F8C8", // mint green
    "#FBE7C6", // soft peach
    "#FFAEBC", // soft pink
    "#BDB2FF", // lavender
    "#FFC6FF", // pinkish violet
    "#FFFFD2", // soft yellow
  ];
  const [currentColor, setCurrentColor] = useState(ranglar[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setCurrentColor(ranglar[index]);
      index = (index + 1) % ranglar.length;
    }, 2000);

    return () => clearInterval(interval); // tozalash
  }, []);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Oldingi sahifaga qaytadi
  };

  return (
    <div
      className="flex h-screen items-center justify-center px-4 font-sans"
      style={{
        backgroundColor: currentColor,
        transition: "background-color 1.5s ease",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white/70 p-8 shadow-xl backdrop-blur-xl">
        {/* Orqaga qaytish tugmasi */}
        <Button
          variant="outline"
          onClick={handleBack}
          className="mb-6 flex items-center gap-1 text-sm font-bold text-blue-700 transition-colors hover:text-blue-900"
        >
          <ArrowLeft /> Orqaga qaytish
        </Button>

        {/* Sarlavha */}
        <h2 className="mb-6 text-center text-3xl text-gray-800">
          Parolni Tiklash
        </h2>

        {success ? (
          <>
            <p className="mb-4 text-center text-sm text-green-700">
              Emailga reset havola yuborildi. Tekshirib ko‘ring.
            </p>
            <Button
              onClick={handleResend}
              disabled={isResending}
              className="mx-auto block text-sm text-blue-600 underline hover:text-blue-800 disabled:opacity-50"
            >
              {isResending ? "Qayta yuborilmoqda..." : "Kodni qayta yuborish"}
            </Button>
            {resendMessage && (
              <p className="mt-4 text-center text-sm text-gray-700">
                {resendMessage}
              </p>
            )}
          </>
        ) : (
          <>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email manzilingiz
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              required
            />
            {error && (
              <p className="mb-3 text-center text-sm text-red-600">{error}</p>
            )}
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="mx-auto animate-spin" />
              ) : (
                "Parolni tiklash havolasini yuborish"
              )}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
