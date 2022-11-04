const fs = require('fs');
const path = require('path');
const pathFolder = path.join(__dirname, 'files-copy');


//create folder
(async ()=> {
    fs.mkdir(pathFolder, { recursive: true }, err =>{
        if (err) {
            throw err;
        }
    }
)})();

//read folder and copy files
const folderPath = path.join(__dirname, 'files');
(async() =>{
    try {
        const files = await fs.promises.readdir(folderPath, {withFileTypes: true});
        for (const file of files){
        if (file.isFile()){
        const filePath = path.join(__dirname, 'files', file.name);
        const fileCopyPath = path.join(__dirname, 'files-copy', file.name);
        fs.copyFile(filePath, fileCopyPath, (err)=>{
            if (err) {
                throw err;
            }
        });
    }

  }
} catch (err) {
  console.error(err);
}
}) ();


