import React, {useEffect, useState} from "react";

function SearchPage({videos}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredVideos, setFilteredVideos] = useState([]);
    // Function to filter videos based on search term
    const filterVideos = () => {
        // const filtered = videos.filter(video =>
        //     (video.title.toLowerCase().includes(searchTerm.toLowerCase()) || video.description.toLowerCase().includes(searchTerm.toLowerCase()) || video.source.toLowerCase().includes(searchTerm.toLowerCase()))
        // );

        const filtered = [];
        for (let i=0; i < videos.length; i++){
            if(videos[i].title.toLowerCase().includes(searchTerm.toLowerCase()) || videos[i].description.toLowerCase().includes(searchTerm.toLowerCase()) || videos[i].source.toLowerCase().includes(searchTerm.toLowerCase())){
                filtered.push(videos[i])
            }
        }

        setFilteredVideos(filtered);
        console.log(filteredVideos)
    };

    return (
        <div className="container">
            <div className="search-container">
                <input type="text" placeholder="Search..." className="search-input"
                       onChange={(e) => setSearchTerm(e.target.value)}/>
                <button className="search-button" onClick={filterVideos}>&#128269;</button>
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