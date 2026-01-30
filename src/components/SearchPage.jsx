import React, {useEffect, useState} from "react";
import "./ProfilePage.css";

function SearchPage({videos, onArticleSelect}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredVideos, setFilteredVideos] = useState([]);
    
    const getProxyImageUrl = (images) => {
        if (!images) return '';
        const imageUrl = Array.isArray(images) ? images[1] || images[0] : images;
        return `http://localhost:3001/proxy-image?url=${encodeURIComponent(imageUrl)}`;
    };
    
    // Function to filter videos based on search term
    // const filterVideos = () => {
    useEffect(() => {
        const filtered = videos.filter(video =>
            (video.title?.toLowerCase().includes(searchTerm.toLowerCase()) || video.description?.toLowerCase().includes(searchTerm.toLowerCase()) || video.source?.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredVideos(filtered);
    }, [searchTerm, videos]);
    // };

    return (
        <div className="container">
            <div className="search-container">
                <input type="text" placeholder="Search..." className="search-input"
                       onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            <div className="grid-container">
                {filteredVideos.map((video, index) => (
                    <div 
                        className="grid-item" 
                        key={video.id}
                        onClick={() => onArticleSelect(video.id)}
                        style={{cursor: 'pointer'}}
                    >
                        <div className="title">{video.title}</div>
                        <img src={getProxyImageUrl(video.images)} style={{width: "42vw"}} alt={video.title || "News article"} />
                    </div>
                ))}
            </div>
        </div>);
}

export default SearchPage;