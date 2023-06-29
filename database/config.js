const mongoose = require('mongoose');
const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN);

        //const Cat = mongoose.model('Cat', { name: String });

        //const kitty = new Cat({ name: 'Zildjian' });
        //kitty.save().then(() => console.log('meow'));
        
        console.log('init db config & online');
    } catch (e) {
        console.log(e);
        throw new Error('Error en al DB');
    }
}

module.exports = {
    dbConnection
}