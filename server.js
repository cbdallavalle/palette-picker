const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.locals.projects = [
  { id: 1, name: 'first' },
  { id: 2, name: 'second' },
  { id: 3, name: 'third' }
];

app.locals.palettes = [
  { id: 1, name: 'pinks', project_id: 1, colors: ['#FF89FF', '#F60FFF', '#AFF9FF', '#FBF0FF', '#CF9FFF'] },
  { id: 2, name: 'blues', project_id: 1, colors: ['#FF89FF', '#F60FFF', '#AFF9FF', '#FBF0FF', '#CF9FFF'] },
  { id: 3, name: 'blues', project_id: 2, colors: ['#FF89FF', '#F60FFF', '#AFF9FF', '#FBF0FF', '#CF9FFF'] }
];

//allows the server to receive a request from the user's port. If none exists, default to 3000
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';
app.use(bodyParser.json());
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.use(express.static('public'))

app.get('/api/v1/projects', (request, response) => {
  const allProjects = app.locals.projects;
  const allPalettes = app.locals.palettes;
  return response.status(200).json({allProjects, allPalettes});
})

app.post('/api/v1/projects', (request, response) => {
  const id = Date.now();
  const information = request.body;

  app.locals.projects.push({ id, ...information });
  response.status(201).json({ id, ...information });
  //push into 
  //response 201
})






//starts the server at the specified port
app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});