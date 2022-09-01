const express =require('express')
const mongoose = require('mongoose')
const cors = require ('cors')
const logger = require('morgan')

//init app
app = express()

//set env
require('dotenv').config()
const { PORT, DATABASE_URL, API_KEY} = process.env

// //Steam Auth
// const SteamAuth = require('node-steam-openid')

// const steam = new SteamAuth ({
//     realm:`http://localhost:${PORT}`,
//     returnUrl: `http://localhost:${PORT}/auth/steam/authenticate`,
//     apiKey: API_KEY
// })

//connect to DB
mongoose.connect(DATABASE_URL)

mongoose.connection
.on('connected', () => console.log ('connected to MongoDB'))
.on('error', (error) => console.log('mongoDB Error' + Error.message))

//middleware
app.use(express.json())
app.use(cors())
app.use(logger('dev'))

// //SteamRoutes
// app.get("/auth/steam", async (req, res) => {
//     const redirectUrl = await steam.getRedirectUrl();
//     return res.redirect(redirectUrl);
//   });
  
//   app.get("/auth/steam/authenticate", async (req, res) => {
//     try {
//       const user = await steam.authenticate(req);
  
      //...do something with the data
//     } catch (error) {
//       console.error(error);
//     }
//   });

//Imported rutes
const routesRouter = require ("./routes/routes")


//rerouter
app.use('/', routesRouter)


//listener
app.listen(PORT,() => console.log (`Express is listening on port: ${PORT}`))