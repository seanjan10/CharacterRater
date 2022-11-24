
const express = require('express')
const router = express.Router()
const path = require('path')
const { pipeline } = require('stream')
//const puppeteer = require('puppeteer')

const webURL = "https://api.themoviedb.org/3/"


router.get('/', async (req, res) => {
    const media = req.query.media;
    const id = req.query.id;

    const apiFetch = `${webURL}${media}/${id}?api_key=${process.env.TMDB_API_KEY}`

    //const mediaAPIString =`https://api.themoviedb.org/3/${media}/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`

    const data = await fetch(apiFetch)
    const dataJSON = await data.json();

    //res.json({"link": imageLink[0]})
    res.send( dataJSON );
    res.end();

})

router.get('/characters/', async (req, res) => {
    const mediaID = req.query.mediaID;
    const media = req.query.media;

    const charactersAPIString = media === 'tv' ?  `${webURL}tv/${mediaID}/aggregate_credits?api_key=${process.env.TMDB_API_KEY}` : `${webURL}movie/${mediaID}/credits?api_key=${process.env.TMDB_API_KEY}`

    const data = await fetch(charactersAPIString)
    const dataJSON = await data.json();

    //res.json({"link": imageLink[0]})
    res.send( dataJSON );
    res.end();

})




//const apiString = `https://api.themoviedb.org/3/discover/${media}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=${sortMethod}&include_adult=false&vote_count.gte=500&include_video=false&page=${currentPage}&with_watch_monetization_types=flatrate`


module.exports = router