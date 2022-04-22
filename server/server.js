const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3010;
const path = require('path');
const fs = require('fs');
const html = fs.readFileSync(path.join(__dirname, './build', 'index.html'),'utf8');

const gameController = async function(req, res) {
  console.log('Game page visited!');
  
  let game = null;
  try {
    const apiResponse = await axios.get('https://api.betify.gg/v1/games/' + req.params.gameId);
    game = apiResponse.data;
  } catch (e) {
    console.log(e.response.statusText);
  }
  
  let htmlCopy = html;
  if (game) {
    htmlCopy = htmlCopy.replace(/\$OG_TITLE/g, game.title);
    htmlCopy = htmlCopy.replace(/\$OG_DESCRIPTION/g, game.desc);
    htmlCopy = htmlCopy.replace(/\$OG_IMAGE/g, game.bannerUrl);
    htmlCopy = htmlCopy.replace(/<title>.*<\/title>/g, '<title>'+game.title+'</title>');
    
  }

  return res.send(htmlCopy);
}

app.get('/game/:gameId/bet/:betId', function(req, res) {
  console.log('Bet page visited!');

  return res.send(html);
});

app.get('/game/:gameId/*', gameController);
app.get('/game/:gameId', gameController);



app.get('/games/*', function(req, res) {return res.send(html);});
app.get('/user/*', function(req, res) { return res.send(html);});

app.get('/login', function(req, res) { return res.send(html);});
app.get('/register', function(req, res) { return res.send(html);});
app.get('/forgot-password', function(req, res) { return res.send(html);});
app.get('/reset-password', function(req, res) { return res.send(html);});

app.get('/termsAndService', function(req, res) { return res.send(html);});
app.get('/privacyPolicy', function(req, res) { return res.send(html);});
app.get('/about', function(req, res) { return res.send(html);});
app.get('/', function(req, res) { return res.send(html);});


app.use(express.static(path.join(__dirname, './build')));

  /*
  app.get('/about', function(req, res) {
    console.log('About page visited!');
    const filePath = path.join(__dirname, './../public_html/build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_TITLE/g, 'About Page');
      data = data.replace(/\$OG_DESCRIPTION/g, "About page description");
      result = data.replace(/\$OG_IMAGE/g, 'https://codeat21.com/wp-content/uploads/2021/03/CodeAT21-Logo.png');
      return res.send(result);
    });
  });
  
  app.get('/shopping/:id', function(req, res) {
      //req.params.id --- get /shopping/:id
    console.log('Shopping page visited!');
    const filePath = path.join(__dirname, './../public_html/build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_TITLE/g, 'Shopping Page'+req.params.id);
      data = data.replace(/\$OG_DESCRIPTION/g, "Shopping page description");
      result = data.replace(/\$OG_IMAGE/g, 'https://codeat21.com/wp-content/uploads/2021/03/CodeAT21-Logo.png');
      return res.send(result);
    });
  });
  
  app.get('/contact', function(req, res) {
    console.log('Contact page visited!');
    const filePath = path.join(__dirname, './../public_html/build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_TITLE/g, 'Contact Page');
      data = data.replace(/\$OG_DESCRIPTION/g, "Contact page description");
      result = data.replace(/\$OG_IMAGE/g, 'https://codeat21.com/wp-content/uploads/2021/03/CodeAT21-Logo.png');
      return res.send(result);
    });
  });

*/

/*
app.get('*', function(req, res) {
	res.send(html);
});*/

console.log(fs.readdirSync(path.join(__dirname, './build')));
app.listen(port, () => console.log(`Listening on port ${port}`));