import { useState } from "react";
import { Eye, EyeOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import signin from "/SignIn.svg";
import { toast, Toaster } from "sonner";
import { login } from "../request";

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
    <div className="flex h-screen items-center justify-between bg-white text-black">
      {/* right image */}
      <img
        src={signin}
        className="h-full w-[50%] bg-[#C9AC8CED] px-[50px] py-[101px]"
        alt="Sign In Illustration"
      />

      {/* left form  */}
      <form className="max-w-[330px] w-full space-y-5" onSubmit={handleSubmit}>
        <p className="text-[40px] font-extrabold">
          Sign in
        </p>

        <p>
          Already have an account?
          <Link className="text-blue-700 hover:text-blue-500 underline ml-2" to="/register">
            Register
          </Link>
        </p>


        {/* email  */}
        <input
          className="w-full rounded-xl border border-[#B4B4BB] px-5 py-3"
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
            className="w-full rounded-xl border border-[#B4B4BB] py-3 px-5 pr-12"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />

          {/* eye button  */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <p>
          Parolni unutdingizmi?
          <Link
            to="/forgot-password"
            className="text-blue-700 underline hover:text-blue-500 ml-2"
          >
            Qayta tiklash
          </Link>
        </p>


        {/* submit btn  */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-[#152540] text-white text-[18px] font-bold py-6 hover:bg-[#1d3257]"
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
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default Login;
