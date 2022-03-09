const Dev = require("../Models/Dev")
const User = require("../Models/User")


module.exports = class DevsController {
    static async showDevs(req, res) {

        const devsData = await Dev.findAll({
            include: User,
        })

        const devs = devsData.map((result) => result.get({ plain: true }))

        res.render('devs/home', { devs })
    }

    static async profile(req, res) {

        const userId = req.session.userid 

        const user = await User.findOne({
            where: {
                id: userId,
            },
            include: Dev, 
            plain: true,
        })
        

        
        if (!user) {
            res.redirect('/login')
        }

        const devs = user.Devs.map((result) => result.dataValues)

        
        let checkDevs = true

        if (devs.length === 0) {
            checkDevs = false
        }

        
        res.render('devs/profile', { devs, checkDevs })
    }

    static create(req, res) {

        res.render('devs/create')
    }

    static async createPost(req, res) {

        const tec = req.body.technologies
        const tech = tec.toString()
        const technologies = tech.split(',').join(', ')

        


        const dev = {
            devweb: req.body.devweb,
            level: req.body.level,
            technologies: technologies,
            experience: req.body.experience,
            UserId: req.session.userid 
        }

        try {
            await Dev.create(dev)
            req.flash('message', 'Informações adicionadas com sucesso!')
            req.session.save(() => {
                res.redirect('/devs/profile')
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async edit(req, res) {
        const id = req.params.id
        const devs = await Dev.findOne({ where: { id: id }, raw: true })

        res.render('devs/edit', { devs })
    }


    static async editPost(req, res) {
        

        const userId = req.session.userid

        const tec = req.body.technologies
        const tech = tec.toString()
        const technologies = tech.split(',').join(', ')

        const dev = {
            devweb: req.body.devweb,
            level: req.body.level,
            technologies: technologies,
            experience: req.body.experience,
        }

        try {
            await Dev.update(dev, { where: { UserId: userId } })
            req.flash('message', 'Informações atualizadas com sucesso!!!')
            req.session.save(() => {
                res.redirect('/devs/profile')
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async devs(req, res) {
        const id = req.params.id

        const UserId = req.params.UserId

        const dev = await Dev.findOne({
            where: { id: id },
            raw: true
        })

        const user = await User.findOne({
            where: { id: UserId },
            raw: true
        })

        res.render('devs/dev', { dev, user })
    }

    static teste(req, res) {
        res.render('devs/error')
    }

}
