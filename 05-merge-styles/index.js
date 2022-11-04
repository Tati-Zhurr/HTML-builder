const fs = require('fs');
const path = require('path');
const pathStyles = path.join(__dirname, 'styles');
const pathBundle = path.join (__dirname, 'project-dist', 'bundle.css');
const output = fs.createWriteStream(pathBundle);





//read files in Styles
(async() =>{
    try {
        const files = await fs.promises.readdir(pathStyles, {withFileTypes: true});
        fs.promises.writeFile(pathBundle, '');
       for (const file of files){
          const fileExtent = path.extname(file.name).slice(1);
          if (file.isFile()&& (fileExtent === 'css')){
            const fileSourcePath = path.join(__dirname, 'styles', file.name);
            const input = fs.createReadStream(fileSourcePath);
            input.on('data', (chunk) => {
                fs.promises.appendFile(pathBundle, chunk);
            });
            input.on ('error', error => console.log('Error', error.message));
          }
        }

       // output.write(styleText.join(''));
        } catch (err) {
          console.error(err);
        }     
}) ()

function writeToBunddle(files){
    let styleText=[];
    for (const file of files){
        const fileExtent = path.extname(file.name).slice(1);
        if (file.isFile()&& (fileExtent === 'css')){
          const fileSourcePath = path.join(__dirname, 'styles', file.name);
          const input = fs.createReadStream(fileSourcePath);
          input.on('data', (chunk) => {
            console.log(styleText);
              styleText.push(chunk);
          });
          input.on ('error', error => console.log('Error', error.message));
        }
      }
      console.log(styleText);
      output.write(styleText.join(''));
}
/*console.log(styleText);
output.write(styleText);*/