const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);
const router = require("express").Router();

//==========================================Create Router
router.post("/", (req, res) => {
  db("students")
    .insert(req.body, "id")
    .then(id => {
      db("students")
        .where({ id })
        .first()
        .then(student => {
          res.status(201).json(student);
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({
          message: `Student was unable to be added to cohort. Try again.`
        });
    });
});
//==========================================Read Router
router.get("/", (req, res) => {
  db("students")
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => {
      res.status(500).json({ message: "Students not Found" });
    });
});
//----------By ID
router.get("/:id", (req, res) => {
    db("students")
    .where({id: req.params.id})
    .first()
    .then(student=>{
        if(student){
            res.status(200).json(student)
        }else{
            res.status(404).json({Message: `Student not in class today.`})
        }
    })
    .catch(err=>{
        res.status(500).json({message: `Having trouble finding student may try @channel?`})
    })
});
//==========================================Update Router
router.put("/:id", (req, res) => {
    db('students')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
        if (count > 0) {
            res.status(200).json({
            message: `Student got a make over.`
        });
        } else {
            res.status(404).json({ message: `They don't even go here.` });
        }
    })
    .catch(err => {
        res.status(500).json({message: `You don't have permission to make them kinds of changes`});
    });
});
//==========================================Delete Router
router.delete("/:id", (req, res) => {
    db("students")
    .where({id: req.params.id})
    .del()
    .then(count =>{
        if(count > 0) {
            res.status(200).json({message: `Student has been terminated...daaang, thats harsh`})
        }else {
            res.status(404).json({ message: `Jokes on you I don't even go to this school.` });
        }
    })
    .catch(err => {
        res.status(500).json({message: `Oh ya well my dad just sued your dad and Now I back baby! You can't kick me out!`});
    });
});

module.exports = router;
