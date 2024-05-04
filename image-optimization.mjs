import imagemin from 'imagemin';
import jpegtran from 'imagemin-jpegtran';
import pngquant from 'imagemin-pngquant';

(async () => {
    const files = await imagemin(['images/*.{jpg,png}'], {
        destination: 'optimized-images',
        plugins: [jpegtran({ quality: 80 }), pngquant({ quality: [0.6, 0.8] })],
    });

    console.log('Images compressed successfully!');
})();
