import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../modules/auth/hooks/useAuth';

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace state={{ from: location.pathname }} />;
};

export default PrivateRoute;
