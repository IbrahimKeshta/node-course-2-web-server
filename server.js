const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;  //store the port will be used in the app // process.env an object store all enviroment variables as key value
// new express app
var app = express();


// Partials is to include partial like footer in any file 

hbs.registerPartials(__dirname + '/views/partials');
//handlebarsjs => set view engine
app.set('view engine', 'hbs');


// register middleware
app.use((req, res, next) => { // next is when it done
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
  next();
});

// Chalenge
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

//middleware 
// it must be after maintenance middleware to not execute help.html
app.use(express.static(__dirname + '/public'));

// handlebars helper
//register function to run to create some output
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


// seeting up all http handlers 
// register handler
app.get('/', (req, res) => {
//  res.send('Hello Express!'); // respones for http request
    // res.send({
    //     name: 'Ibrahim Keshta',
    //     like: [
    //         'eating',
    //         'music',
    //         'coding'
    //     ]
    // });
    //Chalenge
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        // currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to our website'
    });
});
app.get('/about', (req, res) => {
    // res.send('About Page');// root route
    // render any of templates you have setup with view engine
    // we will passing data to about.hbs  
     res.render('about.hbs', {
         pageTitle: 'About Page',
        //  currentYear: new Date().getFullYear()
     }); 
})

// /bad
app.get('/bad' , (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
})

app.use(function(req, res) {
    res.status(404).end('Page Not Found');
});


//start listen will bind app to a port on the machine
app.listen(port, () => {
    console.log(`server is up on port ${port}`);
} );