const router = require("express").Router();

const db = require("../../models/index");

router.get("/", async (req, res) => {
  try {
    const form_comment = await db.form_comment.findAll({
      // where: {
      //   Member_ProjectID: req.query.id,
      // },
    });
    return res.json(form_comment);
  } catch (e) {
    return res.status(500).json(e);
  }
});

module.exports = router;

//
