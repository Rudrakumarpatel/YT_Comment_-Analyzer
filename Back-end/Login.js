const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const auth = require('./routers/auth.js');
const comments = require('./routers/comments.js');
const dotenv = require('dotenv');
const port = 3001;

dotenv.config();

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1/CommentSense');
  console.log('Connected to MongoDB');
}

app.get("/", (req, res) => {
  res.send("hello world");
})

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', auth);
app.use('/comments',comments);
