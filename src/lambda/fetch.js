import axios from "axios"
import config from "../../config"
/**
 * This function handles the query to your photo api of choice. 
 * Using Facebook I have configured a graph api query that can take in an album param
 * that is based on the location such as stlucia and will then use the associated album id 
 * to obtain the photos. 
 * NOTE: Remove limit=<#> if you do not want to limit the amount of images you are pulling down
 * Access key should be kept in a file called config.js located in your root directory and add to gitignore
 * Make sure you add this api key to your environment variables on your host. e.g Netlify, firebase, etc
 */
exports.handler = function(event, context, callback) {
  const apiRoot ="https://graph.facebook.com/v6.0/";
  const accessKey = process.env.ACCESS_KEY || config.accessKey
  var album = event.queryStringParameters.album;
  const stlucia = '10158093496777488'
  const oahu = '10158093482412488'
  var choice = ''
  switch(album){
    case 'stlucia':
      choice = stlucia;
      break;
    case 'oahu':
      choice = oahu;
      break;
  }
  //Query Facebook Graphapi and return both webp and jpg results
  const doggoEndpoint = `${apiRoot}/${choice}/photos?fields=webp_images,alt_text,images&limit=115&pretty=0&access_token=${accessKey}`;
  axios.get(doggoEndpoint).then(res => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        images: res.data,
      }),
    })
  })
}