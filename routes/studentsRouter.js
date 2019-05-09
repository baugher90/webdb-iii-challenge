const knex = require("knex")
const knexConfig = require("../knexfile")
const db = knex(knexConfig.development)

//==========================================Create Router
router.post("/",(req,res)=>{
    db("students")
    .insert(req.body,"id")
    .then(id=>{
        db("students")
            .where({id})
            .first()
            .then(student=>{
                res.status(201).json(student)
            })
            .catch(err=>{
                res.status(500).json(err)
            })
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})
//==========================================Read Router
router.get("/",(req,res)=>{
    db("students")
    .then(students=>{
        res.status(200).json(students)
    })
    .catch(err=>{
        res.status(500).json({message: "Students not Found"})
    })
})
//----------By ID
router.get("/:id",(req,res)=>{

})
//==========================================Update Router
router.put('/:id', (req, res) => {

})
//==========================================Delete Router
router.delete("/:id",(req,res)=>{

})

module.exports = router;