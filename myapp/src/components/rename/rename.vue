<template>
   <div class="rename_body">
    <div>
      <input class="rename_text" type="text" placeHolder="请输入您的新昵称">
    </div>
    <div class='emailBox'>
      <input class="rename_text" type="text" placeHolder="请输入您的邮箱">
      <input type="button" value="发送" class="emailBtn">
    </div>
    <div>
      <input class="rename_text" type="text" placeHolder="请输入验证码">
    </div>
    <div class="rename_btn">
      <input type="submit" value="修改">
      <input type="button" value="取消">
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#content .rename_body{  width:100%;}
.rename_body .rename_text { width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.rename_body .rename_btn{ height:50px; margin:10px;display: flex;}
.rename_body .rename_btn input{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;margin: 0 10px;}
.rename_body .rename_link{ display: flex; justify-content:space-between;}
.rename_body .rename_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
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
