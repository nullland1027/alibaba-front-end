console.log(__filename)
console.log(process.version)
/**
 * node 内置模块
 */
//文件扩展名
const path = require('path');
console.log('文件扩展名' + path.extname(__filename));

// -----------------
const fs = require('fs');
fs.readFile(__filename, 'utf-8', function (err, content) {
    if (err) {
        console.error(err);
        return;
    } 
    console.log("\n文件内容: \n" + content)
})

console.log('\x1b[33m%s\x1b[0m', '你好')

