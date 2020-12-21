import React from 'react';
import './index.css';

function HeroSection({ title, paragraphs, image }) {
    return (
        <div id="heroSection">
            <div className="text">
                <h1>{title}</h1>
                <div className="paragraphes">{paragraphs}</div>
            </div>
            <img src={image} alt="contact" />
        </div>
    );
}

export default HeroSection;
