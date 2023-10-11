// sorry i am not a canvas developer so i just created
// this function by my friend, thanks to him,

async function getCroppedImg(imageSrc, pixelCrop) {
    const image = new Image();
    image.src = imageSrc;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const aspectRatio = 9 / 16; 


    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.width / aspectRatio;
    
    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        canvas.width,
        canvas.height
    );

    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (!blob) {

                console.error('Error creating blob from canvas.');
                return;
            }

            const croppedImageUrl = URL.createObjectURL(blob);


            resolve(croppedImageUrl);
        }, 'image/jpeg');
    });
}

export default getCroppedImg;
