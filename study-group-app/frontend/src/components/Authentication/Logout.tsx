import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

interface LogoutProps {
  trigger: boolean;
}

const Logout: React.FC<LogoutProps> = ({ trigger }) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const authContext = useAuth();
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { setAuth } = authContext;

  console.log("Logout triggered:", trigger);
  useEffect(() => {
    if (!trigger) return;

    const handleLogout = async () => {
      try {
        const response = await axiosPrivate.get("/logout");
        if (response.status === 204) {
          setAuth(null);
          navigate("/");
        }
      } catch (err) {
        console.error("Failed to logout", err);
      }
    };

    handleLogout();
  }, [trigger, axiosPrivate, setAuth, navigate]);

  return null;
};

export default Logout;
