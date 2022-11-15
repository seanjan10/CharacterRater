const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyy/MM/dd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        //check to see if folder doesn't exist
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            //await create folder if doesn't exist
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        //await for file named after logFileName var to add logItem to the file
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem);
        
    } catch (err) {
        console.log(err);
    }
}

const logger = (req, res, next) => {
    //call LogEvents method with req object message and the name of the file to write too
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
    console.log(`${req.method} ${req.path}`);
    next()
}

module.exports = { logEvents, logger }