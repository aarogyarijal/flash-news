import React, {useEffect, useState} from "react";

function SearchPage({videos}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredVideos, setFilteredVideos] = useState([]);
    // Function to filter videos based on search term
    // const filterVideos = () => {
    useEffect(() => {
        const filtered = videos.filter(video =>
            (video.title.toLowerCase().includes(searchTerm.toLowerCase()) || video.description.toLowerCase().includes(searchTerm.toLowerCase()) || video.source.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredVideos(filtered);
    }, [searchTerm]);
    // };

    return (
        <div className="container">
            <div className="search-container">
                <input type="text" placeholder="Search..." className="search-input"
                       onChange={(e) => setSearchTerm(e.target.value)}/>
                <button className="search-button">&#128269;</button>
            </div>
            <div className="grid-container">
                {filteredVideos.map((video, index) => (
                    <div className="grid-item" key={video.id}>
                        <div className="title">{video.title}</div>
                        <video muted loop style={{width: "42vw"}}>
                            <source src={video.url} type="video/mp4"/>
                        </video>
                    </div>
                ))}
            </div>
        </div>);
}

export default SearchPage;