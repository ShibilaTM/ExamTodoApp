const todoData = require('../model/todoitems')
const router = require('express').Router()
const cors=require('cors')
router.use(cors())

//post method
router.post('/add',async(req,res)=>{
    try {
        const data = req.body
        const saveForm = await todoData(data).save()
        res.status(200).json({message:'successfully added'})
        
    } catch (error) {
        res.status(500).json({error:error})
    }
})

//get method
router.get('/getall',async(req,res)=>{
    try {
       
        const saveForm = await todoData.find()
        if(!saveForm){
            return res.status(404).json({message:'user data not found'})
        }
        res.status(200).json(saveForm)
    } catch (error) {
        res.status(500).json({error:error})

    }  
})

//get one 
router.get('/getone/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await todoData.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//update method
router.put('/update/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const userExist = await todoData.findById(id)
        if(!userExist){
            res.status(404).json({message:'user not found'})
        }
        const data=req.body
        const updateForm = await todoData.findByIdAndUpdate(id,data,{new:true})
        res.status(200).json({message:'successfully updated'})
    } catch (error) {
        res.status(500).json({error:error})
    }
})

//delete method
router.delete('/delete/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const userExist = await todoData.findById(id)
        if(!userExist){
            res.status(404).json({message:'no user exist'})
        }
        const deleteForm = await todoData.findByIdAndDelete(id)
        res.status(200).json({message:'deleted successfully'})
    } catch (error) {
        res.status(500).json({error:error})
    }
})




module.exports = router