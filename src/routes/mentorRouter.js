const { Router } = require('express')
const { route } = require('../app')
const userRouter = Router()
const bcrypt = require('bcrypt') // ПАКЕТ ДЛЯ СОЗДАНИЯ ПАРОЛЯ
const saltRound = 10 // ПО СТАНДАРТУ (подключения)
const session = require('express-session')

userRouter.route('/signup')
  .get((req, res) => {
    return res.render('signup')
  })

  .post( async (req, res) => {
    const {email, pass: plainPass, name} = req.body
    if (email && plainPass && name) {
      const pass = await bcrypt.hash(plainPass, saltRound)
      const newUser = await userRouter.create({
        email,
        pass,
        name,
      })
      req.session.user = {
        id: newUser._id,
      }
      return res.redirect('/')
    }
    return res.status(418).redirect('/users/signup')
  })

userRouter.route('/signin')
  .get((req, res) => {
    return res.render('signin')
  })
  .post( async (req, res) => {
    const {email, pass} = req.body
    if (email && pass) {
      const currentUser = await User.findOne({ email })
      if (currentUser && (await bcrypt.compare(pass, currentUser.pass))) {
        req.session.user = {
          id: currentUser._id,
        }
        return res.redirect('/')
      }
      return res.status(418).redirect('/users/signin')
    }
    return res.status(418).redirect('/users/signin')
  })

userRouter.route('/signout')
  .get(async (req, res) => {
req.session.destroy((err) => {
  if (err) return res.redirect('/')
  res.clearCookie(req.app.get('cookieName'))
  return res.redirect('/')
})
  })
  

module.exports = userRouter
