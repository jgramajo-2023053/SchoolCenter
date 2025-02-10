import User from './user.model.js'

export const putUser = async(req, res)=>{
    try {
        let id = req.params.id
        let data = req.body
 
        let user = await User.findByIdAndUpdate(id, data, {new: true})
       
        if(!user) return res.status(404).send({message: 'user not found'})
        return res.send({message: 'User found: ', user})
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({message: 'General error', err})
    }
}
 
//Delete
export const deleteUser = async(req, res)=>{
    try{
        let id = req.params.id
        let user = await User.findByIdAndDelete(id)
        if(!user) return res.status(404).send({message: 'User not found'})
        return res.send({message: 'User Deleted: ', id})
    }catch(err){
        console.error('General error', err)
        return res.status(500).send({message: 'General error', err})
    }
}