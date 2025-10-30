const dataBase = require('../dataBase/dataBase')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'brito14522'

module.exports = {


    async login(req, res){
        try{
            const {email, senha_hash} = req.body

            if(!email || !senha_hash){
                return res.status(401).json({message: 'é necessario informar um email e uma senha de acesso '})
            }
            const usuario = await dataBase.where({email}).table('usuarios').first()
            if(!usuario){
                return res.status(401).json({message:'Email ou senha estão incorretos'})
            }

            const senhaValida = await bcrypt.compare(senha_hash, usuario.senha_hash)
            if(!senhaValida){
                return res.status(401).json({message:'Email ou senha estão incorretos'})
            }

            //GERANDO TOKEN DE ACESSO
            const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            JWT_SECRET,
            { expiresIn: "1h" }
            );

            
            
            return res.status(200).json({message:'Login efetuado', token} )  
        }catch(error){
            console.log(error)
        }
    }
}