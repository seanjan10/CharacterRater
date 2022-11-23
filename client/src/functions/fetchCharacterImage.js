const puppeteer = require('puppeteer');
//import puppeteer from 'puppeteer'

const fetchCharacterImage = async (characterQuery) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`https://duckduckgo.com/?q=${characterQuery}&iar=images&iax=images&ia=images`);

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

  // Print all the files.
  console.log(imageLink[0]);

  await browser.close();
  //return imageLink[0]
} 

fetchCharacterImage("dutch Predator")
//export default fetchCharacterImage