import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerificationPage = () => {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      setError("Email topilmadi. Iltimos, qayta ro'yxatdan o'ting.");
    }
  }, []);

  const handleSubmit = async () => {
    if (!email) return;

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://library-1dmu.onrender.com/resend_verification_code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, code }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        navigate("/");
      } else {
        setError(data.message || "Xatolik yuz berdi.");
      }
    } catch (err) {
      setError("Server bilan aloqa yo‘q.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Verification</h2>
      <p>
        Email: <strong>{email}</strong>
      </p>
      <input
        type="text"
        placeholder="Verification code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={styles.input}
        className="text-black"
      />
      <button onClick={handleSubmit} style={styles.button} disabled={loading}>
        {loading ? "Tekshirilmoqda..." : "Tasdiqlash"}
      </button>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    marginTop: "100px",
    textAlign: "center",
  },
  input: {
    padding: "10px",
    width: "250px",
    margin: "10px 0",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#2ecc71",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default VerificationPage;
