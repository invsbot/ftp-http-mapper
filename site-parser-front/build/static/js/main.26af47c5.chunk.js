(this["webpackJsonpsite-parser-front"]=this["webpackJsonpsite-parser-front"]||[]).push([[0],{60:function(e,t,a){e.exports=a(74)},65:function(e,t,a){},70:function(e,t,a){},71:function(e,t,a){},74:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(8),l=a.n(c),u=(a(65),a(51)),i=a(24),o=a(9),m=a(46),s=a(39),p=a.n(s),b=a(47),d=a(19),f=a(105),h=a(106),E=a(101),v=a(107),g=a(110),j=a(108),O=a(113),x=a(109),y=a(2),N=a(112),S=function(e){var t=e.children,a=e.value,n=e.index,c=Object(y.a)(e,["children","value","index"]);return r.a.createElement(E.a,Object.assign({component:"div",role:"tabpanel",hidden:a!==n,id:"full-width-tabpanel-".concat(n),"aria-labelledby":"full-width-tab-".concat(n)},c),r.a.createElement(N.a,{p:3},t))},_=(a(70),function(){var e=Object(n.useState)({}),t=Object(d.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)({}),u=Object(d.a)(l,2),i=u[0],s=u[1],y=Object(n.useState)([]),N=Object(d.a)(y,2),_=N[0],w=N[1],k=Object(n.useState)({}),z=Object(d.a)(k,2),C=z[0],I=z[1],J=function(){var e=Object(b.a)(p.a.mark((function e(t){var n,r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),2===Object.keys(a).length){e.next=3;break}return e.abrupt("return");case 3:return e.prev=3,e.next=6,fetch("http://localhost:8080/mapper",{mode:"no-cors",method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});case 6:return n=e.sent,e.next=9,n.json();case 9:r=e.sent,s(r.maxSizePage),w(r.urlArray),I(r.minSizePage),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(3),console.log(e.t0);case 18:case"end":return e.stop()}}),e,null,[[3,15]])})));return function(t){return e.apply(this,arguments)}}(),P=function(e){c(Object(m.a)({},a,Object(o.a)({},e.target.name,e.target.value)))},W=r.a.useState("one"),q=Object(d.a)(W,2),F=q[0],T=q[1],A=function(e){return r.a.createElement(f.a,null,e.map((function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(h.a,{button:!0,component:"a",target:"_blank",href:"".concat(a.url,"/").concat(e.pageName)},r.a.createElement(E.a,{variant:"inherit",noWrap:!0},e.pageName)))})))};return r.a.createElement(v.a,{className:"container",justify:"space-between",direction:"column",lg:5,sm:5,xl:6},r.a.createElement("h2",{className:"container__title"},"\u041f\u043e\u0441\u0442\u0440\u043e\u0435\u043d\u0438\u0435 \u043a\u0430\u0440\u0442\u044b \u0441\u0430\u0439\u0442\u0430"),r.a.createElement("form",{className:"submit__form",onSubmit:J},r.a.createElement(g.a,{fullWidth:!0,required:!0,className:"submit__input",onChange:P,name:"url",id:"urlInput",label:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0441\u044b\u043b\u043a\u0443:",variant:"standard"}),r.a.createElement(g.a,{type:"number",required:!0,fullWidth:!0,className:"submit__input",onChange:P,name:"deep",id:"deepLevelInput",label:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0443\u0440\u043e\u0432\u0435\u043d\u044c \u0432\u043b\u043e\u0436\u0435\u043d\u043d\u043e\u0441\u0442\u0438:",variant:"standard"}),r.a.createElement(j.a,{className:"submit__button",type:"submit",variant:"contained",color:"primary"},"\u041f\u043e\u0441\u0442\u0440\u043e\u0438\u0442\u044c")),_.length>0&&r.a.createElement(r.a.Fragment,null,r.a.createElement(O.a,{value:F,onChange:function(e,t){T(t)},centered:!0},r.a.createElement(x.a,{value:"one",label:"\u0412\u0441\u0435 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u044b: ".concat(_.length),wrapped:!0}),r.a.createElement(x.a,{value:"two",label:"\u041c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u0430\u044f"}),r.a.createElement(x.a,{value:"three",label:"\u041c\u0438\u043d\u0438\u043c\u0430\u043b\u044c\u043d\u0430\u044f"})),r.a.createElement(S,{value:F,index:"one"},r.a.createElement("p",{className:"page-size-count"},"\u041e\u0431\u0449\u0435\u0435 \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e: ",_.reduce((function(e,t){return e+Number(t.pageSize)}),0)),A(_)),r.a.createElement(S,{value:F,index:"two"},A([i])),r.a.createElement(S,{value:F,index:"three"},A([C]))))});a(71);var w=function(){return r.a.createElement("div",{className:"main-container"},r.a.createElement(u.a,null,r.a.createElement(i.c,null,r.a.createElement(i.a,{path:"/",render:function(e){return r.a.createElement(_,e)}}))))};l.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[60,1,2]]]);
//# sourceMappingURL=main.26af47c5.chunk.js.map