import { Navigate, Route, useParams } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import StorePage from './pages/StorePage';

/** Compatibilidad con la ruta anterior /products/:productId. */
const LegacyProductRedirect = () => {
    const { productId } = useParams();
    return <Navigate to={`/productos/${productId}`} replace />;
};

const MarketplaceRoutes = (
    <>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/productos/:productId" element={<ProductDetailPage />} />
        <Route path="/products/:productId" element={<LegacyProductRedirect />} />
        <Route path="/tiendas/:storeId" element={<StorePage />} />
    </>
);

export default MarketplaceRoutes;
