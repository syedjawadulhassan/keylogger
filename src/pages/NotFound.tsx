
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AlertCircle, ChevronLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cypher-darker p-4">
      <div className="glass max-w-md w-full p-8 rounded-xl animate-fade-in text-center">
        <div className="w-16 h-16 rounded-full bg-cypher-danger/20 flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={32} className="text-cypher-danger" />
        </div>
        <h1 className="text-3xl font-bold mb-2">404</h1>
        <p className="text-xl text-cypher-text-muted mb-6">Page not found</p>
        <p className="text-cypher-text-muted mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="cypher-button flex items-center gap-2 mx-auto"
        >
          <ChevronLeft size={16} />
          <span>Go Back</span>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
