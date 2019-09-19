var nodemailer = require('nodemailer');

module.exports = {
  mysql : {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'miaomovie'
  },

  Email : {
    config: {
      host: "smtp.qq.com", //邮箱种类，把中间的改成配置邮箱种类即可
      port: 587,
      auth: {
        user: '659909599@qq.com',  // 发送验证码的邮箱
        pass: 'wrlnskmjbvskbcba' // 秘钥，qq邮箱例，在设置中获取
        //这个必须在邮箱官方的设置里面获取，不然无法发送
      }
    },
    get transporter(){
      return nodemailer.createTransport(this.config)
    },
    //生成验证码
    get verify(){
      return Math.random().toString().substring(2,6);
      //这里将随机数转成字符串，取字符串2--6位，共4位做验证码
    }
  }
}