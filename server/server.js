//Install express server
const express = require('express');
const config = require('./config');
const path = require('path');

const user = require('./router/api/user');

const app = express();

app.use('/api/user', user);

const port = process.env.PORT || 8080;



if(process.env.NODE_ENV === 'production'){
  // Serve only the static files form the dist directory
  app.use(express.static(__dirname + '/../dist/angular-performance-test'));

  app.get('/*', function(req,res) {

  res.sendFile(path.join(__dirname+'/../dist/angular-performance-test/index.html'));
  });
}

// Start the app by listening on the default Heroku port
app.listen(port, () => console.log(`Server running on port ${port}`));
