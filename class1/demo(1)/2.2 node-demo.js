/**
 * node 内置模块
 */
const path = require('path');

//获取文件拓展名
console.log('文件扩展名: ' + path.extname(__filename));

//  --------------------

const fs = require('fs');
fs.readFile(__filename, 'utf8', function (err, content) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('\n文件内容: \n' + content);
});
