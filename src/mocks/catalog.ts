import type { Category, CategorySlug, Product, Review, Store } from '../modules/marketplace/types';
import galletaImg from '../assets/mocks/mockGalleta.jpg';
import stickersImg from '../assets/mocks/stikerMock.jpg';
import arepaImg from '../assets/mocks/arepamock.jpg';
import camisetaImg from '../assets/mocks/camiseta.webp';
import salchipapaImg from '../assets/mocks/salchipapaMock.jpg';

export const categories: Category[] = [
    { slug: 'comida', name: 'Comida', icon: 'hamburger', color: '#FB923C' },
    { slug: 'postres', name: 'Postres', icon: 'cake', color: '#F472B6' },
    { slug: 'ropa', name: 'Ropa', icon: 'tshirt', color: '#818CF8' },
    { slug: 'accesorios', name: 'Accesorios', icon: 'sunglasses', color: '#22D3EE' },
    { slug: 'tecnologia', name: 'Tecnología', icon: 'laptop', color: '#60A5FA' },
    { slug: 'libros', name: 'Libros y apuntes', icon: 'books', color: '#FBBF24' },
    { slug: 'servicios', name: 'Servicios', icon: 'handshake', color: '#34D399' },
];

export const categoryBySlug = (slug: CategorySlug): Category =>
    categories.find((c) => c.slug === slug) ?? categories[0];

export const stores: Store[] = [
    {
        id: 'el-arepazo',
        name: 'El Arepazo',
        tagline: 'Arepas, salchipapas y patacones entre clases',
        description:
            'Comida rápida hecha al momento por estudiantes de Ingeniería Industrial. Arepas rellenas con queso costeño, patacones y jugos naturales de corozo. Pide por la app y recoge sin hacer fila.',
        ownerName: 'Camilo Hoyos',
        ownerProgram: 'Ingeniería Industrial · 8.º semestre',
        location: 'Kiosco junto a la cafetería central',
        schedule: 'Lun a vie · 7:00 a. m. – 4:00 p. m.',
        responseTime: 'Responde en ~5 min',
        rating: 4.8,
        reviewCount: 214,
        sales: 1320,
        followers: 862,
        verified: true,
        categories: ['comida'],
        visual: { icon: 'hamburger', from: '#FB923C', to: '#9A3412' },
        since: '2024',
        acceptsUnicoin: true,
    },
    {
        id: 'sazon-sinuano',
        name: 'Sazón Sinuano',
        tagline: 'Almuerzos caseros con sabor a Córdoba',
        description:
            'Mote de queso, sancocho y almuerzos ejecutivos preparados en casa por la familia de Laura. Cupos limitados cada día: reserva antes de las 10:00 a. m.',
        ownerName: 'Laura Petro',
        ownerProgram: 'Ingeniería de Alimentos · 6.º semestre',
        location: 'Entrega en la plazoleta de Ingenierías',
        schedule: 'Lun a vie · 11:30 a. m. – 2:00 p. m.',
        responseTime: 'Responde en ~15 min',
        rating: 4.9,
        reviewCount: 158,
        sales: 940,
        followers: 611,
        verified: true,
        categories: ['comida'],
        visual: { icon: 'cookingPot', from: '#F59E0B', to: '#7C2D12' },
        since: '2024',
        acceptsUnicoin: true,
    },
    {
        id: 'la-cucharita',
        name: 'La Cucharita',
        tagline: 'Postres caseros para endulzar el parcial',
        description:
            'Galletas, brownies y cheesecake de maracuyá horneados cada mañana. Pedidos especiales para cumpleaños y sustentaciones con 2 días de anticipación.',
        ownerName: 'Sofía Martínez',
        ownerProgram: 'Ingeniería de Sistemas · 7.º semestre',
        location: 'Bloque de Ingenierías, segundo piso',
        schedule: 'Lun a sáb · 8:00 a. m. – 5:00 p. m.',
        responseTime: 'Responde en ~10 min',
        rating: 4.9,
        reviewCount: 96,
        sales: 128,
        followers: 437,
        verified: true,
        categories: ['postres'],
        visual: { icon: 'cake', from: '#F472B6', to: '#831843' },
        since: '2025',
        acceptsUnicoin: true,
    },
    {
        id: 'sabanero-urban',
        name: 'Sabanero Urban',
        tagline: 'Ropa con orgullo cordobés',
        description:
            'Camisetas, hoodies y gorras estampadas con diseños inspirados en el río Sinú y la cultura sabanera. Diseñado y estampado por estudiantes en Montería.',
        ownerName: 'Andrés Galeano',
        ownerProgram: 'Administración en Finanzas · 5.º semestre',
        location: 'Entregas en la entrada principal',
        schedule: 'Lun a vie · 9:00 a. m. – 6:00 p. m.',
        responseTime: 'Responde en ~20 min',
        rating: 4.7,
        reviewCount: 73,
        sales: 412,
        followers: 1290,
        verified: true,
        categories: ['ropa', 'accesorios'],
        visual: { icon: 'tshirt', from: '#818CF8', to: '#312E81' },
        since: '2024',
        acceptsUnicoin: true,
    },
    {
        id: 'otaku-corner',
        name: 'Otaku Corner',
        tagline: 'Stickers, llaveros y pines de anime',
        description:
            'Stickers en vinilo resistente al agua, llaveros acrílicos y pines metálicos de tus series favoritas. Aceptamos diseños personalizados.',
        ownerName: 'Valeria Díaz',
        ownerProgram: 'Licenciatura en Artes · 4.º semestre',
        location: 'Biblioteca central, zona de estudio',
        schedule: 'Lun a vie · 10:00 a. m. – 4:00 p. m.',
        responseTime: 'Responde en ~10 min',
        rating: 4.8,
        reviewCount: 188,
        sales: 2104,
        followers: 1715,
        verified: false,
        categories: ['accesorios'],
        visual: { icon: 'sticker', from: '#22D3EE', to: '#155E75' },
        since: '2024',
        acceptsUnicoin: true,
    },
    {
        id: 'tecnocampus',
        name: 'TecnoCampus',
        tagline: 'Tecnología y soporte técnico para la U',
        description:
            'Accesorios tecnológicos con garantía de 3 meses y servicio de formateo e instalación de software. Recoge en el laboratorio de Sistemas.',
        ownerName: 'Sebastián Montes',
        ownerProgram: 'Ingeniería de Sistemas · 9.º semestre',
        location: 'Laboratorio de Sistemas',
        schedule: 'Lun a vie · 8:00 a. m. – 5:00 p. m.',
        responseTime: 'Responde en ~30 min',
        rating: 4.6,
        reviewCount: 121,
        sales: 538,
        followers: 980,
        verified: true,
        categories: ['tecnologia', 'servicios'],
        visual: { icon: 'laptop', from: '#60A5FA', to: '#1E3A8A' },
        since: '2024',
        acceptsUnicoin: true,
    },
    {
        id: 'apuntes-sinu',
        name: 'Apuntes Sinú',
        tagline: 'Guías, apuntes y libros de segunda',
        description:
            'Apuntes digitalizados y guías resueltas de los cursos de ciencias básicas, más libros usados en buen estado a precio de estudiante.',
        ownerName: 'Mariana Ortega',
        ownerProgram: 'Matemáticas · 8.º semestre',
        location: 'Fotocopiadora del bloque de Ciencias Básicas',
        schedule: 'Lun a vie · 7:00 a. m. – 6:00 p. m.',
        responseTime: 'Responde en ~1 h',
        rating: 4.7,
        reviewCount: 64,
        sales: 377,
        followers: 702,
        verified: false,
        categories: ['libros'],
        visual: { icon: 'books', from: '#FBBF24', to: '#78350F' },
        since: '2025',
        acceptsUnicoin: true,
    },
    {
        id: 'parceros-tutorias',
        name: 'Parceros Tutorías',
        tagline: 'Tutorías entre estudiantes que sí explican',
        description:
            'Monitores con promedio superior a 4.3 en cálculo, física y programación. Sesiones presenciales en la biblioteca o virtuales por Meet.',
        ownerName: 'Daniel Ramos',
        ownerProgram: 'Física · 9.º semestre',
        location: 'Biblioteca central o virtual',
        schedule: 'Lun a sáb · con cita previa',
        responseTime: 'Responde en ~20 min',
        rating: 5,
        reviewCount: 52,
        sales: 296,
        followers: 544,
        verified: true,
        categories: ['servicios'],
        visual: { icon: 'teacher', from: '#34D399', to: '#064E3B' },
        since: '2025',
        acceptsUnicoin: true,
    },
];

export const storeById = (id: string): Store | undefined => stores.find((s) => s.id === id);

const reviewPool: Record<CategorySlug, Review[]> = {
    comida: [
        { id: 1, author: 'Juliana R.', rating: 5, comment: 'Llegó calientica y en 10 minutos. El queso costeño se nota que es bueno.', date: 'hace 2 días' },
        { id: 2, author: 'Kevin A.', rating: 5, comment: 'La porción es grande para el precio. Ya es mi almuerzo de los martes.', date: 'hace 1 semana' },
        { id: 3, author: 'Paola M.', rating: 4, comment: 'Muy rico, solo le faltó un poquito más de salsa.', date: 'hace 2 semanas' },
    ],
    postres: [
        { id: 4, author: 'Natalia V.', rating: 5, comment: 'Las compré para la sustentación y todos preguntaron dónde eran.', date: 'hace 3 días' },
        { id: 5, author: 'Esteban L.', rating: 5, comment: 'Suaves por dentro y crocantes por fuera. 10/10.', date: 'hace 1 semana' },
        { id: 6, author: 'Mónica P.', rating: 4, comment: 'Deliciosas, aunque se acaban rapidísimo en la mañana.', date: 'hace 3 semanas' },
    ],
    ropa: [
        { id: 7, author: 'Camila S.', rating: 5, comment: 'La tela es gruesa y el estampado no se ha caído después de varias lavadas.', date: 'hace 5 días' },
        { id: 8, author: 'Jorge H.', rating: 4, comment: 'Talla un poco grande, pero quedó perfecta oversize.', date: 'hace 2 semanas' },
    ],
    accesorios: [
        { id: 9, author: 'Luisa F.', rating: 5, comment: 'Los stickers aguantaron la lluvia en el termo. Súper recomendados.', date: 'hace 4 días' },
        { id: 10, author: 'Mateo C.', rating: 5, comment: 'Entrega rápida en la biblioteca y venían con un regalo.', date: 'hace 2 semanas' },
    ],
    tecnologia: [
        { id: 11, author: 'Santiago B.', rating: 5, comment: 'Funciona perfecto y me lo entregaron en el laboratorio el mismo día.', date: 'hace 6 días' },
        { id: 12, author: 'Daniela G.', rating: 4, comment: 'Buen precio comparado con el centro de Montería.', date: 'hace 3 semanas' },
    ],
    libros: [
        { id: 13, author: 'Felipe N.', rating: 5, comment: 'Con estas guías pasé Cálculo con 4.2. Muy bien explicadas.', date: 'hace 1 semana' },
        { id: 14, author: 'Sara Q.', rating: 4, comment: 'El libro venía subrayado en algunas páginas, pero en buen estado.', date: 'hace 1 mes' },
    ],
    servicios: [
        { id: 15, author: 'Isabella T.', rating: 5, comment: 'Explica con paciencia y con ejercicios tipo parcial. Volveré a agendar.', date: 'hace 2 días' },
        { id: 16, author: 'Nicolás E.', rating: 5, comment: 'Puntual y muy claro. Me ayudó a entender integrales por partes.', date: 'hace 2 semanas' },
    ],
};

type ProductSeed = Omit<Product, 'reviews' | 'storeName'>;

const productSeeds: ProductSeed[] = [
    // ---------- Comida ----------
    {
        id: 1, name: 'Arepa rellena de carne y queso costeño', price: 7000, imageUrl: arepaImg,
        visual: { icon: 'hamburger', from: '#FB923C', to: '#9A3412' }, shippingFree: false, stock: 30,
        category: 'comida', storeId: 'el-arepazo', rating: 4.9, reviewCount: 128, unit: 'unidad', readyIn: 'Lista en 10 min', featured: true,
        description: 'Arepa asada rellena de carne desmechada, queso costeño rallado y hogao. Se prepara al momento.\n\nIncluye salsa de la casa. Puedes agregar huevo por $1.500 al recogerla.',
    },
    {
        id: 2, name: 'Salchipapa personal con queso', price: 8000, imageUrl: salchipapaImg,
        visual: { icon: 'hamburger', from: '#F97316', to: '#7C2D12' }, shippingFree: false, stock: 25,
        category: 'comida', storeId: 'el-arepazo', rating: 4.7, reviewCount: 86, unit: 'porción', readyIn: 'Lista en 12 min', featured: true,
        description: 'Papa a la francesa, salchicha, queso derretido, salsa rosada y de piña. Porción ideal para una persona con hambre de parcial.',
    },
    {
        id: 3, name: 'Patacón con todo', price: 9500,
        visual: { icon: 'pizza', from: '#FACC15', to: '#B45309' }, shippingFree: false, stock: 18,
        category: 'comida', storeId: 'el-arepazo', rating: 4.8, reviewCount: 54, unit: 'unidad', readyIn: 'Listo en 15 min',
        description: 'Patacón crocante con pollo desmechado, carne, queso costeño, maíz tierno y suero atollabuey.',
    },
    {
        id: 4, name: 'Jugo natural de corozo 16 oz', price: 3000,
        visual: { icon: 'orange', from: '#F43F5E', to: '#881337' }, shippingFree: false, stock: 40,
        category: 'comida', storeId: 'el-arepazo', rating: 4.6, reviewCount: 41, unit: 'vaso', readyIn: 'Listo en 3 min',
        description: 'Jugo bien frío de corozo, el sabor de la sabana. También disponible en maracuyá y limonada de panela.',
    },
    {
        id: 5, name: 'Mote de queso con arroz de coco', price: 12000,
        visual: { icon: 'bowl', from: '#F59E0B', to: '#78350F' }, shippingFree: false, stock: 15,
        category: 'comida', storeId: 'sazon-sinuano', rating: 5, reviewCount: 77, unit: 'almuerzo', readyIn: 'Entrega 12:00 m.', featured: true,
        description: 'El clásico de Córdoba: mote de queso con ñame, acompañado de arroz de coco, ensalada y limonada.\n\nCupos limitados: reserva antes de las 10:00 a. m.',
    },
    {
        id: 6, name: 'Almuerzo ejecutivo del día', price: 11000,
        visual: { icon: 'cookingPot', from: '#EA580C', to: '#7C2D12' }, shippingFree: false, stock: 20,
        category: 'comida', storeId: 'sazon-sinuano', rating: 4.8, reviewCount: 63, unit: 'almuerzo', readyIn: 'Entrega 12:00 m.',
        description: 'Sopa del día, arroz, proteína (pollo, cerdo o res), principio, ensalada y jugo natural.',
    },
    // ---------- Postres ----------
    {
        id: 7, name: 'Galletas con chips de chocolate x6', price: 6000, originalPrice: 8000, imageUrl: galletaImg, imageFit: 'cover',
        visual: { icon: 'cookie', from: '#D97706', to: '#78350F' }, shippingFree: true, stock: 24,
        category: 'postres', storeId: 'la-cucharita', rating: 4.9, reviewCount: 64, unit: 'paquete x6', readyIn: 'Disponible ya', featured: true,
        description: 'Galletas caseras con mantequilla y chips de chocolate semiamargo. Horneadas cada mañana.\n\nEmpacadas en bolsa kraft, perfectas para regalar.',
    },
    {
        id: 8, name: 'Brownie con arequipe', price: 4500,
        visual: { icon: 'cake', from: '#A16207', to: '#422006' }, shippingFree: true, stock: 30,
        category: 'postres', storeId: 'la-cucharita', rating: 4.8, reviewCount: 39, unit: 'porción', readyIn: 'Disponible ya', featured: true,
        description: 'Brownie húmedo de chocolate con una capa generosa de arequipe y nueces.',
    },
    {
        id: 9, name: 'Cheesecake de maracuyá', price: 7000,
        visual: { icon: 'cake', from: '#FDE047', to: '#CA8A04' }, shippingFree: true, stock: 12,
        category: 'postres', storeId: 'la-cucharita', rating: 5, reviewCount: 28, unit: 'porción', readyIn: 'Disponible ya',
        description: 'Base de galleta, crema de queso suave y salsa de maracuyá natural. Se mantiene refrigerado.',
    },
    {
        id: 10, name: 'Enyucado costeño', price: 3500,
        visual: { icon: 'iceCream', from: '#FCD34D', to: '#B45309' }, shippingFree: true, stock: 20,
        category: 'postres', storeId: 'la-cucharita', rating: 4.7, reviewCount: 22, unit: 'porción', readyIn: 'Disponible ya',
        description: 'Yuca, coco, queso costeño y anís. La receta de la abuela, horneado en hoja de bijao.',
    },
    // ---------- Ropa ----------
    {
        id: 11, name: 'Camiseta oversize estampada', price: 35000, originalPrice: 45000, imageUrl: camisetaImg, imageFit: 'contain',
        visual: { icon: 'tshirt', from: '#818CF8', to: '#312E81' }, shippingFree: true, stock: 14,
        category: 'ropa', storeId: 'sabanero-urban', rating: 4.7, reviewCount: 31, unit: 'unidad', readyIn: 'Entrega en 24 h', featured: true, condition: 'Nuevo',
        description: 'Camiseta oversize en algodón peinado 220 g con estampado en el pecho. Tallas S a XL.\n\nLavar al revés en agua fría para cuidar el estampado.',
    },
    {
        id: 12, name: 'Hoodie Unicórdoba verde', price: 85000,
        visual: { icon: 'hoodie', from: '#22C55E', to: '#14532D' }, shippingFree: true, stock: 9,
        category: 'ropa', storeId: 'sabanero-urban', rating: 4.9, reviewCount: 18, unit: 'unidad', readyIn: 'Entrega en 24 h', featured: true, condition: 'Nuevo',
        description: 'Buzo con capota en perchado afelpado, bordado con el escudo de la U en el pecho. Ideal para el aire acondicionado de los salones.',
    },
    {
        id: 13, name: 'Gorra bordada "Río Sinú"', price: 28000,
        visual: { icon: 'cap', from: '#6366F1', to: '#1E1B4B' }, shippingFree: true, stock: 16,
        category: 'ropa', storeId: 'sabanero-urban', rating: 4.6, reviewCount: 12, unit: 'unidad', readyIn: 'Entrega en 24 h', condition: 'Nuevo',
        description: 'Gorra de seis paneles con bordado frontal y correa ajustable. Disponible en negro y beige.',
    },
    // ---------- Accesorios ----------
    {
        id: 14, name: 'Pack de stickers anime x10', price: 8000, imageUrl: stickersImg, imageFit: 'contain',
        visual: { icon: 'sticker', from: '#F472B6', to: '#9D174D' }, shippingFree: true, stock: 50,
        category: 'accesorios', storeId: 'otaku-corner', rating: 5, reviewCount: 142, unit: 'pack x10', readyIn: 'Disponible ya', featured: true,
        description: 'Diez stickers troquelados en vinilo mate resistente al agua. Perfectos para el portátil, el termo o el cuaderno.',
    },
    {
        id: 15, name: 'Llavero acrílico personalizado', price: 6000,
        visual: { icon: 'key', from: '#22D3EE', to: '#155E75' }, shippingFree: true, stock: 35,
        category: 'accesorios', storeId: 'otaku-corner', rating: 4.8, reviewCount: 47, unit: 'unidad', readyIn: 'Entrega en 48 h',
        description: 'Llavero en acrílico transparente de 6 cm a doble cara. Envíanos tu diseño o elige uno del catálogo.',
    },
    {
        id: 16, name: 'Pines metálicos esmaltados', price: 9000,
        visual: { icon: 'pin', from: '#A78BFA', to: '#4C1D95' }, shippingFree: true, stock: 22,
        category: 'accesorios', storeId: 'otaku-corner', rating: 4.7, reviewCount: 25, unit: 'unidad', readyIn: 'Disponible ya',
        description: 'Pines con broche de seguridad, ideales para morrales y chaquetas.',
    },
    {
        id: 17, name: 'Termo de acero 750 ml', price: 25000,
        visual: { icon: 'bottle', from: '#2DD4BF', to: '#134E4A' }, shippingFree: true, stock: 18,
        category: 'accesorios', storeId: 'sabanero-urban', rating: 4.8, reviewCount: 33, unit: 'unidad', readyIn: 'Entrega en 24 h', condition: 'Nuevo',
        description: 'Mantiene el agua fría hasta 24 horas, clave para el calor de Montería. Tapa antiderrame.',
    },
    // ---------- Tecnología ----------
    {
        id: 18, name: 'Audífonos inalámbricos con estuche', price: 65000, originalPrice: 79000,
        visual: { icon: 'headphones', from: '#60A5FA', to: '#1E3A8A' }, shippingFree: true, stock: 8,
        category: 'tecnologia', storeId: 'tecnocampus', rating: 4.6, reviewCount: 57, unit: 'unidad', readyIn: 'Entrega hoy', featured: true, condition: 'Nuevo',
        description: 'Bluetooth 5.3, hasta 24 horas con el estuche y cancelación de ruido para estudiar en la biblioteca. Garantía de 3 meses.',
    },
    {
        id: 19, name: 'Cargador rápido USB-C 20 W', price: 32000,
        visual: { icon: 'charger', from: '#38BDF8', to: '#0C4A6E' }, shippingFree: true, stock: 20,
        category: 'tecnologia', storeId: 'tecnocampus', rating: 4.7, reviewCount: 40, unit: 'unidad', readyIn: 'Entrega hoy', condition: 'Nuevo',
        description: 'Cargador de pared con carga rápida PD de 20 W, compatible con Android y iPhone. Incluye cable de 1 m.',
    },
    {
        id: 20, name: 'Mouse inalámbrico silencioso', price: 28000,
        visual: { icon: 'mouse', from: '#818CF8', to: '#1E1B4B' }, shippingFree: true, stock: 15,
        category: 'tecnologia', storeId: 'tecnocampus', rating: 4.5, reviewCount: 22, unit: 'unidad', readyIn: 'Entrega hoy', condition: 'Nuevo',
        description: 'Clics silenciosos para no molestar en clase, receptor USB y batería AA incluida.',
    },
    {
        id: 21, name: 'Calculadora científica fx-570 (usada)', price: 55000,
        visual: { icon: 'calculator', from: '#94A3B8', to: '#1E293B' }, shippingFree: true, stock: 1,
        category: 'tecnologia', storeId: 'tecnocampus', rating: 4.8, reviewCount: 9, unit: 'unidad', readyIn: 'Entrega hoy', condition: 'Como nuevo',
        description: 'Usada un semestre, funciona perfecto. Resuelve integrales, matrices y ecuaciones. Incluye tapa protectora.',
    },
    {
        id: 22, name: 'Memoria USB 64 GB', price: 25000,
        visual: { icon: 'usb', from: '#0EA5E9', to: '#082F49' }, shippingFree: true, stock: 25,
        category: 'tecnologia', storeId: 'tecnocampus', rating: 4.6, reviewCount: 31, unit: 'unidad', readyIn: 'Entrega hoy', condition: 'Nuevo',
        description: 'USB 3.2 metálica con llavero. Ideal para llevar tus entregas a la fotocopiadora.',
    },
    // ---------- Libros y apuntes ----------
    {
        id: 23, name: 'Apuntes de Cálculo Diferencial', price: 12000,
        visual: { icon: 'notebook', from: '#FBBF24', to: '#78350F' }, shippingFree: true, stock: 99,
        category: 'libros', storeId: 'apuntes-sinu', rating: 4.9, reviewCount: 88, unit: 'PDF + impreso', readyIn: 'Descarga inmediata', featured: true,
        description: 'Apuntes completos del curso: límites, derivadas y aplicaciones, con más de 120 ejercicios resueltos paso a paso.',
    },
    {
        id: 24, name: 'Guía resuelta de Física Mecánica', price: 15000,
        visual: { icon: 'atom', from: '#F59E0B', to: '#92400E' }, shippingFree: true, stock: 99,
        category: 'libros', storeId: 'apuntes-sinu', rating: 4.7, reviewCount: 46, unit: 'PDF', readyIn: 'Descarga inmediata',
        description: 'Talleres de cinemática, dinámica y energía resueltos, organizados por corte académico.',
    },
    {
        id: 25, name: 'Libro "Cálculo de una variable" (usado)', price: 40000,
        visual: { icon: 'bookOpen', from: '#EAB308', to: '#713F12' }, shippingFree: true, stock: 2,
        category: 'libros', storeId: 'apuntes-sinu', rating: 4.6, reviewCount: 7, unit: 'unidad', readyIn: 'Entrega en 24 h', condition: 'Usado',
        description: 'Séptima edición en buen estado, algunas páginas subrayadas con lápiz. Ideal para Cálculo I y II.',
    },
    {
        id: 26, name: 'Kit de preparación Saber Pro', price: 18000,
        visual: { icon: 'exam', from: '#FCD34D', to: '#A16207' }, shippingFree: true, stock: 50,
        category: 'libros', storeId: 'apuntes-sinu', rating: 4.8, reviewCount: 35, unit: 'kit digital', readyIn: 'Descarga inmediata',
        description: 'Simulacros de lectura crítica, razonamiento cuantitativo e inglés con respuestas explicadas.',
    },
    // ---------- Servicios ----------
    {
        id: 27, name: 'Tutoría de Cálculo (1 hora)', price: 25000,
        visual: { icon: 'teacher', from: '#34D399', to: '#064E3B' }, shippingFree: true, stock: 10,
        category: 'servicios', storeId: 'parceros-tutorias', rating: 5, reviewCount: 41, unit: 'hora', readyIn: 'Agenda para hoy', featured: true,
        description: 'Sesión personalizada para preparar parciales de Cálculo I, II o III. Llevas tus dudas y salimos con ejercicios resueltos.',
    },
    {
        id: 28, name: 'Clase de programación en Python', price: 30000,
        visual: { icon: 'code', from: '#10B981', to: '#022C22' }, shippingFree: true, stock: 8,
        category: 'servicios', storeId: 'parceros-tutorias', rating: 4.9, reviewCount: 26, unit: 'hora', readyIn: 'Agenda para mañana',
        description: 'Desde lo básico hasta estructuras de datos. Ideal para Algoritmos y Programación I.',
    },
    {
        id: 29, name: 'Formateo e instalación de software', price: 35000,
        visual: { icon: 'wrench', from: '#38BDF8', to: '#0F172A' }, shippingFree: true, stock: 6,
        category: 'servicios', storeId: 'tecnocampus', rating: 4.7, reviewCount: 19, unit: 'servicio', readyIn: 'Listo en 24 h',
        description: 'Formateo, Windows o Linux, drivers, Office y respaldo de tus archivos. Entrega en el laboratorio de Sistemas.',
    },
    {
        id: 30, name: 'Diseño de hoja de vida profesional', price: 20000,
        visual: { icon: 'file', from: '#4ADE80', to: '#14532D' }, shippingFree: true, stock: 12,
        category: 'servicios', storeId: 'parceros-tutorias', rating: 4.8, reviewCount: 14, unit: 'servicio', readyIn: 'Listo en 48 h',
        description: 'Hoja de vida en español e inglés con diseño limpio, optimizada para prácticas profesionales.',
    },
];

export const products: Product[] = productSeeds.map((seed) => ({
    ...seed,
    storeName: storeById(seed.storeId)?.name ?? 'Tienda Unimarket',
    reviews: reviewPool[seed.category],
}));
