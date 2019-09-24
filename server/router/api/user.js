const express = require('express');
const dbservice = require('../../integration/db-services');
const router = express.Router();
const config = require('../../config');

/**
 * GET: a single users basic information
 */
router.get('/', async (req, res) => {
      const users = await dbservice.getUsers();
      return res.json(users);
    });

module.exports = router;
