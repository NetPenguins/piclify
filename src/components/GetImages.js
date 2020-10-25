import {
  Backdrop,
  CircularProgress,
  GridList,
  GridListTile,
  makeStyles
} from '@material-ui/core'

import {
  Modal
} from "react-bulma-components"

import Img from "gatsby-image"
import {useStaticQuery, graphql} from "gatsby"
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import axios from "axios"
import Lazyload from "react-lazyload";
import ImGal from 'react-image-gallery';
import Slider from "react-slick";
import styled from "styled-components"
import InfiniteScroll from "react-infinite-scroll-component";
import ErrorGraphic from "./ErrorGraphic";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import "bulma/css/bulma.css"
import "react-image-gallery/styles/css/image-gallery.css";
import "../styles/gallery.css"

const Image = styled.img`
  margin-top: .5rem;
  border-radius: .5rem;
  width: 100% !important;
  height: auto !important;
`

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyItems: 'center',
//     justifyContent: 'space-around',
//     backgroundColor: theme.palette.background.paper,
//   },
//   gridList: {
//     width: '100%',
//     height: 'auto',
//   },
// }));

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

const ImageGallery = ({ images, loading, errorGraphic}) => {
  // Create gallery here
  
  const [isActive, setisActive] = React.useState(false);
  const [currentPhoto, setCurrentPhoto] = React.useState(images);
  const [index, setIndex] = React.useState(0);
  const open = () => setisActive(true);
  const close = () => setisActive(false);
  /**
   * Array for holding img objects for passing to carousel.
   */
  var componentList = []
  var imageList = []
  const settings = {
    adaptiveHeight: true,
    dots: true,
    fade: true,
    infinite: true,
    initialSlide: index,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  /** Used to create img items for Carousel */
  function createItem(img){
    console.log(img)
    if(!img.photo){
      return;
    }
    imageList.push(img.photo.childImageSharp)
    componentList.push(<Img fluid={img.photo.childImageSharp.fluid} />)
  }

  if (!errorGraphic) {
    images.photos.map(image => createItem(image))
    console.log(images)
  }
  
  return (
    <>
    { errorGraphic ? <ErrorGraphic errorCode={400}/> : 
    <>
    <Modal show={isActive} onClose={close} >
      <Modal.Content >
        <Slider {...settings}>
          {imageList.map(slide => {
            return(
              <div key={slide.id}>
                {<Img 
                  fluid={slide.fluid} 
                  style={{ margin: '1rem', maxHeight: `${slide.fluid.presentationHeight}` }}
                  imgStyle={{ objectFit: 'contain' }}
                />}
              </div>
            )
          })
          }
        </Slider>
      </Modal.Content>
      <button className="modal-close is-large" aria-label="close" onClick={close}></button>
    </Modal>
    <div className="image-grid">
    {/* <div className="gallery"> */}
    {!loading ? imageList.map(image => ( 
        //Map images to an image item inside the main grid. Create an event to toggle activation of modal
        // <div className="image-item" key={image.id}>  
          <Lazyload key={image.id}>
            <a
              onClick={() => {
                setIndex(imageList.indexOf(image));
                open();
              }}
              target="_blank"
              rel="noreferrer noopener"
            >
              {imageList.indexOf(image)}
              <Img fluid={image.fluid} key={image.id} imgStyle={{
                marginTop: '.75rem',
                borderRadius: '.5rem',
                width: '100% !important',
                height: 'auto !important'
              }}/>
            </a>
            </Lazyload>
        // </div>
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
  </>
  }
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
  let images = Album(site);
  
  let errGraphic = false
  try{
    if (!images.photos.length || !Array.isArray(images.photos)) {
      errGraphic = true
    }
  }catch{
    errGraphic = true
  }
  return (
    <ImageGallery images={images} errorGraphic={errGraphic}></ImageGallery>
  )
}

const Album = (albumName) => {
  let al

  const data = useStaticQuery(graphql`
      query {
        allGooglePhotosAlbum {
            nodes {
                title
                photos {
                    photo {
                        childImageSharp {
                            fluid(fit: CONTAIN) {
                                ...GatsbyImageSharpFluid_withWebp_tracedSVG
                                presentationHeight
                                presentationWidth
                            }
                            id
                        }
                    }
                }
            }
        }
    }
  `)
  console.log(data)
  data.allGooglePhotosAlbum.nodes.forEach(element => {
      if(element.title === albumName){
          console.log(element)
          al = element
      }
  });
  console.log(al)
  return (
    al
  )
}



ImageGallery.propTypes = {
  images: PropTypes.object,
  paging: PropTypes.string,
  loading: PropTypes.bool,
  fetchImages: PropTypes.func,
  errorGraphic: PropTypes.bool,
  errorCode: PropTypes.number
}

export default GetImages
