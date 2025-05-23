import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import ProtectedRoutes from "./layout/ProtectedRoutes";
import Home from "./pages/Home";
import Jadidlar from "./pages/Jadidlar";
import BookDetail from "./pages/BookDetail";
import AuthorDetail from "./pages/AuthorDetail";
import Login from "./pages/Login";
import Javon from "./components/Javon";
import Profile from "./components/Profile";
import Security from "./components/Security";
import AllCommentsPage from "./components/Commeents";
import { useAppStore } from "./lib/zustand";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { CartProvider } from "./context/CartContext";
import TezKunda from "./pages/TezKunda";

function App() {
  let user = useAppStore((state) => state.user);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "authors",
          element: <Jadidlar />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to={"/"} /> : <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password/:token",
      element: <ResetPassword />,
    },
    {
      path: "book/:id",
      element: <BookDetail />,
    },
    {
      path: "author/:id",
      element: <AuthorDetail />,
    },
    {
      path: "kitoblar_javoni",
      element: <Javon />,
    },
    {
      path: "profile",
      element: <Profile />,
    },
    {
      path: "security",
      element: <Security />,
    },
    {
      path: "*",
      element: <TezKunda />,
    },
    {
      path: "book/comments",
      element: <AllCommentsPage />,
    },
  ]);

  return (
    <CartProvider>
      <RouterProvider router={routes} />
    </CartProvider>
  );
}

export default App;
