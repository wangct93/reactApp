

const {fork} = require('child_process');
const path = require('path');


start();


function start(){
  const filePath = process.argv[2];
  if(!filePath){
    return;
  }
  fork(path.resolve(process.cwd(),filePath),{
    detached:true
  });
  process.exit();
}

