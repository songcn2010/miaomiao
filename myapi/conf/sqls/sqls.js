var users = {
  //注册用户的sql语句
  register : 'INSERT INTO users(username, password, email) VALUES(?,?,?)',
  //登录用户的sql语句
  login : 'select * from users where username=?',
  //修改密码的sql语句
  findpass : 'update users set password=? where username=?'
}


module.exports = users;
