const allowedOrigins = require('./allowedOrigins')

//Allowed hosts with CORS
const corsOptions = {
    origin: (origin, callback) => {
        //if it is an allowed host or REST tool
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            //error due to unallowed host
            callback(new Error('Not allowed by CORS'))
        }

    },
    //pass the header
    credentials: true,
    //status code for OPTIONS
    optionsSuccessStatus: 200
}

module.exports = corsOptions