(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function t(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(o){if(o.ep)return;o.ep=!0;const l=t(o);fetch(o.href,l)}})();var _u={exports:{}},Ss={},vu={exports:{}},oe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Em;function Zw(){if(Em)return oe;Em=1;var r=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),u=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),_=Symbol.iterator;function x(C){return C===null||typeof C!="object"?null:(C=_&&C[_]||C["@@iterator"],typeof C=="function"?C:null)}var I={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},N=Object.assign,b={};function F(C,P,Z){this.props=C,this.context=P,this.refs=b,this.updater=Z||I}F.prototype.isReactComponent={},F.prototype.setState=function(C,P){if(typeof C!="object"&&typeof C!="function"&&C!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,C,P,"setState")},F.prototype.forceUpdate=function(C){this.updater.enqueueForceUpdate(this,C,"forceUpdate")};function he(){}he.prototype=F.prototype;function fe(C,P,Z){this.props=C,this.context=P,this.refs=b,this.updater=Z||I}var me=fe.prototype=new he;me.constructor=fe,N(me,F.prototype),me.isPureReactComponent=!0;var ne=Array.isArray,Ie=Object.prototype.hasOwnProperty,De={current:null},Te={key:!0,ref:!0,__self:!0,__source:!0};function He(C,P,Z){var re,de={},ge=null,Ne=null;if(P!=null)for(re in P.ref!==void 0&&(Ne=P.ref),P.key!==void 0&&(ge=""+P.key),P)Ie.call(P,re)&&!Te.hasOwnProperty(re)&&(de[re]=P[re]);var xe=arguments.length-2;if(xe===1)de.children=Z;else if(1<xe){for(var Me=Array(xe),kt=0;kt<xe;kt++)Me[kt]=arguments[kt+2];de.children=Me}if(C&&C.defaultProps)for(re in xe=C.defaultProps,xe)de[re]===void 0&&(de[re]=xe[re]);return{$$typeof:r,type:C,key:ge,ref:Ne,props:de,_owner:De.current}}function Ae(C,P){return{$$typeof:r,type:C.type,key:P,ref:C.ref,props:C.props,_owner:C._owner}}function ve(C){return typeof C=="object"&&C!==null&&C.$$typeof===r}function bt(C){var P={"=":"=0",":":"=2"};return"$"+C.replace(/[=:]/g,function(Z){return P[Z]})}var ie=/\/+/g;function q(C,P){return typeof C=="object"&&C!==null&&C.key!=null?bt(""+C.key):P.toString(36)}function ee(C,P,Z,re,de){var ge=typeof C;(ge==="undefined"||ge==="boolean")&&(C=null);var Ne=!1;if(C===null)Ne=!0;else switch(ge){case"string":case"number":Ne=!0;break;case"object":switch(C.$$typeof){case r:case e:Ne=!0}}if(Ne)return Ne=C,de=de(Ne),C=re===""?"."+q(Ne,0):re,ne(de)?(Z="",C!=null&&(Z=C.replace(ie,"$&/")+"/"),ee(de,P,Z,"",function(kt){return kt})):de!=null&&(ve(de)&&(de=Ae(de,Z+(!de.key||Ne&&Ne.key===de.key?"":(""+de.key).replace(ie,"$&/")+"/")+C)),P.push(de)),1;if(Ne=0,re=re===""?".":re+":",ne(C))for(var xe=0;xe<C.length;xe++){ge=C[xe];var Me=re+q(ge,xe);Ne+=ee(ge,P,Z,Me,de)}else if(Me=x(C),typeof Me=="function")for(C=Me.call(C),xe=0;!(ge=C.next()).done;)ge=ge.value,Me=re+q(ge,xe++),Ne+=ee(ge,P,Z,Me,de);else if(ge==="object")throw P=String(C),Error("Objects are not valid as a React child (found: "+(P==="[object Object]"?"object with keys {"+Object.keys(C).join(", ")+"}":P)+"). If you meant to render a collection of children, use an array instead.");return Ne}function we(C,P,Z){if(C==null)return C;var re=[],de=0;return ee(C,re,"","",function(ge){return P.call(Z,ge,de++)}),re}function ue(C){if(C._status===-1){var P=C._result;P=P(),P.then(function(Z){(C._status===0||C._status===-1)&&(C._status=1,C._result=Z)},function(Z){(C._status===0||C._status===-1)&&(C._status=2,C._result=Z)}),C._status===-1&&(C._status=0,C._result=P)}if(C._status===1)return C._result.default;throw C._result}var se={current:null},j={transition:null},H={ReactCurrentDispatcher:se,ReactCurrentBatchConfig:j,ReactCurrentOwner:De};function z(){throw Error("act(...) is not supported in production builds of React.")}return oe.Children={map:we,forEach:function(C,P,Z){we(C,function(){P.apply(this,arguments)},Z)},count:function(C){var P=0;return we(C,function(){P++}),P},toArray:function(C){return we(C,function(P){return P})||[]},only:function(C){if(!ve(C))throw Error("React.Children.only expected to receive a single React element child.");return C}},oe.Component=F,oe.Fragment=t,oe.Profiler=o,oe.PureComponent=fe,oe.StrictMode=s,oe.Suspense=p,oe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=H,oe.act=z,oe.cloneElement=function(C,P,Z){if(C==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+C+".");var re=N({},C.props),de=C.key,ge=C.ref,Ne=C._owner;if(P!=null){if(P.ref!==void 0&&(ge=P.ref,Ne=De.current),P.key!==void 0&&(de=""+P.key),C.type&&C.type.defaultProps)var xe=C.type.defaultProps;for(Me in P)Ie.call(P,Me)&&!Te.hasOwnProperty(Me)&&(re[Me]=P[Me]===void 0&&xe!==void 0?xe[Me]:P[Me])}var Me=arguments.length-2;if(Me===1)re.children=Z;else if(1<Me){xe=Array(Me);for(var kt=0;kt<Me;kt++)xe[kt]=arguments[kt+2];re.children=xe}return{$$typeof:r,type:C.type,key:de,ref:ge,props:re,_owner:Ne}},oe.createContext=function(C){return C={$$typeof:u,_currentValue:C,_currentValue2:C,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},C.Provider={$$typeof:l,_context:C},C.Consumer=C},oe.createElement=He,oe.createFactory=function(C){var P=He.bind(null,C);return P.type=C,P},oe.createRef=function(){return{current:null}},oe.forwardRef=function(C){return{$$typeof:h,render:C}},oe.isValidElement=ve,oe.lazy=function(C){return{$$typeof:v,_payload:{_status:-1,_result:C},_init:ue}},oe.memo=function(C,P){return{$$typeof:m,type:C,compare:P===void 0?null:P}},oe.startTransition=function(C){var P=j.transition;j.transition={};try{C()}finally{j.transition=P}},oe.unstable_act=z,oe.useCallback=function(C,P){return se.current.useCallback(C,P)},oe.useContext=function(C){return se.current.useContext(C)},oe.useDebugValue=function(){},oe.useDeferredValue=function(C){return se.current.useDeferredValue(C)},oe.useEffect=function(C,P){return se.current.useEffect(C,P)},oe.useId=function(){return se.current.useId()},oe.useImperativeHandle=function(C,P,Z){return se.current.useImperativeHandle(C,P,Z)},oe.useInsertionEffect=function(C,P){return se.current.useInsertionEffect(C,P)},oe.useLayoutEffect=function(C,P){return se.current.useLayoutEffect(C,P)},oe.useMemo=function(C,P){return se.current.useMemo(C,P)},oe.useReducer=function(C,P,Z){return se.current.useReducer(C,P,Z)},oe.useRef=function(C){return se.current.useRef(C)},oe.useState=function(C){return se.current.useState(C)},oe.useSyncExternalStore=function(C,P,Z){return se.current.useSyncExternalStore(C,P,Z)},oe.useTransition=function(){return se.current.useTransition()},oe.version="18.3.1",oe}var Cm;function rl(){return Cm||(Cm=1,vu.exports=Zw()),vu.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var km;function ex(){if(km)return Ss;km=1;var r=rl(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,o=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function u(h,p,m){var v,_={},x=null,I=null;m!==void 0&&(x=""+m),p.key!==void 0&&(x=""+p.key),p.ref!==void 0&&(I=p.ref);for(v in p)s.call(p,v)&&!l.hasOwnProperty(v)&&(_[v]=p[v]);if(h&&h.defaultProps)for(v in p=h.defaultProps,p)_[v]===void 0&&(_[v]=p[v]);return{$$typeof:e,type:h,key:x,ref:I,props:_,_owner:o.current}}return Ss.Fragment=t,Ss.jsx=u,Ss.jsxs=u,Ss}var Im;function tx(){return Im||(Im=1,_u.exports=ex()),_u.exports}var y=tx(),wa={},wu={exports:{}},xt={},xu={exports:{}},Su={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Tm;function nx(){return Tm||(Tm=1,(function(r){function e(j,H){var z=j.length;j.push(H);e:for(;0<z;){var C=z-1>>>1,P=j[C];if(0<o(P,H))j[C]=H,j[z]=P,z=C;else break e}}function t(j){return j.length===0?null:j[0]}function s(j){if(j.length===0)return null;var H=j[0],z=j.pop();if(z!==H){j[0]=z;e:for(var C=0,P=j.length,Z=P>>>1;C<Z;){var re=2*(C+1)-1,de=j[re],ge=re+1,Ne=j[ge];if(0>o(de,z))ge<P&&0>o(Ne,de)?(j[C]=Ne,j[ge]=z,C=ge):(j[C]=de,j[re]=z,C=re);else if(ge<P&&0>o(Ne,z))j[C]=Ne,j[ge]=z,C=ge;else break e}}return H}function o(j,H){var z=j.sortIndex-H.sortIndex;return z!==0?z:j.id-H.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;r.unstable_now=function(){return l.now()}}else{var u=Date,h=u.now();r.unstable_now=function(){return u.now()-h}}var p=[],m=[],v=1,_=null,x=3,I=!1,N=!1,b=!1,F=typeof setTimeout=="function"?setTimeout:null,he=typeof clearTimeout=="function"?clearTimeout:null,fe=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function me(j){for(var H=t(m);H!==null;){if(H.callback===null)s(m);else if(H.startTime<=j)s(m),H.sortIndex=H.expirationTime,e(p,H);else break;H=t(m)}}function ne(j){if(b=!1,me(j),!N)if(t(p)!==null)N=!0,ue(Ie);else{var H=t(m);H!==null&&se(ne,H.startTime-j)}}function Ie(j,H){N=!1,b&&(b=!1,he(He),He=-1),I=!0;var z=x;try{for(me(H),_=t(p);_!==null&&(!(_.expirationTime>H)||j&&!bt());){var C=_.callback;if(typeof C=="function"){_.callback=null,x=_.priorityLevel;var P=C(_.expirationTime<=H);H=r.unstable_now(),typeof P=="function"?_.callback=P:_===t(p)&&s(p),me(H)}else s(p);_=t(p)}if(_!==null)var Z=!0;else{var re=t(m);re!==null&&se(ne,re.startTime-H),Z=!1}return Z}finally{_=null,x=z,I=!1}}var De=!1,Te=null,He=-1,Ae=5,ve=-1;function bt(){return!(r.unstable_now()-ve<Ae)}function ie(){if(Te!==null){var j=r.unstable_now();ve=j;var H=!0;try{H=Te(!0,j)}finally{H?q():(De=!1,Te=null)}}else De=!1}var q;if(typeof fe=="function")q=function(){fe(ie)};else if(typeof MessageChannel<"u"){var ee=new MessageChannel,we=ee.port2;ee.port1.onmessage=ie,q=function(){we.postMessage(null)}}else q=function(){F(ie,0)};function ue(j){Te=j,De||(De=!0,q())}function se(j,H){He=F(function(){j(r.unstable_now())},H)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(j){j.callback=null},r.unstable_continueExecution=function(){N||I||(N=!0,ue(Ie))},r.unstable_forceFrameRate=function(j){0>j||125<j?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Ae=0<j?Math.floor(1e3/j):5},r.unstable_getCurrentPriorityLevel=function(){return x},r.unstable_getFirstCallbackNode=function(){return t(p)},r.unstable_next=function(j){switch(x){case 1:case 2:case 3:var H=3;break;default:H=x}var z=x;x=H;try{return j()}finally{x=z}},r.unstable_pauseExecution=function(){},r.unstable_requestPaint=function(){},r.unstable_runWithPriority=function(j,H){switch(j){case 1:case 2:case 3:case 4:case 5:break;default:j=3}var z=x;x=j;try{return H()}finally{x=z}},r.unstable_scheduleCallback=function(j,H,z){var C=r.unstable_now();switch(typeof z=="object"&&z!==null?(z=z.delay,z=typeof z=="number"&&0<z?C+z:C):z=C,j){case 1:var P=-1;break;case 2:P=250;break;case 5:P=1073741823;break;case 4:P=1e4;break;default:P=5e3}return P=z+P,j={id:v++,callback:H,priorityLevel:j,startTime:z,expirationTime:P,sortIndex:-1},z>C?(j.sortIndex=z,e(m,j),t(p)===null&&j===t(m)&&(b?(he(He),He=-1):b=!0,se(ne,z-C))):(j.sortIndex=P,e(p,j),N||I||(N=!0,ue(Ie))),j},r.unstable_shouldYield=bt,r.unstable_wrapCallback=function(j){var H=x;return function(){var z=x;x=H;try{return j.apply(this,arguments)}finally{x=z}}}})(Su)),Su}var Nm;function rx(){return Nm||(Nm=1,xu.exports=nx()),xu.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Rm;function ix(){if(Rm)return xt;Rm=1;var r=rl(),e=rx();function t(n){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+n,a=1;a<arguments.length;a++)i+="&args[]="+encodeURIComponent(arguments[a]);return"Minified React error #"+n+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var s=new Set,o={};function l(n,i){u(n,i),u(n+"Capture",i)}function u(n,i){for(o[n]=i,n=0;n<i.length;n++)s.add(i[n])}var h=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),p=Object.prototype.hasOwnProperty,m=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,v={},_={};function x(n){return p.call(_,n)?!0:p.call(v,n)?!1:m.test(n)?_[n]=!0:(v[n]=!0,!1)}function I(n,i,a,c){if(a!==null&&a.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return c?!1:a!==null?!a.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function N(n,i,a,c){if(i===null||typeof i>"u"||I(n,i,a,c))return!0;if(c)return!1;if(a!==null)switch(a.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function b(n,i,a,c,d,f,g){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=c,this.attributeNamespace=d,this.mustUseProperty=a,this.propertyName=n,this.type=i,this.sanitizeURL=f,this.removeEmptyString=g}var F={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){F[n]=new b(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var i=n[0];F[i]=new b(i,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){F[n]=new b(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){F[n]=new b(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){F[n]=new b(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){F[n]=new b(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){F[n]=new b(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){F[n]=new b(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){F[n]=new b(n,5,!1,n.toLowerCase(),null,!1,!1)});var he=/[\-:]([a-z])/g;function fe(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var i=n.replace(he,fe);F[i]=new b(i,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var i=n.replace(he,fe);F[i]=new b(i,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var i=n.replace(he,fe);F[i]=new b(i,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){F[n]=new b(n,1,!1,n.toLowerCase(),null,!1,!1)}),F.xlinkHref=new b("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){F[n]=new b(n,1,!1,n.toLowerCase(),null,!0,!0)});function me(n,i,a,c){var d=F.hasOwnProperty(i)?F[i]:null;(d!==null?d.type!==0:c||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(N(i,a,d,c)&&(a=null),c||d===null?x(i)&&(a===null?n.removeAttribute(i):n.setAttribute(i,""+a)):d.mustUseProperty?n[d.propertyName]=a===null?d.type===3?!1:"":a:(i=d.attributeName,c=d.attributeNamespace,a===null?n.removeAttribute(i):(d=d.type,a=d===3||d===4&&a===!0?"":""+a,c?n.setAttributeNS(c,i,a):n.setAttribute(i,a))))}var ne=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ie=Symbol.for("react.element"),De=Symbol.for("react.portal"),Te=Symbol.for("react.fragment"),He=Symbol.for("react.strict_mode"),Ae=Symbol.for("react.profiler"),ve=Symbol.for("react.provider"),bt=Symbol.for("react.context"),ie=Symbol.for("react.forward_ref"),q=Symbol.for("react.suspense"),ee=Symbol.for("react.suspense_list"),we=Symbol.for("react.memo"),ue=Symbol.for("react.lazy"),se=Symbol.for("react.offscreen"),j=Symbol.iterator;function H(n){return n===null||typeof n!="object"?null:(n=j&&n[j]||n["@@iterator"],typeof n=="function"?n:null)}var z=Object.assign,C;function P(n){if(C===void 0)try{throw Error()}catch(a){var i=a.stack.trim().match(/\n( *(at )?)/);C=i&&i[1]||""}return`
`+C+n}var Z=!1;function re(n,i){if(!n||Z)return"";Z=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(R){var c=R}Reflect.construct(n,[],i)}else{try{i.call()}catch(R){c=R}n.call(i.prototype)}else{try{throw Error()}catch(R){c=R}n()}}catch(R){if(R&&c&&typeof R.stack=="string"){for(var d=R.stack.split(`
`),f=c.stack.split(`
`),g=d.length-1,w=f.length-1;1<=g&&0<=w&&d[g]!==f[w];)w--;for(;1<=g&&0<=w;g--,w--)if(d[g]!==f[w]){if(g!==1||w!==1)do if(g--,w--,0>w||d[g]!==f[w]){var S=`
`+d[g].replace(" at new "," at ");return n.displayName&&S.includes("<anonymous>")&&(S=S.replace("<anonymous>",n.displayName)),S}while(1<=g&&0<=w);break}}}finally{Z=!1,Error.prepareStackTrace=a}return(n=n?n.displayName||n.name:"")?P(n):""}function de(n){switch(n.tag){case 5:return P(n.type);case 16:return P("Lazy");case 13:return P("Suspense");case 19:return P("SuspenseList");case 0:case 2:case 15:return n=re(n.type,!1),n;case 11:return n=re(n.type.render,!1),n;case 1:return n=re(n.type,!0),n;default:return""}}function ge(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case Te:return"Fragment";case De:return"Portal";case Ae:return"Profiler";case He:return"StrictMode";case q:return"Suspense";case ee:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case bt:return(n.displayName||"Context")+".Consumer";case ve:return(n._context.displayName||"Context")+".Provider";case ie:var i=n.render;return n=n.displayName,n||(n=i.displayName||i.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case we:return i=n.displayName||null,i!==null?i:ge(n.type)||"Memo";case ue:i=n._payload,n=n._init;try{return ge(n(i))}catch{}}return null}function Ne(n){var i=n.type;switch(n.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=i.render,n=n.displayName||n.name||"",i.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ge(i);case 8:return i===He?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function xe(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function Me(n){var i=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function kt(n){var i=Me(n)?"checked":"value",a=Object.getOwnPropertyDescriptor(n.constructor.prototype,i),c=""+n[i];if(!n.hasOwnProperty(i)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var d=a.get,f=a.set;return Object.defineProperty(n,i,{configurable:!0,get:function(){return d.call(this)},set:function(g){c=""+g,f.call(this,g)}}),Object.defineProperty(n,i,{enumerable:a.enumerable}),{getValue:function(){return c},setValue:function(g){c=""+g},stopTracking:function(){n._valueTracker=null,delete n[i]}}}}function co(n){n._valueTracker||(n._valueTracker=kt(n))}function Nh(n){if(!n)return!1;var i=n._valueTracker;if(!i)return!0;var a=i.getValue(),c="";return n&&(c=Me(n)?n.checked?"true":"false":n.value),n=c,n!==a?(i.setValue(n),!0):!1}function uo(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function kl(n,i){var a=i.checked;return z({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:a??n._wrapperState.initialChecked})}function Rh(n,i){var a=i.defaultValue==null?"":i.defaultValue,c=i.checked!=null?i.checked:i.defaultChecked;a=xe(i.value!=null?i.value:a),n._wrapperState={initialChecked:c,initialValue:a,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function Ph(n,i){i=i.checked,i!=null&&me(n,"checked",i,!1)}function Il(n,i){Ph(n,i);var a=xe(i.value),c=i.type;if(a!=null)c==="number"?(a===0&&n.value===""||n.value!=a)&&(n.value=""+a):n.value!==""+a&&(n.value=""+a);else if(c==="submit"||c==="reset"){n.removeAttribute("value");return}i.hasOwnProperty("value")?Tl(n,i.type,a):i.hasOwnProperty("defaultValue")&&Tl(n,i.type,xe(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(n.defaultChecked=!!i.defaultChecked)}function bh(n,i,a){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var c=i.type;if(!(c!=="submit"&&c!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+n._wrapperState.initialValue,a||i===n.value||(n.value=i),n.defaultValue=i}a=n.name,a!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,a!==""&&(n.name=a)}function Tl(n,i,a){(i!=="number"||uo(n.ownerDocument)!==n)&&(a==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+a&&(n.defaultValue=""+a))}var ji=Array.isArray;function Vr(n,i,a,c){if(n=n.options,i){i={};for(var d=0;d<a.length;d++)i["$"+a[d]]=!0;for(a=0;a<n.length;a++)d=i.hasOwnProperty("$"+n[a].value),n[a].selected!==d&&(n[a].selected=d),d&&c&&(n[a].defaultSelected=!0)}else{for(a=""+xe(a),i=null,d=0;d<n.length;d++){if(n[d].value===a){n[d].selected=!0,c&&(n[d].defaultSelected=!0);return}i!==null||n[d].disabled||(i=n[d])}i!==null&&(i.selected=!0)}}function Nl(n,i){if(i.dangerouslySetInnerHTML!=null)throw Error(t(91));return z({},i,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function Ah(n,i){var a=i.value;if(a==null){if(a=i.children,i=i.defaultValue,a!=null){if(i!=null)throw Error(t(92));if(ji(a)){if(1<a.length)throw Error(t(93));a=a[0]}i=a}i==null&&(i=""),a=i}n._wrapperState={initialValue:xe(a)}}function Oh(n,i){var a=xe(i.value),c=xe(i.defaultValue);a!=null&&(a=""+a,a!==n.value&&(n.value=a),i.defaultValue==null&&n.defaultValue!==a&&(n.defaultValue=a)),c!=null&&(n.defaultValue=""+c)}function Lh(n){var i=n.textContent;i===n._wrapperState.initialValue&&i!==""&&i!==null&&(n.value=i)}function Dh(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Rl(n,i){return n==null||n==="http://www.w3.org/1999/xhtml"?Dh(i):n==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var ho,Mh=(function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,a,c,d){MSApp.execUnsafeLocalFunction(function(){return n(i,a,c,d)})}:n})(function(n,i){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=i;else{for(ho=ho||document.createElement("div"),ho.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=ho.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;i.firstChild;)n.appendChild(i.firstChild)}});function Fi(n,i){if(i){var a=n.firstChild;if(a&&a===n.lastChild&&a.nodeType===3){a.nodeValue=i;return}}n.textContent=i}var Ui={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},r0=["Webkit","ms","Moz","O"];Object.keys(Ui).forEach(function(n){r0.forEach(function(i){i=i+n.charAt(0).toUpperCase()+n.substring(1),Ui[i]=Ui[n]})});function jh(n,i,a){return i==null||typeof i=="boolean"||i===""?"":a||typeof i!="number"||i===0||Ui.hasOwnProperty(n)&&Ui[n]?(""+i).trim():i+"px"}function Fh(n,i){n=n.style;for(var a in i)if(i.hasOwnProperty(a)){var c=a.indexOf("--")===0,d=jh(a,i[a],c);a==="float"&&(a="cssFloat"),c?n.setProperty(a,d):n[a]=d}}var i0=z({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Pl(n,i){if(i){if(i0[n]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(t(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(t(61))}if(i.style!=null&&typeof i.style!="object")throw Error(t(62))}}function bl(n,i){if(n.indexOf("-")===-1)return typeof i.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Al=null;function Ol(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var Ll=null,Br=null,Wr=null;function Uh(n){if(n=as(n)){if(typeof Ll!="function")throw Error(t(280));var i=n.stateNode;i&&(i=Do(i),Ll(n.stateNode,n.type,i))}}function zh(n){Br?Wr?Wr.push(n):Wr=[n]:Br=n}function $h(){if(Br){var n=Br,i=Wr;if(Wr=Br=null,Uh(n),i)for(n=0;n<i.length;n++)Uh(i[n])}}function Vh(n,i){return n(i)}function Bh(){}var Dl=!1;function Wh(n,i,a){if(Dl)return n(i,a);Dl=!0;try{return Vh(n,i,a)}finally{Dl=!1,(Br!==null||Wr!==null)&&(Bh(),$h())}}function zi(n,i){var a=n.stateNode;if(a===null)return null;var c=Do(a);if(c===null)return null;a=c[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(n=n.type,c=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!c;break e;default:n=!1}if(n)return null;if(a&&typeof a!="function")throw Error(t(231,i,typeof a));return a}var Ml=!1;if(h)try{var $i={};Object.defineProperty($i,"passive",{get:function(){Ml=!0}}),window.addEventListener("test",$i,$i),window.removeEventListener("test",$i,$i)}catch{Ml=!1}function s0(n,i,a,c,d,f,g,w,S){var R=Array.prototype.slice.call(arguments,3);try{i.apply(a,R)}catch(O){this.onError(O)}}var Vi=!1,fo=null,po=!1,jl=null,o0={onError:function(n){Vi=!0,fo=n}};function a0(n,i,a,c,d,f,g,w,S){Vi=!1,fo=null,s0.apply(o0,arguments)}function l0(n,i,a,c,d,f,g,w,S){if(a0.apply(this,arguments),Vi){if(Vi){var R=fo;Vi=!1,fo=null}else throw Error(t(198));po||(po=!0,jl=R)}}function lr(n){var i=n,a=n;if(n.alternate)for(;i.return;)i=i.return;else{n=i;do i=n,(i.flags&4098)!==0&&(a=i.return),n=i.return;while(n)}return i.tag===3?a:null}function Hh(n){if(n.tag===13){var i=n.memoizedState;if(i===null&&(n=n.alternate,n!==null&&(i=n.memoizedState)),i!==null)return i.dehydrated}return null}function Kh(n){if(lr(n)!==n)throw Error(t(188))}function c0(n){var i=n.alternate;if(!i){if(i=lr(n),i===null)throw Error(t(188));return i!==n?null:n}for(var a=n,c=i;;){var d=a.return;if(d===null)break;var f=d.alternate;if(f===null){if(c=d.return,c!==null){a=c;continue}break}if(d.child===f.child){for(f=d.child;f;){if(f===a)return Kh(d),n;if(f===c)return Kh(d),i;f=f.sibling}throw Error(t(188))}if(a.return!==c.return)a=d,c=f;else{for(var g=!1,w=d.child;w;){if(w===a){g=!0,a=d,c=f;break}if(w===c){g=!0,c=d,a=f;break}w=w.sibling}if(!g){for(w=f.child;w;){if(w===a){g=!0,a=f,c=d;break}if(w===c){g=!0,c=f,a=d;break}w=w.sibling}if(!g)throw Error(t(189))}}if(a.alternate!==c)throw Error(t(190))}if(a.tag!==3)throw Error(t(188));return a.stateNode.current===a?n:i}function Gh(n){return n=c0(n),n!==null?qh(n):null}function qh(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var i=qh(n);if(i!==null)return i;n=n.sibling}return null}var Yh=e.unstable_scheduleCallback,Qh=e.unstable_cancelCallback,u0=e.unstable_shouldYield,d0=e.unstable_requestPaint,Be=e.unstable_now,h0=e.unstable_getCurrentPriorityLevel,Fl=e.unstable_ImmediatePriority,Jh=e.unstable_UserBlockingPriority,mo=e.unstable_NormalPriority,f0=e.unstable_LowPriority,Xh=e.unstable_IdlePriority,go=null,tn=null;function p0(n){if(tn&&typeof tn.onCommitFiberRoot=="function")try{tn.onCommitFiberRoot(go,n,void 0,(n.current.flags&128)===128)}catch{}}var zt=Math.clz32?Math.clz32:y0,m0=Math.log,g0=Math.LN2;function y0(n){return n>>>=0,n===0?32:31-(m0(n)/g0|0)|0}var yo=64,_o=4194304;function Bi(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function vo(n,i){var a=n.pendingLanes;if(a===0)return 0;var c=0,d=n.suspendedLanes,f=n.pingedLanes,g=a&268435455;if(g!==0){var w=g&~d;w!==0?c=Bi(w):(f&=g,f!==0&&(c=Bi(f)))}else g=a&~d,g!==0?c=Bi(g):f!==0&&(c=Bi(f));if(c===0)return 0;if(i!==0&&i!==c&&(i&d)===0&&(d=c&-c,f=i&-i,d>=f||d===16&&(f&4194240)!==0))return i;if((c&4)!==0&&(c|=a&16),i=n.entangledLanes,i!==0)for(n=n.entanglements,i&=c;0<i;)a=31-zt(i),d=1<<a,c|=n[a],i&=~d;return c}function _0(n,i){switch(n){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function v0(n,i){for(var a=n.suspendedLanes,c=n.pingedLanes,d=n.expirationTimes,f=n.pendingLanes;0<f;){var g=31-zt(f),w=1<<g,S=d[g];S===-1?((w&a)===0||(w&c)!==0)&&(d[g]=_0(w,i)):S<=i&&(n.expiredLanes|=w),f&=~w}}function Ul(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function Zh(){var n=yo;return yo<<=1,(yo&4194240)===0&&(yo=64),n}function zl(n){for(var i=[],a=0;31>a;a++)i.push(n);return i}function Wi(n,i,a){n.pendingLanes|=i,i!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,i=31-zt(i),n[i]=a}function w0(n,i){var a=n.pendingLanes&~i;n.pendingLanes=i,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=i,n.mutableReadLanes&=i,n.entangledLanes&=i,i=n.entanglements;var c=n.eventTimes;for(n=n.expirationTimes;0<a;){var d=31-zt(a),f=1<<d;i[d]=0,c[d]=-1,n[d]=-1,a&=~f}}function $l(n,i){var a=n.entangledLanes|=i;for(n=n.entanglements;a;){var c=31-zt(a),d=1<<c;d&i|n[c]&i&&(n[c]|=i),a&=~d}}var Se=0;function ef(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var tf,Vl,nf,rf,sf,Bl=!1,wo=[],Pn=null,bn=null,An=null,Hi=new Map,Ki=new Map,On=[],x0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function of(n,i){switch(n){case"focusin":case"focusout":Pn=null;break;case"dragenter":case"dragleave":bn=null;break;case"mouseover":case"mouseout":An=null;break;case"pointerover":case"pointerout":Hi.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ki.delete(i.pointerId)}}function Gi(n,i,a,c,d,f){return n===null||n.nativeEvent!==f?(n={blockedOn:i,domEventName:a,eventSystemFlags:c,nativeEvent:f,targetContainers:[d]},i!==null&&(i=as(i),i!==null&&Vl(i)),n):(n.eventSystemFlags|=c,i=n.targetContainers,d!==null&&i.indexOf(d)===-1&&i.push(d),n)}function S0(n,i,a,c,d){switch(i){case"focusin":return Pn=Gi(Pn,n,i,a,c,d),!0;case"dragenter":return bn=Gi(bn,n,i,a,c,d),!0;case"mouseover":return An=Gi(An,n,i,a,c,d),!0;case"pointerover":var f=d.pointerId;return Hi.set(f,Gi(Hi.get(f)||null,n,i,a,c,d)),!0;case"gotpointercapture":return f=d.pointerId,Ki.set(f,Gi(Ki.get(f)||null,n,i,a,c,d)),!0}return!1}function af(n){var i=cr(n.target);if(i!==null){var a=lr(i);if(a!==null){if(i=a.tag,i===13){if(i=Hh(a),i!==null){n.blockedOn=i,sf(n.priority,function(){nf(a)});return}}else if(i===3&&a.stateNode.current.memoizedState.isDehydrated){n.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}n.blockedOn=null}function xo(n){if(n.blockedOn!==null)return!1;for(var i=n.targetContainers;0<i.length;){var a=Hl(n.domEventName,n.eventSystemFlags,i[0],n.nativeEvent);if(a===null){a=n.nativeEvent;var c=new a.constructor(a.type,a);Al=c,a.target.dispatchEvent(c),Al=null}else return i=as(a),i!==null&&Vl(i),n.blockedOn=a,!1;i.shift()}return!0}function lf(n,i,a){xo(n)&&a.delete(i)}function E0(){Bl=!1,Pn!==null&&xo(Pn)&&(Pn=null),bn!==null&&xo(bn)&&(bn=null),An!==null&&xo(An)&&(An=null),Hi.forEach(lf),Ki.forEach(lf)}function qi(n,i){n.blockedOn===i&&(n.blockedOn=null,Bl||(Bl=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,E0)))}function Yi(n){function i(d){return qi(d,n)}if(0<wo.length){qi(wo[0],n);for(var a=1;a<wo.length;a++){var c=wo[a];c.blockedOn===n&&(c.blockedOn=null)}}for(Pn!==null&&qi(Pn,n),bn!==null&&qi(bn,n),An!==null&&qi(An,n),Hi.forEach(i),Ki.forEach(i),a=0;a<On.length;a++)c=On[a],c.blockedOn===n&&(c.blockedOn=null);for(;0<On.length&&(a=On[0],a.blockedOn===null);)af(a),a.blockedOn===null&&On.shift()}var Hr=ne.ReactCurrentBatchConfig,So=!0;function C0(n,i,a,c){var d=Se,f=Hr.transition;Hr.transition=null;try{Se=1,Wl(n,i,a,c)}finally{Se=d,Hr.transition=f}}function k0(n,i,a,c){var d=Se,f=Hr.transition;Hr.transition=null;try{Se=4,Wl(n,i,a,c)}finally{Se=d,Hr.transition=f}}function Wl(n,i,a,c){if(So){var d=Hl(n,i,a,c);if(d===null)lc(n,i,c,Eo,a),of(n,c);else if(S0(d,n,i,a,c))c.stopPropagation();else if(of(n,c),i&4&&-1<x0.indexOf(n)){for(;d!==null;){var f=as(d);if(f!==null&&tf(f),f=Hl(n,i,a,c),f===null&&lc(n,i,c,Eo,a),f===d)break;d=f}d!==null&&c.stopPropagation()}else lc(n,i,c,null,a)}}var Eo=null;function Hl(n,i,a,c){if(Eo=null,n=Ol(c),n=cr(n),n!==null)if(i=lr(n),i===null)n=null;else if(a=i.tag,a===13){if(n=Hh(i),n!==null)return n;n=null}else if(a===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;n=null}else i!==n&&(n=null);return Eo=n,null}function cf(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(h0()){case Fl:return 1;case Jh:return 4;case mo:case f0:return 16;case Xh:return 536870912;default:return 16}default:return 16}}var Ln=null,Kl=null,Co=null;function uf(){if(Co)return Co;var n,i=Kl,a=i.length,c,d="value"in Ln?Ln.value:Ln.textContent,f=d.length;for(n=0;n<a&&i[n]===d[n];n++);var g=a-n;for(c=1;c<=g&&i[a-c]===d[f-c];c++);return Co=d.slice(n,1<c?1-c:void 0)}function ko(n){var i=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&i===13&&(n=13)):n=i,n===10&&(n=13),32<=n||n===13?n:0}function Io(){return!0}function df(){return!1}function It(n){function i(a,c,d,f,g){this._reactName=a,this._targetInst=d,this.type=c,this.nativeEvent=f,this.target=g,this.currentTarget=null;for(var w in n)n.hasOwnProperty(w)&&(a=n[w],this[w]=a?a(f):f[w]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?Io:df,this.isPropagationStopped=df,this}return z(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Io)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Io)},persist:function(){},isPersistent:Io}),i}var Kr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Gl=It(Kr),Qi=z({},Kr,{view:0,detail:0}),I0=It(Qi),ql,Yl,Ji,To=z({},Qi,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Jl,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==Ji&&(Ji&&n.type==="mousemove"?(ql=n.screenX-Ji.screenX,Yl=n.screenY-Ji.screenY):Yl=ql=0,Ji=n),ql)},movementY:function(n){return"movementY"in n?n.movementY:Yl}}),hf=It(To),T0=z({},To,{dataTransfer:0}),N0=It(T0),R0=z({},Qi,{relatedTarget:0}),Ql=It(R0),P0=z({},Kr,{animationName:0,elapsedTime:0,pseudoElement:0}),b0=It(P0),A0=z({},Kr,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),O0=It(A0),L0=z({},Kr,{data:0}),ff=It(L0),D0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},M0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},j0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function F0(n){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(n):(n=j0[n])?!!i[n]:!1}function Jl(){return F0}var U0=z({},Qi,{key:function(n){if(n.key){var i=D0[n.key]||n.key;if(i!=="Unidentified")return i}return n.type==="keypress"?(n=ko(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?M0[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Jl,charCode:function(n){return n.type==="keypress"?ko(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?ko(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),z0=It(U0),$0=z({},To,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),pf=It($0),V0=z({},Qi,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Jl}),B0=It(V0),W0=z({},Kr,{propertyName:0,elapsedTime:0,pseudoElement:0}),H0=It(W0),K0=z({},To,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),G0=It(K0),q0=[9,13,27,32],Xl=h&&"CompositionEvent"in window,Xi=null;h&&"documentMode"in document&&(Xi=document.documentMode);var Y0=h&&"TextEvent"in window&&!Xi,mf=h&&(!Xl||Xi&&8<Xi&&11>=Xi),gf=" ",yf=!1;function _f(n,i){switch(n){case"keyup":return q0.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function vf(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var Gr=!1;function Q0(n,i){switch(n){case"compositionend":return vf(i);case"keypress":return i.which!==32?null:(yf=!0,gf);case"textInput":return n=i.data,n===gf&&yf?null:n;default:return null}}function J0(n,i){if(Gr)return n==="compositionend"||!Xl&&_f(n,i)?(n=uf(),Co=Kl=Ln=null,Gr=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return mf&&i.locale!=="ko"?null:i.data;default:return null}}var X0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function wf(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i==="input"?!!X0[n.type]:i==="textarea"}function xf(n,i,a,c){zh(c),i=Ao(i,"onChange"),0<i.length&&(a=new Gl("onChange","change",null,a,c),n.push({event:a,listeners:i}))}var Zi=null,es=null;function Z0(n){Uf(n,0)}function No(n){var i=Xr(n);if(Nh(i))return n}function ew(n,i){if(n==="change")return i}var Sf=!1;if(h){var Zl;if(h){var ec="oninput"in document;if(!ec){var Ef=document.createElement("div");Ef.setAttribute("oninput","return;"),ec=typeof Ef.oninput=="function"}Zl=ec}else Zl=!1;Sf=Zl&&(!document.documentMode||9<document.documentMode)}function Cf(){Zi&&(Zi.detachEvent("onpropertychange",kf),es=Zi=null)}function kf(n){if(n.propertyName==="value"&&No(es)){var i=[];xf(i,es,n,Ol(n)),Wh(Z0,i)}}function tw(n,i,a){n==="focusin"?(Cf(),Zi=i,es=a,Zi.attachEvent("onpropertychange",kf)):n==="focusout"&&Cf()}function nw(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return No(es)}function rw(n,i){if(n==="click")return No(i)}function iw(n,i){if(n==="input"||n==="change")return No(i)}function sw(n,i){return n===i&&(n!==0||1/n===1/i)||n!==n&&i!==i}var $t=typeof Object.is=="function"?Object.is:sw;function ts(n,i){if($t(n,i))return!0;if(typeof n!="object"||n===null||typeof i!="object"||i===null)return!1;var a=Object.keys(n),c=Object.keys(i);if(a.length!==c.length)return!1;for(c=0;c<a.length;c++){var d=a[c];if(!p.call(i,d)||!$t(n[d],i[d]))return!1}return!0}function If(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function Tf(n,i){var a=If(n);n=0;for(var c;a;){if(a.nodeType===3){if(c=n+a.textContent.length,n<=i&&c>=i)return{node:a,offset:i-n};n=c}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=If(a)}}function Nf(n,i){return n&&i?n===i?!0:n&&n.nodeType===3?!1:i&&i.nodeType===3?Nf(n,i.parentNode):"contains"in n?n.contains(i):n.compareDocumentPosition?!!(n.compareDocumentPosition(i)&16):!1:!1}function Rf(){for(var n=window,i=uo();i instanceof n.HTMLIFrameElement;){try{var a=typeof i.contentWindow.location.href=="string"}catch{a=!1}if(a)n=i.contentWindow;else break;i=uo(n.document)}return i}function tc(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i&&(i==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||i==="textarea"||n.contentEditable==="true")}function ow(n){var i=Rf(),a=n.focusedElem,c=n.selectionRange;if(i!==a&&a&&a.ownerDocument&&Nf(a.ownerDocument.documentElement,a)){if(c!==null&&tc(a)){if(i=c.start,n=c.end,n===void 0&&(n=i),"selectionStart"in a)a.selectionStart=i,a.selectionEnd=Math.min(n,a.value.length);else if(n=(i=a.ownerDocument||document)&&i.defaultView||window,n.getSelection){n=n.getSelection();var d=a.textContent.length,f=Math.min(c.start,d);c=c.end===void 0?f:Math.min(c.end,d),!n.extend&&f>c&&(d=c,c=f,f=d),d=Tf(a,f);var g=Tf(a,c);d&&g&&(n.rangeCount!==1||n.anchorNode!==d.node||n.anchorOffset!==d.offset||n.focusNode!==g.node||n.focusOffset!==g.offset)&&(i=i.createRange(),i.setStart(d.node,d.offset),n.removeAllRanges(),f>c?(n.addRange(i),n.extend(g.node,g.offset)):(i.setEnd(g.node,g.offset),n.addRange(i)))}}for(i=[],n=a;n=n.parentNode;)n.nodeType===1&&i.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof a.focus=="function"&&a.focus(),a=0;a<i.length;a++)n=i[a],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var aw=h&&"documentMode"in document&&11>=document.documentMode,qr=null,nc=null,ns=null,rc=!1;function Pf(n,i,a){var c=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;rc||qr==null||qr!==uo(c)||(c=qr,"selectionStart"in c&&tc(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),ns&&ts(ns,c)||(ns=c,c=Ao(nc,"onSelect"),0<c.length&&(i=new Gl("onSelect","select",null,i,a),n.push({event:i,listeners:c}),i.target=qr)))}function Ro(n,i){var a={};return a[n.toLowerCase()]=i.toLowerCase(),a["Webkit"+n]="webkit"+i,a["Moz"+n]="moz"+i,a}var Yr={animationend:Ro("Animation","AnimationEnd"),animationiteration:Ro("Animation","AnimationIteration"),animationstart:Ro("Animation","AnimationStart"),transitionend:Ro("Transition","TransitionEnd")},ic={},bf={};h&&(bf=document.createElement("div").style,"AnimationEvent"in window||(delete Yr.animationend.animation,delete Yr.animationiteration.animation,delete Yr.animationstart.animation),"TransitionEvent"in window||delete Yr.transitionend.transition);function Po(n){if(ic[n])return ic[n];if(!Yr[n])return n;var i=Yr[n],a;for(a in i)if(i.hasOwnProperty(a)&&a in bf)return ic[n]=i[a];return n}var Af=Po("animationend"),Of=Po("animationiteration"),Lf=Po("animationstart"),Df=Po("transitionend"),Mf=new Map,jf="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Dn(n,i){Mf.set(n,i),l(i,[n])}for(var sc=0;sc<jf.length;sc++){var oc=jf[sc],lw=oc.toLowerCase(),cw=oc[0].toUpperCase()+oc.slice(1);Dn(lw,"on"+cw)}Dn(Af,"onAnimationEnd"),Dn(Of,"onAnimationIteration"),Dn(Lf,"onAnimationStart"),Dn("dblclick","onDoubleClick"),Dn("focusin","onFocus"),Dn("focusout","onBlur"),Dn(Df,"onTransitionEnd"),u("onMouseEnter",["mouseout","mouseover"]),u("onMouseLeave",["mouseout","mouseover"]),u("onPointerEnter",["pointerout","pointerover"]),u("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var rs="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),uw=new Set("cancel close invalid load scroll toggle".split(" ").concat(rs));function Ff(n,i,a){var c=n.type||"unknown-event";n.currentTarget=a,l0(c,i,void 0,n),n.currentTarget=null}function Uf(n,i){i=(i&4)!==0;for(var a=0;a<n.length;a++){var c=n[a],d=c.event;c=c.listeners;e:{var f=void 0;if(i)for(var g=c.length-1;0<=g;g--){var w=c[g],S=w.instance,R=w.currentTarget;if(w=w.listener,S!==f&&d.isPropagationStopped())break e;Ff(d,w,R),f=S}else for(g=0;g<c.length;g++){if(w=c[g],S=w.instance,R=w.currentTarget,w=w.listener,S!==f&&d.isPropagationStopped())break e;Ff(d,w,R),f=S}}}if(po)throw n=jl,po=!1,jl=null,n}function Oe(n,i){var a=i[pc];a===void 0&&(a=i[pc]=new Set);var c=n+"__bubble";a.has(c)||(zf(i,n,2,!1),a.add(c))}function ac(n,i,a){var c=0;i&&(c|=4),zf(a,n,c,i)}var bo="_reactListening"+Math.random().toString(36).slice(2);function is(n){if(!n[bo]){n[bo]=!0,s.forEach(function(a){a!=="selectionchange"&&(uw.has(a)||ac(a,!1,n),ac(a,!0,n))});var i=n.nodeType===9?n:n.ownerDocument;i===null||i[bo]||(i[bo]=!0,ac("selectionchange",!1,i))}}function zf(n,i,a,c){switch(cf(i)){case 1:var d=C0;break;case 4:d=k0;break;default:d=Wl}a=d.bind(null,i,a,n),d=void 0,!Ml||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(d=!0),c?d!==void 0?n.addEventListener(i,a,{capture:!0,passive:d}):n.addEventListener(i,a,!0):d!==void 0?n.addEventListener(i,a,{passive:d}):n.addEventListener(i,a,!1)}function lc(n,i,a,c,d){var f=c;if((i&1)===0&&(i&2)===0&&c!==null)e:for(;;){if(c===null)return;var g=c.tag;if(g===3||g===4){var w=c.stateNode.containerInfo;if(w===d||w.nodeType===8&&w.parentNode===d)break;if(g===4)for(g=c.return;g!==null;){var S=g.tag;if((S===3||S===4)&&(S=g.stateNode.containerInfo,S===d||S.nodeType===8&&S.parentNode===d))return;g=g.return}for(;w!==null;){if(g=cr(w),g===null)return;if(S=g.tag,S===5||S===6){c=f=g;continue e}w=w.parentNode}}c=c.return}Wh(function(){var R=f,O=Ol(a),L=[];e:{var A=Mf.get(n);if(A!==void 0){var U=Gl,V=n;switch(n){case"keypress":if(ko(a)===0)break e;case"keydown":case"keyup":U=z0;break;case"focusin":V="focus",U=Ql;break;case"focusout":V="blur",U=Ql;break;case"beforeblur":case"afterblur":U=Ql;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":U=hf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":U=N0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":U=B0;break;case Af:case Of:case Lf:U=b0;break;case Df:U=H0;break;case"scroll":U=I0;break;case"wheel":U=G0;break;case"copy":case"cut":case"paste":U=O0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":U=pf}var B=(i&4)!==0,We=!B&&n==="scroll",k=B?A!==null?A+"Capture":null:A;B=[];for(var E=R,T;E!==null;){T=E;var D=T.stateNode;if(T.tag===5&&D!==null&&(T=D,k!==null&&(D=zi(E,k),D!=null&&B.push(ss(E,D,T)))),We)break;E=E.return}0<B.length&&(A=new U(A,V,null,a,O),L.push({event:A,listeners:B}))}}if((i&7)===0){e:{if(A=n==="mouseover"||n==="pointerover",U=n==="mouseout"||n==="pointerout",A&&a!==Al&&(V=a.relatedTarget||a.fromElement)&&(cr(V)||V[fn]))break e;if((U||A)&&(A=O.window===O?O:(A=O.ownerDocument)?A.defaultView||A.parentWindow:window,U?(V=a.relatedTarget||a.toElement,U=R,V=V?cr(V):null,V!==null&&(We=lr(V),V!==We||V.tag!==5&&V.tag!==6)&&(V=null)):(U=null,V=R),U!==V)){if(B=hf,D="onMouseLeave",k="onMouseEnter",E="mouse",(n==="pointerout"||n==="pointerover")&&(B=pf,D="onPointerLeave",k="onPointerEnter",E="pointer"),We=U==null?A:Xr(U),T=V==null?A:Xr(V),A=new B(D,E+"leave",U,a,O),A.target=We,A.relatedTarget=T,D=null,cr(O)===R&&(B=new B(k,E+"enter",V,a,O),B.target=T,B.relatedTarget=We,D=B),We=D,U&&V)t:{for(B=U,k=V,E=0,T=B;T;T=Qr(T))E++;for(T=0,D=k;D;D=Qr(D))T++;for(;0<E-T;)B=Qr(B),E--;for(;0<T-E;)k=Qr(k),T--;for(;E--;){if(B===k||k!==null&&B===k.alternate)break t;B=Qr(B),k=Qr(k)}B=null}else B=null;U!==null&&$f(L,A,U,B,!1),V!==null&&We!==null&&$f(L,We,V,B,!0)}}e:{if(A=R?Xr(R):window,U=A.nodeName&&A.nodeName.toLowerCase(),U==="select"||U==="input"&&A.type==="file")var W=ew;else if(wf(A))if(Sf)W=iw;else{W=nw;var K=tw}else(U=A.nodeName)&&U.toLowerCase()==="input"&&(A.type==="checkbox"||A.type==="radio")&&(W=rw);if(W&&(W=W(n,R))){xf(L,W,a,O);break e}K&&K(n,A,R),n==="focusout"&&(K=A._wrapperState)&&K.controlled&&A.type==="number"&&Tl(A,"number",A.value)}switch(K=R?Xr(R):window,n){case"focusin":(wf(K)||K.contentEditable==="true")&&(qr=K,nc=R,ns=null);break;case"focusout":ns=nc=qr=null;break;case"mousedown":rc=!0;break;case"contextmenu":case"mouseup":case"dragend":rc=!1,Pf(L,a,O);break;case"selectionchange":if(aw)break;case"keydown":case"keyup":Pf(L,a,O)}var G;if(Xl)e:{switch(n){case"compositionstart":var J="onCompositionStart";break e;case"compositionend":J="onCompositionEnd";break e;case"compositionupdate":J="onCompositionUpdate";break e}J=void 0}else Gr?_f(n,a)&&(J="onCompositionEnd"):n==="keydown"&&a.keyCode===229&&(J="onCompositionStart");J&&(mf&&a.locale!=="ko"&&(Gr||J!=="onCompositionStart"?J==="onCompositionEnd"&&Gr&&(G=uf()):(Ln=O,Kl="value"in Ln?Ln.value:Ln.textContent,Gr=!0)),K=Ao(R,J),0<K.length&&(J=new ff(J,n,null,a,O),L.push({event:J,listeners:K}),G?J.data=G:(G=vf(a),G!==null&&(J.data=G)))),(G=Y0?Q0(n,a):J0(n,a))&&(R=Ao(R,"onBeforeInput"),0<R.length&&(O=new ff("onBeforeInput","beforeinput",null,a,O),L.push({event:O,listeners:R}),O.data=G))}Uf(L,i)})}function ss(n,i,a){return{instance:n,listener:i,currentTarget:a}}function Ao(n,i){for(var a=i+"Capture",c=[];n!==null;){var d=n,f=d.stateNode;d.tag===5&&f!==null&&(d=f,f=zi(n,a),f!=null&&c.unshift(ss(n,f,d)),f=zi(n,i),f!=null&&c.push(ss(n,f,d))),n=n.return}return c}function Qr(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function $f(n,i,a,c,d){for(var f=i._reactName,g=[];a!==null&&a!==c;){var w=a,S=w.alternate,R=w.stateNode;if(S!==null&&S===c)break;w.tag===5&&R!==null&&(w=R,d?(S=zi(a,f),S!=null&&g.unshift(ss(a,S,w))):d||(S=zi(a,f),S!=null&&g.push(ss(a,S,w)))),a=a.return}g.length!==0&&n.push({event:i,listeners:g})}var dw=/\r\n?/g,hw=/\u0000|\uFFFD/g;function Vf(n){return(typeof n=="string"?n:""+n).replace(dw,`
`).replace(hw,"")}function Oo(n,i,a){if(i=Vf(i),Vf(n)!==i&&a)throw Error(t(425))}function Lo(){}var cc=null,uc=null;function dc(n,i){return n==="textarea"||n==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var hc=typeof setTimeout=="function"?setTimeout:void 0,fw=typeof clearTimeout=="function"?clearTimeout:void 0,Bf=typeof Promise=="function"?Promise:void 0,pw=typeof queueMicrotask=="function"?queueMicrotask:typeof Bf<"u"?function(n){return Bf.resolve(null).then(n).catch(mw)}:hc;function mw(n){setTimeout(function(){throw n})}function fc(n,i){var a=i,c=0;do{var d=a.nextSibling;if(n.removeChild(a),d&&d.nodeType===8)if(a=d.data,a==="/$"){if(c===0){n.removeChild(d),Yi(i);return}c--}else a!=="$"&&a!=="$?"&&a!=="$!"||c++;a=d}while(a);Yi(i)}function Mn(n){for(;n!=null;n=n.nextSibling){var i=n.nodeType;if(i===1||i===3)break;if(i===8){if(i=n.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return n}function Wf(n){n=n.previousSibling;for(var i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="$"||a==="$!"||a==="$?"){if(i===0)return n;i--}else a==="/$"&&i++}n=n.previousSibling}return null}var Jr=Math.random().toString(36).slice(2),nn="__reactFiber$"+Jr,os="__reactProps$"+Jr,fn="__reactContainer$"+Jr,pc="__reactEvents$"+Jr,gw="__reactListeners$"+Jr,yw="__reactHandles$"+Jr;function cr(n){var i=n[nn];if(i)return i;for(var a=n.parentNode;a;){if(i=a[fn]||a[nn]){if(a=i.alternate,i.child!==null||a!==null&&a.child!==null)for(n=Wf(n);n!==null;){if(a=n[nn])return a;n=Wf(n)}return i}n=a,a=n.parentNode}return null}function as(n){return n=n[nn]||n[fn],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function Xr(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function Do(n){return n[os]||null}var mc=[],Zr=-1;function jn(n){return{current:n}}function Le(n){0>Zr||(n.current=mc[Zr],mc[Zr]=null,Zr--)}function Re(n,i){Zr++,mc[Zr]=n.current,n.current=i}var Fn={},at=jn(Fn),gt=jn(!1),ur=Fn;function ei(n,i){var a=n.type.contextTypes;if(!a)return Fn;var c=n.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===i)return c.__reactInternalMemoizedMaskedChildContext;var d={},f;for(f in a)d[f]=i[f];return c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=d),d}function yt(n){return n=n.childContextTypes,n!=null}function Mo(){Le(gt),Le(at)}function Hf(n,i,a){if(at.current!==Fn)throw Error(t(168));Re(at,i),Re(gt,a)}function Kf(n,i,a){var c=n.stateNode;if(i=i.childContextTypes,typeof c.getChildContext!="function")return a;c=c.getChildContext();for(var d in c)if(!(d in i))throw Error(t(108,Ne(n)||"Unknown",d));return z({},a,c)}function jo(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||Fn,ur=at.current,Re(at,n),Re(gt,gt.current),!0}function Gf(n,i,a){var c=n.stateNode;if(!c)throw Error(t(169));a?(n=Kf(n,i,ur),c.__reactInternalMemoizedMergedChildContext=n,Le(gt),Le(at),Re(at,n)):Le(gt),Re(gt,a)}var pn=null,Fo=!1,gc=!1;function qf(n){pn===null?pn=[n]:pn.push(n)}function _w(n){Fo=!0,qf(n)}function Un(){if(!gc&&pn!==null){gc=!0;var n=0,i=Se;try{var a=pn;for(Se=1;n<a.length;n++){var c=a[n];do c=c(!0);while(c!==null)}pn=null,Fo=!1}catch(d){throw pn!==null&&(pn=pn.slice(n+1)),Yh(Fl,Un),d}finally{Se=i,gc=!1}}return null}var ti=[],ni=0,Uo=null,zo=0,At=[],Ot=0,dr=null,mn=1,gn="";function hr(n,i){ti[ni++]=zo,ti[ni++]=Uo,Uo=n,zo=i}function Yf(n,i,a){At[Ot++]=mn,At[Ot++]=gn,At[Ot++]=dr,dr=n;var c=mn;n=gn;var d=32-zt(c)-1;c&=~(1<<d),a+=1;var f=32-zt(i)+d;if(30<f){var g=d-d%5;f=(c&(1<<g)-1).toString(32),c>>=g,d-=g,mn=1<<32-zt(i)+d|a<<d|c,gn=f+n}else mn=1<<f|a<<d|c,gn=n}function yc(n){n.return!==null&&(hr(n,1),Yf(n,1,0))}function _c(n){for(;n===Uo;)Uo=ti[--ni],ti[ni]=null,zo=ti[--ni],ti[ni]=null;for(;n===dr;)dr=At[--Ot],At[Ot]=null,gn=At[--Ot],At[Ot]=null,mn=At[--Ot],At[Ot]=null}var Tt=null,Nt=null,je=!1,Vt=null;function Qf(n,i){var a=jt(5,null,null,0);a.elementType="DELETED",a.stateNode=i,a.return=n,i=n.deletions,i===null?(n.deletions=[a],n.flags|=16):i.push(a)}function Jf(n,i){switch(n.tag){case 5:var a=n.type;return i=i.nodeType!==1||a.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(n.stateNode=i,Tt=n,Nt=Mn(i.firstChild),!0):!1;case 6:return i=n.pendingProps===""||i.nodeType!==3?null:i,i!==null?(n.stateNode=i,Tt=n,Nt=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(a=dr!==null?{id:mn,overflow:gn}:null,n.memoizedState={dehydrated:i,treeContext:a,retryLane:1073741824},a=jt(18,null,null,0),a.stateNode=i,a.return=n,n.child=a,Tt=n,Nt=null,!0):!1;default:return!1}}function vc(n){return(n.mode&1)!==0&&(n.flags&128)===0}function wc(n){if(je){var i=Nt;if(i){var a=i;if(!Jf(n,i)){if(vc(n))throw Error(t(418));i=Mn(a.nextSibling);var c=Tt;i&&Jf(n,i)?Qf(c,a):(n.flags=n.flags&-4097|2,je=!1,Tt=n)}}else{if(vc(n))throw Error(t(418));n.flags=n.flags&-4097|2,je=!1,Tt=n}}}function Xf(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;Tt=n}function $o(n){if(n!==Tt)return!1;if(!je)return Xf(n),je=!0,!1;var i;if((i=n.tag!==3)&&!(i=n.tag!==5)&&(i=n.type,i=i!=="head"&&i!=="body"&&!dc(n.type,n.memoizedProps)),i&&(i=Nt)){if(vc(n))throw Zf(),Error(t(418));for(;i;)Qf(n,i),i=Mn(i.nextSibling)}if(Xf(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="/$"){if(i===0){Nt=Mn(n.nextSibling);break e}i--}else a!=="$"&&a!=="$!"&&a!=="$?"||i++}n=n.nextSibling}Nt=null}}else Nt=Tt?Mn(n.stateNode.nextSibling):null;return!0}function Zf(){for(var n=Nt;n;)n=Mn(n.nextSibling)}function ri(){Nt=Tt=null,je=!1}function xc(n){Vt===null?Vt=[n]:Vt.push(n)}var vw=ne.ReactCurrentBatchConfig;function ls(n,i,a){if(n=a.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(a._owner){if(a=a._owner,a){if(a.tag!==1)throw Error(t(309));var c=a.stateNode}if(!c)throw Error(t(147,n));var d=c,f=""+n;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===f?i.ref:(i=function(g){var w=d.refs;g===null?delete w[f]:w[f]=g},i._stringRef=f,i)}if(typeof n!="string")throw Error(t(284));if(!a._owner)throw Error(t(290,n))}return n}function Vo(n,i){throw n=Object.prototype.toString.call(i),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":n))}function ep(n){var i=n._init;return i(n._payload)}function tp(n){function i(k,E){if(n){var T=k.deletions;T===null?(k.deletions=[E],k.flags|=16):T.push(E)}}function a(k,E){if(!n)return null;for(;E!==null;)i(k,E),E=E.sibling;return null}function c(k,E){for(k=new Map;E!==null;)E.key!==null?k.set(E.key,E):k.set(E.index,E),E=E.sibling;return k}function d(k,E){return k=Gn(k,E),k.index=0,k.sibling=null,k}function f(k,E,T){return k.index=T,n?(T=k.alternate,T!==null?(T=T.index,T<E?(k.flags|=2,E):T):(k.flags|=2,E)):(k.flags|=1048576,E)}function g(k){return n&&k.alternate===null&&(k.flags|=2),k}function w(k,E,T,D){return E===null||E.tag!==6?(E=hu(T,k.mode,D),E.return=k,E):(E=d(E,T),E.return=k,E)}function S(k,E,T,D){var W=T.type;return W===Te?O(k,E,T.props.children,D,T.key):E!==null&&(E.elementType===W||typeof W=="object"&&W!==null&&W.$$typeof===ue&&ep(W)===E.type)?(D=d(E,T.props),D.ref=ls(k,E,T),D.return=k,D):(D=ha(T.type,T.key,T.props,null,k.mode,D),D.ref=ls(k,E,T),D.return=k,D)}function R(k,E,T,D){return E===null||E.tag!==4||E.stateNode.containerInfo!==T.containerInfo||E.stateNode.implementation!==T.implementation?(E=fu(T,k.mode,D),E.return=k,E):(E=d(E,T.children||[]),E.return=k,E)}function O(k,E,T,D,W){return E===null||E.tag!==7?(E=wr(T,k.mode,D,W),E.return=k,E):(E=d(E,T),E.return=k,E)}function L(k,E,T){if(typeof E=="string"&&E!==""||typeof E=="number")return E=hu(""+E,k.mode,T),E.return=k,E;if(typeof E=="object"&&E!==null){switch(E.$$typeof){case Ie:return T=ha(E.type,E.key,E.props,null,k.mode,T),T.ref=ls(k,null,E),T.return=k,T;case De:return E=fu(E,k.mode,T),E.return=k,E;case ue:var D=E._init;return L(k,D(E._payload),T)}if(ji(E)||H(E))return E=wr(E,k.mode,T,null),E.return=k,E;Vo(k,E)}return null}function A(k,E,T,D){var W=E!==null?E.key:null;if(typeof T=="string"&&T!==""||typeof T=="number")return W!==null?null:w(k,E,""+T,D);if(typeof T=="object"&&T!==null){switch(T.$$typeof){case Ie:return T.key===W?S(k,E,T,D):null;case De:return T.key===W?R(k,E,T,D):null;case ue:return W=T._init,A(k,E,W(T._payload),D)}if(ji(T)||H(T))return W!==null?null:O(k,E,T,D,null);Vo(k,T)}return null}function U(k,E,T,D,W){if(typeof D=="string"&&D!==""||typeof D=="number")return k=k.get(T)||null,w(E,k,""+D,W);if(typeof D=="object"&&D!==null){switch(D.$$typeof){case Ie:return k=k.get(D.key===null?T:D.key)||null,S(E,k,D,W);case De:return k=k.get(D.key===null?T:D.key)||null,R(E,k,D,W);case ue:var K=D._init;return U(k,E,T,K(D._payload),W)}if(ji(D)||H(D))return k=k.get(T)||null,O(E,k,D,W,null);Vo(E,D)}return null}function V(k,E,T,D){for(var W=null,K=null,G=E,J=E=0,Je=null;G!==null&&J<T.length;J++){G.index>J?(Je=G,G=null):Je=G.sibling;var ye=A(k,G,T[J],D);if(ye===null){G===null&&(G=Je);break}n&&G&&ye.alternate===null&&i(k,G),E=f(ye,E,J),K===null?W=ye:K.sibling=ye,K=ye,G=Je}if(J===T.length)return a(k,G),je&&hr(k,J),W;if(G===null){for(;J<T.length;J++)G=L(k,T[J],D),G!==null&&(E=f(G,E,J),K===null?W=G:K.sibling=G,K=G);return je&&hr(k,J),W}for(G=c(k,G);J<T.length;J++)Je=U(G,k,J,T[J],D),Je!==null&&(n&&Je.alternate!==null&&G.delete(Je.key===null?J:Je.key),E=f(Je,E,J),K===null?W=Je:K.sibling=Je,K=Je);return n&&G.forEach(function(qn){return i(k,qn)}),je&&hr(k,J),W}function B(k,E,T,D){var W=H(T);if(typeof W!="function")throw Error(t(150));if(T=W.call(T),T==null)throw Error(t(151));for(var K=W=null,G=E,J=E=0,Je=null,ye=T.next();G!==null&&!ye.done;J++,ye=T.next()){G.index>J?(Je=G,G=null):Je=G.sibling;var qn=A(k,G,ye.value,D);if(qn===null){G===null&&(G=Je);break}n&&G&&qn.alternate===null&&i(k,G),E=f(qn,E,J),K===null?W=qn:K.sibling=qn,K=qn,G=Je}if(ye.done)return a(k,G),je&&hr(k,J),W;if(G===null){for(;!ye.done;J++,ye=T.next())ye=L(k,ye.value,D),ye!==null&&(E=f(ye,E,J),K===null?W=ye:K.sibling=ye,K=ye);return je&&hr(k,J),W}for(G=c(k,G);!ye.done;J++,ye=T.next())ye=U(G,k,J,ye.value,D),ye!==null&&(n&&ye.alternate!==null&&G.delete(ye.key===null?J:ye.key),E=f(ye,E,J),K===null?W=ye:K.sibling=ye,K=ye);return n&&G.forEach(function(Xw){return i(k,Xw)}),je&&hr(k,J),W}function We(k,E,T,D){if(typeof T=="object"&&T!==null&&T.type===Te&&T.key===null&&(T=T.props.children),typeof T=="object"&&T!==null){switch(T.$$typeof){case Ie:e:{for(var W=T.key,K=E;K!==null;){if(K.key===W){if(W=T.type,W===Te){if(K.tag===7){a(k,K.sibling),E=d(K,T.props.children),E.return=k,k=E;break e}}else if(K.elementType===W||typeof W=="object"&&W!==null&&W.$$typeof===ue&&ep(W)===K.type){a(k,K.sibling),E=d(K,T.props),E.ref=ls(k,K,T),E.return=k,k=E;break e}a(k,K);break}else i(k,K);K=K.sibling}T.type===Te?(E=wr(T.props.children,k.mode,D,T.key),E.return=k,k=E):(D=ha(T.type,T.key,T.props,null,k.mode,D),D.ref=ls(k,E,T),D.return=k,k=D)}return g(k);case De:e:{for(K=T.key;E!==null;){if(E.key===K)if(E.tag===4&&E.stateNode.containerInfo===T.containerInfo&&E.stateNode.implementation===T.implementation){a(k,E.sibling),E=d(E,T.children||[]),E.return=k,k=E;break e}else{a(k,E);break}else i(k,E);E=E.sibling}E=fu(T,k.mode,D),E.return=k,k=E}return g(k);case ue:return K=T._init,We(k,E,K(T._payload),D)}if(ji(T))return V(k,E,T,D);if(H(T))return B(k,E,T,D);Vo(k,T)}return typeof T=="string"&&T!==""||typeof T=="number"?(T=""+T,E!==null&&E.tag===6?(a(k,E.sibling),E=d(E,T),E.return=k,k=E):(a(k,E),E=hu(T,k.mode,D),E.return=k,k=E),g(k)):a(k,E)}return We}var ii=tp(!0),np=tp(!1),Bo=jn(null),Wo=null,si=null,Sc=null;function Ec(){Sc=si=Wo=null}function Cc(n){var i=Bo.current;Le(Bo),n._currentValue=i}function kc(n,i,a){for(;n!==null;){var c=n.alternate;if((n.childLanes&i)!==i?(n.childLanes|=i,c!==null&&(c.childLanes|=i)):c!==null&&(c.childLanes&i)!==i&&(c.childLanes|=i),n===a)break;n=n.return}}function oi(n,i){Wo=n,Sc=si=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&i)!==0&&(_t=!0),n.firstContext=null)}function Lt(n){var i=n._currentValue;if(Sc!==n)if(n={context:n,memoizedValue:i,next:null},si===null){if(Wo===null)throw Error(t(308));si=n,Wo.dependencies={lanes:0,firstContext:n}}else si=si.next=n;return i}var fr=null;function Ic(n){fr===null?fr=[n]:fr.push(n)}function rp(n,i,a,c){var d=i.interleaved;return d===null?(a.next=a,Ic(i)):(a.next=d.next,d.next=a),i.interleaved=a,yn(n,c)}function yn(n,i){n.lanes|=i;var a=n.alternate;for(a!==null&&(a.lanes|=i),a=n,n=n.return;n!==null;)n.childLanes|=i,a=n.alternate,a!==null&&(a.childLanes|=i),a=n,n=n.return;return a.tag===3?a.stateNode:null}var zn=!1;function Tc(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ip(n,i){n=n.updateQueue,i.updateQueue===n&&(i.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function _n(n,i){return{eventTime:n,lane:i,tag:0,payload:null,callback:null,next:null}}function $n(n,i,a){var c=n.updateQueue;if(c===null)return null;if(c=c.shared,(pe&2)!==0){var d=c.pending;return d===null?i.next=i:(i.next=d.next,d.next=i),c.pending=i,yn(n,a)}return d=c.interleaved,d===null?(i.next=i,Ic(c)):(i.next=d.next,d.next=i),c.interleaved=i,yn(n,a)}function Ho(n,i,a){if(i=i.updateQueue,i!==null&&(i=i.shared,(a&4194240)!==0)){var c=i.lanes;c&=n.pendingLanes,a|=c,i.lanes=a,$l(n,a)}}function sp(n,i){var a=n.updateQueue,c=n.alternate;if(c!==null&&(c=c.updateQueue,a===c)){var d=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var g={eventTime:a.eventTime,lane:a.lane,tag:a.tag,payload:a.payload,callback:a.callback,next:null};f===null?d=f=g:f=f.next=g,a=a.next}while(a!==null);f===null?d=f=i:f=f.next=i}else d=f=i;a={baseState:c.baseState,firstBaseUpdate:d,lastBaseUpdate:f,shared:c.shared,effects:c.effects},n.updateQueue=a;return}n=a.lastBaseUpdate,n===null?a.firstBaseUpdate=i:n.next=i,a.lastBaseUpdate=i}function Ko(n,i,a,c){var d=n.updateQueue;zn=!1;var f=d.firstBaseUpdate,g=d.lastBaseUpdate,w=d.shared.pending;if(w!==null){d.shared.pending=null;var S=w,R=S.next;S.next=null,g===null?f=R:g.next=R,g=S;var O=n.alternate;O!==null&&(O=O.updateQueue,w=O.lastBaseUpdate,w!==g&&(w===null?O.firstBaseUpdate=R:w.next=R,O.lastBaseUpdate=S))}if(f!==null){var L=d.baseState;g=0,O=R=S=null,w=f;do{var A=w.lane,U=w.eventTime;if((c&A)===A){O!==null&&(O=O.next={eventTime:U,lane:0,tag:w.tag,payload:w.payload,callback:w.callback,next:null});e:{var V=n,B=w;switch(A=i,U=a,B.tag){case 1:if(V=B.payload,typeof V=="function"){L=V.call(U,L,A);break e}L=V;break e;case 3:V.flags=V.flags&-65537|128;case 0:if(V=B.payload,A=typeof V=="function"?V.call(U,L,A):V,A==null)break e;L=z({},L,A);break e;case 2:zn=!0}}w.callback!==null&&w.lane!==0&&(n.flags|=64,A=d.effects,A===null?d.effects=[w]:A.push(w))}else U={eventTime:U,lane:A,tag:w.tag,payload:w.payload,callback:w.callback,next:null},O===null?(R=O=U,S=L):O=O.next=U,g|=A;if(w=w.next,w===null){if(w=d.shared.pending,w===null)break;A=w,w=A.next,A.next=null,d.lastBaseUpdate=A,d.shared.pending=null}}while(!0);if(O===null&&(S=L),d.baseState=S,d.firstBaseUpdate=R,d.lastBaseUpdate=O,i=d.shared.interleaved,i!==null){d=i;do g|=d.lane,d=d.next;while(d!==i)}else f===null&&(d.shared.lanes=0);gr|=g,n.lanes=g,n.memoizedState=L}}function op(n,i,a){if(n=i.effects,i.effects=null,n!==null)for(i=0;i<n.length;i++){var c=n[i],d=c.callback;if(d!==null){if(c.callback=null,c=a,typeof d!="function")throw Error(t(191,d));d.call(c)}}}var cs={},rn=jn(cs),us=jn(cs),ds=jn(cs);function pr(n){if(n===cs)throw Error(t(174));return n}function Nc(n,i){switch(Re(ds,i),Re(us,n),Re(rn,cs),n=i.nodeType,n){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:Rl(null,"");break;default:n=n===8?i.parentNode:i,i=n.namespaceURI||null,n=n.tagName,i=Rl(i,n)}Le(rn),Re(rn,i)}function ai(){Le(rn),Le(us),Le(ds)}function ap(n){pr(ds.current);var i=pr(rn.current),a=Rl(i,n.type);i!==a&&(Re(us,n),Re(rn,a))}function Rc(n){us.current===n&&(Le(rn),Le(us))}var Fe=jn(0);function Go(n){for(var i=n;i!==null;){if(i.tag===13){var a=i.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var Pc=[];function bc(){for(var n=0;n<Pc.length;n++)Pc[n]._workInProgressVersionPrimary=null;Pc.length=0}var qo=ne.ReactCurrentDispatcher,Ac=ne.ReactCurrentBatchConfig,mr=0,Ue=null,Ge=null,Ye=null,Yo=!1,hs=!1,fs=0,ww=0;function lt(){throw Error(t(321))}function Oc(n,i){if(i===null)return!1;for(var a=0;a<i.length&&a<n.length;a++)if(!$t(n[a],i[a]))return!1;return!0}function Lc(n,i,a,c,d,f){if(mr=f,Ue=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,qo.current=n===null||n.memoizedState===null?Cw:kw,n=a(c,d),hs){f=0;do{if(hs=!1,fs=0,25<=f)throw Error(t(301));f+=1,Ye=Ge=null,i.updateQueue=null,qo.current=Iw,n=a(c,d)}while(hs)}if(qo.current=Xo,i=Ge!==null&&Ge.next!==null,mr=0,Ye=Ge=Ue=null,Yo=!1,i)throw Error(t(300));return n}function Dc(){var n=fs!==0;return fs=0,n}function sn(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ye===null?Ue.memoizedState=Ye=n:Ye=Ye.next=n,Ye}function Dt(){if(Ge===null){var n=Ue.alternate;n=n!==null?n.memoizedState:null}else n=Ge.next;var i=Ye===null?Ue.memoizedState:Ye.next;if(i!==null)Ye=i,Ge=n;else{if(n===null)throw Error(t(310));Ge=n,n={memoizedState:Ge.memoizedState,baseState:Ge.baseState,baseQueue:Ge.baseQueue,queue:Ge.queue,next:null},Ye===null?Ue.memoizedState=Ye=n:Ye=Ye.next=n}return Ye}function ps(n,i){return typeof i=="function"?i(n):i}function Mc(n){var i=Dt(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=Ge,d=c.baseQueue,f=a.pending;if(f!==null){if(d!==null){var g=d.next;d.next=f.next,f.next=g}c.baseQueue=d=f,a.pending=null}if(d!==null){f=d.next,c=c.baseState;var w=g=null,S=null,R=f;do{var O=R.lane;if((mr&O)===O)S!==null&&(S=S.next={lane:0,action:R.action,hasEagerState:R.hasEagerState,eagerState:R.eagerState,next:null}),c=R.hasEagerState?R.eagerState:n(c,R.action);else{var L={lane:O,action:R.action,hasEagerState:R.hasEagerState,eagerState:R.eagerState,next:null};S===null?(w=S=L,g=c):S=S.next=L,Ue.lanes|=O,gr|=O}R=R.next}while(R!==null&&R!==f);S===null?g=c:S.next=w,$t(c,i.memoizedState)||(_t=!0),i.memoizedState=c,i.baseState=g,i.baseQueue=S,a.lastRenderedState=c}if(n=a.interleaved,n!==null){d=n;do f=d.lane,Ue.lanes|=f,gr|=f,d=d.next;while(d!==n)}else d===null&&(a.lanes=0);return[i.memoizedState,a.dispatch]}function jc(n){var i=Dt(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=a.dispatch,d=a.pending,f=i.memoizedState;if(d!==null){a.pending=null;var g=d=d.next;do f=n(f,g.action),g=g.next;while(g!==d);$t(f,i.memoizedState)||(_t=!0),i.memoizedState=f,i.baseQueue===null&&(i.baseState=f),a.lastRenderedState=f}return[f,c]}function lp(){}function cp(n,i){var a=Ue,c=Dt(),d=i(),f=!$t(c.memoizedState,d);if(f&&(c.memoizedState=d,_t=!0),c=c.queue,Fc(hp.bind(null,a,c,n),[n]),c.getSnapshot!==i||f||Ye!==null&&Ye.memoizedState.tag&1){if(a.flags|=2048,ms(9,dp.bind(null,a,c,d,i),void 0,null),Qe===null)throw Error(t(349));(mr&30)!==0||up(a,i,d)}return d}function up(n,i,a){n.flags|=16384,n={getSnapshot:i,value:a},i=Ue.updateQueue,i===null?(i={lastEffect:null,stores:null},Ue.updateQueue=i,i.stores=[n]):(a=i.stores,a===null?i.stores=[n]:a.push(n))}function dp(n,i,a,c){i.value=a,i.getSnapshot=c,fp(i)&&pp(n)}function hp(n,i,a){return a(function(){fp(i)&&pp(n)})}function fp(n){var i=n.getSnapshot;n=n.value;try{var a=i();return!$t(n,a)}catch{return!0}}function pp(n){var i=yn(n,1);i!==null&&Kt(i,n,1,-1)}function mp(n){var i=sn();return typeof n=="function"&&(n=n()),i.memoizedState=i.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ps,lastRenderedState:n},i.queue=n,n=n.dispatch=Ew.bind(null,Ue,n),[i.memoizedState,n]}function ms(n,i,a,c){return n={tag:n,create:i,destroy:a,deps:c,next:null},i=Ue.updateQueue,i===null?(i={lastEffect:null,stores:null},Ue.updateQueue=i,i.lastEffect=n.next=n):(a=i.lastEffect,a===null?i.lastEffect=n.next=n:(c=a.next,a.next=n,n.next=c,i.lastEffect=n)),n}function gp(){return Dt().memoizedState}function Qo(n,i,a,c){var d=sn();Ue.flags|=n,d.memoizedState=ms(1|i,a,void 0,c===void 0?null:c)}function Jo(n,i,a,c){var d=Dt();c=c===void 0?null:c;var f=void 0;if(Ge!==null){var g=Ge.memoizedState;if(f=g.destroy,c!==null&&Oc(c,g.deps)){d.memoizedState=ms(i,a,f,c);return}}Ue.flags|=n,d.memoizedState=ms(1|i,a,f,c)}function yp(n,i){return Qo(8390656,8,n,i)}function Fc(n,i){return Jo(2048,8,n,i)}function _p(n,i){return Jo(4,2,n,i)}function vp(n,i){return Jo(4,4,n,i)}function wp(n,i){if(typeof i=="function")return n=n(),i(n),function(){i(null)};if(i!=null)return n=n(),i.current=n,function(){i.current=null}}function xp(n,i,a){return a=a!=null?a.concat([n]):null,Jo(4,4,wp.bind(null,i,n),a)}function Uc(){}function Sp(n,i){var a=Dt();i=i===void 0?null:i;var c=a.memoizedState;return c!==null&&i!==null&&Oc(i,c[1])?c[0]:(a.memoizedState=[n,i],n)}function Ep(n,i){var a=Dt();i=i===void 0?null:i;var c=a.memoizedState;return c!==null&&i!==null&&Oc(i,c[1])?c[0]:(n=n(),a.memoizedState=[n,i],n)}function Cp(n,i,a){return(mr&21)===0?(n.baseState&&(n.baseState=!1,_t=!0),n.memoizedState=a):($t(a,i)||(a=Zh(),Ue.lanes|=a,gr|=a,n.baseState=!0),i)}function xw(n,i){var a=Se;Se=a!==0&&4>a?a:4,n(!0);var c=Ac.transition;Ac.transition={};try{n(!1),i()}finally{Se=a,Ac.transition=c}}function kp(){return Dt().memoizedState}function Sw(n,i,a){var c=Hn(n);if(a={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null},Ip(n))Tp(i,a);else if(a=rp(n,i,a,c),a!==null){var d=ht();Kt(a,n,c,d),Np(a,i,c)}}function Ew(n,i,a){var c=Hn(n),d={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null};if(Ip(n))Tp(i,d);else{var f=n.alternate;if(n.lanes===0&&(f===null||f.lanes===0)&&(f=i.lastRenderedReducer,f!==null))try{var g=i.lastRenderedState,w=f(g,a);if(d.hasEagerState=!0,d.eagerState=w,$t(w,g)){var S=i.interleaved;S===null?(d.next=d,Ic(i)):(d.next=S.next,S.next=d),i.interleaved=d;return}}catch{}finally{}a=rp(n,i,d,c),a!==null&&(d=ht(),Kt(a,n,c,d),Np(a,i,c))}}function Ip(n){var i=n.alternate;return n===Ue||i!==null&&i===Ue}function Tp(n,i){hs=Yo=!0;var a=n.pending;a===null?i.next=i:(i.next=a.next,a.next=i),n.pending=i}function Np(n,i,a){if((a&4194240)!==0){var c=i.lanes;c&=n.pendingLanes,a|=c,i.lanes=a,$l(n,a)}}var Xo={readContext:Lt,useCallback:lt,useContext:lt,useEffect:lt,useImperativeHandle:lt,useInsertionEffect:lt,useLayoutEffect:lt,useMemo:lt,useReducer:lt,useRef:lt,useState:lt,useDebugValue:lt,useDeferredValue:lt,useTransition:lt,useMutableSource:lt,useSyncExternalStore:lt,useId:lt,unstable_isNewReconciler:!1},Cw={readContext:Lt,useCallback:function(n,i){return sn().memoizedState=[n,i===void 0?null:i],n},useContext:Lt,useEffect:yp,useImperativeHandle:function(n,i,a){return a=a!=null?a.concat([n]):null,Qo(4194308,4,wp.bind(null,i,n),a)},useLayoutEffect:function(n,i){return Qo(4194308,4,n,i)},useInsertionEffect:function(n,i){return Qo(4,2,n,i)},useMemo:function(n,i){var a=sn();return i=i===void 0?null:i,n=n(),a.memoizedState=[n,i],n},useReducer:function(n,i,a){var c=sn();return i=a!==void 0?a(i):i,c.memoizedState=c.baseState=i,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:i},c.queue=n,n=n.dispatch=Sw.bind(null,Ue,n),[c.memoizedState,n]},useRef:function(n){var i=sn();return n={current:n},i.memoizedState=n},useState:mp,useDebugValue:Uc,useDeferredValue:function(n){return sn().memoizedState=n},useTransition:function(){var n=mp(!1),i=n[0];return n=xw.bind(null,n[1]),sn().memoizedState=n,[i,n]},useMutableSource:function(){},useSyncExternalStore:function(n,i,a){var c=Ue,d=sn();if(je){if(a===void 0)throw Error(t(407));a=a()}else{if(a=i(),Qe===null)throw Error(t(349));(mr&30)!==0||up(c,i,a)}d.memoizedState=a;var f={value:a,getSnapshot:i};return d.queue=f,yp(hp.bind(null,c,f,n),[n]),c.flags|=2048,ms(9,dp.bind(null,c,f,a,i),void 0,null),a},useId:function(){var n=sn(),i=Qe.identifierPrefix;if(je){var a=gn,c=mn;a=(c&~(1<<32-zt(c)-1)).toString(32)+a,i=":"+i+"R"+a,a=fs++,0<a&&(i+="H"+a.toString(32)),i+=":"}else a=ww++,i=":"+i+"r"+a.toString(32)+":";return n.memoizedState=i},unstable_isNewReconciler:!1},kw={readContext:Lt,useCallback:Sp,useContext:Lt,useEffect:Fc,useImperativeHandle:xp,useInsertionEffect:_p,useLayoutEffect:vp,useMemo:Ep,useReducer:Mc,useRef:gp,useState:function(){return Mc(ps)},useDebugValue:Uc,useDeferredValue:function(n){var i=Dt();return Cp(i,Ge.memoizedState,n)},useTransition:function(){var n=Mc(ps)[0],i=Dt().memoizedState;return[n,i]},useMutableSource:lp,useSyncExternalStore:cp,useId:kp,unstable_isNewReconciler:!1},Iw={readContext:Lt,useCallback:Sp,useContext:Lt,useEffect:Fc,useImperativeHandle:xp,useInsertionEffect:_p,useLayoutEffect:vp,useMemo:Ep,useReducer:jc,useRef:gp,useState:function(){return jc(ps)},useDebugValue:Uc,useDeferredValue:function(n){var i=Dt();return Ge===null?i.memoizedState=n:Cp(i,Ge.memoizedState,n)},useTransition:function(){var n=jc(ps)[0],i=Dt().memoizedState;return[n,i]},useMutableSource:lp,useSyncExternalStore:cp,useId:kp,unstable_isNewReconciler:!1};function Bt(n,i){if(n&&n.defaultProps){i=z({},i),n=n.defaultProps;for(var a in n)i[a]===void 0&&(i[a]=n[a]);return i}return i}function zc(n,i,a,c){i=n.memoizedState,a=a(c,i),a=a==null?i:z({},i,a),n.memoizedState=a,n.lanes===0&&(n.updateQueue.baseState=a)}var Zo={isMounted:function(n){return(n=n._reactInternals)?lr(n)===n:!1},enqueueSetState:function(n,i,a){n=n._reactInternals;var c=ht(),d=Hn(n),f=_n(c,d);f.payload=i,a!=null&&(f.callback=a),i=$n(n,f,d),i!==null&&(Kt(i,n,d,c),Ho(i,n,d))},enqueueReplaceState:function(n,i,a){n=n._reactInternals;var c=ht(),d=Hn(n),f=_n(c,d);f.tag=1,f.payload=i,a!=null&&(f.callback=a),i=$n(n,f,d),i!==null&&(Kt(i,n,d,c),Ho(i,n,d))},enqueueForceUpdate:function(n,i){n=n._reactInternals;var a=ht(),c=Hn(n),d=_n(a,c);d.tag=2,i!=null&&(d.callback=i),i=$n(n,d,c),i!==null&&(Kt(i,n,c,a),Ho(i,n,c))}};function Rp(n,i,a,c,d,f,g){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(c,f,g):i.prototype&&i.prototype.isPureReactComponent?!ts(a,c)||!ts(d,f):!0}function Pp(n,i,a){var c=!1,d=Fn,f=i.contextType;return typeof f=="object"&&f!==null?f=Lt(f):(d=yt(i)?ur:at.current,c=i.contextTypes,f=(c=c!=null)?ei(n,d):Fn),i=new i(a,f),n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Zo,n.stateNode=i,i._reactInternals=n,c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=d,n.__reactInternalMemoizedMaskedChildContext=f),i}function bp(n,i,a,c){n=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(a,c),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(a,c),i.state!==n&&Zo.enqueueReplaceState(i,i.state,null)}function $c(n,i,a,c){var d=n.stateNode;d.props=a,d.state=n.memoizedState,d.refs={},Tc(n);var f=i.contextType;typeof f=="object"&&f!==null?d.context=Lt(f):(f=yt(i)?ur:at.current,d.context=ei(n,f)),d.state=n.memoizedState,f=i.getDerivedStateFromProps,typeof f=="function"&&(zc(n,i,f,a),d.state=n.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(i=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),i!==d.state&&Zo.enqueueReplaceState(d,d.state,null),Ko(n,a,d,c),d.state=n.memoizedState),typeof d.componentDidMount=="function"&&(n.flags|=4194308)}function li(n,i){try{var a="",c=i;do a+=de(c),c=c.return;while(c);var d=a}catch(f){d=`
Error generating stack: `+f.message+`
`+f.stack}return{value:n,source:i,stack:d,digest:null}}function Vc(n,i,a){return{value:n,source:null,stack:a??null,digest:i??null}}function Bc(n,i){try{console.error(i.value)}catch(a){setTimeout(function(){throw a})}}var Tw=typeof WeakMap=="function"?WeakMap:Map;function Ap(n,i,a){a=_n(-1,a),a.tag=3,a.payload={element:null};var c=i.value;return a.callback=function(){oa||(oa=!0,iu=c),Bc(n,i)},a}function Op(n,i,a){a=_n(-1,a),a.tag=3;var c=n.type.getDerivedStateFromError;if(typeof c=="function"){var d=i.value;a.payload=function(){return c(d)},a.callback=function(){Bc(n,i)}}var f=n.stateNode;return f!==null&&typeof f.componentDidCatch=="function"&&(a.callback=function(){Bc(n,i),typeof c!="function"&&(Bn===null?Bn=new Set([this]):Bn.add(this));var g=i.stack;this.componentDidCatch(i.value,{componentStack:g!==null?g:""})}),a}function Lp(n,i,a){var c=n.pingCache;if(c===null){c=n.pingCache=new Tw;var d=new Set;c.set(i,d)}else d=c.get(i),d===void 0&&(d=new Set,c.set(i,d));d.has(a)||(d.add(a),n=$w.bind(null,n,i,a),i.then(n,n))}function Dp(n){do{var i;if((i=n.tag===13)&&(i=n.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return n;n=n.return}while(n!==null);return null}function Mp(n,i,a,c,d){return(n.mode&1)===0?(n===i?n.flags|=65536:(n.flags|=128,a.flags|=131072,a.flags&=-52805,a.tag===1&&(a.alternate===null?a.tag=17:(i=_n(-1,1),i.tag=2,$n(a,i,1))),a.lanes|=1),n):(n.flags|=65536,n.lanes=d,n)}var Nw=ne.ReactCurrentOwner,_t=!1;function dt(n,i,a,c){i.child=n===null?np(i,null,a,c):ii(i,n.child,a,c)}function jp(n,i,a,c,d){a=a.render;var f=i.ref;return oi(i,d),c=Lc(n,i,a,c,f,d),a=Dc(),n!==null&&!_t?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~d,vn(n,i,d)):(je&&a&&yc(i),i.flags|=1,dt(n,i,c,d),i.child)}function Fp(n,i,a,c,d){if(n===null){var f=a.type;return typeof f=="function"&&!du(f)&&f.defaultProps===void 0&&a.compare===null&&a.defaultProps===void 0?(i.tag=15,i.type=f,Up(n,i,f,c,d)):(n=ha(a.type,null,c,i,i.mode,d),n.ref=i.ref,n.return=i,i.child=n)}if(f=n.child,(n.lanes&d)===0){var g=f.memoizedProps;if(a=a.compare,a=a!==null?a:ts,a(g,c)&&n.ref===i.ref)return vn(n,i,d)}return i.flags|=1,n=Gn(f,c),n.ref=i.ref,n.return=i,i.child=n}function Up(n,i,a,c,d){if(n!==null){var f=n.memoizedProps;if(ts(f,c)&&n.ref===i.ref)if(_t=!1,i.pendingProps=c=f,(n.lanes&d)!==0)(n.flags&131072)!==0&&(_t=!0);else return i.lanes=n.lanes,vn(n,i,d)}return Wc(n,i,a,c,d)}function zp(n,i,a){var c=i.pendingProps,d=c.children,f=n!==null?n.memoizedState:null;if(c.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},Re(ui,Rt),Rt|=a;else{if((a&1073741824)===0)return n=f!==null?f.baseLanes|a:a,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:n,cachePool:null,transitions:null},i.updateQueue=null,Re(ui,Rt),Rt|=n,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=f!==null?f.baseLanes:a,Re(ui,Rt),Rt|=c}else f!==null?(c=f.baseLanes|a,i.memoizedState=null):c=a,Re(ui,Rt),Rt|=c;return dt(n,i,d,a),i.child}function $p(n,i){var a=i.ref;(n===null&&a!==null||n!==null&&n.ref!==a)&&(i.flags|=512,i.flags|=2097152)}function Wc(n,i,a,c,d){var f=yt(a)?ur:at.current;return f=ei(i,f),oi(i,d),a=Lc(n,i,a,c,f,d),c=Dc(),n!==null&&!_t?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~d,vn(n,i,d)):(je&&c&&yc(i),i.flags|=1,dt(n,i,a,d),i.child)}function Vp(n,i,a,c,d){if(yt(a)){var f=!0;jo(i)}else f=!1;if(oi(i,d),i.stateNode===null)ta(n,i),Pp(i,a,c),$c(i,a,c,d),c=!0;else if(n===null){var g=i.stateNode,w=i.memoizedProps;g.props=w;var S=g.context,R=a.contextType;typeof R=="object"&&R!==null?R=Lt(R):(R=yt(a)?ur:at.current,R=ei(i,R));var O=a.getDerivedStateFromProps,L=typeof O=="function"||typeof g.getSnapshotBeforeUpdate=="function";L||typeof g.UNSAFE_componentWillReceiveProps!="function"&&typeof g.componentWillReceiveProps!="function"||(w!==c||S!==R)&&bp(i,g,c,R),zn=!1;var A=i.memoizedState;g.state=A,Ko(i,c,g,d),S=i.memoizedState,w!==c||A!==S||gt.current||zn?(typeof O=="function"&&(zc(i,a,O,c),S=i.memoizedState),(w=zn||Rp(i,a,w,c,A,S,R))?(L||typeof g.UNSAFE_componentWillMount!="function"&&typeof g.componentWillMount!="function"||(typeof g.componentWillMount=="function"&&g.componentWillMount(),typeof g.UNSAFE_componentWillMount=="function"&&g.UNSAFE_componentWillMount()),typeof g.componentDidMount=="function"&&(i.flags|=4194308)):(typeof g.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=c,i.memoizedState=S),g.props=c,g.state=S,g.context=R,c=w):(typeof g.componentDidMount=="function"&&(i.flags|=4194308),c=!1)}else{g=i.stateNode,ip(n,i),w=i.memoizedProps,R=i.type===i.elementType?w:Bt(i.type,w),g.props=R,L=i.pendingProps,A=g.context,S=a.contextType,typeof S=="object"&&S!==null?S=Lt(S):(S=yt(a)?ur:at.current,S=ei(i,S));var U=a.getDerivedStateFromProps;(O=typeof U=="function"||typeof g.getSnapshotBeforeUpdate=="function")||typeof g.UNSAFE_componentWillReceiveProps!="function"&&typeof g.componentWillReceiveProps!="function"||(w!==L||A!==S)&&bp(i,g,c,S),zn=!1,A=i.memoizedState,g.state=A,Ko(i,c,g,d);var V=i.memoizedState;w!==L||A!==V||gt.current||zn?(typeof U=="function"&&(zc(i,a,U,c),V=i.memoizedState),(R=zn||Rp(i,a,R,c,A,V,S)||!1)?(O||typeof g.UNSAFE_componentWillUpdate!="function"&&typeof g.componentWillUpdate!="function"||(typeof g.componentWillUpdate=="function"&&g.componentWillUpdate(c,V,S),typeof g.UNSAFE_componentWillUpdate=="function"&&g.UNSAFE_componentWillUpdate(c,V,S)),typeof g.componentDidUpdate=="function"&&(i.flags|=4),typeof g.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof g.componentDidUpdate!="function"||w===n.memoizedProps&&A===n.memoizedState||(i.flags|=4),typeof g.getSnapshotBeforeUpdate!="function"||w===n.memoizedProps&&A===n.memoizedState||(i.flags|=1024),i.memoizedProps=c,i.memoizedState=V),g.props=c,g.state=V,g.context=S,c=R):(typeof g.componentDidUpdate!="function"||w===n.memoizedProps&&A===n.memoizedState||(i.flags|=4),typeof g.getSnapshotBeforeUpdate!="function"||w===n.memoizedProps&&A===n.memoizedState||(i.flags|=1024),c=!1)}return Hc(n,i,a,c,f,d)}function Hc(n,i,a,c,d,f){$p(n,i);var g=(i.flags&128)!==0;if(!c&&!g)return d&&Gf(i,a,!1),vn(n,i,f);c=i.stateNode,Nw.current=i;var w=g&&typeof a.getDerivedStateFromError!="function"?null:c.render();return i.flags|=1,n!==null&&g?(i.child=ii(i,n.child,null,f),i.child=ii(i,null,w,f)):dt(n,i,w,f),i.memoizedState=c.state,d&&Gf(i,a,!0),i.child}function Bp(n){var i=n.stateNode;i.pendingContext?Hf(n,i.pendingContext,i.pendingContext!==i.context):i.context&&Hf(n,i.context,!1),Nc(n,i.containerInfo)}function Wp(n,i,a,c,d){return ri(),xc(d),i.flags|=256,dt(n,i,a,c),i.child}var Kc={dehydrated:null,treeContext:null,retryLane:0};function Gc(n){return{baseLanes:n,cachePool:null,transitions:null}}function Hp(n,i,a){var c=i.pendingProps,d=Fe.current,f=!1,g=(i.flags&128)!==0,w;if((w=g)||(w=n!==null&&n.memoizedState===null?!1:(d&2)!==0),w?(f=!0,i.flags&=-129):(n===null||n.memoizedState!==null)&&(d|=1),Re(Fe,d&1),n===null)return wc(i),n=i.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((i.mode&1)===0?i.lanes=1:n.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(g=c.children,n=c.fallback,f?(c=i.mode,f=i.child,g={mode:"hidden",children:g},(c&1)===0&&f!==null?(f.childLanes=0,f.pendingProps=g):f=fa(g,c,0,null),n=wr(n,c,a,null),f.return=i,n.return=i,f.sibling=n,i.child=f,i.child.memoizedState=Gc(a),i.memoizedState=Kc,n):qc(i,g));if(d=n.memoizedState,d!==null&&(w=d.dehydrated,w!==null))return Rw(n,i,g,c,w,d,a);if(f){f=c.fallback,g=i.mode,d=n.child,w=d.sibling;var S={mode:"hidden",children:c.children};return(g&1)===0&&i.child!==d?(c=i.child,c.childLanes=0,c.pendingProps=S,i.deletions=null):(c=Gn(d,S),c.subtreeFlags=d.subtreeFlags&14680064),w!==null?f=Gn(w,f):(f=wr(f,g,a,null),f.flags|=2),f.return=i,c.return=i,c.sibling=f,i.child=c,c=f,f=i.child,g=n.child.memoizedState,g=g===null?Gc(a):{baseLanes:g.baseLanes|a,cachePool:null,transitions:g.transitions},f.memoizedState=g,f.childLanes=n.childLanes&~a,i.memoizedState=Kc,c}return f=n.child,n=f.sibling,c=Gn(f,{mode:"visible",children:c.children}),(i.mode&1)===0&&(c.lanes=a),c.return=i,c.sibling=null,n!==null&&(a=i.deletions,a===null?(i.deletions=[n],i.flags|=16):a.push(n)),i.child=c,i.memoizedState=null,c}function qc(n,i){return i=fa({mode:"visible",children:i},n.mode,0,null),i.return=n,n.child=i}function ea(n,i,a,c){return c!==null&&xc(c),ii(i,n.child,null,a),n=qc(i,i.pendingProps.children),n.flags|=2,i.memoizedState=null,n}function Rw(n,i,a,c,d,f,g){if(a)return i.flags&256?(i.flags&=-257,c=Vc(Error(t(422))),ea(n,i,g,c)):i.memoizedState!==null?(i.child=n.child,i.flags|=128,null):(f=c.fallback,d=i.mode,c=fa({mode:"visible",children:c.children},d,0,null),f=wr(f,d,g,null),f.flags|=2,c.return=i,f.return=i,c.sibling=f,i.child=c,(i.mode&1)!==0&&ii(i,n.child,null,g),i.child.memoizedState=Gc(g),i.memoizedState=Kc,f);if((i.mode&1)===0)return ea(n,i,g,null);if(d.data==="$!"){if(c=d.nextSibling&&d.nextSibling.dataset,c)var w=c.dgst;return c=w,f=Error(t(419)),c=Vc(f,c,void 0),ea(n,i,g,c)}if(w=(g&n.childLanes)!==0,_t||w){if(c=Qe,c!==null){switch(g&-g){case 4:d=2;break;case 16:d=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:d=32;break;case 536870912:d=268435456;break;default:d=0}d=(d&(c.suspendedLanes|g))!==0?0:d,d!==0&&d!==f.retryLane&&(f.retryLane=d,yn(n,d),Kt(c,n,d,-1))}return uu(),c=Vc(Error(t(421))),ea(n,i,g,c)}return d.data==="$?"?(i.flags|=128,i.child=n.child,i=Vw.bind(null,n),d._reactRetry=i,null):(n=f.treeContext,Nt=Mn(d.nextSibling),Tt=i,je=!0,Vt=null,n!==null&&(At[Ot++]=mn,At[Ot++]=gn,At[Ot++]=dr,mn=n.id,gn=n.overflow,dr=i),i=qc(i,c.children),i.flags|=4096,i)}function Kp(n,i,a){n.lanes|=i;var c=n.alternate;c!==null&&(c.lanes|=i),kc(n.return,i,a)}function Yc(n,i,a,c,d){var f=n.memoizedState;f===null?n.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:c,tail:a,tailMode:d}:(f.isBackwards=i,f.rendering=null,f.renderingStartTime=0,f.last=c,f.tail=a,f.tailMode=d)}function Gp(n,i,a){var c=i.pendingProps,d=c.revealOrder,f=c.tail;if(dt(n,i,c.children,a),c=Fe.current,(c&2)!==0)c=c&1|2,i.flags|=128;else{if(n!==null&&(n.flags&128)!==0)e:for(n=i.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&Kp(n,a,i);else if(n.tag===19)Kp(n,a,i);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===i)break e;for(;n.sibling===null;){if(n.return===null||n.return===i)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}c&=1}if(Re(Fe,c),(i.mode&1)===0)i.memoizedState=null;else switch(d){case"forwards":for(a=i.child,d=null;a!==null;)n=a.alternate,n!==null&&Go(n)===null&&(d=a),a=a.sibling;a=d,a===null?(d=i.child,i.child=null):(d=a.sibling,a.sibling=null),Yc(i,!1,d,a,f);break;case"backwards":for(a=null,d=i.child,i.child=null;d!==null;){if(n=d.alternate,n!==null&&Go(n)===null){i.child=d;break}n=d.sibling,d.sibling=a,a=d,d=n}Yc(i,!0,a,null,f);break;case"together":Yc(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function ta(n,i){(i.mode&1)===0&&n!==null&&(n.alternate=null,i.alternate=null,i.flags|=2)}function vn(n,i,a){if(n!==null&&(i.dependencies=n.dependencies),gr|=i.lanes,(a&i.childLanes)===0)return null;if(n!==null&&i.child!==n.child)throw Error(t(153));if(i.child!==null){for(n=i.child,a=Gn(n,n.pendingProps),i.child=a,a.return=i;n.sibling!==null;)n=n.sibling,a=a.sibling=Gn(n,n.pendingProps),a.return=i;a.sibling=null}return i.child}function Pw(n,i,a){switch(i.tag){case 3:Bp(i),ri();break;case 5:ap(i);break;case 1:yt(i.type)&&jo(i);break;case 4:Nc(i,i.stateNode.containerInfo);break;case 10:var c=i.type._context,d=i.memoizedProps.value;Re(Bo,c._currentValue),c._currentValue=d;break;case 13:if(c=i.memoizedState,c!==null)return c.dehydrated!==null?(Re(Fe,Fe.current&1),i.flags|=128,null):(a&i.child.childLanes)!==0?Hp(n,i,a):(Re(Fe,Fe.current&1),n=vn(n,i,a),n!==null?n.sibling:null);Re(Fe,Fe.current&1);break;case 19:if(c=(a&i.childLanes)!==0,(n.flags&128)!==0){if(c)return Gp(n,i,a);i.flags|=128}if(d=i.memoizedState,d!==null&&(d.rendering=null,d.tail=null,d.lastEffect=null),Re(Fe,Fe.current),c)break;return null;case 22:case 23:return i.lanes=0,zp(n,i,a)}return vn(n,i,a)}var qp,Qc,Yp,Qp;qp=function(n,i){for(var a=i.child;a!==null;){if(a.tag===5||a.tag===6)n.appendChild(a.stateNode);else if(a.tag!==4&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===i)break;for(;a.sibling===null;){if(a.return===null||a.return===i)return;a=a.return}a.sibling.return=a.return,a=a.sibling}},Qc=function(){},Yp=function(n,i,a,c){var d=n.memoizedProps;if(d!==c){n=i.stateNode,pr(rn.current);var f=null;switch(a){case"input":d=kl(n,d),c=kl(n,c),f=[];break;case"select":d=z({},d,{value:void 0}),c=z({},c,{value:void 0}),f=[];break;case"textarea":d=Nl(n,d),c=Nl(n,c),f=[];break;default:typeof d.onClick!="function"&&typeof c.onClick=="function"&&(n.onclick=Lo)}Pl(a,c);var g;a=null;for(R in d)if(!c.hasOwnProperty(R)&&d.hasOwnProperty(R)&&d[R]!=null)if(R==="style"){var w=d[R];for(g in w)w.hasOwnProperty(g)&&(a||(a={}),a[g]="")}else R!=="dangerouslySetInnerHTML"&&R!=="children"&&R!=="suppressContentEditableWarning"&&R!=="suppressHydrationWarning"&&R!=="autoFocus"&&(o.hasOwnProperty(R)?f||(f=[]):(f=f||[]).push(R,null));for(R in c){var S=c[R];if(w=d!=null?d[R]:void 0,c.hasOwnProperty(R)&&S!==w&&(S!=null||w!=null))if(R==="style")if(w){for(g in w)!w.hasOwnProperty(g)||S&&S.hasOwnProperty(g)||(a||(a={}),a[g]="");for(g in S)S.hasOwnProperty(g)&&w[g]!==S[g]&&(a||(a={}),a[g]=S[g])}else a||(f||(f=[]),f.push(R,a)),a=S;else R==="dangerouslySetInnerHTML"?(S=S?S.__html:void 0,w=w?w.__html:void 0,S!=null&&w!==S&&(f=f||[]).push(R,S)):R==="children"?typeof S!="string"&&typeof S!="number"||(f=f||[]).push(R,""+S):R!=="suppressContentEditableWarning"&&R!=="suppressHydrationWarning"&&(o.hasOwnProperty(R)?(S!=null&&R==="onScroll"&&Oe("scroll",n),f||w===S||(f=[])):(f=f||[]).push(R,S))}a&&(f=f||[]).push("style",a);var R=f;(i.updateQueue=R)&&(i.flags|=4)}},Qp=function(n,i,a,c){a!==c&&(i.flags|=4)};function gs(n,i){if(!je)switch(n.tailMode){case"hidden":i=n.tail;for(var a=null;i!==null;)i.alternate!==null&&(a=i),i=i.sibling;a===null?n.tail=null:a.sibling=null;break;case"collapsed":a=n.tail;for(var c=null;a!==null;)a.alternate!==null&&(c=a),a=a.sibling;c===null?i||n.tail===null?n.tail=null:n.tail.sibling=null:c.sibling=null}}function ct(n){var i=n.alternate!==null&&n.alternate.child===n.child,a=0,c=0;if(i)for(var d=n.child;d!==null;)a|=d.lanes|d.childLanes,c|=d.subtreeFlags&14680064,c|=d.flags&14680064,d.return=n,d=d.sibling;else for(d=n.child;d!==null;)a|=d.lanes|d.childLanes,c|=d.subtreeFlags,c|=d.flags,d.return=n,d=d.sibling;return n.subtreeFlags|=c,n.childLanes=a,i}function bw(n,i,a){var c=i.pendingProps;switch(_c(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ct(i),null;case 1:return yt(i.type)&&Mo(),ct(i),null;case 3:return c=i.stateNode,ai(),Le(gt),Le(at),bc(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(n===null||n.child===null)&&($o(i)?i.flags|=4:n===null||n.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,Vt!==null&&(au(Vt),Vt=null))),Qc(n,i),ct(i),null;case 5:Rc(i);var d=pr(ds.current);if(a=i.type,n!==null&&i.stateNode!=null)Yp(n,i,a,c,d),n.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!c){if(i.stateNode===null)throw Error(t(166));return ct(i),null}if(n=pr(rn.current),$o(i)){c=i.stateNode,a=i.type;var f=i.memoizedProps;switch(c[nn]=i,c[os]=f,n=(i.mode&1)!==0,a){case"dialog":Oe("cancel",c),Oe("close",c);break;case"iframe":case"object":case"embed":Oe("load",c);break;case"video":case"audio":for(d=0;d<rs.length;d++)Oe(rs[d],c);break;case"source":Oe("error",c);break;case"img":case"image":case"link":Oe("error",c),Oe("load",c);break;case"details":Oe("toggle",c);break;case"input":Rh(c,f),Oe("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!f.multiple},Oe("invalid",c);break;case"textarea":Ah(c,f),Oe("invalid",c)}Pl(a,f),d=null;for(var g in f)if(f.hasOwnProperty(g)){var w=f[g];g==="children"?typeof w=="string"?c.textContent!==w&&(f.suppressHydrationWarning!==!0&&Oo(c.textContent,w,n),d=["children",w]):typeof w=="number"&&c.textContent!==""+w&&(f.suppressHydrationWarning!==!0&&Oo(c.textContent,w,n),d=["children",""+w]):o.hasOwnProperty(g)&&w!=null&&g==="onScroll"&&Oe("scroll",c)}switch(a){case"input":co(c),bh(c,f,!0);break;case"textarea":co(c),Lh(c);break;case"select":case"option":break;default:typeof f.onClick=="function"&&(c.onclick=Lo)}c=d,i.updateQueue=c,c!==null&&(i.flags|=4)}else{g=d.nodeType===9?d:d.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=Dh(a)),n==="http://www.w3.org/1999/xhtml"?a==="script"?(n=g.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof c.is=="string"?n=g.createElement(a,{is:c.is}):(n=g.createElement(a),a==="select"&&(g=n,c.multiple?g.multiple=!0:c.size&&(g.size=c.size))):n=g.createElementNS(n,a),n[nn]=i,n[os]=c,qp(n,i,!1,!1),i.stateNode=n;e:{switch(g=bl(a,c),a){case"dialog":Oe("cancel",n),Oe("close",n),d=c;break;case"iframe":case"object":case"embed":Oe("load",n),d=c;break;case"video":case"audio":for(d=0;d<rs.length;d++)Oe(rs[d],n);d=c;break;case"source":Oe("error",n),d=c;break;case"img":case"image":case"link":Oe("error",n),Oe("load",n),d=c;break;case"details":Oe("toggle",n),d=c;break;case"input":Rh(n,c),d=kl(n,c),Oe("invalid",n);break;case"option":d=c;break;case"select":n._wrapperState={wasMultiple:!!c.multiple},d=z({},c,{value:void 0}),Oe("invalid",n);break;case"textarea":Ah(n,c),d=Nl(n,c),Oe("invalid",n);break;default:d=c}Pl(a,d),w=d;for(f in w)if(w.hasOwnProperty(f)){var S=w[f];f==="style"?Fh(n,S):f==="dangerouslySetInnerHTML"?(S=S?S.__html:void 0,S!=null&&Mh(n,S)):f==="children"?typeof S=="string"?(a!=="textarea"||S!=="")&&Fi(n,S):typeof S=="number"&&Fi(n,""+S):f!=="suppressContentEditableWarning"&&f!=="suppressHydrationWarning"&&f!=="autoFocus"&&(o.hasOwnProperty(f)?S!=null&&f==="onScroll"&&Oe("scroll",n):S!=null&&me(n,f,S,g))}switch(a){case"input":co(n),bh(n,c,!1);break;case"textarea":co(n),Lh(n);break;case"option":c.value!=null&&n.setAttribute("value",""+xe(c.value));break;case"select":n.multiple=!!c.multiple,f=c.value,f!=null?Vr(n,!!c.multiple,f,!1):c.defaultValue!=null&&Vr(n,!!c.multiple,c.defaultValue,!0);break;default:typeof d.onClick=="function"&&(n.onclick=Lo)}switch(a){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return ct(i),null;case 6:if(n&&i.stateNode!=null)Qp(n,i,n.memoizedProps,c);else{if(typeof c!="string"&&i.stateNode===null)throw Error(t(166));if(a=pr(ds.current),pr(rn.current),$o(i)){if(c=i.stateNode,a=i.memoizedProps,c[nn]=i,(f=c.nodeValue!==a)&&(n=Tt,n!==null))switch(n.tag){case 3:Oo(c.nodeValue,a,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Oo(c.nodeValue,a,(n.mode&1)!==0)}f&&(i.flags|=4)}else c=(a.nodeType===9?a:a.ownerDocument).createTextNode(c),c[nn]=i,i.stateNode=c}return ct(i),null;case 13:if(Le(Fe),c=i.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(je&&Nt!==null&&(i.mode&1)!==0&&(i.flags&128)===0)Zf(),ri(),i.flags|=98560,f=!1;else if(f=$o(i),c!==null&&c.dehydrated!==null){if(n===null){if(!f)throw Error(t(318));if(f=i.memoizedState,f=f!==null?f.dehydrated:null,!f)throw Error(t(317));f[nn]=i}else ri(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;ct(i),f=!1}else Vt!==null&&(au(Vt),Vt=null),f=!0;if(!f)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=a,i):(c=c!==null,c!==(n!==null&&n.memoizedState!==null)&&c&&(i.child.flags|=8192,(i.mode&1)!==0&&(n===null||(Fe.current&1)!==0?qe===0&&(qe=3):uu())),i.updateQueue!==null&&(i.flags|=4),ct(i),null);case 4:return ai(),Qc(n,i),n===null&&is(i.stateNode.containerInfo),ct(i),null;case 10:return Cc(i.type._context),ct(i),null;case 17:return yt(i.type)&&Mo(),ct(i),null;case 19:if(Le(Fe),f=i.memoizedState,f===null)return ct(i),null;if(c=(i.flags&128)!==0,g=f.rendering,g===null)if(c)gs(f,!1);else{if(qe!==0||n!==null&&(n.flags&128)!==0)for(n=i.child;n!==null;){if(g=Go(n),g!==null){for(i.flags|=128,gs(f,!1),c=g.updateQueue,c!==null&&(i.updateQueue=c,i.flags|=4),i.subtreeFlags=0,c=a,a=i.child;a!==null;)f=a,n=c,f.flags&=14680066,g=f.alternate,g===null?(f.childLanes=0,f.lanes=n,f.child=null,f.subtreeFlags=0,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.subtreeFlags=0,f.deletions=null,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,f.updateQueue=g.updateQueue,f.type=g.type,n=g.dependencies,f.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),a=a.sibling;return Re(Fe,Fe.current&1|2),i.child}n=n.sibling}f.tail!==null&&Be()>di&&(i.flags|=128,c=!0,gs(f,!1),i.lanes=4194304)}else{if(!c)if(n=Go(g),n!==null){if(i.flags|=128,c=!0,a=n.updateQueue,a!==null&&(i.updateQueue=a,i.flags|=4),gs(f,!0),f.tail===null&&f.tailMode==="hidden"&&!g.alternate&&!je)return ct(i),null}else 2*Be()-f.renderingStartTime>di&&a!==1073741824&&(i.flags|=128,c=!0,gs(f,!1),i.lanes=4194304);f.isBackwards?(g.sibling=i.child,i.child=g):(a=f.last,a!==null?a.sibling=g:i.child=g,f.last=g)}return f.tail!==null?(i=f.tail,f.rendering=i,f.tail=i.sibling,f.renderingStartTime=Be(),i.sibling=null,a=Fe.current,Re(Fe,c?a&1|2:a&1),i):(ct(i),null);case 22:case 23:return cu(),c=i.memoizedState!==null,n!==null&&n.memoizedState!==null!==c&&(i.flags|=8192),c&&(i.mode&1)!==0?(Rt&1073741824)!==0&&(ct(i),i.subtreeFlags&6&&(i.flags|=8192)):ct(i),null;case 24:return null;case 25:return null}throw Error(t(156,i.tag))}function Aw(n,i){switch(_c(i),i.tag){case 1:return yt(i.type)&&Mo(),n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 3:return ai(),Le(gt),Le(at),bc(),n=i.flags,(n&65536)!==0&&(n&128)===0?(i.flags=n&-65537|128,i):null;case 5:return Rc(i),null;case 13:if(Le(Fe),n=i.memoizedState,n!==null&&n.dehydrated!==null){if(i.alternate===null)throw Error(t(340));ri()}return n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 19:return Le(Fe),null;case 4:return ai(),null;case 10:return Cc(i.type._context),null;case 22:case 23:return cu(),null;case 24:return null;default:return null}}var na=!1,ut=!1,Ow=typeof WeakSet=="function"?WeakSet:Set,$=null;function ci(n,i){var a=n.ref;if(a!==null)if(typeof a=="function")try{a(null)}catch(c){$e(n,i,c)}else a.current=null}function Jc(n,i,a){try{a()}catch(c){$e(n,i,c)}}var Jp=!1;function Lw(n,i){if(cc=So,n=Rf(),tc(n)){if("selectionStart"in n)var a={start:n.selectionStart,end:n.selectionEnd};else e:{a=(a=n.ownerDocument)&&a.defaultView||window;var c=a.getSelection&&a.getSelection();if(c&&c.rangeCount!==0){a=c.anchorNode;var d=c.anchorOffset,f=c.focusNode;c=c.focusOffset;try{a.nodeType,f.nodeType}catch{a=null;break e}var g=0,w=-1,S=-1,R=0,O=0,L=n,A=null;t:for(;;){for(var U;L!==a||d!==0&&L.nodeType!==3||(w=g+d),L!==f||c!==0&&L.nodeType!==3||(S=g+c),L.nodeType===3&&(g+=L.nodeValue.length),(U=L.firstChild)!==null;)A=L,L=U;for(;;){if(L===n)break t;if(A===a&&++R===d&&(w=g),A===f&&++O===c&&(S=g),(U=L.nextSibling)!==null)break;L=A,A=L.parentNode}L=U}a=w===-1||S===-1?null:{start:w,end:S}}else a=null}a=a||{start:0,end:0}}else a=null;for(uc={focusedElem:n,selectionRange:a},So=!1,$=i;$!==null;)if(i=$,n=i.child,(i.subtreeFlags&1028)!==0&&n!==null)n.return=i,$=n;else for(;$!==null;){i=$;try{var V=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(V!==null){var B=V.memoizedProps,We=V.memoizedState,k=i.stateNode,E=k.getSnapshotBeforeUpdate(i.elementType===i.type?B:Bt(i.type,B),We);k.__reactInternalSnapshotBeforeUpdate=E}break;case 3:var T=i.stateNode.containerInfo;T.nodeType===1?T.textContent="":T.nodeType===9&&T.documentElement&&T.removeChild(T.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(D){$e(i,i.return,D)}if(n=i.sibling,n!==null){n.return=i.return,$=n;break}$=i.return}return V=Jp,Jp=!1,V}function ys(n,i,a){var c=i.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var d=c=c.next;do{if((d.tag&n)===n){var f=d.destroy;d.destroy=void 0,f!==void 0&&Jc(i,a,f)}d=d.next}while(d!==c)}}function ra(n,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var a=i=i.next;do{if((a.tag&n)===n){var c=a.create;a.destroy=c()}a=a.next}while(a!==i)}}function Xc(n){var i=n.ref;if(i!==null){var a=n.stateNode;switch(n.tag){case 5:n=a;break;default:n=a}typeof i=="function"?i(n):i.current=n}}function Xp(n){var i=n.alternate;i!==null&&(n.alternate=null,Xp(i)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(i=n.stateNode,i!==null&&(delete i[nn],delete i[os],delete i[pc],delete i[gw],delete i[yw])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function Zp(n){return n.tag===5||n.tag===3||n.tag===4}function em(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||Zp(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function Zc(n,i,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?a.nodeType===8?a.parentNode.insertBefore(n,i):a.insertBefore(n,i):(a.nodeType===8?(i=a.parentNode,i.insertBefore(n,a)):(i=a,i.appendChild(n)),a=a._reactRootContainer,a!=null||i.onclick!==null||(i.onclick=Lo));else if(c!==4&&(n=n.child,n!==null))for(Zc(n,i,a),n=n.sibling;n!==null;)Zc(n,i,a),n=n.sibling}function eu(n,i,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?a.insertBefore(n,i):a.appendChild(n);else if(c!==4&&(n=n.child,n!==null))for(eu(n,i,a),n=n.sibling;n!==null;)eu(n,i,a),n=n.sibling}var nt=null,Wt=!1;function Vn(n,i,a){for(a=a.child;a!==null;)tm(n,i,a),a=a.sibling}function tm(n,i,a){if(tn&&typeof tn.onCommitFiberUnmount=="function")try{tn.onCommitFiberUnmount(go,a)}catch{}switch(a.tag){case 5:ut||ci(a,i);case 6:var c=nt,d=Wt;nt=null,Vn(n,i,a),nt=c,Wt=d,nt!==null&&(Wt?(n=nt,a=a.stateNode,n.nodeType===8?n.parentNode.removeChild(a):n.removeChild(a)):nt.removeChild(a.stateNode));break;case 18:nt!==null&&(Wt?(n=nt,a=a.stateNode,n.nodeType===8?fc(n.parentNode,a):n.nodeType===1&&fc(n,a),Yi(n)):fc(nt,a.stateNode));break;case 4:c=nt,d=Wt,nt=a.stateNode.containerInfo,Wt=!0,Vn(n,i,a),nt=c,Wt=d;break;case 0:case 11:case 14:case 15:if(!ut&&(c=a.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){d=c=c.next;do{var f=d,g=f.destroy;f=f.tag,g!==void 0&&((f&2)!==0||(f&4)!==0)&&Jc(a,i,g),d=d.next}while(d!==c)}Vn(n,i,a);break;case 1:if(!ut&&(ci(a,i),c=a.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=a.memoizedProps,c.state=a.memoizedState,c.componentWillUnmount()}catch(w){$e(a,i,w)}Vn(n,i,a);break;case 21:Vn(n,i,a);break;case 22:a.mode&1?(ut=(c=ut)||a.memoizedState!==null,Vn(n,i,a),ut=c):Vn(n,i,a);break;default:Vn(n,i,a)}}function nm(n){var i=n.updateQueue;if(i!==null){n.updateQueue=null;var a=n.stateNode;a===null&&(a=n.stateNode=new Ow),i.forEach(function(c){var d=Bw.bind(null,n,c);a.has(c)||(a.add(c),c.then(d,d))})}}function Ht(n,i){var a=i.deletions;if(a!==null)for(var c=0;c<a.length;c++){var d=a[c];try{var f=n,g=i,w=g;e:for(;w!==null;){switch(w.tag){case 5:nt=w.stateNode,Wt=!1;break e;case 3:nt=w.stateNode.containerInfo,Wt=!0;break e;case 4:nt=w.stateNode.containerInfo,Wt=!0;break e}w=w.return}if(nt===null)throw Error(t(160));tm(f,g,d),nt=null,Wt=!1;var S=d.alternate;S!==null&&(S.return=null),d.return=null}catch(R){$e(d,i,R)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)rm(i,n),i=i.sibling}function rm(n,i){var a=n.alternate,c=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(Ht(i,n),on(n),c&4){try{ys(3,n,n.return),ra(3,n)}catch(B){$e(n,n.return,B)}try{ys(5,n,n.return)}catch(B){$e(n,n.return,B)}}break;case 1:Ht(i,n),on(n),c&512&&a!==null&&ci(a,a.return);break;case 5:if(Ht(i,n),on(n),c&512&&a!==null&&ci(a,a.return),n.flags&32){var d=n.stateNode;try{Fi(d,"")}catch(B){$e(n,n.return,B)}}if(c&4&&(d=n.stateNode,d!=null)){var f=n.memoizedProps,g=a!==null?a.memoizedProps:f,w=n.type,S=n.updateQueue;if(n.updateQueue=null,S!==null)try{w==="input"&&f.type==="radio"&&f.name!=null&&Ph(d,f),bl(w,g);var R=bl(w,f);for(g=0;g<S.length;g+=2){var O=S[g],L=S[g+1];O==="style"?Fh(d,L):O==="dangerouslySetInnerHTML"?Mh(d,L):O==="children"?Fi(d,L):me(d,O,L,R)}switch(w){case"input":Il(d,f);break;case"textarea":Oh(d,f);break;case"select":var A=d._wrapperState.wasMultiple;d._wrapperState.wasMultiple=!!f.multiple;var U=f.value;U!=null?Vr(d,!!f.multiple,U,!1):A!==!!f.multiple&&(f.defaultValue!=null?Vr(d,!!f.multiple,f.defaultValue,!0):Vr(d,!!f.multiple,f.multiple?[]:"",!1))}d[os]=f}catch(B){$e(n,n.return,B)}}break;case 6:if(Ht(i,n),on(n),c&4){if(n.stateNode===null)throw Error(t(162));d=n.stateNode,f=n.memoizedProps;try{d.nodeValue=f}catch(B){$e(n,n.return,B)}}break;case 3:if(Ht(i,n),on(n),c&4&&a!==null&&a.memoizedState.isDehydrated)try{Yi(i.containerInfo)}catch(B){$e(n,n.return,B)}break;case 4:Ht(i,n),on(n);break;case 13:Ht(i,n),on(n),d=n.child,d.flags&8192&&(f=d.memoizedState!==null,d.stateNode.isHidden=f,!f||d.alternate!==null&&d.alternate.memoizedState!==null||(ru=Be())),c&4&&nm(n);break;case 22:if(O=a!==null&&a.memoizedState!==null,n.mode&1?(ut=(R=ut)||O,Ht(i,n),ut=R):Ht(i,n),on(n),c&8192){if(R=n.memoizedState!==null,(n.stateNode.isHidden=R)&&!O&&(n.mode&1)!==0)for($=n,O=n.child;O!==null;){for(L=$=O;$!==null;){switch(A=$,U=A.child,A.tag){case 0:case 11:case 14:case 15:ys(4,A,A.return);break;case 1:ci(A,A.return);var V=A.stateNode;if(typeof V.componentWillUnmount=="function"){c=A,a=A.return;try{i=c,V.props=i.memoizedProps,V.state=i.memoizedState,V.componentWillUnmount()}catch(B){$e(c,a,B)}}break;case 5:ci(A,A.return);break;case 22:if(A.memoizedState!==null){om(L);continue}}U!==null?(U.return=A,$=U):om(L)}O=O.sibling}e:for(O=null,L=n;;){if(L.tag===5){if(O===null){O=L;try{d=L.stateNode,R?(f=d.style,typeof f.setProperty=="function"?f.setProperty("display","none","important"):f.display="none"):(w=L.stateNode,S=L.memoizedProps.style,g=S!=null&&S.hasOwnProperty("display")?S.display:null,w.style.display=jh("display",g))}catch(B){$e(n,n.return,B)}}}else if(L.tag===6){if(O===null)try{L.stateNode.nodeValue=R?"":L.memoizedProps}catch(B){$e(n,n.return,B)}}else if((L.tag!==22&&L.tag!==23||L.memoizedState===null||L===n)&&L.child!==null){L.child.return=L,L=L.child;continue}if(L===n)break e;for(;L.sibling===null;){if(L.return===null||L.return===n)break e;O===L&&(O=null),L=L.return}O===L&&(O=null),L.sibling.return=L.return,L=L.sibling}}break;case 19:Ht(i,n),on(n),c&4&&nm(n);break;case 21:break;default:Ht(i,n),on(n)}}function on(n){var i=n.flags;if(i&2){try{e:{for(var a=n.return;a!==null;){if(Zp(a)){var c=a;break e}a=a.return}throw Error(t(160))}switch(c.tag){case 5:var d=c.stateNode;c.flags&32&&(Fi(d,""),c.flags&=-33);var f=em(n);eu(n,f,d);break;case 3:case 4:var g=c.stateNode.containerInfo,w=em(n);Zc(n,w,g);break;default:throw Error(t(161))}}catch(S){$e(n,n.return,S)}n.flags&=-3}i&4096&&(n.flags&=-4097)}function Dw(n,i,a){$=n,im(n)}function im(n,i,a){for(var c=(n.mode&1)!==0;$!==null;){var d=$,f=d.child;if(d.tag===22&&c){var g=d.memoizedState!==null||na;if(!g){var w=d.alternate,S=w!==null&&w.memoizedState!==null||ut;w=na;var R=ut;if(na=g,(ut=S)&&!R)for($=d;$!==null;)g=$,S=g.child,g.tag===22&&g.memoizedState!==null?am(d):S!==null?(S.return=g,$=S):am(d);for(;f!==null;)$=f,im(f),f=f.sibling;$=d,na=w,ut=R}sm(n)}else(d.subtreeFlags&8772)!==0&&f!==null?(f.return=d,$=f):sm(n)}}function sm(n){for(;$!==null;){var i=$;if((i.flags&8772)!==0){var a=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:ut||ra(5,i);break;case 1:var c=i.stateNode;if(i.flags&4&&!ut)if(a===null)c.componentDidMount();else{var d=i.elementType===i.type?a.memoizedProps:Bt(i.type,a.memoizedProps);c.componentDidUpdate(d,a.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var f=i.updateQueue;f!==null&&op(i,f,c);break;case 3:var g=i.updateQueue;if(g!==null){if(a=null,i.child!==null)switch(i.child.tag){case 5:a=i.child.stateNode;break;case 1:a=i.child.stateNode}op(i,g,a)}break;case 5:var w=i.stateNode;if(a===null&&i.flags&4){a=w;var S=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":S.autoFocus&&a.focus();break;case"img":S.src&&(a.src=S.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var R=i.alternate;if(R!==null){var O=R.memoizedState;if(O!==null){var L=O.dehydrated;L!==null&&Yi(L)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}ut||i.flags&512&&Xc(i)}catch(A){$e(i,i.return,A)}}if(i===n){$=null;break}if(a=i.sibling,a!==null){a.return=i.return,$=a;break}$=i.return}}function om(n){for(;$!==null;){var i=$;if(i===n){$=null;break}var a=i.sibling;if(a!==null){a.return=i.return,$=a;break}$=i.return}}function am(n){for(;$!==null;){var i=$;try{switch(i.tag){case 0:case 11:case 15:var a=i.return;try{ra(4,i)}catch(S){$e(i,a,S)}break;case 1:var c=i.stateNode;if(typeof c.componentDidMount=="function"){var d=i.return;try{c.componentDidMount()}catch(S){$e(i,d,S)}}var f=i.return;try{Xc(i)}catch(S){$e(i,f,S)}break;case 5:var g=i.return;try{Xc(i)}catch(S){$e(i,g,S)}}}catch(S){$e(i,i.return,S)}if(i===n){$=null;break}var w=i.sibling;if(w!==null){w.return=i.return,$=w;break}$=i.return}}var Mw=Math.ceil,ia=ne.ReactCurrentDispatcher,tu=ne.ReactCurrentOwner,Mt=ne.ReactCurrentBatchConfig,pe=0,Qe=null,Ke=null,rt=0,Rt=0,ui=jn(0),qe=0,_s=null,gr=0,sa=0,nu=0,vs=null,vt=null,ru=0,di=1/0,wn=null,oa=!1,iu=null,Bn=null,aa=!1,Wn=null,la=0,ws=0,su=null,ca=-1,ua=0;function ht(){return(pe&6)!==0?Be():ca!==-1?ca:ca=Be()}function Hn(n){return(n.mode&1)===0?1:(pe&2)!==0&&rt!==0?rt&-rt:vw.transition!==null?(ua===0&&(ua=Zh()),ua):(n=Se,n!==0||(n=window.event,n=n===void 0?16:cf(n.type)),n)}function Kt(n,i,a,c){if(50<ws)throw ws=0,su=null,Error(t(185));Wi(n,a,c),((pe&2)===0||n!==Qe)&&(n===Qe&&((pe&2)===0&&(sa|=a),qe===4&&Kn(n,rt)),wt(n,c),a===1&&pe===0&&(i.mode&1)===0&&(di=Be()+500,Fo&&Un()))}function wt(n,i){var a=n.callbackNode;v0(n,i);var c=vo(n,n===Qe?rt:0);if(c===0)a!==null&&Qh(a),n.callbackNode=null,n.callbackPriority=0;else if(i=c&-c,n.callbackPriority!==i){if(a!=null&&Qh(a),i===1)n.tag===0?_w(cm.bind(null,n)):qf(cm.bind(null,n)),pw(function(){(pe&6)===0&&Un()}),a=null;else{switch(ef(c)){case 1:a=Fl;break;case 4:a=Jh;break;case 16:a=mo;break;case 536870912:a=Xh;break;default:a=mo}a=ym(a,lm.bind(null,n))}n.callbackPriority=i,n.callbackNode=a}}function lm(n,i){if(ca=-1,ua=0,(pe&6)!==0)throw Error(t(327));var a=n.callbackNode;if(hi()&&n.callbackNode!==a)return null;var c=vo(n,n===Qe?rt:0);if(c===0)return null;if((c&30)!==0||(c&n.expiredLanes)!==0||i)i=da(n,c);else{i=c;var d=pe;pe|=2;var f=dm();(Qe!==n||rt!==i)&&(wn=null,di=Be()+500,_r(n,i));do try{Uw();break}catch(w){um(n,w)}while(!0);Ec(),ia.current=f,pe=d,Ke!==null?i=0:(Qe=null,rt=0,i=qe)}if(i!==0){if(i===2&&(d=Ul(n),d!==0&&(c=d,i=ou(n,d))),i===1)throw a=_s,_r(n,0),Kn(n,c),wt(n,Be()),a;if(i===6)Kn(n,c);else{if(d=n.current.alternate,(c&30)===0&&!jw(d)&&(i=da(n,c),i===2&&(f=Ul(n),f!==0&&(c=f,i=ou(n,f))),i===1))throw a=_s,_r(n,0),Kn(n,c),wt(n,Be()),a;switch(n.finishedWork=d,n.finishedLanes=c,i){case 0:case 1:throw Error(t(345));case 2:vr(n,vt,wn);break;case 3:if(Kn(n,c),(c&130023424)===c&&(i=ru+500-Be(),10<i)){if(vo(n,0)!==0)break;if(d=n.suspendedLanes,(d&c)!==c){ht(),n.pingedLanes|=n.suspendedLanes&d;break}n.timeoutHandle=hc(vr.bind(null,n,vt,wn),i);break}vr(n,vt,wn);break;case 4:if(Kn(n,c),(c&4194240)===c)break;for(i=n.eventTimes,d=-1;0<c;){var g=31-zt(c);f=1<<g,g=i[g],g>d&&(d=g),c&=~f}if(c=d,c=Be()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*Mw(c/1960))-c,10<c){n.timeoutHandle=hc(vr.bind(null,n,vt,wn),c);break}vr(n,vt,wn);break;case 5:vr(n,vt,wn);break;default:throw Error(t(329))}}}return wt(n,Be()),n.callbackNode===a?lm.bind(null,n):null}function ou(n,i){var a=vs;return n.current.memoizedState.isDehydrated&&(_r(n,i).flags|=256),n=da(n,i),n!==2&&(i=vt,vt=a,i!==null&&au(i)),n}function au(n){vt===null?vt=n:vt.push.apply(vt,n)}function jw(n){for(var i=n;;){if(i.flags&16384){var a=i.updateQueue;if(a!==null&&(a=a.stores,a!==null))for(var c=0;c<a.length;c++){var d=a[c],f=d.getSnapshot;d=d.value;try{if(!$t(f(),d))return!1}catch{return!1}}}if(a=i.child,i.subtreeFlags&16384&&a!==null)a.return=i,i=a;else{if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function Kn(n,i){for(i&=~nu,i&=~sa,n.suspendedLanes|=i,n.pingedLanes&=~i,n=n.expirationTimes;0<i;){var a=31-zt(i),c=1<<a;n[a]=-1,i&=~c}}function cm(n){if((pe&6)!==0)throw Error(t(327));hi();var i=vo(n,0);if((i&1)===0)return wt(n,Be()),null;var a=da(n,i);if(n.tag!==0&&a===2){var c=Ul(n);c!==0&&(i=c,a=ou(n,c))}if(a===1)throw a=_s,_r(n,0),Kn(n,i),wt(n,Be()),a;if(a===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=i,vr(n,vt,wn),wt(n,Be()),null}function lu(n,i){var a=pe;pe|=1;try{return n(i)}finally{pe=a,pe===0&&(di=Be()+500,Fo&&Un())}}function yr(n){Wn!==null&&Wn.tag===0&&(pe&6)===0&&hi();var i=pe;pe|=1;var a=Mt.transition,c=Se;try{if(Mt.transition=null,Se=1,n)return n()}finally{Se=c,Mt.transition=a,pe=i,(pe&6)===0&&Un()}}function cu(){Rt=ui.current,Le(ui)}function _r(n,i){n.finishedWork=null,n.finishedLanes=0;var a=n.timeoutHandle;if(a!==-1&&(n.timeoutHandle=-1,fw(a)),Ke!==null)for(a=Ke.return;a!==null;){var c=a;switch(_c(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&Mo();break;case 3:ai(),Le(gt),Le(at),bc();break;case 5:Rc(c);break;case 4:ai();break;case 13:Le(Fe);break;case 19:Le(Fe);break;case 10:Cc(c.type._context);break;case 22:case 23:cu()}a=a.return}if(Qe=n,Ke=n=Gn(n.current,null),rt=Rt=i,qe=0,_s=null,nu=sa=gr=0,vt=vs=null,fr!==null){for(i=0;i<fr.length;i++)if(a=fr[i],c=a.interleaved,c!==null){a.interleaved=null;var d=c.next,f=a.pending;if(f!==null){var g=f.next;f.next=d,c.next=g}a.pending=c}fr=null}return n}function um(n,i){do{var a=Ke;try{if(Ec(),qo.current=Xo,Yo){for(var c=Ue.memoizedState;c!==null;){var d=c.queue;d!==null&&(d.pending=null),c=c.next}Yo=!1}if(mr=0,Ye=Ge=Ue=null,hs=!1,fs=0,tu.current=null,a===null||a.return===null){qe=1,_s=i,Ke=null;break}e:{var f=n,g=a.return,w=a,S=i;if(i=rt,w.flags|=32768,S!==null&&typeof S=="object"&&typeof S.then=="function"){var R=S,O=w,L=O.tag;if((O.mode&1)===0&&(L===0||L===11||L===15)){var A=O.alternate;A?(O.updateQueue=A.updateQueue,O.memoizedState=A.memoizedState,O.lanes=A.lanes):(O.updateQueue=null,O.memoizedState=null)}var U=Dp(g);if(U!==null){U.flags&=-257,Mp(U,g,w,f,i),U.mode&1&&Lp(f,R,i),i=U,S=R;var V=i.updateQueue;if(V===null){var B=new Set;B.add(S),i.updateQueue=B}else V.add(S);break e}else{if((i&1)===0){Lp(f,R,i),uu();break e}S=Error(t(426))}}else if(je&&w.mode&1){var We=Dp(g);if(We!==null){(We.flags&65536)===0&&(We.flags|=256),Mp(We,g,w,f,i),xc(li(S,w));break e}}f=S=li(S,w),qe!==4&&(qe=2),vs===null?vs=[f]:vs.push(f),f=g;do{switch(f.tag){case 3:f.flags|=65536,i&=-i,f.lanes|=i;var k=Ap(f,S,i);sp(f,k);break e;case 1:w=S;var E=f.type,T=f.stateNode;if((f.flags&128)===0&&(typeof E.getDerivedStateFromError=="function"||T!==null&&typeof T.componentDidCatch=="function"&&(Bn===null||!Bn.has(T)))){f.flags|=65536,i&=-i,f.lanes|=i;var D=Op(f,w,i);sp(f,D);break e}}f=f.return}while(f!==null)}fm(a)}catch(W){i=W,Ke===a&&a!==null&&(Ke=a=a.return);continue}break}while(!0)}function dm(){var n=ia.current;return ia.current=Xo,n===null?Xo:n}function uu(){(qe===0||qe===3||qe===2)&&(qe=4),Qe===null||(gr&268435455)===0&&(sa&268435455)===0||Kn(Qe,rt)}function da(n,i){var a=pe;pe|=2;var c=dm();(Qe!==n||rt!==i)&&(wn=null,_r(n,i));do try{Fw();break}catch(d){um(n,d)}while(!0);if(Ec(),pe=a,ia.current=c,Ke!==null)throw Error(t(261));return Qe=null,rt=0,qe}function Fw(){for(;Ke!==null;)hm(Ke)}function Uw(){for(;Ke!==null&&!u0();)hm(Ke)}function hm(n){var i=gm(n.alternate,n,Rt);n.memoizedProps=n.pendingProps,i===null?fm(n):Ke=i,tu.current=null}function fm(n){var i=n;do{var a=i.alternate;if(n=i.return,(i.flags&32768)===0){if(a=bw(a,i,Rt),a!==null){Ke=a;return}}else{if(a=Aw(a,i),a!==null){a.flags&=32767,Ke=a;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{qe=6,Ke=null;return}}if(i=i.sibling,i!==null){Ke=i;return}Ke=i=n}while(i!==null);qe===0&&(qe=5)}function vr(n,i,a){var c=Se,d=Mt.transition;try{Mt.transition=null,Se=1,zw(n,i,a,c)}finally{Mt.transition=d,Se=c}return null}function zw(n,i,a,c){do hi();while(Wn!==null);if((pe&6)!==0)throw Error(t(327));a=n.finishedWork;var d=n.finishedLanes;if(a===null)return null;if(n.finishedWork=null,n.finishedLanes=0,a===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var f=a.lanes|a.childLanes;if(w0(n,f),n===Qe&&(Ke=Qe=null,rt=0),(a.subtreeFlags&2064)===0&&(a.flags&2064)===0||aa||(aa=!0,ym(mo,function(){return hi(),null})),f=(a.flags&15990)!==0,(a.subtreeFlags&15990)!==0||f){f=Mt.transition,Mt.transition=null;var g=Se;Se=1;var w=pe;pe|=4,tu.current=null,Lw(n,a),rm(a,n),ow(uc),So=!!cc,uc=cc=null,n.current=a,Dw(a),d0(),pe=w,Se=g,Mt.transition=f}else n.current=a;if(aa&&(aa=!1,Wn=n,la=d),f=n.pendingLanes,f===0&&(Bn=null),p0(a.stateNode),wt(n,Be()),i!==null)for(c=n.onRecoverableError,a=0;a<i.length;a++)d=i[a],c(d.value,{componentStack:d.stack,digest:d.digest});if(oa)throw oa=!1,n=iu,iu=null,n;return(la&1)!==0&&n.tag!==0&&hi(),f=n.pendingLanes,(f&1)!==0?n===su?ws++:(ws=0,su=n):ws=0,Un(),null}function hi(){if(Wn!==null){var n=ef(la),i=Mt.transition,a=Se;try{if(Mt.transition=null,Se=16>n?16:n,Wn===null)var c=!1;else{if(n=Wn,Wn=null,la=0,(pe&6)!==0)throw Error(t(331));var d=pe;for(pe|=4,$=n.current;$!==null;){var f=$,g=f.child;if(($.flags&16)!==0){var w=f.deletions;if(w!==null){for(var S=0;S<w.length;S++){var R=w[S];for($=R;$!==null;){var O=$;switch(O.tag){case 0:case 11:case 15:ys(8,O,f)}var L=O.child;if(L!==null)L.return=O,$=L;else for(;$!==null;){O=$;var A=O.sibling,U=O.return;if(Xp(O),O===R){$=null;break}if(A!==null){A.return=U,$=A;break}$=U}}}var V=f.alternate;if(V!==null){var B=V.child;if(B!==null){V.child=null;do{var We=B.sibling;B.sibling=null,B=We}while(B!==null)}}$=f}}if((f.subtreeFlags&2064)!==0&&g!==null)g.return=f,$=g;else e:for(;$!==null;){if(f=$,(f.flags&2048)!==0)switch(f.tag){case 0:case 11:case 15:ys(9,f,f.return)}var k=f.sibling;if(k!==null){k.return=f.return,$=k;break e}$=f.return}}var E=n.current;for($=E;$!==null;){g=$;var T=g.child;if((g.subtreeFlags&2064)!==0&&T!==null)T.return=g,$=T;else e:for(g=E;$!==null;){if(w=$,(w.flags&2048)!==0)try{switch(w.tag){case 0:case 11:case 15:ra(9,w)}}catch(W){$e(w,w.return,W)}if(w===g){$=null;break e}var D=w.sibling;if(D!==null){D.return=w.return,$=D;break e}$=w.return}}if(pe=d,Un(),tn&&typeof tn.onPostCommitFiberRoot=="function")try{tn.onPostCommitFiberRoot(go,n)}catch{}c=!0}return c}finally{Se=a,Mt.transition=i}}return!1}function pm(n,i,a){i=li(a,i),i=Ap(n,i,1),n=$n(n,i,1),i=ht(),n!==null&&(Wi(n,1,i),wt(n,i))}function $e(n,i,a){if(n.tag===3)pm(n,n,a);else for(;i!==null;){if(i.tag===3){pm(i,n,a);break}else if(i.tag===1){var c=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&(Bn===null||!Bn.has(c))){n=li(a,n),n=Op(i,n,1),i=$n(i,n,1),n=ht(),i!==null&&(Wi(i,1,n),wt(i,n));break}}i=i.return}}function $w(n,i,a){var c=n.pingCache;c!==null&&c.delete(i),i=ht(),n.pingedLanes|=n.suspendedLanes&a,Qe===n&&(rt&a)===a&&(qe===4||qe===3&&(rt&130023424)===rt&&500>Be()-ru?_r(n,0):nu|=a),wt(n,i)}function mm(n,i){i===0&&((n.mode&1)===0?i=1:(i=_o,_o<<=1,(_o&130023424)===0&&(_o=4194304)));var a=ht();n=yn(n,i),n!==null&&(Wi(n,i,a),wt(n,a))}function Vw(n){var i=n.memoizedState,a=0;i!==null&&(a=i.retryLane),mm(n,a)}function Bw(n,i){var a=0;switch(n.tag){case 13:var c=n.stateNode,d=n.memoizedState;d!==null&&(a=d.retryLane);break;case 19:c=n.stateNode;break;default:throw Error(t(314))}c!==null&&c.delete(i),mm(n,a)}var gm;gm=function(n,i,a){if(n!==null)if(n.memoizedProps!==i.pendingProps||gt.current)_t=!0;else{if((n.lanes&a)===0&&(i.flags&128)===0)return _t=!1,Pw(n,i,a);_t=(n.flags&131072)!==0}else _t=!1,je&&(i.flags&1048576)!==0&&Yf(i,zo,i.index);switch(i.lanes=0,i.tag){case 2:var c=i.type;ta(n,i),n=i.pendingProps;var d=ei(i,at.current);oi(i,a),d=Lc(null,i,c,n,d,a);var f=Dc();return i.flags|=1,typeof d=="object"&&d!==null&&typeof d.render=="function"&&d.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,yt(c)?(f=!0,jo(i)):f=!1,i.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,Tc(i),d.updater=Zo,i.stateNode=d,d._reactInternals=i,$c(i,c,n,a),i=Hc(null,i,c,!0,f,a)):(i.tag=0,je&&f&&yc(i),dt(null,i,d,a),i=i.child),i;case 16:c=i.elementType;e:{switch(ta(n,i),n=i.pendingProps,d=c._init,c=d(c._payload),i.type=c,d=i.tag=Hw(c),n=Bt(c,n),d){case 0:i=Wc(null,i,c,n,a);break e;case 1:i=Vp(null,i,c,n,a);break e;case 11:i=jp(null,i,c,n,a);break e;case 14:i=Fp(null,i,c,Bt(c.type,n),a);break e}throw Error(t(306,c,""))}return i;case 0:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:Bt(c,d),Wc(n,i,c,d,a);case 1:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:Bt(c,d),Vp(n,i,c,d,a);case 3:e:{if(Bp(i),n===null)throw Error(t(387));c=i.pendingProps,f=i.memoizedState,d=f.element,ip(n,i),Ko(i,c,null,a);var g=i.memoizedState;if(c=g.element,f.isDehydrated)if(f={element:c,isDehydrated:!1,cache:g.cache,pendingSuspenseBoundaries:g.pendingSuspenseBoundaries,transitions:g.transitions},i.updateQueue.baseState=f,i.memoizedState=f,i.flags&256){d=li(Error(t(423)),i),i=Wp(n,i,c,a,d);break e}else if(c!==d){d=li(Error(t(424)),i),i=Wp(n,i,c,a,d);break e}else for(Nt=Mn(i.stateNode.containerInfo.firstChild),Tt=i,je=!0,Vt=null,a=np(i,null,c,a),i.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(ri(),c===d){i=vn(n,i,a);break e}dt(n,i,c,a)}i=i.child}return i;case 5:return ap(i),n===null&&wc(i),c=i.type,d=i.pendingProps,f=n!==null?n.memoizedProps:null,g=d.children,dc(c,d)?g=null:f!==null&&dc(c,f)&&(i.flags|=32),$p(n,i),dt(n,i,g,a),i.child;case 6:return n===null&&wc(i),null;case 13:return Hp(n,i,a);case 4:return Nc(i,i.stateNode.containerInfo),c=i.pendingProps,n===null?i.child=ii(i,null,c,a):dt(n,i,c,a),i.child;case 11:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:Bt(c,d),jp(n,i,c,d,a);case 7:return dt(n,i,i.pendingProps,a),i.child;case 8:return dt(n,i,i.pendingProps.children,a),i.child;case 12:return dt(n,i,i.pendingProps.children,a),i.child;case 10:e:{if(c=i.type._context,d=i.pendingProps,f=i.memoizedProps,g=d.value,Re(Bo,c._currentValue),c._currentValue=g,f!==null)if($t(f.value,g)){if(f.children===d.children&&!gt.current){i=vn(n,i,a);break e}}else for(f=i.child,f!==null&&(f.return=i);f!==null;){var w=f.dependencies;if(w!==null){g=f.child;for(var S=w.firstContext;S!==null;){if(S.context===c){if(f.tag===1){S=_n(-1,a&-a),S.tag=2;var R=f.updateQueue;if(R!==null){R=R.shared;var O=R.pending;O===null?S.next=S:(S.next=O.next,O.next=S),R.pending=S}}f.lanes|=a,S=f.alternate,S!==null&&(S.lanes|=a),kc(f.return,a,i),w.lanes|=a;break}S=S.next}}else if(f.tag===10)g=f.type===i.type?null:f.child;else if(f.tag===18){if(g=f.return,g===null)throw Error(t(341));g.lanes|=a,w=g.alternate,w!==null&&(w.lanes|=a),kc(g,a,i),g=f.sibling}else g=f.child;if(g!==null)g.return=f;else for(g=f;g!==null;){if(g===i){g=null;break}if(f=g.sibling,f!==null){f.return=g.return,g=f;break}g=g.return}f=g}dt(n,i,d.children,a),i=i.child}return i;case 9:return d=i.type,c=i.pendingProps.children,oi(i,a),d=Lt(d),c=c(d),i.flags|=1,dt(n,i,c,a),i.child;case 14:return c=i.type,d=Bt(c,i.pendingProps),d=Bt(c.type,d),Fp(n,i,c,d,a);case 15:return Up(n,i,i.type,i.pendingProps,a);case 17:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:Bt(c,d),ta(n,i),i.tag=1,yt(c)?(n=!0,jo(i)):n=!1,oi(i,a),Pp(i,c,d),$c(i,c,d,a),Hc(null,i,c,!0,n,a);case 19:return Gp(n,i,a);case 22:return zp(n,i,a)}throw Error(t(156,i.tag))};function ym(n,i){return Yh(n,i)}function Ww(n,i,a,c){this.tag=n,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function jt(n,i,a,c){return new Ww(n,i,a,c)}function du(n){return n=n.prototype,!(!n||!n.isReactComponent)}function Hw(n){if(typeof n=="function")return du(n)?1:0;if(n!=null){if(n=n.$$typeof,n===ie)return 11;if(n===we)return 14}return 2}function Gn(n,i){var a=n.alternate;return a===null?(a=jt(n.tag,i,n.key,n.mode),a.elementType=n.elementType,a.type=n.type,a.stateNode=n.stateNode,a.alternate=n,n.alternate=a):(a.pendingProps=i,a.type=n.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=n.flags&14680064,a.childLanes=n.childLanes,a.lanes=n.lanes,a.child=n.child,a.memoizedProps=n.memoizedProps,a.memoizedState=n.memoizedState,a.updateQueue=n.updateQueue,i=n.dependencies,a.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},a.sibling=n.sibling,a.index=n.index,a.ref=n.ref,a}function ha(n,i,a,c,d,f){var g=2;if(c=n,typeof n=="function")du(n)&&(g=1);else if(typeof n=="string")g=5;else e:switch(n){case Te:return wr(a.children,d,f,i);case He:g=8,d|=8;break;case Ae:return n=jt(12,a,i,d|2),n.elementType=Ae,n.lanes=f,n;case q:return n=jt(13,a,i,d),n.elementType=q,n.lanes=f,n;case ee:return n=jt(19,a,i,d),n.elementType=ee,n.lanes=f,n;case se:return fa(a,d,f,i);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case ve:g=10;break e;case bt:g=9;break e;case ie:g=11;break e;case we:g=14;break e;case ue:g=16,c=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return i=jt(g,a,i,d),i.elementType=n,i.type=c,i.lanes=f,i}function wr(n,i,a,c){return n=jt(7,n,c,i),n.lanes=a,n}function fa(n,i,a,c){return n=jt(22,n,c,i),n.elementType=se,n.lanes=a,n.stateNode={isHidden:!1},n}function hu(n,i,a){return n=jt(6,n,null,i),n.lanes=a,n}function fu(n,i,a){return i=jt(4,n.children!==null?n.children:[],n.key,i),i.lanes=a,i.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},i}function Kw(n,i,a,c,d){this.tag=i,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=zl(0),this.expirationTimes=zl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=zl(0),this.identifierPrefix=c,this.onRecoverableError=d,this.mutableSourceEagerHydrationData=null}function pu(n,i,a,c,d,f,g,w,S){return n=new Kw(n,i,a,w,S),i===1?(i=1,f===!0&&(i|=8)):i=0,f=jt(3,null,null,i),n.current=f,f.stateNode=n,f.memoizedState={element:c,isDehydrated:a,cache:null,transitions:null,pendingSuspenseBoundaries:null},Tc(f),n}function Gw(n,i,a){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:De,key:c==null?null:""+c,children:n,containerInfo:i,implementation:a}}function _m(n){if(!n)return Fn;n=n._reactInternals;e:{if(lr(n)!==n||n.tag!==1)throw Error(t(170));var i=n;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(yt(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(t(171))}if(n.tag===1){var a=n.type;if(yt(a))return Kf(n,a,i)}return i}function vm(n,i,a,c,d,f,g,w,S){return n=pu(a,c,!0,n,d,f,g,w,S),n.context=_m(null),a=n.current,c=ht(),d=Hn(a),f=_n(c,d),f.callback=i??null,$n(a,f,d),n.current.lanes=d,Wi(n,d,c),wt(n,c),n}function pa(n,i,a,c){var d=i.current,f=ht(),g=Hn(d);return a=_m(a),i.context===null?i.context=a:i.pendingContext=a,i=_n(f,g),i.payload={element:n},c=c===void 0?null:c,c!==null&&(i.callback=c),n=$n(d,i,g),n!==null&&(Kt(n,d,g,f),Ho(n,d,g)),g}function ma(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function wm(n,i){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var a=n.retryLane;n.retryLane=a!==0&&a<i?a:i}}function mu(n,i){wm(n,i),(n=n.alternate)&&wm(n,i)}function qw(){return null}var xm=typeof reportError=="function"?reportError:function(n){console.error(n)};function gu(n){this._internalRoot=n}ga.prototype.render=gu.prototype.render=function(n){var i=this._internalRoot;if(i===null)throw Error(t(409));pa(n,i,null,null)},ga.prototype.unmount=gu.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var i=n.containerInfo;yr(function(){pa(null,n,null,null)}),i[fn]=null}};function ga(n){this._internalRoot=n}ga.prototype.unstable_scheduleHydration=function(n){if(n){var i=rf();n={blockedOn:null,target:n,priority:i};for(var a=0;a<On.length&&i!==0&&i<On[a].priority;a++);On.splice(a,0,n),a===0&&af(n)}};function yu(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function ya(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function Sm(){}function Yw(n,i,a,c,d){if(d){if(typeof c=="function"){var f=c;c=function(){var R=ma(g);f.call(R)}}var g=vm(i,c,n,0,null,!1,!1,"",Sm);return n._reactRootContainer=g,n[fn]=g.current,is(n.nodeType===8?n.parentNode:n),yr(),g}for(;d=n.lastChild;)n.removeChild(d);if(typeof c=="function"){var w=c;c=function(){var R=ma(S);w.call(R)}}var S=pu(n,0,!1,null,null,!1,!1,"",Sm);return n._reactRootContainer=S,n[fn]=S.current,is(n.nodeType===8?n.parentNode:n),yr(function(){pa(i,S,a,c)}),S}function _a(n,i,a,c,d){var f=a._reactRootContainer;if(f){var g=f;if(typeof d=="function"){var w=d;d=function(){var S=ma(g);w.call(S)}}pa(i,g,n,d)}else g=Yw(a,i,n,d,c);return ma(g)}tf=function(n){switch(n.tag){case 3:var i=n.stateNode;if(i.current.memoizedState.isDehydrated){var a=Bi(i.pendingLanes);a!==0&&($l(i,a|1),wt(i,Be()),(pe&6)===0&&(di=Be()+500,Un()))}break;case 13:yr(function(){var c=yn(n,1);if(c!==null){var d=ht();Kt(c,n,1,d)}}),mu(n,1)}},Vl=function(n){if(n.tag===13){var i=yn(n,134217728);if(i!==null){var a=ht();Kt(i,n,134217728,a)}mu(n,134217728)}},nf=function(n){if(n.tag===13){var i=Hn(n),a=yn(n,i);if(a!==null){var c=ht();Kt(a,n,i,c)}mu(n,i)}},rf=function(){return Se},sf=function(n,i){var a=Se;try{return Se=n,i()}finally{Se=a}},Ll=function(n,i,a){switch(i){case"input":if(Il(n,a),i=a.name,a.type==="radio"&&i!=null){for(a=n;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<a.length;i++){var c=a[i];if(c!==n&&c.form===n.form){var d=Do(c);if(!d)throw Error(t(90));Nh(c),Il(c,d)}}}break;case"textarea":Oh(n,a);break;case"select":i=a.value,i!=null&&Vr(n,!!a.multiple,i,!1)}},Vh=lu,Bh=yr;var Qw={usingClientEntryPoint:!1,Events:[as,Xr,Do,zh,$h,lu]},xs={findFiberByHostInstance:cr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Jw={bundleType:xs.bundleType,version:xs.version,rendererPackageName:xs.rendererPackageName,rendererConfig:xs.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ne.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=Gh(n),n===null?null:n.stateNode},findFiberByHostInstance:xs.findFiberByHostInstance||qw,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var va=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!va.isDisabled&&va.supportsFiber)try{go=va.inject(Jw),tn=va}catch{}}return xt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Qw,xt.createPortal=function(n,i){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!yu(i))throw Error(t(200));return Gw(n,i,null,a)},xt.createRoot=function(n,i){if(!yu(n))throw Error(t(299));var a=!1,c="",d=xm;return i!=null&&(i.unstable_strictMode===!0&&(a=!0),i.identifierPrefix!==void 0&&(c=i.identifierPrefix),i.onRecoverableError!==void 0&&(d=i.onRecoverableError)),i=pu(n,1,!1,null,null,a,!1,c,d),n[fn]=i.current,is(n.nodeType===8?n.parentNode:n),new gu(i)},xt.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var i=n._reactInternals;if(i===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=Gh(i),n=n===null?null:n.stateNode,n},xt.flushSync=function(n){return yr(n)},xt.hydrate=function(n,i,a){if(!ya(i))throw Error(t(200));return _a(null,n,i,!0,a)},xt.hydrateRoot=function(n,i,a){if(!yu(n))throw Error(t(405));var c=a!=null&&a.hydratedSources||null,d=!1,f="",g=xm;if(a!=null&&(a.unstable_strictMode===!0&&(d=!0),a.identifierPrefix!==void 0&&(f=a.identifierPrefix),a.onRecoverableError!==void 0&&(g=a.onRecoverableError)),i=vm(i,null,n,1,a??null,d,!1,f,g),n[fn]=i.current,is(n),c)for(n=0;n<c.length;n++)a=c[n],d=a._getVersion,d=d(a._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[a,d]:i.mutableSourceEagerHydrationData.push(a,d);return new ga(i)},xt.render=function(n,i,a){if(!ya(i))throw Error(t(200));return _a(null,n,i,!1,a)},xt.unmountComponentAtNode=function(n){if(!ya(n))throw Error(t(40));return n._reactRootContainer?(yr(function(){_a(null,null,n,!1,function(){n._reactRootContainer=null,n[fn]=null})}),!0):!1},xt.unstable_batchedUpdates=lu,xt.unstable_renderSubtreeIntoContainer=function(n,i,a,c){if(!ya(a))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return _a(n,i,a,!1,c)},xt.version="18.3.1-next-f1338f8080-20240426",xt}var Pm;function sx(){if(Pm)return wu.exports;Pm=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),wu.exports=ix(),wu.exports}var bm;function ox(){if(bm)return wa;bm=1;var r=sx();return wa.createRoot=r.createRoot,wa.hydrateRoot=r.hydrateRoot,wa}var ax=ox(),te=rl();/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lx=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),cx=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,s)=>s?s.toUpperCase():t.toLowerCase()),Am=r=>{const e=cx(r);return e.charAt(0).toUpperCase()+e.slice(1)},vy=(...r)=>r.filter((e,t,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===t).join(" ").trim();/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var ux={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dx=te.forwardRef(({color:r="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:s,className:o="",children:l,iconNode:u,...h},p)=>te.createElement("svg",{ref:p,...ux,width:e,height:e,stroke:r,strokeWidth:s?Number(t)*24/Number(e):t,className:vy("lucide",o),...h},[...u.map(([m,v])=>te.createElement(m,v)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke=(r,e)=>{const t=te.forwardRef(({className:s,...o},l)=>te.createElement(dx,{ref:l,iconNode:e,className:vy(`lucide-${lx(Am(r))}`,`lucide-${r}`,s),...o}));return t.displayName=Am(r),t};/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hx=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],fx=ke("arrow-left",hx);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const px=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],mx=ke("arrow-right",px);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gx=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]],Us=ke("bell",gx);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yx=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"m9 16 2 2 4-4",key:"19s6y9"}]],_x=ke("calendar-check",yx);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vx=[["path",{d:"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",key:"5owen"}],["circle",{cx:"7",cy:"17",r:"2",key:"u2ysq9"}],["path",{d:"M9 17h6",key:"r8uit2"}],["circle",{cx:"17",cy:"17",r:"2",key:"axvx0g"}]],wx=ke("car",vx);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xx=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Sx=ke("check",xx);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ex=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],Cx=ke("chevron-down",Ex);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kx=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],wy=ke("chevron-right",kx);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ix=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],Tx=ke("circle-check-big",Ix);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nx=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],xy=ke("circle-check",Nx);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rx=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],Px=ke("circle-help",Rx);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bx=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],Ax=ke("circle",bx);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ox=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]],Lx=ke("clock",Ox);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dx=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],Mx=ke("eye",Dx);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jx=[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]],Fx=ke("heart",jx);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ux=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]],zx=ke("house",Ux);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $x=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],qu=ke("lock",$x);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vx=[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]],Bx=ke("log-out",Vx);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wx=[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]],Hx=ke("mail",Wx);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kx=[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]],Gx=ke("phone",Kx);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qx=[["path",{d:"m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z",key:"wa1lgi"}],["path",{d:"m8.5 8.5 7 7",key:"rvfmvr"}]],Sy=ke("pill",qx);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yx=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]],Qx=ke("search",Yx);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jx=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],Xx=ke("shield",Jx);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zx=[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]],eS=ke("shopping-cart",Zx);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tS=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],nS=ke("star",tS);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rS=[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]],iS=ke("trophy",rS);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sS=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],zs=ke("user",sS);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oS=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]],aS=ke("users",oS),X=r=>typeof r=="string",Es=()=>{let r,e;const t=new Promise((s,o)=>{r=s,e=o});return t.resolve=r,t.reject=e,t},Om=r=>r==null?"":String(r),lS=(r,e,t)=>{r.forEach(s=>{e[s]&&(t[s]=e[s])})},cS=/###/g,Lm=r=>r&&r.includes("###")?r.replace(cS,"."):r,Dm=r=>!r||X(r),bs=(r,e,t)=>{const s=X(e)?e.split("."):e;let o=0;for(;o<s.length-1;){if(Dm(r))return{};const l=Lm(s[o]);!r[l]&&t&&(r[l]=new t),Object.prototype.hasOwnProperty.call(r,l)?r=r[l]:r={},++o}return Dm(r)?{}:{obj:r,k:Lm(s[o])}},Mm=(r,e,t)=>{const{obj:s,k:o}=bs(r,e,Object);if(s!==void 0||e.length===1){s[o]=t;return}let l=e[e.length-1],u=e.slice(0,e.length-1),h=bs(r,u,Object);for(;h.obj===void 0&&u.length;)l=`${u[u.length-1]}.${l}`,u=u.slice(0,u.length-1),h=bs(r,u,Object),h!=null&&h.obj&&typeof h.obj[`${h.k}.${l}`]<"u"&&(h.obj=void 0);h.obj[`${h.k}.${l}`]=t},uS=(r,e,t,s)=>{const{obj:o,k:l}=bs(r,e,Object);o[l]=o[l]||[],o[l].push(t)},ba=(r,e)=>{const{obj:t,k:s}=bs(r,e);if(t&&Object.prototype.hasOwnProperty.call(t,s))return t[s]},dS=(r,e,t)=>{const s=ba(r,t);return s!==void 0?s:ba(e,t)},Ey=(r,e,t)=>{for(const s in e)s!=="__proto__"&&s!=="constructor"&&(s in r?X(r[s])||r[s]instanceof String||X(e[s])||e[s]instanceof String?t&&(r[s]=e[s]):Ey(r[s],e[s],t):r[s]=e[s]);return r},xn=r=>r.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),hS={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},fS=r=>X(r)?r.replace(/[&<>"'\/]/g,e=>hS[e]):r;class pS{constructor(e){this.capacity=e,this.regExpMap=new Map,this.regExpQueue=[]}getRegExp(e){const t=this.regExpMap.get(e);if(t!==void 0)return t;const s=new RegExp(e);return this.regExpQueue.length===this.capacity&&this.regExpMap.delete(this.regExpQueue.shift()),this.regExpMap.set(e,s),this.regExpQueue.push(e),s}}const mS=[" ",",","?","!",";"],gS=new pS(20),yS=(r,e,t)=>{e=e||"",t=t||"";const s=mS.filter(u=>!e.includes(u)&&!t.includes(u));if(s.length===0)return!0;const o=gS.getRegExp(`(${s.map(u=>u==="?"?"\\?":u).join("|")})`);let l=!o.test(r);if(!l){const u=r.indexOf(t);u>0&&!o.test(r.substring(0,u))&&(l=!0)}return l},Yu=(r,e,t=".")=>{if(!r)return;if(r[e])return Object.prototype.hasOwnProperty.call(r,e)?r[e]:void 0;const s=e.split(t);let o=r;for(let l=0;l<s.length;){if(!o||typeof o!="object")return;let u,h="";for(let p=l;p<s.length;++p)if(p!==l&&(h+=t),h+=s[p],u=o[h],u!==void 0){if(["string","number","boolean"].includes(typeof u)&&p<s.length-1)continue;l+=p-l+1;break}o=u}return o},$s=r=>r==null?void 0:r.replace(/_/g,"-"),_S={type:"logger",log(r){this.output("log",r)},warn(r){this.output("warn",r)},error(r){this.output("error",r)},output(r,e){var t,s;(s=(t=console==null?void 0:console[r])==null?void 0:t.apply)==null||s.call(t,console,e)}};let vS=class Qu{constructor(e,t={}){this.init(e,t)}init(e,t={}){this.prefix=t.prefix||"i18next:",this.logger=e||_S,this.options=t,this.debug=t.debug}log(...e){return this.forward(e,"log","",!0)}warn(...e){return this.forward(e,"warn","",!0)}error(...e){return this.forward(e,"error","")}deprecate(...e){return this.forward(e,"warn","WARNING DEPRECATED: ",!0)}forward(e,t,s,o){return o&&!this.debug?null:(e=e.map(l=>X(l)?l.replace(/[\r\n\x00-\x1F\x7F]/g," "):l),X(e[0])&&(e[0]=`${s}${this.prefix} ${e[0]}`),this.logger[t](e))}create(e){return new Qu(this.logger,{prefix:`${this.prefix}:${e}:`,...this.options})}clone(e){return e=e||this.options,e.prefix=e.prefix||this.prefix,new Qu(this.logger,e)}};var an=new vS;let il=class{constructor(){this.observers={}}on(e,t){return e.split(" ").forEach(s=>{this.observers[s]||(this.observers[s]=new Map);const o=this.observers[s].get(t)||0;this.observers[s].set(t,o+1)}),this}off(e,t){if(this.observers[e]){if(!t){delete this.observers[e];return}this.observers[e].delete(t)}}once(e,t){const s=(...o)=>{t(...o),this.off(e,s)};return this.on(e,s),this}emit(e,...t){this.observers[e]&&Array.from(this.observers[e].entries()).forEach(([o,l])=>{for(let u=0;u<l;u++)o(...t)}),this.observers["*"]&&Array.from(this.observers["*"].entries()).forEach(([o,l])=>{for(let u=0;u<l;u++)o(e,...t)})}};class jm extends il{constructor(e,t={ns:["translation"],defaultNS:"translation"}){super(),this.data=e||{},this.options=t,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.options.ignoreJSONStructure===void 0&&(this.options.ignoreJSONStructure=!0)}addNamespaces(e){this.options.ns.includes(e)||this.options.ns.push(e)}removeNamespaces(e){const t=this.options.ns.indexOf(e);t>-1&&this.options.ns.splice(t,1)}getResource(e,t,s,o={}){var m,v;const l=o.keySeparator!==void 0?o.keySeparator:this.options.keySeparator,u=o.ignoreJSONStructure!==void 0?o.ignoreJSONStructure:this.options.ignoreJSONStructure;let h;e.includes(".")?h=e.split("."):(h=[e,t],s&&(Array.isArray(s)?h.push(...s):X(s)&&l?h.push(...s.split(l)):h.push(s)));const p=ba(this.data,h);return!p&&!t&&!s&&e.includes(".")&&(e=h[0],t=h[1],s=h.slice(2).join(".")),p||!u||!X(s)?p:Yu((v=(m=this.data)==null?void 0:m[e])==null?void 0:v[t],s,l)}addResource(e,t,s,o,l={silent:!1}){const u=l.keySeparator!==void 0?l.keySeparator:this.options.keySeparator;let h=[e,t];s&&(h=h.concat(u?s.split(u):s)),e.includes(".")&&(h=e.split("."),o=t,t=h[1]),this.addNamespaces(t),Mm(this.data,h,o),l.silent||this.emit("added",e,t,s,o)}addResources(e,t,s,o={silent:!1}){for(const l in s)(X(s[l])||Array.isArray(s[l]))&&this.addResource(e,t,l,s[l],{silent:!0});o.silent||this.emit("added",e,t,s)}addResourceBundle(e,t,s,o,l,u={silent:!1,skipCopy:!1}){let h=[e,t];e.includes(".")&&(h=e.split("."),o=s,s=t,t=h[1]),this.addNamespaces(t);let p=ba(this.data,h)||{};u.skipCopy||(s=JSON.parse(JSON.stringify(s))),o?Ey(p,s,l):p={...p,...s},Mm(this.data,h,p),u.silent||this.emit("added",e,t,s)}removeResourceBundle(e,t){this.hasResourceBundle(e,t)&&delete this.data[e][t],this.removeNamespaces(t),this.emit("removed",e,t)}hasResourceBundle(e,t){return this.getResource(e,t)!==void 0}getResourceBundle(e,t){return t||(t=this.options.defaultNS),this.getResource(e,t)}getDataByLanguage(e){return this.data[e]}hasLanguageSomeTranslations(e){const t=this.getDataByLanguage(e);return!!(t&&Object.keys(t)||[]).find(o=>t[o]&&Object.keys(t[o]).length>0)}toJSON(){return this.data}}var Cy={processors:{},addPostProcessor(r){this.processors[r.name]=r},handle(r,e,t,s,o){return r.forEach(l=>{var u;e=((u=this.processors[l])==null?void 0:u.process(e,t,s,o))??e}),e}};const ky=Symbol("i18next/PATH_KEY");function wS(){const r=[],e=Object.create(null);let t;return e.get=(s,o)=>{var l;return(l=t==null?void 0:t.revoke)==null||l.call(t),o===ky?r:(r.push(o),t=Proxy.revocable(s,e),t.proxy)},Proxy.revocable(Object.create(null),e).proxy}function gi(r,e){const{[ky]:t}=r(wS()),s=(e==null?void 0:e.keySeparator)??".",o=(e==null?void 0:e.nsSeparator)??":",l=(e==null?void 0:e.enableSelector)==="strict";if(t.length>1&&o){const u=e==null?void 0:e.ns,h=l?Array.isArray(u)?u:u?[u]:null:Array.isArray(u)?u:null;if(h&&(l?h:h.length>1?h.slice(1):[]).includes(t[0]))return`${t[0]}${o}${t.slice(1).join(s)}`}return t.join(s)}const Eu=r=>!X(r)&&typeof r!="boolean"&&typeof r!="number";class Aa extends il{constructor(e,t={}){super(),lS(["resourceStore","languageUtils","pluralResolver","interpolator","backendConnector","i18nFormat","utils"],e,this),this.options=t,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.logger=an.create("translator"),this.checkedLoadedFor={}}changeLanguage(e){e&&(this.language=e)}exists(e,t={interpolation:{}}){const s={...t};if(e==null)return!1;const o=this.resolve(e,s);if((o==null?void 0:o.res)===void 0)return!1;const l=Eu(o.res);return!(s.returnObjects===!1&&l)}extractFromKey(e,t){let s=t.nsSeparator!==void 0?t.nsSeparator:this.options.nsSeparator;s===void 0&&(s=":");const o=t.keySeparator!==void 0?t.keySeparator:this.options.keySeparator;let l=t.ns||this.options.defaultNS||[];const u=s&&e.includes(s),h=!this.options.userDefinedKeySeparator&&!t.keySeparator&&!this.options.userDefinedNsSeparator&&!t.nsSeparator&&!yS(e,s,o);if(u&&!h){const p=e.match(this.interpolator.nestingRegexp);if(p&&p.length>0)return{key:e,namespaces:X(l)?[l]:l};const m=e.split(s);(s!==o||s===o&&this.options.ns.includes(m[0]))&&(l=m.shift()),e=m.join(o)}return{key:e,namespaces:X(l)?[l]:l}}translate(e,t,s){let o=typeof t=="object"?{...t}:t;if(typeof o!="object"&&this.options.overloadTranslationOptionHandler&&(o=this.options.overloadTranslationOptionHandler(arguments)),typeof o=="object"&&(o={...o}),o||(o={}),e==null)return"";typeof e=="function"&&(e=gi(e,{...this.options,...o})),Array.isArray(e)||(e=[String(e)]),e=e.map(q=>typeof q=="function"?gi(q,{...this.options,...o}):String(q));const l=o.returnDetails!==void 0?o.returnDetails:this.options.returnDetails,u=o.keySeparator!==void 0?o.keySeparator:this.options.keySeparator,{key:h,namespaces:p}=this.extractFromKey(e[e.length-1],o),m=p[p.length-1];let v=o.nsSeparator!==void 0?o.nsSeparator:this.options.nsSeparator;v===void 0&&(v=":");const _=o.lng||this.language,x=o.appendNamespaceToCIMode||this.options.appendNamespaceToCIMode;if((_==null?void 0:_.toLowerCase())==="cimode")return x?l?{res:`${m}${v}${h}`,usedKey:h,exactUsedKey:h,usedLng:_,usedNS:m,usedParams:this.getUsedParamsDetails(o)}:`${m}${v}${h}`:l?{res:h,usedKey:h,exactUsedKey:h,usedLng:_,usedNS:m,usedParams:this.getUsedParamsDetails(o)}:h;const I=this.resolve(e,o);let N=I==null?void 0:I.res;const b=(I==null?void 0:I.usedKey)||h,F=(I==null?void 0:I.exactUsedKey)||h,he=["[object Number]","[object Function]","[object RegExp]"],fe=o.joinArrays!==void 0?o.joinArrays:this.options.joinArrays,me=!this.i18nFormat||this.i18nFormat.handleAsObject,ne=o.count!==void 0&&!X(o.count),Ie=Aa.hasDefaultValue(o),De=ne?this.pluralResolver.getSuffix(_,o.count,o):"",Te=o.ordinal&&ne?this.pluralResolver.getSuffix(_,o.count,{ordinal:!1}):"",He=ne&&!o.ordinal&&o.count===0,Ae=He&&o[`defaultValue${this.options.pluralSeparator}zero`]||o[`defaultValue${De}`]||o[`defaultValue${Te}`]||o.defaultValue;let ve=N;me&&!N&&Ie&&(ve=Ae);const bt=Eu(ve),ie=Object.prototype.toString.apply(ve);if(me&&ve&&bt&&!he.includes(ie)&&!(X(fe)&&Array.isArray(ve))){if(!o.returnObjects&&!this.options.returnObjects){this.options.returnedObjectHandler||this.logger.warn("accessing an object - but returnObjects options is not enabled!");const q=this.options.returnedObjectHandler?this.options.returnedObjectHandler(b,ve,{...o,ns:p}):`key '${h} (${this.language})' returned an object instead of string.`;return l?(I.res=q,I.usedParams=this.getUsedParamsDetails(o),I):q}if(u){const q=Array.isArray(ve),ee=q?[]:{},we=q?F:b;for(const ue in ve)if(Object.prototype.hasOwnProperty.call(ve,ue)){const se=`${we}${u}${ue}`;Ie&&!N?ee[ue]=this.translate(se,{...o,defaultValue:Eu(Ae)?Ae[ue]:void 0,joinArrays:!1,ns:p}):ee[ue]=this.translate(se,{...o,joinArrays:!1,ns:p}),ee[ue]===se&&(ee[ue]=ve[ue])}N=ee}}else if(me&&X(fe)&&Array.isArray(N))N=N.join(fe),N&&(N=this.extendTranslation(N,e,o,s));else{let q=!1,ee=!1;!this.isValidLookup(N)&&Ie&&(q=!0,N=Ae),this.isValidLookup(N)||(ee=!0,N=h);const ue=(o.missingKeyNoValueFallbackToKey||this.options.missingKeyNoValueFallbackToKey)&&ee?void 0:N,se=Ie&&Ae!==N&&this.options.updateMissing;if(ee||q||se){if(this.logger.log(se?"updateKey":"missingKey",_,m,ne&&!se?`${h}${this.pluralResolver.getSuffix(_,o.count,o)}`:h,se?Ae:N),u){const C=this.resolve(h,{...o,keySeparator:!1});C&&C.res&&this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")}let j=[];const H=this.languageUtils.getFallbackCodes(this.options.fallbackLng,o.lng||this.language);if(this.options.saveMissingTo==="fallback"&&H&&H[0])for(let C=0;C<H.length;C++)j.push(H[C]);else this.options.saveMissingTo==="all"?j=this.languageUtils.toResolveHierarchy(o.lng||this.language):j.push(o.lng||this.language);const z=(C,P,Z)=>{var de;const re=Ie&&Z!==N?Z:ue;this.options.missingKeyHandler?this.options.missingKeyHandler(C,m,P,re,se,o):(de=this.backendConnector)!=null&&de.saveMissing&&this.backendConnector.saveMissing(C,m,P,re,se,o),this.emit("missingKey",C,m,P,N)};this.options.saveMissing&&(this.options.saveMissingPlurals&&ne?j.forEach(C=>{const P=this.pluralResolver.getSuffixes(C,o);He&&o[`defaultValue${this.options.pluralSeparator}zero`]&&!P.includes(`${this.options.pluralSeparator}zero`)&&P.push(`${this.options.pluralSeparator}zero`),P.forEach(Z=>{z([C],h+Z,o[`defaultValue${Z}`]||Ae)})}):z(j,h,Ae))}N=this.extendTranslation(N,e,o,I,s),ee&&N===h&&this.options.appendNamespaceToMissingKey&&(N=`${m}${v}${h}`),(ee||q)&&this.options.parseMissingKeyHandler&&(N=this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey?`${m}${v}${h}`:h,q?N:void 0,o))}return l?(I.res=N,I.usedParams=this.getUsedParamsDetails(o),I):N}extendTranslation(e,t,s,o,l){var p,m;if((p=this.i18nFormat)!=null&&p.parse)e=this.i18nFormat.parse(e,{...this.options.interpolation.defaultVariables,...s},s.lng||this.language||o.usedLng,o.usedNS,o.usedKey,{resolved:o});else if(!s.skipInterpolation){s.interpolation&&this.interpolator.init({...s,interpolation:{...this.options.interpolation,...s.interpolation}});const v=X(e)&&(((m=s==null?void 0:s.interpolation)==null?void 0:m.skipOnVariables)!==void 0?s.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables);let _;if(v){const I=e.match(this.interpolator.nestingRegexp);_=I&&I.length}let x=s.replace&&!X(s.replace)?s.replace:s;if(this.options.interpolation.defaultVariables&&(x={...this.options.interpolation.defaultVariables,...x}),e=this.interpolator.interpolate(e,x,s.lng||this.language||o.usedLng,s),v){const I=e.match(this.interpolator.nestingRegexp),N=I&&I.length;_<N&&(s.nest=!1)}!s.lng&&o&&o.res&&(s.lng=this.language||o.usedLng),s.nest!==!1&&(e=this.interpolator.nest(e,(...I)=>(l==null?void 0:l[0])===I[0]&&!s.context?(this.logger.warn(`It seems you are nesting recursively key: ${I[0]} in key: ${t[0]}`),null):this.translate(...I,t),s)),s.interpolation&&this.interpolator.reset()}const u=s.postProcess||this.options.postProcess,h=X(u)?[u]:u;return e!=null&&(h!=null&&h.length)&&s.applyPostProcessor!==!1&&(e=Cy.handle(h,e,t,this.options&&this.options.postProcessPassResolved?{i18nResolved:{...o,usedParams:this.getUsedParamsDetails(s)},...s}:s,this)),e}resolve(e,t={}){let s,o,l,u,h;return X(e)&&(e=[e]),Array.isArray(e)&&(e=e.map(p=>typeof p=="function"?gi(p,{...this.options,...t}):p)),e.forEach(p=>{if(this.isValidLookup(s))return;const m=this.extractFromKey(p,t),v=m.key;o=v;let _=m.namespaces;this.options.fallbackNS&&(_=_.concat(this.options.fallbackNS));const x=t.count!==void 0&&!X(t.count),I=x&&!t.ordinal&&t.count===0,N=t.context!==void 0&&(X(t.context)||typeof t.context=="number")&&t.context!=="",b=t.lngs?t.lngs:this.languageUtils.toResolveHierarchy(t.lng||this.language,t.fallbackLng);_.forEach(F=>{var he,fe;this.isValidLookup(s)||(h=F,!this.checkedLoadedFor[`${b[0]}-${F}`]&&((he=this.utils)!=null&&he.hasLoadedNamespace)&&!((fe=this.utils)!=null&&fe.hasLoadedNamespace(h))&&(this.checkedLoadedFor[`${b[0]}-${F}`]=!0,this.logger.warn(`key "${o}" for languages "${b.join(", ")}" won't get resolved as namespace "${h}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")),b.forEach(me=>{var De;if(this.isValidLookup(s))return;u=me;const ne=[v];if((De=this.i18nFormat)!=null&&De.addLookupKeys)this.i18nFormat.addLookupKeys(ne,v,me,F,t);else{let Te;x&&(Te=this.pluralResolver.getSuffix(me,t.count,t));const He=`${this.options.pluralSeparator}zero`,Ae=`${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;if(x&&(t.ordinal&&Te.startsWith(Ae)&&ne.push(v+Te.replace(Ae,this.options.pluralSeparator)),ne.push(v+Te),I&&ne.push(v+He)),N){const ve=`${v}${this.options.contextSeparator||"_"}${t.context}`;ne.push(ve),x&&(t.ordinal&&Te.startsWith(Ae)&&ne.push(ve+Te.replace(Ae,this.options.pluralSeparator)),ne.push(ve+Te),I&&ne.push(ve+He))}}let Ie;for(;Ie=ne.pop();)this.isValidLookup(s)||(l=Ie,s=this.getResource(me,F,Ie,t))}))})}),{res:s,usedKey:o,exactUsedKey:l,usedLng:u,usedNS:h}}isValidLookup(e){return e!==void 0&&!(!this.options.returnNull&&e===null)&&!(!this.options.returnEmptyString&&e==="")}getResource(e,t,s,o={}){var l;return(l=this.i18nFormat)!=null&&l.getResource?this.i18nFormat.getResource(e,t,s,o):this.resourceStore.getResource(e,t,s,o)}getUsedParamsDetails(e={}){const t=["defaultValue","ordinal","context","replace","lng","lngs","fallbackLng","ns","keySeparator","nsSeparator","returnObjects","returnDetails","joinArrays","postProcess","interpolation"],s=e.replace&&!X(e.replace);let o=s?e.replace:e;if(s&&typeof e.count<"u"&&(o.count=e.count),this.options.interpolation.defaultVariables&&(o={...this.options.interpolation.defaultVariables,...o}),!s){o={...o};for(const l of t)delete o[l]}return o}static hasDefaultValue(e){const t="defaultValue";for(const s in e)if(Object.prototype.hasOwnProperty.call(e,s)&&s.startsWith(t)&&e[s]!==void 0)return!0;return!1}}class Fm{constructor(e){this.options=e,this.supportedLngs=this.options.supportedLngs||!1,this.logger=an.create("languageUtils")}getScriptPartFromCode(e){if(e=$s(e),!e||!e.includes("-"))return null;const t=e.split("-");return t.length===2||(t.pop(),t[t.length-1].toLowerCase()==="x")?null:this.formatLanguageCode(t.join("-"))}getLanguagePartFromCode(e){if(e=$s(e),!e||!e.includes("-"))return e;const t=e.split("-");return this.formatLanguageCode(t[0])}formatLanguageCode(e){if(X(e)&&e.includes("-")){let t;try{t=Intl.getCanonicalLocales(e)[0]}catch{}return t&&this.options.lowerCaseLng&&(t=t.toLowerCase()),t||(this.options.lowerCaseLng?e.toLowerCase():e)}return this.options.cleanCode||this.options.lowerCaseLng?e.toLowerCase():e}isSupportedCode(e){return(this.options.load==="languageOnly"||this.options.nonExplicitSupportedLngs)&&(e=this.getLanguagePartFromCode(e)),!this.supportedLngs||!this.supportedLngs.length||this.supportedLngs.includes(e)}getBestMatchFromCodes(e){if(!e)return null;let t;return e.forEach(s=>{if(t)return;const o=this.formatLanguageCode(s);(!this.options.supportedLngs||this.isSupportedCode(o))&&(t=o)}),!t&&this.options.supportedLngs&&e.forEach(s=>{if(t)return;const o=this.getScriptPartFromCode(s);if(this.isSupportedCode(o))return t=o;const l=this.getLanguagePartFromCode(s);if(this.isSupportedCode(l))return t=l;t=this.options.supportedLngs.find(u=>u===l?!0:!u.includes("-")&&!l.includes("-")?!1:!!(u.includes("-")&&!l.includes("-")&&u.slice(0,u.indexOf("-"))===l||u.startsWith(l)&&l.length>1))}),t||(t=this.getFallbackCodes(this.options.fallbackLng)[0]),t}getFallbackCodes(e,t){if(!e)return[];if(typeof e=="function"&&(e=e(t)),X(e)&&(e=[e]),Array.isArray(e))return e;if(!t)return e.default||[];let s=e[t];return s||(s=e[this.getScriptPartFromCode(t)]),s||(s=e[this.formatLanguageCode(t)]),s||(s=e[this.getLanguagePartFromCode(t)]),s||(s=e.default),s||[]}toResolveHierarchy(e,t){const s=this.getFallbackCodes((t===!1?[]:t)||this.options.fallbackLng||[],e),o=[],l=u=>{u&&(this.isSupportedCode(u)?o.push(u):this.logger.warn(`rejecting language code not found in supportedLngs: ${u}`))};return X(e)&&(e.includes("-")||e.includes("_"))?(this.options.load!=="languageOnly"&&l(this.formatLanguageCode(e)),this.options.load!=="languageOnly"&&this.options.load!=="currentOnly"&&l(this.getScriptPartFromCode(e)),this.options.load!=="currentOnly"&&l(this.getLanguagePartFromCode(e))):X(e)&&l(this.formatLanguageCode(e)),s.forEach(u=>{o.includes(u)||l(this.formatLanguageCode(u))}),o}}const Um={zero:0,one:1,two:2,few:3,many:4,other:5},zm={select:r=>r===1?"one":"other",resolvedOptions:()=>({pluralCategories:["one","other"]})};class xS{constructor(e,t={}){this.languageUtils=e,this.options=t,this.logger=an.create("pluralResolver"),this.pluralRulesCache={}}clearCache(){this.pluralRulesCache={}}getRule(e,t={}){const s=$s(e==="dev"?"en":e),o=t.ordinal?"ordinal":"cardinal",l=JSON.stringify({cleanedCode:s,type:o});if(l in this.pluralRulesCache)return this.pluralRulesCache[l];let u;try{u=new Intl.PluralRules(s,{type:o})}catch{if(typeof Intl>"u")return this.logger.error("No Intl support, please use an Intl polyfill!"),zm;if(!e.match(/-|_/))return zm;const p=this.languageUtils.getLanguagePartFromCode(e);u=this.getRule(p,t)}return this.pluralRulesCache[l]=u,u}needsPlural(e,t={}){let s=this.getRule(e,t);return s||(s=this.getRule("dev",t)),(s==null?void 0:s.resolvedOptions().pluralCategories.length)>1}getPluralFormsOfKey(e,t,s={}){return this.getSuffixes(e,s).map(o=>`${t}${o}`)}getSuffixes(e,t={}){let s=this.getRule(e,t);return s||(s=this.getRule("dev",t)),s?s.resolvedOptions().pluralCategories.sort((o,l)=>Um[o]-Um[l]).map(o=>`${this.options.prepend}${t.ordinal?`ordinal${this.options.prepend}`:""}${o}`):[]}getSuffix(e,t,s={}){const o=this.getRule(e,s);return o?`${this.options.prepend}${s.ordinal?`ordinal${this.options.prepend}`:""}${o.select(t)}`:(this.logger.warn(`no plural rule found for: ${e}`),this.getSuffix("dev",t,s))}}const $m=(r,e,t,s=".",o=!0)=>{let l=dS(r,e,t);return!l&&o&&X(t)&&(l=Yu(r,t,s),l===void 0&&(l=Yu(e,t,s))),l},Cu=r=>r.replace(/\$/g,"$$$$");class Vm{constructor(e={}){var t;this.logger=an.create("interpolator"),this.options=e,this.format=((t=e==null?void 0:e.interpolation)==null?void 0:t.format)||(s=>s),this.init(e)}init(e={}){e.interpolation||(e.interpolation={escapeValue:!0});const{escape:t,escapeValue:s,useRawValueToEscape:o,prefix:l,prefixEscaped:u,suffix:h,suffixEscaped:p,formatSeparator:m,unescapeSuffix:v,unescapePrefix:_,nestingPrefix:x,nestingPrefixEscaped:I,nestingSuffix:N,nestingSuffixEscaped:b,nestingOptionsSeparator:F,maxReplaces:he,alwaysFormat:fe}=e.interpolation;this.escape=t!==void 0?t:fS,this.escapeValue=s!==void 0?s:!0,this.useRawValueToEscape=o!==void 0?o:!1,this.prefix=l?xn(l):u||"{{",this.suffix=h?xn(h):p||"}}",this.formatSeparator=m||",",this.unescapePrefix=v?"":_?xn(_):"-",this.unescapeSuffix=this.unescapePrefix?"":v?xn(v):"",this.nestingPrefix=x?xn(x):I||xn("$t("),this.nestingSuffix=N?xn(N):b||xn(")"),this.nestingOptionsSeparator=F||",",this.maxReplaces=he||1e3,this.alwaysFormat=fe!==void 0?fe:!1,this.resetRegExp()}reset(){this.options&&this.init(this.options)}resetRegExp(){const e=(t,s)=>(t==null?void 0:t.source)===s?(t.lastIndex=0,t):new RegExp(s,"g");this.regexp=e(this.regexp,`${this.prefix}(.+?)${this.suffix}`),this.regexpUnescape=e(this.regexpUnescape,`${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`),this.nestingRegexp=e(this.nestingRegexp,`${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`)}interpolate(e,t,s,o){var I;let l,u,h;const p=this.options&&this.options.interpolation&&this.options.interpolation.defaultVariables||{},m=N=>{if(!N.includes(this.formatSeparator)){const fe=$m(t,p,N,this.options.keySeparator,this.options.ignoreJSONStructure);return this.alwaysFormat?this.format(fe,void 0,s,{...o,...t,interpolationkey:N}):fe}const b=N.split(this.formatSeparator),F=b.shift().trim(),he=b.join(this.formatSeparator).trim();return this.format($m(t,p,F,this.options.keySeparator,this.options.ignoreJSONStructure),he,s,{...o,...t,interpolationkey:F})};this.resetRegExp(),!this.escapeValue&&typeof e=="string"&&/\$t\([^)]*\{[^}]*\{\{/.test(e)&&this.logger.warn("nesting options string contains interpolated variables with escapeValue: false — if any of those values are attacker-controlled they can inject additional nesting options (e.g. redirect lng/ns). Sanitise untrusted input before passing it to t(), or keep escapeValue: true.");const v=(o==null?void 0:o.missingInterpolationHandler)||this.options.missingInterpolationHandler,_=((I=o==null?void 0:o.interpolation)==null?void 0:I.skipOnVariables)!==void 0?o.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables;return[{regex:this.regexpUnescape,safeValue:N=>Cu(N)},{regex:this.regexp,safeValue:N=>this.escapeValue?Cu(this.escape(N)):Cu(N)}].forEach(N=>{for(h=0;l=N.regex.exec(e);){const b=l[1].trim();if(u=m(b),u===void 0)if(typeof v=="function"){const he=v(e,l,o);u=X(he)?he:""}else if(o&&Object.prototype.hasOwnProperty.call(o,b))u="";else if(_){u=l[0];continue}else this.logger.warn(`missed to pass in variable ${b} for interpolating ${e}`),u="";else!X(u)&&!this.useRawValueToEscape&&(u=Om(u));const F=N.safeValue(u);if(e=e.replace(l[0],F),_?(N.regex.lastIndex+=u.length,N.regex.lastIndex-=l[0].length):N.regex.lastIndex=0,h++,h>=this.maxReplaces)break}}),e}nest(e,t,s={}){let o,l,u;const h=(p,m)=>{const v=this.nestingOptionsSeparator;if(!p.includes(v))return p;const _=p.split(new RegExp(`${xn(v)}[ ]*{`));let x=`{${_[1]}`;p=_[0],x=this.interpolate(x,u);const I=x.match(/'/g),N=x.match(/"/g);(((I==null?void 0:I.length)??0)%2===0&&!N||((N==null?void 0:N.length)??0)%2!==0)&&(x=x.replace(/'/g,'"'));try{u=JSON.parse(x),m&&(u={...m,...u})}catch(b){return this.logger.warn(`failed parsing options string in nesting for key ${p}`,b),`${p}${v}${x}`}return u.defaultValue&&u.defaultValue.includes(this.prefix)&&delete u.defaultValue,p};for(;o=this.nestingRegexp.exec(e);){let p=[];u={...s},u=u.replace&&!X(u.replace)?u.replace:u,u.applyPostProcessor=!1,delete u.defaultValue;const m=/{.*}/.test(o[1])?o[1].lastIndexOf("}")+1:o[1].indexOf(this.formatSeparator);if(m!==-1&&(p=o[1].slice(m).split(this.formatSeparator).map(v=>v.trim()).filter(Boolean),o[1]=o[1].slice(0,m)),l=t(h.call(this,o[1].trim(),u),u),l&&o[0]===e&&!X(l))return l;X(l)||(l=Om(l)),l||(this.logger.warn(`missed to resolve ${o[1]} for nesting ${e}`),l=""),p.length&&(l=p.reduce((v,_)=>this.format(v,_,s.lng,{...s,interpolationkey:o[1].trim()}),l.trim())),e=e.replace(o[0],l),this.regexp.lastIndex=0}return e}}const SS=r=>{let e=r.toLowerCase().trim();const t={};if(r.includes("(")){const s=r.split("(");e=s[0].toLowerCase().trim();const o=s[1].slice(0,-1);e==="currency"&&!o.includes(":")?t.currency||(t.currency=o.trim()):e==="relativetime"&&!o.includes(":")?t.range||(t.range=o.trim()):o.split(";").forEach(u=>{if(u){const[h,...p]=u.split(":"),m=p.join(":").trim().replace(/^'+|'+$/g,""),v=h.trim();t[v]||(t[v]=m),m==="false"&&(t[v]=!1),m==="true"&&(t[v]=!0),isNaN(m)||(t[v]=parseInt(m,10))}})}return{formatName:e,formatOptions:t}},Bm=r=>{const e={};return(t,s,o)=>{let l=o;o&&o.interpolationkey&&o.formatParams&&o.formatParams[o.interpolationkey]&&o[o.interpolationkey]&&(l={...l,[o.interpolationkey]:void 0});const u=s+JSON.stringify(l);let h=e[u];return h||(h=r($s(s),o),e[u]=h),h(t)}},ES=r=>(e,t,s)=>r($s(t),s)(e);class CS{constructor(e={}){this.logger=an.create("formatter"),this.options=e,this.init(e)}init(e,t={interpolation:{}}){this.formatSeparator=t.interpolation.formatSeparator||",";const s=t.cacheInBuiltFormats?Bm:ES;this.formats={number:s((o,l)=>{const u=new Intl.NumberFormat(o,{...l});return h=>u.format(h)}),currency:s((o,l)=>{const u=new Intl.NumberFormat(o,{...l,style:"currency"});return h=>u.format(h)}),datetime:s((o,l)=>{const u=new Intl.DateTimeFormat(o,{...l});return h=>u.format(h)}),relativetime:s((o,l)=>{const u=new Intl.RelativeTimeFormat(o,{...l});return h=>u.format(h,l.range||"day")}),list:s((o,l)=>{const u=new Intl.ListFormat(o,{...l});return h=>u.format(h)})}}add(e,t){this.formats[e.toLowerCase().trim()]=t}addCached(e,t){this.formats[e.toLowerCase().trim()]=Bm(t)}format(e,t,s,o={}){if(!t||e==null)return e;const l=t.split(this.formatSeparator);if(l.length>1&&l[0].indexOf("(")>1&&!l[0].includes(")")&&l.find(h=>h.includes(")"))){const h=l.findIndex(p=>p.includes(")"));l[0]=[l[0],...l.splice(1,h)].join(this.formatSeparator)}return l.reduce((h,p)=>{var _;const{formatName:m,formatOptions:v}=SS(p);if(this.formats[m]){let x=h;try{const I=((_=o==null?void 0:o.formatParams)==null?void 0:_[o.interpolationkey])||{},N=I.locale||I.lng||o.locale||o.lng||s;x=this.formats[m](h,N,{...v,...o,...I})}catch(I){this.logger.warn(I)}return x}else this.logger.warn(`there was no format function for ${m}`);return h},e)}}const kS=(r,e)=>{r.pending[e]!==void 0&&(delete r.pending[e],r.pendingCount--)};class IS extends il{constructor(e,t,s,o={}){var l,u;super(),this.backend=e,this.store=t,this.services=s,this.languageUtils=s.languageUtils,this.options=o,this.logger=an.create("backendConnector"),this.waitingReads=[],this.maxParallelReads=o.maxParallelReads||10,this.readingCalls=0,this.maxRetries=o.maxRetries>=0?o.maxRetries:5,this.retryTimeout=o.retryTimeout>=1?o.retryTimeout:350,this.state={},this.queue=[],(u=(l=this.backend)==null?void 0:l.init)==null||u.call(l,s,o.backend,o)}queueLoad(e,t,s,o){const l={},u={},h={},p={};return e.forEach(m=>{let v=!0;t.forEach(_=>{const x=`${m}|${_}`;!s.reload&&this.store.hasResourceBundle(m,_)?this.state[x]=2:this.state[x]<0||(this.state[x]===1?u[x]===void 0&&(u[x]=!0):(this.state[x]=1,v=!1,u[x]===void 0&&(u[x]=!0),l[x]===void 0&&(l[x]=!0),p[_]===void 0&&(p[_]=!0)))}),v||(h[m]=!0)}),(Object.keys(l).length||Object.keys(u).length)&&this.queue.push({pending:u,pendingCount:Object.keys(u).length,loaded:{},errors:[],callback:o}),{toLoad:Object.keys(l),pending:Object.keys(u),toLoadLanguages:Object.keys(h),toLoadNamespaces:Object.keys(p)}}loaded(e,t,s){const o=e.split("|"),l=o[0],u=o[1];t&&this.emit("failedLoading",l,u,t),!t&&s&&this.store.addResourceBundle(l,u,s,void 0,void 0,{skipCopy:!0}),this.state[e]=t?-1:2,t&&s&&(this.state[e]=0);const h={};this.queue.forEach(p=>{uS(p.loaded,[l],u),kS(p,e),t&&p.errors.push(t),p.pendingCount===0&&!p.done&&(Object.keys(p.loaded).forEach(m=>{h[m]||(h[m]={});const v=p.loaded[m];v.length&&v.forEach(_=>{h[m][_]===void 0&&(h[m][_]=!0)})}),p.done=!0,p.errors.length?p.callback(p.errors):p.callback())}),this.emit("loaded",h),this.queue=this.queue.filter(p=>!p.done)}read(e,t,s,o=0,l=this.retryTimeout,u){if(!e.length)return u(null,{});if(this.readingCalls>=this.maxParallelReads){this.waitingReads.push({lng:e,ns:t,fcName:s,tried:o,wait:l,callback:u});return}this.readingCalls++;const h=(m,v)=>{if(this.readingCalls--,this.waitingReads.length>0){const _=this.waitingReads.shift();this.read(_.lng,_.ns,_.fcName,_.tried,_.wait,_.callback)}if(m&&v&&o<this.maxRetries){setTimeout(()=>{this.read(e,t,s,o+1,l*2,u)},l);return}u(m,v)},p=this.backend[s].bind(this.backend);if(p.length===2){try{const m=p(e,t);m&&typeof m.then=="function"?m.then(v=>h(null,v)).catch(h):h(null,m)}catch(m){h(m)}return}return p(e,t,h)}prepareLoading(e,t,s={},o){if(!this.backend)return this.logger.warn("No backend was added via i18next.use. Will not load resources."),o&&o();X(e)&&(e=this.languageUtils.toResolveHierarchy(e)),X(t)&&(t=[t]);const l=this.queueLoad(e,t,s,o);if(!l.toLoad.length)return l.pending.length||o(),null;l.toLoad.forEach(u=>{this.loadOne(u)})}load(e,t,s){this.prepareLoading(e,t,{},s)}reload(e,t,s){this.prepareLoading(e,t,{reload:!0},s)}loadOne(e,t=""){const s=e.split("|"),o=s[0],l=s[1];this.read(o,l,"read",void 0,void 0,(u,h)=>{u&&this.logger.warn(`${t}loading namespace ${l} for language ${o} failed`,u),!u&&h&&this.logger.log(`${t}loaded namespace ${l} for language ${o}`,h),this.loaded(e,u,h)})}saveMissing(e,t,s,o,l,u={},h=()=>{}){var p,m,v,_,x;if((m=(p=this.services)==null?void 0:p.utils)!=null&&m.hasLoadedNamespace&&!((_=(v=this.services)==null?void 0:v.utils)!=null&&_.hasLoadedNamespace(t))){this.logger.warn(`did not save key "${s}" as the namespace "${t}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");return}if(!(s==null||s==="")){if((x=this.backend)!=null&&x.create){const I={...u,isUpdate:l},N=this.backend.create.bind(this.backend);if(N.length<6)try{let b;N.length===5?b=N(e,t,s,o,I):b=N(e,t,s,o),b&&typeof b.then=="function"?b.then(F=>h(null,F)).catch(h):h(null,b)}catch(b){h(b)}else N(e,t,s,o,h,I)}!e||!e[0]||this.store.addResource(e[0],t,s,o)}}}const ku=()=>({debug:!1,initAsync:!0,ns:["translation"],defaultNS:["translation"],fallbackLng:["dev"],fallbackNS:!1,supportedLngs:!1,nonExplicitSupportedLngs:!1,load:"all",preload:!1,keySeparator:".",nsSeparator:":",pluralSeparator:"_",contextSeparator:"_",enableSelector:!1,partialBundledLanguages:!1,saveMissing:!1,updateMissing:!1,saveMissingTo:"fallback",saveMissingPlurals:!0,missingKeyHandler:!1,missingInterpolationHandler:!1,postProcess:!1,postProcessPassResolved:!1,returnNull:!1,returnEmptyString:!0,returnObjects:!1,joinArrays:!1,returnedObjectHandler:!1,parseMissingKeyHandler:!1,appendNamespaceToMissingKey:!1,appendNamespaceToCIMode:!1,overloadTranslationOptionHandler:r=>{let e={};if(typeof r[1]=="object"&&(e=r[1]),X(r[1])&&(e.defaultValue=r[1]),X(r[2])&&(e.tDescription=r[2]),typeof r[2]=="object"||typeof r[3]=="object"){const t=r[3]||r[2];Object.keys(t).forEach(s=>{e[s]=t[s]})}return e},interpolation:{escapeValue:!0,prefix:"{{",suffix:"}}",formatSeparator:",",unescapePrefix:"-",nestingPrefix:"$t(",nestingSuffix:")",nestingOptionsSeparator:",",maxReplaces:1e3,skipOnVariables:!0},cacheInBuiltFormats:!0}),Wm=r=>(X(r.ns)&&(r.ns=[r.ns]),X(r.fallbackLng)&&(r.fallbackLng=[r.fallbackLng]),X(r.fallbackNS)&&(r.fallbackNS=[r.fallbackNS]),r.supportedLngs&&!r.supportedLngs.includes("cimode")&&(r.supportedLngs=r.supportedLngs.concat(["cimode"])),r),xa=()=>{},TS=r=>{Object.getOwnPropertyNames(Object.getPrototypeOf(r)).forEach(t=>{typeof r[t]=="function"&&(r[t]=r[t].bind(r))})};class As extends il{constructor(e={},t){if(super(),this.options=Wm(e),this.services={},this.logger=an,this.modules={external:[]},TS(this),t&&!this.isInitialized&&!e.isClone){if(!this.options.initAsync)return this.init(e,t),this;setTimeout(()=>{this.init(e,t)},0)}}init(e={},t){this.isInitializing=!0,typeof e=="function"&&(t=e,e={}),e.defaultNS==null&&e.ns&&(X(e.ns)?e.defaultNS=e.ns:e.ns.includes("translation")||(e.defaultNS=e.ns[0]));const s=ku();this.options={...s,...this.options,...Wm(e)},this.options.interpolation={...s.interpolation,...this.options.interpolation},e.keySeparator!==void 0&&(this.options.userDefinedKeySeparator=e.keySeparator),e.nsSeparator!==void 0&&(this.options.userDefinedNsSeparator=e.nsSeparator),typeof this.options.overloadTranslationOptionHandler!="function"&&(this.options.overloadTranslationOptionHandler=s.overloadTranslationOptionHandler);const o=m=>m?typeof m=="function"?new m:m:null;if(!this.options.isClone){this.modules.logger?an.init(o(this.modules.logger),this.options):an.init(null,this.options);let m;this.modules.formatter?m=this.modules.formatter:m=CS;const v=new Fm(this.options);this.store=new jm(this.options.resources,this.options);const _=this.services;_.logger=an,_.resourceStore=this.store,_.languageUtils=v,_.pluralResolver=new xS(v,{prepend:this.options.pluralSeparator}),m&&(_.formatter=o(m),_.formatter.init&&_.formatter.init(_,this.options),this.options.interpolation.format=_.formatter.format.bind(_.formatter)),_.interpolator=new Vm(this.options),_.utils={hasLoadedNamespace:this.hasLoadedNamespace.bind(this)},_.backendConnector=new IS(o(this.modules.backend),_.resourceStore,_,this.options),_.backendConnector.on("*",(x,...I)=>{this.emit(x,...I)}),this.modules.languageDetector&&(_.languageDetector=o(this.modules.languageDetector),_.languageDetector.init&&_.languageDetector.init(_,this.options.detection,this.options)),this.modules.i18nFormat&&(_.i18nFormat=o(this.modules.i18nFormat),_.i18nFormat.init&&_.i18nFormat.init(this)),this.translator=new Aa(this.services,this.options),this.translator.on("*",(x,...I)=>{this.emit(x,...I)}),this.modules.external.forEach(x=>{x.init&&x.init(this)})}if(this.format=this.options.interpolation.format,t||(t=xa),this.options.fallbackLng&&!this.services.languageDetector&&!this.options.lng){const m=this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);m.length>0&&m[0]!=="dev"&&(this.options.lng=m[0])}!this.services.languageDetector&&!this.options.lng&&this.logger.warn("init: no languageDetector is used and no lng is defined"),["getResource","hasResourceBundle","getResourceBundle","getDataByLanguage"].forEach(m=>{this[m]=(...v)=>this.store[m](...v)}),["addResource","addResources","addResourceBundle","removeResourceBundle"].forEach(m=>{this[m]=(...v)=>(this.store[m](...v),this)});const h=Es(),p=()=>{const m=(v,_)=>{this.isInitializing=!1,this.isInitialized&&!this.initializedStoreOnce&&this.logger.warn("init: i18next is already initialized. You should call init just once!"),this.isInitialized=!0,this.options.isClone||this.logger.log("initialized",this.options),this.emit("initialized",this.options),h.resolve(_),t(v,_)};if((this.languages||this.isLanguageChangingTo)&&!this.isInitialized)return m(null,this.t.bind(this));this.changeLanguage(this.options.lng,m)};return this.options.resources||!this.options.initAsync?p():setTimeout(p,0),h}loadResources(e,t=xa){var l,u;let s=t;const o=X(e)?e:this.language;if(typeof e=="function"&&(s=e),!this.options.resources||this.options.partialBundledLanguages){if((o==null?void 0:o.toLowerCase())==="cimode"&&(!this.options.preload||this.options.preload.length===0))return s();const h=[],p=m=>{if(!m||m==="cimode")return;this.services.languageUtils.toResolveHierarchy(m).forEach(_=>{_!=="cimode"&&(h.includes(_)||h.push(_))})};o?p(o):this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(v=>p(v)),(u=(l=this.options.preload)==null?void 0:l.forEach)==null||u.call(l,m=>p(m)),this.services.backendConnector.load(h,this.options.ns,m=>{!m&&!this.resolvedLanguage&&this.language&&this.setResolvedLanguage(this.language),s(m)})}else s(null)}reloadResources(e,t,s){const o=Es();return typeof e=="function"&&(s=e,e=void 0),typeof t=="function"&&(s=t,t=void 0),e||(e=this.languages),t||(t=this.options.ns),s||(s=xa),this.services.backendConnector.reload(e,t,l=>{o.resolve(),s(l)}),o}use(e){if(!e)throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");if(!e.type)throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");return e.type==="backend"&&(this.modules.backend=e),(e.type==="logger"||e.log&&e.warn&&e.error)&&(this.modules.logger=e),e.type==="languageDetector"&&(this.modules.languageDetector=e),e.type==="i18nFormat"&&(this.modules.i18nFormat=e),e.type==="postProcessor"&&Cy.addPostProcessor(e),e.type==="formatter"&&(this.modules.formatter=e),e.type==="3rdParty"&&this.modules.external.push(e),this}setResolvedLanguage(e){if(!(!e||!this.languages)&&!["cimode","dev"].includes(e)){for(let t=0;t<this.languages.length;t++){const s=this.languages[t];if(!["cimode","dev"].includes(s)&&this.store.hasLanguageSomeTranslations(s)){this.resolvedLanguage=s;break}}!this.resolvedLanguage&&!this.languages.includes(e)&&this.store.hasLanguageSomeTranslations(e)&&(this.resolvedLanguage=e,this.languages.unshift(e))}}changeLanguage(e,t){this.isLanguageChangingTo=e;const s=Es();this.emit("languageChanging",e);const o=h=>{this.language=h,this.languages=this.services.languageUtils.toResolveHierarchy(h),this.resolvedLanguage=void 0,this.setResolvedLanguage(h)},l=(h,p)=>{p?this.isLanguageChangingTo===e&&(o(p),this.translator.changeLanguage(p),this.isLanguageChangingTo=void 0,this.emit("languageChanged",p),this.logger.log("languageChanged",p)):this.isLanguageChangingTo=void 0,s.resolve((...m)=>this.t(...m)),t&&t(h,(...m)=>this.t(...m))},u=h=>{var v,_;!e&&!h&&this.services.languageDetector&&(h=[]);const p=X(h)?h:h&&h[0],m=this.store.hasLanguageSomeTranslations(p)?p:this.services.languageUtils.getBestMatchFromCodes(X(h)?[h]:h);m&&(this.language||o(m),this.translator.language||this.translator.changeLanguage(m),(_=(v=this.services.languageDetector)==null?void 0:v.cacheUserLanguage)==null||_.call(v,m)),this.loadResources(m,x=>{l(x,m)})};return!e&&this.services.languageDetector&&!this.services.languageDetector.async?u(this.services.languageDetector.detect()):!e&&this.services.languageDetector&&this.services.languageDetector.async?this.services.languageDetector.detect.length===0?this.services.languageDetector.detect().then(u):this.services.languageDetector.detect(u):u(e),s}getFixedT(e,t,s,o){const l=o==null?void 0:o.scopeNs,u=(h,p,...m)=>{let v;typeof p!="object"?v=this.options.overloadTranslationOptionHandler([h,p].concat(m)):v={...p},v.lng=v.lng||u.lng,v.lngs=v.lngs||u.lngs;const _=v.ns!==void 0&&v.ns!==null;v.ns=v.ns||u.ns,v.keyPrefix!==""&&(v.keyPrefix=v.keyPrefix||s||u.keyPrefix);const x={...this.options,...v};Array.isArray(l)&&!_&&(x.ns=l),typeof v.keyPrefix=="function"&&(v.keyPrefix=gi(v.keyPrefix,x));const I=this.options.keySeparator||".";let N;return v.keyPrefix&&Array.isArray(h)?N=h.map(b=>(typeof b=="function"&&(b=gi(b,x)),`${v.keyPrefix}${I}${b}`)):(typeof h=="function"&&(h=gi(h,x)),N=v.keyPrefix?`${v.keyPrefix}${I}${h}`:h),this.t(N,v)};return X(e)?u.lng=e:u.lngs=e,u.ns=t,u.keyPrefix=s,u}t(...e){var t;return(t=this.translator)==null?void 0:t.translate(...e)}exists(...e){var t;return(t=this.translator)==null?void 0:t.exists(...e)}setDefaultNamespace(e){this.options.defaultNS=e}hasLoadedNamespace(e,t={}){if(!this.isInitialized)return this.logger.warn("hasLoadedNamespace: i18next was not initialized",this.languages),!1;if(!this.languages||!this.languages.length)return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty",this.languages),!1;const s=t.lng||this.resolvedLanguage||this.languages[0],o=this.options?this.options.fallbackLng:!1,l=this.languages[this.languages.length-1];if(s.toLowerCase()==="cimode")return!0;const u=(h,p)=>{const m=this.services.backendConnector.state[`${h}|${p}`];return m===-1||m===0||m===2};if(t.precheck){const h=t.precheck(this,u);if(h!==void 0)return h}return!!(this.hasResourceBundle(s,e)||!this.services.backendConnector.backend||this.options.resources&&!this.options.partialBundledLanguages||u(s,e)&&(!o||u(l,e)))}loadNamespaces(e,t){const s=Es();return this.options.ns?(X(e)&&(e=[e]),e.forEach(o=>{this.options.ns.includes(o)||this.options.ns.push(o)}),this.loadResources(o=>{s.resolve(),t&&t(o)}),s):(t&&t(),Promise.resolve())}loadLanguages(e,t){const s=Es();X(e)&&(e=[e]);const o=this.options.preload||[],l=e.filter(u=>!o.includes(u)&&this.services.languageUtils.isSupportedCode(u));return l.length?(this.options.preload=o.concat(l),this.loadResources(u=>{s.resolve(),t&&t(u)}),s):(t&&t(),Promise.resolve())}dir(e){var o,l;if(e||(e=this.resolvedLanguage||(((o=this.languages)==null?void 0:o.length)>0?this.languages[0]:this.language)),!e)return"rtl";try{const u=new Intl.Locale(e);if(u&&u.getTextInfo){const h=u.getTextInfo();if(h&&h.direction)return h.direction}}catch{}const t=["ar","shu","sqr","ssh","xaa","yhd","yud","aao","abh","abv","acm","acq","acw","acx","acy","adf","ads","aeb","aec","afb","ajp","apc","apd","arb","arq","ars","ary","arz","auz","avl","ayh","ayl","ayn","ayp","bbz","pga","he","iw","ps","pbt","pbu","pst","prp","prd","ug","ur","ydd","yds","yih","ji","yi","hbo","men","xmn","fa","jpr","peo","pes","prs","dv","sam","ckb"],s=((l=this.services)==null?void 0:l.languageUtils)||new Fm(ku());return e.toLowerCase().indexOf("-latn")>1?"ltr":t.includes(s.getLanguagePartFromCode(e))||e.toLowerCase().indexOf("-arab")>1?"rtl":"ltr"}static createInstance(e={},t){const s=new As(e,t);return s.createInstance=As.createInstance,s}cloneInstance(e={},t=xa){const s=e.forkResourceStore;s&&delete e.forkResourceStore;const o={...this.options,...e,isClone:!0},l=new As(o);if((e.debug!==void 0||e.prefix!==void 0)&&(l.logger=l.logger.clone(e)),["store","services","language"].forEach(h=>{l[h]=this[h]}),l.services={...this.services},l.services.utils={hasLoadedNamespace:l.hasLoadedNamespace.bind(l)},s){const h=Object.keys(this.store.data).reduce((p,m)=>(p[m]={...this.store.data[m]},p[m]=Object.keys(p[m]).reduce((v,_)=>(v[_]={...p[m][_]},v),p[m]),p),{});l.store=new jm(h,o),l.services.resourceStore=l.store}if(e.interpolation){const p={...ku().interpolation,...this.options.interpolation,...e.interpolation},m={...o,interpolation:p};l.services.interpolator=new Vm(m)}return l.translator=new Aa(l.services,o),l.translator.on("*",(h,...p)=>{l.emit(h,...p)}),l.init(o,t),l.translator.options=o,l.translator.backendConnector.services.utils={hasLoadedNamespace:l.hasLoadedNamespace.bind(l)},l}toJSON(){return{options:this.options,store:this.store,language:this.language,languages:this.languages,resolvedLanguage:this.resolvedLanguage}}}const mt=As.createInstance();mt.createInstance;mt.dir;mt.init;mt.loadResources;mt.reloadResources;mt.use;mt.changeLanguage;mt.getFixedT;mt.t;mt.exists;mt.setDefaultNamespace;mt.hasLoadedNamespace;mt.loadNamespaces;mt.loadLanguages;const NS=(r,e,t,s)=>{var l,u,h,p;const o=[t,{code:e,...s||{}}];if((u=(l=r==null?void 0:r.services)==null?void 0:l.logger)!=null&&u.forward)return r.services.logger.forward(o,"warn","react-i18next::",!0);Ir(o[0])&&(o[0]=`react-i18next:: ${o[0]}`),(p=(h=r==null?void 0:r.services)==null?void 0:h.logger)!=null&&p.warn?r.services.logger.warn(...o):console!=null&&console.warn&&console.warn(...o)},Hm={},Ju=(r,e,t,s)=>{Ir(t)&&Hm[t]||(Ir(t)&&(Hm[t]=new Date),NS(r,e,t,s))},Iy=(r,e)=>()=>{if(r.isInitialized)e();else{const t=()=>{setTimeout(()=>{r.off("initialized",t)},0),e()};r.on("initialized",t)}},Xu=(r,e,t)=>{r.loadNamespaces(e,Iy(r,t))},Km=(r,e,t,s)=>{if(Ir(t)&&(t=[t]),r.options.preload&&r.options.preload.indexOf(e)>-1)return Xu(r,t,s);t.forEach(o=>{r.options.ns.indexOf(o)<0&&r.options.ns.push(o)}),r.loadLanguages(e,Iy(r,s))},RS=(r,e,t={})=>!e.languages||!e.languages.length?(Ju(e,"NO_LANGUAGES","i18n.languages were undefined or empty",{languages:e.languages}),!0):e.hasLoadedNamespace(r,{lng:t.lng,precheck:(s,o)=>{if(t.bindI18n&&t.bindI18n.indexOf("languageChanging")>-1&&s.services.backendConnector.backend&&s.isLanguageChangingTo&&!o(s.isLanguageChangingTo,r))return!1}}),Ir=r=>typeof r=="string",PS=r=>typeof r=="object"&&r!==null,bS=/&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g,AS={"&amp;":"&","&#38;":"&","&lt;":"<","&#60;":"<","&gt;":">","&#62;":">","&apos;":"'","&#39;":"'","&quot;":'"',"&#34;":'"',"&nbsp;":" ","&#160;":" ","&copy;":"©","&#169;":"©","&reg;":"®","&#174;":"®","&hellip;":"…","&#8230;":"…","&#x2F;":"/","&#47;":"/"},OS=r=>AS[r],LS=r=>r.replace(bS,OS);let Zu={bindI18n:"languageChanged",bindI18nStore:"",transEmptyNodeValue:"",transSupportBasicHtmlNodes:!0,transWrapTextNodes:"",transKeepBasicHtmlNodesFor:["br","strong","i","p"],useSuspense:!0,unescape:LS,transDefaultProps:void 0};const DS=(r={})=>{Zu={...Zu,...r}},MS=()=>Zu;let Ty;const jS=r=>{Ty=r},FS=()=>Ty,US={type:"3rdParty",init(r){DS(r.options.react),jS(r)}},zS=te.createContext();class $S{constructor(){this.usedNamespaces={}}addUsedNamespaces(e){e.forEach(t=>{this.usedNamespaces[t]||(this.usedNamespaces[t]=!0)})}getUsedNamespaces(){return Object.keys(this.usedNamespaces)}}var Iu={exports:{}},Tu={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Gm;function VS(){if(Gm)return Tu;Gm=1;var r=rl();function e(_,x){return _===x&&(_!==0||1/_===1/x)||_!==_&&x!==x}var t=typeof Object.is=="function"?Object.is:e,s=r.useState,o=r.useEffect,l=r.useLayoutEffect,u=r.useDebugValue;function h(_,x){var I=x(),N=s({inst:{value:I,getSnapshot:x}}),b=N[0].inst,F=N[1];return l(function(){b.value=I,b.getSnapshot=x,p(b)&&F({inst:b})},[_,I,x]),o(function(){return p(b)&&F({inst:b}),_(function(){p(b)&&F({inst:b})})},[_]),u(I),I}function p(_){var x=_.getSnapshot;_=_.value;try{var I=x();return!t(_,I)}catch{return!0}}function m(_,x){return x()}var v=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?m:h;return Tu.useSyncExternalStore=r.useSyncExternalStore!==void 0?r.useSyncExternalStore:v,Tu}var qm;function BS(){return qm||(qm=1,Iu.exports=VS()),Iu.exports}var WS=BS();const HS=(r,e)=>{if(Ir(e))return e;if(PS(e)&&Ir(e.defaultValue))return e.defaultValue;if(typeof r=="function")return"";if(Array.isArray(r)){const t=r[r.length-1];return typeof t=="function"?"":t}return r},KS={t:HS,ready:!1},GS=()=>()=>{},Ri=(r,e={})=>{var Ae,ve,bt;const{i18n:t}=e,{i18n:s,defaultNS:o}=te.useContext(zS)||{},l=t||s||FS();l&&!l.reportNamespaces&&(l.reportNamespaces=new $S),l||Ju(l,"NO_I18NEXT_INSTANCE","useTranslation: You will need to pass in an i18next instance by using initReactI18next");const u=te.useMemo(()=>{var ie;return{...MS(),...(ie=l==null?void 0:l.options)==null?void 0:ie.react,...e}},[l,e]),{useSuspense:h,keyPrefix:p}=u,m=o||((Ae=l==null?void 0:l.options)==null?void 0:Ae.defaultNS),v=Ir(m)?[m]:m||["translation"],_=te.useMemo(()=>v,v);(bt=(ve=l==null?void 0:l.reportNamespaces)==null?void 0:ve.addUsedNamespaces)==null||bt.call(ve,_);const x=te.useRef(0),I=te.useCallback(ie=>{if(!l)return GS;const{bindI18n:q,bindI18nStore:ee}=u,we=()=>{x.current+=1,ie()};return q&&l.on(q,we),ee&&l.store.on(ee,we),()=>{q&&q.split(" ").forEach(ue=>l.off(ue,we)),ee&&ee.split(" ").forEach(ue=>l.store.off(ue,we))}},[l,u]),N=te.useRef(),b=te.useCallback(()=>{if(!l)return KS;const ie=!!(l.isInitialized||l.initializedStoreOnce)&&_.every(j=>RS(j,l,u)),q=e.lng||l.language,ee=x.current,we=N.current;if(we&&we.ready===ie&&we.lng===q&&we.keyPrefix===p&&we.revision===ee)return we;const se={t:l.getFixedT(q,u.nsMode==="fallback"?_:_[0],p,{scopeNs:_}),ready:ie,lng:q,keyPrefix:p,revision:ee};return N.current=se,se},[l,_,p,u,e.lng]),[F,he]=te.useState(0),{t:fe,ready:me}=WS.useSyncExternalStore(I,b,b);te.useEffect(()=>{if(l&&!me&&!h){const ie=()=>he(q=>q+1);e.lng?Km(l,e.lng,_,ie):Xu(l,_,ie)}},[l,e.lng,_,me,h,F]);const ne=l||{},Ie=te.useRef(null),De=te.useRef(),Te=ie=>{const q=Object.getOwnPropertyDescriptors(ie);q.__original&&delete q.__original;const ee=Object.create(Object.getPrototypeOf(ie),q);if(!Object.prototype.hasOwnProperty.call(ee,"__original"))try{Object.defineProperty(ee,"__original",{value:ie,writable:!1,enumerable:!1,configurable:!1})}catch{}return ee},He=te.useMemo(()=>{const ie=ne,q=ie==null?void 0:ie.language;let ee=ie;ie&&(Ie.current&&Ie.current.__original===ie?De.current!==q?(ee=Te(ie),Ie.current=ee,De.current=q):ee=Ie.current:(ee=Te(ie),Ie.current=ee,De.current=q));const we=!me&&!h?(...se)=>(Ju(l,"USE_T_BEFORE_READY","useTranslation: t was called before ready. When using useSuspense: false, make sure to check the ready flag before using t."),fe(...se)):fe,ue=[we,ee,me];return ue.t=we,ue.i18n=ee,ue.ready=me,ue},[fe,ne,me,ne.resolvedLanguage,ne.language,ne.languages]);if(l&&h&&!me)throw new Promise(ie=>{const q=()=>ie();e.lng?Km(l,e.lng,_,q):Xu(l,_,q)});return He},qS={en:{translation:{careConnect:"CareConnect",mobile:"Mobile",welcomeBack:"Welcome Back!",email:"Email",enterEmail:"Enter your email",password:"Password",enterPassword:"Enter your password",logIn:"Log In",forgotPassword:"Forgot Password?",or:"OR",caregiverLogin:"Caregiver Login",caregiverDesc:"For next-of-kin & proxies",needHelp:"Need help logging in?",selectLanguage:"Select Language",english:"English",malay:"Bahasa Melayu",chinese:"中文 (简体)",tamil:"தமிழ் (Tamil)",continue:"Continue",helloFriend:"Hello, Friend!",dailyCheckIn:"Daily Check-in",howAreYouToday:"How are you today?",iAmOk:"I AM OK",sosButton:"SOS",goodMorning:"Good Morning",checkedIn:"Checked In",checkInDesc:"How are you feeling today? Complete your daily health check-in",checkedInDesc:"Great! You've completed your daily check-in",doCheckIn:"Do my daily check-in",viewMedicalRecords:"View Medical Records",viewMedicalRecordsDesc:"Access your health history",medicationReminders:"Medication Reminders",medicationRemindersDesc:"Manage your medications",upcomingAppointments:"Upcoming Appointments",upcomingAppointmentsDesc:"See your scheduled visits",home:"Home",wellness:"Wellness",rewards:"Rewards",meds:"Medicine",sos:"SOS",points:"Points",profile:"Profile",emergencySOS:"Emergency SOS",sosDesc:"Press the button below to send SOS to your emergency contacts",sendingAlert:"Sending emergency alert...",sosWarning:"This feature will alert emergency services in 15 seconds",editEmergencyContacts:"Edit Emergency Contacts",viewSupport:"View My Support",didYouMeanToSendSOS1:"Did you mean to",didYouMeanToSendSOS2:"send SOS?",alertContactsLine1:"We will alert your emergency",alertContactsLine2:"contacts once you confirm.",autoCancelIn:"Auto-cancel in",seconds:"seconds",yesSendSOS:"Yes, send SOS",cancelSOS:"Cancel SOS",personalInfo:"Personal Information",notifications:"Notifications",privacySecurity:"Privacy & Security",helpSupport:"Help & Support",logOut:"Log Out",editProfile:"Edit Profile",healthRewardsBalance:"Your Health Rewards Balance",redeemPoints:"Redeem Your Points",healthStoreVoucher:"$5 Health Store Voucher",freeCheckup:"Free Health Checkup",pharmacyDiscount:"$10 Pharmacy Discount",redeem:"Redeem",howToEarn:"How to Earn Points",earnCheckIn:"Daily Check-in",earnAssessment:"Complete Health Assessment",earnAdherence:"Medication Adherence (7 days)",earnReferral:"Refer a Friend",pts:"pts",medicationRemindersTitle:"Medication Reminders",addNewMedication:"Add New Medication",taken:"Taken",takeNow:"Take Now"}},ms:{translation:{careConnect:"CareConnect",mobile:"Mudah Alih",welcomeBack:"Selamat Kembali!",email:"E-mel",enterEmail:"Masukkan e-mel anda",password:"Kata Laluan",enterPassword:"Masukkan kata laluan anda",logIn:"Log Masuk",forgotPassword:"Lupa Kata Laluan?",or:"ATAU",caregiverLogin:"Log Masuk Penjaga",caregiverDesc:"Untuk saudara terdekat & proksi",needHelp:"Perlukan bantuan log masuk?",selectLanguage:"Pilih Bahasa",english:"English",malay:"Bahasa Melayu",chinese:"中文 (简体)",tamil:"தமிழ் (Tamil)",continue:"Teruskan",helloFriend:"Helo, Kawan!",dailyCheckIn:"Daftar Masuk Harian",howAreYouToday:"Apa khabar anda hari ini?",iAmOk:"SAYA OK",sosButton:"SOS",goodMorning:"Selamat Pagi",checkedIn:"Berjaya Daftar",checkInDesc:"Bagaimana perasaan anda hari ini? Lengkapkan pemeriksaan kesihatan harian anda",checkedInDesc:"Hebat! Anda telah menyelesaikan daftar masuk harian anda",doCheckIn:"Buat daftar masuk harian saya",viewMedicalRecords:"Lihat Rekod Perubatan",viewMedicalRecordsDesc:"Akses sejarah kesihatan anda",medicationReminders:"Peringatan Ubat",medicationRemindersDesc:"Urus ubat-ubatan anda",upcomingAppointments:"Temujanji Akan Datang",upcomingAppointmentsDesc:"Lihat lawatan terjadual anda",home:"Utama",wellness:"Kesihatan",rewards:"Ganjaran",meds:"Ubat",sos:"SOS",points:"Mata",profile:"Profil",emergencySOS:"SOS Kecemasan",sosDesc:"Tekan butang di bawah untuk hantar SOS kepada kenalan kecemasan anda",sendingAlert:"Menghantar amaran kecemasan...",sosWarning:"Ciri ini akan memaklumkan perkhidmatan kecemasan dalam 15 saat",editEmergencyContacts:"Edit Kenalan Kecemasan",viewSupport:"Lihat Sokongan Saya",didYouMeanToSendSOS1:"Adakah anda bermaksud",didYouMeanToSendSOS2:"untuk hantar SOS?",alertContactsLine1:"Kami akan memaklumkan kenalan",alertContactsLine2:"kecemasan anda sebaik sahaja anda mengesahkan.",autoCancelIn:"Auto-batal dalam",seconds:"saat",yesSendSOS:"Ya, hantar SOS",cancelSOS:"Batal SOS",personalInfo:"Maklumat Peribadi",notifications:"Pemberitahuan",privacySecurity:"Privasi & Keselamatan",helpSupport:"Bantuan & Sokongan",logOut:"Log Keluar",editProfile:"Edit Profil",healthRewardsBalance:"Baki Ganjaran Kesihatan Anda",redeemPoints:"Tebus Mata Anda",healthStoreVoucher:"Baucar Kedai Kesihatan $5",freeCheckup:"Pemeriksaan Kesihatan Percuma",pharmacyDiscount:"Diskaun Farmasi $10",redeem:"Tebus",howToEarn:"Cara Untuk Dapatkan Mata",earnCheckIn:"Daftar masuk harian",earnAssessment:"Lengkapkan Penilaian Kesihatan",earnAdherence:"Pematuhan Ubat (7 hari)",earnReferral:"Rujuk Rakan",pts:"mata",medicationRemindersTitle:"Peringatan Ubat",addNewMedication:"Tambah Ubat Baru",taken:"Diambil",takeNow:"Ambil Sekarang"}},zh:{translation:{careConnect:"CareConnect",mobile:"移动版",welcomeBack:"欢迎回来！",email:"电子邮件",enterEmail:"输入您的电子邮件",password:"密码",enterPassword:"输入您的密码",logIn:"登录",forgotPassword:"忘记密码？",or:"或",caregiverLogin:"护理人员登录",caregiverDesc:"适用于近亲和代理人",needHelp:"需要登录帮助？",selectLanguage:"选择语言",english:"English",malay:"Bahasa Melayu",chinese:"中文 (简体)",tamil:"தமிழ் (Tamil)",continue:"继续",helloFriend:"你好，朋友！",dailyCheckIn:"每日签到",howAreYouToday:"你今天怎么样？",iAmOk:"我很好",sosButton:"紧急求救",goodMorning:"早上好",checkedIn:"已签到",checkInDesc:"您今天感觉如何？完成您的每日健康检查",checkedInDesc:"太好了！您已完成今日签到",doCheckIn:"进行每日签到",viewMedicalRecords:"查看医疗记录",viewMedicalRecordsDesc:"访问您的健康历史",medicationReminders:"用药提醒",medicationRemindersDesc:"管理您的药物",upcomingAppointments:"即将到来的预约",upcomingAppointmentsDesc:"查看您的预定访问",home:"首页",wellness:"健康",rewards:"奖励",meds:"药物",sos:"紧急",points:"积分",profile:"个人",emergencySOS:"紧急求救",sosDesc:"按下面的按钮向您的紧急联系人发送求救信号",sendingAlert:"正在发送紧急警报...",sosWarning:"此功能将在15秒内通知紧急服务",editEmergencyContacts:"编辑紧急联系人",viewSupport:"查看我的支持",didYouMeanToSendSOS1:"您是否要",didYouMeanToSendSOS2:"发送求救信号？",alertContactsLine1:"一旦您确认，我们将通知",alertContactsLine2:"您的紧急联系人。",autoCancelIn:"自动取消时间",seconds:"秒",yesSendSOS:"是的，发送求救",cancelSOS:"取消求救",personalInfo:"个人信息",notifications:"通知",privacySecurity:"隐私与安全",helpSupport:"帮助与支持",logOut:"退出登录",editProfile:"编辑个人资料",healthRewardsBalance:"您的健康奖励余额",redeemPoints:"兑换您的积分",healthStoreVoucher:"$5 健康商店优惠券",freeCheckup:"免费健康检查",pharmacyDiscount:"$10 药房折扣",redeem:"兑换",howToEarn:"如何赚取积分",earnCheckIn:"每日签到",earnAssessment:"完成健康评估",earnAdherence:"药物依从性（7天）",earnReferral:"推荐朋友",pts:"分",medicationRemindersTitle:"用药提醒",addNewMedication:"添加新药物",taken:"已服用",takeNow:"立即服用"}},ta:{translation:{careConnect:"CareConnect",mobile:"மொபைல்",welcomeBack:"மீண்டும் வரவேற்கிறோம்!",email:"மின்னஞ்சல்",enterEmail:"உங்கள் மின்னஞ்சலை உள்ளிடவும்",password:"கடவுச்சொல்",enterPassword:"உங்கள் கடவுச்சொல்லை உள்ளிடவும்",logIn:"உள்நுழைய",forgotPassword:"கடவுச்சொல் மறந்துவிட்டதா?",or:"அல்லது",caregiverLogin:"பராமரிப்பாளர் உள்நுழைவு",caregiverDesc:"உறவினர்கள் & பிரதிநிதிகளுக்கு",needHelp:"உள்நுழைவதில் உதவி தேவையா?",selectLanguage:"மொழியைத் தேர்ந்தெடுக்கவும்",english:"English",malay:"Bahasa Melayu",chinese:"中文 (简体)",tamil:"தமிழ் (Tamil)",continue:"தொடரவும்",helloFriend:"வணக்கம், நண்பரே!",dailyCheckIn:"தினசரி செக்-இன்",howAreYouToday:"இன்று நீங்கள் எப்படி இருக்கிறீர்கள்?",iAmOk:"நான் நன்றாக இருக்கிறேன்",sosButton:"SOS",goodMorning:"காலை வணக்கம்",checkedIn:"செக்-இன் செய்யப்பட்டது",checkInDesc:"இன்று நீங்கள் எப்படி உணர்கிறீர்கள்? உங்கள் தினசரி சுகாதார சோதனையை முடிக்கவும்",checkedInDesc:"அருமை! நீங்கள் உங்கள் தினசரி செக்-இன் முடித்துவிட்டீர்கள்",doCheckIn:"எனது தினசரி செக்-இன் செய்யவும்",viewMedicalRecords:"மருத்துவ பதிவுகளைக் காண்க",viewMedicalRecordsDesc:"உங்கள் சுகாதார வரலாற்றை அணுகவும்",medicationReminders:"மருந்து நினைவூட்டல்கள்",medicationRemindersDesc:"உங்கள் மருந்துகளை நிர்வகிக்கவும்",upcomingAppointments:"வரவிருக்கும் நியமனங்கள்",upcomingAppointmentsDesc:"உங்கள் திட்டமிடப்பட்ட வருகைகளைக் காண்க",home:"முகப்பு",wellness:"நலவாழ்வு",rewards:"வெகுமதிகள்",meds:"மருந்துகள்",sos:"SOS",points:"புள்ளிகள்",profile:"சுயவிவரம்",emergencySOS:"அவசர SOS",sosDesc:"உங்கள் அவசர தொடர்புகளுக்கு SOS அனுப்ப கீழே உள்ள பொத்தானை அழுத்தவும்",sendingAlert:"அவசர எச்சரிக்கையை அனுப்புகிறது...",sosWarning:"இந்த அம்சம் 15 விநாடிகளில் அவசர சேவைகளை எச்சரிக்கும்",editEmergencyContacts:"அவசர தொடர்புகளைத் திருத்து",viewSupport:"எனது ஆதரவைக் காண்க",didYouMeanToSendSOS1:"நீங்கள்",didYouMeanToSendSOS2:"SOS அனுப்ப விரும்புகிறீர்களா?",alertContactsLine1:"நீங்கள் உறுதிப்படுத்தியவுடன் உங்கள்",alertContactsLine2:"அவசர தொடர்புகளுக்கு எச்சரிக்கை அனுப்புவோம்.",autoCancelIn:"தானாக ரத்து செய்யப்படும்",seconds:"விநாடிகளில்",yesSendSOS:"ஆம், SOS அனுப்பவும்",cancelSOS:"SOS ரத்து செய்யவும்",personalInfo:"தனிப்பட்ட தகவல்",notifications:"அறிவிப்புகள்",privacySecurity:"தனியுரிமை & பாதுகாப்பு",helpSupport:"உதவி & ஆதரவு",logOut:"வெளியேறு",editProfile:"சுயவிவரத்தைத் திருத்து",healthRewardsBalance:"உங்கள் சுகாதார வெகுமதி இருப்பு",redeemPoints:"உங்கள் புள்ளிகளை மீட்கவும்",healthStoreVoucher:"$5 சுகாதார கடை வவுச்சர்",freeCheckup:"இலவச சுகாதார பரிசோதனை",pharmacyDiscount:"$10 மருந்தகம் தள்ளுபடி",redeem:"மீட்கவும்",howToEarn:"புள்ளிகளைப் பெறுவது எப்படி",earnCheckIn:"தினசரி செக்-இன்",earnAssessment:"சுகாதார மதிப்பீட்டை முடிக்கவும்",earnAdherence:"மருந்து கடைபிடிப்பு (7 நாட்கள்)",earnReferral:"நண்பரை பரிந்துரைக்கவும்",pts:"புள்ளிகள்",medicationRemindersTitle:"மருந்து நினைவூட்டல்கள்",addNewMedication:"புதிய மருந்தைச் சேர்க்கவும்",taken:"எடுக்கப்பட்டது",takeNow:"இப்போது எடுக்கவும்"}}};mt.use(US).init({resources:qS,lng:"en",fallbackLng:"en",interpolation:{escapeValue:!1}});const YS=()=>{};var Ym={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ny={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M=function(r,e){if(!r)throw Pi(e)},Pi=function(r){return new Error("Firebase Database ("+Ny.SDK_VERSION+") INTERNAL ASSERT FAILED: "+r)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ry=function(r){const e=[];let t=0;for(let s=0;s<r.length;s++){let o=r.charCodeAt(s);o<128?e[t++]=o:o<2048?(e[t++]=o>>6|192,e[t++]=o&63|128):(o&64512)===55296&&s+1<r.length&&(r.charCodeAt(s+1)&64512)===56320?(o=65536+((o&1023)<<10)+(r.charCodeAt(++s)&1023),e[t++]=o>>18|240,e[t++]=o>>12&63|128,e[t++]=o>>6&63|128,e[t++]=o&63|128):(e[t++]=o>>12|224,e[t++]=o>>6&63|128,e[t++]=o&63|128)}return e},QS=function(r){const e=[];let t=0,s=0;for(;t<r.length;){const o=r[t++];if(o<128)e[s++]=String.fromCharCode(o);else if(o>191&&o<224){const l=r[t++];e[s++]=String.fromCharCode((o&31)<<6|l&63)}else if(o>239&&o<365){const l=r[t++],u=r[t++],h=r[t++],p=((o&7)<<18|(l&63)<<12|(u&63)<<6|h&63)-65536;e[s++]=String.fromCharCode(55296+(p>>10)),e[s++]=String.fromCharCode(56320+(p&1023))}else{const l=r[t++],u=r[t++];e[s++]=String.fromCharCode((o&15)<<12|(l&63)<<6|u&63)}}return e.join("")},Id={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let o=0;o<r.length;o+=3){const l=r[o],u=o+1<r.length,h=u?r[o+1]:0,p=o+2<r.length,m=p?r[o+2]:0,v=l>>2,_=(l&3)<<4|h>>4;let x=(h&15)<<2|m>>6,I=m&63;p||(I=64,u||(x=64)),s.push(t[v],t[_],t[x],t[I])}return s.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(Ry(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):QS(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let o=0;o<r.length;){const l=t[r.charAt(o++)],h=o<r.length?t[r.charAt(o)]:0;++o;const m=o<r.length?t[r.charAt(o)]:64;++o;const _=o<r.length?t[r.charAt(o)]:64;if(++o,l==null||h==null||m==null||_==null)throw new JS;const x=l<<2|h>>4;if(s.push(x),m!==64){const I=h<<4&240|m>>2;if(s.push(I),_!==64){const N=m<<6&192|_;s.push(N)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class JS extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Py=function(r){const e=Ry(r);return Id.encodeByteArray(e,!0)},Oa=function(r){return Py(r).replace(/\./g,"")},La=function(r){try{return Id.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function XS(r){return by(void 0,r)}function by(r,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:r===void 0&&(r={});break;case Array:r=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!ZS(t)||(r[t]=by(r[t],e[t]));return r}function ZS(r){return r!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function e1(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const t1=()=>e1().__FIREBASE_DEFAULTS__,n1=()=>{if(typeof process>"u"||typeof Ym>"u")return;const r=Ym.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},r1=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&La(r[1]);return e&&JSON.parse(e)},Td=()=>{try{return YS()||t1()||n1()||r1()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},Ay=r=>{var e,t;return(t=(e=Td())==null?void 0:e.emulatorHosts)==null?void 0:t[r]},i1=r=>{const e=Ay(r);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},Oy=()=>{var r;return(r=Td())==null?void 0:r.config},Ly=r=>{var e;return(e=Td())==null?void 0:e[`_${r}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eo{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function s1(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",o=r.iat||0,l=r.sub||r.user_id;if(!l)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const u={iss:`https://securetoken.google.com/${s}`,aud:s,iat:o,exp:o+3600,auth_time:o,sub:l,user_id:l,firebase:{sign_in_provider:"custom",identities:{}},...r};return[Oa(JSON.stringify(t)),Oa(JSON.stringify(u)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Nd(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(pt())}function o1(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Dy(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function My(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function a1(){const r=pt();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function l1(){return Ny.NODE_ADMIN===!0}function jy(){try{return typeof indexedDB=="object"}catch{return!1}}function Fy(){return new Promise((r,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",o=self.indexedDB.open(s);o.onsuccess=()=>{o.result.close(),t||self.indexedDB.deleteDatabase(s),r(!0)},o.onupgradeneeded=()=>{t=!1},o.onerror=()=>{var l;e(((l=o.error)==null?void 0:l.message)||"")}}catch(t){e(t)}})}function c1(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const u1="FirebaseError";class hn extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=u1,Object.setPrototypeOf(this,hn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Mr.prototype.create)}}class Mr{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},o=`${this.service}/${e}`,l=this.errors[e],u=l?d1(l,s):"Error",h=`${this.serviceName}: ${u} (${o}).`;return new hn(o,h,s)}}function d1(r,e){return r.replace(h1,(t,s)=>{const o=e[s];return o!=null?String(o):`<${s}?>`})}const h1=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vs(r){return JSON.parse(r)}function tt(r){return JSON.stringify(r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uy=function(r){let e={},t={},s={},o="";try{const l=r.split(".");e=Vs(La(l[0])||""),t=Vs(La(l[1])||""),o=l[2],s=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:s,signature:o}},f1=function(r){const e=Uy(r),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},p1=function(r){const e=Uy(r).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function en(r,e){return Object.prototype.hasOwnProperty.call(r,e)}function Tr(r,e){if(Object.prototype.hasOwnProperty.call(r,e))return r[e]}function ed(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function Da(r,e,t){const s={};for(const o in r)Object.prototype.hasOwnProperty.call(r,o)&&(s[o]=e.call(t,r[o],o,r));return s}function ir(r,e){if(r===e)return!0;const t=Object.keys(r),s=Object.keys(e);for(const o of t){if(!s.includes(o))return!1;const l=r[o],u=e[o];if(Qm(l)&&Qm(u)){if(!ir(l,u))return!1}else if(l!==u)return!1}for(const o of s)if(!t.includes(o))return!1;return!0}function Qm(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bi(r){const e=[];for(const[t,s]of Object.entries(r))Array.isArray(s)?s.forEach(o=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(o))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function Rs(r){const e={};return r.replace(/^\?/,"").split("&").forEach(s=>{if(s){const[o,l]=s.split("=");e[decodeURIComponent(o)]=decodeURIComponent(l)}}),e}function Ps(r){const e=r.indexOf("?");if(!e)return"";const t=r.indexOf("#",e);return r.substring(e,t>0?t:void 0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m1{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const s=this.W_;if(typeof e=="string")for(let _=0;_<16;_++)s[_]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let _=0;_<16;_++)s[_]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let _=16;_<80;_++){const x=s[_-3]^s[_-8]^s[_-14]^s[_-16];s[_]=(x<<1|x>>>31)&4294967295}let o=this.chain_[0],l=this.chain_[1],u=this.chain_[2],h=this.chain_[3],p=this.chain_[4],m,v;for(let _=0;_<80;_++){_<40?_<20?(m=h^l&(u^h),v=1518500249):(m=l^u^h,v=1859775393):_<60?(m=l&u|h&(l|u),v=2400959708):(m=l^u^h,v=3395469782);const x=(o<<5|o>>>27)+m+p+v+s[_]&4294967295;p=h,h=u,u=(l<<30|l>>>2)&4294967295,l=o,o=x}this.chain_[0]=this.chain_[0]+o&4294967295,this.chain_[1]=this.chain_[1]+l&4294967295,this.chain_[2]=this.chain_[2]+u&4294967295,this.chain_[3]=this.chain_[3]+h&4294967295,this.chain_[4]=this.chain_[4]+p&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const s=t-this.blockSize;let o=0;const l=this.buf_;let u=this.inbuf_;for(;o<t;){if(u===0)for(;o<=s;)this.compress_(e,o),o+=this.blockSize;if(typeof e=="string"){for(;o<t;)if(l[u]=e.charCodeAt(o),++u,++o,u===this.blockSize){this.compress_(l),u=0;break}}else for(;o<t;)if(l[u]=e[o],++u,++o,u===this.blockSize){this.compress_(l),u=0;break}}this.inbuf_=u,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let o=this.blockSize-1;o>=56;o--)this.buf_[o]=t&255,t/=256;this.compress_(this.buf_);let s=0;for(let o=0;o<5;o++)for(let l=24;l>=0;l-=8)e[s]=this.chain_[o]>>l&255,++s;return e}}function g1(r,e){const t=new y1(r,e);return t.subscribe.bind(t)}class y1{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,s){let o;if(e===void 0&&t===void 0&&s===void 0)throw new Error("Missing Observer.");_1(e,["next","error","complete"])?o=e:o={next:e,error:t,complete:s},o.next===void 0&&(o.next=Nu),o.error===void 0&&(o.error=Nu),o.complete===void 0&&(o.complete=Nu);const l=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?o.error(this.finalError):o.complete()}catch{}}),this.observers.push(o),l}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function _1(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function Nu(){}function Rd(r,e){return`${r} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const v1=function(r){const e=[];let t=0;for(let s=0;s<r.length;s++){let o=r.charCodeAt(s);if(o>=55296&&o<=56319){const l=o-55296;s++,M(s<r.length,"Surrogate pair missing trail surrogate.");const u=r.charCodeAt(s)-56320;o=65536+(l<<10)+u}o<128?e[t++]=o:o<2048?(e[t++]=o>>6|192,e[t++]=o&63|128):o<65536?(e[t++]=o>>12|224,e[t++]=o>>6&63|128,e[t++]=o&63|128):(e[t++]=o>>18|240,e[t++]=o>>12&63|128,e[t++]=o>>6&63|128,e[t++]=o&63|128)}return e},sl=function(r){let e=0;for(let t=0;t<r.length;t++){const s=r.charCodeAt(t);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w1=1e3,x1=2,S1=14400*1e3,E1=.5;function Jm(r,e=w1,t=x1){const s=e*Math.pow(t,r),o=Math.round(E1*s*(Math.random()-.5)*2);return Math.min(S1,s+o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ot(r){return r&&r._delegate?r._delegate:r}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function to(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function zy(r){return(await fetch(r,{credentials:"include"})).ok}class Xt{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C1{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new eo;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const o=this.getOrInitializeService({instanceIdentifier:t});o&&s.resolve(o)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(I1(e))try{this.getOrInitializeService({instanceIdentifier:xr})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(t);try{const l=this.getOrInitializeService({instanceIdentifier:o});s.resolve(l)}catch{}}}}clearInstance(e=xr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=xr){return this.instances.has(e)}getOptions(e=xr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const o=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[l,u]of this.instancesDeferred.entries()){const h=this.normalizeInstanceIdentifier(l);s===h&&u.resolve(o)}return o}onInit(e,t){const s=this.normalizeInstanceIdentifier(t),o=this.onInitCallbacks.get(s)??new Set;o.add(e),this.onInitCallbacks.set(s,o);const l=this.instances.get(s);return l&&e(l,s),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const o of s)try{o(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:k1(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=xr){return this.component?this.component.multipleInstances?e:xr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function k1(r){return r===xr?void 0:r}function I1(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T1{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new C1(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ee;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(Ee||(Ee={}));const N1={debug:Ee.DEBUG,verbose:Ee.VERBOSE,info:Ee.INFO,warn:Ee.WARN,error:Ee.ERROR,silent:Ee.SILENT},R1=Ee.INFO,P1={[Ee.DEBUG]:"log",[Ee.VERBOSE]:"log",[Ee.INFO]:"info",[Ee.WARN]:"warn",[Ee.ERROR]:"error"},b1=(r,e,...t)=>{if(e<r.logLevel)return;const s=new Date().toISOString(),o=P1[e];if(o)console[o](`[${s}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ol{constructor(e){this.name=e,this._logLevel=R1,this._logHandler=b1,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Ee))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?N1[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Ee.DEBUG,...e),this._logHandler(this,Ee.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Ee.VERBOSE,...e),this._logHandler(this,Ee.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Ee.INFO,...e),this._logHandler(this,Ee.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Ee.WARN,...e),this._logHandler(this,Ee.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Ee.ERROR,...e),this._logHandler(this,Ee.ERROR,...e)}}const A1=(r,e)=>e.some(t=>r instanceof t);let Xm,Zm;function O1(){return Xm||(Xm=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function L1(){return Zm||(Zm=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const $y=new WeakMap,td=new WeakMap,Vy=new WeakMap,Ru=new WeakMap,Pd=new WeakMap;function D1(r){const e=new Promise((t,s)=>{const o=()=>{r.removeEventListener("success",l),r.removeEventListener("error",u)},l=()=>{t(er(r.result)),o()},u=()=>{s(r.error),o()};r.addEventListener("success",l),r.addEventListener("error",u)});return e.then(t=>{t instanceof IDBCursor&&$y.set(t,r)}).catch(()=>{}),Pd.set(e,r),e}function M1(r){if(td.has(r))return;const e=new Promise((t,s)=>{const o=()=>{r.removeEventListener("complete",l),r.removeEventListener("error",u),r.removeEventListener("abort",u)},l=()=>{t(),o()},u=()=>{s(r.error||new DOMException("AbortError","AbortError")),o()};r.addEventListener("complete",l),r.addEventListener("error",u),r.addEventListener("abort",u)});td.set(r,e)}let nd={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return td.get(r);if(e==="objectStoreNames")return r.objectStoreNames||Vy.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return er(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function j1(r){nd=r(nd)}function F1(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=r.call(Pu(this),e,...t);return Vy.set(s,e.sort?e.sort():[e]),er(s)}:L1().includes(r)?function(...e){return r.apply(Pu(this),e),er($y.get(this))}:function(...e){return er(r.apply(Pu(this),e))}}function U1(r){return typeof r=="function"?F1(r):(r instanceof IDBTransaction&&M1(r),A1(r,O1())?new Proxy(r,nd):r)}function er(r){if(r instanceof IDBRequest)return D1(r);if(Ru.has(r))return Ru.get(r);const e=U1(r);return e!==r&&(Ru.set(r,e),Pd.set(e,r)),e}const Pu=r=>Pd.get(r);function By(r,e,{blocked:t,upgrade:s,blocking:o,terminated:l}={}){const u=indexedDB.open(r,e),h=er(u);return s&&u.addEventListener("upgradeneeded",p=>{s(er(u.result),p.oldVersion,p.newVersion,er(u.transaction),p)}),t&&u.addEventListener("blocked",p=>t(p.oldVersion,p.newVersion,p)),h.then(p=>{l&&p.addEventListener("close",()=>l()),o&&p.addEventListener("versionchange",m=>o(m.oldVersion,m.newVersion,m))}).catch(()=>{}),h}const z1=["get","getKey","getAll","getAllKeys","count"],$1=["put","add","delete","clear"],bu=new Map;function eg(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(bu.get(e))return bu.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,o=$1.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(o||z1.includes(t)))return;const l=async function(u,...h){const p=this.transaction(u,o?"readwrite":"readonly");let m=p.store;return s&&(m=m.index(h.shift())),(await Promise.all([m[t](...h),o&&p.done]))[0]};return bu.set(e,l),l}j1(r=>({...r,get:(e,t,s)=>eg(e,t)||r.get(e,t,s),has:(e,t)=>!!eg(e,t)||r.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V1{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(B1(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function B1(r){const e=r.getComponent();return(e==null?void 0:e.type)==="VERSION"}const rd="@firebase/app",tg="0.14.12";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const In=new ol("@firebase/app"),W1="@firebase/app-compat",H1="@firebase/analytics-compat",K1="@firebase/analytics",G1="@firebase/app-check-compat",q1="@firebase/app-check",Y1="@firebase/auth",Q1="@firebase/auth-compat",J1="@firebase/database",X1="@firebase/data-connect",Z1="@firebase/database-compat",eE="@firebase/functions",tE="@firebase/functions-compat",nE="@firebase/installations",rE="@firebase/installations-compat",iE="@firebase/messaging",sE="@firebase/messaging-compat",oE="@firebase/performance",aE="@firebase/performance-compat",lE="@firebase/remote-config",cE="@firebase/remote-config-compat",uE="@firebase/storage",dE="@firebase/storage-compat",hE="@firebase/firestore",fE="@firebase/ai",pE="@firebase/firestore-compat",mE="firebase",gE="12.13.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const id="[DEFAULT]",yE={[rd]:"fire-core",[W1]:"fire-core-compat",[K1]:"fire-analytics",[H1]:"fire-analytics-compat",[q1]:"fire-app-check",[G1]:"fire-app-check-compat",[Y1]:"fire-auth",[Q1]:"fire-auth-compat",[J1]:"fire-rtdb",[X1]:"fire-data-connect",[Z1]:"fire-rtdb-compat",[eE]:"fire-fn",[tE]:"fire-fn-compat",[nE]:"fire-iid",[rE]:"fire-iid-compat",[iE]:"fire-fcm",[sE]:"fire-fcm-compat",[oE]:"fire-perf",[aE]:"fire-perf-compat",[lE]:"fire-rc",[cE]:"fire-rc-compat",[uE]:"fire-gcs",[dE]:"fire-gcs-compat",[hE]:"fire-fst",[pE]:"fire-fst-compat",[fE]:"fire-vertex","fire-js":"fire-js",[mE]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ma=new Map,_E=new Map,sd=new Map;function ng(r,e){try{r.container.addComponent(e)}catch(t){In.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function un(r){const e=r.name;if(sd.has(e))return In.debug(`There were multiple attempts to register component ${e}.`),!1;sd.set(e,r);for(const t of Ma.values())ng(t,r);for(const t of _E.values())ng(t,r);return!0}function jr(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function Gt(r){return r==null?!1:r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vE={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},tr=new Mr("app","Firebase",vE);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wE{constructor(e,t,s){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Xt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw tr.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ai=gE;function Wy(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const s={name:id,automaticDataCollectionEnabled:!0,...e},o=s.name;if(typeof o!="string"||!o)throw tr.create("bad-app-name",{appName:String(o)});if(t||(t=Oy()),!t)throw tr.create("no-options");const l=Ma.get(o);if(l){if(ir(t,l.options)&&ir(s,l.config))return l;throw tr.create("duplicate-app",{appName:o})}const u=new T1(o);for(const p of sd.values())u.addComponent(p);const h=new wE(t,s,u);return Ma.set(o,h),h}function bd(r=id){const e=Ma.get(r);if(!e&&r===id&&Oy())return Wy();if(!e)throw tr.create("no-app",{appName:r});return e}function Ut(r,e,t){let s=yE[r]??r;t&&(s+=`-${t}`);const o=s.match(/\s|\//),l=e.match(/\s|\//);if(o||l){const u=[`Unable to register library "${s}" with version "${e}":`];o&&u.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&l&&u.push("and"),l&&u.push(`version name "${e}" contains illegal characters (whitespace or "/")`),In.warn(u.join(" "));return}un(new Xt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xE="firebase-heartbeat-database",SE=1,Bs="firebase-heartbeat-store";let Au=null;function Hy(){return Au||(Au=By(xE,SE,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(Bs)}catch(t){console.warn(t)}}}}).catch(r=>{throw tr.create("idb-open",{originalErrorMessage:r.message})})),Au}async function EE(r){try{const t=(await Hy()).transaction(Bs),s=await t.objectStore(Bs).get(Ky(r));return await t.done,s}catch(e){if(e instanceof hn)In.warn(e.message);else{const t=tr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});In.warn(t.message)}}}async function rg(r,e){try{const s=(await Hy()).transaction(Bs,"readwrite");await s.objectStore(Bs).put(e,Ky(r)),await s.done}catch(t){if(t instanceof hn)In.warn(t.message);else{const s=tr.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});In.warn(s.message)}}}function Ky(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CE=1024,kE=30;class IE{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new NE(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,t;try{const o=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),l=ig();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===l||this._heartbeatsCache.heartbeats.some(u=>u.date===l))return;if(this._heartbeatsCache.heartbeats.push({date:l,agent:o}),this._heartbeatsCache.heartbeats.length>kE){const u=RE(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(u,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){In.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=ig(),{heartbeatsToSend:s,unsentEntries:o}=TE(this._heartbeatsCache.heartbeats),l=Oa(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=t,o.length>0?(this._heartbeatsCache.heartbeats=o,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),l}catch(t){return In.warn(t),""}}}function ig(){return new Date().toISOString().substring(0,10)}function TE(r,e=CE){const t=[];let s=r.slice();for(const o of r){const l=t.find(u=>u.agent===o.agent);if(l){if(l.dates.push(o.date),sg(t)>e){l.dates.pop();break}}else if(t.push({agent:o.agent,dates:[o.date]}),sg(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class NE{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return jy()?Fy().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await EE(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return rg(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return rg(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function sg(r){return Oa(JSON.stringify({version:2,heartbeats:r})).length}function RE(r){if(r.length===0)return-1;let e=0,t=r[0].date;for(let s=1;s<r.length;s++)r[s].date<t&&(t=r[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function PE(r){un(new Xt("platform-logger",e=>new V1(e),"PRIVATE")),un(new Xt("heartbeat",e=>new IE(e),"PRIVATE")),Ut(rd,tg,r),Ut(rd,tg,"esm2020"),Ut("fire-js","")}PE("");function Gy(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const bE=Gy,qy=new Mr("auth","Firebase",Gy());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ja=new ol("@firebase/auth");function AE(r,...e){ja.logLevel<=Ee.WARN&&ja.warn(`Auth (${Ai}): ${r}`,...e)}function Ia(r,...e){ja.logLevel<=Ee.ERROR&&ja.error(`Auth (${Ai}): ${r}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zt(r,...e){throw Ad(r,...e)}function ln(r,...e){return Ad(r,...e)}function Yy(r,e,t){const s={...bE(),[e]:t};return new Mr("auth","Firebase",s).create(e,{appName:r.name})}function nr(r){return Yy(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ad(r,...e){if(typeof r!="string"){const t=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=r.name),r._errorFactory.create(t,...s)}return qy.create(r,...e)}function Y(r,e,...t){if(!r)throw Ad(e,...t)}function Sn(r){const e="INTERNAL ASSERTION FAILED: "+r;throw Ia(e),new Error(e)}function Tn(r,e){r||Sn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function od(){var r;return typeof self<"u"&&((r=self.location)==null?void 0:r.href)||""}function OE(){return og()==="http:"||og()==="https:"}function og(){var r;return typeof self<"u"&&((r=self.location)==null?void 0:r.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function LE(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(OE()||Dy()||"connection"in navigator)?navigator.onLine:!0}function DE(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{constructor(e,t){this.shortDelay=e,this.longDelay=t,Tn(t>e,"Short delay should be less than long delay!"),this.isMobile=Nd()||My()}get(){return LE()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Od(r,e){Tn(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qy{static initialize(e,t,s){this.fetchImpl=e,t&&(this.headersImpl=t),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Sn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Sn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Sn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ME={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jE=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],FE=new no(3e4,6e4);function Fr(r,e){return r.tenantId&&!e.tenantId?{...e,tenantId:r.tenantId}:e}async function ar(r,e,t,s,o={}){return Jy(r,o,async()=>{let l={},u={};s&&(e==="GET"?u=s:l={body:JSON.stringify(s)});const h=bi({key:r.config.apiKey,...u}).slice(1),p=await r._getAdditionalHeaders();p["Content-Type"]="application/json",r.languageCode&&(p["X-Firebase-Locale"]=r.languageCode);const m={method:e,headers:p,...l};return o1()||(m.referrerPolicy="no-referrer"),r.emulatorConfig&&to(r.emulatorConfig.host)&&(m.credentials="include"),Qy.fetch()(await Xy(r,r.config.apiHost,t,h),m)})}async function Jy(r,e,t){r._canInitEmulator=!1;const s={...ME,...e};try{const o=new zE(r),l=await Promise.race([t(),o.promise]);o.clearNetworkTimeout();const u=await l.json();if("needConfirmation"in u)throw Sa(r,"account-exists-with-different-credential",u);if(l.ok&&!("errorMessage"in u))return u;{const h=l.ok?u.errorMessage:u.error.message,[p,m]=h.split(" : ");if(p==="FEDERATED_USER_ID_ALREADY_LINKED")throw Sa(r,"credential-already-in-use",u);if(p==="EMAIL_EXISTS")throw Sa(r,"email-already-in-use",u);if(p==="USER_DISABLED")throw Sa(r,"user-disabled",u);const v=s[p]||p.toLowerCase().replace(/[_\s]+/g,"-");if(m)throw Yy(r,v,m);Zt(r,v)}}catch(o){if(o instanceof hn)throw o;Zt(r,"network-request-failed",{message:String(o)})}}async function al(r,e,t,s,o={}){const l=await ar(r,e,t,s,o);return"mfaPendingCredential"in l&&Zt(r,"multi-factor-auth-required",{_serverResponse:l}),l}async function Xy(r,e,t,s){const o=`${e}${t}?${s}`,l=r,u=l.config.emulator?Od(r.config,o):`${r.config.apiScheme}://${o}`;return jE.includes(t)&&(await l._persistenceManagerAvailable,l._getPersistenceType()==="COOKIE")?l._getPersistence()._getFinalTarget(u).toString():u}function UE(r){switch(r){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class zE{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,s)=>{this.timer=setTimeout(()=>s(ln(this.auth,"network-request-failed")),FE.get())})}}function Sa(r,e,t){const s={appName:r.name};t.email&&(s.email=t.email),t.phoneNumber&&(s.phoneNumber=t.phoneNumber);const o=ln(r,e,s);return o.customData._tokenResponse=t,o}function ag(r){return r!==void 0&&r.enterprise!==void 0}class $E{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return UE(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function VE(r,e){return ar(r,"GET","/v2/recaptchaConfig",Fr(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function BE(r,e){return ar(r,"POST","/v1/accounts:delete",e)}async function Fa(r,e){return ar(r,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Os(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function WE(r,e=!1){const t=ot(r),s=await t.getIdToken(e),o=Ld(s);Y(o&&o.exp&&o.auth_time&&o.iat,t.auth,"internal-error");const l=typeof o.firebase=="object"?o.firebase:void 0,u=l==null?void 0:l.sign_in_provider;return{claims:o,token:s,authTime:Os(Ou(o.auth_time)),issuedAtTime:Os(Ou(o.iat)),expirationTime:Os(Ou(o.exp)),signInProvider:u||null,signInSecondFactor:(l==null?void 0:l.sign_in_second_factor)||null}}function Ou(r){return Number(r)*1e3}function Ld(r){const[e,t,s]=r.split(".");if(e===void 0||t===void 0||s===void 0)return Ia("JWT malformed, contained fewer than 3 sections"),null;try{const o=La(t);return o?JSON.parse(o):(Ia("Failed to decode base64 JWT payload"),null)}catch(o){return Ia("Caught error parsing JWT payload as JSON",o==null?void 0:o.toString()),null}}function lg(r){const e=Ld(r);return Y(e,"internal-error"),Y(typeof e.exp<"u","internal-error"),Y(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ws(r,e,t=!1){if(t)return e;try{return await e}catch(s){throw s instanceof hn&&HE(s)&&r.auth.currentUser===r&&await r.auth.signOut(),s}}function HE({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KE{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ad{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Os(this.lastLoginAt),this.creationTime=Os(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ua(r){var _;const e=r.auth,t=await r.getIdToken(),s=await Ws(r,Fa(e,{idToken:t}));Y(s==null?void 0:s.users.length,e,"internal-error");const o=s.users[0];r._notifyReloadListener(o);const l=(_=o.providerUserInfo)!=null&&_.length?Zy(o.providerUserInfo):[],u=qE(r.providerData,l),h=r.isAnonymous,p=!(r.email&&o.passwordHash)&&!(u!=null&&u.length),m=h?p:!1,v={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:u,metadata:new ad(o.createdAt,o.lastLoginAt),isAnonymous:m};Object.assign(r,v)}async function GE(r){const e=ot(r);await Ua(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function qE(r,e){return[...r.filter(s=>!e.some(o=>o.providerId===s.providerId)),...e]}function Zy(r){return r.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function YE(r,e){const t=await Jy(r,{},async()=>{const s=bi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:o,apiKey:l}=r.config,u=await Xy(r,o,"/v1/token",`key=${l}`),h=await r._getAdditionalHeaders();h["Content-Type"]="application/x-www-form-urlencoded";const p={method:"POST",headers:h,body:s};return r.emulatorConfig&&to(r.emulatorConfig.host)&&(p.credentials="include"),Qy.fetch()(u,p)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function QE(r,e){return ar(r,"POST","/v2/accounts:revokeToken",Fr(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yi{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Y(e.idToken,"internal-error"),Y(typeof e.idToken<"u","internal-error"),Y(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):lg(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){Y(e.length!==0,"internal-error");const t=lg(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(Y(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:s,refreshToken:o,expiresIn:l}=await YE(e,t);this.updateTokensAndExpiration(s,o,Number(l))}updateTokensAndExpiration(e,t,s){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,t){const{refreshToken:s,accessToken:o,expirationTime:l}=t,u=new yi;return s&&(Y(typeof s=="string","internal-error",{appName:e}),u.refreshToken=s),o&&(Y(typeof o=="string","internal-error",{appName:e}),u.accessToken=o),l&&(Y(typeof l=="number","internal-error",{appName:e}),u.expirationTime=l),u}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new yi,this.toJSON())}_performRefresh(){return Sn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yn(r,e){Y(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class Yt{constructor({uid:e,auth:t,stsTokenManager:s,...o}){this.providerId="firebase",this.proactiveRefresh=new KE(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new ad(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const t=await Ws(this,this.stsTokenManager.getToken(this.auth,e));return Y(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return WE(this,e)}reload(){return GE(this)}_assign(e){this!==e&&(Y(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Yt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){Y(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),t&&await Ua(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Gt(this.auth.app))return Promise.reject(nr(this.auth));const e=await this.getIdToken();return await Ws(this,BE(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const s=t.displayName??void 0,o=t.email??void 0,l=t.phoneNumber??void 0,u=t.photoURL??void 0,h=t.tenantId??void 0,p=t._redirectEventId??void 0,m=t.createdAt??void 0,v=t.lastLoginAt??void 0,{uid:_,emailVerified:x,isAnonymous:I,providerData:N,stsTokenManager:b}=t;Y(_&&b,e,"internal-error");const F=yi.fromJSON(this.name,b);Y(typeof _=="string",e,"internal-error"),Yn(s,e.name),Yn(o,e.name),Y(typeof x=="boolean",e,"internal-error"),Y(typeof I=="boolean",e,"internal-error"),Yn(l,e.name),Yn(u,e.name),Yn(h,e.name),Yn(p,e.name),Yn(m,e.name),Yn(v,e.name);const he=new Yt({uid:_,auth:e,email:o,emailVerified:x,displayName:s,isAnonymous:I,photoURL:u,phoneNumber:l,tenantId:h,stsTokenManager:F,createdAt:m,lastLoginAt:v});return N&&Array.isArray(N)&&(he.providerData=N.map(fe=>({...fe}))),p&&(he._redirectEventId=p),he}static async _fromIdTokenResponse(e,t,s=!1){const o=new yi;o.updateFromServerResponse(t);const l=new Yt({uid:t.localId,auth:e,stsTokenManager:o,isAnonymous:s});return await Ua(l),l}static async _fromGetAccountInfoResponse(e,t,s){const o=t.users[0];Y(o.localId!==void 0,"internal-error");const l=o.providerUserInfo!==void 0?Zy(o.providerUserInfo):[],u=!(o.email&&o.passwordHash)&&!(l!=null&&l.length),h=new yi;h.updateFromIdToken(s);const p=new Yt({uid:o.localId,auth:e,stsTokenManager:h,isAnonymous:u}),m={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:l,metadata:new ad(o.createdAt,o.lastLoginAt),isAnonymous:!(o.email&&o.passwordHash)&&!(l!=null&&l.length)};return Object.assign(p,m),p}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cg=new Map;function En(r){Tn(r instanceof Function,"Expected a class definition");let e=cg.get(r);return e?(Tn(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,cg.set(r,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e_{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}e_.type="NONE";const ug=e_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ta(r,e,t){return`firebase:${r}:${e}:${t}`}class _i{constructor(e,t,s){this.persistence=e,this.auth=t,this.userKey=s;const{config:o,name:l}=this.auth;this.fullUserKey=Ta(this.userKey,o.apiKey,l),this.fullPersistenceKey=Ta("persistence",o.apiKey,l),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Fa(this.auth,{idToken:e}).catch(()=>{});return t?Yt._fromGetAccountInfoResponse(this.auth,t,e):null}return Yt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,s="authUser"){if(!t.length)return new _i(En(ug),e,s);const o=(await Promise.all(t.map(async m=>{if(await m._isAvailable())return m}))).filter(m=>m);let l=o[0]||En(ug);const u=Ta(s,e.config.apiKey,e.name);let h=null;for(const m of t)try{const v=await m._get(u);if(v){let _;if(typeof v=="string"){const x=await Fa(e,{idToken:v}).catch(()=>{});if(!x)break;_=await Yt._fromGetAccountInfoResponse(e,x,v)}else _=Yt._fromJSON(e,v);m!==l&&(h=_),l=m;break}}catch{}const p=o.filter(m=>m._shouldAllowMigration);return!l._shouldAllowMigration||!p.length?new _i(l,e,s):(l=p[0],h&&await l._set(u,h.toJSON()),await Promise.all(t.map(async m=>{if(m!==l)try{await m._remove(u)}catch{}})),new _i(l,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dg(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(i_(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(t_(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(o_(e))return"Blackberry";if(a_(e))return"Webos";if(n_(e))return"Safari";if((e.includes("chrome/")||r_(e))&&!e.includes("edge/"))return"Chrome";if(s_(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=r.match(t);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function t_(r=pt()){return/firefox\//i.test(r)}function n_(r=pt()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function r_(r=pt()){return/crios\//i.test(r)}function i_(r=pt()){return/iemobile/i.test(r)}function s_(r=pt()){return/android/i.test(r)}function o_(r=pt()){return/blackberry/i.test(r)}function a_(r=pt()){return/webos/i.test(r)}function Dd(r=pt()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function JE(r=pt()){var e;return Dd(r)&&!!((e=window.navigator)!=null&&e.standalone)}function XE(){return a1()&&document.documentMode===10}function l_(r=pt()){return Dd(r)||s_(r)||a_(r)||o_(r)||/windows phone/i.test(r)||i_(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function c_(r,e=[]){let t;switch(r){case"Browser":t=dg(pt());break;case"Worker":t=`${dg(pt())}-${r}`;break;default:t=r}const s=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Ai}/${s}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZE{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const s=l=>new Promise((u,h)=>{try{const p=e(l);u(p)}catch(p){h(p)}});s.onAbort=t,this.queue.push(s);const o=this.queue.length-1;return()=>{this.queue[o]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const s of this.queue)await s(e),s.onAbort&&t.push(s.onAbort)}catch(s){t.reverse();for(const o of t)try{o()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eC(r,e={}){return ar(r,"GET","/v2/passwordPolicy",Fr(r,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tC=6;class nC{constructor(e){var s;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??tC,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((s=e.allowedNonAlphanumericCharacters)==null?void 0:s.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const s=this.customStrengthOptions.minPasswordLength,o=this.customStrengthOptions.maxPasswordLength;s&&(t.meetsMinPasswordLength=e.length>=s),o&&(t.meetsMaxPasswordLength=e.length<=o)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let s;for(let o=0;o<e.length;o++)s=e.charAt(o),this.updatePasswordCharacterOptionsStatuses(t,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,t,s,o,l){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=o)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=l))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rC{constructor(e,t,s,o){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=s,this.config=o,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new hg(this),this.idTokenSubscription=new hg(this),this.beforeStateQueue=new ZE(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=qy,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=o.sdkClientVersion,this._persistenceManagerAvailable=new Promise(l=>this._resolvePersistenceManagerAvailable=l)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=En(t)),this._initializationPromise=this.queue(async()=>{var s,o,l;if(!this._deleted&&(this.persistenceManager=await _i.create(this,e),(s=this._resolvePersistenceManagerAvailable)==null||s.call(this),!this._deleted)){if((o=this._popupRedirectResolver)!=null&&o._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((l=this.currentUser)==null?void 0:l.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Fa(this,{idToken:e}),s=await Yt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(s)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var l;if(Gt(this.app)){const u=this.app.settings.authIdToken;return u?new Promise(h=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(u).then(h,h))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let s=t,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const u=(l=this.redirectUser)==null?void 0:l._redirectEventId,h=s==null?void 0:s._redirectEventId,p=await this.tryRedirectSignIn(e);(!u||u===h)&&(p!=null&&p.user)&&(s=p.user,o=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(s)}catch(u){s=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(u))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return Y(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ua(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=DE()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Gt(this.app))return Promise.reject(nr(this));const t=e?ot(e):null;return t&&Y(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&Y(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Gt(this.app)?Promise.reject(nr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Gt(this.app)?Promise.reject(nr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(En(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await eC(this),t=new nC(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Mr("auth","Firebase",e())}onAuthStateChanged(e,t,s){return this.registerStateListener(this.authStateSubscription,e,t,s)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,s){return this.registerStateListener(this.idTokenSubscription,e,t,s)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(s.tenantId=this.tenantId),await QE(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const s=await this.getOrInitRedirectPersistenceManager(t);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&En(e)||this._popupRedirectResolver;Y(t,this,"argument-error"),this.redirectPersistenceManager=await _i.create(this,[En(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,s;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((s=this.redirectUser)==null?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,s,o){if(this._deleted)return()=>{};const l=typeof t=="function"?t:t.next.bind(t);let u=!1;const h=this._isInitialized?Promise.resolve():this._initializationPromise;if(Y(h,this,"internal-error"),h.then(()=>{u||l(this.currentUser)}),typeof t=="function"){const p=e.addObserver(t,s,o);return()=>{u=!0,p()}}else{const p=e.addObserver(t);return()=>{u=!0,p()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Y(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=c_(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var o;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((o=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:o.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){var t;if(Gt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&AE(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Oi(r){return ot(r)}class hg{constructor(e){this.auth=e,this.observer=null,this.addObserver=g1(t=>this.observer=t)}get next(){return Y(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ll={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function iC(r){ll=r}function u_(r){return ll.loadJS(r)}function sC(){return ll.recaptchaEnterpriseScript}function oC(){return ll.gapiScript}function aC(r){return`__${r}${Math.floor(Math.random()*1e6)}`}class lC{constructor(){this.enterprise=new cC}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class cC{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const uC="recaptcha-enterprise",d_="NO_RECAPTCHA";class dC{constructor(e){this.type=uC,this.auth=Oi(e)}async verify(e="verify",t=!1){async function s(l){if(!t){if(l.tenantId==null&&l._agentRecaptchaConfig!=null)return l._agentRecaptchaConfig.siteKey;if(l.tenantId!=null&&l._tenantRecaptchaConfigs[l.tenantId]!==void 0)return l._tenantRecaptchaConfigs[l.tenantId].siteKey}return new Promise(async(u,h)=>{VE(l,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(p=>{if(p.recaptchaKey===void 0)h(new Error("recaptcha Enterprise site key undefined"));else{const m=new $E(p);return l.tenantId==null?l._agentRecaptchaConfig=m:l._tenantRecaptchaConfigs[l.tenantId]=m,u(m.siteKey)}}).catch(p=>{h(p)})})}function o(l,u,h){const p=window.grecaptcha;ag(p)?p.enterprise.ready(()=>{p.enterprise.execute(l,{action:e}).then(m=>{u(m)}).catch(()=>{u(d_)})}):h(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new lC().execute("siteKey",{action:"verify"}):new Promise((l,u)=>{s(this.auth).then(h=>{if(!t&&ag(window.grecaptcha))o(h,l,u);else{if(typeof window>"u"){u(new Error("RecaptchaVerifier is only supported in browser"));return}let p=sC();p.length!==0&&(p+=h),u_(p).then(()=>{o(h,l,u)}).catch(m=>{u(m)})}}).catch(h=>{u(h)})})}}async function fg(r,e,t,s=!1,o=!1){const l=new dC(r);let u;if(o)u=d_;else try{u=await l.verify(t)}catch{u=await l.verify(t,!0)}const h={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in h){const p=h.phoneEnrollmentInfo.phoneNumber,m=h.phoneEnrollmentInfo.recaptchaToken;Object.assign(h,{phoneEnrollmentInfo:{phoneNumber:p,recaptchaToken:m,captchaResponse:u,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in h){const p=h.phoneSignInInfo.recaptchaToken;Object.assign(h,{phoneSignInInfo:{recaptchaToken:p,captchaResponse:u,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return h}return s?Object.assign(h,{captchaResp:u}):Object.assign(h,{captchaResponse:u}),Object.assign(h,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(h,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),h}async function pg(r,e,t,s,o){var l;if((l=r._getRecaptchaConfig())!=null&&l.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const u=await fg(r,e,t,t==="getOobCode");return s(r,u)}else return s(r,e).catch(async u=>{if(u.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const h=await fg(r,e,t,t==="getOobCode");return s(r,h)}else return Promise.reject(u)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hC(r,e){const t=jr(r,"auth");if(t.isInitialized()){const o=t.getImmediate(),l=t.getOptions();if(ir(l,e??{}))return o;Zt(o,"already-initialized")}return t.initialize({options:e})}function fC(r,e){const t=(e==null?void 0:e.persistence)||[],s=(Array.isArray(t)?t:[t]).map(En);e!=null&&e.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function pC(r,e,t){const s=Oi(r);Y(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const o=!1,l=h_(e),{host:u,port:h}=mC(e),p=h===null?"":`:${h}`,m={url:`${l}//${u}${p}/`},v=Object.freeze({host:u,port:h,protocol:l.replace(":",""),options:Object.freeze({disableWarnings:o})});if(!s._canInitEmulator){Y(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),Y(ir(m,s.config.emulator)&&ir(v,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=m,s.emulatorConfig=v,s.settings.appVerificationDisabledForTesting=!0,to(u)?zy(`${l}//${u}${p}`):gC()}function h_(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function mC(r){const e=h_(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const s=t[2].split("@").pop()||"",o=/^(\[[^\]]+\])(:|$)/.exec(s);if(o){const l=o[1];return{host:l,port:mg(s.substr(l.length+1))}}else{const[l,u]=s.split(":");return{host:l,port:mg(u)}}}function mg(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function gC(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Md{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Sn("not implemented")}_getIdTokenResponse(e){return Sn("not implemented")}_linkToIdToken(e,t){return Sn("not implemented")}_getReauthenticationResolver(e){return Sn("not implemented")}}async function yC(r,e){return ar(r,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _C(r,e){return al(r,"POST","/v1/accounts:signInWithPassword",Fr(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vC(r,e){return al(r,"POST","/v1/accounts:signInWithEmailLink",Fr(r,e))}async function wC(r,e){return al(r,"POST","/v1/accounts:signInWithEmailLink",Fr(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs extends Md{constructor(e,t,s,o=null){super("password",s),this._email=e,this._password=t,this._tenantId=o}static _fromEmailAndPassword(e,t){return new Hs(e,t,"password")}static _fromEmailAndCode(e,t,s=null){return new Hs(e,t,"emailLink",s)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return pg(e,t,"signInWithPassword",_C);case"emailLink":return vC(e,{email:this._email,oobCode:this._password});default:Zt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const s={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return pg(e,s,"signUpPassword",yC);case"emailLink":return wC(e,{idToken:t,email:this._email,oobCode:this._password});default:Zt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vi(r,e){return al(r,"POST","/v1/accounts:signInWithIdp",Fr(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xC="http://localhost";class Nr extends Md{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Nr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Zt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:o,...l}=t;if(!s||!o)return null;const u=new Nr(s,o);return u.idToken=l.idToken||void 0,u.accessToken=l.accessToken||void 0,u.secret=l.secret,u.nonce=l.nonce,u.pendingToken=l.pendingToken||null,u}_getIdTokenResponse(e){const t=this.buildRequest();return vi(e,t)}_linkToIdToken(e,t){const s=this.buildRequest();return s.idToken=t,vi(e,s)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,vi(e,t)}buildRequest(){const e={requestUri:xC,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=bi(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function SC(r){switch(r){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function EC(r){const e=Rs(Ps(r)).link,t=e?Rs(Ps(e)).deep_link_id:null,s=Rs(Ps(r)).deep_link_id;return(s?Rs(Ps(s)).link:null)||s||t||e||r}class jd{constructor(e){const t=Rs(Ps(e)),s=t.apiKey??null,o=t.oobCode??null,l=SC(t.mode??null);Y(s&&o&&l,"argument-error"),this.apiKey=s,this.operation=l,this.code=o,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=EC(e);try{return new jd(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Li{constructor(){this.providerId=Li.PROVIDER_ID}static credential(e,t){return Hs._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const s=jd.parseLink(t);return Y(s,"argument-error"),Hs._fromEmailAndCode(e,s.code,s.tenantId)}}Li.PROVIDER_ID="password";Li.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Li.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f_{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ro extends f_{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn extends ro{constructor(){super("facebook.com")}static credential(e){return Nr._fromParams({providerId:Qn.PROVIDER_ID,signInMethod:Qn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Qn.credentialFromTaggedObject(e)}static credentialFromError(e){return Qn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Qn.credential(e.oauthAccessToken)}catch{return null}}}Qn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Qn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn extends ro{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Nr._fromParams({providerId:Jn.PROVIDER_ID,signInMethod:Jn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Jn.credentialFromTaggedObject(e)}static credentialFromError(e){return Jn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:s}=e;if(!t&&!s)return null;try{return Jn.credential(t,s)}catch{return null}}}Jn.GOOGLE_SIGN_IN_METHOD="google.com";Jn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn extends ro{constructor(){super("github.com")}static credential(e){return Nr._fromParams({providerId:Xn.PROVIDER_ID,signInMethod:Xn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Xn.credentialFromTaggedObject(e)}static credentialFromError(e){return Xn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Xn.credential(e.oauthAccessToken)}catch{return null}}}Xn.GITHUB_SIGN_IN_METHOD="github.com";Xn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn extends ro{constructor(){super("twitter.com")}static credential(e,t){return Nr._fromParams({providerId:Zn.PROVIDER_ID,signInMethod:Zn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Zn.credentialFromTaggedObject(e)}static credentialFromError(e){return Zn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:s}=e;if(!t||!s)return null;try{return Zn.credential(t,s)}catch{return null}}}Zn.TWITTER_SIGN_IN_METHOD="twitter.com";Zn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ci{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,s,o=!1){const l=await Yt._fromIdTokenResponse(e,s,o),u=gg(s);return new Ci({user:l,providerId:u,_tokenResponse:s,operationType:t})}static async _forOperation(e,t,s){await e._updateTokensIfNecessary(s,!0);const o=gg(s);return new Ci({user:e,providerId:o,_tokenResponse:s,operationType:t})}}function gg(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class za extends hn{constructor(e,t,s,o){super(t.code,t.message),this.operationType=s,this.user=o,Object.setPrototypeOf(this,za.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,t,s,o){return new za(e,t,s,o)}}function p_(r,e,t,s){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(l=>{throw l.code==="auth/multi-factor-auth-required"?za._fromErrorAndOperation(r,l,e,s):l})}async function CC(r,e,t=!1){const s=await Ws(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return Ci._forOperation(r,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kC(r,e,t=!1){const{auth:s}=r;if(Gt(s.app))return Promise.reject(nr(s));const o="reauthenticate";try{const l=await Ws(r,p_(s,o,e,r),t);Y(l.idToken,s,"internal-error");const u=Ld(l.idToken);Y(u,s,"internal-error");const{sub:h}=u;return Y(r.uid===h,s,"user-mismatch"),Ci._forOperation(r,o,l)}catch(l){throw(l==null?void 0:l.code)==="auth/user-not-found"&&Zt(s,"user-mismatch"),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function m_(r,e,t=!1){if(Gt(r.app))return Promise.reject(nr(r));const s="signIn",o=await p_(r,s,e),l=await Ci._fromIdTokenResponse(r,s,o);return t||await r._updateCurrentUser(l.user),l}async function IC(r,e){return m_(Oi(r),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function TC(r){const e=Oi(r);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function NC(r,e,t){return Gt(r.app)?Promise.reject(nr(r)):IC(ot(r),Li.credential(e,t)).catch(async s=>{throw s.code==="auth/password-does-not-meet-requirements"&&TC(r),s})}function RC(r,e,t,s){return ot(r).onIdTokenChanged(e,t,s)}function PC(r,e,t){return ot(r).beforeAuthStateChanged(e,t)}function g_(r,e,t,s){return ot(r).onAuthStateChanged(e,t,s)}function bC(r){return ot(r).signOut()}const $a="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y_{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem($a,"1"),this.storage.removeItem($a),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AC=1e3,OC=10;class __ extends y_{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=l_(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const s=this.storage.getItem(t),o=this.localCache[t];s!==o&&e(t,o,s)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((u,h,p)=>{this.notifyListeners(u,p)});return}const s=e.key;t?this.detachListener():this.stopPolling();const o=()=>{const u=this.storage.getItem(s);!t&&this.localCache[s]===u||this.notifyListeners(s,u)},l=this.storage.getItem(s);XE()&&l!==e.newValue&&e.newValue!==e.oldValue?setTimeout(o,OC):o()}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const o of Array.from(s))o(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:s}),!0)})},AC)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}__.type="LOCAL";const LC=__;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v_ extends y_{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}v_.type="SESSION";const w_=v_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function DC(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cl{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(o=>o.isListeningto(e));if(t)return t;const s=new cl(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:s,eventType:o,data:l}=t.data,u=this.handlersMap[o];if(!(u!=null&&u.size))return;t.ports[0].postMessage({status:"ack",eventId:s,eventType:o});const h=Array.from(u).map(async m=>m(t.origin,l)),p=await DC(h);t.ports[0].postMessage({status:"done",eventId:s,eventType:o,response:p})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}cl.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fd(r="",e=10){let t="";for(let s=0;s<e;s++)t+=Math.floor(Math.random()*10);return r+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MC{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,s=50){const o=typeof MessageChannel<"u"?new MessageChannel:null;if(!o)throw new Error("connection_unavailable");let l,u;return new Promise((h,p)=>{const m=Fd("",20);o.port1.start();const v=setTimeout(()=>{p(new Error("unsupported_event"))},s);u={messageChannel:o,onMessage(_){const x=_;if(x.data.eventId===m)switch(x.data.status){case"ack":clearTimeout(v),l=setTimeout(()=>{p(new Error("timeout"))},3e3);break;case"done":clearTimeout(l),h(x.data.response);break;default:clearTimeout(v),clearTimeout(l),p(new Error("invalid_response"));break}}},this.handlers.add(u),o.port1.addEventListener("message",u.onMessage),this.target.postMessage({eventType:e,eventId:m,data:t},[o.port2])}).finally(()=>{u&&this.removeMessageHandler(u)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cn(){return window}function jC(r){cn().location.href=r}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x_(){return typeof cn().WorkerGlobalScope<"u"&&typeof cn().importScripts=="function"}async function FC(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function UC(){var r;return((r=navigator==null?void 0:navigator.serviceWorker)==null?void 0:r.controller)||null}function zC(){return x_()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S_="firebaseLocalStorageDb",$C=1,Va="firebaseLocalStorage",E_="fbase_key";class io{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function ul(r,e){return r.transaction([Va],e?"readwrite":"readonly").objectStore(Va)}function VC(){const r=indexedDB.deleteDatabase(S_);return new io(r).toPromise()}function ld(){const r=indexedDB.open(S_,$C);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const s=r.result;try{s.createObjectStore(Va,{keyPath:E_})}catch(o){t(o)}}),r.addEventListener("success",async()=>{const s=r.result;s.objectStoreNames.contains(Va)?e(s):(s.close(),await VC(),e(await ld()))})})}async function yg(r,e,t){const s=ul(r,!0).put({[E_]:e,value:t});return new io(s).toPromise()}async function BC(r,e){const t=ul(r,!1).get(e),s=await new io(t).toPromise();return s===void 0?null:s.value}function _g(r,e){const t=ul(r,!0).delete(e);return new io(t).toPromise()}const WC=800,HC=3;class C_{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ld(),this.db)}async _withRetries(e){let t=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(t++>HC)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return x_()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=cl._getInstance(zC()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,s;if(this.activeServiceWorker=await FC(),!this.activeServiceWorker)return;this.sender=new MC(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(s=e[0])!=null&&s.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||UC()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ld();return await yg(e,$a,"1"),await _g(e,$a),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(s=>yg(s,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(s=>BC(s,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>_g(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(o=>{const l=ul(o,!1).getAll();return new io(l).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],s=new Set;if(e.length!==0)for(const{fbase_key:o,value:l}of e)s.add(o),JSON.stringify(this.localCache[o])!==JSON.stringify(l)&&(this.notifyListeners(o,l),t.push(o));for(const o of Object.keys(this.localCache))this.localCache[o]&&!s.has(o)&&(this.notifyListeners(o,null),t.push(o));return t}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const o of Array.from(s))o(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),WC)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}C_.type="LOCAL";const KC=C_;new no(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function GC(r,e){return e?En(e):(Y(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ud extends Md{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return vi(e,this._buildIdpRequest())}_linkToIdToken(e,t){return vi(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return vi(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function qC(r){return m_(r.auth,new Ud(r),r.bypassAuthState)}function YC(r){const{auth:e,user:t}=r;return Y(t,e,"internal-error"),kC(t,new Ud(r),r.bypassAuthState)}async function QC(r){const{auth:e,user:t}=r;return Y(t,e,"internal-error"),CC(t,new Ud(r),r.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k_{constructor(e,t,s,o,l=!1){this.auth=e,this.resolver=s,this.user=o,this.bypassAuthState=l,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:s,postBody:o,tenantId:l,error:u,type:h}=e;if(u){this.reject(u);return}const p={auth:this.auth,requestUri:t,sessionId:s,tenantId:l||void 0,postBody:o||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(h)(p))}catch(m){this.reject(m)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return qC;case"linkViaPopup":case"linkViaRedirect":return QC;case"reauthViaPopup":case"reauthViaRedirect":return YC;default:Zt(this.auth,"internal-error")}}resolve(e){Tn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Tn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JC=new no(2e3,1e4);class pi extends k_{constructor(e,t,s,o,l){super(e,t,o,l),this.provider=s,this.authWindow=null,this.pollId=null,pi.currentPopupAction&&pi.currentPopupAction.cancel(),pi.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Y(e,this.auth,"internal-error"),e}async onExecution(){Tn(this.filter.length===1,"Popup operations only handle one event");const e=Fd();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ln(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(ln(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,pi.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,s;if((s=(t=this.authWindow)==null?void 0:t.window)!=null&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ln(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,JC.get())};e()}}pi.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XC="pendingRedirect",Na=new Map;class ZC extends k_{constructor(e,t,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,s),this.eventId=null}async execute(){let e=Na.get(this.auth._key());if(!e){try{const s=await ek(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(t){e=()=>Promise.reject(t)}Na.set(this.auth._key(),e)}return this.bypassAuthState||Na.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function ek(r,e){const t=rk(e),s=nk(r);if(!await s._isAvailable())return!1;const o=await s._get(t)==="true";return await s._remove(t),o}function tk(r,e){Na.set(r._key(),e)}function nk(r){return En(r._redirectPersistence)}function rk(r){return Ta(XC,r.config.apiKey,r.name)}async function ik(r,e,t=!1){if(Gt(r.app))return Promise.reject(nr(r));const s=Oi(r),o=GC(s,e),u=await new ZC(s,o,t).execute();return u&&!t&&(delete u.user._redirectEventId,await s._persistUserIfCurrent(u.user),await s._setRedirectUser(null,e)),u}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sk=600*1e3;class ok{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(t=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!ak(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var s;if(e.error&&!I_(e)){const o=((s=e.error.code)==null?void 0:s.split("auth/")[1])||"internal-error";t.onError(ln(this.auth,o))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const s=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=sk&&this.cachedEventUids.clear(),this.cachedEventUids.has(vg(e))}saveEventToCache(e){this.cachedEventUids.add(vg(e)),this.lastProcessedEventTime=Date.now()}}function vg(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function I_({type:r,error:e}){return r==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function ak(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return I_(r);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lk(r,e={}){return ar(r,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ck=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,uk=/^https?/;async function dk(r){if(r.config.emulator)return;const{authorizedDomains:e}=await lk(r);for(const t of e)try{if(hk(t))return}catch{}Zt(r,"unauthorized-domain")}function hk(r){const e=od(),{protocol:t,hostname:s}=new URL(e);if(r.startsWith("chrome-extension://")){const u=new URL(r);return u.hostname===""&&s===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&u.hostname===s}if(!uk.test(t))return!1;if(ck.test(r))return s===r;const o=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+o+"|"+o+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fk=new no(3e4,6e4);function wg(){const r=cn().___jsl;if(r!=null&&r.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function pk(r){return new Promise((e,t)=>{var o,l,u;function s(){wg(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{wg(),t(ln(r,"network-request-failed"))},timeout:fk.get()})}if((l=(o=cn().gapi)==null?void 0:o.iframes)!=null&&l.Iframe)e(gapi.iframes.getContext());else if((u=cn().gapi)!=null&&u.load)s();else{const h=aC("iframefcb");return cn()[h]=()=>{gapi.load?s():t(ln(r,"network-request-failed"))},u_(`${oC()}?onload=${h}`).catch(p=>t(p))}}).catch(e=>{throw Ra=null,e})}let Ra=null;function mk(r){return Ra=Ra||pk(r),Ra}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gk=new no(5e3,15e3),yk="__/auth/iframe",_k="emulator/auth/iframe",vk={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},wk=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function xk(r){const e=r.config;Y(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?Od(e,_k):`https://${r.config.authDomain}/${yk}`,s={apiKey:e.apiKey,appName:r.name,v:Ai},o=wk.get(r.config.apiHost);o&&(s.eid=o);const l=r._getFrameworks();return l.length&&(s.fw=l.join(",")),`${t}?${bi(s).slice(1)}`}async function Sk(r){const e=await mk(r),t=cn().gapi;return Y(t,r,"internal-error"),e.open({where:document.body,url:xk(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:vk,dontclear:!0},s=>new Promise(async(o,l)=>{await s.restyle({setHideOnLeave:!1});const u=ln(r,"network-request-failed"),h=cn().setTimeout(()=>{l(u)},gk.get());function p(){cn().clearTimeout(h),o(s)}s.ping(p).then(p,()=>{l(u)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ek={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Ck=500,kk=600,Ik="_blank",Tk="http://localhost";class xg{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Nk(r,e,t,s=Ck,o=kk){const l=Math.max((window.screen.availHeight-o)/2,0).toString(),u=Math.max((window.screen.availWidth-s)/2,0).toString();let h="";const p={...Ek,width:s.toString(),height:o.toString(),top:l,left:u},m=pt().toLowerCase();t&&(h=r_(m)?Ik:t),t_(m)&&(e=e||Tk,p.scrollbars="yes");const v=Object.entries(p).reduce((x,[I,N])=>`${x}${I}=${N},`,"");if(JE(m)&&h!=="_self")return Rk(e||"",h),new xg(null);const _=window.open(e||"",h,v);Y(_,r,"popup-blocked");try{_.focus()}catch{}return new xg(_)}function Rk(r,e){const t=document.createElement("a");t.href=r,t.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pk="__/auth/handler",bk="emulator/auth/handler",Ak=encodeURIComponent("fac");async function Sg(r,e,t,s,o,l){Y(r.config.authDomain,r,"auth-domain-config-required"),Y(r.config.apiKey,r,"invalid-api-key");const u={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:s,v:Ai,eventId:o};if(e instanceof f_){e.setDefaultLanguage(r.languageCode),u.providerId=e.providerId||"",ed(e.getCustomParameters())||(u.customParameters=JSON.stringify(e.getCustomParameters()));for(const[v,_]of Object.entries({}))u[v]=_}if(e instanceof ro){const v=e.getScopes().filter(_=>_!=="");v.length>0&&(u.scopes=v.join(","))}r.tenantId&&(u.tid=r.tenantId);const h=u;for(const v of Object.keys(h))h[v]===void 0&&delete h[v];const p=await r._getAppCheckToken(),m=p?`#${Ak}=${encodeURIComponent(p)}`:"";return`${Ok(r)}?${bi(h).slice(1)}${m}`}function Ok({config:r}){return r.emulator?Od(r,bk):`https://${r.authDomain}/${Pk}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lu="webStorageSupport";class Lk{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=w_,this._completeRedirectFn=ik,this._overrideRedirectResult=tk}async _openPopup(e,t,s,o){var u;Tn((u=this.eventManagers[e._key()])==null?void 0:u.manager,"_initialize() not called before _openPopup()");const l=await Sg(e,t,s,od(),o);return Nk(e,l,Fd())}async _openRedirect(e,t,s,o){await this._originValidation(e);const l=await Sg(e,t,s,od(),o);return jC(l),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:o,promise:l}=this.eventManagers[t];return o?Promise.resolve(o):(Tn(l,"If manager is not set, promise should be"),l)}const s=this.initAndGetManager(e);return this.eventManagers[t]={promise:s},s.catch(()=>{delete this.eventManagers[t]}),s}async initAndGetManager(e){const t=await Sk(e),s=new ok(e);return t.register("authEvent",o=>(Y(o==null?void 0:o.authEvent,e,"invalid-auth-event"),{status:s.onEvent(o.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=t,s}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Lu,{type:Lu},o=>{var u;const l=(u=o==null?void 0:o[0])==null?void 0:u[Lu];l!==void 0&&t(!!l),Zt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=dk(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return l_()||n_()||Dd()}}const Dk=Lk;var Eg="@firebase/auth",Cg="1.13.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mk{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){Y(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jk(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Fk(r){un(new Xt("auth",(e,{options:t})=>{const s=e.getProvider("app").getImmediate(),o=e.getProvider("heartbeat"),l=e.getProvider("app-check-internal"),{apiKey:u,authDomain:h}=s.options;Y(u&&!u.includes(":"),"invalid-api-key",{appName:s.name});const p={apiKey:u,authDomain:h,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:c_(r)},m=new rC(s,o,l,p);return fC(m,t),m},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,s)=>{e.getProvider("auth-internal").initialize()})),un(new Xt("auth-internal",e=>{const t=Oi(e.getProvider("auth").getImmediate());return(s=>new Mk(s))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ut(Eg,Cg,jk(r)),Ut(Eg,Cg,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uk=300,zk=Ly("authIdTokenMaxAge")||Uk;let kg=null;const $k=r=>async e=>{const t=e&&await e.getIdTokenResult(),s=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(s&&s>zk)return;const o=t==null?void 0:t.token;kg!==o&&(kg=o,await fetch(r,{method:o?"POST":"DELETE",headers:o?{Authorization:`Bearer ${o}`}:{}}))};function Vk(r=bd()){const e=jr(r,"auth");if(e.isInitialized())return e.getImmediate();const t=hC(r,{popupRedirectResolver:Dk,persistence:[KC,LC,w_]}),s=Ly("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const l=new URL(s,location.origin);if(location.origin===l.origin){const u=$k(l.toString());PC(t,u,()=>u(t.currentUser)),RC(t,h=>u(h))}}const o=Ay("auth");return o&&pC(t,`http://${o}`),t}function Bk(){var r;return((r=document.getElementsByTagName("head"))==null?void 0:r[0])??document}iC({loadJS(r){return new Promise((e,t)=>{const s=document.createElement("script");s.setAttribute("src",r),s.onload=e,s.onerror=o=>{const l=ln("internal-error");l.customData=o,t(l)},s.type="text/javascript",s.charset="UTF-8",Bk().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Fk("Browser");var Wk="firebase",Hk="12.13.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ut(Wk,Hk,"app");const T_="@firebase/installations",zd="0.6.22";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N_=1e4,R_=`w:${zd}`,P_="FIS_v2",Kk="https://firebaseinstallations.googleapis.com/v1",Gk=3600*1e3,qk="installations",Yk="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qk={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Rr=new Mr(qk,Yk,Qk);function b_(r){return r instanceof hn&&r.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function A_({projectId:r}){return`${Kk}/projects/${r}/installations`}function O_(r){return{token:r.token,requestStatus:2,expiresIn:Xk(r.expiresIn),creationTime:Date.now()}}async function L_(r,e){const s=(await e.json()).error;return Rr.create("request-failed",{requestName:r,serverCode:s.code,serverMessage:s.message,serverStatus:s.status})}function D_({apiKey:r}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":r})}function Jk(r,{refreshToken:e}){const t=D_(r);return t.append("Authorization",Zk(e)),t}async function M_(r){const e=await r();return e.status>=500&&e.status<600?r():e}function Xk(r){return Number(r.replace("s","000"))}function Zk(r){return`${P_} ${r}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eI({appConfig:r,heartbeatServiceProvider:e},{fid:t}){const s=A_(r),o=D_(r),l=e.getImmediate({optional:!0});if(l){const m=await l.getHeartbeatsHeader();m&&o.append("x-firebase-client",m)}const u={fid:t,authVersion:P_,appId:r.appId,sdkVersion:R_},h={method:"POST",headers:o,body:JSON.stringify(u)},p=await M_(()=>fetch(s,h));if(p.ok){const m=await p.json();return{fid:m.fid||t,registrationStatus:2,refreshToken:m.refreshToken,authToken:O_(m.authToken)}}else throw await L_("Create Installation",p)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j_(r){return new Promise(e=>{setTimeout(e,r)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tI(r){return btoa(String.fromCharCode(...r)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nI=/^[cdef][\w-]{21}$/,cd="";function rI(){try{const r=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(r),r[0]=112+r[0]%16;const t=iI(r);return nI.test(t)?t:cd}catch{return cd}}function iI(r){return tI(r).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dl(r){return`${r.appName}!${r.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F_=new Map;function U_(r,e){const t=dl(r);z_(t,e),sI(t,e)}function z_(r,e){const t=F_.get(r);if(t)for(const s of t)s(e)}function sI(r,e){const t=oI();t&&t.postMessage({key:r,fid:e}),aI()}let Er=null;function oI(){return!Er&&"BroadcastChannel"in self&&(Er=new BroadcastChannel("[Firebase] FID Change"),Er.onmessage=r=>{z_(r.data.key,r.data.fid)}),Er}function aI(){F_.size===0&&Er&&(Er.close(),Er=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lI="firebase-installations-database",cI=1,Pr="firebase-installations-store";let Du=null;function $d(){return Du||(Du=By(lI,cI,{upgrade:(r,e)=>{switch(e){case 0:r.createObjectStore(Pr)}}})),Du}async function Ba(r,e){const t=dl(r),o=(await $d()).transaction(Pr,"readwrite"),l=o.objectStore(Pr),u=await l.get(t);return await l.put(e,t),await o.done,(!u||u.fid!==e.fid)&&U_(r,e.fid),e}async function $_(r){const e=dl(r),s=(await $d()).transaction(Pr,"readwrite");await s.objectStore(Pr).delete(e),await s.done}async function hl(r,e){const t=dl(r),o=(await $d()).transaction(Pr,"readwrite"),l=o.objectStore(Pr),u=await l.get(t),h=e(u);return h===void 0?await l.delete(t):await l.put(h,t),await o.done,h&&(!u||u.fid!==h.fid)&&U_(r,h.fid),h}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vd(r){let e;const t=await hl(r.appConfig,s=>{const o=uI(s),l=dI(r,o);return e=l.registrationPromise,l.installationEntry});return t.fid===cd?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function uI(r){const e=r||{fid:rI(),registrationStatus:0};return V_(e)}function dI(r,e){if(e.registrationStatus===0){if(!navigator.onLine){const o=Promise.reject(Rr.create("app-offline"));return{installationEntry:e,registrationPromise:o}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},s=hI(r,t);return{installationEntry:t,registrationPromise:s}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:fI(r)}:{installationEntry:e}}async function hI(r,e){try{const t=await eI(r,e);return Ba(r.appConfig,t)}catch(t){throw b_(t)&&t.customData.serverCode===409?await $_(r.appConfig):await Ba(r.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function fI(r){let e=await Ig(r.appConfig);for(;e.registrationStatus===1;)await j_(100),e=await Ig(r.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:s}=await Vd(r);return s||t}return e}function Ig(r){return hl(r,e=>{if(!e)throw Rr.create("installation-not-found");return V_(e)})}function V_(r){return pI(r)?{fid:r.fid,registrationStatus:0}:r}function pI(r){return r.registrationStatus===1&&r.registrationTime+N_<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mI({appConfig:r,heartbeatServiceProvider:e},t){const s=gI(r,t),o=Jk(r,t),l=e.getImmediate({optional:!0});if(l){const m=await l.getHeartbeatsHeader();m&&o.append("x-firebase-client",m)}const u={installation:{sdkVersion:R_,appId:r.appId}},h={method:"POST",headers:o,body:JSON.stringify(u)},p=await M_(()=>fetch(s,h));if(p.ok){const m=await p.json();return O_(m)}else throw await L_("Generate Auth Token",p)}function gI(r,{fid:e}){return`${A_(r)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bd(r,e=!1){let t;const s=await hl(r.appConfig,l=>{if(!B_(l))throw Rr.create("not-registered");const u=l.authToken;if(!e&&vI(u))return l;if(u.requestStatus===1)return t=yI(r,e),l;{if(!navigator.onLine)throw Rr.create("app-offline");const h=xI(l);return t=_I(r,h),h}});return t?await t:s.authToken}async function yI(r,e){let t=await Tg(r.appConfig);for(;t.authToken.requestStatus===1;)await j_(100),t=await Tg(r.appConfig);const s=t.authToken;return s.requestStatus===0?Bd(r,e):s}function Tg(r){return hl(r,e=>{if(!B_(e))throw Rr.create("not-registered");const t=e.authToken;return SI(t)?{...e,authToken:{requestStatus:0}}:e})}async function _I(r,e){try{const t=await mI(r,e),s={...e,authToken:t};return await Ba(r.appConfig,s),t}catch(t){if(b_(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await $_(r.appConfig);else{const s={...e,authToken:{requestStatus:0}};await Ba(r.appConfig,s)}throw t}}function B_(r){return r!==void 0&&r.registrationStatus===2}function vI(r){return r.requestStatus===2&&!wI(r)}function wI(r){const e=Date.now();return e<r.creationTime||r.creationTime+r.expiresIn<e+Gk}function xI(r){const e={requestStatus:1,requestTime:Date.now()};return{...r,authToken:e}}function SI(r){return r.requestStatus===1&&r.requestTime+N_<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function EI(r){const e=r,{installationEntry:t,registrationPromise:s}=await Vd(e);return s?s.catch(console.error):Bd(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function CI(r,e=!1){const t=r;return await kI(t),(await Bd(t,e)).token}async function kI(r){const{registrationPromise:e}=await Vd(r);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function II(r){if(!r||!r.options)throw Mu("App Configuration");if(!r.name)throw Mu("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!r.options[t])throw Mu(t);return{appName:r.name,projectId:r.options.projectId,apiKey:r.options.apiKey,appId:r.options.appId}}function Mu(r){return Rr.create("missing-app-config-values",{valueName:r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W_="installations",TI="installations-internal",NI=r=>{const e=r.getProvider("app").getImmediate(),t=II(e),s=jr(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:s,_delete:()=>Promise.resolve()}},RI=r=>{const e=r.getProvider("app").getImmediate(),t=jr(e,W_).getImmediate();return{getId:()=>EI(t),getToken:o=>CI(t,o)}};function PI(){un(new Xt(W_,NI,"PUBLIC")),un(new Xt(TI,RI,"PRIVATE"))}PI();Ut(T_,zd);Ut(T_,zd,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wa="analytics",bI="firebase_id",AI="origin",OI=60*1e3,LI="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Wd="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ft=new ol("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DI={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Pt=new Mr("analytics","Analytics",DI);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MI(r){if(!r.startsWith(Wd)){const e=Pt.create("invalid-gtag-resource",{gtagURL:r});return ft.warn(e.message),""}return r}function H_(r){return Promise.all(r.map(e=>e.catch(t=>t)))}function jI(r,e){let t;return window.trustedTypes&&(t=window.trustedTypes.createPolicy(r,e)),t}function FI(r,e){const t=jI("firebase-js-sdk-policy",{createScriptURL:MI}),s=document.createElement("script"),o=`${Wd}?l=${r}&id=${e}`;s.src=t?t==null?void 0:t.createScriptURL(o):o,s.async=!0,document.head.appendChild(s)}function UI(r){let e=[];return Array.isArray(window[r])?e=window[r]:window[r]=e,e}async function zI(r,e,t,s,o,l){const u=s[o];try{if(u)await e[u];else{const p=(await H_(t)).find(m=>m.measurementId===o);p&&await e[p.appId]}}catch(h){ft.error(h)}r("config",o,l)}async function $I(r,e,t,s,o){try{let l=[];if(o&&o.send_to){let u=o.send_to;Array.isArray(u)||(u=[u]);const h=await H_(t);for(const p of u){const m=h.find(_=>_.measurementId===p),v=m&&e[m.appId];if(v)l.push(v);else{l=[];break}}}l.length===0&&(l=Object.values(e)),await Promise.all(l),r("event",s,o||{})}catch(l){ft.error(l)}}function VI(r,e,t,s){async function o(l,...u){try{if(l==="event"){const[h,p]=u;await $I(r,e,t,h,p)}else if(l==="config"){const[h,p]=u;await zI(r,e,t,s,h,p)}else if(l==="consent"){const[h,p]=u;r("consent",h,p)}else if(l==="get"){const[h,p,m]=u;r("get",h,p,m)}else if(l==="set"){const[h]=u;r("set",h)}else r(l,...u)}catch(h){ft.error(h)}}return o}function BI(r,e,t,s,o){let l=function(...u){window[s].push(arguments)};return window[o]&&typeof window[o]=="function"&&(l=window[o]),window[o]=VI(l,r,e,t),{gtagCore:l,wrappedGtag:window[o]}}function WI(r){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(Wd)&&t.src.includes(r))return t;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HI=30,KI=1e3;class GI{constructor(e={},t=KI){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const K_=new GI;function qI(r){return new Headers({Accept:"application/json","x-goog-api-key":r})}async function YI(r){var u;const{appId:e,apiKey:t}=r,s={method:"GET",headers:qI(t)},o=LI.replace("{app-id}",e),l=await fetch(o,s);if(l.status!==200&&l.status!==304){let h="";try{const p=await l.json();(u=p.error)!=null&&u.message&&(h=p.error.message)}catch{}throw Pt.create("config-fetch-failed",{httpStatus:l.status,responseMessage:h})}return l.json()}async function QI(r,e=K_,t){const{appId:s,apiKey:o,measurementId:l}=r.options;if(!s)throw Pt.create("no-app-id");if(!o){if(l)return{measurementId:l,appId:s};throw Pt.create("no-api-key")}const u=e.getThrottleMetadata(s)||{backoffCount:0,throttleEndTimeMillis:Date.now()},h=new ZI;return setTimeout(async()=>{h.abort()},OI),G_({appId:s,apiKey:o,measurementId:l},u,h,e)}async function G_(r,{throttleEndTimeMillis:e,backoffCount:t},s,o=K_){var h;const{appId:l,measurementId:u}=r;try{await JI(s,e)}catch(p){if(u)return ft.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${u} provided in the "measurementId" field in the local Firebase config. [${p==null?void 0:p.message}]`),{appId:l,measurementId:u};throw p}try{const p=await YI(r);return o.deleteThrottleMetadata(l),p}catch(p){const m=p;if(!XI(m)){if(o.deleteThrottleMetadata(l),u)return ft.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${u} provided in the "measurementId" field in the local Firebase config. [${m==null?void 0:m.message}]`),{appId:l,measurementId:u};throw p}const v=Number((h=m==null?void 0:m.customData)==null?void 0:h.httpStatus)===503?Jm(t,o.intervalMillis,HI):Jm(t,o.intervalMillis),_={throttleEndTimeMillis:Date.now()+v,backoffCount:t+1};return o.setThrottleMetadata(l,_),ft.debug(`Calling attemptFetch again in ${v} millis`),G_(r,_,s,o)}}function JI(r,e){return new Promise((t,s)=>{const o=Math.max(e-Date.now(),0),l=setTimeout(t,o);r.addEventListener(()=>{clearTimeout(l),s(Pt.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function XI(r){if(!(r instanceof hn)||!r.customData)return!1;const e=Number(r.customData.httpStatus);return e===429||e===500||e===503||e===504}class ZI{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function eT(r,e,t,s,o){if(o&&o.global){r("event",t,s);return}else{const l=await e,u={...s,send_to:l};r("event",t,u)}}async function tT(r,e,t,s){if(s&&s.global){const o={};for(const l of Object.keys(t))o[`user_properties.${l}`]=t[l];return r("set",o),Promise.resolve()}else{const o=await e;r("config",o,{update:!0,user_properties:t})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nT(){if(jy())try{await Fy()}catch(r){return ft.warn(Pt.create("indexeddb-unavailable",{errorInfo:r==null?void 0:r.toString()}).message),!1}else return ft.warn(Pt.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function rT(r,e,t,s,o,l,u){const h=QI(r);h.then(x=>{t[x.measurementId]=x.appId,r.options.measurementId&&x.measurementId!==r.options.measurementId&&ft.warn(`The measurement ID in the local Firebase config (${r.options.measurementId}) does not match the measurement ID fetched from the server (${x.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(x=>ft.error(x)),e.push(h);const p=nT().then(x=>{if(x)return s.getId()}),[m,v]=await Promise.all([h,p]);WI(l)||FI(l,m.measurementId),o("js",new Date);const _=(u==null?void 0:u.config)??{};return _[AI]="firebase",_.update=!0,v!=null&&(_[bI]=v),o("config",m.measurementId,_),m.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iT{constructor(e){this.app=e}_delete(){return delete wi[this.app.options.appId],Promise.resolve()}}let wi={},Ng=[];const Rg={};let ju="dataLayer",sT="gtag",Pg,Hd,bg=!1;function oT(){const r=[];if(Dy()&&r.push("This is a browser extension environment."),c1()||r.push("Cookies are not available."),r.length>0){const e=r.map((s,o)=>`(${o+1}) ${s}`).join(" "),t=Pt.create("invalid-analytics-context",{errorInfo:e});ft.warn(t.message)}}function aT(r,e,t){oT();const s=r.options.appId;if(!s)throw Pt.create("no-app-id");if(!r.options.apiKey)if(r.options.measurementId)ft.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${r.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Pt.create("no-api-key");if(wi[s]!=null)throw Pt.create("already-exists",{id:s});if(!bg){UI(ju);const{wrappedGtag:l,gtagCore:u}=BI(wi,Ng,Rg,ju,sT);Hd=l,Pg=u,bg=!0}return wi[s]=rT(r,Ng,Rg,e,Pg,ju,t),new iT(r)}function lT(r=bd()){r=ot(r);const e=jr(r,Wa);return e.isInitialized()?e.getImmediate():cT(r)}function cT(r,e={}){const t=jr(r,Wa);if(t.isInitialized()){const o=t.getImmediate();if(ir(e,t.getOptions()))return o;throw Pt.create("already-initialized")}return t.initialize({options:e})}function uT(r,e,t){r=ot(r),tT(Hd,wi[r.app.options.appId],e,t).catch(s=>ft.error(s))}function dT(r,e,t,s){r=ot(r),eT(Hd,wi[r.app.options.appId],e,t,s).catch(o=>ft.error(o))}const Ag="@firebase/analytics",Og="0.10.22";function hT(){un(new Xt(Wa,(e,{options:t})=>{const s=e.getProvider("app").getImmediate(),o=e.getProvider("installations-internal").getImmediate();return aT(s,o,t)},"PUBLIC")),un(new Xt("analytics-internal",r,"PRIVATE")),Ut(Ag,Og),Ut(Ag,Og,"esm2020");function r(e){try{const t=e.getProvider(Wa).getImmediate();return{logEvent:(s,o,l)=>dT(t,s,o,l),setUserProperties:(s,o)=>uT(t,s,o)}}catch(t){throw Pt.create("interop-component-reg-failed",{reason:t})}}}hT();var Lg={};const Dg="@firebase/database",Mg="1.1.3";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let q_="";function fT(r){q_=r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pT{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),tt(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Vs(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mT{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return en(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y_=function(r){try{if(typeof window<"u"&&typeof window[r]<"u"){const e=window[r];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new pT(e)}}catch{}return new mT},Cr=Y_("localStorage"),gT=Y_("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xi=new ol("@firebase/database"),Q_=(function(){let r=1;return function(){return r++}})(),J_=function(r){const e=v1(r),t=new m1;t.update(e);const s=t.digest();return Id.encodeByteArray(s)},so=function(...r){let e="";for(let t=0;t<r.length;t++){const s=r[t];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=so.apply(null,s):typeof s=="object"?e+=tt(s):e+=s,e+=" "}return e};let Ls=null,jg=!0;const yT=function(r,e){M(!0,"Can't turn on custom loggers persistently."),xi.logLevel=Ee.VERBOSE,Ls=xi.log.bind(xi)},it=function(...r){if(jg===!0&&(jg=!1,Ls===null&&gT.get("logging_enabled")===!0&&yT()),Ls){const e=so.apply(null,r);Ls(e)}},oo=function(r){return function(...e){it(r,...e)}},ud=function(...r){const e="FIREBASE INTERNAL ERROR: "+so(...r);xi.error(e)},Nn=function(...r){const e=`FIREBASE FATAL ERROR: ${so(...r)}`;throw xi.error(e),new Error(e)},Ct=function(...r){const e="FIREBASE WARNING: "+so(...r);xi.warn(e)},_T=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Ct("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Kd=function(r){return typeof r=="number"&&(r!==r||r===Number.POSITIVE_INFINITY||r===Number.NEGATIVE_INFINITY)},vT=function(r){if(document.readyState==="complete")r();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,r())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},ki="[MIN_NAME]",br="[MAX_NAME]",Ur=function(r,e){if(r===e)return 0;if(r===ki||e===br)return-1;if(e===ki||r===br)return 1;{const t=Fg(r),s=Fg(e);return t!==null?s!==null?t-s===0?r.length-e.length:t-s:-1:s!==null?1:r<e?-1:1}},wT=function(r,e){return r===e?0:r<e?-1:1},Cs=function(r,e){if(e&&r in e)return e[r];throw new Error("Missing required key ("+r+") in object: "+tt(e))},Gd=function(r){if(typeof r!="object"||r===null)return tt(r);const e=[];for(const s in r)e.push(s);e.sort();let t="{";for(let s=0;s<e.length;s++)s!==0&&(t+=","),t+=tt(e[s]),t+=":",t+=Gd(r[e[s]]);return t+="}",t},X_=function(r,e){const t=r.length;if(t<=e)return[r];const s=[];for(let o=0;o<t;o+=e)o+e>t?s.push(r.substring(o,t)):s.push(r.substring(o,o+e));return s};function st(r,e){for(const t in r)r.hasOwnProperty(t)&&e(t,r[t])}const Z_=function(r){M(!Kd(r),"Invalid JSON number");const e=11,t=52,s=(1<<e-1)-1;let o,l,u,h,p;r===0?(l=0,u=0,o=1/r===-1/0?1:0):(o=r<0,r=Math.abs(r),r>=Math.pow(2,1-s)?(h=Math.min(Math.floor(Math.log(r)/Math.LN2),s),l=h+s,u=Math.round(r*Math.pow(2,t-h)-Math.pow(2,t))):(l=0,u=Math.round(r/Math.pow(2,1-s-t))));const m=[];for(p=t;p;p-=1)m.push(u%2?1:0),u=Math.floor(u/2);for(p=e;p;p-=1)m.push(l%2?1:0),l=Math.floor(l/2);m.push(o?1:0),m.reverse();const v=m.join("");let _="";for(p=0;p<64;p+=8){let x=parseInt(v.substr(p,8),2).toString(16);x.length===1&&(x="0"+x),_=_+x}return _.toLowerCase()},xT=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},ST=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function ET(r,e){let t="Unknown Error";r==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":r==="permission_denied"?t="Client doesn't have permission to access the desired data.":r==="unavailable"&&(t="The service is unavailable");const s=new Error(r+" at "+e._path.toString()+": "+t);return s.code=r.toUpperCase(),s}const CT=new RegExp("^-?(0*)\\d{1,10}$"),kT=-2147483648,IT=2147483647,Fg=function(r){if(CT.test(r)){const e=Number(r);if(e>=kT&&e<=IT)return e}return null},Di=function(r){try{r()}catch(e){setTimeout(()=>{const t=e.stack||"";throw Ct("Exception was thrown by user callback.",t),e},Math.floor(0))}},TT=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Ds=function(r,e){const t=setTimeout(r,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NT{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,Gt(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)==null||t.get().then(s=>s.addTokenListener(e))}notifyForInvalidToken(){Ct(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RT{constructor(e,t,s){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(o=>this.auth_=o)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(it("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Ct(e)}}class Pa{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Pa.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qd="5",ev="v",tv="s",nv="r",rv="f",iv=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,sv="ls",ov="p",dd="ac",av="websocket",lv="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cv{constructor(e,t,s,o,l=!1,u="",h=!1,p=!1,m=null){this.secure=t,this.namespace=s,this.webSocketOnly=o,this.nodeAdmin=l,this.persistenceKey=u,this.includeNamespaceInQueryParams=h,this.isUsingEmulator=p,this.emulatorOptions=m,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Cr.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Cr.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function PT(r){return r.host!==r.internalHost||r.isCustomHost()||r.includeNamespaceInQueryParams}function uv(r,e,t){M(typeof e=="string","typeof type must == string"),M(typeof t=="object","typeof params must == object");let s;if(e===av)s=(r.secure?"wss://":"ws://")+r.internalHost+"/.ws?";else if(e===lv)s=(r.secure?"https://":"http://")+r.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);PT(r)&&(t.ns=r.namespace);const o=[];return st(t,(l,u)=>{o.push(l+"="+u)}),s+o.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bT{constructor(){this.counters_={}}incrementCounter(e,t=1){en(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return XS(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fu={},Uu={};function Yd(r){const e=r.toString();return Fu[e]||(Fu[e]=new bT),Fu[e]}function AT(r,e){const t=r.toString();return Uu[t]||(Uu[t]=e()),Uu[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OT{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let o=0;o<s.length;++o)s[o]&&Di(()=>{this.onMessage_(s[o])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ug="start",LT="close",DT="pLPCommand",MT="pRTLPCB",dv="id",hv="pw",fv="ser",jT="cb",FT="seg",UT="ts",zT="d",$T="dframe",pv=1870,mv=30,VT=pv-mv,BT=25e3,WT=3e4;class mi{constructor(e,t,s,o,l,u,h){this.connId=e,this.repoInfo=t,this.applicationId=s,this.appCheckToken=o,this.authToken=l,this.transportSessionId=u,this.lastSessionId=h,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=oo(e),this.stats_=Yd(t),this.urlFn=p=>(this.appCheckToken&&(p[dd]=this.appCheckToken),uv(t,lv,p))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new OT(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(WT)),vT(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Qd((...l)=>{const[u,h,p,m,v]=l;if(this.incrementIncomingBytes_(l),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,u===Ug)this.id=h,this.password=p;else if(u===LT)h?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(h,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+u)},(...l)=>{const[u,h]=l;this.incrementIncomingBytes_(l),this.myPacketOrderer.handleResponse(u,h)},()=>{this.onClosed_()},this.urlFn);const s={};s[Ug]="t",s[fv]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[jT]=this.scriptTagHolder.uniqueCallbackIdentifier),s[ev]=qd,this.transportSessionId&&(s[tv]=this.transportSessionId),this.lastSessionId&&(s[sv]=this.lastSessionId),this.applicationId&&(s[ov]=this.applicationId),this.appCheckToken&&(s[dd]=this.appCheckToken),typeof location<"u"&&location.hostname&&iv.test(location.hostname)&&(s[nv]=rv);const o=this.urlFn(s);this.log_("Connecting via long-poll to "+o),this.scriptTagHolder.addTag(o,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){mi.forceAllow_=!0}static forceDisallow(){mi.forceDisallow_=!0}static isAvailable(){return mi.forceAllow_?!0:!mi.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!xT()&&!ST()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=tt(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=Py(t),o=X_(s,VT);for(let l=0;l<o.length;l++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,o.length,o[l]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const s={};s[$T]="t",s[dv]=e,s[hv]=t,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=tt(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class Qd{constructor(e,t,s,o){this.onDisconnect=s,this.urlFn=o,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Q_(),window[DT+this.uniqueCallbackIdentifier]=e,window[MT+this.uniqueCallbackIdentifier]=t,this.myIFrame=Qd.createIFrame_();let l="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(l='<script>document.domain="'+document.domain+'";<\/script>');const u="<html><body>"+l+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(u),this.myIFrame.doc.close()}catch(h){it("frame writing exception"),h.stack&&it(h.stack),it(h)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||it("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[dv]=this.myID,e[hv]=this.myPW,e[fv]=this.currentSerial;let t=this.urlFn(e),s="",o=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+mv+s.length<=pv;){const u=this.pendingSegs.shift();s=s+"&"+FT+o+"="+u.seg+"&"+UT+o+"="+u.ts+"&"+zT+o+"="+u.d,o++}return t=t+s,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,s){this.pendingSegs.push({seg:e,ts:t,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const s=()=>{this.outstandingRequests.delete(t),this.newRequest_()},o=setTimeout(s,Math.floor(BT)),l=()=>{clearTimeout(o),s()};this.addTag(e,l)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const o=s.readyState;(!o||o==="loaded"||o==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),t())},s.onerror=()=>{it("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HT=16384,KT=45e3;let Ha=null;typeof MozWebSocket<"u"?Ha=MozWebSocket:typeof WebSocket<"u"&&(Ha=WebSocket);class qt{constructor(e,t,s,o,l,u,h){this.connId=e,this.applicationId=s,this.appCheckToken=o,this.authToken=l,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=oo(this.connId),this.stats_=Yd(t),this.connURL=qt.connectionURL_(t,u,h,o,s),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,s,o,l){const u={};return u[ev]=qd,typeof location<"u"&&location.hostname&&iv.test(location.hostname)&&(u[nv]=rv),t&&(u[tv]=t),s&&(u[sv]=s),o&&(u[dd]=o),l&&(u[ov]=l),uv(e,av,u)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Cr.set("previous_websocket_failure",!0);try{let s;l1(),this.mySock=new Ha(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const o=s.message||s.data;o&&this.log_(o),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const o=s.message||s.data;o&&this.log_(o),this.onClosed_()}}start(){}static forceDisallow(){qt.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(t);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&Ha!==null&&!qt.forceDisallow_}static previouslyFailed(){return Cr.isInMemoryStorage||Cr.get("previous_websocket_failure")===!0}markConnectionHealthy(){Cr.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const s=Vs(t);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(M(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const s=this.extractFrameCount_(t);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const t=tt(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=X_(t,HT);s.length>1&&this.sendString_(String(s.length));for(let o=0;o<s.length;o++)this.sendString_(s[o])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(KT))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}qt.responsesRequiredToBeHealthy=2;qt.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ks{static get ALL_TRANSPORTS(){return[mi,qt]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=qt&&qt.isAvailable();let s=t&&!qt.previouslyFailed();if(e.webSocketOnly&&(t||Ct("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[qt];else{const o=this.transports_=[];for(const l of Ks.ALL_TRANSPORTS)l&&l.isAvailable()&&o.push(l);Ks.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Ks.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GT=6e4,qT=5e3,YT=10*1024,QT=100*1024,zu="t",zg="d",JT="s",$g="r",XT="e",Vg="o",Bg="a",Wg="n",Hg="p",ZT="h";class eN{constructor(e,t,s,o,l,u,h,p,m,v){this.id=e,this.repoInfo_=t,this.applicationId_=s,this.appCheckToken_=o,this.authToken_=l,this.onMessage_=u,this.onReady_=h,this.onDisconnect_=p,this.onKill_=m,this.lastSessionId=v,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=oo("c:"+this.id+":"),this.transportManager_=new Ks(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,s)},Math.floor(0));const o=e.healthyTimeout||0;o>0&&(this.healthyTimeout_=Ds(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>QT?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>YT?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(o)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(zu in e){const t=e[zu];t===Bg?this.upgradeIfSecondaryHealthy_():t===$g?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Vg&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Cs("t",e),s=Cs("d",e);if(t==="c")this.onSecondaryControl_(s);else if(t==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Hg,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Bg,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Wg,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Cs("t",e),s=Cs("d",e);t==="c"?this.onControl_(s):t==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Cs(zu,e);if(zg in e){const s=e[zg];if(t===ZT){const o={...s};this.repoInfo_.isUsingEmulator&&(o.h=this.repoInfo_.host),this.onHandshake_(o)}else if(t===Wg){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let o=0;o<this.pendingDataMessages.length;++o)this.onDataMessage_(this.pendingDataMessages[o]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===JT?this.onConnectionShutdown_(s):t===$g?this.onReset_(s):t===XT?ud("Server Error: "+s):t===Vg?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):ud("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,s=e.v,o=e.h;this.sessionId=e.s,this.repoInfo_.host=o,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),qd!==s&&Ct("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,s),Ds(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(GT))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Ds(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(qT))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Hg,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Cr.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gv{put(e,t,s,o){}merge(e,t,s,o){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,s){}onDisconnectMerge(e,t,s){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yv{constructor(e){this.allowedEvents_=e,this.listeners_={},M(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let o=0;o<s.length;o++)s[o].callback.apply(s[o].context,t)}}on(e,t,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:s});const o=this.getInitialEvent(e);o&&t.apply(s,o)}off(e,t,s){this.validateEventType_(e);const o=this.listeners_[e]||[];for(let l=0;l<o.length;l++)if(o[l].callback===t&&(!s||s===o[l].context)){o.splice(l,1);return}}validateEventType_(e){M(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ka extends yv{static getInstance(){return new Ka}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Nd()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return M(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kg=32,Gg=768;class Ce{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let s=0;for(let o=0;o<this.pieces_.length;o++)this.pieces_[o].length>0&&(this.pieces_[s]=this.pieces_[o],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function _e(){return new Ce("")}function ae(r){return r.pieceNum_>=r.pieces_.length?null:r.pieces_[r.pieceNum_]}function sr(r){return r.pieces_.length-r.pieceNum_}function be(r){let e=r.pieceNum_;return e<r.pieces_.length&&e++,new Ce(r.pieces_,e)}function Jd(r){return r.pieceNum_<r.pieces_.length?r.pieces_[r.pieces_.length-1]:null}function tN(r){let e="";for(let t=r.pieceNum_;t<r.pieces_.length;t++)r.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(r.pieces_[t])));return e||"/"}function Gs(r,e=0){return r.pieces_.slice(r.pieceNum_+e)}function _v(r){if(r.pieceNum_>=r.pieces_.length)return null;const e=[];for(let t=r.pieceNum_;t<r.pieces_.length-1;t++)e.push(r.pieces_[t]);return new Ce(e,0)}function Ve(r,e){const t=[];for(let s=r.pieceNum_;s<r.pieces_.length;s++)t.push(r.pieces_[s]);if(e instanceof Ce)for(let s=e.pieceNum_;s<e.pieces_.length;s++)t.push(e.pieces_[s]);else{const s=e.split("/");for(let o=0;o<s.length;o++)s[o].length>0&&t.push(s[o])}return new Ce(t,0)}function ce(r){return r.pieceNum_>=r.pieces_.length}function St(r,e){const t=ae(r),s=ae(e);if(t===null)return e;if(t===s)return St(be(r),be(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+r+")")}function nN(r,e){const t=Gs(r,0),s=Gs(e,0);for(let o=0;o<t.length&&o<s.length;o++){const l=Ur(t[o],s[o]);if(l!==0)return l}return t.length===s.length?0:t.length<s.length?-1:1}function Xd(r,e){if(sr(r)!==sr(e))return!1;for(let t=r.pieceNum_,s=e.pieceNum_;t<=r.pieces_.length;t++,s++)if(r.pieces_[t]!==e.pieces_[s])return!1;return!0}function Ft(r,e){let t=r.pieceNum_,s=e.pieceNum_;if(sr(r)>sr(e))return!1;for(;t<r.pieces_.length;){if(r.pieces_[t]!==e.pieces_[s])return!1;++t,++s}return!0}class rN{constructor(e,t){this.errorPrefix_=t,this.parts_=Gs(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=sl(this.parts_[s]);vv(this)}}function iN(r,e){r.parts_.length>0&&(r.byteLength_+=1),r.parts_.push(e),r.byteLength_+=sl(e),vv(r)}function sN(r){const e=r.parts_.pop();r.byteLength_-=sl(e),r.parts_.length>0&&(r.byteLength_-=1)}function vv(r){if(r.byteLength_>Gg)throw new Error(r.errorPrefix_+"has a key path longer than "+Gg+" bytes ("+r.byteLength_+").");if(r.parts_.length>Kg)throw new Error(r.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Kg+") or object contains a cycle "+Sr(r))}function Sr(r){return r.parts_.length===0?"":"in property '"+r.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zd extends yv{static getInstance(){return new Zd}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return M(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ks=1e3,oN=300*1e3,qg=30*1e3,aN=1.3,lN=3e4,cN="server_kill",Yg=3;class kn extends gv{constructor(e,t,s,o,l,u,h,p){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=s,this.onConnectStatus_=o,this.onServerInfoUpdate_=l,this.authTokenProvider_=u,this.appCheckTokenProvider_=h,this.authOverride_=p,this.id=kn.nextPersistentConnectionId_++,this.log_=oo("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=ks,this.maxReconnectDelay_=oN,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,p)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Zd.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Ka.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,s){const o=++this.requestNumber_,l={r:o,a:e,b:t};this.log_(tt(l)),M(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(l),s&&(this.requestCBHash_[o]=s)}get(e){this.initConnection_();const t=new eo,o={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:u=>{const h=u.d;u.s==="ok"?t.resolve(h):t.reject(h)}};this.outstandingGets_.push(o),this.outstandingGetCount_++;const l=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(l),t.promise}listen(e,t,s,o){this.initConnection_();const l=e._queryIdentifier,u=e._path.toString();this.log_("Listen called for "+u+" "+l),this.listens.has(u)||this.listens.set(u,new Map),M(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),M(!this.listens.get(u).has(l),"listen() called twice for same path/queryId.");const h={onComplete:o,hashFn:t,query:e,tag:s};this.listens.get(u).set(l,h),this.connected_&&this.sendListen_(h)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(s)})}sendListen_(e){const t=e.query,s=t._path.toString(),o=t._queryIdentifier;this.log_("Listen on "+s+" for "+o);const l={p:s},u="q";e.tag&&(l.q=t._queryObject,l.t=e.tag),l.h=e.hashFn(),this.sendRequest(u,l,h=>{const p=h.d,m=h.s;kn.warnOnListenWarnings_(p,t),(this.listens.get(s)&&this.listens.get(s).get(o))===e&&(this.log_("listen response",h),m!=="ok"&&this.removeListen_(s,o),e.onComplete&&e.onComplete(m,p))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&en(e,"w")){const s=Tr(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const o='".indexOn": "'+t._queryParams.getIndex().toString()+'"',l=t._path.toString();Ct(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${o} at ${l} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||p1(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=qg)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=f1(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(t,s,o=>{const l=o.s,u=o.d||"error";this.authToken_===e&&(l==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(l,u))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,s=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,s)})}unlisten(e,t){const s=e._path.toString(),o=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+o),M(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,o)&&this.connected_&&this.sendUnlisten_(s,o,e._queryObject,t)}sendUnlisten_(e,t,s,o){this.log_("Unlisten on "+e+" for "+t);const l={p:e},u="n";o&&(l.q=s,l.t=o),this.sendRequest(u,l)}onDisconnectPut(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:s})}onDisconnectMerge(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:s})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,s,o){const l={p:t,d:s};this.log_("onDisconnect "+e,l),this.sendRequest(e,l,u=>{o&&setTimeout(()=>{o(u.s,u.d)},Math.floor(0))})}put(e,t,s,o){this.putInternal("p",e,t,s,o)}merge(e,t,s,o){this.putInternal("m",e,t,s,o)}putInternal(e,t,s,o,l){this.initConnection_();const u={p:t,d:s};l!==void 0&&(u.h=l),this.outstandingPuts_.push({action:e,request:u,onComplete:o}),this.outstandingPutCount_++;const h=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(h):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,o=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,s,l=>{this.log_(t+" response",l),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),o&&o(l.s,l.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,s=>{if(s.s!=="ok"){const l=s.d;this.log_("reportStats","Error sending stats: "+l)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+tt(e));const t=e.r,s=this.requestCBHash_[t];s&&(delete this.requestCBHash_[t],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):ud("Unrecognized action received from server: "+tt(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){M(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=ks,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=ks,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>lN&&(this.reconnectDelay_=ks),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*aN)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),o=this.id+":"+kn.nextConnectionId_++,l=this.lastSessionId;let u=!1,h=null;const p=function(){h?h.close():(u=!0,s())},m=function(_){M(h,"sendRequest call when we're not connected not allowed."),h.sendRequest(_)};this.realtime_={close:p,sendRequest:m};const v=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[_,x]=await Promise.all([this.authTokenProvider_.getToken(v),this.appCheckTokenProvider_.getToken(v)]);u?it("getToken() completed but was canceled"):(it("getToken() completed. Creating connection."),this.authToken_=_&&_.accessToken,this.appCheckToken_=x&&x.token,h=new eN(o,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,s,I=>{Ct(I+" ("+this.repoInfo_.toString()+")"),this.interrupt(cN)},l))}catch(_){this.log_("Failed to get token: "+_),u||(this.repoInfo_.nodeAdmin&&Ct(_),p())}}}interrupt(e){it("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){it("Resuming connection for reason: "+e),delete this.interruptReasons_[e],ed(this.interruptReasons_)&&(this.reconnectDelay_=ks,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let s;t?s=t.map(l=>Gd(l)).join("$"):s="default";const o=this.removeListen_(e,s);o&&o.onComplete&&o.onComplete("permission_denied")}removeListen_(e,t){const s=new Ce(e).toString();let o;if(this.listens.has(s)){const l=this.listens.get(s);o=l.get(t),l.delete(t),l.size===0&&this.listens.delete(s)}else o=void 0;return o}onAuthRevoked_(e,t){it("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Yg&&(this.reconnectDelay_=qg,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){it("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Yg&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+q_.replace(/\./g,"-")]=1,Nd()?e["framework.cordova"]=1:My()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Ka.getInstance().currentlyOnline();return ed(this.interruptReasons_)&&e}}kn.nextPersistentConnectionId_=0;kn.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new le(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fl{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const s=new le(ki,e),o=new le(ki,t);return this.compare(s,o)!==0}minPost(){return le.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ea;class wv extends fl{static get __EMPTY_NODE(){return Ea}static set __EMPTY_NODE(e){Ea=e}compare(e,t){return Ur(e.name,t.name)}isDefinedOn(e){throw Pi("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return le.MIN}maxPost(){return new le(br,Ea)}makePost(e,t){return M(typeof e=="string","KeyIndex indexValue must always be a string."),new le(e,Ea)}toString(){return".key"}}const Si=new wv;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ca{constructor(e,t,s,o,l=null){this.isReverse_=o,this.resultGenerator_=l,this.nodeStack_=[];let u=1;for(;!e.isEmpty();)if(e=e,u=t?s(e.key,t):1,o&&(u*=-1),u<0)this.isReverse_?e=e.left:e=e.right;else if(u===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Ze{constructor(e,t,s,o,l){this.key=e,this.value=t,this.color=s??Ze.RED,this.left=o??Et.EMPTY_NODE,this.right=l??Et.EMPTY_NODE}copy(e,t,s,o,l){return new Ze(e??this.key,t??this.value,s??this.color,o??this.left,l??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let o=this;const l=s(e,o.key);return l<0?o=o.copy(null,null,null,o.left.insert(e,t,s),null):l===0?o=o.copy(null,t,null,null,null):o=o.copy(null,null,null,null,o.right.insert(e,t,s)),o.fixUp_()}removeMin_(){if(this.left.isEmpty())return Et.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let s,o;if(s=this,t(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),t(e,s.key)===0){if(s.right.isEmpty())return Et.EMPTY_NODE;o=s.right.min_(),s=s.copy(o.key,o.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Ze.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Ze.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Ze.RED=!0;Ze.BLACK=!1;class uN{copy(e,t,s,o,l){return this}insert(e,t,s){return new Ze(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Et{constructor(e,t=Et.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new Et(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,Ze.BLACK,null,null))}remove(e){return new Et(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Ze.BLACK,null,null))}get(e){let t,s=this.root_;for(;!s.isEmpty();){if(t=this.comparator_(e,s.key),t===0)return s.value;t<0?s=s.left:t>0&&(s=s.right)}return null}getPredecessorKey(e){let t,s=this.root_,o=null;for(;!s.isEmpty();)if(t=this.comparator_(e,s.key),t===0){if(s.left.isEmpty())return o?o.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else t<0?s=s.left:t>0&&(o=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Ca(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Ca(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Ca(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Ca(this.root_,null,this.comparator_,!0,e)}}Et.EMPTY_NODE=new uN;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dN(r,e){return Ur(r.name,e.name)}function eh(r,e){return Ur(r,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hd;function hN(r){hd=r}const xv=function(r){return typeof r=="number"?"number:"+Z_(r):"string:"+r},Sv=function(r){if(r.isLeafNode()){const e=r.val();M(typeof e=="string"||typeof e=="number"||typeof e=="object"&&en(e,".sv"),"Priority must be a string or number.")}else M(r===hd||r.isEmpty(),"priority of unexpected type.");M(r===hd||r.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qg;class Xe{static set __childrenNodeConstructor(e){Qg=e}static get __childrenNodeConstructor(){return Qg}constructor(e,t=Xe.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,M(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Sv(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Xe(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Xe.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return ce(e)?this:ae(e)===".priority"?this.priorityNode_:Xe.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:Xe.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const s=ae(e);return s===null?t:t.isEmpty()&&s!==".priority"?this:(M(s!==".priority"||sr(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,Xe.__childrenNodeConstructor.EMPTY_NODE.updateChild(be(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+xv(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=Z_(this.value_):e+=this.value_,this.lazyHash_=J_(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Xe.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Xe.__childrenNodeConstructor?-1:(M(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,s=typeof this.value_,o=Xe.VALUE_TYPE_ORDER.indexOf(t),l=Xe.VALUE_TYPE_ORDER.indexOf(s);return M(o>=0,"Unknown leaf type: "+t),M(l>=0,"Unknown leaf type: "+s),o===l?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:l-o}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}Xe.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ev,Cv;function fN(r){Ev=r}function pN(r){Cv=r}class mN extends fl{compare(e,t){const s=e.node.getPriority(),o=t.node.getPriority(),l=s.compareTo(o);return l===0?Ur(e.name,t.name):l}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return le.MIN}maxPost(){return new le(br,new Xe("[PRIORITY-POST]",Cv))}makePost(e,t){const s=Ev(e);return new le(t,new Xe("[PRIORITY-POST]",s))}toString(){return".priority"}}const ze=new mN;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gN=Math.log(2);class yN{constructor(e){const t=l=>parseInt(Math.log(l)/gN,10),s=l=>parseInt(Array(l+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const o=s(this.count);this.bits_=e+1&o}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Ga=function(r,e,t,s){r.sort(e);const o=function(p,m){const v=m-p;let _,x;if(v===0)return null;if(v===1)return _=r[p],x=t?t(_):_,new Ze(x,_.node,Ze.BLACK,null,null);{const I=parseInt(v/2,10)+p,N=o(p,I),b=o(I+1,m);return _=r[I],x=t?t(_):_,new Ze(x,_.node,Ze.BLACK,N,b)}},l=function(p){let m=null,v=null,_=r.length;const x=function(N,b){const F=_-N,he=_;_-=N;const fe=o(F+1,he),me=r[F],ne=t?t(me):me;I(new Ze(ne,me.node,b,null,fe))},I=function(N){m?(m.left=N,m=N):(v=N,m=N)};for(let N=0;N<p.count;++N){const b=p.nextBitIsOne(),F=Math.pow(2,p.count-(N+1));b?x(F,Ze.BLACK):(x(F,Ze.BLACK),x(F,Ze.RED))}return v},u=new yN(r.length),h=l(u);return new Et(s||e,h)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $u;const fi={};class Cn{static get Default(){return M(fi&&ze,"ChildrenNode.ts has not been loaded"),$u=$u||new Cn({".priority":fi},{".priority":ze}),$u}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=Tr(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof Et?t:null}hasIndex(e){return en(this.indexSet_,e.toString())}addIndex(e,t){M(e!==Si,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let o=!1;const l=t.getIterator(le.Wrap);let u=l.getNext();for(;u;)o=o||e.isDefinedOn(u.node),s.push(u),u=l.getNext();let h;o?h=Ga(s,e.getCompare()):h=fi;const p=e.toString(),m={...this.indexSet_};m[p]=e;const v={...this.indexes_};return v[p]=h,new Cn(v,m)}addToIndexes(e,t){const s=Da(this.indexes_,(o,l)=>{const u=Tr(this.indexSet_,l);if(M(u,"Missing index implementation for "+l),o===fi)if(u.isDefinedOn(e.node)){const h=[],p=t.getIterator(le.Wrap);let m=p.getNext();for(;m;)m.name!==e.name&&h.push(m),m=p.getNext();return h.push(e),Ga(h,u.getCompare())}else return fi;else{const h=t.get(e.name);let p=o;return h&&(p=p.remove(new le(e.name,h))),p.insert(e,e.node)}});return new Cn(s,this.indexSet_)}removeFromIndexes(e,t){const s=Da(this.indexes_,o=>{if(o===fi)return o;{const l=t.get(e.name);return l?o.remove(new le(e.name,l)):o}});return new Cn(s,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Is;class Q{static get EMPTY_NODE(){return Is||(Is=new Q(new Et(eh),null,Cn.Default))}constructor(e,t,s){this.children_=e,this.priorityNode_=t,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&Sv(this.priorityNode_),this.children_.isEmpty()&&M(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Is}updatePriority(e){return this.children_.isEmpty()?this:new Q(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?Is:t}}getChild(e){const t=ae(e);return t===null?this:this.getImmediateChild(t).getChild(be(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(M(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const s=new le(e,t);let o,l;t.isEmpty()?(o=this.children_.remove(e),l=this.indexMap_.removeFromIndexes(s,this.children_)):(o=this.children_.insert(e,t),l=this.indexMap_.addToIndexes(s,this.children_));const u=o.isEmpty()?Is:this.priorityNode_;return new Q(o,u,l)}}updateChild(e,t){const s=ae(e);if(s===null)return t;{M(ae(e)!==".priority"||sr(e)===1,".priority must be the last token in a path");const o=this.getImmediateChild(s).updateChild(be(e),t);return this.updateImmediateChild(s,o)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let s=0,o=0,l=!0;if(this.forEachChild(ze,(u,h)=>{t[u]=h.val(e),s++,l&&Q.INTEGER_REGEXP_.test(u)?o=Math.max(o,Number(u)):l=!1}),!e&&l&&o<2*s){const u=[];for(const h in t)u[h]=t[h];return u}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+xv(this.getPriority().val())+":"),this.forEachChild(ze,(t,s)=>{const o=s.hash();o!==""&&(e+=":"+t+":"+o)}),this.lazyHash_=e===""?"":J_(e)}return this.lazyHash_}getPredecessorChildName(e,t,s){const o=this.resolveIndex_(s);if(o){const l=o.getPredecessorKey(new le(e,t));return l?l.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new le(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new le(t,this.children_.get(t)):null}forEachChild(e,t){const s=this.resolveIndex_(e);return s?s.inorderTraversal(o=>t(o.name,o.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getIteratorFrom(e,o=>o);{const o=this.children_.getIteratorFrom(e.name,le.Wrap);let l=o.peek();for(;l!=null&&t.compare(l,e)<0;)o.getNext(),l=o.peek();return o}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getReverseIteratorFrom(e,o=>o);{const o=this.children_.getReverseIteratorFrom(e.name,le.Wrap);let l=o.peek();for(;l!=null&&t.compare(l,e)>0;)o.getNext(),l=o.peek();return o}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===ao?-1:0}withIndex(e){if(e===Si||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new Q(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Si||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const s=this.getIterator(ze),o=t.getIterator(ze);let l=s.getNext(),u=o.getNext();for(;l&&u;){if(l.name!==u.name||!l.node.equals(u.node))return!1;l=s.getNext(),u=o.getNext()}return l===null&&u===null}else return!1;else return!1}}resolveIndex_(e){return e===Si?null:this.indexMap_.get(e.toString())}}Q.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class _N extends Q{constructor(){super(new Et(eh),Q.EMPTY_NODE,Cn.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return Q.EMPTY_NODE}isEmpty(){return!1}}const ao=new _N;Object.defineProperties(le,{MIN:{value:new le(ki,Q.EMPTY_NODE)},MAX:{value:new le(br,ao)}});wv.__EMPTY_NODE=Q.EMPTY_NODE;Xe.__childrenNodeConstructor=Q;hN(ao);pN(ao);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vN=!0;function et(r,e=null){if(r===null)return Q.EMPTY_NODE;if(typeof r=="object"&&".priority"in r&&(e=r[".priority"]),M(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof r=="object"&&".value"in r&&r[".value"]!==null&&(r=r[".value"]),typeof r!="object"||".sv"in r){const t=r;return new Xe(t,et(e))}if(!(r instanceof Array)&&vN){const t=[];let s=!1;if(st(r,(u,h)=>{if(u.substring(0,1)!=="."){const p=et(h);p.isEmpty()||(s=s||!p.getPriority().isEmpty(),t.push(new le(u,p)))}}),t.length===0)return Q.EMPTY_NODE;const l=Ga(t,dN,u=>u.name,eh);if(s){const u=Ga(t,ze.getCompare());return new Q(l,et(e),new Cn({".priority":u},{".priority":ze}))}else return new Q(l,et(e),Cn.Default)}else{let t=Q.EMPTY_NODE;return st(r,(s,o)=>{if(en(r,s)&&s.substring(0,1)!=="."){const l=et(o);(l.isLeafNode()||!l.isEmpty())&&(t=t.updateImmediateChild(s,l))}}),t.updatePriority(et(e))}}fN(et);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wN extends fl{constructor(e){super(),this.indexPath_=e,M(!ce(e)&&ae(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const s=this.extractChild(e.node),o=this.extractChild(t.node),l=s.compareTo(o);return l===0?Ur(e.name,t.name):l}makePost(e,t){const s=et(e),o=Q.EMPTY_NODE.updateChild(this.indexPath_,s);return new le(t,o)}maxPost(){const e=Q.EMPTY_NODE.updateChild(this.indexPath_,ao);return new le(br,e)}toString(){return Gs(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xN extends fl{compare(e,t){const s=e.node.compareTo(t.node);return s===0?Ur(e.name,t.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return le.MIN}maxPost(){return le.MAX}makePost(e,t){const s=et(e);return new le(t,s)}toString(){return".value"}}const SN=new xN;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kv(r){return{type:"value",snapshotNode:r}}function Ii(r,e){return{type:"child_added",snapshotNode:e,childName:r}}function qs(r,e){return{type:"child_removed",snapshotNode:e,childName:r}}function Ys(r,e,t){return{type:"child_changed",snapshotNode:e,childName:r,oldSnap:t}}function EN(r,e){return{type:"child_moved",snapshotNode:e,childName:r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class th{constructor(e){this.index_=e}updateChild(e,t,s,o,l,u){M(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const h=e.getImmediateChild(t);return h.getChild(o).equals(s.getChild(o))&&h.isEmpty()===s.isEmpty()||(u!=null&&(s.isEmpty()?e.hasChild(t)?u.trackChildChange(qs(t,h)):M(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):h.isEmpty()?u.trackChildChange(Ii(t,s)):u.trackChildChange(Ys(t,s,h))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(t,s).withIndex(this.index_)}updateFullNode(e,t,s){return s!=null&&(e.isLeafNode()||e.forEachChild(ze,(o,l)=>{t.hasChild(o)||s.trackChildChange(qs(o,l))}),t.isLeafNode()||t.forEachChild(ze,(o,l)=>{if(e.hasChild(o)){const u=e.getImmediateChild(o);u.equals(l)||s.trackChildChange(Ys(o,l,u))}else s.trackChildChange(Ii(o,l))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?Q.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qs{constructor(e){this.indexedFilter_=new th(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Qs.getStartPost_(e),this.endPost_=Qs.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&s}updateChild(e,t,s,o,l,u){return this.matches(new le(t,s))||(s=Q.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,s,o,l,u)}updateFullNode(e,t,s){t.isLeafNode()&&(t=Q.EMPTY_NODE);let o=t.withIndex(this.index_);o=o.updatePriority(Q.EMPTY_NODE);const l=this;return t.forEachChild(ze,(u,h)=>{l.matches(new le(u,h))||(o=o.updateImmediateChild(u,Q.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,o,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CN{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=t=>{const s=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new Qs(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,s,o,l,u){return this.rangedFilter_.matches(new le(t,s))||(s=Q.EMPTY_NODE),e.getImmediateChild(t).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,s,o,l,u):this.fullLimitUpdateChild_(e,t,s,l,u)}updateFullNode(e,t,s){let o;if(t.isLeafNode()||t.isEmpty())o=Q.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){o=Q.EMPTY_NODE.withIndex(this.index_);let l;this.reverse_?l=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):l=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let u=0;for(;l.hasNext()&&u<this.limit_;){const h=l.getNext();if(this.withinDirectionalStart(h))if(this.withinDirectionalEnd(h))o=o.updateImmediateChild(h.name,h.node),u++;else break;else continue}}else{o=t.withIndex(this.index_),o=o.updatePriority(Q.EMPTY_NODE);let l;this.reverse_?l=o.getReverseIterator(this.index_):l=o.getIterator(this.index_);let u=0;for(;l.hasNext();){const h=l.getNext();u<this.limit_&&this.withinDirectionalStart(h)&&this.withinDirectionalEnd(h)?u++:o=o.updateImmediateChild(h.name,Q.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,o,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,s,o,l){let u;if(this.reverse_){const _=this.index_.getCompare();u=(x,I)=>_(I,x)}else u=this.index_.getCompare();const h=e;M(h.numChildren()===this.limit_,"");const p=new le(t,s),m=this.reverse_?h.getFirstChild(this.index_):h.getLastChild(this.index_),v=this.rangedFilter_.matches(p);if(h.hasChild(t)){const _=h.getImmediateChild(t);let x=o.getChildAfterChild(this.index_,m,this.reverse_);for(;x!=null&&(x.name===t||h.hasChild(x.name));)x=o.getChildAfterChild(this.index_,x,this.reverse_);const I=x==null?1:u(x,p);if(v&&!s.isEmpty()&&I>=0)return l!=null&&l.trackChildChange(Ys(t,s,_)),h.updateImmediateChild(t,s);{l!=null&&l.trackChildChange(qs(t,_));const b=h.updateImmediateChild(t,Q.EMPTY_NODE);return x!=null&&this.rangedFilter_.matches(x)?(l!=null&&l.trackChildChange(Ii(x.name,x.node)),b.updateImmediateChild(x.name,x.node)):b}}else return s.isEmpty()?e:v&&u(m,p)>=0?(l!=null&&(l.trackChildChange(qs(m.name,m.node)),l.trackChildChange(Ii(t,s))),h.updateImmediateChild(t,s).updateImmediateChild(m.name,Q.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nh{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=ze}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return M(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return M(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:ki}hasEnd(){return this.endSet_}getIndexEndValue(){return M(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return M(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:br}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return M(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===ze}copy(){const e=new nh;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function kN(r){return r.loadsAllData()?new th(r.getIndex()):r.hasLimit()?new CN(r):new Qs(r)}function Jg(r){const e={};if(r.isDefault())return e;let t;if(r.index_===ze?t="$priority":r.index_===SN?t="$value":r.index_===Si?t="$key":(M(r.index_ instanceof wN,"Unrecognized index type!"),t=r.index_.toString()),e.orderBy=tt(t),r.startSet_){const s=r.startAfterSet_?"startAfter":"startAt";e[s]=tt(r.indexStartValue_),r.startNameSet_&&(e[s]+=","+tt(r.indexStartName_))}if(r.endSet_){const s=r.endBeforeSet_?"endBefore":"endAt";e[s]=tt(r.indexEndValue_),r.endNameSet_&&(e[s]+=","+tt(r.indexEndName_))}return r.limitSet_&&(r.isViewFromLeft()?e.limitToFirst=r.limit_:e.limitToLast=r.limit_),e}function Xg(r){const e={};if(r.startSet_&&(e.sp=r.indexStartValue_,r.startNameSet_&&(e.sn=r.indexStartName_),e.sin=!r.startAfterSet_),r.endSet_&&(e.ep=r.indexEndValue_,r.endNameSet_&&(e.en=r.indexEndName_),e.ein=!r.endBeforeSet_),r.limitSet_){e.l=r.limit_;let t=r.viewFrom_;t===""&&(r.isViewFromLeft()?t="l":t="r"),e.vf=t}return r.index_!==ze&&(e.i=r.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qa extends gv{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(M(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,s,o){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=s,this.appCheckTokenProvider_=o,this.log_=oo("p:rest:"),this.listens_={}}listen(e,t,s,o){const l=e._path.toString();this.log_("Listen called for "+l+" "+e._queryIdentifier);const u=qa.getListenId_(e,s),h={};this.listens_[u]=h;const p=Jg(e._queryParams);this.restRequest_(l+".json",p,(m,v)=>{let _=v;if(m===404&&(_=null,m=null),m===null&&this.onDataUpdate_(l,_,!1,s),Tr(this.listens_,u)===h){let x;m?m===401?x="permission_denied":x="rest_error:"+m:x="ok",o(x,null)}})}unlisten(e,t){const s=qa.getListenId_(e,t);delete this.listens_[s]}get(e){const t=Jg(e._queryParams),s=e._path.toString(),o=new eo;return this.restRequest_(s+".json",t,(l,u)=>{let h=u;l===404&&(h=null,l=null),l===null?(this.onDataUpdate_(s,h,!1,null),o.resolve(h)):o.reject(new Error(h))}),o.promise}refreshAuthToken(e){}restRequest_(e,t={},s){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([o,l])=>{o&&o.accessToken&&(t.auth=o.accessToken),l&&l.token&&(t.ac=l.token);const u=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+bi(t);this.log_("Sending REST request for "+u);const h=new XMLHttpRequest;h.onreadystatechange=()=>{if(s&&h.readyState===4){this.log_("REST Response for "+u+" received. status:",h.status,"response:",h.responseText);let p=null;if(h.status>=200&&h.status<300){try{p=Vs(h.responseText)}catch{Ct("Failed to parse JSON response for "+u+": "+h.responseText)}s(null,p)}else h.status!==401&&h.status!==404&&Ct("Got unsuccessful REST response for "+u+" Status: "+h.status),s(h.status);s=null}},h.open("GET",u,!0),h.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IN{constructor(){this.rootNode_=Q.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ya(){return{value:null,children:new Map}}function Iv(r,e,t){if(ce(e))r.value=t,r.children.clear();else if(r.value!==null)r.value=r.value.updateChild(e,t);else{const s=ae(e);r.children.has(s)||r.children.set(s,Ya());const o=r.children.get(s);e=be(e),Iv(o,e,t)}}function fd(r,e,t){r.value!==null?t(e,r.value):TN(r,(s,o)=>{const l=new Ce(e.toString()+"/"+s);fd(o,l,t)})}function TN(r,e){r.children.forEach((t,s)=>{e(s,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NN{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&st(this.last_,(s,o)=>{t[s]=t[s]-o}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zg=10*1e3,RN=30*1e3,PN=300*1e3;class bN{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new NN(e);const s=Zg+(RN-Zg)*Math.random();Ds(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),t={};let s=!1;st(e,(o,l)=>{l>0&&en(this.statsToReport_,o)&&(t[o]=l,s=!0)}),s&&this.server_.reportStats(t),Ds(this.reportStats_.bind(this),Math.floor(Math.random()*2*PN))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Qt;(function(r){r[r.OVERWRITE=0]="OVERWRITE",r[r.MERGE=1]="MERGE",r[r.ACK_USER_WRITE=2]="ACK_USER_WRITE",r[r.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Qt||(Qt={}));function rh(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function ih(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function sh(r){return{fromUser:!1,fromServer:!0,queryId:r,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qa{constructor(e,t,s){this.path=e,this.affectedTree=t,this.revert=s,this.type=Qt.ACK_USER_WRITE,this.source=rh()}operationForChild(e){if(ce(this.path)){if(this.affectedTree.value!=null)return M(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new Ce(e));return new Qa(_e(),t,this.revert)}}else return M(ae(this.path)===e,"operationForChild called for unrelated child."),new Qa(be(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(e,t){this.source=e,this.path=t,this.type=Qt.LISTEN_COMPLETE}operationForChild(e){return ce(this.path)?new Js(this.source,_e()):new Js(this.source,be(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ar{constructor(e,t,s){this.source=e,this.path=t,this.snap=s,this.type=Qt.OVERWRITE}operationForChild(e){return ce(this.path)?new Ar(this.source,_e(),this.snap.getImmediateChild(e)):new Ar(this.source,be(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti{constructor(e,t,s){this.source=e,this.path=t,this.children=s,this.type=Qt.MERGE}operationForChild(e){if(ce(this.path)){const t=this.children.subtree(new Ce(e));return t.isEmpty()?null:t.value?new Ar(this.source,_e(),t.value):new Ti(this.source,_e(),t)}else return M(ae(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ti(this.source,be(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Or{constructor(e,t,s){this.node_=e,this.fullyInitialized_=t,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(ce(e))return this.isFullyInitialized()&&!this.filtered_;const t=ae(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AN{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function ON(r,e,t,s){const o=[],l=[];return e.forEach(u=>{u.type==="child_changed"&&r.index_.indexedValueChanged(u.oldSnap,u.snapshotNode)&&l.push(EN(u.childName,u.snapshotNode))}),Ts(r,o,"child_removed",e,s,t),Ts(r,o,"child_added",e,s,t),Ts(r,o,"child_moved",l,s,t),Ts(r,o,"child_changed",e,s,t),Ts(r,o,"value",e,s,t),o}function Ts(r,e,t,s,o,l){const u=s.filter(h=>h.type===t);u.sort((h,p)=>DN(r,h,p)),u.forEach(h=>{const p=LN(r,h,l);o.forEach(m=>{m.respondsTo(h.type)&&e.push(m.createEvent(p,r.query_))})})}function LN(r,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,r.index_)),e}function DN(r,e,t){if(e.childName==null||t.childName==null)throw Pi("Should only compare child_ events.");const s=new le(e.childName,e.snapshotNode),o=new le(t.childName,t.snapshotNode);return r.index_.compare(s,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pl(r,e){return{eventCache:r,serverCache:e}}function Ms(r,e,t,s){return pl(new Or(e,t,s),r.serverCache)}function Tv(r,e,t,s){return pl(r.eventCache,new Or(e,t,s))}function pd(r){return r.eventCache.isFullyInitialized()?r.eventCache.getNode():null}function Lr(r){return r.serverCache.isFullyInitialized()?r.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vu;const MN=()=>(Vu||(Vu=new Et(wT)),Vu);class Pe{static fromObject(e){let t=new Pe(null);return st(e,(s,o)=>{t=t.set(new Ce(s),o)}),t}constructor(e,t=MN()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:_e(),value:this.value};if(ce(e))return null;{const s=ae(e),o=this.children.get(s);if(o!==null){const l=o.findRootMostMatchingPathAndValue(be(e),t);return l!=null?{path:Ve(new Ce(s),l.path),value:l.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(ce(e))return this;{const t=ae(e),s=this.children.get(t);return s!==null?s.subtree(be(e)):new Pe(null)}}set(e,t){if(ce(e))return new Pe(t,this.children);{const s=ae(e),l=(this.children.get(s)||new Pe(null)).set(be(e),t),u=this.children.insert(s,l);return new Pe(this.value,u)}}remove(e){if(ce(e))return this.children.isEmpty()?new Pe(null):new Pe(null,this.children);{const t=ae(e),s=this.children.get(t);if(s){const o=s.remove(be(e));let l;return o.isEmpty()?l=this.children.remove(t):l=this.children.insert(t,o),this.value===null&&l.isEmpty()?new Pe(null):new Pe(this.value,l)}else return this}}get(e){if(ce(e))return this.value;{const t=ae(e),s=this.children.get(t);return s?s.get(be(e)):null}}setTree(e,t){if(ce(e))return t;{const s=ae(e),l=(this.children.get(s)||new Pe(null)).setTree(be(e),t);let u;return l.isEmpty()?u=this.children.remove(s):u=this.children.insert(s,l),new Pe(this.value,u)}}fold(e){return this.fold_(_e(),e)}fold_(e,t){const s={};return this.children.inorderTraversal((o,l)=>{s[o]=l.fold_(Ve(e,o),t)}),t(e,this.value,s)}findOnPath(e,t){return this.findOnPath_(e,_e(),t)}findOnPath_(e,t,s){const o=this.value?s(t,this.value):!1;if(o)return o;if(ce(e))return null;{const l=ae(e),u=this.children.get(l);return u?u.findOnPath_(be(e),Ve(t,l),s):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,_e(),t)}foreachOnPath_(e,t,s){if(ce(e))return this;{this.value&&s(t,this.value);const o=ae(e),l=this.children.get(o);return l?l.foreachOnPath_(be(e),Ve(t,o),s):new Pe(null)}}foreach(e){this.foreach_(_e(),e)}foreach_(e,t){this.children.inorderTraversal((s,o)=>{o.foreach_(Ve(e,s),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,s)=>{s.value&&e(t,s.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(e){this.writeTree_=e}static empty(){return new Jt(new Pe(null))}}function js(r,e,t){if(ce(e))return new Jt(new Pe(t));{const s=r.writeTree_.findRootMostValueAndPath(e);if(s!=null){const o=s.path;let l=s.value;const u=St(o,e);return l=l.updateChild(u,t),new Jt(r.writeTree_.set(o,l))}else{const o=new Pe(t),l=r.writeTree_.setTree(e,o);return new Jt(l)}}}function md(r,e,t){let s=r;return st(t,(o,l)=>{s=js(s,Ve(e,o),l)}),s}function ey(r,e){if(ce(e))return Jt.empty();{const t=r.writeTree_.setTree(e,new Pe(null));return new Jt(t)}}function gd(r,e){return zr(r,e)!=null}function zr(r,e){const t=r.writeTree_.findRootMostValueAndPath(e);return t!=null?r.writeTree_.get(t.path).getChild(St(t.path,e)):null}function ty(r){const e=[],t=r.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(ze,(s,o)=>{e.push(new le(s,o))}):r.writeTree_.children.inorderTraversal((s,o)=>{o.value!=null&&e.push(new le(s,o.value))}),e}function rr(r,e){if(ce(e))return r;{const t=zr(r,e);return t!=null?new Jt(new Pe(t)):new Jt(r.writeTree_.subtree(e))}}function yd(r){return r.writeTree_.isEmpty()}function Ni(r,e){return Nv(_e(),r.writeTree_,e)}function Nv(r,e,t){if(e.value!=null)return t.updateChild(r,e.value);{let s=null;return e.children.inorderTraversal((o,l)=>{o===".priority"?(M(l.value!==null,"Priority writes must always be leaf nodes"),s=l.value):t=Nv(Ve(r,o),l,t)}),!t.getChild(r).isEmpty()&&s!==null&&(t=t.updateChild(Ve(r,".priority"),s)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oh(r,e){return Av(e,r)}function jN(r,e,t,s,o){M(s>r.lastWriteId,"Stacking an older write on top of newer ones"),o===void 0&&(o=!0),r.allWrites.push({path:e,snap:t,writeId:s,visible:o}),o&&(r.visibleWrites=js(r.visibleWrites,e,t)),r.lastWriteId=s}function FN(r,e,t,s){M(s>r.lastWriteId,"Stacking an older merge on top of newer ones"),r.allWrites.push({path:e,children:t,writeId:s,visible:!0}),r.visibleWrites=md(r.visibleWrites,e,t),r.lastWriteId=s}function UN(r,e){for(let t=0;t<r.allWrites.length;t++){const s=r.allWrites[t];if(s.writeId===e)return s}return null}function zN(r,e){const t=r.allWrites.findIndex(h=>h.writeId===e);M(t>=0,"removeWrite called with nonexistent writeId.");const s=r.allWrites[t];r.allWrites.splice(t,1);let o=s.visible,l=!1,u=r.allWrites.length-1;for(;o&&u>=0;){const h=r.allWrites[u];h.visible&&(u>=t&&$N(h,s.path)?o=!1:Ft(s.path,h.path)&&(l=!0)),u--}if(o){if(l)return VN(r),!0;if(s.snap)r.visibleWrites=ey(r.visibleWrites,s.path);else{const h=s.children;st(h,p=>{r.visibleWrites=ey(r.visibleWrites,Ve(s.path,p))})}return!0}else return!1}function $N(r,e){if(r.snap)return Ft(r.path,e);for(const t in r.children)if(r.children.hasOwnProperty(t)&&Ft(Ve(r.path,t),e))return!0;return!1}function VN(r){r.visibleWrites=Rv(r.allWrites,BN,_e()),r.allWrites.length>0?r.lastWriteId=r.allWrites[r.allWrites.length-1].writeId:r.lastWriteId=-1}function BN(r){return r.visible}function Rv(r,e,t){let s=Jt.empty();for(let o=0;o<r.length;++o){const l=r[o];if(e(l)){const u=l.path;let h;if(l.snap)Ft(t,u)?(h=St(t,u),s=js(s,h,l.snap)):Ft(u,t)&&(h=St(u,t),s=js(s,_e(),l.snap.getChild(h)));else if(l.children){if(Ft(t,u))h=St(t,u),s=md(s,h,l.children);else if(Ft(u,t))if(h=St(u,t),ce(h))s=md(s,_e(),l.children);else{const p=Tr(l.children,ae(h));if(p){const m=p.getChild(be(h));s=js(s,_e(),m)}}}else throw Pi("WriteRecord should have .snap or .children")}}return s}function Pv(r,e,t,s,o){if(!s&&!o){const l=zr(r.visibleWrites,e);if(l!=null)return l;{const u=rr(r.visibleWrites,e);if(yd(u))return t;if(t==null&&!gd(u,_e()))return null;{const h=t||Q.EMPTY_NODE;return Ni(u,h)}}}else{const l=rr(r.visibleWrites,e);if(!o&&yd(l))return t;if(!o&&t==null&&!gd(l,_e()))return null;{const u=function(m){return(m.visible||o)&&(!s||!~s.indexOf(m.writeId))&&(Ft(m.path,e)||Ft(e,m.path))},h=Rv(r.allWrites,u,e),p=t||Q.EMPTY_NODE;return Ni(h,p)}}}function WN(r,e,t){let s=Q.EMPTY_NODE;const o=zr(r.visibleWrites,e);if(o)return o.isLeafNode()||o.forEachChild(ze,(l,u)=>{s=s.updateImmediateChild(l,u)}),s;if(t){const l=rr(r.visibleWrites,e);return t.forEachChild(ze,(u,h)=>{const p=Ni(rr(l,new Ce(u)),h);s=s.updateImmediateChild(u,p)}),ty(l).forEach(u=>{s=s.updateImmediateChild(u.name,u.node)}),s}else{const l=rr(r.visibleWrites,e);return ty(l).forEach(u=>{s=s.updateImmediateChild(u.name,u.node)}),s}}function HN(r,e,t,s,o){M(s||o,"Either existingEventSnap or existingServerSnap must exist");const l=Ve(e,t);if(gd(r.visibleWrites,l))return null;{const u=rr(r.visibleWrites,l);return yd(u)?o.getChild(t):Ni(u,o.getChild(t))}}function KN(r,e,t,s){const o=Ve(e,t),l=zr(r.visibleWrites,o);if(l!=null)return l;if(s.isCompleteForChild(t)){const u=rr(r.visibleWrites,o);return Ni(u,s.getNode().getImmediateChild(t))}else return null}function GN(r,e){return zr(r.visibleWrites,e)}function qN(r,e,t,s,o,l,u){let h;const p=rr(r.visibleWrites,e),m=zr(p,_e());if(m!=null)h=m;else if(t!=null)h=Ni(p,t);else return[];if(h=h.withIndex(u),!h.isEmpty()&&!h.isLeafNode()){const v=[],_=u.getCompare(),x=l?h.getReverseIteratorFrom(s,u):h.getIteratorFrom(s,u);let I=x.getNext();for(;I&&v.length<o;)_(I,s)!==0&&v.push(I),I=x.getNext();return v}else return[]}function YN(){return{visibleWrites:Jt.empty(),allWrites:[],lastWriteId:-1}}function Ja(r,e,t,s){return Pv(r.writeTree,r.treePath,e,t,s)}function ah(r,e){return WN(r.writeTree,r.treePath,e)}function ny(r,e,t,s){return HN(r.writeTree,r.treePath,e,t,s)}function Xa(r,e){return GN(r.writeTree,Ve(r.treePath,e))}function QN(r,e,t,s,o,l){return qN(r.writeTree,r.treePath,e,t,s,o,l)}function lh(r,e,t){return KN(r.writeTree,r.treePath,e,t)}function bv(r,e){return Av(Ve(r.treePath,e),r.writeTree)}function Av(r,e){return{treePath:r,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JN{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,s=e.childName;M(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),M(s!==".priority","Only non-priority child changes can be tracked.");const o=this.changeMap.get(s);if(o){const l=o.type;if(t==="child_added"&&l==="child_removed")this.changeMap.set(s,Ys(s,e.snapshotNode,o.snapshotNode));else if(t==="child_removed"&&l==="child_added")this.changeMap.delete(s);else if(t==="child_removed"&&l==="child_changed")this.changeMap.set(s,qs(s,o.oldSnap));else if(t==="child_changed"&&l==="child_added")this.changeMap.set(s,Ii(s,e.snapshotNode));else if(t==="child_changed"&&l==="child_changed")this.changeMap.set(s,Ys(s,e.snapshotNode,o.oldSnap));else throw Pi("Illegal combination of changes: "+e+" occurred after "+o)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XN{getCompleteChild(e){return null}getChildAfterChild(e,t,s){return null}}const Ov=new XN;class ch{constructor(e,t,s=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=s}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new Or(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return lh(this.writes_,e,s)}}getChildAfterChild(e,t,s){const o=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Lr(this.viewCache_),l=QN(this.writes_,o,t,1,s,e);return l.length===0?null:l[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ZN(r){return{filter:r}}function eR(r,e){M(e.eventCache.getNode().isIndexed(r.filter.getIndex()),"Event snap not indexed"),M(e.serverCache.getNode().isIndexed(r.filter.getIndex()),"Server snap not indexed")}function tR(r,e,t,s,o){const l=new JN;let u,h;if(t.type===Qt.OVERWRITE){const m=t;m.source.fromUser?u=_d(r,e,m.path,m.snap,s,o,l):(M(m.source.fromServer,"Unknown source."),h=m.source.tagged||e.serverCache.isFiltered()&&!ce(m.path),u=Za(r,e,m.path,m.snap,s,o,h,l))}else if(t.type===Qt.MERGE){const m=t;m.source.fromUser?u=rR(r,e,m.path,m.children,s,o,l):(M(m.source.fromServer,"Unknown source."),h=m.source.tagged||e.serverCache.isFiltered(),u=vd(r,e,m.path,m.children,s,o,h,l))}else if(t.type===Qt.ACK_USER_WRITE){const m=t;m.revert?u=oR(r,e,m.path,s,o,l):u=iR(r,e,m.path,m.affectedTree,s,o,l)}else if(t.type===Qt.LISTEN_COMPLETE)u=sR(r,e,t.path,s,l);else throw Pi("Unknown operation type: "+t.type);const p=l.getChanges();return nR(e,u,p),{viewCache:u,changes:p}}function nR(r,e,t){const s=e.eventCache;if(s.isFullyInitialized()){const o=s.getNode().isLeafNode()||s.getNode().isEmpty(),l=pd(r);(t.length>0||!r.eventCache.isFullyInitialized()||o&&!s.getNode().equals(l)||!s.getNode().getPriority().equals(l.getPriority()))&&t.push(kv(pd(e)))}}function Lv(r,e,t,s,o,l){const u=e.eventCache;if(Xa(s,t)!=null)return e;{let h,p;if(ce(t))if(M(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const m=Lr(e),v=m instanceof Q?m:Q.EMPTY_NODE,_=ah(s,v);h=r.filter.updateFullNode(e.eventCache.getNode(),_,l)}else{const m=Ja(s,Lr(e));h=r.filter.updateFullNode(e.eventCache.getNode(),m,l)}else{const m=ae(t);if(m===".priority"){M(sr(t)===1,"Can't have a priority with additional path components");const v=u.getNode();p=e.serverCache.getNode();const _=ny(s,t,v,p);_!=null?h=r.filter.updatePriority(v,_):h=u.getNode()}else{const v=be(t);let _;if(u.isCompleteForChild(m)){p=e.serverCache.getNode();const x=ny(s,t,u.getNode(),p);x!=null?_=u.getNode().getImmediateChild(m).updateChild(v,x):_=u.getNode().getImmediateChild(m)}else _=lh(s,m,e.serverCache);_!=null?h=r.filter.updateChild(u.getNode(),m,_,v,o,l):h=u.getNode()}}return Ms(e,h,u.isFullyInitialized()||ce(t),r.filter.filtersNodes())}}function Za(r,e,t,s,o,l,u,h){const p=e.serverCache;let m;const v=u?r.filter:r.filter.getIndexedFilter();if(ce(t))m=v.updateFullNode(p.getNode(),s,null);else if(v.filtersNodes()&&!p.isFiltered()){const I=p.getNode().updateChild(t,s);m=v.updateFullNode(p.getNode(),I,null)}else{const I=ae(t);if(!p.isCompleteForPath(t)&&sr(t)>1)return e;const N=be(t),F=p.getNode().getImmediateChild(I).updateChild(N,s);I===".priority"?m=v.updatePriority(p.getNode(),F):m=v.updateChild(p.getNode(),I,F,N,Ov,null)}const _=Tv(e,m,p.isFullyInitialized()||ce(t),v.filtersNodes()),x=new ch(o,_,l);return Lv(r,_,t,o,x,h)}function _d(r,e,t,s,o,l,u){const h=e.eventCache;let p,m;const v=new ch(o,e,l);if(ce(t))m=r.filter.updateFullNode(e.eventCache.getNode(),s,u),p=Ms(e,m,!0,r.filter.filtersNodes());else{const _=ae(t);if(_===".priority")m=r.filter.updatePriority(e.eventCache.getNode(),s),p=Ms(e,m,h.isFullyInitialized(),h.isFiltered());else{const x=be(t),I=h.getNode().getImmediateChild(_);let N;if(ce(x))N=s;else{const b=v.getCompleteChild(_);b!=null?Jd(x)===".priority"&&b.getChild(_v(x)).isEmpty()?N=b:N=b.updateChild(x,s):N=Q.EMPTY_NODE}if(I.equals(N))p=e;else{const b=r.filter.updateChild(h.getNode(),_,N,x,v,u);p=Ms(e,b,h.isFullyInitialized(),r.filter.filtersNodes())}}}return p}function ry(r,e){return r.eventCache.isCompleteForChild(e)}function rR(r,e,t,s,o,l,u){let h=e;return s.foreach((p,m)=>{const v=Ve(t,p);ry(e,ae(v))&&(h=_d(r,h,v,m,o,l,u))}),s.foreach((p,m)=>{const v=Ve(t,p);ry(e,ae(v))||(h=_d(r,h,v,m,o,l,u))}),h}function iy(r,e,t){return t.foreach((s,o)=>{e=e.updateChild(s,o)}),e}function vd(r,e,t,s,o,l,u,h){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let p=e,m;ce(t)?m=s:m=new Pe(null).setTree(t,s);const v=e.serverCache.getNode();return m.children.inorderTraversal((_,x)=>{if(v.hasChild(_)){const I=e.serverCache.getNode().getImmediateChild(_),N=iy(r,I,x);p=Za(r,p,new Ce(_),N,o,l,u,h)}}),m.children.inorderTraversal((_,x)=>{const I=!e.serverCache.isCompleteForChild(_)&&x.value===null;if(!v.hasChild(_)&&!I){const N=e.serverCache.getNode().getImmediateChild(_),b=iy(r,N,x);p=Za(r,p,new Ce(_),b,o,l,u,h)}}),p}function iR(r,e,t,s,o,l,u){if(Xa(o,t)!=null)return e;const h=e.serverCache.isFiltered(),p=e.serverCache;if(s.value!=null){if(ce(t)&&p.isFullyInitialized()||p.isCompleteForPath(t))return Za(r,e,t,p.getNode().getChild(t),o,l,h,u);if(ce(t)){let m=new Pe(null);return p.getNode().forEachChild(Si,(v,_)=>{m=m.set(new Ce(v),_)}),vd(r,e,t,m,o,l,h,u)}else return e}else{let m=new Pe(null);return s.foreach((v,_)=>{const x=Ve(t,v);p.isCompleteForPath(x)&&(m=m.set(v,p.getNode().getChild(x)))}),vd(r,e,t,m,o,l,h,u)}}function sR(r,e,t,s,o){const l=e.serverCache,u=Tv(e,l.getNode(),l.isFullyInitialized()||ce(t),l.isFiltered());return Lv(r,u,t,s,Ov,o)}function oR(r,e,t,s,o,l){let u;if(Xa(s,t)!=null)return e;{const h=new ch(s,e,o),p=e.eventCache.getNode();let m;if(ce(t)||ae(t)===".priority"){let v;if(e.serverCache.isFullyInitialized())v=Ja(s,Lr(e));else{const _=e.serverCache.getNode();M(_ instanceof Q,"serverChildren would be complete if leaf node"),v=ah(s,_)}v=v,m=r.filter.updateFullNode(p,v,l)}else{const v=ae(t);let _=lh(s,v,e.serverCache);_==null&&e.serverCache.isCompleteForChild(v)&&(_=p.getImmediateChild(v)),_!=null?m=r.filter.updateChild(p,v,_,be(t),h,l):e.eventCache.getNode().hasChild(v)?m=r.filter.updateChild(p,v,Q.EMPTY_NODE,be(t),h,l):m=p,m.isEmpty()&&e.serverCache.isFullyInitialized()&&(u=Ja(s,Lr(e)),u.isLeafNode()&&(m=r.filter.updateFullNode(m,u,l)))}return u=e.serverCache.isFullyInitialized()||Xa(s,_e())!=null,Ms(e,m,u,r.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aR{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,o=new th(s.getIndex()),l=kN(s);this.processor_=ZN(l);const u=t.serverCache,h=t.eventCache,p=o.updateFullNode(Q.EMPTY_NODE,u.getNode(),null),m=l.updateFullNode(Q.EMPTY_NODE,h.getNode(),null),v=new Or(p,u.isFullyInitialized(),o.filtersNodes()),_=new Or(m,h.isFullyInitialized(),l.filtersNodes());this.viewCache_=pl(_,v),this.eventGenerator_=new AN(this.query_)}get query(){return this.query_}}function lR(r){return r.viewCache_.serverCache.getNode()}function cR(r,e){const t=Lr(r.viewCache_);return t&&(r.query._queryParams.loadsAllData()||!ce(e)&&!t.getImmediateChild(ae(e)).isEmpty())?t.getChild(e):null}function sy(r){return r.eventRegistrations_.length===0}function uR(r,e){r.eventRegistrations_.push(e)}function oy(r,e,t){const s=[];if(t){M(e==null,"A cancel should cancel all event registrations.");const o=r.query._path;r.eventRegistrations_.forEach(l=>{const u=l.createCancelEvent(t,o);u&&s.push(u)})}if(e){let o=[];for(let l=0;l<r.eventRegistrations_.length;++l){const u=r.eventRegistrations_[l];if(!u.matches(e))o.push(u);else if(e.hasAnyCallback()){o=o.concat(r.eventRegistrations_.slice(l+1));break}}r.eventRegistrations_=o}else r.eventRegistrations_=[];return s}function ay(r,e,t,s){e.type===Qt.MERGE&&e.source.queryId!==null&&(M(Lr(r.viewCache_),"We should always have a full cache before handling merges"),M(pd(r.viewCache_),"Missing event cache, even though we have a server cache"));const o=r.viewCache_,l=tR(r.processor_,o,e,t,s);return eR(r.processor_,l.viewCache),M(l.viewCache.serverCache.isFullyInitialized()||!o.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),r.viewCache_=l.viewCache,Dv(r,l.changes,l.viewCache.eventCache.getNode(),null)}function dR(r,e){const t=r.viewCache_.eventCache,s=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(ze,(l,u)=>{s.push(Ii(l,u))}),t.isFullyInitialized()&&s.push(kv(t.getNode())),Dv(r,s,t.getNode(),e)}function Dv(r,e,t,s){const o=s?[s]:r.eventRegistrations_;return ON(r.eventGenerator_,e,t,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let el;class hR{constructor(){this.views=new Map}}function fR(r){M(!el,"__referenceConstructor has already been defined"),el=r}function pR(){return M(el,"Reference.ts has not been loaded"),el}function mR(r){return r.views.size===0}function uh(r,e,t,s){const o=e.source.queryId;if(o!==null){const l=r.views.get(o);return M(l!=null,"SyncTree gave us an op for an invalid query."),ay(l,e,t,s)}else{let l=[];for(const u of r.views.values())l=l.concat(ay(u,e,t,s));return l}}function gR(r,e,t,s,o){const l=e._queryIdentifier,u=r.views.get(l);if(!u){let h=Ja(t,o?s:null),p=!1;h?p=!0:s instanceof Q?(h=ah(t,s),p=!1):(h=Q.EMPTY_NODE,p=!1);const m=pl(new Or(h,p,!1),new Or(s,o,!1));return new aR(e,m)}return u}function yR(r,e,t,s,o,l){const u=gR(r,e,s,o,l);return r.views.has(e._queryIdentifier)||r.views.set(e._queryIdentifier,u),uR(u,t),dR(u,t)}function _R(r,e,t,s){const o=e._queryIdentifier,l=[];let u=[];const h=or(r);if(o==="default")for(const[p,m]of r.views.entries())u=u.concat(oy(m,t,s)),sy(m)&&(r.views.delete(p),m.query._queryParams.loadsAllData()||l.push(m.query));else{const p=r.views.get(o);p&&(u=u.concat(oy(p,t,s)),sy(p)&&(r.views.delete(o),p.query._queryParams.loadsAllData()||l.push(p.query)))}return h&&!or(r)&&l.push(new(pR())(e._repo,e._path)),{removed:l,events:u}}function Mv(r){const e=[];for(const t of r.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function Ei(r,e){let t=null;for(const s of r.views.values())t=t||cR(s,e);return t}function jv(r,e){if(e._queryParams.loadsAllData())return ml(r);{const s=e._queryIdentifier;return r.views.get(s)}}function Fv(r,e){return jv(r,e)!=null}function or(r){return ml(r)!=null}function ml(r){for(const e of r.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tl;function vR(r){M(!tl,"__referenceConstructor has already been defined"),tl=r}function wR(){return M(tl,"Reference.ts has not been loaded"),tl}let xR=1;class ly{constructor(e){this.listenProvider_=e,this.syncPointTree_=new Pe(null),this.pendingWriteTree_=YN(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Uv(r,e,t,s,o){return jN(r.pendingWriteTree_,e,t,s,o),o?Mi(r,new Ar(rh(),e,t)):[]}function SR(r,e,t,s){FN(r.pendingWriteTree_,e,t,s);const o=Pe.fromObject(t);return Mi(r,new Ti(rh(),e,o))}function kr(r,e,t=!1){const s=UN(r.pendingWriteTree_,e);if(zN(r.pendingWriteTree_,e)){let l=new Pe(null);return s.snap!=null?l=l.set(_e(),!0):st(s.children,u=>{l=l.set(new Ce(u),!0)}),Mi(r,new Qa(s.path,l,t))}else return[]}function gl(r,e,t){return Mi(r,new Ar(ih(),e,t))}function ER(r,e,t){const s=Pe.fromObject(t);return Mi(r,new Ti(ih(),e,s))}function CR(r,e){return Mi(r,new Js(ih(),e))}function kR(r,e,t){const s=hh(r,t);if(s){const o=fh(s),l=o.path,u=o.queryId,h=St(l,e),p=new Js(sh(u),h);return ph(r,l,p)}else return[]}function wd(r,e,t,s,o=!1){const l=e._path,u=r.syncPointTree_.get(l);let h=[];if(u&&(e._queryIdentifier==="default"||Fv(u,e))){const p=_R(u,e,t,s);mR(u)&&(r.syncPointTree_=r.syncPointTree_.remove(l));const m=p.removed;if(h=p.events,!o){const v=m.findIndex(x=>x._queryParams.loadsAllData())!==-1,_=r.syncPointTree_.findOnPath(l,(x,I)=>or(I));if(v&&!_){const x=r.syncPointTree_.subtree(l);if(!x.isEmpty()){const I=NR(x);for(let N=0;N<I.length;++N){const b=I[N],F=b.query,he=Vv(r,b);r.listenProvider_.startListening(Fs(F),nl(r,F),he.hashFn,he.onComplete)}}}!_&&m.length>0&&!s&&(v?r.listenProvider_.stopListening(Fs(e),null):m.forEach(x=>{const I=r.queryToTagMap.get(yl(x));r.listenProvider_.stopListening(Fs(x),I)}))}RR(r,m)}return h}function IR(r,e,t,s){const o=hh(r,s);if(o!=null){const l=fh(o),u=l.path,h=l.queryId,p=St(u,e),m=new Ar(sh(h),p,t);return ph(r,u,m)}else return[]}function TR(r,e,t,s){const o=hh(r,s);if(o){const l=fh(o),u=l.path,h=l.queryId,p=St(u,e),m=Pe.fromObject(t),v=new Ti(sh(h),p,m);return ph(r,u,v)}else return[]}function cy(r,e,t,s=!1){const o=e._path;let l=null,u=!1;r.syncPointTree_.foreachOnPath(o,(x,I)=>{const N=St(x,o);l=l||Ei(I,N),u=u||or(I)});let h=r.syncPointTree_.get(o);h?(u=u||or(h),l=l||Ei(h,_e())):(h=new hR,r.syncPointTree_=r.syncPointTree_.set(o,h));let p;l!=null?p=!0:(p=!1,l=Q.EMPTY_NODE,r.syncPointTree_.subtree(o).foreachChild((I,N)=>{const b=Ei(N,_e());b&&(l=l.updateImmediateChild(I,b))}));const m=Fv(h,e);if(!m&&!e._queryParams.loadsAllData()){const x=yl(e);M(!r.queryToTagMap.has(x),"View does not exist, but we have a tag");const I=PR();r.queryToTagMap.set(x,I),r.tagToQueryMap.set(I,x)}const v=oh(r.pendingWriteTree_,o);let _=yR(h,e,t,v,l,p);if(!m&&!u&&!s){const x=jv(h,e);_=_.concat(bR(r,e,x))}return _}function dh(r,e,t){const o=r.pendingWriteTree_,l=r.syncPointTree_.findOnPath(e,(u,h)=>{const p=St(u,e),m=Ei(h,p);if(m)return m});return Pv(o,e,l,t,!0)}function Mi(r,e){return zv(e,r.syncPointTree_,null,oh(r.pendingWriteTree_,_e()))}function zv(r,e,t,s){if(ce(r.path))return $v(r,e,t,s);{const o=e.get(_e());t==null&&o!=null&&(t=Ei(o,_e()));let l=[];const u=ae(r.path),h=r.operationForChild(u),p=e.children.get(u);if(p&&h){const m=t?t.getImmediateChild(u):null,v=bv(s,u);l=l.concat(zv(h,p,m,v))}return o&&(l=l.concat(uh(o,r,s,t))),l}}function $v(r,e,t,s){const o=e.get(_e());t==null&&o!=null&&(t=Ei(o,_e()));let l=[];return e.children.inorderTraversal((u,h)=>{const p=t?t.getImmediateChild(u):null,m=bv(s,u),v=r.operationForChild(u);v&&(l=l.concat($v(v,h,p,m)))}),o&&(l=l.concat(uh(o,r,s,t))),l}function Vv(r,e){const t=e.query,s=nl(r,t);return{hashFn:()=>(lR(e)||Q.EMPTY_NODE).hash(),onComplete:o=>{if(o==="ok")return s?kR(r,t._path,s):CR(r,t._path);{const l=ET(o,t);return wd(r,t,null,l)}}}}function nl(r,e){const t=yl(e);return r.queryToTagMap.get(t)}function yl(r){return r._path.toString()+"$"+r._queryIdentifier}function hh(r,e){return r.tagToQueryMap.get(e)}function fh(r){const e=r.indexOf("$");return M(e!==-1&&e<r.length-1,"Bad queryKey."),{queryId:r.substr(e+1),path:new Ce(r.substr(0,e))}}function ph(r,e,t){const s=r.syncPointTree_.get(e);M(s,"Missing sync point for query tag that we're tracking");const o=oh(r.pendingWriteTree_,e);return uh(s,t,o,null)}function NR(r){return r.fold((e,t,s)=>{if(t&&or(t))return[ml(t)];{let o=[];return t&&(o=Mv(t)),st(s,(l,u)=>{o=o.concat(u)}),o}})}function Fs(r){return r._queryParams.loadsAllData()&&!r._queryParams.isDefault()?new(wR())(r._repo,r._path):r}function RR(r,e){for(let t=0;t<e.length;++t){const s=e[t];if(!s._queryParams.loadsAllData()){const o=yl(s),l=r.queryToTagMap.get(o);r.queryToTagMap.delete(o),r.tagToQueryMap.delete(l)}}}function PR(){return xR++}function bR(r,e,t){const s=e._path,o=nl(r,e),l=Vv(r,t),u=r.listenProvider_.startListening(Fs(e),o,l.hashFn,l.onComplete),h=r.syncPointTree_.subtree(s);if(o)M(!or(h.value),"If we're adding a query, it shouldn't be shadowed");else{const p=h.fold((m,v,_)=>{if(!ce(m)&&v&&or(v))return[ml(v).query];{let x=[];return v&&(x=x.concat(Mv(v).map(I=>I.query))),st(_,(I,N)=>{x=x.concat(N)}),x}});for(let m=0;m<p.length;++m){const v=p[m];r.listenProvider_.stopListening(Fs(v),nl(r,v))}}return u}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mh{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new mh(t)}node(){return this.node_}}class gh{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=Ve(this.path_,e);return new gh(this.syncTree_,t)}node(){return dh(this.syncTree_,this.path_)}}const AR=function(r){return r=r||{},r.timestamp=r.timestamp||new Date().getTime(),r},uy=function(r,e,t){if(!r||typeof r!="object")return r;if(M(".sv"in r,"Unexpected leaf node or priority contents"),typeof r[".sv"]=="string")return OR(r[".sv"],e,t);if(typeof r[".sv"]=="object")return LR(r[".sv"],e);M(!1,"Unexpected server value: "+JSON.stringify(r,null,2))},OR=function(r,e,t){switch(r){case"timestamp":return t.timestamp;default:M(!1,"Unexpected server value: "+r)}},LR=function(r,e,t){r.hasOwnProperty("increment")||M(!1,"Unexpected server value: "+JSON.stringify(r,null,2));const s=r.increment;typeof s!="number"&&M(!1,"Unexpected increment value: "+s);const o=e.node();if(M(o!==null&&typeof o<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!o.isLeafNode())return s;const u=o.getValue();return typeof u!="number"?s:u+s},Bv=function(r,e,t,s){return yh(e,new gh(t,r),s)},Wv=function(r,e,t){return yh(r,new mh(e),t)};function yh(r,e,t){const s=r.getPriority().val(),o=uy(s,e.getImmediateChild(".priority"),t);let l;if(r.isLeafNode()){const u=r,h=uy(u.getValue(),e,t);return h!==u.getValue()||o!==u.getPriority().val()?new Xe(h,et(o)):r}else{const u=r;return l=u,o!==u.getPriority().val()&&(l=l.updatePriority(new Xe(o))),u.forEachChild(ze,(h,p)=>{const m=yh(p,e.getImmediateChild(h),t);m!==p&&(l=l.updateImmediateChild(h,m))}),l}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _h{constructor(e="",t=null,s={children:{},childCount:0}){this.name=e,this.parent=t,this.node=s}}function _l(r,e){let t=e instanceof Ce?e:new Ce(e),s=r,o=ae(t);for(;o!==null;){const l=Tr(s.node.children,o)||{children:{},childCount:0};s=new _h(o,s,l),t=be(t),o=ae(t)}return s}function $r(r){return r.node.value}function vh(r,e){r.node.value=e,xd(r)}function Hv(r){return r.node.childCount>0}function DR(r){return $r(r)===void 0&&!Hv(r)}function vl(r,e){st(r.node.children,(t,s)=>{e(new _h(t,r,s))})}function Kv(r,e,t,s){t&&e(r),vl(r,o=>{Kv(o,e,!0)})}function MR(r,e,t){let s=r.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function lo(r){return new Ce(r.parent===null?r.name:lo(r.parent)+"/"+r.name)}function xd(r){r.parent!==null&&jR(r.parent,r.name,r)}function jR(r,e,t){const s=DR(t),o=en(r.node.children,e);s&&o?(delete r.node.children[e],r.node.childCount--,xd(r)):!s&&!o&&(r.node.children[e]=t.node,r.node.childCount++,xd(r))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FR=/[\[\].#$\/\u0000-\u001F\u007F]/,UR=/[\[\].#$\u0000-\u001F\u007F]/,Bu=10*1024*1024,wh=function(r){return typeof r=="string"&&r.length!==0&&!FR.test(r)},Gv=function(r){return typeof r=="string"&&r.length!==0&&!UR.test(r)},zR=function(r){return r&&(r=r.replace(/^\/*\.info(\/|$)/,"/")),Gv(r)},qv=function(r){return r===null||typeof r=="string"||typeof r=="number"&&!Kd(r)||r&&typeof r=="object"&&en(r,".sv")},wl=function(r,e,t){const s=t instanceof Ce?new rN(t,r):t;if(e===void 0)throw new Error(r+"contains undefined "+Sr(s));if(typeof e=="function")throw new Error(r+"contains a function "+Sr(s)+" with contents = "+e.toString());if(Kd(e))throw new Error(r+"contains "+e.toString()+" "+Sr(s));if(typeof e=="string"&&e.length>Bu/3&&sl(e)>Bu)throw new Error(r+"contains a string greater than "+Bu+" utf8 bytes "+Sr(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let o=!1,l=!1;if(st(e,(u,h)=>{if(u===".value")o=!0;else if(u!==".priority"&&u!==".sv"&&(l=!0,!wh(u)))throw new Error(r+" contains an invalid key ("+u+") "+Sr(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);iN(s,u),wl(r,h,s),sN(s)}),o&&l)throw new Error(r+' contains ".value" child '+Sr(s)+" in addition to actual children.")}},$R=function(r,e){let t,s;for(t=0;t<e.length;t++){s=e[t];const l=Gs(s);for(let u=0;u<l.length;u++)if(!(l[u]===".priority"&&u===l.length-1)){if(!wh(l[u]))throw new Error(r+"contains an invalid key ("+l[u]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(nN);let o=null;for(t=0;t<e.length;t++){if(s=e[t],o!==null&&Ft(o,s))throw new Error(r+"contains a path "+o.toString()+" that is ancestor of another path "+s.toString());o=s}},VR=function(r,e,t,s){const o=Rd(r,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(o+" must be an object containing the children to replace.");const l=[];st(e,(u,h)=>{const p=new Ce(u);if(wl(o,h,Ve(t,p)),Jd(p)===".priority"&&!qv(h))throw new Error(o+"contains an invalid value for '"+p.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");l.push(p)}),$R(o,l)},Yv=function(r,e,t,s){if(!Gv(t))throw new Error(Rd(r,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},BR=function(r,e,t,s){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Yv(r,e,t)},WR=function(r,e){if(ae(e)===".info")throw new Error(r+" failed = Can't modify data under /.info/")},HR=function(r,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!wh(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!zR(t))throw new Error(Rd(r,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KR{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function xh(r,e){let t=null;for(let s=0;s<e.length;s++){const o=e[s],l=o.getPath();t!==null&&!Xd(l,t.path)&&(r.eventLists_.push(t),t=null),t===null&&(t={events:[],path:l}),t.events.push(o)}t&&r.eventLists_.push(t)}function Qv(r,e,t){xh(r,t),Jv(r,s=>Xd(s,e))}function dn(r,e,t){xh(r,t),Jv(r,s=>Ft(s,e)||Ft(e,s))}function Jv(r,e){r.recursionDepth_++;let t=!0;for(let s=0;s<r.eventLists_.length;s++){const o=r.eventLists_[s];if(o){const l=o.path;e(l)?(GR(r.eventLists_[s]),r.eventLists_[s]=null):t=!1}}t&&(r.eventLists_=[]),r.recursionDepth_--}function GR(r){for(let e=0;e<r.events.length;e++){const t=r.events[e];if(t!==null){r.events[e]=null;const s=t.getEventRunner();Ls&&it("event: "+t.toString()),Di(s)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qR="repo_interrupt",YR=25;class QR{constructor(e,t,s,o){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=s,this.appCheckProvider_=o,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new KR,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Ya(),this.transactionQueueTree_=new _h,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function JR(r,e,t){if(r.stats_=Yd(r.repoInfo_),r.forceRestClient_||TT())r.server_=new qa(r.repoInfo_,(s,o,l,u)=>{dy(r,s,o,l,u)},r.authTokenProvider_,r.appCheckProvider_),setTimeout(()=>hy(r,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{tt(t)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}r.persistentConnection_=new kn(r.repoInfo_,e,(s,o,l,u)=>{dy(r,s,o,l,u)},s=>{hy(r,s)},s=>{ZR(r,s)},r.authTokenProvider_,r.appCheckProvider_,t),r.server_=r.persistentConnection_}r.authTokenProvider_.addTokenChangeListener(s=>{r.server_.refreshAuthToken(s)}),r.appCheckProvider_.addTokenChangeListener(s=>{r.server_.refreshAppCheckToken(s.token)}),r.statsReporter_=AT(r.repoInfo_,()=>new bN(r.stats_,r.server_)),r.infoData_=new IN,r.infoSyncTree_=new ly({startListening:(s,o,l,u)=>{let h=[];const p=r.infoData_.getNode(s._path);return p.isEmpty()||(h=gl(r.infoSyncTree_,s._path,p),setTimeout(()=>{u("ok")},0)),h},stopListening:()=>{}}),Sh(r,"connected",!1),r.serverSyncTree_=new ly({startListening:(s,o,l,u)=>(r.server_.listen(s,l,o,(h,p)=>{const m=u(h,p);dn(r.eventQueue_,s._path,m)}),[]),stopListening:(s,o)=>{r.server_.unlisten(s,o)}})}function XR(r){const t=r.infoData_.getNode(new Ce(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function xl(r){return AR({timestamp:XR(r)})}function dy(r,e,t,s,o){r.dataUpdateCount++;const l=new Ce(e);t=r.interceptServerDataCallback_?r.interceptServerDataCallback_(e,t):t;let u=[];if(o)if(s){const p=Da(t,m=>et(m));u=TR(r.serverSyncTree_,l,p,o)}else{const p=et(t);u=IR(r.serverSyncTree_,l,p,o)}else if(s){const p=Da(t,m=>et(m));u=ER(r.serverSyncTree_,l,p)}else{const p=et(t);u=gl(r.serverSyncTree_,l,p)}let h=l;u.length>0&&(h=Xs(r,l)),dn(r.eventQueue_,h,u)}function hy(r,e){Sh(r,"connected",e),e===!1&&tP(r)}function ZR(r,e){st(e,(t,s)=>{Sh(r,t,s)})}function Sh(r,e,t){const s=new Ce("/.info/"+e),o=et(t);r.infoData_.updateSnapshot(s,o);const l=gl(r.infoSyncTree_,s,o);dn(r.eventQueue_,s,l)}function Eh(r){return r.nextWriteId_++}function eP(r,e,t,s){Sl(r,"update",{path:e.toString(),value:t});let o=!0;const l=xl(r),u={};if(st(t,(h,p)=>{o=!1,u[h]=Bv(Ve(e,h),et(p),r.serverSyncTree_,l)}),o)it("update() called with empty data.  Don't do anything."),py(r,s,"ok",void 0);else{const h=Eh(r),p=SR(r.serverSyncTree_,e,u,h);xh(r.eventQueue_,p),r.server_.merge(e.toString(),t,(m,v)=>{const _=m==="ok";_||Ct("update at "+e+" failed: "+m);const x=kr(r.serverSyncTree_,h,!_),I=x.length>0?Xs(r,e):e;dn(r.eventQueue_,I,x),py(r,s,m,v)}),st(t,m=>{const v=t0(r,Ve(e,m));Xs(r,v)}),dn(r.eventQueue_,e,[])}}function tP(r){Sl(r,"onDisconnectEvents");const e=xl(r),t=Ya();fd(r.onDisconnect_,_e(),(o,l)=>{const u=Bv(o,l,r.serverSyncTree_,e);Iv(t,o,u)});let s=[];fd(t,_e(),(o,l)=>{s=s.concat(gl(r.serverSyncTree_,o,l));const u=t0(r,o);Xs(r,u)}),r.onDisconnect_=Ya(),dn(r.eventQueue_,_e(),s)}function nP(r,e,t){let s;ae(e._path)===".info"?s=cy(r.infoSyncTree_,e,t):s=cy(r.serverSyncTree_,e,t),Qv(r.eventQueue_,e._path,s)}function fy(r,e,t){let s;ae(e._path)===".info"?s=wd(r.infoSyncTree_,e,t):s=wd(r.serverSyncTree_,e,t),Qv(r.eventQueue_,e._path,s)}function rP(r){r.persistentConnection_&&r.persistentConnection_.interrupt(qR)}function Sl(r,...e){let t="";r.persistentConnection_&&(t=r.persistentConnection_.id+":"),it(t,...e)}function py(r,e,t,s){e&&Di(()=>{if(t==="ok")e(null);else{const o=(t||"error").toUpperCase();let l=o;s&&(l+=": "+s);const u=new Error(l);u.code=o,e(u)}})}function iP(r,e,t,s,o,l){Sl(r,"transaction on "+e);const u={path:e,update:t,onComplete:s,status:null,order:Q_(),applyLocally:l,retryCount:0,unwatcher:o,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},h=Ch(r,e,void 0);u.currentInputSnapshot=h;const p=u.update(h.val());if(p===void 0)u.unwatcher(),u.currentOutputSnapshotRaw=null,u.currentOutputSnapshotResolved=null,u.onComplete&&u.onComplete(null,!1,u.currentInputSnapshot);else{wl("transaction failed: Data returned ",p,u.path),u.status=0;const m=_l(r.transactionQueueTree_,e),v=$r(m)||[];v.push(u),vh(m,v);let _;typeof p=="object"&&p!==null&&en(p,".priority")?(_=Tr(p,".priority"),M(qv(_),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):_=(dh(r.serverSyncTree_,e)||Q.EMPTY_NODE).getPriority().val();const x=xl(r),I=et(p,_),N=Wv(I,h,x);u.currentOutputSnapshotRaw=I,u.currentOutputSnapshotResolved=N,u.currentWriteId=Eh(r);const b=Uv(r.serverSyncTree_,e,N,u.currentWriteId,u.applyLocally);dn(r.eventQueue_,e,b),El(r,r.transactionQueueTree_)}}function Ch(r,e,t){return dh(r.serverSyncTree_,e,t)||Q.EMPTY_NODE}function El(r,e=r.transactionQueueTree_){if(e||Cl(r,e),$r(e)){const t=Zv(r,e);M(t.length>0,"Sending zero length transaction queue"),t.every(o=>o.status===0)&&sP(r,lo(e),t)}else Hv(e)&&vl(e,t=>{El(r,t)})}function sP(r,e,t){const s=t.map(m=>m.currentWriteId),o=Ch(r,e,s);let l=o;const u=o.hash();for(let m=0;m<t.length;m++){const v=t[m];M(v.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),v.status=1,v.retryCount++;const _=St(e,v.path);l=l.updateChild(_,v.currentOutputSnapshotRaw)}const h=l.val(!0),p=e;r.server_.put(p.toString(),h,m=>{Sl(r,"transaction put response",{path:p.toString(),status:m});let v=[];if(m==="ok"){const _=[];for(let x=0;x<t.length;x++)t[x].status=2,v=v.concat(kr(r.serverSyncTree_,t[x].currentWriteId)),t[x].onComplete&&_.push(()=>t[x].onComplete(null,!0,t[x].currentOutputSnapshotResolved)),t[x].unwatcher();Cl(r,_l(r.transactionQueueTree_,e)),El(r,r.transactionQueueTree_),dn(r.eventQueue_,e,v);for(let x=0;x<_.length;x++)Di(_[x])}else{if(m==="datastale")for(let _=0;_<t.length;_++)t[_].status===3?t[_].status=4:t[_].status=0;else{Ct("transaction at "+p.toString()+" failed: "+m);for(let _=0;_<t.length;_++)t[_].status=4,t[_].abortReason=m}Xs(r,e)}},u)}function Xs(r,e){const t=Xv(r,e),s=lo(t),o=Zv(r,t);return oP(r,o,s),s}function oP(r,e,t){if(e.length===0)return;const s=[];let o=[];const u=e.filter(h=>h.status===0).map(h=>h.currentWriteId);for(let h=0;h<e.length;h++){const p=e[h],m=St(t,p.path);let v=!1,_;if(M(m!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),p.status===4)v=!0,_=p.abortReason,o=o.concat(kr(r.serverSyncTree_,p.currentWriteId,!0));else if(p.status===0)if(p.retryCount>=YR)v=!0,_="maxretry",o=o.concat(kr(r.serverSyncTree_,p.currentWriteId,!0));else{const x=Ch(r,p.path,u);p.currentInputSnapshot=x;const I=e[h].update(x.val());if(I!==void 0){wl("transaction failed: Data returned ",I,p.path);let N=et(I);typeof I=="object"&&I!=null&&en(I,".priority")||(N=N.updatePriority(x.getPriority()));const F=p.currentWriteId,he=xl(r),fe=Wv(N,x,he);p.currentOutputSnapshotRaw=N,p.currentOutputSnapshotResolved=fe,p.currentWriteId=Eh(r),u.splice(u.indexOf(F),1),o=o.concat(Uv(r.serverSyncTree_,p.path,fe,p.currentWriteId,p.applyLocally)),o=o.concat(kr(r.serverSyncTree_,F,!0))}else v=!0,_="nodata",o=o.concat(kr(r.serverSyncTree_,p.currentWriteId,!0))}dn(r.eventQueue_,t,o),o=[],v&&(e[h].status=2,(function(x){setTimeout(x,Math.floor(0))})(e[h].unwatcher),e[h].onComplete&&(_==="nodata"?s.push(()=>e[h].onComplete(null,!1,e[h].currentInputSnapshot)):s.push(()=>e[h].onComplete(new Error(_),!1,null))))}Cl(r,r.transactionQueueTree_);for(let h=0;h<s.length;h++)Di(s[h]);El(r,r.transactionQueueTree_)}function Xv(r,e){let t,s=r.transactionQueueTree_;for(t=ae(e);t!==null&&$r(s)===void 0;)s=_l(s,t),e=be(e),t=ae(e);return s}function Zv(r,e){const t=[];return e0(r,e,t),t.sort((s,o)=>s.order-o.order),t}function e0(r,e,t){const s=$r(e);if(s)for(let o=0;o<s.length;o++)t.push(s[o]);vl(e,o=>{e0(r,o,t)})}function Cl(r,e){const t=$r(e);if(t){let s=0;for(let o=0;o<t.length;o++)t[o].status!==2&&(t[s]=t[o],s++);t.length=s,vh(e,t.length>0?t:void 0)}vl(e,s=>{Cl(r,s)})}function t0(r,e){const t=lo(Xv(r,e)),s=_l(r.transactionQueueTree_,e);return MR(s,o=>{Wu(r,o)}),Wu(r,s),Kv(s,o=>{Wu(r,o)}),t}function Wu(r,e){const t=$r(e);if(t){const s=[];let o=[],l=-1;for(let u=0;u<t.length;u++)t[u].status===3||(t[u].status===1?(M(l===u-1,"All SENT items should be at beginning of queue."),l=u,t[u].status=3,t[u].abortReason="set"):(M(t[u].status===0,"Unexpected transaction status in abort"),t[u].unwatcher(),o=o.concat(kr(r.serverSyncTree_,t[u].currentWriteId,!0)),t[u].onComplete&&s.push(t[u].onComplete.bind(null,new Error("set"),!1,null))));l===-1?vh(e,void 0):t.length=l+1,dn(r.eventQueue_,lo(e),o);for(let u=0;u<s.length;u++)Di(s[u])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aP(r){let e="";const t=r.split("/");for(let s=0;s<t.length;s++)if(t[s].length>0){let o=t[s];try{o=decodeURIComponent(o.replace(/\+/g," "))}catch{}e+="/"+o}return e}function lP(r){const e={};r.charAt(0)==="?"&&(r=r.substring(1));for(const t of r.split("&")){if(t.length===0)continue;const s=t.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):Ct(`Invalid query segment '${t}' in query '${r}'`)}return e}const my=function(r,e){const t=cP(r),s=t.namespace;t.domain==="firebase.com"&&Nn(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&t.domain!=="localhost"&&Nn("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||_T();const o=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new cv(t.host,t.secure,s,o,e,"",s!==t.subdomain),path:new Ce(t.pathString)}},cP=function(r){let e="",t="",s="",o="",l="",u=!0,h="https",p=443;if(typeof r=="string"){let m=r.indexOf("//");m>=0&&(h=r.substring(0,m-1),r=r.substring(m+2));let v=r.indexOf("/");v===-1&&(v=r.length);let _=r.indexOf("?");_===-1&&(_=r.length),e=r.substring(0,Math.min(v,_)),v<_&&(o=aP(r.substring(v,_)));const x=lP(r.substring(Math.min(r.length,_)));m=e.indexOf(":"),m>=0?(u=h==="https"||h==="wss",p=parseInt(e.substring(m+1),10)):m=e.length;const I=e.slice(0,m);if(I.toLowerCase()==="localhost")t="localhost";else if(I.split(".").length<=2)t=I;else{const N=e.indexOf(".");s=e.substring(0,N).toLowerCase(),t=e.substring(N+1),l=s}"ns"in x&&(l=x.ns)}return{host:e,port:p,domain:t,subdomain:s,secure:u,scheme:h,pathString:o,namespace:l}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uP{constructor(e,t,s,o){this.eventType=e,this.eventRegistration=t,this.snapshot=s,this.prevName=o}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+tt(this.snapshot.exportVal())}}class dP{constructor(e,t,s){this.eventRegistration=e,this.error=t,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hP{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return M(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kh{constructor(e,t,s,o){this._repo=e,this._path=t,this._queryParams=s,this._orderByCalled=o}get key(){return ce(this._path)?null:Jd(this._path)}get ref(){return new Rn(this._repo,this._path)}get _queryIdentifier(){const e=Xg(this._queryParams),t=Gd(e);return t==="{}"?"default":t}get _queryObject(){return Xg(this._queryParams)}isEqual(e){if(e=ot(e),!(e instanceof kh))return!1;const t=this._repo===e._repo,s=Xd(this._path,e._path),o=this._queryIdentifier===e._queryIdentifier;return t&&s&&o}toJSON(){return this.toString()}toString(){return this._repo.toString()+tN(this._path)}}class Rn extends kh{constructor(e,t){super(e,t,new nh,!1)}get parent(){const e=_v(this._path);return e===null?null:new Rn(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Zs{constructor(e,t,s){this._node=e,this.ref=t,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new Ce(e),s=Ed(this.ref,e);return new Zs(this._node.getChild(t),s,ze)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,o)=>e(new Zs(o,Ed(this.ref,s),ze)))}hasChild(e){const t=new Ce(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Sd(r,e){return r=ot(r),r._checkNotDeleted("ref"),e!==void 0?Ed(r._root,e):r._root}function Ed(r,e){return r=ot(r),ae(r._path)===null?BR("child","path",e):Yv("child","path",e),new Rn(r._repo,Ve(r._path,e))}function fP(r,e){VR("update",e,r._path);const t=new eo;return eP(r._repo,r._path,e,t.wrapCallback(()=>{})),t.promise}class Ih{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const s=t._queryParams.getIndex();return new uP("value",this,new Zs(e.snapshotNode,new Rn(t._repo,t._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new dP(this,e,t):null}matches(e){return e instanceof Ih?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function pP(r,e,t,s,o){let l;if(typeof s=="object"&&(l=void 0,o=s),typeof s=="function"&&(l=s),o&&o.onlyOnce){const p=t,m=(v,_)=>{fy(r._repo,r,h),p(v,_)};m.userCallback=t.userCallback,m.context=t.context,t=m}const u=new hP(t,l||void 0),h=new Ih(u);return nP(r._repo,r,h),()=>fy(r._repo,r,h)}function n0(r,e,t,s){return pP(r,"value",e,t,s)}fR(Rn);vR(Rn);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mP="FIREBASE_DATABASE_EMULATOR_HOST",Cd={};let gP=!1;function yP(r,e,t,s){const o=e.lastIndexOf(":"),l=e.substring(0,o),u=to(l);r.repoInfo_=new cv(e,u,r.repoInfo_.namespace,r.repoInfo_.webSocketOnly,r.repoInfo_.nodeAdmin,r.repoInfo_.persistenceKey,r.repoInfo_.includeNamespaceInQueryParams,!0,t),s&&(r.authTokenProvider_=s)}function _P(r,e,t,s,o){let l=s||r.options.databaseURL;l===void 0&&(r.options.projectId||Nn("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),it("Using default host for project ",r.options.projectId),l=`${r.options.projectId}-default-rtdb.firebaseio.com`);let u=my(l,o),h=u.repoInfo,p;typeof process<"u"&&Lg&&(p=Lg[mP]),p?(l=`http://${p}?ns=${h.namespace}`,u=my(l,o),h=u.repoInfo):u.repoInfo.secure;const m=new RT(r.name,r.options,e);HR("Invalid Firebase Database URL",u),ce(u.path)||Nn("Database URL must point to the root of a Firebase Database (not including a child path).");const v=wP(h,r,m,new NT(r,t));return new xP(v,r)}function vP(r,e){const t=Cd[e];(!t||t[r.key]!==r)&&Nn(`Database ${e}(${r.repoInfo_}) has already been deleted.`),rP(r),delete t[r.key]}function wP(r,e,t,s){let o=Cd[e.name];o||(o={},Cd[e.name]=o);let l=o[r.toURLString()];return l&&Nn("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),l=new QR(r,gP,t,s),o[r.toURLString()]=l,l}class xP{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(JR(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Rn(this._repo,_e())),this._rootInternal}_delete(){return this._rootInternal!==null&&(vP(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Nn("Cannot call "+e+" on a deleted database.")}}function SP(r=bd(),e){const t=jr(r,"database").getImmediate({identifier:e});if(!t._instanceStarted){const s=i1("database");s&&EP(t,...s)}return t}function EP(r,e,t,s={}){r=ot(r),r._checkNotDeleted("useEmulator");const o=`${e}:${t}`,l=r._repoInternal;if(r._instanceStarted){if(o===r._repoInternal.repoInfo_.host&&ir(s,l.repoInfo_.emulatorOptions))return;Nn("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let u;if(l.repoInfo_.nodeAdmin)s.mockUserToken&&Nn('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),u=new Pa(Pa.OWNER);else if(s.mockUserToken){const h=typeof s.mockUserToken=="string"?s.mockUserToken:s1(s.mockUserToken,r.app.options.projectId);u=new Pa(h)}to(e)&&zy(e),yP(l,o,s,u)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CP(r){fT(Ai),un(new Xt("database",(e,{instanceIdentifier:t})=>{const s=e.getProvider("app").getImmediate(),o=e.getProvider("auth-internal"),l=e.getProvider("app-check-internal");return _P(s,o,l,t)},"PUBLIC").setMultipleInstances(!0)),Ut(Dg,Mg,r),Ut(Dg,Mg,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kP={".sv":"timestamp"};function IP(){return kP}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TP{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function NP(r,e,t){if(r=ot(r),WR("Reference.transaction",r._path),r.key===".length"||r.key===".keys")throw"Reference.transaction failed: "+r.key+" is a read-only object.";const s=!0,o=new eo,l=(h,p,m)=>{let v=null;h?o.reject(h):(v=new Zs(m,new Rn(r._repo,r._path),ze),o.resolve(new TP(p,v)))},u=n0(r,()=>{});return iP(r._repo,r._path,e,l,u,s),o.promise}kn.prototype.simpleListen=function(r,e){this.sendRequest("q",{p:r},e)};kn.prototype.echo=function(r,e){this.sendRequest("echo",{d:r},e)};CP();const RP={apiKey:"AIzaSyBjGqNtm17fdNUfU5twhJt8Wc20OEB0B28",authDomain:"uncleaunty-app.firebaseapp.com",databaseURL:"https://uncleaunty-app-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"uncleaunty-app",storageBucket:"uncleaunty-app.firebasestorage.app",messagingSenderId:"285281834576",appId:"1:285281834576:web:b02bf5636bead00effa355",measurementId:"G-Y9JX43E2RN"},Th=Wy(RP);lT(Th);const Dr=Vk(Th),kd=SP(Th);function PP({onGetStarted:r,onCaregiverLogin:e}){const{t}=Ri(),[s,o]=te.useState(""),[l,u]=te.useState(""),[h,p]=te.useState(!1),[m,v]=te.useState(""),[_,x]=te.useState(!1),I=async N=>{N.preventDefault(),v(""),x(!0);try{await NC(Dr,s.trim(),l),r()}catch(b){console.error("Login failed:",b),v("Email or password is incorrect.")}finally{x(!1)}};return y.jsx("div",{className:"h-full overflow-y-auto bg-gray-50",children:y.jsx("div",{className:"flex min-h-full items-center justify-center px-5 py-6 min-[390px]:px-8 min-[390px]:py-8",children:y.jsxs("div",{className:"w-full rounded-3xl bg-white p-5 shadow-lg min-[390px]:p-8",children:[y.jsxs("div",{className:"mb-5 flex items-center gap-3 min-[390px]:mb-8",children:[y.jsx("div",{className:"flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-gray-800 min-[390px]:h-14 min-[390px]:w-14",children:y.jsx(Fx,{className:"h-6 w-6 text-gray-800 min-[390px]:h-7 min-[390px]:w-7"})}),y.jsxs("div",{children:[y.jsx("h2",{className:"text-xl font-bold min-[390px]:text-2xl",children:t("careConnect")}),y.jsx("p",{className:"text-sm text-gray-600",children:t("mobile")})]})]}),y.jsx("h1",{className:"mb-5 text-center text-4xl font-bold leading-tight min-[390px]:mb-8 min-[390px]:text-5xl",children:t("welcomeBack")}),y.jsxs("form",{onSubmit:I,className:"space-y-4 min-[390px]:space-y-6",children:[y.jsxs("div",{children:[y.jsx("label",{className:"mb-2 block text-lg font-bold text-gray-900 min-[390px]:mb-3 min-[390px]:text-xl",children:t("email")}),y.jsxs("div",{className:"relative",children:[y.jsx(Hx,{className:"absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 min-[390px]:h-6 min-[390px]:w-6"}),y.jsx("input",{type:"email",value:s,onChange:N=>o(N.target.value),placeholder:t("enterEmail"),required:!0,className:"w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-5 text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 min-[390px]:py-5 min-[390px]:pl-14 min-[390px]:text-xl"})]})]}),y.jsxs("div",{children:[y.jsx("label",{className:"mb-2 block text-lg font-bold text-gray-900 min-[390px]:mb-3 min-[390px]:text-xl",children:t("password")}),y.jsxs("div",{className:"relative",children:[y.jsx(qu,{className:"absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 min-[390px]:h-6 min-[390px]:w-6"}),y.jsx("input",{type:h?"text":"password",value:l,onChange:N=>u(N.target.value),placeholder:t("enterPassword"),required:!0,className:"w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-12 text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 min-[390px]:py-5 min-[390px]:pl-14 min-[390px]:pr-14 min-[390px]:text-xl"}),y.jsx("button",{type:"button",onClick:()=>p(!h),className:"absolute right-4 top-1/2 -translate-y-1/2 text-gray-400",children:y.jsx(Mx,{className:"h-5 w-5 min-[390px]:h-6 min-[390px]:w-6"})})]})]}),m&&y.jsx("p",{className:"text-base font-bold text-red-600 min-[390px]:text-lg",children:m}),y.jsxs("button",{type:"submit",disabled:_,className:"flex w-full items-center justify-center gap-3 rounded-2xl bg-green-700 py-4 text-xl font-bold text-white transition-transform active:scale-95 disabled:bg-gray-400 disabled:active:scale-100 min-[390px]:py-5 min-[390px]:text-2xl",children:[y.jsx(qu,{className:"h-5 w-5 min-[390px]:h-6 min-[390px]:w-6"}),_?"Logging in...":t("logIn")]}),y.jsx("button",{type:"button",className:"w-full text-lg font-bold text-gray-700 underline min-[390px]:text-xl",children:t("forgotPassword")})]}),y.jsxs("div",{className:"my-5 flex items-center gap-4 min-[390px]:my-8",children:[y.jsx("div",{className:"flex-1 h-px bg-gray-200"}),y.jsx("span",{className:"text-gray-500 font-bold text-lg",children:t("or")}),y.jsx("div",{className:"flex-1 h-px bg-gray-200"})]}),y.jsxs("button",{type:"button",onClick:e,className:"flex w-full items-center gap-4 rounded-2xl border border-green-200 bg-green-50 p-4 transition-colors active:bg-green-100 min-[390px]:p-5",children:[y.jsxs("div",{className:"flex-1 text-left",children:[y.jsx("h3",{className:"text-lg font-bold text-gray-900 min-[390px]:text-xl",children:t("caregiverLogin")}),y.jsx("p",{className:"text-sm text-gray-600 min-[390px]:text-base",children:t("caregiverDesc")})]}),y.jsx(wy,{className:"w-6 h-6 text-gray-400 flex-shrink-0"})]})]})})})}function bP({onContinue:r}){const{t:e,i18n:t}=Ri(),[s,o]=te.useState("en"),l=[{id:"en",name:e("english")},{id:"ms",name:e("malay")},{id:"zh",name:e("chinese")},{id:"ta",name:e("tamil")}],u=h=>{o(h),t.changeLanguage(h)};return y.jsxs("div",{className:"flex h-full flex-col overflow-y-auto bg-gray-50 p-5 min-[390px]:p-8",children:[y.jsxs("div",{className:"flex-1",children:[y.jsx("h1",{className:"mb-8 text-4xl font-bold leading-tight text-green-700 min-[390px]:mb-12 min-[390px]:text-5xl",children:e("selectLanguage")}),y.jsx("div",{className:"space-y-3 min-[390px]:space-y-4",children:l.map((h,p)=>y.jsxs("button",{onClick:()=>u(h.id),className:`flex w-full items-center gap-4 rounded-2xl bg-white p-4 transition-all min-[390px]:gap-5 min-[390px]:p-6 ${s===h.id?"ring-2 ring-green-600":"ring-1 ring-gray-200"}`,children:[y.jsxs("span",{className:"w-7 text-xl font-bold text-gray-600 min-[390px]:w-8 min-[390px]:text-2xl",children:[p+1,"."]}),y.jsx("span",{className:"flex-1 text-left text-xl font-bold text-gray-900 min-[390px]:text-2xl",children:h.name}),s===h.id&&y.jsx("div",{className:"flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-green-600 min-[390px]:h-10 min-[390px]:w-10",children:y.jsx(Sx,{className:"h-5 w-5 text-white min-[390px]:h-6 min-[390px]:w-6",strokeWidth:3})})]},h.id))})]}),y.jsxs("button",{onClick:r,className:"mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-green-700 py-4 text-xl font-bold text-white transition-transform active:scale-95 min-[390px]:py-6 min-[390px]:text-2xl",children:[e("continue"),y.jsx(mx,{className:"h-6 w-6 min-[390px]:h-7 min-[390px]:w-7"})]})]})}const AP="/assets/image-2-Cz1ZQkun.png",Hu={pad21740:"M12.188 2.031C6.579 2.031 2.031 6.579 2.031 12.188c0 5.608 4.548 10.156 10.157 10.156 5.608 0 10.156-4.548 10.156-10.156C22.344 6.579 17.796 2.031 12.188 2.031Zm0 2.032a8.105 8.105 0 0 1 8.125 8.125 8.105 8.105 0 0 1-8.125 8.125 8.105 8.105 0 0 1-8.126-8.125 8.105 8.105 0 0 1 8.126-8.126Zm3.53 4.198-4.546 4.545-2.03-2.03-1.438 1.437 3.468 3.468 5.983-5.983-1.437-1.437Z",p22515f80:"M24.375 4.063c-11.22 0-20.313 9.093-20.313 20.312s9.094 20.313 20.313 20.313 20.313-9.094 20.313-20.313S35.594 4.062 24.375 4.062Zm9.698 16.445L22.202 32.379l-6.617-6.617 2.872-2.872 3.745 3.745 8.999-8.999 2.872 2.872Z",p1eb81b40:"M7.5 0C5.843 0 4.5 1.343 4.5 3v6c0 1.657 1.343 3 3 3s3-1.343 3-3V3c0-1.657-1.343-3-3-3Zm-6 8.25a.75.75 0 0 1 1.5 0V9c0 2.486 2.014 4.5 4.5 4.5S12 11.486 12 9v-.75a.75.75 0 0 1 1.5 0V9a6.001 6.001 0 0 1-5.25 5.953V18h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-3.047A6.001 6.001 0 0 1 1.5 9v-.75Z"};function gy({onSOSClick:r,onCheckIn:e}){const{t}=Ri();return y.jsxs("div",{className:"bg-white content-stretch flex flex-col items-start relative size-full overflow-y-auto",children:[y.jsx("div",{className:"bg-[#fbf9f8] relative shrink-0 w-full",children:y.jsx("div",{className:"flex flex-row items-center size-full",children:y.jsxs("div",{className:"content-stretch flex items-center justify-between px-5 py-2 relative size-full min-[390px]:px-6",children:[y.jsx("div",{className:"content-stretch flex items-center justify-center relative shrink-0 size-9 min-[390px]:size-10",children:y.jsx("div",{className:"relative shrink-0 size-[24.375px]",children:y.jsx("svg",{className:"absolute block inset-0 size-full",fill:"none",preserveAspectRatio:"none",viewBox:"0 0 24.375 24.375",children:y.jsx("g",{id:"Container",children:y.jsx("path",{d:Hu.pad21740,fill:"var(--fill-0, #316342)",id:"Symbol"})})})})}),y.jsx("div",{className:"content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative",children:y.jsx("div",{className:"flex flex-col font-['Lexend:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#316342] text-[40px] text-center whitespace-nowrap min-[390px]:text-[50px]",children:y.jsx("p",{className:"leading-[44px] min-[390px]:leading-[50px]",children:t("home")})})}),y.jsxs("div",{className:"bg-[#dcd9d9] relative rounded-[9999px] shrink-0 size-11 min-[390px]:size-12",children:[y.jsx("div",{className:"content-stretch flex flex-col items-start justify-center overflow-clip p-[2px] relative rounded-[inherit] size-full",children:y.jsx("div",{className:"flex-[1_0_0] min-h-px relative w-full",children:y.jsx("div",{className:"absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none",children:y.jsx("img",{alt:"",className:"absolute left-0 max-w-none size-full top-0 object-cover",src:AP})})})}),y.jsx("div",{"aria-hidden":"true",className:"absolute border-2 border-[#f0eded] border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"})]})]})})}),y.jsx("div",{className:"relative flex-1 w-full",children:y.jsx("div",{className:"flex flex-col items-center size-full",children:y.jsxs("div",{className:"content-stretch flex flex-col items-center px-5 pb-4 relative size-full min-[390px]:px-6",children:[y.jsx("div",{className:"content-stretch flex flex-col items-start pb-3 pt-2 relative shrink-0 w-full min-[390px]:pb-[18px] min-[390px]:pt-3",children:y.jsxs("div",{className:"content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full",children:[y.jsx("div",{className:"content-stretch flex flex-col items-center relative shrink-0 w-full",children:y.jsx("div",{className:"flex flex-col font-['Lexend:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#1b1c1c] text-[28px] text-center whitespace-nowrap min-[390px]:text-[32px]",children:y.jsx("p",{className:"leading-9 min-[390px]:leading-[42px]",children:t("dailyCheckIn")})})}),y.jsx("div",{className:"content-stretch flex flex-col items-center relative shrink-0 w-full",children:y.jsx("div",{className:"flex flex-col font-['Lexend:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#414942] text-lg text-center whitespace-nowrap min-[390px]:text-[20px]",children:y.jsx("p",{className:"leading-6 min-[390px]:leading-[30px]",children:t("howAreYouToday")})})})]})}),y.jsx("div",{className:"content-stretch flex flex-col items-start pb-4 relative shrink-0 w-full min-[390px]:pb-6",children:y.jsxs("button",{onClick:e,className:"bg-[#4a7c59] content-stretch flex flex-col items-center justify-center py-5 relative rounded-[28px] shrink-0 w-full active:scale-95 transition-transform min-[390px]:rounded-[32px] min-[390px]:py-8",children:[y.jsx("div",{className:"absolute bg-[rgba(255,255,255,0)] inset-[0_0_-0.25px_0] rounded-[32px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"}),y.jsx("div",{className:"content-stretch flex flex-col items-start pb-2 relative shrink-0 min-[390px]:pb-3",children:y.jsx("div",{className:"relative shrink-0 size-10 min-[390px]:size-[48.75px]",children:y.jsx("svg",{className:"absolute block inset-0 size-full",fill:"none",preserveAspectRatio:"none",viewBox:"0 0 48.75 48.75",children:y.jsx("g",{id:"Container",opacity:"0.9",children:y.jsx("path",{d:Hu.p22515f80,fill:"var(--fill-0, #E1FFE5)",id:"Symbol"})})})})}),y.jsx("div",{className:"content-stretch flex flex-col items-center relative shrink-0",children:y.jsx("div",{className:"flex flex-col font-['Lexend:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#e1ffe5] text-[32px] text-center tracking-[1px] whitespace-nowrap min-[390px]:text-[40px]",children:y.jsx("p",{className:"leading-10 min-[390px]:leading-[60px]",children:t("iAmOk")})})})]})}),y.jsx("div",{className:"content-stretch flex flex-col items-start relative shrink-0 w-full",children:y.jsxs("div",{className:"content-stretch flex items-center justify-center relative shrink-0 w-full",children:[y.jsxs("button",{onClick:r,className:"bg-[#ba1a1a] content-stretch flex flex-col items-center justify-center relative rounded-[9999px] shrink-0 size-[clamp(212px,58vw,240px)] active:scale-95 transition-transform min-[390px]:size-[clamp(248px,68vw,292px)]",children:[y.jsx("div",{className:"-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(255,255,255,0)] left-1/2 rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-full top-1/2"}),y.jsx("div",{className:"content-stretch flex flex-col h-[120px] items-start pb-[8px] relative shrink-0 w-[112px] scale-75 min-[390px]:scale-100",children:y.jsxs("div",{className:"relative shrink-0 size-[112px]",children:[y.jsx("div",{className:"absolute bg-white bottom-0 h-[16px] left-0 right-0 rounded-[6px]"}),y.jsx("div",{className:"-translate-x-1/2 absolute bg-white bottom-[16px] h-[40px] left-1/2 rounded-tl-[9999px] rounded-tr-[9999px] w-[48px]"}),y.jsx("div",{className:"-translate-x-1/2 absolute bg-white h-[16px] left-1/2 rounded-[9999px] top-[8px] w-[8px]"}),y.jsx("div",{className:"absolute flex items-center justify-center left-[7.51px] size-[16.971px] top-[11.51px]",children:y.jsx("div",{className:"flex-none rotate-45",children:y.jsx("div",{className:"bg-white h-[8px] relative rounded-[9999px] w-[16px]"})})}),y.jsx("div",{className:"absolute flex items-center justify-center right-[7.52px] size-[16.971px] top-[11.52px]",children:y.jsx("div",{className:"-rotate-45 flex-none",children:y.jsx("div",{className:"bg-white h-[8px] relative rounded-[9999px] w-[16px]"})})})]})}),y.jsx("div",{className:"content-stretch flex flex-col items-start pt-[4px] relative shrink-0 min-[390px]:pt-[8px]",children:y.jsx("div",{className:"content-stretch drop-shadow-[0px_2px_1px_rgba(0,0,0,0.06),0px_4px_1.5px_rgba(0,0,0,0.07)] flex flex-col items-center relative shrink-0",children:y.jsx("div",{className:"flex flex-col font-['Lexend:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[42px] text-center text-white tracking-[4px] whitespace-nowrap min-[390px]:text-[52px] min-[390px]:tracking-[5.2px]",children:y.jsx("p",{className:"leading-[54px] min-[390px]:leading-[78px]",children:t("sosButton")})})})})]}),y.jsxs("button",{className:"absolute bg-white bottom-0 content-stretch flex items-center justify-center p-px right-[-4px] rounded-[9999px] size-12 active:scale-95 transition-transform min-[390px]:right-[-8px] min-[390px]:size-14",children:[y.jsx("div",{"aria-hidden":"true",className:"absolute border border-[#f0eded] border-solid inset-0 pointer-events-none rounded-[9999px]"}),y.jsx("div",{className:"absolute bg-[rgba(255,255,255,0)] bottom-0 right-0 rounded-[9999px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] size-[56px]"}),y.jsx("div",{className:"h-[21.75px] relative shrink-0 w-[15px]",children:y.jsx("svg",{className:"absolute block inset-0 size-full",fill:"none",preserveAspectRatio:"none",viewBox:"0 0 15 21.75",children:y.jsx("g",{id:"Container",children:y.jsx("path",{d:Hu.p1eb81b40,fill:"var(--fill-0, #944A00)",id:"Symbol"})})})})]})]})})]})})})]})}const Ku={p256e1340:"M10 1.667a8.333 8.333 0 1 0 0 16.666 8.333 8.333 0 0 0 0-16.666Zm.833 4.166a.833.833 0 0 0-1.666 0V10c0 .221.088.433.244.589l2.5 2.5a.833.833 0 1 0 1.178-1.178l-2.256-2.255V5.833Z",p8d35f80:"M1.333 0 19 8 1.333 16V9.778L12.333 8 1.333 6.222V0Z",p28843fc0:"M10 8.586 14.95 3.636a1 1 0 1 1 1.414 1.414L11.414 10l4.95 4.95a1 1 0 0 1-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 0 1-1.414-1.414L8.586 10l-4.95-4.95A1 1 0 0 1 5.05 3.636L10 8.586Z"};function OP({onConfirm:r,onCancel:e}){const{t}=Ri(),[s,o]=te.useState(15);return te.useEffect(()=>{if(s>0){const l=setTimeout(()=>o(s-1),1e3);return()=>clearTimeout(l)}e()},[s,e]),y.jsx("div",{className:"content-stretch flex flex-col items-start bg-[#fff4f2] pb-8 pt-5 relative size-full overflow-y-auto min-[390px]:pb-20 min-[390px]:pt-14",children:y.jsx("div",{className:"relative min-h-full w-full",children:y.jsx("div",{className:"flex min-h-full flex-col items-center justify-center overflow-clip rounded-[inherit] w-full",children:y.jsxs("div",{className:"content-stretch flex flex-col items-center justify-center bg-[#fff4f2] px-5 py-5 relative size-full min-[390px]:px-6 min-[390px]:py-8",children:[y.jsx("div",{className:"content-stretch flex flex-col items-start pb-5 relative shrink-0 min-[390px]:pb-8",children:y.jsxs("div",{className:"content-stretch flex items-center justify-center relative shrink-0",children:[y.jsx("div",{className:"absolute left-[-14px] top-[-14px] size-[168px] rounded-[9999px] bg-[#ba1a1a] animate-ping min-[390px]:left-[-16px] min-[390px]:top-[-16px] min-[390px]:size-[192px]"}),y.jsx("div",{className:"absolute left-[-14px] top-[-14px] size-[168px] rounded-[9999px] bg-[#ba1a1a] min-[390px]:left-[-16px] min-[390px]:top-[-16px] min-[390px]:size-[192px]"}),y.jsxs("div",{className:"bg-[#ba1a1a] content-stretch flex items-center justify-center p-1 relative rounded-[9999px] shrink-0 size-[140px] min-[390px]:size-[160px]",children:[y.jsx("div",{"aria-hidden":"true",className:"absolute border-4 border-[#fbf9f8] border-solid inset-0 pointer-events-none rounded-[9999px]"}),y.jsx("div",{className:"-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(255,255,255,0)] left-1/2 rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-full top-1/2"}),y.jsx("div",{className:"bg-white min-w-[88px] px-5 py-2 relative rounded-[12px] shrink-0",children:y.jsx("span",{className:"block font-['Lexend:SemiBold',sans-serif] font-semibold text-[#ba1a1a] text-[34px] leading-[40px] tracking-[6px] text-center",children:"SOS"})})]})]})}),y.jsx("div",{className:"content-stretch flex flex-col items-start pb-4 relative shrink-0 min-[390px]:pb-6",children:y.jsx("div",{className:"content-stretch flex flex-col gap-[8px] items-center relative shrink-0",children:y.jsx("div",{className:"content-stretch flex flex-col items-center relative shrink-0 w-full",children:y.jsxs("div",{className:"flex flex-col font-['Lexend:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#1b1c1c] text-[28px] text-center min-[390px]:text-[32px]",children:[y.jsx("p",{className:"mb-0 leading-9 min-[390px]:leading-[42px]",children:t("didYouMeanToSendSOS1")}),y.jsx("p",{className:"leading-9 min-[390px]:leading-[42px]",children:t("didYouMeanToSendSOS2")})]})})})}),y.jsx("div",{className:"content-stretch flex flex-col items-start max-w-[384px] pb-5 relative shrink-0 w-full min-[390px]:pb-8",children:y.jsx("div",{className:"bg-[#f0eded] max-w-[384px] relative rounded-[32px] shrink-0 w-full",children:y.jsx("div",{className:"flex flex-row items-center justify-center max-w-[inherit] size-full",children:y.jsxs("div",{className:"content-stretch flex gap-[8px] items-center justify-center max-w-[inherit] p-[8px] relative size-full",children:[y.jsx("div",{className:"relative shrink-0 size-[20px]",children:y.jsx("svg",{className:"absolute block inset-0 size-full",fill:"none",preserveAspectRatio:"none",viewBox:"0 0 20 20",children:y.jsx("g",{id:"Container",children:y.jsx("path",{d:Ku.p256e1340,fill:"#414942",id:"Icon"})})})}),y.jsx("div",{className:"content-stretch flex flex-col items-start relative shrink-0",children:y.jsx("div",{className:"flex flex-col font-['Lexend:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#1b1c1c] text-[20px] tracking-[0.4px] whitespace-nowrap",children:y.jsxs("p",{className:"leading-[24px]",children:[t("autoCancelIn")," ",s," ",t("seconds")]})})})]})})})}),y.jsx("div",{className:"content-stretch flex flex-col items-start justify-center max-w-[384px] min-h-[128px] relative shrink-0 w-full min-[390px]:h-[203px] min-[390px]:pt-[75px]",children:y.jsxs("div",{className:"content-stretch flex flex-col gap-[16px] items-start max-w-[384px] relative shrink-0 w-full",children:[y.jsxs("button",{onClick:r,className:"bg-[#ba1a1a] content-stretch drop-shadow-[0px_8px_10px_rgba(186,26,26,0.15)] flex gap-[7.99px] items-center justify-center min-h-[56px] pb-[16px] pt-[15.5px] relative rounded-[9999px] shrink-0 w-full active:scale-95 transition-transform",children:[y.jsx("div",{className:"h-[16px] relative shrink-0 w-[19px]",children:y.jsx("svg",{className:"absolute block inset-0 size-full",fill:"none",preserveAspectRatio:"none",viewBox:"0 0 19 16",children:y.jsx("g",{id:"Container",children:y.jsx("path",{d:Ku.p8d35f80,fill:"white",id:"Icon"})})})}),y.jsx("div",{className:"flex flex-col font-['Lexend:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[20px] text-center text-white tracking-[0.4px] whitespace-nowrap",children:y.jsx("p",{className:"leading-[24px]",children:t("SOS")})})]}),y.jsxs("button",{onClick:e,className:"bg-[#fbf9f8] content-stretch flex gap-[8px] items-center justify-center min-h-[56px] pb-[16px] pt-[15.5px] px-[2px] relative rounded-[9999px] shrink-0 w-full active:scale-95 transition-transform",children:[y.jsx("div",{"aria-hidden":"true",className:"absolute border-2 border-[#c1c9bf] border-solid inset-0 pointer-events-none rounded-[9999px]"}),y.jsx("div",{className:"relative shrink-0 size-[20px]",children:y.jsx("svg",{className:"absolute block inset-0 size-full",fill:"none",preserveAspectRatio:"none",viewBox:"0 0 20 20",children:y.jsx("g",{id:"Container",children:y.jsx("path",{d:Ku.p28843fc0,fill:"#1B1C1C",id:"Icon"})})})}),y.jsx("div",{className:"flex flex-col font-['Lexend:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#1b1c1c] text-[20px] text-center tracking-[0.4px] whitespace-nowrap",children:y.jsx("p",{className:"leading-[24px]",children:t("cancelSOS")})})]})]})})]})})})})}function LP({onLogout:r}){const{t:e}=Ri(),[t,s]=te.useState(()=>Dr.currentUser),o=(t==null?void 0:t.email)??"No email found",l=te.useMemo(()=>{var u,h;return(u=t==null?void 0:t.displayName)!=null&&u.trim()?t.displayName.trim():((h=t==null?void 0:t.email)==null?void 0:h.split("@")[0])||"My Profile"},[t]);return te.useEffect(()=>g_(Dr,s),[]),y.jsxs("div",{className:"h-full overflow-y-auto bg-gray-50",children:[y.jsxs("div",{className:"bg-gradient-to-br from-green-400 to-green-600 px-5 pb-5 pt-6 text-white min-[390px]:px-7 min-[390px]:pb-7 min-[390px]:pt-8",children:[y.jsxs("div",{className:"mb-4 flex items-center gap-4 min-[390px]:gap-5",children:[y.jsx("div",{className:"flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#316342] min-[390px]:h-20 min-[390px]:w-20",children:y.jsx(zs,{className:"h-8 w-8 min-[390px]:h-10 min-[390px]:w-10"})}),y.jsxs("div",{className:"min-w-0",children:[y.jsx("h2",{className:"truncate text-2xl font-bold min-[390px]:text-3xl",children:l}),y.jsx("p",{className:"mt-1 truncate text-sm text-green-100 min-[390px]:text-base",children:o})]})]}),y.jsx("button",{className:"rounded-full bg-white/20 px-5 py-2.5 text-base font-bold backdrop-blur transition-colors active:bg-white/30 min-[390px]:px-6 min-[390px]:py-3 min-[390px]:text-lg",children:e("editProfile")})]}),y.jsxs("div",{className:"space-y-5 p-5 min-[390px]:space-y-6 min-[390px]:p-8",children:[y.jsxs("div",{className:"overflow-hidden rounded-2xl bg-white shadow-sm",children:[y.jsx(Ns,{icon:y.jsx(zs,{className:"h-7 w-7 min-[390px]:h-8 min-[390px]:w-8"}),title:e("personalInfo")}),y.jsx(Ns,{icon:y.jsx(Us,{className:"h-7 w-7 min-[390px]:h-8 min-[390px]:w-8"}),title:e("notifications")}),y.jsx(Ns,{icon:y.jsx(Xx,{className:"h-7 w-7 min-[390px]:h-8 min-[390px]:w-8"}),title:e("privacySecurity")})]}),y.jsxs("div",{className:"overflow-hidden rounded-2xl bg-white shadow-sm",children:[y.jsx(Ns,{icon:y.jsx(Px,{className:"h-7 w-7 min-[390px]:h-8 min-[390px]:w-8"}),title:e("helpSupport")}),y.jsx(Ns,{icon:y.jsx(Bx,{className:"h-7 w-7 min-[390px]:h-8 min-[390px]:w-8"}),title:e("logOut"),textColor:"text-red-500",onClick:r})]})]})]})}function Ns({icon:r,title:e,textColor:t="text-gray-900",onClick:s}){return y.jsxs("button",{onClick:s,className:"flex w-full items-center gap-4 border-b border-gray-100 px-5 py-4 transition-colors last:border-b-0 active:bg-gray-50 min-[390px]:gap-6 min-[390px]:px-8 min-[390px]:py-6",children:[y.jsx("div",{className:"text-gray-600",children:r}),y.jsx("span",{className:`flex-1 text-left text-xl font-bold min-[390px]:text-2xl ${t}`,children:e}),y.jsx(wy,{className:"h-7 w-7 text-gray-400 min-[390px]:h-8 min-[390px]:w-8"})]})}const DP=r=>`careconnect.points.${r}`;function MP(){const[r,e]=te.useState(()=>Dr.currentUser),[t,s]=te.useState(0),o=te.useMemo(()=>{var l,u;return((l=r==null?void 0:r.displayName)==null?void 0:l.trim())||((u=r==null?void 0:r.email)==null?void 0:u.split("@")[0])||"User"},[r]);return te.useEffect(()=>g_(Dr,e),[]),te.useEffect(()=>{if(!r){s(0);return}const l=DP(r.uid);s(Number(localStorage.getItem(l))||0);const u=p=>{const{uid:m,points:v}=p.detail||{};m===r.uid&&s(Number(v)||0)};window.addEventListener("careconnect-points-updated",u);const h=n0(Sd(kd,`users/${r.uid}/points`),p=>{const m=Number(p.val());Number.isFinite(m)&&(s(m),localStorage.setItem(l,String(m)))},p=>{console.error("Unable to load points:",p),s(Number(localStorage.getItem(l))||0)});return()=>{window.removeEventListener("careconnect-points-updated",u),h()}},[r]),y.jsxs("div",{className:"h-full overflow-y-auto bg-[#fbf9f8] text-[#1b1c1c]",children:[y.jsx("header",{className:"sticky top-0 z-10 bg-[#fbf9f8] shadow-sm",children:y.jsxs("div",{className:"flex h-14 items-center justify-between px-5 min-[390px]:h-16 min-[390px]:px-6",children:[y.jsxs("div",{className:"flex items-center gap-2 text-[#316342]",children:[y.jsx(zs,{className:"h-6 w-6 fill-current min-[390px]:h-7 min-[390px]:w-7"}),y.jsx("span",{className:"text-xl font-bold min-[390px]:text-2xl",children:"CareConnect"})]}),y.jsx("button",{"aria-label":"Notifications",className:"flex h-10 w-10 items-center justify-center rounded-full text-[#414942] transition-colors active:scale-95 active:bg-[#e4e2e1] min-[390px]:h-12 min-[390px]:w-12",children:y.jsx(Us,{className:"h-6 w-6 min-[390px]:h-7 min-[390px]:w-7"})})]})}),y.jsxs("main",{className:"flex flex-col gap-5 px-5 py-5 min-[390px]:gap-8 min-[390px]:px-6 min-[390px]:py-8",children:[y.jsxs("section",{className:"flex flex-col items-center rounded-[28px] bg-[#f6f3f2] p-5 text-center shadow-[0_8px_20px_rgba(49,99,66,0.08)] min-[390px]:rounded-[32px] min-[390px]:p-6",children:[y.jsx("div",{className:"mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-[#ff9742] text-[#6c3400] min-[390px]:mb-4 min-[390px]:h-32 min-[390px]:w-32",children:y.jsx(zs,{className:"h-12 w-12 fill-current min-[390px]:h-16 min-[390px]:w-16"})}),y.jsxs("div",{className:"mb-2 flex items-center justify-center gap-2",children:[y.jsx(nS,{className:"h-8 w-8 fill-[#ff9742] text-[#ff9742] min-[390px]:h-10 min-[390px]:w-10"}),y.jsxs("h1",{className:"text-[32px] font-bold leading-10 text-[#316342] min-[390px]:text-[40px] min-[390px]:leading-[52px]",children:[t," Points"]})]}),y.jsxs("p",{className:"text-base leading-6 text-[#414942] min-[390px]:text-lg min-[390px]:leading-7",children:["Great job, ",o,"! Keep staying active to earn more."]})]}),y.jsxs("section",{className:"flex items-center justify-between rounded-[28px] bg-[#4a7c59] p-4 shadow-[0_8px_20px_rgba(49,99,66,0.08)] min-[390px]:rounded-[32px] min-[390px]:p-6",children:[y.jsxs("div",{className:"flex items-center gap-3 text-[#e1ffe5] min-[390px]:gap-4",children:[y.jsx(_x,{className:"h-8 w-8 fill-current min-[390px]:h-9 min-[390px]:w-9"}),y.jsxs("div",{children:[y.jsx("h2",{className:"text-lg font-semibold leading-6 min-[390px]:text-xl",children:"Daily Check-in"}),y.jsx("p",{className:"text-base leading-6 opacity-90 min-[390px]:text-lg min-[390px]:leading-7",children:"Log in today"})]})]}),y.jsx("div",{className:"rounded-full bg-[#e1ffe5] px-3 py-2 text-lg font-semibold text-[#4a7c59] shadow-sm min-[390px]:px-4 min-[390px]:text-xl",children:"+5"})]}),y.jsxs("section",{children:[y.jsx("h2",{className:"mb-3 text-xl font-semibold leading-7 text-[#1b1c1c] min-[390px]:mb-4 min-[390px]:text-2xl min-[390px]:leading-8",children:"Redeem Rewards"}),y.jsxs("div",{className:"flex flex-col gap-4",children:[y.jsx(yy,{icon:y.jsx(eS,{className:"h-8 w-8"}),title:"$5 NTUC Voucher",cost:50,userPoints:t}),y.jsx(yy,{icon:y.jsx(wx,{className:"h-8 w-8"}),title:"$10 Grab Voucher",cost:100,userPoints:t})]})]})]})]})}function yy({icon:r,title:e,cost:t,userPoints:s}){const o=s>=t;return y.jsxs("div",{className:`flex items-center rounded-[32px] p-4 shadow-[0_8px_20px_rgba(49,99,66,0.08)] transition-colors ${o?"bg-[#f0eded]":"bg-gray-100 opacity-70"}`,children:[y.jsx("div",{className:`mr-3 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl min-[390px]:mr-4 min-[390px]:h-16 min-[390px]:w-16 ${o?"bg-[#fbf9f8] text-[#316342]":"bg-gray-200 text-gray-400"}`,children:r}),y.jsxs("div",{className:"min-w-0 flex-1",children:[y.jsx("h3",{className:`text-lg font-semibold leading-6 min-[390px]:text-xl ${o?"text-[#1b1c1c]":"text-gray-500"}`,children:e}),y.jsxs("p",{className:`mt-1 text-base font-bold leading-5 ${o?"text-[#316342]":"text-gray-400"}`,children:[t," Points"]})]}),y.jsxs("button",{disabled:!o,className:`flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold leading-5 shadow-sm transition-transform min-[390px]:px-5 min-[390px]:py-3 min-[390px]:text-base ${o?"bg-[#316342] text-white active:scale-95":"cursor-not-allowed bg-gray-300 text-gray-500"}`,children:[o?y.jsx(xy,{className:"h-4 w-4"}):y.jsx(qu,{className:"h-4 w-4"}),"REDEEM"]})]})}function jP(){const[r,e]=te.useState(!1);return y.jsxs("div",{className:"h-full overflow-y-auto bg-[#fafafa] px-5 pb-6 pt-5 text-gray-900 min-[390px]:px-6 min-[390px]:pb-8 min-[390px]:pt-8",children:[y.jsxs("header",{className:"mb-5 flex items-start justify-between min-[390px]:mb-8",children:[y.jsxs("div",{children:[y.jsx("h1",{className:"mb-1 text-2xl font-bold leading-tight tracking-tight min-[390px]:text-[26px]",children:"Medication Reminder"}),y.jsx("p",{className:"text-sm font-medium text-gray-500 min-[390px]:text-[15px]",children:"Never miss a dose."})]}),y.jsxs("button",{"aria-label":"Notifications",className:"relative mt-1 rounded-full p-2 text-[#ff4400] transition-colors active:scale-95 active:bg-[#fff0ea]",children:[y.jsx(Us,{className:"h-6 w-6 min-[390px]:h-7 min-[390px]:w-7"}),y.jsx("span",{className:"absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#ff4400]"})]})]}),y.jsxs("section",{className:"mb-5 rounded-[24px] border border-gray-100 bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] min-[390px]:mb-8 min-[390px]:p-5",children:[y.jsxs("div",{className:"mb-4 flex items-center justify-between min-[390px]:mb-5",children:[y.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Next dose"}),y.jsxs("div",{className:"flex items-center gap-1.5 rounded-full bg-[#e8f5e9] px-3 py-1.5",children:[y.jsx(xy,{className:"h-4 w-4 text-[#2e8b57]"}),y.jsx("span",{className:"text-sm font-medium text-[#2e8b57]",children:r?"Taken":"On time"})]})]}),y.jsxs("div",{className:"flex items-center gap-4 min-[390px]:gap-5",children:[y.jsxs("div",{className:"relative flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-50 min-[390px]:h-24 min-[390px]:w-24",children:[y.jsxs("div",{className:"relative flex h-14 w-10 flex-col rounded-b-md rounded-t-lg border border-gray-200 bg-white shadow-sm min-[390px]:h-16 min-[390px]:w-12",children:[y.jsx("div",{className:"h-4 w-full rounded-t-lg bg-gray-200"}),y.jsx("div",{className:"mt-1 flex flex-1 items-center justify-center bg-[#ff4400]",children:y.jsx(Sy,{className:"h-5 w-5 text-white"})})]}),y.jsx("div",{className:"absolute bottom-4 right-4 h-6 w-6 rounded-full border border-gray-200 bg-white shadow"}),y.jsx("div",{className:"absolute bottom-2 right-2 h-6 w-6 rounded-full border border-gray-200 bg-white shadow"})]}),y.jsxs("div",{className:"min-w-0 flex-1",children:[y.jsx("h3",{className:"mb-1 text-lg font-bold leading-tight text-gray-900 min-[390px]:text-[20px]",children:"Atorvastatin 20mg"}),y.jsx("p",{className:"mb-3 text-sm font-medium text-gray-500",children:"1 tablet - Once daily"}),y.jsxs("div",{className:"flex items-center gap-2",children:[y.jsx(Lx,{className:"h-5 w-5 text-[#ff4400]"}),y.jsx("span",{className:"text-base font-bold tracking-tight text-[#ff4400] min-[390px]:text-[18px]",children:"5:45 PM"})]})]})]})]}),y.jsxs("section",{className:"space-y-4",children:[y.jsxs("button",{className:"flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ff4400] py-3.5 text-base font-semibold text-white shadow-sm transition-colors active:scale-95 active:bg-orange-600 min-[390px]:py-4 min-[390px]:text-[17px]",children:[y.jsx(Us,{className:"h-5 w-5"}),y.jsx("span",{children:"Snooze 15 minutes"})]}),y.jsx("button",{onClick:()=>e(!0),className:"w-full rounded-2xl border border-[#ff4400] bg-white py-3.5 text-base font-semibold text-[#ff4400] shadow-sm transition-colors active:scale-95 active:bg-orange-50 min-[390px]:py-4 min-[390px]:text-[17px]",children:"I've taken this dose"})]})]})}function FP({onBack:r}){const[e,t]=te.useState(""),[s,o]=te.useState(""),[l,u]=te.useState("Next-of-Kin"),[h,p]=te.useState(!1),m=v=>{v.preventDefault(),alert("Caregiver registration completed.")};return y.jsxs("div",{className:"h-full overflow-y-auto bg-[#fbf9f8] text-[#1b1c1c]",children:[y.jsxs("header",{className:"sticky top-0 z-10 flex h-14 items-center justify-between bg-[#fbf9f8] px-4 shadow-sm min-[390px]:h-16 min-[390px]:px-6",children:[y.jsx("button",{type:"button",onClick:r,className:"flex h-12 w-12 items-center justify-center text-[#174b2c] transition-transform active:scale-95 min-[390px]:h-14 min-[390px]:w-14","aria-label":"Back",children:y.jsx(fx,{className:"h-6 w-6 min-[390px]:h-7 min-[390px]:w-7"})}),y.jsx("h1",{className:"text-xl font-bold text-[#174b2c] min-[390px]:text-2xl",children:"Care Portal"}),y.jsx("button",{type:"button",className:"flex h-12 w-12 items-center justify-center text-[#414942] transition-transform active:scale-95 min-[390px]:h-14 min-[390px]:w-14","aria-label":"Notifications",children:y.jsx(Us,{className:"h-6 w-6 min-[390px]:h-7 min-[390px]:w-7"})})]}),y.jsxs("form",{onSubmit:m,className:"flex flex-col gap-5 px-5 pb-8 pt-5 min-[390px]:gap-8 min-[390px]:px-6 min-[390px]:pb-12 min-[390px]:pt-8",children:[y.jsxs("section",{className:"flex flex-col gap-3 min-[390px]:gap-4",children:[y.jsx(Gu,{title:"Find Your Senior"}),y.jsx("p",{className:"text-base leading-6 text-[#414942] min-[390px]:text-lg min-[390px]:leading-7",children:"Search for the senior you want to connect with."}),y.jsx(_y,{icon:y.jsx(Qx,{className:"h-6 w-6 min-[390px]:h-7 min-[390px]:w-7"}),label:"Search by Name",placeholder:"Search by name",value:e,onChange:t}),y.jsxs("div",{className:"flex items-center gap-4 py-1",children:[y.jsx("div",{className:"flex-1 h-px bg-[#c1c9bf]"}),y.jsx("span",{className:"text-base font-medium text-[#717971] italic",children:"or"}),y.jsx("div",{className:"flex-1 h-px bg-[#c1c9bf]"})]}),y.jsx(_y,{icon:y.jsx(Gx,{className:"h-6 w-6 min-[390px]:h-7 min-[390px]:w-7"}),label:"Search by Phone Number",placeholder:"Enter senior's phone number",type:"tel",value:s,onChange:o})]}),y.jsxs("section",{className:"flex flex-col gap-3 min-[390px]:gap-4",children:[y.jsx(Gu,{title:"Your Relationship"}),y.jsxs("label",{className:"flex flex-col gap-2",children:[y.jsx("span",{className:"text-base font-semibold text-[#1b1c1c] ml-2",children:"Select Relationship"}),y.jsxs("div",{className:"relative flex h-14 items-center rounded-2xl bg-[#f5f3f3] px-4 focus-within:ring-2 focus-within:ring-[#174b2c] min-[390px]:h-16",children:[y.jsx(aS,{className:"mr-3 h-6 w-6 text-[#717971] min-[390px]:h-7 min-[390px]:w-7"}),y.jsxs("select",{value:l,onChange:v=>u(v.target.value),className:"w-full appearance-none border-none bg-transparent text-lg text-[#1b1c1c] outline-none focus:ring-0 min-[390px]:text-xl",children:[y.jsx("option",{children:"Next-of-Kin"}),y.jsx("option",{children:"Family Member"}),y.jsx("option",{children:"Caregiver"}),y.jsx("option",{children:"Helper"})]}),y.jsx(Cx,{className:"pointer-events-none h-6 w-6 text-[#717971] min-[390px]:h-7 min-[390px]:w-7"})]})]})]}),y.jsxs("section",{className:"flex flex-col gap-3 min-[390px]:gap-4",children:[y.jsx(Gu,{title:"Confirmation"}),y.jsxs("label",{className:"flex cursor-pointer gap-3 rounded-2xl border border-[#c1c9bf]/50 bg-white p-4 shadow-sm transition-transform active:scale-[0.99] min-[390px]:gap-4 min-[390px]:p-6",children:[y.jsx("input",{type:"checkbox",className:"sr-only",checked:h,onChange:v=>p(v.target.checked)}),h?y.jsx(Tx,{className:"h-7 w-7 flex-shrink-0 fill-[#174b2c] text-[#174b2c] min-[390px]:h-8 min-[390px]:w-8"}):y.jsx(Ax,{className:"h-7 w-7 flex-shrink-0 text-[#717971] min-[390px]:h-8 min-[390px]:w-8"}),y.jsxs("span",{className:"text-sm font-medium leading-6 text-[#414942] min-[390px]:text-base min-[390px]:leading-7",children:["I confirm that I have the legal authority to register this senior and agree to CareConnect's ",y.jsx("span",{className:"text-[#174b2c] font-bold underline",children:"Privacy Policy"})," ","and ",y.jsx("span",{className:"text-[#174b2c] font-bold underline",children:"Terms of Service"}),"."]})]})]}),y.jsx("button",{type:"submit",disabled:!h,className:"flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#174b2c] text-lg font-bold text-white shadow-md transition-transform active:scale-95 min-[390px]:h-16 min-[390px]:text-xl",children:"Complete"})]})]})}function Gu({title:r}){return y.jsxs("div",{className:"flex items-center gap-3",children:[y.jsx("div",{className:"h-7 w-1 rounded-full bg-[#fd8a2a] min-[390px]:h-8"}),y.jsx("h2",{className:"text-xl font-bold text-[#174b2c] min-[390px]:text-2xl",children:r})]})}function _y({icon:r,label:e,placeholder:t,type:s="text",value:o,onChange:l}){return y.jsxs("label",{className:"flex flex-col gap-2",children:[y.jsx("span",{className:"text-base font-semibold text-[#1b1c1c] ml-2",children:e}),y.jsxs("div",{className:"relative flex h-14 items-center rounded-2xl bg-[#f5f3f3] px-4 focus-within:ring-2 focus-within:ring-[#174b2c] min-[390px]:h-16",children:[y.jsx("div",{className:"text-[#717971] mr-3",children:r}),y.jsx("input",{type:s,value:o,onChange:u=>l(u.target.value),placeholder:t,className:"w-full border-none bg-transparent text-lg outline-none placeholder:text-[#9ca39c] focus:ring-0 min-[390px]:text-xl"})]})]})}const UP=r=>`careconnect.points.${r}`;function zP(){const{t:r}=Ri(),[e,t]=te.useState("welcome"),[s,o]=te.useState(!1),l=()=>{alert("Emergency contacts have been notified!"),o(!1)},u=async()=>{var _,x;const m=Dr.currentUser;if(!m){alert("Please log in again before checking in."),t("welcome");return}const v=Sd(kd,`users/${m.uid}/points`);try{await NP(v,I=>(Number(I)||0)+5),fP(Sd(kd,`users/${m.uid}/profile`),{email:m.email,name:((_=m.displayName)==null?void 0:_.trim())||((x=m.email)==null?void 0:x.split("@")[0])||"User",lastCheckInAt:IP()}).catch(I=>{console.warn("Profile metadata update failed:",I)}),t("points")}catch(I){console.error("Check-in failed:",I);const N=UP(m.uid),b=(Number(localStorage.getItem(N))||0)+5;localStorage.setItem(N,String(b)),window.dispatchEvent(new CustomEvent("careconnect-points-updated",{detail:{uid:m.uid,points:b}})),t("points")}},h=async()=>{try{await bC(Dr),t("welcome")}catch(m){console.error("Logout failed:",m),alert("Unable to log out. Please try again.")}},p=()=>{switch(e){case"welcome":return y.jsx(PP,{onGetStarted:()=>t("language"),onCaregiverLogin:()=>t("carePortal")});case"language":return y.jsx(bP,{onContinue:()=>t("home")});case"home":return y.jsx(gy,{onSOSClick:()=>o(!0),onCheckIn:u});case"profile":return y.jsx(LP,{onLogout:h});case"points":return y.jsx(MP,{});case"medication":return y.jsx(jP,{});case"carePortal":return y.jsx(FP,{onBack:()=>t("welcome")});default:return y.jsx(gy,{onSOSClick:()=>o(!0),onCheckIn:u})}};return y.jsx("div",{className:"h-[100dvh] w-full overflow-hidden bg-gray-100 min-[415px]:flex min-[415px]:items-center min-[415px]:justify-center",children:y.jsxs("div",{className:"mx-auto flex h-full max-h-[896px] min-h-0 w-full max-w-[414px] flex-col bg-white shadow-2xl min-[415px]:rounded-[2px] relative",children:[y.jsx("div",{className:"flex-1 overflow-hidden",children:p()}),e!=="welcome"&&e!=="language"&&e!=="carePortal"&&y.jsxs("nav",{className:"shrink-0 bg-white border-t-2 border-gray-200 px-2 py-2 flex justify-around items-center",children:[y.jsx(ka,{icon:y.jsx(zx,{className:"h-7 w-7 min-[390px]:h-9 min-[390px]:w-9"}),label:r("home"),active:e==="home",onClick:()=>t("home")}),y.jsx(ka,{icon:y.jsx(Sy,{className:"h-7 w-7 min-[390px]:h-9 min-[390px]:w-9"}),label:r("meds"),active:e==="medication",onClick:()=>t("medication")}),y.jsx(ka,{icon:y.jsx(iS,{className:"h-7 w-7 min-[390px]:h-9 min-[390px]:w-9"}),label:r("points"),active:e==="points",onClick:()=>t("points")}),y.jsx(ka,{icon:y.jsx(zs,{className:"h-7 w-7 min-[390px]:h-9 min-[390px]:w-9"}),label:r("profile"),active:e==="profile",onClick:()=>t("profile")})]}),s&&y.jsx("div",{className:"absolute inset-0 z-50 bg-white",children:y.jsx(OP,{onConfirm:l,onCancel:()=>o(!1)})})]})})}function ka({icon:r,label:e,active:t,onClick:s}){return y.jsxs("button",{onClick:s,className:`flex min-w-[72px] flex-col items-center gap-1 rounded-lg px-1 py-2 transition-colors active:scale-95 min-[390px]:gap-2 min-[390px]:px-2 ${t?"text-green-600":"text-gray-400"}`,children:[r,y.jsx("span",{className:"text-sm font-bold min-[390px]:text-base",children:e})]})}ax.createRoot(document.getElementById("root")).render(y.jsx(zP,{}));
