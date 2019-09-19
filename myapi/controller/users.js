var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var svgCaptcha = require('svg-captcha');


var config = require('../conf/config');
var $sqls = require('../conf/sqls/sqls');

var jwt = require('jsonwebtoken');

var pool = mysql.createPool(config.mysql);

module.exports = {
  //注册
  register: function (req, res, next) {
    var param = req.body;
     //对验证码进行校验
     var verify = req.session.verify;
     if (verify != param.verify || !verify) {
       res.send({
         meta: {
           msg: "验证码错误",
           status: 404
         }
       })
       return;
     }

     //这里自己做的比较粗糙，实际情况应该还要先获取所有用户，判断用户名是否重复

    pool.getConnection(function (err, connection) {
      var sql = $sqls.register;
      connection.query(sql, [param.username, param.password, param.email], function (err, data) {
        if (err) {
          res.send({
            meta: {
              msg: "注册失败",
              status: 404
            },
            err
          });
        } else {
          res.send({
            meta: {
              msg: "注册成功",
              status: 200
            },
            data
          });
        }
        // 释放连接 
        connection.release();
      });
    });
  },

  //登录
  login: function (req, res, next) {
    var param = req.body;
    //对图形验证码进行校验
    var verifyImg = req.session.verifyImgText;
    if (verifyImg != param.verifyImg || !verifyImg) {
      res.send({
        meta: {
          msg: "验证码错误",
          status: 404
        }
      })
      return;
    }

    pool.getConnection(function (err, connection) {
      var sql = $sqls.login;

      //生成token
      var token = jwt.sign({
        username: param.username
      }, 'secret', {
        expiresIn: '24h' //过期时间
      })

      req.session.token = token;
      req.session.username = param.username;

      connection.query(sql, [param.username], function (err, data) {
        if (err) {
          res.send({
            meta: {
              msg: "登录失败",
              status: 404
            },
            err
          });
        } else {
          if (data.length === 0) {
            res.send({
              meta: {
                msg: "用户名不存在",
                status: 404
              }
            });
          } else if (data[0].password == param.password) {
            data[0].token = token;
            //登录成功，将token添加到数据中一起返回
            delete data[0].password; //移出返回数据中的密码
            res.send({
              meta: {
                msg: "登录成功",
                status: 200
              },
              data
            })
          } else {
            res.send({
              meta: {
                msg: "密码错误",
                status: 404
              }
            })
          }
        }
        // 释放连接 
        connection.release();
      });
    });
  },

  //nodemailer邮箱验证码
  emailverify: function (req, res, next) {
    var email = req.query.email || req.params.email;
    var verify = config.Email.verify;

    req.session.email = email;
    req.session.verify = verify;
    //保存session后，经测试，能在其他api中获取到

    var mailOptions = {
      from: '"songcn2010" <659909599@qq.com>',
      // 发件人,这里要么直接填发件人邮箱地址，要么就要这种格式
      to: email, // 收件人
      subject: "songcn2010邮箱验证码", // 邮件标题
      text: "验证码：" + verify, // 邮件内容
    }
    config.Email.transporter.sendMail(mailOptions, (err) => {
      if (err) {
        res.send({
          err,
          msg: "验证码发送失败",
          status: 404
        })
      } else {
        res.send({
          msg: "验证码发送成功",
          status: 200,
          code: verify
          //然后就能在参数的邮箱email中收到验证码邮件
        })
      }
    });
  },

  //退出
  logout: function (req, res, next) {
    req.session.username = '';
    req.session.token = '';
    res.send({
      meta: {
        msg: "退出成功",
        status: 200
      }
    })
  },

  //修改密码
  findpass: function (req, res, next) {
     var param = req.body;
     //对验证码进行校验
     var verify = req.session.verify;
     if (verify != param.verify || !verify) {
       res.send({
         meta: {
           msg: "验证码错误",
           status: 404
         }
       })
       return;
     }

    pool.getConnection(function (err, connection) {
      //首先要获取到当前登录的用户
      var username = param.username;
      //先调用login的查询用户语句，判断用户信息是否正确
      var getsql = $sqls.login;
      var findpassSql = $sqls.findpass;
      connection.query(getsql, [username], function (err, data) {
        if (err) {
          res.send({
            meta: {
              msg: "用户信息错误",
              status: 404
            }
          })
        } else if (data[0].email == param.email) {
          connection.query(findpassSql, [param.password, username], function (error, result) {
            res.send({
              meta: {
                msg: "修改成功",
                status: 200
              }
            })
          })
        } else {
          res.send({
            meta: {
              msg: "和注册邮箱不符",
              status: 404
            },
            data
          })
        }
        // 释放连接 
        connection.release();
      });
    });
  },

  //图片验证
  verifyImg: function (req, res, next) {
    var captcha = svgCaptcha.create({
      size: 4, // 验证码长度
      ignoreChars: '0o1ilI', // 验证码字符中排除 0o1i
      noise: 2, // 干扰线条的数量
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      background: '#cc9966', // 验证码图片背景颜色
      height: 44
    });
    //将文本验证码保存到session，方便做验证
    req.session.verifyImgText = captcha.text;
    //返回图片地址，类型为svg图片
    res.type('svg')
    res.send(captcha.data);
  },

  //获取用户信息
  getuser: function (req, res, next) {
    if(!req.session.username){
      res.send({
        meta: {
          msg: "未登录",
          status: 400
        }
      });
      return;
    }
    pool.getConnection(function (err, connection) {
      var sql = $sqls.login;

      var username = req.session.username;

      connection.query(sql, [username], function (err, data) {
        if (err) {
          res.send({
            meta: {
              msg: "获取失败",
              status: 404
            },
            err
          });
        } else {
            data[0].token = req.session.token;
            //登录成功，将token添加到数据中一起返回
            delete data[0].password; //移出返回数据中的密码
            res.send({
              meta: {
                msg: "获取成功",
                status: 200
              },
              data
            })        
        }
        // 释放连接 
        connection.release();
      });
    });
  }



};