<template>
  <div class="box">
    <!-- 表头 -->
    <van-sticky>
      <van-nav-bar
        title="我的收藏"
        left-text=""
        left-arrow
        @click-left="zqd_go()"
      >
        <template #right>
          <!-- <span class="zqd_sp">余额明细</span> -->
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="content">
      <!-- 暂无收藏 -->
      <div class="zb_empty" v-if="list.length == 0">
        <img src="https://wap.365msmk.com/img/empty.0d284c2e.png" alt="" />
        <p>暂无收藏</p>
      </div>
      <div
        class="tad-dan"
        @click="danxiang(item.course_id)"
        v-for="item in list"
        :key="item.course_id"
      >
        <div class="title">
          <p class="tad-p1">{{ item.title }}</p>
          <span @click.stop="xing(item.collect_id)"></span>
        </div>
        <div class="tad-sj">
          <p>共{{ item.section_num }}课时</p>
        </div>
        <div class="tad-tu">
          <div>
            <img :src="item.teachersAvatar" alt="" />
            <font>{{ item.teachers }}</font>
          </div>
        </div>
        <p class="tad-ren">
          <span>{{ item.sales_num }}人已报名</span>
          <font v-if="item.price == 0">免费</font>
          <font v-if="item.price != 0" style="color: red">
            <img
              src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png"
              alt=""
            />
            {{ item.price | perice }}</font
          >
        </p>
      </div>
      <p>没有更多了</p>
    </div>
  </div>
</template>

<script>
import { getCoList, getColl } from "../util/api";
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
    async getList() {
      let { data } = await getCoList("1");
      console.log(data);
      this.list = data.data.list;
      this.total = data.data.total;
    },
    zqd_go() {
      this.$router.go(-1);
    },
    danxiang(id) {
      this.$router.push(`/Course-detail?id=${id}&courseType=5`);
    },
    async xing(id) {
      let { data } = await getColl(id);
      this.getList();
      this.$toast({
        message: "已取消收藏",
        position: "bottom",
      });
    },
  },
  filters: {
    perice(val) {
      return val.toFixed(2);
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  height: 100%;
  background: #f0f2f5;
}
.tad-nei {
  background-color: #f0f2f5;
  padding: 0.3rem;
}
.content {
  padding: 4vw 2.66667vw;
  > p {
    font-size: 3.2vw;
    text-align: center;
    line-height: 6.66667vw;
    color: #969799;
  }
}
.tad-dan {
  background: #fff;
  border-radius: 0.1rem;
  padding: 0 0.28rem;
  margin-bottom: 0.3rem;
  position: relative;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTQ0RDlCOUZCNzRDMTFFOTlEMzU4OTdFRjlDNjMxNjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTQ0RDlCQTBCNzRDMTFFOTlEMzU4OTdFRjlDNjMxNjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNDREOUI5REI3NEMxMUU5OUQzNTg5N0VGOUM2MzE2MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNDREOUI5RUI3NEMxMUU5OUQzNTg5N0VGOUM2MzE2MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtJNOngAAAP1SURBVHja3JpbSFRRFIb3TJpmecvISosSDLLSFLtQUQRFEaWEZEWRRUEX8aELFEX4Ej3UU9hL9BT2UAk9FhURUdDFwtBuD/USkZCZdvFSXqZ/df4JkRnneM4+zh4XfDDMuf57r733WmsfX+9m5aX5QQZYSJLBS/AIfAZ/3D5gzPVAyP/jPBQ1DmwHlWC+vMOAYyKqDpzlb+3mlTAfqABnQHqI49PAQTAWHAc/vHAVL0xevCqMqKDFg91ghVdjwAs7APJsnJfIXh0fC8Kms7fs2lyw03Rhcr8jIGWY1xyK4LZRF5YPSh1cl83rfCYK8/PlshxcK2NtE5hoorBJFBbvcHlYA+aZKKyUruhmQT85aCGPujCZrk9peKlVYK1JwvZxmtcRCUkDJZggrAjs1+jSMs62uA33nFycwkV1DsfUepCjUZi49TmwDtSD1+AN+DSs2ShE2pLImydypstjdF7A1pyhomMSKDeCJtJIsV2gA3QihQmEEiaRdgnYyJ7I5rriV+ZaB9Me6dWH4ArEfRkobAI4z0UyTWcEMILWDV6AXRD33s8p+jCTwvQYFRUcQkvB6b5yX5qfuVOFjinWAPNxKK32sxYxU40eSwJbRdhiwycIJ7ZIBAXU6LN+EfZqFAp7J8LuKY9KYFGyXlArwlrBJa7gMe+C4Ca4I8KkGlvDP2LdJMSqxgLdEgyCW7lAJzD4jIsxQQGK2gBRTYPTlt/KKoNdUxpq6iMsSrKAsqCoUPlYGzgKbsWQMJn4qhgnDpm2BOsPNyQ0MdgtAxS1ET3VYDeD7uKYqzPULQPsobJQoiKVBr4pq6p710BhzXS/eqc1D7lBORdxU0KvFmWV+p5w3XJczOlUVhWq2RAXlDr/80gn2o3q24ZbTPHIeljvULqExSmNdXUXJnWZTJ3CpCaSZcgYW6BTWC5rCiZYvk5hhcqcIk+BTmHFBq1hs5WNPWu7wooMEiYZSJ4OYalglmGRR5EOYYUGhlTFOoTlGyiscLQKy4wUMNgRlmugMIlAJrsVlqzhRb6DCyw93FdWicyN+ZkMuxLmNPiVSPwneKCsTXPJn2qVtXm+F3xgncVJOtTDwNyVsDoHD+7mdTuU9f1Gw6CXugyWgGN2UpAQJh9zfhzqBJ+NL0xl9+I2WG7zoZLVVoPHoD3CubI3N1VZG44nwBSbjSYbKY3/bhDmC1O7ieYe8HaIjLWXLShJ4EplVbnabdy7j65ew4a7ShfrD+PacqwyKMptjw1cO2RslLCVpbV/gWesi9Rx3LgxCbSXgW104Rw2vhR0n4KL9J7/BaZwPeYb5sfOSczLMhizfR1An8bpPIlumcrZr421jtbBk004YX8FGABRbtJaWBD0xgAAAABJRU5ErkJggg==")
        no-repeat 50%;
      background-size: 3.73333vw 3.73333vw;
      width: 8vw;
      height: 8vw;
      margin-top: 0.2rem;
    }
  }
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
  color: #666;
}
.tad-tu {
  width: 6.34rem;
  height: 1.3rem;
}
.tad-tu div {
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
  margin-left: 0.17rem;
  margin-right: 0.2rem;
}
.tad-ren {
  border-top: 1px solid #f5f5f5;
  height: 0.87rem;
  line-height: 0.87rem;
  display: flex;
  font-size: 0.25rem;
  justify-content: space-between;
}
.tad-ren span {
  width: 5.4rem;
  padding-right: 0.2rem;
  color: rgba(0, 0, 0, 0.45);
}
.tad-ren font {
  color: #44a426;
  font-size: 0.35rem;
  display: flex;
  align-items: center;
  img {
    width: 0.16rem;
    height: 0.17rem;
    margin-right: 0.1rem;
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
</style>
