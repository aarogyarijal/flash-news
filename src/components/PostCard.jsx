import React, {useEffect, useState, useRef} from 'react';
import PostInfo from './PostInfo';
import PostInteract from './PostInteract';
import './PostCard.css';

const PostCard = (props) => {
    const {source, url, title, published, images, videos, description, journalists, likes, shares, comments, saves, profilePic, setVideoRef, autoplay} = props;
    const videoRef = useRef(null);
    const [imageSrc, setImageSrc] = useState('');
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
        const checkImage = (url) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = () => resolve(url);
                img.onerror = () => reject();
            });
        };

        const loadImage = async () => {
            if (!Array.isArray(images)) {
                setImageSrc(images);
                return;
            }
            for (const imageUrl of images.slice(1)) {
                try {
                    const validUrl = await checkImage(imageUrl);
                    setImageSrc(validUrl);
                    break;
                } catch {
                    // continue to next URL
                }
            }
        };

        loadImage();
    }, [images]);

    return (
        <>
            <div className="video">
                 The video element
                {/*<video muted*/}
                {/*    className="player"*/}
                {/*    onClick={onVideoPress}*/}
                {/*    ref={(ref) => {*/}
                {/*        videoRef.current = ref;*/}
                {/*        setVideoRef(ref);*/}
                {/*    }}*/}
                {/*    loop*/}
                {/*    src={videos[0]}*/}
                {/*></video>*/}
                <img className="player" src={imageSrc} />
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
