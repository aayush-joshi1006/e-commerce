// components/PrivateRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// privatge routing wrapper
export default function PrivateRoute({ children }) {
  // getting current user
  const user = useSelector((store) => store.user.user);

  // in case no user is found navigate to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
