import { Route } from 'react-router-dom';
import AuctionsPage from './pages/AuctionsPage';
import AuctionDetailPage from './pages/AuctionDetailPage';

const AuctionRoutes = (
    <>
        <Route path="/subastas" element={<AuctionsPage />} />
        <Route path="/subastas/:auctionId" element={<AuctionDetailPage />} />
    </>
);

export default AuctionRoutes;
