(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{182:function(e,t,r){var n,o=function(){var e=String.fromCharCode,t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",n={};function o(e,t){if(!n[e]){n[e]={};for(var i=0;i<e.length;i++)n[e][e.charAt(i)]=i}return n[e][t]}var l={compressToBase64:function(input){if(null==input)return"";var e=l._compress(input,6,(function(a){return t.charAt(a)}));switch(e.length%4){default:return e;case 1:return e+"===";case 2:return e+"==";case 3:return e+"="}},decompressFromBase64:function(input){return null==input?"":""==input?null:l._decompress(input.length,32,(function(e){return o(t,input.charAt(e))}))},compressToUTF16:function(input){return null==input?"":l._compress(input,15,(function(a){return e(a+32)}))+" "},decompressFromUTF16:function(e){return null==e?"":""==e?null:l._decompress(e.length,16384,(function(t){return e.charCodeAt(t)-32}))},compressToUint8Array:function(e){for(var t=l.compress(e),r=new Uint8Array(2*t.length),i=0,n=t.length;i<n;i++){var o=t.charCodeAt(i);r[2*i]=o>>>8,r[2*i+1]=o%256}return r},decompressFromUint8Array:function(t){if(null==t)return l.decompress(t);for(var r=new Array(t.length/2),i=0,n=r.length;i<n;i++)r[i]=256*t[2*i]+t[2*i+1];var o=[];return r.forEach((function(t){o.push(e(t))})),l.decompress(o.join(""))},compressToEncodedURIComponent:function(input){return null==input?"":l._compress(input,6,(function(a){return r.charAt(a)}))},decompressFromEncodedURIComponent:function(input){return null==input?"":""==input?null:(input=input.replace(/ /g,"+"),l._decompress(input.length,32,(function(e){return o(r,input.charAt(e))})))},compress:function(t){return l._compress(t,16,(function(a){return e(a)}))},_compress:function(e,t,r){if(null==e)return"";var i,n,o,l={},c={},f="",v="",d="",m=2,h=3,_=2,y=[],w=0,O=0;for(o=0;o<e.length;o+=1)if(f=e.charAt(o),Object.prototype.hasOwnProperty.call(l,f)||(l[f]=h++,c[f]=!0),v=d+f,Object.prototype.hasOwnProperty.call(l,v))d=v;else{if(Object.prototype.hasOwnProperty.call(c,d)){if(d.charCodeAt(0)<256){for(i=0;i<_;i++)w<<=1,O==t-1?(O=0,y.push(r(w)),w=0):O++;for(n=d.charCodeAt(0),i=0;i<8;i++)w=w<<1|1&n,O==t-1?(O=0,y.push(r(w)),w=0):O++,n>>=1}else{for(n=1,i=0;i<_;i++)w=w<<1|n,O==t-1?(O=0,y.push(r(w)),w=0):O++,n=0;for(n=d.charCodeAt(0),i=0;i<16;i++)w=w<<1|1&n,O==t-1?(O=0,y.push(r(w)),w=0):O++,n>>=1}0==--m&&(m=Math.pow(2,_),_++),delete c[d]}else for(n=l[d],i=0;i<_;i++)w=w<<1|1&n,O==t-1?(O=0,y.push(r(w)),w=0):O++,n>>=1;0==--m&&(m=Math.pow(2,_),_++),l[v]=h++,d=String(f)}if(""!==d){if(Object.prototype.hasOwnProperty.call(c,d)){if(d.charCodeAt(0)<256){for(i=0;i<_;i++)w<<=1,O==t-1?(O=0,y.push(r(w)),w=0):O++;for(n=d.charCodeAt(0),i=0;i<8;i++)w=w<<1|1&n,O==t-1?(O=0,y.push(r(w)),w=0):O++,n>>=1}else{for(n=1,i=0;i<_;i++)w=w<<1|n,O==t-1?(O=0,y.push(r(w)),w=0):O++,n=0;for(n=d.charCodeAt(0),i=0;i<16;i++)w=w<<1|1&n,O==t-1?(O=0,y.push(r(w)),w=0):O++,n>>=1}0==--m&&(m=Math.pow(2,_),_++),delete c[d]}else for(n=l[d],i=0;i<_;i++)w=w<<1|1&n,O==t-1?(O=0,y.push(r(w)),w=0):O++,n>>=1;0==--m&&(m=Math.pow(2,_),_++)}for(n=2,i=0;i<_;i++)w=w<<1|1&n,O==t-1?(O=0,y.push(r(w)),w=0):O++,n>>=1;for(;;){if(w<<=1,O==t-1){y.push(r(w));break}O++}return y.join("")},decompress:function(e){return null==e?"":""==e?null:l._decompress(e.length,32768,(function(t){return e.charCodeAt(t)}))},_decompress:function(t,r,n){var i,o,l,c,f,v,d,m=[],h=4,_=4,y=3,w="",O=[],data={val:n(0),position:r,index:1};for(i=0;i<3;i+=1)m[i]=i;for(l=0,f=Math.pow(2,2),v=1;v!=f;)c=data.val&data.position,data.position>>=1,0==data.position&&(data.position=r,data.val=n(data.index++)),l|=(c>0?1:0)*v,v<<=1;switch(l){case 0:for(l=0,f=Math.pow(2,8),v=1;v!=f;)c=data.val&data.position,data.position>>=1,0==data.position&&(data.position=r,data.val=n(data.index++)),l|=(c>0?1:0)*v,v<<=1;d=e(l);break;case 1:for(l=0,f=Math.pow(2,16),v=1;v!=f;)c=data.val&data.position,data.position>>=1,0==data.position&&(data.position=r,data.val=n(data.index++)),l|=(c>0?1:0)*v,v<<=1;d=e(l);break;case 2:return""}for(m[3]=d,o=d,O.push(d);;){if(data.index>t)return"";for(l=0,f=Math.pow(2,y),v=1;v!=f;)c=data.val&data.position,data.position>>=1,0==data.position&&(data.position=r,data.val=n(data.index++)),l|=(c>0?1:0)*v,v<<=1;switch(d=l){case 0:for(l=0,f=Math.pow(2,8),v=1;v!=f;)c=data.val&data.position,data.position>>=1,0==data.position&&(data.position=r,data.val=n(data.index++)),l|=(c>0?1:0)*v,v<<=1;m[_++]=e(l),d=_-1,h--;break;case 1:for(l=0,f=Math.pow(2,16),v=1;v!=f;)c=data.val&data.position,data.position>>=1,0==data.position&&(data.position=r,data.val=n(data.index++)),l|=(c>0?1:0)*v,v<<=1;m[_++]=e(l),d=_-1,h--;break;case 2:return O.join("")}if(0==h&&(h=Math.pow(2,y),y++),m[d])w=m[d];else{if(d!==_)return null;w=o+o.charAt(0)}O.push(w),m[_++]=o+w.charAt(0),o=w,0==--h&&(h=Math.pow(2,y),y++)}}};return l}();void 0===(n=function(){return o}.call(t,r,t,e))||(e.exports=n)},183:function(e,t,r){"use strict";(function(e){r(39),r(24),r(25),r(50),r(51);var n=r(22),o=(r(26),r(33)),l=r(87),c=r(184),f=r(188),v=r(185),d=r(189);function m(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function h(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}t.a={computed:h(h({},Object(o.d)(["is_player_races_shown","players","races"])),{},{races_per_player:{get:function(){return this.$store.state.races_per_player},set:function(e){this.updateRacesPerPlayer(e)}},player_names:{get:function(){return this.$store.state.player_names},set:function(e){this.updatePlayerNames(e)}},speaker_option:{get:function(){return this.$store.state.speaker_option},set:function(e){this.$store.commit("PUT_SPEAKER_OPTION",e)}}},Object(o.c)(["playerCount","activeRaces","minNumberOfRaces","numberOfAdditionalRacesNeeded"])),methods:h(h({},Object(o.b)(["addPlayer","checkAllRaces","generatePlayerRaces","removePlayer","revealPlayer","togglePlaceRacesShown","toggleRace","updatePlayerNames","updateRacesPerPlayer"])),{},{generatePlayersString:function(){var t=this,r=this.players.map((function(e){return h(h({},e),{},{revealed:t.is_player_races_shown})}));return e.compressToEncodedURIComponent(JSON.stringify(r))}}),components:{Button:l.a,Player:c.a,Section:f.a,SymbolLegend:v.a,Title:d.a}}}).call(this,r(182))},184:function(e,t,r){"use strict";r(39),r(24),r(25),r(50),r(51);var n=r(22),o=r(33),l=r(87);function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}var f={props:{player:{required:!0,type:Object}},methods:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},Object(o.b)(["revealPlayer"])),components:{Button:l.a}},v=f,d=r(19),component=Object(d.a)(v,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"[ w-100 mv2 flex flex-row justify-between items-center ][][ pr4-l ]"},[r("h1",{staticClass:"[ w-40 f5 lh-title tr ][][ w-50-l ]"},["unknown"===e.player.name?r("div",[e._v(e._s(e.player.id))]):r("div",[e._v(e._s(e.player.name))])]),e._v(" "),r("div",{staticClass:"[ w-60 pl3 tl ][][ w-50-l ]"},[!0===e.player.speaker?r("div",[r("b",[e._v("SPEAKER")])]):e._e(),e._v(" "),!0===e.player.revealed?r("div",e._l(e.player.races,(function(t){return r("div",{key:t},[e._v("\n\t\t\t\t"+e._s(t)+"\n\t\t\t")])})),0):r("div",{staticClass:"[ mb4 flex flex-row justify-around ]"},[r("Button",{attrs:{styling:"d"},nativeOn:{click:function(t){return e.revealPlayer(e.player)}}},[e._v("\n\t\t\t\tReveal races\n\t\t\t")])],1)]),e._v(" "),r("br")])}),[],!1,null,null,null);t.a=component.exports},185:function(e,t,r){"use strict";var n=r(19),component=Object(n.a)({},(function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)}),[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"[ mt3 mb3 ]"},[r("p",{staticClass:"[ ma0 lh-copy f7 ]"},[r("b",[e._v("*")]),e._v(" race recommended for new players")]),e._v(" "),r("p",{staticClass:"[ ma0 lh-copy f7 ]"},[r("b",[e._v("+")]),e._v(" Prophecy of Kings expansion race")])])}],!1,null,null,null);t.a=component.exports},188:function(e,t,r){"use strict";var n=r(19),component=Object(n.a)({},(function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"[ mb5 tc ]"},[e._t("default")],2)}),[],!1,null,null,null);t.a=component.exports},189:function(e,t,r){"use strict";var n=r(19),component=Object(n.a)({},(function(){var e=this,t=e.$createElement;return(e._self._c||t)("h1",{staticClass:"[ pa2 f2 lh-title white bg-brand-second-dark ]"},[e._t("default")],2)}),[],!1,null,null,null);t.a=component.exports},191:function(e,t,r){"use strict";r.r(t);var n=r(183).a,o=r(19),component=Object(o.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("article",{staticClass:"[ mb3 ]"},[e._v("\n\t\tTwilight Imperium 4 (TI4) race randomizer you can share with friends.\n\t")]),e._v(" "),r("Section",[r("Title",{staticClass:"[ mt0 ]"},[e._v("Players")]),e._v(" "),r("p",{staticClass:"[ lh-copy ]"},[e._v("\n\t\t\tNumber of players: "),r("b",{staticClass:"[ ml1 f3 v-mid ]"},[e._v(e._s(e.players.length))])]),e._v(" "),r("div",{staticClass:"[ mb4 flex flex-row justify-around ]"},[r("Button",{attrs:{styling:"d"},nativeOn:{click:function(t){return e.addPlayer.apply(null,arguments)}}},[e._v(" Add player ")]),e._v(" "),r("Button",{attrs:{styling:"h"},nativeOn:{click:function(t){return e.removePlayer.apply(null,arguments)}}},[e._v(" Remove player ")])],1),e._v(" "),r("div",[r("label",{staticClass:"[ dib mb2 ]"},[e._v("Add names seperated by "),r("b",[e._v(",")])]),e._v(" "),r("textarea",{directives:[{name:"model",rawName:"v-model",value:e.player_names,expression:"player_names"}],staticClass:"[ w-80 pa1 ]",attrs:{placeholder:"Bob, Joe, June",rows:"4"},domProps:{value:e.player_names},on:{input:function(t){t.target.composing||(e.player_names=t.target.value)}}})])],1),e._v(" "),r("Section",[r("Title",[e._v("Options")]),e._v(" "),r("div",{staticClass:"[ flex flex-column items-center ]"},[e._v("\n\t\t\tRaces per player:\n\t\t\t"),r("select",{directives:[{name:"model",rawName:"v-model",value:e.races_per_player,expression:"races_per_player"}],staticClass:"[ mt1 pa1 ]",on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.races_per_player=t.target.multiple?r:r[0]}}},e._l(Math.floor(e.races.length/e.players.length),(function(i){return r("option",{key:i,domProps:{value:i,selected:i==e.races_per_player}},[e._v("\n\t\t\t\t\t"+e._s(i)+"\n\t\t\t\t")])})),0)]),e._v(" "),r("div",{staticClass:"[ mt4 flex flex-column items-center ]"},[e._v("\n\t\t\tSpeaker selection:\n\t\t\t"),r("select",{directives:[{name:"model",rawName:"v-model",value:e.speaker_option,expression:"speaker_option"}],staticClass:"[ mt1 pa1 ]",on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.speaker_option=t.target.multiple?r:r[0]}}},[r("option",{attrs:{value:"1"}},[e._v("Don't give")]),e._v(" "),r("option",{attrs:{value:"2"}},[e._v("Randomly give")])])])],1),e._v(" "),r("Section",[r("Title",[e._v("Races")]),e._v(" "),r("div",{staticClass:"[ flex flex-row justify-around ]"},[r("Button",{attrs:{styling:"d"},nativeOn:{click:function(t){return e.checkAllRaces(!0)}}},[e._v(" Check all ")]),e._v(" "),r("Button",{attrs:{styling:"h"},nativeOn:{click:function(t){return e.checkAllRaces(!1)}}},[e._v(" Uncheck all ")])],1),e._v(" "),r("div",{staticClass:"[ ph4 flex flex-column items-center ]"},[r("SymbolLegend"),e._v(" "),e._l(e.races,(function(t){return r("label",{key:t.name,staticClass:"[ w-100 pv1 flex flex-row items-center justify-center ]"},[r("div",{staticClass:"[ w-25 pr1 tr ][ w-third-ns ][ w-40-l ]"},[r("input",{attrs:{type:"checkbox",name:"races"},domProps:{checked:t.active},on:{click:function(r){return e.toggleRace(t)}}})]),e._v(" "),r("div",{staticClass:"[ w-75 tl ][ w-two-third-ns ][ w-60-l ]"},[e._v("\n\t\t\t\t\t"+e._s(t.name)+"\n\t\t\t\t")])])}))],2),e._v(" "),r("p",{staticClass:"[ lh-copy ]"},[e._v("Select "),r("b",{staticClass:"[ mh1 f3 v-mid ]"},[e._v(e._s(e.numberOfAdditionalRacesNeeded))]),e._v(" additional races")]),e._v(" "),r("Button",{attrs:{styling:"c",disabled:0!==e.numberOfAdditionalRacesNeeded},nativeOn:{click:function(t){return e.generatePlayerRaces.apply(null,arguments)}}},[e._v("\n\t\t\tDeal races\n\t\t")]),e._v(" "),r("SymbolLegend"),e._v(" "),r("Button",{attrs:{styling:"h"},nativeOn:{click:function(t){return e.togglePlaceRacesShown.apply(null,arguments)}}},[e._v("\n\t\t\t"+e._s(e.is_player_races_shown?"Hide":"Show")+" player races\n\t\t")]),e._v(" "),r("div",{staticClass:"[ mt3 flex flex-column items-center ]"},e._l(e.players,(function(e){return r("Player",{key:e.id,attrs:{player:e}})})),1),e._v(" "),r("div",{staticClass:"[ tc ]"},[r("Button",{staticClass:"[ mt3 ]",attrs:{styling:"c",href:"/shared#"+e.generatePlayersString()}},[e._v("\n\t\t\t\tShare\n\t\t\t")])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);