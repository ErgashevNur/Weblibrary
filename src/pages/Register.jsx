import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast, Toaster } from "sonner";
import { useAppStore } from "../lib/zustand";

export const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formDataUser, setFormDataUser] = useState({
    memberName: "",
    age: null,
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const setUser = useAppStore((state) => state.setUser);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeMember = (e) => {
    setFormDataUser({ ...formDataUser, [e.target.name]: e.target.value });
  };

  console.log(formData);
  console.log(formDataUser);

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Parollar mos emas");
      return;
    }
    setLoading(true);
    try {
      const resRegister = await fetch(
        "https://library-1dmu.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formDataUser.memberName,
            email: formData.email,
            password: formData.password,
          }),
        },
      );

      if (resRegister.ok) {
        const data = await resRegister.json();
        console.log("Ro‘yxatdan o‘tish muvaffaqiyatli:", data);

        const resAddMember = await fetch(
          "https://library-1dmu.onrender.com/add_member",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              memberName: formDataUser.memberName,
              age: formDataUser.age,
            }),
          },
        );

        if (resAddMember.ok) {
          const addMemberData = await resAddMember.json();
          console.log("A'zo qo'shish muvaffaqiyatli:", addMemberData);
          setLoading(false);
          window.location.href = "/verification";
          setUser(resRegister || {});
        } else {
          setLoading(false);
          const error = await resAddMember.json();
          toast.error("Xatolik: " + error.message);
        }
      } else {
        setLoading(false);
        const error = await resRegister.json();
        toast.error("Xatolik: " + error.message);
      }
    } catch (err) {
      setLoading(false);
      console.error("Xatolik:", err);
      toast.error("Tizimda xatolik yuz berdi.");
    }

    localStorage.setItem("userEmail", formData.email);
  };

  return (
    <div className="mx-auto flex h-screen items-center justify-between bg-white">
      <img
        src="/SignUp.svg"
        className="h-full w-[50%] bg-[#C9AC8CED] px-[38px] py-[100px]"
        alt="SignUp"
      />

      <div className="mx-auto bg-white pb-[100px] pt-[123px] text-black">
        <h2 className="font-slab text-[40px] font-black">Register</h2>
        <p className="mb-[21px] mt-[5px] font-sans text-[13px] font-normal">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 underline">
            Login
          </a>
        </p>

        <div className="flex flex-col gap-5">
          <input
            name="memberName"
            type="text"
            placeholder="Username"
            value={formDataUser.memberName}
            onChange={handleChangeMember}
            className="w-[430px] rounded-xl border border-[#474747] px-[29px] py-[16px]"
          />
          <input
            name="age"
            type="number"
            placeholder="Age"
            value={formDataUser.age}
            onChange={handleChangeMember}
            className="w-[430px] rounded-xl border border-[#474747] px-[29px] py-[16px]"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-[430px] rounded-xl border border-[#474747] px-[29px] py-[16px]"
          />

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-[430px] rounded-xl border border-[#474747] px-[29px] py-[16px] pr-[50px]"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative">
            <input
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-[430px] rounded-xl border border-[#474747] px-[29px] py-[16px] pr-[50px]"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={() => setShowConfirm((prev) => !prev)}
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          onClick={handleRegister}
          className="mt-[39px] w-full max-w-[430px] rounded-full bg-[#152540] py-4 text-[18px] font-medium text-white"
        >
          {loading ? "Loading..." : "Next step"}
        </button>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
};
