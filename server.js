const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const {
  confirmationPost,
  resendTokenPost,
} = require('./middleware/userController');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Email Verification
// app.post('/confirmation', confirmationPost);
// app.post('/resend', resendTokenPost);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  // Serve index.html file from client/build
  // * is anything other than above routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
