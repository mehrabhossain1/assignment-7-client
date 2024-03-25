import { Button } from "antd";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "./Container";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { toggleTheme } from "../../redux/features/theme/themeSlice";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { useState } from "react";

interface LinkButtonProps {
  to: string;
  text: string;
}

const Navbar = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("You have been logged out!");
  };

  const toggleMode = () => {
    dispatch(toggleTheme());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`shadow-lg rounded-md w-full sticky top-0 z-10 ${
        isDarkMode
          ? "bg-gray-900 text-white border-b-2 border-green-500"
          : "bg-white text-black"
      }`}
    >
      <Container>
        <div className=" h-16 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            style={{ fontSize: "1.2rem" }}
          >
            <Link className="font-semibold" to="/">
              Unity<span className="text-green-500">Aid</span>
            </Link>
          </motion.div>
          <div className="hidden md:flex md:gap-4 md:items-center">
            <LinkButton to="/donations" text="Donations" />
            <LinkButton to="/leaderboard" text="Leaderboard" />
            <LinkButton to="/community" text="Community" />
            <LinkButton to="/volunteer" text="Volunteer" />
            <LinkButton to="/about-us" text="About Us" />
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <LinkButton to="/dashboard" text="Dashboard" />
                <Button
                  onClick={handleLogout}
                  className="btn hover:!bg-red-500 hover:!text-white !border-red-500 hover:transition-all text-red-500"
                >
                  Logout
                </Button>
              </>
            ) : (
              <LinkButton to="/login" text="Login" />
            )}
            <div onClick={toggleMode} className="cursor-pointer">
              {isDarkMode ? <SunOutlined /> : <MoonOutlined />}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12"></path>
                ) : (
                  <path d="M4 6h16M4 12h16m-7 6h7"></path>
                )}
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden mt-2 flex flex-col gap-4">
            <LinkButton to="/donations" text="Donations" />
            <LinkButton to="/leaderboard" text="Leaderboard" />
            <LinkButton to="/community" text="Community" />
            <LinkButton to="/volunteer" text="Volunteer" />
            <LinkButton to="/about-us" text="About Us" />
          </div>
        )}
      </Container>
    </motion.div>
  );
};

const LinkButton = ({ to, text }: LinkButtonProps) => (
  <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
    <Link className="font-semibold" to={to}>
      {text}
    </Link>
  </motion.div>
);

export default Navbar;
