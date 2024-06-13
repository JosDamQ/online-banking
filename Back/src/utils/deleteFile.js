const fs = require('fs');
const path = require('path');

const deleteFile = (filePath) => {
    fs.unlink(path.join(__dirname, '..', '..', filePath), (err) => {
        if (err) {
            console.log(err);
        }
    })
}

module.exports = deleteFile;