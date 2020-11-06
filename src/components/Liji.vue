<template>
<div>
    <!-- 遮罩层 -->
    <van-overlay :show="show">
      <div class="wrapper">
        <div class="block">
          <img src="https://wap.365msmk.com/img/feiji.decaf161.png" alt="" />
          <p class="zqd_p1">赶紧登陆一下吧</p>
          <p class="zqd_p2">立即预约一对一辅导，浏览更多视频教程</p>
          <button @click="$router.push('/login')">立即登录</button>
          <van-icon name="cross" @click="s" />
        </div>
      </div>
    </van-overlay>
</div>
</template>

<script>
export default {
  // 组件名称
  name: 'demo',
  // 组件参数 接收来自父组件的数据
  props: ['show'],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
   return {}
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
      s(){
          this.$emit('s',false)
      }
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
  * 在实例初始化之后，组件属性计算之前，如data属性等
  */
  beforeCreate () {
  },
  /**
  * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
  */
  created () {
  },
  mounted () {
  },
}
</script> 

<style lang='scss' scoped>

.wrapper {
  height: 6.7rem;
  background: #fff;
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  // text-align: center;
  position: fixed;
  top: 45%;
  left: 50%;
  width: 75%;
  overflow: hidden;
  font-size: 0.21333rem;
  transform: translate3d(-50%, -50%, 0);
  backface-visibility: hidden;
  transition: 0.3s;
}
.content {
  padding-bottom: 1.2rem;
}
.block {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 0.2rem 0;
  position: relative;
  > img {
    width: 100%;
  }
  > .zqd_p1 {
    font-size: 0.3rem;
  }
  > .zqd_p2 {
    font-size: 0.14rem;
    color: rgb(153, 153, 153);
  }
  > button {
    width: 4.7rem;
    height: 0.8rem;
    background: #eb6100;
    color: #fff;
    border: 0;
    border-radius: 0.5rem;
    margin-top: 0.45rem;
    font-size: 0.3rem;
  }
  .van-icon {
    width: 0.32rem;
    height: 0.32rem;
    position: absolute;
    top: 0.30667rem;
    right: 0.34667rem;
    background-size: 100%;
    background-position: 50%;
    font-size: 0.16rem;
  }
}
</style>
