const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');


chai.use(chaiHttp);

//what else should I test?
describe('Client Routes', () => {
  it('should return the homepage with an html document', () => {
    return chai.request(server)
    .get('/')
    .then(response => {
      response.should.have.status(200);
      response.should.be.html;
    })
    .catch(error => {
      throw error;
    });
  });

  it('should return a 404 if the requested page is not found', () => {
    return chai.request(server)
    .get('/kublaikhan')
    .then(response => {
      response.should.have.status(404);
    })
    .catch(error => {
      throw error
    });
  });
});

describe('API Routes', () => {
  
  beforeEach(function(done) {
    database.migrate.rollback()
    .then(function() {
      database.migrate.latest()
      .then(function() {
        return database.seed.run()
        .then(function() {
          done();
        });
      });
    });
  });

  describe('GET /api/v1/projects', () => {
    it('should return return all of the projects', () => {
      return chai.request(server)
      .get('/api/v1/projects')
      .then(response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);        
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('MarvelousMagenta');
        response.body[0].should.have.property('created_at');
        response.body[0].should.have.property('updated_at');
      })
    })
    //is there a way to test that my try catch in the get request works?
  })

  describe('POST /api/v1/projects', () => {
    it('should post a new project', () => {
      return chai.request(server)
      .post('/api/v1/projects')
      .send({
        name: 'BeigeBungalow'
      })
      .then(response => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('id');
        response.body.id.should.equal(2);
      })
      .catch(error => {
        throw error
      });
    });

    it('should return a 422 when no name is provided', () => {
      return chai.request(server)
      .post('/api/v1/projects')
      .send({
        // name: 'BeigeBungalow'
      })
      .then(response => {
        response.should.have.status(422);
        response.body.error.should.equal('You\'re missing a "name"');
      })
      .catch(error => {
        throw error
      })
    })
  });

  describe('GET /api/v1/palettes', () => {
    it('should return return all of the palettes', () => {
      return chai.request(server)
      .get('/api/v1/palettes')
      .then(response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(2);
        response.body[0].should.have.property('colors');
        response.body[0].colors.length.should.equal(5);        
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('pinks');
        response.body[0].should.have.property('project_id');
        response.body[0].project_id.should.equal(1);
        response.body[0].should.have.property('created_at');
        response.body[0].should.have.property('updated_at');
      });
    });
  });

  describe('POST /api/v1/palettes', () => {

    it('should post a new palette', () => {
      return chai.request(server)
      .post('/api/v1/palettes')
      .send({
        name: 'primaries',
        project_id: 1,
        colors: ['blue', 'black', 'red', 'yellow', 'white'],
      })
      .then(response => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('id');
        response.body.id.should.equal(3);
      })
      .catch(error => {
        throw error
      });
    });

    it('should return a 422 when no name is provided', () => {
      return chai.request(server)
      .post('/api/v1/projects')
      .send({
        // name: 'primaries',
        project_id: 1,
        colors: ['blue', 'black', 'red', 'yellow', 'white'],
      })
      .then(response => {
        response.should.have.status(422);
        response.body.error.should.equal('You\'re missing a "name"');
      })
      .catch(error => {
        throw error
      });
    });

    it('should return a 422 when no colors are provided', () => {
      return chai.request(server)
      .post('/api/v1/palettes')
      .send({
        name: 'primaries',
        project_id: 1,
        // colors: ['blue', 'black', 'red', 'yellow', 'white'],
      })
      .then(response => {
        response.should.have.status(422);
        response.body.error.should.equal('You\'re missing a "colors"');
      })
      .catch(error => {
        throw error
      });
    });

    it('should return a 422 when no project id is provided', () => {
      return chai.request(server)
      .post('/api/v1/palettes')
      .send({
        name: 'primaries',
        // project_id: 1,
        colors: ['blue', 'black', 'red', 'yellow', 'white'],
      })
      .then(response => {
        response.should.have.status(422);
        response.body.error.should.equal('You\'re missing a "project_id"');
      })
      .catch(error => {
        throw error
      });
    });
  });

  describe('DELETE /api/v1/palettes/:id', () => {
    it('should return delete a specified palette', () => {
      return chai.request(server)
      .del('/api/v1/palettes/1')
      .then(response => {
        response.should.have.status(202);
      });
    });
  });

});