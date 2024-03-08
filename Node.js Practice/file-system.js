var fs = require('fs');

fs.appendFile('ranju.txt', 'I am ranju Thakur from india',(err)=>{
  if(err)throw err;
  console.log(`Content Successfuly Saved `)
});
//___---_----___----_-----___----__-----__----
//what does this file mean?  2. why we use the .open if we can  directly write in appendFile() ? 
fs.open('openfile.txt', 'a', (err,file) => {
  if (err) throw err;
  console.log('The file has been opened',file);
});

// fs.writeFile('writeFile.txt', 'THis is content for WriteFIle.', (err)=>{
//   if(err) throw err;
//   console.log("Data written to file");
// })

// fs.appendFile('ranju.txt', 'This is my updated text', (err)=> {
//   if (err) throw err;
//   console.log('Updated!');
// });

// fs.writeFile('ranju.txt', 'This is my replaced text', (err)=> {
//   if (err) throw err;
//   console.log('Replaced!');
// });

// fs.unlink('deleteFile.txt', function (err) {
//   if (err) throw err;
//   console.log('File deleted!');
// });


// fs.rename('renameFile.txt', 'myrenamedfile.txt', function (err) {
//   if (err) throw err;
//   console.log('File Renamed!');
// });