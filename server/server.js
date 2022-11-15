const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000

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

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});
