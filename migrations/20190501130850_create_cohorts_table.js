// implement changes to the schema
exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", tbl => {
    // each table needs a primary key
    // we'll call it id, integer, auto-increment
    tbl.increments();

    tbl
      .text("name", 128)
      .notNullable()
      .unique();

    tbl.timestamps(true, true); // created at and updated at
  });
};

// undo the changes
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cohorts");
};
