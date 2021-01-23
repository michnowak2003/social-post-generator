import React from 'react';

import './Post.css';
const Post = ({data})  => {

    return (
        <div id="post">
        <div className="post__container" style={{width: `${data.background.width}px`, height: `${data.background.height}px`}}>
            <img className="post__image" src={data.image}/>
            <img className="post__background-image" src={data.background.image}/>
            <span className="post__text--left">{data.city}</span>
            <span className="post__text--right">{data.power}</span>
        </div></div>
    );
}

export default Post;
