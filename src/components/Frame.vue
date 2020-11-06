<!-- 拖拽滑动 -->
<template>
  <div>
    <div
      id="default_drag_comp"
      @click="goNext"
      @touchstart="down"
      @touchmove="move"
      @touchend="end"
      v-show="!show"
    >
      <van-icon name="phone-o" />
    </div>
    <van-overlay :show="show">
      <div class="wrapper" @click.stop>
        <div class="block">
          <div class="header">
            <p>给我们留言</p>
            <van-icon name="arrow-down" @click="show = false" />
          </div>
          <div class="kuEafi">
            您好，很抱歉我们暂时无法为您提供服务，如需帮助，请留言，我们将尽快联系并解决您的问题
          </div>
          <ul>
            <li>
              <p>手机</p>
              <input type="text" name="" id="" placeholder="请输入" />
            </li>
            <li>
              <p>留言内容 <span> *</span></p>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="请输入"
              ></textarea>
            </li>
            <van-button type="info" block>提交</van-button>
          </ul>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import bus from '@/assets/bus'
export default {
  name: "defaultDrag",
  data() {
    return {
      show: false,
      flags: false,
      position: { x: 0, y: 0 },
      nx: "",
      ny: "",
      dx: "",
      dy: "",
      xPum: "",
      yPum: "",
    };
  },

  components: {},

  computed: {},

  mounted() {

  },
  created () {
    // 接受布尔值，显示与隐藏
    bus.$on('zqd',(res)=>{
      // console.log(res)
      this.show=res
    })
  },

  methods: {
    goNext() {
      this.$emit("goNext");
      this.show = true;

    },
    // 实现移动端拖拽
    down() {
      let default_drag_comp = document.querySelector("#default_drag_comp");
      this.flags = true;
      var touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      this.maxW = document.body.clientWidth - default_drag_comp.offsetWidth;
      this.maxH = document.body.clientHeight - default_drag_comp.offsetHeight;

      this.position.x = touch.clientX - default_drag_comp.offsetLeft;
      this.position.y = touch.clientY - default_drag_comp.offsetTop;
      this.dx = touch.clientX;
      this.dy = touch.clientY;
    },
    move(event) {
      event.preventDefault();
      let default_drag_comp = document.querySelector("#default_drag_comp");
      if (this.flags) {
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.nx = touch.clientX - this.position.x;
        this.ny = touch.clientY - this.position.y;

        if (this.nx < 0) {
          this.nx = 0;
        } else if (this.nx > this.maxW) {
          this.nx = this.maxW;
        }

        if (this.ny < 0) {
          this.ny = 0;
        } else if (this.ny >= this.maxH) {
          this.ny = this.maxH;
        }

        default_drag_comp.style.left = this.nx + "px";
        default_drag_comp.style.top = this.ny + "px";
        //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
        document.addEventListener(
          "touchmove",
          function () {
            // event.preventDefault();
          },
          false
        );
      }
    },
    //鼠标释放时候的函数
    end() {
      this.flags = false;
    },
  },
};
</script>
<style scoped lang="scss">
#default_drag_comp {
  width: 0.62rem;
  height: 0.62rem;
  border-radius: 50%;
  border: 2px solid #ffffff;
  background: rgb(0, 122, 255);
  position: fixed;
  z-index: 1000;
  bottom: 0.8rem;
  right: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .van-icon {
    color: #ffffff;
    font-size: 0.38rem;
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  z-index: 2222;
  width: 100%;
}

.block {
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
  font-size: 0.16rem;
  .header {
    width: 100%;
    height: 0.6rem;
    padding: 0.1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    color: white;
    background: rgb(0, 122, 255);
  }
  .kuEafi {
    padding: 16px;
    font-size: 12px;
    color: rgb(102, 102, 102);
    word-break: break-all;
  }
  ul {
    li {
      p {
        padding: 0.05rem 0.1rem;
        color: rgb(68, 68, 68);
        font-size: 0.12rem;
      }
      input {
        width: 100%;
        height: auto;
        padding: 0.12rem;
        border: none;
      }
      input::-webkit-input-placeholder {
        font-size: 12px;
      }
      textarea {
        display: block;
        width: 100%;
        height: 0.9rem;
        padding: 0.12rem 0.16rem;
        overflow: hidden auto;
        resize: none;
        outline: 0px;
        background-color: rgb(255, 255, 255);
        border: none;
        word-break: break-all;
        font-size: 0.12rem;
        appearance: none;
      }

      span {
        color: red;
        font-size: 0.1rem;
      }
    }
    .van-button {
      margin-top: 0.2rem;
    }
  }
}
</style>