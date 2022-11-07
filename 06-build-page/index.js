const fs = require('fs');
const path = require('path');

//create folder project-dist
const pathFolder = path.join(__dirname, 'project-dist');
(async ()=> {
    fs.mkdir(pathFolder, { recursive: true }, err =>{
        if (err) {
            throw err;
        }

    }
)})();

//copy template.html
const pathToTemplate = path.join(__dirname, 'template.html');
const pathToIndex = path.join(__dirname, 'project-dist', 'index.html');


//read folder components
const pathToComponents = path.join(__dirname, 'components');
(async() =>{
  try {
    const files = await fs.promises.readdir(pathToComponents, {withFileTypes: true});
    //reading template.html
    fs.readFile(pathToTemplate,
               'utf-8',
                (err, data) =>{
                if (err) throw err;
                let dataChange = data.toString();
                for (const file of files){
                  if (file.isFile()){
                    const fileName = path.parse(file.name).name;
                    const fileExtent = path.extname(file.name).slice(1);
                    const filePath = path.join(__dirname, 'components', file.name);
                    if (fileExtent === 'html'){
                      //reading component file
                     fs.readFile(filePath,
                                'utf-8',
                                (err, data) =>{
                                if (err) throw err;
                                dataChange = dataChange.replace(`{{${fileName}}}`, data);
                                //write to index.html
                                fs.writeFile(pathToIndex,
                                            '', 
                                            (err)=> {
                                            if (err) throw err;
                                            });
                                fs.writeFile(pathToIndex,
                                            dataChange, 
                                            (err)=> {
                                              if (err) throw err;
                                            });
                                })
                    }
                  }
                }
                }
             )
  } catch (err) {
    console.error(err);
  }
}) ();

//read styles and write them to style.css
const pathToStyles = path.join(__dirname, 'styles');
const pathToBundleStyles = path.join(__dirname, 'project-dist', 'style.css');
(async() =>{
  try {
      const files = await fs.promises.readdir(pathToStyles, {withFileTypes: true});
      fs.promises.writeFile(pathToBundleStyles, '');
      for (const file of files){
        const fileExtent = path.extname(file.name).slice(1);
        if (file.isFile()&& (fileExtent === 'css')){
          const fileSourcePath = path.join(__dirname, 'styles', file.name);
          const input = fs.createReadStream(fileSourcePath);
          input.on('data', (chunk) => {
                   fs.promises.appendFile(pathToBundleStyles, chunk);
          });
          input.on ('error', error => console.log('Error', error.message));
        }
      }
      } catch (err) {
        console.error(err);
      }     
}) ()

//create folder assets
const pathFolderAssets = path.join(__dirname, 'project-dist', 'assets');
createFolder(pathFolderAssets);

//create folder function
async function createFolder(pathToFolder){
  fs.mkdir(pathToFolder, { recursive: true }, err =>{
    if (err) {
        throw err;
    }
  }
)}


//read folder Assets and copy it to project-dist
const pathToAssets = path.join(__dirname, 'assets');
const pathToCopyAssets = path.join(__dirname, 'project-dist', 'assets');
(async() =>{
  try {
      getReadedFolder(pathToAssets, pathToCopyAssets)
      console.log('The project is compiled');
  } catch (err) {
    console.error(err);
  }
}) ();

async function getCopiedFile(filePath, fileCopyPath){
  fs.copyFile(filePath, fileCopyPath, (err)=>{
    if (err) {
      throw err;
    }
  });
}

async function getReadedFolder(pathOriginal, pathToCopy){
  const folder = await fs.promises.readdir(pathOriginal, {withFileTypes: true});
  for (const component of folder){
    const componentPath = path.join(pathOriginal, component.name);
    const componentCopyPath = path.join(pathToCopy, component.name);
    if (component.isFile()){
      getCopiedFile(componentPath, componentCopyPath);
    } else {
      createFolder(componentCopyPath);
      getReadedFolder(componentPath, componentCopyPath);
    }
}
}







