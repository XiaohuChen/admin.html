(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a54c1b80"],{3758:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-form",[a("el-form-item",{attrs:{label:"安卓下载地址","label-width":"100px"}},[a("el-input",{model:{value:e.app.android,callback:function(t){e.$set(e.app,"android",t)},expression:"app.android"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"苹果下载地址","label-width":"100px"}},[a("el-input",{model:{value:e.app.IOS,callback:function(t){e.$set(e.app,"IOS",t)},expression:"app.IOS"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"App更新内容","label-width":"100px"}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.app.tip,callback:function(t){e.$set(e.app,"tip",t)},expression:"app.tip"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"App版本号","label-width":"100px"}},[a("el-input",{model:{value:e.app.ver,callback:function(t){e.$set(e.app,"ver",t)},expression:"app.ver"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"需要安装","label-width":"100px"}},[a("el-radio",{attrs:{label:1},model:{value:e.app.needInstall,callback:function(t){e.$set(e.app,"needInstall",t)},expression:"app.needInstall"}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:0},model:{value:e.app.needInstall,callback:function(t){e.$set(e.app,"needInstall",t)},expression:"app.needInstall"}},[e._v("否")])],1),e._v(" "),a("el-form-item",{attrs:{label:"强制更新","label-width":"100px"}},[a("el-radio-group",{model:{value:e.app.mustUpdate,callback:function(t){e.$set(e.app,"mustUpdate",t)},expression:"app.mustUpdate"}},[a("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:0}},[e._v("否")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"","label-width":"100px"}},[a("el-button",{attrs:{type:"primary"},on:{click:e.handleApp}},[e._v("确 定")])],1)],1)],1)},l=[],i=a("da71"),o=(a("6724"),a("ed08"),{data:function(){return{listLoading:!0,app:{ver:"",needInstall:"",mustUpdate:"",IOS:"",android:"",tip:"",id:0},options:null}},created:function(){this.getList()},methods:{getList:function(){var e=this;Object(i["a"])().then((function(t){2e4==t.code?(e.app.id=t.data.Id,e.app.ver=t.data.ver,e.app.needInstall=t.data.NeedInstall,e.app.mustUpdate=t.data.MustUpdate,e.app.IOS=t.data.IOS,e.app.android=t.data.Android,e.app.tip=t.data.Tip,setTimeout((function(){e.listLoading=!1}),300),console.log(e.app)):e.listLoading=!0}))},handleApp:function(){var e=this;this.listLoading=!0,Object(i["e"])(this.app).then((function(t){2e4==t.code?(e.$message({type:"success",message:t.msg}),setTimeout((function(){e.listLoading=!1})),e.getList()):e.$message({type:"error",message:t.msg})}))}}}),p=o,s=a("6691"),r=Object(s["a"])(p,n,l,!1,null,null,null);t["default"]=r.exports},6724:function(e,t,a){"use strict";a("8d41");var n="@@wavesContext";function l(e,t){function a(a){var n=Object.assign({},t.value),l=Object.assign({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},n),i=l.ele;if(i){i.style.position="relative",i.style.overflow="hidden";var o=i.getBoundingClientRect(),p=i.querySelector(".waves-ripple");switch(p?p.className="waves-ripple":(p=document.createElement("span"),p.className="waves-ripple",p.style.height=p.style.width=Math.max(o.width,o.height)+"px",i.appendChild(p)),l.type){case"center":p.style.top=o.height/2-p.offsetHeight/2+"px",p.style.left=o.width/2-p.offsetWidth/2+"px";break;default:p.style.top=(a.pageY-o.top-p.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",p.style.left=(a.pageX-o.left-p.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return p.style.backgroundColor=l.color,p.className="waves-ripple z-active",!1}}return e[n]?e[n].removeHandle=a:e[n]={removeHandle:a},a}var i={bind:function(e,t){e.addEventListener("click",l(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[n].removeHandle,!1),e.addEventListener("click",l(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[n].removeHandle,!1),e[n]=null,delete e[n]}},o=function(e){e.directive("waves",i)};window.Vue&&(window.waves=i,Vue.use(o)),i.install=o;t["a"]=i},"8d41":function(e,t,a){},da71:function(e,t,a){"use strict";a.d(t,"b",(function(){return l})),a.d(t,"f",(function(){return i})),a.d(t,"c",(function(){return o})),a.d(t,"g",(function(){return p})),a.d(t,"d",(function(){return s})),a.d(t,"a",(function(){return r})),a.d(t,"e",(function(){return d}));var n=a("b775");function l(e){return Object(n["a"])({url:"/config/list",method:"get",params:e})}function i(e){return Object(n["a"])({url:"/config/updateAddQiniu",method:"post",data:e})}function o(e){return Object(n["a"])({url:"/config/smsList",method:"get",params:e})}function p(e){return Object(n["a"])({url:"/config/updateAddSms",method:"post",data:e})}function s(e){return Object(n["a"])({url:"/config/smstype",method:"get",params:e})}function r(e){return Object(n["a"])({url:"/config/appList",method:"get",params:e})}function d(e){return Object(n["a"])({url:"/config/updateAddAppVersion",method:"post",data:e})}}}]);