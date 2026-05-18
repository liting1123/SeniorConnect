(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function t(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(o){if(o.ep)return;o.ep=!0;const l=t(o);fetch(o.href,l)}})();var Kc={exports:{}},ps={},Gc={exports:{}},ie={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ap;function uw(){if(Ap)return ie;Ap=1;var r=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),u=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),_=Symbol.iterator;function x(k){return k===null||typeof k!="object"?null:(k=_&&k[_]||k["@@iterator"],typeof k=="function"?k:null)}var R={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},T=Object.assign,L={};function U(k,P,X){this.props=k,this.context=P,this.refs=L,this.updater=X||R}U.prototype.isReactComponent={},U.prototype.setState=function(k,P){if(typeof k!="object"&&typeof k!="function"&&k!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,k,P,"setState")},U.prototype.forceUpdate=function(k){this.updater.enqueueForceUpdate(this,k,"forceUpdate")};function ge(){}ge.prototype=U.prototype;function ce(k,P,X){this.props=k,this.context=P,this.refs=L,this.updater=X||R}var fe=ce.prototype=new ge;fe.constructor=ce,T(fe,U.prototype),fe.isPureReactComponent=!0;var ee=Array.isArray,Ce=Object.prototype.hasOwnProperty,De={current:null},Ie={key:!0,ref:!0,__self:!0,__source:!0};function Ve(k,P,X){var te,oe={},pe=null,Te=null;if(P!=null)for(te in P.ref!==void 0&&(Te=P.ref),P.key!==void 0&&(pe=""+P.key),P)Ce.call(P,te)&&!Ie.hasOwnProperty(te)&&(oe[te]=P[te]);var we=arguments.length-2;if(we===1)oe.children=X;else if(1<we){for(var Me=Array(we),St=0;St<we;St++)Me[St]=arguments[St+2];oe.children=Me}if(k&&k.defaultProps)for(te in we=k.defaultProps,we)oe[te]===void 0&&(oe[te]=we[te]);return{$$typeof:r,type:k,key:pe,ref:Te,props:oe,_owner:De.current}}function Re(k,P){return{$$typeof:r,type:k.type,key:P,ref:k.ref,props:k.props,_owner:k._owner}}function ye(k){return typeof k=="object"&&k!==null&&k.$$typeof===r}function Rt(k){var P={"=":"=0",":":"=2"};return"$"+k.replace(/[=:]/g,function(X){return P[X]})}var ne=/\/+/g;function q(k,P){return typeof k=="object"&&k!==null&&k.key!=null?Rt(""+k.key):P.toString(36)}function Z(k,P,X,te,oe){var pe=typeof k;(pe==="undefined"||pe==="boolean")&&(k=null);var Te=!1;if(k===null)Te=!0;else switch(pe){case"string":case"number":Te=!0;break;case"object":switch(k.$$typeof){case r:case e:Te=!0}}if(Te)return Te=k,oe=oe(Te),k=te===""?"."+q(Te,0):te,ee(oe)?(X="",k!=null&&(X=k.replace(ne,"$&/")+"/"),Z(oe,P,X,"",function(St){return St})):oe!=null&&(ye(oe)&&(oe=Re(oe,X+(!oe.key||Te&&Te.key===oe.key?"":(""+oe.key).replace(ne,"$&/")+"/")+k)),P.push(oe)),1;if(Te=0,te=te===""?".":te+":",ee(k))for(var we=0;we<k.length;we++){pe=k[we];var Me=te+q(pe,we);Te+=Z(pe,P,X,Me,oe)}else if(Me=x(k),typeof Me=="function")for(k=Me.call(k),we=0;!(pe=k.next()).done;)pe=pe.value,Me=te+q(pe,we++),Te+=Z(pe,P,X,Me,oe);else if(pe==="object")throw P=String(k),Error("Objects are not valid as a React child (found: "+(P==="[object Object]"?"object with keys {"+Object.keys(k).join(", ")+"}":P)+"). If you meant to render a collection of children, use an array instead.");return Te}function ve(k,P,X){if(k==null)return k;var te=[],oe=0;return Z(k,te,"","",function(pe){return P.call(X,pe,oe++)}),te}function se(k){if(k._status===-1){var P=k._result;P=P(),P.then(function(X){(k._status===0||k._status===-1)&&(k._status=1,k._result=X)},function(X){(k._status===0||k._status===-1)&&(k._status=2,k._result=X)}),k._status===-1&&(k._status=0,k._result=P)}if(k._status===1)return k._result.default;throw k._result}var re={current:null},M={transition:null},W={ReactCurrentDispatcher:re,ReactCurrentBatchConfig:M,ReactCurrentOwner:De};function z(){throw Error("act(...) is not supported in production builds of React.")}return ie.Children={map:ve,forEach:function(k,P,X){ve(k,function(){P.apply(this,arguments)},X)},count:function(k){var P=0;return ve(k,function(){P++}),P},toArray:function(k){return ve(k,function(P){return P})||[]},only:function(k){if(!ye(k))throw Error("React.Children.only expected to receive a single React element child.");return k}},ie.Component=U,ie.Fragment=t,ie.Profiler=o,ie.PureComponent=ce,ie.StrictMode=s,ie.Suspense=p,ie.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=W,ie.act=z,ie.cloneElement=function(k,P,X){if(k==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+k+".");var te=T({},k.props),oe=k.key,pe=k.ref,Te=k._owner;if(P!=null){if(P.ref!==void 0&&(pe=P.ref,Te=De.current),P.key!==void 0&&(oe=""+P.key),k.type&&k.type.defaultProps)var we=k.type.defaultProps;for(Me in P)Ce.call(P,Me)&&!Ie.hasOwnProperty(Me)&&(te[Me]=P[Me]===void 0&&we!==void 0?we[Me]:P[Me])}var Me=arguments.length-2;if(Me===1)te.children=X;else if(1<Me){we=Array(Me);for(var St=0;St<Me;St++)we[St]=arguments[St+2];te.children=we}return{$$typeof:r,type:k.type,key:oe,ref:pe,props:te,_owner:Te}},ie.createContext=function(k){return k={$$typeof:u,_currentValue:k,_currentValue2:k,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},k.Provider={$$typeof:l,_context:k},k.Consumer=k},ie.createElement=Ve,ie.createFactory=function(k){var P=Ve.bind(null,k);return P.type=k,P},ie.createRef=function(){return{current:null}},ie.forwardRef=function(k){return{$$typeof:h,render:k}},ie.isValidElement=ye,ie.lazy=function(k){return{$$typeof:v,_payload:{_status:-1,_result:k},_init:se}},ie.memo=function(k,P){return{$$typeof:m,type:k,compare:P===void 0?null:P}},ie.startTransition=function(k){var P=M.transition;M.transition={};try{k()}finally{M.transition=P}},ie.unstable_act=z,ie.useCallback=function(k,P){return re.current.useCallback(k,P)},ie.useContext=function(k){return re.current.useContext(k)},ie.useDebugValue=function(){},ie.useDeferredValue=function(k){return re.current.useDeferredValue(k)},ie.useEffect=function(k,P){return re.current.useEffect(k,P)},ie.useId=function(){return re.current.useId()},ie.useImperativeHandle=function(k,P,X){return re.current.useImperativeHandle(k,P,X)},ie.useInsertionEffect=function(k,P){return re.current.useInsertionEffect(k,P)},ie.useLayoutEffect=function(k,P){return re.current.useLayoutEffect(k,P)},ie.useMemo=function(k,P){return re.current.useMemo(k,P)},ie.useReducer=function(k,P,X){return re.current.useReducer(k,P,X)},ie.useRef=function(k){return re.current.useRef(k)},ie.useState=function(k){return re.current.useState(k)},ie.useSyncExternalStore=function(k,P,X){return re.current.useSyncExternalStore(k,P,X)},ie.useTransition=function(){return re.current.useTransition()},ie.version="18.3.1",ie}var Op;function Fa(){return Op||(Op=1,Gc.exports=uw()),Gc.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Lp;function dw(){if(Lp)return ps;Lp=1;var r=Fa(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,o=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function u(h,p,m){var v,_={},x=null,R=null;m!==void 0&&(x=""+m),p.key!==void 0&&(x=""+p.key),p.ref!==void 0&&(R=p.ref);for(v in p)s.call(p,v)&&!l.hasOwnProperty(v)&&(_[v]=p[v]);if(h&&h.defaultProps)for(v in p=h.defaultProps,p)_[v]===void 0&&(_[v]=p[v]);return{$$typeof:e,type:h,key:x,ref:R,props:_,_owner:o.current}}return ps.Fragment=t,ps.jsx=u,ps.jsxs=u,ps}var Dp;function hw(){return Dp||(Dp=1,Kc.exports=dw()),Kc.exports}var y=hw(),ia={},qc={exports:{}},vt={},Yc={exports:{}},Qc={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Mp;function fw(){return Mp||(Mp=1,(function(r){function e(M,W){var z=M.length;M.push(W);e:for(;0<z;){var k=z-1>>>1,P=M[k];if(0<o(P,W))M[k]=W,M[z]=P,z=k;else break e}}function t(M){return M.length===0?null:M[0]}function s(M){if(M.length===0)return null;var W=M[0],z=M.pop();if(z!==W){M[0]=z;e:for(var k=0,P=M.length,X=P>>>1;k<X;){var te=2*(k+1)-1,oe=M[te],pe=te+1,Te=M[pe];if(0>o(oe,z))pe<P&&0>o(Te,oe)?(M[k]=Te,M[pe]=z,k=pe):(M[k]=oe,M[te]=z,k=te);else if(pe<P&&0>o(Te,z))M[k]=Te,M[pe]=z,k=pe;else break e}}return W}function o(M,W){var z=M.sortIndex-W.sortIndex;return z!==0?z:M.id-W.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;r.unstable_now=function(){return l.now()}}else{var u=Date,h=u.now();r.unstable_now=function(){return u.now()-h}}var p=[],m=[],v=1,_=null,x=3,R=!1,T=!1,L=!1,U=typeof setTimeout=="function"?setTimeout:null,ge=typeof clearTimeout=="function"?clearTimeout:null,ce=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function fe(M){for(var W=t(m);W!==null;){if(W.callback===null)s(m);else if(W.startTime<=M)s(m),W.sortIndex=W.expirationTime,e(p,W);else break;W=t(m)}}function ee(M){if(L=!1,fe(M),!T)if(t(p)!==null)T=!0,se(Ce);else{var W=t(m);W!==null&&re(ee,W.startTime-M)}}function Ce(M,W){T=!1,L&&(L=!1,ge(Ve),Ve=-1),R=!0;var z=x;try{for(fe(W),_=t(p);_!==null&&(!(_.expirationTime>W)||M&&!Rt());){var k=_.callback;if(typeof k=="function"){_.callback=null,x=_.priorityLevel;var P=k(_.expirationTime<=W);W=r.unstable_now(),typeof P=="function"?_.callback=P:_===t(p)&&s(p),fe(W)}else s(p);_=t(p)}if(_!==null)var X=!0;else{var te=t(m);te!==null&&re(ee,te.startTime-W),X=!1}return X}finally{_=null,x=z,R=!1}}var De=!1,Ie=null,Ve=-1,Re=5,ye=-1;function Rt(){return!(r.unstable_now()-ye<Re)}function ne(){if(Ie!==null){var M=r.unstable_now();ye=M;var W=!0;try{W=Ie(!0,M)}finally{W?q():(De=!1,Ie=null)}}else De=!1}var q;if(typeof ce=="function")q=function(){ce(ne)};else if(typeof MessageChannel<"u"){var Z=new MessageChannel,ve=Z.port2;Z.port1.onmessage=ne,q=function(){ve.postMessage(null)}}else q=function(){U(ne,0)};function se(M){Ie=M,De||(De=!0,q())}function re(M,W){Ve=U(function(){M(r.unstable_now())},W)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(M){M.callback=null},r.unstable_continueExecution=function(){T||R||(T=!0,se(Ce))},r.unstable_forceFrameRate=function(M){0>M||125<M?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Re=0<M?Math.floor(1e3/M):5},r.unstable_getCurrentPriorityLevel=function(){return x},r.unstable_getFirstCallbackNode=function(){return t(p)},r.unstable_next=function(M){switch(x){case 1:case 2:case 3:var W=3;break;default:W=x}var z=x;x=W;try{return M()}finally{x=z}},r.unstable_pauseExecution=function(){},r.unstable_requestPaint=function(){},r.unstable_runWithPriority=function(M,W){switch(M){case 1:case 2:case 3:case 4:case 5:break;default:M=3}var z=x;x=M;try{return W()}finally{x=z}},r.unstable_scheduleCallback=function(M,W,z){var k=r.unstable_now();switch(typeof z=="object"&&z!==null?(z=z.delay,z=typeof z=="number"&&0<z?k+z:k):z=k,M){case 1:var P=-1;break;case 2:P=250;break;case 5:P=1073741823;break;case 4:P=1e4;break;default:P=5e3}return P=z+P,M={id:v++,callback:W,priorityLevel:M,startTime:z,expirationTime:P,sortIndex:-1},z>k?(M.sortIndex=z,e(m,M),t(p)===null&&M===t(m)&&(L?(ge(Ve),Ve=-1):L=!0,re(ee,z-k))):(M.sortIndex=P,e(p,M),T||R||(T=!0,se(Ce))),M},r.unstable_shouldYield=Rt,r.unstable_wrapCallback=function(M){var W=x;return function(){var z=x;x=W;try{return M.apply(this,arguments)}finally{x=z}}}})(Qc)),Qc}var jp;function pw(){return jp||(jp=1,Yc.exports=fw()),Yc.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fp;function mw(){if(Fp)return vt;Fp=1;var r=Fa(),e=pw();function t(n){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+n,a=1;a<arguments.length;a++)i+="&args[]="+encodeURIComponent(arguments[a]);return"Minified React error #"+n+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var s=new Set,o={};function l(n,i){u(n,i),u(n+"Capture",i)}function u(n,i){for(o[n]=i,n=0;n<i.length;n++)s.add(i[n])}var h=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),p=Object.prototype.hasOwnProperty,m=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,v={},_={};function x(n){return p.call(_,n)?!0:p.call(v,n)?!1:m.test(n)?_[n]=!0:(v[n]=!0,!1)}function R(n,i,a,c){if(a!==null&&a.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return c?!1:a!==null?!a.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function T(n,i,a,c){if(i===null||typeof i>"u"||R(n,i,a,c))return!0;if(c)return!1;if(a!==null)switch(a.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function L(n,i,a,c,d,f,g){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=c,this.attributeNamespace=d,this.mustUseProperty=a,this.propertyName=n,this.type=i,this.sanitizeURL=f,this.removeEmptyString=g}var U={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){U[n]=new L(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var i=n[0];U[i]=new L(i,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){U[n]=new L(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){U[n]=new L(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){U[n]=new L(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){U[n]=new L(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){U[n]=new L(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){U[n]=new L(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){U[n]=new L(n,5,!1,n.toLowerCase(),null,!1,!1)});var ge=/[\-:]([a-z])/g;function ce(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var i=n.replace(ge,ce);U[i]=new L(i,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var i=n.replace(ge,ce);U[i]=new L(i,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var i=n.replace(ge,ce);U[i]=new L(i,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){U[n]=new L(n,1,!1,n.toLowerCase(),null,!1,!1)}),U.xlinkHref=new L("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){U[n]=new L(n,1,!1,n.toLowerCase(),null,!0,!0)});function fe(n,i,a,c){var d=U.hasOwnProperty(i)?U[i]:null;(d!==null?d.type!==0:c||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(T(i,a,d,c)&&(a=null),c||d===null?x(i)&&(a===null?n.removeAttribute(i):n.setAttribute(i,""+a)):d.mustUseProperty?n[d.propertyName]=a===null?d.type===3?!1:"":a:(i=d.attributeName,c=d.attributeNamespace,a===null?n.removeAttribute(i):(d=d.type,a=d===3||d===4&&a===!0?"":""+a,c?n.setAttributeNS(c,i,a):n.setAttribute(i,a))))}var ee=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ce=Symbol.for("react.element"),De=Symbol.for("react.portal"),Ie=Symbol.for("react.fragment"),Ve=Symbol.for("react.strict_mode"),Re=Symbol.for("react.profiler"),ye=Symbol.for("react.provider"),Rt=Symbol.for("react.context"),ne=Symbol.for("react.forward_ref"),q=Symbol.for("react.suspense"),Z=Symbol.for("react.suspense_list"),ve=Symbol.for("react.memo"),se=Symbol.for("react.lazy"),re=Symbol.for("react.offscreen"),M=Symbol.iterator;function W(n){return n===null||typeof n!="object"?null:(n=M&&n[M]||n["@@iterator"],typeof n=="function"?n:null)}var z=Object.assign,k;function P(n){if(k===void 0)try{throw Error()}catch(a){var i=a.stack.trim().match(/\n( *(at )?)/);k=i&&i[1]||""}return`
`+k+n}var X=!1;function te(n,i){if(!n||X)return"";X=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(N){var c=N}Reflect.construct(n,[],i)}else{try{i.call()}catch(N){c=N}n.call(i.prototype)}else{try{throw Error()}catch(N){c=N}n()}}catch(N){if(N&&c&&typeof N.stack=="string"){for(var d=N.stack.split(`
`),f=c.stack.split(`
`),g=d.length-1,w=f.length-1;1<=g&&0<=w&&d[g]!==f[w];)w--;for(;1<=g&&0<=w;g--,w--)if(d[g]!==f[w]){if(g!==1||w!==1)do if(g--,w--,0>w||d[g]!==f[w]){var S=`
`+d[g].replace(" at new "," at ");return n.displayName&&S.includes("<anonymous>")&&(S=S.replace("<anonymous>",n.displayName)),S}while(1<=g&&0<=w);break}}}finally{X=!1,Error.prepareStackTrace=a}return(n=n?n.displayName||n.name:"")?P(n):""}function oe(n){switch(n.tag){case 5:return P(n.type);case 16:return P("Lazy");case 13:return P("Suspense");case 19:return P("SuspenseList");case 0:case 2:case 15:return n=te(n.type,!1),n;case 11:return n=te(n.type.render,!1),n;case 1:return n=te(n.type,!0),n;default:return""}}function pe(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case Ie:return"Fragment";case De:return"Portal";case Re:return"Profiler";case Ve:return"StrictMode";case q:return"Suspense";case Z:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case Rt:return(n.displayName||"Context")+".Consumer";case ye:return(n._context.displayName||"Context")+".Provider";case ne:var i=n.render;return n=n.displayName,n||(n=i.displayName||i.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case ve:return i=n.displayName||null,i!==null?i:pe(n.type)||"Memo";case se:i=n._payload,n=n._init;try{return pe(n(i))}catch{}}return null}function Te(n){var i=n.type;switch(n.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=i.render,n=n.displayName||n.name||"",i.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return pe(i);case 8:return i===Ve?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function we(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function Me(n){var i=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function St(n){var i=Me(n)?"checked":"value",a=Object.getOwnPropertyDescriptor(n.constructor.prototype,i),c=""+n[i];if(!n.hasOwnProperty(i)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var d=a.get,f=a.set;return Object.defineProperty(n,i,{configurable:!0,get:function(){return d.call(this)},set:function(g){c=""+g,f.call(this,g)}}),Object.defineProperty(n,i,{enumerable:a.enumerable}),{getValue:function(){return c},setValue:function(g){c=""+g},stopTracking:function(){n._valueTracker=null,delete n[i]}}}}function Gs(n){n._valueTracker||(n._valueTracker=St(n))}function jd(n){if(!n)return!1;var i=n._valueTracker;if(!i)return!0;var a=i.getValue(),c="";return n&&(c=Me(n)?n.checked?"true":"false":n.value),n=c,n!==a?(i.setValue(n),!0):!1}function qs(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function Za(n,i){var a=i.checked;return z({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:a??n._wrapperState.initialChecked})}function Fd(n,i){var a=i.defaultValue==null?"":i.defaultValue,c=i.checked!=null?i.checked:i.defaultChecked;a=we(i.value!=null?i.value:a),n._wrapperState={initialChecked:c,initialValue:a,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function Ud(n,i){i=i.checked,i!=null&&fe(n,"checked",i,!1)}function el(n,i){Ud(n,i);var a=we(i.value),c=i.type;if(a!=null)c==="number"?(a===0&&n.value===""||n.value!=a)&&(n.value=""+a):n.value!==""+a&&(n.value=""+a);else if(c==="submit"||c==="reset"){n.removeAttribute("value");return}i.hasOwnProperty("value")?tl(n,i.type,a):i.hasOwnProperty("defaultValue")&&tl(n,i.type,we(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(n.defaultChecked=!!i.defaultChecked)}function zd(n,i,a){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var c=i.type;if(!(c!=="submit"&&c!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+n._wrapperState.initialValue,a||i===n.value||(n.value=i),n.defaultValue=i}a=n.name,a!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,a!==""&&(n.name=a)}function tl(n,i,a){(i!=="number"||qs(n.ownerDocument)!==n)&&(a==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+a&&(n.defaultValue=""+a))}var Ri=Array.isArray;function Lr(n,i,a,c){if(n=n.options,i){i={};for(var d=0;d<a.length;d++)i["$"+a[d]]=!0;for(a=0;a<n.length;a++)d=i.hasOwnProperty("$"+n[a].value),n[a].selected!==d&&(n[a].selected=d),d&&c&&(n[a].defaultSelected=!0)}else{for(a=""+we(a),i=null,d=0;d<n.length;d++){if(n[d].value===a){n[d].selected=!0,c&&(n[d].defaultSelected=!0);return}i!==null||n[d].disabled||(i=n[d])}i!==null&&(i.selected=!0)}}function nl(n,i){if(i.dangerouslySetInnerHTML!=null)throw Error(t(91));return z({},i,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function $d(n,i){var a=i.value;if(a==null){if(a=i.children,i=i.defaultValue,a!=null){if(i!=null)throw Error(t(92));if(Ri(a)){if(1<a.length)throw Error(t(93));a=a[0]}i=a}i==null&&(i=""),a=i}n._wrapperState={initialValue:we(a)}}function Bd(n,i){var a=we(i.value),c=we(i.defaultValue);a!=null&&(a=""+a,a!==n.value&&(n.value=a),i.defaultValue==null&&n.defaultValue!==a&&(n.defaultValue=a)),c!=null&&(n.defaultValue=""+c)}function Vd(n){var i=n.textContent;i===n._wrapperState.initialValue&&i!==""&&i!==null&&(n.value=i)}function Hd(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function rl(n,i){return n==null||n==="http://www.w3.org/1999/xhtml"?Hd(i):n==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var Ys,Wd=(function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,a,c,d){MSApp.execUnsafeLocalFunction(function(){return n(i,a,c,d)})}:n})(function(n,i){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=i;else{for(Ys=Ys||document.createElement("div"),Ys.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=Ys.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;i.firstChild;)n.appendChild(i.firstChild)}});function Pi(n,i){if(i){var a=n.firstChild;if(a&&a===n.lastChild&&a.nodeType===3){a.nodeValue=i;return}}n.textContent=i}var bi={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},pv=["Webkit","ms","Moz","O"];Object.keys(bi).forEach(function(n){pv.forEach(function(i){i=i+n.charAt(0).toUpperCase()+n.substring(1),bi[i]=bi[n]})});function Kd(n,i,a){return i==null||typeof i=="boolean"||i===""?"":a||typeof i!="number"||i===0||bi.hasOwnProperty(n)&&bi[n]?(""+i).trim():i+"px"}function Gd(n,i){n=n.style;for(var a in i)if(i.hasOwnProperty(a)){var c=a.indexOf("--")===0,d=Kd(a,i[a],c);a==="float"&&(a="cssFloat"),c?n.setProperty(a,d):n[a]=d}}var mv=z({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function il(n,i){if(i){if(mv[n]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(t(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(t(61))}if(i.style!=null&&typeof i.style!="object")throw Error(t(62))}}function sl(n,i){if(n.indexOf("-")===-1)return typeof i.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ol=null;function al(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var ll=null,Dr=null,Mr=null;function qd(n){if(n=Zi(n)){if(typeof ll!="function")throw Error(t(280));var i=n.stateNode;i&&(i=vo(i),ll(n.stateNode,n.type,i))}}function Yd(n){Dr?Mr?Mr.push(n):Mr=[n]:Dr=n}function Qd(){if(Dr){var n=Dr,i=Mr;if(Mr=Dr=null,qd(n),i)for(n=0;n<i.length;n++)qd(i[n])}}function Jd(n,i){return n(i)}function Xd(){}var cl=!1;function Zd(n,i,a){if(cl)return n(i,a);cl=!0;try{return Jd(n,i,a)}finally{cl=!1,(Dr!==null||Mr!==null)&&(Xd(),Qd())}}function Ai(n,i){var a=n.stateNode;if(a===null)return null;var c=vo(a);if(c===null)return null;a=c[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(n=n.type,c=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!c;break e;default:n=!1}if(n)return null;if(a&&typeof a!="function")throw Error(t(231,i,typeof a));return a}var ul=!1;if(h)try{var Oi={};Object.defineProperty(Oi,"passive",{get:function(){ul=!0}}),window.addEventListener("test",Oi,Oi),window.removeEventListener("test",Oi,Oi)}catch{ul=!1}function gv(n,i,a,c,d,f,g,w,S){var N=Array.prototype.slice.call(arguments,3);try{i.apply(a,N)}catch(A){this.onError(A)}}var Li=!1,Qs=null,Js=!1,dl=null,yv={onError:function(n){Li=!0,Qs=n}};function _v(n,i,a,c,d,f,g,w,S){Li=!1,Qs=null,gv.apply(yv,arguments)}function vv(n,i,a,c,d,f,g,w,S){if(_v.apply(this,arguments),Li){if(Li){var N=Qs;Li=!1,Qs=null}else throw Error(t(198));Js||(Js=!0,dl=N)}}function sr(n){var i=n,a=n;if(n.alternate)for(;i.return;)i=i.return;else{n=i;do i=n,(i.flags&4098)!==0&&(a=i.return),n=i.return;while(n)}return i.tag===3?a:null}function eh(n){if(n.tag===13){var i=n.memoizedState;if(i===null&&(n=n.alternate,n!==null&&(i=n.memoizedState)),i!==null)return i.dehydrated}return null}function th(n){if(sr(n)!==n)throw Error(t(188))}function wv(n){var i=n.alternate;if(!i){if(i=sr(n),i===null)throw Error(t(188));return i!==n?null:n}for(var a=n,c=i;;){var d=a.return;if(d===null)break;var f=d.alternate;if(f===null){if(c=d.return,c!==null){a=c;continue}break}if(d.child===f.child){for(f=d.child;f;){if(f===a)return th(d),n;if(f===c)return th(d),i;f=f.sibling}throw Error(t(188))}if(a.return!==c.return)a=d,c=f;else{for(var g=!1,w=d.child;w;){if(w===a){g=!0,a=d,c=f;break}if(w===c){g=!0,c=d,a=f;break}w=w.sibling}if(!g){for(w=f.child;w;){if(w===a){g=!0,a=f,c=d;break}if(w===c){g=!0,c=f,a=d;break}w=w.sibling}if(!g)throw Error(t(189))}}if(a.alternate!==c)throw Error(t(190))}if(a.tag!==3)throw Error(t(188));return a.stateNode.current===a?n:i}function nh(n){return n=wv(n),n!==null?rh(n):null}function rh(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var i=rh(n);if(i!==null)return i;n=n.sibling}return null}var ih=e.unstable_scheduleCallback,sh=e.unstable_cancelCallback,Sv=e.unstable_shouldYield,xv=e.unstable_requestPaint,$e=e.unstable_now,Ev=e.unstable_getCurrentPriorityLevel,hl=e.unstable_ImmediatePriority,oh=e.unstable_UserBlockingPriority,Xs=e.unstable_NormalPriority,kv=e.unstable_LowPriority,ah=e.unstable_IdlePriority,Zs=null,Zt=null;function Cv(n){if(Zt&&typeof Zt.onCommitFiberRoot=="function")try{Zt.onCommitFiberRoot(Zs,n,void 0,(n.current.flags&128)===128)}catch{}}var Ut=Math.clz32?Math.clz32:Nv,Iv=Math.log,Tv=Math.LN2;function Nv(n){return n>>>=0,n===0?32:31-(Iv(n)/Tv|0)|0}var eo=64,to=4194304;function Di(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function no(n,i){var a=n.pendingLanes;if(a===0)return 0;var c=0,d=n.suspendedLanes,f=n.pingedLanes,g=a&268435455;if(g!==0){var w=g&~d;w!==0?c=Di(w):(f&=g,f!==0&&(c=Di(f)))}else g=a&~d,g!==0?c=Di(g):f!==0&&(c=Di(f));if(c===0)return 0;if(i!==0&&i!==c&&(i&d)===0&&(d=c&-c,f=i&-i,d>=f||d===16&&(f&4194240)!==0))return i;if((c&4)!==0&&(c|=a&16),i=n.entangledLanes,i!==0)for(n=n.entanglements,i&=c;0<i;)a=31-Ut(i),d=1<<a,c|=n[a],i&=~d;return c}function Rv(n,i){switch(n){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Pv(n,i){for(var a=n.suspendedLanes,c=n.pingedLanes,d=n.expirationTimes,f=n.pendingLanes;0<f;){var g=31-Ut(f),w=1<<g,S=d[g];S===-1?((w&a)===0||(w&c)!==0)&&(d[g]=Rv(w,i)):S<=i&&(n.expiredLanes|=w),f&=~w}}function fl(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function lh(){var n=eo;return eo<<=1,(eo&4194240)===0&&(eo=64),n}function pl(n){for(var i=[],a=0;31>a;a++)i.push(n);return i}function Mi(n,i,a){n.pendingLanes|=i,i!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,i=31-Ut(i),n[i]=a}function bv(n,i){var a=n.pendingLanes&~i;n.pendingLanes=i,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=i,n.mutableReadLanes&=i,n.entangledLanes&=i,i=n.entanglements;var c=n.eventTimes;for(n=n.expirationTimes;0<a;){var d=31-Ut(a),f=1<<d;i[d]=0,c[d]=-1,n[d]=-1,a&=~f}}function ml(n,i){var a=n.entangledLanes|=i;for(n=n.entanglements;a;){var c=31-Ut(a),d=1<<c;d&i|n[c]&i&&(n[c]|=i),a&=~d}}var Se=0;function ch(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var uh,gl,dh,hh,fh,yl=!1,ro=[],Nn=null,Rn=null,Pn=null,ji=new Map,Fi=new Map,bn=[],Av="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ph(n,i){switch(n){case"focusin":case"focusout":Nn=null;break;case"dragenter":case"dragleave":Rn=null;break;case"mouseover":case"mouseout":Pn=null;break;case"pointerover":case"pointerout":ji.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":Fi.delete(i.pointerId)}}function Ui(n,i,a,c,d,f){return n===null||n.nativeEvent!==f?(n={blockedOn:i,domEventName:a,eventSystemFlags:c,nativeEvent:f,targetContainers:[d]},i!==null&&(i=Zi(i),i!==null&&gl(i)),n):(n.eventSystemFlags|=c,i=n.targetContainers,d!==null&&i.indexOf(d)===-1&&i.push(d),n)}function Ov(n,i,a,c,d){switch(i){case"focusin":return Nn=Ui(Nn,n,i,a,c,d),!0;case"dragenter":return Rn=Ui(Rn,n,i,a,c,d),!0;case"mouseover":return Pn=Ui(Pn,n,i,a,c,d),!0;case"pointerover":var f=d.pointerId;return ji.set(f,Ui(ji.get(f)||null,n,i,a,c,d)),!0;case"gotpointercapture":return f=d.pointerId,Fi.set(f,Ui(Fi.get(f)||null,n,i,a,c,d)),!0}return!1}function mh(n){var i=or(n.target);if(i!==null){var a=sr(i);if(a!==null){if(i=a.tag,i===13){if(i=eh(a),i!==null){n.blockedOn=i,fh(n.priority,function(){dh(a)});return}}else if(i===3&&a.stateNode.current.memoizedState.isDehydrated){n.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}n.blockedOn=null}function io(n){if(n.blockedOn!==null)return!1;for(var i=n.targetContainers;0<i.length;){var a=vl(n.domEventName,n.eventSystemFlags,i[0],n.nativeEvent);if(a===null){a=n.nativeEvent;var c=new a.constructor(a.type,a);ol=c,a.target.dispatchEvent(c),ol=null}else return i=Zi(a),i!==null&&gl(i),n.blockedOn=a,!1;i.shift()}return!0}function gh(n,i,a){io(n)&&a.delete(i)}function Lv(){yl=!1,Nn!==null&&io(Nn)&&(Nn=null),Rn!==null&&io(Rn)&&(Rn=null),Pn!==null&&io(Pn)&&(Pn=null),ji.forEach(gh),Fi.forEach(gh)}function zi(n,i){n.blockedOn===i&&(n.blockedOn=null,yl||(yl=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,Lv)))}function $i(n){function i(d){return zi(d,n)}if(0<ro.length){zi(ro[0],n);for(var a=1;a<ro.length;a++){var c=ro[a];c.blockedOn===n&&(c.blockedOn=null)}}for(Nn!==null&&zi(Nn,n),Rn!==null&&zi(Rn,n),Pn!==null&&zi(Pn,n),ji.forEach(i),Fi.forEach(i),a=0;a<bn.length;a++)c=bn[a],c.blockedOn===n&&(c.blockedOn=null);for(;0<bn.length&&(a=bn[0],a.blockedOn===null);)mh(a),a.blockedOn===null&&bn.shift()}var jr=ee.ReactCurrentBatchConfig,so=!0;function Dv(n,i,a,c){var d=Se,f=jr.transition;jr.transition=null;try{Se=1,_l(n,i,a,c)}finally{Se=d,jr.transition=f}}function Mv(n,i,a,c){var d=Se,f=jr.transition;jr.transition=null;try{Se=4,_l(n,i,a,c)}finally{Se=d,jr.transition=f}}function _l(n,i,a,c){if(so){var d=vl(n,i,a,c);if(d===null)Ml(n,i,c,oo,a),ph(n,c);else if(Ov(d,n,i,a,c))c.stopPropagation();else if(ph(n,c),i&4&&-1<Av.indexOf(n)){for(;d!==null;){var f=Zi(d);if(f!==null&&uh(f),f=vl(n,i,a,c),f===null&&Ml(n,i,c,oo,a),f===d)break;d=f}d!==null&&c.stopPropagation()}else Ml(n,i,c,null,a)}}var oo=null;function vl(n,i,a,c){if(oo=null,n=al(c),n=or(n),n!==null)if(i=sr(n),i===null)n=null;else if(a=i.tag,a===13){if(n=eh(i),n!==null)return n;n=null}else if(a===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;n=null}else i!==n&&(n=null);return oo=n,null}function yh(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Ev()){case hl:return 1;case oh:return 4;case Xs:case kv:return 16;case ah:return 536870912;default:return 16}default:return 16}}var An=null,wl=null,ao=null;function _h(){if(ao)return ao;var n,i=wl,a=i.length,c,d="value"in An?An.value:An.textContent,f=d.length;for(n=0;n<a&&i[n]===d[n];n++);var g=a-n;for(c=1;c<=g&&i[a-c]===d[f-c];c++);return ao=d.slice(n,1<c?1-c:void 0)}function lo(n){var i=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&i===13&&(n=13)):n=i,n===10&&(n=13),32<=n||n===13?n:0}function co(){return!0}function vh(){return!1}function xt(n){function i(a,c,d,f,g){this._reactName=a,this._targetInst=d,this.type=c,this.nativeEvent=f,this.target=g,this.currentTarget=null;for(var w in n)n.hasOwnProperty(w)&&(a=n[w],this[w]=a?a(f):f[w]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?co:vh,this.isPropagationStopped=vh,this}return z(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=co)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=co)},persist:function(){},isPersistent:co}),i}var Fr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Sl=xt(Fr),Bi=z({},Fr,{view:0,detail:0}),jv=xt(Bi),xl,El,Vi,uo=z({},Bi,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Cl,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==Vi&&(Vi&&n.type==="mousemove"?(xl=n.screenX-Vi.screenX,El=n.screenY-Vi.screenY):El=xl=0,Vi=n),xl)},movementY:function(n){return"movementY"in n?n.movementY:El}}),wh=xt(uo),Fv=z({},uo,{dataTransfer:0}),Uv=xt(Fv),zv=z({},Bi,{relatedTarget:0}),kl=xt(zv),$v=z({},Fr,{animationName:0,elapsedTime:0,pseudoElement:0}),Bv=xt($v),Vv=z({},Fr,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),Hv=xt(Vv),Wv=z({},Fr,{data:0}),Sh=xt(Wv),Kv={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Gv={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},qv={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Yv(n){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(n):(n=qv[n])?!!i[n]:!1}function Cl(){return Yv}var Qv=z({},Bi,{key:function(n){if(n.key){var i=Kv[n.key]||n.key;if(i!=="Unidentified")return i}return n.type==="keypress"?(n=lo(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?Gv[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Cl,charCode:function(n){return n.type==="keypress"?lo(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?lo(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),Jv=xt(Qv),Xv=z({},uo,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),xh=xt(Xv),Zv=z({},Bi,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Cl}),e0=xt(Zv),t0=z({},Fr,{propertyName:0,elapsedTime:0,pseudoElement:0}),n0=xt(t0),r0=z({},uo,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),i0=xt(r0),s0=[9,13,27,32],Il=h&&"CompositionEvent"in window,Hi=null;h&&"documentMode"in document&&(Hi=document.documentMode);var o0=h&&"TextEvent"in window&&!Hi,Eh=h&&(!Il||Hi&&8<Hi&&11>=Hi),kh=" ",Ch=!1;function Ih(n,i){switch(n){case"keyup":return s0.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Th(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var Ur=!1;function a0(n,i){switch(n){case"compositionend":return Th(i);case"keypress":return i.which!==32?null:(Ch=!0,kh);case"textInput":return n=i.data,n===kh&&Ch?null:n;default:return null}}function l0(n,i){if(Ur)return n==="compositionend"||!Il&&Ih(n,i)?(n=_h(),ao=wl=An=null,Ur=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Eh&&i.locale!=="ko"?null:i.data;default:return null}}var c0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Nh(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i==="input"?!!c0[n.type]:i==="textarea"}function Rh(n,i,a,c){Yd(c),i=go(i,"onChange"),0<i.length&&(a=new Sl("onChange","change",null,a,c),n.push({event:a,listeners:i}))}var Wi=null,Ki=null;function u0(n){Gh(n,0)}function ho(n){var i=Hr(n);if(jd(i))return n}function d0(n,i){if(n==="change")return i}var Ph=!1;if(h){var Tl;if(h){var Nl="oninput"in document;if(!Nl){var bh=document.createElement("div");bh.setAttribute("oninput","return;"),Nl=typeof bh.oninput=="function"}Tl=Nl}else Tl=!1;Ph=Tl&&(!document.documentMode||9<document.documentMode)}function Ah(){Wi&&(Wi.detachEvent("onpropertychange",Oh),Ki=Wi=null)}function Oh(n){if(n.propertyName==="value"&&ho(Ki)){var i=[];Rh(i,Ki,n,al(n)),Zd(u0,i)}}function h0(n,i,a){n==="focusin"?(Ah(),Wi=i,Ki=a,Wi.attachEvent("onpropertychange",Oh)):n==="focusout"&&Ah()}function f0(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return ho(Ki)}function p0(n,i){if(n==="click")return ho(i)}function m0(n,i){if(n==="input"||n==="change")return ho(i)}function g0(n,i){return n===i&&(n!==0||1/n===1/i)||n!==n&&i!==i}var zt=typeof Object.is=="function"?Object.is:g0;function Gi(n,i){if(zt(n,i))return!0;if(typeof n!="object"||n===null||typeof i!="object"||i===null)return!1;var a=Object.keys(n),c=Object.keys(i);if(a.length!==c.length)return!1;for(c=0;c<a.length;c++){var d=a[c];if(!p.call(i,d)||!zt(n[d],i[d]))return!1}return!0}function Lh(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function Dh(n,i){var a=Lh(n);n=0;for(var c;a;){if(a.nodeType===3){if(c=n+a.textContent.length,n<=i&&c>=i)return{node:a,offset:i-n};n=c}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Lh(a)}}function Mh(n,i){return n&&i?n===i?!0:n&&n.nodeType===3?!1:i&&i.nodeType===3?Mh(n,i.parentNode):"contains"in n?n.contains(i):n.compareDocumentPosition?!!(n.compareDocumentPosition(i)&16):!1:!1}function jh(){for(var n=window,i=qs();i instanceof n.HTMLIFrameElement;){try{var a=typeof i.contentWindow.location.href=="string"}catch{a=!1}if(a)n=i.contentWindow;else break;i=qs(n.document)}return i}function Rl(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i&&(i==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||i==="textarea"||n.contentEditable==="true")}function y0(n){var i=jh(),a=n.focusedElem,c=n.selectionRange;if(i!==a&&a&&a.ownerDocument&&Mh(a.ownerDocument.documentElement,a)){if(c!==null&&Rl(a)){if(i=c.start,n=c.end,n===void 0&&(n=i),"selectionStart"in a)a.selectionStart=i,a.selectionEnd=Math.min(n,a.value.length);else if(n=(i=a.ownerDocument||document)&&i.defaultView||window,n.getSelection){n=n.getSelection();var d=a.textContent.length,f=Math.min(c.start,d);c=c.end===void 0?f:Math.min(c.end,d),!n.extend&&f>c&&(d=c,c=f,f=d),d=Dh(a,f);var g=Dh(a,c);d&&g&&(n.rangeCount!==1||n.anchorNode!==d.node||n.anchorOffset!==d.offset||n.focusNode!==g.node||n.focusOffset!==g.offset)&&(i=i.createRange(),i.setStart(d.node,d.offset),n.removeAllRanges(),f>c?(n.addRange(i),n.extend(g.node,g.offset)):(i.setEnd(g.node,g.offset),n.addRange(i)))}}for(i=[],n=a;n=n.parentNode;)n.nodeType===1&&i.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof a.focus=="function"&&a.focus(),a=0;a<i.length;a++)n=i[a],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var _0=h&&"documentMode"in document&&11>=document.documentMode,zr=null,Pl=null,qi=null,bl=!1;function Fh(n,i,a){var c=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;bl||zr==null||zr!==qs(c)||(c=zr,"selectionStart"in c&&Rl(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),qi&&Gi(qi,c)||(qi=c,c=go(Pl,"onSelect"),0<c.length&&(i=new Sl("onSelect","select",null,i,a),n.push({event:i,listeners:c}),i.target=zr)))}function fo(n,i){var a={};return a[n.toLowerCase()]=i.toLowerCase(),a["Webkit"+n]="webkit"+i,a["Moz"+n]="moz"+i,a}var $r={animationend:fo("Animation","AnimationEnd"),animationiteration:fo("Animation","AnimationIteration"),animationstart:fo("Animation","AnimationStart"),transitionend:fo("Transition","TransitionEnd")},Al={},Uh={};h&&(Uh=document.createElement("div").style,"AnimationEvent"in window||(delete $r.animationend.animation,delete $r.animationiteration.animation,delete $r.animationstart.animation),"TransitionEvent"in window||delete $r.transitionend.transition);function po(n){if(Al[n])return Al[n];if(!$r[n])return n;var i=$r[n],a;for(a in i)if(i.hasOwnProperty(a)&&a in Uh)return Al[n]=i[a];return n}var zh=po("animationend"),$h=po("animationiteration"),Bh=po("animationstart"),Vh=po("transitionend"),Hh=new Map,Wh="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function On(n,i){Hh.set(n,i),l(i,[n])}for(var Ol=0;Ol<Wh.length;Ol++){var Ll=Wh[Ol],v0=Ll.toLowerCase(),w0=Ll[0].toUpperCase()+Ll.slice(1);On(v0,"on"+w0)}On(zh,"onAnimationEnd"),On($h,"onAnimationIteration"),On(Bh,"onAnimationStart"),On("dblclick","onDoubleClick"),On("focusin","onFocus"),On("focusout","onBlur"),On(Vh,"onTransitionEnd"),u("onMouseEnter",["mouseout","mouseover"]),u("onMouseLeave",["mouseout","mouseover"]),u("onPointerEnter",["pointerout","pointerover"]),u("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Yi="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),S0=new Set("cancel close invalid load scroll toggle".split(" ").concat(Yi));function Kh(n,i,a){var c=n.type||"unknown-event";n.currentTarget=a,vv(c,i,void 0,n),n.currentTarget=null}function Gh(n,i){i=(i&4)!==0;for(var a=0;a<n.length;a++){var c=n[a],d=c.event;c=c.listeners;e:{var f=void 0;if(i)for(var g=c.length-1;0<=g;g--){var w=c[g],S=w.instance,N=w.currentTarget;if(w=w.listener,S!==f&&d.isPropagationStopped())break e;Kh(d,w,N),f=S}else for(g=0;g<c.length;g++){if(w=c[g],S=w.instance,N=w.currentTarget,w=w.listener,S!==f&&d.isPropagationStopped())break e;Kh(d,w,N),f=S}}}if(Js)throw n=dl,Js=!1,dl=null,n}function Pe(n,i){var a=i[Bl];a===void 0&&(a=i[Bl]=new Set);var c=n+"__bubble";a.has(c)||(qh(i,n,2,!1),a.add(c))}function Dl(n,i,a){var c=0;i&&(c|=4),qh(a,n,c,i)}var mo="_reactListening"+Math.random().toString(36).slice(2);function Qi(n){if(!n[mo]){n[mo]=!0,s.forEach(function(a){a!=="selectionchange"&&(S0.has(a)||Dl(a,!1,n),Dl(a,!0,n))});var i=n.nodeType===9?n:n.ownerDocument;i===null||i[mo]||(i[mo]=!0,Dl("selectionchange",!1,i))}}function qh(n,i,a,c){switch(yh(i)){case 1:var d=Dv;break;case 4:d=Mv;break;default:d=_l}a=d.bind(null,i,a,n),d=void 0,!ul||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(d=!0),c?d!==void 0?n.addEventListener(i,a,{capture:!0,passive:d}):n.addEventListener(i,a,!0):d!==void 0?n.addEventListener(i,a,{passive:d}):n.addEventListener(i,a,!1)}function Ml(n,i,a,c,d){var f=c;if((i&1)===0&&(i&2)===0&&c!==null)e:for(;;){if(c===null)return;var g=c.tag;if(g===3||g===4){var w=c.stateNode.containerInfo;if(w===d||w.nodeType===8&&w.parentNode===d)break;if(g===4)for(g=c.return;g!==null;){var S=g.tag;if((S===3||S===4)&&(S=g.stateNode.containerInfo,S===d||S.nodeType===8&&S.parentNode===d))return;g=g.return}for(;w!==null;){if(g=or(w),g===null)return;if(S=g.tag,S===5||S===6){c=f=g;continue e}w=w.parentNode}}c=c.return}Zd(function(){var N=f,A=al(a),O=[];e:{var b=Hh.get(n);if(b!==void 0){var F=Sl,B=n;switch(n){case"keypress":if(lo(a)===0)break e;case"keydown":case"keyup":F=Jv;break;case"focusin":B="focus",F=kl;break;case"focusout":B="blur",F=kl;break;case"beforeblur":case"afterblur":F=kl;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":F=wh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":F=Uv;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":F=e0;break;case zh:case $h:case Bh:F=Bv;break;case Vh:F=n0;break;case"scroll":F=jv;break;case"wheel":F=i0;break;case"copy":case"cut":case"paste":F=Hv;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":F=xh}var V=(i&4)!==0,Be=!V&&n==="scroll",C=V?b!==null?b+"Capture":null:b;V=[];for(var E=N,I;E!==null;){I=E;var D=I.stateNode;if(I.tag===5&&D!==null&&(I=D,C!==null&&(D=Ai(E,C),D!=null&&V.push(Ji(E,D,I)))),Be)break;E=E.return}0<V.length&&(b=new F(b,B,null,a,A),O.push({event:b,listeners:V}))}}if((i&7)===0){e:{if(b=n==="mouseover"||n==="pointerover",F=n==="mouseout"||n==="pointerout",b&&a!==ol&&(B=a.relatedTarget||a.fromElement)&&(or(B)||B[dn]))break e;if((F||b)&&(b=A.window===A?A:(b=A.ownerDocument)?b.defaultView||b.parentWindow:window,F?(B=a.relatedTarget||a.toElement,F=N,B=B?or(B):null,B!==null&&(Be=sr(B),B!==Be||B.tag!==5&&B.tag!==6)&&(B=null)):(F=null,B=N),F!==B)){if(V=wh,D="onMouseLeave",C="onMouseEnter",E="mouse",(n==="pointerout"||n==="pointerover")&&(V=xh,D="onPointerLeave",C="onPointerEnter",E="pointer"),Be=F==null?b:Hr(F),I=B==null?b:Hr(B),b=new V(D,E+"leave",F,a,A),b.target=Be,b.relatedTarget=I,D=null,or(A)===N&&(V=new V(C,E+"enter",B,a,A),V.target=I,V.relatedTarget=Be,D=V),Be=D,F&&B)t:{for(V=F,C=B,E=0,I=V;I;I=Br(I))E++;for(I=0,D=C;D;D=Br(D))I++;for(;0<E-I;)V=Br(V),E--;for(;0<I-E;)C=Br(C),I--;for(;E--;){if(V===C||C!==null&&V===C.alternate)break t;V=Br(V),C=Br(C)}V=null}else V=null;F!==null&&Yh(O,b,F,V,!1),B!==null&&Be!==null&&Yh(O,Be,B,V,!0)}}e:{if(b=N?Hr(N):window,F=b.nodeName&&b.nodeName.toLowerCase(),F==="select"||F==="input"&&b.type==="file")var H=d0;else if(Nh(b))if(Ph)H=m0;else{H=f0;var K=h0}else(F=b.nodeName)&&F.toLowerCase()==="input"&&(b.type==="checkbox"||b.type==="radio")&&(H=p0);if(H&&(H=H(n,N))){Rh(O,H,a,A);break e}K&&K(n,b,N),n==="focusout"&&(K=b._wrapperState)&&K.controlled&&b.type==="number"&&tl(b,"number",b.value)}switch(K=N?Hr(N):window,n){case"focusin":(Nh(K)||K.contentEditable==="true")&&(zr=K,Pl=N,qi=null);break;case"focusout":qi=Pl=zr=null;break;case"mousedown":bl=!0;break;case"contextmenu":case"mouseup":case"dragend":bl=!1,Fh(O,a,A);break;case"selectionchange":if(_0)break;case"keydown":case"keyup":Fh(O,a,A)}var G;if(Il)e:{switch(n){case"compositionstart":var Q="onCompositionStart";break e;case"compositionend":Q="onCompositionEnd";break e;case"compositionupdate":Q="onCompositionUpdate";break e}Q=void 0}else Ur?Ih(n,a)&&(Q="onCompositionEnd"):n==="keydown"&&a.keyCode===229&&(Q="onCompositionStart");Q&&(Eh&&a.locale!=="ko"&&(Ur||Q!=="onCompositionStart"?Q==="onCompositionEnd"&&Ur&&(G=_h()):(An=A,wl="value"in An?An.value:An.textContent,Ur=!0)),K=go(N,Q),0<K.length&&(Q=new Sh(Q,n,null,a,A),O.push({event:Q,listeners:K}),G?Q.data=G:(G=Th(a),G!==null&&(Q.data=G)))),(G=o0?a0(n,a):l0(n,a))&&(N=go(N,"onBeforeInput"),0<N.length&&(A=new Sh("onBeforeInput","beforeinput",null,a,A),O.push({event:A,listeners:N}),A.data=G))}Gh(O,i)})}function Ji(n,i,a){return{instance:n,listener:i,currentTarget:a}}function go(n,i){for(var a=i+"Capture",c=[];n!==null;){var d=n,f=d.stateNode;d.tag===5&&f!==null&&(d=f,f=Ai(n,a),f!=null&&c.unshift(Ji(n,f,d)),f=Ai(n,i),f!=null&&c.push(Ji(n,f,d))),n=n.return}return c}function Br(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function Yh(n,i,a,c,d){for(var f=i._reactName,g=[];a!==null&&a!==c;){var w=a,S=w.alternate,N=w.stateNode;if(S!==null&&S===c)break;w.tag===5&&N!==null&&(w=N,d?(S=Ai(a,f),S!=null&&g.unshift(Ji(a,S,w))):d||(S=Ai(a,f),S!=null&&g.push(Ji(a,S,w)))),a=a.return}g.length!==0&&n.push({event:i,listeners:g})}var x0=/\r\n?/g,E0=/\u0000|\uFFFD/g;function Qh(n){return(typeof n=="string"?n:""+n).replace(x0,`
`).replace(E0,"")}function yo(n,i,a){if(i=Qh(i),Qh(n)!==i&&a)throw Error(t(425))}function _o(){}var jl=null,Fl=null;function Ul(n,i){return n==="textarea"||n==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var zl=typeof setTimeout=="function"?setTimeout:void 0,k0=typeof clearTimeout=="function"?clearTimeout:void 0,Jh=typeof Promise=="function"?Promise:void 0,C0=typeof queueMicrotask=="function"?queueMicrotask:typeof Jh<"u"?function(n){return Jh.resolve(null).then(n).catch(I0)}:zl;function I0(n){setTimeout(function(){throw n})}function $l(n,i){var a=i,c=0;do{var d=a.nextSibling;if(n.removeChild(a),d&&d.nodeType===8)if(a=d.data,a==="/$"){if(c===0){n.removeChild(d),$i(i);return}c--}else a!=="$"&&a!=="$?"&&a!=="$!"||c++;a=d}while(a);$i(i)}function Ln(n){for(;n!=null;n=n.nextSibling){var i=n.nodeType;if(i===1||i===3)break;if(i===8){if(i=n.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return n}function Xh(n){n=n.previousSibling;for(var i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="$"||a==="$!"||a==="$?"){if(i===0)return n;i--}else a==="/$"&&i++}n=n.previousSibling}return null}var Vr=Math.random().toString(36).slice(2),en="__reactFiber$"+Vr,Xi="__reactProps$"+Vr,dn="__reactContainer$"+Vr,Bl="__reactEvents$"+Vr,T0="__reactListeners$"+Vr,N0="__reactHandles$"+Vr;function or(n){var i=n[en];if(i)return i;for(var a=n.parentNode;a;){if(i=a[dn]||a[en]){if(a=i.alternate,i.child!==null||a!==null&&a.child!==null)for(n=Xh(n);n!==null;){if(a=n[en])return a;n=Xh(n)}return i}n=a,a=n.parentNode}return null}function Zi(n){return n=n[en]||n[dn],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function Hr(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function vo(n){return n[Xi]||null}var Vl=[],Wr=-1;function Dn(n){return{current:n}}function be(n){0>Wr||(n.current=Vl[Wr],Vl[Wr]=null,Wr--)}function Ne(n,i){Wr++,Vl[Wr]=n.current,n.current=i}var Mn={},nt=Dn(Mn),pt=Dn(!1),ar=Mn;function Kr(n,i){var a=n.type.contextTypes;if(!a)return Mn;var c=n.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===i)return c.__reactInternalMemoizedMaskedChildContext;var d={},f;for(f in a)d[f]=i[f];return c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=d),d}function mt(n){return n=n.childContextTypes,n!=null}function wo(){be(pt),be(nt)}function Zh(n,i,a){if(nt.current!==Mn)throw Error(t(168));Ne(nt,i),Ne(pt,a)}function ef(n,i,a){var c=n.stateNode;if(i=i.childContextTypes,typeof c.getChildContext!="function")return a;c=c.getChildContext();for(var d in c)if(!(d in i))throw Error(t(108,Te(n)||"Unknown",d));return z({},a,c)}function So(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||Mn,ar=nt.current,Ne(nt,n),Ne(pt,pt.current),!0}function tf(n,i,a){var c=n.stateNode;if(!c)throw Error(t(169));a?(n=ef(n,i,ar),c.__reactInternalMemoizedMergedChildContext=n,be(pt),be(nt),Ne(nt,n)):be(pt),Ne(pt,a)}var hn=null,xo=!1,Hl=!1;function nf(n){hn===null?hn=[n]:hn.push(n)}function R0(n){xo=!0,nf(n)}function jn(){if(!Hl&&hn!==null){Hl=!0;var n=0,i=Se;try{var a=hn;for(Se=1;n<a.length;n++){var c=a[n];do c=c(!0);while(c!==null)}hn=null,xo=!1}catch(d){throw hn!==null&&(hn=hn.slice(n+1)),ih(hl,jn),d}finally{Se=i,Hl=!1}}return null}var Gr=[],qr=0,Eo=null,ko=0,Pt=[],bt=0,lr=null,fn=1,pn="";function cr(n,i){Gr[qr++]=ko,Gr[qr++]=Eo,Eo=n,ko=i}function rf(n,i,a){Pt[bt++]=fn,Pt[bt++]=pn,Pt[bt++]=lr,lr=n;var c=fn;n=pn;var d=32-Ut(c)-1;c&=~(1<<d),a+=1;var f=32-Ut(i)+d;if(30<f){var g=d-d%5;f=(c&(1<<g)-1).toString(32),c>>=g,d-=g,fn=1<<32-Ut(i)+d|a<<d|c,pn=f+n}else fn=1<<f|a<<d|c,pn=n}function Wl(n){n.return!==null&&(cr(n,1),rf(n,1,0))}function Kl(n){for(;n===Eo;)Eo=Gr[--qr],Gr[qr]=null,ko=Gr[--qr],Gr[qr]=null;for(;n===lr;)lr=Pt[--bt],Pt[bt]=null,pn=Pt[--bt],Pt[bt]=null,fn=Pt[--bt],Pt[bt]=null}var Et=null,kt=null,je=!1,$t=null;function sf(n,i){var a=Dt(5,null,null,0);a.elementType="DELETED",a.stateNode=i,a.return=n,i=n.deletions,i===null?(n.deletions=[a],n.flags|=16):i.push(a)}function of(n,i){switch(n.tag){case 5:var a=n.type;return i=i.nodeType!==1||a.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(n.stateNode=i,Et=n,kt=Ln(i.firstChild),!0):!1;case 6:return i=n.pendingProps===""||i.nodeType!==3?null:i,i!==null?(n.stateNode=i,Et=n,kt=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(a=lr!==null?{id:fn,overflow:pn}:null,n.memoizedState={dehydrated:i,treeContext:a,retryLane:1073741824},a=Dt(18,null,null,0),a.stateNode=i,a.return=n,n.child=a,Et=n,kt=null,!0):!1;default:return!1}}function Gl(n){return(n.mode&1)!==0&&(n.flags&128)===0}function ql(n){if(je){var i=kt;if(i){var a=i;if(!of(n,i)){if(Gl(n))throw Error(t(418));i=Ln(a.nextSibling);var c=Et;i&&of(n,i)?sf(c,a):(n.flags=n.flags&-4097|2,je=!1,Et=n)}}else{if(Gl(n))throw Error(t(418));n.flags=n.flags&-4097|2,je=!1,Et=n}}}function af(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;Et=n}function Co(n){if(n!==Et)return!1;if(!je)return af(n),je=!0,!1;var i;if((i=n.tag!==3)&&!(i=n.tag!==5)&&(i=n.type,i=i!=="head"&&i!=="body"&&!Ul(n.type,n.memoizedProps)),i&&(i=kt)){if(Gl(n))throw lf(),Error(t(418));for(;i;)sf(n,i),i=Ln(i.nextSibling)}if(af(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="/$"){if(i===0){kt=Ln(n.nextSibling);break e}i--}else a!=="$"&&a!=="$!"&&a!=="$?"||i++}n=n.nextSibling}kt=null}}else kt=Et?Ln(n.stateNode.nextSibling):null;return!0}function lf(){for(var n=kt;n;)n=Ln(n.nextSibling)}function Yr(){kt=Et=null,je=!1}function Yl(n){$t===null?$t=[n]:$t.push(n)}var P0=ee.ReactCurrentBatchConfig;function es(n,i,a){if(n=a.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(a._owner){if(a=a._owner,a){if(a.tag!==1)throw Error(t(309));var c=a.stateNode}if(!c)throw Error(t(147,n));var d=c,f=""+n;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===f?i.ref:(i=function(g){var w=d.refs;g===null?delete w[f]:w[f]=g},i._stringRef=f,i)}if(typeof n!="string")throw Error(t(284));if(!a._owner)throw Error(t(290,n))}return n}function Io(n,i){throw n=Object.prototype.toString.call(i),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":n))}function cf(n){var i=n._init;return i(n._payload)}function uf(n){function i(C,E){if(n){var I=C.deletions;I===null?(C.deletions=[E],C.flags|=16):I.push(E)}}function a(C,E){if(!n)return null;for(;E!==null;)i(C,E),E=E.sibling;return null}function c(C,E){for(C=new Map;E!==null;)E.key!==null?C.set(E.key,E):C.set(E.index,E),E=E.sibling;return C}function d(C,E){return C=Wn(C,E),C.index=0,C.sibling=null,C}function f(C,E,I){return C.index=I,n?(I=C.alternate,I!==null?(I=I.index,I<E?(C.flags|=2,E):I):(C.flags|=2,E)):(C.flags|=1048576,E)}function g(C){return n&&C.alternate===null&&(C.flags|=2),C}function w(C,E,I,D){return E===null||E.tag!==6?(E=zc(I,C.mode,D),E.return=C,E):(E=d(E,I),E.return=C,E)}function S(C,E,I,D){var H=I.type;return H===Ie?A(C,E,I.props.children,D,I.key):E!==null&&(E.elementType===H||typeof H=="object"&&H!==null&&H.$$typeof===se&&cf(H)===E.type)?(D=d(E,I.props),D.ref=es(C,E,I),D.return=C,D):(D=Qo(I.type,I.key,I.props,null,C.mode,D),D.ref=es(C,E,I),D.return=C,D)}function N(C,E,I,D){return E===null||E.tag!==4||E.stateNode.containerInfo!==I.containerInfo||E.stateNode.implementation!==I.implementation?(E=$c(I,C.mode,D),E.return=C,E):(E=d(E,I.children||[]),E.return=C,E)}function A(C,E,I,D,H){return E===null||E.tag!==7?(E=yr(I,C.mode,D,H),E.return=C,E):(E=d(E,I),E.return=C,E)}function O(C,E,I){if(typeof E=="string"&&E!==""||typeof E=="number")return E=zc(""+E,C.mode,I),E.return=C,E;if(typeof E=="object"&&E!==null){switch(E.$$typeof){case Ce:return I=Qo(E.type,E.key,E.props,null,C.mode,I),I.ref=es(C,null,E),I.return=C,I;case De:return E=$c(E,C.mode,I),E.return=C,E;case se:var D=E._init;return O(C,D(E._payload),I)}if(Ri(E)||W(E))return E=yr(E,C.mode,I,null),E.return=C,E;Io(C,E)}return null}function b(C,E,I,D){var H=E!==null?E.key:null;if(typeof I=="string"&&I!==""||typeof I=="number")return H!==null?null:w(C,E,""+I,D);if(typeof I=="object"&&I!==null){switch(I.$$typeof){case Ce:return I.key===H?S(C,E,I,D):null;case De:return I.key===H?N(C,E,I,D):null;case se:return H=I._init,b(C,E,H(I._payload),D)}if(Ri(I)||W(I))return H!==null?null:A(C,E,I,D,null);Io(C,I)}return null}function F(C,E,I,D,H){if(typeof D=="string"&&D!==""||typeof D=="number")return C=C.get(I)||null,w(E,C,""+D,H);if(typeof D=="object"&&D!==null){switch(D.$$typeof){case Ce:return C=C.get(D.key===null?I:D.key)||null,S(E,C,D,H);case De:return C=C.get(D.key===null?I:D.key)||null,N(E,C,D,H);case se:var K=D._init;return F(C,E,I,K(D._payload),H)}if(Ri(D)||W(D))return C=C.get(I)||null,A(E,C,D,H,null);Io(E,D)}return null}function B(C,E,I,D){for(var H=null,K=null,G=E,Q=E=0,Ye=null;G!==null&&Q<I.length;Q++){G.index>Q?(Ye=G,G=null):Ye=G.sibling;var me=b(C,G,I[Q],D);if(me===null){G===null&&(G=Ye);break}n&&G&&me.alternate===null&&i(C,G),E=f(me,E,Q),K===null?H=me:K.sibling=me,K=me,G=Ye}if(Q===I.length)return a(C,G),je&&cr(C,Q),H;if(G===null){for(;Q<I.length;Q++)G=O(C,I[Q],D),G!==null&&(E=f(G,E,Q),K===null?H=G:K.sibling=G,K=G);return je&&cr(C,Q),H}for(G=c(C,G);Q<I.length;Q++)Ye=F(G,C,Q,I[Q],D),Ye!==null&&(n&&Ye.alternate!==null&&G.delete(Ye.key===null?Q:Ye.key),E=f(Ye,E,Q),K===null?H=Ye:K.sibling=Ye,K=Ye);return n&&G.forEach(function(Kn){return i(C,Kn)}),je&&cr(C,Q),H}function V(C,E,I,D){var H=W(I);if(typeof H!="function")throw Error(t(150));if(I=H.call(I),I==null)throw Error(t(151));for(var K=H=null,G=E,Q=E=0,Ye=null,me=I.next();G!==null&&!me.done;Q++,me=I.next()){G.index>Q?(Ye=G,G=null):Ye=G.sibling;var Kn=b(C,G,me.value,D);if(Kn===null){G===null&&(G=Ye);break}n&&G&&Kn.alternate===null&&i(C,G),E=f(Kn,E,Q),K===null?H=Kn:K.sibling=Kn,K=Kn,G=Ye}if(me.done)return a(C,G),je&&cr(C,Q),H;if(G===null){for(;!me.done;Q++,me=I.next())me=O(C,me.value,D),me!==null&&(E=f(me,E,Q),K===null?H=me:K.sibling=me,K=me);return je&&cr(C,Q),H}for(G=c(C,G);!me.done;Q++,me=I.next())me=F(G,C,Q,me.value,D),me!==null&&(n&&me.alternate!==null&&G.delete(me.key===null?Q:me.key),E=f(me,E,Q),K===null?H=me:K.sibling=me,K=me);return n&&G.forEach(function(cw){return i(C,cw)}),je&&cr(C,Q),H}function Be(C,E,I,D){if(typeof I=="object"&&I!==null&&I.type===Ie&&I.key===null&&(I=I.props.children),typeof I=="object"&&I!==null){switch(I.$$typeof){case Ce:e:{for(var H=I.key,K=E;K!==null;){if(K.key===H){if(H=I.type,H===Ie){if(K.tag===7){a(C,K.sibling),E=d(K,I.props.children),E.return=C,C=E;break e}}else if(K.elementType===H||typeof H=="object"&&H!==null&&H.$$typeof===se&&cf(H)===K.type){a(C,K.sibling),E=d(K,I.props),E.ref=es(C,K,I),E.return=C,C=E;break e}a(C,K);break}else i(C,K);K=K.sibling}I.type===Ie?(E=yr(I.props.children,C.mode,D,I.key),E.return=C,C=E):(D=Qo(I.type,I.key,I.props,null,C.mode,D),D.ref=es(C,E,I),D.return=C,C=D)}return g(C);case De:e:{for(K=I.key;E!==null;){if(E.key===K)if(E.tag===4&&E.stateNode.containerInfo===I.containerInfo&&E.stateNode.implementation===I.implementation){a(C,E.sibling),E=d(E,I.children||[]),E.return=C,C=E;break e}else{a(C,E);break}else i(C,E);E=E.sibling}E=$c(I,C.mode,D),E.return=C,C=E}return g(C);case se:return K=I._init,Be(C,E,K(I._payload),D)}if(Ri(I))return B(C,E,I,D);if(W(I))return V(C,E,I,D);Io(C,I)}return typeof I=="string"&&I!==""||typeof I=="number"?(I=""+I,E!==null&&E.tag===6?(a(C,E.sibling),E=d(E,I),E.return=C,C=E):(a(C,E),E=zc(I,C.mode,D),E.return=C,C=E),g(C)):a(C,E)}return Be}var Qr=uf(!0),df=uf(!1),To=Dn(null),No=null,Jr=null,Ql=null;function Jl(){Ql=Jr=No=null}function Xl(n){var i=To.current;be(To),n._currentValue=i}function Zl(n,i,a){for(;n!==null;){var c=n.alternate;if((n.childLanes&i)!==i?(n.childLanes|=i,c!==null&&(c.childLanes|=i)):c!==null&&(c.childLanes&i)!==i&&(c.childLanes|=i),n===a)break;n=n.return}}function Xr(n,i){No=n,Ql=Jr=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&i)!==0&&(gt=!0),n.firstContext=null)}function At(n){var i=n._currentValue;if(Ql!==n)if(n={context:n,memoizedValue:i,next:null},Jr===null){if(No===null)throw Error(t(308));Jr=n,No.dependencies={lanes:0,firstContext:n}}else Jr=Jr.next=n;return i}var ur=null;function ec(n){ur===null?ur=[n]:ur.push(n)}function hf(n,i,a,c){var d=i.interleaved;return d===null?(a.next=a,ec(i)):(a.next=d.next,d.next=a),i.interleaved=a,mn(n,c)}function mn(n,i){n.lanes|=i;var a=n.alternate;for(a!==null&&(a.lanes|=i),a=n,n=n.return;n!==null;)n.childLanes|=i,a=n.alternate,a!==null&&(a.childLanes|=i),a=n,n=n.return;return a.tag===3?a.stateNode:null}var Fn=!1;function tc(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ff(n,i){n=n.updateQueue,i.updateQueue===n&&(i.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function gn(n,i){return{eventTime:n,lane:i,tag:0,payload:null,callback:null,next:null}}function Un(n,i,a){var c=n.updateQueue;if(c===null)return null;if(c=c.shared,(he&2)!==0){var d=c.pending;return d===null?i.next=i:(i.next=d.next,d.next=i),c.pending=i,mn(n,a)}return d=c.interleaved,d===null?(i.next=i,ec(c)):(i.next=d.next,d.next=i),c.interleaved=i,mn(n,a)}function Ro(n,i,a){if(i=i.updateQueue,i!==null&&(i=i.shared,(a&4194240)!==0)){var c=i.lanes;c&=n.pendingLanes,a|=c,i.lanes=a,ml(n,a)}}function pf(n,i){var a=n.updateQueue,c=n.alternate;if(c!==null&&(c=c.updateQueue,a===c)){var d=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var g={eventTime:a.eventTime,lane:a.lane,tag:a.tag,payload:a.payload,callback:a.callback,next:null};f===null?d=f=g:f=f.next=g,a=a.next}while(a!==null);f===null?d=f=i:f=f.next=i}else d=f=i;a={baseState:c.baseState,firstBaseUpdate:d,lastBaseUpdate:f,shared:c.shared,effects:c.effects},n.updateQueue=a;return}n=a.lastBaseUpdate,n===null?a.firstBaseUpdate=i:n.next=i,a.lastBaseUpdate=i}function Po(n,i,a,c){var d=n.updateQueue;Fn=!1;var f=d.firstBaseUpdate,g=d.lastBaseUpdate,w=d.shared.pending;if(w!==null){d.shared.pending=null;var S=w,N=S.next;S.next=null,g===null?f=N:g.next=N,g=S;var A=n.alternate;A!==null&&(A=A.updateQueue,w=A.lastBaseUpdate,w!==g&&(w===null?A.firstBaseUpdate=N:w.next=N,A.lastBaseUpdate=S))}if(f!==null){var O=d.baseState;g=0,A=N=S=null,w=f;do{var b=w.lane,F=w.eventTime;if((c&b)===b){A!==null&&(A=A.next={eventTime:F,lane:0,tag:w.tag,payload:w.payload,callback:w.callback,next:null});e:{var B=n,V=w;switch(b=i,F=a,V.tag){case 1:if(B=V.payload,typeof B=="function"){O=B.call(F,O,b);break e}O=B;break e;case 3:B.flags=B.flags&-65537|128;case 0:if(B=V.payload,b=typeof B=="function"?B.call(F,O,b):B,b==null)break e;O=z({},O,b);break e;case 2:Fn=!0}}w.callback!==null&&w.lane!==0&&(n.flags|=64,b=d.effects,b===null?d.effects=[w]:b.push(w))}else F={eventTime:F,lane:b,tag:w.tag,payload:w.payload,callback:w.callback,next:null},A===null?(N=A=F,S=O):A=A.next=F,g|=b;if(w=w.next,w===null){if(w=d.shared.pending,w===null)break;b=w,w=b.next,b.next=null,d.lastBaseUpdate=b,d.shared.pending=null}}while(!0);if(A===null&&(S=O),d.baseState=S,d.firstBaseUpdate=N,d.lastBaseUpdate=A,i=d.shared.interleaved,i!==null){d=i;do g|=d.lane,d=d.next;while(d!==i)}else f===null&&(d.shared.lanes=0);fr|=g,n.lanes=g,n.memoizedState=O}}function mf(n,i,a){if(n=i.effects,i.effects=null,n!==null)for(i=0;i<n.length;i++){var c=n[i],d=c.callback;if(d!==null){if(c.callback=null,c=a,typeof d!="function")throw Error(t(191,d));d.call(c)}}}var ts={},tn=Dn(ts),ns=Dn(ts),rs=Dn(ts);function dr(n){if(n===ts)throw Error(t(174));return n}function nc(n,i){switch(Ne(rs,i),Ne(ns,n),Ne(tn,ts),n=i.nodeType,n){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:rl(null,"");break;default:n=n===8?i.parentNode:i,i=n.namespaceURI||null,n=n.tagName,i=rl(i,n)}be(tn),Ne(tn,i)}function Zr(){be(tn),be(ns),be(rs)}function gf(n){dr(rs.current);var i=dr(tn.current),a=rl(i,n.type);i!==a&&(Ne(ns,n),Ne(tn,a))}function rc(n){ns.current===n&&(be(tn),be(ns))}var Fe=Dn(0);function bo(n){for(var i=n;i!==null;){if(i.tag===13){var a=i.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var ic=[];function sc(){for(var n=0;n<ic.length;n++)ic[n]._workInProgressVersionPrimary=null;ic.length=0}var Ao=ee.ReactCurrentDispatcher,oc=ee.ReactCurrentBatchConfig,hr=0,Ue=null,We=null,Ge=null,Oo=!1,is=!1,ss=0,b0=0;function rt(){throw Error(t(321))}function ac(n,i){if(i===null)return!1;for(var a=0;a<i.length&&a<n.length;a++)if(!zt(n[a],i[a]))return!1;return!0}function lc(n,i,a,c,d,f){if(hr=f,Ue=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,Ao.current=n===null||n.memoizedState===null?D0:M0,n=a(c,d),is){f=0;do{if(is=!1,ss=0,25<=f)throw Error(t(301));f+=1,Ge=We=null,i.updateQueue=null,Ao.current=j0,n=a(c,d)}while(is)}if(Ao.current=Mo,i=We!==null&&We.next!==null,hr=0,Ge=We=Ue=null,Oo=!1,i)throw Error(t(300));return n}function cc(){var n=ss!==0;return ss=0,n}function nn(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ge===null?Ue.memoizedState=Ge=n:Ge=Ge.next=n,Ge}function Ot(){if(We===null){var n=Ue.alternate;n=n!==null?n.memoizedState:null}else n=We.next;var i=Ge===null?Ue.memoizedState:Ge.next;if(i!==null)Ge=i,We=n;else{if(n===null)throw Error(t(310));We=n,n={memoizedState:We.memoizedState,baseState:We.baseState,baseQueue:We.baseQueue,queue:We.queue,next:null},Ge===null?Ue.memoizedState=Ge=n:Ge=Ge.next=n}return Ge}function os(n,i){return typeof i=="function"?i(n):i}function uc(n){var i=Ot(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=We,d=c.baseQueue,f=a.pending;if(f!==null){if(d!==null){var g=d.next;d.next=f.next,f.next=g}c.baseQueue=d=f,a.pending=null}if(d!==null){f=d.next,c=c.baseState;var w=g=null,S=null,N=f;do{var A=N.lane;if((hr&A)===A)S!==null&&(S=S.next={lane:0,action:N.action,hasEagerState:N.hasEagerState,eagerState:N.eagerState,next:null}),c=N.hasEagerState?N.eagerState:n(c,N.action);else{var O={lane:A,action:N.action,hasEagerState:N.hasEagerState,eagerState:N.eagerState,next:null};S===null?(w=S=O,g=c):S=S.next=O,Ue.lanes|=A,fr|=A}N=N.next}while(N!==null&&N!==f);S===null?g=c:S.next=w,zt(c,i.memoizedState)||(gt=!0),i.memoizedState=c,i.baseState=g,i.baseQueue=S,a.lastRenderedState=c}if(n=a.interleaved,n!==null){d=n;do f=d.lane,Ue.lanes|=f,fr|=f,d=d.next;while(d!==n)}else d===null&&(a.lanes=0);return[i.memoizedState,a.dispatch]}function dc(n){var i=Ot(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=a.dispatch,d=a.pending,f=i.memoizedState;if(d!==null){a.pending=null;var g=d=d.next;do f=n(f,g.action),g=g.next;while(g!==d);zt(f,i.memoizedState)||(gt=!0),i.memoizedState=f,i.baseQueue===null&&(i.baseState=f),a.lastRenderedState=f}return[f,c]}function yf(){}function _f(n,i){var a=Ue,c=Ot(),d=i(),f=!zt(c.memoizedState,d);if(f&&(c.memoizedState=d,gt=!0),c=c.queue,hc(Sf.bind(null,a,c,n),[n]),c.getSnapshot!==i||f||Ge!==null&&Ge.memoizedState.tag&1){if(a.flags|=2048,as(9,wf.bind(null,a,c,d,i),void 0,null),qe===null)throw Error(t(349));(hr&30)!==0||vf(a,i,d)}return d}function vf(n,i,a){n.flags|=16384,n={getSnapshot:i,value:a},i=Ue.updateQueue,i===null?(i={lastEffect:null,stores:null},Ue.updateQueue=i,i.stores=[n]):(a=i.stores,a===null?i.stores=[n]:a.push(n))}function wf(n,i,a,c){i.value=a,i.getSnapshot=c,xf(i)&&Ef(n)}function Sf(n,i,a){return a(function(){xf(i)&&Ef(n)})}function xf(n){var i=n.getSnapshot;n=n.value;try{var a=i();return!zt(n,a)}catch{return!0}}function Ef(n){var i=mn(n,1);i!==null&&Wt(i,n,1,-1)}function kf(n){var i=nn();return typeof n=="function"&&(n=n()),i.memoizedState=i.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:os,lastRenderedState:n},i.queue=n,n=n.dispatch=L0.bind(null,Ue,n),[i.memoizedState,n]}function as(n,i,a,c){return n={tag:n,create:i,destroy:a,deps:c,next:null},i=Ue.updateQueue,i===null?(i={lastEffect:null,stores:null},Ue.updateQueue=i,i.lastEffect=n.next=n):(a=i.lastEffect,a===null?i.lastEffect=n.next=n:(c=a.next,a.next=n,n.next=c,i.lastEffect=n)),n}function Cf(){return Ot().memoizedState}function Lo(n,i,a,c){var d=nn();Ue.flags|=n,d.memoizedState=as(1|i,a,void 0,c===void 0?null:c)}function Do(n,i,a,c){var d=Ot();c=c===void 0?null:c;var f=void 0;if(We!==null){var g=We.memoizedState;if(f=g.destroy,c!==null&&ac(c,g.deps)){d.memoizedState=as(i,a,f,c);return}}Ue.flags|=n,d.memoizedState=as(1|i,a,f,c)}function If(n,i){return Lo(8390656,8,n,i)}function hc(n,i){return Do(2048,8,n,i)}function Tf(n,i){return Do(4,2,n,i)}function Nf(n,i){return Do(4,4,n,i)}function Rf(n,i){if(typeof i=="function")return n=n(),i(n),function(){i(null)};if(i!=null)return n=n(),i.current=n,function(){i.current=null}}function Pf(n,i,a){return a=a!=null?a.concat([n]):null,Do(4,4,Rf.bind(null,i,n),a)}function fc(){}function bf(n,i){var a=Ot();i=i===void 0?null:i;var c=a.memoizedState;return c!==null&&i!==null&&ac(i,c[1])?c[0]:(a.memoizedState=[n,i],n)}function Af(n,i){var a=Ot();i=i===void 0?null:i;var c=a.memoizedState;return c!==null&&i!==null&&ac(i,c[1])?c[0]:(n=n(),a.memoizedState=[n,i],n)}function Of(n,i,a){return(hr&21)===0?(n.baseState&&(n.baseState=!1,gt=!0),n.memoizedState=a):(zt(a,i)||(a=lh(),Ue.lanes|=a,fr|=a,n.baseState=!0),i)}function A0(n,i){var a=Se;Se=a!==0&&4>a?a:4,n(!0);var c=oc.transition;oc.transition={};try{n(!1),i()}finally{Se=a,oc.transition=c}}function Lf(){return Ot().memoizedState}function O0(n,i,a){var c=Vn(n);if(a={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null},Df(n))Mf(i,a);else if(a=hf(n,i,a,c),a!==null){var d=ut();Wt(a,n,c,d),jf(a,i,c)}}function L0(n,i,a){var c=Vn(n),d={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null};if(Df(n))Mf(i,d);else{var f=n.alternate;if(n.lanes===0&&(f===null||f.lanes===0)&&(f=i.lastRenderedReducer,f!==null))try{var g=i.lastRenderedState,w=f(g,a);if(d.hasEagerState=!0,d.eagerState=w,zt(w,g)){var S=i.interleaved;S===null?(d.next=d,ec(i)):(d.next=S.next,S.next=d),i.interleaved=d;return}}catch{}finally{}a=hf(n,i,d,c),a!==null&&(d=ut(),Wt(a,n,c,d),jf(a,i,c))}}function Df(n){var i=n.alternate;return n===Ue||i!==null&&i===Ue}function Mf(n,i){is=Oo=!0;var a=n.pending;a===null?i.next=i:(i.next=a.next,a.next=i),n.pending=i}function jf(n,i,a){if((a&4194240)!==0){var c=i.lanes;c&=n.pendingLanes,a|=c,i.lanes=a,ml(n,a)}}var Mo={readContext:At,useCallback:rt,useContext:rt,useEffect:rt,useImperativeHandle:rt,useInsertionEffect:rt,useLayoutEffect:rt,useMemo:rt,useReducer:rt,useRef:rt,useState:rt,useDebugValue:rt,useDeferredValue:rt,useTransition:rt,useMutableSource:rt,useSyncExternalStore:rt,useId:rt,unstable_isNewReconciler:!1},D0={readContext:At,useCallback:function(n,i){return nn().memoizedState=[n,i===void 0?null:i],n},useContext:At,useEffect:If,useImperativeHandle:function(n,i,a){return a=a!=null?a.concat([n]):null,Lo(4194308,4,Rf.bind(null,i,n),a)},useLayoutEffect:function(n,i){return Lo(4194308,4,n,i)},useInsertionEffect:function(n,i){return Lo(4,2,n,i)},useMemo:function(n,i){var a=nn();return i=i===void 0?null:i,n=n(),a.memoizedState=[n,i],n},useReducer:function(n,i,a){var c=nn();return i=a!==void 0?a(i):i,c.memoizedState=c.baseState=i,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:i},c.queue=n,n=n.dispatch=O0.bind(null,Ue,n),[c.memoizedState,n]},useRef:function(n){var i=nn();return n={current:n},i.memoizedState=n},useState:kf,useDebugValue:fc,useDeferredValue:function(n){return nn().memoizedState=n},useTransition:function(){var n=kf(!1),i=n[0];return n=A0.bind(null,n[1]),nn().memoizedState=n,[i,n]},useMutableSource:function(){},useSyncExternalStore:function(n,i,a){var c=Ue,d=nn();if(je){if(a===void 0)throw Error(t(407));a=a()}else{if(a=i(),qe===null)throw Error(t(349));(hr&30)!==0||vf(c,i,a)}d.memoizedState=a;var f={value:a,getSnapshot:i};return d.queue=f,If(Sf.bind(null,c,f,n),[n]),c.flags|=2048,as(9,wf.bind(null,c,f,a,i),void 0,null),a},useId:function(){var n=nn(),i=qe.identifierPrefix;if(je){var a=pn,c=fn;a=(c&~(1<<32-Ut(c)-1)).toString(32)+a,i=":"+i+"R"+a,a=ss++,0<a&&(i+="H"+a.toString(32)),i+=":"}else a=b0++,i=":"+i+"r"+a.toString(32)+":";return n.memoizedState=i},unstable_isNewReconciler:!1},M0={readContext:At,useCallback:bf,useContext:At,useEffect:hc,useImperativeHandle:Pf,useInsertionEffect:Tf,useLayoutEffect:Nf,useMemo:Af,useReducer:uc,useRef:Cf,useState:function(){return uc(os)},useDebugValue:fc,useDeferredValue:function(n){var i=Ot();return Of(i,We.memoizedState,n)},useTransition:function(){var n=uc(os)[0],i=Ot().memoizedState;return[n,i]},useMutableSource:yf,useSyncExternalStore:_f,useId:Lf,unstable_isNewReconciler:!1},j0={readContext:At,useCallback:bf,useContext:At,useEffect:hc,useImperativeHandle:Pf,useInsertionEffect:Tf,useLayoutEffect:Nf,useMemo:Af,useReducer:dc,useRef:Cf,useState:function(){return dc(os)},useDebugValue:fc,useDeferredValue:function(n){var i=Ot();return We===null?i.memoizedState=n:Of(i,We.memoizedState,n)},useTransition:function(){var n=dc(os)[0],i=Ot().memoizedState;return[n,i]},useMutableSource:yf,useSyncExternalStore:_f,useId:Lf,unstable_isNewReconciler:!1};function Bt(n,i){if(n&&n.defaultProps){i=z({},i),n=n.defaultProps;for(var a in n)i[a]===void 0&&(i[a]=n[a]);return i}return i}function pc(n,i,a,c){i=n.memoizedState,a=a(c,i),a=a==null?i:z({},i,a),n.memoizedState=a,n.lanes===0&&(n.updateQueue.baseState=a)}var jo={isMounted:function(n){return(n=n._reactInternals)?sr(n)===n:!1},enqueueSetState:function(n,i,a){n=n._reactInternals;var c=ut(),d=Vn(n),f=gn(c,d);f.payload=i,a!=null&&(f.callback=a),i=Un(n,f,d),i!==null&&(Wt(i,n,d,c),Ro(i,n,d))},enqueueReplaceState:function(n,i,a){n=n._reactInternals;var c=ut(),d=Vn(n),f=gn(c,d);f.tag=1,f.payload=i,a!=null&&(f.callback=a),i=Un(n,f,d),i!==null&&(Wt(i,n,d,c),Ro(i,n,d))},enqueueForceUpdate:function(n,i){n=n._reactInternals;var a=ut(),c=Vn(n),d=gn(a,c);d.tag=2,i!=null&&(d.callback=i),i=Un(n,d,c),i!==null&&(Wt(i,n,c,a),Ro(i,n,c))}};function Ff(n,i,a,c,d,f,g){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(c,f,g):i.prototype&&i.prototype.isPureReactComponent?!Gi(a,c)||!Gi(d,f):!0}function Uf(n,i,a){var c=!1,d=Mn,f=i.contextType;return typeof f=="object"&&f!==null?f=At(f):(d=mt(i)?ar:nt.current,c=i.contextTypes,f=(c=c!=null)?Kr(n,d):Mn),i=new i(a,f),n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=jo,n.stateNode=i,i._reactInternals=n,c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=d,n.__reactInternalMemoizedMaskedChildContext=f),i}function zf(n,i,a,c){n=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(a,c),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(a,c),i.state!==n&&jo.enqueueReplaceState(i,i.state,null)}function mc(n,i,a,c){var d=n.stateNode;d.props=a,d.state=n.memoizedState,d.refs={},tc(n);var f=i.contextType;typeof f=="object"&&f!==null?d.context=At(f):(f=mt(i)?ar:nt.current,d.context=Kr(n,f)),d.state=n.memoizedState,f=i.getDerivedStateFromProps,typeof f=="function"&&(pc(n,i,f,a),d.state=n.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(i=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),i!==d.state&&jo.enqueueReplaceState(d,d.state,null),Po(n,a,d,c),d.state=n.memoizedState),typeof d.componentDidMount=="function"&&(n.flags|=4194308)}function ei(n,i){try{var a="",c=i;do a+=oe(c),c=c.return;while(c);var d=a}catch(f){d=`
Error generating stack: `+f.message+`
`+f.stack}return{value:n,source:i,stack:d,digest:null}}function gc(n,i,a){return{value:n,source:null,stack:a??null,digest:i??null}}function yc(n,i){try{console.error(i.value)}catch(a){setTimeout(function(){throw a})}}var F0=typeof WeakMap=="function"?WeakMap:Map;function $f(n,i,a){a=gn(-1,a),a.tag=3,a.payload={element:null};var c=i.value;return a.callback=function(){Ho||(Ho=!0,Ac=c),yc(n,i)},a}function Bf(n,i,a){a=gn(-1,a),a.tag=3;var c=n.type.getDerivedStateFromError;if(typeof c=="function"){var d=i.value;a.payload=function(){return c(d)},a.callback=function(){yc(n,i)}}var f=n.stateNode;return f!==null&&typeof f.componentDidCatch=="function"&&(a.callback=function(){yc(n,i),typeof c!="function"&&($n===null?$n=new Set([this]):$n.add(this));var g=i.stack;this.componentDidCatch(i.value,{componentStack:g!==null?g:""})}),a}function Vf(n,i,a){var c=n.pingCache;if(c===null){c=n.pingCache=new F0;var d=new Set;c.set(i,d)}else d=c.get(i),d===void 0&&(d=new Set,c.set(i,d));d.has(a)||(d.add(a),n=X0.bind(null,n,i,a),i.then(n,n))}function Hf(n){do{var i;if((i=n.tag===13)&&(i=n.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return n;n=n.return}while(n!==null);return null}function Wf(n,i,a,c,d){return(n.mode&1)===0?(n===i?n.flags|=65536:(n.flags|=128,a.flags|=131072,a.flags&=-52805,a.tag===1&&(a.alternate===null?a.tag=17:(i=gn(-1,1),i.tag=2,Un(a,i,1))),a.lanes|=1),n):(n.flags|=65536,n.lanes=d,n)}var U0=ee.ReactCurrentOwner,gt=!1;function ct(n,i,a,c){i.child=n===null?df(i,null,a,c):Qr(i,n.child,a,c)}function Kf(n,i,a,c,d){a=a.render;var f=i.ref;return Xr(i,d),c=lc(n,i,a,c,f,d),a=cc(),n!==null&&!gt?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~d,yn(n,i,d)):(je&&a&&Wl(i),i.flags|=1,ct(n,i,c,d),i.child)}function Gf(n,i,a,c,d){if(n===null){var f=a.type;return typeof f=="function"&&!Uc(f)&&f.defaultProps===void 0&&a.compare===null&&a.defaultProps===void 0?(i.tag=15,i.type=f,qf(n,i,f,c,d)):(n=Qo(a.type,null,c,i,i.mode,d),n.ref=i.ref,n.return=i,i.child=n)}if(f=n.child,(n.lanes&d)===0){var g=f.memoizedProps;if(a=a.compare,a=a!==null?a:Gi,a(g,c)&&n.ref===i.ref)return yn(n,i,d)}return i.flags|=1,n=Wn(f,c),n.ref=i.ref,n.return=i,i.child=n}function qf(n,i,a,c,d){if(n!==null){var f=n.memoizedProps;if(Gi(f,c)&&n.ref===i.ref)if(gt=!1,i.pendingProps=c=f,(n.lanes&d)!==0)(n.flags&131072)!==0&&(gt=!0);else return i.lanes=n.lanes,yn(n,i,d)}return _c(n,i,a,c,d)}function Yf(n,i,a){var c=i.pendingProps,d=c.children,f=n!==null?n.memoizedState:null;if(c.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ne(ni,Ct),Ct|=a;else{if((a&1073741824)===0)return n=f!==null?f.baseLanes|a:a,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:n,cachePool:null,transitions:null},i.updateQueue=null,Ne(ni,Ct),Ct|=n,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=f!==null?f.baseLanes:a,Ne(ni,Ct),Ct|=c}else f!==null?(c=f.baseLanes|a,i.memoizedState=null):c=a,Ne(ni,Ct),Ct|=c;return ct(n,i,d,a),i.child}function Qf(n,i){var a=i.ref;(n===null&&a!==null||n!==null&&n.ref!==a)&&(i.flags|=512,i.flags|=2097152)}function _c(n,i,a,c,d){var f=mt(a)?ar:nt.current;return f=Kr(i,f),Xr(i,d),a=lc(n,i,a,c,f,d),c=cc(),n!==null&&!gt?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~d,yn(n,i,d)):(je&&c&&Wl(i),i.flags|=1,ct(n,i,a,d),i.child)}function Jf(n,i,a,c,d){if(mt(a)){var f=!0;So(i)}else f=!1;if(Xr(i,d),i.stateNode===null)Uo(n,i),Uf(i,a,c),mc(i,a,c,d),c=!0;else if(n===null){var g=i.stateNode,w=i.memoizedProps;g.props=w;var S=g.context,N=a.contextType;typeof N=="object"&&N!==null?N=At(N):(N=mt(a)?ar:nt.current,N=Kr(i,N));var A=a.getDerivedStateFromProps,O=typeof A=="function"||typeof g.getSnapshotBeforeUpdate=="function";O||typeof g.UNSAFE_componentWillReceiveProps!="function"&&typeof g.componentWillReceiveProps!="function"||(w!==c||S!==N)&&zf(i,g,c,N),Fn=!1;var b=i.memoizedState;g.state=b,Po(i,c,g,d),S=i.memoizedState,w!==c||b!==S||pt.current||Fn?(typeof A=="function"&&(pc(i,a,A,c),S=i.memoizedState),(w=Fn||Ff(i,a,w,c,b,S,N))?(O||typeof g.UNSAFE_componentWillMount!="function"&&typeof g.componentWillMount!="function"||(typeof g.componentWillMount=="function"&&g.componentWillMount(),typeof g.UNSAFE_componentWillMount=="function"&&g.UNSAFE_componentWillMount()),typeof g.componentDidMount=="function"&&(i.flags|=4194308)):(typeof g.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=c,i.memoizedState=S),g.props=c,g.state=S,g.context=N,c=w):(typeof g.componentDidMount=="function"&&(i.flags|=4194308),c=!1)}else{g=i.stateNode,ff(n,i),w=i.memoizedProps,N=i.type===i.elementType?w:Bt(i.type,w),g.props=N,O=i.pendingProps,b=g.context,S=a.contextType,typeof S=="object"&&S!==null?S=At(S):(S=mt(a)?ar:nt.current,S=Kr(i,S));var F=a.getDerivedStateFromProps;(A=typeof F=="function"||typeof g.getSnapshotBeforeUpdate=="function")||typeof g.UNSAFE_componentWillReceiveProps!="function"&&typeof g.componentWillReceiveProps!="function"||(w!==O||b!==S)&&zf(i,g,c,S),Fn=!1,b=i.memoizedState,g.state=b,Po(i,c,g,d);var B=i.memoizedState;w!==O||b!==B||pt.current||Fn?(typeof F=="function"&&(pc(i,a,F,c),B=i.memoizedState),(N=Fn||Ff(i,a,N,c,b,B,S)||!1)?(A||typeof g.UNSAFE_componentWillUpdate!="function"&&typeof g.componentWillUpdate!="function"||(typeof g.componentWillUpdate=="function"&&g.componentWillUpdate(c,B,S),typeof g.UNSAFE_componentWillUpdate=="function"&&g.UNSAFE_componentWillUpdate(c,B,S)),typeof g.componentDidUpdate=="function"&&(i.flags|=4),typeof g.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof g.componentDidUpdate!="function"||w===n.memoizedProps&&b===n.memoizedState||(i.flags|=4),typeof g.getSnapshotBeforeUpdate!="function"||w===n.memoizedProps&&b===n.memoizedState||(i.flags|=1024),i.memoizedProps=c,i.memoizedState=B),g.props=c,g.state=B,g.context=S,c=N):(typeof g.componentDidUpdate!="function"||w===n.memoizedProps&&b===n.memoizedState||(i.flags|=4),typeof g.getSnapshotBeforeUpdate!="function"||w===n.memoizedProps&&b===n.memoizedState||(i.flags|=1024),c=!1)}return vc(n,i,a,c,f,d)}function vc(n,i,a,c,d,f){Qf(n,i);var g=(i.flags&128)!==0;if(!c&&!g)return d&&tf(i,a,!1),yn(n,i,f);c=i.stateNode,U0.current=i;var w=g&&typeof a.getDerivedStateFromError!="function"?null:c.render();return i.flags|=1,n!==null&&g?(i.child=Qr(i,n.child,null,f),i.child=Qr(i,null,w,f)):ct(n,i,w,f),i.memoizedState=c.state,d&&tf(i,a,!0),i.child}function Xf(n){var i=n.stateNode;i.pendingContext?Zh(n,i.pendingContext,i.pendingContext!==i.context):i.context&&Zh(n,i.context,!1),nc(n,i.containerInfo)}function Zf(n,i,a,c,d){return Yr(),Yl(d),i.flags|=256,ct(n,i,a,c),i.child}var wc={dehydrated:null,treeContext:null,retryLane:0};function Sc(n){return{baseLanes:n,cachePool:null,transitions:null}}function ep(n,i,a){var c=i.pendingProps,d=Fe.current,f=!1,g=(i.flags&128)!==0,w;if((w=g)||(w=n!==null&&n.memoizedState===null?!1:(d&2)!==0),w?(f=!0,i.flags&=-129):(n===null||n.memoizedState!==null)&&(d|=1),Ne(Fe,d&1),n===null)return ql(i),n=i.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((i.mode&1)===0?i.lanes=1:n.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(g=c.children,n=c.fallback,f?(c=i.mode,f=i.child,g={mode:"hidden",children:g},(c&1)===0&&f!==null?(f.childLanes=0,f.pendingProps=g):f=Jo(g,c,0,null),n=yr(n,c,a,null),f.return=i,n.return=i,f.sibling=n,i.child=f,i.child.memoizedState=Sc(a),i.memoizedState=wc,n):xc(i,g));if(d=n.memoizedState,d!==null&&(w=d.dehydrated,w!==null))return z0(n,i,g,c,w,d,a);if(f){f=c.fallback,g=i.mode,d=n.child,w=d.sibling;var S={mode:"hidden",children:c.children};return(g&1)===0&&i.child!==d?(c=i.child,c.childLanes=0,c.pendingProps=S,i.deletions=null):(c=Wn(d,S),c.subtreeFlags=d.subtreeFlags&14680064),w!==null?f=Wn(w,f):(f=yr(f,g,a,null),f.flags|=2),f.return=i,c.return=i,c.sibling=f,i.child=c,c=f,f=i.child,g=n.child.memoizedState,g=g===null?Sc(a):{baseLanes:g.baseLanes|a,cachePool:null,transitions:g.transitions},f.memoizedState=g,f.childLanes=n.childLanes&~a,i.memoizedState=wc,c}return f=n.child,n=f.sibling,c=Wn(f,{mode:"visible",children:c.children}),(i.mode&1)===0&&(c.lanes=a),c.return=i,c.sibling=null,n!==null&&(a=i.deletions,a===null?(i.deletions=[n],i.flags|=16):a.push(n)),i.child=c,i.memoizedState=null,c}function xc(n,i){return i=Jo({mode:"visible",children:i},n.mode,0,null),i.return=n,n.child=i}function Fo(n,i,a,c){return c!==null&&Yl(c),Qr(i,n.child,null,a),n=xc(i,i.pendingProps.children),n.flags|=2,i.memoizedState=null,n}function z0(n,i,a,c,d,f,g){if(a)return i.flags&256?(i.flags&=-257,c=gc(Error(t(422))),Fo(n,i,g,c)):i.memoizedState!==null?(i.child=n.child,i.flags|=128,null):(f=c.fallback,d=i.mode,c=Jo({mode:"visible",children:c.children},d,0,null),f=yr(f,d,g,null),f.flags|=2,c.return=i,f.return=i,c.sibling=f,i.child=c,(i.mode&1)!==0&&Qr(i,n.child,null,g),i.child.memoizedState=Sc(g),i.memoizedState=wc,f);if((i.mode&1)===0)return Fo(n,i,g,null);if(d.data==="$!"){if(c=d.nextSibling&&d.nextSibling.dataset,c)var w=c.dgst;return c=w,f=Error(t(419)),c=gc(f,c,void 0),Fo(n,i,g,c)}if(w=(g&n.childLanes)!==0,gt||w){if(c=qe,c!==null){switch(g&-g){case 4:d=2;break;case 16:d=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:d=32;break;case 536870912:d=268435456;break;default:d=0}d=(d&(c.suspendedLanes|g))!==0?0:d,d!==0&&d!==f.retryLane&&(f.retryLane=d,mn(n,d),Wt(c,n,d,-1))}return Fc(),c=gc(Error(t(421))),Fo(n,i,g,c)}return d.data==="$?"?(i.flags|=128,i.child=n.child,i=Z0.bind(null,n),d._reactRetry=i,null):(n=f.treeContext,kt=Ln(d.nextSibling),Et=i,je=!0,$t=null,n!==null&&(Pt[bt++]=fn,Pt[bt++]=pn,Pt[bt++]=lr,fn=n.id,pn=n.overflow,lr=i),i=xc(i,c.children),i.flags|=4096,i)}function tp(n,i,a){n.lanes|=i;var c=n.alternate;c!==null&&(c.lanes|=i),Zl(n.return,i,a)}function Ec(n,i,a,c,d){var f=n.memoizedState;f===null?n.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:c,tail:a,tailMode:d}:(f.isBackwards=i,f.rendering=null,f.renderingStartTime=0,f.last=c,f.tail=a,f.tailMode=d)}function np(n,i,a){var c=i.pendingProps,d=c.revealOrder,f=c.tail;if(ct(n,i,c.children,a),c=Fe.current,(c&2)!==0)c=c&1|2,i.flags|=128;else{if(n!==null&&(n.flags&128)!==0)e:for(n=i.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&tp(n,a,i);else if(n.tag===19)tp(n,a,i);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===i)break e;for(;n.sibling===null;){if(n.return===null||n.return===i)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}c&=1}if(Ne(Fe,c),(i.mode&1)===0)i.memoizedState=null;else switch(d){case"forwards":for(a=i.child,d=null;a!==null;)n=a.alternate,n!==null&&bo(n)===null&&(d=a),a=a.sibling;a=d,a===null?(d=i.child,i.child=null):(d=a.sibling,a.sibling=null),Ec(i,!1,d,a,f);break;case"backwards":for(a=null,d=i.child,i.child=null;d!==null;){if(n=d.alternate,n!==null&&bo(n)===null){i.child=d;break}n=d.sibling,d.sibling=a,a=d,d=n}Ec(i,!0,a,null,f);break;case"together":Ec(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function Uo(n,i){(i.mode&1)===0&&n!==null&&(n.alternate=null,i.alternate=null,i.flags|=2)}function yn(n,i,a){if(n!==null&&(i.dependencies=n.dependencies),fr|=i.lanes,(a&i.childLanes)===0)return null;if(n!==null&&i.child!==n.child)throw Error(t(153));if(i.child!==null){for(n=i.child,a=Wn(n,n.pendingProps),i.child=a,a.return=i;n.sibling!==null;)n=n.sibling,a=a.sibling=Wn(n,n.pendingProps),a.return=i;a.sibling=null}return i.child}function $0(n,i,a){switch(i.tag){case 3:Xf(i),Yr();break;case 5:gf(i);break;case 1:mt(i.type)&&So(i);break;case 4:nc(i,i.stateNode.containerInfo);break;case 10:var c=i.type._context,d=i.memoizedProps.value;Ne(To,c._currentValue),c._currentValue=d;break;case 13:if(c=i.memoizedState,c!==null)return c.dehydrated!==null?(Ne(Fe,Fe.current&1),i.flags|=128,null):(a&i.child.childLanes)!==0?ep(n,i,a):(Ne(Fe,Fe.current&1),n=yn(n,i,a),n!==null?n.sibling:null);Ne(Fe,Fe.current&1);break;case 19:if(c=(a&i.childLanes)!==0,(n.flags&128)!==0){if(c)return np(n,i,a);i.flags|=128}if(d=i.memoizedState,d!==null&&(d.rendering=null,d.tail=null,d.lastEffect=null),Ne(Fe,Fe.current),c)break;return null;case 22:case 23:return i.lanes=0,Yf(n,i,a)}return yn(n,i,a)}var rp,kc,ip,sp;rp=function(n,i){for(var a=i.child;a!==null;){if(a.tag===5||a.tag===6)n.appendChild(a.stateNode);else if(a.tag!==4&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===i)break;for(;a.sibling===null;){if(a.return===null||a.return===i)return;a=a.return}a.sibling.return=a.return,a=a.sibling}},kc=function(){},ip=function(n,i,a,c){var d=n.memoizedProps;if(d!==c){n=i.stateNode,dr(tn.current);var f=null;switch(a){case"input":d=Za(n,d),c=Za(n,c),f=[];break;case"select":d=z({},d,{value:void 0}),c=z({},c,{value:void 0}),f=[];break;case"textarea":d=nl(n,d),c=nl(n,c),f=[];break;default:typeof d.onClick!="function"&&typeof c.onClick=="function"&&(n.onclick=_o)}il(a,c);var g;a=null;for(N in d)if(!c.hasOwnProperty(N)&&d.hasOwnProperty(N)&&d[N]!=null)if(N==="style"){var w=d[N];for(g in w)w.hasOwnProperty(g)&&(a||(a={}),a[g]="")}else N!=="dangerouslySetInnerHTML"&&N!=="children"&&N!=="suppressContentEditableWarning"&&N!=="suppressHydrationWarning"&&N!=="autoFocus"&&(o.hasOwnProperty(N)?f||(f=[]):(f=f||[]).push(N,null));for(N in c){var S=c[N];if(w=d!=null?d[N]:void 0,c.hasOwnProperty(N)&&S!==w&&(S!=null||w!=null))if(N==="style")if(w){for(g in w)!w.hasOwnProperty(g)||S&&S.hasOwnProperty(g)||(a||(a={}),a[g]="");for(g in S)S.hasOwnProperty(g)&&w[g]!==S[g]&&(a||(a={}),a[g]=S[g])}else a||(f||(f=[]),f.push(N,a)),a=S;else N==="dangerouslySetInnerHTML"?(S=S?S.__html:void 0,w=w?w.__html:void 0,S!=null&&w!==S&&(f=f||[]).push(N,S)):N==="children"?typeof S!="string"&&typeof S!="number"||(f=f||[]).push(N,""+S):N!=="suppressContentEditableWarning"&&N!=="suppressHydrationWarning"&&(o.hasOwnProperty(N)?(S!=null&&N==="onScroll"&&Pe("scroll",n),f||w===S||(f=[])):(f=f||[]).push(N,S))}a&&(f=f||[]).push("style",a);var N=f;(i.updateQueue=N)&&(i.flags|=4)}},sp=function(n,i,a,c){a!==c&&(i.flags|=4)};function ls(n,i){if(!je)switch(n.tailMode){case"hidden":i=n.tail;for(var a=null;i!==null;)i.alternate!==null&&(a=i),i=i.sibling;a===null?n.tail=null:a.sibling=null;break;case"collapsed":a=n.tail;for(var c=null;a!==null;)a.alternate!==null&&(c=a),a=a.sibling;c===null?i||n.tail===null?n.tail=null:n.tail.sibling=null:c.sibling=null}}function it(n){var i=n.alternate!==null&&n.alternate.child===n.child,a=0,c=0;if(i)for(var d=n.child;d!==null;)a|=d.lanes|d.childLanes,c|=d.subtreeFlags&14680064,c|=d.flags&14680064,d.return=n,d=d.sibling;else for(d=n.child;d!==null;)a|=d.lanes|d.childLanes,c|=d.subtreeFlags,c|=d.flags,d.return=n,d=d.sibling;return n.subtreeFlags|=c,n.childLanes=a,i}function B0(n,i,a){var c=i.pendingProps;switch(Kl(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return it(i),null;case 1:return mt(i.type)&&wo(),it(i),null;case 3:return c=i.stateNode,Zr(),be(pt),be(nt),sc(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(n===null||n.child===null)&&(Co(i)?i.flags|=4:n===null||n.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,$t!==null&&(Dc($t),$t=null))),kc(n,i),it(i),null;case 5:rc(i);var d=dr(rs.current);if(a=i.type,n!==null&&i.stateNode!=null)ip(n,i,a,c,d),n.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!c){if(i.stateNode===null)throw Error(t(166));return it(i),null}if(n=dr(tn.current),Co(i)){c=i.stateNode,a=i.type;var f=i.memoizedProps;switch(c[en]=i,c[Xi]=f,n=(i.mode&1)!==0,a){case"dialog":Pe("cancel",c),Pe("close",c);break;case"iframe":case"object":case"embed":Pe("load",c);break;case"video":case"audio":for(d=0;d<Yi.length;d++)Pe(Yi[d],c);break;case"source":Pe("error",c);break;case"img":case"image":case"link":Pe("error",c),Pe("load",c);break;case"details":Pe("toggle",c);break;case"input":Fd(c,f),Pe("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!f.multiple},Pe("invalid",c);break;case"textarea":$d(c,f),Pe("invalid",c)}il(a,f),d=null;for(var g in f)if(f.hasOwnProperty(g)){var w=f[g];g==="children"?typeof w=="string"?c.textContent!==w&&(f.suppressHydrationWarning!==!0&&yo(c.textContent,w,n),d=["children",w]):typeof w=="number"&&c.textContent!==""+w&&(f.suppressHydrationWarning!==!0&&yo(c.textContent,w,n),d=["children",""+w]):o.hasOwnProperty(g)&&w!=null&&g==="onScroll"&&Pe("scroll",c)}switch(a){case"input":Gs(c),zd(c,f,!0);break;case"textarea":Gs(c),Vd(c);break;case"select":case"option":break;default:typeof f.onClick=="function"&&(c.onclick=_o)}c=d,i.updateQueue=c,c!==null&&(i.flags|=4)}else{g=d.nodeType===9?d:d.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=Hd(a)),n==="http://www.w3.org/1999/xhtml"?a==="script"?(n=g.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof c.is=="string"?n=g.createElement(a,{is:c.is}):(n=g.createElement(a),a==="select"&&(g=n,c.multiple?g.multiple=!0:c.size&&(g.size=c.size))):n=g.createElementNS(n,a),n[en]=i,n[Xi]=c,rp(n,i,!1,!1),i.stateNode=n;e:{switch(g=sl(a,c),a){case"dialog":Pe("cancel",n),Pe("close",n),d=c;break;case"iframe":case"object":case"embed":Pe("load",n),d=c;break;case"video":case"audio":for(d=0;d<Yi.length;d++)Pe(Yi[d],n);d=c;break;case"source":Pe("error",n),d=c;break;case"img":case"image":case"link":Pe("error",n),Pe("load",n),d=c;break;case"details":Pe("toggle",n),d=c;break;case"input":Fd(n,c),d=Za(n,c),Pe("invalid",n);break;case"option":d=c;break;case"select":n._wrapperState={wasMultiple:!!c.multiple},d=z({},c,{value:void 0}),Pe("invalid",n);break;case"textarea":$d(n,c),d=nl(n,c),Pe("invalid",n);break;default:d=c}il(a,d),w=d;for(f in w)if(w.hasOwnProperty(f)){var S=w[f];f==="style"?Gd(n,S):f==="dangerouslySetInnerHTML"?(S=S?S.__html:void 0,S!=null&&Wd(n,S)):f==="children"?typeof S=="string"?(a!=="textarea"||S!=="")&&Pi(n,S):typeof S=="number"&&Pi(n,""+S):f!=="suppressContentEditableWarning"&&f!=="suppressHydrationWarning"&&f!=="autoFocus"&&(o.hasOwnProperty(f)?S!=null&&f==="onScroll"&&Pe("scroll",n):S!=null&&fe(n,f,S,g))}switch(a){case"input":Gs(n),zd(n,c,!1);break;case"textarea":Gs(n),Vd(n);break;case"option":c.value!=null&&n.setAttribute("value",""+we(c.value));break;case"select":n.multiple=!!c.multiple,f=c.value,f!=null?Lr(n,!!c.multiple,f,!1):c.defaultValue!=null&&Lr(n,!!c.multiple,c.defaultValue,!0);break;default:typeof d.onClick=="function"&&(n.onclick=_o)}switch(a){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return it(i),null;case 6:if(n&&i.stateNode!=null)sp(n,i,n.memoizedProps,c);else{if(typeof c!="string"&&i.stateNode===null)throw Error(t(166));if(a=dr(rs.current),dr(tn.current),Co(i)){if(c=i.stateNode,a=i.memoizedProps,c[en]=i,(f=c.nodeValue!==a)&&(n=Et,n!==null))switch(n.tag){case 3:yo(c.nodeValue,a,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&yo(c.nodeValue,a,(n.mode&1)!==0)}f&&(i.flags|=4)}else c=(a.nodeType===9?a:a.ownerDocument).createTextNode(c),c[en]=i,i.stateNode=c}return it(i),null;case 13:if(be(Fe),c=i.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(je&&kt!==null&&(i.mode&1)!==0&&(i.flags&128)===0)lf(),Yr(),i.flags|=98560,f=!1;else if(f=Co(i),c!==null&&c.dehydrated!==null){if(n===null){if(!f)throw Error(t(318));if(f=i.memoizedState,f=f!==null?f.dehydrated:null,!f)throw Error(t(317));f[en]=i}else Yr(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;it(i),f=!1}else $t!==null&&(Dc($t),$t=null),f=!0;if(!f)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=a,i):(c=c!==null,c!==(n!==null&&n.memoizedState!==null)&&c&&(i.child.flags|=8192,(i.mode&1)!==0&&(n===null||(Fe.current&1)!==0?Ke===0&&(Ke=3):Fc())),i.updateQueue!==null&&(i.flags|=4),it(i),null);case 4:return Zr(),kc(n,i),n===null&&Qi(i.stateNode.containerInfo),it(i),null;case 10:return Xl(i.type._context),it(i),null;case 17:return mt(i.type)&&wo(),it(i),null;case 19:if(be(Fe),f=i.memoizedState,f===null)return it(i),null;if(c=(i.flags&128)!==0,g=f.rendering,g===null)if(c)ls(f,!1);else{if(Ke!==0||n!==null&&(n.flags&128)!==0)for(n=i.child;n!==null;){if(g=bo(n),g!==null){for(i.flags|=128,ls(f,!1),c=g.updateQueue,c!==null&&(i.updateQueue=c,i.flags|=4),i.subtreeFlags=0,c=a,a=i.child;a!==null;)f=a,n=c,f.flags&=14680066,g=f.alternate,g===null?(f.childLanes=0,f.lanes=n,f.child=null,f.subtreeFlags=0,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.subtreeFlags=0,f.deletions=null,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,f.updateQueue=g.updateQueue,f.type=g.type,n=g.dependencies,f.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),a=a.sibling;return Ne(Fe,Fe.current&1|2),i.child}n=n.sibling}f.tail!==null&&$e()>ri&&(i.flags|=128,c=!0,ls(f,!1),i.lanes=4194304)}else{if(!c)if(n=bo(g),n!==null){if(i.flags|=128,c=!0,a=n.updateQueue,a!==null&&(i.updateQueue=a,i.flags|=4),ls(f,!0),f.tail===null&&f.tailMode==="hidden"&&!g.alternate&&!je)return it(i),null}else 2*$e()-f.renderingStartTime>ri&&a!==1073741824&&(i.flags|=128,c=!0,ls(f,!1),i.lanes=4194304);f.isBackwards?(g.sibling=i.child,i.child=g):(a=f.last,a!==null?a.sibling=g:i.child=g,f.last=g)}return f.tail!==null?(i=f.tail,f.rendering=i,f.tail=i.sibling,f.renderingStartTime=$e(),i.sibling=null,a=Fe.current,Ne(Fe,c?a&1|2:a&1),i):(it(i),null);case 22:case 23:return jc(),c=i.memoizedState!==null,n!==null&&n.memoizedState!==null!==c&&(i.flags|=8192),c&&(i.mode&1)!==0?(Ct&1073741824)!==0&&(it(i),i.subtreeFlags&6&&(i.flags|=8192)):it(i),null;case 24:return null;case 25:return null}throw Error(t(156,i.tag))}function V0(n,i){switch(Kl(i),i.tag){case 1:return mt(i.type)&&wo(),n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 3:return Zr(),be(pt),be(nt),sc(),n=i.flags,(n&65536)!==0&&(n&128)===0?(i.flags=n&-65537|128,i):null;case 5:return rc(i),null;case 13:if(be(Fe),n=i.memoizedState,n!==null&&n.dehydrated!==null){if(i.alternate===null)throw Error(t(340));Yr()}return n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 19:return be(Fe),null;case 4:return Zr(),null;case 10:return Xl(i.type._context),null;case 22:case 23:return jc(),null;case 24:return null;default:return null}}var zo=!1,st=!1,H0=typeof WeakSet=="function"?WeakSet:Set,$=null;function ti(n,i){var a=n.ref;if(a!==null)if(typeof a=="function")try{a(null)}catch(c){ze(n,i,c)}else a.current=null}function Cc(n,i,a){try{a()}catch(c){ze(n,i,c)}}var op=!1;function W0(n,i){if(jl=so,n=jh(),Rl(n)){if("selectionStart"in n)var a={start:n.selectionStart,end:n.selectionEnd};else e:{a=(a=n.ownerDocument)&&a.defaultView||window;var c=a.getSelection&&a.getSelection();if(c&&c.rangeCount!==0){a=c.anchorNode;var d=c.anchorOffset,f=c.focusNode;c=c.focusOffset;try{a.nodeType,f.nodeType}catch{a=null;break e}var g=0,w=-1,S=-1,N=0,A=0,O=n,b=null;t:for(;;){for(var F;O!==a||d!==0&&O.nodeType!==3||(w=g+d),O!==f||c!==0&&O.nodeType!==3||(S=g+c),O.nodeType===3&&(g+=O.nodeValue.length),(F=O.firstChild)!==null;)b=O,O=F;for(;;){if(O===n)break t;if(b===a&&++N===d&&(w=g),b===f&&++A===c&&(S=g),(F=O.nextSibling)!==null)break;O=b,b=O.parentNode}O=F}a=w===-1||S===-1?null:{start:w,end:S}}else a=null}a=a||{start:0,end:0}}else a=null;for(Fl={focusedElem:n,selectionRange:a},so=!1,$=i;$!==null;)if(i=$,n=i.child,(i.subtreeFlags&1028)!==0&&n!==null)n.return=i,$=n;else for(;$!==null;){i=$;try{var B=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(B!==null){var V=B.memoizedProps,Be=B.memoizedState,C=i.stateNode,E=C.getSnapshotBeforeUpdate(i.elementType===i.type?V:Bt(i.type,V),Be);C.__reactInternalSnapshotBeforeUpdate=E}break;case 3:var I=i.stateNode.containerInfo;I.nodeType===1?I.textContent="":I.nodeType===9&&I.documentElement&&I.removeChild(I.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(D){ze(i,i.return,D)}if(n=i.sibling,n!==null){n.return=i.return,$=n;break}$=i.return}return B=op,op=!1,B}function cs(n,i,a){var c=i.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var d=c=c.next;do{if((d.tag&n)===n){var f=d.destroy;d.destroy=void 0,f!==void 0&&Cc(i,a,f)}d=d.next}while(d!==c)}}function $o(n,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var a=i=i.next;do{if((a.tag&n)===n){var c=a.create;a.destroy=c()}a=a.next}while(a!==i)}}function Ic(n){var i=n.ref;if(i!==null){var a=n.stateNode;switch(n.tag){case 5:n=a;break;default:n=a}typeof i=="function"?i(n):i.current=n}}function ap(n){var i=n.alternate;i!==null&&(n.alternate=null,ap(i)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(i=n.stateNode,i!==null&&(delete i[en],delete i[Xi],delete i[Bl],delete i[T0],delete i[N0])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function lp(n){return n.tag===5||n.tag===3||n.tag===4}function cp(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||lp(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function Tc(n,i,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?a.nodeType===8?a.parentNode.insertBefore(n,i):a.insertBefore(n,i):(a.nodeType===8?(i=a.parentNode,i.insertBefore(n,a)):(i=a,i.appendChild(n)),a=a._reactRootContainer,a!=null||i.onclick!==null||(i.onclick=_o));else if(c!==4&&(n=n.child,n!==null))for(Tc(n,i,a),n=n.sibling;n!==null;)Tc(n,i,a),n=n.sibling}function Nc(n,i,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?a.insertBefore(n,i):a.appendChild(n);else if(c!==4&&(n=n.child,n!==null))for(Nc(n,i,a),n=n.sibling;n!==null;)Nc(n,i,a),n=n.sibling}var Ze=null,Vt=!1;function zn(n,i,a){for(a=a.child;a!==null;)up(n,i,a),a=a.sibling}function up(n,i,a){if(Zt&&typeof Zt.onCommitFiberUnmount=="function")try{Zt.onCommitFiberUnmount(Zs,a)}catch{}switch(a.tag){case 5:st||ti(a,i);case 6:var c=Ze,d=Vt;Ze=null,zn(n,i,a),Ze=c,Vt=d,Ze!==null&&(Vt?(n=Ze,a=a.stateNode,n.nodeType===8?n.parentNode.removeChild(a):n.removeChild(a)):Ze.removeChild(a.stateNode));break;case 18:Ze!==null&&(Vt?(n=Ze,a=a.stateNode,n.nodeType===8?$l(n.parentNode,a):n.nodeType===1&&$l(n,a),$i(n)):$l(Ze,a.stateNode));break;case 4:c=Ze,d=Vt,Ze=a.stateNode.containerInfo,Vt=!0,zn(n,i,a),Ze=c,Vt=d;break;case 0:case 11:case 14:case 15:if(!st&&(c=a.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){d=c=c.next;do{var f=d,g=f.destroy;f=f.tag,g!==void 0&&((f&2)!==0||(f&4)!==0)&&Cc(a,i,g),d=d.next}while(d!==c)}zn(n,i,a);break;case 1:if(!st&&(ti(a,i),c=a.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=a.memoizedProps,c.state=a.memoizedState,c.componentWillUnmount()}catch(w){ze(a,i,w)}zn(n,i,a);break;case 21:zn(n,i,a);break;case 22:a.mode&1?(st=(c=st)||a.memoizedState!==null,zn(n,i,a),st=c):zn(n,i,a);break;default:zn(n,i,a)}}function dp(n){var i=n.updateQueue;if(i!==null){n.updateQueue=null;var a=n.stateNode;a===null&&(a=n.stateNode=new H0),i.forEach(function(c){var d=ew.bind(null,n,c);a.has(c)||(a.add(c),c.then(d,d))})}}function Ht(n,i){var a=i.deletions;if(a!==null)for(var c=0;c<a.length;c++){var d=a[c];try{var f=n,g=i,w=g;e:for(;w!==null;){switch(w.tag){case 5:Ze=w.stateNode,Vt=!1;break e;case 3:Ze=w.stateNode.containerInfo,Vt=!0;break e;case 4:Ze=w.stateNode.containerInfo,Vt=!0;break e}w=w.return}if(Ze===null)throw Error(t(160));up(f,g,d),Ze=null,Vt=!1;var S=d.alternate;S!==null&&(S.return=null),d.return=null}catch(N){ze(d,i,N)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)hp(i,n),i=i.sibling}function hp(n,i){var a=n.alternate,c=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(Ht(i,n),rn(n),c&4){try{cs(3,n,n.return),$o(3,n)}catch(V){ze(n,n.return,V)}try{cs(5,n,n.return)}catch(V){ze(n,n.return,V)}}break;case 1:Ht(i,n),rn(n),c&512&&a!==null&&ti(a,a.return);break;case 5:if(Ht(i,n),rn(n),c&512&&a!==null&&ti(a,a.return),n.flags&32){var d=n.stateNode;try{Pi(d,"")}catch(V){ze(n,n.return,V)}}if(c&4&&(d=n.stateNode,d!=null)){var f=n.memoizedProps,g=a!==null?a.memoizedProps:f,w=n.type,S=n.updateQueue;if(n.updateQueue=null,S!==null)try{w==="input"&&f.type==="radio"&&f.name!=null&&Ud(d,f),sl(w,g);var N=sl(w,f);for(g=0;g<S.length;g+=2){var A=S[g],O=S[g+1];A==="style"?Gd(d,O):A==="dangerouslySetInnerHTML"?Wd(d,O):A==="children"?Pi(d,O):fe(d,A,O,N)}switch(w){case"input":el(d,f);break;case"textarea":Bd(d,f);break;case"select":var b=d._wrapperState.wasMultiple;d._wrapperState.wasMultiple=!!f.multiple;var F=f.value;F!=null?Lr(d,!!f.multiple,F,!1):b!==!!f.multiple&&(f.defaultValue!=null?Lr(d,!!f.multiple,f.defaultValue,!0):Lr(d,!!f.multiple,f.multiple?[]:"",!1))}d[Xi]=f}catch(V){ze(n,n.return,V)}}break;case 6:if(Ht(i,n),rn(n),c&4){if(n.stateNode===null)throw Error(t(162));d=n.stateNode,f=n.memoizedProps;try{d.nodeValue=f}catch(V){ze(n,n.return,V)}}break;case 3:if(Ht(i,n),rn(n),c&4&&a!==null&&a.memoizedState.isDehydrated)try{$i(i.containerInfo)}catch(V){ze(n,n.return,V)}break;case 4:Ht(i,n),rn(n);break;case 13:Ht(i,n),rn(n),d=n.child,d.flags&8192&&(f=d.memoizedState!==null,d.stateNode.isHidden=f,!f||d.alternate!==null&&d.alternate.memoizedState!==null||(bc=$e())),c&4&&dp(n);break;case 22:if(A=a!==null&&a.memoizedState!==null,n.mode&1?(st=(N=st)||A,Ht(i,n),st=N):Ht(i,n),rn(n),c&8192){if(N=n.memoizedState!==null,(n.stateNode.isHidden=N)&&!A&&(n.mode&1)!==0)for($=n,A=n.child;A!==null;){for(O=$=A;$!==null;){switch(b=$,F=b.child,b.tag){case 0:case 11:case 14:case 15:cs(4,b,b.return);break;case 1:ti(b,b.return);var B=b.stateNode;if(typeof B.componentWillUnmount=="function"){c=b,a=b.return;try{i=c,B.props=i.memoizedProps,B.state=i.memoizedState,B.componentWillUnmount()}catch(V){ze(c,a,V)}}break;case 5:ti(b,b.return);break;case 22:if(b.memoizedState!==null){mp(O);continue}}F!==null?(F.return=b,$=F):mp(O)}A=A.sibling}e:for(A=null,O=n;;){if(O.tag===5){if(A===null){A=O;try{d=O.stateNode,N?(f=d.style,typeof f.setProperty=="function"?f.setProperty("display","none","important"):f.display="none"):(w=O.stateNode,S=O.memoizedProps.style,g=S!=null&&S.hasOwnProperty("display")?S.display:null,w.style.display=Kd("display",g))}catch(V){ze(n,n.return,V)}}}else if(O.tag===6){if(A===null)try{O.stateNode.nodeValue=N?"":O.memoizedProps}catch(V){ze(n,n.return,V)}}else if((O.tag!==22&&O.tag!==23||O.memoizedState===null||O===n)&&O.child!==null){O.child.return=O,O=O.child;continue}if(O===n)break e;for(;O.sibling===null;){if(O.return===null||O.return===n)break e;A===O&&(A=null),O=O.return}A===O&&(A=null),O.sibling.return=O.return,O=O.sibling}}break;case 19:Ht(i,n),rn(n),c&4&&dp(n);break;case 21:break;default:Ht(i,n),rn(n)}}function rn(n){var i=n.flags;if(i&2){try{e:{for(var a=n.return;a!==null;){if(lp(a)){var c=a;break e}a=a.return}throw Error(t(160))}switch(c.tag){case 5:var d=c.stateNode;c.flags&32&&(Pi(d,""),c.flags&=-33);var f=cp(n);Nc(n,f,d);break;case 3:case 4:var g=c.stateNode.containerInfo,w=cp(n);Tc(n,w,g);break;default:throw Error(t(161))}}catch(S){ze(n,n.return,S)}n.flags&=-3}i&4096&&(n.flags&=-4097)}function K0(n,i,a){$=n,fp(n)}function fp(n,i,a){for(var c=(n.mode&1)!==0;$!==null;){var d=$,f=d.child;if(d.tag===22&&c){var g=d.memoizedState!==null||zo;if(!g){var w=d.alternate,S=w!==null&&w.memoizedState!==null||st;w=zo;var N=st;if(zo=g,(st=S)&&!N)for($=d;$!==null;)g=$,S=g.child,g.tag===22&&g.memoizedState!==null?gp(d):S!==null?(S.return=g,$=S):gp(d);for(;f!==null;)$=f,fp(f),f=f.sibling;$=d,zo=w,st=N}pp(n)}else(d.subtreeFlags&8772)!==0&&f!==null?(f.return=d,$=f):pp(n)}}function pp(n){for(;$!==null;){var i=$;if((i.flags&8772)!==0){var a=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:st||$o(5,i);break;case 1:var c=i.stateNode;if(i.flags&4&&!st)if(a===null)c.componentDidMount();else{var d=i.elementType===i.type?a.memoizedProps:Bt(i.type,a.memoizedProps);c.componentDidUpdate(d,a.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var f=i.updateQueue;f!==null&&mf(i,f,c);break;case 3:var g=i.updateQueue;if(g!==null){if(a=null,i.child!==null)switch(i.child.tag){case 5:a=i.child.stateNode;break;case 1:a=i.child.stateNode}mf(i,g,a)}break;case 5:var w=i.stateNode;if(a===null&&i.flags&4){a=w;var S=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":S.autoFocus&&a.focus();break;case"img":S.src&&(a.src=S.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var N=i.alternate;if(N!==null){var A=N.memoizedState;if(A!==null){var O=A.dehydrated;O!==null&&$i(O)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}st||i.flags&512&&Ic(i)}catch(b){ze(i,i.return,b)}}if(i===n){$=null;break}if(a=i.sibling,a!==null){a.return=i.return,$=a;break}$=i.return}}function mp(n){for(;$!==null;){var i=$;if(i===n){$=null;break}var a=i.sibling;if(a!==null){a.return=i.return,$=a;break}$=i.return}}function gp(n){for(;$!==null;){var i=$;try{switch(i.tag){case 0:case 11:case 15:var a=i.return;try{$o(4,i)}catch(S){ze(i,a,S)}break;case 1:var c=i.stateNode;if(typeof c.componentDidMount=="function"){var d=i.return;try{c.componentDidMount()}catch(S){ze(i,d,S)}}var f=i.return;try{Ic(i)}catch(S){ze(i,f,S)}break;case 5:var g=i.return;try{Ic(i)}catch(S){ze(i,g,S)}}}catch(S){ze(i,i.return,S)}if(i===n){$=null;break}var w=i.sibling;if(w!==null){w.return=i.return,$=w;break}$=i.return}}var G0=Math.ceil,Bo=ee.ReactCurrentDispatcher,Rc=ee.ReactCurrentOwner,Lt=ee.ReactCurrentBatchConfig,he=0,qe=null,He=null,et=0,Ct=0,ni=Dn(0),Ke=0,us=null,fr=0,Vo=0,Pc=0,ds=null,yt=null,bc=0,ri=1/0,_n=null,Ho=!1,Ac=null,$n=null,Wo=!1,Bn=null,Ko=0,hs=0,Oc=null,Go=-1,qo=0;function ut(){return(he&6)!==0?$e():Go!==-1?Go:Go=$e()}function Vn(n){return(n.mode&1)===0?1:(he&2)!==0&&et!==0?et&-et:P0.transition!==null?(qo===0&&(qo=lh()),qo):(n=Se,n!==0||(n=window.event,n=n===void 0?16:yh(n.type)),n)}function Wt(n,i,a,c){if(50<hs)throw hs=0,Oc=null,Error(t(185));Mi(n,a,c),((he&2)===0||n!==qe)&&(n===qe&&((he&2)===0&&(Vo|=a),Ke===4&&Hn(n,et)),_t(n,c),a===1&&he===0&&(i.mode&1)===0&&(ri=$e()+500,xo&&jn()))}function _t(n,i){var a=n.callbackNode;Pv(n,i);var c=no(n,n===qe?et:0);if(c===0)a!==null&&sh(a),n.callbackNode=null,n.callbackPriority=0;else if(i=c&-c,n.callbackPriority!==i){if(a!=null&&sh(a),i===1)n.tag===0?R0(_p.bind(null,n)):nf(_p.bind(null,n)),C0(function(){(he&6)===0&&jn()}),a=null;else{switch(ch(c)){case 1:a=hl;break;case 4:a=oh;break;case 16:a=Xs;break;case 536870912:a=ah;break;default:a=Xs}a=Ip(a,yp.bind(null,n))}n.callbackPriority=i,n.callbackNode=a}}function yp(n,i){if(Go=-1,qo=0,(he&6)!==0)throw Error(t(327));var a=n.callbackNode;if(ii()&&n.callbackNode!==a)return null;var c=no(n,n===qe?et:0);if(c===0)return null;if((c&30)!==0||(c&n.expiredLanes)!==0||i)i=Yo(n,c);else{i=c;var d=he;he|=2;var f=wp();(qe!==n||et!==i)&&(_n=null,ri=$e()+500,mr(n,i));do try{Q0();break}catch(w){vp(n,w)}while(!0);Jl(),Bo.current=f,he=d,He!==null?i=0:(qe=null,et=0,i=Ke)}if(i!==0){if(i===2&&(d=fl(n),d!==0&&(c=d,i=Lc(n,d))),i===1)throw a=us,mr(n,0),Hn(n,c),_t(n,$e()),a;if(i===6)Hn(n,c);else{if(d=n.current.alternate,(c&30)===0&&!q0(d)&&(i=Yo(n,c),i===2&&(f=fl(n),f!==0&&(c=f,i=Lc(n,f))),i===1))throw a=us,mr(n,0),Hn(n,c),_t(n,$e()),a;switch(n.finishedWork=d,n.finishedLanes=c,i){case 0:case 1:throw Error(t(345));case 2:gr(n,yt,_n);break;case 3:if(Hn(n,c),(c&130023424)===c&&(i=bc+500-$e(),10<i)){if(no(n,0)!==0)break;if(d=n.suspendedLanes,(d&c)!==c){ut(),n.pingedLanes|=n.suspendedLanes&d;break}n.timeoutHandle=zl(gr.bind(null,n,yt,_n),i);break}gr(n,yt,_n);break;case 4:if(Hn(n,c),(c&4194240)===c)break;for(i=n.eventTimes,d=-1;0<c;){var g=31-Ut(c);f=1<<g,g=i[g],g>d&&(d=g),c&=~f}if(c=d,c=$e()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*G0(c/1960))-c,10<c){n.timeoutHandle=zl(gr.bind(null,n,yt,_n),c);break}gr(n,yt,_n);break;case 5:gr(n,yt,_n);break;default:throw Error(t(329))}}}return _t(n,$e()),n.callbackNode===a?yp.bind(null,n):null}function Lc(n,i){var a=ds;return n.current.memoizedState.isDehydrated&&(mr(n,i).flags|=256),n=Yo(n,i),n!==2&&(i=yt,yt=a,i!==null&&Dc(i)),n}function Dc(n){yt===null?yt=n:yt.push.apply(yt,n)}function q0(n){for(var i=n;;){if(i.flags&16384){var a=i.updateQueue;if(a!==null&&(a=a.stores,a!==null))for(var c=0;c<a.length;c++){var d=a[c],f=d.getSnapshot;d=d.value;try{if(!zt(f(),d))return!1}catch{return!1}}}if(a=i.child,i.subtreeFlags&16384&&a!==null)a.return=i,i=a;else{if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function Hn(n,i){for(i&=~Pc,i&=~Vo,n.suspendedLanes|=i,n.pingedLanes&=~i,n=n.expirationTimes;0<i;){var a=31-Ut(i),c=1<<a;n[a]=-1,i&=~c}}function _p(n){if((he&6)!==0)throw Error(t(327));ii();var i=no(n,0);if((i&1)===0)return _t(n,$e()),null;var a=Yo(n,i);if(n.tag!==0&&a===2){var c=fl(n);c!==0&&(i=c,a=Lc(n,c))}if(a===1)throw a=us,mr(n,0),Hn(n,i),_t(n,$e()),a;if(a===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=i,gr(n,yt,_n),_t(n,$e()),null}function Mc(n,i){var a=he;he|=1;try{return n(i)}finally{he=a,he===0&&(ri=$e()+500,xo&&jn())}}function pr(n){Bn!==null&&Bn.tag===0&&(he&6)===0&&ii();var i=he;he|=1;var a=Lt.transition,c=Se;try{if(Lt.transition=null,Se=1,n)return n()}finally{Se=c,Lt.transition=a,he=i,(he&6)===0&&jn()}}function jc(){Ct=ni.current,be(ni)}function mr(n,i){n.finishedWork=null,n.finishedLanes=0;var a=n.timeoutHandle;if(a!==-1&&(n.timeoutHandle=-1,k0(a)),He!==null)for(a=He.return;a!==null;){var c=a;switch(Kl(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&wo();break;case 3:Zr(),be(pt),be(nt),sc();break;case 5:rc(c);break;case 4:Zr();break;case 13:be(Fe);break;case 19:be(Fe);break;case 10:Xl(c.type._context);break;case 22:case 23:jc()}a=a.return}if(qe=n,He=n=Wn(n.current,null),et=Ct=i,Ke=0,us=null,Pc=Vo=fr=0,yt=ds=null,ur!==null){for(i=0;i<ur.length;i++)if(a=ur[i],c=a.interleaved,c!==null){a.interleaved=null;var d=c.next,f=a.pending;if(f!==null){var g=f.next;f.next=d,c.next=g}a.pending=c}ur=null}return n}function vp(n,i){do{var a=He;try{if(Jl(),Ao.current=Mo,Oo){for(var c=Ue.memoizedState;c!==null;){var d=c.queue;d!==null&&(d.pending=null),c=c.next}Oo=!1}if(hr=0,Ge=We=Ue=null,is=!1,ss=0,Rc.current=null,a===null||a.return===null){Ke=1,us=i,He=null;break}e:{var f=n,g=a.return,w=a,S=i;if(i=et,w.flags|=32768,S!==null&&typeof S=="object"&&typeof S.then=="function"){var N=S,A=w,O=A.tag;if((A.mode&1)===0&&(O===0||O===11||O===15)){var b=A.alternate;b?(A.updateQueue=b.updateQueue,A.memoizedState=b.memoizedState,A.lanes=b.lanes):(A.updateQueue=null,A.memoizedState=null)}var F=Hf(g);if(F!==null){F.flags&=-257,Wf(F,g,w,f,i),F.mode&1&&Vf(f,N,i),i=F,S=N;var B=i.updateQueue;if(B===null){var V=new Set;V.add(S),i.updateQueue=V}else B.add(S);break e}else{if((i&1)===0){Vf(f,N,i),Fc();break e}S=Error(t(426))}}else if(je&&w.mode&1){var Be=Hf(g);if(Be!==null){(Be.flags&65536)===0&&(Be.flags|=256),Wf(Be,g,w,f,i),Yl(ei(S,w));break e}}f=S=ei(S,w),Ke!==4&&(Ke=2),ds===null?ds=[f]:ds.push(f),f=g;do{switch(f.tag){case 3:f.flags|=65536,i&=-i,f.lanes|=i;var C=$f(f,S,i);pf(f,C);break e;case 1:w=S;var E=f.type,I=f.stateNode;if((f.flags&128)===0&&(typeof E.getDerivedStateFromError=="function"||I!==null&&typeof I.componentDidCatch=="function"&&($n===null||!$n.has(I)))){f.flags|=65536,i&=-i,f.lanes|=i;var D=Bf(f,w,i);pf(f,D);break e}}f=f.return}while(f!==null)}xp(a)}catch(H){i=H,He===a&&a!==null&&(He=a=a.return);continue}break}while(!0)}function wp(){var n=Bo.current;return Bo.current=Mo,n===null?Mo:n}function Fc(){(Ke===0||Ke===3||Ke===2)&&(Ke=4),qe===null||(fr&268435455)===0&&(Vo&268435455)===0||Hn(qe,et)}function Yo(n,i){var a=he;he|=2;var c=wp();(qe!==n||et!==i)&&(_n=null,mr(n,i));do try{Y0();break}catch(d){vp(n,d)}while(!0);if(Jl(),he=a,Bo.current=c,He!==null)throw Error(t(261));return qe=null,et=0,Ke}function Y0(){for(;He!==null;)Sp(He)}function Q0(){for(;He!==null&&!Sv();)Sp(He)}function Sp(n){var i=Cp(n.alternate,n,Ct);n.memoizedProps=n.pendingProps,i===null?xp(n):He=i,Rc.current=null}function xp(n){var i=n;do{var a=i.alternate;if(n=i.return,(i.flags&32768)===0){if(a=B0(a,i,Ct),a!==null){He=a;return}}else{if(a=V0(a,i),a!==null){a.flags&=32767,He=a;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{Ke=6,He=null;return}}if(i=i.sibling,i!==null){He=i;return}He=i=n}while(i!==null);Ke===0&&(Ke=5)}function gr(n,i,a){var c=Se,d=Lt.transition;try{Lt.transition=null,Se=1,J0(n,i,a,c)}finally{Lt.transition=d,Se=c}return null}function J0(n,i,a,c){do ii();while(Bn!==null);if((he&6)!==0)throw Error(t(327));a=n.finishedWork;var d=n.finishedLanes;if(a===null)return null;if(n.finishedWork=null,n.finishedLanes=0,a===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var f=a.lanes|a.childLanes;if(bv(n,f),n===qe&&(He=qe=null,et=0),(a.subtreeFlags&2064)===0&&(a.flags&2064)===0||Wo||(Wo=!0,Ip(Xs,function(){return ii(),null})),f=(a.flags&15990)!==0,(a.subtreeFlags&15990)!==0||f){f=Lt.transition,Lt.transition=null;var g=Se;Se=1;var w=he;he|=4,Rc.current=null,W0(n,a),hp(a,n),y0(Fl),so=!!jl,Fl=jl=null,n.current=a,K0(a),xv(),he=w,Se=g,Lt.transition=f}else n.current=a;if(Wo&&(Wo=!1,Bn=n,Ko=d),f=n.pendingLanes,f===0&&($n=null),Cv(a.stateNode),_t(n,$e()),i!==null)for(c=n.onRecoverableError,a=0;a<i.length;a++)d=i[a],c(d.value,{componentStack:d.stack,digest:d.digest});if(Ho)throw Ho=!1,n=Ac,Ac=null,n;return(Ko&1)!==0&&n.tag!==0&&ii(),f=n.pendingLanes,(f&1)!==0?n===Oc?hs++:(hs=0,Oc=n):hs=0,jn(),null}function ii(){if(Bn!==null){var n=ch(Ko),i=Lt.transition,a=Se;try{if(Lt.transition=null,Se=16>n?16:n,Bn===null)var c=!1;else{if(n=Bn,Bn=null,Ko=0,(he&6)!==0)throw Error(t(331));var d=he;for(he|=4,$=n.current;$!==null;){var f=$,g=f.child;if(($.flags&16)!==0){var w=f.deletions;if(w!==null){for(var S=0;S<w.length;S++){var N=w[S];for($=N;$!==null;){var A=$;switch(A.tag){case 0:case 11:case 15:cs(8,A,f)}var O=A.child;if(O!==null)O.return=A,$=O;else for(;$!==null;){A=$;var b=A.sibling,F=A.return;if(ap(A),A===N){$=null;break}if(b!==null){b.return=F,$=b;break}$=F}}}var B=f.alternate;if(B!==null){var V=B.child;if(V!==null){B.child=null;do{var Be=V.sibling;V.sibling=null,V=Be}while(V!==null)}}$=f}}if((f.subtreeFlags&2064)!==0&&g!==null)g.return=f,$=g;else e:for(;$!==null;){if(f=$,(f.flags&2048)!==0)switch(f.tag){case 0:case 11:case 15:cs(9,f,f.return)}var C=f.sibling;if(C!==null){C.return=f.return,$=C;break e}$=f.return}}var E=n.current;for($=E;$!==null;){g=$;var I=g.child;if((g.subtreeFlags&2064)!==0&&I!==null)I.return=g,$=I;else e:for(g=E;$!==null;){if(w=$,(w.flags&2048)!==0)try{switch(w.tag){case 0:case 11:case 15:$o(9,w)}}catch(H){ze(w,w.return,H)}if(w===g){$=null;break e}var D=w.sibling;if(D!==null){D.return=w.return,$=D;break e}$=w.return}}if(he=d,jn(),Zt&&typeof Zt.onPostCommitFiberRoot=="function")try{Zt.onPostCommitFiberRoot(Zs,n)}catch{}c=!0}return c}finally{Se=a,Lt.transition=i}}return!1}function Ep(n,i,a){i=ei(a,i),i=$f(n,i,1),n=Un(n,i,1),i=ut(),n!==null&&(Mi(n,1,i),_t(n,i))}function ze(n,i,a){if(n.tag===3)Ep(n,n,a);else for(;i!==null;){if(i.tag===3){Ep(i,n,a);break}else if(i.tag===1){var c=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&($n===null||!$n.has(c))){n=ei(a,n),n=Bf(i,n,1),i=Un(i,n,1),n=ut(),i!==null&&(Mi(i,1,n),_t(i,n));break}}i=i.return}}function X0(n,i,a){var c=n.pingCache;c!==null&&c.delete(i),i=ut(),n.pingedLanes|=n.suspendedLanes&a,qe===n&&(et&a)===a&&(Ke===4||Ke===3&&(et&130023424)===et&&500>$e()-bc?mr(n,0):Pc|=a),_t(n,i)}function kp(n,i){i===0&&((n.mode&1)===0?i=1:(i=to,to<<=1,(to&130023424)===0&&(to=4194304)));var a=ut();n=mn(n,i),n!==null&&(Mi(n,i,a),_t(n,a))}function Z0(n){var i=n.memoizedState,a=0;i!==null&&(a=i.retryLane),kp(n,a)}function ew(n,i){var a=0;switch(n.tag){case 13:var c=n.stateNode,d=n.memoizedState;d!==null&&(a=d.retryLane);break;case 19:c=n.stateNode;break;default:throw Error(t(314))}c!==null&&c.delete(i),kp(n,a)}var Cp;Cp=function(n,i,a){if(n!==null)if(n.memoizedProps!==i.pendingProps||pt.current)gt=!0;else{if((n.lanes&a)===0&&(i.flags&128)===0)return gt=!1,$0(n,i,a);gt=(n.flags&131072)!==0}else gt=!1,je&&(i.flags&1048576)!==0&&rf(i,ko,i.index);switch(i.lanes=0,i.tag){case 2:var c=i.type;Uo(n,i),n=i.pendingProps;var d=Kr(i,nt.current);Xr(i,a),d=lc(null,i,c,n,d,a);var f=cc();return i.flags|=1,typeof d=="object"&&d!==null&&typeof d.render=="function"&&d.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,mt(c)?(f=!0,So(i)):f=!1,i.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,tc(i),d.updater=jo,i.stateNode=d,d._reactInternals=i,mc(i,c,n,a),i=vc(null,i,c,!0,f,a)):(i.tag=0,je&&f&&Wl(i),ct(null,i,d,a),i=i.child),i;case 16:c=i.elementType;e:{switch(Uo(n,i),n=i.pendingProps,d=c._init,c=d(c._payload),i.type=c,d=i.tag=nw(c),n=Bt(c,n),d){case 0:i=_c(null,i,c,n,a);break e;case 1:i=Jf(null,i,c,n,a);break e;case 11:i=Kf(null,i,c,n,a);break e;case 14:i=Gf(null,i,c,Bt(c.type,n),a);break e}throw Error(t(306,c,""))}return i;case 0:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:Bt(c,d),_c(n,i,c,d,a);case 1:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:Bt(c,d),Jf(n,i,c,d,a);case 3:e:{if(Xf(i),n===null)throw Error(t(387));c=i.pendingProps,f=i.memoizedState,d=f.element,ff(n,i),Po(i,c,null,a);var g=i.memoizedState;if(c=g.element,f.isDehydrated)if(f={element:c,isDehydrated:!1,cache:g.cache,pendingSuspenseBoundaries:g.pendingSuspenseBoundaries,transitions:g.transitions},i.updateQueue.baseState=f,i.memoizedState=f,i.flags&256){d=ei(Error(t(423)),i),i=Zf(n,i,c,a,d);break e}else if(c!==d){d=ei(Error(t(424)),i),i=Zf(n,i,c,a,d);break e}else for(kt=Ln(i.stateNode.containerInfo.firstChild),Et=i,je=!0,$t=null,a=df(i,null,c,a),i.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Yr(),c===d){i=yn(n,i,a);break e}ct(n,i,c,a)}i=i.child}return i;case 5:return gf(i),n===null&&ql(i),c=i.type,d=i.pendingProps,f=n!==null?n.memoizedProps:null,g=d.children,Ul(c,d)?g=null:f!==null&&Ul(c,f)&&(i.flags|=32),Qf(n,i),ct(n,i,g,a),i.child;case 6:return n===null&&ql(i),null;case 13:return ep(n,i,a);case 4:return nc(i,i.stateNode.containerInfo),c=i.pendingProps,n===null?i.child=Qr(i,null,c,a):ct(n,i,c,a),i.child;case 11:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:Bt(c,d),Kf(n,i,c,d,a);case 7:return ct(n,i,i.pendingProps,a),i.child;case 8:return ct(n,i,i.pendingProps.children,a),i.child;case 12:return ct(n,i,i.pendingProps.children,a),i.child;case 10:e:{if(c=i.type._context,d=i.pendingProps,f=i.memoizedProps,g=d.value,Ne(To,c._currentValue),c._currentValue=g,f!==null)if(zt(f.value,g)){if(f.children===d.children&&!pt.current){i=yn(n,i,a);break e}}else for(f=i.child,f!==null&&(f.return=i);f!==null;){var w=f.dependencies;if(w!==null){g=f.child;for(var S=w.firstContext;S!==null;){if(S.context===c){if(f.tag===1){S=gn(-1,a&-a),S.tag=2;var N=f.updateQueue;if(N!==null){N=N.shared;var A=N.pending;A===null?S.next=S:(S.next=A.next,A.next=S),N.pending=S}}f.lanes|=a,S=f.alternate,S!==null&&(S.lanes|=a),Zl(f.return,a,i),w.lanes|=a;break}S=S.next}}else if(f.tag===10)g=f.type===i.type?null:f.child;else if(f.tag===18){if(g=f.return,g===null)throw Error(t(341));g.lanes|=a,w=g.alternate,w!==null&&(w.lanes|=a),Zl(g,a,i),g=f.sibling}else g=f.child;if(g!==null)g.return=f;else for(g=f;g!==null;){if(g===i){g=null;break}if(f=g.sibling,f!==null){f.return=g.return,g=f;break}g=g.return}f=g}ct(n,i,d.children,a),i=i.child}return i;case 9:return d=i.type,c=i.pendingProps.children,Xr(i,a),d=At(d),c=c(d),i.flags|=1,ct(n,i,c,a),i.child;case 14:return c=i.type,d=Bt(c,i.pendingProps),d=Bt(c.type,d),Gf(n,i,c,d,a);case 15:return qf(n,i,i.type,i.pendingProps,a);case 17:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:Bt(c,d),Uo(n,i),i.tag=1,mt(c)?(n=!0,So(i)):n=!1,Xr(i,a),Uf(i,c,d),mc(i,c,d,a),vc(null,i,c,!0,n,a);case 19:return np(n,i,a);case 22:return Yf(n,i,a)}throw Error(t(156,i.tag))};function Ip(n,i){return ih(n,i)}function tw(n,i,a,c){this.tag=n,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Dt(n,i,a,c){return new tw(n,i,a,c)}function Uc(n){return n=n.prototype,!(!n||!n.isReactComponent)}function nw(n){if(typeof n=="function")return Uc(n)?1:0;if(n!=null){if(n=n.$$typeof,n===ne)return 11;if(n===ve)return 14}return 2}function Wn(n,i){var a=n.alternate;return a===null?(a=Dt(n.tag,i,n.key,n.mode),a.elementType=n.elementType,a.type=n.type,a.stateNode=n.stateNode,a.alternate=n,n.alternate=a):(a.pendingProps=i,a.type=n.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=n.flags&14680064,a.childLanes=n.childLanes,a.lanes=n.lanes,a.child=n.child,a.memoizedProps=n.memoizedProps,a.memoizedState=n.memoizedState,a.updateQueue=n.updateQueue,i=n.dependencies,a.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},a.sibling=n.sibling,a.index=n.index,a.ref=n.ref,a}function Qo(n,i,a,c,d,f){var g=2;if(c=n,typeof n=="function")Uc(n)&&(g=1);else if(typeof n=="string")g=5;else e:switch(n){case Ie:return yr(a.children,d,f,i);case Ve:g=8,d|=8;break;case Re:return n=Dt(12,a,i,d|2),n.elementType=Re,n.lanes=f,n;case q:return n=Dt(13,a,i,d),n.elementType=q,n.lanes=f,n;case Z:return n=Dt(19,a,i,d),n.elementType=Z,n.lanes=f,n;case re:return Jo(a,d,f,i);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case ye:g=10;break e;case Rt:g=9;break e;case ne:g=11;break e;case ve:g=14;break e;case se:g=16,c=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return i=Dt(g,a,i,d),i.elementType=n,i.type=c,i.lanes=f,i}function yr(n,i,a,c){return n=Dt(7,n,c,i),n.lanes=a,n}function Jo(n,i,a,c){return n=Dt(22,n,c,i),n.elementType=re,n.lanes=a,n.stateNode={isHidden:!1},n}function zc(n,i,a){return n=Dt(6,n,null,i),n.lanes=a,n}function $c(n,i,a){return i=Dt(4,n.children!==null?n.children:[],n.key,i),i.lanes=a,i.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},i}function rw(n,i,a,c,d){this.tag=i,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=pl(0),this.expirationTimes=pl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=pl(0),this.identifierPrefix=c,this.onRecoverableError=d,this.mutableSourceEagerHydrationData=null}function Bc(n,i,a,c,d,f,g,w,S){return n=new rw(n,i,a,w,S),i===1?(i=1,f===!0&&(i|=8)):i=0,f=Dt(3,null,null,i),n.current=f,f.stateNode=n,f.memoizedState={element:c,isDehydrated:a,cache:null,transitions:null,pendingSuspenseBoundaries:null},tc(f),n}function iw(n,i,a){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:De,key:c==null?null:""+c,children:n,containerInfo:i,implementation:a}}function Tp(n){if(!n)return Mn;n=n._reactInternals;e:{if(sr(n)!==n||n.tag!==1)throw Error(t(170));var i=n;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(mt(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(t(171))}if(n.tag===1){var a=n.type;if(mt(a))return ef(n,a,i)}return i}function Np(n,i,a,c,d,f,g,w,S){return n=Bc(a,c,!0,n,d,f,g,w,S),n.context=Tp(null),a=n.current,c=ut(),d=Vn(a),f=gn(c,d),f.callback=i??null,Un(a,f,d),n.current.lanes=d,Mi(n,d,c),_t(n,c),n}function Xo(n,i,a,c){var d=i.current,f=ut(),g=Vn(d);return a=Tp(a),i.context===null?i.context=a:i.pendingContext=a,i=gn(f,g),i.payload={element:n},c=c===void 0?null:c,c!==null&&(i.callback=c),n=Un(d,i,g),n!==null&&(Wt(n,d,g,f),Ro(n,d,g)),g}function Zo(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function Rp(n,i){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var a=n.retryLane;n.retryLane=a!==0&&a<i?a:i}}function Vc(n,i){Rp(n,i),(n=n.alternate)&&Rp(n,i)}function sw(){return null}var Pp=typeof reportError=="function"?reportError:function(n){console.error(n)};function Hc(n){this._internalRoot=n}ea.prototype.render=Hc.prototype.render=function(n){var i=this._internalRoot;if(i===null)throw Error(t(409));Xo(n,i,null,null)},ea.prototype.unmount=Hc.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var i=n.containerInfo;pr(function(){Xo(null,n,null,null)}),i[dn]=null}};function ea(n){this._internalRoot=n}ea.prototype.unstable_scheduleHydration=function(n){if(n){var i=hh();n={blockedOn:null,target:n,priority:i};for(var a=0;a<bn.length&&i!==0&&i<bn[a].priority;a++);bn.splice(a,0,n),a===0&&mh(n)}};function Wc(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function ta(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function bp(){}function ow(n,i,a,c,d){if(d){if(typeof c=="function"){var f=c;c=function(){var N=Zo(g);f.call(N)}}var g=Np(i,c,n,0,null,!1,!1,"",bp);return n._reactRootContainer=g,n[dn]=g.current,Qi(n.nodeType===8?n.parentNode:n),pr(),g}for(;d=n.lastChild;)n.removeChild(d);if(typeof c=="function"){var w=c;c=function(){var N=Zo(S);w.call(N)}}var S=Bc(n,0,!1,null,null,!1,!1,"",bp);return n._reactRootContainer=S,n[dn]=S.current,Qi(n.nodeType===8?n.parentNode:n),pr(function(){Xo(i,S,a,c)}),S}function na(n,i,a,c,d){var f=a._reactRootContainer;if(f){var g=f;if(typeof d=="function"){var w=d;d=function(){var S=Zo(g);w.call(S)}}Xo(i,g,n,d)}else g=ow(a,i,n,d,c);return Zo(g)}uh=function(n){switch(n.tag){case 3:var i=n.stateNode;if(i.current.memoizedState.isDehydrated){var a=Di(i.pendingLanes);a!==0&&(ml(i,a|1),_t(i,$e()),(he&6)===0&&(ri=$e()+500,jn()))}break;case 13:pr(function(){var c=mn(n,1);if(c!==null){var d=ut();Wt(c,n,1,d)}}),Vc(n,1)}},gl=function(n){if(n.tag===13){var i=mn(n,134217728);if(i!==null){var a=ut();Wt(i,n,134217728,a)}Vc(n,134217728)}},dh=function(n){if(n.tag===13){var i=Vn(n),a=mn(n,i);if(a!==null){var c=ut();Wt(a,n,i,c)}Vc(n,i)}},hh=function(){return Se},fh=function(n,i){var a=Se;try{return Se=n,i()}finally{Se=a}},ll=function(n,i,a){switch(i){case"input":if(el(n,a),i=a.name,a.type==="radio"&&i!=null){for(a=n;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<a.length;i++){var c=a[i];if(c!==n&&c.form===n.form){var d=vo(c);if(!d)throw Error(t(90));jd(c),el(c,d)}}}break;case"textarea":Bd(n,a);break;case"select":i=a.value,i!=null&&Lr(n,!!a.multiple,i,!1)}},Jd=Mc,Xd=pr;var aw={usingClientEntryPoint:!1,Events:[Zi,Hr,vo,Yd,Qd,Mc]},fs={findFiberByHostInstance:or,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},lw={bundleType:fs.bundleType,version:fs.version,rendererPackageName:fs.rendererPackageName,rendererConfig:fs.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ee.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=nh(n),n===null?null:n.stateNode},findFiberByHostInstance:fs.findFiberByHostInstance||sw,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ra=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ra.isDisabled&&ra.supportsFiber)try{Zs=ra.inject(lw),Zt=ra}catch{}}return vt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=aw,vt.createPortal=function(n,i){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Wc(i))throw Error(t(200));return iw(n,i,null,a)},vt.createRoot=function(n,i){if(!Wc(n))throw Error(t(299));var a=!1,c="",d=Pp;return i!=null&&(i.unstable_strictMode===!0&&(a=!0),i.identifierPrefix!==void 0&&(c=i.identifierPrefix),i.onRecoverableError!==void 0&&(d=i.onRecoverableError)),i=Bc(n,1,!1,null,null,a,!1,c,d),n[dn]=i.current,Qi(n.nodeType===8?n.parentNode:n),new Hc(i)},vt.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var i=n._reactInternals;if(i===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=nh(i),n=n===null?null:n.stateNode,n},vt.flushSync=function(n){return pr(n)},vt.hydrate=function(n,i,a){if(!ta(i))throw Error(t(200));return na(null,n,i,!0,a)},vt.hydrateRoot=function(n,i,a){if(!Wc(n))throw Error(t(405));var c=a!=null&&a.hydratedSources||null,d=!1,f="",g=Pp;if(a!=null&&(a.unstable_strictMode===!0&&(d=!0),a.identifierPrefix!==void 0&&(f=a.identifierPrefix),a.onRecoverableError!==void 0&&(g=a.onRecoverableError)),i=Np(i,null,n,1,a??null,d,!1,f,g),n[dn]=i.current,Qi(n),c)for(n=0;n<c.length;n++)a=c[n],d=a._getVersion,d=d(a._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[a,d]:i.mutableSourceEagerHydrationData.push(a,d);return new ea(i)},vt.render=function(n,i,a){if(!ta(i))throw Error(t(200));return na(null,n,i,!1,a)},vt.unmountComponentAtNode=function(n){if(!ta(n))throw Error(t(40));return n._reactRootContainer?(pr(function(){na(null,null,n,!1,function(){n._reactRootContainer=null,n[dn]=null})}),!0):!1},vt.unstable_batchedUpdates=Mc,vt.unstable_renderSubtreeIntoContainer=function(n,i,a,c){if(!ta(a))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return na(n,i,a,!1,c)},vt.version="18.3.1-next-f1338f8080-20240426",vt}var Up;function gw(){if(Up)return qc.exports;Up=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),qc.exports=mw(),qc.exports}var zp;function yw(){if(zp)return ia;zp=1;var r=gw();return ia.createRoot=r.createRoot,ia.hydrateRoot=r.hydrateRoot,ia}var _w=yw(),ae=Fa();/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vw=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),ww=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,s)=>s?s.toUpperCase():t.toLowerCase()),$p=r=>{const e=ww(r);return e.charAt(0).toUpperCase()+e.slice(1)},Ng=(...r)=>r.filter((e,t,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===t).join(" ").trim();/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Sw={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xw=ae.forwardRef(({color:r="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:s,className:o="",children:l,iconNode:u,...h},p)=>ae.createElement("svg",{ref:p,...Sw,width:e,height:e,stroke:r,strokeWidth:s?Number(t)*24/Number(e):t,className:Ng("lucide",o),...h},[...u.map(([m,v])=>ae.createElement(m,v)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke=(r,e)=>{const t=ae.forwardRef(({className:s,...o},l)=>ae.createElement(xw,{ref:l,iconNode:e,className:Ng(`lucide-${vw($p(r))}`,`lucide-${r}`,s),...o}));return t.displayName=$p(r),t};/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ew=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],kw=ke("arrow-left",Ew);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cw=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],Iw=ke("arrow-right",Cw);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tw=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]],Ps=ke("bell",Tw);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nw=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"m9 16 2 2 4-4",key:"19s6y9"}]],Rw=ke("calendar-check",Nw);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pw=[["path",{d:"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",key:"5owen"}],["circle",{cx:"7",cy:"17",r:"2",key:"u2ysq9"}],["path",{d:"M9 17h6",key:"r8uit2"}],["circle",{cx:"17",cy:"17",r:"2",key:"axvx0g"}]],bw=ke("car",Pw);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Aw=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Ow=ke("check",Aw);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lw=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],Dw=ke("chevron-down",Lw);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mw=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Rg=ke("chevron-right",Mw);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jw=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],Fw=ke("circle-check-big",jw);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uw=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],zw=ke("circle-check",Uw);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $w=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],Bw=ke("circle-help",$w);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vw=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],Hw=ke("circle",Vw);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ww=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]],Kw=ke("clock",Ww);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gw=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],qw=ke("eye",Gw);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yw=[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]],Qw=ke("heart",Yw);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jw=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]],Xw=ke("house",Jw);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zw=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],Bp=ke("lock",Zw);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eS=[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]],tS=ke("log-out",eS);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nS=[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]],rS=ke("mail",nS);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iS=[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]],sS=ke("phone",iS);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oS=[["path",{d:"m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z",key:"wa1lgi"}],["path",{d:"m8.5 8.5 7 7",key:"rvfmvr"}]],Pg=ke("pill",oS);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aS=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]],lS=ke("search",aS);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cS=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],uS=ke("shield",cS);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dS=[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]],hS=ke("shopping-cart",dS);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fS=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],pS=ke("star",fS);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mS=[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]],gS=ke("trophy",mS);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yS=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],ma=ke("user",yS);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _S=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]],vS=ke("users",_S),J=r=>typeof r=="string",ms=()=>{let r,e;const t=new Promise((s,o)=>{r=s,e=o});return t.resolve=r,t.reject=e,t},Vp=r=>r==null?"":String(r),wS=(r,e,t)=>{r.forEach(s=>{e[s]&&(t[s]=e[s])})},SS=/###/g,Hp=r=>r&&r.includes("###")?r.replace(SS,"."):r,Wp=r=>!r||J(r),Es=(r,e,t)=>{const s=J(e)?e.split("."):e;let o=0;for(;o<s.length-1;){if(Wp(r))return{};const l=Hp(s[o]);!r[l]&&t&&(r[l]=new t),Object.prototype.hasOwnProperty.call(r,l)?r=r[l]:r={},++o}return Wp(r)?{}:{obj:r,k:Hp(s[o])}},Kp=(r,e,t)=>{const{obj:s,k:o}=Es(r,e,Object);if(s!==void 0||e.length===1){s[o]=t;return}let l=e[e.length-1],u=e.slice(0,e.length-1),h=Es(r,u,Object);for(;h.obj===void 0&&u.length;)l=`${u[u.length-1]}.${l}`,u=u.slice(0,u.length-1),h=Es(r,u,Object),h!=null&&h.obj&&typeof h.obj[`${h.k}.${l}`]<"u"&&(h.obj=void 0);h.obj[`${h.k}.${l}`]=t},xS=(r,e,t,s)=>{const{obj:o,k:l}=Es(r,e,Object);o[l]=o[l]||[],o[l].push(t)},ga=(r,e)=>{const{obj:t,k:s}=Es(r,e);if(t&&Object.prototype.hasOwnProperty.call(t,s))return t[s]},ES=(r,e,t)=>{const s=ga(r,t);return s!==void 0?s:ga(e,t)},bg=(r,e,t)=>{for(const s in e)s!=="__proto__"&&s!=="constructor"&&(s in r?J(r[s])||r[s]instanceof String||J(e[s])||e[s]instanceof String?t&&(r[s]=e[s]):bg(r[s],e[s],t):r[s]=e[s]);return r},vn=r=>r.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),kS={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},CS=r=>J(r)?r.replace(/[&<>"'\/]/g,e=>kS[e]):r;class IS{constructor(e){this.capacity=e,this.regExpMap=new Map,this.regExpQueue=[]}getRegExp(e){const t=this.regExpMap.get(e);if(t!==void 0)return t;const s=new RegExp(e);return this.regExpQueue.length===this.capacity&&this.regExpMap.delete(this.regExpQueue.shift()),this.regExpMap.set(e,s),this.regExpQueue.push(e),s}}const TS=[" ",",","?","!",";"],NS=new IS(20),RS=(r,e,t)=>{e=e||"",t=t||"";const s=TS.filter(u=>!e.includes(u)&&!t.includes(u));if(s.length===0)return!0;const o=NS.getRegExp(`(${s.map(u=>u==="?"?"\\?":u).join("|")})`);let l=!o.test(r);if(!l){const u=r.indexOf(t);u>0&&!o.test(r.substring(0,u))&&(l=!0)}return l},xu=(r,e,t=".")=>{if(!r)return;if(r[e])return Object.prototype.hasOwnProperty.call(r,e)?r[e]:void 0;const s=e.split(t);let o=r;for(let l=0;l<s.length;){if(!o||typeof o!="object")return;let u,h="";for(let p=l;p<s.length;++p)if(p!==l&&(h+=t),h+=s[p],u=o[h],u!==void 0){if(["string","number","boolean"].includes(typeof u)&&p<s.length-1)continue;l+=p-l+1;break}o=u}return o},bs=r=>r==null?void 0:r.replace(/_/g,"-"),PS={type:"logger",log(r){this.output("log",r)},warn(r){this.output("warn",r)},error(r){this.output("error",r)},output(r,e){var t,s;(s=(t=console==null?void 0:console[r])==null?void 0:t.apply)==null||s.call(t,console,e)}};let bS=class Eu{constructor(e,t={}){this.init(e,t)}init(e,t={}){this.prefix=t.prefix||"i18next:",this.logger=e||PS,this.options=t,this.debug=t.debug}log(...e){return this.forward(e,"log","",!0)}warn(...e){return this.forward(e,"warn","",!0)}error(...e){return this.forward(e,"error","")}deprecate(...e){return this.forward(e,"warn","WARNING DEPRECATED: ",!0)}forward(e,t,s,o){return o&&!this.debug?null:(e=e.map(l=>J(l)?l.replace(/[\r\n\x00-\x1F\x7F]/g," "):l),J(e[0])&&(e[0]=`${s}${this.prefix} ${e[0]}`),this.logger[t](e))}create(e){return new Eu(this.logger,{prefix:`${this.prefix}:${e}:`,...this.options})}clone(e){return e=e||this.options,e.prefix=e.prefix||this.prefix,new Eu(this.logger,e)}};var sn=new bS;let Ua=class{constructor(){this.observers={}}on(e,t){return e.split(" ").forEach(s=>{this.observers[s]||(this.observers[s]=new Map);const o=this.observers[s].get(t)||0;this.observers[s].set(t,o+1)}),this}off(e,t){if(this.observers[e]){if(!t){delete this.observers[e];return}this.observers[e].delete(t)}}once(e,t){const s=(...o)=>{t(...o),this.off(e,s)};return this.on(e,s),this}emit(e,...t){this.observers[e]&&Array.from(this.observers[e].entries()).forEach(([o,l])=>{for(let u=0;u<l;u++)o(...t)}),this.observers["*"]&&Array.from(this.observers["*"].entries()).forEach(([o,l])=>{for(let u=0;u<l;u++)o(e,...t)})}};class Gp extends Ua{constructor(e,t={ns:["translation"],defaultNS:"translation"}){super(),this.data=e||{},this.options=t,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.options.ignoreJSONStructure===void 0&&(this.options.ignoreJSONStructure=!0)}addNamespaces(e){this.options.ns.includes(e)||this.options.ns.push(e)}removeNamespaces(e){const t=this.options.ns.indexOf(e);t>-1&&this.options.ns.splice(t,1)}getResource(e,t,s,o={}){var m,v;const l=o.keySeparator!==void 0?o.keySeparator:this.options.keySeparator,u=o.ignoreJSONStructure!==void 0?o.ignoreJSONStructure:this.options.ignoreJSONStructure;let h;e.includes(".")?h=e.split("."):(h=[e,t],s&&(Array.isArray(s)?h.push(...s):J(s)&&l?h.push(...s.split(l)):h.push(s)));const p=ga(this.data,h);return!p&&!t&&!s&&e.includes(".")&&(e=h[0],t=h[1],s=h.slice(2).join(".")),p||!u||!J(s)?p:xu((v=(m=this.data)==null?void 0:m[e])==null?void 0:v[t],s,l)}addResource(e,t,s,o,l={silent:!1}){const u=l.keySeparator!==void 0?l.keySeparator:this.options.keySeparator;let h=[e,t];s&&(h=h.concat(u?s.split(u):s)),e.includes(".")&&(h=e.split("."),o=t,t=h[1]),this.addNamespaces(t),Kp(this.data,h,o),l.silent||this.emit("added",e,t,s,o)}addResources(e,t,s,o={silent:!1}){for(const l in s)(J(s[l])||Array.isArray(s[l]))&&this.addResource(e,t,l,s[l],{silent:!0});o.silent||this.emit("added",e,t,s)}addResourceBundle(e,t,s,o,l,u={silent:!1,skipCopy:!1}){let h=[e,t];e.includes(".")&&(h=e.split("."),o=s,s=t,t=h[1]),this.addNamespaces(t);let p=ga(this.data,h)||{};u.skipCopy||(s=JSON.parse(JSON.stringify(s))),o?bg(p,s,l):p={...p,...s},Kp(this.data,h,p),u.silent||this.emit("added",e,t,s)}removeResourceBundle(e,t){this.hasResourceBundle(e,t)&&delete this.data[e][t],this.removeNamespaces(t),this.emit("removed",e,t)}hasResourceBundle(e,t){return this.getResource(e,t)!==void 0}getResourceBundle(e,t){return t||(t=this.options.defaultNS),this.getResource(e,t)}getDataByLanguage(e){return this.data[e]}hasLanguageSomeTranslations(e){const t=this.getDataByLanguage(e);return!!(t&&Object.keys(t)||[]).find(o=>t[o]&&Object.keys(t[o]).length>0)}toJSON(){return this.data}}var Ag={processors:{},addPostProcessor(r){this.processors[r.name]=r},handle(r,e,t,s,o){return r.forEach(l=>{var u;e=((u=this.processors[l])==null?void 0:u.process(e,t,s,o))??e}),e}};const Og=Symbol("i18next/PATH_KEY");function AS(){const r=[],e=Object.create(null);let t;return e.get=(s,o)=>{var l;return(l=t==null?void 0:t.revoke)==null||l.call(t),o===Og?r:(r.push(o),t=Proxy.revocable(s,e),t.proxy)},Proxy.revocable(Object.create(null),e).proxy}function ci(r,e){const{[Og]:t}=r(AS()),s=(e==null?void 0:e.keySeparator)??".",o=(e==null?void 0:e.nsSeparator)??":",l=(e==null?void 0:e.enableSelector)==="strict";if(t.length>1&&o){const u=e==null?void 0:e.ns,h=l?Array.isArray(u)?u:u?[u]:null:Array.isArray(u)?u:null;if(h&&(l?h:h.length>1?h.slice(1):[]).includes(t[0]))return`${t[0]}${o}${t.slice(1).join(s)}`}return t.join(s)}const Jc=r=>!J(r)&&typeof r!="boolean"&&typeof r!="number";class ya extends Ua{constructor(e,t={}){super(),wS(["resourceStore","languageUtils","pluralResolver","interpolator","backendConnector","i18nFormat","utils"],e,this),this.options=t,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.logger=sn.create("translator"),this.checkedLoadedFor={}}changeLanguage(e){e&&(this.language=e)}exists(e,t={interpolation:{}}){const s={...t};if(e==null)return!1;const o=this.resolve(e,s);if((o==null?void 0:o.res)===void 0)return!1;const l=Jc(o.res);return!(s.returnObjects===!1&&l)}extractFromKey(e,t){let s=t.nsSeparator!==void 0?t.nsSeparator:this.options.nsSeparator;s===void 0&&(s=":");const o=t.keySeparator!==void 0?t.keySeparator:this.options.keySeparator;let l=t.ns||this.options.defaultNS||[];const u=s&&e.includes(s),h=!this.options.userDefinedKeySeparator&&!t.keySeparator&&!this.options.userDefinedNsSeparator&&!t.nsSeparator&&!RS(e,s,o);if(u&&!h){const p=e.match(this.interpolator.nestingRegexp);if(p&&p.length>0)return{key:e,namespaces:J(l)?[l]:l};const m=e.split(s);(s!==o||s===o&&this.options.ns.includes(m[0]))&&(l=m.shift()),e=m.join(o)}return{key:e,namespaces:J(l)?[l]:l}}translate(e,t,s){let o=typeof t=="object"?{...t}:t;if(typeof o!="object"&&this.options.overloadTranslationOptionHandler&&(o=this.options.overloadTranslationOptionHandler(arguments)),typeof o=="object"&&(o={...o}),o||(o={}),e==null)return"";typeof e=="function"&&(e=ci(e,{...this.options,...o})),Array.isArray(e)||(e=[String(e)]),e=e.map(q=>typeof q=="function"?ci(q,{...this.options,...o}):String(q));const l=o.returnDetails!==void 0?o.returnDetails:this.options.returnDetails,u=o.keySeparator!==void 0?o.keySeparator:this.options.keySeparator,{key:h,namespaces:p}=this.extractFromKey(e[e.length-1],o),m=p[p.length-1];let v=o.nsSeparator!==void 0?o.nsSeparator:this.options.nsSeparator;v===void 0&&(v=":");const _=o.lng||this.language,x=o.appendNamespaceToCIMode||this.options.appendNamespaceToCIMode;if((_==null?void 0:_.toLowerCase())==="cimode")return x?l?{res:`${m}${v}${h}`,usedKey:h,exactUsedKey:h,usedLng:_,usedNS:m,usedParams:this.getUsedParamsDetails(o)}:`${m}${v}${h}`:l?{res:h,usedKey:h,exactUsedKey:h,usedLng:_,usedNS:m,usedParams:this.getUsedParamsDetails(o)}:h;const R=this.resolve(e,o);let T=R==null?void 0:R.res;const L=(R==null?void 0:R.usedKey)||h,U=(R==null?void 0:R.exactUsedKey)||h,ge=["[object Number]","[object Function]","[object RegExp]"],ce=o.joinArrays!==void 0?o.joinArrays:this.options.joinArrays,fe=!this.i18nFormat||this.i18nFormat.handleAsObject,ee=o.count!==void 0&&!J(o.count),Ce=ya.hasDefaultValue(o),De=ee?this.pluralResolver.getSuffix(_,o.count,o):"",Ie=o.ordinal&&ee?this.pluralResolver.getSuffix(_,o.count,{ordinal:!1}):"",Ve=ee&&!o.ordinal&&o.count===0,Re=Ve&&o[`defaultValue${this.options.pluralSeparator}zero`]||o[`defaultValue${De}`]||o[`defaultValue${Ie}`]||o.defaultValue;let ye=T;fe&&!T&&Ce&&(ye=Re);const Rt=Jc(ye),ne=Object.prototype.toString.apply(ye);if(fe&&ye&&Rt&&!ge.includes(ne)&&!(J(ce)&&Array.isArray(ye))){if(!o.returnObjects&&!this.options.returnObjects){this.options.returnedObjectHandler||this.logger.warn("accessing an object - but returnObjects options is not enabled!");const q=this.options.returnedObjectHandler?this.options.returnedObjectHandler(L,ye,{...o,ns:p}):`key '${h} (${this.language})' returned an object instead of string.`;return l?(R.res=q,R.usedParams=this.getUsedParamsDetails(o),R):q}if(u){const q=Array.isArray(ye),Z=q?[]:{},ve=q?U:L;for(const se in ye)if(Object.prototype.hasOwnProperty.call(ye,se)){const re=`${ve}${u}${se}`;Ce&&!T?Z[se]=this.translate(re,{...o,defaultValue:Jc(Re)?Re[se]:void 0,joinArrays:!1,ns:p}):Z[se]=this.translate(re,{...o,joinArrays:!1,ns:p}),Z[se]===re&&(Z[se]=ye[se])}T=Z}}else if(fe&&J(ce)&&Array.isArray(T))T=T.join(ce),T&&(T=this.extendTranslation(T,e,o,s));else{let q=!1,Z=!1;!this.isValidLookup(T)&&Ce&&(q=!0,T=Re),this.isValidLookup(T)||(Z=!0,T=h);const se=(o.missingKeyNoValueFallbackToKey||this.options.missingKeyNoValueFallbackToKey)&&Z?void 0:T,re=Ce&&Re!==T&&this.options.updateMissing;if(Z||q||re){if(this.logger.log(re?"updateKey":"missingKey",_,m,ee&&!re?`${h}${this.pluralResolver.getSuffix(_,o.count,o)}`:h,re?Re:T),u){const k=this.resolve(h,{...o,keySeparator:!1});k&&k.res&&this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")}let M=[];const W=this.languageUtils.getFallbackCodes(this.options.fallbackLng,o.lng||this.language);if(this.options.saveMissingTo==="fallback"&&W&&W[0])for(let k=0;k<W.length;k++)M.push(W[k]);else this.options.saveMissingTo==="all"?M=this.languageUtils.toResolveHierarchy(o.lng||this.language):M.push(o.lng||this.language);const z=(k,P,X)=>{var oe;const te=Ce&&X!==T?X:se;this.options.missingKeyHandler?this.options.missingKeyHandler(k,m,P,te,re,o):(oe=this.backendConnector)!=null&&oe.saveMissing&&this.backendConnector.saveMissing(k,m,P,te,re,o),this.emit("missingKey",k,m,P,T)};this.options.saveMissing&&(this.options.saveMissingPlurals&&ee?M.forEach(k=>{const P=this.pluralResolver.getSuffixes(k,o);Ve&&o[`defaultValue${this.options.pluralSeparator}zero`]&&!P.includes(`${this.options.pluralSeparator}zero`)&&P.push(`${this.options.pluralSeparator}zero`),P.forEach(X=>{z([k],h+X,o[`defaultValue${X}`]||Re)})}):z(M,h,Re))}T=this.extendTranslation(T,e,o,R,s),Z&&T===h&&this.options.appendNamespaceToMissingKey&&(T=`${m}${v}${h}`),(Z||q)&&this.options.parseMissingKeyHandler&&(T=this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey?`${m}${v}${h}`:h,q?T:void 0,o))}return l?(R.res=T,R.usedParams=this.getUsedParamsDetails(o),R):T}extendTranslation(e,t,s,o,l){var p,m;if((p=this.i18nFormat)!=null&&p.parse)e=this.i18nFormat.parse(e,{...this.options.interpolation.defaultVariables,...s},s.lng||this.language||o.usedLng,o.usedNS,o.usedKey,{resolved:o});else if(!s.skipInterpolation){s.interpolation&&this.interpolator.init({...s,interpolation:{...this.options.interpolation,...s.interpolation}});const v=J(e)&&(((m=s==null?void 0:s.interpolation)==null?void 0:m.skipOnVariables)!==void 0?s.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables);let _;if(v){const R=e.match(this.interpolator.nestingRegexp);_=R&&R.length}let x=s.replace&&!J(s.replace)?s.replace:s;if(this.options.interpolation.defaultVariables&&(x={...this.options.interpolation.defaultVariables,...x}),e=this.interpolator.interpolate(e,x,s.lng||this.language||o.usedLng,s),v){const R=e.match(this.interpolator.nestingRegexp),T=R&&R.length;_<T&&(s.nest=!1)}!s.lng&&o&&o.res&&(s.lng=this.language||o.usedLng),s.nest!==!1&&(e=this.interpolator.nest(e,(...R)=>(l==null?void 0:l[0])===R[0]&&!s.context?(this.logger.warn(`It seems you are nesting recursively key: ${R[0]} in key: ${t[0]}`),null):this.translate(...R,t),s)),s.interpolation&&this.interpolator.reset()}const u=s.postProcess||this.options.postProcess,h=J(u)?[u]:u;return e!=null&&(h!=null&&h.length)&&s.applyPostProcessor!==!1&&(e=Ag.handle(h,e,t,this.options&&this.options.postProcessPassResolved?{i18nResolved:{...o,usedParams:this.getUsedParamsDetails(s)},...s}:s,this)),e}resolve(e,t={}){let s,o,l,u,h;return J(e)&&(e=[e]),Array.isArray(e)&&(e=e.map(p=>typeof p=="function"?ci(p,{...this.options,...t}):p)),e.forEach(p=>{if(this.isValidLookup(s))return;const m=this.extractFromKey(p,t),v=m.key;o=v;let _=m.namespaces;this.options.fallbackNS&&(_=_.concat(this.options.fallbackNS));const x=t.count!==void 0&&!J(t.count),R=x&&!t.ordinal&&t.count===0,T=t.context!==void 0&&(J(t.context)||typeof t.context=="number")&&t.context!=="",L=t.lngs?t.lngs:this.languageUtils.toResolveHierarchy(t.lng||this.language,t.fallbackLng);_.forEach(U=>{var ge,ce;this.isValidLookup(s)||(h=U,!this.checkedLoadedFor[`${L[0]}-${U}`]&&((ge=this.utils)!=null&&ge.hasLoadedNamespace)&&!((ce=this.utils)!=null&&ce.hasLoadedNamespace(h))&&(this.checkedLoadedFor[`${L[0]}-${U}`]=!0,this.logger.warn(`key "${o}" for languages "${L.join(", ")}" won't get resolved as namespace "${h}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")),L.forEach(fe=>{var De;if(this.isValidLookup(s))return;u=fe;const ee=[v];if((De=this.i18nFormat)!=null&&De.addLookupKeys)this.i18nFormat.addLookupKeys(ee,v,fe,U,t);else{let Ie;x&&(Ie=this.pluralResolver.getSuffix(fe,t.count,t));const Ve=`${this.options.pluralSeparator}zero`,Re=`${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;if(x&&(t.ordinal&&Ie.startsWith(Re)&&ee.push(v+Ie.replace(Re,this.options.pluralSeparator)),ee.push(v+Ie),R&&ee.push(v+Ve)),T){const ye=`${v}${this.options.contextSeparator||"_"}${t.context}`;ee.push(ye),x&&(t.ordinal&&Ie.startsWith(Re)&&ee.push(ye+Ie.replace(Re,this.options.pluralSeparator)),ee.push(ye+Ie),R&&ee.push(ye+Ve))}}let Ce;for(;Ce=ee.pop();)this.isValidLookup(s)||(l=Ce,s=this.getResource(fe,U,Ce,t))}))})}),{res:s,usedKey:o,exactUsedKey:l,usedLng:u,usedNS:h}}isValidLookup(e){return e!==void 0&&!(!this.options.returnNull&&e===null)&&!(!this.options.returnEmptyString&&e==="")}getResource(e,t,s,o={}){var l;return(l=this.i18nFormat)!=null&&l.getResource?this.i18nFormat.getResource(e,t,s,o):this.resourceStore.getResource(e,t,s,o)}getUsedParamsDetails(e={}){const t=["defaultValue","ordinal","context","replace","lng","lngs","fallbackLng","ns","keySeparator","nsSeparator","returnObjects","returnDetails","joinArrays","postProcess","interpolation"],s=e.replace&&!J(e.replace);let o=s?e.replace:e;if(s&&typeof e.count<"u"&&(o.count=e.count),this.options.interpolation.defaultVariables&&(o={...this.options.interpolation.defaultVariables,...o}),!s){o={...o};for(const l of t)delete o[l]}return o}static hasDefaultValue(e){const t="defaultValue";for(const s in e)if(Object.prototype.hasOwnProperty.call(e,s)&&s.startsWith(t)&&e[s]!==void 0)return!0;return!1}}class qp{constructor(e){this.options=e,this.supportedLngs=this.options.supportedLngs||!1,this.logger=sn.create("languageUtils")}getScriptPartFromCode(e){if(e=bs(e),!e||!e.includes("-"))return null;const t=e.split("-");return t.length===2||(t.pop(),t[t.length-1].toLowerCase()==="x")?null:this.formatLanguageCode(t.join("-"))}getLanguagePartFromCode(e){if(e=bs(e),!e||!e.includes("-"))return e;const t=e.split("-");return this.formatLanguageCode(t[0])}formatLanguageCode(e){if(J(e)&&e.includes("-")){let t;try{t=Intl.getCanonicalLocales(e)[0]}catch{}return t&&this.options.lowerCaseLng&&(t=t.toLowerCase()),t||(this.options.lowerCaseLng?e.toLowerCase():e)}return this.options.cleanCode||this.options.lowerCaseLng?e.toLowerCase():e}isSupportedCode(e){return(this.options.load==="languageOnly"||this.options.nonExplicitSupportedLngs)&&(e=this.getLanguagePartFromCode(e)),!this.supportedLngs||!this.supportedLngs.length||this.supportedLngs.includes(e)}getBestMatchFromCodes(e){if(!e)return null;let t;return e.forEach(s=>{if(t)return;const o=this.formatLanguageCode(s);(!this.options.supportedLngs||this.isSupportedCode(o))&&(t=o)}),!t&&this.options.supportedLngs&&e.forEach(s=>{if(t)return;const o=this.getScriptPartFromCode(s);if(this.isSupportedCode(o))return t=o;const l=this.getLanguagePartFromCode(s);if(this.isSupportedCode(l))return t=l;t=this.options.supportedLngs.find(u=>u===l?!0:!u.includes("-")&&!l.includes("-")?!1:!!(u.includes("-")&&!l.includes("-")&&u.slice(0,u.indexOf("-"))===l||u.startsWith(l)&&l.length>1))}),t||(t=this.getFallbackCodes(this.options.fallbackLng)[0]),t}getFallbackCodes(e,t){if(!e)return[];if(typeof e=="function"&&(e=e(t)),J(e)&&(e=[e]),Array.isArray(e))return e;if(!t)return e.default||[];let s=e[t];return s||(s=e[this.getScriptPartFromCode(t)]),s||(s=e[this.formatLanguageCode(t)]),s||(s=e[this.getLanguagePartFromCode(t)]),s||(s=e.default),s||[]}toResolveHierarchy(e,t){const s=this.getFallbackCodes((t===!1?[]:t)||this.options.fallbackLng||[],e),o=[],l=u=>{u&&(this.isSupportedCode(u)?o.push(u):this.logger.warn(`rejecting language code not found in supportedLngs: ${u}`))};return J(e)&&(e.includes("-")||e.includes("_"))?(this.options.load!=="languageOnly"&&l(this.formatLanguageCode(e)),this.options.load!=="languageOnly"&&this.options.load!=="currentOnly"&&l(this.getScriptPartFromCode(e)),this.options.load!=="currentOnly"&&l(this.getLanguagePartFromCode(e))):J(e)&&l(this.formatLanguageCode(e)),s.forEach(u=>{o.includes(u)||l(this.formatLanguageCode(u))}),o}}const Yp={zero:0,one:1,two:2,few:3,many:4,other:5},Qp={select:r=>r===1?"one":"other",resolvedOptions:()=>({pluralCategories:["one","other"]})};class OS{constructor(e,t={}){this.languageUtils=e,this.options=t,this.logger=sn.create("pluralResolver"),this.pluralRulesCache={}}clearCache(){this.pluralRulesCache={}}getRule(e,t={}){const s=bs(e==="dev"?"en":e),o=t.ordinal?"ordinal":"cardinal",l=JSON.stringify({cleanedCode:s,type:o});if(l in this.pluralRulesCache)return this.pluralRulesCache[l];let u;try{u=new Intl.PluralRules(s,{type:o})}catch{if(typeof Intl>"u")return this.logger.error("No Intl support, please use an Intl polyfill!"),Qp;if(!e.match(/-|_/))return Qp;const p=this.languageUtils.getLanguagePartFromCode(e);u=this.getRule(p,t)}return this.pluralRulesCache[l]=u,u}needsPlural(e,t={}){let s=this.getRule(e,t);return s||(s=this.getRule("dev",t)),(s==null?void 0:s.resolvedOptions().pluralCategories.length)>1}getPluralFormsOfKey(e,t,s={}){return this.getSuffixes(e,s).map(o=>`${t}${o}`)}getSuffixes(e,t={}){let s=this.getRule(e,t);return s||(s=this.getRule("dev",t)),s?s.resolvedOptions().pluralCategories.sort((o,l)=>Yp[o]-Yp[l]).map(o=>`${this.options.prepend}${t.ordinal?`ordinal${this.options.prepend}`:""}${o}`):[]}getSuffix(e,t,s={}){const o=this.getRule(e,s);return o?`${this.options.prepend}${s.ordinal?`ordinal${this.options.prepend}`:""}${o.select(t)}`:(this.logger.warn(`no plural rule found for: ${e}`),this.getSuffix("dev",t,s))}}const Jp=(r,e,t,s=".",o=!0)=>{let l=ES(r,e,t);return!l&&o&&J(t)&&(l=xu(r,t,s),l===void 0&&(l=xu(e,t,s))),l},Xc=r=>r.replace(/\$/g,"$$$$");class Xp{constructor(e={}){var t;this.logger=sn.create("interpolator"),this.options=e,this.format=((t=e==null?void 0:e.interpolation)==null?void 0:t.format)||(s=>s),this.init(e)}init(e={}){e.interpolation||(e.interpolation={escapeValue:!0});const{escape:t,escapeValue:s,useRawValueToEscape:o,prefix:l,prefixEscaped:u,suffix:h,suffixEscaped:p,formatSeparator:m,unescapeSuffix:v,unescapePrefix:_,nestingPrefix:x,nestingPrefixEscaped:R,nestingSuffix:T,nestingSuffixEscaped:L,nestingOptionsSeparator:U,maxReplaces:ge,alwaysFormat:ce}=e.interpolation;this.escape=t!==void 0?t:CS,this.escapeValue=s!==void 0?s:!0,this.useRawValueToEscape=o!==void 0?o:!1,this.prefix=l?vn(l):u||"{{",this.suffix=h?vn(h):p||"}}",this.formatSeparator=m||",",this.unescapePrefix=v?"":_?vn(_):"-",this.unescapeSuffix=this.unescapePrefix?"":v?vn(v):"",this.nestingPrefix=x?vn(x):R||vn("$t("),this.nestingSuffix=T?vn(T):L||vn(")"),this.nestingOptionsSeparator=U||",",this.maxReplaces=ge||1e3,this.alwaysFormat=ce!==void 0?ce:!1,this.resetRegExp()}reset(){this.options&&this.init(this.options)}resetRegExp(){const e=(t,s)=>(t==null?void 0:t.source)===s?(t.lastIndex=0,t):new RegExp(s,"g");this.regexp=e(this.regexp,`${this.prefix}(.+?)${this.suffix}`),this.regexpUnescape=e(this.regexpUnescape,`${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`),this.nestingRegexp=e(this.nestingRegexp,`${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`)}interpolate(e,t,s,o){var R;let l,u,h;const p=this.options&&this.options.interpolation&&this.options.interpolation.defaultVariables||{},m=T=>{if(!T.includes(this.formatSeparator)){const ce=Jp(t,p,T,this.options.keySeparator,this.options.ignoreJSONStructure);return this.alwaysFormat?this.format(ce,void 0,s,{...o,...t,interpolationkey:T}):ce}const L=T.split(this.formatSeparator),U=L.shift().trim(),ge=L.join(this.formatSeparator).trim();return this.format(Jp(t,p,U,this.options.keySeparator,this.options.ignoreJSONStructure),ge,s,{...o,...t,interpolationkey:U})};this.resetRegExp(),!this.escapeValue&&typeof e=="string"&&/\$t\([^)]*\{[^}]*\{\{/.test(e)&&this.logger.warn("nesting options string contains interpolated variables with escapeValue: false — if any of those values are attacker-controlled they can inject additional nesting options (e.g. redirect lng/ns). Sanitise untrusted input before passing it to t(), or keep escapeValue: true.");const v=(o==null?void 0:o.missingInterpolationHandler)||this.options.missingInterpolationHandler,_=((R=o==null?void 0:o.interpolation)==null?void 0:R.skipOnVariables)!==void 0?o.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables;return[{regex:this.regexpUnescape,safeValue:T=>Xc(T)},{regex:this.regexp,safeValue:T=>this.escapeValue?Xc(this.escape(T)):Xc(T)}].forEach(T=>{for(h=0;l=T.regex.exec(e);){const L=l[1].trim();if(u=m(L),u===void 0)if(typeof v=="function"){const ge=v(e,l,o);u=J(ge)?ge:""}else if(o&&Object.prototype.hasOwnProperty.call(o,L))u="";else if(_){u=l[0];continue}else this.logger.warn(`missed to pass in variable ${L} for interpolating ${e}`),u="";else!J(u)&&!this.useRawValueToEscape&&(u=Vp(u));const U=T.safeValue(u);if(e=e.replace(l[0],U),_?(T.regex.lastIndex+=u.length,T.regex.lastIndex-=l[0].length):T.regex.lastIndex=0,h++,h>=this.maxReplaces)break}}),e}nest(e,t,s={}){let o,l,u;const h=(p,m)=>{const v=this.nestingOptionsSeparator;if(!p.includes(v))return p;const _=p.split(new RegExp(`${vn(v)}[ ]*{`));let x=`{${_[1]}`;p=_[0],x=this.interpolate(x,u);const R=x.match(/'/g),T=x.match(/"/g);(((R==null?void 0:R.length)??0)%2===0&&!T||((T==null?void 0:T.length)??0)%2!==0)&&(x=x.replace(/'/g,'"'));try{u=JSON.parse(x),m&&(u={...m,...u})}catch(L){return this.logger.warn(`failed parsing options string in nesting for key ${p}`,L),`${p}${v}${x}`}return u.defaultValue&&u.defaultValue.includes(this.prefix)&&delete u.defaultValue,p};for(;o=this.nestingRegexp.exec(e);){let p=[];u={...s},u=u.replace&&!J(u.replace)?u.replace:u,u.applyPostProcessor=!1,delete u.defaultValue;const m=/{.*}/.test(o[1])?o[1].lastIndexOf("}")+1:o[1].indexOf(this.formatSeparator);if(m!==-1&&(p=o[1].slice(m).split(this.formatSeparator).map(v=>v.trim()).filter(Boolean),o[1]=o[1].slice(0,m)),l=t(h.call(this,o[1].trim(),u),u),l&&o[0]===e&&!J(l))return l;J(l)||(l=Vp(l)),l||(this.logger.warn(`missed to resolve ${o[1]} for nesting ${e}`),l=""),p.length&&(l=p.reduce((v,_)=>this.format(v,_,s.lng,{...s,interpolationkey:o[1].trim()}),l.trim())),e=e.replace(o[0],l),this.regexp.lastIndex=0}return e}}const LS=r=>{let e=r.toLowerCase().trim();const t={};if(r.includes("(")){const s=r.split("(");e=s[0].toLowerCase().trim();const o=s[1].slice(0,-1);e==="currency"&&!o.includes(":")?t.currency||(t.currency=o.trim()):e==="relativetime"&&!o.includes(":")?t.range||(t.range=o.trim()):o.split(";").forEach(u=>{if(u){const[h,...p]=u.split(":"),m=p.join(":").trim().replace(/^'+|'+$/g,""),v=h.trim();t[v]||(t[v]=m),m==="false"&&(t[v]=!1),m==="true"&&(t[v]=!0),isNaN(m)||(t[v]=parseInt(m,10))}})}return{formatName:e,formatOptions:t}},Zp=r=>{const e={};return(t,s,o)=>{let l=o;o&&o.interpolationkey&&o.formatParams&&o.formatParams[o.interpolationkey]&&o[o.interpolationkey]&&(l={...l,[o.interpolationkey]:void 0});const u=s+JSON.stringify(l);let h=e[u];return h||(h=r(bs(s),o),e[u]=h),h(t)}},DS=r=>(e,t,s)=>r(bs(t),s)(e);class MS{constructor(e={}){this.logger=sn.create("formatter"),this.options=e,this.init(e)}init(e,t={interpolation:{}}){this.formatSeparator=t.interpolation.formatSeparator||",";const s=t.cacheInBuiltFormats?Zp:DS;this.formats={number:s((o,l)=>{const u=new Intl.NumberFormat(o,{...l});return h=>u.format(h)}),currency:s((o,l)=>{const u=new Intl.NumberFormat(o,{...l,style:"currency"});return h=>u.format(h)}),datetime:s((o,l)=>{const u=new Intl.DateTimeFormat(o,{...l});return h=>u.format(h)}),relativetime:s((o,l)=>{const u=new Intl.RelativeTimeFormat(o,{...l});return h=>u.format(h,l.range||"day")}),list:s((o,l)=>{const u=new Intl.ListFormat(o,{...l});return h=>u.format(h)})}}add(e,t){this.formats[e.toLowerCase().trim()]=t}addCached(e,t){this.formats[e.toLowerCase().trim()]=Zp(t)}format(e,t,s,o={}){if(!t||e==null)return e;const l=t.split(this.formatSeparator);if(l.length>1&&l[0].indexOf("(")>1&&!l[0].includes(")")&&l.find(h=>h.includes(")"))){const h=l.findIndex(p=>p.includes(")"));l[0]=[l[0],...l.splice(1,h)].join(this.formatSeparator)}return l.reduce((h,p)=>{var _;const{formatName:m,formatOptions:v}=LS(p);if(this.formats[m]){let x=h;try{const R=((_=o==null?void 0:o.formatParams)==null?void 0:_[o.interpolationkey])||{},T=R.locale||R.lng||o.locale||o.lng||s;x=this.formats[m](h,T,{...v,...o,...R})}catch(R){this.logger.warn(R)}return x}else this.logger.warn(`there was no format function for ${m}`);return h},e)}}const jS=(r,e)=>{r.pending[e]!==void 0&&(delete r.pending[e],r.pendingCount--)};class FS extends Ua{constructor(e,t,s,o={}){var l,u;super(),this.backend=e,this.store=t,this.services=s,this.languageUtils=s.languageUtils,this.options=o,this.logger=sn.create("backendConnector"),this.waitingReads=[],this.maxParallelReads=o.maxParallelReads||10,this.readingCalls=0,this.maxRetries=o.maxRetries>=0?o.maxRetries:5,this.retryTimeout=o.retryTimeout>=1?o.retryTimeout:350,this.state={},this.queue=[],(u=(l=this.backend)==null?void 0:l.init)==null||u.call(l,s,o.backend,o)}queueLoad(e,t,s,o){const l={},u={},h={},p={};return e.forEach(m=>{let v=!0;t.forEach(_=>{const x=`${m}|${_}`;!s.reload&&this.store.hasResourceBundle(m,_)?this.state[x]=2:this.state[x]<0||(this.state[x]===1?u[x]===void 0&&(u[x]=!0):(this.state[x]=1,v=!1,u[x]===void 0&&(u[x]=!0),l[x]===void 0&&(l[x]=!0),p[_]===void 0&&(p[_]=!0)))}),v||(h[m]=!0)}),(Object.keys(l).length||Object.keys(u).length)&&this.queue.push({pending:u,pendingCount:Object.keys(u).length,loaded:{},errors:[],callback:o}),{toLoad:Object.keys(l),pending:Object.keys(u),toLoadLanguages:Object.keys(h),toLoadNamespaces:Object.keys(p)}}loaded(e,t,s){const o=e.split("|"),l=o[0],u=o[1];t&&this.emit("failedLoading",l,u,t),!t&&s&&this.store.addResourceBundle(l,u,s,void 0,void 0,{skipCopy:!0}),this.state[e]=t?-1:2,t&&s&&(this.state[e]=0);const h={};this.queue.forEach(p=>{xS(p.loaded,[l],u),jS(p,e),t&&p.errors.push(t),p.pendingCount===0&&!p.done&&(Object.keys(p.loaded).forEach(m=>{h[m]||(h[m]={});const v=p.loaded[m];v.length&&v.forEach(_=>{h[m][_]===void 0&&(h[m][_]=!0)})}),p.done=!0,p.errors.length?p.callback(p.errors):p.callback())}),this.emit("loaded",h),this.queue=this.queue.filter(p=>!p.done)}read(e,t,s,o=0,l=this.retryTimeout,u){if(!e.length)return u(null,{});if(this.readingCalls>=this.maxParallelReads){this.waitingReads.push({lng:e,ns:t,fcName:s,tried:o,wait:l,callback:u});return}this.readingCalls++;const h=(m,v)=>{if(this.readingCalls--,this.waitingReads.length>0){const _=this.waitingReads.shift();this.read(_.lng,_.ns,_.fcName,_.tried,_.wait,_.callback)}if(m&&v&&o<this.maxRetries){setTimeout(()=>{this.read(e,t,s,o+1,l*2,u)},l);return}u(m,v)},p=this.backend[s].bind(this.backend);if(p.length===2){try{const m=p(e,t);m&&typeof m.then=="function"?m.then(v=>h(null,v)).catch(h):h(null,m)}catch(m){h(m)}return}return p(e,t,h)}prepareLoading(e,t,s={},o){if(!this.backend)return this.logger.warn("No backend was added via i18next.use. Will not load resources."),o&&o();J(e)&&(e=this.languageUtils.toResolveHierarchy(e)),J(t)&&(t=[t]);const l=this.queueLoad(e,t,s,o);if(!l.toLoad.length)return l.pending.length||o(),null;l.toLoad.forEach(u=>{this.loadOne(u)})}load(e,t,s){this.prepareLoading(e,t,{},s)}reload(e,t,s){this.prepareLoading(e,t,{reload:!0},s)}loadOne(e,t=""){const s=e.split("|"),o=s[0],l=s[1];this.read(o,l,"read",void 0,void 0,(u,h)=>{u&&this.logger.warn(`${t}loading namespace ${l} for language ${o} failed`,u),!u&&h&&this.logger.log(`${t}loaded namespace ${l} for language ${o}`,h),this.loaded(e,u,h)})}saveMissing(e,t,s,o,l,u={},h=()=>{}){var p,m,v,_,x;if((m=(p=this.services)==null?void 0:p.utils)!=null&&m.hasLoadedNamespace&&!((_=(v=this.services)==null?void 0:v.utils)!=null&&_.hasLoadedNamespace(t))){this.logger.warn(`did not save key "${s}" as the namespace "${t}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");return}if(!(s==null||s==="")){if((x=this.backend)!=null&&x.create){const R={...u,isUpdate:l},T=this.backend.create.bind(this.backend);if(T.length<6)try{let L;T.length===5?L=T(e,t,s,o,R):L=T(e,t,s,o),L&&typeof L.then=="function"?L.then(U=>h(null,U)).catch(h):h(null,L)}catch(L){h(L)}else T(e,t,s,o,h,R)}!e||!e[0]||this.store.addResource(e[0],t,s,o)}}}const Zc=()=>({debug:!1,initAsync:!0,ns:["translation"],defaultNS:["translation"],fallbackLng:["dev"],fallbackNS:!1,supportedLngs:!1,nonExplicitSupportedLngs:!1,load:"all",preload:!1,keySeparator:".",nsSeparator:":",pluralSeparator:"_",contextSeparator:"_",enableSelector:!1,partialBundledLanguages:!1,saveMissing:!1,updateMissing:!1,saveMissingTo:"fallback",saveMissingPlurals:!0,missingKeyHandler:!1,missingInterpolationHandler:!1,postProcess:!1,postProcessPassResolved:!1,returnNull:!1,returnEmptyString:!0,returnObjects:!1,joinArrays:!1,returnedObjectHandler:!1,parseMissingKeyHandler:!1,appendNamespaceToMissingKey:!1,appendNamespaceToCIMode:!1,overloadTranslationOptionHandler:r=>{let e={};if(typeof r[1]=="object"&&(e=r[1]),J(r[1])&&(e.defaultValue=r[1]),J(r[2])&&(e.tDescription=r[2]),typeof r[2]=="object"||typeof r[3]=="object"){const t=r[3]||r[2];Object.keys(t).forEach(s=>{e[s]=t[s]})}return e},interpolation:{escapeValue:!0,prefix:"{{",suffix:"}}",formatSeparator:",",unescapePrefix:"-",nestingPrefix:"$t(",nestingSuffix:")",nestingOptionsSeparator:",",maxReplaces:1e3,skipOnVariables:!0},cacheInBuiltFormats:!0}),em=r=>(J(r.ns)&&(r.ns=[r.ns]),J(r.fallbackLng)&&(r.fallbackLng=[r.fallbackLng]),J(r.fallbackNS)&&(r.fallbackNS=[r.fallbackNS]),r.supportedLngs&&!r.supportedLngs.includes("cimode")&&(r.supportedLngs=r.supportedLngs.concat(["cimode"])),r),sa=()=>{},US=r=>{Object.getOwnPropertyNames(Object.getPrototypeOf(r)).forEach(t=>{typeof r[t]=="function"&&(r[t]=r[t].bind(r))})};class ks extends Ua{constructor(e={},t){if(super(),this.options=em(e),this.services={},this.logger=sn,this.modules={external:[]},US(this),t&&!this.isInitialized&&!e.isClone){if(!this.options.initAsync)return this.init(e,t),this;setTimeout(()=>{this.init(e,t)},0)}}init(e={},t){this.isInitializing=!0,typeof e=="function"&&(t=e,e={}),e.defaultNS==null&&e.ns&&(J(e.ns)?e.defaultNS=e.ns:e.ns.includes("translation")||(e.defaultNS=e.ns[0]));const s=Zc();this.options={...s,...this.options,...em(e)},this.options.interpolation={...s.interpolation,...this.options.interpolation},e.keySeparator!==void 0&&(this.options.userDefinedKeySeparator=e.keySeparator),e.nsSeparator!==void 0&&(this.options.userDefinedNsSeparator=e.nsSeparator),typeof this.options.overloadTranslationOptionHandler!="function"&&(this.options.overloadTranslationOptionHandler=s.overloadTranslationOptionHandler);const o=m=>m?typeof m=="function"?new m:m:null;if(!this.options.isClone){this.modules.logger?sn.init(o(this.modules.logger),this.options):sn.init(null,this.options);let m;this.modules.formatter?m=this.modules.formatter:m=MS;const v=new qp(this.options);this.store=new Gp(this.options.resources,this.options);const _=this.services;_.logger=sn,_.resourceStore=this.store,_.languageUtils=v,_.pluralResolver=new OS(v,{prepend:this.options.pluralSeparator}),m&&(_.formatter=o(m),_.formatter.init&&_.formatter.init(_,this.options),this.options.interpolation.format=_.formatter.format.bind(_.formatter)),_.interpolator=new Xp(this.options),_.utils={hasLoadedNamespace:this.hasLoadedNamespace.bind(this)},_.backendConnector=new FS(o(this.modules.backend),_.resourceStore,_,this.options),_.backendConnector.on("*",(x,...R)=>{this.emit(x,...R)}),this.modules.languageDetector&&(_.languageDetector=o(this.modules.languageDetector),_.languageDetector.init&&_.languageDetector.init(_,this.options.detection,this.options)),this.modules.i18nFormat&&(_.i18nFormat=o(this.modules.i18nFormat),_.i18nFormat.init&&_.i18nFormat.init(this)),this.translator=new ya(this.services,this.options),this.translator.on("*",(x,...R)=>{this.emit(x,...R)}),this.modules.external.forEach(x=>{x.init&&x.init(this)})}if(this.format=this.options.interpolation.format,t||(t=sa),this.options.fallbackLng&&!this.services.languageDetector&&!this.options.lng){const m=this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);m.length>0&&m[0]!=="dev"&&(this.options.lng=m[0])}!this.services.languageDetector&&!this.options.lng&&this.logger.warn("init: no languageDetector is used and no lng is defined"),["getResource","hasResourceBundle","getResourceBundle","getDataByLanguage"].forEach(m=>{this[m]=(...v)=>this.store[m](...v)}),["addResource","addResources","addResourceBundle","removeResourceBundle"].forEach(m=>{this[m]=(...v)=>(this.store[m](...v),this)});const h=ms(),p=()=>{const m=(v,_)=>{this.isInitializing=!1,this.isInitialized&&!this.initializedStoreOnce&&this.logger.warn("init: i18next is already initialized. You should call init just once!"),this.isInitialized=!0,this.options.isClone||this.logger.log("initialized",this.options),this.emit("initialized",this.options),h.resolve(_),t(v,_)};if((this.languages||this.isLanguageChangingTo)&&!this.isInitialized)return m(null,this.t.bind(this));this.changeLanguage(this.options.lng,m)};return this.options.resources||!this.options.initAsync?p():setTimeout(p,0),h}loadResources(e,t=sa){var l,u;let s=t;const o=J(e)?e:this.language;if(typeof e=="function"&&(s=e),!this.options.resources||this.options.partialBundledLanguages){if((o==null?void 0:o.toLowerCase())==="cimode"&&(!this.options.preload||this.options.preload.length===0))return s();const h=[],p=m=>{if(!m||m==="cimode")return;this.services.languageUtils.toResolveHierarchy(m).forEach(_=>{_!=="cimode"&&(h.includes(_)||h.push(_))})};o?p(o):this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(v=>p(v)),(u=(l=this.options.preload)==null?void 0:l.forEach)==null||u.call(l,m=>p(m)),this.services.backendConnector.load(h,this.options.ns,m=>{!m&&!this.resolvedLanguage&&this.language&&this.setResolvedLanguage(this.language),s(m)})}else s(null)}reloadResources(e,t,s){const o=ms();return typeof e=="function"&&(s=e,e=void 0),typeof t=="function"&&(s=t,t=void 0),e||(e=this.languages),t||(t=this.options.ns),s||(s=sa),this.services.backendConnector.reload(e,t,l=>{o.resolve(),s(l)}),o}use(e){if(!e)throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");if(!e.type)throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");return e.type==="backend"&&(this.modules.backend=e),(e.type==="logger"||e.log&&e.warn&&e.error)&&(this.modules.logger=e),e.type==="languageDetector"&&(this.modules.languageDetector=e),e.type==="i18nFormat"&&(this.modules.i18nFormat=e),e.type==="postProcessor"&&Ag.addPostProcessor(e),e.type==="formatter"&&(this.modules.formatter=e),e.type==="3rdParty"&&this.modules.external.push(e),this}setResolvedLanguage(e){if(!(!e||!this.languages)&&!["cimode","dev"].includes(e)){for(let t=0;t<this.languages.length;t++){const s=this.languages[t];if(!["cimode","dev"].includes(s)&&this.store.hasLanguageSomeTranslations(s)){this.resolvedLanguage=s;break}}!this.resolvedLanguage&&!this.languages.includes(e)&&this.store.hasLanguageSomeTranslations(e)&&(this.resolvedLanguage=e,this.languages.unshift(e))}}changeLanguage(e,t){this.isLanguageChangingTo=e;const s=ms();this.emit("languageChanging",e);const o=h=>{this.language=h,this.languages=this.services.languageUtils.toResolveHierarchy(h),this.resolvedLanguage=void 0,this.setResolvedLanguage(h)},l=(h,p)=>{p?this.isLanguageChangingTo===e&&(o(p),this.translator.changeLanguage(p),this.isLanguageChangingTo=void 0,this.emit("languageChanged",p),this.logger.log("languageChanged",p)):this.isLanguageChangingTo=void 0,s.resolve((...m)=>this.t(...m)),t&&t(h,(...m)=>this.t(...m))},u=h=>{var v,_;!e&&!h&&this.services.languageDetector&&(h=[]);const p=J(h)?h:h&&h[0],m=this.store.hasLanguageSomeTranslations(p)?p:this.services.languageUtils.getBestMatchFromCodes(J(h)?[h]:h);m&&(this.language||o(m),this.translator.language||this.translator.changeLanguage(m),(_=(v=this.services.languageDetector)==null?void 0:v.cacheUserLanguage)==null||_.call(v,m)),this.loadResources(m,x=>{l(x,m)})};return!e&&this.services.languageDetector&&!this.services.languageDetector.async?u(this.services.languageDetector.detect()):!e&&this.services.languageDetector&&this.services.languageDetector.async?this.services.languageDetector.detect.length===0?this.services.languageDetector.detect().then(u):this.services.languageDetector.detect(u):u(e),s}getFixedT(e,t,s,o){const l=o==null?void 0:o.scopeNs,u=(h,p,...m)=>{let v;typeof p!="object"?v=this.options.overloadTranslationOptionHandler([h,p].concat(m)):v={...p},v.lng=v.lng||u.lng,v.lngs=v.lngs||u.lngs;const _=v.ns!==void 0&&v.ns!==null;v.ns=v.ns||u.ns,v.keyPrefix!==""&&(v.keyPrefix=v.keyPrefix||s||u.keyPrefix);const x={...this.options,...v};Array.isArray(l)&&!_&&(x.ns=l),typeof v.keyPrefix=="function"&&(v.keyPrefix=ci(v.keyPrefix,x));const R=this.options.keySeparator||".";let T;return v.keyPrefix&&Array.isArray(h)?T=h.map(L=>(typeof L=="function"&&(L=ci(L,x)),`${v.keyPrefix}${R}${L}`)):(typeof h=="function"&&(h=ci(h,x)),T=v.keyPrefix?`${v.keyPrefix}${R}${h}`:h),this.t(T,v)};return J(e)?u.lng=e:u.lngs=e,u.ns=t,u.keyPrefix=s,u}t(...e){var t;return(t=this.translator)==null?void 0:t.translate(...e)}exists(...e){var t;return(t=this.translator)==null?void 0:t.exists(...e)}setDefaultNamespace(e){this.options.defaultNS=e}hasLoadedNamespace(e,t={}){if(!this.isInitialized)return this.logger.warn("hasLoadedNamespace: i18next was not initialized",this.languages),!1;if(!this.languages||!this.languages.length)return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty",this.languages),!1;const s=t.lng||this.resolvedLanguage||this.languages[0],o=this.options?this.options.fallbackLng:!1,l=this.languages[this.languages.length-1];if(s.toLowerCase()==="cimode")return!0;const u=(h,p)=>{const m=this.services.backendConnector.state[`${h}|${p}`];return m===-1||m===0||m===2};if(t.precheck){const h=t.precheck(this,u);if(h!==void 0)return h}return!!(this.hasResourceBundle(s,e)||!this.services.backendConnector.backend||this.options.resources&&!this.options.partialBundledLanguages||u(s,e)&&(!o||u(l,e)))}loadNamespaces(e,t){const s=ms();return this.options.ns?(J(e)&&(e=[e]),e.forEach(o=>{this.options.ns.includes(o)||this.options.ns.push(o)}),this.loadResources(o=>{s.resolve(),t&&t(o)}),s):(t&&t(),Promise.resolve())}loadLanguages(e,t){const s=ms();J(e)&&(e=[e]);const o=this.options.preload||[],l=e.filter(u=>!o.includes(u)&&this.services.languageUtils.isSupportedCode(u));return l.length?(this.options.preload=o.concat(l),this.loadResources(u=>{s.resolve(),t&&t(u)}),s):(t&&t(),Promise.resolve())}dir(e){var o,l;if(e||(e=this.resolvedLanguage||(((o=this.languages)==null?void 0:o.length)>0?this.languages[0]:this.language)),!e)return"rtl";try{const u=new Intl.Locale(e);if(u&&u.getTextInfo){const h=u.getTextInfo();if(h&&h.direction)return h.direction}}catch{}const t=["ar","shu","sqr","ssh","xaa","yhd","yud","aao","abh","abv","acm","acq","acw","acx","acy","adf","ads","aeb","aec","afb","ajp","apc","apd","arb","arq","ars","ary","arz","auz","avl","ayh","ayl","ayn","ayp","bbz","pga","he","iw","ps","pbt","pbu","pst","prp","prd","ug","ur","ydd","yds","yih","ji","yi","hbo","men","xmn","fa","jpr","peo","pes","prs","dv","sam","ckb"],s=((l=this.services)==null?void 0:l.languageUtils)||new qp(Zc());return e.toLowerCase().indexOf("-latn")>1?"ltr":t.includes(s.getLanguagePartFromCode(e))||e.toLowerCase().indexOf("-arab")>1?"rtl":"ltr"}static createInstance(e={},t){const s=new ks(e,t);return s.createInstance=ks.createInstance,s}cloneInstance(e={},t=sa){const s=e.forkResourceStore;s&&delete e.forkResourceStore;const o={...this.options,...e,isClone:!0},l=new ks(o);if((e.debug!==void 0||e.prefix!==void 0)&&(l.logger=l.logger.clone(e)),["store","services","language"].forEach(h=>{l[h]=this[h]}),l.services={...this.services},l.services.utils={hasLoadedNamespace:l.hasLoadedNamespace.bind(l)},s){const h=Object.keys(this.store.data).reduce((p,m)=>(p[m]={...this.store.data[m]},p[m]=Object.keys(p[m]).reduce((v,_)=>(v[_]={...p[m][_]},v),p[m]),p),{});l.store=new Gp(h,o),l.services.resourceStore=l.store}if(e.interpolation){const p={...Zc().interpolation,...this.options.interpolation,...e.interpolation},m={...o,interpolation:p};l.services.interpolator=new Xp(m)}return l.translator=new ya(l.services,o),l.translator.on("*",(h,...p)=>{l.emit(h,...p)}),l.init(o,t),l.translator.options=o,l.translator.backendConnector.services.utils={hasLoadedNamespace:l.hasLoadedNamespace.bind(l)},l}toJSON(){return{options:this.options,store:this.store,language:this.language,languages:this.languages,resolvedLanguage:this.resolvedLanguage}}}const ft=ks.createInstance();ft.createInstance;ft.dir;ft.init;ft.loadResources;ft.reloadResources;ft.use;ft.changeLanguage;ft.getFixedT;ft.t;ft.exists;ft.setDefaultNamespace;ft.hasLoadedNamespace;ft.loadNamespaces;ft.loadLanguages;const zS=(r,e,t,s)=>{var l,u,h,p;const o=[t,{code:e,...s||{}}];if((u=(l=r==null?void 0:r.services)==null?void 0:l.logger)!=null&&u.forward)return r.services.logger.forward(o,"warn","react-i18next::",!0);xr(o[0])&&(o[0]=`react-i18next:: ${o[0]}`),(p=(h=r==null?void 0:r.services)==null?void 0:h.logger)!=null&&p.warn?r.services.logger.warn(...o):console!=null&&console.warn&&console.warn(...o)},tm={},ku=(r,e,t,s)=>{xr(t)&&tm[t]||(xr(t)&&(tm[t]=new Date),zS(r,e,t,s))},Lg=(r,e)=>()=>{if(r.isInitialized)e();else{const t=()=>{setTimeout(()=>{r.off("initialized",t)},0),e()};r.on("initialized",t)}},Cu=(r,e,t)=>{r.loadNamespaces(e,Lg(r,t))},nm=(r,e,t,s)=>{if(xr(t)&&(t=[t]),r.options.preload&&r.options.preload.indexOf(e)>-1)return Cu(r,t,s);t.forEach(o=>{r.options.ns.indexOf(o)<0&&r.options.ns.push(o)}),r.loadLanguages(e,Lg(r,s))},$S=(r,e,t={})=>!e.languages||!e.languages.length?(ku(e,"NO_LANGUAGES","i18n.languages were undefined or empty",{languages:e.languages}),!0):e.hasLoadedNamespace(r,{lng:t.lng,precheck:(s,o)=>{if(t.bindI18n&&t.bindI18n.indexOf("languageChanging")>-1&&s.services.backendConnector.backend&&s.isLanguageChangingTo&&!o(s.isLanguageChangingTo,r))return!1}}),xr=r=>typeof r=="string",BS=r=>typeof r=="object"&&r!==null,VS=/&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g,HS={"&amp;":"&","&#38;":"&","&lt;":"<","&#60;":"<","&gt;":">","&#62;":">","&apos;":"'","&#39;":"'","&quot;":'"',"&#34;":'"',"&nbsp;":" ","&#160;":" ","&copy;":"©","&#169;":"©","&reg;":"®","&#174;":"®","&hellip;":"…","&#8230;":"…","&#x2F;":"/","&#47;":"/"},WS=r=>HS[r],KS=r=>r.replace(VS,WS);let Iu={bindI18n:"languageChanged",bindI18nStore:"",transEmptyNodeValue:"",transSupportBasicHtmlNodes:!0,transWrapTextNodes:"",transKeepBasicHtmlNodesFor:["br","strong","i","p"],useSuspense:!0,unescape:KS,transDefaultProps:void 0};const GS=(r={})=>{Iu={...Iu,...r}},qS=()=>Iu;let Dg;const YS=r=>{Dg=r},QS=()=>Dg,JS={type:"3rdParty",init(r){GS(r.options.react),YS(r)}},XS=ae.createContext();class ZS{constructor(){this.usedNamespaces={}}addUsedNamespaces(e){e.forEach(t=>{this.usedNamespaces[t]||(this.usedNamespaces[t]=!0)})}getUsedNamespaces(){return Object.keys(this.usedNamespaces)}}var eu={exports:{}},tu={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var rm;function e1(){if(rm)return tu;rm=1;var r=Fa();function e(_,x){return _===x&&(_!==0||1/_===1/x)||_!==_&&x!==x}var t=typeof Object.is=="function"?Object.is:e,s=r.useState,o=r.useEffect,l=r.useLayoutEffect,u=r.useDebugValue;function h(_,x){var R=x(),T=s({inst:{value:R,getSnapshot:x}}),L=T[0].inst,U=T[1];return l(function(){L.value=R,L.getSnapshot=x,p(L)&&U({inst:L})},[_,R,x]),o(function(){return p(L)&&U({inst:L}),_(function(){p(L)&&U({inst:L})})},[_]),u(R),R}function p(_){var x=_.getSnapshot;_=_.value;try{var R=x();return!t(_,R)}catch{return!0}}function m(_,x){return x()}var v=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?m:h;return tu.useSyncExternalStore=r.useSyncExternalStore!==void 0?r.useSyncExternalStore:v,tu}var im;function t1(){return im||(im=1,eu.exports=e1()),eu.exports}var n1=t1();const r1=(r,e)=>{if(xr(e))return e;if(BS(e)&&xr(e.defaultValue))return e.defaultValue;if(typeof r=="function")return"";if(Array.isArray(r)){const t=r[r.length-1];return typeof t=="function"?"":t}return r},i1={t:r1,ready:!1},s1=()=>()=>{},wi=(r,e={})=>{var Re,ye,Rt;const{i18n:t}=e,{i18n:s,defaultNS:o}=ae.useContext(XS)||{},l=t||s||QS();l&&!l.reportNamespaces&&(l.reportNamespaces=new ZS),l||ku(l,"NO_I18NEXT_INSTANCE","useTranslation: You will need to pass in an i18next instance by using initReactI18next");const u=ae.useMemo(()=>{var ne;return{...qS(),...(ne=l==null?void 0:l.options)==null?void 0:ne.react,...e}},[l,e]),{useSuspense:h,keyPrefix:p}=u,m=o||((Re=l==null?void 0:l.options)==null?void 0:Re.defaultNS),v=xr(m)?[m]:m||["translation"],_=ae.useMemo(()=>v,v);(Rt=(ye=l==null?void 0:l.reportNamespaces)==null?void 0:ye.addUsedNamespaces)==null||Rt.call(ye,_);const x=ae.useRef(0),R=ae.useCallback(ne=>{if(!l)return s1;const{bindI18n:q,bindI18nStore:Z}=u,ve=()=>{x.current+=1,ne()};return q&&l.on(q,ve),Z&&l.store.on(Z,ve),()=>{q&&q.split(" ").forEach(se=>l.off(se,ve)),Z&&Z.split(" ").forEach(se=>l.store.off(se,ve))}},[l,u]),T=ae.useRef(),L=ae.useCallback(()=>{if(!l)return i1;const ne=!!(l.isInitialized||l.initializedStoreOnce)&&_.every(M=>$S(M,l,u)),q=e.lng||l.language,Z=x.current,ve=T.current;if(ve&&ve.ready===ne&&ve.lng===q&&ve.keyPrefix===p&&ve.revision===Z)return ve;const re={t:l.getFixedT(q,u.nsMode==="fallback"?_:_[0],p,{scopeNs:_}),ready:ne,lng:q,keyPrefix:p,revision:Z};return T.current=re,re},[l,_,p,u,e.lng]),[U,ge]=ae.useState(0),{t:ce,ready:fe}=n1.useSyncExternalStore(R,L,L);ae.useEffect(()=>{if(l&&!fe&&!h){const ne=()=>ge(q=>q+1);e.lng?nm(l,e.lng,_,ne):Cu(l,_,ne)}},[l,e.lng,_,fe,h,U]);const ee=l||{},Ce=ae.useRef(null),De=ae.useRef(),Ie=ne=>{const q=Object.getOwnPropertyDescriptors(ne);q.__original&&delete q.__original;const Z=Object.create(Object.getPrototypeOf(ne),q);if(!Object.prototype.hasOwnProperty.call(Z,"__original"))try{Object.defineProperty(Z,"__original",{value:ne,writable:!1,enumerable:!1,configurable:!1})}catch{}return Z},Ve=ae.useMemo(()=>{const ne=ee,q=ne==null?void 0:ne.language;let Z=ne;ne&&(Ce.current&&Ce.current.__original===ne?De.current!==q?(Z=Ie(ne),Ce.current=Z,De.current=q):Z=Ce.current:(Z=Ie(ne),Ce.current=Z,De.current=q));const ve=!fe&&!h?(...re)=>(ku(l,"USE_T_BEFORE_READY","useTranslation: t was called before ready. When using useSuspense: false, make sure to check the ready flag before using t."),ce(...re)):ce,se=[ve,Z,fe];return se.t=ve,se.i18n=Z,se.ready=fe,se},[ce,ee,fe,ee.resolvedLanguage,ee.language,ee.languages]);if(l&&h&&!fe)throw new Promise(ne=>{const q=()=>ne();e.lng?nm(l,e.lng,_,q):Cu(l,_,q)});return Ve},o1={en:{translation:{careConnect:"CareConnect",mobile:"Mobile",welcomeBack:"Welcome Back!",email:"Email",enterEmail:"Enter your email",password:"Password",enterPassword:"Enter your password",logIn:"Log In",forgotPassword:"Forgot Password?",or:"OR",caregiverLogin:"Caregiver Login",caregiverDesc:"For next-of-kin & proxies",needHelp:"Need help logging in?",selectLanguage:"Select Language",english:"English",malay:"Bahasa Melayu",chinese:"中文 (简体)",tamil:"தமிழ் (Tamil)",continue:"Continue",helloFriend:"Hello, Friend!",dailyCheckIn:"Daily Check-in",howAreYouToday:"How are you today?",iAmOk:"I AM OK",sosButton:"SOS",goodMorning:"Good Morning",checkedIn:"Checked In",checkInDesc:"How are you feeling today? Complete your daily health check-in",checkedInDesc:"Great! You've completed your daily check-in",doCheckIn:"Do my daily check-in",viewMedicalRecords:"View Medical Records",viewMedicalRecordsDesc:"Access your health history",medicationReminders:"Medication Reminders",medicationRemindersDesc:"Manage your medications",upcomingAppointments:"Upcoming Appointments",upcomingAppointmentsDesc:"See your scheduled visits",home:"Home",wellness:"Wellness",rewards:"Rewards",meds:"Medicine",sos:"SOS",points:"Points",profile:"Profile",emergencySOS:"Emergency SOS",sosDesc:"Press the button below to send SOS to your emergency contacts",sendingAlert:"Sending emergency alert...",sosWarning:"This feature will alert emergency services in 15 seconds",editEmergencyContacts:"Edit Emergency Contacts",viewSupport:"View My Support",didYouMeanToSendSOS1:"Did you mean to",didYouMeanToSendSOS2:"send SOS?",alertContactsLine1:"We will alert your emergency",alertContactsLine2:"contacts once you confirm.",autoCancelIn:"Auto-cancel in",seconds:"seconds",yesSendSOS:"Yes, send SOS",cancelSOS:"Cancel SOS",personalInfo:"Personal Information",notifications:"Notifications",privacySecurity:"Privacy & Security",helpSupport:"Help & Support",logOut:"Log Out",editProfile:"Edit Profile",healthRewardsBalance:"Your Health Rewards Balance",redeemPoints:"Redeem Your Points",healthStoreVoucher:"$5 Health Store Voucher",freeCheckup:"Free Health Checkup",pharmacyDiscount:"$10 Pharmacy Discount",redeem:"Redeem",howToEarn:"How to Earn Points",earnCheckIn:"Daily Check-in",earnAssessment:"Complete Health Assessment",earnAdherence:"Medication Adherence (7 days)",earnReferral:"Refer a Friend",pts:"pts",medicationRemindersTitle:"Medication Reminders",addNewMedication:"Add New Medication",taken:"Taken",takeNow:"Take Now"}},ms:{translation:{careConnect:"CareConnect",mobile:"Mudah Alih",welcomeBack:"Selamat Kembali!",email:"E-mel",enterEmail:"Masukkan e-mel anda",password:"Kata Laluan",enterPassword:"Masukkan kata laluan anda",logIn:"Log Masuk",forgotPassword:"Lupa Kata Laluan?",or:"ATAU",caregiverLogin:"Log Masuk Penjaga",caregiverDesc:"Untuk saudara terdekat & proksi",needHelp:"Perlukan bantuan log masuk?",selectLanguage:"Pilih Bahasa",english:"English",malay:"Bahasa Melayu",chinese:"中文 (简体)",tamil:"தமிழ் (Tamil)",continue:"Teruskan",helloFriend:"Helo, Kawan!",dailyCheckIn:"Daftar Masuk Harian",howAreYouToday:"Apa khabar anda hari ini?",iAmOk:"SAYA OK",sosButton:"SOS",goodMorning:"Selamat Pagi",checkedIn:"Berjaya Daftar",checkInDesc:"Bagaimana perasaan anda hari ini? Lengkapkan pemeriksaan kesihatan harian anda",checkedInDesc:"Hebat! Anda telah menyelesaikan daftar masuk harian anda",doCheckIn:"Buat daftar masuk harian saya",viewMedicalRecords:"Lihat Rekod Perubatan",viewMedicalRecordsDesc:"Akses sejarah kesihatan anda",medicationReminders:"Peringatan Ubat",medicationRemindersDesc:"Urus ubat-ubatan anda",upcomingAppointments:"Temujanji Akan Datang",upcomingAppointmentsDesc:"Lihat lawatan terjadual anda",home:"Utama",wellness:"Kesihatan",rewards:"Ganjaran",meds:"Ubat",sos:"SOS",points:"Mata",profile:"Profil",emergencySOS:"SOS Kecemasan",sosDesc:"Tekan butang di bawah untuk hantar SOS kepada kenalan kecemasan anda",sendingAlert:"Menghantar amaran kecemasan...",sosWarning:"Ciri ini akan memaklumkan perkhidmatan kecemasan dalam 15 saat",editEmergencyContacts:"Edit Kenalan Kecemasan",viewSupport:"Lihat Sokongan Saya",didYouMeanToSendSOS1:"Adakah anda bermaksud",didYouMeanToSendSOS2:"untuk hantar SOS?",alertContactsLine1:"Kami akan memaklumkan kenalan",alertContactsLine2:"kecemasan anda sebaik sahaja anda mengesahkan.",autoCancelIn:"Auto-batal dalam",seconds:"saat",yesSendSOS:"Ya, hantar SOS",cancelSOS:"Batal SOS",personalInfo:"Maklumat Peribadi",notifications:"Pemberitahuan",privacySecurity:"Privasi & Keselamatan",helpSupport:"Bantuan & Sokongan",logOut:"Log Keluar",editProfile:"Edit Profil",healthRewardsBalance:"Baki Ganjaran Kesihatan Anda",redeemPoints:"Tebus Mata Anda",healthStoreVoucher:"Baucar Kedai Kesihatan $5",freeCheckup:"Pemeriksaan Kesihatan Percuma",pharmacyDiscount:"Diskaun Farmasi $10",redeem:"Tebus",howToEarn:"Cara Untuk Dapatkan Mata",earnCheckIn:"Daftar masuk harian",earnAssessment:"Lengkapkan Penilaian Kesihatan",earnAdherence:"Pematuhan Ubat (7 hari)",earnReferral:"Rujuk Rakan",pts:"mata",medicationRemindersTitle:"Peringatan Ubat",addNewMedication:"Tambah Ubat Baru",taken:"Diambil",takeNow:"Ambil Sekarang"}},zh:{translation:{careConnect:"CareConnect",mobile:"移动版",welcomeBack:"欢迎回来！",email:"电子邮件",enterEmail:"输入您的电子邮件",password:"密码",enterPassword:"输入您的密码",logIn:"登录",forgotPassword:"忘记密码？",or:"或",caregiverLogin:"护理人员登录",caregiverDesc:"适用于近亲和代理人",needHelp:"需要登录帮助？",selectLanguage:"选择语言",english:"English",malay:"Bahasa Melayu",chinese:"中文 (简体)",tamil:"தமிழ் (Tamil)",continue:"继续",helloFriend:"你好，朋友！",dailyCheckIn:"每日签到",howAreYouToday:"你今天怎么样？",iAmOk:"我很好",sosButton:"紧急求救",goodMorning:"早上好",checkedIn:"已签到",checkInDesc:"您今天感觉如何？完成您的每日健康检查",checkedInDesc:"太好了！您已完成今日签到",doCheckIn:"进行每日签到",viewMedicalRecords:"查看医疗记录",viewMedicalRecordsDesc:"访问您的健康历史",medicationReminders:"用药提醒",medicationRemindersDesc:"管理您的药物",upcomingAppointments:"即将到来的预约",upcomingAppointmentsDesc:"查看您的预定访问",home:"首页",wellness:"健康",rewards:"奖励",meds:"药物",sos:"紧急",points:"积分",profile:"个人",emergencySOS:"紧急求救",sosDesc:"按下面的按钮向您的紧急联系人发送求救信号",sendingAlert:"正在发送紧急警报...",sosWarning:"此功能将在15秒内通知紧急服务",editEmergencyContacts:"编辑紧急联系人",viewSupport:"查看我的支持",didYouMeanToSendSOS1:"您是否要",didYouMeanToSendSOS2:"发送求救信号？",alertContactsLine1:"一旦您确认，我们将通知",alertContactsLine2:"您的紧急联系人。",autoCancelIn:"自动取消时间",seconds:"秒",yesSendSOS:"是的，发送求救",cancelSOS:"取消求救",personalInfo:"个人信息",notifications:"通知",privacySecurity:"隐私与安全",helpSupport:"帮助与支持",logOut:"退出登录",editProfile:"编辑个人资料",healthRewardsBalance:"您的健康奖励余额",redeemPoints:"兑换您的积分",healthStoreVoucher:"$5 健康商店优惠券",freeCheckup:"免费健康检查",pharmacyDiscount:"$10 药房折扣",redeem:"兑换",howToEarn:"如何赚取积分",earnCheckIn:"每日签到",earnAssessment:"完成健康评估",earnAdherence:"药物依从性（7天）",earnReferral:"推荐朋友",pts:"分",medicationRemindersTitle:"用药提醒",addNewMedication:"添加新药物",taken:"已服用",takeNow:"立即服用"}},ta:{translation:{careConnect:"CareConnect",mobile:"மொபைல்",welcomeBack:"மீண்டும் வரவேற்கிறோம்!",email:"மின்னஞ்சல்",enterEmail:"உங்கள் மின்னஞ்சலை உள்ளிடவும்",password:"கடவுச்சொல்",enterPassword:"உங்கள் கடவுச்சொல்லை உள்ளிடவும்",logIn:"உள்நுழைய",forgotPassword:"கடவுச்சொல் மறந்துவிட்டதா?",or:"அல்லது",caregiverLogin:"பராமரிப்பாளர் உள்நுழைவு",caregiverDesc:"உறவினர்கள் & பிரதிநிதிகளுக்கு",needHelp:"உள்நுழைவதில் உதவி தேவையா?",selectLanguage:"மொழியைத் தேர்ந்தெடுக்கவும்",english:"English",malay:"Bahasa Melayu",chinese:"中文 (简体)",tamil:"தமிழ் (Tamil)",continue:"தொடரவும்",helloFriend:"வணக்கம், நண்பரே!",dailyCheckIn:"தினசரி செக்-இன்",howAreYouToday:"இன்று நீங்கள் எப்படி இருக்கிறீர்கள்?",iAmOk:"நான் நன்றாக இருக்கிறேன்",sosButton:"SOS",goodMorning:"காலை வணக்கம்",checkedIn:"செக்-இன் செய்யப்பட்டது",checkInDesc:"இன்று நீங்கள் எப்படி உணர்கிறீர்கள்? உங்கள் தினசரி சுகாதார சோதனையை முடிக்கவும்",checkedInDesc:"அருமை! நீங்கள் உங்கள் தினசரி செக்-இன் முடித்துவிட்டீர்கள்",doCheckIn:"எனது தினசரி செக்-இன் செய்யவும்",viewMedicalRecords:"மருத்துவ பதிவுகளைக் காண்க",viewMedicalRecordsDesc:"உங்கள் சுகாதார வரலாற்றை அணுகவும்",medicationReminders:"மருந்து நினைவூட்டல்கள்",medicationRemindersDesc:"உங்கள் மருந்துகளை நிர்வகிக்கவும்",upcomingAppointments:"வரவிருக்கும் நியமனங்கள்",upcomingAppointmentsDesc:"உங்கள் திட்டமிடப்பட்ட வருகைகளைக் காண்க",home:"முகப்பு",wellness:"நலவாழ்வு",rewards:"வெகுமதிகள்",meds:"மருந்துகள்",sos:"SOS",points:"புள்ளிகள்",profile:"சுயவிவரம்",emergencySOS:"அவசர SOS",sosDesc:"உங்கள் அவசர தொடர்புகளுக்கு SOS அனுப்ப கீழே உள்ள பொத்தானை அழுத்தவும்",sendingAlert:"அவசர எச்சரிக்கையை அனுப்புகிறது...",sosWarning:"இந்த அம்சம் 15 விநாடிகளில் அவசர சேவைகளை எச்சரிக்கும்",editEmergencyContacts:"அவசர தொடர்புகளைத் திருத்து",viewSupport:"எனது ஆதரவைக் காண்க",didYouMeanToSendSOS1:"நீங்கள்",didYouMeanToSendSOS2:"SOS அனுப்ப விரும்புகிறீர்களா?",alertContactsLine1:"நீங்கள் உறுதிப்படுத்தியவுடன் உங்கள்",alertContactsLine2:"அவசர தொடர்புகளுக்கு எச்சரிக்கை அனுப்புவோம்.",autoCancelIn:"தானாக ரத்து செய்யப்படும்",seconds:"விநாடிகளில்",yesSendSOS:"ஆம், SOS அனுப்பவும்",cancelSOS:"SOS ரத்து செய்யவும்",personalInfo:"தனிப்பட்ட தகவல்",notifications:"அறிவிப்புகள்",privacySecurity:"தனியுரிமை & பாதுகாப்பு",helpSupport:"உதவி & ஆதரவு",logOut:"வெளியேறு",editProfile:"சுயவிவரத்தைத் திருத்து",healthRewardsBalance:"உங்கள் சுகாதார வெகுமதி இருப்பு",redeemPoints:"உங்கள் புள்ளிகளை மீட்கவும்",healthStoreVoucher:"$5 சுகாதார கடை வவுச்சர்",freeCheckup:"இலவச சுகாதார பரிசோதனை",pharmacyDiscount:"$10 மருந்தகம் தள்ளுபடி",redeem:"மீட்கவும்",howToEarn:"புள்ளிகளைப் பெறுவது எப்படி",earnCheckIn:"தினசரி செக்-இன்",earnAssessment:"சுகாதார மதிப்பீட்டை முடிக்கவும்",earnAdherence:"மருந்து கடைபிடிப்பு (7 நாட்கள்)",earnReferral:"நண்பரை பரிந்துரைக்கவும்",pts:"புள்ளிகள்",medicationRemindersTitle:"மருந்து நினைவூட்டல்கள்",addNewMedication:"புதிய மருந்தைச் சேர்க்கவும்",taken:"எடுக்கப்பட்டது",takeNow:"இப்போது எடுக்கவும்"}}};ft.use(JS).init({resources:o1,lng:"en",fallbackLng:"en",interpolation:{escapeValue:!1}});const a1=()=>{};var sm={};/**
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
 */const Mg={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const j=function(r,e){if(!r)throw Si(e)},Si=function(r){return new Error("Firebase Database ("+Mg.SDK_VERSION+") INTERNAL ASSERT FAILED: "+r)};/**
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
 */const jg=function(r){const e=[];let t=0;for(let s=0;s<r.length;s++){let o=r.charCodeAt(s);o<128?e[t++]=o:o<2048?(e[t++]=o>>6|192,e[t++]=o&63|128):(o&64512)===55296&&s+1<r.length&&(r.charCodeAt(s+1)&64512)===56320?(o=65536+((o&1023)<<10)+(r.charCodeAt(++s)&1023),e[t++]=o>>18|240,e[t++]=o>>12&63|128,e[t++]=o>>6&63|128,e[t++]=o&63|128):(e[t++]=o>>12|224,e[t++]=o>>6&63|128,e[t++]=o&63|128)}return e},l1=function(r){const e=[];let t=0,s=0;for(;t<r.length;){const o=r[t++];if(o<128)e[s++]=String.fromCharCode(o);else if(o>191&&o<224){const l=r[t++];e[s++]=String.fromCharCode((o&31)<<6|l&63)}else if(o>239&&o<365){const l=r[t++],u=r[t++],h=r[t++],p=((o&7)<<18|(l&63)<<12|(u&63)<<6|h&63)-65536;e[s++]=String.fromCharCode(55296+(p>>10)),e[s++]=String.fromCharCode(56320+(p&1023))}else{const l=r[t++],u=r[t++];e[s++]=String.fromCharCode((o&15)<<12|(l&63)<<6|u&63)}}return e.join("")},Yu={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let o=0;o<r.length;o+=3){const l=r[o],u=o+1<r.length,h=u?r[o+1]:0,p=o+2<r.length,m=p?r[o+2]:0,v=l>>2,_=(l&3)<<4|h>>4;let x=(h&15)<<2|m>>6,R=m&63;p||(R=64,u||(x=64)),s.push(t[v],t[_],t[x],t[R])}return s.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(jg(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):l1(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let o=0;o<r.length;){const l=t[r.charAt(o++)],h=o<r.length?t[r.charAt(o)]:0;++o;const m=o<r.length?t[r.charAt(o)]:64;++o;const _=o<r.length?t[r.charAt(o)]:64;if(++o,l==null||h==null||m==null||_==null)throw new c1;const x=l<<2|h>>4;if(s.push(x),m!==64){const R=h<<4&240|m>>2;if(s.push(R),_!==64){const T=m<<6&192|_;s.push(T)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class c1 extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Fg=function(r){const e=jg(r);return Yu.encodeByteArray(e,!0)},_a=function(r){return Fg(r).replace(/\./g,"")},va=function(r){try{return Yu.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function u1(r){return Ug(void 0,r)}function Ug(r,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:r===void 0&&(r={});break;case Array:r=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!d1(t)||(r[t]=Ug(r[t],e[t]));return r}function d1(r){return r!=="__proto__"}/**
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
 */function h1(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const f1=()=>h1().__FIREBASE_DEFAULTS__,p1=()=>{if(typeof process>"u"||typeof sm>"u")return;const r=sm.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},m1=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&va(r[1]);return e&&JSON.parse(e)},Qu=()=>{try{return a1()||f1()||p1()||m1()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},zg=r=>{var e,t;return(t=(e=Qu())==null?void 0:e.emulatorHosts)==null?void 0:t[r]},g1=r=>{const e=zg(r);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},$g=()=>{var r;return(r=Qu())==null?void 0:r.config},Bg=r=>{var e;return(e=Qu())==null?void 0:e[`_${r}`]};/**
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
 */class Ju{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}}/**
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
 */function y1(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",o=r.iat||0,l=r.sub||r.user_id;if(!l)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const u={iss:`https://securetoken.google.com/${s}`,aud:s,iat:o,exp:o+3600,auth_time:o,sub:l,user_id:l,firebase:{sign_in_provider:"custom",identities:{}},...r};return[_a(JSON.stringify(t)),_a(JSON.stringify(u)),""].join(".")}/**
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
 */function ht(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Xu(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ht())}function _1(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Vg(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function Hg(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function v1(){const r=ht();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function w1(){return Mg.NODE_ADMIN===!0}function Wg(){try{return typeof indexedDB=="object"}catch{return!1}}function Kg(){return new Promise((r,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",o=self.indexedDB.open(s);o.onsuccess=()=>{o.result.close(),t||self.indexedDB.deleteDatabase(s),r(!0)},o.onupgradeneeded=()=>{t=!1},o.onerror=()=>{var l;e(((l=o.error)==null?void 0:l.message)||"")}}catch(t){e(t)}})}function S1(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const x1="FirebaseError";class un extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=x1,Object.setPrototypeOf(this,un.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Rr.prototype.create)}}class Rr{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},o=`${this.service}/${e}`,l=this.errors[e],u=l?E1(l,s):"Error",h=`${this.serviceName}: ${u} (${o}).`;return new un(o,h,s)}}function E1(r,e){return r.replace(k1,(t,s)=>{const o=e[s];return o!=null?String(o):`<${s}?>`})}const k1=/\{\$([^}]+)}/g;/**
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
 */function As(r){return JSON.parse(r)}function tt(r){return JSON.stringify(r)}/**
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
 */const Gg=function(r){let e={},t={},s={},o="";try{const l=r.split(".");e=As(va(l[0])||""),t=As(va(l[1])||""),o=l[2],s=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:s,signature:o}},C1=function(r){const e=Gg(r),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},I1=function(r){const e=Gg(r).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function Tn(r,e){return Object.prototype.hasOwnProperty.call(r,e)}function gi(r,e){if(Object.prototype.hasOwnProperty.call(r,e))return r[e]}function Tu(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function wa(r,e,t){const s={};for(const o in r)Object.prototype.hasOwnProperty.call(r,o)&&(s[o]=e.call(t,r[o],o,r));return s}function nr(r,e){if(r===e)return!0;const t=Object.keys(r),s=Object.keys(e);for(const o of t){if(!s.includes(o))return!1;const l=r[o],u=e[o];if(om(l)&&om(u)){if(!nr(l,u))return!1}else if(l!==u)return!1}for(const o of s)if(!t.includes(o))return!1;return!0}function om(r){return r!==null&&typeof r=="object"}/**
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
 */function xi(r){const e=[];for(const[t,s]of Object.entries(r))Array.isArray(s)?s.forEach(o=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(o))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function Ss(r){const e={};return r.replace(/^\?/,"").split("&").forEach(s=>{if(s){const[o,l]=s.split("=");e[decodeURIComponent(o)]=decodeURIComponent(l)}}),e}function xs(r){const e=r.indexOf("?");if(!e)return"";const t=r.indexOf("#",e);return r.substring(e,t>0?t:void 0)}/**
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
 */class T1{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const s=this.W_;if(typeof e=="string")for(let _=0;_<16;_++)s[_]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let _=0;_<16;_++)s[_]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let _=16;_<80;_++){const x=s[_-3]^s[_-8]^s[_-14]^s[_-16];s[_]=(x<<1|x>>>31)&4294967295}let o=this.chain_[0],l=this.chain_[1],u=this.chain_[2],h=this.chain_[3],p=this.chain_[4],m,v;for(let _=0;_<80;_++){_<40?_<20?(m=h^l&(u^h),v=1518500249):(m=l^u^h,v=1859775393):_<60?(m=l&u|h&(l|u),v=2400959708):(m=l^u^h,v=3395469782);const x=(o<<5|o>>>27)+m+p+v+s[_]&4294967295;p=h,h=u,u=(l<<30|l>>>2)&4294967295,l=o,o=x}this.chain_[0]=this.chain_[0]+o&4294967295,this.chain_[1]=this.chain_[1]+l&4294967295,this.chain_[2]=this.chain_[2]+u&4294967295,this.chain_[3]=this.chain_[3]+h&4294967295,this.chain_[4]=this.chain_[4]+p&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const s=t-this.blockSize;let o=0;const l=this.buf_;let u=this.inbuf_;for(;o<t;){if(u===0)for(;o<=s;)this.compress_(e,o),o+=this.blockSize;if(typeof e=="string"){for(;o<t;)if(l[u]=e.charCodeAt(o),++u,++o,u===this.blockSize){this.compress_(l),u=0;break}}else for(;o<t;)if(l[u]=e[o],++u,++o,u===this.blockSize){this.compress_(l),u=0;break}}this.inbuf_=u,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let o=this.blockSize-1;o>=56;o--)this.buf_[o]=t&255,t/=256;this.compress_(this.buf_);let s=0;for(let o=0;o<5;o++)for(let l=24;l>=0;l-=8)e[s]=this.chain_[o]>>l&255,++s;return e}}function N1(r,e){const t=new R1(r,e);return t.subscribe.bind(t)}class R1{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,s){let o;if(e===void 0&&t===void 0&&s===void 0)throw new Error("Missing Observer.");P1(e,["next","error","complete"])?o=e:o={next:e,error:t,complete:s},o.next===void 0&&(o.next=nu),o.error===void 0&&(o.error=nu),o.complete===void 0&&(o.complete=nu);const l=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?o.error(this.finalError):o.complete()}catch{}}),this.observers.push(o),l}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function P1(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function nu(){}function b1(r,e){return`${r} failed: ${e} argument `}/**
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
 */const A1=function(r){const e=[];let t=0;for(let s=0;s<r.length;s++){let o=r.charCodeAt(s);if(o>=55296&&o<=56319){const l=o-55296;s++,j(s<r.length,"Surrogate pair missing trail surrogate.");const u=r.charCodeAt(s)-56320;o=65536+(l<<10)+u}o<128?e[t++]=o:o<2048?(e[t++]=o>>6|192,e[t++]=o&63|128):o<65536?(e[t++]=o>>12|224,e[t++]=o>>6&63|128,e[t++]=o&63|128):(e[t++]=o>>18|240,e[t++]=o>>12&63|128,e[t++]=o>>6&63|128,e[t++]=o&63|128)}return e},za=function(r){let e=0;for(let t=0;t<r.length;t++){const s=r.charCodeAt(t);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,t++):e+=3}return e};/**
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
 */const O1=1e3,L1=2,D1=14400*1e3,M1=.5;function am(r,e=O1,t=L1){const s=e*Math.pow(t,r),o=Math.round(M1*s*(Math.random()-.5)*2);return Math.min(D1,s+o)}/**
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
 */function Nt(r){return r&&r._delegate?r._delegate:r}/**
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
 */function Fs(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function qg(r){return(await fetch(r,{credentials:"include"})).ok}class Jt{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const _r="[DEFAULT]";/**
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
 */class j1{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new Ju;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const o=this.getOrInitializeService({instanceIdentifier:t});o&&s.resolve(o)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(U1(e))try{this.getOrInitializeService({instanceIdentifier:_r})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(t);try{const l=this.getOrInitializeService({instanceIdentifier:o});s.resolve(l)}catch{}}}}clearInstance(e=_r){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=_r){return this.instances.has(e)}getOptions(e=_r){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const o=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[l,u]of this.instancesDeferred.entries()){const h=this.normalizeInstanceIdentifier(l);s===h&&u.resolve(o)}return o}onInit(e,t){const s=this.normalizeInstanceIdentifier(t),o=this.onInitCallbacks.get(s)??new Set;o.add(e),this.onInitCallbacks.set(s,o);const l=this.instances.get(s);return l&&e(l,s),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const o of s)try{o(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:F1(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=_r){return this.component?this.component.multipleInstances?e:_r:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function F1(r){return r===_r?void 0:r}function U1(r){return r.instantiationMode==="EAGER"}/**
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
 */class z1{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new j1(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var xe;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(xe||(xe={}));const $1={debug:xe.DEBUG,verbose:xe.VERBOSE,info:xe.INFO,warn:xe.WARN,error:xe.ERROR,silent:xe.SILENT},B1=xe.INFO,V1={[xe.DEBUG]:"log",[xe.VERBOSE]:"log",[xe.INFO]:"info",[xe.WARN]:"warn",[xe.ERROR]:"error"},H1=(r,e,...t)=>{if(e<r.logLevel)return;const s=new Date().toISOString(),o=V1[e];if(o)console[o](`[${s}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class $a{constructor(e){this.name=e,this._logLevel=B1,this._logHandler=H1,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in xe))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?$1[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,xe.DEBUG,...e),this._logHandler(this,xe.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,xe.VERBOSE,...e),this._logHandler(this,xe.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,xe.INFO,...e),this._logHandler(this,xe.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,xe.WARN,...e),this._logHandler(this,xe.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,xe.ERROR,...e),this._logHandler(this,xe.ERROR,...e)}}const W1=(r,e)=>e.some(t=>r instanceof t);let lm,cm;function K1(){return lm||(lm=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function G1(){return cm||(cm=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Yg=new WeakMap,Nu=new WeakMap,Qg=new WeakMap,ru=new WeakMap,Zu=new WeakMap;function q1(r){const e=new Promise((t,s)=>{const o=()=>{r.removeEventListener("success",l),r.removeEventListener("error",u)},l=()=>{t(Xn(r.result)),o()},u=()=>{s(r.error),o()};r.addEventListener("success",l),r.addEventListener("error",u)});return e.then(t=>{t instanceof IDBCursor&&Yg.set(t,r)}).catch(()=>{}),Zu.set(e,r),e}function Y1(r){if(Nu.has(r))return;const e=new Promise((t,s)=>{const o=()=>{r.removeEventListener("complete",l),r.removeEventListener("error",u),r.removeEventListener("abort",u)},l=()=>{t(),o()},u=()=>{s(r.error||new DOMException("AbortError","AbortError")),o()};r.addEventListener("complete",l),r.addEventListener("error",u),r.addEventListener("abort",u)});Nu.set(r,e)}let Ru={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return Nu.get(r);if(e==="objectStoreNames")return r.objectStoreNames||Qg.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Xn(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function Q1(r){Ru=r(Ru)}function J1(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=r.call(iu(this),e,...t);return Qg.set(s,e.sort?e.sort():[e]),Xn(s)}:G1().includes(r)?function(...e){return r.apply(iu(this),e),Xn(Yg.get(this))}:function(...e){return Xn(r.apply(iu(this),e))}}function X1(r){return typeof r=="function"?J1(r):(r instanceof IDBTransaction&&Y1(r),W1(r,K1())?new Proxy(r,Ru):r)}function Xn(r){if(r instanceof IDBRequest)return q1(r);if(ru.has(r))return ru.get(r);const e=X1(r);return e!==r&&(ru.set(r,e),Zu.set(e,r)),e}const iu=r=>Zu.get(r);function Jg(r,e,{blocked:t,upgrade:s,blocking:o,terminated:l}={}){const u=indexedDB.open(r,e),h=Xn(u);return s&&u.addEventListener("upgradeneeded",p=>{s(Xn(u.result),p.oldVersion,p.newVersion,Xn(u.transaction),p)}),t&&u.addEventListener("blocked",p=>t(p.oldVersion,p.newVersion,p)),h.then(p=>{l&&p.addEventListener("close",()=>l()),o&&p.addEventListener("versionchange",m=>o(m.oldVersion,m.newVersion,m))}).catch(()=>{}),h}const Z1=["get","getKey","getAll","getAllKeys","count"],ex=["put","add","delete","clear"],su=new Map;function um(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(su.get(e))return su.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,o=ex.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(o||Z1.includes(t)))return;const l=async function(u,...h){const p=this.transaction(u,o?"readwrite":"readonly");let m=p.store;return s&&(m=m.index(h.shift())),(await Promise.all([m[t](...h),o&&p.done]))[0]};return su.set(e,l),l}Q1(r=>({...r,get:(e,t,s)=>um(e,t)||r.get(e,t,s),has:(e,t)=>!!um(e,t)||r.has(e,t)}));/**
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
 */class tx{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(nx(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function nx(r){const e=r.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Pu="@firebase/app",dm="0.14.12";/**
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
 */const kn=new $a("@firebase/app"),rx="@firebase/app-compat",ix="@firebase/analytics-compat",sx="@firebase/analytics",ox="@firebase/app-check-compat",ax="@firebase/app-check",lx="@firebase/auth",cx="@firebase/auth-compat",ux="@firebase/database",dx="@firebase/data-connect",hx="@firebase/database-compat",fx="@firebase/functions",px="@firebase/functions-compat",mx="@firebase/installations",gx="@firebase/installations-compat",yx="@firebase/messaging",_x="@firebase/messaging-compat",vx="@firebase/performance",wx="@firebase/performance-compat",Sx="@firebase/remote-config",xx="@firebase/remote-config-compat",Ex="@firebase/storage",kx="@firebase/storage-compat",Cx="@firebase/firestore",Ix="@firebase/ai",Tx="@firebase/firestore-compat",Nx="firebase",Rx="12.13.0";/**
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
 */const bu="[DEFAULT]",Px={[Pu]:"fire-core",[rx]:"fire-core-compat",[sx]:"fire-analytics",[ix]:"fire-analytics-compat",[ax]:"fire-app-check",[ox]:"fire-app-check-compat",[lx]:"fire-auth",[cx]:"fire-auth-compat",[ux]:"fire-rtdb",[dx]:"fire-data-connect",[hx]:"fire-rtdb-compat",[fx]:"fire-fn",[px]:"fire-fn-compat",[mx]:"fire-iid",[gx]:"fire-iid-compat",[yx]:"fire-fcm",[_x]:"fire-fcm-compat",[vx]:"fire-perf",[wx]:"fire-perf-compat",[Sx]:"fire-rc",[xx]:"fire-rc-compat",[Ex]:"fire-gcs",[kx]:"fire-gcs-compat",[Cx]:"fire-fst",[Tx]:"fire-fst-compat",[Ix]:"fire-vertex","fire-js":"fire-js",[Nx]:"fire-js-all"};/**
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
 */const Sa=new Map,bx=new Map,Au=new Map;function hm(r,e){try{r.container.addComponent(e)}catch(t){kn.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function cn(r){const e=r.name;if(Au.has(e))return kn.debug(`There were multiple attempts to register component ${e}.`),!1;Au.set(e,r);for(const t of Sa.values())hm(t,r);for(const t of bx.values())hm(t,r);return!0}function Pr(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function Kt(r){return r==null?!1:r.settings!==void 0}/**
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
 */const Ax={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Zn=new Rr("app","Firebase",Ax);/**
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
 */class Ox{constructor(e,t,s){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Jt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Zn.create("app-deleted",{appName:this._name})}}/**
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
 */const Ei=Rx;function Xg(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const s={name:bu,automaticDataCollectionEnabled:!0,...e},o=s.name;if(typeof o!="string"||!o)throw Zn.create("bad-app-name",{appName:String(o)});if(t||(t=$g()),!t)throw Zn.create("no-options");const l=Sa.get(o);if(l){if(nr(t,l.options)&&nr(s,l.config))return l;throw Zn.create("duplicate-app",{appName:o})}const u=new z1(o);for(const p of Au.values())u.addComponent(p);const h=new Ox(t,s,u);return Sa.set(o,h),h}function ed(r=bu){const e=Sa.get(r);if(!e&&r===bu&&$g())return Xg();if(!e)throw Zn.create("no-app",{appName:r});return e}function jt(r,e,t){let s=Px[r]??r;t&&(s+=`-${t}`);const o=s.match(/\s|\//),l=e.match(/\s|\//);if(o||l){const u=[`Unable to register library "${s}" with version "${e}":`];o&&u.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&l&&u.push("and"),l&&u.push(`version name "${e}" contains illegal characters (whitespace or "/")`),kn.warn(u.join(" "));return}cn(new Jt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const Lx="firebase-heartbeat-database",Dx=1,Os="firebase-heartbeat-store";let ou=null;function Zg(){return ou||(ou=Jg(Lx,Dx,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(Os)}catch(t){console.warn(t)}}}}).catch(r=>{throw Zn.create("idb-open",{originalErrorMessage:r.message})})),ou}async function Mx(r){try{const t=(await Zg()).transaction(Os),s=await t.objectStore(Os).get(ey(r));return await t.done,s}catch(e){if(e instanceof un)kn.warn(e.message);else{const t=Zn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});kn.warn(t.message)}}}async function fm(r,e){try{const s=(await Zg()).transaction(Os,"readwrite");await s.objectStore(Os).put(e,ey(r)),await s.done}catch(t){if(t instanceof un)kn.warn(t.message);else{const s=Zn.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});kn.warn(s.message)}}}function ey(r){return`${r.name}!${r.options.appId}`}/**
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
 */const jx=1024,Fx=30;class Ux{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new $x(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,t;try{const o=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),l=pm();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===l||this._heartbeatsCache.heartbeats.some(u=>u.date===l))return;if(this._heartbeatsCache.heartbeats.push({date:l,agent:o}),this._heartbeatsCache.heartbeats.length>Fx){const u=Bx(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(u,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){kn.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=pm(),{heartbeatsToSend:s,unsentEntries:o}=zx(this._heartbeatsCache.heartbeats),l=_a(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=t,o.length>0?(this._heartbeatsCache.heartbeats=o,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),l}catch(t){return kn.warn(t),""}}}function pm(){return new Date().toISOString().substring(0,10)}function zx(r,e=jx){const t=[];let s=r.slice();for(const o of r){const l=t.find(u=>u.agent===o.agent);if(l){if(l.dates.push(o.date),mm(t)>e){l.dates.pop();break}}else if(t.push({agent:o.agent,dates:[o.date]}),mm(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class $x{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Wg()?Kg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Mx(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return fm(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return fm(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function mm(r){return _a(JSON.stringify({version:2,heartbeats:r})).length}function Bx(r){if(r.length===0)return-1;let e=0,t=r[0].date;for(let s=1;s<r.length;s++)r[s].date<t&&(t=r[s].date,e=s);return e}/**
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
 */function Vx(r){cn(new Jt("platform-logger",e=>new tx(e),"PRIVATE")),cn(new Jt("heartbeat",e=>new Ux(e),"PRIVATE")),jt(Pu,dm,r),jt(Pu,dm,"esm2020"),jt("fire-js","")}Vx("");function ty(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Hx=ty,ny=new Rr("auth","Firebase",ty());/**
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
 */const xa=new $a("@firebase/auth");function Wx(r,...e){xa.logLevel<=xe.WARN&&xa.warn(`Auth (${Ei}): ${r}`,...e)}function ua(r,...e){xa.logLevel<=xe.ERROR&&xa.error(`Auth (${Ei}): ${r}`,...e)}/**
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
 */function Xt(r,...e){throw td(r,...e)}function an(r,...e){return td(r,...e)}function ry(r,e,t){const s={...Hx(),[e]:t};return new Rr("auth","Firebase",s).create(e,{appName:r.name})}function er(r){return ry(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function td(r,...e){if(typeof r!="string"){const t=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=r.name),r._errorFactory.create(t,...s)}return ny.create(r,...e)}function Y(r,e,...t){if(!r)throw td(e,...t)}function wn(r){const e="INTERNAL ASSERTION FAILED: "+r;throw ua(e),new Error(e)}function Cn(r,e){r||wn(e)}/**
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
 */function Ou(){var r;return typeof self<"u"&&((r=self.location)==null?void 0:r.href)||""}function Kx(){return gm()==="http:"||gm()==="https:"}function gm(){var r;return typeof self<"u"&&((r=self.location)==null?void 0:r.protocol)||null}/**
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
 */function Gx(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Kx()||Vg()||"connection"in navigator)?navigator.onLine:!0}function qx(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
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
 */class Us{constructor(e,t){this.shortDelay=e,this.longDelay=t,Cn(t>e,"Short delay should be less than long delay!"),this.isMobile=Xu()||Hg()}get(){return Gx()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function nd(r,e){Cn(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class iy{static initialize(e,t,s){this.fetchImpl=e,t&&(this.headersImpl=t),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;wn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;wn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;wn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Yx={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Qx=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Jx=new Us(3e4,6e4);function br(r,e){return r.tenantId&&!e.tenantId?{...e,tenantId:r.tenantId}:e}async function ir(r,e,t,s,o={}){return sy(r,o,async()=>{let l={},u={};s&&(e==="GET"?u=s:l={body:JSON.stringify(s)});const h=xi({key:r.config.apiKey,...u}).slice(1),p=await r._getAdditionalHeaders();p["Content-Type"]="application/json",r.languageCode&&(p["X-Firebase-Locale"]=r.languageCode);const m={method:e,headers:p,...l};return _1()||(m.referrerPolicy="no-referrer"),r.emulatorConfig&&Fs(r.emulatorConfig.host)&&(m.credentials="include"),iy.fetch()(await oy(r,r.config.apiHost,t,h),m)})}async function sy(r,e,t){r._canInitEmulator=!1;const s={...Yx,...e};try{const o=new Zx(r),l=await Promise.race([t(),o.promise]);o.clearNetworkTimeout();const u=await l.json();if("needConfirmation"in u)throw oa(r,"account-exists-with-different-credential",u);if(l.ok&&!("errorMessage"in u))return u;{const h=l.ok?u.errorMessage:u.error.message,[p,m]=h.split(" : ");if(p==="FEDERATED_USER_ID_ALREADY_LINKED")throw oa(r,"credential-already-in-use",u);if(p==="EMAIL_EXISTS")throw oa(r,"email-already-in-use",u);if(p==="USER_DISABLED")throw oa(r,"user-disabled",u);const v=s[p]||p.toLowerCase().replace(/[_\s]+/g,"-");if(m)throw ry(r,v,m);Xt(r,v)}}catch(o){if(o instanceof un)throw o;Xt(r,"network-request-failed",{message:String(o)})}}async function Ba(r,e,t,s,o={}){const l=await ir(r,e,t,s,o);return"mfaPendingCredential"in l&&Xt(r,"multi-factor-auth-required",{_serverResponse:l}),l}async function oy(r,e,t,s){const o=`${e}${t}?${s}`,l=r,u=l.config.emulator?nd(r.config,o):`${r.config.apiScheme}://${o}`;return Qx.includes(t)&&(await l._persistenceManagerAvailable,l._getPersistenceType()==="COOKIE")?l._getPersistence()._getFinalTarget(u).toString():u}function Xx(r){switch(r){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Zx{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,s)=>{this.timer=setTimeout(()=>s(an(this.auth,"network-request-failed")),Jx.get())})}}function oa(r,e,t){const s={appName:r.name};t.email&&(s.email=t.email),t.phoneNumber&&(s.phoneNumber=t.phoneNumber);const o=an(r,e,s);return o.customData._tokenResponse=t,o}function ym(r){return r!==void 0&&r.enterprise!==void 0}class eE{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Xx(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function tE(r,e){return ir(r,"GET","/v2/recaptchaConfig",br(r,e))}/**
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
 */async function nE(r,e){return ir(r,"POST","/v1/accounts:delete",e)}async function Ea(r,e){return ir(r,"POST","/v1/accounts:lookup",e)}/**
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
 */function Cs(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function rE(r,e=!1){const t=Nt(r),s=await t.getIdToken(e),o=rd(s);Y(o&&o.exp&&o.auth_time&&o.iat,t.auth,"internal-error");const l=typeof o.firebase=="object"?o.firebase:void 0,u=l==null?void 0:l.sign_in_provider;return{claims:o,token:s,authTime:Cs(au(o.auth_time)),issuedAtTime:Cs(au(o.iat)),expirationTime:Cs(au(o.exp)),signInProvider:u||null,signInSecondFactor:(l==null?void 0:l.sign_in_second_factor)||null}}function au(r){return Number(r)*1e3}function rd(r){const[e,t,s]=r.split(".");if(e===void 0||t===void 0||s===void 0)return ua("JWT malformed, contained fewer than 3 sections"),null;try{const o=va(t);return o?JSON.parse(o):(ua("Failed to decode base64 JWT payload"),null)}catch(o){return ua("Caught error parsing JWT payload as JSON",o==null?void 0:o.toString()),null}}function _m(r){const e=rd(r);return Y(e,"internal-error"),Y(typeof e.exp<"u","internal-error"),Y(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Ls(r,e,t=!1){if(t)return e;try{return await e}catch(s){throw s instanceof un&&iE(s)&&r.auth.currentUser===r&&await r.auth.signOut(),s}}function iE({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
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
 */class sE{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Lu{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Cs(this.lastLoginAt),this.creationTime=Cs(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function ka(r){var _;const e=r.auth,t=await r.getIdToken(),s=await Ls(r,Ea(e,{idToken:t}));Y(s==null?void 0:s.users.length,e,"internal-error");const o=s.users[0];r._notifyReloadListener(o);const l=(_=o.providerUserInfo)!=null&&_.length?ay(o.providerUserInfo):[],u=aE(r.providerData,l),h=r.isAnonymous,p=!(r.email&&o.passwordHash)&&!(u!=null&&u.length),m=h?p:!1,v={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:u,metadata:new Lu(o.createdAt,o.lastLoginAt),isAnonymous:m};Object.assign(r,v)}async function oE(r){const e=Nt(r);await ka(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function aE(r,e){return[...r.filter(s=>!e.some(o=>o.providerId===s.providerId)),...e]}function ay(r){return r.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function lE(r,e){const t=await sy(r,{},async()=>{const s=xi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:o,apiKey:l}=r.config,u=await oy(r,o,"/v1/token",`key=${l}`),h=await r._getAdditionalHeaders();h["Content-Type"]="application/x-www-form-urlencoded";const p={method:"POST",headers:h,body:s};return r.emulatorConfig&&Fs(r.emulatorConfig.host)&&(p.credentials="include"),iy.fetch()(u,p)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function cE(r,e){return ir(r,"POST","/v2/accounts:revokeToken",br(r,e))}/**
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
 */class ui{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Y(e.idToken,"internal-error"),Y(typeof e.idToken<"u","internal-error"),Y(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):_m(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){Y(e.length!==0,"internal-error");const t=_m(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(Y(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:s,refreshToken:o,expiresIn:l}=await lE(e,t);this.updateTokensAndExpiration(s,o,Number(l))}updateTokensAndExpiration(e,t,s){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,t){const{refreshToken:s,accessToken:o,expirationTime:l}=t,u=new ui;return s&&(Y(typeof s=="string","internal-error",{appName:e}),u.refreshToken=s),o&&(Y(typeof o=="string","internal-error",{appName:e}),u.accessToken=o),l&&(Y(typeof l=="number","internal-error",{appName:e}),u.expirationTime=l),u}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ui,this.toJSON())}_performRefresh(){return wn("not implemented")}}/**
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
 */function Gn(r,e){Y(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class qt{constructor({uid:e,auth:t,stsTokenManager:s,...o}){this.providerId="firebase",this.proactiveRefresh=new sE(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new Lu(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const t=await Ls(this,this.stsTokenManager.getToken(this.auth,e));return Y(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return rE(this,e)}reload(){return oE(this)}_assign(e){this!==e&&(Y(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new qt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){Y(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),t&&await ka(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Kt(this.auth.app))return Promise.reject(er(this.auth));const e=await this.getIdToken();return await Ls(this,nE(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const s=t.displayName??void 0,o=t.email??void 0,l=t.phoneNumber??void 0,u=t.photoURL??void 0,h=t.tenantId??void 0,p=t._redirectEventId??void 0,m=t.createdAt??void 0,v=t.lastLoginAt??void 0,{uid:_,emailVerified:x,isAnonymous:R,providerData:T,stsTokenManager:L}=t;Y(_&&L,e,"internal-error");const U=ui.fromJSON(this.name,L);Y(typeof _=="string",e,"internal-error"),Gn(s,e.name),Gn(o,e.name),Y(typeof x=="boolean",e,"internal-error"),Y(typeof R=="boolean",e,"internal-error"),Gn(l,e.name),Gn(u,e.name),Gn(h,e.name),Gn(p,e.name),Gn(m,e.name),Gn(v,e.name);const ge=new qt({uid:_,auth:e,email:o,emailVerified:x,displayName:s,isAnonymous:R,photoURL:u,phoneNumber:l,tenantId:h,stsTokenManager:U,createdAt:m,lastLoginAt:v});return T&&Array.isArray(T)&&(ge.providerData=T.map(ce=>({...ce}))),p&&(ge._redirectEventId=p),ge}static async _fromIdTokenResponse(e,t,s=!1){const o=new ui;o.updateFromServerResponse(t);const l=new qt({uid:t.localId,auth:e,stsTokenManager:o,isAnonymous:s});return await ka(l),l}static async _fromGetAccountInfoResponse(e,t,s){const o=t.users[0];Y(o.localId!==void 0,"internal-error");const l=o.providerUserInfo!==void 0?ay(o.providerUserInfo):[],u=!(o.email&&o.passwordHash)&&!(l!=null&&l.length),h=new ui;h.updateFromIdToken(s);const p=new qt({uid:o.localId,auth:e,stsTokenManager:h,isAnonymous:u}),m={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:l,metadata:new Lu(o.createdAt,o.lastLoginAt),isAnonymous:!(o.email&&o.passwordHash)&&!(l!=null&&l.length)};return Object.assign(p,m),p}}/**
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
 */const vm=new Map;function Sn(r){Cn(r instanceof Function,"Expected a class definition");let e=vm.get(r);return e?(Cn(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,vm.set(r,e),e)}/**
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
 */class ly{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}ly.type="NONE";const wm=ly;/**
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
 */function da(r,e,t){return`firebase:${r}:${e}:${t}`}class di{constructor(e,t,s){this.persistence=e,this.auth=t,this.userKey=s;const{config:o,name:l}=this.auth;this.fullUserKey=da(this.userKey,o.apiKey,l),this.fullPersistenceKey=da("persistence",o.apiKey,l),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Ea(this.auth,{idToken:e}).catch(()=>{});return t?qt._fromGetAccountInfoResponse(this.auth,t,e):null}return qt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,s="authUser"){if(!t.length)return new di(Sn(wm),e,s);const o=(await Promise.all(t.map(async m=>{if(await m._isAvailable())return m}))).filter(m=>m);let l=o[0]||Sn(wm);const u=da(s,e.config.apiKey,e.name);let h=null;for(const m of t)try{const v=await m._get(u);if(v){let _;if(typeof v=="string"){const x=await Ea(e,{idToken:v}).catch(()=>{});if(!x)break;_=await qt._fromGetAccountInfoResponse(e,x,v)}else _=qt._fromJSON(e,v);m!==l&&(h=_),l=m;break}}catch{}const p=o.filter(m=>m._shouldAllowMigration);return!l._shouldAllowMigration||!p.length?new di(l,e,s):(l=p[0],h&&await l._set(u,h.toJSON()),await Promise.all(t.map(async m=>{if(m!==l)try{await m._remove(u)}catch{}})),new di(l,e,s))}}/**
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
 */function Sm(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(hy(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(cy(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(py(e))return"Blackberry";if(my(e))return"Webos";if(uy(e))return"Safari";if((e.includes("chrome/")||dy(e))&&!e.includes("edge/"))return"Chrome";if(fy(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=r.match(t);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function cy(r=ht()){return/firefox\//i.test(r)}function uy(r=ht()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function dy(r=ht()){return/crios\//i.test(r)}function hy(r=ht()){return/iemobile/i.test(r)}function fy(r=ht()){return/android/i.test(r)}function py(r=ht()){return/blackberry/i.test(r)}function my(r=ht()){return/webos/i.test(r)}function id(r=ht()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function uE(r=ht()){var e;return id(r)&&!!((e=window.navigator)!=null&&e.standalone)}function dE(){return v1()&&document.documentMode===10}function gy(r=ht()){return id(r)||fy(r)||my(r)||py(r)||/windows phone/i.test(r)||hy(r)}/**
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
 */function yy(r,e=[]){let t;switch(r){case"Browser":t=Sm(ht());break;case"Worker":t=`${Sm(ht())}-${r}`;break;default:t=r}const s=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Ei}/${s}`}/**
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
 */class hE{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const s=l=>new Promise((u,h)=>{try{const p=e(l);u(p)}catch(p){h(p)}});s.onAbort=t,this.queue.push(s);const o=this.queue.length-1;return()=>{this.queue[o]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const s of this.queue)await s(e),s.onAbort&&t.push(s.onAbort)}catch(s){t.reverse();for(const o of t)try{o()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
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
 */async function fE(r,e={}){return ir(r,"GET","/v2/passwordPolicy",br(r,e))}/**
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
 */const pE=6;class mE{constructor(e){var s;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??pE,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((s=e.allowedNonAlphanumericCharacters)==null?void 0:s.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const s=this.customStrengthOptions.minPasswordLength,o=this.customStrengthOptions.maxPasswordLength;s&&(t.meetsMinPasswordLength=e.length>=s),o&&(t.meetsMaxPasswordLength=e.length<=o)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let s;for(let o=0;o<e.length;o++)s=e.charAt(o),this.updatePasswordCharacterOptionsStatuses(t,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,t,s,o,l){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=o)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=l))}}/**
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
 */class gE{constructor(e,t,s,o){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=s,this.config=o,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new xm(this),this.idTokenSubscription=new xm(this),this.beforeStateQueue=new hE(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ny,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=o.sdkClientVersion,this._persistenceManagerAvailable=new Promise(l=>this._resolvePersistenceManagerAvailable=l)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Sn(t)),this._initializationPromise=this.queue(async()=>{var s,o,l;if(!this._deleted&&(this.persistenceManager=await di.create(this,e),(s=this._resolvePersistenceManagerAvailable)==null||s.call(this),!this._deleted)){if((o=this._popupRedirectResolver)!=null&&o._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((l=this.currentUser)==null?void 0:l.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Ea(this,{idToken:e}),s=await qt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(s)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var l;if(Kt(this.app)){const u=this.app.settings.authIdToken;return u?new Promise(h=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(u).then(h,h))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let s=t,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const u=(l=this.redirectUser)==null?void 0:l._redirectEventId,h=s==null?void 0:s._redirectEventId,p=await this.tryRedirectSignIn(e);(!u||u===h)&&(p!=null&&p.user)&&(s=p.user,o=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(s)}catch(u){s=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(u))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return Y(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ka(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=qx()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Kt(this.app))return Promise.reject(er(this));const t=e?Nt(e):null;return t&&Y(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&Y(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Kt(this.app)?Promise.reject(er(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Kt(this.app)?Promise.reject(er(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Sn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await fE(this),t=new mE(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Rr("auth","Firebase",e())}onAuthStateChanged(e,t,s){return this.registerStateListener(this.authStateSubscription,e,t,s)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,s){return this.registerStateListener(this.idTokenSubscription,e,t,s)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(s.tenantId=this.tenantId),await cE(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const s=await this.getOrInitRedirectPersistenceManager(t);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Sn(e)||this._popupRedirectResolver;Y(t,this,"argument-error"),this.redirectPersistenceManager=await di.create(this,[Sn(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,s;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((s=this.redirectUser)==null?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,s,o){if(this._deleted)return()=>{};const l=typeof t=="function"?t:t.next.bind(t);let u=!1;const h=this._isInitialized?Promise.resolve():this._initializationPromise;if(Y(h,this,"internal-error"),h.then(()=>{u||l(this.currentUser)}),typeof t=="function"){const p=e.addObserver(t,s,o);return()=>{u=!0,p()}}else{const p=e.addObserver(t);return()=>{u=!0,p()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Y(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=yy(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var o;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((o=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:o.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){var t;if(Kt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&Wx(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function ki(r){return Nt(r)}class xm{constructor(e){this.auth=e,this.observer=null,this.addObserver=N1(t=>this.observer=t)}get next(){return Y(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Va={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function yE(r){Va=r}function _y(r){return Va.loadJS(r)}function _E(){return Va.recaptchaEnterpriseScript}function vE(){return Va.gapiScript}function wE(r){return`__${r}${Math.floor(Math.random()*1e6)}`}class SE{constructor(){this.enterprise=new xE}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class xE{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const EE="recaptcha-enterprise",vy="NO_RECAPTCHA";class kE{constructor(e){this.type=EE,this.auth=ki(e)}async verify(e="verify",t=!1){async function s(l){if(!t){if(l.tenantId==null&&l._agentRecaptchaConfig!=null)return l._agentRecaptchaConfig.siteKey;if(l.tenantId!=null&&l._tenantRecaptchaConfigs[l.tenantId]!==void 0)return l._tenantRecaptchaConfigs[l.tenantId].siteKey}return new Promise(async(u,h)=>{tE(l,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(p=>{if(p.recaptchaKey===void 0)h(new Error("recaptcha Enterprise site key undefined"));else{const m=new eE(p);return l.tenantId==null?l._agentRecaptchaConfig=m:l._tenantRecaptchaConfigs[l.tenantId]=m,u(m.siteKey)}}).catch(p=>{h(p)})})}function o(l,u,h){const p=window.grecaptcha;ym(p)?p.enterprise.ready(()=>{p.enterprise.execute(l,{action:e}).then(m=>{u(m)}).catch(()=>{u(vy)})}):h(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new SE().execute("siteKey",{action:"verify"}):new Promise((l,u)=>{s(this.auth).then(h=>{if(!t&&ym(window.grecaptcha))o(h,l,u);else{if(typeof window>"u"){u(new Error("RecaptchaVerifier is only supported in browser"));return}let p=_E();p.length!==0&&(p+=h),_y(p).then(()=>{o(h,l,u)}).catch(m=>{u(m)})}}).catch(h=>{u(h)})})}}async function Em(r,e,t,s=!1,o=!1){const l=new kE(r);let u;if(o)u=vy;else try{u=await l.verify(t)}catch{u=await l.verify(t,!0)}const h={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in h){const p=h.phoneEnrollmentInfo.phoneNumber,m=h.phoneEnrollmentInfo.recaptchaToken;Object.assign(h,{phoneEnrollmentInfo:{phoneNumber:p,recaptchaToken:m,captchaResponse:u,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in h){const p=h.phoneSignInInfo.recaptchaToken;Object.assign(h,{phoneSignInInfo:{recaptchaToken:p,captchaResponse:u,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return h}return s?Object.assign(h,{captchaResp:u}):Object.assign(h,{captchaResponse:u}),Object.assign(h,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(h,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),h}async function km(r,e,t,s,o){var l;if((l=r._getRecaptchaConfig())!=null&&l.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const u=await Em(r,e,t,t==="getOobCode");return s(r,u)}else return s(r,e).catch(async u=>{if(u.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const h=await Em(r,e,t,t==="getOobCode");return s(r,h)}else return Promise.reject(u)})}/**
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
 */function CE(r,e){const t=Pr(r,"auth");if(t.isInitialized()){const o=t.getImmediate(),l=t.getOptions();if(nr(l,e??{}))return o;Xt(o,"already-initialized")}return t.initialize({options:e})}function IE(r,e){const t=(e==null?void 0:e.persistence)||[],s=(Array.isArray(t)?t:[t]).map(Sn);e!=null&&e.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function TE(r,e,t){const s=ki(r);Y(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const o=!1,l=wy(e),{host:u,port:h}=NE(e),p=h===null?"":`:${h}`,m={url:`${l}//${u}${p}/`},v=Object.freeze({host:u,port:h,protocol:l.replace(":",""),options:Object.freeze({disableWarnings:o})});if(!s._canInitEmulator){Y(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),Y(nr(m,s.config.emulator)&&nr(v,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=m,s.emulatorConfig=v,s.settings.appVerificationDisabledForTesting=!0,Fs(u)?qg(`${l}//${u}${p}`):RE()}function wy(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function NE(r){const e=wy(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const s=t[2].split("@").pop()||"",o=/^(\[[^\]]+\])(:|$)/.exec(s);if(o){const l=o[1];return{host:l,port:Cm(s.substr(l.length+1))}}else{const[l,u]=s.split(":");return{host:l,port:Cm(u)}}}function Cm(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function RE(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
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
 */class sd{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return wn("not implemented")}_getIdTokenResponse(e){return wn("not implemented")}_linkToIdToken(e,t){return wn("not implemented")}_getReauthenticationResolver(e){return wn("not implemented")}}async function PE(r,e){return ir(r,"POST","/v1/accounts:signUp",e)}/**
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
 */async function bE(r,e){return Ba(r,"POST","/v1/accounts:signInWithPassword",br(r,e))}/**
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
 */async function AE(r,e){return Ba(r,"POST","/v1/accounts:signInWithEmailLink",br(r,e))}async function OE(r,e){return Ba(r,"POST","/v1/accounts:signInWithEmailLink",br(r,e))}/**
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
 */class Ds extends sd{constructor(e,t,s,o=null){super("password",s),this._email=e,this._password=t,this._tenantId=o}static _fromEmailAndPassword(e,t){return new Ds(e,t,"password")}static _fromEmailAndCode(e,t,s=null){return new Ds(e,t,"emailLink",s)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return km(e,t,"signInWithPassword",bE);case"emailLink":return AE(e,{email:this._email,oobCode:this._password});default:Xt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const s={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return km(e,s,"signUpPassword",PE);case"emailLink":return OE(e,{idToken:t,email:this._email,oobCode:this._password});default:Xt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function hi(r,e){return Ba(r,"POST","/v1/accounts:signInWithIdp",br(r,e))}/**
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
 */const LE="http://localhost";class Er extends sd{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Er(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Xt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:o,...l}=t;if(!s||!o)return null;const u=new Er(s,o);return u.idToken=l.idToken||void 0,u.accessToken=l.accessToken||void 0,u.secret=l.secret,u.nonce=l.nonce,u.pendingToken=l.pendingToken||null,u}_getIdTokenResponse(e){const t=this.buildRequest();return hi(e,t)}_linkToIdToken(e,t){const s=this.buildRequest();return s.idToken=t,hi(e,s)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,hi(e,t)}buildRequest(){const e={requestUri:LE,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=xi(t)}return e}}/**
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
 */function DE(r){switch(r){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function ME(r){const e=Ss(xs(r)).link,t=e?Ss(xs(e)).deep_link_id:null,s=Ss(xs(r)).deep_link_id;return(s?Ss(xs(s)).link:null)||s||t||e||r}class od{constructor(e){const t=Ss(xs(e)),s=t.apiKey??null,o=t.oobCode??null,l=DE(t.mode??null);Y(s&&o&&l,"argument-error"),this.apiKey=s,this.operation=l,this.code=o,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=ME(e);try{return new od(t)}catch{return null}}}/**
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
 */class Ci{constructor(){this.providerId=Ci.PROVIDER_ID}static credential(e,t){return Ds._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const s=od.parseLink(t);return Y(s,"argument-error"),Ds._fromEmailAndCode(e,s.code,s.tenantId)}}Ci.PROVIDER_ID="password";Ci.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Ci.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class Sy{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class zs extends Sy{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class qn extends zs{constructor(){super("facebook.com")}static credential(e){return Er._fromParams({providerId:qn.PROVIDER_ID,signInMethod:qn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return qn.credentialFromTaggedObject(e)}static credentialFromError(e){return qn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return qn.credential(e.oauthAccessToken)}catch{return null}}}qn.FACEBOOK_SIGN_IN_METHOD="facebook.com";qn.PROVIDER_ID="facebook.com";/**
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
 */class Yn extends zs{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Er._fromParams({providerId:Yn.PROVIDER_ID,signInMethod:Yn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Yn.credentialFromTaggedObject(e)}static credentialFromError(e){return Yn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:s}=e;if(!t&&!s)return null;try{return Yn.credential(t,s)}catch{return null}}}Yn.GOOGLE_SIGN_IN_METHOD="google.com";Yn.PROVIDER_ID="google.com";/**
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
 */class Qn extends zs{constructor(){super("github.com")}static credential(e){return Er._fromParams({providerId:Qn.PROVIDER_ID,signInMethod:Qn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Qn.credentialFromTaggedObject(e)}static credentialFromError(e){return Qn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Qn.credential(e.oauthAccessToken)}catch{return null}}}Qn.GITHUB_SIGN_IN_METHOD="github.com";Qn.PROVIDER_ID="github.com";/**
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
 */class Jn extends zs{constructor(){super("twitter.com")}static credential(e,t){return Er._fromParams({providerId:Jn.PROVIDER_ID,signInMethod:Jn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Jn.credentialFromTaggedObject(e)}static credentialFromError(e){return Jn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:s}=e;if(!t||!s)return null;try{return Jn.credential(t,s)}catch{return null}}}Jn.TWITTER_SIGN_IN_METHOD="twitter.com";Jn.PROVIDER_ID="twitter.com";/**
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
 */class yi{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,s,o=!1){const l=await qt._fromIdTokenResponse(e,s,o),u=Im(s);return new yi({user:l,providerId:u,_tokenResponse:s,operationType:t})}static async _forOperation(e,t,s){await e._updateTokensIfNecessary(s,!0);const o=Im(s);return new yi({user:e,providerId:o,_tokenResponse:s,operationType:t})}}function Im(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
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
 */class Ca extends un{constructor(e,t,s,o){super(t.code,t.message),this.operationType=s,this.user=o,Object.setPrototypeOf(this,Ca.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,t,s,o){return new Ca(e,t,s,o)}}function xy(r,e,t,s){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(l=>{throw l.code==="auth/multi-factor-auth-required"?Ca._fromErrorAndOperation(r,l,e,s):l})}async function jE(r,e,t=!1){const s=await Ls(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return yi._forOperation(r,"link",s)}/**
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
 */async function FE(r,e,t=!1){const{auth:s}=r;if(Kt(s.app))return Promise.reject(er(s));const o="reauthenticate";try{const l=await Ls(r,xy(s,o,e,r),t);Y(l.idToken,s,"internal-error");const u=rd(l.idToken);Y(u,s,"internal-error");const{sub:h}=u;return Y(r.uid===h,s,"user-mismatch"),yi._forOperation(r,o,l)}catch(l){throw(l==null?void 0:l.code)==="auth/user-not-found"&&Xt(s,"user-mismatch"),l}}/**
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
 */async function Ey(r,e,t=!1){if(Kt(r.app))return Promise.reject(er(r));const s="signIn",o=await xy(r,s,e),l=await yi._fromIdTokenResponse(r,s,o);return t||await r._updateCurrentUser(l.user),l}async function UE(r,e){return Ey(ki(r),e)}/**
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
 */async function zE(r){const e=ki(r);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function $E(r,e,t){return Kt(r.app)?Promise.reject(er(r)):UE(Nt(r),Ci.credential(e,t)).catch(async s=>{throw s.code==="auth/password-does-not-meet-requirements"&&zE(r),s})}function BE(r,e,t,s){return Nt(r).onIdTokenChanged(e,t,s)}function VE(r,e,t){return Nt(r).beforeAuthStateChanged(e,t)}function HE(r){return Nt(r).signOut()}const Ia="__sak";/**
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
 */class ky{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ia,"1"),this.storage.removeItem(Ia),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const WE=1e3,KE=10;class Cy extends ky{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=gy(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const s=this.storage.getItem(t),o=this.localCache[t];s!==o&&e(t,o,s)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((u,h,p)=>{this.notifyListeners(u,p)});return}const s=e.key;t?this.detachListener():this.stopPolling();const o=()=>{const u=this.storage.getItem(s);!t&&this.localCache[s]===u||this.notifyListeners(s,u)},l=this.storage.getItem(s);dE()&&l!==e.newValue&&e.newValue!==e.oldValue?setTimeout(o,KE):o()}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const o of Array.from(s))o(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:s}),!0)})},WE)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Cy.type="LOCAL";const GE=Cy;/**
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
 */class Iy extends ky{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Iy.type="SESSION";const Ty=Iy;/**
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
 */function qE(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Ha{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(o=>o.isListeningto(e));if(t)return t;const s=new Ha(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:s,eventType:o,data:l}=t.data,u=this.handlersMap[o];if(!(u!=null&&u.size))return;t.ports[0].postMessage({status:"ack",eventId:s,eventType:o});const h=Array.from(u).map(async m=>m(t.origin,l)),p=await qE(h);t.ports[0].postMessage({status:"done",eventId:s,eventType:o,response:p})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ha.receivers=[];/**
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
 */function ad(r="",e=10){let t="";for(let s=0;s<e;s++)t+=Math.floor(Math.random()*10);return r+t}/**
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
 */class YE{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,s=50){const o=typeof MessageChannel<"u"?new MessageChannel:null;if(!o)throw new Error("connection_unavailable");let l,u;return new Promise((h,p)=>{const m=ad("",20);o.port1.start();const v=setTimeout(()=>{p(new Error("unsupported_event"))},s);u={messageChannel:o,onMessage(_){const x=_;if(x.data.eventId===m)switch(x.data.status){case"ack":clearTimeout(v),l=setTimeout(()=>{p(new Error("timeout"))},3e3);break;case"done":clearTimeout(l),h(x.data.response);break;default:clearTimeout(v),clearTimeout(l),p(new Error("invalid_response"));break}}},this.handlers.add(u),o.port1.addEventListener("message",u.onMessage),this.target.postMessage({eventType:e,eventId:m,data:t},[o.port2])}).finally(()=>{u&&this.removeMessageHandler(u)})}}/**
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
 */function ln(){return window}function QE(r){ln().location.href=r}/**
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
 */function Ny(){return typeof ln().WorkerGlobalScope<"u"&&typeof ln().importScripts=="function"}async function JE(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function XE(){var r;return((r=navigator==null?void 0:navigator.serviceWorker)==null?void 0:r.controller)||null}function ZE(){return Ny()?self:null}/**
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
 */const Ry="firebaseLocalStorageDb",ek=1,Ta="firebaseLocalStorage",Py="fbase_key";class $s{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Wa(r,e){return r.transaction([Ta],e?"readwrite":"readonly").objectStore(Ta)}function tk(){const r=indexedDB.deleteDatabase(Ry);return new $s(r).toPromise()}function Du(){const r=indexedDB.open(Ry,ek);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const s=r.result;try{s.createObjectStore(Ta,{keyPath:Py})}catch(o){t(o)}}),r.addEventListener("success",async()=>{const s=r.result;s.objectStoreNames.contains(Ta)?e(s):(s.close(),await tk(),e(await Du()))})})}async function Tm(r,e,t){const s=Wa(r,!0).put({[Py]:e,value:t});return new $s(s).toPromise()}async function nk(r,e){const t=Wa(r,!1).get(e),s=await new $s(t).toPromise();return s===void 0?null:s.value}function Nm(r,e){const t=Wa(r,!0).delete(e);return new $s(t).toPromise()}const rk=800,ik=3;class by{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Du(),this.db)}async _withRetries(e){let t=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(t++>ik)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Ny()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ha._getInstance(ZE()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,s;if(this.activeServiceWorker=await JE(),!this.activeServiceWorker)return;this.sender=new YE(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(s=e[0])!=null&&s.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||XE()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Du();return await Tm(e,Ia,"1"),await Nm(e,Ia),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(s=>Tm(s,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(s=>nk(s,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Nm(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(o=>{const l=Wa(o,!1).getAll();return new $s(l).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],s=new Set;if(e.length!==0)for(const{fbase_key:o,value:l}of e)s.add(o),JSON.stringify(this.localCache[o])!==JSON.stringify(l)&&(this.notifyListeners(o,l),t.push(o));for(const o of Object.keys(this.localCache))this.localCache[o]&&!s.has(o)&&(this.notifyListeners(o,null),t.push(o));return t}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const o of Array.from(s))o(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),rk)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}by.type="LOCAL";const sk=by;new Us(3e4,6e4);/**
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
 */function ok(r,e){return e?Sn(e):(Y(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
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
 */class ld extends sd{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return hi(e,this._buildIdpRequest())}_linkToIdToken(e,t){return hi(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return hi(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function ak(r){return Ey(r.auth,new ld(r),r.bypassAuthState)}function lk(r){const{auth:e,user:t}=r;return Y(t,e,"internal-error"),FE(t,new ld(r),r.bypassAuthState)}async function ck(r){const{auth:e,user:t}=r;return Y(t,e,"internal-error"),jE(t,new ld(r),r.bypassAuthState)}/**
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
 */class Ay{constructor(e,t,s,o,l=!1){this.auth=e,this.resolver=s,this.user=o,this.bypassAuthState=l,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:s,postBody:o,tenantId:l,error:u,type:h}=e;if(u){this.reject(u);return}const p={auth:this.auth,requestUri:t,sessionId:s,tenantId:l||void 0,postBody:o||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(h)(p))}catch(m){this.reject(m)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return ak;case"linkViaPopup":case"linkViaRedirect":return ck;case"reauthViaPopup":case"reauthViaRedirect":return lk;default:Xt(this.auth,"internal-error")}}resolve(e){Cn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Cn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const uk=new Us(2e3,1e4);class oi extends Ay{constructor(e,t,s,o,l){super(e,t,o,l),this.provider=s,this.authWindow=null,this.pollId=null,oi.currentPopupAction&&oi.currentPopupAction.cancel(),oi.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Y(e,this.auth,"internal-error"),e}async onExecution(){Cn(this.filter.length===1,"Popup operations only handle one event");const e=ad();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(an(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(an(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,oi.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,s;if((s=(t=this.authWindow)==null?void 0:t.window)!=null&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(an(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,uk.get())};e()}}oi.currentPopupAction=null;/**
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
 */const dk="pendingRedirect",ha=new Map;class hk extends Ay{constructor(e,t,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,s),this.eventId=null}async execute(){let e=ha.get(this.auth._key());if(!e){try{const s=await fk(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(t){e=()=>Promise.reject(t)}ha.set(this.auth._key(),e)}return this.bypassAuthState||ha.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function fk(r,e){const t=gk(e),s=mk(r);if(!await s._isAvailable())return!1;const o=await s._get(t)==="true";return await s._remove(t),o}function pk(r,e){ha.set(r._key(),e)}function mk(r){return Sn(r._redirectPersistence)}function gk(r){return da(dk,r.config.apiKey,r.name)}async function yk(r,e,t=!1){if(Kt(r.app))return Promise.reject(er(r));const s=ki(r),o=ok(s,e),u=await new hk(s,o,t).execute();return u&&!t&&(delete u.user._redirectEventId,await s._persistUserIfCurrent(u.user),await s._setRedirectUser(null,e)),u}/**
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
 */const _k=600*1e3;class vk{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(t=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!wk(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var s;if(e.error&&!Oy(e)){const o=((s=e.error.code)==null?void 0:s.split("auth/")[1])||"internal-error";t.onError(an(this.auth,o))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const s=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=_k&&this.cachedEventUids.clear(),this.cachedEventUids.has(Rm(e))}saveEventToCache(e){this.cachedEventUids.add(Rm(e)),this.lastProcessedEventTime=Date.now()}}function Rm(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function Oy({type:r,error:e}){return r==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function wk(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Oy(r);default:return!1}}/**
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
 */async function Sk(r,e={}){return ir(r,"GET","/v1/projects",e)}/**
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
 */const xk=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Ek=/^https?/;async function kk(r){if(r.config.emulator)return;const{authorizedDomains:e}=await Sk(r);for(const t of e)try{if(Ck(t))return}catch{}Xt(r,"unauthorized-domain")}function Ck(r){const e=Ou(),{protocol:t,hostname:s}=new URL(e);if(r.startsWith("chrome-extension://")){const u=new URL(r);return u.hostname===""&&s===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&u.hostname===s}if(!Ek.test(t))return!1;if(xk.test(r))return s===r;const o=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+o+"|"+o+")$","i").test(s)}/**
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
 */const Ik=new Us(3e4,6e4);function Pm(){const r=ln().___jsl;if(r!=null&&r.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function Tk(r){return new Promise((e,t)=>{var o,l,u;function s(){Pm(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Pm(),t(an(r,"network-request-failed"))},timeout:Ik.get()})}if((l=(o=ln().gapi)==null?void 0:o.iframes)!=null&&l.Iframe)e(gapi.iframes.getContext());else if((u=ln().gapi)!=null&&u.load)s();else{const h=wE("iframefcb");return ln()[h]=()=>{gapi.load?s():t(an(r,"network-request-failed"))},_y(`${vE()}?onload=${h}`).catch(p=>t(p))}}).catch(e=>{throw fa=null,e})}let fa=null;function Nk(r){return fa=fa||Tk(r),fa}/**
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
 */const Rk=new Us(5e3,15e3),Pk="__/auth/iframe",bk="emulator/auth/iframe",Ak={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Ok=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Lk(r){const e=r.config;Y(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?nd(e,bk):`https://${r.config.authDomain}/${Pk}`,s={apiKey:e.apiKey,appName:r.name,v:Ei},o=Ok.get(r.config.apiHost);o&&(s.eid=o);const l=r._getFrameworks();return l.length&&(s.fw=l.join(",")),`${t}?${xi(s).slice(1)}`}async function Dk(r){const e=await Nk(r),t=ln().gapi;return Y(t,r,"internal-error"),e.open({where:document.body,url:Lk(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Ak,dontclear:!0},s=>new Promise(async(o,l)=>{await s.restyle({setHideOnLeave:!1});const u=an(r,"network-request-failed"),h=ln().setTimeout(()=>{l(u)},Rk.get());function p(){ln().clearTimeout(h),o(s)}s.ping(p).then(p,()=>{l(u)})}))}/**
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
 */const Mk={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},jk=500,Fk=600,Uk="_blank",zk="http://localhost";class bm{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function $k(r,e,t,s=jk,o=Fk){const l=Math.max((window.screen.availHeight-o)/2,0).toString(),u=Math.max((window.screen.availWidth-s)/2,0).toString();let h="";const p={...Mk,width:s.toString(),height:o.toString(),top:l,left:u},m=ht().toLowerCase();t&&(h=dy(m)?Uk:t),cy(m)&&(e=e||zk,p.scrollbars="yes");const v=Object.entries(p).reduce((x,[R,T])=>`${x}${R}=${T},`,"");if(uE(m)&&h!=="_self")return Bk(e||"",h),new bm(null);const _=window.open(e||"",h,v);Y(_,r,"popup-blocked");try{_.focus()}catch{}return new bm(_)}function Bk(r,e){const t=document.createElement("a");t.href=r,t.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(s)}/**
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
 */const Vk="__/auth/handler",Hk="emulator/auth/handler",Wk=encodeURIComponent("fac");async function Am(r,e,t,s,o,l){Y(r.config.authDomain,r,"auth-domain-config-required"),Y(r.config.apiKey,r,"invalid-api-key");const u={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:s,v:Ei,eventId:o};if(e instanceof Sy){e.setDefaultLanguage(r.languageCode),u.providerId=e.providerId||"",Tu(e.getCustomParameters())||(u.customParameters=JSON.stringify(e.getCustomParameters()));for(const[v,_]of Object.entries({}))u[v]=_}if(e instanceof zs){const v=e.getScopes().filter(_=>_!=="");v.length>0&&(u.scopes=v.join(","))}r.tenantId&&(u.tid=r.tenantId);const h=u;for(const v of Object.keys(h))h[v]===void 0&&delete h[v];const p=await r._getAppCheckToken(),m=p?`#${Wk}=${encodeURIComponent(p)}`:"";return`${Kk(r)}?${xi(h).slice(1)}${m}`}function Kk({config:r}){return r.emulator?nd(r,Hk):`https://${r.authDomain}/${Vk}`}/**
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
 */const lu="webStorageSupport";class Gk{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ty,this._completeRedirectFn=yk,this._overrideRedirectResult=pk}async _openPopup(e,t,s,o){var u;Cn((u=this.eventManagers[e._key()])==null?void 0:u.manager,"_initialize() not called before _openPopup()");const l=await Am(e,t,s,Ou(),o);return $k(e,l,ad())}async _openRedirect(e,t,s,o){await this._originValidation(e);const l=await Am(e,t,s,Ou(),o);return QE(l),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:o,promise:l}=this.eventManagers[t];return o?Promise.resolve(o):(Cn(l,"If manager is not set, promise should be"),l)}const s=this.initAndGetManager(e);return this.eventManagers[t]={promise:s},s.catch(()=>{delete this.eventManagers[t]}),s}async initAndGetManager(e){const t=await Dk(e),s=new vk(e);return t.register("authEvent",o=>(Y(o==null?void 0:o.authEvent,e,"invalid-auth-event"),{status:s.onEvent(o.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=t,s}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(lu,{type:lu},o=>{var u;const l=(u=o==null?void 0:o[0])==null?void 0:u[lu];l!==void 0&&t(!!l),Xt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=kk(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return gy()||uy()||id()}}const qk=Gk;var Om="@firebase/auth",Lm="1.13.1";/**
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
 */class Yk{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){Y(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Qk(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Jk(r){cn(new Jt("auth",(e,{options:t})=>{const s=e.getProvider("app").getImmediate(),o=e.getProvider("heartbeat"),l=e.getProvider("app-check-internal"),{apiKey:u,authDomain:h}=s.options;Y(u&&!u.includes(":"),"invalid-api-key",{appName:s.name});const p={apiKey:u,authDomain:h,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:yy(r)},m=new gE(s,o,l,p);return IE(m,t),m},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,s)=>{e.getProvider("auth-internal").initialize()})),cn(new Jt("auth-internal",e=>{const t=ki(e.getProvider("auth").getImmediate());return(s=>new Yk(s))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),jt(Om,Lm,Qk(r)),jt(Om,Lm,"esm2020")}/**
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
 */const Xk=300,Zk=Bg("authIdTokenMaxAge")||Xk;let Dm=null;const eC=r=>async e=>{const t=e&&await e.getIdTokenResult(),s=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(s&&s>Zk)return;const o=t==null?void 0:t.token;Dm!==o&&(Dm=o,await fetch(r,{method:o?"POST":"DELETE",headers:o?{Authorization:`Bearer ${o}`}:{}}))};function tC(r=ed()){const e=Pr(r,"auth");if(e.isInitialized())return e.getImmediate();const t=CE(r,{popupRedirectResolver:qk,persistence:[sk,GE,Ty]}),s=Bg("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const l=new URL(s,location.origin);if(location.origin===l.origin){const u=eC(l.toString());VE(t,u,()=>u(t.currentUser)),BE(t,h=>u(h))}}const o=zg("auth");return o&&TE(t,`http://${o}`),t}function nC(){var r;return((r=document.getElementsByTagName("head"))==null?void 0:r[0])??document}yE({loadJS(r){return new Promise((e,t)=>{const s=document.createElement("script");s.setAttribute("src",r),s.onload=e,s.onerror=o=>{const l=an("internal-error");l.customData=o,t(l)},s.type="text/javascript",s.charset="UTF-8",nC().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Jk("Browser");var rC="firebase",iC="12.13.0";/**
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
 */jt(rC,iC,"app");const Ly="@firebase/installations",cd="0.6.22";/**
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
 */const Dy=1e4,My=`w:${cd}`,jy="FIS_v2",sC="https://firebaseinstallations.googleapis.com/v1",oC=3600*1e3,aC="installations",lC="Installations";/**
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
 */const cC={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},kr=new Rr(aC,lC,cC);function Fy(r){return r instanceof un&&r.code.includes("request-failed")}/**
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
 */function Uy({projectId:r}){return`${sC}/projects/${r}/installations`}function zy(r){return{token:r.token,requestStatus:2,expiresIn:dC(r.expiresIn),creationTime:Date.now()}}async function $y(r,e){const s=(await e.json()).error;return kr.create("request-failed",{requestName:r,serverCode:s.code,serverMessage:s.message,serverStatus:s.status})}function By({apiKey:r}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":r})}function uC(r,{refreshToken:e}){const t=By(r);return t.append("Authorization",hC(e)),t}async function Vy(r){const e=await r();return e.status>=500&&e.status<600?r():e}function dC(r){return Number(r.replace("s","000"))}function hC(r){return`${jy} ${r}`}/**
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
 */async function fC({appConfig:r,heartbeatServiceProvider:e},{fid:t}){const s=Uy(r),o=By(r),l=e.getImmediate({optional:!0});if(l){const m=await l.getHeartbeatsHeader();m&&o.append("x-firebase-client",m)}const u={fid:t,authVersion:jy,appId:r.appId,sdkVersion:My},h={method:"POST",headers:o,body:JSON.stringify(u)},p=await Vy(()=>fetch(s,h));if(p.ok){const m=await p.json();return{fid:m.fid||t,registrationStatus:2,refreshToken:m.refreshToken,authToken:zy(m.authToken)}}else throw await $y("Create Installation",p)}/**
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
 */function Hy(r){return new Promise(e=>{setTimeout(e,r)})}/**
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
 */function pC(r){return btoa(String.fromCharCode(...r)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const mC=/^[cdef][\w-]{21}$/,Mu="";function gC(){try{const r=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(r),r[0]=112+r[0]%16;const t=yC(r);return mC.test(t)?t:Mu}catch{return Mu}}function yC(r){return pC(r).substr(0,22)}/**
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
 */function Ka(r){return`${r.appName}!${r.appId}`}/**
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
 */const Wy=new Map;function Ky(r,e){const t=Ka(r);Gy(t,e),_C(t,e)}function Gy(r,e){const t=Wy.get(r);if(t)for(const s of t)s(e)}function _C(r,e){const t=vC();t&&t.postMessage({key:r,fid:e}),wC()}let wr=null;function vC(){return!wr&&"BroadcastChannel"in self&&(wr=new BroadcastChannel("[Firebase] FID Change"),wr.onmessage=r=>{Gy(r.data.key,r.data.fid)}),wr}function wC(){Wy.size===0&&wr&&(wr.close(),wr=null)}/**
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
 */const SC="firebase-installations-database",xC=1,Cr="firebase-installations-store";let cu=null;function ud(){return cu||(cu=Jg(SC,xC,{upgrade:(r,e)=>{switch(e){case 0:r.createObjectStore(Cr)}}})),cu}async function Na(r,e){const t=Ka(r),o=(await ud()).transaction(Cr,"readwrite"),l=o.objectStore(Cr),u=await l.get(t);return await l.put(e,t),await o.done,(!u||u.fid!==e.fid)&&Ky(r,e.fid),e}async function qy(r){const e=Ka(r),s=(await ud()).transaction(Cr,"readwrite");await s.objectStore(Cr).delete(e),await s.done}async function Ga(r,e){const t=Ka(r),o=(await ud()).transaction(Cr,"readwrite"),l=o.objectStore(Cr),u=await l.get(t),h=e(u);return h===void 0?await l.delete(t):await l.put(h,t),await o.done,h&&(!u||u.fid!==h.fid)&&Ky(r,h.fid),h}/**
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
 */async function dd(r){let e;const t=await Ga(r.appConfig,s=>{const o=EC(s),l=kC(r,o);return e=l.registrationPromise,l.installationEntry});return t.fid===Mu?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function EC(r){const e=r||{fid:gC(),registrationStatus:0};return Yy(e)}function kC(r,e){if(e.registrationStatus===0){if(!navigator.onLine){const o=Promise.reject(kr.create("app-offline"));return{installationEntry:e,registrationPromise:o}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},s=CC(r,t);return{installationEntry:t,registrationPromise:s}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:IC(r)}:{installationEntry:e}}async function CC(r,e){try{const t=await fC(r,e);return Na(r.appConfig,t)}catch(t){throw Fy(t)&&t.customData.serverCode===409?await qy(r.appConfig):await Na(r.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function IC(r){let e=await Mm(r.appConfig);for(;e.registrationStatus===1;)await Hy(100),e=await Mm(r.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:s}=await dd(r);return s||t}return e}function Mm(r){return Ga(r,e=>{if(!e)throw kr.create("installation-not-found");return Yy(e)})}function Yy(r){return TC(r)?{fid:r.fid,registrationStatus:0}:r}function TC(r){return r.registrationStatus===1&&r.registrationTime+Dy<Date.now()}/**
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
 */async function NC({appConfig:r,heartbeatServiceProvider:e},t){const s=RC(r,t),o=uC(r,t),l=e.getImmediate({optional:!0});if(l){const m=await l.getHeartbeatsHeader();m&&o.append("x-firebase-client",m)}const u={installation:{sdkVersion:My,appId:r.appId}},h={method:"POST",headers:o,body:JSON.stringify(u)},p=await Vy(()=>fetch(s,h));if(p.ok){const m=await p.json();return zy(m)}else throw await $y("Generate Auth Token",p)}function RC(r,{fid:e}){return`${Uy(r)}/${e}/authTokens:generate`}/**
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
 */async function hd(r,e=!1){let t;const s=await Ga(r.appConfig,l=>{if(!Qy(l))throw kr.create("not-registered");const u=l.authToken;if(!e&&AC(u))return l;if(u.requestStatus===1)return t=PC(r,e),l;{if(!navigator.onLine)throw kr.create("app-offline");const h=LC(l);return t=bC(r,h),h}});return t?await t:s.authToken}async function PC(r,e){let t=await jm(r.appConfig);for(;t.authToken.requestStatus===1;)await Hy(100),t=await jm(r.appConfig);const s=t.authToken;return s.requestStatus===0?hd(r,e):s}function jm(r){return Ga(r,e=>{if(!Qy(e))throw kr.create("not-registered");const t=e.authToken;return DC(t)?{...e,authToken:{requestStatus:0}}:e})}async function bC(r,e){try{const t=await NC(r,e),s={...e,authToken:t};return await Na(r.appConfig,s),t}catch(t){if(Fy(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await qy(r.appConfig);else{const s={...e,authToken:{requestStatus:0}};await Na(r.appConfig,s)}throw t}}function Qy(r){return r!==void 0&&r.registrationStatus===2}function AC(r){return r.requestStatus===2&&!OC(r)}function OC(r){const e=Date.now();return e<r.creationTime||r.creationTime+r.expiresIn<e+oC}function LC(r){const e={requestStatus:1,requestTime:Date.now()};return{...r,authToken:e}}function DC(r){return r.requestStatus===1&&r.requestTime+Dy<Date.now()}/**
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
 */async function MC(r){const e=r,{installationEntry:t,registrationPromise:s}=await dd(e);return s?s.catch(console.error):hd(e).catch(console.error),t.fid}/**
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
 */async function jC(r,e=!1){const t=r;return await FC(t),(await hd(t,e)).token}async function FC(r){const{registrationPromise:e}=await dd(r);e&&await e}/**
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
 */function UC(r){if(!r||!r.options)throw uu("App Configuration");if(!r.name)throw uu("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!r.options[t])throw uu(t);return{appName:r.name,projectId:r.options.projectId,apiKey:r.options.apiKey,appId:r.options.appId}}function uu(r){return kr.create("missing-app-config-values",{valueName:r})}/**
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
 */const Jy="installations",zC="installations-internal",$C=r=>{const e=r.getProvider("app").getImmediate(),t=UC(e),s=Pr(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:s,_delete:()=>Promise.resolve()}},BC=r=>{const e=r.getProvider("app").getImmediate(),t=Pr(e,Jy).getImmediate();return{getId:()=>MC(t),getToken:o=>jC(t,o)}};function VC(){cn(new Jt(Jy,$C,"PUBLIC")),cn(new Jt(zC,BC,"PRIVATE"))}VC();jt(Ly,cd);jt(Ly,cd,"esm2020");/**
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
 */const Ra="analytics",HC="firebase_id",WC="origin",KC=60*1e3,GC="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",fd="https://www.googletagmanager.com/gtag/js";/**
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
 */const dt=new $a("@firebase/analytics");/**
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
 */const qC={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},It=new Rr("analytics","Analytics",qC);/**
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
 */function YC(r){if(!r.startsWith(fd)){const e=It.create("invalid-gtag-resource",{gtagURL:r});return dt.warn(e.message),""}return r}function Xy(r){return Promise.all(r.map(e=>e.catch(t=>t)))}function QC(r,e){let t;return window.trustedTypes&&(t=window.trustedTypes.createPolicy(r,e)),t}function JC(r,e){const t=QC("firebase-js-sdk-policy",{createScriptURL:YC}),s=document.createElement("script"),o=`${fd}?l=${r}&id=${e}`;s.src=t?t==null?void 0:t.createScriptURL(o):o,s.async=!0,document.head.appendChild(s)}function XC(r){let e=[];return Array.isArray(window[r])?e=window[r]:window[r]=e,e}async function ZC(r,e,t,s,o,l){const u=s[o];try{if(u)await e[u];else{const p=(await Xy(t)).find(m=>m.measurementId===o);p&&await e[p.appId]}}catch(h){dt.error(h)}r("config",o,l)}async function eI(r,e,t,s,o){try{let l=[];if(o&&o.send_to){let u=o.send_to;Array.isArray(u)||(u=[u]);const h=await Xy(t);for(const p of u){const m=h.find(_=>_.measurementId===p),v=m&&e[m.appId];if(v)l.push(v);else{l=[];break}}}l.length===0&&(l=Object.values(e)),await Promise.all(l),r("event",s,o||{})}catch(l){dt.error(l)}}function tI(r,e,t,s){async function o(l,...u){try{if(l==="event"){const[h,p]=u;await eI(r,e,t,h,p)}else if(l==="config"){const[h,p]=u;await ZC(r,e,t,s,h,p)}else if(l==="consent"){const[h,p]=u;r("consent",h,p)}else if(l==="get"){const[h,p,m]=u;r("get",h,p,m)}else if(l==="set"){const[h]=u;r("set",h)}else r(l,...u)}catch(h){dt.error(h)}}return o}function nI(r,e,t,s,o){let l=function(...u){window[s].push(arguments)};return window[o]&&typeof window[o]=="function"&&(l=window[o]),window[o]=tI(l,r,e,t),{gtagCore:l,wrappedGtag:window[o]}}function rI(r){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(fd)&&t.src.includes(r))return t;return null}/**
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
 */const iI=30,sI=1e3;class oI{constructor(e={},t=sI){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Zy=new oI;function aI(r){return new Headers({Accept:"application/json","x-goog-api-key":r})}async function lI(r){var u;const{appId:e,apiKey:t}=r,s={method:"GET",headers:aI(t)},o=GC.replace("{app-id}",e),l=await fetch(o,s);if(l.status!==200&&l.status!==304){let h="";try{const p=await l.json();(u=p.error)!=null&&u.message&&(h=p.error.message)}catch{}throw It.create("config-fetch-failed",{httpStatus:l.status,responseMessage:h})}return l.json()}async function cI(r,e=Zy,t){const{appId:s,apiKey:o,measurementId:l}=r.options;if(!s)throw It.create("no-app-id");if(!o){if(l)return{measurementId:l,appId:s};throw It.create("no-api-key")}const u=e.getThrottleMetadata(s)||{backoffCount:0,throttleEndTimeMillis:Date.now()},h=new hI;return setTimeout(async()=>{h.abort()},KC),e_({appId:s,apiKey:o,measurementId:l},u,h,e)}async function e_(r,{throttleEndTimeMillis:e,backoffCount:t},s,o=Zy){var h;const{appId:l,measurementId:u}=r;try{await uI(s,e)}catch(p){if(u)return dt.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${u} provided in the "measurementId" field in the local Firebase config. [${p==null?void 0:p.message}]`),{appId:l,measurementId:u};throw p}try{const p=await lI(r);return o.deleteThrottleMetadata(l),p}catch(p){const m=p;if(!dI(m)){if(o.deleteThrottleMetadata(l),u)return dt.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${u} provided in the "measurementId" field in the local Firebase config. [${m==null?void 0:m.message}]`),{appId:l,measurementId:u};throw p}const v=Number((h=m==null?void 0:m.customData)==null?void 0:h.httpStatus)===503?am(t,o.intervalMillis,iI):am(t,o.intervalMillis),_={throttleEndTimeMillis:Date.now()+v,backoffCount:t+1};return o.setThrottleMetadata(l,_),dt.debug(`Calling attemptFetch again in ${v} millis`),e_(r,_,s,o)}}function uI(r,e){return new Promise((t,s)=>{const o=Math.max(e-Date.now(),0),l=setTimeout(t,o);r.addEventListener(()=>{clearTimeout(l),s(It.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function dI(r){if(!(r instanceof un)||!r.customData)return!1;const e=Number(r.customData.httpStatus);return e===429||e===500||e===503||e===504}class hI{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function fI(r,e,t,s,o){if(o&&o.global){r("event",t,s);return}else{const l=await e,u={...s,send_to:l};r("event",t,u)}}async function pI(r,e,t,s){if(s&&s.global){const o={};for(const l of Object.keys(t))o[`user_properties.${l}`]=t[l];return r("set",o),Promise.resolve()}else{const o=await e;r("config",o,{update:!0,user_properties:t})}}/**
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
 */async function mI(){if(Wg())try{await Kg()}catch(r){return dt.warn(It.create("indexeddb-unavailable",{errorInfo:r==null?void 0:r.toString()}).message),!1}else return dt.warn(It.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function gI(r,e,t,s,o,l,u){const h=cI(r);h.then(x=>{t[x.measurementId]=x.appId,r.options.measurementId&&x.measurementId!==r.options.measurementId&&dt.warn(`The measurement ID in the local Firebase config (${r.options.measurementId}) does not match the measurement ID fetched from the server (${x.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(x=>dt.error(x)),e.push(h);const p=mI().then(x=>{if(x)return s.getId()}),[m,v]=await Promise.all([h,p]);rI(l)||JC(l,m.measurementId),o("js",new Date);const _=(u==null?void 0:u.config)??{};return _[WC]="firebase",_.update=!0,v!=null&&(_[HC]=v),o("config",m.measurementId,_),m.measurementId}/**
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
 */class yI{constructor(e){this.app=e}_delete(){return delete fi[this.app.options.appId],Promise.resolve()}}let fi={},Fm=[];const Um={};let du="dataLayer",_I="gtag",zm,pd,$m=!1;function vI(){const r=[];if(Vg()&&r.push("This is a browser extension environment."),S1()||r.push("Cookies are not available."),r.length>0){const e=r.map((s,o)=>`(${o+1}) ${s}`).join(" "),t=It.create("invalid-analytics-context",{errorInfo:e});dt.warn(t.message)}}function wI(r,e,t){vI();const s=r.options.appId;if(!s)throw It.create("no-app-id");if(!r.options.apiKey)if(r.options.measurementId)dt.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${r.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw It.create("no-api-key");if(fi[s]!=null)throw It.create("already-exists",{id:s});if(!$m){XC(du);const{wrappedGtag:l,gtagCore:u}=nI(fi,Fm,Um,du,_I);pd=l,zm=u,$m=!0}return fi[s]=gI(r,Fm,Um,e,zm,du,t),new yI(r)}function SI(r=ed()){r=Nt(r);const e=Pr(r,Ra);return e.isInitialized()?e.getImmediate():xI(r)}function xI(r,e={}){const t=Pr(r,Ra);if(t.isInitialized()){const o=t.getImmediate();if(nr(e,t.getOptions()))return o;throw It.create("already-initialized")}return t.initialize({options:e})}function EI(r,e,t){r=Nt(r),pI(pd,fi[r.app.options.appId],e,t).catch(s=>dt.error(s))}function kI(r,e,t,s){r=Nt(r),fI(pd,fi[r.app.options.appId],e,t,s).catch(o=>dt.error(o))}const Bm="@firebase/analytics",Vm="0.10.22";function CI(){cn(new Jt(Ra,(e,{options:t})=>{const s=e.getProvider("app").getImmediate(),o=e.getProvider("installations-internal").getImmediate();return wI(s,o,t)},"PUBLIC")),cn(new Jt("analytics-internal",r,"PRIVATE")),jt(Bm,Vm),jt(Bm,Vm,"esm2020");function r(e){try{const t=e.getProvider(Ra).getImmediate();return{logEvent:(s,o,l)=>kI(t,s,o,l),setUserProperties:(s,o)=>EI(t,s,o)}}catch(t){throw It.create("interop-component-reg-failed",{reason:t})}}}CI();var Hm={};const Wm="@firebase/database",Km="1.1.3";/**
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
 */let t_="";function II(r){t_=r}/**
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
 */class TI{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),tt(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:As(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class NI{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return Tn(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const n_=function(r){try{if(typeof window<"u"&&typeof window[r]<"u"){const e=window[r];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new TI(e)}}catch{}return new NI},Sr=n_("localStorage"),RI=n_("sessionStorage");/**
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
 */const pi=new $a("@firebase/database"),PI=(function(){let r=1;return function(){return r++}})(),r_=function(r){const e=A1(r),t=new T1;t.update(e);const s=t.digest();return Yu.encodeByteArray(s)},Bs=function(...r){let e="";for(let t=0;t<r.length;t++){const s=r[t];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=Bs.apply(null,s):typeof s=="object"?e+=tt(s):e+=s,e+=" "}return e};let Is=null,Gm=!0;const bI=function(r,e){j(!0,"Can't turn on custom loggers persistently."),pi.logLevel=xe.VERBOSE,Is=pi.log.bind(pi)},ot=function(...r){if(Gm===!0&&(Gm=!1,Is===null&&RI.get("logging_enabled")===!0&&bI()),Is){const e=Bs.apply(null,r);Is(e)}},Vs=function(r){return function(...e){ot(r,...e)}},ju=function(...r){const e="FIREBASE INTERNAL ERROR: "+Bs(...r);pi.error(e)},In=function(...r){const e=`FIREBASE FATAL ERROR: ${Bs(...r)}`;throw pi.error(e),new Error(e)},Tt=function(...r){const e="FIREBASE WARNING: "+Bs(...r);pi.warn(e)},AI=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Tt("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},i_=function(r){return typeof r=="number"&&(r!==r||r===Number.POSITIVE_INFINITY||r===Number.NEGATIVE_INFINITY)},OI=function(r){if(document.readyState==="complete")r();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,r())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},_i="[MIN_NAME]",Ir="[MAX_NAME]",Ii=function(r,e){if(r===e)return 0;if(r===_i||e===Ir)return-1;if(e===_i||r===Ir)return 1;{const t=qm(r),s=qm(e);return t!==null?s!==null?t-s===0?r.length-e.length:t-s:-1:s!==null?1:r<e?-1:1}},LI=function(r,e){return r===e?0:r<e?-1:1},gs=function(r,e){if(e&&r in e)return e[r];throw new Error("Missing required key ("+r+") in object: "+tt(e))},md=function(r){if(typeof r!="object"||r===null)return tt(r);const e=[];for(const s in r)e.push(s);e.sort();let t="{";for(let s=0;s<e.length;s++)s!==0&&(t+=","),t+=tt(e[s]),t+=":",t+=md(r[e[s]]);return t+="}",t},s_=function(r,e){const t=r.length;if(t<=e)return[r];const s=[];for(let o=0;o<t;o+=e)o+e>t?s.push(r.substring(o,t)):s.push(r.substring(o,o+e));return s};function Ft(r,e){for(const t in r)r.hasOwnProperty(t)&&e(t,r[t])}const o_=function(r){j(!i_(r),"Invalid JSON number");const e=11,t=52,s=(1<<e-1)-1;let o,l,u,h,p;r===0?(l=0,u=0,o=1/r===-1/0?1:0):(o=r<0,r=Math.abs(r),r>=Math.pow(2,1-s)?(h=Math.min(Math.floor(Math.log(r)/Math.LN2),s),l=h+s,u=Math.round(r*Math.pow(2,t-h)-Math.pow(2,t))):(l=0,u=Math.round(r/Math.pow(2,1-s-t))));const m=[];for(p=t;p;p-=1)m.push(u%2?1:0),u=Math.floor(u/2);for(p=e;p;p-=1)m.push(l%2?1:0),l=Math.floor(l/2);m.push(o?1:0),m.reverse();const v=m.join("");let _="";for(p=0;p<64;p+=8){let x=parseInt(v.substr(p,8),2).toString(16);x.length===1&&(x="0"+x),_=_+x}return _.toLowerCase()},DI=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},MI=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"},jI=new RegExp("^-?(0*)\\d{1,10}$"),FI=-2147483648,UI=2147483647,qm=function(r){if(jI.test(r)){const e=Number(r);if(e>=FI&&e<=UI)return e}return null},Hs=function(r){try{r()}catch(e){setTimeout(()=>{const t=e.stack||"";throw Tt("Exception was thrown by user callback.",t),e},Math.floor(0))}},zI=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Ts=function(r,e){const t=setTimeout(r,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class $I{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,Kt(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)==null||t.get().then(s=>s.addTokenListener(e))}notifyForInvalidToken(){Tt(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class BI{constructor(e,t,s){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(o=>this.auth_=o)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(ot("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Tt(e)}}class pa{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}pa.OWNER="owner";/**
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
 */const gd="5",a_="v",l_="s",c_="r",u_="f",d_=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,h_="ls",f_="p",Fu="ac",p_="websocket",m_="long_polling";/**
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
 */class g_{constructor(e,t,s,o,l=!1,u="",h=!1,p=!1,m=null){this.secure=t,this.namespace=s,this.webSocketOnly=o,this.nodeAdmin=l,this.persistenceKey=u,this.includeNamespaceInQueryParams=h,this.isUsingEmulator=p,this.emulatorOptions=m,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Sr.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Sr.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function VI(r){return r.host!==r.internalHost||r.isCustomHost()||r.includeNamespaceInQueryParams}function y_(r,e,t){j(typeof e=="string","typeof type must == string"),j(typeof t=="object","typeof params must == object");let s;if(e===p_)s=(r.secure?"wss://":"ws://")+r.internalHost+"/.ws?";else if(e===m_)s=(r.secure?"https://":"http://")+r.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);VI(r)&&(t.ns=r.namespace);const o=[];return Ft(t,(l,u)=>{o.push(l+"="+u)}),s+o.join("&")}/**
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
 */class HI{constructor(){this.counters_={}}incrementCounter(e,t=1){Tn(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return u1(this.counters_)}}/**
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
 */const hu={},fu={};function yd(r){const e=r.toString();return hu[e]||(hu[e]=new HI),hu[e]}function WI(r,e){const t=r.toString();return fu[t]||(fu[t]=e()),fu[t]}/**
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
 */class KI{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let o=0;o<s.length;++o)s[o]&&Hs(()=>{this.onMessage_(s[o])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const Ym="start",GI="close",qI="pLPCommand",YI="pRTLPCB",__="id",v_="pw",w_="ser",QI="cb",JI="seg",XI="ts",ZI="d",eT="dframe",S_=1870,x_=30,tT=S_-x_,nT=25e3,rT=3e4;class ai{constructor(e,t,s,o,l,u,h){this.connId=e,this.repoInfo=t,this.applicationId=s,this.appCheckToken=o,this.authToken=l,this.transportSessionId=u,this.lastSessionId=h,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Vs(e),this.stats_=yd(t),this.urlFn=p=>(this.appCheckToken&&(p[Fu]=this.appCheckToken),y_(t,m_,p))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new KI(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(rT)),OI(()=>{if(this.isClosed_)return;this.scriptTagHolder=new _d((...l)=>{const[u,h,p,m,v]=l;if(this.incrementIncomingBytes_(l),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,u===Ym)this.id=h,this.password=p;else if(u===GI)h?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(h,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+u)},(...l)=>{const[u,h]=l;this.incrementIncomingBytes_(l),this.myPacketOrderer.handleResponse(u,h)},()=>{this.onClosed_()},this.urlFn);const s={};s[Ym]="t",s[w_]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[QI]=this.scriptTagHolder.uniqueCallbackIdentifier),s[a_]=gd,this.transportSessionId&&(s[l_]=this.transportSessionId),this.lastSessionId&&(s[h_]=this.lastSessionId),this.applicationId&&(s[f_]=this.applicationId),this.appCheckToken&&(s[Fu]=this.appCheckToken),typeof location<"u"&&location.hostname&&d_.test(location.hostname)&&(s[c_]=u_);const o=this.urlFn(s);this.log_("Connecting via long-poll to "+o),this.scriptTagHolder.addTag(o,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){ai.forceAllow_=!0}static forceDisallow(){ai.forceDisallow_=!0}static isAvailable(){return ai.forceAllow_?!0:!ai.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!DI()&&!MI()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=tt(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=Fg(t),o=s_(s,tT);for(let l=0;l<o.length;l++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,o.length,o[l]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const s={};s[eT]="t",s[__]=e,s[v_]=t,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=tt(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class _d{constructor(e,t,s,o){this.onDisconnect=s,this.urlFn=o,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=PI(),window[qI+this.uniqueCallbackIdentifier]=e,window[YI+this.uniqueCallbackIdentifier]=t,this.myIFrame=_d.createIFrame_();let l="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(l='<script>document.domain="'+document.domain+'";<\/script>');const u="<html><body>"+l+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(u),this.myIFrame.doc.close()}catch(h){ot("frame writing exception"),h.stack&&ot(h.stack),ot(h)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||ot("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[__]=this.myID,e[v_]=this.myPW,e[w_]=this.currentSerial;let t=this.urlFn(e),s="",o=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+x_+s.length<=S_;){const u=this.pendingSegs.shift();s=s+"&"+JI+o+"="+u.seg+"&"+XI+o+"="+u.ts+"&"+ZI+o+"="+u.d,o++}return t=t+s,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,s){this.pendingSegs.push({seg:e,ts:t,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const s=()=>{this.outstandingRequests.delete(t),this.newRequest_()},o=setTimeout(s,Math.floor(nT)),l=()=>{clearTimeout(o),s()};this.addTag(e,l)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const o=s.readyState;(!o||o==="loaded"||o==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),t())},s.onerror=()=>{ot("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
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
 */const iT=16384,sT=45e3;let Pa=null;typeof MozWebSocket<"u"?Pa=MozWebSocket:typeof WebSocket<"u"&&(Pa=WebSocket);class Gt{constructor(e,t,s,o,l,u,h){this.connId=e,this.applicationId=s,this.appCheckToken=o,this.authToken=l,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Vs(this.connId),this.stats_=yd(t),this.connURL=Gt.connectionURL_(t,u,h,o,s),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,s,o,l){const u={};return u[a_]=gd,typeof location<"u"&&location.hostname&&d_.test(location.hostname)&&(u[c_]=u_),t&&(u[l_]=t),s&&(u[h_]=s),o&&(u[Fu]=o),l&&(u[f_]=l),y_(e,p_,u)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Sr.set("previous_websocket_failure",!0);try{let s;w1(),this.mySock=new Pa(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const o=s.message||s.data;o&&this.log_(o),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const o=s.message||s.data;o&&this.log_(o),this.onClosed_()}}start(){}static forceDisallow(){Gt.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(t);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&Pa!==null&&!Gt.forceDisallow_}static previouslyFailed(){return Sr.isInMemoryStorage||Sr.get("previous_websocket_failure")===!0}markConnectionHealthy(){Sr.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const s=As(t);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(j(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const s=this.extractFrameCount_(t);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const t=tt(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=s_(t,iT);s.length>1&&this.sendString_(String(s.length));for(let o=0;o<s.length;o++)this.sendString_(s[o])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(sT))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Gt.responsesRequiredToBeHealthy=2;Gt.healthyTimeout=3e4;/**
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
 */class Ms{static get ALL_TRANSPORTS(){return[ai,Gt]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=Gt&&Gt.isAvailable();let s=t&&!Gt.previouslyFailed();if(e.webSocketOnly&&(t||Tt("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[Gt];else{const o=this.transports_=[];for(const l of Ms.ALL_TRANSPORTS)l&&l.isAvailable()&&o.push(l);Ms.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Ms.globalTransportInitialized_=!1;/**
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
 */const oT=6e4,aT=5e3,lT=10*1024,cT=100*1024,pu="t",Qm="d",uT="s",Jm="r",dT="e",Xm="o",Zm="a",eg="n",tg="p",hT="h";class fT{constructor(e,t,s,o,l,u,h,p,m,v){this.id=e,this.repoInfo_=t,this.applicationId_=s,this.appCheckToken_=o,this.authToken_=l,this.onMessage_=u,this.onReady_=h,this.onDisconnect_=p,this.onKill_=m,this.lastSessionId=v,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Vs("c:"+this.id+":"),this.transportManager_=new Ms(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,s)},Math.floor(0));const o=e.healthyTimeout||0;o>0&&(this.healthyTimeout_=Ts(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>cT?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>lT?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(o)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(pu in e){const t=e[pu];t===Zm?this.upgradeIfSecondaryHealthy_():t===Jm?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Xm&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=gs("t",e),s=gs("d",e);if(t==="c")this.onSecondaryControl_(s);else if(t==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:tg,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Zm,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:eg,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=gs("t",e),s=gs("d",e);t==="c"?this.onControl_(s):t==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=gs(pu,e);if(Qm in e){const s=e[Qm];if(t===hT){const o={...s};this.repoInfo_.isUsingEmulator&&(o.h=this.repoInfo_.host),this.onHandshake_(o)}else if(t===eg){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let o=0;o<this.pendingDataMessages.length;++o)this.onDataMessage_(this.pendingDataMessages[o]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===uT?this.onConnectionShutdown_(s):t===Jm?this.onReset_(s):t===dT?ju("Server Error: "+s):t===Xm?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):ju("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,s=e.v,o=e.h;this.sessionId=e.s,this.repoInfo_.host=o,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),gd!==s&&Tt("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,s),Ts(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(oT))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Ts(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(aT))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:tg,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Sr.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class E_{put(e,t,s,o){}merge(e,t,s,o){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,s){}onDisconnectMerge(e,t,s){}onDisconnectCancel(e,t){}reportStats(e){}}/**
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
 */class k_{constructor(e){this.allowedEvents_=e,this.listeners_={},j(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let o=0;o<s.length;o++)s[o].callback.apply(s[o].context,t)}}on(e,t,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:s});const o=this.getInitialEvent(e);o&&t.apply(s,o)}off(e,t,s){this.validateEventType_(e);const o=this.listeners_[e]||[];for(let l=0;l<o.length;l++)if(o[l].callback===t&&(!s||s===o[l].context)){o.splice(l,1);return}}validateEventType_(e){j(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
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
 */class ba extends k_{static getInstance(){return new ba}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Xu()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return j(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const ng=32,rg=768;class Le{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let s=0;for(let o=0;o<this.pieces_.length;o++)this.pieces_[o].length>0&&(this.pieces_[s]=this.pieces_[o],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function Ee(){return new Le("")}function ue(r){return r.pieceNum_>=r.pieces_.length?null:r.pieces_[r.pieceNum_]}function rr(r){return r.pieces_.length-r.pieceNum_}function Oe(r){let e=r.pieceNum_;return e<r.pieces_.length&&e++,new Le(r.pieces_,e)}function C_(r){return r.pieceNum_<r.pieces_.length?r.pieces_[r.pieces_.length-1]:null}function pT(r){let e="";for(let t=r.pieceNum_;t<r.pieces_.length;t++)r.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(r.pieces_[t])));return e||"/"}function I_(r,e=0){return r.pieces_.slice(r.pieceNum_+e)}function T_(r){if(r.pieceNum_>=r.pieces_.length)return null;const e=[];for(let t=r.pieceNum_;t<r.pieces_.length-1;t++)e.push(r.pieces_[t]);return new Le(e,0)}function Xe(r,e){const t=[];for(let s=r.pieceNum_;s<r.pieces_.length;s++)t.push(r.pieces_[s]);if(e instanceof Le)for(let s=e.pieceNum_;s<e.pieces_.length;s++)t.push(e.pieces_[s]);else{const s=e.split("/");for(let o=0;o<s.length;o++)s[o].length>0&&t.push(s[o])}return new Le(t,0)}function le(r){return r.pieceNum_>=r.pieces_.length}function Mt(r,e){const t=ue(r),s=ue(e);if(t===null)return e;if(t===s)return Mt(Oe(r),Oe(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+r+")")}function N_(r,e){if(rr(r)!==rr(e))return!1;for(let t=r.pieceNum_,s=e.pieceNum_;t<=r.pieces_.length;t++,s++)if(r.pieces_[t]!==e.pieces_[s])return!1;return!0}function Yt(r,e){let t=r.pieceNum_,s=e.pieceNum_;if(rr(r)>rr(e))return!1;for(;t<r.pieces_.length;){if(r.pieces_[t]!==e.pieces_[s])return!1;++t,++s}return!0}class mT{constructor(e,t){this.errorPrefix_=t,this.parts_=I_(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=za(this.parts_[s]);R_(this)}}function gT(r,e){r.parts_.length>0&&(r.byteLength_+=1),r.parts_.push(e),r.byteLength_+=za(e),R_(r)}function yT(r){const e=r.parts_.pop();r.byteLength_-=za(e),r.parts_.length>0&&(r.byteLength_-=1)}function R_(r){if(r.byteLength_>rg)throw new Error(r.errorPrefix_+"has a key path longer than "+rg+" bytes ("+r.byteLength_+").");if(r.parts_.length>ng)throw new Error(r.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+ng+") or object contains a cycle "+vr(r))}function vr(r){return r.parts_.length===0?"":"in property '"+r.parts_.join(".")+"'"}/**
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
 */class vd extends k_{static getInstance(){return new vd}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return j(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const ys=1e3,_T=300*1e3,ig=30*1e3,vT=1.3,wT=3e4,ST="server_kill",sg=3;class En extends E_{constructor(e,t,s,o,l,u,h,p){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=s,this.onConnectStatus_=o,this.onServerInfoUpdate_=l,this.authTokenProvider_=u,this.appCheckTokenProvider_=h,this.authOverride_=p,this.id=En.nextPersistentConnectionId_++,this.log_=Vs("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=ys,this.maxReconnectDelay_=_T,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,p)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");vd.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&ba.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,s){const o=++this.requestNumber_,l={r:o,a:e,b:t};this.log_(tt(l)),j(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(l),s&&(this.requestCBHash_[o]=s)}get(e){this.initConnection_();const t=new Ju,o={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:u=>{const h=u.d;u.s==="ok"?t.resolve(h):t.reject(h)}};this.outstandingGets_.push(o),this.outstandingGetCount_++;const l=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(l),t.promise}listen(e,t,s,o){this.initConnection_();const l=e._queryIdentifier,u=e._path.toString();this.log_("Listen called for "+u+" "+l),this.listens.has(u)||this.listens.set(u,new Map),j(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),j(!this.listens.get(u).has(l),"listen() called twice for same path/queryId.");const h={onComplete:o,hashFn:t,query:e,tag:s};this.listens.get(u).set(l,h),this.connected_&&this.sendListen_(h)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(s)})}sendListen_(e){const t=e.query,s=t._path.toString(),o=t._queryIdentifier;this.log_("Listen on "+s+" for "+o);const l={p:s},u="q";e.tag&&(l.q=t._queryObject,l.t=e.tag),l.h=e.hashFn(),this.sendRequest(u,l,h=>{const p=h.d,m=h.s;En.warnOnListenWarnings_(p,t),(this.listens.get(s)&&this.listens.get(s).get(o))===e&&(this.log_("listen response",h),m!=="ok"&&this.removeListen_(s,o),e.onComplete&&e.onComplete(m,p))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&Tn(e,"w")){const s=gi(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const o='".indexOn": "'+t._queryParams.getIndex().toString()+'"',l=t._path.toString();Tt(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${o} at ${l} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||I1(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=ig)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=C1(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(t,s,o=>{const l=o.s,u=o.d||"error";this.authToken_===e&&(l==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(l,u))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,s=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,s)})}unlisten(e,t){const s=e._path.toString(),o=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+o),j(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,o)&&this.connected_&&this.sendUnlisten_(s,o,e._queryObject,t)}sendUnlisten_(e,t,s,o){this.log_("Unlisten on "+e+" for "+t);const l={p:e},u="n";o&&(l.q=s,l.t=o),this.sendRequest(u,l)}onDisconnectPut(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:s})}onDisconnectMerge(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:s})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,s,o){const l={p:t,d:s};this.log_("onDisconnect "+e,l),this.sendRequest(e,l,u=>{o&&setTimeout(()=>{o(u.s,u.d)},Math.floor(0))})}put(e,t,s,o){this.putInternal("p",e,t,s,o)}merge(e,t,s,o){this.putInternal("m",e,t,s,o)}putInternal(e,t,s,o,l){this.initConnection_();const u={p:t,d:s};l!==void 0&&(u.h=l),this.outstandingPuts_.push({action:e,request:u,onComplete:o}),this.outstandingPutCount_++;const h=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(h):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,o=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,s,l=>{this.log_(t+" response",l),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),o&&o(l.s,l.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,s=>{if(s.s!=="ok"){const l=s.d;this.log_("reportStats","Error sending stats: "+l)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+tt(e));const t=e.r,s=this.requestCBHash_[t];s&&(delete this.requestCBHash_[t],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):ju("Unrecognized action received from server: "+tt(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){j(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=ys,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=ys,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>wT&&(this.reconnectDelay_=ys),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*vT)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),o=this.id+":"+En.nextConnectionId_++,l=this.lastSessionId;let u=!1,h=null;const p=function(){h?h.close():(u=!0,s())},m=function(_){j(h,"sendRequest call when we're not connected not allowed."),h.sendRequest(_)};this.realtime_={close:p,sendRequest:m};const v=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[_,x]=await Promise.all([this.authTokenProvider_.getToken(v),this.appCheckTokenProvider_.getToken(v)]);u?ot("getToken() completed but was canceled"):(ot("getToken() completed. Creating connection."),this.authToken_=_&&_.accessToken,this.appCheckToken_=x&&x.token,h=new fT(o,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,s,R=>{Tt(R+" ("+this.repoInfo_.toString()+")"),this.interrupt(ST)},l))}catch(_){this.log_("Failed to get token: "+_),u||(this.repoInfo_.nodeAdmin&&Tt(_),p())}}}interrupt(e){ot("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){ot("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Tu(this.interruptReasons_)&&(this.reconnectDelay_=ys,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let s;t?s=t.map(l=>md(l)).join("$"):s="default";const o=this.removeListen_(e,s);o&&o.onComplete&&o.onComplete("permission_denied")}removeListen_(e,t){const s=new Le(e).toString();let o;if(this.listens.has(s)){const l=this.listens.get(s);o=l.get(t),l.delete(t),l.size===0&&this.listens.delete(s)}else o=void 0;return o}onAuthRevoked_(e,t){ot("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=sg&&(this.reconnectDelay_=ig,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){ot("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=sg&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+t_.replace(/\./g,"-")]=1,Xu()?e["framework.cordova"]=1:Hg()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=ba.getInstance().currentlyOnline();return Tu(this.interruptReasons_)&&e}}En.nextPersistentConnectionId_=0;En.nextConnectionId_=0;/**
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
 */class de{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new de(e,t)}}/**
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
 */class qa{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const s=new de(_i,e),o=new de(_i,t);return this.compare(s,o)!==0}minPost(){return de.MIN}}/**
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
 */let aa;class P_ extends qa{static get __EMPTY_NODE(){return aa}static set __EMPTY_NODE(e){aa=e}compare(e,t){return Ii(e.name,t.name)}isDefinedOn(e){throw Si("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return de.MIN}maxPost(){return new de(Ir,aa)}makePost(e,t){return j(typeof e=="string","KeyIndex indexValue must always be a string."),new de(e,aa)}toString(){return".key"}}const mi=new P_;/**
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
 */class la{constructor(e,t,s,o,l=null){this.isReverse_=o,this.resultGenerator_=l,this.nodeStack_=[];let u=1;for(;!e.isEmpty();)if(e=e,u=t?s(e.key,t):1,o&&(u*=-1),u<0)this.isReverse_?e=e.left:e=e.right;else if(u===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Je{constructor(e,t,s,o,l){this.key=e,this.value=t,this.color=s??Je.RED,this.left=o??wt.EMPTY_NODE,this.right=l??wt.EMPTY_NODE}copy(e,t,s,o,l){return new Je(e??this.key,t??this.value,s??this.color,o??this.left,l??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let o=this;const l=s(e,o.key);return l<0?o=o.copy(null,null,null,o.left.insert(e,t,s),null):l===0?o=o.copy(null,t,null,null,null):o=o.copy(null,null,null,null,o.right.insert(e,t,s)),o.fixUp_()}removeMin_(){if(this.left.isEmpty())return wt.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let s,o;if(s=this,t(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),t(e,s.key)===0){if(s.right.isEmpty())return wt.EMPTY_NODE;o=s.right.min_(),s=s.copy(o.key,o.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Je.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Je.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Je.RED=!0;Je.BLACK=!1;class xT{copy(e,t,s,o,l){return this}insert(e,t,s){return new Je(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class wt{constructor(e,t=wt.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new wt(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,Je.BLACK,null,null))}remove(e){return new wt(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Je.BLACK,null,null))}get(e){let t,s=this.root_;for(;!s.isEmpty();){if(t=this.comparator_(e,s.key),t===0)return s.value;t<0?s=s.left:t>0&&(s=s.right)}return null}getPredecessorKey(e){let t,s=this.root_,o=null;for(;!s.isEmpty();)if(t=this.comparator_(e,s.key),t===0){if(s.left.isEmpty())return o?o.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else t<0?s=s.left:t>0&&(o=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new la(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new la(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new la(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new la(this.root_,null,this.comparator_,!0,e)}}wt.EMPTY_NODE=new xT;/**
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
 */function ET(r,e){return Ii(r.name,e.name)}function wd(r,e){return Ii(r,e)}/**
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
 */let Uu;function kT(r){Uu=r}const b_=function(r){return typeof r=="number"?"number:"+o_(r):"string:"+r},A_=function(r){if(r.isLeafNode()){const e=r.val();j(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Tn(e,".sv"),"Priority must be a string or number.")}else j(r===Uu||r.isEmpty(),"priority of unexpected type.");j(r===Uu||r.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let og;class Qe{static set __childrenNodeConstructor(e){og=e}static get __childrenNodeConstructor(){return og}constructor(e,t=Qe.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,j(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),A_(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Qe(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Qe.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return le(e)?this:ue(e)===".priority"?this.priorityNode_:Qe.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:Qe.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const s=ue(e);return s===null?t:t.isEmpty()&&s!==".priority"?this:(j(s!==".priority"||rr(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,Qe.__childrenNodeConstructor.EMPTY_NODE.updateChild(Oe(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+b_(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=o_(this.value_):e+=this.value_,this.lazyHash_=r_(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Qe.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Qe.__childrenNodeConstructor?-1:(j(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,s=typeof this.value_,o=Qe.VALUE_TYPE_ORDER.indexOf(t),l=Qe.VALUE_TYPE_ORDER.indexOf(s);return j(o>=0,"Unknown leaf type: "+t),j(l>=0,"Unknown leaf type: "+s),o===l?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:l-o}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}Qe.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let O_,L_;function CT(r){O_=r}function IT(r){L_=r}class TT extends qa{compare(e,t){const s=e.node.getPriority(),o=t.node.getPriority(),l=s.compareTo(o);return l===0?Ii(e.name,t.name):l}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return de.MIN}maxPost(){return new de(Ir,new Qe("[PRIORITY-POST]",L_))}makePost(e,t){const s=O_(e);return new de(t,new Qe("[PRIORITY-POST]",s))}toString(){return".priority"}}const lt=new TT;/**
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
 */const NT=Math.log(2);class RT{constructor(e){const t=l=>parseInt(Math.log(l)/NT,10),s=l=>parseInt(Array(l+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const o=s(this.count);this.bits_=e+1&o}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Aa=function(r,e,t,s){r.sort(e);const o=function(p,m){const v=m-p;let _,x;if(v===0)return null;if(v===1)return _=r[p],x=t?t(_):_,new Je(x,_.node,Je.BLACK,null,null);{const R=parseInt(v/2,10)+p,T=o(p,R),L=o(R+1,m);return _=r[R],x=t?t(_):_,new Je(x,_.node,Je.BLACK,T,L)}},l=function(p){let m=null,v=null,_=r.length;const x=function(T,L){const U=_-T,ge=_;_-=T;const ce=o(U+1,ge),fe=r[U],ee=t?t(fe):fe;R(new Je(ee,fe.node,L,null,ce))},R=function(T){m?(m.left=T,m=T):(v=T,m=T)};for(let T=0;T<p.count;++T){const L=p.nextBitIsOne(),U=Math.pow(2,p.count-(T+1));L?x(U,Je.BLACK):(x(U,Je.BLACK),x(U,Je.RED))}return v},u=new RT(r.length),h=l(u);return new wt(s||e,h)};/**
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
 */let mu;const si={};class xn{static get Default(){return j(si&&lt,"ChildrenNode.ts has not been loaded"),mu=mu||new xn({".priority":si},{".priority":lt}),mu}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=gi(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof wt?t:null}hasIndex(e){return Tn(this.indexSet_,e.toString())}addIndex(e,t){j(e!==mi,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let o=!1;const l=t.getIterator(de.Wrap);let u=l.getNext();for(;u;)o=o||e.isDefinedOn(u.node),s.push(u),u=l.getNext();let h;o?h=Aa(s,e.getCompare()):h=si;const p=e.toString(),m={...this.indexSet_};m[p]=e;const v={...this.indexes_};return v[p]=h,new xn(v,m)}addToIndexes(e,t){const s=wa(this.indexes_,(o,l)=>{const u=gi(this.indexSet_,l);if(j(u,"Missing index implementation for "+l),o===si)if(u.isDefinedOn(e.node)){const h=[],p=t.getIterator(de.Wrap);let m=p.getNext();for(;m;)m.name!==e.name&&h.push(m),m=p.getNext();return h.push(e),Aa(h,u.getCompare())}else return si;else{const h=t.get(e.name);let p=o;return h&&(p=p.remove(new de(e.name,h))),p.insert(e,e.node)}});return new xn(s,this.indexSet_)}removeFromIndexes(e,t){const s=wa(this.indexes_,o=>{if(o===si)return o;{const l=t.get(e.name);return l?o.remove(new de(e.name,l)):o}});return new xn(s,this.indexSet_)}}/**
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
 */let _s;class _e{static get EMPTY_NODE(){return _s||(_s=new _e(new wt(wd),null,xn.Default))}constructor(e,t,s){this.children_=e,this.priorityNode_=t,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&A_(this.priorityNode_),this.children_.isEmpty()&&j(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||_s}updatePriority(e){return this.children_.isEmpty()?this:new _e(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?_s:t}}getChild(e){const t=ue(e);return t===null?this:this.getImmediateChild(t).getChild(Oe(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(j(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const s=new de(e,t);let o,l;t.isEmpty()?(o=this.children_.remove(e),l=this.indexMap_.removeFromIndexes(s,this.children_)):(o=this.children_.insert(e,t),l=this.indexMap_.addToIndexes(s,this.children_));const u=o.isEmpty()?_s:this.priorityNode_;return new _e(o,u,l)}}updateChild(e,t){const s=ue(e);if(s===null)return t;{j(ue(e)!==".priority"||rr(e)===1,".priority must be the last token in a path");const o=this.getImmediateChild(s).updateChild(Oe(e),t);return this.updateImmediateChild(s,o)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let s=0,o=0,l=!0;if(this.forEachChild(lt,(u,h)=>{t[u]=h.val(e),s++,l&&_e.INTEGER_REGEXP_.test(u)?o=Math.max(o,Number(u)):l=!1}),!e&&l&&o<2*s){const u=[];for(const h in t)u[h]=t[h];return u}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+b_(this.getPriority().val())+":"),this.forEachChild(lt,(t,s)=>{const o=s.hash();o!==""&&(e+=":"+t+":"+o)}),this.lazyHash_=e===""?"":r_(e)}return this.lazyHash_}getPredecessorChildName(e,t,s){const o=this.resolveIndex_(s);if(o){const l=o.getPredecessorKey(new de(e,t));return l?l.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new de(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new de(t,this.children_.get(t)):null}forEachChild(e,t){const s=this.resolveIndex_(e);return s?s.inorderTraversal(o=>t(o.name,o.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getIteratorFrom(e,o=>o);{const o=this.children_.getIteratorFrom(e.name,de.Wrap);let l=o.peek();for(;l!=null&&t.compare(l,e)<0;)o.getNext(),l=o.peek();return o}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getReverseIteratorFrom(e,o=>o);{const o=this.children_.getReverseIteratorFrom(e.name,de.Wrap);let l=o.peek();for(;l!=null&&t.compare(l,e)>0;)o.getNext(),l=o.peek();return o}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Ws?-1:0}withIndex(e){if(e===mi||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new _e(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===mi||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const s=this.getIterator(lt),o=t.getIterator(lt);let l=s.getNext(),u=o.getNext();for(;l&&u;){if(l.name!==u.name||!l.node.equals(u.node))return!1;l=s.getNext(),u=o.getNext()}return l===null&&u===null}else return!1;else return!1}}resolveIndex_(e){return e===mi?null:this.indexMap_.get(e.toString())}}_e.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class PT extends _e{constructor(){super(new wt(wd),_e.EMPTY_NODE,xn.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return _e.EMPTY_NODE}isEmpty(){return!1}}const Ws=new PT;Object.defineProperties(de,{MIN:{value:new de(_i,_e.EMPTY_NODE)},MAX:{value:new de(Ir,Ws)}});P_.__EMPTY_NODE=_e.EMPTY_NODE;Qe.__childrenNodeConstructor=_e;kT(Ws);IT(Ws);/**
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
 */const bT=!0;function at(r,e=null){if(r===null)return _e.EMPTY_NODE;if(typeof r=="object"&&".priority"in r&&(e=r[".priority"]),j(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof r=="object"&&".value"in r&&r[".value"]!==null&&(r=r[".value"]),typeof r!="object"||".sv"in r){const t=r;return new Qe(t,at(e))}if(!(r instanceof Array)&&bT){const t=[];let s=!1;if(Ft(r,(u,h)=>{if(u.substring(0,1)!=="."){const p=at(h);p.isEmpty()||(s=s||!p.getPriority().isEmpty(),t.push(new de(u,p)))}}),t.length===0)return _e.EMPTY_NODE;const l=Aa(t,ET,u=>u.name,wd);if(s){const u=Aa(t,lt.getCompare());return new _e(l,at(e),new xn({".priority":u},{".priority":lt}))}else return new _e(l,at(e),xn.Default)}else{let t=_e.EMPTY_NODE;return Ft(r,(s,o)=>{if(Tn(r,s)&&s.substring(0,1)!=="."){const l=at(o);(l.isLeafNode()||!l.isEmpty())&&(t=t.updateImmediateChild(s,l))}}),t.updatePriority(at(e))}}CT(at);/**
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
 */class AT extends qa{constructor(e){super(),this.indexPath_=e,j(!le(e)&&ue(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const s=this.extractChild(e.node),o=this.extractChild(t.node),l=s.compareTo(o);return l===0?Ii(e.name,t.name):l}makePost(e,t){const s=at(e),o=_e.EMPTY_NODE.updateChild(this.indexPath_,s);return new de(t,o)}maxPost(){const e=_e.EMPTY_NODE.updateChild(this.indexPath_,Ws);return new de(Ir,e)}toString(){return I_(this.indexPath_,0).join("/")}}/**
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
 */class OT extends qa{compare(e,t){const s=e.node.compareTo(t.node);return s===0?Ii(e.name,t.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return de.MIN}maxPost(){return de.MAX}makePost(e,t){const s=at(e);return new de(t,s)}toString(){return".value"}}const LT=new OT;/**
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
 */function DT(r){return{type:"value",snapshotNode:r}}function MT(r,e){return{type:"child_added",snapshotNode:e,childName:r}}function jT(r,e){return{type:"child_removed",snapshotNode:e,childName:r}}function ag(r,e,t){return{type:"child_changed",snapshotNode:e,childName:r,oldSnap:t}}function FT(r,e){return{type:"child_moved",snapshotNode:e,childName:r}}/**
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
 */class Sd{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=lt}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return j(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return j(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:_i}hasEnd(){return this.endSet_}getIndexEndValue(){return j(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return j(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Ir}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return j(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===lt}copy(){const e=new Sd;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function lg(r){const e={};if(r.isDefault())return e;let t;if(r.index_===lt?t="$priority":r.index_===LT?t="$value":r.index_===mi?t="$key":(j(r.index_ instanceof AT,"Unrecognized index type!"),t=r.index_.toString()),e.orderBy=tt(t),r.startSet_){const s=r.startAfterSet_?"startAfter":"startAt";e[s]=tt(r.indexStartValue_),r.startNameSet_&&(e[s]+=","+tt(r.indexStartName_))}if(r.endSet_){const s=r.endBeforeSet_?"endBefore":"endAt";e[s]=tt(r.indexEndValue_),r.endNameSet_&&(e[s]+=","+tt(r.indexEndName_))}return r.limitSet_&&(r.isViewFromLeft()?e.limitToFirst=r.limit_:e.limitToLast=r.limit_),e}function cg(r){const e={};if(r.startSet_&&(e.sp=r.indexStartValue_,r.startNameSet_&&(e.sn=r.indexStartName_),e.sin=!r.startAfterSet_),r.endSet_&&(e.ep=r.indexEndValue_,r.endNameSet_&&(e.en=r.indexEndName_),e.ein=!r.endBeforeSet_),r.limitSet_){e.l=r.limit_;let t=r.viewFrom_;t===""&&(r.isViewFromLeft()?t="l":t="r"),e.vf=t}return r.index_!==lt&&(e.i=r.index_.toString()),e}/**
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
 */class Oa extends E_{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(j(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,s,o){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=s,this.appCheckTokenProvider_=o,this.log_=Vs("p:rest:"),this.listens_={}}listen(e,t,s,o){const l=e._path.toString();this.log_("Listen called for "+l+" "+e._queryIdentifier);const u=Oa.getListenId_(e,s),h={};this.listens_[u]=h;const p=lg(e._queryParams);this.restRequest_(l+".json",p,(m,v)=>{let _=v;if(m===404&&(_=null,m=null),m===null&&this.onDataUpdate_(l,_,!1,s),gi(this.listens_,u)===h){let x;m?m===401?x="permission_denied":x="rest_error:"+m:x="ok",o(x,null)}})}unlisten(e,t){const s=Oa.getListenId_(e,t);delete this.listens_[s]}get(e){const t=lg(e._queryParams),s=e._path.toString(),o=new Ju;return this.restRequest_(s+".json",t,(l,u)=>{let h=u;l===404&&(h=null,l=null),l===null?(this.onDataUpdate_(s,h,!1,null),o.resolve(h)):o.reject(new Error(h))}),o.promise}refreshAuthToken(e){}restRequest_(e,t={},s){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([o,l])=>{o&&o.accessToken&&(t.auth=o.accessToken),l&&l.token&&(t.ac=l.token);const u=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+xi(t);this.log_("Sending REST request for "+u);const h=new XMLHttpRequest;h.onreadystatechange=()=>{if(s&&h.readyState===4){this.log_("REST Response for "+u+" received. status:",h.status,"response:",h.responseText);let p=null;if(h.status>=200&&h.status<300){try{p=As(h.responseText)}catch{Tt("Failed to parse JSON response for "+u+": "+h.responseText)}s(null,p)}else h.status!==401&&h.status!==404&&Tt("Got unsuccessful REST response for "+u+" Status: "+h.status),s(h.status);s=null}},h.open("GET",u,!0),h.send()})}}/**
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
 */class UT{constructor(){this.rootNode_=_e.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
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
 */function La(){return{value:null,children:new Map}}function D_(r,e,t){if(le(e))r.value=t,r.children.clear();else if(r.value!==null)r.value=r.value.updateChild(e,t);else{const s=ue(e);r.children.has(s)||r.children.set(s,La());const o=r.children.get(s);e=Oe(e),D_(o,e,t)}}function zu(r,e,t){r.value!==null?t(e,r.value):zT(r,(s,o)=>{const l=new Le(e.toString()+"/"+s);zu(o,l,t)})}function zT(r,e){r.children.forEach((t,s)=>{e(s,t)})}/**
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
 */class $T{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&Ft(this.last_,(s,o)=>{t[s]=t[s]-o}),this.last_=e,t}}/**
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
 */const ug=10*1e3,BT=30*1e3,VT=300*1e3;class HT{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new $T(e);const s=ug+(BT-ug)*Math.random();Ts(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),t={};let s=!1;Ft(e,(o,l)=>{l>0&&Tn(this.statsToReport_,o)&&(t[o]=l,s=!0)}),s&&this.server_.reportStats(t),Ts(this.reportStats_.bind(this),Math.floor(Math.random()*2*VT))}}/**
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
 */var on;(function(r){r[r.OVERWRITE=0]="OVERWRITE",r[r.MERGE=1]="MERGE",r[r.ACK_USER_WRITE=2]="ACK_USER_WRITE",r[r.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(on||(on={}));function M_(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function j_(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function F_(r){return{fromUser:!1,fromServer:!0,queryId:r,tagged:!0}}/**
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
 */class Da{constructor(e,t,s){this.path=e,this.affectedTree=t,this.revert=s,this.type=on.ACK_USER_WRITE,this.source=M_()}operationForChild(e){if(le(this.path)){if(this.affectedTree.value!=null)return j(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new Le(e));return new Da(Ee(),t,this.revert)}}else return j(ue(this.path)===e,"operationForChild called for unrelated child."),new Da(Oe(this.path),this.affectedTree,this.revert)}}/**
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
 */class Tr{constructor(e,t,s){this.source=e,this.path=t,this.snap=s,this.type=on.OVERWRITE}operationForChild(e){return le(this.path)?new Tr(this.source,Ee(),this.snap.getImmediateChild(e)):new Tr(this.source,Oe(this.path),this.snap)}}/**
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
 */class js{constructor(e,t,s){this.source=e,this.path=t,this.children=s,this.type=on.MERGE}operationForChild(e){if(le(this.path)){const t=this.children.subtree(new Le(e));return t.isEmpty()?null:t.value?new Tr(this.source,Ee(),t.value):new js(this.source,Ee(),t)}else return j(ue(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new js(this.source,Oe(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class xd{constructor(e,t,s){this.node_=e,this.fullyInitialized_=t,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(le(e))return this.isFullyInitialized()&&!this.filtered_;const t=ue(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}function WT(r,e,t,s){const o=[],l=[];return e.forEach(u=>{u.type==="child_changed"&&r.index_.indexedValueChanged(u.oldSnap,u.snapshotNode)&&l.push(FT(u.childName,u.snapshotNode))}),vs(r,o,"child_removed",e,s,t),vs(r,o,"child_added",e,s,t),vs(r,o,"child_moved",l,s,t),vs(r,o,"child_changed",e,s,t),vs(r,o,"value",e,s,t),o}function vs(r,e,t,s,o,l){const u=s.filter(h=>h.type===t);u.sort((h,p)=>GT(r,h,p)),u.forEach(h=>{const p=KT(r,h,l);o.forEach(m=>{m.respondsTo(h.type)&&e.push(m.createEvent(p,r.query_))})})}function KT(r,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,r.index_)),e}function GT(r,e,t){if(e.childName==null||t.childName==null)throw Si("Should only compare child_ events.");const s=new de(e.childName,e.snapshotNode),o=new de(t.childName,t.snapshotNode);return r.index_.compare(s,o)}/**
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
 */function U_(r,e){return{eventCache:r,serverCache:e}}function Ns(r,e,t,s){return U_(new xd(e,t,s),r.serverCache)}function z_(r,e,t,s){return U_(r.eventCache,new xd(e,t,s))}function $u(r){return r.eventCache.isFullyInitialized()?r.eventCache.getNode():null}function Nr(r){return r.serverCache.isFullyInitialized()?r.serverCache.getNode():null}/**
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
 */let gu;const qT=()=>(gu||(gu=new wt(LI)),gu);class Ae{static fromObject(e){let t=new Ae(null);return Ft(e,(s,o)=>{t=t.set(new Le(s),o)}),t}constructor(e,t=qT()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:Ee(),value:this.value};if(le(e))return null;{const s=ue(e),o=this.children.get(s);if(o!==null){const l=o.findRootMostMatchingPathAndValue(Oe(e),t);return l!=null?{path:Xe(new Le(s),l.path),value:l.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(le(e))return this;{const t=ue(e),s=this.children.get(t);return s!==null?s.subtree(Oe(e)):new Ae(null)}}set(e,t){if(le(e))return new Ae(t,this.children);{const s=ue(e),l=(this.children.get(s)||new Ae(null)).set(Oe(e),t),u=this.children.insert(s,l);return new Ae(this.value,u)}}remove(e){if(le(e))return this.children.isEmpty()?new Ae(null):new Ae(null,this.children);{const t=ue(e),s=this.children.get(t);if(s){const o=s.remove(Oe(e));let l;return o.isEmpty()?l=this.children.remove(t):l=this.children.insert(t,o),this.value===null&&l.isEmpty()?new Ae(null):new Ae(this.value,l)}else return this}}get(e){if(le(e))return this.value;{const t=ue(e),s=this.children.get(t);return s?s.get(Oe(e)):null}}setTree(e,t){if(le(e))return t;{const s=ue(e),l=(this.children.get(s)||new Ae(null)).setTree(Oe(e),t);let u;return l.isEmpty()?u=this.children.remove(s):u=this.children.insert(s,l),new Ae(this.value,u)}}fold(e){return this.fold_(Ee(),e)}fold_(e,t){const s={};return this.children.inorderTraversal((o,l)=>{s[o]=l.fold_(Xe(e,o),t)}),t(e,this.value,s)}findOnPath(e,t){return this.findOnPath_(e,Ee(),t)}findOnPath_(e,t,s){const o=this.value?s(t,this.value):!1;if(o)return o;if(le(e))return null;{const l=ue(e),u=this.children.get(l);return u?u.findOnPath_(Oe(e),Xe(t,l),s):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,Ee(),t)}foreachOnPath_(e,t,s){if(le(e))return this;{this.value&&s(t,this.value);const o=ue(e),l=this.children.get(o);return l?l.foreachOnPath_(Oe(e),Xe(t,o),s):new Ae(null)}}foreach(e){this.foreach_(Ee(),e)}foreach_(e,t){this.children.inorderTraversal((s,o)=>{o.foreach_(Xe(e,s),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,s)=>{s.value&&e(t,s.value)})}}/**
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
 */class Qt{constructor(e){this.writeTree_=e}static empty(){return new Qt(new Ae(null))}}function Rs(r,e,t){if(le(e))return new Qt(new Ae(t));{const s=r.writeTree_.findRootMostValueAndPath(e);if(s!=null){const o=s.path;let l=s.value;const u=Mt(o,e);return l=l.updateChild(u,t),new Qt(r.writeTree_.set(o,l))}else{const o=new Ae(t),l=r.writeTree_.setTree(e,o);return new Qt(l)}}}function dg(r,e,t){let s=r;return Ft(t,(o,l)=>{s=Rs(s,Xe(e,o),l)}),s}function hg(r,e){if(le(e))return Qt.empty();{const t=r.writeTree_.setTree(e,new Ae(null));return new Qt(t)}}function Bu(r,e){return Ar(r,e)!=null}function Ar(r,e){const t=r.writeTree_.findRootMostValueAndPath(e);return t!=null?r.writeTree_.get(t.path).getChild(Mt(t.path,e)):null}function fg(r){const e=[],t=r.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(lt,(s,o)=>{e.push(new de(s,o))}):r.writeTree_.children.inorderTraversal((s,o)=>{o.value!=null&&e.push(new de(s,o.value))}),e}function tr(r,e){if(le(e))return r;{const t=Ar(r,e);return t!=null?new Qt(new Ae(t)):new Qt(r.writeTree_.subtree(e))}}function Vu(r){return r.writeTree_.isEmpty()}function vi(r,e){return $_(Ee(),r.writeTree_,e)}function $_(r,e,t){if(e.value!=null)return t.updateChild(r,e.value);{let s=null;return e.children.inorderTraversal((o,l)=>{o===".priority"?(j(l.value!==null,"Priority writes must always be leaf nodes"),s=l.value):t=$_(Xe(r,o),l,t)}),!t.getChild(r).isEmpty()&&s!==null&&(t=t.updateChild(Xe(r,".priority"),s)),t}}/**
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
 */function B_(r,e){return G_(e,r)}function YT(r,e,t,s,o){j(s>r.lastWriteId,"Stacking an older write on top of newer ones"),o===void 0&&(o=!0),r.allWrites.push({path:e,snap:t,writeId:s,visible:o}),o&&(r.visibleWrites=Rs(r.visibleWrites,e,t)),r.lastWriteId=s}function QT(r,e){for(let t=0;t<r.allWrites.length;t++){const s=r.allWrites[t];if(s.writeId===e)return s}return null}function JT(r,e){const t=r.allWrites.findIndex(h=>h.writeId===e);j(t>=0,"removeWrite called with nonexistent writeId.");const s=r.allWrites[t];r.allWrites.splice(t,1);let o=s.visible,l=!1,u=r.allWrites.length-1;for(;o&&u>=0;){const h=r.allWrites[u];h.visible&&(u>=t&&XT(h,s.path)?o=!1:Yt(s.path,h.path)&&(l=!0)),u--}if(o){if(l)return ZT(r),!0;if(s.snap)r.visibleWrites=hg(r.visibleWrites,s.path);else{const h=s.children;Ft(h,p=>{r.visibleWrites=hg(r.visibleWrites,Xe(s.path,p))})}return!0}else return!1}function XT(r,e){if(r.snap)return Yt(r.path,e);for(const t in r.children)if(r.children.hasOwnProperty(t)&&Yt(Xe(r.path,t),e))return!0;return!1}function ZT(r){r.visibleWrites=V_(r.allWrites,eN,Ee()),r.allWrites.length>0?r.lastWriteId=r.allWrites[r.allWrites.length-1].writeId:r.lastWriteId=-1}function eN(r){return r.visible}function V_(r,e,t){let s=Qt.empty();for(let o=0;o<r.length;++o){const l=r[o];if(e(l)){const u=l.path;let h;if(l.snap)Yt(t,u)?(h=Mt(t,u),s=Rs(s,h,l.snap)):Yt(u,t)&&(h=Mt(u,t),s=Rs(s,Ee(),l.snap.getChild(h)));else if(l.children){if(Yt(t,u))h=Mt(t,u),s=dg(s,h,l.children);else if(Yt(u,t))if(h=Mt(u,t),le(h))s=dg(s,Ee(),l.children);else{const p=gi(l.children,ue(h));if(p){const m=p.getChild(Oe(h));s=Rs(s,Ee(),m)}}}else throw Si("WriteRecord should have .snap or .children")}}return s}function H_(r,e,t,s,o){if(!s&&!o){const l=Ar(r.visibleWrites,e);if(l!=null)return l;{const u=tr(r.visibleWrites,e);if(Vu(u))return t;if(t==null&&!Bu(u,Ee()))return null;{const h=t||_e.EMPTY_NODE;return vi(u,h)}}}else{const l=tr(r.visibleWrites,e);if(!o&&Vu(l))return t;if(!o&&t==null&&!Bu(l,Ee()))return null;{const u=function(m){return(m.visible||o)&&(!s||!~s.indexOf(m.writeId))&&(Yt(m.path,e)||Yt(e,m.path))},h=V_(r.allWrites,u,e),p=t||_e.EMPTY_NODE;return vi(h,p)}}}function tN(r,e,t){let s=_e.EMPTY_NODE;const o=Ar(r.visibleWrites,e);if(o)return o.isLeafNode()||o.forEachChild(lt,(l,u)=>{s=s.updateImmediateChild(l,u)}),s;if(t){const l=tr(r.visibleWrites,e);return t.forEachChild(lt,(u,h)=>{const p=vi(tr(l,new Le(u)),h);s=s.updateImmediateChild(u,p)}),fg(l).forEach(u=>{s=s.updateImmediateChild(u.name,u.node)}),s}else{const l=tr(r.visibleWrites,e);return fg(l).forEach(u=>{s=s.updateImmediateChild(u.name,u.node)}),s}}function nN(r,e,t,s,o){j(s||o,"Either existingEventSnap or existingServerSnap must exist");const l=Xe(e,t);if(Bu(r.visibleWrites,l))return null;{const u=tr(r.visibleWrites,l);return Vu(u)?o.getChild(t):vi(u,o.getChild(t))}}function rN(r,e,t,s){const o=Xe(e,t),l=Ar(r.visibleWrites,o);if(l!=null)return l;if(s.isCompleteForChild(t)){const u=tr(r.visibleWrites,o);return vi(u,s.getNode().getImmediateChild(t))}else return null}function iN(r,e){return Ar(r.visibleWrites,e)}function sN(r,e,t,s,o,l,u){let h;const p=tr(r.visibleWrites,e),m=Ar(p,Ee());if(m!=null)h=m;else if(t!=null)h=vi(p,t);else return[];if(h=h.withIndex(u),!h.isEmpty()&&!h.isLeafNode()){const v=[],_=u.getCompare(),x=l?h.getReverseIteratorFrom(s,u):h.getIteratorFrom(s,u);let R=x.getNext();for(;R&&v.length<o;)_(R,s)!==0&&v.push(R),R=x.getNext();return v}else return[]}function oN(){return{visibleWrites:Qt.empty(),allWrites:[],lastWriteId:-1}}function Hu(r,e,t,s){return H_(r.writeTree,r.treePath,e,t,s)}function W_(r,e){return tN(r.writeTree,r.treePath,e)}function pg(r,e,t,s){return nN(r.writeTree,r.treePath,e,t,s)}function Ma(r,e){return iN(r.writeTree,Xe(r.treePath,e))}function aN(r,e,t,s,o,l){return sN(r.writeTree,r.treePath,e,t,s,o,l)}function Ed(r,e,t){return rN(r.writeTree,r.treePath,e,t)}function K_(r,e){return G_(Xe(r.treePath,e),r.writeTree)}function G_(r,e){return{treePath:r,writeTree:e}}/**
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
 */class lN{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,s=e.childName;j(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),j(s!==".priority","Only non-priority child changes can be tracked.");const o=this.changeMap.get(s);if(o){const l=o.type;if(t==="child_added"&&l==="child_removed")this.changeMap.set(s,ag(s,e.snapshotNode,o.snapshotNode));else if(t==="child_removed"&&l==="child_added")this.changeMap.delete(s);else if(t==="child_removed"&&l==="child_changed")this.changeMap.set(s,jT(s,o.oldSnap));else if(t==="child_changed"&&l==="child_added")this.changeMap.set(s,MT(s,e.snapshotNode));else if(t==="child_changed"&&l==="child_changed")this.changeMap.set(s,ag(s,e.snapshotNode,o.oldSnap));else throw Si("Illegal combination of changes: "+e+" occurred after "+o)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class cN{getCompleteChild(e){return null}getChildAfterChild(e,t,s){return null}}const q_=new cN;class kd{constructor(e,t,s=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=s}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new xd(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Ed(this.writes_,e,s)}}getChildAfterChild(e,t,s){const o=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Nr(this.viewCache_),l=aN(this.writes_,o,t,1,s,e);return l.length===0?null:l[0]}}function uN(r,e){j(e.eventCache.getNode().isIndexed(r.filter.getIndex()),"Event snap not indexed"),j(e.serverCache.getNode().isIndexed(r.filter.getIndex()),"Server snap not indexed")}function dN(r,e,t,s,o){const l=new lN;let u,h;if(t.type===on.OVERWRITE){const m=t;m.source.fromUser?u=Wu(r,e,m.path,m.snap,s,o,l):(j(m.source.fromServer,"Unknown source."),h=m.source.tagged||e.serverCache.isFiltered()&&!le(m.path),u=ja(r,e,m.path,m.snap,s,o,h,l))}else if(t.type===on.MERGE){const m=t;m.source.fromUser?u=fN(r,e,m.path,m.children,s,o,l):(j(m.source.fromServer,"Unknown source."),h=m.source.tagged||e.serverCache.isFiltered(),u=Ku(r,e,m.path,m.children,s,o,h,l))}else if(t.type===on.ACK_USER_WRITE){const m=t;m.revert?u=gN(r,e,m.path,s,o,l):u=pN(r,e,m.path,m.affectedTree,s,o,l)}else if(t.type===on.LISTEN_COMPLETE)u=mN(r,e,t.path,s,l);else throw Si("Unknown operation type: "+t.type);const p=l.getChanges();return hN(e,u,p),{viewCache:u,changes:p}}function hN(r,e,t){const s=e.eventCache;if(s.isFullyInitialized()){const o=s.getNode().isLeafNode()||s.getNode().isEmpty(),l=$u(r);(t.length>0||!r.eventCache.isFullyInitialized()||o&&!s.getNode().equals(l)||!s.getNode().getPriority().equals(l.getPriority()))&&t.push(DT($u(e)))}}function Y_(r,e,t,s,o,l){const u=e.eventCache;if(Ma(s,t)!=null)return e;{let h,p;if(le(t))if(j(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const m=Nr(e),v=m instanceof _e?m:_e.EMPTY_NODE,_=W_(s,v);h=r.filter.updateFullNode(e.eventCache.getNode(),_,l)}else{const m=Hu(s,Nr(e));h=r.filter.updateFullNode(e.eventCache.getNode(),m,l)}else{const m=ue(t);if(m===".priority"){j(rr(t)===1,"Can't have a priority with additional path components");const v=u.getNode();p=e.serverCache.getNode();const _=pg(s,t,v,p);_!=null?h=r.filter.updatePriority(v,_):h=u.getNode()}else{const v=Oe(t);let _;if(u.isCompleteForChild(m)){p=e.serverCache.getNode();const x=pg(s,t,u.getNode(),p);x!=null?_=u.getNode().getImmediateChild(m).updateChild(v,x):_=u.getNode().getImmediateChild(m)}else _=Ed(s,m,e.serverCache);_!=null?h=r.filter.updateChild(u.getNode(),m,_,v,o,l):h=u.getNode()}}return Ns(e,h,u.isFullyInitialized()||le(t),r.filter.filtersNodes())}}function ja(r,e,t,s,o,l,u,h){const p=e.serverCache;let m;const v=u?r.filter:r.filter.getIndexedFilter();if(le(t))m=v.updateFullNode(p.getNode(),s,null);else if(v.filtersNodes()&&!p.isFiltered()){const R=p.getNode().updateChild(t,s);m=v.updateFullNode(p.getNode(),R,null)}else{const R=ue(t);if(!p.isCompleteForPath(t)&&rr(t)>1)return e;const T=Oe(t),U=p.getNode().getImmediateChild(R).updateChild(T,s);R===".priority"?m=v.updatePriority(p.getNode(),U):m=v.updateChild(p.getNode(),R,U,T,q_,null)}const _=z_(e,m,p.isFullyInitialized()||le(t),v.filtersNodes()),x=new kd(o,_,l);return Y_(r,_,t,o,x,h)}function Wu(r,e,t,s,o,l,u){const h=e.eventCache;let p,m;const v=new kd(o,e,l);if(le(t))m=r.filter.updateFullNode(e.eventCache.getNode(),s,u),p=Ns(e,m,!0,r.filter.filtersNodes());else{const _=ue(t);if(_===".priority")m=r.filter.updatePriority(e.eventCache.getNode(),s),p=Ns(e,m,h.isFullyInitialized(),h.isFiltered());else{const x=Oe(t),R=h.getNode().getImmediateChild(_);let T;if(le(x))T=s;else{const L=v.getCompleteChild(_);L!=null?C_(x)===".priority"&&L.getChild(T_(x)).isEmpty()?T=L:T=L.updateChild(x,s):T=_e.EMPTY_NODE}if(R.equals(T))p=e;else{const L=r.filter.updateChild(h.getNode(),_,T,x,v,u);p=Ns(e,L,h.isFullyInitialized(),r.filter.filtersNodes())}}}return p}function mg(r,e){return r.eventCache.isCompleteForChild(e)}function fN(r,e,t,s,o,l,u){let h=e;return s.foreach((p,m)=>{const v=Xe(t,p);mg(e,ue(v))&&(h=Wu(r,h,v,m,o,l,u))}),s.foreach((p,m)=>{const v=Xe(t,p);mg(e,ue(v))||(h=Wu(r,h,v,m,o,l,u))}),h}function gg(r,e,t){return t.foreach((s,o)=>{e=e.updateChild(s,o)}),e}function Ku(r,e,t,s,o,l,u,h){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let p=e,m;le(t)?m=s:m=new Ae(null).setTree(t,s);const v=e.serverCache.getNode();return m.children.inorderTraversal((_,x)=>{if(v.hasChild(_)){const R=e.serverCache.getNode().getImmediateChild(_),T=gg(r,R,x);p=ja(r,p,new Le(_),T,o,l,u,h)}}),m.children.inorderTraversal((_,x)=>{const R=!e.serverCache.isCompleteForChild(_)&&x.value===null;if(!v.hasChild(_)&&!R){const T=e.serverCache.getNode().getImmediateChild(_),L=gg(r,T,x);p=ja(r,p,new Le(_),L,o,l,u,h)}}),p}function pN(r,e,t,s,o,l,u){if(Ma(o,t)!=null)return e;const h=e.serverCache.isFiltered(),p=e.serverCache;if(s.value!=null){if(le(t)&&p.isFullyInitialized()||p.isCompleteForPath(t))return ja(r,e,t,p.getNode().getChild(t),o,l,h,u);if(le(t)){let m=new Ae(null);return p.getNode().forEachChild(mi,(v,_)=>{m=m.set(new Le(v),_)}),Ku(r,e,t,m,o,l,h,u)}else return e}else{let m=new Ae(null);return s.foreach((v,_)=>{const x=Xe(t,v);p.isCompleteForPath(x)&&(m=m.set(v,p.getNode().getChild(x)))}),Ku(r,e,t,m,o,l,h,u)}}function mN(r,e,t,s,o){const l=e.serverCache,u=z_(e,l.getNode(),l.isFullyInitialized()||le(t),l.isFiltered());return Y_(r,u,t,s,q_,o)}function gN(r,e,t,s,o,l){let u;if(Ma(s,t)!=null)return e;{const h=new kd(s,e,o),p=e.eventCache.getNode();let m;if(le(t)||ue(t)===".priority"){let v;if(e.serverCache.isFullyInitialized())v=Hu(s,Nr(e));else{const _=e.serverCache.getNode();j(_ instanceof _e,"serverChildren would be complete if leaf node"),v=W_(s,_)}v=v,m=r.filter.updateFullNode(p,v,l)}else{const v=ue(t);let _=Ed(s,v,e.serverCache);_==null&&e.serverCache.isCompleteForChild(v)&&(_=p.getImmediateChild(v)),_!=null?m=r.filter.updateChild(p,v,_,Oe(t),h,l):e.eventCache.getNode().hasChild(v)?m=r.filter.updateChild(p,v,_e.EMPTY_NODE,Oe(t),h,l):m=p,m.isEmpty()&&e.serverCache.isFullyInitialized()&&(u=Hu(s,Nr(e)),u.isLeafNode()&&(m=r.filter.updateFullNode(m,u,l)))}return u=e.serverCache.isFullyInitialized()||Ma(s,Ee())!=null,Ns(e,m,u,r.filter.filtersNodes())}}function yN(r,e){const t=Nr(r.viewCache_);return t&&(r.query._queryParams.loadsAllData()||!le(e)&&!t.getImmediateChild(ue(e)).isEmpty())?t.getChild(e):null}function yg(r,e,t,s){e.type===on.MERGE&&e.source.queryId!==null&&(j(Nr(r.viewCache_),"We should always have a full cache before handling merges"),j($u(r.viewCache_),"Missing event cache, even though we have a server cache"));const o=r.viewCache_,l=dN(r.processor_,o,e,t,s);return uN(r.processor_,l.viewCache),j(l.viewCache.serverCache.isFullyInitialized()||!o.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),r.viewCache_=l.viewCache,_N(r,l.changes,l.viewCache.eventCache.getNode())}function _N(r,e,t,s){const o=r.eventRegistrations_;return WT(r.eventGenerator_,e,t,o)}/**
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
 */let _g;function vN(r){j(!_g,"__referenceConstructor has already been defined"),_g=r}function Cd(r,e,t,s){const o=e.source.queryId;if(o!==null){const l=r.views.get(o);return j(l!=null,"SyncTree gave us an op for an invalid query."),yg(l,e,t,s)}else{let l=[];for(const u of r.views.values())l=l.concat(yg(u,e,t,s));return l}}function Id(r,e){let t=null;for(const s of r.views.values())t=t||yN(s,e);return t}/**
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
 */let vg;function wN(r){j(!vg,"__referenceConstructor has already been defined"),vg=r}class wg{constructor(e){this.listenProvider_=e,this.syncPointTree_=new Ae(null),this.pendingWriteTree_=oN(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function SN(r,e,t,s,o){return YT(r.pendingWriteTree_,e,t,s,o),o?Qa(r,new Tr(M_(),e,t)):[]}function li(r,e,t=!1){const s=QT(r.pendingWriteTree_,e);if(JT(r.pendingWriteTree_,e)){let l=new Ae(null);return s.snap!=null?l=l.set(Ee(),!0):Ft(s.children,u=>{l=l.set(new Le(u),!0)}),Qa(r,new Da(s.path,l,t))}else return[]}function Ya(r,e,t){return Qa(r,new Tr(j_(),e,t))}function xN(r,e,t){const s=Ae.fromObject(t);return Qa(r,new js(j_(),e,s))}function EN(r,e,t,s){const o=Z_(r,s);if(o!=null){const l=ev(o),u=l.path,h=l.queryId,p=Mt(u,e),m=new Tr(F_(h),p,t);return tv(r,u,m)}else return[]}function kN(r,e,t,s){const o=Z_(r,s);if(o){const l=ev(o),u=l.path,h=l.queryId,p=Mt(u,e),m=Ae.fromObject(t),v=new js(F_(h),p,m);return tv(r,u,v)}else return[]}function Q_(r,e,t){const o=r.pendingWriteTree_,l=r.syncPointTree_.findOnPath(e,(u,h)=>{const p=Mt(u,e),m=Id(h,p);if(m)return m});return H_(o,e,l,t,!0)}function Qa(r,e){return J_(e,r.syncPointTree_,null,B_(r.pendingWriteTree_,Ee()))}function J_(r,e,t,s){if(le(r.path))return X_(r,e,t,s);{const o=e.get(Ee());t==null&&o!=null&&(t=Id(o,Ee()));let l=[];const u=ue(r.path),h=r.operationForChild(u),p=e.children.get(u);if(p&&h){const m=t?t.getImmediateChild(u):null,v=K_(s,u);l=l.concat(J_(h,p,m,v))}return o&&(l=l.concat(Cd(o,r,s,t))),l}}function X_(r,e,t,s){const o=e.get(Ee());t==null&&o!=null&&(t=Id(o,Ee()));let l=[];return e.children.inorderTraversal((u,h)=>{const p=t?t.getImmediateChild(u):null,m=K_(s,u),v=r.operationForChild(u);v&&(l=l.concat(X_(v,h,p,m)))}),o&&(l=l.concat(Cd(o,r,s,t))),l}function Z_(r,e){return r.tagToQueryMap.get(e)}function ev(r){const e=r.indexOf("$");return j(e!==-1&&e<r.length-1,"Bad queryKey."),{queryId:r.substr(e+1),path:new Le(r.substr(0,e))}}function tv(r,e,t){const s=r.syncPointTree_.get(e);j(s,"Missing sync point for query tag that we're tracking");const o=B_(r.pendingWriteTree_,e);return Cd(s,t,o,null)}/**
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
 */class Td{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Td(t)}node(){return this.node_}}class Nd{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=Xe(this.path_,e);return new Nd(this.syncTree_,t)}node(){return Q_(this.syncTree_,this.path_)}}const CN=function(r){return r=r||{},r.timestamp=r.timestamp||new Date().getTime(),r},Sg=function(r,e,t){if(!r||typeof r!="object")return r;if(j(".sv"in r,"Unexpected leaf node or priority contents"),typeof r[".sv"]=="string")return IN(r[".sv"],e,t);if(typeof r[".sv"]=="object")return TN(r[".sv"],e);j(!1,"Unexpected server value: "+JSON.stringify(r,null,2))},IN=function(r,e,t){switch(r){case"timestamp":return t.timestamp;default:j(!1,"Unexpected server value: "+r)}},TN=function(r,e,t){r.hasOwnProperty("increment")||j(!1,"Unexpected server value: "+JSON.stringify(r,null,2));const s=r.increment;typeof s!="number"&&j(!1,"Unexpected increment value: "+s);const o=e.node();if(j(o!==null&&typeof o<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!o.isLeafNode())return s;const u=o.getValue();return typeof u!="number"?s:u+s},NN=function(r,e,t,s){return Rd(e,new Nd(t,r),s)},RN=function(r,e,t){return Rd(r,new Td(e),t)};function Rd(r,e,t){const s=r.getPriority().val(),o=Sg(s,e.getImmediateChild(".priority"),t);let l;if(r.isLeafNode()){const u=r,h=Sg(u.getValue(),e,t);return h!==u.getValue()||o!==u.getPriority().val()?new Qe(h,at(o)):r}else{const u=r;return l=u,o!==u.getPriority().val()&&(l=l.updatePriority(new Qe(o))),u.forEachChild(lt,(h,p)=>{const m=Rd(p,e.getImmediateChild(h),t);m!==p&&(l=l.updateImmediateChild(h,m))}),l}}/**
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
 */class Pd{constructor(e="",t=null,s={children:{},childCount:0}){this.name=e,this.parent=t,this.node=s}}function bd(r,e){let t=e instanceof Le?e:new Le(e),s=r,o=ue(t);for(;o!==null;){const l=gi(s.node.children,o)||{children:{},childCount:0};s=new Pd(o,s,l),t=Oe(t),o=ue(t)}return s}function Ti(r){return r.node.value}function nv(r,e){r.node.value=e,Gu(r)}function rv(r){return r.node.childCount>0}function PN(r){return Ti(r)===void 0&&!rv(r)}function Ja(r,e){Ft(r.node.children,(t,s)=>{e(new Pd(t,r,s))})}function iv(r,e,t,s){t&&e(r),Ja(r,o=>{iv(o,e,!0)})}function bN(r,e,t){let s=r.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function Ks(r){return new Le(r.parent===null?r.name:Ks(r.parent)+"/"+r.name)}function Gu(r){r.parent!==null&&AN(r.parent,r.name,r)}function AN(r,e,t){const s=PN(t),o=Tn(r.node.children,e);s&&o?(delete r.node.children[e],r.node.childCount--,Gu(r)):!s&&!o&&(r.node.children[e]=t.node,r.node.childCount++,Gu(r))}/**
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
 */const ON=/[\[\].#$\/\u0000-\u001F\u007F]/,LN=/[\[\].#$\u0000-\u001F\u007F]/,yu=10*1024*1024,sv=function(r){return typeof r=="string"&&r.length!==0&&!ON.test(r)},DN=function(r){return typeof r=="string"&&r.length!==0&&!LN.test(r)},MN=function(r){return r&&(r=r.replace(/^\/*\.info(\/|$)/,"/")),DN(r)},ov=function(r,e,t){const s=t instanceof Le?new mT(t,r):t;if(e===void 0)throw new Error(r+"contains undefined "+vr(s));if(typeof e=="function")throw new Error(r+"contains a function "+vr(s)+" with contents = "+e.toString());if(i_(e))throw new Error(r+"contains "+e.toString()+" "+vr(s));if(typeof e=="string"&&e.length>yu/3&&za(e)>yu)throw new Error(r+"contains a string greater than "+yu+" utf8 bytes "+vr(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let o=!1,l=!1;if(Ft(e,(u,h)=>{if(u===".value")o=!0;else if(u!==".priority"&&u!==".sv"&&(l=!0,!sv(u)))throw new Error(r+" contains an invalid key ("+u+") "+vr(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);gT(s,u),ov(r,h,s),yT(s)}),o&&l)throw new Error(r+' contains ".value" child '+vr(s)+" in addition to actual children.")}},jN=function(r,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!sv(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!MN(t))throw new Error(b1(r,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class FN{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function UN(r,e){let t=null;for(let s=0;s<e.length;s++){const o=e[s],l=o.getPath();t!==null&&!N_(l,t.path)&&(r.eventLists_.push(t),t=null),t===null&&(t={events:[],path:l}),t.events.push(o)}t&&r.eventLists_.push(t)}function Or(r,e,t){UN(r,t),zN(r,s=>Yt(s,e)||Yt(e,s))}function zN(r,e){r.recursionDepth_++;let t=!0;for(let s=0;s<r.eventLists_.length;s++){const o=r.eventLists_[s];if(o){const l=o.path;e(l)?($N(r.eventLists_[s]),r.eventLists_[s]=null):t=!1}}t&&(r.eventLists_=[]),r.recursionDepth_--}function $N(r){for(let e=0;e<r.events.length;e++){const t=r.events[e];if(t!==null){r.events[e]=null;const s=t.getEventRunner();Is&&ot("event: "+t.toString()),Hs(s)}}}/**
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
 */const BN="repo_interrupt",VN=25;class HN{constructor(e,t,s,o){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=s,this.appCheckProvider_=o,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new FN,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=La(),this.transactionQueueTree_=new Pd,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function WN(r,e,t){if(r.stats_=yd(r.repoInfo_),r.forceRestClient_||zI())r.server_=new Oa(r.repoInfo_,(s,o,l,u)=>{xg(r,s,o,l,u)},r.authTokenProvider_,r.appCheckProvider_),setTimeout(()=>Eg(r,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{tt(t)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}r.persistentConnection_=new En(r.repoInfo_,e,(s,o,l,u)=>{xg(r,s,o,l,u)},s=>{Eg(r,s)},s=>{GN(r,s)},r.authTokenProvider_,r.appCheckProvider_,t),r.server_=r.persistentConnection_}r.authTokenProvider_.addTokenChangeListener(s=>{r.server_.refreshAuthToken(s)}),r.appCheckProvider_.addTokenChangeListener(s=>{r.server_.refreshAppCheckToken(s.token)}),r.statsReporter_=WI(r.repoInfo_,()=>new HT(r.stats_,r.server_)),r.infoData_=new UT,r.infoSyncTree_=new wg({startListening:(s,o,l,u)=>{let h=[];const p=r.infoData_.getNode(s._path);return p.isEmpty()||(h=Ya(r.infoSyncTree_,s._path,p),setTimeout(()=>{u("ok")},0)),h},stopListening:()=>{}}),Ad(r,"connected",!1),r.serverSyncTree_=new wg({startListening:(s,o,l,u)=>(r.server_.listen(s,l,o,(h,p)=>{const m=u(h,p);Or(r.eventQueue_,s._path,m)}),[]),stopListening:(s,o)=>{r.server_.unlisten(s,o)}})}function KN(r){const t=r.infoData_.getNode(new Le(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function av(r){return CN({timestamp:KN(r)})}function xg(r,e,t,s,o){r.dataUpdateCount++;const l=new Le(e);t=r.interceptServerDataCallback_?r.interceptServerDataCallback_(e,t):t;let u=[];if(o)if(s){const p=wa(t,m=>at(m));u=kN(r.serverSyncTree_,l,p,o)}else{const p=at(t);u=EN(r.serverSyncTree_,l,p,o)}else if(s){const p=wa(t,m=>at(m));u=xN(r.serverSyncTree_,l,p)}else{const p=at(t);u=Ya(r.serverSyncTree_,l,p)}let h=l;u.length>0&&(h=Ld(r,l)),Or(r.eventQueue_,h,u)}function Eg(r,e){Ad(r,"connected",e),e===!1&&YN(r)}function GN(r,e){Ft(e,(t,s)=>{Ad(r,t,s)})}function Ad(r,e,t){const s=new Le("/.info/"+e),o=at(t);r.infoData_.updateSnapshot(s,o);const l=Ya(r.infoSyncTree_,s,o);Or(r.eventQueue_,s,l)}function qN(r){return r.nextWriteId_++}function YN(r){lv(r,"onDisconnectEvents");const e=av(r),t=La();zu(r.onDisconnect_,Ee(),(o,l)=>{const u=NN(o,l,r.serverSyncTree_,e);D_(t,o,u)});let s=[];zu(t,Ee(),(o,l)=>{s=s.concat(Ya(r.serverSyncTree_,o,l));const u=ZN(r,o);Ld(r,u)}),r.onDisconnect_=La(),Or(r.eventQueue_,Ee(),s)}function QN(r){r.persistentConnection_&&r.persistentConnection_.interrupt(BN)}function lv(r,...e){let t="";r.persistentConnection_&&(t=r.persistentConnection_.id+":"),ot(t,...e)}function cv(r,e,t){return Q_(r.serverSyncTree_,e,t)||_e.EMPTY_NODE}function Od(r,e=r.transactionQueueTree_){if(e||Xa(r,e),Ti(e)){const t=dv(r,e);j(t.length>0,"Sending zero length transaction queue"),t.every(o=>o.status===0)&&JN(r,Ks(e),t)}else rv(e)&&Ja(e,t=>{Od(r,t)})}function JN(r,e,t){const s=t.map(m=>m.currentWriteId),o=cv(r,e,s);let l=o;const u=o.hash();for(let m=0;m<t.length;m++){const v=t[m];j(v.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),v.status=1,v.retryCount++;const _=Mt(e,v.path);l=l.updateChild(_,v.currentOutputSnapshotRaw)}const h=l.val(!0),p=e;r.server_.put(p.toString(),h,m=>{lv(r,"transaction put response",{path:p.toString(),status:m});let v=[];if(m==="ok"){const _=[];for(let x=0;x<t.length;x++)t[x].status=2,v=v.concat(li(r.serverSyncTree_,t[x].currentWriteId)),t[x].onComplete&&_.push(()=>t[x].onComplete(null,!0,t[x].currentOutputSnapshotResolved)),t[x].unwatcher();Xa(r,bd(r.transactionQueueTree_,e)),Od(r,r.transactionQueueTree_),Or(r.eventQueue_,e,v);for(let x=0;x<_.length;x++)Hs(_[x])}else{if(m==="datastale")for(let _=0;_<t.length;_++)t[_].status===3?t[_].status=4:t[_].status=0;else{Tt("transaction at "+p.toString()+" failed: "+m);for(let _=0;_<t.length;_++)t[_].status=4,t[_].abortReason=m}Ld(r,e)}},u)}function Ld(r,e){const t=uv(r,e),s=Ks(t),o=dv(r,t);return XN(r,o,s),s}function XN(r,e,t){if(e.length===0)return;const s=[];let o=[];const u=e.filter(h=>h.status===0).map(h=>h.currentWriteId);for(let h=0;h<e.length;h++){const p=e[h],m=Mt(t,p.path);let v=!1,_;if(j(m!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),p.status===4)v=!0,_=p.abortReason,o=o.concat(li(r.serverSyncTree_,p.currentWriteId,!0));else if(p.status===0)if(p.retryCount>=VN)v=!0,_="maxretry",o=o.concat(li(r.serverSyncTree_,p.currentWriteId,!0));else{const x=cv(r,p.path,u);p.currentInputSnapshot=x;const R=e[h].update(x.val());if(R!==void 0){ov("transaction failed: Data returned ",R,p.path);let T=at(R);typeof R=="object"&&R!=null&&Tn(R,".priority")||(T=T.updatePriority(x.getPriority()));const U=p.currentWriteId,ge=av(r),ce=RN(T,x,ge);p.currentOutputSnapshotRaw=T,p.currentOutputSnapshotResolved=ce,p.currentWriteId=qN(r),u.splice(u.indexOf(U),1),o=o.concat(SN(r.serverSyncTree_,p.path,ce,p.currentWriteId,p.applyLocally)),o=o.concat(li(r.serverSyncTree_,U,!0))}else v=!0,_="nodata",o=o.concat(li(r.serverSyncTree_,p.currentWriteId,!0))}Or(r.eventQueue_,t,o),o=[],v&&(e[h].status=2,(function(x){setTimeout(x,Math.floor(0))})(e[h].unwatcher),e[h].onComplete&&(_==="nodata"?s.push(()=>e[h].onComplete(null,!1,e[h].currentInputSnapshot)):s.push(()=>e[h].onComplete(new Error(_),!1,null))))}Xa(r,r.transactionQueueTree_);for(let h=0;h<s.length;h++)Hs(s[h]);Od(r,r.transactionQueueTree_)}function uv(r,e){let t,s=r.transactionQueueTree_;for(t=ue(e);t!==null&&Ti(s)===void 0;)s=bd(s,t),e=Oe(e),t=ue(e);return s}function dv(r,e){const t=[];return hv(r,e,t),t.sort((s,o)=>s.order-o.order),t}function hv(r,e,t){const s=Ti(e);if(s)for(let o=0;o<s.length;o++)t.push(s[o]);Ja(e,o=>{hv(r,o,t)})}function Xa(r,e){const t=Ti(e);if(t){let s=0;for(let o=0;o<t.length;o++)t[o].status!==2&&(t[s]=t[o],s++);t.length=s,nv(e,t.length>0?t:void 0)}Ja(e,s=>{Xa(r,s)})}function ZN(r,e){const t=Ks(uv(r,e)),s=bd(r.transactionQueueTree_,e);return bN(s,o=>{_u(r,o)}),_u(r,s),iv(s,o=>{_u(r,o)}),t}function _u(r,e){const t=Ti(e);if(t){const s=[];let o=[],l=-1;for(let u=0;u<t.length;u++)t[u].status===3||(t[u].status===1?(j(l===u-1,"All SENT items should be at beginning of queue."),l=u,t[u].status=3,t[u].abortReason="set"):(j(t[u].status===0,"Unexpected transaction status in abort"),t[u].unwatcher(),o=o.concat(li(r.serverSyncTree_,t[u].currentWriteId,!0)),t[u].onComplete&&s.push(t[u].onComplete.bind(null,new Error("set"),!1,null))));l===-1?nv(e,void 0):t.length=l+1,Or(r.eventQueue_,Ks(e),o);for(let u=0;u<s.length;u++)Hs(s[u])}}/**
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
 */function eR(r){let e="";const t=r.split("/");for(let s=0;s<t.length;s++)if(t[s].length>0){let o=t[s];try{o=decodeURIComponent(o.replace(/\+/g," "))}catch{}e+="/"+o}return e}function tR(r){const e={};r.charAt(0)==="?"&&(r=r.substring(1));for(const t of r.split("&")){if(t.length===0)continue;const s=t.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):Tt(`Invalid query segment '${t}' in query '${r}'`)}return e}const kg=function(r,e){const t=nR(r),s=t.namespace;t.domain==="firebase.com"&&In(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&t.domain!=="localhost"&&In("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||AI();const o=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new g_(t.host,t.secure,s,o,e,"",s!==t.subdomain),path:new Le(t.pathString)}},nR=function(r){let e="",t="",s="",o="",l="",u=!0,h="https",p=443;if(typeof r=="string"){let m=r.indexOf("//");m>=0&&(h=r.substring(0,m-1),r=r.substring(m+2));let v=r.indexOf("/");v===-1&&(v=r.length);let _=r.indexOf("?");_===-1&&(_=r.length),e=r.substring(0,Math.min(v,_)),v<_&&(o=eR(r.substring(v,_)));const x=tR(r.substring(Math.min(r.length,_)));m=e.indexOf(":"),m>=0?(u=h==="https"||h==="wss",p=parseInt(e.substring(m+1),10)):m=e.length;const R=e.slice(0,m);if(R.toLowerCase()==="localhost")t="localhost";else if(R.split(".").length<=2)t=R;else{const T=e.indexOf(".");s=e.substring(0,T).toLowerCase(),t=e.substring(T+1),l=s}"ns"in x&&(l=x.ns)}return{host:e,port:p,domain:t,subdomain:s,secure:u,scheme:h,pathString:o,namespace:l}};/**
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
 */class Dd{constructor(e,t,s,o){this._repo=e,this._path=t,this._queryParams=s,this._orderByCalled=o}get key(){return le(this._path)?null:C_(this._path)}get ref(){return new Ni(this._repo,this._path)}get _queryIdentifier(){const e=cg(this._queryParams),t=md(e);return t==="{}"?"default":t}get _queryObject(){return cg(this._queryParams)}isEqual(e){if(e=Nt(e),!(e instanceof Dd))return!1;const t=this._repo===e._repo,s=N_(this._path,e._path),o=this._queryIdentifier===e._queryIdentifier;return t&&s&&o}toJSON(){return this.toString()}toString(){return this._repo.toString()+pT(this._path)}}class Ni extends Dd{constructor(e,t){super(e,t,new Sd,!1)}get parent(){const e=T_(this._path);return e===null?null:new Ni(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}vN(Ni);wN(Ni);/**
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
 */const rR="FIREBASE_DATABASE_EMULATOR_HOST",qu={};let iR=!1;function sR(r,e,t,s){const o=e.lastIndexOf(":"),l=e.substring(0,o),u=Fs(l);r.repoInfo_=new g_(e,u,r.repoInfo_.namespace,r.repoInfo_.webSocketOnly,r.repoInfo_.nodeAdmin,r.repoInfo_.persistenceKey,r.repoInfo_.includeNamespaceInQueryParams,!0,t),s&&(r.authTokenProvider_=s)}function oR(r,e,t,s,o){let l=s||r.options.databaseURL;l===void 0&&(r.options.projectId||In("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),ot("Using default host for project ",r.options.projectId),l=`${r.options.projectId}-default-rtdb.firebaseio.com`);let u=kg(l,o),h=u.repoInfo,p;typeof process<"u"&&Hm&&(p=Hm[rR]),p?(l=`http://${p}?ns=${h.namespace}`,u=kg(l,o),h=u.repoInfo):u.repoInfo.secure;const m=new BI(r.name,r.options,e);jN("Invalid Firebase Database URL",u),le(u.path)||In("Database URL must point to the root of a Firebase Database (not including a child path).");const v=lR(h,r,m,new $I(r,t));return new cR(v,r)}function aR(r,e){const t=qu[e];(!t||t[r.key]!==r)&&In(`Database ${e}(${r.repoInfo_}) has already been deleted.`),QN(r),delete t[r.key]}function lR(r,e,t,s){let o=qu[e.name];o||(o={},qu[e.name]=o);let l=o[r.toURLString()];return l&&In("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),l=new HN(r,iR,t,s),o[r.toURLString()]=l,l}class cR{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(WN(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Ni(this._repo,Ee())),this._rootInternal}_delete(){return this._rootInternal!==null&&(aR(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&In("Cannot call "+e+" on a deleted database.")}}function uR(r=ed(),e){const t=Pr(r,"database").getImmediate({identifier:e});if(!t._instanceStarted){const s=g1("database");s&&dR(t,...s)}return t}function dR(r,e,t,s={}){r=Nt(r),r._checkNotDeleted("useEmulator");const o=`${e}:${t}`,l=r._repoInternal;if(r._instanceStarted){if(o===r._repoInternal.repoInfo_.host&&nr(s,l.repoInfo_.emulatorOptions))return;In("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let u;if(l.repoInfo_.nodeAdmin)s.mockUserToken&&In('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),u=new pa(pa.OWNER);else if(s.mockUserToken){const h=typeof s.mockUserToken=="string"?s.mockUserToken:y1(s.mockUserToken,r.app.options.projectId);u=new pa(h)}Fs(e)&&qg(e),sR(l,o,s,u)}/**
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
 */function hR(r){II(Ei),cn(new Jt("database",(e,{instanceIdentifier:t})=>{const s=e.getProvider("app").getImmediate(),o=e.getProvider("auth-internal"),l=e.getProvider("app-check-internal");return oR(s,o,l,t)},"PUBLIC").setMultipleInstances(!0)),jt(Wm,Km,r),jt(Wm,Km,"esm2020")}En.prototype.simpleListen=function(r,e){this.sendRequest("q",{p:r},e)};En.prototype.echo=function(r,e){this.sendRequest("echo",{d:r},e)};hR();const fR={apiKey:"AIzaSyBjGqNtm17fdNUfU5twhJt8Wc20OEB0B28",authDomain:"uncleaunty-app.firebaseapp.com",databaseURL:"https://uncleaunty-app-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"uncleaunty-app",storageBucket:"uncleaunty-app.firebasestorage.app",messagingSenderId:"285281834576",appId:"1:285281834576:web:b02bf5636bead00effa355",measurementId:"G-Y9JX43E2RN"},Md=Xg(fR);SI(Md);const fv=tC(Md);uR(Md);function pR({onGetStarted:r,onCaregiverLogin:e}){const{t}=wi(),[s,o]=ae.useState(""),[l,u]=ae.useState(""),[h,p]=ae.useState(!1),[m,v]=ae.useState(""),[_,x]=ae.useState(!1),R=async T=>{T.preventDefault(),v(""),x(!0);try{await $E(fv,s.trim(),l),r()}catch(L){console.error("Login failed:",L),v("Email or password is incorrect.")}finally{x(!1)}};return y.jsx("div",{className:"h-full bg-gray-50 overflow-y-auto",children:y.jsx("div",{className:"min-h-full flex items-center justify-center p-8",children:y.jsxs("div",{className:"w-full max-w-md bg-white rounded-3xl p-8 shadow-lg",children:[y.jsxs("div",{className:"flex items-center gap-3 mb-8",children:[y.jsx("div",{className:"w-14 h-14 border-2 border-gray-800 rounded-2xl flex items-center justify-center",children:y.jsx(Qw,{className:"w-7 h-7 text-gray-800"})}),y.jsxs("div",{children:[y.jsx("h2",{className:"text-2xl font-bold",children:t("careConnect")}),y.jsx("p",{className:"text-sm text-gray-600",children:t("mobile")})]})]}),y.jsx("h1",{className:"text-5xl font-bold text-center mb-8",children:t("welcomeBack")}),y.jsxs("form",{onSubmit:R,className:"space-y-6",children:[y.jsxs("div",{children:[y.jsx("label",{className:"text-xl font-bold text-gray-900 mb-3 block",children:t("email")}),y.jsxs("div",{className:"relative",children:[y.jsx(rS,{className:"absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"}),y.jsx("input",{type:"email",value:s,onChange:T=>o(T.target.value),placeholder:t("enterEmail"),required:!0,className:"w-full bg-gray-50 border border-gray-200 rounded-2xl py-5 pl-14 pr-5 text-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"})]})]}),y.jsxs("div",{children:[y.jsx("label",{className:"text-xl font-bold text-gray-900 mb-3 block",children:t("password")}),y.jsxs("div",{className:"relative",children:[y.jsx(Bp,{className:"absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"}),y.jsx("input",{type:h?"text":"password",value:l,onChange:T=>u(T.target.value),placeholder:t("enterPassword"),required:!0,className:"w-full bg-gray-50 border border-gray-200 rounded-2xl py-5 pl-14 pr-14 text-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"}),y.jsx("button",{type:"button",onClick:()=>p(!h),className:"absolute right-4 top-1/2 -translate-y-1/2 text-gray-400",children:y.jsx(qw,{className:"w-6 h-6"})})]})]}),m&&y.jsx("p",{className:"text-lg font-bold text-red-600",children:m}),y.jsxs("button",{type:"submit",disabled:_,className:"w-full bg-green-700 text-white py-5 rounded-2xl text-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-transform disabled:bg-gray-400 disabled:active:scale-100",children:[y.jsx(Bp,{className:"w-6 h-6"}),_?"Logging in...":t("logIn")]}),y.jsx("button",{type:"button",className:"w-full text-gray-700 text-xl font-bold underline",children:t("forgotPassword")})]}),y.jsxs("div",{className:"flex items-center gap-4 my-8",children:[y.jsx("div",{className:"flex-1 h-px bg-gray-200"}),y.jsx("span",{className:"text-gray-500 font-bold text-lg",children:t("or")}),y.jsx("div",{className:"flex-1 h-px bg-gray-200"})]}),y.jsxs("button",{type:"button",onClick:e,className:"w-full bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center gap-4 active:bg-green-100 transition-colors",children:[y.jsxs("div",{className:"flex-1 text-left",children:[y.jsx("h3",{className:"text-xl font-bold text-gray-900",children:t("caregiverLogin")}),y.jsx("p",{className:"text-base text-gray-600",children:t("caregiverDesc")})]}),y.jsx(Rg,{className:"w-6 h-6 text-gray-400 flex-shrink-0"})]})]})})})}function mR({onContinue:r}){const{t:e,i18n:t}=wi(),[s,o]=ae.useState("en"),l=[{id:"en",name:e("english")},{id:"ms",name:e("malay")},{id:"zh",name:e("chinese")},{id:"ta",name:e("tamil")}],u=h=>{o(h),t.changeLanguage(h)};return y.jsxs("div",{className:"h-full bg-gray-50 flex flex-col p-8",children:[y.jsxs("div",{className:"flex-1",children:[y.jsx("h1",{className:"text-5xl font-bold text-green-700 mb-12",children:e("selectLanguage")}),y.jsx("div",{className:"space-y-4",children:l.map((h,p)=>y.jsxs("button",{onClick:()=>u(h.id),className:`w-full bg-white rounded-2xl p-6 flex items-center gap-5 transition-all ${s===h.id?"ring-2 ring-green-600":"ring-1 ring-gray-200"}`,children:[y.jsxs("span",{className:"text-2xl font-bold text-gray-600 w-8",children:[p+1,"."]}),y.jsx("span",{className:"flex-1 text-left text-2xl font-bold text-gray-900",children:h.name}),s===h.id&&y.jsx("div",{className:"w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0",children:y.jsx(Ow,{className:"w-6 h-6 text-white",strokeWidth:3})})]},h.id))})]}),y.jsxs("button",{onClick:r,className:"w-full bg-green-700 text-white py-6 rounded-full text-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-transform",children:[e("continue"),y.jsx(Iw,{className:"w-7 h-7"})]})]})}const gR="/assets/image-2-Cz1ZQkun.png",vu={pad21740:"M12.188 2.031C6.579 2.031 2.031 6.579 2.031 12.188c0 5.608 4.548 10.156 10.157 10.156 5.608 0 10.156-4.548 10.156-10.156C22.344 6.579 17.796 2.031 12.188 2.031Zm0 2.032a8.105 8.105 0 0 1 8.125 8.125 8.105 8.105 0 0 1-8.125 8.125 8.105 8.105 0 0 1-8.126-8.125 8.105 8.105 0 0 1 8.126-8.126Zm3.53 4.198-4.546 4.545-2.03-2.03-1.438 1.437 3.468 3.468 5.983-5.983-1.437-1.437Z",p22515f80:"M24.375 4.063c-11.22 0-20.313 9.093-20.313 20.312s9.094 20.313 20.313 20.313 20.313-9.094 20.313-20.313S35.594 4.062 24.375 4.062Zm9.698 16.445L22.202 32.379l-6.617-6.617 2.872-2.872 3.745 3.745 8.999-8.999 2.872 2.872Z",p1eb81b40:"M7.5 0C5.843 0 4.5 1.343 4.5 3v6c0 1.657 1.343 3 3 3s3-1.343 3-3V3c0-1.657-1.343-3-3-3Zm-6 8.25a.75.75 0 0 1 1.5 0V9c0 2.486 2.014 4.5 4.5 4.5S12 11.486 12 9v-.75a.75.75 0 0 1 1.5 0V9a6.001 6.001 0 0 1-5.25 5.953V18h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-3.047A6.001 6.001 0 0 1 1.5 9v-.75Z"};function Cg({onSOSClick:r,onCheckIn:e}){const{t}=wi();return y.jsxs("div",{className:"bg-white content-stretch flex flex-col items-start relative size-full overflow-y-auto",children:[y.jsx("div",{className:"bg-[#fbf9f8] relative shrink-0 w-full",children:y.jsx("div",{className:"flex flex-row items-center size-full",children:y.jsxs("div",{className:"content-stretch flex items-center justify-between px-[24px] py-[8px] relative size-full",children:[y.jsx("div",{className:"content-stretch flex items-center justify-center relative shrink-0 size-[40px]",children:y.jsx("div",{className:"relative shrink-0 size-[24.375px]",children:y.jsx("svg",{className:"absolute block inset-0 size-full",fill:"none",preserveAspectRatio:"none",viewBox:"0 0 24.375 24.375",children:y.jsx("g",{id:"Container",children:y.jsx("path",{d:vu.pad21740,fill:"var(--fill-0, #316342)",id:"Symbol"})})})})}),y.jsx("div",{className:"content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative",children:y.jsx("div",{className:"flex flex-col font-['Lexend:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#316342] text-[50px] text-center whitespace-nowrap",children:y.jsx("p",{className:"leading-[50px]",children:t("home")})})}),y.jsxs("div",{className:"bg-[#dcd9d9] relative rounded-[9999px] shrink-0 size-[48px]",children:[y.jsx("div",{className:"content-stretch flex flex-col items-start justify-center overflow-clip p-[2px] relative rounded-[inherit] size-full",children:y.jsx("div",{className:"flex-[1_0_0] min-h-px relative w-full",children:y.jsx("div",{className:"absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none",children:y.jsx("img",{alt:"",className:"absolute left-0 max-w-none size-full top-0 object-cover",src:gR})})})}),y.jsx("div",{"aria-hidden":"true",className:"absolute border-2 border-[#f0eded] border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"})]})]})})}),y.jsx("div",{className:"relative flex-1 w-full",children:y.jsx("div",{className:"flex flex-col items-center size-full",children:y.jsxs("div",{className:"content-stretch flex flex-col items-center px-[24px] pb-[16px] relative size-full",children:[y.jsx("div",{className:"content-stretch flex flex-col items-start pb-[18px] pt-[12px] relative shrink-0 w-full",children:y.jsxs("div",{className:"content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full",children:[y.jsx("div",{className:"content-stretch flex flex-col items-center relative shrink-0 w-full",children:y.jsx("div",{className:"flex flex-col font-['Lexend:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#1b1c1c] text-[32px] text-center tracking-[-0.8px] whitespace-nowrap",children:y.jsx("p",{className:"leading-[42px]",children:t("dailyCheckIn")})})}),y.jsx("div",{className:"content-stretch flex flex-col items-center relative shrink-0 w-full",children:y.jsx("div",{className:"flex flex-col font-['Lexend:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#414942] text-[20px] text-center whitespace-nowrap",children:y.jsx("p",{className:"leading-[30px]",children:t("howAreYouToday")})})})]})}),y.jsx("div",{className:"content-stretch flex flex-col items-start pb-[24px] relative shrink-0 w-full",children:y.jsxs("button",{onClick:e,className:"bg-[#4a7c59] content-stretch flex flex-col items-center justify-center py-[32px] relative rounded-[32px] shrink-0 w-full active:scale-95 transition-transform",children:[y.jsx("div",{className:"absolute bg-[rgba(255,255,255,0)] inset-[0_0_-0.25px_0] rounded-[32px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"}),y.jsx("div",{className:"content-stretch flex flex-col items-start pb-[12px] relative shrink-0",children:y.jsx("div",{className:"relative shrink-0 size-[48.75px]",children:y.jsx("svg",{className:"absolute block inset-0 size-full",fill:"none",preserveAspectRatio:"none",viewBox:"0 0 48.75 48.75",children:y.jsx("g",{id:"Container",opacity:"0.9",children:y.jsx("path",{d:vu.p22515f80,fill:"var(--fill-0, #E1FFE5)",id:"Symbol"})})})})}),y.jsx("div",{className:"content-stretch flex flex-col items-center relative shrink-0",children:y.jsx("div",{className:"flex flex-col font-['Lexend:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#e1ffe5] text-[40px] text-center tracking-[1px] whitespace-nowrap",children:y.jsx("p",{className:"leading-[60px]",children:t("iAmOk")})})})]})}),y.jsx("div",{className:"content-stretch flex flex-col items-start relative shrink-0 w-full",children:y.jsxs("div",{className:"content-stretch flex items-center justify-center relative shrink-0 w-full",children:[y.jsxs("button",{onClick:r,className:"bg-[#ba1a1a] content-stretch flex flex-col items-center justify-center relative rounded-[9999px] shrink-0 size-[min(72vw,292px)] active:scale-95 transition-transform",children:[y.jsx("div",{className:"-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(255,255,255,0)] left-1/2 rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-full top-1/2"}),y.jsx("div",{className:"content-stretch flex flex-col h-[120px] items-start pb-[8px] relative shrink-0 w-[112px]",children:y.jsxs("div",{className:"relative shrink-0 size-[112px]",children:[y.jsx("div",{className:"absolute bg-white bottom-0 h-[16px] left-0 right-0 rounded-[6px]"}),y.jsx("div",{className:"-translate-x-1/2 absolute bg-white bottom-[16px] h-[40px] left-1/2 rounded-tl-[9999px] rounded-tr-[9999px] w-[48px]"}),y.jsx("div",{className:"-translate-x-1/2 absolute bg-white h-[16px] left-1/2 rounded-[9999px] top-[8px] w-[8px]"}),y.jsx("div",{className:"absolute flex items-center justify-center left-[7.51px] size-[16.971px] top-[11.51px]",children:y.jsx("div",{className:"flex-none rotate-45",children:y.jsx("div",{className:"bg-white h-[8px] relative rounded-[9999px] w-[16px]"})})}),y.jsx("div",{className:"absolute flex items-center justify-center right-[7.52px] size-[16.971px] top-[11.52px]",children:y.jsx("div",{className:"-rotate-45 flex-none",children:y.jsx("div",{className:"bg-white h-[8px] relative rounded-[9999px] w-[16px]"})})})]})}),y.jsx("div",{className:"content-stretch flex flex-col items-start pt-[8px] relative shrink-0",children:y.jsx("div",{className:"content-stretch drop-shadow-[0px_2px_1px_rgba(0,0,0,0.06),0px_4px_1.5px_rgba(0,0,0,0.07)] flex flex-col items-center relative shrink-0",children:y.jsx("div",{className:"flex flex-col font-['Lexend:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[52px] text-center text-white tracking-[5.2px] whitespace-nowrap",children:y.jsx("p",{className:"leading-[78px]",children:t("sosButton")})})})})]}),y.jsxs("button",{className:"absolute bg-white bottom-0 content-stretch flex items-center justify-center p-px right-[-8px] rounded-[9999px] size-[56px] active:scale-95 transition-transform",children:[y.jsx("div",{"aria-hidden":"true",className:"absolute border border-[#f0eded] border-solid inset-0 pointer-events-none rounded-[9999px]"}),y.jsx("div",{className:"absolute bg-[rgba(255,255,255,0)] bottom-0 right-0 rounded-[9999px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] size-[56px]"}),y.jsx("div",{className:"h-[21.75px] relative shrink-0 w-[15px]",children:y.jsx("svg",{className:"absolute block inset-0 size-full",fill:"none",preserveAspectRatio:"none",viewBox:"0 0 15 21.75",children:y.jsx("g",{id:"Container",children:y.jsx("path",{d:vu.p1eb81b40,fill:"var(--fill-0, #944A00)",id:"Symbol"})})})})]})]})})]})})})]})}const wu={p256e1340:"M10 1.667a8.333 8.333 0 1 0 0 16.666 8.333 8.333 0 0 0 0-16.666Zm.833 4.166a.833.833 0 0 0-1.666 0V10c0 .221.088.433.244.589l2.5 2.5a.833.833 0 1 0 1.178-1.178l-2.256-2.255V5.833Z",p8d35f80:"M1.333 0 19 8 1.333 16V9.778L12.333 8 1.333 6.222V0Z",p28843fc0:"M10 8.586 14.95 3.636a1 1 0 1 1 1.414 1.414L11.414 10l4.95 4.95a1 1 0 0 1-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 0 1-1.414-1.414L8.586 10l-4.95-4.95A1 1 0 0 1 5.05 3.636L10 8.586Z"};function yR({onConfirm:r,onCancel:e}){const{t}=wi(),[s,o]=ae.useState(15);return ae.useEffect(()=>{if(s>0){const l=setTimeout(()=>o(s-1),1e3);return()=>clearTimeout(l)}e()},[s,e]),y.jsx("div",{className:"content-stretch flex flex-col items-start pb-[80px] pt-[56px] relative size-full overflow-y-auto",style:{backgroundImage:"linear-gradient(90deg, rgb(251, 249, 248) 0%, rgb(251, 249, 248) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)"},children:y.jsx("div",{className:"relative shrink-0 w-full",children:y.jsx("div",{className:"flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full",children:y.jsxs("div",{className:"content-stretch flex flex-col items-center justify-center px-[24px] py-[32px] relative size-full",children:[y.jsx("div",{className:"absolute bg-[#ffdad6] inset-0 opacity-20"}),y.jsx("div",{className:"content-stretch flex flex-col items-start pb-[32px] relative shrink-0",children:y.jsxs("div",{className:"content-stretch flex items-center justify-center relative shrink-0",children:[y.jsx("div",{className:"absolute bg-[#ba1a1a] left-[-16px] rounded-[9999px] size-[192px] top-[-16px] animate-ping"}),y.jsx("div",{className:"absolute bg-[#ba1a1a] left-[-16px] rounded-[9999px] size-[192px] top-[-16px]"}),y.jsxs("div",{className:"bg-[#ba1a1a] content-stretch flex items-center justify-center p-[4px] relative rounded-[9999px] shrink-0 size-[160px]",children:[y.jsx("div",{"aria-hidden":"true",className:"absolute border-4 border-[#fbf9f8] border-solid inset-0 pointer-events-none rounded-[9999px]"}),y.jsx("div",{className:"-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(255,255,255,0)] left-1/2 rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[160px] top-1/2"}),y.jsx("div",{className:"bg-white min-w-[88px] px-5 py-2 relative rounded-[12px] shrink-0",children:y.jsx("span",{className:"block font-['Lexend:SemiBold',sans-serif] font-semibold text-[#ba1a1a] text-[34px] leading-[40px] tracking-[6px] text-center",children:"SOS"})})]})]})}),y.jsx("div",{className:"content-stretch flex flex-col items-start pb-[32px] relative shrink-0",children:y.jsxs("div",{className:"content-stretch flex flex-col gap-[8px] items-center relative shrink-0",children:[y.jsx("div",{className:"content-stretch flex flex-col items-center relative shrink-0 w-full",children:y.jsxs("div",{className:"flex flex-col font-['Lexend:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#1b1c1c] text-[32px] text-center",children:[y.jsx("p",{className:"leading-[42px] mb-0",children:t("didYouMeanToSendSOS1")}),y.jsx("p",{className:"leading-[42px]",children:t("didYouMeanToSendSOS2")})]})}),y.jsx("div",{className:"content-stretch flex flex-col items-center max-w-[300px] relative shrink-0 w-[300px]",children:y.jsxs("div",{className:"flex flex-col font-['Lexend:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#414942] text-[20px] text-center",children:[y.jsx("p",{className:"leading-[30px] mb-0",children:t("alertContactsLine1")}),y.jsx("p",{className:"leading-[30px]",children:t("alertContactsLine2")})]})})]})}),y.jsx("div",{className:"content-stretch flex flex-col items-start max-w-[384px] pb-[32px] relative shrink-0 w-full",children:y.jsx("div",{className:"bg-[#f0eded] max-w-[384px] relative rounded-[32px] shrink-0 w-full",children:y.jsx("div",{className:"flex flex-row items-center justify-center max-w-[inherit] size-full",children:y.jsxs("div",{className:"content-stretch flex gap-[8px] items-center justify-center max-w-[inherit] p-[8px] relative size-full",children:[y.jsx("div",{className:"relative shrink-0 size-[20px]",children:y.jsx("svg",{className:"absolute block inset-0 size-full",fill:"none",preserveAspectRatio:"none",viewBox:"0 0 20 20",children:y.jsx("g",{id:"Container",children:y.jsx("path",{d:wu.p256e1340,fill:"#414942",id:"Icon"})})})}),y.jsx("div",{className:"content-stretch flex flex-col items-start relative shrink-0",children:y.jsx("div",{className:"flex flex-col font-['Lexend:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#1b1c1c] text-[20px] tracking-[0.4px] whitespace-nowrap",children:y.jsxs("p",{className:"leading-[24px]",children:[t("autoCancelIn")," ",s," ",t("seconds")]})})})]})})})}),y.jsx("div",{className:"content-stretch flex flex-col h-[203px] items-start justify-center max-w-[384px] min-h-[128px] pt-[75px] relative shrink-0 w-full",children:y.jsxs("div",{className:"content-stretch flex flex-col gap-[16px] items-start max-w-[384px] relative shrink-0 w-full",children:[y.jsxs("button",{onClick:r,className:"bg-[#ba1a1a] content-stretch drop-shadow-[0px_8px_10px_rgba(186,26,26,0.15)] flex gap-[7.99px] items-center justify-center min-h-[56px] pb-[16px] pt-[15.5px] relative rounded-[9999px] shrink-0 w-full active:scale-95 transition-transform",children:[y.jsx("div",{className:"h-[16px] relative shrink-0 w-[19px]",children:y.jsx("svg",{className:"absolute block inset-0 size-full",fill:"none",preserveAspectRatio:"none",viewBox:"0 0 19 16",children:y.jsx("g",{id:"Container",children:y.jsx("path",{d:wu.p8d35f80,fill:"white",id:"Icon"})})})}),y.jsx("div",{className:"flex flex-col font-['Lexend:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[20px] text-center text-white tracking-[0.4px] whitespace-nowrap",children:y.jsx("p",{className:"leading-[24px]",children:t("yesSendSOS")})})]}),y.jsxs("button",{onClick:e,className:"bg-[#fbf9f8] content-stretch flex gap-[8px] items-center justify-center min-h-[56px] pb-[16px] pt-[15.5px] px-[2px] relative rounded-[9999px] shrink-0 w-full active:scale-95 transition-transform",children:[y.jsx("div",{"aria-hidden":"true",className:"absolute border-2 border-[#c1c9bf] border-solid inset-0 pointer-events-none rounded-[9999px]"}),y.jsx("div",{className:"relative shrink-0 size-[20px]",children:y.jsx("svg",{className:"absolute block inset-0 size-full",fill:"none",preserveAspectRatio:"none",viewBox:"0 0 20 20",children:y.jsx("g",{id:"Container",children:y.jsx("path",{d:wu.p28843fc0,fill:"#1B1C1C",id:"Icon"})})})}),y.jsx("div",{className:"flex flex-col font-['Lexend:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#1b1c1c] text-[20px] text-center tracking-[0.4px] whitespace-nowrap",children:y.jsx("p",{className:"leading-[24px]",children:t("cancelSOS")})})]})]})})]})})})})}function _R({onLogout:r}){const{t:e}=wi();return y.jsxs("div",{className:"h-full bg-gray-50 overflow-y-auto",children:[y.jsxs("div",{className:"bg-gradient-to-br from-green-400 to-green-600 px-8 pt-16 pb-10 text-white",children:[y.jsxs("div",{className:"flex items-center gap-6 mb-6",children:[y.jsx("div",{className:"w-28 h-28 bg-white rounded-full flex items-center justify-center text-6xl",children:"👤"}),y.jsxs("div",{children:[y.jsx("h2",{className:"text-4xl font-bold",children:"John Tan"}),y.jsx("p",{className:"text-green-100 text-xl mt-1",children:"john.tan@email.com"})]})]}),y.jsx("button",{className:"mt-6 bg-white/20 backdrop-blur px-8 py-4 rounded-full text-xl font-bold active:bg-white/30 transition-colors",children:e("editProfile")})]}),y.jsxs("div",{className:"p-8 space-y-6",children:[y.jsxs("div",{className:"bg-white rounded-2xl overflow-hidden shadow-sm",children:[y.jsx(ws,{icon:y.jsx(ma,{className:"w-8 h-8"}),title:e("personalInfo")}),y.jsx(ws,{icon:y.jsx(Ps,{className:"w-8 h-8"}),title:e("notifications")}),y.jsx(ws,{icon:y.jsx(uS,{className:"w-8 h-8"}),title:e("privacySecurity")})]}),y.jsxs("div",{className:"bg-white rounded-2xl overflow-hidden shadow-sm",children:[y.jsx(ws,{icon:y.jsx(Bw,{className:"w-8 h-8"}),title:e("helpSupport")}),y.jsx(ws,{icon:y.jsx(tS,{className:"w-8 h-8"}),title:e("logOut"),textColor:"text-red-500",onClick:r})]})]})]})}function ws({icon:r,title:e,textColor:t="text-gray-900",onClick:s}){return y.jsxs("button",{onClick:s,className:"w-full px-8 py-6 flex items-center gap-6 active:bg-gray-50 transition-colors border-b last:border-b-0 border-gray-100",children:[y.jsx("div",{className:"text-gray-600",children:r}),y.jsx("span",{className:`flex-1 text-left text-2xl font-bold ${t}`,children:e}),y.jsx(Rg,{className:"w-8 h-8 text-gray-400"})]})}function vR(){return y.jsxs("div",{className:"h-full overflow-y-auto bg-[#fbf9f8] text-[#1b1c1c]",children:[y.jsx("header",{className:"sticky top-0 z-10 bg-[#fbf9f8] shadow-sm",children:y.jsxs("div",{className:"flex h-16 items-center justify-between px-6",children:[y.jsxs("div",{className:"flex items-center gap-2 text-[#316342]",children:[y.jsx(ma,{className:"h-7 w-7 fill-current"}),y.jsx("span",{className:"text-2xl font-bold",children:"CareConnect"})]}),y.jsx("button",{"aria-label":"Notifications",className:"flex h-12 w-12 items-center justify-center rounded-full text-[#414942] transition-colors active:scale-95 active:bg-[#e4e2e1]",children:y.jsx(Ps,{className:"h-7 w-7"})})]})}),y.jsxs("main",{className:"flex flex-col gap-8 px-6 py-8",children:[y.jsxs("section",{className:"flex flex-col items-center rounded-[32px] bg-[#f6f3f2] p-6 text-center shadow-[0_8px_20px_rgba(49,99,66,0.08)]",children:[y.jsx("div",{className:"mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-[#ff9742] text-[#6c3400]",children:y.jsx(ma,{className:"h-16 w-16 fill-current"})}),y.jsxs("div",{className:"mb-2 flex items-center justify-center gap-2",children:[y.jsx(pS,{className:"h-10 w-10 fill-[#ff9742] text-[#ff9742]"}),y.jsx("h1",{className:"text-[40px] font-bold leading-[52px] text-[#316342]",children:"120 Points"})]}),y.jsx("p",{className:"text-lg leading-7 text-[#414942]",children:"Great job! Keep staying active to earn more."})]}),y.jsxs("section",{className:"flex items-center justify-between rounded-[32px] bg-[#4a7c59] p-6 shadow-[0_8px_20px_rgba(49,99,66,0.08)]",children:[y.jsxs("div",{className:"flex items-center gap-4 text-[#e1ffe5]",children:[y.jsx(Rw,{className:"h-9 w-9 fill-current"}),y.jsxs("div",{children:[y.jsx("h2",{className:"text-xl font-semibold leading-6",children:"Daily Check-in"}),y.jsx("p",{className:"text-lg leading-7 opacity-90",children:"Log in today"})]})]}),y.jsx("div",{className:"rounded-full bg-[#e1ffe5] px-4 py-2 text-xl font-semibold text-[#4a7c59] shadow-sm",children:"+10"})]}),y.jsxs("section",{children:[y.jsx("h2",{className:"mb-4 text-2xl font-semibold leading-8 text-[#1b1c1c]",children:"Redeem Rewards"}),y.jsxs("div",{className:"flex flex-col gap-4",children:[y.jsx(Ig,{icon:y.jsx(hS,{className:"h-8 w-8"}),title:"$5 NTUC Voucher",points:"50 Points"}),y.jsx(Ig,{icon:y.jsx(bw,{className:"h-8 w-8"}),title:"$10 Grab Voucher",points:"100 Points"})]})]})]})]})}function Ig({icon:r,title:e,points:t}){return y.jsxs("div",{className:"flex items-center rounded-[32px] bg-[#f0eded] p-4 shadow-[0_8px_20px_rgba(49,99,66,0.08)]",children:[y.jsx("div",{className:"mr-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-[#fbf9f8] text-[#316342]",children:r}),y.jsxs("div",{className:"min-w-0 flex-1",children:[y.jsx("h3",{className:"text-xl font-semibold leading-6 text-[#1b1c1c]",children:e}),y.jsx("p",{className:"mt-1 text-base font-bold leading-5 text-[#316342]",children:t})]}),y.jsx("button",{className:"rounded-full bg-[#316342] px-5 py-3 text-base font-semibold leading-5 text-white shadow-sm transition-transform active:scale-95",children:"REDEEM"})]})}function wR(){const[r,e]=ae.useState(!1);return y.jsxs("div",{className:"h-full overflow-y-auto bg-[#fafafa] px-6 pb-8 pt-8 text-gray-900",children:[y.jsxs("header",{className:"mb-8 flex items-start justify-between",children:[y.jsxs("div",{children:[y.jsx("h1",{className:"mb-1 text-[26px] font-bold leading-tight tracking-tight",children:"Medication Reminder"}),y.jsx("p",{className:"text-[15px] font-medium text-gray-500",children:"Never miss a dose."})]}),y.jsxs("button",{"aria-label":"Notifications",className:"relative mt-1 rounded-full p-2 text-[#ff4400] transition-colors active:scale-95 active:bg-[#fff0ea]",children:[y.jsx(Ps,{className:"h-7 w-7"}),y.jsx("span",{className:"absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#ff4400]"})]})]}),y.jsxs("section",{className:"mb-8 rounded-[24px] border border-gray-100 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]",children:[y.jsxs("div",{className:"mb-5 flex items-center justify-between",children:[y.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Next dose"}),y.jsxs("div",{className:"flex items-center gap-1.5 rounded-full bg-[#e8f5e9] px-3 py-1.5",children:[y.jsx(zw,{className:"h-4 w-4 text-[#2e8b57]"}),y.jsx("span",{className:"text-sm font-medium text-[#2e8b57]",children:r?"Taken":"On time"})]})]}),y.jsxs("div",{className:"flex items-center gap-5",children:[y.jsxs("div",{className:"relative flex h-24 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-50",children:[y.jsxs("div",{className:"relative flex h-16 w-12 flex-col rounded-b-md rounded-t-lg border border-gray-200 bg-white shadow-sm",children:[y.jsx("div",{className:"h-4 w-full rounded-t-lg bg-gray-200"}),y.jsx("div",{className:"mt-1 flex flex-1 items-center justify-center bg-[#ff4400]",children:y.jsx(Pg,{className:"h-5 w-5 text-white"})})]}),y.jsx("div",{className:"absolute bottom-4 right-4 h-6 w-6 rounded-full border border-gray-200 bg-white shadow"}),y.jsx("div",{className:"absolute bottom-2 right-2 h-6 w-6 rounded-full border border-gray-200 bg-white shadow"})]}),y.jsxs("div",{className:"min-w-0 flex-1",children:[y.jsx("h3",{className:"mb-1 text-[20px] font-bold leading-tight text-gray-900",children:"Atorvastatin 20mg"}),y.jsx("p",{className:"mb-3 text-[14px] font-medium text-gray-500",children:"1 tablet - Once daily"}),y.jsxs("div",{className:"flex items-center gap-2",children:[y.jsx(Kw,{className:"h-5 w-5 text-[#ff4400]"}),y.jsx("span",{className:"text-[18px] font-bold tracking-tight text-[#ff4400]",children:"5:45 PM"})]})]})]})]}),y.jsxs("section",{className:"space-y-4",children:[y.jsxs("button",{className:"flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ff4400] py-4 text-[17px] font-semibold text-white shadow-sm transition-colors active:scale-95 active:bg-orange-600",children:[y.jsx(Ps,{className:"h-5 w-5"}),y.jsx("span",{children:"Snooze 15 minutes"})]}),y.jsx("button",{onClick:()=>e(!0),className:"w-full rounded-2xl border border-[#ff4400] bg-white py-4 text-[17px] font-semibold text-[#ff4400] shadow-sm transition-colors active:scale-95 active:bg-orange-50",children:"I've taken this dose"})]})]})}function SR({onBack:r}){const[e,t]=ae.useState(""),[s,o]=ae.useState(""),[l,u]=ae.useState(""),[h,p]=ae.useState(!1),[m,v]=ae.useState(""),[_,x]=ae.useState(""),R=T=>{T.preventDefault();const L=e.trim().length>0||s.trim().length>0,U=l.trim().length>0;v(L?"":"Please enter either senior name or phone number."),x(U?"":"Please select your relationship."),!(!L||!U)&&alert("Caregiver registration completed.")};return y.jsxs("div",{className:"h-full bg-[#fbf9f8] text-[#1b1c1c] overflow-y-auto",children:[y.jsxs("header",{className:"sticky top-0 z-10 bg-[#fbf9f8] shadow-sm flex items-center justify-between px-6 h-16",children:[y.jsx("button",{type:"button",onClick:r,className:"flex items-center justify-center w-14 h-14 text-[#174b2c] active:scale-95 transition-transform","aria-label":"Back",children:y.jsx(kw,{className:"w-7 h-7"})}),y.jsx("h1",{className:"text-2xl font-bold text-[#174b2c]",children:"Care Portal"}),y.jsx("button",{type:"button",className:"flex items-center justify-center w-14 h-14 text-[#414942] active:scale-95 transition-transform","aria-label":"Notifications",children:y.jsx(Ps,{className:"w-7 h-7"})})]}),y.jsxs("form",{onSubmit:R,className:"px-6 pt-8 pb-12 flex flex-col gap-8",children:[y.jsxs("section",{className:"flex flex-col gap-4",children:[y.jsx(Su,{title:"Find Your Senior"}),y.jsx("p",{className:"text-lg leading-7 text-[#414942]",children:"Search for the senior you want to connect with."}),y.jsx(Tg,{icon:y.jsx(lS,{className:"w-7 h-7"}),label:"Search by Name",placeholder:"Search by name",value:e,onChange:T=>{t(T),(T.trim()||s.trim())&&v("")}}),y.jsxs("div",{className:"flex items-center gap-4 py-1",children:[y.jsx("div",{className:"flex-1 h-px bg-[#c1c9bf]"}),y.jsx("span",{className:"text-base font-medium text-[#717971] italic",children:"or"}),y.jsx("div",{className:"flex-1 h-px bg-[#c1c9bf]"})]}),y.jsx(Tg,{icon:y.jsx(sS,{className:"w-7 h-7"}),label:"Search by Phone Number",placeholder:"Enter senior's phone number",type:"tel",value:s,onChange:T=>{o(T),(e.trim()||T.trim())&&v("")}}),m&&y.jsx("p",{className:"text-base font-semibold text-[#ba1a1a] ml-2",children:m})]}),y.jsxs("section",{className:"flex flex-col gap-4",children:[y.jsx(Su,{title:"Your Relationship"}),y.jsxs("label",{className:"flex flex-col gap-2",children:[y.jsx("span",{className:"text-base font-semibold text-[#1b1c1c] ml-2",children:"Select Relationship"}),y.jsxs("div",{className:"relative flex items-center bg-[#f5f3f3] rounded-2xl h-16 px-4 focus-within:ring-2 focus-within:ring-[#174b2c]",children:[y.jsx(vS,{className:"w-7 h-7 text-[#717971] mr-3"}),y.jsxs("select",{value:l,onChange:T=>{u(T.target.value),T.target.value&&x("")},className:`appearance-none bg-transparent border-none outline-none w-full text-xl focus:ring-0 ${l?"text-[#1b1c1c]":"text-[#9ca39c]"}`,children:[y.jsx("option",{value:"",children:"Select relationship"}),y.jsx("option",{children:"Next-of-Kin"}),y.jsx("option",{children:"Family Member"}),y.jsx("option",{children:"Caregiver"}),y.jsx("option",{children:"Helper"})]}),y.jsx(Dw,{className:"w-7 h-7 text-[#717971] pointer-events-none"})]}),_&&y.jsx("span",{className:"text-base font-semibold text-[#ba1a1a] ml-2",children:_})]})]}),y.jsxs("section",{className:"flex flex-col gap-4",children:[y.jsx(Su,{title:"Confirmation"}),y.jsxs("label",{className:"bg-white p-6 rounded-2xl shadow-sm border border-[#c1c9bf]/50 flex gap-4 active:scale-[0.99] transition-transform cursor-pointer",children:[y.jsx("input",{type:"checkbox",className:"sr-only",checked:h,onChange:T=>p(T.target.checked)}),h?y.jsx(Fw,{className:"w-8 h-8 text-[#174b2c] fill-[#174b2c] flex-shrink-0"}):y.jsx(Hw,{className:"w-8 h-8 text-[#717971] flex-shrink-0"}),y.jsxs("span",{className:"text-base font-medium text-[#414942] leading-7",children:["I confirm that I have the legal authority to register this senior and agree to CareConnect's ",y.jsx("span",{className:"text-[#174b2c] font-bold underline",children:"Privacy Policy"})," ","and ",y.jsx("span",{className:"text-[#174b2c] font-bold underline",children:"Terms of Service"}),"."]})]})]}),y.jsx("button",{type:"submit",disabled:!h,className:"w-full h-16 bg-[#174b2c] text-white rounded-full text-xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-md disabled:bg-[#9ca39c] disabled:shadow-none disabled:active:scale-100",children:"Complete"})]})]})}function Su({title:r}){return y.jsxs("div",{className:"flex items-center gap-3",children:[y.jsx("div",{className:"w-1 h-8 bg-[#fd8a2a] rounded-full"}),y.jsx("h2",{className:"text-2xl font-bold text-[#174b2c]",children:r})]})}function Tg({icon:r,label:e,placeholder:t,type:s="text",value:o,onChange:l}){return y.jsxs("label",{className:"flex flex-col gap-2",children:[y.jsx("span",{className:"text-base font-semibold text-[#1b1c1c] ml-2",children:e}),y.jsxs("div",{className:"relative flex items-center bg-[#f5f3f3] rounded-2xl h-16 px-4 focus-within:ring-2 focus-within:ring-[#174b2c]",children:[y.jsx("div",{className:"text-[#717971] mr-3",children:r}),y.jsx("input",{type:s,value:o,onChange:u=>l(u.target.value),placeholder:t,className:"bg-transparent border-none outline-none w-full text-xl placeholder:text-[#9ca39c] focus:ring-0"})]})]})}function xR(){const{t:r}=wi(),[e,t]=ae.useState("welcome"),[s,o]=ae.useState(!1),l=()=>{alert("Emergency contacts have been notified!"),o(!1)},u=async()=>{try{await HE(fv),t("welcome")}catch(p){console.error("Logout failed:",p),alert("Unable to log out. Please try again.")}},h=()=>{switch(e){case"welcome":return y.jsx(pR,{onGetStarted:()=>t("language"),onCaregiverLogin:()=>t("carePortal")});case"language":return y.jsx(mR,{onContinue:()=>t("home")});case"home":return y.jsx(Cg,{onSOSClick:()=>o(!0),onCheckIn:()=>t("points")});case"profile":return y.jsx(_R,{onLogout:u});case"points":return y.jsx(vR,{});case"medication":return y.jsx(wR,{});case"carePortal":return y.jsx(SR,{onBack:()=>t("welcome")});default:return y.jsx(Cg,{onSOSClick:()=>o(!0),onCheckIn:()=>t("points")})}};return y.jsx("div",{className:"size-full flex items-center justify-center bg-gray-100",children:y.jsxs("div",{className:"w-full max-w-md h-full bg-white shadow-2xl flex flex-col relative",children:[y.jsx("div",{className:"flex-1 overflow-hidden",children:h()}),e!=="welcome"&&e!=="language"&&e!=="carePortal"&&y.jsxs("nav",{className:"bg-white border-t-2 border-gray-200 px-2 py-3 flex justify-around items-center",children:[y.jsx(ca,{icon:y.jsx(Xw,{className:"w-9 h-9"}),label:r("home"),active:e==="home",onClick:()=>t("home")}),y.jsx(ca,{icon:y.jsx(Pg,{className:"w-9 h-9"}),label:r("meds"),active:e==="medication",onClick:()=>t("medication")}),y.jsx(ca,{icon:y.jsx(gS,{className:"w-9 h-9"}),label:r("points"),active:e==="points",onClick:()=>t("points")}),y.jsx(ca,{icon:y.jsx(ma,{className:"w-9 h-9"}),label:r("profile"),active:e==="profile",onClick:()=>t("profile")})]}),s&&y.jsx("div",{className:"absolute inset-0 z-50 bg-white",children:y.jsx(yR,{onConfirm:l,onCancel:()=>o(!1)})})]})})}function ca({icon:r,label:e,active:t,onClick:s}){return y.jsxs("button",{onClick:s,className:`flex flex-col items-center gap-2 py-3 px-2 rounded-lg transition-colors active:scale-95 ${t?"text-green-600":"text-gray-400"}`,children:[r,y.jsx("span",{className:"text-base font-bold",children:e})]})}_w.createRoot(document.getElementById("root")).render(y.jsx(xR,{}));
