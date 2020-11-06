<template>
  <div class="box">
    <Head></Head>
    <ul class="zqd_ul">
      <!-- 头像 -->
      <li @click="toushow = true">
        <span>头像</span>
        <div><img :src="list.avatar" alt="" /></div>
      </li>
      <!-- 头像 -->
      <van-popup v-model="toushow" position="bottom" :style="{ height: '30%' }">
        <ul>
          <li>
            拍照
            <input
              type="file"
              accept="image/*"
              capture="camera"
              id="takePhoto"
              @change="takePhoto"
            />
          </li>
          <li>
            从手机相册中选
            <input
              type="file"
              accept="image/*"
              id="takePhoto"
              @change="takePhoto"
            />
          </li>
          <li>取消</li>
        </ul>
      </van-popup>

      <!-- 昵称 -->
      <li
        @click="$router.push(`/set-info?tag=nickname&value=${list.nickname}`)"
      >
        <span>昵称</span>
        <div>
          <span>{{ list.nickname }}</span>
        </div>
      </li>
      <!-- 手机号 -->
      <li id="mobile">
        <span>手机号</span>
        <div>
          <span>{{ list.mobile }}</span>
        </div>
      </li>
      <!-- 性别 -->
      <li @click="$router.push(`/set-info?tag=sex&value=${list.sex}`)">
        <span>性别</span>
        <div>
          <span v-if="list.sex == 0">男</span>
          <span v-if="list.sex == 1">女</span>
          <span v-if="list.sex == 3">保密</span>
        </div>
      </li>
      <!-- 出生日期 -->
      <li @click="dateshow = true">
        <span>出生日期</span>
        <div>
          <span v-if="list.birthday == 0">请选择</span>
          <span v-else>{{ list.birthday }}</span>
        </div>
      </li>
      <!-- 时间选择 -->
      <van-popup v-model="dateshow" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="confirm"
          @cancel="cancel"
        />
      </van-popup>
      <!-- 所在城市 -->
      <li @click="cityshow = true">
        <span>所在城市</span>
        <div>
          <span v-if="list.province_name == ''">请选择</span>

          <span v-else>{{
            list.province_name +
            ", " +
            list.city_name +
            ", " +
            list.district_name
          }}</span>
        </div>
      </li>
      <!-- 城市选择 -->
      <van-popup v-model="cityshow" position="bottom">
        <van-area
          :area-list="bm"
          @confirm="cityConfirm"
          @cancel="cancel"
          ref="djj"
          @change="Picker"
          :value="list.district_id + ' '"
        />
      </van-popup>
      <!-- 学科 -->
      <li
        @click="
          $router.push({
            path: '/set-info',
            query: { tag: 'subjects', select: list.attr },
          })
        "
      >
        <span>学科</span>
        <div class="xue">
          <span v-for="item in list.attr" :key="item.attr_val_id">
            <template v-if="item.attr_id == 2">
              {{ item.attr_value }}
            </template>
          </span>
        </div>
      </li>
      <!-- 年级 -->
      <li @click="classshow = true">
        <span>年级</span>
        <div>
          <span v-for="item in list.attr" :key="item.attr_id">
            <template v-if="item.attr_id == 1">
              {{ item.attr_value }}
            </template>
          </span>
        </div>
      </li>
      <van-popup
        v-model="classshow"
        position="bottom"
        :style="{ height: '44%' }"
        :value="classId"
      >
        <van-area :area-list="arrealist" columns-num="1" @confirm="clas" />
      </van-popup>
    </ul>
  </div>
</template>

<script>
import Head from "@/components/Header.vue";
import { gets, add_img, ok_up_user, getClass } from "../util/api";
export default {
  data() {
    return {
      classshow: false, //年级
      list: {},
      toushow: false, //头像
      dateshow: false,
      cityshow: false,
      currentDate: new Date(),
      minDate: new Date(1890, 0, 1),
      maxDate: new Date(),
      nowdate: new Date().toLocaleDateString(),
      areaList: "",
      bm: {
        province_list: {},
        city_list: {},
        county_list: {},
      },
      city: "",
      county: "",
      sheng: "",
      tem: "",
      classArr: [],
      arrealist: {
        province_list: {},
      },
      arr: [],
      classId: 0,
    };
  },
  created() {},

  mounted() {
    this.getlist();
    this.beijing();
    this.getcla();
  },
  methods: {
    // 年级
    async clas(val) {
      console.log(val);
      val.map((item) => {
        this.arr.push({ attr_id: 1, attr_val_id: item.code });
      });
      let { data } = await ok_up_user({
        user_attr: JSON.stringify(this.arr),
      });
      this.getlist();
      this.classshow = false;
    },
    // 地址
    async Picker(Picker, data, index) {
      // console.log(Picker, data, index);
      if (index == 0) {
        this.sheng = data[index].name;
        var data = await this.$http.get("sonArea/" + data[index].code);
        this.bm.city_list = {};
        data.data.data.forEach((el) => {
          this.$set(this.bm.city_list, el.id, el.area_name);
        });

        var arr = [];
        for (const key in this.bm.city_list) {
          arr.push(key);
        }
        // console.log(arr);
        var datas = await this.$http.get("sonArea/" + arr[0]);
        // console.log(datas.data);
        datas.data.data.forEach((el) => {
          this.$set(this.bm.county_list, el.id, el.area_name);
        });
      } else if (index == 1) {
        // window.alert("jinini");
        this.city = data[index].name;
        var data = await this.$http.get("sonArea/" + data[index].code);
        data.data.data.forEach((el) => {
          this.$set(this.bm.county_list, el.id, el.area_name);
        });
      } else if (index == 2) {
        this.county = data[index].name;
        this.tem = this.sheng + "," + this.city + "," + this.county;
        // console.log(this.tem);
      }
    },
    async beijing() {
      var { data: res_sheng } = await this.$http.get("sonArea/0");
      var { data: res_shi } = await this.$http.get(
        `sonArea/${this.list.province_id}`
      );
      console.log(res_shi);
      var { data: res_qu } = await this.$http.get(
        `sonArea/${this.list.city_id}`
      );
      console.log(res_qu);

      res_sheng.data.forEach((item) => {
        this.$set(this.bm.province_list, item.id, item.area_name);
      });
      res_shi.data.forEach((item) => {
        this.$set(this.bm.city_list, item.id, item.area_name);
      });
      res_qu.data.forEach((item) => {
        this.$set(this.bm.county_list, item.id, item.area_name);
      });
    },
    // 城市完成
    async cityConfirm(val) {
      // console.log(val);
      let { data } = await ok_up_user({
        city_id: val[1].code,
        district_id: val[2].code,
        province_id: val[0].code,
      });
      console.log(data);
      this.cityshow = false;
      this.getlist();
    },
    // 时间选择框的完成
    async confirm(val) {
      console.log(val);
      if (val.toLocaleDateString() == this.nowdate) {
        this.$toast("出生日期最少是当前日期的前一天");
      } else {
        this.birthdate = val.toLocaleDateString().split("/").join("-");
        let { data } = await ok_up_user({ birthday: this.birthdate });
        this.dateshow = false;
        this.getlist();
      }
    },
    // 时间取消
    cancel() {
      this.dateshow = false;
    },
    async getlist() {
      // 获取个人信息
      let { data } = await gets("userInfo");
      this.list = data.data;
      this.list.attr.forEach((item) => {
        if (item.attr_id) {
          this.classId = item.attr_val_id + " ";
        }
      });
      console.log(this.classId);
    },
    // 头像
    async takePhoto() {
      // 初始化
      let formdata = new FormData();
      // 往formdate中追加数据
      formdata.append("file", event.target.files[0]);
      // 读取接口 上传图片
      let { data: res } = await add_img(formdata);
      // 返回的图片数据
      let path = res.data.path;
      // 读取接口 进行修改
      let { data: re } = await ok_up_user({ avatar: path });
      if (re.code == 200) {
        this.getlist();
        this.toushow = false;
      }
    },
    async getcla() {
      let { data } = await getClass();
      this.classArr = data.data[0].value;
      data.data[0].value.map((item) => {
        this.$set(this.arrealist.province_list, item.id, item.name);
      });
    },
  },
  components: {
    Head,
  },
};
</script>

<style lang='scss' scoped>
.box {
  background: #f0f2f5;
  height: 100%;
}
.zqd_ul {
  background: #fff;
  margin: 2.66667vw 0;
  padding: 1.33333vw 4vw;
  li {
    height: 14.66667vw;
    line-height: 14.66667vw;
    display: flex;
    justify-content: space-between;
    position: relative;
    > span {
      font-size: 3.73333vw;
      color: #595959;
    }
    div {
      margin-right: 6.66667vw;
      img {
        width: 9.86667vw;
        height: 9.86667vw;
        border-radius: 50%;
        vertical-align: middle;
      }
      span {
        font-size: 3.7vw;
        color: #8c8c8c;
      }
    }
    .xue {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.zqd_ul > li::before {
  content: "";
  display: block;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  width: 2.66667vw;
  height: 2.66667vw;
  border-top: 1px solid #b7b7b7;
  border-right: 1px solid #b7b7b7;
}
.zqd_ul li::after {
  content: "";
  display: block;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 1px;
  background-color: #f5f5f5;
}
.zqd_ul #mobile::before {
  border: none;
}
.zqd_ul li:last-child::after {
  border: none;
}
.van-popup ul {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  li {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4.53333vw;
    font-weight: 300;
    color: #030303;
  }
}
input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
</style>
