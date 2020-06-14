var express = require('express');
var multer = require('multer');
var ext = require('file-extension');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads')
  },
  filename: function(req, file, cb) {
    cb(null, + Date.now() + '.' + ext(file.originalname))
  }
})

var upload = multer({ storage: storage }).single('picture');

var app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function (req, res){
  res.render('index', { tittle: 'RuniGram' });
})

app.get('/signup', function (req, res){
  res.render('index', { tittle: 'RuniGram - Signup' });
})

app.get('/signin', function (req, res){
  res.render('index', { tittle: 'RuniGram - Signin' });
})

app.get('/api/pictures', function (req, res, next) {
  var pictures = [
    {
      user: {
        username: 'rickg96',
        avatar: 'https://scontent.fgua2-1.fna.fbcdn.net/v/t1.0-9/12187767_1085515331458547_8649748735441583012_n.jpg?_nc_cat=0&oh=a43a7b5c8b8ff92bd986bbf083548845&oe=5BAAD35E'
      },
      url: 'https://materializecss.com/images/office.jpg',
      likes: 0,
      liked: false,
      createdAt: new Date()
    },
    {
      user: {
        username: 'rickg96',
        avatar: 'https://scontent.fgua2-1.fna.fbcdn.net/v/t1.0-9/12187767_1085515331458547_8649748735441583012_n.jpg?_nc_cat=0&oh=a43a7b5c8b8ff92bd986bbf083548845&oe=5BAAD35E'
      },
      url: 'https://materializecss.com/images/office.jpg',
      likes: 1,
      liked: false,
      createdAt: new Date().setDate(new Date().getDate() - 11)
    }
  ];

      res.send(pictures);
});

app.post('/api/pictures', function (req, res) {
  upload(req, res, function(err) {
    if (err) {
      return res.send(500, "Error uploading file");
    }
    res.send('File uploaded successfully');
  })
})

app.get('/api/user/:username', function (req, res) {
  const user = {
    username: 'rickg96',
    avatar: 'https://scontent.fgua2-1.fna.fbcdn.net/v/t1.0-9/12187767_1085515331458547_8649748735441583012_n.jpg?_nc_cat=0&oh=a43a7b5c8b8ff92bd986bbf083548845&oe=5BAAD35E',
    pictures: [
      {
        id: 1,
        src: 'https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9/36199871_10156613496129040_3134110435586867200_n.png?_nc_cat=0&oh=52c006041d4b2c7246925634d90933d0&oe=5BDDD6D4',
        likes: 34
      },
      {
        id: 2,
        src: 'https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9/23032376_10155921058119292_1576965593884419754_n.jpg?_nc_cat=0&oh=055e83c68052b978e388737177a91006&oe=5BD33405',
        likes: 5
      },
      {
        id: 3,
        src: 'https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9/17523335_10151236929999953_1688448319168929959_n.jpg?_nc_cat=0&oh=b04ad9623f202357c2b137c32de1e661&oe=5BCE6732',
        likes: 2
      },
      {
        id: 4,
        src: 'https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9/17952771_10151249830139953_5803829785087450202_n.png?_nc_cat=0&oh=695011802699ee6db024420377bf11ad&oe=5BE7AAE5',
        likes: 6
      },
      {
        id: 5,
        src: 'https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9/22688756_10155944278829040_2818932147298077844_n.png?_nc_cat=0&oh=d84b2d05d3d6ef89622c2829821d7702&oe=5BD56B81',
        likes: 89
      },
      {
        id: 6,
        src: 'https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9/1504958_10152109254369292_1999300152_n.jpg?_nc_cat=0&oh=f06e47d67e3593893f5f3a03af9cd6db&oe=5BC58790',
        likes: 69
      },
    ]
  }
  res.send(user);
})

app.get('/:username', function (req, res) {
  res.render('index', { tittle: `RuniGram - ${req.params.username}` })
})

app.get('/:username/:id', function (req, res) {
  res.render('index', { tittle: `RuniGram - ${req.params.username}` })
})

app.listen (3000, function (err){
  if (err) return console.log ('hubo un error'), process.exit(1);

  console.log('Runigram escuchando en el puerto 3000');
})
