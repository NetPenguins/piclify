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
  stripe: {
    marginTop: 'calc(-2vw - 10px)',
    marginBottom: 'calc(-2vw - 10px)',
  
    clipPath: 'polygon( 0% calc(2vw + 10px), 100% 0px, 100% calc(100% - 2vw - 10px),0% 100%)',
    '-webkit-clip-path': 'polygon(0% calc(2vw + 10px),100% 0px,100% calc(100% - 2vw - 10px),0% 100%)',
  },
  bg_teal: {
    background: 'linear-gradient(87.29deg, #9bf0e1 17.71%, #36baa2 80.85%)',
  },
  Block__Divider: {
    width: '74px',
    height: '7px',
    margin: '20px 0',
    background: '#9bf0e1',
  },
  Block__Divider_hidden: {
    width: '100%',
    height: '100px',
    margin: '0px 0',
  },
  ActionBlock: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: '370px',
  },
  ActionBlock__Title: {
    margin: '15px 0',
    color: '#000',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '48px',
  },
  ActionBlock__Link: {
    margin: '15px 0',
    padding: '14px 57px',
    background: '#fff',
    borderRadius: '10px',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '16px',
    textAlign: 'center',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: '#000000',
  },
  Breakpoint__narrow: {
    display: 'none',
  },
  Breakpoint__wide: {
    display: 'contents',
  },
}));

const IndexElement = (props) => {
  const classes = useStyles();
  return (
    <div className={`${classes.stripe} ${classes.bg_teal}`}>
      <div className={classes.ActionBlock}> 
        <div className={classes.ActionBlock__Title}>
          {props.name}
        </div>
          <Link to={props.link} className={classes.ActionBlock__Link} activeStyle={{
            color: 'crimson'
          }}>
            Gallery
          </Link>
      </div>
    </div>
  )
}



const IndexPage = () => {
  const classes = useStyles();

  return(
    <Layout>
      <SEO title="Home" />
      <div className="MainContent">
      <div className={classes.root}>
      <div className={`${classes.stripe} ${classes.Block__Divider_hidden}`}/>
        <IndexElement name="Oahu" link="/Oahu" />
        <IndexElement name="St. Lucia" link="/StLucia"/>
      </div>
        {/* Map element will go here highlighting travel locations */}
      </div>
    </Layout>
  )
}

export default IndexPage
