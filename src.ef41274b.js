parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"P1HH":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.isDirective=exports.directive=void 0;const e=new WeakMap,t=t=>(...s)=>{const i=t(...s);return e.set(i,!0),i};exports.directive=t;const s=t=>"function"==typeof t&&e.has(t);exports.isDirective=s;
},{}],"JQ4u":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.removeNodes=exports.reparentNodes=exports.isCEPolyfill=void 0;const e=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback;exports.isCEPolyfill=e;const o=(e,o,s=null,l=null)=>{for(;o!==s;){const s=o.nextSibling;e.insertBefore(o,l),o=s}};exports.reparentNodes=o;const s=(e,o,s=null)=>{for(;o!==s;){const s=o.nextSibling;e.removeChild(o),o=s}};exports.removeNodes=s;
},{}],"m4zr":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.nothing=exports.noChange=void 0;const e={};exports.noChange=e;const o={};exports.nothing=o;
},{}],"kXJ6":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.lastAttributeNameRegex=exports.createMarker=exports.isTemplatePartActive=exports.Template=exports.boundAttributeSuffix=exports.markerRegex=exports.nodeMarker=exports.marker=void 0;const e=`{{lit-${String(Math.random()).slice(2)}}}`;exports.marker=e;const t=`\x3c!--${e}--\x3e`;exports.nodeMarker=t;const r=new RegExp(`${e}|${t}`);exports.markerRegex=r;const s="$lit$";exports.boundAttributeSuffix=s;class o{constructor(t,o){this.parts=[],this.element=o;const i=[],l=[],p=document.createTreeWalker(o.content,133,null,!1);let c=0,d=-1,u=0;const{strings:f,values:{length:h}}=t;for(;u<h;){const t=p.nextNode();if(null!==t){if(d++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:o}=e;let i=0;for(let t=0;t<o;t++)n(e[t].name,s)&&i++;for(;i-- >0;){const e=f[u],o=x.exec(e)[2],n=o.toLowerCase()+s,i=t.getAttribute(n);t.removeAttribute(n);const a=i.split(r);this.parts.push({type:"attribute",index:d,name:o,strings:a}),u+=a.length-1}}"TEMPLATE"===t.tagName&&(l.push(t),p.currentNode=t.content)}else if(3===t.nodeType){const o=t.data;if(o.indexOf(e)>=0){const e=t.parentNode,l=o.split(r),p=l.length-1;for(let r=0;r<p;r++){let o,i=l[r];if(""===i)o=a();else{const e=x.exec(i);null!==e&&n(e[2],s)&&(i=i.slice(0,e.index)+e[1]+e[2].slice(0,-s.length)+e[3]),o=document.createTextNode(i)}e.insertBefore(o,t),this.parts.push({type:"node",index:++d})}""===l[p]?(e.insertBefore(a(),t),i.push(t)):t.data=l[p],u+=p}}else if(8===t.nodeType)if(t.data===e){const e=t.parentNode;null!==t.previousSibling&&d!==c||(d++,e.insertBefore(a(),t)),c=d,this.parts.push({type:"node",index:d}),null===t.nextSibling?t.data="":(i.push(t),d--),u++}else{let r=-1;for(;-1!==(r=t.data.indexOf(e,r+1));)this.parts.push({type:"node",index:-1}),u++}}else p.currentNode=l.pop()}for(const e of i)e.parentNode.removeChild(e)}}exports.Template=o;const n=(e,t)=>{const r=e.length-t.length;return r>=0&&e.slice(r)===t},i=e=>-1!==e.index;exports.isTemplatePartActive=i;const a=()=>document.createComment("");exports.createMarker=a;const x=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;exports.lastAttributeNameRegex=x;
},{}],"nn5n":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.TemplateInstance=void 0;var e=require("./dom.js"),t=require("./template.js");class s{constructor(e,t,s){this.__parts=[],this.template=e,this.processor=t,this.options=s}update(e){let t=0;for(const s of this.__parts)void 0!==s&&s.setValue(e[t]),t++;for(const s of this.__parts)void 0!==s&&s.commit()}_clone(){const s=e.isCEPolyfill?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),o=[],r=this.template.parts,n=document.createTreeWalker(s,133,null,!1);let i,p=0,l=0,a=n.nextNode();for(;p<r.length;)if(i=r[p],(0,t.isTemplatePartActive)(i)){for(;l<i.index;)l++,"TEMPLATE"===a.nodeName&&(o.push(a),n.currentNode=a.content),null===(a=n.nextNode())&&(n.currentNode=o.pop(),a=n.nextNode());if("node"===i.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(a.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(a,i.name,i.strings,this.options));p++}else this.__parts.push(void 0),p++;return e.isCEPolyfill&&(document.adoptNode(s),customElements.upgrade(s)),s}}exports.TemplateInstance=s;
},{"./dom.js":"JQ4u","./template.js":"kXJ6"}],"SM33":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SVGTemplateResult=exports.TemplateResult=void 0;var e=require("./dom.js"),t=require("./template.js");const s=` ${t.marker} `;class r{constructor(e,t,s,r){this.strings=e,this.values=t,this.type=s,this.processor=r}getHTML(){const e=this.strings.length-1;let r="",n=!1;for(let l=0;l<e;l++){const e=this.strings[l],i=e.lastIndexOf("\x3c!--");n=(i>-1||n)&&-1===e.indexOf("--\x3e",i+1);const o=t.lastAttributeNameRegex.exec(e);r+=null===o?e+(n?s:t.nodeMarker):e.substr(0,o.index)+o[1]+o[2]+t.boundAttributeSuffix+o[3]+t.marker}return r+=this.strings[e]}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}exports.TemplateResult=r;class n extends r{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const t=super.getTemplateElement(),s=t.content,r=s.firstChild;return s.removeChild(r),(0,e.reparentNodes)(s,r.firstChild),t}}exports.SVGTemplateResult=n;
},{"./dom.js":"JQ4u","./template.js":"kXJ6"}],"PIiJ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.EventPart=exports.PropertyPart=exports.PropertyCommitter=exports.BooleanAttributePart=exports.NodePart=exports.AttributePart=exports.AttributeCommitter=exports.isIterable=exports.isPrimitive=void 0;var t=require("./directive.js"),e=require("./dom.js"),i=require("./part.js"),s=require("./template-instance.js"),n=require("./template-result.js"),r=require("./template.js");const o=t=>null===t||!("object"==typeof t||"function"==typeof t);exports.isPrimitive=o;const a=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);exports.isIterable=a;class h{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let s=0;s<i.length-1;s++)this.parts[s]=this._createPart()}_createPart(){return new l(this)}_getValue(){const t=this.strings,e=t.length-1;let i="";for(let s=0;s<e;s++){i+=t[s];const e=this.parts[s];if(void 0!==e){const t=e.value;if(o(t)||!a(t))i+="string"==typeof t?t:String(t);else for(const e of t)i+="string"==typeof e?e:String(e)}}return i+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}exports.AttributeCommitter=h;class l{constructor(t){this.value=void 0,this.committer=t}setValue(e){e===i.noChange||o(e)&&e===this.value||(this.value=e,(0,t.isDirective)(e)||(this.committer.dirty=!0))}commit(){for(;(0,t.isDirective)(this.value);){const t=this.value;this.value=i.noChange,t(this)}this.value!==i.noChange&&this.committer.commit()}}exports.AttributePart=l;class u{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild((0,r.createMarker)()),this.endNode=t.appendChild((0,r.createMarker)())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=(0,r.createMarker)()),t.__insert(this.endNode=(0,r.createMarker)())}insertAfterPart(t){t.__insert(this.startNode=(0,r.createMarker)()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){for(;(0,t.isDirective)(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=i.noChange,t(this)}const e=this.__pendingValue;e!==i.noChange&&(o(e)?e!==this.value&&this.__commitText(e):e instanceof n.TemplateResult?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):a(e)?this.__commitIterable(e):e===i.nothing?(this.value=i.nothing,this.clear()):this.__commitText(e))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof s.TemplateInstance&&this.value.template===e)this.value.update(t.values);else{const i=new s.TemplateInstance(e,t.processor,this.options),n=i._clone();i.update(t.values),this.__commitNode(n),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,s=0;for(const n of t)void 0===(i=e[s])&&(i=new u(this.options),e.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(e[s-1])),i.setValue(n),i.commit(),s++;s<e.length&&(e.length=s,this.clear(i&&i.endNode))}clear(t=this.startNode){(0,e.removeNodes)(this.startNode.parentNode,t.nextSibling,this.endNode)}}exports.NodePart=u;class d{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;(0,t.isDirective)(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=i.noChange,t(this)}if(this.__pendingValue===i.noChange)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=i.noChange}}exports.BooleanAttributePart=d;class c extends h{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new p(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}exports.PropertyCommitter=c;class p extends l{}exports.PropertyPart=p;let _=!1;try{const t={get capture(){return _=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(g){}class m{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this.__pendingValue=t}commit(){for(;(0,t.isDirective)(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=i.noChange,t(this)}if(this.__pendingValue===i.noChange)return;const e=this.__pendingValue,s=this.value,n=null==e||null!=s&&(e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive),r=null!=e&&(null==s||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=v(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=i.noChange}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}exports.EventPart=m;const v=t=>t&&(_?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);
},{"./directive.js":"P1HH","./dom.js":"JQ4u","./part.js":"m4zr","./template-instance.js":"nn5n","./template-result.js":"SM33","./template.js":"kXJ6"}],"mAZn":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.defaultTemplateProcessor=exports.DefaultTemplateProcessor=void 0;var e=require("./parts.js");class t{handleAttributeExpressions(t,r,s,o){const a=r[0];if("."===a){return new e.PropertyCommitter(t,r.slice(1),s).parts}return"@"===a?[new e.EventPart(t,r.slice(1),o.eventContext)]:"?"===a?[new e.BooleanAttributePart(t,r.slice(1),s)]:new e.AttributeCommitter(t,r,s).parts}handleTextExpression(t){return new e.NodePart(t)}}exports.DefaultTemplateProcessor=t;const r=new t;exports.defaultTemplateProcessor=r;
},{"./parts.js":"PIiJ"}],"K8aL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.templateFactory=t,exports.templateCaches=void 0;var e=require("./template.js");function t(t){let s=r.get(t.type);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},r.set(t.type,s));let n=s.stringsArray.get(t.strings);if(void 0!==n)return n;const a=t.strings.join(e.marker);return void 0===(n=s.keyString.get(a))&&(n=new e.Template(t,t.getTemplateElement()),s.keyString.set(a,n)),s.stringsArray.set(t.strings,n),n}const r=new Map;exports.templateCaches=r;
},{"./template.js":"kXJ6"}],"dvwX":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.render=exports.parts=void 0;var e=require("./dom.js"),t=require("./parts.js"),r=require("./template-factory.js");const s=new WeakMap;exports.parts=s;const o=(o,a,p)=>{let d=s.get(a);void 0===d&&((0,e.removeNodes)(a,a.firstChild),s.set(a,d=new t.NodePart(Object.assign({templateFactory:r.templateFactory},p))),d.appendInto(a)),d.setValue(o),d.commit()};exports.render=o;
},{"./dom.js":"JQ4u","./parts.js":"PIiJ","./template-factory.js":"K8aL"}],"KMqM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"DefaultTemplateProcessor",{enumerable:!0,get:function(){return e.DefaultTemplateProcessor}}),Object.defineProperty(exports,"defaultTemplateProcessor",{enumerable:!0,get:function(){return e.defaultTemplateProcessor}}),Object.defineProperty(exports,"SVGTemplateResult",{enumerable:!0,get:function(){return t.SVGTemplateResult}}),Object.defineProperty(exports,"TemplateResult",{enumerable:!0,get:function(){return t.TemplateResult}}),Object.defineProperty(exports,"directive",{enumerable:!0,get:function(){return r.directive}}),Object.defineProperty(exports,"isDirective",{enumerable:!0,get:function(){return r.isDirective}}),Object.defineProperty(exports,"removeNodes",{enumerable:!0,get:function(){return n.removeNodes}}),Object.defineProperty(exports,"reparentNodes",{enumerable:!0,get:function(){return n.reparentNodes}}),Object.defineProperty(exports,"noChange",{enumerable:!0,get:function(){return o.noChange}}),Object.defineProperty(exports,"nothing",{enumerable:!0,get:function(){return o.nothing}}),Object.defineProperty(exports,"AttributeCommitter",{enumerable:!0,get:function(){return i.AttributeCommitter}}),Object.defineProperty(exports,"AttributePart",{enumerable:!0,get:function(){return i.AttributePart}}),Object.defineProperty(exports,"BooleanAttributePart",{enumerable:!0,get:function(){return i.BooleanAttributePart}}),Object.defineProperty(exports,"EventPart",{enumerable:!0,get:function(){return i.EventPart}}),Object.defineProperty(exports,"isIterable",{enumerable:!0,get:function(){return i.isIterable}}),Object.defineProperty(exports,"isPrimitive",{enumerable:!0,get:function(){return i.isPrimitive}}),Object.defineProperty(exports,"NodePart",{enumerable:!0,get:function(){return i.NodePart}}),Object.defineProperty(exports,"PropertyCommitter",{enumerable:!0,get:function(){return i.PropertyCommitter}}),Object.defineProperty(exports,"PropertyPart",{enumerable:!0,get:function(){return i.PropertyPart}}),Object.defineProperty(exports,"parts",{enumerable:!0,get:function(){return u.parts}}),Object.defineProperty(exports,"render",{enumerable:!0,get:function(){return u.render}}),Object.defineProperty(exports,"templateCaches",{enumerable:!0,get:function(){return a.templateCaches}}),Object.defineProperty(exports,"templateFactory",{enumerable:!0,get:function(){return a.templateFactory}}),Object.defineProperty(exports,"TemplateInstance",{enumerable:!0,get:function(){return p.TemplateInstance}}),Object.defineProperty(exports,"createMarker",{enumerable:!0,get:function(){return s.createMarker}}),Object.defineProperty(exports,"isTemplatePartActive",{enumerable:!0,get:function(){return s.isTemplatePartActive}}),Object.defineProperty(exports,"Template",{enumerable:!0,get:function(){return s.Template}}),exports.svg=exports.html=void 0;var e=require("./lib/default-template-processor.js"),t=require("./lib/template-result.js"),r=require("./lib/directive.js"),n=require("./lib/dom.js"),o=require("./lib/part.js"),i=require("./lib/parts.js"),u=require("./lib/render.js"),a=require("./lib/template-factory.js"),p=require("./lib/template-instance.js"),s=require("./lib/template.js");(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const l=(r,...n)=>new t.TemplateResult(r,n,"html",e.defaultTemplateProcessor);exports.html=l;const c=(r,...n)=>new t.SVGTemplateResult(r,n,"svg",e.defaultTemplateProcessor);exports.svg=c;
},{"./lib/default-template-processor.js":"mAZn","./lib/template-result.js":"SM33","./lib/directive.js":"P1HH","./lib/dom.js":"JQ4u","./lib/part.js":"m4zr","./lib/parts.js":"PIiJ","./lib/render.js":"dvwX","./lib/template-factory.js":"K8aL","./lib/template-instance.js":"nn5n","./lib/template.js":"kXJ6"}],"TOsx":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.removeNodesFromTemplate=n,exports.insertNodeIntoTemplate=l;var e=require("./template.js");const t=133;function n(e,n){const{element:{content:r},parts:l}=e,u=document.createTreeWalker(r,t,null,!1);let c=o(l),d=l[c],s=-1,i=0;const a=[];let p=null;for(;u.nextNode();){s++;const e=u.currentNode;for(e.previousSibling===p&&(p=null),n.has(e)&&(a.push(e),null===p&&(p=e)),null!==p&&i++;void 0!==d&&d.index===s;)d.index=null!==p?-1:d.index-i,d=l[c=o(l,c)]}a.forEach(e=>e.parentNode.removeChild(e))}const r=e=>{let n=11===e.nodeType?0:1;const r=document.createTreeWalker(e,t,null,!1);for(;r.nextNode();)n++;return n},o=(t,n=-1)=>{for(let r=n+1;r<t.length;r++){const n=t[r];if((0,e.isTemplatePartActive)(n))return r}return-1};function l(e,n,l=null){const{element:{content:u},parts:c}=e;if(null==l)return void u.appendChild(n);const d=document.createTreeWalker(u,t,null,!1);let s=o(c),i=0,a=-1;for(;d.nextNode();){for(a++,d.currentNode===l&&(i=r(n),l.parentNode.insertBefore(n,l));-1!==s&&c[s].index===a;){if(i>0){for(;-1!==s;)c[s].index+=i,s=o(c,s);return}s=o(c,s)}}}
},{"./template.js":"kXJ6"}],"cxO7":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"html",{enumerable:!0,get:function(){return a.html}}),Object.defineProperty(exports,"svg",{enumerable:!0,get:function(){return a.svg}}),Object.defineProperty(exports,"TemplateResult",{enumerable:!0,get:function(){return a.TemplateResult}}),exports.render=void 0;var e=require("./dom.js"),t=require("./modify-template.js"),r=require("./render.js"),n=require("./template-factory.js"),o=require("./template-instance.js"),s=require("./template.js"),a=require("../lit-html.js");const l=(e,t)=>`${e}--${t}`;let i=!0;void 0===window.ShadyCSS?i=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),i=!1);const d=e=>t=>{const r=l(t.type,e);let o=n.templateCaches.get(r);void 0===o&&(o={stringsArray:new WeakMap,keyString:new Map},n.templateCaches.set(r,o));let a=o.stringsArray.get(t.strings);if(void 0!==a)return a;const d=t.strings.join(s.marker);if(void 0===(a=o.keyString.get(d))){const r=t.getTemplateElement();i&&window.ShadyCSS.prepareTemplateDom(r,e),a=new s.Template(t,r),o.keyString.set(d,a)}return o.stringsArray.set(t.strings,a),a},p=["html","svg"],c=e=>{p.forEach(r=>{const o=n.templateCaches.get(l(r,e));void 0!==o&&o.keyString.forEach(e=>{const{element:{content:r}}=e,n=new Set;Array.from(r.querySelectorAll("style")).forEach(e=>{n.add(e)}),(0,t.removeNodesFromTemplate)(e,n)})})},m=new Set,y=(e,r,n)=>{m.add(e);const o=n?n.element:document.createElement("template"),s=r.querySelectorAll("style"),{length:a}=s;if(0===a)return void window.ShadyCSS.prepareTemplateStyles(o,e);const l=document.createElement("style");for(let t=0;t<a;t++){const e=s[t];e.parentNode.removeChild(e),l.textContent+=e.textContent}c(e);const i=o.content;n?(0,t.insertNodeIntoTemplate)(n,l,i.firstChild):i.insertBefore(l,i.firstChild),window.ShadyCSS.prepareTemplateStyles(o,e);const d=i.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==d)r.insertBefore(d.cloneNode(!0),r.firstChild);else if(n){i.insertBefore(l,i.firstChild);const e=new Set;e.add(l),(0,t.removeNodesFromTemplate)(n,e)}},S=(t,n,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const a=s.scopeName,l=r.parts.has(n),p=i&&11===n.nodeType&&!!n.host,c=p&&!m.has(a),S=c?document.createDocumentFragment():n;if((0,r.render)(t,S,Object.assign({templateFactory:d(a)},s)),c){const t=r.parts.get(S);r.parts.delete(S);const s=t.value instanceof o.TemplateInstance?t.value.template:void 0;y(a,S,s),(0,e.removeNodes)(n,n.firstChild),n.appendChild(S),r.parts.set(n,t)}!l&&p&&window.ShadyCSS.styleElement(n.host)};exports.render=S;
},{"./dom.js":"JQ4u","./modify-template.js":"TOsx","./render.js":"dvwX","./template-factory.js":"K8aL","./template-instance.js":"nn5n","./template.js":"kXJ6","../lit-html.js":"KMqM"}],"XaFz":[function(require,module,exports) {
"use strict";var t;Object.defineProperty(exports,"__esModule",{value:!0}),exports.UpdatingElement=exports.notEqual=exports.defaultConverter=void 0,window.JSCompiler_renameProperty=((t,e)=>t);const e={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}};exports.defaultConverter=e;const r=(t,e)=>e!==t&&(e==e||t==t);exports.notEqual=r;const s={attribute:!0,type:String,converter:e,reflect:!1,hasChanged:r},i=Promise.resolve(!0),a=1,o=4,n=8,p=16,h=32,c="finalized";class u extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=i,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,r)=>{const s=this._attributeNameForProperty(r,e);void 0!==s&&(this._attributeToPropertyMap.set(s,r),t.push(s))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=s){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const r="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[r]},set(e){const s=this[t];this[r]=e,this._requestUpdate(t,s)},configurable:!0,enumerable:!0})}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(c)||t.finalize(),this[c]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const r of e)this.createProperty(r,t[r])}}static _attributeNameForProperty(t,e){const r=e.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=r){return s(t,e)}static _propertyValueFromAttribute(t,r){const s=r.type,i=r.converter||e,a="function"==typeof i?i:i.fromAttribute;return a?a(t,s):t}static _propertyValueToAttribute(t,r){if(void 0===r.reflect)return;const s=r.type,i=r.converter;return(i&&i.toAttribute||e.toAttribute)(t,s)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|h,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,r){e!==r&&this._attributeToProperty(t,r)}_propertyToAttribute(t,e,r=s){const i=this.constructor,a=i._attributeNameForProperty(t,r);if(void 0!==a){const t=i._propertyValueToAttribute(e,r);if(void 0===t)return;this._updateState=this._updateState|n,null==t?this.removeAttribute(a):this.setAttribute(a,t),this._updateState=this._updateState&~n}}_attributeToProperty(t,e){if(this._updateState&n)return;const r=this.constructor,i=r._attributeToPropertyMap.get(t);if(void 0!==i){const t=r._classProperties.get(i)||s;this._updateState=this._updateState|p,this[i]=r._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~p}}_requestUpdate(t,e){let r=!0;if(void 0!==t){const i=this.constructor,a=i._classProperties.get(t)||s;i._valueHasChanged(this[t],e,a.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==a.reflect||this._updateState&p||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,a))):r=!1}!this._hasRequestedUpdate&&r&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=this._updateState|o;const r=this._updatePromise;this._updatePromise=new Promise((r,s)=>{t=r,e=s});try{await r}catch(s){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(s){e(s)}t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&h}get _hasRequestedUpdate(){return this._updateState&o}get hasUpdated(){return this._updateState&a}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))&&this.update(e)}catch(r){throw t=!1,r}finally{this._markUpdated()}t&&(this._updateState&a||(this._updateState=this._updateState|a,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~o}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}exports.UpdatingElement=u,u[t=c]=!0;
},{}],"qkP2":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.property=i,exports.query=s,exports.queryAll=c,exports.eventOptions=exports.customElement=void 0;const e=(e,t)=>(window.customElements.define(e,t),t),t=(e,t)=>{const{kind:r,elements:n}=t;return{kind:r,elements:n,finisher(t){window.customElements.define(e,t)}}},r=r=>n=>"function"==typeof n?e(r,n):t(r,n);exports.customElement=r;const n=(e,t)=>"method"!==t.kind||!t.descriptor||"value"in t.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}}:Object.assign({},t,{finisher(r){r.createProperty(t.key,e)}}),o=(e,t,r)=>{t.constructor.createProperty(r,e)};function i(e){return(t,r)=>void 0!==r?o(e,t,r):n(e,t)}function s(e){return(t,r)=>{const n={get(){return this.renderRoot.querySelector(e)},enumerable:!0,configurable:!0};return void 0!==r?u(n,t,r):p(n,t)}}function c(e){return(t,r)=>{const n={get(){return this.renderRoot.querySelectorAll(e)},enumerable:!0,configurable:!0};return void 0!==r?u(n,t,r):p(n,t)}}const u=(e,t,r)=>{Object.defineProperty(t,r,e)},p=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e}),l=(e,t)=>Object.assign({},t,{finisher(r){Object.assign(r.prototype[t.key],e)}}),d=(e,t,r)=>{Object.assign(t[r],e)},y=e=>(t,r)=>void 0!==r?d(e,t,r):l(e,t);exports.eventOptions=y;
},{}],"ahrP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.css=exports.unsafeCSS=exports.CSSResult=exports.supportsAdoptingStyleSheets=void 0;const e="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype;exports.supportsAdoptingStyleSheets=e;const t=Symbol();class s{constructor(e,s){if(s!==t)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(e?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}exports.CSSResult=s;const r=e=>new s(String(e),t);exports.unsafeCSS=r;const o=e=>{if(e instanceof s)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)},n=(e,...r)=>{const n=r.reduce((t,s,r)=>t+o(s)+e[r+1],e[0]);return new s(n,t)};exports.css=n;
},{}],"xPSq":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e={LitElement:!0,html:!0,svg:!0,TemplateResult:!0,SVGTemplateResult:!0};Object.defineProperty(exports,"html",{enumerable:!0,get:function(){return o.html}}),Object.defineProperty(exports,"svg",{enumerable:!0,get:function(){return o.svg}}),Object.defineProperty(exports,"TemplateResult",{enumerable:!0,get:function(){return o.TemplateResult}}),Object.defineProperty(exports,"SVGTemplateResult",{enumerable:!0,get:function(){return o.SVGTemplateResult}}),exports.LitElement=void 0;var t=require("lit-html"),r=require("lit-html/lib/shady-render.js"),s=require("./lib/updating-element.js");Object.keys(s).forEach(function(t){"default"!==t&&"__esModule"!==t&&(Object.prototype.hasOwnProperty.call(e,t)||Object.defineProperty(exports,t,{enumerable:!0,get:function(){return s[t]}}))});var n=require("./lib/decorators.js");Object.keys(n).forEach(function(t){"default"!==t&&"__esModule"!==t&&(Object.prototype.hasOwnProperty.call(e,t)||Object.defineProperty(exports,t,{enumerable:!0,get:function(){return n[t]}}))});var o=require("lit-html/lit-html.js"),i=require("./lib/css-tag.js");function l(e,t=[]){for(let r=0,s=e.length;r<s;r++){const s=e[r];Array.isArray(s)?l(s,t):t.push(s)}return t}Object.keys(i).forEach(function(t){"default"!==t&&"__esModule"!==t&&(Object.prototype.hasOwnProperty.call(e,t)||Object.defineProperty(exports,t,{enumerable:!0,get:function(){return i[t]}}))}),(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");const a=e=>e.flat?e.flat(1/0):l(e);class d extends s.UpdatingElement{static finalize(){super.finalize.call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const e=this.styles,t=[];if(Array.isArray(e)){a(e).reduceRight((e,t)=>(e.add(t),e),new Set).forEach(e=>t.unshift(e))}else e&&t.push(e);return t}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?i.supportsAdoptingStyleSheets?this.renderRoot.adoptedStyleSheets=e.map(e=>e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){super.update(e);const r=this.render();r instanceof t.TemplateResult&&this.constructor.render(r,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){}}exports.LitElement=d,d.finalized=!0,d.render=r.render;
},{"lit-html":"KMqM","lit-html/lib/shady-render.js":"cxO7","./lib/updating-element.js":"XaFz","./lib/decorators.js":"qkP2","lit-html/lit-html.js":"KMqM","./lib/css-tag.js":"ahrP"}],"poII":[function(require,module,exports) {

},{}],"cijC":[function(require,module,exports) {
"use strict";require("./fonts.css");var e=require("lit-element");let o=e.css`
/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */:host{line-height:1.15;-webkit-text-size-adjust:100%}:host{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}:host([_hidden]){display:none}
/* we can add custom styles below... */

/* common variables */
:root {
  /* typograph */
  --font-family: 'Ubuntu', sans-serif;
  --1rem: 16px;
  --box-radius: 4px;
  --alignment: left;
  --icon-size: 24px;

  /* dimensions */
  --grid-gutter: 9.53px;
  --setting-panel-height: 10em;

  /* colors */
  --primary-color: #4285f4;
  --red-color: #ee2d48;
  --border-color: #dadce0;
  --dark-color: rgba(0,0,0,.8);
  --font-color: var(--dark-color);
  --lighter-gray-color: rgba(0,0,0,.4);
  --light-gray-color: rgba(0,0,0,.6);
  --page-bg-color: #fff;
}

/*
  google material icons
  reference: https://google.github.io/material-design-icons/
*/
.material-icons {
  font-family: var(--font-family);
  font-weight: normal;
  font-style: normal;
  font-size: var(--size, var(--icon-size));
  line-height: var(--icon-size);
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

.material-icons {
  --font-family: 'Material Icons';
}

/* common styles */
html, body {
  height: 100%;
  background-color: var(--page-bg-color);
}
html, body, :host {
  margin: 0;
  font-family: var(--font-family);
  color: var(--font-color);
  font-size: var(--1rem);
}
a {
  color: inherit;
  text-decoration: none;
}
a:hover {
  color: var(--primary-color);
}
a[active] {
  color: var(--primary-color);
}
a.disabled {
  opacity: .75;
  pointer-events: none;
}
h1,h2,h3,h4,h5,h6,p,hr {
  margin: 0;
}
h1,h2,h3,h4,h5,h6 {
  line-height: 1.33;
}
h4 {
  font-size: var(--h4-size);
  font-weight: 500;
}
strong {
  font-weight: 500;
}
hr {
  border-bottom: 0;
  border-left: 0;
  border-right: 0;
  border-top: 1px solid var(--border-color);
}
:focus {
  outline: 0;
}
fieldset {
  border: 0;
}
/* hide scrollbar */
:not([contenteditable=true])::-webkit-scrollbar {
  width: 0!important;
  height: 0!important;
  background: 0 0!important;
  display: none!important;
}

/* helper classes */
[invisible],
.invisible {
  visibility: hidden;
  pointer-events: none;
}
.text-color {
  color: var(--color);
}
.bg-color {
  background-color: var(--bg-color);
}
.white {
  --color: #fff;
  --bg-color: #fff;
}
.primary {
  --color: var(--primary-color);
  --bg-color: var(--primary-color);
}
.light-gray {
  --color: var(--light-gray-color);
}
.lighter-gray {
  --color: var(--lighter-gray-color);
}
.mt-0 {
  margin-top: 0;
}
.mt-1 {
  margin-top: calc(var(--1rem) * var(--multiplier, 1));
}
.mt-1.x2 {
  --multiplier: 2;
}
.mb-1 {
  margin-bottom: var(--1rem);
}
.my-1 {
  margin-top: var(--1rem);
  margin-bottom: var(--1rem);
}
.mx-1 {
  margin-left: var(--1rem);
  margin-right: var(--1rem);
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.ml-1 {
  margin-left: var(--1rem);
}
.mr-1 {
  margin-right: var(--1rem);
}
.ml-auto {
  margin-left: auto;
}
.pr-0 {
  padding-right: 0;
}
.pr-1 {
  padding-right: var(--1rem);
}
.pa-1 {
  padding: var(--1rem);
}
.px-1 {
  padding-left: var(--1rem);
  padding-right: var(--1rem);
}
.py-1 {
  padding-top: var(--1rem);
  padding-bottom: var(--1rem);
}
.pl-0 {
  padding-left: 0;
}
.text-align {
  text-align: var(--alignment);
}
.align-items {
  align-items: var(--alignment);
}
.flex-align-self {
  align-self: var(--alignment);
}
.center {
  --alignment: center;
}
.d-flex {
  display: flex;
}
.position-relative {
  position: relative;
}
.position-absolute {
  position: absolute;
}
`;window.GlobalStyles=o;
},{"./fonts.css":"poII","lit-element":"xPSq"}],"XD5x":[function(require,module,exports) {
function t(t,e){if(!e)return null;let o=e=>{if(!e||e===document||e===window)return null;e.assignedSlot&&(e=e.assignedSlot);let n=e.closest(t);return n||o(e.getRootNode().host)};return o(e)}function e(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";if(!t)return[];let o,n=[],s=(t,e)=>{let a=t.shadowRoot?t.shadowRoot.children:t.children;for(let l=0;l<a.length;l++)(o=a[l]).shadowRoot&&(!e||e.indexOf(o.localName)>-1)&&n.push(o),s(o,e)};return s(t,e),n}const o={stateComponentSelector:"[state-component]",getState(e){console.assert(e);let o=t(this.stateComponentSelector,e)||{};return Object.assign({},o.state||{})},setState(o,n){console.assert(o&&n);let s=new CustomEvent("stateChanged",{bubble:!1,detail:n}),a=o.hasAttribute(this.stateComponentSelector)?o:t(this.stateComponentSelector,o);a?(a.state=Object.assign({},a.state,n),a.dispatchEvent(s),e(a).forEach(t=>t.dispatchEvent(s))):(console.warn("StateManager.setState(): No state component found for current component"),console.log(o))}};window.StateManager=o;
},{}],"VjEI":[function(require,module,exports) {
"use strict";require("../styles/GlobalStyles"),require("./StateManager");let e=document.createElement("style");e.innerHTML=GlobalStyles.cssText,document.head.appendChild(e),window.Global={activeLayer:"main-board",setting:{url:"about:blank",devices:[{size:"small",viewportW:320,viewportH:500},{size:"small2",viewportW:576,viewportH:500},{size:"small3",viewportW:768,viewportH:500},{size:"medium",viewportW:992,viewportH:500}],viewportW:320,viewportH:500,updatedAt:0},stuff:[{name:"device1",xpos:80,ypos:80,width:340,height:540,hidden:!1,theme:"dark",color:"#333333"},{name:"device2",xpos:460,ypos:80,width:340,height:540,hidden:!0,theme:"light",color:"#D1CDDA"}]};
},{"../styles/GlobalStyles":"cijC","./StateManager":"XD5x"}],"lsz9":[function(require,module,exports) {
"use strict";var t=require("lit-element");class e extends t.LitElement{static get styles(){return[GlobalStyles,t.css`
        :host {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--setting-panel-height);
          background-color: #343334;
          color: #fff;
        }
        form {
          width: 100%;
        }
        fieldset {
          border: 0;
        }
        input[type="number"] {
          width: 5em;
        }
        #url {
          width: 50%;
        }
      `]}static get properties(){return{_url:{type:String},_currentViewportW:{type:Number},_currentViewportH:{type:Number}}}constructor(){super(),this._url=Global.setting.url,this._currentViewportW=Global.setting.viewportW,this._currentViewportH=Global.setting.viewportH}updateCurrentViewport(t,e){this._currentViewportW=t,this._currentViewportH=e;let r=StateManager.getState(this),i=Object.assign({},r.setting,{viewportW:t,viewportH:e,updatedAt:(new Date).getTime()});StateManager.setState(this,{setting:i})}render(){return t.html`
      <!-- URL -->
      <fieldset>
        <label>URL</label>
        <input type="text" .value=${this._url} @change=${t=>{this._url=t.currentTarget.value;let e=StateManager.getState(this),r=Object.assign({},e.setting,{url:this._url,updatedAt:(new Date).getTime()});StateManager.setState(this,{setting:r})}} />
      </fieldset>

      <!-- device size and its viewport -->
      <fieldset>
        <select @change=${t=>{let{s:e,w:r,h:i}=JSON.parse(t.currentTarget.value);this.updateCurrentViewport(r,i)}}>
          ${Global.setting.devices.map((e,r)=>{let i=`{"s":"${e.size}","w":${e.viewportW},"h":${e.viewportH}}`;return t.html`<option value=${i} ?selected=${0===r}>${e.size}</option>`})}
        </select>

        <!-- viewport w x h -->
        <input type="number" .value=${this._currentViewportW} @change=${t=>{let e=Number(t.currentTarget.value);this.updateCurrentViewport(e,this._currentViewportH)}}></input>
        x
        <input type="number" .value=${this._currentViewportH} @change=${t=>{let e=Number(t.currentTarget.value);this.updateCurrentViewport(this._currentViewportW,e)}}></input>

        <!-- reset to current size default -->
        <button @click=${t=>{let{s:e,w:r,h:i}=JSON.parse(this.shadowRoot.querySelector("select").value);this.updateCurrentViewport(r,i)}}>Reset</button>
      </fieldset>
    `}}customElements.define("setting-panel",e);
},{"lit-element":"xPSq"}],"goNz":[function(require,module,exports) {
module.exports="/rotate.35252e96.png";
},{}],"boXA":[function(require,module,exports) {
"use strict";var e=require("lit-element"),t=i(require("../assets/img/rotate.png"));function i(e){return e&&e.__esModule?e:{default:e}}class r extends e.LitElement{static get styles(){return[GlobalStyles,e.css`
        :host {
          width: calc(var(--device-w) + 20px);
          height: calc(var(--device-h) + 40px);
          perspective: 1000px;
          user-select: none;
          --opacity: 1;
        }
        iframe {
          border: 0;
          width: 100%;
          height: 100%;
          transform: scale(1);
          background-color: #fff;
        }
        .frame[point-down] iframe {
          pointer-events: none;
        }
        .drag-handle {
          display: none;
          width: 200%;
          height: 200%;
          position: absolute;
          top: -50%;
          left: -50%;
        }
        .frame[point-down] .drag-handle {
          display: block;
        }
        .rotate-handle {
          position: absolute;
          top: 0;
          padding: 15px;
          cursor: url(${(0,e.unsafeCSS)(t.default)}) 0 20, auto;
        }
        .rotate-handle.right {
          right: 0;
        }
        .rotate-handle.left {
          left: 0;
        }
        .resize-handle {
          position: absolute;
          bottom: 0;
          padding: 15px;
        }
        .frame[point-down] .resize-handle {
          padding: 80px;
          transform: translate(80px, 80px);
        }
        .resize-handle.left {
          left: 0;
          cursor: nesw-resize;
        }
        .resize-handle.right {
          right: 0;
          cursor: nwse-resize;
        }
        .frame {
          width: 100%;
          height: 100%;
          will-change: transform;
          transition: transform .5s;
          transform-style: preserve-3d;
          position: relative;
          cursor: move;
          opacity: var(--opacity);
        }
        .frame.flipped {
          --opacity: 1;
          transform: rotateY(180deg);
        }
        .face {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: #fff;
          box-sizing: border-box;
          background-color: var(--device-color);
          backface-visibility: hidden;
          box-shadow: rgba(255, 255, 255, 0.5) 0px 0px 3px 1px;
          border-radius: 8px;
        }
        :host([theme="light"]) .face {
          color: var(--dark-color);
        }
        .face.front {
          padding: 18px 10px 30px;
        }
        .face.back {
          padding: 30px;
          transform: rotateY(180deg);
        }
        .frame.flipped .face.front {
          z-index: -1;
        }
        input {
          width: 100%;
        }
        input[type="number"] {
          width: 5em;
        }
        .viewport-size {
          position: absolute;
          top: 0;
          line-height: 18px;
          font-size: .7em;
        }
        .main-btn {
          position: absolute;
          bottom: 0;
          left: 0;
          margin: 7px auto;
          right: 0;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          box-shadow: 0px 0px 2px 1px rgba(255,255,255, .5);
          box-sizing: border-box;
          cursor: pointer;
        }
        :host([theme="light"]) .main-btn {
          box-shadow: 0px 0px 2px 1px var(--dark-color);
        }
      `]}static get properties(){return{_url:{type:String},_viewportH:{type:Number},_viewportW:{type:Number},_setting:{type:Object},_reloadAt:{type:Number},_operation:{type:String}}}constructor(){super(),this._operation=null,this._url="about:blank",this._viewportW=0,this._viewportH=0,this._reloadAt=0,this._setting={},this._url=Global.setting.url,this._viewportW=Global.setting.viewportW,this._viewportH=Global.setting.viewportH,this._id=null,this._flipped=!1}firstUpdated(){const e=(e,t)=>{let i=Number(getComputedStyle(this).getPropertyValue("--xpos").trim().replace("px","")),r=Number(getComputedStyle(this).getPropertyValue("--ypos").trim().replace("px",""));switch(e){case"left":this.style.setProperty("--xpos",(i-=t)+"px");break;case"right":this.style.setProperty("--xpos",(i+=t)+"px");break;case"up":this.style.setProperty("--ypos",(r-=t)+"px");break;case"down":this.style.setProperty("--ypos",(r+=t)+"px")}this.updateState()};this.addEventListener("mousemove",e=>{if("moving"===this._operation){e.preventDefault();let t=e.clientX-this.initialX,i=e.clientY-this.initialY;this.style.setProperty("--xpos",t+"px"),this.style.setProperty("--ypos",i+"px"),this.updateState()}if("resizing"===this._operation){e.preventDefault();let t=this._viewportW+(e.clientX-this.currentX),i=this._viewportH+(e.clientY-this.currentY);this.style.setProperty("--device-w",t+"px"),this.style.setProperty("--device-h",i+"px")}}),this.addEventListener("mousedown",e=>{if("resizing"!=this._operation){let t=Number(getComputedStyle(this).getPropertyValue("--xpos").trim().replace("px","")),i=Number(getComputedStyle(this).getPropertyValue("--ypos").trim().replace("px",""));this.initialX=e.clientX-t,this.initialY=e.clientY-i,this._operation="moving"}}),this.addEventListener("mouseup",e=>{this._operation=null,this.updateState()}),this.addEventListener("keydown",t=>{if(!this._flipped)if(t.altKey&&107===t.keyCode){let e=Number(getComputedStyle(this).getPropertyValue("--opacity"));this.style.setProperty("--opacity",Math.min(1,e+=.1))}else if(t.altKey&&109===t.keyCode){let e=Number(getComputedStyle(this).getPropertyValue("--opacity"));this.style.setProperty("--opacity",Math.max(0,e-=.1))}else if(!t.ctrlKey&&!t.altKey&&t.keyCode>=49&&t.keyCode<=52){let e={49:"small",50:"small2",51:"small3",52:"medium"},i=t.keyCode,r={currentTarget:this.shadowRoot.querySelector("select")};this.shadowRoot.querySelector(`option[size="${e[i]}"]`).selected=!0,this.onChangeViewportSize(r)}else if(!t.altKey&&t.keyCode>=37&&t.keyCode<=40){let i={37:"left",38:"up",39:"right",40:"down"},r=t.ctrlKey?10:1;e(i[t.keyCode],r),t.stopPropagation(),t.preventDefault()}}),this._id=this.getAttribute("id")}updateState(){let e=StateManager.getState(this),t=Number(getComputedStyle(this).getPropertyValue("--xpos").trim().replace("px","")),i=Number(getComputedStyle(this).getPropertyValue("--ypos").trim().replace("px","")),r=Number(getComputedStyle(this).getPropertyValue("--device-w").trim().replace("px",""))+20,s=Number(getComputedStyle(this).getPropertyValue("--device-h").trim().replace("px",""))+40;console.log(e.stuff[this._id]),Object.assign(e.stuff[this._id],{xpos:t,ypos:i,width:r,height:s}),StateManager.setState(this,{stuff:e.stuff})}resize(e){e.preventDefault(),this._operation="resizing",this.currentX=e.clientX,this.currentY=e.clientY}release(e){e.preventDefault(),this._operation=null,this._viewportH=Number(getComputedStyle(this).getPropertyValue("--device-h").trim().replace("px","")),this._viewportW=Number(getComputedStyle(this).getPropertyValue("--device-w").trim().replace("px","")),this.updateState()}rotate(e){e.preventDefault();let t=this._viewportW,i=this._viewportH;this._viewportW=i,this._viewportH=t,this.style.setProperty("--device-w",i+"px"),this.style.setProperty("--device-h",t+"px"),this.updateState()}onChangeViewportSize(e){let{viewportW:t,viewportH:i}=JSON.parse(e.currentTarget.value);this._viewportW=t,this._viewportH=i,this.style.setProperty("--device-w",this._viewportW+"px"),this.style.setProperty("--device-h",this._viewportH+"px"),this.updateState()}render(){return this._reloadAt&&this._setting.updatedAt===this._reloadAt&&(this._viewportW=this._setting.viewportW,this._viewportH=this._setting.viewportH,this._url=this._setting.url,this._reloadAt=0),this.style.setProperty("--device-w",this._viewportW+"px"),this.style.setProperty("--device-h",this._viewportH+"px"),e.html`
      <!-- device frame -->
      <div class="frame" tabindex="0"
        ?point-down=${this._operation}
        @click=${e=>{e.preventDefault(),e.ctrlKey&&(e.currentTarget.classList.toggle("flipped"),this._flipped=!this._flipped)}}}>
        <div class="drag-handle"></div>
        <!-- viewport content -->
        <div class="face front">
          <span class="viewport-size">${this._viewportW} x ${this._viewportH}</span>
          <iframe src=${this._url}></iframe>
          <span class="main-btn"></span>
        </div>
        <!-- device setting -->
        <div class="face back">
          <!-- url -->
          <fieldset>
            <label>URL</label>
            <input type="text" .value=${this._url}
              @change=${e=>{e.preventDefault(),this._url=e.currentTarget.value}}
            />
          </fieldset>

          <!-- device size  -->
          <fieldset>
            <select @change=${this.onChangeViewportSize}>
              ${Global.setting.devices.map((t,i)=>{let r=JSON.stringify(t);return e.html`<option size=${t.size} value=${r} ?selected=${0===i}>${t.size}</option>`})}
            </select>
          </fieldset>

          <!-- viewport size -->
          <fieldset>
            <input type="number" .value=${this._viewportW} @change=${e=>{this._viewportW=Number(e.currentTarget.value),this.style.setProperty("--device-w",this._viewportW+"px")}} />
            x
            <input type="number" .value=${this._viewportH} @change=${e=>{this._viewportH=Number(e.currentTarget.value),this.style.setProperty("--device-h",this._viewportH+"px")}} />
          </fieldset>
        </div>

        <!-- rotate handler -->
        <a href="" class="rotate-handle right" @click=${this.rotate}></a>

        <!-- resize handler -->
        <span class="resize-handle right"
          @mouseup=${this.release}
          @mousedown=${this.resize}
          @click=${this.release}></span>
      </div>
    `}}customElements.define("device-frame",r);
},{"lit-element":"xPSq","../assets/img/rotate.png":"goNz"}],"pCzs":[function(require,module,exports) {
"use strict";var t=require("lit-element");require("./DeviceFrame");class M extends t.LitElement{static get styles(){return[GlobalStyles,t.css`
        :host {
          display: block;
          position: relative;
          height: 100%;
          color: #f1f1f1;
          will-change: transform;
          transition: transform .5s;
          transform: translateY(0);
          background-color: var(--board-bg);
          --board-bg: #242424;
          --x-axis-color: #33B5E5;
          --y-axis-color: #99CC00;
          --xpos: 80px;
          --ypos: 80px;
        }
        :host([_pulled]) {
          transform: translateY(var(--setting-panel-height));
        }
        svg {
          shape-rendering: crispEdges;
          background-color: transparent;
        }
        svg.ruler {
          position: sticky;
        }
        #x-ruler {
          width: 100%;
          height: 100px;
          pointer-events: none;
          z-index: 99;
        }
        #x-ruler > text {
          fill: #fff;
          fill-opacity: 0.5;
          font-size: 1.5em;
          text-anchor: end;
        }
        #y-ruler {
          width: 100px;
          height: 100%;
          transform: translateY(-103px);
          pointer-events: none;
          z-index: 99;
        }
        #y-ruler > text {
          fill: #fff;
          fill-opacity: 0.5;
          font-size: 1.5em;
          text-anchor: middle;
        }
        g {
          fill: none;
          fill-rule: nonzero;
          fill-opacity: 1;
          stroke-width: 1;
          stroke-linecap :butt;
          stroke-linejoin: miter;
          stroke-miterlimit: 4;
          stroke-dasharray: none;
          stroke-dashoffset: 0;
          stroke-opacity: 1;
          text-anchor: middle;
        }
        text {
          user-select: none;
        }
        #x-marker {
          transform: translate(-0.5, 0);
          stroke: var(--x-axis-color);
        }
        #y-marker {
          transform: translate(0, -0.5);
          stroke: var(--y-axis-color);
        }
        #x-scale {
          font-weight: 300;
          opacity: .9;
          fill: var(--x-axis-color);
        }
        #y-scale {
          font-weight: 300;
          opacity: .9;
          fill: var(--y-axis-color);
        }
        main {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
        }
        main > device-frame {
          position: absolute;
          transform: translate(var(--xpos), var(--ypos));
        }
        .draggable:hover {
          cursor: move;
        }
        #scale {
          top: 12px;
          left: 12px;
          opacity: .6;
          position: absolute;
        }
      `]}static get properties(){return{_pulled:{type:Boolean,reflect:!0},_viewportWidth:{type:Number},_viewportHeight:{type:Number},_scale:{type:Number},_stuff1:{type:Boolean},_stuff2:{type:Boolean}}}constructor(){super(),this._pulled=!1,this._viewportWidth=Math.floor(window.visualViewport.width),this._viewportHeight=Math.floor(window.visualViewport.height),this._scale=1,this._setting={updatedAt:0},this._stuff1=Global.stuff[0].hidden,this._stuff2=Global.stuff[1].hidden}firstUpdated(){let t=this.shadowRoot.querySelector("main").children;const M=M=>{for(let e=0;e<t.length;e++)t.item(e).style.setProperty("z-index","");M.target.style.setProperty("z-index",1)};this.addEventListener("keydown",t=>{t.altKey||t.ctrlKey||112!==t.keyCode?t.altKey||t.ctrlKey||113!==t.keyCode?t.altKey||t.ctrlKey||27!==t.keyCode||(this._pulled=!this._pulled):(t.preventDefault(),t.stopPropagation(),this._stuff2=!this._stuff2):(t.preventDefault(),t.stopPropagation(),this._stuff1=!this._stuff1)}),window.addEventListener("click",t=>{if(t.altKey){let t="main-board"===StateManager.getState(this).activeLayer?"ruler-layer":"main-board";StateManager.setState(this,{activeLayer:t})}});for(let e=0;e<t.length;e++)t.item(e).addEventListener("dblclick",M);this.addEventListener("stateChanged",t=>{let M=StateManager.getState(this);Object.assign(this._setting,M.setting),this.requestUpdate()})}render(){return t.html`

    <!-- main content -->
    <main>
      <device-frame id="0" theme="dark" ?hidden=${this._stuff1}
        ._setting=${this._setting}
        _reloadAt=${this._setting.updatedAt}
        style="--device-color: #333333;"></device-frame>

      <device-frame id="1" theme="light" ?hidden=${this._stuff2}
        ._setting=${this._setting}
        _reloadAt=${this._setting.updatedAt}
        style="--device-color: #D1CDDA;--xpos: 460px;"></device-frame>

      <!-- x ruler -->
      <svg id="x-ruler" class="ruler" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <text x="${this._viewportWidth}" y="28">${this._viewportWidth}px</text>

        <!-- scale marker -->
        <g>
          <path id="x-marker"
            d="M   10,0   10,10 M   20,0   20,10   M  30,0 30,10  M   40,0   40,10 M   50,0   50,20 M   60,0   60,10 M   70,0   70,10 M   80,0   80,10 M   90,0   90,10 M  100,0  100,30
               M  110,0  110,10 M  120,0  120,10   M 130,0 130,10 M  140,0  140,10 M  150,0  150,20 M  160,0  160,10 M  170,0  170,10 M  180,0  180,10 M  190,0  190,10 M  200,0  200,30
               M  210,0  210,10 M  220,0  220,10   M 230,0 230,10 M  240,0  240,10 M  250,0  250,20 M  260,0  260,10 M  270,0  270,10 M  280,0  280,10 M  290,0  290,10 M  300,0  300,30
               M  310,0  310,10 M  320,0  320,10   M 330,0 330,10 M  340,0  340,10 M  350,0  350,20 M  360,0  360,10 M  370,0  370,10 M  380,0  380,10 M  390,0  390,10 M  400,0  400,30
               M  410,0  410,10 M  420,0  420,10   M 430,0 430,10 M  440,0  440,10 M  450,0  450,20 M  460,0  460,10 M  470,0  470,10 M  480,0  480,10 M  490,0  490,10 M  500,0  500,30
               M  510,0  510,10 M  520,0  520,10   M 530,0 530,10 M  540,0  540,10 M  550,0  550,20 M  560,0  560,10 M  570,0  570,10 M  580,0  580,10 M  590,0  590,10 M  600,0  600,30
               M  610,0  610,10 M  620,0  620,10   M 630,0 630,10 M  640,0  640,10 M  650,0  650,20 M  660,0  660,10 M  670,0  670,10 M  680,0  680,10 M  690,0  690,10 M  700,0  700,30
               M  710,0  710,10 M  720,0  720,10   M 730,0 730,10 M  740,0  740,10 M  750,0  750,20 M  760,0  760,10 M  770,0  770,10 M  780,0  780,10 M  790,0  790,10 M  800,0  800,30
               M  810,0  810,10 M  820,0  820,10   M 830,0 830,10 M  840,0  840,10 M  850,0  850,20 M  860,0  860,10 M  870,0  870,10 M  880,0  880,10 M  890,0  890,10 M  900,0  900,30
               M  910,0  910,10 M  920,0  920,10   M 930,0 930,10 M  940,0  940,10 M  950,0  950,20 M  960,0  960,10 M  970,0  970,10 M  980,0  980,10 M  990,0  990,10 M 1000,0 1000,30
               M 1010,0 1010,10 M 1020,0 1020,10 M 1030,0 1030,10 M 1040,0 1040,10 M 1050,0 1050,20 M 1060,0 1060,10 M 1070,0 1070,10 M 1080,0 1080,10 M 1090,0 1090,10 M 1100,0 1100,30
               M 1110,0 1110,10 M 1120,0 1120,10 M 1130,0 1130,10 M 1140,0 1140,10 M 1150,0 1150,20 M 1160,0 1160,10 M 1170,0 1170,10 M 1180,0 1180,10 M 1190,0 1190,10 M 1200,0 1200,30
               M 1210,0 1210,10 M 1220,0 1220,10 M 1230,0 1230,10 M 1240,0 1240,10 M 1250,0 1250,20 M 1260,0 1260,10 M 1270,0 1270,10 M 1280,0 1280,10 M 1290,0 1290,10 M 1300,0 1300,30
               M 1310,0 1310,10 M 1320,0 1320,10 M 1330,0 1330,10 M 1340,0 1340,10 M 1350,0 1350,20 M 1360,0 1360,10 M 1370,0 1370,10 M 1380,0 1380,10 M 1390,0 1390,10 M 1400,0 1400,30
               M 1410,0 1410,10 M 1420,0 1420,10 M 1430,0 1430,10 M 1440,0 1440,10 M 1450,0 1450,20 M 1460,0 1460,10 M 1470,0 1470,10 M 1480,0 1480,10 M 1490,0 1490,10 M 1500,0 1500,30
               M 1510,0 1510,10 M 1520,0 1520,10 M 1530,0 1530,10 M 1540,0 1540,10 M 1550,0 1550,20 M 1560,0 1560,10 M 1570,0 1570,10 M 1580,0 1580,10 M 1590,0 1590,10 M 1600,0 1600,30
               M 1610,0 1610,10 M 1620,0 1620,10 M 1630,0 1630,10 M 1640,0 1640,10 M 1650,0 1650,20 M 1660,0 1660,10 M 1670,0 1670,10 M 1680,0 1680,10 M 1690,0 1690,10 M 1700,0 1700,30
               M 1710,0 1710,10 M 1720,0 1720,10 M 1730,0 1730,10 M 1740,0 1740,10 M 1750,0 1750,20 M 1760,0 1760,10 M 1770,0 1770,10 M 1780,0 1780,10 M 1790,0 1790,10 M 1800,0 1800,30
               M 1810,0 1810,10 M 1820,0 1820,10 M 1830,0 1830,10 M 1840,0 1840,10 M 1850,0 1850,20 M 1860,0 1860,10 M 1870,0 1870,10 M 1880,0 1880,10 M 1890,0 1890,10 M 1900,0 1900,30
               M 1910,0 1910,10 M 1920,0 1920,10 M 1930,0 1930,10 M 1940,0 1940,10 M 1950,0 1950,20 M 1960,0 1960,10 M 1970,0 1970,10 M 1980,0 1980,10 M 1990,0 1990,10 M 2000,0 2000,30
               M 2010,0 2010,10 M 2020,0 2020,10 M 2030,0 2030,10 M 2040,0 2040,10 M 2050,0 2050,20 M 2060,0 2060,10 M 2070,0 2070,10 M 2080,0 2080,10 M 2090,0 2090,10 M 2100,0 2100,30
               M 2110,0 2110,10 M 2120,0 2120,10 M 2130,0 2130,10 M 2140,0 2140,10 M 2150,0 2150,20 M 2160,0 2160,10 M 2170,0 2170,10 M 2180,0 2180,10 M 2190,0 2190,10 M 2200,0 2200,30
               M 2210,0 2210,10 M 2220,0 2220,10 M 2230,0 2230,10 M 2240,0 2240,10 M 2250,0 2250,20 M 2260,0 2260,10 M 2270,0 2270,10 M 2280,0 2280,10 M 2290,0 2290,10 M 2300,0 2300,30
               M 2310,0 2310,10 M 2320,0 2320,10 M 2330,0 2330,10 M 2340,0 2340,10 M 2350,0 2350,20 M 2360,0 2360,10 M 2370,0 2370,10 M 2380,0 2380,10 M 2390,0 2390,10 M 2400,0 2400,30
               M 2410,0 2410,10 M 2420,0 2420,10 M 2430,0 2430,10 M 2440,0 2440,10 M 2450,0 2450,20 M 2460,0 2460,10 M 2470,0 2470,10 M 2480,0 2480,10 M 2490,0 2490,10 M 2500,0 2500,30
               M 2510,0 2510,10 M 2520,0 2520,10 M 2530,0 2530,10 M 2540,0 2540,10 M 2550,0 2550,20" />
        </g>
        <!-- scale -->
        <g id="x-scale">
          <text x="100"  y="55">100</text>
          <text x="200"  y="55">200</text>
          <text x="300"  y="55">300</text>
          <text x="400"  y="55">400</text>
          <text x="500"  y="55">500</text>
          <text x="600"  y="55">600</text>
          <text x="700"  y="55">700</text>
          <text x="800"  y="55">800</text>
          <text x="900"  y="55">900</text>
          <text x="1000" y="55">1000</text>
          <text x="1100" y="55">1100</text>
          <text x="1200" y="55">1200</text>
          <text x="1300" y="55">1300</text>
          <text x="1400" y="55">1400</text>
          <text x="1500" y="55">1500</text>
          <text x="1600" y="55">1600</text>
          <text x="1700" y="55">1700</text>
          <text x="1800" y="55">1800</text>
          <text x="1900" y="55">1900</text>
          <text x="2000" y="55">2000</text>
          <text x="2100" y="55">2100</text>
          <text x="2200" y="55">2200</text>
          <text x="2300" y="55">2300</text>
          <text x="2400" y="55">2400</text>
          <text x="2500" y="55">2500</text>
        </g>
      </svg>

      <!-- y ruler -->
      <svg id="y-ruler" class="ruler" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <text y="${this._viewportHeight-100}" x="0" transform="rotate(-90 28,${this._viewportHeight-100})">${this._viewportHeight}px</text>

        <!-- scale marker -->
        <g>
          <path id="y-marker"
            d="M 0,10   10,10   M 0,20   10,20   M 0,30   10,30   M 0,40   10,40   M 0,50   20,50   M 0,60   10,60   M 0,70   10,70   M 0,80   10,80   M 0,90   10,90   M 0,100  30,100
               M 0,110  10,110  M 0,120  10,120  M 0,130  10,130  M 0,140  10,140  M 0,150  20,150  M 0,160  10,160  M 0,170  10,170  M 0,180  10,180  M 0,190  10,190  M 0,200  30,200
               M 0,210  10,210  M 0,220  10,220  M 0,230  10,230  M 0,240  10,240  M 0,250  20,250  M 0,260  10,260  M 0,270  10,270  M 0,280  10,280  M 0,290  10,290  M 0,300  30,300
               M 0,310  10,310  M 0,320  10,320  M 0,330  10,330  M 0,340  10,340  M 0,350  20,350  M 0,360  10,360  M 0,370  10,370  M 0,380  10,380  M 0,390  10,390  M 0,400  30,400
               M 0,410  10,410  M 0,420  10,420  M 0,430  10,430  M 0,440  10,440  M 0,450  20,450  M 0,460  10,460  M 0,470  10,470  M 0,480  10,480  M 0,490  10,490  M 0,500  30,500
               M 0,510  10,510  M 0,520  10,520  M 0,530  10,530  M 0,540  10,540  M 0,550  20,550  M 0,560  10,560  M 0,570  10,570  M 0,580  10,580  M 0,590  10,590  M 0,600  30,600
               M 0,610  10,610  M 0,620  10,620  M 0,630  10,630  M 0,640  10,640  M 0,650  20,650  M 0,660  10,660  M 0,670  10,670  M 0,680  10,680  M 0,690  10,690  M 0,700  30,700
               M 0,710  10,710  M 0,720  10,720  M 0,730  10,730  M 0,740  10,740  M 0,750  20,750  M 0,760  10,760  M 0,770  10,770  M 0,780  10,780  M 0,790  10,790  M 0,800  30,800
               M 0,810  10,810  M 0,820  10,820  M 0,830  10,830  M 0,840  10,840  M 0,850  20,850  M 0,860  10,860  M 0,870  10,870  M 0,880  10,880  M 0,890  10,890  M 0,900  30,900
               M 0,910  10,910  M 0,920  10,920  M 0,930  10,930  M 0,940  10,940  M 0,950  20,950  M 0,960  10,960  M 0,970  10,970  M 0,980  10,980  M 0,990  10,990  M 0,1000 30,1000
               M 0,1010 10,1010 M 0,1020 10,1020 M 0,1030 10,1030 M 0,1040 10,1040 M 0,1050 20,1050 M 0,1060 10,1060 M 0,1070 10,1070 M 0,1080 10,1080 M 0,1090 10,1090 M 0,1100 30,1100
               M 0,1110 10,1110 M 0,1120 10,1120 M 0,1130 10,1130 M 0,1140 10,1140 M 0,1150 20,1150 M 0,1160 10,1160 M 0,1170 10,1170 M 0,1180 10,1180 M 0,1190 10,1190 M 0,1200 30,1200
               M 0,1210 10,1210 M 0,1220 10,1220 M 0,1230 10,1230 M 0,1240 10,1240 M 0,1250 20,1250 M 0,1260 10,1260 M 0,1270 10,1270 M 0,1280 10,1280 M 0,1290 10,1290 M 0,1300 30,1300
               M 0,1310 10,1310 M 0,1320 10,1320 M 0,1330 10,1330 M 0,1340 10,1340 M 0,1350 20,1350 M 0,1360 10,1360 M 0,1370 10,1370 M 0,1380 10,1380 M 0,1390 10,1390 M 0,1400 30,1400
               M 0,1410 10,1410 M 0,1420 10,1420 M 0,1430 10,1430 M 0,1440 10,1440 M 0,1450 20,1450 M 0,1460 10,1460 M 0,1470 10,1470 M 0,1480 10,1480 M 0,1490 10,1490 M 0,1500 30,1500" />
        </g>
        <!-- scale -->
        <g id="y-scale">
          <text x="55" y="100"  transform="rotate(-90 55,100)">100</text>
          <text x="55" y="200"  transform="rotate(-90 55,200)">200</text>
          <text x="55" y="300"  transform="rotate(-90 55,300)">300</text>
          <text x="55" y="400"  transform="rotate(-90 55,400)">400</text>
          <text x="55" y="500"  transform="rotate(-90 55,500)">500</text>
          <text x="55" y="600"  transform="rotate(-90 55,600)">600</text>
          <text x="55" y="700"  transform="rotate(-90 55,700)">700</text>
          <text x="55" y="800"  transform="rotate(-90 55,800)">800</text>
          <text x="55" y="900"  transform="rotate(-90 55,900)">900</text>
          <text x="55" y="1000" transform="rotate(-90 55,1000)">1000</text>
          <text x="55" y="1100" transform="rotate(-90 55,1100)">1100</text>
          <text x="55" y="1200" transform="rotate(-90 55,1200)">1200</text>
          <text x="55" y="1300" transform="rotate(-90 55,1300)">1300</text>
          <text x="55" y="1400" transform="rotate(-90 55,1400)">1400</text>
          <text x="55" y="1500" transform="rotate(-90 55,1500)">1500</text>
        </g>
      </svg>

      <span id="scale">${this._scale.toFixed(2)}x</span>
    </main>
    `}}customElements.define("main-board",M);
},{"lit-element":"xPSq","./DeviceFrame":"boXA"}],"r931":[function(require,module,exports) {
"use strict";var t=require("lit-element");class s extends t.LitElement{static get styles(){return[GlobalStyles,t.css`
        :host {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }
        svg {
          width: 100%;
          height: 100%;
          shape-rendering: crispEdges;
        }
      `]}static get properties(){return{_hidden:{type:Boolean,reflect:!0},_stuff:{type:Array}}}constructor(){super(),this._hidden=!0,this._stuff=Global.stuff}firstUpdated(){this.addEventListener("stateChanged",t=>{let s=StateManager.getState(this);if(this._hidden="ruler-layer"!=s.activeLayer,!this._hidden){for(let t=0;t<this._stuff.length;t++)Object.assign(this._stuff[t],s.stuff[t]);this.requestUpdate()}})}render(){return t.html`
      <svg id="cross-lines" class="d-none" xmlns="http://www.w3.org/2000/svg" version="1.1">

        <!-- stuff grid lines -->
        <!-- top -->
        <line x1="0%" y1="${this._stuff[0].ypos}" x2="100%" y2="${this._stuff[0].ypos}" style="stroke-width:1px;stroke:#99CC00;stroke-opacity:1;transform-origin: 0px 0px;"></line>
        <!-- bottom -->
        <line x1="0%" y1="${this._stuff[0].ypos+this._stuff[0].height}" x2="100%" y2="${this._stuff[0].ypos+this._stuff[0].height}" style="stroke-width:1px;stroke:#99CC00;stroke-opacity:1;transform-origin: 0px 0px;"></line>
        <!-- left -->
        <line x1="${this._stuff[0].xpos}" y1="0%" x2="${this._stuff[0].xpos}" y2="100%" style="stroke-width:1px;stroke:#33B5E5;stroke-opacity:1;" />
        <!-- right -->
        <line x1="${this._stuff[0].xpos+this._stuff[0].width}" y1="0%" x2="${this._stuff[0].xpos+this._stuff[0].width}" y2="100%" style="stroke-width:1px;stroke:#33B5E5;stroke-opacity:1;" />

        <!-- top -->
        <line x1="0%" y1="${this._stuff[1].ypos}" x2="100%" y2="${this._stuff[1].ypos}" style="stroke-width:1px;stroke:#99CC00;stroke-opacity:1;transform-origin: 0px 0px;"></line>
        <!-- bottom -->
        <line x1="0%" y1="${this._stuff[1].ypos+this._stuff[1].height}" x2="100%" y2="${this._stuff[1].ypos+this._stuff[1].height}" style="stroke-width:1px;stroke:#99CC00;stroke-opacity:1;transform-origin: 0px 0px;"></line>
        <!-- left -->
        <line x1="${this._stuff[1].xpos}" y1="0%" x2="${this._stuff[1].xpos}" y2="100%" style="stroke-width:1px;stroke:#33B5E5;stroke-opacity:1;" />
        <!-- right -->
        <line x1="${this._stuff[1].xpos+this._stuff[1].width}" y1="0%" x2="${this._stuff[1].xpos+this._stuff[1].width}" y2="100%" style="stroke-width:1px;stroke:#33B5E5;stroke-opacity:1;" />
      </svg>
    `}}customElements.define("grid-layer",s);
},{"lit-element":"xPSq"}],"PQ1Q":[function(require,module,exports) {
"use strict";var e=require("lit-element");class t extends e.LitElement{static get styles(){return[GlobalStyles,e.css`
        :host {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          --tape-pos: 80px;
          /*pointer-events: none;*/
        }
        svg {
          width: 100%;
          height: 100%;
          shape-rendering: crispEdges;
        }
        .tapes {
          position: absolute;
          background-color: red;
          color: #fff;
          line-height: 1.2;
          opacity: .7;
        }
        .x-distance {
          top: var(--tape-pos);
        }
        .y-distance {
          left: var(--tape-pos);
        }
      `]}static get properties(){return{_hidden:{type:Boolean,reflect:!0},_xpos:{type:Number},_ypos:{type:Number},_keyCode:{type:Number}}}constructor(){super(),this._hidden=!0,this._xpos=450,this._ypos=300,this._keyCode=0,this.lines=[]}firstUpdated(){this.addEventListener("stateChanged",e=>{let t=StateManager.getState(this);this._hidden="ruler-layer"!=t.activeLayer,this._hidden||setTimeout(function(){this.focus()}.bind(this),300)}),this.addEventListener("keydown",e=>{if(e.altKey||e.ctrlKey||72!==e.keyCode)if(e.altKey||e.ctrlKey||86!==e.keyCode)if(e.altKey||e.ctrlKey||90!==e.keyCode||!this.lines.length)if(e.altKey||e.ctrlKey||88!==e.keyCode||!this.lines.length){if(!e.altKey&&e.keyCode>=37&&e.keyCode<=40){let t={37:"left",38:"up",39:"right",40:"down"},s=e.ctrlKey?10:1;switch(t[e.keyCode]){case"left":this._xpos-=s;break;case"right":this._xpos+=s;break;case"up":this._ypos-=s;break;case"down":this._ypos+=s}}}else this.lines=[],this.requestUpdate();else this.lines.pop(),this.requestUpdate();else{let e=this.yLine.cloneNode(),t=this.yTapes.cloneNode(!0);this.lines.push({line:e,tapes:t}),this.requestUpdate()}else{let e=this.xLine.cloneNode(),t=this.xTapes.cloneNode(!0);this.lines.push({line:e,tapes:t})}}),this.addEventListener("mousemove",e=>{e.preventDefault(),this._xpos=e.clientX,this._ypos=e.clientY}),this.tapes=this.shadowRoot.querySelector("section"),this.layer=this.shadowRoot.querySelector("svg"),this.xTapes=this.shadowRoot.querySelector(".x-tapes"),this.yTapes=this.shadowRoot.querySelector(".y-tapes"),this.xLine=this.shadowRoot.getElementById("x-line"),this.yLine=this.shadowRoot.getElementById("y-line")}updated(){let e=this.shadowRoot.querySelectorAll(".y-tapes"),t=this.shadowRoot.querySelectorAll(".x-tapes");if(0===e.length&&0===t.length)return;let s=Array.prototype.slice.call(e,0),i=Array.prototype.slice.call(t,0);s.sort((e,t)=>e.firstElementChild.innerText-t.firstElementChild.innerText),i.sort((e,t)=>e.firstElementChild.innerText-t.firstElementChild.innerText),s.forEach((e,t)=>{t&&Number(e.firstElementChild.innerText)>Number(s[t-1].firstElementChild.innerText)?e.lastElementChild.innerHTML="&nbsp;+"+(e.firstElementChild.innerText-s[t-1].firstElementChild.innerText)+"&nbsp;":e.lastElementChild.innerHTML=""}),i.forEach((e,t)=>{t&&Number(e.firstElementChild.innerText)>Number(i[t-1].firstElementChild.innerText)?e.lastElementChild.innerHTML="&nbsp;+"+(e.firstElementChild.innerText-i[t-1].firstElementChild.innerText)+"&nbsp;":e.lastElementChild.innerHTML=""})}render(){return e.html`
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        ${this.lines.map(e=>e.line)}
        <line id="x-line" x1="0%" y1=${this._ypos} x2="100%" y2=${this._ypos} style="stroke-width:1px;stroke:red;stroke-opacity:1;" />
        <line id="y-line" x1=${this._xpos}  y1="0" x2=${this._xpos}  y2="100%" style="stroke-width:1px;stroke:red;stroke-opacity:1;" />
      </svg>

        <section style="float:left">
        ${this.lines.map(e=>e.tapes)}
        <span class="y-tapes">
          <span class="tapes x-pos"
            style="top:0; left:${this._xpos+"px"}">&nbsp;${this._xpos}&nbsp;</span>
          <span class="tapes x-distance"
            style="left:${this._xpos+"px"}"></span>
        </span>
        <span class="x-tapes">
          <span class="tapes y-pos"
            style="left:0; top:${this._ypos+"px"}">&nbsp;${this._ypos}&nbsp;</span>
          <span class="tapes y-distance"
            style="top:${this._ypos+"px"}"></span>
        </span>
      </section>
    `}}customElements.define("ruler-layer",t);
},{"lit-element":"xPSq"}],"H99C":[function(require,module,exports) {
"use strict";var e=require("lit-element");require("./globals/index"),require("./components/SettingPanel"),require("./components/MainBoard"),require("./components/GridLayer"),require("./components/RulerLayer");class t extends e.LitElement{static get styles(){return[GlobalStyles,e.css`
        :host {
          --scale: 1;
          display: block;
          width: 100%;
          height: 100%;
          transform-origin: top left;
          transform: scale(var(--scale));
        }
      `]}static get properties(){return{_scale:{type:Number},_viewportWidth:{type:Number},_viewportHeight:{type:Number}}}constructor(){super(),this._scale=1,this._viewportWidth=Math.floor(window.visualViewport.width),this._viewportHeight=Math.floor(window.visualViewport.height),this.state={activeLayer:Global.activeLayer,setting:{url:Global.setting.url,viewportW:Global.setting.viewportW,viewportH:Global.setting.viewportH,updatedAt:0},stuff:[].concat(Global.stuff)}}firstUpdated(){this.addEventListener("stateChanged",e=>{this.shadowRoot.activeElement.nodeName!=this.state.activeLayer.toUpperCase()&&this.shadowRoot.querySelector(this.state.activeLayer).focus()}),window.addEventListener("resize",e=>{Number(getComputedStyle(this).getPropertyValue("--scale").trim())<1&&this.scaledResize()}),window.addEventListener("keydown",e=>{e.ctrlKey&&221===e.keyCode?(this._scale=Number(getComputedStyle(this).getPropertyValue("--scale").trim())+.05,this.style.setProperty("--scale",this._scale),this._scale<1?this.scaledResize():1===this._scale?(this.style.setProperty("width",""),this.style.setProperty("height",""),this._viewportWidth=window.visualViewport.width,this._viewportHeight=window.visualViewport.height):this._scale=Number(getComputedStyle(this).getPropertyValue("--scale").trim())):e.ctrlKey&&219===e.keyCode&&(this._scale=Number(getComputedStyle(this).getPropertyValue("--scale").trim())-.05,this.style.setProperty("--scale",this._scale),this._scale<1&&this.scaledResize())}),this.shadowRoot.querySelector(this.state.activeLayer).focus()}scaledResize(){let e=this.getBoundingClientRect(),t=Math.ceil((1+(window.visualViewport.width-e.width)/e.width)*this.offsetWidth),i=Math.ceil((1+(window.visualViewport.height-e.height)/e.height)*this.offsetHeight);this.style.setProperty("width",t+"px"),this.style.setProperty("height",i+"px"),this._viewportWidth=t,this._viewportHeight=i}render(){return e.html`
      <setting-panel></setting-panel>
      <main-board tabindex="-1"
        _viewportWidth=${this._viewportWidth}
        _viewportHeight=${this._viewportHeight}
        _scale=${this._scale}></main-board>
      <grid-layer></grid-layer>
      <ruler-layer tabindex="1"></ruler-layer>
    `}}customElements.define("page-body",t);
},{"lit-element":"xPSq","./globals/index":"VjEI","./components/SettingPanel":"lsz9","./components/MainBoard":"pCzs","./components/GridLayer":"r931","./components/RulerLayer":"PQ1Q"}]},{},["H99C"], null)
//# sourceMappingURL=/src.ef41274b.js.map