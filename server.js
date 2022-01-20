const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//rest api
app.get('/api/customers', (req,res) => {
    res.send([
                {
        "id":1,
        "image": "https://placeimg.com/64/64/1",
        "name" : "jin",
        "birthday":"951212",
        "gender":"male",
        "job":"student"
        },
        {
        "id":2,
        "image": "https://placeimg.com/64/64/2",
        "name" : "james",
        "birthday":"951212",
        "gender":"male",
        "job":"student"
        },
        {
        "id":3,
        "image": "https://placeimg.com/64/64/3",
        "name" : "kfje",
        "birthday":"951212",
        "gender":"male",
        "job":"student"
        }
    ]);
});


app.listen(port, () => console.log(`listening on port ${port}`));

