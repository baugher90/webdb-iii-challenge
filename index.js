const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.db3"
  },
  useNullAsDefault: true // needed for sqlite
};
const db = knex(knexConfig);

const server = express();

server.use(helmet());
server.use(express.json());

// list all cohorts
// [GET] /api/cohorts This route will return an array of all cohorts.
server.get("/api/cohorts", async (req, res) => {
  // get the cohorts from the database
  try {
    const cohorts = await db("cohorts"); // all the records from the table
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// list a cohort by id
// [GET] /api/cohorts/:id This route will return the cohort with the matching id.
server.get("/api/cohorts/:id", async (req, res) => {
  // get the cohorts from the database
  try {
    const cohort = await db("cohorts")
      .where({ id: req.params.id })
      .first();
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json(error);
  }
});

const errors = {
  "19": "Another record with that value exists"
};

// list the students for the cohort
// [GET] /api/cohorts/:id/students returns all students for the cohort with the specified id.
server.get("/api/cohorts/:id/students", async (req, res) => {
  try {
    const id = req.params.id;
    const cohort = await db("cohorts as c")
      .join("students as s", "s.id", "c.cohorts_id")
      .select("s.id", "s.name")
      .where("c.id", id)
      .first();
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create cohorts
// [POST] /api/cohorts This route should save a new cohort to the database.
server.post("/api/cohorts", async (req, res) => {
  try {
    const [id] = await db("cohorts").insert(req.body);

    const cohort = await db("cohorts")
      .where({ id })
      .first();

    res.status(201).json(cohort);
  } catch (error) {
    const message = errors[error.errno] || "We ran into an error";
    res.status(500).json({ message, error });
  }
});

// update cohorts
// [PUT] /api/cohorts/:id This route will update the cohort with the matching id using information sent in the body of the request.
server.put("/api/cohorts/:id", async (req, res) => {
  try {
    const count = await db("cohorts")
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const cohort = await db("cohorts")
        .where({ id: req.params.id })
        .first();

      res.status(200).json(cohort);
    } else {
      res.status(404).json({ message: "Records not found" });
    }
  } catch (error) {}
});

// remove cohorts (inactivate the cohort)
// [DELETE] /api/cohorts/:id This route should delete the specified cohort.
server.delete("/api/cohorts/:id", async (req, res) => {
  try {
    const count = await db("cohorts")
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Records not found" });
    }
  } catch (error) {}
});

const port = process.env.PORT || 4000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);
