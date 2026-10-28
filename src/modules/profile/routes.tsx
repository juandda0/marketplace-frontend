import { Navigate, Route } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';

const ProfileRoutes = (
    <>
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/profile" element={<Navigate to="/perfil" replace />} />
    </>
);

export default ProfileRoutes;
