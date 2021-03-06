//Install express server
const express = require('express');
const config = require('./config');
const path = require('path');
const bodyParser = require('body-parser');

const user = require('./router/api/user');
const recipe = require('./router/api/recipe');
const auth = require('./router/api/auth');
const guard = require('./helpers/guard');

const app = express();


app.use(bodyParser.json());
/* Authenticates each */
app.use(/\/api\/.{1,}/, guard);

app.use('/api/user', user);
app.use('/api/recipe', recipe);
app.use('/api/auth', auth);



const port = config.PORT;
const env = config.ENV;


/**
 * If NODE_ENV is set to production the server will take responsibility for serving
 * the built version of the app located in the build directory.
 */
if(env === 'production'){
  // Serve only the static files form the dist directory
  app.use(express.static(__dirname + '/../dist/angular-performance-test'));

  app.get('/*', function(req,res) {

  res.sendFile(path.join(__dirname+'/../dist/angular-performance-test/index.html'));
  });
}

app.listen(port, () => console.log(`Server running on port ${port}`));
