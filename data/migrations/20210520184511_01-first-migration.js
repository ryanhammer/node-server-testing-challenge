
exports.up = function(knex) {
  return knex.schema.createTable("students", tbl => {
    tbl.increments();

    tbl.string("name", 255).unique().notNullable();

    tbl.string("house", 15).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("students");
};
