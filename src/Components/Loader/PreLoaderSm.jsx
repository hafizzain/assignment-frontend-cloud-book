import React from 'react'

const PreloaderSm = (props) => {
    return (
        <div className={`preloader-wrapper preloader-sm ${props.className}`}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default PreloaderSm