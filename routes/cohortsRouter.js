const knex = require("knex")
const knexConfig = require("../knexfile")
const db = knex(knexConfig.development)

//==========================================Create Router
router.post("/",(req,res)=>{

})
//==========================================Read Router
router.get("/",(req,res)=>{
   db("cohorts")
    .then(cohort=>{
        res.status(200).json(cohort)
    })
    .catch(err=>{
        res.status(500).json({message: "Cohort not Found"})
    })
})
//----------By ID
router.get("/:id",(req,res)=>{

})
//----------Cohort Students By ID
router.get("/:id/students",(req,res)=>{

})
//==========================================Update Router
router.put('/:id', (req, res) => {

})
//==========================================Delete Router
router.delete("/:id",(req,res)=>{

})

module.exports = router;