import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage'; // IMPORTAR

const MarketplaceRoutes = (
    <>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} /> {/* AÑADIR NUEVA RUTA */}
    </>
);

export default MarketplaceRoutes;