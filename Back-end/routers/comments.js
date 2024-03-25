const express = require('express');
const Comments = require("../models/Comments.js");
const fetchuser = require("../middlewares/fetchuser.js");
const { body, validationResult } = require('express-validator');
const UrlModel = require('../models/UrlModel.js');
const { default: mongoose } = require('mongoose');
const { default: axios } = require('axios');
const User = require('../models/User.js');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

// ROUTE 1: Get all the comments using GET "/comments/getuser" Login required
router.get('/fetchallcomments', fetchuser, async (req, res) => {
  try {
    const comments = await Comments.find({ user: req.user.id });
    res.json(comments);
  }
  catch (e) {
    res.status(500).send("Internal Server Error");
  }
})


router.post('/addcomments', fetchuser, async (req, res) => {
  try {
    // Fetch comments from the API and include the URL in the request body
    let response;
    try {
      response = await axios.post("http://127.0.0.1:5000/get_comments", req.body);
      console.log(response.data);
    }
    catch (error) {
      console.log(error);
      console.log("Error", error.message);
    }

    // Find the user by user ID
    const user = await User.findById(req.user.id);


    let urlDocument;
    // Check if the URL is already present in the user's URLs
    const existingUrl = await Promise.all(user.urls.map(async (urlId) => {
      try {
        // Find the URL document by ID
        urlDocument = await UrlModel.findById(urlId);
        if (urlDocument && urlDocument.url === req.body.videoId) {
          // URL found and URL matches, return the document
          return urlDocument;
        }
        // URL not found or URL does not match, return null
        return null;
      } catch (error) {
        console.error('Error while finding URL:', error);
        return null;
      }
    }));

    // Filter out the null values, keeping only the existing URL documents
    const filteredExistingUrls = existingUrl.filter(url => url);

    // Now, filteredExistingUrls contains only the URL documents that match the target URL
    if (filteredExistingUrls.length > 0) {
      // URLs found, do something with the array of matching URL documents
    } else {
      // No matching URLs found
      console.log('No matching URLs found.');
    }

    if (filteredExistingUrls.length > 0) {
      // Delete existing comments in the Comments model
      const deleteCommentPromises = filteredExistingUrls.map(async (existingUrl) => {
        await Comments.deleteMany({ _id: { $in: existingUrl.comments } });
      });

      // Wait for all deletions to finish
      await Promise.all(deleteCommentPromises);

      // Create new comments and save them to the Comments model
      const savedComments = await Promise.all(response.data.map(async (commentData) => {
        commentData['user'] = req.user.id;
        const newComment = new Comments(commentData);
        return await newComment.save();
      }));

      // Update the comments array in the existing URL documents
      const updatePromises = filteredExistingUrls.map(async (existingUrl) => {
        existingUrl.comments = savedComments.map(comment => comment._id);
        return existingUrl.save();
      });

      // Wait for all updates to finish
      await Promise.all(updatePromises);

      // Update the comments array in the UrlModel documents
      const urlModelUpdatePromises = filteredExistingUrls.map(async (existingUrl) => {
        const urlModel = await UrlModel.findOneAndUpdate(
          { _id: existingUrl._id },
          { comments: existingUrl.comments },
          { new: true }
        );
        return urlModel;
      });

      // Wait for all UrlModel updates to finish
      const updatedUrlModels = await Promise.all(urlModelUpdatePromises);

      res.send(response?.data);
    }


    else {
      // URL does not exist for the user, add new URL
      const savedComments = await Promise.all(
        response.data.map(async (comment) => {
          comment['user'] = req.user.id;
          const newComment = new Comments(comment);
          return await newComment.save();
        })
      );
      // console.log(savedComments);

      const newUrl = new UrlModel({
        url: req.body.videoId,
        comments: savedComments.map(comment => comment._id)
      });

      await newUrl.save();

      user.urls.push(newUrl);
      await user.save();

      res.send(response.data);
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }

});



module.exports = router;