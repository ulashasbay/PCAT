const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageController');


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
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}));

// Routes
app.get('/', photoController.getAllPhotos);
// Tekli photo sayfaları
app.get('/photos/:id', photoController.getPhoto);
// Upload edilecek image çin önce eğer yok ise public/uploads klasörü oluşturyoruz. Sonrasında image i oraya taşıyıp adresini mongodb ye yazıyoruz
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);  // Update 
app.delete('/photos/:id', photoController.deletePhoto);  // Delete

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage); // Edit page






const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı...`);
});
