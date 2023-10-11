'use client'
import { useAppContext } from '@/contexts/appContext'
import getCroppedImg from '@/utils/getCropImage';
import React, { useState } from 'react'
import Cropper from 'react-easy-crop';

const Page = () => {
    const { file} = useAppContext();
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [CroppedImage, setCroppedImage] = useState('');
    
    const onCropComplete = async (_, croppedAreaPixels) => {
        const croppedImage = await getCroppedImg(file, croppedAreaPixels);
        setCroppedImage(croppedImage)
    };
    
    return (
        <div className='max-h-screen min-h-screen bg-base-200 w-full flex'>
            <div className='w-[70%] m-auto h-[600px]  bg-white rounded-lg relative'>
            <Cropper
                    image={file}
                    crop={crop}
                    zoom={zoom}
                    aspect={9 / 16}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    zoomWithScroll
                    
                />
            </div>
        </div>
    );
}

export default Page;
