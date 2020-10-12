
import {
    makeStyles
} from '@material-ui/core'

import React from "react"
import error from "../images/page-not-found.svg"

const useStyles = makeStyles({
    errorCode: {
      color: "rgba(255, 255, 255, 0.445)",
      fontSize: "2vw",
      textEmphasis: "bold",
    },
    errorContainer: {
      margin: "auto 0",
      width: "50vw",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    errorInfo: {
        width: "80vw",
        position: "absolute",
        paddingTop: "5rem",
        bottom: "100",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    errorText: {
        textAlign: "center",
        color: "white",
        fontSize: "4vw",
        textEmphasis: "bold",
        margin: "0 auto"
    },
    '@media (min-width: 1600px)': {
      errorContainer: {
        paddingTop: "15rem"
      }
    }
  });

const ErrorGraphic = ( { errorCode } ) => {
    const classes = useStyles();
    console.log(errorCode)
    const ECElement = `Error Code: ${errorCode}`
    return(
      <>
      <div className={classes.errorContainer}>
        <img src={error} alt="errormessage"></img>
        <div className={classes.errorInfo}>
          <p className={classes.errorText}>Hmmm . . . . . Something went wrong.</p>
          <small className={classes.errorCode}>{ECElement}</small> 
        </div>
      </div>
      </>
    )
  }

  export default ErrorGraphic