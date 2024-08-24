(()=>{var rR=Object.create;var wd=Object.defineProperty,iR=Object.defineProperties,uR=Object.getOwnPropertyDescriptor,lR=Object.getOwnPropertyDescriptors,oR=Object.getOwnPropertyNames,Rs=Object.getOwnPropertySymbols,sR=Object.getPrototypeOf,Yd=Object.prototype.hasOwnProperty,Wh=Object.prototype.propertyIsEnumerable;var Kh=(p,c,y)=>c in p?wd(p,c,{enumerable:!0,configurable:!0,writable:!0,value:y}):p[c]=y,Mr=(p,c)=>{for(var y in c||(c={}))Yd.call(c,y)&&Kh(p,y,c[y]);if(Rs)for(var y of Rs(c))Wh.call(c,y)&&Kh(p,y,c[y]);return p},kh=(p,c)=>iR(p,lR(c));var Cs=(p,c)=>{var y={};for(var R in p)Yd.call(p,R)&&c.indexOf(R)<0&&(y[R]=p[R]);if(p!=null&&Rs)for(var R of Rs(p))c.indexOf(R)<0&&Wh.call(p,R)&&(y[R]=p[R]);return y};var bi=(p,c)=>()=>(c||p((c={exports:{}}).exports,c),c.exports);var cR=(p,c,y,R)=>{if(c&&typeof c=="object"||typeof c=="function")for(let g of oR(c))!Yd.call(p,g)&&g!==y&&wd(p,g,{get:()=>c[g],enumerable:!(R=uR(c,g))||R.enumerable});return p};var Ca=(p,c,y)=>(y=p!=null?rR(sR(p)):{},cR(c||!p||!p.__esModule?wd(y,"default",{value:p,enumerable:!0}):y,p));var Uu=(p,c,y)=>new Promise((R,g)=>{var A=j=>{try{V(y.next(j))}catch(h){g(h)}},_=j=>{try{V(y.throw(j))}catch(h){g(h)}},V=j=>j.done?R(j.value):Promise.resolve(j.value).then(A,_);V((y=y.apply(p,c)).next())});var ry=bi((Ye,Ns)=>{"use strict";(function(){"use strict";typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!="undefined"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);var p="18.2.0",c=Symbol.for("react.element"),y=Symbol.for("react.portal"),R=Symbol.for("react.fragment"),g=Symbol.for("react.strict_mode"),A=Symbol.for("react.profiler"),_=Symbol.for("react.provider"),V=Symbol.for("react.context"),j=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),Y=Symbol.for("react.suspense_list"),K=Symbol.for("react.memo"),ye=Symbol.for("react.lazy"),nt=Symbol.for("react.offscreen"),Pe=Symbol.iterator,qe="@@iterator";function Ke(l){if(l===null||typeof l!="object")return null;var v=Pe&&l[Pe]||l[qe];return typeof v=="function"?v:null}var Re={current:null},_e={transition:null},ot={current:null,isBatchingLegacy:!1,didScheduleLegacyUpdate:!1},gt={current:null},Cn={},Ue=null;function ge(l){Ue=l}Cn.setExtraStackFrame=function(l){Ue=l},Cn.getCurrentStack=null,Cn.getStackAddendum=function(){var l="";Ue&&(l+=Ue);var v=Cn.getCurrentStack;return v&&(l+=v()||""),l};var It=!1,oe=!1,Me=!1,te=!1,be=!1,xe={ReactCurrentDispatcher:Re,ReactCurrentBatchConfig:_e,ReactCurrentOwner:gt};xe.ReactDebugCurrentFrame=Cn,xe.ReactCurrentActQueue=ot;function st(l){{for(var v=arguments.length,T=new Array(v>1?v-1:0),D=1;D<v;D++)T[D-1]=arguments[D];Et("warn",l,T)}}function ue(l){{for(var v=arguments.length,T=new Array(v>1?v-1:0),D=1;D<v;D++)T[D-1]=arguments[D];Et("error",l,T)}}function Et(l,v,T){{var D=xe.ReactDebugCurrentFrame,w=D.getStackAddendum();w!==""&&(v+="%s",T=T.concat([w]));var ce=T.map(function(I){return String(I)});ce.unshift("Warning: "+v),Function.prototype.apply.call(console[l],console,ce)}}var ze={};function Tt(l,v){{var T=l.constructor,D=T&&(T.displayName||T.name)||"ReactClass",w=D+"."+v;if(ze[w])return;ue("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",v,D),ze[w]=!0}}var Fe={isMounted:function(l){return!1},enqueueForceUpdate:function(l,v,T){Tt(l,"forceUpdate")},enqueueReplaceState:function(l,v,T,D){Tt(l,"replaceState")},enqueueSetState:function(l,v,T,D){Tt(l,"setState")}},lt=Object.assign,Ae={};Object.freeze(Ae);function Rt(l,v,T){this.props=l,this.context=v,this.refs=Ae,this.updater=T||Fe}Rt.prototype.isReactComponent={},Rt.prototype.setState=function(l,v){if(typeof l!="object"&&typeof l!="function"&&l!=null)throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,l,v,"setState")},Rt.prototype.forceUpdate=function(l){this.updater.enqueueForceUpdate(this,l,"forceUpdate")};{var jt={isMounted:["isMounted","Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],replaceState:["replaceState","Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]},jn=function(l,v){Object.defineProperty(Rt.prototype,l,{get:function(){st("%s(...) is deprecated in plain JavaScript React classes. %s",v[0],v[1])}})};for(var bt in jt)jt.hasOwnProperty(bt)&&jn(bt,jt[bt])}function $t(){}$t.prototype=Rt.prototype;function at(l,v,T){this.props=l,this.context=v,this.refs=Ae,this.updater=T||Fe}var Ft=at.prototype=new $t;Ft.constructor=at,lt(Ft,Rt.prototype),Ft.isPureReactComponent=!0;function Xn(){var l={current:null};return Object.seal(l),l}var Fn=Array.isArray;function ln(l){return Fn(l)}function on(l){{var v=typeof Symbol=="function"&&Symbol.toStringTag,T=v&&l[Symbol.toStringTag]||l.constructor.name||"Object";return T}}function Bn(l){try{return xn(l),!1}catch(v){return!0}}function xn(l){return""+l}function Ut(l){if(Bn(l))return ue("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",on(l)),xn(l)}function sn(l,v,T){var D=l.displayName;if(D)return D;var w=v.displayName||v.name||"";return w!==""?T+"("+w+")":T}function Dn(l){return l.displayName||"Context"}function St(l){if(l==null)return null;if(typeof l.tag=="number"&&ue("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof l=="function")return l.displayName||l.name||null;if(typeof l=="string")return l;switch(l){case R:return"Fragment";case y:return"Portal";case A:return"Profiler";case g:return"StrictMode";case h:return"Suspense";case Y:return"SuspenseList"}if(typeof l=="object")switch(l.$$typeof){case V:var v=l;return Dn(v)+".Consumer";case _:var T=l;return Dn(T._context)+".Provider";case j:return sn(l,l.render,"ForwardRef");case K:var D=l.displayName||null;return D!==null?D:St(l.type)||"Memo";case ye:{var w=l,ce=w._payload,I=w._init;try{return St(I(ce))}catch(Ee){return null}}}return null}var Mt=Object.prototype.hasOwnProperty,Jn={key:!0,ref:!0,__self:!0,__source:!0},Vn,rt,_n;_n={};function xa(l){if(Mt.call(l,"ref")){var v=Object.getOwnPropertyDescriptor(l,"ref").get;if(v&&v.isReactWarning)return!1}return l.ref!==void 0}function ua(l){if(Mt.call(l,"key")){var v=Object.getOwnPropertyDescriptor(l,"key").get;if(v&&v.isReactWarning)return!1}return l.key!==void 0}function la(l,v){var T=function(){Vn||(Vn=!0,ue("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",v))};T.isReactWarning=!0,Object.defineProperty(l,"key",{get:T,configurable:!0})}function On(l,v){var T=function(){rt||(rt=!0,ue("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",v))};T.isReactWarning=!0,Object.defineProperty(l,"ref",{get:T,configurable:!0})}function Qa(l){if(typeof l.ref=="string"&&gt.current&&l.__self&&gt.current.stateNode!==l.__self){var v=St(gt.current.type);_n[v]||(ue('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',v,l.ref),_n[v]=!0)}}var Zn=function(l,v,T,D,w,ce,I){var Ee={$$typeof:c,type:l,key:v,ref:T,props:I,_owner:ce};return Ee._store={},Object.defineProperty(Ee._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(Ee,"_self",{configurable:!1,enumerable:!1,writable:!1,value:D}),Object.defineProperty(Ee,"_source",{configurable:!1,enumerable:!1,writable:!1,value:w}),Object.freeze&&(Object.freeze(Ee.props),Object.freeze(Ee)),Ee};function Ga(l,v,T){var D,w={},ce=null,I=null,Ee=null,Be=null;if(v!=null){xa(v)&&(I=v.ref,Qa(v)),ua(v)&&(Ut(v.key),ce=""+v.key),Ee=v.__self===void 0?null:v.__self,Be=v.__source===void 0?null:v.__source;for(D in v)Mt.call(v,D)&&!Jn.hasOwnProperty(D)&&(w[D]=v[D])}var $e=arguments.length-2;if($e===1)w.children=T;else if($e>1){for(var ft=Array($e),mt=0;mt<$e;mt++)ft[mt]=arguments[mt+2];Object.freeze&&Object.freeze(ft),w.children=ft}if(l&&l.defaultProps){var yt=l.defaultProps;for(D in yt)w[D]===void 0&&(w[D]=yt[D])}if(ce||I){var Ot=typeof l=="function"?l.displayName||l.name||"Unknown":l;ce&&la(w,Ot),I&&On(w,Ot)}return Zn(l,ce,I,Ee,Be,gt.current,w)}function q(l,v){var T=Zn(l.type,v,l.ref,l._self,l._source,l._owner,l.props);return T}function re(l,v,T){if(l==null)throw new Error("React.cloneElement(...): The argument must be a React element, but you passed "+l+".");var D,w=lt({},l.props),ce=l.key,I=l.ref,Ee=l._self,Be=l._source,$e=l._owner;if(v!=null){xa(v)&&(I=v.ref,$e=gt.current),ua(v)&&(Ut(v.key),ce=""+v.key);var ft;l.type&&l.type.defaultProps&&(ft=l.type.defaultProps);for(D in v)Mt.call(v,D)&&!Jn.hasOwnProperty(D)&&(v[D]===void 0&&ft!==void 0?w[D]=ft[D]:w[D]=v[D])}var mt=arguments.length-2;if(mt===1)w.children=T;else if(mt>1){for(var yt=Array(mt),Ot=0;Ot<mt;Ot++)yt[Ot]=arguments[Ot+2];w.children=yt}return Zn(l.type,ce,I,Ee,Be,$e,w)}function pe(l){return typeof l=="object"&&l!==null&&l.$$typeof===c}var ne=".",it=":";function zt(l){var v=/[=:]/g,T={"=":"=0",":":"=2"},D=l.replace(v,function(w){return T[w]});return"$"+D}var Z=!1,X=/\/+/g;function Ie(l){return l.replace(X,"$&/")}function Qe(l,v){return typeof l=="object"&&l!==null&&l.key!=null?(Ut(l.key),zt(""+l.key)):v.toString(36)}function se(l,v,T,D,w){var ce=typeof l;(ce==="undefined"||ce==="boolean")&&(l=null);var I=!1;if(l===null)I=!0;else switch(ce){case"string":case"number":I=!0;break;case"object":switch(l.$$typeof){case c:case y:I=!0}}if(I){var Ee=l,Be=w(Ee),$e=D===""?ne+Qe(Ee,0):D;if(ln(Be)){var ft="";$e!=null&&(ft=Ie($e)+"/"),se(Be,v,ft,"",function(Vs){return Vs})}else Be!=null&&(pe(Be)&&(Be.key&&(!Ee||Ee.key!==Be.key)&&Ut(Be.key),Be=q(Be,T+(Be.key&&(!Ee||Ee.key!==Be.key)?Ie(""+Be.key)+"/":"")+$e)),v.push(Be));return 1}var mt,yt,Ot=0,Vt=D===""?ne:D+it;if(ln(l))for(var ri=0;ri<l.length;ri++)mt=l[ri],yt=Vt+Qe(mt,ri),Ot+=se(mt,v,T,yt,w);else{var ju=Ke(l);if(typeof ju=="function"){var ql=l;ju===ql.entries&&(Z||st("Using Maps as children is not supported. Use an array of keyed ReactElements instead."),Z=!0);for(var Ii=ju.call(ql),Ql,Bs=0;!(Ql=Ii.next()).done;)mt=Ql.value,yt=Vt+Qe(mt,Bs++),Ot+=se(mt,v,T,yt,w)}else if(ce==="object"){var Gl=String(l);throw new Error("Objects are not valid as a React child (found: "+(Gl==="[object Object]"?"object with keys {"+Object.keys(l).join(", ")+"}":Gl)+"). If you meant to render a collection of children, use an array instead.")}}return Ot}function Bt(l,v,T){if(l==null)return l;var D=[],w=0;return se(l,D,"","",function(ce){return v.call(T,ce,w++)}),D}function In(l){var v=0;return Bt(l,function(){v++}),v}function Pa(l,v,T){Bt(l,function(){v.apply(this,arguments)},T)}function He(l){return Bt(l,function(v){return v})||[]}function cn(l){if(!pe(l))throw new Error("React.Children.only expected to receive a single React element child.");return l}function wn(l){var v={$$typeof:V,_currentValue:l,_currentValue2:l,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};v.Provider={$$typeof:_,_context:v};var T=!1,D=!1,w=!1;{var ce={$$typeof:V,_context:v};Object.defineProperties(ce,{Provider:{get:function(){return D||(D=!0,ue("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")),v.Provider},set:function(I){v.Provider=I}},_currentValue:{get:function(){return v._currentValue},set:function(I){v._currentValue=I}},_currentValue2:{get:function(){return v._currentValue2},set:function(I){v._currentValue2=I}},_threadCount:{get:function(){return v._threadCount},set:function(I){v._threadCount=I}},Consumer:{get:function(){return T||(T=!0,ue("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")),v.Consumer}},displayName:{get:function(){return v.displayName},set:function(I){w||(st("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.",I),w=!0)}}}),v.Consumer=ce}return v._currentRenderer=null,v._currentRenderer2=null,v}var Gt=-1,At=0,fn=1,$n=2;function Da(l){if(l._status===Gt){var v=l._result,T=v();if(T.then(function(ce){if(l._status===At||l._status===Gt){var I=l;I._status=fn,I._result=ce}},function(ce){if(l._status===At||l._status===Gt){var I=l;I._status=$n,I._result=ce}}),l._status===Gt){var D=l;D._status=At,D._result=T}}if(l._status===fn){var w=l._result;return w===void 0&&ue(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,w),"default"in w||ue(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,w),w.default}else throw l._result}function Xr(l){var v={_status:Gt,_result:l},T={$$typeof:ye,_payload:v,_init:Da};{var D,w;Object.defineProperties(T,{defaultProps:{configurable:!0,get:function(){return D},set:function(ce){ue("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."),D=ce,Object.defineProperty(T,"defaultProps",{enumerable:!0})}},propTypes:{configurable:!0,get:function(){return w},set:function(ce){ue("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."),w=ce,Object.defineProperty(T,"propTypes",{enumerable:!0})}}})}return T}function Jr(l){l!=null&&l.$$typeof===K?ue("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."):typeof l!="function"?ue("forwardRef requires a render function but was given %s.",l===null?"null":typeof l):l.length!==0&&l.length!==2&&ue("forwardRef render functions accept exactly two parameters: props and ref. %s",l.length===1?"Did you forget to use the ref parameter?":"Any additional parameter will be undefined."),l!=null&&(l.defaultProps!=null||l.propTypes!=null)&&ue("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");var v={$$typeof:j,render:l};{var T;Object.defineProperty(v,"displayName",{enumerable:!1,configurable:!0,get:function(){return T},set:function(D){T=D,!l.name&&!l.displayName&&(l.displayName=D)}})}return v}var oa;oa=Symbol.for("react.module.reference");function Ct(l){return!!(typeof l=="string"||typeof l=="function"||l===R||l===A||be||l===g||l===h||l===Y||te||l===nt||It||oe||Me||typeof l=="object"&&l!==null&&(l.$$typeof===ye||l.$$typeof===K||l.$$typeof===_||l.$$typeof===V||l.$$typeof===j||l.$$typeof===oa||l.getModuleId!==void 0))}function d(l,v){Ct(l)||ue("memo: The first argument must be a component. Instead received: %s",l===null?"null":typeof l);var T={$$typeof:K,type:l,compare:v===void 0?null:v};{var D;Object.defineProperty(T,"displayName",{enumerable:!1,configurable:!0,get:function(){return D},set:function(w){D=w,!l.name&&!l.displayName&&(l.displayName=w)}})}return T}function U(){var l=Re.current;return l===null&&ue(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`),l}function Q(l){var v=U();if(l._context!==void 0){var T=l._context;T.Consumer===l?ue("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?"):T.Provider===l&&ue("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?")}return v.useContext(l)}function ae(l){var v=U();return v.useState(l)}function Le(l,v,T){var D=U();return D.useReducer(l,v,T)}function Oe(l){var v=U();return v.useRef(l)}function Ce(l,v){var T=U();return T.useEffect(l,v)}function Te(l,v){var T=U();return T.useInsertionEffect(l,v)}function pt(l,v){var T=U();return T.useLayoutEffect(l,v)}function ke(l,v){var T=U();return T.useCallback(l,v)}function Xe(l,v){var T=U();return T.useMemo(l,v)}function ct(l,v,T){var D=U();return D.useImperativeHandle(l,v,T)}function sa(l,v){{var T=U();return T.useDebugValue(l,v)}}function _a(){var l=U();return l.useTransition()}function Nn(l){var v=U();return v.useDeferredValue(l)}function Wi(){var l=U();return l.useId()}function Ti(l,v,T){var D=U();return D.useSyncExternalStore(l,v,T)}var Ka=0,Hr,Zr,Ri,Ir,Ci,Pt,Lr;function xi(){}xi.__reactDisabledLog=!0;function ki(){{if(Ka===0){Hr=console.log,Zr=console.info,Ri=console.warn,Ir=console.error,Ci=console.group,Pt=console.groupCollapsed,Lr=console.groupEnd;var l={configurable:!0,enumerable:!0,value:xi,writable:!0};Object.defineProperties(console,{info:l,log:l,warn:l,error:l,group:l,groupCollapsed:l,groupEnd:l})}Ka++}}function Xi(){{if(Ka--,Ka===0){var l={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:lt({},l,{value:Hr}),info:lt({},l,{value:Zr}),warn:lt({},l,{value:Ri}),error:lt({},l,{value:Ir}),group:lt({},l,{value:Ci}),groupCollapsed:lt({},l,{value:Pt}),groupEnd:lt({},l,{value:Lr})})}Ka<0&&ue("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var $r=xe.ReactCurrentDispatcher,ei;function Wa(l,v,T){{if(ei===void 0)try{throw Error()}catch(w){var D=w.stack.trim().match(/\n( *(at )?)/);ei=D&&D[1]||""}return`
`+ei+l}}var jr=!1,cr;{var ti=typeof WeakMap=="function"?WeakMap:Map;cr=new ti}function ni(l,v){if(!l||jr)return"";{var T=cr.get(l);if(T!==void 0)return T}var D;jr=!0;var w=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var ce;ce=$r.current,$r.current=null,ki();try{if(v){var I=function(){throw Error()};if(Object.defineProperty(I.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(I,[])}catch(Vt){D=Vt}Reflect.construct(l,[],I)}else{try{I.call()}catch(Vt){D=Vt}l.call(I.prototype)}}else{try{throw Error()}catch(Vt){D=Vt}l()}}catch(Vt){if(Vt&&D&&typeof Vt.stack=="string"){for(var Ee=Vt.stack.split(`
`),Be=D.stack.split(`
`),$e=Ee.length-1,ft=Be.length-1;$e>=1&&ft>=0&&Ee[$e]!==Be[ft];)ft--;for(;$e>=1&&ft>=0;$e--,ft--)if(Ee[$e]!==Be[ft]){if($e!==1||ft!==1)do if($e--,ft--,ft<0||Ee[$e]!==Be[ft]){var mt=`
`+Ee[$e].replace(" at new "," at ");return l.displayName&&mt.includes("<anonymous>")&&(mt=mt.replace("<anonymous>",l.displayName)),typeof l=="function"&&cr.set(l,mt),mt}while($e>=1&&ft>=0);break}}}finally{jr=!1,$r.current=ce,Xi(),Error.prepareStackTrace=w}var yt=l?l.displayName||l.name:"",Ot=yt?Wa(yt):"";return typeof l=="function"&&cr.set(l,Ot),Ot}function Di(l,v,T){return ni(l,!1)}function Ji(l){var v=l.prototype;return!!(v&&v.isReactComponent)}function ka(l,v,T){if(l==null)return"";if(typeof l=="function")return ni(l,Ji(l));if(typeof l=="string")return Wa(l);switch(l){case h:return Wa("Suspense");case Y:return Wa("SuspenseList")}if(typeof l=="object")switch(l.$$typeof){case j:return Di(l.render);case K:return ka(l.type,v,T);case ye:{var D=l,w=D._payload,ce=D._init;try{return ka(ce(w),v,T)}catch(I){}}}return""}var fr={},_i=xe.ReactDebugCurrentFrame;function Ht(l){if(l){var v=l._owner,T=ka(l.type,l._source,v?v.type:null);_i.setExtraStackFrame(T)}else _i.setExtraStackFrame(null)}function Fr(l,v,T,D,w){{var ce=Function.call.bind(Mt);for(var I in l)if(ce(l,I)){var Ee=void 0;try{if(typeof l[I]!="function"){var Be=Error((D||"React class")+": "+T+" type `"+I+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof l[I]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw Be.name="Invariant Violation",Be}Ee=l[I](v,I,D,T,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch($e){Ee=$e}Ee&&!(Ee instanceof Error)&&(Ht(w),ue("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",D||"React class",T,I,typeof Ee),Ht(null)),Ee instanceof Error&&!(Ee.message in fr)&&(fr[Ee.message]=!0,Ht(w),ue("Failed %s type: %s",T,Ee.message),Ht(null))}}}function _t(l){if(l){var v=l._owner,T=ka(l.type,l._source,v?v.type:null);ge(T)}else ge(null)}var ai;ai=!1;function Zi(){if(gt.current){var l=St(gt.current.type);if(l)return`

Check the render method of \``+l+"`."}return""}function Lu(l){if(l!==void 0){var v=l.fileName.replace(/^.*[\\\/]/,""),T=l.lineNumber;return`

Check your code at `+v+":"+T+"."}return""}function x(l){return l!=null?Lu(l.__source):""}var Oa={};function Xa(l){var v=Zi();if(!v){var T=typeof l=="string"?l:l.displayName||l.name;T&&(v=`

Check the top-level render call using <`+T+">.")}return v}function ca(l,v){if(!(!l._store||l._store.validated||l.key!=null)){l._store.validated=!0;var T=Xa(v);if(!Oa[T]){Oa[T]=!0;var D="";l&&l._owner&&l._owner!==gt.current&&(D=" It was passed a child from "+St(l._owner.type)+"."),_t(l),ue('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',T,D),_t(null)}}}function fa(l,v){if(typeof l=="object"){if(ln(l))for(var T=0;T<l.length;T++){var D=l[T];pe(D)&&ca(D,v)}else if(pe(l))l._store&&(l._store.validated=!0);else if(l){var w=Ke(l);if(typeof w=="function"&&w!==l.entries)for(var ce=w.call(l),I;!(I=ce.next()).done;)pe(I.value)&&ca(I.value,v)}}}function da(l){{var v=l.type;if(v==null||typeof v=="string")return;var T;if(typeof v=="function")T=v.propTypes;else if(typeof v=="object"&&(v.$$typeof===j||v.$$typeof===K))T=v.propTypes;else return;if(T){var D=St(v);Fr(T,l.props,"prop",D,l)}else if(v.PropTypes!==void 0&&!ai){ai=!0;var w=St(v);ue("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",w||"Unknown")}typeof v.getDefaultProps=="function"&&!v.getDefaultProps.isReactClassApproved&&ue("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.")}}function Na(l){{for(var v=Object.keys(l.props),T=0;T<v.length;T++){var D=v[T];if(D!=="children"&&D!=="key"){_t(l),ue("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",D),_t(null);break}}l.ref!==null&&(_t(l),ue("Invalid attribute `ref` supplied to `React.Fragment`."),_t(null))}}function en(l,v,T){var D=Ct(l);if(!D){var w="";(l===void 0||typeof l=="object"&&l!==null&&Object.keys(l).length===0)&&(w+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var ce=x(v);ce?w+=ce:w+=Zi();var I;l===null?I="null":ln(l)?I="array":l!==void 0&&l.$$typeof===c?(I="<"+(St(l.type)||"Unknown")+" />",w=" Did you accidentally export a JSX literal instead of a component?"):I=typeof l,ue("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",I,w)}var Ee=Ga.apply(this,arguments);if(Ee==null)return Ee;if(D)for(var Be=2;Be<arguments.length;Be++)fa(arguments[Be],l);return l===R?Na(Ee):da(Ee),Ee}var va=!1;function Ua(l){var v=en.bind(null,l);return v.type=l,va||(va=!0,st("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")),Object.defineProperty(v,"type",{enumerable:!1,get:function(){return st("Factory.type is deprecated. Access the class directly before passing it to createFactory."),Object.defineProperty(this,"type",{value:l}),l}}),v}function Ma(l,v,T){for(var D=re.apply(this,arguments),w=2;w<arguments.length;w++)fa(arguments[w],D.type);return da(D),D}function Un(l,v){var T=_e.transition;_e.transition={};var D=_e.transition;_e.transition._updatedFibers=new Set;try{l()}finally{if(_e.transition=T,T===null&&D._updatedFibers){var w=D._updatedFibers.size;w>10&&st("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."),D._updatedFibers.clear()}}}var pa=!1,Yn=null;function za(l){if(Yn===null)try{var v=("require"+Math.random()).slice(0,7),T=Ns&&Ns[v];Yn=T.call(Ns,"timers").setImmediate}catch(D){Yn=function(w){pa===!1&&(pa=!0,typeof MessageChannel=="undefined"&&ue("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));var ce=new MessageChannel;ce.port1.onmessage=w,ce.port2.postMessage(void 0)}}return Yn(l)}var dn=0,ma=!1;function Aa(l){{var v=dn;dn++,ot.current===null&&(ot.current=[]);var T=ot.isBatchingLegacy,D;try{if(ot.isBatchingLegacy=!0,D=l(),!T&&ot.didScheduleLegacyUpdate){var w=ot.current;w!==null&&(ot.didScheduleLegacyUpdate=!1,na(w))}}catch(yt){throw qn(v),yt}finally{ot.isBatchingLegacy=T}if(D!==null&&typeof D=="object"&&typeof D.then=="function"){var ce=D,I=!1,Ee={then:function(yt,Ot){I=!0,ce.then(function(Vt){qn(v),dn===0?ea(Vt,yt,Ot):yt(Vt)},function(Vt){qn(v),Ot(Vt)})}};return!ma&&typeof Promise!="undefined"&&Promise.resolve().then(function(){}).then(function(){I||(ma=!0,ue("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"))}),Ee}else{var Be=D;if(qn(v),dn===0){var $e=ot.current;$e!==null&&(na($e),ot.current=null);var ft={then:function(yt,Ot){ot.current===null?(ot.current=[],ea(Be,yt,Ot)):yt(Be)}};return ft}else{var mt={then:function(yt,Ot){yt(Be)}};return mt}}}}function qn(l){l!==dn-1&&ue("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "),dn=l}function ea(l,v,T){{var D=ot.current;if(D!==null)try{na(D),za(function(){D.length===0?(ot.current=null,v(l)):ea(l,v,T)})}catch(w){T(w)}else v(l)}}var ta=!1;function na(l){if(!ta){ta=!0;var v=0;try{for(;v<l.length;v++){var T=l[v];do T=T(!0);while(T!==null)}l.length=0}catch(D){throw l=l.slice(v+1),D}finally{ta=!1}}}var Ha=en,La=Ma,ha=Ua,Fs={map:Bt,forEach:Pa,count:In,toArray:He,only:cn};Ye.Children=Fs,Ye.Component=Rt,Ye.Fragment=R,Ye.Profiler=A,Ye.PureComponent=at,Ye.StrictMode=g,Ye.Suspense=h,Ye.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=xe,Ye.cloneElement=La,Ye.createContext=wn,Ye.createElement=Ha,Ye.createFactory=ha,Ye.createRef=Xn,Ye.forwardRef=Jr,Ye.isValidElement=pe,Ye.lazy=Xr,Ye.memo=d,Ye.startTransition=Un,Ye.unstable_act=Aa,Ye.useCallback=ke,Ye.useContext=Q,Ye.useDebugValue=sa,Ye.useDeferredValue=Nn,Ye.useEffect=Ce,Ye.useId=Wi,Ye.useImperativeHandle=ct,Ye.useInsertionEffect=Te,Ye.useLayoutEffect=pt,Ye.useMemo=Xe,Ye.useReducer=Le,Ye.useRef=Oe,Ye.useState=ae,Ye.useSyncExternalStore=Ti,Ye.useTransition=_a,Ye.version=p,typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!="undefined"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error)})()});var zr=bi((EC,iy)=>{"use strict";iy.exports=ry()});var uy=bi(vt=>{"use strict";(function(){"use strict";typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!="undefined"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);var p=!1,c=!1,y=5;function R(q,re){var pe=q.length;q.push(re),_(q,re,pe)}function g(q){return q.length===0?null:q[0]}function A(q){if(q.length===0)return null;var re=q[0],pe=q.pop();return pe!==re&&(q[0]=pe,V(q,pe,0)),re}function _(q,re,pe){for(var ne=pe;ne>0;){var it=ne-1>>>1,zt=q[it];if(j(zt,re)>0)q[it]=re,q[ne]=zt,ne=it;else return}}function V(q,re,pe){for(var ne=pe,it=q.length,zt=it>>>1;ne<zt;){var Z=(ne+1)*2-1,X=q[Z],Ie=Z+1,Qe=q[Ie];if(j(X,re)<0)Ie<it&&j(Qe,X)<0?(q[ne]=Qe,q[Ie]=re,ne=Ie):(q[ne]=X,q[Z]=re,ne=Z);else if(Ie<it&&j(Qe,re)<0)q[ne]=Qe,q[Ie]=re,ne=Ie;else return}}function j(q,re){var pe=q.sortIndex-re.sortIndex;return pe!==0?pe:q.id-re.id}var h=1,Y=2,K=3,ye=4,nt=5;function Pe(q,re){}var qe=typeof performance=="object"&&typeof performance.now=="function";if(qe){var Ke=performance;vt.unstable_now=function(){return Ke.now()}}else{var Re=Date,_e=Re.now();vt.unstable_now=function(){return Re.now()-_e}}var ot=1073741823,gt=-1,Cn=250,Ue=5e3,ge=1e4,It=ot,oe=[],Me=[],te=1,be=null,xe=K,st=!1,ue=!1,Et=!1,ze=typeof setTimeout=="function"?setTimeout:null,Tt=typeof clearTimeout=="function"?clearTimeout:null,Fe=typeof setImmediate!="undefined"?setImmediate:null,lt=typeof navigator!="undefined"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0?navigator.scheduling.isInputPending.bind(navigator.scheduling):null;function Ae(q){for(var re=g(Me);re!==null;){if(re.callback===null)A(Me);else if(re.startTime<=q)A(Me),re.sortIndex=re.expirationTime,R(oe,re);else return;re=g(Me)}}function Rt(q){if(Et=!1,Ae(q),!ue)if(g(oe)!==null)ue=!0,la(jt);else{var re=g(Me);re!==null&&On(Rt,re.startTime-q)}}function jt(q,re){ue=!1,Et&&(Et=!1,Qa()),st=!0;var pe=xe;try{if(c)try{return jn(q,re)}catch(it){if(be!==null){var ne=vt.unstable_now();be.isQueued=!1}throw it}else return jn(q,re)}finally{be=null,xe=pe,st=!1}}function jn(q,re){var pe=re;for(Ae(pe),be=g(oe);be!==null&&!p&&!(be.expirationTime>pe&&(!q||Mt()));){var ne=be.callback;if(typeof ne=="function"){be.callback=null,xe=be.priorityLevel;var it=be.expirationTime<=pe,zt=ne(it);pe=vt.unstable_now(),typeof zt=="function"?be.callback=zt:be===g(oe)&&A(oe),Ae(pe)}else A(oe);be=g(oe)}if(be!==null)return!0;var Z=g(Me);return Z!==null&&On(Rt,Z.startTime-pe),!1}function bt(q,re){switch(q){case h:case Y:case K:case ye:case nt:break;default:q=K}var pe=xe;xe=q;try{return re()}finally{xe=pe}}function $t(q){var re;switch(xe){case h:case Y:case K:re=K;break;default:re=xe;break}var pe=xe;xe=re;try{return q()}finally{xe=pe}}function at(q){var re=xe;return function(){var pe=xe;xe=re;try{return q.apply(this,arguments)}finally{xe=pe}}}function Ft(q,re,pe){var ne=vt.unstable_now(),it;if(typeof pe=="object"&&pe!==null){var zt=pe.delay;typeof zt=="number"&&zt>0?it=ne+zt:it=ne}else it=ne;var Z;switch(q){case h:Z=gt;break;case Y:Z=Cn;break;case nt:Z=It;break;case ye:Z=ge;break;case K:default:Z=Ue;break}var X=it+Z,Ie={id:te++,callback:re,priorityLevel:q,startTime:it,expirationTime:X,sortIndex:-1};return it>ne?(Ie.sortIndex=it,R(Me,Ie),g(oe)===null&&Ie===g(Me)&&(Et?Qa():Et=!0,On(Rt,it-ne))):(Ie.sortIndex=X,R(oe,Ie),!ue&&!st&&(ue=!0,la(jt))),Ie}function Xn(){}function Fn(){!ue&&!st&&(ue=!0,la(jt))}function ln(){return g(oe)}function on(q){q.callback=null}function Bn(){return xe}var xn=!1,Ut=null,sn=-1,Dn=y,St=-1;function Mt(){var q=vt.unstable_now()-St;return!(q<Dn)}function Jn(){}function Vn(q){if(q<0||q>125){console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");return}q>0?Dn=Math.floor(1e3/q):Dn=y}var rt=function(){if(Ut!==null){var q=vt.unstable_now();St=q;var re=!0,pe=!0;try{pe=Ut(re,q)}finally{pe?_n():(xn=!1,Ut=null)}}else xn=!1},_n;if(typeof Fe=="function")_n=function(){Fe(rt)};else if(typeof MessageChannel!="undefined"){var xa=new MessageChannel,ua=xa.port2;xa.port1.onmessage=rt,_n=function(){ua.postMessage(null)}}else _n=function(){ze(rt,0)};function la(q){Ut=q,xn||(xn=!0,_n())}function On(q,re){sn=ze(function(){q(vt.unstable_now())},re)}function Qa(){Tt(sn),sn=-1}var Zn=Jn,Ga=null;vt.unstable_IdlePriority=nt,vt.unstable_ImmediatePriority=h,vt.unstable_LowPriority=ye,vt.unstable_NormalPriority=K,vt.unstable_Profiling=Ga,vt.unstable_UserBlockingPriority=Y,vt.unstable_cancelCallback=on,vt.unstable_continueExecution=Fn,vt.unstable_forceFrameRate=Vn,vt.unstable_getCurrentPriorityLevel=Bn,vt.unstable_getFirstCallbackNode=ln,vt.unstable_next=$t,vt.unstable_pauseExecution=Xn,vt.unstable_requestPaint=Zn,vt.unstable_runWithPriority=bt,vt.unstable_scheduleCallback=Ft,vt.unstable_shouldYield=Mt,vt.unstable_wrapCallback=at,typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!="undefined"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error)})()});var oy=bi((RC,ly)=>{"use strict";ly.exports=uy()});var cy=bi((CC,sy)=>{"use strict";sy.exports=function(c){var y={},R=zr(),g=oy(),A=R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,_=!1;function V(e){_=e}function j(e){if(!_){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];Y("warn",e,n)}}function h(e){if(!_){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];Y("error",e,n)}}function Y(e,t,n){{var a=A.ReactDebugCurrentFrame,r=a.getStackAddendum();r!==""&&(t+="%s",n=n.concat([r]));var i=n.map(function(u){return String(u)});i.unshift("Warning: "+t),Function.prototype.apply.call(console[e],console,i)}}var K=Object.assign;function ye(e){return e._reactInternals}function nt(e,t){e._reactInternals=t}var Pe=!1,qe=!1,Ke=!1,Re=!1,_e=!1,ot=!0,gt=!0,Cn=!0,Ue=0,ge=1,It=2,oe=3,Me=4,te=5,be=6,xe=7,st=8,ue=9,Et=10,ze=11,Tt=12,Fe=13,lt=14,Ae=15,Rt=16,jt=17,jn=18,bt=19,$t=21,at=22,Ft=23,Xn=24,Fn=25,ln=Symbol.for("react.element"),on=Symbol.for("react.portal"),Bn=Symbol.for("react.fragment"),xn=Symbol.for("react.strict_mode"),Ut=Symbol.for("react.profiler"),sn=Symbol.for("react.provider"),Dn=Symbol.for("react.context"),St=Symbol.for("react.forward_ref"),Mt=Symbol.for("react.suspense"),Jn=Symbol.for("react.suspense_list"),Vn=Symbol.for("react.memo"),rt=Symbol.for("react.lazy"),_n=Symbol.for("react.scope"),xa=Symbol.for("react.debug_trace_mode"),ua=Symbol.for("react.offscreen"),la=Symbol.for("react.legacy_hidden"),On=Symbol.for("react.cache"),Qa=Symbol.for("react.tracing_marker"),Zn=Symbol.iterator,Ga="@@iterator";function q(e){if(e===null||typeof e!="object")return null;var t=Zn&&e[Zn]||e[Ga];return typeof t=="function"?t:null}function re(e,t,n){var a=e.displayName;if(a)return a;var r=t.displayName||t.name||"";return r!==""?n+"("+r+")":n}function pe(e){return e.displayName||"Context"}function ne(e){if(e==null)return null;if(typeof e.tag=="number"&&h("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Bn:return"Fragment";case on:return"Portal";case Ut:return"Profiler";case xn:return"StrictMode";case Mt:return"Suspense";case Jn:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Dn:var t=e;return pe(t)+".Consumer";case sn:var n=e;return pe(n._context)+".Provider";case St:return re(e,e.render,"ForwardRef");case Vn:var a=e.displayName||null;return a!==null?a:ne(e.type)||"Memo";case rt:{var r=e,i=r._payload,u=r._init;try{return ne(u(i))}catch(o){return null}}}return null}function it(e,t,n){var a=t.displayName||t.name||"";return e.displayName||(a!==""?n+"("+a+")":n)}function zt(e){return e.displayName||"Context"}function Z(e){var t=e.tag,n=e.type;switch(t){case Xn:return"Cache";case ue:var a=n;return zt(a)+".Consumer";case Et:var r=n;return zt(r._context)+".Provider";case jn:return"DehydratedFragment";case ze:return it(n,n.render,"ForwardRef");case xe:return"Fragment";case te:return n;case Me:return"Portal";case oe:return"Root";case be:return"Text";case Rt:return ne(n);case st:return n===xn?"StrictMode":"Mode";case at:return"Offscreen";case Tt:return"Profiler";case $t:return"Scope";case Fe:return"Suspense";case bt:return"SuspenseList";case Fn:return"TracingMarker";case ge:case Ue:case jt:case It:case lt:case Ae:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;break}return null}var X=0,Ie=1,Qe=2,se=4,Bt=16,In=32,Pa=64,He=128,cn=256,wn=512,Gt=1024,At=2048,fn=4096,$n=8192,Da=16384,Xr=At|se|Pa|wn|Gt|Da,Jr=32767,oa=32768,Ct=65536,d=131072,U=1048576,Q=2097152,ae=4194304,Le=8388608,Oe=16777216,Ce=33554432,Te=se|Gt|0,pt=Qe|se|Bt|In|wn|fn|$n,ke=se|Pa|wn|$n,Xe=At|Bt,ct=ae|Le|Q,sa=A.ReactCurrentOwner;function _a(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{var a=t;do t=a,(t.flags&(Qe|fn))!==X&&(n=t.return),a=t.return;while(a)}return t.tag===oe?n:null}function Nn(e){return _a(e)===e}function Wi(e){{var t=sa.current;if(t!==null&&t.tag===ge){var n=t,a=n.stateNode;a._warnedAboutRefsInRender||h("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.",Z(n)||"A component"),a._warnedAboutRefsInRender=!0}}var r=ye(e);return r?_a(r)===r:!1}function Ti(e){if(_a(e)!==e)throw new Error("Unable to find node on an unmounted component.")}function Ka(e){var t=e.alternate;if(!t){var n=_a(e);if(n===null)throw new Error("Unable to find node on an unmounted component.");return n!==e?null:e}for(var a=e,r=t;;){var i=a.return;if(i===null)break;var u=i.alternate;if(u===null){var o=i.return;if(o!==null){a=r=o;continue}break}if(i.child===u.child){for(var s=i.child;s;){if(s===a)return Ti(i),e;if(s===r)return Ti(i),t;s=s.sibling}throw new Error("Unable to find node on an unmounted component.")}if(a.return!==r.return)a=i,r=u;else{for(var f=!1,m=i.child;m;){if(m===a){f=!0,a=i,r=u;break}if(m===r){f=!0,r=i,a=u;break}m=m.sibling}if(!f){for(m=u.child;m;){if(m===a){f=!0,a=u,r=i;break}if(m===r){f=!0,r=u,a=i;break}m=m.sibling}if(!f)throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.")}}if(a.alternate!==r)throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.")}if(a.tag!==oe)throw new Error("Unable to find node on an unmounted component.");return a.stateNode.current===a?e:t}function Hr(e){var t=Ka(e);return t!==null?Zr(t):null}function Zr(e){if(e.tag===te||e.tag===be)return e;for(var t=e.child;t!==null;){var n=Zr(t);if(n!==null)return n;t=t.sibling}return null}function Ri(e){var t=Ka(e);return t!==null?Ir(t):null}function Ir(e){if(e.tag===te||e.tag===be)return e;for(var t=e.child;t!==null;){if(t.tag!==Me){var n=Ir(t);if(n!==null)return n}t=t.sibling}return null}var Ci=Array.isArray;function Pt(e){return Ci(e)}var Lr=c.getPublicInstance,xi=c.getRootHostContext,ki=c.getChildHostContext,Xi=c.prepareForCommit,$r=c.resetAfterCommit,ei=c.createInstance,Wa=c.appendInitialChild,jr=c.finalizeInitialChildren,cr=c.prepareUpdate,ti=c.shouldSetTextContent,ni=c.createTextInstance,Di=c.scheduleTimeout,Ji=c.cancelTimeout,ka=c.noTimeout,fr=c.isPrimaryRenderer,_i=c.warnsIfNotActing,Ht=c.supportsMutation,Fr=c.supportsPersistence,_t=c.supportsHydration,ai=c.getInstanceFromNode,Zi=c.beforeActiveInstanceBlur,Lu=c.afterActiveInstanceBlur,x=c.preparePortalMount,Oa=c.prepareScopeUpdate,Xa=c.getInstanceFromScope,ca=c.getCurrentEventPriority,fa=c.detachDeletedInstance,da=c.supportsMicrotasks,Na=c.scheduleMicrotask,en=c.supportsTestSelectors,va=c.findFiberRoot,Ua=c.getBoundingRect,Ma=c.getTextContent,Un=c.isHiddenSubtree,pa=c.matchAccessibilityRole,Yn=c.setFocusIfFocusable,za=c.setupIntersectionObserver,dn=c.appendChild,ma=c.appendChildToContainer,Aa=c.commitTextUpdate,qn=c.commitMount,ea=c.commitUpdate,ta=c.insertBefore,na=c.insertInContainerBefore,Ha=c.removeChild,La=c.removeChildFromContainer,ha=c.resetTextContent,Fs=c.hideInstance,l=c.hideTextInstance,v=c.unhideInstance,T=c.unhideTextInstance,D=c.clearContainer,w=c.cloneInstance,ce=c.createContainerChildSet,I=c.appendChildToContainerChildSet,Ee=c.finalizeContainerChildren,Be=c.replaceContainerChildren,$e=c.cloneHiddenInstance,ft=c.cloneHiddenTextInstance,mt=c.canHydrateInstance,yt=c.canHydrateTextInstance,Ot=c.canHydrateSuspenseInstance,Vt=c.isSuspenseInstancePending,ri=c.isSuspenseInstanceFallback,ju=c.getSuspenseInstanceFallbackErrorDetails,ql=c.registerSuspenseInstanceRetry,Ii=c.getNextHydratableSibling,Ql=c.getFirstHydratableChild,Bs=c.getFirstHydratableChildWithinContainer,Gl=c.getFirstHydratableChildWithinSuspenseInstance,Vs=c.hydrateInstance,My=c.hydrateTextInstance,zy=c.hydrateSuspenseInstance,Ay=c.getNextHydratableInstanceAfterSuspenseInstance,Hy=c.commitHydratedContainer,Ly=c.commitHydratedSuspenseInstance,jy=c.clearSuspenseBoundary,Fy=c.clearSuspenseBoundaryFromContainer,By=c.shouldDeleteUnhydratedTailInstances,Vy=c.didNotMatchHydratedContainerTextInstance,wy=c.didNotMatchHydratedTextInstance,Yy=c.didNotHydrateInstanceWithinContainer,qy=c.didNotHydrateInstanceWithinSuspenseInstance,Qy=c.didNotHydrateInstance,Gy=c.didNotFindHydratableInstanceWithinContainer,Py=c.didNotFindHydratableTextInstanceWithinContainer,Ky=c.didNotFindHydratableSuspenseInstanceWithinContainer,Wy=c.didNotFindHydratableInstanceWithinSuspenseInstance,ky=c.didNotFindHydratableTextInstanceWithinSuspenseInstance,Xy=c.didNotFindHydratableSuspenseInstanceWithinSuspenseInstance,Jy=c.didNotFindHydratableInstance,Zy=c.didNotFindHydratableTextInstance,Iy=c.didNotFindHydratableSuspenseInstance,$y=c.errorHydratingContainer,Fu=0,sv,cv,fv,dv,vv,pv,mv;function hv(){}hv.__reactDisabledLog=!0;function eg(){{if(Fu===0){sv=console.log,cv=console.info,fv=console.warn,dv=console.error,vv=console.group,pv=console.groupCollapsed,mv=console.groupEnd;var e={configurable:!0,enumerable:!0,value:hv,writable:!0};Object.defineProperties(console,{info:e,log:e,warn:e,error:e,group:e,groupCollapsed:e,groupEnd:e})}Fu++}}function tg(){{if(Fu--,Fu===0){var e={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:K({},e,{value:sv}),info:K({},e,{value:cv}),warn:K({},e,{value:fv}),error:K({},e,{value:dv}),group:K({},e,{value:vv}),groupCollapsed:K({},e,{value:pv}),groupEnd:K({},e,{value:mv})})}Fu<0&&h("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var ws=A.ReactCurrentDispatcher,Ys;function ii(e,t,n){{if(Ys===void 0)try{throw Error()}catch(r){var a=r.stack.trim().match(/\n( *(at )?)/);Ys=a&&a[1]||""}return`
`+Ys+e}}var qs=!1,Pl;{var ng=typeof WeakMap=="function"?WeakMap:Map;Pl=new ng}function Qs(e,t){if(!e||qs)return"";{var n=Pl.get(e);if(n!==void 0)return n}var a;qs=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var i;i=ws.current,ws.current=null,eg();try{if(t){var u=function(){throw Error()};if(Object.defineProperty(u.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(u,[])}catch(H){a=H}Reflect.construct(e,[],u)}else{try{u.call()}catch(H){a=H}e.call(u.prototype)}}else{try{throw Error()}catch(H){a=H}e()}}catch(H){if(H&&a&&typeof H.stack=="string"){for(var o=H.stack.split(`
`),s=a.stack.split(`
`),f=o.length-1,m=s.length-1;f>=1&&m>=0&&o[f]!==s[m];)m--;for(;f>=1&&m>=0;f--,m--)if(o[f]!==s[m]){if(f!==1||m!==1)do if(f--,m--,m<0||o[f]!==s[m]){var b=`
`+o[f].replace(" at new "," at ");return e.displayName&&b.includes("<anonymous>")&&(b=b.replace("<anonymous>",e.displayName)),typeof e=="function"&&Pl.set(e,b),b}while(f>=1&&m>=0);break}}}finally{qs=!1,ws.current=i,tg(),Error.prepareStackTrace=r}var C=e?e.displayName||e.name:"",M=C?ii(C):"";return typeof e=="function"&&Pl.set(e,M),M}function ag(e,t,n){return Qs(e,!0)}function Gs(e,t,n){return Qs(e,!1)}function rg(e){var t=e.prototype;return!!(t&&t.isReactComponent)}function Ps(e,t,n){if(e==null)return"";if(typeof e=="function")return Qs(e,rg(e));if(typeof e=="string")return ii(e);switch(e){case Mt:return ii("Suspense");case Jn:return ii("SuspenseList")}if(typeof e=="object")switch(e.$$typeof){case St:return Gs(e.render);case Vn:return Ps(e.type,t,n);case rt:{var a=e,r=a._payload,i=a._init;try{return Ps(i(r),t,n)}catch(u){}}}return""}var yv=Object.prototype.hasOwnProperty,gv={},bv=A.ReactDebugCurrentFrame;function Kl(e){if(e){var t=e._owner,n=Ps(e.type,e._source,t?t.type:null);bv.setExtraStackFrame(n)}else bv.setExtraStackFrame(null)}function Ja(e,t,n,a,r){{var i=Function.call.bind(yv);for(var u in e)if(i(e,u)){var o=void 0;try{if(typeof e[u]!="function"){var s=Error((a||"React class")+": "+n+" type `"+u+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof e[u]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw s.name="Invariant Violation",s}o=e[u](t,u,a,n,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(f){o=f}o&&!(o instanceof Error)&&(Kl(r),h("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",a||"React class",n,u,typeof o),Kl(null)),o instanceof Error&&!(o.message in gv)&&(gv[o.message]=!0,Kl(r),h("Failed %s type: %s",n,o.message),Kl(null))}}}var Ks=[],Wl;Wl=[];var Br=-1;function ui(e){return{current:e}}function Mn(e,t){if(Br<0){h("Unexpected pop.");return}t!==Wl[Br]&&h("Unexpected Fiber popped."),e.current=Ks[Br],Ks[Br]=null,Wl[Br]=null,Br--}function vn(e,t,n){Br++,Ks[Br]=e.current,Wl[Br]=n,e.current=t}var Ws;Ws={};var ya={};Object.freeze(ya);var Vr=ui(ya),dr=ui(!1),ks=ya;function $i(e,t,n){return n&&vr(t)?ks:Vr.current}function Sv(e,t,n){{var a=e.stateNode;a.__reactInternalMemoizedUnmaskedChildContext=t,a.__reactInternalMemoizedMaskedChildContext=n}}function eu(e,t){{var n=e.type,a=n.contextTypes;if(!a)return ya;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={};for(var u in a)i[u]=t[u];{var o=Z(e)||"Unknown";Ja(a,i,"context",o)}return r&&Sv(e,t,i),i}}function kl(){return dr.current}function vr(e){{var t=e.childContextTypes;return t!=null}}function Xl(e){Mn(dr,e),Mn(Vr,e)}function Xs(e){Mn(dr,e),Mn(Vr,e)}function Ev(e,t,n){{if(Vr.current!==ya)throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");vn(Vr,t,e),vn(dr,n,e)}}function Tv(e,t,n){{var a=e.stateNode,r=t.childContextTypes;if(typeof a.getChildContext!="function"){{var i=Z(e)||"Unknown";Ws[i]||(Ws[i]=!0,h("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.",i,i))}return n}var u=a.getChildContext();for(var o in u)if(!(o in r))throw new Error((Z(e)||"Unknown")+'.getChildContext(): key "'+o+'" is not defined in childContextTypes.');{var s=Z(e)||"Unknown";Ja(r,u,"child context",s)}return K({},n,u)}}function Jl(e){{var t=e.stateNode,n=t&&t.__reactInternalMemoizedMergedChildContext||ya;return ks=Vr.current,vn(Vr,n,e),vn(dr,dr.current,e),!0}}function Rv(e,t,n){{var a=e.stateNode;if(!a)throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");if(n){var r=Tv(e,t,ks);a.__reactInternalMemoizedMergedChildContext=r,Mn(dr,e),Mn(Vr,e),vn(Vr,r,e),vn(dr,n,e)}else Mn(dr,e),vn(dr,n,e)}}function ig(e){{if(!Nn(e)||e.tag!==ge)throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");var t=e;do{switch(t.tag){case oe:return t.stateNode.context;case ge:{var n=t.type;if(vr(n))return t.stateNode.__reactInternalMemoizedMergedChildContext;break}}t=t.return}while(t!==null);throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.")}}var tu=0,Cv=1,de=0,Ge=1,et=2,wt=8,pr=16,xv=Math.clz32?Math.clz32:og,ug=Math.log,lg=Math.LN2;function og(e){var t=e>>>0;return t===0?32:31-(ug(t)/lg|0)|0}var Js=31,L=0,tn=0,me=1,nu=2,wr=4,Oi=8,mr=16,Bu=32,au=4194240,Vu=64,Zs=128,Is=256,$s=512,ec=1024,tc=2048,nc=4096,ac=8192,rc=16384,ic=32768,uc=65536,lc=131072,oc=262144,sc=524288,cc=1048576,fc=2097152,Zl=130023424,ru=4194304,dc=8388608,vc=16777216,pc=33554432,mc=67108864,Dv=ru,wu=134217728,_v=268435455,Yu=268435456,Ni=536870912,ga=1073741824;function sg(e){{if(e&me)return"Sync";if(e&nu)return"InputContinuousHydration";if(e&wr)return"InputContinuous";if(e&Oi)return"DefaultHydration";if(e&mr)return"Default";if(e&Bu)return"TransitionHydration";if(e&au)return"Transition";if(e&Zl)return"Retry";if(e&wu)return"SelectiveHydration";if(e&Yu)return"IdleHydration";if(e&Ni)return"Idle";if(e&ga)return"Offscreen"}}var ht=-1,Il=Vu,$l=ru;function qu(e){switch(Ui(e)){case me:return me;case nu:return nu;case wr:return wr;case Oi:return Oi;case mr:return mr;case Bu:return Bu;case Vu:case Zs:case Is:case $s:case ec:case tc:case nc:case ac:case rc:case ic:case uc:case lc:case oc:case sc:case cc:case fc:return e&au;case ru:case dc:case vc:case pc:case mc:return e&Zl;case wu:return wu;case Yu:return Yu;case Ni:return Ni;case ga:return ga;default:return h("Should have found matching lanes. This is a bug in React."),e}}function eo(e,t){var n=e.pendingLanes;if(n===L)return L;var a=L,r=e.suspendedLanes,i=e.pingedLanes,u=n&_v;if(u!==L){var o=u&~r;if(o!==L)a=qu(o);else{var s=u&i;s!==L&&(a=qu(s))}}else{var f=n&~r;f!==L?a=qu(f):i!==L&&(a=qu(i))}if(a===L)return L;if(t!==L&&t!==a&&(t&r)===L){var m=Ui(a),b=Ui(t);if(m>=b||m===mr&&(b&au)!==L)return t}(a&wr)!==L&&(a|=n&mr);var C=e.entangledLanes;if(C!==L)for(var M=e.entanglements,H=a&C;H>0;){var z=Mi(H),ee=1<<z;a|=M[z],H&=~ee}return a}function cg(e,t){for(var n=e.eventTimes,a=ht;t>0;){var r=Mi(t),i=1<<r,u=n[r];u>a&&(a=u),t&=~i}return a}function fg(e,t){switch(e){case me:case nu:case wr:return t+250;case Oi:case mr:case Bu:case Vu:case Zs:case Is:case $s:case ec:case tc:case nc:case ac:case rc:case ic:case uc:case lc:case oc:case sc:case cc:case fc:return t+5e3;case ru:case dc:case vc:case pc:case mc:return ht;case wu:case Yu:case Ni:case ga:return ht;default:return h("Should have found matching lanes. This is a bug in React."),ht}}function dg(e,t){for(var n=e.pendingLanes,a=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,u=n;u>0;){var o=Mi(u),s=1<<o,f=i[o];f===ht?((s&a)===L||(s&r)!==L)&&(i[o]=fg(s,t)):f<=t&&(e.expiredLanes|=s),u&=~s}}function vg(e){return qu(e.pendingLanes)}function hc(e){var t=e.pendingLanes&~ga;return t!==L?t:t&ga?ga:L}function pg(e){return(e&me)!==L}function yc(e){return(e&_v)!==L}function Ov(e){return(e&Zl)===e}function mg(e){var t=me|wr|mr;return(e&t)===L}function hg(e){return(e&au)===e}function to(e,t){var n=nu|wr|Oi|mr;return(t&n)!==L}function yg(e,t){return(t&e.expiredLanes)!==L}function Nv(e){return(e&au)!==L}function Uv(){var e=Il;return Il<<=1,(Il&au)===L&&(Il=Vu),e}function gg(){var e=$l;return $l<<=1,($l&Zl)===L&&($l=ru),e}function Ui(e){return e&-e}function Qu(e){return Ui(e)}function Mi(e){return 31-xv(e)}function gc(e){return Mi(e)}function ba(e,t){return(e&t)!==L}function iu(e,t){return(e&t)===t}function De(e,t){return e|t}function no(e,t){return e&~t}function Mv(e,t){return e&t}function DR(e){return e}function bg(e,t){return e!==tn&&e<t?e:t}function bc(e){for(var t=[],n=0;n<Js;n++)t.push(e);return t}function Gu(e,t,n){e.pendingLanes|=t,t!==Ni&&(e.suspendedLanes=L,e.pingedLanes=L);var a=e.eventTimes,r=gc(t);a[r]=n}function Sg(e,t){e.suspendedLanes|=t,e.pingedLanes&=~t;for(var n=e.expirationTimes,a=t;a>0;){var r=Mi(a),i=1<<r;n[r]=ht,a&=~i}}function zv(e,t,n){e.pingedLanes|=e.suspendedLanes&t}function Eg(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=L,e.pingedLanes=L,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t;for(var a=e.entanglements,r=e.eventTimes,i=e.expirationTimes,u=n;u>0;){var o=Mi(u),s=1<<o;a[o]=L,r[o]=ht,i[o]=ht,u&=~s}}function Sc(e,t){for(var n=e.entangledLanes|=t,a=e.entanglements,r=n;r;){var i=Mi(r),u=1<<i;u&t|a[i]&t&&(a[i]|=t),r&=~u}}function Tg(e,t){var n=Ui(t),a;switch(n){case wr:a=nu;break;case mr:a=Oi;break;case Vu:case Zs:case Is:case $s:case ec:case tc:case nc:case ac:case rc:case ic:case uc:case lc:case oc:case sc:case cc:case fc:case ru:case dc:case vc:case pc:case mc:a=Bu;break;case Ni:a=Yu;break;default:a=tn;break}return(a&(e.suspendedLanes|t))!==tn?tn:a}function Av(e,t,n){if(Ia)for(var a=e.pendingUpdatersLaneMap;n>0;){var r=gc(n),i=1<<r,u=a[r];u.add(t),n&=~i}}function Hv(e,t){if(Ia)for(var n=e.pendingUpdatersLaneMap,a=e.memoizedUpdaters;t>0;){var r=gc(t),i=1<<r,u=n[r];u.size>0&&(u.forEach(function(o){var s=o.alternate;(s===null||!a.has(s))&&a.add(o)}),u.clear()),t&=~i}}function Lv(e,t){return null}var hr=me,Pu=wr,Ku=mr,Ec=Ni,Wu=tn;function Za(){return Wu}function nn(e){Wu=e}function Rg(e,t){var n=Wu;try{return Wu=e,t()}finally{Wu=n}}function Cg(e,t){return e!==0&&e<t?e:t}function xg(e,t){return e===0||e>t?e:t}function jv(e,t){return e!==0&&e<t}function Fv(e){var t=Ui(e);return jv(hr,t)?jv(Pu,t)?yc(t)?Ku:Ec:Pu:hr}var Bv=g.unstable_scheduleCallback,Dg=g.unstable_cancelCallback,_g=g.unstable_shouldYield,Og=g.unstable_requestPaint,an=g.unstable_now,ao=g.unstable_ImmediatePriority,Vv=g.unstable_UserBlockingPriority,uu=g.unstable_NormalPriority,wv=g.unstable_IdlePriority,Ng=g.unstable_yieldValue,Ug=g.unstable_setDisableYieldValue,zi=null,pn=null,P=null,yr=!1,Ia=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!="undefined";function Mg(e){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__=="undefined")return!1;var t=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t.isDisabled)return!0;if(!t.supportsFiber)return h("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"),!0;try{ot&&(e=K({},e,{getLaneLabelMap:Fg,injectProfilingHooks:jg})),zi=t.inject(e),pn=t}catch(n){h("React instrumentation encountered an error: %s.",n)}return!!t.checkDCE}function zg(e,t){if(pn&&typeof pn.onScheduleFiberRoot=="function")try{pn.onScheduleFiberRoot(zi,e,t)}catch(n){yr||(yr=!0,h("React instrumentation encountered an error: %s",n))}}function Ag(e,t){if(pn&&typeof pn.onCommitFiberRoot=="function")try{var n=(e.current.flags&He)===He;if(gt){var a;switch(t){case hr:a=ao;break;case Pu:a=Vv;break;case Ku:a=uu;break;case Ec:a=wv;break;default:a=uu;break}pn.onCommitFiberRoot(zi,e,a,n)}else pn.onCommitFiberRoot(zi,e,void 0,n)}catch(r){yr||(yr=!0,h("React instrumentation encountered an error: %s",r))}}function Hg(e){if(pn&&typeof pn.onPostCommitFiberRoot=="function")try{pn.onPostCommitFiberRoot(zi,e)}catch(t){yr||(yr=!0,h("React instrumentation encountered an error: %s",t))}}function Lg(e){if(pn&&typeof pn.onCommitFiberUnmount=="function")try{pn.onCommitFiberUnmount(zi,e)}catch(t){yr||(yr=!0,h("React instrumentation encountered an error: %s",t))}}function rn(e){if(typeof Ng=="function"&&(Ug(e),V(e)),pn&&typeof pn.setStrictMode=="function")try{pn.setStrictMode(zi,e)}catch(t){yr||(yr=!0,h("React instrumentation encountered an error: %s",t))}}function jg(e){P=e}function Fg(){{for(var e=new Map,t=1,n=0;n<Js;n++){var a=sg(t);e.set(t,a),t*=2}return e}}function Bg(e){P!==null&&typeof P.markCommitStarted=="function"&&P.markCommitStarted(e)}function Yv(){P!==null&&typeof P.markCommitStopped=="function"&&P.markCommitStopped()}function ku(e){P!==null&&typeof P.markComponentRenderStarted=="function"&&P.markComponentRenderStarted(e)}function lu(){P!==null&&typeof P.markComponentRenderStopped=="function"&&P.markComponentRenderStopped()}function Vg(e){P!==null&&typeof P.markComponentPassiveEffectMountStarted=="function"&&P.markComponentPassiveEffectMountStarted(e)}function wg(){P!==null&&typeof P.markComponentPassiveEffectMountStopped=="function"&&P.markComponentPassiveEffectMountStopped()}function Yg(e){P!==null&&typeof P.markComponentPassiveEffectUnmountStarted=="function"&&P.markComponentPassiveEffectUnmountStarted(e)}function qg(){P!==null&&typeof P.markComponentPassiveEffectUnmountStopped=="function"&&P.markComponentPassiveEffectUnmountStopped()}function Qg(e){P!==null&&typeof P.markComponentLayoutEffectMountStarted=="function"&&P.markComponentLayoutEffectMountStarted(e)}function Gg(){P!==null&&typeof P.markComponentLayoutEffectMountStopped=="function"&&P.markComponentLayoutEffectMountStopped()}function qv(e){P!==null&&typeof P.markComponentLayoutEffectUnmountStarted=="function"&&P.markComponentLayoutEffectUnmountStarted(e)}function Qv(){P!==null&&typeof P.markComponentLayoutEffectUnmountStopped=="function"&&P.markComponentLayoutEffectUnmountStopped()}function Pg(e,t,n){P!==null&&typeof P.markComponentErrored=="function"&&P.markComponentErrored(e,t,n)}function Kg(e,t,n){P!==null&&typeof P.markComponentSuspended=="function"&&P.markComponentSuspended(e,t,n)}function Wg(e){P!==null&&typeof P.markLayoutEffectsStarted=="function"&&P.markLayoutEffectsStarted(e)}function kg(){P!==null&&typeof P.markLayoutEffectsStopped=="function"&&P.markLayoutEffectsStopped()}function Xg(e){P!==null&&typeof P.markPassiveEffectsStarted=="function"&&P.markPassiveEffectsStarted(e)}function Jg(){P!==null&&typeof P.markPassiveEffectsStopped=="function"&&P.markPassiveEffectsStopped()}function Gv(e){P!==null&&typeof P.markRenderStarted=="function"&&P.markRenderStarted(e)}function Zg(){P!==null&&typeof P.markRenderYielded=="function"&&P.markRenderYielded()}function Pv(){P!==null&&typeof P.markRenderStopped=="function"&&P.markRenderStopped()}function Ig(e){P!==null&&typeof P.markRenderScheduled=="function"&&P.markRenderScheduled(e)}function $g(e,t){P!==null&&typeof P.markForceUpdateScheduled=="function"&&P.markForceUpdateScheduled(e,t)}function Tc(e,t){P!==null&&typeof P.markStateUpdateScheduled=="function"&&P.markStateUpdateScheduled(e,t)}function eb(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Sa=typeof Object.is=="function"?Object.is:eb,Yr=null,Rc=!1,Cc=!1;function Kv(e){Yr===null?Yr=[e]:Yr.push(e)}function tb(e){Rc=!0,Kv(e)}function Wv(){Rc&&gr()}function gr(){if(!Cc&&Yr!==null){Cc=!0;var e=0,t=Za();try{var n=!0,a=Yr;for(nn(hr);e<a.length;e++){var r=a[e];do r=r(n);while(r!==null)}Yr=null,Rc=!1}catch(i){throw Yr!==null&&(Yr=Yr.slice(e+1)),Bv(ao,gr),i}finally{nn(t),Cc=!1}}return null}function kv(e){var t=e.current.memoizedState;return t.isDehydrated}var ou=[],su=0,ro=null,io=0,ja=[],Fa=0,Ai=null,qr=1,Qr="";function nb(e){return Li(),(e.flags&U)!==X}function ab(e){return Li(),io}function rb(){var e=Qr,t=qr,n=t&~ib(t);return n.toString(32)+e}function Hi(e,t){Li(),ou[su++]=io,ou[su++]=ro,ro=e,io=t}function Xv(e,t,n){Li(),ja[Fa++]=qr,ja[Fa++]=Qr,ja[Fa++]=Ai,Ai=e;var a=qr,r=Qr,i=uo(a)-1,u=a&~(1<<i),o=n+1,s=uo(t)+i;if(s>30){var f=i-i%5,m=(1<<f)-1,b=(u&m).toString(32),C=u>>f,M=i-f,H=uo(t)+M,z=o<<M,ee=z|C,ve=b+r;qr=1<<H|ee,Qr=ve}else{var ie=o<<i,Ze=ie|u,we=r;qr=1<<s|Ze,Qr=we}}function xc(e){Li();var t=e.return;if(t!==null){var n=1,a=0;Hi(e,n),Xv(e,n,a)}}function uo(e){return 32-xv(e)}function ib(e){return 1<<uo(e)-1}function Dc(e){for(;e===ro;)ro=ou[--su],ou[su]=null,io=ou[--su],ou[su]=null;for(;e===Ai;)Ai=ja[--Fa],ja[Fa]=null,Qr=ja[--Fa],ja[Fa]=null,qr=ja[--Fa],ja[Fa]=null}function ub(){return Li(),Ai!==null?{id:qr,overflow:Qr}:null}function lb(e,t){Li(),ja[Fa++]=qr,ja[Fa++]=Qr,ja[Fa++]=Ai,qr=t.id,Qr=t.overflow,Ai=e}function Li(){hn()||h("Expected to be hydrating. This is a bug in React. Please file an issue.")}var mn=null,Ba=null,$a=!1,li=!1,oi=null;function ob(){$a&&h("We should not be hydrating here. This is a bug in React. Please file a bug.")}function Jv(){li=!0}function sb(){return li}function cb(e){if(!_t)return!1;var t=e.stateNode.containerInfo;return Ba=Bs(t),mn=e,$a=!0,oi=null,li=!1,!0}function fb(e,t,n){return _t?(Ba=Gl(t),mn=e,$a=!0,oi=null,li=!1,n!==null&&lb(e,n),!0):!1}function Zv(e,t){switch(e.tag){case oe:{Yy(e.stateNode.containerInfo,t);break}case te:{var n=(e.mode&Ge)!==de;Qy(e.type,e.memoizedProps,e.stateNode,t,n);break}case Fe:{var a=e.memoizedState;a.dehydrated!==null&&qy(a.dehydrated,t);break}}}function Iv(e,t){Zv(e,t);var n=FT();n.stateNode=t,n.return=e;var a=e.deletions;a===null?(e.deletions=[n],e.flags|=Bt):a.push(n)}function _c(e,t){{if(li)return;switch(e.tag){case oe:{var n=e.stateNode.containerInfo;switch(t.tag){case te:var a=t.type,r=t.pendingProps;Gy(n,a,r);break;case be:var i=t.pendingProps;Py(n,i);break;case Fe:Ky(n);break}break}case te:{var u=e.type,o=e.memoizedProps,s=e.stateNode;switch(t.tag){case te:{var f=t.type,m=t.pendingProps,b=(e.mode&Ge)!==de;Jy(u,o,s,f,m,b);break}case be:{var C=t.pendingProps,M=(e.mode&Ge)!==de;Zy(u,o,s,C,M);break}case Fe:{Iy(u,o,s);break}}break}case Fe:{var H=e.memoizedState,z=H.dehydrated;if(z!==null)switch(t.tag){case te:var ee=t.type,ve=t.pendingProps;Wy(z,ee,ve);break;case be:var ie=t.pendingProps;ky(z,ie);break;case Fe:Xy(z);break}break}default:return}}}function $v(e,t){t.flags=t.flags&~fn|Qe,_c(e,t)}function ep(e,t){switch(e.tag){case te:{var n=e.type,a=e.pendingProps,r=mt(t,n,a);return r!==null?(e.stateNode=r,mn=e,Ba=Ql(r),!0):!1}case be:{var i=e.pendingProps,u=yt(t,i);return u!==null?(e.stateNode=u,mn=e,Ba=null,!0):!1}case Fe:{var o=Ot(t);if(o!==null){var s={dehydrated:o,treeContext:ub(),retryLane:ga};e.memoizedState=s;var f=BT(o);return f.return=e,e.child=f,mn=e,Ba=null,!0}return!1}default:return!1}}function Oc(e){return(e.mode&Ge)!==de&&(e.flags&He)===X}function Nc(e){throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.")}function Uc(e){if($a){var t=Ba;if(!t){Oc(e)&&(_c(mn,e),Nc()),$v(mn,e),$a=!1,mn=e;return}var n=t;if(!ep(e,t)){Oc(e)&&(_c(mn,e),Nc()),t=Ii(n);var a=mn;if(!t||!ep(e,t)){$v(mn,e),$a=!1,mn=e;return}Iv(a,n)}}}function db(e,t,n){if(!_t)throw new Error("Expected prepareToHydrateHostInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");var a=e.stateNode,r=!li,i=Vs(a,e.type,e.memoizedProps,t,n,e,r);return e.updateQueue=i,i!==null}function vb(e){if(!_t)throw new Error("Expected prepareToHydrateHostTextInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");var t=e.stateNode,n=e.memoizedProps,a=!li,r=My(t,n,e,a);if(r){var i=mn;if(i!==null)switch(i.tag){case oe:{var u=i.stateNode.containerInfo,o=(i.mode&Ge)!==de;Vy(u,t,n,o);break}case te:{var s=i.type,f=i.memoizedProps,m=i.stateNode,b=(i.mode&Ge)!==de;wy(s,f,m,t,n,b);break}}}return r}function pb(e){if(!_t)throw new Error("Expected prepareToHydrateHostSuspenseInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");var t=e.memoizedState,n=t!==null?t.dehydrated:null;if(!n)throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");zy(n,e)}function mb(e){if(!_t)throw new Error("Expected skipPastDehydratedSuspenseInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");var t=e.memoizedState,n=t!==null?t.dehydrated:null;if(!n)throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");return Ay(n)}function tp(e){for(var t=e.return;t!==null&&t.tag!==te&&t.tag!==oe&&t.tag!==Fe;)t=t.return;mn=t}function lo(e){if(!_t||e!==mn)return!1;if(!$a)return tp(e),$a=!0,!1;if(e.tag!==oe&&(e.tag!==te||By(e.type)&&!ti(e.type,e.memoizedProps))){var t=Ba;if(t)if(Oc(e))np(e),Nc();else for(;t;)Iv(e,t),t=Ii(t)}return tp(e),e.tag===Fe?Ba=mb(e):Ba=mn?Ii(e.stateNode):null,!0}function hb(){return $a&&Ba!==null}function np(e){for(var t=Ba;t;)Zv(e,t),t=Ii(t)}function cu(){_t&&(mn=null,Ba=null,$a=!1,li=!1)}function ap(){oi!==null&&(ah(oi),oi=null)}function hn(){return $a}function Mc(e){oi===null?oi=[e]:oi.push(e)}var yb=A.ReactCurrentBatchConfig,gb=null;function bb(){return yb.transition}function oo(e,t){if(Sa(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),a=Object.keys(t);if(n.length!==a.length)return!1;for(var r=0;r<n.length;r++){var i=n[r];if(!yv.call(t,i)||!Sa(e[i],t[i]))return!1}return!0}function Sb(e){var t=e._debugOwner?e._debugOwner.type:null,n=e._debugSource;switch(e.tag){case te:return ii(e.type);case Rt:return ii("Lazy");case Fe:return ii("Suspense");case bt:return ii("SuspenseList");case Ue:case It:case Ae:return Gs(e.type);case ze:return Gs(e.type.render);case ge:return ag(e.type);default:return""}}function rp(e){try{var t="",n=e;do t+=Sb(n),n=n.return;while(n);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var ip=A.ReactDebugCurrentFrame,Ea=null,Xu=!1;function Eb(){{if(Ea===null)return null;var e=Ea._debugOwner;if(e!==null&&typeof e!="undefined")return Z(e)}return null}function Tb(){return Ea===null?"":rp(Ea)}function Qn(){ip.getCurrentStack=null,Ea=null,Xu=!1}function Lt(e){ip.getCurrentStack=e===null?null:Tb,Ea=e,Xu=!1}function Rb(){return Ea}function br(e){Xu=e}var er={recordUnsafeLifecycleWarnings:function(e,t){},flushPendingUnsafeLifecycleWarnings:function(){},recordLegacyContextWarning:function(e,t){},flushLegacyContextWarning:function(){},discardPendingWarnings:function(){}};{var Cb=function(e){for(var t=null,n=e;n!==null;)n.mode&wt&&(t=n),n=n.return;return t},ji=function(e){var t=[];return e.forEach(function(n){t.push(n)}),t.sort().join(", ")},Ju=[],Zu=[],Iu=[],$u=[],el=[],tl=[],Fi=new Set;er.recordUnsafeLifecycleWarnings=function(e,t){Fi.has(e.type)||(typeof t.componentWillMount=="function"&&t.componentWillMount.__suppressDeprecationWarning!==!0&&Ju.push(e),e.mode&wt&&typeof t.UNSAFE_componentWillMount=="function"&&Zu.push(e),typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps.__suppressDeprecationWarning!==!0&&Iu.push(e),e.mode&wt&&typeof t.UNSAFE_componentWillReceiveProps=="function"&&$u.push(e),typeof t.componentWillUpdate=="function"&&t.componentWillUpdate.__suppressDeprecationWarning!==!0&&el.push(e),e.mode&wt&&typeof t.UNSAFE_componentWillUpdate=="function"&&tl.push(e))},er.flushPendingUnsafeLifecycleWarnings=function(){var e=new Set;Ju.length>0&&(Ju.forEach(function(C){e.add(Z(C)||"Component"),Fi.add(C.type)}),Ju=[]);var t=new Set;Zu.length>0&&(Zu.forEach(function(C){t.add(Z(C)||"Component"),Fi.add(C.type)}),Zu=[]);var n=new Set;Iu.length>0&&(Iu.forEach(function(C){n.add(Z(C)||"Component"),Fi.add(C.type)}),Iu=[]);var a=new Set;$u.length>0&&($u.forEach(function(C){a.add(Z(C)||"Component"),Fi.add(C.type)}),$u=[]);var r=new Set;el.length>0&&(el.forEach(function(C){r.add(Z(C)||"Component"),Fi.add(C.type)}),el=[]);var i=new Set;if(tl.length>0&&(tl.forEach(function(C){i.add(Z(C)||"Component"),Fi.add(C.type)}),tl=[]),t.size>0){var u=ji(t);h(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`,u)}if(a.size>0){var o=ji(a);h(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`,o)}if(i.size>0){var s=ji(i);h(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`,s)}if(e.size>0){var f=ji(e);j(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,f)}if(n.size>0){var m=ji(n);j(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,m)}if(r.size>0){var b=ji(r);j(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,b)}};var so=new Map,up=new Set;er.recordLegacyContextWarning=function(e,t){var n=Cb(e);if(n===null){h("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");return}if(!up.has(e.type)){var a=so.get(n);(e.type.contextTypes!=null||e.type.childContextTypes!=null||t!==null&&typeof t.getChildContext=="function")&&(a===void 0&&(a=[],so.set(n,a)),a.push(e))}},er.flushLegacyContextWarning=function(){so.forEach(function(e,t){if(e.length!==0){var n=e[0],a=new Set;e.forEach(function(i){a.add(Z(i)||"Component"),up.add(i.type)});var r=ji(a);try{Lt(n),h(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`,r)}finally{Qn()}}})},er.discardPendingWarnings=function(){Ju=[],Zu=[],Iu=[],$u=[],el=[],tl=[],so=new Map}}function lp(e){{var t=typeof Symbol=="function"&&Symbol.toStringTag,n=t&&e[Symbol.toStringTag]||e.constructor.name||"Object";return n}}function op(e){try{return zc(e),!1}catch(t){return!0}}function zc(e){return""+e}function xb(e){if(op(e))return h("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",lp(e)),zc(e)}function Db(e,t){if(op(e))return h("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.",t,lp(e)),zc(e)}function tr(e,t){if(e&&e.defaultProps){var n=K({},t),a=e.defaultProps;for(var r in a)n[r]===void 0&&(n[r]=a[r]);return n}return t}var co=ui(null),nl;nl={};var fo=null,fu=null,Ac=null,vo=!1;function po(){fo=null,fu=null,Ac=null,vo=!1}function sp(){vo=!0}function cp(){vo=!1}function fp(e,t,n){fr?(vn(co,t._currentValue,e),t._currentValue=n,t._currentRenderer!==void 0&&t._currentRenderer!==null&&t._currentRenderer!==nl&&h("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."),t._currentRenderer=nl):(vn(co,t._currentValue2,e),t._currentValue2=n,t._currentRenderer2!==void 0&&t._currentRenderer2!==null&&t._currentRenderer2!==nl&&h("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."),t._currentRenderer2=nl)}function Hc(e,t){var n=co.current;Mn(co,t),fr?e._currentValue=n:e._currentValue2=n}function Lc(e,t,n){for(var a=e;a!==null;){var r=a.alternate;if(iu(a.childLanes,t)?r!==null&&!iu(r.childLanes,t)&&(r.childLanes=De(r.childLanes,t)):(a.childLanes=De(a.childLanes,t),r!==null&&(r.childLanes=De(r.childLanes,t))),a===n)break;a=a.return}a!==n&&h("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.")}function _b(e,t,n){Ob(e,t,n)}function Ob(e,t,n){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var r=void 0,i=a.dependencies;if(i!==null){r=a.child;for(var u=i.firstContext;u!==null;){if(u.context===t){if(a.tag===ge){var o=Qu(n),s=Gr(ht,o);s.tag=ho;var f=a.updateQueue;if(f!==null){var m=f.shared,b=m.pending;b===null?s.next=s:(s.next=b.next,b.next=s),m.pending=s}}a.lanes=De(a.lanes,n);var C=a.alternate;C!==null&&(C.lanes=De(C.lanes,n)),Lc(a.return,n,e),i.lanes=De(i.lanes,n);break}u=u.next}}else if(a.tag===Et)r=a.type===e.type?null:a.child;else if(a.tag===jn){var M=a.return;if(M===null)throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");M.lanes=De(M.lanes,n);var H=M.alternate;H!==null&&(H.lanes=De(H.lanes,n)),Lc(M,n,e),r=a.sibling}else r=a.child;if(r!==null)r.return=a;else for(r=a;r!==null;){if(r===e){r=null;break}var z=r.sibling;if(z!==null){z.return=r.return,r=z;break}r=r.return}a=r}}function du(e,t){fo=e,fu=null,Ac=null;var n=e.dependencies;if(n!==null){var a=n.firstContext;a!==null&&(ba(n.lanes,t)&&yl(),n.firstContext=null)}}function Yt(e){vo&&h("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");var t=fr?e._currentValue:e._currentValue2;if(Ac!==e){var n={context:e,memoizedValue:t,next:null};if(fu===null){if(fo===null)throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");fu=n,fo.dependencies={lanes:L,firstContext:n}}else fu=fu.next=n}return t}var Bi=null;function jc(e){Bi===null?Bi=[e]:Bi.push(e)}function Nb(){if(Bi!==null){for(var e=0;e<Bi.length;e++){var t=Bi[e],n=t.interleaved;if(n!==null){t.interleaved=null;var a=n.next,r=t.pending;if(r!==null){var i=r.next;r.next=a,n.next=i}t.pending=n}}Bi=null}}function dp(e,t,n,a){var r=t.interleaved;return r===null?(n.next=n,jc(t)):(n.next=r.next,r.next=n),t.interleaved=n,mo(e,a)}function Ub(e,t,n,a){var r=t.interleaved;r===null?(n.next=n,jc(t)):(n.next=r.next,r.next=n),t.interleaved=n}function Mb(e,t,n,a){var r=t.interleaved;return r===null?(n.next=n,jc(t)):(n.next=r.next,r.next=n),t.interleaved=n,mo(e,a)}function Gn(e,t){return mo(e,t)}var zb=mo;function mo(e,t){e.lanes=De(e.lanes,t);var n=e.alternate;n!==null&&(n.lanes=De(n.lanes,t)),n===null&&(e.flags&(Qe|fn))!==X&&ph(e);for(var a=e,r=e.return;r!==null;)r.childLanes=De(r.childLanes,t),n=r.alternate,n!==null?n.childLanes=De(n.childLanes,t):(r.flags&(Qe|fn))!==X&&ph(e),a=r,r=r.return;if(a.tag===oe){var i=a.stateNode;return i}else return null}var vp=0,pp=1,ho=2,Fc=3,yo=!1,Bc,go;Bc=!1,go=null;function Vc(e){var t={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:L},effects:null};e.updateQueue=t}function mp(e,t){var n=t.updateQueue,a=e.updateQueue;if(n===a){var r={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects};t.updateQueue=r}}function Gr(e,t){var n={eventTime:e,lane:t,tag:vp,payload:null,callback:null,next:null};return n}function si(e,t,n){var a=e.updateQueue;if(a===null)return null;var r=a.shared;if(go===r&&!Bc&&(h("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."),Bc=!0),PE()){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,zb(e,n)}else return Mb(e,r,t,n)}function bo(e,t,n){var a=t.updateQueue;if(a!==null){var r=a.shared;if(Nv(n)){var i=r.lanes;i=Mv(i,e.pendingLanes);var u=De(i,n);r.lanes=u,Sc(e,u)}}}function wc(e,t){var n=e.updateQueue,a=e.alternate;if(a!==null){var r=a.updateQueue;if(n===r){var i=null,u=null,o=n.firstBaseUpdate;if(o!==null){var s=o;do{var f={eventTime:s.eventTime,lane:s.lane,tag:s.tag,payload:s.payload,callback:s.callback,next:null};u===null?i=u=f:(u.next=f,u=f),s=s.next}while(s!==null);u===null?i=u=t:(u.next=t,u=t)}else i=u=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:u,shared:r.shared,effects:r.effects},e.updateQueue=n;return}}var m=n.lastBaseUpdate;m===null?n.firstBaseUpdate=t:m.next=t,n.lastBaseUpdate=t}function Ab(e,t,n,a,r,i){switch(n.tag){case pp:{var u=n.payload;if(typeof u=="function"){sp();var o=u.call(i,a,r);{if(e.mode&wt){rn(!0);try{u.call(i,a,r)}finally{rn(!1)}}cp()}return o}return u}case Fc:e.flags=e.flags&~Ct|He;case vp:{var s=n.payload,f;if(typeof s=="function"){sp(),f=s.call(i,a,r);{if(e.mode&wt){rn(!0);try{s.call(i,a,r)}finally{rn(!1)}}cp()}}else f=s;return f==null?a:K({},a,f)}case ho:return yo=!0,a}return a}function So(e,t,n,a){var r=e.updateQueue;yo=!1,go=r.shared;var i=r.firstBaseUpdate,u=r.lastBaseUpdate,o=r.shared.pending;if(o!==null){r.shared.pending=null;var s=o,f=s.next;s.next=null,u===null?i=f:u.next=f,u=s;var m=e.alternate;if(m!==null){var b=m.updateQueue,C=b.lastBaseUpdate;C!==u&&(C===null?b.firstBaseUpdate=f:C.next=f,b.lastBaseUpdate=s)}}if(i!==null){var M=r.baseState,H=L,z=null,ee=null,ve=null,ie=i;do{var Ze=ie.lane,we=ie.eventTime;if(iu(a,Ze)){if(ve!==null){var O={eventTime:we,lane:tn,tag:ie.tag,payload:ie.payload,callback:ie.callback,next:null};ve=ve.next=O}M=Ab(e,r,ie,M,t,n);var S=ie.callback;if(S!==null&&ie.lane!==tn){e.flags|=Pa;var F=r.effects;F===null?r.effects=[ie]:F.push(ie)}}else{var E={eventTime:we,lane:Ze,tag:ie.tag,payload:ie.payload,callback:ie.callback,next:null};ve===null?(ee=ve=E,z=M):ve=ve.next=E,H=De(H,Ze)}if(ie=ie.next,ie===null){if(o=r.shared.pending,o===null)break;var $=o,k=$.next;$.next=null,ie=k,r.lastBaseUpdate=$,r.shared.pending=null}}while(!0);ve===null&&(z=M),r.baseState=z,r.firstBaseUpdate=ee,r.lastBaseUpdate=ve;var Ve=r.shared.interleaved;if(Ve!==null){var he=Ve;do H=De(H,he.lane),he=he.next;while(he!==Ve)}else i===null&&(r.shared.lanes=L);Ml(H),e.lanes=H,e.memoizedState=M}go=null}function Hb(e,t){if(typeof e!="function")throw new Error("Invalid argument passed as callback. Expected a function. Instead "+("received: "+e));e.call(t)}function hp(){yo=!1}function Eo(){return yo}function yp(e,t,n){var a=t.effects;if(t.effects=null,a!==null)for(var r=0;r<a.length;r++){var i=a[r],u=i.callback;u!==null&&(i.callback=null,Hb(u,n))}}var Yc={},gp=new R.Component().refs,qc,Qc,Gc,Pc,Kc,bp,To,Wc,kc,Xc;{qc=new Set,Qc=new Set,Gc=new Set,Pc=new Set,Wc=new Set,Kc=new Set,kc=new Set,Xc=new Set;var Sp=new Set;To=function(e,t){if(!(e===null||typeof e=="function")){var n=t+"_"+e;Sp.has(n)||(Sp.add(n),h("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.",t,e))}},bp=function(e,t){if(t===void 0){var n=ne(e)||"Component";Kc.has(n)||(Kc.add(n),h("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.",n))}},Object.defineProperty(Yc,"_processChildContext",{enumerable:!1,value:function(){throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).")}}),Object.freeze(Yc)}function Jc(e,t,n,a){var r=e.memoizedState,i=n(a,r);{if(e.mode&wt){rn(!0);try{i=n(a,r)}finally{rn(!1)}}bp(t,i)}var u=i==null?r:K({},r,i);if(e.memoizedState=u,e.lanes===L){var o=e.updateQueue;o.baseState=u}}var Zc={isMounted:Wi,enqueueSetState:function(e,t,n){var a=ye(e),r=An(),i=hi(a),u=Gr(r,i);u.payload=t,n!=null&&(To(n,"setState"),u.callback=n);var o=si(a,u,i);o!==null&&(Qt(o,a,i,r),bo(o,a,i)),Tc(a,i)},enqueueReplaceState:function(e,t,n){var a=ye(e),r=An(),i=hi(a),u=Gr(r,i);u.tag=pp,u.payload=t,n!=null&&(To(n,"replaceState"),u.callback=n);var o=si(a,u,i);o!==null&&(Qt(o,a,i,r),bo(o,a,i)),Tc(a,i)},enqueueForceUpdate:function(e,t){var n=ye(e),a=An(),r=hi(n),i=Gr(a,r);i.tag=ho,t!=null&&(To(t,"forceUpdate"),i.callback=t);var u=si(n,i,r);u!==null&&(Qt(u,n,r,a),bo(u,n,r)),$g(n,r)}};function Ep(e,t,n,a,r,i,u){var o=e.stateNode;if(typeof o.shouldComponentUpdate=="function"){var s=o.shouldComponentUpdate(a,i,u);{if(e.mode&wt){rn(!0);try{s=o.shouldComponentUpdate(a,i,u)}finally{rn(!1)}}s===void 0&&h("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.",ne(t)||"Component")}return s}return t.prototype&&t.prototype.isPureReactComponent?!oo(n,a)||!oo(r,i):!0}function Lb(e,t,n){var a=e.stateNode;{var r=ne(t)||"Component",i=a.render;i||(t.prototype&&typeof t.prototype.render=="function"?h("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?",r):h("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.",r)),a.getInitialState&&!a.getInitialState.isReactClassApproved&&!a.state&&h("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?",r),a.getDefaultProps&&!a.getDefaultProps.isReactClassApproved&&h("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.",r),a.propTypes&&h("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.",r),a.contextType&&h("contextType was defined as an instance property on %s. Use a static property to define contextType instead.",r),a.contextTypes&&h("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.",r),t.contextType&&t.contextTypes&&!kc.has(t)&&(kc.add(t),h("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.",r)),typeof a.componentShouldUpdate=="function"&&h("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",r),t.prototype&&t.prototype.isPureReactComponent&&typeof a.shouldComponentUpdate!="undefined"&&h("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.",ne(t)||"A pure component"),typeof a.componentDidUnmount=="function"&&h("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?",r),typeof a.componentDidReceiveProps=="function"&&h("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().",r),typeof a.componentWillRecieveProps=="function"&&h("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",r),typeof a.UNSAFE_componentWillRecieveProps=="function"&&h("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?",r);var u=a.props!==n;a.props!==void 0&&u&&h("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.",r,r),a.defaultProps&&h("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.",r,r),typeof a.getSnapshotBeforeUpdate=="function"&&typeof a.componentDidUpdate!="function"&&!Gc.has(t)&&(Gc.add(t),h("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.",ne(t))),typeof a.getDerivedStateFromProps=="function"&&h("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.",r),typeof a.getDerivedStateFromError=="function"&&h("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.",r),typeof t.getSnapshotBeforeUpdate=="function"&&h("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.",r);var o=a.state;o&&(typeof o!="object"||Pt(o))&&h("%s.state: must be set to an object or null",r),typeof a.getChildContext=="function"&&typeof t.childContextTypes!="object"&&h("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().",r)}}function Tp(e,t){t.updater=Zc,e.stateNode=t,nt(t,e),t._reactInternalInstance=Yc}function Rp(e,t,n){var a=!1,r=ya,i=ya,u=t.contextType;if("contextType"in t){var o=u===null||u!==void 0&&u.$$typeof===Dn&&u._context===void 0;if(!o&&!Xc.has(t)){Xc.add(t);var s="";u===void 0?s=" However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file.":typeof u!="object"?s=" However, it is set to a "+typeof u+".":u.$$typeof===sn?s=" Did you accidentally pass the Context.Provider instead?":u._context!==void 0?s=" Did you accidentally pass the Context.Consumer instead?":s=" However, it is set to an object with keys {"+Object.keys(u).join(", ")+"}.",h("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s",ne(t)||"Component",s)}}if(typeof u=="object"&&u!==null)i=Yt(u);else{r=$i(e,t,!0);var f=t.contextTypes;a=f!=null,i=a?eu(e,r):ya}var m=new t(n,i);if(e.mode&wt){rn(!0);try{m=new t(n,i)}finally{rn(!1)}}var b=e.memoizedState=m.state!==null&&m.state!==void 0?m.state:null;Tp(e,m);{if(typeof t.getDerivedStateFromProps=="function"&&b===null){var C=ne(t)||"Component";Qc.has(C)||(Qc.add(C),h("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.",C,m.state===null?"null":"undefined",C))}if(typeof t.getDerivedStateFromProps=="function"||typeof m.getSnapshotBeforeUpdate=="function"){var M=null,H=null,z=null;if(typeof m.componentWillMount=="function"&&m.componentWillMount.__suppressDeprecationWarning!==!0?M="componentWillMount":typeof m.UNSAFE_componentWillMount=="function"&&(M="UNSAFE_componentWillMount"),typeof m.componentWillReceiveProps=="function"&&m.componentWillReceiveProps.__suppressDeprecationWarning!==!0?H="componentWillReceiveProps":typeof m.UNSAFE_componentWillReceiveProps=="function"&&(H="UNSAFE_componentWillReceiveProps"),typeof m.componentWillUpdate=="function"&&m.componentWillUpdate.__suppressDeprecationWarning!==!0?z="componentWillUpdate":typeof m.UNSAFE_componentWillUpdate=="function"&&(z="UNSAFE_componentWillUpdate"),M!==null||H!==null||z!==null){var ee=ne(t)||"Component",ve=typeof t.getDerivedStateFromProps=="function"?"getDerivedStateFromProps()":"getSnapshotBeforeUpdate()";Pc.has(ee)||(Pc.add(ee),h(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`,ee,ve,M!==null?`
  `+M:"",H!==null?`
  `+H:"",z!==null?`
  `+z:""))}}}return a&&Sv(e,r,i),m}function jb(e,t){var n=t.state;typeof t.componentWillMount=="function"&&t.componentWillMount(),typeof t.UNSAFE_componentWillMount=="function"&&t.UNSAFE_componentWillMount(),n!==t.state&&(h("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",Z(e)||"Component"),Zc.enqueueReplaceState(t,t.state,null))}function Cp(e,t,n,a){var r=t.state;if(typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,a),t.state!==r){{var i=Z(e)||"Component";qc.has(i)||(qc.add(i),h("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",i))}Zc.enqueueReplaceState(t,t.state,null)}}function Ic(e,t,n,a){Lb(e,t,n);var r=e.stateNode;r.props=n,r.state=e.memoizedState,r.refs=gp,Vc(e);var i=t.contextType;if(typeof i=="object"&&i!==null)r.context=Yt(i);else{var u=$i(e,t,!0);r.context=eu(e,u)}{if(r.state===n){var o=ne(t)||"Component";Wc.has(o)||(Wc.add(o),h("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.",o))}e.mode&wt&&er.recordLegacyContextWarning(e,r),er.recordUnsafeLifecycleWarnings(e,r)}r.state=e.memoizedState;var s=t.getDerivedStateFromProps;if(typeof s=="function"&&(Jc(e,t,s,n),r.state=e.memoizedState),typeof t.getDerivedStateFromProps!="function"&&typeof r.getSnapshotBeforeUpdate!="function"&&(typeof r.UNSAFE_componentWillMount=="function"||typeof r.componentWillMount=="function")&&(jb(e,r),So(e,n,r,a),r.state=e.memoizedState),typeof r.componentDidMount=="function"){var f=se;f|=ae,(e.mode&pr)!==de&&(f|=Oe),e.flags|=f}}function Fb(e,t,n,a){var r=e.stateNode,i=e.memoizedProps;r.props=i;var u=r.context,o=t.contextType,s=ya;if(typeof o=="object"&&o!==null)s=Yt(o);else{var f=$i(e,t,!0);s=eu(e,f)}var m=t.getDerivedStateFromProps,b=typeof m=="function"||typeof r.getSnapshotBeforeUpdate=="function";!b&&(typeof r.UNSAFE_componentWillReceiveProps=="function"||typeof r.componentWillReceiveProps=="function")&&(i!==n||u!==s)&&Cp(e,r,n,s),hp();var C=e.memoizedState,M=r.state=C;if(So(e,n,r,a),M=e.memoizedState,i===n&&C===M&&!kl()&&!Eo()){if(typeof r.componentDidMount=="function"){var H=se;H|=ae,(e.mode&pr)!==de&&(H|=Oe),e.flags|=H}return!1}typeof m=="function"&&(Jc(e,t,m,n),M=e.memoizedState);var z=Eo()||Ep(e,t,i,n,C,M,s);if(z){if(!b&&(typeof r.UNSAFE_componentWillMount=="function"||typeof r.componentWillMount=="function")&&(typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount()),typeof r.componentDidMount=="function"){var ee=se;ee|=ae,(e.mode&pr)!==de&&(ee|=Oe),e.flags|=ee}}else{if(typeof r.componentDidMount=="function"){var ve=se;ve|=ae,(e.mode&pr)!==de&&(ve|=Oe),e.flags|=ve}e.memoizedProps=n,e.memoizedState=M}return r.props=n,r.state=M,r.context=s,z}function Bb(e,t,n,a,r){var i=t.stateNode;mp(e,t);var u=t.memoizedProps,o=t.type===t.elementType?u:tr(t.type,u);i.props=o;var s=t.pendingProps,f=i.context,m=n.contextType,b=ya;if(typeof m=="object"&&m!==null)b=Yt(m);else{var C=$i(t,n,!0);b=eu(t,C)}var M=n.getDerivedStateFromProps,H=typeof M=="function"||typeof i.getSnapshotBeforeUpdate=="function";!H&&(typeof i.UNSAFE_componentWillReceiveProps=="function"||typeof i.componentWillReceiveProps=="function")&&(u!==s||f!==b)&&Cp(t,i,a,b),hp();var z=t.memoizedState,ee=i.state=z;if(So(t,a,i,r),ee=t.memoizedState,u===s&&z===ee&&!kl()&&!Eo()&&!qe)return typeof i.componentDidUpdate=="function"&&(u!==e.memoizedProps||z!==e.memoizedState)&&(t.flags|=se),typeof i.getSnapshotBeforeUpdate=="function"&&(u!==e.memoizedProps||z!==e.memoizedState)&&(t.flags|=Gt),!1;typeof M=="function"&&(Jc(t,n,M,a),ee=t.memoizedState);var ve=Eo()||Ep(t,n,o,a,z,ee,b)||qe;return ve?(!H&&(typeof i.UNSAFE_componentWillUpdate=="function"||typeof i.componentWillUpdate=="function")&&(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,ee,b),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,ee,b)),typeof i.componentDidUpdate=="function"&&(t.flags|=se),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=Gt)):(typeof i.componentDidUpdate=="function"&&(u!==e.memoizedProps||z!==e.memoizedState)&&(t.flags|=se),typeof i.getSnapshotBeforeUpdate=="function"&&(u!==e.memoizedProps||z!==e.memoizedState)&&(t.flags|=Gt),t.memoizedProps=a,t.memoizedState=ee),i.props=a,i.state=ee,i.context=b,ve}var $c,ef,tf,nf,af,xp=function(e,t){};$c=!1,ef=!1,tf={},nf={},af={},xp=function(e,t){if(!(e===null||typeof e!="object")&&!(!e._store||e._store.validated||e.key!=null)){if(typeof e._store!="object")throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");e._store.validated=!0;var n=Z(t)||"Component";nf[n]||(nf[n]=!0,h('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'))}};function al(e,t,n){var a=n.ref;if(a!==null&&typeof a!="function"&&typeof a!="object"){if((e.mode&wt||_e)&&!(n._owner&&n._self&&n._owner.stateNode!==n._self)){var r=Z(e)||"Component";tf[r]||(h('A string ref, "%s", has been found within a strict mode tree. String refs are a source of potential bugs and should be avoided. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',a),tf[r]=!0)}if(n._owner){var i=n._owner,u;if(i){var o=i;if(o.tag!==ge)throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");u=o.stateNode}if(!u)throw new Error("Missing owner for string ref "+a+". This error is likely caused by a bug in React. Please file an issue.");var s=u;Db(a,"ref");var f=""+a;if(t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===f)return t.ref;var m=function(b){var C=s.refs;C===gp&&(C=s.refs={}),b===null?delete C[f]:C[f]=b};return m._stringRef=f,m}else{if(typeof a!="string")throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");if(!n._owner)throw new Error("Element ref was specified as a string ("+a+`) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`)}}return a}function Ro(e,t){var n=Object.prototype.toString.call(t);throw new Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.")}function Co(e){{var t=Z(e)||"Component";if(af[t])return;af[t]=!0,h("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.")}}function Dp(e){var t=e._payload,n=e._init;return n(t)}function _p(e){function t(E,O){if(e){var S=E.deletions;S===null?(E.deletions=[O],E.flags|=Bt):S.push(O)}}function n(E,O){if(!e)return null;for(var S=O;S!==null;)t(E,S),S=S.sibling;return null}function a(E,O){for(var S=new Map,F=O;F!==null;)F.key!==null?S.set(F.key,F):S.set(F.index,F),F=F.sibling;return S}function r(E,O){var S=Ki(E,O);return S.index=0,S.sibling=null,S}function i(E,O,S){if(E.index=S,!e)return E.flags|=U,O;var F=E.alternate;if(F!==null){var $=F.index;return $<O?(E.flags|=Qe,O):$}else return E.flags|=Qe,O}function u(E){return e&&E.alternate===null&&(E.flags|=Qe),E}function o(E,O,S,F){if(O===null||O.tag!==be){var $=Ld(S,E.mode,F);return $.return=E,$}else{var k=r(O,S);return k.return=E,k}}function s(E,O,S,F){var $=S.type;if($===Bn)return m(E,O,S.props.children,F,S.key);if(O!==null&&(O.elementType===$||gh(O,S)||typeof $=="object"&&$!==null&&$.$$typeof===rt&&Dp($)===O.type)){var k=r(O,S.props);return k.ref=al(E,O,S),k.return=E,k._debugSource=S._source,k._debugOwner=S._owner,k}var Ve=Hd(S,E.mode,F);return Ve.ref=al(E,O,S),Ve.return=E,Ve}function f(E,O,S,F){if(O===null||O.tag!==Me||O.stateNode.containerInfo!==S.containerInfo||O.stateNode.implementation!==S.implementation){var $=jd(S,E.mode,F);return $.return=E,$}else{var k=r(O,S.children||[]);return k.return=E,k}}function m(E,O,S,F,$){if(O===null||O.tag!==xe){var k=gi(S,E.mode,F,$);return k.return=E,k}else{var Ve=r(O,S);return Ve.return=E,Ve}}function b(E,O,S){if(typeof O=="string"&&O!==""||typeof O=="number"){var F=Ld(""+O,E.mode,S);return F.return=E,F}if(typeof O=="object"&&O!==null){switch(O.$$typeof){case ln:{var $=Hd(O,E.mode,S);return $.ref=al(E,null,O),$.return=E,$}case on:{var k=jd(O,E.mode,S);return k.return=E,k}case rt:{var Ve=O._payload,he=O._init;return b(E,he(Ve),S)}}if(Pt(O)||q(O)){var We=gi(O,E.mode,S,null);return We.return=E,We}Ro(E,O)}return typeof O=="function"&&Co(E),null}function C(E,O,S,F){var $=O!==null?O.key:null;if(typeof S=="string"&&S!==""||typeof S=="number")return $!==null?null:o(E,O,""+S,F);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case ln:return S.key===$?s(E,O,S,F):null;case on:return S.key===$?f(E,O,S,F):null;case rt:{var k=S._payload,Ve=S._init;return C(E,O,Ve(k),F)}}if(Pt(S)||q(S))return $!==null?null:m(E,O,S,F,null);Ro(E,S)}return typeof S=="function"&&Co(E),null}function M(E,O,S,F,$){if(typeof F=="string"&&F!==""||typeof F=="number"){var k=E.get(S)||null;return o(O,k,""+F,$)}if(typeof F=="object"&&F!==null){switch(F.$$typeof){case ln:{var Ve=E.get(F.key===null?S:F.key)||null;return s(O,Ve,F,$)}case on:{var he=E.get(F.key===null?S:F.key)||null;return f(O,he,F,$)}case rt:var We=F._payload,je=F._init;return M(E,O,S,je(We),$)}if(Pt(F)||q(F)){var dt=E.get(S)||null;return m(O,dt,F,$,null)}Ro(O,F)}return typeof F=="function"&&Co(O),null}function H(E,O,S){{if(typeof E!="object"||E===null)return O;switch(E.$$typeof){case ln:case on:xp(E,S);var F=E.key;if(typeof F!="string")break;if(O===null){O=new Set,O.add(F);break}if(!O.has(F)){O.add(F);break}h("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted \u2014 the behavior is unsupported and could change in a future version.",F);break;case rt:var $=E._payload,k=E._init;H(k($),O,S);break}}return O}function z(E,O,S,F){for(var $=null,k=0;k<S.length;k++){var Ve=S[k];$=H(Ve,$,E)}for(var he=null,We=null,je=O,dt=0,le=0,Nt=null;je!==null&&le<S.length;le++){je.index>le?(Nt=je,je=null):Nt=je.sibling;var Hn=C(E,je,S[le],F);if(Hn===null){je===null&&(je=Nt);break}e&&je&&Hn.alternate===null&&t(E,je),dt=i(Hn,dt,le),We===null?he=Hn:We.sibling=Hn,We=Hn,je=Nt}if(le===S.length){if(n(E,je),hn()){var Tn=le;Hi(E,Tn)}return he}if(je===null){for(;le<S.length;le++){var Ra=b(E,S[le],F);Ra!==null&&(dt=i(Ra,dt,le),We===null?he=Ra:We.sibling=Ra,We=Ra)}if(hn()){var Wn=le;Hi(E,Wn)}return he}for(var kn=a(E,je);le<S.length;le++){var Ln=M(kn,E,le,S[le],F);Ln!==null&&(e&&Ln.alternate!==null&&kn.delete(Ln.key===null?le:Ln.key),dt=i(Ln,dt,le),We===null?he=Ln:We.sibling=Ln,We=Ln)}if(e&&kn.forEach(function(Nu){return t(E,Nu)}),hn()){var kr=le;Hi(E,kr)}return he}function ee(E,O,S,F){var $=q(S);if(typeof $!="function")throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");{typeof Symbol=="function"&&S[Symbol.toStringTag]==="Generator"&&(ef||h("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."),ef=!0),S.entries===$&&($c||h("Using Maps as children is not supported. Use an array of keyed ReactElements instead."),$c=!0);var k=$.call(S);if(k)for(var Ve=null,he=k.next();!he.done;he=k.next()){var We=he.value;Ve=H(We,Ve,E)}}var je=$.call(S);if(je==null)throw new Error("An iterable object provided no iterator.");for(var dt=null,le=null,Nt=O,Hn=0,Tn=0,Ra=null,Wn=je.next();Nt!==null&&!Wn.done;Tn++,Wn=je.next()){Nt.index>Tn?(Ra=Nt,Nt=null):Ra=Nt.sibling;var kn=C(E,Nt,Wn.value,F);if(kn===null){Nt===null&&(Nt=Ra);break}e&&Nt&&kn.alternate===null&&t(E,Nt),Hn=i(kn,Hn,Tn),le===null?dt=kn:le.sibling=kn,le=kn,Nt=Ra}if(Wn.done){if(n(E,Nt),hn()){var Ln=Tn;Hi(E,Ln)}return dt}if(Nt===null){for(;!Wn.done;Tn++,Wn=je.next()){var kr=b(E,Wn.value,F);kr!==null&&(Hn=i(kr,Hn,Tn),le===null?dt=kr:le.sibling=kr,le=kr)}if(hn()){var Nu=Tn;Hi(E,Nu)}return dt}for(var Hl=a(E,Nt);!Wn.done;Tn++,Wn=je.next()){var Ur=M(Hl,E,Tn,Wn.value,F);Ur!==null&&(e&&Ur.alternate!==null&&Hl.delete(Ur.key===null?Tn:Ur.key),Hn=i(Ur,Hn,Tn),le===null?dt=Ur:le.sibling=Ur,le=Ur)}if(e&&Hl.forEach(function(aR){return t(E,aR)}),hn()){var nR=Tn;Hi(E,nR)}return dt}function ve(E,O,S,F){if(O!==null&&O.tag===be){n(E,O.sibling);var $=r(O,S);return $.return=E,$}n(E,O);var k=Ld(S,E.mode,F);return k.return=E,k}function ie(E,O,S,F){for(var $=S.key,k=O;k!==null;){if(k.key===$){var Ve=S.type;if(Ve===Bn){if(k.tag===xe){n(E,k.sibling);var he=r(k,S.props.children);return he.return=E,he._debugSource=S._source,he._debugOwner=S._owner,he}}else if(k.elementType===Ve||gh(k,S)||typeof Ve=="object"&&Ve!==null&&Ve.$$typeof===rt&&Dp(Ve)===k.type){n(E,k.sibling);var We=r(k,S.props);return We.ref=al(E,k,S),We.return=E,We._debugSource=S._source,We._debugOwner=S._owner,We}n(E,k);break}else t(E,k);k=k.sibling}if(S.type===Bn){var je=gi(S.props.children,E.mode,F,S.key);return je.return=E,je}else{var dt=Hd(S,E.mode,F);return dt.ref=al(E,O,S),dt.return=E,dt}}function Ze(E,O,S,F){for(var $=S.key,k=O;k!==null;){if(k.key===$)if(k.tag===Me&&k.stateNode.containerInfo===S.containerInfo&&k.stateNode.implementation===S.implementation){n(E,k.sibling);var Ve=r(k,S.children||[]);return Ve.return=E,Ve}else{n(E,k);break}else t(E,k);k=k.sibling}var he=jd(S,E.mode,F);return he.return=E,he}function we(E,O,S,F){var $=typeof S=="object"&&S!==null&&S.type===Bn&&S.key===null;if($&&(S=S.props.children),typeof S=="object"&&S!==null){switch(S.$$typeof){case ln:return u(ie(E,O,S,F));case on:return u(Ze(E,O,S,F));case rt:var k=S._payload,Ve=S._init;return we(E,O,Ve(k),F)}if(Pt(S))return z(E,O,S,F);if(q(S))return ee(E,O,S,F);Ro(E,S)}return typeof S=="string"&&S!==""||typeof S=="number"?u(ve(E,O,""+S,F)):(typeof S=="function"&&Co(E),n(E,O))}return we}var vu=_p(!0),Op=_p(!1);function Vb(e,t){if(e!==null&&t.child!==e.child)throw new Error("Resuming work not yet implemented.");if(t.child!==null){var n=t.child,a=Ki(n,n.pendingProps);for(t.child=a,a.return=t;n.sibling!==null;)n=n.sibling,a=a.sibling=Ki(n,n.pendingProps),a.return=t;a.sibling=null}}function wb(e,t){for(var n=e.child;n!==null;)zT(n,t),n=n.sibling}var rl={},ci=ui(rl),il=ui(rl),xo=ui(rl);function Do(e){if(e===rl)throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");return e}function rf(){var e=Do(xo.current);return e}function uf(e,t){vn(xo,t,e),vn(il,e,e),vn(ci,rl,e);var n=xi(t);Mn(ci,e),vn(ci,n,e)}function pu(e){Mn(ci,e),Mn(il,e),Mn(xo,e)}function ul(){var e=Do(ci.current);return e}function Np(e){var t=Do(xo.current),n=Do(ci.current),a=ki(n,e.type,t);n!==a&&(vn(il,e,e),vn(ci,a,e))}function lf(e){il.current===e&&(Mn(ci,e),Mn(il,e))}var Yb=0,Up=1,Mp=1,ll=2,nr=ui(Yb);function of(e,t){return(e&t)!==0}function mu(e){return e&Up}function sf(e,t){return e&Up|t}function qb(e,t){return e|t}function fi(e,t){vn(nr,t,e)}function hu(e){Mn(nr,e)}function Qb(e,t){var n=e.memoizedState;if(n!==null)return n.dehydrated!==null;var a=e.memoizedProps;return!0}function _o(e){for(var t=e;t!==null;){if(t.tag===Fe){var n=t.memoizedState;if(n!==null){var a=n.dehydrated;if(a===null||Vt(a)||ri(a))return t}}else if(t.tag===bt&&t.memoizedProps.revealOrder!==void 0){var r=(t.flags&He)!==X;if(r)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)return null;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var aa=0,Kt=1,Sr=2,Wt=4,yn=8,cf=[];function ff(){for(var e=0;e<cf.length;e++){var t=cf[e];fr?t._workInProgressVersionPrimary=null:t._workInProgressVersionSecondary=null}cf.length=0}function Gb(e,t){var n=t._getVersion,a=n(t._source);e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[t,a]:e.mutableSourceEagerHydrationData.push(t,a)}var W=A.ReactCurrentDispatcher,ol=A.ReactCurrentBatchConfig,df,yu;df=new Set;var Vi=L,tt=null,kt=null,Xt=null,Oo=!1,sl=!1,cl=0,Pb=0,Kb=25,N=null,Va=null,di=-1,vf=!1;function Je(){{var e=N;Va===null?Va=[e]:Va.push(e)}}function G(){{var e=N;Va!==null&&(di++,Va[di]!==e&&Wb(e))}}function gu(e){e!=null&&!Pt(e)&&h("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.",N,typeof e)}function Wb(e){{var t=Z(tt);if(!df.has(t)&&(df.add(t),Va!==null)){for(var n="",a=30,r=0;r<=di;r++){for(var i=Va[r],u=r===di?e:i,o=r+1+". "+i;o.length<a;)o+=" ";o+=u+`
`,n+=o}h(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`,t,n)}}}function zn(){throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`)}function pf(e,t){if(vf)return!1;if(t===null)return h("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.",N),!1;e.length!==t.length&&h(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`,N,"["+t.join(", ")+"]","["+e.join(", ")+"]");for(var n=0;n<t.length&&n<e.length;n++)if(!Sa(e[n],t[n]))return!1;return!0}function bu(e,t,n,a,r,i){Vi=i,tt=t,Va=e!==null?e._debugHookTypes:null,di=-1,vf=e!==null&&e.type!==t.type,t.memoizedState=null,t.updateQueue=null,t.lanes=L,e!==null&&e.memoizedState!==null?W.current=$p:Va!==null?W.current=Ip:W.current=Zp;var u=n(a,r);if(sl){var o=0;do{if(sl=!1,cl=0,o>=Kb)throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");o+=1,vf=!1,kt=null,Xt=null,t.updateQueue=null,di=-1,W.current=em,u=n(a,r)}while(sl)}W.current=Yo,t._debugHookTypes=Va;var s=kt!==null&&kt.next!==null;if(Vi=L,tt=null,kt=null,Xt=null,N=null,Va=null,di=-1,e!==null&&(e.flags&ct)!==(t.flags&ct)&&(e.mode&Ge)!==de&&h("Internal React error: Expected static flag was missing. Please notify the React team."),Oo=!1,s)throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");return u}function Su(){var e=cl!==0;return cl=0,e}function zp(e,t,n){t.updateQueue=e.updateQueue,(t.mode&pr)!==de?t.flags&=~(Ce|Oe|At|se):t.flags&=~(At|se),e.lanes=no(e.lanes,n)}function Ap(){if(W.current=Yo,Oo){for(var e=tt.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Oo=!1}Vi=L,tt=null,kt=null,Xt=null,Va=null,di=-1,N=null,Kp=!1,sl=!1,cl=0}function Er(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Xt===null?tt.memoizedState=Xt=e:Xt=Xt.next=e,Xt}function wa(){var e;if(kt===null){var t=tt.alternate;t!==null?e=t.memoizedState:e=null}else e=kt.next;var n;if(Xt===null?n=tt.memoizedState:n=Xt.next,n!==null)Xt=n,n=Xt.next,kt=e;else{if(e===null)throw new Error("Rendered more hooks than during the previous render.");kt=e;var a={memoizedState:kt.memoizedState,baseState:kt.baseState,baseQueue:kt.baseQueue,queue:kt.queue,next:null};Xt===null?tt.memoizedState=Xt=a:Xt=Xt.next=a}return Xt}function Hp(){return{lastEffect:null,stores:null}}function mf(e,t){return typeof t=="function"?t(e):t}function hf(e,t,n){var a=Er(),r;n!==void 0?r=n(t):r=t,a.memoizedState=a.baseState=r;var i={pending:null,interleaved:null,lanes:L,dispatch:null,lastRenderedReducer:e,lastRenderedState:r};a.queue=i;var u=i.dispatch=Zb.bind(null,tt,i);return[a.memoizedState,u]}function yf(e,t,n){var a=wa(),r=a.queue;if(r===null)throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");r.lastRenderedReducer=e;var i=kt,u=i.baseQueue,o=r.pending;if(o!==null){if(u!==null){var s=u.next,f=o.next;u.next=f,o.next=s}i.baseQueue!==u&&h("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."),i.baseQueue=u=o,r.pending=null}if(u!==null){var m=u.next,b=i.baseState,C=null,M=null,H=null,z=m;do{var ee=z.lane;if(iu(Vi,ee)){if(H!==null){var ie={lane:tn,action:z.action,hasEagerState:z.hasEagerState,eagerState:z.eagerState,next:null};H=H.next=ie}if(z.hasEagerState)b=z.eagerState;else{var Ze=z.action;b=e(b,Ze)}}else{var ve={lane:ee,action:z.action,hasEagerState:z.hasEagerState,eagerState:z.eagerState,next:null};H===null?(M=H=ve,C=b):H=H.next=ve,tt.lanes=De(tt.lanes,ee),Ml(ee)}z=z.next}while(z!==null&&z!==m);H===null?C=b:H.next=M,Sa(b,a.memoizedState)||yl(),a.memoizedState=b,a.baseState=C,a.baseQueue=H,r.lastRenderedState=b}var we=r.interleaved;if(we!==null){var E=we;do{var O=E.lane;tt.lanes=De(tt.lanes,O),Ml(O),E=E.next}while(E!==we)}else u===null&&(r.lanes=L);var S=r.dispatch;return[a.memoizedState,S]}function gf(e,t,n){var a=wa(),r=a.queue;if(r===null)throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");r.lastRenderedReducer=e;var i=r.dispatch,u=r.pending,o=a.memoizedState;if(u!==null){r.pending=null;var s=u.next,f=s;do{var m=f.action;o=e(o,m),f=f.next}while(f!==s);Sa(o,a.memoizedState)||yl(),a.memoizedState=o,a.baseQueue===null&&(a.baseState=o),r.lastRenderedState=o}return[o,i]}function _R(e,t,n){}function OR(e,t,n){}function bf(e,t,n){var a=tt,r=Er(),i,u=hn();if(u){if(n===void 0)throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");i=n(),yu||i!==n()&&(h("The result of getServerSnapshot should be cached to avoid an infinite loop"),yu=!0)}else{if(i=t(),!yu){var o=t();Sa(i,o)||(h("The result of getSnapshot should be cached to avoid an infinite loop"),yu=!0)}var s=ms();if(s===null)throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");to(s,Vi)||Lp(a,t,i)}r.memoizedState=i;var f={value:i,getSnapshot:t};return r.queue=f,Ao(Fp.bind(null,a,f,e),[e]),a.flags|=At,fl(Kt|yn,jp.bind(null,a,f,i,t),void 0,null),i}function No(e,t,n){var a=tt,r=wa(),i=t();if(!yu){var u=t();Sa(i,u)||(h("The result of getSnapshot should be cached to avoid an infinite loop"),yu=!0)}var o=r.memoizedState,s=!Sa(o,i);s&&(r.memoizedState=i,yl());var f=r.queue;if(vl(Fp.bind(null,a,f,e),[e]),f.getSnapshot!==t||s||Xt!==null&&Xt.memoizedState.tag&Kt){a.flags|=At,fl(Kt|yn,jp.bind(null,a,f,i,t),void 0,null);var m=ms();if(m===null)throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");to(m,Vi)||Lp(a,t,i)}return i}function Lp(e,t,n){e.flags|=Da;var a={getSnapshot:t,value:n},r=tt.updateQueue;if(r===null)r=Hp(),tt.updateQueue=r,r.stores=[a];else{var i=r.stores;i===null?r.stores=[a]:i.push(a)}}function jp(e,t,n,a){t.value=n,t.getSnapshot=a,Bp(t)&&Vp(e)}function Fp(e,t,n){var a=function(){Bp(t)&&Vp(e)};return n(a)}function Bp(e){var t=e.getSnapshot,n=e.value;try{var a=t();return!Sa(n,a)}catch(r){return!0}}function Vp(e){var t=Gn(e,me);t!==null&&Qt(t,e,me,ht)}function Uo(e){var t=Er();typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e;var n={pending:null,interleaved:null,lanes:L,dispatch:null,lastRenderedReducer:mf,lastRenderedState:e};t.queue=n;var a=n.dispatch=Ib.bind(null,tt,n);return[t.memoizedState,a]}function Sf(e){return yf(mf)}function Ef(e){return gf(mf)}function fl(e,t,n,a){var r={tag:e,create:t,destroy:n,deps:a,next:null},i=tt.updateQueue;if(i===null)i=Hp(),tt.updateQueue=i,i.lastEffect=r.next=r;else{var u=i.lastEffect;if(u===null)i.lastEffect=r.next=r;else{var o=u.next;u.next=r,r.next=o,i.lastEffect=r}}return r}function Tf(e){var t=Er();{var n={current:e};return t.memoizedState=n,n}}function Mo(e){var t=wa();return t.memoizedState}function dl(e,t,n,a){var r=Er(),i=a===void 0?null:a;tt.flags|=e,r.memoizedState=fl(Kt|t,n,void 0,i)}function zo(e,t,n,a){var r=wa(),i=a===void 0?null:a,u=void 0;if(kt!==null){var o=kt.memoizedState;if(u=o.destroy,i!==null){var s=o.deps;if(pf(i,s)){r.memoizedState=fl(t,n,u,i);return}}}tt.flags|=e,r.memoizedState=fl(Kt|t,n,u,i)}function Ao(e,t){return(tt.mode&pr)!==de?dl(Ce|At|Le,yn,e,t):dl(At|Le,yn,e,t)}function vl(e,t){return zo(At,yn,e,t)}function Rf(e,t){return dl(se,Sr,e,t)}function Ho(e,t){return zo(se,Sr,e,t)}function Cf(e,t){var n=se;return n|=ae,(tt.mode&pr)!==de&&(n|=Oe),dl(n,Wt,e,t)}function Lo(e,t){return zo(se,Wt,e,t)}function wp(e,t){if(typeof t=="function"){var n=t,a=e();return n(a),function(){n(null)}}else if(t!=null){var r=t;r.hasOwnProperty("current")||h("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.","an object with keys {"+Object.keys(r).join(", ")+"}");var i=e();return r.current=i,function(){r.current=null}}}function xf(e,t,n){typeof t!="function"&&h("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",t!==null?typeof t:"null");var a=n!=null?n.concat([e]):null,r=se;return r|=ae,(tt.mode&pr)!==de&&(r|=Oe),dl(r,Wt,wp.bind(null,t,e),a)}function jo(e,t,n){typeof t!="function"&&h("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",t!==null?typeof t:"null");var a=n!=null?n.concat([e]):null;return zo(se,Wt,wp.bind(null,t,e),a)}function kb(e,t){}var Fo=kb;function Df(e,t){var n=Er(),a=t===void 0?null:t;return n.memoizedState=[e,a],e}function Bo(e,t){var n=wa(),a=t===void 0?null:t,r=n.memoizedState;if(r!==null&&a!==null){var i=r[1];if(pf(a,i))return r[0]}return n.memoizedState=[e,a],e}function _f(e,t){var n=Er(),a=t===void 0?null:t,r=e();return n.memoizedState=[r,a],r}function Vo(e,t){var n=wa(),a=t===void 0?null:t,r=n.memoizedState;if(r!==null&&a!==null){var i=r[1];if(pf(a,i))return r[0]}var u=e();return n.memoizedState=[u,a],u}function Of(e){var t=Er();return t.memoizedState=e,e}function Yp(e){var t=wa(),n=kt,a=n.memoizedState;return Qp(t,a,e)}function qp(e){var t=wa();if(kt===null)return t.memoizedState=e,e;var n=kt.memoizedState;return Qp(t,n,e)}function Qp(e,t,n){var a=!mg(Vi);if(a){if(!Sa(n,t)){var r=Uv();tt.lanes=De(tt.lanes,r),Ml(r),e.baseState=!0}return t}else return e.baseState&&(e.baseState=!1,yl()),e.memoizedState=n,n}function Xb(e,t,n){var a=Za();nn(Cg(a,Pu)),e(!0);var r=ol.transition;ol.transition={};var i=ol.transition;ol.transition._updatedFibers=new Set;try{e(!1),t()}finally{if(nn(a),ol.transition=r,r===null&&i._updatedFibers){var u=i._updatedFibers.size;u>10&&j("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."),i._updatedFibers.clear()}}}function Nf(){var e=Uo(!1),t=e[0],n=e[1],a=Xb.bind(null,n),r=Er();return r.memoizedState=a,[t,a]}function Gp(){var e=Sf(),t=e[0],n=wa(),a=n.memoizedState;return[t,a]}function Pp(){var e=Ef(),t=e[0],n=wa(),a=n.memoizedState;return[t,a]}var Kp=!1;function Jb(){return Kp}function Uf(){var e=Er(),t=ms(),n=t.identifierPrefix,a;if(hn()){var r=rb();a=":"+n+"R"+r;var i=cl++;i>0&&(a+="H"+i.toString(32)),a+=":"}else{var u=Pb++;a=":"+n+"r"+u.toString(32)+":"}return e.memoizedState=a,a}function wo(){var e=wa(),t=e.memoizedState;return t}function Zb(e,t,n){typeof arguments[3]=="function"&&h("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");var a=hi(e),r={lane:a,action:n,hasEagerState:!1,eagerState:null,next:null};if(Wp(e))kp(t,r);else{var i=dp(e,t,r,a);if(i!==null){var u=An();Qt(i,e,a,u),Xp(i,t,a)}}Jp(e,a)}function Ib(e,t,n){typeof arguments[3]=="function"&&h("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");var a=hi(e),r={lane:a,action:n,hasEagerState:!1,eagerState:null,next:null};if(Wp(e))kp(t,r);else{var i=e.alternate;if(e.lanes===L&&(i===null||i.lanes===L)){var u=t.lastRenderedReducer;if(u!==null){var o;o=W.current,W.current=ar;try{var s=t.lastRenderedState,f=u(s,n);if(r.hasEagerState=!0,r.eagerState=f,Sa(f,s)){Ub(e,t,r,a);return}}catch(C){}finally{W.current=o}}}var m=dp(e,t,r,a);if(m!==null){var b=An();Qt(m,e,a,b),Xp(m,t,a)}}Jp(e,a)}function Wp(e){var t=e.alternate;return e===tt||t!==null&&t===tt}function kp(e,t){sl=Oo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Xp(e,t,n){if(Nv(n)){var a=t.lanes;a=Mv(a,e.pendingLanes);var r=De(a,n);t.lanes=r,Sc(e,r)}}function Jp(e,t,n){Tc(e,t)}var Yo={readContext:Yt,useCallback:zn,useContext:zn,useEffect:zn,useImperativeHandle:zn,useInsertionEffect:zn,useLayoutEffect:zn,useMemo:zn,useReducer:zn,useRef:zn,useState:zn,useDebugValue:zn,useDeferredValue:zn,useTransition:zn,useMutableSource:zn,useSyncExternalStore:zn,useId:zn,unstable_isNewReconciler:Pe},Zp=null,Ip=null,$p=null,em=null,Tr=null,ar=null,qo=null;{var Mf=function(){h("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().")},Se=function(){h("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks")};Zp={readContext:function(e){return Yt(e)},useCallback:function(e,t){return N="useCallback",Je(),gu(t),Df(e,t)},useContext:function(e){return N="useContext",Je(),Yt(e)},useEffect:function(e,t){return N="useEffect",Je(),gu(t),Ao(e,t)},useImperativeHandle:function(e,t,n){return N="useImperativeHandle",Je(),gu(n),xf(e,t,n)},useInsertionEffect:function(e,t){return N="useInsertionEffect",Je(),gu(t),Rf(e,t)},useLayoutEffect:function(e,t){return N="useLayoutEffect",Je(),gu(t),Cf(e,t)},useMemo:function(e,t){N="useMemo",Je(),gu(t);var n=W.current;W.current=Tr;try{return _f(e,t)}finally{W.current=n}},useReducer:function(e,t,n){N="useReducer",Je();var a=W.current;W.current=Tr;try{return hf(e,t,n)}finally{W.current=a}},useRef:function(e){return N="useRef",Je(),Tf(e)},useState:function(e){N="useState",Je();var t=W.current;W.current=Tr;try{return Uo(e)}finally{W.current=t}},useDebugValue:function(e,t){return N="useDebugValue",Je(),void 0},useDeferredValue:function(e){return N="useDeferredValue",Je(),Of(e)},useTransition:function(){return N="useTransition",Je(),Nf()},useMutableSource:function(e,t,n){return N="useMutableSource",Je(),void 0},useSyncExternalStore:function(e,t,n){return N="useSyncExternalStore",Je(),bf(e,t,n)},useId:function(){return N="useId",Je(),Uf()},unstable_isNewReconciler:Pe},Ip={readContext:function(e){return Yt(e)},useCallback:function(e,t){return N="useCallback",G(),Df(e,t)},useContext:function(e){return N="useContext",G(),Yt(e)},useEffect:function(e,t){return N="useEffect",G(),Ao(e,t)},useImperativeHandle:function(e,t,n){return N="useImperativeHandle",G(),xf(e,t,n)},useInsertionEffect:function(e,t){return N="useInsertionEffect",G(),Rf(e,t)},useLayoutEffect:function(e,t){return N="useLayoutEffect",G(),Cf(e,t)},useMemo:function(e,t){N="useMemo",G();var n=W.current;W.current=Tr;try{return _f(e,t)}finally{W.current=n}},useReducer:function(e,t,n){N="useReducer",G();var a=W.current;W.current=Tr;try{return hf(e,t,n)}finally{W.current=a}},useRef:function(e){return N="useRef",G(),Tf(e)},useState:function(e){N="useState",G();var t=W.current;W.current=Tr;try{return Uo(e)}finally{W.current=t}},useDebugValue:function(e,t){return N="useDebugValue",G(),void 0},useDeferredValue:function(e){return N="useDeferredValue",G(),Of(e)},useTransition:function(){return N="useTransition",G(),Nf()},useMutableSource:function(e,t,n){return N="useMutableSource",G(),void 0},useSyncExternalStore:function(e,t,n){return N="useSyncExternalStore",G(),bf(e,t,n)},useId:function(){return N="useId",G(),Uf()},unstable_isNewReconciler:Pe},$p={readContext:function(e){return Yt(e)},useCallback:function(e,t){return N="useCallback",G(),Bo(e,t)},useContext:function(e){return N="useContext",G(),Yt(e)},useEffect:function(e,t){return N="useEffect",G(),vl(e,t)},useImperativeHandle:function(e,t,n){return N="useImperativeHandle",G(),jo(e,t,n)},useInsertionEffect:function(e,t){return N="useInsertionEffect",G(),Ho(e,t)},useLayoutEffect:function(e,t){return N="useLayoutEffect",G(),Lo(e,t)},useMemo:function(e,t){N="useMemo",G();var n=W.current;W.current=ar;try{return Vo(e,t)}finally{W.current=n}},useReducer:function(e,t,n){N="useReducer",G();var a=W.current;W.current=ar;try{return yf(e,t,n)}finally{W.current=a}},useRef:function(e){return N="useRef",G(),Mo()},useState:function(e){N="useState",G();var t=W.current;W.current=ar;try{return Sf(e)}finally{W.current=t}},useDebugValue:function(e,t){return N="useDebugValue",G(),Fo()},useDeferredValue:function(e){return N="useDeferredValue",G(),Yp(e)},useTransition:function(){return N="useTransition",G(),Gp()},useMutableSource:function(e,t,n){return N="useMutableSource",G(),void 0},useSyncExternalStore:function(e,t,n){return N="useSyncExternalStore",G(),No(e,t)},useId:function(){return N="useId",G(),wo()},unstable_isNewReconciler:Pe},em={readContext:function(e){return Yt(e)},useCallback:function(e,t){return N="useCallback",G(),Bo(e,t)},useContext:function(e){return N="useContext",G(),Yt(e)},useEffect:function(e,t){return N="useEffect",G(),vl(e,t)},useImperativeHandle:function(e,t,n){return N="useImperativeHandle",G(),jo(e,t,n)},useInsertionEffect:function(e,t){return N="useInsertionEffect",G(),Ho(e,t)},useLayoutEffect:function(e,t){return N="useLayoutEffect",G(),Lo(e,t)},useMemo:function(e,t){N="useMemo",G();var n=W.current;W.current=qo;try{return Vo(e,t)}finally{W.current=n}},useReducer:function(e,t,n){N="useReducer",G();var a=W.current;W.current=qo;try{return gf(e,t,n)}finally{W.current=a}},useRef:function(e){return N="useRef",G(),Mo()},useState:function(e){N="useState",G();var t=W.current;W.current=qo;try{return Ef(e)}finally{W.current=t}},useDebugValue:function(e,t){return N="useDebugValue",G(),Fo()},useDeferredValue:function(e){return N="useDeferredValue",G(),qp(e)},useTransition:function(){return N="useTransition",G(),Pp()},useMutableSource:function(e,t,n){return N="useMutableSource",G(),void 0},useSyncExternalStore:function(e,t,n){return N="useSyncExternalStore",G(),No(e,t)},useId:function(){return N="useId",G(),wo()},unstable_isNewReconciler:Pe},Tr={readContext:function(e){return Mf(),Yt(e)},useCallback:function(e,t){return N="useCallback",Se(),Je(),Df(e,t)},useContext:function(e){return N="useContext",Se(),Je(),Yt(e)},useEffect:function(e,t){return N="useEffect",Se(),Je(),Ao(e,t)},useImperativeHandle:function(e,t,n){return N="useImperativeHandle",Se(),Je(),xf(e,t,n)},useInsertionEffect:function(e,t){return N="useInsertionEffect",Se(),Je(),Rf(e,t)},useLayoutEffect:function(e,t){return N="useLayoutEffect",Se(),Je(),Cf(e,t)},useMemo:function(e,t){N="useMemo",Se(),Je();var n=W.current;W.current=Tr;try{return _f(e,t)}finally{W.current=n}},useReducer:function(e,t,n){N="useReducer",Se(),Je();var a=W.current;W.current=Tr;try{return hf(e,t,n)}finally{W.current=a}},useRef:function(e){return N="useRef",Se(),Je(),Tf(e)},useState:function(e){N="useState",Se(),Je();var t=W.current;W.current=Tr;try{return Uo(e)}finally{W.current=t}},useDebugValue:function(e,t){return N="useDebugValue",Se(),Je(),void 0},useDeferredValue:function(e){return N="useDeferredValue",Se(),Je(),Of(e)},useTransition:function(){return N="useTransition",Se(),Je(),Nf()},useMutableSource:function(e,t,n){return N="useMutableSource",Se(),Je(),void 0},useSyncExternalStore:function(e,t,n){return N="useSyncExternalStore",Se(),Je(),bf(e,t,n)},useId:function(){return N="useId",Se(),Je(),Uf()},unstable_isNewReconciler:Pe},ar={readContext:function(e){return Mf(),Yt(e)},useCallback:function(e,t){return N="useCallback",Se(),G(),Bo(e,t)},useContext:function(e){return N="useContext",Se(),G(),Yt(e)},useEffect:function(e,t){return N="useEffect",Se(),G(),vl(e,t)},useImperativeHandle:function(e,t,n){return N="useImperativeHandle",Se(),G(),jo(e,t,n)},useInsertionEffect:function(e,t){return N="useInsertionEffect",Se(),G(),Ho(e,t)},useLayoutEffect:function(e,t){return N="useLayoutEffect",Se(),G(),Lo(e,t)},useMemo:function(e,t){N="useMemo",Se(),G();var n=W.current;W.current=ar;try{return Vo(e,t)}finally{W.current=n}},useReducer:function(e,t,n){N="useReducer",Se(),G();var a=W.current;W.current=ar;try{return yf(e,t,n)}finally{W.current=a}},useRef:function(e){return N="useRef",Se(),G(),Mo()},useState:function(e){N="useState",Se(),G();var t=W.current;W.current=ar;try{return Sf(e)}finally{W.current=t}},useDebugValue:function(e,t){return N="useDebugValue",Se(),G(),Fo()},useDeferredValue:function(e){return N="useDeferredValue",Se(),G(),Yp(e)},useTransition:function(){return N="useTransition",Se(),G(),Gp()},useMutableSource:function(e,t,n){return N="useMutableSource",Se(),G(),void 0},useSyncExternalStore:function(e,t,n){return N="useSyncExternalStore",Se(),G(),No(e,t)},useId:function(){return N="useId",Se(),G(),wo()},unstable_isNewReconciler:Pe},qo={readContext:function(e){return Mf(),Yt(e)},useCallback:function(e,t){return N="useCallback",Se(),G(),Bo(e,t)},useContext:function(e){return N="useContext",Se(),G(),Yt(e)},useEffect:function(e,t){return N="useEffect",Se(),G(),vl(e,t)},useImperativeHandle:function(e,t,n){return N="useImperativeHandle",Se(),G(),jo(e,t,n)},useInsertionEffect:function(e,t){return N="useInsertionEffect",Se(),G(),Ho(e,t)},useLayoutEffect:function(e,t){return N="useLayoutEffect",Se(),G(),Lo(e,t)},useMemo:function(e,t){N="useMemo",Se(),G();var n=W.current;W.current=ar;try{return Vo(e,t)}finally{W.current=n}},useReducer:function(e,t,n){N="useReducer",Se(),G();var a=W.current;W.current=ar;try{return gf(e,t,n)}finally{W.current=a}},useRef:function(e){return N="useRef",Se(),G(),Mo()},useState:function(e){N="useState",Se(),G();var t=W.current;W.current=ar;try{return Ef(e)}finally{W.current=t}},useDebugValue:function(e,t){return N="useDebugValue",Se(),G(),Fo()},useDeferredValue:function(e){return N="useDeferredValue",Se(),G(),qp(e)},useTransition:function(){return N="useTransition",Se(),G(),Pp()},useMutableSource:function(e,t,n){return N="useMutableSource",Se(),G(),void 0},useSyncExternalStore:function(e,t,n){return N="useSyncExternalStore",Se(),G(),No(e,t)},useId:function(){return N="useId",Se(),G(),wo()},unstable_isNewReconciler:Pe}}var vi=g.unstable_now,tm=0,Qo=-1,pl=-1,Go=-1,zf=!1,Po=!1;function nm(){return zf}function $b(){Po=!0}function eS(){zf=!1,Po=!1}function tS(){zf=Po,Po=!1}function am(){return tm}function rm(){tm=vi()}function Af(e){pl=vi(),e.actualStartTime<0&&(e.actualStartTime=vi())}function im(e){pl=-1}function Ko(e,t){if(pl>=0){var n=vi()-pl;e.actualDuration+=n,t&&(e.selfBaseDuration=n),pl=-1}}function Rr(e){if(Qo>=0){var t=vi()-Qo;Qo=-1;for(var n=e.return;n!==null;){switch(n.tag){case oe:var a=n.stateNode;a.effectDuration+=t;return;case Tt:var r=n.stateNode;r.effectDuration+=t;return}n=n.return}}}function Hf(e){if(Go>=0){var t=vi()-Go;Go=-1;for(var n=e.return;n!==null;){switch(n.tag){case oe:var a=n.stateNode;a!==null&&(a.passiveEffectDuration+=t);return;case Tt:var r=n.stateNode;r!==null&&(r.passiveEffectDuration+=t);return}n=n.return}}}function Cr(){Qo=vi()}function Lf(){Go=vi()}function jf(e){for(var t=e.child;t;)e.actualDuration+=t.actualDuration,t=t.sibling}function wi(e,t){return{value:e,source:t,stack:rp(t),digest:null}}function Ff(e,t,n){return{value:e,source:null,stack:n!=null?n:null,digest:t!=null?t:null}}function nS(e,t){return!0}function Bf(e,t){try{var n=nS(e,t);if(n===!1)return;var a=t.value,r=t.source,i=t.stack,u=i!==null?i:"";if(a!=null&&a._suppressLogging){if(e.tag===ge)return;console.error(a)}var o=r?Z(r):null,s=o?"The above error occurred in the <"+o+"> component:":"The above error occurred in one of your React components:",f;if(e.tag===oe)f=`Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;else{var m=Z(e)||"Anonymous";f="React will try to recreate this component tree from scratch "+("using the error boundary you provided, "+m+".")}var b=s+`
`+u+`

`+(""+f);console.error(b)}catch(C){setTimeout(function(){throw C})}}var aS=typeof WeakMap=="function"?WeakMap:Map;function um(e,t,n){var a=Gr(ht,n);a.tag=Fc,a.payload={element:null};var r=t.value;return a.callback=function(){dT(r),Bf(e,t)},a}function Vf(e,t,n){var a=Gr(ht,n);a.tag=Fc;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;a.payload=function(){return r(i)},a.callback=function(){bh(e),Bf(e,t)}}var u=e.stateNode;return u!==null&&typeof u.componentDidCatch=="function"&&(a.callback=function(){bh(e),Bf(e,t),typeof r!="function"&&cT(this);var s=t.value,f=t.stack;this.componentDidCatch(s,{componentStack:f!==null?f:""}),typeof r!="function"&&(ba(e.lanes,me)||h("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.",Z(e)||"Unknown"))}),a}function lm(e,t,n){var a=e.pingCache,r;if(a===null?(a=e.pingCache=new aS,r=new Set,a.set(t,r)):(r=a.get(t),r===void 0&&(r=new Set,a.set(t,r))),!r.has(n)){r.add(n);var i=vT.bind(null,e,t,n);Ia&&zl(e,n),t.then(i,i)}}function rS(e,t,n,a){var r=e.updateQueue;if(r===null){var i=new Set;i.add(n),e.updateQueue=i}else r.add(n)}function iS(e,t){var n=e.tag;if((e.mode&Ge)===de&&(n===Ue||n===ze||n===Ae)){var a=e.alternate;a?(e.updateQueue=a.updateQueue,e.memoizedState=a.memoizedState,e.lanes=a.lanes):(e.updateQueue=null,e.memoizedState=null)}}function om(e){var t=e;do{if(t.tag===Fe&&Qb(t))return t;t=t.return}while(t!==null);return null}function sm(e,t,n,a,r){if((e.mode&Ge)===de){if(e===t)e.flags|=Ct;else{if(e.flags|=He,n.flags|=d,n.flags&=~(Xr|oa),n.tag===ge){var i=n.alternate;if(i===null)n.tag=jt;else{var u=Gr(ht,me);u.tag=ho,si(n,u,me)}}n.lanes=De(n.lanes,me)}return e}return e.flags|=Ct,e.lanes=r,e}function uS(e,t,n,a,r){if(n.flags|=oa,Ia&&zl(e,r),a!==null&&typeof a=="object"&&typeof a.then=="function"){var i=a;iS(n),hn()&&n.mode&Ge&&Jv();var u=om(t);if(u!==null){u.flags&=~cn,sm(u,t,n,e,r),u.mode&Ge&&lm(e,i,r),rS(u,e,i);return}else{if(!pg(r)){lm(e,i,r),Rd();return}var o=new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");a=o}}else if(hn()&&n.mode&Ge){Jv();var s=om(t);if(s!==null){(s.flags&Ct)===X&&(s.flags|=cn),sm(s,t,n,e,r),Mc(wi(a,n));return}}a=wi(a,n),nT(a);var f=t;do{switch(f.tag){case oe:{var m=a;f.flags|=Ct;var b=Qu(r);f.lanes=De(f.lanes,b);var C=um(f,m,b);wc(f,C);return}case ge:var M=a,H=f.type,z=f.stateNode;if((f.flags&He)===X&&(typeof H.getDerivedStateFromError=="function"||z!==null&&typeof z.componentDidCatch=="function"&&!ch(z))){f.flags|=Ct;var ee=Qu(r);f.lanes=De(f.lanes,ee);var ve=Vf(f,M,ee);wc(f,ve);return}break}f=f.return}while(f!==null)}function lS(){return null}var ml=A.ReactCurrentOwner,rr=!1,wf,hl,Yf,qf,Qf,Yi,Gf,Wo;wf={},hl={},Yf={},qf={},Qf={},Yi=!1,Gf={},Wo={};function Pn(e,t,n,a){e===null?t.child=Op(t,null,n,a):t.child=vu(t,e.child,n,a)}function oS(e,t,n,a){t.child=vu(t,e.child,null,a),t.child=vu(t,null,n,a)}function cm(e,t,n,a,r){if(t.type!==t.elementType){var i=n.propTypes;i&&Ja(i,a,"prop",ne(n))}var u=n.render,o=t.ref,s,f;du(t,r),ku(t);{if(ml.current=t,br(!0),s=bu(e,t,u,a,o,r),f=Su(),t.mode&wt){rn(!0);try{s=bu(e,t,u,a,o,r),f=Su()}finally{rn(!1)}}br(!1)}return lu(),e!==null&&!rr?(zp(e,t,r),Pr(e,t,r)):(hn()&&f&&xc(t),t.flags|=Ie,Pn(e,t,s,r),t.child)}function fm(e,t,n,a,r){if(e===null){var i=n.type;if(UT(i)&&n.compare===null&&n.defaultProps===void 0){var u=i;return u=Ou(i),t.tag=Ae,t.type=u,Wf(t,i),dm(e,t,u,a,r)}{var o=i.propTypes;o&&Ja(o,a,"prop",ne(i))}var s=Ad(n.type,null,a,t,t.mode,r);return s.ref=t.ref,s.return=t,t.child=s,s}{var f=n.type,m=f.propTypes;m&&Ja(m,a,"prop",ne(f))}var b=e.child,C=$f(e,r);if(!C){var M=b.memoizedProps,H=n.compare;if(H=H!==null?H:oo,H(M,a)&&e.ref===t.ref)return Pr(e,t,r)}t.flags|=Ie;var z=Ki(b,a);return z.ref=t.ref,z.return=t,t.child=z,z}function dm(e,t,n,a,r){if(t.type!==t.elementType){var i=t.elementType;if(i.$$typeof===rt){var u=i,o=u._payload,s=u._init;try{i=s(o)}catch(b){i=null}var f=i&&i.propTypes;f&&Ja(f,a,"prop",ne(i))}}if(e!==null){var m=e.memoizedProps;if(oo(m,a)&&e.ref===t.ref&&t.type===e.type)if(rr=!1,t.pendingProps=a=m,$f(e,r))(e.flags&d)!==X&&(rr=!0);else return t.lanes=e.lanes,Pr(e,t,r)}return Pf(e,t,n,a,r)}function vm(e,t,n){var a=t.pendingProps,r=a.children,i=e!==null?e.memoizedState:null;if(a.mode==="hidden"||Ke)if((t.mode&Ge)===de){var u={baseLanes:L,cachePool:null,transitions:null};t.memoizedState=u,ys(t,n)}else if(ba(n,ga)){var b={baseLanes:L,cachePool:null,transitions:null};t.memoizedState=b;var C=i!==null?i.baseLanes:n;ys(t,C)}else{var o=null,s;if(i!==null){var f=i.baseLanes;s=De(f,n)}else s=n;t.lanes=t.childLanes=ga;var m={baseLanes:s,cachePool:o,transitions:null};return t.memoizedState=m,t.updateQueue=null,ys(t,s),null}else{var M;i!==null?(M=De(i.baseLanes,n),t.memoizedState=null):M=n,ys(t,M)}return Pn(e,t,r,n),t.child}function sS(e,t,n){var a=t.pendingProps;return Pn(e,t,a,n),t.child}function cS(e,t,n){var a=t.pendingProps.children;return Pn(e,t,a,n),t.child}function fS(e,t,n){{t.flags|=se;{var a=t.stateNode;a.effectDuration=0,a.passiveEffectDuration=0}}var r=t.pendingProps,i=r.children;return Pn(e,t,i,n),t.child}function pm(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=wn,t.flags|=Q)}function Pf(e,t,n,a,r){if(t.type!==t.elementType){var i=n.propTypes;i&&Ja(i,a,"prop",ne(n))}var u;{var o=$i(t,n,!0);u=eu(t,o)}var s,f;du(t,r),ku(t);{if(ml.current=t,br(!0),s=bu(e,t,n,a,u,r),f=Su(),t.mode&wt){rn(!0);try{s=bu(e,t,n,a,u,r),f=Su()}finally{rn(!1)}}br(!1)}return lu(),e!==null&&!rr?(zp(e,t,r),Pr(e,t,r)):(hn()&&f&&xc(t),t.flags|=Ie,Pn(e,t,s,r),t.child)}function mm(e,t,n,a,r){{switch(Oh(t)){case!1:{var i=t.stateNode,u=t.type,o=new u(t.memoizedProps,i.context),s=o.state;i.updater.enqueueSetState(i,s,null);break}case!0:{t.flags|=He,t.flags|=Ct;var f=new Error("Simulated error coming from DevTools"),m=Qu(r);t.lanes=De(t.lanes,m);var b=Vf(t,wi(f,t),m);wc(t,b);break}}if(t.type!==t.elementType){var C=n.propTypes;C&&Ja(C,a,"prop",ne(n))}}var M;vr(n)?(M=!0,Jl(t)):M=!1,du(t,r);var H=t.stateNode,z;H===null?(Xo(e,t),Rp(t,n,a),Ic(t,n,a,r),z=!0):e===null?z=Fb(t,n,a,r):z=Bb(e,t,n,a,r);var ee=Kf(e,t,n,z,M,r);{var ve=t.stateNode;z&&ve.props!==a&&(Yi||h("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.",Z(t)||"a component"),Yi=!0)}return ee}function Kf(e,t,n,a,r,i){pm(e,t);var u=(t.flags&He)!==X;if(!a&&!u)return r&&Rv(t,n,!1),Pr(e,t,i);var o=t.stateNode;ml.current=t;var s;if(u&&typeof n.getDerivedStateFromError!="function")s=null,im();else{ku(t);{if(br(!0),s=o.render(),t.mode&wt){rn(!0);try{o.render()}finally{rn(!1)}}br(!1)}lu()}return t.flags|=Ie,e!==null&&u?oS(e,t,s,i):Pn(e,t,s,i),t.memoizedState=o.state,r&&Rv(t,n,!0),t.child}function hm(e){var t=e.stateNode;t.pendingContext?Ev(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Ev(e,t.context,!1),uf(e,t.containerInfo)}function dS(e,t,n){if(hm(t),e===null)throw new Error("Should have a current fiber. This is a bug in React.");var a=t.pendingProps,r=t.memoizedState,i=r.element;mp(e,t),So(t,a,null,n);var u=t.memoizedState,o=t.stateNode,s=u.element;if(_t&&r.isDehydrated){var f={element:s,isDehydrated:!1,cache:u.cache,pendingSuspenseBoundaries:u.pendingSuspenseBoundaries,transitions:u.transitions},m=t.updateQueue;if(m.baseState=f,t.memoizedState=f,t.flags&cn){var b=wi(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."),t);return ym(e,t,s,n,b)}else if(s!==i){var C=wi(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."),t);return ym(e,t,s,n,C)}else{cb(t);var M=Op(t,null,s,n);t.child=M;for(var H=M;H;)H.flags=H.flags&~Qe|fn,H=H.sibling}}else{if(cu(),s===i)return Pr(e,t,n);Pn(e,t,s,n)}return t.child}function ym(e,t,n,a,r){return cu(),Mc(r),t.flags|=cn,Pn(e,t,n,a),t.child}function vS(e,t,n){Np(t),e===null&&Uc(t);var a=t.type,r=t.pendingProps,i=e!==null?e.memoizedProps:null,u=r.children,o=ti(a,r);return o?u=null:i!==null&&ti(a,i)&&(t.flags|=In),pm(e,t),Pn(e,t,u,n),t.child}function pS(e,t){return e===null&&Uc(t),null}function mS(e,t,n,a){Xo(e,t);var r=t.pendingProps,i=n,u=i._payload,o=i._init,s=o(u);t.type=s;var f=t.tag=MT(s),m=tr(s,r),b;switch(f){case Ue:return Wf(t,s),t.type=s=Ou(s),b=Pf(null,t,s,m,a),b;case ge:return t.type=s=_d(s),b=mm(null,t,s,m,a),b;case ze:return t.type=s=Od(s),b=cm(null,t,s,m,a),b;case lt:{if(t.type!==t.elementType){var C=s.propTypes;C&&Ja(C,m,"prop",ne(s))}return b=fm(null,t,s,tr(s.type,m),a),b}}var M="";throw s!==null&&typeof s=="object"&&s.$$typeof===rt&&(M=" Did you wrap a component in React.lazy() more than once?"),new Error("Element type is invalid. Received a promise that resolves to: "+s+". "+("Lazy element type must resolve to a class or function."+M))}function hS(e,t,n,a,r){Xo(e,t),t.tag=ge;var i;return vr(n)?(i=!0,Jl(t)):i=!1,du(t,r),Rp(t,n,a),Ic(t,n,a,r),Kf(null,t,n,!0,i,r)}function yS(e,t,n,a){Xo(e,t);var r=t.pendingProps,i;{var u=$i(t,n,!1);i=eu(t,u)}du(t,a);var o,s;ku(t);{if(n.prototype&&typeof n.prototype.render=="function"){var f=ne(n)||"Unknown";wf[f]||(h("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.",f,f),wf[f]=!0)}t.mode&wt&&er.recordLegacyContextWarning(t,null),br(!0),ml.current=t,o=bu(null,t,n,r,i,a),s=Su(),br(!1)}if(lu(),t.flags|=Ie,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0){var m=ne(n)||"Unknown";hl[m]||(h("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.",m,m,m),hl[m]=!0)}if(typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0){{var b=ne(n)||"Unknown";hl[b]||(h("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.",b,b,b),hl[b]=!0)}t.tag=ge,t.memoizedState=null,t.updateQueue=null;var C=!1;return vr(n)?(C=!0,Jl(t)):C=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,Vc(t),Tp(t,o),Ic(t,n,r,a),Kf(null,t,n,!0,C,a)}else{if(t.tag=Ue,t.mode&wt){rn(!0);try{o=bu(null,t,n,r,i,a),s=Su()}finally{rn(!1)}}return hn()&&s&&xc(t),Pn(null,t,o,a),Wf(t,n),t.child}}function Wf(e,t){{if(t&&t.childContextTypes&&h("%s(...): childContextTypes cannot be defined on a function component.",t.displayName||t.name||"Component"),e.ref!==null){var n="",a=Eb();a&&(n+=`

Check the render method of \``+a+"`.");var r=a||"",i=e._debugSource;i&&(r=i.fileName+":"+i.lineNumber),Qf[r]||(Qf[r]=!0,h("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s",n))}if(typeof t.getDerivedStateFromProps=="function"){var u=ne(t)||"Unknown";qf[u]||(h("%s: Function components do not support getDerivedStateFromProps.",u),qf[u]=!0)}if(typeof t.contextType=="object"&&t.contextType!==null){var o=ne(t)||"Unknown";Yf[o]||(h("%s: Function components do not support contextType.",o),Yf[o]=!0)}}}var kf={dehydrated:null,treeContext:null,retryLane:tn};function Xf(e){return{baseLanes:e,cachePool:lS(),transitions:null}}function gS(e,t){var n=null;return{baseLanes:De(e.baseLanes,t),cachePool:n,transitions:e.transitions}}function bS(e,t,n,a){if(t!==null){var r=t.memoizedState;if(r===null)return!1}return of(e,ll)}function SS(e,t){return no(e.childLanes,t)}function gm(e,t,n){var a=t.pendingProps;Uh(t)&&(t.flags|=He);var r=nr.current,i=!1,u=(t.flags&He)!==X;if(u||bS(r,e)?(i=!0,t.flags&=~He):(e===null||e.memoizedState!==null)&&(r=qb(r,Mp)),r=mu(r),fi(t,r),e===null){Uc(t);var o=t.memoizedState;if(o!==null){var s=o.dehydrated;if(s!==null)return xS(t,s)}var f=a.children,m=a.fallback;if(i){var b=ES(t,f,m,n),C=t.child;return C.memoizedState=Xf(n),t.memoizedState=kf,b}else return Jf(t,f)}else{var M=e.memoizedState;if(M!==null){var H=M.dehydrated;if(H!==null)return DS(e,t,u,a,H,M,n)}if(i){var z=a.fallback,ee=a.children,ve=RS(e,t,ee,z,n),ie=t.child,Ze=e.child.memoizedState;return ie.memoizedState=Ze===null?Xf(n):gS(Ze,n),ie.childLanes=SS(e,n),t.memoizedState=kf,ve}else{var we=a.children,E=TS(e,t,we,n);return t.memoizedState=null,E}}}function Jf(e,t,n){var a=e.mode,r={mode:"visible",children:t},i=Zf(r,a);return i.return=e,e.child=i,i}function ES(e,t,n,a){var r=e.mode,i=e.child,u={mode:"hidden",children:t},o,s;return(r&Ge)===de&&i!==null?(o=i,o.childLanes=L,o.pendingProps=u,e.mode&et&&(o.actualDuration=0,o.actualStartTime=-1,o.selfBaseDuration=0,o.treeBaseDuration=0),s=gi(n,r,a,null)):(o=Zf(u,r),s=gi(n,r,a,null)),o.return=e,s.return=e,o.sibling=s,e.child=o,s}function Zf(e,t,n){return Eh(e,t,L,null)}function bm(e,t){return Ki(e,t)}function TS(e,t,n,a){var r=e.child,i=r.sibling,u=bm(r,{mode:"visible",children:n});if((t.mode&Ge)===de&&(u.lanes=a),u.return=t,u.sibling=null,i!==null){var o=t.deletions;o===null?(t.deletions=[i],t.flags|=Bt):o.push(i)}return t.child=u,u}function RS(e,t,n,a,r){var i=t.mode,u=e.child,o=u.sibling,s={mode:"hidden",children:n},f;if((i&Ge)===de&&t.child!==u){var m=t.child;f=m,f.childLanes=L,f.pendingProps=s,t.mode&et&&(f.actualDuration=0,f.actualStartTime=-1,f.selfBaseDuration=u.selfBaseDuration,f.treeBaseDuration=u.treeBaseDuration),t.deletions=null}else f=bm(u,s),f.subtreeFlags=u.subtreeFlags&ct;var b;return o!==null?b=Ki(o,a):(b=gi(a,i,r,null),b.flags|=Qe),b.return=t,f.return=t,f.sibling=b,t.child=f,b}function ko(e,t,n,a){a!==null&&Mc(a),vu(t,e.child,null,n);var r=t.pendingProps,i=r.children,u=Jf(t,i);return u.flags|=Qe,t.memoizedState=null,u}function CS(e,t,n,a,r){var i=t.mode,u={mode:"visible",children:n},o=Zf(u,i),s=gi(a,i,r,null);return s.flags|=Qe,o.return=t,s.return=t,o.sibling=s,t.child=o,(t.mode&Ge)!==de&&vu(t,e.child,null,r),s}function xS(e,t,n){return(e.mode&Ge)===de?(h("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."),e.lanes=me):ri(t)?e.lanes=Oi:e.lanes=ga,null}function DS(e,t,n,a,r,i,u){if(n)if(t.flags&cn){t.flags&=~cn;var E=Ff(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));return ko(e,t,u,E)}else{if(t.memoizedState!==null)return t.child=e.child,t.flags|=He,null;var O=a.children,S=a.fallback,F=CS(e,t,O,S,u),$=t.child;return $.memoizedState=Xf(u),t.memoizedState=kf,F}else{if(ob(),(t.mode&Ge)===de)return ko(e,t,u,null);if(ri(r)){var o,s,f;{var m=ju(r);o=m.digest,s=m.message,f=m.stack}var b;s?b=new Error(s):b=new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");var C=Ff(b,o,f);return ko(e,t,u,C)}var M=ba(u,e.childLanes);if(rr||M){var H=ms();if(H!==null){var z=Tg(H,u);if(z!==tn&&z!==i.retryLane){i.retryLane=z;var ee=ht;Gn(e,z),Qt(H,e,z,ee)}}Rd();var ve=Ff(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));return ko(e,t,u,ve)}else if(Vt(r)){t.flags|=He,t.child=e.child;var ie=pT.bind(null,e);return ql(r,ie),null}else{fb(t,r,i.treeContext);var Ze=a.children,we=Jf(t,Ze);return we.flags|=fn,we}}}function Sm(e,t,n){e.lanes=De(e.lanes,t);var a=e.alternate;a!==null&&(a.lanes=De(a.lanes,t)),Lc(e.return,t,n)}function _S(e,t,n){for(var a=t;a!==null;){if(a.tag===Fe){var r=a.memoizedState;r!==null&&Sm(a,n,e)}else if(a.tag===bt)Sm(a,n,e);else if(a.child!==null){a.child.return=a,a=a.child;continue}if(a===e)return;for(;a.sibling===null;){if(a.return===null||a.return===e)return;a=a.return}a.sibling.return=a.return,a=a.sibling}}function OS(e){for(var t=e,n=null;t!==null;){var a=t.alternate;a!==null&&_o(a)===null&&(n=t),t=t.sibling}return n}function NS(e){if(e!==void 0&&e!=="forwards"&&e!=="backwards"&&e!=="together"&&!Gf[e])if(Gf[e]=!0,typeof e=="string")switch(e.toLowerCase()){case"together":case"forwards":case"backwards":{h('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.',e,e.toLowerCase());break}case"forward":case"backward":{h('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.',e,e.toLowerCase());break}default:h('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',e);break}else h('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',e)}function US(e,t){e!==void 0&&!Wo[e]&&(e!=="collapsed"&&e!=="hidden"?(Wo[e]=!0,h('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?',e)):t!=="forwards"&&t!=="backwards"&&(Wo[e]=!0,h('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?',e)))}function Em(e,t){{var n=Pt(e),a=!n&&typeof q(e)=="function";if(n||a){var r=n?"array":"iterable";return h("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>",r,t,r),!1}}return!0}function MS(e,t){if((t==="forwards"||t==="backwards")&&e!==void 0&&e!==null&&e!==!1)if(Pt(e)){for(var n=0;n<e.length;n++)if(!Em(e[n],n))return}else{var a=q(e);if(typeof a=="function"){var r=a.call(e);if(r)for(var i=r.next(),u=0;!i.done;i=r.next()){if(!Em(i.value,u))return;u++}}else h('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?',t)}}function If(e,t,n,a,r){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:r}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=a,i.tail=n,i.tailMode=r)}function Tm(e,t,n){var a=t.pendingProps,r=a.revealOrder,i=a.tail,u=a.children;NS(r),US(i,r),MS(u,r),Pn(e,t,u,n);var o=nr.current,s=of(o,ll);if(s)o=sf(o,ll),t.flags|=He;else{var f=e!==null&&(e.flags&He)!==X;f&&_S(t,t.child,n),o=mu(o)}if(fi(t,o),(t.mode&Ge)===de)t.memoizedState=null;else switch(r){case"forwards":{var m=OS(t.child),b;m===null?(b=t.child,t.child=null):(b=m.sibling,m.sibling=null),If(t,!1,b,m,i);break}case"backwards":{var C=null,M=t.child;for(t.child=null;M!==null;){var H=M.alternate;if(H!==null&&_o(H)===null){t.child=M;break}var z=M.sibling;M.sibling=C,C=M,M=z}If(t,!0,C,null,i);break}case"together":{If(t,!1,null,null,void 0);break}default:t.memoizedState=null}return t.child}function zS(e,t,n){uf(t,t.stateNode.containerInfo);var a=t.pendingProps;return e===null?t.child=vu(t,null,a,n):Pn(e,t,a,n),t.child}var Rm=!1;function AS(e,t,n){var a=t.type,r=a._context,i=t.pendingProps,u=t.memoizedProps,o=i.value;{"value"in i||Rm||(Rm=!0,h("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));var s=t.type.propTypes;s&&Ja(s,i,"prop","Context.Provider")}if(fp(t,r,o),u!==null){var f=u.value;if(Sa(f,o)){if(u.children===i.children&&!kl())return Pr(e,t,n)}else _b(t,r,n)}var m=i.children;return Pn(e,t,m,n),t.child}var Cm=!1;function HS(e,t,n){var a=t.type;a._context===void 0?a!==a.Consumer&&(Cm||(Cm=!0,h("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))):a=a._context;var r=t.pendingProps,i=r.children;typeof i!="function"&&h("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."),du(t,n);var u=Yt(a);ku(t);var o;return ml.current=t,br(!0),o=i(u),br(!1),lu(),t.flags|=Ie,Pn(e,t,o,n),t.child}function yl(){rr=!0}function Xo(e,t){(t.mode&Ge)===de&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=Qe)}function Pr(e,t,n){return e!==null&&(t.dependencies=e.dependencies),im(),Ml(t.lanes),ba(n,t.childLanes)?(Vb(e,t),t.child):null}function LS(e,t,n){{var a=t.return;if(a===null)throw new Error("Cannot swap the root fiber.");if(e.alternate=null,t.alternate=null,n.index=t.index,n.sibling=t.sibling,n.return=t.return,n.ref=t.ref,t===a.child)a.child=n;else{var r=a.child;if(r===null)throw new Error("Expected parent to have a child.");for(;r.sibling!==t;)if(r=r.sibling,r===null)throw new Error("Expected to find the previous sibling.");r.sibling=n}var i=a.deletions;return i===null?(a.deletions=[e],a.flags|=Bt):i.push(e),n.flags|=Qe,n}}function $f(e,t){var n=e.lanes;return!!ba(n,t)}function jS(e,t,n){switch(t.tag){case oe:hm(t);var a=t.stateNode;cu();break;case te:Np(t);break;case ge:{var r=t.type;vr(r)&&Jl(t);break}case Me:uf(t,t.stateNode.containerInfo);break;case Et:{var i=t.memoizedProps.value,u=t.type._context;fp(t,u,i);break}case Tt:{var o=ba(n,t.childLanes);o&&(t.flags|=se);{var s=t.stateNode;s.effectDuration=0,s.passiveEffectDuration=0}}break;case Fe:{var f=t.memoizedState;if(f!==null){if(f.dehydrated!==null)return fi(t,mu(nr.current)),t.flags|=He,null;var m=t.child,b=m.childLanes;if(ba(n,b))return gm(e,t,n);fi(t,mu(nr.current));var C=Pr(e,t,n);return C!==null?C.sibling:null}else fi(t,mu(nr.current));break}case bt:{var M=(e.flags&He)!==X,H=ba(n,t.childLanes);if(M){if(H)return Tm(e,t,n);t.flags|=He}var z=t.memoizedState;if(z!==null&&(z.rendering=null,z.tail=null,z.lastEffect=null),fi(t,nr.current),H)break;return null}case at:case Ft:return t.lanes=L,vm(e,t,n)}return Pr(e,t,n)}function xm(e,t,n){if(t._debugNeedsRemount&&e!==null)return LS(e,t,Ad(t.type,t.key,t.pendingProps,t._debugOwner||null,t.mode,t.lanes));if(e!==null){var a=e.memoizedProps,r=t.pendingProps;if(a!==r||kl()||t.type!==e.type)rr=!0;else{var i=$f(e,n);if(!i&&(t.flags&He)===X)return rr=!1,jS(e,t,n);(e.flags&d)!==X?rr=!0:rr=!1}}else if(rr=!1,hn()&&nb(t)){var u=t.index,o=ab();Xv(t,o,u)}switch(t.lanes=L,t.tag){case It:return yS(e,t,t.type,n);case Rt:{var s=t.elementType;return mS(e,t,s,n)}case Ue:{var f=t.type,m=t.pendingProps,b=t.elementType===f?m:tr(f,m);return Pf(e,t,f,b,n)}case ge:{var C=t.type,M=t.pendingProps,H=t.elementType===C?M:tr(C,M);return mm(e,t,C,H,n)}case oe:return dS(e,t,n);case te:return vS(e,t,n);case be:return pS(e,t);case Fe:return gm(e,t,n);case Me:return zS(e,t,n);case ze:{var z=t.type,ee=t.pendingProps,ve=t.elementType===z?ee:tr(z,ee);return cm(e,t,z,ve,n)}case xe:return sS(e,t,n);case st:return cS(e,t,n);case Tt:return fS(e,t,n);case Et:return AS(e,t,n);case ue:return HS(e,t,n);case lt:{var ie=t.type,Ze=t.pendingProps,we=tr(ie,Ze);if(t.type!==t.elementType){var E=ie.propTypes;E&&Ja(E,we,"prop",ne(ie))}return we=tr(ie.type,we),fm(e,t,ie,we,n)}case Ae:return dm(e,t,t.type,t.pendingProps,n);case jt:{var O=t.type,S=t.pendingProps,F=t.elementType===O?S:tr(O,S);return hS(e,t,O,F,n)}case bt:return Tm(e,t,n);case $t:break;case at:return vm(e,t,n)}throw new Error("Unknown unit of work tag ("+t.tag+"). This error is likely caused by a bug in React. Please file an issue.")}function xr(e){e.flags|=se}function Dm(e){e.flags|=wn,e.flags|=Q}function _m(e,t){var n=e!==null&&e.child===t.child;if(n)return!0;if((t.flags&Bt)!==X)return!1;for(var a=t.child;a!==null;){if((a.flags&pt)!==X||(a.subtreeFlags&pt)!==X)return!1;a=a.sibling}return!0}var gl,bl,Jo,Zo;if(Ht)gl=function(e,t,n,a){for(var r=t.child;r!==null;){if(r.tag===te||r.tag===be)Wa(e,r.stateNode);else if(r.tag!==Me){if(r.child!==null){r.child.return=r,r=r.child;continue}}if(r===t)return;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}},bl=function(e,t){},Jo=function(e,t,n,a,r){var i=e.memoizedProps;if(i!==a){var u=t.stateNode,o=ul(),s=cr(u,n,i,a,r,o);t.updateQueue=s,s&&xr(t)}},Zo=function(e,t,n,a){n!==a&&xr(t)};else if(Fr){gl=function(e,t,n,a){for(var r=t.child;r!==null;){if(r.tag===te){var i=r.stateNode;if(n&&a){var u=r.memoizedProps,o=r.type;i=$e(i,o,u,r)}Wa(e,i)}else if(r.tag===be){var s=r.stateNode;if(n&&a){var f=r.memoizedProps;s=ft(s,f,r)}Wa(e,s)}else if(r.tag!==Me){if(r.tag===at&&r.memoizedState!==null){var m=r.child;m!==null&&(m.return=r),gl(e,r,!0,!0)}else if(r.child!==null){r.child.return=r,r=r.child;continue}}if(r=r,r===t)return;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};var Om=function(e,t,n,a){for(var r=t.child;r!==null;){if(r.tag===te){var i=r.stateNode;if(n&&a){var u=r.memoizedProps,o=r.type;i=$e(i,o,u,r)}I(e,i)}else if(r.tag===be){var s=r.stateNode;if(n&&a){var f=r.memoizedProps;s=ft(s,f,r)}I(e,s)}else if(r.tag!==Me){if(r.tag===at&&r.memoizedState!==null){var m=r.child;m!==null&&(m.return=r),Om(e,r,!0,!0)}else if(r.child!==null){r.child.return=r,r=r.child;continue}}if(r=r,r===t)return;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};bl=function(e,t){var n=t.stateNode,a=_m(e,t);if(!a){var r=n.containerInfo,i=ce(r);Om(i,t,!1,!1),n.pendingChildren=i,xr(t),Ee(r,i)}},Jo=function(e,t,n,a,r){var i=e.stateNode,u=e.memoizedProps,o=_m(e,t);if(o&&u===a){t.stateNode=i;return}var s=t.stateNode,f=ul(),m=null;if(u!==a&&(m=cr(s,n,u,a,r,f)),o&&m===null){t.stateNode=i;return}var b=w(i,m,n,u,a,t,o,s);jr(b,n,a,r,f)&&xr(t),t.stateNode=b,o?xr(t):gl(b,t,!1,!1)},Zo=function(e,t,n,a){if(n!==a){var r=rf(),i=ul();t.stateNode=ni(a,r,i,t),xr(t)}else t.stateNode=e.stateNode}}else bl=function(e,t){},Jo=function(e,t,n,a,r){},Zo=function(e,t,n,a){};function Sl(e,t){if(!hn())switch(e.tailMode){case"hidden":{for(var n=e.tail,a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e.tail=null:a.sibling=null;break}case"collapsed":{for(var r=e.tail,i=null;r!==null;)r.alternate!==null&&(i=r),r=r.sibling;i===null?!t&&e.tail!==null?e.tail.sibling=null:e.tail=null:i.sibling=null;break}}}function gn(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=L,a=X;if(t){if((e.mode&et)!==de){for(var s=e.selfBaseDuration,f=e.child;f!==null;)n=De(n,De(f.lanes,f.childLanes)),a|=f.subtreeFlags&ct,a|=f.flags&ct,s+=f.treeBaseDuration,f=f.sibling;e.treeBaseDuration=s}else for(var m=e.child;m!==null;)n=De(n,De(m.lanes,m.childLanes)),a|=m.subtreeFlags&ct,a|=m.flags&ct,m.return=e,m=m.sibling;e.subtreeFlags|=a}else{if((e.mode&et)!==de){for(var r=e.actualDuration,i=e.selfBaseDuration,u=e.child;u!==null;)n=De(n,De(u.lanes,u.childLanes)),a|=u.subtreeFlags,a|=u.flags,r+=u.actualDuration,i+=u.treeBaseDuration,u=u.sibling;e.actualDuration=r,e.treeBaseDuration=i}else for(var o=e.child;o!==null;)n=De(n,De(o.lanes,o.childLanes)),a|=o.subtreeFlags,a|=o.flags,o.return=e,o=o.sibling;e.subtreeFlags|=a}return e.childLanes=n,t}function FS(e,t,n){if(hb()&&(t.mode&Ge)!==de&&(t.flags&He)===X)return np(t),cu(),t.flags|=cn|oa|Ct,!1;var a=lo(t);if(n!==null&&n.dehydrated!==null)if(e===null){if(!a)throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");if(pb(t),gn(t),(t.mode&et)!==de){var r=n!==null;if(r){var i=t.child;i!==null&&(t.treeBaseDuration-=i.treeBaseDuration)}}return!1}else{if(cu(),(t.flags&He)===X&&(t.memoizedState=null),t.flags|=se,gn(t),(t.mode&et)!==de){var u=n!==null;if(u){var o=t.child;o!==null&&(t.treeBaseDuration-=o.treeBaseDuration)}}return!1}else return ap(),!0}function Nm(e,t,n){var a=t.pendingProps;switch(Dc(t),t.tag){case It:case Rt:case Ae:case Ue:case ze:case xe:case st:case Tt:case ue:case lt:return gn(t),null;case ge:{var r=t.type;return vr(r)&&Xl(t),gn(t),null}case oe:{var i=t.stateNode;if(pu(t),Xs(t),ff(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),e===null||e.child===null){var u=lo(t);if(u)xr(t);else if(e!==null){var o=e.memoizedState;(!o.isDehydrated||(t.flags&cn)!==X)&&(t.flags|=Gt,ap())}}return bl(e,t),gn(t),null}case te:{lf(t);var s=rf(),f=t.type;if(e!==null&&t.stateNode!=null)Jo(e,t,f,a,s),e.ref!==t.ref&&Dm(t);else{if(!a){if(t.stateNode===null)throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");return gn(t),null}var m=ul(),b=lo(t);if(b)db(t,s,m)&&xr(t);else{var C=ei(f,a,s,m,t);gl(C,t,!1,!1),t.stateNode=C,jr(C,f,a,s,m)&&xr(t)}t.ref!==null&&Dm(t)}return gn(t),null}case be:{var M=a;if(e&&t.stateNode!=null){var H=e.memoizedProps;Zo(e,t,H,M)}else{if(typeof M!="string"&&t.stateNode===null)throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");var z=rf(),ee=ul(),ve=lo(t);ve?vb(t)&&xr(t):t.stateNode=ni(M,z,ee,t)}return gn(t),null}case Fe:{hu(t);var ie=t.memoizedState;if(e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){var Ze=FS(e,t,ie);if(!Ze)return t.flags&Ct?t:null}if((t.flags&He)!==X)return t.lanes=n,(t.mode&et)!==de&&jf(t),t;var we=ie!==null,E=e!==null&&e.memoizedState!==null;if(we!==E&&we){var O=t.child;if(O.flags|=$n,(t.mode&Ge)!==de){var S=e===null&&(t.memoizedProps.unstable_avoidThisFallback!==!0||!Re);S||of(nr.current,Mp)?tT():Rd()}}var F=t.updateQueue;if(F!==null&&(t.flags|=se),gn(t),(t.mode&et)!==de&&we){var $=t.child;$!==null&&(t.treeBaseDuration-=$.treeBaseDuration)}return null}case Me:return pu(t),bl(e,t),e===null&&x(t.stateNode.containerInfo),gn(t),null;case Et:var k=t.type._context;return Hc(k,t),gn(t),null;case jt:{var Ve=t.type;return vr(Ve)&&Xl(t),gn(t),null}case bt:{hu(t);var he=t.memoizedState;if(he===null)return gn(t),null;var We=(t.flags&He)!==X,je=he.rendering;if(je===null)if(We)Sl(he,!1);else{var dt=aT()&&(e===null||(e.flags&He)===X);if(!dt)for(var le=t.child;le!==null;){var Nt=_o(le);if(Nt!==null){We=!0,t.flags|=He,Sl(he,!1);var Hn=Nt.updateQueue;return Hn!==null&&(t.updateQueue=Hn,t.flags|=se),t.subtreeFlags=X,wb(t,n),fi(t,sf(nr.current,ll)),t.child}le=le.sibling}he.tail!==null&&an()>eh()&&(t.flags|=He,We=!0,Sl(he,!1),t.lanes=Dv)}else{if(!We){var Tn=_o(je);if(Tn!==null){t.flags|=He,We=!0;var Ra=Tn.updateQueue;if(Ra!==null&&(t.updateQueue=Ra,t.flags|=se),Sl(he,!0),he.tail===null&&he.tailMode==="hidden"&&!je.alternate&&!hn())return gn(t),null}else an()*2-he.renderingStartTime>eh()&&n!==ga&&(t.flags|=He,We=!0,Sl(he,!1),t.lanes=Dv)}if(he.isBackwards)je.sibling=t.child,t.child=je;else{var Wn=he.last;Wn!==null?Wn.sibling=je:t.child=je,he.last=je}}if(he.tail!==null){var kn=he.tail;he.rendering=kn,he.tail=kn.sibling,he.renderingStartTime=an(),kn.sibling=null;var Ln=nr.current;return We?Ln=sf(Ln,ll):Ln=mu(Ln),fi(t,Ln),kn}return gn(t),null}case $t:break;case at:case Ft:{Td(t);var kr=t.memoizedState,Nu=kr!==null;if(e!==null){var Hl=e.memoizedState,Ur=Hl!==null;Ur!==Nu&&!Ke&&(t.flags|=$n)}return!Nu||(t.mode&Ge)===de?gn(t):ba(Or,ga)&&(gn(t),Ht&&t.subtreeFlags&(Qe|se)&&(t.flags|=$n)),null}case Xn:return null;case Fn:return null}throw new Error("Unknown unit of work tag ("+t.tag+"). This error is likely caused by a bug in React. Please file an issue.")}function BS(e,t,n){switch(Dc(t),t.tag){case ge:{var a=t.type;vr(a)&&Xl(t);var r=t.flags;return r&Ct?(t.flags=r&~Ct|He,(t.mode&et)!==de&&jf(t),t):null}case oe:{var i=t.stateNode;pu(t),Xs(t),ff();var u=t.flags;return(u&Ct)!==X&&(u&He)===X?(t.flags=u&~Ct|He,t):null}case te:return lf(t),null;case Fe:{hu(t);var o=t.memoizedState;if(o!==null&&o.dehydrated!==null){if(t.alternate===null)throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");cu()}var s=t.flags;return s&Ct?(t.flags=s&~Ct|He,(t.mode&et)!==de&&jf(t),t):null}case bt:return hu(t),null;case Me:return pu(t),null;case Et:var f=t.type._context;return Hc(f,t),null;case at:case Ft:return Td(t),null;case Xn:return null;default:return null}}function Um(e,t,n){switch(Dc(t),t.tag){case ge:{var a=t.type.childContextTypes;a!=null&&Xl(t);break}case oe:{var r=t.stateNode;pu(t),Xs(t),ff();break}case te:{lf(t);break}case Me:pu(t);break;case Fe:hu(t);break;case bt:hu(t);break;case Et:var i=t.type._context;Hc(i,t);break;case at:case Ft:Td(t);break}}function Mm(e,t,n,a,r,i,u,o,s){var f=Array.prototype.slice.call(arguments,3);try{t.apply(n,f)}catch(m){this.onError(m)}}var zm=Mm;if(typeof window!="undefined"&&typeof window.dispatchEvent=="function"&&typeof document!="undefined"&&typeof document.createEvent=="function"){var ed=document.createElement("react");zm=function(t,n,a,r,i,u,o,s,f){if(typeof document=="undefined"||document===null)throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");var m=document.createEvent("Event"),b=!1,C=!0,M=window.event,H=Object.getOwnPropertyDescriptor(window,"event");function z(){ed.removeEventListener(O,ve,!1),typeof window.event!="undefined"&&window.hasOwnProperty("event")&&(window.event=M)}var ee=Array.prototype.slice.call(arguments,3);function ve(){b=!0,z(),n.apply(a,ee),C=!1}var ie,Ze=!1,we=!1;function E(S){if(ie=S.error,Ze=!0,ie===null&&S.colno===0&&S.lineno===0&&(we=!0),S.defaultPrevented&&ie!=null&&typeof ie=="object")try{ie._suppressLogging=!0}catch(F){}}var O="react-"+(t||"invokeguardedcallback");if(window.addEventListener("error",E),ed.addEventListener(O,ve,!1),m.initEvent(O,!1,!1),ed.dispatchEvent(m),H&&Object.defineProperty(window,"event",H),b&&C&&(Ze?we&&(ie=new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")):ie=new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`),this.onError(ie)),window.removeEventListener("error",E),!b)return z(),Mm.apply(this,arguments)}}var VS=zm,El=!1,Io=null,wS={onError:function(e){El=!0,Io=e}};function Am(e,t,n,a,r,i,u,o,s){El=!1,Io=null,VS.apply(wS,arguments)}function YS(){return El}function Hm(){if(El){var e=Io;return El=!1,Io=null,e}else throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.")}var Lm=null;Lm=new Set;var $o=!1,bn=!1,qS=typeof WeakSet=="function"?WeakSet:Set,J=null,Eu=null,Tu=null;function QS(e){Am(null,function(){throw e}),Hm()}var GS=function(e,t){if(t.props=e.memoizedProps,t.state=e.memoizedState,e.mode&et)try{Cr(),t.componentWillUnmount()}finally{Rr(e)}else t.componentWillUnmount()};function jm(e,t){try{pi(Wt,e)}catch(n){ut(e,t,n)}}function td(e,t,n){try{GS(e,n)}catch(a){ut(e,t,a)}}function PS(e,t,n){try{n.componentDidMount()}catch(a){ut(e,t,a)}}function Fm(e,t){try{wm(e)}catch(n){ut(e,t,n)}}function Ru(e,t){var n=e.ref;if(n!==null)if(typeof n=="function"){var a;try{if(gt&&Cn&&e.mode&et)try{Cr(),a=n(null)}finally{Rr(e)}else a=n(null)}catch(r){ut(e,t,r)}typeof a=="function"&&h("Unexpected return value from a callback ref in %s. A callback ref should not return a function.",Z(e))}else n.current=null}function es(e,t,n){try{n()}catch(a){ut(e,t,a)}}var Bm=null,Vm=!1;function KS(e,t){Bm=Xi(e.containerInfo),J=t,WS();var n=Vm;return Vm=!1,Bm=null,n}function WS(){for(;J!==null;){var e=J,t=e.child;(e.subtreeFlags&Te)!==X&&t!==null?(t.return=e,J=t):kS()}}function kS(){for(;J!==null;){var e=J;Lt(e);try{XS(e)}catch(n){ut(e,e.return,n)}Qn();var t=e.sibling;if(t!==null){t.return=e.return,J=t;return}J=e.return}}function XS(e){var t=e.alternate,n=e.flags;if((n&Gt)!==X){switch(Lt(e),e.tag){case Ue:case ze:case Ae:break;case ge:{if(t!==null){var a=t.memoizedProps,r=t.memoizedState,i=e.stateNode;e.type===e.elementType&&!Yi&&(i.props!==e.memoizedProps&&h("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",Z(e)||"instance"),i.state!==e.memoizedState&&h("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",Z(e)||"instance"));var u=i.getSnapshotBeforeUpdate(e.elementType===e.type?a:tr(e.type,a),r);{var o=Lm;u===void 0&&!o.has(e.type)&&(o.add(e.type),h("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.",Z(e)))}i.__reactInternalSnapshotBeforeUpdate=u}break}case oe:{if(Ht){var s=e.stateNode;D(s.containerInfo)}break}case te:case be:case Me:case jt:break;default:throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.")}Qn()}}function ir(e,t,n){var a=t.updateQueue,r=a!==null?a.lastEffect:null;if(r!==null){var i=r.next,u=i;do{if((u.tag&e)===e){var o=u.destroy;u.destroy=void 0,o!==void 0&&((e&yn)!==aa?Yg(t):(e&Wt)!==aa&&qv(t),(e&Sr)!==aa&&Al(!0),es(t,n,o),(e&Sr)!==aa&&Al(!1),(e&yn)!==aa?qg():(e&Wt)!==aa&&Qv())}u=u.next}while(u!==i)}}function pi(e,t){var n=t.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var r=a.next,i=r;do{if((i.tag&e)===e){(e&yn)!==aa?Vg(t):(e&Wt)!==aa&&Qg(t);var u=i.create;(e&Sr)!==aa&&Al(!0),i.destroy=u(),(e&Sr)!==aa&&Al(!1),(e&yn)!==aa?wg():(e&Wt)!==aa&&Gg();{var o=i.destroy;if(o!==void 0&&typeof o!="function"){var s=void 0;(i.tag&Wt)!==X?s="useLayoutEffect":(i.tag&Sr)!==X?s="useInsertionEffect":s="useEffect";var f=void 0;o===null?f=" You returned null. If your effect does not require clean up, return undefined (or nothing).":typeof o.then=="function"?f=`

It looks like you wrote `+s+`(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

`+s+`(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching`:f=" You returned: "+o,h("%s must not return anything besides a function, which is used for clean-up.%s",s,f)}}}i=i.next}while(i!==r)}}function JS(e,t){if((t.flags&se)!==X)switch(t.tag){case Tt:{var n=t.stateNode.passiveEffectDuration,a=t.memoizedProps,r=a.id,i=a.onPostCommit,u=am(),o=t.alternate===null?"mount":"update";nm()&&(o="nested-update"),typeof i=="function"&&i(r,o,n,u);var s=t.return;e:for(;s!==null;){switch(s.tag){case oe:var f=s.stateNode;f.passiveEffectDuration+=n;break e;case Tt:var m=s.stateNode;m.passiveEffectDuration+=n;break e}s=s.return}break}}}function ZS(e,t,n,a){if((n.flags&ke)!==X)switch(n.tag){case Ue:case ze:case Ae:{if(!bn)if(n.mode&et)try{Cr(),pi(Wt|Kt,n)}finally{Rr(n)}else pi(Wt|Kt,n);break}case ge:{var r=n.stateNode;if(n.flags&se&&!bn)if(t===null)if(n.type===n.elementType&&!Yi&&(r.props!==n.memoizedProps&&h("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",Z(n)||"instance"),r.state!==n.memoizedState&&h("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",Z(n)||"instance")),n.mode&et)try{Cr(),r.componentDidMount()}finally{Rr(n)}else r.componentDidMount();else{var i=n.elementType===n.type?t.memoizedProps:tr(n.type,t.memoizedProps),u=t.memoizedState;if(n.type===n.elementType&&!Yi&&(r.props!==n.memoizedProps&&h("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",Z(n)||"instance"),r.state!==n.memoizedState&&h("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",Z(n)||"instance")),n.mode&et)try{Cr(),r.componentDidUpdate(i,u,r.__reactInternalSnapshotBeforeUpdate)}finally{Rr(n)}else r.componentDidUpdate(i,u,r.__reactInternalSnapshotBeforeUpdate)}var o=n.updateQueue;o!==null&&(n.type===n.elementType&&!Yi&&(r.props!==n.memoizedProps&&h("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",Z(n)||"instance"),r.state!==n.memoizedState&&h("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",Z(n)||"instance")),yp(n,o,r));break}case oe:{var s=n.updateQueue;if(s!==null){var f=null;if(n.child!==null)switch(n.child.tag){case te:f=Lr(n.child.stateNode);break;case ge:f=n.child.stateNode;break}yp(n,s,f)}break}case te:{var m=n.stateNode;if(t===null&&n.flags&se){var b=n.type,C=n.memoizedProps;qn(m,b,C,n)}break}case be:break;case Me:break;case Tt:{{var M=n.memoizedProps,H=M.onCommit,z=M.onRender,ee=n.stateNode.effectDuration,ve=am(),ie=t===null?"mount":"update";nm()&&(ie="nested-update"),typeof z=="function"&&z(n.memoizedProps.id,ie,n.actualDuration,n.treeBaseDuration,n.actualStartTime,ve);{typeof H=="function"&&H(n.memoizedProps.id,ie,ee,ve),oT(n);var Ze=n.return;e:for(;Ze!==null;){switch(Ze.tag){case oe:var we=Ze.stateNode;we.effectDuration+=ee;break e;case Tt:var E=Ze.stateNode;E.effectDuration+=ee;break e}Ze=Ze.return}}}break}case Fe:{uE(e,n);break}case bt:case jt:case $t:case at:case Ft:case Fn:break;default:throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.")}bn||n.flags&wn&&wm(n)}function IS(e){switch(e.tag){case Ue:case ze:case Ae:{if(e.mode&et)try{Cr(),jm(e,e.return)}finally{Rr(e)}else jm(e,e.return);break}case ge:{var t=e.stateNode;typeof t.componentDidMount=="function"&&PS(e,e.return,t),Fm(e,e.return);break}case te:{Fm(e,e.return);break}}}function $S(e,t){var n=null;if(Ht)for(var a=e;;){if(a.tag===te){if(n===null){n=a;try{var r=a.stateNode;t?Fs(r):v(a.stateNode,a.memoizedProps)}catch(u){ut(e,e.return,u)}}}else if(a.tag===be){if(n===null)try{var i=a.stateNode;t?l(i):T(i,a.memoizedProps)}catch(u){ut(e,e.return,u)}}else if(!((a.tag===at||a.tag===Ft)&&a.memoizedState!==null&&a!==e)){if(a.child!==null){a.child.return=a,a=a.child;continue}}if(a===e)return;for(;a.sibling===null;){if(a.return===null||a.return===e)return;n===a&&(n=null),a=a.return}n===a&&(n=null),a.sibling.return=a.return,a=a.sibling}}function wm(e){var t=e.ref;if(t!==null){var n=e.stateNode,a;switch(e.tag){case te:a=Lr(n);break;default:a=n}if(typeof t=="function"){var r;if(e.mode&et)try{Cr(),r=t(a)}finally{Rr(e)}else r=t(a);typeof r=="function"&&h("Unexpected return value from a callback ref in %s. A callback ref should not return a function.",Z(e))}else t.hasOwnProperty("current")||h("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().",Z(e)),t.current=a}}function eE(e){var t=e.alternate;t!==null&&(t.return=null),e.return=null}function Ym(e){var t=e.alternate;t!==null&&(e.alternate=null,Ym(t));{if(e.child=null,e.deletions=null,e.sibling=null,e.tag===te){var n=e.stateNode;n!==null&&fa(n)}e.stateNode=null,e._debugOwner=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}}function tE(e){if(Fr){var t=e.stateNode,n=t.containerInfo,a=ce(n);Be(n,a)}}function nE(e){for(var t=e.return;t!==null;){if(qm(t))return t;t=t.return}throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.")}function qm(e){return e.tag===te||e.tag===oe||e.tag===Me}function Qm(e){var t=e;e:for(;;){for(;t.sibling===null;){if(t.return===null||qm(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==te&&t.tag!==be&&t.tag!==jn;){if(t.flags&Qe||t.child===null||t.tag===Me)continue e;t.child.return=t,t=t.child}if(!(t.flags&Qe))return t.stateNode}}function aE(e){if(Ht){var t=nE(e);switch(t.tag){case te:{var n=t.stateNode;t.flags&In&&(ha(n),t.flags&=~In);var a=Qm(e);ad(e,a,n);break}case oe:case Me:{var r=t.stateNode.containerInfo,i=Qm(e);nd(e,i,r);break}default:throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.")}}}function nd(e,t,n){var a=e.tag,r=a===te||a===be;if(r){var i=e.stateNode;t?na(n,i,t):ma(n,i)}else if(a!==Me){var u=e.child;if(u!==null){nd(u,t,n);for(var o=u.sibling;o!==null;)nd(o,t,n),o=o.sibling}}}function ad(e,t,n){var a=e.tag,r=a===te||a===be;if(r){var i=e.stateNode;t?ta(n,i,t):dn(n,i)}else if(a!==Me){var u=e.child;if(u!==null){ad(u,t,n);for(var o=u.sibling;o!==null;)ad(o,t,n),o=o.sibling}}}var Sn=null,ur=!1;function rE(e,t,n){if(Ht){var a=t;e:for(;a!==null;){switch(a.tag){case te:{Sn=a.stateNode,ur=!1;break e}case oe:{Sn=a.stateNode.containerInfo,ur=!0;break e}case Me:{Sn=a.stateNode.containerInfo,ur=!0;break e}}a=a.return}if(Sn===null)throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");rd(e,t,n),Sn=null,ur=!1}else rd(e,t,n);eE(n)}function Dr(e,t,n){for(var a=n.child;a!==null;)rd(e,t,a),a=a.sibling}function rd(e,t,n){switch(Lg(n),n.tag){case te:bn||Ru(n,t);case be:{if(Ht){var a=Sn,r=ur;Sn=null,Dr(e,t,n),Sn=a,ur=r,Sn!==null&&(ur?La(Sn,n.stateNode):Ha(Sn,n.stateNode))}else Dr(e,t,n);return}case jn:{Ht&&Sn!==null&&(ur?Fy(Sn,n.stateNode):jy(Sn,n.stateNode));return}case Me:{if(Ht){var i=Sn,u=ur;Sn=n.stateNode.containerInfo,ur=!0,Dr(e,t,n),Sn=i,ur=u}else tE(n),Dr(e,t,n);return}case Ue:case ze:case lt:case Ae:{if(!bn){var o=n.updateQueue;if(o!==null){var s=o.lastEffect;if(s!==null){var f=s.next,m=f;do{var b=m,C=b.destroy,M=b.tag;C!==void 0&&((M&Sr)!==aa?es(n,t,C):(M&Wt)!==aa&&(qv(n),n.mode&et?(Cr(),es(n,t,C),Rr(n)):es(n,t,C),Qv())),m=m.next}while(m!==f)}}}Dr(e,t,n);return}case ge:{if(!bn){Ru(n,t);var H=n.stateNode;typeof H.componentWillUnmount=="function"&&td(n,t,H)}Dr(e,t,n);return}case $t:{Dr(e,t,n);return}case at:{if(n.mode&Ge){var z=bn;bn=z||n.memoizedState!==null,Dr(e,t,n),bn=z}else Dr(e,t,n);break}default:{Dr(e,t,n);return}}}function iE(e){var t=e.memoizedState}function uE(e,t){if(_t){var n=t.memoizedState;if(n===null){var a=t.alternate;if(a!==null){var r=a.memoizedState;if(r!==null){var i=r.dehydrated;i!==null&&Ly(i)}}}}}function Gm(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new qS),t.forEach(function(a){var r=mT.bind(null,e,a);if(!n.has(a)){if(n.add(a),Ia)if(Eu!==null&&Tu!==null)zl(Tu,Eu);else throw Error("Expected finished root and lanes to be set. This is a bug in React.");a.then(r,r)}})}}function lE(e,t,n){Eu=n,Tu=e,Lt(t),Pm(t,e),Lt(t),Eu=null,Tu=null}function lr(e,t,n){var a=t.deletions;if(a!==null)for(var r=0;r<a.length;r++){var i=a[r];try{rE(e,t,i)}catch(s){ut(i,t,s)}}var u=Rb();if(t.subtreeFlags&pt)for(var o=t.child;o!==null;)Lt(o),Pm(o,e),o=o.sibling;Lt(u)}function Pm(e,t,n){var a=e.alternate,r=e.flags;switch(e.tag){case Ue:case ze:case lt:case Ae:{if(lr(t,e),_r(e),r&se){try{ir(Sr|Kt,e,e.return),pi(Sr|Kt,e)}catch(le){ut(e,e.return,le)}if(e.mode&et){try{Cr(),ir(Wt|Kt,e,e.return)}catch(le){ut(e,e.return,le)}Rr(e)}else try{ir(Wt|Kt,e,e.return)}catch(le){ut(e,e.return,le)}}return}case ge:{lr(t,e),_r(e),r&wn&&a!==null&&Ru(a,a.return);return}case te:{if(lr(t,e),_r(e),r&wn&&a!==null&&Ru(a,a.return),Ht){if(e.flags&In){var i=e.stateNode;try{ha(i)}catch(le){ut(e,e.return,le)}}if(r&se){var u=e.stateNode;if(u!=null){var o=e.memoizedProps,s=a!==null?a.memoizedProps:o,f=e.type,m=e.updateQueue;if(e.updateQueue=null,m!==null)try{ea(u,m,f,s,o,e)}catch(le){ut(e,e.return,le)}}}}return}case be:{if(lr(t,e),_r(e),r&se&&Ht){if(e.stateNode===null)throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");var b=e.stateNode,C=e.memoizedProps,M=a!==null?a.memoizedProps:C;try{Aa(b,M,C)}catch(le){ut(e,e.return,le)}}return}case oe:{if(lr(t,e),_r(e),r&se){if(Ht&&_t&&a!==null){var H=a.memoizedState;if(H.isDehydrated)try{Hy(t.containerInfo)}catch(le){ut(e,e.return,le)}}if(Fr){var z=t.containerInfo,ee=t.pendingChildren;try{Be(z,ee)}catch(le){ut(e,e.return,le)}}}return}case Me:{if(lr(t,e),_r(e),r&se&&Fr){var ve=e.stateNode,ie=ve.containerInfo,Ze=ve.pendingChildren;try{Be(ie,Ze)}catch(le){ut(e,e.return,le)}}return}case Fe:{lr(t,e),_r(e);var we=e.child;if(we.flags&$n){var E=we.stateNode,O=we.memoizedState,S=O!==null;if(E.isHidden=S,S){var F=we.alternate!==null&&we.alternate.memoizedState!==null;F||eT()}}if(r&se){try{iE(e)}catch(le){ut(e,e.return,le)}Gm(e)}return}case at:{var $=a!==null&&a.memoizedState!==null;if(e.mode&Ge){var k=bn;bn=k||$,lr(t,e),bn=k}else lr(t,e);if(_r(e),r&$n){var Ve=e.stateNode,he=e.memoizedState,We=he!==null,je=e;if(Ve.isHidden=We,We&&!$&&(je.mode&Ge)!==de){J=je;for(var dt=je.child;dt!==null;)J=dt,sE(dt),dt=dt.sibling}Ht&&$S(je,We)}return}case bt:{lr(t,e),_r(e),r&se&&Gm(e);return}case $t:return;default:{lr(t,e),_r(e);return}}}function _r(e){var t=e.flags;if(t&Qe){try{aE(e)}catch(n){ut(e,e.return,n)}e.flags&=~Qe}t&fn&&(e.flags&=~fn)}function oE(e,t,n){Eu=n,Tu=t,J=e,Km(e,t,n),Eu=null,Tu=null}function Km(e,t,n){for(var a=(e.mode&Ge)!==de;J!==null;){var r=J,i=r.child;if(r.tag===at&&a){var u=r.memoizedState!==null,o=u||$o;if(o){id(e,t,n);continue}else{var s=r.alternate,f=s!==null&&s.memoizedState!==null,m=f||bn,b=$o,C=bn;$o=o,bn=m,bn&&!C&&(J=r,cE(r));for(var M=i;M!==null;)J=M,Km(M,t,n),M=M.sibling;J=r,$o=b,bn=C,id(e,t,n);continue}}(r.subtreeFlags&ke)!==X&&i!==null?(i.return=r,J=i):id(e,t,n)}}function id(e,t,n){for(;J!==null;){var a=J;if((a.flags&ke)!==X){var r=a.alternate;Lt(a);try{ZS(t,r,a,n)}catch(u){ut(a,a.return,u)}Qn()}if(a===e){J=null;return}var i=a.sibling;if(i!==null){i.return=a.return,J=i;return}J=a.return}}function sE(e){for(;J!==null;){var t=J,n=t.child;switch(t.tag){case Ue:case ze:case lt:case Ae:{if(t.mode&et)try{Cr(),ir(Wt,t,t.return)}finally{Rr(t)}else ir(Wt,t,t.return);break}case ge:{Ru(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&td(t,t.return,a);break}case te:{Ru(t,t.return);break}case at:{var r=t.memoizedState!==null;if(r){Wm(e);continue}break}}n!==null?(n.return=t,J=n):Wm(e)}}function Wm(e){for(;J!==null;){var t=J;if(t===e){J=null;return}var n=t.sibling;if(n!==null){n.return=t.return,J=n;return}J=t.return}}function cE(e){for(;J!==null;){var t=J,n=t.child;if(t.tag===at){var a=t.memoizedState!==null;if(a){km(e);continue}}n!==null?(n.return=t,J=n):km(e)}}function km(e){for(;J!==null;){var t=J;Lt(t);try{IS(t)}catch(a){ut(t,t.return,a)}if(Qn(),t===e){J=null;return}var n=t.sibling;if(n!==null){n.return=t.return,J=n;return}J=t.return}}function fE(e,t,n,a){J=t,dE(t,e,n,a)}function dE(e,t,n,a){for(;J!==null;){var r=J,i=r.child;(r.subtreeFlags&Xe)!==X&&i!==null?(i.return=r,J=i):vE(e,t,n,a)}}function vE(e,t,n,a){for(;J!==null;){var r=J;if((r.flags&At)!==X){Lt(r);try{pE(t,r,n,a)}catch(u){ut(r,r.return,u)}Qn()}if(r===e){J=null;return}var i=r.sibling;if(i!==null){i.return=r.return,J=i;return}J=r.return}}function pE(e,t,n,a){switch(t.tag){case Ue:case ze:case Ae:{if(t.mode&et){Lf();try{pi(yn|Kt,t)}finally{Hf(t)}}else pi(yn|Kt,t);break}}}function mE(e){J=e,hE()}function hE(){for(;J!==null;){var e=J,t=e.child;if((J.flags&Bt)!==X){var n=e.deletions;if(n!==null){for(var a=0;a<n.length;a++){var r=n[a];J=r,bE(r,e)}{var i=e.alternate;if(i!==null){var u=i.child;if(u!==null){i.child=null;do{var o=u.sibling;u.sibling=null,u=o}while(u!==null)}}}J=e}}(e.subtreeFlags&Xe)!==X&&t!==null?(t.return=e,J=t):yE()}}function yE(){for(;J!==null;){var e=J;(e.flags&At)!==X&&(Lt(e),gE(e),Qn());var t=e.sibling;if(t!==null){t.return=e.return,J=t;return}J=e.return}}function gE(e){switch(e.tag){case Ue:case ze:case Ae:{e.mode&et?(Lf(),ir(yn|Kt,e,e.return),Hf(e)):ir(yn|Kt,e,e.return);break}}}function bE(e,t){for(;J!==null;){var n=J;Lt(n),EE(n,t),Qn();var a=n.child;a!==null?(a.return=n,J=a):SE(e)}}function SE(e){for(;J!==null;){var t=J,n=t.sibling,a=t.return;if(Ym(t),t===e){J=null;return}if(n!==null){n.return=a,J=n;return}J=a}}function EE(e,t){switch(e.tag){case Ue:case ze:case Ae:{e.mode&et?(Lf(),ir(yn,e,t),Hf(e)):ir(yn,e,t);break}}}function TE(e){switch(e.tag){case Ue:case ze:case Ae:{try{pi(Wt|Kt,e)}catch(n){ut(e,e.return,n)}break}case ge:{var t=e.stateNode;try{t.componentDidMount()}catch(n){ut(e,e.return,n)}break}}}function RE(e){switch(e.tag){case Ue:case ze:case Ae:{try{pi(yn|Kt,e)}catch(t){ut(e,e.return,t)}break}}}function CE(e){switch(e.tag){case Ue:case ze:case Ae:{try{ir(Wt|Kt,e,e.return)}catch(n){ut(e,e.return,n)}break}case ge:{var t=e.stateNode;typeof t.componentWillUnmount=="function"&&td(e,e.return,t);break}}}function xE(e){switch(e.tag){case Ue:case ze:case Ae:try{ir(yn|Kt,e,e.return)}catch(t){ut(e,e.return,t)}}}var ts=0,ns=1,as=2,rs=3,is=4;if(typeof Symbol=="function"&&Symbol.for){var Tl=Symbol.for;ts=Tl("selector.component"),ns=Tl("selector.has_pseudo_class"),as=Tl("selector.role"),rs=Tl("selector.test_id"),is=Tl("selector.text")}function DE(e){return{$$typeof:ts,value:e}}function _E(e){return{$$typeof:ns,value:e}}function OE(e){return{$$typeof:as,value:e}}function NE(e){return{$$typeof:is,value:e}}function UE(e){return{$$typeof:rs,value:e}}function ud(e){var t=ai(e);if(t!=null){if(typeof t.memoizedProps["data-testname"]!="string")throw new Error("Invalid host root specified. Should be either a React container or a node with a testname attribute.");return t}else{var n=va(e);if(n===null)throw new Error("Could not find React container within specified host subtree.");return n.stateNode.current}}function ld(e,t){switch(t.$$typeof){case ts:if(e.type===t.value)return!0;break;case ns:return ME(e,t.value);case as:if(e.tag===te){var n=e.stateNode;if(pa(n,t.value))return!0}break;case is:if(e.tag===te||e.tag===be){var a=Ma(e);if(a!==null&&a.indexOf(t.value)>=0)return!0}break;case rs:if(e.tag===te){var r=e.memoizedProps["data-testname"];if(typeof r=="string"&&r.toLowerCase()===t.value.toLowerCase())return!0}break;default:throw new Error("Invalid selector type specified.")}return!1}function od(e){switch(e.$$typeof){case ts:var t=ne(e.value)||"Unknown";return"<"+t+">";case ns:return":has("+(od(e)||"")+")";case as:return'[role="'+e.value+'"]';case is:return'"'+e.value+'"';case rs:return'[data-testname="'+e.value+'"]';default:throw new Error("Invalid selector type specified.")}}function Xm(e,t){for(var n=[],a=[e,0],r=0;r<a.length;){var i=a[r++],u=a[r++],o=t[u];if(!(i.tag===te&&Un(i))){for(;o!=null&&ld(i,o);)u++,o=t[u];if(u===t.length)n.push(i);else for(var s=i.child;s!==null;)a.push(s,u),s=s.sibling}}return n}function ME(e,t){for(var n=[e,0],a=0;a<n.length;){var r=n[a++],i=n[a++],u=t[i];if(!(r.tag===te&&Un(r))){for(;u!=null&&ld(r,u);)i++,u=t[i];if(i===t.length)return!0;for(var o=r.child;o!==null;)n.push(o,i),o=o.sibling}}return!1}function us(e,t){if(!en)throw new Error("Test selector API is not supported by this renderer.");for(var n=ud(e),a=Xm(n,t),r=[],i=Array.from(a),u=0;u<i.length;){var o=i[u++];if(o.tag===te){if(Un(o))continue;r.push(o.stateNode)}else for(var s=o.child;s!==null;)i.push(s),s=s.sibling}return r}function zE(e,t){if(!en)throw new Error("Test selector API is not supported by this renderer.");for(var n=ud(e),a=0,r=[],i=[n,0],u=0;u<i.length;){var o=i[u++],s=i[u++],f=t[s];if(!(o.tag===te&&Un(o))&&(ld(o,f)&&(r.push(od(f)),s++,s>a&&(a=s)),s<t.length))for(var m=o.child;m!==null;)i.push(m,s),m=m.sibling}if(a<t.length){for(var b=[],C=a;C<t.length;C++)b.push(od(t[C]));return`findAllNodes was able to match part of the selector:
`+("  "+r.join(" > ")+`

`)+`No matching component was found for:
`+("  "+b.join(" > "))}return null}function AE(e,t){if(!en)throw new Error("Test selector API is not supported by this renderer.");for(var n=us(e,t),a=[],r=0;r<n.length;r++)a.push(Ua(n[r]));for(var i=a.length-1;i>0;i--)for(var u=a[i],o=u.x,s=o+u.width,f=u.y,m=f+u.height,b=i-1;b>=0;b--)if(i!==b){var C=a[b],M=C.x,H=M+C.width,z=C.y,ee=z+C.height;if(o>=M&&f>=z&&s<=H&&m<=ee){a.splice(i,1);break}else if(o===M&&u.width===C.width&&!(ee<f)&&!(z>m)){z>f&&(C.height+=z-f,C.y=f),ee<m&&(C.height=m-z),a.splice(i,1);break}else if(f===z&&u.height===C.height&&!(H<o)&&!(M>s)){M>o&&(C.width+=M-o,C.x=o),H<s&&(C.width=s-M),a.splice(i,1);break}}return a}function HE(e,t){if(!en)throw new Error("Test selector API is not supported by this renderer.");for(var n=ud(e),a=Xm(n,t),r=Array.from(a),i=0;i<r.length;){var u=r[i++];if(!Un(u)){if(u.tag===te){var o=u.stateNode;if(Yn(o))return!0}for(var s=u.child;s!==null;)r.push(s),s=s.sibling}}return!1}var ls=[];function LE(){en&&ls.forEach(function(e){return e()})}function jE(e,t,n,a){if(!en)throw new Error("Test selector API is not supported by this renderer.");var r=us(e,t),i=za(r,n,a),u=i.disconnect,o=i.observe,s=i.unobserve,f=function(){var m=us(e,t);r.forEach(function(b){m.indexOf(b)<0&&s(b)}),m.forEach(function(b){r.indexOf(b)<0&&o(b)})};return ls.push(f),{disconnect:function(){var m=ls.indexOf(f);m>=0&&ls.splice(m,1),u()}}}var FE=A.ReactCurrentActQueue;function BE(e){{var t=typeof IS_REACT_ACT_ENVIRONMENT!="undefined"?IS_REACT_ACT_ENVIRONMENT:void 0,n=typeof jest!="undefined";return _i&&n&&t!==!1}}function Jm(){{var e=typeof IS_REACT_ACT_ENVIRONMENT!="undefined"?IS_REACT_ACT_ENVIRONMENT:void 0;return!e&&FE.current!==null&&h("The current testing environment is not configured to support act(...)"),e}}var VE=Math.ceil,sd=A.ReactCurrentDispatcher,cd=A.ReactCurrentOwner,xt=A.ReactCurrentBatchConfig,or=A.ReactCurrentActQueue,qt=0,fd=1,En=2,Ya=4,Kr=0,Rl=1,qi=2,os=3,Cl=4,Zm=5,dd=6,Ne=qt,Kn=null,Dt=null,Jt=L,Or=L,vd=ui(L),Zt=Kr,xl=null,pd=L,ss=L,Dl=L,cs=L,_l=null,ra=null,md=0,Im=500,$m=1/0,wE=500,Wr=null;function Cu(){$m=an()+wE}function eh(){return $m}var fs=!1,hd=null,xu=null,Qi=!1,mi=null,Ol=L,yd=[],gd=null,YE=50,Nl=0,bd=null,Sd=!1,ds=!1,qE=50,Du=0,vs=null,Ul=ht,ps=L,th=!1;function ms(){return Kn}function An(){return(Ne&(En|Ya))!==qt?an():(Ul!==ht||(Ul=an()),Ul)}function hi(e){var t=e.mode;if((t&Ge)===de)return me;if((Ne&En)!==qt&&Jt!==L)return Qu(Jt);var n=bb()!==gb;if(n){if(xt.transition!==null){var a=xt.transition;a._updatedFibers||(a._updatedFibers=new Set),a._updatedFibers.add(e)}return ps===tn&&(ps=Uv()),ps}var r=Za();if(r!==tn)return r;var i=ca();return i}function QE(e){var t=e.mode;return(t&Ge)===de?me:gg()}function Qt(e,t,n,a){yT(),th&&h("useInsertionEffect must not schedule updates."),Sd&&(ds=!0),Gu(e,n,a),(Ne&En)!==L&&e===Kn?ST(t):(Ia&&Av(e,t,n),ET(t),e===Kn&&((Ne&En)===qt&&(Dl=De(Dl,n)),Zt===Cl&&yi(e,Jt)),ia(e,a),n===me&&Ne===qt&&(t.mode&Ge)===de&&!or.isBatchingLegacy&&(Cu(),Wv()))}function GE(e,t,n){var a=e.current;a.lanes=t,Gu(e,t,n),ia(e,n)}function PE(e){return(Ne&En)!==qt}function ia(e,t){var n=e.callbackNode;dg(e,t);var a=eo(e,e===Kn?Jt:L);if(a===L){n!==null&&hh(n),e.callbackNode=null,e.callbackPriority=tn;return}var r=Ui(a),i=e.callbackPriority;if(i===r&&!(or.current!==null&&n!==Dd)){n==null&&i!==me&&h("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");return}n!=null&&hh(n);var u;if(r===me)e.tag===tu?(or.isBatchingLegacy!==null&&(or.didScheduleLegacyUpdate=!0),tb(rh.bind(null,e))):Kv(rh.bind(null,e)),da?or.current!==null?or.current.push(gr):Na(function(){(Ne&(En|Ya))===qt&&gr()}):Es(ao,gr),u=null;else{var o;switch(Fv(a)){case hr:o=ao;break;case Pu:o=Vv;break;case Ku:o=uu;break;case Ec:o=wv;break;default:o=uu;break}u=Es(o,nh.bind(null,e))}e.callbackPriority=r,e.callbackNode=u}function nh(e,t){if(eS(),Ul=ht,ps=L,(Ne&(En|Ya))!==qt)throw new Error("Should not already be working.");var n=e.callbackNode,a=Nr();if(a&&e.callbackNode!==n)return null;var r=eo(e,e===Kn?Jt:L);if(r===L)return null;var i=!to(e,r)&&!yg(e,r)&&!t,u=i?iT(e,r):gs(e,r);if(u!==Kr){if(u===qi){var o=hc(e);o!==L&&(r=o,u=Ed(e,o))}if(u===Rl){var s=xl;throw Gi(e,L),yi(e,r),ia(e,an()),s}if(u===dd)yi(e,r);else{var f=!to(e,r),m=e.current.alternate;if(f&&!WE(m)){if(u=gs(e,r),u===qi){var b=hc(e);b!==L&&(r=b,u=Ed(e,b))}if(u===Rl){var C=xl;throw Gi(e,L),yi(e,r),ia(e,an()),C}}e.finishedWork=m,e.finishedLanes=r,KE(e,u,r)}}return ia(e,an()),e.callbackNode===n?nh.bind(null,e):null}function Ed(e,t){var n=_l;if(kv(e)){var a=Gi(e,t);a.flags|=cn,$y(e.containerInfo)}var r=gs(e,t);if(r!==qi){var i=ra;ra=n,i!==null&&ah(i)}return r}function ah(e){ra===null?ra=e:ra.push.apply(ra,e)}function KE(e,t,n){switch(t){case Kr:case Rl:throw new Error("Root did not complete. This is a bug in React.");case qi:{Pi(e,ra,Wr);break}case os:{if(yi(e,n),Ov(n)&&!yh()){var a=md+Im-an();if(a>10){var r=eo(e,L);if(r!==L)break;var i=e.suspendedLanes;if(!iu(i,n)){var u=An();zv(e,i);break}e.timeoutHandle=Di(Pi.bind(null,e,ra,Wr),a);break}}Pi(e,ra,Wr);break}case Cl:{if(yi(e,n),hg(n))break;if(!yh()){var o=cg(e,n),s=o,f=an()-s,m=hT(f)-f;if(m>10){e.timeoutHandle=Di(Pi.bind(null,e,ra,Wr),m);break}}Pi(e,ra,Wr);break}case Zm:{Pi(e,ra,Wr);break}default:throw new Error("Unknown root exit status.")}}function WE(e){for(var t=e;;){if(t.flags&Da){var n=t.updateQueue;if(n!==null){var a=n.stores;if(a!==null)for(var r=0;r<a.length;r++){var i=a[r],u=i.getSnapshot,o=i.value;try{if(!Sa(u(),o))return!1}catch(f){return!1}}}}var s=t.child;if(t.subtreeFlags&Da&&s!==null){s.return=t,t=s;continue}if(t===e)return!0;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}return!0}function yi(e,t){t=no(t,cs),t=no(t,Dl),Sg(e,t)}function rh(e){if(tS(),(Ne&(En|Ya))!==qt)throw new Error("Should not already be working.");Nr();var t=eo(e,L);if(!ba(t,me))return ia(e,an()),null;var n=gs(e,t);if(e.tag!==tu&&n===qi){var a=hc(e);a!==L&&(t=a,n=Ed(e,a))}if(n===Rl){var r=xl;throw Gi(e,L),yi(e,t),ia(e,an()),r}if(n===dd)throw new Error("Root did not complete. This is a bug in React.");var i=e.current.alternate;return e.finishedWork=i,e.finishedLanes=t,Pi(e,ra,Wr),ia(e,an()),null}function kE(e,t){t!==L&&(Sc(e,De(t,me)),ia(e,an()),(Ne&(En|Ya))===qt&&(Cu(),gr()))}function XE(e){var t=Za(),n=xt.transition;try{return xt.transition=null,nn(Ku),e()}finally{nn(t),xt.transition=n}}function JE(e,t){var n=Ne;Ne|=fd;try{return e(t)}finally{Ne=n,Ne===qt&&!or.isBatchingLegacy&&(Cu(),Wv())}}function ZE(e,t,n,a,r){var i=Za(),u=xt.transition;try{return xt.transition=null,nn(hr),e(t,n,a,r)}finally{nn(i),xt.transition=u,Ne===qt&&Cu()}}function hs(e){mi!==null&&mi.tag===tu&&(Ne&(En|Ya))===qt&&Nr();var t=Ne;Ne|=fd;var n=xt.transition,a=Za();try{return xt.transition=null,nn(hr),e?e():void 0}finally{nn(a),xt.transition=n,Ne=t,(Ne&(En|Ya))===qt&&gr()}}function IE(){return(Ne&(En|Ya))!==qt}function $E(e){var t=Ne;Ne|=fd;var n=xt.transition,a=Za();try{xt.transition=null,nn(hr),e()}finally{nn(a),xt.transition=n,Ne=t,Ne===qt&&(Cu(),gr())}}function ys(e,t){vn(vd,Or,e),Or=De(Or,t),pd=De(pd,t)}function Td(e){Or=vd.current,Mn(vd,e)}function Gi(e,t){e.finishedWork=null,e.finishedLanes=L;var n=e.timeoutHandle;if(n!==ka&&(e.timeoutHandle=ka,Ji(n)),Dt!==null)for(var a=Dt.return;a!==null;){var r=a.alternate;Um(r,a),a=a.return}Kn=e;var i=Ki(e.current,null);return Dt=i,Jt=Or=pd=t,Zt=Kr,xl=null,ss=L,Dl=L,cs=L,_l=null,ra=null,Nb(),er.discardPendingWarnings(),i}function ih(e,t){do{var n=Dt;try{if(po(),Ap(),Qn(),cd.current=null,n===null||n.return===null){Zt=Rl,xl=t,Dt=null;return}if(gt&&n.mode&et&&Ko(n,!0),ot)if(lu(),t!==null&&typeof t=="object"&&typeof t.then=="function"){var a=t;Kg(n,a,Jt)}else Pg(n,t,Jt);uS(e,n.return,n,t,Jt),sh(n)}catch(r){t=r,Dt===n&&n!==null?(n=n.return,Dt=n):n=Dt;continue}return}while(!0)}function uh(){var e=sd.current;return sd.current=Yo,e===null?Yo:e}function lh(e){sd.current=e}function eT(){md=an()}function Ml(e){ss=De(e,ss)}function tT(){Zt===Kr&&(Zt=os)}function Rd(){(Zt===Kr||Zt===os||Zt===qi)&&(Zt=Cl),Kn!==null&&(yc(ss)||yc(Dl))&&yi(Kn,Jt)}function nT(e){Zt!==Cl&&(Zt=qi),_l===null?_l=[e]:_l.push(e)}function aT(){return Zt===Kr}function gs(e,t){var n=Ne;Ne|=En;var a=uh();if(Kn!==e||Jt!==t){if(Ia){var r=e.memoizedUpdaters;r.size>0&&(zl(e,Jt),r.clear()),Hv(e,t)}Wr=Lv(),Gi(e,t)}Gv(t);do try{rT();break}catch(i){ih(e,i)}while(!0);if(po(),Ne=n,lh(a),Dt!==null)throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");return Pv(),Kn=null,Jt=L,Zt}function rT(){for(;Dt!==null;)oh(Dt)}function iT(e,t){var n=Ne;Ne|=En;var a=uh();if(Kn!==e||Jt!==t){if(Ia){var r=e.memoizedUpdaters;r.size>0&&(zl(e,Jt),r.clear()),Hv(e,t)}Wr=Lv(),Cu(),Gi(e,t)}Gv(t);do try{uT();break}catch(i){ih(e,i)}while(!0);return po(),lh(a),Ne=n,Dt!==null?(Zg(),Kr):(Pv(),Kn=null,Jt=L,Zt)}function uT(){for(;Dt!==null&&!_g();)oh(Dt)}function oh(e){var t=e.alternate;Lt(e);var n;(e.mode&et)!==de?(Af(e),n=Cd(t,e,Or),Ko(e,!0)):n=Cd(t,e,Or),Qn(),e.memoizedProps=e.pendingProps,n===null?sh(e):Dt=n,cd.current=null}function sh(e){var t=e;do{var n=t.alternate,a=t.return;if((t.flags&oa)===X){Lt(t);var r=void 0;if((t.mode&et)===de?r=Nm(n,t,Or):(Af(t),r=Nm(n,t,Or),Ko(t,!1)),Qn(),r!==null){Dt=r;return}}else{var i=BS(n,t);if(i!==null){i.flags&=Jr,Dt=i;return}if((t.mode&et)!==de){Ko(t,!1);for(var u=t.actualDuration,o=t.child;o!==null;)u+=o.actualDuration,o=o.sibling;t.actualDuration=u}if(a!==null)a.flags|=oa,a.subtreeFlags=X,a.deletions=null;else{Zt=dd,Dt=null;return}}var s=t.sibling;if(s!==null){Dt=s;return}t=a,Dt=t}while(t!==null);Zt===Kr&&(Zt=Zm)}function Pi(e,t,n){var a=Za(),r=xt.transition;try{xt.transition=null,nn(hr),lT(e,t,n,a)}finally{xt.transition=r,nn(a)}return null}function lT(e,t,n,a){do Nr();while(mi!==null);if(gT(),(Ne&(En|Ya))!==qt)throw new Error("Should not already be working.");var r=e.finishedWork,i=e.finishedLanes;if(Bg(i),r===null)return Yv(),null;if(i===L&&h("root.finishedLanes should not be empty during a commit. This is a bug in React."),e.finishedWork=null,e.finishedLanes=L,r===e.current)throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");e.callbackNode=null,e.callbackPriority=tn;var u=De(r.lanes,r.childLanes);Eg(e,u),e===Kn&&(Kn=null,Dt=null,Jt=L),((r.subtreeFlags&Xe)!==X||(r.flags&Xe)!==X)&&(Qi||(Qi=!0,gd=n,Es(uu,function(){return Nr(),null})));var o=(r.subtreeFlags&(Te|pt|ke|Xe))!==X,s=(r.flags&(Te|pt|ke|Xe))!==X;if(o||s){var f=xt.transition;xt.transition=null;var m=Za();nn(hr);var b=Ne;Ne|=Ya,cd.current=null;var C=KS(e,r);rm(),lE(e,r,i),$r(e.containerInfo),e.current=r,Wg(i),oE(r,e,i),kg(),Og(),Ne=b,nn(m),xt.transition=f}else e.current=r,rm();var M=Qi;if(Qi?(Qi=!1,mi=e,Ol=i):(Du=0,vs=null),u=e.pendingLanes,u===L&&(xu=null),M||vh(e.current,!1),Ag(r.stateNode,a),Ia&&e.memoizedUpdaters.clear(),LE(),ia(e,an()),t!==null)for(var H=e.onRecoverableError,z=0;z<t.length;z++){var ee=t[z],ve=ee.stack,ie=ee.digest;H(ee.value,{componentStack:ve,digest:ie})}if(fs){fs=!1;var Ze=hd;throw hd=null,Ze}return ba(Ol,me)&&e.tag!==tu&&Nr(),u=e.pendingLanes,ba(u,me)?($b(),e===bd?Nl++:(Nl=0,bd=e)):Nl=0,gr(),Yv(),null}function Nr(){if(mi!==null){var e=Fv(Ol),t=xg(Ku,e),n=xt.transition,a=Za();try{return xt.transition=null,nn(t),sT()}finally{nn(a),xt.transition=n}}return!1}function oT(e){yd.push(e),Qi||(Qi=!0,Es(uu,function(){return Nr(),null}))}function sT(){if(mi===null)return!1;var e=gd;gd=null;var t=mi,n=Ol;if(mi=null,Ol=L,(Ne&(En|Ya))!==qt)throw new Error("Cannot flush passive effects while already rendering.");Sd=!0,ds=!1,Xg(n);var a=Ne;Ne|=Ya,mE(t.current),fE(t,t.current,n,e);{var r=yd;yd=[];for(var i=0;i<r.length;i++){var u=r[i];JS(t,u)}}Jg(),vh(t.current,!0),Ne=a,gr(),ds?t===vs?Du++:(Du=0,vs=t):Du=0,Sd=!1,ds=!1,Hg(t);{var o=t.current.stateNode;o.effectDuration=0,o.passiveEffectDuration=0}return!0}function ch(e){return xu!==null&&xu.has(e)}function cT(e){xu===null?xu=new Set([e]):xu.add(e)}function fT(e){fs||(fs=!0,hd=e)}var dT=fT;function fh(e,t,n){var a=wi(n,t),r=um(e,a,me),i=si(e,r,me),u=An();i!==null&&(Gu(i,me,u),ia(i,u))}function ut(e,t,n){if(QS(n),Al(!1),e.tag===oe){fh(e,e,n);return}var a=null;for(a=t;a!==null;){if(a.tag===oe){fh(a,e,n);return}else if(a.tag===ge){var r=a.type,i=a.stateNode;if(typeof r.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&!ch(i)){var u=wi(n,e),o=Vf(a,u,me),s=si(a,o,me),f=An();s!==null&&(Gu(s,me,f),ia(s,f));return}}a=a.return}h(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`,n)}function vT(e,t,n){var a=e.pingCache;a!==null&&a.delete(t);var r=An();zv(e,n),TT(e),Kn===e&&iu(Jt,n)&&(Zt===Cl||Zt===os&&Ov(Jt)&&an()-md<Im?Gi(e,L):cs=De(cs,n)),ia(e,r)}function dh(e,t){t===tn&&(t=QE(e));var n=An(),a=Gn(e,t);a!==null&&(Gu(a,t,n),ia(a,n))}function pT(e){var t=e.memoizedState,n=tn;t!==null&&(n=t.retryLane),dh(e,n)}function mT(e,t){var n=tn,a;switch(e.tag){case Fe:a=e.stateNode;var r=e.memoizedState;r!==null&&(n=r.retryLane);break;case bt:a=e.stateNode;break;default:throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.")}a!==null&&a.delete(t),dh(e,n)}function hT(e){return e<120?120:e<480?480:e<1080?1080:e<1920?1920:e<3e3?3e3:e<4320?4320:VE(e/1960)*1960}function yT(){if(Nl>YE)throw Nl=0,bd=null,new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");Du>qE&&(Du=0,vs=null,h("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."))}function gT(){er.flushLegacyContextWarning(),er.flushPendingUnsafeLifecycleWarnings()}function vh(e,t){Lt(e),bs(e,Oe,CE),t&&bs(e,Ce,xE),bs(e,Oe,TE),t&&bs(e,Ce,RE),Qn()}function bs(e,t,n){for(var a=e,r=null;a!==null;){var i=a.subtreeFlags&t;a!==r&&a.child!==null&&i!==X?a=a.child:((a.flags&t)!==X&&n(a),a.sibling!==null?a=a.sibling:a=r=a.return)}}var Ss=null;function ph(e){{if((Ne&En)!==qt||!(e.mode&Ge))return;var t=e.tag;if(t!==It&&t!==oe&&t!==ge&&t!==Ue&&t!==ze&&t!==lt&&t!==Ae)return;var n=Z(e)||"ReactComponent";if(Ss!==null){if(Ss.has(n))return;Ss.add(n)}else Ss=new Set([n]);var a=Ea;try{Lt(e),h("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.")}finally{a?Lt(e):Qn()}}}var Cd;{var bT=null;Cd=function(e,t,n){var a=Th(bT,t);try{return xm(e,t,n)}catch(i){if(sb()||i!==null&&typeof i=="object"&&typeof i.then=="function")throw i;if(po(),Ap(),Um(e,t),Th(t,a),t.mode&et&&Af(t),Am(null,xm,null,e,t,n),YS()){var r=Hm();typeof r=="object"&&r!==null&&r._suppressLogging&&typeof i=="object"&&i!==null&&!i._suppressLogging&&(i._suppressLogging=!0)}throw i}}}var mh=!1,xd;xd=new Set;function ST(e){if(Xu&&!Jb())switch(e.tag){case Ue:case ze:case Ae:{var t=Dt&&Z(Dt)||"Unknown",n=t;if(!xd.has(n)){xd.add(n);var a=Z(e)||"Unknown";h("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render",a,t,t)}break}case ge:{mh||(h("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."),mh=!0);break}}}function zl(e,t){if(Ia){var n=e.memoizedUpdaters;n.forEach(function(a){Av(e,a,t)})}}var Dd={};function Es(e,t){{var n=or.current;return n!==null?(n.push(t),Dd):Bv(e,t)}}function hh(e){if(e!==Dd)return Dg(e)}function yh(){return or.current!==null}function ET(e){{if(e.mode&Ge){if(!Jm())return}else if(!BE()||Ne!==qt||e.tag!==Ue&&e.tag!==ze&&e.tag!==Ae)return;if(or.current===null){var t=Ea;try{Lt(e),h(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`,Z(e))}finally{t?Lt(e):Qn()}}}}function TT(e){e.tag!==tu&&Jm()&&or.current===null&&h(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`)}function Al(e){th=e}var qa=null,_u=null,RT=function(e){qa=e};function Ou(e){{if(qa===null)return e;var t=qa(e);return t===void 0?e:t.current}}function _d(e){return Ou(e)}function Od(e){{if(qa===null)return e;var t=qa(e);if(t===void 0){if(e!=null&&typeof e.render=="function"){var n=Ou(e.render);if(e.render!==n){var a={$$typeof:St,render:n};return e.displayName!==void 0&&(a.displayName=e.displayName),a}}return e}return t.current}}function gh(e,t){{if(qa===null)return!1;var n=e.elementType,a=t.type,r=!1,i=typeof a=="object"&&a!==null?a.$$typeof:null;switch(e.tag){case ge:{typeof a=="function"&&(r=!0);break}case Ue:{(typeof a=="function"||i===rt)&&(r=!0);break}case ze:{(i===St||i===rt)&&(r=!0);break}case lt:case Ae:{(i===Vn||i===rt)&&(r=!0);break}default:return!1}if(r){var u=qa(n);if(u!==void 0&&u===qa(a))return!0}return!1}}function bh(e){{if(qa===null||typeof WeakSet!="function")return;_u===null&&(_u=new WeakSet),_u.add(e)}}var CT=function(e,t){{if(qa===null)return;var n=t.staleFamilies,a=t.updatedFamilies;Nr(),hs(function(){Nd(e.current,a,n)})}},xT=function(e,t){{if(e.context!==ya)return;Nr(),hs(function(){xh(t,e,null,null)})}};function Nd(e,t,n){{var a=e.alternate,r=e.child,i=e.sibling,u=e.tag,o=e.type,s=null;switch(u){case Ue:case Ae:case ge:s=o;break;case ze:s=o.render;break}if(qa===null)throw new Error("Expected resolveFamily to be set during hot reload.");var f=!1,m=!1;if(s!==null){var b=qa(s);b!==void 0&&(n.has(b)?m=!0:t.has(b)&&(u===ge?m=!0:f=!0))}if(_u!==null&&(_u.has(e)||a!==null&&_u.has(a))&&(m=!0),m&&(e._debugNeedsRemount=!0),m||f){var C=Gn(e,me);C!==null&&Qt(C,e,me,ht)}r!==null&&!m&&Nd(r,t,n),i!==null&&Nd(i,t,n)}}var DT=function(e,t){{var n=new Set,a=new Set(t.map(function(r){return r.current}));return Ud(e.current,a,n),n}};function Ud(e,t,n){{var a=e.child,r=e.sibling,i=e.tag,u=e.type,o=null;switch(i){case Ue:case Ae:case ge:o=u;break;case ze:o=u.render;break}var s=!1;o!==null&&t.has(o)&&(s=!0),s?_T(e,n):a!==null&&Ud(a,t,n),r!==null&&Ud(r,t,n)}}function _T(e,t){{var n=OT(e,t);if(n)return;for(var a=e;;){switch(a.tag){case te:t.add(a.stateNode);return;case Me:t.add(a.stateNode.containerInfo);return;case oe:t.add(a.stateNode.containerInfo);return}if(a.return===null)throw new Error("Expected to reach root first.");a=a.return}}}function OT(e,t){for(var n=e,a=!1;;){if(n.tag===te)a=!0,t.add(n.stateNode);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)return a;for(;n.sibling===null;){if(n.return===null||n.return===e)return a;n=n.return}n.sibling.return=n.return,n=n.sibling}return!1}var Md;{Md=!1;try{var Sh=Object.preventExtensions({})}catch(e){Md=!0}}function NT(e,t,n,a){this.tag=e,this.key=n,this.elementType=null,this.type=null,this.stateNode=null,this.return=null,this.child=null,this.sibling=null,this.index=0,this.ref=null,this.pendingProps=t,this.memoizedProps=null,this.updateQueue=null,this.memoizedState=null,this.dependencies=null,this.mode=a,this.flags=X,this.subtreeFlags=X,this.deletions=null,this.lanes=L,this.childLanes=L,this.alternate=null,this.actualDuration=Number.NaN,this.actualStartTime=Number.NaN,this.selfBaseDuration=Number.NaN,this.treeBaseDuration=Number.NaN,this.actualDuration=0,this.actualStartTime=-1,this.selfBaseDuration=0,this.treeBaseDuration=0,this._debugSource=null,this._debugOwner=null,this._debugNeedsRemount=!1,this._debugHookTypes=null,!Md&&typeof Object.preventExtensions=="function"&&Object.preventExtensions(this)}var Ta=function(e,t,n,a){return new NT(e,t,n,a)};function zd(e){var t=e.prototype;return!!(t&&t.isReactComponent)}function UT(e){return typeof e=="function"&&!zd(e)&&e.defaultProps===void 0}function MT(e){if(typeof e=="function")return zd(e)?ge:Ue;if(e!=null){var t=e.$$typeof;if(t===St)return ze;if(t===Vn)return lt}return It}function Ki(e,t){var n=e.alternate;n===null?(n=Ta(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n._debugSource=e._debugSource,n._debugOwner=e._debugOwner,n._debugHookTypes=e._debugHookTypes,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=X,n.subtreeFlags=X,n.deletions=null,n.actualDuration=0,n.actualStartTime=-1),n.flags=e.flags&ct,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue;var a=e.dependencies;switch(n.dependencies=a===null?null:{lanes:a.lanes,firstContext:a.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.selfBaseDuration=e.selfBaseDuration,n.treeBaseDuration=e.treeBaseDuration,n._debugNeedsRemount=e._debugNeedsRemount,n.tag){case It:case Ue:case Ae:n.type=Ou(e.type);break;case ge:n.type=_d(e.type);break;case ze:n.type=Od(e.type);break}return n}function zT(e,t){e.flags&=ct|Qe;var n=e.alternate;if(n===null)e.childLanes=L,e.lanes=t,e.child=null,e.subtreeFlags=X,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null,e.selfBaseDuration=0,e.treeBaseDuration=0;else{e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=X,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type;var a=n.dependencies;e.dependencies=a===null?null:{lanes:a.lanes,firstContext:a.firstContext},e.selfBaseDuration=n.selfBaseDuration,e.treeBaseDuration=n.treeBaseDuration}return e}function AT(e,t,n){var a;return e===Cv?(a=Ge,t===!0&&(a|=wt,a|=pr)):a=de,Ia&&(a|=et),Ta(oe,null,null,a)}function Ad(e,t,n,a,r,i){var u=It,o=e;if(typeof e=="function")zd(e)?(u=ge,o=_d(o)):o=Ou(o);else if(typeof e=="string")u=te;else e:switch(e){case Bn:return gi(n.children,r,i,t);case xn:u=st,r|=wt,(r&Ge)!==de&&(r|=pr);break;case Ut:return HT(n,r,i,t);case Mt:return LT(n,r,i,t);case Jn:return jT(n,r,i,t);case ua:return Eh(n,r,i,t);case la:case _n:case On:case Qa:case xa:default:{if(typeof e=="object"&&e!==null)switch(e.$$typeof){case sn:u=Et;break e;case Dn:u=ue;break e;case St:u=ze,o=Od(o);break e;case Vn:u=lt;break e;case rt:u=Rt,o=null;break e}var s="";{(e===void 0||typeof e=="object"&&e!==null&&Object.keys(e).length===0)&&(s+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var f=a?Z(a):null;f&&(s+=`

Check the render method of \``+f+"`.")}throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) "+("but got: "+(e==null?e:typeof e)+"."+s))}}var m=Ta(u,n,t,r);return m.elementType=e,m.type=o,m.lanes=i,m._debugOwner=a,m}function Hd(e,t,n){var a=null;a=e._owner;var r=e.type,i=e.key,u=e.props,o=Ad(r,i,u,a,t,n);return o._debugSource=e._source,o._debugOwner=e._owner,o}function gi(e,t,n,a){var r=Ta(xe,e,a,t);return r.lanes=n,r}function HT(e,t,n,a){typeof e.id!="string"&&h('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.',typeof e.id);var r=Ta(Tt,e,a,t|et);return r.elementType=Ut,r.lanes=n,r.stateNode={effectDuration:0,passiveEffectDuration:0},r}function LT(e,t,n,a){var r=Ta(Fe,e,a,t);return r.elementType=Mt,r.lanes=n,r}function jT(e,t,n,a){var r=Ta(bt,e,a,t);return r.elementType=Jn,r.lanes=n,r}function Eh(e,t,n,a){var r=Ta(at,e,a,t);r.elementType=ua,r.lanes=n;var i={isHidden:!1};return r.stateNode=i,r}function Ld(e,t,n){var a=Ta(be,e,null,t);return a.lanes=n,a}function FT(){var e=Ta(te,null,null,de);return e.elementType="DELETED",e}function BT(e){var t=Ta(jn,null,null,de);return t.stateNode=e,t}function jd(e,t,n){var a=e.children!==null?e.children:[],r=Ta(Me,a,e.key,t);return r.lanes=n,r.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},r}function Th(e,t){return e===null&&(e=Ta(It,null,null,de)),e.tag=t.tag,e.key=t.key,e.elementType=t.elementType,e.type=t.type,e.stateNode=t.stateNode,e.return=t.return,e.child=t.child,e.sibling=t.sibling,e.index=t.index,e.ref=t.ref,e.pendingProps=t.pendingProps,e.memoizedProps=t.memoizedProps,e.updateQueue=t.updateQueue,e.memoizedState=t.memoizedState,e.dependencies=t.dependencies,e.mode=t.mode,e.flags=t.flags,e.subtreeFlags=t.subtreeFlags,e.deletions=t.deletions,e.lanes=t.lanes,e.childLanes=t.childLanes,e.alternate=t.alternate,e.actualDuration=t.actualDuration,e.actualStartTime=t.actualStartTime,e.selfBaseDuration=t.selfBaseDuration,e.treeBaseDuration=t.treeBaseDuration,e._debugSource=t._debugSource,e._debugOwner=t._debugOwner,e._debugNeedsRemount=t._debugNeedsRemount,e._debugHookTypes=t._debugHookTypes,e}function VT(e,t,n,a,r){this.tag=t,this.containerInfo=e,this.pendingChildren=null,this.current=null,this.pingCache=null,this.finishedWork=null,this.timeoutHandle=ka,this.context=null,this.pendingContext=null,this.callbackNode=null,this.callbackPriority=tn,this.eventTimes=bc(L),this.expirationTimes=bc(ht),this.pendingLanes=L,this.suspendedLanes=L,this.pingedLanes=L,this.expiredLanes=L,this.mutableReadLanes=L,this.finishedLanes=L,this.entangledLanes=L,this.entanglements=bc(L),this.identifierPrefix=a,this.onRecoverableError=r,_t&&(this.mutableSourceEagerHydrationData=null),this.effectDuration=0,this.passiveEffectDuration=0;{this.memoizedUpdaters=new Set;for(var i=this.pendingUpdatersLaneMap=[],u=0;u<Js;u++)i.push(new Set)}switch(t){case Cv:this._debugRootType=n?"hydrateRoot()":"createRoot()";break;case tu:this._debugRootType=n?"hydrate()":"render()";break}}function Rh(e,t,n,a,r,i,u,o,s,f){var m=new VT(e,t,n,o,s),b=AT(t,i);m.current=b,b.stateNode=m;{var C={element:a,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null};b.memoizedState=C}return Vc(b),m}var wT="18.2.0";function YT(e,t,n){var a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:null;return xb(a),{$$typeof:on,key:a==null?null:""+a,children:e,containerInfo:t,implementation:n}}var Fd,Bd;Fd=!1,Bd={};function Ch(e){if(!e)return ya;var t=ye(e),n=ig(t);if(t.tag===ge){var a=t.type;if(vr(a))return Tv(t,a,n)}return n}function qT(e){var t=ye(e);if(t===void 0){if(typeof e.render=="function")throw new Error("Unable to find node on an unmounted component.");var n=Object.keys(e).join(",");throw new Error("Argument appears to not be a ReactComponent. Keys: "+n)}var a=Hr(t);return a===null?null:a.stateNode}function QT(e,t){{var n=ye(e);if(n===void 0){if(typeof e.render=="function")throw new Error("Unable to find node on an unmounted component.");var a=Object.keys(e).join(",");throw new Error("Argument appears to not be a ReactComponent. Keys: "+a)}var r=Hr(n);if(r===null)return null;if(r.mode&wt){var i=Z(n)||"Component";if(!Bd[i]){Bd[i]=!0;var u=Ea;try{Lt(r),n.mode&wt?h("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node",t,t,i):h("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node",t,t,i)}finally{u?Lt(u):Qn()}}}return r.stateNode}}function GT(e,t,n,a,r,i,u,o){var s=!1,f=null;return Rh(e,t,s,f,n,a,r,i,u)}function PT(e,t,n,a,r,i,u,o,s,f){var m=!0,b=Rh(n,a,m,e,r,i,u,o,s);b.context=Ch(null);var C=b.current,M=An(),H=hi(C),z=Gr(M,H);return z.callback=t!=null?t:null,si(C,z,H),GE(b,H,M),b}function xh(e,t,n,a){zg(t,e);var r=t.current,i=An(),u=hi(r);Ig(u);var o=Ch(n);t.context===null?t.context=o:t.pendingContext=o,Xu&&Ea!==null&&!Fd&&(Fd=!0,h(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`,Z(Ea)||"Unknown"));var s=Gr(i,u);s.payload={element:e},a=a===void 0?null:a,a!==null&&(typeof a!="function"&&h("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.",a),s.callback=a);var f=si(r,s,u);return f!==null&&(Qt(f,r,u,i),bo(f,r,u)),u}function KT(e){var t=e.current;if(!t.child)return null;switch(t.child.tag){case te:return Lr(t.child.stateNode);default:return t.child.stateNode}}function WT(e){switch(e.tag){case oe:{var t=e.stateNode;if(kv(t)){var n=vg(t);kE(t,n)}break}case Fe:{hs(function(){var r=Gn(e,me);if(r!==null){var i=An();Qt(r,e,me,i)}});var a=me;Ts(e,a);break}}}function Dh(e,t){var n=e.memoizedState;n!==null&&n.dehydrated!==null&&(n.retryLane=bg(n.retryLane,t))}function Ts(e,t){Dh(e,t);var n=e.alternate;n&&Dh(n,t)}function kT(e){if(e.tag===Fe){var t=me,n=Gn(e,t);if(n!==null){var a=An();Qt(n,e,t,a)}Ts(e,t)}}function XT(e){if(e.tag===Fe){var t=wu,n=Gn(e,t);if(n!==null){var a=An();Qt(n,e,t,a)}Ts(e,t)}}function JT(e){if(e.tag===Fe){var t=hi(e),n=Gn(e,t);if(n!==null){var a=An();Qt(n,e,t,a)}Ts(e,t)}}function ZT(e){var t=Ri(e);return t===null?null:t.stateNode}var _h=function(e){return null};function Oh(e){return _h(e)}var Nh=function(e){return!1};function Uh(e){return Nh(e)}var Mh=null,zh=null,Ah=null,Hh=null,Lh=null,jh=null,Fh=null,Bh=null,Vh=null;{var wh=function(e,t,n){var a=t[n],r=Pt(e)?e.slice():K({},e);return n+1===t.length?(Pt(r)?r.splice(a,1):delete r[a],r):(r[a]=wh(e[a],t,n+1),r)},Yh=function(e,t){return wh(e,t,0)},qh=function(e,t,n,a){var r=t[a],i=Pt(e)?e.slice():K({},e);if(a+1===t.length){var u=n[a];i[u]=i[r],Pt(i)?i.splice(r,1):delete i[r]}else i[r]=qh(e[r],t,n,a+1);return i},Qh=function(e,t,n){if(t.length!==n.length){j("copyWithRename() expects paths of the same length");return}else for(var a=0;a<n.length-1;a++)if(t[a]!==n[a]){j("copyWithRename() expects paths to be the same except for the deepest key");return}return qh(e,t,n,0)},Gh=function(e,t,n,a){if(n>=t.length)return a;var r=t[n],i=Pt(e)?e.slice():K({},e);return i[r]=Gh(e[r],t,n+1,a),i},Ph=function(e,t,n){return Gh(e,t,0,n)},Vd=function(e,t){for(var n=e.memoizedState;n!==null&&t>0;)n=n.next,t--;return n};Mh=function(e,t,n,a){var r=Vd(e,t);if(r!==null){var i=Ph(r.memoizedState,n,a);r.memoizedState=i,r.baseState=i,e.memoizedProps=K({},e.memoizedProps);var u=Gn(e,me);u!==null&&Qt(u,e,me,ht)}},zh=function(e,t,n){var a=Vd(e,t);if(a!==null){var r=Yh(a.memoizedState,n);a.memoizedState=r,a.baseState=r,e.memoizedProps=K({},e.memoizedProps);var i=Gn(e,me);i!==null&&Qt(i,e,me,ht)}},Ah=function(e,t,n,a){var r=Vd(e,t);if(r!==null){var i=Qh(r.memoizedState,n,a);r.memoizedState=i,r.baseState=i,e.memoizedProps=K({},e.memoizedProps);var u=Gn(e,me);u!==null&&Qt(u,e,me,ht)}},Hh=function(e,t,n){e.pendingProps=Ph(e.memoizedProps,t,n),e.alternate&&(e.alternate.pendingProps=e.pendingProps);var a=Gn(e,me);a!==null&&Qt(a,e,me,ht)},Lh=function(e,t){e.pendingProps=Yh(e.memoizedProps,t),e.alternate&&(e.alternate.pendingProps=e.pendingProps);var n=Gn(e,me);n!==null&&Qt(n,e,me,ht)},jh=function(e,t,n){e.pendingProps=Qh(e.memoizedProps,t,n),e.alternate&&(e.alternate.pendingProps=e.pendingProps);var a=Gn(e,me);a!==null&&Qt(a,e,me,ht)},Fh=function(e){var t=Gn(e,me);t!==null&&Qt(t,e,me,ht)},Bh=function(e){_h=e},Vh=function(e){Nh=e}}function IT(e){var t=Hr(e);return t===null?null:t.stateNode}function $T(e){return null}function eR(){return Ea}function tR(e){var t=e.findFiberByHostInstance,n=A.ReactCurrentDispatcher;return Mg({bundleType:e.bundleType,version:e.version,rendererPackageName:e.rendererPackageName,rendererConfig:e.rendererConfig,overrideHookState:Mh,overrideHookStateDeletePath:zh,overrideHookStateRenamePath:Ah,overrideProps:Hh,overridePropsDeletePath:Lh,overridePropsRenamePath:jh,setErrorHandler:Bh,setSuspenseHandler:Vh,scheduleUpdate:Fh,currentDispatcherRef:n,findHostInstanceByFiber:IT,findFiberByHostInstance:t||$T,findHostInstancesForRefresh:DT,scheduleRefresh:CT,scheduleRoot:xT,setRefreshHandler:RT,getCurrentFiber:eR,reconcilerVersion:wT})}return y.attemptContinuousHydration=XT,y.attemptDiscreteHydration=kT,y.attemptHydrationAtCurrentPriority=JT,y.attemptSynchronousHydration=WT,y.batchedUpdates=JE,y.createComponentSelector=DE,y.createContainer=GT,y.createHasPseudoClassSelector=_E,y.createHydrationContainer=PT,y.createPortal=YT,y.createRoleSelector=OE,y.createTestNameSelector=UE,y.createTextSelector=NE,y.deferredUpdates=XE,y.discreteUpdates=ZE,y.findAllNodes=us,y.findBoundingRects=AE,y.findHostInstance=qT,y.findHostInstanceWithNoPortals=ZT,y.findHostInstanceWithWarning=QT,y.flushControlled=$E,y.flushPassiveEffects=Nr,y.flushSync=hs,y.focusWithin=HE,y.getCurrentUpdatePriority=Za,y.getFindAllNodesFailureDescription=zE,y.getPublicRootInstance=KT,y.injectIntoDevTools=tR,y.isAlreadyRendering=IE,y.observeVisibleRects=jE,y.registerMutableSourceForHydration=Gb,y.runWithPriority=Rg,y.shouldError=Oh,y.shouldSuspend=Uh,y.updateContainer=xh,y}});var dy=bi((xC,fy)=>{"use strict";fy.exports=cy()});var gy=bi(Ms=>{"use strict";(function(){"use strict";var p=zr(),c=Symbol.for("react.element"),y=Symbol.for("react.portal"),R=Symbol.for("react.fragment"),g=Symbol.for("react.strict_mode"),A=Symbol.for("react.profiler"),_=Symbol.for("react.provider"),V=Symbol.for("react.context"),j=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),Y=Symbol.for("react.suspense_list"),K=Symbol.for("react.memo"),ye=Symbol.for("react.lazy"),nt=Symbol.for("react.offscreen"),Pe=Symbol.iterator,qe="@@iterator";function Ke(d){if(d===null||typeof d!="object")return null;var U=Pe&&d[Pe]||d[qe];return typeof U=="function"?U:null}var Re=p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;function _e(d){{for(var U=arguments.length,Q=new Array(U>1?U-1:0),ae=1;ae<U;ae++)Q[ae-1]=arguments[ae];ot("error",d,Q)}}function ot(d,U,Q){{var ae=Re.ReactDebugCurrentFrame,Le=ae.getStackAddendum();Le!==""&&(U+="%s",Q=Q.concat([Le]));var Oe=Q.map(function(Ce){return String(Ce)});Oe.unshift("Warning: "+U),Function.prototype.apply.call(console[d],console,Oe)}}var gt=!1,Cn=!1,Ue=!1,ge=!1,It=!1,oe;oe=Symbol.for("react.module.reference");function Me(d){return!!(typeof d=="string"||typeof d=="function"||d===R||d===A||It||d===g||d===h||d===Y||ge||d===nt||gt||Cn||Ue||typeof d=="object"&&d!==null&&(d.$$typeof===ye||d.$$typeof===K||d.$$typeof===_||d.$$typeof===V||d.$$typeof===j||d.$$typeof===oe||d.getModuleId!==void 0))}function te(d,U,Q){var ae=d.displayName;if(ae)return ae;var Le=U.displayName||U.name||"";return Le!==""?Q+"("+Le+")":Q}function be(d){return d.displayName||"Context"}function xe(d){if(d==null)return null;if(typeof d.tag=="number"&&_e("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof d=="function")return d.displayName||d.name||null;if(typeof d=="string")return d;switch(d){case R:return"Fragment";case y:return"Portal";case A:return"Profiler";case g:return"StrictMode";case h:return"Suspense";case Y:return"SuspenseList"}if(typeof d=="object")switch(d.$$typeof){case V:var U=d;return be(U)+".Consumer";case _:var Q=d;return be(Q._context)+".Provider";case j:return te(d,d.render,"ForwardRef");case K:var ae=d.displayName||null;return ae!==null?ae:xe(d.type)||"Memo";case ye:{var Le=d,Oe=Le._payload,Ce=Le._init;try{return xe(Ce(Oe))}catch(Te){return null}}}return null}var st=Object.assign,ue=0,Et,ze,Tt,Fe,lt,Ae,Rt;function jt(){}jt.__reactDisabledLog=!0;function jn(){{if(ue===0){Et=console.log,ze=console.info,Tt=console.warn,Fe=console.error,lt=console.group,Ae=console.groupCollapsed,Rt=console.groupEnd;var d={configurable:!0,enumerable:!0,value:jt,writable:!0};Object.defineProperties(console,{info:d,log:d,warn:d,error:d,group:d,groupCollapsed:d,groupEnd:d})}ue++}}function bt(){{if(ue--,ue===0){var d={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:st({},d,{value:Et}),info:st({},d,{value:ze}),warn:st({},d,{value:Tt}),error:st({},d,{value:Fe}),group:st({},d,{value:lt}),groupCollapsed:st({},d,{value:Ae}),groupEnd:st({},d,{value:Rt})})}ue<0&&_e("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var $t=Re.ReactCurrentDispatcher,at;function Ft(d,U,Q){{if(at===void 0)try{throw Error()}catch(Le){var ae=Le.stack.trim().match(/\n( *(at )?)/);at=ae&&ae[1]||""}return`
`+at+d}}var Xn=!1,Fn;{var ln=typeof WeakMap=="function"?WeakMap:Map;Fn=new ln}function on(d,U){if(!d||Xn)return"";{var Q=Fn.get(d);if(Q!==void 0)return Q}var ae;Xn=!0;var Le=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var Oe;Oe=$t.current,$t.current=null,jn();try{if(U){var Ce=function(){throw Error()};if(Object.defineProperty(Ce.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Ce,[])}catch(Nn){ae=Nn}Reflect.construct(d,[],Ce)}else{try{Ce.call()}catch(Nn){ae=Nn}d.call(Ce.prototype)}}else{try{throw Error()}catch(Nn){ae=Nn}d()}}catch(Nn){if(Nn&&ae&&typeof Nn.stack=="string"){for(var Te=Nn.stack.split(`
`),pt=ae.stack.split(`
`),ke=Te.length-1,Xe=pt.length-1;ke>=1&&Xe>=0&&Te[ke]!==pt[Xe];)Xe--;for(;ke>=1&&Xe>=0;ke--,Xe--)if(Te[ke]!==pt[Xe]){if(ke!==1||Xe!==1)do if(ke--,Xe--,Xe<0||Te[ke]!==pt[Xe]){var ct=`
`+Te[ke].replace(" at new "," at ");return d.displayName&&ct.includes("<anonymous>")&&(ct=ct.replace("<anonymous>",d.displayName)),typeof d=="function"&&Fn.set(d,ct),ct}while(ke>=1&&Xe>=0);break}}}finally{Xn=!1,$t.current=Oe,bt(),Error.prepareStackTrace=Le}var sa=d?d.displayName||d.name:"",_a=sa?Ft(sa):"";return typeof d=="function"&&Fn.set(d,_a),_a}function Bn(d,U,Q){return on(d,!1)}function xn(d){var U=d.prototype;return!!(U&&U.isReactComponent)}function Ut(d,U,Q){if(d==null)return"";if(typeof d=="function")return on(d,xn(d));if(typeof d=="string")return Ft(d);switch(d){case h:return Ft("Suspense");case Y:return Ft("SuspenseList")}if(typeof d=="object")switch(d.$$typeof){case j:return Bn(d.render);case K:return Ut(d.type,U,Q);case ye:{var ae=d,Le=ae._payload,Oe=ae._init;try{return Ut(Oe(Le),U,Q)}catch(Ce){}}}return""}var sn=Object.prototype.hasOwnProperty,Dn={},St=Re.ReactDebugCurrentFrame;function Mt(d){if(d){var U=d._owner,Q=Ut(d.type,d._source,U?U.type:null);St.setExtraStackFrame(Q)}else St.setExtraStackFrame(null)}function Jn(d,U,Q,ae,Le){{var Oe=Function.call.bind(sn);for(var Ce in d)if(Oe(d,Ce)){var Te=void 0;try{if(typeof d[Ce]!="function"){var pt=Error((ae||"React class")+": "+Q+" type `"+Ce+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof d[Ce]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw pt.name="Invariant Violation",pt}Te=d[Ce](U,Ce,ae,Q,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(ke){Te=ke}Te&&!(Te instanceof Error)&&(Mt(Le),_e("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",ae||"React class",Q,Ce,typeof Te),Mt(null)),Te instanceof Error&&!(Te.message in Dn)&&(Dn[Te.message]=!0,Mt(Le),_e("Failed %s type: %s",Q,Te.message),Mt(null))}}}var Vn=Array.isArray;function rt(d){return Vn(d)}function _n(d){{var U=typeof Symbol=="function"&&Symbol.toStringTag,Q=U&&d[Symbol.toStringTag]||d.constructor.name||"Object";return Q}}function xa(d){try{return ua(d),!1}catch(U){return!0}}function ua(d){return""+d}function la(d){if(xa(d))return _e("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",_n(d)),ua(d)}var On=Re.ReactCurrentOwner,Qa={key:!0,ref:!0,__self:!0,__source:!0},Zn,Ga,q;q={};function re(d){if(sn.call(d,"ref")){var U=Object.getOwnPropertyDescriptor(d,"ref").get;if(U&&U.isReactWarning)return!1}return d.ref!==void 0}function pe(d){if(sn.call(d,"key")){var U=Object.getOwnPropertyDescriptor(d,"key").get;if(U&&U.isReactWarning)return!1}return d.key!==void 0}function ne(d,U){if(typeof d.ref=="string"&&On.current&&U&&On.current.stateNode!==U){var Q=xe(On.current.type);q[Q]||(_e('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',xe(On.current.type),d.ref),q[Q]=!0)}}function it(d,U){{var Q=function(){Zn||(Zn=!0,_e("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",U))};Q.isReactWarning=!0,Object.defineProperty(d,"key",{get:Q,configurable:!0})}}function zt(d,U){{var Q=function(){Ga||(Ga=!0,_e("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",U))};Q.isReactWarning=!0,Object.defineProperty(d,"ref",{get:Q,configurable:!0})}}var Z=function(d,U,Q,ae,Le,Oe,Ce){var Te={$$typeof:c,type:d,key:U,ref:Q,props:Ce,_owner:Oe};return Te._store={},Object.defineProperty(Te._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(Te,"_self",{configurable:!1,enumerable:!1,writable:!1,value:ae}),Object.defineProperty(Te,"_source",{configurable:!1,enumerable:!1,writable:!1,value:Le}),Object.freeze&&(Object.freeze(Te.props),Object.freeze(Te)),Te};function X(d,U,Q,ae,Le){{var Oe,Ce={},Te=null,pt=null;Q!==void 0&&(la(Q),Te=""+Q),pe(U)&&(la(U.key),Te=""+U.key),re(U)&&(pt=U.ref,ne(U,Le));for(Oe in U)sn.call(U,Oe)&&!Qa.hasOwnProperty(Oe)&&(Ce[Oe]=U[Oe]);if(d&&d.defaultProps){var ke=d.defaultProps;for(Oe in ke)Ce[Oe]===void 0&&(Ce[Oe]=ke[Oe])}if(Te||pt){var Xe=typeof d=="function"?d.displayName||d.name||"Unknown":d;Te&&it(Ce,Xe),pt&&zt(Ce,Xe)}return Z(d,Te,pt,Le,ae,On.current,Ce)}}var Ie=Re.ReactCurrentOwner,Qe=Re.ReactDebugCurrentFrame;function se(d){if(d){var U=d._owner,Q=Ut(d.type,d._source,U?U.type:null);Qe.setExtraStackFrame(Q)}else Qe.setExtraStackFrame(null)}var Bt;Bt=!1;function In(d){return typeof d=="object"&&d!==null&&d.$$typeof===c}function Pa(){{if(Ie.current){var d=xe(Ie.current.type);if(d)return`

Check the render method of \``+d+"`."}return""}}function He(d){{if(d!==void 0){var U=d.fileName.replace(/^.*[\\\/]/,""),Q=d.lineNumber;return`

Check your code at `+U+":"+Q+"."}return""}}var cn={};function wn(d){{var U=Pa();if(!U){var Q=typeof d=="string"?d:d.displayName||d.name;Q&&(U=`

Check the top-level render call using <`+Q+">.")}return U}}function Gt(d,U){{if(!d._store||d._store.validated||d.key!=null)return;d._store.validated=!0;var Q=wn(U);if(cn[Q])return;cn[Q]=!0;var ae="";d&&d._owner&&d._owner!==Ie.current&&(ae=" It was passed a child from "+xe(d._owner.type)+"."),se(d),_e('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',Q,ae),se(null)}}function At(d,U){{if(typeof d!="object")return;if(rt(d))for(var Q=0;Q<d.length;Q++){var ae=d[Q];In(ae)&&Gt(ae,U)}else if(In(d))d._store&&(d._store.validated=!0);else if(d){var Le=Ke(d);if(typeof Le=="function"&&Le!==d.entries)for(var Oe=Le.call(d),Ce;!(Ce=Oe.next()).done;)In(Ce.value)&&Gt(Ce.value,U)}}}function fn(d){{var U=d.type;if(U==null||typeof U=="string")return;var Q;if(typeof U=="function")Q=U.propTypes;else if(typeof U=="object"&&(U.$$typeof===j||U.$$typeof===K))Q=U.propTypes;else return;if(Q){var ae=xe(U);Jn(Q,d.props,"prop",ae,d)}else if(U.PropTypes!==void 0&&!Bt){Bt=!0;var Le=xe(U);_e("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",Le||"Unknown")}typeof U.getDefaultProps=="function"&&!U.getDefaultProps.isReactClassApproved&&_e("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.")}}function $n(d){{for(var U=Object.keys(d.props),Q=0;Q<U.length;Q++){var ae=U[Q];if(ae!=="children"&&ae!=="key"){se(d),_e("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",ae),se(null);break}}d.ref!==null&&(se(d),_e("Invalid attribute `ref` supplied to `React.Fragment`."),se(null))}}function Da(d,U,Q,ae,Le,Oe){{var Ce=Me(d);if(!Ce){var Te="";(d===void 0||typeof d=="object"&&d!==null&&Object.keys(d).length===0)&&(Te+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var pt=He(Le);pt?Te+=pt:Te+=Pa();var ke;d===null?ke="null":rt(d)?ke="array":d!==void 0&&d.$$typeof===c?(ke="<"+(xe(d.type)||"Unknown")+" />",Te=" Did you accidentally export a JSX literal instead of a component?"):ke=typeof d,_e("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",ke,Te)}var Xe=X(d,U,Q,Le,Oe);if(Xe==null)return Xe;if(Ce){var ct=U.children;if(ct!==void 0)if(ae)if(rt(ct)){for(var sa=0;sa<ct.length;sa++)At(ct[sa],d);Object.freeze&&Object.freeze(ct)}else _e("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");else At(ct,d)}return d===R?$n(Xe):fn(Xe),Xe}}function Xr(d,U,Q){return Da(d,U,Q,!0)}function Jr(d,U,Q){return Da(d,U,Q,!1)}var oa=Jr,Ct=Xr;Ms.Fragment=R,Ms.jsx=oa,Ms.jsxs=Ct})()});var Hu=bi((UC,by)=>{"use strict";by.exports=gy()});function Mu(p){if(p==null||typeof p!="object")return!1;let c=Object.getPrototypeOf(p);return c==null||c===Object.prototype}function sr(p){return p!=null&&p.kind===3}var Ll="__current",qd={},vR=[];function Kd(p,{strict:c=!0,components:y}={}){let R=0,g={strict:c,mounted:!1,channel:p,children:vR,nodes:new WeakSet,parents:new WeakMap,tops:new WeakMap,components:new WeakMap,fragments:new WeakMap};c&&Object.freeze(y);let A={kind:0,options:c?Object.freeze({strict:c,components:y}):{strict:c,components:y},get children(){return g.children},createComponent(_,...V){if(y&&y.indexOf(_)<0)throw new Error(`Unsupported component: ${_}`);let[j,h,...Y]=V,K=j!=null?j:{},ye=[],nt={};if(j)for(let Re of Object.keys(j))Re!=="children"&&(nt[Re]=Ei(ty(j[Re])));if(h)if(Array.isArray(h))for(let Re of h)ye.push(un(Re,A));else{ye.push(un(h,A));for(let Re of Y)ye.push(un(Re,A))}let Pe=`${R++}`,qe={externalProps:c?Object.freeze(K):K,internalProps:nt,children:c?Object.freeze(ye):ye},Ke=Mr({kind:1,get children(){return qe.children},get props(){return qe.externalProps},get remoteProps(){return qe.internalProps},remove:()=>Jh(Ke),updateProps:Re=>hR(Ke,Re,qe,g),append:(...Re)=>xs(Ke,Re.map(_e=>un(_e,A)),qe,g),appendChild:Re=>Ds(Ke,un(Re,A),qe,g),removeChild:Re=>_s(Ke,Re,qe,g),replaceChildren:(...Re)=>Qd(Ke,Re.map(_e=>un(_e,A)),qe,g),insertBefore:(Re,_e)=>zu(Ke,un(Re,A),_e,qe,g),insertChildBefore:(Re,_e)=>zu(Ke,un(Re,A),_e,qe,g)},qd);g.components.set(Ke,qe),Object.defineProperty(Ke,"type",{value:_,configurable:!1,writable:!1,enumerable:!0}),Gd(Ke,g),Pd(Ke,Pe,A);for(let Re of qe.children)Fl(Ke,Re,g);return Ke},createText(_=""){let V=`${R++}`,j={text:_},h=K=>mR(Y,K,j,g),Y=Mr({kind:2,get text(){return j.text},update:h,updateText:h,remove:()=>Jh(Y)},qd);return Gd(Y,g),Pd(Y,V,A),Y},createFragment(){let _=`${R++}`,V={children:c?Object.freeze([]):[]},j=Mr({kind:3,get children(){return V.children},append:(...h)=>xs(j,h.map(Y=>un(Y,A)),V,g),appendChild:h=>Ds(j,un(h,A),V,g),removeChild:h=>_s(j,h,V,g),replaceChildren:(...h)=>Qd(j,h.map(Y=>un(Y,A)),V,g),insertBefore:(h,Y)=>zu(j,un(h,A),Y,V,g),insertChildBefore:(h,Y)=>zu(j,un(h,A),Y,V,g)},qd);return g.fragments.set(j,V),Gd(j,g),Pd(j,_,A),j},append:(..._)=>xs(A,_.map(V=>un(V,A)),g,g),appendChild:_=>Ds(A,un(_,A),g,g),replaceChildren:(..._)=>Qd(A,_.map(V=>un(V,A)),g,g),removeChild:_=>_s(A,_,g,g),insertBefore:(_,V)=>zu(A,un(_,A),V,g,g),insertChildBefore:(_,V)=>zu(A,un(_,A),V,g,g),mount(){return g.mounted?Promise.resolve():(g.mounted=!0,Promise.resolve(p(0,g.children.map(Bl))))}};return A}function pR(p,{tops:c}){var y;return((y=c.get(p))===null||y===void 0?void 0:y.kind)===0}function ey(p,c){let y=R=>{if("children"in R)for(let g of R.children)c(g),y(g)};y(p)}function jl(p,c,{remote:y,local:R}){let{mounted:g,channel:A}=c;g&&(p.kind===0||pR(p,c))&&y(A),R()}function mR(p,c,y,R){return jl(p,R,{remote:g=>g(3,p.id,c),local:()=>{y.text=c}})}var Si=Symbol("ignore");function hR(p,c,y,R){let{strict:g}=R,{internalProps:A,externalProps:_}=y,V={},j=[],h=!1;for(let Y of Object.keys(c)){if(Y==="children")continue;let K=_[Y],ye=c[Y],nt=A[Y],Pe=ty(ye);if(nt===Pe&&(Pe==null||typeof Pe!="object"))continue;let[qe,Ke]=Wd(nt,Pe);Ke&&j.push(...Ke),qe!==Si&&(h=!0,V[Y]=qe,sr(K)&&kd(K,R),sr(ye)&&Fl(p,ye,R))}return jl(p,R,{remote:Y=>{h&&Y(4,p.id,V)},local:()=>{let Y=Mr(Mr({},_),c);y.externalProps=g?Object.freeze(Y):Y,y.internalProps=Mr(Mr({},y.internalProps),V);for(let[K,ye]of j)K[Ll]=ye}})}function Wd(p,c,y=new Set){return y.has(p)?[Si]:(y.add(p),typeof p=="function"&&Ll in p?[typeof c=="function"?Si:Ei(c),[[p,c]]]:Array.isArray(p)?bR(p,c,y):Mu(p)&&!sr(p)?gR(p,c,y):[p===c?Si:c])}function Ei(p,c=new Map){let y=c.get(p);if(y)return y;if(sr(p))return c.set(p,p),p;if(Array.isArray(p)){let R=[];c.set(p,R);for(let g of p)R.push(Ei(g,c));return R}if(Mu(p)){let R={};c.set(p,R);for(let g of Object.keys(p))R[g]=Ei(p[g],c);return R}if(typeof p=="function"){let R=(...g)=>R[Ll](...g);return Object.defineProperty(R,Ll,{enumerable:!1,configurable:!1,writable:!0,value:p}),c.set(p,R),R}return c.set(p,p),p}function Au(p,c=new Set){if(!c.has(p)){if(c.add(p),Array.isArray(p))return p.reduce((y,R)=>{let g=Au(R,c);return g?[...y,...g]:y},[]);if(Mu(p))return Object.keys(p).reduce((y,R)=>{let g=Au(p[R],c);return g?[...y,...g]:y},[]);if(typeof p=="function")return Ll in p?[p]:void 0}}function Jh(p){var c;(c=p.parent)===null||c===void 0||c.removeChild(p)}function xs(p,c,y,R){for(let g of c)Ds(p,g,y,R)}function Ds(p,c,y,R){var g;let{nodes:A,strict:_}=R;if(!A.has(c))throw new Error("Cannot append a node that was not created by this remote root");let V=c.parent,j=(g=V==null?void 0:V.children.indexOf(c))!==null&&g!==void 0?g:-1;return jl(p,R,{remote:h=>{h(1,p.id,j<0?p.children.length:p.children.length-1,Bl(c),V?V.id:!1)},local:()=>{Fl(p,c,R);let h;if(V){let Y=ny(V,R),K=[...Y.children];K.splice(j,1),V===p?h=K:(Y.children=_?Object.freeze(K):K,h=[...y.children])}else h=[...y.children];h.push(c),y.children=_?Object.freeze(h):h}})}function Qd(p,c,y,R){for(let g of p.children)_s(p,g,y,R);xs(p,c,y,R)}function _s(p,c,y,R){let{strict:g}=R;return jl(p,R,{remote:A=>A(2,p.id,p.children.indexOf(c)),local:()=>{kd(c,R);let A=[...y.children];A.splice(A.indexOf(c),1),y.children=g?Object.freeze(A):A}})}function zu(p,c,y,R,g){var A;let{strict:_,nodes:V}=g;if(!V.has(c))throw new Error("Cannot insert a node that was not created by this remote root");let j=c.parent,h=(A=j==null?void 0:j.children.indexOf(c))!==null&&A!==void 0?A:-1;return jl(p,g,{remote:Y=>{let K=y==null?p.children.length-1:p.children.indexOf(y);Y(1,p.id,K<h||h<0?K:K-1,Bl(c),j?j.id:!1)},local:()=>{Fl(p,c,g);let Y;if(j){let K=ny(j,g),ye=[...K.children];ye.splice(h,1),j===p?Y=ye:(K.children=_?Object.freeze(ye):ye,Y=[...R.children])}else Y=[...R.children];y==null?Y.push(c):Y.splice(Y.indexOf(y),0,c),R.children=_?Object.freeze(Y):Y}})}function un(p,c){return typeof p=="string"?c.createText(p):p}function Fl(p,c,y){let{tops:R,parents:g}=y,A=p.kind===0?p:R.get(p);R.set(c,A),g.set(c,p),Zh(c,y),ey(c,_=>{R.set(_,A),Zh(_,y)})}function Zh(p,c){if(p.kind!==1)return;let y=p.props;y&&Object.values(y).forEach(R=>{sr(R)&&Fl(p,R,c)})}function kd(p,c){let{tops:y,parents:R}=c;y.delete(p),R.delete(p),ey(p,g=>{y.delete(g),Ih(g,c)}),Ih(p,c)}function Ih(p,c){if(p.kind!==1)return;let y=p.remoteProps;for(let R of Object.keys(y!=null?y:{})){let g=y[R];sr(g)&&kd(g,c)}}function Gd(p,{parents:c,tops:y,nodes:R}){R.add(p),Object.defineProperty(p,"parent",{get(){return c.get(p)},configurable:!0,enumerable:!0}),Object.defineProperty(p,"top",{get(){return y.get(p)},configurable:!0,enumerable:!0})}function Bl(p){return p.kind===2?{id:p.id,kind:p.kind,text:p.text}:{id:p.id,kind:p.kind,type:p.type,props:p.remoteProps,children:p.children.map(c=>Bl(c))}}function ty(p){return sr(p)?yR(p):p}function yR(p){return{id:p.id,kind:p.kind,get children(){return p.children.map(c=>Bl(c))}}}function ny(p,c){return p.kind===0?c:p.kind===3?c.fragments.get(p):c.components.get(p)}function Pd(p,c,y){Object.defineProperty(p,"id",{value:c,configurable:!0,writable:!1,enumerable:!1}),Object.defineProperty(p,"root",{value:y,configurable:!0,writable:!1,enumerable:!1})}function gR(p,c,y){if(!Mu(c)){var R;return[Ei(c),(R=Au(p))===null||R===void 0?void 0:R.map(V=>[V,void 0])]}let g=!1,A=[],_={};for(let V in p){let j=p[V];if(!(V in c)){g=!0;let ye=Au(j);ye&&A.push(...ye.map(nt=>[nt,void 0]))}let h=c[V],[Y,K]=Wd(j,h,y);K&&A.push(...K),Y!==Si&&(g=!0,_[V]=Y)}for(let V in c)V in _||(g=!0,_[V]=Ei(c[V]));return[g?_:Si,A]}function bR(p,c,y){if(!Array.isArray(c)){var R;return[Ei(c),(R=Au(p))===null||R===void 0?void 0:R.map(Y=>[Y,void 0])]}let g=!1,A=[],_=c.length,V=p.length,j=Math.max(V,_),h=[];for(let Y=0;Y<j;Y++){let K=p[Y],ye=c[Y];if(Y<_){if(Y>=V){g=!0,h[Y]=Ei(ye);continue}let[nt,Pe]=Wd(K,ye,y);if(Pe&&A.push(...Pe),nt===Si){h[Y]=K;continue}g=!0,h[Y]=nt}else{g=!0;let nt=Au(K);nt&&A.push(...nt.map(Pe=>[Pe,void 0]))}}return[g?h:Si,A]}function ay(){return(c,y)=>{var R;function g(...A){return Uu(this,null,function*(){if(A.length===1)return y(...A);let[{channel:_,components:V},j]=A,h=Kd(_,{components:V,strict:!0}),Y=y(h,j);return typeof Y=="object"&&Y!=null&&"then"in Y&&(Y=yield Y),h.mount(),Y})}return(R=globalThis.shopify)===null||R===void 0||R.extend(c,g),g}}var Xd=ay();var Jd="AdminBlock";var Zd="BlockStack";var Id="Box";var $d="Divider";var ev="Heading";var tv="InlineStack";var nv="Link";var av="Text";var Ty=Ca(zr(),1);var my=Ca(dy(),1);var hy=p=>{var c;return(0,my.default)({now:Date.now,scheduleTimeout:setTimeout,cancelTimeout:clearTimeout,noTimeout:!1,supportsMicrotasks:!0,scheduleMicrotask:vy,queueMicrotask:vy,isPrimaryRenderer:(c=p==null?void 0:p.primary)!==null&&c!==void 0?c:!0,supportsMutation:!0,supportsHydration:!1,supportsPersistence:!1,getRootHostContext(){return{}},getChildHostContext(y){return y},createTextInstance(y,R){return R.createText(y)},createInstance(y,R,g){let V=R,{children:A}=V,_=Cs(V,["children"]);return g.createComponent(y,_)},commitTextUpdate(y,R,g){y.update(g)},prepareUpdate(y,R,g,A){let _={},V=!1;for(let j in g)!py(g,j)||j==="children"||(j in A?g[j]!==A[j]&&(V=!0,_[j]=A[j]):(V=!0,_[j]=void 0));for(let j in A)!py(A,j)||j==="children"||j in g||(V=!0,_[j]=A[j]);return V?_:null},commitUpdate(y,R){y.updateProps(R)},appendChildToContainer(y,R){y.append(R)},insertInContainerBefore(y,R,g){y.insertBefore(R,g)},removeChildFromContainer(y,R){y.removeChild(R)},clearContainer(y){for(let R of y.children)y.removeChild(R)},appendInitialChild(y,R){y.append(R)},appendChild(y,R){y.append(R)},insertBefore(y,R,g){y.insertBefore(R,g)},removeChild(y,R){y.removeChild(R)},finalizeInitialChildren(){return!1},shouldSetTextContent(){return!1},getPublicInstance(){},prepareForCommit(){return null},resetAfterCommit(){},commitMount(){},preparePortalMount(){},detachDeletedInstance(){}})};function vy(p){return typeof queueMicrotask=="function"?queueMicrotask:Promise.resolve(null).then(p).catch(SR)}function SR(p){setTimeout(()=>{throw p})}var{hasOwnProperty:ER}={};function py(p,c){return ER.call(p,c)}var yy=Ca(zr(),1),Us=(0,yy.createContext)(null);var Ry=Ca(Hu(),1),Sy=new WeakMap,Ey=0,TR=hy();function rv(p,c,y,R=TR){let g=Sy.get(c);if(!g){var A;let h={container:Number(((A=Ty.version.split("."))===null||A===void 0?void 0:A[0])||18)>=18?R.createContainer(c,Ey,null,!1,null,"r-ui",()=>null,null):R.createContainer(c,Ey,!1,null),renderContext:{root:c,reconciler:R}};Sy.set(c,h),g=h}let{container:_,renderContext:V}=g;R.updateContainer(p&&(0,Ry.jsx)(Us.Provider,{value:V,children:p}),_,null,y)}var Ar=Ca(zr(),1);var Dy=Ca(Hu(),1);var Cy=Ca(zr(),1);function xy(){let p=(0,Cy.useContext)(Us);if(p==null)throw new Error("No remote-ui Render instance found in context");return p}function Rn(p,{fragmentProps:c}={}){if(!c||!c.length)return p;let y=RR(p,c);return y.displayName=p,y}function RR(p,c){let y=p;return(0,Ar.memo)(function(_){var V=_,{children:g=[]}=V,A=Cs(V,["children"]);let j=(0,Ar.useRef)({}),{root:h,reconciler:Y}=xy(),{props:K,children:ye}=(0,Ar.useMemo)(()=>{let nt=[],Pe={};for(let qe of Object.keys(A)){let Ke=A[qe];if(c.includes(qe)&&(0,Ar.isValidElement)(Ke)){let Re=j.current[qe],_e=sr(Re)?Re:h.createFragment();j.current[qe]=_e,Object.assign(_e,{createText(...gt){return h.createText(...gt)},createComponent(gt,...Cn){return h.createComponent(gt,...Cn)}});let ot=Y.createPortal(Ke,_e,null,null);nt.push(ot),Pe[qe]=_e}else Pe[qe]=Ke,delete j.current[qe]}return{props:Pe,children:[...Ar.Children.toArray(g),...nt]}},[g,A,h,Y,j]);return(0,Dy.jsx)(y,kh(Mr({},K),{children:ye}))})}var _y=Ca(zr(),1),zs=(0,_y.createContext)(null);var Oy=Ca(Hu(),1);function As(p,c){return Xd(p,(y,R)=>Uu(this,null,function*(){let g=yield c(R);yield new Promise((A,_)=>{try{rv((0,Oy.jsx)(zs.Provider,{value:R,children:g}),y,()=>{A()})}catch(V){console.error(V),_(V)}})}))}var iv=Rn(Jd);var Hs=Rn(Zd);var Ls=Rn(Id);var uv=Rn($d);var Vl=Rn(ev);var wl=Rn(tv);var lv=Rn(nv);var fe=Rn(av);var Ny=Ca(zr(),1);var js=class extends Error{constructor(...c){super(...c),this.name="AdminUIExtensionError"}};function ov(p){let c=(0,Ny.useContext)(zs);if(c==null)throw new js("No extension api found.");return c}var Yl=Ca(zr());var B=Ca(Hu()),Uy="admin.order-details.block.render",Vx=As(Uy,()=>(0,B.jsx)(xR,{}));function CR(p){return Uu(this,null,function*(){return(yield fetch(`/api/order-recaps/${p}`)).json()})}function xR(){let[p,c]=(0,Yl.useState)(),{i18n:y,data:R}=ov(Uy),[g,A]=(0,Yl.useState)(!1);return(0,Yl.useEffect)(()=>{var _,V;console.log("start  getting data"),CR(`${(V=(_=R.selected)==null?void 0:_[0])==null?void 0:V.id}`.replace("gid://shopify/Order/","")).then(j=>{c(j),console.log("order data",j)}).catch(j=>console.log("errors getting data",j))},[]),(0,B.jsx)(iv,{title:"ALL SIGNS OPTIONS",children:(0,B.jsxs)(Hs,{gap:"small small",children:[(0,B.jsx)(wl,{blockAlignment:"end",children:(0,B.jsxs)(Vl,{size:4,children:[" ",y.translate("recapTitle"),"  "]})}),(0,B.jsx)(Hs,{children:p==null?void 0:p.map(_=>{var V,j,h,Y,K,ye,nt,Pe,qe,Ke,Re,_e,ot,gt,Cn,Ue,ge,It,oe,Me,te,be,xe,st,ue,Et,ze,Tt,Fe,lt,Ae,Rt,jt,jn,bt,$t,at,Ft,Xn,Fn,ln,on,Bn,xn,Ut,sn,Dn,St,Mt,Jn,Vn,rt,_n,xa,ua,la,On,Qa,Zn,Ga,q,re,pe,ne,it,zt,Z,X,Ie,Qe,se,Bt,In,Pa,He,cn,wn,Gt,At,fn,$n,Da,Xr,Jr,oa,Ct,d,U,Q,ae,Le,Oe,Ce,Te,pt,ke,Xe,ct,sa,_a,Nn,Wi,Ti,Ka,Hr,Zr,Ri,Ir,Ci,Pt,Lr,xi,ki,Xi,$r,ei,Wa,jr,cr,ti,ni,Di,Ji,ka,fr,_i,Ht,Fr,_t,ai,Zi,Lu;return(0,B.jsxs)(Ls,{paddingBlockEnd:"base",children:[(0,B.jsxs)(wl,{inlineAlignment:"start",blockAlignment:"center",gap:"base",children:[(0,B.jsxs)(Vl,{size:5,children:[" ",(V=_.line_item)==null?void 0:V.title,"   "]}),(0,B.jsxs)(Vl,{size:3,children:[" x ",(j=_.line_item)==null?void 0:j.quantity,"   "]})]}),(0,B.jsxs)(Ls,{children:[(0,B.jsx)(uv,{}),(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[(h=_.recaps.material)==null?void 0:h.label," : "]}),(0,B.jsxs)(fe,{children:[(Y=_.recaps.material)==null?void 0:Y.value," "]}),(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[(ye=(K=_.recaps.sign)==null?void 0:K.size)==null?void 0:ye.label," : "]}),(0,B.jsxs)(fe,{children:[" ",`
                ${(Ke=(qe=(Pe=(nt=_.recaps.sign)==null?void 0:nt.size)==null?void 0:Pe.value)==null?void 0:qe.width)==null?void 0:Ke.label} :
                 ${(ot=(_e=(Re=_.recaps.sign)==null?void 0:Re.size)==null?void 0:_e.value)==null?void 0:ot.width.value}, 
                 ${(ge=(Ue=(Cn=(gt=_.recaps.sign)==null?void 0:gt.size)==null?void 0:Cn.value)==null?void 0:Ue.height)==null?void 0:ge.label}:
                  ${(Me=(oe=(It=_.recaps.sign)==null?void 0:It.size)==null?void 0:oe.value)==null?void 0:Me.height.value}
                  `," "]}),(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[(st=(xe=(be=(te=_.recaps.sign)==null?void 0:te.size)==null?void 0:be.value)==null?void 0:xe.thickness)==null?void 0:st.label," : "]}),(0,B.jsxs)(fe,{children:[(ze=(Et=(ue=_.recaps.sign)==null?void 0:ue.size)==null?void 0:Et.value)==null?void 0:ze.thickness.value," "]}),(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[(Fe=(Tt=_.recaps.sign)==null?void 0:Tt.shape)==null?void 0:Fe.label," : "]}),(0,B.jsxs)(fe,{children:[" ",(Ae=(lt=_.recaps.sign)==null?void 0:lt.shape)==null?void 0:Ae.value]}),(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[(jt=(Rt=_.recaps.sign)==null?void 0:Rt.fixingMethod)==null?void 0:jt.label," : "]}),(0,B.jsxs)(fe,{children:[" ",(bt=(jn=_.recaps.sign)==null?void 0:jn.fixingMethod)==null?void 0:bt.value]}),!((Ft=(at=($t=_.recaps.sign)==null?void 0:$t.border)==null?void 0:at.value)!=null&&Ft.face1)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[(Fn=(Xn=_.recaps.sign)==null?void 0:Xn.border)==null?void 0:Fn.label," : "]}),(0,B.jsxs)(fe,{children:[" ",(Bn=(on=(ln=_.recaps.sign)==null?void 0:ln.border)==null?void 0:on.value)==null?void 0:Bn.type,", ",(sn=(Ut=(xn=_.recaps.sign)==null?void 0:xn.border)==null?void 0:Ut.value)==null?void 0:sn.color," "]})]}),((Mt=(St=(Dn=_.recaps.sign)==null?void 0:Dn.border)==null?void 0:St.value)==null?void 0:Mt.face1)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[(Vn=(Jn=_.recaps.sign)==null?void 0:Jn.border)==null?void 0:Vn.label,"-",(_n=(rt=_.recaps)==null?void 0:rt.faces)==null?void 0:_n.face1,": "]}),(0,B.jsxs)(fe,{children:[" ",(On=(la=(ua=(xa=_.recaps.sign)==null?void 0:xa.border)==null?void 0:ua.value)==null?void 0:la.face1)==null?void 0:On.type,", ",(q=(Ga=(Zn=(Qa=_.recaps.sign)==null?void 0:Qa.border)==null?void 0:Zn.value)==null?void 0:Ga.face1)==null?void 0:q.color," "]})]}),((ne=(pe=(re=_.recaps.sign)==null?void 0:re.border)==null?void 0:pe.value)==null?void 0:ne.face2)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[(zt=(it=_.recaps.sign)==null?void 0:it.border)==null?void 0:zt.label,"-",(X=(Z=_.recaps)==null?void 0:Z.faces)==null?void 0:X.face2,": "]}),(0,B.jsxs)(fe,{children:[" ",(Bt=(se=(Qe=(Ie=_.recaps.sign)==null?void 0:Ie.border)==null?void 0:Qe.value)==null?void 0:se.face2)==null?void 0:Bt.type,", ",(cn=(He=(Pa=(In=_.recaps.sign)==null?void 0:In.border)==null?void 0:Pa.value)==null?void 0:He.face2)==null?void 0:cn.color," "]})]}),!((At=(Gt=(wn=_.recaps.sign)==null?void 0:wn.color)==null?void 0:Gt.value)!=null&&At.face1)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[($n=(fn=_.recaps.sign)==null?void 0:fn.color)==null?void 0:$n.label," : "]}),(0,B.jsx)(fe,{children:(Jr=(Xr=(Da=_.recaps.sign)==null?void 0:Da.color)==null?void 0:Xr.value)==null?void 0:Jr.name})]}),((d=(Ct=(oa=_.recaps.sign)==null?void 0:oa.color)==null?void 0:Ct.value)==null?void 0:d.face1)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[(Q=(U=_.recaps.sign)==null?void 0:U.color)==null?void 0:Q.label,"-",(Le=(ae=_.recaps)==null?void 0:ae.faces)==null?void 0:Le.face1,": "]}),(0,B.jsx)(fe,{children:(pt=(Te=(Ce=(Oe=_.recaps.sign)==null?void 0:Oe.color)==null?void 0:Ce.value)==null?void 0:Te.face1)==null?void 0:pt.name})]}),((ct=(Xe=(ke=_.recaps.sign)==null?void 0:ke.color)==null?void 0:Xe.value)==null?void 0:ct.face2)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[(_a=(sa=_.recaps.sign)==null?void 0:sa.color)==null?void 0:_a.label,"-",(Wi=(Nn=_.recaps)==null?void 0:Nn.faces)==null?void 0:Wi.face2,": "]}),(0,B.jsx)(fe,{children:(Zr=(Hr=(Ka=(Ti=_.recaps.sign)==null?void 0:Ti.color)==null?void 0:Ka.value)==null?void 0:Hr.face2)==null?void 0:Zr.name})]}),!((Ir=(Ri=_.recaps)==null?void 0:Ri.faces)!=null&&Ir.face1)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[(Pt=(Ci=_.recaps)==null?void 0:Ci.texts)==null?void 0:Pt.label," : "]}),(Lr=_.recaps.texts.value)==null?void 0:Lr.map(x=>{var Oa,Xa,ca,fa,da,Na,en,va,Ua,Ma,Un,pa,Yn,za,dn,ma,Aa,qn,ea,ta,na,Ha,La,ha;return(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(fe,{children:x==null?void 0:x.textContent}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:[" Font: ",x==null?void 0:x.fontFamily,"   "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Xa=(Oa=x==null?void 0:x.values)==null?void 0:Oa.width)==null?void 0:Xa.label,": ",(fa=(ca=x==null?void 0:x.values)==null?void 0:ca.width)==null?void 0:fa.value,"  "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Na=(da=x==null?void 0:x.values)==null?void 0:da.height)==null?void 0:Na.label,": ",(va=(en=x==null?void 0:x.values)==null?void 0:en.height)==null?void 0:va.value,"  "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Ma=(Ua=x==null?void 0:x.values)==null?void 0:Ua.left)==null?void 0:Ma.label,": ",(pa=(Un=x==null?void 0:x.values)==null?void 0:Un.left)==null?void 0:pa.value," "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(za=(Yn=x==null?void 0:x.values)==null?void 0:Yn.top)==null?void 0:za.label,": ",(ma=(dn=x==null?void 0:x.values)==null?void 0:dn.top)==null?void 0:ma.value,"  "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(qn=(Aa=x==null?void 0:x.values)==null?void 0:Aa.right)==null?void 0:qn.label,": ",(ta=(ea=x==null?void 0:x.values)==null?void 0:ea.right)==null?void 0:ta.value," "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["   ",(Ha=(na=x==null?void 0:x.values)==null?void 0:na.bottom)==null?void 0:Ha.label,": ",(ha=(La=x==null?void 0:x.values)==null?void 0:La.bottom)==null?void 0:ha.value,"  "]})]})})]}),((ki=(xi=_.recaps)==null?void 0:xi.faces)==null?void 0:ki.face1)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[($r=(Xi=_.recaps)==null?void 0:Xi.texts)==null?void 0:$r.label,"-",(Wa=(ei=_.recaps)==null?void 0:ei.faces)==null?void 0:Wa.face1," : "]}),(ni=(ti=(cr=(jr=_.recaps)==null?void 0:jr.texts)==null?void 0:cr.value)==null?void 0:ti.face1)==null?void 0:ni.map(x=>{var Oa,Xa,ca,fa,da,Na,en,va,Ua,Ma,Un,pa,Yn,za,dn,ma,Aa,qn,ea,ta,na,Ha,La,ha;return(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(fe,{children:x==null?void 0:x.textContent}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:[" Font: ",x==null?void 0:x.fontFamily,"   "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Xa=(Oa=x==null?void 0:x.values)==null?void 0:Oa.width)==null?void 0:Xa.label,": ",(fa=(ca=x==null?void 0:x.values)==null?void 0:ca.width)==null?void 0:fa.value,"  "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Na=(da=x==null?void 0:x.values)==null?void 0:da.height)==null?void 0:Na.label,": ",(va=(en=x==null?void 0:x.values)==null?void 0:en.height)==null?void 0:va.value,"  "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Ma=(Ua=x==null?void 0:x.values)==null?void 0:Ua.left)==null?void 0:Ma.label,": ",(pa=(Un=x==null?void 0:x.values)==null?void 0:Un.left)==null?void 0:pa.value," "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(za=(Yn=x==null?void 0:x.values)==null?void 0:Yn.top)==null?void 0:za.label,": ",(ma=(dn=x==null?void 0:x.values)==null?void 0:dn.top)==null?void 0:ma.value,"  "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(qn=(Aa=x==null?void 0:x.values)==null?void 0:Aa.right)==null?void 0:qn.label,": ",(ta=(ea=x==null?void 0:x.values)==null?void 0:ea.right)==null?void 0:ta.value," "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["   ",(Ha=(na=x==null?void 0:x.values)==null?void 0:na.bottom)==null?void 0:Ha.label,": ",(ha=(La=x==null?void 0:x.values)==null?void 0:La.bottom)==null?void 0:ha.value,"  "]})]})})]}),((Ji=(Di=_.recaps)==null?void 0:Di.faces)==null?void 0:Ji.face2)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[(fr=(ka=_.recaps)==null?void 0:ka.texts)==null?void 0:fr.label,"-",(Ht=(_i=_.recaps)==null?void 0:_i.faces)==null?void 0:Ht.face2," : "]}),(ai=(_t=(Fr=_.recaps.texts)==null?void 0:Fr.value)==null?void 0:_t.face2)==null?void 0:ai.map(x=>{var Oa,Xa,ca,fa,da,Na,en,va,Ua,Ma,Un,pa,Yn,za,dn,ma,Aa,qn,ea,ta,na,Ha,La,ha;return(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(fe,{children:x==null?void 0:x.textContent}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:[" Font: ",x==null?void 0:x.fontFamily,"   "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Xa=(Oa=x==null?void 0:x.values)==null?void 0:Oa.width)==null?void 0:Xa.label,": ",(fa=(ca=x==null?void 0:x.values)==null?void 0:ca.width)==null?void 0:fa.value,"  "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Na=(da=x==null?void 0:x.values)==null?void 0:da.height)==null?void 0:Na.label,": ",(va=(en=x==null?void 0:x.values)==null?void 0:en.height)==null?void 0:va.value,"  "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Ma=(Ua=x==null?void 0:x.values)==null?void 0:Ua.left)==null?void 0:Ma.label,": ",(pa=(Un=x==null?void 0:x.values)==null?void 0:Un.left)==null?void 0:pa.value," "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(za=(Yn=x==null?void 0:x.values)==null?void 0:Yn.top)==null?void 0:za.label,": ",(ma=(dn=x==null?void 0:x.values)==null?void 0:dn.top)==null?void 0:ma.value,"  "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(qn=(Aa=x==null?void 0:x.values)==null?void 0:Aa.right)==null?void 0:qn.label,": ",(ta=(ea=x==null?void 0:x.values)==null?void 0:ea.right)==null?void 0:ta.value," "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["   ",(Ha=(na=x==null?void 0:x.values)==null?void 0:na.bottom)==null?void 0:Ha.label,": ",(ha=(La=x==null?void 0:x.values)==null?void 0:La.bottom)==null?void 0:ha.value,"  "]})]})})]}),(0,B.jsx)(wl,{inlineAlignment:"space-between",children:(0,B.jsx)(lv,{href:(Lu=(Zi=_.recaps)==null?void 0:Zi.filesUrl)==null?void 0:Lu.zipUrl,children:y.translate("bownloadBtn")})})]})]})})})]})})}})();
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
          var fakeInternalInstance = {};
          var emptyRefsObject = new React.Component().refs;
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
          {
            didWarnAboutStateAssignmentForComponent = /* @__PURE__ */ new Set();
            didWarnAboutUninitializedState = /* @__PURE__ */ new Set();
            didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = /* @__PURE__ */ new Set();
            didWarnAboutLegacyLifecyclesAndDerivedState = /* @__PURE__ */ new Set();
            didWarnAboutDirectlyAssigningPropsToState = /* @__PURE__ */ new Set();
            didWarnAboutUndefinedDerivedState = /* @__PURE__ */ new Set();
            didWarnAboutContextTypeAndContextTypes = /* @__PURE__ */ new Set();
            didWarnAboutInvalidateContextType = /* @__PURE__ */ new Set();
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
            instance.refs = emptyRefsObject;
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
          var didWarnAboutMaps;
          var didWarnAboutGenerators;
          var didWarnAboutStringRefs;
          var ownerHasKeyUseWarning;
          var ownerHasFunctionTypeWarning;
          var warnForMissingKey = function(child, returnFiber) {
          };
          {
            didWarnAboutMaps = false;
            didWarnAboutGenerators = false;
            didWarnAboutStringRefs = {};
            ownerHasKeyUseWarning = {};
            ownerHasFunctionTypeWarning = {};
            warnForMissingKey = function(child, returnFiber) {
              if (child === null || typeof child !== "object") {
                return;
              }
              if (!child._store || child._store.validated || child.key != null) {
                return;
              }
              if (typeof child._store !== "object") {
                throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
              }
              child._store.validated = true;
              var componentName = getComponentNameFromFiber(returnFiber) || "Component";
              if (ownerHasKeyUseWarning[componentName]) {
                return;
              }
              ownerHasKeyUseWarning[componentName] = true;
              error('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.');
            };
          }
          function coerceRef(returnFiber, current2, element) {
            var mixedRef = element.ref;
            if (mixedRef !== null && typeof mixedRef !== "function" && typeof mixedRef !== "object") {
              {
                if ((returnFiber.mode & StrictLegacyMode || warnAboutStringRefs) && // We warn in ReactElement.js if owner and self are equal for string refs
                // because these cannot be automatically converted to an arrow function
                // using a codemod. Therefore, we don't have to warn about string refs again.
                !(element._owner && element._self && element._owner.stateNode !== element._self)) {
                  var componentName = getComponentNameFromFiber(returnFiber) || "Component";
                  if (!didWarnAboutStringRefs[componentName]) {
                    {
                      error('A string ref, "%s", has been found within a strict mode tree. String refs are a source of potential bugs and should be avoided. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', mixedRef);
                    }
                    didWarnAboutStringRefs[componentName] = true;
                  }
                }
              }
              if (element._owner) {
                var owner = element._owner;
                var inst;
                if (owner) {
                  var ownerFiber = owner;
                  if (ownerFiber.tag !== ClassComponent) {
                    throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
                  }
                  inst = ownerFiber.stateNode;
                }
                if (!inst) {
                  throw new Error("Missing owner for string ref " + mixedRef + ". This error is likely caused by a bug in React. Please file an issue.");
                }
                var resolvedInst = inst;
                {
                  checkPropStringCoercion(mixedRef, "ref");
                }
                var stringRef = "" + mixedRef;
                if (current2 !== null && current2.ref !== null && typeof current2.ref === "function" && current2.ref._stringRef === stringRef) {
                  return current2.ref;
                }
                var ref = function(value) {
                  var refs = resolvedInst.refs;
                  if (refs === emptyRefsObject) {
                    refs = resolvedInst.refs = {};
                  }
                  if (value === null) {
                    delete refs[stringRef];
                  } else {
                    refs[stringRef] = value;
                  }
                };
                ref._stringRef = stringRef;
                return ref;
              } else {
                if (typeof mixedRef !== "string") {
                  throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
                }
                if (!element._owner) {
                  throw new Error("Element ref was specified as a string (" + mixedRef + ") but no owner was set. This could happen for one of the following reasons:\n1. You may be adding a ref to a function component\n2. You may be adding a ref to a component that was not created inside a component's render method\n3. You have multiple copies of React loaded\nSee https://reactjs.org/link/refs-must-have-owner for more information.");
                }
              }
            }
            return mixedRef;
          }
          function throwOnInvalidObjectType(returnFiber, newChild) {
            var childString = Object.prototype.toString.call(newChild);
            throw new Error("Objects are not valid as a React child (found: " + (childString === "[object Object]" ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : childString) + "). If you meant to render a collection of children, use an array instead.");
          }
          function warnOnFunctionType(returnFiber) {
            {
              var componentName = getComponentNameFromFiber(returnFiber) || "Component";
              if (ownerHasFunctionTypeWarning[componentName]) {
                return;
              }
              ownerHasFunctionTypeWarning[componentName] = true;
              error("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
            }
          }
          function resolveLazy(lazyType) {
            var payload = lazyType._payload;
            var init = lazyType._init;
            return init(payload);
          }
          function ChildReconciler(shouldTrackSideEffects) {
            function deleteChild(returnFiber, childToDelete) {
              if (!shouldTrackSideEffects) {
                return;
              }
              var deletions = returnFiber.deletions;
              if (deletions === null) {
                returnFiber.deletions = [childToDelete];
                returnFiber.flags |= ChildDeletion;
              } else {
                deletions.push(childToDelete);
              }
            }
            function deleteRemainingChildren(returnFiber, currentFirstChild) {
              if (!shouldTrackSideEffects) {
                return null;
              }
              var childToDelete = currentFirstChild;
              while (childToDelete !== null) {
                deleteChild(returnFiber, childToDelete);
                childToDelete = childToDelete.sibling;
              }
              return null;
            }
            function mapRemainingChildren(returnFiber, currentFirstChild) {
              var existingChildren = /* @__PURE__ */ new Map();
              var existingChild = currentFirstChild;
              while (existingChild !== null) {
                if (existingChild.key !== null) {
                  existingChildren.set(existingChild.key, existingChild);
                } else {
                  existingChildren.set(existingChild.index, existingChild);
                }
                existingChild = existingChild.sibling;
              }
              return existingChildren;
            }
            function useFiber(fiber, pendingProps) {
              var clone = createWorkInProgress(fiber, pendingProps);
              clone.index = 0;
              clone.sibling = null;
              return clone;
            }
            function placeChild(newFiber, lastPlacedIndex, newIndex) {
              newFiber.index = newIndex;
              if (!shouldTrackSideEffects) {
                newFiber.flags |= Forked;
                return lastPlacedIndex;
              }
              var current2 = newFiber.alternate;
              if (current2 !== null) {
                var oldIndex = current2.index;
                if (oldIndex < lastPlacedIndex) {
                  newFiber.flags |= Placement;
                  return lastPlacedIndex;
                } else {
                  return oldIndex;
                }
              } else {
                newFiber.flags |= Placement;
                return lastPlacedIndex;
              }
            }
            function placeSingleChild(newFiber) {
              if (shouldTrackSideEffects && newFiber.alternate === null) {
                newFiber.flags |= Placement;
              }
              return newFiber;
            }
            function updateTextNode(returnFiber, current2, textContent, lanes) {
              if (current2 === null || current2.tag !== HostText) {
                var created = createFiberFromText(textContent, returnFiber.mode, lanes);
                created.return = returnFiber;
                return created;
              } else {
                var existing = useFiber(current2, textContent);
                existing.return = returnFiber;
                return existing;
              }
            }
            function updateElement(returnFiber, current2, element, lanes) {
              var elementType = element.type;
              if (elementType === REACT_FRAGMENT_TYPE) {
                return updateFragment2(returnFiber, current2, element.props.children, lanes, element.key);
              }
              if (current2 !== null) {
                if (current2.elementType === elementType || // Keep this check inline so it only runs on the false path:
                isCompatibleFamilyForHotReloading(current2, element) || // Lazy types should reconcile their resolved type.
                // We need to do this after the Hot Reloading check above,
                // because hot reloading has different semantics than prod because
                // it doesn't resuspend. So we can't let the call below suspend.
                typeof elementType === "object" && elementType !== null && elementType.$$typeof === REACT_LAZY_TYPE && resolveLazy(elementType) === current2.type) {
                  var existing = useFiber(current2, element.props);
                  existing.ref = coerceRef(returnFiber, current2, element);
                  existing.return = returnFiber;
                  {
                    existing._debugSource = element._source;
                    existing._debugOwner = element._owner;
                  }
                  return existing;
                }
              }
              var created = createFiberFromElement(element, returnFiber.mode, lanes);
              created.ref = coerceRef(returnFiber, current2, element);
              created.return = returnFiber;
              return created;
            }
            function updatePortal(returnFiber, current2, portal, lanes) {
              if (current2 === null || current2.tag !== HostPortal || current2.stateNode.containerInfo !== portal.containerInfo || current2.stateNode.implementation !== portal.implementation) {
                var created = createFiberFromPortal(portal, returnFiber.mode, lanes);
                created.return = returnFiber;
                return created;
              } else {
                var existing = useFiber(current2, portal.children || []);
                existing.return = returnFiber;
                return existing;
              }
            }
            function updateFragment2(returnFiber, current2, fragment, lanes, key) {
              if (current2 === null || current2.tag !== Fragment2) {
                var created = createFiberFromFragment(fragment, returnFiber.mode, lanes, key);
                created.return = returnFiber;
                return created;
              } else {
                var existing = useFiber(current2, fragment);
                existing.return = returnFiber;
                return existing;
              }
            }
            function createChild(returnFiber, newChild, lanes) {
              if (typeof newChild === "string" && newChild !== "" || typeof newChild === "number") {
                var created = createFiberFromText("" + newChild, returnFiber.mode, lanes);
                created.return = returnFiber;
                return created;
              }
              if (typeof newChild === "object" && newChild !== null) {
                switch (newChild.$$typeof) {
                  case REACT_ELEMENT_TYPE: {
                    var _created = createFiberFromElement(newChild, returnFiber.mode, lanes);
                    _created.ref = coerceRef(returnFiber, null, newChild);
                    _created.return = returnFiber;
                    return _created;
                  }
                  case REACT_PORTAL_TYPE: {
                    var _created2 = createFiberFromPortal(newChild, returnFiber.mode, lanes);
                    _created2.return = returnFiber;
                    return _created2;
                  }
                  case REACT_LAZY_TYPE: {
                    var payload = newChild._payload;
                    var init = newChild._init;
                    return createChild(returnFiber, init(payload), lanes);
                  }
                }
                if (isArray(newChild) || getIteratorFn(newChild)) {
                  var _created3 = createFiberFromFragment(newChild, returnFiber.mode, lanes, null);
                  _created3.return = returnFiber;
                  return _created3;
                }
                throwOnInvalidObjectType(returnFiber, newChild);
              }
              {
                if (typeof newChild === "function") {
                  warnOnFunctionType(returnFiber);
                }
              }
              return null;
            }
            function updateSlot(returnFiber, oldFiber, newChild, lanes) {
              var key = oldFiber !== null ? oldFiber.key : null;
              if (typeof newChild === "string" && newChild !== "" || typeof newChild === "number") {
                if (key !== null) {
                  return null;
                }
                return updateTextNode(returnFiber, oldFiber, "" + newChild, lanes);
              }
              if (typeof newChild === "object" && newChild !== null) {
                switch (newChild.$$typeof) {
                  case REACT_ELEMENT_TYPE: {
                    if (newChild.key === key) {
                      return updateElement(returnFiber, oldFiber, newChild, lanes);
                    } else {
                      return null;
                    }
                  }
                  case REACT_PORTAL_TYPE: {
                    if (newChild.key === key) {
                      return updatePortal(returnFiber, oldFiber, newChild, lanes);
                    } else {
                      return null;
                    }
                  }
                  case REACT_LAZY_TYPE: {
                    var payload = newChild._payload;
                    var init = newChild._init;
                    return updateSlot(returnFiber, oldFiber, init(payload), lanes);
                  }
                }
                if (isArray(newChild) || getIteratorFn(newChild)) {
                  if (key !== null) {
                    return null;
                  }
                  return updateFragment2(returnFiber, oldFiber, newChild, lanes, null);
                }
                throwOnInvalidObjectType(returnFiber, newChild);
              }
              {
                if (typeof newChild === "function") {
                  warnOnFunctionType(returnFiber);
                }
              }
              return null;
            }
            function updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes) {
              if (typeof newChild === "string" && newChild !== "" || typeof newChild === "number") {
                var matchedFiber = existingChildren.get(newIdx) || null;
                return updateTextNode(returnFiber, matchedFiber, "" + newChild, lanes);
              }
              if (typeof newChild === "object" && newChild !== null) {
                switch (newChild.$$typeof) {
                  case REACT_ELEMENT_TYPE: {
                    var _matchedFiber = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
                    return updateElement(returnFiber, _matchedFiber, newChild, lanes);
                  }
                  case REACT_PORTAL_TYPE: {
                    var _matchedFiber2 = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
                    return updatePortal(returnFiber, _matchedFiber2, newChild, lanes);
                  }
                  case REACT_LAZY_TYPE:
                    var payload = newChild._payload;
                    var init = newChild._init;
                    return updateFromMap(existingChildren, returnFiber, newIdx, init(payload), lanes);
                }
                if (isArray(newChild) || getIteratorFn(newChild)) {
                  var _matchedFiber3 = existingChildren.get(newIdx) || null;
                  return updateFragment2(returnFiber, _matchedFiber3, newChild, lanes, null);
                }
                throwOnInvalidObjectType(returnFiber, newChild);
              }
              {
                if (typeof newChild === "function") {
                  warnOnFunctionType(returnFiber);
                }
              }
              return null;
            }
            function warnOnInvalidKey(child, knownKeys, returnFiber) {
              {
                if (typeof child !== "object" || child === null) {
                  return knownKeys;
                }
                switch (child.$$typeof) {
                  case REACT_ELEMENT_TYPE:
                  case REACT_PORTAL_TYPE:
                    warnForMissingKey(child, returnFiber);
                    var key = child.key;
                    if (typeof key !== "string") {
                      break;
                    }
                    if (knownKeys === null) {
                      knownKeys = /* @__PURE__ */ new Set();
                      knownKeys.add(key);
                      break;
                    }
                    if (!knownKeys.has(key)) {
                      knownKeys.add(key);
                      break;
                    }
                    error("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted \u2014 the behavior is unsupported and could change in a future version.", key);
                    break;
                  case REACT_LAZY_TYPE:
                    var payload = child._payload;
                    var init = child._init;
                    warnOnInvalidKey(init(payload), knownKeys, returnFiber);
                    break;
                }
              }
              return knownKeys;
            }
            function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
              {
                var knownKeys = null;
                for (var i = 0; i < newChildren.length; i++) {
                  var child = newChildren[i];
                  knownKeys = warnOnInvalidKey(child, knownKeys, returnFiber);
                }
              }
              var resultingFirstChild = null;
              var previousNewFiber = null;
              var oldFiber = currentFirstChild;
              var lastPlacedIndex = 0;
              var newIdx = 0;
              var nextOldFiber = null;
              for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
                if (oldFiber.index > newIdx) {
                  nextOldFiber = oldFiber;
                  oldFiber = null;
                } else {
                  nextOldFiber = oldFiber.sibling;
                }
                var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], lanes);
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
              if (newIdx === newChildren.length) {
                deleteRemainingChildren(returnFiber, oldFiber);
                if (getIsHydrating()) {
                  var numberOfForks = newIdx;
                  pushTreeFork(returnFiber, numberOfForks);
                }
                return resultingFirstChild;
              }
              if (oldFiber === null) {
                for (; newIdx < newChildren.length; newIdx++) {
                  var _newFiber = createChild(returnFiber, newChildren[newIdx], lanes);
                  if (_newFiber === null) {
                    continue;
                  }
                  lastPlacedIndex = placeChild(_newFiber, lastPlacedIndex, newIdx);
                  if (previousNewFiber === null) {
                    resultingFirstChild = _newFiber;
                  } else {
                    previousNewFiber.sibling = _newFiber;
                  }
                  previousNewFiber = _newFiber;
                }
                if (getIsHydrating()) {
                  var _numberOfForks = newIdx;
                  pushTreeFork(returnFiber, _numberOfForks);
                }
                return resultingFirstChild;
              }
              var existingChildren = mapRemainingChildren(returnFiber, oldFiber);
              for (; newIdx < newChildren.length; newIdx++) {
                var _newFiber2 = updateFromMap(existingChildren, returnFiber, newIdx, newChildren[newIdx], lanes);
                if (_newFiber2 !== null) {
                  if (shouldTrackSideEffects) {
                    if (_newFiber2.alternate !== null) {
                      existingChildren.delete(_newFiber2.key === null ? newIdx : _newFiber2.key);
                    }
                  }
                  lastPlacedIndex = placeChild(_newFiber2, lastPlacedIndex, newIdx);
                  if (previousNewFiber === null) {
                    resultingFirstChild = _newFiber2;
                  } else {
                    previousNewFiber.sibling = _newFiber2;
                  }
                  previousNewFiber = _newFiber2;
                }
              }
              if (shouldTrackSideEffects) {
                existingChildren.forEach(function(child2) {
                  return deleteChild(returnFiber, child2);
                });
              }
              if (getIsHydrating()) {
                var _numberOfForks2 = newIdx;
                pushTreeFork(returnFiber, _numberOfForks2);
              }
              return resultingFirstChild;
            }
            function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildrenIterable, lanes) {
              var iteratorFn = getIteratorFn(newChildrenIterable);
              if (typeof iteratorFn !== "function") {
                throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
              }
              {
                if (typeof Symbol === "function" && // $FlowFixMe Flow doesn't know about toStringTag
                newChildrenIterable[Symbol.toStringTag] === "Generator") {
                  if (!didWarnAboutGenerators) {
                    error("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers.");
                  }
                  didWarnAboutGenerators = true;
                }
                if (newChildrenIterable.entries === iteratorFn) {
                  if (!didWarnAboutMaps) {
                    error("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                  }
                  didWarnAboutMaps = true;
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
          {
            didWarnAboutBadClass = {};
            didWarnAboutModulePatternComponent = {};
            didWarnAboutContextTypeOnFunctionComponent = {};
            didWarnAboutGetDerivedStateOnFunctionComponent = {};
            didWarnAboutFunctionRefs = {};
            didWarnAboutReassigningProps = false;
            didWarnAboutRevealOrder = {};
            didWarnAboutTailOptions = {};
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
          var ReactVersion = "18.2.0";
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

  // node_modules/@shopify/ui-extensions-react/node_modules/@remote-ui/react/build/esm/render.mjs
  var import_react2 = __toESM(require_react(), 1);

  // node_modules/@shopify/ui-extensions-react/node_modules/@remote-ui/react/build/esm/reconciler.mjs
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

  // node_modules/@shopify/ui-extensions-react/node_modules/@remote-ui/react/build/esm/context.mjs
  var import_react = __toESM(require_react(), 1);
  var RenderContext = /* @__PURE__ */ (0, import_react.createContext)(null);

  // node_modules/@shopify/ui-extensions-react/node_modules/@remote-ui/react/build/esm/render.mjs
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

  // node_modules/@shopify/ui-extensions-react/node_modules/@remote-ui/react/build/esm/components.mjs
  var import_react4 = __toESM(require_react(), 1);
  var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);

  // node_modules/@shopify/ui-extensions-react/node_modules/@remote-ui/react/build/esm/hooks/render.mjs
  var import_react3 = __toESM(require_react(), 1);
  function useRender() {
    const render2 = (0, import_react3.useContext)(RenderContext);
    if (render2 == null) {
      throw new Error("No remote-ui Render instance found in context");
    }
    return render2;
  }

  // node_modules/@shopify/ui-extensions-react/node_modules/@remote-ui/react/build/esm/components.mjs
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
