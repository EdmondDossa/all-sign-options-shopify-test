(()=>{var rR=Object.create;var Bd=Object.defineProperty,iR=Object.defineProperties,uR=Object.getOwnPropertyDescriptor,lR=Object.getOwnPropertyDescriptors,oR=Object.getOwnPropertyNames,ss=Object.getOwnPropertySymbols,sR=Object.getPrototypeOf,Vd=Object.prototype.hasOwnProperty,Wh=Object.prototype.propertyIsEnumerable;var Kh=(p,c,g)=>c in p?Bd(p,c,{enumerable:!0,configurable:!0,writable:!0,value:g}):p[c]=g,dr=(p,c)=>{for(var g in c||(c={}))Vd.call(c,g)&&Kh(p,g,c[g]);if(ss)for(var g of ss(c))Wh.call(c,g)&&Kh(p,g,c[g]);return p},kh=(p,c)=>iR(p,lR(c));var cs=(p,c)=>{var g={};for(var C in p)Vd.call(p,C)&&c.indexOf(C)<0&&(g[C]=p[C]);if(p!=null&&ss)for(var C of ss(p))c.indexOf(C)<0&&Wh.call(p,C)&&(g[C]=p[C]);return g};var Wr=(p,c)=>()=>(c||p((c={exports:{}}).exports,c),c.exports);var cR=(p,c,g,C)=>{if(c&&typeof c=="object"||typeof c=="function")for(let b of oR(c))!Vd.call(p,b)&&b!==g&&Bd(p,b,{get:()=>c[b],enumerable:!(C=uR(c,b))||C.enumerable});return p};var ga=(p,c,g)=>(g=p!=null?rR(sR(p)):{},cR(c||!p||!p.__esModule?Bd(g,"default",{value:p,enumerable:!0}):g,p));var eu=(p,c,g)=>new Promise((C,b)=>{var A=j=>{try{V(g.next(j))}catch(h){b(h)}},_=j=>{try{V(g.throw(j))}catch(h){b(h)}},V=j=>j.done?C(j.value):Promise.resolve(j.value).then(A,_);V((g=g.apply(p,c)).next())});var ry=Wr((qe,ms)=>{"use strict";(function(){"use strict";typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!="undefined"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);var p="18.2.0",c=Symbol.for("react.element"),g=Symbol.for("react.portal"),C=Symbol.for("react.fragment"),b=Symbol.for("react.strict_mode"),A=Symbol.for("react.profiler"),_=Symbol.for("react.provider"),V=Symbol.for("react.context"),j=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),Y=Symbol.for("react.suspense_list"),P=Symbol.for("react.memo"),ge=Symbol.for("react.lazy"),at=Symbol.for("react.offscreen"),Ke=Symbol.iterator,Qe="@@iterator";function We(l){if(l===null||typeof l!="object")return null;var v=Ke&&l[Ke]||l[Qe];return typeof v=="function"?v:null}var xe={current:null},Oe={transition:null},st={current:null,isBatchingLegacy:!1,didScheduleLegacyUpdate:!1},gt={current:null},xn={},Ue=null;function be(l){Ue=l}xn.setExtraStackFrame=function(l){Ue=l},xn.getCurrentStack=null,xn.getStackAddendum=function(){var l="";Ue&&(l+=Ue);var v=xn.getCurrentStack;return v&&(l+=v()||""),l};var It=!1,le=!1,Me=!1,te=!1,Se=!1,De={ReactCurrentDispatcher:xe,ReactCurrentBatchConfig:Oe,ReactCurrentOwner:gt};De.ReactDebugCurrentFrame=xn,De.ReactCurrentActQueue=st;function ct(l){{for(var v=arguments.length,R=new Array(v>1?v-1:0),D=1;D<v;D++)R[D-1]=arguments[D];Et("warn",l,R)}}function ie(l){{for(var v=arguments.length,R=new Array(v>1?v-1:0),D=1;D<v;D++)R[D-1]=arguments[D];Et("error",l,R)}}function Et(l,v,R){{var D=De.ReactDebugCurrentFrame,w=D.getStackAddendum();w!==""&&(v+="%s",R=R.concat([w]));var se=R.map(function(I){return String(I)});se.unshift("Warning: "+v),Function.prototype.apply.call(console[l],console,se)}}var ze={};function Tt(l,v){{var R=l.constructor,D=R&&(R.displayName||R.name)||"ReactClass",w=D+"."+v;if(ze[w])return;ie("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",v,D),ze[w]=!0}}var je={isMounted:function(l){return!1},enqueueForceUpdate:function(l,v,R){Tt(l,"forceUpdate")},enqueueReplaceState:function(l,v,R,D){Tt(l,"replaceState")},enqueueSetState:function(l,v,R,D){Tt(l,"setState")}},ot=Object.assign,Ae={};Object.freeze(Ae);function Rt(l,v,R){this.props=l,this.context=v,this.refs=Ae,this.updater=R||je}Rt.prototype.isReactComponent={},Rt.prototype.setState=function(l,v){if(typeof l!="object"&&typeof l!="function"&&l!=null)throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,l,v,"setState")},Rt.prototype.forceUpdate=function(l){this.updater.enqueueForceUpdate(this,l,"forceUpdate")};{var Lt={isMounted:["isMounted","Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],replaceState:["replaceState","Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]},Ln=function(l,v){Object.defineProperty(Rt.prototype,l,{get:function(){ct("%s(...) is deprecated in plain JavaScript React classes. %s",v[0],v[1])}})};for(var bt in Lt)Lt.hasOwnProperty(bt)&&Ln(bt,Lt[bt])}function $t(){}$t.prototype=Rt.prototype;function rt(l,v,R){this.props=l,this.context=v,this.refs=Ae,this.updater=R||je}var jt=rt.prototype=new $t;jt.constructor=rt,ot(jt,Rt.prototype),jt.isPureReactComponent=!0;function kn(){var l={current:null};return Object.seal(l),l}var jn=Array.isArray;function on(l){return jn(l)}function sn(l){{var v=typeof Symbol=="function"&&Symbol.toStringTag,R=v&&l[Symbol.toStringTag]||l.constructor.name||"Object";return R}}function Fn(l){try{return Dn(l),!1}catch(v){return!0}}function Dn(l){return""+l}function Ut(l){if(Fn(l))return ie("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",sn(l)),Dn(l)}function cn(l,v,R){var D=l.displayName;if(D)return D;var w=v.displayName||v.name||"";return w!==""?R+"("+w+")":R}function _n(l){return l.displayName||"Context"}function St(l){if(l==null)return null;if(typeof l.tag=="number"&&ie("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof l=="function")return l.displayName||l.name||null;if(typeof l=="string")return l;switch(l){case C:return"Fragment";case g:return"Portal";case A:return"Profiler";case b:return"StrictMode";case h:return"Suspense";case Y:return"SuspenseList"}if(typeof l=="object")switch(l.$$typeof){case V:var v=l;return _n(v)+".Consumer";case _:var R=l;return _n(R._context)+".Provider";case j:return cn(l,l.render,"ForwardRef");case P:var D=l.displayName||null;return D!==null?D:St(l.type)||"Memo";case ge:{var w=l,se=w._payload,I=w._init;try{return St(I(se))}catch(Ce){return null}}}return null}var Mt=Object.prototype.hasOwnProperty,Xn={key:!0,ref:!0,__self:!0,__source:!0},Bn,it,On;On={};function ba(l){if(Mt.call(l,"ref")){var v=Object.getOwnPropertyDescriptor(l,"ref").get;if(v&&v.isReactWarning)return!1}return l.ref!==void 0}function ra(l){if(Mt.call(l,"key")){var v=Object.getOwnPropertyDescriptor(l,"key").get;if(v&&v.isReactWarning)return!1}return l.key!==void 0}function ia(l,v){var R=function(){Bn||(Bn=!0,ie("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",v))};R.isReactWarning=!0,Object.defineProperty(l,"key",{get:R,configurable:!0})}function Nn(l,v){var R=function(){it||(it=!0,ie("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",v))};R.isReactWarning=!0,Object.defineProperty(l,"ref",{get:R,configurable:!0})}function Ua(l){if(typeof l.ref=="string"&&gt.current&&l.__self&&gt.current.stateNode!==l.__self){var v=St(gt.current.type);On[v]||(ie('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',v,l.ref),On[v]=!0)}}var Jn=function(l,v,R,D,w,se,I){var Ce={$$typeof:c,type:l,key:v,ref:R,props:I,_owner:se};return Ce._store={},Object.defineProperty(Ce._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(Ce,"_self",{configurable:!1,enumerable:!1,writable:!1,value:D}),Object.defineProperty(Ce,"_source",{configurable:!1,enumerable:!1,writable:!1,value:w}),Object.freeze&&(Object.freeze(Ce.props),Object.freeze(Ce)),Ce};function Ma(l,v,R){var D,w={},se=null,I=null,Ce=null,Ve=null;if(v!=null){ba(v)&&(I=v.ref,Ua(v)),ra(v)&&(Ut(v.key),se=""+v.key),Ce=v.__self===void 0?null:v.__self,Ve=v.__source===void 0?null:v.__source;for(D in v)Mt.call(v,D)&&!Xn.hasOwnProperty(D)&&(w[D]=v[D])}var et=arguments.length-2;if(et===1)w.children=R;else if(et>1){for(var ft=Array(et),pt=0;pt<et;pt++)ft[pt]=arguments[pt+2];Object.freeze&&Object.freeze(ft),w.children=ft}if(l&&l.defaultProps){var yt=l.defaultProps;for(D in yt)w[D]===void 0&&(w[D]=yt[D])}if(se||I){var Ot=typeof l=="function"?l.displayName||l.name||"Unknown":l;se&&ia(w,Ot),I&&Nn(w,Ot)}return Jn(l,se,I,Ce,Ve,gt.current,w)}function q(l,v){var R=Jn(l.type,v,l.ref,l._self,l._source,l._owner,l.props);return R}function ae(l,v,R){if(l==null)throw new Error("React.cloneElement(...): The argument must be a React element, but you passed "+l+".");var D,w=ot({},l.props),se=l.key,I=l.ref,Ce=l._self,Ve=l._source,et=l._owner;if(v!=null){ba(v)&&(I=v.ref,et=gt.current),ra(v)&&(Ut(v.key),se=""+v.key);var ft;l.type&&l.type.defaultProps&&(ft=l.type.defaultProps);for(D in v)Mt.call(v,D)&&!Xn.hasOwnProperty(D)&&(v[D]===void 0&&ft!==void 0?w[D]=ft[D]:w[D]=v[D])}var pt=arguments.length-2;if(pt===1)w.children=R;else if(pt>1){for(var yt=Array(pt),Ot=0;Ot<pt;Ot++)yt[Ot]=arguments[Ot+2];w.children=yt}return Jn(l.type,se,I,Ce,Ve,et,w)}function me(l){return typeof l=="object"&&l!==null&&l.$$typeof===c}var ne=".",ut=":";function zt(l){var v=/[=:]/g,R={"=":"=0",":":"=2"},D=l.replace(v,function(w){return R[w]});return"$"+D}var J=!1,k=/\/+/g;function $e(l){return l.replace(k,"$&/")}function Ge(l,v){return typeof l=="object"&&l!==null&&l.key!=null?(Ut(l.key),zt(""+l.key)):v.toString(36)}function oe(l,v,R,D,w){var se=typeof l;(se==="undefined"||se==="boolean")&&(l=null);var I=!1;if(l===null)I=!0;else switch(se){case"string":case"number":I=!0;break;case"object":switch(l.$$typeof){case c:case g:I=!0}}if(I){var Ce=l,Ve=w(Ce),et=D===""?ne+Ge(Ce,0):D;if(on(Ve)){var ft="";et!=null&&(ft=$e(et)+"/"),oe(Ve,v,ft,"",function(Fs){return Fs})}else Ve!=null&&(me(Ve)&&(Ve.key&&(!Ce||Ce.key!==Ve.key)&&Ut(Ve.key),Ve=q(Ve,R+(Ve.key&&(!Ce||Ce.key!==Ve.key)?$e(""+Ve.key)+"/":"")+et)),v.push(Ve));return 1}var pt,yt,Ot=0,Bt=D===""?ne:D+ut;if(on(l))for(var zr=0;zr<l.length;zr++)pt=l[zr],yt=Bt+Ge(pt,zr),Ot+=oe(pt,v,R,yt,w);else{var vu=We(l);if(typeof vu=="function"){var Ol=l;vu===Ol.entries&&(J||ct("Using Maps as children is not supported. Use an array of keyed ReactElements instead."),J=!0);for(var Ti=vu.call(Ol),Nl,js=0;!(Nl=Ti.next()).done;)pt=Nl.value,yt=Bt+Ge(pt,js++),Ot+=oe(pt,v,R,yt,w)}else if(se==="object"){var Ul=String(l);throw new Error("Objects are not valid as a React child (found: "+(Ul==="[object Object]"?"object with keys {"+Object.keys(l).join(", ")+"}":Ul)+"). If you meant to render a collection of children, use an array instead.")}}return Ot}function Ft(l,v,R){if(l==null)return l;var D=[],w=0;return oe(l,D,"","",function(se){return v.call(R,se,w++)}),D}function Zn(l){var v=0;return Ft(l,function(){v++}),v}function za(l,v,R){Ft(l,function(){v.apply(this,arguments)},R)}function He(l){return Ft(l,function(v){return v})||[]}function fn(l){if(!me(l))throw new Error("React.Children.only expected to receive a single React element child.");return l}function Vn(l){var v={$$typeof:V,_currentValue:l,_currentValue2:l,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};v.Provider={$$typeof:_,_context:v};var R=!1,D=!1,w=!1;{var se={$$typeof:V,_context:v};Object.defineProperties(se,{Provider:{get:function(){return D||(D=!0,ie("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")),v.Provider},set:function(I){v.Provider=I}},_currentValue:{get:function(){return v._currentValue},set:function(I){v._currentValue=I}},_currentValue2:{get:function(){return v._currentValue2},set:function(I){v._currentValue2=I}},_threadCount:{get:function(){return v._threadCount},set:function(I){v._threadCount=I}},Consumer:{get:function(){return R||(R=!0,ie("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")),v.Consumer}},displayName:{get:function(){return v.displayName},set:function(I){w||(ct("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.",I),w=!0)}}}),v.Consumer=se}return v._currentRenderer=null,v._currentRenderer2=null,v}var Qt=-1,At=0,dn=1,In=2;function Sa(l){if(l._status===Qt){var v=l._result,R=v();if(R.then(function(se){if(l._status===At||l._status===Qt){var I=l;I._status=dn,I._result=se}},function(se){if(l._status===At||l._status===Qt){var I=l;I._status=In,I._result=se}}),l._status===Qt){var D=l;D._status=At,D._result=R}}if(l._status===dn){var w=l._result;return w===void 0&&ie(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,w),"default"in w||ie(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,w),w.default}else throw l._result}function _r(l){var v={_status:Qt,_result:l},R={$$typeof:ge,_payload:v,_init:Sa};{var D,w;Object.defineProperties(R,{defaultProps:{configurable:!0,get:function(){return D},set:function(se){ie("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."),D=se,Object.defineProperty(R,"defaultProps",{enumerable:!0})}},propTypes:{configurable:!0,get:function(){return w},set:function(se){ie("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."),w=se,Object.defineProperty(R,"propTypes",{enumerable:!0})}}})}return R}function Or(l){l!=null&&l.$$typeof===P?ie("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."):typeof l!="function"?ie("forwardRef requires a render function but was given %s.",l===null?"null":typeof l):l.length!==0&&l.length!==2&&ie("forwardRef render functions accept exactly two parameters: props and ref. %s",l.length===1?"Did you forget to use the ref parameter?":"Any additional parameter will be undefined."),l!=null&&(l.defaultProps!=null||l.propTypes!=null)&&ie("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");var v={$$typeof:j,render:l};{var R;Object.defineProperty(v,"displayName",{enumerable:!1,configurable:!0,get:function(){return R},set:function(D){R=D,!l.name&&!l.displayName&&(l.displayName=D)}})}return v}var ua;ua=Symbol.for("react.module.reference");function Ct(l){return!!(typeof l=="string"||typeof l=="function"||l===C||l===A||Se||l===b||l===h||l===Y||te||l===at||It||le||Me||typeof l=="object"&&l!==null&&(l.$$typeof===ge||l.$$typeof===P||l.$$typeof===_||l.$$typeof===V||l.$$typeof===j||l.$$typeof===ua||l.getModuleId!==void 0))}function d(l,v){Ct(l)||ie("memo: The first argument must be a component. Instead received: %s",l===null?"null":typeof l);var R={$$typeof:P,type:l,compare:v===void 0?null:v};{var D;Object.defineProperty(R,"displayName",{enumerable:!1,configurable:!0,get:function(){return D},set:function(w){D=w,!l.name&&!l.displayName&&(l.displayName=w)}})}return R}function U(){var l=xe.current;return l===null&&ie(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`),l}function y(l){var v=U();if(l._context!==void 0){var R=l._context;R.Consumer===l?ie("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?"):R.Provider===l&&ie("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?")}return v.useContext(l)}function Z(l){var v=U();return v.useState(l)}function Re(l,v,R){var D=U();return D.useReducer(l,v,R)}function Ee(l){var v=U();return v.useRef(l)}function de(l,v){var R=U();return R.useEffect(l,v)}function ce(l,v){var R=U();return R.useInsertionEffect(l,v)}function Je(l,v){var R=U();return R.useLayoutEffect(l,v)}function Fe(l,v){var R=U();return R.useCallback(l,v)}function Be(l,v){var R=U();return R.useMemo(l,v)}function Xe(l,v,R){var D=U();return D.useImperativeHandle(l,v,R)}function Gt(l,v){{var R=U();return R.useDebugValue(l,v)}}function en(){var l=U();return l.useTransition()}function _t(l){var v=U();return v.useDeferredValue(l)}function Ea(){var l=U();return l.useId()}function la(l,v,R){var D=U();return D.useSyncExternalStore(l,v,R)}var vn=0,wn,$n,oa,ea,sa,ht,Yn;function ca(){}ca.__reactDisabledLog=!0;function Ta(){{if(vn===0){wn=console.log,$n=console.info,oa=console.warn,ea=console.error,sa=console.group,ht=console.groupCollapsed,Yn=console.groupEnd;var l={configurable:!0,enumerable:!0,value:ca,writable:!0};Object.defineProperties(console,{info:l,log:l,warn:l,error:l,group:l,groupCollapsed:l,groupEnd:l})}vn++}}function Rs(){{if(vn--,vn===0){var l={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:ot({},l,{value:wn}),info:ot({},l,{value:$n}),warn:ot({},l,{value:oa}),error:ot({},l,{value:ea}),group:ot({},l,{value:sa}),groupCollapsed:ot({},l,{value:ht}),groupEnd:ot({},l,{value:Yn})})}vn<0&&ie("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var iu=De.ReactCurrentDispatcher,uu;function Nr(l,v,R){{if(uu===void 0)try{throw Error()}catch(w){var D=w.stack.trim().match(/\n( *(at )?)/);uu=D&&D[1]||""}return`
`+uu+l}}var gi=!1,Jr;{var lu=typeof WeakMap=="function"?WeakMap:Map;Jr=new lu}function ou(l,v){if(!l||gi)return"";{var R=Jr.get(l);if(R!==void 0)return R}var D;gi=!0;var w=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var se;se=iu.current,iu.current=null,Ta();try{if(v){var I=function(){throw Error()};if(Object.defineProperty(I.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(I,[])}catch(Bt){D=Bt}Reflect.construct(l,[],I)}else{try{I.call()}catch(Bt){D=Bt}l.call(I.prototype)}}else{try{throw Error()}catch(Bt){D=Bt}l()}}catch(Bt){if(Bt&&D&&typeof Bt.stack=="string"){for(var Ce=Bt.stack.split(`
`),Ve=D.stack.split(`
`),et=Ce.length-1,ft=Ve.length-1;et>=1&&ft>=0&&Ce[et]!==Ve[ft];)ft--;for(;et>=1&&ft>=0;et--,ft--)if(Ce[et]!==Ve[ft]){if(et!==1||ft!==1)do if(et--,ft--,ft<0||Ce[et]!==Ve[ft]){var pt=`
`+Ce[et].replace(" at new "," at ");return l.displayName&&pt.includes("<anonymous>")&&(pt=pt.replace("<anonymous>",l.displayName)),typeof l=="function"&&Jr.set(l,pt),pt}while(et>=1&&ft>=0);break}}}finally{gi=!1,iu.current=se,Rs(),Error.prepareStackTrace=w}var yt=l?l.displayName||l.name:"",Ot=yt?Nr(yt):"";return typeof l=="function"&&Jr.set(l,Ot),Ot}function bl(l,v,R){return ou(l,!1)}function Cs(l){var v=l.prototype;return!!(v&&v.isReactComponent)}function Ur(l,v,R){if(l==null)return"";if(typeof l=="function")return ou(l,Cs(l));if(typeof l=="string")return Nr(l);switch(l){case h:return Nr("Suspense");case Y:return Nr("SuspenseList")}if(typeof l=="object")switch(l.$$typeof){case j:return bl(l.render);case P:return Ur(l.type,v,R);case ge:{var D=l,w=D._payload,se=D._init;try{return Ur(se(w),v,R)}catch(I){}}}return""}var Zr={},Sl=De.ReactDebugCurrentFrame;function tn(l){if(l){var v=l._owner,R=Ur(l.type,l._source,v?v.type:null);Sl.setExtraStackFrame(R)}else Sl.setExtraStackFrame(null)}function bi(l,v,R,D,w){{var se=Function.call.bind(Mt);for(var I in l)if(se(l,I)){var Ce=void 0;try{if(typeof l[I]!="function"){var Ve=Error((D||"React class")+": "+R+" type `"+I+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof l[I]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw Ve.name="Invariant Violation",Ve}Ce=l[I](v,I,D,R,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(et){Ce=et}Ce&&!(Ce instanceof Error)&&(tn(w),ie("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",D||"React class",R,I,typeof Ce),tn(null)),Ce instanceof Error&&!(Ce.message in Zr)&&(Zr[Ce.message]=!0,tn(w),ie("Failed %s type: %s",R,Ce.message),tn(null))}}}function Pt(l){if(l){var v=l._owner,R=Ur(l.type,l._source,v?v.type:null);be(R)}else be(null)}var su;su=!1;function xs(){if(gt.current){var l=St(gt.current.type);if(l)return`

Check the render method of \``+l+"`."}return""}function lv(l){if(l!==void 0){var v=l.fileName.replace(/^.*[\\\/]/,""),R=l.lineNumber;return`

Check your code at `+v+":"+R+"."}return""}function Ds(l){return l!=null?lv(l.__source):""}var _s={};function ov(l){var v=xs();if(!v){var R=typeof l=="string"?l:l.displayName||l.name;R&&(v=`

Check the top-level render call using <`+R+">.")}return v}function El(l,v){if(!(!l._store||l._store.validated||l.key!=null)){l._store.validated=!0;var R=ov(v);if(!_s[R]){_s[R]=!0;var D="";l&&l._owner&&l._owner!==gt.current&&(D=" It was passed a child from "+St(l._owner.type)+"."),Pt(l),ie('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',R,D),Pt(null)}}}function Tl(l,v){if(typeof l=="object"){if(on(l))for(var R=0;R<l.length;R++){var D=l[R];me(D)&&El(D,v)}else if(me(l))l._store&&(l._store.validated=!0);else if(l){var w=We(l);if(typeof w=="function"&&w!==l.entries)for(var se=w.call(l),I;!(I=se.next()).done;)me(I.value)&&El(I.value,v)}}}function Rl(l){{var v=l.type;if(v==null||typeof v=="string")return;var R;if(typeof v=="function")R=v.propTypes;else if(typeof v=="object"&&(v.$$typeof===j||v.$$typeof===P))R=v.propTypes;else return;if(R){var D=St(v);bi(R,l.props,"prop",D,l)}else if(v.PropTypes!==void 0&&!su){su=!0;var w=St(v);ie("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",w||"Unknown")}typeof v.getDefaultProps=="function"&&!v.getDefaultProps.isReactClassApproved&&ie("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.")}}function Os(l){{for(var v=Object.keys(l.props),R=0;R<v.length;R++){var D=v[R];if(D!=="children"&&D!=="key"){Pt(l),ie("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",D),Pt(null);break}}l.ref!==null&&(Pt(l),ie("Invalid attribute `ref` supplied to `React.Fragment`."),Pt(null))}}function mr(l,v,R){var D=Ct(l);if(!D){var w="";(l===void 0||typeof l=="object"&&l!==null&&Object.keys(l).length===0)&&(w+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var se=Ds(v);se?w+=se:w+=xs();var I;l===null?I="null":on(l)?I="array":l!==void 0&&l.$$typeof===c?(I="<"+(St(l.type)||"Unknown")+" />",w=" Did you accidentally export a JSX literal instead of a component?"):I=typeof l,ie("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",I,w)}var Ce=Ma.apply(this,arguments);if(Ce==null)return Ce;if(D)for(var Ve=2;Ve<arguments.length;Ve++)Tl(arguments[Ve],l);return l===C?Os(Ce):Rl(Ce),Ce}var Cl=!1;function Ns(l){var v=mr.bind(null,l);return v.type=l,Cl||(Cl=!0,ct("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")),Object.defineProperty(v,"type",{enumerable:!1,get:function(){return ct("Factory.type is deprecated. Access the class directly before passing it to createFactory."),Object.defineProperty(this,"type",{value:l}),l}}),v}function Us(l,v,R){for(var D=ae.apply(this,arguments),w=2;w<arguments.length;w++)Tl(arguments[w],D.type);return Rl(D),D}function Ir(l,v){var R=Oe.transition;Oe.transition={};var D=Oe.transition;Oe.transition._updatedFibers=new Set;try{l()}finally{if(Oe.transition=R,R===null&&D._updatedFibers){var w=D._updatedFibers.size;w>10&&ct("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."),D._updatedFibers.clear()}}}var xl=!1,Si=null;function Ms(l){if(Si===null)try{var v=("require"+Math.random()).slice(0,7),R=ms&&ms[v];Si=R.call(ms,"timers").setImmediate}catch(D){Si=function(w){xl===!1&&(xl=!0,typeof MessageChannel=="undefined"&&ie("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));var se=new MessageChannel;se.port1.onmessage=w,se.port2.postMessage(void 0)}}return Si(l)}var Mr=0,Dl=!1;function zs(l){{var v=Mr;Mr++,st.current===null&&(st.current=[]);var R=st.isBatchingLegacy,D;try{if(st.isBatchingLegacy=!0,D=l(),!R&&st.didScheduleLegacyUpdate){var w=st.current;w!==null&&(st.didScheduleLegacyUpdate=!1,du(w))}}catch(yt){throw Ei(v),yt}finally{st.isBatchingLegacy=R}if(D!==null&&typeof D=="object"&&typeof D.then=="function"){var se=D,I=!1,Ce={then:function(yt,Ot){I=!0,se.then(function(Bt){Ei(v),Mr===0?cu(Bt,yt,Ot):yt(Bt)},function(Bt){Ei(v),Ot(Bt)})}};return!Dl&&typeof Promise!="undefined"&&Promise.resolve().then(function(){}).then(function(){I||(Dl=!0,ie("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"))}),Ce}else{var Ve=D;if(Ei(v),Mr===0){var et=st.current;et!==null&&(du(et),st.current=null);var ft={then:function(yt,Ot){st.current===null?(st.current=[],cu(Ve,yt,Ot)):yt(Ve)}};return ft}else{var pt={then:function(yt,Ot){yt(Ve)}};return pt}}}}function Ei(l){l!==Mr-1&&ie("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "),Mr=l}function cu(l,v,R){{var D=st.current;if(D!==null)try{du(D),Ms(function(){D.length===0?(st.current=null,v(l)):cu(l,v,R)})}catch(w){R(w)}else v(l)}}var fu=!1;function du(l){if(!fu){fu=!0;var v=0;try{for(;v<l.length;v++){var R=l[v];do R=R(!0);while(R!==null)}l.length=0}catch(D){throw l=l.slice(v+1),D}finally{fu=!1}}}var As=mr,Hs=Us,_l=Ns,Ls={map:Ft,forEach:za,count:Zn,toArray:He,only:fn};qe.Children=Ls,qe.Component=Rt,qe.Fragment=C,qe.Profiler=A,qe.PureComponent=rt,qe.StrictMode=b,qe.Suspense=h,qe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=De,qe.cloneElement=Hs,qe.createContext=Vn,qe.createElement=As,qe.createFactory=_l,qe.createRef=kn,qe.forwardRef=Or,qe.isValidElement=me,qe.lazy=_r,qe.memo=d,qe.startTransition=Ir,qe.unstable_act=zs,qe.useCallback=Fe,qe.useContext=y,qe.useDebugValue=Gt,qe.useDeferredValue=_t,qe.useEffect=de,qe.useId=Ea,qe.useImperativeHandle=Xe,qe.useInsertionEffect=ce,qe.useLayoutEffect=Je,qe.useMemo=Be,qe.useReducer=Re,qe.useRef=Ee,qe.useState=Z,qe.useSyncExternalStore=la,qe.useTransition=en,qe.version=p,typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!="undefined"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error)})()});var vr=Wr((EC,iy)=>{"use strict";iy.exports=ry()});var uy=Wr(vt=>{"use strict";(function(){"use strict";typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!="undefined"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);var p=!1,c=!1,g=5;function C(q,ae){var me=q.length;q.push(ae),_(q,ae,me)}function b(q){return q.length===0?null:q[0]}function A(q){if(q.length===0)return null;var ae=q[0],me=q.pop();return me!==ae&&(q[0]=me,V(q,me,0)),ae}function _(q,ae,me){for(var ne=me;ne>0;){var ut=ne-1>>>1,zt=q[ut];if(j(zt,ae)>0)q[ut]=ae,q[ne]=zt,ne=ut;else return}}function V(q,ae,me){for(var ne=me,ut=q.length,zt=ut>>>1;ne<zt;){var J=(ne+1)*2-1,k=q[J],$e=J+1,Ge=q[$e];if(j(k,ae)<0)$e<ut&&j(Ge,k)<0?(q[ne]=Ge,q[$e]=ae,ne=$e):(q[ne]=k,q[J]=ae,ne=J);else if($e<ut&&j(Ge,ae)<0)q[ne]=Ge,q[$e]=ae,ne=$e;else return}}function j(q,ae){var me=q.sortIndex-ae.sortIndex;return me!==0?me:q.id-ae.id}var h=1,Y=2,P=3,ge=4,at=5;function Ke(q,ae){}var Qe=typeof performance=="object"&&typeof performance.now=="function";if(Qe){var We=performance;vt.unstable_now=function(){return We.now()}}else{var xe=Date,Oe=xe.now();vt.unstable_now=function(){return xe.now()-Oe}}var st=1073741823,gt=-1,xn=250,Ue=5e3,be=1e4,It=st,le=[],Me=[],te=1,Se=null,De=P,ct=!1,ie=!1,Et=!1,ze=typeof setTimeout=="function"?setTimeout:null,Tt=typeof clearTimeout=="function"?clearTimeout:null,je=typeof setImmediate!="undefined"?setImmediate:null,ot=typeof navigator!="undefined"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0?navigator.scheduling.isInputPending.bind(navigator.scheduling):null;function Ae(q){for(var ae=b(Me);ae!==null;){if(ae.callback===null)A(Me);else if(ae.startTime<=q)A(Me),ae.sortIndex=ae.expirationTime,C(le,ae);else return;ae=b(Me)}}function Rt(q){if(Et=!1,Ae(q),!ie)if(b(le)!==null)ie=!0,ia(Lt);else{var ae=b(Me);ae!==null&&Nn(Rt,ae.startTime-q)}}function Lt(q,ae){ie=!1,Et&&(Et=!1,Ua()),ct=!0;var me=De;try{if(c)try{return Ln(q,ae)}catch(ut){if(Se!==null){var ne=vt.unstable_now();Se.isQueued=!1}throw ut}else return Ln(q,ae)}finally{Se=null,De=me,ct=!1}}function Ln(q,ae){var me=ae;for(Ae(me),Se=b(le);Se!==null&&!p&&!(Se.expirationTime>me&&(!q||Mt()));){var ne=Se.callback;if(typeof ne=="function"){Se.callback=null,De=Se.priorityLevel;var ut=Se.expirationTime<=me,zt=ne(ut);me=vt.unstable_now(),typeof zt=="function"?Se.callback=zt:Se===b(le)&&A(le),Ae(me)}else A(le);Se=b(le)}if(Se!==null)return!0;var J=b(Me);return J!==null&&Nn(Rt,J.startTime-me),!1}function bt(q,ae){switch(q){case h:case Y:case P:case ge:case at:break;default:q=P}var me=De;De=q;try{return ae()}finally{De=me}}function $t(q){var ae;switch(De){case h:case Y:case P:ae=P;break;default:ae=De;break}var me=De;De=ae;try{return q()}finally{De=me}}function rt(q){var ae=De;return function(){var me=De;De=ae;try{return q.apply(this,arguments)}finally{De=me}}}function jt(q,ae,me){var ne=vt.unstable_now(),ut;if(typeof me=="object"&&me!==null){var zt=me.delay;typeof zt=="number"&&zt>0?ut=ne+zt:ut=ne}else ut=ne;var J;switch(q){case h:J=gt;break;case Y:J=xn;break;case at:J=It;break;case ge:J=be;break;case P:default:J=Ue;break}var k=ut+J,$e={id:te++,callback:ae,priorityLevel:q,startTime:ut,expirationTime:k,sortIndex:-1};return ut>ne?($e.sortIndex=ut,C(Me,$e),b(le)===null&&$e===b(Me)&&(Et?Ua():Et=!0,Nn(Rt,ut-ne))):($e.sortIndex=k,C(le,$e),!ie&&!ct&&(ie=!0,ia(Lt))),$e}function kn(){}function jn(){!ie&&!ct&&(ie=!0,ia(Lt))}function on(){return b(le)}function sn(q){q.callback=null}function Fn(){return De}var Dn=!1,Ut=null,cn=-1,_n=g,St=-1;function Mt(){var q=vt.unstable_now()-St;return!(q<_n)}function Xn(){}function Bn(q){if(q<0||q>125){console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");return}q>0?_n=Math.floor(1e3/q):_n=g}var it=function(){if(Ut!==null){var q=vt.unstable_now();St=q;var ae=!0,me=!0;try{me=Ut(ae,q)}finally{me?On():(Dn=!1,Ut=null)}}else Dn=!1},On;if(typeof je=="function")On=function(){je(it)};else if(typeof MessageChannel!="undefined"){var ba=new MessageChannel,ra=ba.port2;ba.port1.onmessage=it,On=function(){ra.postMessage(null)}}else On=function(){ze(it,0)};function ia(q){Ut=q,Dn||(Dn=!0,On())}function Nn(q,ae){cn=ze(function(){q(vt.unstable_now())},ae)}function Ua(){Tt(cn),cn=-1}var Jn=Xn,Ma=null;vt.unstable_IdlePriority=at,vt.unstable_ImmediatePriority=h,vt.unstable_LowPriority=ge,vt.unstable_NormalPriority=P,vt.unstable_Profiling=Ma,vt.unstable_UserBlockingPriority=Y,vt.unstable_cancelCallback=sn,vt.unstable_continueExecution=jn,vt.unstable_forceFrameRate=Bn,vt.unstable_getCurrentPriorityLevel=Fn,vt.unstable_getFirstCallbackNode=on,vt.unstable_next=$t,vt.unstable_pauseExecution=kn,vt.unstable_requestPaint=Jn,vt.unstable_runWithPriority=bt,vt.unstable_scheduleCallback=jt,vt.unstable_shouldYield=Mt,vt.unstable_wrapCallback=rt,typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!="undefined"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error)})()});var oy=Wr((RC,ly)=>{"use strict";ly.exports=uy()});var cy=Wr((CC,sy)=>{"use strict";sy.exports=function(c){var g={},C=vr(),b=oy(),A=C.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,_=!1;function V(e){_=e}function j(e){if(!_){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];Y("warn",e,n)}}function h(e){if(!_){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];Y("error",e,n)}}function Y(e,t,n){{var a=A.ReactDebugCurrentFrame,r=a.getStackAddendum();r!==""&&(t+="%s",n=n.concat([r]));var i=n.map(function(u){return String(u)});i.unshift("Warning: "+t),Function.prototype.apply.call(console[e],console,i)}}var P=Object.assign;function ge(e){return e._reactInternals}function at(e,t){e._reactInternals=t}var Ke=!1,Qe=!1,We=!1,xe=!1,Oe=!1,st=!0,gt=!0,xn=!0,Ue=0,be=1,It=2,le=3,Me=4,te=5,Se=6,De=7,ct=8,ie=9,Et=10,ze=11,Tt=12,je=13,ot=14,Ae=15,Rt=16,Lt=17,Ln=18,bt=19,$t=21,rt=22,jt=23,kn=24,jn=25,on=Symbol.for("react.element"),sn=Symbol.for("react.portal"),Fn=Symbol.for("react.fragment"),Dn=Symbol.for("react.strict_mode"),Ut=Symbol.for("react.profiler"),cn=Symbol.for("react.provider"),_n=Symbol.for("react.context"),St=Symbol.for("react.forward_ref"),Mt=Symbol.for("react.suspense"),Xn=Symbol.for("react.suspense_list"),Bn=Symbol.for("react.memo"),it=Symbol.for("react.lazy"),On=Symbol.for("react.scope"),ba=Symbol.for("react.debug_trace_mode"),ra=Symbol.for("react.offscreen"),ia=Symbol.for("react.legacy_hidden"),Nn=Symbol.for("react.cache"),Ua=Symbol.for("react.tracing_marker"),Jn=Symbol.iterator,Ma="@@iterator";function q(e){if(e===null||typeof e!="object")return null;var t=Jn&&e[Jn]||e[Ma];return typeof t=="function"?t:null}function ae(e,t,n){var a=e.displayName;if(a)return a;var r=t.displayName||t.name||"";return r!==""?n+"("+r+")":n}function me(e){return e.displayName||"Context"}function ne(e){if(e==null)return null;if(typeof e.tag=="number"&&h("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Fn:return"Fragment";case sn:return"Portal";case Ut:return"Profiler";case Dn:return"StrictMode";case Mt:return"Suspense";case Xn:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case _n:var t=e;return me(t)+".Consumer";case cn:var n=e;return me(n._context)+".Provider";case St:return ae(e,e.render,"ForwardRef");case Bn:var a=e.displayName||null;return a!==null?a:ne(e.type)||"Memo";case it:{var r=e,i=r._payload,u=r._init;try{return ne(u(i))}catch(o){return null}}}return null}function ut(e,t,n){var a=t.displayName||t.name||"";return e.displayName||(a!==""?n+"("+a+")":n)}function zt(e){return e.displayName||"Context"}function J(e){var t=e.tag,n=e.type;switch(t){case kn:return"Cache";case ie:var a=n;return zt(a)+".Consumer";case Et:var r=n;return zt(r._context)+".Provider";case Ln:return"DehydratedFragment";case ze:return ut(n,n.render,"ForwardRef");case De:return"Fragment";case te:return n;case Me:return"Portal";case le:return"Root";case Se:return"Text";case Rt:return ne(n);case ct:return n===Dn?"StrictMode":"Mode";case rt:return"Offscreen";case Tt:return"Profiler";case $t:return"Scope";case je:return"Suspense";case bt:return"SuspenseList";case jn:return"TracingMarker";case be:case Ue:case Lt:case It:case ot:case Ae:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;break}return null}var k=0,$e=1,Ge=2,oe=4,Ft=16,Zn=32,za=64,He=128,fn=256,Vn=512,Qt=1024,At=2048,dn=4096,In=8192,Sa=16384,_r=At|oe|za|Vn|Qt|Sa,Or=32767,ua=32768,Ct=65536,d=131072,U=1048576,y=2097152,Z=4194304,Re=8388608,Ee=16777216,de=33554432,ce=oe|Qt|0,Je=Ge|oe|Ft|Zn|Vn|dn|In,Fe=oe|za|Vn|In,Be=At|Ft,Xe=Z|Re|y,Gt=A.ReactCurrentOwner;function en(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{var a=t;do t=a,(t.flags&(Ge|dn))!==k&&(n=t.return),a=t.return;while(a)}return t.tag===le?n:null}function _t(e){return en(e)===e}function Ea(e){{var t=Gt.current;if(t!==null&&t.tag===be){var n=t,a=n.stateNode;a._warnedAboutRefsInRender||h("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.",J(n)||"A component"),a._warnedAboutRefsInRender=!0}}var r=ge(e);return r?en(r)===r:!1}function la(e){if(en(e)!==e)throw new Error("Unable to find node on an unmounted component.")}function vn(e){var t=e.alternate;if(!t){var n=en(e);if(n===null)throw new Error("Unable to find node on an unmounted component.");return n!==e?null:e}for(var a=e,r=t;;){var i=a.return;if(i===null)break;var u=i.alternate;if(u===null){var o=i.return;if(o!==null){a=r=o;continue}break}if(i.child===u.child){for(var s=i.child;s;){if(s===a)return la(i),e;if(s===r)return la(i),t;s=s.sibling}throw new Error("Unable to find node on an unmounted component.")}if(a.return!==r.return)a=i,r=u;else{for(var f=!1,m=i.child;m;){if(m===a){f=!0,a=i,r=u;break}if(m===r){f=!0,r=i,a=u;break}m=m.sibling}if(!f){for(m=u.child;m;){if(m===a){f=!0,a=u,r=i;break}if(m===r){f=!0,r=u,a=i;break}m=m.sibling}if(!f)throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.")}}if(a.alternate!==r)throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.")}if(a.tag!==le)throw new Error("Unable to find node on an unmounted component.");return a.stateNode.current===a?e:t}function wn(e){var t=vn(e);return t!==null?$n(t):null}function $n(e){if(e.tag===te||e.tag===Se)return e;for(var t=e.child;t!==null;){var n=$n(t);if(n!==null)return n;t=t.sibling}return null}function oa(e){var t=vn(e);return t!==null?ea(t):null}function ea(e){if(e.tag===te||e.tag===Se)return e;for(var t=e.child;t!==null;){if(t.tag!==Me){var n=ea(t);if(n!==null)return n}t=t.sibling}return null}var sa=Array.isArray;function ht(e){return sa(e)}var Yn=c.getPublicInstance,ca=c.getRootHostContext,Ta=c.getChildHostContext,Rs=c.prepareForCommit,iu=c.resetAfterCommit,uu=c.createInstance,Nr=c.appendInitialChild,gi=c.finalizeInitialChildren,Jr=c.prepareUpdate,lu=c.shouldSetTextContent,ou=c.createTextInstance,bl=c.scheduleTimeout,Cs=c.cancelTimeout,Ur=c.noTimeout,Zr=c.isPrimaryRenderer,Sl=c.warnsIfNotActing,tn=c.supportsMutation,bi=c.supportsPersistence,Pt=c.supportsHydration,su=c.getInstanceFromNode,xs=c.beforeActiveInstanceBlur,lv=c.afterActiveInstanceBlur,Ds=c.preparePortalMount,_s=c.prepareScopeUpdate,ov=c.getInstanceFromScope,El=c.getCurrentEventPriority,Tl=c.detachDeletedInstance,Rl=c.supportsMicrotasks,Os=c.scheduleMicrotask,mr=c.supportsTestSelectors,Cl=c.findFiberRoot,Ns=c.getBoundingRect,Us=c.getTextContent,Ir=c.isHiddenSubtree,xl=c.matchAccessibilityRole,Si=c.setFocusIfFocusable,Ms=c.setupIntersectionObserver,Mr=c.appendChild,Dl=c.appendChildToContainer,zs=c.commitTextUpdate,Ei=c.commitMount,cu=c.commitUpdate,fu=c.insertBefore,du=c.insertInContainerBefore,As=c.removeChild,Hs=c.removeChildFromContainer,_l=c.resetTextContent,Ls=c.hideInstance,l=c.hideTextInstance,v=c.unhideInstance,R=c.unhideTextInstance,D=c.clearContainer,w=c.cloneInstance,se=c.createContainerChildSet,I=c.appendChildToContainerChildSet,Ce=c.finalizeContainerChildren,Ve=c.replaceContainerChildren,et=c.cloneHiddenInstance,ft=c.cloneHiddenTextInstance,pt=c.canHydrateInstance,yt=c.canHydrateTextInstance,Ot=c.canHydrateSuspenseInstance,Bt=c.isSuspenseInstancePending,zr=c.isSuspenseInstanceFallback,vu=c.getSuspenseInstanceFallbackErrorDetails,Ol=c.registerSuspenseInstanceRetry,Ti=c.getNextHydratableSibling,Nl=c.getFirstHydratableChild,js=c.getFirstHydratableChildWithinContainer,Ul=c.getFirstHydratableChildWithinSuspenseInstance,Fs=c.hydrateInstance,My=c.hydrateTextInstance,zy=c.hydrateSuspenseInstance,Ay=c.getNextHydratableInstanceAfterSuspenseInstance,Hy=c.commitHydratedContainer,Ly=c.commitHydratedSuspenseInstance,jy=c.clearSuspenseBoundary,Fy=c.clearSuspenseBoundaryFromContainer,By=c.shouldDeleteUnhydratedTailInstances,Vy=c.didNotMatchHydratedContainerTextInstance,wy=c.didNotMatchHydratedTextInstance,Yy=c.didNotHydrateInstanceWithinContainer,qy=c.didNotHydrateInstanceWithinSuspenseInstance,Qy=c.didNotHydrateInstance,Gy=c.didNotFindHydratableInstanceWithinContainer,Py=c.didNotFindHydratableTextInstanceWithinContainer,Ky=c.didNotFindHydratableSuspenseInstanceWithinContainer,Wy=c.didNotFindHydratableInstanceWithinSuspenseInstance,ky=c.didNotFindHydratableTextInstanceWithinSuspenseInstance,Xy=c.didNotFindHydratableSuspenseInstanceWithinSuspenseInstance,Jy=c.didNotFindHydratableInstance,Zy=c.didNotFindHydratableTextInstance,Iy=c.didNotFindHydratableSuspenseInstance,$y=c.errorHydratingContainer,pu=0,sv,cv,fv,dv,vv,pv,mv;function hv(){}hv.__reactDisabledLog=!0;function eg(){{if(pu===0){sv=console.log,cv=console.info,fv=console.warn,dv=console.error,vv=console.group,pv=console.groupCollapsed,mv=console.groupEnd;var e={configurable:!0,enumerable:!0,value:hv,writable:!0};Object.defineProperties(console,{info:e,log:e,warn:e,error:e,group:e,groupCollapsed:e,groupEnd:e})}pu++}}function tg(){{if(pu--,pu===0){var e={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:P({},e,{value:sv}),info:P({},e,{value:cv}),warn:P({},e,{value:fv}),error:P({},e,{value:dv}),group:P({},e,{value:vv}),groupCollapsed:P({},e,{value:pv}),groupEnd:P({},e,{value:mv})})}pu<0&&h("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var Bs=A.ReactCurrentDispatcher,Vs;function Ar(e,t,n){{if(Vs===void 0)try{throw Error()}catch(r){var a=r.stack.trim().match(/\n( *(at )?)/);Vs=a&&a[1]||""}return`
`+Vs+e}}var ws=!1,Ml;{var ng=typeof WeakMap=="function"?WeakMap:Map;Ml=new ng}function Ys(e,t){if(!e||ws)return"";{var n=Ml.get(e);if(n!==void 0)return n}var a;ws=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var i;i=Bs.current,Bs.current=null,eg();try{if(t){var u=function(){throw Error()};if(Object.defineProperty(u.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(u,[])}catch(H){a=H}Reflect.construct(e,[],u)}else{try{u.call()}catch(H){a=H}e.call(u.prototype)}}else{try{throw Error()}catch(H){a=H}e()}}catch(H){if(H&&a&&typeof H.stack=="string"){for(var o=H.stack.split(`
`),s=a.stack.split(`
`),f=o.length-1,m=s.length-1;f>=1&&m>=0&&o[f]!==s[m];)m--;for(;f>=1&&m>=0;f--,m--)if(o[f]!==s[m]){if(f!==1||m!==1)do if(f--,m--,m<0||o[f]!==s[m]){var S=`
`+o[f].replace(" at new "," at ");return e.displayName&&S.includes("<anonymous>")&&(S=S.replace("<anonymous>",e.displayName)),typeof e=="function"&&Ml.set(e,S),S}while(f>=1&&m>=0);break}}}finally{ws=!1,Bs.current=i,tg(),Error.prepareStackTrace=r}var x=e?e.displayName||e.name:"",M=x?Ar(x):"";return typeof e=="function"&&Ml.set(e,M),M}function ag(e,t,n){return Ys(e,!0)}function qs(e,t,n){return Ys(e,!1)}function rg(e){var t=e.prototype;return!!(t&&t.isReactComponent)}function Qs(e,t,n){if(e==null)return"";if(typeof e=="function")return Ys(e,rg(e));if(typeof e=="string")return Ar(e);switch(e){case Mt:return Ar("Suspense");case Xn:return Ar("SuspenseList")}if(typeof e=="object")switch(e.$$typeof){case St:return qs(e.render);case Bn:return Qs(e.type,t,n);case it:{var a=e,r=a._payload,i=a._init;try{return Qs(i(r),t,n)}catch(u){}}}return""}var yv=Object.prototype.hasOwnProperty,gv={},bv=A.ReactDebugCurrentFrame;function zl(e){if(e){var t=e._owner,n=Qs(e.type,e._source,t?t.type:null);bv.setExtraStackFrame(n)}else bv.setExtraStackFrame(null)}function Aa(e,t,n,a,r){{var i=Function.call.bind(yv);for(var u in e)if(i(e,u)){var o=void 0;try{if(typeof e[u]!="function"){var s=Error((a||"React class")+": "+n+" type `"+u+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof e[u]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw s.name="Invariant Violation",s}o=e[u](t,u,a,n,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(f){o=f}o&&!(o instanceof Error)&&(zl(r),h("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",a||"React class",n,u,typeof o),zl(null)),o instanceof Error&&!(o.message in gv)&&(gv[o.message]=!0,zl(r),h("Failed %s type: %s",n,o.message),zl(null))}}}var Gs=[],Al;Al=[];var hr=-1;function Hr(e){return{current:e}}function Un(e,t){if(hr<0){h("Unexpected pop.");return}t!==Al[hr]&&h("Unexpected Fiber popped."),e.current=Gs[hr],Gs[hr]=null,Al[hr]=null,hr--}function pn(e,t,n){hr++,Gs[hr]=e.current,Al[hr]=n,e.current=t}var Ps;Ps={};var fa={};Object.freeze(fa);var yr=Hr(fa),Wa=Hr(!1),Ks=fa;function Ri(e,t,n){return n&&ka(t)?Ks:yr.current}function Sv(e,t,n){{var a=e.stateNode;a.__reactInternalMemoizedUnmaskedChildContext=t,a.__reactInternalMemoizedMaskedChildContext=n}}function Ci(e,t){{var n=e.type,a=n.contextTypes;if(!a)return fa;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={};for(var u in a)i[u]=t[u];{var o=J(e)||"Unknown";Aa(a,i,"context",o)}return r&&Sv(e,t,i),i}}function Hl(){return Wa.current}function ka(e){{var t=e.childContextTypes;return t!=null}}function Ll(e){Un(Wa,e),Un(yr,e)}function Ws(e){Un(Wa,e),Un(yr,e)}function Ev(e,t,n){{if(yr.current!==fa)throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");pn(yr,t,e),pn(Wa,n,e)}}function Tv(e,t,n){{var a=e.stateNode,r=t.childContextTypes;if(typeof a.getChildContext!="function"){{var i=J(e)||"Unknown";Ps[i]||(Ps[i]=!0,h("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.",i,i))}return n}var u=a.getChildContext();for(var o in u)if(!(o in r))throw new Error((J(e)||"Unknown")+'.getChildContext(): key "'+o+'" is not defined in childContextTypes.');{var s=J(e)||"Unknown";Aa(r,u,"child context",s)}return P({},n,u)}}function jl(e){{var t=e.stateNode,n=t&&t.__reactInternalMemoizedMergedChildContext||fa;return Ks=yr.current,pn(yr,n,e),pn(Wa,Wa.current,e),!0}}function Rv(e,t,n){{var a=e.stateNode;if(!a)throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");if(n){var r=Tv(e,t,Ks);a.__reactInternalMemoizedMergedChildContext=r,Un(Wa,e),Un(yr,e),pn(yr,r,e),pn(Wa,n,e)}else Un(Wa,e),pn(Wa,n,e)}}function ig(e){{if(!_t(e)||e.tag!==be)throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");var t=e;do{switch(t.tag){case le:return t.stateNode.context;case be:{var n=t.type;if(ka(n))return t.stateNode.__reactInternalMemoizedMergedChildContext;break}}t=t.return}while(t!==null);throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.")}}var xi=0,Cv=1,ve=0,Pe=1,tt=2,Vt=8,Xa=16,xv=Math.clz32?Math.clz32:og,ug=Math.log,lg=Math.LN2;function og(e){var t=e>>>0;return t===0?32:31-(ug(t)/lg|0)|0}var ks=31,L=0,nn=0,he=1,Di=2,gr=4,$r=8,Ja=16,mu=32,_i=4194240,hu=64,Xs=128,Js=256,Zs=512,Is=1024,$s=2048,ec=4096,tc=8192,nc=16384,ac=32768,rc=65536,ic=131072,uc=262144,lc=524288,oc=1048576,sc=2097152,Fl=130023424,Oi=4194304,cc=8388608,fc=16777216,dc=33554432,vc=67108864,Dv=Oi,yu=134217728,_v=268435455,gu=268435456,ei=536870912,da=1073741824;function sg(e){{if(e&he)return"Sync";if(e&Di)return"InputContinuousHydration";if(e&gr)return"InputContinuous";if(e&$r)return"DefaultHydration";if(e&Ja)return"Default";if(e&mu)return"TransitionHydration";if(e&_i)return"Transition";if(e&Fl)return"Retry";if(e&yu)return"SelectiveHydration";if(e&gu)return"IdleHydration";if(e&ei)return"Idle";if(e&da)return"Offscreen"}}var mt=-1,Bl=hu,Vl=Oi;function bu(e){switch(ti(e)){case he:return he;case Di:return Di;case gr:return gr;case $r:return $r;case Ja:return Ja;case mu:return mu;case hu:case Xs:case Js:case Zs:case Is:case $s:case ec:case tc:case nc:case ac:case rc:case ic:case uc:case lc:case oc:case sc:return e&_i;case Oi:case cc:case fc:case dc:case vc:return e&Fl;case yu:return yu;case gu:return gu;case ei:return ei;case da:return da;default:return h("Should have found matching lanes. This is a bug in React."),e}}function wl(e,t){var n=e.pendingLanes;if(n===L)return L;var a=L,r=e.suspendedLanes,i=e.pingedLanes,u=n&_v;if(u!==L){var o=u&~r;if(o!==L)a=bu(o);else{var s=u&i;s!==L&&(a=bu(s))}}else{var f=n&~r;f!==L?a=bu(f):i!==L&&(a=bu(i))}if(a===L)return L;if(t!==L&&t!==a&&(t&r)===L){var m=ti(a),S=ti(t);if(m>=S||m===Ja&&(S&_i)!==L)return t}(a&gr)!==L&&(a|=n&Ja);var x=e.entangledLanes;if(x!==L)for(var M=e.entanglements,H=a&x;H>0;){var z=ni(H),ee=1<<z;a|=M[z],H&=~ee}return a}function cg(e,t){for(var n=e.eventTimes,a=mt;t>0;){var r=ni(t),i=1<<r,u=n[r];u>a&&(a=u),t&=~i}return a}function fg(e,t){switch(e){case he:case Di:case gr:return t+250;case $r:case Ja:case mu:case hu:case Xs:case Js:case Zs:case Is:case $s:case ec:case tc:case nc:case ac:case rc:case ic:case uc:case lc:case oc:case sc:return t+5e3;case Oi:case cc:case fc:case dc:case vc:return mt;case yu:case gu:case ei:case da:return mt;default:return h("Should have found matching lanes. This is a bug in React."),mt}}function dg(e,t){for(var n=e.pendingLanes,a=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,u=n;u>0;){var o=ni(u),s=1<<o,f=i[o];f===mt?((s&a)===L||(s&r)!==L)&&(i[o]=fg(s,t)):f<=t&&(e.expiredLanes|=s),u&=~s}}function vg(e){return bu(e.pendingLanes)}function pc(e){var t=e.pendingLanes&~da;return t!==L?t:t&da?da:L}function pg(e){return(e&he)!==L}function mc(e){return(e&_v)!==L}function Ov(e){return(e&Fl)===e}function mg(e){var t=he|gr|Ja;return(e&t)===L}function hg(e){return(e&_i)===e}function Yl(e,t){var n=Di|gr|$r|Ja;return(t&n)!==L}function yg(e,t){return(t&e.expiredLanes)!==L}function Nv(e){return(e&_i)!==L}function Uv(){var e=Bl;return Bl<<=1,(Bl&_i)===L&&(Bl=hu),e}function gg(){var e=Vl;return Vl<<=1,(Vl&Fl)===L&&(Vl=Oi),e}function ti(e){return e&-e}function Su(e){return ti(e)}function ni(e){return 31-xv(e)}function hc(e){return ni(e)}function va(e,t){return(e&t)!==L}function Ni(e,t){return(e&t)===t}function _e(e,t){return e|t}function ql(e,t){return e&~t}function Mv(e,t){return e&t}function DR(e){return e}function bg(e,t){return e!==nn&&e<t?e:t}function yc(e){for(var t=[],n=0;n<ks;n++)t.push(e);return t}function Eu(e,t,n){e.pendingLanes|=t,t!==ei&&(e.suspendedLanes=L,e.pingedLanes=L);var a=e.eventTimes,r=hc(t);a[r]=n}function Sg(e,t){e.suspendedLanes|=t,e.pingedLanes&=~t;for(var n=e.expirationTimes,a=t;a>0;){var r=ni(a),i=1<<r;n[r]=mt,a&=~i}}function zv(e,t,n){e.pingedLanes|=e.suspendedLanes&t}function Eg(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=L,e.pingedLanes=L,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t;for(var a=e.entanglements,r=e.eventTimes,i=e.expirationTimes,u=n;u>0;){var o=ni(u),s=1<<o;a[o]=L,r[o]=mt,i[o]=mt,u&=~s}}function gc(e,t){for(var n=e.entangledLanes|=t,a=e.entanglements,r=n;r;){var i=ni(r),u=1<<i;u&t|a[i]&t&&(a[i]|=t),r&=~u}}function Tg(e,t){var n=ti(t),a;switch(n){case gr:a=Di;break;case Ja:a=$r;break;case hu:case Xs:case Js:case Zs:case Is:case $s:case ec:case tc:case nc:case ac:case rc:case ic:case uc:case lc:case oc:case sc:case Oi:case cc:case fc:case dc:case vc:a=mu;break;case ei:a=gu;break;default:a=nn;break}return(a&(e.suspendedLanes|t))!==nn?nn:a}function Av(e,t,n){if(La)for(var a=e.pendingUpdatersLaneMap;n>0;){var r=hc(n),i=1<<r,u=a[r];u.add(t),n&=~i}}function Hv(e,t){if(La)for(var n=e.pendingUpdatersLaneMap,a=e.memoizedUpdaters;t>0;){var r=hc(t),i=1<<r,u=n[r];u.size>0&&(u.forEach(function(o){var s=o.alternate;(s===null||!a.has(s))&&a.add(o)}),u.clear()),t&=~i}}function Lv(e,t){return null}var Za=he,Tu=gr,Ru=Ja,bc=ei,Cu=nn;function Ha(){return Cu}function an(e){Cu=e}function Rg(e,t){var n=Cu;try{return Cu=e,t()}finally{Cu=n}}function Cg(e,t){return e!==0&&e<t?e:t}function xg(e,t){return e===0||e>t?e:t}function jv(e,t){return e!==0&&e<t}function Fv(e){var t=ti(e);return jv(Za,t)?jv(Tu,t)?mc(t)?Ru:bc:Tu:Za}var Bv=b.unstable_scheduleCallback,Dg=b.unstable_cancelCallback,_g=b.unstable_shouldYield,Og=b.unstable_requestPaint,rn=b.unstable_now,Ql=b.unstable_ImmediatePriority,Vv=b.unstable_UserBlockingPriority,Ui=b.unstable_NormalPriority,wv=b.unstable_IdlePriority,Ng=b.unstable_yieldValue,Ug=b.unstable_setDisableYieldValue,ai=null,mn=null,G=null,Ia=!1,La=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!="undefined";function Mg(e){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__=="undefined")return!1;var t=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t.isDisabled)return!0;if(!t.supportsFiber)return h("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"),!0;try{st&&(e=P({},e,{getLaneLabelMap:Fg,injectProfilingHooks:jg})),ai=t.inject(e),mn=t}catch(n){h("React instrumentation encountered an error: %s.",n)}return!!t.checkDCE}function zg(e,t){if(mn&&typeof mn.onScheduleFiberRoot=="function")try{mn.onScheduleFiberRoot(ai,e,t)}catch(n){Ia||(Ia=!0,h("React instrumentation encountered an error: %s",n))}}function Ag(e,t){if(mn&&typeof mn.onCommitFiberRoot=="function")try{var n=(e.current.flags&He)===He;if(gt){var a;switch(t){case Za:a=Ql;break;case Tu:a=Vv;break;case Ru:a=Ui;break;case bc:a=wv;break;default:a=Ui;break}mn.onCommitFiberRoot(ai,e,a,n)}else mn.onCommitFiberRoot(ai,e,void 0,n)}catch(r){Ia||(Ia=!0,h("React instrumentation encountered an error: %s",r))}}function Hg(e){if(mn&&typeof mn.onPostCommitFiberRoot=="function")try{mn.onPostCommitFiberRoot(ai,e)}catch(t){Ia||(Ia=!0,h("React instrumentation encountered an error: %s",t))}}function Lg(e){if(mn&&typeof mn.onCommitFiberUnmount=="function")try{mn.onCommitFiberUnmount(ai,e)}catch(t){Ia||(Ia=!0,h("React instrumentation encountered an error: %s",t))}}function un(e){if(typeof Ng=="function"&&(Ug(e),V(e)),mn&&typeof mn.setStrictMode=="function")try{mn.setStrictMode(ai,e)}catch(t){Ia||(Ia=!0,h("React instrumentation encountered an error: %s",t))}}function jg(e){G=e}function Fg(){{for(var e=new Map,t=1,n=0;n<ks;n++){var a=sg(t);e.set(t,a),t*=2}return e}}function Bg(e){G!==null&&typeof G.markCommitStarted=="function"&&G.markCommitStarted(e)}function Yv(){G!==null&&typeof G.markCommitStopped=="function"&&G.markCommitStopped()}function xu(e){G!==null&&typeof G.markComponentRenderStarted=="function"&&G.markComponentRenderStarted(e)}function Mi(){G!==null&&typeof G.markComponentRenderStopped=="function"&&G.markComponentRenderStopped()}function Vg(e){G!==null&&typeof G.markComponentPassiveEffectMountStarted=="function"&&G.markComponentPassiveEffectMountStarted(e)}function wg(){G!==null&&typeof G.markComponentPassiveEffectMountStopped=="function"&&G.markComponentPassiveEffectMountStopped()}function Yg(e){G!==null&&typeof G.markComponentPassiveEffectUnmountStarted=="function"&&G.markComponentPassiveEffectUnmountStarted(e)}function qg(){G!==null&&typeof G.markComponentPassiveEffectUnmountStopped=="function"&&G.markComponentPassiveEffectUnmountStopped()}function Qg(e){G!==null&&typeof G.markComponentLayoutEffectMountStarted=="function"&&G.markComponentLayoutEffectMountStarted(e)}function Gg(){G!==null&&typeof G.markComponentLayoutEffectMountStopped=="function"&&G.markComponentLayoutEffectMountStopped()}function qv(e){G!==null&&typeof G.markComponentLayoutEffectUnmountStarted=="function"&&G.markComponentLayoutEffectUnmountStarted(e)}function Qv(){G!==null&&typeof G.markComponentLayoutEffectUnmountStopped=="function"&&G.markComponentLayoutEffectUnmountStopped()}function Pg(e,t,n){G!==null&&typeof G.markComponentErrored=="function"&&G.markComponentErrored(e,t,n)}function Kg(e,t,n){G!==null&&typeof G.markComponentSuspended=="function"&&G.markComponentSuspended(e,t,n)}function Wg(e){G!==null&&typeof G.markLayoutEffectsStarted=="function"&&G.markLayoutEffectsStarted(e)}function kg(){G!==null&&typeof G.markLayoutEffectsStopped=="function"&&G.markLayoutEffectsStopped()}function Xg(e){G!==null&&typeof G.markPassiveEffectsStarted=="function"&&G.markPassiveEffectsStarted(e)}function Jg(){G!==null&&typeof G.markPassiveEffectsStopped=="function"&&G.markPassiveEffectsStopped()}function Gv(e){G!==null&&typeof G.markRenderStarted=="function"&&G.markRenderStarted(e)}function Zg(){G!==null&&typeof G.markRenderYielded=="function"&&G.markRenderYielded()}function Pv(){G!==null&&typeof G.markRenderStopped=="function"&&G.markRenderStopped()}function Ig(e){G!==null&&typeof G.markRenderScheduled=="function"&&G.markRenderScheduled(e)}function $g(e,t){G!==null&&typeof G.markForceUpdateScheduled=="function"&&G.markForceUpdateScheduled(e,t)}function Sc(e,t){G!==null&&typeof G.markStateUpdateScheduled=="function"&&G.markStateUpdateScheduled(e,t)}function eb(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var pa=typeof Object.is=="function"?Object.is:eb,br=null,Ec=!1,Tc=!1;function Kv(e){br===null?br=[e]:br.push(e)}function tb(e){Ec=!0,Kv(e)}function Wv(){Ec&&$a()}function $a(){if(!Tc&&br!==null){Tc=!0;var e=0,t=Ha();try{var n=!0,a=br;for(an(Za);e<a.length;e++){var r=a[e];do r=r(n);while(r!==null)}br=null,Ec=!1}catch(i){throw br!==null&&(br=br.slice(e+1)),Bv(Ql,$a),i}finally{an(t),Tc=!1}}return null}function kv(e){var t=e.current.memoizedState;return t.isDehydrated}var zi=[],Ai=0,Gl=null,Pl=0,Ra=[],Ca=0,ri=null,Sr=1,Er="";function nb(e){return ui(),(e.flags&U)!==k}function ab(e){return ui(),Pl}function rb(){var e=Er,t=Sr,n=t&~ib(t);return n.toString(32)+e}function ii(e,t){ui(),zi[Ai++]=Pl,zi[Ai++]=Gl,Gl=e,Pl=t}function Xv(e,t,n){ui(),Ra[Ca++]=Sr,Ra[Ca++]=Er,Ra[Ca++]=ri,ri=e;var a=Sr,r=Er,i=Kl(a)-1,u=a&~(1<<i),o=n+1,s=Kl(t)+i;if(s>30){var f=i-i%5,m=(1<<f)-1,S=(u&m).toString(32),x=u>>f,M=i-f,H=Kl(t)+M,z=o<<M,ee=z|x,pe=S+r;Sr=1<<H|ee,Er=pe}else{var re=o<<i,Ie=re|u,Ye=r;Sr=1<<s|Ie,Er=Ye}}function Rc(e){ui();var t=e.return;if(t!==null){var n=1,a=0;ii(e,n),Xv(e,n,a)}}function Kl(e){return 32-xv(e)}function ib(e){return 1<<Kl(e)-1}function Cc(e){for(;e===Gl;)Gl=zi[--Ai],zi[Ai]=null,Pl=zi[--Ai],zi[Ai]=null;for(;e===ri;)ri=Ra[--Ca],Ra[Ca]=null,Er=Ra[--Ca],Ra[Ca]=null,Sr=Ra[--Ca],Ra[Ca]=null}function ub(){return ui(),ri!==null?{id:Sr,overflow:Er}:null}function lb(e,t){ui(),Ra[Ca++]=Sr,Ra[Ca++]=Er,Ra[Ca++]=ri,Sr=t.id,Er=t.overflow,ri=e}function ui(){yn()||h("Expected to be hydrating. This is a bug in React. Please file an issue.")}var hn=null,xa=null,ja=!1,Lr=!1,jr=null;function ob(){ja&&h("We should not be hydrating here. This is a bug in React. Please file a bug.")}function Jv(){Lr=!0}function sb(){return Lr}function cb(e){if(!Pt)return!1;var t=e.stateNode.containerInfo;return xa=js(t),hn=e,ja=!0,jr=null,Lr=!1,!0}function fb(e,t,n){return Pt?(xa=Ul(t),hn=e,ja=!0,jr=null,Lr=!1,n!==null&&lb(e,n),!0):!1}function Zv(e,t){switch(e.tag){case le:{Yy(e.stateNode.containerInfo,t);break}case te:{var n=(e.mode&Pe)!==ve;Qy(e.type,e.memoizedProps,e.stateNode,t,n);break}case je:{var a=e.memoizedState;a.dehydrated!==null&&qy(a.dehydrated,t);break}}}function Iv(e,t){Zv(e,t);var n=FT();n.stateNode=t,n.return=e;var a=e.deletions;a===null?(e.deletions=[n],e.flags|=Ft):a.push(n)}function xc(e,t){{if(Lr)return;switch(e.tag){case le:{var n=e.stateNode.containerInfo;switch(t.tag){case te:var a=t.type,r=t.pendingProps;Gy(n,a,r);break;case Se:var i=t.pendingProps;Py(n,i);break;case je:Ky(n);break}break}case te:{var u=e.type,o=e.memoizedProps,s=e.stateNode;switch(t.tag){case te:{var f=t.type,m=t.pendingProps,S=(e.mode&Pe)!==ve;Jy(u,o,s,f,m,S);break}case Se:{var x=t.pendingProps,M=(e.mode&Pe)!==ve;Zy(u,o,s,x,M);break}case je:{Iy(u,o,s);break}}break}case je:{var H=e.memoizedState,z=H.dehydrated;if(z!==null)switch(t.tag){case te:var ee=t.type,pe=t.pendingProps;Wy(z,ee,pe);break;case Se:var re=t.pendingProps;ky(z,re);break;case je:Xy(z);break}break}default:return}}}function $v(e,t){t.flags=t.flags&~dn|Ge,xc(e,t)}function ep(e,t){switch(e.tag){case te:{var n=e.type,a=e.pendingProps,r=pt(t,n,a);return r!==null?(e.stateNode=r,hn=e,xa=Nl(r),!0):!1}case Se:{var i=e.pendingProps,u=yt(t,i);return u!==null?(e.stateNode=u,hn=e,xa=null,!0):!1}case je:{var o=Ot(t);if(o!==null){var s={dehydrated:o,treeContext:ub(),retryLane:da};e.memoizedState=s;var f=BT(o);return f.return=e,e.child=f,hn=e,xa=null,!0}return!1}default:return!1}}function Dc(e){return(e.mode&Pe)!==ve&&(e.flags&He)===k}function _c(e){throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.")}function Oc(e){if(ja){var t=xa;if(!t){Dc(e)&&(xc(hn,e),_c()),$v(hn,e),ja=!1,hn=e;return}var n=t;if(!ep(e,t)){Dc(e)&&(xc(hn,e),_c()),t=Ti(n);var a=hn;if(!t||!ep(e,t)){$v(hn,e),ja=!1,hn=e;return}Iv(a,n)}}}function db(e,t,n){if(!Pt)throw new Error("Expected prepareToHydrateHostInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");var a=e.stateNode,r=!Lr,i=Fs(a,e.type,e.memoizedProps,t,n,e,r);return e.updateQueue=i,i!==null}function vb(e){if(!Pt)throw new Error("Expected prepareToHydrateHostTextInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");var t=e.stateNode,n=e.memoizedProps,a=!Lr,r=My(t,n,e,a);if(r){var i=hn;if(i!==null)switch(i.tag){case le:{var u=i.stateNode.containerInfo,o=(i.mode&Pe)!==ve;Vy(u,t,n,o);break}case te:{var s=i.type,f=i.memoizedProps,m=i.stateNode,S=(i.mode&Pe)!==ve;wy(s,f,m,t,n,S);break}}}return r}function pb(e){if(!Pt)throw new Error("Expected prepareToHydrateHostSuspenseInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");var t=e.memoizedState,n=t!==null?t.dehydrated:null;if(!n)throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");zy(n,e)}function mb(e){if(!Pt)throw new Error("Expected skipPastDehydratedSuspenseInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");var t=e.memoizedState,n=t!==null?t.dehydrated:null;if(!n)throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");return Ay(n)}function tp(e){for(var t=e.return;t!==null&&t.tag!==te&&t.tag!==le&&t.tag!==je;)t=t.return;hn=t}function Wl(e){if(!Pt||e!==hn)return!1;if(!ja)return tp(e),ja=!0,!1;if(e.tag!==le&&(e.tag!==te||By(e.type)&&!lu(e.type,e.memoizedProps))){var t=xa;if(t)if(Dc(e))np(e),_c();else for(;t;)Iv(e,t),t=Ti(t)}return tp(e),e.tag===je?xa=mb(e):xa=hn?Ti(e.stateNode):null,!0}function hb(){return ja&&xa!==null}function np(e){for(var t=xa;t;)Zv(e,t),t=Ti(t)}function Hi(){Pt&&(hn=null,xa=null,ja=!1,Lr=!1)}function ap(){jr!==null&&(ah(jr),jr=null)}function yn(){return ja}function Nc(e){jr===null?jr=[e]:jr.push(e)}var yb=A.ReactCurrentBatchConfig,gb=null;function bb(){return yb.transition}function kl(e,t){if(pa(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),a=Object.keys(t);if(n.length!==a.length)return!1;for(var r=0;r<n.length;r++){var i=n[r];if(!yv.call(t,i)||!pa(e[i],t[i]))return!1}return!0}function Sb(e){var t=e._debugOwner?e._debugOwner.type:null,n=e._debugSource;switch(e.tag){case te:return Ar(e.type);case Rt:return Ar("Lazy");case je:return Ar("Suspense");case bt:return Ar("SuspenseList");case Ue:case It:case Ae:return qs(e.type);case ze:return qs(e.type.render);case be:return ag(e.type);default:return""}}function rp(e){try{var t="",n=e;do t+=Sb(n),n=n.return;while(n);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var ip=A.ReactDebugCurrentFrame,ma=null,Du=!1;function Eb(){{if(ma===null)return null;var e=ma._debugOwner;if(e!==null&&typeof e!="undefined")return J(e)}return null}function Tb(){return ma===null?"":rp(ma)}function qn(){ip.getCurrentStack=null,ma=null,Du=!1}function Ht(e){ip.getCurrentStack=e===null?null:Tb,ma=e,Du=!1}function Rb(){return ma}function er(e){Du=e}var Fa={recordUnsafeLifecycleWarnings:function(e,t){},flushPendingUnsafeLifecycleWarnings:function(){},recordLegacyContextWarning:function(e,t){},flushLegacyContextWarning:function(){},discardPendingWarnings:function(){}};{var Cb=function(e){for(var t=null,n=e;n!==null;)n.mode&Vt&&(t=n),n=n.return;return t},li=function(e){var t=[];return e.forEach(function(n){t.push(n)}),t.sort().join(", ")},_u=[],Ou=[],Nu=[],Uu=[],Mu=[],zu=[],oi=new Set;Fa.recordUnsafeLifecycleWarnings=function(e,t){oi.has(e.type)||(typeof t.componentWillMount=="function"&&t.componentWillMount.__suppressDeprecationWarning!==!0&&_u.push(e),e.mode&Vt&&typeof t.UNSAFE_componentWillMount=="function"&&Ou.push(e),typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps.__suppressDeprecationWarning!==!0&&Nu.push(e),e.mode&Vt&&typeof t.UNSAFE_componentWillReceiveProps=="function"&&Uu.push(e),typeof t.componentWillUpdate=="function"&&t.componentWillUpdate.__suppressDeprecationWarning!==!0&&Mu.push(e),e.mode&Vt&&typeof t.UNSAFE_componentWillUpdate=="function"&&zu.push(e))},Fa.flushPendingUnsafeLifecycleWarnings=function(){var e=new Set;_u.length>0&&(_u.forEach(function(x){e.add(J(x)||"Component"),oi.add(x.type)}),_u=[]);var t=new Set;Ou.length>0&&(Ou.forEach(function(x){t.add(J(x)||"Component"),oi.add(x.type)}),Ou=[]);var n=new Set;Nu.length>0&&(Nu.forEach(function(x){n.add(J(x)||"Component"),oi.add(x.type)}),Nu=[]);var a=new Set;Uu.length>0&&(Uu.forEach(function(x){a.add(J(x)||"Component"),oi.add(x.type)}),Uu=[]);var r=new Set;Mu.length>0&&(Mu.forEach(function(x){r.add(J(x)||"Component"),oi.add(x.type)}),Mu=[]);var i=new Set;if(zu.length>0&&(zu.forEach(function(x){i.add(J(x)||"Component"),oi.add(x.type)}),zu=[]),t.size>0){var u=li(t);h(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`,u)}if(a.size>0){var o=li(a);h(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`,o)}if(i.size>0){var s=li(i);h(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`,s)}if(e.size>0){var f=li(e);j(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,f)}if(n.size>0){var m=li(n);j(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,m)}if(r.size>0){var S=li(r);j(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,S)}};var Xl=new Map,up=new Set;Fa.recordLegacyContextWarning=function(e,t){var n=Cb(e);if(n===null){h("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");return}if(!up.has(e.type)){var a=Xl.get(n);(e.type.contextTypes!=null||e.type.childContextTypes!=null||t!==null&&typeof t.getChildContext=="function")&&(a===void 0&&(a=[],Xl.set(n,a)),a.push(e))}},Fa.flushLegacyContextWarning=function(){Xl.forEach(function(e,t){if(e.length!==0){var n=e[0],a=new Set;e.forEach(function(i){a.add(J(i)||"Component"),up.add(i.type)});var r=li(a);try{Ht(n),h(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`,r)}finally{qn()}}})},Fa.discardPendingWarnings=function(){_u=[],Ou=[],Nu=[],Uu=[],Mu=[],zu=[],Xl=new Map}}function lp(e){{var t=typeof Symbol=="function"&&Symbol.toStringTag,n=t&&e[Symbol.toStringTag]||e.constructor.name||"Object";return n}}function op(e){try{return Uc(e),!1}catch(t){return!0}}function Uc(e){return""+e}function xb(e){if(op(e))return h("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",lp(e)),Uc(e)}function Db(e,t){if(op(e))return h("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.",t,lp(e)),Uc(e)}function Ba(e,t){if(e&&e.defaultProps){var n=P({},t),a=e.defaultProps;for(var r in a)n[r]===void 0&&(n[r]=a[r]);return n}return t}var Jl=Hr(null),Au;Au={};var Zl=null,Li=null,Mc=null,Il=!1;function $l(){Zl=null,Li=null,Mc=null,Il=!1}function sp(){Il=!0}function cp(){Il=!1}function fp(e,t,n){Zr?(pn(Jl,t._currentValue,e),t._currentValue=n,t._currentRenderer!==void 0&&t._currentRenderer!==null&&t._currentRenderer!==Au&&h("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."),t._currentRenderer=Au):(pn(Jl,t._currentValue2,e),t._currentValue2=n,t._currentRenderer2!==void 0&&t._currentRenderer2!==null&&t._currentRenderer2!==Au&&h("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."),t._currentRenderer2=Au)}function zc(e,t){var n=Jl.current;Un(Jl,t),Zr?e._currentValue=n:e._currentValue2=n}function Ac(e,t,n){for(var a=e;a!==null;){var r=a.alternate;if(Ni(a.childLanes,t)?r!==null&&!Ni(r.childLanes,t)&&(r.childLanes=_e(r.childLanes,t)):(a.childLanes=_e(a.childLanes,t),r!==null&&(r.childLanes=_e(r.childLanes,t))),a===n)break;a=a.return}a!==n&&h("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.")}function _b(e,t,n){Ob(e,t,n)}function Ob(e,t,n){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var r=void 0,i=a.dependencies;if(i!==null){r=a.child;for(var u=i.firstContext;u!==null;){if(u.context===t){if(a.tag===be){var o=Su(n),s=Tr(mt,o);s.tag=to;var f=a.updateQueue;if(f!==null){var m=f.shared,S=m.pending;S===null?s.next=s:(s.next=S.next,S.next=s),m.pending=s}}a.lanes=_e(a.lanes,n);var x=a.alternate;x!==null&&(x.lanes=_e(x.lanes,n)),Ac(a.return,n,e),i.lanes=_e(i.lanes,n);break}u=u.next}}else if(a.tag===Et)r=a.type===e.type?null:a.child;else if(a.tag===Ln){var M=a.return;if(M===null)throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");M.lanes=_e(M.lanes,n);var H=M.alternate;H!==null&&(H.lanes=_e(H.lanes,n)),Ac(M,n,e),r=a.sibling}else r=a.child;if(r!==null)r.return=a;else for(r=a;r!==null;){if(r===e){r=null;break}var z=r.sibling;if(z!==null){z.return=r.return,r=z;break}r=r.return}a=r}}function ji(e,t){Zl=e,Li=null,Mc=null;var n=e.dependencies;if(n!==null){var a=n.firstContext;a!==null&&(va(n.lanes,t)&&ku(),n.firstContext=null)}}function wt(e){Il&&h("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");var t=Zr?e._currentValue:e._currentValue2;if(Mc!==e){var n={context:e,memoizedValue:t,next:null};if(Li===null){if(Zl===null)throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");Li=n,Zl.dependencies={lanes:L,firstContext:n}}else Li=Li.next=n}return t}var si=null;function Hc(e){si===null?si=[e]:si.push(e)}function Nb(){if(si!==null){for(var e=0;e<si.length;e++){var t=si[e],n=t.interleaved;if(n!==null){t.interleaved=null;var a=n.next,r=t.pending;if(r!==null){var i=r.next;r.next=a,n.next=i}t.pending=n}}si=null}}function dp(e,t,n,a){var r=t.interleaved;return r===null?(n.next=n,Hc(t)):(n.next=r.next,r.next=n),t.interleaved=n,eo(e,a)}function Ub(e,t,n,a){var r=t.interleaved;r===null?(n.next=n,Hc(t)):(n.next=r.next,r.next=n),t.interleaved=n}function Mb(e,t,n,a){var r=t.interleaved;return r===null?(n.next=n,Hc(t)):(n.next=r.next,r.next=n),t.interleaved=n,eo(e,a)}function Qn(e,t){return eo(e,t)}var zb=eo;function eo(e,t){e.lanes=_e(e.lanes,t);var n=e.alternate;n!==null&&(n.lanes=_e(n.lanes,t)),n===null&&(e.flags&(Ge|dn))!==k&&ph(e);for(var a=e,r=e.return;r!==null;)r.childLanes=_e(r.childLanes,t),n=r.alternate,n!==null?n.childLanes=_e(n.childLanes,t):(r.flags&(Ge|dn))!==k&&ph(e),a=r,r=r.return;if(a.tag===le){var i=a.stateNode;return i}else return null}var vp=0,pp=1,to=2,Lc=3,no=!1,jc,ao;jc=!1,ao=null;function Fc(e){var t={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:L},effects:null};e.updateQueue=t}function mp(e,t){var n=t.updateQueue,a=e.updateQueue;if(n===a){var r={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects};t.updateQueue=r}}function Tr(e,t){var n={eventTime:e,lane:t,tag:vp,payload:null,callback:null,next:null};return n}function Fr(e,t,n){var a=e.updateQueue;if(a===null)return null;var r=a.shared;if(ao===r&&!jc&&(h("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."),jc=!0),PE()){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,zb(e,n)}else return Mb(e,r,t,n)}function ro(e,t,n){var a=t.updateQueue;if(a!==null){var r=a.shared;if(Nv(n)){var i=r.lanes;i=Mv(i,e.pendingLanes);var u=_e(i,n);r.lanes=u,gc(e,u)}}}function Bc(e,t){var n=e.updateQueue,a=e.alternate;if(a!==null){var r=a.updateQueue;if(n===r){var i=null,u=null,o=n.firstBaseUpdate;if(o!==null){var s=o;do{var f={eventTime:s.eventTime,lane:s.lane,tag:s.tag,payload:s.payload,callback:s.callback,next:null};u===null?i=u=f:(u.next=f,u=f),s=s.next}while(s!==null);u===null?i=u=t:(u.next=t,u=t)}else i=u=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:u,shared:r.shared,effects:r.effects},e.updateQueue=n;return}}var m=n.lastBaseUpdate;m===null?n.firstBaseUpdate=t:m.next=t,n.lastBaseUpdate=t}function Ab(e,t,n,a,r,i){switch(n.tag){case pp:{var u=n.payload;if(typeof u=="function"){sp();var o=u.call(i,a,r);{if(e.mode&Vt){un(!0);try{u.call(i,a,r)}finally{un(!1)}}cp()}return o}return u}case Lc:e.flags=e.flags&~Ct|He;case vp:{var s=n.payload,f;if(typeof s=="function"){sp(),f=s.call(i,a,r);{if(e.mode&Vt){un(!0);try{s.call(i,a,r)}finally{un(!1)}}cp()}}else f=s;return f==null?a:P({},a,f)}case to:return no=!0,a}return a}function io(e,t,n,a){var r=e.updateQueue;no=!1,ao=r.shared;var i=r.firstBaseUpdate,u=r.lastBaseUpdate,o=r.shared.pending;if(o!==null){r.shared.pending=null;var s=o,f=s.next;s.next=null,u===null?i=f:u.next=f,u=s;var m=e.alternate;if(m!==null){var S=m.updateQueue,x=S.lastBaseUpdate;x!==u&&(x===null?S.firstBaseUpdate=f:x.next=f,S.lastBaseUpdate=s)}}if(i!==null){var M=r.baseState,H=L,z=null,ee=null,pe=null,re=i;do{var Ie=re.lane,Ye=re.eventTime;if(Ni(a,Ie)){if(pe!==null){var O={eventTime:Ye,lane:nn,tag:re.tag,payload:re.payload,callback:re.callback,next:null};pe=pe.next=O}M=Ab(e,r,re,M,t,n);var E=re.callback;if(E!==null&&re.lane!==nn){e.flags|=za;var F=r.effects;F===null?r.effects=[re]:F.push(re)}}else{var T={eventTime:Ye,lane:Ie,tag:re.tag,payload:re.payload,callback:re.callback,next:null};pe===null?(ee=pe=T,z=M):pe=pe.next=T,H=_e(H,Ie)}if(re=re.next,re===null){if(o=r.shared.pending,o===null)break;var $=o,W=$.next;$.next=null,re=W,r.lastBaseUpdate=$,r.shared.pending=null}}while(!0);pe===null&&(z=M),r.baseState=z,r.firstBaseUpdate=ee,r.lastBaseUpdate=pe;var we=r.shared.interleaved;if(we!==null){var ye=we;do H=_e(H,ye.lane),ye=ye.next;while(ye!==we)}else i===null&&(r.shared.lanes=L);ol(H),e.lanes=H,e.memoizedState=M}ao=null}function Hb(e,t){if(typeof e!="function")throw new Error("Invalid argument passed as callback. Expected a function. Instead "+("received: "+e));e.call(t)}function hp(){no=!1}function uo(){return no}function yp(e,t,n){var a=t.effects;if(t.effects=null,a!==null)for(var r=0;r<a.length;r++){var i=a[r],u=i.callback;u!==null&&(i.callback=null,Hb(u,n))}}var Vc={},gp=new C.Component().refs,wc,Yc,qc,Qc,Gc,bp,lo,Pc,Kc,Wc;{wc=new Set,Yc=new Set,qc=new Set,Qc=new Set,Pc=new Set,Gc=new Set,Kc=new Set,Wc=new Set;var Sp=new Set;lo=function(e,t){if(!(e===null||typeof e=="function")){var n=t+"_"+e;Sp.has(n)||(Sp.add(n),h("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.",t,e))}},bp=function(e,t){if(t===void 0){var n=ne(e)||"Component";Gc.has(n)||(Gc.add(n),h("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.",n))}},Object.defineProperty(Vc,"_processChildContext",{enumerable:!1,value:function(){throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).")}}),Object.freeze(Vc)}function kc(e,t,n,a){var r=e.memoizedState,i=n(a,r);{if(e.mode&Vt){un(!0);try{i=n(a,r)}finally{un(!1)}}bp(t,i)}var u=i==null?r:P({},r,i);if(e.memoizedState=u,e.lanes===L){var o=e.updateQueue;o.baseState=u}}var Xc={isMounted:Ea,enqueueSetState:function(e,t,n){var a=ge(e),r=zn(),i=Gr(a),u=Tr(r,i);u.payload=t,n!=null&&(lo(n,"setState"),u.callback=n);var o=Fr(a,u,i);o!==null&&(qt(o,a,i,r),ro(o,a,i)),Sc(a,i)},enqueueReplaceState:function(e,t,n){var a=ge(e),r=zn(),i=Gr(a),u=Tr(r,i);u.tag=pp,u.payload=t,n!=null&&(lo(n,"replaceState"),u.callback=n);var o=Fr(a,u,i);o!==null&&(qt(o,a,i,r),ro(o,a,i)),Sc(a,i)},enqueueForceUpdate:function(e,t){var n=ge(e),a=zn(),r=Gr(n),i=Tr(a,r);i.tag=to,t!=null&&(lo(t,"forceUpdate"),i.callback=t);var u=Fr(n,i,r);u!==null&&(qt(u,n,r,a),ro(u,n,r)),$g(n,r)}};function Ep(e,t,n,a,r,i,u){var o=e.stateNode;if(typeof o.shouldComponentUpdate=="function"){var s=o.shouldComponentUpdate(a,i,u);{if(e.mode&Vt){un(!0);try{s=o.shouldComponentUpdate(a,i,u)}finally{un(!1)}}s===void 0&&h("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.",ne(t)||"Component")}return s}return t.prototype&&t.prototype.isPureReactComponent?!kl(n,a)||!kl(r,i):!0}function Lb(e,t,n){var a=e.stateNode;{var r=ne(t)||"Component",i=a.render;i||(t.prototype&&typeof t.prototype.render=="function"?h("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?",r):h("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.",r)),a.getInitialState&&!a.getInitialState.isReactClassApproved&&!a.state&&h("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?",r),a.getDefaultProps&&!a.getDefaultProps.isReactClassApproved&&h("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.",r),a.propTypes&&h("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.",r),a.contextType&&h("contextType was defined as an instance property on %s. Use a static property to define contextType instead.",r),a.contextTypes&&h("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.",r),t.contextType&&t.contextTypes&&!Kc.has(t)&&(Kc.add(t),h("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.",r)),typeof a.componentShouldUpdate=="function"&&h("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",r),t.prototype&&t.prototype.isPureReactComponent&&typeof a.shouldComponentUpdate!="undefined"&&h("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.",ne(t)||"A pure component"),typeof a.componentDidUnmount=="function"&&h("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?",r),typeof a.componentDidReceiveProps=="function"&&h("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().",r),typeof a.componentWillRecieveProps=="function"&&h("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",r),typeof a.UNSAFE_componentWillRecieveProps=="function"&&h("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?",r);var u=a.props!==n;a.props!==void 0&&u&&h("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.",r,r),a.defaultProps&&h("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.",r,r),typeof a.getSnapshotBeforeUpdate=="function"&&typeof a.componentDidUpdate!="function"&&!qc.has(t)&&(qc.add(t),h("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.",ne(t))),typeof a.getDerivedStateFromProps=="function"&&h("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.",r),typeof a.getDerivedStateFromError=="function"&&h("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.",r),typeof t.getSnapshotBeforeUpdate=="function"&&h("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.",r);var o=a.state;o&&(typeof o!="object"||ht(o))&&h("%s.state: must be set to an object or null",r),typeof a.getChildContext=="function"&&typeof t.childContextTypes!="object"&&h("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().",r)}}function Tp(e,t){t.updater=Xc,e.stateNode=t,at(t,e),t._reactInternalInstance=Vc}function Rp(e,t,n){var a=!1,r=fa,i=fa,u=t.contextType;if("contextType"in t){var o=u===null||u!==void 0&&u.$$typeof===_n&&u._context===void 0;if(!o&&!Wc.has(t)){Wc.add(t);var s="";u===void 0?s=" However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file.":typeof u!="object"?s=" However, it is set to a "+typeof u+".":u.$$typeof===cn?s=" Did you accidentally pass the Context.Provider instead?":u._context!==void 0?s=" Did you accidentally pass the Context.Consumer instead?":s=" However, it is set to an object with keys {"+Object.keys(u).join(", ")+"}.",h("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s",ne(t)||"Component",s)}}if(typeof u=="object"&&u!==null)i=wt(u);else{r=Ri(e,t,!0);var f=t.contextTypes;a=f!=null,i=a?Ci(e,r):fa}var m=new t(n,i);if(e.mode&Vt){un(!0);try{m=new t(n,i)}finally{un(!1)}}var S=e.memoizedState=m.state!==null&&m.state!==void 0?m.state:null;Tp(e,m);{if(typeof t.getDerivedStateFromProps=="function"&&S===null){var x=ne(t)||"Component";Yc.has(x)||(Yc.add(x),h("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.",x,m.state===null?"null":"undefined",x))}if(typeof t.getDerivedStateFromProps=="function"||typeof m.getSnapshotBeforeUpdate=="function"){var M=null,H=null,z=null;if(typeof m.componentWillMount=="function"&&m.componentWillMount.__suppressDeprecationWarning!==!0?M="componentWillMount":typeof m.UNSAFE_componentWillMount=="function"&&(M="UNSAFE_componentWillMount"),typeof m.componentWillReceiveProps=="function"&&m.componentWillReceiveProps.__suppressDeprecationWarning!==!0?H="componentWillReceiveProps":typeof m.UNSAFE_componentWillReceiveProps=="function"&&(H="UNSAFE_componentWillReceiveProps"),typeof m.componentWillUpdate=="function"&&m.componentWillUpdate.__suppressDeprecationWarning!==!0?z="componentWillUpdate":typeof m.UNSAFE_componentWillUpdate=="function"&&(z="UNSAFE_componentWillUpdate"),M!==null||H!==null||z!==null){var ee=ne(t)||"Component",pe=typeof t.getDerivedStateFromProps=="function"?"getDerivedStateFromProps()":"getSnapshotBeforeUpdate()";Qc.has(ee)||(Qc.add(ee),h(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`,ee,pe,M!==null?`
  `+M:"",H!==null?`
  `+H:"",z!==null?`
  `+z:""))}}}return a&&Sv(e,r,i),m}function jb(e,t){var n=t.state;typeof t.componentWillMount=="function"&&t.componentWillMount(),typeof t.UNSAFE_componentWillMount=="function"&&t.UNSAFE_componentWillMount(),n!==t.state&&(h("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",J(e)||"Component"),Xc.enqueueReplaceState(t,t.state,null))}function Cp(e,t,n,a){var r=t.state;if(typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,a),t.state!==r){{var i=J(e)||"Component";wc.has(i)||(wc.add(i),h("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",i))}Xc.enqueueReplaceState(t,t.state,null)}}function Jc(e,t,n,a){Lb(e,t,n);var r=e.stateNode;r.props=n,r.state=e.memoizedState,r.refs=gp,Fc(e);var i=t.contextType;if(typeof i=="object"&&i!==null)r.context=wt(i);else{var u=Ri(e,t,!0);r.context=Ci(e,u)}{if(r.state===n){var o=ne(t)||"Component";Pc.has(o)||(Pc.add(o),h("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.",o))}e.mode&Vt&&Fa.recordLegacyContextWarning(e,r),Fa.recordUnsafeLifecycleWarnings(e,r)}r.state=e.memoizedState;var s=t.getDerivedStateFromProps;if(typeof s=="function"&&(kc(e,t,s,n),r.state=e.memoizedState),typeof t.getDerivedStateFromProps!="function"&&typeof r.getSnapshotBeforeUpdate!="function"&&(typeof r.UNSAFE_componentWillMount=="function"||typeof r.componentWillMount=="function")&&(jb(e,r),io(e,n,r,a),r.state=e.memoizedState),typeof r.componentDidMount=="function"){var f=oe;f|=Z,(e.mode&Xa)!==ve&&(f|=Ee),e.flags|=f}}function Fb(e,t,n,a){var r=e.stateNode,i=e.memoizedProps;r.props=i;var u=r.context,o=t.contextType,s=fa;if(typeof o=="object"&&o!==null)s=wt(o);else{var f=Ri(e,t,!0);s=Ci(e,f)}var m=t.getDerivedStateFromProps,S=typeof m=="function"||typeof r.getSnapshotBeforeUpdate=="function";!S&&(typeof r.UNSAFE_componentWillReceiveProps=="function"||typeof r.componentWillReceiveProps=="function")&&(i!==n||u!==s)&&Cp(e,r,n,s),hp();var x=e.memoizedState,M=r.state=x;if(io(e,n,r,a),M=e.memoizedState,i===n&&x===M&&!Hl()&&!uo()){if(typeof r.componentDidMount=="function"){var H=oe;H|=Z,(e.mode&Xa)!==ve&&(H|=Ee),e.flags|=H}return!1}typeof m=="function"&&(kc(e,t,m,n),M=e.memoizedState);var z=uo()||Ep(e,t,i,n,x,M,s);if(z){if(!S&&(typeof r.UNSAFE_componentWillMount=="function"||typeof r.componentWillMount=="function")&&(typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount()),typeof r.componentDidMount=="function"){var ee=oe;ee|=Z,(e.mode&Xa)!==ve&&(ee|=Ee),e.flags|=ee}}else{if(typeof r.componentDidMount=="function"){var pe=oe;pe|=Z,(e.mode&Xa)!==ve&&(pe|=Ee),e.flags|=pe}e.memoizedProps=n,e.memoizedState=M}return r.props=n,r.state=M,r.context=s,z}function Bb(e,t,n,a,r){var i=t.stateNode;mp(e,t);var u=t.memoizedProps,o=t.type===t.elementType?u:Ba(t.type,u);i.props=o;var s=t.pendingProps,f=i.context,m=n.contextType,S=fa;if(typeof m=="object"&&m!==null)S=wt(m);else{var x=Ri(t,n,!0);S=Ci(t,x)}var M=n.getDerivedStateFromProps,H=typeof M=="function"||typeof i.getSnapshotBeforeUpdate=="function";!H&&(typeof i.UNSAFE_componentWillReceiveProps=="function"||typeof i.componentWillReceiveProps=="function")&&(u!==s||f!==S)&&Cp(t,i,a,S),hp();var z=t.memoizedState,ee=i.state=z;if(io(t,a,i,r),ee=t.memoizedState,u===s&&z===ee&&!Hl()&&!uo()&&!Qe)return typeof i.componentDidUpdate=="function"&&(u!==e.memoizedProps||z!==e.memoizedState)&&(t.flags|=oe),typeof i.getSnapshotBeforeUpdate=="function"&&(u!==e.memoizedProps||z!==e.memoizedState)&&(t.flags|=Qt),!1;typeof M=="function"&&(kc(t,n,M,a),ee=t.memoizedState);var pe=uo()||Ep(t,n,o,a,z,ee,S)||Qe;return pe?(!H&&(typeof i.UNSAFE_componentWillUpdate=="function"||typeof i.componentWillUpdate=="function")&&(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,ee,S),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,ee,S)),typeof i.componentDidUpdate=="function"&&(t.flags|=oe),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=Qt)):(typeof i.componentDidUpdate=="function"&&(u!==e.memoizedProps||z!==e.memoizedState)&&(t.flags|=oe),typeof i.getSnapshotBeforeUpdate=="function"&&(u!==e.memoizedProps||z!==e.memoizedState)&&(t.flags|=Qt),t.memoizedProps=a,t.memoizedState=ee),i.props=a,i.state=ee,i.context=S,pe}var Zc,Ic,$c,ef,tf,xp=function(e,t){};Zc=!1,Ic=!1,$c={},ef={},tf={},xp=function(e,t){if(!(e===null||typeof e!="object")&&!(!e._store||e._store.validated||e.key!=null)){if(typeof e._store!="object")throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");e._store.validated=!0;var n=J(t)||"Component";ef[n]||(ef[n]=!0,h('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'))}};function Hu(e,t,n){var a=n.ref;if(a!==null&&typeof a!="function"&&typeof a!="object"){if((e.mode&Vt||Oe)&&!(n._owner&&n._self&&n._owner.stateNode!==n._self)){var r=J(e)||"Component";$c[r]||(h('A string ref, "%s", has been found within a strict mode tree. String refs are a source of potential bugs and should be avoided. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',a),$c[r]=!0)}if(n._owner){var i=n._owner,u;if(i){var o=i;if(o.tag!==be)throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");u=o.stateNode}if(!u)throw new Error("Missing owner for string ref "+a+". This error is likely caused by a bug in React. Please file an issue.");var s=u;Db(a,"ref");var f=""+a;if(t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===f)return t.ref;var m=function(S){var x=s.refs;x===gp&&(x=s.refs={}),S===null?delete x[f]:x[f]=S};return m._stringRef=f,m}else{if(typeof a!="string")throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");if(!n._owner)throw new Error("Element ref was specified as a string ("+a+`) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`)}}return a}function oo(e,t){var n=Object.prototype.toString.call(t);throw new Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.")}function so(e){{var t=J(e)||"Component";if(tf[t])return;tf[t]=!0,h("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.")}}function Dp(e){var t=e._payload,n=e._init;return n(t)}function _p(e){function t(T,O){if(e){var E=T.deletions;E===null?(T.deletions=[O],T.flags|=Ft):E.push(O)}}function n(T,O){if(!e)return null;for(var E=O;E!==null;)t(T,E),E=E.sibling;return null}function a(T,O){for(var E=new Map,F=O;F!==null;)F.key!==null?E.set(F.key,F):E.set(F.index,F),F=F.sibling;return E}function r(T,O){var E=yi(T,O);return E.index=0,E.sibling=null,E}function i(T,O,E){if(T.index=E,!e)return T.flags|=U,O;var F=T.alternate;if(F!==null){var $=F.index;return $<O?(T.flags|=Ge,O):$}else return T.flags|=Ge,O}function u(T){return e&&T.alternate===null&&(T.flags|=Ge),T}function o(T,O,E,F){if(O===null||O.tag!==Se){var $=Ad(E,T.mode,F);return $.return=T,$}else{var W=r(O,E);return W.return=T,W}}function s(T,O,E,F){var $=E.type;if($===Fn)return m(T,O,E.props.children,F,E.key);if(O!==null&&(O.elementType===$||gh(O,E)||typeof $=="object"&&$!==null&&$.$$typeof===it&&Dp($)===O.type)){var W=r(O,E.props);return W.ref=Hu(T,O,E),W.return=T,W._debugSource=E._source,W._debugOwner=E._owner,W}var we=zd(E,T.mode,F);return we.ref=Hu(T,O,E),we.return=T,we}function f(T,O,E,F){if(O===null||O.tag!==Me||O.stateNode.containerInfo!==E.containerInfo||O.stateNode.implementation!==E.implementation){var $=Hd(E,T.mode,F);return $.return=T,$}else{var W=r(O,E.children||[]);return W.return=T,W}}function m(T,O,E,F,$){if(O===null||O.tag!==De){var W=Kr(E,T.mode,F,$);return W.return=T,W}else{var we=r(O,E);return we.return=T,we}}function S(T,O,E){if(typeof O=="string"&&O!==""||typeof O=="number"){var F=Ad(""+O,T.mode,E);return F.return=T,F}if(typeof O=="object"&&O!==null){switch(O.$$typeof){case on:{var $=zd(O,T.mode,E);return $.ref=Hu(T,null,O),$.return=T,$}case sn:{var W=Hd(O,T.mode,E);return W.return=T,W}case it:{var we=O._payload,ye=O._init;return S(T,ye(we),E)}}if(ht(O)||q(O)){var ke=Kr(O,T.mode,E,null);return ke.return=T,ke}oo(T,O)}return typeof O=="function"&&so(T),null}function x(T,O,E,F){var $=O!==null?O.key:null;if(typeof E=="string"&&E!==""||typeof E=="number")return $!==null?null:o(T,O,""+E,F);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case on:return E.key===$?s(T,O,E,F):null;case sn:return E.key===$?f(T,O,E,F):null;case it:{var W=E._payload,we=E._init;return x(T,O,we(W),F)}}if(ht(E)||q(E))return $!==null?null:m(T,O,E,F,null);oo(T,E)}return typeof E=="function"&&so(T),null}function M(T,O,E,F,$){if(typeof F=="string"&&F!==""||typeof F=="number"){var W=T.get(E)||null;return o(O,W,""+F,$)}if(typeof F=="object"&&F!==null){switch(F.$$typeof){case on:{var we=T.get(F.key===null?E:F.key)||null;return s(O,we,F,$)}case sn:{var ye=T.get(F.key===null?E:F.key)||null;return f(O,ye,F,$)}case it:var ke=F._payload,Le=F._init;return M(T,O,E,Le(ke),$)}if(ht(F)||q(F)){var dt=T.get(E)||null;return m(O,dt,F,$,null)}oo(O,F)}return typeof F=="function"&&so(O),null}function H(T,O,E){{if(typeof T!="object"||T===null)return O;switch(T.$$typeof){case on:case sn:xp(T,E);var F=T.key;if(typeof F!="string")break;if(O===null){O=new Set,O.add(F);break}if(!O.has(F)){O.add(F);break}h("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted \u2014 the behavior is unsupported and could change in a future version.",F);break;case it:var $=T._payload,W=T._init;H(W($),O,E);break}}return O}function z(T,O,E,F){for(var $=null,W=0;W<E.length;W++){var we=E[W];$=H(we,$,T)}for(var ye=null,ke=null,Le=O,dt=0,ue=0,Nt=null;Le!==null&&ue<E.length;ue++){Le.index>ue?(Nt=Le,Le=null):Nt=Le.sibling;var An=x(T,Le,E[ue],F);if(An===null){Le===null&&(Le=Nt);break}e&&Le&&An.alternate===null&&t(T,Le),dt=i(An,dt,ue),ke===null?ye=An:ke.sibling=An,ke=An,Le=Nt}if(ue===E.length){if(n(T,Le),yn()){var Rn=ue;ii(T,Rn)}return ye}if(Le===null){for(;ue<E.length;ue++){var ya=S(T,E[ue],F);ya!==null&&(dt=i(ya,dt,ue),ke===null?ye=ya:ke.sibling=ya,ke=ya)}if(yn()){var Kn=ue;ii(T,Kn)}return ye}for(var Wn=a(T,Le);ue<E.length;ue++){var Hn=M(Wn,T,ue,E[ue],F);Hn!==null&&(e&&Hn.alternate!==null&&Wn.delete(Hn.key===null?ue:Hn.key),dt=i(Hn,dt,ue),ke===null?ye=Hn:ke.sibling=Hn,ke=Hn)}if(e&&Wn.forEach(function($i){return t(T,$i)}),yn()){var Dr=ue;ii(T,Dr)}return ye}function ee(T,O,E,F){var $=q(E);if(typeof $!="function")throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");{typeof Symbol=="function"&&E[Symbol.toStringTag]==="Generator"&&(Ic||h("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."),Ic=!0),E.entries===$&&(Zc||h("Using Maps as children is not supported. Use an array of keyed ReactElements instead."),Zc=!0);var W=$.call(E);if(W)for(var we=null,ye=W.next();!ye.done;ye=W.next()){var ke=ye.value;we=H(ke,we,T)}}var Le=$.call(E);if(Le==null)throw new Error("An iterable object provided no iterator.");for(var dt=null,ue=null,Nt=O,An=0,Rn=0,ya=null,Kn=Le.next();Nt!==null&&!Kn.done;Rn++,Kn=Le.next()){Nt.index>Rn?(ya=Nt,Nt=null):ya=Nt.sibling;var Wn=x(T,Nt,Kn.value,F);if(Wn===null){Nt===null&&(Nt=ya);break}e&&Nt&&Wn.alternate===null&&t(T,Nt),An=i(Wn,An,Rn),ue===null?dt=Wn:ue.sibling=Wn,ue=Wn,Nt=ya}if(Kn.done){if(n(T,Nt),yn()){var Hn=Rn;ii(T,Hn)}return dt}if(Nt===null){for(;!Kn.done;Rn++,Kn=Le.next()){var Dr=S(T,Kn.value,F);Dr!==null&&(An=i(Dr,An,Rn),ue===null?dt=Dr:ue.sibling=Dr,ue=Dr)}if(yn()){var $i=Rn;ii(T,$i)}return dt}for(var fl=a(T,Nt);!Kn.done;Rn++,Kn=Le.next()){var fr=M(fl,T,Rn,Kn.value,F);fr!==null&&(e&&fr.alternate!==null&&fl.delete(fr.key===null?Rn:fr.key),An=i(fr,An,Rn),ue===null?dt=fr:ue.sibling=fr,ue=fr)}if(e&&fl.forEach(function(aR){return t(T,aR)}),yn()){var nR=Rn;ii(T,nR)}return dt}function pe(T,O,E,F){if(O!==null&&O.tag===Se){n(T,O.sibling);var $=r(O,E);return $.return=T,$}n(T,O);var W=Ad(E,T.mode,F);return W.return=T,W}function re(T,O,E,F){for(var $=E.key,W=O;W!==null;){if(W.key===$){var we=E.type;if(we===Fn){if(W.tag===De){n(T,W.sibling);var ye=r(W,E.props.children);return ye.return=T,ye._debugSource=E._source,ye._debugOwner=E._owner,ye}}else if(W.elementType===we||gh(W,E)||typeof we=="object"&&we!==null&&we.$$typeof===it&&Dp(we)===W.type){n(T,W.sibling);var ke=r(W,E.props);return ke.ref=Hu(T,W,E),ke.return=T,ke._debugSource=E._source,ke._debugOwner=E._owner,ke}n(T,W);break}else t(T,W);W=W.sibling}if(E.type===Fn){var Le=Kr(E.props.children,T.mode,F,E.key);return Le.return=T,Le}else{var dt=zd(E,T.mode,F);return dt.ref=Hu(T,O,E),dt.return=T,dt}}function Ie(T,O,E,F){for(var $=E.key,W=O;W!==null;){if(W.key===$)if(W.tag===Me&&W.stateNode.containerInfo===E.containerInfo&&W.stateNode.implementation===E.implementation){n(T,W.sibling);var we=r(W,E.children||[]);return we.return=T,we}else{n(T,W);break}else t(T,W);W=W.sibling}var ye=Hd(E,T.mode,F);return ye.return=T,ye}function Ye(T,O,E,F){var $=typeof E=="object"&&E!==null&&E.type===Fn&&E.key===null;if($&&(E=E.props.children),typeof E=="object"&&E!==null){switch(E.$$typeof){case on:return u(re(T,O,E,F));case sn:return u(Ie(T,O,E,F));case it:var W=E._payload,we=E._init;return Ye(T,O,we(W),F)}if(ht(E))return z(T,O,E,F);if(q(E))return ee(T,O,E,F);oo(T,E)}return typeof E=="string"&&E!==""||typeof E=="number"?u(pe(T,O,""+E,F)):(typeof E=="function"&&so(T),n(T,O))}return Ye}var Fi=_p(!0),Op=_p(!1);function Vb(e,t){if(e!==null&&t.child!==e.child)throw new Error("Resuming work not yet implemented.");if(t.child!==null){var n=t.child,a=yi(n,n.pendingProps);for(t.child=a,a.return=t;n.sibling!==null;)n=n.sibling,a=a.sibling=yi(n,n.pendingProps),a.return=t;a.sibling=null}}function wb(e,t){for(var n=e.child;n!==null;)zT(n,t),n=n.sibling}var Lu={},Br=Hr(Lu),ju=Hr(Lu),co=Hr(Lu);function fo(e){if(e===Lu)throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");return e}function nf(){var e=fo(co.current);return e}function af(e,t){pn(co,t,e),pn(ju,e,e),pn(Br,Lu,e);var n=ca(t);Un(Br,e),pn(Br,n,e)}function Bi(e){Un(Br,e),Un(ju,e),Un(co,e)}function Fu(){var e=fo(Br.current);return e}function Np(e){var t=fo(co.current),n=fo(Br.current),a=Ta(n,e.type,t);n!==a&&(pn(ju,e,e),pn(Br,a,e))}function rf(e){ju.current===e&&(Un(Br,e),Un(ju,e))}var Yb=0,Up=1,Mp=1,Bu=2,Va=Hr(Yb);function uf(e,t){return(e&t)!==0}function Vi(e){return e&Up}function lf(e,t){return e&Up|t}function qb(e,t){return e|t}function Vr(e,t){pn(Va,t,e)}function wi(e){Un(Va,e)}function Qb(e,t){var n=e.memoizedState;if(n!==null)return n.dehydrated!==null;var a=e.memoizedProps;return!0}function vo(e){for(var t=e;t!==null;){if(t.tag===je){var n=t.memoizedState;if(n!==null){var a=n.dehydrated;if(a===null||Bt(a)||zr(a))return t}}else if(t.tag===bt&&t.memoizedProps.revealOrder!==void 0){var r=(t.flags&He)!==k;if(r)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)return null;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ta=0,Kt=1,tr=2,Wt=4,gn=8,of=[];function sf(){for(var e=0;e<of.length;e++){var t=of[e];Zr?t._workInProgressVersionPrimary=null:t._workInProgressVersionSecondary=null}of.length=0}function Gb(e,t){var n=t._getVersion,a=n(t._source);e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[t,a]:e.mutableSourceEagerHydrationData.push(t,a)}var K=A.ReactCurrentDispatcher,Vu=A.ReactCurrentBatchConfig,cf,Yi;cf=new Set;var ci=L,nt=null,kt=null,Xt=null,po=!1,wu=!1,Yu=0,Pb=0,Kb=25,N=null,Da=null,wr=-1,ff=!1;function Ze(){{var e=N;Da===null?Da=[e]:Da.push(e)}}function Q(){{var e=N;Da!==null&&(wr++,Da[wr]!==e&&Wb(e))}}function qi(e){e!=null&&!ht(e)&&h("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.",N,typeof e)}function Wb(e){{var t=J(nt);if(!cf.has(t)&&(cf.add(t),Da!==null)){for(var n="",a=30,r=0;r<=wr;r++){for(var i=Da[r],u=r===wr?e:i,o=r+1+". "+i;o.length<a;)o+=" ";o+=u+`
`,n+=o}h(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`,t,n)}}}function Mn(){throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`)}function df(e,t){if(ff)return!1;if(t===null)return h("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.",N),!1;e.length!==t.length&&h(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`,N,"["+t.join(", ")+"]","["+e.join(", ")+"]");for(var n=0;n<t.length&&n<e.length;n++)if(!pa(e[n],t[n]))return!1;return!0}function Qi(e,t,n,a,r,i){ci=i,nt=t,Da=e!==null?e._debugHookTypes:null,wr=-1,ff=e!==null&&e.type!==t.type,t.memoizedState=null,t.updateQueue=null,t.lanes=L,e!==null&&e.memoizedState!==null?K.current=$p:Da!==null?K.current=Ip:K.current=Zp;var u=n(a,r);if(wu){var o=0;do{if(wu=!1,Yu=0,o>=Kb)throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");o+=1,ff=!1,kt=null,Xt=null,t.updateQueue=null,wr=-1,K.current=em,u=n(a,r)}while(wu)}K.current=_o,t._debugHookTypes=Da;var s=kt!==null&&kt.next!==null;if(ci=L,nt=null,kt=null,Xt=null,N=null,Da=null,wr=-1,e!==null&&(e.flags&Xe)!==(t.flags&Xe)&&(e.mode&Pe)!==ve&&h("Internal React error: Expected static flag was missing. Please notify the React team."),po=!1,s)throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");return u}function Gi(){var e=Yu!==0;return Yu=0,e}function zp(e,t,n){t.updateQueue=e.updateQueue,(t.mode&Xa)!==ve?t.flags&=~(de|Ee|At|oe):t.flags&=~(At|oe),e.lanes=ql(e.lanes,n)}function Ap(){if(K.current=_o,po){for(var e=nt.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}po=!1}ci=L,nt=null,kt=null,Xt=null,Da=null,wr=-1,N=null,Kp=!1,wu=!1,Yu=0}function nr(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Xt===null?nt.memoizedState=Xt=e:Xt=Xt.next=e,Xt}function _a(){var e;if(kt===null){var t=nt.alternate;t!==null?e=t.memoizedState:e=null}else e=kt.next;var n;if(Xt===null?n=nt.memoizedState:n=Xt.next,n!==null)Xt=n,n=Xt.next,kt=e;else{if(e===null)throw new Error("Rendered more hooks than during the previous render.");kt=e;var a={memoizedState:kt.memoizedState,baseState:kt.baseState,baseQueue:kt.baseQueue,queue:kt.queue,next:null};Xt===null?nt.memoizedState=Xt=a:Xt=Xt.next=a}return Xt}function Hp(){return{lastEffect:null,stores:null}}function vf(e,t){return typeof t=="function"?t(e):t}function pf(e,t,n){var a=nr(),r;n!==void 0?r=n(t):r=t,a.memoizedState=a.baseState=r;var i={pending:null,interleaved:null,lanes:L,dispatch:null,lastRenderedReducer:e,lastRenderedState:r};a.queue=i;var u=i.dispatch=Zb.bind(null,nt,i);return[a.memoizedState,u]}function mf(e,t,n){var a=_a(),r=a.queue;if(r===null)throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");r.lastRenderedReducer=e;var i=kt,u=i.baseQueue,o=r.pending;if(o!==null){if(u!==null){var s=u.next,f=o.next;u.next=f,o.next=s}i.baseQueue!==u&&h("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."),i.baseQueue=u=o,r.pending=null}if(u!==null){var m=u.next,S=i.baseState,x=null,M=null,H=null,z=m;do{var ee=z.lane;if(Ni(ci,ee)){if(H!==null){var re={lane:nn,action:z.action,hasEagerState:z.hasEagerState,eagerState:z.eagerState,next:null};H=H.next=re}if(z.hasEagerState)S=z.eagerState;else{var Ie=z.action;S=e(S,Ie)}}else{var pe={lane:ee,action:z.action,hasEagerState:z.hasEagerState,eagerState:z.eagerState,next:null};H===null?(M=H=pe,x=S):H=H.next=pe,nt.lanes=_e(nt.lanes,ee),ol(ee)}z=z.next}while(z!==null&&z!==m);H===null?x=S:H.next=M,pa(S,a.memoizedState)||ku(),a.memoizedState=S,a.baseState=x,a.baseQueue=H,r.lastRenderedState=S}var Ye=r.interleaved;if(Ye!==null){var T=Ye;do{var O=T.lane;nt.lanes=_e(nt.lanes,O),ol(O),T=T.next}while(T!==Ye)}else u===null&&(r.lanes=L);var E=r.dispatch;return[a.memoizedState,E]}function hf(e,t,n){var a=_a(),r=a.queue;if(r===null)throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");r.lastRenderedReducer=e;var i=r.dispatch,u=r.pending,o=a.memoizedState;if(u!==null){r.pending=null;var s=u.next,f=s;do{var m=f.action;o=e(o,m),f=f.next}while(f!==s);pa(o,a.memoizedState)||ku(),a.memoizedState=o,a.baseQueue===null&&(a.baseState=o),r.lastRenderedState=o}return[o,i]}function _R(e,t,n){}function OR(e,t,n){}function yf(e,t,n){var a=nt,r=nr(),i,u=yn();if(u){if(n===void 0)throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");i=n(),Yi||i!==n()&&(h("The result of getServerSnapshot should be cached to avoid an infinite loop"),Yi=!0)}else{if(i=t(),!Yi){var o=t();pa(i,o)||(h("The result of getSnapshot should be cached to avoid an infinite loop"),Yi=!0)}var s=ts();if(s===null)throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");Yl(s,ci)||Lp(a,t,i)}r.memoizedState=i;var f={value:i,getSnapshot:t};return r.queue=f,bo(Fp.bind(null,a,f,e),[e]),a.flags|=At,qu(Kt|gn,jp.bind(null,a,f,i,t),void 0,null),i}function mo(e,t,n){var a=nt,r=_a(),i=t();if(!Yi){var u=t();pa(i,u)||(h("The result of getSnapshot should be cached to avoid an infinite loop"),Yi=!0)}var o=r.memoizedState,s=!pa(o,i);s&&(r.memoizedState=i,ku());var f=r.queue;if(Gu(Fp.bind(null,a,f,e),[e]),f.getSnapshot!==t||s||Xt!==null&&Xt.memoizedState.tag&Kt){a.flags|=At,qu(Kt|gn,jp.bind(null,a,f,i,t),void 0,null);var m=ts();if(m===null)throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");Yl(m,ci)||Lp(a,t,i)}return i}function Lp(e,t,n){e.flags|=Sa;var a={getSnapshot:t,value:n},r=nt.updateQueue;if(r===null)r=Hp(),nt.updateQueue=r,r.stores=[a];else{var i=r.stores;i===null?r.stores=[a]:i.push(a)}}function jp(e,t,n,a){t.value=n,t.getSnapshot=a,Bp(t)&&Vp(e)}function Fp(e,t,n){var a=function(){Bp(t)&&Vp(e)};return n(a)}function Bp(e){var t=e.getSnapshot,n=e.value;try{var a=t();return!pa(n,a)}catch(r){return!0}}function Vp(e){var t=Qn(e,he);t!==null&&qt(t,e,he,mt)}function ho(e){var t=nr();typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e;var n={pending:null,interleaved:null,lanes:L,dispatch:null,lastRenderedReducer:vf,lastRenderedState:e};t.queue=n;var a=n.dispatch=Ib.bind(null,nt,n);return[t.memoizedState,a]}function gf(e){return mf(vf)}function bf(e){return hf(vf)}function qu(e,t,n,a){var r={tag:e,create:t,destroy:n,deps:a,next:null},i=nt.updateQueue;if(i===null)i=Hp(),nt.updateQueue=i,i.lastEffect=r.next=r;else{var u=i.lastEffect;if(u===null)i.lastEffect=r.next=r;else{var o=u.next;u.next=r,r.next=o,i.lastEffect=r}}return r}function Sf(e){var t=nr();{var n={current:e};return t.memoizedState=n,n}}function yo(e){var t=_a();return t.memoizedState}function Qu(e,t,n,a){var r=nr(),i=a===void 0?null:a;nt.flags|=e,r.memoizedState=qu(Kt|t,n,void 0,i)}function go(e,t,n,a){var r=_a(),i=a===void 0?null:a,u=void 0;if(kt!==null){var o=kt.memoizedState;if(u=o.destroy,i!==null){var s=o.deps;if(df(i,s)){r.memoizedState=qu(t,n,u,i);return}}}nt.flags|=e,r.memoizedState=qu(Kt|t,n,u,i)}function bo(e,t){return(nt.mode&Xa)!==ve?Qu(de|At|Re,gn,e,t):Qu(At|Re,gn,e,t)}function Gu(e,t){return go(At,gn,e,t)}function Ef(e,t){return Qu(oe,tr,e,t)}function So(e,t){return go(oe,tr,e,t)}function Tf(e,t){var n=oe;return n|=Z,(nt.mode&Xa)!==ve&&(n|=Ee),Qu(n,Wt,e,t)}function Eo(e,t){return go(oe,Wt,e,t)}function wp(e,t){if(typeof t=="function"){var n=t,a=e();return n(a),function(){n(null)}}else if(t!=null){var r=t;r.hasOwnProperty("current")||h("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.","an object with keys {"+Object.keys(r).join(", ")+"}");var i=e();return r.current=i,function(){r.current=null}}}function Rf(e,t,n){typeof t!="function"&&h("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",t!==null?typeof t:"null");var a=n!=null?n.concat([e]):null,r=oe;return r|=Z,(nt.mode&Xa)!==ve&&(r|=Ee),Qu(r,Wt,wp.bind(null,t,e),a)}function To(e,t,n){typeof t!="function"&&h("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",t!==null?typeof t:"null");var a=n!=null?n.concat([e]):null;return go(oe,Wt,wp.bind(null,t,e),a)}function kb(e,t){}var Ro=kb;function Cf(e,t){var n=nr(),a=t===void 0?null:t;return n.memoizedState=[e,a],e}function Co(e,t){var n=_a(),a=t===void 0?null:t,r=n.memoizedState;if(r!==null&&a!==null){var i=r[1];if(df(a,i))return r[0]}return n.memoizedState=[e,a],e}function xf(e,t){var n=nr(),a=t===void 0?null:t,r=e();return n.memoizedState=[r,a],r}function xo(e,t){var n=_a(),a=t===void 0?null:t,r=n.memoizedState;if(r!==null&&a!==null){var i=r[1];if(df(a,i))return r[0]}var u=e();return n.memoizedState=[u,a],u}function Df(e){var t=nr();return t.memoizedState=e,e}function Yp(e){var t=_a(),n=kt,a=n.memoizedState;return Qp(t,a,e)}function qp(e){var t=_a();if(kt===null)return t.memoizedState=e,e;var n=kt.memoizedState;return Qp(t,n,e)}function Qp(e,t,n){var a=!mg(ci);if(a){if(!pa(n,t)){var r=Uv();nt.lanes=_e(nt.lanes,r),ol(r),e.baseState=!0}return t}else return e.baseState&&(e.baseState=!1,ku()),e.memoizedState=n,n}function Xb(e,t,n){var a=Ha();an(Cg(a,Tu)),e(!0);var r=Vu.transition;Vu.transition={};var i=Vu.transition;Vu.transition._updatedFibers=new Set;try{e(!1),t()}finally{if(an(a),Vu.transition=r,r===null&&i._updatedFibers){var u=i._updatedFibers.size;u>10&&j("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."),i._updatedFibers.clear()}}}function _f(){var e=ho(!1),t=e[0],n=e[1],a=Xb.bind(null,n),r=nr();return r.memoizedState=a,[t,a]}function Gp(){var e=gf(),t=e[0],n=_a(),a=n.memoizedState;return[t,a]}function Pp(){var e=bf(),t=e[0],n=_a(),a=n.memoizedState;return[t,a]}var Kp=!1;function Jb(){return Kp}function Of(){var e=nr(),t=ts(),n=t.identifierPrefix,a;if(yn()){var r=rb();a=":"+n+"R"+r;var i=Yu++;i>0&&(a+="H"+i.toString(32)),a+=":"}else{var u=Pb++;a=":"+n+"r"+u.toString(32)+":"}return e.memoizedState=a,a}function Do(){var e=_a(),t=e.memoizedState;return t}function Zb(e,t,n){typeof arguments[3]=="function"&&h("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");var a=Gr(e),r={lane:a,action:n,hasEagerState:!1,eagerState:null,next:null};if(Wp(e))kp(t,r);else{var i=dp(e,t,r,a);if(i!==null){var u=zn();qt(i,e,a,u),Xp(i,t,a)}}Jp(e,a)}function Ib(e,t,n){typeof arguments[3]=="function"&&h("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");var a=Gr(e),r={lane:a,action:n,hasEagerState:!1,eagerState:null,next:null};if(Wp(e))kp(t,r);else{var i=e.alternate;if(e.lanes===L&&(i===null||i.lanes===L)){var u=t.lastRenderedReducer;if(u!==null){var o;o=K.current,K.current=wa;try{var s=t.lastRenderedState,f=u(s,n);if(r.hasEagerState=!0,r.eagerState=f,pa(f,s)){Ub(e,t,r,a);return}}catch(x){}finally{K.current=o}}}var m=dp(e,t,r,a);if(m!==null){var S=zn();qt(m,e,a,S),Xp(m,t,a)}}Jp(e,a)}function Wp(e){var t=e.alternate;return e===nt||t!==null&&t===nt}function kp(e,t){wu=po=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Xp(e,t,n){if(Nv(n)){var a=t.lanes;a=Mv(a,e.pendingLanes);var r=_e(a,n);t.lanes=r,gc(e,r)}}function Jp(e,t,n){Sc(e,t)}var _o={readContext:wt,useCallback:Mn,useContext:Mn,useEffect:Mn,useImperativeHandle:Mn,useInsertionEffect:Mn,useLayoutEffect:Mn,useMemo:Mn,useReducer:Mn,useRef:Mn,useState:Mn,useDebugValue:Mn,useDeferredValue:Mn,useTransition:Mn,useMutableSource:Mn,useSyncExternalStore:Mn,useId:Mn,unstable_isNewReconciler:Ke},Zp=null,Ip=null,$p=null,em=null,ar=null,wa=null,Oo=null;{var Nf=function(){h("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().")},Te=function(){h("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks")};Zp={readContext:function(e){return wt(e)},useCallback:function(e,t){return N="useCallback",Ze(),qi(t),Cf(e,t)},useContext:function(e){return N="useContext",Ze(),wt(e)},useEffect:function(e,t){return N="useEffect",Ze(),qi(t),bo(e,t)},useImperativeHandle:function(e,t,n){return N="useImperativeHandle",Ze(),qi(n),Rf(e,t,n)},useInsertionEffect:function(e,t){return N="useInsertionEffect",Ze(),qi(t),Ef(e,t)},useLayoutEffect:function(e,t){return N="useLayoutEffect",Ze(),qi(t),Tf(e,t)},useMemo:function(e,t){N="useMemo",Ze(),qi(t);var n=K.current;K.current=ar;try{return xf(e,t)}finally{K.current=n}},useReducer:function(e,t,n){N="useReducer",Ze();var a=K.current;K.current=ar;try{return pf(e,t,n)}finally{K.current=a}},useRef:function(e){return N="useRef",Ze(),Sf(e)},useState:function(e){N="useState",Ze();var t=K.current;K.current=ar;try{return ho(e)}finally{K.current=t}},useDebugValue:function(e,t){return N="useDebugValue",Ze(),void 0},useDeferredValue:function(e){return N="useDeferredValue",Ze(),Df(e)},useTransition:function(){return N="useTransition",Ze(),_f()},useMutableSource:function(e,t,n){return N="useMutableSource",Ze(),void 0},useSyncExternalStore:function(e,t,n){return N="useSyncExternalStore",Ze(),yf(e,t,n)},useId:function(){return N="useId",Ze(),Of()},unstable_isNewReconciler:Ke},Ip={readContext:function(e){return wt(e)},useCallback:function(e,t){return N="useCallback",Q(),Cf(e,t)},useContext:function(e){return N="useContext",Q(),wt(e)},useEffect:function(e,t){return N="useEffect",Q(),bo(e,t)},useImperativeHandle:function(e,t,n){return N="useImperativeHandle",Q(),Rf(e,t,n)},useInsertionEffect:function(e,t){return N="useInsertionEffect",Q(),Ef(e,t)},useLayoutEffect:function(e,t){return N="useLayoutEffect",Q(),Tf(e,t)},useMemo:function(e,t){N="useMemo",Q();var n=K.current;K.current=ar;try{return xf(e,t)}finally{K.current=n}},useReducer:function(e,t,n){N="useReducer",Q();var a=K.current;K.current=ar;try{return pf(e,t,n)}finally{K.current=a}},useRef:function(e){return N="useRef",Q(),Sf(e)},useState:function(e){N="useState",Q();var t=K.current;K.current=ar;try{return ho(e)}finally{K.current=t}},useDebugValue:function(e,t){return N="useDebugValue",Q(),void 0},useDeferredValue:function(e){return N="useDeferredValue",Q(),Df(e)},useTransition:function(){return N="useTransition",Q(),_f()},useMutableSource:function(e,t,n){return N="useMutableSource",Q(),void 0},useSyncExternalStore:function(e,t,n){return N="useSyncExternalStore",Q(),yf(e,t,n)},useId:function(){return N="useId",Q(),Of()},unstable_isNewReconciler:Ke},$p={readContext:function(e){return wt(e)},useCallback:function(e,t){return N="useCallback",Q(),Co(e,t)},useContext:function(e){return N="useContext",Q(),wt(e)},useEffect:function(e,t){return N="useEffect",Q(),Gu(e,t)},useImperativeHandle:function(e,t,n){return N="useImperativeHandle",Q(),To(e,t,n)},useInsertionEffect:function(e,t){return N="useInsertionEffect",Q(),So(e,t)},useLayoutEffect:function(e,t){return N="useLayoutEffect",Q(),Eo(e,t)},useMemo:function(e,t){N="useMemo",Q();var n=K.current;K.current=wa;try{return xo(e,t)}finally{K.current=n}},useReducer:function(e,t,n){N="useReducer",Q();var a=K.current;K.current=wa;try{return mf(e,t,n)}finally{K.current=a}},useRef:function(e){return N="useRef",Q(),yo()},useState:function(e){N="useState",Q();var t=K.current;K.current=wa;try{return gf(e)}finally{K.current=t}},useDebugValue:function(e,t){return N="useDebugValue",Q(),Ro()},useDeferredValue:function(e){return N="useDeferredValue",Q(),Yp(e)},useTransition:function(){return N="useTransition",Q(),Gp()},useMutableSource:function(e,t,n){return N="useMutableSource",Q(),void 0},useSyncExternalStore:function(e,t,n){return N="useSyncExternalStore",Q(),mo(e,t)},useId:function(){return N="useId",Q(),Do()},unstable_isNewReconciler:Ke},em={readContext:function(e){return wt(e)},useCallback:function(e,t){return N="useCallback",Q(),Co(e,t)},useContext:function(e){return N="useContext",Q(),wt(e)},useEffect:function(e,t){return N="useEffect",Q(),Gu(e,t)},useImperativeHandle:function(e,t,n){return N="useImperativeHandle",Q(),To(e,t,n)},useInsertionEffect:function(e,t){return N="useInsertionEffect",Q(),So(e,t)},useLayoutEffect:function(e,t){return N="useLayoutEffect",Q(),Eo(e,t)},useMemo:function(e,t){N="useMemo",Q();var n=K.current;K.current=Oo;try{return xo(e,t)}finally{K.current=n}},useReducer:function(e,t,n){N="useReducer",Q();var a=K.current;K.current=Oo;try{return hf(e,t,n)}finally{K.current=a}},useRef:function(e){return N="useRef",Q(),yo()},useState:function(e){N="useState",Q();var t=K.current;K.current=Oo;try{return bf(e)}finally{K.current=t}},useDebugValue:function(e,t){return N="useDebugValue",Q(),Ro()},useDeferredValue:function(e){return N="useDeferredValue",Q(),qp(e)},useTransition:function(){return N="useTransition",Q(),Pp()},useMutableSource:function(e,t,n){return N="useMutableSource",Q(),void 0},useSyncExternalStore:function(e,t,n){return N="useSyncExternalStore",Q(),mo(e,t)},useId:function(){return N="useId",Q(),Do()},unstable_isNewReconciler:Ke},ar={readContext:function(e){return Nf(),wt(e)},useCallback:function(e,t){return N="useCallback",Te(),Ze(),Cf(e,t)},useContext:function(e){return N="useContext",Te(),Ze(),wt(e)},useEffect:function(e,t){return N="useEffect",Te(),Ze(),bo(e,t)},useImperativeHandle:function(e,t,n){return N="useImperativeHandle",Te(),Ze(),Rf(e,t,n)},useInsertionEffect:function(e,t){return N="useInsertionEffect",Te(),Ze(),Ef(e,t)},useLayoutEffect:function(e,t){return N="useLayoutEffect",Te(),Ze(),Tf(e,t)},useMemo:function(e,t){N="useMemo",Te(),Ze();var n=K.current;K.current=ar;try{return xf(e,t)}finally{K.current=n}},useReducer:function(e,t,n){N="useReducer",Te(),Ze();var a=K.current;K.current=ar;try{return pf(e,t,n)}finally{K.current=a}},useRef:function(e){return N="useRef",Te(),Ze(),Sf(e)},useState:function(e){N="useState",Te(),Ze();var t=K.current;K.current=ar;try{return ho(e)}finally{K.current=t}},useDebugValue:function(e,t){return N="useDebugValue",Te(),Ze(),void 0},useDeferredValue:function(e){return N="useDeferredValue",Te(),Ze(),Df(e)},useTransition:function(){return N="useTransition",Te(),Ze(),_f()},useMutableSource:function(e,t,n){return N="useMutableSource",Te(),Ze(),void 0},useSyncExternalStore:function(e,t,n){return N="useSyncExternalStore",Te(),Ze(),yf(e,t,n)},useId:function(){return N="useId",Te(),Ze(),Of()},unstable_isNewReconciler:Ke},wa={readContext:function(e){return Nf(),wt(e)},useCallback:function(e,t){return N="useCallback",Te(),Q(),Co(e,t)},useContext:function(e){return N="useContext",Te(),Q(),wt(e)},useEffect:function(e,t){return N="useEffect",Te(),Q(),Gu(e,t)},useImperativeHandle:function(e,t,n){return N="useImperativeHandle",Te(),Q(),To(e,t,n)},useInsertionEffect:function(e,t){return N="useInsertionEffect",Te(),Q(),So(e,t)},useLayoutEffect:function(e,t){return N="useLayoutEffect",Te(),Q(),Eo(e,t)},useMemo:function(e,t){N="useMemo",Te(),Q();var n=K.current;K.current=wa;try{return xo(e,t)}finally{K.current=n}},useReducer:function(e,t,n){N="useReducer",Te(),Q();var a=K.current;K.current=wa;try{return mf(e,t,n)}finally{K.current=a}},useRef:function(e){return N="useRef",Te(),Q(),yo()},useState:function(e){N="useState",Te(),Q();var t=K.current;K.current=wa;try{return gf(e)}finally{K.current=t}},useDebugValue:function(e,t){return N="useDebugValue",Te(),Q(),Ro()},useDeferredValue:function(e){return N="useDeferredValue",Te(),Q(),Yp(e)},useTransition:function(){return N="useTransition",Te(),Q(),Gp()},useMutableSource:function(e,t,n){return N="useMutableSource",Te(),Q(),void 0},useSyncExternalStore:function(e,t,n){return N="useSyncExternalStore",Te(),Q(),mo(e,t)},useId:function(){return N="useId",Te(),Q(),Do()},unstable_isNewReconciler:Ke},Oo={readContext:function(e){return Nf(),wt(e)},useCallback:function(e,t){return N="useCallback",Te(),Q(),Co(e,t)},useContext:function(e){return N="useContext",Te(),Q(),wt(e)},useEffect:function(e,t){return N="useEffect",Te(),Q(),Gu(e,t)},useImperativeHandle:function(e,t,n){return N="useImperativeHandle",Te(),Q(),To(e,t,n)},useInsertionEffect:function(e,t){return N="useInsertionEffect",Te(),Q(),So(e,t)},useLayoutEffect:function(e,t){return N="useLayoutEffect",Te(),Q(),Eo(e,t)},useMemo:function(e,t){N="useMemo",Te(),Q();var n=K.current;K.current=wa;try{return xo(e,t)}finally{K.current=n}},useReducer:function(e,t,n){N="useReducer",Te(),Q();var a=K.current;K.current=wa;try{return hf(e,t,n)}finally{K.current=a}},useRef:function(e){return N="useRef",Te(),Q(),yo()},useState:function(e){N="useState",Te(),Q();var t=K.current;K.current=wa;try{return bf(e)}finally{K.current=t}},useDebugValue:function(e,t){return N="useDebugValue",Te(),Q(),Ro()},useDeferredValue:function(e){return N="useDeferredValue",Te(),Q(),qp(e)},useTransition:function(){return N="useTransition",Te(),Q(),Pp()},useMutableSource:function(e,t,n){return N="useMutableSource",Te(),Q(),void 0},useSyncExternalStore:function(e,t,n){return N="useSyncExternalStore",Te(),Q(),mo(e,t)},useId:function(){return N="useId",Te(),Q(),Do()},unstable_isNewReconciler:Ke}}var Yr=b.unstable_now,tm=0,No=-1,Pu=-1,Uo=-1,Uf=!1,Mo=!1;function nm(){return Uf}function $b(){Mo=!0}function eS(){Uf=!1,Mo=!1}function tS(){Uf=Mo,Mo=!1}function am(){return tm}function rm(){tm=Yr()}function Mf(e){Pu=Yr(),e.actualStartTime<0&&(e.actualStartTime=Yr())}function im(e){Pu=-1}function zo(e,t){if(Pu>=0){var n=Yr()-Pu;e.actualDuration+=n,t&&(e.selfBaseDuration=n),Pu=-1}}function rr(e){if(No>=0){var t=Yr()-No;No=-1;for(var n=e.return;n!==null;){switch(n.tag){case le:var a=n.stateNode;a.effectDuration+=t;return;case Tt:var r=n.stateNode;r.effectDuration+=t;return}n=n.return}}}function zf(e){if(Uo>=0){var t=Yr()-Uo;Uo=-1;for(var n=e.return;n!==null;){switch(n.tag){case le:var a=n.stateNode;a!==null&&(a.passiveEffectDuration+=t);return;case Tt:var r=n.stateNode;r!==null&&(r.passiveEffectDuration+=t);return}n=n.return}}}function ir(){No=Yr()}function Af(){Uo=Yr()}function Hf(e){for(var t=e.child;t;)e.actualDuration+=t.actualDuration,t=t.sibling}function fi(e,t){return{value:e,source:t,stack:rp(t),digest:null}}function Lf(e,t,n){return{value:e,source:null,stack:n!=null?n:null,digest:t!=null?t:null}}function nS(e,t){return!0}function jf(e,t){try{var n=nS(e,t);if(n===!1)return;var a=t.value,r=t.source,i=t.stack,u=i!==null?i:"";if(a!=null&&a._suppressLogging){if(e.tag===be)return;console.error(a)}var o=r?J(r):null,s=o?"The above error occurred in the <"+o+"> component:":"The above error occurred in one of your React components:",f;if(e.tag===le)f=`Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;else{var m=J(e)||"Anonymous";f="React will try to recreate this component tree from scratch "+("using the error boundary you provided, "+m+".")}var S=s+`
`+u+`

`+(""+f);console.error(S)}catch(x){setTimeout(function(){throw x})}}var aS=typeof WeakMap=="function"?WeakMap:Map;function um(e,t,n){var a=Tr(mt,n);a.tag=Lc,a.payload={element:null};var r=t.value;return a.callback=function(){dT(r),jf(e,t)},a}function Ff(e,t,n){var a=Tr(mt,n);a.tag=Lc;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;a.payload=function(){return r(i)},a.callback=function(){bh(e),jf(e,t)}}var u=e.stateNode;return u!==null&&typeof u.componentDidCatch=="function"&&(a.callback=function(){bh(e),jf(e,t),typeof r!="function"&&cT(this);var s=t.value,f=t.stack;this.componentDidCatch(s,{componentStack:f!==null?f:""}),typeof r!="function"&&(va(e.lanes,he)||h("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.",J(e)||"Unknown"))}),a}function lm(e,t,n){var a=e.pingCache,r;if(a===null?(a=e.pingCache=new aS,r=new Set,a.set(t,r)):(r=a.get(t),r===void 0&&(r=new Set,a.set(t,r))),!r.has(n)){r.add(n);var i=vT.bind(null,e,t,n);La&&sl(e,n),t.then(i,i)}}function rS(e,t,n,a){var r=e.updateQueue;if(r===null){var i=new Set;i.add(n),e.updateQueue=i}else r.add(n)}function iS(e,t){var n=e.tag;if((e.mode&Pe)===ve&&(n===Ue||n===ze||n===Ae)){var a=e.alternate;a?(e.updateQueue=a.updateQueue,e.memoizedState=a.memoizedState,e.lanes=a.lanes):(e.updateQueue=null,e.memoizedState=null)}}function om(e){var t=e;do{if(t.tag===je&&Qb(t))return t;t=t.return}while(t!==null);return null}function sm(e,t,n,a,r){if((e.mode&Pe)===ve){if(e===t)e.flags|=Ct;else{if(e.flags|=He,n.flags|=d,n.flags&=~(_r|ua),n.tag===be){var i=n.alternate;if(i===null)n.tag=Lt;else{var u=Tr(mt,he);u.tag=to,Fr(n,u,he)}}n.lanes=_e(n.lanes,he)}return e}return e.flags|=Ct,e.lanes=r,e}function uS(e,t,n,a,r){if(n.flags|=ua,La&&sl(e,r),a!==null&&typeof a=="object"&&typeof a.then=="function"){var i=a;iS(n),yn()&&n.mode&Pe&&Jv();var u=om(t);if(u!==null){u.flags&=~fn,sm(u,t,n,e,r),u.mode&Pe&&lm(e,i,r),rS(u,e,i);return}else{if(!pg(r)){lm(e,i,r),Ed();return}var o=new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");a=o}}else if(yn()&&n.mode&Pe){Jv();var s=om(t);if(s!==null){(s.flags&Ct)===k&&(s.flags|=fn),sm(s,t,n,e,r),Nc(fi(a,n));return}}a=fi(a,n),nT(a);var f=t;do{switch(f.tag){case le:{var m=a;f.flags|=Ct;var S=Su(r);f.lanes=_e(f.lanes,S);var x=um(f,m,S);Bc(f,x);return}case be:var M=a,H=f.type,z=f.stateNode;if((f.flags&He)===k&&(typeof H.getDerivedStateFromError=="function"||z!==null&&typeof z.componentDidCatch=="function"&&!ch(z))){f.flags|=Ct;var ee=Su(r);f.lanes=_e(f.lanes,ee);var pe=Ff(f,M,ee);Bc(f,pe);return}break}f=f.return}while(f!==null)}function lS(){return null}var Ku=A.ReactCurrentOwner,Ya=!1,Bf,Wu,Vf,wf,Yf,di,qf,Ao;Bf={},Wu={},Vf={},wf={},Yf={},di=!1,qf={},Ao={};function Gn(e,t,n,a){e===null?t.child=Op(t,null,n,a):t.child=Fi(t,e.child,n,a)}function oS(e,t,n,a){t.child=Fi(t,e.child,null,a),t.child=Fi(t,null,n,a)}function cm(e,t,n,a,r){if(t.type!==t.elementType){var i=n.propTypes;i&&Aa(i,a,"prop",ne(n))}var u=n.render,o=t.ref,s,f;ji(t,r),xu(t);{if(Ku.current=t,er(!0),s=Qi(e,t,u,a,o,r),f=Gi(),t.mode&Vt){un(!0);try{s=Qi(e,t,u,a,o,r),f=Gi()}finally{un(!1)}}er(!1)}return Mi(),e!==null&&!Ya?(zp(e,t,r),Rr(e,t,r)):(yn()&&f&&Rc(t),t.flags|=$e,Gn(e,t,s,r),t.child)}function fm(e,t,n,a,r){if(e===null){var i=n.type;if(UT(i)&&n.compare===null&&n.defaultProps===void 0){var u=i;return u=Ii(i),t.tag=Ae,t.type=u,Pf(t,i),dm(e,t,u,a,r)}{var o=i.propTypes;o&&Aa(o,a,"prop",ne(i))}var s=Md(n.type,null,a,t,t.mode,r);return s.ref=t.ref,s.return=t,t.child=s,s}{var f=n.type,m=f.propTypes;m&&Aa(m,a,"prop",ne(f))}var S=e.child,x=Zf(e,r);if(!x){var M=S.memoizedProps,H=n.compare;if(H=H!==null?H:kl,H(M,a)&&e.ref===t.ref)return Rr(e,t,r)}t.flags|=$e;var z=yi(S,a);return z.ref=t.ref,z.return=t,t.child=z,z}function dm(e,t,n,a,r){if(t.type!==t.elementType){var i=t.elementType;if(i.$$typeof===it){var u=i,o=u._payload,s=u._init;try{i=s(o)}catch(S){i=null}var f=i&&i.propTypes;f&&Aa(f,a,"prop",ne(i))}}if(e!==null){var m=e.memoizedProps;if(kl(m,a)&&e.ref===t.ref&&t.type===e.type)if(Ya=!1,t.pendingProps=a=m,Zf(e,r))(e.flags&d)!==k&&(Ya=!0);else return t.lanes=e.lanes,Rr(e,t,r)}return Qf(e,t,n,a,r)}function vm(e,t,n){var a=t.pendingProps,r=a.children,i=e!==null?e.memoizedState:null;if(a.mode==="hidden"||We)if((t.mode&Pe)===ve){var u={baseLanes:L,cachePool:null,transitions:null};t.memoizedState=u,as(t,n)}else if(va(n,da)){var S={baseLanes:L,cachePool:null,transitions:null};t.memoizedState=S;var x=i!==null?i.baseLanes:n;as(t,x)}else{var o=null,s;if(i!==null){var f=i.baseLanes;s=_e(f,n)}else s=n;t.lanes=t.childLanes=da;var m={baseLanes:s,cachePool:o,transitions:null};return t.memoizedState=m,t.updateQueue=null,as(t,s),null}else{var M;i!==null?(M=_e(i.baseLanes,n),t.memoizedState=null):M=n,as(t,M)}return Gn(e,t,r,n),t.child}function sS(e,t,n){var a=t.pendingProps;return Gn(e,t,a,n),t.child}function cS(e,t,n){var a=t.pendingProps.children;return Gn(e,t,a,n),t.child}function fS(e,t,n){{t.flags|=oe;{var a=t.stateNode;a.effectDuration=0,a.passiveEffectDuration=0}}var r=t.pendingProps,i=r.children;return Gn(e,t,i,n),t.child}function pm(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=Vn,t.flags|=y)}function Qf(e,t,n,a,r){if(t.type!==t.elementType){var i=n.propTypes;i&&Aa(i,a,"prop",ne(n))}var u;{var o=Ri(t,n,!0);u=Ci(t,o)}var s,f;ji(t,r),xu(t);{if(Ku.current=t,er(!0),s=Qi(e,t,n,a,u,r),f=Gi(),t.mode&Vt){un(!0);try{s=Qi(e,t,n,a,u,r),f=Gi()}finally{un(!1)}}er(!1)}return Mi(),e!==null&&!Ya?(zp(e,t,r),Rr(e,t,r)):(yn()&&f&&Rc(t),t.flags|=$e,Gn(e,t,s,r),t.child)}function mm(e,t,n,a,r){{switch(Oh(t)){case!1:{var i=t.stateNode,u=t.type,o=new u(t.memoizedProps,i.context),s=o.state;i.updater.enqueueSetState(i,s,null);break}case!0:{t.flags|=He,t.flags|=Ct;var f=new Error("Simulated error coming from DevTools"),m=Su(r);t.lanes=_e(t.lanes,m);var S=Ff(t,fi(f,t),m);Bc(t,S);break}}if(t.type!==t.elementType){var x=n.propTypes;x&&Aa(x,a,"prop",ne(n))}}var M;ka(n)?(M=!0,jl(t)):M=!1,ji(t,r);var H=t.stateNode,z;H===null?(Lo(e,t),Rp(t,n,a),Jc(t,n,a,r),z=!0):e===null?z=Fb(t,n,a,r):z=Bb(e,t,n,a,r);var ee=Gf(e,t,n,z,M,r);{var pe=t.stateNode;z&&pe.props!==a&&(di||h("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.",J(t)||"a component"),di=!0)}return ee}function Gf(e,t,n,a,r,i){pm(e,t);var u=(t.flags&He)!==k;if(!a&&!u)return r&&Rv(t,n,!1),Rr(e,t,i);var o=t.stateNode;Ku.current=t;var s;if(u&&typeof n.getDerivedStateFromError!="function")s=null,im();else{xu(t);{if(er(!0),s=o.render(),t.mode&Vt){un(!0);try{o.render()}finally{un(!1)}}er(!1)}Mi()}return t.flags|=$e,e!==null&&u?oS(e,t,s,i):Gn(e,t,s,i),t.memoizedState=o.state,r&&Rv(t,n,!0),t.child}function hm(e){var t=e.stateNode;t.pendingContext?Ev(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Ev(e,t.context,!1),af(e,t.containerInfo)}function dS(e,t,n){if(hm(t),e===null)throw new Error("Should have a current fiber. This is a bug in React.");var a=t.pendingProps,r=t.memoizedState,i=r.element;mp(e,t),io(t,a,null,n);var u=t.memoizedState,o=t.stateNode,s=u.element;if(Pt&&r.isDehydrated){var f={element:s,isDehydrated:!1,cache:u.cache,pendingSuspenseBoundaries:u.pendingSuspenseBoundaries,transitions:u.transitions},m=t.updateQueue;if(m.baseState=f,t.memoizedState=f,t.flags&fn){var S=fi(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."),t);return ym(e,t,s,n,S)}else if(s!==i){var x=fi(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."),t);return ym(e,t,s,n,x)}else{cb(t);var M=Op(t,null,s,n);t.child=M;for(var H=M;H;)H.flags=H.flags&~Ge|dn,H=H.sibling}}else{if(Hi(),s===i)return Rr(e,t,n);Gn(e,t,s,n)}return t.child}function ym(e,t,n,a,r){return Hi(),Nc(r),t.flags|=fn,Gn(e,t,n,a),t.child}function vS(e,t,n){Np(t),e===null&&Oc(t);var a=t.type,r=t.pendingProps,i=e!==null?e.memoizedProps:null,u=r.children,o=lu(a,r);return o?u=null:i!==null&&lu(a,i)&&(t.flags|=Zn),pm(e,t),Gn(e,t,u,n),t.child}function pS(e,t){return e===null&&Oc(t),null}function mS(e,t,n,a){Lo(e,t);var r=t.pendingProps,i=n,u=i._payload,o=i._init,s=o(u);t.type=s;var f=t.tag=MT(s),m=Ba(s,r),S;switch(f){case Ue:return Pf(t,s),t.type=s=Ii(s),S=Qf(null,t,s,m,a),S;case be:return t.type=s=xd(s),S=mm(null,t,s,m,a),S;case ze:return t.type=s=Dd(s),S=cm(null,t,s,m,a),S;case ot:{if(t.type!==t.elementType){var x=s.propTypes;x&&Aa(x,m,"prop",ne(s))}return S=fm(null,t,s,Ba(s.type,m),a),S}}var M="";throw s!==null&&typeof s=="object"&&s.$$typeof===it&&(M=" Did you wrap a component in React.lazy() more than once?"),new Error("Element type is invalid. Received a promise that resolves to: "+s+". "+("Lazy element type must resolve to a class or function."+M))}function hS(e,t,n,a,r){Lo(e,t),t.tag=be;var i;return ka(n)?(i=!0,jl(t)):i=!1,ji(t,r),Rp(t,n,a),Jc(t,n,a,r),Gf(null,t,n,!0,i,r)}function yS(e,t,n,a){Lo(e,t);var r=t.pendingProps,i;{var u=Ri(t,n,!1);i=Ci(t,u)}ji(t,a);var o,s;xu(t);{if(n.prototype&&typeof n.prototype.render=="function"){var f=ne(n)||"Unknown";Bf[f]||(h("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.",f,f),Bf[f]=!0)}t.mode&Vt&&Fa.recordLegacyContextWarning(t,null),er(!0),Ku.current=t,o=Qi(null,t,n,r,i,a),s=Gi(),er(!1)}if(Mi(),t.flags|=$e,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0){var m=ne(n)||"Unknown";Wu[m]||(h("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.",m,m,m),Wu[m]=!0)}if(typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0){{var S=ne(n)||"Unknown";Wu[S]||(h("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.",S,S,S),Wu[S]=!0)}t.tag=be,t.memoizedState=null,t.updateQueue=null;var x=!1;return ka(n)?(x=!0,jl(t)):x=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,Fc(t),Tp(t,o),Jc(t,n,r,a),Gf(null,t,n,!0,x,a)}else{if(t.tag=Ue,t.mode&Vt){un(!0);try{o=Qi(null,t,n,r,i,a),s=Gi()}finally{un(!1)}}return yn()&&s&&Rc(t),Gn(null,t,o,a),Pf(t,n),t.child}}function Pf(e,t){{if(t&&t.childContextTypes&&h("%s(...): childContextTypes cannot be defined on a function component.",t.displayName||t.name||"Component"),e.ref!==null){var n="",a=Eb();a&&(n+=`

Check the render method of \``+a+"`.");var r=a||"",i=e._debugSource;i&&(r=i.fileName+":"+i.lineNumber),Yf[r]||(Yf[r]=!0,h("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s",n))}if(typeof t.getDerivedStateFromProps=="function"){var u=ne(t)||"Unknown";wf[u]||(h("%s: Function components do not support getDerivedStateFromProps.",u),wf[u]=!0)}if(typeof t.contextType=="object"&&t.contextType!==null){var o=ne(t)||"Unknown";Vf[o]||(h("%s: Function components do not support contextType.",o),Vf[o]=!0)}}}var Kf={dehydrated:null,treeContext:null,retryLane:nn};function Wf(e){return{baseLanes:e,cachePool:lS(),transitions:null}}function gS(e,t){var n=null;return{baseLanes:_e(e.baseLanes,t),cachePool:n,transitions:e.transitions}}function bS(e,t,n,a){if(t!==null){var r=t.memoizedState;if(r===null)return!1}return uf(e,Bu)}function SS(e,t){return ql(e.childLanes,t)}function gm(e,t,n){var a=t.pendingProps;Uh(t)&&(t.flags|=He);var r=Va.current,i=!1,u=(t.flags&He)!==k;if(u||bS(r,e)?(i=!0,t.flags&=~He):(e===null||e.memoizedState!==null)&&(r=qb(r,Mp)),r=Vi(r),Vr(t,r),e===null){Oc(t);var o=t.memoizedState;if(o!==null){var s=o.dehydrated;if(s!==null)return xS(t,s)}var f=a.children,m=a.fallback;if(i){var S=ES(t,f,m,n),x=t.child;return x.memoizedState=Wf(n),t.memoizedState=Kf,S}else return kf(t,f)}else{var M=e.memoizedState;if(M!==null){var H=M.dehydrated;if(H!==null)return DS(e,t,u,a,H,M,n)}if(i){var z=a.fallback,ee=a.children,pe=RS(e,t,ee,z,n),re=t.child,Ie=e.child.memoizedState;return re.memoizedState=Ie===null?Wf(n):gS(Ie,n),re.childLanes=SS(e,n),t.memoizedState=Kf,pe}else{var Ye=a.children,T=TS(e,t,Ye,n);return t.memoizedState=null,T}}}function kf(e,t,n){var a=e.mode,r={mode:"visible",children:t},i=Xf(r,a);return i.return=e,e.child=i,i}function ES(e,t,n,a){var r=e.mode,i=e.child,u={mode:"hidden",children:t},o,s;return(r&Pe)===ve&&i!==null?(o=i,o.childLanes=L,o.pendingProps=u,e.mode&tt&&(o.actualDuration=0,o.actualStartTime=-1,o.selfBaseDuration=0,o.treeBaseDuration=0),s=Kr(n,r,a,null)):(o=Xf(u,r),s=Kr(n,r,a,null)),o.return=e,s.return=e,o.sibling=s,e.child=o,s}function Xf(e,t,n){return Eh(e,t,L,null)}function bm(e,t){return yi(e,t)}function TS(e,t,n,a){var r=e.child,i=r.sibling,u=bm(r,{mode:"visible",children:n});if((t.mode&Pe)===ve&&(u.lanes=a),u.return=t,u.sibling=null,i!==null){var o=t.deletions;o===null?(t.deletions=[i],t.flags|=Ft):o.push(i)}return t.child=u,u}function RS(e,t,n,a,r){var i=t.mode,u=e.child,o=u.sibling,s={mode:"hidden",children:n},f;if((i&Pe)===ve&&t.child!==u){var m=t.child;f=m,f.childLanes=L,f.pendingProps=s,t.mode&tt&&(f.actualDuration=0,f.actualStartTime=-1,f.selfBaseDuration=u.selfBaseDuration,f.treeBaseDuration=u.treeBaseDuration),t.deletions=null}else f=bm(u,s),f.subtreeFlags=u.subtreeFlags&Xe;var S;return o!==null?S=yi(o,a):(S=Kr(a,i,r,null),S.flags|=Ge),S.return=t,f.return=t,f.sibling=S,t.child=f,S}function Ho(e,t,n,a){a!==null&&Nc(a),Fi(t,e.child,null,n);var r=t.pendingProps,i=r.children,u=kf(t,i);return u.flags|=Ge,t.memoizedState=null,u}function CS(e,t,n,a,r){var i=t.mode,u={mode:"visible",children:n},o=Xf(u,i),s=Kr(a,i,r,null);return s.flags|=Ge,o.return=t,s.return=t,o.sibling=s,t.child=o,(t.mode&Pe)!==ve&&Fi(t,e.child,null,r),s}function xS(e,t,n){return(e.mode&Pe)===ve?(h("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."),e.lanes=he):zr(t)?e.lanes=$r:e.lanes=da,null}function DS(e,t,n,a,r,i,u){if(n)if(t.flags&fn){t.flags&=~fn;var T=Lf(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));return Ho(e,t,u,T)}else{if(t.memoizedState!==null)return t.child=e.child,t.flags|=He,null;var O=a.children,E=a.fallback,F=CS(e,t,O,E,u),$=t.child;return $.memoizedState=Wf(u),t.memoizedState=Kf,F}else{if(ob(),(t.mode&Pe)===ve)return Ho(e,t,u,null);if(zr(r)){var o,s,f;{var m=vu(r);o=m.digest,s=m.message,f=m.stack}var S;s?S=new Error(s):S=new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");var x=Lf(S,o,f);return Ho(e,t,u,x)}var M=va(u,e.childLanes);if(Ya||M){var H=ts();if(H!==null){var z=Tg(H,u);if(z!==nn&&z!==i.retryLane){i.retryLane=z;var ee=mt;Qn(e,z),qt(H,e,z,ee)}}Ed();var pe=Lf(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));return Ho(e,t,u,pe)}else if(Bt(r)){t.flags|=He,t.child=e.child;var re=pT.bind(null,e);return Ol(r,re),null}else{fb(t,r,i.treeContext);var Ie=a.children,Ye=kf(t,Ie);return Ye.flags|=dn,Ye}}}function Sm(e,t,n){e.lanes=_e(e.lanes,t);var a=e.alternate;a!==null&&(a.lanes=_e(a.lanes,t)),Ac(e.return,t,n)}function _S(e,t,n){for(var a=t;a!==null;){if(a.tag===je){var r=a.memoizedState;r!==null&&Sm(a,n,e)}else if(a.tag===bt)Sm(a,n,e);else if(a.child!==null){a.child.return=a,a=a.child;continue}if(a===e)return;for(;a.sibling===null;){if(a.return===null||a.return===e)return;a=a.return}a.sibling.return=a.return,a=a.sibling}}function OS(e){for(var t=e,n=null;t!==null;){var a=t.alternate;a!==null&&vo(a)===null&&(n=t),t=t.sibling}return n}function NS(e){if(e!==void 0&&e!=="forwards"&&e!=="backwards"&&e!=="together"&&!qf[e])if(qf[e]=!0,typeof e=="string")switch(e.toLowerCase()){case"together":case"forwards":case"backwards":{h('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.',e,e.toLowerCase());break}case"forward":case"backward":{h('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.',e,e.toLowerCase());break}default:h('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',e);break}else h('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',e)}function US(e,t){e!==void 0&&!Ao[e]&&(e!=="collapsed"&&e!=="hidden"?(Ao[e]=!0,h('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?',e)):t!=="forwards"&&t!=="backwards"&&(Ao[e]=!0,h('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?',e)))}function Em(e,t){{var n=ht(e),a=!n&&typeof q(e)=="function";if(n||a){var r=n?"array":"iterable";return h("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>",r,t,r),!1}}return!0}function MS(e,t){if((t==="forwards"||t==="backwards")&&e!==void 0&&e!==null&&e!==!1)if(ht(e)){for(var n=0;n<e.length;n++)if(!Em(e[n],n))return}else{var a=q(e);if(typeof a=="function"){var r=a.call(e);if(r)for(var i=r.next(),u=0;!i.done;i=r.next()){if(!Em(i.value,u))return;u++}}else h('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?',t)}}function Jf(e,t,n,a,r){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:r}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=a,i.tail=n,i.tailMode=r)}function Tm(e,t,n){var a=t.pendingProps,r=a.revealOrder,i=a.tail,u=a.children;NS(r),US(i,r),MS(u,r),Gn(e,t,u,n);var o=Va.current,s=uf(o,Bu);if(s)o=lf(o,Bu),t.flags|=He;else{var f=e!==null&&(e.flags&He)!==k;f&&_S(t,t.child,n),o=Vi(o)}if(Vr(t,o),(t.mode&Pe)===ve)t.memoizedState=null;else switch(r){case"forwards":{var m=OS(t.child),S;m===null?(S=t.child,t.child=null):(S=m.sibling,m.sibling=null),Jf(t,!1,S,m,i);break}case"backwards":{var x=null,M=t.child;for(t.child=null;M!==null;){var H=M.alternate;if(H!==null&&vo(H)===null){t.child=M;break}var z=M.sibling;M.sibling=x,x=M,M=z}Jf(t,!0,x,null,i);break}case"together":{Jf(t,!1,null,null,void 0);break}default:t.memoizedState=null}return t.child}function zS(e,t,n){af(t,t.stateNode.containerInfo);var a=t.pendingProps;return e===null?t.child=Fi(t,null,a,n):Gn(e,t,a,n),t.child}var Rm=!1;function AS(e,t,n){var a=t.type,r=a._context,i=t.pendingProps,u=t.memoizedProps,o=i.value;{"value"in i||Rm||(Rm=!0,h("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));var s=t.type.propTypes;s&&Aa(s,i,"prop","Context.Provider")}if(fp(t,r,o),u!==null){var f=u.value;if(pa(f,o)){if(u.children===i.children&&!Hl())return Rr(e,t,n)}else _b(t,r,n)}var m=i.children;return Gn(e,t,m,n),t.child}var Cm=!1;function HS(e,t,n){var a=t.type;a._context===void 0?a!==a.Consumer&&(Cm||(Cm=!0,h("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))):a=a._context;var r=t.pendingProps,i=r.children;typeof i!="function"&&h("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."),ji(t,n);var u=wt(a);xu(t);var o;return Ku.current=t,er(!0),o=i(u),er(!1),Mi(),t.flags|=$e,Gn(e,t,o,n),t.child}function ku(){Ya=!0}function Lo(e,t){(t.mode&Pe)===ve&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=Ge)}function Rr(e,t,n){return e!==null&&(t.dependencies=e.dependencies),im(),ol(t.lanes),va(n,t.childLanes)?(Vb(e,t),t.child):null}function LS(e,t,n){{var a=t.return;if(a===null)throw new Error("Cannot swap the root fiber.");if(e.alternate=null,t.alternate=null,n.index=t.index,n.sibling=t.sibling,n.return=t.return,n.ref=t.ref,t===a.child)a.child=n;else{var r=a.child;if(r===null)throw new Error("Expected parent to have a child.");for(;r.sibling!==t;)if(r=r.sibling,r===null)throw new Error("Expected to find the previous sibling.");r.sibling=n}var i=a.deletions;return i===null?(a.deletions=[e],a.flags|=Ft):i.push(e),n.flags|=Ge,n}}function Zf(e,t){var n=e.lanes;return!!va(n,t)}function jS(e,t,n){switch(t.tag){case le:hm(t);var a=t.stateNode;Hi();break;case te:Np(t);break;case be:{var r=t.type;ka(r)&&jl(t);break}case Me:af(t,t.stateNode.containerInfo);break;case Et:{var i=t.memoizedProps.value,u=t.type._context;fp(t,u,i);break}case Tt:{var o=va(n,t.childLanes);o&&(t.flags|=oe);{var s=t.stateNode;s.effectDuration=0,s.passiveEffectDuration=0}}break;case je:{var f=t.memoizedState;if(f!==null){if(f.dehydrated!==null)return Vr(t,Vi(Va.current)),t.flags|=He,null;var m=t.child,S=m.childLanes;if(va(n,S))return gm(e,t,n);Vr(t,Vi(Va.current));var x=Rr(e,t,n);return x!==null?x.sibling:null}else Vr(t,Vi(Va.current));break}case bt:{var M=(e.flags&He)!==k,H=va(n,t.childLanes);if(M){if(H)return Tm(e,t,n);t.flags|=He}var z=t.memoizedState;if(z!==null&&(z.rendering=null,z.tail=null,z.lastEffect=null),Vr(t,Va.current),H)break;return null}case rt:case jt:return t.lanes=L,vm(e,t,n)}return Rr(e,t,n)}function xm(e,t,n){if(t._debugNeedsRemount&&e!==null)return LS(e,t,Md(t.type,t.key,t.pendingProps,t._debugOwner||null,t.mode,t.lanes));if(e!==null){var a=e.memoizedProps,r=t.pendingProps;if(a!==r||Hl()||t.type!==e.type)Ya=!0;else{var i=Zf(e,n);if(!i&&(t.flags&He)===k)return Ya=!1,jS(e,t,n);(e.flags&d)!==k?Ya=!0:Ya=!1}}else if(Ya=!1,yn()&&nb(t)){var u=t.index,o=ab();Xv(t,o,u)}switch(t.lanes=L,t.tag){case It:return yS(e,t,t.type,n);case Rt:{var s=t.elementType;return mS(e,t,s,n)}case Ue:{var f=t.type,m=t.pendingProps,S=t.elementType===f?m:Ba(f,m);return Qf(e,t,f,S,n)}case be:{var x=t.type,M=t.pendingProps,H=t.elementType===x?M:Ba(x,M);return mm(e,t,x,H,n)}case le:return dS(e,t,n);case te:return vS(e,t,n);case Se:return pS(e,t);case je:return gm(e,t,n);case Me:return zS(e,t,n);case ze:{var z=t.type,ee=t.pendingProps,pe=t.elementType===z?ee:Ba(z,ee);return cm(e,t,z,pe,n)}case De:return sS(e,t,n);case ct:return cS(e,t,n);case Tt:return fS(e,t,n);case Et:return AS(e,t,n);case ie:return HS(e,t,n);case ot:{var re=t.type,Ie=t.pendingProps,Ye=Ba(re,Ie);if(t.type!==t.elementType){var T=re.propTypes;T&&Aa(T,Ye,"prop",ne(re))}return Ye=Ba(re.type,Ye),fm(e,t,re,Ye,n)}case Ae:return dm(e,t,t.type,t.pendingProps,n);case Lt:{var O=t.type,E=t.pendingProps,F=t.elementType===O?E:Ba(O,E);return hS(e,t,O,F,n)}case bt:return Tm(e,t,n);case $t:break;case rt:return vm(e,t,n)}throw new Error("Unknown unit of work tag ("+t.tag+"). This error is likely caused by a bug in React. Please file an issue.")}function ur(e){e.flags|=oe}function Dm(e){e.flags|=Vn,e.flags|=y}function _m(e,t){var n=e!==null&&e.child===t.child;if(n)return!0;if((t.flags&Ft)!==k)return!1;for(var a=t.child;a!==null;){if((a.flags&Je)!==k||(a.subtreeFlags&Je)!==k)return!1;a=a.sibling}return!0}var Xu,Ju,jo,Fo;if(tn)Xu=function(e,t,n,a){for(var r=t.child;r!==null;){if(r.tag===te||r.tag===Se)Nr(e,r.stateNode);else if(r.tag!==Me){if(r.child!==null){r.child.return=r,r=r.child;continue}}if(r===t)return;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}},Ju=function(e,t){},jo=function(e,t,n,a,r){var i=e.memoizedProps;if(i!==a){var u=t.stateNode,o=Fu(),s=Jr(u,n,i,a,r,o);t.updateQueue=s,s&&ur(t)}},Fo=function(e,t,n,a){n!==a&&ur(t)};else if(bi){Xu=function(e,t,n,a){for(var r=t.child;r!==null;){if(r.tag===te){var i=r.stateNode;if(n&&a){var u=r.memoizedProps,o=r.type;i=et(i,o,u,r)}Nr(e,i)}else if(r.tag===Se){var s=r.stateNode;if(n&&a){var f=r.memoizedProps;s=ft(s,f,r)}Nr(e,s)}else if(r.tag!==Me){if(r.tag===rt&&r.memoizedState!==null){var m=r.child;m!==null&&(m.return=r),Xu(e,r,!0,!0)}else if(r.child!==null){r.child.return=r,r=r.child;continue}}if(r=r,r===t)return;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};var Om=function(e,t,n,a){for(var r=t.child;r!==null;){if(r.tag===te){var i=r.stateNode;if(n&&a){var u=r.memoizedProps,o=r.type;i=et(i,o,u,r)}I(e,i)}else if(r.tag===Se){var s=r.stateNode;if(n&&a){var f=r.memoizedProps;s=ft(s,f,r)}I(e,s)}else if(r.tag!==Me){if(r.tag===rt&&r.memoizedState!==null){var m=r.child;m!==null&&(m.return=r),Om(e,r,!0,!0)}else if(r.child!==null){r.child.return=r,r=r.child;continue}}if(r=r,r===t)return;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};Ju=function(e,t){var n=t.stateNode,a=_m(e,t);if(!a){var r=n.containerInfo,i=se(r);Om(i,t,!1,!1),n.pendingChildren=i,ur(t),Ce(r,i)}},jo=function(e,t,n,a,r){var i=e.stateNode,u=e.memoizedProps,o=_m(e,t);if(o&&u===a){t.stateNode=i;return}var s=t.stateNode,f=Fu(),m=null;if(u!==a&&(m=Jr(s,n,u,a,r,f)),o&&m===null){t.stateNode=i;return}var S=w(i,m,n,u,a,t,o,s);gi(S,n,a,r,f)&&ur(t),t.stateNode=S,o?ur(t):Xu(S,t,!1,!1)},Fo=function(e,t,n,a){if(n!==a){var r=nf(),i=Fu();t.stateNode=ou(a,r,i,t),ur(t)}else t.stateNode=e.stateNode}}else Ju=function(e,t){},jo=function(e,t,n,a,r){},Fo=function(e,t,n,a){};function Zu(e,t){if(!yn())switch(e.tailMode){case"hidden":{for(var n=e.tail,a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e.tail=null:a.sibling=null;break}case"collapsed":{for(var r=e.tail,i=null;r!==null;)r.alternate!==null&&(i=r),r=r.sibling;i===null?!t&&e.tail!==null?e.tail.sibling=null:e.tail=null:i.sibling=null;break}}}function bn(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=L,a=k;if(t){if((e.mode&tt)!==ve){for(var s=e.selfBaseDuration,f=e.child;f!==null;)n=_e(n,_e(f.lanes,f.childLanes)),a|=f.subtreeFlags&Xe,a|=f.flags&Xe,s+=f.treeBaseDuration,f=f.sibling;e.treeBaseDuration=s}else for(var m=e.child;m!==null;)n=_e(n,_e(m.lanes,m.childLanes)),a|=m.subtreeFlags&Xe,a|=m.flags&Xe,m.return=e,m=m.sibling;e.subtreeFlags|=a}else{if((e.mode&tt)!==ve){for(var r=e.actualDuration,i=e.selfBaseDuration,u=e.child;u!==null;)n=_e(n,_e(u.lanes,u.childLanes)),a|=u.subtreeFlags,a|=u.flags,r+=u.actualDuration,i+=u.treeBaseDuration,u=u.sibling;e.actualDuration=r,e.treeBaseDuration=i}else for(var o=e.child;o!==null;)n=_e(n,_e(o.lanes,o.childLanes)),a|=o.subtreeFlags,a|=o.flags,o.return=e,o=o.sibling;e.subtreeFlags|=a}return e.childLanes=n,t}function FS(e,t,n){if(hb()&&(t.mode&Pe)!==ve&&(t.flags&He)===k)return np(t),Hi(),t.flags|=fn|ua|Ct,!1;var a=Wl(t);if(n!==null&&n.dehydrated!==null)if(e===null){if(!a)throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");if(pb(t),bn(t),(t.mode&tt)!==ve){var r=n!==null;if(r){var i=t.child;i!==null&&(t.treeBaseDuration-=i.treeBaseDuration)}}return!1}else{if(Hi(),(t.flags&He)===k&&(t.memoizedState=null),t.flags|=oe,bn(t),(t.mode&tt)!==ve){var u=n!==null;if(u){var o=t.child;o!==null&&(t.treeBaseDuration-=o.treeBaseDuration)}}return!1}else return ap(),!0}function Nm(e,t,n){var a=t.pendingProps;switch(Cc(t),t.tag){case It:case Rt:case Ae:case Ue:case ze:case De:case ct:case Tt:case ie:case ot:return bn(t),null;case be:{var r=t.type;return ka(r)&&Ll(t),bn(t),null}case le:{var i=t.stateNode;if(Bi(t),Ws(t),sf(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),e===null||e.child===null){var u=Wl(t);if(u)ur(t);else if(e!==null){var o=e.memoizedState;(!o.isDehydrated||(t.flags&fn)!==k)&&(t.flags|=Qt,ap())}}return Ju(e,t),bn(t),null}case te:{rf(t);var s=nf(),f=t.type;if(e!==null&&t.stateNode!=null)jo(e,t,f,a,s),e.ref!==t.ref&&Dm(t);else{if(!a){if(t.stateNode===null)throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");return bn(t),null}var m=Fu(),S=Wl(t);if(S)db(t,s,m)&&ur(t);else{var x=uu(f,a,s,m,t);Xu(x,t,!1,!1),t.stateNode=x,gi(x,f,a,s,m)&&ur(t)}t.ref!==null&&Dm(t)}return bn(t),null}case Se:{var M=a;if(e&&t.stateNode!=null){var H=e.memoizedProps;Fo(e,t,H,M)}else{if(typeof M!="string"&&t.stateNode===null)throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");var z=nf(),ee=Fu(),pe=Wl(t);pe?vb(t)&&ur(t):t.stateNode=ou(M,z,ee,t)}return bn(t),null}case je:{wi(t);var re=t.memoizedState;if(e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){var Ie=FS(e,t,re);if(!Ie)return t.flags&Ct?t:null}if((t.flags&He)!==k)return t.lanes=n,(t.mode&tt)!==ve&&Hf(t),t;var Ye=re!==null,T=e!==null&&e.memoizedState!==null;if(Ye!==T&&Ye){var O=t.child;if(O.flags|=In,(t.mode&Pe)!==ve){var E=e===null&&(t.memoizedProps.unstable_avoidThisFallback!==!0||!xe);E||uf(Va.current,Mp)?tT():Ed()}}var F=t.updateQueue;if(F!==null&&(t.flags|=oe),bn(t),(t.mode&tt)!==ve&&Ye){var $=t.child;$!==null&&(t.treeBaseDuration-=$.treeBaseDuration)}return null}case Me:return Bi(t),Ju(e,t),e===null&&Ds(t.stateNode.containerInfo),bn(t),null;case Et:var W=t.type._context;return zc(W,t),bn(t),null;case Lt:{var we=t.type;return ka(we)&&Ll(t),bn(t),null}case bt:{wi(t);var ye=t.memoizedState;if(ye===null)return bn(t),null;var ke=(t.flags&He)!==k,Le=ye.rendering;if(Le===null)if(ke)Zu(ye,!1);else{var dt=aT()&&(e===null||(e.flags&He)===k);if(!dt)for(var ue=t.child;ue!==null;){var Nt=vo(ue);if(Nt!==null){ke=!0,t.flags|=He,Zu(ye,!1);var An=Nt.updateQueue;return An!==null&&(t.updateQueue=An,t.flags|=oe),t.subtreeFlags=k,wb(t,n),Vr(t,lf(Va.current,Bu)),t.child}ue=ue.sibling}ye.tail!==null&&rn()>eh()&&(t.flags|=He,ke=!0,Zu(ye,!1),t.lanes=Dv)}else{if(!ke){var Rn=vo(Le);if(Rn!==null){t.flags|=He,ke=!0;var ya=Rn.updateQueue;if(ya!==null&&(t.updateQueue=ya,t.flags|=oe),Zu(ye,!0),ye.tail===null&&ye.tailMode==="hidden"&&!Le.alternate&&!yn())return bn(t),null}else rn()*2-ye.renderingStartTime>eh()&&n!==da&&(t.flags|=He,ke=!0,Zu(ye,!1),t.lanes=Dv)}if(ye.isBackwards)Le.sibling=t.child,t.child=Le;else{var Kn=ye.last;Kn!==null?Kn.sibling=Le:t.child=Le,ye.last=Le}}if(ye.tail!==null){var Wn=ye.tail;ye.rendering=Wn,ye.tail=Wn.sibling,ye.renderingStartTime=rn(),Wn.sibling=null;var Hn=Va.current;return ke?Hn=lf(Hn,Bu):Hn=Vi(Hn),Vr(t,Hn),Wn}return bn(t),null}case $t:break;case rt:case jt:{Sd(t);var Dr=t.memoizedState,$i=Dr!==null;if(e!==null){var fl=e.memoizedState,fr=fl!==null;fr!==$i&&!We&&(t.flags|=In)}return!$i||(t.mode&Pe)===ve?bn(t):va(sr,da)&&(bn(t),tn&&t.subtreeFlags&(Ge|oe)&&(t.flags|=In)),null}case kn:return null;case jn:return null}throw new Error("Unknown unit of work tag ("+t.tag+"). This error is likely caused by a bug in React. Please file an issue.")}function BS(e,t,n){switch(Cc(t),t.tag){case be:{var a=t.type;ka(a)&&Ll(t);var r=t.flags;return r&Ct?(t.flags=r&~Ct|He,(t.mode&tt)!==ve&&Hf(t),t):null}case le:{var i=t.stateNode;Bi(t),Ws(t),sf();var u=t.flags;return(u&Ct)!==k&&(u&He)===k?(t.flags=u&~Ct|He,t):null}case te:return rf(t),null;case je:{wi(t);var o=t.memoizedState;if(o!==null&&o.dehydrated!==null){if(t.alternate===null)throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");Hi()}var s=t.flags;return s&Ct?(t.flags=s&~Ct|He,(t.mode&tt)!==ve&&Hf(t),t):null}case bt:return wi(t),null;case Me:return Bi(t),null;case Et:var f=t.type._context;return zc(f,t),null;case rt:case jt:return Sd(t),null;case kn:return null;default:return null}}function Um(e,t,n){switch(Cc(t),t.tag){case be:{var a=t.type.childContextTypes;a!=null&&Ll(t);break}case le:{var r=t.stateNode;Bi(t),Ws(t),sf();break}case te:{rf(t);break}case Me:Bi(t);break;case je:wi(t);break;case bt:wi(t);break;case Et:var i=t.type._context;zc(i,t);break;case rt:case jt:Sd(t);break}}function Mm(e,t,n,a,r,i,u,o,s){var f=Array.prototype.slice.call(arguments,3);try{t.apply(n,f)}catch(m){this.onError(m)}}var zm=Mm;if(typeof window!="undefined"&&typeof window.dispatchEvent=="function"&&typeof document!="undefined"&&typeof document.createEvent=="function"){var If=document.createElement("react");zm=function(t,n,a,r,i,u,o,s,f){if(typeof document=="undefined"||document===null)throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");var m=document.createEvent("Event"),S=!1,x=!0,M=window.event,H=Object.getOwnPropertyDescriptor(window,"event");function z(){If.removeEventListener(O,pe,!1),typeof window.event!="undefined"&&window.hasOwnProperty("event")&&(window.event=M)}var ee=Array.prototype.slice.call(arguments,3);function pe(){S=!0,z(),n.apply(a,ee),x=!1}var re,Ie=!1,Ye=!1;function T(E){if(re=E.error,Ie=!0,re===null&&E.colno===0&&E.lineno===0&&(Ye=!0),E.defaultPrevented&&re!=null&&typeof re=="object")try{re._suppressLogging=!0}catch(F){}}var O="react-"+(t||"invokeguardedcallback");if(window.addEventListener("error",T),If.addEventListener(O,pe,!1),m.initEvent(O,!1,!1),If.dispatchEvent(m),H&&Object.defineProperty(window,"event",H),S&&x&&(Ie?Ye&&(re=new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")):re=new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`),this.onError(re)),window.removeEventListener("error",T),!S)return z(),Mm.apply(this,arguments)}}var VS=zm,Iu=!1,Bo=null,wS={onError:function(e){Iu=!0,Bo=e}};function Am(e,t,n,a,r,i,u,o,s){Iu=!1,Bo=null,VS.apply(wS,arguments)}function YS(){return Iu}function Hm(){if(Iu){var e=Bo;return Iu=!1,Bo=null,e}else throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.")}var Lm=null;Lm=new Set;var Vo=!1,Sn=!1,qS=typeof WeakSet=="function"?WeakSet:Set,X=null,Pi=null,Ki=null;function QS(e){Am(null,function(){throw e}),Hm()}var GS=function(e,t){if(t.props=e.memoizedProps,t.state=e.memoizedState,e.mode&tt)try{ir(),t.componentWillUnmount()}finally{rr(e)}else t.componentWillUnmount()};function jm(e,t){try{qr(Wt,e)}catch(n){lt(e,t,n)}}function $f(e,t,n){try{GS(e,n)}catch(a){lt(e,t,a)}}function PS(e,t,n){try{n.componentDidMount()}catch(a){lt(e,t,a)}}function Fm(e,t){try{wm(e)}catch(n){lt(e,t,n)}}function Wi(e,t){var n=e.ref;if(n!==null)if(typeof n=="function"){var a;try{if(gt&&xn&&e.mode&tt)try{ir(),a=n(null)}finally{rr(e)}else a=n(null)}catch(r){lt(e,t,r)}typeof a=="function"&&h("Unexpected return value from a callback ref in %s. A callback ref should not return a function.",J(e))}else n.current=null}function wo(e,t,n){try{n()}catch(a){lt(e,t,a)}}var Bm=null,Vm=!1;function KS(e,t){Bm=Rs(e.containerInfo),X=t,WS();var n=Vm;return Vm=!1,Bm=null,n}function WS(){for(;X!==null;){var e=X,t=e.child;(e.subtreeFlags&ce)!==k&&t!==null?(t.return=e,X=t):kS()}}function kS(){for(;X!==null;){var e=X;Ht(e);try{XS(e)}catch(n){lt(e,e.return,n)}qn();var t=e.sibling;if(t!==null){t.return=e.return,X=t;return}X=e.return}}function XS(e){var t=e.alternate,n=e.flags;if((n&Qt)!==k){switch(Ht(e),e.tag){case Ue:case ze:case Ae:break;case be:{if(t!==null){var a=t.memoizedProps,r=t.memoizedState,i=e.stateNode;e.type===e.elementType&&!di&&(i.props!==e.memoizedProps&&h("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",J(e)||"instance"),i.state!==e.memoizedState&&h("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",J(e)||"instance"));var u=i.getSnapshotBeforeUpdate(e.elementType===e.type?a:Ba(e.type,a),r);{var o=Lm;u===void 0&&!o.has(e.type)&&(o.add(e.type),h("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.",J(e)))}i.__reactInternalSnapshotBeforeUpdate=u}break}case le:{if(tn){var s=e.stateNode;D(s.containerInfo)}break}case te:case Se:case Me:case Lt:break;default:throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.")}qn()}}function qa(e,t,n){var a=t.updateQueue,r=a!==null?a.lastEffect:null;if(r!==null){var i=r.next,u=i;do{if((u.tag&e)===e){var o=u.destroy;u.destroy=void 0,o!==void 0&&((e&gn)!==ta?Yg(t):(e&Wt)!==ta&&qv(t),(e&tr)!==ta&&cl(!0),wo(t,n,o),(e&tr)!==ta&&cl(!1),(e&gn)!==ta?qg():(e&Wt)!==ta&&Qv())}u=u.next}while(u!==i)}}function qr(e,t){var n=t.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var r=a.next,i=r;do{if((i.tag&e)===e){(e&gn)!==ta?Vg(t):(e&Wt)!==ta&&Qg(t);var u=i.create;(e&tr)!==ta&&cl(!0),i.destroy=u(),(e&tr)!==ta&&cl(!1),(e&gn)!==ta?wg():(e&Wt)!==ta&&Gg();{var o=i.destroy;if(o!==void 0&&typeof o!="function"){var s=void 0;(i.tag&Wt)!==k?s="useLayoutEffect":(i.tag&tr)!==k?s="useInsertionEffect":s="useEffect";var f=void 0;o===null?f=" You returned null. If your effect does not require clean up, return undefined (or nothing).":typeof o.then=="function"?f=`

It looks like you wrote `+s+`(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

`+s+`(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching`:f=" You returned: "+o,h("%s must not return anything besides a function, which is used for clean-up.%s",s,f)}}}i=i.next}while(i!==r)}}function JS(e,t){if((t.flags&oe)!==k)switch(t.tag){case Tt:{var n=t.stateNode.passiveEffectDuration,a=t.memoizedProps,r=a.id,i=a.onPostCommit,u=am(),o=t.alternate===null?"mount":"update";nm()&&(o="nested-update"),typeof i=="function"&&i(r,o,n,u);var s=t.return;e:for(;s!==null;){switch(s.tag){case le:var f=s.stateNode;f.passiveEffectDuration+=n;break e;case Tt:var m=s.stateNode;m.passiveEffectDuration+=n;break e}s=s.return}break}}}function ZS(e,t,n,a){if((n.flags&Fe)!==k)switch(n.tag){case Ue:case ze:case Ae:{if(!Sn)if(n.mode&tt)try{ir(),qr(Wt|Kt,n)}finally{rr(n)}else qr(Wt|Kt,n);break}case be:{var r=n.stateNode;if(n.flags&oe&&!Sn)if(t===null)if(n.type===n.elementType&&!di&&(r.props!==n.memoizedProps&&h("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",J(n)||"instance"),r.state!==n.memoizedState&&h("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",J(n)||"instance")),n.mode&tt)try{ir(),r.componentDidMount()}finally{rr(n)}else r.componentDidMount();else{var i=n.elementType===n.type?t.memoizedProps:Ba(n.type,t.memoizedProps),u=t.memoizedState;if(n.type===n.elementType&&!di&&(r.props!==n.memoizedProps&&h("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",J(n)||"instance"),r.state!==n.memoizedState&&h("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",J(n)||"instance")),n.mode&tt)try{ir(),r.componentDidUpdate(i,u,r.__reactInternalSnapshotBeforeUpdate)}finally{rr(n)}else r.componentDidUpdate(i,u,r.__reactInternalSnapshotBeforeUpdate)}var o=n.updateQueue;o!==null&&(n.type===n.elementType&&!di&&(r.props!==n.memoizedProps&&h("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",J(n)||"instance"),r.state!==n.memoizedState&&h("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",J(n)||"instance")),yp(n,o,r));break}case le:{var s=n.updateQueue;if(s!==null){var f=null;if(n.child!==null)switch(n.child.tag){case te:f=Yn(n.child.stateNode);break;case be:f=n.child.stateNode;break}yp(n,s,f)}break}case te:{var m=n.stateNode;if(t===null&&n.flags&oe){var S=n.type,x=n.memoizedProps;Ei(m,S,x,n)}break}case Se:break;case Me:break;case Tt:{{var M=n.memoizedProps,H=M.onCommit,z=M.onRender,ee=n.stateNode.effectDuration,pe=am(),re=t===null?"mount":"update";nm()&&(re="nested-update"),typeof z=="function"&&z(n.memoizedProps.id,re,n.actualDuration,n.treeBaseDuration,n.actualStartTime,pe);{typeof H=="function"&&H(n.memoizedProps.id,re,ee,pe),oT(n);var Ie=n.return;e:for(;Ie!==null;){switch(Ie.tag){case le:var Ye=Ie.stateNode;Ye.effectDuration+=ee;break e;case Tt:var T=Ie.stateNode;T.effectDuration+=ee;break e}Ie=Ie.return}}}break}case je:{uE(e,n);break}case bt:case Lt:case $t:case rt:case jt:case jn:break;default:throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.")}Sn||n.flags&Vn&&wm(n)}function IS(e){switch(e.tag){case Ue:case ze:case Ae:{if(e.mode&tt)try{ir(),jm(e,e.return)}finally{rr(e)}else jm(e,e.return);break}case be:{var t=e.stateNode;typeof t.componentDidMount=="function"&&PS(e,e.return,t),Fm(e,e.return);break}case te:{Fm(e,e.return);break}}}function $S(e,t){var n=null;if(tn)for(var a=e;;){if(a.tag===te){if(n===null){n=a;try{var r=a.stateNode;t?Ls(r):v(a.stateNode,a.memoizedProps)}catch(u){lt(e,e.return,u)}}}else if(a.tag===Se){if(n===null)try{var i=a.stateNode;t?l(i):R(i,a.memoizedProps)}catch(u){lt(e,e.return,u)}}else if(!((a.tag===rt||a.tag===jt)&&a.memoizedState!==null&&a!==e)){if(a.child!==null){a.child.return=a,a=a.child;continue}}if(a===e)return;for(;a.sibling===null;){if(a.return===null||a.return===e)return;n===a&&(n=null),a=a.return}n===a&&(n=null),a.sibling.return=a.return,a=a.sibling}}function wm(e){var t=e.ref;if(t!==null){var n=e.stateNode,a;switch(e.tag){case te:a=Yn(n);break;default:a=n}if(typeof t=="function"){var r;if(e.mode&tt)try{ir(),r=t(a)}finally{rr(e)}else r=t(a);typeof r=="function"&&h("Unexpected return value from a callback ref in %s. A callback ref should not return a function.",J(e))}else t.hasOwnProperty("current")||h("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().",J(e)),t.current=a}}function eE(e){var t=e.alternate;t!==null&&(t.return=null),e.return=null}function Ym(e){var t=e.alternate;t!==null&&(e.alternate=null,Ym(t));{if(e.child=null,e.deletions=null,e.sibling=null,e.tag===te){var n=e.stateNode;n!==null&&Tl(n)}e.stateNode=null,e._debugOwner=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}}function tE(e){if(bi){var t=e.stateNode,n=t.containerInfo,a=se(n);Ve(n,a)}}function nE(e){for(var t=e.return;t!==null;){if(qm(t))return t;t=t.return}throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.")}function qm(e){return e.tag===te||e.tag===le||e.tag===Me}function Qm(e){var t=e;e:for(;;){for(;t.sibling===null;){if(t.return===null||qm(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==te&&t.tag!==Se&&t.tag!==Ln;){if(t.flags&Ge||t.child===null||t.tag===Me)continue e;t.child.return=t,t=t.child}if(!(t.flags&Ge))return t.stateNode}}function aE(e){if(tn){var t=nE(e);switch(t.tag){case te:{var n=t.stateNode;t.flags&Zn&&(_l(n),t.flags&=~Zn);var a=Qm(e);td(e,a,n);break}case le:case Me:{var r=t.stateNode.containerInfo,i=Qm(e);ed(e,i,r);break}default:throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.")}}}function ed(e,t,n){var a=e.tag,r=a===te||a===Se;if(r){var i=e.stateNode;t?du(n,i,t):Dl(n,i)}else if(a!==Me){var u=e.child;if(u!==null){ed(u,t,n);for(var o=u.sibling;o!==null;)ed(o,t,n),o=o.sibling}}}function td(e,t,n){var a=e.tag,r=a===te||a===Se;if(r){var i=e.stateNode;t?fu(n,i,t):Mr(n,i)}else if(a!==Me){var u=e.child;if(u!==null){td(u,t,n);for(var o=u.sibling;o!==null;)td(o,t,n),o=o.sibling}}}var En=null,Qa=!1;function rE(e,t,n){if(tn){var a=t;e:for(;a!==null;){switch(a.tag){case te:{En=a.stateNode,Qa=!1;break e}case le:{En=a.stateNode.containerInfo,Qa=!0;break e}case Me:{En=a.stateNode.containerInfo,Qa=!0;break e}}a=a.return}if(En===null)throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");nd(e,t,n),En=null,Qa=!1}else nd(e,t,n);eE(n)}function lr(e,t,n){for(var a=n.child;a!==null;)nd(e,t,a),a=a.sibling}function nd(e,t,n){switch(Lg(n),n.tag){case te:Sn||Wi(n,t);case Se:{if(tn){var a=En,r=Qa;En=null,lr(e,t,n),En=a,Qa=r,En!==null&&(Qa?Hs(En,n.stateNode):As(En,n.stateNode))}else lr(e,t,n);return}case Ln:{tn&&En!==null&&(Qa?Fy(En,n.stateNode):jy(En,n.stateNode));return}case Me:{if(tn){var i=En,u=Qa;En=n.stateNode.containerInfo,Qa=!0,lr(e,t,n),En=i,Qa=u}else tE(n),lr(e,t,n);return}case Ue:case ze:case ot:case Ae:{if(!Sn){var o=n.updateQueue;if(o!==null){var s=o.lastEffect;if(s!==null){var f=s.next,m=f;do{var S=m,x=S.destroy,M=S.tag;x!==void 0&&((M&tr)!==ta?wo(n,t,x):(M&Wt)!==ta&&(qv(n),n.mode&tt?(ir(),wo(n,t,x),rr(n)):wo(n,t,x),Qv())),m=m.next}while(m!==f)}}}lr(e,t,n);return}case be:{if(!Sn){Wi(n,t);var H=n.stateNode;typeof H.componentWillUnmount=="function"&&$f(n,t,H)}lr(e,t,n);return}case $t:{lr(e,t,n);return}case rt:{if(n.mode&Pe){var z=Sn;Sn=z||n.memoizedState!==null,lr(e,t,n),Sn=z}else lr(e,t,n);break}default:{lr(e,t,n);return}}}function iE(e){var t=e.memoizedState}function uE(e,t){if(Pt){var n=t.memoizedState;if(n===null){var a=t.alternate;if(a!==null){var r=a.memoizedState;if(r!==null){var i=r.dehydrated;i!==null&&Ly(i)}}}}}function Gm(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new qS),t.forEach(function(a){var r=mT.bind(null,e,a);if(!n.has(a)){if(n.add(a),La)if(Pi!==null&&Ki!==null)sl(Ki,Pi);else throw Error("Expected finished root and lanes to be set. This is a bug in React.");a.then(r,r)}})}}function lE(e,t,n){Pi=n,Ki=e,Ht(t),Pm(t,e),Ht(t),Pi=null,Ki=null}function Ga(e,t,n){var a=t.deletions;if(a!==null)for(var r=0;r<a.length;r++){var i=a[r];try{rE(e,t,i)}catch(s){lt(i,t,s)}}var u=Rb();if(t.subtreeFlags&Je)for(var o=t.child;o!==null;)Ht(o),Pm(o,e),o=o.sibling;Ht(u)}function Pm(e,t,n){var a=e.alternate,r=e.flags;switch(e.tag){case Ue:case ze:case ot:case Ae:{if(Ga(t,e),or(e),r&oe){try{qa(tr|Kt,e,e.return),qr(tr|Kt,e)}catch(ue){lt(e,e.return,ue)}if(e.mode&tt){try{ir(),qa(Wt|Kt,e,e.return)}catch(ue){lt(e,e.return,ue)}rr(e)}else try{qa(Wt|Kt,e,e.return)}catch(ue){lt(e,e.return,ue)}}return}case be:{Ga(t,e),or(e),r&Vn&&a!==null&&Wi(a,a.return);return}case te:{if(Ga(t,e),or(e),r&Vn&&a!==null&&Wi(a,a.return),tn){if(e.flags&Zn){var i=e.stateNode;try{_l(i)}catch(ue){lt(e,e.return,ue)}}if(r&oe){var u=e.stateNode;if(u!=null){var o=e.memoizedProps,s=a!==null?a.memoizedProps:o,f=e.type,m=e.updateQueue;if(e.updateQueue=null,m!==null)try{cu(u,m,f,s,o,e)}catch(ue){lt(e,e.return,ue)}}}}return}case Se:{if(Ga(t,e),or(e),r&oe&&tn){if(e.stateNode===null)throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");var S=e.stateNode,x=e.memoizedProps,M=a!==null?a.memoizedProps:x;try{zs(S,M,x)}catch(ue){lt(e,e.return,ue)}}return}case le:{if(Ga(t,e),or(e),r&oe){if(tn&&Pt&&a!==null){var H=a.memoizedState;if(H.isDehydrated)try{Hy(t.containerInfo)}catch(ue){lt(e,e.return,ue)}}if(bi){var z=t.containerInfo,ee=t.pendingChildren;try{Ve(z,ee)}catch(ue){lt(e,e.return,ue)}}}return}case Me:{if(Ga(t,e),or(e),r&oe&&bi){var pe=e.stateNode,re=pe.containerInfo,Ie=pe.pendingChildren;try{Ve(re,Ie)}catch(ue){lt(e,e.return,ue)}}return}case je:{Ga(t,e),or(e);var Ye=e.child;if(Ye.flags&In){var T=Ye.stateNode,O=Ye.memoizedState,E=O!==null;if(T.isHidden=E,E){var F=Ye.alternate!==null&&Ye.alternate.memoizedState!==null;F||eT()}}if(r&oe){try{iE(e)}catch(ue){lt(e,e.return,ue)}Gm(e)}return}case rt:{var $=a!==null&&a.memoizedState!==null;if(e.mode&Pe){var W=Sn;Sn=W||$,Ga(t,e),Sn=W}else Ga(t,e);if(or(e),r&In){var we=e.stateNode,ye=e.memoizedState,ke=ye!==null,Le=e;if(we.isHidden=ke,ke&&!$&&(Le.mode&Pe)!==ve){X=Le;for(var dt=Le.child;dt!==null;)X=dt,sE(dt),dt=dt.sibling}tn&&$S(Le,ke)}return}case bt:{Ga(t,e),or(e),r&oe&&Gm(e);return}case $t:return;default:{Ga(t,e),or(e);return}}}function or(e){var t=e.flags;if(t&Ge){try{aE(e)}catch(n){lt(e,e.return,n)}e.flags&=~Ge}t&dn&&(e.flags&=~dn)}function oE(e,t,n){Pi=n,Ki=t,X=e,Km(e,t,n),Pi=null,Ki=null}function Km(e,t,n){for(var a=(e.mode&Pe)!==ve;X!==null;){var r=X,i=r.child;if(r.tag===rt&&a){var u=r.memoizedState!==null,o=u||Vo;if(o){ad(e,t,n);continue}else{var s=r.alternate,f=s!==null&&s.memoizedState!==null,m=f||Sn,S=Vo,x=Sn;Vo=o,Sn=m,Sn&&!x&&(X=r,cE(r));for(var M=i;M!==null;)X=M,Km(M,t,n),M=M.sibling;X=r,Vo=S,Sn=x,ad(e,t,n);continue}}(r.subtreeFlags&Fe)!==k&&i!==null?(i.return=r,X=i):ad(e,t,n)}}function ad(e,t,n){for(;X!==null;){var a=X;if((a.flags&Fe)!==k){var r=a.alternate;Ht(a);try{ZS(t,r,a,n)}catch(u){lt(a,a.return,u)}qn()}if(a===e){X=null;return}var i=a.sibling;if(i!==null){i.return=a.return,X=i;return}X=a.return}}function sE(e){for(;X!==null;){var t=X,n=t.child;switch(t.tag){case Ue:case ze:case ot:case Ae:{if(t.mode&tt)try{ir(),qa(Wt,t,t.return)}finally{rr(t)}else qa(Wt,t,t.return);break}case be:{Wi(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&$f(t,t.return,a);break}case te:{Wi(t,t.return);break}case rt:{var r=t.memoizedState!==null;if(r){Wm(e);continue}break}}n!==null?(n.return=t,X=n):Wm(e)}}function Wm(e){for(;X!==null;){var t=X;if(t===e){X=null;return}var n=t.sibling;if(n!==null){n.return=t.return,X=n;return}X=t.return}}function cE(e){for(;X!==null;){var t=X,n=t.child;if(t.tag===rt){var a=t.memoizedState!==null;if(a){km(e);continue}}n!==null?(n.return=t,X=n):km(e)}}function km(e){for(;X!==null;){var t=X;Ht(t);try{IS(t)}catch(a){lt(t,t.return,a)}if(qn(),t===e){X=null;return}var n=t.sibling;if(n!==null){n.return=t.return,X=n;return}X=t.return}}function fE(e,t,n,a){X=t,dE(t,e,n,a)}function dE(e,t,n,a){for(;X!==null;){var r=X,i=r.child;(r.subtreeFlags&Be)!==k&&i!==null?(i.return=r,X=i):vE(e,t,n,a)}}function vE(e,t,n,a){for(;X!==null;){var r=X;if((r.flags&At)!==k){Ht(r);try{pE(t,r,n,a)}catch(u){lt(r,r.return,u)}qn()}if(r===e){X=null;return}var i=r.sibling;if(i!==null){i.return=r.return,X=i;return}X=r.return}}function pE(e,t,n,a){switch(t.tag){case Ue:case ze:case Ae:{if(t.mode&tt){Af();try{qr(gn|Kt,t)}finally{zf(t)}}else qr(gn|Kt,t);break}}}function mE(e){X=e,hE()}function hE(){for(;X!==null;){var e=X,t=e.child;if((X.flags&Ft)!==k){var n=e.deletions;if(n!==null){for(var a=0;a<n.length;a++){var r=n[a];X=r,bE(r,e)}{var i=e.alternate;if(i!==null){var u=i.child;if(u!==null){i.child=null;do{var o=u.sibling;u.sibling=null,u=o}while(u!==null)}}}X=e}}(e.subtreeFlags&Be)!==k&&t!==null?(t.return=e,X=t):yE()}}function yE(){for(;X!==null;){var e=X;(e.flags&At)!==k&&(Ht(e),gE(e),qn());var t=e.sibling;if(t!==null){t.return=e.return,X=t;return}X=e.return}}function gE(e){switch(e.tag){case Ue:case ze:case Ae:{e.mode&tt?(Af(),qa(gn|Kt,e,e.return),zf(e)):qa(gn|Kt,e,e.return);break}}}function bE(e,t){for(;X!==null;){var n=X;Ht(n),EE(n,t),qn();var a=n.child;a!==null?(a.return=n,X=a):SE(e)}}function SE(e){for(;X!==null;){var t=X,n=t.sibling,a=t.return;if(Ym(t),t===e){X=null;return}if(n!==null){n.return=a,X=n;return}X=a}}function EE(e,t){switch(e.tag){case Ue:case ze:case Ae:{e.mode&tt?(Af(),qa(gn,e,t),zf(e)):qa(gn,e,t);break}}}function TE(e){switch(e.tag){case Ue:case ze:case Ae:{try{qr(Wt|Kt,e)}catch(n){lt(e,e.return,n)}break}case be:{var t=e.stateNode;try{t.componentDidMount()}catch(n){lt(e,e.return,n)}break}}}function RE(e){switch(e.tag){case Ue:case ze:case Ae:{try{qr(gn|Kt,e)}catch(t){lt(e,e.return,t)}break}}}function CE(e){switch(e.tag){case Ue:case ze:case Ae:{try{qa(Wt|Kt,e,e.return)}catch(n){lt(e,e.return,n)}break}case be:{var t=e.stateNode;typeof t.componentWillUnmount=="function"&&$f(e,e.return,t);break}}}function xE(e){switch(e.tag){case Ue:case ze:case Ae:try{qa(gn|Kt,e,e.return)}catch(t){lt(e,e.return,t)}}}var Yo=0,qo=1,Qo=2,Go=3,Po=4;if(typeof Symbol=="function"&&Symbol.for){var $u=Symbol.for;Yo=$u("selector.component"),qo=$u("selector.has_pseudo_class"),Qo=$u("selector.role"),Go=$u("selector.test_id"),Po=$u("selector.text")}function DE(e){return{$$typeof:Yo,value:e}}function _E(e){return{$$typeof:qo,value:e}}function OE(e){return{$$typeof:Qo,value:e}}function NE(e){return{$$typeof:Po,value:e}}function UE(e){return{$$typeof:Go,value:e}}function rd(e){var t=su(e);if(t!=null){if(typeof t.memoizedProps["data-testname"]!="string")throw new Error("Invalid host root specified. Should be either a React container or a node with a testname attribute.");return t}else{var n=Cl(e);if(n===null)throw new Error("Could not find React container within specified host subtree.");return n.stateNode.current}}function id(e,t){switch(t.$$typeof){case Yo:if(e.type===t.value)return!0;break;case qo:return ME(e,t.value);case Qo:if(e.tag===te){var n=e.stateNode;if(xl(n,t.value))return!0}break;case Po:if(e.tag===te||e.tag===Se){var a=Us(e);if(a!==null&&a.indexOf(t.value)>=0)return!0}break;case Go:if(e.tag===te){var r=e.memoizedProps["data-testname"];if(typeof r=="string"&&r.toLowerCase()===t.value.toLowerCase())return!0}break;default:throw new Error("Invalid selector type specified.")}return!1}function ud(e){switch(e.$$typeof){case Yo:var t=ne(e.value)||"Unknown";return"<"+t+">";case qo:return":has("+(ud(e)||"")+")";case Qo:return'[role="'+e.value+'"]';case Po:return'"'+e.value+'"';case Go:return'[data-testname="'+e.value+'"]';default:throw new Error("Invalid selector type specified.")}}function Xm(e,t){for(var n=[],a=[e,0],r=0;r<a.length;){var i=a[r++],u=a[r++],o=t[u];if(!(i.tag===te&&Ir(i))){for(;o!=null&&id(i,o);)u++,o=t[u];if(u===t.length)n.push(i);else for(var s=i.child;s!==null;)a.push(s,u),s=s.sibling}}return n}function ME(e,t){for(var n=[e,0],a=0;a<n.length;){var r=n[a++],i=n[a++],u=t[i];if(!(r.tag===te&&Ir(r))){for(;u!=null&&id(r,u);)i++,u=t[i];if(i===t.length)return!0;for(var o=r.child;o!==null;)n.push(o,i),o=o.sibling}}return!1}function Ko(e,t){if(!mr)throw new Error("Test selector API is not supported by this renderer.");for(var n=rd(e),a=Xm(n,t),r=[],i=Array.from(a),u=0;u<i.length;){var o=i[u++];if(o.tag===te){if(Ir(o))continue;r.push(o.stateNode)}else for(var s=o.child;s!==null;)i.push(s),s=s.sibling}return r}function zE(e,t){if(!mr)throw new Error("Test selector API is not supported by this renderer.");for(var n=rd(e),a=0,r=[],i=[n,0],u=0;u<i.length;){var o=i[u++],s=i[u++],f=t[s];if(!(o.tag===te&&Ir(o))&&(id(o,f)&&(r.push(ud(f)),s++,s>a&&(a=s)),s<t.length))for(var m=o.child;m!==null;)i.push(m,s),m=m.sibling}if(a<t.length){for(var S=[],x=a;x<t.length;x++)S.push(ud(t[x]));return`findAllNodes was able to match part of the selector:
`+("  "+r.join(" > ")+`

`)+`No matching component was found for:
`+("  "+S.join(" > "))}return null}function AE(e,t){if(!mr)throw new Error("Test selector API is not supported by this renderer.");for(var n=Ko(e,t),a=[],r=0;r<n.length;r++)a.push(Ns(n[r]));for(var i=a.length-1;i>0;i--)for(var u=a[i],o=u.x,s=o+u.width,f=u.y,m=f+u.height,S=i-1;S>=0;S--)if(i!==S){var x=a[S],M=x.x,H=M+x.width,z=x.y,ee=z+x.height;if(o>=M&&f>=z&&s<=H&&m<=ee){a.splice(i,1);break}else if(o===M&&u.width===x.width&&!(ee<f)&&!(z>m)){z>f&&(x.height+=z-f,x.y=f),ee<m&&(x.height=m-z),a.splice(i,1);break}else if(f===z&&u.height===x.height&&!(H<o)&&!(M>s)){M>o&&(x.width+=M-o,x.x=o),H<s&&(x.width=s-M),a.splice(i,1);break}}return a}function HE(e,t){if(!mr)throw new Error("Test selector API is not supported by this renderer.");for(var n=rd(e),a=Xm(n,t),r=Array.from(a),i=0;i<r.length;){var u=r[i++];if(!Ir(u)){if(u.tag===te){var o=u.stateNode;if(Si(o))return!0}for(var s=u.child;s!==null;)r.push(s),s=s.sibling}}return!1}var Wo=[];function LE(){mr&&Wo.forEach(function(e){return e()})}function jE(e,t,n,a){if(!mr)throw new Error("Test selector API is not supported by this renderer.");var r=Ko(e,t),i=Ms(r,n,a),u=i.disconnect,o=i.observe,s=i.unobserve,f=function(){var m=Ko(e,t);r.forEach(function(S){m.indexOf(S)<0&&s(S)}),m.forEach(function(S){r.indexOf(S)<0&&o(S)})};return Wo.push(f),{disconnect:function(){var m=Wo.indexOf(f);m>=0&&Wo.splice(m,1),u()}}}var FE=A.ReactCurrentActQueue;function BE(e){{var t=typeof IS_REACT_ACT_ENVIRONMENT!="undefined"?IS_REACT_ACT_ENVIRONMENT:void 0,n=typeof jest!="undefined";return Sl&&n&&t!==!1}}function Jm(){{var e=typeof IS_REACT_ACT_ENVIRONMENT!="undefined"?IS_REACT_ACT_ENVIRONMENT:void 0;return!e&&FE.current!==null&&h("The current testing environment is not configured to support act(...)"),e}}var VE=Math.ceil,ld=A.ReactCurrentDispatcher,od=A.ReactCurrentOwner,xt=A.ReactCurrentBatchConfig,Pa=A.ReactCurrentActQueue,Yt=0,sd=1,Tn=2,Oa=4,Cr=0,el=1,vi=2,ko=3,tl=4,Zm=5,cd=6,Ne=Yt,Pn=null,Dt=null,Jt=L,sr=L,fd=Hr(L),Zt=Cr,nl=null,dd=L,Xo=L,al=L,Jo=L,rl=null,na=null,vd=0,Im=500,$m=1/0,wE=500,xr=null;function ki(){$m=rn()+wE}function eh(){return $m}var Zo=!1,pd=null,Xi=null,pi=!1,Qr=null,il=L,md=[],hd=null,YE=50,ul=0,yd=null,gd=!1,Io=!1,qE=50,Ji=0,$o=null,ll=mt,es=L,th=!1;function ts(){return Pn}function zn(){return(Ne&(Tn|Oa))!==Yt?rn():(ll!==mt||(ll=rn()),ll)}function Gr(e){var t=e.mode;if((t&Pe)===ve)return he;if((Ne&Tn)!==Yt&&Jt!==L)return Su(Jt);var n=bb()!==gb;if(n){if(xt.transition!==null){var a=xt.transition;a._updatedFibers||(a._updatedFibers=new Set),a._updatedFibers.add(e)}return es===nn&&(es=Uv()),es}var r=Ha();if(r!==nn)return r;var i=El();return i}function QE(e){var t=e.mode;return(t&Pe)===ve?he:gg()}function qt(e,t,n,a){yT(),th&&h("useInsertionEffect must not schedule updates."),gd&&(Io=!0),Eu(e,n,a),(Ne&Tn)!==L&&e===Pn?ST(t):(La&&Av(e,t,n),ET(t),e===Pn&&((Ne&Tn)===Yt&&(al=_e(al,n)),Zt===tl&&Pr(e,Jt)),aa(e,a),n===he&&Ne===Yt&&(t.mode&Pe)===ve&&!Pa.isBatchingLegacy&&(ki(),Wv()))}function GE(e,t,n){var a=e.current;a.lanes=t,Eu(e,t,n),aa(e,n)}function PE(e){return(Ne&Tn)!==Yt}function aa(e,t){var n=e.callbackNode;dg(e,t);var a=wl(e,e===Pn?Jt:L);if(a===L){n!==null&&hh(n),e.callbackNode=null,e.callbackPriority=nn;return}var r=ti(a),i=e.callbackPriority;if(i===r&&!(Pa.current!==null&&n!==Cd)){n==null&&i!==he&&h("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");return}n!=null&&hh(n);var u;if(r===he)e.tag===xi?(Pa.isBatchingLegacy!==null&&(Pa.didScheduleLegacyUpdate=!0),tb(rh.bind(null,e))):Kv(rh.bind(null,e)),Rl?Pa.current!==null?Pa.current.push($a):Os(function(){(Ne&(Tn|Oa))===Yt&&$a()}):ls(Ql,$a),u=null;else{var o;switch(Fv(a)){case Za:o=Ql;break;case Tu:o=Vv;break;case Ru:o=Ui;break;case bc:o=wv;break;default:o=Ui;break}u=ls(o,nh.bind(null,e))}e.callbackPriority=r,e.callbackNode=u}function nh(e,t){if(eS(),ll=mt,es=L,(Ne&(Tn|Oa))!==Yt)throw new Error("Should not already be working.");var n=e.callbackNode,a=cr();if(a&&e.callbackNode!==n)return null;var r=wl(e,e===Pn?Jt:L);if(r===L)return null;var i=!Yl(e,r)&&!yg(e,r)&&!t,u=i?iT(e,r):rs(e,r);if(u!==Cr){if(u===vi){var o=pc(e);o!==L&&(r=o,u=bd(e,o))}if(u===el){var s=nl;throw mi(e,L),Pr(e,r),aa(e,rn()),s}if(u===cd)Pr(e,r);else{var f=!Yl(e,r),m=e.current.alternate;if(f&&!WE(m)){if(u=rs(e,r),u===vi){var S=pc(e);S!==L&&(r=S,u=bd(e,S))}if(u===el){var x=nl;throw mi(e,L),Pr(e,r),aa(e,rn()),x}}e.finishedWork=m,e.finishedLanes=r,KE(e,u,r)}}return aa(e,rn()),e.callbackNode===n?nh.bind(null,e):null}function bd(e,t){var n=rl;if(kv(e)){var a=mi(e,t);a.flags|=fn,$y(e.containerInfo)}var r=rs(e,t);if(r!==vi){var i=na;na=n,i!==null&&ah(i)}return r}function ah(e){na===null?na=e:na.push.apply(na,e)}function KE(e,t,n){switch(t){case Cr:case el:throw new Error("Root did not complete. This is a bug in React.");case vi:{hi(e,na,xr);break}case ko:{if(Pr(e,n),Ov(n)&&!yh()){var a=vd+Im-rn();if(a>10){var r=wl(e,L);if(r!==L)break;var i=e.suspendedLanes;if(!Ni(i,n)){var u=zn();zv(e,i);break}e.timeoutHandle=bl(hi.bind(null,e,na,xr),a);break}}hi(e,na,xr);break}case tl:{if(Pr(e,n),hg(n))break;if(!yh()){var o=cg(e,n),s=o,f=rn()-s,m=hT(f)-f;if(m>10){e.timeoutHandle=bl(hi.bind(null,e,na,xr),m);break}}hi(e,na,xr);break}case Zm:{hi(e,na,xr);break}default:throw new Error("Unknown root exit status.")}}function WE(e){for(var t=e;;){if(t.flags&Sa){var n=t.updateQueue;if(n!==null){var a=n.stores;if(a!==null)for(var r=0;r<a.length;r++){var i=a[r],u=i.getSnapshot,o=i.value;try{if(!pa(u(),o))return!1}catch(f){return!1}}}}var s=t.child;if(t.subtreeFlags&Sa&&s!==null){s.return=t,t=s;continue}if(t===e)return!0;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}return!0}function Pr(e,t){t=ql(t,Jo),t=ql(t,al),Sg(e,t)}function rh(e){if(tS(),(Ne&(Tn|Oa))!==Yt)throw new Error("Should not already be working.");cr();var t=wl(e,L);if(!va(t,he))return aa(e,rn()),null;var n=rs(e,t);if(e.tag!==xi&&n===vi){var a=pc(e);a!==L&&(t=a,n=bd(e,a))}if(n===el){var r=nl;throw mi(e,L),Pr(e,t),aa(e,rn()),r}if(n===cd)throw new Error("Root did not complete. This is a bug in React.");var i=e.current.alternate;return e.finishedWork=i,e.finishedLanes=t,hi(e,na,xr),aa(e,rn()),null}function kE(e,t){t!==L&&(gc(e,_e(t,he)),aa(e,rn()),(Ne&(Tn|Oa))===Yt&&(ki(),$a()))}function XE(e){var t=Ha(),n=xt.transition;try{return xt.transition=null,an(Ru),e()}finally{an(t),xt.transition=n}}function JE(e,t){var n=Ne;Ne|=sd;try{return e(t)}finally{Ne=n,Ne===Yt&&!Pa.isBatchingLegacy&&(ki(),Wv())}}function ZE(e,t,n,a,r){var i=Ha(),u=xt.transition;try{return xt.transition=null,an(Za),e(t,n,a,r)}finally{an(i),xt.transition=u,Ne===Yt&&ki()}}function ns(e){Qr!==null&&Qr.tag===xi&&(Ne&(Tn|Oa))===Yt&&cr();var t=Ne;Ne|=sd;var n=xt.transition,a=Ha();try{return xt.transition=null,an(Za),e?e():void 0}finally{an(a),xt.transition=n,Ne=t,(Ne&(Tn|Oa))===Yt&&$a()}}function IE(){return(Ne&(Tn|Oa))!==Yt}function $E(e){var t=Ne;Ne|=sd;var n=xt.transition,a=Ha();try{xt.transition=null,an(Za),e()}finally{an(a),xt.transition=n,Ne=t,Ne===Yt&&(ki(),$a())}}function as(e,t){pn(fd,sr,e),sr=_e(sr,t),dd=_e(dd,t)}function Sd(e){sr=fd.current,Un(fd,e)}function mi(e,t){e.finishedWork=null,e.finishedLanes=L;var n=e.timeoutHandle;if(n!==Ur&&(e.timeoutHandle=Ur,Cs(n)),Dt!==null)for(var a=Dt.return;a!==null;){var r=a.alternate;Um(r,a),a=a.return}Pn=e;var i=yi(e.current,null);return Dt=i,Jt=sr=dd=t,Zt=Cr,nl=null,Xo=L,al=L,Jo=L,rl=null,na=null,Nb(),Fa.discardPendingWarnings(),i}function ih(e,t){do{var n=Dt;try{if($l(),Ap(),qn(),od.current=null,n===null||n.return===null){Zt=el,nl=t,Dt=null;return}if(gt&&n.mode&tt&&zo(n,!0),st)if(Mi(),t!==null&&typeof t=="object"&&typeof t.then=="function"){var a=t;Kg(n,a,Jt)}else Pg(n,t,Jt);uS(e,n.return,n,t,Jt),sh(n)}catch(r){t=r,Dt===n&&n!==null?(n=n.return,Dt=n):n=Dt;continue}return}while(!0)}function uh(){var e=ld.current;return ld.current=_o,e===null?_o:e}function lh(e){ld.current=e}function eT(){vd=rn()}function ol(e){Xo=_e(e,Xo)}function tT(){Zt===Cr&&(Zt=ko)}function Ed(){(Zt===Cr||Zt===ko||Zt===vi)&&(Zt=tl),Pn!==null&&(mc(Xo)||mc(al))&&Pr(Pn,Jt)}function nT(e){Zt!==tl&&(Zt=vi),rl===null?rl=[e]:rl.push(e)}function aT(){return Zt===Cr}function rs(e,t){var n=Ne;Ne|=Tn;var a=uh();if(Pn!==e||Jt!==t){if(La){var r=e.memoizedUpdaters;r.size>0&&(sl(e,Jt),r.clear()),Hv(e,t)}xr=Lv(),mi(e,t)}Gv(t);do try{rT();break}catch(i){ih(e,i)}while(!0);if($l(),Ne=n,lh(a),Dt!==null)throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");return Pv(),Pn=null,Jt=L,Zt}function rT(){for(;Dt!==null;)oh(Dt)}function iT(e,t){var n=Ne;Ne|=Tn;var a=uh();if(Pn!==e||Jt!==t){if(La){var r=e.memoizedUpdaters;r.size>0&&(sl(e,Jt),r.clear()),Hv(e,t)}xr=Lv(),ki(),mi(e,t)}Gv(t);do try{uT();break}catch(i){ih(e,i)}while(!0);return $l(),lh(a),Ne=n,Dt!==null?(Zg(),Cr):(Pv(),Pn=null,Jt=L,Zt)}function uT(){for(;Dt!==null&&!_g();)oh(Dt)}function oh(e){var t=e.alternate;Ht(e);var n;(e.mode&tt)!==ve?(Mf(e),n=Td(t,e,sr),zo(e,!0)):n=Td(t,e,sr),qn(),e.memoizedProps=e.pendingProps,n===null?sh(e):Dt=n,od.current=null}function sh(e){var t=e;do{var n=t.alternate,a=t.return;if((t.flags&ua)===k){Ht(t);var r=void 0;if((t.mode&tt)===ve?r=Nm(n,t,sr):(Mf(t),r=Nm(n,t,sr),zo(t,!1)),qn(),r!==null){Dt=r;return}}else{var i=BS(n,t);if(i!==null){i.flags&=Or,Dt=i;return}if((t.mode&tt)!==ve){zo(t,!1);for(var u=t.actualDuration,o=t.child;o!==null;)u+=o.actualDuration,o=o.sibling;t.actualDuration=u}if(a!==null)a.flags|=ua,a.subtreeFlags=k,a.deletions=null;else{Zt=cd,Dt=null;return}}var s=t.sibling;if(s!==null){Dt=s;return}t=a,Dt=t}while(t!==null);Zt===Cr&&(Zt=Zm)}function hi(e,t,n){var a=Ha(),r=xt.transition;try{xt.transition=null,an(Za),lT(e,t,n,a)}finally{xt.transition=r,an(a)}return null}function lT(e,t,n,a){do cr();while(Qr!==null);if(gT(),(Ne&(Tn|Oa))!==Yt)throw new Error("Should not already be working.");var r=e.finishedWork,i=e.finishedLanes;if(Bg(i),r===null)return Yv(),null;if(i===L&&h("root.finishedLanes should not be empty during a commit. This is a bug in React."),e.finishedWork=null,e.finishedLanes=L,r===e.current)throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");e.callbackNode=null,e.callbackPriority=nn;var u=_e(r.lanes,r.childLanes);Eg(e,u),e===Pn&&(Pn=null,Dt=null,Jt=L),((r.subtreeFlags&Be)!==k||(r.flags&Be)!==k)&&(pi||(pi=!0,hd=n,ls(Ui,function(){return cr(),null})));var o=(r.subtreeFlags&(ce|Je|Fe|Be))!==k,s=(r.flags&(ce|Je|Fe|Be))!==k;if(o||s){var f=xt.transition;xt.transition=null;var m=Ha();an(Za);var S=Ne;Ne|=Oa,od.current=null;var x=KS(e,r);rm(),lE(e,r,i),iu(e.containerInfo),e.current=r,Wg(i),oE(r,e,i),kg(),Og(),Ne=S,an(m),xt.transition=f}else e.current=r,rm();var M=pi;if(pi?(pi=!1,Qr=e,il=i):(Ji=0,$o=null),u=e.pendingLanes,u===L&&(Xi=null),M||vh(e.current,!1),Ag(r.stateNode,a),La&&e.memoizedUpdaters.clear(),LE(),aa(e,rn()),t!==null)for(var H=e.onRecoverableError,z=0;z<t.length;z++){var ee=t[z],pe=ee.stack,re=ee.digest;H(ee.value,{componentStack:pe,digest:re})}if(Zo){Zo=!1;var Ie=pd;throw pd=null,Ie}return va(il,he)&&e.tag!==xi&&cr(),u=e.pendingLanes,va(u,he)?($b(),e===yd?ul++:(ul=0,yd=e)):ul=0,$a(),Yv(),null}function cr(){if(Qr!==null){var e=Fv(il),t=xg(Ru,e),n=xt.transition,a=Ha();try{return xt.transition=null,an(t),sT()}finally{an(a),xt.transition=n}}return!1}function oT(e){md.push(e),pi||(pi=!0,ls(Ui,function(){return cr(),null}))}function sT(){if(Qr===null)return!1;var e=hd;hd=null;var t=Qr,n=il;if(Qr=null,il=L,(Ne&(Tn|Oa))!==Yt)throw new Error("Cannot flush passive effects while already rendering.");gd=!0,Io=!1,Xg(n);var a=Ne;Ne|=Oa,mE(t.current),fE(t,t.current,n,e);{var r=md;md=[];for(var i=0;i<r.length;i++){var u=r[i];JS(t,u)}}Jg(),vh(t.current,!0),Ne=a,$a(),Io?t===$o?Ji++:(Ji=0,$o=t):Ji=0,gd=!1,Io=!1,Hg(t);{var o=t.current.stateNode;o.effectDuration=0,o.passiveEffectDuration=0}return!0}function ch(e){return Xi!==null&&Xi.has(e)}function cT(e){Xi===null?Xi=new Set([e]):Xi.add(e)}function fT(e){Zo||(Zo=!0,pd=e)}var dT=fT;function fh(e,t,n){var a=fi(n,t),r=um(e,a,he),i=Fr(e,r,he),u=zn();i!==null&&(Eu(i,he,u),aa(i,u))}function lt(e,t,n){if(QS(n),cl(!1),e.tag===le){fh(e,e,n);return}var a=null;for(a=t;a!==null;){if(a.tag===le){fh(a,e,n);return}else if(a.tag===be){var r=a.type,i=a.stateNode;if(typeof r.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&!ch(i)){var u=fi(n,e),o=Ff(a,u,he),s=Fr(a,o,he),f=zn();s!==null&&(Eu(s,he,f),aa(s,f));return}}a=a.return}h(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`,n)}function vT(e,t,n){var a=e.pingCache;a!==null&&a.delete(t);var r=zn();zv(e,n),TT(e),Pn===e&&Ni(Jt,n)&&(Zt===tl||Zt===ko&&Ov(Jt)&&rn()-vd<Im?mi(e,L):Jo=_e(Jo,n)),aa(e,r)}function dh(e,t){t===nn&&(t=QE(e));var n=zn(),a=Qn(e,t);a!==null&&(Eu(a,t,n),aa(a,n))}function pT(e){var t=e.memoizedState,n=nn;t!==null&&(n=t.retryLane),dh(e,n)}function mT(e,t){var n=nn,a;switch(e.tag){case je:a=e.stateNode;var r=e.memoizedState;r!==null&&(n=r.retryLane);break;case bt:a=e.stateNode;break;default:throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.")}a!==null&&a.delete(t),dh(e,n)}function hT(e){return e<120?120:e<480?480:e<1080?1080:e<1920?1920:e<3e3?3e3:e<4320?4320:VE(e/1960)*1960}function yT(){if(ul>YE)throw ul=0,yd=null,new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");Ji>qE&&(Ji=0,$o=null,h("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."))}function gT(){Fa.flushLegacyContextWarning(),Fa.flushPendingUnsafeLifecycleWarnings()}function vh(e,t){Ht(e),is(e,Ee,CE),t&&is(e,de,xE),is(e,Ee,TE),t&&is(e,de,RE),qn()}function is(e,t,n){for(var a=e,r=null;a!==null;){var i=a.subtreeFlags&t;a!==r&&a.child!==null&&i!==k?a=a.child:((a.flags&t)!==k&&n(a),a.sibling!==null?a=a.sibling:a=r=a.return)}}var us=null;function ph(e){{if((Ne&Tn)!==Yt||!(e.mode&Pe))return;var t=e.tag;if(t!==It&&t!==le&&t!==be&&t!==Ue&&t!==ze&&t!==ot&&t!==Ae)return;var n=J(e)||"ReactComponent";if(us!==null){if(us.has(n))return;us.add(n)}else us=new Set([n]);var a=ma;try{Ht(e),h("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.")}finally{a?Ht(e):qn()}}}var Td;{var bT=null;Td=function(e,t,n){var a=Th(bT,t);try{return xm(e,t,n)}catch(i){if(sb()||i!==null&&typeof i=="object"&&typeof i.then=="function")throw i;if($l(),Ap(),Um(e,t),Th(t,a),t.mode&tt&&Mf(t),Am(null,xm,null,e,t,n),YS()){var r=Hm();typeof r=="object"&&r!==null&&r._suppressLogging&&typeof i=="object"&&i!==null&&!i._suppressLogging&&(i._suppressLogging=!0)}throw i}}}var mh=!1,Rd;Rd=new Set;function ST(e){if(Du&&!Jb())switch(e.tag){case Ue:case ze:case Ae:{var t=Dt&&J(Dt)||"Unknown",n=t;if(!Rd.has(n)){Rd.add(n);var a=J(e)||"Unknown";h("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render",a,t,t)}break}case be:{mh||(h("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."),mh=!0);break}}}function sl(e,t){if(La){var n=e.memoizedUpdaters;n.forEach(function(a){Av(e,a,t)})}}var Cd={};function ls(e,t){{var n=Pa.current;return n!==null?(n.push(t),Cd):Bv(e,t)}}function hh(e){if(e!==Cd)return Dg(e)}function yh(){return Pa.current!==null}function ET(e){{if(e.mode&Pe){if(!Jm())return}else if(!BE()||Ne!==Yt||e.tag!==Ue&&e.tag!==ze&&e.tag!==Ae)return;if(Pa.current===null){var t=ma;try{Ht(e),h(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`,J(e))}finally{t?Ht(e):qn()}}}}function TT(e){e.tag!==xi&&Jm()&&Pa.current===null&&h(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`)}function cl(e){th=e}var Na=null,Zi=null,RT=function(e){Na=e};function Ii(e){{if(Na===null)return e;var t=Na(e);return t===void 0?e:t.current}}function xd(e){return Ii(e)}function Dd(e){{if(Na===null)return e;var t=Na(e);if(t===void 0){if(e!=null&&typeof e.render=="function"){var n=Ii(e.render);if(e.render!==n){var a={$$typeof:St,render:n};return e.displayName!==void 0&&(a.displayName=e.displayName),a}}return e}return t.current}}function gh(e,t){{if(Na===null)return!1;var n=e.elementType,a=t.type,r=!1,i=typeof a=="object"&&a!==null?a.$$typeof:null;switch(e.tag){case be:{typeof a=="function"&&(r=!0);break}case Ue:{(typeof a=="function"||i===it)&&(r=!0);break}case ze:{(i===St||i===it)&&(r=!0);break}case ot:case Ae:{(i===Bn||i===it)&&(r=!0);break}default:return!1}if(r){var u=Na(n);if(u!==void 0&&u===Na(a))return!0}return!1}}function bh(e){{if(Na===null||typeof WeakSet!="function")return;Zi===null&&(Zi=new WeakSet),Zi.add(e)}}var CT=function(e,t){{if(Na===null)return;var n=t.staleFamilies,a=t.updatedFamilies;cr(),ns(function(){_d(e.current,a,n)})}},xT=function(e,t){{if(e.context!==fa)return;cr(),ns(function(){xh(t,e,null,null)})}};function _d(e,t,n){{var a=e.alternate,r=e.child,i=e.sibling,u=e.tag,o=e.type,s=null;switch(u){case Ue:case Ae:case be:s=o;break;case ze:s=o.render;break}if(Na===null)throw new Error("Expected resolveFamily to be set during hot reload.");var f=!1,m=!1;if(s!==null){var S=Na(s);S!==void 0&&(n.has(S)?m=!0:t.has(S)&&(u===be?m=!0:f=!0))}if(Zi!==null&&(Zi.has(e)||a!==null&&Zi.has(a))&&(m=!0),m&&(e._debugNeedsRemount=!0),m||f){var x=Qn(e,he);x!==null&&qt(x,e,he,mt)}r!==null&&!m&&_d(r,t,n),i!==null&&_d(i,t,n)}}var DT=function(e,t){{var n=new Set,a=new Set(t.map(function(r){return r.current}));return Od(e.current,a,n),n}};function Od(e,t,n){{var a=e.child,r=e.sibling,i=e.tag,u=e.type,o=null;switch(i){case Ue:case Ae:case be:o=u;break;case ze:o=u.render;break}var s=!1;o!==null&&t.has(o)&&(s=!0),s?_T(e,n):a!==null&&Od(a,t,n),r!==null&&Od(r,t,n)}}function _T(e,t){{var n=OT(e,t);if(n)return;for(var a=e;;){switch(a.tag){case te:t.add(a.stateNode);return;case Me:t.add(a.stateNode.containerInfo);return;case le:t.add(a.stateNode.containerInfo);return}if(a.return===null)throw new Error("Expected to reach root first.");a=a.return}}}function OT(e,t){for(var n=e,a=!1;;){if(n.tag===te)a=!0,t.add(n.stateNode);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)return a;for(;n.sibling===null;){if(n.return===null||n.return===e)return a;n=n.return}n.sibling.return=n.return,n=n.sibling}return!1}var Nd;{Nd=!1;try{var Sh=Object.preventExtensions({})}catch(e){Nd=!0}}function NT(e,t,n,a){this.tag=e,this.key=n,this.elementType=null,this.type=null,this.stateNode=null,this.return=null,this.child=null,this.sibling=null,this.index=0,this.ref=null,this.pendingProps=t,this.memoizedProps=null,this.updateQueue=null,this.memoizedState=null,this.dependencies=null,this.mode=a,this.flags=k,this.subtreeFlags=k,this.deletions=null,this.lanes=L,this.childLanes=L,this.alternate=null,this.actualDuration=Number.NaN,this.actualStartTime=Number.NaN,this.selfBaseDuration=Number.NaN,this.treeBaseDuration=Number.NaN,this.actualDuration=0,this.actualStartTime=-1,this.selfBaseDuration=0,this.treeBaseDuration=0,this._debugSource=null,this._debugOwner=null,this._debugNeedsRemount=!1,this._debugHookTypes=null,!Nd&&typeof Object.preventExtensions=="function"&&Object.preventExtensions(this)}var ha=function(e,t,n,a){return new NT(e,t,n,a)};function Ud(e){var t=e.prototype;return!!(t&&t.isReactComponent)}function UT(e){return typeof e=="function"&&!Ud(e)&&e.defaultProps===void 0}function MT(e){if(typeof e=="function")return Ud(e)?be:Ue;if(e!=null){var t=e.$$typeof;if(t===St)return ze;if(t===Bn)return ot}return It}function yi(e,t){var n=e.alternate;n===null?(n=ha(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n._debugSource=e._debugSource,n._debugOwner=e._debugOwner,n._debugHookTypes=e._debugHookTypes,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=k,n.subtreeFlags=k,n.deletions=null,n.actualDuration=0,n.actualStartTime=-1),n.flags=e.flags&Xe,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue;var a=e.dependencies;switch(n.dependencies=a===null?null:{lanes:a.lanes,firstContext:a.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.selfBaseDuration=e.selfBaseDuration,n.treeBaseDuration=e.treeBaseDuration,n._debugNeedsRemount=e._debugNeedsRemount,n.tag){case It:case Ue:case Ae:n.type=Ii(e.type);break;case be:n.type=xd(e.type);break;case ze:n.type=Dd(e.type);break}return n}function zT(e,t){e.flags&=Xe|Ge;var n=e.alternate;if(n===null)e.childLanes=L,e.lanes=t,e.child=null,e.subtreeFlags=k,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null,e.selfBaseDuration=0,e.treeBaseDuration=0;else{e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=k,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type;var a=n.dependencies;e.dependencies=a===null?null:{lanes:a.lanes,firstContext:a.firstContext},e.selfBaseDuration=n.selfBaseDuration,e.treeBaseDuration=n.treeBaseDuration}return e}function AT(e,t,n){var a;return e===Cv?(a=Pe,t===!0&&(a|=Vt,a|=Xa)):a=ve,La&&(a|=tt),ha(le,null,null,a)}function Md(e,t,n,a,r,i){var u=It,o=e;if(typeof e=="function")Ud(e)?(u=be,o=xd(o)):o=Ii(o);else if(typeof e=="string")u=te;else e:switch(e){case Fn:return Kr(n.children,r,i,t);case Dn:u=ct,r|=Vt,(r&Pe)!==ve&&(r|=Xa);break;case Ut:return HT(n,r,i,t);case Mt:return LT(n,r,i,t);case Xn:return jT(n,r,i,t);case ra:return Eh(n,r,i,t);case ia:case On:case Nn:case Ua:case ba:default:{if(typeof e=="object"&&e!==null)switch(e.$$typeof){case cn:u=Et;break e;case _n:u=ie;break e;case St:u=ze,o=Dd(o);break e;case Bn:u=ot;break e;case it:u=Rt,o=null;break e}var s="";{(e===void 0||typeof e=="object"&&e!==null&&Object.keys(e).length===0)&&(s+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var f=a?J(a):null;f&&(s+=`

Check the render method of \``+f+"`.")}throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) "+("but got: "+(e==null?e:typeof e)+"."+s))}}var m=ha(u,n,t,r);return m.elementType=e,m.type=o,m.lanes=i,m._debugOwner=a,m}function zd(e,t,n){var a=null;a=e._owner;var r=e.type,i=e.key,u=e.props,o=Md(r,i,u,a,t,n);return o._debugSource=e._source,o._debugOwner=e._owner,o}function Kr(e,t,n,a){var r=ha(De,e,a,t);return r.lanes=n,r}function HT(e,t,n,a){typeof e.id!="string"&&h('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.',typeof e.id);var r=ha(Tt,e,a,t|tt);return r.elementType=Ut,r.lanes=n,r.stateNode={effectDuration:0,passiveEffectDuration:0},r}function LT(e,t,n,a){var r=ha(je,e,a,t);return r.elementType=Mt,r.lanes=n,r}function jT(e,t,n,a){var r=ha(bt,e,a,t);return r.elementType=Xn,r.lanes=n,r}function Eh(e,t,n,a){var r=ha(rt,e,a,t);r.elementType=ra,r.lanes=n;var i={isHidden:!1};return r.stateNode=i,r}function Ad(e,t,n){var a=ha(Se,e,null,t);return a.lanes=n,a}function FT(){var e=ha(te,null,null,ve);return e.elementType="DELETED",e}function BT(e){var t=ha(Ln,null,null,ve);return t.stateNode=e,t}function Hd(e,t,n){var a=e.children!==null?e.children:[],r=ha(Me,a,e.key,t);return r.lanes=n,r.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},r}function Th(e,t){return e===null&&(e=ha(It,null,null,ve)),e.tag=t.tag,e.key=t.key,e.elementType=t.elementType,e.type=t.type,e.stateNode=t.stateNode,e.return=t.return,e.child=t.child,e.sibling=t.sibling,e.index=t.index,e.ref=t.ref,e.pendingProps=t.pendingProps,e.memoizedProps=t.memoizedProps,e.updateQueue=t.updateQueue,e.memoizedState=t.memoizedState,e.dependencies=t.dependencies,e.mode=t.mode,e.flags=t.flags,e.subtreeFlags=t.subtreeFlags,e.deletions=t.deletions,e.lanes=t.lanes,e.childLanes=t.childLanes,e.alternate=t.alternate,e.actualDuration=t.actualDuration,e.actualStartTime=t.actualStartTime,e.selfBaseDuration=t.selfBaseDuration,e.treeBaseDuration=t.treeBaseDuration,e._debugSource=t._debugSource,e._debugOwner=t._debugOwner,e._debugNeedsRemount=t._debugNeedsRemount,e._debugHookTypes=t._debugHookTypes,e}function VT(e,t,n,a,r){this.tag=t,this.containerInfo=e,this.pendingChildren=null,this.current=null,this.pingCache=null,this.finishedWork=null,this.timeoutHandle=Ur,this.context=null,this.pendingContext=null,this.callbackNode=null,this.callbackPriority=nn,this.eventTimes=yc(L),this.expirationTimes=yc(mt),this.pendingLanes=L,this.suspendedLanes=L,this.pingedLanes=L,this.expiredLanes=L,this.mutableReadLanes=L,this.finishedLanes=L,this.entangledLanes=L,this.entanglements=yc(L),this.identifierPrefix=a,this.onRecoverableError=r,Pt&&(this.mutableSourceEagerHydrationData=null),this.effectDuration=0,this.passiveEffectDuration=0;{this.memoizedUpdaters=new Set;for(var i=this.pendingUpdatersLaneMap=[],u=0;u<ks;u++)i.push(new Set)}switch(t){case Cv:this._debugRootType=n?"hydrateRoot()":"createRoot()";break;case xi:this._debugRootType=n?"hydrate()":"render()";break}}function Rh(e,t,n,a,r,i,u,o,s,f){var m=new VT(e,t,n,o,s),S=AT(t,i);m.current=S,S.stateNode=m;{var x={element:a,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null};S.memoizedState=x}return Fc(S),m}var wT="18.2.0";function YT(e,t,n){var a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:null;return xb(a),{$$typeof:sn,key:a==null?null:""+a,children:e,containerInfo:t,implementation:n}}var Ld,jd;Ld=!1,jd={};function Ch(e){if(!e)return fa;var t=ge(e),n=ig(t);if(t.tag===be){var a=t.type;if(ka(a))return Tv(t,a,n)}return n}function qT(e){var t=ge(e);if(t===void 0){if(typeof e.render=="function")throw new Error("Unable to find node on an unmounted component.");var n=Object.keys(e).join(",");throw new Error("Argument appears to not be a ReactComponent. Keys: "+n)}var a=wn(t);return a===null?null:a.stateNode}function QT(e,t){{var n=ge(e);if(n===void 0){if(typeof e.render=="function")throw new Error("Unable to find node on an unmounted component.");var a=Object.keys(e).join(",");throw new Error("Argument appears to not be a ReactComponent. Keys: "+a)}var r=wn(n);if(r===null)return null;if(r.mode&Vt){var i=J(n)||"Component";if(!jd[i]){jd[i]=!0;var u=ma;try{Ht(r),n.mode&Vt?h("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node",t,t,i):h("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node",t,t,i)}finally{u?Ht(u):qn()}}}return r.stateNode}}function GT(e,t,n,a,r,i,u,o){var s=!1,f=null;return Rh(e,t,s,f,n,a,r,i,u)}function PT(e,t,n,a,r,i,u,o,s,f){var m=!0,S=Rh(n,a,m,e,r,i,u,o,s);S.context=Ch(null);var x=S.current,M=zn(),H=Gr(x),z=Tr(M,H);return z.callback=t!=null?t:null,Fr(x,z,H),GE(S,H,M),S}function xh(e,t,n,a){zg(t,e);var r=t.current,i=zn(),u=Gr(r);Ig(u);var o=Ch(n);t.context===null?t.context=o:t.pendingContext=o,Du&&ma!==null&&!Ld&&(Ld=!0,h(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`,J(ma)||"Unknown"));var s=Tr(i,u);s.payload={element:e},a=a===void 0?null:a,a!==null&&(typeof a!="function"&&h("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.",a),s.callback=a);var f=Fr(r,s,u);return f!==null&&(qt(f,r,u,i),ro(f,r,u)),u}function KT(e){var t=e.current;if(!t.child)return null;switch(t.child.tag){case te:return Yn(t.child.stateNode);default:return t.child.stateNode}}function WT(e){switch(e.tag){case le:{var t=e.stateNode;if(kv(t)){var n=vg(t);kE(t,n)}break}case je:{ns(function(){var r=Qn(e,he);if(r!==null){var i=zn();qt(r,e,he,i)}});var a=he;os(e,a);break}}}function Dh(e,t){var n=e.memoizedState;n!==null&&n.dehydrated!==null&&(n.retryLane=bg(n.retryLane,t))}function os(e,t){Dh(e,t);var n=e.alternate;n&&Dh(n,t)}function kT(e){if(e.tag===je){var t=he,n=Qn(e,t);if(n!==null){var a=zn();qt(n,e,t,a)}os(e,t)}}function XT(e){if(e.tag===je){var t=yu,n=Qn(e,t);if(n!==null){var a=zn();qt(n,e,t,a)}os(e,t)}}function JT(e){if(e.tag===je){var t=Gr(e),n=Qn(e,t);if(n!==null){var a=zn();qt(n,e,t,a)}os(e,t)}}function ZT(e){var t=oa(e);return t===null?null:t.stateNode}var _h=function(e){return null};function Oh(e){return _h(e)}var Nh=function(e){return!1};function Uh(e){return Nh(e)}var Mh=null,zh=null,Ah=null,Hh=null,Lh=null,jh=null,Fh=null,Bh=null,Vh=null;{var wh=function(e,t,n){var a=t[n],r=ht(e)?e.slice():P({},e);return n+1===t.length?(ht(r)?r.splice(a,1):delete r[a],r):(r[a]=wh(e[a],t,n+1),r)},Yh=function(e,t){return wh(e,t,0)},qh=function(e,t,n,a){var r=t[a],i=ht(e)?e.slice():P({},e);if(a+1===t.length){var u=n[a];i[u]=i[r],ht(i)?i.splice(r,1):delete i[r]}else i[r]=qh(e[r],t,n,a+1);return i},Qh=function(e,t,n){if(t.length!==n.length){j("copyWithRename() expects paths of the same length");return}else for(var a=0;a<n.length-1;a++)if(t[a]!==n[a]){j("copyWithRename() expects paths to be the same except for the deepest key");return}return qh(e,t,n,0)},Gh=function(e,t,n,a){if(n>=t.length)return a;var r=t[n],i=ht(e)?e.slice():P({},e);return i[r]=Gh(e[r],t,n+1,a),i},Ph=function(e,t,n){return Gh(e,t,0,n)},Fd=function(e,t){for(var n=e.memoizedState;n!==null&&t>0;)n=n.next,t--;return n};Mh=function(e,t,n,a){var r=Fd(e,t);if(r!==null){var i=Ph(r.memoizedState,n,a);r.memoizedState=i,r.baseState=i,e.memoizedProps=P({},e.memoizedProps);var u=Qn(e,he);u!==null&&qt(u,e,he,mt)}},zh=function(e,t,n){var a=Fd(e,t);if(a!==null){var r=Yh(a.memoizedState,n);a.memoizedState=r,a.baseState=r,e.memoizedProps=P({},e.memoizedProps);var i=Qn(e,he);i!==null&&qt(i,e,he,mt)}},Ah=function(e,t,n,a){var r=Fd(e,t);if(r!==null){var i=Qh(r.memoizedState,n,a);r.memoizedState=i,r.baseState=i,e.memoizedProps=P({},e.memoizedProps);var u=Qn(e,he);u!==null&&qt(u,e,he,mt)}},Hh=function(e,t,n){e.pendingProps=Ph(e.memoizedProps,t,n),e.alternate&&(e.alternate.pendingProps=e.pendingProps);var a=Qn(e,he);a!==null&&qt(a,e,he,mt)},Lh=function(e,t){e.pendingProps=Yh(e.memoizedProps,t),e.alternate&&(e.alternate.pendingProps=e.pendingProps);var n=Qn(e,he);n!==null&&qt(n,e,he,mt)},jh=function(e,t,n){e.pendingProps=Qh(e.memoizedProps,t,n),e.alternate&&(e.alternate.pendingProps=e.pendingProps);var a=Qn(e,he);a!==null&&qt(a,e,he,mt)},Fh=function(e){var t=Qn(e,he);t!==null&&qt(t,e,he,mt)},Bh=function(e){_h=e},Vh=function(e){Nh=e}}function IT(e){var t=wn(e);return t===null?null:t.stateNode}function $T(e){return null}function eR(){return ma}function tR(e){var t=e.findFiberByHostInstance,n=A.ReactCurrentDispatcher;return Mg({bundleType:e.bundleType,version:e.version,rendererPackageName:e.rendererPackageName,rendererConfig:e.rendererConfig,overrideHookState:Mh,overrideHookStateDeletePath:zh,overrideHookStateRenamePath:Ah,overrideProps:Hh,overridePropsDeletePath:Lh,overridePropsRenamePath:jh,setErrorHandler:Bh,setSuspenseHandler:Vh,scheduleUpdate:Fh,currentDispatcherRef:n,findHostInstanceByFiber:IT,findFiberByHostInstance:t||$T,findHostInstancesForRefresh:DT,scheduleRefresh:CT,scheduleRoot:xT,setRefreshHandler:RT,getCurrentFiber:eR,reconcilerVersion:wT})}return g.attemptContinuousHydration=XT,g.attemptDiscreteHydration=kT,g.attemptHydrationAtCurrentPriority=JT,g.attemptSynchronousHydration=WT,g.batchedUpdates=JE,g.createComponentSelector=DE,g.createContainer=GT,g.createHasPseudoClassSelector=_E,g.createHydrationContainer=PT,g.createPortal=YT,g.createRoleSelector=OE,g.createTestNameSelector=UE,g.createTextSelector=NE,g.deferredUpdates=XE,g.discreteUpdates=ZE,g.findAllNodes=Ko,g.findBoundingRects=AE,g.findHostInstance=qT,g.findHostInstanceWithNoPortals=ZT,g.findHostInstanceWithWarning=QT,g.flushControlled=$E,g.flushPassiveEffects=cr,g.flushSync=ns,g.focusWithin=HE,g.getCurrentUpdatePriority=Ha,g.getFindAllNodesFailureDescription=zE,g.getPublicRootInstance=KT,g.injectIntoDevTools=tR,g.isAlreadyRendering=IE,g.observeVisibleRects=jE,g.registerMutableSourceForHydration=Gb,g.runWithPriority=Rg,g.shouldError=Oh,g.shouldSuspend=Uh,g.updateContainer=xh,g}});var dy=Wr((xC,fy)=>{"use strict";fy.exports=cy()});var gy=Wr(ys=>{"use strict";(function(){"use strict";var p=vr(),c=Symbol.for("react.element"),g=Symbol.for("react.portal"),C=Symbol.for("react.fragment"),b=Symbol.for("react.strict_mode"),A=Symbol.for("react.profiler"),_=Symbol.for("react.provider"),V=Symbol.for("react.context"),j=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),Y=Symbol.for("react.suspense_list"),P=Symbol.for("react.memo"),ge=Symbol.for("react.lazy"),at=Symbol.for("react.offscreen"),Ke=Symbol.iterator,Qe="@@iterator";function We(d){if(d===null||typeof d!="object")return null;var U=Ke&&d[Ke]||d[Qe];return typeof U=="function"?U:null}var xe=p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;function Oe(d){{for(var U=arguments.length,y=new Array(U>1?U-1:0),Z=1;Z<U;Z++)y[Z-1]=arguments[Z];st("error",d,y)}}function st(d,U,y){{var Z=xe.ReactDebugCurrentFrame,Re=Z.getStackAddendum();Re!==""&&(U+="%s",y=y.concat([Re]));var Ee=y.map(function(de){return String(de)});Ee.unshift("Warning: "+U),Function.prototype.apply.call(console[d],console,Ee)}}var gt=!1,xn=!1,Ue=!1,be=!1,It=!1,le;le=Symbol.for("react.module.reference");function Me(d){return!!(typeof d=="string"||typeof d=="function"||d===C||d===A||It||d===b||d===h||d===Y||be||d===at||gt||xn||Ue||typeof d=="object"&&d!==null&&(d.$$typeof===ge||d.$$typeof===P||d.$$typeof===_||d.$$typeof===V||d.$$typeof===j||d.$$typeof===le||d.getModuleId!==void 0))}function te(d,U,y){var Z=d.displayName;if(Z)return Z;var Re=U.displayName||U.name||"";return Re!==""?y+"("+Re+")":y}function Se(d){return d.displayName||"Context"}function De(d){if(d==null)return null;if(typeof d.tag=="number"&&Oe("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof d=="function")return d.displayName||d.name||null;if(typeof d=="string")return d;switch(d){case C:return"Fragment";case g:return"Portal";case A:return"Profiler";case b:return"StrictMode";case h:return"Suspense";case Y:return"SuspenseList"}if(typeof d=="object")switch(d.$$typeof){case V:var U=d;return Se(U)+".Consumer";case _:var y=d;return Se(y._context)+".Provider";case j:return te(d,d.render,"ForwardRef");case P:var Z=d.displayName||null;return Z!==null?Z:De(d.type)||"Memo";case ge:{var Re=d,Ee=Re._payload,de=Re._init;try{return De(de(Ee))}catch(ce){return null}}}return null}var ct=Object.assign,ie=0,Et,ze,Tt,je,ot,Ae,Rt;function Lt(){}Lt.__reactDisabledLog=!0;function Ln(){{if(ie===0){Et=console.log,ze=console.info,Tt=console.warn,je=console.error,ot=console.group,Ae=console.groupCollapsed,Rt=console.groupEnd;var d={configurable:!0,enumerable:!0,value:Lt,writable:!0};Object.defineProperties(console,{info:d,log:d,warn:d,error:d,group:d,groupCollapsed:d,groupEnd:d})}ie++}}function bt(){{if(ie--,ie===0){var d={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:ct({},d,{value:Et}),info:ct({},d,{value:ze}),warn:ct({},d,{value:Tt}),error:ct({},d,{value:je}),group:ct({},d,{value:ot}),groupCollapsed:ct({},d,{value:Ae}),groupEnd:ct({},d,{value:Rt})})}ie<0&&Oe("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var $t=xe.ReactCurrentDispatcher,rt;function jt(d,U,y){{if(rt===void 0)try{throw Error()}catch(Re){var Z=Re.stack.trim().match(/\n( *(at )?)/);rt=Z&&Z[1]||""}return`
`+rt+d}}var kn=!1,jn;{var on=typeof WeakMap=="function"?WeakMap:Map;jn=new on}function sn(d,U){if(!d||kn)return"";{var y=jn.get(d);if(y!==void 0)return y}var Z;kn=!0;var Re=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var Ee;Ee=$t.current,$t.current=null,Ln();try{if(U){var de=function(){throw Error()};if(Object.defineProperty(de.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(de,[])}catch(_t){Z=_t}Reflect.construct(d,[],de)}else{try{de.call()}catch(_t){Z=_t}d.call(de.prototype)}}else{try{throw Error()}catch(_t){Z=_t}d()}}catch(_t){if(_t&&Z&&typeof _t.stack=="string"){for(var ce=_t.stack.split(`
`),Je=Z.stack.split(`
`),Fe=ce.length-1,Be=Je.length-1;Fe>=1&&Be>=0&&ce[Fe]!==Je[Be];)Be--;for(;Fe>=1&&Be>=0;Fe--,Be--)if(ce[Fe]!==Je[Be]){if(Fe!==1||Be!==1)do if(Fe--,Be--,Be<0||ce[Fe]!==Je[Be]){var Xe=`
`+ce[Fe].replace(" at new "," at ");return d.displayName&&Xe.includes("<anonymous>")&&(Xe=Xe.replace("<anonymous>",d.displayName)),typeof d=="function"&&jn.set(d,Xe),Xe}while(Fe>=1&&Be>=0);break}}}finally{kn=!1,$t.current=Ee,bt(),Error.prepareStackTrace=Re}var Gt=d?d.displayName||d.name:"",en=Gt?jt(Gt):"";return typeof d=="function"&&jn.set(d,en),en}function Fn(d,U,y){return sn(d,!1)}function Dn(d){var U=d.prototype;return!!(U&&U.isReactComponent)}function Ut(d,U,y){if(d==null)return"";if(typeof d=="function")return sn(d,Dn(d));if(typeof d=="string")return jt(d);switch(d){case h:return jt("Suspense");case Y:return jt("SuspenseList")}if(typeof d=="object")switch(d.$$typeof){case j:return Fn(d.render);case P:return Ut(d.type,U,y);case ge:{var Z=d,Re=Z._payload,Ee=Z._init;try{return Ut(Ee(Re),U,y)}catch(de){}}}return""}var cn=Object.prototype.hasOwnProperty,_n={},St=xe.ReactDebugCurrentFrame;function Mt(d){if(d){var U=d._owner,y=Ut(d.type,d._source,U?U.type:null);St.setExtraStackFrame(y)}else St.setExtraStackFrame(null)}function Xn(d,U,y,Z,Re){{var Ee=Function.call.bind(cn);for(var de in d)if(Ee(d,de)){var ce=void 0;try{if(typeof d[de]!="function"){var Je=Error((Z||"React class")+": "+y+" type `"+de+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof d[de]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw Je.name="Invariant Violation",Je}ce=d[de](U,de,Z,y,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(Fe){ce=Fe}ce&&!(ce instanceof Error)&&(Mt(Re),Oe("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",Z||"React class",y,de,typeof ce),Mt(null)),ce instanceof Error&&!(ce.message in _n)&&(_n[ce.message]=!0,Mt(Re),Oe("Failed %s type: %s",y,ce.message),Mt(null))}}}var Bn=Array.isArray;function it(d){return Bn(d)}function On(d){{var U=typeof Symbol=="function"&&Symbol.toStringTag,y=U&&d[Symbol.toStringTag]||d.constructor.name||"Object";return y}}function ba(d){try{return ra(d),!1}catch(U){return!0}}function ra(d){return""+d}function ia(d){if(ba(d))return Oe("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",On(d)),ra(d)}var Nn=xe.ReactCurrentOwner,Ua={key:!0,ref:!0,__self:!0,__source:!0},Jn,Ma,q;q={};function ae(d){if(cn.call(d,"ref")){var U=Object.getOwnPropertyDescriptor(d,"ref").get;if(U&&U.isReactWarning)return!1}return d.ref!==void 0}function me(d){if(cn.call(d,"key")){var U=Object.getOwnPropertyDescriptor(d,"key").get;if(U&&U.isReactWarning)return!1}return d.key!==void 0}function ne(d,U){if(typeof d.ref=="string"&&Nn.current&&U&&Nn.current.stateNode!==U){var y=De(Nn.current.type);q[y]||(Oe('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',De(Nn.current.type),d.ref),q[y]=!0)}}function ut(d,U){{var y=function(){Jn||(Jn=!0,Oe("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",U))};y.isReactWarning=!0,Object.defineProperty(d,"key",{get:y,configurable:!0})}}function zt(d,U){{var y=function(){Ma||(Ma=!0,Oe("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",U))};y.isReactWarning=!0,Object.defineProperty(d,"ref",{get:y,configurable:!0})}}var J=function(d,U,y,Z,Re,Ee,de){var ce={$$typeof:c,type:d,key:U,ref:y,props:de,_owner:Ee};return ce._store={},Object.defineProperty(ce._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(ce,"_self",{configurable:!1,enumerable:!1,writable:!1,value:Z}),Object.defineProperty(ce,"_source",{configurable:!1,enumerable:!1,writable:!1,value:Re}),Object.freeze&&(Object.freeze(ce.props),Object.freeze(ce)),ce};function k(d,U,y,Z,Re){{var Ee,de={},ce=null,Je=null;y!==void 0&&(ia(y),ce=""+y),me(U)&&(ia(U.key),ce=""+U.key),ae(U)&&(Je=U.ref,ne(U,Re));for(Ee in U)cn.call(U,Ee)&&!Ua.hasOwnProperty(Ee)&&(de[Ee]=U[Ee]);if(d&&d.defaultProps){var Fe=d.defaultProps;for(Ee in Fe)de[Ee]===void 0&&(de[Ee]=Fe[Ee])}if(ce||Je){var Be=typeof d=="function"?d.displayName||d.name||"Unknown":d;ce&&ut(de,Be),Je&&zt(de,Be)}return J(d,ce,Je,Re,Z,Nn.current,de)}}var $e=xe.ReactCurrentOwner,Ge=xe.ReactDebugCurrentFrame;function oe(d){if(d){var U=d._owner,y=Ut(d.type,d._source,U?U.type:null);Ge.setExtraStackFrame(y)}else Ge.setExtraStackFrame(null)}var Ft;Ft=!1;function Zn(d){return typeof d=="object"&&d!==null&&d.$$typeof===c}function za(){{if($e.current){var d=De($e.current.type);if(d)return`

Check the render method of \``+d+"`."}return""}}function He(d){{if(d!==void 0){var U=d.fileName.replace(/^.*[\\\/]/,""),y=d.lineNumber;return`

Check your code at `+U+":"+y+"."}return""}}var fn={};function Vn(d){{var U=za();if(!U){var y=typeof d=="string"?d:d.displayName||d.name;y&&(U=`

Check the top-level render call using <`+y+">.")}return U}}function Qt(d,U){{if(!d._store||d._store.validated||d.key!=null)return;d._store.validated=!0;var y=Vn(U);if(fn[y])return;fn[y]=!0;var Z="";d&&d._owner&&d._owner!==$e.current&&(Z=" It was passed a child from "+De(d._owner.type)+"."),oe(d),Oe('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',y,Z),oe(null)}}function At(d,U){{if(typeof d!="object")return;if(it(d))for(var y=0;y<d.length;y++){var Z=d[y];Zn(Z)&&Qt(Z,U)}else if(Zn(d))d._store&&(d._store.validated=!0);else if(d){var Re=We(d);if(typeof Re=="function"&&Re!==d.entries)for(var Ee=Re.call(d),de;!(de=Ee.next()).done;)Zn(de.value)&&Qt(de.value,U)}}}function dn(d){{var U=d.type;if(U==null||typeof U=="string")return;var y;if(typeof U=="function")y=U.propTypes;else if(typeof U=="object"&&(U.$$typeof===j||U.$$typeof===P))y=U.propTypes;else return;if(y){var Z=De(U);Xn(y,d.props,"prop",Z,d)}else if(U.PropTypes!==void 0&&!Ft){Ft=!0;var Re=De(U);Oe("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",Re||"Unknown")}typeof U.getDefaultProps=="function"&&!U.getDefaultProps.isReactClassApproved&&Oe("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.")}}function In(d){{for(var U=Object.keys(d.props),y=0;y<U.length;y++){var Z=U[y];if(Z!=="children"&&Z!=="key"){oe(d),Oe("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",Z),oe(null);break}}d.ref!==null&&(oe(d),Oe("Invalid attribute `ref` supplied to `React.Fragment`."),oe(null))}}function Sa(d,U,y,Z,Re,Ee){{var de=Me(d);if(!de){var ce="";(d===void 0||typeof d=="object"&&d!==null&&Object.keys(d).length===0)&&(ce+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var Je=He(Re);Je?ce+=Je:ce+=za();var Fe;d===null?Fe="null":it(d)?Fe="array":d!==void 0&&d.$$typeof===c?(Fe="<"+(De(d.type)||"Unknown")+" />",ce=" Did you accidentally export a JSX literal instead of a component?"):Fe=typeof d,Oe("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",Fe,ce)}var Be=k(d,U,y,Re,Ee);if(Be==null)return Be;if(de){var Xe=U.children;if(Xe!==void 0)if(Z)if(it(Xe)){for(var Gt=0;Gt<Xe.length;Gt++)At(Xe[Gt],d);Object.freeze&&Object.freeze(Xe)}else Oe("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");else At(Xe,d)}return d===C?In(Be):dn(Be),Be}}function _r(d,U,y){return Sa(d,U,y,!0)}function Or(d,U,y){return Sa(d,U,y,!1)}var ua=Or,Ct=_r;ys.Fragment=C,ys.jsx=ua,ys.jsxs=Ct})()});var ru=Wr((UC,by)=>{"use strict";by.exports=gy()});function tu(p){if(p==null||typeof p!="object")return!1;let c=Object.getPrototypeOf(p);return c==null||c===Object.prototype}function Ka(p){return p!=null&&p.kind===3}var dl="__current",wd={},vR=[];function Gd(p,{strict:c=!0,components:g}={}){let C=0,b={strict:c,mounted:!1,channel:p,children:vR,nodes:new WeakSet,parents:new WeakMap,tops:new WeakMap,components:new WeakMap,fragments:new WeakMap};c&&Object.freeze(g);let A={kind:0,options:c?Object.freeze({strict:c,components:g}):{strict:c,components:g},get children(){return b.children},createComponent(_,...V){if(g&&g.indexOf(_)<0)throw new Error(`Unsupported component: ${_}`);let[j,h,...Y]=V,P=j!=null?j:{},ge=[],at={};if(j)for(let xe of Object.keys(j))xe!=="children"&&(at[xe]=Xr(ty(j[xe])));if(h)if(Array.isArray(h))for(let xe of h)ge.push(ln(xe,A));else{ge.push(ln(h,A));for(let xe of Y)ge.push(ln(xe,A))}let Ke=`${C++}`,Qe={externalProps:c?Object.freeze(P):P,internalProps:at,children:c?Object.freeze(ge):ge},We=dr({kind:1,get children(){return Qe.children},get props(){return Qe.externalProps},get remoteProps(){return Qe.internalProps},remove:()=>Jh(We),updateProps:xe=>hR(We,xe,Qe,b),append:(...xe)=>fs(We,xe.map(Oe=>ln(Oe,A)),Qe,b),appendChild:xe=>ds(We,ln(xe,A),Qe,b),removeChild:xe=>vs(We,xe,Qe,b),replaceChildren:(...xe)=>Yd(We,xe.map(Oe=>ln(Oe,A)),Qe,b),insertBefore:(xe,Oe)=>nu(We,ln(xe,A),Oe,Qe,b),insertChildBefore:(xe,Oe)=>nu(We,ln(xe,A),Oe,Qe,b)},wd);b.components.set(We,Qe),Object.defineProperty(We,"type",{value:_,configurable:!1,writable:!1,enumerable:!0}),qd(We,b),Qd(We,Ke,A);for(let xe of Qe.children)pl(We,xe,b);return We},createText(_=""){let V=`${C++}`,j={text:_},h=P=>mR(Y,P,j,b),Y=dr({kind:2,get text(){return j.text},update:h,updateText:h,remove:()=>Jh(Y)},wd);return qd(Y,b),Qd(Y,V,A),Y},createFragment(){let _=`${C++}`,V={children:c?Object.freeze([]):[]},j=dr({kind:3,get children(){return V.children},append:(...h)=>fs(j,h.map(Y=>ln(Y,A)),V,b),appendChild:h=>ds(j,ln(h,A),V,b),removeChild:h=>vs(j,h,V,b),replaceChildren:(...h)=>Yd(j,h.map(Y=>ln(Y,A)),V,b),insertBefore:(h,Y)=>nu(j,ln(h,A),Y,V,b),insertChildBefore:(h,Y)=>nu(j,ln(h,A),Y,V,b)},wd);return b.fragments.set(j,V),qd(j,b),Qd(j,_,A),j},append:(..._)=>fs(A,_.map(V=>ln(V,A)),b,b),appendChild:_=>ds(A,ln(_,A),b,b),replaceChildren:(..._)=>Yd(A,_.map(V=>ln(V,A)),b,b),removeChild:_=>vs(A,_,b,b),insertBefore:(_,V)=>nu(A,ln(_,A),V,b,b),insertChildBefore:(_,V)=>nu(A,ln(_,A),V,b,b),mount(){return b.mounted?Promise.resolve():(b.mounted=!0,Promise.resolve(p(0,b.children.map(ml))))}};return A}function pR(p,{tops:c}){var g;return((g=c.get(p))===null||g===void 0?void 0:g.kind)===0}function ey(p,c){let g=C=>{if("children"in C)for(let b of C.children)c(b),g(b)};g(p)}function vl(p,c,{remote:g,local:C}){let{mounted:b,channel:A}=c;b&&(p.kind===0||pR(p,c))&&g(A),C()}function mR(p,c,g,C){return vl(p,C,{remote:b=>b(3,p.id,c),local:()=>{g.text=c}})}var kr=Symbol("ignore");function hR(p,c,g,C){let{strict:b}=C,{internalProps:A,externalProps:_}=g,V={},j=[],h=!1;for(let Y of Object.keys(c)){if(Y==="children")continue;let P=_[Y],ge=c[Y],at=A[Y],Ke=ty(ge);if(at===Ke&&(Ke==null||typeof Ke!="object"))continue;let[Qe,We]=Pd(at,Ke);We&&j.push(...We),Qe!==kr&&(h=!0,V[Y]=Qe,Ka(P)&&Kd(P,C),Ka(ge)&&pl(p,ge,C))}return vl(p,C,{remote:Y=>{h&&Y(4,p.id,V)},local:()=>{let Y=dr(dr({},_),c);g.externalProps=b?Object.freeze(Y):Y,g.internalProps=dr(dr({},g.internalProps),V);for(let[P,ge]of j)P[dl]=ge}})}function Pd(p,c,g=new Set){return g.has(p)?[kr]:(g.add(p),typeof p=="function"&&dl in p?[typeof c=="function"?kr:Xr(c),[[p,c]]]:Array.isArray(p)?bR(p,c,g):tu(p)&&!Ka(p)?gR(p,c,g):[p===c?kr:c])}function Xr(p,c=new Map){let g=c.get(p);if(g)return g;if(Ka(p))return c.set(p,p),p;if(Array.isArray(p)){let C=[];c.set(p,C);for(let b of p)C.push(Xr(b,c));return C}if(tu(p)){let C={};c.set(p,C);for(let b of Object.keys(p))C[b]=Xr(p[b],c);return C}if(typeof p=="function"){let C=(...b)=>C[dl](...b);return Object.defineProperty(C,dl,{enumerable:!1,configurable:!1,writable:!0,value:p}),c.set(p,C),C}return c.set(p,p),p}function au(p,c=new Set){if(!c.has(p)){if(c.add(p),Array.isArray(p))return p.reduce((g,C)=>{let b=au(C,c);return b?[...g,...b]:g},[]);if(tu(p))return Object.keys(p).reduce((g,C)=>{let b=au(p[C],c);return b?[...g,...b]:g},[]);if(typeof p=="function")return dl in p?[p]:void 0}}function Jh(p){var c;(c=p.parent)===null||c===void 0||c.removeChild(p)}function fs(p,c,g,C){for(let b of c)ds(p,b,g,C)}function ds(p,c,g,C){var b;let{nodes:A,strict:_}=C;if(!A.has(c))throw new Error("Cannot append a node that was not created by this remote root");let V=c.parent,j=(b=V==null?void 0:V.children.indexOf(c))!==null&&b!==void 0?b:-1;return vl(p,C,{remote:h=>{h(1,p.id,j<0?p.children.length:p.children.length-1,ml(c),V?V.id:!1)},local:()=>{pl(p,c,C);let h;if(V){let Y=ny(V,C),P=[...Y.children];P.splice(j,1),V===p?h=P:(Y.children=_?Object.freeze(P):P,h=[...g.children])}else h=[...g.children];h.push(c),g.children=_?Object.freeze(h):h}})}function Yd(p,c,g,C){for(let b of p.children)vs(p,b,g,C);fs(p,c,g,C)}function vs(p,c,g,C){let{strict:b}=C;return vl(p,C,{remote:A=>A(2,p.id,p.children.indexOf(c)),local:()=>{Kd(c,C);let A=[...g.children];A.splice(A.indexOf(c),1),g.children=b?Object.freeze(A):A}})}function nu(p,c,g,C,b){var A;let{strict:_,nodes:V}=b;if(!V.has(c))throw new Error("Cannot insert a node that was not created by this remote root");let j=c.parent,h=(A=j==null?void 0:j.children.indexOf(c))!==null&&A!==void 0?A:-1;return vl(p,b,{remote:Y=>{let P=g==null?p.children.length-1:p.children.indexOf(g);Y(1,p.id,P<h||h<0?P:P-1,ml(c),j?j.id:!1)},local:()=>{pl(p,c,b);let Y;if(j){let P=ny(j,b),ge=[...P.children];ge.splice(h,1),j===p?Y=ge:(P.children=_?Object.freeze(ge):ge,Y=[...C.children])}else Y=[...C.children];g==null?Y.push(c):Y.splice(Y.indexOf(g),0,c),C.children=_?Object.freeze(Y):Y}})}function ln(p,c){return typeof p=="string"?c.createText(p):p}function pl(p,c,g){let{tops:C,parents:b}=g,A=p.kind===0?p:C.get(p);C.set(c,A),b.set(c,p),Zh(c,g),ey(c,_=>{C.set(_,A),Zh(_,g)})}function Zh(p,c){if(p.kind!==1)return;let g=p.props;g&&Object.values(g).forEach(C=>{Ka(C)&&pl(p,C,c)})}function Kd(p,c){let{tops:g,parents:C}=c;g.delete(p),C.delete(p),ey(p,b=>{g.delete(b),Ih(b,c)}),Ih(p,c)}function Ih(p,c){if(p.kind!==1)return;let g=p.remoteProps;for(let C of Object.keys(g!=null?g:{})){let b=g[C];Ka(b)&&Kd(b,c)}}function qd(p,{parents:c,tops:g,nodes:C}){C.add(p),Object.defineProperty(p,"parent",{get(){return c.get(p)},configurable:!0,enumerable:!0}),Object.defineProperty(p,"top",{get(){return g.get(p)},configurable:!0,enumerable:!0})}function ml(p){return p.kind===2?{id:p.id,kind:p.kind,text:p.text}:{id:p.id,kind:p.kind,type:p.type,props:p.remoteProps,children:p.children.map(c=>ml(c))}}function ty(p){return Ka(p)?yR(p):p}function yR(p){return{id:p.id,kind:p.kind,get children(){return p.children.map(c=>ml(c))}}}function ny(p,c){return p.kind===0?c:p.kind===3?c.fragments.get(p):c.components.get(p)}function Qd(p,c,g){Object.defineProperty(p,"id",{value:c,configurable:!0,writable:!1,enumerable:!1}),Object.defineProperty(p,"root",{value:g,configurable:!0,writable:!1,enumerable:!1})}function gR(p,c,g){if(!tu(c)){var C;return[Xr(c),(C=au(p))===null||C===void 0?void 0:C.map(V=>[V,void 0])]}let b=!1,A=[],_={};for(let V in p){let j=p[V];if(!(V in c)){b=!0;let ge=au(j);ge&&A.push(...ge.map(at=>[at,void 0]))}let h=c[V],[Y,P]=Pd(j,h,g);P&&A.push(...P),Y!==kr&&(b=!0,_[V]=Y)}for(let V in c)V in _||(b=!0,_[V]=Xr(c[V]));return[b?_:kr,A]}function bR(p,c,g){if(!Array.isArray(c)){var C;return[Xr(c),(C=au(p))===null||C===void 0?void 0:C.map(Y=>[Y,void 0])]}let b=!1,A=[],_=c.length,V=p.length,j=Math.max(V,_),h=[];for(let Y=0;Y<j;Y++){let P=p[Y],ge=c[Y];if(Y<_){if(Y>=V){b=!0,h[Y]=Xr(ge);continue}let[at,Ke]=Pd(P,ge,g);if(Ke&&A.push(...Ke),at===kr){h[Y]=P;continue}b=!0,h[Y]=at}else{b=!0;let at=au(P);at&&A.push(...at.map(Ke=>[Ke,void 0]))}}return[b?h:kr,A]}function ay(){return(c,g)=>{var C;function b(...A){return eu(this,null,function*(){if(A.length===1)return g(...A);let[{channel:_,components:V},j]=A,h=Gd(_,{components:V,strict:!0}),Y=g(h,j);return typeof Y=="object"&&Y!=null&&"then"in Y&&(Y=yield Y),h.mount(),Y})}return(C=globalThis.shopify)===null||C===void 0||C.extend(c,b),b}}var Wd=ay();var kd="AdminBlock";var Xd="BlockStack";var Jd="Box";var Zd="Divider";var Id="Heading";var $d="InlineStack";var ev="Link";var tv="Text";var Ty=ga(vr(),1);var my=ga(dy(),1);var hy=p=>{var c;return(0,my.default)({now:Date.now,scheduleTimeout:setTimeout,cancelTimeout:clearTimeout,noTimeout:!1,supportsMicrotasks:!0,scheduleMicrotask:vy,queueMicrotask:vy,isPrimaryRenderer:(c=p==null?void 0:p.primary)!==null&&c!==void 0?c:!0,supportsMutation:!0,supportsHydration:!1,supportsPersistence:!1,getRootHostContext(){return{}},getChildHostContext(g){return g},createTextInstance(g,C){return C.createText(g)},createInstance(g,C,b){let V=C,{children:A}=V,_=cs(V,["children"]);return b.createComponent(g,_)},commitTextUpdate(g,C,b){g.update(b)},prepareUpdate(g,C,b,A){let _={},V=!1;for(let j in b)!py(b,j)||j==="children"||(j in A?b[j]!==A[j]&&(V=!0,_[j]=A[j]):(V=!0,_[j]=void 0));for(let j in A)!py(A,j)||j==="children"||j in b||(V=!0,_[j]=A[j]);return V?_:null},commitUpdate(g,C){g.updateProps(C)},appendChildToContainer(g,C){g.append(C)},insertInContainerBefore(g,C,b){g.insertBefore(C,b)},removeChildFromContainer(g,C){g.removeChild(C)},clearContainer(g){for(let C of g.children)g.removeChild(C)},appendInitialChild(g,C){g.append(C)},appendChild(g,C){g.append(C)},insertBefore(g,C,b){g.insertBefore(C,b)},removeChild(g,C){g.removeChild(C)},finalizeInitialChildren(){return!1},shouldSetTextContent(){return!1},getPublicInstance(){},prepareForCommit(){return null},resetAfterCommit(){},commitMount(){},preparePortalMount(){},detachDeletedInstance(){}})};function vy(p){return typeof queueMicrotask=="function"?queueMicrotask:Promise.resolve(null).then(p).catch(SR)}function SR(p){setTimeout(()=>{throw p})}var{hasOwnProperty:ER}={};function py(p,c){return ER.call(p,c)}var yy=ga(vr(),1),hs=(0,yy.createContext)(null);var Ry=ga(ru(),1),Sy=new WeakMap,Ey=0,TR=hy();function nv(p,c,g,C=TR){let b=Sy.get(c);if(!b){var A;let h={container:Number(((A=Ty.version.split("."))===null||A===void 0?void 0:A[0])||18)>=18?C.createContainer(c,Ey,null,!1,null,"r-ui",()=>null,null):C.createContainer(c,Ey,!1,null),renderContext:{root:c,reconciler:C}};Sy.set(c,h),b=h}let{container:_,renderContext:V}=b;C.updateContainer(p&&(0,Ry.jsx)(hs.Provider,{value:V,children:p}),_,null,g)}var pr=ga(vr(),1);var Dy=ga(ru(),1);var Cy=ga(vr(),1);function xy(){let p=(0,Cy.useContext)(hs);if(p==null)throw new Error("No remote-ui Render instance found in context");return p}function Cn(p,{fragmentProps:c}={}){if(!c||!c.length)return p;let g=RR(p,c);return g.displayName=p,g}function RR(p,c){let g=p;return(0,pr.memo)(function(_){var V=_,{children:b=[]}=V,A=cs(V,["children"]);let j=(0,pr.useRef)({}),{root:h,reconciler:Y}=xy(),{props:P,children:ge}=(0,pr.useMemo)(()=>{let at=[],Ke={};for(let Qe of Object.keys(A)){let We=A[Qe];if(c.includes(Qe)&&(0,pr.isValidElement)(We)){let xe=j.current[Qe],Oe=Ka(xe)?xe:h.createFragment();j.current[Qe]=Oe,Object.assign(Oe,{createText(...gt){return h.createText(...gt)},createComponent(gt,...xn){return h.createComponent(gt,...xn)}});let st=Y.createPortal(We,Oe,null,null);at.push(st),Ke[Qe]=Oe}else Ke[Qe]=We,delete j.current[Qe]}return{props:Ke,children:[...pr.Children.toArray(b),...at]}},[b,A,h,Y,j]);return(0,Dy.jsx)(g,kh(dr({},P),{children:ge}))})}var _y=ga(vr(),1),gs=(0,_y.createContext)(null);var Oy=ga(ru(),1);function bs(p,c){return Wd(p,(g,C)=>eu(this,null,function*(){let b=yield c(C);yield new Promise((A,_)=>{try{nv((0,Oy.jsx)(gs.Provider,{value:C,children:b}),g,()=>{A()})}catch(V){console.error(V),_(V)}})}))}var av=Cn(kd);var Ss=Cn(Xd);var Es=Cn(Jd);var rv=Cn(Zd);var hl=Cn(Id);var yl=Cn($d);var iv=Cn(ev);var fe=Cn(tv);var Ny=ga(vr(),1);var Ts=class extends Error{constructor(...c){super(...c),this.name="AdminUIExtensionError"}};function uv(p){let c=(0,Ny.useContext)(gs);if(c==null)throw new Ts("No extension api found.");return c}var gl=ga(vr());var B=ga(ru()),Uy="admin.order-details.block.render",Vx=bs(Uy,()=>(0,B.jsx)(xR,{}));function CR(p){return eu(this,null,function*(){return(yield fetch(`/api/order-recaps/${p}`)).json()})}function xR(){let[p,c]=(0,gl.useState)(),{i18n:g,data:C}=uv(Uy),[b,A]=(0,gl.useState)(!1);return(0,gl.useEffect)(()=>{var _,V;console.log("start  getting data"),CR(`${(V=(_=C.selected)==null?void 0:_[0])==null?void 0:V.id}`.replace("gid://shopify/Order/","")).then(j=>{c(j),console.log("order data",j)}).catch(j=>console.log("errors getting data",j))},[]),(0,B.jsx)(av,{title:"ALL SIGNS OPTIONS",children:(0,B.jsxs)(Ss,{gap:"small small",children:[(0,B.jsx)(yl,{blockAlignment:"end",children:(0,B.jsxs)(hl,{size:4,children:[" ",g.translate("recapTitle"),"  "]})}),(0,B.jsx)(Ss,{children:p==null?void 0:p.map(_=>{var V,j,h,Y,P,ge,at,Ke,Qe,We,xe,Oe,st,gt,xn,Ue,be,It,le,Me,te,Se,De,ct,ie,Et,ze,Tt,je,ot,Ae,Rt,Lt,Ln,bt,$t,rt,jt,kn,jn,on,sn,Fn,Dn,Ut,cn,_n,St,Mt,Xn,Bn,it,On,ba,ra,ia,Nn,Ua,Jn,Ma,q,ae,me,ne,ut,zt,J,k,$e,Ge,oe,Ft,Zn,za,He,fn,Vn,Qt,At,dn,In,Sa,_r,Or,ua,Ct,d,U;return(0,B.jsxs)(Es,{paddingBlockEnd:"base",children:[(0,B.jsxs)(yl,{inlineAlignment:"start",blockAlignment:"center",gap:"base",children:[(0,B.jsxs)(hl,{size:5,children:[" ",(V=_.line_item)==null?void 0:V.title,"   "]}),(0,B.jsxs)(hl,{size:3,children:[" x ",(j=_.line_item)==null?void 0:j.quantity,"   "]})]}),(0,B.jsxs)(Es,{children:[(0,B.jsx)(rv,{}),(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[(h=_.recaps.material)==null?void 0:h.label," : "]}),(0,B.jsxs)(fe,{children:[(Y=_.recaps.material)==null?void 0:Y.value," "]}),(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[(P=_.recaps.sign)==null?void 0:P.size.label," : "]}),(0,B.jsxs)(fe,{children:[" ",`
                ${(Qe=(Ke=(at=(ge=_.recaps.sign)==null?void 0:ge.size)==null?void 0:at.value)==null?void 0:Ke.width)==null?void 0:Qe.label} :
                 ${(Oe=(xe=(We=_.recaps.sign)==null?void 0:We.size)==null?void 0:xe.value)==null?void 0:Oe.width.value}, 
                 ${(Ue=(xn=(gt=(st=_.recaps.sign)==null?void 0:st.size)==null?void 0:gt.value)==null?void 0:xn.height)==null?void 0:Ue.label}:
                  ${(le=(It=(be=_.recaps.sign)==null?void 0:be.size)==null?void 0:It.value)==null?void 0:le.height.value}
                  `," "]}),(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[(De=(Se=(te=(Me=_.recaps.sign)==null?void 0:Me.size)==null?void 0:te.value)==null?void 0:Se.thickness)==null?void 0:De.label," : "]}),(0,B.jsxs)(fe,{children:[(Et=(ie=(ct=_.recaps.sign)==null?void 0:ct.size)==null?void 0:ie.value)==null?void 0:Et.thickness.value," "]}),(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[(ze=_.recaps.sign.shape)==null?void 0:ze.label," : "]}),(0,B.jsxs)(fe,{children:[" ",(Tt=_.recaps.sign.shape)==null?void 0:Tt.value]}),(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[(je=_.recaps.sign.fixingMethod)==null?void 0:je.label," : "]}),(0,B.jsxs)(fe,{children:[" ",(ot=_.recaps.sign.fixingMethod)==null?void 0:ot.value]}),!((Rt=(Ae=_.recaps.sign.border)==null?void 0:Ae.value)!=null&&Rt.face1)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[(Lt=_.recaps.sign.border)==null?void 0:Lt.label," : "]}),(0,B.jsxs)(fe,{children:[" ",(bt=(Ln=_.recaps.sign.border)==null?void 0:Ln.value)==null?void 0:bt.type,", ",($t=_.recaps.sign.border.value)==null?void 0:$t.color," "]})]}),((jt=(rt=_.recaps.sign.border)==null?void 0:rt.value)==null?void 0:jt.face1)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[(kn=_.recaps.sign.border)==null?void 0:kn.label,"-",(on=(jn=_.recaps)==null?void 0:jn.faces)==null?void 0:on.face1,": "]}),(0,B.jsxs)(fe,{children:[" ",(Dn=(Fn=(sn=_.recaps.sign.border)==null?void 0:sn.value)==null?void 0:Fn.face1)==null?void 0:Dn.type,", ",(cn=(Ut=_.recaps.sign.border.value)==null?void 0:Ut.face1)==null?void 0:cn.color," "]})]}),((St=(_n=_.recaps.sign.border)==null?void 0:_n.value)==null?void 0:St.face2)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[(Mt=_.recaps.sign.border)==null?void 0:Mt.label,"-",(Bn=(Xn=_.recaps)==null?void 0:Xn.faces)==null?void 0:Bn.face2,": "]}),(0,B.jsxs)(fe,{children:[" ",(ba=(On=(it=_.recaps.sign.border)==null?void 0:it.value)==null?void 0:On.face2)==null?void 0:ba.type,", ",(ia=(ra=_.recaps.sign.border.value)==null?void 0:ra.face2)==null?void 0:ia.color," "]})]}),!((Nn=_.recaps.sign.color.value)!=null&&Nn.face1)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[(Ua=_.recaps.sign.color)==null?void 0:Ua.label," : "]}),(0,B.jsx)(fe,{children:(Jn=_.recaps.sign.color.value)==null?void 0:Jn.name})]}),((Ma=_.recaps.sign.color.value)==null?void 0:Ma.face1)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[(q=_.recaps.sign.color)==null?void 0:q.label,"-",(me=(ae=_.recaps)==null?void 0:ae.faces)==null?void 0:me.face1,": "]}),(0,B.jsx)(fe,{children:(ut=(ne=_.recaps.sign.color.value)==null?void 0:ne.face1)==null?void 0:ut.name})]}),((zt=_.recaps.sign.color.value)==null?void 0:zt.face2)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[(J=_.recaps.sign.color)==null?void 0:J.label,"-",($e=(k=_.recaps)==null?void 0:k.faces)==null?void 0:$e.face2,": "]}),(0,B.jsx)(fe,{children:(oe=(Ge=_.recaps.sign.color.value)==null?void 0:Ge.face2)==null?void 0:oe.name})]}),!((Zn=(Ft=_.recaps)==null?void 0:Ft.faces)!=null&&Zn.face1)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[_.recaps.texts.label," : "]}),(za=_.recaps.texts.value)==null?void 0:za.map(y=>{var Z,Re,Ee,de,ce,Je,Fe,Be,Xe,Gt,en,_t,Ea,la,vn,wn,$n,oa,ea,sa,ht,Yn,ca,Ta;return(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(fe,{children:y==null?void 0:y.textContent}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:[" Font: ",y==null?void 0:y.fontFamily,"   "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Re=(Z=y==null?void 0:y.values)==null?void 0:Z.width)==null?void 0:Re.label,": ",(de=(Ee=y==null?void 0:y.values)==null?void 0:Ee.width)==null?void 0:de.value,"  "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Je=(ce=y==null?void 0:y.values)==null?void 0:ce.height)==null?void 0:Je.label,": ",(Be=(Fe=y==null?void 0:y.values)==null?void 0:Fe.height)==null?void 0:Be.value,"  "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Gt=(Xe=y==null?void 0:y.values)==null?void 0:Xe.left)==null?void 0:Gt.label,": ",(_t=(en=y==null?void 0:y.values)==null?void 0:en.left)==null?void 0:_t.value," "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(la=(Ea=y==null?void 0:y.values)==null?void 0:Ea.top)==null?void 0:la.label,": ",(wn=(vn=y==null?void 0:y.values)==null?void 0:vn.top)==null?void 0:wn.value,"  "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(oa=($n=y==null?void 0:y.values)==null?void 0:$n.right)==null?void 0:oa.label,": ",(sa=(ea=y==null?void 0:y.values)==null?void 0:ea.right)==null?void 0:sa.value," "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["   ",(Yn=(ht=y==null?void 0:y.values)==null?void 0:ht.bottom)==null?void 0:Yn.label,": ",(Ta=(ca=y==null?void 0:y.values)==null?void 0:ca.bottom)==null?void 0:Ta.value,"  "]})]})})]}),((fn=(He=_.recaps)==null?void 0:He.faces)==null?void 0:fn.face1)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[_.recaps.texts.label,"-",(Qt=(Vn=_.recaps)==null?void 0:Vn.faces)==null?void 0:Qt.face1," : "]}),(dn=(At=_.recaps.texts.value)==null?void 0:At.face1)==null?void 0:dn.map(y=>{var Z,Re,Ee,de,ce,Je,Fe,Be,Xe,Gt,en,_t,Ea,la,vn,wn,$n,oa,ea,sa,ht,Yn,ca,Ta;return(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(fe,{children:y==null?void 0:y.textContent}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:[" Font: ",y==null?void 0:y.fontFamily,"   "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Re=(Z=y==null?void 0:y.values)==null?void 0:Z.width)==null?void 0:Re.label,": ",(de=(Ee=y==null?void 0:y.values)==null?void 0:Ee.width)==null?void 0:de.value,"  "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Je=(ce=y==null?void 0:y.values)==null?void 0:ce.height)==null?void 0:Je.label,": ",(Be=(Fe=y==null?void 0:y.values)==null?void 0:Fe.height)==null?void 0:Be.value,"  "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Gt=(Xe=y==null?void 0:y.values)==null?void 0:Xe.left)==null?void 0:Gt.label,": ",(_t=(en=y==null?void 0:y.values)==null?void 0:en.left)==null?void 0:_t.value," "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(la=(Ea=y==null?void 0:y.values)==null?void 0:Ea.top)==null?void 0:la.label,": ",(wn=(vn=y==null?void 0:y.values)==null?void 0:vn.top)==null?void 0:wn.value,"  "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(oa=($n=y==null?void 0:y.values)==null?void 0:$n.right)==null?void 0:oa.label,": ",(sa=(ea=y==null?void 0:y.values)==null?void 0:ea.right)==null?void 0:sa.value," "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["   ",(Yn=(ht=y==null?void 0:y.values)==null?void 0:ht.bottom)==null?void 0:Yn.label,": ",(Ta=(ca=y==null?void 0:y.values)==null?void 0:ca.bottom)==null?void 0:Ta.value,"  "]})]})})]}),((Sa=(In=_.recaps)==null?void 0:In.faces)==null?void 0:Sa.face2)&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(fe,{fontWeight:"bold-300",children:[_.recaps.texts.label,"-",(Or=(_r=_.recaps)==null?void 0:_r.faces)==null?void 0:Or.face2," : "]}),(Ct=(ua=_.recaps.texts.value)==null?void 0:ua.face2)==null?void 0:Ct.map(y=>{var Z,Re,Ee,de,ce,Je,Fe,Be,Xe,Gt,en,_t,Ea,la,vn,wn,$n,oa,ea,sa,ht,Yn,ca,Ta;return(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(fe,{children:y==null?void 0:y.textContent}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:[" Font: ",y==null?void 0:y.fontFamily,"   "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Re=(Z=y==null?void 0:y.values)==null?void 0:Z.width)==null?void 0:Re.label,": ",(de=(Ee=y==null?void 0:y.values)==null?void 0:Ee.width)==null?void 0:de.value,"  "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Je=(ce=y==null?void 0:y.values)==null?void 0:ce.height)==null?void 0:Je.label,": ",(Be=(Fe=y==null?void 0:y.values)==null?void 0:Fe.height)==null?void 0:Be.value,"  "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(Gt=(Xe=y==null?void 0:y.values)==null?void 0:Xe.left)==null?void 0:Gt.label,": ",(_t=(en=y==null?void 0:y.values)==null?void 0:en.left)==null?void 0:_t.value," "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(la=(Ea=y==null?void 0:y.values)==null?void 0:Ea.top)==null?void 0:la.label,": ",(wn=(vn=y==null?void 0:y.values)==null?void 0:vn.top)==null?void 0:wn.value,"  "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["  ",(oa=($n=y==null?void 0:y.values)==null?void 0:$n.right)==null?void 0:oa.label,": ",(sa=(ea=y==null?void 0:y.values)==null?void 0:ea.right)==null?void 0:sa.value," "]}),(0,B.jsxs)(fe,{fontStyle:"italic",fontWeight:"bold-200",children:["   ",(Yn=(ht=y==null?void 0:y.values)==null?void 0:ht.bottom)==null?void 0:Yn.label,": ",(Ta=(ca=y==null?void 0:y.values)==null?void 0:ca.bottom)==null?void 0:Ta.value,"  "]})]})})]}),(0,B.jsx)(yl,{inlineAlignment:"space-between",children:(0,B.jsx)(iv,{href:(U=(d=_.recaps)==null?void 0:d.filesUrl)==null?void 0:U.zipUrl,children:g.translate("bownloadBtn")})})]})]})})})]})})}})();
;
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
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha;
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
                (_e = variantRecap.recaps.sign) == null ? void 0 : _e.size.label,
                " : "
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { children: [
                " ",
                `
                ${(_i = (_h = (_g = (_f = variantRecap.recaps.sign) == null ? void 0 : _f.size) == null ? void 0 : _g.value) == null ? void 0 : _h.width) == null ? void 0 : _i.label} :
                 ${(_l = (_k = (_j = variantRecap.recaps.sign) == null ? void 0 : _j.size) == null ? void 0 : _k.value) == null ? void 0 : _l.width.value}, 
                 ${(_p = (_o = (_n = (_m = variantRecap.recaps.sign) == null ? void 0 : _m.size) == null ? void 0 : _n.value) == null ? void 0 : _o.height) == null ? void 0 : _p.label}:
                  ${(_s = (_r = (_q = variantRecap.recaps.sign) == null ? void 0 : _q.size) == null ? void 0 : _r.value) == null ? void 0 : _s.height.value}
                  `,
                " "
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontWeight: "bold-300", children: [
                (_w = (_v = (_u = (_t = variantRecap.recaps.sign) == null ? void 0 : _t.size) == null ? void 0 : _u.value) == null ? void 0 : _v.thickness) == null ? void 0 : _w.label,
                " : "
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { children: [
                (_z = (_y = (_x = variantRecap.recaps.sign) == null ? void 0 : _x.size) == null ? void 0 : _y.value) == null ? void 0 : _z.thickness.value,
                " "
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontWeight: "bold-300", children: [
                (_A = variantRecap.recaps.sign.shape) == null ? void 0 : _A.label,
                " : "
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { children: [
                " ",
                (_B = variantRecap.recaps.sign.shape) == null ? void 0 : _B.value
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontWeight: "bold-300", children: [
                (_C = variantRecap.recaps.sign.fixingMethod) == null ? void 0 : _C.label,
                " : "
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { children: [
                " ",
                (_D = variantRecap.recaps.sign.fixingMethod) == null ? void 0 : _D.value
              ] }),
              !((_F = (_E = variantRecap.recaps.sign.border) == null ? void 0 : _E.value) == null ? void 0 : _F.face1) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontWeight: "bold-300", children: [
                  (_G = variantRecap.recaps.sign.border) == null ? void 0 : _G.label,
                  " : "
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { children: [
                  " ",
                  (_I = (_H = variantRecap.recaps.sign.border) == null ? void 0 : _H.value) == null ? void 0 : _I.type,
                  ", ",
                  (_J = variantRecap.recaps.sign.border.value) == null ? void 0 : _J.color,
                  " "
                ] })
              ] }),
              ((_L = (_K = variantRecap.recaps.sign.border) == null ? void 0 : _K.value) == null ? void 0 : _L.face1) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontWeight: "bold-300", children: [
                  (_M = variantRecap.recaps.sign.border) == null ? void 0 : _M.label,
                  "-",
                  (_O = (_N = variantRecap.recaps) == null ? void 0 : _N.faces) == null ? void 0 : _O.face1,
                  ": "
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { children: [
                  " ",
                  (_R = (_Q = (_P = variantRecap.recaps.sign.border) == null ? void 0 : _P.value) == null ? void 0 : _Q.face1) == null ? void 0 : _R.type,
                  ", ",
                  (_T = (_S = variantRecap.recaps.sign.border.value) == null ? void 0 : _S.face1) == null ? void 0 : _T.color,
                  " "
                ] })
              ] }),
              ((_V = (_U = variantRecap.recaps.sign.border) == null ? void 0 : _U.value) == null ? void 0 : _V.face2) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontWeight: "bold-300", children: [
                  (_W = variantRecap.recaps.sign.border) == null ? void 0 : _W.label,
                  "-",
                  (_Y = (_X = variantRecap.recaps) == null ? void 0 : _X.faces) == null ? void 0 : _Y.face2,
                  ": "
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { children: [
                  " ",
                  (_$ = (__ = (_Z = variantRecap.recaps.sign.border) == null ? void 0 : _Z.value) == null ? void 0 : __.face2) == null ? void 0 : _$.type,
                  ", ",
                  (_ba = (_aa = variantRecap.recaps.sign.border.value) == null ? void 0 : _aa.face2) == null ? void 0 : _ba.color,
                  " "
                ] })
              ] }),
              !((_ca = variantRecap.recaps.sign.color.value) == null ? void 0 : _ca.face1) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontWeight: "bold-300", children: [
                  (_da = variantRecap.recaps.sign.color) == null ? void 0 : _da.label,
                  " : "
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Text2, { children: (_ea = variantRecap.recaps.sign.color.value) == null ? void 0 : _ea.name })
              ] }),
              ((_fa = variantRecap.recaps.sign.color.value) == null ? void 0 : _fa.face1) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontWeight: "bold-300", children: [
                  (_ga = variantRecap.recaps.sign.color) == null ? void 0 : _ga.label,
                  "-",
                  (_ia = (_ha = variantRecap.recaps) == null ? void 0 : _ha.faces) == null ? void 0 : _ia.face1,
                  ": "
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Text2, { children: (_ka = (_ja = variantRecap.recaps.sign.color.value) == null ? void 0 : _ja.face1) == null ? void 0 : _ka.name })
              ] }),
              ((_la = variantRecap.recaps.sign.color.value) == null ? void 0 : _la.face2) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontWeight: "bold-300", children: [
                  (_ma = variantRecap.recaps.sign.color) == null ? void 0 : _ma.label,
                  "-",
                  (_oa = (_na = variantRecap.recaps) == null ? void 0 : _na.faces) == null ? void 0 : _oa.face2,
                  ": "
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Text2, { children: (_qa = (_pa = variantRecap.recaps.sign.color.value) == null ? void 0 : _pa.face2) == null ? void 0 : _qa.name })
              ] }),
              !((_sa = (_ra = variantRecap.recaps) == null ? void 0 : _ra.faces) == null ? void 0 : _sa.face1) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontWeight: "bold-300", children: [
                  variantRecap.recaps.texts.label,
                  " : "
                ] }),
                (_ta = variantRecap.recaps.texts.value) == null ? void 0 : _ta.map((text) => {
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
              ((_va = (_ua = variantRecap.recaps) == null ? void 0 : _ua.faces) == null ? void 0 : _va.face1) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontWeight: "bold-300", children: [
                  variantRecap.recaps.texts.label,
                  "-",
                  (_xa = (_wa = variantRecap.recaps) == null ? void 0 : _wa.faces) == null ? void 0 : _xa.face1,
                  " : "
                ] }),
                (_za = (_ya = variantRecap.recaps.texts.value) == null ? void 0 : _ya.face1) == null ? void 0 : _za.map((text) => {
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
              ((_Ba = (_Aa = variantRecap.recaps) == null ? void 0 : _Aa.faces) == null ? void 0 : _Ba.face2) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text2, { fontWeight: "bold-300", children: [
                  variantRecap.recaps.texts.label,
                  "-",
                  (_Da = (_Ca = variantRecap.recaps) == null ? void 0 : _Ca.faces) == null ? void 0 : _Da.face2,
                  " : "
                ] }),
                (_Fa = (_Ea = variantRecap.recaps.texts.value) == null ? void 0 : _Ea.face2) == null ? void 0 : _Fa.map((text) => {
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
                  href: (_Ha = (_Ga = variantRecap.recaps) == null ? void 0 : _Ga.filesUrl) == null ? void 0 : _Ha.zipUrl,
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
