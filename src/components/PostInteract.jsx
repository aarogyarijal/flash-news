import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart, faCommentDots, faBookmark, faShare } from '@fortawesome/free-solid-svg-icons';
import './PostInteract.css';

function PostInteract({ likes, comments, saves, shares, profilePic }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  // Function to convert likes count to a number
  const parseLikesCount = (count) => {
    if (typeof count === 'string') {
      if (count.endsWith('K')) {
        return parseFloat(count) * 1000;
      }
      return parseInt(count);
    }
    return count;
  };

  // Function to format likes count
  const formatLikesCount = (count) => {
    if (count >= 10000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count;
  };

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  return (
    <div className="footer-right">
      
      <div className="sidebar-icon">
        {/* The heart icon for liking */}
        <FontAwesomeIcon
          icon={faHeart}
          style={{ width: '25px', height: '25px', color: liked ? '#FF0000' : 'white' }}
          onClick={handleLikeClick}
        />
        {/* Displaying the formatted likes count */}
        <p>{formatLikesCount(parseLikesCount(likes) + (liked ? 1 : 0))}</p>
      </div>
      <div className="sidebar-icon">
        {/* The comment icon */}
        <FontAwesomeIcon icon={faCommentDots} style={{ width: '25px', height: '25px', color: 'white' }} />
        {/* Displaying the number of comments */}
        <p>{comments}</p>
      </div>
      <div className="sidebar-icon">
        {saved ? (
          // Displaying the bookmark icon when saved
          <FontAwesomeIcon
            icon={faBookmark}
            style={{ width: '25px', height: '25px', color: '#ffc107' }}
            onClick={() => setSaved(false)}
          />
        ) : (
          // Displaying the bookmark icon when not saved
          <FontAwesomeIcon
            icon={faBookmark}
            style={{ width: '25px', height: '25px', color: 'white' }}
            onClick={() => setSaved(true)}
          />
        )}
        {/* Displaying the number of saves */}
        <p>{saved ? saves + 1 : saves}</p>
      </div>
      <div className="sidebar-icon">
        {/* The share icon */}
        <FontAwesomeIcon icon={faShare} style={{ width: '25px', height: '25px', color: 'white' }} />
        {/* Displaying the number of shares */}
        <p>{shares}</p>
      </div>
    </div>
  );
}

export default PostInteract;
