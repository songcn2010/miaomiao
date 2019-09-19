<template>
   <div class="register_body">
    <div>
      <input class="register_text" type="text" placeHolder="账户名/手机号/Email" v-model="username">
    </div>
    <div>
      <input class="register_text" type="password" placeHolder="请输入您的密码" v-model="password">
    </div>
    <div class='emailBox'>
      <input class="register_text" type="text" placeHolder="请输入您的邮箱" v-model="emailAddr">
      <button  class="emailBtn" @touchend="sendEmail" :disabled="disabled">{{ sendEmailMsg }}</button>
    </div>
    <div>
      <input class="register_text" type="text" placeHolder="请输入验证码" v-model="verify">
    </div>
    <div class="register_btn">
      <input type="submit" value="注册" @touchend="handleRegister">
    </div>
    <div class="register_link">
      <a href="#" @touchend="handleToLogin">立即登录</a>
      <a href="#" @touchend="handleToFindpass">忘记密码</a>
    </div>
  </div>
</template>

<script>
import {messageBox} from '@/components/JS/msgBox';

export default {
  data () {
    return {
      username: '',
      password: '',
      emailAddr: '' ,
      verify: '',
      sendEmailMsg: "发送" ,
      disabled: false
    }
  },
  methods: {
    handleToLogin(){
      this.$router.push('/mine/login')
    },

    handleToFindpass(){
      this.$router.push('/mine/findpass')
    },

    //发送邮件验证码
    sendEmail(){
      if(this.disabled === true || this.emailAddr == ''){
        return;
      }
      var that = this;
      this.sendEmailMsg = '发送中...';
      this.disabled = true;
      this.axios.get(`/myapi/users/emailverify?email=${this.emailAddr}`)
      .then(res => {
        // console.log(res)
        if(res.data.status === 200){
          var count = 60;
          var timer = setInterval(() => {
            count--;
            this.disabled = true;
            this.sendEmailMsg = '剩余' + count + '秒';
            if(count == 0){
              this.sendEmailMsg = '再次发送';
              this.disabled = false;
              clearInterval(timer)
            }
          },1000)

        }
      })
    },


    //注册
    handleRegister(){
      if(this.username === '' || this.password === ''){
        messageBox({
          title: "提示",
          content: "用户名和密码不能为空",
          ok: "确定"
        });
        return;
      }
      var that = this;
      this.axios.post(`/myapi/users/register`,{
        username: this.username,
        password: this.password,
        email: this.emailAddr,
        verify: this.verify
      }).then(res =>{
        // console.log(res);
        if(res.data.meta.status === 404){
          messageBox({
            title: "提示",
            content: res.data.meta.msg,
            ok: "重新输入"
          })
        }else{
          messageBox({
            title: "提示",
            content: res.data.meta.msg,
            ok: "确定",
            handleOk(){
              that.$router.push('/mine/login')
            }
          })
        }
      })
    }
  }
};
</script>

<style scoped>
#content .register_body{  width:100%;}
.register_body .register_text { width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.register_body .register_btn{ height:50px; margin:10px;}
.register_body .register_btn input{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
.register_body .register_link{ display: flex; justify-content:space-between;}
.register_body .register_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
.emailBtn {
  width: 70px;
  height: 30px;
  border-radius: 15px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.emailBox {
  position: relative;
}
</style>
