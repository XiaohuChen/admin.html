(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22d3c7"],{f744:function(e,a,t){"use strict";t.r(a);var c=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"app-container"},[t("el-tabs",{model:{value:e.activeName,callback:function(a){e.activeName=a},expression:"activeName"}},[t("el-tab-pane",{attrs:{label:"use clipboard  directly",name:"directly"}},[t("el-input",{staticStyle:{width:"400px","max-width":"100%"},attrs:{placeholder:"Please input"},model:{value:e.inputData,callback:function(a){e.inputData=a},expression:"inputData"}}),e._v(" "),t("el-button",{attrs:{type:"primary",icon:"document"},on:{click:function(a){return e.handleCopy(e.inputData,a)}}},[e._v("\n        copy\n      ")])],1),e._v(" "),t("el-tab-pane",{attrs:{label:"use clipboard by v-directive",name:"v-directive"}},[t("el-input",{staticStyle:{width:"400px","max-width":"100%"},attrs:{placeholder:"Please input"},model:{value:e.inputData,callback:function(a){e.inputData=a},expression:"inputData"}}),e._v(" "),t("el-button",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.inputData,expression:"inputData",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.clipboardSuccess,expression:"clipboardSuccess",arg:"success"}],attrs:{type:"primary",icon:"document"}},[e._v("\n        copy\n      ")])],1)],1)],1)},r=[],i=t("f71e"),n=t("7cbd");if(!n)throw new Error("you should npm install `clipboard` --save at first ");var o={bind:function(e,a){if("success"===a.arg)e._v_clipboard_success=a.value;else if("error"===a.arg)e._v_clipboard_error=a.value;else{var t=new n(e,{text:function(){return a.value},action:function(){return"cut"===a.arg?"cut":"copy"}});t.on("success",(function(a){var t=e._v_clipboard_success;t&&t(a)})),t.on("error",(function(a){var t=e._v_clipboard_error;t&&t(a)})),e._v_clipboard=t}},update:function(e,a){"success"===a.arg?e._v_clipboard_success=a.value:"error"===a.arg?e._v_clipboard_error=a.value:(e._v_clipboard.text=function(){return a.value},e._v_clipboard.action=function(){return"cut"===a.arg?"cut":"copy"})},unbind:function(e,a){"success"===a.arg?delete e._v_clipboard_success:"error"===a.arg?delete e._v_clipboard_error:(e._v_clipboard.destroy(),delete e._v_clipboard)}},l=function(e){e.directive("Clipboard",o)};window.Vue&&(window.clipboard=o,Vue.use(l)),o.install=l;var s=o,u={name:"ClipboardDemo",directives:{clipboard:s},data:function(){return{activeName:"directly",inputData:"https://github.com/PanJiaChen/vue-element-admin"}},methods:{handleCopy:function(e,a){Object(i["a"])(e,a)},clipboardSuccess:function(){this.$message({message:"Copy successfully",type:"success",duration:1500})}}},p=u,d=t("6691"),v=Object(d["a"])(p,c,r,!1,null,null,null);a["default"]=v.exports}}]);