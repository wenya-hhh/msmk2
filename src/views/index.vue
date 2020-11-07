<template>
  <div class="cxy_box">
    <!-- 轮播图布局 -->
    <div class="cxy_banner">
      <van-swipe class="my-swipe" :autoplay="3000" :show-indicators="false">
        <van-swipe-item v-for="(item, index) in banner" :key="index"
          ><img :src="item.banner_img" alt=""
        /></van-swipe-item>
      </van-swipe>
    </div>
    <!-- 遮罩层 -->
    <app-liji :show="show" @s="s"></app-liji>
    <!-- 特色课布局 -->
    <div class="cxy_kinds">
      <ul>
        <li @click="$router.push('/course')">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAA8CAYAAADSfGxZAAAFZUlEQVRoQ+1bW2xUVRRd68xMeZPaFESeBkuLhkekk6IfxDEEMQqUmWGMwcQPE5FEo9GYGONP/TIh8UH88BsNwTDObR0CGsUImGDAGVEQIn1JIBYqBSwtr5m5Z5tbaDLYoXPb28d8nPs1ybl7n7PXXWedk8leRN6zfv3pSr/f9wypN4uwlhAheJKQvVnNfblc2fkLFy72ptPBbH5cqf0OhcQ/ZcqJaWVl02dRsmtJrtPQywmQwG+AfJG1M98mk0s7+9dO50dDg6jjx5vrofE2qFYC4htYnPQC6gREpwl1BD5/KpF48DRAKQ0ghNFoexVsvVKAWlCCAJYDmDZwfbQBSYPqo2XLHoo3NFD3AbEp3FKvIZ8CmFesKBE4hfcQuASgTSi7/f7pTfH4AxeLxY7G+MaNV8qV6opSEBVIjQgqSU4FRBWbTwSdCmproqmqibG1Jyv05EBCgFCxwHuNk8hCuF+RO5Dhz7dU9koyWXMNoB5uzsJxomKxi5Ntu7tcCR63oV8g1NOATPAwz8GcrTczGm2Lira/BOD3kOxOaN82+UegjwE4qrRKZcVOJ5OLO7zk3rCh/X6lsisUVJ1QgnSoD84CpI/RHp8ciJcZibRaEB32mGxAuAhyJLodYEB1REQn/P7Md/H4koybuUKhH/0VFfNDgH4eIo8BmCki95EcgQ/2/xWovYyEW/4GZLabxXl/hx0UvHnmXHfjvU6eWEx8OtuyUYhtABZ6n9NNBl5gJNx8tbCyukkwrHe6QLXFsqoaC0WHw+1riNxOADOGlX14Qb0OI256FJuhT00esqxFTxQGonk/gdVDT+op4ta4AEHiWsKqnlpo6ZFwcw+AgmOeSh00mOMFBHXCWlTg0gZEIy22SPE7wMiCYoDoP/YNI24jYRhhGHG3xhhGGEYYRhQ8d83WMFvDbA2zNQa7lBuNMBphNMJohNEIF39dGLE0YmnE0oilEUsjli4QMGJpxNKIpRFLF1JhbpZGLI1YGrE0YmnE0gUC+WI55j1UIEuuUaTHaSY7BeBh9+h5f7MEgWhmJNKyGyIx7+W5zzAYEJFws9OtOxKNpO4XBCQZibRththOO9+YPSXHCGIrY+va5tsB+zCAOWOFRCkBIYIOZfMphkJ/Tawoz34G4kUARTvaRwKsUgHCcRoQ2JHT+vXbNoX69lVa5XaNFStKBQgAl0GELav6UB8QfQ3g5XNfA+XjkfjixXKUChCK8l7X5Y5tBw48mbtLnaPh5u0CbAEwsVgxXsZL4NS4CeJzy6p+pb+Ou4CIxQ5PyuUq3yL4BiCj1hQ+zoz4F4IPc1pvTyYXO+3Ofc+A89oBQzIzH9VKPgBk1Wic6eMEhGOqOQLiHZ9v0i/x+Lwb+ay+58XF8U3YduuzFHlVgKUQTAc5yY1Xqti2GQsg7pwI10H2CORPQH9y9mzNvnSaBR2Krm5wkcipBSKBOooESdQKuAKQ8uGyZRSBcL56twC/UyRFqKOiJGVZ1e1FP06xF/LHa2tTgTlzJlQEAhNna40QgSggdQACQ8kDoNdqrC5gQwSGaVPIkvhVNCz6yr6/caP3fGfnzUtD8ae6YsRgRcZirVW2Lc9BY5NAHLvkNBKDue4cw+QPVlP1mkJ5I+HT3wBcOzjbJCPCq1ToANhIqp2JxMJWLx5Uz0D0F+O4b2eUn1liq1wQIkEI60A8MsAdRLQqW1766uuanwoBEY22BSF6l4hU5Y87ZjkQfxBMQUuKwqNqwq2Tbs1yxRg7YkDkT+ScPJnMzMoyxQU29DpA6gHMFeCYz+d7v6vr7EHnElN4caLC4ZbVhLwL0HH1ngO4F0BSa7ZrPfnSnj2zrxcrbKjj/wFPducAYoibwgAAAABJRU5ErkJggg=="
            alt=""
          />
          <span>特色课</span>
        </li>
        <li @click="$router.push('/oto')">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA8CAYAAADRy2JxAAAEDElEQVRoQ+2aTWhUVxTH/+fNRyYmE78WirTQFgwiXSjFjWDRlR+k0CIOlJiaVk1VNGrGmBZaOy24EXSmlBqk2inUyaRZKM3MFFxoNt1VQXEhiogSSKwL48ckMTNz7yk3VQntTN7Me2HezJv3tveee+7vnnP+9773LgFAaGjIPZ4eeVsCX4KwCZKXgEhTbRX3EP4mxiXp1b46tfHjYTPzIwX+/PloO4i/AfCGmcHKZcsAa6ALYnKiIxzY9dioX+pOxJZL4Eq1gM8AfeRyy/dPbG67bRg+mIxFwWg3OoBldkTMLFaf+qDthtE5UDDRNwrwUqMDWGnHkKvMwQ/GBAiVKW46K2sePhFjK6NnxrcDb67mncibyT7LbJ20d9LeWPJR0KZq352KLmX2vguX5n+9NDmAmB7kXqTvh7ftHLMlfFeqv5lYXARjZZ6cEAD+AmG/LeGDidhBAJFCxaBejEAYtCV8VzL2NTG+m1UJCE9rFx6AA29so7DeqtAhp6i0dyJvw33eibye2jtp76S99cptZAaO2ud5pXUEzxG82YvJOd4aEZtKsHEEr0YFb0oKXhP+cPvN/2ZhLaj9XUHYGGlpvVcz8OoTFAETID7pn/AeDwUCmfLAT/8Wxp9EuE7M2XKLHhMxMacl+NaLSW/qdCCQzjeHuU97IgbzOZGRx0T92OOp4TpZbvhlzc0cWr9B/VWe9efqnMIzIEAUnwR39ra0jpUbulR/cwf/b8TPC4/siWxqGy11Ilb0nxt4VWPA2Vx26mjko0+fWAFixKdpeJXqBPSJXKazmsCnr9WNj/wiGa16C5f/bK+T6ocuRhdoLs8KaFSv56Cc7STIzRqvJaJOMC/S8/1/eAUO/klkMz35In7093N+ofl6AV4PaC49B2VtZ3U9D00gqgOritV7q0vGnoAxX3UrJtW/+CO+OivkNfX9T2/wSm+nI6l4J0vZw0ATgfpFRhyLbC2s6l2D51uIKFHpYMXMj7YNDHjfdE++xW6PJ+eWwz9s2f5sNkNbwRezQjP7dCV/20Ccu2yLtC8V/lAy9o6LoWp+Qam2lda/ZNHqSJyZ59caf4ZEoNqjXzK8it7h5K/rNNbOMrCcqlj1DcGrPfTwYP97mov3QvJmAEuq8f6uMfiXxbtv4MdGX8PiZaRhviayPstqmqlegrYQcIBR/CVqU/CWwRZwfCQR382QYQDzitEjW8F3XD3jaRpp3AtCiIGFesGxFbyCDQ1FfemJuh2QfFqvBGwH/yrawVTfLkiEAW4oVAK2hVcl4H/o30PM3xYqAdvCqwxoH4r6Fo97PyFGb74SsDX8qxLoTsY/E1J+D0LDjEOZrAn46V1gtPFzxvSV1Je7AN2pCfjXJZCu3wqSx8H8yEXo+Qf3I4hni2PDwwAAAABJRU5ErkJggg=="
            alt=""
          />
          <span>一对一辅导</span>
        </li>
        <li
          @click="zqd_token ? $router.push('/study-calendar') : (show = true)"
        >
          <img
            src="data:image/png;base64,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"
            alt=""
          />
          <span>学习日历</span>
        </li>
      </ul>
    </div>
    <div class="content">
      <div v-for="(item, index) in list" :key="index">
        <template v-if="item.channel_info.type == 3">
          <!-- 名师阵容 -->
          <p class="cxy_page"><span></span>{{ item.channel_info.name }}</p>
          <div class="cxy_content">
            <ul class="cxy_item">
              <li
                v-for="(item, index) in item.list"
                @click="sh(item.teacher_id)"
                :key="index.teacher_id"
              >
                <div>
                  <img :src="item.teacher_avatar" alt="" />
                </div>
                <div class="cxy_txt">
                  <p>{{ item.teacher_name }}</p>
                  <p>
                    　杨老师,特级教师.多次被中国数学会评为全国高中数学竞联赛优秀教练员。长期从事名校理科班的数学教学和数学竞赛辅导工作。
                    辅导学生参加全国高中数学联赛有数百人次获全国高中数学联赛一、二、三等奖，数十人被免试保送到清华大学、北京大学等名牌大学学习。十多人获CMO获一、二、三等奖，一人获IMO金牌。
                    特别是近年来大学试行自主招生，有很多同学通过上他的竞赛辅导课进入清华大学、北京大学、上海交通大学等。
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </template>
        <template v-if="item.channel_info.type == 1">
          <!-- 精品课程 -->
          <p class="cxy_page"><span></span>{{ item.channel_info.name }}</p>
          <div class="cxy_jingpin">
            <ul class="cxy_item">
              <li
                v-for="(item, index) in item.list"
                :key="index"
                @click="
                  $router.push(`course-detail?id=${item.id}&courseType=5`)
                "
              >
                <div class="cxy_pos">
                  <img
                    src="https://wap.365msmk.com/img/has-buy.6cfbd83d.png"
                    alt=""
                    v-show="item.has_buy"
                  />
                </div>
                <p class="one">{{ item.title }}</p>
                <div class="two">1课时</div>
                <div class="three">
                  <img :src="item.teachers_list[0].teacher_avatar" alt="" />
                  <span>{{ item.teachers_list[0].teacher_name }}</span>
                </div>
                <div class="four">
                  <span>{{ item.sales_num }}人报名</span>
                  <span class="free" v-show="item.price == 0">免费</span>
                  <span v-show="item.price == 100"
                    ><img
                      src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png"
                      alt=""
                    />
                    1.00</span
                  >
                </div>
              </li>
            </ul>
          </div>
        </template>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import appLiji from "../components/Liji";
import appFooter from "../components/Footer";
import { gets, posts, getBanner } from "../util/api";
export default {
  components: { appFooter, appLiji },
  data() {
    return {
      // item: [],
      // HomeArr2: [],
      // HomeArr4: [],
      // HomeArr5: [],
      list: [],
      show: false,
      banner: [],
      zqd_token: localStorage.getItem("token"),
    };
  },
  created() {},
  mounted() {
    this.getList();
  },

  methods: {
    s(val) {
      this.show = val;
    },
    async getList() {
      // 内容数据
      let { data } = await gets("recommend/appIndex");
      this.list = data.data;
      console.log(this.list);
      // banner数据
      let { data: res } = await getBanner();
      this.banner = res.data;
    },
    sh(id) {
      if (this.zqd_token) {
        this.$router.push(`/teacher?id=${id}`);
      } else {
        this.show = true;
      }
    },
  },
};
</script>

<style lang="scss">
.van-swipe-item {
  width: 100%;
  height: 4.3rem;
  img {
    width: 100%;
    height: 100%;
  }
}
//最外层盒子
.cxy_box {
  min-width: 100%;
  // main-height: 100%;
  background-color: #f0f2f5;
}

//特色课Li盒子
.cxy_kinds {
  position: relative;
  width: 100%;
  top: -0.5rem;
  padding-bottom: 0.2rem;
  height: 1.3rem;
  color: #8c8c8c;
  ul {
    display: flex;
    justify-content: space-around;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 2rem;
      justify-content: center;
      width: 2rem;
      background-color: #fff;
      border-radius: 0.2rem;
      img {
        width: 0.5rem;
        height: 0.5rem;
        padding-bottom: 0.2rem;
      }
    }
  }
}
//名师阵容样式
.cxy_page {
  font-size: 0.26rem;
  color: #595959;
  padding-left: 0.7rem;
  height: 0.5rem;
  line-height: 0.5rem;
  margin-top: 0.15rem;
  position: relative;
  > span {
    position: absolute;
    left: 0.4rem;
    top: 50%;
    transform: translateY(-50%);
    width: 0.06rem;
    height: 0.32rem;
    background: #eb6100;
  }
}
.cxy_content {
  // width: 7.5rem;
  padding: 0 0.2rem;
  .cxy_item {
    li {
      height: 1.6rem;
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      border-radius: 0.15rem;
      margin-top: 0.2rem;
      padding: 0 0.2rem;
      align-items: center;
      img {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
      }
      div {
        padding-left: 0.2rem;
      }
      .cxy_txt {
        width: 5.5rem;

        :first-child {
          font-size: 0.3rem;
          color: #595959;
        }
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.24rem;
          color: #b7b7b7;
        }
        :last-child {
          padding-left: 0.2rem;
        }
      }
    }
  }
}
.content{
  padding-bottom: 1.2rem;
}
// 精品课程样式
.cxy_jingpin {
  .cxy_item {
    padding: 0 0.4rem;
    li {
      height: 3rem;
      background-color: #fff;
      padding: 0.2rem;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      border-radius: 0.15rem;
      margin-top: 0.2rem;
      justify-content: space-around;
      position: relative;
      // 定位
      .cxy_pos {
        position: absolute;
        right: 0.3rem;
        top: 28%;
        img {
          width: 15.73333vw;
          height: 12.8vw;
        }
      }
      .one {
        font-size: 0.32rem;
        color: #333;
      }
      .two {
        font-size: 0.24rem;
        color: #666;
      }
      .three {
        // line-height: 0.8rem;
        display: flex;
        align-items: center;
        color: rgba(0, 0, 0, 0.45);

        img {
          width: 0.54rem;
          height: 0.54rem;
          border-radius: 50%;
          margin-right: 0.2rem;
        }
      }
      .four {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: rgba(0, 0, 0, 0.45);
        font-size: 0.26rem;
        font-weight: 500;
        border-top: 1px solid #f5f5f5;
        padding: 0.2rem 0;
        img {
          width: 3.2vw;
        }
        .free {
          font-size: 0.32rem;
          color: #44a426;
        }
      }
    }
  }
}
// 明星讲师
.start {
  padding-bottom: 1.1rem;
  > ul {
    padding: 0 0.4rem;

    li {
      height: 1.6rem;
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      border-radius: 0.15rem;
      margin-top: 0.2rem;
      align-items: center;
      div {
        display: flex;
        justify-content: center;
        flex-direction: column;
        height: 1.6rem;
        padding-left: 0.2rem;
      }
      .cxy_txt {
        width: 5.5rem;
        :last-child {
          color: #b7b7b7;
        }
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.24rem;
          color: #595959;
          padding: 0.1rem;
        }
      }
    }
  }
  img {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
  }
}
</style>
