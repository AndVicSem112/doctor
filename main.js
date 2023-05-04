const express = require('express');
const bodyParser = require('body-parser');
const startMonit = require('./routes/notific');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }))

require('./routes/index')(app);


app.listen(3000, () => {
    console.log("listen 3000...")
    startMonit()
});