import {
  Backdrop,
  CircularProgress,
} from '@material-ui/core'

import {
  Modal
} from "react-bulma-components"

import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import axios from "axios"
import Lazyload from "react-lazyload";
import ImGal from 'react-image-gallery';
import InfiniteScroll from "react-infinite-scroll-component"
import ErrorGraphic from "./ErrorGraphic"

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

const ImageGallery = ({ images, paging, loading, fetchImages, errorGraphic, errorCode}) => {
  // Create gallery here
  const [isActive, setisActive] = React.useState(false);
  const [currentPhoto, setCurrentPhoto] = React.useState(images);
  const open = () => setisActive(true);
  const close = () => setisActive(false);
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
    {console.log(errorCode)}
    {errorGraphic ? <ErrorGraphic errorCode={errorCode}/> :
    <InfiniteScroll
      dataLength={images.length}
      next={() => fetchImages(paging)}
      hasMore={paging === "none" ? false : true}
      loader={<Spinner/>}
      scrollThreshold={"100px"}
    > 
     {/* <div className={`modal ${isActive ? "is-active" : ""}`} id="Carousel-Modal"> */}
       <Modal show={isActive} onClose={close}>
        <div className="modal-background"></div>
          <div className="modal-content" id="Carousel-Modal-Content">
            <ImGal items={componentList} showThumbnails={false} startIndex={componentList.findIndex(function(item, i){
              return item.original === currentPhoto
            })}/>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={close}></button>
      </Modal>
      {/* </div> */}
     <div className="image-grid">
      {!loading ? images.map(image => ( 
          //Map images to an image item inside the main grid. Create an event to toggle activation of modal
            <div className="image-item" key={image["id"]}>  
            <Lazyload key={image.id}>
              <a
                onClick={() => {
                  open();
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
         : <CircularProgress style={
           {
              position: "absolute",
              top: "50%",
              left: "50%",
              margin: "auto",
            }
           } /> } 
    </div>
    </InfiniteScroll> }
    </>
  )
}

const Spinner = () => {
  return(
    <Backdrop>
      <CircularProgress/>
    </Backdrop>
  )
}

/**
 * 
 * @param {*} site  The location name that the album is being retrieved for 
 */
const GetImages = ( {site} ) => {
  const [images, setImages] = useState([])
  const [paging, setPaging] = useState("none")
  const [loading, setLoading] = useState(true)
  const [errorGraphic, setErrorGraphic] = useState(false)
  const [errorCode, setErrorCode] = useState()
  // Fetch images on component mount
  useEffect(() => {
    fetchImages()
  }, [])

  // Fetch Images from Netlify Functions
  //TODO: Add logic here to handle image size needed per device
  const fetchImages = (paging) => {
    axios(paging === "none" ? `/.netlify/functions/fetch?album=${site}` : `/.netlify/functions/fetch?paging=${paging}&album=${site}`).then(res => {
      if(res.data.images.data.length === 0){
        setPaging("none")
        return
      }
      setImages([ ...images, ...res.data.images.data.map(image => (
       {sourcewebp: image.webp_images[0].source, //webp url
        sourcejpg: image.images[0].source, //jpg url
        index: images.length === 0 ? 0 : images.length-1,
        id: image.id, // id of image
        alt_text: image.alt_text})) //alt text
      ])
      
      setPaging(res.data.images.paging.cursors.after)
      setLoading(false)
    }).catch(e => {
      setErrorGraphic(true)
      setErrorCode(e.response.data.code)
    }) 
  }

  return (
    <ImageGallery images={images} paging={paging} loading={loading} fetchImages={fetchImages} errorGraphic={errorGraphic} errorCode={errorCode}/>
  )
}

ImageGallery.propTypes = {
  images: PropTypes.array,
  paging: PropTypes.string,
  loading: PropTypes.bool,
  fetchImages: PropTypes.func,
  errorGraphic: PropTypes.bool,
  errorCode: PropTypes.number
}

export default GetImages
