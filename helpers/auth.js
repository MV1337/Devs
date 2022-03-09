
const Dev = require('../Models/Dev')


module.exports.checkAuth = function(req, res, next){
    
    const UserId = req.session.userid

    
    if(!UserId){
        res.redirect('/login')
    }

    next()
}


module.exports.teste = async function(req, res, next){
    const id = req.params.id

    const UserId = req.session.userid
    const dev = await Dev.findOne({where: {UserId: UserId}, raw: true})

    const idUser = dev.id 
    
     if( id != idUser){
         res.redirect('/devs/error')
     }

    next()
}