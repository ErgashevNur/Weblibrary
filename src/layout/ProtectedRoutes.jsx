import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AuthRequiredModal from "../components/AuthRequiredModal";

export default function ProtectedRoutes({ user }) {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      setShowModal(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}

      {!user && (
        <AuthRequiredModal
          open={showModal}
          onClose={() => setShowModal(false)}
          redirectState={{ from: location }}
        />
      )}

      {user && <Outlet />}
    </div>
  );
}
