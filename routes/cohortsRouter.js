const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);
const router = require("express").Router();

//==========================================Create Router
router.post("/", (req, res) => {
  db("cohorts")
    .insert(req.body, "id")
    .then(id => {
      db("cohorts")
        .where({ id })
        .first()
        .then(cohort => {
          res.status(201).json(cohort);
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ Message: `Could not send Cohort to Lambda. Try again.` });
    });
});
//==========================================Read Router
router.get("/", (req, res) => {
  db("cohorts")
    .then(cohort => {
      res.status(200).json(cohort);
    })
    .catch(err => {
      res.status(500).json({ message: "Cohort not Found" });
    });
});
//----------By ID
router.get("/:id", (req, res) => {
    db("cohorts")
    .where({id: req.params.id})
    .first()
    .then(cohort=>{
        if(cohort){
            res.status(200).json(cohort)
        }else{
            res.status(404).json({Message: "cohort not found"})
        }
    })
    .catch(err=>{
        res.status(500).json({message: `hhhhmmm try again I can't seem to find that cohort`})
    })
});
//----------Cohort Students By ID
router.get("/:id/students", (req, res) => {
    db("students")
    .where({roles_id: req.params.id})
    .then(student=>{
        if(student){
            res.status(200).json(student)
        }else{
            res.status(404).json({Message: "Cohort lost like the Donner party...sad indeed"})
        }
    })
    .catch(err=>{
        res.status(500).json({message:` The cohort seems to be lost try again`})
    })
});
//==========================================Update Router
router.put("/:id", (req, res) => {
    db('cohorts')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
        if (count > 0) {
            res.status(200).json({
            message: `Cohort successfully made the change`
        });
        } else {
            res.status(404).json({ message: 'cohort does not exist' });
        }
    })
    .catch(err => {
        res.status(500).json({message: `Change no good homie try again`});
    });
});
//==========================================Delete Router
router.delete("/:id", (req, res) => {
    db("cohorts")
    .where({id: req.params.id})
    .del()
    .then(count =>{
        if(count > 0) {
            res.status(200).json({message: `This cohort has been terminated.`})
        }else {
            res.status(404).json({ message: `That cohort doesn't even go here` });
        }
    })
    .catch(err => {
        res.status(500).json({messgae: `That cohort just isn't listening. Try again.`});
    });
});

module.exports = router;
