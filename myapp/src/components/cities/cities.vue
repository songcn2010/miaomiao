<template>
  <div class="city_body">
    <div class="city_list">
      <Loader v-if="isload" />
      <Scroller v-else ref="city_list">
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li v-for="item in hotcity" :key="item.id" @touchend="handleTocity(item.nm,item.id)">{{ item.nm }}</li>
            </ul>
          </div>
          <div class="city_sort" ref="city_sort">
            <div v-for="item in cityList" :key="item.index">
              <h2>{{ item.index }}</h2>
              <ul>
                <li v-for="item in item.cityByPy" :key="item.id" @touchend="handleTocity(item.nm,item.id)">{{ item.nm }}</li>
              </ul>
            </div>
          </div>
        </div>
      </Scroller>
    </div>
    <div class="city_index">
      <ul>
        <li v-for="(item,index) in cityList" :Key="index" @touchend="handleToPos(index)">{{ item.index }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotcity: [],
      cityList: [],
      isload: true
    };
  },
  mounted() {
    this.getCityList();
  },
  methods: {
    async getCityList() {
      var result = await this.axios.get(`/api/cityList`);
      // console.log(result);
      if (result.data.msg == "ok") {
        var hcity = result.data.data.cities.filter(item => {
          return item.isHot === 1;
        });
        window.localStorage.setItem("hotcity", JSON.stringify(hcity));
        window.localStorage.setItem(
          "cityList",
          JSON.stringify(result.data.data.cities)
        );
        this.hotcity = JSON.parse(window.localStorage.getItem("hotcity"));
        this.sortCity();
        this.isload = false;
      }
    },
    sortCity() {
      // 给所有城市按照拼音首字母排序
      var allCity = JSON.parse(window.localStorage.getItem("cityList"));
      var sortCityList = [];
      for (var i = 0; i < allCity.length; i++) {
        var firstLetter = allCity[i].py.substring(0, 1).toUpperCase();
        if (toCom(firstLetter)) {
          sortCityList.push({ index: firstLetter, cityByPy: [allCity[i]] });
        } else {
          for (var j = 0; j < sortCityList.length; j++) {
            if (sortCityList[j].index === firstLetter) {
              sortCityList[j].cityByPy.push(allCity[i]);
            }
          }
        }
      }
      //得到了分号首字母的数组，然后重新排序即可
      sortCityList.sort((a, b) => {
        if (a.index > b.index) {
          return 1;
        } else if (a.index < b.index) {
          return -1;
        } else {
          return 0;
        }
      });

      // console.log(sortCityList);
      window.localStorage.setItem("sortCityList", JSON.stringify(sortCityList));
      this.cityList = JSON.parse(window.localStorage.getItem("sortCityList"));

      function toCom(firstLetter) {
        //判断首字母项是否存在，存在返回false，其他所有情况返回true，true放那里是因为有可能数组为空
        for (var j = 0; j < sortCityList.length; j++) {
          if (sortCityList[j].index === firstLetter) {
            return false;
          }
        }
        return true;
      }
    },

    handleToPos(index) {
      // console.log(this.$refs.city_sort.children[index].getElementsByTagName('h2')[0].offsetTop)
      var posy = this.$refs.city_sort.children[index].getElementsByTagName('h2')[0].offsetTop;
      this.$refs.city_list.toScrollY(-posy);    
    },

    handleTocity(nm,id){
      // console.log(nm,id)
      window.localStorage.setItem("nowNm",nm);
      window.localStorage.setItem("nowId",id);
      this.$store.commit('City/SAVE_STATE',{ nm,id });
      this.$router.push('/home/nowplaying');
    }
  }
};
</script>

<style scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>
