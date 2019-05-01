exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("cohorts")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cohorts").insert([
        { name: "Web 16" },
        { name: "Web 17" },
        { name: "Web 18" }
      ]);
    });
};

// npx knex seed:make name
// npx knex seed:run to run them
