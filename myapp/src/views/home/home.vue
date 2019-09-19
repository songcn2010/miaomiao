<template>
  <div id="main">
    <Header title="喵喵电影" />
    <div id="content">
      <div class="movie_menu">
        <router-link tag='div' to='/home/cities' class="city_name">
          <span>{{ this.$store.state.City.nm }}</span>
          <i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <div class="hot_swtich">
          <router-link tag='div' to='/home/nowplaying' class="hot_item">正在热映</router-link>
          <router-link tag='div' to='/home/coming' class="hot_item">即将上映</router-link>
        </div>
        <router-link tag='div' to='/home/search' class="search_entry">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </div>
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <Footer />
    <keep-alive>
      <router-view name="detail" />
    </keep-alive>
  </div>
</template>

<script>
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

import { messageBox } from "@/components/JS/msgBox";

export default {
  name: "home",
  components: {
    Header,
    Footer
  },
  mounted() {
    setTimeout(() => {
      this.nowCity();
    }, 3000);
  },
  methods: {
    nowCity() {
      this.axios.get("/api/getLocation").then(res => {
        // console.log(res);
        if (res.data.msg == "ok") {
          // console.log(this);
          if (this.$store.state.City.id == res.data.data.id) {
            return;
          }
          messageBox({
            title: "定位",
            content: res.data.data.nm,
            cancel: "取消",
            ok: "切换",
            handleOk() {
              // console.log("切换成功");
              window.localStorage.setItem("nowNm", res.data.data.nm);
              window.localStorage.setItem("nowId", res.data.data.id);
              window.location.reload(); //切换成功以后要刷新页面
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
#content .movie_menu {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  z-index: 10;
}
.movie_menu .city_name {
  margin-left: 20px;
  height: 100%;
  line-height: 45px;
}
.movie_menu .city_name.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .city_name.router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .hot_swtich {
  display: flex;
  height: 100%;
  line-height: 45px;
}
.movie_menu .hot_item {
  font-size: 15px;
  color: #666;
  width: 80px;
  text-align: center;
  margin: 0 12px;
  font-weight: 700;
}
.movie_menu .hot_item.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .hot_item.router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry {
  margin-right: 20px;
  height: 100%;
  line-height: 45px;
}
.movie_menu .search_entry.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry i {
  font-size: 24px;
  color: #000;
}
.movie_menu .search_entry.router-link-active i {
  color: red;
}
</style>
