const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const errorController = require('./controllers/error');
//const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/* app.use((req, res, next) => {
	User.findById('64c264e8716e313bfe899679')
	.then(user => {
		req.user = new User(user.name, user.email, user.cart, user._id);
		next();
	})
	.catch(err => console.log(err));
}); */

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const mongoDBClusterUser = process.env.mongoDBClusterUser;
const mongoDBClusterPassword = process.env.mongoDBClusterPassword;
const databaseName = 'shop';

mongoose
.connect(`mongodb+srv://${mongoDBClusterUser}:${mongoDBClusterPassword}@clustertest1.rlecsbt.mongodb.net/${databaseName}?retryWrites=true&w=majority`)
.then(() => {
	app.listen(3000);
})
.catch((err) => console.log(err));
