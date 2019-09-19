<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroller",
  props: {
//通过props暴露，在其他组件中可以通过scoller组件的ref属性获取到方法
// 在其他页面调用该组件的标签上，通过绑定获取到props中的属性
    handlePullUp:{
      type: Function,
      default: function(){}
    },
    handlePullDown:{
      type: Function,
      default: function(){}
    }
  },
  mounted() {
    let scroll = new BScroll(this.$refs.wrapper, {
      scrollY: true,
      tap: true,
      probeType: 2,
      bounceTime: 700, //回弹时间
      pullUpLoad: {
        threshold: -100 // 当上拉距离超过50px时触发 pullingUp 事件
      }
    });

    this.scroll = scroll;
    scroll.on("pullingUp", function() {
      //上拉加载事件
      this.handlePullUp();
      scroll.finishPullUp(); //结束本次上拉后，这样才能触发下一次
      // 这里面的this，原本指向的是scroll，用bind改变指向，才能获取到props中的数据
    }.bind(this));
    // 这样写是为了把scroll组件中的上拉下拉方法暴露到全局
    scroll.on("touchEnd", function(pos) {
      //下拉刷新事件
      // console.log(this);
      this.handlePullDown(pos);
     }.bind(this));
  },
  methods: {
    toScrollY(y) {
      this.scroll.scrollTo(0, y);
    }
  }
};
</script>

<style>
.wrapper {
  height: 100%;
}
.pullDownMsg b {
  margin: 0 auto;
  color: rgb(120, 120, 120);
}
</style>
