const express= require('express');
const cors= require('cors');
const knex=require('knex');
const bcrypt= require ('bcrypt-nodejs');
const app= express();
const register= require('./controllers/register'); 
const signin= require('./controllers/signin');
const profile= require('./controllers/profile');
const image= require('./controllers/image');
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'neutaziva2',
    database : 'smartbrain'
  }
});
app.use(express.json());
app.use(cors());
const database= {
	users:[
		{
			id:"123",
			name: "Mladen",
			email: "mladen@gmail.com",
			password: "mladen",
			entries: 0,
			joined: new Date()

		},
		{
			id:"124",
			name: "Sally",
			email: "Sally@gmail.com",
			password: "sally",
			entries: 0,
			joined: new Date()

		}
	]
}
app.get('/',(req, res) =>{
	res.send(database.users);
});
app.post('/signin', (req,res) => {signin.sign(req,res,db,bcrypt)});
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)});
app.get('/profile/:id', (req,res) => {profile.profileId(req,res,db)});
app.put('/images', (req,res) => {image.imagePut(req,res,db)});
app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)});
app.listen(3001, () => {
	console.log('app is running on port 3001');
});