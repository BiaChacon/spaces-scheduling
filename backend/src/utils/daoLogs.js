const fs = require('fs');

function saveLog(content) {
    let path = __dirname + '/src/files/temp.txt'
    // let path = fs.realpathSync('temp.txt', []);
    let when = new Date().toISOString().substr(0, 19);
    let finalContent = `\n${when} | ${content}`;

    //writing new line of log in temp.txt file
    fs.appendFile(path, finalContent, function (err) {
        if (err) throw err;
        console.log('new line added');
      });  
}
module.exports = { saveLog }