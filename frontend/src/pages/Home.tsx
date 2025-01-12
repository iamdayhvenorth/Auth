import { useEffect } from "react";
import useUserAuthStore from "../store/userAuthStore";
import { Link } from "react-router-dom";
import axios from "axios";

export const Home = () => {
  const logout = useUserAuthStore((state) => state.logout);
  const user = useUserAuthStore((state) => state.user);

  console.log(user?.token);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/check-auth", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },

          withCredentials: true,
        });

        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    checkAuth();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <p>{user?.name} You are authenticated</p>
      <Link to={"/login"}>Login</Link> <br />
      <Link to={"/register"}>Register</Link> <br />
      <Link to={"/verify-email"}>verify</Link>
      <br />
      <br />
      <button onClick={() => logout()}>logout</button>
    </div>
  );
};
