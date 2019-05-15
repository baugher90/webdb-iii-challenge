exports.seed = function(knex, Promise) {
  return knex("cohorts").insert([
    { name: "WEB 15" },
    { name: "WEB 16" },
    { name: "WEB 17" },
    { name: "WEB 18" },
    { name: "WEB 19" }
  ]);
};