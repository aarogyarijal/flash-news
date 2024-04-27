import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import PostCard from './components/PostCard';
import NavBar from './components/NavBar';
import SearchPage from "./components/SearchPage";

const videoUrls = [
    {
        id:1,
        url: require('./videos/politics.mp4'),
        title: 'US Supreme Court justices in Trump case lean toward some level of immunity',
        description: 'The Supreme Court\'s conservative majority suggests U.S. presidents should have some immunity from criminal charges for official acts, but not absolute immunity. Trump\'s appeal for immunity in election-related charges faces skepticism, with concerns about potential abuse of prosecution power. Justices consider returning the case to lower courts for further analysis.',
        source: 'Reuters - John Kruzel & Andrew Chung - April 25, 2024',
        link:'https://www.reuters.com/legal/us-supreme-court-weighs-trumps-bid-immunity-prosecution-2024-04-25/',
        likes: 320,
        comments: 23,
        saves: 3,
        shares: 12,
    },
    {
        id:2,
        url: require('./videos/google.mp4'),
        title: 'Google parent announces first-ever dividend; beats on sales, profit; shares soar',
        description: 'Alphabet, Google\'s parent company, announced its first-ever dividend of 20 cents per share and a $70 billion stock buyback, resulting in a nearly 16% surge in its stock value. The move follows strong quarterly results, including $80.54 billion in revenue and a 13% increase in advertising sales, driven by demand for cloud services and AI technologies.',
        source: 'Reuters - Greg Bensinger and Akash Sriram - April 25, 2024',
        link: 'https://www.reuters.com/technology/google-parent-alphabet-announces-first-ever-divided-20-cents-per-share-2024-04-25/',
        likes: '13.4K',
        comments: 331,
        saves: 54,
        shares: 20,
    },
    {
        id:3,
        url: require('./videos/bomb.mp4'),
        title: 'U.S. Secretly Shipped New Long-Range Missiles to Ukraine',
        description: 'The United States covertly sent Ukraine long-range ATACMS missiles, used in strikes on a Russian military airfield in Crimea and troops in southeastern Ukraine. President Biden approved the move in mid-February, marking a shift in policy. The aid package also included other weaponry, addressing Ukraine\'s defense needs amid ongoing conflict.',
        source: 'NY Times - Eric Schmitt - April 24, 2024',
        link: 'https://www.nytimes.com/2024/04/24/us/us-ukraine-russia-missiles.html',
        likes: 338,
        comments: 432,
        saves: 13,
        shares: 11,
    },
    {
        id:4,
        url: require('./videos/tiktok.mp4'),
        title: 'TikTok will not be sold, Chinese owner tells US',
        description: 'ByteDance, the Chinese parent company of TikTok, denies plans to sell the app despite US legislation threatening a ban unless sold. TikTok vows legal challenge, emphasizing its independence from Chinese government control. The law gives ByteDance until 2025 to divest, amid concerns over data security and China-US relations.',
        source: 'BBC - João da Silva - April 26, 2024',
        link:'https://www.bbc.com/news/articles/c289n8m4j19o',
        likes: 332,
        comments: 452,
        saves: 1,
        shares: 110,
    },
    {
        id:5,
        url: require('./videos/robot.mp4'),
        title: 'You can buy a flame-throwing robot dog for under $10,000',
        description: 'Ohio-based company Throwflame is selling a fire-spewing robot dog named Thermonator for $9,420. The robot can operate in dark environments, shoot fire up to nine meters, and is legal in 48 states. It\'s marketed for snow and ice removal, wildfire management, and entertainment. Age restrictions aren\'t specified.',
        source: 'Business Insider - Jyoti Mann - Apr 25, 2024',
        link:'https://www.businessinsider.com/thermonator-flame-throwing-robot-dog-selling-online-legal-us-states-2024-4',
        likes: 6232,
        comments: 1522,
        saves: 53,
        shares: 670,
    }
];

function App() {
    const [videos, setVideos] = useState([]);
    const videoRefs = useRef([]);
    const [currentPage, setCurrentPage] = useState("home");

    useEffect(() => {
        setVideos(videoUrls);
    }, []);


    // Credits: https://github.com/s-shemmee/flash-news
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

    return (
        <div className="app">
            <div className="container">
                {(currentPage === "home") &&
                    videos.map((video, index) => (
                        <PostCard
                            key={index}
                            title={video.title}
                            description={video.description}
                            source={video.source}
                            link={video.link}
                            likes={video.likes}
                            saves={video.saves}
                            comments={video.comments}
                            shares={video.shares}
                            url={video.url}
                            setVideoRef={handleVideoRef(index)}
                            autoplay={index === 0}
                        />
                    ))}

                {/*{(currentPage !== "home") && (*/}
                {/*    <div style={{height : "100%"}}> <h1 style={{color : "white"}}>{currentPage} Unavailable</h1> </div>*/}
                {/*)*/}
                {/*}*/}

                {(currentPage === "search" || currentPage === "saved") && (
                    <SearchPage videos={videos}/>
                )
                }
                <NavBar className="bottom-navbar" currentPage={currentPage} handlePageChange={handlePageChange}/>
            </div>
        </div>
    );

}

export default App;
