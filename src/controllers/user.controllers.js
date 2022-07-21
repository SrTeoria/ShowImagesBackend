const User = require('../models/user.model')
const bcrypt = require('bcrypt')


module.exports = {
  async createUser(req, res) {
    try{
      const { email, password } = req.body
      const user = await User.create({ email, password})
      await user.save({validateBeforeSave: false})

      return res.status(201).json({message: 'Usuario creado con exito'})
    } catch(error){
      return res.status(400).json({error: error.message})
    }
  },
  async login(req, res) {
    try{
      const { email, password } = req.body
      const user = await User.findOne({ email })

      if(!user){
        return res.status(404).json({error: 'El correo del usuario es invalido'})
      }

      const isValid = await bcrypt.compare(password, user.password)

      if(!isValid){
        return res.status(403).json({error: 'La contraseña es invalida'})
      }
      return res.status(201).json({message: 'Logueo con exito'})
    } catch(error) {
      return res.status(401).json({error: error.message})
    }
  }
}