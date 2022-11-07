const fs = require('fs');
const path = require('path');
const pathFolderCopy = path.join(__dirname, 'files-copy');


//delete folder
/*(async ()=> {
    fs.rm(pathFolderCopy, { recursive: true, force: true }, err =>{
        if (err) {
            throw err;
        }
    })
    
})();*/

//create folder
(async ()=> {
    fs.mkdir(pathFolderCopy, { recursive: true }, err =>{
        if (err) {
            throw err;
        }
    }
)})();

//delete files in files-copy
(async() =>{
    try {
        const filesCopiedBefore = await fs.promises.readdir(pathFolderCopy, {withFileTypes: true});
        if (filesCopiedBefore.length){
            for (const file of filesCopiedBefore){
                if (file.isFile()){
                  const fileCopyPath = path.join(__dirname, 'files-copy', file.name);
                  fs.unlink(fileCopyPath, (err)=>{
                                                if (err) {
                                                  throw err;
                                                }
                                                });
                }
            }
        }
       
        } catch (err) {
          console.error(err);
          }
}) ();




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
          console.log('All files from folder "files" were copied to the folder "files-copy"');
        } catch (err) {
          console.error(err);
          }
}) ();


