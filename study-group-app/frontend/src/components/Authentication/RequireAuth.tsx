import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAuth = () => {
  const authContext = useAuth();
  const auth = authContext ? authContext.auth : null;
  const location = useLocation();

return (
    auth?.username ? (
        <Outlet />
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
)
    );
};

export default RequireAuth;