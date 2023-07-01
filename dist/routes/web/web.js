"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//ROUTERS USE ADD HERE
const router = (0, express_1.Router)();
/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("welcome", { title: "Express" });
});
//ROUTERS USE ADD HERE
exports.default = router;
