import React, {useEffect, useState} from "react";
import "./ProfilePage.css";

function SearchPage({videos}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredVideos, setFilteredVideos] = useState([]);
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
                    <div className="grid-item" key={video.id}>
                        <div className="title">{video.title}</div>
                        <img src={video.url} style={{width: "42vw"}} alt={video.title || "News article"} />
                    </div>
                ))}
            </div>
        </div>);
}

export default SearchPage;