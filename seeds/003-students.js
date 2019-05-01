exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Alex", cohorts_id: 1 },
        { name: "Bill", cohorts_id: 2 },
        { name: "Chase", cohorts_id: 3 }
      ]);
    });
};
