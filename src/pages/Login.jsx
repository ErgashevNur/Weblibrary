import { useState } from "react";
import { Eye, EyeOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import signin from "/SignIn.svg";
import { toast, Toaster } from "sonner";
import { getFormData } from "../lib/utils";
import { login } from "../request";
import { useAppStore } from "../lib/zustand";
import { useLocation, useNavigate } from "react-router-dom";

// react-router-dom 
import { Link } from "react-router-dom";

function Login() {
  // userning inputdan olingan malumoti
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // input malumotlarini saqlash uchun
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // login funksiya 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await login(formData);
      console.log(res, "user muvafaqqiyatli login qildi!!!");
      // refresh tokenni localstoragega saqlsh 
      localStorage.setItem("refreshToken", res.refreshToken)
    }
    catch (error) {
      console.log("login err", error.message);
      toast.error(error.message || "Nimadir xato ketti qaytadan urinib koring.");
    }
    finally { setIsLoading(false) };
  };

  return (
    <div className="flex h-screen items-center bg-white">
      {/* right image */}
      <img
        src={signin}
        className="h-full w-[50%] bg-[#C9AC8CED] px-[50px] py-[101px]"
        alt="Sign In Illustration"
      />

      {/* left form  */}
      <div className="mx-auto flex flex-col bg-white text-black">
        <form onSubmit={handleSubmit}>
          <h2 className="font-slab mb-5 text-left text-[40px] font-black">
            Sign in
          </h2>

          <p className="mb-[21px] mt-[5px] font-sans text-[13px] font-normal">
            Already have an account?
            <Link className="text-blue-600 underline" to="/register">
              Register
            </Link>
          </p>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4">

              {/* email  */}
              <input
                className="w-50% rounded-xl border border-[#474747] px-[29px] py-[16px]"
                name="email"
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
              />

              <div className="relative">

                {/* password  */}
                <input
                  className="w-[430px] rounded-xl border border-[#474747] px-[29px] py-[16px] pr-12"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
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
