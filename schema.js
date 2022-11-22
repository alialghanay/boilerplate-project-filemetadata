const mongoose = require('mongoose');
const { Schema } = require('mongoose');

let fileScheam = new Schema({
    name: {type: String, required: true},
    type: String,
    size: Number
})

let File = mongoose.model("file", fileScheam);

function createNewFile(name, type, size, done){
    let newFile = new File({
        name: name,
        type: type,
        size: size
    });
    newFile.save((err, data) => {
        if(err) {
            console.error(err);
        }else {
            done(null, data);
            return data;
        }
    })
}

exports.createNewFile = createNewFile;