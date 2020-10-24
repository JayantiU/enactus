const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Entry = require("../../models/Entry");

// POST api/posts
// Create an entry
router.post(
  "/",
  [auth, [check("actions", "Actions are required").not().isEmpty(), 
  check("user", "User is required").not().isEmpty(),
  check("date", "Entry date is required").not().isEmpty(),
  check("query", "Query is required").not().isEmpty(),
]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newEntry = new Entry({
        //name, user and avatar are fetched from db using req token
        user: req.user.id,
        date: req.body.date,
        query: req.body.query,
        actions: req.body.actions
      });

      const entry = await newEntry.save();

      res.json(entry);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// GET api/posts
// Get all posts
router.get("/", auth, async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user.id}).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    console.err(err.message);
    res.status(500).send("Server error");
  }
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if (entry.user !== user.id) return res.status(401).json({ msg: 'Unauthorized'})

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !entry) {
      return res.status(404).json({ msg: "Entry not found" });
    }

    res.json(entry);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

module.exports = router;
