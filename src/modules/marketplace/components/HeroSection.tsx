import React from 'react';

const HeroSection: React.FC = () => {
    return (
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <div className="container mx-auto flex items-center justify-between py-16 px-24">
                <div className="space-y-4">
                    <p className="font-bold text-lg">LA MEJOR OPORTUNIDAD PARA TI</p>
                    <h1 className="text-5xl font-extrabold tracking-tight">TU MERCADO</h1>
                    <h1 className="text-5xl font-extrabold tracking-tighter -mt-4">TU UNIVERSIDAD</h1>
                    <p className="text-2xl">UNETE <span className="bg-white text-blue-700 font-bold px-2 py-1 rounded">YA</span></p>
                </div>
                <div className="hidden md:block">
                    <img src='' alt="Oferta tecnológica" className="rounded-lg h-full w-auto object-"/>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;