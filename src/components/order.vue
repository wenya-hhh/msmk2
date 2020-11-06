<template>
    <div>
       <!-- 表头 -->
       <van-nav-bar :title='this.$route.query.name' left-text="" left-arrow @click-left="zqd_go()">
         <template #right>
           <!-- <van-icon name="search" size="18" /> -->
           <!-- <van-icon name="apps-o" /> -->
         </template>
       </van-nav-bar>
       <!-- 导航栏 -->
         <van-tabs v-model="active" animated @click="dian">
         <van-tab v-for="(item,index) in nav" :title="item" :key="index+'1'">
            <template v-if="list.length==0">
               <div class="kong">
               <img src="https://wap.365msmk.com/img/empty.0d284c2e.png" alt="">
               <p>暂无订单</p>
               </div>
            </template>
            <template v-if="list.length!==0">
               <div class="s_box" v-for="(item,index) in list" :key="index">
                <el-card>
               <div class="zqd_order" >
                  <p class="zqd_p1">
                     <span class="zqd_sp2">订单编号：{{item.order_number}}</span>
                     
                     <span class="zqd_sp3">交易完成</span>
                  </p>
                  <ul class="zqd_p2">
                     <li>{{item.title}}</li>
                     <li class="zqd_time">时间{{ Number(item.created_at) | timetow }}</li>
                     <li class="zqd_time"> 实付款：<img src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png" alt="">  {{item.order_price}}</li>
                     <li>
                        <!-- <button class="zqd_btn">加入学习</button> -->
                     </li>
                  </ul>
               </div>
            </el-card>
            </div>
            </template>
            <div class="bbb">
               没有更多了
            </div>
             


         </van-tab>
         </van-tabs>
    </div>
</template>


<script>
import { gets,posts } from '../util/api'
// import { timefnxq } from '../util/filters'
export default {
    data() {
        return {
         active: '1',
         list:[],
         nav:[
            '全部订单',
            '待支付',
            '已完成',
            '已取消',
         ]
        };
    },
    created() {
         // console.log(this.$route.query.name)
    },
    async mounted() {
      let {data} = await posts('myOrder',{
          limit: 10,
            order_status: 0,
            order_type: this.$route.query.order_type,
            page: 1
       })
       this.list = data.data.list
      //  this.times = this.list[1].created_at+'1'
      //  console.log(this.times)
    },
    methods: {
      zqd_go(){
         this.$router.go(-1)
      },
      async dian(i){
         console.log(i)
         let { data } = await posts('myOrder',{
            limit: 10,
            order_status: i,
            order_type: "2",
            page: 1
       })
       this.list = data.data.list
       console.log(this.list)
      }
    },
    
};
</script>


<style scoped lang="scss">
.bbb{
   text-align: center;
   margin-top: 0.2rem;
   color: #969799;
   margin-bottom: 0.2rem;
}
.s_box{
   padding: 0.2rem;
   background-color: #fff;
}
.kong{
   text-align: center;
   img{
      width: 3rem;
      height: 3rem;


   }
   p{
      font-size: 0.3rem;
      color: #8c8c8c;
      margin-top: 0.2rem;
   }
}
.zqd_order{
   // height: 2.7rem;
   box-shadow: 0px 0px 5px #f4f4f4;
}
.zqd_order>.zqd_p1{
   // width: 6.3rem;
   display: flex;
   justify-content: space-between;
   height: 0.5rem;
   border-bottom: 1px solid #F6F6F6;
}
.zqd_order>.zqd_p1>.zqd_sp2{
   font-size: 0.14rem;
}
.zqd_order>.zqd_p1>.zqd_sp3{
   color: red;
   margin-left: 0.52rem;
}
.zqd_order>.zqd_p2{
   width: 6.3rem;
   height: 1.5rem;
   >li{
      margin-bottom: 0.1rem;
   }
}
.zqd_btn{
   width: 1.6rem;
   height: 0.6rem;
   text-align: center;
   line-height: 0.6rem;
   border: 1px solid orange;
   color: orange;
   border-radius: 0.35rem;
   background: #fff;
   margin-left: 5rem;
}
.zqd_time{
   font-size: 0.14rem;
   color: #AC9FA2;
   img{
      width: 0.26rem;
   }
}
</style>
