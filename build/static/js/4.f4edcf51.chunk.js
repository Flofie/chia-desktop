(this["webpackJsonpchia-desktop"]=this["webpackJsonpchia-desktop"]||[]).push([[4],{175:function(e,t,a){"use strict";a.r(t);var r=a(162),n=a(166),i=a(30),l=a(176),o=a(184),c=a(177),s=a(178),d=a(141),h=a(183),u=a(179),p=a(144),j=a(180),b=a(181),m=a(0),y=a(2),x=Object(l.a)({root:{display:"flex",flexDirection:"column"}}),f={fullNode:{port:8555,crtName:"private_full_node.crt",keyName:"private_full_node.key"},wallet:{port:9256,crtName:"private_wallet.crt",keyName:"private_wallet.key"},harvester:{port:8560,crtName:"private_harvester.crt",keyName:"private_harvester.key"},chiaExplorer:{crtName:"First wallet address",keyName:"Pool public key"}};t.default=function(e){var t,a=e.open,l=e.toggleOpen,g=e.type,O=x(),v=Object(m.useState)({name:"",host:"",port:null===(t=f[g])||void 0===t?void 0:t.port,crt:"",key:"",type:g}),k=Object(i.a)(v,2),w=k[0],C=k[1],N=function(e){C((function(t){return Object(n.a)(Object(n.a)({},t),{},Object(r.a)({},e.target.name,e.target.value))}))},_=function(){l()};function I(e){return e.charAt(0).toUpperCase()+e.slice(1)}return Object(y.jsxs)(o.a,{open:a,onClose:_,"aria-labelledby":"dialog-title",children:[Object(y.jsxs)(c.a,{id:"dialog-title",children:["Add ",I(g)]}),Object(y.jsxs)(s.a,{children:[Object(y.jsx)(d.a,{variant:"subtitle2",children:"chiaExplorer"===e.type?Object(y.jsx)(y.Fragment,{children:"Since there is now way right now to get the farmer/pool public key via the RPC API, we need to add the connection manually. If its possible to get these information from the RPC API we can use the information directly."}):Object(y.jsxs)(y.Fragment,{children:["If your ",I(g)," is not running on the same machine as"," ",Object(y.jsx)("i",{children:"chia-desktop"})," then change the configuration in config.yaml"," ",Object(y.jsx)("b",{children:"self_hostname"})," to the ",Object(y.jsx)("b",{children:"internal"})," IP-Address (e.g. 192.168.2.100) of your ",I(g),"."]})}),Object(y.jsxs)("form",{className:O.root,noValidate:!0,autoComplete:"off",children:[Object(y.jsx)(h.a,{id:"outlined-basic",label:"Name",variant:"outlined",required:!0,margin:"dense",name:"name",value:w.name,onChange:N}),"chiaExplorer"!==e.type&&Object(y.jsxs)("div",{style:{display:"flex"},children:[Object(y.jsx)(h.a,{id:"outlined-basic",label:"Hostname/IP-Address",placeholder:"localhost",variant:"outlined",margin:"dense",style:{flex:1,marginRight:10},required:!0,name:"host",value:w.host,onChange:N}),Object(y.jsx)(h.a,{id:"outlined-basic",label:"Port",variant:"outlined",defaultValue:"8855",margin:"dense",required:!0,name:"port",value:w.port,onChange:N})]}),Object(y.jsx)(h.a,{id:"outlined-basic",label:f[g].crtName,variant:"outlined",margin:"dense",multiline:"chiaExplorer"!==e.type,rows:"chiaExplorer"===e.type?1:4,required:!0,name:"crt",value:w.crt,onChange:N}),Object(y.jsx)(h.a,{id:"outlined-basic",label:f[g].keyName,variant:"outlined",margin:"dense",multiline:"chiaExplorer"!==e.type,rows:"chiaExplorer"===e.type?1:4,required:!0,name:"key",value:w.key,onChange:N})]})]}),Object(y.jsxs)(u.a,{children:[Object(y.jsx)(p.a,{onClick:_,color:"primary",startIcon:Object(y.jsx)(j.a,{}),children:"Cancel"}),Object(y.jsx)(p.a,{onClick:function(){return l(w)},color:"primary",startIcon:Object(y.jsx)(b.a,{}),children:"Add"})]})]})}}}]);
//# sourceMappingURL=4.f4edcf51.chunk.js.map