import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF] p-6">
      <div className="text-center border-4 border-[#6FCF97] rounded-3xl shadow-xl p-10 max-w-md w-full">
        <h1 className="text-6xl font-extrabold text-[#2D9CDB] mb-4">404</h1>
        <p className="text-xl text-[#333333] mb-6">Oops! Page not found</p>
        <a
          href="/"
          className="inline-block bg-[#333333] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#2D9CDB] transition-colors duration-300"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
