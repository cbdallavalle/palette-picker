const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//allows the server to receive a request from the user's port. If none exists, default to 3000
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';
app.use(bodyParser.json());
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.use(express.static('public'))

app.get('/', (request, response) => {
  
})






//starts the server at the specified port
app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});