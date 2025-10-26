const dataBase = require('../dataBase/dataBase')

module.exports = {

async createUser(req, res){

try{
 const { nome, cpf, email, senha_hash, cargo} = req.body

    const usuario = await dataBase.where({cpf:cpf}).table('usuarios')

    if(usuario.length > 0){
        return res.json({message: 'usuario ja está cadastrado', usuario})
    }
        let dados = {
                nome,
                cpf,
                email, 
                senha_hash, 
                cargo
        }
         await dataBase.insert(dados).into('usuarios')
        return res.status(201).json({message: 'cadastro efetuado'})
    
  
    

    }catch(error) {
        console.log(error)
        return res.status(500).json(error)
    }
    
    },

  async showListUsers(req, res){

    try{
        const usuarios = await dataBase.select('*').table('usuarios')
        if(usuarios.length == 0){
            return res.status(200).json({message:'Nenhum usuário foi encontrado, você deve cadastrar um.'})
        }
        return res.status(200).json({menssage: 'usuários encontados', usuarios})
    }catch(error){
        console.log(error)
    }

},
async showUser(req, res){

   try{
     const {id} = req.params
   
    const usuario = await dataBase.where({id:id}).table('usuarios')
    
    
        if(usuario.length == 0){
           return res.status(200).json({message:'Usuário não encontrado'})
        }
        return res.status(200).json({message:'Usuário encontrado', usuario})

   }catch(error){
    console.log(error)
   }
    
    

},

async updateUser(req, res){
    try{

    const { nome, cpf, email, senha_hash, cargo} = req.body
    const {id} = req.params
   
  const usuario = await dataBase.where({id:id}).table('usuarios')
    
    
        if(usuario.length == 0){
           return res.status(200).json({message:'Usuário não encontrado'})
        }

     let dados ={
        nome,
        cpf,
        email,
        senha_hash,
        cargo
        
    }
    
    await dataBase.where({id}).update(dados).table('usuarios')
    return res.status(201).json({message: 'Usuário atualizado com sucesso'})
    
    }catch(error){
        console.log(error)
    }
},
async deleteUser(req, res){
    try{

    
    const {id} = req.params
   
        const usuario = await dataBase.where({id:id}).table('usuarios')
    
    
        if(usuario.length == 0){
           return res.status(200).json({message:'Usuário não encontrado'})
        }

    
    
    await dataBase.where({id}).del().table('usuarios')
    return res.status(201).json({message: 'Usuário deletado com sucesso'})
    
    }catch(error){
        console.log(error)
    }
} 



}