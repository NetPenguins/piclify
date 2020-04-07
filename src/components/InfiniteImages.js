import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import axios from "axios"
import "./gallery.css"
import "bulma/css/bulma.css"
import Lazyload from "react-lazyload";


const ImageGallery = ({ images, loading, fetchImages }) => {
  // Create gallery here
  const [isActive, setisActive] = React.useState(false);
  const [currentPhoto, setCurrentPhoto] = React.useState(images);

  return (
    <> 
    <div className="image-grid">
      {!loading
        ? images.map(image => (
          //Map images to an image item inside the main grid. Create an event to togle activation of modal
            <div className="image-item" key={image["id"]}> 
            {/*
              * LazyLoad Images to help increase loadtimes on heavier queries 
              * TODO: need to add place holder (preferably spinner of sorts)
              */}
            <Lazyload height={25} offset={10}>
              <a
                onClick={() => {
                  setisActive(!isActive); 
                }}
                className={`${isActive ? "is-active" : ""}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                {/* 
                  * Create picture object to allow client to determine support for webp 
                  * If Client does not support webp we will serve jpg
                  * This determination will save client load times drastically if support for webp is found
                  * Display image in grid and set event listener
                  */}
                <picture>
                  <source srcSet={image["sourcewebp"]} type="image/webp" onClick={() => {
                    setCurrentPhoto(image["sourcewebp"]);
                  }}/>
                  <source srcSet={image["sourcejpg"]} type="image/jpg" onClick={() => {
                    setCurrentPhoto(image["sourcejpg"]);
                  }}/>
                  <img src={image["sourcejpg"]} alt={image["alt_text"]} onClick={() => {
                    setCurrentPhoto(image["sourcejpg"]);
                  }}/>
                </picture>
                
                {/* Map the image to the modal to call the image that was clicked on */}
                 <div className={`modal ${isActive ? "is-active" : ""}`}>
                  <div className="modal-background"></div>
                    <div className="modal-content">
                      <p className="image">
                        <img src={currentPhoto} alt={image["alt_text"]} />
                      </p>
                  </div>
                  <button className="modal-close is-large" aria-label="close"></button>
                </div>
              </a>
              </Lazyload>
            </div>
          ))
         : "" } 
         {/* Get creative possibly add a loading gif or css animation if you know your query will take some time 
           * This is seperate from LazyLoad as this is the loading state of InfinitImages object e.g the initial query
           * or subsequent queries if you choose to have true "infinite" images 
           */}
    </div>
    </> 
  )
}

const InfiniteImages = ({site}) => {
  // Hold state
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch images on component mount
  useEffect(() => {
    fetchImages()
  }, [])

  // Fetch Images from Netlify Functions
  //TODO: Add logic here to handle image size needed per device
  const fetchImages = () => {
    axios(`/.netlify/functions/fetch?album=${site}`).then(res => {
      setImages([ ...images, ...res.data.images.data.map(image => (
       {sourcewebp: image.webp_images[0].source, //webp url
        sourcejpg: image.images[0].source, //jpg url
        id: image.id, // id of image
        alt_text: image.alt_text})) //alt text
      ]) 
      setLoading(false)
    })
  }

  return (
    <ImageGallery images={images} loading={loading} fetchImages={fetchImages} />
  )
}

ImageGallery.propTypes = {
  images: PropTypes.array,
  loading: PropTypes.bool,
  fetchImages: PropTypes.func,
}

export default InfiniteImages
