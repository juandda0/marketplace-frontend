import React from 'react';
import { Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const AuthRoutes: React.ReactNode[] = [
    <Route path="/login" element={<LoginForm />} key="login" />,
    <Route path="/register" element={<RegisterForm />} key="register" />
];

export default AuthRoutes;