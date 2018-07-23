const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    now = new Date().toString();
    fs.appendFile('server.log', `${now}: ${req.method} ${req.url} \n`, (err) => {
        if (err) throw err;
    });
    console.log(now);
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Oops something went wrong.',
//         maintenanceMessage: 'Server currently under maintenance'
//     })
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    //res.send('<h1>hello express</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my page'

     });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',

    });
});

app.get('/bad', (req, res) =>  {
    res.send({
        error: "page could not be get"
    });
});
app.listen(3000, () => {
    console.log('server is up on port 3000');
});
