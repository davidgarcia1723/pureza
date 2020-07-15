const request = require("request");
const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const apiKey = process.env.APIKEY;
app.set('view engine', 'ejs');
// turning info from the url to json
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));
// sends html and renders it on the client
app.get('/', (req, res) => {
    res.render('index');
});
app.post('/', (req, res) => {
    let country = req.body.country
    let city = req.body.city
    let state = req.body.state
    let url = `http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${apiKey}`;
    request(url, (err, response, body) => {
        if(err){
            res.render('index', {air : null, error : 'Error please try again'});
        }
        else {
            let air = JSON.parse(body);
            if(air.data == undefined){
                res.render('index', {air : null, error : 'Error please check your spelling'});
            }
            else {
                // console.log(air.data.current.pollution);
                let airText = `The air quality of ${air.data.city} is ${air.data.current.pollution.aqius}`;
                res.render('index', {air: airText, error : null});
            }
        }
    })
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`This server is running on ${port}`);
})
//Local API

let data = require('../planetWellness/public/js/users.json');



app.get('/users', (req, res) => {
    if(!data){
        res.status(404).send('These are not the users you are looking for.')
    }
    res.send(data);
});

app.get('/users/:id', function(req,res) {
    const sData = data.users.find(function(user){
        console.log(user.id);

        return parseInt(req.params.id) === user.id;
    });

    if(!sData){
        res.status(404).send('These are not the users you are looking for.')
    }

    res.send(sData);
});


app.post('/users', (req,res) =>{ // the path is /users. the callback function with the parameters of req and res. 
  // console.log(data)
    const eData = {
        id: data.users.length + 1, // grabbing the id by data.users but increasing the increment by 1 each time
        name:req.body.name, 
        lastName: req.body.lastName,
        email: req.body.email  
    }; 

    
    data.users.push(eData) // pushing the new information given by the user into the eData array.
    res.send(eData) // responds by sending the eData object
    
})
