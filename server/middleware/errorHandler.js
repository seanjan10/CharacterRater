const { logEvents } = require('./logger')

const errorHandler = (err, req, res, next) => {
    //write log event from logger to save in errLog file under logs folder
    logEvents(`${err.name}: ${err.message}\t${req.method}\t{req.url}\t${req.headers.origin}`, 'errLog.log');
    console.log(err.stack);

    //user statusCode if it has one else use 500 error
    const status = res.statusCode ? res.statusCode : 500 //server error

    res.status(status);

    res.json({ message: err.message });
}

module.exports = errorHandler