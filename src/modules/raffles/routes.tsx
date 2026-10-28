import { Route } from 'react-router-dom';
import RafflesPage from './pages/RafflesPage';
import RaffleDetailPage from './pages/RaffleDetailPage';

const RaffleRoutes = (
    <>
        <Route path="/rifas" element={<RafflesPage />} />
        <Route path="/rifas/:raffleId" element={<RaffleDetailPage />} />
    </>
);

export default RaffleRoutes;
