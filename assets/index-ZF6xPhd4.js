import{H as u,d as P,r as g,c as U,B as j,e as s,o as z,f as A,g as e,w as o,h as m,t as N,j as O,I as p}from"./index-D_ItP8f2.js";const T=()=>u.get("/admin/acl/permission"),h=d=>d.id?u.put("/admin/acl/permission/update",d):u.post("/admin/acl/permission/save",d),w=d=>u.delete("/admin/acl/permission/remove/"+d),D={class:"dialog-footer"},H=P({__name:"index",setup(d){const f=g([]),i=g(!1),t=U({code:"",level:0,name:"",pid:0}),V=async()=>{const a=await h(t);a.code===200?(p.success(t.id?"修改成功":"添加成功"),_(),i.value=!1):(p.error(t.id?`修改失败因為${a.data}`:`添加失败因為${a.data}`),i.value=!1)};j(()=>{_()});const _=async()=>{const a=await T();a.code===200&&(f.value=a.data)},C=a=>{i.value=!0,Object.assign(t,{id:0,code:"",level:0,name:"",pid:0}),t.level=a.level+1,t.pid=a.id},x=a=>{i.value=!0,Object.assign(t,a),t.updateTime=""},k=async a=>{const n=await w(a);n.code===200?(p.success("刪除成功"),_()):p.error(`刪除失敗因為${n.data}`)};return(a,n)=>{const c=s("el-table-column"),r=s("el-button"),$=s("el-popconfirm"),M=s("el-table"),v=s("el-input"),b=s("el-form-item"),q=s("el-form"),B=s("el-dialog");return z(),A("div",null,[e(M,{style:{width:"100%","margin-bottom":"20px"},border:"","row-key":"id",data:f.value},{default:o(()=>[e(c,{prop:"name",label:"名稱"}),e(c,{prop:"code",label:"權限值"}),e(c,{prop:"updateTime",label:"修改時間"}),e(c,{label:"操作"},{default:o(({row:l})=>[e(r,{onClick:y=>C(l),type:"primary",size:"small",disabled:l.level===4},{default:o(()=>[m(N(l.level===3?"添加功能":"添加菜單"),1)]),_:2},1032,["onClick","disabled"]),e(r,{onClick:y=>x(l),type:"primary",size:"small",disabled:l.level===1},{default:o(()=>[m("編輯")]),_:2},1032,["onClick","disabled"]),e($,{width:"260px",title:`你確定要刪除${l.name}嗎?`,onConfirm:y=>k(l.id)},{reference:o(()=>[e(r,{type:"primary",size:"small",disabled:l.level===1},{default:o(()=>[m("刪除")]),_:2},1032,["disabled"])]),_:2},1032,["title","onConfirm"])]),_:1})]),_:1},8,["data"]),e(B,{modelValue:i.value,"onUpdate:modelValue":n[3]||(n[3]=l=>i.value=l),title:t.id?"更新菜單":"添加菜單",width:"500"},{footer:o(()=>[O("div",D,[e(r,{onClick:n[2]||(n[2]=l=>i.value=!1)},{default:o(()=>[m("取消")]),_:1}),e(r,{type:"primary",onClick:V},{default:o(()=>[m("確定")]),_:1})])]),default:o(()=>[e(q,{"label-width":"80px",style:{margin:"10px 0px"}},{default:o(()=>[e(b,{label:"名稱"},{default:o(()=>[e(v,{placeholder:"請輸入菜單名稱",modelValue:t.name,"onUpdate:modelValue":n[0]||(n[0]=l=>t.name=l)},null,8,["modelValue"])]),_:1}),e(b,{label:"權限值"},{default:o(()=>[e(v,{placeholder:"請輸入權限值",modelValue:t.code,"onUpdate:modelValue":n[1]||(n[1]=l=>t.code=l)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","title"])])}}});export{H as default};
