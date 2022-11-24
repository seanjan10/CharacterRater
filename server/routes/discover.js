
const express = require('express')
const router = express.Router()
const path = require('path')
const { pipeline } = require('stream')
//const puppeteer = require('puppeteer')

const webURL = "https://api.themoviedb.org/3/discover/"


router.get('/', async (req, res) => {
    const media = req.query.media;
    const sortMethod = req.query.sortMethod;
    const currentPage = req.query.currentPage;

    const apiFetch = `${webURL}${media}?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=${sortMethod}&include_adult=false&vote_count.gte=500&include_video=false&page=${currentPage}&with_watch_monetization_types=flatrate`

    const data = await fetch(apiFetch)
    const dataJSON = await data.json();

    //res.json({"link": imageLink[0]})
    res.send( dataJSON );
    res.end();

})

//const apiString = `https://api.themoviedb.org/3/discover/${media}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=${sortMethod}&include_adult=false&vote_count.gte=500&include_video=false&page=${currentPage}&with_watch_monetization_types=flatrate`


module.exports = router