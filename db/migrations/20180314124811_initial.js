exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('project', function(table) {
      table.increments('id').primary();
      table.string('name');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('palette', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.integer('project_id').unsigned()
      table.foreign('project_id')
        .references('project.id');
      table.specificType('colors', 'text[]');
      
      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('palette'),
    knex.schema.dropTable('project')
  ])
};