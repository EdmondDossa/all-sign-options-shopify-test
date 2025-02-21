(()=>{var uR=Object.create;var qd=Object.defineProperty,lR=Object.defineProperties,oR=Object.getOwnPropertyDescriptor,sR=Object.getOwnPropertyDescriptors,cR=Object.getOwnPropertyNames,xs=Object.getOwnPropertySymbols,fR=Object.getPrototypeOf,Qd=Object.prototype.hasOwnProperty,Wh=Object.prototype.propertyIsEnumerable;var kh=(p,c,y)=>c in p?qd(p,c,{enumerable:!0,configurable:!0,writable:!0,value:y}):p[c]=y,Lr=(p,c)=>{for(var y in c||(c={}))Qd.call(c,y)&&kh(p,y,c[y]);if(xs)for(var y of xs(c))Wh.call(c,y)&&kh(p,y,c[y]);return p},Xh=(p,c)=>lR(p,sR(c));var Ds=(p,c)=>{var y={};for(var R in p)Qd.call(p,R)&&c.indexOf(R)<0&&(y[R]=p[R]);if(p!=null&&xs)for(var R of xs(p))c.indexOf(R)<0&&Wh.call(p,R)&&(y[R]=p[R]);return y};var Ei=(p,c)=>()=>(c||p((c={exports:{}}).exports,c),c.exports);var dR=(p,c,y,R)=>{if(c&&typeof c=="object"||typeof c=="function")for(let g of cR(c))!Qd.call(p,g)&&g!==y&&qd(p,g,{get:()=>c[g],enumerable:!(R=oR(c,g))||R.enumerable});return p};var _a=(p,c,y)=>(y=p!=null?uR(fR(p)):{},dR(c||!p||!p.__esModule?qd(y,"default",{value:p,enumerable:!0}):y,p));var Uu=(p,c,y)=>new Promise((R,g)=>{var z=j=>{try{V(y.next(j))}catch(h){g(h)}},_=j=>{try{V(y.throw(j))}catch(h){g(h)}},V=j=>j.done?R(j.value):Promise.resolve(j.value).then(z,_);V((y=y.apply(p,c)).next())});var iy=Ei((we,Ms)=>{"use strict";(function(){"use strict";typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!="undefined"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);var p="18.3.1",c=Symbol.for("react.element"),y=Symbol.for("react.portal"),R=Symbol.for("react.fragment"),g=Symbol.for("react.strict_mode"),z=Symbol.for("react.profiler"),_=Symbol.for("react.provider"),V=Symbol.for("react.context"),j=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),q=Symbol.for("react.suspense_list"),K=Symbol.for("react.memo"),ge=Symbol.for("react.lazy"),nt=Symbol.for("react.offscreen"),Ke=Symbol.iterator,qe="@@iterator";function ke(l){if(l===null||typeof l!="object")return null;var v=Ke&&l[Ke]||l[qe];return typeof v=="function"?v:null}var Ce={current:null},De={transition:null},ot={current:null,isBatchingLegacy:!1,didScheduleLegacyUpdate:!1},yt={current:null},xn={},Ue=null;function pe(l){Ue=l}xn.setExtraStackFrame=function(l){Ue=l},xn.getCurrentStack=null,xn.getStackAddendum=function(){var l="";Ue&&(l+=Ue);var v=xn.getCurrentStack;return v&&(l+=v()||""),l};var $t=!1,oe=!1,Me=!1,ne=!1,be=!1,xe={ReactCurrentDispatcher:Ce,ReactCurrentBatchConfig:De,ReactCurrentOwner:yt};xe.ReactDebugCurrentFrame=xn,xe.ReactCurrentActQueue=ot;function st(l){{for(var v=arguments.length,T=new Array(v>1?v-1:0),D=1;D<v;D++)T[D-1]=arguments[D];St("warn",l,T)}}function ue(l){{for(var v=arguments.length,T=new Array(v>1?v-1:0),D=1;D<v;D++)T[D-1]=arguments[D];St("error",l,T)}}function St(l,v,T){{var D=xe.ReactDebugCurrentFrame,w=D.getStackAddendum();w!==""&&(v+="%s",T=T.concat([w]));var ce=T.map(function($){return String($)});ce.unshift("Warning: "+v),Function.prototype.apply.call(console[l],console,ce)}}var ze={};function Et(l,v){{var T=l.constructor,D=T&&(T.displayName||T.name)||"ReactClass",w=D+"."+v;if(ze[w])return;ue("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",v,D),ze[w]=!0}}var je={isMounted:function(l){return!1},enqueueForceUpdate:function(l,v,T){Et(l,"forceUpdate")},enqueueReplaceState:function(l,v,T,D){Et(l,"replaceState")},enqueueSetState:function(l,v,T,D){Et(l,"setState")}},lt=Object.assign,Ae={};Object.freeze(Ae);function Tt(l,v,T){this.props=l,this.context=v,this.refs=Ae,this.updater=T||je}Tt.prototype.isReactComponent={},Tt.prototype.setState=function(l,v){if(typeof l!="object"&&typeof l!="function"&&l!=null)throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,l,v,"setState")},Tt.prototype.forceUpdate=function(l){this.updater.enqueueForceUpdate(this,l,"forceUpdate")};{var Ft={isMounted:["isMounted","Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],replaceState:["replaceState","Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]},Fn=function(l,v){Object.defineProperty(Tt.prototype,l,{get:function(){st("%s(...) is deprecated in plain JavaScript React classes. %s",v[0],v[1])}})};for(var gt in Ft)Ft.hasOwnProperty(gt)&&Fn(gt,Ft[gt])}function en(){}en.prototype=Tt.prototype;function at(l,v,T){this.props=l,this.context=v,this.refs=Ae,this.updater=T||je}var Bt=at.prototype=new en;Bt.constructor=at,lt(Bt,Tt.prototype),Bt.isPureReactComponent=!0;function Jn(){var l={current:null};return Object.seal(l),l}var Bn=Array.isArray;function sn(l){return Bn(l)}function cn(l){{var v=typeof Symbol=="function"&&Symbol.toStringTag,T=v&&l[Symbol.toStringTag]||l.constructor.name||"Object";return T}}function Vn(l){try{return Dn(l),!1}catch(v){return!0}}function Dn(l){return""+l}function Ut(l){if(Vn(l))return ue("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",cn(l)),Dn(l)}function tn(l,v,T){var D=l.displayName;if(D)return D;var w=v.displayName||v.name||"";return w!==""?T+"("+w+")":T}function _n(l){return l.displayName||"Context"}function bt(l){if(l==null)return null;if(typeof l.tag=="number"&&ue("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof l=="function")return l.displayName||l.name||null;if(typeof l=="string")return l;switch(l){case R:return"Fragment";case y:return"Portal";case z:return"Profiler";case g:return"StrictMode";case h:return"Suspense";case q:return"SuspenseList"}if(typeof l=="object")switch(l.$$typeof){case V:var v=l;return _n(v)+".Consumer";case _:var T=l;return _n(T._context)+".Provider";case j:return tn(l,l.render,"ForwardRef");case K:var D=l.displayName||null;return D!==null?D:bt(l.type)||"Memo";case ge:{var w=l,ce=w._payload,$=w._init;try{return bt($(ce))}catch(Re){return null}}}return null}var Mt=Object.prototype.hasOwnProperty,Zn={key:!0,ref:!0,__self:!0,__source:!0},wn,rt,On;On={};function Oa(l){if(Mt.call(l,"ref")){var v=Object.getOwnPropertyDescriptor(l,"ref").get;if(v&&v.isReactWarning)return!1}return l.ref!==void 0}function oa(l){if(Mt.call(l,"key")){var v=Object.getOwnPropertyDescriptor(l,"key").get;if(v&&v.isReactWarning)return!1}return l.key!==void 0}function sa(l,v){var T=function(){wn||(wn=!0,ue("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",v))};T.isReactWarning=!0,Object.defineProperty(l,"key",{get:T,configurable:!0})}function Nn(l,v){var T=function(){rt||(rt=!0,ue("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",v))};T.isReactWarning=!0,Object.defineProperty(l,"ref",{get:T,configurable:!0})}function Pa(l){if(typeof l.ref=="string"&&yt.current&&l.__self&&yt.current.stateNode!==l.__self){var v=bt(yt.current.type);On[v]||(ue('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',v,l.ref),On[v]=!0)}}var In=function(l,v,T,D,w,ce,$){var Re={$$typeof:c,type:l,key:v,ref:T,props:$,_owner:ce};return Re._store={},Object.defineProperty(Re._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(Re,"_self",{configurable:!1,enumerable:!1,writable:!1,value:D}),Object.defineProperty(Re,"_source",{configurable:!1,enumerable:!1,writable:!1,value:w}),Object.freeze&&(Object.freeze(Re.props),Object.freeze(Re)),Re};function Ga(l,v,T){var D,w={},ce=null,$=null,Re=null,Fe=null;if(v!=null){Oa(v)&&($=v.ref,Pa(v)),oa(v)&&(Ut(v.key),ce=""+v.key),Re=v.__self===void 0?null:v.__self,Fe=v.__source===void 0?null:v.__source;for(D in v)Mt.call(v,D)&&!Zn.hasOwnProperty(D)&&(w[D]=v[D])}var $e=arguments.length-2;if($e===1)w.children=T;else if($e>1){for(var ct=Array($e),pt=0;pt<$e;pt++)ct[pt]=arguments[pt+2];Object.freeze&&Object.freeze(ct),w.children=ct}if(l&&l.defaultProps){var ht=l.defaultProps;for(D in ht)w[D]===void 0&&(w[D]=ht[D])}if(ce||$){var _t=typeof l=="function"?l.displayName||l.name||"Unknown":l;ce&&sa(w,_t),$&&Nn(w,_t)}return In(l,ce,$,Re,Fe,yt.current,w)}function Q(l,v){var T=In(l.type,v,l.ref,l._self,l._source,l._owner,l.props);return T}function ae(l,v,T){if(l==null)throw new Error("React.cloneElement(...): The argument must be a React element, but you passed "+l+".");var D,w=lt({},l.props),ce=l.key,$=l.ref,Re=l._self,Fe=l._source,$e=l._owner;if(v!=null){Oa(v)&&($=v.ref,$e=yt.current),oa(v)&&(Ut(v.key),ce=""+v.key);var ct;l.type&&l.type.defaultProps&&(ct=l.type.defaultProps);for(D in v)Mt.call(v,D)&&!Zn.hasOwnProperty(D)&&(v[D]===void 0&&ct!==void 0?w[D]=ct[D]:w[D]=v[D])}var pt=arguments.length-2;if(pt===1)w.children=T;else if(pt>1){for(var ht=Array(pt),_t=0;_t<pt;_t++)ht[_t]=arguments[_t+2];w.children=ht}return In(l.type,ce,$,Re,Fe,$e,w)}function me(l){return typeof l=="object"&&l!==null&&l.$$typeof===c}var te=".",it=":";function zt(l){var v=/[=:]/g,T={"=":"=0",":":"=2"},D=l.replace(v,function(w){return T[w]});return"$"+D}var I=!1,X=/\/+/g;function Ie(l){return l.replace(X,"$&/")}function Qe(l,v){return typeof l=="object"&&l!==null&&l.key!=null?(Ut(l.key),zt(""+l.key)):v.toString(36)}function se(l,v,T,D,w){var ce=typeof l;(ce==="undefined"||ce==="boolean")&&(l=null);var $=!1;if(l===null)$=!0;else switch(ce){case"string":case"number":$=!0;break;case"object":switch(l.$$typeof){case c:case y:$=!0}}if($){var Re=l,Fe=w(Re),$e=D===""?te+Qe(Re,0):D;if(sn(Fe)){var ct="";$e!=null&&(ct=Ie($e)+"/"),se(Fe,v,ct,"",function(Ys){return Ys})}else Fe!=null&&(me(Fe)&&(Fe.key&&(!Re||Re.key!==Fe.key)&&Ut(Fe.key),Fe=Q(Fe,T+(Fe.key&&(!Re||Re.key!==Fe.key)?Ie(""+Fe.key)+"/":"")+$e)),v.push(Fe));return 1}var pt,ht,_t=0,wt=D===""?te:D+it;if(sn(l))for(var ui=0;ui<l.length;ui++)pt=l[ui],ht=wt+Qe(pt,ui),_t+=se(pt,v,T,ht,w);else{var ju=ke(l);if(typeof ju=="function"){var Pl=l;ju===Pl.entries&&(I||st("Using Maps as children is not supported. Use an array of keyed ReactElements instead."),I=!0);for(var Ii=ju.call(Pl),Gl,ws=0;!(Gl=Ii.next()).done;)pt=Gl.value,ht=wt+Qe(pt,ws++),_t+=se(pt,v,T,ht,w)}else if(ce==="object"){var Kl=String(l);throw new Error("Objects are not valid as a React child (found: "+(Kl==="[object Object]"?"object with keys {"+Object.keys(l).join(", ")+"}":Kl)+"). If you meant to render a collection of children, use an array instead.")}}return _t}function Vt(l,v,T){if(l==null)return l;var D=[],w=0;return se(l,D,"","",function(ce){return v.call(T,ce,w++)}),D}function $n(l){var v=0;return Vt(l,function(){v++}),v}function Ka(l,v,T){Vt(l,function(){v.apply(this,arguments)},T)}function Le(l){return Vt(l,function(v){return v})||[]}function fn(l){if(!me(l))throw new Error("React.Children.only expected to receive a single React element child.");return l}function Yn(l){var v={$$typeof:V,_currentValue:l,_currentValue2:l,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};v.Provider={$$typeof:_,_context:v};var T=!1,D=!1,w=!1;{var ce={$$typeof:V,_context:v};Object.defineProperties(ce,{Provider:{get:function(){return D||(D=!0,ue("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")),v.Provider},set:function($){v.Provider=$}},_currentValue:{get:function(){return v._currentValue},set:function($){v._currentValue=$}},_currentValue2:{get:function(){return v._currentValue2},set:function($){v._currentValue2=$}},_threadCount:{get:function(){return v._threadCount},set:function($){v._threadCount=$}},Consumer:{get:function(){return T||(T=!0,ue("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")),v.Consumer}},displayName:{get:function(){return v.displayName},set:function($){w||(st("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.",$),w=!0)}}}),v.Consumer=ce}return v._currentRenderer=null,v._currentRenderer2=null,v}var Pt=-1,At=0,dn=1,ea=2;function Na(l){if(l._status===Pt){var v=l._result,T=v();if(T.then(function(ce){if(l._status===At||l._status===Pt){var $=l;$._status=dn,$._result=ce}},function(ce){if(l._status===At||l._status===Pt){var $=l;$._status=ea,$._result=ce}}),l._status===Pt){var D=l;D._status=At,D._result=T}}if(l._status===dn){var w=l._result;return w===void 0&&ue(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,w),"default"in w||ue(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,w),w.default}else throw l._result}function Fr(l){var v={_status:Pt,_result:l},T={$$typeof:ge,_payload:v,_init:Na};{var D,w;Object.defineProperties(T,{defaultProps:{configurable:!0,get:function(){return D},set:function(ce){ue("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."),D=ce,Object.defineProperty(T,"defaultProps",{enumerable:!0})}},propTypes:{configurable:!0,get:function(){return w},set:function(ce){ue("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."),w=ce,Object.defineProperty(T,"propTypes",{enumerable:!0})}}})}return T}function Ir(l){l!=null&&l.$$typeof===K?ue("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."):typeof l!="function"?ue("forwardRef requires a render function but was given %s.",l===null?"null":typeof l):l.length!==0&&l.length!==2&&ue("forwardRef render functions accept exactly two parameters: props and ref. %s",l.length===1?"Did you forget to use the ref parameter?":"Any additional parameter will be undefined."),l!=null&&(l.defaultProps!=null||l.propTypes!=null)&&ue("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");var v={$$typeof:j,render:l};{var T;Object.defineProperty(v,"displayName",{enumerable:!1,configurable:!0,get:function(){return T},set:function(D){T=D,!l.name&&!l.displayName&&(l.displayName=D)}})}return v}var ca;ca=Symbol.for("react.module.reference");function Rt(l){return!!(typeof l=="string"||typeof l=="function"||l===R||l===z||be||l===g||l===h||l===q||ne||l===nt||$t||oe||Me||typeof l=="object"&&l!==null&&(l.$$typeof===ge||l.$$typeof===K||l.$$typeof===_||l.$$typeof===V||l.$$typeof===j||l.$$typeof===ca||l.getModuleId!==void 0))}function dr(l,v){Rt(l)||ue("memo: The first argument must be a component. Instead received: %s",l===null?"null":typeof l);var T={$$typeof:K,type:l,compare:v===void 0?null:v};{var D;Object.defineProperty(T,"displayName",{enumerable:!1,configurable:!0,get:function(){return D},set:function(w){D=w,!l.name&&!l.displayName&&(l.displayName=w)}})}return T}function d(){var l=Ce.current;return l===null&&ue(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`),l}function A(l){var v=d();if(l._context!==void 0){var T=l._context;T.Consumer===l?ue("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?"):T.Provider===l&&ue("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?")}return v.useContext(l)}function Y(l){var v=d();return v.useState(l)}function ie(l,v,T){var D=d();return D.useReducer(l,v,T)}function Te(l){var v=d();return v.useRef(l)}function Be(l,v){var T=d();return T.useEffect(l,v)}function _e(l,v){var T=d();return T.useInsertionEffect(l,v)}function Ee(l,v){var T=d();return T.useLayoutEffect(l,v)}function vt(l,v){var T=d();return T.useCallback(l,v)}function Xe(l,v){var T=d();return T.useMemo(l,v)}function Pe(l,v,T){var D=d();return D.useImperativeHandle(l,v,T)}function Gt(l,v){{var T=d();return T.useDebugValue(l,v)}}function Un(){var l=d();return l.useTransition()}function ta(l){var v=d();return v.useDeferredValue(l)}function Lt(){var l=d();return l.useId()}function ka(l,v,T){var D=d();return D.useSyncExternalStore(l,v,T)}var fa=0,Wa,$r,Ci,ei,xi,Kt,Br;function Di(){}Di.__reactDisabledLog=!0;function Wi(){{if(fa===0){Wa=console.log,$r=console.info,Ci=console.warn,ei=console.error,xi=console.group,Kt=console.groupCollapsed,Br=console.groupEnd;var l={configurable:!0,enumerable:!0,value:Di,writable:!0};Object.defineProperties(console,{info:l,log:l,warn:l,error:l,group:l,groupCollapsed:l,groupEnd:l})}fa++}}function Xi(){{if(fa--,fa===0){var l={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:lt({},l,{value:Wa}),info:lt({},l,{value:$r}),warn:lt({},l,{value:Ci}),error:lt({},l,{value:ei}),group:lt({},l,{value:xi}),groupCollapsed:lt({},l,{value:Kt}),groupEnd:lt({},l,{value:Br})})}fa<0&&ue("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var ti=xe.ReactCurrentDispatcher,ni;function Xa(l,v,T){{if(ni===void 0)try{throw Error()}catch(w){var D=w.stack.trim().match(/\n( *(at )?)/);ni=D&&D[1]||""}return`
`+ni+l}}var Vr=!1,vr;{var ai=typeof WeakMap=="function"?WeakMap:Map;vr=new ai}function ri(l,v){if(!l||Vr)return"";{var T=vr.get(l);if(T!==void 0)return T}var D;Vr=!0;var w=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var ce;ce=ti.current,ti.current=null,Wi();try{if(v){var $=function(){throw Error()};if(Object.defineProperty($.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct($,[])}catch(wt){D=wt}Reflect.construct(l,[],$)}else{try{$.call()}catch(wt){D=wt}l.call($.prototype)}}else{try{throw Error()}catch(wt){D=wt}l()}}catch(wt){if(wt&&D&&typeof wt.stack=="string"){for(var Re=wt.stack.split(`
`),Fe=D.stack.split(`
`),$e=Re.length-1,ct=Fe.length-1;$e>=1&&ct>=0&&Re[$e]!==Fe[ct];)ct--;for(;$e>=1&&ct>=0;$e--,ct--)if(Re[$e]!==Fe[ct]){if($e!==1||ct!==1)do if($e--,ct--,ct<0||Re[$e]!==Fe[ct]){var pt=`
`+Re[$e].replace(" at new "," at ");return l.displayName&&pt.includes("<anonymous>")&&(pt=pt.replace("<anonymous>",l.displayName)),typeof l=="function"&&vr.set(l,pt),pt}while($e>=1&&ct>=0);break}}}finally{Vr=!1,ti.current=ce,Xi(),Error.prepareStackTrace=w}var ht=l?l.displayName||l.name:"",_t=ht?Xa(ht):"";return typeof l=="function"&&vr.set(l,_t),_t}function _i(l,v,T){return ri(l,!1)}function Ji(l){var v=l.prototype;return!!(v&&v.isReactComponent)}function Ja(l,v,T){if(l==null)return"";if(typeof l=="function")return ri(l,Ji(l));if(typeof l=="string")return Xa(l);switch(l){case h:return Xa("Suspense");case q:return Xa("SuspenseList")}if(typeof l=="object")switch(l.$$typeof){case j:return _i(l.render);case K:return Ja(l.type,v,T);case ge:{var D=l,w=D._payload,ce=D._init;try{return Ja(ce(w),v,T)}catch($){}}}return""}var pr={},Oi=xe.ReactDebugCurrentFrame;function Ht(l){if(l){var v=l._owner,T=Ja(l.type,l._source,v?v.type:null);Oi.setExtraStackFrame(T)}else Oi.setExtraStackFrame(null)}function wr(l,v,T,D,w){{var ce=Function.call.bind(Mt);for(var $ in l)if(ce(l,$)){var Re=void 0;try{if(typeof l[$]!="function"){var Fe=Error((D||"React class")+": "+T+" type `"+$+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof l[$]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw Fe.name="Invariant Violation",Fe}Re=l[$](v,$,D,T,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch($e){Re=$e}Re&&!(Re instanceof Error)&&(Ht(w),ue("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",D||"React class",T,$,typeof Re),Ht(null)),Re instanceof Error&&!(Re.message in pr)&&(pr[Re.message]=!0,Ht(w),ue("Failed %s type: %s",T,Re.message),Ht(null))}}}function Dt(l){if(l){var v=l._owner,T=Ja(l.type,l._source,v?v.type:null);pe(T)}else pe(null)}var ii;ii=!1;function Zi(){if(yt.current){var l=bt(yt.current.type);if(l)return`

Check the render method of \``+l+"`."}return""}function Hu(l){if(l!==void 0){var v=l.fileName.replace(/^.*[\\\/]/,""),T=l.lineNumber;return`

Check your code at `+v+":"+T+"."}return""}function x(l){return l!=null?Hu(l.__source):""}var Ua={};function Za(l){var v=Zi();if(!v){var T=typeof l=="string"?l:l.displayName||l.name;T&&(v=`

Check the top-level render call using <`+T+">.")}return v}function da(l,v){if(!(!l._store||l._store.validated||l.key!=null)){l._store.validated=!0;var T=Za(v);if(!Ua[T]){Ua[T]=!0;var D="";l&&l._owner&&l._owner!==yt.current&&(D=" It was passed a child from "+bt(l._owner.type)+"."),Dt(l),ue('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',T,D),Dt(null)}}}function va(l,v){if(typeof l=="object"){if(sn(l))for(var T=0;T<l.length;T++){var D=l[T];me(D)&&da(D,v)}else if(me(l))l._store&&(l._store.validated=!0);else if(l){var w=ke(l);if(typeof w=="function"&&w!==l.entries)for(var ce=w.call(l),$;!($=ce.next()).done;)me($.value)&&da($.value,v)}}}function pa(l){{var v=l.type;if(v==null||typeof v=="string")return;var T;if(typeof v=="function")T=v.propTypes;else if(typeof v=="object"&&(v.$$typeof===j||v.$$typeof===K))T=v.propTypes;else return;if(T){var D=bt(v);wr(T,l.props,"prop",D,l)}else if(v.PropTypes!==void 0&&!ii){ii=!0;var w=bt(v);ue("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",w||"Unknown")}typeof v.getDefaultProps=="function"&&!v.getDefaultProps.isReactClassApproved&&ue("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.")}}function Ma(l){{for(var v=Object.keys(l.props),T=0;T<v.length;T++){var D=v[T];if(D!=="children"&&D!=="key"){Dt(l),ue("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",D),Dt(null);break}}l.ref!==null&&(Dt(l),ue("Invalid attribute `ref` supplied to `React.Fragment`."),Dt(null))}}function nn(l,v,T){var D=Rt(l);if(!D){var w="";(l===void 0||typeof l=="object"&&l!==null&&Object.keys(l).length===0)&&(w+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var ce=x(v);ce?w+=ce:w+=Zi();var $;l===null?$="null":sn(l)?$="array":l!==void 0&&l.$$typeof===c?($="<"+(bt(l.type)||"Unknown")+" />",w=" Did you accidentally export a JSX literal instead of a component?"):$=typeof l,ue("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",$,w)}var Re=Ga.apply(this,arguments);if(Re==null)return Re;if(D)for(var Fe=2;Fe<arguments.length;Fe++)va(arguments[Fe],l);return l===R?Ma(Re):pa(Re),Re}var ma=!1;function za(l){var v=nn.bind(null,l);return v.type=l,ma||(ma=!0,st("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")),Object.defineProperty(v,"type",{enumerable:!1,get:function(){return st("Factory.type is deprecated. Access the class directly before passing it to createFactory."),Object.defineProperty(this,"type",{value:l}),l}}),v}function Aa(l,v,T){for(var D=ae.apply(this,arguments),w=2;w<arguments.length;w++)va(arguments[w],D.type);return pa(D),D}function Mn(l,v){var T=De.transition;De.transition={};var D=De.transition;De.transition._updatedFibers=new Set;try{l()}finally{if(De.transition=T,T===null&&D._updatedFibers){var w=D._updatedFibers.size;w>10&&st("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."),D._updatedFibers.clear()}}}var ha=!1,qn=null;function La(l){if(qn===null)try{var v=("require"+Math.random()).slice(0,7),T=Ms&&Ms[v];qn=T.call(Ms,"timers").setImmediate}catch(D){qn=function(w){ha===!1&&(ha=!0,typeof MessageChannel=="undefined"&&ue("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));var ce=new MessageChannel;ce.port1.onmessage=w,ce.port2.postMessage(void 0)}}return qn(l)}var vn=0,ya=!1;function ga(l){{var v=vn;vn++,ot.current===null&&(ot.current=[]);var T=ot.isBatchingLegacy,D;try{if(ot.isBatchingLegacy=!0,D=l(),!T&&ot.didScheduleLegacyUpdate){var w=ot.current;w!==null&&(ot.didScheduleLegacyUpdate=!1,ra(w))}}catch(ht){throw Qn(v),ht}finally{ot.isBatchingLegacy=T}if(D!==null&&typeof D=="object"&&typeof D.then=="function"){var ce=D,$=!1,Re={then:function(ht,_t){$=!0,ce.then(function(wt){Qn(v),vn===0?na(wt,ht,_t):ht(wt)},function(wt){Qn(v),_t(wt)})}};return!ya&&typeof Promise!="undefined"&&Promise.resolve().then(function(){}).then(function(){$||(ya=!0,ue("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"))}),Re}else{var Fe=D;if(Qn(v),vn===0){var $e=ot.current;$e!==null&&(ra($e),ot.current=null);var ct={then:function(ht,_t){ot.current===null?(ot.current=[],na(Fe,ht,_t)):ht(Fe)}};return ct}else{var pt={then:function(ht,_t){ht(Fe)}};return pt}}}}function Qn(l){l!==vn-1&&ue("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "),vn=l}function na(l,v,T){{var D=ot.current;if(D!==null)try{ra(D),La(function(){D.length===0?(ot.current=null,v(l)):na(l,v,T)})}catch(w){T(w)}else v(l)}}var aa=!1;function ra(l){if(!aa){aa=!0;var v=0;try{for(;v<l.length;v++){var T=l[v];do T=T(!0);while(T!==null)}l.length=0}catch(D){throw l=l.slice(v+1),D}finally{aa=!1}}}var Ha=nn,ja=Aa,ba=za,Vs={map:Vt,forEach:Ka,count:$n,toArray:Le,only:fn};we.Children=Vs,we.Component=Tt,we.Fragment=R,we.Profiler=z,we.PureComponent=at,we.StrictMode=g,we.Suspense=h,we.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=xe,we.act=ga,we.cloneElement=ja,we.createContext=Yn,we.createElement=Ha,we.createFactory=ba,we.createRef=Jn,we.forwardRef=Ir,we.isValidElement=me,we.lazy=Fr,we.memo=dr,we.startTransition=Mn,we.unstable_act=ga,we.useCallback=vt,we.useContext=A,we.useDebugValue=Gt,we.useDeferredValue=ta,we.useEffect=Be,we.useId=Lt,we.useImperativeHandle=Pe,we.useInsertionEffect=_e,we.useLayoutEffect=Ee,we.useMemo=Xe,we.useReducer=ie,we.useRef=Te,we.useState=Y,we.useSyncExternalStore=ka,we.useTransition=Un,we.version=p,typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!="undefined"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error)})()});var Hr=Ei((RC,uy)=>{"use strict";uy.exports=iy()});var ly=Ei(dt=>{"use strict";(function(){"use strict";typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!="undefined"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);var p=!1,c=!1,y=5;function R(Q,ae){var me=Q.length;Q.push(ae),_(Q,ae,me)}function g(Q){return Q.length===0?null:Q[0]}function z(Q){if(Q.length===0)return null;var ae=Q[0],me=Q.pop();return me!==ae&&(Q[0]=me,V(Q,me,0)),ae}function _(Q,ae,me){for(var te=me;te>0;){var it=te-1>>>1,zt=Q[it];if(j(zt,ae)>0)Q[it]=ae,Q[te]=zt,te=it;else return}}function V(Q,ae,me){for(var te=me,it=Q.length,zt=it>>>1;te<zt;){var I=(te+1)*2-1,X=Q[I],Ie=I+1,Qe=Q[Ie];if(j(X,ae)<0)Ie<it&&j(Qe,X)<0?(Q[te]=Qe,Q[Ie]=ae,te=Ie):(Q[te]=X,Q[I]=ae,te=I);else if(Ie<it&&j(Qe,ae)<0)Q[te]=Qe,Q[Ie]=ae,te=Ie;else return}}function j(Q,ae){var me=Q.sortIndex-ae.sortIndex;return me!==0?me:Q.id-ae.id}var h=1,q=2,K=3,ge=4,nt=5;function Ke(Q,ae){}var qe=typeof performance=="object"&&typeof performance.now=="function";if(qe){var ke=performance;dt.unstable_now=function(){return ke.now()}}else{var Ce=Date,De=Ce.now();dt.unstable_now=function(){return Ce.now()-De}}var ot=1073741823,yt=-1,xn=250,Ue=5e3,pe=1e4,$t=ot,oe=[],Me=[],ne=1,be=null,xe=K,st=!1,ue=!1,St=!1,ze=typeof setTimeout=="function"?setTimeout:null,Et=typeof clearTimeout=="function"?clearTimeout:null,je=typeof setImmediate!="undefined"?setImmediate:null,lt=typeof navigator!="undefined"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0?navigator.scheduling.isInputPending.bind(navigator.scheduling):null;function Ae(Q){for(var ae=g(Me);ae!==null;){if(ae.callback===null)z(Me);else if(ae.startTime<=Q)z(Me),ae.sortIndex=ae.expirationTime,R(oe,ae);else return;ae=g(Me)}}function Tt(Q){if(St=!1,Ae(Q),!ue)if(g(oe)!==null)ue=!0,sa(Ft);else{var ae=g(Me);ae!==null&&Nn(Tt,ae.startTime-Q)}}function Ft(Q,ae){ue=!1,St&&(St=!1,Pa()),st=!0;var me=xe;try{if(c)try{return Fn(Q,ae)}catch(it){if(be!==null){var te=dt.unstable_now();be.isQueued=!1}throw it}else return Fn(Q,ae)}finally{be=null,xe=me,st=!1}}function Fn(Q,ae){var me=ae;for(Ae(me),be=g(oe);be!==null&&!p&&!(be.expirationTime>me&&(!Q||Mt()));){var te=be.callback;if(typeof te=="function"){be.callback=null,xe=be.priorityLevel;var it=be.expirationTime<=me,zt=te(it);me=dt.unstable_now(),typeof zt=="function"?be.callback=zt:be===g(oe)&&z(oe),Ae(me)}else z(oe);be=g(oe)}if(be!==null)return!0;var I=g(Me);return I!==null&&Nn(Tt,I.startTime-me),!1}function gt(Q,ae){switch(Q){case h:case q:case K:case ge:case nt:break;default:Q=K}var me=xe;xe=Q;try{return ae()}finally{xe=me}}function en(Q){var ae;switch(xe){case h:case q:case K:ae=K;break;default:ae=xe;break}var me=xe;xe=ae;try{return Q()}finally{xe=me}}function at(Q){var ae=xe;return function(){var me=xe;xe=ae;try{return Q.apply(this,arguments)}finally{xe=me}}}function Bt(Q,ae,me){var te=dt.unstable_now(),it;if(typeof me=="object"&&me!==null){var zt=me.delay;typeof zt=="number"&&zt>0?it=te+zt:it=te}else it=te;var I;switch(Q){case h:I=yt;break;case q:I=xn;break;case nt:I=$t;break;case ge:I=pe;break;case K:default:I=Ue;break}var X=it+I,Ie={id:ne++,callback:ae,priorityLevel:Q,startTime:it,expirationTime:X,sortIndex:-1};return it>te?(Ie.sortIndex=it,R(Me,Ie),g(oe)===null&&Ie===g(Me)&&(St?Pa():St=!0,Nn(Tt,it-te))):(Ie.sortIndex=X,R(oe,Ie),!ue&&!st&&(ue=!0,sa(Ft))),Ie}function Jn(){}function Bn(){!ue&&!st&&(ue=!0,sa(Ft))}function sn(){return g(oe)}function cn(Q){Q.callback=null}function Vn(){return xe}var Dn=!1,Ut=null,tn=-1,_n=y,bt=-1;function Mt(){var Q=dt.unstable_now()-bt;return!(Q<_n)}function Zn(){}function wn(Q){if(Q<0||Q>125){console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");return}Q>0?_n=Math.floor(1e3/Q):_n=y}var rt=function(){if(Ut!==null){var Q=dt.unstable_now();bt=Q;var ae=!0,me=!0;try{me=Ut(ae,Q)}finally{me?On():(Dn=!1,Ut=null)}}else Dn=!1},On;if(typeof je=="function")On=function(){je(rt)};else if(typeof MessageChannel!="undefined"){var Oa=new MessageChannel,oa=Oa.port2;Oa.port1.onmessage=rt,On=function(){oa.postMessage(null)}}else On=function(){ze(rt,0)};function sa(Q){Ut=Q,Dn||(Dn=!0,On())}function Nn(Q,ae){tn=ze(function(){Q(dt.unstable_now())},ae)}function Pa(){Et(tn),tn=-1}var In=Zn,Ga=null;dt.unstable_IdlePriority=nt,dt.unstable_ImmediatePriority=h,dt.unstable_LowPriority=ge,dt.unstable_NormalPriority=K,dt.unstable_Profiling=Ga,dt.unstable_UserBlockingPriority=q,dt.unstable_cancelCallback=cn,dt.unstable_continueExecution=Bn,dt.unstable_forceFrameRate=wn,dt.unstable_getCurrentPriorityLevel=Vn,dt.unstable_getFirstCallbackNode=sn,dt.unstable_next=en,dt.unstable_pauseExecution=Jn,dt.unstable_requestPaint=In,dt.unstable_runWithPriority=gt,dt.unstable_scheduleCallback=Bt,dt.unstable_shouldYield=Mt,dt.unstable_wrapCallback=at,typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!="undefined"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error)})()});var sy=Ei((xC,oy)=>{"use strict";oy.exports=ly()});var fy=Ei((DC,cy)=>{"use strict";cy.exports=function(c){var y={},R=Hr(),g=sy(),z=R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,_=!1;function V(e){_=e}function j(e){if(!_){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];q("warn",e,n)}}function h(e){if(!_){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];q("error",e,n)}}function q(e,t,n){{var a=z.ReactDebugCurrentFrame,r=a.getStackAddendum();r!==""&&(t+="%s",n=n.concat([r]));var i=n.map(function(u){return String(u)});i.unshift("Warning: "+t),Function.prototype.apply.call(console[e],console,i)}}var K=Object.assign;function ge(e){return e._reactInternals}function nt(e,t){e._reactInternals=t}var Ke=!1,qe=!1,ke=!1,Ce=!1,De=!0,ot=!0,yt=!0,xn=!0,Ue=0,pe=1,$t=2,oe=3,Me=4,ne=5,be=6,xe=7,st=8,ue=9,St=10,ze=11,Et=12,je=13,lt=14,Ae=15,Tt=16,Ft=17,Fn=18,gt=19,en=21,at=22,Bt=23,Jn=24,Bn=25,sn=Symbol.for("react.element"),cn=Symbol.for("react.portal"),Vn=Symbol.for("react.fragment"),Dn=Symbol.for("react.strict_mode"),Ut=Symbol.for("react.profiler"),tn=Symbol.for("react.provider"),_n=Symbol.for("react.context"),bt=Symbol.for("react.forward_ref"),Mt=Symbol.for("react.suspense"),Zn=Symbol.for("react.suspense_list"),wn=Symbol.for("react.memo"),rt=Symbol.for("react.lazy"),On=Symbol.for("react.scope"),Oa=Symbol.for("react.debug_trace_mode"),oa=Symbol.for("react.offscreen"),sa=Symbol.for("react.legacy_hidden"),Nn=Symbol.for("react.cache"),Pa=Symbol.for("react.tracing_marker"),In=Symbol.iterator,Ga="@@iterator";function Q(e){if(e===null||typeof e!="object")return null;var t=In&&e[In]||e[Ga];return typeof t=="function"?t:null}function ae(e,t,n){var a=e.displayName;if(a)return a;var r=t.displayName||t.name||"";return r!==""?n+"("+r+")":n}function me(e){return e.displayName||"Context"}function te(e){if(e==null)return null;if(typeof e.tag=="number"&&h("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Vn:return"Fragment";case cn:return"Portal";case Ut:return"Profiler";case Dn:return"StrictMode";case Mt:return"Suspense";case Zn:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case _n:var t=e;return me(t)+".Consumer";case tn:var n=e;return me(n._context)+".Provider";case bt:return ae(e,e.render,"ForwardRef");case wn:var a=e.displayName||null;return a!==null?a:te(e.type)||"Memo";case rt:{var r=e,i=r._payload,u=r._init;try{return te(u(i))}catch(o){return null}}}return null}function it(e,t,n){var a=t.displayName||t.name||"";return e.displayName||(a!==""?n+"("+a+")":n)}function zt(e){return e.displayName||"Context"}function I(e){var t=e.tag,n=e.type;switch(t){case Jn:return"Cache";case ue:var a=n;return zt(a)+".Consumer";case St:var r=n;return zt(r._context)+".Provider";case Fn:return"DehydratedFragment";case ze:return it(n,n.render,"ForwardRef");case xe:return"Fragment";case ne:return n;case Me:return"Portal";case oe:return"Root";case be:return"Text";case Tt:return te(n);case st:return n===Dn?"StrictMode":"Mode";case at:return"Offscreen";case Et:return"Profiler";case en:return"Scope";case je:return"Suspense";case gt:return"SuspenseList";case Bn:return"TracingMarker";case pe:case Ue:case Ft:case $t:case lt:case Ae:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;break}return null}var X=0,Ie=1,Qe=2,se=4,Vt=16,$n=32,Ka=64,Le=128,fn=256,Yn=512,Pt=1024,At=2048,dn=4096,ea=8192,Na=16384,Fr=At|se|Ka|Yn|Pt|Na,Ir=32767,ca=32768,Rt=65536,dr=131072,d=1048576,A=2097152,Y=4194304,ie=8388608,Te=16777216,Be=33554432,_e=se|Pt|0,Ee=Qe|se|Vt|$n|Yn|dn|ea,vt=se|Ka|Yn|ea,Xe=At|Vt,Pe=Y|ie|A,Gt=z.ReactCurrentOwner;function Un(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{var a=t;do t=a,(t.flags&(Qe|dn))!==X&&(n=t.return),a=t.return;while(a)}return t.tag===oe?n:null}function ta(e){return Un(e)===e}function Lt(e){{var t=Gt.current;if(t!==null&&t.tag===pe){var n=t,a=n.stateNode;a._warnedAboutRefsInRender||h("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.",I(n)||"A component"),a._warnedAboutRefsInRender=!0}}var r=ge(e);return r?Un(r)===r:!1}function ka(e){if(Un(e)!==e)throw new Error("Unable to find node on an unmounted component.")}function fa(e){var t=e.alternate;if(!t){var n=Un(e);if(n===null)throw new Error("Unable to find node on an unmounted component.");return n!==e?null:e}for(var a=e,r=t;;){var i=a.return;if(i===null)break;var u=i.alternate;if(u===null){var o=i.return;if(o!==null){a=r=o;continue}break}if(i.child===u.child){for(var s=i.child;s;){if(s===a)return ka(i),e;if(s===r)return ka(i),t;s=s.sibling}throw new Error("Unable to find node on an unmounted component.")}if(a.return!==r.return)a=i,r=u;else{for(var f=!1,m=i.child;m;){if(m===a){f=!0,a=i,r=u;break}if(m===r){f=!0,r=i,a=u;break}m=m.sibling}if(!f){for(m=u.child;m;){if(m===a){f=!0,a=u,r=i;break}if(m===r){f=!0,r=u,a=i;break}m=m.sibling}if(!f)throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.")}}if(a.alternate!==r)throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.")}if(a.tag!==oe)throw new Error("Unable to find node on an unmounted component.");return a.stateNode.current===a?e:t}function Wa(e){var t=fa(e);return t!==null?$r(t):null}function $r(e){if(e.tag===ne||e.tag===be)return e;for(var t=e.child;t!==null;){var n=$r(t);if(n!==null)return n;t=t.sibling}return null}function Ci(e){var t=fa(e);return t!==null?ei(t):null}function ei(e){if(e.tag===ne||e.tag===be)return e;for(var t=e.child;t!==null;){if(t.tag!==Me){var n=ei(t);if(n!==null)return n}t=t.sibling}return null}var xi=Array.isArray;function Kt(e){return xi(e)}var Br=c.getPublicInstance,Di=c.getRootHostContext,Wi=c.getChildHostContext,Xi=c.prepareForCommit,ti=c.resetAfterCommit,ni=c.createInstance,Xa=c.appendInitialChild,Vr=c.finalizeInitialChildren,vr=c.prepareUpdate,ai=c.shouldSetTextContent,ri=c.createTextInstance,_i=c.scheduleTimeout,Ji=c.cancelTimeout,Ja=c.noTimeout,pr=c.isPrimaryRenderer,Oi=c.warnsIfNotActing,Ht=c.supportsMutation,wr=c.supportsPersistence,Dt=c.supportsHydration,ii=c.getInstanceFromNode,Zi=c.beforeActiveInstanceBlur,Hu=c.afterActiveInstanceBlur,x=c.preparePortalMount,Ua=c.prepareScopeUpdate,Za=c.getInstanceFromScope,da=c.getCurrentEventPriority,va=c.detachDeletedInstance,pa=c.supportsMicrotasks,Ma=c.scheduleMicrotask,nn=c.supportsTestSelectors,ma=c.findFiberRoot,za=c.getBoundingRect,Aa=c.getTextContent,Mn=c.isHiddenSubtree,ha=c.matchAccessibilityRole,qn=c.setFocusIfFocusable,La=c.setupIntersectionObserver,vn=c.appendChild,ya=c.appendChildToContainer,ga=c.commitTextUpdate,Qn=c.commitMount,na=c.commitUpdate,aa=c.insertBefore,ra=c.insertInContainerBefore,Ha=c.removeChild,ja=c.removeChildFromContainer,ba=c.resetTextContent,Vs=c.hideInstance,l=c.hideTextInstance,v=c.unhideInstance,T=c.unhideTextInstance,D=c.clearContainer,w=c.cloneInstance,ce=c.createContainerChildSet,$=c.appendChildToContainerChildSet,Re=c.finalizeContainerChildren,Fe=c.replaceContainerChildren,$e=c.cloneHiddenInstance,ct=c.cloneHiddenTextInstance,pt=c.canHydrateInstance,ht=c.canHydrateTextInstance,_t=c.canHydrateSuspenseInstance,wt=c.isSuspenseInstancePending,ui=c.isSuspenseInstanceFallback,ju=c.getSuspenseInstanceFallbackErrorDetails,Pl=c.registerSuspenseInstanceRetry,Ii=c.getNextHydratableSibling,Gl=c.getFirstHydratableChild,ws=c.getFirstHydratableChildWithinContainer,Kl=c.getFirstHydratableChildWithinSuspenseInstance,Ys=c.hydrateInstance,zy=c.hydrateTextInstance,Ay=c.hydrateSuspenseInstance,Ly=c.getNextHydratableInstanceAfterSuspenseInstance,Hy=c.commitHydratedContainer,jy=c.commitHydratedSuspenseInstance,Fy=c.clearSuspenseBoundary,By=c.clearSuspenseBoundaryFromContainer,Vy=c.shouldDeleteUnhydratedTailInstances,wy=c.didNotMatchHydratedContainerTextInstance,Yy=c.didNotMatchHydratedTextInstance,qy=c.didNotHydrateInstanceWithinContainer,Qy=c.didNotHydrateInstanceWithinSuspenseInstance,Py=c.didNotHydrateInstance,Gy=c.didNotFindHydratableInstanceWithinContainer,Ky=c.didNotFindHydratableTextInstanceWithinContainer,ky=c.didNotFindHydratableSuspenseInstanceWithinContainer,Wy=c.didNotFindHydratableInstanceWithinSuspenseInstance,Xy=c.didNotFindHydratableTextInstanceWithinSuspenseInstance,Jy=c.didNotFindHydratableSuspenseInstanceWithinSuspenseInstance,Zy=c.didNotFindHydratableInstance,Iy=c.didNotFindHydratableTextInstance,$y=c.didNotFindHydratableSuspenseInstance,eg=c.errorHydratingContainer,Fu=0,fv,dv,vv,pv,mv,hv,yv;function gv(){}gv.__reactDisabledLog=!0;function tg(){{if(Fu===0){fv=console.log,dv=console.info,vv=console.warn,pv=console.error,mv=console.group,hv=console.groupCollapsed,yv=console.groupEnd;var e={configurable:!0,enumerable:!0,value:gv,writable:!0};Object.defineProperties(console,{info:e,log:e,warn:e,error:e,group:e,groupCollapsed:e,groupEnd:e})}Fu++}}function ng(){{if(Fu--,Fu===0){var e={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:K({},e,{value:fv}),info:K({},e,{value:dv}),warn:K({},e,{value:vv}),error:K({},e,{value:pv}),group:K({},e,{value:mv}),groupCollapsed:K({},e,{value:hv}),groupEnd:K({},e,{value:yv})})}Fu<0&&h("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var qs=z.ReactCurrentDispatcher,Qs;function li(e,t,n){{if(Qs===void 0)try{throw Error()}catch(r){var a=r.stack.trim().match(/\n( *(at )?)/);Qs=a&&a[1]||""}return`
`+Qs+e}}var Ps=!1,kl;{var ag=typeof WeakMap=="function"?WeakMap:Map;kl=new ag}function Gs(e,t){if(!e||Ps)return"";{var n=kl.get(e);if(n!==void 0)return n}var a;Ps=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var i;i=qs.current,qs.current=null,tg();try{if(t){var u=function(){throw Error()};if(Object.defineProperty(u.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(u,[])}catch(L){a=L}Reflect.construct(e,[],u)}else{try{u.call()}catch(L){a=L}e.call(u.prototype)}}else{try{throw Error()}catch(L){a=L}e()}}catch(L){if(L&&a&&typeof L.stack=="string"){for(var o=L.stack.split(`
`),s=a.stack.split(`
`),f=o.length-1,m=s.length-1;f>=1&&m>=0&&o[f]!==s[m];)m--;for(;f>=1&&m>=0;f--,m--)if(o[f]!==s[m]){if(f!==1||m!==1)do if(f--,m--,m<0||o[f]!==s[m]){var b=`
`+o[f].replace(" at new "," at ");return e.displayName&&b.includes("<anonymous>")&&(b=b.replace("<anonymous>",e.displayName)),typeof e=="function"&&kl.set(e,b),b}while(f>=1&&m>=0);break}}}finally{Ps=!1,qs.current=i,ng(),Error.prepareStackTrace=r}var C=e?e.displayName||e.name:"",U=C?li(C):"";return typeof e=="function"&&kl.set(e,U),U}function rg(e,t,n){return Gs(e,!0)}function Ks(e,t,n){return Gs(e,!1)}function ig(e){var t=e.prototype;return!!(t&&t.isReactComponent)}function ks(e,t,n){if(e==null)return"";if(typeof e=="function")return Gs(e,ig(e));if(typeof e=="string")return li(e);switch(e){case Mt:return li("Suspense");case Zn:return li("SuspenseList")}if(typeof e=="object")switch(e.$$typeof){case bt:return Ks(e.render);case wn:return ks(e.type,t,n);case rt:{var a=e,r=a._payload,i=a._init;try{return ks(i(r),t,n)}catch(u){}}}return""}var bv=Object.prototype.hasOwnProperty,Sv={},Ev=z.ReactDebugCurrentFrame;function Wl(e){if(e){var t=e._owner,n=ks(e.type,e._source,t?t.type:null);Ev.setExtraStackFrame(n)}else Ev.setExtraStackFrame(null)}function Ia(e,t,n,a,r){{var i=Function.call.bind(bv);for(var u in e)if(i(e,u)){var o=void 0;try{if(typeof e[u]!="function"){var s=Error((a||"React class")+": "+n+" type `"+u+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof e[u]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw s.name="Invariant Violation",s}o=e[u](t,u,a,n,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(f){o=f}o&&!(o instanceof Error)&&(Wl(r),h("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",a||"React class",n,u,typeof o),Wl(null)),o instanceof Error&&!(o.message in Sv)&&(Sv[o.message]=!0,Wl(r),h("Failed %s type: %s",n,o.message),Wl(null))}}}var Ws=[],Xl;Xl=[];var Yr=-1;function oi(e){return{current:e}}function zn(e,t){if(Yr<0){h("Unexpected pop.");return}t!==Xl[Yr]&&h("Unexpected Fiber popped."),e.current=Ws[Yr],Ws[Yr]=null,Xl[Yr]=null,Yr--}function pn(e,t,n){Yr++,Ws[Yr]=e.current,Xl[Yr]=n,e.current=t}var Xs;Xs={};var Sa={};Object.freeze(Sa);var qr=oi(Sa),mr=oi(!1),Js=Sa;function $i(e,t,n){return n&&hr(t)?Js:qr.current}function Tv(e,t,n){{var a=e.stateNode;a.__reactInternalMemoizedUnmaskedChildContext=t,a.__reactInternalMemoizedMaskedChildContext=n}}function eu(e,t){{var n=e.type,a=n.contextTypes;if(!a)return Sa;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={};for(var u in a)i[u]=t[u];{var o=I(e)||"Unknown";Ia(a,i,"context",o)}return r&&Tv(e,t,i),i}}function Jl(){return mr.current}function hr(e){{var t=e.childContextTypes;return t!=null}}function Zl(e){zn(mr,e),zn(qr,e)}function Zs(e){zn(mr,e),zn(qr,e)}function Rv(e,t,n){{if(qr.current!==Sa)throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");pn(qr,t,e),pn(mr,n,e)}}function Cv(e,t,n){{var a=e.stateNode,r=t.childContextTypes;if(typeof a.getChildContext!="function"){{var i=I(e)||"Unknown";Xs[i]||(Xs[i]=!0,h("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.",i,i))}return n}var u=a.getChildContext();for(var o in u)if(!(o in r))throw new Error((I(e)||"Unknown")+'.getChildContext(): key "'+o+'" is not defined in childContextTypes.');{var s=I(e)||"Unknown";Ia(r,u,"child context",s)}return K({},n,u)}}function Il(e){{var t=e.stateNode,n=t&&t.__reactInternalMemoizedMergedChildContext||Sa;return Js=qr.current,pn(qr,n,e),pn(mr,mr.current,e),!0}}function xv(e,t,n){{var a=e.stateNode;if(!a)throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");if(n){var r=Cv(e,t,Js);a.__reactInternalMemoizedMergedChildContext=r,zn(mr,e),zn(qr,e),pn(qr,r,e),pn(mr,n,e)}else zn(mr,e),pn(mr,n,e)}}function ug(e){{if(!ta(e)||e.tag!==pe)throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");var t=e;do{switch(t.tag){case oe:return t.stateNode.context;case pe:{var n=t.type;if(hr(n))return t.stateNode.__reactInternalMemoizedMergedChildContext;break}}t=t.return}while(t!==null);throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.")}}var tu=0,Dv=1,fe=0,Ge=1,et=2,Ot=8,yr=16,_v=Math.clz32?Math.clz32:sg,lg=Math.log,og=Math.LN2;function sg(e){var t=e>>>0;return t===0?32:31-(lg(t)/og|0)|0}var Is=31,H=0,an=0,he=1,nu=2,Qr=4,Ni=8,gr=16,Bu=32,au=4194240,Vu=64,$s=128,ec=256,tc=512,nc=1024,ac=2048,rc=4096,ic=8192,uc=16384,lc=32768,oc=65536,sc=131072,cc=262144,fc=524288,dc=1048576,vc=2097152,$l=130023424,ru=4194304,pc=8388608,mc=16777216,hc=33554432,yc=67108864,Ov=ru,wu=134217728,Nv=268435455,Yu=268435456,Ui=536870912,Ea=1073741824;function cg(e){{if(e&he)return"Sync";if(e&nu)return"InputContinuousHydration";if(e&Qr)return"InputContinuous";if(e&Ni)return"DefaultHydration";if(e&gr)return"Default";if(e&Bu)return"TransitionHydration";if(e&au)return"Transition";if(e&$l)return"Retry";if(e&wu)return"SelectiveHydration";if(e&Yu)return"IdleHydration";if(e&Ui)return"Idle";if(e&Ea)return"Offscreen"}}var mt=-1,eo=Vu,to=ru;function qu(e){switch(Mi(e)){case he:return he;case nu:return nu;case Qr:return Qr;case Ni:return Ni;case gr:return gr;case Bu:return Bu;case Vu:case $s:case ec:case tc:case nc:case ac:case rc:case ic:case uc:case lc:case oc:case sc:case cc:case fc:case dc:case vc:return e&au;case ru:case pc:case mc:case hc:case yc:return e&$l;case wu:return wu;case Yu:return Yu;case Ui:return Ui;case Ea:return Ea;default:return h("Should have found matching lanes. This is a bug in React."),e}}function no(e,t){var n=e.pendingLanes;if(n===H)return H;var a=H,r=e.suspendedLanes,i=e.pingedLanes,u=n&Nv;if(u!==H){var o=u&~r;if(o!==H)a=qu(o);else{var s=u&i;s!==H&&(a=qu(s))}}else{var f=n&~r;f!==H?a=qu(f):i!==H&&(a=qu(i))}if(a===H)return H;if(t!==H&&t!==a&&(t&r)===H){var m=Mi(a),b=Mi(t);if(m>=b||m===gr&&(b&au)!==H)return t}(a&Qr)!==H&&(a|=n&gr);var C=e.entangledLanes;if(C!==H)for(var U=e.entanglements,L=a&C;L>0;){var M=zi(L),J=1<<M;a|=U[M],L&=~J}return a}function fg(e,t){for(var n=e.eventTimes,a=mt;t>0;){var r=zi(t),i=1<<r,u=n[r];u>a&&(a=u),t&=~i}return a}function dg(e,t){switch(e){case he:case nu:case Qr:return t+250;case Ni:case gr:case Bu:case Vu:case $s:case ec:case tc:case nc:case ac:case rc:case ic:case uc:case lc:case oc:case sc:case cc:case fc:case dc:case vc:return t+5e3;case ru:case pc:case mc:case hc:case yc:return mt;case wu:case Yu:case Ui:case Ea:return mt;default:return h("Should have found matching lanes. This is a bug in React."),mt}}function vg(e,t){for(var n=e.pendingLanes,a=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,u=n;u>0;){var o=zi(u),s=1<<o,f=i[o];f===mt?((s&a)===H||(s&r)!==H)&&(i[o]=dg(s,t)):f<=t&&(e.expiredLanes|=s),u&=~s}}function pg(e){return qu(e.pendingLanes)}function gc(e){var t=e.pendingLanes&~Ea;return t!==H?t:t&Ea?Ea:H}function mg(e){return(e&he)!==H}function bc(e){return(e&Nv)!==H}function Uv(e){return(e&$l)===e}function hg(e){var t=he|Qr|gr;return(e&t)===H}function yg(e){return(e&au)===e}function ao(e,t){var n=nu|Qr|Ni|gr;return(t&n)!==H}function gg(e,t){return(t&e.expiredLanes)!==H}function Mv(e){return(e&au)!==H}function zv(){var e=eo;return eo<<=1,(eo&au)===H&&(eo=Vu),e}function bg(){var e=to;return to<<=1,(to&$l)===H&&(to=ru),e}function Mi(e){return e&-e}function Qu(e){return Mi(e)}function zi(e){return 31-_v(e)}function Sc(e){return zi(e)}function Ta(e,t){return(e&t)!==H}function iu(e,t){return(e&t)===t}function Oe(e,t){return e|t}function ro(e,t){return e&~t}function Av(e,t){return e&t}function OR(e){return e}function Sg(e,t){return e!==an&&e<t?e:t}function Ec(e){for(var t=[],n=0;n<Is;n++)t.push(e);return t}function Pu(e,t,n){e.pendingLanes|=t,t!==Ui&&(e.suspendedLanes=H,e.pingedLanes=H);var a=e.eventTimes,r=Sc(t);a[r]=n}function Eg(e,t){e.suspendedLanes|=t,e.pingedLanes&=~t;for(var n=e.expirationTimes,a=t;a>0;){var r=zi(a),i=1<<r;n[r]=mt,a&=~i}}function Lv(e,t,n){e.pingedLanes|=e.suspendedLanes&t}function Tg(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=H,e.pingedLanes=H,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t;for(var a=e.entanglements,r=e.eventTimes,i=e.expirationTimes,u=n;u>0;){var o=zi(u),s=1<<o;a[o]=H,r[o]=mt,i[o]=mt,u&=~s}}function Tc(e,t){for(var n=e.entangledLanes|=t,a=e.entanglements,r=n;r;){var i=zi(r),u=1<<i;u&t|a[i]&t&&(a[i]|=t),r&=~u}}function Rg(e,t){var n=Mi(t),a;switch(n){case Qr:a=nu;break;case gr:a=Ni;break;case Vu:case $s:case ec:case tc:case nc:case ac:case rc:case ic:case uc:case lc:case oc:case sc:case cc:case fc:case dc:case vc:case ru:case pc:case mc:case hc:case yc:a=Bu;break;case Ui:a=Yu;break;default:a=an;break}return(a&(e.suspendedLanes|t))!==an?an:a}function Hv(e,t,n){if(er)for(var a=e.pendingUpdatersLaneMap;n>0;){var r=Sc(n),i=1<<r,u=a[r];u.add(t),n&=~i}}function jv(e,t){if(er)for(var n=e.pendingUpdatersLaneMap,a=e.memoizedUpdaters;t>0;){var r=Sc(t),i=1<<r,u=n[r];u.size>0&&(u.forEach(function(o){var s=o.alternate;(s===null||!a.has(s))&&a.add(o)}),u.clear()),t&=~i}}function Fv(e,t){return null}var br=he,Gu=Qr,Ku=gr,Rc=Ui,ku=an;function $a(){return ku}function rn(e){ku=e}function Cg(e,t){var n=ku;try{return ku=e,t()}finally{ku=n}}function xg(e,t){return e!==0&&e<t?e:t}function Dg(e,t){return e===0||e>t?e:t}function Bv(e,t){return e!==0&&e<t}function Vv(e){var t=Mi(e);return Bv(br,t)?Bv(Gu,t)?bc(t)?Ku:Rc:Gu:br}var wv=g.unstable_scheduleCallback,_g=g.unstable_cancelCallback,Og=g.unstable_shouldYield,Ng=g.unstable_requestPaint,un=g.unstable_now,io=g.unstable_ImmediatePriority,Yv=g.unstable_UserBlockingPriority,uu=g.unstable_NormalPriority,qv=g.unstable_IdlePriority,Ug=g.unstable_yieldValue,Mg=g.unstable_setDisableYieldValue,Ai=null,mn=null,G=null,Sr=!1,er=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!="undefined";function zg(e){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__=="undefined")return!1;var t=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t.isDisabled)return!0;if(!t.supportsFiber)return h("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"),!0;try{ot&&(e=K({},e,{getLaneLabelMap:Bg,injectProfilingHooks:Fg})),Ai=t.inject(e),mn=t}catch(n){h("React instrumentation encountered an error: %s.",n)}return!!t.checkDCE}function Ag(e,t){if(mn&&typeof mn.onScheduleFiberRoot=="function")try{mn.onScheduleFiberRoot(Ai,e,t)}catch(n){Sr||(Sr=!0,h("React instrumentation encountered an error: %s",n))}}function Lg(e,t){if(mn&&typeof mn.onCommitFiberRoot=="function")try{var n=(e.current.flags&Le)===Le;if(yt){var a;switch(t){case br:a=io;break;case Gu:a=Yv;break;case Ku:a=uu;break;case Rc:a=qv;break;default:a=uu;break}mn.onCommitFiberRoot(Ai,e,a,n)}else mn.onCommitFiberRoot(Ai,e,void 0,n)}catch(r){Sr||(Sr=!0,h("React instrumentation encountered an error: %s",r))}}function Hg(e){if(mn&&typeof mn.onPostCommitFiberRoot=="function")try{mn.onPostCommitFiberRoot(Ai,e)}catch(t){Sr||(Sr=!0,h("React instrumentation encountered an error: %s",t))}}function jg(e){if(mn&&typeof mn.onCommitFiberUnmount=="function")try{mn.onCommitFiberUnmount(Ai,e)}catch(t){Sr||(Sr=!0,h("React instrumentation encountered an error: %s",t))}}function ln(e){if(typeof Ug=="function"&&(Mg(e),V(e)),mn&&typeof mn.setStrictMode=="function")try{mn.setStrictMode(Ai,e)}catch(t){Sr||(Sr=!0,h("React instrumentation encountered an error: %s",t))}}function Fg(e){G=e}function Bg(){{for(var e=new Map,t=1,n=0;n<Is;n++){var a=cg(t);e.set(t,a),t*=2}return e}}function Vg(e){G!==null&&typeof G.markCommitStarted=="function"&&G.markCommitStarted(e)}function Qv(){G!==null&&typeof G.markCommitStopped=="function"&&G.markCommitStopped()}function Wu(e){G!==null&&typeof G.markComponentRenderStarted=="function"&&G.markComponentRenderStarted(e)}function lu(){G!==null&&typeof G.markComponentRenderStopped=="function"&&G.markComponentRenderStopped()}function wg(e){G!==null&&typeof G.markComponentPassiveEffectMountStarted=="function"&&G.markComponentPassiveEffectMountStarted(e)}function Yg(){G!==null&&typeof G.markComponentPassiveEffectMountStopped=="function"&&G.markComponentPassiveEffectMountStopped()}function qg(e){G!==null&&typeof G.markComponentPassiveEffectUnmountStarted=="function"&&G.markComponentPassiveEffectUnmountStarted(e)}function Qg(){G!==null&&typeof G.markComponentPassiveEffectUnmountStopped=="function"&&G.markComponentPassiveEffectUnmountStopped()}function Pg(e){G!==null&&typeof G.markComponentLayoutEffectMountStarted=="function"&&G.markComponentLayoutEffectMountStarted(e)}function Gg(){G!==null&&typeof G.markComponentLayoutEffectMountStopped=="function"&&G.markComponentLayoutEffectMountStopped()}function Pv(e){G!==null&&typeof G.markComponentLayoutEffectUnmountStarted=="function"&&G.markComponentLayoutEffectUnmountStarted(e)}function Gv(){G!==null&&typeof G.markComponentLayoutEffectUnmountStopped=="function"&&G.markComponentLayoutEffectUnmountStopped()}function Kg(e,t,n){G!==null&&typeof G.markComponentErrored=="function"&&G.markComponentErrored(e,t,n)}function kg(e,t,n){G!==null&&typeof G.markComponentSuspended=="function"&&G.markComponentSuspended(e,t,n)}function Wg(e){G!==null&&typeof G.markLayoutEffectsStarted=="function"&&G.markLayoutEffectsStarted(e)}function Xg(){G!==null&&typeof G.markLayoutEffectsStopped=="function"&&G.markLayoutEffectsStopped()}function Jg(e){G!==null&&typeof G.markPassiveEffectsStarted=="function"&&G.markPassiveEffectsStarted(e)}function Zg(){G!==null&&typeof G.markPassiveEffectsStopped=="function"&&G.markPassiveEffectsStopped()}function Kv(e){G!==null&&typeof G.markRenderStarted=="function"&&G.markRenderStarted(e)}function Ig(){G!==null&&typeof G.markRenderYielded=="function"&&G.markRenderYielded()}function kv(){G!==null&&typeof G.markRenderStopped=="function"&&G.markRenderStopped()}function $g(e){G!==null&&typeof G.markRenderScheduled=="function"&&G.markRenderScheduled(e)}function eb(e,t){G!==null&&typeof G.markForceUpdateScheduled=="function"&&G.markForceUpdateScheduled(e,t)}function Cc(e,t){G!==null&&typeof G.markStateUpdateScheduled=="function"&&G.markStateUpdateScheduled(e,t)}function tb(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ra=typeof Object.is=="function"?Object.is:tb,Pr=null,xc=!1,Dc=!1;function Wv(e){Pr===null?Pr=[e]:Pr.push(e)}function nb(e){xc=!0,Wv(e)}function Xv(){xc&&Er()}function Er(){if(!Dc&&Pr!==null){Dc=!0;var e=0,t=$a();try{var n=!0,a=Pr;for(rn(br);e<a.length;e++){var r=a[e];do r=r(n);while(r!==null)}Pr=null,xc=!1}catch(i){throw Pr!==null&&(Pr=Pr.slice(e+1)),wv(io,Er),i}finally{rn(t),Dc=!1}}return null}function Jv(e){var t=e.current.memoizedState;return t.isDehydrated}var ou=[],su=0,uo=null,lo=0,Fa=[],Ba=0,Li=null,Gr=1,Kr="";function ab(e){return ji(),(e.flags&d)!==X}function rb(e){return ji(),lo}function ib(){var e=Kr,t=Gr,n=t&~ub(t);return n.toString(32)+e}function Hi(e,t){ji(),ou[su++]=lo,ou[su++]=uo,uo=e,lo=t}function Zv(e,t,n){ji(),Fa[Ba++]=Gr,Fa[Ba++]=Kr,Fa[Ba++]=Li,Li=e;var a=Gr,r=Kr,i=oo(a)-1,u=a&~(1<<i),o=n+1,s=oo(t)+i;if(s>30){var f=i-i%5,m=(1<<f)-1,b=(u&m).toString(32),C=u>>f,U=i-f,L=oo(t)+U,M=o<<U,J=M|C,ve=b+r;Gr=1<<L|J,Kr=ve}else{var re=o<<i,Ze=re|u,Ye=r;Gr=1<<s|Ze,Kr=Ye}}function _c(e){ji();var t=e.return;if(t!==null){var n=1,a=0;Hi(e,n),Zv(e,n,a)}}function oo(e){return 32-_v(e)}function ub(e){return 1<<oo(e)-1}function Oc(e){for(;e===uo;)uo=ou[--su],ou[su]=null,lo=ou[--su],ou[su]=null;for(;e===Li;)Li=Fa[--Ba],Fa[Ba]=null,Kr=Fa[--Ba],Fa[Ba]=null,Gr=Fa[--Ba],Fa[Ba]=null}function lb(){return ji(),Li!==null?{id:Gr,overflow:Kr}:null}function ob(e,t){ji(),Fa[Ba++]=Gr,Fa[Ba++]=Kr,Fa[Ba++]=Li,Gr=t.id,Kr=t.overflow,Li=e}function ji(){yn()||h("Expected to be hydrating. This is a bug in React. Please file an issue.")}var hn=null,Va=null,tr=!1,si=!1,ci=null;function sb(){tr&&h("We should not be hydrating here. This is a bug in React. Please file a bug.")}function Iv(){si=!0}function cb(){return si}function fb(e){if(!Dt)return!1;var t=e.stateNode.containerInfo;return Va=ws(t),hn=e,tr=!0,ci=null,si=!1,!0}function db(e,t,n){return Dt?(Va=Kl(t),hn=e,tr=!0,ci=null,si=!1,n!==null&&ob(e,n),!0):!1}function $v(e,t){switch(e.tag){case oe:{qy(e.stateNode.containerInfo,t);break}case ne:{var n=(e.mode&Ge)!==fe;Py(e.type,e.memoizedProps,e.stateNode,t,n);break}case je:{var a=e.memoizedState;a.dehydrated!==null&&Qy(a.dehydrated,t);break}}}function ep(e,t){$v(e,t);var n=VT();n.stateNode=t,n.return=e;var a=e.deletions;a===null?(e.deletions=[n],e.flags|=Vt):a.push(n)}function Nc(e,t){{if(si)return;switch(e.tag){case oe:{var n=e.stateNode.containerInfo;switch(t.tag){case ne:var a=t.type,r=t.pendingProps;Gy(n,a,r);break;case be:var i=t.pendingProps;Ky(n,i);break;case je:ky(n);break}break}case ne:{var u=e.type,o=e.memoizedProps,s=e.stateNode;switch(t.tag){case ne:{var f=t.type,m=t.pendingProps,b=(e.mode&Ge)!==fe;Zy(u,o,s,f,m,b);break}case be:{var C=t.pendingProps,U=(e.mode&Ge)!==fe;Iy(u,o,s,C,U);break}case je:{$y(u,o,s);break}}break}case je:{var L=e.memoizedState,M=L.dehydrated;if(M!==null)switch(t.tag){case ne:var J=t.type,ve=t.pendingProps;Wy(M,J,ve);break;case be:var re=t.pendingProps;Xy(M,re);break;case je:Jy(M);break}break}default:return}}}function tp(e,t){t.flags=t.flags&~dn|Qe,Nc(e,t)}function np(e,t){switch(e.tag){case ne:{var n=e.type,a=e.pendingProps,r=pt(t,n,a);return r!==null?(e.stateNode=r,hn=e,Va=Gl(r),!0):!1}case be:{var i=e.pendingProps,u=ht(t,i);return u!==null?(e.stateNode=u,hn=e,Va=null,!0):!1}case je:{var o=_t(t);if(o!==null){var s={dehydrated:o,treeContext:lb(),retryLane:Ea};e.memoizedState=s;var f=wT(o);return f.return=e,e.child=f,hn=e,Va=null,!0}return!1}default:return!1}}function Uc(e){return(e.mode&Ge)!==fe&&(e.flags&Le)===X}function Mc(e){throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.")}function zc(e){if(tr){var t=Va;if(!t){Uc(e)&&(Nc(hn,e),Mc()),tp(hn,e),tr=!1,hn=e;return}var n=t;if(!np(e,t)){Uc(e)&&(Nc(hn,e),Mc()),t=Ii(n);var a=hn;if(!t||!np(e,t)){tp(hn,e),tr=!1,hn=e;return}ep(a,n)}}}function vb(e,t,n){if(!Dt)throw new Error("Expected prepareToHydrateHostInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");var a=e.stateNode,r=!si,i=Ys(a,e.type,e.memoizedProps,t,n,e,r);return e.updateQueue=i,i!==null}function pb(e){if(!Dt)throw new Error("Expected prepareToHydrateHostTextInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");var t=e.stateNode,n=e.memoizedProps,a=!si,r=zy(t,n,e,a);if(r){var i=hn;if(i!==null)switch(i.tag){case oe:{var u=i.stateNode.containerInfo,o=(i.mode&Ge)!==fe;wy(u,t,n,o);break}case ne:{var s=i.type,f=i.memoizedProps,m=i.stateNode,b=(i.mode&Ge)!==fe;Yy(s,f,m,t,n,b);break}}}return r}function mb(e){if(!Dt)throw new Error("Expected prepareToHydrateHostSuspenseInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");var t=e.memoizedState,n=t!==null?t.dehydrated:null;if(!n)throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");Ay(n,e)}function hb(e){if(!Dt)throw new Error("Expected skipPastDehydratedSuspenseInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");var t=e.memoizedState,n=t!==null?t.dehydrated:null;if(!n)throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");return Ly(n)}function ap(e){for(var t=e.return;t!==null&&t.tag!==ne&&t.tag!==oe&&t.tag!==je;)t=t.return;hn=t}function so(e){if(!Dt||e!==hn)return!1;if(!tr)return ap(e),tr=!0,!1;if(e.tag!==oe&&(e.tag!==ne||Vy(e.type)&&!ai(e.type,e.memoizedProps))){var t=Va;if(t)if(Uc(e))rp(e),Mc();else for(;t;)ep(e,t),t=Ii(t)}return ap(e),e.tag===je?Va=hb(e):Va=hn?Ii(e.stateNode):null,!0}function yb(){return tr&&Va!==null}function rp(e){for(var t=Va;t;)$v(e,t),t=Ii(t)}function cu(){Dt&&(hn=null,Va=null,tr=!1,si=!1)}function ip(){ci!==null&&(rh(ci),ci=null)}function yn(){return tr}function Ac(e){ci===null?ci=[e]:ci.push(e)}var gb=z.ReactCurrentBatchConfig,bb=null;function Sb(){return gb.transition}function co(e,t){if(Ra(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),a=Object.keys(t);if(n.length!==a.length)return!1;for(var r=0;r<n.length;r++){var i=n[r];if(!bv.call(t,i)||!Ra(e[i],t[i]))return!1}return!0}function Eb(e){var t=e._debugOwner?e._debugOwner.type:null,n=e._debugSource;switch(e.tag){case ne:return li(e.type);case Tt:return li("Lazy");case je:return li("Suspense");case gt:return li("SuspenseList");case Ue:case $t:case Ae:return Ks(e.type);case ze:return Ks(e.type.render);case pe:return rg(e.type);default:return""}}function up(e){try{var t="",n=e;do t+=Eb(n),n=n.return;while(n);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var lp=z.ReactDebugCurrentFrame,Ca=null,Xu=!1;function Tb(){{if(Ca===null)return null;var e=Ca._debugOwner;if(e!==null&&typeof e!="undefined")return I(e)}return null}function Rb(){return Ca===null?"":up(Ca)}function Pn(){lp.getCurrentStack=null,Ca=null,Xu=!1}function jt(e){lp.getCurrentStack=e===null?null:Rb,Ca=e,Xu=!1}function Cb(){return Ca}function Tr(e){Xu=e}var nr={recordUnsafeLifecycleWarnings:function(e,t){},flushPendingUnsafeLifecycleWarnings:function(){},recordLegacyContextWarning:function(e,t){},flushLegacyContextWarning:function(){},discardPendingWarnings:function(){}};{var xb=function(e){for(var t=null,n=e;n!==null;)n.mode&Ot&&(t=n),n=n.return;return t},Fi=function(e){var t=[];return e.forEach(function(n){t.push(n)}),t.sort().join(", ")},Ju=[],Zu=[],Iu=[],$u=[],el=[],tl=[],Bi=new Set;nr.recordUnsafeLifecycleWarnings=function(e,t){Bi.has(e.type)||(typeof t.componentWillMount=="function"&&t.componentWillMount.__suppressDeprecationWarning!==!0&&Ju.push(e),e.mode&Ot&&typeof t.UNSAFE_componentWillMount=="function"&&Zu.push(e),typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps.__suppressDeprecationWarning!==!0&&Iu.push(e),e.mode&Ot&&typeof t.UNSAFE_componentWillReceiveProps=="function"&&$u.push(e),typeof t.componentWillUpdate=="function"&&t.componentWillUpdate.__suppressDeprecationWarning!==!0&&el.push(e),e.mode&Ot&&typeof t.UNSAFE_componentWillUpdate=="function"&&tl.push(e))},nr.flushPendingUnsafeLifecycleWarnings=function(){var e=new Set;Ju.length>0&&(Ju.forEach(function(C){e.add(I(C)||"Component"),Bi.add(C.type)}),Ju=[]);var t=new Set;Zu.length>0&&(Zu.forEach(function(C){t.add(I(C)||"Component"),Bi.add(C.type)}),Zu=[]);var n=new Set;Iu.length>0&&(Iu.forEach(function(C){n.add(I(C)||"Component"),Bi.add(C.type)}),Iu=[]);var a=new Set;$u.length>0&&($u.forEach(function(C){a.add(I(C)||"Component"),Bi.add(C.type)}),$u=[]);var r=new Set;el.length>0&&(el.forEach(function(C){r.add(I(C)||"Component"),Bi.add(C.type)}),el=[]);var i=new Set;if(tl.length>0&&(tl.forEach(function(C){i.add(I(C)||"Component"),Bi.add(C.type)}),tl=[]),t.size>0){var u=Fi(t);h(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`,u)}if(a.size>0){var o=Fi(a);h(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`,o)}if(i.size>0){var s=Fi(i);h(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`,s)}if(e.size>0){var f=Fi(e);j(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,f)}if(n.size>0){var m=Fi(n);j(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,m)}if(r.size>0){var b=Fi(r);j(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,b)}};var fo=new Map,op=new Set;nr.recordLegacyContextWarning=function(e,t){var n=xb(e);if(n===null){h("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");return}if(!op.has(e.type)){var a=fo.get(n);(e.type.contextTypes!=null||e.type.childContextTypes!=null||t!==null&&typeof t.getChildContext=="function")&&(a===void 0&&(a=[],fo.set(n,a)),a.push(e))}},nr.flushLegacyContextWarning=function(){fo.forEach(function(e,t){if(e.length!==0){var n=e[0],a=new Set;e.forEach(function(i){a.add(I(i)||"Component"),op.add(i.type)});var r=Fi(a);try{jt(n),h(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`,r)}finally{Pn()}}})},nr.discardPendingWarnings=function(){Ju=[],Zu=[],Iu=[],$u=[],el=[],tl=[],fo=new Map}}function sp(e){{var t=typeof Symbol=="function"&&Symbol.toStringTag,n=t&&e[Symbol.toStringTag]||e.constructor.name||"Object";return n}}function cp(e){try{return Lc(e),!1}catch(t){return!0}}function Lc(e){return""+e}function Db(e){if(cp(e))return h("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",sp(e)),Lc(e)}function _b(e,t){if(cp(e))return h("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.",t,sp(e)),Lc(e)}var Hc,jc,Fc,Bc,Vc,fp=function(e,t){};Hc=!1,jc=!1,Fc={},Bc={},Vc={},fp=function(e,t){if(!(e===null||typeof e!="object")&&!(!e._store||e._store.validated||e.key!=null)){if(typeof e._store!="object")throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");e._store.validated=!0;var n=I(t)||"Component";Bc[n]||(Bc[n]=!0,h('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'))}};function Ob(e){return e.prototype&&e.prototype.isReactComponent}function nl(e,t,n){var a=n.ref;if(a!==null&&typeof a!="function"&&typeof a!="object"){if((e.mode&Ot||De)&&!(n._owner&&n._self&&n._owner.stateNode!==n._self)&&!(n._owner&&n._owner.tag!==pe)&&!(typeof n.type=="function"&&!Ob(n.type))&&n._owner){var r=I(e)||"Component";Fc[r]||(h('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',r,a),Fc[r]=!0)}if(n._owner){var i=n._owner,u;if(i){var o=i;if(o.tag!==pe)throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");u=o.stateNode}if(!u)throw new Error("Missing owner for string ref "+a+". This error is likely caused by a bug in React. Please file an issue.");var s=u;_b(a,"ref");var f=""+a;if(t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===f)return t.ref;var m=function(b){var C=s.refs;b===null?delete C[f]:C[f]=b};return m._stringRef=f,m}else{if(typeof a!="string")throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");if(!n._owner)throw new Error("Element ref was specified as a string ("+a+`) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`)}}return a}function vo(e,t){var n=Object.prototype.toString.call(t);throw new Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.")}function po(e){{var t=I(e)||"Component";if(Vc[t])return;Vc[t]=!0,h("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.")}}function dp(e){var t=e._payload,n=e._init;return n(t)}function vp(e){function t(E,O){if(e){var S=E.deletions;S===null?(E.deletions=[O],E.flags|=Vt):S.push(O)}}function n(E,O){if(!e)return null;for(var S=O;S!==null;)t(E,S),S=S.sibling;return null}function a(E,O){for(var S=new Map,F=O;F!==null;)F.key!==null?S.set(F.key,F):S.set(F.index,F),F=F.sibling;return S}function r(E,O){var S=ki(E,O);return S.index=0,S.sibling=null,S}function i(E,O,S){if(E.index=S,!e)return E.flags|=d,O;var F=E.alternate;if(F!==null){var ee=F.index;return ee<O?(E.flags|=Qe,O):ee}else return E.flags|=Qe,O}function u(E){return e&&E.alternate===null&&(E.flags|=Qe),E}function o(E,O,S,F){if(O===null||O.tag!==be){var ee=Fd(S,E.mode,F);return ee.return=E,ee}else{var W=r(O,S);return W.return=E,W}}function s(E,O,S,F){var ee=S.type;if(ee===Vn)return m(E,O,S.props.children,F,S.key);if(O!==null&&(O.elementType===ee||bh(O,S)||typeof ee=="object"&&ee!==null&&ee.$$typeof===rt&&dp(ee)===O.type)){var W=r(O,S.props);return W.ref=nl(E,O,S),W.return=E,W._debugSource=S._source,W._debugOwner=S._owner,W}var Ve=jd(S,E.mode,F);return Ve.ref=nl(E,O,S),Ve.return=E,Ve}function f(E,O,S,F){if(O===null||O.tag!==Me||O.stateNode.containerInfo!==S.containerInfo||O.stateNode.implementation!==S.implementation){var ee=Bd(S,E.mode,F);return ee.return=E,ee}else{var W=r(O,S.children||[]);return W.return=E,W}}function m(E,O,S,F,ee){if(O===null||O.tag!==xe){var W=Si(S,E.mode,F,ee);return W.return=E,W}else{var Ve=r(O,S);return Ve.return=E,Ve}}function b(E,O,S){if(typeof O=="string"&&O!==""||typeof O=="number"){var F=Fd(""+O,E.mode,S);return F.return=E,F}if(typeof O=="object"&&O!==null){switch(O.$$typeof){case sn:{var ee=jd(O,E.mode,S);return ee.ref=nl(E,null,O),ee.return=E,ee}case cn:{var W=Bd(O,E.mode,S);return W.return=E,W}case rt:{var Ve=O._payload,ye=O._init;return b(E,ye(Ve),S)}}if(Kt(O)||Q(O)){var We=Si(O,E.mode,S,null);return We.return=E,We}vo(E,O)}return typeof O=="function"&&po(E),null}function C(E,O,S,F){var ee=O!==null?O.key:null;if(typeof S=="string"&&S!==""||typeof S=="number")return ee!==null?null:o(E,O,""+S,F);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case sn:return S.key===ee?s(E,O,S,F):null;case cn:return S.key===ee?f(E,O,S,F):null;case rt:{var W=S._payload,Ve=S._init;return C(E,O,Ve(W),F)}}if(Kt(S)||Q(S))return ee!==null?null:m(E,O,S,F,null);vo(E,S)}return typeof S=="function"&&po(E),null}function U(E,O,S,F,ee){if(typeof F=="string"&&F!==""||typeof F=="number"){var W=E.get(S)||null;return o(O,W,""+F,ee)}if(typeof F=="object"&&F!==null){switch(F.$$typeof){case sn:{var Ve=E.get(F.key===null?S:F.key)||null;return s(O,Ve,F,ee)}case cn:{var ye=E.get(F.key===null?S:F.key)||null;return f(O,ye,F,ee)}case rt:var We=F._payload,He=F._init;return U(E,O,S,He(We),ee)}if(Kt(F)||Q(F)){var ft=E.get(S)||null;return m(O,ft,F,ee,null)}vo(O,F)}return typeof F=="function"&&po(O),null}function L(E,O,S){{if(typeof E!="object"||E===null)return O;switch(E.$$typeof){case sn:case cn:fp(E,S);var F=E.key;if(typeof F!="string")break;if(O===null){O=new Set,O.add(F);break}if(!O.has(F)){O.add(F);break}h("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted \u2014 the behavior is unsupported and could change in a future version.",F);break;case rt:var ee=E._payload,W=E._init;L(W(ee),O,S);break}}return O}function M(E,O,S,F){for(var ee=null,W=0;W<S.length;W++){var Ve=S[W];ee=L(Ve,ee,E)}for(var ye=null,We=null,He=O,ft=0,le=0,Nt=null;He!==null&&le<S.length;le++){He.index>le?(Nt=He,He=null):Nt=He.sibling;var Hn=C(E,He,S[le],F);if(Hn===null){He===null&&(He=Nt);break}e&&He&&Hn.alternate===null&&t(E,He),ft=i(Hn,ft,le),We===null?ye=Hn:We.sibling=Hn,We=Hn,He=Nt}if(le===S.length){if(n(E,He),yn()){var Rn=le;Hi(E,Rn)}return ye}if(He===null){for(;le<S.length;le++){var Da=b(E,S[le],F);Da!==null&&(ft=i(Da,ft,le),We===null?ye=Da:We.sibling=Da,We=Da)}if(yn()){var Wn=le;Hi(E,Wn)}return ye}for(var Xn=a(E,He);le<S.length;le++){var jn=U(Xn,E,le,S[le],F);jn!==null&&(e&&jn.alternate!==null&&Xn.delete(jn.key===null?le:jn.key),ft=i(jn,ft,le),We===null?ye=jn:We.sibling=jn,We=jn)}if(e&&Xn.forEach(function(Nu){return t(E,Nu)}),yn()){var Zr=le;Hi(E,Zr)}return ye}function J(E,O,S,F){var ee=Q(S);if(typeof ee!="function")throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");{typeof Symbol=="function"&&S[Symbol.toStringTag]==="Generator"&&(jc||h("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."),jc=!0),S.entries===ee&&(Hc||h("Using Maps as children is not supported. Use an array of keyed ReactElements instead."),Hc=!0);var W=ee.call(S);if(W)for(var Ve=null,ye=W.next();!ye.done;ye=W.next()){var We=ye.value;Ve=L(We,Ve,E)}}var He=ee.call(S);if(He==null)throw new Error("An iterable object provided no iterator.");for(var ft=null,le=null,Nt=O,Hn=0,Rn=0,Da=null,Wn=He.next();Nt!==null&&!Wn.done;Rn++,Wn=He.next()){Nt.index>Rn?(Da=Nt,Nt=null):Da=Nt.sibling;var Xn=C(E,Nt,Wn.value,F);if(Xn===null){Nt===null&&(Nt=Da);break}e&&Nt&&Xn.alternate===null&&t(E,Nt),Hn=i(Xn,Hn,Rn),le===null?ft=Xn:le.sibling=Xn,le=Xn,Nt=Da}if(Wn.done){if(n(E,Nt),yn()){var jn=Rn;Hi(E,jn)}return ft}if(Nt===null){for(;!Wn.done;Rn++,Wn=He.next()){var Zr=b(E,Wn.value,F);Zr!==null&&(Hn=i(Zr,Hn,Rn),le===null?ft=Zr:le.sibling=Zr,le=Zr)}if(yn()){var Nu=Rn;Hi(E,Nu)}return ft}for(var jl=a(E,Nt);!Wn.done;Rn++,Wn=He.next()){var Ar=U(jl,E,Rn,Wn.value,F);Ar!==null&&(e&&Ar.alternate!==null&&jl.delete(Ar.key===null?Rn:Ar.key),Hn=i(Ar,Hn,Rn),le===null?ft=Ar:le.sibling=Ar,le=Ar)}if(e&&jl.forEach(function(iR){return t(E,iR)}),yn()){var rR=Rn;Hi(E,rR)}return ft}function ve(E,O,S,F){if(O!==null&&O.tag===be){n(E,O.sibling);var ee=r(O,S);return ee.return=E,ee}n(E,O);var W=Fd(S,E.mode,F);return W.return=E,W}function re(E,O,S,F){for(var ee=S.key,W=O;W!==null;){if(W.key===ee){var Ve=S.type;if(Ve===Vn){if(W.tag===xe){n(E,W.sibling);var ye=r(W,S.props.children);return ye.return=E,ye._debugSource=S._source,ye._debugOwner=S._owner,ye}}else if(W.elementType===Ve||bh(W,S)||typeof Ve=="object"&&Ve!==null&&Ve.$$typeof===rt&&dp(Ve)===W.type){n(E,W.sibling);var We=r(W,S.props);return We.ref=nl(E,W,S),We.return=E,We._debugSource=S._source,We._debugOwner=S._owner,We}n(E,W);break}else t(E,W);W=W.sibling}if(S.type===Vn){var He=Si(S.props.children,E.mode,F,S.key);return He.return=E,He}else{var ft=jd(S,E.mode,F);return ft.ref=nl(E,O,S),ft.return=E,ft}}function Ze(E,O,S,F){for(var ee=S.key,W=O;W!==null;){if(W.key===ee)if(W.tag===Me&&W.stateNode.containerInfo===S.containerInfo&&W.stateNode.implementation===S.implementation){n(E,W.sibling);var Ve=r(W,S.children||[]);return Ve.return=E,Ve}else{n(E,W);break}else t(E,W);W=W.sibling}var ye=Bd(S,E.mode,F);return ye.return=E,ye}function Ye(E,O,S,F){var ee=typeof S=="object"&&S!==null&&S.type===Vn&&S.key===null;if(ee&&(S=S.props.children),typeof S=="object"&&S!==null){switch(S.$$typeof){case sn:return u(re(E,O,S,F));case cn:return u(Ze(E,O,S,F));case rt:var W=S._payload,Ve=S._init;return Ye(E,O,Ve(W),F)}if(Kt(S))return M(E,O,S,F);if(Q(S))return J(E,O,S,F);vo(E,S)}return typeof S=="string"&&S!==""||typeof S=="number"?u(ve(E,O,""+S,F)):(typeof S=="function"&&po(E),n(E,O))}return Ye}var fu=vp(!0),pp=vp(!1);function Nb(e,t){if(e!==null&&t.child!==e.child)throw new Error("Resuming work not yet implemented.");if(t.child!==null){var n=t.child,a=ki(n,n.pendingProps);for(t.child=a,a.return=t;n.sibling!==null;)n=n.sibling,a=a.sibling=ki(n,n.pendingProps),a.return=t;a.sibling=null}}function Ub(e,t){for(var n=e.child;n!==null;)LT(n,t),n=n.sibling}var mo=oi(null),al;al={};var ho=null,du=null,wc=null,yo=!1;function go(){ho=null,du=null,wc=null,yo=!1}function mp(){yo=!0}function hp(){yo=!1}function yp(e,t,n){pr?(pn(mo,t._currentValue,e),t._currentValue=n,t._currentRenderer!==void 0&&t._currentRenderer!==null&&t._currentRenderer!==al&&h("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."),t._currentRenderer=al):(pn(mo,t._currentValue2,e),t._currentValue2=n,t._currentRenderer2!==void 0&&t._currentRenderer2!==null&&t._currentRenderer2!==al&&h("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."),t._currentRenderer2=al)}function Yc(e,t){var n=mo.current;zn(mo,t),pr?e._currentValue=n:e._currentValue2=n}function qc(e,t,n){for(var a=e;a!==null;){var r=a.alternate;if(iu(a.childLanes,t)?r!==null&&!iu(r.childLanes,t)&&(r.childLanes=Oe(r.childLanes,t)):(a.childLanes=Oe(a.childLanes,t),r!==null&&(r.childLanes=Oe(r.childLanes,t))),a===n)break;a=a.return}a!==n&&h("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.")}function Mb(e,t,n){zb(e,t,n)}function zb(e,t,n){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var r=void 0,i=a.dependencies;if(i!==null){r=a.child;for(var u=i.firstContext;u!==null;){if(u.context===t){if(a.tag===pe){var o=Qu(n),s=kr(mt,o);s.tag=So;var f=a.updateQueue;if(f!==null){var m=f.shared,b=m.pending;b===null?s.next=s:(s.next=b.next,b.next=s),m.pending=s}}a.lanes=Oe(a.lanes,n);var C=a.alternate;C!==null&&(C.lanes=Oe(C.lanes,n)),qc(a.return,n,e),i.lanes=Oe(i.lanes,n);break}u=u.next}}else if(a.tag===St)r=a.type===e.type?null:a.child;else if(a.tag===Fn){var U=a.return;if(U===null)throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");U.lanes=Oe(U.lanes,n);var L=U.alternate;L!==null&&(L.lanes=Oe(L.lanes,n)),qc(U,n,e),r=a.sibling}else r=a.child;if(r!==null)r.return=a;else for(r=a;r!==null;){if(r===e){r=null;break}var M=r.sibling;if(M!==null){M.return=r.return,r=M;break}r=r.return}a=r}}function vu(e,t){ho=e,du=null,wc=null;var n=e.dependencies;if(n!==null){var a=n.firstContext;a!==null&&(Ta(n.lanes,t)&&bl(),n.firstContext=null)}}function Yt(e){yo&&h("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");var t=pr?e._currentValue:e._currentValue2;if(wc!==e){var n={context:e,memoizedValue:t,next:null};if(du===null){if(ho===null)throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");du=n,ho.dependencies={lanes:H,firstContext:n}}else du=du.next=n}return t}var Vi=null;function Qc(e){Vi===null?Vi=[e]:Vi.push(e)}function Ab(){if(Vi!==null){for(var e=0;e<Vi.length;e++){var t=Vi[e],n=t.interleaved;if(n!==null){t.interleaved=null;var a=n.next,r=t.pending;if(r!==null){var i=r.next;r.next=a,n.next=i}t.pending=n}}Vi=null}}function gp(e,t,n,a){var r=t.interleaved;return r===null?(n.next=n,Qc(t)):(n.next=r.next,r.next=n),t.interleaved=n,bo(e,a)}function Lb(e,t,n,a){var r=t.interleaved;r===null?(n.next=n,Qc(t)):(n.next=r.next,r.next=n),t.interleaved=n}function Hb(e,t,n,a){var r=t.interleaved;return r===null?(n.next=n,Qc(t)):(n.next=r.next,r.next=n),t.interleaved=n,bo(e,a)}function Gn(e,t){return bo(e,t)}var jb=bo;function bo(e,t){e.lanes=Oe(e.lanes,t);var n=e.alternate;n!==null&&(n.lanes=Oe(n.lanes,t)),n===null&&(e.flags&(Qe|dn))!==X&&mh(e);for(var a=e,r=e.return;r!==null;)r.childLanes=Oe(r.childLanes,t),n=r.alternate,n!==null?n.childLanes=Oe(n.childLanes,t):(r.flags&(Qe|dn))!==X&&mh(e),a=r,r=r.return;if(a.tag===oe){var i=a.stateNode;return i}else return null}var bp=0,Sp=1,So=2,Pc=3,Eo=!1,Gc,To;Gc=!1,To=null;function Kc(e){var t={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:H},effects:null};e.updateQueue=t}function Ep(e,t){var n=t.updateQueue,a=e.updateQueue;if(n===a){var r={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects};t.updateQueue=r}}function kr(e,t){var n={eventTime:e,lane:t,tag:bp,payload:null,callback:null,next:null};return n}function fi(e,t,n){var a=e.updateQueue;if(a===null)return null;var r=a.shared;if(To===r&&!Gc&&(h("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."),Gc=!0),kE()){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,jb(e,n)}else return Hb(e,r,t,n)}function Ro(e,t,n){var a=t.updateQueue;if(a!==null){var r=a.shared;if(Mv(n)){var i=r.lanes;i=Av(i,e.pendingLanes);var u=Oe(i,n);r.lanes=u,Tc(e,u)}}}function kc(e,t){var n=e.updateQueue,a=e.alternate;if(a!==null){var r=a.updateQueue;if(n===r){var i=null,u=null,o=n.firstBaseUpdate;if(o!==null){var s=o;do{var f={eventTime:s.eventTime,lane:s.lane,tag:s.tag,payload:s.payload,callback:s.callback,next:null};u===null?i=u=f:(u.next=f,u=f),s=s.next}while(s!==null);u===null?i=u=t:(u.next=t,u=t)}else i=u=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:u,shared:r.shared,effects:r.effects},e.updateQueue=n;return}}var m=n.lastBaseUpdate;m===null?n.firstBaseUpdate=t:m.next=t,n.lastBaseUpdate=t}function Fb(e,t,n,a,r,i){switch(n.tag){case Sp:{var u=n.payload;if(typeof u=="function"){mp();var o=u.call(i,a,r);{if(e.mode&Ot){ln(!0);try{u.call(i,a,r)}finally{ln(!1)}}hp()}return o}return u}case Pc:e.flags=e.flags&~Rt|Le;case bp:{var s=n.payload,f;if(typeof s=="function"){mp(),f=s.call(i,a,r);{if(e.mode&Ot){ln(!0);try{s.call(i,a,r)}finally{ln(!1)}}hp()}}else f=s;return f==null?a:K({},a,f)}case So:return Eo=!0,a}return a}function Co(e,t,n,a){var r=e.updateQueue;Eo=!1,To=r.shared;var i=r.firstBaseUpdate,u=r.lastBaseUpdate,o=r.shared.pending;if(o!==null){r.shared.pending=null;var s=o,f=s.next;s.next=null,u===null?i=f:u.next=f,u=s;var m=e.alternate;if(m!==null){var b=m.updateQueue,C=b.lastBaseUpdate;C!==u&&(C===null?b.firstBaseUpdate=f:C.next=f,b.lastBaseUpdate=s)}}if(i!==null){var U=r.baseState,L=H,M=null,J=null,ve=null,re=i;do{var Ze=re.lane,Ye=re.eventTime;if(iu(a,Ze)){if(ve!==null){var O={eventTime:Ye,lane:an,tag:re.tag,payload:re.payload,callback:re.callback,next:null};ve=ve.next=O}U=Fb(e,r,re,U,t,n);var S=re.callback;if(S!==null&&re.lane!==an){e.flags|=Ka;var F=r.effects;F===null?r.effects=[re]:F.push(re)}}else{var E={eventTime:Ye,lane:Ze,tag:re.tag,payload:re.payload,callback:re.callback,next:null};ve===null?(J=ve=E,M=U):ve=ve.next=E,L=Oe(L,Ze)}if(re=re.next,re===null){if(o=r.shared.pending,o===null)break;var ee=o,W=ee.next;ee.next=null,re=W,r.lastBaseUpdate=ee,r.shared.pending=null}}while(!0);ve===null&&(M=U),r.baseState=M,r.firstBaseUpdate=J,r.lastBaseUpdate=ve;var Ve=r.shared.interleaved;if(Ve!==null){var ye=Ve;do L=Oe(L,ye.lane),ye=ye.next;while(ye!==Ve)}else i===null&&(r.shared.lanes=H);Al(L),e.lanes=L,e.memoizedState=U}To=null}function Bb(e,t){if(typeof e!="function")throw new Error("Invalid argument passed as callback. Expected a function. Instead "+("received: "+e));e.call(t)}function Tp(){Eo=!1}function xo(){return Eo}function Rp(e,t,n){var a=t.effects;if(t.effects=null,a!==null)for(var r=0;r<a.length;r++){var i=a[r],u=i.callback;u!==null&&(i.callback=null,Bb(u,n))}}var rl={},di=oi(rl),il=oi(rl),Do=oi(rl);function _o(e){if(e===rl)throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");return e}function Wc(){var e=_o(Do.current);return e}function Xc(e,t){pn(Do,t,e),pn(il,e,e),pn(di,rl,e);var n=Di(t);zn(di,e),pn(di,n,e)}function pu(e){zn(di,e),zn(il,e),zn(Do,e)}function ul(){var e=_o(di.current);return e}function Cp(e){var t=_o(Do.current),n=_o(di.current),a=Wi(n,e.type,t);n!==a&&(pn(il,e,e),pn(di,a,e))}function Jc(e){il.current===e&&(zn(di,e),zn(il,e))}var Vb=0,xp=1,Dp=1,ll=2,ar=oi(Vb);function Zc(e,t){return(e&t)!==0}function mu(e){return e&xp}function Ic(e,t){return e&xp|t}function wb(e,t){return e|t}function vi(e,t){pn(ar,t,e)}function hu(e){zn(ar,e)}function Yb(e,t){var n=e.memoizedState;if(n!==null)return n.dehydrated!==null;var a=e.memoizedProps;return!0}function Oo(e){for(var t=e;t!==null;){if(t.tag===je){var n=t.memoizedState;if(n!==null){var a=n.dehydrated;if(a===null||wt(a)||ui(a))return t}}else if(t.tag===gt&&t.memoizedProps.revealOrder!==void 0){var r=(t.flags&Le)!==X;if(r)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)return null;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ia=0,kt=1,Rr=2,Wt=4,gn=8,$c=[];function ef(){for(var e=0;e<$c.length;e++){var t=$c[e];pr?t._workInProgressVersionPrimary=null:t._workInProgressVersionSecondary=null}$c.length=0}function qb(e,t){var n=t._getVersion,a=n(t._source);e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[t,a]:e.mutableSourceEagerHydrationData.push(t,a)}var k=z.ReactCurrentDispatcher,ol=z.ReactCurrentBatchConfig,tf,yu;tf=new Set;var wi=H,tt=null,Xt=null,Jt=null,No=!1,sl=!1,cl=0,Qb=0,Pb=25,N=null,wa=null,pi=-1,nf=!1;function Je(){{var e=N;wa===null?wa=[e]:wa.push(e)}}function P(){{var e=N;wa!==null&&(pi++,wa[pi]!==e&&Gb(e))}}function gu(e){e!=null&&!Kt(e)&&h("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.",N,typeof e)}function Gb(e){{var t=I(tt);if(!tf.has(t)&&(tf.add(t),wa!==null)){for(var n="",a=30,r=0;r<=pi;r++){for(var i=wa[r],u=r===pi?e:i,o=r+1+". "+i;o.length<a;)o+=" ";o+=u+`
`,n+=o}h(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`,t,n)}}}function An(){throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`)}function af(e,t){if(nf)return!1;if(t===null)return h("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.",N),!1;e.length!==t.length&&h(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`,N,"["+t.join(", ")+"]","["+e.join(", ")+"]");for(var n=0;n<t.length&&n<e.length;n++)if(!Ra(e[n],t[n]))return!1;return!0}function bu(e,t,n,a,r,i){wi=i,tt=t,wa=e!==null?e._debugHookTypes:null,pi=-1,nf=e!==null&&e.type!==t.type,t.memoizedState=null,t.updateQueue=null,t.lanes=H,e!==null&&e.memoizedState!==null?k.current=Wp:wa!==null?k.current=kp:k.current=Kp;var u=n(a,r);if(sl){var o=0;do{if(sl=!1,cl=0,o>=Pb)throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");o+=1,nf=!1,Xt=null,Jt=null,t.updateQueue=null,pi=-1,k.current=Xp,u=n(a,r)}while(sl)}k.current=qo,t._debugHookTypes=wa;var s=Xt!==null&&Xt.next!==null;if(wi=H,tt=null,Xt=null,Jt=null,N=null,wa=null,pi=-1,e!==null&&(e.flags&Pe)!==(t.flags&Pe)&&(e.mode&Ge)!==fe&&h("Internal React error: Expected static flag was missing. Please notify the React team."),No=!1,s)throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");return u}function Su(){var e=cl!==0;return cl=0,e}function _p(e,t,n){t.updateQueue=e.updateQueue,(t.mode&yr)!==fe?t.flags&=~(Be|Te|At|se):t.flags&=~(At|se),e.lanes=ro(e.lanes,n)}function Op(){if(k.current=qo,No){for(var e=tt.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}No=!1}wi=H,tt=null,Xt=null,Jt=null,wa=null,pi=-1,N=null,Yp=!1,sl=!1,cl=0}function Cr(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Jt===null?tt.memoizedState=Jt=e:Jt=Jt.next=e,Jt}function Ya(){var e;if(Xt===null){var t=tt.alternate;t!==null?e=t.memoizedState:e=null}else e=Xt.next;var n;if(Jt===null?n=tt.memoizedState:n=Jt.next,n!==null)Jt=n,n=Jt.next,Xt=e;else{if(e===null)throw new Error("Rendered more hooks than during the previous render.");Xt=e;var a={memoizedState:Xt.memoizedState,baseState:Xt.baseState,baseQueue:Xt.baseQueue,queue:Xt.queue,next:null};Jt===null?tt.memoizedState=Jt=a:Jt=Jt.next=a}return Jt}function Np(){return{lastEffect:null,stores:null}}function rf(e,t){return typeof t=="function"?t(e):t}function uf(e,t,n){var a=Cr(),r;n!==void 0?r=n(t):r=t,a.memoizedState=a.baseState=r;var i={pending:null,interleaved:null,lanes:H,dispatch:null,lastRenderedReducer:e,lastRenderedState:r};a.queue=i;var u=i.dispatch=Xb.bind(null,tt,i);return[a.memoizedState,u]}function lf(e,t,n){var a=Ya(),r=a.queue;if(r===null)throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");r.lastRenderedReducer=e;var i=Xt,u=i.baseQueue,o=r.pending;if(o!==null){if(u!==null){var s=u.next,f=o.next;u.next=f,o.next=s}i.baseQueue!==u&&h("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."),i.baseQueue=u=o,r.pending=null}if(u!==null){var m=u.next,b=i.baseState,C=null,U=null,L=null,M=m;do{var J=M.lane;if(iu(wi,J)){if(L!==null){var re={lane:an,action:M.action,hasEagerState:M.hasEagerState,eagerState:M.eagerState,next:null};L=L.next=re}if(M.hasEagerState)b=M.eagerState;else{var Ze=M.action;b=e(b,Ze)}}else{var ve={lane:J,action:M.action,hasEagerState:M.hasEagerState,eagerState:M.eagerState,next:null};L===null?(U=L=ve,C=b):L=L.next=ve,tt.lanes=Oe(tt.lanes,J),Al(J)}M=M.next}while(M!==null&&M!==m);L===null?C=b:L.next=U,Ra(b,a.memoizedState)||bl(),a.memoizedState=b,a.baseState=C,a.baseQueue=L,r.lastRenderedState=b}var Ye=r.interleaved;if(Ye!==null){var E=Ye;do{var O=E.lane;tt.lanes=Oe(tt.lanes,O),Al(O),E=E.next}while(E!==Ye)}else u===null&&(r.lanes=H);var S=r.dispatch;return[a.memoizedState,S]}function of(e,t,n){var a=Ya(),r=a.queue;if(r===null)throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");r.lastRenderedReducer=e;var i=r.dispatch,u=r.pending,o=a.memoizedState;if(u!==null){r.pending=null;var s=u.next,f=s;do{var m=f.action;o=e(o,m),f=f.next}while(f!==s);Ra(o,a.memoizedState)||bl(),a.memoizedState=o,a.baseQueue===null&&(a.baseState=o),r.lastRenderedState=o}return[o,i]}function NR(e,t,n){}function UR(e,t,n){}function sf(e,t,n){var a=tt,r=Cr(),i,u=yn();if(u){if(n===void 0)throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");i=n(),yu||i!==n()&&(h("The result of getServerSnapshot should be cached to avoid an infinite loop"),yu=!0)}else{if(i=t(),!yu){var o=t();Ra(i,o)||(h("The result of getSnapshot should be cached to avoid an infinite loop"),yu=!0)}var s=ys();if(s===null)throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");ao(s,wi)||Up(a,t,i)}r.memoizedState=i;var f={value:i,getSnapshot:t};return r.queue=f,Lo(zp.bind(null,a,f,e),[e]),a.flags|=At,fl(kt|gn,Mp.bind(null,a,f,i,t),void 0,null),i}function Uo(e,t,n){var a=tt,r=Ya(),i=t();if(!yu){var u=t();Ra(i,u)||(h("The result of getSnapshot should be cached to avoid an infinite loop"),yu=!0)}var o=r.memoizedState,s=!Ra(o,i);s&&(r.memoizedState=i,bl());var f=r.queue;if(vl(zp.bind(null,a,f,e),[e]),f.getSnapshot!==t||s||Jt!==null&&Jt.memoizedState.tag&kt){a.flags|=At,fl(kt|gn,Mp.bind(null,a,f,i,t),void 0,null);var m=ys();if(m===null)throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");ao(m,wi)||Up(a,t,i)}return i}function Up(e,t,n){e.flags|=Na;var a={getSnapshot:t,value:n},r=tt.updateQueue;if(r===null)r=Np(),tt.updateQueue=r,r.stores=[a];else{var i=r.stores;i===null?r.stores=[a]:i.push(a)}}function Mp(e,t,n,a){t.value=n,t.getSnapshot=a,Ap(t)&&Lp(e)}function zp(e,t,n){var a=function(){Ap(t)&&Lp(e)};return n(a)}function Ap(e){var t=e.getSnapshot,n=e.value;try{var a=t();return!Ra(n,a)}catch(r){return!0}}function Lp(e){var t=Gn(e,he);t!==null&&Qt(t,e,he,mt)}function Mo(e){var t=Cr();typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e;var n={pending:null,interleaved:null,lanes:H,dispatch:null,lastRenderedReducer:rf,lastRenderedState:e};t.queue=n;var a=n.dispatch=Jb.bind(null,tt,n);return[t.memoizedState,a]}function cf(e){return lf(rf)}function ff(e){return of(rf)}function fl(e,t,n,a){var r={tag:e,create:t,destroy:n,deps:a,next:null},i=tt.updateQueue;if(i===null)i=Np(),tt.updateQueue=i,i.lastEffect=r.next=r;else{var u=i.lastEffect;if(u===null)i.lastEffect=r.next=r;else{var o=u.next;u.next=r,r.next=o,i.lastEffect=r}}return r}function df(e){var t=Cr();{var n={current:e};return t.memoizedState=n,n}}function zo(e){var t=Ya();return t.memoizedState}function dl(e,t,n,a){var r=Cr(),i=a===void 0?null:a;tt.flags|=e,r.memoizedState=fl(kt|t,n,void 0,i)}function Ao(e,t,n,a){var r=Ya(),i=a===void 0?null:a,u=void 0;if(Xt!==null){var o=Xt.memoizedState;if(u=o.destroy,i!==null){var s=o.deps;if(af(i,s)){r.memoizedState=fl(t,n,u,i);return}}}tt.flags|=e,r.memoizedState=fl(kt|t,n,u,i)}function Lo(e,t){return(tt.mode&yr)!==fe?dl(Be|At|ie,gn,e,t):dl(At|ie,gn,e,t)}function vl(e,t){return Ao(At,gn,e,t)}function vf(e,t){return dl(se,Rr,e,t)}function Ho(e,t){return Ao(se,Rr,e,t)}function pf(e,t){var n=se;return n|=Y,(tt.mode&yr)!==fe&&(n|=Te),dl(n,Wt,e,t)}function jo(e,t){return Ao(se,Wt,e,t)}function Hp(e,t){if(typeof t=="function"){var n=t,a=e();return n(a),function(){n(null)}}else if(t!=null){var r=t;r.hasOwnProperty("current")||h("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.","an object with keys {"+Object.keys(r).join(", ")+"}");var i=e();return r.current=i,function(){r.current=null}}}function mf(e,t,n){typeof t!="function"&&h("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",t!==null?typeof t:"null");var a=n!=null?n.concat([e]):null,r=se;return r|=Y,(tt.mode&yr)!==fe&&(r|=Te),dl(r,Wt,Hp.bind(null,t,e),a)}function Fo(e,t,n){typeof t!="function"&&h("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",t!==null?typeof t:"null");var a=n!=null?n.concat([e]):null;return Ao(se,Wt,Hp.bind(null,t,e),a)}function Kb(e,t){}var Bo=Kb;function hf(e,t){var n=Cr(),a=t===void 0?null:t;return n.memoizedState=[e,a],e}function Vo(e,t){var n=Ya(),a=t===void 0?null:t,r=n.memoizedState;if(r!==null&&a!==null){var i=r[1];if(af(a,i))return r[0]}return n.memoizedState=[e,a],e}function yf(e,t){var n=Cr(),a=t===void 0?null:t,r=e();return n.memoizedState=[r,a],r}function wo(e,t){var n=Ya(),a=t===void 0?null:t,r=n.memoizedState;if(r!==null&&a!==null){var i=r[1];if(af(a,i))return r[0]}var u=e();return n.memoizedState=[u,a],u}function gf(e){var t=Cr();return t.memoizedState=e,e}function jp(e){var t=Ya(),n=Xt,a=n.memoizedState;return Bp(t,a,e)}function Fp(e){var t=Ya();if(Xt===null)return t.memoizedState=e,e;var n=Xt.memoizedState;return Bp(t,n,e)}function Bp(e,t,n){var a=!hg(wi);if(a){if(!Ra(n,t)){var r=zv();tt.lanes=Oe(tt.lanes,r),Al(r),e.baseState=!0}return t}else return e.baseState&&(e.baseState=!1,bl()),e.memoizedState=n,n}function kb(e,t,n){var a=$a();rn(xg(a,Gu)),e(!0);var r=ol.transition;ol.transition={};var i=ol.transition;ol.transition._updatedFibers=new Set;try{e(!1),t()}finally{if(rn(a),ol.transition=r,r===null&&i._updatedFibers){var u=i._updatedFibers.size;u>10&&j("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."),i._updatedFibers.clear()}}}function bf(){var e=Mo(!1),t=e[0],n=e[1],a=kb.bind(null,n),r=Cr();return r.memoizedState=a,[t,a]}function Vp(){var e=cf(),t=e[0],n=Ya(),a=n.memoizedState;return[t,a]}function wp(){var e=ff(),t=e[0],n=Ya(),a=n.memoizedState;return[t,a]}var Yp=!1;function Wb(){return Yp}function Sf(){var e=Cr(),t=ys(),n=t.identifierPrefix,a;if(yn()){var r=ib();a=":"+n+"R"+r;var i=cl++;i>0&&(a+="H"+i.toString(32)),a+=":"}else{var u=Qb++;a=":"+n+"r"+u.toString(32)+":"}return e.memoizedState=a,a}function Yo(){var e=Ya(),t=e.memoizedState;return t}function Xb(e,t,n){typeof arguments[3]=="function"&&h("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");var a=gi(e),r={lane:a,action:n,hasEagerState:!1,eagerState:null,next:null};if(qp(e))Qp(t,r);else{var i=gp(e,t,r,a);if(i!==null){var u=Ln();Qt(i,e,a,u),Pp(i,t,a)}}Gp(e,a)}function Jb(e,t,n){typeof arguments[3]=="function"&&h("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");var a=gi(e),r={lane:a,action:n,hasEagerState:!1,eagerState:null,next:null};if(qp(e))Qp(t,r);else{var i=e.alternate;if(e.lanes===H&&(i===null||i.lanes===H)){var u=t.lastRenderedReducer;if(u!==null){var o;o=k.current,k.current=rr;try{var s=t.lastRenderedState,f=u(s,n);if(r.hasEagerState=!0,r.eagerState=f,Ra(f,s)){Lb(e,t,r,a);return}}catch(C){}finally{k.current=o}}}var m=gp(e,t,r,a);if(m!==null){var b=Ln();Qt(m,e,a,b),Pp(m,t,a)}}Gp(e,a)}function qp(e){var t=e.alternate;return e===tt||t!==null&&t===tt}function Qp(e,t){sl=No=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Pp(e,t,n){if(Mv(n)){var a=t.lanes;a=Av(a,e.pendingLanes);var r=Oe(a,n);t.lanes=r,Tc(e,r)}}function Gp(e,t,n){Cc(e,t)}var qo={readContext:Yt,useCallback:An,useContext:An,useEffect:An,useImperativeHandle:An,useInsertionEffect:An,useLayoutEffect:An,useMemo:An,useReducer:An,useRef:An,useState:An,useDebugValue:An,useDeferredValue:An,useTransition:An,useMutableSource:An,useSyncExternalStore:An,useId:An,unstable_isNewReconciler:Ke},Kp=null,kp=null,Wp=null,Xp=null,xr=null,rr=null,Qo=null;{var Ef=function(){h("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().")},Se=function(){h("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks")};Kp={readContext:function(e){return Yt(e)},useCallback:function(e,t){return N="useCallback",Je(),gu(t),hf(e,t)},useContext:function(e){return N="useContext",Je(),Yt(e)},useEffect:function(e,t){return N="useEffect",Je(),gu(t),Lo(e,t)},useImperativeHandle:function(e,t,n){return N="useImperativeHandle",Je(),gu(n),mf(e,t,n)},useInsertionEffect:function(e,t){return N="useInsertionEffect",Je(),gu(t),vf(e,t)},useLayoutEffect:function(e,t){return N="useLayoutEffect",Je(),gu(t),pf(e,t)},useMemo:function(e,t){N="useMemo",Je(),gu(t);var n=k.current;k.current=xr;try{return yf(e,t)}finally{k.current=n}},useReducer:function(e,t,n){N="useReducer",Je();var a=k.current;k.current=xr;try{return uf(e,t,n)}finally{k.current=a}},useRef:function(e){return N="useRef",Je(),df(e)},useState:function(e){N="useState",Je();var t=k.current;k.current=xr;try{return Mo(e)}finally{k.current=t}},useDebugValue:function(e,t){return N="useDebugValue",Je(),void 0},useDeferredValue:function(e){return N="useDeferredValue",Je(),gf(e)},useTransition:function(){return N="useTransition",Je(),bf()},useMutableSource:function(e,t,n){return N="useMutableSource",Je(),void 0},useSyncExternalStore:function(e,t,n){return N="useSyncExternalStore",Je(),sf(e,t,n)},useId:function(){return N="useId",Je(),Sf()},unstable_isNewReconciler:Ke},kp={readContext:function(e){return Yt(e)},useCallback:function(e,t){return N="useCallback",P(),hf(e,t)},useContext:function(e){return N="useContext",P(),Yt(e)},useEffect:function(e,t){return N="useEffect",P(),Lo(e,t)},useImperativeHandle:function(e,t,n){return N="useImperativeHandle",P(),mf(e,t,n)},useInsertionEffect:function(e,t){return N="useInsertionEffect",P(),vf(e,t)},useLayoutEffect:function(e,t){return N="useLayoutEffect",P(),pf(e,t)},useMemo:function(e,t){N="useMemo",P();var n=k.current;k.current=xr;try{return yf(e,t)}finally{k.current=n}},useReducer:function(e,t,n){N="useReducer",P();var a=k.current;k.current=xr;try{return uf(e,t,n)}finally{k.current=a}},useRef:function(e){return N="useRef",P(),df(e)},useState:function(e){N="useState",P();var t=k.current;k.current=xr;try{return Mo(e)}finally{k.current=t}},useDebugValue:function(e,t){return N="useDebugValue",P(),void 0},useDeferredValue:function(e){return N="useDeferredValue",P(),gf(e)},useTransition:function(){return N="useTransition",P(),bf()},useMutableSource:function(e,t,n){return N="useMutableSource",P(),void 0},useSyncExternalStore:function(e,t,n){return N="useSyncExternalStore",P(),sf(e,t,n)},useId:function(){return N="useId",P(),Sf()},unstable_isNewReconciler:Ke},Wp={readContext:function(e){return Yt(e)},useCallback:function(e,t){return N="useCallback",P(),Vo(e,t)},useContext:function(e){return N="useContext",P(),Yt(e)},useEffect:function(e,t){return N="useEffect",P(),vl(e,t)},useImperativeHandle:function(e,t,n){return N="useImperativeHandle",P(),Fo(e,t,n)},useInsertionEffect:function(e,t){return N="useInsertionEffect",P(),Ho(e,t)},useLayoutEffect:function(e,t){return N="useLayoutEffect",P(),jo(e,t)},useMemo:function(e,t){N="useMemo",P();var n=k.current;k.current=rr;try{return wo(e,t)}finally{k.current=n}},useReducer:function(e,t,n){N="useReducer",P();var a=k.current;k.current=rr;try{return lf(e,t,n)}finally{k.current=a}},useRef:function(e){return N="useRef",P(),zo()},useState:function(e){N="useState",P();var t=k.current;k.current=rr;try{return cf(e)}finally{k.current=t}},useDebugValue:function(e,t){return N="useDebugValue",P(),Bo()},useDeferredValue:function(e){return N="useDeferredValue",P(),jp(e)},useTransition:function(){return N="useTransition",P(),Vp()},useMutableSource:function(e,t,n){return N="useMutableSource",P(),void 0},useSyncExternalStore:function(e,t,n){return N="useSyncExternalStore",P(),Uo(e,t)},useId:function(){return N="useId",P(),Yo()},unstable_isNewReconciler:Ke},Xp={readContext:function(e){return Yt(e)},useCallback:function(e,t){return N="useCallback",P(),Vo(e,t)},useContext:function(e){return N="useContext",P(),Yt(e)},useEffect:function(e,t){return N="useEffect",P(),vl(e,t)},useImperativeHandle:function(e,t,n){return N="useImperativeHandle",P(),Fo(e,t,n)},useInsertionEffect:function(e,t){return N="useInsertionEffect",P(),Ho(e,t)},useLayoutEffect:function(e,t){return N="useLayoutEffect",P(),jo(e,t)},useMemo:function(e,t){N="useMemo",P();var n=k.current;k.current=Qo;try{return wo(e,t)}finally{k.current=n}},useReducer:function(e,t,n){N="useReducer",P();var a=k.current;k.current=Qo;try{return of(e,t,n)}finally{k.current=a}},useRef:function(e){return N="useRef",P(),zo()},useState:function(e){N="useState",P();var t=k.current;k.current=Qo;try{return ff(e)}finally{k.current=t}},useDebugValue:function(e,t){return N="useDebugValue",P(),Bo()},useDeferredValue:function(e){return N="useDeferredValue",P(),Fp(e)},useTransition:function(){return N="useTransition",P(),wp()},useMutableSource:function(e,t,n){return N="useMutableSource",P(),void 0},useSyncExternalStore:function(e,t,n){return N="useSyncExternalStore",P(),Uo(e,t)},useId:function(){return N="useId",P(),Yo()},unstable_isNewReconciler:Ke},xr={readContext:function(e){return Ef(),Yt(e)},useCallback:function(e,t){return N="useCallback",Se(),Je(),hf(e,t)},useContext:function(e){return N="useContext",Se(),Je(),Yt(e)},useEffect:function(e,t){return N="useEffect",Se(),Je(),Lo(e,t)},useImperativeHandle:function(e,t,n){return N="useImperativeHandle",Se(),Je(),mf(e,t,n)},useInsertionEffect:function(e,t){return N="useInsertionEffect",Se(),Je(),vf(e,t)},useLayoutEffect:function(e,t){return N="useLayoutEffect",Se(),Je(),pf(e,t)},useMemo:function(e,t){N="useMemo",Se(),Je();var n=k.current;k.current=xr;try{return yf(e,t)}finally{k.current=n}},useReducer:function(e,t,n){N="useReducer",Se(),Je();var a=k.current;k.current=xr;try{return uf(e,t,n)}finally{k.current=a}},useRef:function(e){return N="useRef",Se(),Je(),df(e)},useState:function(e){N="useState",Se(),Je();var t=k.current;k.current=xr;try{return Mo(e)}finally{k.current=t}},useDebugValue:function(e,t){return N="useDebugValue",Se(),Je(),void 0},useDeferredValue:function(e){return N="useDeferredValue",Se(),Je(),gf(e)},useTransition:function(){return N="useTransition",Se(),Je(),bf()},useMutableSource:function(e,t,n){return N="useMutableSource",Se(),Je(),void 0},useSyncExternalStore:function(e,t,n){return N="useSyncExternalStore",Se(),Je(),sf(e,t,n)},useId:function(){return N="useId",Se(),Je(),Sf()},unstable_isNewReconciler:Ke},rr={readContext:function(e){return Ef(),Yt(e)},useCallback:function(e,t){return N="useCallback",Se(),P(),Vo(e,t)},useContext:function(e){return N="useContext",Se(),P(),Yt(e)},useEffect:function(e,t){return N="useEffect",Se(),P(),vl(e,t)},useImperativeHandle:function(e,t,n){return N="useImperativeHandle",Se(),P(),Fo(e,t,n)},useInsertionEffect:function(e,t){return N="useInsertionEffect",Se(),P(),Ho(e,t)},useLayoutEffect:function(e,t){return N="useLayoutEffect",Se(),P(),jo(e,t)},useMemo:function(e,t){N="useMemo",Se(),P();var n=k.current;k.current=rr;try{return wo(e,t)}finally{k.current=n}},useReducer:function(e,t,n){N="useReducer",Se(),P();var a=k.current;k.current=rr;try{return lf(e,t,n)}finally{k.current=a}},useRef:function(e){return N="useRef",Se(),P(),zo()},useState:function(e){N="useState",Se(),P();var t=k.current;k.current=rr;try{return cf(e)}finally{k.current=t}},useDebugValue:function(e,t){return N="useDebugValue",Se(),P(),Bo()},useDeferredValue:function(e){return N="useDeferredValue",Se(),P(),jp(e)},useTransition:function(){return N="useTransition",Se(),P(),Vp()},useMutableSource:function(e,t,n){return N="useMutableSource",Se(),P(),void 0},useSyncExternalStore:function(e,t,n){return N="useSyncExternalStore",Se(),P(),Uo(e,t)},useId:function(){return N="useId",Se(),P(),Yo()},unstable_isNewReconciler:Ke},Qo={readContext:function(e){return Ef(),Yt(e)},useCallback:function(e,t){return N="useCallback",Se(),P(),Vo(e,t)},useContext:function(e){return N="useContext",Se(),P(),Yt(e)},useEffect:function(e,t){return N="useEffect",Se(),P(),vl(e,t)},useImperativeHandle:function(e,t,n){return N="useImperativeHandle",Se(),P(),Fo(e,t,n)},useInsertionEffect:function(e,t){return N="useInsertionEffect",Se(),P(),Ho(e,t)},useLayoutEffect:function(e,t){return N="useLayoutEffect",Se(),P(),jo(e,t)},useMemo:function(e,t){N="useMemo",Se(),P();var n=k.current;k.current=rr;try{return wo(e,t)}finally{k.current=n}},useReducer:function(e,t,n){N="useReducer",Se(),P();var a=k.current;k.current=rr;try{return of(e,t,n)}finally{k.current=a}},useRef:function(e){return N="useRef",Se(),P(),zo()},useState:function(e){N="useState",Se(),P();var t=k.current;k.current=rr;try{return ff(e)}finally{k.current=t}},useDebugValue:function(e,t){return N="useDebugValue",Se(),P(),Bo()},useDeferredValue:function(e){return N="useDeferredValue",Se(),P(),Fp(e)},useTransition:function(){return N="useTransition",Se(),P(),wp()},useMutableSource:function(e,t,n){return N="useMutableSource",Se(),P(),void 0},useSyncExternalStore:function(e,t,n){return N="useSyncExternalStore",Se(),P(),Uo(e,t)},useId:function(){return N="useId",Se(),P(),Yo()},unstable_isNewReconciler:Ke}}var mi=g.unstable_now,Jp=0,Po=-1,pl=-1,Go=-1,Tf=!1,Ko=!1;function Zp(){return Tf}function Zb(){Ko=!0}function Ib(){Tf=!1,Ko=!1}function $b(){Tf=Ko,Ko=!1}function Ip(){return Jp}function $p(){Jp=mi()}function Rf(e){pl=mi(),e.actualStartTime<0&&(e.actualStartTime=mi())}function em(e){pl=-1}function ko(e,t){if(pl>=0){var n=mi()-pl;e.actualDuration+=n,t&&(e.selfBaseDuration=n),pl=-1}}function Dr(e){if(Po>=0){var t=mi()-Po;Po=-1;for(var n=e.return;n!==null;){switch(n.tag){case oe:var a=n.stateNode;a.effectDuration+=t;return;case Et:var r=n.stateNode;r.effectDuration+=t;return}n=n.return}}}function Cf(e){if(Go>=0){var t=mi()-Go;Go=-1;for(var n=e.return;n!==null;){switch(n.tag){case oe:var a=n.stateNode;a!==null&&(a.passiveEffectDuration+=t);return;case Et:var r=n.stateNode;r!==null&&(r.passiveEffectDuration+=t);return}n=n.return}}}function _r(){Po=mi()}function xf(){Go=mi()}function Df(e){for(var t=e.child;t;)e.actualDuration+=t.actualDuration,t=t.sibling}function ir(e,t){if(e&&e.defaultProps){var n=K({},t),a=e.defaultProps;for(var r in a)n[r]===void 0&&(n[r]=a[r]);return n}return t}var _f={},Of,Nf,Uf,Mf,zf,tm,Wo,Af,Lf,Hf,ml;{Of=new Set,Nf=new Set,Uf=new Set,Mf=new Set,Af=new Set,zf=new Set,Lf=new Set,Hf=new Set,ml=new Set;var nm=new Set;Wo=function(e,t){if(!(e===null||typeof e=="function")){var n=t+"_"+e;nm.has(n)||(nm.add(n),h("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.",t,e))}},tm=function(e,t){if(t===void 0){var n=te(e)||"Component";zf.has(n)||(zf.add(n),h("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.",n))}},Object.defineProperty(_f,"_processChildContext",{enumerable:!1,value:function(){throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).")}}),Object.freeze(_f)}function jf(e,t,n,a){var r=e.memoizedState,i=n(a,r);{if(e.mode&Ot){ln(!0);try{i=n(a,r)}finally{ln(!1)}}tm(t,i)}var u=i==null?r:K({},r,i);if(e.memoizedState=u,e.lanes===H){var o=e.updateQueue;o.baseState=u}}var Ff={isMounted:Lt,enqueueSetState:function(e,t,n){var a=ge(e),r=Ln(),i=gi(a),u=kr(r,i);u.payload=t,n!=null&&(Wo(n,"setState"),u.callback=n);var o=fi(a,u,i);o!==null&&(Qt(o,a,i,r),Ro(o,a,i)),Cc(a,i)},enqueueReplaceState:function(e,t,n){var a=ge(e),r=Ln(),i=gi(a),u=kr(r,i);u.tag=Sp,u.payload=t,n!=null&&(Wo(n,"replaceState"),u.callback=n);var o=fi(a,u,i);o!==null&&(Qt(o,a,i,r),Ro(o,a,i)),Cc(a,i)},enqueueForceUpdate:function(e,t){var n=ge(e),a=Ln(),r=gi(n),i=kr(a,r);i.tag=So,t!=null&&(Wo(t,"forceUpdate"),i.callback=t);var u=fi(n,i,r);u!==null&&(Qt(u,n,r,a),Ro(u,n,r)),eb(n,r)}};function am(e,t,n,a,r,i,u){var o=e.stateNode;if(typeof o.shouldComponentUpdate=="function"){var s=o.shouldComponentUpdate(a,i,u);{if(e.mode&Ot){ln(!0);try{s=o.shouldComponentUpdate(a,i,u)}finally{ln(!1)}}s===void 0&&h("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.",te(t)||"Component")}return s}return t.prototype&&t.prototype.isPureReactComponent?!co(n,a)||!co(r,i):!0}function eS(e,t,n){var a=e.stateNode;{var r=te(t)||"Component",i=a.render;i||(t.prototype&&typeof t.prototype.render=="function"?h("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?",r):h("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.",r)),a.getInitialState&&!a.getInitialState.isReactClassApproved&&!a.state&&h("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?",r),a.getDefaultProps&&!a.getDefaultProps.isReactClassApproved&&h("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.",r),a.propTypes&&h("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.",r),a.contextType&&h("contextType was defined as an instance property on %s. Use a static property to define contextType instead.",r),t.childContextTypes&&!ml.has(t)&&(e.mode&Ot)===fe&&(ml.add(t),h(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`,r)),t.contextTypes&&!ml.has(t)&&(e.mode&Ot)===fe&&(ml.add(t),h(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`,r)),a.contextTypes&&h("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.",r),t.contextType&&t.contextTypes&&!Lf.has(t)&&(Lf.add(t),h("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.",r)),typeof a.componentShouldUpdate=="function"&&h("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",r),t.prototype&&t.prototype.isPureReactComponent&&typeof a.shouldComponentUpdate!="undefined"&&h("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.",te(t)||"A pure component"),typeof a.componentDidUnmount=="function"&&h("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?",r),typeof a.componentDidReceiveProps=="function"&&h("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().",r),typeof a.componentWillRecieveProps=="function"&&h("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",r),typeof a.UNSAFE_componentWillRecieveProps=="function"&&h("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?",r);var u=a.props!==n;a.props!==void 0&&u&&h("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.",r,r),a.defaultProps&&h("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.",r,r),typeof a.getSnapshotBeforeUpdate=="function"&&typeof a.componentDidUpdate!="function"&&!Uf.has(t)&&(Uf.add(t),h("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.",te(t))),typeof a.getDerivedStateFromProps=="function"&&h("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.",r),typeof a.getDerivedStateFromError=="function"&&h("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.",r),typeof t.getSnapshotBeforeUpdate=="function"&&h("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.",r);var o=a.state;o&&(typeof o!="object"||Kt(o))&&h("%s.state: must be set to an object or null",r),typeof a.getChildContext=="function"&&typeof t.childContextTypes!="object"&&h("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().",r)}}function rm(e,t){t.updater=Ff,e.stateNode=t,nt(t,e),t._reactInternalInstance=_f}function im(e,t,n){var a=!1,r=Sa,i=Sa,u=t.contextType;if("contextType"in t){var o=u===null||u!==void 0&&u.$$typeof===_n&&u._context===void 0;if(!o&&!Hf.has(t)){Hf.add(t);var s="";u===void 0?s=" However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file.":typeof u!="object"?s=" However, it is set to a "+typeof u+".":u.$$typeof===tn?s=" Did you accidentally pass the Context.Provider instead?":u._context!==void 0?s=" Did you accidentally pass the Context.Consumer instead?":s=" However, it is set to an object with keys {"+Object.keys(u).join(", ")+"}.",h("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s",te(t)||"Component",s)}}if(typeof u=="object"&&u!==null)i=Yt(u);else{r=$i(e,t,!0);var f=t.contextTypes;a=f!=null,i=a?eu(e,r):Sa}var m=new t(n,i);if(e.mode&Ot){ln(!0);try{m=new t(n,i)}finally{ln(!1)}}var b=e.memoizedState=m.state!==null&&m.state!==void 0?m.state:null;rm(e,m);{if(typeof t.getDerivedStateFromProps=="function"&&b===null){var C=te(t)||"Component";Nf.has(C)||(Nf.add(C),h("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.",C,m.state===null?"null":"undefined",C))}if(typeof t.getDerivedStateFromProps=="function"||typeof m.getSnapshotBeforeUpdate=="function"){var U=null,L=null,M=null;if(typeof m.componentWillMount=="function"&&m.componentWillMount.__suppressDeprecationWarning!==!0?U="componentWillMount":typeof m.UNSAFE_componentWillMount=="function"&&(U="UNSAFE_componentWillMount"),typeof m.componentWillReceiveProps=="function"&&m.componentWillReceiveProps.__suppressDeprecationWarning!==!0?L="componentWillReceiveProps":typeof m.UNSAFE_componentWillReceiveProps=="function"&&(L="UNSAFE_componentWillReceiveProps"),typeof m.componentWillUpdate=="function"&&m.componentWillUpdate.__suppressDeprecationWarning!==!0?M="componentWillUpdate":typeof m.UNSAFE_componentWillUpdate=="function"&&(M="UNSAFE_componentWillUpdate"),U!==null||L!==null||M!==null){var J=te(t)||"Component",ve=typeof t.getDerivedStateFromProps=="function"?"getDerivedStateFromProps()":"getSnapshotBeforeUpdate()";Mf.has(J)||(Mf.add(J),h(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`,J,ve,U!==null?`
  `+U:"",L!==null?`
  `+L:"",M!==null?`
  `+M:""))}}}return a&&Tv(e,r,i),m}function tS(e,t){var n=t.state;typeof t.componentWillMount=="function"&&t.componentWillMount(),typeof t.UNSAFE_componentWillMount=="function"&&t.UNSAFE_componentWillMount(),n!==t.state&&(h("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",I(e)||"Component"),Ff.enqueueReplaceState(t,t.state,null))}function um(e,t,n,a){var r=t.state;if(typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,a),t.state!==r){{var i=I(e)||"Component";Of.has(i)||(Of.add(i),h("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",i))}Ff.enqueueReplaceState(t,t.state,null)}}function Bf(e,t,n,a){eS(e,t,n);var r=e.stateNode;r.props=n,r.state=e.memoizedState,r.refs={},Kc(e);var i=t.contextType;if(typeof i=="object"&&i!==null)r.context=Yt(i);else{var u=$i(e,t,!0);r.context=eu(e,u)}{if(r.state===n){var o=te(t)||"Component";Af.has(o)||(Af.add(o),h("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.",o))}e.mode&Ot&&nr.recordLegacyContextWarning(e,r),nr.recordUnsafeLifecycleWarnings(e,r)}r.state=e.memoizedState;var s=t.getDerivedStateFromProps;if(typeof s=="function"&&(jf(e,t,s,n),r.state=e.memoizedState),typeof t.getDerivedStateFromProps!="function"&&typeof r.getSnapshotBeforeUpdate!="function"&&(typeof r.UNSAFE_componentWillMount=="function"||typeof r.componentWillMount=="function")&&(tS(e,r),Co(e,n,r,a),r.state=e.memoizedState),typeof r.componentDidMount=="function"){var f=se;f|=Y,(e.mode&yr)!==fe&&(f|=Te),e.flags|=f}}function nS(e,t,n,a){var r=e.stateNode,i=e.memoizedProps;r.props=i;var u=r.context,o=t.contextType,s=Sa;if(typeof o=="object"&&o!==null)s=Yt(o);else{var f=$i(e,t,!0);s=eu(e,f)}var m=t.getDerivedStateFromProps,b=typeof m=="function"||typeof r.getSnapshotBeforeUpdate=="function";!b&&(typeof r.UNSAFE_componentWillReceiveProps=="function"||typeof r.componentWillReceiveProps=="function")&&(i!==n||u!==s)&&um(e,r,n,s),Tp();var C=e.memoizedState,U=r.state=C;if(Co(e,n,r,a),U=e.memoizedState,i===n&&C===U&&!Jl()&&!xo()){if(typeof r.componentDidMount=="function"){var L=se;L|=Y,(e.mode&yr)!==fe&&(L|=Te),e.flags|=L}return!1}typeof m=="function"&&(jf(e,t,m,n),U=e.memoizedState);var M=xo()||am(e,t,i,n,C,U,s);if(M){if(!b&&(typeof r.UNSAFE_componentWillMount=="function"||typeof r.componentWillMount=="function")&&(typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount()),typeof r.componentDidMount=="function"){var J=se;J|=Y,(e.mode&yr)!==fe&&(J|=Te),e.flags|=J}}else{if(typeof r.componentDidMount=="function"){var ve=se;ve|=Y,(e.mode&yr)!==fe&&(ve|=Te),e.flags|=ve}e.memoizedProps=n,e.memoizedState=U}return r.props=n,r.state=U,r.context=s,M}function aS(e,t,n,a,r){var i=t.stateNode;Ep(e,t);var u=t.memoizedProps,o=t.type===t.elementType?u:ir(t.type,u);i.props=o;var s=t.pendingProps,f=i.context,m=n.contextType,b=Sa;if(typeof m=="object"&&m!==null)b=Yt(m);else{var C=$i(t,n,!0);b=eu(t,C)}var U=n.getDerivedStateFromProps,L=typeof U=="function"||typeof i.getSnapshotBeforeUpdate=="function";!L&&(typeof i.UNSAFE_componentWillReceiveProps=="function"||typeof i.componentWillReceiveProps=="function")&&(u!==s||f!==b)&&um(t,i,a,b),Tp();var M=t.memoizedState,J=i.state=M;if(Co(t,a,i,r),J=t.memoizedState,u===s&&M===J&&!Jl()&&!xo()&&!qe)return typeof i.componentDidUpdate=="function"&&(u!==e.memoizedProps||M!==e.memoizedState)&&(t.flags|=se),typeof i.getSnapshotBeforeUpdate=="function"&&(u!==e.memoizedProps||M!==e.memoizedState)&&(t.flags|=Pt),!1;typeof U=="function"&&(jf(t,n,U,a),J=t.memoizedState);var ve=xo()||am(t,n,o,a,M,J,b)||qe;return ve?(!L&&(typeof i.UNSAFE_componentWillUpdate=="function"||typeof i.componentWillUpdate=="function")&&(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,J,b),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,J,b)),typeof i.componentDidUpdate=="function"&&(t.flags|=se),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=Pt)):(typeof i.componentDidUpdate=="function"&&(u!==e.memoizedProps||M!==e.memoizedState)&&(t.flags|=se),typeof i.getSnapshotBeforeUpdate=="function"&&(u!==e.memoizedProps||M!==e.memoizedState)&&(t.flags|=Pt),t.memoizedProps=a,t.memoizedState=J),i.props=a,i.state=J,i.context=b,ve}function Yi(e,t){return{value:e,source:t,stack:up(t),digest:null}}function Vf(e,t,n){return{value:e,source:null,stack:n!=null?n:null,digest:t!=null?t:null}}function rS(e,t){return!0}function wf(e,t){try{var n=rS(e,t);if(n===!1)return;var a=t.value,r=t.source,i=t.stack,u=i!==null?i:"";if(a!=null&&a._suppressLogging){if(e.tag===pe)return;console.error(a)}var o=r?I(r):null,s=o?"The above error occurred in the <"+o+"> component:":"The above error occurred in one of your React components:",f;if(e.tag===oe)f=`Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;else{var m=I(e)||"Anonymous";f="React will try to recreate this component tree from scratch "+("using the error boundary you provided, "+m+".")}var b=s+`
`+u+`

`+(""+f);console.error(b)}catch(C){setTimeout(function(){throw C})}}var iS=typeof WeakMap=="function"?WeakMap:Map;function lm(e,t,n){var a=kr(mt,n);a.tag=Pc,a.payload={element:null};var r=t.value;return a.callback=function(){pT(r),wf(e,t)},a}function Yf(e,t,n){var a=kr(mt,n);a.tag=Pc;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;a.payload=function(){return r(i)},a.callback=function(){Sh(e),wf(e,t)}}var u=e.stateNode;return u!==null&&typeof u.componentDidCatch=="function"&&(a.callback=function(){Sh(e),wf(e,t),typeof r!="function"&&dT(this);var s=t.value,f=t.stack;this.componentDidCatch(s,{componentStack:f!==null?f:""}),typeof r!="function"&&(Ta(e.lanes,he)||h("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.",I(e)||"Unknown"))}),a}function om(e,t,n){var a=e.pingCache,r;if(a===null?(a=e.pingCache=new iS,r=new Set,a.set(t,r)):(r=a.get(t),r===void 0&&(r=new Set,a.set(t,r))),!r.has(n)){r.add(n);var i=mT.bind(null,e,t,n);er&&Ll(e,n),t.then(i,i)}}function uS(e,t,n,a){var r=e.updateQueue;if(r===null){var i=new Set;i.add(n),e.updateQueue=i}else r.add(n)}function lS(e,t){var n=e.tag;if((e.mode&Ge)===fe&&(n===Ue||n===ze||n===Ae)){var a=e.alternate;a?(e.updateQueue=a.updateQueue,e.memoizedState=a.memoizedState,e.lanes=a.lanes):(e.updateQueue=null,e.memoizedState=null)}}function sm(e){var t=e;do{if(t.tag===je&&Yb(t))return t;t=t.return}while(t!==null);return null}function cm(e,t,n,a,r){if((e.mode&Ge)===fe){if(e===t)e.flags|=Rt;else{if(e.flags|=Le,n.flags|=dr,n.flags&=~(Fr|ca),n.tag===pe){var i=n.alternate;if(i===null)n.tag=Ft;else{var u=kr(mt,he);u.tag=So,fi(n,u,he)}}n.lanes=Oe(n.lanes,he)}return e}return e.flags|=Rt,e.lanes=r,e}function oS(e,t,n,a,r){if(n.flags|=ca,er&&Ll(e,r),a!==null&&typeof a=="object"&&typeof a.then=="function"){var i=a;lS(n),yn()&&n.mode&Ge&&Iv();var u=sm(t);if(u!==null){u.flags&=~fn,cm(u,t,n,e,r),u.mode&Ge&&om(e,i,r),uS(u,e,i);return}else{if(!mg(r)){om(e,i,r),xd();return}var o=new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");a=o}}else if(yn()&&n.mode&Ge){Iv();var s=sm(t);if(s!==null){(s.flags&Rt)===X&&(s.flags|=fn),cm(s,t,n,e,r),Ac(Yi(a,n));return}}a=Yi(a,n),rT(a);var f=t;do{switch(f.tag){case oe:{var m=a;f.flags|=Rt;var b=Qu(r);f.lanes=Oe(f.lanes,b);var C=lm(f,m,b);kc(f,C);return}case pe:var U=a,L=f.type,M=f.stateNode;if((f.flags&Le)===X&&(typeof L.getDerivedStateFromError=="function"||M!==null&&typeof M.componentDidCatch=="function"&&!fh(M))){f.flags|=Rt;var J=Qu(r);f.lanes=Oe(f.lanes,J);var ve=Yf(f,U,J);kc(f,ve);return}break}f=f.return}while(f!==null)}function sS(){return null}var hl=z.ReactCurrentOwner,ur=!1,qf,yl,Qf,Pf,Gf,qi,Kf,Xo,gl;qf={},yl={},Qf={},Pf={},Gf={},qi=!1,Kf={},Xo={},gl={};function Kn(e,t,n,a){e===null?t.child=pp(t,null,n,a):t.child=fu(t,e.child,n,a)}function cS(e,t,n,a){t.child=fu(t,e.child,null,a),t.child=fu(t,null,n,a)}function fm(e,t,n,a,r){if(t.type!==t.elementType){var i=n.propTypes;i&&Ia(i,a,"prop",te(n))}var u=n.render,o=t.ref,s,f;vu(t,r),Wu(t);{if(hl.current=t,Tr(!0),s=bu(e,t,u,a,o,r),f=Su(),t.mode&Ot){ln(!0);try{s=bu(e,t,u,a,o,r),f=Su()}finally{ln(!1)}}Tr(!1)}return lu(),e!==null&&!ur?(_p(e,t,r),Wr(e,t,r)):(yn()&&f&&_c(t),t.flags|=Ie,Kn(e,t,s,r),t.child)}function dm(e,t,n,a,r){if(e===null){var i=n.type;if(zT(i)&&n.compare===null&&n.defaultProps===void 0){var u=i;return u=Ou(i),t.tag=Ae,t.type=u,Xf(t,i),vm(e,t,u,a,r)}{var o=i.propTypes;if(o&&Ia(o,a,"prop",te(i)),n.defaultProps!==void 0){var s=te(i)||"Unknown";gl[s]||(h("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.",s),gl[s]=!0)}}var f=Hd(n.type,null,a,t,t.mode,r);return f.ref=t.ref,f.return=t,t.child=f,f}{var m=n.type,b=m.propTypes;b&&Ia(b,a,"prop",te(m))}var C=e.child,U=td(e,r);if(!U){var L=C.memoizedProps,M=n.compare;if(M=M!==null?M:co,M(L,a)&&e.ref===t.ref)return Wr(e,t,r)}t.flags|=Ie;var J=ki(C,a);return J.ref=t.ref,J.return=t,t.child=J,J}function vm(e,t,n,a,r){if(t.type!==t.elementType){var i=t.elementType;if(i.$$typeof===rt){var u=i,o=u._payload,s=u._init;try{i=s(o)}catch(b){i=null}var f=i&&i.propTypes;f&&Ia(f,a,"prop",te(i))}}if(e!==null){var m=e.memoizedProps;if(co(m,a)&&e.ref===t.ref&&t.type===e.type)if(ur=!1,t.pendingProps=a=m,td(e,r))(e.flags&dr)!==X&&(ur=!0);else return t.lanes=e.lanes,Wr(e,t,r)}return kf(e,t,n,a,r)}function pm(e,t,n){var a=t.pendingProps,r=a.children,i=e!==null?e.memoizedState:null;if(a.mode==="hidden"||ke)if((t.mode&Ge)===fe){var u={baseLanes:H,cachePool:null,transitions:null};t.memoizedState=u,bs(t,n)}else if(Ta(n,Ea)){var b={baseLanes:H,cachePool:null,transitions:null};t.memoizedState=b;var C=i!==null?i.baseLanes:n;bs(t,C)}else{var o=null,s;if(i!==null){var f=i.baseLanes;s=Oe(f,n)}else s=n;t.lanes=t.childLanes=Ea;var m={baseLanes:s,cachePool:o,transitions:null};return t.memoizedState=m,t.updateQueue=null,bs(t,s),null}else{var U;i!==null?(U=Oe(i.baseLanes,n),t.memoizedState=null):U=n,bs(t,U)}return Kn(e,t,r,n),t.child}function fS(e,t,n){var a=t.pendingProps;return Kn(e,t,a,n),t.child}function dS(e,t,n){var a=t.pendingProps.children;return Kn(e,t,a,n),t.child}function vS(e,t,n){{t.flags|=se;{var a=t.stateNode;a.effectDuration=0,a.passiveEffectDuration=0}}var r=t.pendingProps,i=r.children;return Kn(e,t,i,n),t.child}function mm(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=Yn,t.flags|=A)}function kf(e,t,n,a,r){if(t.type!==t.elementType){var i=n.propTypes;i&&Ia(i,a,"prop",te(n))}var u;{var o=$i(t,n,!0);u=eu(t,o)}var s,f;vu(t,r),Wu(t);{if(hl.current=t,Tr(!0),s=bu(e,t,n,a,u,r),f=Su(),t.mode&Ot){ln(!0);try{s=bu(e,t,n,a,u,r),f=Su()}finally{ln(!1)}}Tr(!1)}return lu(),e!==null&&!ur?(_p(e,t,r),Wr(e,t,r)):(yn()&&f&&_c(t),t.flags|=Ie,Kn(e,t,s,r),t.child)}function hm(e,t,n,a,r){{switch(Nh(t)){case!1:{var i=t.stateNode,u=t.type,o=new u(t.memoizedProps,i.context),s=o.state;i.updater.enqueueSetState(i,s,null);break}case!0:{t.flags|=Le,t.flags|=Rt;var f=new Error("Simulated error coming from DevTools"),m=Qu(r);t.lanes=Oe(t.lanes,m);var b=Yf(t,Yi(f,t),m);kc(t,b);break}}if(t.type!==t.elementType){var C=n.propTypes;C&&Ia(C,a,"prop",te(n))}}var U;hr(n)?(U=!0,Il(t)):U=!1,vu(t,r);var L=t.stateNode,M;L===null?(Zo(e,t),im(t,n,a),Bf(t,n,a,r),M=!0):e===null?M=nS(t,n,a,r):M=aS(e,t,n,a,r);var J=Wf(e,t,n,M,U,r);{var ve=t.stateNode;M&&ve.props!==a&&(qi||h("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.",I(t)||"a component"),qi=!0)}return J}function Wf(e,t,n,a,r,i){mm(e,t);var u=(t.flags&Le)!==X;if(!a&&!u)return r&&xv(t,n,!1),Wr(e,t,i);var o=t.stateNode;hl.current=t;var s;if(u&&typeof n.getDerivedStateFromError!="function")s=null,em();else{Wu(t);{if(Tr(!0),s=o.render(),t.mode&Ot){ln(!0);try{o.render()}finally{ln(!1)}}Tr(!1)}lu()}return t.flags|=Ie,e!==null&&u?cS(e,t,s,i):Kn(e,t,s,i),t.memoizedState=o.state,r&&xv(t,n,!0),t.child}function ym(e){var t=e.stateNode;t.pendingContext?Rv(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Rv(e,t.context,!1),Xc(e,t.containerInfo)}function pS(e,t,n){if(ym(t),e===null)throw new Error("Should have a current fiber. This is a bug in React.");var a=t.pendingProps,r=t.memoizedState,i=r.element;Ep(e,t),Co(t,a,null,n);var u=t.memoizedState,o=t.stateNode,s=u.element;if(Dt&&r.isDehydrated){var f={element:s,isDehydrated:!1,cache:u.cache,pendingSuspenseBoundaries:u.pendingSuspenseBoundaries,transitions:u.transitions},m=t.updateQueue;if(m.baseState=f,t.memoizedState=f,t.flags&fn){var b=Yi(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."),t);return gm(e,t,s,n,b)}else if(s!==i){var C=Yi(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."),t);return gm(e,t,s,n,C)}else{fb(t);var U=pp(t,null,s,n);t.child=U;for(var L=U;L;)L.flags=L.flags&~Qe|dn,L=L.sibling}}else{if(cu(),s===i)return Wr(e,t,n);Kn(e,t,s,n)}return t.child}function gm(e,t,n,a,r){return cu(),Ac(r),t.flags|=fn,Kn(e,t,n,a),t.child}function mS(e,t,n){Cp(t),e===null&&zc(t);var a=t.type,r=t.pendingProps,i=e!==null?e.memoizedProps:null,u=r.children,o=ai(a,r);return o?u=null:i!==null&&ai(a,i)&&(t.flags|=$n),mm(e,t),Kn(e,t,u,n),t.child}function hS(e,t){return e===null&&zc(t),null}function yS(e,t,n,a){Zo(e,t);var r=t.pendingProps,i=n,u=i._payload,o=i._init,s=o(u);t.type=s;var f=t.tag=AT(s),m=ir(s,r),b;switch(f){case Ue:return Xf(t,s),t.type=s=Ou(s),b=kf(null,t,s,m,a),b;case pe:return t.type=s=Nd(s),b=hm(null,t,s,m,a),b;case ze:return t.type=s=Ud(s),b=fm(null,t,s,m,a),b;case lt:{if(t.type!==t.elementType){var C=s.propTypes;C&&Ia(C,m,"prop",te(s))}return b=dm(null,t,s,ir(s.type,m),a),b}}var U="";throw s!==null&&typeof s=="object"&&s.$$typeof===rt&&(U=" Did you wrap a component in React.lazy() more than once?"),new Error("Element type is invalid. Received a promise that resolves to: "+s+". "+("Lazy element type must resolve to a class or function."+U))}function gS(e,t,n,a,r){Zo(e,t),t.tag=pe;var i;return hr(n)?(i=!0,Il(t)):i=!1,vu(t,r),im(t,n,a),Bf(t,n,a,r),Wf(null,t,n,!0,i,r)}function bS(e,t,n,a){Zo(e,t);var r=t.pendingProps,i;{var u=$i(t,n,!1);i=eu(t,u)}vu(t,a);var o,s;Wu(t);{if(n.prototype&&typeof n.prototype.render=="function"){var f=te(n)||"Unknown";qf[f]||(h("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.",f,f),qf[f]=!0)}t.mode&Ot&&nr.recordLegacyContextWarning(t,null),Tr(!0),hl.current=t,o=bu(null,t,n,r,i,a),s=Su(),Tr(!1)}if(lu(),t.flags|=Ie,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0){var m=te(n)||"Unknown";yl[m]||(h("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.",m,m,m),yl[m]=!0)}if(typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0){{var b=te(n)||"Unknown";yl[b]||(h("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.",b,b,b),yl[b]=!0)}t.tag=pe,t.memoizedState=null,t.updateQueue=null;var C=!1;return hr(n)?(C=!0,Il(t)):C=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,Kc(t),rm(t,o),Bf(t,n,r,a),Wf(null,t,n,!0,C,a)}else{if(t.tag=Ue,t.mode&Ot){ln(!0);try{o=bu(null,t,n,r,i,a),s=Su()}finally{ln(!1)}}return yn()&&s&&_c(t),Kn(null,t,o,a),Xf(t,n),t.child}}function Xf(e,t){{if(t&&t.childContextTypes&&h("%s(...): childContextTypes cannot be defined on a function component.",t.displayName||t.name||"Component"),e.ref!==null){var n="",a=Tb();a&&(n+=`

Check the render method of \``+a+"`.");var r=a||"",i=e._debugSource;i&&(r=i.fileName+":"+i.lineNumber),Gf[r]||(Gf[r]=!0,h("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s",n))}if(t.defaultProps!==void 0){var u=te(t)||"Unknown";gl[u]||(h("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.",u),gl[u]=!0)}if(typeof t.getDerivedStateFromProps=="function"){var o=te(t)||"Unknown";Pf[o]||(h("%s: Function components do not support getDerivedStateFromProps.",o),Pf[o]=!0)}if(typeof t.contextType=="object"&&t.contextType!==null){var s=te(t)||"Unknown";Qf[s]||(h("%s: Function components do not support contextType.",s),Qf[s]=!0)}}}var Jf={dehydrated:null,treeContext:null,retryLane:an};function Zf(e){return{baseLanes:e,cachePool:sS(),transitions:null}}function SS(e,t){var n=null;return{baseLanes:Oe(e.baseLanes,t),cachePool:n,transitions:e.transitions}}function ES(e,t,n,a){if(t!==null){var r=t.memoizedState;if(r===null)return!1}return Zc(e,ll)}function TS(e,t){return ro(e.childLanes,t)}function bm(e,t,n){var a=t.pendingProps;Mh(t)&&(t.flags|=Le);var r=ar.current,i=!1,u=(t.flags&Le)!==X;if(u||ES(r,e)?(i=!0,t.flags&=~Le):(e===null||e.memoizedState!==null)&&(r=wb(r,Dp)),r=mu(r),vi(t,r),e===null){zc(t);var o=t.memoizedState;if(o!==null){var s=o.dehydrated;if(s!==null)return _S(t,s)}var f=a.children,m=a.fallback;if(i){var b=RS(t,f,m,n),C=t.child;return C.memoizedState=Zf(n),t.memoizedState=Jf,b}else return If(t,f)}else{var U=e.memoizedState;if(U!==null){var L=U.dehydrated;if(L!==null)return OS(e,t,u,a,L,U,n)}if(i){var M=a.fallback,J=a.children,ve=xS(e,t,J,M,n),re=t.child,Ze=e.child.memoizedState;return re.memoizedState=Ze===null?Zf(n):SS(Ze,n),re.childLanes=TS(e,n),t.memoizedState=Jf,ve}else{var Ye=a.children,E=CS(e,t,Ye,n);return t.memoizedState=null,E}}}function If(e,t,n){var a=e.mode,r={mode:"visible",children:t},i=$f(r,a);return i.return=e,e.child=i,i}function RS(e,t,n,a){var r=e.mode,i=e.child,u={mode:"hidden",children:t},o,s;return(r&Ge)===fe&&i!==null?(o=i,o.childLanes=H,o.pendingProps=u,e.mode&et&&(o.actualDuration=0,o.actualStartTime=-1,o.selfBaseDuration=0,o.treeBaseDuration=0),s=Si(n,r,a,null)):(o=$f(u,r),s=Si(n,r,a,null)),o.return=e,s.return=e,o.sibling=s,e.child=o,s}function $f(e,t,n){return Th(e,t,H,null)}function Sm(e,t){return ki(e,t)}function CS(e,t,n,a){var r=e.child,i=r.sibling,u=Sm(r,{mode:"visible",children:n});if((t.mode&Ge)===fe&&(u.lanes=a),u.return=t,u.sibling=null,i!==null){var o=t.deletions;o===null?(t.deletions=[i],t.flags|=Vt):o.push(i)}return t.child=u,u}function xS(e,t,n,a,r){var i=t.mode,u=e.child,o=u.sibling,s={mode:"hidden",children:n},f;if((i&Ge)===fe&&t.child!==u){var m=t.child;f=m,f.childLanes=H,f.pendingProps=s,t.mode&et&&(f.actualDuration=0,f.actualStartTime=-1,f.selfBaseDuration=u.selfBaseDuration,f.treeBaseDuration=u.treeBaseDuration),t.deletions=null}else f=Sm(u,s),f.subtreeFlags=u.subtreeFlags&Pe;var b;return o!==null?b=ki(o,a):(b=Si(a,i,r,null),b.flags|=Qe),b.return=t,f.return=t,f.sibling=b,t.child=f,b}function Jo(e,t,n,a){a!==null&&Ac(a),fu(t,e.child,null,n);var r=t.pendingProps,i=r.children,u=If(t,i);return u.flags|=Qe,t.memoizedState=null,u}function DS(e,t,n,a,r){var i=t.mode,u={mode:"visible",children:n},o=$f(u,i),s=Si(a,i,r,null);return s.flags|=Qe,o.return=t,s.return=t,o.sibling=s,t.child=o,(t.mode&Ge)!==fe&&fu(t,e.child,null,r),s}function _S(e,t,n){return(e.mode&Ge)===fe?(h("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."),e.lanes=he):ui(t)?e.lanes=Ni:e.lanes=Ea,null}function OS(e,t,n,a,r,i,u){if(n)if(t.flags&fn){t.flags&=~fn;var E=Vf(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));return Jo(e,t,u,E)}else{if(t.memoizedState!==null)return t.child=e.child,t.flags|=Le,null;var O=a.children,S=a.fallback,F=DS(e,t,O,S,u),ee=t.child;return ee.memoizedState=Zf(u),t.memoizedState=Jf,F}else{if(sb(),(t.mode&Ge)===fe)return Jo(e,t,u,null);if(ui(r)){var o,s,f;{var m=ju(r);o=m.digest,s=m.message,f=m.stack}var b;s?b=new Error(s):b=new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");var C=Vf(b,o,f);return Jo(e,t,u,C)}var U=Ta(u,e.childLanes);if(ur||U){var L=ys();if(L!==null){var M=Rg(L,u);if(M!==an&&M!==i.retryLane){i.retryLane=M;var J=mt;Gn(e,M),Qt(L,e,M,J)}}xd();var ve=Vf(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));return Jo(e,t,u,ve)}else if(wt(r)){t.flags|=Le,t.child=e.child;var re=hT.bind(null,e);return Pl(r,re),null}else{db(t,r,i.treeContext);var Ze=a.children,Ye=If(t,Ze);return Ye.flags|=dn,Ye}}}function Em(e,t,n){e.lanes=Oe(e.lanes,t);var a=e.alternate;a!==null&&(a.lanes=Oe(a.lanes,t)),qc(e.return,t,n)}function NS(e,t,n){for(var a=t;a!==null;){if(a.tag===je){var r=a.memoizedState;r!==null&&Em(a,n,e)}else if(a.tag===gt)Em(a,n,e);else if(a.child!==null){a.child.return=a,a=a.child;continue}if(a===e)return;for(;a.sibling===null;){if(a.return===null||a.return===e)return;a=a.return}a.sibling.return=a.return,a=a.sibling}}function US(e){for(var t=e,n=null;t!==null;){var a=t.alternate;a!==null&&Oo(a)===null&&(n=t),t=t.sibling}return n}function MS(e){if(e!==void 0&&e!=="forwards"&&e!=="backwards"&&e!=="together"&&!Kf[e])if(Kf[e]=!0,typeof e=="string")switch(e.toLowerCase()){case"together":case"forwards":case"backwards":{h('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.',e,e.toLowerCase());break}case"forward":case"backward":{h('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.',e,e.toLowerCase());break}default:h('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',e);break}else h('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',e)}function zS(e,t){e!==void 0&&!Xo[e]&&(e!=="collapsed"&&e!=="hidden"?(Xo[e]=!0,h('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?',e)):t!=="forwards"&&t!=="backwards"&&(Xo[e]=!0,h('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?',e)))}function Tm(e,t){{var n=Kt(e),a=!n&&typeof Q(e)=="function";if(n||a){var r=n?"array":"iterable";return h("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>",r,t,r),!1}}return!0}function AS(e,t){if((t==="forwards"||t==="backwards")&&e!==void 0&&e!==null&&e!==!1)if(Kt(e)){for(var n=0;n<e.length;n++)if(!Tm(e[n],n))return}else{var a=Q(e);if(typeof a=="function"){var r=a.call(e);if(r)for(var i=r.next(),u=0;!i.done;i=r.next()){if(!Tm(i.value,u))return;u++}}else h('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?',t)}}function ed(e,t,n,a,r){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:r}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=a,i.tail=n,i.tailMode=r)}function Rm(e,t,n){var a=t.pendingProps,r=a.revealOrder,i=a.tail,u=a.children;MS(r),zS(i,r),AS(u,r),Kn(e,t,u,n);var o=ar.current,s=Zc(o,ll);if(s)o=Ic(o,ll),t.flags|=Le;else{var f=e!==null&&(e.flags&Le)!==X;f&&NS(t,t.child,n),o=mu(o)}if(vi(t,o),(t.mode&Ge)===fe)t.memoizedState=null;else switch(r){case"forwards":{var m=US(t.child),b;m===null?(b=t.child,t.child=null):(b=m.sibling,m.sibling=null),ed(t,!1,b,m,i);break}case"backwards":{var C=null,U=t.child;for(t.child=null;U!==null;){var L=U.alternate;if(L!==null&&Oo(L)===null){t.child=U;break}var M=U.sibling;U.sibling=C,C=U,U=M}ed(t,!0,C,null,i);break}case"together":{ed(t,!1,null,null,void 0);break}default:t.memoizedState=null}return t.child}function LS(e,t,n){Xc(t,t.stateNode.containerInfo);var a=t.pendingProps;return e===null?t.child=fu(t,null,a,n):Kn(e,t,a,n),t.child}var Cm=!1;function HS(e,t,n){var a=t.type,r=a._context,i=t.pendingProps,u=t.memoizedProps,o=i.value;{"value"in i||Cm||(Cm=!0,h("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));var s=t.type.propTypes;s&&Ia(s,i,"prop","Context.Provider")}if(yp(t,r,o),u!==null){var f=u.value;if(Ra(f,o)){if(u.children===i.children&&!Jl())return Wr(e,t,n)}else Mb(t,r,n)}var m=i.children;return Kn(e,t,m,n),t.child}var xm=!1;function jS(e,t,n){var a=t.type;a._context===void 0?a!==a.Consumer&&(xm||(xm=!0,h("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))):a=a._context;var r=t.pendingProps,i=r.children;typeof i!="function"&&h("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."),vu(t,n);var u=Yt(a);Wu(t);var o;return hl.current=t,Tr(!0),o=i(u),Tr(!1),lu(),t.flags|=Ie,Kn(e,t,o,n),t.child}function bl(){ur=!0}function Zo(e,t){(t.mode&Ge)===fe&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=Qe)}function Wr(e,t,n){return e!==null&&(t.dependencies=e.dependencies),em(),Al(t.lanes),Ta(n,t.childLanes)?(Nb(e,t),t.child):null}function FS(e,t,n){{var a=t.return;if(a===null)throw new Error("Cannot swap the root fiber.");if(e.alternate=null,t.alternate=null,n.index=t.index,n.sibling=t.sibling,n.return=t.return,n.ref=t.ref,t===a.child)a.child=n;else{var r=a.child;if(r===null)throw new Error("Expected parent to have a child.");for(;r.sibling!==t;)if(r=r.sibling,r===null)throw new Error("Expected to find the previous sibling.");r.sibling=n}var i=a.deletions;return i===null?(a.deletions=[e],a.flags|=Vt):i.push(e),n.flags|=Qe,n}}function td(e,t){var n=e.lanes;return!!Ta(n,t)}function BS(e,t,n){switch(t.tag){case oe:ym(t);var a=t.stateNode;cu();break;case ne:Cp(t);break;case pe:{var r=t.type;hr(r)&&Il(t);break}case Me:Xc(t,t.stateNode.containerInfo);break;case St:{var i=t.memoizedProps.value,u=t.type._context;yp(t,u,i);break}case Et:{var o=Ta(n,t.childLanes);o&&(t.flags|=se);{var s=t.stateNode;s.effectDuration=0,s.passiveEffectDuration=0}}break;case je:{var f=t.memoizedState;if(f!==null){if(f.dehydrated!==null)return vi(t,mu(ar.current)),t.flags|=Le,null;var m=t.child,b=m.childLanes;if(Ta(n,b))return bm(e,t,n);vi(t,mu(ar.current));var C=Wr(e,t,n);return C!==null?C.sibling:null}else vi(t,mu(ar.current));break}case gt:{var U=(e.flags&Le)!==X,L=Ta(n,t.childLanes);if(U){if(L)return Rm(e,t,n);t.flags|=Le}var M=t.memoizedState;if(M!==null&&(M.rendering=null,M.tail=null,M.lastEffect=null),vi(t,ar.current),L)break;return null}case at:case Bt:return t.lanes=H,pm(e,t,n)}return Wr(e,t,n)}function Dm(e,t,n){if(t._debugNeedsRemount&&e!==null)return FS(e,t,Hd(t.type,t.key,t.pendingProps,t._debugOwner||null,t.mode,t.lanes));if(e!==null){var a=e.memoizedProps,r=t.pendingProps;if(a!==r||Jl()||t.type!==e.type)ur=!0;else{var i=td(e,n);if(!i&&(t.flags&Le)===X)return ur=!1,BS(e,t,n);(e.flags&dr)!==X?ur=!0:ur=!1}}else if(ur=!1,yn()&&ab(t)){var u=t.index,o=rb();Zv(t,o,u)}switch(t.lanes=H,t.tag){case $t:return bS(e,t,t.type,n);case Tt:{var s=t.elementType;return yS(e,t,s,n)}case Ue:{var f=t.type,m=t.pendingProps,b=t.elementType===f?m:ir(f,m);return kf(e,t,f,b,n)}case pe:{var C=t.type,U=t.pendingProps,L=t.elementType===C?U:ir(C,U);return hm(e,t,C,L,n)}case oe:return pS(e,t,n);case ne:return mS(e,t,n);case be:return hS(e,t);case je:return bm(e,t,n);case Me:return LS(e,t,n);case ze:{var M=t.type,J=t.pendingProps,ve=t.elementType===M?J:ir(M,J);return fm(e,t,M,ve,n)}case xe:return fS(e,t,n);case st:return dS(e,t,n);case Et:return vS(e,t,n);case St:return HS(e,t,n);case ue:return jS(e,t,n);case lt:{var re=t.type,Ze=t.pendingProps,Ye=ir(re,Ze);if(t.type!==t.elementType){var E=re.propTypes;E&&Ia(E,Ye,"prop",te(re))}return Ye=ir(re.type,Ye),dm(e,t,re,Ye,n)}case Ae:return vm(e,t,t.type,t.pendingProps,n);case Ft:{var O=t.type,S=t.pendingProps,F=t.elementType===O?S:ir(O,S);return gS(e,t,O,F,n)}case gt:return Rm(e,t,n);case en:break;case at:return pm(e,t,n)}throw new Error("Unknown unit of work tag ("+t.tag+"). This error is likely caused by a bug in React. Please file an issue.")}function Or(e){e.flags|=se}function _m(e){e.flags|=Yn,e.flags|=A}function Om(e,t){var n=e!==null&&e.child===t.child;if(n)return!0;if((t.flags&Vt)!==X)return!1;for(var a=t.child;a!==null;){if((a.flags&Ee)!==X||(a.subtreeFlags&Ee)!==X)return!1;a=a.sibling}return!0}var Sl,El,Io,$o;if(Ht)Sl=function(e,t,n,a){for(var r=t.child;r!==null;){if(r.tag===ne||r.tag===be)Xa(e,r.stateNode);else if(r.tag!==Me){if(r.child!==null){r.child.return=r,r=r.child;continue}}if(r===t)return;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}},El=function(e,t){},Io=function(e,t,n,a,r){var i=e.memoizedProps;if(i!==a){var u=t.stateNode,o=ul(),s=vr(u,n,i,a,r,o);t.updateQueue=s,s&&Or(t)}},$o=function(e,t,n,a){n!==a&&Or(t)};else if(wr){Sl=function(e,t,n,a){for(var r=t.child;r!==null;){if(r.tag===ne){var i=r.stateNode;if(n&&a){var u=r.memoizedProps,o=r.type;i=$e(i,o,u,r)}Xa(e,i)}else if(r.tag===be){var s=r.stateNode;if(n&&a){var f=r.memoizedProps;s=ct(s,f,r)}Xa(e,s)}else if(r.tag!==Me){if(r.tag===at&&r.memoizedState!==null){var m=r.child;m!==null&&(m.return=r),Sl(e,r,!0,!0)}else if(r.child!==null){r.child.return=r,r=r.child;continue}}if(r=r,r===t)return;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};var Nm=function(e,t,n,a){for(var r=t.child;r!==null;){if(r.tag===ne){var i=r.stateNode;if(n&&a){var u=r.memoizedProps,o=r.type;i=$e(i,o,u,r)}$(e,i)}else if(r.tag===be){var s=r.stateNode;if(n&&a){var f=r.memoizedProps;s=ct(s,f,r)}$(e,s)}else if(r.tag!==Me){if(r.tag===at&&r.memoizedState!==null){var m=r.child;m!==null&&(m.return=r),Nm(e,r,!0,!0)}else if(r.child!==null){r.child.return=r,r=r.child;continue}}if(r=r,r===t)return;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};El=function(e,t){var n=t.stateNode,a=Om(e,t);if(!a){var r=n.containerInfo,i=ce(r);Nm(i,t,!1,!1),n.pendingChildren=i,Or(t),Re(r,i)}},Io=function(e,t,n,a,r){var i=e.stateNode,u=e.memoizedProps,o=Om(e,t);if(o&&u===a){t.stateNode=i;return}var s=t.stateNode,f=ul(),m=null;if(u!==a&&(m=vr(s,n,u,a,r,f)),o&&m===null){t.stateNode=i;return}var b=w(i,m,n,u,a,t,o,s);Vr(b,n,a,r,f)&&Or(t),t.stateNode=b,o?Or(t):Sl(b,t,!1,!1)},$o=function(e,t,n,a){if(n!==a){var r=Wc(),i=ul();t.stateNode=ri(a,r,i,t),Or(t)}else t.stateNode=e.stateNode}}else El=function(e,t){},Io=function(e,t,n,a,r){},$o=function(e,t,n,a){};function Tl(e,t){if(!yn())switch(e.tailMode){case"hidden":{for(var n=e.tail,a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e.tail=null:a.sibling=null;break}case"collapsed":{for(var r=e.tail,i=null;r!==null;)r.alternate!==null&&(i=r),r=r.sibling;i===null?!t&&e.tail!==null?e.tail.sibling=null:e.tail=null:i.sibling=null;break}}}function bn(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=H,a=X;if(t){if((e.mode&et)!==fe){for(var s=e.selfBaseDuration,f=e.child;f!==null;)n=Oe(n,Oe(f.lanes,f.childLanes)),a|=f.subtreeFlags&Pe,a|=f.flags&Pe,s+=f.treeBaseDuration,f=f.sibling;e.treeBaseDuration=s}else for(var m=e.child;m!==null;)n=Oe(n,Oe(m.lanes,m.childLanes)),a|=m.subtreeFlags&Pe,a|=m.flags&Pe,m.return=e,m=m.sibling;e.subtreeFlags|=a}else{if((e.mode&et)!==fe){for(var r=e.actualDuration,i=e.selfBaseDuration,u=e.child;u!==null;)n=Oe(n,Oe(u.lanes,u.childLanes)),a|=u.subtreeFlags,a|=u.flags,r+=u.actualDuration,i+=u.treeBaseDuration,u=u.sibling;e.actualDuration=r,e.treeBaseDuration=i}else for(var o=e.child;o!==null;)n=Oe(n,Oe(o.lanes,o.childLanes)),a|=o.subtreeFlags,a|=o.flags,o.return=e,o=o.sibling;e.subtreeFlags|=a}return e.childLanes=n,t}function VS(e,t,n){if(yb()&&(t.mode&Ge)!==fe&&(t.flags&Le)===X)return rp(t),cu(),t.flags|=fn|ca|Rt,!1;var a=so(t);if(n!==null&&n.dehydrated!==null)if(e===null){if(!a)throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");if(mb(t),bn(t),(t.mode&et)!==fe){var r=n!==null;if(r){var i=t.child;i!==null&&(t.treeBaseDuration-=i.treeBaseDuration)}}return!1}else{if(cu(),(t.flags&Le)===X&&(t.memoizedState=null),t.flags|=se,bn(t),(t.mode&et)!==fe){var u=n!==null;if(u){var o=t.child;o!==null&&(t.treeBaseDuration-=o.treeBaseDuration)}}return!1}else return ip(),!0}function Um(e,t,n){var a=t.pendingProps;switch(Oc(t),t.tag){case $t:case Tt:case Ae:case Ue:case ze:case xe:case st:case Et:case ue:case lt:return bn(t),null;case pe:{var r=t.type;return hr(r)&&Zl(t),bn(t),null}case oe:{var i=t.stateNode;if(pu(t),Zs(t),ef(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),e===null||e.child===null){var u=so(t);if(u)Or(t);else if(e!==null){var o=e.memoizedState;(!o.isDehydrated||(t.flags&fn)!==X)&&(t.flags|=Pt,ip())}}return El(e,t),bn(t),null}case ne:{Jc(t);var s=Wc(),f=t.type;if(e!==null&&t.stateNode!=null)Io(e,t,f,a,s),e.ref!==t.ref&&_m(t);else{if(!a){if(t.stateNode===null)throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");return bn(t),null}var m=ul(),b=so(t);if(b)vb(t,s,m)&&Or(t);else{var C=ni(f,a,s,m,t);Sl(C,t,!1,!1),t.stateNode=C,Vr(C,f,a,s,m)&&Or(t)}t.ref!==null&&_m(t)}return bn(t),null}case be:{var U=a;if(e&&t.stateNode!=null){var L=e.memoizedProps;$o(e,t,L,U)}else{if(typeof U!="string"&&t.stateNode===null)throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");var M=Wc(),J=ul(),ve=so(t);ve?pb(t)&&Or(t):t.stateNode=ri(U,M,J,t)}return bn(t),null}case je:{hu(t);var re=t.memoizedState;if(e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){var Ze=VS(e,t,re);if(!Ze)return t.flags&Rt?t:null}if((t.flags&Le)!==X)return t.lanes=n,(t.mode&et)!==fe&&Df(t),t;var Ye=re!==null,E=e!==null&&e.memoizedState!==null;if(Ye!==E&&Ye){var O=t.child;if(O.flags|=ea,(t.mode&Ge)!==fe){var S=e===null&&(t.memoizedProps.unstable_avoidThisFallback!==!0||!Ce);S||Zc(ar.current,Dp)?aT():xd()}}var F=t.updateQueue;if(F!==null&&(t.flags|=se),bn(t),(t.mode&et)!==fe&&Ye){var ee=t.child;ee!==null&&(t.treeBaseDuration-=ee.treeBaseDuration)}return null}case Me:return pu(t),El(e,t),e===null&&x(t.stateNode.containerInfo),bn(t),null;case St:var W=t.type._context;return Yc(W,t),bn(t),null;case Ft:{var Ve=t.type;return hr(Ve)&&Zl(t),bn(t),null}case gt:{hu(t);var ye=t.memoizedState;if(ye===null)return bn(t),null;var We=(t.flags&Le)!==X,He=ye.rendering;if(He===null)if(We)Tl(ye,!1);else{var ft=iT()&&(e===null||(e.flags&Le)===X);if(!ft)for(var le=t.child;le!==null;){var Nt=Oo(le);if(Nt!==null){We=!0,t.flags|=Le,Tl(ye,!1);var Hn=Nt.updateQueue;return Hn!==null&&(t.updateQueue=Hn,t.flags|=se),t.subtreeFlags=X,Ub(t,n),vi(t,Ic(ar.current,ll)),t.child}le=le.sibling}ye.tail!==null&&un()>th()&&(t.flags|=Le,We=!0,Tl(ye,!1),t.lanes=Ov)}else{if(!We){var Rn=Oo(He);if(Rn!==null){t.flags|=Le,We=!0;var Da=Rn.updateQueue;if(Da!==null&&(t.updateQueue=Da,t.flags|=se),Tl(ye,!0),ye.tail===null&&ye.tailMode==="hidden"&&!He.alternate&&!yn())return bn(t),null}else un()*2-ye.renderingStartTime>th()&&n!==Ea&&(t.flags|=Le,We=!0,Tl(ye,!1),t.lanes=Ov)}if(ye.isBackwards)He.sibling=t.child,t.child=He;else{var Wn=ye.last;Wn!==null?Wn.sibling=He:t.child=He,ye.last=He}}if(ye.tail!==null){var Xn=ye.tail;ye.rendering=Xn,ye.tail=Xn.sibling,ye.renderingStartTime=un(),Xn.sibling=null;var jn=ar.current;return We?jn=Ic(jn,ll):jn=mu(jn),vi(t,jn),Xn}return bn(t),null}case en:break;case at:case Bt:{Cd(t);var Zr=t.memoizedState,Nu=Zr!==null;if(e!==null){var jl=e.memoizedState,Ar=jl!==null;Ar!==Nu&&!ke&&(t.flags|=ea)}return!Nu||(t.mode&Ge)===fe?bn(t):Ta(Mr,Ea)&&(bn(t),Ht&&t.subtreeFlags&(Qe|se)&&(t.flags|=ea)),null}case Jn:return null;case Bn:return null}throw new Error("Unknown unit of work tag ("+t.tag+"). This error is likely caused by a bug in React. Please file an issue.")}function wS(e,t,n){switch(Oc(t),t.tag){case pe:{var a=t.type;hr(a)&&Zl(t);var r=t.flags;return r&Rt?(t.flags=r&~Rt|Le,(t.mode&et)!==fe&&Df(t),t):null}case oe:{var i=t.stateNode;pu(t),Zs(t),ef();var u=t.flags;return(u&Rt)!==X&&(u&Le)===X?(t.flags=u&~Rt|Le,t):null}case ne:return Jc(t),null;case je:{hu(t);var o=t.memoizedState;if(o!==null&&o.dehydrated!==null){if(t.alternate===null)throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");cu()}var s=t.flags;return s&Rt?(t.flags=s&~Rt|Le,(t.mode&et)!==fe&&Df(t),t):null}case gt:return hu(t),null;case Me:return pu(t),null;case St:var f=t.type._context;return Yc(f,t),null;case at:case Bt:return Cd(t),null;case Jn:return null;default:return null}}function Mm(e,t,n){switch(Oc(t),t.tag){case pe:{var a=t.type.childContextTypes;a!=null&&Zl(t);break}case oe:{var r=t.stateNode;pu(t),Zs(t),ef();break}case ne:{Jc(t);break}case Me:pu(t);break;case je:hu(t);break;case gt:hu(t);break;case St:var i=t.type._context;Yc(i,t);break;case at:case Bt:Cd(t);break}}function zm(e,t,n,a,r,i,u,o,s){var f=Array.prototype.slice.call(arguments,3);try{t.apply(n,f)}catch(m){this.onError(m)}}var Am=zm;if(typeof window!="undefined"&&typeof window.dispatchEvent=="function"&&typeof document!="undefined"&&typeof document.createEvent=="function"){var nd=document.createElement("react");Am=function(t,n,a,r,i,u,o,s,f){if(typeof document=="undefined"||document===null)throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");var m=document.createEvent("Event"),b=!1,C=!0,U=window.event,L=Object.getOwnPropertyDescriptor(window,"event");function M(){nd.removeEventListener(O,ve,!1),typeof window.event!="undefined"&&window.hasOwnProperty("event")&&(window.event=U)}var J=Array.prototype.slice.call(arguments,3);function ve(){b=!0,M(),n.apply(a,J),C=!1}var re,Ze=!1,Ye=!1;function E(S){if(re=S.error,Ze=!0,re===null&&S.colno===0&&S.lineno===0&&(Ye=!0),S.defaultPrevented&&re!=null&&typeof re=="object")try{re._suppressLogging=!0}catch(F){}}var O="react-"+(t||"invokeguardedcallback");if(window.addEventListener("error",E),nd.addEventListener(O,ve,!1),m.initEvent(O,!1,!1),nd.dispatchEvent(m),L&&Object.defineProperty(window,"event",L),b&&C&&(Ze?Ye&&(re=new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")):re=new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`),this.onError(re)),window.removeEventListener("error",E),!b)return M(),zm.apply(this,arguments)}}var YS=Am,Rl=!1,es=null,qS={onError:function(e){Rl=!0,es=e}};function Lm(e,t,n,a,r,i,u,o,s){Rl=!1,es=null,YS.apply(qS,arguments)}function QS(){return Rl}function Hm(){if(Rl){var e=es;return Rl=!1,es=null,e}else throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.")}var jm=null;jm=new Set;var ts=!1,Sn=!1,PS=typeof WeakSet=="function"?WeakSet:Set,Z=null,Eu=null,Tu=null;function GS(e){Lm(null,function(){throw e}),Hm()}var KS=function(e,t){if(t.props=e.memoizedProps,t.state=e.memoizedState,e.mode&et)try{_r(),t.componentWillUnmount()}finally{Dr(e)}else t.componentWillUnmount()};function Fm(e,t){try{hi(Wt,e)}catch(n){ut(e,t,n)}}function ad(e,t,n){try{KS(e,n)}catch(a){ut(e,t,a)}}function kS(e,t,n){try{n.componentDidMount()}catch(a){ut(e,t,a)}}function Bm(e,t){try{Ym(e)}catch(n){ut(e,t,n)}}function Ru(e,t){var n=e.ref;if(n!==null)if(typeof n=="function"){var a;try{if(yt&&xn&&e.mode&et)try{_r(),a=n(null)}finally{Dr(e)}else a=n(null)}catch(r){ut(e,t,r)}typeof a=="function"&&h("Unexpected return value from a callback ref in %s. A callback ref should not return a function.",I(e))}else n.current=null}function ns(e,t,n){try{n()}catch(a){ut(e,t,a)}}var Vm=null,wm=!1;function WS(e,t){Vm=Xi(e.containerInfo),Z=t,XS();var n=wm;return wm=!1,Vm=null,n}function XS(){for(;Z!==null;){var e=Z,t=e.child;(e.subtreeFlags&_e)!==X&&t!==null?(t.return=e,Z=t):JS()}}function JS(){for(;Z!==null;){var e=Z;jt(e);try{ZS(e)}catch(n){ut(e,e.return,n)}Pn();var t=e.sibling;if(t!==null){t.return=e.return,Z=t;return}Z=e.return}}function ZS(e){var t=e.alternate,n=e.flags;if((n&Pt)!==X){switch(jt(e),e.tag){case Ue:case ze:case Ae:break;case pe:{if(t!==null){var a=t.memoizedProps,r=t.memoizedState,i=e.stateNode;e.type===e.elementType&&!qi&&(i.props!==e.memoizedProps&&h("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",I(e)||"instance"),i.state!==e.memoizedState&&h("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",I(e)||"instance"));var u=i.getSnapshotBeforeUpdate(e.elementType===e.type?a:ir(e.type,a),r);{var o=jm;u===void 0&&!o.has(e.type)&&(o.add(e.type),h("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.",I(e)))}i.__reactInternalSnapshotBeforeUpdate=u}break}case oe:{if(Ht){var s=e.stateNode;D(s.containerInfo)}break}case ne:case be:case Me:case Ft:break;default:throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.")}Pn()}}function lr(e,t,n){var a=t.updateQueue,r=a!==null?a.lastEffect:null;if(r!==null){var i=r.next,u=i;do{if((u.tag&e)===e){var o=u.destroy;u.destroy=void 0,o!==void 0&&((e&gn)!==ia?qg(t):(e&Wt)!==ia&&Pv(t),(e&Rr)!==ia&&Hl(!0),ns(t,n,o),(e&Rr)!==ia&&Hl(!1),(e&gn)!==ia?Qg():(e&Wt)!==ia&&Gv())}u=u.next}while(u!==i)}}function hi(e,t){var n=t.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var r=a.next,i=r;do{if((i.tag&e)===e){(e&gn)!==ia?wg(t):(e&Wt)!==ia&&Pg(t);var u=i.create;(e&Rr)!==ia&&Hl(!0),i.destroy=u(),(e&Rr)!==ia&&Hl(!1),(e&gn)!==ia?Yg():(e&Wt)!==ia&&Gg();{var o=i.destroy;if(o!==void 0&&typeof o!="function"){var s=void 0;(i.tag&Wt)!==X?s="useLayoutEffect":(i.tag&Rr)!==X?s="useInsertionEffect":s="useEffect";var f=void 0;o===null?f=" You returned null. If your effect does not require clean up, return undefined (or nothing).":typeof o.then=="function"?f=`

It looks like you wrote `+s+`(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

`+s+`(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching`:f=" You returned: "+o,h("%s must not return anything besides a function, which is used for clean-up.%s",s,f)}}}i=i.next}while(i!==r)}}function IS(e,t){if((t.flags&se)!==X)switch(t.tag){case Et:{var n=t.stateNode.passiveEffectDuration,a=t.memoizedProps,r=a.id,i=a.onPostCommit,u=Ip(),o=t.alternate===null?"mount":"update";Zp()&&(o="nested-update"),typeof i=="function"&&i(r,o,n,u);var s=t.return;e:for(;s!==null;){switch(s.tag){case oe:var f=s.stateNode;f.passiveEffectDuration+=n;break e;case Et:var m=s.stateNode;m.passiveEffectDuration+=n;break e}s=s.return}break}}}function $S(e,t,n,a){if((n.flags&vt)!==X)switch(n.tag){case Ue:case ze:case Ae:{if(!Sn)if(n.mode&et)try{_r(),hi(Wt|kt,n)}finally{Dr(n)}else hi(Wt|kt,n);break}case pe:{var r=n.stateNode;if(n.flags&se&&!Sn)if(t===null)if(n.type===n.elementType&&!qi&&(r.props!==n.memoizedProps&&h("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",I(n)||"instance"),r.state!==n.memoizedState&&h("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",I(n)||"instance")),n.mode&et)try{_r(),r.componentDidMount()}finally{Dr(n)}else r.componentDidMount();else{var i=n.elementType===n.type?t.memoizedProps:ir(n.type,t.memoizedProps),u=t.memoizedState;if(n.type===n.elementType&&!qi&&(r.props!==n.memoizedProps&&h("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",I(n)||"instance"),r.state!==n.memoizedState&&h("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",I(n)||"instance")),n.mode&et)try{_r(),r.componentDidUpdate(i,u,r.__reactInternalSnapshotBeforeUpdate)}finally{Dr(n)}else r.componentDidUpdate(i,u,r.__reactInternalSnapshotBeforeUpdate)}var o=n.updateQueue;o!==null&&(n.type===n.elementType&&!qi&&(r.props!==n.memoizedProps&&h("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",I(n)||"instance"),r.state!==n.memoizedState&&h("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",I(n)||"instance")),Rp(n,o,r));break}case oe:{var s=n.updateQueue;if(s!==null){var f=null;if(n.child!==null)switch(n.child.tag){case ne:f=Br(n.child.stateNode);break;case pe:f=n.child.stateNode;break}Rp(n,s,f)}break}case ne:{var m=n.stateNode;if(t===null&&n.flags&se){var b=n.type,C=n.memoizedProps;Qn(m,b,C,n)}break}case be:break;case Me:break;case Et:{{var U=n.memoizedProps,L=U.onCommit,M=U.onRender,J=n.stateNode.effectDuration,ve=Ip(),re=t===null?"mount":"update";Zp()&&(re="nested-update"),typeof M=="function"&&M(n.memoizedProps.id,re,n.actualDuration,n.treeBaseDuration,n.actualStartTime,ve);{typeof L=="function"&&L(n.memoizedProps.id,re,J,ve),cT(n);var Ze=n.return;e:for(;Ze!==null;){switch(Ze.tag){case oe:var Ye=Ze.stateNode;Ye.effectDuration+=J;break e;case Et:var E=Ze.stateNode;E.effectDuration+=J;break e}Ze=Ze.return}}}break}case je:{oE(e,n);break}case gt:case Ft:case en:case at:case Bt:case Bn:break;default:throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.")}Sn||n.flags&Yn&&Ym(n)}function eE(e){switch(e.tag){case Ue:case ze:case Ae:{if(e.mode&et)try{_r(),Fm(e,e.return)}finally{Dr(e)}else Fm(e,e.return);break}case pe:{var t=e.stateNode;typeof t.componentDidMount=="function"&&kS(e,e.return,t),Bm(e,e.return);break}case ne:{Bm(e,e.return);break}}}function tE(e,t){var n=null;if(Ht)for(var a=e;;){if(a.tag===ne){if(n===null){n=a;try{var r=a.stateNode;t?Vs(r):v(a.stateNode,a.memoizedProps)}catch(u){ut(e,e.return,u)}}}else if(a.tag===be){if(n===null)try{var i=a.stateNode;t?l(i):T(i,a.memoizedProps)}catch(u){ut(e,e.return,u)}}else if(!((a.tag===at||a.tag===Bt)&&a.memoizedState!==null&&a!==e)){if(a.child!==null){a.child.return=a,a=a.child;continue}}if(a===e)return;for(;a.sibling===null;){if(a.return===null||a.return===e)return;n===a&&(n=null),a=a.return}n===a&&(n=null),a.sibling.return=a.return,a=a.sibling}}function Ym(e){var t=e.ref;if(t!==null){var n=e.stateNode,a;switch(e.tag){case ne:a=Br(n);break;default:a=n}if(typeof t=="function"){var r;if(e.mode&et)try{_r(),r=t(a)}finally{Dr(e)}else r=t(a);typeof r=="function"&&h("Unexpected return value from a callback ref in %s. A callback ref should not return a function.",I(e))}else t.hasOwnProperty("current")||h("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().",I(e)),t.current=a}}function nE(e){var t=e.alternate;t!==null&&(t.return=null),e.return=null}function qm(e){var t=e.alternate;t!==null&&(e.alternate=null,qm(t));{if(e.child=null,e.deletions=null,e.sibling=null,e.tag===ne){var n=e.stateNode;n!==null&&va(n)}e.stateNode=null,e._debugOwner=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}}function aE(e){if(wr){var t=e.stateNode,n=t.containerInfo,a=ce(n);Fe(n,a)}}function rE(e){for(var t=e.return;t!==null;){if(Qm(t))return t;t=t.return}throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.")}function Qm(e){return e.tag===ne||e.tag===oe||e.tag===Me}function Pm(e){var t=e;e:for(;;){for(;t.sibling===null;){if(t.return===null||Qm(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==ne&&t.tag!==be&&t.tag!==Fn;){if(t.flags&Qe||t.child===null||t.tag===Me)continue e;t.child.return=t,t=t.child}if(!(t.flags&Qe))return t.stateNode}}function iE(e){if(Ht){var t=rE(e);switch(t.tag){case ne:{var n=t.stateNode;t.flags&$n&&(ba(n),t.flags&=~$n);var a=Pm(e);id(e,a,n);break}case oe:case Me:{var r=t.stateNode.containerInfo,i=Pm(e);rd(e,i,r);break}default:throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.")}}}function rd(e,t,n){var a=e.tag,r=a===ne||a===be;if(r){var i=e.stateNode;t?ra(n,i,t):ya(n,i)}else if(a!==Me){var u=e.child;if(u!==null){rd(u,t,n);for(var o=u.sibling;o!==null;)rd(o,t,n),o=o.sibling}}}function id(e,t,n){var a=e.tag,r=a===ne||a===be;if(r){var i=e.stateNode;t?aa(n,i,t):vn(n,i)}else if(a!==Me){var u=e.child;if(u!==null){id(u,t,n);for(var o=u.sibling;o!==null;)id(o,t,n),o=o.sibling}}}var En=null,or=!1;function uE(e,t,n){if(Ht){var a=t;e:for(;a!==null;){switch(a.tag){case ne:{En=a.stateNode,or=!1;break e}case oe:{En=a.stateNode.containerInfo,or=!0;break e}case Me:{En=a.stateNode.containerInfo,or=!0;break e}}a=a.return}if(En===null)throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");ud(e,t,n),En=null,or=!1}else ud(e,t,n);nE(n)}function Nr(e,t,n){for(var a=n.child;a!==null;)ud(e,t,a),a=a.sibling}function ud(e,t,n){switch(jg(n),n.tag){case ne:Sn||Ru(n,t);case be:{if(Ht){var a=En,r=or;En=null,Nr(e,t,n),En=a,or=r,En!==null&&(or?ja(En,n.stateNode):Ha(En,n.stateNode))}else Nr(e,t,n);return}case Fn:{Ht&&En!==null&&(or?By(En,n.stateNode):Fy(En,n.stateNode));return}case Me:{if(Ht){var i=En,u=or;En=n.stateNode.containerInfo,or=!0,Nr(e,t,n),En=i,or=u}else aE(n),Nr(e,t,n);return}case Ue:case ze:case lt:case Ae:{if(!Sn){var o=n.updateQueue;if(o!==null){var s=o.lastEffect;if(s!==null){var f=s.next,m=f;do{var b=m,C=b.destroy,U=b.tag;C!==void 0&&((U&Rr)!==ia?ns(n,t,C):(U&Wt)!==ia&&(Pv(n),n.mode&et?(_r(),ns(n,t,C),Dr(n)):ns(n,t,C),Gv())),m=m.next}while(m!==f)}}}Nr(e,t,n);return}case pe:{if(!Sn){Ru(n,t);var L=n.stateNode;typeof L.componentWillUnmount=="function"&&ad(n,t,L)}Nr(e,t,n);return}case en:{Nr(e,t,n);return}case at:{if(n.mode&Ge){var M=Sn;Sn=M||n.memoizedState!==null,Nr(e,t,n),Sn=M}else Nr(e,t,n);break}default:{Nr(e,t,n);return}}}function lE(e){var t=e.memoizedState}function oE(e,t){if(Dt){var n=t.memoizedState;if(n===null){var a=t.alternate;if(a!==null){var r=a.memoizedState;if(r!==null){var i=r.dehydrated;i!==null&&jy(i)}}}}}function Gm(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new PS),t.forEach(function(a){var r=yT.bind(null,e,a);if(!n.has(a)){if(n.add(a),er)if(Eu!==null&&Tu!==null)Ll(Tu,Eu);else throw Error("Expected finished root and lanes to be set. This is a bug in React.");a.then(r,r)}})}}function sE(e,t,n){Eu=n,Tu=e,jt(t),Km(t,e),jt(t),Eu=null,Tu=null}function sr(e,t,n){var a=t.deletions;if(a!==null)for(var r=0;r<a.length;r++){var i=a[r];try{uE(e,t,i)}catch(s){ut(i,t,s)}}var u=Cb();if(t.subtreeFlags&Ee)for(var o=t.child;o!==null;)jt(o),Km(o,e),o=o.sibling;jt(u)}function Km(e,t,n){var a=e.alternate,r=e.flags;switch(e.tag){case Ue:case ze:case lt:case Ae:{if(sr(t,e),Ur(e),r&se){try{lr(Rr|kt,e,e.return),hi(Rr|kt,e)}catch(le){ut(e,e.return,le)}if(e.mode&et){try{_r(),lr(Wt|kt,e,e.return)}catch(le){ut(e,e.return,le)}Dr(e)}else try{lr(Wt|kt,e,e.return)}catch(le){ut(e,e.return,le)}}return}case pe:{sr(t,e),Ur(e),r&Yn&&a!==null&&Ru(a,a.return);return}case ne:{if(sr(t,e),Ur(e),r&Yn&&a!==null&&Ru(a,a.return),Ht){if(e.flags&$n){var i=e.stateNode;try{ba(i)}catch(le){ut(e,e.return,le)}}if(r&se){var u=e.stateNode;if(u!=null){var o=e.memoizedProps,s=a!==null?a.memoizedProps:o,f=e.type,m=e.updateQueue;if(e.updateQueue=null,m!==null)try{na(u,m,f,s,o,e)}catch(le){ut(e,e.return,le)}}}}return}case be:{if(sr(t,e),Ur(e),r&se&&Ht){if(e.stateNode===null)throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");var b=e.stateNode,C=e.memoizedProps,U=a!==null?a.memoizedProps:C;try{ga(b,U,C)}catch(le){ut(e,e.return,le)}}return}case oe:{if(sr(t,e),Ur(e),r&se){if(Ht&&Dt&&a!==null){var L=a.memoizedState;if(L.isDehydrated)try{Hy(t.containerInfo)}catch(le){ut(e,e.return,le)}}if(wr){var M=t.containerInfo,J=t.pendingChildren;try{Fe(M,J)}catch(le){ut(e,e.return,le)}}}return}case Me:{if(sr(t,e),Ur(e),r&se&&wr){var ve=e.stateNode,re=ve.containerInfo,Ze=ve.pendingChildren;try{Fe(re,Ze)}catch(le){ut(e,e.return,le)}}return}case je:{sr(t,e),Ur(e);var Ye=e.child;if(Ye.flags&ea){var E=Ye.stateNode,O=Ye.memoizedState,S=O!==null;if(E.isHidden=S,S){var F=Ye.alternate!==null&&Ye.alternate.memoizedState!==null;F||nT()}}if(r&se){try{lE(e)}catch(le){ut(e,e.return,le)}Gm(e)}return}case at:{var ee=a!==null&&a.memoizedState!==null;if(e.mode&Ge){var W=Sn;Sn=W||ee,sr(t,e),Sn=W}else sr(t,e);if(Ur(e),r&ea){var Ve=e.stateNode,ye=e.memoizedState,We=ye!==null,He=e;if(Ve.isHidden=We,We&&!ee&&(He.mode&Ge)!==fe){Z=He;for(var ft=He.child;ft!==null;)Z=ft,fE(ft),ft=ft.sibling}Ht&&tE(He,We)}return}case gt:{sr(t,e),Ur(e),r&se&&Gm(e);return}case en:return;default:{sr(t,e),Ur(e);return}}}function Ur(e){var t=e.flags;if(t&Qe){try{iE(e)}catch(n){ut(e,e.return,n)}e.flags&=~Qe}t&dn&&(e.flags&=~dn)}function cE(e,t,n){Eu=n,Tu=t,Z=e,km(e,t,n),Eu=null,Tu=null}function km(e,t,n){for(var a=(e.mode&Ge)!==fe;Z!==null;){var r=Z,i=r.child;if(r.tag===at&&a){var u=r.memoizedState!==null,o=u||ts;if(o){ld(e,t,n);continue}else{var s=r.alternate,f=s!==null&&s.memoizedState!==null,m=f||Sn,b=ts,C=Sn;ts=o,Sn=m,Sn&&!C&&(Z=r,dE(r));for(var U=i;U!==null;)Z=U,km(U,t,n),U=U.sibling;Z=r,ts=b,Sn=C,ld(e,t,n);continue}}(r.subtreeFlags&vt)!==X&&i!==null?(i.return=r,Z=i):ld(e,t,n)}}function ld(e,t,n){for(;Z!==null;){var a=Z;if((a.flags&vt)!==X){var r=a.alternate;jt(a);try{$S(t,r,a,n)}catch(u){ut(a,a.return,u)}Pn()}if(a===e){Z=null;return}var i=a.sibling;if(i!==null){i.return=a.return,Z=i;return}Z=a.return}}function fE(e){for(;Z!==null;){var t=Z,n=t.child;switch(t.tag){case Ue:case ze:case lt:case Ae:{if(t.mode&et)try{_r(),lr(Wt,t,t.return)}finally{Dr(t)}else lr(Wt,t,t.return);break}case pe:{Ru(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&ad(t,t.return,a);break}case ne:{Ru(t,t.return);break}case at:{var r=t.memoizedState!==null;if(r){Wm(e);continue}break}}n!==null?(n.return=t,Z=n):Wm(e)}}function Wm(e){for(;Z!==null;){var t=Z;if(t===e){Z=null;return}var n=t.sibling;if(n!==null){n.return=t.return,Z=n;return}Z=t.return}}function dE(e){for(;Z!==null;){var t=Z,n=t.child;if(t.tag===at){var a=t.memoizedState!==null;if(a){Xm(e);continue}}n!==null?(n.return=t,Z=n):Xm(e)}}function Xm(e){for(;Z!==null;){var t=Z;jt(t);try{eE(t)}catch(a){ut(t,t.return,a)}if(Pn(),t===e){Z=null;return}var n=t.sibling;if(n!==null){n.return=t.return,Z=n;return}Z=t.return}}function vE(e,t,n,a){Z=t,pE(t,e,n,a)}function pE(e,t,n,a){for(;Z!==null;){var r=Z,i=r.child;(r.subtreeFlags&Xe)!==X&&i!==null?(i.return=r,Z=i):mE(e,t,n,a)}}function mE(e,t,n,a){for(;Z!==null;){var r=Z;if((r.flags&At)!==X){jt(r);try{hE(t,r,n,a)}catch(u){ut(r,r.return,u)}Pn()}if(r===e){Z=null;return}var i=r.sibling;if(i!==null){i.return=r.return,Z=i;return}Z=r.return}}function hE(e,t,n,a){switch(t.tag){case Ue:case ze:case Ae:{if(t.mode&et){xf();try{hi(gn|kt,t)}finally{Cf(t)}}else hi(gn|kt,t);break}}}function yE(e){Z=e,gE()}function gE(){for(;Z!==null;){var e=Z,t=e.child;if((Z.flags&Vt)!==X){var n=e.deletions;if(n!==null){for(var a=0;a<n.length;a++){var r=n[a];Z=r,EE(r,e)}{var i=e.alternate;if(i!==null){var u=i.child;if(u!==null){i.child=null;do{var o=u.sibling;u.sibling=null,u=o}while(u!==null)}}}Z=e}}(e.subtreeFlags&Xe)!==X&&t!==null?(t.return=e,Z=t):bE()}}function bE(){for(;Z!==null;){var e=Z;(e.flags&At)!==X&&(jt(e),SE(e),Pn());var t=e.sibling;if(t!==null){t.return=e.return,Z=t;return}Z=e.return}}function SE(e){switch(e.tag){case Ue:case ze:case Ae:{e.mode&et?(xf(),lr(gn|kt,e,e.return),Cf(e)):lr(gn|kt,e,e.return);break}}}function EE(e,t){for(;Z!==null;){var n=Z;jt(n),RE(n,t),Pn();var a=n.child;a!==null?(a.return=n,Z=a):TE(e)}}function TE(e){for(;Z!==null;){var t=Z,n=t.sibling,a=t.return;if(qm(t),t===e){Z=null;return}if(n!==null){n.return=a,Z=n;return}Z=a}}function RE(e,t){switch(e.tag){case Ue:case ze:case Ae:{e.mode&et?(xf(),lr(gn,e,t),Cf(e)):lr(gn,e,t);break}}}function CE(e){switch(e.tag){case Ue:case ze:case Ae:{try{hi(Wt|kt,e)}catch(n){ut(e,e.return,n)}break}case pe:{var t=e.stateNode;try{t.componentDidMount()}catch(n){ut(e,e.return,n)}break}}}function xE(e){switch(e.tag){case Ue:case ze:case Ae:{try{hi(gn|kt,e)}catch(t){ut(e,e.return,t)}break}}}function DE(e){switch(e.tag){case Ue:case ze:case Ae:{try{lr(Wt|kt,e,e.return)}catch(n){ut(e,e.return,n)}break}case pe:{var t=e.stateNode;typeof t.componentWillUnmount=="function"&&ad(e,e.return,t);break}}}function _E(e){switch(e.tag){case Ue:case ze:case Ae:try{lr(gn|kt,e,e.return)}catch(t){ut(e,e.return,t)}}}var as=0,rs=1,is=2,us=3,ls=4;if(typeof Symbol=="function"&&Symbol.for){var Cl=Symbol.for;as=Cl("selector.component"),rs=Cl("selector.has_pseudo_class"),is=Cl("selector.role"),us=Cl("selector.test_id"),ls=Cl("selector.text")}function OE(e){return{$$typeof:as,value:e}}function NE(e){return{$$typeof:rs,value:e}}function UE(e){return{$$typeof:is,value:e}}function ME(e){return{$$typeof:ls,value:e}}function zE(e){return{$$typeof:us,value:e}}function od(e){var t=ii(e);if(t!=null){if(typeof t.memoizedProps["data-testname"]!="string")throw new Error("Invalid host root specified. Should be either a React container or a node with a testname attribute.");return t}else{var n=ma(e);if(n===null)throw new Error("Could not find React container within specified host subtree.");return n.stateNode.current}}function sd(e,t){switch(t.$$typeof){case as:if(e.type===t.value)return!0;break;case rs:return AE(e,t.value);case is:if(e.tag===ne){var n=e.stateNode;if(ha(n,t.value))return!0}break;case ls:if(e.tag===ne||e.tag===be){var a=Aa(e);if(a!==null&&a.indexOf(t.value)>=0)return!0}break;case us:if(e.tag===ne){var r=e.memoizedProps["data-testname"];if(typeof r=="string"&&r.toLowerCase()===t.value.toLowerCase())return!0}break;default:throw new Error("Invalid selector type specified.")}return!1}function cd(e){switch(e.$$typeof){case as:var t=te(e.value)||"Unknown";return"<"+t+">";case rs:return":has("+(cd(e)||"")+")";case is:return'[role="'+e.value+'"]';case ls:return'"'+e.value+'"';case us:return'[data-testname="'+e.value+'"]';default:throw new Error("Invalid selector type specified.")}}function Jm(e,t){for(var n=[],a=[e,0],r=0;r<a.length;){var i=a[r++],u=a[r++],o=t[u];if(!(i.tag===ne&&Mn(i))){for(;o!=null&&sd(i,o);)u++,o=t[u];if(u===t.length)n.push(i);else for(var s=i.child;s!==null;)a.push(s,u),s=s.sibling}}return n}function AE(e,t){for(var n=[e,0],a=0;a<n.length;){var r=n[a++],i=n[a++],u=t[i];if(!(r.tag===ne&&Mn(r))){for(;u!=null&&sd(r,u);)i++,u=t[i];if(i===t.length)return!0;for(var o=r.child;o!==null;)n.push(o,i),o=o.sibling}}return!1}function os(e,t){if(!nn)throw new Error("Test selector API is not supported by this renderer.");for(var n=od(e),a=Jm(n,t),r=[],i=Array.from(a),u=0;u<i.length;){var o=i[u++];if(o.tag===ne){if(Mn(o))continue;r.push(o.stateNode)}else for(var s=o.child;s!==null;)i.push(s),s=s.sibling}return r}function LE(e,t){if(!nn)throw new Error("Test selector API is not supported by this renderer.");for(var n=od(e),a=0,r=[],i=[n,0],u=0;u<i.length;){var o=i[u++],s=i[u++],f=t[s];if(!(o.tag===ne&&Mn(o))&&(sd(o,f)&&(r.push(cd(f)),s++,s>a&&(a=s)),s<t.length))for(var m=o.child;m!==null;)i.push(m,s),m=m.sibling}if(a<t.length){for(var b=[],C=a;C<t.length;C++)b.push(cd(t[C]));return`findAllNodes was able to match part of the selector:
`+("  "+r.join(" > ")+`

`)+`No matching component was found for:
`+("  "+b.join(" > "))}return null}function HE(e,t){if(!nn)throw new Error("Test selector API is not supported by this renderer.");for(var n=os(e,t),a=[],r=0;r<n.length;r++)a.push(za(n[r]));for(var i=a.length-1;i>0;i--)for(var u=a[i],o=u.x,s=o+u.width,f=u.y,m=f+u.height,b=i-1;b>=0;b--)if(i!==b){var C=a[b],U=C.x,L=U+C.width,M=C.y,J=M+C.height;if(o>=U&&f>=M&&s<=L&&m<=J){a.splice(i,1);break}else if(o===U&&u.width===C.width&&!(J<f)&&!(M>m)){M>f&&(C.height+=M-f,C.y=f),J<m&&(C.height=m-M),a.splice(i,1);break}else if(f===M&&u.height===C.height&&!(L<o)&&!(U>s)){U>o&&(C.width+=U-o,C.x=o),L<s&&(C.width=s-U),a.splice(i,1);break}}return a}function jE(e,t){if(!nn)throw new Error("Test selector API is not supported by this renderer.");for(var n=od(e),a=Jm(n,t),r=Array.from(a),i=0;i<r.length;){var u=r[i++];if(!Mn(u)){if(u.tag===ne){var o=u.stateNode;if(qn(o))return!0}for(var s=u.child;s!==null;)r.push(s),s=s.sibling}}return!1}var ss=[];function FE(){nn&&ss.forEach(function(e){return e()})}function BE(e,t,n,a){if(!nn)throw new Error("Test selector API is not supported by this renderer.");var r=os(e,t),i=La(r,n,a),u=i.disconnect,o=i.observe,s=i.unobserve,f=function(){var m=os(e,t);r.forEach(function(b){m.indexOf(b)<0&&s(b)}),m.forEach(function(b){r.indexOf(b)<0&&o(b)})};return ss.push(f),{disconnect:function(){var m=ss.indexOf(f);m>=0&&ss.splice(m,1),u()}}}var VE=z.ReactCurrentActQueue;function wE(e){{var t=typeof IS_REACT_ACT_ENVIRONMENT!="undefined"?IS_REACT_ACT_ENVIRONMENT:void 0,n=typeof jest!="undefined";return Oi&&n&&t!==!1}}function Zm(){{var e=typeof IS_REACT_ACT_ENVIRONMENT!="undefined"?IS_REACT_ACT_ENVIRONMENT:void 0;return!e&&VE.current!==null&&h("The current testing environment is not configured to support act(...)"),e}}var YE=Math.ceil,fd=z.ReactCurrentDispatcher,dd=z.ReactCurrentOwner,Ct=z.ReactCurrentBatchConfig,cr=z.ReactCurrentActQueue,qt=0,vd=1,Tn=2,qa=4,Xr=0,xl=1,Qi=2,cs=3,Dl=4,Im=5,pd=6,Ne=qt,kn=null,xt=null,Zt=H,Mr=H,md=oi(H),It=Xr,_l=null,hd=H,fs=H,Ol=H,ds=H,Nl=null,ua=null,yd=0,$m=500,eh=1/0,qE=500,Jr=null;function Cu(){eh=un()+qE}function th(){return eh}var vs=!1,gd=null,xu=null,Pi=!1,yi=null,Ul=H,bd=[],Sd=null,QE=50,Ml=0,Ed=null,Td=!1,ps=!1,PE=50,Du=0,ms=null,zl=mt,hs=H,nh=!1;function ys(){return kn}function Ln(){return(Ne&(Tn|qa))!==qt?un():(zl!==mt||(zl=un()),zl)}function gi(e){var t=e.mode;if((t&Ge)===fe)return he;if((Ne&Tn)!==qt&&Zt!==H)return Qu(Zt);var n=Sb()!==bb;if(n){if(Ct.transition!==null){var a=Ct.transition;a._updatedFibers||(a._updatedFibers=new Set),a._updatedFibers.add(e)}return hs===an&&(hs=zv()),hs}var r=$a();if(r!==an)return r;var i=da();return i}function GE(e){var t=e.mode;return(t&Ge)===fe?he:bg()}function Qt(e,t,n,a){bT(),nh&&h("useInsertionEffect must not schedule updates."),Td&&(ps=!0),Pu(e,n,a),(Ne&Tn)!==H&&e===kn?TT(t):(er&&Hv(e,t,n),RT(t),e===kn&&((Ne&Tn)===qt&&(Ol=Oe(Ol,n)),It===Dl&&bi(e,Zt)),la(e,a),n===he&&Ne===qt&&(t.mode&Ge)===fe&&!cr.isBatchingLegacy&&(Cu(),Xv()))}function KE(e,t,n){var a=e.current;a.lanes=t,Pu(e,t,n),la(e,n)}function kE(e){return(Ne&Tn)!==qt}function la(e,t){var n=e.callbackNode;vg(e,t);var a=no(e,e===kn?Zt:H);if(a===H){n!==null&&yh(n),e.callbackNode=null,e.callbackPriority=an;return}var r=Mi(a),i=e.callbackPriority;if(i===r&&!(cr.current!==null&&n!==Od)){n==null&&i!==he&&h("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");return}n!=null&&yh(n);var u;if(r===he)e.tag===tu?(cr.isBatchingLegacy!==null&&(cr.didScheduleLegacyUpdate=!0),nb(ih.bind(null,e))):Wv(ih.bind(null,e)),pa?cr.current!==null?cr.current.push(Er):Ma(function(){(Ne&(Tn|qa))===qt&&Er()}):Rs(io,Er),u=null;else{var o;switch(Vv(a)){case br:o=io;break;case Gu:o=Yv;break;case Ku:o=uu;break;case Rc:o=qv;break;default:o=uu;break}u=Rs(o,ah.bind(null,e))}e.callbackPriority=r,e.callbackNode=u}function ah(e,t){if(Ib(),zl=mt,hs=H,(Ne&(Tn|qa))!==qt)throw new Error("Should not already be working.");var n=e.callbackNode,a=zr();if(a&&e.callbackNode!==n)return null;var r=no(e,e===kn?Zt:H);if(r===H)return null;var i=!ao(e,r)&&!gg(e,r)&&!t,u=i?lT(e,r):Ss(e,r);if(u!==Xr){if(u===Qi){var o=gc(e);o!==H&&(r=o,u=Rd(e,o))}if(u===xl){var s=_l;throw Gi(e,H),bi(e,r),la(e,un()),s}if(u===pd)bi(e,r);else{var f=!ao(e,r),m=e.current.alternate;if(f&&!XE(m)){if(u=Ss(e,r),u===Qi){var b=gc(e);b!==H&&(r=b,u=Rd(e,b))}if(u===xl){var C=_l;throw Gi(e,H),bi(e,r),la(e,un()),C}}e.finishedWork=m,e.finishedLanes=r,WE(e,u,r)}}return la(e,un()),e.callbackNode===n?ah.bind(null,e):null}function Rd(e,t){var n=Nl;if(Jv(e)){var a=Gi(e,t);a.flags|=fn,eg(e.containerInfo)}var r=Ss(e,t);if(r!==Qi){var i=ua;ua=n,i!==null&&rh(i)}return r}function rh(e){ua===null?ua=e:ua.push.apply(ua,e)}function WE(e,t,n){switch(t){case Xr:case xl:throw new Error("Root did not complete. This is a bug in React.");case Qi:{Ki(e,ua,Jr);break}case cs:{if(bi(e,n),Uv(n)&&!gh()){var a=yd+$m-un();if(a>10){var r=no(e,H);if(r!==H)break;var i=e.suspendedLanes;if(!iu(i,n)){var u=Ln();Lv(e,i);break}e.timeoutHandle=_i(Ki.bind(null,e,ua,Jr),a);break}}Ki(e,ua,Jr);break}case Dl:{if(bi(e,n),yg(n))break;if(!gh()){var o=fg(e,n),s=o,f=un()-s,m=gT(f)-f;if(m>10){e.timeoutHandle=_i(Ki.bind(null,e,ua,Jr),m);break}}Ki(e,ua,Jr);break}case Im:{Ki(e,ua,Jr);break}default:throw new Error("Unknown root exit status.")}}function XE(e){for(var t=e;;){if(t.flags&Na){var n=t.updateQueue;if(n!==null){var a=n.stores;if(a!==null)for(var r=0;r<a.length;r++){var i=a[r],u=i.getSnapshot,o=i.value;try{if(!Ra(u(),o))return!1}catch(f){return!1}}}}var s=t.child;if(t.subtreeFlags&Na&&s!==null){s.return=t,t=s;continue}if(t===e)return!0;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}return!0}function bi(e,t){t=ro(t,ds),t=ro(t,Ol),Eg(e,t)}function ih(e){if($b(),(Ne&(Tn|qa))!==qt)throw new Error("Should not already be working.");zr();var t=no(e,H);if(!Ta(t,he))return la(e,un()),null;var n=Ss(e,t);if(e.tag!==tu&&n===Qi){var a=gc(e);a!==H&&(t=a,n=Rd(e,a))}if(n===xl){var r=_l;throw Gi(e,H),bi(e,t),la(e,un()),r}if(n===pd)throw new Error("Root did not complete. This is a bug in React.");var i=e.current.alternate;return e.finishedWork=i,e.finishedLanes=t,Ki(e,ua,Jr),la(e,un()),null}function JE(e,t){t!==H&&(Tc(e,Oe(t,he)),la(e,un()),(Ne&(Tn|qa))===qt&&(Cu(),Er()))}function ZE(e){var t=$a(),n=Ct.transition;try{return Ct.transition=null,rn(Ku),e()}finally{rn(t),Ct.transition=n}}function IE(e,t){var n=Ne;Ne|=vd;try{return e(t)}finally{Ne=n,Ne===qt&&!cr.isBatchingLegacy&&(Cu(),Xv())}}function $E(e,t,n,a,r){var i=$a(),u=Ct.transition;try{return Ct.transition=null,rn(br),e(t,n,a,r)}finally{rn(i),Ct.transition=u,Ne===qt&&Cu()}}function gs(e){yi!==null&&yi.tag===tu&&(Ne&(Tn|qa))===qt&&zr();var t=Ne;Ne|=vd;var n=Ct.transition,a=$a();try{return Ct.transition=null,rn(br),e?e():void 0}finally{rn(a),Ct.transition=n,Ne=t,(Ne&(Tn|qa))===qt&&Er()}}function eT(){return(Ne&(Tn|qa))!==qt}function tT(e){var t=Ne;Ne|=vd;var n=Ct.transition,a=$a();try{Ct.transition=null,rn(br),e()}finally{rn(a),Ct.transition=n,Ne=t,Ne===qt&&(Cu(),Er())}}function bs(e,t){pn(md,Mr,e),Mr=Oe(Mr,t),hd=Oe(hd,t)}function Cd(e){Mr=md.current,zn(md,e)}function Gi(e,t){e.finishedWork=null,e.finishedLanes=H;var n=e.timeoutHandle;if(n!==Ja&&(e.timeoutHandle=Ja,Ji(n)),xt!==null)for(var a=xt.return;a!==null;){var r=a.alternate;Mm(r,a),a=a.return}kn=e;var i=ki(e.current,null);return xt=i,Zt=Mr=hd=t,It=Xr,_l=null,fs=H,Ol=H,ds=H,Nl=null,ua=null,Ab(),nr.discardPendingWarnings(),i}function uh(e,t){do{var n=xt;try{if(go(),Op(),Pn(),dd.current=null,n===null||n.return===null){It=xl,_l=t,xt=null;return}if(yt&&n.mode&et&&ko(n,!0),ot)if(lu(),t!==null&&typeof t=="object"&&typeof t.then=="function"){var a=t;kg(n,a,Zt)}else Kg(n,t,Zt);oS(e,n.return,n,t,Zt),ch(n)}catch(r){t=r,xt===n&&n!==null?(n=n.return,xt=n):n=xt;continue}return}while(!0)}function lh(){var e=fd.current;return fd.current=qo,e===null?qo:e}function oh(e){fd.current=e}function nT(){yd=un()}function Al(e){fs=Oe(e,fs)}function aT(){It===Xr&&(It=cs)}function xd(){(It===Xr||It===cs||It===Qi)&&(It=Dl),kn!==null&&(bc(fs)||bc(Ol))&&bi(kn,Zt)}function rT(e){It!==Dl&&(It=Qi),Nl===null?Nl=[e]:Nl.push(e)}function iT(){return It===Xr}function Ss(e,t){var n=Ne;Ne|=Tn;var a=lh();if(kn!==e||Zt!==t){if(er){var r=e.memoizedUpdaters;r.size>0&&(Ll(e,Zt),r.clear()),jv(e,t)}Jr=Fv(),Gi(e,t)}Kv(t);do try{uT();break}catch(i){uh(e,i)}while(!0);if(go(),Ne=n,oh(a),xt!==null)throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");return kv(),kn=null,Zt=H,It}function uT(){for(;xt!==null;)sh(xt)}function lT(e,t){var n=Ne;Ne|=Tn;var a=lh();if(kn!==e||Zt!==t){if(er){var r=e.memoizedUpdaters;r.size>0&&(Ll(e,Zt),r.clear()),jv(e,t)}Jr=Fv(),Cu(),Gi(e,t)}Kv(t);do try{oT();break}catch(i){uh(e,i)}while(!0);return go(),oh(a),Ne=n,xt!==null?(Ig(),Xr):(kv(),kn=null,Zt=H,It)}function oT(){for(;xt!==null&&!Og();)sh(xt)}function sh(e){var t=e.alternate;jt(e);var n;(e.mode&et)!==fe?(Rf(e),n=Dd(t,e,Mr),ko(e,!0)):n=Dd(t,e,Mr),Pn(),e.memoizedProps=e.pendingProps,n===null?ch(e):xt=n,dd.current=null}function ch(e){var t=e;do{var n=t.alternate,a=t.return;if((t.flags&ca)===X){jt(t);var r=void 0;if((t.mode&et)===fe?r=Um(n,t,Mr):(Rf(t),r=Um(n,t,Mr),ko(t,!1)),Pn(),r!==null){xt=r;return}}else{var i=wS(n,t);if(i!==null){i.flags&=Ir,xt=i;return}if((t.mode&et)!==fe){ko(t,!1);for(var u=t.actualDuration,o=t.child;o!==null;)u+=o.actualDuration,o=o.sibling;t.actualDuration=u}if(a!==null)a.flags|=ca,a.subtreeFlags=X,a.deletions=null;else{It=pd,xt=null;return}}var s=t.sibling;if(s!==null){xt=s;return}t=a,xt=t}while(t!==null);It===Xr&&(It=Im)}function Ki(e,t,n){var a=$a(),r=Ct.transition;try{Ct.transition=null,rn(br),sT(e,t,n,a)}finally{Ct.transition=r,rn(a)}return null}function sT(e,t,n,a){do zr();while(yi!==null);if(ST(),(Ne&(Tn|qa))!==qt)throw new Error("Should not already be working.");var r=e.finishedWork,i=e.finishedLanes;if(Vg(i),r===null)return Qv(),null;if(i===H&&h("root.finishedLanes should not be empty during a commit. This is a bug in React."),e.finishedWork=null,e.finishedLanes=H,r===e.current)throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");e.callbackNode=null,e.callbackPriority=an;var u=Oe(r.lanes,r.childLanes);Tg(e,u),e===kn&&(kn=null,xt=null,Zt=H),((r.subtreeFlags&Xe)!==X||(r.flags&Xe)!==X)&&(Pi||(Pi=!0,Sd=n,Rs(uu,function(){return zr(),null})));var o=(r.subtreeFlags&(_e|Ee|vt|Xe))!==X,s=(r.flags&(_e|Ee|vt|Xe))!==X;if(o||s){var f=Ct.transition;Ct.transition=null;var m=$a();rn(br);var b=Ne;Ne|=qa,dd.current=null;var C=WS(e,r);$p(),sE(e,r,i),ti(e.containerInfo),e.current=r,Wg(i),cE(r,e,i),Xg(),Ng(),Ne=b,rn(m),Ct.transition=f}else e.current=r,$p();var U=Pi;if(Pi?(Pi=!1,yi=e,Ul=i):(Du=0,ms=null),u=e.pendingLanes,u===H&&(xu=null),U||ph(e.current,!1),Lg(r.stateNode,a),er&&e.memoizedUpdaters.clear(),FE(),la(e,un()),t!==null)for(var L=e.onRecoverableError,M=0;M<t.length;M++){var J=t[M],ve=J.stack,re=J.digest;L(J.value,{componentStack:ve,digest:re})}if(vs){vs=!1;var Ze=gd;throw gd=null,Ze}return Ta(Ul,he)&&e.tag!==tu&&zr(),u=e.pendingLanes,Ta(u,he)?(Zb(),e===Ed?Ml++:(Ml=0,Ed=e)):Ml=0,Er(),Qv(),null}function zr(){if(yi!==null){var e=Vv(Ul),t=Dg(Ku,e),n=Ct.transition,a=$a();try{return Ct.transition=null,rn(t),fT()}finally{rn(a),Ct.transition=n}}return!1}function cT(e){bd.push(e),Pi||(Pi=!0,Rs(uu,function(){return zr(),null}))}function fT(){if(yi===null)return!1;var e=Sd;Sd=null;var t=yi,n=Ul;if(yi=null,Ul=H,(Ne&(Tn|qa))!==qt)throw new Error("Cannot flush passive effects while already rendering.");Td=!0,ps=!1,Jg(n);var a=Ne;Ne|=qa,yE(t.current),vE(t,t.current,n,e);{var r=bd;bd=[];for(var i=0;i<r.length;i++){var u=r[i];IS(t,u)}}Zg(),ph(t.current,!0),Ne=a,Er(),ps?t===ms?Du++:(Du=0,ms=t):Du=0,Td=!1,ps=!1,Hg(t);{var o=t.current.stateNode;o.effectDuration=0,o.passiveEffectDuration=0}return!0}function fh(e){return xu!==null&&xu.has(e)}function dT(e){xu===null?xu=new Set([e]):xu.add(e)}function vT(e){vs||(vs=!0,gd=e)}var pT=vT;function dh(e,t,n){var a=Yi(n,t),r=lm(e,a,he),i=fi(e,r,he),u=Ln();i!==null&&(Pu(i,he,u),la(i,u))}function ut(e,t,n){if(GS(n),Hl(!1),e.tag===oe){dh(e,e,n);return}var a=null;for(a=t;a!==null;){if(a.tag===oe){dh(a,e,n);return}else if(a.tag===pe){var r=a.type,i=a.stateNode;if(typeof r.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&!fh(i)){var u=Yi(n,e),o=Yf(a,u,he),s=fi(a,o,he),f=Ln();s!==null&&(Pu(s,he,f),la(s,f));return}}a=a.return}h(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`,n)}function mT(e,t,n){var a=e.pingCache;a!==null&&a.delete(t);var r=Ln();Lv(e,n),CT(e),kn===e&&iu(Zt,n)&&(It===Dl||It===cs&&Uv(Zt)&&un()-yd<$m?Gi(e,H):ds=Oe(ds,n)),la(e,r)}function vh(e,t){t===an&&(t=GE(e));var n=Ln(),a=Gn(e,t);a!==null&&(Pu(a,t,n),la(a,n))}function hT(e){var t=e.memoizedState,n=an;t!==null&&(n=t.retryLane),vh(e,n)}function yT(e,t){var n=an,a;switch(e.tag){case je:a=e.stateNode;var r=e.memoizedState;r!==null&&(n=r.retryLane);break;case gt:a=e.stateNode;break;default:throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.")}a!==null&&a.delete(t),vh(e,n)}function gT(e){return e<120?120:e<480?480:e<1080?1080:e<1920?1920:e<3e3?3e3:e<4320?4320:YE(e/1960)*1960}function bT(){if(Ml>QE)throw Ml=0,Ed=null,new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");Du>PE&&(Du=0,ms=null,h("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."))}function ST(){nr.flushLegacyContextWarning(),nr.flushPendingUnsafeLifecycleWarnings()}function ph(e,t){jt(e),Es(e,Te,DE),t&&Es(e,Be,_E),Es(e,Te,CE),t&&Es(e,Be,xE),Pn()}function Es(e,t,n){for(var a=e,r=null;a!==null;){var i=a.subtreeFlags&t;a!==r&&a.child!==null&&i!==X?a=a.child:((a.flags&t)!==X&&n(a),a.sibling!==null?a=a.sibling:a=r=a.return)}}var Ts=null;function mh(e){{if((Ne&Tn)!==qt||!(e.mode&Ge))return;var t=e.tag;if(t!==$t&&t!==oe&&t!==pe&&t!==Ue&&t!==ze&&t!==lt&&t!==Ae)return;var n=I(e)||"ReactComponent";if(Ts!==null){if(Ts.has(n))return;Ts.add(n)}else Ts=new Set([n]);var a=Ca;try{jt(e),h("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.")}finally{a?jt(e):Pn()}}}var Dd;{var ET=null;Dd=function(e,t,n){var a=Rh(ET,t);try{return Dm(e,t,n)}catch(i){if(cb()||i!==null&&typeof i=="object"&&typeof i.then=="function")throw i;if(go(),Op(),Mm(e,t),Rh(t,a),t.mode&et&&Rf(t),Lm(null,Dm,null,e,t,n),QS()){var r=Hm();typeof r=="object"&&r!==null&&r._suppressLogging&&typeof i=="object"&&i!==null&&!i._suppressLogging&&(i._suppressLogging=!0)}throw i}}}var hh=!1,_d;_d=new Set;function TT(e){if(Xu&&!Wb())switch(e.tag){case Ue:case ze:case Ae:{var t=xt&&I(xt)||"Unknown",n=t;if(!_d.has(n)){_d.add(n);var a=I(e)||"Unknown";h("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render",a,t,t)}break}case pe:{hh||(h("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."),hh=!0);break}}}function Ll(e,t){if(er){var n=e.memoizedUpdaters;n.forEach(function(a){Hv(e,a,t)})}}var Od={};function Rs(e,t){{var n=cr.current;return n!==null?(n.push(t),Od):wv(e,t)}}function yh(e){if(e!==Od)return _g(e)}function gh(){return cr.current!==null}function RT(e){{if(e.mode&Ge){if(!Zm())return}else if(!wE()||Ne!==qt||e.tag!==Ue&&e.tag!==ze&&e.tag!==Ae)return;if(cr.current===null){var t=Ca;try{jt(e),h(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`,I(e))}finally{t?jt(e):Pn()}}}}function CT(e){e.tag!==tu&&Zm()&&cr.current===null&&h(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`)}function Hl(e){nh=e}var Qa=null,_u=null,xT=function(e){Qa=e};function Ou(e){{if(Qa===null)return e;var t=Qa(e);return t===void 0?e:t.current}}function Nd(e){return Ou(e)}function Ud(e){{if(Qa===null)return e;var t=Qa(e);if(t===void 0){if(e!=null&&typeof e.render=="function"){var n=Ou(e.render);if(e.render!==n){var a={$$typeof:bt,render:n};return e.displayName!==void 0&&(a.displayName=e.displayName),a}}return e}return t.current}}function bh(e,t){{if(Qa===null)return!1;var n=e.elementType,a=t.type,r=!1,i=typeof a=="object"&&a!==null?a.$$typeof:null;switch(e.tag){case pe:{typeof a=="function"&&(r=!0);break}case Ue:{(typeof a=="function"||i===rt)&&(r=!0);break}case ze:{(i===bt||i===rt)&&(r=!0);break}case lt:case Ae:{(i===wn||i===rt)&&(r=!0);break}default:return!1}if(r){var u=Qa(n);if(u!==void 0&&u===Qa(a))return!0}return!1}}function Sh(e){{if(Qa===null||typeof WeakSet!="function")return;_u===null&&(_u=new WeakSet),_u.add(e)}}var DT=function(e,t){{if(Qa===null)return;var n=t.staleFamilies,a=t.updatedFamilies;zr(),gs(function(){Md(e.current,a,n)})}},_T=function(e,t){{if(e.context!==Sa)return;zr(),gs(function(){Dh(t,e,null,null)})}};function Md(e,t,n){{var a=e.alternate,r=e.child,i=e.sibling,u=e.tag,o=e.type,s=null;switch(u){case Ue:case Ae:case pe:s=o;break;case ze:s=o.render;break}if(Qa===null)throw new Error("Expected resolveFamily to be set during hot reload.");var f=!1,m=!1;if(s!==null){var b=Qa(s);b!==void 0&&(n.has(b)?m=!0:t.has(b)&&(u===pe?m=!0:f=!0))}if(_u!==null&&(_u.has(e)||a!==null&&_u.has(a))&&(m=!0),m&&(e._debugNeedsRemount=!0),m||f){var C=Gn(e,he);C!==null&&Qt(C,e,he,mt)}r!==null&&!m&&Md(r,t,n),i!==null&&Md(i,t,n)}}var OT=function(e,t){{var n=new Set,a=new Set(t.map(function(r){return r.current}));return zd(e.current,a,n),n}};function zd(e,t,n){{var a=e.child,r=e.sibling,i=e.tag,u=e.type,o=null;switch(i){case Ue:case Ae:case pe:o=u;break;case ze:o=u.render;break}var s=!1;o!==null&&t.has(o)&&(s=!0),s?NT(e,n):a!==null&&zd(a,t,n),r!==null&&zd(r,t,n)}}function NT(e,t){{var n=UT(e,t);if(n)return;for(var a=e;;){switch(a.tag){case ne:t.add(a.stateNode);return;case Me:t.add(a.stateNode.containerInfo);return;case oe:t.add(a.stateNode.containerInfo);return}if(a.return===null)throw new Error("Expected to reach root first.");a=a.return}}}function UT(e,t){for(var n=e,a=!1;;){if(n.tag===ne)a=!0,t.add(n.stateNode);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)return a;for(;n.sibling===null;){if(n.return===null||n.return===e)return a;n=n.return}n.sibling.return=n.return,n=n.sibling}return!1}var Ad;{Ad=!1;try{var Eh=Object.preventExtensions({})}catch(e){Ad=!0}}function MT(e,t,n,a){this.tag=e,this.key=n,this.elementType=null,this.type=null,this.stateNode=null,this.return=null,this.child=null,this.sibling=null,this.index=0,this.ref=null,this.pendingProps=t,this.memoizedProps=null,this.updateQueue=null,this.memoizedState=null,this.dependencies=null,this.mode=a,this.flags=X,this.subtreeFlags=X,this.deletions=null,this.lanes=H,this.childLanes=H,this.alternate=null,this.actualDuration=Number.NaN,this.actualStartTime=Number.NaN,this.selfBaseDuration=Number.NaN,this.treeBaseDuration=Number.NaN,this.actualDuration=0,this.actualStartTime=-1,this.selfBaseDuration=0,this.treeBaseDuration=0,this._debugSource=null,this._debugOwner=null,this._debugNeedsRemount=!1,this._debugHookTypes=null,!Ad&&typeof Object.preventExtensions=="function"&&Object.preventExtensions(this)}var xa=function(e,t,n,a){return new MT(e,t,n,a)};function Ld(e){var t=e.prototype;return!!(t&&t.isReactComponent)}function zT(e){return typeof e=="function"&&!Ld(e)&&e.defaultProps===void 0}function AT(e){if(typeof e=="function")return Ld(e)?pe:Ue;if(e!=null){var t=e.$$typeof;if(t===bt)return ze;if(t===wn)return lt}return $t}function ki(e,t){var n=e.alternate;n===null?(n=xa(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n._debugSource=e._debugSource,n._debugOwner=e._debugOwner,n._debugHookTypes=e._debugHookTypes,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=X,n.subtreeFlags=X,n.deletions=null,n.actualDuration=0,n.actualStartTime=-1),n.flags=e.flags&Pe,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue;var a=e.dependencies;switch(n.dependencies=a===null?null:{lanes:a.lanes,firstContext:a.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.selfBaseDuration=e.selfBaseDuration,n.treeBaseDuration=e.treeBaseDuration,n._debugNeedsRemount=e._debugNeedsRemount,n.tag){case $t:case Ue:case Ae:n.type=Ou(e.type);break;case pe:n.type=Nd(e.type);break;case ze:n.type=Ud(e.type);break}return n}function LT(e,t){e.flags&=Pe|Qe;var n=e.alternate;if(n===null)e.childLanes=H,e.lanes=t,e.child=null,e.subtreeFlags=X,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null,e.selfBaseDuration=0,e.treeBaseDuration=0;else{e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=X,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type;var a=n.dependencies;e.dependencies=a===null?null:{lanes:a.lanes,firstContext:a.firstContext},e.selfBaseDuration=n.selfBaseDuration,e.treeBaseDuration=n.treeBaseDuration}return e}function HT(e,t,n){var a;return e===Dv?(a=Ge,t===!0&&(a|=Ot,a|=yr)):a=fe,er&&(a|=et),xa(oe,null,null,a)}function Hd(e,t,n,a,r,i){var u=$t,o=e;if(typeof e=="function")Ld(e)?(u=pe,o=Nd(o)):o=Ou(o);else if(typeof e=="string")u=ne;else e:switch(e){case Vn:return Si(n.children,r,i,t);case Dn:u=st,r|=Ot,(r&Ge)!==fe&&(r|=yr);break;case Ut:return jT(n,r,i,t);case Mt:return FT(n,r,i,t);case Zn:return BT(n,r,i,t);case oa:return Th(n,r,i,t);case sa:case On:case Nn:case Pa:case Oa:default:{if(typeof e=="object"&&e!==null)switch(e.$$typeof){case tn:u=St;break e;case _n:u=ue;break e;case bt:u=ze,o=Ud(o);break e;case wn:u=lt;break e;case rt:u=Tt,o=null;break e}var s="";{(e===void 0||typeof e=="object"&&e!==null&&Object.keys(e).length===0)&&(s+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var f=a?I(a):null;f&&(s+=`

Check the render method of \``+f+"`.")}throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) "+("but got: "+(e==null?e:typeof e)+"."+s))}}var m=xa(u,n,t,r);return m.elementType=e,m.type=o,m.lanes=i,m._debugOwner=a,m}function jd(e,t,n){var a=null;a=e._owner;var r=e.type,i=e.key,u=e.props,o=Hd(r,i,u,a,t,n);return o._debugSource=e._source,o._debugOwner=e._owner,o}function Si(e,t,n,a){var r=xa(xe,e,a,t);return r.lanes=n,r}function jT(e,t,n,a){typeof e.id!="string"&&h('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.',typeof e.id);var r=xa(Et,e,a,t|et);return r.elementType=Ut,r.lanes=n,r.stateNode={effectDuration:0,passiveEffectDuration:0},r}function FT(e,t,n,a){var r=xa(je,e,a,t);return r.elementType=Mt,r.lanes=n,r}function BT(e,t,n,a){var r=xa(gt,e,a,t);return r.elementType=Zn,r.lanes=n,r}function Th(e,t,n,a){var r=xa(at,e,a,t);r.elementType=oa,r.lanes=n;var i={isHidden:!1};return r.stateNode=i,r}function Fd(e,t,n){var a=xa(be,e,null,t);return a.lanes=n,a}function VT(){var e=xa(ne,null,null,fe);return e.elementType="DELETED",e}function wT(e){var t=xa(Fn,null,null,fe);return t.stateNode=e,t}function Bd(e,t,n){var a=e.children!==null?e.children:[],r=xa(Me,a,e.key,t);return r.lanes=n,r.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},r}function Rh(e,t){return e===null&&(e=xa($t,null,null,fe)),e.tag=t.tag,e.key=t.key,e.elementType=t.elementType,e.type=t.type,e.stateNode=t.stateNode,e.return=t.return,e.child=t.child,e.sibling=t.sibling,e.index=t.index,e.ref=t.ref,e.pendingProps=t.pendingProps,e.memoizedProps=t.memoizedProps,e.updateQueue=t.updateQueue,e.memoizedState=t.memoizedState,e.dependencies=t.dependencies,e.mode=t.mode,e.flags=t.flags,e.subtreeFlags=t.subtreeFlags,e.deletions=t.deletions,e.lanes=t.lanes,e.childLanes=t.childLanes,e.alternate=t.alternate,e.actualDuration=t.actualDuration,e.actualStartTime=t.actualStartTime,e.selfBaseDuration=t.selfBaseDuration,e.treeBaseDuration=t.treeBaseDuration,e._debugSource=t._debugSource,e._debugOwner=t._debugOwner,e._debugNeedsRemount=t._debugNeedsRemount,e._debugHookTypes=t._debugHookTypes,e}function YT(e,t,n,a,r){this.tag=t,this.containerInfo=e,this.pendingChildren=null,this.current=null,this.pingCache=null,this.finishedWork=null,this.timeoutHandle=Ja,this.context=null,this.pendingContext=null,this.callbackNode=null,this.callbackPriority=an,this.eventTimes=Ec(H),this.expirationTimes=Ec(mt),this.pendingLanes=H,this.suspendedLanes=H,this.pingedLanes=H,this.expiredLanes=H,this.mutableReadLanes=H,this.finishedLanes=H,this.entangledLanes=H,this.entanglements=Ec(H),this.identifierPrefix=a,this.onRecoverableError=r,Dt&&(this.mutableSourceEagerHydrationData=null),this.effectDuration=0,this.passiveEffectDuration=0;{this.memoizedUpdaters=new Set;for(var i=this.pendingUpdatersLaneMap=[],u=0;u<Is;u++)i.push(new Set)}switch(t){case Dv:this._debugRootType=n?"hydrateRoot()":"createRoot()";break;case tu:this._debugRootType=n?"hydrate()":"render()";break}}function Ch(e,t,n,a,r,i,u,o,s,f){var m=new YT(e,t,n,o,s),b=HT(t,i);m.current=b,b.stateNode=m;{var C={element:a,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null};b.memoizedState=C}return Kc(b),m}var qT="18.3.1";function QT(e,t,n){var a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:null;return Db(a),{$$typeof:cn,key:a==null?null:""+a,children:e,containerInfo:t,implementation:n}}var Vd,wd;Vd=!1,wd={};function xh(e){if(!e)return Sa;var t=ge(e),n=ug(t);if(t.tag===pe){var a=t.type;if(hr(a))return Cv(t,a,n)}return n}function PT(e){var t=ge(e);if(t===void 0){if(typeof e.render=="function")throw new Error("Unable to find node on an unmounted component.");var n=Object.keys(e).join(",");throw new Error("Argument appears to not be a ReactComponent. Keys: "+n)}var a=Wa(t);return a===null?null:a.stateNode}function GT(e,t){{var n=ge(e);if(n===void 0){if(typeof e.render=="function")throw new Error("Unable to find node on an unmounted component.");var a=Object.keys(e).join(",");throw new Error("Argument appears to not be a ReactComponent. Keys: "+a)}var r=Wa(n);if(r===null)return null;if(r.mode&Ot){var i=I(n)||"Component";if(!wd[i]){wd[i]=!0;var u=Ca;try{jt(r),n.mode&Ot?h("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node",t,t,i):h("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node",t,t,i)}finally{u?jt(u):Pn()}}}return r.stateNode}}function KT(e,t,n,a,r,i,u,o){var s=!1,f=null;return Ch(e,t,s,f,n,a,r,i,u)}function kT(e,t,n,a,r,i,u,o,s,f){var m=!0,b=Ch(n,a,m,e,r,i,u,o,s);b.context=xh(null);var C=b.current,U=Ln(),L=gi(C),M=kr(U,L);return M.callback=t!=null?t:null,fi(C,M,L),KE(b,L,U),b}function Dh(e,t,n,a){Ag(t,e);var r=t.current,i=Ln(),u=gi(r);$g(u);var o=xh(n);t.context===null?t.context=o:t.pendingContext=o,Xu&&Ca!==null&&!Vd&&(Vd=!0,h(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`,I(Ca)||"Unknown"));var s=kr(i,u);s.payload={element:e},a=a===void 0?null:a,a!==null&&(typeof a!="function"&&h("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.",a),s.callback=a);var f=fi(r,s,u);return f!==null&&(Qt(f,r,u,i),Ro(f,r,u)),u}function WT(e){var t=e.current;if(!t.child)return null;switch(t.child.tag){case ne:return Br(t.child.stateNode);default:return t.child.stateNode}}function XT(e){switch(e.tag){case oe:{var t=e.stateNode;if(Jv(t)){var n=pg(t);JE(t,n)}break}case je:{gs(function(){var r=Gn(e,he);if(r!==null){var i=Ln();Qt(r,e,he,i)}});var a=he;Cs(e,a);break}}}function _h(e,t){var n=e.memoizedState;n!==null&&n.dehydrated!==null&&(n.retryLane=Sg(n.retryLane,t))}function Cs(e,t){_h(e,t);var n=e.alternate;n&&_h(n,t)}function JT(e){if(e.tag===je){var t=he,n=Gn(e,t);if(n!==null){var a=Ln();Qt(n,e,t,a)}Cs(e,t)}}function ZT(e){if(e.tag===je){var t=wu,n=Gn(e,t);if(n!==null){var a=Ln();Qt(n,e,t,a)}Cs(e,t)}}function IT(e){if(e.tag===je){var t=gi(e),n=Gn(e,t);if(n!==null){var a=Ln();Qt(n,e,t,a)}Cs(e,t)}}function $T(e){var t=Ci(e);return t===null?null:t.stateNode}var Oh=function(e){return null};function Nh(e){return Oh(e)}var Uh=function(e){return!1};function Mh(e){return Uh(e)}var zh=null,Ah=null,Lh=null,Hh=null,jh=null,Fh=null,Bh=null,Vh=null,wh=null;{var Yh=function(e,t,n){var a=t[n],r=Kt(e)?e.slice():K({},e);return n+1===t.length?(Kt(r)?r.splice(a,1):delete r[a],r):(r[a]=Yh(e[a],t,n+1),r)},qh=function(e,t){return Yh(e,t,0)},Qh=function(e,t,n,a){var r=t[a],i=Kt(e)?e.slice():K({},e);if(a+1===t.length){var u=n[a];i[u]=i[r],Kt(i)?i.splice(r,1):delete i[r]}else i[r]=Qh(e[r],t,n,a+1);return i},Ph=function(e,t,n){if(t.length!==n.length){j("copyWithRename() expects paths of the same length");return}else for(var a=0;a<n.length-1;a++)if(t[a]!==n[a]){j("copyWithRename() expects paths to be the same except for the deepest key");return}return Qh(e,t,n,0)},Gh=function(e,t,n,a){if(n>=t.length)return a;var r=t[n],i=Kt(e)?e.slice():K({},e);return i[r]=Gh(e[r],t,n+1,a),i},Kh=function(e,t,n){return Gh(e,t,0,n)},Yd=function(e,t){for(var n=e.memoizedState;n!==null&&t>0;)n=n.next,t--;return n};zh=function(e,t,n,a){var r=Yd(e,t);if(r!==null){var i=Kh(r.memoizedState,n,a);r.memoizedState=i,r.baseState=i,e.memoizedProps=K({},e.memoizedProps);var u=Gn(e,he);u!==null&&Qt(u,e,he,mt)}},Ah=function(e,t,n){var a=Yd(e,t);if(a!==null){var r=qh(a.memoizedState,n);a.memoizedState=r,a.baseState=r,e.memoizedProps=K({},e.memoizedProps);var i=Gn(e,he);i!==null&&Qt(i,e,he,mt)}},Lh=function(e,t,n,a){var r=Yd(e,t);if(r!==null){var i=Ph(r.memoizedState,n,a);r.memoizedState=i,r.baseState=i,e.memoizedProps=K({},e.memoizedProps);var u=Gn(e,he);u!==null&&Qt(u,e,he,mt)}},Hh=function(e,t,n){e.pendingProps=Kh(e.memoizedProps,t,n),e.alternate&&(e.alternate.pendingProps=e.pendingProps);var a=Gn(e,he);a!==null&&Qt(a,e,he,mt)},jh=function(e,t){e.pendingProps=qh(e.memoizedProps,t),e.alternate&&(e.alternate.pendingProps=e.pendingProps);var n=Gn(e,he);n!==null&&Qt(n,e,he,mt)},Fh=function(e,t,n){e.pendingProps=Ph(e.memoizedProps,t,n),e.alternate&&(e.alternate.pendingProps=e.pendingProps);var a=Gn(e,he);a!==null&&Qt(a,e,he,mt)},Bh=function(e){var t=Gn(e,he);t!==null&&Qt(t,e,he,mt)},Vh=function(e){Oh=e},wh=function(e){Uh=e}}function eR(e){var t=Wa(e);return t===null?null:t.stateNode}function tR(e){return null}function nR(){return Ca}function aR(e){var t=e.findFiberByHostInstance,n=z.ReactCurrentDispatcher;return zg({bundleType:e.bundleType,version:e.version,rendererPackageName:e.rendererPackageName,rendererConfig:e.rendererConfig,overrideHookState:zh,overrideHookStateDeletePath:Ah,overrideHookStateRenamePath:Lh,overrideProps:Hh,overridePropsDeletePath:jh,overridePropsRenamePath:Fh,setErrorHandler:Vh,setSuspenseHandler:wh,scheduleUpdate:Bh,currentDispatcherRef:n,findHostInstanceByFiber:eR,findFiberByHostInstance:t||tR,findHostInstancesForRefresh:OT,scheduleRefresh:DT,scheduleRoot:_T,setRefreshHandler:xT,getCurrentFiber:nR,reconcilerVersion:qT})}return y.attemptContinuousHydration=ZT,y.attemptDiscreteHydration=JT,y.attemptHydrationAtCurrentPriority=IT,y.attemptSynchronousHydration=XT,y.batchedUpdates=IE,y.createComponentSelector=OE,y.createContainer=KT,y.createHasPseudoClassSelector=NE,y.createHydrationContainer=kT,y.createPortal=QT,y.createRoleSelector=UE,y.createTestNameSelector=zE,y.createTextSelector=ME,y.deferredUpdates=ZE,y.discreteUpdates=$E,y.findAllNodes=os,y.findBoundingRects=HE,y.findHostInstance=PT,y.findHostInstanceWithNoPortals=$T,y.findHostInstanceWithWarning=GT,y.flushControlled=tT,y.flushPassiveEffects=zr,y.flushSync=gs,y.focusWithin=jE,y.getCurrentUpdatePriority=$a,y.getFindAllNodesFailureDescription=LE,y.getPublicRootInstance=WT,y.injectIntoDevTools=aR,y.isAlreadyRendering=eT,y.observeVisibleRects=BE,y.registerMutableSourceForHydration=qb,y.runWithPriority=Cg,y.shouldError=Nh,y.shouldSuspend=Mh,y.updateContainer=Dh,y}});var vy=Ei((_C,dy)=>{"use strict";dy.exports=fy()});var by=Ei(As=>{"use strict";(function(){"use strict";var p=Hr(),c=Symbol.for("react.element"),y=Symbol.for("react.portal"),R=Symbol.for("react.fragment"),g=Symbol.for("react.strict_mode"),z=Symbol.for("react.profiler"),_=Symbol.for("react.provider"),V=Symbol.for("react.context"),j=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),q=Symbol.for("react.suspense_list"),K=Symbol.for("react.memo"),ge=Symbol.for("react.lazy"),nt=Symbol.for("react.offscreen"),Ke=Symbol.iterator,qe="@@iterator";function ke(d){if(d===null||typeof d!="object")return null;var A=Ke&&d[Ke]||d[qe];return typeof A=="function"?A:null}var Ce=p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;function De(d){{for(var A=arguments.length,Y=new Array(A>1?A-1:0),ie=1;ie<A;ie++)Y[ie-1]=arguments[ie];ot("error",d,Y)}}function ot(d,A,Y){{var ie=Ce.ReactDebugCurrentFrame,Te=ie.getStackAddendum();Te!==""&&(A+="%s",Y=Y.concat([Te]));var Be=Y.map(function(_e){return String(_e)});Be.unshift("Warning: "+A),Function.prototype.apply.call(console[d],console,Be)}}var yt=!1,xn=!1,Ue=!1,pe=!1,$t=!1,oe;oe=Symbol.for("react.module.reference");function Me(d){return!!(typeof d=="string"||typeof d=="function"||d===R||d===z||$t||d===g||d===h||d===q||pe||d===nt||yt||xn||Ue||typeof d=="object"&&d!==null&&(d.$$typeof===ge||d.$$typeof===K||d.$$typeof===_||d.$$typeof===V||d.$$typeof===j||d.$$typeof===oe||d.getModuleId!==void 0))}function ne(d,A,Y){var ie=d.displayName;if(ie)return ie;var Te=A.displayName||A.name||"";return Te!==""?Y+"("+Te+")":Y}function be(d){return d.displayName||"Context"}function xe(d){if(d==null)return null;if(typeof d.tag=="number"&&De("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof d=="function")return d.displayName||d.name||null;if(typeof d=="string")return d;switch(d){case R:return"Fragment";case y:return"Portal";case z:return"Profiler";case g:return"StrictMode";case h:return"Suspense";case q:return"SuspenseList"}if(typeof d=="object")switch(d.$$typeof){case V:var A=d;return be(A)+".Consumer";case _:var Y=d;return be(Y._context)+".Provider";case j:return ne(d,d.render,"ForwardRef");case K:var ie=d.displayName||null;return ie!==null?ie:xe(d.type)||"Memo";case ge:{var Te=d,Be=Te._payload,_e=Te._init;try{return xe(_e(Be))}catch(Ee){return null}}}return null}var st=Object.assign,ue=0,St,ze,Et,je,lt,Ae,Tt;function Ft(){}Ft.__reactDisabledLog=!0;function Fn(){{if(ue===0){St=console.log,ze=console.info,Et=console.warn,je=console.error,lt=console.group,Ae=console.groupCollapsed,Tt=console.groupEnd;var d={configurable:!0,enumerable:!0,value:Ft,writable:!0};Object.defineProperties(console,{info:d,log:d,warn:d,error:d,group:d,groupCollapsed:d,groupEnd:d})}ue++}}function gt(){{if(ue--,ue===0){var d={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:st({},d,{value:St}),info:st({},d,{value:ze}),warn:st({},d,{value:Et}),error:st({},d,{value:je}),group:st({},d,{value:lt}),groupCollapsed:st({},d,{value:Ae}),groupEnd:st({},d,{value:Tt})})}ue<0&&De("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var en=Ce.ReactCurrentDispatcher,at;function Bt(d,A,Y){{if(at===void 0)try{throw Error()}catch(Te){var ie=Te.stack.trim().match(/\n( *(at )?)/);at=ie&&ie[1]||""}return`
`+at+d}}var Jn=!1,Bn;{var sn=typeof WeakMap=="function"?WeakMap:Map;Bn=new sn}function cn(d,A){if(!d||Jn)return"";{var Y=Bn.get(d);if(Y!==void 0)return Y}var ie;Jn=!0;var Te=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var Be;Be=en.current,en.current=null,Fn();try{if(A){var _e=function(){throw Error()};if(Object.defineProperty(_e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(_e,[])}catch(Lt){ie=Lt}Reflect.construct(d,[],_e)}else{try{_e.call()}catch(Lt){ie=Lt}d.call(_e.prototype)}}else{try{throw Error()}catch(Lt){ie=Lt}d()}}catch(Lt){if(Lt&&ie&&typeof Lt.stack=="string"){for(var Ee=Lt.stack.split(`
`),vt=ie.stack.split(`
`),Xe=Ee.length-1,Pe=vt.length-1;Xe>=1&&Pe>=0&&Ee[Xe]!==vt[Pe];)Pe--;for(;Xe>=1&&Pe>=0;Xe--,Pe--)if(Ee[Xe]!==vt[Pe]){if(Xe!==1||Pe!==1)do if(Xe--,Pe--,Pe<0||Ee[Xe]!==vt[Pe]){var Gt=`
`+Ee[Xe].replace(" at new "," at ");return d.displayName&&Gt.includes("<anonymous>")&&(Gt=Gt.replace("<anonymous>",d.displayName)),typeof d=="function"&&Bn.set(d,Gt),Gt}while(Xe>=1&&Pe>=0);break}}}finally{Jn=!1,en.current=Be,gt(),Error.prepareStackTrace=Te}var Un=d?d.displayName||d.name:"",ta=Un?Bt(Un):"";return typeof d=="function"&&Bn.set(d,ta),ta}function Vn(d,A,Y){return cn(d,!1)}function Dn(d){var A=d.prototype;return!!(A&&A.isReactComponent)}function Ut(d,A,Y){if(d==null)return"";if(typeof d=="function")return cn(d,Dn(d));if(typeof d=="string")return Bt(d);switch(d){case h:return Bt("Suspense");case q:return Bt("SuspenseList")}if(typeof d=="object")switch(d.$$typeof){case j:return Vn(d.render);case K:return Ut(d.type,A,Y);case ge:{var ie=d,Te=ie._payload,Be=ie._init;try{return Ut(Be(Te),A,Y)}catch(_e){}}}return""}var tn=Object.prototype.hasOwnProperty,_n={},bt=Ce.ReactDebugCurrentFrame;function Mt(d){if(d){var A=d._owner,Y=Ut(d.type,d._source,A?A.type:null);bt.setExtraStackFrame(Y)}else bt.setExtraStackFrame(null)}function Zn(d,A,Y,ie,Te){{var Be=Function.call.bind(tn);for(var _e in d)if(Be(d,_e)){var Ee=void 0;try{if(typeof d[_e]!="function"){var vt=Error((ie||"React class")+": "+Y+" type `"+_e+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof d[_e]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw vt.name="Invariant Violation",vt}Ee=d[_e](A,_e,ie,Y,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(Xe){Ee=Xe}Ee&&!(Ee instanceof Error)&&(Mt(Te),De("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",ie||"React class",Y,_e,typeof Ee),Mt(null)),Ee instanceof Error&&!(Ee.message in _n)&&(_n[Ee.message]=!0,Mt(Te),De("Failed %s type: %s",Y,Ee.message),Mt(null))}}}var wn=Array.isArray;function rt(d){return wn(d)}function On(d){{var A=typeof Symbol=="function"&&Symbol.toStringTag,Y=A&&d[Symbol.toStringTag]||d.constructor.name||"Object";return Y}}function Oa(d){try{return oa(d),!1}catch(A){return!0}}function oa(d){return""+d}function sa(d){if(Oa(d))return De("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",On(d)),oa(d)}var Nn=Ce.ReactCurrentOwner,Pa={key:!0,ref:!0,__self:!0,__source:!0},In,Ga,Q;Q={};function ae(d){if(tn.call(d,"ref")){var A=Object.getOwnPropertyDescriptor(d,"ref").get;if(A&&A.isReactWarning)return!1}return d.ref!==void 0}function me(d){if(tn.call(d,"key")){var A=Object.getOwnPropertyDescriptor(d,"key").get;if(A&&A.isReactWarning)return!1}return d.key!==void 0}function te(d,A){if(typeof d.ref=="string"&&Nn.current&&A&&Nn.current.stateNode!==A){var Y=xe(Nn.current.type);Q[Y]||(De('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',xe(Nn.current.type),d.ref),Q[Y]=!0)}}function it(d,A){{var Y=function(){In||(In=!0,De("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",A))};Y.isReactWarning=!0,Object.defineProperty(d,"key",{get:Y,configurable:!0})}}function zt(d,A){{var Y=function(){Ga||(Ga=!0,De("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",A))};Y.isReactWarning=!0,Object.defineProperty(d,"ref",{get:Y,configurable:!0})}}var I=function(d,A,Y,ie,Te,Be,_e){var Ee={$$typeof:c,type:d,key:A,ref:Y,props:_e,_owner:Be};return Ee._store={},Object.defineProperty(Ee._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(Ee,"_self",{configurable:!1,enumerable:!1,writable:!1,value:ie}),Object.defineProperty(Ee,"_source",{configurable:!1,enumerable:!1,writable:!1,value:Te}),Object.freeze&&(Object.freeze(Ee.props),Object.freeze(Ee)),Ee};function X(d,A,Y,ie,Te){{var Be,_e={},Ee=null,vt=null;Y!==void 0&&(sa(Y),Ee=""+Y),me(A)&&(sa(A.key),Ee=""+A.key),ae(A)&&(vt=A.ref,te(A,Te));for(Be in A)tn.call(A,Be)&&!Pa.hasOwnProperty(Be)&&(_e[Be]=A[Be]);if(d&&d.defaultProps){var Xe=d.defaultProps;for(Be in Xe)_e[Be]===void 0&&(_e[Be]=Xe[Be])}if(Ee||vt){var Pe=typeof d=="function"?d.displayName||d.name||"Unknown":d;Ee&&it(_e,Pe),vt&&zt(_e,Pe)}return I(d,Ee,vt,Te,ie,Nn.current,_e)}}var Ie=Ce.ReactCurrentOwner,Qe=Ce.ReactDebugCurrentFrame;function se(d){if(d){var A=d._owner,Y=Ut(d.type,d._source,A?A.type:null);Qe.setExtraStackFrame(Y)}else Qe.setExtraStackFrame(null)}var Vt;Vt=!1;function $n(d){return typeof d=="object"&&d!==null&&d.$$typeof===c}function Ka(){{if(Ie.current){var d=xe(Ie.current.type);if(d)return`

Check the render method of \``+d+"`."}return""}}function Le(d){{if(d!==void 0){var A=d.fileName.replace(/^.*[\\\/]/,""),Y=d.lineNumber;return`

Check your code at `+A+":"+Y+"."}return""}}var fn={};function Yn(d){{var A=Ka();if(!A){var Y=typeof d=="string"?d:d.displayName||d.name;Y&&(A=`

Check the top-level render call using <`+Y+">.")}return A}}function Pt(d,A){{if(!d._store||d._store.validated||d.key!=null)return;d._store.validated=!0;var Y=Yn(A);if(fn[Y])return;fn[Y]=!0;var ie="";d&&d._owner&&d._owner!==Ie.current&&(ie=" It was passed a child from "+xe(d._owner.type)+"."),se(d),De('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',Y,ie),se(null)}}function At(d,A){{if(typeof d!="object")return;if(rt(d))for(var Y=0;Y<d.length;Y++){var ie=d[Y];$n(ie)&&Pt(ie,A)}else if($n(d))d._store&&(d._store.validated=!0);else if(d){var Te=ke(d);if(typeof Te=="function"&&Te!==d.entries)for(var Be=Te.call(d),_e;!(_e=Be.next()).done;)$n(_e.value)&&Pt(_e.value,A)}}}function dn(d){{var A=d.type;if(A==null||typeof A=="string")return;var Y;if(typeof A=="function")Y=A.propTypes;else if(typeof A=="object"&&(A.$$typeof===j||A.$$typeof===K))Y=A.propTypes;else return;if(Y){var ie=xe(A);Zn(Y,d.props,"prop",ie,d)}else if(A.PropTypes!==void 0&&!Vt){Vt=!0;var Te=xe(A);De("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",Te||"Unknown")}typeof A.getDefaultProps=="function"&&!A.getDefaultProps.isReactClassApproved&&De("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.")}}function ea(d){{for(var A=Object.keys(d.props),Y=0;Y<A.length;Y++){var ie=A[Y];if(ie!=="children"&&ie!=="key"){se(d),De("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",ie),se(null);break}}d.ref!==null&&(se(d),De("Invalid attribute `ref` supplied to `React.Fragment`."),se(null))}}var Na={};function Fr(d,A,Y,ie,Te,Be){{var _e=Me(d);if(!_e){var Ee="";(d===void 0||typeof d=="object"&&d!==null&&Object.keys(d).length===0)&&(Ee+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var vt=Le(Te);vt?Ee+=vt:Ee+=Ka();var Xe;d===null?Xe="null":rt(d)?Xe="array":d!==void 0&&d.$$typeof===c?(Xe="<"+(xe(d.type)||"Unknown")+" />",Ee=" Did you accidentally export a JSX literal instead of a component?"):Xe=typeof d,De("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",Xe,Ee)}var Pe=X(d,A,Y,Te,Be);if(Pe==null)return Pe;if(_e){var Gt=A.children;if(Gt!==void 0)if(ie)if(rt(Gt)){for(var Un=0;Un<Gt.length;Un++)At(Gt[Un],d);Object.freeze&&Object.freeze(Gt)}else De("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");else At(Gt,d)}if(tn.call(A,"key")){var ta=xe(d),Lt=Object.keys(A).filter(function(Wa){return Wa!=="key"}),ka=Lt.length>0?"{key: someKey, "+Lt.join(": ..., ")+": ...}":"{key: someKey}";if(!Na[ta+ka]){var fa=Lt.length>0?"{"+Lt.join(": ..., ")+": ...}":"{}";De(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,ka,ta,fa,ta),Na[ta+ka]=!0}}return d===R?ea(Pe):dn(Pe),Pe}}function Ir(d,A,Y){return Fr(d,A,Y,!0)}function ca(d,A,Y){return Fr(d,A,Y,!1)}var Rt=ca,dr=Ir;As.Fragment=R,As.jsx=Rt,As.jsxs=dr})()});var Lu=Ei((zC,Sy)=>{"use strict";Sy.exports=by()});function Mu(p){if(p==null||typeof p!="object")return!1;let c=Object.getPrototypeOf(p);return c==null||c===Object.prototype}function fr(p){return p!=null&&p.kind===3}var Fl="__current",Pd={},mR=[];function Wd(p,{strict:c=!0,components:y}={}){let R=0,g={strict:c,mounted:!1,channel:p,children:mR,nodes:new WeakSet,parents:new WeakMap,tops:new WeakMap,components:new WeakMap,fragments:new WeakMap};c&&Object.freeze(y);let z={kind:0,options:c?Object.freeze({strict:c,components:y}):{strict:c,components:y},get children(){return g.children},createComponent(_,...V){if(y&&y.indexOf(_)<0)throw new Error(`Unsupported component: ${_}`);let[j,h,...q]=V,K=j!=null?j:{},ge=[],nt={};if(j)for(let Ce of Object.keys(j))Ce!=="children"&&(nt[Ce]=Ri(ny(j[Ce])));if(h)if(Array.isArray(h))for(let Ce of h)ge.push(on(Ce,z));else{ge.push(on(h,z));for(let Ce of q)ge.push(on(Ce,z))}let Ke=`${R++}`,qe={externalProps:c?Object.freeze(K):K,internalProps:nt,children:c?Object.freeze(ge):ge},ke=Lr({kind:1,get children(){return qe.children},get props(){return qe.externalProps},get remoteProps(){return qe.internalProps},remove:()=>Zh(ke),updateProps:Ce=>gR(ke,Ce,qe,g),append:(...Ce)=>_s(ke,Ce.map(De=>on(De,z)),qe,g),appendChild:Ce=>Os(ke,on(Ce,z),qe,g),removeChild:Ce=>Ns(ke,Ce,qe,g),replaceChildren:(...Ce)=>Gd(ke,Ce.map(De=>on(De,z)),qe,g),insertBefore:(Ce,De)=>zu(ke,on(Ce,z),De,qe,g),insertChildBefore:(Ce,De)=>zu(ke,on(Ce,z),De,qe,g)},Pd);g.components.set(ke,qe),Object.defineProperty(ke,"type",{value:_,configurable:!1,writable:!1,enumerable:!0}),Kd(ke,g),kd(ke,Ke,z);for(let Ce of qe.children)Vl(ke,Ce,g);return ke},createText(_=""){let V=`${R++}`,j={text:_},h=K=>yR(q,K,j,g),q=Lr({kind:2,get text(){return j.text},update:h,updateText:h,remove:()=>Zh(q)},Pd);return Kd(q,g),kd(q,V,z),q},createFragment(){let _=`${R++}`,V={children:c?Object.freeze([]):[]},j=Lr({kind:3,get children(){return V.children},append:(...h)=>_s(j,h.map(q=>on(q,z)),V,g),appendChild:h=>Os(j,on(h,z),V,g),removeChild:h=>Ns(j,h,V,g),replaceChildren:(...h)=>Gd(j,h.map(q=>on(q,z)),V,g),insertBefore:(h,q)=>zu(j,on(h,z),q,V,g),insertChildBefore:(h,q)=>zu(j,on(h,z),q,V,g)},Pd);return g.fragments.set(j,V),Kd(j,g),kd(j,_,z),j},append:(..._)=>_s(z,_.map(V=>on(V,z)),g,g),appendChild:_=>Os(z,on(_,z),g,g),replaceChildren:(..._)=>Gd(z,_.map(V=>on(V,z)),g,g),removeChild:_=>Ns(z,_,g,g),insertBefore:(_,V)=>zu(z,on(_,z),V,g,g),insertChildBefore:(_,V)=>zu(z,on(_,z),V,g,g),mount(){return g.mounted?Promise.resolve():(g.mounted=!0,Promise.resolve(p(0,g.children.map(wl))))}};return z}function hR(p,{tops:c}){var y;return((y=c.get(p))===null||y===void 0?void 0:y.kind)===0}function ty(p,c){let y=R=>{if("children"in R)for(let g of R.children)c(g),y(g)};y(p)}function Bl(p,c,{remote:y,local:R}){let{mounted:g,channel:z}=c;g&&(p.kind===0||hR(p,c))&&y(z),R()}function yR(p,c,y,R){return Bl(p,R,{remote:g=>g(3,p.id,c),local:()=>{y.text=c}})}var Ti=Symbol("ignore");function gR(p,c,y,R){let{strict:g}=R,{internalProps:z,externalProps:_}=y,V={},j=[],h=!1;for(let q of Object.keys(c)){if(q==="children")continue;let K=_[q],ge=c[q],nt=z[q],Ke=ny(ge);if(nt===Ke&&(Ke==null||typeof Ke!="object"))continue;let[qe,ke]=Xd(nt,Ke);ke&&j.push(...ke),qe!==Ti&&(h=!0,V[q]=qe,fr(K)&&Jd(K,R),fr(ge)&&Vl(p,ge,R))}return Bl(p,R,{remote:q=>{h&&q(4,p.id,V)},local:()=>{let q=Lr(Lr({},_),c);y.externalProps=g?Object.freeze(q):q,y.internalProps=Lr(Lr({},y.internalProps),V);for(let[K,ge]of j)K[Fl]=ge}})}function Xd(p,c,y=new Set){return y.has(p)?[Ti]:(y.add(p),typeof p=="function"&&Fl in p?[typeof c=="function"?Ti:Ri(c),[[p,c]]]:Array.isArray(p)?ER(p,c,y):Mu(p)&&!fr(p)?SR(p,c,y):[p===c?Ti:c])}function Ri(p,c=new Map){let y=c.get(p);if(y)return y;if(fr(p))return c.set(p,p),p;if(Array.isArray(p)){let R=[];c.set(p,R);for(let g of p)R.push(Ri(g,c));return R}if(Mu(p)){let R={};c.set(p,R);for(let g of Object.keys(p))R[g]=Ri(p[g],c);return R}if(typeof p=="function"){let R=(...g)=>R[Fl](...g);return Object.defineProperty(R,Fl,{enumerable:!1,configurable:!1,writable:!0,value:p}),c.set(p,R),R}return c.set(p,p),p}function Au(p,c=new Set){if(!c.has(p)){if(c.add(p),Array.isArray(p))return p.reduce((y,R)=>{let g=Au(R,c);return g?[...y,...g]:y},[]);if(Mu(p))return Object.keys(p).reduce((y,R)=>{let g=Au(p[R],c);return g?[...y,...g]:y},[]);if(typeof p=="function")return Fl in p?[p]:void 0}}function Zh(p){var c;(c=p.parent)===null||c===void 0||c.removeChild(p)}function _s(p,c,y,R){for(let g of c)Os(p,g,y,R)}function Os(p,c,y,R){var g;let{nodes:z,strict:_}=R;if(!z.has(c))throw new Error("Cannot append a node that was not created by this remote root");let V=c.parent,j=(g=V==null?void 0:V.children.indexOf(c))!==null&&g!==void 0?g:-1;return Bl(p,R,{remote:h=>{h(1,p.id,j<0?p.children.length:p.children.length-1,wl(c),V?V.id:!1)},local:()=>{Vl(p,c,R);let h;if(V){let q=ay(V,R),K=[...q.children];K.splice(j,1),V===p?h=K:(q.children=_?Object.freeze(K):K,h=[...y.children])}else h=[...y.children];h.push(c),y.children=_?Object.freeze(h):h}})}function Gd(p,c,y,R){for(let g of p.children)Ns(p,g,y,R);_s(p,c,y,R)}function Ns(p,c,y,R){let{strict:g}=R;return Bl(p,R,{remote:z=>z(2,p.id,p.children.indexOf(c)),local:()=>{Jd(c,R);let z=[...y.children];z.splice(z.indexOf(c),1),y.children=g?Object.freeze(z):z}})}function zu(p,c,y,R,g){var z;let{strict:_,nodes:V}=g;if(!V.has(c))throw new Error("Cannot insert a node that was not created by this remote root");let j=c.parent,h=(z=j==null?void 0:j.children.indexOf(c))!==null&&z!==void 0?z:-1;return Bl(p,g,{remote:q=>{let K=y==null?p.children.length-1:p.children.indexOf(y);q(1,p.id,K<h||h<0?K:K-1,wl(c),j?j.id:!1)},local:()=>{Vl(p,c,g);let q;if(j){let K=ay(j,g),ge=[...K.children];ge.splice(h,1),j===p?q=ge:(K.children=_?Object.freeze(ge):ge,q=[...R.children])}else q=[...R.children];y==null?q.push(c):q.splice(q.indexOf(y),0,c),R.children=_?Object.freeze(q):q}})}function on(p,c){return typeof p=="string"?c.createText(p):p}function Vl(p,c,y){let{tops:R,parents:g}=y,z=p.kind===0?p:R.get(p);R.set(c,z),g.set(c,p),Ih(c,y),ty(c,_=>{R.set(_,z),Ih(_,y)})}function Ih(p,c){if(p.kind!==1)return;let y=p.props;y&&Object.values(y).forEach(R=>{fr(R)&&Vl(p,R,c)})}function Jd(p,c){let{tops:y,parents:R}=c;y.delete(p),R.delete(p),ty(p,g=>{y.delete(g),$h(g,c)}),$h(p,c)}function $h(p,c){if(p.kind!==1)return;let y=p.remoteProps;for(let R of Object.keys(y!=null?y:{})){let g=y[R];fr(g)&&Jd(g,c)}}function Kd(p,{parents:c,tops:y,nodes:R}){R.add(p),Object.defineProperty(p,"parent",{get(){return c.get(p)},configurable:!0,enumerable:!0}),Object.defineProperty(p,"top",{get(){return y.get(p)},configurable:!0,enumerable:!0})}function wl(p){return p.kind===2?{id:p.id,kind:p.kind,text:p.text}:{id:p.id,kind:p.kind,type:p.type,props:p.remoteProps,children:p.children.map(c=>wl(c))}}function ny(p){return fr(p)?bR(p):p}function bR(p){return{id:p.id,kind:p.kind,get children(){return p.children.map(c=>wl(c))}}}function ay(p,c){return p.kind===0?c:p.kind===3?c.fragments.get(p):c.components.get(p)}function kd(p,c,y){Object.defineProperty(p,"id",{value:c,configurable:!0,writable:!1,enumerable:!1}),Object.defineProperty(p,"root",{value:y,configurable:!0,writable:!1,enumerable:!1})}function SR(p,c,y){if(!Mu(c)){var R;return[Ri(c),(R=Au(p))===null||R===void 0?void 0:R.map(V=>[V,void 0])]}let g=!1,z=[],_={};for(let V in p){let j=p[V];if(!(V in c)){g=!0;let ge=Au(j);ge&&z.push(...ge.map(nt=>[nt,void 0]))}let h=c[V],[q,K]=Xd(j,h,y);K&&z.push(...K),q!==Ti&&(g=!0,_[V]=q)}for(let V in c)V in _||(g=!0,_[V]=Ri(c[V]));return[g?_:Ti,z]}function ER(p,c,y){if(!Array.isArray(c)){var R;return[Ri(c),(R=Au(p))===null||R===void 0?void 0:R.map(q=>[q,void 0])]}let g=!1,z=[],_=c.length,V=p.length,j=Math.max(V,_),h=[];for(let q=0;q<j;q++){let K=p[q],ge=c[q];if(q<_){if(q>=V){g=!0,h[q]=Ri(ge);continue}let[nt,Ke]=Xd(K,ge,y);if(Ke&&z.push(...Ke),nt===Ti){h[q]=K;continue}g=!0,h[q]=nt}else{g=!0;let nt=Au(K);nt&&z.push(...nt.map(Ke=>[Ke,void 0]))}}return[g?h:Ti,z]}function ry(){return(c,y)=>{var R;function g(...z){return Uu(this,null,function*(){if(z.length===1)return y(...z);let[{channel:_,components:V},j]=z,h=Wd(_,{components:V,strict:!0}),q=y(h,j);return typeof q=="object"&&q!=null&&"then"in q&&(q=yield q),h.mount(),q})}return(R=globalThis.shopify)===null||R===void 0||R.extend(c,g),g}}var Zd=ry();var Id="AdminBlock";var $d="BlockStack";var ev="Box";var tv="Divider";var nv="Heading";var av="InlineStack";var rv="Link";var iv="Text";var Ry=_a(Hr(),1);var hy=_a(vy(),1);var yy=p=>{var c;return(0,hy.default)({now:Date.now,scheduleTimeout:setTimeout,cancelTimeout:clearTimeout,noTimeout:!1,supportsMicrotasks:!0,scheduleMicrotask:py,queueMicrotask:py,isPrimaryRenderer:(c=p==null?void 0:p.primary)!==null&&c!==void 0?c:!0,supportsMutation:!0,supportsHydration:!1,supportsPersistence:!1,getRootHostContext(){return{}},getChildHostContext(y){return y},createTextInstance(y,R){return R.createText(y)},createInstance(y,R,g){let V=R,{children:z}=V,_=Ds(V,["children"]);return g.createComponent(y,_)},commitTextUpdate(y,R,g){y.update(g)},prepareUpdate(y,R,g,z){let _={},V=!1;for(let j in g)!my(g,j)||j==="children"||(j in z?g[j]!==z[j]&&(V=!0,_[j]=z[j]):(V=!0,_[j]=void 0));for(let j in z)!my(z,j)||j==="children"||j in g||(V=!0,_[j]=z[j]);return V?_:null},commitUpdate(y,R){y.updateProps(R)},appendChildToContainer(y,R){y.append(R)},insertInContainerBefore(y,R,g){y.insertBefore(R,g)},removeChildFromContainer(y,R){y.removeChild(R)},clearContainer(y){for(let R of y.children)y.removeChild(R)},appendInitialChild(y,R){y.append(R)},appendChild(y,R){y.append(R)},insertBefore(y,R,g){y.insertBefore(R,g)},removeChild(y,R){y.removeChild(R)},finalizeInitialChildren(){return!1},shouldSetTextContent(){return!1},getPublicInstance(){},prepareForCommit(){return null},resetAfterCommit(){},commitMount(){},preparePortalMount(){},detachDeletedInstance(){}})};function py(p){return typeof queueMicrotask=="function"?queueMicrotask:Promise.resolve(null).then(p).catch(TR)}function TR(p){setTimeout(()=>{throw p})}var{hasOwnProperty:RR}={};function my(p,c){return RR.call(p,c)}var gy=_a(Hr(),1),zs=(0,gy.createContext)(null);var Cy=_a(Lu(),1),Ey=new WeakMap,Ty=0,CR=yy();function uv(p,c,y,R=CR){let g=Ey.get(c);if(!g){var z;let h={container:Number(((z=Ry.version.split("."))===null||z===void 0?void 0:z[0])||18)>=18?R.createContainer(c,Ty,null,!1,null,"r-ui",()=>null,null):R.createContainer(c,Ty,!1,null),renderContext:{root:c,reconciler:R}};Ey.set(c,h),g=h}let{container:_,renderContext:V}=g;R.updateContainer(p&&(0,Cy.jsx)(zs.Provider,{value:V,children:p}),_,null,y)}var jr=_a(Hr(),1);var _y=_a(Lu(),1);var xy=_a(Hr(),1);function Dy(){let p=(0,xy.useContext)(zs);if(p==null)throw new Error("No remote-ui Render instance found in context");return p}function Cn(p,{fragmentProps:c}={}){if(!c||!c.length)return p;let y=xR(p,c);return y.displayName=p,y}function xR(p,c){let y=p;return(0,jr.memo)(function(_){var V=_,{children:g=[]}=V,z=Ds(V,["children"]);let j=(0,jr.useRef)({}),{root:h,reconciler:q}=Dy(),{props:K,children:ge}=(0,jr.useMemo)(()=>{let nt=[],Ke={};for(let qe of Object.keys(z)){let ke=z[qe];if(c.includes(qe)&&(0,jr.isValidElement)(ke)){let Ce=j.current[qe],De=fr(Ce)?Ce:h.createFragment();j.current[qe]=De,Object.assign(De,{createText(...yt){return h.createText(...yt)},createComponent(yt,...xn){return h.createComponent(yt,...xn)}});let ot=q.createPortal(ke,De,null,null);nt.push(ot),Ke[qe]=De}else Ke[qe]=ke,delete j.current[qe]}return{props:Ke,children:[...jr.Children.toArray(g),...nt]}},[g,z,h,q,j]);return(0,_y.jsx)(y,Xh(Lr({},K),{children:ge}))})}var Oy=_a(Hr(),1),Ls=(0,Oy.createContext)(null);var Ny=_a(Lu(),1);function Hs(p,c){return Zd(p,(y,R)=>Uu(this,null,function*(){let g=yield c(R);yield new Promise((z,_)=>{try{uv((0,Ny.jsx)(Ls.Provider,{value:R,children:g}),y,()=>{z()})}catch(V){console.error(V),_(V)}})}))}var lv=Cn(Id);var js=Cn($d);var Fs=Cn(ev);var ov=Cn(tv);var Yl=Cn(nv);var ql=Cn(av);var sv=Cn(rv);var de=Cn(iv);var Uy=_a(Hr(),1);var Bs=class extends Error{constructor(...c){super(...c),this.name="AdminUIExtensionError"}};function cv(p){let c=(0,Uy.useContext)(Ls);if(c==null)throw new Bs("No extension api found.");return c}var Ql=_a(Hr());var B=_a(Lu()),My="admin.order-details.block.render",Yx=Hs(My,()=>(0,B.jsx)(_R,{}));function DR(p){return Uu(this,null,function*(){return(yield fetch(`/api/order-recaps/${p}`)).json()})}function _R(){let[p,c]=(0,Ql.useState)(),{i18n:y,data:R}=cv(My),[g,z]=(0,Ql.useState)(!1);return(0,Ql.useEffect)(()=>{var _,V;console.log("start  getting data"),DR(`${(V=(_=R.selected)==null?void 0:_[0])==null?void 0:V.id}`.replace("gid://shopify/Order/","")).then(j=>{c(j),console.log("order data",j)}).catch(j=>console.log("errors getting data",j))},[]),(0,B.jsx)(lv,{title:"ALL SIGNS OPTIONS",children:(0,B.jsxs)(js,{gap:"small small",children:[(0,B.jsx)(ql,{blockAlignment:"end",children:(0,B.jsxs)(Yl,{size:4,children:[" ",y.translate("recapTitle"),"  "]})}),(0,B.jsx)(js,{children:p==null?void 0:p.map(_=>{var V,j,h,q,K,ge,nt,Ke,qe,ke,Ce,De,ot,yt,xn,Ue,pe,$t,oe,Me,ne,be,xe,st,ue,St,ze,Et,je,lt,Ae,Tt,Ft,Fn,gt,en,at,Bt,Jn,Bn,sn,cn,Vn,Dn,Ut,tn,_n,bt,Mt,Zn,wn,rt,On,Oa,oa,sa,Nn,Pa,In,Ga,Q,ae,me,te,it,zt,I,X,Ie,Qe,se,Vt,$n,Ka,Le,fn,Yn,Pt,At,dn,ea,Na,Fr,Ir,ca,Rt,dr,d,A,Y,ie,Te,Be,_e,Ee,vt,Xe,Pe,Gt,Un,ta,Lt,ka,fa,Wa,$r,Ci,ei,xi,Kt,Br,Di,Wi,Xi,ti,ni,Xa,Vr,vr,ai,ri,_i,Ji,Ja,pr,Oi,Ht,wr,Dt,ii,Zi,Hu;return(0,B.jsxs)(Fs,{paddingBlockEnd:"base",children:[(0,B.jsxs)(ql,{inlineAlignment:"start",blockAlignment:"center",gap:"base",children:[(0,B.jsxs)(Yl,{size:5,children:[" ",(V=_.line_item)==null?void 0:V.title,"   "]}),(0,B.jsxs)(Yl,{size:3,children:[" x ",(j=_.line_item)==null?void 0:j.quantity,"   "]})]}),(0,B.jsxs)(Fs,{children:[(0,B.jsx)(ov,{}),(0,B.jsxs)(de,{fontWeight:"bold-300",children:[(h=_.recaps.material)==null?void 0:h.label," : "]}),(0,B.jsxs)(de,{children:[(q=_.recaps.material)==null?void 0:q.value," "]}),(0,B.jsxs)(de,{fontWeight:"bold-300",children:[(ge=(K=_.recaps.sign)==null?void 0:K.size)==null?void 0:ge.label," : "]}),(0,B.jsxs)(de,{children:[" ",`
                ${(ke=(qe=(Ke=(nt=_.recaps.sign)==null?void 0:nt.size)==null?void 0:Ke.value)==null?void 0:qe.width)==null?void 0:ke.label} :
                 ${(ot=(De=(Ce=_.recaps.sign)==null?void 0:Ce.size)==null?void 0:De.value)==null?void 0:ot.width.value}, 
                 ${(pe=(Ue=(xn=(yt=_.recaps.sign)==null?void 0:yt.size)==null?void 0:xn.value)==null?void 0:Ue.height)==null?void 0:pe.label}:
                  ${(Me=(oe=($t=_.recaps.sign)==null?void 0:$t.size)==null?void 0:oe.value)==null?void 0:Me.height.value}
                  `," "]}),(0,B.jsxs)(de,{fontWeight:"bold-300",children:[(st=(xe=(be=(ne=_.recaps.sign)==null?void 0:ne.size)==null?void 0:be.value)==null?void 0:xe.thickness)==null?void 0:st.label," : "]}),(0,B.jsxs)(de,{children:[(ze=(St=(ue=_.recaps.sign)==null?void 0:ue.size)==null?void 0:St.value)==null?void 0:ze.thickness.value," "]}),(0,B.jsxs)(de,{fontWeight:"bold-300",children:[(je=(Et=_.recaps.sign)==null?void 0:Et.shape)==null?void 0:je.label," : "]}),(0,B.jsxs)(de,{children:[" ",(Ae=(lt=_.recaps.sign)==null?void 0:lt.shape)==null?void 0:Ae.value]}),(0,B.jsxs)(de,{fontWeight:"bold-300",children:[(Ft=(Tt=_.recaps.sign)==null?void 0:Tt.fixingMethod)==null?void 0:Ft.label," : "]}),(0,B.jsxs)(de,{children:[" ",(gt=(Fn=_.recaps.sign)==null?void 0:Fn.fixingMethod)==null?void 0:gt.value]}),!((Bt=(at=(en=_.recaps.sign)==null?void 0:en.border)==null?void 0:at.value)!=null&&Bt.face1)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(de,{fontWeight:"bold-300",children:[(Bn=(Jn=_.recaps.sign)==null?void 0:Jn.border)==null?void 0:Bn.label," : "]}),(0,B.jsxs)(de,{children:[" ",(Vn=(cn=(sn=_.recaps.sign)==null?void 0:sn.border)==null?void 0:cn.value)==null?void 0:Vn.type,", ",(tn=(Ut=(Dn=_.recaps.sign)==null?void 0:Dn.border)==null?void 0:Ut.value)==null?void 0:tn.color," "]})]}),((Mt=(bt=(_n=_.recaps.sign)==null?void 0:_n.border)==null?void 0:bt.value)==null?void 0:Mt.face1)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(de,{fontWeight:"bold-300",children:[(wn=(Zn=_.recaps.sign)==null?void 0:Zn.border)==null?void 0:wn.label,"-",(On=(rt=_.recaps)==null?void 0:rt.faces)==null?void 0:On.face1,": "]}),(0,B.jsxs)(de,{children:[" ",(Nn=(sa=(oa=(Oa=_.recaps.sign)==null?void 0:Oa.border)==null?void 0:oa.value)==null?void 0:sa.face1)==null?void 0:Nn.type,", ",(Q=(Ga=(In=(Pa=_.recaps.sign)==null?void 0:Pa.border)==null?void 0:In.value)==null?void 0:Ga.face1)==null?void 0:Q.color," "]})]}),((te=(me=(ae=_.recaps.sign)==null?void 0:ae.border)==null?void 0:me.value)==null?void 0:te.face2)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(de,{fontWeight:"bold-300",children:[(zt=(it=_.recaps.sign)==null?void 0:it.border)==null?void 0:zt.label,"-",(X=(I=_.recaps)==null?void 0:I.faces)==null?void 0:X.face2,": "]}),(0,B.jsxs)(de,{children:[" ",(Vt=(se=(Qe=(Ie=_.recaps.sign)==null?void 0:Ie.border)==null?void 0:Qe.value)==null?void 0:se.face2)==null?void 0:Vt.type,", ",(fn=(Le=(Ka=($n=_.recaps.sign)==null?void 0:$n.border)==null?void 0:Ka.value)==null?void 0:Le.face2)==null?void 0:fn.color," "]})]}),!((At=(Pt=(Yn=_.recaps.sign)==null?void 0:Yn.color)==null?void 0:Pt.value)!=null&&At.face1)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(de,{fontWeight:"bold-300",children:[(ea=(dn=_.recaps.sign)==null?void 0:dn.color)==null?void 0:ea.label," : "]}),(0,B.jsx)(de,{children:(Ir=(Fr=(Na=_.recaps.sign)==null?void 0:Na.color)==null?void 0:Fr.value)==null?void 0:Ir.name})]}),((dr=(Rt=(ca=_.recaps.sign)==null?void 0:ca.color)==null?void 0:Rt.value)==null?void 0:dr.face1)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(de,{fontWeight:"bold-300",children:[(A=(d=_.recaps.sign)==null?void 0:d.color)==null?void 0:A.label,"-",(ie=(Y=_.recaps)==null?void 0:Y.faces)==null?void 0:ie.face1,": "]}),(0,B.jsx)(de,{children:(Ee=(_e=(Be=(Te=_.recaps.sign)==null?void 0:Te.color)==null?void 0:Be.value)==null?void 0:_e.face1)==null?void 0:Ee.name})]}),((Pe=(Xe=(vt=_.recaps.sign)==null?void 0:vt.color)==null?void 0:Xe.value)==null?void 0:Pe.face2)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(de,{fontWeight:"bold-300",children:[(Un=(Gt=_.recaps.sign)==null?void 0:Gt.color)==null?void 0:Un.label,"-",(Lt=(ta=_.recaps)==null?void 0:ta.faces)==null?void 0:Lt.face2,": "]}),(0,B.jsx)(de,{children:($r=(Wa=(fa=(ka=_.recaps.sign)==null?void 0:ka.color)==null?void 0:fa.value)==null?void 0:Wa.face2)==null?void 0:$r.name})]}),!((ei=(Ci=_.recaps)==null?void 0:Ci.faces)!=null&&ei.face1)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(de,{fontWeight:"bold-300",children:[(Kt=(xi=_.recaps)==null?void 0:xi.texts)==null?void 0:Kt.label," : "]}),(Br=_.recaps.texts.value)==null?void 0:Br.map(x=>{var Ua,Za,da,va,pa,Ma,nn,ma,za,Aa,Mn,ha,qn,La,vn,ya,ga,Qn,na,aa,ra,Ha,ja,ba;return(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(de,{children:x==null?void 0:x.textContent}),(0,B.jsxs)(de,{fontStyle:"italic",fontWeight:"bold-200",children:[" Font: ",x==null?void 0:x.fontFamily,"   "]}),(0,B.jsxs)(de,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Za=(Ua=x==null?void 0:x.values)==null?void 0:Ua.width)==null?void 0:Za.label,": ",(va=(da=x==null?void 0:x.values)==null?void 0:da.width)==null?void 0:va.value,"  "]}),(0,B.jsxs)(de,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Ma=(pa=x==null?void 0:x.values)==null?void 0:pa.height)==null?void 0:Ma.label,": ",(ma=(nn=x==null?void 0:x.values)==null?void 0:nn.height)==null?void 0:ma.value,"  "]}),(0,B.jsxs)(de,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Aa=(za=x==null?void 0:x.values)==null?void 0:za.left)==null?void 0:Aa.label,": ",(ha=(Mn=x==null?void 0:x.values)==null?void 0:Mn.left)==null?void 0:ha.value," "]}),(0,B.jsxs)(de,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(La=(qn=x==null?void 0:x.values)==null?void 0:qn.top)==null?void 0:La.label,": ",(ya=(vn=x==null?void 0:x.values)==null?void 0:vn.top)==null?void 0:ya.value,"  "]}),(0,B.jsxs)(de,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Qn=(ga=x==null?void 0:x.values)==null?void 0:ga.right)==null?void 0:Qn.label,": ",(aa=(na=x==null?void 0:x.values)==null?void 0:na.right)==null?void 0:aa.value," "]}),(0,B.jsxs)(de,{fontStyle:"italic",fontWeight:"bold-200",children:["   ",(Ha=(ra=x==null?void 0:x.values)==null?void 0:ra.bottom)==null?void 0:Ha.label,": ",(ba=(ja=x==null?void 0:x.values)==null?void 0:ja.bottom)==null?void 0:ba.value,"  "]})]})})]}),((Wi=(Di=_.recaps)==null?void 0:Di.faces)==null?void 0:Wi.face1)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(de,{fontWeight:"bold-300",children:[(ti=(Xi=_.recaps)==null?void 0:Xi.texts)==null?void 0:ti.label,"-",(Xa=(ni=_.recaps)==null?void 0:ni.faces)==null?void 0:Xa.face1," : "]}),(ri=(ai=(vr=(Vr=_.recaps)==null?void 0:Vr.texts)==null?void 0:vr.value)==null?void 0:ai.face1)==null?void 0:ri.map(x=>{var Ua,Za,da,va,pa,Ma,nn,ma,za,Aa,Mn,ha,qn,La,vn,ya,ga,Qn,na,aa,ra,Ha,ja,ba;return(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(de,{children:x==null?void 0:x.textContent}),(0,B.jsxs)(de,{fontStyle:"italic",fontWeight:"bold-200",children:[" Font: ",x==null?void 0:x.fontFamily,"   "]}),(0,B.jsxs)(de,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Za=(Ua=x==null?void 0:x.values)==null?void 0:Ua.width)==null?void 0:Za.label,": ",(va=(da=x==null?void 0:x.values)==null?void 0:da.width)==null?void 0:va.value,"  "]}),(0,B.jsxs)(de,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Ma=(pa=x==null?void 0:x.values)==null?void 0:pa.height)==null?void 0:Ma.label,": ",(ma=(nn=x==null?void 0:x.values)==null?void 0:nn.height)==null?void 0:ma.value,"  "]}),(0,B.jsxs)(de,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Aa=(za=x==null?void 0:x.values)==null?void 0:za.left)==null?void 0:Aa.label,": ",(ha=(Mn=x==null?void 0:x.values)==null?void 0:Mn.left)==null?void 0:ha.value," "]}),(0,B.jsxs)(de,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(La=(qn=x==null?void 0:x.values)==null?void 0:qn.top)==null?void 0:La.label,": ",(ya=(vn=x==null?void 0:x.values)==null?void 0:vn.top)==null?void 0:ya.value,"  "]}),(0,B.jsxs)(de,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Qn=(ga=x==null?void 0:x.values)==null?void 0:ga.right)==null?void 0:Qn.label,": ",(aa=(na=x==null?void 0:x.values)==null?void 0:na.right)==null?void 0:aa.value," "]}),(0,B.jsxs)(de,{fontStyle:"italic",fontWeight:"bold-200",children:["   ",(Ha=(ra=x==null?void 0:x.values)==null?void 0:ra.bottom)==null?void 0:Ha.label,": ",(ba=(ja=x==null?void 0:x.values)==null?void 0:ja.bottom)==null?void 0:ba.value,"  "]})]})})]}),((Ji=(_i=_.recaps)==null?void 0:_i.faces)==null?void 0:Ji.face2)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(de,{fontWeight:"bold-300",children:[(pr=(Ja=_.recaps)==null?void 0:Ja.texts)==null?void 0:pr.label,"-",(Ht=(Oi=_.recaps)==null?void 0:Oi.faces)==null?void 0:Ht.face2," : "]}),(ii=(Dt=(wr=_.recaps.texts)==null?void 0:wr.value)==null?void 0:Dt.face2)==null?void 0:ii.map(x=>{var Ua,Za,da,va,pa,Ma,nn,ma,za,Aa,Mn,ha,qn,La,vn,ya,ga,Qn,na,aa,ra,Ha,ja,ba;return(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(de,{children:x==null?void 0:x.textContent}),(0,B.jsxs)(de,{fontStyle:"italic",fontWeight:"bold-200",children:[" Font: ",x==null?void 0:x.fontFamily,"   "]}),(0,B.jsxs)(de,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Za=(Ua=x==null?void 0:x.values)==null?void 0:Ua.width)==null?void 0:Za.label,": ",(va=(da=x==null?void 0:x.values)==null?void 0:da.width)==null?void 0:va.value,"  "]}),(0,B.jsxs)(de,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Ma=(pa=x==null?void 0:x.values)==null?void 0:pa.height)==null?void 0:Ma.label,": ",(ma=(nn=x==null?void 0:x.values)==null?void 0:nn.height)==null?void 0:ma.value,"  "]}),(0,B.jsxs)(de,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Aa=(za=x==null?void 0:x.values)==null?void 0:za.left)==null?void 0:Aa.label,": ",(ha=(Mn=x==null?void 0:x.values)==null?void 0:Mn.left)==null?void 0:ha.value," "]}),(0,B.jsxs)(de,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(La=(qn=x==null?void 0:x.values)==null?void 0:qn.top)==null?void 0:La.label,": ",(ya=(vn=x==null?void 0:x.values)==null?void 0:vn.top)==null?void 0:ya.value,"  "]}),(0,B.jsxs)(de,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Qn=(ga=x==null?void 0:x.values)==null?void 0:ga.right)==null?void 0:Qn.label,": ",(aa=(na=x==null?void 0:x.values)==null?void 0:na.right)==null?void 0:aa.value," "]}),(0,B.jsxs)(de,{fontStyle:"italic",fontWeight:"bold-200",children:["   ",(Ha=(ra=x==null?void 0:x.values)==null?void 0:ra.bottom)==null?void 0:Ha.label,": ",(ba=(ja=x==null?void 0:x.values)==null?void 0:ja.bottom)==null?void 0:ba.value,"  "]})]})})]}),(0,B.jsx)(ql,{inlineAlignment:"space-between",children:(0,B.jsx)(sv,{href:(Hu=(Zi=_.recaps)==null?void 0:Zi.filesUrl)==null?void 0:Hu.zipUrl,children:y.translate("bownloadBtn")})})]})]})})})]})})}})();
ue;
                }
                var _newChildren = iteratorFn.call(newChildrenIterable);
                if (_newChildren) {
                  var knownKeys = null;
                  var _step = _newChildren.next();
                  for (; !_step.done; _step = _newChildren.next()) {
                    var child = _step.value;
                    knownKeys = warnOnInvalidKey(child, knownKeys, returnFiber);
                  }
                }
              }
              var newChildren = iteratorFn.call(newChildrenIterable);
              if (newChildren == null) {
                throw new Error("An iterable object provided no iterator.");
              }
              var resultingFirstChild = null;
              var previousNewFiber = null;
              var oldFiber = currentFirstChild;
              var lastPlacedIndex = 0;
              var newIdx = 0;
              var nextOldFiber = null;
              var step = newChildren.next();
              for (; oldFiber !== null && !step.done; newIdx++, step = newChildren.next()) {
                if (oldFiber.index > newIdx) {
                  nextOldFiber = oldFiber;
                  oldFiber = null;
                } else {
                  nextOldFiber = oldFiber.sibling;
                }
                var newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
                if (newFiber === null) {
                  if (oldFiber === null) {
                    oldFiber = nextOldFiber;
                  }
                  break;
                }
                if (shouldTrackSideEffects) {
                  if (oldFiber && newFiber.alternate === null) {
                    deleteChild(returnFiber, oldFiber);
                  }
                }
                lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
                if (previousNewFiber === null) {
                  resultingFirstChild = newFiber;
                } else {
                  previousNewFiber.sibling = newFiber;
                }
                previousNewFiber = newFiber;
                oldFiber = nextOldFiber;
              }
              if (step.done) {
                deleteRemainingChildren(returnFiber, oldFiber);
                if (getIsHydrating()) {
                  var numberOfForks = newIdx;
                  pushTreeFork(returnFiber, numberOfForks);
                }
                return resultingFirstChild;
              }
              if (oldFiber === null) {
                for (; !step.done; newIdx++, step = newChildren.next()) {
                  var _newFiber3 = createChild(returnFiber, step.value, lanes);
                  if (_newFiber3 === null) {
                    continue;
                  }
                  lastPlacedIndex = placeChild(_newFiber3, lastPlacedIndex, newIdx);
                  if (previousNewFiber === null) {
                    resultingFirstChild = _newFiber3;
                  } else {
                    previousNewFiber.sibling = _newFiber3;
                  }
                  previousNewFiber = _newFiber3;
                }
                if (getIsHydrating()) {
                  var _numberOfForks3 = newIdx;
                  pushTreeFork(returnFiber, _numberOfForks3);
                }
                return resultingFirstChild;
              }
              var existingChildren = mapRemainingChildren(returnFiber, oldFiber);
              for (; !step.done; newIdx++, step = newChildren.next()) {
                var _newFiber4 = updateFromMap(existingChildren, returnFiber, newIdx, step.value, lanes);
                if (_newFiber4 !== null) {
                  if (shouldTrackSideEffects) {
                    if (_newFiber4.alternate !== null) {
                      existingChildren.delete(_newFiber4.key === null ? newIdx : _newFiber4.key);
                    }
                  }
                  lastPlacedIndex = placeChild(_newFiber4, lastPlacedIndex, newIdx);
                  if (previousNewFiber === null) {
                    resultingFirstChild = _newFiber4;
                  } else {
                    previousNewFiber.sibling = _newFiber4;
                  }
                  previousNewFiber = _newFiber4;
                }
              }
              if (shouldTrackSideEffects) {
                existingChildren.forEach(function(child2) {
                  return deleteChild(returnFiber, child2);
                });
              }
              if (getIsHydrating()) {
                var _numberOfForks4 = newIdx;
                pushTreeFork(returnFiber, _numberOfForks4);
              }
              return resultingFirstChild;
            }
            function reconcileSingleTextNode(returnFiber, currentFirstChild, textContent, lanes) {
              if (currentFirstChild !== null && currentFirstChild.tag === HostText) {
                deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
                var existing = useFiber(currentFirstChild, textContent);
                existing.return = returnFiber;
                return existing;
              }
              deleteRemainingChildren(returnFiber, currentFirstChild);
              var created = createFiberFromText(textContent, returnFiber.mode, lanes);
              created.return = returnFiber;
              return created;
            }
            function reconcileSingleElement(returnFiber, currentFirstChild, element, lanes) {
              var key = element.key;
              var child = currentFirstChild;
              while (child !== null) {
                if (child.key === key) {
                  var elementType = element.type;
                  if (elementType === REACT_FRAGMENT_TYPE) {
                    if (child.tag === Fragment2) {
                      deleteRemainingChildren(returnFiber, child.sibling);
                      var existing = useFiber(child, element.props.children);
                      existing.return = returnFiber;
                      {
                        existing._debugSource = element._source;
                        existing._debugOwner = element._owner;
                      }
                      return existing;
                    }
                  } else {
                    if (child.elementType === elementType || // Keep this check inline so it only runs on the false path:
                    isCompatibleFamilyForHotReloading(child, element) || // Lazy types should reconcile their resolved type.
                    // We need to do this after the Hot Reloading check above,
                    // because hot reloading has different semantics than prod because
                    // it doesn't resuspend. So we can't let the call below suspend.
                    typeof elementType === "object" && elementType !== null && elementType.$$typeof === REACT_LAZY_TYPE && resolveLazy(elementType) === child.type) {
                      deleteRemainingChildren(returnFiber, child.sibling);
                      var _existing = useFiber(child, element.props);
                      _existing.ref = coerceRef(returnFiber, child, element);
                      _existing.return = returnFiber;
                      {
                        _existing._debugSource = element._source;
                        _existing._debugOwner = element._owner;
                      }
                      return _existing;
                    }
                  }
                  deleteRemainingChildren(returnFiber, child);
                  break;
                } else {
                  deleteChild(returnFiber, child);
                }
                child = child.sibling;
              }
              if (element.type === REACT_FRAGMENT_TYPE) {
                var created = createFiberFromFragment(element.props.children, returnFiber.mode, lanes, element.key);
                created.return = returnFiber;
                return created;
              } else {
                var _created4 = createFiberFromElement(element, returnFiber.mode, lanes);
                _created4.ref = coerceRef(returnFiber, currentFirstChild, element);
                _created4.return = returnFiber;
                return _created4;
              }
            }
            function reconcileSinglePortal(returnFiber, currentFirstChild, portal, lanes) {
              var key = portal.key;
              var child = currentFirstChild;
              while (child !== null) {
                if (child.key === key) {
                  if (child.tag === HostPortal && child.stateNode.containerInfo === portal.containerInfo && child.stateNode.implementation === portal.implementation) {
                    deleteRemainingChildren(returnFiber, child.sibling);
                    var existing = useFiber(child, portal.children || []);
                    existing.return = returnFiber;
                    return existing;
                  } else {
                    deleteRemainingChildren(returnFiber, child);
                    break;
                  }
                } else {
                  deleteChild(returnFiber, child);
                }
                child = child.sibling;
              }
              var created = createFiberFromPortal(portal, returnFiber.mode, lanes);
              created.return = returnFiber;
              return created;
            }
            function reconcileChildFibers2(returnFiber, currentFirstChild, newChild, lanes) {
              var isUnkeyedTopLevelFragment = typeof newChild === "object" && newChild !== null && newChild.type === REACT_FRAGMENT_TYPE && newChild.key === null;
              if (isUnkeyedTopLevelFragment) {
                newChild = newChild.props.children;
              }
              if (typeof newChild === "object" && newChild !== null) {
                switch (newChild.$$typeof) {
                  case REACT_ELEMENT_TYPE:
                    return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild, lanes));
                  case REACT_PORTAL_TYPE:
                    return placeSingleChild(reconcileSinglePortal(returnFiber, currentFirstChild, newChild, lanes));
                  case REACT_LAZY_TYPE:
                    var payload = newChild._payload;
                    var init = newChild._init;
                    return reconcileChildFibers2(returnFiber, currentFirstChild, init(payload), lanes);
                }
                if (isArray(newChild)) {
                  return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, lanes);
                }
                if (getIteratorFn(newChild)) {
                  return reconcileChildrenIterator(returnFiber, currentFirstChild, newChild, lanes);
                }
                throwOnInvalidObjectType(returnFiber, newChild);
              }
              if (typeof newChild === "string" && newChild !== "" || typeof newChild === "number") {
                return placeSingleChild(reconcileSingleTextNode(returnFiber, currentFirstChild, "" + newChild, lanes));
              }
              {
                if (typeof newChild === "function") {
                  warnOnFunctionType(returnFiber);
                }
              }
              return deleteRemainingChildren(returnFiber, currentFirstChild);
            }
            return reconcileChildFibers2;
          }
          var reconcileChildFibers = ChildReconciler(true);
          var mountChildFibers = ChildReconciler(false);
          function cloneChildFibers(current2, workInProgress2) {
            if (current2 !== null && workInProgress2.child !== current2.child) {
              throw new Error("Resuming work not yet implemented.");
            }
            if (workInProgress2.child === null) {
              return;
            }
            var currentChild = workInProgress2.child;
            var newChild = createWorkInProgress(currentChild, currentChild.pendingProps);
            workInProgress2.child = newChild;
            newChild.return = workInProgress2;
            while (currentChild.sibling !== null) {
              currentChild = currentChild.sibling;
              newChild = newChild.sibling = createWorkInProgress(currentChild, currentChild.pendingProps);
              newChild.return = workInProgress2;
            }
            newChild.sibling = null;
          }
          function resetChildFibers(workInProgress2, lanes) {
            var child = workInProgress2.child;
            while (child !== null) {
              resetWorkInProgress(child, lanes);
              child = child.sibling;
            }
          }
          var valueCursor = createCursor(null);
          var rendererSigil;
          {
            rendererSigil = {};
          }
          var currentlyRenderingFiber = null;
          var lastContextDependency = null;
          var lastFullyObservedContext = null;
          var isDisallowedContextReadInDEV = false;
          function resetContextDependencies() {
            currentlyRenderingFiber = null;
            lastContextDependency = null;
            lastFullyObservedContext = null;
            {
              isDisallowedContextReadInDEV = false;
            }
          }
          function enterDisallowedContextReadInDEV() {
            {
              isDisallowedContextReadInDEV = true;
            }
          }
          function exitDisallowedContextReadInDEV() {
            {
              isDisallowedContextReadInDEV = false;
            }
          }
          function pushProvider(providerFiber, context, nextValue) {
            if (isPrimaryRenderer) {
              push(valueCursor, context._currentValue, providerFiber);
              context._currentValue = nextValue;
              {
                if (context._currentRenderer !== void 0 && context._currentRenderer !== null && context._currentRenderer !== rendererSigil) {
                  error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.");
                }
                context._currentRenderer = rendererSigil;
              }
            } else {
              push(valueCursor, context._currentValue2, providerFiber);
              context._currentValue2 = nextValue;
              {
                if (context._currentRenderer2 !== void 0 && context._currentRenderer2 !== null && context._currentRenderer2 !== rendererSigil) {
                  error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.");
                }
                context._currentRenderer2 = rendererSigil;
              }
            }
          }
          function popProvider(context, providerFiber) {
            var currentValue = valueCursor.current;
            pop(valueCursor, providerFiber);
            if (isPrimaryRenderer) {
              {
                context._currentValue = currentValue;
              }
            } else {
              {
                context._currentValue2 = currentValue;
              }
            }
          }
          function scheduleContextWorkOnParentPath(parent, renderLanes2, propagationRoot) {
            var node = parent;
            while (node !== null) {
              var alternate = node.alternate;
              if (!isSubsetOfLanes(node.childLanes, renderLanes2)) {
                node.childLanes = mergeLanes(node.childLanes, renderLanes2);
                if (alternate !== null) {
                  alternate.childLanes = mergeLanes(alternate.childLanes, renderLanes2);
                }
              } else if (alternate !== null && !isSubsetOfLanes(alternate.childLanes, renderLanes2)) {
                alternate.childLanes = mergeLanes(alternate.childLanes, renderLanes2);
              }
              if (node === propagationRoot) {
                break;
              }
              node = node.return;
            }
            {
              if (node !== propagationRoot) {
                error("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
          }
          function propagateContextChange(workInProgress2, context, renderLanes2) {
            {
              propagateContextChange_eager(workInProgress2, context, renderLanes2);
            }
          }
          function propagateContextChange_eager(workInProgress2, context, renderLanes2) {
            var fiber = workInProgress2.child;
            if (fiber !== null) {
              fiber.return = workInProgress2;
            }
            while (fiber !== null) {
              var nextFiber = void 0;
              var list = fiber.dependencies;
              if (list !== null) {
                nextFiber = fiber.child;
                var dependency = list.firstContext;
                while (dependency !== null) {
                  if (dependency.context === context) {
                    if (fiber.tag === ClassComponent) {
                      var lane = pickArbitraryLane(renderLanes2);
                      var update = createUpdate(NoTimestamp, lane);
                      update.tag = ForceUpdate;
                      var updateQueue = fiber.updateQueue;
                      if (updateQueue === null)
                        ;
                      else {
                        var sharedQueue = updateQueue.shared;
                        var pending = sharedQueue.pending;
                        if (pending === null) {
                          update.next = update;
                        } else {
                          update.next = pending.next;
                          pending.next = update;
                        }
                        sharedQueue.pending = update;
                      }
                    }
                    fiber.lanes = mergeLanes(fiber.lanes, renderLanes2);
                    var alternate = fiber.alternate;
                    if (alternate !== null) {
                      alternate.lanes = mergeLanes(alternate.lanes, renderLanes2);
                    }
                    scheduleContextWorkOnParentPath(fiber.return, renderLanes2, workInProgress2);
                    list.lanes = mergeLanes(list.lanes, renderLanes2);
                    break;
                  }
                  dependency = dependency.next;
                }
              } else if (fiber.tag === ContextProvider) {
                nextFiber = fiber.type === workInProgress2.type ? null : fiber.child;
              } else if (fiber.tag === DehydratedFragment) {
                var parentSuspense = fiber.return;
                if (parentSuspense === null) {
                  throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
                }
                parentSuspense.lanes = mergeLanes(parentSuspense.lanes, renderLanes2);
                var _alternate = parentSuspense.alternate;
                if (_alternate !== null) {
                  _alternate.lanes = mergeLanes(_alternate.lanes, renderLanes2);
                }
                scheduleContextWorkOnParentPath(parentSuspense, renderLanes2, workInProgress2);
                nextFiber = fiber.sibling;
              } else {
                nextFiber = fiber.child;
              }
              if (nextFiber !== null) {
                nextFiber.return = fiber;
              } else {
                nextFiber = fiber;
                while (nextFiber !== null) {
                  if (nextFiber === workInProgress2) {
                    nextFiber = null;
                    break;
                  }
                  var sibling = nextFiber.sibling;
                  if (sibling !== null) {
                    sibling.return = nextFiber.return;
                    nextFiber = sibling;
                    break;
                  }
                  nextFiber = nextFiber.return;
                }
              }
              fiber = nextFiber;
            }
          }
          function prepareToReadContext(workInProgress2, renderLanes2) {
            currentlyRenderingFiber = workInProgress2;
            lastContextDependency = null;
            lastFullyObservedContext = null;
            var dependencies = workInProgress2.dependencies;
            if (dependencies !== null) {
              {
                var firstContext = dependencies.firstContext;
                if (firstContext !== null) {
                  if (includesSomeLane(dependencies.lanes, renderLanes2)) {
                    markWorkInProgressReceivedUpdate();
                  }
                  dependencies.firstContext = null;
                }
              }
            }
          }
          function readContext(context) {
            {
              if (isDisallowedContextReadInDEV) {
                error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
              }
            }
            var value = isPrimaryRenderer ? context._currentValue : context._currentValue2;
            if (lastFullyObservedContext === context)
              ;
            else {
              var contextItem = {
                context,
                memoizedValue: value,
                next: null
              };
              if (lastContextDependency === null) {
                if (currentlyRenderingFiber === null) {
                  throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
                }
                lastContextDependency = contextItem;
                currentlyRenderingFiber.dependencies = {
                  lanes: NoLanes,
                  firstContext: contextItem
                };
              } else {
                lastContextDependency = lastContextDependency.next = contextItem;
              }
            }
            return value;
          }
          var concurrentQueues = null;
          function pushConcurrentUpdateQueue(queue) {
            if (concurrentQueues === null) {
              concurrentQueues = [queue];
            } else {
              concurrentQueues.push(queue);
            }
          }
          function finishQueueingConcurrentUpdates() {
            if (concurrentQueues !== null) {
              for (var i = 0; i < concurrentQueues.length; i++) {
                var queue = concurrentQueues[i];
                var lastInterleavedUpdate = queue.interleaved;
                if (lastInterleavedUpdate !== null) {
                  queue.interleaved = null;
                  var firstInterleavedUpdate = lastInterleavedUpdate.next;
                  var lastPendingUpdate = queue.pending;
                  if (lastPendingUpdate !== null) {
                    var firstPendingUpdate = lastPendingUpdate.next;
                    lastPendingUpdate.next = firstInterleavedUpdate;
                    lastInterleavedUpdate.next = firstPendingUpdate;
                  }
                  queue.pending = lastInterleavedUpdate;
                }
              }
              concurrentQueues = null;
            }
          }
          function enqueueConcurrentHookUpdate(fiber, queue, update, lane) {
            var interleaved = queue.interleaved;
            if (interleaved === null) {
              update.next = update;
              pushConcurrentUpdateQueue(queue);
            } else {
              update.next = interleaved.next;
              interleaved.next = update;
            }
            queue.interleaved = update;
            return markUpdateLaneFromFiberToRoot(fiber, lane);
          }
          function enqueueConcurrentHookUpdateAndEagerlyBailout(fiber, queue, update, lane) {
            var interleaved = queue.interleaved;
            if (interleaved === null) {
              update.next = update;
              pushConcurrentUpdateQueue(queue);
            } else {
              update.next = interleaved.next;
              interleaved.next = update;
            }
            queue.interleaved = update;
          }
          function enqueueConcurrentClassUpdate(fiber, queue, update, lane) {
            var interleaved = queue.interleaved;
            if (interleaved === null) {
              update.next = update;
              pushConcurrentUpdateQueue(queue);
            } else {
              update.next = interleaved.next;
              interleaved.next = update;
            }
            queue.interleaved = update;
            return markUpdateLaneFromFiberToRoot(fiber, lane);
          }
          function enqueueConcurrentRenderForLane(fiber, lane) {
            return markUpdateLaneFromFiberToRoot(fiber, lane);
          }
          var unsafe_markUpdateLaneFromFiberToRoot = markUpdateLaneFromFiberToRoot;
          function markUpdateLaneFromFiberToRoot(sourceFiber, lane) {
            sourceFiber.lanes = mergeLanes(sourceFiber.lanes, lane);
            var alternate = sourceFiber.alternate;
            if (alternate !== null) {
              alternate.lanes = mergeLanes(alternate.lanes, lane);
            }
            {
              if (alternate === null && (sourceFiber.flags & (Placement | Hydrating)) !== NoFlags) {
                warnAboutUpdateOnNotYetMountedFiberInDEV(sourceFiber);
              }
            }
            var node = sourceFiber;
            var parent = sourceFiber.return;
            while (parent !== null) {
              parent.childLanes = mergeLanes(parent.childLanes, lane);
              alternate = parent.alternate;
              if (alternate !== null) {
                alternate.childLanes = mergeLanes(alternate.childLanes, lane);
              } else {
                {
                  if ((parent.flags & (Placement | Hydrating)) !== NoFlags) {
                    warnAboutUpdateOnNotYetMountedFiberInDEV(sourceFiber);
                  }
                }
              }
              node = parent;
              parent = parent.return;
            }
            if (node.tag === HostRoot) {
              var root = node.stateNode;
              return root;
            } else {
              return null;
            }
          }
          var UpdateState = 0;
          var ReplaceState = 1;
          var ForceUpdate = 2;
          var CaptureUpdate = 3;
          var hasForceUpdate = false;
          var didWarnUpdateInsideUpdate;
          var currentlyProcessingQueue;
          {
            didWarnUpdateInsideUpdate = false;
            currentlyProcessingQueue = null;
          }
          function initializeUpdateQueue(fiber) {
            var queue = {
              baseState: fiber.memoizedState,
              firstBaseUpdate: null,
              lastBaseUpdate: null,
              shared: {
                pending: null,
                interleaved: null,
                lanes: NoLanes
              },
              effects: null
            };
            fiber.updateQueue = queue;
          }
          function cloneUpdateQueue(current2, workInProgress2) {
            var queue = workInProgress2.updateQueue;
            var currentQueue = current2.updateQueue;
            if (queue === currentQueue) {
              var clone = {
                baseState: currentQueue.baseState,
                firstBaseUpdate: currentQueue.firstBaseUpdate,
                lastBaseUpdate: currentQueue.lastBaseUpdate,
                shared: currentQueue.shared,
                effects: currentQueue.effects
              };
              workInProgress2.updateQueue = clone;
            }
          }
          function createUpdate(eventTime, lane) {
            var update = {
              eventTime,
              lane,
              tag: UpdateState,
              payload: null,
              callback: null,
              next: null
            };
            return update;
          }
          function enqueueUpdate(fiber, update, lane) {
            var updateQueue = fiber.updateQueue;
            if (updateQueue === null) {
              return null;
            }
            var sharedQueue = updateQueue.shared;
            {
              if (currentlyProcessingQueue === sharedQueue && !didWarnUpdateInsideUpdate) {
                error("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.");
                didWarnUpdateInsideUpdate = true;
              }
            }
            if (isUnsafeClassRenderPhaseUpdate()) {
              var pending = sharedQueue.pending;
              if (pending === null) {
                update.next = update;
              } else {
                update.next = pending.next;
                pending.next = update;
              }
              sharedQueue.pending = update;
              return unsafe_markUpdateLaneFromFiberToRoot(fiber, lane);
            } else {
              return enqueueConcurrentClassUpdate(fiber, sharedQueue, update, lane);
            }
          }
          function entangleTransitions(root, fiber, lane) {
            var updateQueue = fiber.updateQueue;
            if (updateQueue === null) {
              return;
            }
            var sharedQueue = updateQueue.shared;
            if (isTransitionLane(lane)) {
              var queueLanes = sharedQueue.lanes;
              queueLanes = intersectLanes(queueLanes, root.pendingLanes);
              var newQueueLanes = mergeLanes(queueLanes, lane);
              sharedQueue.lanes = newQueueLanes;
              markRootEntangled(root, newQueueLanes);
            }
          }
          function enqueueCapturedUpdate(workInProgress2, capturedUpdate) {
            var queue = workInProgress2.updateQueue;
            var current2 = workInProgress2.alternate;
            if (current2 !== null) {
              var currentQueue = current2.updateQueue;
              if (queue === currentQueue) {
                var newFirst = null;
                var newLast = null;
                var firstBaseUpdate = queue.firstBaseUpdate;
                if (firstBaseUpdate !== null) {
                  var update = firstBaseUpdate;
                  do {
                    var clone = {
                      eventTime: update.eventTime,
                      lane: update.lane,
                      tag: update.tag,
                      payload: update.payload,
                      callback: update.callback,
                      next: null
                    };
                    if (newLast === null) {
                      newFirst = newLast = clone;
                    } else {
                      newLast.next = clone;
                      newLast = clone;
                    }
                    update = update.next;
                  } while (update !== null);
                  if (newLast === null) {
                    newFirst = newLast = capturedUpdate;
                  } else {
                    newLast.next = capturedUpdate;
                    newLast = capturedUpdate;
                  }
                } else {
                  newFirst = newLast = capturedUpdate;
                }
                queue = {
                  baseState: currentQueue.baseState,
                  firstBaseUpdate: newFirst,
                  lastBaseUpdate: newLast,
                  shared: currentQueue.shared,
                  effects: currentQueue.effects
                };
                workInProgress2.updateQueue = queue;
                return;
              }
            }
            var lastBaseUpdate = queue.lastBaseUpdate;
            if (lastBaseUpdate === null) {
              queue.firstBaseUpdate = capturedUpdate;
            } else {
              lastBaseUpdate.next = capturedUpdate;
            }
            queue.lastBaseUpdate = capturedUpdate;
          }
          function getStateFromUpdate(workInProgress2, queue, update, prevState, nextProps, instance) {
            switch (update.tag) {
              case ReplaceState: {
                var payload = update.payload;
                if (typeof payload === "function") {
                  {
                    enterDisallowedContextReadInDEV();
                  }
                  var nextState = payload.call(instance, prevState, nextProps);
                  {
                    if (workInProgress2.mode & StrictLegacyMode) {
                      setIsStrictModeForDevtools(true);
                      try {
                        payload.call(instance, prevState, nextProps);
                      } finally {
                        setIsStrictModeForDevtools(false);
                      }
                    }
                    exitDisallowedContextReadInDEV();
                  }
                  return nextState;
                }
                return payload;
              }
              case CaptureUpdate: {
                workInProgress2.flags = workInProgress2.flags & ~ShouldCapture | DidCapture;
              }
              case UpdateState: {
                var _payload = update.payload;
                var partialState;
                if (typeof _payload === "function") {
                  {
                    enterDisallowedContextReadInDEV();
                  }
                  partialState = _payload.call(instance, prevState, nextProps);
                  {
                    if (workInProgress2.mode & StrictLegacyMode) {
                      setIsStrictModeForDevtools(true);
                      try {
                        _payload.call(instance, prevState, nextProps);
                      } finally {
                        setIsStrictModeForDevtools(false);
                      }
                    }
                    exitDisallowedContextReadInDEV();
                  }
                } else {
                  partialState = _payload;
                }
                if (partialState === null || partialState === void 0) {
                  return prevState;
                }
                return assign({}, prevState, partialState);
              }
              case ForceUpdate: {
                hasForceUpdate = true;
                return prevState;
              }
            }
            return prevState;
          }
          function processUpdateQueue(workInProgress2, props, instance, renderLanes2) {
            var queue = workInProgress2.updateQueue;
            hasForceUpdate = false;
            {
              currentlyProcessingQueue = queue.shared;
            }
            var firstBaseUpdate = queue.firstBaseUpdate;
            var lastBaseUpdate = queue.lastBaseUpdate;
            var pendingQueue = queue.shared.pending;
            if (pendingQueue !== null) {
              queue.shared.pending = null;
              var lastPendingUpdate = pendingQueue;
              var firstPendingUpdate = lastPendingUpdate.next;
              lastPendingUpdate.next = null;
              if (lastBaseUpdate === null) {
                firstBaseUpdate = firstPendingUpdate;
              } else {
                lastBaseUpdate.next = firstPendingUpdate;
              }
              lastBaseUpdate = lastPendingUpdate;
              var current2 = workInProgress2.alternate;
              if (current2 !== null) {
                var currentQueue = current2.updateQueue;
                var currentLastBaseUpdate = currentQueue.lastBaseUpdate;
                if (currentLastBaseUpdate !== lastBaseUpdate) {
                  if (currentLastBaseUpdate === null) {
                    currentQueue.firstBaseUpdate = firstPendingUpdate;
                  } else {
                    currentLastBaseUpdate.next = firstPendingUpdate;
                  }
                  currentQueue.lastBaseUpdate = lastPendingUpdate;
                }
              }
            }
            if (firstBaseUpdate !== null) {
              var newState = queue.baseState;
              var newLanes = NoLanes;
              var newBaseState = null;
              var newFirstBaseUpdate = null;
              var newLastBaseUpdate = null;
              var update = firstBaseUpdate;
              do {
                var updateLane = update.lane;
                var updateEventTime = update.eventTime;
                if (!isSubsetOfLanes(renderLanes2, updateLane)) {
                  var clone = {
                    eventTime: updateEventTime,
                    lane: updateLane,
                    tag: update.tag,
                    payload: update.payload,
                    callback: update.callback,
                    next: null
                  };
                  if (newLastBaseUpdate === null) {
                    newFirstBaseUpdate = newLastBaseUpdate = clone;
                    newBaseState = newState;
                  } else {
                    newLastBaseUpdate = newLastBaseUpdate.next = clone;
                  }
                  newLanes = mergeLanes(newLanes, updateLane);
                } else {
                  if (newLastBaseUpdate !== null) {
                    var _clone = {
                      eventTime: updateEventTime,
                      // This update is going to be committed so we never want uncommit
                      // it. Using NoLane works because 0 is a subset of all bitmasks, so
                      // this will never be skipped by the check above.
                      lane: NoLane,
                      tag: update.tag,
                      payload: update.payload,
                      callback: update.callback,
                      next: null
                    };
                    newLastBaseUpdate = newLastBaseUpdate.next = _clone;
                  }
                  newState = getStateFromUpdate(workInProgress2, queue, update, newState, props, instance);
                  var callback = update.callback;
                  if (callback !== null && // If the update was already committed, we should not queue its
                  // callback again.
                  update.lane !== NoLane) {
                    workInProgress2.flags |= Callback;
                    var effects = queue.effects;
                    if (effects === null) {
                      queue.effects = [update];
                    } else {
                      effects.push(update);
                    }
                  }
                }
                update = update.next;
                if (update === null) {
                  pendingQueue = queue.shared.pending;
                  if (pendingQueue === null) {
                    break;
                  } else {
                    var _lastPendingUpdate = pendingQueue;
                    var _firstPendingUpdate = _lastPendingUpdate.next;
                    _lastPendingUpdate.next = null;
                    update = _firstPendingUpdate;
                    queue.lastBaseUpdate = _lastPendingUpdate;
                    queue.shared.pending = null;
                  }
                }
              } while (true);
              if (newLastBaseUpdate === null) {
                newBaseState = newState;
              }
              queue.baseState = newBaseState;
              queue.firstBaseUpdate = newFirstBaseUpdate;
              queue.lastBaseUpdate = newLastBaseUpdate;
              var lastInterleaved = queue.shared.interleaved;
              if (lastInterleaved !== null) {
                var interleaved = lastInterleaved;
                do {
                  newLanes = mergeLanes(newLanes, interleaved.lane);
                  interleaved = interleaved.next;
                } while (interleaved !== lastInterleaved);
              } else if (firstBaseUpdate === null) {
                queue.shared.lanes = NoLanes;
              }
              markSkippedUpdateLanes(newLanes);
              workInProgress2.lanes = newLanes;
              workInProgress2.memoizedState = newState;
            }
            {
              currentlyProcessingQueue = null;
            }
          }
          function callCallback(callback, context) {
            if (typeof callback !== "function") {
              throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + callback));
            }
            callback.call(context);
          }
          function resetHasForceUpdateBeforeProcessing() {
            hasForceUpdate = false;
          }
          function checkHasForceUpdateAfterProcessing() {
            return hasForceUpdate;
          }
          function commitUpdateQueue(finishedWork, finishedQueue, instance) {
            var effects = finishedQueue.effects;
            finishedQueue.effects = null;
            if (effects !== null) {
              for (var i = 0; i < effects.length; i++) {
                var effect = effects[i];
                var callback = effect.callback;
                if (callback !== null) {
                  effect.callback = null;
                  callCallback(callback, instance);
                }
              }
            }
          }
          var NO_CONTEXT = {};
          var contextStackCursor$1 = createCursor(NO_CONTEXT);
          var contextFiberStackCursor = createCursor(NO_CONTEXT);
          var rootInstanceStackCursor = createCursor(NO_CONTEXT);
          function requiredContext(c) {
            if (c === NO_CONTEXT) {
              throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
            }
            return c;
          }
          function getRootHostContainer() {
            var rootInstance = requiredContext(rootInstanceStackCursor.current);
            return rootInstance;
          }
          function pushHostContainer(fiber, nextRootInstance) {
            push(rootInstanceStackCursor, nextRootInstance, fiber);
            push(contextFiberStackCursor, fiber, fiber);
            push(contextStackCursor$1, NO_CONTEXT, fiber);
            var nextRootContext = getRootHostContext(nextRootInstance);
            pop(contextStackCursor$1, fiber);
            push(contextStackCursor$1, nextRootContext, fiber);
          }
          function popHostContainer(fiber) {
            pop(contextStackCursor$1, fiber);
            pop(contextFiberStackCursor, fiber);
            pop(rootInstanceStackCursor, fiber);
          }
          function getHostContext() {
            var context = requiredContext(contextStackCursor$1.current);
            return context;
          }
          function pushHostContext(fiber) {
            var rootInstance = requiredContext(rootInstanceStackCursor.current);
            var context = requiredContext(contextStackCursor$1.current);
            var nextContext = getChildHostContext(context, fiber.type, rootInstance);
            if (context === nextContext) {
              return;
            }
            push(contextFiberStackCursor, fiber, fiber);
            push(contextStackCursor$1, nextContext, fiber);
          }
          function popHostContext(fiber) {
            if (contextFiberStackCursor.current !== fiber) {
              return;
            }
            pop(contextStackCursor$1, fiber);
            pop(contextFiberStackCursor, fiber);
          }
          var DefaultSuspenseContext = 0;
          var SubtreeSuspenseContextMask = 1;
          var InvisibleParentSuspenseContext = 1;
          var ForceSuspenseFallback = 2;
          var suspenseStackCursor = createCursor(DefaultSuspenseContext);
          function hasSuspenseContext(parentContext, flag) {
            return (parentContext & flag) !== 0;
          }
          function setDefaultShallowSuspenseContext(parentContext) {
            return parentContext & SubtreeSuspenseContextMask;
          }
          function setShallowSuspenseContext(parentContext, shallowContext) {
            return parentContext & SubtreeSuspenseContextMask | shallowContext;
          }
          function addSubtreeSuspenseContext(parentContext, subtreeContext) {
            return parentContext | subtreeContext;
          }
          function pushSuspenseContext(fiber, newContext) {
            push(suspenseStackCursor, newContext, fiber);
          }
          function popSuspenseContext(fiber) {
            pop(suspenseStackCursor, fiber);
          }
          function shouldCaptureSuspense(workInProgress2, hasInvisibleParent) {
            var nextState = workInProgress2.memoizedState;
            if (nextState !== null) {
              if (nextState.dehydrated !== null) {
                return true;
              }
              return false;
            }
            var props = workInProgress2.memoizedProps;
            {
              return true;
            }
          }
          function findFirstSuspended(row) {
            var node = row;
            while (node !== null) {
              if (node.tag === SuspenseComponent) {
                var state = node.memoizedState;
                if (state !== null) {
                  var dehydrated = state.dehydrated;
                  if (dehydrated === null || isSuspenseInstancePending(dehydrated) || isSuspenseInstanceFallback(dehydrated)) {
                    return node;
                  }
                }
              } else if (node.tag === SuspenseListComponent && // revealOrder undefined can't be trusted because it don't
              // keep track of whether it suspended or not.
              node.memoizedProps.revealOrder !== void 0) {
                var didSuspend = (node.flags & DidCapture) !== NoFlags;
                if (didSuspend) {
                  return node;
                }
              } else if (node.child !== null) {
                node.child.return = node;
                node = node.child;
                continue;
              }
              if (node === row) {
                return null;
              }
              while (node.sibling === null) {
                if (node.return === null || node.return === row) {
                  return null;
                }
                node = node.return;
              }
              node.sibling.return = node.return;
              node = node.sibling;
            }
            return null;
          }
          var NoFlags$1 = (
            /*   */
            0
          );
          var HasEffect = (
            /* */
            1
          );
          var Insertion = (
            /*  */
            2
          );
          var Layout = (
            /*    */
            4
          );
          var Passive$1 = (
            /*   */
            8
          );
          var workInProgressSources = [];
          function resetWorkInProgressVersions() {
            for (var i = 0; i < workInProgressSources.length; i++) {
              var mutableSource = workInProgressSources[i];
              if (isPrimaryRenderer) {
                mutableSource._workInProgressVersionPrimary = null;
              } else {
                mutableSource._workInProgressVersionSecondary = null;
              }
            }
            workInProgressSources.length = 0;
          }
          function registerMutableSourceForHydration(root, mutableSource) {
            var getVersion = mutableSource._getVersion;
            var version2 = getVersion(mutableSource._source);
            if (root.mutableSourceEagerHydrationData == null) {
              root.mutableSourceEagerHydrationData = [mutableSource, version2];
            } else {
              root.mutableSourceEagerHydrationData.push(mutableSource, version2);
            }
          }
          var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher, ReactCurrentBatchConfig$1 = ReactSharedInternals.ReactCurrentBatchConfig;
          var didWarnAboutMismatchedHooksForComponent;
          var didWarnUncachedGetSnapshot;
          {
            didWarnAboutMismatchedHooksForComponent = /* @__PURE__ */ new Set();
          }
          var renderLanes = NoLanes;
          var currentlyRenderingFiber$1 = null;
          var currentHook = null;
          var workInProgressHook = null;
          var didScheduleRenderPhaseUpdate = false;
          var didScheduleRenderPhaseUpdateDuringThisPass = false;
          var localIdCounter = 0;
          var globalClientIdCounter = 0;
          var RE_RENDER_LIMIT = 25;
          var currentHookNameInDev = null;
          var hookTypesDev = null;
          var hookTypesUpdateIndexDev = -1;
          var ignorePreviousDependencies = false;
          function mountHookTypesDev() {
            {
              var hookName = currentHookNameInDev;
              if (hookTypesDev === null) {
                hookTypesDev = [hookName];
              } else {
                hookTypesDev.push(hookName);
              }
            }
          }
          function updateHookTypesDev() {
            {
              var hookName = currentHookNameInDev;
              if (hookTypesDev !== null) {
                hookTypesUpdateIndexDev++;
                if (hookTypesDev[hookTypesUpdateIndexDev] !== hookName) {
                  warnOnHookMismatchInDev(hookName);
                }
              }
            }
          }
          function checkDepsAreArrayDev(deps) {
            {
              if (deps !== void 0 && deps !== null && !isArray(deps)) {
                error("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", currentHookNameInDev, typeof deps);
              }
            }
          }
          function warnOnHookMismatchInDev(currentHookName) {
            {
              var componentName = getComponentNameFromFiber(currentlyRenderingFiber$1);
              if (!didWarnAboutMismatchedHooksForComponent.has(componentName)) {
                didWarnAboutMismatchedHooksForComponent.add(componentName);
                if (hookTypesDev !== null) {
                  var table = "";
                  var secondColumnStart = 30;
                  for (var i = 0; i <= hookTypesUpdateIndexDev; i++) {
                    var oldHookName = hookTypesDev[i];
                    var newHookName = i === hookTypesUpdateIndexDev ? currentHookName : oldHookName;
                    var row = i + 1 + ". " + oldHookName;
                    while (row.length < secondColumnStart) {
                      row += " ";
                    }
                    row += newHookName + "\n";
                    table += row;
                  }
                  error("React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks\n\n   Previous render            Next render\n   ------------------------------------------------------\n%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n", componentName, table);
                }
              }
            }
          }
          function throwInvalidHookError() {
            throw new Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
          }
          function areHookInputsEqual(nextDeps, prevDeps) {
            {
              if (ignorePreviousDependencies) {
                return false;
              }
            }
            if (prevDeps === null) {
              {
                error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", currentHookNameInDev);
              }
              return false;
            }
            {
              if (nextDeps.length !== prevDeps.length) {
                error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", currentHookNameInDev, "[" + prevDeps.join(", ") + "]", "[" + nextDeps.join(", ") + "]");
              }
            }
            for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
              if (objectIs(nextDeps[i], prevDeps[i])) {
                continue;
              }
              return false;
            }
            return true;
          }
          function renderWithHooks(current2, workInProgress2, Component, props, secondArg, nextRenderLanes) {
            renderLanes = nextRenderLanes;
            currentlyRenderingFiber$1 = workInProgress2;
            {
              hookTypesDev = current2 !== null ? current2._debugHookTypes : null;
              hookTypesUpdateIndexDev = -1;
              ignorePreviousDependencies = current2 !== null && current2.type !== workInProgress2.type;
            }
            workInProgress2.memoizedState = null;
            workInProgress2.updateQueue = null;
            workInProgress2.lanes = NoLanes;
            {
              if (current2 !== null && current2.memoizedState !== null) {
                ReactCurrentDispatcher$1.current = HooksDispatcherOnUpdateInDEV;
              } else if (hookTypesDev !== null) {
                ReactCurrentDispatcher$1.current = HooksDispatcherOnMountWithHookTypesInDEV;
              } else {
                ReactCurrentDispatcher$1.current = HooksDispatcherOnMountInDEV;
              }
            }
            var children = Component(props, secondArg);
            if (didScheduleRenderPhaseUpdateDuringThisPass) {
              var numberOfReRenders = 0;
              do {
                didScheduleRenderPhaseUpdateDuringThisPass = false;
                localIdCounter = 0;
                if (numberOfReRenders >= RE_RENDER_LIMIT) {
                  throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
                }
                numberOfReRenders += 1;
                {
                  ignorePreviousDependencies = false;
                }
                currentHook = null;
                workInProgressHook = null;
                workInProgress2.updateQueue = null;
                {
                  hookTypesUpdateIndexDev = -1;
                }
                ReactCurrentDispatcher$1.current = HooksDispatcherOnRerenderInDEV;
                children = Component(props, secondArg);
              } while (didScheduleRenderPhaseUpdateDuringThisPass);
            }
            ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
            {
              workInProgress2._debugHookTypes = hookTypesDev;
            }
            var didRenderTooFewHooks = currentHook !== null && currentHook.next !== null;
            renderLanes = NoLanes;
            currentlyRenderingFiber$1 = null;
            currentHook = null;
            workInProgressHook = null;
            {
              currentHookNameInDev = null;
              hookTypesDev = null;
              hookTypesUpdateIndexDev = -1;
              if (current2 !== null && (current2.flags & StaticMask) !== (workInProgress2.flags & StaticMask) && // Disable this warning in legacy mode, because legacy Suspense is weird
              // and creates false positives. To make this work in legacy mode, we'd
              // need to mark fibers that commit in an incomplete state, somehow. For
              // now I'll disable the warning that most of the bugs that would trigger
              // it are either exclusive to concurrent mode or exist in both.
              (current2.mode & ConcurrentMode) !== NoMode) {
                error("Internal React error: Expected static flag was missing. Please notify the React team.");
              }
            }
            didScheduleRenderPhaseUpdate = false;
            if (didRenderTooFewHooks) {
              throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
            }
            return children;
          }
          function checkDidRenderIdHook() {
            var didRenderIdHook = localIdCounter !== 0;
            localIdCounter = 0;
            return didRenderIdHook;
          }
          function bailoutHooks(current2, workInProgress2, lanes) {
            workInProgress2.updateQueue = current2.updateQueue;
            if ((workInProgress2.mode & StrictEffectsMode) !== NoMode) {
              workInProgress2.flags &= ~(MountPassiveDev | MountLayoutDev | Passive | Update);
            } else {
              workInProgress2.flags &= ~(Passive | Update);
            }
            current2.lanes = removeLanes(current2.lanes, lanes);
          }
          function resetHooksAfterThrow() {
            ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
            if (didScheduleRenderPhaseUpdate) {
              var hook = currentlyRenderingFiber$1.memoizedState;
              while (hook !== null) {
                var queue = hook.queue;
                if (queue !== null) {
                  queue.pending = null;
                }
                hook = hook.next;
              }
              didScheduleRenderPhaseUpdate = false;
            }
            renderLanes = NoLanes;
            currentlyRenderingFiber$1 = null;
            currentHook = null;
            workInProgressHook = null;
            {
              hookTypesDev = null;
              hookTypesUpdateIndexDev = -1;
              currentHookNameInDev = null;
              isUpdatingOpaqueValueInRenderPhase = false;
            }
            didScheduleRenderPhaseUpdateDuringThisPass = false;
            localIdCounter = 0;
          }
          function mountWorkInProgressHook() {
            var hook = {
              memoizedState: null,
              baseState: null,
              baseQueue: null,
              queue: null,
              next: null
            };
            if (workInProgressHook === null) {
              currentlyRenderingFiber$1.memoizedState = workInProgressHook = hook;
            } else {
              workInProgressHook = workInProgressHook.next = hook;
            }
            return workInProgressHook;
          }
          function updateWorkInProgressHook() {
            var nextCurrentHook;
            if (currentHook === null) {
              var current2 = currentlyRenderingFiber$1.alternate;
              if (current2 !== null) {
                nextCurrentHook = current2.memoizedState;
              } else {
                nextCurrentHook = null;
              }
            } else {
              nextCurrentHook = currentHook.next;
            }
            var nextWorkInProgressHook;
            if (workInProgressHook === null) {
              nextWorkInProgressHook = currentlyRenderingFiber$1.memoizedState;
            } else {
              nextWorkInProgressHook = workInProgressHook.next;
            }
            if (nextWorkInProgressHook !== null) {
              workInProgressHook = nextWorkInProgressHook;
              nextWorkInProgressHook = workInProgressHook.next;
              currentHook = nextCurrentHook;
            } else {
              if (nextCurrentHook === null) {
                throw new Error("Rendered more hooks than during the previous render.");
              }
              currentHook = nextCurrentHook;
              var newHook = {
                memoizedState: currentHook.memoizedState,
                baseState: currentHook.baseState,
                baseQueue: currentHook.baseQueue,
                queue: currentHook.queue,
                next: null
              };
              if (workInProgressHook === null) {
                currentlyRenderingFiber$1.memoizedState = workInProgressHook = newHook;
              } else {
                workInProgressHook = workInProgressHook.next = newHook;
              }
            }
            return workInProgressHook;
          }
          function createFunctionComponentUpdateQueue() {
            return {
              lastEffect: null,
              stores: null
            };
          }
          function basicStateReducer(state, action) {
            return typeof action === "function" ? action(state) : action;
          }
          function mountReducer(reducer, initialArg, init) {
            var hook = mountWorkInProgressHook();
            var initialState;
            if (init !== void 0) {
              initialState = init(initialArg);
            } else {
              initialState = initialArg;
            }
            hook.memoizedState = hook.baseState = initialState;
            var queue = {
              pending: null,
              interleaved: null,
              lanes: NoLanes,
              dispatch: null,
              lastRenderedReducer: reducer,
              lastRenderedState: initialState
            };
            hook.queue = queue;
            var dispatch = queue.dispatch = dispatchReducerAction.bind(null, currentlyRenderingFiber$1, queue);
            return [hook.memoizedState, dispatch];
          }
          function updateReducer(reducer, initialArg, init) {
            var hook = updateWorkInProgressHook();
            var queue = hook.queue;
            if (queue === null) {
              throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
            }
            queue.lastRenderedReducer = reducer;
            var current2 = currentHook;
            var baseQueue = current2.baseQueue;
            var pendingQueue = queue.pending;
            if (pendingQueue !== null) {
              if (baseQueue !== null) {
                var baseFirst = baseQueue.next;
                var pendingFirst = pendingQueue.next;
                baseQueue.next = pendingFirst;
                pendingQueue.next = baseFirst;
              }
              {
                if (current2.baseQueue !== baseQueue) {
                  error("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React.");
                }
              }
              current2.baseQueue = baseQueue = pendingQueue;
              queue.pending = null;
            }
            if (baseQueue !== null) {
              var first = baseQueue.next;
              var newState = current2.baseState;
              var newBaseState = null;
              var newBaseQueueFirst = null;
              var newBaseQueueLast = null;
              var update = first;
              do {
                var updateLane = update.lane;
                if (!isSubsetOfLanes(renderLanes, updateLane)) {
                  var clone = {
                    lane: updateLane,
                    action: update.action,
                    hasEagerState: update.hasEagerState,
                    eagerState: update.eagerState,
                    next: null
                  };
                  if (newBaseQueueLast === null) {
                    newBaseQueueFirst = newBaseQueueLast = clone;
                    newBaseState = newState;
                  } else {
                    newBaseQueueLast = newBaseQueueLast.next = clone;
                  }
                  currentlyRenderingFiber$1.lanes = mergeLanes(currentlyRenderingFiber$1.lanes, updateLane);
                  markSkippedUpdateLanes(updateLane);
                } else {
                  if (newBaseQueueLast !== null) {
                    var _clone = {
                      // This update is going to be committed so we never want uncommit
                      // it. Using NoLane works because 0 is a subset of all bitmasks, so
                      // this will never be skipped by the check above.
                      lane: NoLane,
                      action: update.action,
                      hasEagerState: update.hasEagerState,
                      eagerState: update.eagerState,
                      next: null
                    };
                    newBaseQueueLast = newBaseQueueLast.next = _clone;
                  }
                  if (update.hasEagerState) {
                    newState = update.eagerState;
                  } else {
                    var action = update.action;
                    newState = reducer(newState, action);
                  }
                }
                update = update.next;
              } while (update !== null && update !== first);
              if (newBaseQueueLast === null) {
                newBaseState = newState;
              } else {
                newBaseQueueLast.next = newBaseQueueFirst;
              }
              if (!objectIs(newState, hook.memoizedState)) {
                markWorkInProgressReceivedUpdate();
              }
              hook.memoizedState = newState;
              hook.baseState = newBaseState;
              hook.baseQueue = newBaseQueueLast;
              queue.lastRenderedState = newState;
            }
            var lastInterleaved = queue.interleaved;
            if (lastInterleaved !== null) {
              var interleaved = lastInterleaved;
              do {
                var interleavedLane = interleaved.lane;
                currentlyRenderingFiber$1.lanes = mergeLanes(currentlyRenderingFiber$1.lanes, interleavedLane);
                markSkippedUpdateLanes(interleavedLane);
                interleaved = interleaved.next;
              } while (interleaved !== lastInterleaved);
            } else if (baseQueue === null) {
              queue.lanes = NoLanes;
            }
            var dispatch = queue.dispatch;
            return [hook.memoizedState, dispatch];
          }
          function rerenderReducer(reducer, initialArg, init) {
            var hook = updateWorkInProgressHook();
            var queue = hook.queue;
            if (queue === null) {
              throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
            }
            queue.lastRenderedReducer = reducer;
            var dispatch = queue.dispatch;
            var lastRenderPhaseUpdate = queue.pending;
            var newState = hook.memoizedState;
            if (lastRenderPhaseUpdate !== null) {
              queue.pending = null;
              var firstRenderPhaseUpdate = lastRenderPhaseUpdate.next;
              var update = firstRenderPhaseUpdate;
              do {
                var action = update.action;
                newState = reducer(newState, action);
                update = update.next;
              } while (update !== firstRenderPhaseUpdate);
              if (!objectIs(newState, hook.memoizedState)) {
                markWorkInProgressReceivedUpdate();
              }
              hook.memoizedState = newState;
              if (hook.baseQueue === null) {
                hook.baseState = newState;
              }
              queue.lastRenderedState = newState;
            }
            return [newState, dispatch];
          }
          function mountMutableSource(source, getSnapshot, subscribe) {
            {
              return void 0;
            }
          }
          function updateMutableSource(source, getSnapshot, subscribe) {
            {
              return void 0;
            }
          }
          function mountSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
            var fiber = currentlyRenderingFiber$1;
            var hook = mountWorkInProgressHook();
            var nextSnapshot;
            var isHydrating2 = getIsHydrating();
            if (isHydrating2) {
              if (getServerSnapshot === void 0) {
                throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
              }
              nextSnapshot = getServerSnapshot();
              {
                if (!didWarnUncachedGetSnapshot) {
                  if (nextSnapshot !== getServerSnapshot()) {
                    error("The result of getServerSnapshot should be cached to avoid an infinite loop");
                    didWarnUncachedGetSnapshot = true;
                  }
                }
              }
            } else {
              nextSnapshot = getSnapshot();
              {
                if (!didWarnUncachedGetSnapshot) {
                  var cachedSnapshot = getSnapshot();
                  if (!objectIs(nextSnapshot, cachedSnapshot)) {
                    error("The result of getSnapshot should be cached to avoid an infinite loop");
                    didWarnUncachedGetSnapshot = true;
                  }
                }
              }
              var root = getWorkInProgressRoot();
              if (root === null) {
                throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
              }
              if (!includesBlockingLane(root, renderLanes)) {
                pushStoreConsistencyCheck(fiber, getSnapshot, nextSnapshot);
              }
            }
            hook.memoizedState = nextSnapshot;
            var inst = {
              value: nextSnapshot,
              getSnapshot
            };
            hook.queue = inst;
            mountEffect(subscribeToStore.bind(null, fiber, inst, subscribe), [subscribe]);
            fiber.flags |= Passive;
            pushEffect(HasEffect | Passive$1, updateStoreInstance.bind(null, fiber, inst, nextSnapshot, getSnapshot), void 0, null);
            return nextSnapshot;
          }
          function updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
            var fiber = currentlyRenderingFiber$1;
            var hook = updateWorkInProgressHook();
            var nextSnapshot = getSnapshot();
            {
              if (!didWarnUncachedGetSnapshot) {
                var cachedSnapshot = getSnapshot();
                if (!objectIs(nextSnapshot, cachedSnapshot)) {
                  error("The result of getSnapshot should be cached to avoid an infinite loop");
                  didWarnUncachedGetSnapshot = true;
                }
              }
            }
            var prevSnapshot = hook.memoizedState;
            var snapshotChanged = !objectIs(prevSnapshot, nextSnapshot);
            if (snapshotChanged) {
              hook.memoizedState = nextSnapshot;
              markWorkInProgressReceivedUpdate();
            }
            var inst = hook.queue;
            updateEffect(subscribeToStore.bind(null, fiber, inst, subscribe), [subscribe]);
            if (inst.getSnapshot !== getSnapshot || snapshotChanged || // Check if the susbcribe function changed. We can save some memory by
            // checking whether we scheduled a subscription effect above.
            workInProgressHook !== null && workInProgressHook.memoizedState.tag & HasEffect) {
              fiber.flags |= Passive;
              pushEffect(HasEffect | Passive$1, updateStoreInstance.bind(null, fiber, inst, nextSnapshot, getSnapshot), void 0, null);
              var root = getWorkInProgressRoot();
              if (root === null) {
                throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
              }
              if (!includesBlockingLane(root, renderLanes)) {
                pushStoreConsistencyCheck(fiber, getSnapshot, nextSnapshot);
              }
            }
            return nextSnapshot;
          }
          function pushStoreConsistencyCheck(fiber, getSnapshot, renderedSnapshot) {
            fiber.flags |= StoreConsistency;
            var check = {
              getSnapshot,
              value: renderedSnapshot
            };
            var componentUpdateQueue = currentlyRenderingFiber$1.updateQueue;
            if (componentUpdateQueue === null) {
              componentUpdateQueue = createFunctionComponentUpdateQueue();
              currentlyRenderingFiber$1.updateQueue = componentUpdateQueue;
              componentUpdateQueue.stores = [check];
            } else {
              var stores = componentUpdateQueue.stores;
              if (stores === null) {
                componentUpdateQueue.stores = [check];
              } else {
                stores.push(check);
              }
            }
          }
          function updateStoreInstance(fiber, inst, nextSnapshot, getSnapshot) {
            inst.value = nextSnapshot;
            inst.getSnapshot = getSnapshot;
            if (checkIfSnapshotChanged(inst)) {
              forceStoreRerender(fiber);
            }
          }
          function subscribeToStore(fiber, inst, subscribe) {
            var handleStoreChange = function() {
              if (checkIfSnapshotChanged(inst)) {
                forceStoreRerender(fiber);
              }
            };
            return subscribe(handleStoreChange);
          }
          function checkIfSnapshotChanged(inst) {
            var latestGetSnapshot = inst.getSnapshot;
            var prevValue = inst.value;
            try {
              var nextValue = latestGetSnapshot();
              return !objectIs(prevValue, nextValue);
            } catch (error2) {
              return true;
            }
          }
          function forceStoreRerender(fiber) {
            var root = enqueueConcurrentRenderForLane(fiber, SyncLane);
            if (root !== null) {
              scheduleUpdateOnFiber(root, fiber, SyncLane, NoTimestamp);
            }
          }
          function mountState(initialState) {
            var hook = mountWorkInProgressHook();
            if (typeof initialState === "function") {
              initialState = initialState();
            }
            hook.memoizedState = hook.baseState = initialState;
            var queue = {
              pending: null,
              interleaved: null,
              lanes: NoLanes,
              dispatch: null,
              lastRenderedReducer: basicStateReducer,
              lastRenderedState: initialState
            };
            hook.queue = queue;
            var dispatch = queue.dispatch = dispatchSetState.bind(null, currentlyRenderingFiber$1, queue);
            return [hook.memoizedState, dispatch];
          }
          function updateState(initialState) {
            return updateReducer(basicStateReducer);
          }
          function rerenderState(initialState) {
            return rerenderReducer(basicStateReducer);
          }
          function pushEffect(tag, create, destroy, deps) {
            var effect = {
              tag,
              create,
              destroy,
              deps,
              // Circular
              next: null
            };
            var componentUpdateQueue = currentlyRenderingFiber$1.updateQueue;
            if (componentUpdateQueue === null) {
              componentUpdateQueue = createFunctionComponentUpdateQueue();
              currentlyRenderingFiber$1.updateQueue = componentUpdateQueue;
              componentUpdateQueue.lastEffect = effect.next = effect;
            } else {
              var lastEffect = componentUpdateQueue.lastEffect;
              if (lastEffect === null) {
                componentUpdateQueue.lastEffect = effect.next = effect;
              } else {
                var firstEffect = lastEffect.next;
                lastEffect.next = effect;
                effect.next = firstEffect;
                componentUpdateQueue.lastEffect = effect;
              }
            }
            return effect;
          }
          function mountRef(initialValue) {
            var hook = mountWorkInProgressHook();
            {
              var _ref2 = {
                current: initialValue
              };
              hook.memoizedState = _ref2;
              return _ref2;
            }
          }
          function updateRef(initialValue) {
            var hook = updateWorkInProgressHook();
            return hook.memoizedState;
          }
          function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
            var hook = mountWorkInProgressHook();
            var nextDeps = deps === void 0 ? null : deps;
            currentlyRenderingFiber$1.flags |= fiberFlags;
            hook.memoizedState = pushEffect(HasEffect | hookFlags, create, void 0, nextDeps);
          }
          function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
            var hook = updateWorkInProgressHook();
            var nextDeps = deps === void 0 ? null : deps;
            var destroy = void 0;
            if (currentHook !== null) {
              var prevEffect = currentHook.memoizedState;
              destroy = prevEffect.destroy;
              if (nextDeps !== null) {
                var prevDeps = prevEffect.deps;
                if (areHookInputsEqual(nextDeps, prevDeps)) {
                  hook.memoizedState = pushEffect(hookFlags, create, destroy, nextDeps);
                  return;
                }
              }
            }
            currentlyRenderingFiber$1.flags |= fiberFlags;
            hook.memoizedState = pushEffect(HasEffect | hookFlags, create, destroy, nextDeps);
          }
          function mountEffect(create, deps) {
            if ((currentlyRenderingFiber$1.mode & StrictEffectsMode) !== NoMode) {
              return mountEffectImpl(MountPassiveDev | Passive | PassiveStatic, Passive$1, create, deps);
            } else {
              return mountEffectImpl(Passive | PassiveStatic, Passive$1, create, deps);
            }
          }
          function updateEffect(create, deps) {
            return updateEffectImpl(Passive, Passive$1, create, deps);
          }
          function mountInsertionEffect(create, deps) {
            return mountEffectImpl(Update, Insertion, create, deps);
          }
          function updateInsertionEffect(create, deps) {
            return updateEffectImpl(Update, Insertion, create, deps);
          }
          function mountLayoutEffect(create, deps) {
            var fiberFlags = Update;
            {
              fiberFlags |= LayoutStatic;
            }
            if ((currentlyRenderingFiber$1.mode & StrictEffectsMode) !== NoMode) {
              fiberFlags |= MountLayoutDev;
            }
            return mountEffectImpl(fiberFlags, Layout, create, deps);
          }
          function updateLayoutEffect(create, deps) {
            return updateEffectImpl(Update, Layout, create, deps);
          }
          function imperativeHandleEffect(create, ref) {
            if (typeof ref === "function") {
              var refCallback = ref;
              var _inst = create();
              refCallback(_inst);
              return function() {
                refCallback(null);
              };
            } else if (ref !== null && ref !== void 0) {
              var refObject = ref;
              {
                if (!refObject.hasOwnProperty("current")) {
                  error("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(refObject).join(", ") + "}");
                }
              }
              var _inst2 = create();
              refObject.current = _inst2;
              return function() {
                refObject.current = null;
              };
            }
          }
          function mountImperativeHandle(ref, create, deps) {
            {
              if (typeof create !== "function") {
                error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", create !== null ? typeof create : "null");
              }
            }
            var effectDeps = deps !== null && deps !== void 0 ? deps.concat([ref]) : null;
            var fiberFlags = Update;
            {
              fiberFlags |= LayoutStatic;
            }
            if ((currentlyRenderingFiber$1.mode & StrictEffectsMode) !== NoMode) {
              fiberFlags |= MountLayoutDev;
            }
            return mountEffectImpl(fiberFlags, Layout, imperativeHandleEffect.bind(null, create, ref), effectDeps);
          }
          function updateImperativeHandle(ref, create, deps) {
            {
              if (typeof create !== "function") {
                error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", create !== null ? typeof create : "null");
              }
            }
            var effectDeps = deps !== null && deps !== void 0 ? deps.concat([ref]) : null;
            return updateEffectImpl(Update, Layout, imperativeHandleEffect.bind(null, create, ref), effectDeps);
          }
          function mountDebugValue(value, formatterFn) {
          }
          var updateDebugValue = mountDebugValue;
          function mountCallback(callback, deps) {
            var hook = mountWorkInProgressHook();
            var nextDeps = deps === void 0 ? null : deps;
            hook.memoizedState = [callback, nextDeps];
            return callback;
          }
          function updateCallback(callback, deps) {
            var hook = updateWorkInProgressHook();
            var nextDeps = deps === void 0 ? null : deps;
            var prevState = hook.memoizedState;
            if (prevState !== null) {
              if (nextDeps !== null) {
                var prevDeps = prevState[1];
                if (areHookInputsEqual(nextDeps, prevDeps)) {
                  return prevState[0];
                }
              }
            }
            hook.memoizedState = [callback, nextDeps];
            return callback;
          }
          function mountMemo(nextCreate, deps) {
            var hook = mountWorkInProgressHook();
            var nextDeps = deps === void 0 ? null : deps;
            var nextValue = nextCreate();
            hook.memoizedState = [nextValue, nextDeps];
            return nextValue;
          }
          function updateMemo(nextCreate, deps) {
            var hook = updateWorkInProgressHook();
            var nextDeps = deps === void 0 ? null : deps;
            var prevState = hook.memoizedState;
            if (prevState !== null) {
              if (nextDeps !== null) {
                var prevDeps = prevState[1];
                if (areHookInputsEqual(nextDeps, prevDeps)) {
                  return prevState[0];
                }
              }
            }
            var nextValue = nextCreate();
            hook.memoizedState = [nextValue, nextDeps];
            return nextValue;
          }
          function mountDeferredValue(value) {
            var hook = mountWorkInProgressHook();
            hook.memoizedState = value;
            return value;
          }
          function updateDeferredValue(value) {
            var hook = updateWorkInProgressHook();
            var resolvedCurrentHook = currentHook;
            var prevValue = resolvedCurrentHook.memoizedState;
            return updateDeferredValueImpl(hook, prevValue, value);
          }
          function rerenderDeferredValue(value) {
            var hook = updateWorkInProgressHook();
            if (currentHook === null) {
              hook.memoizedState = value;
              return value;
            } else {
              var prevValue = currentHook.memoizedState;
              return updateDeferredValueImpl(hook, prevValue, value);
            }
          }
          function updateDeferredValueImpl(hook, prevValue, value) {
            var shouldDeferValue = !includesOnlyNonUrgentLanes(renderLanes);
            if (shouldDeferValue) {
              if (!objectIs(value, prevValue)) {
                var deferredLane = claimNextTransitionLane();
                currentlyRenderingFiber$1.lanes = mergeLanes(currentlyRenderingFiber$1.lanes, deferredLane);
                markSkippedUpdateLanes(deferredLane);
                hook.baseState = true;
              }
              return prevValue;
            } else {
              if (hook.baseState) {
                hook.baseState = false;
                markWorkInProgressReceivedUpdate();
              }
              hook.memoizedState = value;
              return value;
            }
          }
          function startTransition(setPending, callback, options) {
            var previousPriority = getCurrentUpdatePriority();
            setCurrentUpdatePriority(higherEventPriority(previousPriority, ContinuousEventPriority));
            setPending(true);
            var prevTransition = ReactCurrentBatchConfig$1.transition;
            ReactCurrentBatchConfig$1.transition = {};
            var currentTransition = ReactCurrentBatchConfig$1.transition;
            {
              ReactCurrentBatchConfig$1.transition._updatedFibers = /* @__PURE__ */ new Set();
            }
            try {
              setPending(false);
              callback();
            } finally {
              setCurrentUpdatePriority(previousPriority);
              ReactCurrentBatchConfig$1.transition = prevTransition;
              {
                if (prevTransition === null && currentTransition._updatedFibers) {
                  var updatedFibersCount = currentTransition._updatedFibers.size;
                  if (updatedFibersCount > 10) {
                    warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.");
                  }
                  currentTransition._updatedFibers.clear();
                }
              }
            }
          }
          function mountTransition() {
            var _mountState = mountState(false), isPending = _mountState[0], setPending = _mountState[1];
            var start = startTransition.bind(null, setPending);
            var hook = mountWorkInProgressHook();
            hook.memoizedState = start;
            return [isPending, start];
          }
          function updateTransition() {
            var _updateState = updateState(), isPending = _updateState[0];
            var hook = updateWorkInProgressHook();
            var start = hook.memoizedState;
            return [isPending, start];
          }
          function rerenderTransition() {
            var _rerenderState = rerenderState(), isPending = _rerenderState[0];
            var hook = updateWorkInProgressHook();
            var start = hook.memoizedState;
            return [isPending, start];
          }
          var isUpdatingOpaqueValueInRenderPhase = false;
          function getIsUpdatingOpaqueValueInRenderPhaseInDEV() {
            {
              return isUpdatingOpaqueValueInRenderPhase;
            }
          }
          function mountId() {
            var hook = mountWorkInProgressHook();
            var root = getWorkInProgressRoot();
            var identifierPrefix = root.identifierPrefix;
            var id;
            if (getIsHydrating()) {
              var treeId = getTreeId();
              id = ":" + identifierPrefix + "R" + treeId;
              var localId = localIdCounter++;
              if (localId > 0) {
                id += "H" + localId.toString(32);
              }
              id += ":";
            } else {
              var globalClientId = globalClientIdCounter++;
              id = ":" + identifierPrefix + "r" + globalClientId.toString(32) + ":";
            }
            hook.memoizedState = id;
            return id;
          }
          function updateId() {
            var hook = updateWorkInProgressHook();
            var id = hook.memoizedState;
            return id;
          }
          function dispatchReducerAction(fiber, queue, action) {
            {
              if (typeof arguments[3] === "function") {
                error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
              }
            }
            var lane = requestUpdateLane(fiber);
            var update = {
              lane,
              action,
              hasEagerState: false,
              eagerState: null,
              next: null
            };
            if (isRenderPhaseUpdate(fiber)) {
              enqueueRenderPhaseUpdate(queue, update);
            } else {
              var root = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
              if (root !== null) {
                var eventTime = requestEventTime();
                scheduleUpdateOnFiber(root, fiber, lane, eventTime);
                entangleTransitionUpdate(root, queue, lane);
              }
            }
            markUpdateInDevTools(fiber, lane);
          }
          function dispatchSetState(fiber, queue, action) {
            {
              if (typeof arguments[3] === "function") {
                error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
              }
            }
            var lane = requestUpdateLane(fiber);
            var update = {
              lane,
              action,
              hasEagerState: false,
              eagerState: null,
              next: null
            };
            if (isRenderPhaseUpdate(fiber)) {
              enqueueRenderPhaseUpdate(queue, update);
            } else {
              var alternate = fiber.alternate;
              if (fiber.lanes === NoLanes && (alternate === null || alternate.lanes === NoLanes)) {
                var lastRenderedReducer = queue.lastRenderedReducer;
                if (lastRenderedReducer !== null) {
                  var prevDispatcher;
                  {
                    prevDispatcher = ReactCurrentDispatcher$1.current;
                    ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
                  }
                  try {
                    var currentState = queue.lastRenderedState;
                    var eagerState = lastRenderedReducer(currentState, action);
                    update.hasEagerState = true;
                    update.eagerState = eagerState;
                    if (objectIs(eagerState, currentState)) {
                      enqueueConcurrentHookUpdateAndEagerlyBailout(fiber, queue, update, lane);
                      return;
                    }
                  } catch (error2) {
                  } finally {
                    {
                      ReactCurrentDispatcher$1.current = prevDispatcher;
                    }
                  }
                }
              }
              var root = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
              if (root !== null) {
                var eventTime = requestEventTime();
                scheduleUpdateOnFiber(root, fiber, lane, eventTime);
                entangleTransitionUpdate(root, queue, lane);
              }
            }
            markUpdateInDevTools(fiber, lane);
          }
          function isRenderPhaseUpdate(fiber) {
            var alternate = fiber.alternate;
            return fiber === currentlyRenderingFiber$1 || alternate !== null && alternate === currentlyRenderingFiber$1;
          }
          function enqueueRenderPhaseUpdate(queue, update) {
            didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = true;
            var pending = queue.pending;
            if (pending === null) {
              update.next = update;
            } else {
              update.next = pending.next;
              pending.next = update;
            }
            queue.pending = update;
          }
          function entangleTransitionUpdate(root, queue, lane) {
            if (isTransitionLane(lane)) {
              var queueLanes = queue.lanes;
              queueLanes = intersectLanes(queueLanes, root.pendingLanes);
              var newQueueLanes = mergeLanes(queueLanes, lane);
              queue.lanes = newQueueLanes;
              markRootEntangled(root, newQueueLanes);
            }
          }
          function markUpdateInDevTools(fiber, lane, action) {
            {
              markStateUpdateScheduled(fiber, lane);
            }
          }
          var ContextOnlyDispatcher = {
            readContext,
            useCallback: throwInvalidHookError,
            useContext: throwInvalidHookError,
            useEffect: throwInvalidHookError,
            useImperativeHandle: throwInvalidHookError,
            useInsertionEffect: throwInvalidHookError,
            useLayoutEffect: throwInvalidHookError,
            useMemo: throwInvalidHookError,
            useReducer: throwInvalidHookError,
            useRef: throwInvalidHookError,
            useState: throwInvalidHookError,
            useDebugValue: throwInvalidHookError,
            useDeferredValue: throwInvalidHookError,
            useTransition: throwInvalidHookError,
            useMutableSource: throwInvalidHookError,
            useSyncExternalStore: throwInvalidHookError,
            useId: throwInvalidHookError,
            unstable_isNewReconciler: enableNewReconciler
          };
          var HooksDispatcherOnMountInDEV = null;
          var HooksDispatcherOnMountWithHookTypesInDEV = null;
          var HooksDispatcherOnUpdateInDEV = null;
          var HooksDispatcherOnRerenderInDEV = null;
          var InvalidNestedHooksDispatcherOnMountInDEV = null;
          var InvalidNestedHooksDispatcherOnUpdateInDEV = null;
          var InvalidNestedHooksDispatcherOnRerenderInDEV = null;
          {
            var warnInvalidContextAccess = function() {
              error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
            };
            var warnInvalidHookAccess = function() {
              error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
            };
            HooksDispatcherOnMountInDEV = {
              readContext: function(context) {
                return readContext(context);
              },
              useCallback: function(callback, deps) {
                currentHookNameInDev = "useCallback";
                mountHookTypesDev();
                checkDepsAreArrayDev(deps);
                return mountCallback(callback, deps);
              },
              useContext: function(context) {
                currentHookNameInDev = "useContext";
                mountHookTypesDev();
                return readContext(context);
              },
              useEffect: function(create, deps) {
                currentHookNameInDev = "useEffect";
                mountHookTypesDev();
                checkDepsAreArrayDev(deps);
                return mountEffect(create, deps);
              },
              useImperativeHandle: function(ref, create, deps) {
                currentHookNameInDev = "useImperativeHandle";
                mountHookTypesDev();
                checkDepsAreArrayDev(deps);
                return mountImperativeHandle(ref, create, deps);
              },
              useInsertionEffect: function(create, deps) {
                currentHookNameInDev = "useInsertionEffect";
                mountHookTypesDev();
                checkDepsAreArrayDev(deps);
                return mountInsertionEffect(create, deps);
              },
              useLayoutEffect: function(create, deps) {
                currentHookNameInDev = "useLayoutEffect";
                mountHookTypesDev();
                checkDepsAreArrayDev(deps);
                return mountLayoutEffect(create, deps);
              },
              useMemo: function(create, deps) {
                currentHookNameInDev = "useMemo";
                mountHookTypesDev();
                checkDepsAreArrayDev(deps);
                var prevDispatcher = ReactCurrentDispatcher$1.current;
                ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
                try {
                  return mountMemo(create, deps);
                } finally {
                  ReactCurrentDispatcher$1.current = prevDispatcher;
                }
              },
              useReducer: function(reducer, initialArg, init) {
                currentHookNameInDev = "useReducer";
                mountHookTypesDev();
                var prevDispatcher = ReactCurrentDispatcher$1.current;
                ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
                try {
                  return mountReducer(reducer, initialArg, init);
                } finally {
                  ReactCurrentDispatcher$1.current = prevDispatcher;
                }
              },
              useRef: function(initialValue) {
                currentHookNameInDev = "useRef";
                mountHookTypesDev();
                return mountRef(initialValue);
              },
              useState: function(initialState) {
                currentHookNameInDev = "useState";
                mountHookTypesDev();
                var prevDispatcher = ReactCurrentDispatcher$1.current;
                ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
                try {
                  return mountState(initialState);
                } finally {
                  ReactCurrentDispatcher$1.current = prevDispatcher;
                }
              },
              useDebugValue: function(value, formatterFn) {
                currentHookNameInDev = "useDebugValue";
                mountHookTypesDev();
                return mountDebugValue();
              },
              useDeferredValue: function(value) {
                currentHookNameInDev = "useDeferredValue";
                mountHookTypesDev();
                return mountDeferredValue(value);
              },
              useTransition: function() {
                currentHookNameInDev = "useTransition";
                mountHookTypesDev();
                return mountTransition();
              },
              useMutableSource: function(source, getSnapshot, subscribe) {
                currentHookNameInDev = "useMutableSource";
                mountHookTypesDev();
                return mountMutableSource();
              },
              useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
                currentHookNameInDev = "useSyncExternalStore";
                mountHookTypesDev();
                return mountSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
              },
              useId: function() {
                currentHookNameInDev = "useId";
                mountHookTypesDev();
                return mountId();
              },
              unstable_isNewReconciler: enableNewReconciler
            };
            HooksDispatcherOnMountWithHookTypesInDEV = {
              readContext: function(context) {
                return readContext(context);
              },
              useCallback: function(callback, deps) {
                currentHookNameInDev = "useCallback";
                updateHookTypesDev();
                return mountCallback(callback, deps);
              },
              useContext: function(context) {
                currentHookNameInDev = "useContext";
                updateHookTypesDev();
                return readContext(context);
              },
              useEffect: function(create, deps) {
                currentHookNameInDev = "useEffect";
                updateHookTypesDev();
                return mountEffect(create, deps);
              },
              useImperativeHandle: function(ref, create, deps) {
                currentHookNameInDev = "useImperativeHandle";
                updateHookTypesDev();
                return mountImperativeHandle(ref, create, deps);
              },
              useInsertionEffect: function(create, deps) {
                currentHookNameInDev = "useInsertionEffect";
                updateHookTypesDev();
                return mountInsertionEffect(create, deps);
              },
              useLayoutEffect: function(create, deps) {
                currentHookNameInDev = "useLayoutEffect";
                updateHookTypesDev();
                return mountLayoutEffect(create, deps);
              },
              useMemo: function(create, deps) {
                currentHookNameInDev = "useMemo";
                updateHookTypesDev();
                var prevDispatcher = ReactCurrentDispatcher$1.current;
                ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
                try {
                  return mountMemo(create, deps);
                } finally {
                  ReactCurrentDispatcher$1.current = prevDispatcher;
                }
              },
              useReducer: function(reducer, initialArg, init) {
                currentHookNameInDev = "useReducer";
                updateHookTypesDev();
                var prevDispatcher = ReactCurrentDispatcher$1.current;
                ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
                try {
                  return mountReducer(reducer, initialArg, init);
                } finally {
                  ReactCurrentDispatcher$1.current = prevDispatcher;
                }
              },
              useRef: function(initialValue) {
                currentHookNameInDev = "useRef";
                updateHookTypesDev();
                return mountRef(initialValue);
              },
              useState: function(initialState) {
                currentHookNameInDev = "useState";
                updateHookTypesDev();
                var prevDispatcher = ReactCurrentDispatcher$1.current;
                ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
                try {
                  return mountState(initialState);
                } finally {
                  ReactCurrentDispatcher$1.current = prevDispatcher;
                }
              },
              useDebugValue: function(value, formatterFn) {
                currentHookNameInDev = "useDebugValue";
                updateHookTypesDev();
                return mountDebugValue();
              },
              useDeferredValue: function(value) {
                currentHookNameInDev = "useDeferredValue";
                updateHookTypesDev();
                return mountDeferredValue(value);
              },
              useTransition: function() {
                currentHookNameInDev = "useTransition";
                updateHookTypesDev();
                return mountTransition();
              },
              useMutableSource: function(source, getSnapshot, subscribe) {
                currentHookNameInDev = "useMutableSource";
                updateHookTypesDev();
                return mountMutableSource();
              },
              useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
                currentHookNameInDev = "useSyncExternalStore";
                updateHookTypesDev();
                return mountSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
              },
              useId: function() {
                currentHookNameInDev = "useId";
                updateHookTypesDev();
                return mountId();
              },
              unstable_isNewReconciler: enableNewReconciler
            };
            HooksDispatcherOnUpdateInDEV = {
              readContext: function(context) {
                return readContext(context);
              },
              useCallback: function(callback, deps) {
                currentHookNameInDev = "useCallback";
                updateHookTypesDev();
                return updateCallback(callback, deps);
              },
              useContext: function(context) {
                currentHookNameInDev = "useContext";
                updateHookTypesDev();
                return readContext(context);
              },
              useEffect: function(create, deps) {
                currentHookNameInDev = "useEffect";
                updateHookTypesDev();
                return updateEffect(create, deps);
              },
              useImperativeHandle: function(ref, create, deps) {
                currentHookNameInDev = "useImperativeHandle";
                updateHookTypesDev();
                return updateImperativeHandle(ref, create, deps);
              },
              useInsertionEffect: function(create, deps) {
                currentHookNameInDev = "useInsertionEffect";
                updateHookTypesDev();
                return updateInsertionEffect(create, deps);
              },
              useLayoutEffect: function(create, deps) {
                currentHookNameInDev = "useLayoutEffect";
                updateHookTypesDev();
                return updateLayoutEffect(create, deps);
              },
              useMemo: function(create, deps) {
                currentHookNameInDev = "useMemo";
                updateHookTypesDev();
                var prevDispatcher = ReactCurrentDispatcher$1.current;
                ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
                try {
                  return updateMemo(create, deps);
                } finally {
                  ReactCurrentDispatcher$1.current = prevDispatcher;
                }
              },
              useReducer: function(reducer, initialArg, init) {
                currentHookNameInDev = "useReducer";
                updateHookTypesDev();
                var prevDispatcher = ReactCurrentDispatcher$1.current;
                ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
                try {
                  return updateReducer(reducer, initialArg, init);
                } finally {
                  ReactCurrentDispatcher$1.current = prevDispatcher;
                }
              },
              useRef: function(initialValue) {
                currentHookNameInDev = "useRef";
                updateHookTypesDev();
                return updateRef();
              },
              useState: function(initialState) {
                currentHookNameInDev = "useState";
                updateHookTypesDev();
                var prevDispatcher = ReactCurrentDispatcher$1.current;
                ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
                try {
                  return updateState(initialState);
                } finally {
                  ReactCurrentDispatcher$1.current = prevDispatcher;
                }
              },
              useDebugValue: function(value, formatterFn) {
                currentHookNameInDev = "useDebugValue";
                updateHookTypesDev();
                return updateDebugValue();
              },
              useDeferredValue: function(value) {
                currentHookNameInDev = "useDeferredValue";
                updateHookTypesDev();
                return updateDeferredValue(value);
              },
              useTransition: function() {
                currentHookNameInDev = "useTransition";
                updateHookTypesDev();
                return updateTransition();
              },
              useMutableSource: function(source, getSnapshot, subscribe) {
                currentHookNameInDev = "useMutableSource";
                updateHookTypesDev();
                return updateMutableSource();
              },
              useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
                currentHookNameInDev = "useSyncExternalStore";
                updateHookTypesDev();
                return updateSyncExternalStore(subscribe, getSnapshot);
              },
              useId: function() {
                currentHookNameInDev = "useId";
                updateHookTypesDev();
                return updateId();
              },
              unstable_isNewReconciler: enableNewReconciler
            };
            HooksDispatcherOnRerenderInDEV = {
              readContext: function(context) {
                return readContext(context);
              },
              useCallback: function(callback, deps) {
                currentHookNameInDev = "useCallback";
                updateHookTypesDev();
                return updateCallback(callback, deps);
              },
              useContext: function(context) {
                currentHookNameInDev = "useContext";
                updateHookTypesDev();
                return readContext(context);
              },
              useEffect: function(create, deps) {
                currentHookNameInDev = "useEffect";
                updateHookTypesDev();
                return updateEffect(create, deps);
              },
              useImperativeHandle: function(ref, create, deps) {
                currentHookNameInDev = "useImperativeHandle";
                updateHookTypesDev();
                return updateImperativeHandle(ref, create, deps);
              },
              useInsertionEffect: function(create, deps) {
                currentHookNameInDev = "useInsertionEffect";
                updateHookTypesDev();
                return updateInsertionEffect(create, deps);
              },
              useLayoutEffect: function(create, deps) {
                currentHookNameInDev = "useLayoutEffect";
                updateHookTypesDev();
                return updateLayoutEffect(create, deps);
              },
              useMemo: function(create, deps) {
                currentHookNameInDev = "useMemo";
                updateHookTypesDev();
                var prevDispatcher = ReactCurrentDispatcher$1.current;
                ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnRerenderInDEV;
                try {
                  return updateMemo(create, deps);
                } finally {
                  ReactCurrentDispatcher$1.current = prevDispatcher;
                }
              },
              useReducer: function(reducer, initialArg, init) {
                currentHookNameInDev = "useReducer";
                updateHookTypesDev();
                var prevDispatcher = ReactCurrentDispatcher$1.current;
                ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnRerenderInDEV;
                try {
                  return rerenderReducer(reducer, initialArg, init);
                } finally {
                  ReactCurrentDispatcher$1.current = prevDispatcher;
                }
              },
              useRef: function(initialValue) {
                currentHookNameInDev = "useRef";
                updateHookTypesDev();
                return updateRef();
              },
              useState: function(initialState) {
                currentHookNameInDev = "useState";
                updateHookTypesDev();
                var prevDispatcher = ReactCurrentDispatcher$1.current;
                ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnRerenderInDEV;
                try {
                  return rerenderState(initialState);
                } finally {
                  ReactCurrentDispatcher$1.current = prevDispatcher;
                }
              },
              useDebugValue: function(value, formatterFn) {
                currentHookNameInDev = "useDebugValue";
                updateHookTypesDev();
                return updateDebugValue();
              },
              useDeferredValue: function(value) {
                currentHookNameInDev = "useDeferredValue";
                updateHookTypesDev();
                return rerenderDeferredValue(value);
              },
              useTransition: function() {
                currentHookNameInDev = "useTransition";
                updateHookTypesDev();
                return rerenderTransition();
              },
              useMutableSource: function(source, getSnapshot, subscribe) {
                currentHookNameInDev = "useMutableSource";
                updateHookTypesDev();
                return updateMutableSource();
              },
              useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
                currentHookNameInDev = "useSyncExternalStore";
                updateHookTypesDev();
                return updateSyncExternalStore(subscribe, getSnapshot);
              },
              useId: function() {
                currentHookNameInDev = "useId";
                updateHookTypesDev();
                return updateId();
              },
              unstable_isNewReconciler: enableNewReconciler
            };
            InvalidNestedHooksDispatcherOnMountInDEV = {
              readContext: function(context) {
                warnInvalidContextAccess();
                return readContext(context);
              },
              useCallback: function(callback, deps) {
                currentHookNameInDev = "useCallback";
                warnInvalidHookAccess();
                mountHookTypesDev();
                return mountCallback(callback, deps);
              },
              useContext: function(context) {
                currentHookNameInDev = "useContext";
                warnInvalidHookAccess();
                mountHookTypesDev();
                return readContext(context);
              },
              useEffect: function(create, deps) {
                currentHookNameInDev = "useEffect";
                warnInvalidHookAccess();
                mountHookTypesDev();
                return mountEffect(create, deps);
              },
              useImperativeHandle: function(ref, create, deps) {
                currentHookNameInDev = "useImperativeHandle";
                warnInvalidHookAccess();
                mountHookTypesDev();
                return mountImperativeHandle(ref, create, deps);
              },
              useInsertionEffect: function(create, deps) {
                currentHookNameInDev = "useInsertionEffect";
                warnInvalidHookAccess();
                mountHookTypesDev();
                return mountInsertionEffect(create, deps);
              },
              useLayoutEffect: function(create, deps) {
                currentHookNameInDev = "useLayoutEffect";
                warnInvalidHookAccess();
                mountHookTypesDev();
                return mountLayoutEffect(create, deps);
              },
              useMemo: function(create, deps) {
                currentHookNameInDev = "useMemo";
                warnInvalidHookAccess();
                mountHookTypesDev();
                var prevDispatcher = ReactCurrentDispatcher$1.current;
                ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
                try {
                  return mountMemo(create, deps);
                } finally {
                  ReactCurrentDispatcher$1.current = prevDispatcher;
                }
              },
              useReducer: function(reducer, initialArg, init) {
                currentHookNameInDev = "useReducer";
                warnInvalidHookAccess();
                mountHookTypesDev();
                var prevDispatcher = ReactCurrentDispatcher$1.current;
                ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
                try {
                  return mountReducer(reducer, initialArg, init);
                } finally {
                  ReactCurrentDispatcher$1.current = prevDispatcher;
                }
              },
              useRef: function(initialValue) {
                currentHookNameInDev = "useRef";
                warnInvalidHookAccess();
                mountHookTypesDev();
                return mountRef(initialValue);
              },
              useState: function(initialState) {
                currentHookNameInDev = "useState";
                warnInvalidHookAccess();
                mountHookTypesDev();
                var prevDispatcher = ReactCurrentDispatcher$1.current;
                ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
                try {
                  return mountState(initialState);
                } finally {
                  ReactCurrentDispatcher$1.current = prevDispatcher;
                }
              },
              useDebugValue: function(value, formatterFn) {
                currentHookNameInDev = "useDebugValue";
                warnInvalidHookAccess();
                mountHookTypesDev();
                return mountDebugValue();
              },
              useDeferredValue: function(value) {
                currentHookNameInDev = "useDeferredValue";
                warnInvalidHookAccess();
                mountHookTypesDev();
                return mountDeferredValue(value);
              },
              useTransition: function() {
                currentHookNameInDev = "useTransition";
                warnInvalidHookAccess();
                mountHookTypesDev();
                return mountTransition();
              },
              useMutableSource: function(source, getSnapshot, subscribe) {
                currentHookNameInDev = "useMutableSource";
                warnInvalidHookAccess();
                mountHookTypesDev();
                return mountMutableSource();
              },
              useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
                currentHookNameInDev = "useSyncExternalStore";
                warnInvalidHookAccess();
                mountHookTypesDev();
                return mountSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
              },
              useId: function() {
                currentHookNameInDev = "useId";
                warnInvalidHookAccess();
                mountHookTypesDev();
                return mountId();
              },
              unstable_isNewReconciler: enableNewReconciler
            };
            InvalidNestedHooksDispatcherOnUpdateInDEV = {
              readContext: function(context) {
                warnInvalidContextAccess();
                return readContext(context);
              },
              useCallback: function(callback, deps) {
                currentHookNameInDev = "useCallback";
                warnInvalidHookAccess();
                updateHookTypesDev();
                return updateCallback(callback, deps);
              },
              useContext: function(context) {
                currentHookNameInDev = "useContext";
                warnInvalidHookAccess();
                updateHookTypesDev();
                return readContext(context);
              },
              useEffect: function(create, deps) {
                currentHookNameInDev = "useEffect";
                warnInvalidHookAccess();
                updateHookTypesDev();
                return updateEffect(create, deps);
              },
              useImperativeHandle: function(ref, create, deps) {
                currentHookNameInDev = "useImperativeHandle";
                warnInvalidHookAccess();
                updateHookTypesDev();
                return updateImperativeHandle(ref, create, deps);
              },
              useInsertionEffect: function(create, deps) {
                currentHookNameInDev = "useInsertionEffect";
                warnInvalidHookAccess();
                updateHookTypesDev();
                return updateInsertionEffect(create, deps);
              },
              useLayoutEffect: function(create, deps) {
                currentHookNameInDev = "useLayoutEffect";
                warnInvalidHookAccess();
                updateHookTypesDev();
                return updateLayoutEffect(create, deps);
              },
              useMemo: function(create, deps) {
                currentHookNameInDev = "useMemo";
                warnInvalidHookAccess();
                updateHookTypesDev();
                var prevDispatcher = ReactCurrentDispatcher$1.current;
                ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
                try {
                  return updateMemo(create, deps);
                } finally {
                  ReactCurrentDispatcher$1.current = prevDispatcher;
                }
              },
              useReducer: function(reducer, initialArg, init) {
                currentHookNameInDev = "useReducer";
                warnInvalidHookAccess();
                updateHookTypesDev();
                var prevDispatcher = ReactCurrentDispatcher$1.current;
                ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
                try {
                  return updateReducer(reducer, initialArg, init);
                } finally {
                  ReactCurrentDispatcher$1.current = prevDispatcher;
                }
              },
              useRef: function(initialValue) {
                currentHookNameInDev = "useRef";
                warnInvalidHookAccess();
                updateHookTypesDev();
                return updateRef();
              },
              useState: function(initialState) {
                currentHookNameInDev = "useState";
                warnInvalidHookAccess();
                updateHookTypesDev();
                var prevDispatcher = ReactCurrentDispatcher$1.current;
                ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
                try {
                  return updateState(initialState);
                } finally {
                  ReactCurrentDispatcher$1.current = prevDispatcher;
                }
              },
              useDebugValue: function(value, formatterFn) {
                currentHookNameInDev = "useDebugValue";
                warnInvalidHookAccess();
                updateHookTypesDev();
                return updateDebugValue();
              },
              useDeferredValue: function(value) {
                currentHookNameInDev = "useDeferredValue";
                warnInvalidHookAccess();
                updateHookTypesDev();
                return updateDeferredValue(value);
              },
              useTransition: function() {
                currentHookNameInDev = "useTransition";
                warnInvalidHookAccess();
                updateHookTypesDev();
                return updateTransition();
              },
              useMutableSource: function(source, getSnapshot, subscribe) {
                currentHookNameInDev = "useMutableSource";
                warnInvalidHookAccess();
                updateHookTypesDev();
                return updateMutableSource();
              },
              useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
                currentHookNameInDev = "useSyncExternalStore";
                warnInvalidHookAccess();
                updateHookTypesDev();
                return updateSyncExternalStore(subscribe, getSnapshot);
              },
              useId: function() {
                currentHookNameInDev = "useId";
                warnInvalidHookAccess();
                updateHookTypesDev();
                return updateId();
              },
              unstable_isNewReconciler: enableNewReconciler
            };
            InvalidNestedHooksDispatcherOnRerenderInDEV = {
              readContext: function(context) {
                warnInvalidContextAccess();
                return readContext(context);
              },
              useCallback: function(callback, deps) {
                currentHookNameInDev = "useCallback";
                warnInvalidHookAccess();
                updateHookTypesDev();
                return updateCallback(callback, deps);
              },
              useContext: function(context) {
                currentHookNameInDev = "useContext";
                warnInvalidHookAccess();
                updateHookTypesDev();
                return readContext(context);
              },
              useEffect: function(create, deps) {
                currentHookNameInDev = "useEffect";
                warnInvalidHookAccess();
                updateHookTypesDev();
                return updateEffect(create, deps);
              },
              useImperativeHandle: function(ref, create, deps) {
                currentHookNameInDev = "useImperativeHandle";
                warnInvalidHookAccess();
                updateHookTypesDev();
                return updateImperativeHandle(ref, create, deps);
              },
              useInsertionEffect: function(create, deps) {
                currentHookNameInDev = "useInsertionEffect";
                warnInvalidHookAccess();
                updateHookTypesDev();
                return updateInsertionEffect(create, deps);
              },
              useLayoutEffect: function(create, deps) {
                currentHookNameInDev = "useLayoutEffect";
                warnInvalidHookAccess();
                updateHookTypesDev();
                return updateLayoutEffect(create, deps);
              },
              useMemo: function(create, deps) {
                currentHookNameInDev = "useMemo";
                warnInvalidHookAccess();
                updateHookTypesDev();
                var prevDispatcher = ReactCurrentDispatcher$1.current;
                ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
                try {
                  return updateMemo(create, deps);
                } finally {
                  ReactCurrentDispatcher$1.current = prevDispatcher;
                }
              },
              useReducer: function(reducer, initialArg, init) {
                currentHookNameInDev = "useReducer";
                warnInvalidHookAccess();
                updateHookTypesDev();
                var prevDispatcher = ReactCurrentDispatcher$1.current;
                ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
                try {
                  return rerenderReducer(reducer, initialArg, init);
                } finally {
                  ReactCurrentDispatcher$1.current = prevDispatcher;
                }
              },
              useRef: function(initialValue) {
                currentHookNameInDev = "useRef";
                warnInvalidHookAccess();
                updateHookTypesDev();
                return updateRef();
              },
              useState: function(initialState) {
                currentHookNameInDev = "useState";
                warnInvalidHookAccess();
                updateHookTypesDev();
                var prevDispatcher = ReactCurrentDispatcher$1.current;
                ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
                try {
                  return rerenderState(initialState);
                } finally {
                  ReactCurrentDispatcher$1.current = prevDispatcher;
                }
              },
              useDebugValue: function(value, formatterFn) {
                currentHookNameInDev = "useDebugValue";
                warnInvalidHookAccess();
                updateHookTypesDev();
                return updateDebugValue();
              },
              useDeferredValue: function(value) {
                currentHookNameInDev = "useDeferredValue";
                warnInvalidHookAccess();
                updateHookTypesDev();
                return rerenderDeferredValue(value);
              },
              useTransition: function() {
                currentHookNameInDev = "useTransition";
                warnInvalidHookAccess();
                updateHookTypesDev();
                return rerenderTransition();
              },
              useMutableSource: function(source, getSnapshot, subscribe) {
                currentHookNameInDev = "useMutableSource";
                warnInvalidHookAccess();
                updateHookTypesDev();
                return updateMutableSource();
              },
              useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
                currentHookNameInDev = "useSyncExternalStore";
                warnInvalidHookAccess();
                updateHookTypesDev();
                return updateSyncExternalStore(subscribe, getSnapshot);
              },
              useId: function() {
                currentHookNameInDev = "useId";
                warnInvalidHookAccess();
                updateHookTypesDev();
                return updateId();
              },
              unstable_isNewReconciler: enableNewReconciler
            };
          }
          var now$1 = Scheduler.unstable_now;
          var commitTime = 0;
          var layoutEffectStartTime = -1;
          var profilerStartTime = -1;
          var passiveEffectStartTime = -1;
          var currentUpdateIsNested = false;
          var nestedUpdateScheduled = false;
          function isCurrentUpdateNested() {
            return currentUpdateIsNested;
          }
          function markNestedUpdateScheduled() {
            {
              nestedUpdateScheduled = true;
            }
          }
          function resetNestedUpdateFlag() {
            {
              currentUpdateIsNested = false;
              nestedUpdateScheduled = false;
            }
          }
          function syncNestedUpdateFlag() {
            {
              currentUpdateIsNested = nestedUpdateScheduled;
              nestedUpdateScheduled = false;
            }
          }
          function getCommitTime() {
            return commitTime;
          }
          function recordCommitTime() {
            commitTime = now$1();
          }
          function startProfilerTimer(fiber) {
            profilerStartTime = now$1();
            if (fiber.actualStartTime < 0) {
              fiber.actualStartTime = now$1();
            }
          }
          function stopProfilerTimerIfRunning(fiber) {
            profilerStartTime = -1;
          }
          function stopProfilerTimerIfRunningAndRecordDelta(fiber, overrideBaseTime) {
            if (profilerStartTime >= 0) {
              var elapsedTime = now$1() - profilerStartTime;
              fiber.actualDuration += elapsedTime;
              if (overrideBaseTime) {
                fiber.selfBaseDuration = elapsedTime;
              }
              profilerStartTime = -1;
            }
          }
          function recordLayoutEffectDuration(fiber) {
            if (layoutEffectStartTime >= 0) {
              var elapsedTime = now$1() - layoutEffectStartTime;
              layoutEffectStartTime = -1;
              var parentFiber = fiber.return;
              while (parentFiber !== null) {
                switch (parentFiber.tag) {
                  case HostRoot:
                    var root = parentFiber.stateNode;
                    root.effectDuration += elapsedTime;
                    return;
                  case Profiler:
                    var parentStateNode = parentFiber.stateNode;
                    parentStateNode.effectDuration += elapsedTime;
                    return;
                }
                parentFiber = parentFiber.return;
              }
            }
          }
          function recordPassiveEffectDuration(fiber) {
            if (passiveEffectStartTime >= 0) {
              var elapsedTime = now$1() - passiveEffectStartTime;
              passiveEffectStartTime = -1;
              var parentFiber = fiber.return;
              while (parentFiber !== null) {
                switch (parentFiber.tag) {
                  case HostRoot:
                    var root = parentFiber.stateNode;
                    if (root !== null) {
                      root.passiveEffectDuration += elapsedTime;
                    }
                    return;
                  case Profiler:
                    var parentStateNode = parentFiber.stateNode;
                    if (parentStateNode !== null) {
                      parentStateNode.passiveEffectDuration += elapsedTime;
                    }
                    return;
                }
                parentFiber = parentFiber.return;
              }
            }
          }
          function startLayoutEffectTimer() {
            layoutEffectStartTime = now$1();
          }
          function startPassiveEffectTimer() {
            passiveEffectStartTime = now$1();
          }
          function transferActualDuration(fiber) {
            var child = fiber.child;
            while (child) {
              fiber.actualDuration += child.actualDuration;
              child = child.sibling;
            }
          }
          function resolveDefaultProps(Component, baseProps) {
            if (Component && Component.defaultProps) {
              var props = assign({}, baseProps);
              var defaultProps = Component.defaultProps;
              for (var propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
              return props;
            }
            return baseProps;
          }
          var fakeInternalInstance = {};
          var didWarnAboutStateAssignmentForComponent;
          var didWarnAboutUninitializedState;
          var didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate;
          var didWarnAboutLegacyLifecyclesAndDerivedState;
          var didWarnAboutUndefinedDerivedState;
          var warnOnUndefinedDerivedState;
          var warnOnInvalidCallback;
          var didWarnAboutDirectlyAssigningPropsToState;
          var didWarnAboutContextTypeAndContextTypes;
          var didWarnAboutInvalidateContextType;
          var didWarnAboutLegacyContext$1;
          {
            didWarnAboutStateAssignmentForComponent = /* @__PURE__ */ new Set();
            didWarnAboutUninitializedState = /* @__PURE__ */ new Set();
            didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = /* @__PURE__ */ new Set();
            didWarnAboutLegacyLifecyclesAndDerivedState = /* @__PURE__ */ new Set();
            didWarnAboutDirectlyAssigningPropsToState = /* @__PURE__ */ new Set();
            didWarnAboutUndefinedDerivedState = /* @__PURE__ */ new Set();
            didWarnAboutContextTypeAndContextTypes = /* @__PURE__ */ new Set();
            didWarnAboutInvalidateContextType = /* @__PURE__ */ new Set();
            didWarnAboutLegacyContext$1 = /* @__PURE__ */ new Set();
            var didWarnOnInvalidCallback = /* @__PURE__ */ new Set();
            warnOnInvalidCallback = function(callback, callerName) {
              if (callback === null || typeof callback === "function") {
                return;
              }
              var key = callerName + "_" + callback;
              if (!didWarnOnInvalidCallback.has(key)) {
                didWarnOnInvalidCallback.add(key);
                error("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", callerName, callback);
              }
            };
            warnOnUndefinedDerivedState = function(type, partialState) {
              if (partialState === void 0) {
                var componentName = getComponentNameFromType(type) || "Component";
                if (!didWarnAboutUndefinedDerivedState.has(componentName)) {
                  didWarnAboutUndefinedDerivedState.add(componentName);
                  error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", componentName);
                }
              }
            };
            Object.defineProperty(fakeInternalInstance, "_processChildContext", {
              enumerable: false,
              value: function() {
                throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
              }
            });
            Object.freeze(fakeInternalInstance);
          }
          function applyDerivedStateFromProps(workInProgress2, ctor, getDerivedStateFromProps, nextProps) {
            var prevState = workInProgress2.memoizedState;
            var partialState = getDerivedStateFromProps(nextProps, prevState);
            {
              if (workInProgress2.mode & StrictLegacyMode) {
                setIsStrictModeForDevtools(true);
                try {
                  partialState = getDerivedStateFromProps(nextProps, prevState);
                } finally {
                  setIsStrictModeForDevtools(false);
                }
              }
              warnOnUndefinedDerivedState(ctor, partialState);
            }
            var memoizedState = partialState === null || partialState === void 0 ? prevState : assign({}, prevState, partialState);
            workInProgress2.memoizedState = memoizedState;
            if (workInProgress2.lanes === NoLanes) {
              var updateQueue = workInProgress2.updateQueue;
              updateQueue.baseState = memoizedState;
            }
          }
          var classComponentUpdater = {
            isMounted,
            enqueueSetState: function(inst, payload, callback) {
              var fiber = get(inst);
              var eventTime = requestEventTime();
              var lane = requestUpdateLane(fiber);
              var update = createUpdate(eventTime, lane);
              update.payload = payload;
              if (callback !== void 0 && callback !== null) {
                {
                  warnOnInvalidCallback(callback, "setState");
                }
                update.callback = callback;
              }
              var root = enqueueUpdate(fiber, update, lane);
              if (root !== null) {
                scheduleUpdateOnFiber(root, fiber, lane, eventTime);
                entangleTransitions(root, fiber, lane);
              }
              {
                markStateUpdateScheduled(fiber, lane);
              }
            },
            enqueueReplaceState: function(inst, payload, callback) {
              var fiber = get(inst);
              var eventTime = requestEventTime();
              var lane = requestUpdateLane(fiber);
              var update = createUpdate(eventTime, lane);
              update.tag = ReplaceState;
              update.payload = payload;
              if (callback !== void 0 && callback !== null) {
                {
                  warnOnInvalidCallback(callback, "replaceState");
                }
                update.callback = callback;
              }
              var root = enqueueUpdate(fiber, update, lane);
              if (root !== null) {
                scheduleUpdateOnFiber(root, fiber, lane, eventTime);
                entangleTransitions(root, fiber, lane);
              }
              {
                markStateUpdateScheduled(fiber, lane);
              }
            },
            enqueueForceUpdate: function(inst, callback) {
              var fiber = get(inst);
              var eventTime = requestEventTime();
              var lane = requestUpdateLane(fiber);
              var update = createUpdate(eventTime, lane);
              update.tag = ForceUpdate;
              if (callback !== void 0 && callback !== null) {
                {
                  warnOnInvalidCallback(callback, "forceUpdate");
                }
                update.callback = callback;
              }
              var root = enqueueUpdate(fiber, update, lane);
              if (root !== null) {
                scheduleUpdateOnFiber(root, fiber, lane, eventTime);
                entangleTransitions(root, fiber, lane);
              }
              {
                markForceUpdateScheduled(fiber, lane);
              }
            }
          };
          function checkShouldComponentUpdate(workInProgress2, ctor, oldProps, newProps, oldState, newState, nextContext) {
            var instance = workInProgress2.stateNode;
            if (typeof instance.shouldComponentUpdate === "function") {
              var shouldUpdate = instance.shouldComponentUpdate(newProps, newState, nextContext);
              {
                if (workInProgress2.mode & StrictLegacyMode) {
                  setIsStrictModeForDevtools(true);
                  try {
                    shouldUpdate = instance.shouldComponentUpdate(newProps, newState, nextContext);
                  } finally {
                    setIsStrictModeForDevtools(false);
                  }
                }
                if (shouldUpdate === void 0) {
                  error("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", getComponentNameFromType(ctor) || "Component");
                }
              }
              return shouldUpdate;
            }
            if (ctor.prototype && ctor.prototype.isPureReactComponent) {
              return !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState);
            }
            return true;
          }
          function checkClassInstance(workInProgress2, ctor, newProps) {
            var instance = workInProgress2.stateNode;
            {
              var name = getComponentNameFromType(ctor) || "Component";
              var renderPresent = instance.render;
              if (!renderPresent) {
                if (ctor.prototype && typeof ctor.prototype.render === "function") {
                  error("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", name);
                } else {
                  error("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", name);
                }
              }
              if (instance.getInitialState && !instance.getInitialState.isReactClassApproved && !instance.state) {
                error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", name);
              }
              if (instance.getDefaultProps && !instance.getDefaultProps.isReactClassApproved) {
                error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", name);
              }
              if (instance.propTypes) {
                error("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", name);
              }
              if (instance.contextType) {
                error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", name);
              }
              {
                if (ctor.childContextTypes && !didWarnAboutLegacyContext$1.has(ctor) && // Strict Mode has its own warning for legacy context, so we can skip
                // this one.
                (workInProgress2.mode & StrictLegacyMode) === NoMode) {
                  didWarnAboutLegacyContext$1.add(ctor);
                  error("%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead\n\n.Learn more about this warning here: https://reactjs.org/link/legacy-context", name);
                }
                if (ctor.contextTypes && !didWarnAboutLegacyContext$1.has(ctor) && // Strict Mode has its own warning for legacy context, so we can skip
                // this one.
                (workInProgress2.mode & StrictLegacyMode) === NoMode) {
                  didWarnAboutLegacyContext$1.add(ctor);
                  error("%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.\n\nLearn more about this warning here: https://reactjs.org/link/legacy-context", name);
                }
                if (instance.contextTypes) {
                  error("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", name);
                }
                if (ctor.contextType && ctor.contextTypes && !didWarnAboutContextTypeAndContextTypes.has(ctor)) {
                  didWarnAboutContextTypeAndContextTypes.add(ctor);
                  error("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", name);
                }
              }
              if (typeof instance.componentShouldUpdate === "function") {
                error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", name);
              }
              if (ctor.prototype && ctor.prototype.isPureReactComponent && typeof instance.shouldComponentUpdate !== "undefined") {
                error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", getComponentNameFromType(ctor) || "A pure component");
              }
              if (typeof instance.componentDidUnmount === "function") {
                error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", name);
              }
              if (typeof instance.componentDidReceiveProps === "function") {
                error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", name);
              }
              if (typeof instance.componentWillRecieveProps === "function") {
                error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", name);
              }
              if (typeof instance.UNSAFE_componentWillRecieveProps === "function") {
                error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", name);
              }
              var hasMutatedProps = instance.props !== newProps;
              if (instance.props !== void 0 && hasMutatedProps) {
                error("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", name, name);
              }
              if (instance.defaultProps) {
                error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", name, name);
              }
              if (typeof instance.getSnapshotBeforeUpdate === "function" && typeof instance.componentDidUpdate !== "function" && !didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(ctor)) {
                didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(ctor);
                error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", getComponentNameFromType(ctor));
              }
              if (typeof instance.getDerivedStateFromProps === "function") {
                error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name);
              }
              if (typeof instance.getDerivedStateFromError === "function") {
                error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name);
              }
              if (typeof ctor.getSnapshotBeforeUpdate === "function") {
                error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", name);
              }
              var _state = instance.state;
              if (_state && (typeof _state !== "object" || isArray(_state))) {
                error("%s.state: must be set to an object or null", name);
              }
              if (typeof instance.getChildContext === "function" && typeof ctor.childContextTypes !== "object") {
                error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", name);
              }
            }
          }
          function adoptClassInstance(workInProgress2, instance) {
            instance.updater = classComponentUpdater;
            workInProgress2.stateNode = instance;
            set(instance, workInProgress2);
            {
              instance._reactInternalInstance = fakeInternalInstance;
            }
          }
          function constructClassInstance(workInProgress2, ctor, props) {
            var isLegacyContextConsumer = false;
            var unmaskedContext = emptyContextObject;
            var context = emptyContextObject;
            var contextType = ctor.contextType;
            {
              if ("contextType" in ctor) {
                var isValid = (
                  // Allow null for conditional declaration
                  contextType === null || contextType !== void 0 && contextType.$$typeof === REACT_CONTEXT_TYPE && contextType._context === void 0
                );
                if (!isValid && !didWarnAboutInvalidateContextType.has(ctor)) {
                  didWarnAboutInvalidateContextType.add(ctor);
                  var addendum = "";
                  if (contextType === void 0) {
                    addendum = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file.";
                  } else if (typeof contextType !== "object") {
                    addendum = " However, it is set to a " + typeof contextType + ".";
                  } else if (contextType.$$typeof === REACT_PROVIDER_TYPE) {
                    addendum = " Did you accidentally pass the Context.Provider instead?";
                  } else if (contextType._context !== void 0) {
                    addendum = " Did you accidentally pass the Context.Consumer instead?";
                  } else {
                    addendum = " However, it is set to an object with keys {" + Object.keys(contextType).join(", ") + "}.";
                  }
                  error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", getComponentNameFromType(ctor) || "Component", addendum);
                }
              }
            }
            if (typeof contextType === "object" && contextType !== null) {
              context = readContext(contextType);
            } else {
              unmaskedContext = getUnmaskedContext(workInProgress2, ctor, true);
              var contextTypes = ctor.contextTypes;
              isLegacyContextConsumer = contextTypes !== null && contextTypes !== void 0;
              context = isLegacyContextConsumer ? getMaskedContext(workInProgress2, unmaskedContext) : emptyContextObject;
            }
            var instance = new ctor(props, context);
            {
              if (workInProgress2.mode & StrictLegacyMode) {
                setIsStrictModeForDevtools(true);
                try {
                  instance = new ctor(props, context);
                } finally {
                  setIsStrictModeForDevtools(false);
                }
              }
            }
            var state = workInProgress2.memoizedState = instance.state !== null && instance.state !== void 0 ? instance.state : null;
            adoptClassInstance(workInProgress2, instance);
            {
              if (typeof ctor.getDerivedStateFromProps === "function" && state === null) {
                var componentName = getComponentNameFromType(ctor) || "Component";
                if (!didWarnAboutUninitializedState.has(componentName)) {
                  didWarnAboutUninitializedState.add(componentName);
                  error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", componentName, instance.state === null ? "null" : "undefined", componentName);
                }
              }
              if (typeof ctor.getDerivedStateFromProps === "function" || typeof instance.getSnapshotBeforeUpdate === "function") {
                var foundWillMountName = null;
                var foundWillReceivePropsName = null;
                var foundWillUpdateName = null;
                if (typeof instance.componentWillMount === "function" && instance.componentWillMount.__suppressDeprecationWarning !== true) {
                  foundWillMountName = "componentWillMount";
                } else if (typeof instance.UNSAFE_componentWillMount === "function") {
                  foundWillMountName = "UNSAFE_componentWillMount";
                }
                if (typeof instance.componentWillReceiveProps === "function" && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true) {
                  foundWillReceivePropsName = "componentWillReceiveProps";
                } else if (typeof instance.UNSAFE_componentWillReceiveProps === "function") {
                  foundWillReceivePropsName = "UNSAFE_componentWillReceiveProps";
                }
                if (typeof instance.componentWillUpdate === "function" && instance.componentWillUpdate.__suppressDeprecationWarning !== true) {
                  foundWillUpdateName = "componentWillUpdate";
                } else if (typeof instance.UNSAFE_componentWillUpdate === "function") {
                  foundWillUpdateName = "UNSAFE_componentWillUpdate";
                }
                if (foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
                  var _componentName = getComponentNameFromType(ctor) || "Component";
                  var newApiName = typeof ctor.getDerivedStateFromProps === "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
                  if (!didWarnAboutLegacyLifecyclesAndDerivedState.has(_componentName)) {
                    didWarnAboutLegacyLifecyclesAndDerivedState.add(_componentName);
                    error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://reactjs.org/link/unsafe-component-lifecycles", _componentName, newApiName, foundWillMountName !== null ? "\n  " + foundWillMountName : "", foundWillReceivePropsName !== null ? "\n  " + foundWillReceivePropsName : "", foundWillUpdateName !== null ? "\n  " + foundWillUpdateName : "");
                  }
                }
              }
            }
            if (isLegacyContextConsumer) {
              cacheContext(workInProgress2, unmaskedContext, context);
            }
            return instance;
          }
          function callComponentWillMount(workInProgress2, instance) {
            var oldState = instance.state;
            if (typeof instance.componentWillMount === "function") {
              instance.componentWillMount();
            }
            if (typeof instance.UNSAFE_componentWillMount === "function") {
              instance.UNSAFE_componentWillMount();
            }
            if (oldState !== instance.state) {
              {
                error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", getComponentNameFromFiber(workInProgress2) || "Component");
              }
              classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
            }
          }
          function callComponentWillReceiveProps(workInProgress2, instance, newProps, nextContext) {
            var oldState = instance.state;
            if (typeof instance.componentWillReceiveProps === "function") {
              instance.componentWillReceiveProps(newProps, nextContext);
            }
            if (typeof instance.UNSAFE_componentWillReceiveProps === "function") {
              instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
            }
            if (instance.state !== oldState) {
              {
                var componentName = getComponentNameFromFiber(workInProgress2) || "Component";
                if (!didWarnAboutStateAssignmentForComponent.has(componentName)) {
                  didWarnAboutStateAssignmentForComponent.add(componentName);
                  error("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", componentName);
                }
              }
              classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
            }
          }
          function mountClassInstance(workInProgress2, ctor, newProps, renderLanes2) {
            {
              checkClassInstance(workInProgress2, ctor, newProps);
            }
            var instance = workInProgress2.stateNode;
            instance.props = newProps;
            instance.state = workInProgress2.memoizedState;
            instance.refs = {};
            initializeUpdateQueue(workInProgress2);
            var contextType = ctor.contextType;
            if (typeof contextType === "object" && contextType !== null) {
              instance.context = readContext(contextType);
            } else {
              var unmaskedContext = getUnmaskedContext(workInProgress2, ctor, true);
              instance.context = getMaskedContext(workInProgress2, unmaskedContext);
            }
            {
              if (instance.state === newProps) {
                var componentName = getComponentNameFromType(ctor) || "Component";
                if (!didWarnAboutDirectlyAssigningPropsToState.has(componentName)) {
                  didWarnAboutDirectlyAssigningPropsToState.add(componentName);
                  error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", componentName);
                }
              }
              if (workInProgress2.mode & StrictLegacyMode) {
                ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress2, instance);
              }
              {
                ReactStrictModeWarnings.recordUnsafeLifecycleWarnings(workInProgress2, instance);
              }
            }
            instance.state = workInProgress2.memoizedState;
            var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
            if (typeof getDerivedStateFromProps === "function") {
              applyDerivedStateFromProps(workInProgress2, ctor, getDerivedStateFromProps, newProps);
              instance.state = workInProgress2.memoizedState;
            }
            if (typeof ctor.getDerivedStateFromProps !== "function" && typeof instance.getSnapshotBeforeUpdate !== "function" && (typeof instance.UNSAFE_componentWillMount === "function" || typeof instance.componentWillMount === "function")) {
              callComponentWillMount(workInProgress2, instance);
              processUpdateQueue(workInProgress2, newProps, instance, renderLanes2);
              instance.state = workInProgress2.memoizedState;
            }
            if (typeof instance.componentDidMount === "function") {
              var fiberFlags = Update;
              {
                fiberFlags |= LayoutStatic;
              }
              if ((workInProgress2.mode & StrictEffectsMode) !== NoMode) {
                fiberFlags |= MountLayoutDev;
              }
              workInProgress2.flags |= fiberFlags;
            }
          }
          function resumeMountClassInstance(workInProgress2, ctor, newProps, renderLanes2) {
            var instance = workInProgress2.stateNode;
            var oldProps = workInProgress2.memoizedProps;
            instance.props = oldProps;
            var oldContext = instance.context;
            var contextType = ctor.contextType;
            var nextContext = emptyContextObject;
            if (typeof contextType === "object" && contextType !== null) {
              nextContext = readContext(contextType);
            } else {
              var nextLegacyUnmaskedContext = getUnmaskedContext(workInProgress2, ctor, true);
              nextContext = getMaskedContext(workInProgress2, nextLegacyUnmaskedContext);
            }
            var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
            var hasNewLifecycles = typeof getDerivedStateFromProps === "function" || typeof instance.getSnapshotBeforeUpdate === "function";
            if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillReceiveProps === "function" || typeof instance.componentWillReceiveProps === "function")) {
              if (oldProps !== newProps || oldContext !== nextContext) {
                callComponentWillReceiveProps(workInProgress2, instance, newProps, nextContext);
              }
            }
            resetHasForceUpdateBeforeProcessing();
            var oldState = workInProgress2.memoizedState;
            var newState = instance.state = oldState;
            processUpdateQueue(workInProgress2, newProps, instance, renderLanes2);
            newState = workInProgress2.memoizedState;
            if (oldProps === newProps && oldState === newState && !hasContextChanged() && !checkHasForceUpdateAfterProcessing()) {
              if (typeof instance.componentDidMount === "function") {
                var fiberFlags = Update;
                {
                  fiberFlags |= LayoutStatic;
                }
                if ((workInProgress2.mode & StrictEffectsMode) !== NoMode) {
                  fiberFlags |= MountLayoutDev;
                }
                workInProgress2.flags |= fiberFlags;
              }
              return false;
            }
            if (typeof getDerivedStateFromProps === "function") {
              applyDerivedStateFromProps(workInProgress2, ctor, getDerivedStateFromProps, newProps);
              newState = workInProgress2.memoizedState;
            }
            var shouldUpdate = checkHasForceUpdateAfterProcessing() || checkShouldComponentUpdate(workInProgress2, ctor, oldProps, newProps, oldState, newState, nextContext);
            if (shouldUpdate) {
              if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillMount === "function" || typeof instance.componentWillMount === "function")) {
                if (typeof instance.componentWillMount === "function") {
                  instance.componentWillMount();
                }
                if (typeof instance.UNSAFE_componentWillMount === "function") {
                  instance.UNSAFE_componentWillMount();
                }
              }
              if (typeof instance.componentDidMount === "function") {
                var _fiberFlags = Update;
                {
                  _fiberFlags |= LayoutStatic;
                }
                if ((workInProgress2.mode & StrictEffectsMode) !== NoMode) {
                  _fiberFlags |= MountLayoutDev;
                }
                workInProgress2.flags |= _fiberFlags;
              }
            } else {
              if (typeof instance.componentDidMount === "function") {
                var _fiberFlags2 = Update;
                {
                  _fiberFlags2 |= LayoutStatic;
                }
                if ((workInProgress2.mode & StrictEffectsMode) !== NoMode) {
                  _fiberFlags2 |= MountLayoutDev;
                }
                workInProgress2.flags |= _fiberFlags2;
              }
              workInProgress2.memoizedProps = newProps;
              workInProgress2.memoizedState = newState;
            }
            instance.props = newProps;
            instance.state = newState;
            instance.context = nextContext;
            return shouldUpdate;
          }
          function updateClassInstance(current2, workInProgress2, ctor, newProps, renderLanes2) {
            var instance = workInProgress2.stateNode;
            cloneUpdateQueue(current2, workInProgress2);
            var unresolvedOldProps = workInProgress2.memoizedProps;
            var oldProps = workInProgress2.type === workInProgress2.elementType ? unresolvedOldProps : resolveDefaultProps(workInProgress2.type, unresolvedOldProps);
            instance.props = oldProps;
            var unresolvedNewProps = workInProgress2.pendingProps;
            var oldContext = instance.context;
            var contextType = ctor.contextType;
            var nextContext = emptyContextObject;
            if (typeof contextType === "object" && contextType !== null) {
              nextContext = readContext(contextType);
            } else {
              var nextUnmaskedContext = getUnmaskedContext(workInProgress2, ctor, true);
              nextContext = getMaskedContext(workInProgress2, nextUnmaskedContext);
            }
            var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
            var hasNewLifecycles = typeof getDerivedStateFromProps === "function" || typeof instance.getSnapshotBeforeUpdate === "function";
            if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillReceiveProps === "function" || typeof instance.componentWillReceiveProps === "function")) {
              if (unresolvedOldProps !== unresolvedNewProps || oldContext !== nextContext) {
                callComponentWillReceiveProps(workInProgress2, instance, newProps, nextContext);
              }
            }
            resetHasForceUpdateBeforeProcessing();
            var oldState = workInProgress2.memoizedState;
            var newState = instance.state = oldState;
            processUpdateQueue(workInProgress2, newProps, instance, renderLanes2);
            newState = workInProgress2.memoizedState;
            if (unresolvedOldProps === unresolvedNewProps && oldState === newState && !hasContextChanged() && !checkHasForceUpdateAfterProcessing() && !enableLazyContextPropagation) {
              if (typeof instance.componentDidUpdate === "function") {
                if (unresolvedOldProps !== current2.memoizedProps || oldState !== current2.memoizedState) {
                  workInProgress2.flags |= Update;
                }
              }
              if (typeof instance.getSnapshotBeforeUpdate === "function") {
                if (unresolvedOldProps !== current2.memoizedProps || oldState !== current2.memoizedState) {
                  workInProgress2.flags |= Snapshot;
                }
              }
              return false;
            }
            if (typeof getDerivedStateFromProps === "function") {
              applyDerivedStateFromProps(workInProgress2, ctor, getDerivedStateFromProps, newProps);
              newState = workInProgress2.memoizedState;
            }
            var shouldUpdate = checkHasForceUpdateAfterProcessing() || checkShouldComponentUpdate(workInProgress2, ctor, oldProps, newProps, oldState, newState, nextContext) || // TODO: In some cases, we'll end up checking if context has changed twice,
            // both before and after `shouldComponentUpdate` has been called. Not ideal,
            // but I'm loath to refactor this function. This only happens for memoized
            // components so it's not that common.
            enableLazyContextPropagation;
            if (shouldUpdate) {
              if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillUpdate === "function" || typeof instance.componentWillUpdate === "function")) {
                if (typeof instance.componentWillUpdate === "function") {
                  instance.componentWillUpdate(newProps, newState, nextContext);
                }
                if (typeof instance.UNSAFE_componentWillUpdate === "function") {
                  instance.UNSAFE_componentWillUpdate(newProps, newState, nextContext);
                }
              }
              if (typeof instance.componentDidUpdate === "function") {
                workInProgress2.flags |= Update;
              }
              if (typeof instance.getSnapshotBeforeUpdate === "function") {
                workInProgress2.flags |= Snapshot;
              }
            } else {
              if (typeof instance.componentDidUpdate === "function") {
                if (unresolvedOldProps !== current2.memoizedProps || oldState !== current2.memoizedState) {
                  workInProgress2.flags |= Update;
                }
              }
              if (typeof instance.getSnapshotBeforeUpdate === "function") {
                if (unresolvedOldProps !== current2.memoizedProps || oldState !== current2.memoizedState) {
                  workInProgress2.flags |= Snapshot;
                }
              }
              workInProgress2.memoizedProps = newProps;
              workInProgress2.memoizedState = newState;
            }
            instance.props = newProps;
            instance.state = newState;
            instance.context = nextContext;
            return shouldUpdate;
          }
          function createCapturedValueAtFiber(value, source) {
            return {
              value,
              source,
              stack: getStackByFiberInDevAndProd(source),
              digest: null
            };
          }
          function createCapturedValue(value, digest, stack) {
            return {
              value,
              source: null,
              stack: stack != null ? stack : null,
              digest: digest != null ? digest : null
            };
          }
          function showErrorDialog(boundary, errorInfo) {
            return true;
          }
          function logCapturedError(boundary, errorInfo) {
            try {
              var logError = showErrorDialog(boundary, errorInfo);
              if (logError === false) {
                return;
              }
              var error2 = errorInfo.value;
              if (true) {
                var source = errorInfo.source;
                var stack = errorInfo.stack;
                var componentStack = stack !== null ? stack : "";
                if (error2 != null && error2._suppressLogging) {
                  if (boundary.tag === ClassComponent) {
                    return;
                  }
                  console["error"](error2);
                }
                var componentName = source ? getComponentNameFromFiber(source) : null;
                var componentNameMessage = componentName ? "The above error occurred in the <" + componentName + "> component:" : "The above error occurred in one of your React components:";
                var errorBoundaryMessage;
                if (boundary.tag === HostRoot) {
                  errorBoundaryMessage = "Consider adding an error boundary to your tree to customize error handling behavior.\nVisit https://reactjs.org/link/error-boundaries to learn more about error boundaries.";
                } else {
                  var errorBoundaryName = getComponentNameFromFiber(boundary) || "Anonymous";
                  errorBoundaryMessage = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + errorBoundaryName + ".");
                }
                var combinedMessage = componentNameMessage + "\n" + componentStack + "\n\n" + ("" + errorBoundaryMessage);
                console["error"](combinedMessage);
              } else {
                console["error"](error2);
              }
            } catch (e) {
              setTimeout(function() {
                throw e;
              });
            }
          }
          var PossiblyWeakMap$1 = typeof WeakMap === "function" ? WeakMap : Map;
          function createRootErrorUpdate(fiber, errorInfo, lane) {
            var update = createUpdate(NoTimestamp, lane);
            update.tag = CaptureUpdate;
            update.payload = {
              element: null
            };
            var error2 = errorInfo.value;
            update.callback = function() {
              onUncaughtError(error2);
              logCapturedError(fiber, errorInfo);
            };
            return update;
          }
          function createClassErrorUpdate(fiber, errorInfo, lane) {
            var update = createUpdate(NoTimestamp, lane);
            update.tag = CaptureUpdate;
            var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
            if (typeof getDerivedStateFromError === "function") {
              var error$1 = errorInfo.value;
              update.payload = function() {
                return getDerivedStateFromError(error$1);
              };
              update.callback = function() {
                {
                  markFailedErrorBoundaryForHotReloading(fiber);
                }
                logCapturedError(fiber, errorInfo);
              };
            }
            var inst = fiber.stateNode;
            if (inst !== null && typeof inst.componentDidCatch === "function") {
              update.callback = function callback() {
                {
                  markFailedErrorBoundaryForHotReloading(fiber);
                }
                logCapturedError(fiber, errorInfo);
                if (typeof getDerivedStateFromError !== "function") {
                  markLegacyErrorBoundaryAsFailed(this);
                }
                var error$12 = errorInfo.value;
                var stack = errorInfo.stack;
                this.componentDidCatch(error$12, {
                  componentStack: stack !== null ? stack : ""
                });
                {
                  if (typeof getDerivedStateFromError !== "function") {
                    if (!includesSomeLane(fiber.lanes, SyncLane)) {
                      error("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", getComponentNameFromFiber(fiber) || "Unknown");
                    }
                  }
                }
              };
            }
            return update;
          }
          function attachPingListener(root, wakeable, lanes) {
            var pingCache = root.pingCache;
            var threadIDs;
            if (pingCache === null) {
              pingCache = root.pingCache = new PossiblyWeakMap$1();
              threadIDs = /* @__PURE__ */ new Set();
              pingCache.set(wakeable, threadIDs);
            } else {
              threadIDs = pingCache.get(wakeable);
              if (threadIDs === void 0) {
                threadIDs = /* @__PURE__ */ new Set();
                pingCache.set(wakeable, threadIDs);
              }
            }
            if (!threadIDs.has(lanes)) {
              threadIDs.add(lanes);
              var ping = pingSuspendedRoot.bind(null, root, wakeable, lanes);
              {
                if (isDevToolsPresent) {
                  restorePendingUpdaters(root, lanes);
                }
              }
              wakeable.then(ping, ping);
            }
          }
          function attachRetryListener(suspenseBoundary, root, wakeable, lanes) {
            var wakeables = suspenseBoundary.updateQueue;
            if (wakeables === null) {
              var updateQueue = /* @__PURE__ */ new Set();
              updateQueue.add(wakeable);
              suspenseBoundary.updateQueue = updateQueue;
            } else {
              wakeables.add(wakeable);
            }
          }
          function resetSuspendedComponent(sourceFiber, rootRenderLanes) {
            var tag = sourceFiber.tag;
            if ((sourceFiber.mode & ConcurrentMode) === NoMode && (tag === FunctionComponent || tag === ForwardRef || tag === SimpleMemoComponent)) {
              var currentSource = sourceFiber.alternate;
              if (currentSource) {
                sourceFiber.updateQueue = currentSource.updateQueue;
                sourceFiber.memoizedState = currentSource.memoizedState;
                sourceFiber.lanes = currentSource.lanes;
              } else {
                sourceFiber.updateQueue = null;
                sourceFiber.memoizedState = null;
              }
            }
          }
          function getNearestSuspenseBoundaryToCapture(returnFiber) {
            var node = returnFiber;
            do {
              if (node.tag === SuspenseComponent && shouldCaptureSuspense(node)) {
                return node;
              }
              node = node.return;
            } while (node !== null);
            return null;
          }
          function markSuspenseBoundaryShouldCapture(suspenseBoundary, returnFiber, sourceFiber, root, rootRenderLanes) {
            if ((suspenseBoundary.mode & ConcurrentMode) === NoMode) {
              if (suspenseBoundary === returnFiber) {
                suspenseBoundary.flags |= ShouldCapture;
              } else {
                suspenseBoundary.flags |= DidCapture;
                sourceFiber.flags |= ForceUpdateForLegacySuspense;
                sourceFiber.flags &= ~(LifecycleEffectMask | Incomplete);
                if (sourceFiber.tag === ClassComponent) {
                  var currentSourceFiber = sourceFiber.alternate;
                  if (currentSourceFiber === null) {
                    sourceFiber.tag = IncompleteClassComponent;
                  } else {
                    var update = createUpdate(NoTimestamp, SyncLane);
                    update.tag = ForceUpdate;
                    enqueueUpdate(sourceFiber, update, SyncLane);
                  }
                }
                sourceFiber.lanes = mergeLanes(sourceFiber.lanes, SyncLane);
              }
              return suspenseBoundary;
            }
            suspenseBoundary.flags |= ShouldCapture;
            suspenseBoundary.lanes = rootRenderLanes;
            return suspenseBoundary;
          }
          function throwException(root, returnFiber, sourceFiber, value, rootRenderLanes) {
            sourceFiber.flags |= Incomplete;
            {
              if (isDevToolsPresent) {
                restorePendingUpdaters(root, rootRenderLanes);
              }
            }
            if (value !== null && typeof value === "object" && typeof value.then === "function") {
              var wakeable = value;
              resetSuspendedComponent(sourceFiber);
              {
                if (getIsHydrating() && sourceFiber.mode & ConcurrentMode) {
                  markDidThrowWhileHydratingDEV();
                }
              }
              var suspenseBoundary = getNearestSuspenseBoundaryToCapture(returnFiber);
              if (suspenseBoundary !== null) {
                suspenseBoundary.flags &= ~ForceClientRender;
                markSuspenseBoundaryShouldCapture(suspenseBoundary, returnFiber, sourceFiber, root, rootRenderLanes);
                if (suspenseBoundary.mode & ConcurrentMode) {
                  attachPingListener(root, wakeable, rootRenderLanes);
                }
                attachRetryListener(suspenseBoundary, root, wakeable);
                return;
              } else {
                if (!includesSyncLane(rootRenderLanes)) {
                  attachPingListener(root, wakeable, rootRenderLanes);
                  renderDidSuspendDelayIfPossible();
                  return;
                }
                var uncaughtSuspenseError = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
                value = uncaughtSuspenseError;
              }
            } else {
              if (getIsHydrating() && sourceFiber.mode & ConcurrentMode) {
                markDidThrowWhileHydratingDEV();
                var _suspenseBoundary = getNearestSuspenseBoundaryToCapture(returnFiber);
                if (_suspenseBoundary !== null) {
                  if ((_suspenseBoundary.flags & ShouldCapture) === NoFlags) {
                    _suspenseBoundary.flags |= ForceClientRender;
                  }
                  markSuspenseBoundaryShouldCapture(_suspenseBoundary, returnFiber, sourceFiber, root, rootRenderLanes);
                  queueHydrationError(createCapturedValueAtFiber(value, sourceFiber));
                  return;
                }
              }
            }
            value = createCapturedValueAtFiber(value, sourceFiber);
            renderDidError(value);
            var workInProgress2 = returnFiber;
            do {
              switch (workInProgress2.tag) {
                case HostRoot: {
                  var _errorInfo = value;
                  workInProgress2.flags |= ShouldCapture;
                  var lane = pickArbitraryLane(rootRenderLanes);
                  workInProgress2.lanes = mergeLanes(workInProgress2.lanes, lane);
                  var update = createRootErrorUpdate(workInProgress2, _errorInfo, lane);
                  enqueueCapturedUpdate(workInProgress2, update);
                  return;
                }
                case ClassComponent:
                  var errorInfo = value;
                  var ctor = workInProgress2.type;
                  var instance = workInProgress2.stateNode;
                  if ((workInProgress2.flags & DidCapture) === NoFlags && (typeof ctor.getDerivedStateFromError === "function" || instance !== null && typeof instance.componentDidCatch === "function" && !isAlreadyFailedLegacyErrorBoundary(instance))) {
                    workInProgress2.flags |= ShouldCapture;
                    var _lane = pickArbitraryLane(rootRenderLanes);
                    workInProgress2.lanes = mergeLanes(workInProgress2.lanes, _lane);
                    var _update = createClassErrorUpdate(workInProgress2, errorInfo, _lane);
                    enqueueCapturedUpdate(workInProgress2, _update);
                    return;
                  }
                  break;
              }
              workInProgress2 = workInProgress2.return;
            } while (workInProgress2 !== null);
          }
          function getSuspendedCache() {
            {
              return null;
            }
          }
          var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
          var didReceiveUpdate = false;
          var didWarnAboutBadClass;
          var didWarnAboutModulePatternComponent;
          var didWarnAboutContextTypeOnFunctionComponent;
          var didWarnAboutGetDerivedStateOnFunctionComponent;
          var didWarnAboutFunctionRefs;
          var didWarnAboutReassigningProps;
          var didWarnAboutRevealOrder;
          var didWarnAboutTailOptions;
          var didWarnAboutDefaultPropsOnFunctionComponent;
          {
            didWarnAboutBadClass = {};
            didWarnAboutModulePatternComponent = {};
            didWarnAboutContextTypeOnFunctionComponent = {};
            didWarnAboutGetDerivedStateOnFunctionComponent = {};
            didWarnAboutFunctionRefs = {};
            didWarnAboutReassigningProps = false;
            didWarnAboutRevealOrder = {};
            didWarnAboutTailOptions = {};
            didWarnAboutDefaultPropsOnFunctionComponent = {};
          }
          function reconcileChildren(current2, workInProgress2, nextChildren, renderLanes2) {
            if (current2 === null) {
              workInProgress2.child = mountChildFibers(workInProgress2, null, nextChildren, renderLanes2);
            } else {
              workInProgress2.child = reconcileChildFibers(workInProgress2, current2.child, nextChildren, renderLanes2);
            }
          }
          function forceUnmountCurrentAndReconcile(current2, workInProgress2, nextChildren, renderLanes2) {
            workInProgress2.child = reconcileChildFibers(workInProgress2, current2.child, null, renderLanes2);
            workInProgress2.child = reconcileChildFibers(workInProgress2, null, nextChildren, renderLanes2);
          }
          function updateForwardRef(current2, workInProgress2, Component, nextProps, renderLanes2) {
            {
              if (workInProgress2.type !== workInProgress2.elementType) {
                var innerPropTypes = Component.propTypes;
                if (innerPropTypes) {
                  checkPropTypes(
                    innerPropTypes,
                    nextProps,
                    // Resolved props
                    "prop",
                    getComponentNameFromType(Component)
                  );
                }
              }
            }
            var render2 = Component.render;
            var ref = workInProgress2.ref;
            var nextChildren;
            var hasId;
            prepareToReadContext(workInProgress2, renderLanes2);
            {
              markComponentRenderStarted(workInProgress2);
            }
            {
              ReactCurrentOwner$1.current = workInProgress2;
              setIsRendering(true);
              nextChildren = renderWithHooks(current2, workInProgress2, render2, nextProps, ref, renderLanes2);
              hasId = checkDidRenderIdHook();
              if (workInProgress2.mode & StrictLegacyMode) {
                setIsStrictModeForDevtools(true);
                try {
                  nextChildren = renderWithHooks(current2, workInProgress2, render2, nextProps, ref, renderLanes2);
                  hasId = checkDidRenderIdHook();
                } finally {
                  setIsStrictModeForDevtools(false);
                }
              }
              setIsRendering(false);
            }
            {
              markComponentRenderStopped();
            }
            if (current2 !== null && !didReceiveUpdate) {
              bailoutHooks(current2, workInProgress2, renderLanes2);
              return bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderLanes2);
            }
            if (getIsHydrating() && hasId) {
              pushMaterializedTreeId(workInProgress2);
            }
            workInProgress2.flags |= PerformedWork;
            reconcileChildren(current2, workInProgress2, nextChildren, renderLanes2);
            return workInProgress2.child;
          }
          function updateMemoComponent(current2, workInProgress2, Component, nextProps, renderLanes2) {
            if (current2 === null) {
              var type = Component.type;
              if (isSimpleFunctionComponent(type) && Component.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
              Component.defaultProps === void 0) {
                var resolvedType = type;
                {
                  resolvedType = resolveFunctionForHotReloading(type);
                }
                workInProgress2.tag = SimpleMemoComponent;
                workInProgress2.type = resolvedType;
                {
                  validateFunctionComponentInDev(workInProgress2, type);
                }
                return updateSimpleMemoComponent(current2, workInProgress2, resolvedType, nextProps, renderLanes2);
              }
              {
                var innerPropTypes = type.propTypes;
                if (innerPropTypes) {
                  checkPropTypes(
                    innerPropTypes,
                    nextProps,
                    // Resolved props
                    "prop",
                    getComponentNameFromType(type)
                  );
                }
                if (Component.defaultProps !== void 0) {
                  var componentName = getComponentNameFromType(type) || "Unknown";
                  if (!didWarnAboutDefaultPropsOnFunctionComponent[componentName]) {
                    error("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", componentName);
                    didWarnAboutDefaultPropsOnFunctionComponent[componentName] = true;
                  }
                }
              }
              var child = createFiberFromTypeAndProps(Component.type, null, nextProps, workInProgress2, workInProgress2.mode, renderLanes2);
              child.ref = workInProgress2.ref;
              child.return = workInProgress2;
              workInProgress2.child = child;
              return child;
            }
            {
              var _type = Component.type;
              var _innerPropTypes = _type.propTypes;
              if (_innerPropTypes) {
                checkPropTypes(
                  _innerPropTypes,
                  nextProps,
                  // Resolved props
                  "prop",
                  getComponentNameFromType(_type)
                );
              }
            }
            var currentChild = current2.child;
            var hasScheduledUpdateOrContext = checkScheduledUpdateOrContext(current2, renderLanes2);
            if (!hasScheduledUpdateOrContext) {
              var prevProps = currentChild.memoizedProps;
              var compare = Component.compare;
              compare = compare !== null ? compare : shallowEqual;
              if (compare(prevProps, nextProps) && current2.ref === workInProgress2.ref) {
                return bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderLanes2);
              }
            }
            workInProgress2.flags |= PerformedWork;
            var newChild = createWorkInProgress(currentChild, nextProps);
            newChild.ref = workInProgress2.ref;
            newChild.return = workInProgress2;
            workInProgress2.child = newChild;
            return newChild;
          }
          function updateSimpleMemoComponent(current2, workInProgress2, Component, nextProps, renderLanes2) {
            {
              if (workInProgress2.type !== workInProgress2.elementType) {
                var outerMemoType = workInProgress2.elementType;
                if (outerMemoType.$$typeof === REACT_LAZY_TYPE) {
                  var lazyComponent = outerMemoType;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    outerMemoType = init(payload);
                  } catch (x) {
                    outerMemoType = null;
                  }
                  var outerPropTypes = outerMemoType && outerMemoType.propTypes;
                  if (outerPropTypes) {
                    checkPropTypes(
                      outerPropTypes,
                      nextProps,
                      // Resolved (SimpleMemoComponent has no defaultProps)
                      "prop",
                      getComponentNameFromType(outerMemoType)
                    );
                  }
                }
              }
            }
            if (current2 !== null) {
              var prevProps = current2.memoizedProps;
              if (shallowEqual(prevProps, nextProps) && current2.ref === workInProgress2.ref && // Prevent bailout if the implementation changed due to hot reload.
              workInProgress2.type === current2.type) {
                didReceiveUpdate = false;
                workInProgress2.pendingProps = nextProps = prevProps;
                if (!checkScheduledUpdateOrContext(current2, renderLanes2)) {
                  workInProgress2.lanes = current2.lanes;
                  return bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderLanes2);
                } else if ((current2.flags & ForceUpdateForLegacySuspense) !== NoFlags) {
                  didReceiveUpdate = true;
                }
              }
            }
            return updateFunctionComponent(current2, workInProgress2, Component, nextProps, renderLanes2);
          }
          function updateOffscreenComponent(current2, workInProgress2, renderLanes2) {
            var nextProps = workInProgress2.pendingProps;
            var nextChildren = nextProps.children;
            var prevState = current2 !== null ? current2.memoizedState : null;
            if (nextProps.mode === "hidden" || enableLegacyHidden) {
              if ((workInProgress2.mode & ConcurrentMode) === NoMode) {
                var nextState = {
                  baseLanes: NoLanes,
                  cachePool: null,
                  transitions: null
                };
                workInProgress2.memoizedState = nextState;
                pushRenderLanes(workInProgress2, renderLanes2);
              } else if (!includesSomeLane(renderLanes2, OffscreenLane)) {
                var spawnedCachePool = null;
                var nextBaseLanes;
                if (prevState !== null) {
                  var prevBaseLanes = prevState.baseLanes;
                  nextBaseLanes = mergeLanes(prevBaseLanes, renderLanes2);
                } else {
                  nextBaseLanes = renderLanes2;
                }
                workInProgress2.lanes = workInProgress2.childLanes = laneToLanes(OffscreenLane);
                var _nextState = {
                  baseLanes: nextBaseLanes,
                  cachePool: spawnedCachePool,
                  transitions: null
                };
                workInProgress2.memoizedState = _nextState;
                workInProgress2.updateQueue = null;
                pushRenderLanes(workInProgress2, nextBaseLanes);
                return null;
              } else {
                var _nextState2 = {
                  baseLanes: NoLanes,
                  cachePool: null,
                  transitions: null
                };
                workInProgress2.memoizedState = _nextState2;
                var subtreeRenderLanes2 = prevState !== null ? prevState.baseLanes : renderLanes2;
                pushRenderLanes(workInProgress2, subtreeRenderLanes2);
              }
            } else {
              var _subtreeRenderLanes;
              if (prevState !== null) {
                _subtreeRenderLanes = mergeLanes(prevState.baseLanes, renderLanes2);
                workInProgress2.memoizedState = null;
              } else {
                _subtreeRenderLanes = renderLanes2;
              }
              pushRenderLanes(workInProgress2, _subtreeRenderLanes);
            }
            reconcileChildren(current2, workInProgress2, nextChildren, renderLanes2);
            return workInProgress2.child;
          }
          function updateFragment(current2, workInProgress2, renderLanes2) {
            var nextChildren = workInProgress2.pendingProps;
            reconcileChildren(current2, workInProgress2, nextChildren, renderLanes2);
            return workInProgress2.child;
          }
          function updateMode(current2, workInProgress2, renderLanes2) {
            var nextChildren = workInProgress2.pendingProps.children;
            reconcileChildren(current2, workInProgress2, nextChildren, renderLanes2);
            return workInProgress2.child;
          }
          function updateProfiler(current2, workInProgress2, renderLanes2) {
            {
              workInProgress2.flags |= Update;
              {
                var stateNode = workInProgress2.stateNode;
                stateNode.effectDuration = 0;
                stateNode.passiveEffectDuration = 0;
              }
            }
            var nextProps = workInProgress2.pendingProps;
            var nextChildren = nextProps.children;
            reconcileChildren(current2, workInProgress2, nextChildren, renderLanes2);
            return workInProgress2.child;
          }
          function markRef(current2, workInProgress2) {
            var ref = workInProgress2.ref;
            if (current2 === null && ref !== null || current2 !== null && current2.ref !== ref) {
              workInProgress2.flags |= Ref;
              {
                workInProgress2.flags |= RefStatic;
              }
            }
          }
          function updateFunctionComponent(current2, workInProgress2, Component, nextProps, renderLanes2) {
            {
              if (workInProgress2.type !== workInProgress2.elementType) {
                var innerPropTypes = Component.propTypes;
                if (innerPropTypes) {
                  checkPropTypes(
                    innerPropTypes,
                    nextProps,
                    // Resolved props
                    "prop",
                    getComponentNameFromType(Component)
                  );
                }
              }
            }
            var context;
            {
              var unmaskedContext = getUnmaskedContext(workInProgress2, Component, true);
              context = getMaskedContext(workInProgress2, unmaskedContext);
            }
            var nextChildren;
            var hasId;
            prepareToReadContext(workInProgress2, renderLanes2);
            {
              markComponentRenderStarted(workInProgress2);
            }
            {
              ReactCurrentOwner$1.current = workInProgress2;
              setIsRendering(true);
              nextChildren = renderWithHooks(current2, workInProgress2, Component, nextProps, context, renderLanes2);
              hasId = checkDidRenderIdHook();
              if (workInProgress2.mode & StrictLegacyMode) {
                setIsStrictModeForDevtools(true);
                try {
                  nextChildren = renderWithHooks(current2, workInProgress2, Component, nextProps, context, renderLanes2);
                  hasId = checkDidRenderIdHook();
                } finally {
                  setIsStrictModeForDevtools(false);
                }
              }
              setIsRendering(false);
            }
            {
              markComponentRenderStopped();
            }
            if (current2 !== null && !didReceiveUpdate) {
              bailoutHooks(current2, workInProgress2, renderLanes2);
              return bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderLanes2);
            }
            if (getIsHydrating() && hasId) {
              pushMaterializedTreeId(workInProgress2);
            }
            workInProgress2.flags |= PerformedWork;
            reconcileChildren(current2, workInProgress2, nextChildren, renderLanes2);
            return workInProgress2.child;
          }
          function updateClassComponent(current2, workInProgress2, Component, nextProps, renderLanes2) {
            {
              switch (shouldError(workInProgress2)) {
                case false: {
                  var _instance = workInProgress2.stateNode;
                  var ctor = workInProgress2.type;
                  var tempInstance = new ctor(workInProgress2.memoizedProps, _instance.context);
                  var state = tempInstance.state;
                  _instance.updater.enqueueSetState(_instance, state, null);
                  break;
                }
                case true: {
                  workInProgress2.flags |= DidCapture;
                  workInProgress2.flags |= ShouldCapture;
                  var error$1 = new Error("Simulated error coming from DevTools");
                  var lane = pickArbitraryLane(renderLanes2);
                  workInProgress2.lanes = mergeLanes(workInProgress2.lanes, lane);
                  var update = createClassErrorUpdate(workInProgress2, createCapturedValueAtFiber(error$1, workInProgress2), lane);
                  enqueueCapturedUpdate(workInProgress2, update);
                  break;
                }
              }
              if (workInProgress2.type !== workInProgress2.elementType) {
                var innerPropTypes = Component.propTypes;
                if (innerPropTypes) {
                  checkPropTypes(
                    innerPropTypes,
                    nextProps,
                    // Resolved props
                    "prop",
                    getComponentNameFromType(Component)
                  );
                }
              }
            }
            var hasContext;
            if (isContextProvider(Component)) {
              hasContext = true;
              pushContextProvider(workInProgress2);
            } else {
              hasContext = false;
            }
            prepareToReadContext(workInProgress2, renderLanes2);
            var instance = workInProgress2.stateNode;
            var shouldUpdate;
            if (instance === null) {
              resetSuspendedCurrentOnMountInLegacyMode(current2, workInProgress2);
              constructClassInstance(workInProgress2, Component, nextProps);
              mountClassInstance(workInProgress2, Component, nextProps, renderLanes2);
              shouldUpdate = true;
            } else if (current2 === null) {
              shouldUpdate = resumeMountClassInstance(workInProgress2, Component, nextProps, renderLanes2);
            } else {
              shouldUpdate = updateClassInstance(current2, workInProgress2, Component, nextProps, renderLanes2);
            }
            var nextUnitOfWork = finishClassComponent(current2, workInProgress2, Component, shouldUpdate, hasContext, renderLanes2);
            {
              var inst = workInProgress2.stateNode;
              if (shouldUpdate && inst.props !== nextProps) {
                if (!didWarnAboutReassigningProps) {
                  error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", getComponentNameFromFiber(workInProgress2) || "a component");
                }
                didWarnAboutReassigningProps = true;
              }
            }
            return nextUnitOfWork;
          }
          function finishClassComponent(current2, workInProgress2, Component, shouldUpdate, hasContext, renderLanes2) {
            markRef(current2, workInProgress2);
            var didCaptureError = (workInProgress2.flags & DidCapture) !== NoFlags;
            if (!shouldUpdate && !didCaptureError) {
              if (hasContext) {
                invalidateContextProvider(workInProgress2, Component, false);
              }
              return bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderLanes2);
            }
            var instance = workInProgress2.stateNode;
            ReactCurrentOwner$1.current = workInProgress2;
            var nextChildren;
            if (didCaptureError && typeof Component.getDerivedStateFromError !== "function") {
              nextChildren = null;
              {
                stopProfilerTimerIfRunning();
              }
            } else {
              {
                markComponentRenderStarted(workInProgress2);
              }
              {
                setIsRendering(true);
                nextChildren = instance.render();
                if (workInProgress2.mode & StrictLegacyMode) {
                  setIsStrictModeForDevtools(true);
                  try {
                    instance.render();
                  } finally {
                    setIsStrictModeForDevtools(false);
                  }
                }
                setIsRendering(false);
              }
              {
                markComponentRenderStopped();
              }
            }
            workInProgress2.flags |= PerformedWork;
            if (current2 !== null && didCaptureError) {
              forceUnmountCurrentAndReconcile(current2, workInProgress2, nextChildren, renderLanes2);
            } else {
              reconcileChildren(current2, workInProgress2, nextChildren, renderLanes2);
            }
            workInProgress2.memoizedState = instance.state;
            if (hasContext) {
              invalidateContextProvider(workInProgress2, Component, true);
            }
            return workInProgress2.child;
          }
          function pushHostRootContext(workInProgress2) {
            var root = workInProgress2.stateNode;
            if (root.pendingContext) {
              pushTopLevelContextObject(workInProgress2, root.pendingContext, root.pendingContext !== root.context);
            } else if (root.context) {
              pushTopLevelContextObject(workInProgress2, root.context, false);
            }
            pushHostContainer(workInProgress2, root.containerInfo);
          }
          function updateHostRoot(current2, workInProgress2, renderLanes2) {
            pushHostRootContext(workInProgress2);
            if (current2 === null) {
              throw new Error("Should have a current fiber. This is a bug in React.");
            }
            var nextProps = workInProgress2.pendingProps;
            var prevState = workInProgress2.memoizedState;
            var prevChildren = prevState.element;
            cloneUpdateQueue(current2, workInProgress2);
            processUpdateQueue(workInProgress2, nextProps, null, renderLanes2);
            var nextState = workInProgress2.memoizedState;
            var root = workInProgress2.stateNode;
            var nextChildren = nextState.element;
            if (supportsHydration && prevState.isDehydrated) {
              var overrideState = {
                element: nextChildren,
                isDehydrated: false,
                cache: nextState.cache,
                pendingSuspenseBoundaries: nextState.pendingSuspenseBoundaries,
                transitions: nextState.transitions
              };
              var updateQueue = workInProgress2.updateQueue;
              updateQueue.baseState = overrideState;
              workInProgress2.memoizedState = overrideState;
              if (workInProgress2.flags & ForceClientRender) {
                var recoverableError = createCapturedValueAtFiber(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), workInProgress2);
                return mountHostRootWithoutHydrating(current2, workInProgress2, nextChildren, renderLanes2, recoverableError);
              } else if (nextChildren !== prevChildren) {
                var _recoverableError = createCapturedValueAtFiber(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), workInProgress2);
                return mountHostRootWithoutHydrating(current2, workInProgress2, nextChildren, renderLanes2, _recoverableError);
              } else {
                enterHydrationState(workInProgress2);
                var child = mountChildFibers(workInProgress2, null, nextChildren, renderLanes2);
                workInProgress2.child = child;
                var node = child;
                while (node) {
                  node.flags = node.flags & ~Placement | Hydrating;
                  node = node.sibling;
                }
              }
            } else {
              resetHydrationState();
              if (nextChildren === prevChildren) {
                return bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderLanes2);
              }
              reconcileChildren(current2, workInProgress2, nextChildren, renderLanes2);
            }
            return workInProgress2.child;
          }
          function mountHostRootWithoutHydrating(current2, workInProgress2, nextChildren, renderLanes2, recoverableError) {
            resetHydrationState();
            queueHydrationError(recoverableError);
            workInProgress2.flags |= ForceClientRender;
            reconcileChildren(current2, workInProgress2, nextChildren, renderLanes2);
            return workInProgress2.child;
          }
          function updateHostComponent(current2, workInProgress2, renderLanes2) {
            pushHostContext(workInProgress2);
            if (current2 === null) {
              tryToClaimNextHydratableInstance(workInProgress2);
            }
            var type = workInProgress2.type;
            var nextProps = workInProgress2.pendingProps;
            var prevProps = current2 !== null ? current2.memoizedProps : null;
            var nextChildren = nextProps.children;
            var isDirectTextChild = shouldSetTextContent(type, nextProps);
            if (isDirectTextChild) {
              nextChildren = null;
            } else if (prevProps !== null && shouldSetTextContent(type, prevProps)) {
              workInProgress2.flags |= ContentReset;
            }
            markRef(current2, workInProgress2);
            reconcileChildren(current2, workInProgress2, nextChildren, renderLanes2);
            return workInProgress2.child;
          }
          function updateHostText(current2, workInProgress2) {
            if (current2 === null) {
              tryToClaimNextHydratableInstance(workInProgress2);
            }
            return null;
          }
          function mountLazyComponent(_current, workInProgress2, elementType, renderLanes2) {
            resetSuspendedCurrentOnMountInLegacyMode(_current, workInProgress2);
            var props = workInProgress2.pendingProps;
            var lazyComponent = elementType;
            var payload = lazyComponent._payload;
            var init = lazyComponent._init;
            var Component = init(payload);
            workInProgress2.type = Component;
            var resolvedTag = workInProgress2.tag = resolveLazyComponentTag(Component);
            var resolvedProps = resolveDefaultProps(Component, props);
            var child;
            switch (resolvedTag) {
              case FunctionComponent: {
                {
                  validateFunctionComponentInDev(workInProgress2, Component);
                  workInProgress2.type = Component = resolveFunctionForHotReloading(Component);
                }
                child = updateFunctionComponent(null, workInProgress2, Component, resolvedProps, renderLanes2);
                return child;
              }
              case ClassComponent: {
                {
                  workInProgress2.type = Component = resolveClassForHotReloading(Component);
                }
                child = updateClassComponent(null, workInProgress2, Component, resolvedProps, renderLanes2);
                return child;
              }
              case ForwardRef: {
                {
                  workInProgress2.type = Component = resolveForwardRefForHotReloading(Component);
                }
                child = updateForwardRef(null, workInProgress2, Component, resolvedProps, renderLanes2);
                return child;
              }
              case MemoComponent: {
                {
                  if (workInProgress2.type !== workInProgress2.elementType) {
                    var outerPropTypes = Component.propTypes;
                    if (outerPropTypes) {
                      checkPropTypes(
                        outerPropTypes,
                        resolvedProps,
                        // Resolved for outer only
                        "prop",
                        getComponentNameFromType(Component)
                      );
                    }
                  }
                }
                child = updateMemoComponent(
                  null,
                  workInProgress2,
                  Component,
                  resolveDefaultProps(Component.type, resolvedProps),
                  // The inner type can have defaults too
                  renderLanes2
                );
                return child;
              }
            }
            var hint = "";
            {
              if (Component !== null && typeof Component === "object" && Component.$$typeof === REACT_LAZY_TYPE) {
                hint = " Did you wrap a component in React.lazy() more than once?";
              }
            }
            throw new Error("Element type is invalid. Received a promise that resolves to: " + Component + ". " + ("Lazy element type must resolve to a class or function." + hint));
          }
          function mountIncompleteClassComponent(_current, workInProgress2, Component, nextProps, renderLanes2) {
            resetSuspendedCurrentOnMountInLegacyMode(_current, workInProgress2);
            workInProgress2.tag = ClassComponent;
            var hasContext;
            if (isContextProvider(Component)) {
              hasContext = true;
              pushContextProvider(workInProgress2);
            } else {
              hasContext = false;
            }
            prepareToReadContext(workInProgress2, renderLanes2);
            constructClassInstance(workInProgress2, Component, nextProps);
            mountClassInstance(workInProgress2, Component, nextProps, renderLanes2);
            return finishClassComponent(null, workInProgress2, Component, true, hasContext, renderLanes2);
          }
          function mountIndeterminateComponent(_current, workInProgress2, Component, renderLanes2) {
            resetSuspendedCurrentOnMountInLegacyMode(_current, workInProgress2);
            var props = workInProgress2.pendingProps;
            var context;
            {
              var unmaskedContext = getUnmaskedContext(workInProgress2, Component, false);
              context = getMaskedContext(workInProgress2, unmaskedContext);
            }
            prepareToReadContext(workInProgress2, renderLanes2);
            var value;
            var hasId;
            {
              markComponentRenderStarted(workInProgress2);
            }
            {
              if (Component.prototype && typeof Component.prototype.render === "function") {
                var componentName = getComponentNameFromType(Component) || "Unknown";
                if (!didWarnAboutBadClass[componentName]) {
                  error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", componentName, componentName);
                  didWarnAboutBadClass[componentName] = true;
                }
              }
              if (workInProgress2.mode & StrictLegacyMode) {
                ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress2, null);
              }
              setIsRendering(true);
              ReactCurrentOwner$1.current = workInProgress2;
              value = renderWithHooks(null, workInProgress2, Component, props, context, renderLanes2);
              hasId = checkDidRenderIdHook();
              setIsRendering(false);
            }
            {
              markComponentRenderStopped();
            }
            workInProgress2.flags |= PerformedWork;
            {
              if (typeof value === "object" && value !== null && typeof value.render === "function" && value.$$typeof === void 0) {
                var _componentName = getComponentNameFromType(Component) || "Unknown";
                if (!didWarnAboutModulePatternComponent[_componentName]) {
                  error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName, _componentName, _componentName);
                  didWarnAboutModulePatternComponent[_componentName] = true;
                }
              }
            }
            if (
              // Run these checks in production only if the flag is off.
              // Eventually we'll delete this branch altogether.
              typeof value === "object" && value !== null && typeof value.render === "function" && value.$$typeof === void 0
            ) {
              {
                var _componentName2 = getComponentNameFromType(Component) || "Unknown";
                if (!didWarnAboutModulePatternComponent[_componentName2]) {
                  error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName2, _componentName2, _componentName2);
                  didWarnAboutModulePatternComponent[_componentName2] = true;
                }
              }
              workInProgress2.tag = ClassComponent;
              workInProgress2.memoizedState = null;
              workInProgress2.updateQueue = null;
              var hasContext = false;
              if (isContextProvider(Component)) {
                hasContext = true;
                pushContextProvider(workInProgress2);
              } else {
                hasContext = false;
              }
              workInProgress2.memoizedState = value.state !== null && value.state !== void 0 ? value.state : null;
              initializeUpdateQueue(workInProgress2);
              adoptClassInstance(workInProgress2, value);
              mountClassInstance(workInProgress2, Component, props, renderLanes2);
              return finishClassComponent(null, workInProgress2, Component, true, hasContext, renderLanes2);
            } else {
              workInProgress2.tag = FunctionComponent;
              {
                if (workInProgress2.mode & StrictLegacyMode) {
                  setIsStrictModeForDevtools(true);
                  try {
                    value = renderWithHooks(null, workInProgress2, Component, props, context, renderLanes2);
                    hasId = checkDidRenderIdHook();
                  } finally {
                    setIsStrictModeForDevtools(false);
                  }
                }
              }
              if (getIsHydrating() && hasId) {
                pushMaterializedTreeId(workInProgress2);
              }
              reconcileChildren(null, workInProgress2, value, renderLanes2);
              {
                validateFunctionComponentInDev(workInProgress2, Component);
              }
              return workInProgress2.child;
            }
          }
          function validateFunctionComponentInDev(workInProgress2, Component) {
            {
              if (Component) {
                if (Component.childContextTypes) {
                  error("%s(...): childContextTypes cannot be defined on a function component.", Component.displayName || Component.name || "Component");
                }
              }
              if (workInProgress2.ref !== null) {
                var info = "";
                var ownerName = getCurrentFiberOwnerNameInDevOrNull();
                if (ownerName) {
                  info += "\n\nCheck the render method of `" + ownerName + "`.";
                }
                var warningKey = ownerName || "";
                var debugSource = workInProgress2._debugSource;
                if (debugSource) {
                  warningKey = debugSource.fileName + ":" + debugSource.lineNumber;
                }
                if (!didWarnAboutFunctionRefs[warningKey]) {
                  didWarnAboutFunctionRefs[warningKey] = true;
                  error("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", info);
                }
              }
              if (Component.defaultProps !== void 0) {
                var componentName = getComponentNameFromType(Component) || "Unknown";
                if (!didWarnAboutDefaultPropsOnFunctionComponent[componentName]) {
                  error("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", componentName);
                  didWarnAboutDefaultPropsOnFunctionComponent[componentName] = true;
                }
              }
              if (typeof Component.getDerivedStateFromProps === "function") {
                var _componentName3 = getComponentNameFromType(Component) || "Unknown";
                if (!didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3]) {
                  error("%s: Function components do not support getDerivedStateFromProps.", _componentName3);
                  didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3] = true;
                }
              }
              if (typeof Component.contextType === "object" && Component.contextType !== null) {
                var _componentName4 = getComponentNameFromType(Component) || "Unknown";
                if (!didWarnAboutContextTypeOnFunctionComponent[_componentName4]) {
                  error("%s: Function components do not support contextType.", _componentName4);
                  didWarnAboutContextTypeOnFunctionComponent[_componentName4] = true;
                }
              }
            }
          }
          var SUSPENDED_MARKER = {
            dehydrated: null,
            treeContext: null,
            retryLane: NoLane
          };
          function mountSuspenseOffscreenState(renderLanes2) {
            return {
              baseLanes: renderLanes2,
              cachePool: getSuspendedCache(),
              transitions: null
            };
          }
          function updateSuspenseOffscreenState(prevOffscreenState, renderLanes2) {
            var cachePool = null;
            return {
              baseLanes: mergeLanes(prevOffscreenState.baseLanes, renderLanes2),
              cachePool,
              transitions: prevOffscreenState.transitions
            };
          }
          function shouldRemainOnFallback(suspenseContext, current2, workInProgress2, renderLanes2) {
            if (current2 !== null) {
              var suspenseState = current2.memoizedState;
              if (suspenseState === null) {
                return false;
              }
            }
            return hasSuspenseContext(suspenseContext, ForceSuspenseFallback);
          }
          function getRemainingWorkInPrimaryTree(current2, renderLanes2) {
            return removeLanes(current2.childLanes, renderLanes2);
          }
          function updateSuspenseComponent(current2, workInProgress2, renderLanes2) {
            var nextProps = workInProgress2.pendingProps;
            {
              if (shouldSuspend(workInProgress2)) {
                workInProgress2.flags |= DidCapture;
              }
            }
            var suspenseContext = suspenseStackCursor.current;
            var showFallback = false;
            var didSuspend = (workInProgress2.flags & DidCapture) !== NoFlags;
            if (didSuspend || shouldRemainOnFallback(suspenseContext, current2)) {
              showFallback = true;
              workInProgress2.flags &= ~DidCapture;
            } else {
              if (current2 === null || current2.memoizedState !== null) {
                {
                  suspenseContext = addSubtreeSuspenseContext(suspenseContext, InvisibleParentSuspenseContext);
                }
              }
            }
            suspenseContext = setDefaultShallowSuspenseContext(suspenseContext);
            pushSuspenseContext(workInProgress2, suspenseContext);
            if (current2 === null) {
              tryToClaimNextHydratableInstance(workInProgress2);
              var suspenseState = workInProgress2.memoizedState;
              if (suspenseState !== null) {
                var dehydrated = suspenseState.dehydrated;
                if (dehydrated !== null) {
                  return mountDehydratedSuspenseComponent(workInProgress2, dehydrated);
                }
              }
              var nextPrimaryChildren = nextProps.children;
              var nextFallbackChildren = nextProps.fallback;
              if (showFallback) {
                var fallbackFragment = mountSuspenseFallbackChildren(workInProgress2, nextPrimaryChildren, nextFallbackChildren, renderLanes2);
                var primaryChildFragment = workInProgress2.child;
                primaryChildFragment.memoizedState = mountSuspenseOffscreenState(renderLanes2);
                workInProgress2.memoizedState = SUSPENDED_MARKER;
                return fallbackFragment;
              } else {
                return mountSuspensePrimaryChildren(workInProgress2, nextPrimaryChildren);
              }
            } else {
              var prevState = current2.memoizedState;
              if (prevState !== null) {
                var _dehydrated = prevState.dehydrated;
                if (_dehydrated !== null) {
                  return updateDehydratedSuspenseComponent(current2, workInProgress2, didSuspend, nextProps, _dehydrated, prevState, renderLanes2);
                }
              }
              if (showFallback) {
                var _nextFallbackChildren = nextProps.fallback;
                var _nextPrimaryChildren = nextProps.children;
                var fallbackChildFragment = updateSuspenseFallbackChildren(current2, workInProgress2, _nextPrimaryChildren, _nextFallbackChildren, renderLanes2);
                var _primaryChildFragment2 = workInProgress2.child;
                var prevOffscreenState = current2.child.memoizedState;
                _primaryChildFragment2.memoizedState = prevOffscreenState === null ? mountSuspenseOffscreenState(renderLanes2) : updateSuspenseOffscreenState(prevOffscreenState, renderLanes2);
                _primaryChildFragment2.childLanes = getRemainingWorkInPrimaryTree(current2, renderLanes2);
                workInProgress2.memoizedState = SUSPENDED_MARKER;
                return fallbackChildFragment;
              } else {
                var _nextPrimaryChildren2 = nextProps.children;
                var _primaryChildFragment3 = updateSuspensePrimaryChildren(current2, workInProgress2, _nextPrimaryChildren2, renderLanes2);
                workInProgress2.memoizedState = null;
                return _primaryChildFragment3;
              }
            }
          }
          function mountSuspensePrimaryChildren(workInProgress2, primaryChildren, renderLanes2) {
            var mode = workInProgress2.mode;
            var primaryChildProps = {
              mode: "visible",
              children: primaryChildren
            };
            var primaryChildFragment = mountWorkInProgressOffscreenFiber(primaryChildProps, mode);
            primaryChildFragment.return = workInProgress2;
            workInProgress2.child = primaryChildFragment;
            return primaryChildFragment;
          }
          function mountSuspenseFallbackChildren(workInProgress2, primaryChildren, fallbackChildren, renderLanes2) {
            var mode = workInProgress2.mode;
            var progressedPrimaryFragment = workInProgress2.child;
            var primaryChildProps = {
              mode: "hidden",
              children: primaryChildren
            };
            var primaryChildFragment;
            var fallbackChildFragment;
            if ((mode & ConcurrentMode) === NoMode && progressedPrimaryFragment !== null) {
              primaryChildFragment = progressedPrimaryFragment;
              primaryChildFragment.childLanes = NoLanes;
              primaryChildFragment.pendingProps = primaryChildProps;
              if (workInProgress2.mode & ProfileMode) {
                primaryChildFragment.actualDuration = 0;
                primaryChildFragment.actualStartTime = -1;
                primaryChildFragment.selfBaseDuration = 0;
                primaryChildFragment.treeBaseDuration = 0;
              }
              fallbackChildFragment = createFiberFromFragment(fallbackChildren, mode, renderLanes2, null);
            } else {
              primaryChildFragment = mountWorkInProgressOffscreenFiber(primaryChildProps, mode);
              fallbackChildFragment = createFiberFromFragment(fallbackChildren, mode, renderLanes2, null);
            }
            primaryChildFragment.return = workInProgress2;
            fallbackChildFragment.return = workInProgress2;
            primaryChildFragment.sibling = fallbackChildFragment;
            workInProgress2.child = primaryChildFragment;
            return fallbackChildFragment;
          }
          function mountWorkInProgressOffscreenFiber(offscreenProps, mode, renderLanes2) {
            return createFiberFromOffscreen(offscreenProps, mode, NoLanes, null);
          }
          function updateWorkInProgressOffscreenFiber(current2, offscreenProps) {
            return createWorkInProgress(current2, offscreenProps);
          }
          function updateSuspensePrimaryChildren(current2, workInProgress2, primaryChildren, renderLanes2) {
            var currentPrimaryChildFragment = current2.child;
            var currentFallbackChildFragment = currentPrimaryChildFragment.sibling;
            var primaryChildFragment = updateWorkInProgressOffscreenFiber(currentPrimaryChildFragment, {
              mode: "visible",
              children: primaryChildren
            });
            if ((workInProgress2.mode & ConcurrentMode) === NoMode) {
              primaryChildFragment.lanes = renderLanes2;
            }
            primaryChildFragment.return = workInProgress2;
            primaryChildFragment.sibling = null;
            if (currentFallbackChildFragment !== null) {
              var deletions = workInProgress2.deletions;
              if (deletions === null) {
                workInProgress2.deletions = [currentFallbackChildFragment];
                workInProgress2.flags |= ChildDeletion;
              } else {
                deletions.push(currentFallbackChildFragment);
              }
            }
            workInProgress2.child = primaryChildFragment;
            return primaryChildFragment;
          }
          function updateSuspenseFallbackChildren(current2, workInProgress2, primaryChildren, fallbackChildren, renderLanes2) {
            var mode = workInProgress2.mode;
            var currentPrimaryChildFragment = current2.child;
            var currentFallbackChildFragment = currentPrimaryChildFragment.sibling;
            var primaryChildProps = {
              mode: "hidden",
              children: primaryChildren
            };
            var primaryChildFragment;
            if (
              // In legacy mode, we commit the primary tree as if it successfully
              // completed, even though it's in an inconsistent state.
              (mode & ConcurrentMode) === NoMode && // Make sure we're on the second pass, i.e. the primary child fragment was
              // already cloned. In legacy mode, the only case where this isn't true is
              // when DevTools forces us to display a fallback; we skip the first render
              // pass entirely and go straight to rendering the fallback. (In Concurrent
              // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
              // only codepath.)
              workInProgress2.child !== currentPrimaryChildFragment
            ) {
              var progressedPrimaryFragment = workInProgress2.child;
              primaryChildFragment = progressedPrimaryFragment;
              primaryChildFragment.childLanes = NoLanes;
              primaryChildFragment.pendingProps = primaryChildProps;
              if (workInProgress2.mode & ProfileMode) {
                primaryChildFragment.actualDuration = 0;
                primaryChildFragment.actualStartTime = -1;
                primaryChildFragment.selfBaseDuration = currentPrimaryChildFragment.selfBaseDuration;
                primaryChildFragment.treeBaseDuration = currentPrimaryChildFragment.treeBaseDuration;
              }
              workInProgress2.deletions = null;
            } else {
              primaryChildFragment = updateWorkInProgressOffscreenFiber(currentPrimaryChildFragment, primaryChildProps);
              primaryChildFragment.subtreeFlags = currentPrimaryChildFragment.subtreeFlags & StaticMask;
            }
            var fallbackChildFragment;
            if (currentFallbackChildFragment !== null) {
              fallbackChildFragment = createWorkInProgress(currentFallbackChildFragment, fallbackChildren);
            } else {
              fallbackChildFragment = createFiberFromFragment(fallbackChildren, mode, renderLanes2, null);
              fallbackChildFragment.flags |= Placement;
            }
            fallbackChildFragment.return = workInProgress2;
            primaryChildFragment.return = workInProgress2;
            primaryChildFragment.sibling = fallbackChildFragment;
            workInProgress2.child = primaryChildFragment;
            return fallbackChildFragment;
          }
          function retrySuspenseComponentWithoutHydrating(current2, workInProgress2, renderLanes2, recoverableError) {
            if (recoverableError !== null) {
              queueHydrationError(recoverableError);
            }
            reconcileChildFibers(workInProgress2, current2.child, null, renderLanes2);
            var nextProps = workInProgress2.pendingProps;
            var primaryChildren = nextProps.children;
            var primaryChildFragment = mountSuspensePrimaryChildren(workInProgress2, primaryChildren);
            primaryChildFragment.flags |= Placement;
            workInProgress2.memoizedState = null;
            return primaryChildFragment;
          }
          function mountSuspenseFallbackAfterRetryWithoutHydrating(current2, workInProgress2, primaryChildren, fallbackChildren, renderLanes2) {
            var fiberMode = workInProgress2.mode;
            var primaryChildProps = {
              mode: "visible",
              children: primaryChildren
            };
            var primaryChildFragment = mountWorkInProgressOffscreenFiber(primaryChildProps, fiberMode);
            var fallbackChildFragment = createFiberFromFragment(fallbackChildren, fiberMode, renderLanes2, null);
            fallbackChildFragment.flags |= Placement;
            primaryChildFragment.return = workInProgress2;
            fallbackChildFragment.return = workInProgress2;
            primaryChildFragment.sibling = fallbackChildFragment;
            workInProgress2.child = primaryChildFragment;
            if ((workInProgress2.mode & ConcurrentMode) !== NoMode) {
              reconcileChildFibers(workInProgress2, current2.child, null, renderLanes2);
            }
            return fallbackChildFragment;
          }
          function mountDehydratedSuspenseComponent(workInProgress2, suspenseInstance, renderLanes2) {
            if ((workInProgress2.mode & ConcurrentMode) === NoMode) {
              {
                error("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components.");
              }
              workInProgress2.lanes = laneToLanes(SyncLane);
            } else if (isSuspenseInstanceFallback(suspenseInstance)) {
              workInProgress2.lanes = laneToLanes(DefaultHydrationLane);
            } else {
              workInProgress2.lanes = laneToLanes(OffscreenLane);
            }
            return null;
          }
          function updateDehydratedSuspenseComponent(current2, workInProgress2, didSuspend, nextProps, suspenseInstance, suspenseState, renderLanes2) {
            if (!didSuspend) {
              warnIfHydrating();
              if ((workInProgress2.mode & ConcurrentMode) === NoMode) {
                return retrySuspenseComponentWithoutHydrating(
                  current2,
                  workInProgress2,
                  renderLanes2,
                  // TODO: When we delete legacy mode, we should make this error argument
                  // required — every concurrent mode path that causes hydration to
                  // de-opt to client rendering should have an error message.
                  null
                );
              }
              if (isSuspenseInstanceFallback(suspenseInstance)) {
                var digest, message, stack;
                {
                  var _getSuspenseInstanceF = getSuspenseInstanceFallbackErrorDetails(suspenseInstance);
                  digest = _getSuspenseInstanceF.digest;
                  message = _getSuspenseInstanceF.message;
                  stack = _getSuspenseInstanceF.stack;
                }
                var error2;
                if (message) {
                  error2 = new Error(message);
                } else {
                  error2 = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
                }
                var capturedValue = createCapturedValue(error2, digest, stack);
                return retrySuspenseComponentWithoutHydrating(current2, workInProgress2, renderLanes2, capturedValue);
              }
              var hasContextChanged2 = includesSomeLane(renderLanes2, current2.childLanes);
              if (didReceiveUpdate || hasContextChanged2) {
                var root = getWorkInProgressRoot();
                if (root !== null) {
                  var attemptHydrationAtLane = getBumpedLaneForHydration(root, renderLanes2);
                  if (attemptHydrationAtLane !== NoLane && attemptHydrationAtLane !== suspenseState.retryLane) {
                    suspenseState.retryLane = attemptHydrationAtLane;
                    var eventTime = NoTimestamp;
                    enqueueConcurrentRenderForLane(current2, attemptHydrationAtLane);
                    scheduleUpdateOnFiber(root, current2, attemptHydrationAtLane, eventTime);
                  }
                }
                renderDidSuspendDelayIfPossible();
                var _capturedValue = createCapturedValue(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
                return retrySuspenseComponentWithoutHydrating(current2, workInProgress2, renderLanes2, _capturedValue);
              } else if (isSuspenseInstancePending(suspenseInstance)) {
                workInProgress2.flags |= DidCapture;
                workInProgress2.child = current2.child;
                var retry = retryDehydratedSuspenseBoundary.bind(null, current2);
                registerSuspenseInstanceRetry(suspenseInstance, retry);
                return null;
              } else {
                reenterHydrationStateFromDehydratedSuspenseInstance(workInProgress2, suspenseInstance, suspenseState.treeContext);
                var primaryChildren = nextProps.children;
                var primaryChildFragment = mountSuspensePrimaryChildren(workInProgress2, primaryChildren);
                primaryChildFragment.flags |= Hydrating;
                return primaryChildFragment;
              }
            } else {
              if (workInProgress2.flags & ForceClientRender) {
                workInProgress2.flags &= ~ForceClientRender;
                var _capturedValue2 = createCapturedValue(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
                return retrySuspenseComponentWithoutHydrating(current2, workInProgress2, renderLanes2, _capturedValue2);
              } else if (workInProgress2.memoizedState !== null) {
                workInProgress2.child = current2.child;
                workInProgress2.flags |= DidCapture;
                return null;
              } else {
                var nextPrimaryChildren = nextProps.children;
                var nextFallbackChildren = nextProps.fallback;
                var fallbackChildFragment = mountSuspenseFallbackAfterRetryWithoutHydrating(current2, workInProgress2, nextPrimaryChildren, nextFallbackChildren, renderLanes2);
                var _primaryChildFragment4 = workInProgress2.child;
                _primaryChildFragment4.memoizedState = mountSuspenseOffscreenState(renderLanes2);
                workInProgress2.memoizedState = SUSPENDED_MARKER;
                return fallbackChildFragment;
              }
            }
          }
          function scheduleSuspenseWorkOnFiber(fiber, renderLanes2, propagationRoot) {
            fiber.lanes = mergeLanes(fiber.lanes, renderLanes2);
            var alternate = fiber.alternate;
            if (alternate !== null) {
              alternate.lanes = mergeLanes(alternate.lanes, renderLanes2);
            }
            scheduleContextWorkOnParentPath(fiber.return, renderLanes2, propagationRoot);
          }
          function propagateSuspenseContextChange(workInProgress2, firstChild, renderLanes2) {
            var node = firstChild;
            while (node !== null) {
              if (node.tag === SuspenseComponent) {
                var state = node.memoizedState;
                if (state !== null) {
                  scheduleSuspenseWorkOnFiber(node, renderLanes2, workInProgress2);
                }
              } else if (node.tag === SuspenseListComponent) {
                scheduleSuspenseWorkOnFiber(node, renderLanes2, workInProgress2);
              } else if (node.child !== null) {
                node.child.return = node;
                node = node.child;
                continue;
              }
              if (node === workInProgress2) {
                return;
              }
              while (node.sibling === null) {
                if (node.return === null || node.return === workInProgress2) {
                  return;
                }
                node = node.return;
              }
              node.sibling.return = node.return;
              node = node.sibling;
            }
          }
          function findLastContentRow(firstChild) {
            var row = firstChild;
            var lastContentRow = null;
            while (row !== null) {
              var currentRow = row.alternate;
              if (currentRow !== null && findFirstSuspended(currentRow) === null) {
                lastContentRow = row;
              }
              row = row.sibling;
            }
            return lastContentRow;
          }
          function validateRevealOrder(revealOrder) {
            {
              if (revealOrder !== void 0 && revealOrder !== "forwards" && revealOrder !== "backwards" && revealOrder !== "together" && !didWarnAboutRevealOrder[revealOrder]) {
                didWarnAboutRevealOrder[revealOrder] = true;
                if (typeof revealOrder === "string") {
                  switch (revealOrder.toLowerCase()) {
                    case "together":
                    case "forwards":
                    case "backwards": {
                      error('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', revealOrder, revealOrder.toLowerCase());
                      break;
                    }
                    case "forward":
                    case "backward": {
                      error('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', revealOrder, revealOrder.toLowerCase());
                      break;
                    }
                    default:
                      error('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', revealOrder);
                      break;
                  }
                } else {
                  error('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', revealOrder);
                }
              }
            }
          }
          function validateTailOptions(tailMode, revealOrder) {
            {
              if (tailMode !== void 0 && !didWarnAboutTailOptions[tailMode]) {
                if (tailMode !== "collapsed" && tailMode !== "hidden") {
                  didWarnAboutTailOptions[tailMode] = true;
                  error('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', tailMode);
                } else if (revealOrder !== "forwards" && revealOrder !== "backwards") {
                  didWarnAboutTailOptions[tailMode] = true;
                  error('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', tailMode);
                }
              }
            }
          }
          function validateSuspenseListNestedChild(childSlot, index2) {
            {
              var isAnArray = isArray(childSlot);
              var isIterable = !isAnArray && typeof getIteratorFn(childSlot) === "function";
              if (isAnArray || isIterable) {
                var type = isAnArray ? "array" : "iterable";
                error("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", type, index2, type);
                return false;
              }
            }
            return true;
          }
          function validateSuspenseListChildren(children, revealOrder) {
            {
              if ((revealOrder === "forwards" || revealOrder === "backwards") && children !== void 0 && children !== null && children !== false) {
                if (isArray(children)) {
                  for (var i = 0; i < children.length; i++) {
                    if (!validateSuspenseListNestedChild(children[i], i)) {
                      return;
                    }
                  }
                } else {
                  var iteratorFn = getIteratorFn(children);
                  if (typeof iteratorFn === "function") {
                    var childrenIterator = iteratorFn.call(children);
                    if (childrenIterator) {
                      var step = childrenIterator.next();
                      var _i = 0;
                      for (; !step.done; step = childrenIterator.next()) {
                        if (!validateSuspenseListNestedChild(step.value, _i)) {
                          return;
                        }
                        _i++;
                      }
                    }
                  } else {
                    error('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', revealOrder);
                  }
                }
              }
            }
          }
          function initSuspenseListRenderState(workInProgress2, isBackwards, tail, lastContentRow, tailMode) {
            var renderState = workInProgress2.memoizedState;
            if (renderState === null) {
              workInProgress2.memoizedState = {
                isBackwards,
                rendering: null,
                renderingStartTime: 0,
                last: lastContentRow,
                tail,
                tailMode
              };
            } else {
              renderState.isBackwards = isBackwards;
              renderState.rendering = null;
              renderState.renderingStartTime = 0;
              renderState.last = lastContentRow;
              renderState.tail = tail;
              renderState.tailMode = tailMode;
            }
          }
          function updateSuspenseListComponent(current2, workInProgress2, renderLanes2) {
            var nextProps = workInProgress2.pendingProps;
            var revealOrder = nextProps.revealOrder;
            var tailMode = nextProps.tail;
            var newChildren = nextProps.children;
            validateRevealOrder(revealOrder);
            validateTailOptions(tailMode, revealOrder);
            validateSuspenseListChildren(newChildren, revealOrder);
            reconcileChildren(current2, workInProgress2, newChildren, renderLanes2);
            var suspenseContext = suspenseStackCursor.current;
            var shouldForceFallback = hasSuspenseContext(suspenseContext, ForceSuspenseFallback);
            if (shouldForceFallback) {
              suspenseContext = setShallowSuspenseContext(suspenseContext, ForceSuspenseFallback);
              workInProgress2.flags |= DidCapture;
            } else {
              var didSuspendBefore = current2 !== null && (current2.flags & DidCapture) !== NoFlags;
              if (didSuspendBefore) {
                propagateSuspenseContextChange(workInProgress2, workInProgress2.child, renderLanes2);
              }
              suspenseContext = setDefaultShallowSuspenseContext(suspenseContext);
            }
            pushSuspenseContext(workInProgress2, suspenseContext);
            if ((workInProgress2.mode & ConcurrentMode) === NoMode) {
              workInProgress2.memoizedState = null;
            } else {
              switch (revealOrder) {
                case "forwards": {
                  var lastContentRow = findLastContentRow(workInProgress2.child);
                  var tail;
                  if (lastContentRow === null) {
                    tail = workInProgress2.child;
                    workInProgress2.child = null;
                  } else {
                    tail = lastContentRow.sibling;
                    lastContentRow.sibling = null;
                  }
                  initSuspenseListRenderState(
                    workInProgress2,
                    false,
                    // isBackwards
                    tail,
                    lastContentRow,
                    tailMode
                  );
                  break;
                }
                case "backwards": {
                  var _tail = null;
                  var row = workInProgress2.child;
                  workInProgress2.child = null;
                  while (row !== null) {
                    var currentRow = row.alternate;
                    if (currentRow !== null && findFirstSuspended(currentRow) === null) {
                      workInProgress2.child = row;
                      break;
                    }
                    var nextRow = row.sibling;
                    row.sibling = _tail;
                    _tail = row;
                    row = nextRow;
                  }
                  initSuspenseListRenderState(
                    workInProgress2,
                    true,
                    // isBackwards
                    _tail,
                    null,
                    // last
                    tailMode
                  );
                  break;
                }
                case "together": {
                  initSuspenseListRenderState(
                    workInProgress2,
                    false,
                    // isBackwards
                    null,
                    // tail
                    null,
                    // last
                    void 0
                  );
                  break;
                }
                default: {
                  workInProgress2.memoizedState = null;
                }
              }
            }
            return workInProgress2.child;
          }
          function updatePortalComponent(current2, workInProgress2, renderLanes2) {
            pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
            var nextChildren = workInProgress2.pendingProps;
            if (current2 === null) {
              workInProgress2.child = reconcileChildFibers(workInProgress2, null, nextChildren, renderLanes2);
            } else {
              reconcileChildren(current2, workInProgress2, nextChildren, renderLanes2);
            }
            return workInProgress2.child;
          }
          var hasWarnedAboutUsingNoValuePropOnContextProvider = false;
          function updateContextProvider(current2, workInProgress2, renderLanes2) {
            var providerType = workInProgress2.type;
            var context = providerType._context;
            var newProps = workInProgress2.pendingProps;
            var oldProps = workInProgress2.memoizedProps;
            var newValue = newProps.value;
            {
              if (!("value" in newProps)) {
                if (!hasWarnedAboutUsingNoValuePropOnContextProvider) {
                  hasWarnedAboutUsingNoValuePropOnContextProvider = true;
                  error("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?");
                }
              }
              var providerPropTypes = workInProgress2.type.propTypes;
              if (providerPropTypes) {
                checkPropTypes(providerPropTypes, newProps, "prop", "Context.Provider");
              }
            }
            pushProvider(workInProgress2, context, newValue);
            {
              if (oldProps !== null) {
                var oldValue = oldProps.value;
                if (objectIs(oldValue, newValue)) {
                  if (oldProps.children === newProps.children && !hasContextChanged()) {
                    return bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderLanes2);
                  }
                } else {
                  propagateContextChange(workInProgress2, context, renderLanes2);
                }
              }
            }
            var newChildren = newProps.children;
            reconcileChildren(current2, workInProgress2, newChildren, renderLanes2);
            return workInProgress2.child;
          }
          var hasWarnedAboutUsingContextAsConsumer = false;
          function updateContextConsumer(current2, workInProgress2, renderLanes2) {
            var context = workInProgress2.type;
            {
              if (context._context === void 0) {
                if (context !== context.Consumer) {
                  if (!hasWarnedAboutUsingContextAsConsumer) {
                    hasWarnedAboutUsingContextAsConsumer = true;
                    error("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                  }
                }
              } else {
                context = context._context;
              }
            }
            var newProps = workInProgress2.pendingProps;
            var render2 = newProps.children;
            {
              if (typeof render2 !== "function") {
                error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it.");
              }
            }
            prepareToReadContext(workInProgress2, renderLanes2);
            var newValue = readContext(context);
            {
              markComponentRenderStarted(workInProgress2);
            }
            var newChildren;
            {
              ReactCurrentOwner$1.current = workInProgress2;
              setIsRendering(true);
              newChildren = render2(newValue);
              setIsRendering(false);
            }
            {
              markComponentRenderStopped();
            }
            workInProgress2.flags |= PerformedWork;
            reconcileChildren(current2, workInProgress2, newChildren, renderLanes2);
            return workInProgress2.child;
          }
          function markWorkInProgressReceivedUpdate() {
            didReceiveUpdate = true;
          }
          function resetSuspendedCurrentOnMountInLegacyMode(current2, workInProgress2) {
            if ((workInProgress2.mode & ConcurrentMode) === NoMode) {
              if (current2 !== null) {
                current2.alternate = null;
                workInProgress2.alternate = null;
                workInProgress2.flags |= Placement;
              }
            }
          }
          function bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderLanes2) {
            if (current2 !== null) {
              workInProgress2.dependencies = current2.dependencies;
            }
            {
              stopProfilerTimerIfRunning();
            }
            markSkippedUpdateLanes(workInProgress2.lanes);
            if (!includesSomeLane(renderLanes2, workInProgress2.childLanes)) {
              {
                return null;
              }
            }
            cloneChildFibers(current2, workInProgress2);
            return workInProgress2.child;
          }
          function remountFiber(current2, oldWorkInProgress, newWorkInProgress) {
            {
              var returnFiber = oldWorkInProgress.return;
              if (returnFiber === null) {
                throw new Error("Cannot swap the root fiber.");
              }
              current2.alternate = null;
              oldWorkInProgress.alternate = null;
              newWorkInProgress.index = oldWorkInProgress.index;
              newWorkInProgress.sibling = oldWorkInProgress.sibling;
              newWorkInProgress.return = oldWorkInProgress.return;
              newWorkInProgress.ref = oldWorkInProgress.ref;
              if (oldWorkInProgress === returnFiber.child) {
                returnFiber.child = newWorkInProgress;
              } else {
                var prevSibling = returnFiber.child;
                if (prevSibling === null) {
                  throw new Error("Expected parent to have a child.");
                }
                while (prevSibling.sibling !== oldWorkInProgress) {
                  prevSibling = prevSibling.sibling;
                  if (prevSibling === null) {
                    throw new Error("Expected to find the previous sibling.");
                  }
                }
                prevSibling.sibling = newWorkInProgress;
              }
              var deletions = returnFiber.deletions;
              if (deletions === null) {
                returnFiber.deletions = [current2];
                returnFiber.flags |= ChildDeletion;
              } else {
                deletions.push(current2);
              }
              newWorkInProgress.flags |= Placement;
              return newWorkInProgress;
            }
          }
          function checkScheduledUpdateOrContext(current2, renderLanes2) {
            var updateLanes = current2.lanes;
            if (includesSomeLane(updateLanes, renderLanes2)) {
              return true;
            }
            return false;
          }
          function attemptEarlyBailoutIfNoScheduledUpdate(current2, workInProgress2, renderLanes2) {
            switch (workInProgress2.tag) {
              case HostRoot:
                pushHostRootContext(workInProgress2);
                var root = workInProgress2.stateNode;
                resetHydrationState();
                break;
              case HostComponent:
                pushHostContext(workInProgress2);
                break;
              case ClassComponent: {
                var Component = workInProgress2.type;
                if (isContextProvider(Component)) {
                  pushContextProvider(workInProgress2);
                }
                break;
              }
              case HostPortal:
                pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
                break;
              case ContextProvider: {
                var newValue = workInProgress2.memoizedProps.value;
                var context = workInProgress2.type._context;
                pushProvider(workInProgress2, context, newValue);
                break;
              }
              case Profiler:
                {
                  var hasChildWork = includesSomeLane(renderLanes2, workInProgress2.childLanes);
                  if (hasChildWork) {
                    workInProgress2.flags |= Update;
                  }
                  {
                    var stateNode = workInProgress2.stateNode;
                    stateNode.effectDuration = 0;
                    stateNode.passiveEffectDuration = 0;
                  }
                }
                break;
              case SuspenseComponent: {
                var state = workInProgress2.memoizedState;
                if (state !== null) {
                  if (state.dehydrated !== null) {
                    pushSuspenseContext(workInProgress2, setDefaultShallowSuspenseContext(suspenseStackCursor.current));
                    workInProgress2.flags |= DidCapture;
                    return null;
                  }
                  var primaryChildFragment = workInProgress2.child;
                  var primaryChildLanes = primaryChildFragment.childLanes;
                  if (includesSomeLane(renderLanes2, primaryChildLanes)) {
                    return updateSuspenseComponent(current2, workInProgress2, renderLanes2);
                  } else {
                    pushSuspenseContext(workInProgress2, setDefaultShallowSuspenseContext(suspenseStackCursor.current));
                    var child = bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderLanes2);
                    if (child !== null) {
                      return child.sibling;
                    } else {
                      return null;
                    }
                  }
                } else {
                  pushSuspenseContext(workInProgress2, setDefaultShallowSuspenseContext(suspenseStackCursor.current));
                }
                break;
              }
              case SuspenseListComponent: {
                var didSuspendBefore = (current2.flags & DidCapture) !== NoFlags;
                var _hasChildWork = includesSomeLane(renderLanes2, workInProgress2.childLanes);
                if (didSuspendBefore) {
                  if (_hasChildWork) {
                    return updateSuspenseListComponent(current2, workInProgress2, renderLanes2);
                  }
                  workInProgress2.flags |= DidCapture;
                }
                var renderState = workInProgress2.memoizedState;
                if (renderState !== null) {
                  renderState.rendering = null;
                  renderState.tail = null;
                  renderState.lastEffect = null;
                }
                pushSuspenseContext(workInProgress2, suspenseStackCursor.current);
                if (_hasChildWork) {
                  break;
                } else {
                  return null;
                }
              }
              case OffscreenComponent:
              case LegacyHiddenComponent: {
                workInProgress2.lanes = NoLanes;
                return updateOffscreenComponent(current2, workInProgress2, renderLanes2);
              }
            }
            return bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderLanes2);
          }
          function beginWork(current2, workInProgress2, renderLanes2) {
            {
              if (workInProgress2._debugNeedsRemount && current2 !== null) {
                return remountFiber(current2, workInProgress2, createFiberFromTypeAndProps(workInProgress2.type, workInProgress2.key, workInProgress2.pendingProps, workInProgress2._debugOwner || null, workInProgress2.mode, workInProgress2.lanes));
              }
            }
            if (current2 !== null) {
              var oldProps = current2.memoizedProps;
              var newProps = workInProgress2.pendingProps;
              if (oldProps !== newProps || hasContextChanged() || // Force a re-render if the implementation changed due to hot reload:
              workInProgress2.type !== current2.type) {
                didReceiveUpdate = true;
              } else {
                var hasScheduledUpdateOrContext = checkScheduledUpdateOrContext(current2, renderLanes2);
                if (!hasScheduledUpdateOrContext && // If this is the second pass of an error or suspense boundary, there
                // may not be work scheduled on `current`, so we check for this flag.
                (workInProgress2.flags & DidCapture) === NoFlags) {
                  didReceiveUpdate = false;
                  return attemptEarlyBailoutIfNoScheduledUpdate(current2, workInProgress2, renderLanes2);
                }
                if ((current2.flags & ForceUpdateForLegacySuspense) !== NoFlags) {
                  didReceiveUpdate = true;
                } else {
                  didReceiveUpdate = false;
                }
              }
            } else {
              didReceiveUpdate = false;
              if (getIsHydrating() && isForkedChild(workInProgress2)) {
                var slotIndex = workInProgress2.index;
                var numberOfForks = getForksAtLevel();
                pushTreeId(workInProgress2, numberOfForks, slotIndex);
              }
            }
            workInProgress2.lanes = NoLanes;
            switch (workInProgress2.tag) {
              case IndeterminateComponent: {
                return mountIndeterminateComponent(current2, workInProgress2, workInProgress2.type, renderLanes2);
              }
              case LazyComponent: {
                var elementType = workInProgress2.elementType;
                return mountLazyComponent(current2, workInProgress2, elementType, renderLanes2);
              }
              case FunctionComponent: {
                var Component = workInProgress2.type;
                var unresolvedProps = workInProgress2.pendingProps;
                var resolvedProps = workInProgress2.elementType === Component ? unresolvedProps : resolveDefaultProps(Component, unresolvedProps);
                return updateFunctionComponent(current2, workInProgress2, Component, resolvedProps, renderLanes2);
              }
              case ClassComponent: {
                var _Component = workInProgress2.type;
                var _unresolvedProps = workInProgress2.pendingProps;
                var _resolvedProps = workInProgress2.elementType === _Component ? _unresolvedProps : resolveDefaultProps(_Component, _unresolvedProps);
                return updateClassComponent(current2, workInProgress2, _Component, _resolvedProps, renderLanes2);
              }
              case HostRoot:
                return updateHostRoot(current2, workInProgress2, renderLanes2);
              case HostComponent:
                return updateHostComponent(current2, workInProgress2, renderLanes2);
              case HostText:
                return updateHostText(current2, workInProgress2);
              case SuspenseComponent:
                return updateSuspenseComponent(current2, workInProgress2, renderLanes2);
              case HostPortal:
                return updatePortalComponent(current2, workInProgress2, renderLanes2);
              case ForwardRef: {
                var type = workInProgress2.type;
                var _unresolvedProps2 = workInProgress2.pendingProps;
                var _resolvedProps2 = workInProgress2.elementType === type ? _unresolvedProps2 : resolveDefaultProps(type, _unresolvedProps2);
                return updateForwardRef(current2, workInProgress2, type, _resolvedProps2, renderLanes2);
              }
              case Fragment2:
                return updateFragment(current2, workInProgress2, renderLanes2);
              case Mode:
                return updateMode(current2, workInProgress2, renderLanes2);
              case Profiler:
                return updateProfiler(current2, workInProgress2, renderLanes2);
              case ContextProvider:
                return updateContextProvider(current2, workInProgress2, renderLanes2);
              case ContextConsumer:
                return updateContextConsumer(current2, workInProgress2, renderLanes2);
              case MemoComponent: {
                var _type2 = workInProgress2.type;
                var _unresolvedProps3 = workInProgress2.pendingProps;
                var _resolvedProps3 = resolveDefaultProps(_type2, _unresolvedProps3);
                {
                  if (workInProgress2.type !== workInProgress2.elementType) {
                    var outerPropTypes = _type2.propTypes;
                    if (outerPropTypes) {
                      checkPropTypes(
                        outerPropTypes,
                        _resolvedProps3,
                        // Resolved for outer only
                        "prop",
                        getComponentNameFromType(_type2)
                      );
                    }
                  }
                }
                _resolvedProps3 = resolveDefaultProps(_type2.type, _resolvedProps3);
                return updateMemoComponent(current2, workInProgress2, _type2, _resolvedProps3, renderLanes2);
              }
              case SimpleMemoComponent: {
                return updateSimpleMemoComponent(current2, workInProgress2, workInProgress2.type, workInProgress2.pendingProps, renderLanes2);
              }
              case IncompleteClassComponent: {
                var _Component2 = workInProgress2.type;
                var _unresolvedProps4 = workInProgress2.pendingProps;
                var _resolvedProps4 = workInProgress2.elementType === _Component2 ? _unresolvedProps4 : resolveDefaultProps(_Component2, _unresolvedProps4);
                return mountIncompleteClassComponent(current2, workInProgress2, _Component2, _resolvedProps4, renderLanes2);
              }
              case SuspenseListComponent: {
                return updateSuspenseListComponent(current2, workInProgress2, renderLanes2);
              }
              case ScopeComponent: {
                break;
              }
              case OffscreenComponent: {
                return updateOffscreenComponent(current2, workInProgress2, renderLanes2);
              }
            }
            throw new Error("Unknown unit of work tag (" + workInProgress2.tag + "). This error is likely caused by a bug in React. Please file an issue.");
          }
          function markUpdate(workInProgress2) {
            workInProgress2.flags |= Update;
          }
          function markRef$1(workInProgress2) {
            workInProgress2.flags |= Ref;
            {
              workInProgress2.flags |= RefStatic;
            }
          }
          function hadNoMutationsEffects(current2, completedWork) {
            var didBailout = current2 !== null && current2.child === completedWork.child;
            if (didBailout) {
              return true;
            }
            if ((completedWork.flags & ChildDeletion) !== NoFlags) {
              return false;
            }
            var child = completedWork.child;
            while (child !== null) {
              if ((child.flags & MutationMask) !== NoFlags || (child.subtreeFlags & MutationMask) !== NoFlags) {
                return false;
              }
              child = child.sibling;
            }
            return true;
          }
          var appendAllChildren;
          var updateHostContainer;
          var updateHostComponent$1;
          var updateHostText$1;
          if (supportsMutation) {
            appendAllChildren = function(parent, workInProgress2, needsVisibilityToggle, isHidden) {
              var node = workInProgress2.child;
              while (node !== null) {
                if (node.tag === HostComponent || node.tag === HostText) {
                  appendInitialChild(parent, node.stateNode);
                } else if (node.tag === HostPortal)
                  ;
                else if (node.child !== null) {
                  node.child.return = node;
                  node = node.child;
                  continue;
                }
                if (node === workInProgress2) {
                  return;
                }
                while (node.sibling === null) {
                  if (node.return === null || node.return === workInProgress2) {
                    return;
                  }
                  node = node.return;
                }
                node.sibling.return = node.return;
                node = node.sibling;
              }
            };
            updateHostContainer = function(current2, workInProgress2) {
            };
            updateHostComponent$1 = function(current2, workInProgress2, type, newProps, rootContainerInstance) {
              var oldProps = current2.memoizedProps;
              if (oldProps === newProps) {
                return;
              }
              var instance = workInProgress2.stateNode;
              var currentHostContext = getHostContext();
              var updatePayload = prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance, currentHostContext);
              workInProgress2.updateQueue = updatePayload;
              if (updatePayload) {
                markUpdate(workInProgress2);
              }
            };
            updateHostText$1 = function(current2, workInProgress2, oldText, newText) {
              if (oldText !== newText) {
                markUpdate(workInProgress2);
              }
            };
          } else if (supportsPersistence) {
            appendAllChildren = function(parent, workInProgress2, needsVisibilityToggle, isHidden) {
              var node = workInProgress2.child;
              while (node !== null) {
                if (node.tag === HostComponent) {
                  var instance = node.stateNode;
                  if (needsVisibilityToggle && isHidden) {
                    var props = node.memoizedProps;
                    var type = node.type;
                    instance = cloneHiddenInstance(instance, type, props, node);
                  }
                  appendInitialChild(parent, instance);
                } else if (node.tag === HostText) {
                  var _instance = node.stateNode;
                  if (needsVisibilityToggle && isHidden) {
                    var text = node.memoizedProps;
                    _instance = cloneHiddenTextInstance(_instance, text, node);
                  }
                  appendInitialChild(parent, _instance);
                } else if (node.tag === HostPortal)
                  ;
                else if (node.tag === OffscreenComponent && node.memoizedState !== null) {
                  var child = node.child;
                  if (child !== null) {
                    child.return = node;
                  }
                  appendAllChildren(parent, node, true, true);
                } else if (node.child !== null) {
                  node.child.return = node;
                  node = node.child;
                  continue;
                }
                node = node;
                if (node === workInProgress2) {
                  return;
                }
                while (node.sibling === null) {
                  if (node.return === null || node.return === workInProgress2) {
                    return;
                  }
                  node = node.return;
                }
                node.sibling.return = node.return;
                node = node.sibling;
              }
            };
            var appendAllChildrenToContainer = function(containerChildSet, workInProgress2, needsVisibilityToggle, isHidden) {
              var node = workInProgress2.child;
              while (node !== null) {
                if (node.tag === HostComponent) {
                  var instance = node.stateNode;
                  if (needsVisibilityToggle && isHidden) {
                    var props = node.memoizedProps;
                    var type = node.type;
                    instance = cloneHiddenInstance(instance, type, props, node);
                  }
                  appendChildToContainerChildSet(containerChildSet, instance);
                } else if (node.tag === HostText) {
                  var _instance2 = node.stateNode;
                  if (needsVisibilityToggle && isHidden) {
                    var text = node.memoizedProps;
                    _instance2 = cloneHiddenTextInstance(_instance2, text, node);
                  }
                  appendChildToContainerChildSet(containerChildSet, _instance2);
                } else if (node.tag === HostPortal)
                  ;
                else if (node.tag === OffscreenComponent && node.memoizedState !== null) {
                  var child = node.child;
                  if (child !== null) {
                    child.return = node;
                  }
                  appendAllChildrenToContainer(containerChildSet, node, true, true);
                } else if (node.child !== null) {
                  node.child.return = node;
                  node = node.child;
                  continue;
                }
                node = node;
                if (node === workInProgress2) {
                  return;
                }
                while (node.sibling === null) {
                  if (node.return === null || node.return === workInProgress2) {
                    return;
                  }
                  node = node.return;
                }
                node.sibling.return = node.return;
                node = node.sibling;
              }
            };
            updateHostContainer = function(current2, workInProgress2) {
              var portalOrRoot = workInProgress2.stateNode;
              var childrenUnchanged = hadNoMutationsEffects(current2, workInProgress2);
              if (childrenUnchanged)
                ;
              else {
                var container = portalOrRoot.containerInfo;
                var newChildSet = createContainerChildSet(container);
                appendAllChildrenToContainer(newChildSet, workInProgress2, false, false);
                portalOrRoot.pendingChildren = newChildSet;
                markUpdate(workInProgress2);
                finalizeContainerChildren(container, newChildSet);
              }
            };
            updateHostComponent$1 = function(current2, workInProgress2, type, newProps, rootContainerInstance) {
              var currentInstance = current2.stateNode;
              var oldProps = current2.memoizedProps;
              var childrenUnchanged = hadNoMutationsEffects(current2, workInProgress2);
              if (childrenUnchanged && oldProps === newProps) {
                workInProgress2.stateNode = currentInstance;
                return;
              }
              var recyclableInstance = workInProgress2.stateNode;
              var currentHostContext = getHostContext();
              var updatePayload = null;
              if (oldProps !== newProps) {
                updatePayload = prepareUpdate(recyclableInstance, type, oldProps, newProps, rootContainerInstance, currentHostContext);
              }
              if (childrenUnchanged && updatePayload === null) {
                workInProgress2.stateNode = currentInstance;
                return;
              }
              var newInstance = cloneInstance(currentInstance, updatePayload, type, oldProps, newProps, workInProgress2, childrenUnchanged, recyclableInstance);
              if (finalizeInitialChildren(newInstance, type, newProps, rootContainerInstance, currentHostContext)) {
                markUpdate(workInProgress2);
              }
              workInProgress2.stateNode = newInstance;
              if (childrenUnchanged) {
                markUpdate(workInProgress2);
              } else {
                appendAllChildren(newInstance, workInProgress2, false, false);
              }
            };
            updateHostText$1 = function(current2, workInProgress2, oldText, newText) {
              if (oldText !== newText) {
                var rootContainerInstance = getRootHostContainer();
                var currentHostContext = getHostContext();
                workInProgress2.stateNode = createTextInstance(newText, rootContainerInstance, currentHostContext, workInProgress2);
                markUpdate(workInProgress2);
              } else {
                workInProgress2.stateNode = current2.stateNode;
              }
            };
          } else {
            updateHostContainer = function(current2, workInProgress2) {
            };
            updateHostComponent$1 = function(current2, workInProgress2, type, newProps, rootContainerInstance) {
            };
            updateHostText$1 = function(current2, workInProgress2, oldText, newText) {
            };
          }
          function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
            if (getIsHydrating()) {
              return;
            }
            switch (renderState.tailMode) {
              case "hidden": {
                var tailNode = renderState.tail;
                var lastTailNode = null;
                while (tailNode !== null) {
                  if (tailNode.alternate !== null) {
                    lastTailNode = tailNode;
                  }
                  tailNode = tailNode.sibling;
                }
                if (lastTailNode === null) {
                  renderState.tail = null;
                } else {
                  lastTailNode.sibling = null;
                }
                break;
              }
              case "collapsed": {
                var _tailNode = renderState.tail;
                var _lastTailNode = null;
                while (_tailNode !== null) {
                  if (_tailNode.alternate !== null) {
                    _lastTailNode = _tailNode;
                  }
                  _tailNode = _tailNode.sibling;
                }
                if (_lastTailNode === null) {
                  if (!hasRenderedATailFallback && renderState.tail !== null) {
                    renderState.tail.sibling = null;
                  } else {
                    renderState.tail = null;
                  }
                } else {
                  _lastTailNode.sibling = null;
                }
                break;
              }
            }
          }
          function bubbleProperties(completedWork) {
            var didBailout = completedWork.alternate !== null && completedWork.alternate.child === completedWork.child;
            var newChildLanes = NoLanes;
            var subtreeFlags = NoFlags;
            if (!didBailout) {
              if ((completedWork.mode & ProfileMode) !== NoMode) {
                var actualDuration = completedWork.actualDuration;
                var treeBaseDuration = completedWork.selfBaseDuration;
                var child = completedWork.child;
                while (child !== null) {
                  newChildLanes = mergeLanes(newChildLanes, mergeLanes(child.lanes, child.childLanes));
                  subtreeFlags |= child.subtreeFlags;
                  subtreeFlags |= child.flags;
                  actualDuration += child.actualDuration;
                  treeBaseDuration += child.treeBaseDuration;
                  child = child.sibling;
                }
                completedWork.actualDuration = actualDuration;
                completedWork.treeBaseDuration = treeBaseDuration;
              } else {
                var _child = completedWork.child;
                while (_child !== null) {
                  newChildLanes = mergeLanes(newChildLanes, mergeLanes(_child.lanes, _child.childLanes));
                  subtreeFlags |= _child.subtreeFlags;
                  subtreeFlags |= _child.flags;
                  _child.return = completedWork;
                  _child = _child.sibling;
                }
              }
              completedWork.subtreeFlags |= subtreeFlags;
            } else {
              if ((completedWork.mode & ProfileMode) !== NoMode) {
                var _treeBaseDuration = completedWork.selfBaseDuration;
                var _child2 = completedWork.child;
                while (_child2 !== null) {
                  newChildLanes = mergeLanes(newChildLanes, mergeLanes(_child2.lanes, _child2.childLanes));
                  subtreeFlags |= _child2.subtreeFlags & StaticMask;
                  subtreeFlags |= _child2.flags & StaticMask;
                  _treeBaseDuration += _child2.treeBaseDuration;
                  _child2 = _child2.sibling;
                }
                completedWork.treeBaseDuration = _treeBaseDuration;
              } else {
                var _child3 = completedWork.child;
                while (_child3 !== null) {
                  newChildLanes = mergeLanes(newChildLanes, mergeLanes(_child3.lanes, _child3.childLanes));
                  subtreeFlags |= _child3.subtreeFlags & StaticMask;
                  subtreeFlags |= _child3.flags & StaticMask;
                  _child3.return = completedWork;
                  _child3 = _child3.sibling;
                }
              }
              completedWork.subtreeFlags |= subtreeFlags;
            }
            completedWork.childLanes = newChildLanes;
            return didBailout;
          }
          function completeDehydratedSuspenseBoundary(current2, workInProgress2, nextState) {
            if (hasUnhydratedTailNodes() && (workInProgress2.mode & ConcurrentMode) !== NoMode && (workInProgress2.flags & DidCapture) === NoFlags) {
              warnIfUnhydratedTailNodes(workInProgress2);
              resetHydrationState();
              workInProgress2.flags |= ForceClientRender | Incomplete | ShouldCapture;
              return false;
            }
            var wasHydrated = popHydrationState(workInProgress2);
            if (nextState !== null && nextState.dehydrated !== null) {
              if (current2 === null) {
                if (!wasHydrated) {
                  throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
                }
                prepareToHydrateHostSuspenseInstance(workInProgress2);
                bubbleProperties(workInProgress2);
                {
                  if ((workInProgress2.mode & ProfileMode) !== NoMode) {
                    var isTimedOutSuspense = nextState !== null;
                    if (isTimedOutSuspense) {
                      var primaryChildFragment = workInProgress2.child;
                      if (primaryChildFragment !== null) {
                        workInProgress2.treeBaseDuration -= primaryChildFragment.treeBaseDuration;
                      }
                    }
                  }
                }
                return false;
              } else {
                resetHydrationState();
                if ((workInProgress2.flags & DidCapture) === NoFlags) {
                  workInProgress2.memoizedState = null;
                }
                workInProgress2.flags |= Update;
                bubbleProperties(workInProgress2);
                {
                  if ((workInProgress2.mode & ProfileMode) !== NoMode) {
                    var _isTimedOutSuspense = nextState !== null;
                    if (_isTimedOutSuspense) {
                      var _primaryChildFragment = workInProgress2.child;
                      if (_primaryChildFragment !== null) {
                        workInProgress2.treeBaseDuration -= _primaryChildFragment.treeBaseDuration;
                      }
                    }
                  }
                }
                return false;
              }
            } else {
              upgradeHydrationErrorsToRecoverable();
              return true;
            }
          }
          function completeWork(current2, workInProgress2, renderLanes2) {
            var newProps = workInProgress2.pendingProps;
            popTreeContext(workInProgress2);
            switch (workInProgress2.tag) {
              case IndeterminateComponent:
              case LazyComponent:
              case SimpleMemoComponent:
              case FunctionComponent:
              case ForwardRef:
              case Fragment2:
              case Mode:
              case Profiler:
              case ContextConsumer:
              case MemoComponent:
                bubbleProperties(workInProgress2);
                return null;
              case ClassComponent: {
                var Component = workInProgress2.type;
                if (isContextProvider(Component)) {
                  popContext(workInProgress2);
                }
                bubbleProperties(workInProgress2);
                return null;
              }
              case HostRoot: {
                var fiberRoot = workInProgress2.stateNode;
                popHostContainer(workInProgress2);
                popTopLevelContextObject(workInProgress2);
                resetWorkInProgressVersions();
                if (fiberRoot.pendingContext) {
                  fiberRoot.context = fiberRoot.pendingContext;
                  fiberRoot.pendingContext = null;
                }
                if (current2 === null || current2.child === null) {
                  var wasHydrated = popHydrationState(workInProgress2);
                  if (wasHydrated) {
                    markUpdate(workInProgress2);
                  } else {
                    if (current2 !== null) {
                      var prevState = current2.memoizedState;
                      if (
                        // Check if this is a client root
                        !prevState.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
                        (workInProgress2.flags & ForceClientRender) !== NoFlags
                      ) {
                        workInProgress2.flags |= Snapshot;
                        upgradeHydrationErrorsToRecoverable();
                      }
                    }
                  }
                }
                updateHostContainer(current2, workInProgress2);
                bubbleProperties(workInProgress2);
                return null;
              }
              case HostComponent: {
                popHostContext(workInProgress2);
                var rootContainerInstance = getRootHostContainer();
                var type = workInProgress2.type;
                if (current2 !== null && workInProgress2.stateNode != null) {
                  updateHostComponent$1(current2, workInProgress2, type, newProps, rootContainerInstance);
                  if (current2.ref !== workInProgress2.ref) {
                    markRef$1(workInProgress2);
                  }
                } else {
                  if (!newProps) {
                    if (workInProgress2.stateNode === null) {
                      throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
                    }
                    bubbleProperties(workInProgress2);
                    return null;
                  }
                  var currentHostContext = getHostContext();
                  var _wasHydrated = popHydrationState(workInProgress2);
                  if (_wasHydrated) {
                    if (prepareToHydrateHostInstance(workInProgress2, rootContainerInstance, currentHostContext)) {
                      markUpdate(workInProgress2);
                    }
                  } else {
                    var instance = createInstance(type, newProps, rootContainerInstance, currentHostContext, workInProgress2);
                    appendAllChildren(instance, workInProgress2, false, false);
                    workInProgress2.stateNode = instance;
                    if (finalizeInitialChildren(instance, type, newProps, rootContainerInstance, currentHostContext)) {
                      markUpdate(workInProgress2);
                    }
                  }
                  if (workInProgress2.ref !== null) {
                    markRef$1(workInProgress2);
                  }
                }
                bubbleProperties(workInProgress2);
                return null;
              }
              case HostText: {
                var newText = newProps;
                if (current2 && workInProgress2.stateNode != null) {
                  var oldText = current2.memoizedProps;
                  updateHostText$1(current2, workInProgress2, oldText, newText);
                } else {
                  if (typeof newText !== "string") {
                    if (workInProgress2.stateNode === null) {
                      throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
                    }
                  }
                  var _rootContainerInstance = getRootHostContainer();
                  var _currentHostContext = getHostContext();
                  var _wasHydrated2 = popHydrationState(workInProgress2);
                  if (_wasHydrated2) {
                    if (prepareToHydrateHostTextInstance(workInProgress2)) {
                      markUpdate(workInProgress2);
                    }
                  } else {
                    workInProgress2.stateNode = createTextInstance(newText, _rootContainerInstance, _currentHostContext, workInProgress2);
                  }
                }
                bubbleProperties(workInProgress2);
                return null;
              }
              case SuspenseComponent: {
                popSuspenseContext(workInProgress2);
                var nextState = workInProgress2.memoizedState;
                if (current2 === null || current2.memoizedState !== null && current2.memoizedState.dehydrated !== null) {
                  var fallthroughToNormalSuspensePath = completeDehydratedSuspenseBoundary(current2, workInProgress2, nextState);
                  if (!fallthroughToNormalSuspensePath) {
                    if (workInProgress2.flags & ShouldCapture) {
                      return workInProgress2;
                    } else {
                      return null;
                    }
                  }
                }
                if ((workInProgress2.flags & DidCapture) !== NoFlags) {
                  workInProgress2.lanes = renderLanes2;
                  if ((workInProgress2.mode & ProfileMode) !== NoMode) {
                    transferActualDuration(workInProgress2);
                  }
                  return workInProgress2;
                }
                var nextDidTimeout = nextState !== null;
                var prevDidTimeout = current2 !== null && current2.memoizedState !== null;
                if (nextDidTimeout !== prevDidTimeout) {
                  if (nextDidTimeout) {
                    var _offscreenFiber2 = workInProgress2.child;
                    _offscreenFiber2.flags |= Visibility;
                    if ((workInProgress2.mode & ConcurrentMode) !== NoMode) {
                      var hasInvisibleChildContext = current2 === null && (workInProgress2.memoizedProps.unstable_avoidThisFallback !== true || !enableSuspenseAvoidThisFallback);
                      if (hasInvisibleChildContext || hasSuspenseContext(suspenseStackCursor.current, InvisibleParentSuspenseContext)) {
                        renderDidSuspend();
                      } else {
                        renderDidSuspendDelayIfPossible();
                      }
                    }
                  }
                }
                var wakeables = workInProgress2.updateQueue;
                if (wakeables !== null) {
                  workInProgress2.flags |= Update;
                }
                bubbleProperties(workInProgress2);
                {
                  if ((workInProgress2.mode & ProfileMode) !== NoMode) {
                    if (nextDidTimeout) {
                      var primaryChildFragment = workInProgress2.child;
                      if (primaryChildFragment !== null) {
                        workInProgress2.treeBaseDuration -= primaryChildFragment.treeBaseDuration;
                      }
                    }
                  }
                }
                return null;
              }
              case HostPortal:
                popHostContainer(workInProgress2);
                updateHostContainer(current2, workInProgress2);
                if (current2 === null) {
                  preparePortalMount(workInProgress2.stateNode.containerInfo);
                }
                bubbleProperties(workInProgress2);
                return null;
              case ContextProvider:
                var context = workInProgress2.type._context;
                popProvider(context, workInProgress2);
                bubbleProperties(workInProgress2);
                return null;
              case IncompleteClassComponent: {
                var _Component = workInProgress2.type;
                if (isContextProvider(_Component)) {
                  popContext(workInProgress2);
                }
                bubbleProperties(workInProgress2);
                return null;
              }
              case SuspenseListComponent: {
                popSuspenseContext(workInProgress2);
                var renderState = workInProgress2.memoizedState;
                if (renderState === null) {
                  bubbleProperties(workInProgress2);
                  return null;
                }
                var didSuspendAlready = (workInProgress2.flags & DidCapture) !== NoFlags;
                var renderedTail = renderState.rendering;
                if (renderedTail === null) {
                  if (!didSuspendAlready) {
                    var cannotBeSuspended = renderHasNotSuspendedYet() && (current2 === null || (current2.flags & DidCapture) === NoFlags);
                    if (!cannotBeSuspended) {
                      var row = workInProgress2.child;
                      while (row !== null) {
                        var suspended = findFirstSuspended(row);
                        if (suspended !== null) {
                          didSuspendAlready = true;
                          workInProgress2.flags |= DidCapture;
                          cutOffTailIfNeeded(renderState, false);
                          var newThenables = suspended.updateQueue;
                          if (newThenables !== null) {
                            workInProgress2.updateQueue = newThenables;
                            workInProgress2.flags |= Update;
                          }
                          workInProgress2.subtreeFlags = NoFlags;
                          resetChildFibers(workInProgress2, renderLanes2);
                          pushSuspenseContext(workInProgress2, setShallowSuspenseContext(suspenseStackCursor.current, ForceSuspenseFallback));
                          return workInProgress2.child;
                        }
                        row = row.sibling;
                      }
                    }
                    if (renderState.tail !== null && now() > getRenderTargetTime()) {
                      workInProgress2.flags |= DidCapture;
                      didSuspendAlready = true;
                      cutOffTailIfNeeded(renderState, false);
                      workInProgress2.lanes = SomeRetryLane;
                    }
                  } else {
                    cutOffTailIfNeeded(renderState, false);
                  }
                } else {
                  if (!didSuspendAlready) {
                    var _suspended = findFirstSuspended(renderedTail);
                    if (_suspended !== null) {
                      workInProgress2.flags |= DidCapture;
                      didSuspendAlready = true;
                      var _newThenables = _suspended.updateQueue;
                      if (_newThenables !== null) {
                        workInProgress2.updateQueue = _newThenables;
                        workInProgress2.flags |= Update;
                      }
                      cutOffTailIfNeeded(renderState, true);
                      if (renderState.tail === null && renderState.tailMode === "hidden" && !renderedTail.alternate && !getIsHydrating()) {
                        bubbleProperties(workInProgress2);
                        return null;
                      }
                    } else if (
                      // The time it took to render last row is greater than the remaining
                      // time we have to render. So rendering one more row would likely
                      // exceed it.
                      now() * 2 - renderState.renderingStartTime > getRenderTargetTime() && renderLanes2 !== OffscreenLane
                    ) {
                      workInProgress2.flags |= DidCapture;
                      didSuspendAlready = true;
                      cutOffTailIfNeeded(renderState, false);
                      workInProgress2.lanes = SomeRetryLane;
                    }
                  }
                  if (renderState.isBackwards) {
                    renderedTail.sibling = workInProgress2.child;
                    workInProgress2.child = renderedTail;
                  } else {
                    var previousSibling = renderState.last;
                    if (previousSibling !== null) {
                      previousSibling.sibling = renderedTail;
                    } else {
                      workInProgress2.child = renderedTail;
                    }
                    renderState.last = renderedTail;
                  }
                }
                if (renderState.tail !== null) {
                  var next = renderState.tail;
                  renderState.rendering = next;
                  renderState.tail = next.sibling;
                  renderState.renderingStartTime = now();
                  next.sibling = null;
                  var suspenseContext = suspenseStackCursor.current;
                  if (didSuspendAlready) {
                    suspenseContext = setShallowSuspenseContext(suspenseContext, ForceSuspenseFallback);
                  } else {
                    suspenseContext = setDefaultShallowSuspenseContext(suspenseContext);
                  }
                  pushSuspenseContext(workInProgress2, suspenseContext);
                  return next;
                }
                bubbleProperties(workInProgress2);
                return null;
              }
              case ScopeComponent: {
                break;
              }
              case OffscreenComponent:
              case LegacyHiddenComponent: {
                popRenderLanes(workInProgress2);
                var _nextState = workInProgress2.memoizedState;
                var nextIsHidden = _nextState !== null;
                if (current2 !== null) {
                  var _prevState = current2.memoizedState;
                  var prevIsHidden = _prevState !== null;
                  if (prevIsHidden !== nextIsHidden && // LegacyHidden doesn't do any hiding — it only pre-renders.
                  !enableLegacyHidden) {
                    workInProgress2.flags |= Visibility;
                  }
                }
                if (!nextIsHidden || (workInProgress2.mode & ConcurrentMode) === NoMode) {
                  bubbleProperties(workInProgress2);
                } else {
                  if (includesSomeLane(subtreeRenderLanes, OffscreenLane)) {
                    bubbleProperties(workInProgress2);
                    if (supportsMutation) {
                      if (workInProgress2.subtreeFlags & (Placement | Update)) {
                        workInProgress2.flags |= Visibility;
                      }
                    }
                  }
                }
                return null;
              }
              case CacheComponent: {
                return null;
              }
              case TracingMarkerComponent: {
                return null;
              }
            }
            throw new Error("Unknown unit of work tag (" + workInProgress2.tag + "). This error is likely caused by a bug in React. Please file an issue.");
          }
          function unwindWork(current2, workInProgress2, renderLanes2) {
            popTreeContext(workInProgress2);
            switch (workInProgress2.tag) {
              case ClassComponent: {
                var Component = workInProgress2.type;
                if (isContextProvider(Component)) {
                  popContext(workInProgress2);
                }
                var flags = workInProgress2.flags;
                if (flags & ShouldCapture) {
                  workInProgress2.flags = flags & ~ShouldCapture | DidCapture;
                  if ((workInProgress2.mode & ProfileMode) !== NoMode) {
                    transferActualDuration(workInProgress2);
                  }
                  return workInProgress2;
                }
                return null;
              }
              case HostRoot: {
                var root = workInProgress2.stateNode;
                popHostContainer(workInProgress2);
                popTopLevelContextObject(workInProgress2);
                resetWorkInProgressVersions();
                var _flags = workInProgress2.flags;
                if ((_flags & ShouldCapture) !== NoFlags && (_flags & DidCapture) === NoFlags) {
                  workInProgress2.flags = _flags & ~ShouldCapture | DidCapture;
                  return workInProgress2;
                }
                return null;
              }
              case HostComponent: {
                popHostContext(workInProgress2);
                return null;
              }
              case SuspenseComponent: {
                popSuspenseContext(workInProgress2);
                var suspenseState = workInProgress2.memoizedState;
                if (suspenseState !== null && suspenseState.dehydrated !== null) {
                  if (workInProgress2.alternate === null) {
                    throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
                  }
                  resetHydrationState();
                }
                var _flags2 = workInProgress2.flags;
                if (_flags2 & ShouldCapture) {
                  workInProgress2.flags = _flags2 & ~ShouldCapture | DidCapture;
                  if ((workInProgress2.mode & ProfileMode) !== NoMode) {
                    transferActualDuration(workInProgress2);
                  }
                  return workInProgress2;
                }
                return null;
              }
              case SuspenseListComponent: {
                popSuspenseContext(workInProgress2);
                return null;
              }
              case HostPortal:
                popHostContainer(workInProgress2);
                return null;
              case ContextProvider:
                var context = workInProgress2.type._context;
                popProvider(context, workInProgress2);
                return null;
              case OffscreenComponent:
              case LegacyHiddenComponent:
                popRenderLanes(workInProgress2);
                return null;
              case CacheComponent:
                return null;
              default:
                return null;
            }
          }
          function unwindInterruptedWork(current2, interruptedWork, renderLanes2) {
            popTreeContext(interruptedWork);
            switch (interruptedWork.tag) {
              case ClassComponent: {
                var childContextTypes = interruptedWork.type.childContextTypes;
                if (childContextTypes !== null && childContextTypes !== void 0) {
                  popContext(interruptedWork);
                }
                break;
              }
              case HostRoot: {
                var root = interruptedWork.stateNode;
                popHostContainer(interruptedWork);
                popTopLevelContextObject(interruptedWork);
                resetWorkInProgressVersions();
                break;
              }
              case HostComponent: {
                popHostContext(interruptedWork);
                break;
              }
              case HostPortal:
                popHostContainer(interruptedWork);
                break;
              case SuspenseComponent:
                popSuspenseContext(interruptedWork);
                break;
              case SuspenseListComponent:
                popSuspenseContext(interruptedWork);
                break;
              case ContextProvider:
                var context = interruptedWork.type._context;
                popProvider(context, interruptedWork);
                break;
              case OffscreenComponent:
              case LegacyHiddenComponent:
                popRenderLanes(interruptedWork);
                break;
            }
          }
          function invokeGuardedCallbackProd(name, func, context, a, b, c, d, e, f) {
            var funcArgs = Array.prototype.slice.call(arguments, 3);
            try {
              func.apply(context, funcArgs);
            } catch (error2) {
              this.onError(error2);
            }
          }
          var invokeGuardedCallbackImpl = invokeGuardedCallbackProd;
          {
            if (typeof window !== "undefined" && typeof window.dispatchEvent === "function" && typeof document !== "undefined" && typeof document.createEvent === "function") {
              var fakeNode = document.createElement("react");
              invokeGuardedCallbackImpl = function invokeGuardedCallbackDev(name, func, context, a, b, c, d, e, f) {
                if (typeof document === "undefined" || document === null) {
                  throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
                }
                var evt = document.createEvent("Event");
                var didCall = false;
                var didError = true;
                var windowEvent = window.event;
                var windowEventDescriptor = Object.getOwnPropertyDescriptor(window, "event");
                function restoreAfterDispatch() {
                  fakeNode.removeEventListener(evtType, callCallback2, false);
                  if (typeof window.event !== "undefined" && window.hasOwnProperty("event")) {
                    window.event = windowEvent;
                  }
                }
                var funcArgs = Array.prototype.slice.call(arguments, 3);
                function callCallback2() {
                  didCall = true;
                  restoreAfterDispatch();
                  func.apply(context, funcArgs);
                  didError = false;
                }
                var error2;
                var didSetError = false;
                var isCrossOriginError = false;
                function handleWindowError(event) {
                  error2 = event.error;
                  didSetError = true;
                  if (error2 === null && event.colno === 0 && event.lineno === 0) {
                    isCrossOriginError = true;
                  }
                  if (event.defaultPrevented) {
                    if (error2 != null && typeof error2 === "object") {
                      try {
                        error2._suppressLogging = true;
                      } catch (inner) {
                      }
                    }
                  }
                }
                var evtType = "react-" + (name ? name : "invokeguardedcallback");
                window.addEventListener("error", handleWindowError);
                fakeNode.addEventListener(evtType, callCallback2, false);
                evt.initEvent(evtType, false, false);
                fakeNode.dispatchEvent(evt);
                if (windowEventDescriptor) {
                  Object.defineProperty(window, "event", windowEventDescriptor);
                }
                if (didCall && didError) {
                  if (!didSetError) {
                    error2 = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`);
                  } else if (isCrossOriginError) {
                    error2 = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.");
                  }
                  this.onError(error2);
                }
                window.removeEventListener("error", handleWindowError);
                if (!didCall) {
                  restoreAfterDispatch();
                  return invokeGuardedCallbackProd.apply(this, arguments);
                }
              };
            }
          }
          var invokeGuardedCallbackImpl$1 = invokeGuardedCallbackImpl;
          var hasError = false;
          var caughtError = null;
          var reporter = {
            onError: function(error2) {
              hasError = true;
              caughtError = error2;
            }
          };
          function invokeGuardedCallback(name, func, context, a, b, c, d, e, f) {
            hasError = false;
            caughtError = null;
            invokeGuardedCallbackImpl$1.apply(reporter, arguments);
          }
          function hasCaughtError() {
            return hasError;
          }
          function clearCaughtError() {
            if (hasError) {
              var error2 = caughtError;
              hasError = false;
              caughtError = null;
              return error2;
            } else {
              throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
            }
          }
          var didWarnAboutUndefinedSnapshotBeforeUpdate = null;
          {
            didWarnAboutUndefinedSnapshotBeforeUpdate = /* @__PURE__ */ new Set();
          }
          var offscreenSubtreeIsHidden = false;
          var offscreenSubtreeWasHidden = false;
          var PossiblyWeakSet = typeof WeakSet === "function" ? WeakSet : Set;
          var nextEffect = null;
          var inProgressLanes = null;
          var inProgressRoot = null;
          function reportUncaughtErrorInDEV(error2) {
            {
              invokeGuardedCallback(null, function() {
                throw error2;
              });
              clearCaughtError();
            }
          }
          var callComponentWillUnmountWithTimer = function(current2, instance) {
            instance.props = current2.memoizedProps;
            instance.state = current2.memoizedState;
            if (current2.mode & ProfileMode) {
              try {
                startLayoutEffectTimer();
                instance.componentWillUnmount();
              } finally {
                recordLayoutEffectDuration(current2);
              }
            } else {
              instance.componentWillUnmount();
            }
          };
          function safelyCallCommitHookLayoutEffectListMount(current2, nearestMountedAncestor) {
            try {
              commitHookEffectListMount(Layout, current2);
            } catch (error2) {
              captureCommitPhaseError(current2, nearestMountedAncestor, error2);
            }
          }
          function safelyCallComponentWillUnmount(current2, nearestMountedAncestor, instance) {
            try {
              callComponentWillUnmountWithTimer(current2, instance);
            } catch (error2) {
              captureCommitPhaseError(current2, nearestMountedAncestor, error2);
            }
          }
          function safelyCallComponentDidMount(current2, nearestMountedAncestor, instance) {
            try {
              instance.componentDidMount();
            } catch (error2) {
              captureCommitPhaseError(current2, nearestMountedAncestor, error2);
            }
          }
          function safelyAttachRef(current2, nearestMountedAncestor) {
            try {
              commitAttachRef(current2);
            } catch (error2) {
              captureCommitPhaseError(current2, nearestMountedAncestor, error2);
            }
          }
          function safelyDetachRef(current2, nearestMountedAncestor) {
            var ref = current2.ref;
            if (ref !== null) {
              if (typeof ref === "function") {
                var retVal;
                try {
                  if (enableProfilerTimer && enableProfilerCommitHooks && current2.mode & ProfileMode) {
                    try {
                      startLayoutEffectTimer();
                      retVal = ref(null);
                    } finally {
                      recordLayoutEffectDuration(current2);
                    }
                  } else {
                    retVal = ref(null);
                  }
                } catch (error2) {
                  captureCommitPhaseError(current2, nearestMountedAncestor, error2);
                }
                {
                  if (typeof retVal === "function") {
                    error("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", getComponentNameFromFiber(current2));
                  }
                }
              } else {
                ref.current = null;
              }
            }
          }
          function safelyCallDestroy(current2, nearestMountedAncestor, destroy) {
            try {
              destroy();
            } catch (error2) {
              captureCommitPhaseError(current2, nearestMountedAncestor, error2);
            }
          }
          var focusedInstanceHandle = null;
          var shouldFireAfterActiveInstanceBlur = false;
          function commitBeforeMutationEffects(root, firstChild) {
            focusedInstanceHandle = prepareForCommit(root.containerInfo);
            nextEffect = firstChild;
            commitBeforeMutationEffects_begin();
            var shouldFire = shouldFireAfterActiveInstanceBlur;
            shouldFireAfterActiveInstanceBlur = false;
            focusedInstanceHandle = null;
            return shouldFire;
          }
          function commitBeforeMutationEffects_begin() {
            while (nextEffect !== null) {
              var fiber = nextEffect;
              var child = fiber.child;
              if ((fiber.subtreeFlags & BeforeMutationMask) !== NoFlags && child !== null) {
                child.return = fiber;
                nextEffect = child;
              } else {
                commitBeforeMutationEffects_complete();
              }
            }
          }
          function commitBeforeMutationEffects_complete() {
            while (nextEffect !== null) {
              var fiber = nextEffect;
              setCurrentFiber(fiber);
              try {
                commitBeforeMutationEffectsOnFiber(fiber);
              } catch (error2) {
                captureCommitPhaseError(fiber, fiber.return, error2);
              }
              resetCurrentFiber();
              var sibling = fiber.sibling;
              if (sibling !== null) {
                sibling.return = fiber.return;
                nextEffect = sibling;
                return;
              }
              nextEffect = fiber.return;
            }
          }
          function commitBeforeMutationEffectsOnFiber(finishedWork) {
            var current2 = finishedWork.alternate;
            var flags = finishedWork.flags;
            if ((flags & Snapshot) !== NoFlags) {
              setCurrentFiber(finishedWork);
              switch (finishedWork.tag) {
                case FunctionComponent:
                case ForwardRef:
                case SimpleMemoComponent: {
                  break;
                }
                case ClassComponent: {
                  if (current2 !== null) {
                    var prevProps = current2.memoizedProps;
                    var prevState = current2.memoizedState;
                    var instance = finishedWork.stateNode;
                    {
                      if (finishedWork.type === finishedWork.elementType && !didWarnAboutReassigningProps) {
                        if (instance.props !== finishedWork.memoizedProps) {
                          error("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", getComponentNameFromFiber(finishedWork) || "instance");
                        }
                        if (instance.state !== finishedWork.memoizedState) {
                          error("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", getComponentNameFromFiber(finishedWork) || "instance");
                        }
                      }
                    }
                    var snapshot = instance.getSnapshotBeforeUpdate(finishedWork.elementType === finishedWork.type ? prevProps : resolveDefaultProps(finishedWork.type, prevProps), prevState);
                    {
                      var didWarnSet = didWarnAboutUndefinedSnapshotBeforeUpdate;
                      if (snapshot === void 0 && !didWarnSet.has(finishedWork.type)) {
                        didWarnSet.add(finishedWork.type);
                        error("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", getComponentNameFromFiber(finishedWork));
                      }
                    }
                    instance.__reactInternalSnapshotBeforeUpdate = snapshot;
                  }
                  break;
                }
                case HostRoot: {
                  if (supportsMutation) {
                    var root = finishedWork.stateNode;
                    clearContainer(root.containerInfo);
                  }
                  break;
                }
                case HostComponent:
                case HostText:
                case HostPortal:
                case IncompleteClassComponent:
                  break;
                default: {
                  throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
                }
              }
              resetCurrentFiber();
            }
          }
          function commitHookEffectListUnmount(flags, finishedWork, nearestMountedAncestor) {
            var updateQueue = finishedWork.updateQueue;
            var lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;
            if (lastEffect !== null) {
              var firstEffect = lastEffect.next;
              var effect = firstEffect;
              do {
                if ((effect.tag & flags) === flags) {
                  var destroy = effect.destroy;
                  effect.destroy = void 0;
                  if (destroy !== void 0) {
                    {
                      if ((flags & Passive$1) !== NoFlags$1) {
                        markComponentPassiveEffectUnmountStarted(finishedWork);
                      } else if ((flags & Layout) !== NoFlags$1) {
                        markComponentLayoutEffectUnmountStarted(finishedWork);
                      }
                    }
                    {
                      if ((flags & Insertion) !== NoFlags$1) {
                        setIsRunningInsertionEffect(true);
                      }
                    }
                    safelyCallDestroy(finishedWork, nearestMountedAncestor, destroy);
                    {
                      if ((flags & Insertion) !== NoFlags$1) {
                        setIsRunningInsertionEffect(false);
                      }
                    }
                    {
                      if ((flags & Passive$1) !== NoFlags$1) {
                        markComponentPassiveEffectUnmountStopped();
                      } else if ((flags & Layout) !== NoFlags$1) {
                        markComponentLayoutEffectUnmountStopped();
                      }
                    }
                  }
                }
                effect = effect.next;
              } while (effect !== firstEffect);
            }
          }
          function commitHookEffectListMount(flags, finishedWork) {
            var updateQueue = finishedWork.updateQueue;
            var lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;
            if (lastEffect !== null) {
              var firstEffect = lastEffect.next;
              var effect = firstEffect;
              do {
                if ((effect.tag & flags) === flags) {
                  {
                    if ((flags & Passive$1) !== NoFlags$1) {
                      markComponentPassiveEffectMountStarted(finishedWork);
                    } else if ((flags & Layout) !== NoFlags$1) {
                      markComponentLayoutEffectMountStarted(finishedWork);
                    }
                  }
                  var create = effect.create;
                  {
                    if ((flags & Insertion) !== NoFlags$1) {
                      setIsRunningInsertionEffect(true);
                    }
                  }
                  effect.destroy = create();
                  {
                    if ((flags & Insertion) !== NoFlags$1) {
                      setIsRunningInsertionEffect(false);
                    }
                  }
                  {
                    if ((flags & Passive$1) !== NoFlags$1) {
                      markComponentPassiveEffectMountStopped();
                    } else if ((flags & Layout) !== NoFlags$1) {
                      markComponentLayoutEffectMountStopped();
                    }
                  }
                  {
                    var destroy = effect.destroy;
                    if (destroy !== void 0 && typeof destroy !== "function") {
                      var hookName = void 0;
                      if ((effect.tag & Layout) !== NoFlags) {
                        hookName = "useLayoutEffect";
                      } else if ((effect.tag & Insertion) !== NoFlags) {
                        hookName = "useInsertionEffect";
                      } else {
                        hookName = "useEffect";
                      }
                      var addendum = void 0;
                      if (destroy === null) {
                        addendum = " You returned null. If your effect does not require clean up, return undefined (or nothing).";
                      } else if (typeof destroy.then === "function") {
                        addendum = "\n\nIt looks like you wrote " + hookName + "(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:\n\n" + hookName + "(() => {\n  async function fetchData() {\n    // You can await here\n    const response = await MyAPI.getData(someId);\n    // ...\n  }\n  fetchData();\n}, [someId]); // Or [] if effect doesn't need props or state\n\nLearn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching";
                      } else {
                        addendum = " You returned: " + destroy;
                      }
                      error("%s must not return anything besides a function, which is used for clean-up.%s", hookName, addendum);
                    }
                  }
                }
                effect = effect.next;
              } while (effect !== firstEffect);
            }
          }
          function commitPassiveEffectDurations(finishedRoot, finishedWork) {
            {
              if ((finishedWork.flags & Update) !== NoFlags) {
                switch (finishedWork.tag) {
                  case Profiler: {
                    var passiveEffectDuration = finishedWork.stateNode.passiveEffectDuration;
                    var _finishedWork$memoize = finishedWork.memoizedProps, id = _finishedWork$memoize.id, onPostCommit = _finishedWork$memoize.onPostCommit;
                    var commitTime2 = getCommitTime();
                    var phase = finishedWork.alternate === null ? "mount" : "update";
                    {
                      if (isCurrentUpdateNested()) {
                        phase = "nested-update";
                      }
                    }
                    if (typeof onPostCommit === "function") {
                      onPostCommit(id, phase, passiveEffectDuration, commitTime2);
                    }
                    var parentFiber = finishedWork.return;
                    outer:
                      while (parentFiber !== null) {
                        switch (parentFiber.tag) {
                          case HostRoot:
                            var root = parentFiber.stateNode;
                            root.passiveEffectDuration += passiveEffectDuration;
                            break outer;
                          case Profiler:
                            var parentStateNode = parentFiber.stateNode;
                            parentStateNode.passiveEffectDuration += passiveEffectDuration;
                            break outer;
                        }
                        parentFiber = parentFiber.return;
                      }
                    break;
                  }
                }
              }
            }
          }
          function commitLayoutEffectOnFiber(finishedRoot, current2, finishedWork, committedLanes) {
            if ((finishedWork.flags & LayoutMask) !== NoFlags) {
              switch (finishedWork.tag) {
                case FunctionComponent:
                case ForwardRef:
                case SimpleMemoComponent: {
                  if (!offscreenSubtreeWasHidden) {
                    if (finishedWork.mode & ProfileMode) {
                      try {
                        startLayoutEffectTimer();
                        commitHookEffectListMount(Layout | HasEffect, finishedWork);
                      } finally {
                        recordLayoutEffectDuration(finishedWork);
                      }
                    } else {
                      commitHookEffectListMount(Layout | HasEffect, finishedWork);
                    }
                  }
                  break;
                }
                case ClassComponent: {
                  var instance = finishedWork.stateNode;
                  if (finishedWork.flags & Update) {
                    if (!offscreenSubtreeWasHidden) {
                      if (current2 === null) {
                        {
                          if (finishedWork.type === finishedWork.elementType && !didWarnAboutReassigningProps) {
                            if (instance.props !== finishedWork.memoizedProps) {
                              error("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", getComponentNameFromFiber(finishedWork) || "instance");
                            }
                            if (instance.state !== finishedWork.memoizedState) {
                              error("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", getComponentNameFromFiber(finishedWork) || "instance");
                            }
                          }
                        }
                        if (finishedWork.mode & ProfileMode) {
                          try {
                            startLayoutEffectTimer();
                            instance.componentDidMount();
                          } finally {
                            recordLayoutEffectDuration(finishedWork);
                          }
                        } else {
                          instance.componentDidMount();
                        }
                      } else {
                        var prevProps = finishedWork.elementType === finishedWork.type ? current2.memoizedProps : resolveDefaultProps(finishedWork.type, current2.memoizedProps);
                        var prevState = current2.memoizedState;
                        {
                          if (finishedWork.type === finishedWork.elementType && !didWarnAboutReassigningProps) {
                            if (instance.props !== finishedWork.memoizedProps) {
                              error("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", getComponentNameFromFiber(finishedWork) || "instance");
                            }
                            if (instance.state !== finishedWork.memoizedState) {
                              error("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", getComponentNameFromFiber(finishedWork) || "instance");
                            }
                          }
                        }
                        if (finishedWork.mode & ProfileMode) {
                          try {
                            startLayoutEffectTimer();
                            instance.componentDidUpdate(prevProps, prevState, instance.__reactInternalSnapshotBeforeUpdate);
                          } finally {
                            recordLayoutEffectDuration(finishedWork);
                          }
                        } else {
                          instance.componentDidUpdate(prevProps, prevState, instance.__reactInternalSnapshotBeforeUpdate);
                        }
                      }
                    }
                  }
                  var updateQueue = finishedWork.updateQueue;
                  if (updateQueue !== null) {
                    {
                      if (finishedWork.type === finishedWork.elementType && !didWarnAboutReassigningProps) {
                        if (instance.props !== finishedWork.memoizedProps) {
                          error("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", getComponentNameFromFiber(finishedWork) || "instance");
                        }
                        if (instance.state !== finishedWork.memoizedState) {
                          error("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", getComponentNameFromFiber(finishedWork) || "instance");
                        }
                      }
                    }
                    commitUpdateQueue(finishedWork, updateQueue, instance);
                  }
                  break;
                }
                case HostRoot: {
                  var _updateQueue = finishedWork.updateQueue;
                  if (_updateQueue !== null) {
                    var _instance = null;
                    if (finishedWork.child !== null) {
                      switch (finishedWork.child.tag) {
                        case HostComponent:
                          _instance = getPublicInstance(finishedWork.child.stateNode);
                          break;
                        case ClassComponent:
                          _instance = finishedWork.child.stateNode;
                          break;
                      }
                    }
                    commitUpdateQueue(finishedWork, _updateQueue, _instance);
                  }
                  break;
                }
                case HostComponent: {
                  var _instance2 = finishedWork.stateNode;
                  if (current2 === null && finishedWork.flags & Update) {
                    var type = finishedWork.type;
                    var props = finishedWork.memoizedProps;
                    commitMount(_instance2, type, props, finishedWork);
                  }
                  break;
                }
                case HostText: {
                  break;
                }
                case HostPortal: {
                  break;
                }
                case Profiler: {
                  {
                    var _finishedWork$memoize2 = finishedWork.memoizedProps, onCommit = _finishedWork$memoize2.onCommit, onRender = _finishedWork$memoize2.onRender;
                    var effectDuration = finishedWork.stateNode.effectDuration;
                    var commitTime2 = getCommitTime();
                    var phase = current2 === null ? "mount" : "update";
                    {
                      if (isCurrentUpdateNested()) {
                        phase = "nested-update";
                      }
                    }
                    if (typeof onRender === "function") {
                      onRender(finishedWork.memoizedProps.id, phase, finishedWork.actualDuration, finishedWork.treeBaseDuration, finishedWork.actualStartTime, commitTime2);
                    }
                    {
                      if (typeof onCommit === "function") {
                        onCommit(finishedWork.memoizedProps.id, phase, effectDuration, commitTime2);
                      }
                      enqueuePendingPassiveProfilerEffect(finishedWork);
                      var parentFiber = finishedWork.return;
                      outer:
                        while (parentFiber !== null) {
                          switch (parentFiber.tag) {
                            case HostRoot:
                              var root = parentFiber.stateNode;
                              root.effectDuration += effectDuration;
                              break outer;
                            case Profiler:
                              var parentStateNode = parentFiber.stateNode;
                              parentStateNode.effectDuration += effectDuration;
                              break outer;
                          }
                          parentFiber = parentFiber.return;
                        }
                    }
                  }
                  break;
                }
                case SuspenseComponent: {
                  commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
                  break;
                }
                case SuspenseListComponent:
                case IncompleteClassComponent:
                case ScopeComponent:
                case OffscreenComponent:
                case LegacyHiddenComponent:
                case TracingMarkerComponent: {
                  break;
                }
                default:
                  throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
            if (!offscreenSubtreeWasHidden) {
              {
                if (finishedWork.flags & Ref) {
                  commitAttachRef(finishedWork);
                }
              }
            }
          }
          function reappearLayoutEffectsOnFiber(node) {
            switch (node.tag) {
              case FunctionComponent:
              case ForwardRef:
              case SimpleMemoComponent: {
                if (node.mode & ProfileMode) {
                  try {
                    startLayoutEffectTimer();
                    safelyCallCommitHookLayoutEffectListMount(node, node.return);
                  } finally {
                    recordLayoutEffectDuration(node);
                  }
                } else {
                  safelyCallCommitHookLayoutEffectListMount(node, node.return);
                }
                break;
              }
              case ClassComponent: {
                var instance = node.stateNode;
                if (typeof instance.componentDidMount === "function") {
                  safelyCallComponentDidMount(node, node.return, instance);
                }
                safelyAttachRef(node, node.return);
                break;
              }
              case HostComponent: {
                safelyAttachRef(node, node.return);
                break;
              }
            }
          }
          function hideOrUnhideAllChildren(finishedWork, isHidden) {
            var hostSubtreeRoot = null;
            if (supportsMutation) {
              var node = finishedWork;
              while (true) {
                if (node.tag === HostComponent) {
                  if (hostSubtreeRoot === null) {
                    hostSubtreeRoot = node;
                    try {
                      var instance = node.stateNode;
                      if (isHidden) {
                        hideInstance(instance);
                      } else {
                        unhideInstance(node.stateNode, node.memoizedProps);
                      }
                    } catch (error2) {
                      captureCommitPhaseError(finishedWork, finishedWork.return, error2);
                    }
                  }
                } else if (node.tag === HostText) {
                  if (hostSubtreeRoot === null) {
                    try {
                      var _instance3 = node.stateNode;
                      if (isHidden) {
                        hideTextInstance(_instance3);
                      } else {
                        unhideTextInstance(_instance3, node.memoizedProps);
                      }
                    } catch (error2) {
                      captureCommitPhaseError(finishedWork, finishedWork.return, error2);
                    }
                  }
                } else if ((node.tag === OffscreenComponent || node.tag === LegacyHiddenComponent) && node.memoizedState !== null && node !== finishedWork)
                  ;
                else if (node.child !== null) {
                  node.child.return = node;
                  node = node.child;
                  continue;
                }
                if (node === finishedWork) {
                  return;
                }
                while (node.sibling === null) {
                  if (node.return === null || node.return === finishedWork) {
                    return;
                  }
                  if (hostSubtreeRoot === node) {
                    hostSubtreeRoot = null;
                  }
                  node = node.return;
                }
                if (hostSubtreeRoot === node) {
                  hostSubtreeRoot = null;
                }
                node.sibling.return = node.return;
                node = node.sibling;
              }
            }
          }
          function commitAttachRef(finishedWork) {
            var ref = finishedWork.ref;
            if (ref !== null) {
              var instance = finishedWork.stateNode;
              var instanceToUse;
              switch (finishedWork.tag) {
                case HostComponent:
                  instanceToUse = getPublicInstance(instance);
                  break;
                default:
                  instanceToUse = instance;
              }
              if (typeof ref === "function") {
                var retVal;
                if (finishedWork.mode & ProfileMode) {
                  try {
                    startLayoutEffectTimer();
                    retVal = ref(instanceToUse);
                  } finally {
                    recordLayoutEffectDuration(finishedWork);
                  }
                } else {
                  retVal = ref(instanceToUse);
                }
                {
                  if (typeof retVal === "function") {
                    error("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", getComponentNameFromFiber(finishedWork));
                  }
                }
              } else {
                {
                  if (!ref.hasOwnProperty("current")) {
                    error("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", getComponentNameFromFiber(finishedWork));
                  }
                }
                ref.current = instanceToUse;
              }
            }
          }
          function detachFiberMutation(fiber) {
            var alternate = fiber.alternate;
            if (alternate !== null) {
              alternate.return = null;
            }
            fiber.return = null;
          }
          function detachFiberAfterEffects(fiber) {
            var alternate = fiber.alternate;
            if (alternate !== null) {
              fiber.alternate = null;
              detachFiberAfterEffects(alternate);
            }
            {
              fiber.child = null;
              fiber.deletions = null;
              fiber.sibling = null;
              if (fiber.tag === HostComponent) {
                var hostInstance = fiber.stateNode;
                if (hostInstance !== null) {
                  detachDeletedInstance(hostInstance);
                }
              }
              fiber.stateNode = null;
              {
                fiber._debugOwner = null;
              }
              {
                fiber.return = null;
                fiber.dependencies = null;
                fiber.memoizedProps = null;
                fiber.memoizedState = null;
                fiber.pendingProps = null;
                fiber.stateNode = null;
                fiber.updateQueue = null;
              }
            }
          }
          function emptyPortalContainer(current2) {
            if (!supportsPersistence) {
              return;
            }
            var portal = current2.stateNode;
            var containerInfo = portal.containerInfo;
            var emptyChildSet = createContainerChildSet(containerInfo);
            replaceContainerChildren(containerInfo, emptyChildSet);
          }
          function getHostParentFiber(fiber) {
            var parent = fiber.return;
            while (parent !== null) {
              if (isHostParent(parent)) {
                return parent;
              }
              parent = parent.return;
            }
            throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
          }
          function isHostParent(fiber) {
            return fiber.tag === HostComponent || fiber.tag === HostRoot || fiber.tag === HostPortal;
          }
          function getHostSibling(fiber) {
            var node = fiber;
            siblings:
              while (true) {
                while (node.sibling === null) {
                  if (node.return === null || isHostParent(node.return)) {
                    return null;
                  }
                  node = node.return;
                }
                node.sibling.return = node.return;
                node = node.sibling;
                while (node.tag !== HostComponent && node.tag !== HostText && node.tag !== DehydratedFragment) {
                  if (node.flags & Placement) {
                    continue siblings;
                  }
                  if (node.child === null || node.tag === HostPortal) {
                    continue siblings;
                  } else {
                    node.child.return = node;
                    node = node.child;
                  }
                }
                if (!(node.flags & Placement)) {
                  return node.stateNode;
                }
              }
          }
          function commitPlacement(finishedWork) {
            if (!supportsMutation) {
              return;
            }
            var parentFiber = getHostParentFiber(finishedWork);
            switch (parentFiber.tag) {
              case HostComponent: {
                var parent = parentFiber.stateNode;
                if (parentFiber.flags & ContentReset) {
                  resetTextContent(parent);
                  parentFiber.flags &= ~ContentReset;
                }
                var before = getHostSibling(finishedWork);
                insertOrAppendPlacementNode(finishedWork, before, parent);
                break;
              }
              case HostRoot:
              case HostPortal: {
                var _parent = parentFiber.stateNode.containerInfo;
                var _before = getHostSibling(finishedWork);
                insertOrAppendPlacementNodeIntoContainer(finishedWork, _before, _parent);
                break;
              }
              default:
                throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
            }
          }
          function insertOrAppendPlacementNodeIntoContainer(node, before, parent) {
            var tag = node.tag;
            var isHost = tag === HostComponent || tag === HostText;
            if (isHost) {
              var stateNode = node.stateNode;
              if (before) {
                insertInContainerBefore(parent, stateNode, before);
              } else {
                appendChildToContainer(parent, stateNode);
              }
            } else if (tag === HostPortal)
              ;
            else {
              var child = node.child;
              if (child !== null) {
                insertOrAppendPlacementNodeIntoContainer(child, before, parent);
                var sibling = child.sibling;
                while (sibling !== null) {
                  insertOrAppendPlacementNodeIntoContainer(sibling, before, parent);
                  sibling = sibling.sibling;
                }
              }
            }
          }
          function insertOrAppendPlacementNode(node, before, parent) {
            var tag = node.tag;
            var isHost = tag === HostComponent || tag === HostText;
            if (isHost) {
              var stateNode = node.stateNode;
              if (before) {
                insertBefore2(parent, stateNode, before);
              } else {
                appendChild2(parent, stateNode);
              }
            } else if (tag === HostPortal)
              ;
            else {
              var child = node.child;
              if (child !== null) {
                insertOrAppendPlacementNode(child, before, parent);
                var sibling = child.sibling;
                while (sibling !== null) {
                  insertOrAppendPlacementNode(sibling, before, parent);
                  sibling = sibling.sibling;
                }
              }
            }
          }
          var hostParent = null;
          var hostParentIsContainer = false;
          function commitDeletionEffects(root, returnFiber, deletedFiber) {
            if (supportsMutation) {
              var parent = returnFiber;
              findParent:
                while (parent !== null) {
                  switch (parent.tag) {
                    case HostComponent: {
                      hostParent = parent.stateNode;
                      hostParentIsContainer = false;
                      break findParent;
                    }
                    case HostRoot: {
                      hostParent = parent.stateNode.containerInfo;
                      hostParentIsContainer = true;
                      break findParent;
                    }
                    case HostPortal: {
                      hostParent = parent.stateNode.containerInfo;
                      hostParentIsContainer = true;
                      break findParent;
                    }
                  }
                  parent = parent.return;
                }
              if (hostParent === null) {
                throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
              }
              commitDeletionEffectsOnFiber(root, returnFiber, deletedFiber);
              hostParent = null;
              hostParentIsContainer = false;
            } else {
              commitDeletionEffectsOnFiber(root, returnFiber, deletedFiber);
            }
            detachFiberMutation(deletedFiber);
          }
          function recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, parent) {
            var child = parent.child;
            while (child !== null) {
              commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, child);
              child = child.sibling;
            }
          }
          function commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, deletedFiber) {
            onCommitUnmount(deletedFiber);
            switch (deletedFiber.tag) {
              case HostComponent: {
                if (!offscreenSubtreeWasHidden) {
                  safelyDetachRef(deletedFiber, nearestMountedAncestor);
                }
              }
              case HostText: {
                if (supportsMutation) {
                  var prevHostParent = hostParent;
                  var prevHostParentIsContainer = hostParentIsContainer;
                  hostParent = null;
                  recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
                  hostParent = prevHostParent;
                  hostParentIsContainer = prevHostParentIsContainer;
                  if (hostParent !== null) {
                    if (hostParentIsContainer) {
                      removeChildFromContainer(hostParent, deletedFiber.stateNode);
                    } else {
                      removeChild2(hostParent, deletedFiber.stateNode);
                    }
                  }
                } else {
                  recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
                }
                return;
              }
              case DehydratedFragment: {
                if (supportsMutation) {
                  if (hostParent !== null) {
                    if (hostParentIsContainer) {
                      clearSuspenseBoundaryFromContainer(hostParent, deletedFiber.stateNode);
                    } else {
                      clearSuspenseBoundary(hostParent, deletedFiber.stateNode);
                    }
                  }
                }
                return;
              }
              case HostPortal: {
                if (supportsMutation) {
                  var _prevHostParent = hostParent;
                  var _prevHostParentIsContainer = hostParentIsContainer;
                  hostParent = deletedFiber.stateNode.containerInfo;
                  hostParentIsContainer = true;
                  recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
                  hostParent = _prevHostParent;
                  hostParentIsContainer = _prevHostParentIsContainer;
                } else {
                  emptyPortalContainer(deletedFiber);
                  recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
                }
                return;
              }
              case FunctionComponent:
              case ForwardRef:
              case MemoComponent:
              case SimpleMemoComponent: {
                if (!offscreenSubtreeWasHidden) {
                  var updateQueue = deletedFiber.updateQueue;
                  if (updateQueue !== null) {
                    var lastEffect = updateQueue.lastEffect;
                    if (lastEffect !== null) {
                      var firstEffect = lastEffect.next;
                      var effect = firstEffect;
                      do {
                        var _effect = effect, destroy = _effect.destroy, tag = _effect.tag;
                        if (destroy !== void 0) {
                          if ((tag & Insertion) !== NoFlags$1) {
                            safelyCallDestroy(deletedFiber, nearestMountedAncestor, destroy);
                          } else if ((tag & Layout) !== NoFlags$1) {
                            {
                              markComponentLayoutEffectUnmountStarted(deletedFiber);
                            }
                            if (deletedFiber.mode & ProfileMode) {
                              startLayoutEffectTimer();
                              safelyCallDestroy(deletedFiber, nearestMountedAncestor, destroy);
                              recordLayoutEffectDuration(deletedFiber);
                            } else {
                              safelyCallDestroy(deletedFiber, nearestMountedAncestor, destroy);
                            }
                            {
                              markComponentLayoutEffectUnmountStopped();
                            }
                          }
                        }
                        effect = effect.next;
                      } while (effect !== firstEffect);
                    }
                  }
                }
                recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
                return;
              }
              case ClassComponent: {
                if (!offscreenSubtreeWasHidden) {
                  safelyDetachRef(deletedFiber, nearestMountedAncestor);
                  var instance = deletedFiber.stateNode;
                  if (typeof instance.componentWillUnmount === "function") {
                    safelyCallComponentWillUnmount(deletedFiber, nearestMountedAncestor, instance);
                  }
                }
                recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
                return;
              }
              case ScopeComponent: {
                recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
                return;
              }
              case OffscreenComponent: {
                if (
                  // TODO: Remove this dead flag
                  deletedFiber.mode & ConcurrentMode
                ) {
                  var prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
                  offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden || deletedFiber.memoizedState !== null;
                  recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
                  offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
                } else {
                  recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
                }
                break;
              }
              default: {
                recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
                return;
              }
            }
          }
          function commitSuspenseCallback(finishedWork) {
            var newState = finishedWork.memoizedState;
          }
          function commitSuspenseHydrationCallbacks(finishedRoot, finishedWork) {
            if (!supportsHydration) {
              return;
            }
            var newState = finishedWork.memoizedState;
            if (newState === null) {
              var current2 = finishedWork.alternate;
              if (current2 !== null) {
                var prevState = current2.memoizedState;
                if (prevState !== null) {
                  var suspenseInstance = prevState.dehydrated;
                  if (suspenseInstance !== null) {
                    commitHydratedSuspenseInstance(suspenseInstance);
                  }
                }
              }
            }
          }
          function attachSuspenseRetryListeners(finishedWork) {
            var wakeables = finishedWork.updateQueue;
            if (wakeables !== null) {
              finishedWork.updateQueue = null;
              var retryCache = finishedWork.stateNode;
              if (retryCache === null) {
                retryCache = finishedWork.stateNode = new PossiblyWeakSet();
              }
              wakeables.forEach(function(wakeable) {
                var retry = resolveRetryWakeable.bind(null, finishedWork, wakeable);
                if (!retryCache.has(wakeable)) {
                  retryCache.add(wakeable);
                  {
                    if (isDevToolsPresent) {
                      if (inProgressLanes !== null && inProgressRoot !== null) {
                        restorePendingUpdaters(inProgressRoot, inProgressLanes);
                      } else {
                        throw Error("Expected finished root and lanes to be set. This is a bug in React.");
                      }
                    }
                  }
                  wakeable.then(retry, retry);
                }
              });
            }
          }
          function commitMutationEffects(root, finishedWork, committedLanes) {
            inProgressLanes = committedLanes;
            inProgressRoot = root;
            setCurrentFiber(finishedWork);
            commitMutationEffectsOnFiber(finishedWork, root);
            setCurrentFiber(finishedWork);
            inProgressLanes = null;
            inProgressRoot = null;
          }
          function recursivelyTraverseMutationEffects(root, parentFiber, lanes) {
            var deletions = parentFiber.deletions;
            if (deletions !== null) {
              for (var i = 0; i < deletions.length; i++) {
                var childToDelete = deletions[i];
                try {
                  commitDeletionEffects(root, parentFiber, childToDelete);
                } catch (error2) {
                  captureCommitPhaseError(childToDelete, parentFiber, error2);
                }
              }
            }
            var prevDebugFiber = getCurrentFiber();
            if (parentFiber.subtreeFlags & MutationMask) {
              var child = parentFiber.child;
              while (child !== null) {
                setCurrentFiber(child);
                commitMutationEffectsOnFiber(child, root);
                child = child.sibling;
              }
            }
            setCurrentFiber(prevDebugFiber);
          }
          function commitMutationEffectsOnFiber(finishedWork, root, lanes) {
            var current2 = finishedWork.alternate;
            var flags = finishedWork.flags;
            switch (finishedWork.tag) {
              case FunctionComponent:
              case ForwardRef:
              case MemoComponent:
              case SimpleMemoComponent: {
                recursivelyTraverseMutationEffects(root, finishedWork);
                commitReconciliationEffects(finishedWork);
                if (flags & Update) {
                  try {
                    commitHookEffectListUnmount(Insertion | HasEffect, finishedWork, finishedWork.return);
                    commitHookEffectListMount(Insertion | HasEffect, finishedWork);
                  } catch (error2) {
                    captureCommitPhaseError(finishedWork, finishedWork.return, error2);
                  }
                  if (finishedWork.mode & ProfileMode) {
                    try {
                      startLayoutEffectTimer();
                      commitHookEffectListUnmount(Layout | HasEffect, finishedWork, finishedWork.return);
                    } catch (error2) {
                      captureCommitPhaseError(finishedWork, finishedWork.return, error2);
                    }
                    recordLayoutEffectDuration(finishedWork);
                  } else {
                    try {
                      commitHookEffectListUnmount(Layout | HasEffect, finishedWork, finishedWork.return);
                    } catch (error2) {
                      captureCommitPhaseError(finishedWork, finishedWork.return, error2);
                    }
                  }
                }
                return;
              }
              case ClassComponent: {
                recursivelyTraverseMutationEffects(root, finishedWork);
                commitReconciliationEffects(finishedWork);
                if (flags & Ref) {
                  if (current2 !== null) {
                    safelyDetachRef(current2, current2.return);
                  }
                }
                return;
              }
              case HostComponent: {
                recursivelyTraverseMutationEffects(root, finishedWork);
                commitReconciliationEffects(finishedWork);
                if (flags & Ref) {
                  if (current2 !== null) {
                    safelyDetachRef(current2, current2.return);
                  }
                }
                if (supportsMutation) {
                  if (finishedWork.flags & ContentReset) {
                    var instance = finishedWork.stateNode;
                    try {
                      resetTextContent(instance);
                    } catch (error2) {
                      captureCommitPhaseError(finishedWork, finishedWork.return, error2);
                    }
                  }
                  if (flags & Update) {
                    var _instance4 = finishedWork.stateNode;
                    if (_instance4 != null) {
                      var newProps = finishedWork.memoizedProps;
                      var oldProps = current2 !== null ? current2.memoizedProps : newProps;
                      var type = finishedWork.type;
                      var updatePayload = finishedWork.updateQueue;
                      finishedWork.updateQueue = null;
                      if (updatePayload !== null) {
                        try {
                          commitUpdate(_instance4, updatePayload, type, oldProps, newProps, finishedWork);
                        } catch (error2) {
                          captureCommitPhaseError(finishedWork, finishedWork.return, error2);
                        }
                      }
                    }
                  }
                }
                return;
              }
              case HostText: {
                recursivelyTraverseMutationEffects(root, finishedWork);
                commitReconciliationEffects(finishedWork);
                if (flags & Update) {
                  if (supportsMutation) {
                    if (finishedWork.stateNode === null) {
                      throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
                    }
                    var textInstance = finishedWork.stateNode;
                    var newText = finishedWork.memoizedProps;
                    var oldText = current2 !== null ? current2.memoizedProps : newText;
                    try {
                      commitTextUpdate(textInstance, oldText, newText);
                    } catch (error2) {
                      captureCommitPhaseError(finishedWork, finishedWork.return, error2);
                    }
                  }
                }
                return;
              }
              case HostRoot: {
                recursivelyTraverseMutationEffects(root, finishedWork);
                commitReconciliationEffects(finishedWork);
                if (flags & Update) {
                  if (supportsMutation && supportsHydration) {
                    if (current2 !== null) {
                      var prevRootState = current2.memoizedState;
                      if (prevRootState.isDehydrated) {
                        try {
                          commitHydratedContainer(root.containerInfo);
                        } catch (error2) {
                          captureCommitPhaseError(finishedWork, finishedWork.return, error2);
                        }
                      }
                    }
                  }
                  if (supportsPersistence) {
                    var containerInfo = root.containerInfo;
                    var pendingChildren = root.pendingChildren;
                    try {
                      replaceContainerChildren(containerInfo, pendingChildren);
                    } catch (error2) {
                      captureCommitPhaseError(finishedWork, finishedWork.return, error2);
                    }
                  }
                }
                return;
              }
              case HostPortal: {
                recursivelyTraverseMutationEffects(root, finishedWork);
                commitReconciliationEffects(finishedWork);
                if (flags & Update) {
                  if (supportsPersistence) {
                    var portal = finishedWork.stateNode;
                    var _containerInfo = portal.containerInfo;
                    var _pendingChildren = portal.pendingChildren;
                    try {
                      replaceContainerChildren(_containerInfo, _pendingChildren);
                    } catch (error2) {
                      captureCommitPhaseError(finishedWork, finishedWork.return, error2);
                    }
                  }
                }
                return;
              }
              case SuspenseComponent: {
                recursivelyTraverseMutationEffects(root, finishedWork);
                commitReconciliationEffects(finishedWork);
                var offscreenFiber = finishedWork.child;
                if (offscreenFiber.flags & Visibility) {
                  var offscreenInstance = offscreenFiber.stateNode;
                  var newState = offscreenFiber.memoizedState;
                  var isHidden = newState !== null;
                  offscreenInstance.isHidden = isHidden;
                  if (isHidden) {
                    var wasHidden = offscreenFiber.alternate !== null && offscreenFiber.alternate.memoizedState !== null;
                    if (!wasHidden) {
                      markCommitTimeOfFallback();
                    }
                  }
                }
                if (flags & Update) {
                  try {
                    commitSuspenseCallback(finishedWork);
                  } catch (error2) {
                    captureCommitPhaseError(finishedWork, finishedWork.return, error2);
                  }
                  attachSuspenseRetryListeners(finishedWork);
                }
                return;
              }
              case OffscreenComponent: {
                var _wasHidden = current2 !== null && current2.memoizedState !== null;
                if (
                  // TODO: Remove this dead flag
                  finishedWork.mode & ConcurrentMode
                ) {
                  var prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
                  offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden || _wasHidden;
                  recursivelyTraverseMutationEffects(root, finishedWork);
                  offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
                } else {
                  recursivelyTraverseMutationEffects(root, finishedWork);
                }
                commitReconciliationEffects(finishedWork);
                if (flags & Visibility) {
                  var _offscreenInstance = finishedWork.stateNode;
                  var _newState = finishedWork.memoizedState;
                  var _isHidden = _newState !== null;
                  var offscreenBoundary = finishedWork;
                  _offscreenInstance.isHidden = _isHidden;
                  {
                    if (_isHidden) {
                      if (!_wasHidden) {
                        if ((offscreenBoundary.mode & ConcurrentMode) !== NoMode) {
                          nextEffect = offscreenBoundary;
                          var offscreenChild = offscreenBoundary.child;
                          while (offscreenChild !== null) {
                            nextEffect = offscreenChild;
                            disappearLayoutEffects_begin(offscreenChild);
                            offscreenChild = offscreenChild.sibling;
                          }
                        }
                      }
                    }
                  }
                  if (supportsMutation) {
                    hideOrUnhideAllChildren(offscreenBoundary, _isHidden);
                  }
                }
                return;
              }
              case SuspenseListComponent: {
                recursivelyTraverseMutationEffects(root, finishedWork);
                commitReconciliationEffects(finishedWork);
                if (flags & Update) {
                  attachSuspenseRetryListeners(finishedWork);
                }
                return;
              }
              case ScopeComponent: {
                return;
              }
              default: {
                recursivelyTraverseMutationEffects(root, finishedWork);
                commitReconciliationEffects(finishedWork);
                return;
              }
            }
          }
          function commitReconciliationEffects(finishedWork) {
            var flags = finishedWork.flags;
            if (flags & Placement) {
              try {
                commitPlacement(finishedWork);
              } catch (error2) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error2);
              }
              finishedWork.flags &= ~Placement;
            }
            if (flags & Hydrating) {
              finishedWork.flags &= ~Hydrating;
            }
          }
          function commitLayoutEffects(finishedWork, root, committedLanes) {
            inProgressLanes = committedLanes;
            inProgressRoot = root;
            nextEffect = finishedWork;
            commitLayoutEffects_begin(finishedWork, root, committedLanes);
            inProgressLanes = null;
            inProgressRoot = null;
          }
          function commitLayoutEffects_begin(subtreeRoot, root, committedLanes) {
            var isModernRoot = (subtreeRoot.mode & ConcurrentMode) !== NoMode;
            while (nextEffect !== null) {
              var fiber = nextEffect;
              var firstChild = fiber.child;
              if (fiber.tag === OffscreenComponent && isModernRoot) {
                var isHidden = fiber.memoizedState !== null;
                var newOffscreenSubtreeIsHidden = isHidden || offscreenSubtreeIsHidden;
                if (newOffscreenSubtreeIsHidden) {
                  commitLayoutMountEffects_complete(subtreeRoot, root, committedLanes);
                  continue;
                } else {
                  var current2 = fiber.alternate;
                  var wasHidden = current2 !== null && current2.memoizedState !== null;
                  var newOffscreenSubtreeWasHidden = wasHidden || offscreenSubtreeWasHidden;
                  var prevOffscreenSubtreeIsHidden = offscreenSubtreeIsHidden;
                  var prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
                  offscreenSubtreeIsHidden = newOffscreenSubtreeIsHidden;
                  offscreenSubtreeWasHidden = newOffscreenSubtreeWasHidden;
                  if (offscreenSubtreeWasHidden && !prevOffscreenSubtreeWasHidden) {
                    nextEffect = fiber;
                    reappearLayoutEffects_begin(fiber);
                  }
                  var child = firstChild;
                  while (child !== null) {
                    nextEffect = child;
                    commitLayoutEffects_begin(
                      child,
                      // New root; bubble back up to here and stop.
                      root,
                      committedLanes
                    );
                    child = child.sibling;
                  }
                  nextEffect = fiber;
                  offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden;
                  offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
                  commitLayoutMountEffects_complete(subtreeRoot, root, committedLanes);
                  continue;
                }
              }
              if ((fiber.subtreeFlags & LayoutMask) !== NoFlags && firstChild !== null) {
                firstChild.return = fiber;
                nextEffect = firstChild;
              } else {
                commitLayoutMountEffects_complete(subtreeRoot, root, committedLanes);
              }
            }
          }
          function commitLayoutMountEffects_complete(subtreeRoot, root, committedLanes) {
            while (nextEffect !== null) {
              var fiber = nextEffect;
              if ((fiber.flags & LayoutMask) !== NoFlags) {
                var current2 = fiber.alternate;
                setCurrentFiber(fiber);
                try {
                  commitLayoutEffectOnFiber(root, current2, fiber, committedLanes);
                } catch (error2) {
                  captureCommitPhaseError(fiber, fiber.return, error2);
                }
                resetCurrentFiber();
              }
              if (fiber === subtreeRoot) {
                nextEffect = null;
                return;
              }
              var sibling = fiber.sibling;
              if (sibling !== null) {
                sibling.return = fiber.return;
                nextEffect = sibling;
                return;
              }
              nextEffect = fiber.return;
            }
          }
          function disappearLayoutEffects_begin(subtreeRoot) {
            while (nextEffect !== null) {
              var fiber = nextEffect;
              var firstChild = fiber.child;
              switch (fiber.tag) {
                case FunctionComponent:
                case ForwardRef:
                case MemoComponent:
                case SimpleMemoComponent: {
                  if (fiber.mode & ProfileMode) {
                    try {
                      startLayoutEffectTimer();
                      commitHookEffectListUnmount(Layout, fiber, fiber.return);
                    } finally {
                      recordLayoutEffectDuration(fiber);
                    }
                  } else {
                    commitHookEffectListUnmount(Layout, fiber, fiber.return);
                  }
                  break;
                }
                case ClassComponent: {
                  safelyDetachRef(fiber, fiber.return);
                  var instance = fiber.stateNode;
                  if (typeof instance.componentWillUnmount === "function") {
                    safelyCallComponentWillUnmount(fiber, fiber.return, instance);
                  }
                  break;
                }
                case HostComponent: {
                  safelyDetachRef(fiber, fiber.return);
                  break;
                }
                case OffscreenComponent: {
                  var isHidden = fiber.memoizedState !== null;
                  if (isHidden) {
                    disappearLayoutEffects_complete(subtreeRoot);
                    continue;
                  }
                  break;
                }
              }
              if (firstChild !== null) {
                firstChild.return = fiber;
                nextEffect = firstChild;
              } else {
                disappearLayoutEffects_complete(subtreeRoot);
              }
            }
          }
          function disappearLayoutEffects_complete(subtreeRoot) {
            while (nextEffect !== null) {
              var fiber = nextEffect;
              if (fiber === subtreeRoot) {
                nextEffect = null;
                return;
              }
              var sibling = fiber.sibling;
              if (sibling !== null) {
                sibling.return = fiber.return;
                nextEffect = sibling;
                return;
              }
              nextEffect = fiber.return;
            }
          }
          function reappearLayoutEffects_begin(subtreeRoot) {
            while (nextEffect !== null) {
              var fiber = nextEffect;
              var firstChild = fiber.child;
              if (fiber.tag === OffscreenComponent) {
                var isHidden = fiber.memoizedState !== null;
                if (isHidden) {
                  reappearLayoutEffects_complete(subtreeRoot);
                  continue;
                }
              }
              if (firstChild !== null) {
                firstChild.return = fiber;
                nextEffect = firstChild;
              } else {
                reappearLayoutEffects_complete(subtreeRoot);
              }
            }
          }
          function reappearLayoutEffects_complete(subtreeRoot) {
            while (nextEffect !== null) {
              var fiber = nextEffect;
              setCurrentFiber(fiber);
              try {
                reappearLayoutEffectsOnFiber(fiber);
              } catch (error2) {
                captureCommitPhaseError(fiber, fiber.return, error2);
              }
              resetCurrentFiber();
              if (fiber === subtreeRoot) {
                nextEffect = null;
                return;
              }
              var sibling = fiber.sibling;
              if (sibling !== null) {
                sibling.return = fiber.return;
                nextEffect = sibling;
                return;
              }
              nextEffect = fiber.return;
            }
          }
          function commitPassiveMountEffects(root, finishedWork, committedLanes, committedTransitions) {
            nextEffect = finishedWork;
            commitPassiveMountEffects_begin(finishedWork, root, committedLanes, committedTransitions);
          }
          function commitPassiveMountEffects_begin(subtreeRoot, root, committedLanes, committedTransitions) {
            while (nextEffect !== null) {
              var fiber = nextEffect;
              var firstChild = fiber.child;
              if ((fiber.subtreeFlags & PassiveMask) !== NoFlags && firstChild !== null) {
                firstChild.return = fiber;
                nextEffect = firstChild;
              } else {
                commitPassiveMountEffects_complete(subtreeRoot, root, committedLanes, committedTransitions);
              }
            }
          }
          function commitPassiveMountEffects_complete(subtreeRoot, root, committedLanes, committedTransitions) {
            while (nextEffect !== null) {
              var fiber = nextEffect;
              if ((fiber.flags & Passive) !== NoFlags) {
                setCurrentFiber(fiber);
                try {
                  commitPassiveMountOnFiber(root, fiber, committedLanes, committedTransitions);
                } catch (error2) {
                  captureCommitPhaseError(fiber, fiber.return, error2);
                }
                resetCurrentFiber();
              }
              if (fiber === subtreeRoot) {
                nextEffect = null;
                return;
              }
              var sibling = fiber.sibling;
              if (sibling !== null) {
                sibling.return = fiber.return;
                nextEffect = sibling;
                return;
              }
              nextEffect = fiber.return;
            }
          }
          function commitPassiveMountOnFiber(finishedRoot, finishedWork, committedLanes, committedTransitions) {
            switch (finishedWork.tag) {
              case FunctionComponent:
              case ForwardRef:
              case SimpleMemoComponent: {
                if (finishedWork.mode & ProfileMode) {
                  startPassiveEffectTimer();
                  try {
                    commitHookEffectListMount(Passive$1 | HasEffect, finishedWork);
                  } finally {
                    recordPassiveEffectDuration(finishedWork);
                  }
                } else {
                  commitHookEffectListMount(Passive$1 | HasEffect, finishedWork);
                }
                break;
              }
            }
          }
          function commitPassiveUnmountEffects(firstChild) {
            nextEffect = firstChild;
            commitPassiveUnmountEffects_begin();
          }
          function commitPassiveUnmountEffects_begin() {
            while (nextEffect !== null) {
              var fiber = nextEffect;
              var child = fiber.child;
              if ((nextEffect.flags & ChildDeletion) !== NoFlags) {
                var deletions = fiber.deletions;
                if (deletions !== null) {
                  for (var i = 0; i < deletions.length; i++) {
                    var fiberToDelete = deletions[i];
                    nextEffect = fiberToDelete;
                    commitPassiveUnmountEffectsInsideOfDeletedTree_begin(fiberToDelete, fiber);
                  }
                  {
                    var previousFiber = fiber.alternate;
                    if (previousFiber !== null) {
                      var detachedChild = previousFiber.child;
                      if (detachedChild !== null) {
                        previousFiber.child = null;
                        do {
                          var detachedSibling = detachedChild.sibling;
                          detachedChild.sibling = null;
                          detachedChild = detachedSibling;
                        } while (detachedChild !== null);
                      }
                    }
                  }
                  nextEffect = fiber;
                }
              }
              if ((fiber.subtreeFlags & PassiveMask) !== NoFlags && child !== null) {
                child.return = fiber;
                nextEffect = child;
              } else {
                commitPassiveUnmountEffects_complete();
              }
            }
          }
          function commitPassiveUnmountEffects_complete() {
            while (nextEffect !== null) {
              var fiber = nextEffect;
              if ((fiber.flags & Passive) !== NoFlags) {
                setCurrentFiber(fiber);
                commitPassiveUnmountOnFiber(fiber);
                resetCurrentFiber();
              }
              var sibling = fiber.sibling;
              if (sibling !== null) {
                sibling.return = fiber.return;
                nextEffect = sibling;
                return;
              }
              nextEffect = fiber.return;
            }
          }
          function commitPassiveUnmountOnFiber(finishedWork) {
            switch (finishedWork.tag) {
              case FunctionComponent:
              case ForwardRef:
              case SimpleMemoComponent: {
                if (finishedWork.mode & ProfileMode) {
                  startPassiveEffectTimer();
                  commitHookEffectListUnmount(Passive$1 | HasEffect, finishedWork, finishedWork.return);
                  recordPassiveEffectDuration(finishedWork);
                } else {
                  commitHookEffectListUnmount(Passive$1 | HasEffect, finishedWork, finishedWork.return);
                }
                break;
              }
            }
          }
          function commitPassiveUnmountEffectsInsideOfDeletedTree_begin(deletedSubtreeRoot, nearestMountedAncestor) {
            while (nextEffect !== null) {
              var fiber = nextEffect;
              setCurrentFiber(fiber);
              commitPassiveUnmountInsideDeletedTreeOnFiber(fiber, nearestMountedAncestor);
              resetCurrentFiber();
              var child = fiber.child;
              if (child !== null) {
                child.return = fiber;
                nextEffect = child;
              } else {
                commitPassiveUnmountEffectsInsideOfDeletedTree_complete(deletedSubtreeRoot);
              }
            }
          }
          function commitPassiveUnmountEffectsInsideOfDeletedTree_complete(deletedSubtreeRoot) {
            while (nextEffect !== null) {
              var fiber = nextEffect;
              var sibling = fiber.sibling;
              var returnFiber = fiber.return;
              {
                detachFiberAfterEffects(fiber);
                if (fiber === deletedSubtreeRoot) {
                  nextEffect = null;
                  return;
                }
              }
              if (sibling !== null) {
                sibling.return = returnFiber;
                nextEffect = sibling;
                return;
              }
              nextEffect = returnFiber;
            }
          }
          function commitPassiveUnmountInsideDeletedTreeOnFiber(current2, nearestMountedAncestor) {
            switch (current2.tag) {
              case FunctionComponent:
              case ForwardRef:
              case SimpleMemoComponent: {
                if (current2.mode & ProfileMode) {
                  startPassiveEffectTimer();
                  commitHookEffectListUnmount(Passive$1, current2, nearestMountedAncestor);
                  recordPassiveEffectDuration(current2);
                } else {
                  commitHookEffectListUnmount(Passive$1, current2, nearestMountedAncestor);
                }
                break;
              }
            }
          }
          function invokeLayoutEffectMountInDEV(fiber) {
            {
              switch (fiber.tag) {
                case FunctionComponent:
                case ForwardRef:
                case SimpleMemoComponent: {
                  try {
                    commitHookEffectListMount(Layout | HasEffect, fiber);
                  } catch (error2) {
                    captureCommitPhaseError(fiber, fiber.return, error2);
                  }
                  break;
                }
                case ClassComponent: {
                  var instance = fiber.stateNode;
                  try {
                    instance.componentDidMount();
                  } catch (error2) {
                    captureCommitPhaseError(fiber, fiber.return, error2);
                  }
                  break;
                }
              }
            }
          }
          function invokePassiveEffectMountInDEV(fiber) {
            {
              switch (fiber.tag) {
                case FunctionComponent:
                case ForwardRef:
                case SimpleMemoComponent: {
                  try {
                    commitHookEffectListMount(Passive$1 | HasEffect, fiber);
                  } catch (error2) {
                    captureCommitPhaseError(fiber, fiber.return, error2);
                  }
                  break;
                }
              }
            }
          }
          function invokeLayoutEffectUnmountInDEV(fiber) {
            {
              switch (fiber.tag) {
                case FunctionComponent:
                case ForwardRef:
                case SimpleMemoComponent: {
                  try {
                    commitHookEffectListUnmount(Layout | HasEffect, fiber, fiber.return);
                  } catch (error2) {
                    captureCommitPhaseError(fiber, fiber.return, error2);
                  }
                  break;
                }
                case ClassComponent: {
                  var instance = fiber.stateNode;
                  if (typeof instance.componentWillUnmount === "function") {
                    safelyCallComponentWillUnmount(fiber, fiber.return, instance);
                  }
                  break;
                }
              }
            }
          }
          function invokePassiveEffectUnmountInDEV(fiber) {
            {
              switch (fiber.tag) {
                case FunctionComponent:
                case ForwardRef:
                case SimpleMemoComponent: {
                  try {
                    commitHookEffectListUnmount(Passive$1 | HasEffect, fiber, fiber.return);
                  } catch (error2) {
                    captureCommitPhaseError(fiber, fiber.return, error2);
                  }
                }
              }
            }
          }
          var COMPONENT_TYPE = 0;
          var HAS_PSEUDO_CLASS_TYPE = 1;
          var ROLE_TYPE = 2;
          var TEST_NAME_TYPE = 3;
          var TEXT_TYPE = 4;
          if (typeof Symbol === "function" && Symbol.for) {
            var symbolFor = Symbol.for;
            COMPONENT_TYPE = symbolFor("selector.component");
            HAS_PSEUDO_CLASS_TYPE = symbolFor("selector.has_pseudo_class");
            ROLE_TYPE = symbolFor("selector.role");
            TEST_NAME_TYPE = symbolFor("selector.test_id");
            TEXT_TYPE = symbolFor("selector.text");
          }
          function createComponentSelector(component) {
            return {
              $$typeof: COMPONENT_TYPE,
              value: component
            };
          }
          function createHasPseudoClassSelector(selectors) {
            return {
              $$typeof: HAS_PSEUDO_CLASS_TYPE,
              value: selectors
            };
          }
          function createRoleSelector(role) {
            return {
              $$typeof: ROLE_TYPE,
              value: role
            };
          }
          function createTextSelector(text) {
            return {
              $$typeof: TEXT_TYPE,
              value: text
            };
          }
          function createTestNameSelector(id) {
            return {
              $$typeof: TEST_NAME_TYPE,
              value: id
            };
          }
          function findFiberRootForHostRoot(hostRoot) {
            var maybeFiber = getInstanceFromNode(hostRoot);
            if (maybeFiber != null) {
              if (typeof maybeFiber.memoizedProps["data-testname"] !== "string") {
                throw new Error("Invalid host root specified. Should be either a React container or a node with a testname attribute.");
              }
              return maybeFiber;
            } else {
              var fiberRoot = findFiberRoot(hostRoot);
              if (fiberRoot === null) {
                throw new Error("Could not find React container within specified host subtree.");
              }
              return fiberRoot.stateNode.current;
            }
          }
          function matchSelector(fiber, selector) {
            switch (selector.$$typeof) {
              case COMPONENT_TYPE:
                if (fiber.type === selector.value) {
                  return true;
                }
                break;
              case HAS_PSEUDO_CLASS_TYPE:
                return hasMatchingPaths(fiber, selector.value);
              case ROLE_TYPE:
                if (fiber.tag === HostComponent) {
                  var node = fiber.stateNode;
                  if (matchAccessibilityRole(node, selector.value)) {
                    return true;
                  }
                }
                break;
              case TEXT_TYPE:
                if (fiber.tag === HostComponent || fiber.tag === HostText) {
                  var textContent = getTextContent(fiber);
                  if (textContent !== null && textContent.indexOf(selector.value) >= 0) {
                    return true;
                  }
                }
                break;
              case TEST_NAME_TYPE:
                if (fiber.tag === HostComponent) {
                  var dataTestID = fiber.memoizedProps["data-testname"];
                  if (typeof dataTestID === "string" && dataTestID.toLowerCase() === selector.value.toLowerCase()) {
                    return true;
                  }
                }
                break;
              default:
                throw new Error("Invalid selector type specified.");
            }
            return false;
          }
          function selectorToString(selector) {
            switch (selector.$$typeof) {
              case COMPONENT_TYPE:
                var displayName = getComponentNameFromType(selector.value) || "Unknown";
                return "<" + displayName + ">";
              case HAS_PSEUDO_CLASS_TYPE:
                return ":has(" + (selectorToString(selector) || "") + ")";
              case ROLE_TYPE:
                return '[role="' + selector.value + '"]';
              case TEXT_TYPE:
                return '"' + selector.value + '"';
              case TEST_NAME_TYPE:
                return '[data-testname="' + selector.value + '"]';
              default:
                throw new Error("Invalid selector type specified.");
            }
          }
          function findPaths(root, selectors) {
            var matchingFibers = [];
            var stack = [root, 0];
            var index2 = 0;
            while (index2 < stack.length) {
              var fiber = stack[index2++];
              var selectorIndex = stack[index2++];
              var selector = selectors[selectorIndex];
              if (fiber.tag === HostComponent && isHiddenSubtree(fiber)) {
                continue;
              } else {
                while (selector != null && matchSelector(fiber, selector)) {
                  selectorIndex++;
                  selector = selectors[selectorIndex];
                }
              }
              if (selectorIndex === selectors.length) {
                matchingFibers.push(fiber);
              } else {
                var child = fiber.child;
                while (child !== null) {
                  stack.push(child, selectorIndex);
                  child = child.sibling;
                }
              }
            }
            return matchingFibers;
          }
          function hasMatchingPaths(root, selectors) {
            var stack = [root, 0];
            var index2 = 0;
            while (index2 < stack.length) {
              var fiber = stack[index2++];
              var selectorIndex = stack[index2++];
              var selector = selectors[selectorIndex];
              if (fiber.tag === HostComponent && isHiddenSubtree(fiber)) {
                continue;
              } else {
                while (selector != null && matchSelector(fiber, selector)) {
                  selectorIndex++;
                  selector = selectors[selectorIndex];
                }
              }
              if (selectorIndex === selectors.length) {
                return true;
              } else {
                var child = fiber.child;
                while (child !== null) {
                  stack.push(child, selectorIndex);
                  child = child.sibling;
                }
              }
            }
            return false;
          }
          function findAllNodes(hostRoot, selectors) {
            if (!supportsTestSelectors) {
              throw new Error("Test selector API is not supported by this renderer.");
            }
            var root = findFiberRootForHostRoot(hostRoot);
            var matchingFibers = findPaths(root, selectors);
            var instanceRoots = [];
            var stack = Array.from(matchingFibers);
            var index2 = 0;
            while (index2 < stack.length) {
              var node = stack[index2++];
              if (node.tag === HostComponent) {
                if (isHiddenSubtree(node)) {
                  continue;
                }
                instanceRoots.push(node.stateNode);
              } else {
                var child = node.child;
                while (child !== null) {
                  stack.push(child);
                  child = child.sibling;
                }
              }
            }
            return instanceRoots;
          }
          function getFindAllNodesFailureDescription(hostRoot, selectors) {
            if (!supportsTestSelectors) {
              throw new Error("Test selector API is not supported by this renderer.");
            }
            var root = findFiberRootForHostRoot(hostRoot);
            var maxSelectorIndex = 0;
            var matchedNames = [];
            var stack = [root, 0];
            var index2 = 0;
            while (index2 < stack.length) {
              var fiber = stack[index2++];
              var selectorIndex = stack[index2++];
              var selector = selectors[selectorIndex];
              if (fiber.tag === HostComponent && isHiddenSubtree(fiber)) {
                continue;
              } else if (matchSelector(fiber, selector)) {
                matchedNames.push(selectorToString(selector));
                selectorIndex++;
                if (selectorIndex > maxSelectorIndex) {
                  maxSelectorIndex = selectorIndex;
                }
              }
              if (selectorIndex < selectors.length) {
                var child = fiber.child;
                while (child !== null) {
                  stack.push(child, selectorIndex);
                  child = child.sibling;
                }
              }
            }
            if (maxSelectorIndex < selectors.length) {
              var unmatchedNames = [];
              for (var i = maxSelectorIndex; i < selectors.length; i++) {
                unmatchedNames.push(selectorToString(selectors[i]));
              }
              return "findAllNodes was able to match part of the selector:\n" + ("  " + matchedNames.join(" > ") + "\n\n") + "No matching component was found for:\n" + ("  " + unmatchedNames.join(" > "));
            }
            return null;
          }
          function findBoundingRects(hostRoot, selectors) {
            if (!supportsTestSelectors) {
              throw new Error("Test selector API is not supported by this renderer.");
            }
            var instanceRoots = findAllNodes(hostRoot, selectors);
            var boundingRects = [];
            for (var i = 0; i < instanceRoots.length; i++) {
              boundingRects.push(getBoundingRect(instanceRoots[i]));
            }
            for (var _i = boundingRects.length - 1; _i > 0; _i--) {
              var targetRect = boundingRects[_i];
              var targetLeft = targetRect.x;
              var targetRight = targetLeft + targetRect.width;
              var targetTop = targetRect.y;
              var targetBottom = targetTop + targetRect.height;
              for (var j = _i - 1; j >= 0; j--) {
                if (_i !== j) {
                  var otherRect = boundingRects[j];
                  var otherLeft = otherRect.x;
                  var otherRight = otherLeft + otherRect.width;
                  var otherTop = otherRect.y;
                  var otherBottom = otherTop + otherRect.height;
                  if (targetLeft >= otherLeft && targetTop >= otherTop && targetRight <= otherRight && targetBottom <= otherBottom) {
                    boundingRects.splice(_i, 1);
                    break;
                  } else if (targetLeft === otherLeft && targetRect.width === otherRect.width && !(otherBottom < targetTop) && !(otherTop > targetBottom)) {
                    if (otherTop > targetTop) {
                      otherRect.height += otherTop - targetTop;
                      otherRect.y = targetTop;
                    }
                    if (otherBottom < targetBottom) {
                      otherRect.height = targetBottom - otherTop;
                    }
                    boundingRects.splice(_i, 1);
                    break;
                  } else if (targetTop === otherTop && targetRect.height === otherRect.height && !(otherRight < targetLeft) && !(otherLeft > targetRight)) {
                    if (otherLeft > targetLeft) {
                      otherRect.width += otherLeft - targetLeft;
                      otherRect.x = targetLeft;
                    }
                    if (otherRight < targetRight) {
                      otherRect.width = targetRight - otherLeft;
                    }
                    boundingRects.splice(_i, 1);
                    break;
                  }
                }
              }
            }
            return boundingRects;
          }
          function focusWithin(hostRoot, selectors) {
            if (!supportsTestSelectors) {
              throw new Error("Test selector API is not supported by this renderer.");
            }
            var root = findFiberRootForHostRoot(hostRoot);
            var matchingFibers = findPaths(root, selectors);
            var stack = Array.from(matchingFibers);
            var index2 = 0;
            while (index2 < stack.length) {
              var fiber = stack[index2++];
              if (isHiddenSubtree(fiber)) {
                continue;
              }
              if (fiber.tag === HostComponent) {
                var node = fiber.stateNode;
                if (setFocusIfFocusable(node)) {
                  return true;
                }
              }
              var child = fiber.child;
              while (child !== null) {
                stack.push(child);
                child = child.sibling;
              }
            }
            return false;
          }
          var commitHooks = [];
          function onCommitRoot$1() {
            if (supportsTestSelectors) {
              commitHooks.forEach(function(commitHook) {
                return commitHook();
              });
            }
          }
          function observeVisibleRects(hostRoot, selectors, callback, options) {
            if (!supportsTestSelectors) {
              throw new Error("Test selector API is not supported by this renderer.");
            }
            var instanceRoots = findAllNodes(hostRoot, selectors);
            var _setupIntersectionObs = setupIntersectionObserver(instanceRoots, callback, options), disconnect = _setupIntersectionObs.disconnect, observe = _setupIntersectionObs.observe, unobserve = _setupIntersectionObs.unobserve;
            var commitHook = function() {
              var nextInstanceRoots = findAllNodes(hostRoot, selectors);
              instanceRoots.forEach(function(target) {
                if (nextInstanceRoots.indexOf(target) < 0) {
                  unobserve(target);
                }
              });
              nextInstanceRoots.forEach(function(target) {
                if (instanceRoots.indexOf(target) < 0) {
                  observe(target);
                }
              });
            };
            commitHooks.push(commitHook);
            return {
              disconnect: function() {
                var index2 = commitHooks.indexOf(commitHook);
                if (index2 >= 0) {
                  commitHooks.splice(index2, 1);
                }
                disconnect();
              }
            };
          }
          var ReactCurrentActQueue = ReactSharedInternals.ReactCurrentActQueue;
          function isLegacyActEnvironment(fiber) {
            {
              var isReactActEnvironmentGlobal = (
                // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
                typeof IS_REACT_ACT_ENVIRONMENT !== "undefined" ? IS_REACT_ACT_ENVIRONMENT : void 0
              );
              var jestIsDefined = typeof jest !== "undefined";
              return warnsIfNotActing && jestIsDefined && isReactActEnvironmentGlobal !== false;
            }
          }
          function isConcurrentActEnvironment() {
            {
              var isReactActEnvironmentGlobal = (
                // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
                typeof IS_REACT_ACT_ENVIRONMENT !== "undefined" ? IS_REACT_ACT_ENVIRONMENT : void 0
              );
              if (!isReactActEnvironmentGlobal && ReactCurrentActQueue.current !== null) {
                error("The current testing environment is not configured to support act(...)");
              }
              return isReactActEnvironmentGlobal;
            }
          }
          var ceil = Math.ceil;
          var ReactCurrentDispatcher$2 = ReactSharedInternals.ReactCurrentDispatcher, ReactCurrentOwner$2 = ReactSharedInternals.ReactCurrentOwner, ReactCurrentBatchConfig$2 = ReactSharedInternals.ReactCurrentBatchConfig, ReactCurrentActQueue$1 = ReactSharedInternals.ReactCurrentActQueue;
          var NoContext = (
            /*             */
            0
          );
          var BatchedContext = (
            /*               */
            1
          );
          var RenderContext2 = (
            /*                */
            2
          );
          var CommitContext = (
            /*                */
            4
          );
          var RootInProgress = 0;
          var RootFatalErrored = 1;
          var RootErrored = 2;
          var RootSuspended = 3;
          var RootSuspendedWithDelay = 4;
          var RootCompleted = 5;
          var RootDidNotComplete = 6;
          var executionContext = NoContext;
          var workInProgressRoot = null;
          var workInProgress = null;
          var workInProgressRootRenderLanes = NoLanes;
          var subtreeRenderLanes = NoLanes;
          var subtreeRenderLanesCursor = createCursor(NoLanes);
          var workInProgressRootExitStatus = RootInProgress;
          var workInProgressRootFatalError = null;
          var workInProgressRootIncludedLanes = NoLanes;
          var workInProgressRootSkippedLanes = NoLanes;
          var workInProgressRootInterleavedUpdatedLanes = NoLanes;
          var workInProgressRootPingedLanes = NoLanes;
          var workInProgressRootConcurrentErrors = null;
          var workInProgressRootRecoverableErrors = null;
          var globalMostRecentFallbackTime = 0;
          var FALLBACK_THROTTLE_MS = 500;
          var workInProgressRootRenderTargetTime = Infinity;
          var RENDER_TIMEOUT_MS = 500;
          var workInProgressTransitions = null;
          function resetRenderTimer() {
            workInProgressRootRenderTargetTime = now() + RENDER_TIMEOUT_MS;
          }
          function getRenderTargetTime() {
            return workInProgressRootRenderTargetTime;
          }
          var hasUncaughtError = false;
          var firstUncaughtError = null;
          var legacyErrorBoundariesThatAlreadyFailed = null;
          var rootDoesHavePassiveEffects = false;
          var rootWithPendingPassiveEffects = null;
          var pendingPassiveEffectsLanes = NoLanes;
          var pendingPassiveProfilerEffects = [];
          var pendingPassiveTransitions = null;
          var NESTED_UPDATE_LIMIT = 50;
          var nestedUpdateCount = 0;
          var rootWithNestedUpdates = null;
          var isFlushingPassiveEffects = false;
          var didScheduleUpdateDuringPassiveEffects = false;
          var NESTED_PASSIVE_UPDATE_LIMIT = 50;
          var nestedPassiveUpdateCount = 0;
          var rootWithPassiveNestedUpdates = null;
          var currentEventTime = NoTimestamp;
          var currentEventTransitionLane = NoLanes;
          var isRunningInsertionEffect = false;
          function getWorkInProgressRoot() {
            return workInProgressRoot;
          }
          function requestEventTime() {
            if ((executionContext & (RenderContext2 | CommitContext)) !== NoContext) {
              return now();
            }
            if (currentEventTime !== NoTimestamp) {
              return currentEventTime;
            }
            currentEventTime = now();
            return currentEventTime;
          }
          function requestUpdateLane(fiber) {
            var mode = fiber.mode;
            if ((mode & ConcurrentMode) === NoMode) {
              return SyncLane;
            } else if ((executionContext & RenderContext2) !== NoContext && workInProgressRootRenderLanes !== NoLanes) {
              return pickArbitraryLane(workInProgressRootRenderLanes);
            }
            var isTransition = requestCurrentTransition() !== NoTransition;
            if (isTransition) {
              if (ReactCurrentBatchConfig$2.transition !== null) {
                var transition = ReactCurrentBatchConfig$2.transition;
                if (!transition._updatedFibers) {
                  transition._updatedFibers = /* @__PURE__ */ new Set();
                }
                transition._updatedFibers.add(fiber);
              }
              if (currentEventTransitionLane === NoLane) {
                currentEventTransitionLane = claimNextTransitionLane();
              }
              return currentEventTransitionLane;
            }
            var updateLane = getCurrentUpdatePriority();
            if (updateLane !== NoLane) {
              return updateLane;
            }
            var eventLane = getCurrentEventPriority();
            return eventLane;
          }
          function requestRetryLane(fiber) {
            var mode = fiber.mode;
            if ((mode & ConcurrentMode) === NoMode) {
              return SyncLane;
            }
            return claimNextRetryLane();
          }
          function scheduleUpdateOnFiber(root, fiber, lane, eventTime) {
            checkForNestedUpdates();
            {
              if (isRunningInsertionEffect) {
                error("useInsertionEffect must not schedule updates.");
              }
            }
            {
              if (isFlushingPassiveEffects) {
                didScheduleUpdateDuringPassiveEffects = true;
              }
            }
            markRootUpdated(root, lane, eventTime);
            if ((executionContext & RenderContext2) !== NoLanes && root === workInProgressRoot) {
              warnAboutRenderPhaseUpdatesInDEV(fiber);
            } else {
              {
                if (isDevToolsPresent) {
                  addFiberToLanesMap(root, fiber, lane);
                }
              }
              warnIfUpdatesNotWrappedWithActDEV(fiber);
              if (root === workInProgressRoot) {
                if ((executionContext & RenderContext2) === NoContext) {
                  workInProgressRootInterleavedUpdatedLanes = mergeLanes(workInProgressRootInterleavedUpdatedLanes, lane);
                }
                if (workInProgressRootExitStatus === RootSuspendedWithDelay) {
                  markRootSuspended$1(root, workInProgressRootRenderLanes);
                }
              }
              ensureRootIsScheduled(root, eventTime);
              if (lane === SyncLane && executionContext === NoContext && (fiber.mode & ConcurrentMode) === NoMode && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
              !ReactCurrentActQueue$1.isBatchingLegacy) {
                resetRenderTimer();
                flushSyncCallbacksOnlyInLegacyMode();
              }
            }
          }
          function scheduleInitialHydrationOnRoot(root, lane, eventTime) {
            var current2 = root.current;
            current2.lanes = lane;
            markRootUpdated(root, lane, eventTime);
            ensureRootIsScheduled(root, eventTime);
          }
          function isUnsafeClassRenderPhaseUpdate(fiber) {
            return (
              // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
              // decided not to enable it.
              (executionContext & RenderContext2) !== NoContext
            );
          }
          function ensureRootIsScheduled(root, currentTime) {
            var existingCallbackNode = root.callbackNode;
            markStarvedLanesAsExpired(root, currentTime);
            var nextLanes = getNextLanes(root, root === workInProgressRoot ? workInProgressRootRenderLanes : NoLanes);
            if (nextLanes === NoLanes) {
              if (existingCallbackNode !== null) {
                cancelCallback$1(existingCallbackNode);
              }
              root.callbackNode = null;
              root.callbackPriority = NoLane;
              return;
            }
            var newCallbackPriority = getHighestPriorityLane(nextLanes);
            var existingCallbackPriority = root.callbackPriority;
            if (existingCallbackPriority === newCallbackPriority && // Special case related to `act`. If the currently scheduled task is a
            // Scheduler task, rather than an `act` task, cancel it and re-scheduled
            // on the `act` queue.
            !(ReactCurrentActQueue$1.current !== null && existingCallbackNode !== fakeActCallbackNode)) {
              {
                if (existingCallbackNode == null && existingCallbackPriority !== SyncLane) {
                  error("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
                }
              }
              return;
            }
            if (existingCallbackNode != null) {
              cancelCallback$1(existingCallbackNode);
            }
            var newCallbackNode;
            if (newCallbackPriority === SyncLane) {
              if (root.tag === LegacyRoot) {
                if (ReactCurrentActQueue$1.isBatchingLegacy !== null) {
                  ReactCurrentActQueue$1.didScheduleLegacyUpdate = true;
                }
                scheduleLegacySyncCallback(performSyncWorkOnRoot.bind(null, root));
              } else {
                scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root));
              }
              if (supportsMicrotasks) {
                if (ReactCurrentActQueue$1.current !== null) {
                  ReactCurrentActQueue$1.current.push(flushSyncCallbacks);
                } else {
                  scheduleMicrotask2(function() {
                    if ((executionContext & (RenderContext2 | CommitContext)) === NoContext) {
                      flushSyncCallbacks();
                    }
                  });
                }
              } else {
                scheduleCallback$1(ImmediatePriority, flushSyncCallbacks);
              }
              newCallbackNode = null;
            } else {
              var schedulerPriorityLevel;
              switch (lanesToEventPriority(nextLanes)) {
                case DiscreteEventPriority:
                  schedulerPriorityLevel = ImmediatePriority;
                  break;
                case ContinuousEventPriority:
                  schedulerPriorityLevel = UserBlockingPriority;
                  break;
                case DefaultEventPriority:
                  schedulerPriorityLevel = NormalPriority;
                  break;
                case IdleEventPriority:
                  schedulerPriorityLevel = IdlePriority;
                  break;
                default:
                  schedulerPriorityLevel = NormalPriority;
                  break;
              }
              newCallbackNode = scheduleCallback$1(schedulerPriorityLevel, performConcurrentWorkOnRoot.bind(null, root));
            }
            root.callbackPriority = newCallbackPriority;
            root.callbackNode = newCallbackNode;
          }
          function performConcurrentWorkOnRoot(root, didTimeout) {
            {
              resetNestedUpdateFlag();
            }
            currentEventTime = NoTimestamp;
            currentEventTransitionLane = NoLanes;
            if ((executionContext & (RenderContext2 | CommitContext)) !== NoContext) {
              throw new Error("Should not already be working.");
            }
            var originalCallbackNode = root.callbackNode;
            var didFlushPassiveEffects = flushPassiveEffects();
            if (didFlushPassiveEffects) {
              if (root.callbackNode !== originalCallbackNode) {
                return null;
              }
            }
            var lanes = getNextLanes(root, root === workInProgressRoot ? workInProgressRootRenderLanes : NoLanes);
            if (lanes === NoLanes) {
              return null;
            }
            var shouldTimeSlice = !includesBlockingLane(root, lanes) && !includesExpiredLane(root, lanes) && !didTimeout;
            var exitStatus = shouldTimeSlice ? renderRootConcurrent(root, lanes) : renderRootSync(root, lanes);
            if (exitStatus !== RootInProgress) {
              if (exitStatus === RootErrored) {
                var errorRetryLanes = getLanesToRetrySynchronouslyOnError(root);
                if (errorRetryLanes !== NoLanes) {
                  lanes = errorRetryLanes;
                  exitStatus = recoverFromConcurrentError(root, errorRetryLanes);
                }
              }
              if (exitStatus === RootFatalErrored) {
                var fatalError = workInProgressRootFatalError;
                prepareFreshStack(root, NoLanes);
                markRootSuspended$1(root, lanes);
                ensureRootIsScheduled(root, now());
                throw fatalError;
              }
              if (exitStatus === RootDidNotComplete) {
                markRootSuspended$1(root, lanes);
              } else {
                var renderWasConcurrent = !includesBlockingLane(root, lanes);
                var finishedWork = root.current.alternate;
                if (renderWasConcurrent && !isRenderConsistentWithExternalStores(finishedWork)) {
                  exitStatus = renderRootSync(root, lanes);
                  if (exitStatus === RootErrored) {
                    var _errorRetryLanes = getLanesToRetrySynchronouslyOnError(root);
                    if (_errorRetryLanes !== NoLanes) {
                      lanes = _errorRetryLanes;
                      exitStatus = recoverFromConcurrentError(root, _errorRetryLanes);
                    }
                  }
                  if (exitStatus === RootFatalErrored) {
                    var _fatalError = workInProgressRootFatalError;
                    prepareFreshStack(root, NoLanes);
                    markRootSuspended$1(root, lanes);
                    ensureRootIsScheduled(root, now());
                    throw _fatalError;
                  }
                }
                root.finishedWork = finishedWork;
                root.finishedLanes = lanes;
                finishConcurrentRender(root, exitStatus, lanes);
              }
            }
            ensureRootIsScheduled(root, now());
            if (root.callbackNode === originalCallbackNode) {
              return performConcurrentWorkOnRoot.bind(null, root);
            }
            return null;
          }
          function recoverFromConcurrentError(root, errorRetryLanes) {
            var errorsFromFirstAttempt = workInProgressRootConcurrentErrors;
            if (isRootDehydrated(root)) {
              var rootWorkInProgress = prepareFreshStack(root, errorRetryLanes);
              rootWorkInProgress.flags |= ForceClientRender;
              {
                errorHydratingContainer(root.containerInfo);
              }
            }
            var exitStatus = renderRootSync(root, errorRetryLanes);
            if (exitStatus !== RootErrored) {
              var errorsFromSecondAttempt = workInProgressRootRecoverableErrors;
              workInProgressRootRecoverableErrors = errorsFromFirstAttempt;
              if (errorsFromSecondAttempt !== null) {
                queueRecoverableErrors(errorsFromSecondAttempt);
              }
            }
            return exitStatus;
          }
          function queueRecoverableErrors(errors) {
            if (workInProgressRootRecoverableErrors === null) {
              workInProgressRootRecoverableErrors = errors;
            } else {
              workInProgressRootRecoverableErrors.push.apply(workInProgressRootRecoverableErrors, errors);
            }
          }
          function finishConcurrentRender(root, exitStatus, lanes) {
            switch (exitStatus) {
              case RootInProgress:
              case RootFatalErrored: {
                throw new Error("Root did not complete. This is a bug in React.");
              }
              case RootErrored: {
                commitRoot(root, workInProgressRootRecoverableErrors, workInProgressTransitions);
                break;
              }
              case RootSuspended: {
                markRootSuspended$1(root, lanes);
                if (includesOnlyRetries(lanes) && // do not delay if we're inside an act() scope
                !shouldForceFlushFallbacksInDEV()) {
                  var msUntilTimeout = globalMostRecentFallbackTime + FALLBACK_THROTTLE_MS - now();
                  if (msUntilTimeout > 10) {
                    var nextLanes = getNextLanes(root, NoLanes);
                    if (nextLanes !== NoLanes) {
                      break;
                    }
                    var suspendedLanes = root.suspendedLanes;
                    if (!isSubsetOfLanes(suspendedLanes, lanes)) {
                      var eventTime = requestEventTime();
                      markRootPinged(root, suspendedLanes);
                      break;
                    }
                    root.timeoutHandle = scheduleTimeout(commitRoot.bind(null, root, workInProgressRootRecoverableErrors, workInProgressTransitions), msUntilTimeout);
                    break;
                  }
                }
                commitRoot(root, workInProgressRootRecoverableErrors, workInProgressTransitions);
                break;
              }
              case RootSuspendedWithDelay: {
                markRootSuspended$1(root, lanes);
                if (includesOnlyTransitions(lanes)) {
                  break;
                }
                if (!shouldForceFlushFallbacksInDEV()) {
                  var mostRecentEventTime = getMostRecentEventTime(root, lanes);
                  var eventTimeMs = mostRecentEventTime;
                  var timeElapsedMs = now() - eventTimeMs;
                  var _msUntilTimeout = jnd(timeElapsedMs) - timeElapsedMs;
                  if (_msUntilTimeout > 10) {
                    root.timeoutHandle = scheduleTimeout(commitRoot.bind(null, root, workInProgressRootRecoverableErrors, workInProgressTransitions), _msUntilTimeout);
                    break;
                  }
                }
                commitRoot(root, workInProgressRootRecoverableErrors, workInProgressTransitions);
                break;
              }
              case RootCompleted: {
                commitRoot(root, workInProgressRootRecoverableErrors, workInProgressTransitions);
                break;
              }
              default: {
                throw new Error("Unknown root exit status.");
              }
            }
          }
          function isRenderConsistentWithExternalStores(finishedWork) {
            var node = finishedWork;
            while (true) {
              if (node.flags & StoreConsistency) {
                var updateQueue = node.updateQueue;
                if (updateQueue !== null) {
                  var checks = updateQueue.stores;
                  if (checks !== null) {
                    for (var i = 0; i < checks.length; i++) {
                      var check = checks[i];
                      var getSnapshot = check.getSnapshot;
                      var renderedValue = check.value;
                      try {
                        if (!objectIs(getSnapshot(), renderedValue)) {
                          return false;
                        }
                      } catch (error2) {
                        return false;
                      }
                    }
                  }
                }
              }
              var child = node.child;
              if (node.subtreeFlags & StoreConsistency && child !== null) {
                child.return = node;
                node = child;
                continue;
              }
              if (node === finishedWork) {
                return true;
              }
              while (node.sibling === null) {
                if (node.return === null || node.return === finishedWork) {
                  return true;
                }
                node = node.return;
              }
              node.sibling.return = node.return;
              node = node.sibling;
            }
            return true;
          }
          function markRootSuspended$1(root, suspendedLanes) {
            suspendedLanes = removeLanes(suspendedLanes, workInProgressRootPingedLanes);
            suspendedLanes = removeLanes(suspendedLanes, workInProgressRootInterleavedUpdatedLanes);
            markRootSuspended(root, suspendedLanes);
          }
          function performSyncWorkOnRoot(root) {
            {
              syncNestedUpdateFlag();
            }
            if ((executionContext & (RenderContext2 | CommitContext)) !== NoContext) {
              throw new Error("Should not already be working.");
            }
            flushPassiveEffects();
            var lanes = getNextLanes(root, NoLanes);
            if (!includesSomeLane(lanes, SyncLane)) {
              ensureRootIsScheduled(root, now());
              return null;
            }
            var exitStatus = renderRootSync(root, lanes);
            if (root.tag !== LegacyRoot && exitStatus === RootErrored) {
              var errorRetryLanes = getLanesToRetrySynchronouslyOnError(root);
              if (errorRetryLanes !== NoLanes) {
                lanes = errorRetryLanes;
                exitStatus = recoverFromConcurrentError(root, errorRetryLanes);
              }
            }
            if (exitStatus === RootFatalErrored) {
              var fatalError = workInProgressRootFatalError;
              prepareFreshStack(root, NoLanes);
              markRootSuspended$1(root, lanes);
              ensureRootIsScheduled(root, now());
              throw fatalError;
            }
            if (exitStatus === RootDidNotComplete) {
              throw new Error("Root did not complete. This is a bug in React.");
            }
            var finishedWork = root.current.alternate;
            root.finishedWork = finishedWork;
            root.finishedLanes = lanes;
            commitRoot(root, workInProgressRootRecoverableErrors, workInProgressTransitions);
            ensureRootIsScheduled(root, now());
            return null;
          }
          function flushRoot(root, lanes) {
            if (lanes !== NoLanes) {
              markRootEntangled(root, mergeLanes(lanes, SyncLane));
              ensureRootIsScheduled(root, now());
              if ((executionContext & (RenderContext2 | CommitContext)) === NoContext) {
                resetRenderTimer();
                flushSyncCallbacks();
              }
            }
          }
          function deferredUpdates(fn) {
            var previousPriority = getCurrentUpdatePriority();
            var prevTransition = ReactCurrentBatchConfig$2.transition;
            try {
              ReactCurrentBatchConfig$2.transition = null;
              setCurrentUpdatePriority(DefaultEventPriority);
              return fn();
            } finally {
              setCurrentUpdatePriority(previousPriority);
              ReactCurrentBatchConfig$2.transition = prevTransition;
            }
          }
          function batchedUpdates(fn, a) {
            var prevExecutionContext = executionContext;
            executionContext |= BatchedContext;
            try {
              return fn(a);
            } finally {
              executionContext = prevExecutionContext;
              if (executionContext === NoContext && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
              !ReactCurrentActQueue$1.isBatchingLegacy) {
                resetRenderTimer();
                flushSyncCallbacksOnlyInLegacyMode();
              }
            }
          }
          function discreteUpdates(fn, a, b, c, d) {
            var previousPriority = getCurrentUpdatePriority();
            var prevTransition = ReactCurrentBatchConfig$2.transition;
            try {
              ReactCurrentBatchConfig$2.transition = null;
              setCurrentUpdatePriority(DiscreteEventPriority);
              return fn(a, b, c, d);
            } finally {
              setCurrentUpdatePriority(previousPriority);
              ReactCurrentBatchConfig$2.transition = prevTransition;
              if (executionContext === NoContext) {
                resetRenderTimer();
              }
            }
          }
          function flushSync(fn) {
            if (rootWithPendingPassiveEffects !== null && rootWithPendingPassiveEffects.tag === LegacyRoot && (executionContext & (RenderContext2 | CommitContext)) === NoContext) {
              flushPassiveEffects();
            }
            var prevExecutionContext = executionContext;
            executionContext |= BatchedContext;
            var prevTransition = ReactCurrentBatchConfig$2.transition;
            var previousPriority = getCurrentUpdatePriority();
            try {
              ReactCurrentBatchConfig$2.transition = null;
              setCurrentUpdatePriority(DiscreteEventPriority);
              if (fn) {
                return fn();
              } else {
                return void 0;
              }
            } finally {
              setCurrentUpdatePriority(previousPriority);
              ReactCurrentBatchConfig$2.transition = prevTransition;
              executionContext = prevExecutionContext;
              if ((executionContext & (RenderContext2 | CommitContext)) === NoContext) {
                flushSyncCallbacks();
              }
            }
          }
          function isAlreadyRendering() {
            return (executionContext & (RenderContext2 | CommitContext)) !== NoContext;
          }
          function flushControlled(fn) {
            var prevExecutionContext = executionContext;
            executionContext |= BatchedContext;
            var prevTransition = ReactCurrentBatchConfig$2.transition;
            var previousPriority = getCurrentUpdatePriority();
            try {
              ReactCurrentBatchConfig$2.transition = null;
              setCurrentUpdatePriority(DiscreteEventPriority);
              fn();
            } finally {
              setCurrentUpdatePriority(previousPriority);
              ReactCurrentBatchConfig$2.transition = prevTransition;
              executionContext = prevExecutionContext;
              if (executionContext === NoContext) {
                resetRenderTimer();
                flushSyncCallbacks();
              }
            }
          }
          function pushRenderLanes(fiber, lanes) {
            push(subtreeRenderLanesCursor, subtreeRenderLanes, fiber);
            subtreeRenderLanes = mergeLanes(subtreeRenderLanes, lanes);
            workInProgressRootIncludedLanes = mergeLanes(workInProgressRootIncludedLanes, lanes);
          }
          function popRenderLanes(fiber) {
            subtreeRenderLanes = subtreeRenderLanesCursor.current;
            pop(subtreeRenderLanesCursor, fiber);
          }
          function prepareFreshStack(root, lanes) {
            root.finishedWork = null;
            root.finishedLanes = NoLanes;
            var timeoutHandle = root.timeoutHandle;
            if (timeoutHandle !== noTimeout) {
              root.timeoutHandle = noTimeout;
              cancelTimeout(timeoutHandle);
            }
            if (workInProgress !== null) {
              var interruptedWork = workInProgress.return;
              while (interruptedWork !== null) {
                var current2 = interruptedWork.alternate;
                unwindInterruptedWork(current2, interruptedWork);
                interruptedWork = interruptedWork.return;
              }
            }
            workInProgressRoot = root;
            var rootWorkInProgress = createWorkInProgress(root.current, null);
            workInProgress = rootWorkInProgress;
            workInProgressRootRenderLanes = subtreeRenderLanes = workInProgressRootIncludedLanes = lanes;
            workInProgressRootExitStatus = RootInProgress;
            workInProgressRootFatalError = null;
            workInProgressRootSkippedLanes = NoLanes;
            workInProgressRootInterleavedUpdatedLanes = NoLanes;
            workInProgressRootPingedLanes = NoLanes;
            workInProgressRootConcurrentErrors = null;
            workInProgressRootRecoverableErrors = null;
            finishQueueingConcurrentUpdates();
            {
              ReactStrictModeWarnings.discardPendingWarnings();
            }
            return rootWorkInProgress;
          }
          function handleError(root, thrownValue) {
            do {
              var erroredWork = workInProgress;
              try {
                resetContextDependencies();
                resetHooksAfterThrow();
                resetCurrentFiber();
                ReactCurrentOwner$2.current = null;
                if (erroredWork === null || erroredWork.return === null) {
                  workInProgressRootExitStatus = RootFatalErrored;
                  workInProgressRootFatalError = thrownValue;
                  workInProgress = null;
                  return;
                }
                if (enableProfilerTimer && erroredWork.mode & ProfileMode) {
                  stopProfilerTimerIfRunningAndRecordDelta(erroredWork, true);
                }
                if (enableSchedulingProfiler) {
                  markComponentRenderStopped();
                  if (thrownValue !== null && typeof thrownValue === "object" && typeof thrownValue.then === "function") {
                    var wakeable = thrownValue;
                    markComponentSuspended(erroredWork, wakeable, workInProgressRootRenderLanes);
                  } else {
                    markComponentErrored(erroredWork, thrownValue, workInProgressRootRenderLanes);
                  }
                }
                throwException(root, erroredWork.return, erroredWork, thrownValue, workInProgressRootRenderLanes);
                completeUnitOfWork(erroredWork);
              } catch (yetAnotherThrownValue) {
                thrownValue = yetAnotherThrownValue;
                if (workInProgress === erroredWork && erroredWork !== null) {
                  erroredWork = erroredWork.return;
                  workInProgress = erroredWork;
                } else {
                  erroredWork = workInProgress;
                }
                continue;
              }
              return;
            } while (true);
          }
          function pushDispatcher() {
            var prevDispatcher = ReactCurrentDispatcher$2.current;
            ReactCurrentDispatcher$2.current = ContextOnlyDispatcher;
            if (prevDispatcher === null) {
              return ContextOnlyDispatcher;
            } else {
              return prevDispatcher;
            }
          }
          function popDispatcher(prevDispatcher) {
            ReactCurrentDispatcher$2.current = prevDispatcher;
          }
          function markCommitTimeOfFallback() {
            globalMostRecentFallbackTime = now();
          }
          function markSkippedUpdateLanes(lane) {
            workInProgressRootSkippedLanes = mergeLanes(lane, workInProgressRootSkippedLanes);
          }
          function renderDidSuspend() {
            if (workInProgressRootExitStatus === RootInProgress) {
              workInProgressRootExitStatus = RootSuspended;
            }
          }
          function renderDidSuspendDelayIfPossible() {
            if (workInProgressRootExitStatus === RootInProgress || workInProgressRootExitStatus === RootSuspended || workInProgressRootExitStatus === RootErrored) {
              workInProgressRootExitStatus = RootSuspendedWithDelay;
            }
            if (workInProgressRoot !== null && (includesNonIdleWork(workInProgressRootSkippedLanes) || includesNonIdleWork(workInProgressRootInterleavedUpdatedLanes))) {
              markRootSuspended$1(workInProgressRoot, workInProgressRootRenderLanes);
            }
          }
          function renderDidError(error2) {
            if (workInProgressRootExitStatus !== RootSuspendedWithDelay) {
              workInProgressRootExitStatus = RootErrored;
            }
            if (workInProgressRootConcurrentErrors === null) {
              workInProgressRootConcurrentErrors = [error2];
            } else {
              workInProgressRootConcurrentErrors.push(error2);
            }
          }
          function renderHasNotSuspendedYet() {
            return workInProgressRootExitStatus === RootInProgress;
          }
          function renderRootSync(root, lanes) {
            var prevExecutionContext = executionContext;
            executionContext |= RenderContext2;
            var prevDispatcher = pushDispatcher();
            if (workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes) {
              {
                if (isDevToolsPresent) {
                  var memoizedUpdaters = root.memoizedUpdaters;
                  if (memoizedUpdaters.size > 0) {
                    restorePendingUpdaters(root, workInProgressRootRenderLanes);
                    memoizedUpdaters.clear();
                  }
                  movePendingFibersToMemoized(root, lanes);
                }
              }
              workInProgressTransitions = getTransitionsForLanes();
              prepareFreshStack(root, lanes);
            }
            {
              markRenderStarted(lanes);
            }
            do {
              try {
                workLoopSync();
                break;
              } catch (thrownValue) {
                handleError(root, thrownValue);
              }
            } while (true);
            resetContextDependencies();
            executionContext = prevExecutionContext;
            popDispatcher(prevDispatcher);
            if (workInProgress !== null) {
              throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
            }
            {
              markRenderStopped();
            }
            workInProgressRoot = null;
            workInProgressRootRenderLanes = NoLanes;
            return workInProgressRootExitStatus;
          }
          function workLoopSync() {
            while (workInProgress !== null) {
              performUnitOfWork(workInProgress);
            }
          }
          function renderRootConcurrent(root, lanes) {
            var prevExecutionContext = executionContext;
            executionContext |= RenderContext2;
            var prevDispatcher = pushDispatcher();
            if (workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes) {
              {
                if (isDevToolsPresent) {
                  var memoizedUpdaters = root.memoizedUpdaters;
                  if (memoizedUpdaters.size > 0) {
                    restorePendingUpdaters(root, workInProgressRootRenderLanes);
                    memoizedUpdaters.clear();
                  }
                  movePendingFibersToMemoized(root, lanes);
                }
              }
              workInProgressTransitions = getTransitionsForLanes();
              resetRenderTimer();
              prepareFreshStack(root, lanes);
            }
            {
              markRenderStarted(lanes);
            }
            do {
              try {
                workLoopConcurrent();
                break;
              } catch (thrownValue) {
                handleError(root, thrownValue);
              }
            } while (true);
            resetContextDependencies();
            popDispatcher(prevDispatcher);
            executionContext = prevExecutionContext;
            if (workInProgress !== null) {
              {
                markRenderYielded();
              }
              return RootInProgress;
            } else {
              {
                markRenderStopped();
              }
              workInProgressRoot = null;
              workInProgressRootRenderLanes = NoLanes;
              return workInProgressRootExitStatus;
            }
          }
          function workLoopConcurrent() {
            while (workInProgress !== null && !shouldYield()) {
              performUnitOfWork(workInProgress);
            }
          }
          function performUnitOfWork(unitOfWork) {
            var current2 = unitOfWork.alternate;
            setCurrentFiber(unitOfWork);
            var next;
            if ((unitOfWork.mode & ProfileMode) !== NoMode) {
              startProfilerTimer(unitOfWork);
              next = beginWork$1(current2, unitOfWork, subtreeRenderLanes);
              stopProfilerTimerIfRunningAndRecordDelta(unitOfWork, true);
            } else {
              next = beginWork$1(current2, unitOfWork, subtreeRenderLanes);
            }
            resetCurrentFiber();
            unitOfWork.memoizedProps = unitOfWork.pendingProps;
            if (next === null) {
              completeUnitOfWork(unitOfWork);
            } else {
              workInProgress = next;
            }
            ReactCurrentOwner$2.current = null;
          }
          function completeUnitOfWork(unitOfWork) {
            var completedWork = unitOfWork;
            do {
              var current2 = completedWork.alternate;
              var returnFiber = completedWork.return;
              if ((completedWork.flags & Incomplete) === NoFlags) {
                setCurrentFiber(completedWork);
                var next = void 0;
                if ((completedWork.mode & ProfileMode) === NoMode) {
                  next = completeWork(current2, completedWork, subtreeRenderLanes);
                } else {
                  startProfilerTimer(completedWork);
                  next = completeWork(current2, completedWork, subtreeRenderLanes);
                  stopProfilerTimerIfRunningAndRecordDelta(completedWork, false);
                }
                resetCurrentFiber();
                if (next !== null) {
                  workInProgress = next;
                  return;
                }
              } else {
                var _next = unwindWork(current2, completedWork);
                if (_next !== null) {
                  _next.flags &= HostEffectMask;
                  workInProgress = _next;
                  return;
                }
                if ((completedWork.mode & ProfileMode) !== NoMode) {
                  stopProfilerTimerIfRunningAndRecordDelta(completedWork, false);
                  var actualDuration = completedWork.actualDuration;
                  var child = completedWork.child;
                  while (child !== null) {
                    actualDuration += child.actualDuration;
                    child = child.sibling;
                  }
                  completedWork.actualDuration = actualDuration;
                }
                if (returnFiber !== null) {
                  returnFiber.flags |= Incomplete;
                  returnFiber.subtreeFlags = NoFlags;
                  returnFiber.deletions = null;
                } else {
                  workInProgressRootExitStatus = RootDidNotComplete;
                  workInProgress = null;
                  return;
                }
              }
              var siblingFiber = completedWork.sibling;
              if (siblingFiber !== null) {
                workInProgress = siblingFiber;
                return;
              }
              completedWork = returnFiber;
              workInProgress = completedWork;
            } while (completedWork !== null);
            if (workInProgressRootExitStatus === RootInProgress) {
              workInProgressRootExitStatus = RootCompleted;
            }
          }
          function commitRoot(root, recoverableErrors, transitions) {
            var previousUpdateLanePriority = getCurrentUpdatePriority();
            var prevTransition = ReactCurrentBatchConfig$2.transition;
            try {
              ReactCurrentBatchConfig$2.transition = null;
              setCurrentUpdatePriority(DiscreteEventPriority);
              commitRootImpl(root, recoverableErrors, transitions, previousUpdateLanePriority);
            } finally {
              ReactCurrentBatchConfig$2.transition = prevTransition;
              setCurrentUpdatePriority(previousUpdateLanePriority);
            }
            return null;
          }
          function commitRootImpl(root, recoverableErrors, transitions, renderPriorityLevel) {
            do {
              flushPassiveEffects();
            } while (rootWithPendingPassiveEffects !== null);
            flushRenderPhaseStrictModeWarningsInDEV();
            if ((executionContext & (RenderContext2 | CommitContext)) !== NoContext) {
              throw new Error("Should not already be working.");
            }
            var finishedWork = root.finishedWork;
            var lanes = root.finishedLanes;
            {
              markCommitStarted(lanes);
            }
            if (finishedWork === null) {
              {
                markCommitStopped();
              }
              return null;
            } else {
              {
                if (lanes === NoLanes) {
                  error("root.finishedLanes should not be empty during a commit. This is a bug in React.");
                }
              }
            }
            root.finishedWork = null;
            root.finishedLanes = NoLanes;
            if (finishedWork === root.current) {
              throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
            }
            root.callbackNode = null;
            root.callbackPriority = NoLane;
            var remainingLanes = mergeLanes(finishedWork.lanes, finishedWork.childLanes);
            markRootFinished(root, remainingLanes);
            if (root === workInProgressRoot) {
              workInProgressRoot = null;
              workInProgress = null;
              workInProgressRootRenderLanes = NoLanes;
            }
            if ((finishedWork.subtreeFlags & PassiveMask) !== NoFlags || (finishedWork.flags & PassiveMask) !== NoFlags) {
              if (!rootDoesHavePassiveEffects) {
                rootDoesHavePassiveEffects = true;
                pendingPassiveTransitions = transitions;
                scheduleCallback$1(NormalPriority, function() {
                  flushPassiveEffects();
                  return null;
                });
              }
            }
            var subtreeHasEffects = (finishedWork.subtreeFlags & (BeforeMutationMask | MutationMask | LayoutMask | PassiveMask)) !== NoFlags;
            var rootHasEffect = (finishedWork.flags & (BeforeMutationMask | MutationMask | LayoutMask | PassiveMask)) !== NoFlags;
            if (subtreeHasEffects || rootHasEffect) {
              var prevTransition = ReactCurrentBatchConfig$2.transition;
              ReactCurrentBatchConfig$2.transition = null;
              var previousPriority = getCurrentUpdatePriority();
              setCurrentUpdatePriority(DiscreteEventPriority);
              var prevExecutionContext = executionContext;
              executionContext |= CommitContext;
              ReactCurrentOwner$2.current = null;
              var shouldFireAfterActiveInstanceBlur2 = commitBeforeMutationEffects(root, finishedWork);
              {
                recordCommitTime();
              }
              commitMutationEffects(root, finishedWork, lanes);
              resetAfterCommit(root.containerInfo);
              root.current = finishedWork;
              {
                markLayoutEffectsStarted(lanes);
              }
              commitLayoutEffects(finishedWork, root, lanes);
              {
                markLayoutEffectsStopped();
              }
              requestPaint();
              executionContext = prevExecutionContext;
              setCurrentUpdatePriority(previousPriority);
              ReactCurrentBatchConfig$2.transition = prevTransition;
            } else {
              root.current = finishedWork;
              {
                recordCommitTime();
              }
            }
            var rootDidHavePassiveEffects = rootDoesHavePassiveEffects;
            if (rootDoesHavePassiveEffects) {
              rootDoesHavePassiveEffects = false;
              rootWithPendingPassiveEffects = root;
              pendingPassiveEffectsLanes = lanes;
            } else {
              {
                nestedPassiveUpdateCount = 0;
                rootWithPassiveNestedUpdates = null;
              }
            }
            remainingLanes = root.pendingLanes;
            if (remainingLanes === NoLanes) {
              legacyErrorBoundariesThatAlreadyFailed = null;
            }
            {
              if (!rootDidHavePassiveEffects) {
                commitDoubleInvokeEffectsInDEV(root.current, false);
              }
            }
            onCommitRoot(finishedWork.stateNode, renderPriorityLevel);
            {
              if (isDevToolsPresent) {
                root.memoizedUpdaters.clear();
              }
            }
            {
              onCommitRoot$1();
            }
            ensureRootIsScheduled(root, now());
            if (recoverableErrors !== null) {
              var onRecoverableError = root.onRecoverableError;
              for (var i = 0; i < recoverableErrors.length; i++) {
                var recoverableError = recoverableErrors[i];
                var componentStack = recoverableError.stack;
                var digest = recoverableError.digest;
                onRecoverableError(recoverableError.value, {
                  componentStack,
                  digest
                });
              }
            }
            if (hasUncaughtError) {
              hasUncaughtError = false;
              var error$1 = firstUncaughtError;
              firstUncaughtError = null;
              throw error$1;
            }
            if (includesSomeLane(pendingPassiveEffectsLanes, SyncLane) && root.tag !== LegacyRoot) {
              flushPassiveEffects();
            }
            remainingLanes = root.pendingLanes;
            if (includesSomeLane(remainingLanes, SyncLane)) {
              {
                markNestedUpdateScheduled();
              }
              if (root === rootWithNestedUpdates) {
                nestedUpdateCount++;
              } else {
                nestedUpdateCount = 0;
                rootWithNestedUpdates = root;
              }
            } else {
              nestedUpdateCount = 0;
            }
            flushSyncCallbacks();
            {
              markCommitStopped();
            }
            return null;
          }
          function flushPassiveEffects() {
            if (rootWithPendingPassiveEffects !== null) {
              var renderPriority = lanesToEventPriority(pendingPassiveEffectsLanes);
              var priority = lowerEventPriority(DefaultEventPriority, renderPriority);
              var prevTransition = ReactCurrentBatchConfig$2.transition;
              var previousPriority = getCurrentUpdatePriority();
              try {
                ReactCurrentBatchConfig$2.transition = null;
                setCurrentUpdatePriority(priority);
                return flushPassiveEffectsImpl();
              } finally {
                setCurrentUpdatePriority(previousPriority);
                ReactCurrentBatchConfig$2.transition = prevTransition;
              }
            }
            return false;
          }
          function enqueuePendingPassiveProfilerEffect(fiber) {
            {
              pendingPassiveProfilerEffects.push(fiber);
              if (!rootDoesHavePassiveEffects) {
                rootDoesHavePassiveEffects = true;
                scheduleCallback$1(NormalPriority, function() {
                  flushPassiveEffects();
                  return null;
                });
              }
            }
          }
          function flushPassiveEffectsImpl() {
            if (rootWithPendingPassiveEffects === null) {
              return false;
            }
            var transitions = pendingPassiveTransitions;
            pendingPassiveTransitions = null;
            var root = rootWithPendingPassiveEffects;
            var lanes = pendingPassiveEffectsLanes;
            rootWithPendingPassiveEffects = null;
            pendingPassiveEffectsLanes = NoLanes;
            if ((executionContext & (RenderContext2 | CommitContext)) !== NoContext) {
              throw new Error("Cannot flush passive effects while already rendering.");
            }
            {
              isFlushingPassiveEffects = true;
              didScheduleUpdateDuringPassiveEffects = false;
            }
            {
              markPassiveEffectsStarted(lanes);
            }
            var prevExecutionContext = executionContext;
            executionContext |= CommitContext;
            commitPassiveUnmountEffects(root.current);
            commitPassiveMountEffects(root, root.current, lanes, transitions);
            {
              var profilerEffects = pendingPassiveProfilerEffects;
              pendingPassiveProfilerEffects = [];
              for (var i = 0; i < profilerEffects.length; i++) {
                var _fiber = profilerEffects[i];
                commitPassiveEffectDurations(root, _fiber);
              }
            }
            {
              markPassiveEffectsStopped();
            }
            {
              commitDoubleInvokeEffectsInDEV(root.current, true);
            }
            executionContext = prevExecutionContext;
            flushSyncCallbacks();
            {
              if (didScheduleUpdateDuringPassiveEffects) {
                if (root === rootWithPassiveNestedUpdates) {
                  nestedPassiveUpdateCount++;
                } else {
                  nestedPassiveUpdateCount = 0;
                  rootWithPassiveNestedUpdates = root;
                }
              } else {
                nestedPassiveUpdateCount = 0;
              }
              isFlushingPassiveEffects = false;
              didScheduleUpdateDuringPassiveEffects = false;
            }
            onPostCommitRoot(root);
            {
              var stateNode = root.current.stateNode;
              stateNode.effectDuration = 0;
              stateNode.passiveEffectDuration = 0;
            }
            return true;
          }
          function isAlreadyFailedLegacyErrorBoundary(instance) {
            return legacyErrorBoundariesThatAlreadyFailed !== null && legacyErrorBoundariesThatAlreadyFailed.has(instance);
          }
          function markLegacyErrorBoundaryAsFailed(instance) {
            if (legacyErrorBoundariesThatAlreadyFailed === null) {
              legacyErrorBoundariesThatAlreadyFailed = /* @__PURE__ */ new Set([instance]);
            } else {
              legacyErrorBoundariesThatAlreadyFailed.add(instance);
            }
          }
          function prepareToThrowUncaughtError(error2) {
            if (!hasUncaughtError) {
              hasUncaughtError = true;
              firstUncaughtError = error2;
            }
          }
          var onUncaughtError = prepareToThrowUncaughtError;
          function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error2) {
            var errorInfo = createCapturedValueAtFiber(error2, sourceFiber);
            var update = createRootErrorUpdate(rootFiber, errorInfo, SyncLane);
            var root = enqueueUpdate(rootFiber, update, SyncLane);
            var eventTime = requestEventTime();
            if (root !== null) {
              markRootUpdated(root, SyncLane, eventTime);
              ensureRootIsScheduled(root, eventTime);
            }
          }
          function captureCommitPhaseError(sourceFiber, nearestMountedAncestor, error$1) {
            {
              reportUncaughtErrorInDEV(error$1);
              setIsRunningInsertionEffect(false);
            }
            if (sourceFiber.tag === HostRoot) {
              captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error$1);
              return;
            }
            var fiber = null;
            {
              fiber = nearestMountedAncestor;
            }
            while (fiber !== null) {
              if (fiber.tag === HostRoot) {
                captureCommitPhaseErrorOnRoot(fiber, sourceFiber, error$1);
                return;
              } else if (fiber.tag === ClassComponent) {
                var ctor = fiber.type;
                var instance = fiber.stateNode;
                if (typeof ctor.getDerivedStateFromError === "function" || typeof instance.componentDidCatch === "function" && !isAlreadyFailedLegacyErrorBoundary(instance)) {
                  var errorInfo = createCapturedValueAtFiber(error$1, sourceFiber);
                  var update = createClassErrorUpdate(fiber, errorInfo, SyncLane);
                  var root = enqueueUpdate(fiber, update, SyncLane);
                  var eventTime = requestEventTime();
                  if (root !== null) {
                    markRootUpdated(root, SyncLane, eventTime);
                    ensureRootIsScheduled(root, eventTime);
                  }
                  return;
                }
              }
              fiber = fiber.return;
            }
            {
              error("Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.\n\nError message:\n\n%s", error$1);
            }
          }
          function pingSuspendedRoot(root, wakeable, pingedLanes) {
            var pingCache = root.pingCache;
            if (pingCache !== null) {
              pingCache.delete(wakeable);
            }
            var eventTime = requestEventTime();
            markRootPinged(root, pingedLanes);
            warnIfSuspenseResolutionNotWrappedWithActDEV(root);
            if (workInProgressRoot === root && isSubsetOfLanes(workInProgressRootRenderLanes, pingedLanes)) {
              if (workInProgressRootExitStatus === RootSuspendedWithDelay || workInProgressRootExitStatus === RootSuspended && includesOnlyRetries(workInProgressRootRenderLanes) && now() - globalMostRecentFallbackTime < FALLBACK_THROTTLE_MS) {
                prepareFreshStack(root, NoLanes);
              } else {
                workInProgressRootPingedLanes = mergeLanes(workInProgressRootPingedLanes, pingedLanes);
              }
            }
            ensureRootIsScheduled(root, eventTime);
          }
          function retryTimedOutBoundary(boundaryFiber, retryLane) {
            if (retryLane === NoLane) {
              retryLane = requestRetryLane(boundaryFiber);
            }
            var eventTime = requestEventTime();
            var root = enqueueConcurrentRenderForLane(boundaryFiber, retryLane);
            if (root !== null) {
              markRootUpdated(root, retryLane, eventTime);
              ensureRootIsScheduled(root, eventTime);
            }
          }
          function retryDehydratedSuspenseBoundary(boundaryFiber) {
            var suspenseState = boundaryFiber.memoizedState;
            var retryLane = NoLane;
            if (suspenseState !== null) {
              retryLane = suspenseState.retryLane;
            }
            retryTimedOutBoundary(boundaryFiber, retryLane);
          }
          function resolveRetryWakeable(boundaryFiber, wakeable) {
            var retryLane = NoLane;
            var retryCache;
            switch (boundaryFiber.tag) {
              case SuspenseComponent:
                retryCache = boundaryFiber.stateNode;
                var suspenseState = boundaryFiber.memoizedState;
                if (suspenseState !== null) {
                  retryLane = suspenseState.retryLane;
                }
                break;
              case SuspenseListComponent:
                retryCache = boundaryFiber.stateNode;
                break;
              default:
                throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
            }
            if (retryCache !== null) {
              retryCache.delete(wakeable);
            }
            retryTimedOutBoundary(boundaryFiber, retryLane);
          }
          function jnd(timeElapsed) {
            return timeElapsed < 120 ? 120 : timeElapsed < 480 ? 480 : timeElapsed < 1080 ? 1080 : timeElapsed < 1920 ? 1920 : timeElapsed < 3e3 ? 3e3 : timeElapsed < 4320 ? 4320 : ceil(timeElapsed / 1960) * 1960;
          }
          function checkForNestedUpdates() {
            if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {
              nestedUpdateCount = 0;
              rootWithNestedUpdates = null;
              throw new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
            }
            {
              if (nestedPassiveUpdateCount > NESTED_PASSIVE_UPDATE_LIMIT) {
                nestedPassiveUpdateCount = 0;
                rootWithPassiveNestedUpdates = null;
                error("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.");
              }
            }
          }
          function flushRenderPhaseStrictModeWarningsInDEV() {
            {
              ReactStrictModeWarnings.flushLegacyContextWarning();
              {
                ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings();
              }
            }
          }
          function commitDoubleInvokeEffectsInDEV(fiber, hasPassiveEffects) {
            {
              setCurrentFiber(fiber);
              invokeEffectsInDev(fiber, MountLayoutDev, invokeLayoutEffectUnmountInDEV);
              if (hasPassiveEffects) {
                invokeEffectsInDev(fiber, MountPassiveDev, invokePassiveEffectUnmountInDEV);
              }
              invokeEffectsInDev(fiber, MountLayoutDev, invokeLayoutEffectMountInDEV);
              if (hasPassiveEffects) {
                invokeEffectsInDev(fiber, MountPassiveDev, invokePassiveEffectMountInDEV);
              }
              resetCurrentFiber();
            }
          }
          function invokeEffectsInDev(firstChild, fiberFlags, invokeEffectFn) {
            {
              var current2 = firstChild;
              var subtreeRoot = null;
              while (current2 !== null) {
                var primarySubtreeFlag = current2.subtreeFlags & fiberFlags;
                if (current2 !== subtreeRoot && current2.child !== null && primarySubtreeFlag !== NoFlags) {
                  current2 = current2.child;
                } else {
                  if ((current2.flags & fiberFlags) !== NoFlags) {
                    invokeEffectFn(current2);
                  }
                  if (current2.sibling !== null) {
                    current2 = current2.sibling;
                  } else {
                    current2 = subtreeRoot = current2.return;
                  }
                }
              }
            }
          }
          var didWarnStateUpdateForNotYetMountedComponent = null;
          function warnAboutUpdateOnNotYetMountedFiberInDEV(fiber) {
            {
              if ((executionContext & RenderContext2) !== NoContext) {
                return;
              }
              if (!(fiber.mode & ConcurrentMode)) {
                return;
              }
              var tag = fiber.tag;
              if (tag !== IndeterminateComponent && tag !== HostRoot && tag !== ClassComponent && tag !== FunctionComponent && tag !== ForwardRef && tag !== MemoComponent && tag !== SimpleMemoComponent) {
                return;
              }
              var componentName = getComponentNameFromFiber(fiber) || "ReactComponent";
              if (didWarnStateUpdateForNotYetMountedComponent !== null) {
                if (didWarnStateUpdateForNotYetMountedComponent.has(componentName)) {
                  return;
                }
                didWarnStateUpdateForNotYetMountedComponent.add(componentName);
              } else {
                didWarnStateUpdateForNotYetMountedComponent = /* @__PURE__ */ new Set([componentName]);
              }
              var previousFiber = current;
              try {
                setCurrentFiber(fiber);
                error("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
              } finally {
                if (previousFiber) {
                  setCurrentFiber(fiber);
                } else {
                  resetCurrentFiber();
                }
              }
            }
          }
          var beginWork$1;
          {
            var dummyFiber = null;
            beginWork$1 = function(current2, unitOfWork, lanes) {
              var originalWorkInProgressCopy = assignFiberPropertiesInDEV(dummyFiber, unitOfWork);
              try {
                return beginWork(current2, unitOfWork, lanes);
              } catch (originalError) {
                if (didSuspendOrErrorWhileHydratingDEV() || originalError !== null && typeof originalError === "object" && typeof originalError.then === "function") {
                  throw originalError;
                }
                resetContextDependencies();
                resetHooksAfterThrow();
                unwindInterruptedWork(current2, unitOfWork);
                assignFiberPropertiesInDEV(unitOfWork, originalWorkInProgressCopy);
                if (unitOfWork.mode & ProfileMode) {
                  startProfilerTimer(unitOfWork);
                }
                invokeGuardedCallback(null, beginWork, null, current2, unitOfWork, lanes);
                if (hasCaughtError()) {
                  var replayError = clearCaughtError();
                  if (typeof replayError === "object" && replayError !== null && replayError._suppressLogging && typeof originalError === "object" && originalError !== null && !originalError._suppressLogging) {
                    originalError._suppressLogging = true;
                  }
                }
                throw originalError;
              }
            };
          }
          var didWarnAboutUpdateInRender = false;
          var didWarnAboutUpdateInRenderForAnotherComponent;
          {
            didWarnAboutUpdateInRenderForAnotherComponent = /* @__PURE__ */ new Set();
          }
          function warnAboutRenderPhaseUpdatesInDEV(fiber) {
            {
              if (isRendering && !getIsUpdatingOpaqueValueInRenderPhaseInDEV()) {
                switch (fiber.tag) {
                  case FunctionComponent:
                  case ForwardRef:
                  case SimpleMemoComponent: {
                    var renderingComponentName = workInProgress && getComponentNameFromFiber(workInProgress) || "Unknown";
                    var dedupeKey = renderingComponentName;
                    if (!didWarnAboutUpdateInRenderForAnotherComponent.has(dedupeKey)) {
                      didWarnAboutUpdateInRenderForAnotherComponent.add(dedupeKey);
                      var setStateComponentName = getComponentNameFromFiber(fiber) || "Unknown";
                      error("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", setStateComponentName, renderingComponentName, renderingComponentName);
                    }
                    break;
                  }
                  case ClassComponent: {
                    if (!didWarnAboutUpdateInRender) {
                      error("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.");
                      didWarnAboutUpdateInRender = true;
                    }
                    break;
                  }
                }
              }
            }
          }
          function restorePendingUpdaters(root, lanes) {
            {
              if (isDevToolsPresent) {
                var memoizedUpdaters = root.memoizedUpdaters;
                memoizedUpdaters.forEach(function(schedulingFiber) {
                  addFiberToLanesMap(root, schedulingFiber, lanes);
                });
              }
            }
          }
          var fakeActCallbackNode = {};
          function scheduleCallback$1(priorityLevel, callback) {
            {
              var actQueue = ReactCurrentActQueue$1.current;
              if (actQueue !== null) {
                actQueue.push(callback);
                return fakeActCallbackNode;
              } else {
                return scheduleCallback(priorityLevel, callback);
              }
            }
          }
          function cancelCallback$1(callbackNode) {
            if (callbackNode === fakeActCallbackNode) {
              return;
            }
            return cancelCallback(callbackNode);
          }
          function shouldForceFlushFallbacksInDEV() {
            return ReactCurrentActQueue$1.current !== null;
          }
          function warnIfUpdatesNotWrappedWithActDEV(fiber) {
            {
              if (fiber.mode & ConcurrentMode) {
                if (!isConcurrentActEnvironment()) {
                  return;
                }
              } else {
                if (!isLegacyActEnvironment()) {
                  return;
                }
                if (executionContext !== NoContext) {
                  return;
                }
                if (fiber.tag !== FunctionComponent && fiber.tag !== ForwardRef && fiber.tag !== SimpleMemoComponent) {
                  return;
                }
              }
              if (ReactCurrentActQueue$1.current === null) {
                var previousFiber = current;
                try {
                  setCurrentFiber(fiber);
                  error("An update to %s inside a test was not wrapped in act(...).\n\nWhen testing, code that causes React state updates should be wrapped into act(...):\n\nact(() => {\n  /* fire events that update state */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act", getComponentNameFromFiber(fiber));
                } finally {
                  if (previousFiber) {
                    setCurrentFiber(fiber);
                  } else {
                    resetCurrentFiber();
                  }
                }
              }
            }
          }
          function warnIfSuspenseResolutionNotWrappedWithActDEV(root) {
            {
              if (root.tag !== LegacyRoot && isConcurrentActEnvironment() && ReactCurrentActQueue$1.current === null) {
                error("A suspended resource finished loading inside a test, but the event was not wrapped in act(...).\n\nWhen testing, code that resolves suspended data should be wrapped into act(...):\n\nact(() => {\n  /* finish loading suspended data */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act");
              }
            }
          }
          function setIsRunningInsertionEffect(isRunning) {
            {
              isRunningInsertionEffect = isRunning;
            }
          }
          var resolveFamily = null;
          var failedBoundaries = null;
          var setRefreshHandler = function(handler) {
            {
              resolveFamily = handler;
            }
          };
          function resolveFunctionForHotReloading(type) {
            {
              if (resolveFamily === null) {
                return type;
              }
              var family = resolveFamily(type);
              if (family === void 0) {
                return type;
              }
              return family.current;
            }
          }
          function resolveClassForHotReloading(type) {
            return resolveFunctionForHotReloading(type);
          }
          function resolveForwardRefForHotReloading(type) {
            {
              if (resolveFamily === null) {
                return type;
              }
              var family = resolveFamily(type);
              if (family === void 0) {
                if (type !== null && type !== void 0 && typeof type.render === "function") {
                  var currentRender = resolveFunctionForHotReloading(type.render);
                  if (type.render !== currentRender) {
                    var syntheticType = {
                      $$typeof: REACT_FORWARD_REF_TYPE,
                      render: currentRender
                    };
                    if (type.displayName !== void 0) {
                      syntheticType.displayName = type.displayName;
                    }
                    return syntheticType;
                  }
                }
                return type;
              }
              return family.current;
            }
          }
          function isCompatibleFamilyForHotReloading(fiber, element) {
            {
              if (resolveFamily === null) {
                return false;
              }
              var prevType = fiber.elementType;
              var nextType = element.type;
              var needsCompareFamilies = false;
              var $$typeofNextType = typeof nextType === "object" && nextType !== null ? nextType.$$typeof : null;
              switch (fiber.tag) {
                case ClassComponent: {
                  if (typeof nextType === "function") {
                    needsCompareFamilies = true;
                  }
                  break;
                }
                case FunctionComponent: {
                  if (typeof nextType === "function") {
                    needsCompareFamilies = true;
                  } else if ($$typeofNextType === REACT_LAZY_TYPE) {
                    needsCompareFamilies = true;
                  }
                  break;
                }
                case ForwardRef: {
                  if ($$typeofNextType === REACT_FORWARD_REF_TYPE) {
                    needsCompareFamilies = true;
                  } else if ($$typeofNextType === REACT_LAZY_TYPE) {
                    needsCompareFamilies = true;
                  }
                  break;
                }
                case MemoComponent:
                case SimpleMemoComponent: {
                  if ($$typeofNextType === REACT_MEMO_TYPE) {
                    needsCompareFamilies = true;
                  } else if ($$typeofNextType === REACT_LAZY_TYPE) {
                    needsCompareFamilies = true;
                  }
                  break;
                }
                default:
                  return false;
              }
              if (needsCompareFamilies) {
                var prevFamily = resolveFamily(prevType);
                if (prevFamily !== void 0 && prevFamily === resolveFamily(nextType)) {
                  return true;
                }
              }
              return false;
            }
          }
          function markFailedErrorBoundaryForHotReloading(fiber) {
            {
              if (resolveFamily === null) {
                return;
              }
              if (typeof WeakSet !== "function") {
                return;
              }
              if (failedBoundaries === null) {
                failedBoundaries = /* @__PURE__ */ new WeakSet();
              }
              failedBoundaries.add(fiber);
            }
          }
          var scheduleRefresh = function(root, update) {
            {
              if (resolveFamily === null) {
                return;
              }
              var staleFamilies = update.staleFamilies, updatedFamilies = update.updatedFamilies;
              flushPassiveEffects();
              flushSync(function() {
                scheduleFibersWithFamiliesRecursively(root.current, updatedFamilies, staleFamilies);
              });
            }
          };
          var scheduleRoot = function(root, element) {
            {
              if (root.context !== emptyContextObject) {
                return;
              }
              flushPassiveEffects();
              flushSync(function() {
                updateContainer(element, root, null, null);
              });
            }
          };
          function scheduleFibersWithFamiliesRecursively(fiber, updatedFamilies, staleFamilies) {
            {
              var alternate = fiber.alternate, child = fiber.child, sibling = fiber.sibling, tag = fiber.tag, type = fiber.type;
              var candidateType = null;
              switch (tag) {
                case FunctionComponent:
                case SimpleMemoComponent:
                case ClassComponent:
                  candidateType = type;
                  break;
                case ForwardRef:
                  candidateType = type.render;
                  break;
              }
              if (resolveFamily === null) {
                throw new Error("Expected resolveFamily to be set during hot reload.");
              }
              var needsRender = false;
              var needsRemount = false;
              if (candidateType !== null) {
                var family = resolveFamily(candidateType);
                if (family !== void 0) {
                  if (staleFamilies.has(family)) {
                    needsRemount = true;
                  } else if (updatedFamilies.has(family)) {
                    if (tag === ClassComponent) {
                      needsRemount = true;
                    } else {
                      needsRender = true;
                    }
                  }
                }
              }
              if (failedBoundaries !== null) {
                if (failedBoundaries.has(fiber) || alternate !== null && failedBoundaries.has(alternate)) {
                  needsRemount = true;
                }
              }
              if (needsRemount) {
                fiber._debugNeedsRemount = true;
              }
              if (needsRemount || needsRender) {
                var _root = enqueueConcurrentRenderForLane(fiber, SyncLane);
                if (_root !== null) {
                  scheduleUpdateOnFiber(_root, fiber, SyncLane, NoTimestamp);
                }
              }
              if (child !== null && !needsRemount) {
                scheduleFibersWithFamiliesRecursively(child, updatedFamilies, staleFamilies);
              }
              if (sibling !== null) {
                scheduleFibersWithFamiliesRecursively(sibling, updatedFamilies, staleFamilies);
              }
            }
          }
          var findHostInstancesForRefresh = function(root, families) {
            {
              var hostInstances = /* @__PURE__ */ new Set();
              var types = new Set(families.map(function(family) {
                return family.current;
              }));
              findHostInstancesForMatchingFibersRecursively(root.current, types, hostInstances);
              return hostInstances;
            }
          };
          function findHostInstancesForMatchingFibersRecursively(fiber, types, hostInstances) {
            {
              var child = fiber.child, sibling = fiber.sibling, tag = fiber.tag, type = fiber.type;
              var candidateType = null;
              switch (tag) {
                case FunctionComponent:
                case SimpleMemoComponent:
                case ClassComponent:
                  candidateType = type;
                  break;
                case ForwardRef:
                  candidateType = type.render;
                  break;
              }
              var didMatch = false;
              if (candidateType !== null) {
                if (types.has(candidateType)) {
                  didMatch = true;
                }
              }
              if (didMatch) {
                findHostInstancesForFiberShallowly(fiber, hostInstances);
              } else {
                if (child !== null) {
                  findHostInstancesForMatchingFibersRecursively(child, types, hostInstances);
                }
              }
              if (sibling !== null) {
                findHostInstancesForMatchingFibersRecursively(sibling, types, hostInstances);
              }
            }
          }
          function findHostInstancesForFiberShallowly(fiber, hostInstances) {
            {
              var foundHostInstances = findChildHostInstancesForFiberShallowly(fiber, hostInstances);
              if (foundHostInstances) {
                return;
              }
              var node = fiber;
              while (true) {
                switch (node.tag) {
                  case HostComponent:
                    hostInstances.add(node.stateNode);
                    return;
                  case HostPortal:
                    hostInstances.add(node.stateNode.containerInfo);
                    return;
                  case HostRoot:
                    hostInstances.add(node.stateNode.containerInfo);
                    return;
                }
                if (node.return === null) {
                  throw new Error("Expected to reach root first.");
                }
                node = node.return;
              }
            }
          }
          function findChildHostInstancesForFiberShallowly(fiber, hostInstances) {
            {
              var node = fiber;
              var foundHostInstances = false;
              while (true) {
                if (node.tag === HostComponent) {
                  foundHostInstances = true;
                  hostInstances.add(node.stateNode);
                } else if (node.child !== null) {
                  node.child.return = node;
                  node = node.child;
                  continue;
                }
                if (node === fiber) {
                  return foundHostInstances;
                }
                while (node.sibling === null) {
                  if (node.return === null || node.return === fiber) {
                    return foundHostInstances;
                  }
                  node = node.return;
                }
                node.sibling.return = node.return;
                node = node.sibling;
              }
            }
            return false;
          }
          var hasBadMapPolyfill;
          {
            hasBadMapPolyfill = false;
            try {
              var nonExtensibleObject = Object.preventExtensions({});
              /* @__PURE__ */ new Map([[nonExtensibleObject, null]]);
              /* @__PURE__ */ new Set([nonExtensibleObject]);
            } catch (e) {
              hasBadMapPolyfill = true;
            }
          }
          function FiberNode(tag, pendingProps, key, mode) {
            this.tag = tag;
            this.key = key;
            this.elementType = null;
            this.type = null;
            this.stateNode = null;
            this.return = null;
            this.child = null;
            this.sibling = null;
            this.index = 0;
            this.ref = null;
            this.pendingProps = pendingProps;
            this.memoizedProps = null;
            this.updateQueue = null;
            this.memoizedState = null;
            this.dependencies = null;
            this.mode = mode;
            this.flags = NoFlags;
            this.subtreeFlags = NoFlags;
            this.deletions = null;
            this.lanes = NoLanes;
            this.childLanes = NoLanes;
            this.alternate = null;
            {
              this.actualDuration = Number.NaN;
              this.actualStartTime = Number.NaN;
              this.selfBaseDuration = Number.NaN;
              this.treeBaseDuration = Number.NaN;
              this.actualDuration = 0;
              this.actualStartTime = -1;
              this.selfBaseDuration = 0;
              this.treeBaseDuration = 0;
            }
            {
              this._debugSource = null;
              this._debugOwner = null;
              this._debugNeedsRemount = false;
              this._debugHookTypes = null;
              if (!hasBadMapPolyfill && typeof Object.preventExtensions === "function") {
                Object.preventExtensions(this);
              }
            }
          }
          var createFiber = function(tag, pendingProps, key, mode) {
            return new FiberNode(tag, pendingProps, key, mode);
          };
          function shouldConstruct$1(Component) {
            var prototype = Component.prototype;
            return !!(prototype && prototype.isReactComponent);
          }
          function isSimpleFunctionComponent(type) {
            return typeof type === "function" && !shouldConstruct$1(type) && type.defaultProps === void 0;
          }
          function resolveLazyComponentTag(Component) {
            if (typeof Component === "function") {
              return shouldConstruct$1(Component) ? ClassComponent : FunctionComponent;
            } else if (Component !== void 0 && Component !== null) {
              var $$typeof = Component.$$typeof;
              if ($$typeof === REACT_FORWARD_REF_TYPE) {
                return ForwardRef;
              }
              if ($$typeof === REACT_MEMO_TYPE) {
                return MemoComponent;
              }
            }
            return IndeterminateComponent;
          }
          function createWorkInProgress(current2, pendingProps) {
            var workInProgress2 = current2.alternate;
            if (workInProgress2 === null) {
              workInProgress2 = createFiber(current2.tag, pendingProps, current2.key, current2.mode);
              workInProgress2.elementType = current2.elementType;
              workInProgress2.type = current2.type;
              workInProgress2.stateNode = current2.stateNode;
              {
                workInProgress2._debugSource = current2._debugSource;
                workInProgress2._debugOwner = current2._debugOwner;
                workInProgress2._debugHookTypes = current2._debugHookTypes;
              }
              workInProgress2.alternate = current2;
              current2.alternate = workInProgress2;
            } else {
              workInProgress2.pendingProps = pendingProps;
              workInProgress2.type = current2.type;
              workInProgress2.flags = NoFlags;
              workInProgress2.subtreeFlags = NoFlags;
              workInProgress2.deletions = null;
              {
                workInProgress2.actualDuration = 0;
                workInProgress2.actualStartTime = -1;
              }
            }
            workInProgress2.flags = current2.flags & StaticMask;
            workInProgress2.childLanes = current2.childLanes;
            workInProgress2.lanes = current2.lanes;
            workInProgress2.child = current2.child;
            workInProgress2.memoizedProps = current2.memoizedProps;
            workInProgress2.memoizedState = current2.memoizedState;
            workInProgress2.updateQueue = current2.updateQueue;
            var currentDependencies = current2.dependencies;
            workInProgress2.dependencies = currentDependencies === null ? null : {
              lanes: currentDependencies.lanes,
              firstContext: currentDependencies.firstContext
            };
            workInProgress2.sibling = current2.sibling;
            workInProgress2.index = current2.index;
            workInProgress2.ref = current2.ref;
            {
              workInProgress2.selfBaseDuration = current2.selfBaseDuration;
              workInProgress2.treeBaseDuration = current2.treeBaseDuration;
            }
            {
              workInProgress2._debugNeedsRemount = current2._debugNeedsRemount;
              switch (workInProgress2.tag) {
                case IndeterminateComponent:
                case FunctionComponent:
                case SimpleMemoComponent:
                  workInProgress2.type = resolveFunctionForHotReloading(current2.type);
                  break;
                case ClassComponent:
                  workInProgress2.type = resolveClassForHotReloading(current2.type);
                  break;
                case ForwardRef:
                  workInProgress2.type = resolveForwardRefForHotReloading(current2.type);
                  break;
              }
            }
            return workInProgress2;
          }
          function resetWorkInProgress(workInProgress2, renderLanes2) {
            workInProgress2.flags &= StaticMask | Placement;
            var current2 = workInProgress2.alternate;
            if (current2 === null) {
              workInProgress2.childLanes = NoLanes;
              workInProgress2.lanes = renderLanes2;
              workInProgress2.child = null;
              workInProgress2.subtreeFlags = NoFlags;
              workInProgress2.memoizedProps = null;
              workInProgress2.memoizedState = null;
              workInProgress2.updateQueue = null;
              workInProgress2.dependencies = null;
              workInProgress2.stateNode = null;
              {
                workInProgress2.selfBaseDuration = 0;
                workInProgress2.treeBaseDuration = 0;
              }
            } else {
              workInProgress2.childLanes = current2.childLanes;
              workInProgress2.lanes = current2.lanes;
              workInProgress2.child = current2.child;
              workInProgress2.subtreeFlags = NoFlags;
              workInProgress2.deletions = null;
              workInProgress2.memoizedProps = current2.memoizedProps;
              workInProgress2.memoizedState = current2.memoizedState;
              workInProgress2.updateQueue = current2.updateQueue;
              workInProgress2.type = current2.type;
              var currentDependencies = current2.dependencies;
              workInProgress2.dependencies = currentDependencies === null ? null : {
                lanes: currentDependencies.lanes,
                firstContext: currentDependencies.firstContext
              };
              {
                workInProgress2.selfBaseDuration = current2.selfBaseDuration;
                workInProgress2.treeBaseDuration = current2.treeBaseDuration;
              }
            }
            return workInProgress2;
          }
          function createHostRootFiber(tag, isStrictMode, concurrentUpdatesByDefaultOverride) {
            var mode;
            if (tag === ConcurrentRoot) {
              mode = ConcurrentMode;
              if (isStrictMode === true) {
                mode |= StrictLegacyMode;
                {
                  mode |= StrictEffectsMode;
                }
              }
            } else {
              mode = NoMode;
            }
            if (isDevToolsPresent) {
              mode |= ProfileMode;
            }
            return createFiber(HostRoot, null, null, mode);
          }
          function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes) {
            var fiberTag = IndeterminateComponent;
            var resolvedType = type;
            if (typeof type === "function") {
              if (shouldConstruct$1(type)) {
                fiberTag = ClassComponent;
                {
                  resolvedType = resolveClassForHotReloading(resolvedType);
                }
              } else {
                {
                  resolvedType = resolveFunctionForHotReloading(resolvedType);
                }
              }
            } else if (typeof type === "string") {
              fiberTag = HostComponent;
            } else {
              getTag:
                switch (type) {
                  case REACT_FRAGMENT_TYPE:
                    return createFiberFromFragment(pendingProps.children, mode, lanes, key);
                  case REACT_STRICT_MODE_TYPE:
                    fiberTag = Mode;
                    mode |= StrictLegacyMode;
                    if ((mode & ConcurrentMode) !== NoMode) {
                      mode |= StrictEffectsMode;
                    }
                    break;
                  case REACT_PROFILER_TYPE:
                    return createFiberFromProfiler(pendingProps, mode, lanes, key);
                  case REACT_SUSPENSE_TYPE:
                    return createFiberFromSuspense(pendingProps, mode, lanes, key);
                  case REACT_SUSPENSE_LIST_TYPE:
                    return createFiberFromSuspenseList(pendingProps, mode, lanes, key);
                  case REACT_OFFSCREEN_TYPE:
                    return createFiberFromOffscreen(pendingProps, mode, lanes, key);
                  case REACT_LEGACY_HIDDEN_TYPE:
                  case REACT_SCOPE_TYPE:
                  case REACT_CACHE_TYPE:
                  case REACT_TRACING_MARKER_TYPE:
                  case REACT_DEBUG_TRACING_MODE_TYPE:
                  default: {
                    if (typeof type === "object" && type !== null) {
                      switch (type.$$typeof) {
                        case REACT_PROVIDER_TYPE:
                          fiberTag = ContextProvider;
                          break getTag;
                        case REACT_CONTEXT_TYPE:
                          fiberTag = ContextConsumer;
                          break getTag;
                        case REACT_FORWARD_REF_TYPE:
                          fiberTag = ForwardRef;
                          {
                            resolvedType = resolveForwardRefForHotReloading(resolvedType);
                          }
                          break getTag;
                        case REACT_MEMO_TYPE:
                          fiberTag = MemoComponent;
                          break getTag;
                        case REACT_LAZY_TYPE:
                          fiberTag = LazyComponent;
                          resolvedType = null;
                          break getTag;
                      }
                    }
                    var info = "";
                    {
                      if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                        info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
                      }
                      var ownerName = owner ? getComponentNameFromFiber(owner) : null;
                      if (ownerName) {
                        info += "\n\nCheck the render method of `" + ownerName + "`.";
                      }
                    }
                    throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (type == null ? type : typeof type) + "." + info));
                  }
                }
            }
            var fiber = createFiber(fiberTag, pendingProps, key, mode);
            fiber.elementType = type;
            fiber.type = resolvedType;
            fiber.lanes = lanes;
            {
              fiber._debugOwner = owner;
            }
            return fiber;
          }
          function createFiberFromElement(element, mode, lanes) {
            var owner = null;
            {
              owner = element._owner;
            }
            var type = element.type;
            var key = element.key;
            var pendingProps = element.props;
            var fiber = createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes);
            {
              fiber._debugSource = element._source;
              fiber._debugOwner = element._owner;
            }
            return fiber;
          }
          function createFiberFromFragment(elements, mode, lanes, key) {
            var fiber = createFiber(Fragment2, elements, key, mode);
            fiber.lanes = lanes;
            return fiber;
          }
          function createFiberFromProfiler(pendingProps, mode, lanes, key) {
            {
              if (typeof pendingProps.id !== "string") {
                error('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof pendingProps.id);
              }
            }
            var fiber = createFiber(Profiler, pendingProps, key, mode | ProfileMode);
            fiber.elementType = REACT_PROFILER_TYPE;
            fiber.lanes = lanes;
            {
              fiber.stateNode = {
                effectDuration: 0,
                passiveEffectDuration: 0
              };
            }
            return fiber;
          }
          function createFiberFromSuspense(pendingProps, mode, lanes, key) {
            var fiber = createFiber(SuspenseComponent, pendingProps, key, mode);
            fiber.elementType = REACT_SUSPENSE_TYPE;
            fiber.lanes = lanes;
            return fiber;
          }
          function createFiberFromSuspenseList(pendingProps, mode, lanes, key) {
            var fiber = createFiber(SuspenseListComponent, pendingProps, key, mode);
            fiber.elementType = REACT_SUSPENSE_LIST_TYPE;
            fiber.lanes = lanes;
            return fiber;
          }
          function createFiberFromOffscreen(pendingProps, mode, lanes, key) {
            var fiber = createFiber(OffscreenComponent, pendingProps, key, mode);
            fiber.elementType = REACT_OFFSCREEN_TYPE;
            fiber.lanes = lanes;
            var primaryChildInstance = {
              isHidden: false
            };
            fiber.stateNode = primaryChildInstance;
            return fiber;
          }
          function createFiberFromText(content, mode, lanes) {
            var fiber = createFiber(HostText, content, null, mode);
            fiber.lanes = lanes;
            return fiber;
          }
          function createFiberFromHostInstanceForDeletion() {
            var fiber = createFiber(HostComponent, null, null, NoMode);
            fiber.elementType = "DELETED";
            return fiber;
          }
          function createFiberFromDehydratedFragment(dehydratedNode) {
            var fiber = createFiber(DehydratedFragment, null, null, NoMode);
            fiber.stateNode = dehydratedNode;
            return fiber;
          }
          function createFiberFromPortal(portal, mode, lanes) {
            var pendingProps = portal.children !== null ? portal.children : [];
            var fiber = createFiber(HostPortal, pendingProps, portal.key, mode);
            fiber.lanes = lanes;
            fiber.stateNode = {
              containerInfo: portal.containerInfo,
              pendingChildren: null,
              // Used by persistent updates
              implementation: portal.implementation
            };
            return fiber;
          }
          function assignFiberPropertiesInDEV(target, source) {
            if (target === null) {
              target = createFiber(IndeterminateComponent, null, null, NoMode);
            }
            target.tag = source.tag;
            target.key = source.key;
            target.elementType = source.elementType;
            target.type = source.type;
            target.stateNode = source.stateNode;
            target.return = source.return;
            target.child = source.child;
            target.sibling = source.sibling;
            target.index = source.index;
            target.ref = source.ref;
            target.pendingProps = source.pendingProps;
            target.memoizedProps = source.memoizedProps;
            target.updateQueue = source.updateQueue;
            target.memoizedState = source.memoizedState;
            target.dependencies = source.dependencies;
            target.mode = source.mode;
            target.flags = source.flags;
            target.subtreeFlags = source.subtreeFlags;
            target.deletions = source.deletions;
            target.lanes = source.lanes;
            target.childLanes = source.childLanes;
            target.alternate = source.alternate;
            {
              target.actualDuration = source.actualDuration;
              target.actualStartTime = source.actualStartTime;
              target.selfBaseDuration = source.selfBaseDuration;
              target.treeBaseDuration = source.treeBaseDuration;
            }
            target._debugSource = source._debugSource;
            target._debugOwner = source._debugOwner;
            target._debugNeedsRemount = source._debugNeedsRemount;
            target._debugHookTypes = source._debugHookTypes;
            return target;
          }
          function FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onRecoverableError) {
            this.tag = tag;
            this.containerInfo = containerInfo;
            this.pendingChildren = null;
            this.current = null;
            this.pingCache = null;
            this.finishedWork = null;
            this.timeoutHandle = noTimeout;
            this.context = null;
            this.pendingContext = null;
            this.callbackNode = null;
            this.callbackPriority = NoLane;
            this.eventTimes = createLaneMap(NoLanes);
            this.expirationTimes = createLaneMap(NoTimestamp);
            this.pendingLanes = NoLanes;
            this.suspendedLanes = NoLanes;
            this.pingedLanes = NoLanes;
            this.expiredLanes = NoLanes;
            this.mutableReadLanes = NoLanes;
            this.finishedLanes = NoLanes;
            this.entangledLanes = NoLanes;
            this.entanglements = createLaneMap(NoLanes);
            this.identifierPrefix = identifierPrefix;
            this.onRecoverableError = onRecoverableError;
            if (supportsHydration) {
              this.mutableSourceEagerHydrationData = null;
            }
            {
              this.effectDuration = 0;
              this.passiveEffectDuration = 0;
            }
            {
              this.memoizedUpdaters = /* @__PURE__ */ new Set();
              var pendingUpdatersLaneMap = this.pendingUpdatersLaneMap = [];
              for (var _i = 0; _i < TotalLanes; _i++) {
                pendingUpdatersLaneMap.push(/* @__PURE__ */ new Set());
              }
            }
            {
              switch (tag) {
                case ConcurrentRoot:
                  this._debugRootType = hydrate ? "hydrateRoot()" : "createRoot()";
                  break;
                case LegacyRoot:
                  this._debugRootType = hydrate ? "hydrate()" : "render()";
                  break;
              }
            }
          }
          function createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, concurrentUpdatesByDefaultOverride, identifierPrefix, onRecoverableError, transitionCallbacks) {
            var root = new FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onRecoverableError);
            var uninitializedFiber = createHostRootFiber(tag, isStrictMode);
            root.current = uninitializedFiber;
            uninitializedFiber.stateNode = root;
            {
              var _initialState = {
                element: initialChildren,
                isDehydrated: hydrate,
                cache: null,
                // not enabled yet
                transitions: null,
                pendingSuspenseBoundaries: null
              };
              uninitializedFiber.memoizedState = _initialState;
            }
            initializeUpdateQueue(uninitializedFiber);
            return root;
          }
          var ReactVersion = "18.3.1";
          function createPortal(children, containerInfo, implementation) {
            var key = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
            {
              checkKeyStringCoercion(key);
            }
            return {
              // This tag allow us to uniquely identify this as a React Portal
              $$typeof: REACT_PORTAL_TYPE,
              key: key == null ? null : "" + key,
              children,
              containerInfo,
              implementation
            };
          }
          var didWarnAboutNestedUpdates;
          var didWarnAboutFindNodeInStrictMode;
          {
            didWarnAboutNestedUpdates = false;
            didWarnAboutFindNodeInStrictMode = {};
          }
          function getContextForSubtree(parentComponent) {
            if (!parentComponent) {
              return emptyContextObject;
            }
            var fiber = get(parentComponent);
            var parentContext = findCurrentUnmaskedContext(fiber);
            if (fiber.tag === ClassComponent) {
              var Component = fiber.type;
              if (isContextProvider(Component)) {
                return processChildContext(fiber, Component, parentContext);
              }
            }
            return parentContext;
          }
          function findHostInstance(component) {
            var fiber = get(component);
            if (fiber === void 0) {
              if (typeof component.render === "function") {
                throw new Error("Unable to find node on an unmounted component.");
              } else {
                var keys = Object.keys(component).join(",");
                throw new Error("Argument appears to not be a ReactComponent. Keys: " + keys);
              }
            }
            var hostFiber = findCurrentHostFiber(fiber);
            if (hostFiber === null) {
              return null;
            }
            return hostFiber.stateNode;
          }
          function findHostInstanceWithWarning(component, methodName) {
            {
              var fiber = get(component);
              if (fiber === void 0) {
                if (typeof component.render === "function") {
                  throw new Error("Unable to find node on an unmounted component.");
                } else {
                  var keys = Object.keys(component).join(",");
                  throw new Error("Argument appears to not be a ReactComponent. Keys: " + keys);
                }
              }
              var hostFiber = findCurrentHostFiber(fiber);
              if (hostFiber === null) {
                return null;
              }
              if (hostFiber.mode & StrictLegacyMode) {
                var componentName = getComponentNameFromFiber(fiber) || "Component";
                if (!didWarnAboutFindNodeInStrictMode[componentName]) {
                  didWarnAboutFindNodeInStrictMode[componentName] = true;
                  var previousFiber = current;
                  try {
                    setCurrentFiber(hostFiber);
                    if (fiber.mode & StrictLegacyMode) {
                      error("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", methodName, methodName, componentName);
                    } else {
                      error("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", methodName, methodName, componentName);
                    }
                  } finally {
                    if (previousFiber) {
                      setCurrentFiber(previousFiber);
                    } else {
                      resetCurrentFiber();
                    }
                  }
                }
              }
              return hostFiber.stateNode;
            }
          }
          function createContainer(containerInfo, tag, hydrationCallbacks, isStrictMode, concurrentUpdatesByDefaultOverride, identifierPrefix, onRecoverableError, transitionCallbacks) {
            var hydrate = false;
            var initialChildren = null;
            return createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, concurrentUpdatesByDefaultOverride, identifierPrefix, onRecoverableError);
          }
          function createHydrationContainer(initialChildren, callback, containerInfo, tag, hydrationCallbacks, isStrictMode, concurrentUpdatesByDefaultOverride, identifierPrefix, onRecoverableError, transitionCallbacks) {
            var hydrate = true;
            var root = createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, concurrentUpdatesByDefaultOverride, identifierPrefix, onRecoverableError);
            root.context = getContextForSubtree(null);
            var current2 = root.current;
            var eventTime = requestEventTime();
            var lane = requestUpdateLane(current2);
            var update = createUpdate(eventTime, lane);
            update.callback = callback !== void 0 && callback !== null ? callback : null;
            enqueueUpdate(current2, update, lane);
            scheduleInitialHydrationOnRoot(root, lane, eventTime);
            return root;
          }
          function updateContainer(element, container, parentComponent, callback) {
            {
              onScheduleRoot(container, element);
            }
            var current$1 = container.current;
            var eventTime = requestEventTime();
            var lane = requestUpdateLane(current$1);
            {
              markRenderScheduled(lane);
            }
            var context = getContextForSubtree(parentComponent);
            if (container.context === null) {
              container.context = context;
            } else {
              container.pendingContext = context;
            }
            {
              if (isRendering && current !== null && !didWarnAboutNestedUpdates) {
                didWarnAboutNestedUpdates = true;
                error("Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.\n\nCheck the render method of %s.", getComponentNameFromFiber(current) || "Unknown");
              }
            }
            var update = createUpdate(eventTime, lane);
            update.payload = {
              element
            };
            callback = callback === void 0 ? null : callback;
            if (callback !== null) {
              {
                if (typeof callback !== "function") {
                  error("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", callback);
                }
              }
              update.callback = callback;
            }
            var root = enqueueUpdate(current$1, update, lane);
            if (root !== null) {
              scheduleUpdateOnFiber(root, current$1, lane, eventTime);
              entangleTransitions(root, current$1, lane);
            }
            return lane;
          }
          function getPublicRootInstance(container) {
            var containerFiber = container.current;
            if (!containerFiber.child) {
              return null;
            }
            switch (containerFiber.child.tag) {
              case HostComponent:
                return getPublicInstance(containerFiber.child.stateNode);
              default:
                return containerFiber.child.stateNode;
            }
          }
          function attemptSynchronousHydration(fiber) {
            switch (fiber.tag) {
              case HostRoot: {
                var root = fiber.stateNode;
                if (isRootDehydrated(root)) {
                  var lanes = getHighestPriorityPendingLanes(root);
                  flushRoot(root, lanes);
                }
                break;
              }
              case SuspenseComponent: {
                flushSync(function() {
                  var root2 = enqueueConcurrentRenderForLane(fiber, SyncLane);
                  if (root2 !== null) {
                    var eventTime = requestEventTime();
                    scheduleUpdateOnFiber(root2, fiber, SyncLane, eventTime);
                  }
                });
                var retryLane = SyncLane;
                markRetryLaneIfNotHydrated(fiber, retryLane);
                break;
              }
            }
          }
          function markRetryLaneImpl(fiber, retryLane) {
            var suspenseState = fiber.memoizedState;
            if (suspenseState !== null && suspenseState.dehydrated !== null) {
              suspenseState.retryLane = higherPriorityLane(suspenseState.retryLane, retryLane);
            }
          }
          function markRetryLaneIfNotHydrated(fiber, retryLane) {
            markRetryLaneImpl(fiber, retryLane);
            var alternate = fiber.alternate;
            if (alternate) {
              markRetryLaneImpl(alternate, retryLane);
            }
          }
          function attemptDiscreteHydration(fiber) {
            if (fiber.tag !== SuspenseComponent) {
              return;
            }
            var lane = SyncLane;
            var root = enqueueConcurrentRenderForLane(fiber, lane);
            if (root !== null) {
              var eventTime = requestEventTime();
              scheduleUpdateOnFiber(root, fiber, lane, eventTime);
            }
            markRetryLaneIfNotHydrated(fiber, lane);
          }
          function attemptContinuousHydration(fiber) {
            if (fiber.tag !== SuspenseComponent) {
              return;
            }
            var lane = SelectiveHydrationLane;
            var root = enqueueConcurrentRenderForLane(fiber, lane);
            if (root !== null) {
              var eventTime = requestEventTime();
              scheduleUpdateOnFiber(root, fiber, lane, eventTime);
            }
            markRetryLaneIfNotHydrated(fiber, lane);
          }
          function attemptHydrationAtCurrentPriority(fiber) {
            if (fiber.tag !== SuspenseComponent) {
              return;
            }
            var lane = requestUpdateLane(fiber);
            var root = enqueueConcurrentRenderForLane(fiber, lane);
            if (root !== null) {
              var eventTime = requestEventTime();
              scheduleUpdateOnFiber(root, fiber, lane, eventTime);
            }
            markRetryLaneIfNotHydrated(fiber, lane);
          }
          function findHostInstanceWithNoPortals(fiber) {
            var hostFiber = findCurrentHostFiberWithNoPortals(fiber);
            if (hostFiber === null) {
              return null;
            }
            return hostFiber.stateNode;
          }
          var shouldErrorImpl = function(fiber) {
            return null;
          };
          function shouldError(fiber) {
            return shouldErrorImpl(fiber);
          }
          var shouldSuspendImpl = function(fiber) {
            return false;
          };
          function shouldSuspend(fiber) {
            return shouldSuspendImpl(fiber);
          }
          var overrideHookState = null;
          var overrideHookStateDeletePath = null;
          var overrideHookStateRenamePath = null;
          var overrideProps = null;
          var overridePropsDeletePath = null;
          var overridePropsRenamePath = null;
          var scheduleUpdate = null;
          var setErrorHandler = null;
          var setSuspenseHandler = null;
          {
            var copyWithDeleteImpl = function(obj, path, index2) {
              var key = path[index2];
              var updated = isArray(obj) ? obj.slice() : assign({}, obj);
              if (index2 + 1 === path.length) {
                if (isArray(updated)) {
                  updated.splice(key, 1);
                } else {
                  delete updated[key];
                }
                return updated;
              }
              updated[key] = copyWithDeleteImpl(obj[key], path, index2 + 1);
              return updated;
            };
            var copyWithDelete = function(obj, path) {
              return copyWithDeleteImpl(obj, path, 0);
            };
            var copyWithRenameImpl = function(obj, oldPath, newPath, index2) {
              var oldKey = oldPath[index2];
              var updated = isArray(obj) ? obj.slice() : assign({}, obj);
              if (index2 + 1 === oldPath.length) {
                var newKey = newPath[index2];
                updated[newKey] = updated[oldKey];
                if (isArray(updated)) {
                  updated.splice(oldKey, 1);
                } else {
                  delete updated[oldKey];
                }
              } else {
                updated[oldKey] = copyWithRenameImpl(
                  // $FlowFixMe number or string is fine here
                  obj[oldKey],
                  oldPath,
                  newPath,
                  index2 + 1
                );
              }
              return updated;
            };
            var copyWithRename = function(obj, oldPath, newPath) {
              if (oldPath.length !== newPath.length) {
                warn("copyWithRename() expects paths of the same length");
                return;
              } else {
                for (var i = 0; i < newPath.length - 1; i++) {
                  if (oldPath[i] !== newPath[i]) {
                    warn("copyWithRename() expects paths to be the same except for the deepest key");
                    return;
                  }
                }
              }
              return copyWithRenameImpl(obj, oldPath, newPath, 0);
            };
            var copyWithSetImpl = function(obj, path, index2, value) {
              if (index2 >= path.length) {
                return value;
              }
              var key = path[index2];
              var updated = isArray(obj) ? obj.slice() : assign({}, obj);
              updated[key] = copyWithSetImpl(obj[key], path, index2 + 1, value);
              return updated;
            };
            var copyWithSet = function(obj, path, value) {
              return copyWithSetImpl(obj, path, 0, value);
            };
            var findHook = function(fiber, id) {
              var currentHook2 = fiber.memoizedState;
              while (currentHook2 !== null && id > 0) {
                currentHook2 = currentHook2.next;
                id--;
              }
              return currentHook2;
            };
            overrideHookState = function(fiber, id, path, value) {
              var hook = findHook(fiber, id);
              if (hook !== null) {
                var newState = copyWithSet(hook.memoizedState, path, value);
                hook.memoizedState = newState;
                hook.baseState = newState;
                fiber.memoizedProps = assign({}, fiber.memoizedProps);
                var root = enqueueConcurrentRenderForLane(fiber, SyncLane);
                if (root !== null) {
                  scheduleUpdateOnFiber(root, fiber, SyncLane, NoTimestamp);
                }
              }
            };
            overrideHookStateDeletePath = function(fiber, id, path) {
              var hook = findHook(fiber, id);
              if (hook !== null) {
                var newState = copyWithDelete(hook.memoizedState, path);
                hook.memoizedState = newState;
                hook.baseState = newState;
                fiber.memoizedProps = assign({}, fiber.memoizedProps);
                var root = enqueueConcurrentRenderForLane(fiber, SyncLane);
                if (root !== null) {
                  scheduleUpdateOnFiber(root, fiber, SyncLane, NoTimestamp);
                }
              }
            };
            overrideHookStateRenamePath = function(fiber, id, oldPath, newPath) {
              var hook = findHook(fiber, id);
              if (hook !== null) {
                var newState = copyWithRename(hook.memoizedState, oldPath, newPath);
                hook.memoizedState = newState;
                hook.baseState = newState;
                fiber.memoizedProps = assign({}, fiber.memoizedProps);
                var root = enqueueConcurrentRenderForLane(fiber, SyncLane);
                if (root !== null) {
                  scheduleUpdateOnFiber(root, fiber, SyncLane, NoTimestamp);
                }
              }
            };
            overrideProps = function(fiber, path, value) {
              fiber.pendingProps = copyWithSet(fiber.memoizedProps, path, value);
              if (fiber.alternate) {
                fiber.alternate.pendingProps = fiber.pendingProps;
              }
              var root = enqueueConcurrentRenderForLane(fiber, SyncLane);
              if (root !== null) {
                scheduleUpdateOnFiber(root, fiber, SyncLane, NoTimestamp);
              }
            };
            overridePropsDeletePath = function(fiber, path) {
              fiber.pendingProps = copyWithDelete(fiber.memoizedProps, path);
              if (fiber.alternate) {
                fiber.alternate.pendingProps = fiber.pendingProps;
              }
              var root = enqueueConcurrentRenderForLane(fiber, SyncLane);
              if (root !== null) {
                scheduleUpdateOnFiber(root, fiber, SyncLane, NoTimestamp);
              }
            };
            overridePropsRenamePath = function(fiber, oldPath, newPath) {
              fiber.pendingProps = copyWithRename(fiber.memoizedProps, oldPath, newPath);
              if (fiber.alternate) {
                fiber.alternate.pendingProps = fiber.pendingProps;
              }
              var root = enqueueConcurrentRenderForLane(fiber, SyncLane);
              if (root !== null) {
                scheduleUpdateOnFiber(root, fiber, SyncLane, NoTimestamp);
              }
            };
            scheduleUpdate = function(fiber) {
              var root = enqueueConcurrentRenderForLane(fiber, SyncLane);
              if (root !== null) {
                scheduleUpdateOnFiber(root, fiber, SyncLane, NoTimestamp);
              }
            };
            setErrorHandler = function(newShouldErrorImpl) {
              shouldErrorImpl = newShouldErrorImpl;
            };
            setSuspenseHandler = function(newShouldSuspendImpl) {
              shouldSuspendImpl = newShouldSuspendImpl;
            };
          }
          function findHostInstanceByFiber(fiber) {
            var hostFiber = findCurrentHostFiber(fiber);
            if (hostFiber === null) {
              return null;
            }
            return hostFiber.stateNode;
          }
          function emptyFindFiberByHostInstance(instance) {
            return null;
          }
          function getCurrentFiberForDevTools() {
            return current;
          }
          function injectIntoDevTools(devToolsConfig) {
            var findFiberByHostInstance = devToolsConfig.findFiberByHostInstance;
            var ReactCurrentDispatcher2 = ReactSharedInternals.ReactCurrentDispatcher;
            return injectInternals({
              bundleType: devToolsConfig.bundleType,
              version: devToolsConfig.version,
              rendererPackageName: devToolsConfig.rendererPackageName,
              rendererConfig: devToolsConfig.rendererConfig,
              overrideHookState,
              overrideHookStateDeletePath,
              overrideHookStateRenamePath,
              overrideProps,
              overridePropsDeletePath,
              overridePropsRenamePath,
              setErrorHandler,
              setSuspenseHandler,
              scheduleUpdate,
              currentDispatcherRef: ReactCurrentDispatcher2,
              findHostInstanceByFiber,
              findFiberByHostInstance: findFiberByHostInstance || emptyFindFiberByHostInstance,
              // React Refresh
              findHostInstancesForRefresh,
              scheduleRefresh,
              scheduleRoot,
              setRefreshHandler,
              // Enables DevTools to append owner stacks to error messages in DEV mode.
              getCurrentFiber: getCurrentFiberForDevTools,
              // Enables DevTools to detect reconciler version rather than renderer version
              // which may not match for third party renderers.
              reconcilerVersion: ReactVersion
            });
          }
          exports2.attemptContinuousHydration = attemptContinuousHydration;
          exports2.attemptDiscreteHydration = attemptDiscreteHydration;
          exports2.attemptHydrationAtCurrentPriority = attemptHydrationAtCurrentPriority;
          exports2.attemptSynchronousHydration = attemptSynchronousHydration;
          exports2.batchedUpdates = batchedUpdates;
          exports2.createComponentSelector = createComponentSelector;
          exports2.createContainer = createContainer;
          exports2.createHasPseudoClassSelector = createHasPseudoClassSelector;
          exports2.createHydrationContainer = createHydrationContainer;
          exports2.createPortal = createPortal;
          exports2.createRoleSelector = createRoleSelector;
          exports2.createTestNameSelector = createTestNameSelector;
          exports2.createTextSelector = createTextSelector;
          exports2.deferredUpdates = deferredUpdates;
          exports2.discreteUpdates = discreteUpdates;
          exports2.findAllNodes = findAllNodes;
          exports2.findBoundingRects = findBoundingRects;
          exports2.findHostInstance = findHostInstance;
          exports2.findHostInstanceWithNoPortals = findHostInstanceWithNoPortals;
          exports2.findHostInstanceWithWarning = findHostInstanceWithWarning;
          exports2.flushControlled = flushControlled;
          exports2.flushPassiveEffects = flushPassiveEffects;
          exports2.flushSync = flushSync;
          exports2.focusWithin = focusWithin;
          exports2.getCurrentUpdatePriority = getCurrentUpdatePriority;
          exports2.getFindAllNodesFailureDescription = getFindAllNodesFailureDescription;
          exports2.getPublicRootInstance = getPublicRootInstance;
          exports2.injectIntoDevTools = injectIntoDevTools;
          exports2.isAlreadyRendering = isAlreadyRendering;
          exports2.observeVisibleRects = observeVisibleRects;
          exports2.registerMutableSourceForHydration = registerMutableSourceForHydration;
          exports2.runWithPriority = runWithPriority;
          exports2.shouldError = shouldError;
          exports2.shouldSuspend = shouldSuspend;
          exports2.updateContainer = updateContainer;
          return exports2;
        };
      }
    }
  });

  // node_modules/react-reconciler/index.js
  var require_react_reconciler = __commonJS({
    "node_modules/react-reconciler/index.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_reconciler_development();
      }
    }
  });

  // node_modules/react/cjs/react-jsx-runtime.development.js
  var require_react_jsx_runtime_development = __commonJS({
    "node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
      "use strict";
      if (true) {
        (function() {
          "use strict";
          var React = require_react();
          var REACT_ELEMENT_TYPE = Symbol.for("react.element");
          var REACT_PORTAL_TYPE = Symbol.for("react.portal");
          var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
          var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
          var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
          var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
          var REACT_CONTEXT_TYPE = Symbol.for("react.context");
          var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
          var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
          var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
          var REACT_MEMO_TYPE = Symbol.for("react.memo");
          var REACT_LAZY_TYPE = Symbol.for("react.lazy");
          var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
          var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
          var FAUX_ITERATOR_SYMBOL = "@@iterator";
          function getIteratorFn(maybeIterable) {
            if (maybeIterable === null || typeof maybeIterable !== "object") {
              return null;
            }
            var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
            if (typeof maybeIterator === "function") {
              return maybeIterator;
            }
            return null;
          }
          var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function error(format) {
            {
              {
                for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  args[_key2 - 1] = arguments[_key2];
                }
                printWarning("error", format, args);
              }
            }
          }
          function printWarning(level, format, args) {
            {
              var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
              var stack = ReactDebugCurrentFrame2.getStackAddendum();
              if (stack !== "") {
                format += "%s";
                args = args.concat([stack]);
              }
              var argsWithFormat = args.map(function(item) {
                return String(item);
              });
              argsWithFormat.unshift("Warning: " + format);
              Function.prototype.apply.call(console[level], console, argsWithFormat);
            }
          }
          var enableScopeAPI = false;
          var enableCacheElement = false;
          var enableTransitionTracing = false;
          var enableLegacyHidden = false;
          var enableDebugTracing = false;
          var REACT_MODULE_REFERENCE;
          {
            REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
          }
          function isValidElementType(type) {
            if (typeof type === "string" || typeof type === "function") {
              return true;
            }
            if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
              return true;
            }
            if (typeof type === "object" && type !== null) {
              if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
              // types supported by any Flight configuration anywhere since
              // we don't know which Flight build this will end up being used
              // with.
              type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
                return true;
              }
            }
            return false;
          }
          function getWrappedName(outerType, innerType, wrapperName) {
            var displayName = outerType.displayName;
            if (displayName) {
              return displayName;
            }
            var functionName = innerType.displayName || innerType.name || "";
            return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
          }
          function getContextName(type) {
            return type.displayName || "Context";
          }
          function getComponentNameFromType(type) {
            if (type == null) {
              return null;
            }
            {
              if (typeof type.tag === "number") {
                error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
              }
            }
            if (typeof type === "function") {
              return type.displayName || type.name || null;
            }
            if (typeof type === "string") {
              return type;
            }
            switch (type) {
              case REACT_FRAGMENT_TYPE:
                return "Fragment";
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_PROFILER_TYPE:
                return "Profiler";
              case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
              case REACT_SUSPENSE_TYPE:
                return "Suspense";
              case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_CONTEXT_TYPE:
                  var context = type;
                  return getContextName(context) + ".Consumer";
                case REACT_PROVIDER_TYPE:
                  var provider = type;
                  return getContextName(provider._context) + ".Provider";
                case REACT_FORWARD_REF_TYPE:
                  return getWrappedName(type, type.render, "ForwardRef");
                case REACT_MEMO_TYPE:
                  var outerName = type.displayName || null;
                  if (outerName !== null) {
                    return outerName;
                  }
                  return getComponentNameFromType(type.type) || "Memo";
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return getComponentNameFromType(init(payload));
                  } catch (x) {
                    return null;
                  }
                }
              }
            }
            return null;
          }
          var assign = Object.assign;
          var disabledDepth = 0;
          var prevLog;
          var prevInfo;
          var prevWarn;
          var prevError;
          var prevGroup;
          var prevGroupCollapsed;
          var prevGroupEnd;
          function disabledLog() {
          }
          disabledLog.__reactDisabledLog = true;
          function disableLogs() {
            {
              if (disabledDepth === 0) {
                prevLog = console.log;
                prevInfo = console.info;
                prevWarn = console.warn;
                prevError = console.error;
                prevGroup = console.group;
                prevGroupCollapsed = console.groupCollapsed;
                prevGroupEnd = console.groupEnd;
                var props = {
                  configurable: true,
                  enumerable: true,
                  value: disabledLog,
                  writable: true
                };
                Object.defineProperties(console, {
                  info: props,
                  log: props,
                  warn: props,
                  error: props,
                  group: props,
                  groupCollapsed: props,
                  groupEnd: props
                });
              }
              disabledDepth++;
            }
          }
          function reenableLogs() {
            {
              disabledDepth--;
              if (disabledDepth === 0) {
                var props = {
                  configurable: true,
                  enumerable: true,
                  writable: true
                };
                Object.defineProperties(console, {
                  log: assign({}, props, {
                    value: prevLog
                  }),
                  info: assign({}, props, {
                    value: prevInfo
                  }),
                  warn: assign({}, props, {
                    value: prevWarn
                  }),
                  error: assign({}, props, {
                    value: prevError
                  }),
                  group: assign({}, props, {
                    value: prevGroup
                  }),
                  groupCollapsed: assign({}, props, {
                    value: prevGroupCollapsed
                  }),
                  groupEnd: assign({}, props, {
                    value: prevGroupEnd
                  })
                });
              }
              if (disabledDepth < 0) {
                error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
              }
            }
          }
          var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
          var prefix;
          function describeBuiltInComponentFrame(name, source, ownerFn) {
            {
              if (prefix === void 0) {
                try {
                  throw Error();
                } catch (x) {
                  var match = x.stack.trim().match(/\n( *(at )?)/);
                  prefix = match && match[1] || "";
                }
              }
              return "\n" + prefix + name;
            }
          }
          var reentry = false;
          var componentFrameCache;
          {
            var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
            componentFrameCache = new PossiblyWeakMap();
          }
          function describeNativeComponentFrame(fn, construct) {
            if (!fn || reentry) {
              return "";
            }
            {
              var frame = componentFrameCache.get(fn);
              if (frame !== void 0) {
                return frame;
              }
            }
            var control;
            reentry = true;
            var previousPrepareStackTrace = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var previousDispatcher;
            {
              previousDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = null;
              disableLogs();
            }
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if (typeof Reflect === "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x) {
                    control = x;
                  }
                  fn.call(Fake.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (x) {
                  control = x;
                }
                fn();
              }
            } catch (sample) {
              if (sample && control && typeof sample.stack === "string") {
                var sampleLines = sample.stack.split("\n");
                var controlLines = control.stack.split("\n");
                var s = sampleLines.length - 1;
                var c = controlLines.length - 1;
                while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                  c--;
                }
                for (; s >= 1 && c >= 0; s--, c--) {
                  if (sampleLines[s] !== controlLines[c]) {
                    if (s !== 1 || c !== 1) {
                      do {
                        s--;
                        c--;
                        if (c < 0 || sampleLines[s] !== controlLines[c]) {
                          var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                          if (fn.displayName && _frame.includes("<anonymous>")) {
                            _frame = _frame.replace("<anonymous>", fn.displayName);
                          }
                          {
                            if (typeof fn === "function") {
                              componentFrameCache.set(fn, _frame);
                            }
                          }
                          return _frame;
                        }
                      } while (s >= 1 && c >= 0);
                    }
                    break;
                  }
                }
              }
            } finally {
              reentry = false;
              {
                ReactCurrentDispatcher.current = previousDispatcher;
                reenableLogs();
              }
              Error.prepareStackTrace = previousPrepareStackTrace;
            }
            var name = fn ? fn.displayName || fn.name : "";
            var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
            {
              if (typeof fn === "function") {
                componentFrameCache.set(fn, syntheticFrame);
              }
            }
            return syntheticFrame;
          }
          function describeFunctionComponentFrame(fn, source, ownerFn) {
            {
              return describeNativeComponentFrame(fn, false);
            }
          }
          function shouldConstruct(Component) {
            var prototype = Component.prototype;
            return !!(prototype && prototype.isReactComponent);
          }
          function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
            if (type == null) {
              return "";
            }
            if (typeof type === "function") {
              {
                return describeNativeComponentFrame(type, shouldConstruct(type));
              }
            }
            if (typeof type === "string") {
              return describeBuiltInComponentFrame(type);
            }
            switch (type) {
              case REACT_SUSPENSE_TYPE:
                return describeBuiltInComponentFrame("Suspense");
              case REACT_SUSPENSE_LIST_TYPE:
                return describeBuiltInComponentFrame("SuspenseList");
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_FORWARD_REF_TYPE:
                  return describeFunctionComponentFrame(type.render);
                case REACT_MEMO_TYPE:
                  return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                  } catch (x) {
                  }
                }
              }
            }
            return "";
          }
          var hasOwnProperty2 = Object.prototype.hasOwnProperty;
          var loggedTypeFailures = {};
          var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
          function setCurrentlyValidatingElement(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                ReactDebugCurrentFrame.setExtraStackFrame(stack);
              } else {
                ReactDebugCurrentFrame.setExtraStackFrame(null);
              }
            }
          }
          function checkPropTypes(typeSpecs, values, location, componentName, element) {
            {
              var has2 = Function.call.bind(hasOwnProperty2);
              for (var typeSpecName in typeSpecs) {
                if (has2(typeSpecs, typeSpecName)) {
                  var error$1 = void 0;
                  try {
                    if (typeof typeSpecs[typeSpecName] !== "function") {
                      var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                      err.name = "Invariant Violation";
                      throw err;
                    }
                    error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                  } catch (ex) {
                    error$1 = ex;
                  }
                  if (error$1 && !(error$1 instanceof Error)) {
                    setCurrentlyValidatingElement(element);
                    error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                    setCurrentlyValidatingElement(null);
                  }
                  if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                    loggedTypeFailures[error$1.message] = true;
                    setCurrentlyValidatingElement(element);
                    error("Failed %s type: %s", location, error$1.message);
                    setCurrentlyValidatingElement(null);
                  }
                }
              }
            }
          }
          var isArrayImpl = Array.isArray;
          function isArray(a) {
            return isArrayImpl(a);
          }
          function typeName(value) {
            {
              var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
              var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
              return type;
            }
          }
          function willCoercionThrow(value) {
            {
              try {
                testStringCoercion(value);
                return false;
              } catch (e) {
                return true;
              }
            }
          }
          function testStringCoercion(value) {
            return "" + value;
          }
          function checkKeyStringCoercion(value) {
            {
              if (willCoercionThrow(value)) {
                error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
                return testStringCoercion(value);
              }
            }
          }
          var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
          var RESERVED_PROPS = {
            key: true,
            ref: true,
            __self: true,
            __source: true
          };
          var specialPropKeyWarningShown;
          var specialPropRefWarningShown;
          var didWarnAboutStringRefs;
          {
            didWarnAboutStringRefs = {};
          }
          function hasValidRef(config) {
            {
              if (hasOwnProperty2.call(config, "ref")) {
                var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config.ref !== void 0;
          }
          function hasValidKey(config) {
            {
              if (hasOwnProperty2.call(config, "key")) {
                var getter = Object.getOwnPropertyDescriptor(config, "key").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config.key !== void 0;
          }
          function warnIfStringRefCannotBeAutoConverted(config, self) {
            {
              if (typeof config.ref === "string" && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
                var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
                if (!didWarnAboutStringRefs[componentName]) {
                  error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
                  didWarnAboutStringRefs[componentName] = true;
                }
              }
            }
          }
          function defineKeyPropWarningGetter(props, displayName) {
            {
              var warnAboutAccessingKey = function() {
                if (!specialPropKeyWarningShown) {
                  specialPropKeyWarningShown = true;
                  error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              };
              warnAboutAccessingKey.isReactWarning = true;
              Object.defineProperty(props, "key", {
                get: warnAboutAccessingKey,
                configurable: true
              });
            }
          }
          function defineRefPropWarningGetter(props, displayName) {
            {
              var warnAboutAccessingRef = function() {
                if (!specialPropRefWarningShown) {
                  specialPropRefWarningShown = true;
                  error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              };
              warnAboutAccessingRef.isReactWarning = true;
              Object.defineProperty(props, "ref", {
                get: warnAboutAccessingRef,
                configurable: true
              });
            }
          }
          var ReactElement = function(type, key, ref, self, source, owner, props) {
            var element = {
              // This tag allows us to uniquely identify this as a React Element
              $$typeof: REACT_ELEMENT_TYPE,
              // Built-in properties that belong on the element
              type,
              key,
              ref,
              props,
              // Record the component responsible for creating this element.
              _owner: owner
            };
            {
              element._store = {};
              Object.defineProperty(element._store, "validated", {
                configurable: false,
                enumerable: false,
                writable: true,
                value: false
              });
              Object.defineProperty(element, "_self", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: self
              });
              Object.defineProperty(element, "_source", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: source
              });
              if (Object.freeze) {
                Object.freeze(element.props);
                Object.freeze(element);
              }
            }
            return element;
          };
          function jsxDEV(type, config, maybeKey, source, self) {
            {
              var propName;
              var props = {};
              var key = null;
              var ref = null;
              if (maybeKey !== void 0) {
                {
                  checkKeyStringCoercion(maybeKey);
                }
                key = "" + maybeKey;
              }
              if (hasValidKey(config)) {
                {
                  checkKeyStringCoercion(config.key);
                }
                key = "" + config.key;
              }
              if (hasValidRef(config)) {
                ref = config.ref;
                warnIfStringRefCannotBeAutoConverted(config, self);
              }
              for (propName in config) {
                if (hasOwnProperty2.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  props[propName] = config[propName];
                }
              }
              if (type && type.defaultProps) {
                var defaultProps = type.defaultProps;
                for (propName in defaultProps) {
                  if (props[propName] === void 0) {
                    props[propName] = defaultProps[propName];
                  }
                }
              }
              if (key || ref) {
                var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
                if (key) {
                  defineKeyPropWarningGetter(props, displayName);
                }
                if (ref) {
                  defineRefPropWarningGetter(props, displayName);
                }
              }
              return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
            }
          }
          var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
          var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
          function setCurrentlyValidatingElement$1(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
              } else {
                ReactDebugCurrentFrame$1.setExtraStackFrame(null);
              }
            }
          }
          var propTypesMisspellWarningShown;
          {
            propTypesMisspellWarningShown = false;
          }
          function isValidElement2(object) {
            {
              return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
            }
          }
          function getDeclarationErrorAddendum() {
            {
              if (ReactCurrentOwner$1.current) {
                var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
                if (name) {
                  return "\n\nCheck the render method of `" + name + "`.";
                }
              }
              return "";
            }
          }
          function getSourceInfoErrorAddendum(source) {
            {
              if (source !== void 0) {
                var fileName = source.fileName.replace(/^.*[\\\/]/, "");
                var lineNumber = source.lineNumber;
                return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
              }
              return "";
            }
          }
          var ownerHasKeyUseWarning = {};
          function getCurrentComponentErrorInfo(parentType) {
            {
              var info = getDeclarationErrorAddendum();
              if (!info) {
                var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
                if (parentName) {
                  info = "\n\nCheck the top-level render call using <" + parentName + ">.";
                }
              }
              return info;
            }
          }
          function validateExplicitKey(element, parentType) {
            {
              if (!element._store || element._store.validated || element.key != null) {
                return;
              }
              element._store.validated = true;
              var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
              if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
                return;
              }
              ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
              var childOwner = "";
              if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
                childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
              }
              setCurrentlyValidatingElement$1(element);
              error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
              setCurrentlyValidatingElement$1(null);
            }
          }
          function validateChildKeys(node, parentType) {
            {
              if (typeof node !== "object") {
                return;
              }
              if (isArray(node)) {
                for (var i = 0; i < node.length; i++) {
                  var child = node[i];
                  if (isValidElement2(child)) {
                    validateExplicitKey(child, parentType);
                  }
                }
              } else if (isValidElement2(node)) {
                if (node._store) {
                  node._store.validated = true;
                }
              } else if (node) {
                var iteratorFn = getIteratorFn(node);
                if (typeof iteratorFn === "function") {
                  if (iteratorFn !== node.entries) {
                    var iterator = iteratorFn.call(node);
                    var step;
                    while (!(step = iterator.next()).done) {
                      if (isValidElement2(step.value)) {
                        validateExplicitKey(step.value, parentType);
                      }
                    }
                  }
                }
              }
            }
          }
          function validatePropTypes(element) {
            {
              var type = element.type;
              if (type === null || type === void 0 || typeof type === "string") {
                return;
              }
              var propTypes;
              if (typeof type === "function") {
                propTypes = type.propTypes;
              } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
              // Inner props are checked in the reconciler.
              type.$$typeof === REACT_MEMO_TYPE)) {
                propTypes = type.propTypes;
              } else {
                return;
              }
              if (propTypes) {
                var name = getComponentNameFromType(type);
                checkPropTypes(propTypes, element.props, "prop", name, element);
              } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
                propTypesMisspellWarningShown = true;
                var _name = getComponentNameFromType(type);
                error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
              }
              if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
                error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
              }
            }
          }
          function validateFragmentProps(fragment) {
            {
              var keys = Object.keys(fragment.props);
              for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (key !== "children" && key !== "key") {
                  setCurrentlyValidatingElement$1(fragment);
                  error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                  setCurrentlyValidatingElement$1(null);
                  break;
                }
              }
              if (fragment.ref !== null) {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid attribute `ref` supplied to `React.Fragment`.");
                setCurrentlyValidatingElement$1(null);
              }
            }
          }
          var didWarnAboutKeySpread = {};
          function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
            {
              var validType = isValidElementType(type);
              if (!validType) {
                var info = "";
                if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                  info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
                }
                var sourceInfo = getSourceInfoErrorAddendum(source);
                if (sourceInfo) {
                  info += sourceInfo;
                } else {
                  info += getDeclarationErrorAddendum();
                }
                var typeString;
                if (type === null) {
                  typeString = "null";
                } else if (isArray(type)) {
                  typeString = "array";
                } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                  typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
                  info = " Did you accidentally export a JSX literal instead of a component?";
                } else {
                  typeString = typeof type;
                }
                error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
              }
              var element = jsxDEV(type, props, key, source, self);
              if (element == null) {
                return element;
              }
              if (validType) {
                var children = props.children;
                if (children !== void 0) {
                  if (isStaticChildren) {
                    if (isArray(children)) {
                      for (var i = 0; i < children.length; i++) {
                        validateChildKeys(children[i], type);
                      }
                      if (Object.freeze) {
                        Object.freeze(children);
                      }
                    } else {
                      error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
                    }
                  } else {
                    validateChildKeys(children, type);
                  }
                }
              }
              {
                if (hasOwnProperty2.call(props, "key")) {
                  var componentName = getComponentNameFromType(type);
                  var keys = Object.keys(props).filter(function(k) {
                    return k !== "key";
                  });
                  var beforeExample = keys.length > 0 ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
                  if (!didWarnAboutKeySpread[componentName + beforeExample]) {
                    var afterExample = keys.length > 0 ? "{" + keys.join(": ..., ") + ": ...}" : "{}";
                    error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);
                    didWarnAboutKeySpread[componentName + beforeExample] = true;
                  }
                }
              }
              if (type === REACT_FRAGMENT_TYPE) {
                validateFragmentProps(element);
              } else {
                validatePropTypes(element);
              }
              return element;
            }
          }
          function jsxWithValidationStatic(type, props, key) {
            {
              return jsxWithValidation(type, props, key, true);
            }
          }
          function jsxWithValidationDynamic(type, props, key) {
            {
              return jsxWithValidation(type, props, key, false);
            }
          }
          var jsx5 = jsxWithValidationDynamic;
          var jsxs2 = jsxWithValidationStatic;
          exports.Fragment = REACT_FRAGMENT_TYPE;
          exports.jsx = jsx5;
          exports.jsxs = jsxs2;
        })();
      }
    }
  });

  // node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS({
    "node_modules/react/jsx-runtime.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_jsx_runtime_development();
      }
    }
  });

  // node_modules/@remote-ui/rpc/build/esm/memory.mjs
  function isBasicObject(value) {
    if (value == null || typeof value !== "object")
      return false;
    const prototype = Object.getPrototypeOf(value);
    return prototype == null || prototype === Object.prototype;
  }

  // node_modules/@remote-ui/core/build/esm/component.mjs
  function createRemoteComponent(componentType) {
    return componentType;
  }

  // node_modules/@remote-ui/core/build/esm/types.mjs
  var ACTION_MOUNT = 0;
  var ACTION_INSERT_CHILD = 1;
  var ACTION_REMOVE_CHILD = 2;
  var ACTION_UPDATE_TEXT = 3;
  var ACTION_UPDATE_PROPS = 4;
  var KIND_ROOT = 0;
  var KIND_COMPONENT = 1;
  var KIND_TEXT = 2;
  var KIND_FRAGMENT = 3;

  // node_modules/@remote-ui/core/build/esm/utilities.mjs
  function isRemoteFragment(object) {
    return object != null && object.kind === KIND_FRAGMENT;
  }

  // node_modules/@remote-ui/core/build/esm/root.mjs
  var FUNCTION_CURRENT_IMPLEMENTATION_KEY = "__current";
  var EMPTY_OBJECT = {};
  var EMPTY_ARRAY = [];
  function createRemoteRoot(channel, {
    strict = true,
    components
  } = {}) {
    let currentId = 0;
    const rootInternals = {
      strict,
      mounted: false,
      channel,
      children: EMPTY_ARRAY,
      nodes: /* @__PURE__ */ new WeakSet(),
      parents: /* @__PURE__ */ new WeakMap(),
      tops: /* @__PURE__ */ new WeakMap(),
      components: /* @__PURE__ */ new WeakMap(),
      fragments: /* @__PURE__ */ new WeakMap()
    };
    if (strict)
      Object.freeze(components);
    const remoteRoot = {
      kind: KIND_ROOT,
      options: strict ? Object.freeze({
        strict,
        components
      }) : {
        strict,
        components
      },
      get children() {
        return rootInternals.children;
      },
      createComponent(type, ...rest) {
        if (components && components.indexOf(type) < 0) {
          throw new Error(`Unsupported component: ${type}`);
        }
        const [initialProps, initialChildren, ...moreChildren] = rest;
        const normalizedInitialProps = initialProps !== null && initialProps !== void 0 ? initialProps : {};
        const normalizedInitialChildren = [];
        const normalizedInternalProps = {};
        if (initialProps) {
          for (const key of Object.keys(initialProps)) {
            if (key === "children")
              continue;
            normalizedInternalProps[key] = makeValueHotSwappable(serializeProp(initialProps[key]));
          }
        }
        if (initialChildren) {
          if (Array.isArray(initialChildren)) {
            for (const child of initialChildren) {
              normalizedInitialChildren.push(normalizeChild(child, remoteRoot));
            }
          } else {
            normalizedInitialChildren.push(normalizeChild(initialChildren, remoteRoot));
            for (const child of moreChildren) {
              normalizedInitialChildren.push(normalizeChild(child, remoteRoot));
            }
          }
        }
        const id = `${currentId++}`;
        const internals = {
          externalProps: strict ? Object.freeze(normalizedInitialProps) : normalizedInitialProps,
          internalProps: normalizedInternalProps,
          children: strict ? Object.freeze(normalizedInitialChildren) : normalizedInitialChildren
        };
        const component = __spreadValues({
          kind: KIND_COMPONENT,
          get children() {
            return internals.children;
          },
          get props() {
            return internals.externalProps;
          },
          get remoteProps() {
            return internals.internalProps;
          },
          remove: () => remove(component),
          updateProps: (newProps) => updateProps(component, newProps, internals, rootInternals),
          append: (...children) => append(component, children.map((child) => normalizeChild(child, remoteRoot)), internals, rootInternals),
          appendChild: (child) => appendChild(component, normalizeChild(child, remoteRoot), internals, rootInternals),
          removeChild: (child) => removeChild(component, child, internals, rootInternals),
          replaceChildren: (...children) => replaceChildren(component, children.map((child) => normalizeChild(child, remoteRoot)), internals, rootInternals),
          insertBefore: (child, before) => insertBefore(component, normalizeChild(child, remoteRoot), before, internals, rootInternals),
          insertChildBefore: (child, before) => insertBefore(component, normalizeChild(child, remoteRoot), before, internals, rootInternals)
        }, EMPTY_OBJECT);
        rootInternals.components.set(component, internals);
        Object.defineProperty(component, "type", {
          value: type,
          configurable: false,
          writable: false,
          enumerable: true
        });
        makePartOfTree(component, rootInternals);
        makeRemote(component, id, remoteRoot);
        for (const child of internals.children) {
          moveNodeToContainer(component, child, rootInternals);
        }
        return component;
      },
      createText(content = "") {
        const id = `${currentId++}`;
        const internals = {
          text: content
        };
        const update = (newText) => updateText(text, newText, internals, rootInternals);
        const text = __spreadValues({
          kind: KIND_TEXT,
          get text() {
            return internals.text;
          },
          update,
          updateText: update,
          remove: () => remove(text)
        }, EMPTY_OBJECT);
        makePartOfTree(text, rootInternals);
        makeRemote(text, id, remoteRoot);
        return text;
      },
      createFragment() {
        const id = `${currentId++}`;
        const internals = {
          children: strict ? Object.freeze([]) : []
        };
        const fragment = __spreadValues({
          kind: KIND_FRAGMENT,
          get children() {
            return internals.children;
          },
          append: (...children) => append(fragment, children.map((child) => normalizeChild(child, remoteRoot)), internals, rootInternals),
          appendChild: (child) => appendChild(fragment, normalizeChild(child, remoteRoot), internals, rootInternals),
          removeChild: (child) => removeChild(fragment, child, internals, rootInternals),
          replaceChildren: (...children) => replaceChildren(fragment, children.map((child) => normalizeChild(child, remoteRoot)), internals, rootInternals),
          insertBefore: (child, before) => insertBefore(fragment, normalizeChild(child, remoteRoot), before, internals, rootInternals),
          insertChildBefore: (child, before) => insertBefore(fragment, normalizeChild(child, remoteRoot), before, internals, rootInternals)
        }, EMPTY_OBJECT);
        rootInternals.fragments.set(fragment, internals);
        makePartOfTree(fragment, rootInternals);
        makeRemote(fragment, id, remoteRoot);
        return fragment;
      },
      append: (...children) => append(remoteRoot, children.map((child) => normalizeChild(child, remoteRoot)), rootInternals, rootInternals),
      appendChild: (child) => appendChild(remoteRoot, normalizeChild(child, remoteRoot), rootInternals, rootInternals),
      replaceChildren: (...children) => replaceChildren(remoteRoot, children.map((child) => normalizeChild(child, remoteRoot)), rootInternals, rootInternals),
      removeChild: (child) => removeChild(remoteRoot, child, rootInternals, rootInternals),
      insertBefore: (child, before) => insertBefore(remoteRoot, normalizeChild(child, remoteRoot), before, rootInternals, rootInternals),
      insertChildBefore: (child, before) => insertBefore(remoteRoot, normalizeChild(child, remoteRoot), before, rootInternals, rootInternals),
      mount() {
        if (rootInternals.mounted)
          return Promise.resolve();
        rootInternals.mounted = true;
        return Promise.resolve(channel(ACTION_MOUNT, rootInternals.children.map(serializeChild)));
      }
    };
    return remoteRoot;
  }
  function connected(element, {
    tops
  }) {
    var _tops$get;
    return ((_tops$get = tops.get(element)) === null || _tops$get === void 0 ? void 0 : _tops$get.kind) === KIND_ROOT;
  }
  function allDescendants(element, withEach) {
    const recurse = (element2) => {
      if ("children" in element2) {
        for (const child of element2.children) {
          withEach(child);
          recurse(child);
        }
      }
    };
    recurse(element);
  }
  function perform(element, rootInternals, {
    remote,
    local
  }) {
    const {
      mounted,
      channel
    } = rootInternals;
    if (mounted && (element.kind === KIND_ROOT || connected(element, rootInternals))) {
      remote(channel);
    }
    local();
  }
  function updateText(text, newText, internals, rootInternals) {
    return perform(text, rootInternals, {
      remote: (channel) => channel(ACTION_UPDATE_TEXT, text.id, newText),
      local: () => {
        internals.text = newText;
      }
    });
  }
  var IGNORE = Symbol("ignore");
  function updateProps(component, newProps, internals, rootInternals) {
    const {
      strict
    } = rootInternals;
    const {
      internalProps: currentProps,
      externalProps: currentExternalProps
    } = internals;
    const normalizedNewProps = {};
    const hotSwapFunctions = [];
    let hasRemoteChange = false;
    for (const key of Object.keys(newProps)) {
      if (key === "children")
        continue;
      const currentExternalValue = currentExternalProps[key];
      const newExternalValue = newProps[key];
      const currentValue = currentProps[key];
      const newValue = serializeProp(newExternalValue);
      if (currentValue === newValue && (newValue == null || typeof newValue !== "object")) {
        continue;
      }
      const [value, hotSwaps] = tryHotSwappingValues(currentValue, newValue);
      if (hotSwaps) {
        hotSwapFunctions.push(...hotSwaps);
      }
      if (value === IGNORE)
        continue;
      hasRemoteChange = true;
      normalizedNewProps[key] = value;
      if (isRemoteFragment(currentExternalValue)) {
        removeNodeFromContainer(currentExternalValue, rootInternals);
      }
      if (isRemoteFragment(newExternalValue)) {
        moveNodeToContainer(component, newExternalValue, rootInternals);
      }
    }
    return perform(component, rootInternals, {
      remote: (channel) => {
        if (hasRemoteChange) {
          channel(ACTION_UPDATE_PROPS, component.id, normalizedNewProps);
        }
      },
      local: () => {
        const mergedExternalProps = __spreadValues(__spreadValues({}, currentExternalProps), newProps);
        internals.externalProps = strict ? Object.freeze(mergedExternalProps) : mergedExternalProps;
        internals.internalProps = __spreadValues(__spreadValues({}, internals.internalProps), normalizedNewProps);
        for (const [hotSwappable, newValue] of hotSwapFunctions) {
          hotSwappable[FUNCTION_CURRENT_IMPLEMENTATION_KEY] = newValue;
        }
      }
    });
  }
  function tryHotSwappingValues(currentValue, newValue, seen = /* @__PURE__ */ new Set()) {
    if (seen.has(currentValue)) {
      return [IGNORE];
    }
    seen.add(currentValue);
    if (typeof currentValue === "function" && FUNCTION_CURRENT_IMPLEMENTATION_KEY in currentValue) {
      const result2 = [typeof newValue === "function" ? IGNORE : makeValueHotSwappable(newValue), [[currentValue, newValue]]];
      return result2;
    }
    if (Array.isArray(currentValue)) {
      const result2 = tryHotSwappingArrayValues(currentValue, newValue, seen);
      return result2;
    }
    if (isBasicObject(currentValue) && !isRemoteFragment(currentValue)) {
      const result2 = tryHotSwappingObjectValues(currentValue, newValue, seen);
      return result2;
    }
    const result = [currentValue === newValue ? IGNORE : newValue];
    return result;
  }
  function makeValueHotSwappable(value, seen = /* @__PURE__ */ new Map()) {
    const seenValue = seen.get(value);
    if (seenValue)
      return seenValue;
    if (isRemoteFragment(value)) {
      seen.set(value, value);
      return value;
    }
    if (Array.isArray(value)) {
      const result = [];
      seen.set(value, result);
      for (const nested of value) {
        result.push(makeValueHotSwappable(nested, seen));
      }
      return result;
    }
    if (isBasicObject(value)) {
      const result = {};
      seen.set(value, result);
      for (const key of Object.keys(value)) {
        result[key] = makeValueHotSwappable(value[key], seen);
      }
      return result;
    }
    if (typeof value === "function") {
      const wrappedFunction = (...args) => {
        return wrappedFunction[FUNCTION_CURRENT_IMPLEMENTATION_KEY](...args);
      };
      Object.defineProperty(wrappedFunction, FUNCTION_CURRENT_IMPLEMENTATION_KEY, {
        enumerable: false,
        configurable: false,
        writable: true,
        value
      });
      seen.set(value, wrappedFunction);
      return wrappedFunction;
    }
    seen.set(value, value);
    return value;
  }
  function collectNestedHotSwappableValues(value, seen = /* @__PURE__ */ new Set()) {
    if (seen.has(value))
      return void 0;
    seen.add(value);
    if (Array.isArray(value)) {
      return value.reduce((all, element) => {
        const nested = collectNestedHotSwappableValues(element, seen);
        return nested ? [...all, ...nested] : all;
      }, []);
    }
    if (isBasicObject(value)) {
      return Object.keys(value).reduce((all, key) => {
        const nested = collectNestedHotSwappableValues(value[key], seen);
        return nested ? [...all, ...nested] : all;
      }, []);
    }
    if (typeof value === "function") {
      return FUNCTION_CURRENT_IMPLEMENTATION_KEY in value ? [value] : void 0;
    }
    return void 0;
  }
  function remove(child) {
    var _child$parent;
    (_child$parent = child.parent) === null || _child$parent === void 0 ? void 0 : _child$parent.removeChild(child);
  }
  function append(container, children, internals, rootInternals) {
    for (const child of children) {
      appendChild(container, child, internals, rootInternals);
    }
  }
  function appendChild(container, child, internals, rootInternals) {
    var _currentParent$childr;
    const {
      nodes,
      strict
    } = rootInternals;
    if (!nodes.has(child)) {
      throw new Error(`Cannot append a node that was not created by this remote root`);
    }
    const currentParent = child.parent;
    const existingIndex = (_currentParent$childr = currentParent === null || currentParent === void 0 ? void 0 : currentParent.children.indexOf(child)) !== null && _currentParent$childr !== void 0 ? _currentParent$childr : -1;
    return perform(container, rootInternals, {
      remote: (channel) => {
        channel(ACTION_INSERT_CHILD, container.id, existingIndex < 0 ? container.children.length : container.children.length - 1, serializeChild(child), currentParent ? currentParent.id : false);
      },
      local: () => {
        moveNodeToContainer(container, child, rootInternals);
        let newChildren;
        if (currentParent) {
          const currentInternals = getCurrentInternals(currentParent, rootInternals);
          const currentChildren = [...currentInternals.children];
          currentChildren.splice(existingIndex, 1);
          if (currentParent === container) {
            newChildren = currentChildren;
          } else {
            currentInternals.children = strict ? Object.freeze(currentChildren) : currentChildren;
            newChildren = [...internals.children];
          }
        } else {
          newChildren = [...internals.children];
        }
        newChildren.push(child);
        internals.children = strict ? Object.freeze(newChildren) : newChildren;
      }
    });
  }
  function replaceChildren(container, children, internals, rootInternals) {
    for (const child of container.children) {
      removeChild(container, child, internals, rootInternals);
    }
    append(container, children, internals, rootInternals);
  }
  function removeChild(container, child, internals, rootInternals) {
    const {
      strict
    } = rootInternals;
    return perform(container, rootInternals, {
      remote: (channel) => channel(ACTION_REMOVE_CHILD, container.id, container.children.indexOf(child)),
      local: () => {
        removeNodeFromContainer(child, rootInternals);
        const newChildren = [...internals.children];
        newChildren.splice(newChildren.indexOf(child), 1);
        internals.children = strict ? Object.freeze(newChildren) : newChildren;
      }
    });
  }
  function insertBefore(container, child, before, internals, rootInternals) {
    var _currentParent$childr2;
    const {
      strict,
      nodes
    } = rootInternals;
    if (!nodes.has(child)) {
      throw new Error(`Cannot insert a node that was not created by this remote root`);
    }
    const currentParent = child.parent;
    const existingIndex = (_currentParent$childr2 = currentParent === null || currentParent === void 0 ? void 0 : currentParent.children.indexOf(child)) !== null && _currentParent$childr2 !== void 0 ? _currentParent$childr2 : -1;
    return perform(container, rootInternals, {
      remote: (channel) => {
        const beforeIndex = before == null ? container.children.length - 1 : container.children.indexOf(before);
        channel(ACTION_INSERT_CHILD, container.id, beforeIndex < existingIndex || existingIndex < 0 ? beforeIndex : beforeIndex - 1, serializeChild(child), currentParent ? currentParent.id : false);
      },
      local: () => {
        moveNodeToContainer(container, child, rootInternals);
        let newChildren;
        if (currentParent) {
          const currentInternals = getCurrentInternals(currentParent, rootInternals);
          const currentChildren = [...currentInternals.children];
          currentChildren.splice(existingIndex, 1);
          if (currentParent === container) {
            newChildren = currentChildren;
          } else {
            currentInternals.children = strict ? Object.freeze(currentChildren) : currentChildren;
            newChildren = [...internals.children];
          }
        } else {
          newChildren = [...internals.children];
        }
        if (before == null) {
          newChildren.push(child);
        } else {
          newChildren.splice(newChildren.indexOf(before), 0, child);
        }
        internals.children = strict ? Object.freeze(newChildren) : newChildren;
      }
    });
  }
  function normalizeChild(child, root) {
    return typeof child === "string" ? root.createText(child) : child;
  }
  function moveNodeToContainer(container, node, rootInternals) {
    const {
      tops,
      parents
    } = rootInternals;
    const newTop = container.kind === KIND_ROOT ? container : tops.get(container);
    tops.set(node, newTop);
    parents.set(node, container);
    moveFragmentToContainer(node, rootInternals);
    allDescendants(node, (descendant) => {
      tops.set(descendant, newTop);
      moveFragmentToContainer(descendant, rootInternals);
    });
  }
  function moveFragmentToContainer(node, rootInternals) {
    if (node.kind !== KIND_COMPONENT)
      return;
    const props = node.props;
    if (!props)
      return;
    Object.values(props).forEach((prop) => {
      if (!isRemoteFragment(prop))
        return;
      moveNodeToContainer(node, prop, rootInternals);
    });
  }
  function removeNodeFromContainer(node, rootInternals) {
    const {
      tops,
      parents
    } = rootInternals;
    tops.delete(node);
    parents.delete(node);
    allDescendants(node, (descendant) => {
      tops.delete(descendant);
      removeFragmentFromContainer(descendant, rootInternals);
    });
    removeFragmentFromContainer(node, rootInternals);
  }
  function removeFragmentFromContainer(node, rootInternals) {
    if (node.kind !== KIND_COMPONENT)
      return;
    const props = node.remoteProps;
    for (const key of Object.keys(props !== null && props !== void 0 ? props : {})) {
      const prop = props[key];
      if (!isRemoteFragment(prop))
        continue;
      removeNodeFromContainer(prop, rootInternals);
    }
  }
  function makePartOfTree(node, {
    parents,
    tops,
    nodes
  }) {
    nodes.add(node);
    Object.defineProperty(node, "parent", {
      get() {
        return parents.get(node);
      },
      configurable: true,
      enumerable: true
    });
    Object.defineProperty(node, "top", {
      get() {
        return tops.get(node);
      },
      configurable: true,
      enumerable: true
    });
  }
  function serializeChild(value) {
    return value.kind === KIND_TEXT ? {
      id: value.id,
      kind: value.kind,
      text: value.text
    } : {
      id: value.id,
      kind: value.kind,
      type: value.type,
      props: value.remoteProps,
      children: value.children.map((child) => serializeChild(child))
    };
  }
  function serializeProp(prop) {
    if (isRemoteFragment(prop)) {
      return serializeFragment(prop);
    }
    return prop;
  }
  function serializeFragment(value) {
    return {
      id: value.id,
      kind: value.kind,
      get children() {
        return value.children.map((child) => serializeChild(child));
      }
    };
  }
  function getCurrentInternals(currentParent, rootInternals) {
    if (currentParent.kind === KIND_ROOT) {
      return rootInternals;
    }
    if (currentParent.kind === KIND_FRAGMENT) {
      return rootInternals.fragments.get(currentParent);
    }
    return rootInternals.components.get(currentParent);
  }
  function makeRemote(value, id, root) {
    Object.defineProperty(value, "id", {
      value: id,
      configurable: true,
      writable: false,
      enumerable: false
    });
    Object.defineProperty(value, "root", {
      value: root,
      configurable: true,
      writable: false,
      enumerable: false
    });
  }
  function tryHotSwappingObjectValues(currentValue, newValue, seen) {
    if (!isBasicObject(newValue)) {
      var _collectNestedHotSwap;
      return [makeValueHotSwappable(newValue), (_collectNestedHotSwap = collectNestedHotSwappableValues(currentValue)) === null || _collectNestedHotSwap === void 0 ? void 0 : _collectNestedHotSwap.map((hotSwappable) => [hotSwappable, void 0])];
    }
    let hasChanged = false;
    const hotSwaps = [];
    const normalizedNewValue = {};
    for (const key in currentValue) {
      const currentObjectValue = currentValue[key];
      if (!(key in newValue)) {
        hasChanged = true;
        const nestedHotSwappables = collectNestedHotSwappableValues(currentObjectValue);
        if (nestedHotSwappables) {
          hotSwaps.push(...nestedHotSwappables.map((hotSwappable) => [hotSwappable, void 0]));
        }
      }
      const newObjectValue = newValue[key];
      const [updatedValue, elementHotSwaps] = tryHotSwappingValues(currentObjectValue, newObjectValue, seen);
      if (elementHotSwaps) {
        hotSwaps.push(...elementHotSwaps);
      }
      if (updatedValue !== IGNORE) {
        hasChanged = true;
        normalizedNewValue[key] = updatedValue;
      }
    }
    for (const key in newValue) {
      if (key in normalizedNewValue)
        continue;
      hasChanged = true;
      normalizedNewValue[key] = makeValueHotSwappable(newValue[key]);
    }
    return [hasChanged ? normalizedNewValue : IGNORE, hotSwaps];
  }
  function tryHotSwappingArrayValues(currentValue, newValue, seen) {
    if (!Array.isArray(newValue)) {
      var _collectNestedHotSwap2;
      return [makeValueHotSwappable(newValue), (_collectNestedHotSwap2 = collectNestedHotSwappableValues(currentValue)) === null || _collectNestedHotSwap2 === void 0 ? void 0 : _collectNestedHotSwap2.map((hotSwappable) => [hotSwappable, void 0])];
    }
    let hasChanged = false;
    const hotSwaps = [];
    const newLength = newValue.length;
    const currentLength = currentValue.length;
    const maxLength = Math.max(currentLength, newLength);
    const normalizedNewValue = [];
    for (let i = 0; i < maxLength; i++) {
      const currentArrayValue = currentValue[i];
      const newArrayValue = newValue[i];
      if (i < newLength) {
        if (i >= currentLength) {
          hasChanged = true;
          normalizedNewValue[i] = makeValueHotSwappable(newArrayValue);
          continue;
        }
        const [updatedValue, elementHotSwaps] = tryHotSwappingValues(currentArrayValue, newArrayValue, seen);
        if (elementHotSwaps)
          hotSwaps.push(...elementHotSwaps);
        if (updatedValue === IGNORE) {
          normalizedNewValue[i] = currentArrayValue;
          continue;
        }
        hasChanged = true;
        normalizedNewValue[i] = updatedValue;
      } else {
        hasChanged = true;
        const nestedHotSwappables = collectNestedHotSwappableValues(currentArrayValue);
        if (nestedHotSwappables) {
          hotSwaps.push(...nestedHotSwappables.map((hotSwappable) => [hotSwappable, void 0]));
        }
      }
    }
    return [hasChanged ? normalizedNewValue : IGNORE, hotSwaps];
  }

  // node_modules/@shopify/ui-extensions/build/esm/utilities/registration.mjs
  function createExtensionRegistrationFunction() {
    const extensionWrapper = (target, implementation) => {
      var _shopify;
      function extension2(...args) {
        return __async(this, null, function* () {
          if (args.length === 1) {
            return implementation(...args);
          }
          const [{
            channel,
            components
          }, api] = args;
          const root = createRemoteRoot(channel, {
            components,
            strict: true
          });
          let renderResult = implementation(root, api);
          if (typeof renderResult === "object" && renderResult != null && "then" in renderResult) {
            renderResult = yield renderResult;
          }
          root.mount();
          return renderResult;
        });
      }
      (_shopify = globalThis.shopify) === null || _shopify === void 0 ? void 0 : _shopify.extend(target, extension2);
      return extension2;
    };
    return extensionWrapper;
  }

  // node_modules/@shopify/ui-extensions/build/esm/surfaces/admin/extension.mjs
  var extension = createExtensionRegistrationFunction();

  // node_modules/@shopify/ui-extensions/build/esm/surfaces/admin/components/AdminBlock/AdminBlock.mjs
  var AdminBlock = createRemoteComponent("AdminBlock");

  // node_modules/@shopify/ui-extensions/build/esm/surfaces/admin/components/BlockStack/BlockStack.mjs
  var BlockStack = createRemoteComponent("BlockStack");

  // node_modules/@shopify/ui-extensions/build/esm/surfaces/admin/components/Box/Box.mjs
  var Box = createRemoteComponent("Box");

  // node_modules/@shopify/ui-extensions/build/esm/surfaces/admin/components/Divider/Divider.mjs
  var Divider = createRemoteComponent("Divider");

  // node_modules/@shopify/ui-extensions/build/esm/surfaces/admin/components/Heading/Heading.mjs
  var Heading = createRemoteComponent("Heading");

  // node_modules/@shopify/ui-extensions/build/esm/surfaces/admin/components/InlineStack/InlineStack.mjs
  var InlineStack = createRemoteComponent("InlineStack");

  // node_modules/@shopify/ui-extensions/build/esm/surfaces/admin/components/Link/Link.mjs
  var Link = createRemoteComponent("Link");

  // node_modules/@shopify/ui-extensions/build/esm/surfaces/admin/components/Text/Text.mjs
  var Text = createRemoteComponent("Text");

  // node_modules/@remote-ui/react/build/esm/render.mjs
  var import_react2 = __toESM(require_react(), 1);

  // node_modules/@remote-ui/react/build/esm/reconciler.mjs
  var import_react_reconciler = __toESM(require_react_reconciler(), 1);
  var createReconciler = (options) => {
    var _options$primary;
    return (0, import_react_reconciler.default)({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - Compat for React <= 17.x
      now: Date.now,
      // Timeout
      scheduleTimeout: setTimeout,
      cancelTimeout: clearTimeout,
      noTimeout: false,
      // Microtask scheduling
      // @see https://github.com/facebook/react/blob/2c8a1452b82b9ec5ebfa3f370b31fda19610ae92/packages/react-dom/src/client/ReactDOMHostConfig.js#L391-L401
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - types in `@types/react-reconciler` are outdated
      supportsMicrotasks: true,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - types in `@types/react-reconciler` are outdated
      scheduleMicrotask,
      // Compat for React <= 17.x
      queueMicrotask: scheduleMicrotask,
      isPrimaryRenderer: (_options$primary = options === null || options === void 0 ? void 0 : options.primary) !== null && _options$primary !== void 0 ? _options$primary : true,
      supportsMutation: true,
      supportsHydration: false,
      supportsPersistence: false,
      // Context
      getRootHostContext() {
        return {};
      },
      getChildHostContext(context) {
        return context;
      },
      // Instances
      createTextInstance(text, root) {
        return root.createText(text);
      },
      createInstance(type, allProps, root) {
        const _a = allProps, {
          children: _children
        } = _a, props = __objRest(_a, [
          "children"
        ]);
        return root.createComponent(type, props);
      },
      // Updates
      commitTextUpdate(text, _oldText, newText) {
        text.update(newText);
      },
      prepareUpdate(_instance, _type, oldProps, newProps) {
        const updateProps2 = {};
        let needsUpdate = false;
        for (const key in oldProps) {
          if (!has(oldProps, key) || key === "children") {
            continue;
          }
          if (!(key in newProps)) {
            needsUpdate = true;
            updateProps2[key] = void 0;
          } else if (oldProps[key] !== newProps[key]) {
            needsUpdate = true;
            updateProps2[key] = newProps[key];
          }
        }
        for (const key in newProps) {
          if (!has(newProps, key) || key === "children") {
            continue;
          }
          if (!(key in oldProps)) {
            needsUpdate = true;
            updateProps2[key] = newProps[key];
          }
        }
        return needsUpdate ? updateProps2 : null;
      },
      commitUpdate(instance, payload) {
        instance.updateProps(payload);
      },
      // Update root
      appendChildToContainer(remoteRoot, child) {
        remoteRoot.append(child);
      },
      insertInContainerBefore(remoteRoot, child, beforeChild) {
        remoteRoot.insertBefore(child, beforeChild);
      },
      removeChildFromContainer(remoteRoot, child) {
        remoteRoot.removeChild(child);
      },
      clearContainer(remoteRoot) {
        for (const child of remoteRoot.children) {
          remoteRoot.removeChild(child);
        }
      },
      // Update children
      appendInitialChild(parent, child) {
        parent.append(child);
      },
      appendChild(parent, child) {
        parent.append(child);
      },
      insertBefore(parent, newChild, beforeChild) {
        parent.insertBefore(newChild, beforeChild);
      },
      removeChild(parent, child) {
        parent.removeChild(child);
      },
      // Unknown
      finalizeInitialChildren() {
        return false;
      },
      shouldSetTextContent() {
        return false;
      },
      getPublicInstance() {
      },
      prepareForCommit() {
        return null;
      },
      resetAfterCommit() {
      },
      commitMount() {
      },
      preparePortalMount() {
      },
      detachDeletedInstance() {
      }
    });
  };
  function scheduleMicrotask(callback) {
    return typeof queueMicrotask === "function" ? queueMicrotask : Promise.resolve(null).then(callback).catch(handleErrorInNextTick);
  }
  function handleErrorInNextTick(error) {
    setTimeout(() => {
      throw error;
    });
  }
  var {
    hasOwnProperty
  } = {};
  function has(object, property) {
    return hasOwnProperty.call(object, property);
  }

  // node_modules/@remote-ui/react/build/esm/context.mjs
  var import_react = __toESM(require_react(), 1);
  var RenderContext = /* @__PURE__ */ (0, import_react.createContext)(null);

  // node_modules/@remote-ui/react/build/esm/render.mjs
  var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
  var cache = /* @__PURE__ */ new WeakMap();
  var LEGACY_ROOT = 0;
  var defaultReconciler = createReconciler();
  function render(element, root, callback, reconciler = defaultReconciler) {
    let cached = cache.get(root);
    if (!cached) {
      var _version$split;
      const major = Number(((_version$split = import_react2.version.split(".")) === null || _version$split === void 0 ? void 0 : _version$split[0]) || 18);
      const value = {
        container: major >= 18 ? reconciler.createContainer(
          root,
          LEGACY_ROOT,
          null,
          false,
          null,
          // Might not be necessary
          "r-ui",
          () => null,
          null
        ) : (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore - this is to support React 17
          reconciler.createContainer(root, LEGACY_ROOT, false, null)
        ),
        // We also cache the render context to avoid re-creating it on subsequent render calls
        renderContext: {
          root,
          reconciler
        }
      };
      cache.set(root, value);
      cached = value;
    }
    const {
      container,
      renderContext
    } = cached;
    reconciler.updateContainer(element && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RenderContext.Provider, {
      value: renderContext,
      children: element
    }), container, null, callback);
  }

  // node_modules/@remote-ui/react/build/esm/components.mjs
  var import_react4 = __toESM(require_react(), 1);
  var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);

  // node_modules/@remote-ui/react/build/esm/hooks/render.mjs
  var import_react3 = __toESM(require_react(), 1);
  function useRender() {
    const render2 = (0, import_react3.useContext)(RenderContext);
    if (render2 == null) {
      throw new Error("No remote-ui Render instance found in context");
    }
    return render2;
  }

  // node_modules/@remote-ui/react/build/esm/components.mjs
  function createRemoteReactComponent(componentType, {
    fragmentProps
  } = {}) {
    if (!fragmentProps || !fragmentProps.length) {
      return componentType;
    }
    const wrapper = createComponentWrapper(componentType, fragmentProps);
    wrapper.displayName = componentType;
    return wrapper;
  }
  function createComponentWrapper(componentType, fragmentProps) {
    const Component = componentType;
    return /* @__PURE__ */ (0, import_react4.memo)(function ComponentWrapper(_a) {
      var _b = _a, {
        children: externalChildren = []
      } = _b, externalProps = __objRest(_b, [
        "children"
      ]);
      const fragments = (0, import_react4.useRef)({});
      const {
        root,
        reconciler
      } = useRender();
      const {
        props,
        children
      } = (0, import_react4.useMemo)(() => {
        const portals = [];
        const props2 = {};
        for (const key of Object.keys(externalProps)) {
          const element = externalProps[key];
          if (fragmentProps.includes(key) && /* @__PURE__ */ (0, import_react4.isValidElement)(element)) {
            const currentFragment = fragments.current[key];
            const fragment = isRemoteFragment(currentFragment) ? currentFragment : root.createFragment();
            fragments.current[key] = fragment;
            Object.assign(fragment, {
              createText(...args) {
                return root.createText(...args);
              },
              createComponent(type, ...args) {
                return root.createComponent(type, ...args);
              }
            });
            const portal = reconciler.createPortal(element, fragment, null, null);
            portals.push(portal);
            props2[key] = fragment;
          } else {
            props2[key] = element;
            delete fragments.current[key];
          }
        }
        return {
          props: props2,
          children: [...import_react4.Children.toArray(externalChildren), ...portals]
        };
      }, [externalChildren, externalProps, root, reconciler, fragments]);
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Component, __spreadProps(__spreadValues({}, props), {
        children
      }));
    });
  }

  // node_modules/@shopify/ui-extensions-react/build/esm/surfaces/admin/context.mjs
  var import_react5 = __toESM(require_react(), 1);
  var ExtensionApiContext = /* @__PURE__ */ (0, import_react5.createContext)(null);

  // node_modules/@shopify/ui-extensions-react/build/esm/surfaces/admin/render.mjs
  var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
  function reactExtension(target, render$1) {
    return extension(target, (root, api) => __async(this, null, function* () {
      const element = yield render$1(api);
      yield new Promise((resolve, reject) => {
        try {
          render(/* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ExtensionApiContext.Provider, {
            value: api,
            children: element
          }), root, () => {
            resolve();
          });
        } catch (error) {
          console.error(error);
          reject(error);
        }
      });
    }));
  }

  // node_modules/@shopify/ui-extensions-react/build/esm/surfaces/admin/components/AdminBlock/AdminBlock.mjs
  var AdminBlock2 = createRemoteReactComponent(AdminBlock);

  // node_modules/@shopify/ui-extensions-react/build/esm/surfaces/admin/components/BlockStack/BlockStack.mjs
  var BlockStack2 = createRemoteReactComponent(BlockStack);

  // node_modules/@shopify/ui-extensions-react/build/esm/surfaces/admin/components/Box/Box.mjs
  var Box2 = createRemoteReactComponent(Box);

  // node_modules/@shopify/ui-extensions-react/build/esm/surfaces/admin/components/Divider/Divider.mjs
  var Divider2 = createRemoteReactComponent(Divider);

  // node_modules/@shopify/ui-extensions-react/build/esm/surfaces/admin/components/Heading/Heading.mjs
  var Heading2 = createRemoteReactComponent(Heading);

  // node_modules/@shopify/ui-extensions-react/build/esm/surfaces/admin/components/InlineStack/InlineStack.mjs
  var InlineStack2 = createRemoteReactComponent(InlineStack);

  // node_modules/@shopify/ui-extensions-react/build/esm/surfaces/admin/components/Link/Link.mjs
  var Link2 = createRemoteReactComponent(Link);

  // node_modules/@shopify/ui-extensions-react/build/esm/surfaces/admin/components/Text/Text.mjs
  var Text2 = createRemoteReactComponent(Text);

  // node_modules/@shopify/ui-extensions-react/build/esm/surfaces/admin/hooks/api.mjs
  var import_react15 = __toESM(require_react(), 1);

  // node_modules/@shopify/ui-extensions-react/build/esm/surfaces/admin/errors.mjs
  var AdminUIExtensionError = class extends Error {
    constructor(...args) {
      super(...args);
      this.name = "AdminUIExtensionError";
    }
  };

  // node_modules/@shopify/ui-extensions-react/build/esm/surfaces/admin/hooks/api.mjs
  function useApi(_target) {
    const api = (0, import_react15.useContext)(ExtensionApiContext);
    if (api == null) {
      throw new AdminUIExtensionError("No extension api found.");
    }
    return api;
  }

  // extensions/aso-admin-order-detail/src/BlockExtension.tsx
  var import_react16 = __toESM(require_react());
  var import_jsx_runtime4 = __toESM(require_jsx_runtime());
  var TARGET = "admin.order-details.block.render";
  var BlockExtension_default = reactExtension(TARGET, () => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(App, {}));
  function getVariantRecaps(id) {
    return __async(this, null, function* () {
      const res = yield fetch(`/api/order-recaps/${id}`);
      return res.json();
    });
  }
  function App() {
    let [variantRecaps, setVariantRecaps] = (0, import_react16.useState)();
    const { i18n, data } = useApi(TARGET);
    const [isDownloading, setIsDownloading] = (0, import_react16.useState)(false);
    (0, import_react16.useEffect)(() => {
      var _a, _b;
      console.log("start  getting data");
      getVariantRecaps(`${(_b = (_a = data.selected) == null ? void 0 : _a[0]) == null ? void 0 : _b.id}`.replace("gid://shopify/Order/", "")).then((res) => {
        setVariantRecaps(res);
        console.log("order data", res);
      }).catch((err) => console.log("errors getting data", err));
    }, []);
    return (
      // The AdminBlock component provides an API for setting the title of the Block extension wrapper.
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(AdminBlock2, { title: "ALL SIGNS OPTIONS", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(BlockStack2, { gap: "small small", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(InlineStack2, { blockAlignment: "end", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Heading2, { size: 4, children: [
          " ",
          i18n.translate("recapTitle"),
          "  "
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(BlockStack2, { children: variantRecaps == null ? void 0 : variantRecaps.map((variantRecap) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja, _Ka, _La, _Ma, _Na, _Oa, _Pa, _Qa, _Ra, _Sa, _Ta, _Ua, _Va, _Wa, _Xa, _Ya, _Za, __a, _$a, _ab, _bb, _cb, _db, _eb, _fb, _gb, _hb, _ib, _jb, _kb, _lb, _mb, _nb, _ob, _pb, _qb, _rb, _sb, _tb, _ub, _vb, _wb, _xb;
          return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Box2, { paddingBlockEnd: "base", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(InlineStack2, { inlineAlignment: "start", blockAlignment: "center", gap: "base", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Heading2, { size: 5, children: [
                " ",
                (_a = variantRecap.line_item) == null ? void 0 : _a.title,
                "   "
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Heading2, { size: 3, children: [
                " x ",
                (_b = variantRecap.line_item) == null ? void 0 : _b.quantity,
                "   "
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Box2, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Divider2, {}),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontWeight: "bold-300", children: [
                (_c = variantRecap.recaps.material) == null ? void 0 : _c.label,
                " : "
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { children: [
                (_d = variantRecap.recaps.material) == null ? void 0 : _d.value,
                " "
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontWeight: "bold-300", children: [
                (_f = (_e = variantRecap.recaps.sign) == null ? void 0 : _e.size) == null ? void 0 : _f.label,
                " : "
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { children: [
                " ",
                `
                ${(_j = (_i = (_h = (_g = variantRecap.recaps.sign) == null ? void 0 : _g.size) == null ? void 0 : _h.value) == null ? void 0 : _i.width) == null ? void 0 : _j.label} :
                 ${(_m = (_l = (_k = variantRecap.recaps.sign) == null ? void 0 : _k.size) == null ? void 0 : _l.value) == null ? void 0 : _m.width.value}, 
                 ${(_q = (_p = (_o = (_n = variantRecap.recaps.sign) == null ? void 0 : _n.size) == null ? void 0 : _o.value) == null ? void 0 : _p.height) == null ? void 0 : _q.label}:
                  ${(_t = (_s = (_r = variantRecap.recaps.sign) == null ? void 0 : _r.size) == null ? void 0 : _s.value) == null ? void 0 : _t.height.value}
                  `,
                " "
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontWeight: "bold-300", children: [
                (_x = (_w = (_v = (_u = variantRecap.recaps.sign) == null ? void 0 : _u.size) == null ? void 0 : _v.value) == null ? void 0 : _w.thickness) == null ? void 0 : _x.label,
                " : "
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { children: [
                (_A = (_z = (_y = variantRecap.recaps.sign) == null ? void 0 : _y.size) == null ? void 0 : _z.value) == null ? void 0 : _A.thickness.value,
                " "
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontWeight: "bold-300", children: [
                (_C = (_B = variantRecap.recaps.sign) == null ? void 0 : _B.shape) == null ? void 0 : _C.label,
                " : "
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { children: [
                " ",
                (_E = (_D = variantRecap.recaps.sign) == null ? void 0 : _D.shape) == null ? void 0 : _E.value
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontWeight: "bold-300", children: [
                (_G = (_F = variantRecap.recaps.sign) == null ? void 0 : _F.fixingMethod) == null ? void 0 : _G.label,
                " : "
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { children: [
                " ",
                (_I = (_H = variantRecap.recaps.sign) == null ? void 0 : _H.fixingMethod) == null ? void 0 : _I.value
              ] }),
              !((_L = (_K = (_J = variantRecap.recaps.sign) == null ? void 0 : _J.border) == null ? void 0 : _K.value) == null ? void 0 : _L.face1) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontWeight: "bold-300", children: [
                  (_N = (_M = variantRecap.recaps.sign) == null ? void 0 : _M.border) == null ? void 0 : _N.label,
                  " : "
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { children: [
                  " ",
                  (_Q = (_P = (_O = variantRecap.recaps.sign) == null ? void 0 : _O.border) == null ? void 0 : _P.value) == null ? void 0 : _Q.type,
                  ", ",
                  (_T = (_S = (_R = variantRecap.recaps.sign) == null ? void 0 : _R.border) == null ? void 0 : _S.value) == null ? void 0 : _T.color,
                  " "
                ] })
              ] }),
              ((_W = (_V = (_U = variantRecap.recaps.sign) == null ? void 0 : _U.border) == null ? void 0 : _V.value) == null ? void 0 : _W.face1) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontWeight: "bold-300", children: [
                  (_Y = (_X = variantRecap.recaps.sign) == null ? void 0 : _X.border) == null ? void 0 : _Y.label,
                  "-",
                  (__ = (_Z = variantRecap.recaps) == null ? void 0 : _Z.faces) == null ? void 0 : __.face1,
                  ": "
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { children: [
                  " ",
                  (_ca = (_ba = (_aa = (_$ = variantRecap.recaps.sign) == null ? void 0 : _$.border) == null ? void 0 : _aa.value) == null ? void 0 : _ba.face1) == null ? void 0 : _ca.type,
                  ", ",
                  (_ga = (_fa = (_ea = (_da = variantRecap.recaps.sign) == null ? void 0 : _da.border) == null ? void 0 : _ea.value) == null ? void 0 : _fa.face1) == null ? void 0 : _ga.color,
                  " "
                ] })
              ] }),
              ((_ja = (_ia = (_ha = variantRecap.recaps.sign) == null ? void 0 : _ha.border) == null ? void 0 : _ia.value) == null ? void 0 : _ja.face2) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontWeight: "bold-300", children: [
                  (_la = (_ka = variantRecap.recaps.sign) == null ? void 0 : _ka.border) == null ? void 0 : _la.label,
                  "-",
                  (_na = (_ma = variantRecap.recaps) == null ? void 0 : _ma.faces) == null ? void 0 : _na.face2,
                  ": "
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { children: [
                  " ",
                  (_ra = (_qa = (_pa = (_oa = variantRecap.recaps.sign) == null ? void 0 : _oa.border) == null ? void 0 : _pa.value) == null ? void 0 : _qa.face2) == null ? void 0 : _ra.type,
                  ", ",
                  (_va = (_ua = (_ta = (_sa = variantRecap.recaps.sign) == null ? void 0 : _sa.border) == null ? void 0 : _ta.value) == null ? void 0 : _ua.face2) == null ? void 0 : _va.color,
                  " "
                ] })
              ] }),
              !((_ya = (_xa = (_wa = variantRecap.recaps.sign) == null ? void 0 : _wa.color) == null ? void 0 : _xa.value) == null ? void 0 : _ya.face1) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontWeight: "bold-300", children: [
                  (_Aa = (_za = variantRecap.recaps.sign) == null ? void 0 : _za.color) == null ? void 0 : _Aa.label,
                  " : "
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Text2, { children: (_Da = (_Ca = (_Ba = variantRecap.recaps.sign) == null ? void 0 : _Ba.color) == null ? void 0 : _Ca.value) == null ? void 0 : _Da.name })
              ] }),
              ((_Ga = (_Fa = (_Ea = variantRecap.recaps.sign) == null ? void 0 : _Ea.color) == null ? void 0 : _Fa.value) == null ? void 0 : _Ga.face1) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontWeight: "bold-300", children: [
                  (_Ia = (_Ha = variantRecap.recaps.sign) == null ? void 0 : _Ha.color) == null ? void 0 : _Ia.label,
                  "-",
                  (_Ka = (_Ja = variantRecap.recaps) == null ? void 0 : _Ja.faces) == null ? void 0 : _Ka.face1,
                  ": "
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Text2, { children: (_Oa = (_Na = (_Ma = (_La = variantRecap.recaps.sign) == null ? void 0 : _La.color) == null ? void 0 : _Ma.value) == null ? void 0 : _Na.face1) == null ? void 0 : _Oa.name })
              ] }),
              ((_Ra = (_Qa = (_Pa = variantRecap.recaps.sign) == null ? void 0 : _Pa.color) == null ? void 0 : _Qa.value) == null ? void 0 : _Ra.face2) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontWeight: "bold-300", children: [
                  (_Ta = (_Sa = variantRecap.recaps.sign) == null ? void 0 : _Sa.color) == null ? void 0 : _Ta.label,
                  "-",
                  (_Va = (_Ua = variantRecap.recaps) == null ? void 0 : _Ua.faces) == null ? void 0 : _Va.face2,
                  ": "
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Text2, { children: (_Za = (_Ya = (_Xa = (_Wa = variantRecap.recaps.sign) == null ? void 0 : _Wa.color) == null ? void 0 : _Xa.value) == null ? void 0 : _Ya.face2) == null ? void 0 : _Za.name })
              ] }),
              !((_$a = (__a = variantRecap.recaps) == null ? void 0 : __a.faces) == null ? void 0 : _$a.face1) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontWeight: "bold-300", children: [
                  (_bb = (_ab = variantRecap.recaps) == null ? void 0 : _ab.texts) == null ? void 0 : _bb.label,
                  " : "
                ] }),
                (_cb = variantRecap.recaps.texts.value) == null ? void 0 : _cb.map((text) => {
                  var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o2, _p2, _q2, _r2, _s2, _t2, _u2, _v2, _w2, _x2;
                  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Text2, { children: text == null ? void 0 : text.textContent }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontStyle: "italic", fontWeight: "bold-200", children: [
                      " Font: ",
                      text == null ? void 0 : text.fontFamily,
                      "   "
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontStyle: "italic", fontWeight: "bold-200", children: [
                      "  ",
                      (_b2 = (_a2 = text == null ? void 0 : text.values) == null ? void 0 : _a2.width) == null ? void 0 : _b2.label,
                      ": ",
                      (_d2 = (_c2 = text == null ? void 0 : text.values) == null ? void 0 : _c2.width) == null ? void 0 : _d2.value,
                      "  "
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontStyle: "italic", fontWeight: "bold-200", children: [
                      "  ",
                      (_f2 = (_e2 = text == null ? void 0 : text.values) == null ? void 0 : _e2.height) == null ? void 0 : _f2.label,
                      ": ",
                      (_h2 = (_g2 = text == null ? void 0 : text.values) == null ? void 0 : _g2.height) == null ? void 0 : _h2.value,
                      "  "
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontStyle: "italic", fontWeight: "bold-200", children: [
                      "  ",
                      (_j2 = (_i2 = text == null ? void 0 : text.values) == null ? void 0 : _i2.left) == null ? void 0 : _j2.label,
                      ": ",
                      (_l2 = (_k2 = text == null ? void 0 : text.values) == null ? void 0 : _k2.left) == null ? void 0 : _l2.value,
                      " "
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontStyle: "italic", fontWeight: "bold-200", children: [
                      "  ",
                      (_n2 = (_m2 = text == null ? void 0 : text.values) == null ? void 0 : _m2.top) == null ? void 0 : _n2.label,
                      ": ",
                      (_p2 = (_o2 = text == null ? void 0 : text.values) == null ? void 0 : _o2.top) == null ? void 0 : _p2.value,
                      "  "
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontStyle: "italic", fontWeight: "bold-200", children: [
                      "  ",
                      (_r2 = (_q2 = text == null ? void 0 : text.values) == null ? void 0 : _q2.right) == null ? void 0 : _r2.label,
                      ": ",
                      (_t2 = (_s2 = text == null ? void 0 : text.values) == null ? void 0 : _s2.right) == null ? void 0 : _t2.value,
                      " "
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontStyle: "italic", fontWeight: "bold-200", children: [
                      "   ",
                      (_v2 = (_u2 = text == null ? void 0 : text.values) == null ? void 0 : _u2.bottom) == null ? void 0 : _v2.label,
                      ": ",
                      (_x2 = (_w2 = text == null ? void 0 : text.values) == null ? void 0 : _w2.bottom) == null ? void 0 : _x2.value,
                      "  "
                    ] })
                  ] });
                })
              ] }),
              ((_eb = (_db = variantRecap.recaps) == null ? void 0 : _db.faces) == null ? void 0 : _eb.face1) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontWeight: "bold-300", children: [
                  (_gb = (_fb = variantRecap.recaps) == null ? void 0 : _fb.texts) == null ? void 0 : _gb.label,
                  "-",
                  (_ib = (_hb = variantRecap.recaps) == null ? void 0 : _hb.faces) == null ? void 0 : _ib.face1,
                  " : "
                ] }),
                (_mb = (_lb = (_kb = (_jb = variantRecap.recaps) == null ? void 0 : _jb.texts) == null ? void 0 : _kb.value) == null ? void 0 : _lb.face1) == null ? void 0 : _mb.map((text) => {
                  var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o2, _p2, _q2, _r2, _s2, _t2, _u2, _v2, _w2, _x2;
                  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Text2, { children: text == null ? void 0 : text.textContent }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontStyle: "italic", fontWeight: "bold-200", children: [
                      " Font: ",
                      text == null ? void 0 : text.fontFamily,
                      "   "
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontStyle: "italic", fontWeight: "bold-200", children: [
                      "  ",
                      (_b2 = (_a2 = text == null ? void 0 : text.values) == null ? void 0 : _a2.width) == null ? void 0 : _b2.label,
                      ": ",
                      (_d2 = (_c2 = text == null ? void 0 : text.values) == null ? void 0 : _c2.width) == null ? void 0 : _d2.value,
                      "  "
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontStyle: "italic", fontWeight: "bold-200", children: [
                      "  ",
                      (_f2 = (_e2 = text == null ? void 0 : text.values) == null ? void 0 : _e2.height) == null ? void 0 : _f2.label,
                      ": ",
                      (_h2 = (_g2 = text == null ? void 0 : text.values) == null ? void 0 : _g2.height) == null ? void 0 : _h2.value,
                      "  "
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontStyle: "italic", fontWeight: "bold-200", children: [
                      "  ",
                      (_j2 = (_i2 = text == null ? void 0 : text.values) == null ? void 0 : _i2.left) == null ? void 0 : _j2.label,
                      ": ",
                      (_l2 = (_k2 = text == null ? void 0 : text.values) == null ? void 0 : _k2.left) == null ? void 0 : _l2.value,
                      " "
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontStyle: "italic", fontWeight: "bold-200", children: [
                      "  ",
                      (_n2 = (_m2 = text == null ? void 0 : text.values) == null ? void 0 : _m2.top) == null ? void 0 : _n2.label,
                      ": ",
                      (_p2 = (_o2 = text == null ? void 0 : text.values) == null ? void 0 : _o2.top) == null ? void 0 : _p2.value,
                      "  "
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontStyle: "italic", fontWeight: "bold-200", children: [
                      "  ",
                      (_r2 = (_q2 = text == null ? void 0 : text.values) == null ? void 0 : _q2.right) == null ? void 0 : _r2.label,
                      ": ",
                      (_t2 = (_s2 = text == null ? void 0 : text.values) == null ? void 0 : _s2.right) == null ? void 0 : _t2.value,
                      " "
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontStyle: "italic", fontWeight: "bold-200", children: [
                      "   ",
                      (_v2 = (_u2 = text == null ? void 0 : text.values) == null ? void 0 : _u2.bottom) == null ? void 0 : _v2.label,
                      ": ",
                      (_x2 = (_w2 = text == null ? void 0 : text.values) == null ? void 0 : _w2.bottom) == null ? void 0 : _x2.value,
                      "  "
                    ] })
                  ] });
                })
              ] }),
              ((_ob = (_nb = variantRecap.recaps) == null ? void 0 : _nb.faces) == null ? void 0 : _ob.face2) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontWeight: "bold-300", children: [
                  (_qb = (_pb = variantRecap.recaps) == null ? void 0 : _pb.texts) == null ? void 0 : _qb.label,
                  "-",
                  (_sb = (_rb = variantRecap.recaps) == null ? void 0 : _rb.faces) == null ? void 0 : _sb.face2,
                  " : "
                ] }),
                (_vb = (_ub = (_tb = variantRecap.recaps.texts) == null ? void 0 : _tb.value) == null ? void 0 : _ub.face2) == null ? void 0 : _vb.map((text) => {
                  var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o2, _p2, _q2, _r2, _s2, _t2, _u2, _v2, _w2, _x2;
                  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Text2, { children: text == null ? void 0 : text.textContent }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontStyle: "italic", fontWeight: "bold-200", children: [
                      " Font: ",
                      text == null ? void 0 : text.fontFamily,
                      "   "
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontStyle: "italic", fontWeight: "bold-200", children: [
                      "  ",
                      (_b2 = (_a2 = text == null ? void 0 : text.values) == null ? void 0 : _a2.width) == null ? void 0 : _b2.label,
                      ": ",
                      (_d2 = (_c2 = text == null ? void 0 : text.values) == null ? void 0 : _c2.width) == null ? void 0 : _d2.value,
                      "  "
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontStyle: "italic", fontWeight: "bold-200", children: [
                      "  ",
                      (_f2 = (_e2 = text == null ? void 0 : text.values) == null ? void 0 : _e2.height) == null ? void 0 : _f2.label,
                      ": ",
                      (_h2 = (_g2 = text == null ? void 0 : text.values) == null ? void 0 : _g2.height) == null ? void 0 : _h2.value,
                      "  "
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontStyle: "italic", fontWeight: "bold-200", children: [
                      "  ",
                      (_j2 = (_i2 = text == null ? void 0 : text.values) == null ? void 0 : _i2.left) == null ? void 0 : _j2.label,
                      ": ",
                      (_l2 = (_k2 = text == null ? void 0 : text.values) == null ? void 0 : _k2.left) == null ? void 0 : _l2.value,
                      " "
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontStyle: "italic", fontWeight: "bold-200", children: [
                      "  ",
                      (_n2 = (_m2 = text == null ? void 0 : text.values) == null ? void 0 : _m2.top) == null ? void 0 : _n2.label,
                      ": ",
                      (_p2 = (_o2 = text == null ? void 0 : text.values) == null ? void 0 : _o2.top) == null ? void 0 : _p2.value,
                      "  "
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontStyle: "italic", fontWeight: "bold-200", children: [
                      "  ",
                      (_r2 = (_q2 = text == null ? void 0 : text.values) == null ? void 0 : _q2.right) == null ? void 0 : _r2.label,
                      ": ",
                      (_t2 = (_s2 = text == null ? void 0 : text.values) == null ? void 0 : _s2.right) == null ? void 0 : _t2.value,
                      " "
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontStyle: "italic", fontWeight: "bold-200", children: [
                      "   ",
                      (_v2 = (_u2 = text == null ? void 0 : text.values) == null ? void 0 : _u2.bottom) == null ? void 0 : _v2.label,
                      ": ",
                      (_x2 = (_w2 = text == null ? void 0 : text.values) == null ? void 0 : _w2.bottom) == null ? void 0 : _x2.value,
                      "  "
                    ] })
                  ] });
                })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(InlineStack2, { inlineAlignment: "space-between", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                Link2,
                {
                  href: (_xb = (_wb = variantRecap.recaps) == null ? void 0 : _wb.filesUrl) == null ? void 0 : _xb.zipUrl,
                  children: i18n.translate("bownloadBtn")
                }
              ) })
            ] })
          ] });
        }) })
      ] }) })
    );
  }
})();
//# sourceMappingURL=aso-admin-order-detail.js.map
