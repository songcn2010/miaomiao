<template>
  <div id="detailBox" class="rightInShow">
    <Header title="影片详情" id="header">
      <i class="iconfont icon-right" @touchend="detailBackPre"></i>
    </Header>
    <Loader v-if="isload" />
    <Scroller  v-else>
      <div id="content" class="contentDetail">
        <div class="detail_list">
          <!-- <div class="detail_list_bg" :style="'backgroundImage:url('+ detailDesc.img | SetWH('128.180')+')'"></div> -->
          <div class="detail_list_bg">
            <img :src="detailDesc.img | SetWH('128.180')" alt="">
          </div>
          <div class="detail_list_filter"></div>
          <div class="detail_list_content">
            <div class="detail_list_img">
              <img :src="detailDesc.img | SetWH('128.180')" alt="">
            </div>
            <div class="detail_list_info">
              <h2>{{ detailDesc.nm }}</h2>
              <p>{{ detailDesc.enm }}</p>
              <p>{{ detailDesc.sc }}</p>
              <p>{{ detailDesc.cat }}</p>
              <p>{{ detailDesc.src }} / {{ detailDesc.episodeDur }}分钟</p>
              <p>{{ detailDesc.pubDesc }}</p>
            </div>
          </div>
        </div>
        <div class="detail_intro">
          <p>{{ detailDesc.dra }}</p>
        </div>
        <div class="detail_player swiper-container" ref="detail_player">
          <ul class="swiper-wrapper">
            <li class="swiper-slide" v-for="(item,index) in detailDesc.photos" :key="index">
              <div>
                <img :src="item | SetWH('140.127')" alt="">
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Scroller>
  </div>
</template>

<script>
import Header from "@/components/header/header";
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css'

export default {
  name: "detail",
  components: {
    Header
  },
  data(){
    return {
      isload: true,
      detailDesc: {}
    }
  },
  props: ['movieId'],
  activated () {
    this.isload = true;
    this.axios.get(`/api/detailmovie?movieId=${this.movieId}`)
    .then(res => {
      // console.log(res)
      if(res.data.msg === 'ok'){
        this.isload = false;
        this.detailDesc = res.data.data.detailMovie;
        this.$nextTick(()=>{
                    new Swiper(this.$refs.detail_player , {
                        slidesPerView : 'auto',
                        freeMode : true,
                        freeModeSticky: true
                    });
                });
      }
    })
  },
  methods: {
    detailBackPre(){
      this.$router.back();
    }
  }
};
</script>

<style scoped>
#detailBox {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100%;
  background-color: #fff;
  z-index: 1000;
}
#header {
  width: 100%;
  height: 50px;
  color: #fff;
  background: #e54847;
  border-bottom: 1px solid #e54847;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}
#header h1 {
  font-size: 18px;
  text-align: center;
  line-height: 50px;
  font-weight: normal;
}
#header i {
  position: absolute;
  left: 5px;
  top: 50%;
  margin-top: -13px;
  font-size: 26px;
}

#content.contentDetail{ display: block; margin-bottom:0;margin-top: 50px;}
#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
.detail_list .detail_list_bg{ width:100%; height:100%; background: 0 20%; filter: blur(2px); background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_bg img {
  width: 100%;
  position: relative;
  top: -50%;
}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}

#content .detail_intro{ padding: 10px;}
#content .detail_player{ margin:20px;}
.detail_player .swiper-slide{ width:40%; margin-right: 20px; text-align: center; font-size: 14px;}
.detail_player .swiper-slide img{ width:100%; margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}

.rightInShow {
  animation: rightIn .3s linear;
}

@keyframes rightIn{
  from{
    transform: translateX(100%);
  }
  to{
     transform: translateX(0);
  }
}

</style>
