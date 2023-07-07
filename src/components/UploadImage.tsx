import {useRef, useState} from 'react';
import {Box, Button} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EditIcon from '@mui/icons-material/Edit';
import Media from '@/utils/services/media_model';

// const ImageUploadComponent = (props: {addImageToList: Function}) => {
const ImageUploadComponent = (props: { selectedImage: Media | null, handleImage: Function }) => {
    // const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        props.handleImage(file);
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Clear the file input value
            fileInputRef.current.click(); // Trigger file selection dialog
        }
    };

    const handleImageClick = () => {
        handleButtonClick(); // Reselect image when clicked
    };

    const handleResetClick = () => {
        props.handleImage(null); // Reset selected image
    };

    const handleImageHover = (hovered: boolean) => {
        setIsHovered(hovered);
    };

    return (
        <Box sx={{
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap'
        }}>
            <input
                type="file"
                accept="image/*"
                id="imageInput"
                style={{display: 'none'}}
                ref={fileInputRef}
                onChange={handleImageUpload}
            />
            {props.selectedImage ? (
                <Box
                    sx={{
                        position: 'relative',
                        width: '100px',
                        height: '100px',
                    }}
                    onMouseEnter={() => handleImageHover(true)}
                    onMouseLeave={() => handleImageHover(false)}
                >
                    <img
                        style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                        }}
                        // @ts-ignore
                        src={URL.createObjectURL(props.selectedImage)}
                        alt="Selected"
                    />
                    {isHovered && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                borderRadius: '50%',
                                cursor: 'pointer',
                            }}
                            onClick={handleImageClick}
                        >
                            <EditIcon sx={{color: '#fff'}}/>
                        </Box>
                    )}
                </Box>
            ) : (
                <Button variant="outlined" onClick={handleButtonClick} sx={{width: '100px', height: '100px'}}>
                    <AddPhotoAlternateIcon/>
                </Button>
            )}
            <Box sx={{padding: '25px 0 0'}}>
                <Button
                    variant='outlined'
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        height: 'fit-content',
                    }}
                    onClick={handleResetClick}
                >
                    Reset image
                </Button>
            </Box>
        </Box>
    );
};

export default ImageUploadComponent;
