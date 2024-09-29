const express = require('express');
const { createAccount, loginUser } = require('../controllers/accountController');

const router = express.Router();

router.post("/create-account", createAccount);
router.post("/login", loginUser);

module.exports = router;