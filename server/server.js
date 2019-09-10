//Install express server
const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 8080;

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/../dist/angular-performance-test'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/../dist/angular-performance-test/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(port, () => console.log(`Server running on port ${port}`));
