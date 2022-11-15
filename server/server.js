require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT || 3000

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json());

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));

//URLS that don't exist
app.all('*', (req, res) => {
    //error code for incorrect page
    res.status(404);
    //send error message depending on mime type they accept
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({message: "Error: Page does not exist" });
    } else {
        res.type('txt').send("Page does not exist");
    }
})

app.use(errorHandler);

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});
