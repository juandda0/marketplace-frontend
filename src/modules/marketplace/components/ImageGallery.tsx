import { useRef, useState } from 'react';
import ProductVisual from '../../../core/ui/ProductVisual';
import type { Visual } from '../../../core/ui/visualIcons';

interface ImageGalleryProps {
    images: string[];
    visual: Visual;
    imageFit?: 'cover' | 'contain';
    productName: string;
}

type Slide = { kind: 'image'; src: string } | { kind: 'visual'; variant: 0 | 1 | 2 };

/** Galería deslizable en móvil con miniaturas en escritorio. */
const ImageGallery = ({ images, visual, imageFit, productName }: ImageGalleryProps) => {
    const slides: Slide[] = images.length
        ? images.map((src) => ({ kind: 'image', src }))
        : [0, 1, 2].map((v) => ({ kind: 'visual', variant: v as 0 | 1 | 2 }));
    const [active, setActive] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);

    const goTo = (index: number) => {
        setActive(index);
        const track = trackRef.current;
        if (track) track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' });
    };

    const onScroll = () => {
        const track = trackRef.current;
        if (!track) return;
        const index = Math.round(track.scrollLeft / track.clientWidth);
        if (index !== active) setActive(index);
    };

    const renderSlide = (slide: Slide, className: string) =>
        slide.kind === 'image' ? (
            <ProductVisual visual={visual} imageUrl={slide.src} imageFit={imageFit} alt={productName} className={className} />
        ) : (
            <ProductVisual visual={visual} variant={slide.variant} iconScale="lg" alt={`${productName}, vista ${slide.variant + 1}`} className={className} />
        );

    return (
        <div className="flex flex-col gap-3 md:flex-row-reverse">
            <div className="relative flex-1">
                <div
                    ref={trackRef}
                    onScroll={onScroll}
                    className="flex snap-x snap-mandatory overflow-x-auto rounded-3xl border border-line/60 scrollbar-none"
                >
                    {slides.map((slide, i) => (
                        <div key={i} className="w-full shrink-0 snap-center">
                            {renderSlide(slide, 'aspect-square w-full')}
                        </div>
                    ))}
                </div>
                {slides.length > 1 && (
                    <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5 md:hidden">
                        {slides.map((_, i) => (
                            <span
                                key={i}
                                className={`h-1.5 rounded-full transition-all ${i === active ? 'w-5 bg-white' : 'w-1.5 bg-white/50'}`}
                            />
                        ))}
                    </div>
                )}
            </div>
            {slides.length > 1 && (
                <div className="hidden gap-2 md:flex md:flex-col">
                    {slides.map((slide, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => goTo(i)}
                            className={`overflow-hidden rounded-xl border-2 transition ${i === active ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'}`}
                            aria-label={`Ver imagen ${i + 1}`}
                        >
                            {renderSlide(slide, 'h-16 w-16')}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageGallery;
