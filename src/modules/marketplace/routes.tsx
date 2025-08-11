import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

const MarketplaceRoutes = (
    <Route path="/" element={<HomePage />} />
);

export default MarketplaceRoutes;