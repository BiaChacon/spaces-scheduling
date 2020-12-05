const fs = require('fs');
function saveLog(content) {
    var fullPath = `${new Date().toISOString().substr(0, 10)}.txt`;

    fs.writeFile(fullPath, content, function (err) {
        if (err) return console.log(err);
        console.log('saving content in file > example.txt');
    });
}

function teste() {
    // console.log("teste")
    // fs.writeFile('mynewfile3.txt', 'This is my text new', function (err) {
    //     if (err) throw err;
    //     console.log('Replaced!');
    // });
    var data = "New File Contents";

    fs.writeFile("temp.txt", data, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
    });
}

module.exports = { saveLog, teste }