exports.up = function(knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.string('userid', 50).notNullable();
      table.string('name', 255).notNullable();
      table.string('email', 255).notNullable();
      table.string('pwd',255).notNullable();
      //table.timestamps();
      table.primary(['userid']);
      table.unique(['email']);
    })
    .createTable('recipes', function (table){
      table.string('userid',50).notNullable();
      table.blob('recipe',100000);
      table.string('skey',5).notNullable();
      table.integer('created_date').notNullable();
      table.real('timestamp').notNullable();
      table.integer('is_del').notNullable();
      table.foreign('userid').reference('userid').inTable('users');
    })
    .createTable('last_accessed', function(table){
      table.string('userid',50).notNullable();
      table.string('timetamp').notNullable();
      table.foreign('userid').reference('userid').inTable('users');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('users');
};
