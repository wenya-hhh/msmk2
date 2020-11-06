<template>
  <div class="box">
    <!-- 表头 -->
    <van-nav-bar
      title="我的关注"
      left-text=""
      left-arrow
      @click-left="zqd_go()"
    >
      <template #right>
        <!-- <span class="zqd_sp">余额明细</span> -->
      </template>
    </van-nav-bar>

    <div class="content">
      <!-- 暂无关注 -->
      <div class="zb_empty" v-if="list.length == 0">
        <img src="https://wap.365msmk.com/img/empty.0d284c2e.png" alt="" />
        <p>暂无关注</p>
      </div>

      <div
        class="item"
        v-for="item in list"
        :key="item.teacher_id"
        @click="$router.push('/teacher?id=' + item.teacher_id)"
      >
        <img :src="item.avatar" alt="" />
        <div class="title">
          <p>
            <span>{{ item.teacher_name }}</span
            ><span class="sp">{{ item.level_name }}</span>
          </p>
          <span>{{ item.introduction }}</span>
        </div>
        <div class="btn">
          <span @click.stop="guanzhu(item.teacher_id)">取消关注</span>
        </div>
      </div>
      <p>没有更多了</p>
    </div>
  </div>
</template>

<script>
import { getCoList, getCollects } from "../util/api";
export default {
  data() {
    return {
      list: [],
      total: 0,
    };
  },
  created() {},
  mounted() {
    this.getList();
  },
  methods: {
    zqd_go() {
      this.$router.go(-1);
    },
    async getList() {
      let { data } = await getCoList("2");
      // console.log(data);
      this.list = data.data.list;
      this.total = data.data.total;
      console.log(this.list);
    },

    // 关注
    async guanzhu(id) {
      let { data } = await getCollects(id);
      this.getList();
      // console.log(data);
      this.$toast({
        message: "已取消关注",
        position: "bottom",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding: 4vw 2.66667vw;
  > p {
    font-size: 3.2vw;
    text-align: center;
    line-height: 6.66667vw;
    color: #969799;
  }
  .item {
    background-color: #fff;
    padding: 2.66667vw;
    margin-bottom: 2.66667vw;
    border-radius: 1.33333vw;
    position: relative;
    display: flex;
    align-items: center;
    .title {
      width: 4rem;
      height: 100%;
      p {
        span {
          font-size: 4vw;
          color: #595959;
          margin-right: 0.1rem;
        }
        .sp {
          font-size: 2.93333vw;
          color: #ea7a2f;
        }
      }
      > span {
        width: 100%;
        font-size: 3.2vw;
        color: #b7b7b7;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 0.2rem;
        display: inline-block;
      }
    }
    .btn {
      span {
        position: absolute;
        top: 50%;
        right: 4vw;
        transform: translateY(-50%);
        font-size: 3.46667vw;
        color: #eb6100;
        text-align: center;
        width: 20.26667vw;
        height: 7.46667vw;
        line-height: 7.46667vw;
        background: rgba(235, 97, 0, 0.1);
        border-radius: 4.13333vw;
      }
    }
    img {
      width: 0.8rem;
      height: 0.8rem;
      margin-right: 0.2rem;
    }
  }
}
/* 1111 */
.box {
  height: 100%;
  background: #f0f2f5;
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
</style>
