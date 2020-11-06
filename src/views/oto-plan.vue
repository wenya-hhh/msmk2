<template>
  <div class="zb_box">
    <header>
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <h3>预约课程</h3>
    </header>
    <div class="zb_otItem">
      <van-image round width=".8rem" height=".8rem" :src="list.avatar" />
      <div>
        <p>
          <span>{{ list.teacher_name }}</span>
        </p>
        <p class="sex">
          {{ list.sex == 0 ? "男" : "女" }} {{ list.teach_age }}年教龄
        </p>
      </div>
      <div class="yuyue" @click="$router.push(`/teacher?id=${list.id}`)">
        查看详情
      </div>
    </div>
    <div class="zb_optitle">
      <span></span>
      <p>选择时间 <span> (北京时间)</span></p>
    </div>

    <div class="zb_empty">
      <img src="https://wap.365msmk.com/img/empty.0d284c2e.png" alt="" />
      <p>暂无信息</p>
    </div>
    <van-button class="zb_btn" @click="yuyue">立即预约</van-button>
  </div>
</template>

<script>
import { getTea } from "../util/api";
export default {
  // 组件名称
  name: "demo",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      list: {},
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    yuyue() {
      this.$toast("请选择预约时间");
    },
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 在实例初始化之后，组件属性计算之前，如data属性等
   */
  beforeCreate() {},
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {},
  async mounted() {
    let { data } = await getTea(this.$route.query.id);
    this.list = data.data.teacher;
    console.log(this.list);
  },
};
</script> 

<style lang="scss" scoped>
.zb_box {
  background-color: #f0f2f5;
  padding-bottom: 0.88rem;
  min-height: 100%;
}
header {
  height: 26.66667vw;
  line-height: 11.73333vw;
  background: linear-gradient(180deg, #63b7fe, #4e7de3);
  display: flex;
  color: #fff;
  justify-content: center;
  box-sizing: border-box;
  padding-right: 0.3rem;
  .van-icon {
    width: 6.66667vw;
    height: 100%;
    line-height: 11.73333vw;
    font-size: 0.42rem;
  }
  h3 {
    text-align: center;
    font-size: 4.8vw;
    width: 6.3rem;
    color: #fff;
    font-weight: 400;
  }
}
//   列表样式
.zb_otItem {
  width: 95%;
  height: 1.62rem;
  margin: -1.14rem auto 0;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 0.1rem;
  div {
    width: 4rem;
    p {
      color: #b7b7b7;
      font-size: 0.32rem;
      span {
        font-size: 0.33rem;
        color: #595959;
      }
    }
    .sex {
      font-size: 3.2vw;
    }
  }
  .yuyue {
    width: 1.4rem;
    height: 0.62rem;
    line-height: 0.62rem;
    background: #fff;
    border-radius: 0.6rem;
    font-weight: 400;
    color: #eb6100;
    border: none;
    text-align: center;
    font-size: 3.46667vw;
    border: 1px solid #eb6100;
  }
}
.zb_optitle {
  font-size: 4vw;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #595959;
  line-height: 13.33333vw;
  padding-left: 6.66667vw;
  height: 13.33333vw;
  position: relative;
  > span {
    position: absolute;
    left: 0.32rem;
    top: 0.3rem;
    width: 0.08rem;
    height: 0.42667rem;
    background: #eb6100;
  }
  p {
    span {
      font-size: 3.2vw;
    }
  }
}
.zb_empty {
  text-align: center;
  font-size: 0.16rem;
  img {
    width: 3rem;
    height: 3rem;
    margin: 2rem auto 0.2rem;
  }
  p {
    color: #8c8c8c;
    margin-bottom: 0.5rem;
    font-size: 4vw;
  }
}
.zb_btn {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 11.73333vw;
  line-height: 11.73333vw;
  text-align: center;
  color: #fff;
  font-size: 0.34rem;
  background: #eb6100;
}
</style>
