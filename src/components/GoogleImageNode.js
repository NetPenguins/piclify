import React from "react"
import Img from "gatsby-image"
import {graphql} from "gatsby"

const album = "Oahu"

export const Album = ({data: {allGooglePhotosAlbum}}, albumName) => {
    let al
    allGooglePhotosAlbum.nodes.forEach(element => {
        if(element.title === album){
            console.log(element)
            al = element
        }
    });
    console.log(al)
    return (
        <>
            <h2>{al.title}</h2>
            <div>{"Photos:"}</div>
            {al.photos.map((photoNode) => (
                <div style={{width: 500}}>
                    <Img fluid={photoNode.photo.childImageSharp.fluid} />
                </div>
            ))}
        </>
    )
}

export const pageQuery = graphql`
    query {
        allGooglePhotosAlbum {
            nodes {
                title
                photos {
                    photo {
                        childImageSharp {
                            fluid(maxWidth: 500, quality: 100) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
            }
        }
    }
`

export default Album