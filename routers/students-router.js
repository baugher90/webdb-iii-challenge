const express = require("express");
const router = express.Router();

const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.db3"
  },
  useNullAsDefault: true // needed for sqlite
};
const db = knex(knexConfig);

// list all students
// [GET] /api/students This route will return an array of all students.
router.get("/", async (req, res) => {
  // get the students from the database
  try {
    const students = await db("students"); // all the records from the table
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
});

// list a student by id
// [GET] /api/students/:id This route will return the student with the matching id.
router.get("/:id", async (req, res) => {
  // get the students from the database
  try {
    const student = await db("students")
      .where({ id: req.params.id })
      .first();
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
});

const errors = {
  "19": "Another record with that value exists"
};

// create students
// [POST] /api/students This route should save a new student to the database.
router.post("/", async (req, res) => {
  try {
    const [id] = await db("students").insert(req.body);

    const student = await db("students")
      .where({ id })
      .first();

    res.status(201).json(student);
  } catch (error) {
    const message = errors[error.errno] || "We ran into an error";
    res.status(500).json({ message, error });
  }
});

// update students
// [PUT] /api/students/:id This route will update the student with the matching id using information sent in the body of the request.
router.put("/:id", async (req, res) => {
  try {
    const count = await db("students")
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const student = await db("students")
        .where({ id: req.params.id })
        .first();

      res.status(200).json(student);
    } else {
      res.status(404).json({ message: "student not found" });
    }
  } catch (error) {}
});

// remove students (inactivate the student)
// [DELETE] /api/students/:id This route should delete the specified student.
router.delete("/:id", async (req, res) => {
  try {
    const count = await db("students")
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(200).json({ message: "student Removed" });
    } else {
      res.status(404).json({ message: "student not found" });
    }
  } catch (error) {}
});

module.exports = router;
