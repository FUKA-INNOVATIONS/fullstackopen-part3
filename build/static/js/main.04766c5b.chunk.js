(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{21:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var c=t(2),a=t.n(c),r=t(16),o=t.n(r),u=(t(21),t(3)),i=t(0),s=function(e){var n=e.nameFilter,t=e.handleChange;return Object(i.jsxs)("div",{className:"filter",children:["Filter shown with: ",Object(i.jsx)("input",{value:n,onChange:t})]})},l=function(e){return Object(i.jsx)("div",{className:"personForm",children:Object(i.jsxs)("form",{onSubmit:e.handleSubmit,children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:e.newName,onChange:e.handleNameChange})]}),Object(i.jsxs)("div",{children:["phone: ",Object(i.jsx)("input",{value:e.newPhone,onChange:e.handlePhoneChange})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",children:"add"})})]})})},d=function(e){var n=e.persons,t=e.handleDelete;return Object(i.jsx)("div",{className:"persons",children:n.map((function(e){return Object(i.jsxs)("p",{children:[e.name," (",e.number,")",Object(i.jsx)("button",{onClick:function(){return t(e.id,e.name)},children:"delete"})]},e.name)}))})},h=t(4),b=t.n(h),j="/api/persons",f=function(){return b.a.get(j).then((function(e){return e.data}))},m=function(e){console.log("create from react persons 1");var n=b.a.post(j,e);return console.log("create from react persons 2"),n.then((function(e){return e.data}))},O=function(e){var n=b.a.delete("".concat(j,"/").concat(e));return console.log("deleteReq: ",n),n},g=function(e,n){b.a.put("".concat(j,"/").concat(e),n).then((function(e){return e.data})).catch((function(e){return e}))},p=function(e){var n=e.message;return null===n?null:Object(i.jsx)("div",{style:w,children:n})},v=function(e){var n=e.message;return null===n?null:Object(i.jsx)("div",{style:x,children:n})},x={background:"lightgrey",color:"black",fontSize:20,borderStyle:"solid",padding:10,margin:10},w={background:"lightgrey",color:"red",fontSize:20,borderStyle:"solid",padding:10,margin:10},S=function(){var e=Object(c.useState)([]),n=Object(u.a)(e,2),t=n[0],a=n[1],r=Object(c.useState)(""),o=Object(u.a)(r,2),h=o[0],b=o[1],j=Object(c.useState)(""),x=Object(u.a)(j,2),w=x[0],S=x[1],C=Object(c.useState)(""),y=Object(u.a)(C,2),N=y[0],k=y[1],F=Object(c.useState)(!0),P=Object(u.a)(F,2),L=P[0],T=P[1],D=Object(c.useState)(null),E=Object(u.a)(D,2),I=E[0],z=E[1],A=Object(c.useState)(null),B=Object(u.a)(A,2),J=B[0],q=B[1],M=function(e,n){"success"===n?z(e):q(e),setTimeout((function(){q(null),z(null)}),5e3)};Object(c.useEffect)((function(){f().then((function(e){a(e)}))}),[]);var R=L?t:t.filter((function(e){return e.name.includes(N)})),G=I?Object(i.jsx)(v,{message:I}):Object(i.jsx)(p,{message:J});return Object(i.jsxs)("div",{style:{margin:20},className:"main",children:[G,Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(s,{nameFilter:N,handleChange:function(e){var n=e.target.value;n.length>0?T(!1):T(!0),k(n)}}),Object(i.jsx)("h3",{children:"Add a new"}),Object(i.jsx)(l,{newName:h,newPhone:w,handleSubmit:function(e){e.preventDefault();var n=!1;(t.forEach((function(e){if(e.name.toLowerCase()===h.toLocaleLowerCase())if(n=!0,0!==w.length){var c={name:e.name,number:w};window.confirm("".concat(e.name," is already added to phonebook, replace the old number with a new one?"))&&(g(e.id,c),a(t.filter((function(n){return n.id!==e.id})).concat(c)),M("".concat(h,"'s phone number is updated!"),"success"))}else alert("To update the number, Please write a new number")})),n)||(m({name:h,number:w}).then((function(e){a(t.concat(e)),b(""),S("")})),M("".concat(h,"'s phone number is added!"),"success"))},handleNameChange:function(e){return b(e.target.value)},handlePhoneChange:function(e){return S(e.target.value)}}),Object(i.jsx)("h3",{children:"Numbers"}),Object(i.jsx)(d,{persons:R,handleDelete:function(e,n){window.confirm("Are you sure to delete ".concat(n,"?"))&&O(e).then((function(e){f().then((function(e){a(e)})),M("Number successfully deleted","success")})).catch((function(e){M("Information of ".concat(n," has already been removed."),"error"),setTimeout((function(){f().then((function(e){a(e)}),2e3)}))}))}})]})},C=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,42)).then((function(n){var t=n.getCLS,c=n.getFID,a=n.getFCP,r=n.getLCP,o=n.getTTFB;t(e),c(e),a(e),r(e),o(e)}))};o.a.render(Object(i.jsx)(a.a.StrictMode,{children:Object(i.jsx)(S,{})}),document.getElementById("root")),C()}},[[41,1,2]]]);
//# sourceMappingURL=main.04766c5b.chunk.js.map