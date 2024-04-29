import React from 'react';

const ProfilePage = () => {
    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>User Profile</h1>
            </div>
            <div className="profile-details">
                <div className="profile-avatar">
                    <img src="https://cdn4.vectorstock.com/i/1000x1000/97/68/account-avatar-dark-mode-glyph-ui-icon-vector-44429768.jpg" alt="User Avatar" />
                </div>
                <div className="profile-info">
                    <h2>John Doe</h2>
                    <p>Email: johndoe@example.com</p>
                    <p>Location: New York, USA</p>
                </div>
            </div>
            <div className="profile-bio">
                <h2>Bio</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in lectus eget nisi fermentum euismod. Aliquam nec tristique libero.</p>
            </div>
        </div>
    );
}

export default ProfilePage;
