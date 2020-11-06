<template>
  <div class="zb_box">
    <van-sticky>
      <header>
        <h3>约课记录</h3>
      </header>
    </van-sticky>
    <van-tabs
      v-model="active"
      line-width="0.2rem"
      line-height=".02rem"
      color="#eb6100"
    >
      <van-tab title="待上课">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <div class="zb_empty">
            <img
              src="https://wap.365msmk.com/img/no-message.8d3ca5af.png"
              alt=""
            />
            <p>还没有待上课记录哦</p>
            <van-button v-if="token" @click="$router.push('/oto')"
              >立即约课</van-button
            >
            <van-button v-if="!token" @click="$router.push('/login')"
              >登陆/注册</van-button
            >
          </div>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="已上课">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <div class="zb_empty">
            <img
              src="https://wap.365msmk.com/img/no-message.8d3ca5af.png"
              alt=""
            />
            <p>还没有上课记录哦</p>
            <van-button v-if="token" @click="$router.push('/oto')">立即约课</van-button>
            <van-button v-if="!token" @click="$router.push('/login')"
              >登陆/注册</van-button
            >
          </div>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="已取消">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <div class="zb_empty">
            <img
              src="https://wap.365msmk.com/img/no-message.8d3ca5af.png"
              alt=""
            />
            <p>还没有取消上课记录哦</p>
            <van-button v-if="!token" @click="$router.push('/login')"
              >登陆/注册</van-button
            >
          </div>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

    <app-footer></app-footer>
  </div>
</template>


<script>
import appFooter from "../components/Footer";
export default {
  // 组件名称
  name: "demo",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {
    appFooter,
  },
  // 组件状态值
  data() {
    return {
      token:localStorage.getItem('token')||'',
      active: 3,
      isLoading: false,
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法

  methods: {
    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 1000);
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
  mounted() {
  },
};
</script>

<style scoped>
</style>

<style lang='scss' scoped>
.zb_box {
  height: 100%;
  background-color: #f0f2f5;
  header {
    height: 0.88rem;
    line-height: 0.88rem;
    background-color: #fff;
    text-align: center;
    font-size: 0.3rem;
    h3 {
      font-weight: 400;
      color: #595959;
    }
  }
  .van-tabs {
    height: 0.9rem;
    font-size: 0.25rem;
  }
  .zb_empty {
    text-align: center;
    font-size: 0.16rem;
    height: 100%;
    img {
      width: 1.98rem;
      height: 1.42rem;
      margin: 2rem auto 0.2rem;
    }
    p {
      color: rgb(183, 183, 183);
      margin-bottom: 0.5rem;
    }
    button {
      color: #fff;
      background: #eb6100;
      width: 1.9rem;
      height: 0.6rem;
      border-radius: 0.1rem;
      font-size: 0.16rem;
    }
  }
  .van-pull-refresh {
    height: 100%;
  }
}
</style> 
