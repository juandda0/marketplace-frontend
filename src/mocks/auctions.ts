import type { Auction, Bid } from '../modules/auctions/types';

const MIN = 60_000;
const HOUR = 60 * MIN;
/** Las fechas se calculan al cargar la app para que las subastas siempre se vean activas. */
const now = Date.now();

const history = (auctionId: number, entries: [string, number, number, string?][]): Bid[] =>
    entries
        .map(([bidderName, amount, minutesAgo, userId], i) => ({
            id: `seed-${auctionId}-${i}`,
            auctionId,
            bidderName,
            userId,
            amount,
            createdAt: now - minutesAgo * MIN,
        }))
        .sort((a, b) => b.amount - a.amount);

export const auctions: Auction[] = [
    {
        id: 1,
        title: 'Calculadora graficadora TI-84 Plus',
        description:
            'Usada dos semestres, pantalla sin rayones y con cable de conexión. Ideal para Cálculo, Estadística y Física. Se entrega en el laboratorio de Sistemas.',
        category: 'tecnologia',
        condition: 'Como nuevo',
        visual: { icon: 'calculator', from: '#60A5FA', to: '#1E3A8A' },
        storeId: 'tecnocampus',
        storeName: 'TecnoCampus',
        startingBid: 800,
        minIncrement: 50,
        endsAt: now + 2 * HOUR + 14 * MIN,
        watchers: 38,
        bids: history(1, [
            ['Andrés M.', 1250, 6],
            ['Juliana R.', 1200, 18],
            ['Kevin A.', 1100, 47],
            ['Andrés M.', 1000, 95],
            ['Paola M.', 900, 180],
            ['Kevin A.', 850, 260],
        ]),
    },
    {
        id: 2,
        title: 'Hoodie edición TechU Montería 2025',
        description:
            'Hoodie conmemorativo del equipo ganador de TechU Montería 2025, firmado por el equipo. Talla M, unidad única.',
        category: 'ropa',
        condition: 'Nuevo',
        visual: { icon: 'hoodie', from: '#3ED68C', to: '#065F46' },
        storeId: 'sabanero-urban',
        storeName: 'Sabanero Urban',
        startingBid: 200,
        minIncrement: 20,
        endsAt: now + 38 * MIN,
        watchers: 64,
        bids: history(2, [
            ['Valeria D.', 460, 3],
            ['Mateo C.', 440, 9],
            ['Sofía M.', 420, 14, 'u-demo'],
            ['Valeria D.', 400, 25],
            ['Camila S.', 340, 70],
            ['Mateo C.', 260, 130],
        ]),
    },
    {
        id: 3,
        title: 'Bicicleta urbana rin 26',
        description:
            'Bicicleta de 7 cambios con mantenimiento reciente, frenos nuevos y candado incluido. Perfecta para llegar a la U desde el centro.',
        category: 'accesorios',
        condition: 'Usado',
        visual: { icon: 'bicycle', from: '#FB923C', to: '#7C2D12' },
        storeId: 'sabanero-urban',
        storeName: 'Sabanero Urban',
        startingBid: 2500,
        minIncrement: 100,
        endsAt: now + 29 * HOUR + 5 * MIN,
        watchers: 51,
        bids: history(3, [
            ['Santiago B.', 3400, 40],
            ['Daniela G.', 3200, 150],
            ['Santiago B.', 2900, 420],
            ['Felipe N.', 2600, 900],
        ]),
    },
    {
        id: 4,
        title: 'Teclado mecánico 65 % RGB',
        description: 'Switches rojos, keycaps PBT y cable USB-C desmontable. Con caja original y extractor de teclas.',
        category: 'tecnologia',
        condition: 'Como nuevo',
        visual: { icon: 'keyboard', from: '#A78BFA', to: '#3B0764' },
        storeId: 'tecnocampus',
        storeName: 'TecnoCampus',
        startingBid: 1200,
        minIncrement: 50,
        endsAt: now + 2 * 24 * HOUR + 3 * HOUR,
        watchers: 27,
        bids: history(4, [
            ['Nicolás E.', 1800, 55],
            ['Isabella T.', 1650, 200],
            ['Nicolás E.', 1400, 610],
        ]),
    },
    {
        id: 5,
        title: 'Colección de libros de Cálculo y Física',
        description:
            'Tres libros universitarios en buen estado: Cálculo de una variable, Física para ingeniería y Álgebra lineal. Se venden juntos.',
        category: 'libros',
        condition: 'Usado',
        visual: { icon: 'books', from: '#FBBF24', to: '#78350F' },
        storeId: 'apuntes-sinu',
        storeName: 'Apuntes Sinú',
        startingBid: 300,
        minIncrement: 20,
        endsAt: now + 6 * HOUR + 40 * MIN,
        watchers: 19,
        bids: history(5, [
            ['Sara Q.', 420, 35],
            ['Esteban L.', 380, 140],
            ['Sara Q.', 320, 300],
        ]),
    },
    {
        id: 6,
        title: 'Monitor 22" Full HD',
        description: 'Monitor IPS de 22 pulgadas con cable HDMI. Subasta finalizada.',
        category: 'tecnologia',
        condition: 'Usado',
        visual: { icon: 'monitor', from: '#94A3B8', to: '#0F172A' },
        storeId: 'tecnocampus',
        storeName: 'TecnoCampus',
        startingBid: 1500,
        minIncrement: 100,
        endsAt: now - 5 * HOUR,
        watchers: 44,
        bids: history(6, [
            ['Laura P.', 2700, 320],
            ['Jorge H.', 2600, 360],
            ['Laura P.', 2200, 600],
            ['Mónica P.', 1700, 1200],
        ]),
    },
];
