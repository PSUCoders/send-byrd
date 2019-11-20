const express = require("express");
const router = express.Router();
const GoogleSheetsService = require('../../services/googleSheets');

/// Get all members of Coding Hub
router.get("/", async (req, res, next) => {
    try {
        const googleSheetsService = new GoogleSheetsService();
        await googleSheetsService.initialize();
        const members = await googleSheetsService.getAllMembers();
        res.send({ data: members });
    } catch (error) {
        console.error(error)
        res.status(400);
        res.send({ error });
    }
});

module.exports = router;
