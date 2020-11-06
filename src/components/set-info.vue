<template>
  <div class="box">
    <header>
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <h3>修改个人信息</h3>
      <span @click="baocun">保存</span>
    </header>
    <div>
      <!-- 昵称 -->
      <template v-if="tag == 'nickname'">
        <input
          type="text"
          placeholder="最多可输入15个字"
          maxlength="15"
          v-model="value"
        />
      </template>
      <!-- 性别 -->
      <template v-if="tag == 'sex'">
        <ul>
          <li @click="value = 0" :class="value == 0 ? 'active' : ''">男</li>
          <li @click="value = 1" :class="value == 1 ? 'active' : ''">女</li>
        </ul>
      </template>
      <!-- 学课 -->
      <template v-if="tag == 'subjects'">
        <div class="subjects">
          <ul>
            <li v-for="item in arr" :key="item.id">
              <input
                type="checkbox"
                name=""
                id=""
                :checked="str.includes(item.id)"
                class="check"
                @click="checked(item.id, $event)"
              />
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { ok_up_user } from "../util/api";
export default {
  // 组件名称
  name: "demo",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      tag: this.$route.query.tag,
      value: this.$route.query.value,
      arr: [
        { id: 7, name: "语文" },
        { id: 8, name: "数学" },
        { id: 9, name: "英语" },
        { id: 12, name: "物理" },
        { id: 13, name: "化学" },
        { id: 24, name: "生物" },
        { id: 25, name: "政治" },
        { id: 26, name: "信息技术" },
      ],
      str: "",
      arr1: [],
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async baocun() {
      if (this.tag == "nickname") {
        let { data } = await ok_up_user({ nickname: this.value });
      } else if (this.tag == "sex") {
        let { data } = await ok_up_user({ sex: this.value });
      } else if ((this.tag = "subjects")) {
        let { data } = await ok_up_user({
          user_attr: JSON.stringify(this.arr1),
        });
        console.log(data);
      }
      //   console.log(data);
      this.$router.push("/info");
    },
    checked(id, event) {
      let obj = { attr_id: 2, attr_val_id: id };
      if (event.target.checked) {
        let flag = JSON.stringify(this.arr1).indexOf(JSON.stringify(obj));
        if (flag == -1) {
          this.arr1.push(obj);
        }
      } else {
        let index = this.arr1.findIndex((item) => {
          return item.attr_val_id == id;
        });
        this.arr1.splice(index, 1);
      }
    },
  },
  created() {},
  mounted() {
    console.log(this.$route.query.select);
    this.$route.query.select.map((item) => {
      //   console.log(item.attr_val_id);
      if (item.attr_id == 2) {
        this.arr1.push({ attr_id: 2, attr_val_id: item.attr_val_id });
        this.str += item.attr_val_id + ",";
      } else {
        this.arr1.push({ attr_id: 1, attr_val_id: item.attr_val_id });
      }
    });
    console.log(this.str);
    // console.log(this.str.includes);
  },
};
</script> 

<style lang="scss" scoped>
.box {
  height: 100%;
  background: #f0f2f5;
  header {
    height: 11.73333vw;
    z-index: 999;
    width: 100%;
    background: #fff;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 2.66667vw;
    align-items: center;
    font-size: 4vw;
    h3 {
      font-size: 4.8vw;
      font-weight: 400;
    }
  }
  > div {
    margin-top: 3vw;
    // 昵称
    input {
      display: block;
      box-sizing: border-box;
      width: 100%;
      min-width: 0;
      line-height: 12.8vw;
      height: 12.8vw;
      text-indent: 4vw;
      margin: 0;
      padding: 0;
      color: #323233;
      text-align: left;
      background-color: transparent;
      border: 0;
      resize: none;
      font-size: 4vw;
      background-color: #fff;
    }
    // 性别
    ul {
      background: #fff;
      margin: 0.26667rem 0;
      margin: 2.66667vw 0;
      padding: 0.13333rem 0.4rem;
      padding: 1.33333vw 4vw;
      li {
        height: 14.66667vw;
        line-height: 1.46667rem;
        line-height: 14.66667vw;
        font-size: 0.37333rem;
        font-size: 3.73333vw;
        color: #595959;
        position: relative;
      }
      :nth-child(1):after {
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
      .active {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAcCAYAAAAAwr0iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzlBMTk5NkVCNzRDMTFFOTlEMzU4OTdFRjlDNjMxNjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzlBMTk5NkZCNzRDMTFFOTlEMzU4OTdFRjlDNjMxNjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDOUExOTk2Q0I3NEMxMUU5OUQzNTg5N0VGOUM2MzE2MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDOUExOTk2REI3NEMxMUU5OUQzNTg5N0VGOUM2MzE2MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvL8dXQAAAHGSURBVHjaYvz//z/DQALGP6F0t1MRiIOB+BEQr2ahs+UaQHwMiAWhfF0mOlrOA8RrkSwHAXt6OmAOEGuhic2ilwMKgDgcTWwuEC+hRyK0AeL9QIyc3s4BsTUQ/6C1AySglkkiib0DYmMgfgDi0DIKQD5eiWY5qNCJgVlOawd0ALEdmlgTEG+nR0EUAipk0MR2ALE3EP+jtQPUgfg0EPMiiT2Axvs7dMVMNChs1qFZ/hMaIu+waWCiQ2GTA8RncWkAOcAAiK8C8VcgngzEbFQsbOZBHYW3NtwJpN2QxECFRhAQf6BWYYNPIygEnqOJOQLxESCWI6GwWYVm+XtolfuDkGaQA4qA+DiauDYQnwBiPTILm2jkwoaQA0Cp0wmaepEByNBDWAoTkgsbYltEIMf0QhMTMgAFYyQQbyC3sCG1SVYCxF0gOSSxv0CcCcSz8RQ2D4HYCFd+J7VNGAetr9GbbLVAPAGIT6Ll95/QFH+Wmo1SL2gQc6GJgxKXAppYKqH8Tm6r2BKItwCxEB41oMImmZbNck0gBhVWsljkiCpsCGVDQuA6jvi9BMT+lFhOanXMDMQ+0EIKVHfsAuLvFPeMBrprBhBgADxzbshcfaUMAAAAAElFTkSuQmCC)
          no-repeat 100%;
        background-size: 0.4rem 0.4rem;
        background-size: 4vw 4vw;
      }
    }
    // 学课
    .subjects {
      ul {
        li {
          height: 14.66667vw;
          line-height: 14.66667vw;
          font-size: 3.73333vw;
          color: #595959;
          input {
            width: 6.66667vw;
            height: 6.66667vw;
            margin-top: 4vw;
            margin-right: 2.66667vw;
            float: left;
          }
          span {
            display: inline-block;
            height: 14.66667vw;
            line-height: 14.66667vw;
          }
        }
      }
      li:after {
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
    }
  }
}
</style>
