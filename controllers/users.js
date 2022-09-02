const userRouter = require('express').Router()
const User = require('../models/user')
require('dotenv').config()
const {API_KEY} = process.env
//npm package to call http requests to the steam API
const request = require('request')

// const gamesRoutesController = require('../controllers/games')
// const listRouterController = require('../controllers/lists')

// /:64id/games/:gameID
// /:64id/lists/:List_ID

// {
//     name:
//     games: []
// }



//DELETE TODO

//UPDATE

//CREATE
userRouter.post ('/', async(req,res) => {
    console.dir(req.body)
    User.exists({steamID64: req.body.steamID64}, async function (err,result){
        if (err) {
            res.send(err)
        } else{
            if (result){
                console.dir(`user with ID ${req.body.steamID64} already exists`)
                res.redirect(302, `/api/users/${req.body.steamID64}`)
               
            }else{
                try {
                    console.log(`user with ID ${req.body.steamID64} DOES NOT exist`)
                    await User.create({steamID64: req.body.steamID64})
                    res.status(201).
                    redirect(302, `/api/users/${req.body.steamID64}`)
                } catch (error) {
                    //send error
                    res.status(400).json({message: 'bad request'});
                }
            }

            }
        }
    )
})
//I NEED TO POST THE USER ID TO THE BACKEND. FROM HERE I CAN GET MY KEY AND MAKE A REQUEST TO THE API. THE API WILL RESPOND AND SEND THE JSON FILE FOR THE FRONT TO USE. THIS IS THE WAY

//SHOW TODO
userRouter.get ('/:ID64', async (req,res) =>{
    const userID = req.params.ID64
    // const responseGames = {}
    // const responseProfile = {}
    // `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${userID}`

    const responseGames = new Promise ((resolve, reject) =>(request(
        `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${API_KEY}&steamid=${userID}&include_appinfo=true&format=json`,
        (error, response, body) => {
            if(error){
                res.send ('Something went wrong connecting')
            }
            else{
                resolve( JSON.parse(body).response)
            }
        }
        )))

        const responseProfile = new Promise ((resolve, reject) =>(request(
            `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${userID}`,
            (error, response, body) => {
                if(error){
                    res.send ('Something went wrong connecting')
                }
                else{
                  
                    resolve(JSON.parse(body).response)
                }
            }
            )))

        Promise.all([responseGames,responseProfile]).then((results) => {
          
            const concatResponse = Object.assign(...results)
            
            res.status(201).json(concatResponse)

        })

            
})

module.exports = userRouter