require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');


const port = 3000
app.use(cors());
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://GurayAltiparmak:Gray.2345@senior.bpfwfo6.mongodb.net/userlogindb",{useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const User = require('./models/User')

const MongoStore = require('connect-mongo')
app.use(session({
    secret:'abcd1234',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongoUrl:"mongodb+srv://GurayAltiparmak:Gray.2345@senior.bpfwfo6.mongodb.net/userlogindb"}),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

db.on('error', console.error.bind(console, 'MongoDB connection error: '));
db.once('open', () => {
    console.log("Connected to MongoDB");
})


const authRouter = require('./routes/auth');

app.use('/', authRouter)

app.get("/", (req,res) =>{
    res.json(`API is running on port ${port}`)
})

app.listen(port, () =>{
    console.log(`API is running on port ${port}`)
})