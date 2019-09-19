<template>
  <div class="center_body">
    <ul>
      <li>
        <div class="detail">
          <img class="headpic" src="@/assets/headlog.png">
          <div class="mydesc">
            <p>用户名：{{ username }}</p>
            <p>身　份：管理员</p>
          </div>
        </div>
      </li>
      <li class="center_btn">
        <input type="button" value="修改密码">
      </li>
      <li class="center_btn">
        <input type="button" value="退出登录" @touchend="handleLogout">
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import {messageBox} from '@/components/JS/msgBox';
export default {
  data () {
    return {
      username:''
    }
  },

  mounted () {
    this.username = window.localStorage.getItem('username');
  },

  activated () {
    var token = window.localStorage.getItem('token');
    if(!token){
      this.$router.push('/mine/login')    
    }
    this.username = window.localStorage.getItem('username');
  },


  beforeRouteEnter(to, from, next){  
    axios.get('/myapi/users/getuser')
    .then(res => {
      // console.log(res);
      if(res.data.meta.status === 200){
        next()
      }else{
        next('/mine/login')
      }
    })
  },

  
  methods: {
    handleLogout(){
      var that = this;
      messageBox({
        title: "提示",
        content: "您确定要退出？",
        cancel: "取消",
        ok: "确定",
        handleOk(){
          that.axios.get('/myapi/users/logout')
          .then(res => {
            that.$router.push('/mine/login');
          })
        }
      })
    }
  }
};
</script>

<style scoped>
#content .center_body {
  padding: 10px;
  clear: both;
}
.center_body li {
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 10px;
  padding-top: 10px;
}
.center_body .center_btn {
  height: 50px;
  margin: 10px;
}
.center_body .center_btn input {
  width: 100%;
  height: 100%;
  background: #e54847;
  border-radius: 5px;
  border: none;
  display: block;
  color: white;
  font-size: 20px;
}
.center_body .detail .headpic {
  float: left;
  width: 100px;
  padding-left: 10px;
}
.center_body .detail .mydesc {
  overflow: hidden;
  padding-top: 10px;
  padding-left: 30px;
  font-size: 18px;
  line-height: 45px;
}
</style>
