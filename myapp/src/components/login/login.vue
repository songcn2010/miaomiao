<template>
  <div class="login_body">
    <div>
      <input class="login_text" type="text" placeHolder="账户名/手机号/Email" v-model="loginInfo.username">
    </div>
    <div>
      <input class="login_text" type="password" placeHolder="请输入您的密码" v-model="loginInfo.password">
    </div>
    <div class="verify_box">
      <input class="login_text" type="text" placeHolder="请输入验证码" v-model="loginInfo.verifyImg">
      <img src="/myapi/users/verifyImg" class="veirify" @touchend="refreshVeriyfyImg">
    </div>
    <div class="login_btn">
      <input type="submit" value="登录" @touchend="handleLogin">
    </div>
    <div class="login_link">
      <a href="#" @touchend="handleToRegister">立即注册</a>
      <a href="#" @touchend="handleToFindpass">忘记密码</a>
    </div>
  </div>
</template>

<script>
import {messageBox} from '@/components/JS/msgBox';
export default {
  data () {
    return {
      loginInfo: {
        username: '',
        password: '',
        verifyImg: ''
      }
    }
  },

  methods: {
    //刷新图片验证码
    refreshVeriyfyImg(a){
      a.target.src = "/myapi/users/verifyImg?" + Math.random();
    },

    //登录功能
    handleLogin(){
      //前端做非空判断
      if(this.loginInfo.username&&this.loginInfo.password){
        var that = this;
        //发送请求
        this.axios.post(`/myapi/users/login`,this.loginInfo)
        .then(res => {
          // console.log(res)
          if(res.data.meta.status === 404){
            messageBox({
              title: "提示",
              content: res.data.meta.msg,
              ok: '重新输入'
            })
          }else{
            window.localStorage.setItem('token',res.data.data[0].token); 
            window.localStorage.setItem('username',res.data.data[0].username); 
            messageBox({
              title: "提示",
              content: res.data.meta.msg,
              ok: '进入个人中心',
              handleOk(){
                //跳转到个人中心
                that.$router.push('/mine/center');
              }
            })
          }
        })
      }else{
        messageBox({
          title: "提示",
          content: "请输入用户名和密码",
          ok: "重新输入"
        })
      }
    },

    handleToRegister(){
      this.$router.push('/mine/register');
    },

    handleToFindpass(){
      this.$router.push('/mine/findpass');
    }
  }
};
</script>

<style scoped>
#content .login_body{  width:100%;}
.login_body .login_text { width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.login_body .login_btn{ height:50px; margin:10px;}
.login_body .login_btn input{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
.login_body .login_link{ display: flex; justify-content:space-between;}
.login_body .login_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
.verify_box {
  position: relative;
}
.veirify {
  height: 45px;
  position: absolute;
  right: 10px;
  top: -5px;
}
</style>
