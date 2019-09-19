<template>
  <div class="cinema_body">
    <Loader v-if="islaod"/>
    <ul v-else>
      <li v-for="item in cinemaList" :key="item.id">
        <div>
          <span>{{ item.nm }}</span>
          <span class="q">
            <span class="price">{{ item.sellPrice }}</span> 元起</span>
        </div>
        <div class="address">
          <span>{{ item.addr }}</span>
          <span>{{ item.distance }}</span>
        </div>
        <div class="card">
          <div v-for="(value,key) in item.tag" :key="key" v-if="value === 1" :class="key | setCardCol">{{ key | setCardNm }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      islaod: true,
      cinemaList: []
    };
  },
  activated() {
    this.getCinemaList();
  },
  methods: {
    getCinemaList() {
      var id = this.$store.state.City.id;
      this.islaod = true;
      this.axios.get(`/api/cinemaList?cityId=${id}`).then(res => {
        // console.log(res);
        if (res.data.msg === "ok") {
          this.cinemaList = res.data.data.cinemas;
          this.islaod = false;
        }
      });
    }
  },

  filters: {
    //局部过滤器，处理tag
    setCardCol(key) {
      var card = [
        { key: "allowRefund", value: "bl" },
        { key: "endorse", value: "bl" },
        { key: "sell", value: "or" },
        { key: "snack", value: "or" },
        { key: "buyout", value: "or" },
        { key: "deal", value: "or" }
      ];

      for(var i = 0; i < card.length; i++){
        if(card[i].key === key){
          return card[i].value;
        }
      };
      //如果输入的key不正确
      return '';
    },

    setCardNm(key) {
      var card = [
        { key: "allowRefund", value: "退票" },
        { key: "endorse", value: "改签" },
        { key: "sell", value: "折扣卡" },
        { key: "snack", value: "小吃" },
        { key: "buyout", value: "购物" },
        { key: "deal", value: "预约" }
      ];
      for(var i = 0; i < card.length; i++){
        if(card[i].key === key){
          return card[i].value;
        }
      };
      //如果输入的key不正确
      return '';
    }
  }
};
</script>

<style scpoed>
#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>
