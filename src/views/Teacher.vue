<template>
  <div class="cxy_box">
    <header>
      <p @click="$router.back()">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAYAAADd/14OAAAA/ElEQVQoU33RsUvWYRTF8c8hQmgIE4e2IFDQIfCPcHGIlBpqcWtPcFHBFgWdHGxykURxUtfWZkfHtkZBCBzcrjzxe+P9ha/P9sD33nPuOfHIq6pJnOBZRnFVNYdzvML+g2BVfcIBnuJLkm89sKqeYAcruMaHJD+b6j+wqiZwinlcYinJ74G1v2BVven8vMYRPie5G/afqnqPQ4xhNcneQwc28AYvsJ1kfVQKDVzAMZ5jE1tJ6v+BgcdpXGAGZ1hOctvzOPhUVdvYDnmLKywm+dW7eghuCl+xgT/4mORHL8dhmap6h++tY6wl2X2s69nO91SLbyTYFTHebX55D93jTsSH0JDDAAAAAElFTkSuQmCC"
          alt=""
        />
      </p>
      <p>讲师详情</p>
    </header>
    <div class="cxy_base">
      <div>
        <img :src="list.teacher.avatar" alt="" />
        <div class="tea_title">
          <p>{{ list.teacher.real_name }}</p>
        </div>
        <div>
          <van-button round type="info" @click="guanzhu" v-show="list.flag == 2"
            >关注</van-button
          >
          <span v-show="list.flag !=2" @click="guanzhu">已关注</span>
        </div>
      </div>
    </div>
    <div class="cxy_nav">
      <van-tabs
        v-model="activeName"
        title-active-color="#eb6100"
        @click="getMa"
      >
        <van-tab title="讲师介绍" name="a">
          <el-row>
            <el-col :span="7">教学年龄</el-col>
            <el-col :span="17">30年</el-col>
          </el-row>
          <el-row>
            <el-col :span="7">授课价格</el-col>
            <el-col :span="17">400学习币</el-col>
          </el-row>
          <el-row>
            <el-col :span="7">老师简介</el-col>
            <el-col :span="17"
              >杨老师,特级教师.多次被中国数学会评为全国高中数学竞联赛优秀教练员。长期从事名校理科班的数学教学和数学竞赛辅
              导工作。辅导学生参加全国高中数学联赛有数百人次获全国高中数学联赛一、二、三等奖，数十人被免试保送到清华大学、
              北京大学等名牌大学学习。十多人获CMO获一、二、三等奖，一人获IMO金牌。
              特别是近年来大学试行自主招生，有很多同学通过上他的竞赛辅导课进入清华大学、北京大学、上海交通大学等。</el-col
            >
          </el-row>
        </van-tab>
        <van-tab title="主讲课程" name="b">
          <el-card>
            <div
              @click="
                $router.push('/course-detail?id=' + item.id + '&courseType=5')
              "
              v-for="item in main"
              :key="item.id"
            >
              <p>{{ item.title }}</p>
              <span>共1课时</span>
              <div class="cxy_cen">
                <img :src="item.teachers_list[0].teacher_avatar" alt="" />
                <span>{{ item.teachers_list[0].teacher_name }}</span>
              </div>
              <div class="cxy_fot">
                <p>{{ item.sales_num }}人已报名</p>
                <span v-if="item.price == 0">免费</span>
              </div>
            </div>
          </el-card>
        </van-tab>
        <van-tab class="cxy_three" title="学员评价" name="c">
          <el-card v-if="read.length == 0">
            <img src="https://wap.365msmk.com/img/empty.0d284c2e.png" alt="" />
            <p>暂无评价</p>
          </el-card>
        </van-tab>
      </van-tabs>
    </div>
    <van-tabbar>
      <van-tabbar-item @click="$router.push(`/oto-plan?id=${$route.query.id}`)"
        >立即预约</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { Toast } from "vant";
import {
  gets,
  getTea,
  getTeaInfo,
  getMain,
  getComment,
  getCollects,
} from "../util/api";
export default {
  // 组件名称
  name: "demo",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      activeName: "a",
      list: {},
      teacher_id: this.$route.query.id,
      main: [],
      read: [],
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  async mounted() {
    // console.log(this.$route.query.id)
    this.getList();
  },
  // 组件方法
  methods: {
    async getList() {
      // 讲师详情
      let { data } = await getTea(this.teacher_id);
      this.list = data.data;
      console.log(this.list);
      let { data: res } = await getTeaInfo(this.teacher_id);
      // 讲师介绍
      let { data: datas } = await getTeaInfo({
        limit: 10,
        page: 1,
        teacher_id: this.teacher_id,
      });
      this.main = datas.data.attr;
    },
    // 关注
    async guanzhu() {
      let { data } = await getCollects(this.teacher_id);
      this.getList();
      if (data.data.flag == 1) {
        Toast.success("已取消");
      } else {
        Toast.success("已关注");
      }
    },
    // // 取消关注
    // async quguan(){
    //   // let {data} = await
    // },
    // 主讲课程
    async getMa() {
      let { data } = await getMain({
        limit: 10,
        page: 1,
        teacher_id: this.teacher_id,
      });
      this.main = data.data.list;
      console.log(this.main);
      // 学员评价
      let { data: res } = await getComment({
        limit: 10,
        page: 1,
        teacher_id: this.teacher_id,
      });
      // this.read = read.data.tag;
    },
  },
};
</script>  
<style scoped lang="scss">
.cxy_box {
  background: #f0f2f5;
}
header {
  background: linear-gradient(180deg, #63b7fe, #4e7de3);
  color: #fff;
  display: flex;
  height: 2rem;
  :nth-child(2) {
    width: 6.3rem;
    text-align: center;
    padding: 0;
  }
  img {
    height: 0.32rem;
    width: 0.18rem;
  }

  p {
    height: 0.88rem;
    line-height: 0.88rem;
    padding-left: 0.4rem;
    font-size: 0.4rem;
  }
}
.cxy_base {
  // padding: 0.2rem 0.4rem;
  height: 0.9rem;
  width: 7.5rem;
  display: flex;
  justify-content: center;
  position: relative;
  > div {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    height: 1.8rem;
    width: 7.1rem;
    border-radius: 0.15rem;
    position: absolute;
    top: -1.15rem;
    padding: 0 0.2rem;
    box-sizing: border-box;
    align-items: center;
    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
    }
    .van-button {
      padding: 0.08rem 0.35rem;
      color: #eb6100;
      background: #ebeefe;
      border: 0;
    }
    span {
      font-size: 4vw;
      color: #b7b7b7;
    }
  }
  .tea_title {
    width: 4.22rem;
    font-size: 0.3rem;
  }
}
.van-tabs {
  background-color: #fff;
}
.van-tab {
  height: 0.9rem;
  border-bottom: 0.01rem solid red;
  img {
    width: 3rem;
    height: 3rem;
  }
}
.cxy_box {
  background: #f0f2f5;
}
.el-card__body {
  > div {
    background: #fff;
    border-radius: 0.13333rem;
    padding: 0 0.37333rem;
    margin-bottom: 0.4rem;
    box-shadow: 0 0.4vw 0.93333vw 0 hsla(0, 0%, 81.2%, 0.35);
  }
}
.el-card {
  padding: 0 0.2rem;
  height: 100%;
  div {
    > p {
      font-size: 0.32rem;
    }
    > span {
      color: #666;
      font-size: 0.24rem;
    }
  }
  .cxy_cen {
    height: 1.3rem;
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 0.45);
    span {
      padding-left: 0.27rem;
    }
  }
  .cxy_fot {
    height: 0.8rem;
    display: flex;
    border-top: 1px solid #f5f5f5;
    justify-content: space-between;
    align-items: center;
    P {
      color: rgba(0, 0, 0, 0.45);
      font-size: 0.26rem;
    }
    span {
      font-size: 0.32rem;
      color: #44a426;
    }
    // border-bottom: 0.01rem solid red;
  }

  img {
    width: 0.54rem;
    height: 0.54rem;
    border-radius: 50%;
  }
}
.van-tabbar .van-tabbar-item {
  background-color: #eb6100;
  color: #fff;
  font-size: 0.4rem;
}
.cxy_three {
  text-align: center;
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 0;
  }
  p {
    font-size: 0.4rem;
    color: #8c8c8c;
    margin-top: 0.2rem;
  }
}
.el-row {
  padding: 0 0.4rem;
  height: 1rem;
  padding-top: 0.2rem;
  font-size: 0.26rem;
  color: #8c8c8c;
}
</style>

