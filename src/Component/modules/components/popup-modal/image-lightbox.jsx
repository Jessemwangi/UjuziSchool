import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';


const ImageLightBox = ({images,open,setOpen,photoIndex,setPhotoIndex}) => {
    return (
        <>
            {open && (
                <Lightbox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={() => setOpen(false)}
                    onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
                    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
                />
            )}
        </>
    )
}

export default ImageLightBox;