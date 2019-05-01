exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Amy", cohorts_id: 1 },
        { name: "Bob", cohorts_id: 2 },
        { name: "Cindy", cohorts_id: 3 }
      ]);
    });
};
