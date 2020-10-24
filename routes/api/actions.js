const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Entry = require("../../models/Entry");
const Action = require("../../models/Action");

// GET api/actions
// get actions
router.get(
  "/",
 auth,
  async (req, res) => {

    try {
        const {actions} = (await Action.find())[0];
      res.json(actions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
