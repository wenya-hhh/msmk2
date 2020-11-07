<template>
  <div class="xiangqing">
    <!-- 粘性布局 -->
    <van-sticky>
      <!-- 头部 -->
      <div class="tad-sou" v-show="fll">
        <van-icon name="arrow-left" @click="fan" size="0.4rem" />
        <span>课程详情</span>
        <van-icon name="cluster-o" size="0.4rem" @click="show = true" />
      </div>

      <div class="tad-sou" v-show="flog">
        <van-icon name="arrow-left" @click="fan" size="0.4rem" />

        <a
          class="san"
          @click="jie"
          :style="top <= 366 ? 'fontSize:.32rem;color:#333' : ''"
          >课程介绍</a
        >
        <span
          class="san"
          @click="da"
          :style="top >= 366 && top < 668 ? 'fontSize:.32rem;color:#333' : ''"
          >课程大纲</span
        >
        <span
          class="san"
          @click="ping"
          :style="top >= 668 ? 'fontSize:.32rem;color:#333' : ''"
          >课程评价</span
        >
        <van-icon name="cluster-o" size="0.4rem" @click="show = true" />
      </div>
    </van-sticky>

    <div class="tad-box">
      <!-- 内容 -->
      <div class="tad-dan">
        <van-icon
          name="star-o"
          size="0.4rem"
          @click="xing"
          v-show="list1.is_collect == 0"
        />
        <van-icon
          name="star"
          size="0.4rem"
          color="#EB6100"
          @click="fanxing"
          v-show="list1.is_collect == 1"
        />
        <div>
          <p class="tad-p1">{{ list1.title }}</p>
          <p class="tad-p2">
            <font v-if="list1.price == 0">免费</font>
            <font v-if="list1.price != 0" class="fk">
              <img
                src="../../public/img/a1f37d1be616ee3adf3baa7bb806bea3_03.jpg"
                alt=""
              />
              {{ list1.price / 100 + ".00" }}</font
            >
          </p>
          <p class="tad-p3">
            共{{ list1.course_type }}课时|{{ list1.browse_num }}人已报名
          </p>
          <p class="tad-p3" v-if="$route.query.courseType != 5">
            开课时间：{{ list1.end_play_date | timetow }} -
            {{ list1.enter_end_date | timetow }}
          </p>
        </div>
      </div>

      <!-- 教学团队 -->
      <div class="tad-tu">
        <p>教学团队</p>
        <ul>
          <li
            v-for="item in list"
            :key="item.teacher_id"
            @click="
              token
                ? $router.push(`/teacher?id=${item.teacher_id}`)
                : $router.push('/login')
            "
          >
            <img :src="item.avatar" alt />
            <font>{{ item.teacher_name }}</font>
          </li>
        </ul>
      </div>

      <!-- 课程介绍 -->
      <div class="tad-tu1" id="box1" ref="jie">
        <p>课程介绍</p>
        <div v-html="list1.course_details"></div>
      </div>

      <!-- 课程大纲 -->
      <div class="tad-tu2" ref="da">
        <p>课程大纲</p>
        <div v-if="$route.query.courseType != 5">
          <div
            class="k00"
            v-for="item in dagang"
            :key="item.id"
            @click="video(item.video_id)"
          >
            <div class="k0">
              <div class="k1"></div>
              <div class="k2">回放</div>
              <span>{{ item.periods_title }}</span>
            </div>
            <p class="k3">
              {{ item.teachers[0].teacher_name }}
              <span>{{ item.start_play }}{{ item.end_play }}</span>
            </p>
          </div>
        </div>
        <div v-if="$route.query.courseType == 5">
          <div
            class="k000"
            v-for="item in dagang"
            :key="item.id"
            @click="video(item.video_id)"
          >
            <span>{{ item.periods_title }}</span>
          </div>
        </div>
      </div>
      <!-- 课程评论 -->

      <div class="tad-tu2 tu3" ref="ping">
        <p>课程评论</p>
        <ul v-for="(item, index) in list3" :key="index">
          <li>
            <div>
              <img :src="item.avatar" alt />
              <div>
                <div>
                  <span>{{ item.nickname }}</span>
                  <div class="rate">
                    <van-rate
                      v-model="item.grade"
                      readonly
                      size=".28rem"
                      color="rgb(234, 122, 47)"
                      void-color=""
                    />
                  </div>
                  <span>{{ Number(item.created_at) | timetesev }}</span>
                </div>
                <!-- <p>风格的</p> -->
                <div>
                  <font>{{ item.content }}</font>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="tad-bt" v-show="list1.is_buy == 0" @click="baoming()">
      立即报名
    </div>
    <div class="tad-bt" v-show="list1.is_buy == 1" @click="xuexi()">
      立即学习
    </div>

    <!-- 分享 -->

    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click="show = false">
        <div class="block">
          <p>分享</p>
          <div id="qrCode" ref="qrCodeDiv"></div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import {
  gets,
  posts,
  getCollect,
  getColl,
  getOrder,
  getCourseChapter,
  getVideo,
} from "../util/api";
export default {
  data() {
    return {
      token: localStorage.getItem("token") || "",
      indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      //  页面滚动
      top: 0,
      flog: false,
      fll: true,
      foo: true,
      id: this.$route.query.id,
      // 基本数据
      list: {},
      list1: {},
      list3: [],
      show: false,
      dagang: [],
    };
  },
  name: "demo",
  props: {},
  mounted() {
    // 二维码
    this.bindQRCode();

    // this.fun();
    this.fun1();
    this.fun2();
    window.addEventListener("scroll", this.scrollHandle); // 绑定页面的滚动事
  },
  // 计算属性
  computed: {},
  watch: {},
  methods: {
    async video(id) {
      if (this.token) {
        if (this.list1.is_buy == 0) {
          Toast("请先报名");
        } else {
          let { data } = await getVideo({ id: this.id, video_id: id });
          console.log(data);
          if (data.data.length == 0) {
            Toast("暂未生成回放");
          } else {
            window.location.href = `https://wap.365msmk.com/video?video_id=${id}&id=${this.id}`;
          }
        }
      } else {
        this.$router.push("/login");
      }
    },
    // 立即报名
    async baoming() {
      if (!this.token) {
        this.$router.push("/login");
      }
      let { data } = await getOrder({ shop_id: this.id, type: 5 });
      console.log(data);
      Toast('报名成功')
      this.fun1();
    },
    // 二维码
    bindQRCode() {
      new this.$qrCode(this.$refs.qrCodeDiv, {
        text: `https://wap.365msmk.com/course-detail?id=${this.id}&courseType=5`,
        width: 200,
        height: 200,
        colorDark: "#333333", //二维码颜色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: this.$qrCode.CorrectLevel.L, //容错率，L/M/H
      });
    },
    // 获取数据
    // async fun() {
    //   let { data } = await gets(`courseInfo/basis_id=${this.$route.query.id}`);
    //   console.log(this.list);
    // },
    // 课程
    async fun1() {
      let { data } = await gets(`courseInfo/basis_id=${this.$route.query.id}`);
      this.list = data.data.teachers;
      console.log(this.list);
      this.list1 = data.data.info;
      // console.log(this.list1);
    },
    // 评论/大纲
    async fun2() {
      let { data } = await posts("courseComment", {
        page: 1,
        limit: 10,
        id: this.id,
      });
      this.list3 = data.data.list;
      // console.log(this.list3);
      let { data: res } = await getCourseChapter({ id: this.id });
      this.dagang = res.data;
      console.log(this.dagang);
    },

    // 收藏
    async xing() {
      this.foo = false;
      let { data: res } = await getCollect({
        course_basis_id: this.id,
        type: 1,
      });
      Toast.success("已收藏");
      this.fun1();
    },
    // 取消收藏
    async fanxing() {
      this.foo = true;
      let { data: res } = await getColl(this.list1.collect_id);
      Toast.success("已取消");
      this.fun1();
    },

    // 返回路由
    fan() {
      this.$router.go(-1);
    },

    scrollHandle: function (e) {
      this.top = e.srcElement.scrollingElement.scrollTop; // 获取页面滚动高度
      if (this.top > 0) {
        this.flog = true;
        this.fll = false;
      } else {
        this.flog = false;
        this.fll = true;
      }
    },

    jie() {
      document.body.scrollTop = document.documentElement.scrollTop =
        this.$refs.jie.offsetTop - 60;
    },
    da() {
      console.log(this.$refs.da.offsetTop - 60);
      document.body.scrollTop = document.documentElement.scrollTop =
        this.$refs.da.offsetTop - 60;
    },
    ping() {
      console.log(this.$refs.ping.offsetTop - 60);
      document.body.scrollTop = document.documentElement.scrollTop =
        this.$refs.ping.offsetTop - 60;
    },

    // 学习页面跳转
    xuexi() {
      this.$router.push("/study-detail?id=" + this.id);
    },
  },
};
</script>

<style scoped lang="scss">
.k000 {
  position: relative;
  padding-left: 8vw;
  line-height: 8vw;
  font-size: 3.2vw;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #595959;
}
.k000 :after {
  content: "";
  position: absolute;
  left: 4.53333vw;
  top: 50%;
  transform: translateY(-50%);
  width: 1.06667vw;
  height: 1.06667vw;
  border-radius: 50%;
  background: #eb6100;
}
.cxy_box {
  transition: all 0.5s;
}
.xiangqing {
  position: relative;
}
.tad-bt {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 7.5rem;
  height: 0.78rem;
  background-color: #eb6100;
  line-height: 0.78rem;
  text-align: center;
  color: #fff;
  font-size: 0.3rem;
}
.tad-sou {
  width: 100%;
  height: 0.95rem;
  border-bottom: 1px solid #eaeaea;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tad-sou .van-icon {
  font-size: 0.28rem;
  color: #595959;
  margin-right: 0.2rem;
  margin-left: 0.2rem;
}
.tad-sou span {
  font-size: 0.37rem;
  color: #595959;
  width: 6rem;
  padding-left: 2.2rem;
}
.tad-sou .san {
  font-size: 0.3rem;
  color: #595959;
  width: 2rem;
  padding-left: 0.3rem;
  color: #8c8c8c;
}

.tad-box {
  background-color: #f0f2f5;
}

.tad-dan {
  background: #fff;
  border-radius: 0.1rem;
  padding: 0 0.28rem;
  margin-bottom: 0.3rem;
  position: relative;
  div {
    padding: 4vw 0;
  }
}
.tad-dan .van-icon {
  position: absolute;
  top: 0.3rem;
  right: 0.4rem;
}
.tad-dan .tad-p1 {
  color: #333;
  margin: 0;
  font-size: 4.26667vw;
  font-family: PingFangSC-Medium;
  font-weight: 400;
  color: #333;
  padding-right: 10.66667vw;
  line-height: 6.13333vw;
}
.tad-p2 {
  color: #eb6100;
  font-size: 0.35rem;
  margin: 0;
  height: 0.6rem;
  line-height: 0.6rem;
}
.tad-p2 .fk {
  color: #ee1f1f;
  font-size: 0.3rem;
}
.tad-p3 {
  color: #8c8c8c;
  font-size: 0.3rem;
  margin: 0;
  height: 0.6rem;
  line-height: 0.6rem;
}

.tad-tu {
  height: 2.3rem;
  background-color: #fff;
  padding: 0.1rem 0.2rem;
}
.tad-tu p {
  width: 7.1rem;
  height: 0.5rem;
  margin: 0;
  margin-top: 0.2rem;
  font-size: 0.3rem;
}
.tad-tu1 {
  width: 7.1rem;
  height: 1.1rem;
  background-color: #fff;
  padding: 0.1rem 0.2rem;
  margin-top: 0.3rem;
}
.tad-tu1 p {
  width: 7.1rem;
  height: 0.5rem;
  margin: 0;
  margin-top: 0.2rem;
  font-size: 0.3rem;
}
.tad-tu ul {
  width: 7.1rem;
  height: 2.2rem;
  padding: 0.15rem 0;
  display: flex;
  flex-wrap: wrap;
}
.tad-tu li {
  width: 20%;
  height: 1.8rem;
  padding: 0.15rem 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  text-align: center;
}
.tad-tu img {
  width: 0.78rem;
  height: 0.78rem;
  border-radius: 50%;
}
.tad-tu font {
  display: inline-block;
  width: 100%;
  font-size: 0.24rem;
  color: rgba(0, 0, 0, 0.45);
  padding: 0.06rem 0.16rem;
  color: #595959;
}
.tu3 {
  margin-bottom: 0.8rem;
}
.tad-tu2 {
  margin-top: 0.3rem;
  background: #fff;
  padding: 0.3rem 0.2rem;
  ul {
    width: 7.07rem;
    li {
      width: 6.67rem;
      height: 0.86rem;
      padding: 0.2rem;
      > div {
        display: flex;
        justify-content: start;
        img {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
        }
        > div {
          margin-left: 0.2rem;
          width: 6.17rem;
          height: 0.86rem;
          display: flex;
          flex-wrap: wrap;
          // flex-direction: row-reverse;
          justify-content: start;
          > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 6.17rem;
            height: 0.3rem;
            .rate {
              width: 2.5rem;
              height: 4vw;
            }
            font {
              padding-top: 1.33333vw;
              line-height: 6.4vw;
              color: #999;
              font-size: 3.2vw;
              font-family: PingFangSC-Regular;
              font-weight: 400;
            }
          }
        }
      }
    }
  }
  .k00 {
    width: 6.5rem;
    padding: 0.3rem;
    padding-bottom: 0.2rem;
  }
  .k0 {
    width: 6.5rem;
    height: 0.6rem;
    display: flex;
    justify-content: flex-start;
  }
  .k1 {
    width: 0.15rem;
    height: 0.15rem;
    border-radius: 50%;
    background-color: #eb6100;
    margin-top: 0.17rem;
    margin-right: 0.2rem;
  }
  .k2 {
    width: 0.6rem;
    height: 0.5rem;
    background-color: #eb6100;
    color: #eaeaea;
    padding: 0 0.1rem;
    border-radius: 0.05rem;
    font-size: 0.3rem;
    margin-right: 0.2rem;
  }
  span {
    font-size: 3.2vw;
    color: #595959;
  }
  .k3 {
    width: 5.97rem;
    margin: 0;
    margin-left: 0.5rem;
    margin-bottom: 0.1rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #8c8c8c;
    span {
      padding-left: 2.66667vw;
    }
  }
}
.tad-tu2 p {
  width: 7.1rem;
  height: 0.5rem;
  margin: 0;
  font-size: 0.3rem;
}
//  <!-- 课程评论 -->

// 分享
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 70%;
  height: 40%;
  border-radius: 2.66667vw;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    line-height: 1rem;
    font-size: 0.19rem;
  }
  div {
    margin-bottom: 0.2rem;
    img {
      width: 100%;
    }
  }
}
</style>
