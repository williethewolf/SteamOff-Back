const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    steamID64: String,
    // userName: String,
    // avatar: String,
    // gamesBlacklist: Array,
    //TODO
    //lists : Array,
})

module.exports = mongoose.model('User', userSchema)
//http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=X&steamid=76561197960434622&format=json