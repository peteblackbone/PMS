const router = require("express").Router();
const db = require("../../../models")

router.get("/", async (req, res) => {
    try {
        const data = await db.document.findAll();
        return res.json(data);
    } catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const data = await db.document.findAll({
            where: [{
                Document_ID: req.params.id
            }]
        });
        return res.json(data);
    } catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
});

module.exports = router;