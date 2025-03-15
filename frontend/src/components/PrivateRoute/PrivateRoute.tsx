import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
