<template>
  <div class="box">
    <!-- 表头 -->
    <van-nav-bar title="意见反馈" left-text="" left-arrow @click-left="zqd_go()">
      <template #right>
        <!-- <span class="zqd_sp1">学习卡兑换</span> -->
      </template>
    </van-nav-bar>


    <!-- 文本域 -->
    <div class="box-con">
    <textarea v-model="zqd_txt" cols="40" rows="10" maxlength="500" class="zqd_txt" placeholder="请输入你的意见"> </textarea>
    <span class="sp1">{{ zqd_txt.length || 0 }}/500</span>
    </div>


    <!-- 底部按钮 -->
    <div class="div_bot">
    <van-button type="primary" id="zqd" @click="zqd_tijiao">提交</van-button>
    </div>
  </div>
</template>


<script>
import { posts } from '../util/api'
export default {
  data() {
    return {
      zqd_txt: '',
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 返回方法
    zqd_go() {
      this.$router.go(-1);
    },
    // 点击提交
   async zqd_tijiao(){
      let { data } = await posts('feedback',{
        content:this.zqd_txt
      })
      // console.log(data)
      if(data.code==200){
        this.$toast('反馈成功')
        this.$router.push('/person')
      }


    }
    },
};
</script>


<style scoped lang="scss">
.div_bot{
  text-align: center;
}
.box-con{
  text-align: center;
  margin-top: 0.4rem;
}
.box{
  height: 100%;
  background-color: #fff;
}
.zqd_txt {
    padding: 2.66667vw 2.66667vw;
    font-size: 3.2vw;
    line-height: 3.2vw;
    width: 85%;
    min-height: 0;
    border: 1px solid #ddd;
    height: 44vw;
    border-radius: 0.2rem;
}
#zqd {
    background-color: #eb6100;
    color: #fff;
    width: 9.2rem;
    width: 92vw;
    height: 1.17333rem;
    height: 11.73333vw;
    margin: 3.06667rem auto;
    margin: 30.66667vw auto;
    border-radius: .10667rem;
    border-radius: 1.06667vw;
    font-size: .45333rem;
    font-size: 4.53333vw;
    text-align: center;
    line-height: 1.17333rem;
    line-height: 11.73333vw;
}
.sp1{
  margin-left: 6rem;
      font-size: 3.2vw;
    color: #b7b7b7;
}
</style>
