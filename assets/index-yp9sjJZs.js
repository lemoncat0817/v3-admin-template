import{d as I,u as S,a as C,b as N,r as _,c as U,e as t,o as q,f as B,g as e,w as o,h as E,E as f,p as F,i as H,j as g,_ as L}from"./index-D_ItP8f2.js";import{g as R}from"./time-DYvj3k7S.js";const w=a=>(F("data-v-9bc1f218"),a=a(),H(),a),T={class:"login_container"},$=w(()=>g("h1",null,"Hello",-1)),j=w(()=>g("h2",null,"歡迎來到硅谷甄選",-1)),z=I({__name:"index",setup(a){const x=S(),v=C(),l=N(),d=_(),r=_(!1),s=U({username:"admin",password:"111111"}),b=async()=>{await d.value.validate(),r.value=!0;try{await l.userLogin(s),await l.userInfo(),r.value=!1;const u=x.query.redirect;v.push({path:u||"/"}),f({message:"登入成功",type:"success",title:`Hi,${R()}呀 ${l.username} `})}catch{r.value=!1,f.error("登入失敗請檢查帳號與密碼是否正確")}},h={username:[{required:!0,message:"請輸入帳號",trigger:"blur"},{min:3,max:10,message:"帳號長度為3-10",trigger:"blur"}],password:[{required:!0,message:"請輸入密碼",trigger:"blur"},{min:6,max:15,message:"密碼長度為6-15",trigger:"blur"}]};return(u,n)=>{const m=t("el-col"),p=t("el-input"),i=t("el-form-item"),V=t("el-button"),y=t("el-form"),k=t("el-row");return q(),B("div",T,[e(k,null,{default:o(()=>[e(m,{span:12,xs:0}),e(m,{span:12,xs:24},{default:o(()=>[e(y,{class:"login_form",model:s,rules:h,ref_key:"loginForms",ref:d},{default:o(()=>[$,j,e(i,{prop:"username"},{default:o(()=>[e(p,{"prefix-icon":"User",modelValue:s.username,"onUpdate:modelValue":n[0]||(n[0]=c=>s.username=c)},null,8,["modelValue"])]),_:1}),e(i,{prop:"password"},{default:o(()=>[e(p,{"prefix-icon":"Lock",type:"password",modelValue:s.password,"onUpdate:modelValue":n[1]||(n[1]=c=>s.password=c),"show-password":""},null,8,["modelValue"])]),_:1}),e(i,null,{default:o(()=>[e(V,{loading:r.value,class:"login_btn",type:"primary",onClick:b},{default:o(()=>[E(" 登入 ")]),_:1},8,["loading"])]),_:1})]),_:1},8,["model"])]),_:1})]),_:1})])}}}),G=L(z,[["__scopeId","data-v-9bc1f218"]]);export{G as default};