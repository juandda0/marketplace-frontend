import type { Category, CategorySlug, Product, Review, Store } from '../modules/marketplace/types';
import galletaImg from '../assets/mocks/mockGalleta.jpg';
import stickersImg from '../assets/mocks/stikerMock.jpg';
import arepaImg from '../assets/mocks/arepamock.jpg';
import camisetaImg from '../assets/mocks/camiseta.webp';
import salchipapaImg from '../assets/mocks/salchipapaMock.jpg';

export const categories: Category[] = [
    { slug: 'comida', name: 'Comida', icon: 'hamburger', color: '#EA580C' },
    { slug: 'postres', name: 'Postres', icon: 'birthday-cake', color: '#DB2777' },
    { slug: 'ropa', name: 'Ropa', icon: 't-shirt', color: '#4F46E5' },
    { slug: 'accesorios', name: 'Accesorios', icon: 'sunglasses', color: '#0891B2' },
    { slug: 'tecnologia', name: 'Tecnología', icon: 'laptop', color: '#2563EB' },
    { slug: 'libros', name: 'Libros y apuntes', icon: 'books', color: '#D97706' },
    { slug: 'servicios', name: 'Servicios', icon: 'handshake', color: '#059669' },
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
        visual: { icon: 'hamburger', color: '#CF6829' },
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
        visual: { icon: 'pot-of-food', color: '#BF6B0E' },
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
        visual: { icon: 'birthday-cake', color: '#C14A82' },
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
        visual: { icon: 't-shirt', color: '#5D62C2' },
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
        visual: { icon: 'label', color: '#1C9EB8' },
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
        visual: { icon: 'laptop', color: '#4275C8' },
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
        visual: { icon: 'books', color: '#C0811B' },
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
        visual: { icon: 'graduation-cap', color: '#1F976F' },
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
        visual: { icon: 'hamburger', color: '#CF6829' }, shippingFree: false, stock: 30,
        category: 'comida', storeId: 'el-arepazo', rating: 4.9, reviewCount: 128, unit: 'unidad', readyIn: 'Lista en 10 min', featured: true,
        description: 'Arepa asada rellena de carne desmechada, queso costeño rallado y hogao. Se prepara al momento.\n\nIncluye salsa de la casa. Puedes agregar huevo por $1.500 al recogerla.',
    },
    {
        id: 2, name: 'Salchipapa personal con queso', price: 8000, imageUrl: salchipapaImg,
        visual: { icon: 'hamburger', color: '#C15414' }, shippingFree: false, stock: 25,
        category: 'comida', storeId: 'el-arepazo', rating: 4.7, reviewCount: 86, unit: 'porción', readyIn: 'Lista en 12 min', featured: true,
        description: 'Papa a la francesa, salchicha, queso derretido, salsa rosada y de piña. Porción ideal para una persona con hambre de parcial.',
    },
    {
        id: 3, name: 'Patacón con todo', price: 9500,
        visual: { icon: 'flatbread', color: '#DA9610' }, shippingFree: false, stock: 18,
        category: 'comida', storeId: 'el-arepazo', rating: 4.8, reviewCount: 54, unit: 'unidad', readyIn: 'Listo en 15 min',
        description: 'Patacón crocante con pollo desmechado, carne, queso costeño, maíz tierno y suero atollabuey.',
    },
    {
        id: 4, name: 'Jugo natural de corozo 16 oz', price: 3000,
        visual: { icon: 'cup-with-straw', color: '#C32B4C' }, shippingFree: false, stock: 40,
        category: 'comida', storeId: 'el-arepazo', rating: 4.6, reviewCount: 41, unit: 'vaso', readyIn: 'Listo en 3 min',
        description: 'Jugo bien frío de corozo, el sabor de la sabana. También disponible en maracuyá y limonada de panela.',
    },
    {
        id: 5, name: 'Mote de queso con arroz de coco', price: 12000,
        visual: { icon: 'bowl-with-spoon', color: '#BD6F0D' }, shippingFree: false, stock: 15,
        category: 'comida', storeId: 'sazon-sinuano', rating: 5, reviewCount: 77, unit: 'almuerzo', readyIn: 'Entrega 12:00 m.', featured: true,
        description: 'El clásico de Córdoba: mote de queso con ñame, acompañado de arroz de coco, ensalada y limonada.\n\nCupos limitados: reserva antes de las 10:00 a. m.',
    },
    {
        id: 6, name: 'Almuerzo ejecutivo del día', price: 11000,
        visual: { icon: 'pot-of-food', color: '#B8450F' }, shippingFree: false, stock: 20,
        category: 'comida', storeId: 'sazon-sinuano', rating: 4.8, reviewCount: 63, unit: 'almuerzo', readyIn: 'Entrega 12:00 m.',
        description: 'Sopa del día, arroz, proteína (pollo, cerdo o res), principio, ensalada y jugo natural.',
    },
    // ---------- Postres ----------
    {
        id: 7, name: 'Galletas con chips de chocolate x6', price: 6000, originalPrice: 8000, imageUrl: galletaImg, imageFit: 'cover',
        visual: { icon: 'cookie', color: '#AD590A' }, shippingFree: true, stock: 24,
        category: 'postres', storeId: 'la-cucharita', rating: 4.9, reviewCount: 64, unit: 'paquete x6', readyIn: 'Disponible ya', featured: true,
        description: 'Galletas caseras con mantequilla y chips de chocolate semiamargo. Horneadas cada mañana.\n\nEmpacadas en bolsa kraft, perfectas para regalar.',
    },
    {
        id: 8, name: 'Brownie con arequipe', price: 4500,
        visual: { icon: 'chocolate-bar', color: '#764407' }, shippingFree: true, stock: 30,
        category: 'postres', storeId: 'la-cucharita', rating: 4.8, reviewCount: 39, unit: 'porción', readyIn: 'Disponible ya', featured: true,
        description: 'Brownie húmedo de chocolate con una capa generosa de arequipe y nueces.',
    },
    {
        id: 9, name: 'Cheesecake de maracuyá', price: 7000,
        visual: { icon: 'shortcake', color: '#E6B929' }, shippingFree: true, stock: 12,
        category: 'postres', storeId: 'la-cucharita', rating: 5, reviewCount: 28, unit: 'porción', readyIn: 'Disponible ya',
        description: 'Base de galleta, crema de queso suave y salsa de maracuyá natural. Se mantiene refrigerado.',
    },
    {
        id: 10, name: 'Enyucado costeño', price: 3500,
        visual: { icon: 'custard', color: '#DC992E' }, shippingFree: true, stock: 20,
        category: 'postres', storeId: 'la-cucharita', rating: 4.7, reviewCount: 22, unit: 'porción', readyIn: 'Disponible ya',
        description: 'Yuca, coco, queso costeño y anís. La receta de la abuela, horneado en hoja de bijao.',
    },
    // ---------- Ropa ----------
    {
        id: 11, name: 'Camiseta oversize estampada', price: 35000, originalPrice: 45000, imageUrl: camisetaImg, imageFit: 'contain',
        visual: { icon: 't-shirt', color: '#5D62C2' }, shippingFree: true, stock: 14,
        category: 'ropa', storeId: 'sabanero-urban', rating: 4.7, reviewCount: 31, unit: 'unidad', readyIn: 'Entrega en 24 h', featured: true, condition: 'Nuevo',
        description: 'Camiseta oversize en algodón peinado 220 g con estampado en el pecho. Tallas S a XL.\n\nLavar al revés en agua fría para cuidar el estampado.',
    },
    {
        id: 12, name: 'Hoodie Unicórdoba verde', price: 85000,
        visual: { icon: 'coat', color: '#1C9248' }, shippingFree: true, stock: 9,
        category: 'ropa', storeId: 'sabanero-urban', rating: 4.9, reviewCount: 18, unit: 'unidad', readyIn: 'Entrega en 24 h', featured: true, condition: 'Nuevo',
        description: 'Buzo con capota en perchado afelpado, bordado con el escudo de la U en el pecho. Ideal para el aire acondicionado de los salones.',
    },
    {
        id: 13, name: 'Gorra bordada "Río Sinú"', price: 28000,
        visual: { icon: 'billed-cap', color: '#4444A6' }, shippingFree: true, stock: 16,
        category: 'ropa', storeId: 'sabanero-urban', rating: 4.6, reviewCount: 12, unit: 'unidad', readyIn: 'Entrega en 24 h', condition: 'Nuevo',
        description: 'Gorra de seis paneles con bordado frontal y correa ajustable. Disponible en negro y beige.',
    },
    // ---------- Accesorios ----------
    {
        id: 14, name: 'Pack de stickers anime x10', price: 8000, imageUrl: stickersImg, imageFit: 'contain',
        visual: { icon: 'label', color: '#CD4987' }, shippingFree: true, stock: 50,
        category: 'accesorios', storeId: 'otaku-corner', rating: 5, reviewCount: 142, unit: 'pack x10', readyIn: 'Disponible ya', featured: true,
        description: 'Diez stickers troquelados en vinilo mate resistente al agua. Perfectos para el portátil, el termo o el cuaderno.',
    },
    {
        id: 15, name: 'Llavero acrílico personalizado', price: 6000,
        visual: { icon: 'old-key', color: '#1C9EB8' }, shippingFree: true, stock: 35,
        category: 'accesorios', storeId: 'otaku-corner', rating: 4.8, reviewCount: 47, unit: 'unidad', readyIn: 'Entrega en 48 h',
        description: 'Llavero en acrílico transparente de 6 cm a doble cara. Envíanos tu diseño o elige uno del catálogo.',
    },
    {
        id: 16, name: 'Pines metálicos esmaltados', price: 9000,
        visual: { icon: 'round-pushpin', color: '#7E5ACD' }, shippingFree: true, stock: 22,
        category: 'accesorios', storeId: 'otaku-corner', rating: 4.7, reviewCount: 25, unit: 'unidad', readyIn: 'Disponible ya',
        description: 'Pines con broche de seguridad, ideales para morrales y chaquetas.',
    },
    {
        id: 17, name: 'Termo de acero 750 ml', price: 25000,
        visual: { icon: 'tumbler-glass', color: '#21988A' }, shippingFree: true, stock: 18,
        category: 'accesorios', storeId: 'sabanero-urban', rating: 4.8, reviewCount: 33, unit: 'unidad', readyIn: 'Entrega en 24 h', condition: 'Nuevo',
        description: 'Mantiene el agua fría hasta 24 horas, clave para el calor de Montería. Tapa antiderrame.',
    },
    // ---------- Tecnología ----------
    {
        id: 18, name: 'Audífonos inalámbricos con estuche', price: 65000, originalPrice: 79000,
        visual: { icon: 'headphone', color: '#4275C8' }, shippingFree: true, stock: 8,
        category: 'tecnologia', storeId: 'tecnocampus', rating: 4.6, reviewCount: 57, unit: 'unidad', readyIn: 'Entrega hoy', featured: true, condition: 'Nuevo',
        description: 'Bluetooth 5.3, hasta 24 horas con el estuche y cancelación de ruido para estudiar en la biblioteca. Garantía de 3 meses.',
    },
    {
        id: 19, name: 'Cargador rápido USB-C 20 W', price: 32000,
        visual: { icon: 'electric-plug', color: '#2489BA' }, shippingFree: true, stock: 20,
        category: 'tecnologia', storeId: 'tecnocampus', rating: 4.7, reviewCount: 40, unit: 'unidad', readyIn: 'Entrega hoy', condition: 'Nuevo',
        description: 'Cargador de pared con carga rápida PD de 20 W, compatible con Android y iPhone. Incluye cable de 1 m.',
    },
    {
        id: 20, name: 'Mouse inalámbrico silencioso', price: 28000,
        visual: { icon: 'computer-mouse', color: '#5459AA' }, shippingFree: true, stock: 15,
        category: 'tecnologia', storeId: 'tecnocampus', rating: 4.5, reviewCount: 22, unit: 'unidad', readyIn: 'Entrega hoy', condition: 'Nuevo',
        description: 'Clics silenciosos para no molestar en clase, receptor USB y batería AA incluida.',
    },
    {
        id: 21, name: 'Calculadora científica fx-570 (usada)', price: 55000,
        visual: { icon: 'abacus', color: '#5F6C80' }, shippingFree: true, stock: 1,
        category: 'tecnologia', storeId: 'tecnocampus', rating: 4.8, reviewCount: 9, unit: 'unidad', readyIn: 'Entrega hoy', condition: 'Como nuevo',
        description: 'Usada un semestre, funciona perfecto. Resuelve integrales, matrices y ecuaciones. Incluye tapa protectora.',
    },
    {
        id: 22, name: 'Memoria USB 64 GB', price: 25000,
        visual: { icon: 'floppy-disk', color: '#0B70A1' }, shippingFree: true, stock: 25,
        category: 'tecnologia', storeId: 'tecnocampus', rating: 4.6, reviewCount: 31, unit: 'unidad', readyIn: 'Entrega hoy', condition: 'Nuevo',
        description: 'USB 3.2 metálica con llavero. Ideal para llevar tus entregas a la fotocopiadora.',
    },
    // ---------- Libros y apuntes ----------
    {
        id: 23, name: 'Apuntes de Cálculo Diferencial', price: 12000,
        visual: { icon: 'notebook', color: '#C0811B' }, shippingFree: true, stock: 99,
        category: 'libros', storeId: 'apuntes-sinu', rating: 4.9, reviewCount: 88, unit: 'PDF + impreso', readyIn: 'Descarga inmediata', featured: true,
        description: 'Apuntes completos del curso: límites, derivadas y aplicaciones, con más de 120 ejercicios resueltos paso a paso.',
    },
    {
        id: 24, name: 'Guía resuelta de Física Mecánica', price: 15000,
        visual: { icon: 'atom-symbol', color: '#C8740C' }, shippingFree: true, stock: 99,
        category: 'libros', storeId: 'apuntes-sinu', rating: 4.7, reviewCount: 46, unit: 'PDF', readyIn: 'Descarga inmediata',
        description: 'Talleres de cinemática, dinámica y energía resueltos, organizados por corte académico.',
    },
    {
        id: 25, name: 'Libro "Cálculo de una variable" (usado)', price: 40000,
        visual: { icon: 'open-book', color: '#B47F0C' }, shippingFree: true, stock: 2,
        category: 'libros', storeId: 'apuntes-sinu', rating: 4.6, reviewCount: 7, unit: 'unidad', readyIn: 'Entrega en 24 h', condition: 'Usado',
        description: 'Séptima edición en buen estado, algunas páginas subrayadas con lápiz. Ideal para Cálculo I y II.',
    },
    {
        id: 26, name: 'Kit de preparación Saber Pro', price: 18000,
        visual: { icon: 'memo', color: '#D3A02E' }, shippingFree: true, stock: 50,
        category: 'libros', storeId: 'apuntes-sinu', rating: 4.8, reviewCount: 35, unit: 'kit digital', readyIn: 'Descarga inmediata',
        description: 'Simulacros de lectura crítica, razonamiento cuantitativo e inglés con respuestas explicadas.',
    },
    // ---------- Servicios ----------
    {
        id: 27, name: 'Tutoría de Cálculo (1 hora)', price: 25000,
        visual: { icon: 'graduation-cap', color: '#1F976F' }, shippingFree: true, stock: 10,
        category: 'servicios', storeId: 'parceros-tutorias', rating: 5, reviewCount: 41, unit: 'hora', readyIn: 'Agenda para hoy', featured: true,
        description: 'Sesión personalizada para preparar parciales de Cálculo I, II o III. Llevas tus dudas y salimos con ejercicios resueltos.',
    },
    {
        id: 28, name: 'Clase de programación en Python', price: 30000,
        visual: { icon: 'technologist', color: '#0A7A56' }, shippingFree: true, stock: 8,
        category: 'servicios', storeId: 'parceros-tutorias', rating: 4.9, reviewCount: 26, unit: 'hora', readyIn: 'Agenda para mañana',
        description: 'Desde lo básico hasta estructuras de datos. Ideal para Algoritmos y Programación I.',
    },
    {
        id: 29, name: 'Formateo e instalación de software', price: 35000,
        visual: { icon: 'hammer-and-wrench', color: '#26729B' }, shippingFree: true, stock: 6,
        category: 'servicios', storeId: 'tecnocampus', rating: 4.7, reviewCount: 19, unit: 'servicio', readyIn: 'Listo en 24 h',
        description: 'Formateo, Windows o Linux, drivers, Office y respaldo de tus archivos. Entrega en el laboratorio de Sistemas.',
    },
    {
        id: 30, name: 'Diseño de hoja de vida profesional', price: 20000,
        visual: { icon: 'page-facing-up', color: '#329F5B' }, shippingFree: true, stock: 12,
        category: 'servicios', storeId: 'parceros-tutorias', rating: 4.8, reviewCount: 14, unit: 'servicio', readyIn: 'Listo en 48 h',
        description: 'Hoja de vida en español e inglés con diseño limpio, optimizada para prácticas profesionales.',
    },
];

export const products: Product[] = productSeeds.map((seed) => ({
    ...seed,
    storeName: storeById(seed.storeId)?.name ?? 'Tienda Unimarket',
    reviews: reviewPool[seed.category],
}));
