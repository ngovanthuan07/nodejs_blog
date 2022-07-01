const mongoose = require('mongoose');
// https://stackoverflow.com/questions/43394019/how-to-connect-to-mongodb-atlas-using-mongoose
async function connect() {
    try {
        await mongoose.connect('mongodb+srv://vanthuandev07:msCKr1PIUqGD2eAv@cluster0.tgscf3k.mongodb.net/blog?retryWrites=true&w=majority');
        console.log('Connect successfully!!!')
    } catch (error) {
        console.log('Connect failure!!!')
    }
}

module.exports = {connect};