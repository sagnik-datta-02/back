// Import necessary modules
const express = require('express');
const User = require('../../models/signup'); // Adjust the path based on your project structure
const router = express.Router();
// const app = express();
// app.use(express.json());

router.post('/update-course', async (req, res) => {
    try { 
      const { email, courses } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Initialize the course field if it doesn't exist
      if (!user.course) {
        user.course = {};
      }
  
      // Initialize the courses array if it doesn't exist
      if (!user.course.courses) {
        user.course.courses = [];
      }
  
      // Append the courses to the user's courses array
      user.course.courses.push(...courses);
  
      // Save the updated user
      await user.save();
  
      return res.json({ message: 'Courses added successfully' });
    } catch (error) {
      console.error('Error updating courses:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/update-scores/:email', (req, res) => {
    try {
      const { email } = req.params;
      const { timestamp, confidence, eye_contact, clarity, boldness, overall } = req.body;
  
      // Find the user by email
      const user = User.find(u => u.email === email);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Add the new score to the user's scores
      user.score.push({
        timestamp,
        confidence,
        eye_contact,
        clarity,
        boldness,
        overall,
      });
  
      res.status(200).json({ message: 'Scores updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// Export the router
module.exports = router;
