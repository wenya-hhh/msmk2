<template>
  <div class="tad-box">
    <div class="tad-sou">
      <van-icon name="arrow-left" size="0.48rem" @click="fan" />
      <input type="text" class="tad-i" placeholder="请输入内容" @input="chufa" v-model="value" />
      <span @click="fan" v-show="flog">取消</span>
      <span v-show="flog2" class="tad-ss" @click="sousuo">搜索</span>
    </div>

    <!-- 历史记录 -->
    <div class="tad-lishi" v-show="flog">
      <p class="tad-lishi1">
        <span>历史搜索</span>
        <van-icon name="delete" size="0.4rem" @click="ljdel" />
      </p>
      <div class="tad-jilu">
        <span v-for="(item,index) in str" :key="index" @click="lj(item)">{{item}}</span>
      </div>
    </div>

    <!-- 搜索内容 -->
    <div class="tad-nei" v-show="flog3">
      <!-- 加载更多 -->
      <!-- <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
      >-->
      <div
        class="tad-dan"
        v-for="(item,index) in list"
        :key="index"
        @click="danxiang(item.teachers_list[0].course_basis_id)"
      >
        <p class="tad-p1">{{item.title}}</p>
        <div class="tad-sj">
          <p>
            <van-icon name="aim" />
            {{item.end_play_date | timefnxq}}
            <van-icon name="down" />
          </p>
          <p>共{{item.course_type}}课时</p>
        </div>
        <div class="tad-tu">
          <div>
            <img :src="item.teachers_list[0].teacher_avatar" alt />
            <font>{{item.teachers_list[0].teacher_name}}</font>
          </div>
          <div v-if="item.has_buy!=0">
            <img src="../../public/img/5abe16aff492e007ed6de49a347364fb_03.jpg" alt class="i9" />
          </div>
        </div>
        <p class="tad-ren">
          <span>{{item.brows_num}}人已报名</span>

          <font v-if="item.price==0" class="mf">免费</font>
          <font v-if="item.price!=0" class="fk">
            <img src="../../public/img/a1f37d1be616ee3adf3baa7bb806bea3_03.jpg" alt />
            {{item.price/100+'.00'}}
          </font>
        </p>
      </div>

      <!-- </van-list> -->
      <!-- 加载更多 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      flog: true,
      flog2: false,
      flog3: false,
      list: [],
      arr: [],
      str:JSON.parse(window.sessionStorage.getItem("arr"))
    };
  },
  name: "demo",
  props: {},
  mounted() {},
  // 计算属性
  computed: {},
  watch: {
    // value监听
    value(newval, oldval) {
      if (this.value == "") {
        (this.flog = true), (this.flog2 = false), (this.flog3 = false);
      } else {
        this.flog = false;
        this.flog2 = true;
      }
    }
  },
  methods: {
    // 获取数据
    async sousuo() {
      let { data } = await this.$http.get(
        `courseBasis?limit=10&page=1&course_type=0&keywords=${this.value}`
      );
      console.log(data);
      this.list = data.data.list;
      this.flog3 = true;

      // 历史记录操作
      if (this.arr.includes(this.value) == false) {
        this.arr.unshift(this.value);
      }
      window.sessionStorage.setItem("arr", JSON.stringify(this.arr));
      this.str = JSON.parse(window.sessionStorage.getItem("arr")).slice(0, 5);
    },

    // 历史记录点击
    lj(name) {
      this.value = name;
    },
    // 历史记录删除
    ljdel() {
         window.sessionStorage.removeItem('arr')
         this.str = JSON.parse(window.sessionStorage.getItem("arr"))
    },
     // 详情页面跳转
    danxiang(i){
      this.$router.push({
        path:'/Course-detail',
        query:{id:i}
      })
    },
    //   路由返回
    fan() {
      this.$router.go(-1);
    },
    //   输入时发生
    chufa() {
      this.flog = false;
      this.flog2 = true;
    }
  }
};
</script> 

<style scoped lang="scss">
.tad-box {
  height: 100%;
}

// 搜索
.tad-sou {
  width: 100%;
  height: 0.95rem;
  border-bottom: 1px solid #eaeaea;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .tad-ss {
    color: #000;
  }
}
.tad-sou span {
  font-size: 0.28rem;
  color: #d2d2d1;
  float: right;
  margin-right: 0.2rem;
  margin-left: 0.2rem;
}
.tad-i {
  width: 4.9rem;
  height: 0.62rem;
  background-color: #e4e7ed;
  border: none;
  outline: none;
  border-radius: 0.8rem;
  padding-left: 0.56rem;
  font-size: 0.3rem;
  margin-left: 0.1rem;
}
.tad-lishi {
  width: 6.82rem;
  height: 1.04rem;
  margin: 0.24rem;
}
.tad-lishi1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin: 0;
}
.tad-lishi1 span {
  font-size: 0.3rem;
  color: #333;
  font-weight: 700;
}
.tad-jilu {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
}
.tad-jilu span {
  margin-left: 0.14rem;
  margin-right: 0.14rem;
  margin-top: 0.2rem;
  padding: 0.2rem 0.12rem;
  border-radius: 0.15rem;
  background: #f7f7f7;
  font-size: 0.25rem;
  color: #333;
}

// 搜索内容
.tad-nei {
  background-color: #f0f2f5;
  padding: 0.3rem;
  height: 100%;
}
.tad-dan {
  background: #fff;
  border-radius: 0.1rem;
  padding: 0 0.28rem;
  margin-bottom: 0.3rem;
  position: relative;
}
.tad-dan .tad-p1 {
  font-size: 0.3rem;
  color: #333;
  padding-top: 0.3rem;
  margin: 0;
}
.tad-sj {
  display: flex;
  align-items: center;
}
.tad-sj p {
  margin: 0;
  margin-top: 0.2rem;
  font-size: 0.25rem;
}
.tad-tu {
  width: 6.34rem;
  height: 1.3rem;
  display: flex;
  justify-content: space-between;
}
.tad-tu .i9 {
  width: 1.17rem;
  height: 0.96rem;
}
.tad-tu div {
  width: 3rem;
  display: flex;
  height: 100%;
  align-items: center;
  width: 1.54rem;
}
.tad-tu img {
  width: 0.54rem;
  height: 0.54rem;
  border-radius: 50%;
}
.tad-tu font {
  font-size: 0.24rem;
  color: rgba(0, 0, 0, 0.45);
  margin-left: 0.1rem;
}
.tad-ren {
  border-top: 1px solid #f5f5f5;
  height: 0.87rem;
  line-height: 0.87rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.25rem;
}
.tad-ren span {
  padding-right: 0.2rem;
  color: rgba(0, 0, 0, 0.45);
}
.tad-ren .mf {
  color: #44a426;
  font-size: 0.35rem;
}
.tad-ren .fk {
  color: #ee1f1f;
  font-size: 0.3rem;
}
</style>
