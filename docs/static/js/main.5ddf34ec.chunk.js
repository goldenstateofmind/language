(this["webpackJsonpgesture-cards-stack"]=this["webpackJsonpgesture-cards-stack"]||[]).push([[0],{167:function(e,t){},299:function(e,t,n){e.exports={container:"styles_container__d38tt",deck:"styles_deck__2tlNI"}},390:function(e,t){},392:function(e,t){},434:function(e,t){},436:function(e,t){},469:function(e,t){},470:function(e,t){},475:function(e,t){},477:function(e,t){},484:function(e,t){},503:function(e,t){},565:function(e,t,n){},566:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),r=n(41),s=n.n(r),o=n(5),i=n(16),l=n(2),u=n(3),d=n(31),j=n(173),f=n.p+"static/media/thumbs-down-crop.b59f6f3d.svg",b=n.p+"static/media/thumbs-up-crop.4309aff7.svg",m=n(4);function h(e){var t=e.addSheetItem,n=e.handleSearchSelect,c=e.name;return Object(m.jsx)("div",{className:"mx-4 whitespace-pre AddName",children:Object(m.jsxs)("button",{className:"h-8 px-2 border border-gray-400 rounded ",onClick:function(e){t({name:c,yesOrNo:"YES"}),n({value:c})},children:['Add "',c,'"']})})}var O=n(569),v=(n(175),function(e){var t=e.options,n=e.handleSearch,c=e.handleSearchSelect,a=e.value,r=t.map((function(e){return e.value.toUpperCase()}));return Object(m.jsx)(m.Fragment,{children:Object(m.jsx)(O.a,{options:t,style:{width:200},onSelect:function(e,t){return c({value:e,option:t})},onSearch:function(e){var t=!r.includes(e.toUpperCase());n({isNotListed:t,searchText:e})},placeholder:"Search",filterOption:function(e,t){return-1!==t.value.toUpperCase().indexOf(e.toUpperCase())},value:a})})}),x=n(97),p=n(298),N=function(e,t){return["perspective(1500px)","rotateY(".concat(e/10,"deg)"),"rotateZ(".concat(e,"deg)"),"scale(".concat(t,")")].join(" ")};var g=function(e){e.cardInfo;var t=Object(c.useContext)(C),n=t.contextDict,a=t.dispatchUpdateEvent,r=(n.names,n.propsDict),s=n.access_token,o=Object(c.useState)((function(){return new Set})),i=Object(u.a)(o,1)[0];Object(c.useEffect)((function(e){}),[e.cardInfo.name]);var d=Object(x.useSprings)(1,(function(e){return{immediate:!0,initial:null,to:{x:0,y:0},from:{x:0,y:0}}})),j=Object(u.a)(d,2),f=j[0],b=j[1],h=Object(p.useDrag)((function(t){var n=Object(u.a)(t.args,1)[0],c=t.active,r=Object(u.a)(t.movement,1)[0],o=Object(u.a)(t.direction,1)[0],l=Object(u.a)(t.velocity,1)[0];e.cardInfo.Name;if(!c&&l>.2){i.add(n);var d=1===o?"YES":-1===o?"NO":null;a("UPDATE",{key:e.cardInfo.Name,value:d,access_token:s})}b.start((function(e){if(n===e){var t=i.has(n);return{x:t?(200+window.innerWidth)*o:c?r:0,rot:r/100+(t?10*o*l:0),scale:c?1.1:1,delay:void 0,config:{friction:50,duration:t?null:200,tension:c?800:t?2e4:500}}}})),c||1!==i.size||setTimeout((function(){i.clear(),b.start((function(e){return{x:0,rot:0,scale:1,y:0,delay:0}}))}),600)})),O=function(t){var n,c=null===e||void 0===e?void 0:e.cardInfo,a=c.wikiExtractHtml||"";return a=a.replaceAll("\\n","").replaceAll('\\"','"'),(null===c||void 0===c||null===(n=c.wikiUrl)||void 0===n?void 0:n.length)>0&&(a+='<a class="text-gray-400" href="'.concat(c.wikiUrl,'">\xbb</a>')),Object(m.jsxs)("div",{className:"Card",children:[c.Phonetic&&Object(m.jsxs)("div",{className:"italic text-center pronunciation",children:["(",c.Phonetic,")"]}),Object(m.jsx)("div",{className:"pt-4 text-sm extract_html",dangerouslySetInnerHTML:{__html:a}}),Object(m.jsx)("div",{className:"p-4",children:Object(m.jsxs)("table",{className:"w-full",children:[Object(m.jsx)("thead",{}),Object(m.jsx)("tbody",{children:Object.keys(r).map((function(e){return c[r[e]]&&Object(m.jsxs)("tr",{className:"brder",children:[Object(m.jsx)("td",{className:"w-px p-1 brder whitespace-nowrap",children:e}),Object(m.jsx)("td",{className:["p-1 text-center brder",r[e]].join(" "),children:c[r[e]]})]},[t,e].join("-"))}))})]})})]})};return Object(m.jsx)(m.Fragment,{children:f.map((function(t,n){var c=t.x,a=t.y;return Object(m.jsx)(x.animated.div,{className:"flex items-center justify-center h-full overflow-hidden zabsolute deck w-72 ",style:{x:c,y:a},children:Object(m.jsxs)(x.animated.div,Object(l.a)(Object(l.a)({},h(n)),{},{style:{transform:Object(x.to)([0,1],N)},className:"flex flex-col items-center justify-start w-full h-full overflow-hidden bg-white border border-gray-400 rounded-lg ustify-center",children:[Object(m.jsx)("div",{className:"flex flex-col justify-center w-full h-20 overflow-auto text-center bg-gray-200",children:Object(m.jsx)("h2",{className:"h-full CardName",children:e.cardInfo.Name})}),Object(m.jsx)("div",{className:"w-full h-full p-4 mb-4 overflow-auto text-sm select-none grow",children:O(e.cardInfo.name)})]}))},n)}))})};n(129),n(172);n(570);function w(e){var t=e.userName,n=e.rowsUnfiltered,c=e.otherUser;console.log("userName",t),console.log("otherUser",c);n.filter((function(e){return"YES"===e[t]})).map((function(e){return e.Name}));var a=n.filter((function(e){return"YES"===e[t]&&"YES"===e[c]})).map((function(e){return e.Name})).sort();return Object(m.jsx)("div",{className:"flex justify-center h-full p-2 StatsPage",children:Object(m.jsxs)("div",{className:"flex flex-col h-full p-0",children:[Object(m.jsx)("h2",{className:"mt-0",children:"Matches"}),Object(m.jsx)("ul",{className:"overflow-auto text-lg list-decimal list-inside",children:a.map((function(e){return Object(m.jsx)("li",{children:e})}))})]})})}var S="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDfF5sWVoWK+oa6\n7xIdrmUBJn6w3RFjjwqQOYMh7AzKTsbcOfryZJlhqh5ykxyPu9BD4xAY5CFJu7fM\nauFasYZbo/FSqRhzgokDKTcZUpg9oY0odmmZPYMd6yjEh7SAyOXB9Ohb4/T5jMHQ\nlg5BzZ4VTNNWJjQxyFpJTRNxzfJRtty5qfBFPL3cyED5ihHSz24/xJ2k/JtScY7E\n6MxqJNrPR/Yw2Y8Th98BLbeRYBecxX7/zqgt24dmiIbK3wzKX2wng4YQMb3ofdz7\n+GcMA9VILw6jLlreXmU0/UfITQT/FmNTvxzpVZ7c6zjsYzK8u6/se69rnPZDNbNc\nZyGKMPZtAgMBAAECggEABDhw8Clp3wO3TyEHtt+zkc6AdhMbPvFtUeYso2nQ93Yp\nupqEM1gQ3hv29dRE+uPNiwM9gjhf+Cz2ILFi8FwhvmkUadZrcSqmhz9H3LxHHLS0\n3sTtYX9G6ZF8f3SmcbXwlsyYer3jcWHRfC3ijinNfvn+7jHMf1FFgqkpIC2KaIj5\nNYb1L/9L5dY6qVKuA8rrbAAat6OAp/BmE+V3cYUqh2nZnKQgSr2vyvcv6sqSTpJh\nYbGrENXbeCxhlUwYslduIaak1eHDZxGZqUl7a2MbE/GLl1olLRIIo56ZpYqg93u2\nSNjIfQzVoWaiH+XQ7y/pICD4fxa/taLdqTrxu+L6BwKBgQDv3rCsYv5AMIg3cFBd\nfHJvWpoMArMV3fRIDEMkmvO1xntYXcVTJs5t7spY5iwRZ1uSt8rTX9KCPtm7RQzF\nNoe6xEKkiU8iNs8T4Mw0iBrfmrrZzwWzZdSs9IyTxUpSNK2ni/z9WfXFYxbvEnCD\nfYQuRxKgAStRyzzMtpy7JlpwzwKBgQDuGBdvh25QA21TTqcIywmjEBL8Ove6orHs\nzrJjFr+1YaUSCjG9cvmL6shcx82OSIsSkV+pM9hvPqICVzBVC78X0bKM9+C5vLHE\nNVTdk3Wl7pKe17kvFVDTaBG8jSg91NV1W9MN3yV7V24t3fPAayAttEHNo8tmPST9\n5CAqRUUcAwKBgBOU1EteUW8gBx6vdoALNrRMayLr3X69fcGb7qdAVwDR0SPnk8Iz\n+soSokYblCFflKQniNE0k1S6mL+m5WH8D5x5hQ81flZGryTqRwFK0xbJ5NL/CXIZ\nsADmfctaYbTQRBTXYrGz9FJGwoqFsNWrG21DtAuHzOeCddYoWicU/HEVAoGAHIiK\nlnUWhURD3833OpiKiR4uCEhQ0+8Xf5etzS42v1f6XlUWbOvQeDIk3Omc+sY61HjT\njAWIlJxe8gTc5/RGbGZXDYnPRrMUYr05dGxtlvsmWx7jNH9LdmpsZbpM7kwJYM0m\nV+08IrHxpFGLGq475v5JPIm6oIAHZN3n9OjkRV0CgYEAu7CFnBK+7E8f5Q41usrI\nCOkO4bG746+Td2ROlcXdlbeyb/ZLGlUuW+iuRaGMfneIewy5w6fjoyPTJLl1NhGV\nU252brzfL566Hhr/kW8tqApScMVUbLNCRLSREfnkvCwA6Pmwv5W/NYTm/zmDo2mB\nlvcM6nmnqLuPG4kw6mA+H4Y=\n-----END PRIVATE KEY-----\n",y="flashcardsserviceaccount@flashcards-290716.iam.gserviceaccount.com",k="15488X0n6WmgSafYLz58oVa8pTSY1HyJKjNhf-Jaonus",E=n(299),A=n.n(E);var I=n(378).GoogleSpreadsheet,Y=["Jennifer","John"];function T(){return(T=Object(d.a)(Object(i.a)().mark((function e(){var t,n,c;return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new I(k),console.log("doc",t),e.next=4,t.useServiceAccountAuth({client_email:y,private_key:S});case 4:return e.next=6,t.loadInfo();case 6:return n=t.sheetsByTitle.votes,e.next=9,n.getRows();case 9:return c=e.sent,e.abrupt("return",{sheet:n,rows:c});case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var U={Meaning:"Meaning",Origin:"Origin",Nickname:"Nickname",Popularity:"Rank IE",Quantile:"percentile",Notable:"Notable"},C=a.a.createContext({propsDict:U});function R(){var e,t=Object(c.useState)(0),n=Object(u.a)(t,2),a=n[0],r=n[1],s=Object(c.useState)(!1),O=Object(u.a)(s,2),x=O[0],p=O[1],N=Object(c.useState)([]),S=Object(u.a)(N,2),y=S[0],k=S[1],E=Object(c.useState)([]),I=Object(u.a)(E,2),R=I[0],D=I[1],L=Object(c.useState)(""),M=Object(u.a)(L,2),z=M[0],B=M[1],F=Object(c.useState)({}),P=Object(u.a)(F,2),G=P[0],K=P[1],H=Object(c.useState)({}),V=Object(u.a)(H,2),J=V[0],q=V[1],Q=Object(c.useState)(!1),Z=Object(u.a)(Q,2),W=Z[0],_=Z[1],X=Object(c.useState)(Y[1]),$=Object(u.a)(X,2),ee=$[0],te=$[1],ne=Object(c.useState)(0),ce=Object(u.a)(ne,2),ae=ce[0],re=ce[1],se=Object(c.useState)(0),oe=Object(u.a)(se,2),ie=oe[0],le=oe[1],ue=Object(c.useState)(0),de=Object(u.a)(ue,2),je=de[0],fe=de[1],be=Object(c.useState)(0),me=Object(u.a)(be,2),he=me[0],Oe=me[1],ve=Object(c.useState)(0),xe=Object(u.a)(ve,2),pe=xe[0],Ne=xe[1],ge=null!==(e=Object.keys(G))&&void 0!==e?e:[],we=null===ge||void 0===ge?void 0:ge[a],Se=G[ge[a]],ye=Object.keys(G).length-1,ke=1,Ee=null===y||void 0===y?void 0:y.filter((function(e){return void 0===e[ee]||""===e[ee]})).length;Object(c.useEffect)((function(){var e=function(e){var t=window.location.hash;if(t){var n=new URLSearchParams(t.slice(1));return null===n||void 0===n?void 0:n.get(e)}}("user")||Y[0];te(e),console.log("user",e),function(){return T.apply(this,arguments)}().then((function(t){var n=t.sheet,c=t.rows;ke=c.length,console.log("TOTAL_CARDS",ke);var a=c.filter((function(t){return!t[e]||0===t[e].length}));Ee=a.length,re(c.filter((function(t){return"YES"===t[e]})).length),console.log("FILTERED_YES_COUNT",ae),le(c.filter((function(t){return"NO"===t[e]})).length),console.log("FILTERED_NO_COUNT",ie),D(c),console.log("rows",c),k(a),q(n);var r={};a.forEach((function(e){r[e.Name]=Object(l.a)({},e)})),K(r),Ue((function(e){return Object(l.a)(Object(l.a)({},e),{},{givenNames:Object(l.a)({},G)})}))}))}),[ee]);var Ae=function(){Ne((function(e){return!e})),setTimeout((function(){Ne((function(e){return!e}))}),800)},Ie=Object(c.useState)({names:ge,propsDict:U,activeIndex:a,activeName:we,cardInfo:Se,userName:""}),Ye=Object(u.a)(Ie,2),Te=Ye[0],Ue=Ye[1],Ce=function(){var e=Object(d.a)(Object(i.a)().mark((function e(t){var n,c,a;return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.key,c=t.value,console.log(" - updateSheetValues - ",n,ee,c),(a=y.find((function(e){return e.Name===n})))[ee]=c,e.next=6,a.save();case 6:e.sent;case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Re=function(){var e=Object(d.a)(Object(i.a)().mark((function e(t){var n,c,r,s,l,u,d,j,f,b;return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c=t.name,r=t.meaning,s=void 0===r?"":r,l=t.nicknames,u=void 0===l?"":l,d=t.origin,j=void 0===d?"":d,f=t.yesOrNo,n={Name:c},Object(o.a)(n,ee,f),Object(o.a)(n,"Meaning",s),Object(o.a)(n,"Nickname",u),Object(o.a)(n,"Origin",j),Object(o.a)(n,"Added By",ee),b=n,J.addRow(b),B(""),console.log("activeIndex",a);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),De=function(e,t){var n=t.key,c=(t.prop,t.value),a=t.loginName,s=t.access_token;switch(e){case"LOGIN":return void Ue((function(e){return console.log("ps",e),Object(l.a)(Object(l.a)({},e),{},{access_token:s,loginName:a})}));case"SET_USER":var o=t.userName;return console.log("userName",o),te(o),void Ue((function(e){return console.log("ps",e),Object(l.a)(Object(l.a)({},e),{},{activeUser:o})}));case"UPDATE":if(console.log("AppContext",C),console.log("AppContext",C.current),console.log("names",ge),console.log("names 0",ge[0]),console.log("names -1",ge[-1]),Ce({key:n,userName:o,value:c}),console.log("key, userName, value",n,o,c),"YES"===c){console.log("value",c),fe((function(e){return e+1}));var i=Y.filter((function(e){return e!==o}))[0];console.log("otherUser",i),console.log("rowsUnfiltered",R);var u=R.find((function(e){return e.Name===n}));console.log("nameRow",u),"YES"===u[i]&&Ae()}return"NO"===c&&Oe((function(e){return e+1})),console.log("lastIndex",ye),void r((function(e){return e<ye?e+1:0}));default:return}},Le=function(e){var t=e.value;e.option,ge.indexOf(t);B("")},Me=Object(m.jsxs)(m.Fragment,{children:[Object(m.jsxs)("div",{id:"Search",className:"flex items-start justify-center m-1 mb-4",children:[Object(m.jsx)(v,{handleSearch:function(e){var t=e.isNotListed,n=e.searchText;p(t),B(n)},handleSearchSelect:Le,value:{value:z},options:ge.slice(0).sort().map((function(e){return{value:e}}))}),x&&null!==z&&void 0!==z&&z.length?Object(m.jsx)(h,{addSheetItem:Re,handleSearchSelect:Le,name:z}):Object(m.jsx)(m.Fragment,{})]}),Object(m.jsx)("div",{id:"App",className:"flex overflow-hidden pb-4 h-full items-center justify-center ".concat(A.a.container),children:Object(m.jsxs)("div",{id:"Deck-wrapper",className:"flex items-end justify-between flex-auto w-full h-full overflow-hidden grow",children:[Object(m.jsx)("div",{className:"w-12 h-12 m-1",children:Object(m.jsx)("img",{src:f,onClick:function(){return De("UPDATE",{key:Se.Name,userName:ee,value:"NO"})}})}),Se&&Object(m.jsx)(g,{cardInfo:Se}),Object(m.jsx)("div",{className:"w-12 h-12 m-1",children:Object(m.jsx)("img",{src:b,onClick:function(){return De("UPDATE",{key:Se.Name,userName:ee,value:"YES"})}})})]})})]});return Object(m.jsx)(C.Provider,{value:{contextDict:Te,dispatchUpdateEvent:De},children:Object(m.jsxs)("div",{id:"outer",className:"flex flex-col justify-between flex-auto h-full grow",children:[Object(m.jsx)("header",{className:"sticky top-0 text-center bg-gray-100",children:Object(m.jsx)("div",{id:"login-wrapper",className:"m-2",children:Object(m.jsx)("div",{className:"flex justify-end p-2 text-sm",children:Object(m.jsx)("button",{onClick:function(){return _((function(e){return!e}))},children:ee})})})}),Object(m.jsx)("main",{className:"flex flex-col flex-auto overflow-auto grow",children:W?Object(m.jsx)(w,{userName:ee,otherUser:Y.filter((function(e){return e!==ee}))[0],rowsUnfiltered:R}):Me}),Object(m.jsx)("footer",{className:"sticky bottom-0 p-2 bg-gray-100",children:Object(m.jsxs)("div",{id:"counter-wrapper",className:"flex items-center self-end w-full stats justify-evenly",children:[Object(m.jsxs)("div",{className:"flex items-center",children:[Object(m.jsx)(j.a,{}),Object(m.jsx)("span",{className:"p-1 text-xs",children:he+ie})]}),Object(m.jsxs)("div",{className:"flex items-center",children:[Object(m.jsxs)("div",{className:"flex w-6 deck-of-cards",children:[Object(m.jsx)("div",{className:"absolute w-4 h-5 translate-x-2 bg-white rounded icon-border"}),Object(m.jsx)("div",{className:"absolute w-4 h-5 translate-x-1 bg-white rounded icon-border"}),Object(m.jsx)("div",{className:"z-10 w-4 h-5 bg-white rounded icon-border"})]}),Object(m.jsx)("span",{className:"p-1 text-xs",children:Ee&&Ee})]}),Object(m.jsxs)("div",{className:"flex items-center",children:[Object(m.jsxs)("div",{className:"flip-animation-".concat(pe),children:[Object(m.jsx)(j.b,{onClick:Ae})," "]}),Object(m.jsx)("span",{className:"p-1 text-xs",children:je+ae})]})]})})]})})}n(565);s.a.render(Object(m.jsx)(R,{}),document.getElementById("root"))}},[[566,1,2]]]);
//# sourceMappingURL=main.5ddf34ec.chunk.js.map