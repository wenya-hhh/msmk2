<template>
  <div class="tad-body">
    <!-- 粘性布局 -->
    <van-sticky>
      <div class="tad-sou">
        <van-icon name="arrow-left" @click="fan" size="0.4rem" />
        <span>{{ list.title }}</span>
        <van-icon name="notes-o" size="0.4rem" />
      </div>
    </van-sticky>

    <!-- 中内容 -->
    <div class="tad-zhong">
      <span>共{{ list.section_num }}课时</span>
      <div></div>
      <span>以学习0%</span>
    </div>

    <!-- 底内容 -->
    <div class="tad-di" v-for="(item, index) in list1" :key="index" @click="sp">
      <div class="tad-di1">
        <div class="k0">
          <div class="k1"></div>
          <span class="k2" v-if="item.course_type == 0">[回放]</span>
          <span>{{ item.periods_title }}</span>
        </div>
        <p class="k3">
          <!-- 名字 -->
          <!-- <span>{{item.teachers[0].teacher_name}}</span> -->
          <span>{{ item.total_start_play }}</span>
          <span>{{ item.total_end_play }}</span>
        </p>
        <div class="tad-zhong1">
          <div></div>
          <span>以观看0%</span>
        </div>
      </div>
    </div>

    <!-- 弹出层 -->
    <van-popup v-model="show">
      <van-field name="rate" label="星级：">
        <template #input>
          <van-rate
            v-model="value"
            :size="25"
            color="#ffd21e"
            void-icon="star"
            void-color="#eee"
          />
        </template>
      </van-field>

      <div class="nei">
        <span>内容：</span>
        <textarea type="text" v-model="neirong"></textarea>
      </div>
      <div class="fabu" @click="fabu">发布</div>
    </van-popup>

    <!-- 尾部 -->
    <div class="tad-wei">
      <p @click="showPopup">
        <van-icon name="edit" size="0.3rem" />
        <span>写评论</span>
      </p>
      <p @click="xiangqing">
        <van-icon name="apps-o" size="0.3rem" />
        <span>课程详情</span>
      </p>
      <p>
        <van-icon name="delete" size="0.3rem" />
        <span>移除列表</span>
      </p>
    </div>
  </div>
</template>

<script>
import { gets, posts } from "../util/api";
export default {
  data() {
    return {
      //    遮罩层
      show: false,
      rate: 3,
      list: [],
      list1: [],
      value: 0,
      neirong: "",
    };
  },
  name: "demo",
  props: {},
  mounted() {
    this.fun();
  },
  // 计算属性
  computed: {},
  watch: {},
  methods: {
    // 获取数据
    async fun() {
      let { data } = await gets(`/myStudy/course/${this.$route.query.id}?`);
      this.list = data.data.course;

      this.list1 = data.data.periods;
      console.log(this.list1);
    },
    // 评论
    async fabu() {
      let { data } = await posts("myStudy/comment", {
        content: this.neirong,
        course_id: this.$route.query.id,
        grade: this.value,
        type: 1,
      });
      if (data.code == 200) {
        this.show = false;
        this.$toast("评论成功");
      }
      console.log(data);
    },
    // 视频
    async sp() {
      window.location.href = `https://wap.365msmk.com/video?id=189&video_id=30929276&title=${this.list1[0].periods_title}`;
    },
    // 返回
    fan() {
      this.$router.go(-1);
    },

    //   详情路由
    xiangqing() {
      this.$router.push("/course-detail?id=" + this.$route.query.id);
    },

    // 弹出层
    showPopup() {
      this.show = true;
    },
  },
};
</script>

<style scoped lang="scss">
.tad-body {
  padding-bottom: 0.9rem;
}
// 弹出层
.van-popup {
  width: 6rem;
  height: 3.7rem;
  padding: 0.8rem 0.6rem 0.4rem;
  border-radius: 0.2rem;
  .xing {
    width: 6.3rem;
    height: 0.6rem;
  }
  .nei {
    width: 6.1rem;
    height: 1.6rem;
    margin-top: 0.45rem;
    display: flex;
    justify-content: flex-start;
    textarea {
      width: 5rem;
      height: 1.37rem;
      padding: 0.1rem 0rem;
      border: 1px solid #d5d5d5;
      border-radius: 0.1rem;
      font-size: 0.3rem;
    }
  }
  .fabu {
    width: 1.76rem;
    height: 0.56rem;
    border-radius: 0.1rem;
    background-color: #eb6100;
    color: #fff;
    line-height: 0.56rem;
    text-align: center;
    margin-left: 2.27rem;
    margin-top: 0.5rem;
    font-size: 0.3rem;
  }
}

.tad-body {
  position: relative;
  background: #fff;
}
// 尾部
.tad-wei {
  position: fixed;
  background-color: #fff;
  left: 0;
  bottom: 0;
  width: 7.5rem;
  height: 0.75rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  p {
    width: 2.5rem;
    height: 0.74rem;
    line-height: 0.74rem;
    text-align: center;

    span {
      margin-left: 0.1rem;
      font-size: 0.24rem;
    }
  }
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
  padding-left: 0.5rem;
  overflow: hidden; //隐藏
  white-space: nowrap; //不换行
  text-overflow: ellipsis; //超出部分省略号
}
.tad-zhong {
  display: flex;
  justify-content: space-around;
  width: 7.5rem;
  height: 0.915rem;
  align-items: center;
  border-bottom: 1px solid #eaeaea;
  div {
    width: 3.65rem;
    height: 0.07rem;
    background-color: #f5f5f5;
  }
  span {
    font-size: 0.3rem;
  }
}
.tad-zhong1 {
  display: flex;
  justify-content: space-around;
  width: 6.22rem;
  height: 0.24rem;
  align-items: center;
  margin-top: 0.3rem;
  div {
    width: 4.4rem;
    height: 0.07rem;
    background-color: #f5f5f5;
    margin-right: 0.5rem;
  }
  span {
    font-size: 0.24rem;
  }
}

.tad-di {
  .tad-di1 {
    width: 6.26rem;
    height: 1.69rem;
    border: 0.03rem solid #e9e9e9;
    padding: 0.3rem;
    margin: 0.3rem;
  }
}

.k0 {
  margin-bottom: 0.3rem;
  width: 6.2rem;
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
  color: #eb6100;
  padding: 0 0.1rem;
  font-size: 0.3rem;
  margin-right: 0.2rem;
}
span {
  font-size: 0.3rem;
  color: #595959;
}
.k3 {
  width: 5.97rem;
  margin: 0;
  margin-left: 0.3rem;
}
</style>
