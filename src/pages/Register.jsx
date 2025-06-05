import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Agar iconlar kerak bo'lsa
import { toast, Toaster } from "sonner";

// react router dom 
import { Link } from "react-router-dom";

export const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "", // confirmPassword ni ham qo'shdik
  });

  const [formDataUser, setFormDataUser] = useState({
    memberName: "",
    age: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeMember = (e) => {
    setFormDataUser({ ...formDataUser, [e.target.name]: e.target.value });
  };

  console.log(formData);
  console.log(formDataUser);

  const handleRegister = async () => {
    // Parollarni tekshirish
    if (formData.password !== formData.confirmPassword) {
      toast.error("Parollar mos emas");
      return;
    }
    setLoading(true);
    try {
      // Register endpointiga so'rov yuborish
      const resRegister = await fetch(
        "https://library-1dmu.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formDataUser.memberName, // username ni formDataUser.memberName dan olamiz
            email: formData.email,
            password: formData.password,
          }),
        },
      );

      if (resRegister.ok) {
        const data = await resRegister.json();
        console.log("Ro‘yxatdan o‘tish muvaffaqiyatli:", data);

        // addMember endpointiga so'rov yuborish
        const resAddMember = await fetch(
          "https://library-1dmu.onrender.com/add_member",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              memberName: formDataUser.memberName, // formDataUser'dan memberName ni olamiz
              age: formDataUser.age,
            }),
          },
        );

        if (resAddMember.ok) {
          const addMemberData = await resAddMember.json();
          console.log("A'zo qo'shish muvaffaqiyatli:", addMemberData);
          setLoading(false);
          window.location.href = "/";
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
  };

  return (
    <div className="mx-auto flex h-screen items-center justify-between bg-white">
      <img
        src="/SignUp.svg"
        className="h-full w-[50%] bg-[#C9AC8CED]"
        alt="sign up page image"
      />

      <div className="mx-auto bg-white text-black space-y-3">
        <h2 className="font-extrabold text-[40px]">Sign up</h2>

        <p>
          Don't have an account?
          <Link className="text-blue-700 hover:text-blue-500 underline ml-2" to="/login">
            Login
          </Link>
        </p>

        <div className="flex flex-col max-w-[330px] w-full space-y-3">
          <input
            name="memberName"
            type="text"
            placeholder="Username"
            value={formDataUser.memberName}
            onChange={handleChangeMember}
            className="w-full rounded-xl border border-[#B4B4BB] px-5 py-3"
          />
          <input
            name="age"
            type="number"
            placeholder="Age"
            value={formDataUser.age}
            onChange={handleChangeMember}
            className="rounded-xl border border-[#B4B4BB] px-5 py-3"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="rounded-xl border border-[#B4B4BB] px-5 py-3"
          />

          {/* Password */}
          <div className="relative w-full">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#B4B4BB] px-5 py-3"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative w-full">
            <input
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#B4B4BB] px-5 py-3"
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
          className="w-full rounded-full bg-[#152540] text-white text-[18px] font-bold py-3 hover:bg-[#1d3257]"
        >
          {loading ? "Loading..." : "Next step"}
        </button>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
};
