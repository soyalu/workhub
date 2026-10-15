import fs from 'node:fs';
const paths = [['home-map.webp',150000],['traveler.webp',30000],['sidebar-night.webp',20000]];
let failed=0;
for(const [name,min] of paths){
 const path='frontend/public/art/'+name;
 if(!fs.existsSync(path)||fs.statSync(path).size<min){console.error('Missing art',path);failed++;}
 else console.log('OK',path);
}
if(failed)process.exitCode=1;
