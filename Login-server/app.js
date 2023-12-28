const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose')
const { Schema } = mongoose;
const bcrypt = require('bcrypt')


const usersRouter = require('./routes/users');

const app = express();
console.log("app is running on 4001 port")


app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



mongoose.connect('mongodb://127.0.0.1:27017/form', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("db connected");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});










//create user Scheme

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
});


//const User = new mongoose.model("User", userSchema)
const User = mongoose.model('User', userSchema);


// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user with the provided email in the database
        const user = await User.findOne({ email });

        // If user not found, return an error
        if (!user) {
            return res.status(401).json({ message: 'Userid not registered' });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If password does not match, return an error
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        // Password matches, send a successful login response with user data (excluding the password)

        const { _id, ...userData } = user._doc;
        delete userData.password;
        res.json({ message: 'Login successful', user: { _id, ...userData } });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});












app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            return res.status(409).json({ message: 'Userid  already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.json({ message: 'Successfully registered and you can login now' });
    } catch (error) {
        console.error('Error in register:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = app;
