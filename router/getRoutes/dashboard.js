// Import necessary modules
const express = require('express');
const User = require('../../models/signup'); // Adjust the path based on your project structure
const router = express.Router();
// const app = express();
// app.use(express.json());

router.get('/dashboard/:email', async (req, res) => {
    try {
      const userEmail = req.params.email;
  
      // Use Mongoose to find the user by email
      const user = await User.findOne({ email: userEmail });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Extract the relevant data
      const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        coins: user.coins,
        level: user.level,
        overall_score:user.overall_score,
        course:user.course,
        score:user.score,
        // rank: user.level // Assuming 'level' represents the user's rank
      };
      console.log(userData);
      res.json(userData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  

router.get('/user/:email', async (req, res) => {
const userEmail = req.params.email;

try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Exclude sensitive information like password before sending the response
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return res.status(200).json({ success: true, user: userWithoutPassword });
} catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
}
});

router.get('/getAllData', async (req, res) => {
try {
    // Use Mongoose's `find` to retrieve all documents in the User collection
    const allUsers = await User.find();

    return res.status(200).json({ success: true, users: allUsers });
} catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
}
});
// Export the router
module.exports = router;
