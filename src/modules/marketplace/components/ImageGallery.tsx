import React, { useState } from 'react';

interface ImageGalleryProps {
    images: string[];
    productName: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, productName }) => {
    const [mainImage, setMainImage] = useState(images[0]);

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-2">
                {images.map((img, index) => (
                    <img 
                        key={index}
                        src={img} 
                        alt={`${productName} - vista ${index + 1}`}
                        className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${mainImage === img ? 'border-blue-500' : 'border-transparent'}`}
                        onMouseEnter={() => setMainImage(img)}
                    />
                ))}
            </div>
            <div className="flex-grow">
                <img src={mainImage} alt={productName} className="w-full h-auto object-contain rounded-lg shadow-lg" />
            </div>
        </div>
    );
};

export default ImageGallery;