import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import PostCard from './components/PostCard';
import NavBar from './components/NavBar';
import SearchPage from "./components/SearchPage";
import ProfilePage from "./components/ProfilePage";
import SavedPage from "./components/SavedPage";

function App() {
    const [videos] = useState([]);
    const videoRefs = useRef([]);
    const containerRef = useRef(null);
    const [currentPage, setCurrentPage] = useState("home");
    const [videoUrls, setVideoUrls] = useState([]);
    const [selectedArticleIndex, setSelectedArticleIndex] = useState(null);

    useEffect(() => {
        // Fetch JSON file from the public directory
        fetch('http://localhost:3001/search')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Read the response body once
            })
            .then(data => {
                if (!data || !data.articles) {
                    throw new Error('Invalid data structure');
                }
                const allArticles = data.articles
                    .filter(article => article.image || article.videos);
                const transformedData = allArticles.map((article, index) => ({
                    id: article.id || index + 1,
                    source: article.source,
                    url: article.link,
                    title: article.title,
                    published: article.publishedAt,
                    images: article.image,
                    videos: null,
                    description: article.description,
                    journalists: article.journalists,
                    category: article.category,
                    profilePic: article.logo,
                    likes: 0,
                    comments: 0,
                    saves: 0,
                    shares: 0
                }));
                console.log(transformedData);
                setVideoUrls(transformedData);
            })
            .catch(error => {
                console.error('Failed to fetch news:', error);
            });
    }, []);


    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.8, // Adjust this value to change the scroll trigger point
        };

        // This function handles the intersection of videos
        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const videoElement = entry.target;
                    videoElement.play();
                } else {
                    const videoElement = entry.target;
                    videoElement.pause();
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);

        // We observe each video reference to trigger play/pause
        videoRefs.current.forEach((videoRef) => {
            observer.observe(videoRef);
        });

        // We disconnect the observer when the component is unmounted
        return () => {
            observer.disconnect();
        };
    }, [videos]);

    // This function handles the reference of each video
    const handleVideoRef = (index) => (ref) => {
        videoRefs.current[index] = ref;
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleArticleSelect = (articleId) => {
        const index = videoUrls.findIndex(v => v.id === articleId);
        if (index !== -1) {
            setSelectedArticleIndex(index);
            setCurrentPage("home");
            // Scroll to the selected article after switching to home
            setTimeout(() => {
                const container = document.querySelector('.container');
                if (container) {
                    container.scrollTo({
                        top: index * window.innerHeight,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    };

    return (
        <div className="app">
            <div className="container">
                {(currentPage === "home") &&
                    videoUrls.map((video, index) => (
                        <PostCard
                            key={index}
                            source={video.source}
                            url={video.url}
                            title={video.title}
                            published={video.published}
                            images={video.images}
                            videos={video.videos}
                            description={video.description}
                            journalists={video.journalists}
                            likes={video.likes}
                            saves={video.saves}
                            comments={video.comments}
                            shares={video.shares}
                            profilePic={video.profilePic}
                            setVideoRef={handleVideoRef(index)}
                            autoplay={index === 0}
                        />
                    ))}

                {/*{(currentPage !== "home") && (*/}
                {/*    <div style={{height : "100%"}}> <h1 style={{color : "white"}}>{currentPage} Unavailable</h1> </div>*/}
                {/*)*/}
                {/*}*/}

                {(currentPage === "search") && (
                    <SearchPage videos={videoUrls} onArticleSelect={handleArticleSelect}/>
                )
                }
                {(currentPage === "profile") && (
                    <ProfilePage/>
                )
                }
                {(currentPage === "saved") && (
                    <SavedPage videos={videos.slice(0, 2)}/>
                )
                }
                <NavBar className="bottom-navbar" currentPage={currentPage} handlePageChange={handlePageChange}/>
            </div>
        </div>
    );

}

export default App;
