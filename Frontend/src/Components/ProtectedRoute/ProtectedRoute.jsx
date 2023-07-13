import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { newMessage } from "../../stateManagement/actions/alerts/alertWindow.actions";

export default function ProtectedRoute() {
  const dispatch = useDispatch(),
    adminState = useSelector((state) => state.admin);
  const { admin } = adminState;

  if (!admin) {
    dispatch(
      newMessage({
        message: "Debes iniciar sesión para poder tener acceso a esta página.",
        state: "error",
      })
    );
    return <Navigate to='/login' />;
  }
  return <Outlet />;
}
