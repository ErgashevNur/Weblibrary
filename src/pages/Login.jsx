import { useState } from "react";
import { Eye, EyeOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import signin from "/SignIn.svg";
import { toast, Toaster } from "sonner";
import { getFormData } from "../lib/utils";
import { login } from "../request";
import { useAppStore } from "../lib/zustand";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useAppStore((state) => state.setUser);
  const navigate = useNavigate(); // 🔥 ADD THIS

  async function handleSubmit(e) {
    e.preventDefault();
    const result = getFormData(e.target);
    setIsLoading(true);

    try {
      const res = await login(result);

      if (!res || res.status === "error" || !res.refreshtoken) {
        toast.error(res?.message || "Login muvaffaqiyatsiz");
        return;
      }

      toast.success("Xush kelibsiz!");
      setUser(res || {}); // user bo‘lsa o‘sha, bo‘lmasa bo‘sh obyekt

      // Refresh tokenni ildizdan olamiz
      const refreshToken = res.refreshtoken;

      // Tokenni localStorage ga saqlaymiz
      localStorage.setItem("refreshToken", refreshToken);

      // Token bilan refresh so‘rovini yuboramiz
      const tokenRes = await fetch(
        "https://library-1dmu.onrender.com/refresh",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
          credentials: "include",
        },
      );

      const tokenData = await tokenRes.json();
      console.log("Token yangilandi:", tokenData);

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      toast.error(err.message || "Loginda xatolik");
    } finally {
      setIsLoading(false);
    }

    // const data = res.json();
    // console.log("Access token:", data.access_token);

    // if (!tokenRes.ok) {
    //   toast.error("Access token olishda xatolik yuz berdi");
    //   console.log("Error:", tokenRes.text()); // Xatolikni to'liq tekshirish
    //   return;
    // }

    // const tokenData = tokenRes.json();
    // const accessToken = tokenData?.access_token;

    // if (accessToken) {
    //   // Access tokenni localStorage ga saqlash
    //   localStorage.setItem("access_token", accessToken);
    //   localStorage.setItem("refresh_token", refreshToken);

    //   // Agar user obyekt bo‘lsa:
    //   // setUser(res.user || res);
    //   toast.success("Xush kelibsiz!");
    // } else {
    //   toast.error("Access token olishda xatolik yuz berdi");
    // }
  }

  return (
    <div className="flex h-screen items-center bg-white">
      <img
        src={signin}
        className="h-full w-[50%] bg-[#C9AC8CED] px-[50px] py-[101px]"
        alt="Sign In Illustration"
      />

      <div className="mx-auto flex flex-col bg-white text-black">
        <form onSubmit={handleSubmit}>
          <h2 className="font-slab mb-5 text-left text-[40px] font-black">
            Sign in
          </h2>

          <p className="mb-[21px] mt-[5px] font-sans text-[13px] font-normal">
            Already have an account?{" "}
            <a className="text-blue-600 underline" href="/register">
              Register
            </a>
          </p>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4">
              <input
                className="w-50% rounded-xl border border-[#474747] px-[29px] py-[16px]"
                name="email"
                type="email"
                placeholder="Email"
                required
              />

              <div className="relative">
                <input
                  className="w-[430px] rounded-xl border border-[#474747] px-[29px] py-[16px] pr-12"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              Parolni unutdingizmi?{" "}
              <a
                href="/forgot-password"
                className="text-blue-600 underline hover:text-blue-800"
              >
                Qayta tiklash
              </a>
            </p>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="mt-[39px] w-full max-w-[430px] rounded-full bg-[#152540] py-[27px] text-[18px] font-medium text-white disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="animate-spin" /> Iltimos kuting...
              </>
            ) : (
              "Keyingi qadam"
            )}
          </Button>
        </form>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default Login;
