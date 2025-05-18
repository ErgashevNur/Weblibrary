import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleReset = async () => {
    if (newPassword !== confirm) {
      setError("Parollar mos emas");
      return;
    }

    try {
      const res = await fetch(
        "https://library-1dmu.onrender.com/verify_forgot_password_code",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password: newPassword }),
        },
      );

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        const err = await res.json();
        setError(err.message || "Xatolik yuz berdi");
      }
    } catch (err) {
      setError("Tizimda xatolik yuz berdi");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="w-[400px] rounded-lg border p-10 shadow">
        <h2 className="mb-4 text-2xl font-bold">Reset Password</h2>

        {success ? (
          <p className="text-green-600">
            Parol yangilandi. Login sahifasiga yo‘naltirilmoqda...
          </p>
        ) : (
          <>
            <input
              type="password"
              placeholder="Yangi parol"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mb-3 w-full rounded border px-4 py-2"
            />
            <input
              type="password"
              placeholder="Parolni tasdiqlang"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mb-3 w-full rounded border px-4 py-2"
            />
            {error && <p className="mb-2 text-red-600">{error}</p>}
            <button
              onClick={handleReset}
              className="w-full rounded bg-green-600 py-2 text-white"
            >
              Reset password
            </button>
          </>
        )}
      </div>
    </div>
  );
}
