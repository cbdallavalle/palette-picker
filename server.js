const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';
app.use(bodyParser.json());
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.use(express.static('public'));

app.get('/api/v1/projects', async (request, response) => {
  try {
    const projects = await database('project').select();
    return response.status(200).json(projects)
  } catch (error) {
    return response.status(500).json({ error })
  }
});

app.post('/api/v1/projects', (request, response) => {
  const projectInfo = request.body;

  for(let requiredParam of ['name']) {
    if(!projectInfo[requiredParam]) {
      return response
        .status(422)
        .send({ error: `You're missing a "${requiredParam}"`})
    }
  }

  database('project').insert(projectInfo, 'id')
    .then(proj => {
      response.status(201).json({ id: proj[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
})

app.get('/api/v1/palettes', async (request, response) => {
  try {
    const palettes = await database('palette').select();
    return response.status(200).json(palettes);
  } catch (error) {
    return response.status(500).json({ error })
  }
})

app.post('/api/v1/palettes', (request, response) => {
  const paletteInfo = request.body;

  for (let requiredParam of ['name', 'project_id', 'colors']) {
    if (!paletteInfo[requiredParam]) {
      return response
        .status(422)
        .send({ error: `You're missing a "${requiredParam}"` })
    }
  }

  database('palette').insert(paletteInfo, 'id')
    .then(pal => {
      response.status(201).json({ id: pal[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.delete('/api/v1/palettes/:id', async (request, response) => {
  const { id } = request.params;
  database('palette').where('id', id).del()
    .then( deleted => {
      response.status(202).json({ id: deleted.id })
    })
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;