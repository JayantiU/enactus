const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Entry = require("../../models/Entry");
const Action = require("../../models/Action");
const { query } = require("express");

// POST api/entries
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
      const {actions} = (await Action.find())[0];

      var queryActions = [];
      var totalScore = 0;

      for (var i = 0; i < actions.length; i++){
        var splitActions = actions[i].split(":");
        for (var j = 0; j < splitActions.length - 1; j++){
          var querySplit = req.body.query.split(' ');
          for (var k = 0; k < querySplit.length; k++){
            if (querySplit[k] === splitActions[j]){
              queryActions.push({ text: querySplit[k], score: parseFloat(splitActions[splitActions.length - 1])});
              totalScore += parseFloat(splitActions[splitActions.length - 1])
            }
          }
        }
      }

      const newEntry = new Entry({
        user: req.user.id,
        date: req.body.date,
        query: req.body.query,
        actions: queryActions,
        totalScore: totalScore
      });

      const entry = await newEntry.save();

      res.json(entry);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// GET api/entries
// Get all entries
router.get("/", auth, async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user.id}).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    console.err(err.message);
    res.status(500).send("Server error");
  }
});

// @route    GET api/entries/:id
// @desc     Get entry by ID
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    const user = await User.findById(req.user.id);
   
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
