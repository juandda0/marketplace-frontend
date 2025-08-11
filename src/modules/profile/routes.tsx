import React from 'react';
import { Route } from 'react-router-dom';
import ProfilePage from './components/ProfilePage';

const ProfileRoutes = (
    <Route path="/profile" element={<ProfilePage />} />
);

export default ProfileRoutes;