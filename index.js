//chamar as regras
const express = require('express')
const { engine } = require("express-handlebars")
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')


const app = express()
const conn = require("./db/conn")


app.engine('handlebars', engine())
app.set('view engine', 'handlebars')


app.use(express.urlencoded({
     extended: true
}))

app.use(express.static("public"))
app.use(express.json())


//models
const User = require('./Models/User')
const Dev = require('./Models/Dev')

//Routes
const Authroutes = require('./routes/authRoutes')
const devsRoutes = require('./routes/devsRouter')


//controllers
const DevsController = require('./Controller/DevsController')
const AuthController = require('./Controller/AuthController')




app.use(
    session({
        name: 'session',
        secret: 'nosso_secret', 
        resave: false, 
        saveUninitialized: false, 
        store: new FileStore({ 
            logFn: function() {}, 
            path: require('path').join(require('os').tmpdir(), 'sessions'), 
        }),
        cookie: {
            secure: false,
            maxAge: 36000000, 
            expires: new Date(Date.now() + 36000000), 
            httpOnly: true
        }
    })
)


app.use(flash())


app.use((req, res, next) => {

    if (req.session.userid) {
        res.locals.session = req.session
    }

    next()
})



app.use('/', Authroutes)
app.use('/devs', devsRoutes)

app.get('/', DevsController.showDevs)



conn
    //.sync({force: true})
    .sync()
    .then(() => {
        app.listen(80)
    })
    .catch((err) => {
        console.log(err)
    })