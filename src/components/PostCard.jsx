import React, {useEffect, useState} from 'react';
import PostInfo from './PostInfo';
import PostInteract from './PostInteract';
import './PostCard.css';

const PostCard = (props) => {
    const {source, url, title, images, description, journalists, likes, shares, comments, saves, profilePic} = props;
    const [imageSrc, setImageSrc] = useState('');
    const [imageError, setImageError] = useState(false);
    let footer = source;
    if(journalists) {
        footer = source + " | " + journalists?.join(" & ");
    }
    // useEffect(() => {
    //     if (autoplay) {
    //         videoRef.current.play();
    //     }
    // }, [autoplay]);

    // const onVideoPress = () => {
    //     if (videoRef.current.paused) {
    //         videoRef.current.play();
    //     } else {
    //         videoRef.current.pause();
    //     }
    // };

    useEffect(() => {
        const proxyUrl = (url) => `http://localhost:3001/proxy-image?url=${encodeURIComponent(url)}`;
        
        const checkImage = (url) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = proxyUrl(url);
                img.onload = () => resolve(proxyUrl(url));
                img.onerror = () => reject();
            });
        };

        const loadImage = async () => {
            setImageError(false);
            
            if (!images) {
                setImageError(true);
                return;
            }
            
            if (!Array.isArray(images)) {
                try {
                    const validUrl = await checkImage(images);
                    setImageSrc(validUrl);
                } catch {
                    setImageError(true);
                }
                return;
            }
            
            let loaded = false;
            for (const imageUrl of images.slice(1)) {
                try {
                    const validUrl = await checkImage(imageUrl);
                    setImageSrc(validUrl);
                    loaded = true;
                    break;
                } catch {
                    // continue to next URL
                }
            }
            
            if (!loaded) {
                setImageError(true);
            }
        };

        loadImage();
    }, [images]);

    return (
        <>
            <div className="video">
                {imageError ? (
                    <div className="image-error">
                        <div className="error-icon">⚠️</div>
                        <div className="error-text">Unable to load image</div>
                    </div>
                ) : (
                    <img className="player" src={imageSrc} alt={title || "News article"} />
                )}
            </div>
            <div className="bottom-controls">
                <div className="footer-left">
                    {/* The left part of the container */}
                    <PostInfo title={title} description={description} source={footer} url={url}/>
                </div>
                <div className="footer-right">
                    {/* The right part of the container */}
                    <PostInteract likes={likes} shares={shares} comments={comments} saves={saves}
                                  profilePic={profilePic}/>
                </div>
            </div>
        </>
    );
};

export default PostCard;
