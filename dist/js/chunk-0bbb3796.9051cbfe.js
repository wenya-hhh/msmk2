(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0bbb3796"],{"3d2c":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"box"},[a("van-nav-bar",{attrs:{title:"意见反馈","left-text":"","left-arrow":""},on:{"click-left":function(e){return t.zqd_go()}},scopedSlots:t._u([{key:"right",fn:function(){},proxy:!0}])}),a("div",{staticClass:"box-con"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.zqd_txt,expression:"zqd_txt"}],staticClass:"zqd_txt",attrs:{cols:"40",rows:"10",maxlength:"500",placeholder:"请输入你的意见"},domProps:{value:t.zqd_txt},on:{input:function(e){e.target.composing||(t.zqd_txt=e.target.value)}}}),a("span",{staticClass:"sp1"},[t._v(t._s(t.zqd_txt.length||0)+"/500")])]),a("div",{staticClass:"div_bot"},[a("van-button",{attrs:{type:"primary",id:"zqd"},on:{click:t.zqd_tijiao}},[t._v("提交")])],1)],1)},o=[],n=a("9870"),i={data(){return{zqd_txt:""}},created(){},mounted(){},methods:{zqd_go(){this.$router.go(-1)},async zqd_tijiao(){let{data:t}=await Object(n["w"])("feedback",{content:this.zqd_txt});200==t.code&&(this.$toast("反馈成功"),this.$router.push("/person"))}}},c=i,d=(a("f7ed"),a("c701")),r=Object(d["a"])(c,s,o,!1,null,"866a7d06",null);e["default"]=r.exports},6411:function(t,e,a){},f7ed:function(t,e,a){"use strict";a("6411")}}]);
//# sourceMappingURL=chunk-0bbb3796.9051cbfe.js.map