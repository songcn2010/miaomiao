<template>
  <div class="movie_body">
    <Loader v-if="isload" />
    <Scroller v-else :handlePullDown=handlePullDown>
      <ul>
        <li v-if="isPullDown" class="pullDownMsg">
          <b>{{ isPullDown }}</b>
        </li>
        <li v-for="item in comingList" :key="item.id">
          <div class="pic_show"><img :src="item.img | SetWH('128.180')"></div>
          <div class="info_list">
            <h2>{{ item.nm }}</h2>
            <div v-if="item.version.indexOf('v3d')>=0"><img src="@/assets/maxs.png"></div>
            <p>
              <span class="person">{{ item.wish }}</span> 人想看</p>
            <p>主演: {{ item.star }}</p>
            <p>{{ item.rt }}上映</p>
          </div>
          <div class="btn_pre">
            预售
          </div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comingList: [],
      preCityId: -1,
      isload: true,
      isPullDown: ""
    };
  },
  mounted() {
    this.getComingList();
  },
  methods: {
    async getComingList() {
      var id = this.$store.state.City.id;
      if (this.preCityId === id) {
        return;
      }
      this.isload = true;
      this.axios.get(`/api/movieComingList?cityId=${id}`).then(res => {
        // console.log(res);
        if (res.data.msg == "ok") {
          this.comingList = res.data.data.comingList;
          this.preCityId = id;
          this.isload = false;
        }
      });
    },

    handlePullDown(pos) {
      if (pos.y > 100) {
        this.isPullDown = "正在更新";
        var that = this;
        setTimeout(() => {
          that.getComingList();
          that.isPullDown = "更新完成";
          setTimeout(() => {
            that.isPullDown = "";
          }, 1000);
        }, 1000);
      }
    }
  }
};
</script>

<style>
#content .movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
</style>
