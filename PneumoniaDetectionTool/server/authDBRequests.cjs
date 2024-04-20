
const express = require('express');
const { getConnection, sql } = require('./dataBase.cjs'); // Importing database connection setup
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(express.json()); 

// Endpoint to search for clinics by area code
const loginSignupReqs = (app)=> { 
  //signup endpoint to post the data to DB
    app.post('/signup', async (req, res) => {
      const { userName, userPwd, userEmail, userCity, userPhone } = req.body;
      try {

        /****Connect DB to send the user Data******/

        const pool = await getConnection();
        const hashedPassword = await bcrypt.hash(userPwd, saltRounds);
        await pool.request()
        .input('Username', sql.VarChar(255), userName)
        .input('UserPassword', sql.VarChar(255), hashedPassword)
        .input('Email', sql.VarChar(255), userEmail)
        .input('City', sql.VarChar(255), userCity)
        .input('Phone', sql.VarChar(255), userPhone)

        /***Executing insert operation directly after SQL connection to put the signup details into DB****/
        .query(`INSERT INTO myProjectDB.dbo.users (Username, Password, Email, City, Phone) VALUES (@UserName, @UserPassword, @Email, @City, @Phone)`);
    
        res.status(201).json({ message: 'User created successfully' });
      } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Error during signup', error: error.message });
      }
    });
    
   // Login Endpoint to post the result
    app.post('/login', async (req, res) => {
      const { userName, userPwd } = req.body;
      try {
        const pool = await getConnection();
        const result = await pool.request()
          .input('Username', sql.VarChar, userName)

          /*******Finding if the user exists in the DB  **********/
          
          .query(`SELECT Password FROM myProjectDB.dbo.Users WHERE Username = @UserName`);
    
        if (result.recordset.length > 0) {
          const match = await bcrypt.compare(userPwd, result.recordset[0].Password);        
          if (match) {
            /*const token = jwt.sign(
                { userId: result.recordset[0].UserId }, // You can add more user details here
                secretKey,
                { expiresIn: '1h' } // Token expires in 1 hour, you can set any duration you prefer
              );
              res.json({ token: token });*/
            res.status(201).json({ message: 'Authenticated successfully' });

          } else {
            res.status(400).send('Invalid credentials');
          }
        } else {
          res.status(400).send('User not found');
        }
      } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Error during login');
      }
    });
    
}

module.exports =loginSignupReqs;


