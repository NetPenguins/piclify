[![Netlify Status](https://api.netlify.com/api/v1/badges/12193ce5-8b02-4776-b093-0fcfb6411139/deploy-status)](https://app.netlify.com/sites/vacationsite/deploys)

[Published Example](https://vacationsite.netlify.com)

## About
Piclify came about from a desire to elegantly display our photos as we travel and share them with freinds and family in way that was both unique and personal. I found a tutorial by [@Chuloo](https://github.com/Chuloo/gatsby-netlify-functions) that did a wonderful job explaining how to setup a netlify function to handle querying a picture hosting service. I decided to use Facebook for photo hosting and their [GraphAPI](https://developers.facebook.com/tools/explorer/). The header and footer along with various style elements where made using [Bulma](https://bulma.io) css.

---

## Stack Used
* Gatsby 
* Netlify Functions
* Facebook OpenSource
    * GraphAPI
* Bulma

---

This is a demo built with Gatsby and consuming a severless Netlify function calling an image host api (Facebook GraphAPI was used for this example) and then creating an Image gallery with associated modal.
The tutorial explaining this will be attached once released.

## How To:

To start local development environment use:
```
npm start
```

## TODO:

- [ ] Clean packages
- [ ] Add unit testing [!Priority!]
- [ ] Explore mapping for adventures? Travel journal? Utilizing Leaflet and Firebase Realtime Database?
- [ ] Add auth service (most likely using firebase as netlify has limited offerings at time of writing)
- [ ] Add database to house commenting feature (if using trave log feature we can use the same database.)
- [ ] Add comment thread per photo 

