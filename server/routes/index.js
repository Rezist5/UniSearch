const Router = require('express')
const router = new Router()
const universityRouter = require('./universityRouter')
const userRouter = require('./userRouter')
const directionRouter = require('./directionRouter')
const reviewRouter = require('./reviewRouter')
const visaRouter = require('./visaRouter')
const languageRouter = require('./languageRouter')
const examRouter = require('./examRouter')
const subjectRouter = require('./subjectRouter')
const portfolioRouter = require('./portfolioRouter')



router.use('/user', userRouter)
router.use('/review', reviewRouter)
router.use('/university', universityRouter)
router.use('/direction', directionRouter)
router.use('/visa', visaRouter)
router.use('/language', languageRouter)
router.use('/exam', examRouter)
router.use('/subject', subjectRouter)
router.use('/portfolio', portfolioRouter)



module.exports = router