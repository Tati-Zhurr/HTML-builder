const fs = require('fs');
const path = require('path');
const pathText = path.join(__dirname, 'text.txt');
const {stdin, stdout} = require('process');


fs.writeFile(pathText,
  '',
 (err) =>{
   if (err) throw err;
   console.log('Write your text below');
 }
);

process.on('SIGINT', () => {
  console.log('Thank you. Have a nice day.');
  process.exit();
});

stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit'){
    stdout.write('Thanks, have a nice day!');
    process.exit();
  } else{
    fs.appendFile(pathText, 
                  `${data}`,
                (err) =>{
                    if (err) throw err;
                  }
                  )
  }
});



