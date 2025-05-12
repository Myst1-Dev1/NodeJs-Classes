const fs = require('fs');
const path = require('path');

const dataFolder = path.join(__dirname, 'data');

if(!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
    console.log('data folder created');
}

const filePath = path.join(dataFolder, 'example.txt');
// sync way of creating the file

fs.writeFileSync(filePath, 'Hello from nodejs');
console.log('file created successfully');

const readContentFromFile = fs.readFileSync(filePath, 'utf8');
console.log('File content:', readContentFromFile);

fs.appendFileSync(filePath, '\nThis is a new line added to this file');
console.log('new file content added');

// async way of creating the file

const asyncFilePath = path.join(dataFolder, 'async-example.txt');

fs.writeFile(asyncFilePath, 'Hello async nodejs', (err) => {
    if(err) throw err;
    console.log('Async file created sucessfully');

    fs.readFile(asyncFilePath, 'utf8', (err, data) => {
        if(err) throw err;
        console.log('Async file content:', data);

        fs.appendFile(asyncFilePath, '\nThis is another line added', (err) => {
            if(err) throw err;
            console.log('New line added to async file');

            fs.readFile(asyncFilePath, 'utf8', (err, updatedData) => {
                if(err) throw err;
                console.log('Updated file content', updatedData);
            })
        })
    })
});