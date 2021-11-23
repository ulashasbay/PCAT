const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');
const Photo = require('./models/Photo');
const fs = require('fs');



const app = express();

// Connect Db
mongoose.connect('mongodb://localhost/pcat-test-db');

// Template Engine
app.set('view engine', 'ejs');

//  middlewares
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method'));

// Routes
app.get('/', async (req, res) => {
    const photos = await Photo.find({}).sort('-dateCreated');
    res.render('index', {
        photos
    });
});

// Tekli photo sayfaları
app.get('/photos/:id', async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
        photo
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/add', (req, res) => {
    res.render('add');
});

// Upload edilecek image çin önce eğer yok ise public/uploads klasörü oluşturyoruz. Sonrasında image i oraya taşıyıp adresini mongodb ye yazıyoruz
app.post('/photos', (req, res) => {
    // await Photo.create(req.body);
    // res.redirect('/');
    const uploadDir = 'public/uploads';

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir)
    };

    let uploadedImage = req.files.image;
    let uploadedPath = __dirname + '/public/uploads/' + uploadedImage.name;

    uploadedImage.mv(uploadedPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadedImage.name
        });
        res.redirect('/');
    });   
});

// Edit page
app.get('/photos/edit/:id', async (req, res) => {
    const photo = await Photo.findOne({ _id : req.params.id });
    res.render('edit', {
        photo
    });
});

// Update 
app.put('/photos/:id', async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    photo.title = req.body.title
    photo.description = req.body.description
    photo.save();
    res.redirect(`/photos/${req.params.id}`);
});


const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı...`);
});
