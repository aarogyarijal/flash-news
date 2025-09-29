import React from "react";
import "./ProfilePage.css";

function SavedPage({videos}) {
    return (
        <div className="container">
            <div className="search-container">
                <h1>Saved Videos</h1>
            </div>
            <div className="grid-container">
                {videos.map((video) => (
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

export default SavedPage;