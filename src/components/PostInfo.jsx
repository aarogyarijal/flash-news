import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import './PostInfo.css';

export default function PostInfo(props) {
  const { title, description, source, link } = props;
  console.log("link:"+link);
  return (
    <div className="footer-container">
      <div className="footer-left">
        <div className="text">
          <h3>{title}</h3>
          <p>{description}</p>
          <a href={link} className="link-button">Read More</a>
          <div className="ticker">
            <FontAwesomeIcon icon={faCircle} style={{width: '30px', color: "green"}}/>
            {/* eslint-disable-next-line jsx-a11y/no-distracting-elements */}
            <marquee direction="left" scrollamount="4">
              <span>{source}</span>
            </marquee>
          </div>
        </div>
      </div>
    </div>
  );
}
