<template>
   <div class="repass_body">
    <div>
      <input class="repass_text" type="text" placeHolder="请输入您原来的密码">
    </div>
    <div>
      <input class="repass_text" type="text" placeHolder="请输入您的新密码">
    </div>
    <div class='emailBox'>
      <input class="repass_text" type="text" placeHolder="请输入您的邮箱">
      <input type="button" value="发送" class="emailBtn">
    </div>
    <div>
      <input class="repass_text" type="text" placeHolder="请输入验证码">
    </div>
    <div class="repass_btn">
      <input type="submit" value="修改" @touchend="repass">
      <input type="button" value="取消">
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    repass(){
      this.axios.post(`/myapi/users/repass`,{
        oldpassword: 'songchao',
        newpassword: 'songchao'
      }).then(res=>{
        console.log(res)
      })
    }
  }
};
</script>

<style scoped>
#content .repass_body{  width:100%;}
.repass_body .repass_text { width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.repass_body .repass_btn{ height:50px; margin:10px;display: flex;}
.repass_body .repass_btn input{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;margin: 0 10px;}
.repass_body .repass_link{ display: flex; justify-content:space-between;}
.repass_body .repass_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
.emailBtn {
  width: 50px;
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
