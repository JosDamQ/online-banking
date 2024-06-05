const mongoose = require('mongoose');

exports.connect = async (req, res, next) => {
    try{
        const uriMongo = `${process.env.URI_MONGO}`;
        mongoose.set('strictQuery', false);
        await mongoose.connect(uriMongo);
        console.log('MongoDB connected');
    }catch(err) {
        console.log(err);
        next(err);
    }
}