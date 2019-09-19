<template>
  <div class="search_body">
    <div class="search_input">
      <div class="search_input_wrapper">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" v-model="searchMsg">
      </div>
    </div>
    <Scroller>
      <div class="search_result">
        <h3>电影/电视剧/综艺</h3>
        <ul>
          <li v-if='nomoreMsg' class="nomoreMsg">
            <b>{{ nomoreMsg }}</b>
          </li>
          <li v-else v-for="(item,index) in searchList" :key="index">
            <div class="img"><img :src="item.img | SetWH('128.180')"></div>
            <div class="info">
              <p class='title'>{{ item.nm }}</p>
              <span class="grade">{{ item.sc }}</span>
              <p>{{ item.enm }}</p>
              <p>主演: {{ item.star }}</p>
              <p>{{ item.rt }}</p>
            </div>
          </li>
        </ul>
      </div>
    </Scroller>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchMsg: "",
      nomoreMsg: '',
      searchList: []
    };
  },
  methods: {
    cancelRequest() {
      if (typeof this.source === "function") {
        this.source("终止请求!");
      }
    },
    getSearchList() {
      this.cancelRequest();
      // 3. 注意 this 指向
      let that = this;
      var searchMsg = this.searchMsg.trim();
      var id = this.$store.state.City.id;
      if (searchMsg === "") {
        return;
      }
      this.axios
        .get(`/api/searchList?cityId=${id}&kw=${searchMsg}`, {
          cancelToken: new this.axios.CancelToken(function executor(c) {
            that.source = c;
          })
        })
        .then(res => {
          if (res.data.msg && res.data.data.movies) {
            var movies = res.data.data.movies.list;
            // console.log(res);
            this.searchList = movies;
            this.nomoreMsg = "";
          }else{
            this.nomoreMsg = "没有搜索到数据哦";
          }
        })
        .catch(err => {
          if (err) {
            if (this.axios.isCancel(err)) {
              // 终止多次请求 请求取消 返回取消后的信息
              console.log("请求取消", err.message);
            } else {
              // 服务端数据异常
              console.log("没有搜索到数据哦");
              this.searchList = [];
            }
          }
        });
    }
  },
  watch: {
    //用watch监控数据变化的时候，如果伴随请求，一定要注意axios防止多次请求
    searchMsg() {
      this.getSearchList();
    }
  }
};
</script>

<style scoped>
#content .search_body {
  flex: 1;
  overflow: auto;
}
.search_body .search_input {
  padding: 8px 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
}
.search_body .search_input_wrapper {
  padding: 0 10px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  line-height: 20px;
}
.search_body .search_input_wrapper i {
  font-size: 16px;
  padding: 4px 0;
}
.search_body .search_input_wrapper input {
  border: none;
  font-size: 13px;
  color: #333;
  padding: 4px 0;
  outline: none;
  margin-left: 5px;
  width: 100%;
}

.search_body .search_result h3 {
  font-size: 15px;
  color: #999;
  padding: 9px 15px;
  border-bottom: 1px solid #e6e6e6;
}

.search_body .search_result li {
  border-bottom: 1px #c9c9c9 dashed;
  padding: 10px 15px;
  box-sizing: border-box;
  display: flex;
}
.search_body .search_result .img {
  width: 60px;
  float: left;
}
.search_body .search_result .img img {
  width: 100%;
}
.search_body .search_result .info {
  float: left;
  margin-left: 15px;
  flex: 1;
}
.search_body .search_result .info {
  position: relative;
}
.search_body .search_result .info img {
  position: absolute;
  width: 50px;
  right: 10px;
  top: 5px;
}
.search_body .search_result .info .title {
  font-size: 18px;
  font-weight: bold;
}
.search_body .search_result .info p {
  height: 22px;
  display: flex;
  line-height: 20px;
  font-size: 12px;
}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1) {
  font-size: 18px;
  flex: 1;
}
.search_body .search_result .info span {
  font-size: 16px;
  color: #fc7103;
  position: absolute;
  right: 10px;
}
.nomoreMsg b {
  margin: 0 auto;
  color: rgb(120, 120, 120);
}
</style>
