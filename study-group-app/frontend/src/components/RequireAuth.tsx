import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
  const authContext = useAuth();
  const auth = authContext ? authContext.auth : null;
  const location = useLocation();
  console.log(auth);


return (
    auth?.username ? (
        <Outlet />
    ) : (
        <Navigate to="/auth" state={{ from: location }} replace />
)
    );
};

export default RequireAuth;