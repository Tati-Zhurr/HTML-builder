const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');

(async() =>{
    try {
  const files = await fs.promises.readdir(folderPath, {withFileTypes: true});
  for (const file of files){
    let dataOfFile =[];
    if (file.isFile()){
        const fileName = path.parse(file.name).name;
        const fileExtent = path.extname(file.name).slice(1);
        dataOfFile.push(fileName);
        dataOfFile.push(fileExtent);
        const filePath = path.join(__dirname, 'secret-folder', file.name);
        fs.stat(filePath, (err, stats) => {
            if (err) throw err;
            const sizeKB =stats.size;
            const fileSize = `${parseInt(stats.size/1024*1000)/1000}kB`;
            dataOfFile.push(fileSize);
            const dataOfFileString = dataOfFile.join('-');
            console.log(dataOfFileString);
          });
    }

  }
} catch (err) {
  console.error(err);
}
}) ();