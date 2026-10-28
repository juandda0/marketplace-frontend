import { Route } from 'react-router-dom';
import WalletPage from './pages/WalletPage';
import RechargePage from './pages/RechargePage';

const WalletRoutes = (
    <>
        <Route path="/billetera" element={<WalletPage />} />
        <Route path="/billetera/recargar" element={<RechargePage />} />
    </>
);

export default WalletRoutes;
