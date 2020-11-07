<template>
  <div class="cxy_box">
    <header>
      <p @click="$router.back()">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAYAAADd/14OAAAA/ElEQVQoU33RsUvWYRTF8c8hQmgIE4e2IFDQIfCPcHGIlBpqcWtPcFHBFgWdHGxykURxUtfWZkfHtkZBCBzcrjzxe+P9ha/P9sD33nPuOfHIq6pJnOBZRnFVNYdzvML+g2BVfcIBnuJLkm89sKqeYAcruMaHJD+b6j+wqiZwinlcYinJ74G1v2BVven8vMYRPie5G/afqnqPQ4xhNcneQwc28AYvsJ1kfVQKDVzAMZ5jE1tJ6v+BgcdpXGAGZ1hOctvzOPhUVdvYDnmLKywm+dW7eghuCl+xgT/4mORHL8dhmap6h++tY6wl2X2s69nO91SLbyTYFTHebX55D93jTsSH0JDDAAAAAElFTkSuQmCC"
          alt=""
        />
      </p>
      <p>讲师详情</p>
    </header>
    <div class="teacher-info">
        <div class="ti-base">
          <img :src="list.avatar" alt="">
          <div class="div1">
            <p class="p1">{{list.teacher_name}} <span>{{list.level_name}}</span></p>
            <p>
              <span v-show="list.sex==0">男 </span>
              <span v-show="list.sex==1">女 </span>
              <span>{{list.teach_age}}年教龄</span>
            </p>
          </div>
          <div>
          <button @click="guan" v-show="flag==2">关注</button>
          <button @click="guan" v-show="flag==1">已关注</button>
          </div>
        </div>
        <div class="ti-label">
          <span v-for="(item,index) in list.tag_content" :key="index">{{item}}</span>
        </div>
    </div>
   <div class="cxy_nav">
      <van-tabs v-model="activeName" title-active-color="#eb6100">
        <van-tab title="讲师介绍" name="a">
          
            <el-row v-for="(item,index) in xiang.attr" v-show="index>1" :key="index">
            <el-col :span="5">{{item.attr_name}}</el-col>
            <el-col :span="19" v-for="(t,i) in item.attr_value" :key="i">{{t.attr_value_name}}</el-col>
            </el-row>
            <!-- <el-row>
            <el-col :span="5">授课价格</el-col>
            <el-col :span="19">400学习币</el-col>
            </el-row>-->
            <el-row>
            <el-col :span="5">老师简介</el-col>
            <el-col :span="19">{{xiang.intro}}</el-col>
            </el-row> 
        </van-tab>
        <van-tab title="主讲课程" name="b">
          <el-card v-for="(item,index) in zhujiang" :key="index">
            <div @click="goKC(item.id)">
              <p class="pppw">{{item.title}}</p>
              <p class="pppww">共1课时</p>
              <div class="cxy_cen" v-for="(t) in item.teachers_list" :key="t.id">
                <img
                  :src="t.teacher_avatar"
                  alt=""
                />
                <span>{{t.teacher_name}}</span>
              </div>
              <div class="cxy_fot">
                <p>{{item.sales_num}}人已报名</p>
                <p v-show="item.price==100"><img src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png" alt="">  <span>1.00</span> </p>
                <p v-show="item.price==0"> <span>免费</span></p>
              </div>
            </div>
            <div class="cxy_pos" v-show="zhujiang.has_buy==1">
              <img src="https://wap.365msmk.com/img/has-buy.6cfbd83d.png" alt="">
            </div>
          </el-card>
        </van-tab>
        <van-tab class="cxy_three" title="学院评价" name="c">
         <div class="comment">
                  <ol ref="tag" class="tag">
                      <li v-for="(i,k) in  commentTitleList" :key="k">
                         <p>{{i.title}} ({{i.count}})</p>
                      </li>
                  </ol>
                  <p class="unfold">
                    <van-icon @click="changeUnfold()" v-show="isUnfold" name="arrow-up" />
                    <van-icon  @click="changeUnfold()" v-show="!isUnfold" name="arrow-down" />
                  </p>
                 
                 <div ref="commentList" class="commentList">
                     <div class="comment_box" v-for="(i,k) in commentList" :key="k">
                       <p class="avatr">
                          <img :src="i.avatar" alt="">
                          <van-rate v-model="i.grade" size=".24rem" color="rgb(234, 122, 47);" />
                       </p>
                      
                       <div class="comment_tag">
                         <p v-for="(item,key) in i.tag_content" :key="key">{{item}}</p>
                       </div>
                       <p class="comment_content">{{i.content}}</p>
                     </div>
                 </div>
              </div>            
              <Null v-show="commentList.length==0" title="暂无评论"></Null>
        </van-tab>
      </van-tabs>
    </div>
    <van-tabbar>
      <van-tabbar-item>立即预约</van-tabbar-item>
    </van-tabbar> 
  </div>
</template>

<script>
import Null from "@/components/null"
import {gets,posts,teacherComment,getCollects} from '../util/api'
export default {
  // 组件名称
  name: "demo",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {
    Null
  },
  // 组件状态值
  data() {
    return {
      activeName: "a",
      list:{},
      zhujiang:[],
      isUnfold:false,
      flag:'',
      xiang:{},
      commentTitleList: [],
      commentList:[],
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},

  async mounted(){
    // console.log(this.$route.query.id)
    //讲师详情页面数据
    let { data } = await gets('teacher/'+this.$route.query.id)
    this.list = data.data.teacher
    this.flag = data.data.flag
    console.log(this.flag)

    let {data:xiang} = await gets('/teacher/info/'+this.$route.query.id)
      console.log(xiang)
      this.xiang = xiang.data

     let { data:res } = await posts('teacher/comment',{
        limit: 2,
        page: 1,
        teacher_id: this.$route.query.id
     })
    //  console.log(res)

    //讲师详情页面主讲课程

    let { data:resZhu } = await posts('teacher/mainCourse',{
        limit: 10,
        page: 1,
        teacher_id: this.$route.query.id
     })
     this.zhujiang = resZhu.data.list
    this.getcomment();
  },
  // 组件方法
  methods: {
    // 关注
    async guanzhu() {
      let { data } = await getCollects(this.teacher_id);
          this.getcomment();

      if (data.data.flag == 1) {
        this.$toast.success("已取消");
      } else {
        this.$toast.success("已关注");
      }
    },
      // 讲师评价
    async getcomment() {
      let res = await teacherComment({
        teacher_id: this.$route.query.id,
        page: 1,
        limit: 2,
      });

      console.log(res);
      this.commentTitleList = res.data.data.tag;
      this.commentList=res.data.data.comment.list
      console.log(res.data.data.comment.list)
      this.commentList.forEach((res)=>{
           
           res.tag_content= res.tag_content.split(',')

      })

    },
     changeUnfold(){
      this.isUnfold=!this.isUnfold
      
      if( this.isUnfold){
             
             this.$refs.commentList.style.top=3.1+"rem"
            
      }else{
             this.$refs.commentList.style.top=0.8+"rem"

      }

    },
      async guan(){
        let {data} = await gets('teacher/collect/'+this.$route.query.id)
        console.log(data)
        this.flag = data.data.flag
        if(this.flag==1){
          this.$toast({
         message: '关注成功',
        })
        }else{
          this.$toast({
         message: '取消关注',
        })
        }
        
      },
      goKC(id){
        console.log(id)
        this.$router.push(`/course-detail?id=${id}`)
      }
  },
};
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped lang="scss">
.cxy_box{
  height: 100%;
}
.el-col{
  margin-top: 0.2rem;
  font-size: 0.26rem;
  color: #8c8c8c;
  line-height: .7rem;
}
.comment{
  padding: 0.2rem;
  position: relative;
  .unfold{
      position: absolute;
      top: 0.3rem;
      right: 0.1rem;
      background-color: #cccc;
      padding: 0.05rem;
      border-radius: 50%;
    }
  .tag{
    // width: 7.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    
    
    li{ 
      >p{
        font-size: 3.2vw;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #ea7a2f;
        display: inline-block;
        width: 24vw;
        height: 6.66667vw;
        border: 1px solid #ea7a2f;
        border-radius: .53333vw;
        margin-right: 3.33333vw;
        margin-bottom: 2.13333vw;
        line-height: 6.66667vw;
        text-align: center;
        border-radius: .8vw;
        overflow: hidden;
      }
    }
    
  }
}
.commentList{
  position: absolute;
  background-color: #fff;
  top: 0.8rem;
  left: 0;
  .comment_box{

    .avatr{
      text-align: left;
      display: flex;
      align-items: center;
      img{
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        margin-left: 0.2rem;
        margin-top: 0.1rem;
        margin-right: .1rem;
      }
    }
    .comment_tag{
      margin-top: 0.1rem;
      >p{
        display: inline-block;
          width: 23.46667vw;
          height: 5.86667vw;
          line-height: 5.86667vw;
          background: #f5f5f5;
          border-radius: 1.06667vw;
          color: #8c8c8c;
          text-align: center;
          margin-bottom: 1.33333vw;
          justify-content: space-around;
          margin-left: 2.66667vw;
      }
          
    }
  }
  .comment_content{
    padding-top: 1.33333vw;
    line-height: .64rem;
    line-height: 6.4vw;
    color: #999;
    text-align: left;
    margin-left: 0.6rem;
  }
}
.cxy_box {
  background: #f0f2f5;
  position: relative;
}
header {
  background: linear-gradient(180deg, #63b7fe, #4e7de3);
  color: #fff;
  display: flex;
  height: 2rem;
  :nth-child(2) {
    width: 6.3rem;
    text-align: center;
    padding: 0;
  }
  img {
    height: 0.32rem;
    width: 0.18rem;
  }

  p {
    height: 0.88rem;
    line-height: 0.88rem;
    padding-left: 0.4rem;
    font-size: 0.4rem;
  }
}
.cxy_nav{
  padding: 0.2rem;
  // margin-top: 1rem;
}
.pppw{
      font-size: 4.26667vw;
    font-family: PingFangSC-Medium;
    font-weight: 400;
    color: #333;
}
.pppww{
      height: 8vw;
    line-height: 8vw;
    display: inline-block;
    font-size: 3.2vw;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #666;
    padding-right: 4.53333vw;
    position: relative;
}
.teacher-info {
    margin: -1.52rem auto 0;
    margin: -15.2vw auto 0;
    width: 94.66667vw;
    padding: 0 4vw;
    background: #fff;
    border-radius: 1.06667vw;
    box-sizing: border-box;
    .ti-base{
      height: 20.26667vw;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .div1{
        text-align: left;
        flex:1;
        p{
          font-size: 3.2vw;
          color: #b7b7b7;
          line-height: .45333rem;
          line-height: 4.53333vw;
        }
        .p1{
          font-size: 4vw;
          color: #595959;
          line-height: 5.6vw;
          padding-right: 1.33333vw;
          span{
                font-size: 2.93333vw;
                color: #ea7a2f;
          }
        }
      }
      img{
          width: 10.66667vw;
          height: 1.06667rem;
          height: 10.66667vw;
          margin-right: .32rem;
          margin-right: 3.2vw;
          border-radius: 50%;
          flex: none;
      }
      button{
        width: 16.53333vw;
        height: 7.46667vw;
        background: #ebeefe;
        border-radius: 4.13333vw;
        font-size: 3.46667vw;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #4169ff;
        color: #eb6100;
        border: 0;
      }
    }
    .ti-label{
          padding-bottom: 4vw;
      span{
        display: inline-block;
        width: 19vw;
        height: 6.4vw;
        line-height: 6.4vw;
        background: #ffe4d3;
        border-radius: 3.2vw;
        font-size: 3.2vw;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #ea7a2f;
        margin-right: 2.66667vw;
        margin-bottom: 2.66667vw;
        text-align: center;
        overflow: hidden;
      }
    }
    
}

.van-tabs {
  background-color: #fff;
}
.van-tab {
  height: 0.9rem;
  border-bottom: 0.01rem solid red;
  // padding: 0.2rem;
  img {
    width: 3rem;
    height: 3rem;
  }
}
.el-card {
  padding: 0 0.2rem;
  margin-bottom: 0.2rem;
  position: relative;
  .cxy_pos{
    position: absolute;
    right: 0.7rem;
    top: 1rem;
  }
  div {
    padding: 0.2rem 0rem;
  }
  .cxy_cen {
    display: flex;
    align-items: center;
    >img{
      margin-right: 0.1rem;
      width: 7.2vw;
      height: 7.2vw;
      border-radius: 50%;
    }
  }
  .cxy_fot {
    display: flex;
    color: rgba(0,0,0,.45);
    justify-content: space-between;
    img{
      width: 3.2vw;
      height: 3.2vw;
    }
    p{
      span{
        color: #ee1f1f;
        font-size: 4.26667vw;
      }
    }
  }

  img {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
  }
}
.van-tabbar .van-tabbar-item {
  background-color: #eb6100;
  color: #fff;
  font-size: 0.4rem;
}
.cxy_three {
  text-align: center;
  img {
    width: 1.6rem;
    height: 1.6rem;
  }
}
.el-row{
    padding: 0 0.2rem;
}
</style>


 
