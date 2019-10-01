const express = require('express');
const userService = require('../../integration/user-services');
const router = express.Router();
const config = require('../../config');

/**
 * GET: Authenticate a user
 */
router.get('/', async (req, res) => {

  let username = req.query.username;
  let password = req.query.password;
  console.log(username,' ++ ' , password)

  let authenticated = null;
  try {
    authenticated = await userService.authenticateUser(username, password);
  } catch (err) {
      return res.status(400).json({message: err.errorCode});
  }
  if (!authenticated) {
    return res.status(401).json({
      message: "Something went wrong with authentication"
    });
  }else{
    return res.json({message: 'Successfully authenticated'})
  }
});

/**
 * GET: all users
 */
router.get('/all', async (req, res) => {
  const users = await userService.getUsers();
  return res.json(users);
  });

router.post('/', async( req, res) => {
  try{
    await userService.submitUser(req.body)
    return res.status(201).json({message: 'Account successfully created!'});
  }catch(err){
    return res.sendStatus(500);
  }
});

module.exports = router;
