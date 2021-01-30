const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        mongoose.Promise = global.Promise;
        await mongoose.connect(process.env.MONGO_URI, {
            useMongoClient: true
        })
        console.log(`MongoDB Connected: ${process.env.MONGO_URI}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB