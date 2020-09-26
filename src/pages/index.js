import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "gatsby"

import "../styles/main.css"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));


const IndexPage = () => {
  const classes = useStyles();
  return(
    <Layout>
      <SEO title="Home" />
      <div className="MainContent">
      <div className={classes.root}>
      <div className="stipe Block__Divider--hidden"/>
        <div className="stripe bg-teal">
          <div className="ActionBlock"> 
            <div className="ActionBlock__Title">
              Oahu
            </div>
              <Link to="/Oahu/" className="ActionBlock__Link">
                Gallery
              </Link>
          </div>
        </div>
        <div className="stripe bg-teal">
          <div className="ActionBlock"> 
            <div className="ActionBlock__Title">
              St. Lucia
            </div>
              <Link to="/StLucia/" className="ActionBlock__Link">
                Gallery
              </Link>
          </div>
        </div>
    </div>
        {/* Map element will go here highlighting travel locations */}
      </div>
  </Layout>
  )
}

export default IndexPage
