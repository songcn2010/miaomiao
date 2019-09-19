var path = require('path');
var fs = require('fs');

//读取data.json的数据,这里path的路径根据json文件设置
fs.readFile(path.join(__dirname,"./","users.json"),'utf8',function (err,data){

  if (err) {return;}
  var arr = [];
  //获取到的是一个json字符串,转换
  var usersList = JSON.parse(data);
  //得到一个usersList 是一个元素为对象的数组,遍历数组获取每一个对象的数据

  var clearSql = `truncate table users;`;  //这句是作为数据初始化的，重置id并清空数据   

  usersList.forEach(function (v, i) {
    // INSERT into users (title,url,text) values ('你好','http://aba','dafafdfdsfsd');
    //truncate table 表名;  可以重置对应表格的主键id并清空数据
    //将每个数据对象转换成insert语句     ${数据}  这是模板语法   这里的sql语句要用反引号
    var sql = `INSERT into users (username, password, email) values ('${v.username}','${v.password}','${v.email}');`;
    // 为了一次性把所有sql语句一起执行，先把每个都存进一个数组

    arr.push(sql);
  });
  
    arr.unshift( clearSql );
  //遍历结束后，获取到一个存有sql语句的数组
  //因为之后要把数组的数据写入一个新的users.sql文件中，所以先转换橙字符串

    var str = arr.join(''); //因为每个语句中已经有分号，所以直接空字符串转换

    fs.writeFile(path.join(__dirname, "users.sql"), str, "utf8", function (err) {
    console.log("数据初始化成功");
    //数据初始化成功以后，只需要通过navcat引入就行了
  })
})