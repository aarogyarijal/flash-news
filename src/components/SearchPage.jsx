import React, {useState} from "react";

function SearchPage({videos}) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredVideos = videos.videos.filter(video =>
        video.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <div className="search-container">
                <input type="text" placeholder="Search..." className="search-input"
                       onChange={(e) => setSearchTerm(e.target.value)}/>
                <button className="search-button">&#128269;</button>
            </div>
            <div className="grid-container">
                {filteredVideos.map((video, index) => (
                    <div className="grid-item">
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