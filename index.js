require("dotenv").config({ path: './.env' });
const express = require("express");
const sendEmail = require("./utils/sendEmail");
const cors = require("cors");

const app = express();

app.use(cors({}))

app.use(express.json());

app.post('/send-email', (req, res) => {
  const { subject, html } = req.body;

  if (!subject || !html) {
    return res.status(400).json({ error: 'Missing required fields: to, subject, or html' });
  }

  sendEmail({ subject, html }, (err, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    res.json({ message: 'Email sent successfully', info });
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
