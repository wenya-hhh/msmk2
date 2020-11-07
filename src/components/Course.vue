<template>
  <div>
    <!-- 粘性布局 -->
    <van-sticky>
      <!-- 导航栏 -->
      <van-nav-bar title="特色课">
        <template #right>
          <van-icon
            name="search"
            size="0.3998rem"
            color="#7F7F7F"
            @click="sou"
          />
        </template>
      </van-nav-bar>
      <!-- 导航栏 -->

      <!-- 下拉菜单 -->
      <van-dropdown-menu active-color="#EF8133">
        <van-dropdown-item title="分类" ref="item">
          <div class="tad-yi">
            <div class="tad-he">
              <p class="tad-nian">{{ attrclassify.name }}</p>
              <span
                v-for="(ao, dong) in attrclassify.child"
                :key="dong"
                @click="ke(ao.id)"
                :class="ao.id === fen ? 'tad-he1' : ''"
                >{{ ao.name }}</span
              >
            </div>

            <div class="tad-he">
              <p class="tad-nian">{{ attrclassify1.name }}</p>
              <span
                v-for="(ao, dong) in attrclassify1.child"
                :key="dong"
                @click="ke1(ao.id)"
                :class="ao.id === fen1 ? 'tad-he1' : ''"
                >{{ ao.name }}</span
              >
            </div>

            <div class="tad-niu">
              <button color="#7232dd" class="tad-b1" @click="chong">
                重置
              </button>
              <button color="#7232dd" class="tad-b2" @click="queding">
                确定
              </button>
            </div>
          </div>
        </van-dropdown-item>

        <van-dropdown-item title="排序" ref="item1">
          <ul class="tad-san">
            <li @click="onConfirm(0)" :class="0 === this.fll ? 'active' : ''">
              综合排序
            </li>
            <li @click="onConfirm(1)" :class="1 === this.fll ? 'active' : ''">
              最新
            </li>
            <li @click="onConfirm(2)" :class="2 === this.fll ? 'active' : ''">
              最热
            </li>
            <li @click="onConfirm(3)" :class="3 === this.fll ? 'active' : ''">
              价格从最低到最高
            </li>
            <li @click="onConfirm(4)" :class="4 === this.fll ? 'active' : ''">
              价格从最低到最高
            </li>
          </ul>
        </van-dropdown-item>

        <van-dropdown-item title="筛选" ref="item2">
          <div class="tad-er">
            <div class="tad-he">
              <span
                v-for="(item, index) in fenlei"
                :key="index"
                @click="sai(item.id)"
                :class="item.id === flog ? 'tad-he1' : ''"
                >{{ item.name }}</span
              >
            </div>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
      <!-- 下拉菜单 -->
    </van-sticky>
    <!-- 粘性布局 -->

    <!-- 内容 -->

    <div class="tad-nei">
      <!-- 加载更多 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          class="tad-dan"
          v-for="(item, index) in list"
          :key="index"
          @click="danxiang(item.teachers_list[0].course_basis_id)"
        >
          <p class="tad-p1">{{ item.title }}</p>
          <div class="tad-sj">
            <p>
              <van-icon name="aim" />
              {{ item.end_play_date | timefnxq }}
              <van-icon name="down" />
            </p>
            <p>共{{ item.course_type }}课时</p>
          </div>
          <div class="tad-tu">
            <div>
              <img :src="item.teachers_list[0].teacher_avatar" alt="" />
              <font>{{ item.teachers_list[0].teacher_name }}</font>
            </div>
            <div v-if="item.has_buy != 0">
              <img
                src="../../public/img/5abe16aff492e007ed6de49a347364fb_03.jpg"
                alt=""
                class="i9"
              />
            </div>
          </div>
          <p class="tad-ren">
            <span>{{ item.brows_num }}人已报名</span>

            <font v-if="item.price == 0" class="mf">免费</font>
            <font v-if="item.price != 0" class="fk">
              <img
                src="../../public/img/a1f37d1be616ee3adf3baa7bb806bea3_03.jpg"
                alt=""
              />
              {{ item.price / 100 + ".00" }}</font
            >
          </p>
        </div>
      </van-list>
      <!-- 加载更多 -->
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { Toast, Divider } from "vant";
import Footer from "../components/Footer";

export default {
  data() {
    return {
      //  下拉菜单
      value: 0,
      switch1: false,
      switch2: false,

      // 加载更多
      loading: false,
      finished: false,
      i: 2,

      // 基本数据
      list: [],
      list2: [],
      fenlei: [],
      fll: 0,
      flog: 0,
      fen: "",
      fen1: "",

      attrclassify: [],
      attrclassify1: [],
    };
  },

  name: "demo",
  props: {},
  mounted() {
    this.fun();
    this.fun1();
    this.fenshu();
  },

  // 计算属性
  computed: {},
  components: {
    Footer,
  },
  watch: {},
  methods: {
    // 获取数据
    async fun() {
      let { data } = await this.$http.get("courseBasis?page=1&limit=32&");
      // console.log(data)
      this.list2 = data.data.list;
      for (let i = 0; i < 4; i++) {
        this.list.push(this.list2[i]);
      }
      // console.log(this.list)
      // console.log(this.list2)
    },

    // 筛选数据
    async fun1() {
      let { data } = await this.$http.get(
        "http://120.53.31.103:84/api/app/courseClassify"
      );
      this.fenlei = data.data.appCourseType;
      // console.log(this.fenlei)
    },

    // 分类数据获取
    async fenshu() {
      let { data } = await this.$http.get("courseClassify?");
      this.attrclassify = data.data.attrclassify[0];
      this.attrclassify1 = data.data.attrclassify[1];
      //  console.log(this.attrclassify1)
    },

    // 搜索按钮
    onClickRight() {
      Toast("按钮");
    },

    // 搜索页面跳转
    sou() {
      this.$router.push("/Search");
    },

    // 详情页面跳转
    danxiang(i) {
      // console.log(i)
      this.$router.push({
        path: "/Course-detail",
        query: { id: i,courseType:3 },
      });
    },

    // 排序
    async onConfirm(i) {
      this.fll = i;
      let { data } = await this.$http.get("courseBasis?page=1&limit=10&", {
        params: {
          order_by: i,
        },
      });
      this.list = data.data.list;
      this.$refs.item1.toggle();
    },

    // 筛选
    async sai(i) {
      this.flog = i;
      this.$refs.item2.toggle();
      let { data } = await this.$http.get("courseBasis?page=1&limit=10&", {
        params: {
          course_type: i,
        },
      });
      // console.log(data)
      this.list = data.data.list;
      // console.log(this.list)
    },

    // 分类
    ke(i) {
      this.fen = i;
    },
    ke1(i) {
      this.fen1 = i;
    },
    async queding() {
      let { data } = await this.$http.get(
        `courseBasis?page=1&limit=10&course_type=0&classify_id=&order_by=&attr_val_id=${this.fen1},${this.fen}&is_vip=0&`
      );
      //  console.log(data)
      this.list = data.data.list;
      this.$refs.item.toggle();
    },

    chong() {
      this.fen = "";
      this.fen1 = "";
      this.$refs.item.toggle();
    },

    // 加载更多
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 4; i++) {
          this.i++;
          this.list.push(this.list2[this.i]);
        }
        // console.log(this.list)
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length >= this.list2.length) {
          this.finished = true;
        }
      }, 2000);
    },
  },
};
</script>

<style scoped>
.van-nav-bar {
  height: 0.87rem;
}
.tad-nian {
  font-size: 0.24rem;
  color: #595959;
  margin-top: 0.32rem;
  margin-bottom: 0.2rem;
}
.tad-he {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  outline: none;
  border-bottom: 1px solid #f1f1f1;
}
.tad-he span {
  margin: 0 0.42rem 0.46rem 0;
  display: inline-block;
  width: 1.38rem;
  height: 0.66rem;
  background: #f5f5f5;
  font-size: 0.24rem;
  color: #646464;
  text-align: center;
  line-height: 0.66rem;
  overflow: hidden;
  border-radius: 0.1rem;
}
.tad-he .tad-he1 {
  background: #ebeefe;
  color: #ef8133;
}
.tad-niu {
  padding: 0.3rem 0;
  display: flex;
  justify-content: space-between;
}
.tad-niu .tad-b1 {
  width: 3.35rem;
  height: 0.63rem;
  background-color: #ffffff;
  outline: none;
  border: 0.03rem solid #e7e7e7;
  border-radius: 0.08rem;
  font-size: 0.22rem;
  color: #595959;
}
.tad-niu .tad-b2 {
  width: 3.35rem;
  height: 0.63rem;
  background-color: #eb6100;
  outline: none;
  border: none;
  border-radius: 0.08rem;
  font-size: 0.22rem;
  color: #ffffff;
  margin-right: 0.25rem;
}
.tad-yi {
  padding-left: 0.3rem;
  padding-bottom: 0.2rem;
}
.tad-er {
  padding-left: 0.3rem;
  padding-top: 0.4rem;
}
.tad-san li {
  list-style: none;
  height: 1.02rem;
  text-align: center;
  line-height: 1.02rem;
  font-size: 0.25rem;
  color: #595959;
  border-bottom: 0.01rem solid #f5f5f5;
}
.tad-san .active {
  color: #ef8133;
}
.tad-nei {
  background-color: #f0f2f5;
  padding: 0.3rem;
  margin-bottom: 1rem;
}
.tad-dan {
  background: #fff;
  border-radius: 0.1rem;
  padding: 0 0.28rem;
  margin-bottom: 0.3rem;
  position: relative;
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
}
.tad-tu {
  width: 6.34rem;
  height: 1.3rem;
  display: flex;
  justify-content: space-between;
}
.tad-tu .i9 {
  width: 1.17rem;
  height: 0.96rem;
}
.tad-tu div {
  width: 3rem;
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
  margin-left: 0.1rem;
}
.tad-ren {
  border-top: 1px solid #f5f5f5;
  height: 0.87rem;
  line-height: 0.87rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.25rem;
}
.tad-ren span {
  padding-right: 0.2rem;
  color: rgba(0, 0, 0, 0.45);
}
.tad-ren .mf {
  color: #44a426;
  font-size: 0.35rem;
}
.tad-ren .fk {
  color: #ee1f1f;
  font-size: 0.3rem;
}
</style>
