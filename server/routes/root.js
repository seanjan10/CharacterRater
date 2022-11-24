const express = require('express')
const router = express.Router()
const path = require('path')
const { pipeline } = require('stream')
//const puppeteer = require('puppeteer')

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})


//const apiString = `https://api.themoviedb.org/3/discover/${media}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=${sortMethod}&include_adult=false&vote_count.gte=500&include_video=false&page=${currentPage}&with_watch_monetization_types=flatrate`

/*
router.get('/characterImage', async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`https://duckduckgo.com/?q=${req.query.characterMedia}&iar=images&iax=images&ia=images`);

    // Wait for results appear and the set selector
    const resultsSelector = '.tile--img__img';
    await page.waitForSelector(resultsSelector);

    // Extract the results from the page.
    const imageLink = await page.evaluate(resultsSelector => {
      return [...document.querySelectorAll(resultsSelector)].slice(0,1).map(img => {
        const x = img.src;
        return `${x}`;
      });
    }, resultsSelector);

    res.writeHead(200, {
        'Content-type': 'application/json',
        'Content-Length': imageLink[0].length
    });
    //res.json({"link": imageLink[0]})
    res.end(JSON.stringify({ "link": imageLink[0]}))
    //res.end();

  // Print all the files.
  console.log(imageLink[0]);

  await browser.close();
  //return imageLink[0]
})
*/

module.exports = router;