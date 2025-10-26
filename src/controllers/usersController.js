const dataBase = require('../dataBase/dataBase')

module.exports = {

async createUser(req, res){

try{
 const { nome, cpf, email, senha_hash, cargo} = req.body

    const user = await dataBase.select('*').table('usuarios').where({cpf:cpf})
    if(user){
        return res.status(409).json({message: 'usuario já existe', user})
    }
    let dados ={
        nome,
        cpf,
        email,
        senha_hash,
        cargo
        
    }
    const result = await dataBase.insert(dados).into("usuarios")
    return res.status(201).json({message:'usuário cadastrado', result})

    }catch(error) {
        console.log(error)
        return res.status(500).json(error)
    }
    


    },

async showListUsers(req, res){

    try{
        const result = await dataBase.select().table('usuarios')
        if(!result){
            return res.status(204).json({message:'Nenhum usuário foi encontrado. Por favor cadastre um novo usuário'})
        }
        return res.status(200).json({menssage: 'usuários encontados', result})
    }catch(error){
        console.log(error)
    }

},
async showUser(req, res){

    const id = req.params
   
    const user = await dataBase.select('*').table('usuarios').where(id)
    
    if(!user){
        return res.status(204).json({message: 'Usuário não existe'})
    }

    return res.status(200).json({message:'Usuário encontrado', user})
},

async updateUser(req, res){
    const { nome, cpf, email, senha_hash, cargo} = req.body
    const id = req.params
   
    const user = await dataBase.select('*').table('usuarios').where(id)
    
    if(!user){
        
        return res.status(204).json({message: 'Usuário não existe'})
    }

     let dados ={
        nome,
        cpf,
        email,
        senha_hash,
        cargo
        
    }
    const result = await dataBase.where(id).update(dados).table('usuarios')
    return res.status(201).json({message: 'Usuário atualizado com sucesso', result})
    
}


}