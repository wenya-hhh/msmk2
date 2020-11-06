<template>
  <div class="zb_oto">
    <van-sticky>
      <header>
        <div class="back" @click="$router.go(-1)">
          <van-icon name="arrow-left" />
        </div>
        <h3>一对一辅导</h3>
        <div class="right" @click="$router.push('/search')">
          <van-icon name="search" />
        </div>
      </header>
    </van-sticky>
    <!-- 下拉菜单 -->
    <div class="of-head">
      <div
        :class="flag ? 'active' : ''"
        @click="flag ? (flag = !flag) : (flag = !flag) && (flags = false)"
      >
        <font>选择上课时间</font><i></i>
      </div>
      <div
        :class="flags ? 'active' : ''"
        @click="flags ? (flags = !flags) : (flags = !flags) && (flag = false)"
      >
        <font>选择老师条件</font><i></i>
      </div>
    </div>
    <!-- 选择上课时间 -->
    <div class="time" v-show="flag">
      <div class="date">
        <p>日期</p>
        <div class="weekday">
          <span>周一</span>
          <span>周二</span>
          <span>周三</span>
          <span>周四</span>
          <span>周五</span>
          <span>周六</span>
          <span>周日</span>
        </div>
        <div class="time-day">
          <p><font></font><span></span></p>
        </div>
      </div>
      <div class="rinle">
        <p>时段</p>
        <div class="ipt">
          <p @click="showss = true">
            <input placeholder="开始时间" disabled />
            <van-icon name="clock-o" />
          </p>
          <font>-</font>
          <p @click="showss = true">
            <input placeholder="结束时间" disabled /><van-icon name="clock-o" />
          </p>
        </div>
      </div>
    </div>
    <van-popup v-model="showss" position="bottom" :style="{ height: '42%' }">
      <van-datetime-picker
        v-model="currentTime"
        type="time"
        :min-hour="0"
        :max-hour="23"
      />
    </van-popup>

    <!-- 选择老师条件 -->
    <div class="teacher-module" v-show="flags">
      <div class="teacher_type tm-kind">
        <p>老师类型</p>
        <div>
          <span
            :class="index == item.level_id ? 'active' : ''"
            @click="act(item.level_id)"
            v-for="item in obj.otoTeacherLevel"
            :key="item.level_id"
            >{{ item.level_name }}</span
          >
        </div>
      </div>
      <div class="tm-kind">
        <p>只看</p>
        <div>
          <van-checkbox
            v-model="is_collect"
            @click="
              is_collect ? (arr.is_collect = '1') : (arr.is_collect = '0')
            "
            name="a"
            shape="square"
            size=".3rem"
          >
            已关注
            <template #icon="props">
              <img
                class="img-icon"
                :src="
                  props.checked
                    ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTBDMUJFQTBCNzRDMTFFOTlEMzU4OTdFRjlDNjMxNjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTBDMUJFQTFCNzRDMTFFOTlEMzU4OTdFRjlDNjMxNjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1MEMxQkU5RUI3NEMxMUU5OUQzNTg5N0VGOUM2MzE2MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1MEMxQkU5RkI3NEMxMUU5OUQzNTg5N0VGOUM2MzE2MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pr/wXDYAAAKySURBVHja7JmxattQFIYluaM8eKzboRAChjxAp8Yl7hZw6NC0g5cQx2OgTxD8BIWubfCSpVmCAx5j6mRpHiAQMIYOjTMGKo113P+Q/7YHtapjR74SJQd+jKQrnU/33nOu7rH745XzL3sMrUGr0AJUhHwnGQuhITSAOlA7tz/+FtfYjQEVoCa0AeUcOzaCWtAOgIfRi95fbqhC51DdIqRDX+LzfLTuVieBbkMHUF6dO4IaUInn3YSU5zMb9GFMzh8Adjtu6KuENPB9aAvqzbUb98c3477ulvHzAVrkpWvoJa4f6h6VObmnjk+gp/OGjAD36PNEjfYeXqCoQZtquPuM9CvHsgH2ir77aho0zdBLCvqqAue55Z78M/xvpsFnlQ2eeHyDnAqcnpOycRocqWyw5jGZG/vkZMc0y6rHFcfYcYZANcuCx4g3dpEhUM1S9CJrdzjFg1zm2S9QAI1jFLDNFu+57TzVLP6DGd/2IfPuyi3a+syPojdQDbqc1qE3A6Q7BWTUVnivawO0PiOkhq3bAN1MIFA2bYAuJQC6ZAM0iS983wZoKnYPeg/6P4KGCfgNbYCeJQB6ZgN0NwHQXRugH6HuHSC7fMbcQcf8VOvOCFnjM6xEvXxPvmCV43RCcIRs0+A9l7M4lO1yoNbefEJRfaftMrfMwvLdvKz0qK6cPcpQ6tR7uaGADtSJ5QyBapaBgHbUidcZAtUsHQFts2wiVoHKaROypFMxh8IooFKObql2UvorpAhZIIOxlpTMTXra4f5bbJG9XEgJsu38rpEGZPuVR4dMxNc8fsbcV7Y83Kf07ZClZur50T8bpBz9LrIQSFVNClbHLLMklWd9psNlBk5FXRPIt4B8rxN+1KosEuRTmqYBe/Jw0hIqDUr8cBjZnKL0WYpCxvWotsz8IfZTgAEAf3S9TaQBanUAAAAASUVORK5CYII='
                    : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAAXNSR0IArs4c6QAAAqpJREFUWAntmT1Lw0AcxpNIKYV0cOlQpRUkxS/hCzgKFieXLg6ugp9A/ASCq4KLi5NUcBR8mfwG0iDYog7t4JBAKcXW5znvQpqqg16bCjm43iV3vf/vnrtc6FPT+CG5rjuL5nKv11tDOY+cR7aRdSQfg7wiP1qWdYmy6jjO83cDm181NBqNfLvd3jdNc6vf70991Uf3PcR6R6yTTCazVygUOIGBNAQKFdeh4Cl6ZQd6ju/Cg8IVqHsRDjkAWqvVdtB4gJlZoU5XqJ+lUqlb27Zfcrkcl+zPqdls2r7vz3S73SUMtom8qgaFuj3Ud0ul0mFwT1WoJADPFSQ6u8jbmNmN6jPKEvGXEfsI2WEcwiJvKGWFonJPPqBdLDc63KXT6XKxWHwbJVx07Hq9Pt3pdKqAXZRtHvbsAvesWGI+OCFINw5IglEYxoZQrgTNSjbD5BGEGTwhi6cbG3llXMstYYYKbgM80NdsAPQ78hwVLStI1K/ihiScZOBDbEi2siUPc95jOvssJuIzYCEjFeUbRyQeQaoedxlhmScoX4si8ZxU9bjLCEueoMG7W9dhrmOSERaboP8iJaC6lylRNFFUtwK6x0v2aKKobgV0j5fs0URR3QroHi/Zo6NQNLBoaLPoDvDb8VqtVtj78rn0gXNGL+i3A+v+nud5wW85MhL0UQWRhpW6jLWMsNBDFSaqgqKrNikpYCEjFa3SNpF0q7RT4iaVDMKGlGxVC/bJM2yTEwWH+hFdNXU97pKxyaDiko2M4hylHY0Gj41ocGj9xQEbsh2FR0omyWYIUOE/wo6GzHR6CbsI2PtxbgPGYkzGJgNZsDcrys8XRi4bmP6FNf6JahiY2UT+2SCWXkGyxMa9oB2N6nHoNAh3GUldxjpmbDJEgwwsfbQR6k7MH2IfQYM7P4m00d0AAAAASUVORK5CYII='
                "
              />
            </template>
          </van-checkbox>
          <van-checkbox
            v-model="is_attended"
            @click="
              is_attended ? (arr.is_attended = '1') : (arr.is_attended = '0')
            "
            name="b"
            shape="square"
            size=".3rem"
            >上过课的
            <template #icon="props">
              <img
                class="img-icon"
                :src="
                  props.checked
                    ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTBDMUJFQTBCNzRDMTFFOTlEMzU4OTdFRjlDNjMxNjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTBDMUJFQTFCNzRDMTFFOTlEMzU4OTdFRjlDNjMxNjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1MEMxQkU5RUI3NEMxMUU5OUQzNTg5N0VGOUM2MzE2MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1MEMxQkU5RkI3NEMxMUU5OUQzNTg5N0VGOUM2MzE2MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pr/wXDYAAAKySURBVHja7JmxattQFIYluaM8eKzboRAChjxAp8Yl7hZw6NC0g5cQx2OgTxD8BIWubfCSpVmCAx5j6mRpHiAQMIYOjTMGKo113P+Q/7YHtapjR74SJQd+jKQrnU/33nOu7rH745XzL3sMrUGr0AJUhHwnGQuhITSAOlA7tz/+FtfYjQEVoCa0AeUcOzaCWtAOgIfRi95fbqhC51DdIqRDX+LzfLTuVieBbkMHUF6dO4IaUInn3YSU5zMb9GFMzh8Adjtu6KuENPB9aAvqzbUb98c3477ulvHzAVrkpWvoJa4f6h6VObmnjk+gp/OGjAD36PNEjfYeXqCoQZtquPuM9CvHsgH2ir77aho0zdBLCvqqAue55Z78M/xvpsFnlQ2eeHyDnAqcnpOycRocqWyw5jGZG/vkZMc0y6rHFcfYcYZANcuCx4g3dpEhUM1S9CJrdzjFg1zm2S9QAI1jFLDNFu+57TzVLP6DGd/2IfPuyi3a+syPojdQDbqc1qE3A6Q7BWTUVnivawO0PiOkhq3bAN1MIFA2bYAuJQC6ZAM0iS983wZoKnYPeg/6P4KGCfgNbYCeJQB6ZgN0NwHQXRugH6HuHSC7fMbcQcf8VOvOCFnjM6xEvXxPvmCV43RCcIRs0+A9l7M4lO1yoNbefEJRfaftMrfMwvLdvKz0qK6cPcpQ6tR7uaGADtSJ5QyBapaBgHbUidcZAtUsHQFts2wiVoHKaROypFMxh8IooFKObql2UvorpAhZIIOxlpTMTXra4f5bbJG9XEgJsu38rpEGZPuVR4dMxNc8fsbcV7Y83Kf07ZClZur50T8bpBz9LrIQSFVNClbHLLMklWd9psNlBk5FXRPIt4B8rxN+1KosEuRTmqYBe/Jw0hIqDUr8cBjZnKL0WYpCxvWotsz8IfZTgAEAf3S9TaQBanUAAAAASUVORK5CYII='
                    : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAAXNSR0IArs4c6QAAAqpJREFUWAntmT1Lw0AcxpNIKYV0cOlQpRUkxS/hCzgKFieXLg6ugp9A/ASCq4KLi5NUcBR8mfwG0iDYog7t4JBAKcXW5znvQpqqg16bCjm43iV3vf/vnrtc6FPT+CG5rjuL5nKv11tDOY+cR7aRdSQfg7wiP1qWdYmy6jjO83cDm181NBqNfLvd3jdNc6vf70991Uf3PcR6R6yTTCazVygUOIGBNAQKFdeh4Cl6ZQd6ju/Cg8IVqHsRDjkAWqvVdtB4gJlZoU5XqJ+lUqlb27Zfcrkcl+zPqdls2r7vz3S73SUMtom8qgaFuj3Ud0ul0mFwT1WoJADPFSQ6u8jbmNmN6jPKEvGXEfsI2WEcwiJvKGWFonJPPqBdLDc63KXT6XKxWHwbJVx07Hq9Pt3pdKqAXZRtHvbsAvesWGI+OCFINw5IglEYxoZQrgTNSjbD5BGEGTwhi6cbG3llXMstYYYKbgM80NdsAPQ78hwVLStI1K/ihiScZOBDbEi2siUPc95jOvssJuIzYCEjFeUbRyQeQaoedxlhmScoX4si8ZxU9bjLCEueoMG7W9dhrmOSERaboP8iJaC6lylRNFFUtwK6x0v2aKKobgV0j5fs0URR3QroHi/Zo6NQNLBoaLPoDvDb8VqtVtj78rn0gXNGL+i3A+v+nud5wW85MhL0UQWRhpW6jLWMsNBDFSaqgqKrNikpYCEjFa3SNpF0q7RT4iaVDMKGlGxVC/bJM2yTEwWH+hFdNXU97pKxyaDiko2M4hylHY0Gj41ocGj9xQEbsh2FR0omyWYIUOE/wo6GzHR6CbsI2PtxbgPGYkzGJgNZsDcrys8XRi4bmP6FNf6JahiY2UT+2SCWXkGyxMa9oB2N6nHoNAh3GUldxjpmbDJEgwwsfbQR6k7MH2IfQYM7P4m00d0AAAAASUVORK5CYII='
                "
              />
            </template>
          </van-checkbox>
        </div>
      </div>
      <!-- 性别 -->
      <div class="tm-kind">
        <p>性别</p>
        <div><span @click="sex">男</span><span @click="sex">女</span></div>
      </div>
      <!-- 年级 -->
      <div class="teacher_type tm-kind">
        <p>{{ obj.attrList[0].attr_name }}</p>
        <div>
          <span
            :class="active == item.attr_val_id ? 'active' : ''"
            @click="acti(item.attr_val_id)"
            v-for="item in obj.attrList[0].child"
            :key="item.attr_val_id"
            >{{ item.attr_val_name }}</span
          >
        </div>
      </div>
      <!-- 学课 -->
      <div class="teacher_type tm-kind">
        <p>{{ obj.attrList[1].attr_name }}</p>
        <div>
          <span
            :class="ati == i.attr_val_id ? 'active' : ''"
            @click="activ(i.attr_val_id)"
            v-for="i in obj.attrList[1].child"
            :key="i.attr_val_id"
            >{{ i.attr_val_name }}</span
          >
        </div>
      </div>
    </div>
    <div class="oto-btn" v-show="flag || flags">
      <button @click="chongzhi">重置</button
      ><button @click="getList">确定</button>
    </div>
    <!-- 列表展示 -->
    <div class="a" v-show="!flag && !flags">
      <div
        class="zb_otItem"
        @click="token?$router.push('/oto-plan?id=' + item.teacher_id):show=true"
        v-for="item in list"
        :key="item.teacher_id"
      >
        <van-image round width=".8rem" height=".8rem" :src="item.avatar" />
        <div>
          <p>
            <span>{{ item.real_name }} </span>
            <span class="sp"> {{ item.is_collect == 0 ? "" : "已关注" }}</span>
          </p>
          <p>{{ item.sex == 0 ? "男" : "女" }} {{ item.teach_age }}年教龄</p>
        </div>
        <div class="yuyue">预约</div>
      </div>
    </div>


    <!-- 遮罩层 -->
    <app-liji :show="show" @s="s"></app-liji>
  </div>
</template>

<script>
import appLiji from "../components/Liji";
import { Toast } from "vant";
import { getCourse, getOtoCourseOptions } from "../util/api";

export default {
  // 组件名称
  name: "demo",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {appLiji},
  // 组件状态值
  data() {
    return {
      show:false,
      token:localStorage.getItem('token')||'',
      // 日期
      currentTime:'',
      showss: false,
      list: [],
      obj: {},
      result: [],
      flag: false,
      flags: false,
      index: "",
      active: "",
      ati: "",
      arr: {
        page: 1,
        limit: 10,
        start_time: "",
        end_time: "",
        level_id: "",
        is_collect: "",
        is_attended: "",
        sex: "",
        attr_val_id: "",
      },
      is_collect: false,
      is_attended: false,
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    s(val) {
      this.show = val;
    },
    // 重置
    chongzhi() {
      (this.arr = {
        page: 1,
        limit: 10,
        start_time: "",
        end_time: "",
        level_id: "",
        is_collect: "",
        is_attended: "",
        sex: "",
        attr_val_id: "",
      }),
        (this.index = ""),
        (this.active = ""),
        (this.ati = ""),
        (this.is_collect = false),
        (this.is_attended = false),
        this.getList();
    },
    // 类型
    act(index) {
      this.index = index;
      this.arr.level_id = index;
      console.log(this.arr);
    },
    // 年级
    acti(index) {
      this.active = index;
      this.arr.attr_val_id = `${index},${this.ati}`;
    },
    // 学课
    activ(index) {
      this.ati = index;
      this.arr.attr_val_id = `${this.active},${index}`;
    },
    // 性别
    sex() {
      [...event.target.parentNode.childNodes].forEach((item) => {
        item.classList.remove("active");
      });
      event.target.classList.add("active");

      [...event.target.parentNode.childNodes].forEach((item) => {
        if (item.classList.contains("active")) {
          if (item.html == "男") {
            this.arr.sex = "0";
          } else {
            this.arr.sex = "1";
          }
        }
      });
    },
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },

    async getList() {
      this.flag = false;
      this.flags = false;
      let { data } = await getCourse(this.arr);
      this.list = data.data;
      // console.log(this.list);
      let { data: res } = await getOtoCourseOptions();
      this.obj = res.data;
      // console.log(this.obj);
    },
  },
  created() {},
  mounted() {
    this.getList();
  },
};
</script> 

<style lang="scss" scoped>
// 日期
.time {
  margin: 2.66667vw;
  > div {
    background-color: #fff;
    border-radius: 0.1rem;
    margin-bottom: 0.3rem;
    > p {
      font-size: 3.2vw;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #595959;
      padding: 4vw 0 2.66667vw 2.66667vw;
    }
    .weekday {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 0.4rem;
      span {
        font-size: 2.66667vw;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #595959;
      }
    }
    .ipt {
      display: flex;
      margin-left: 3.46667vw;
      justify-content: space-around;
      align-items: center;
      p {
        width: 38vw;
        height: 8vw;
        background: #fff;
        border-radius: 1.06667vw;
        border: 0.26667vw solid #bfbfbf;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 0.2rem;
        input {
          border: none;
          width: 26.66667vw;
          height: 6.66667vw;
          line-height: 6.66667vw;
          font-size: 3.46667vw;
          padding-left: 2.66667vw;
        }
      }
      font {
        width: 9.33333vw;
        height: 8.53333vw;
        line-height: 8.53333vw;
        text-align: center;
        color: #b7b7b7;
        font-size: 3.73333vw;
      }
    }
  }
  .rinle {
    height: 25.06667vw;
  }
}
// 下拉菜单
.of-head {
  display: flex;
  height: 11.2vw;
  background: #fff;
  div {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font {
      font-size: 4vw;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #8c8c8c;
    }
    i {
      width: 2.4vw;
      height: 1.33333vw;
      background-size: 100% 100%;
      margin-left: 1.33333vw;
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAASCAYAAABM8m7ZAAAAAXNSR0IArs4c6QAAAU1JREFUSA3lk71qAkEQx++2zttYBoQ092GVBxFSGBJCFAySIKIpAmnzBqnS3B0EAmlS+jTayG3+/8WBPZU9L3FtHJDZ+fzdzqxBcGoSyoXzPG+XZXkZhuGZ1lpBK8QYV7R5Xvu2bMakBtrkrW3bv1RKvcdx/IZ80zgoiuIc0G8W0elZLtI0/eJNAkA7R4JybC0yDRjGDw3fAs4K4/4kx4Ax9w+cpz7BgGKouhtF0Zycyk6zLJsi2PPxAQB3kyR5ld7mxmIgcI2EmdgH1Fc2lH0rYDo8wHt4xS/sbcsWmMEDwm8AfbaBcq7sWJyi/7NzvN47PNqx9NrUO28sSX+9OaB9F5T9nWAmNIUDOgT0kbUuqQWzeF84/hEjQB9cQIk5dyxJol07B/QJH3gvuXW6EZjNdsEBnQB6Wwez43uN2i7g2LlHwDT8C/wGTaHs9wsfI3k1vlOHEgAAAABJRU5ErkJggg==")
        no-repeat;
      background-size: 100% 100%;
    }
  }
  .active {
    font {
      color: #eb6100;
    }
    i {
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAASCAYAAABM8m7ZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTBDMUJFQTRCNzRDMTFFOTlEMzU4OTdFRjlDNjMxNjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTQ0RDlCOUNCNzRDMTFFOTlEMzU4OTdFRjlDNjMxNjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1MEMxQkVBMkI3NEMxMUU5OUQzNTg5N0VGOUM2MzE2MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1MEMxQkVBM0I3NEMxMUU5OUQzNTg5N0VGOUM2MzE2MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Prbv5ocAAAD7SURBVHjaYvz//z8DqeBvGGMNkKoEYk4gbmRe9b+RVDMYSbUYaGkHkCpHE+4FWl5CijlMJFraisVSECgGyvXQxGKgwU1AqgqPEpIsZyLS0nogVUuEUqItJxjHQIOqgVQLiWmHYJwzEbC0ggxLifI5Ex5LS4FUOwP5AK/lWIMaqKEQSPUxUAdgDXYmLJbmUdFSnD5nQrM0G0hNZKA+wLCcCcnSdCA1mYF2AGR5N0ocAwUMgOwzQMzMQHvgB4zzzTAfO9PJUhCwQA7qs3SyFJSFtqFkJ2BwJwGpYGhVBxL8B8XI7H945AixvwDxemAwHyKrWqQWYGIYIAAQYADdQHEe2IBzhgAAAABJRU5ErkJggg==")
        no-repeat;
      background-size: 100% 100%;
    }
  }
}
.img-icon {
  height: 0.3rem;
}
.zb_oto {
  height: 100%;
  background-color: #f0f2f5;
  header {
    height: 0.88rem;
    line-height: 11.73333vw;
    background-color: #fff;
    text-align: center;
    font-size: 0.3rem;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 10px;
    align-items: center;
    h3 {
      font-weight: 400;
      color: #595959;
    }
    .van-icon {
      font-size: 0.3rem;
    }
  }
  //   列表样式
  .zb_otItem {
    width: 95%;
    height: 1.62rem;
    margin: 0.1rem auto;
    background: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 0.1rem;
    div {
      width: 4rem;
      p {
        color: #b7b7b7;
        font-size: 3.2vw;
        span {
          font-size: 0.33rem;
          color: #595959;
        }
        .sp {
          font-size: 2.93333vw;
          color: #ea7a2f;
        }
      }
    }
    .yuyue {
      width: 1.4rem;
      height: 0.62rem;
      line-height: 0.62rem;
      background: #ebeefe;
      border-radius: 0.6rem;
      font-size: 3.73333vw;
      font-weight: 400;
      color: #eb6100;
      border: none;
      text-align: center;
    }
  }
  //   下拉菜单
  .van-dropdown-menu {
    font-size: 0.3rem !important;
    .teacher {
      min-height: 12rem;
      background: #fff;
      border-top: 1px solid #f1f1f1;
    }
  }
}
.teacher-module {
  padding: 0 4vw 10.66667vw;
  background: #fff;
  border-top: 1px solid #f1f1f1;
  .teacher_type {
    div {
      flex-wrap: wrap;
    }
  }
}
.tm-kind {
  padding-bottom: 2.66667vw;
  border-bottom: 1px solid #f1f1f1;
  p {
    padding: 4.26667vw 0 2.66667vw;
    font-size: 3.2vw;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #595959;
  }
  div {
    display: flex;
    span {
      margin: 0 2vw 1.86667vw;
      width: 18.7vw;
      height: 8.8vw;
      background: #f5f5f5;
      border-radius: 0.8vw;
      font-size: 3.46667vw;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #646464;
      text-align: center;
      line-height: 8.8vw;
    }
    .active {
      color: #eb6100;
      background: #ebeefe;
    }
  }
}
.oto-btn {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 11.73333vw;
  button {
    width: 50%;
    display: inline-block;
    line-height: 11.73333vw;
    height: 11.73333vw;
    font-size: 4.53333vw;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    color: #eb6100;
    background: #fff;
    border: none;
    z-index: 99;
  }
  button:nth-child(2) {
    background: #eb6100;
    color: #fff;
  }
}
</style>
