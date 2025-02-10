import Curse from './curse.model.js'

//Crear Curso
export const saveCurse = async(req, res)=>{
    try{    
        let data = req.body
        let curse = new Curse(data)

        await curse.save()
        return res.send({
            message: 'Curse created: ',
            curse
        })
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with curse creation', err})
    }
}

export const updateCurse = async(req, res)=>{
    try{
        const { id } = req.params
 
        const data = req.body
 
        const update = await Curse.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )
 
        if(!update) return res.status(404).send(
            {
                success: false,
                message: 'Curse not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Curse updated',
                user: update
            }
        )
    }catch(err){
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}


export const deleteCurse = async(req, res)=>{
    try{
        let id = req.params.id
        let curse = await Curse.findById(id);
        if(!curse) return res.status(404).send({message: 'Curse not found'})

        await Curse.updateOne({ _id: id }, { $set: { students: [] } });

        await Curse.findByIdAndDelete(id);
        return res.send({message: `${Curse.name} Deleted: `, id})
    }catch(err){
        console.error('General error', err)
        return res.status(500).send({message: 'General error', err})
    }
}

export const getCurses = async(req, res)=>{
    try {
        let curses = await Curse.find()
        if(curses.length===0) return res.status(404).send({message: 'Curses is empty'})
        
        return res.send({message: 'Curses found: ', curses})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'General Error', err})
    }
}