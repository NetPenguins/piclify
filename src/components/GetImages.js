import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import axios from "axios"
import $ from "jquery"
import Lazyload from "react-lazyload";
import ImGal from 'react-image-gallery';
import im from "../images/gatsby-icon.png"
import "bulma/css/bulma.css"
import "react-image-gallery/styles/css/image-gallery.css";
import "../styles/gallery.css"


/**
 * @param {*} images  The images that are aquired from InfiniteImages
 * @param {*} loading  Bool reflecting if image gathering is finished or not. 
 * 
 *  @summary Image Gallery is a React Component that is used to create an image grid 
 *  by calling Facebook api GetImages which associates the objects 
 *  to a corresponding component for a Carousel. When an image is selected that image is displayed
 *  in the Carousel which allows the user to enter full screen or browse other images/videos. 
 * 
 */
const ImageGallery = ({ images, loading}) => {
  // Create gallery here
  const [isActive, setisActive] = React.useState(false);
  const [currentPhoto, setCurrentPhoto] = React.useState(images);
  
  /**
   * Used to toggle scroll lock on HTML element
   **/
  function toggle(){
    $('html').toggleClass("is-clipped")
  }
  /**
   * Array for holding img objects for passing to carousel.
   */
  var componentList = []
  /** Used to create img items for Carousel */
  function createItem(img){
    componentList.push(
    {
      original: img["sourcejpg"],
      thumbnail: img["sourcejpg"]
    }
    )
  }
  images.map(image => createItem(image))
  return (
    <> 
     <div className={`modal ${isActive ? "is-active" : ""}`} id="Carousel-Modal">
        <div className="modal-background"></div>
          <div className="modal-content" id="Carousel-Modal-Content">
            <ImGal items={componentList} showThumbnails={false} startIndex={componentList.findIndex(function(item, i){
              return item.original === currentPhoto
            })}/>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={() => {setisActive(!isActive); toggle();}}></button>
      </div>
     <div className="image-grid">
      {!loading ? images.map(image => ( 
          //Map images to an image item inside the main grid. Create an event to toggle activation of modal
            <div className="image-item" key={image["id"]}>  
            {/*
              * LazyLoad Images to help increase loadtimes on heavier queries 
              * TODO: need to add place holder (preferably spinner of sorts)
              */}
            <Lazyload height={25} offset={5}>
              <a
                onClick={() => {
                  setisActive(!isActive);
                  toggle();
                }}
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

/**
 * 
 * @param {*} site  The location name that the album is being retrieved for 
 */
const GetImages = ({site}) => {
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
        index: images.length === 0 ? 0 : images.length-1,
        id: image.id, // id of image
        alt_text: image.alt_text})) //alt text
      ])
      setLoading(false)
    }).catch((e) => {
      console.log(`Error caught in GetImages ${e}`)
    }) 
  }

  return (
    <ImageGallery images={images} loading={loading} />
  )
}

ImageGallery.propTypes = {
  images: PropTypes.array,
  loading: PropTypes.bool,
}

export default GetImages
