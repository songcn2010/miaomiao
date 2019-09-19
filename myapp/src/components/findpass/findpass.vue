<template>
  <div class="find_body">
    <div>
      <input class="find_text" type="text" placeHolder="账户名/手机号/Email" v-model="username">
    </div>
    <div class='emailBox'>
      <input class="find_text" type="text" placeHolder="请输入您的邮箱" v-model="emailAddr">
      <button  class="emailBtn" @touchend="sendEmail" :disabled="disabled">{{ sendEmailMsg }}</button>
    </div>
    <div>
      <input class="find_text" type="number" placeHolder="请输入您的验证码" v-model="verify">
    </div>
    <div>
      <input class="find_text" type="password" placeHolder="请输入您的新密码" v-model="password">
    </div>
    <div class="find_btn">
      <input type="submit" value="重置密码" @touchend="findpass">
    </div>
    <div class="find_link">
      <a href="#" @touchend="handleTologin">立即登录</a>
      <a href="#" @touchend="handleToregister">重新注册</a>
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
      emailAddr: '',
      verify: '',
      sendEmailMsg: '发送',
      disabled: false
    }
  },
  methods: {
    handleTologin(){
      this.$router.push('/mine/login')
    },

    handleToregister(){
      this.$router.push('/mine/register')
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
        console.log(res)
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

    //重设密码
    findpass(){
      var that = this;
      if(!this.username || !this.password){
        messageBox({
          title: "提示",
          content: "请为您的账户重新设置一个密码",
          ok: "确认"
        })
      };

      this.axios.post(`/myapi/users/findpass`,{
        username: this.username,
        email: this.emailAddr,
        password: this.password,
        verify: this.verify
      }).then(res => {
        // console.log(res)
        if(res.data.meta.status === 200){
          messageBox({
            title: "提示",
            content: res.data.meta.msg,
            ok: "确认",
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
#content .find_body{  width:100%;}
.find_body .find_text { width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.find_body .find_btn{ height:50px; margin:10px;}
.find_body .find_btn input{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
.find_body .find_link{ display: flex; justify-content:space-between;}
.find_body .find_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
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
