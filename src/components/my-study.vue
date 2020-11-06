<template>
  <div>
    <!-- 表头 -->
    <van-nav-bar title="我的学习" left-text="" left-arrow @click-left="zqd_go()">
      <template #right>
        <!-- <van-icon name="search" size="18" /> -->
        <van-icon name="apps-o"  @click="$router.push('/study-calendar')"/>
      </template>
    </van-nav-bar>
    <!--  -->

    <van-tabs @click="ass">
      <van-tab v-for="(item, index) in zqd_arr" :title="item.name + item.num" :key="index" :name="item.type">
        <ul class="zqd_ul"  v-if="item.type == 2">
          <!-- 直播课 -->
            <el-card v-for="(k, i) in zqd_list" :key="i">
              <li>
                <p class="p1">{{ k.title }}</p>
                <p class="p2">
                  <img
                    src="data:image/png;base64,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"
                    alt=""
                  />
                  <span>{{ k.start_play_date | timefnxq }}~{{ k.end_play_date | timefnxq }}|共{{ k.section_num }}课时</span>
                </p>
                <div id="div">
                  <div></div>
                  <span>已学习{{ k.progress_rate }}%</span>
                </div>
              </li>
            </el-card>
        </ul>
        <!-- 如果没有课程就显示这个没有的ul -->
        <ul v-show="zqd_list.length==0" id="ul">
              <img src="https://wap.365msmk.com/img/empty@2x.a2fa524d.png" alt="" />
              <li>还没有课程，快去选择课程学习吧</li>
              <button @click="zqd_xuanze()">选择课程</button>
        </ul>
            <!-- 点播课 -->
            <ul  v-if="item.type == 5" class="zqd_ul">
                  <!-- <template> -->
                  <el-card v-for="(k, i) in zqd_list" :key="i">
                    <li>
                      <p class="p1">{{ k.title }}</p>
                      <p class="p2">
                        <img
                          src="data:image/png;base64,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"
                          alt=""
                        />
                        <span>共{{ k.section_num }}课时</span>
                      </p>
                      <div id="div">
                        <div :class="k.progress_rate==100?'active':''"></div>
                        <span>已学习{{ k.progress_rate }}%</span>
                      </div>
                    </li>
                  </el-card>
                <!-- </template> -->
            </ul>

        <ul  v-if="item.type == 8" class="zqd_ul">
               <!-- 音频课 -->
          <!-- <template> -->
            <el-card v-for="(k, i) in zqd_list" :key="i">
              <li>
                <p class="p1">{{ k.title }}</p>
                <p class="p2">
                  <img
                    src="data:image/png;base64,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"
                    alt=""
                  />
                  <span>共{{ k.section_num }}课时</span>
                </p>
                <div id="div">
                  <div :class="k.progress_rate==100?'active':''"></div>
                  <span>已学习{{ k.progress_rate }}%</span>
                </div>
              </li>
            </el-card>
          <!-- </template> -->
        </ul>



           <!-- 图文课 -->
            <ul  v-if="item.type == 10" class="zqd_ul">
              <!-- <template> -->
                <el-card v-for="(k, i) in zqd_list" :key="i">
                  <li>
                    <p class="p1">{{ k.title }}</p>
                    <p class="p2">
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAGdElEQVRYR9WYbYxcVRnH//9z7wyUmdkFEsLa2rgBAsRA4gcTXzAmRFONCgKhFQQCpsimiuvO3Du73cXGa8W2u3fu7FITJYUoEihkU2khQpAPUGIE/WgCJqIi7Sr4hoXOomXmnvOY09wlO9OZ7p3eJcpJJpnMnPuc333ezvM8xHtk8T3Cicygc3Nz52qtP2mMuZTkMIBB4LjcN0TksOM4LyilnhkbG/tbFqX0DRoEgRocHDwXwGVxHH+Z5AYAhRUg3gLwtFJqL8ln161b9/dNmzbpfsD7Ap2bm7sojuMvAbgBwAUAFAB74AKA10TkCMkjIiIAziZ5JoAhAB8A4ACwv/8ewDyAh3zf/21a2FSgQRC4pVJps4iMATgfQI7kGwCeMMbsE5EXROQtx3GaWuu37eGO45ymtc4bY85wXfdSpdRVInIFgLMAtAC8QjJqNBo/DoKguRLwiqBBEBQLhcIWAHeSzAF4neR+x3G29et3O3fuPCufz0+LyBcBnCMiLZLf01rPTkxMNE4Ge1LQKIouFJEAwHUArKZ+aoz54fDw8K/69bEliPn5eefQoUMfJjkC4HoApwHYT3LS87yXesH2BLWaLBaLewBsTPwwUkpFlUrlXyuZKc3/u3btGnRdd5zkmIhY2Hml1O295HcFtT5ZKBTKJKcBNEnuajQa24MgML0g6vX6eVrrKft/tVq9NQ2szSClUqkqIt8BkFdKBUePHt0RBEHc+XxX0CiKRowxuwEYkvXFxcVtJ4O0QqMo+qiIPG+/+76/ou8vgVjYgYGBKa31HSQVyarnefbstnWCwCQFHQBwEckHSX4zjblPFdTSTE9Pl1zX/YGI2Lz8Z8dxNoyNjf1uOWkbqH27YrH4LQD286Yx5qrx8fFfpjFjFlArf2Zm5jKl1MNJ3v3u4uJimwu0gc7Ozr5Pa30QwIUk71m/fv2WtNGdFdRmg4WFhVqSq19SSn2+Uqn8YUlJbaBRFG0UkYdJHnUc5+J+8mRWUAu0e/fuc5rNpjX5IMnNnufd1xU0DMNHSF4tInur1aq9JlOv1QC1h9VqtR8B+IqIPF6tVr9wAqitguI4/iOA00VkY7Va3Z+aMkPUd54RhuGnST4pIm+7rntBuVx+ze55x/SJ2W2x8IoxZsP4+LgtHlKv1dJoEifPARgmeZPneQ+0gYZhuJ3kNgDPa62vnZiYeDU15Spq1NYDuVzucQAfs2J93/fbQGu12v0AbhKRJ0je7Pv+P/8XoDan2jRF8nMADvi+f3Wn6R8VkSsBPKi13rJSNdP5Eqtl+nq9vsYYc09S8x70ff/yTo0+BuAKEXnAGPO1LKBpLOE4zuZyuWwjvG2Vy+U1a9eu3UPyRgBdQVfN9FlAl5ve1r2e513TGUy2ML4DwHNa6439BpMt2/L5/EfSQCZ7XqxUKn/p3J8E088AfBzArO/7lTbQer1+nTHmIQAvt1qtz0xOTr5zffVxeOatMzMzQ0opW1+cp5S6pVKp/KQNNGvCz0yYCFgx4SfX1/GAInm/53k3r9bh/ciJomiPiHwVwM993//s0rNtRUli/r12eNBqtc6fnJw80s8hWffOzs6eGcfxy0mbfZvv+/d2Bc1S5mWF7KvMs5sPHz5su84JAHaQcGW1Wv11Vog0z4dhaDPGPMl1AHaWSqXtIyMjtv8/vk5oRWq12gft1ZVMQu6L47i8devWN9Mcdqp7wjAskPw+ABsXtlra0DlFWbXm7lQhl5o7Y4zN4XZENO77/l2d8nq1y/lisbgVQEDyPwC2NxqNcKVOtF/YpEf7hojsILnG9nn5fD4YHR09PhZavnq2tfYqcxzHtgJ2/BIrpe5stVp39VsD9IK35nYcp6y1niR5unW3ZrN529TU1Ovdnkk90rEVt1Jqn9b67tUa6YjI9SSzjXSW3qper58N4PbEh1wAr5Lcl8vldoyOjv6jH3PbPGmM+bYx5hqS77eWAlBvNpu1XprsGfXdDrYjnmKx+HWSFRFZC8AC28vggG0EXdd98dixY8eUUnEul4sXFhYwNDTkGmNcO34keQlJO8O61s5Nk1nWXwGE+Xz+7m4+mdpHuwH/3w9yl0Nb7Q4MDAyLyCeMMVZDl5M842QuICL/JvkLAPuUUgcLhcKh5ck8jfukHmb1EmavXWPMp0TkQ8k02o7D7bIT6T8ppX5D8qmltjcNVN9Rf6pC343nMmv03YDqJvO/L6pVWKmfOusAAAAASUVORK5CYII="
                        alt=""
                      />
                      <span>共{{ k.section_num }}课时</span>
                    </p>
                    <div id="div">
                      <div :class="k.progress_rate==100?'active':''"></div>
                      <span>已学习{{ k.progress_rate }}%</span>
                    </div>
                  </li>
                </el-card>
              <!-- </template> -->
            </ul>

             <!-- 面授课 -->
            <ul  v-if="item.type == 7" class="zqd_ul">
              <!-- <template> -->
                <el-card v-for="(k, i) in zqd_list" :key="i">
                  <li>
                    <p class="p1">{{ k.title }}</p>
                    <p class="p2">
                      <img
                        src="data:image/png;base64,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"
                        alt=""
                      />
                      <span>共{{ k.section_num }}课时</span>
                    </p>
                    <div id="div">
                      <div :class="k.progress_rate==100?'active':''"></div>
                      <span>已学习{{ k.progress_rate }}%</span>
                    </div>
                  </li>
                </el-card>
              <!-- </template> -->
            </ul>

            <!-- 会员课 -->
            <ul  v-if="item.type == 11" class="zqd_ul">
              <!-- <template> -->
                <el-card v-for="(k, i) in zqd_list" :key="i">
                  <li>
                    <p class="p1">{{ k.title }}</p>
                    <p class="p2">
                      <img
                        src="data:image/png;base64,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"
                        alt=""
                      />
                      <span>共{{ k.section_num }}课时</span>
                    </p>
                    <div id="div">
                      <div :class="k.progress_rate==100?'active':''"></div>
                      <span>已学习{{ k.progress_rate }}%</span>
                    </div>
                  </li>
                </el-card>
              <!-- </template> -->
            </ul>


        <!-- 内容 {{ index }} -->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { gets } from '../util/api';
import { Button } from 'vant';
export default {
  data() {
    return {
      // 选项卡切换
      zqd_arr: [],
      // 数据
      zqd_list: [],
    };
  },
  created() {},
   mounted() {
     this.zqd_huo(2)
  },
  methods: {
    // 获取数据
   async zqd_huo(i){
        let { data } = await gets('myStudy/'+i);
        console.log(data);
        this.zqd_arr = data.data.typeNum;
        // console.log(this.zqd_arr);
        this.zqd_list = data.data.courseList;
    },
    // 返回
    zqd_go() {
      this.$router.go(-1);
    },
      // 点击标签传递tpye值
    ass(i){
      // console.log(i)
    //  调用获取的方法在执行一次
      this.zqd_huo(i)
    },
    // 点击按钮跳转选择课程
    zqd_xuanze(){
      this.$router.push('/course')
      sessionStorage.active=1
    }

  },
  components: {},
};
</script>

<style scoped lang="scss">
.zqd_ul {
  width: 7.2rem;
  height: 2.8rem;
  box-sizing: border-box;
  // padding: 0.4rem 0.3rem;
  margin-left: 0.1rem;
  li {

    height: 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    // margin-top: 0.4rem;
    img {
      width: 0.26rem;
      height: 0.26rem;
    }
    .p1 {
      width: 6rem;
      font-size: 0.3rem;
    }
    .p2 {
      font-size: 0.25rem;
    }
    #div {
      display: flex;
      height: 0.5rem;
      line-height: 0.5rem;
      > div {
        width: 2.65rem;
        height: 0.07rem;
        background-color: #f5f5f5;
      }
    }
    // div {

    // }
  }
}
#div .active{
  background: orange !important;
  // z-index: 999;
}

#ul{
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  >img{
    width: 1.7rem;
    height: 2.3rem;

  }
  button{
    width: 1.68rem;
    height: .0.53rem;
    line-height: 0.53rem;
    background: #EB6100;
    color: #fff;
    border: 0;
    margin-top: 0.2rem;
  }
}
</style>
