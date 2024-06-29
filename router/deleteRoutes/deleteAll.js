// Import necessary modules
const express = require('express');
const User = require('../../models/signup'); // Adjust the path based on your project structure
const router = express.Router();
// const app = express();
// app.use(express.json());

router.delete('/deleteAllData', async (req, res) => {
    try {
      // Use Mongoose's `deleteMany` to delete all documents in the User collection
      await User.deleteMany();
  
      return res.status(200).json({ success: true, message: 'All data deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  
// Export the router
module.exports = router;
