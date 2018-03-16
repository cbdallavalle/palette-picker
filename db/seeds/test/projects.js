exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('palette').del()
    .then(function () {
      return Promise.all([
        knex('project').insert({
          name: 'MarvelousMagenta'
        }, 'id')
        .then(project => {
          return knex('palette').insert([
            {
              name: 'pinks', 
              project_id: project[0], 
              colors: ['#FF89FF', '#F60FFF', '#AFF9FF', '#FBF0FF', '#CF9FFF'] 
            },          
            {
              name: 'blues', 
              project_id: project[0], 
              colors: ['#FF89FF', '#F60FFF', '#AFF9FF', '#FBF0FF', '#CF9FFF']
            },
          ])
        })  
        .then(() => console.log('Seeding complete!'))
        .catch( error => console.log(`Error seeding data: ${error}`))
      ])
  })
};
