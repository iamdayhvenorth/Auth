import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.tsx";
import { NotFound } from "./pages/NotFound.tsx";
import LoginPage from "./pages/Login.tsx";
import RegisterPage from "./pages/Register.tsx";
import VerifyEmailPage from "./pages/VerifyEmail.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import ForgetPassword from "./pages/ForgotPassword.tsx";
import useUserAuthStore from "./store/userAuthStore.ts";
import { ReactNode } from "react";

interface MyComponentProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: MyComponentProps) => {
  const isAuthenticated = useUserAuthStore((state) => state.isAuthenticated);
  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

const PrivateRoute = ({ children }: MyComponentProps) => {
  const isAuthenticated = useUserAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {
  //protect route

  const isAuthenticated = useUserAuthStore((state) => state.isAuthenticated);
  console.log(isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/login"
          element={
            <PrivateRoute>
              <LoginPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PrivateRoute>
              <RegisterPage />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/verify-email"
          element={
            <ProtectedRoute>
              <VerifyEmailPage />
            </ProtectedRoute>
          }
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/login/forget-password"
          element={
            <PrivateRoute>
              <ForgetPassword />{" "}
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
