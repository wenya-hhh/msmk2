<template>
  <div>
    <van-calendar
      :poppable="false"
      :show-confirm="false"
      :style="{ height: '500px' }"
    >
      <template #title>
        <div>
          <van-icon name="arrow-left" @click="onClickLeft" />
          <span>学习日历</span>
        </div>
      </template>
    </van-calendar>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "demo",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {};
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style lang="scss" scoped>
.van-calendar__header > .van-calendar__header-title >div{
  display: flex;
  justify-content: start;
  align-items: center;
  i{
    font-size: .4rem;
    padding-left: .2rem;
  } 
  span{
    text-align: center;
    flex: 1;
        font-size: 4.8vw;
  }
}
</style>
