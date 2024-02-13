const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/User.js');
const port = 3000;

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1/demo');
  console.log('Connected to MongoDB');
}

app.use(cors());
app.use(bodyparser.json());

app.get("/", (req, res) => {
  console.log("hello world");
  res.send("hello world");
})

app.post("/Login", async (req, res) => {
  console.log(req.body.email);
  console.log(req.body.password);

  console.log("enter");
  const email = req.body.email;
  const password = req.body.password;
  const check_email = await User.findOne({ email});

  if (check_email) {
    const olduser = await User.findOne({ password });
    if(olduser)
    {
      console.log("user already exists");
      return res.json({ data: "exists" });
    }
    else
    {
      return res.json({data:"Please give valid password" });
    }
  }
  else {
    return res.json({ data: "not Exist" });
  }
})

app.post('/signup', async (req, res) => {
  console.log("hello world");

  //Check for old user
  const email = req.body.email;
  const password = req.body.password;

  const check_email = await User.findOne({email});

  if (check_email) {
    const olduser = await User.findOne({ password });
    if(olduser)
    {
      console.log("user already exists");
      return res.json({ data: "exists" });
    }
    else
    {
      return res.json({data:"Please give valid password" });
    }
  }

  //New user 
  let doc;
  try {
    let user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    doc = await user.save();
  }
  catch (e) {
    console.log(e);
  }
  console.log(doc);
  res.json(doc);
})

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
