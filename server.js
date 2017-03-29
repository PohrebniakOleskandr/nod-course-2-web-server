const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.set('view engine','hbs');

app.use(express.static(__dirname+"/public"));

app.use((req,res,next)=>{
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(`${log}`);
  next();
});



app.use((req,res,next)=>{
  res.render('maintenance.hbs');
});

app.get('/', (req,res)=>{
  res.render('home.hbs',{
    welcomeMessage: 'Hey Everybody, welcome!',
    pageTitle: 'Welcome'
  });
});


app.get('/about', (req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About page'
  });
});

// app.get('/bad', (req,res)=>{
//   res.send({
//     name:'errorMessage',
//     text: 'you went to wrong path... '
//   });
// });


app.listen(3000, ()=>{
  console.log('Server is set up on port 3000...');
});
