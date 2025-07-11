// components/PrivateRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const user = useSelector((store) => store.user.user); // adjust based on your store

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
