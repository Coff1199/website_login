const User = require('../models/AccountModel');
const bcrypt = require('bcrypt');

const createAccount = async (req, res) => {
    try {
        // Check if the email or username is already taken
        const existingUser = await User.findOne({
            $or: [
                { email: req.body.email },
                { username: req.body.username } 
            ]
        });
  
        if (existingUser) {
            // If a user with the same email or username exists, return a 400 error
            return res.status(400).json({
                status: 'fail',
                message: 'Username or email already exists'
            });
        }
        
        // hash the password 
        bcrypt.hash(req.body.password, 10, (err, hash) => { 
            if (err) throw err;
            
            //create the new user using Schema with hashed password
            let user = new User({
                username: req.body.username,
                email:req.body.email,
                password: hash,
                dateCreated: new Date(),
            });
            user.save();
        });
        
        // send success status
        res.status(201).json({
            status: 'success',
            message: 'Account successfuly created'
        });
    } catch (err) {
        console.log(err);
  
        //send fail message
        res.status(500).json({
            status: "fail",
            message: "Internal Server Error"
        })
    }
  
  };
  
  const loginUser = async (req, res) => {
    
    const { username, password } = req.body;
  
    try {
        // check for existing user
        const user = await User.findOne({
            $or: [{ username: username }, { email: username }]
        });
      
        // return fail if user does not exist in db
        if (!user) {
            return res.status(404).json({ 
                status: 'fail',
                message: 'Username or email not found' 
            });
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
        // check password matches db
        if (!isMatch) {
            return res.status(401).json({ 
                status:'fail',
                message: 'Incorrect password' 
            });
        }
  
        // change lastLogin 
        await User.findByIdAndUpdate(
            user._id,
            { $set: { lastLogin: new Date()}},
            {new: true}
        );
      
        // success
        res.status(200).json(
        { 
          status: 'success',
          message: 'Login successful', user 
        });
    } catch (error) {
        // send error response
        console.error('Error during login:', error);
        res.status(500).json({ 
            status:'fail',
            message: 'Internal server error' 
        });
    }
  };

  module.exports = {createAccount, loginUser};