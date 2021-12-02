module.exports=function(t){var n={};function r(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=t,r.c=n,r.d=function(t,n,e){r.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,n){if(1&n&&(t=r(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(r.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var a in t)r.d(e,a,function(n){return t[n]}.bind(null,a));return e},r.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(n,"a",n),n},r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},r.p="",r(r.s=15)}([function(t,n){t.exports=flarum.core.compat["admin/app"]},,function(t,n){t.exports=flarum.extensions["fof-gamification"]},,function(t,n){t.exports=flarum.core.compat["common/components/Select"]},function(t,n){t.exports=flarum.core.compat["common/Model"]},,,,,function(t,n){t.exports=flarum.core.compat["common/components/GroupBadge"]},function(t,n){t.exports=flarum.core.compat["common/models/Group"]},function(t,n){t.exports=flarum.core.compat["common/utils/withAttr"]},,,function(t,n,r){"use strict";r.r(n);var e=r(0),a=r.n(e),o=r(10),i=r.n(o),l=r(4),u=r.n(l),s=r(5),c=r.n(s),f=r(11),p=r.n(f),g=r(12),d=r.n(g);function y(t,n){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(r)return(r=r.call(t)).next.bind(r);if(Array.isArray(t)||(r=function(t,n){if(!t)return;if("string"==typeof t)return b(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return b(t,n)}(t))||n&&t&&"number"==typeof t.length){r&&(t=r);var e=0;return function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function b(t,n){(null==n||n>t.length)&&(n=t.length);for(var r=0,e=new Array(n);r<n;r++)e[r]=t[r];return e}var k=r(2);a.a.initializers.add("gamification-extras",(function(){k.Rank.groups=c.a.attribute("groups"),p.a.prototype.stickyRank=c.a.hasOne("sticky_rank");for(var t,n=a.a.store.all("ranks"),r={0:null},e=y(a.a.store.all("groups"));!(t=e()).done;){var o=t.value;r[o.id()]=o.nameSingular()}a.a.extensionData.for("gamification-extras").registerSetting((function(){return m("table",{className:"Ranks--Container"},n.map((function(t){return m("[",null,m("tr",null,m("td",null,k.rankLabel(t)),m("td",null,m(u.a,{className:"FormControl Ranks-group",value:Array.isArray(t.groups())?t.groups()[0]:t.groups(),options:r,placeholder:a.a.translator.trans("gamification-extras.admin.page.ranks.group"),onchange:d()("value",(function(n){return function(t,n){t.save({groups:[n]})}(t,n)}))}))),m("tr",{style:"height: 8px;"}))})))})).registerSetting((function(){return m("fieldset",{className:"Form-group"},m("legend",null,a.a.translator.trans("gamification-extras.admin.page.sticky-ranks.title")),m("label",null,a.a.translator.trans("fof-gamification.admin.page.sticky-ranks.label")),m("div",{className:"helpText"},a.a.translator.trans("fof-gamification.admin.page.sticky-ranks.help")),m("table",{className:"Ranks--Container"},a.a.store.all("groups").map((function(t){return m("[",null,m("tr",null,m("td",null,m(i.a,{group:t})),m("td",null,m("b",{className:"Ranks-group",style:"margin-right: 8px; margin-left: 5px;"},t.nameSingular())),m("td",null,m(u.a,{className:"FormControl name",options:n,value:t.stickyRank()?t.stickyRank().id():"",placeholder:a.a.translator.trans("fof-gamification.admin.page.ranks.help.name"),onchange:function(n){return function(t,n){var r,e={data:[]};t.save({relationships:{sticky_rank:n&&null!=(r=a.a.store.getById("ranks",n))?r:e}})}(t,n)}}))),m("tr",{style:"height: 8px;"}))}))))})).registerSetting({setting:"gamification-extras.onlyOneStickyRank",label:a.a.translator.trans("gamification-extras.admin.page.sticky-ranks.only_one_sticky_rank"),type:"boolean"})}))}]);
//# sourceMappingURL=admin.js.map