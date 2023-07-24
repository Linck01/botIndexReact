const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3010;
const path = require('path');
const fs = require('fs');
const html = fs.readFileSync(path.join(__dirname, './build', 'index.html'),'utf8');
const apiUrl = 'https://api.betify.gg/v1/';

const gameController = async function(req, res) {
  let game = null;
  const gameId = disassembleGameOrBetUri(req.params.gameUri);

  try {
    const apiResponse = await axios.get(apiUrl + 'games/' + gameId);
    game = apiResponse.data;
  } catch (e) {
    console.log(e.response.statusText);
  }
  
  let htmlCopy = html;
  if (game) {
    htmlCopy = htmlCopy.replace(/<title>.*?<\/title>/g, '<title>'+game.title+'</title>');

    htmlCopy = htmlCopy.replace(/<meta name="title" content=".*?"\/>/g, '<meta name="title" content="'+ game.title +'"/>');
    htmlCopy = htmlCopy.replace(/<meta name="description" content=".*?"\/>/g, '<meta name="description" content="'+ game.desc +'"/>');
    htmlCopy = htmlCopy.replace(/<meta name="keywords" content=".*?"\/>/g, '<meta name="keywords" content="'+ game.title.split(' ').concat(game.desc.split(' ')).join(',') +'"/>');

    htmlCopy = htmlCopy.replace(/<meta property="og:title" content=".*?"\/>/g, '<meta property="og:title" content="'+ game.title +'"/>');
    htmlCopy = htmlCopy.replace(/<meta property="og:description" content=".*?"\/>/g, '<meta property="og:description" content="'+ game.desc +'"/>');
    htmlCopy = htmlCopy.replace(/<meta property="og:image" content=".*?"\/>/g, '<meta property="og:image" content="'+ game.bannerUrl +'"/>');
  }

  return res.send(htmlCopy);
}

const betController = async function(req, res) {
  let game = null, bet = null;
  const gameId = disassembleGameOrBetUri(req.params.gameUri);
  const betId = disassembleGameOrBetUri(req.params.betUri);

  try {
    const apiResponseGame = await axios.get(apiUrl + 'games/' + gameId);
    game = apiResponseGame.data;

    const apiResponseBet = await axios.get(apiUrl + 'bets/' + betId);
    bet = apiResponseBet.data;
  } catch (e) {
    console.log(e.response.statusText);
  }
  
  let htmlCopy = html;
  if (game && bet) {
    htmlCopy = htmlCopy.replace(/<title>.*?<\/title>/g, '<title>'+game.title+'</title>');

    htmlCopy = htmlCopy.replace(/<meta name="title" content=".*?"\/>/g, '<meta name="title" content="'+ bet.title +'"/>');
    htmlCopy = htmlCopy.replace(/<meta name="description" content=".*?"\/>/g, '<meta name="description" content="'+ bet.desc +'"/>');
    htmlCopy = htmlCopy.replace(/<meta name="keywords" content=".*?"\/>/g, '<meta name="keywords" content="'+ bet.title.split(' ').concat(bet.desc.split(' ')).join(',') +'"/>');

    htmlCopy = htmlCopy.replace(/<meta property="og:title" content=".*?"\/>/g, '<meta property="og:title" content="'+ bet.title +'"/>');
    htmlCopy = htmlCopy.replace(/<meta property="og:description" content=".*?"\/>/g, '<meta property="og:description" content="'+ bet.desc +'"/>');
    htmlCopy = htmlCopy.replace(/<meta property="og:image" content=".*?"\/>/g, '<meta property="og:image" content="'+ game.bannerUrl +'"/>');
  }
  console.log(htmlCopy);
  return res.send(htmlCopy);
}

app.get('/game/:gameUri/bet/:betUri', betController);

app.get('/game/:gameUri/*', gameController);
app.get('/game/:gameUri', gameController);

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

const disassembleGameOrBetUri = (gameUri) => {
  return gameUri.substr(gameUri.length - 24);
}

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

app.listen(port, () => console.log(`Listening on port ${port}`));