(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5dea7998"],{"24b5":function(t,a,e){},3530:function(t,a,e){"use strict";e("24b5")},4186:function(t,a,e){"use strict";e("457e")},"457e":function(t,a,e){},"57ec":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"cxy_box"},[e("header",[e("p",{on:{click:function(a){return t.$router.back()}}},[e("img",{attrs:{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAYAAADd/14OAAAA/ElEQVQoU33RsUvWYRTF8c8hQmgIE4e2IFDQIfCPcHGIlBpqcWtPcFHBFgWdHGxykURxUtfWZkfHtkZBCBzcrjzxe+P9ha/P9sD33nPuOfHIq6pJnOBZRnFVNYdzvML+g2BVfcIBnuJLkm89sKqeYAcruMaHJD+b6j+wqiZwinlcYinJ74G1v2BVven8vMYRPie5G/afqnqPQ4xhNcneQwc28AYvsJ1kfVQKDVzAMZ5jE1tJ6v+BgcdpXGAGZ1hOctvzOPhUVdvYDnmLKywm+dW7eghuCl+xgT/4mORHL8dhmap6h++tY6wl2X2s69nO91SLbyTYFTHebX55D93jTsSH0JDDAAAAAElFTkSuQmCC",alt:""}})]),e("p",[t._v("讲师详情")])]),e("div",{staticClass:"teacher-info"},[e("div",{staticClass:"ti-base"},[e("img",{attrs:{src:t.list.avatar,alt:""}}),e("div",{staticClass:"div1"},[e("p",{staticClass:"p1"},[t._v(t._s(t.list.teacher_name)+" "),e("span",[t._v(t._s(t.list.level_name))])]),e("p",[e("span",{directives:[{name:"show",rawName:"v-show",value:0==t.list.sex,expression:"list.sex==0"}]},[t._v("男 ")]),e("span",{directives:[{name:"show",rawName:"v-show",value:1==t.list.sex,expression:"list.sex==1"}]},[t._v("女 ")]),e("span",[t._v(t._s(t.list.teach_age)+"年教龄")])])]),e("div",[e("button",{directives:[{name:"show",rawName:"v-show",value:2==t.flag,expression:"flag==2"}],on:{click:t.guan}},[t._v("关注")]),e("button",{directives:[{name:"show",rawName:"v-show",value:1==t.flag,expression:"flag==1"}],on:{click:t.guan}},[t._v("已关注")])])]),e("div",{staticClass:"ti-label"},t._l(t.list.tag_content,(function(a,s){return e("span",{key:s},[t._v(t._s(a))])})),0)]),e("div",{staticClass:"cxy_nav"},[e("van-tabs",{attrs:{"title-active-color":"#eb6100"},model:{value:t.activeName,callback:function(a){t.activeName=a},expression:"activeName"}},[e("van-tab",{attrs:{title:"讲师介绍",name:"a"}},[t._l(t.xiang.attr,(function(a,s){return e("el-row",{directives:[{name:"show",rawName:"v-show",value:s>1,expression:"index>1"}],key:s},[e("el-col",{attrs:{span:5}},[t._v(t._s(a.attr_name))]),t._l(a.attr_value,(function(a,s){return e("el-col",{key:s,attrs:{span:19}},[t._v(t._s(a.attr_value_name))])}))],2)})),e("el-row",[e("el-col",{attrs:{span:5}},[t._v("老师简介")]),e("el-col",{attrs:{span:19}},[t._v(t._s(t.xiang.intro))])],1)],2),e("van-tab",{attrs:{title:"主讲课程",name:"b"}},t._l(t.zhujiang,(function(a,s){return e("el-card",{key:s},[e("div",{on:{click:function(e){return t.goKC(a.id)}}},[e("p",{staticClass:"pppw"},[t._v(t._s(a.title))]),e("p",{staticClass:"pppww"},[t._v("共1课时")]),t._l(a.teachers_list,(function(a){return e("div",{key:a.id,staticClass:"cxy_cen"},[e("img",{attrs:{src:a.teacher_avatar,alt:""}}),e("span",[t._v(t._s(a.teacher_name))])])})),e("div",{staticClass:"cxy_fot"},[e("p",[t._v(t._s(a.sales_num)+"人已报名")]),e("p",{directives:[{name:"show",rawName:"v-show",value:100==a.price,expression:"item.price==100"}]},[e("img",{attrs:{src:"https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png",alt:""}}),t._v(" "),e("span",[t._v("1.00")])]),e("p",{directives:[{name:"show",rawName:"v-show",value:0==a.price,expression:"item.price==0"}]},[e("span",[t._v("免费")])])])],2),e("div",{directives:[{name:"show",rawName:"v-show",value:1==t.zhujiang.has_buy,expression:"zhujiang.has_buy==1"}],staticClass:"cxy_pos"},[e("img",{attrs:{src:"https://wap.365msmk.com/img/has-buy.6cfbd83d.png",alt:""}})])])})),1),e("van-tab",{staticClass:"cxy_three",attrs:{title:"学院评价",name:"c"}},[e("div",{staticClass:"comment"},[e("ol",{ref:"tag",staticClass:"tag"},t._l(t.commentTitleList,(function(a,s){return e("li",{key:s},[e("p",[t._v(t._s(a.title)+" ("+t._s(a.count)+")")])])})),0),e("p",{staticClass:"unfold"},[e("van-icon",{directives:[{name:"show",rawName:"v-show",value:t.isUnfold,expression:"isUnfold"}],attrs:{name:"arrow-up"},on:{click:function(a){return t.changeUnfold()}}}),e("van-icon",{directives:[{name:"show",rawName:"v-show",value:!t.isUnfold,expression:"!isUnfold"}],attrs:{name:"arrow-down"},on:{click:function(a){return t.changeUnfold()}}})],1),e("div",{ref:"commentList",staticClass:"commentList"},t._l(t.commentList,(function(a,s){return e("div",{key:s,staticClass:"comment_box"},[e("p",{staticClass:"avatr"},[e("img",{attrs:{src:a.avatar,alt:""}}),e("van-rate",{attrs:{size:".24rem",color:"rgb(234, 122, 47);"},model:{value:a.grade,callback:function(e){t.$set(a,"grade",e)},expression:"i.grade"}})],1),e("div",{staticClass:"comment_tag"},t._l(a.tag_content,(function(a,s){return e("p",{key:s},[t._v(t._s(a))])})),0),e("p",{staticClass:"comment_content"},[t._v(t._s(a.content))])])})),0)]),e("Null",{directives:[{name:"show",rawName:"v-show",value:0==t.commentList.length,expression:"commentList.length==0"}],attrs:{title:"暂无评论"}})],1)],1)],1),e("van-tabbar",[e("van-tabbar-item",[t._v("立即预约")])],1)],1)},i=[],n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"null"},[e("img",{attrs:{"data-v-0fa74510":"",src:"https://wap.365msmk.com/img/empty.0d284c2e.png"}}),e("p",[t._v(t._s(t.title))])])},c=[],o={props:["title"],data(){return{}},created(){},mounted(){},methods:{}},l=o,r=(e("4186"),e("c701")),m=Object(r["a"])(l,n,c,!1,null,"3e906716",null),u=m.exports,v=e("9870"),d={name:"demo",props:{},components:{Null:u},data(){return{activeName:"a",list:{},zhujiang:[],isUnfold:!1,flag:"",xiang:{},commentTitleList:[],commentList:[]}},computed:{},watch:{},async mounted(){let{data:t}=await Object(v["p"])("teacher/"+this.$route.query.id);this.list=t.data.teacher,this.flag=t.data.flag,console.log(this.flag);let{data:a}=await Object(v["p"])("/teacher/info/"+this.$route.query.id);console.log(a),this.xiang=a.data;let{data:e}=await Object(v["t"])("teacher/comment",{limit:2,page:1,teacher_id:this.$route.query.id}),{data:s}=await Object(v["t"])("teacher/mainCourse",{limit:10,page:1,teacher_id:this.$route.query.id});this.zhujiang=s.data.list,this.getcomment()},methods:{async guanzhu(){let{data:t}=await Object(v["i"])(this.teacher_id);this.getcomment(),1==t.data.flag?this.$toast.success("已取消"):this.$toast.success("已关注")},async getcomment(){let t=await Object(v["u"])({teacher_id:this.$route.query.id,page:1,limit:2});console.log(t),this.commentTitleList=t.data.data.tag,this.commentList=t.data.data.comment.list,console.log(t.data.data.comment.list),this.commentList.forEach(t=>{t.tag_content=t.tag_content.split(",")})},changeUnfold(){this.isUnfold=!this.isUnfold,this.isUnfold?this.$refs.commentList.style.top="3.1rem":this.$refs.commentList.style.top="0.8rem"},async guan(){let{data:t}=await Object(v["p"])("teacher/collect/"+this.$route.query.id);console.log(t),this.flag=t.data.flag,1==this.flag?this.$toast({message:"关注成功"}):this.$toast({message:"取消关注"})},goKC(t){console.log(t),this.$router.push("/course-detail?id="+t)}}},h=d,p=(e("3530"),Object(r["a"])(h,s,i,!1,null,"5156e120",null));a["default"]=p.exports}}]);
//# sourceMappingURL=chunk-5dea7998.3da0864b.js.map