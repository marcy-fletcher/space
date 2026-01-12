function pr(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Oe={exports:{}},fe={};var bt;function hr(){if(bt)return fe;bt=1;var e=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function a(r,n,i){var o=null;if(i!==void 0&&(o=""+i),n.key!==void 0&&(o=""+n.key),"key"in n){i={};for(var l in n)l!=="key"&&(i[l]=n[l])}else i=n;return n=i.ref,{$$typeof:e,type:r,key:o,ref:n!==void 0?n:null,props:i}}return fe.Fragment=t,fe.jsx=a,fe.jsxs=a,fe}var xt;function gr(){return xt||(xt=1,Oe.exports=hr()),Oe.exports}var ps=gr(),Fe={exports:{}},g={};var St;function yr(){if(St)return g;St=1;var e=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),a=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),n=Symbol.for("react.profiler"),i=Symbol.for("react.consumer"),o=Symbol.for("react.context"),l=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),m=Symbol.for("react.lazy"),v=Symbol.for("react.activity"),S=Symbol.iterator;function h(s){return s===null||typeof s!="object"?null:(s=S&&s[S]||s["@@iterator"],typeof s=="function"?s:null)}var k={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},A=Object.assign,I={};function C(s,u,b){this.props=s,this.context=u,this.refs=I,this.updater=b||k}C.prototype.isReactComponent={},C.prototype.setState=function(s,u){if(typeof s!="object"&&typeof s!="function"&&s!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,s,u,"setState")},C.prototype.forceUpdate=function(s){this.updater.enqueueForceUpdate(this,s,"forceUpdate")};function N(){}N.prototype=C.prototype;function z(s,u,b){this.props=s,this.context=u,this.refs=I,this.updater=b||k}var F=z.prototype=new N;F.constructor=z,A(F,C.prototype),F.isPureReactComponent=!0;var w=Array.isArray;function q(){}var P={H:null,A:null,T:null,S:null},ee=Object.prototype.hasOwnProperty;function le(s,u,b){var y=b.ref;return{$$typeof:e,type:s,key:u,ref:y!==void 0?y:null,props:b}}function fr(s,u){return le(s.type,u,s.props)}function ze(s){return typeof s=="object"&&s!==null&&s.$$typeof===e}function cr(s){var u={"=":"=0",":":"=2"};return"$"+s.replace(/[=:]/g,function(b){return u[b]})}var gt=/\/+/g;function Te(s,u){return typeof s=="object"&&s!==null&&s.key!=null?cr(""+s.key):u.toString(36)}function ur(s){switch(s.status){case"fulfilled":return s.value;case"rejected":throw s.reason;default:switch(typeof s.status=="string"?s.then(q,q):(s.status="pending",s.then(function(u){s.status==="pending"&&(s.status="fulfilled",s.value=u)},function(u){s.status==="pending"&&(s.status="rejected",s.reason=u)})),s.status){case"fulfilled":return s.value;case"rejected":throw s.reason}}throw s}function te(s,u,b,y,E){var L=typeof s;(L==="undefined"||L==="boolean")&&(s=null);var _=!1;if(s===null)_=!0;else switch(L){case"bigint":case"string":case"number":_=!0;break;case"object":switch(s.$$typeof){case e:case t:_=!0;break;case m:return _=s._init,te(_(s._payload),u,b,y,E)}}if(_)return E=E(s),_=y===""?"."+Te(s,0):y,w(E)?(b="",_!=null&&(b=_.replace(gt,"$&/")+"/"),te(E,u,b,"",function(vr){return vr})):E!=null&&(ze(E)&&(E=fr(E,b+(E.key==null||s&&s.key===E.key?"":(""+E.key).replace(gt,"$&/")+"/")+_)),u.push(E)),1;_=0;var D=y===""?".":y+":";if(w(s))for(var O=0;O<s.length;O++)y=s[O],L=D+Te(y,O),_+=te(y,u,b,L,E);else if(O=h(s),typeof O=="function")for(s=O.call(s),O=0;!(y=s.next()).done;)y=y.value,L=D+Te(y,O++),_+=te(y,u,b,L,E);else if(L==="object"){if(typeof s.then=="function")return te(ur(s),u,b,y,E);throw u=String(s),Error("Objects are not valid as a React child (found: "+(u==="[object Object]"?"object with keys {"+Object.keys(s).join(", ")+"}":u)+"). If you meant to render a collection of children, use an array instead.")}return _}function be(s,u,b){if(s==null)return s;var y=[],E=0;return te(s,y,"","",function(L){return u.call(b,L,E++)}),y}function dr(s){if(s._status===-1){var u=s._result;u=u(),u.then(function(b){(s._status===0||s._status===-1)&&(s._status=1,s._result=b)},function(b){(s._status===0||s._status===-1)&&(s._status=2,s._result=b)}),s._status===-1&&(s._status=0,s._result=u)}if(s._status===1)return s._result.default;throw s._result}var yt=typeof reportError=="function"?reportError:function(s){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var u=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof s=="object"&&s!==null&&typeof s.message=="string"?String(s.message):String(s),error:s});if(!window.dispatchEvent(u))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",s);return}console.error(s)},mr={map:be,forEach:function(s,u,b){be(s,function(){u.apply(this,arguments)},b)},count:function(s){var u=0;return be(s,function(){u++}),u},toArray:function(s){return be(s,function(u){return u})||[]},only:function(s){if(!ze(s))throw Error("React.Children.only expected to receive a single React element child.");return s}};return g.Activity=v,g.Children=mr,g.Component=C,g.Fragment=a,g.Profiler=n,g.PureComponent=z,g.StrictMode=r,g.Suspense=f,g.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=P,g.__COMPILER_RUNTIME={__proto__:null,c:function(s){return P.H.useMemoCache(s)}},g.cache=function(s){return function(){return s.apply(null,arguments)}},g.cacheSignal=function(){return null},g.cloneElement=function(s,u,b){if(s==null)throw Error("The argument must be a React element, but you passed "+s+".");var y=A({},s.props),E=s.key;if(u!=null)for(L in u.key!==void 0&&(E=""+u.key),u)!ee.call(u,L)||L==="key"||L==="__self"||L==="__source"||L==="ref"&&u.ref===void 0||(y[L]=u[L]);var L=arguments.length-2;if(L===1)y.children=b;else if(1<L){for(var _=Array(L),D=0;D<L;D++)_[D]=arguments[D+2];y.children=_}return le(s.type,E,y)},g.createContext=function(s){return s={$$typeof:o,_currentValue:s,_currentValue2:s,_threadCount:0,Provider:null,Consumer:null},s.Provider=s,s.Consumer={$$typeof:i,_context:s},s},g.createElement=function(s,u,b){var y,E={},L=null;if(u!=null)for(y in u.key!==void 0&&(L=""+u.key),u)ee.call(u,y)&&y!=="key"&&y!=="__self"&&y!=="__source"&&(E[y]=u[y]);var _=arguments.length-2;if(_===1)E.children=b;else if(1<_){for(var D=Array(_),O=0;O<_;O++)D[O]=arguments[O+2];E.children=D}if(s&&s.defaultProps)for(y in _=s.defaultProps,_)E[y]===void 0&&(E[y]=_[y]);return le(s,L,E)},g.createRef=function(){return{current:null}},g.forwardRef=function(s){return{$$typeof:l,render:s}},g.isValidElement=ze,g.lazy=function(s){return{$$typeof:m,_payload:{_status:-1,_result:s},_init:dr}},g.memo=function(s,u){return{$$typeof:d,type:s,compare:u===void 0?null:u}},g.startTransition=function(s){var u=P.T,b={};P.T=b;try{var y=s(),E=P.S;E!==null&&E(b,y),typeof y=="object"&&y!==null&&typeof y.then=="function"&&y.then(q,yt)}catch(L){yt(L)}finally{u!==null&&b.types!==null&&(u.types=b.types),P.T=u}},g.unstable_useCacheRefresh=function(){return P.H.useCacheRefresh()},g.use=function(s){return P.H.use(s)},g.useActionState=function(s,u,b){return P.H.useActionState(s,u,b)},g.useCallback=function(s,u){return P.H.useCallback(s,u)},g.useContext=function(s){return P.H.useContext(s)},g.useDebugValue=function(){},g.useDeferredValue=function(s,u){return P.H.useDeferredValue(s,u)},g.useEffect=function(s,u){return P.H.useEffect(s,u)},g.useEffectEvent=function(s){return P.H.useEffectEvent(s)},g.useId=function(){return P.H.useId()},g.useImperativeHandle=function(s,u,b){return P.H.useImperativeHandle(s,u,b)},g.useInsertionEffect=function(s,u){return P.H.useInsertionEffect(s,u)},g.useLayoutEffect=function(s,u){return P.H.useLayoutEffect(s,u)},g.useMemo=function(s,u){return P.H.useMemo(s,u)},g.useOptimistic=function(s,u){return P.H.useOptimistic(s,u)},g.useReducer=function(s,u,b){return P.H.useReducer(s,u,b)},g.useRef=function(s){return P.H.useRef(s)},g.useState=function(s){return P.H.useState(s)},g.useSyncExternalStore=function(s,u,b){return P.H.useSyncExternalStore(s,u,b)},g.useTransition=function(){return P.H.useTransition()},g.version="19.2.3",g}var wt;function br(){return wt||(wt=1,Fe.exports=yr()),Fe.exports}var aa=br();const ra=pr(aa);function He(e,t){(t==null||t>e.length)&&(t=e.length);for(var a=0,r=Array(t);a<t;a++)r[a]=e[a];return r}function xr(e){if(Array.isArray(e))return e}function Sr(e){if(Array.isArray(e))return He(e)}function wr(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Ar(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,na(r.key),r)}}function Er(e,t,a){return t&&Ar(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e}function we(e,t){var a=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(!a){if(Array.isArray(e)||(a=it(e))||t){a&&(e=a);var r=0,n=function(){};return{s:n,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(f){throw f},f:n}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var i,o=!0,l=!1;return{s:function(){a=a.call(e)},n:function(){var f=a.next();return o=f.done,f},e:function(f){l=!0,i=f},f:function(){try{o||a.return==null||a.return()}finally{if(l)throw i}}}}function x(e,t,a){return(t=na(t))in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function kr(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Cr(e,t){var a=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(a!=null){var r,n,i,o,l=[],f=!0,d=!1;try{if(i=(a=a.call(e)).next,t===0){if(Object(a)!==a)return;f=!1}else for(;!(f=(r=i.call(a)).done)&&(l.push(r.value),l.length!==t);f=!0);}catch(m){d=!0,n=m}finally{try{if(!f&&a.return!=null&&(o=a.return(),Object(o)!==o))return}finally{if(d)throw n}}return l}}function Lr(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Pr(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function At(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),a.push.apply(a,r)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]!=null?arguments[t]:{};t%2?At(Object(a),!0).forEach(function(r){x(e,r,a[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):At(Object(a)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(a,r))})}return e}function Pe(e,t){return xr(e)||Cr(e,t)||it(e,t)||Lr()}function $(e){return Sr(e)||kr(e)||it(e)||Pr()}function Ir(e,t){if(typeof e!="object"||!e)return e;var a=e[Symbol.toPrimitive];if(a!==void 0){var r=a.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function na(e){var t=Ir(e,"string");return typeof t=="symbol"?t:t+""}function ke(e){"@babel/helpers - typeof";return ke=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ke(e)}function it(e,t){if(e){if(typeof e=="string")return He(e,t);var a={}.toString.call(e).slice(8,-1);return a==="Object"&&e.constructor&&(a=e.constructor.name),a==="Map"||a==="Set"?Array.from(e):a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?He(e,t):void 0}}var Et=function(){},ot={},ia={},oa=null,sa={mark:Et,measure:Et};try{typeof window<"u"&&(ot=window),typeof document<"u"&&(ia=document),typeof MutationObserver<"u"&&(oa=MutationObserver),typeof performance<"u"&&(sa=performance)}catch{}var _r=ot.navigator||{},kt=_r.userAgent,Ct=kt===void 0?"":kt,X=ot,M=ia,Lt=oa,xe=sa;X.document;var G=!!M.documentElement&&!!M.head&&typeof M.addEventListener=="function"&&typeof M.createElement=="function",la=~Ct.indexOf("MSIE")||~Ct.indexOf("Trident/"),Re,Mr=/fa(k|kd|s|r|l|t|d|dr|dl|dt|b|slr|slpr|wsb|tl|ns|nds|es|jr|jfr|jdr|usb|ufsb|udsb|cr|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,Nr=/Font ?Awesome ?([567 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit|Notdog Duo|Notdog|Chisel|Etch|Thumbprint|Jelly Fill|Jelly Duo|Jelly|Utility|Utility Fill|Utility Duo|Slab Press|Slab|Whiteboard)?.*/i,fa={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"},slab:{"fa-regular":"regular",faslr:"regular"},"slab-press":{"fa-regular":"regular",faslpr:"regular"},thumbprint:{"fa-light":"light",fatl:"light"},whiteboard:{"fa-semibold":"semibold",fawsb:"semibold"},notdog:{"fa-solid":"solid",fans:"solid"},"notdog-duo":{"fa-solid":"solid",fands:"solid"},etch:{"fa-solid":"solid",faes:"solid"},jelly:{"fa-regular":"regular",fajr:"regular"},"jelly-fill":{"fa-regular":"regular",fajfr:"regular"},"jelly-duo":{"fa-regular":"regular",fajdr:"regular"},chisel:{"fa-regular":"regular",facr:"regular"},utility:{"fa-semibold":"semibold",fausb:"semibold"},"utility-duo":{"fa-semibold":"semibold",faudsb:"semibold"},"utility-fill":{"fa-semibold":"semibold",faufsb:"semibold"}},zr={GROUP:"duotone-group",PRIMARY:"primary",SECONDARY:"secondary"},ca=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press","fa-utility","fa-utility-duo","fa-utility-fill"],T="classic",he="duotone",ua="sharp",da="sharp-duotone",ma="chisel",va="etch",pa="jelly",ha="jelly-duo",ga="jelly-fill",ya="notdog",ba="notdog-duo",xa="slab",Sa="slab-press",wa="thumbprint",Aa="utility",Ea="utility-duo",ka="utility-fill",Ca="whiteboard",Tr="Classic",Or="Duotone",Fr="Sharp",Rr="Sharp Duotone",jr="Chisel",$r="Etch",Dr="Jelly",Ur="Jelly Duo",Wr="Jelly Fill",Yr="Notdog",Hr="Notdog Duo",Br="Slab",Gr="Slab Press",qr="Thumbprint",Xr="Utility",Vr="Utility Duo",Jr="Utility Fill",Kr="Whiteboard",La=[T,he,ua,da,ma,va,pa,ha,ga,ya,ba,xa,Sa,wa,Aa,Ea,ka,Ca];Re={},x(x(x(x(x(x(x(x(x(x(Re,T,Tr),he,Or),ua,Fr),da,Rr),ma,jr),va,$r),pa,Dr),ha,Ur),ga,Wr),ya,Yr),x(x(x(x(x(x(x(x(Re,ba,Hr),xa,Br),Sa,Gr),wa,qr),Aa,Xr),Ea,Vr),ka,Jr),Ca,Kr);var Qr={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"},slab:{400:"faslr"},"slab-press":{400:"faslpr"},whiteboard:{600:"fawsb"},thumbprint:{300:"fatl"},notdog:{900:"fans"},"notdog-duo":{900:"fands"},etch:{900:"faes"},chisel:{400:"facr"},jelly:{400:"fajr"},"jelly-fill":{400:"fajfr"},"jelly-duo":{400:"fajdr"},utility:{600:"fausb"},"utility-duo":{600:"faudsb"},"utility-fill":{600:"faufsb"}},Zr={"Font Awesome 7 Free":{900:"fas",400:"far"},"Font Awesome 7 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 7 Brands":{400:"fab",normal:"fab"},"Font Awesome 7 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 7 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 7 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"},"Font Awesome 7 Jelly":{400:"fajr",normal:"fajr"},"Font Awesome 7 Jelly Fill":{400:"fajfr",normal:"fajfr"},"Font Awesome 7 Jelly Duo":{400:"fajdr",normal:"fajdr"},"Font Awesome 7 Slab":{400:"faslr",normal:"faslr"},"Font Awesome 7 Slab Press":{400:"faslpr",normal:"faslpr"},"Font Awesome 7 Thumbprint":{300:"fatl",normal:"fatl"},"Font Awesome 7 Notdog":{900:"fans",normal:"fans"},"Font Awesome 7 Notdog Duo":{900:"fands",normal:"fands"},"Font Awesome 7 Etch":{900:"faes",normal:"faes"},"Font Awesome 7 Chisel":{400:"facr",normal:"facr"},"Font Awesome 7 Whiteboard":{600:"fawsb",normal:"fawsb"},"Font Awesome 7 Utility":{600:"fausb",normal:"fausb"},"Font Awesome 7 Utility Duo":{600:"faudsb",normal:"faudsb"},"Font Awesome 7 Utility Fill":{600:"faufsb",normal:"faufsb"}},en=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["chisel",{defaultShortPrefixId:"facr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["etch",{defaultShortPrefixId:"faes",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["jelly",{defaultShortPrefixId:"fajr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-duo",{defaultShortPrefixId:"fajdr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-fill",{defaultShortPrefixId:"fajfr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["notdog",{defaultShortPrefixId:"fans",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["notdog-duo",{defaultShortPrefixId:"fands",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["slab",{defaultShortPrefixId:"faslr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["slab-press",{defaultShortPrefixId:"faslpr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["thumbprint",{defaultShortPrefixId:"fatl",defaultStyleId:"light",styleIds:["light"],futureStyleIds:[],defaultFontWeight:300}],["utility",{defaultShortPrefixId:"fausb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}],["utility-duo",{defaultShortPrefixId:"faudsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}],["utility-fill",{defaultShortPrefixId:"faufsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}],["whiteboard",{defaultShortPrefixId:"fawsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}]]),tn={chisel:{regular:"facr"},classic:{brands:"fab",light:"fal",regular:"far",solid:"fas",thin:"fat"},duotone:{light:"fadl",regular:"fadr",solid:"fad",thin:"fadt"},etch:{solid:"faes"},jelly:{regular:"fajr"},"jelly-duo":{regular:"fajdr"},"jelly-fill":{regular:"fajfr"},notdog:{solid:"fans"},"notdog-duo":{solid:"fands"},sharp:{light:"fasl",regular:"fasr",solid:"fass",thin:"fast"},"sharp-duotone":{light:"fasdl",regular:"fasdr",solid:"fasds",thin:"fasdt"},slab:{regular:"faslr"},"slab-press":{regular:"faslpr"},thumbprint:{light:"fatl"},utility:{semibold:"fausb"},"utility-duo":{semibold:"faudsb"},"utility-fill":{semibold:"faufsb"},whiteboard:{semibold:"fawsb"}},Pa=["fak","fa-kit","fakd","fa-kit-duotone"],Pt={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},an=["kit"],rn="kit",nn="kit-duotone",on="Kit",sn="Kit Duotone";x(x({},rn,on),nn,sn);var ln={kit:{"fa-kit":"fak"}},fn={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},cn={kit:{fak:"fa-kit"}},It={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},je,Se={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},un=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press","fa-utility","fa-utility-duo","fa-utility-fill"],dn="classic",mn="duotone",vn="sharp",pn="sharp-duotone",hn="chisel",gn="etch",yn="jelly",bn="jelly-duo",xn="jelly-fill",Sn="notdog",wn="notdog-duo",An="slab",En="slab-press",kn="thumbprint",Cn="utility",Ln="utility-duo",Pn="utility-fill",In="whiteboard",_n="Classic",Mn="Duotone",Nn="Sharp",zn="Sharp Duotone",Tn="Chisel",On="Etch",Fn="Jelly",Rn="Jelly Duo",jn="Jelly Fill",$n="Notdog",Dn="Notdog Duo",Un="Slab",Wn="Slab Press",Yn="Thumbprint",Hn="Utility",Bn="Utility Duo",Gn="Utility Fill",qn="Whiteboard";je={},x(x(x(x(x(x(x(x(x(x(je,dn,_n),mn,Mn),vn,Nn),pn,zn),hn,Tn),gn,On),yn,Fn),bn,Rn),xn,jn),Sn,$n),x(x(x(x(x(x(x(x(je,wn,Dn),An,Un),En,Wn),kn,Yn),Cn,Hn),Ln,Bn),Pn,Gn),In,qn);var Xn="kit",Vn="kit-duotone",Jn="Kit",Kn="Kit Duotone";x(x({},Xn,Jn),Vn,Kn);var Qn={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"},slab:{"fa-regular":"faslr"},"slab-press":{"fa-regular":"faslpr"},whiteboard:{"fa-semibold":"fawsb"},thumbprint:{"fa-light":"fatl"},notdog:{"fa-solid":"fans"},"notdog-duo":{"fa-solid":"fands"},etch:{"fa-solid":"faes"},jelly:{"fa-regular":"fajr"},"jelly-fill":{"fa-regular":"fajfr"},"jelly-duo":{"fa-regular":"fajdr"},chisel:{"fa-regular":"facr"},utility:{"fa-semibold":"fausb"},"utility-duo":{"fa-semibold":"faudsb"},"utility-fill":{"fa-semibold":"faufsb"}},Zn={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"],slab:["faslr"],"slab-press":["faslpr"],whiteboard:["fawsb"],thumbprint:["fatl"],notdog:["fans"],"notdog-duo":["fands"],etch:["faes"],jelly:["fajr"],"jelly-fill":["fajfr"],"jelly-duo":["fajdr"],chisel:["facr"],utility:["fausb"],"utility-duo":["faudsb"],"utility-fill":["faufsb"]},Be={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"},slab:{faslr:"fa-regular"},"slab-press":{faslpr:"fa-regular"},whiteboard:{fawsb:"fa-semibold"},thumbprint:{fatl:"fa-light"},notdog:{fans:"fa-solid"},"notdog-duo":{fands:"fa-solid"},etch:{faes:"fa-solid"},jelly:{fajr:"fa-regular"},"jelly-fill":{fajfr:"fa-regular"},"jelly-duo":{fajdr:"fa-regular"},chisel:{facr:"fa-regular"},utility:{fausb:"fa-semibold"},"utility-duo":{faudsb:"fa-semibold"},"utility-fill":{faufsb:"fa-semibold"}},ei=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands","fa-semibold"],Ia=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt","faslr","faslpr","fawsb","fatl","fans","fands","faes","fajr","fajfr","fajdr","facr","fausb","faudsb","faufsb"].concat(un,ei),ti=["solid","regular","light","thin","duotone","brands","semibold"],_a=[1,2,3,4,5,6,7,8,9,10],ai=_a.concat([11,12,13,14,15,16,17,18,19,20]),ri=["aw","fw","pull-left","pull-right"],ni=[].concat($(Object.keys(Zn)),ti,ri,["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","inverse","layers","layers-bottom-left","layers-bottom-right","layers-counter","layers-text","layers-top-left","layers-top-right","li","pull-end","pull-start","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul","width-auto","width-fixed",Se.GROUP,Se.SWAP_OPACITY,Se.PRIMARY,Se.SECONDARY]).concat(_a.map(function(e){return"".concat(e,"x")})).concat(ai.map(function(e){return"w-".concat(e)})),ii={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}},H="___FONT_AWESOME___",Ge=16,Ma="fa",Na="svg-inline--fa",Q="data-fa-i2svg",qe="data-fa-pseudo-element",oi="data-fa-pseudo-element-pending",st="data-prefix",lt="data-icon",_t="fontawesome-i2svg",si="async",li=["HTML","HEAD","STYLE","SCRIPT"],za=["::before","::after",":before",":after"],Ta=(function(){try{return!0}catch{return!1}})();function ge(e){return new Proxy(e,{get:function(a,r){return r in a?a[r]:a[T]}})}var Oa=c({},fa);Oa[T]=c(c(c(c({},{"fa-duotone":"duotone"}),fa[T]),Pt.kit),Pt["kit-duotone"]);var fi=ge(Oa),Xe=c({},tn);Xe[T]=c(c(c(c({},{duotone:"fad"}),Xe[T]),It.kit),It["kit-duotone"]);var Mt=ge(Xe),Ve=c({},Be);Ve[T]=c(c({},Ve[T]),cn.kit);var ft=ge(Ve),Je=c({},Qn);Je[T]=c(c({},Je[T]),ln.kit);ge(Je);var ci=Mr,Fa="fa-layers-text",ui=Nr,di=c({},Qr);ge(di);var mi=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],$e=zr,vi=[].concat($(an),$(ni)),ue=X.FontAwesomeConfig||{};function pi(e){var t=M.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}function hi(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}if(M&&typeof M.querySelector=="function"){var gi=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-search-pseudo-elements","searchPseudoElements"],["data-search-pseudo-elements-warnings","searchPseudoElementsWarnings"],["data-search-pseudo-elements-full-scan","searchPseudoElementsFullScan"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];gi.forEach(function(e){var t=Pe(e,2),a=t[0],r=t[1],n=hi(pi(a));n!=null&&(ue[r]=n)})}var Ra={styleDefault:"solid",familyDefault:T,cssPrefix:Ma,replacementClass:Na,autoReplaceSvg:!0,autoAddCss:!0,searchPseudoElements:!1,searchPseudoElementsWarnings:!0,searchPseudoElementsFullScan:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};ue.familyPrefix&&(ue.cssPrefix=ue.familyPrefix);var oe=c(c({},Ra),ue);oe.autoReplaceSvg||(oe.observeMutations=!1);var p={};Object.keys(Ra).forEach(function(e){Object.defineProperty(p,e,{enumerable:!0,set:function(a){oe[e]=a,de.forEach(function(r){return r(p)})},get:function(){return oe[e]}})});Object.defineProperty(p,"familyPrefix",{enumerable:!0,set:function(t){oe.cssPrefix=t,de.forEach(function(a){return a(p)})},get:function(){return oe.cssPrefix}});X.FontAwesomeConfig=p;var de=[];function yi(e){return de.push(e),function(){de.splice(de.indexOf(e),1)}}var ae=Ge,U={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function bi(e){if(!(!e||!G)){var t=M.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;for(var a=M.head.childNodes,r=null,n=a.length-1;n>-1;n--){var i=a[n],o=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(o)>-1&&(r=i)}return M.head.insertBefore(t,r),e}}var xi="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function Nt(){for(var e=12,t="";e-- >0;)t+=xi[Math.random()*62|0];return t}function se(e){for(var t=[],a=(e||[]).length>>>0;a--;)t[a]=e[a];return t}function ct(e){return e.classList?se(e.classList):(e.getAttribute("class")||"").split(" ").filter(function(t){return t})}function ja(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Si(e){return Object.keys(e||{}).reduce(function(t,a){return t+"".concat(a,'="').concat(ja(e[a]),'" ')},"").trim()}function Ie(e){return Object.keys(e||{}).reduce(function(t,a){return t+"".concat(a,": ").concat(e[a].trim(),";")},"")}function ut(e){return e.size!==U.size||e.x!==U.x||e.y!==U.y||e.rotate!==U.rotate||e.flipX||e.flipY}function wi(e){var t=e.transform,a=e.containerWidth,r=e.iconWidth,n={transform:"translate(".concat(a/2," 256)")},i="translate(".concat(t.x*32,", ").concat(t.y*32,") "),o="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),l="rotate(".concat(t.rotate," 0 0)"),f={transform:"".concat(i," ").concat(o," ").concat(l)},d={transform:"translate(".concat(r/2*-1," -256)")};return{outer:n,inner:f,path:d}}function Ai(e){var t=e.transform,a=e.width,r=a===void 0?Ge:a,n=e.height,i=n===void 0?Ge:n,o="";return la?o+="translate(".concat(t.x/ae-r/2,"em, ").concat(t.y/ae-i/2,"em) "):o+="translate(calc(-50% + ".concat(t.x/ae,"em), calc(-50% + ").concat(t.y/ae,"em)) "),o+="scale(".concat(t.size/ae*(t.flipX?-1:1),", ").concat(t.size/ae*(t.flipY?-1:1),") "),o+="rotate(".concat(t.rotate,"deg) "),o}var Ei=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 7 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 7 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 7 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 7 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 7 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 7 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-slab-regular: normal 400 1em/1 "Font Awesome 7 Slab";
  --fa-font-slab-press-regular: normal 400 1em/1 "Font Awesome 7 Slab Press";
  --fa-font-whiteboard-semibold: normal 600 1em/1 "Font Awesome 7 Whiteboard";
  --fa-font-thumbprint-light: normal 300 1em/1 "Font Awesome 7 Thumbprint";
  --fa-font-notdog-solid: normal 900 1em/1 "Font Awesome 7 Notdog";
  --fa-font-notdog-duo-solid: normal 900 1em/1 "Font Awesome 7 Notdog Duo";
  --fa-font-etch-solid: normal 900 1em/1 "Font Awesome 7 Etch";
  --fa-font-jelly-regular: normal 400 1em/1 "Font Awesome 7 Jelly";
  --fa-font-jelly-fill-regular: normal 400 1em/1 "Font Awesome 7 Jelly Fill";
  --fa-font-jelly-duo-regular: normal 400 1em/1 "Font Awesome 7 Jelly Duo";
  --fa-font-chisel-regular: normal 400 1em/1 "Font Awesome 7 Chisel";
  --fa-font-utility-semibold: normal 600 1em/1 "Font Awesome 7 Utility";
  --fa-font-utility-duo-semibold: normal 600 1em/1 "Font Awesome 7 Utility Duo";
  --fa-font-utility-fill-semibold: normal 600 1em/1 "Font Awesome 7 Utility Fill";
}

.svg-inline--fa {
  box-sizing: content-box;
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285714em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left,
.svg-inline--fa .fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-pull-right,
.svg-inline--fa .fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  inset-block-start: 0.25em; /* syncing vertical alignment with Web Font rendering */
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.fa-layers .svg-inline--fa {
  inset: 0;
  margin: auto;
  position: absolute;
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: calc(10 / 16 * 1em); /* converts a 10px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 10 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 10 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xs {
  font-size: calc(12 / 16 * 1em); /* converts a 12px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 12 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 12 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-sm {
  font-size: calc(14 / 16 * 1em); /* converts a 14px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 14 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 14 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-lg {
  font-size: calc(20 / 16 * 1em); /* converts a 20px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 20 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 20 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xl {
  font-size: calc(24 / 16 * 1em); /* converts a 24px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 24 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 24 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-2xl {
  font-size: calc(32 / 16 * 1em); /* converts a 32px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 32 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 32 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-width-auto {
  --fa-width: auto;
}

.fa-fw,
.fa-width-fixed {
  --fa-width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-inline-start: var(--fa-li-margin, 2.5em);
  padding-inline-start: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

/* Heads Up: Bordered Icons will not be supported in the future!
  - This feature will be deprecated in the next major release of Font Awesome (v8)!
  - You may continue to use it in this version *v7), but it will not be supported in Font Awesome v8.
*/
/* Notes:
* --@{v.$css-prefix}-border-width = 1/16 by default (to render as ~1px based on a 16px default font-size)
* --@{v.$css-prefix}-border-padding =
  ** 3/16 for vertical padding (to give ~2px of vertical whitespace around an icon considering it's vertical alignment)
  ** 4/16 for horizontal padding (to give ~4px of horizontal whitespace around an icon)
*/
.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.0625em);
  box-sizing: var(--fa-border-box-sizing, content-box);
  padding: var(--fa-border-padding, 0.1875em 0.25em);
}

.fa-pull-left,
.fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right,
.fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
  .fa-bounce,
  .fa-fade,
  .fa-beat-fade,
  .fa-flip,
  .fa-pulse,
  .fa-shake,
  .fa-spin,
  .fa-spin-pulse {
    animation: none !important;
    transition: none !important;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.svg-inline--fa.fa-inverse {
  fill: var(--fa-inverse, #fff);
}

.fa-stack {
  display: inline-block;
  height: 2em;
  line-height: 2em;
  position: relative;
  vertical-align: middle;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.svg-inline--fa.fa-stack-1x {
  --fa-width: 1.25em;
  height: 1em;
  width: var(--fa-width);
}
.svg-inline--fa.fa-stack-2x {
  --fa-width: 2.5em;
  height: 2em;
  width: var(--fa-width);
}

.fa-stack-1x,
.fa-stack-2x {
  inset: 0;
  margin: auto;
  position: absolute;
  z-index: var(--fa-stack-z-index, auto);
}`;function $a(){var e=Ma,t=Na,a=p.cssPrefix,r=p.replacementClass,n=Ei;if(a!==e||r!==t){var i=new RegExp("\\.".concat(e,"\\-"),"g"),o=new RegExp("\\--".concat(e,"\\-"),"g"),l=new RegExp("\\.".concat(t),"g");n=n.replace(i,".".concat(a,"-")).replace(o,"--".concat(a,"-")).replace(l,".".concat(r))}return n}var zt=!1;function De(){p.autoAddCss&&!zt&&(bi($a()),zt=!0)}var ki={mixout:function(){return{dom:{css:$a,insertCss:De}}},hooks:function(){return{beforeDOMElementCreation:function(){De()},beforeI2svg:function(){De()}}}},B=X||{};B[H]||(B[H]={});B[H].styles||(B[H].styles={});B[H].hooks||(B[H].hooks={});B[H].shims||(B[H].shims=[]);var j=B[H],Da=[],Ua=function(){M.removeEventListener("DOMContentLoaded",Ua),Ce=1,Da.map(function(t){return t()})},Ce=!1;G&&(Ce=(M.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(M.readyState),Ce||M.addEventListener("DOMContentLoaded",Ua));function Ci(e){G&&(Ce?setTimeout(e,0):Da.push(e))}function ye(e){var t=e.tag,a=e.attributes,r=a===void 0?{}:a,n=e.children,i=n===void 0?[]:n;return typeof e=="string"?ja(e):"<".concat(t," ").concat(Si(r),">").concat(i.map(ye).join(""),"</").concat(t,">")}function Tt(e,t,a){if(e&&e[t]&&e[t][a])return{prefix:t,iconName:a,icon:e[t][a]}}var Ue=function(t,a,r,n){var i=Object.keys(t),o=i.length,l=a,f,d,m;for(r===void 0?(f=1,m=t[i[0]]):(f=0,m=r);f<o;f++)d=i[f],m=l(m,t[d],d,t);return m};function Wa(e){return $(e).length!==1?null:e.codePointAt(0).toString(16)}function Ot(e){return Object.keys(e).reduce(function(t,a){var r=e[a],n=!!r.icon;return n?t[r.iconName]=r.icon:t[a]=r,t},{})}function Ke(e,t){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=a.skipHooks,n=r===void 0?!1:r,i=Ot(t);typeof j.hooks.addPack=="function"&&!n?j.hooks.addPack(e,Ot(t)):j.styles[e]=c(c({},j.styles[e]||{}),i),e==="fas"&&Ke("fa",t)}var ve=j.styles,Li=j.shims,Ya=Object.keys(ft),Pi=Ya.reduce(function(e,t){return e[t]=Object.keys(ft[t]),e},{}),dt=null,Ha={},Ba={},Ga={},qa={},Xa={};function Ii(e){return~vi.indexOf(e)}function _i(e,t){var a=t.split("-"),r=a[0],n=a.slice(1).join("-");return r===e&&n!==""&&!Ii(n)?n:null}var Va=function(){var t=function(i){return Ue(ve,function(o,l,f){return o[f]=Ue(l,i,{}),o},{})};Ha=t(function(n,i,o){if(i[3]&&(n[i[3]]=o),i[2]){var l=i[2].filter(function(f){return typeof f=="number"});l.forEach(function(f){n[f.toString(16)]=o})}return n}),Ba=t(function(n,i,o){if(n[o]=o,i[2]){var l=i[2].filter(function(f){return typeof f=="string"});l.forEach(function(f){n[f]=o})}return n}),Xa=t(function(n,i,o){var l=i[2];return n[o]=o,l.forEach(function(f){n[f]=o}),n});var a="far"in ve||p.autoFetchSvg,r=Ue(Li,function(n,i){var o=i[0],l=i[1],f=i[2];return l==="far"&&!a&&(l="fas"),typeof o=="string"&&(n.names[o]={prefix:l,iconName:f}),typeof o=="number"&&(n.unicodes[o.toString(16)]={prefix:l,iconName:f}),n},{names:{},unicodes:{}});Ga=r.names,qa=r.unicodes,dt=_e(p.styleDefault,{family:p.familyDefault})};yi(function(e){dt=_e(e.styleDefault,{family:p.familyDefault})});Va();function mt(e,t){return(Ha[e]||{})[t]}function Mi(e,t){return(Ba[e]||{})[t]}function K(e,t){return(Xa[e]||{})[t]}function Ja(e){return Ga[e]||{prefix:null,iconName:null}}function Ni(e){var t=qa[e],a=mt("fas",e);return t||(a?{prefix:"fas",iconName:a}:null)||{prefix:null,iconName:null}}function V(){return dt}var Ka=function(){return{prefix:null,iconName:null,rest:[]}};function zi(e){var t=T,a=Ya.reduce(function(r,n){return r[n]="".concat(p.cssPrefix,"-").concat(n),r},{});return La.forEach(function(r){(e.includes(a[r])||e.some(function(n){return Pi[r].includes(n)}))&&(t=r)}),t}function _e(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.family,r=a===void 0?T:a,n=fi[r][e];if(r===he&&!e)return"fad";var i=Mt[r][e]||Mt[r][n],o=e in j.styles?e:null,l=i||o||null;return l}function Ti(e){var t=[],a=null;return e.forEach(function(r){var n=_i(p.cssPrefix,r);n?a=n:r&&t.push(r)}),{iconName:a,rest:t}}function Ft(e){return e.sort().filter(function(t,a,r){return r.indexOf(t)===a})}var Rt=Ia.concat(Pa);function Me(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.skipLookups,r=a===void 0?!1:a,n=null,i=Ft(e.filter(function(h){return Rt.includes(h)})),o=Ft(e.filter(function(h){return!Rt.includes(h)})),l=i.filter(function(h){return n=h,!ca.includes(h)}),f=Pe(l,1),d=f[0],m=d===void 0?null:d,v=zi(i),S=c(c({},Ti(o)),{},{prefix:_e(m,{family:v})});return c(c(c({},S),ji({values:e,family:v,styles:ve,config:p,canonical:S,givenPrefix:n})),Oi(r,n,S))}function Oi(e,t,a){var r=a.prefix,n=a.iconName;if(e||!r||!n)return{prefix:r,iconName:n};var i=t==="fa"?Ja(n):{},o=K(r,n);return n=i.iconName||o||n,r=i.prefix||r,r==="far"&&!ve.far&&ve.fas&&!p.autoFetchSvg&&(r="fas"),{prefix:r,iconName:n}}var Fi=La.filter(function(e){return e!==T||e!==he}),Ri=Object.keys(Be).filter(function(e){return e!==T}).map(function(e){return Object.keys(Be[e])}).flat();function ji(e){var t=e.values,a=e.family,r=e.canonical,n=e.givenPrefix,i=n===void 0?"":n,o=e.styles,l=o===void 0?{}:o,f=e.config,d=f===void 0?{}:f,m=a===he,v=t.includes("fa-duotone")||t.includes("fad"),S=d.familyDefault==="duotone",h=r.prefix==="fad"||r.prefix==="fa-duotone";if(!m&&(v||S||h)&&(r.prefix="fad"),(t.includes("fa-brands")||t.includes("fab"))&&(r.prefix="fab"),!r.prefix&&Fi.includes(a)){var k=Object.keys(l).find(function(I){return Ri.includes(I)});if(k||d.autoFetchSvg){var A=en.get(a).defaultShortPrefixId;r.prefix=A,r.iconName=K(r.prefix,r.iconName)||r.iconName}}return(r.prefix==="fa"||i==="fa")&&(r.prefix=V()||"fas"),r}var $i=(function(){function e(){wr(this,e),this.definitions={}}return Er(e,[{key:"add",value:function(){for(var a=this,r=arguments.length,n=new Array(r),i=0;i<r;i++)n[i]=arguments[i];var o=n.reduce(this._pullDefinitions,{});Object.keys(o).forEach(function(l){a.definitions[l]=c(c({},a.definitions[l]||{}),o[l]),Ke(l,o[l]);var f=ft[T][l];f&&Ke(f,o[l]),Va()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(a,r){var n=r.prefix&&r.iconName&&r.icon?{0:r}:r;return Object.keys(n).map(function(i){var o=n[i],l=o.prefix,f=o.iconName,d=o.icon,m=d[2];a[l]||(a[l]={}),m.length>0&&m.forEach(function(v){typeof v=="string"&&(a[l][v]=d)}),a[l][f]=d}),a}}])})(),jt=[],ne={},ie={},Di=Object.keys(ie);function Ui(e,t){var a=t.mixoutsTo;return jt=e,ne={},Object.keys(ie).forEach(function(r){Di.indexOf(r)===-1&&delete ie[r]}),jt.forEach(function(r){var n=r.mixout?r.mixout():{};if(Object.keys(n).forEach(function(o){typeof n[o]=="function"&&(a[o]=n[o]),ke(n[o])==="object"&&Object.keys(n[o]).forEach(function(l){a[o]||(a[o]={}),a[o][l]=n[o][l]})}),r.hooks){var i=r.hooks();Object.keys(i).forEach(function(o){ne[o]||(ne[o]=[]),ne[o].push(i[o])})}r.provides&&r.provides(ie)}),a}function Qe(e,t){for(var a=arguments.length,r=new Array(a>2?a-2:0),n=2;n<a;n++)r[n-2]=arguments[n];var i=ne[e]||[];return i.forEach(function(o){t=o.apply(null,[t].concat(r))}),t}function Z(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),r=1;r<t;r++)a[r-1]=arguments[r];var n=ne[e]||[];n.forEach(function(i){i.apply(null,a)})}function J(){var e=arguments[0],t=Array.prototype.slice.call(arguments,1);return ie[e]?ie[e].apply(null,t):void 0}function Ze(e){e.prefix==="fa"&&(e.prefix="fas");var t=e.iconName,a=e.prefix||V();if(t)return t=K(a,t)||t,Tt(Qa.definitions,a,t)||Tt(j.styles,a,t)}var Qa=new $i,Wi=function(){p.autoReplaceSvg=!1,p.observeMutations=!1,Z("noAuto")},Yi={i2svg:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return G?(Z("beforeI2svg",t),J("pseudoElements2svg",t),J("i2svg",t)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=t.autoReplaceSvgRoot;p.autoReplaceSvg===!1&&(p.autoReplaceSvg=!0),p.observeMutations=!0,Ci(function(){Bi({autoReplaceSvgRoot:a}),Z("watch",t)})}},Hi={icon:function(t){if(t===null)return null;if(ke(t)==="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:K(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){var a=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],r=_e(t[0]);return{prefix:r,iconName:K(r,a)||a}}if(typeof t=="string"&&(t.indexOf("".concat(p.cssPrefix,"-"))>-1||t.match(ci))){var n=Me(t.split(" "),{skipLookups:!0});return{prefix:n.prefix||V(),iconName:K(n.prefix,n.iconName)||n.iconName}}if(typeof t=="string"){var i=V();return{prefix:i,iconName:K(i,t)||t}}}},R={noAuto:Wi,config:p,dom:Yi,parse:Hi,library:Qa,findIconDefinition:Ze,toHtml:ye},Bi=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=t.autoReplaceSvgRoot,r=a===void 0?M:a;(Object.keys(j.styles).length>0||p.autoFetchSvg)&&G&&p.autoReplaceSvg&&R.dom.i2svg({node:r})};function Ne(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(r){return ye(r)})}}),Object.defineProperty(e,"node",{get:function(){if(G){var r=M.createElement("div");return r.innerHTML=e.html,r.children}}}),e}function Gi(e){var t=e.children,a=e.main,r=e.mask,n=e.attributes,i=e.styles,o=e.transform;if(ut(o)&&a.found&&!r.found){var l=a.width,f=a.height,d={x:l/f/2,y:.5};n.style=Ie(c(c({},i),{},{"transform-origin":"".concat(d.x+o.x/16,"em ").concat(d.y+o.y/16,"em")}))}return[{tag:"svg",attributes:n,children:t}]}function qi(e){var t=e.prefix,a=e.iconName,r=e.children,n=e.attributes,i=e.symbol,o=i===!0?"".concat(t,"-").concat(p.cssPrefix,"-").concat(a):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:c(c({},n),{},{id:o}),children:r}]}]}function Xi(e){var t=["aria-label","aria-labelledby","title","role"];return t.some(function(a){return a in e})}function vt(e){var t=e.icons,a=t.main,r=t.mask,n=e.prefix,i=e.iconName,o=e.transform,l=e.symbol,f=e.maskId,d=e.extra,m=e.watchable,v=m===void 0?!1:m,S=r.found?r:a,h=S.width,k=S.height,A=[p.replacementClass,i?"".concat(p.cssPrefix,"-").concat(i):""].filter(function(w){return d.classes.indexOf(w)===-1}).filter(function(w){return w!==""||!!w}).concat(d.classes).join(" "),I={children:[],attributes:c(c({},d.attributes),{},{"data-prefix":n,"data-icon":i,class:A,role:d.attributes.role||"img",viewBox:"0 0 ".concat(h," ").concat(k)})};!Xi(d.attributes)&&!d.attributes["aria-hidden"]&&(I.attributes["aria-hidden"]="true"),v&&(I.attributes[Q]="");var C=c(c({},I),{},{prefix:n,iconName:i,main:a,mask:r,maskId:f,transform:o,symbol:l,styles:c({},d.styles)}),N=r.found&&a.found?J("generateAbstractMask",C)||{children:[],attributes:{}}:J("generateAbstractIcon",C)||{children:[],attributes:{}},z=N.children,F=N.attributes;return C.children=z,C.attributes=F,l?qi(C):Gi(C)}function $t(e){var t=e.content,a=e.width,r=e.height,n=e.transform,i=e.extra,o=e.watchable,l=o===void 0?!1:o,f=c(c({},i.attributes),{},{class:i.classes.join(" ")});l&&(f[Q]="");var d=c({},i.styles);ut(n)&&(d.transform=Ai({transform:n,width:a,height:r}),d["-webkit-transform"]=d.transform);var m=Ie(d);m.length>0&&(f.style=m);var v=[];return v.push({tag:"span",attributes:f,children:[t]}),v}function Vi(e){var t=e.content,a=e.extra,r=c(c({},a.attributes),{},{class:a.classes.join(" ")}),n=Ie(a.styles);n.length>0&&(r.style=n);var i=[];return i.push({tag:"span",attributes:r,children:[t]}),i}var We=j.styles;function et(e){var t=e[0],a=e[1],r=e.slice(4),n=Pe(r,1),i=n[0],o=null;return Array.isArray(i)?o={tag:"g",attributes:{class:"".concat(p.cssPrefix,"-").concat($e.GROUP)},children:[{tag:"path",attributes:{class:"".concat(p.cssPrefix,"-").concat($e.SECONDARY),fill:"currentColor",d:i[0]}},{tag:"path",attributes:{class:"".concat(p.cssPrefix,"-").concat($e.PRIMARY),fill:"currentColor",d:i[1]}}]}:o={tag:"path",attributes:{fill:"currentColor",d:i}},{found:!0,width:t,height:a,icon:o}}var Ji={found:!1,width:512,height:512};function Ki(e,t){!Ta&&!p.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}function tt(e,t){var a=t;return t==="fa"&&p.styleDefault!==null&&(t=V()),new Promise(function(r,n){if(a==="fa"){var i=Ja(e)||{};e=i.iconName||e,t=i.prefix||t}if(e&&t&&We[t]&&We[t][e]){var o=We[t][e];return r(et(o))}Ki(e,t),r(c(c({},Ji),{},{icon:p.showMissingIcons&&e?J("missingIconAbstract")||{}:{}}))})}var Dt=function(){},at=p.measurePerformance&&xe&&xe.mark&&xe.measure?xe:{mark:Dt,measure:Dt},ce='FA "7.1.0"',Qi=function(t){return at.mark("".concat(ce," ").concat(t," begins")),function(){return Za(t)}},Za=function(t){at.mark("".concat(ce," ").concat(t," ends")),at.measure("".concat(ce," ").concat(t),"".concat(ce," ").concat(t," begins"),"".concat(ce," ").concat(t," ends"))},pt={begin:Qi,end:Za},Ae=function(){};function Ut(e){var t=e.getAttribute?e.getAttribute(Q):null;return typeof t=="string"}function Zi(e){var t=e.getAttribute?e.getAttribute(st):null,a=e.getAttribute?e.getAttribute(lt):null;return t&&a}function eo(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(p.replacementClass)}function to(){if(p.autoReplaceSvg===!0)return Ee.replace;var e=Ee[p.autoReplaceSvg];return e||Ee.replace}function ao(e){return M.createElementNS("http://www.w3.org/2000/svg",e)}function ro(e){return M.createElement(e)}function er(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.ceFn,r=a===void 0?e.tag==="svg"?ao:ro:a;if(typeof e=="string")return M.createTextNode(e);var n=r(e.tag);Object.keys(e.attributes||[]).forEach(function(o){n.setAttribute(o,e.attributes[o])});var i=e.children||[];return i.forEach(function(o){n.appendChild(er(o,{ceFn:r}))}),n}function no(e){var t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}var Ee={replace:function(t){var a=t[0];if(a.parentNode)if(t[1].forEach(function(n){a.parentNode.insertBefore(er(n),a)}),a.getAttribute(Q)===null&&p.keepOriginalSource){var r=M.createComment(no(a));a.parentNode.replaceChild(r,a)}else a.remove()},nest:function(t){var a=t[0],r=t[1];if(~ct(a).indexOf(p.replacementClass))return Ee.replace(t);var n=new RegExp("".concat(p.cssPrefix,"-.*"));if(delete r[0].attributes.id,r[0].attributes.class){var i=r[0].attributes.class.split(" ").reduce(function(l,f){return f===p.replacementClass||f.match(n)?l.toSvg.push(f):l.toNode.push(f),l},{toNode:[],toSvg:[]});r[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?a.removeAttribute("class"):a.setAttribute("class",i.toNode.join(" "))}var o=r.map(function(l){return ye(l)}).join(`
`);a.setAttribute(Q,""),a.innerHTML=o}};function Wt(e){e()}function tr(e,t){var a=typeof t=="function"?t:Ae;if(e.length===0)a();else{var r=Wt;p.mutateApproach===si&&(r=X.requestAnimationFrame||Wt),r(function(){var n=to(),i=pt.begin("mutate");e.map(n),i(),a()})}}var ht=!1;function ar(){ht=!0}function rt(){ht=!1}var Le=null;function Yt(e){if(Lt&&p.observeMutations){var t=e.treeCallback,a=t===void 0?Ae:t,r=e.nodeCallback,n=r===void 0?Ae:r,i=e.pseudoElementsCallback,o=i===void 0?Ae:i,l=e.observeMutationsRoot,f=l===void 0?M:l;Le=new Lt(function(d){if(!ht){var m=V();se(d).forEach(function(v){if(v.type==="childList"&&v.addedNodes.length>0&&!Ut(v.addedNodes[0])&&(p.searchPseudoElements&&o(v.target),a(v.target)),v.type==="attributes"&&v.target.parentNode&&p.searchPseudoElements&&o([v.target],!0),v.type==="attributes"&&Ut(v.target)&&~mi.indexOf(v.attributeName))if(v.attributeName==="class"&&Zi(v.target)){var S=Me(ct(v.target)),h=S.prefix,k=S.iconName;v.target.setAttribute(st,h||m),k&&v.target.setAttribute(lt,k)}else eo(v.target)&&n(v.target)})}}),G&&Le.observe(f,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function io(){Le&&Le.disconnect()}function oo(e){var t=e.getAttribute("style"),a=[];return t&&(a=t.split(";").reduce(function(r,n){var i=n.split(":"),o=i[0],l=i.slice(1);return o&&l.length>0&&(r[o]=l.join(":").trim()),r},{})),a}function so(e){var t=e.getAttribute("data-prefix"),a=e.getAttribute("data-icon"),r=e.innerText!==void 0?e.innerText.trim():"",n=Me(ct(e));return n.prefix||(n.prefix=V()),t&&a&&(n.prefix=t,n.iconName=a),n.iconName&&n.prefix||(n.prefix&&r.length>0&&(n.iconName=Mi(n.prefix,e.innerText)||mt(n.prefix,Wa(e.innerText))),!n.iconName&&p.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(n.iconName=e.firstChild.data)),n}function lo(e){var t=se(e.attributes).reduce(function(a,r){return a.name!=="class"&&a.name!=="style"&&(a[r.name]=r.value),a},{});return t}function fo(){return{iconName:null,prefix:null,transform:U,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function Ht(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},a=so(e),r=a.iconName,n=a.prefix,i=a.rest,o=lo(e),l=Qe("parseNodeAttributes",{},e),f=t.styleParser?oo(e):[];return c({iconName:r,prefix:n,transform:U,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:i,styles:f,attributes:o}},l)}var co=j.styles;function rr(e){var t=p.autoReplaceSvg==="nest"?Ht(e,{styleParser:!1}):Ht(e);return~t.extra.classes.indexOf(Fa)?J("generateLayersText",e,t):J("generateSvgReplacementMutation",e,t)}function uo(){return[].concat($(Pa),$(Ia))}function Bt(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!G)return Promise.resolve();var a=M.documentElement.classList,r=function(v){return a.add("".concat(_t,"-").concat(v))},n=function(v){return a.remove("".concat(_t,"-").concat(v))},i=p.autoFetchSvg?uo():ca.concat(Object.keys(co));i.includes("fa")||i.push("fa");var o=[".".concat(Fa,":not([").concat(Q,"])")].concat(i.map(function(m){return".".concat(m,":not([").concat(Q,"])")})).join(", ");if(o.length===0)return Promise.resolve();var l=[];try{l=se(e.querySelectorAll(o))}catch{}if(l.length>0)r("pending"),n("complete");else return Promise.resolve();var f=pt.begin("onTree"),d=l.reduce(function(m,v){try{var S=rr(v);S&&m.push(S)}catch(h){Ta||h.name==="MissingIcon"&&console.error(h)}return m},[]);return new Promise(function(m,v){Promise.all(d).then(function(S){tr(S,function(){r("active"),r("complete"),n("pending"),typeof t=="function"&&t(),f(),m()})}).catch(function(S){f(),v(S)})})}function mo(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;rr(e).then(function(a){a&&tr([a],t)})}function vo(e){return function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(t||{}).icon?t:Ze(t||{}),n=a.mask;return n&&(n=(n||{}).icon?n:Ze(n||{})),e(r,c(c({},a),{},{mask:n}))}}var po=function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.transform,n=r===void 0?U:r,i=a.symbol,o=i===void 0?!1:i,l=a.mask,f=l===void 0?null:l,d=a.maskId,m=d===void 0?null:d,v=a.classes,S=v===void 0?[]:v,h=a.attributes,k=h===void 0?{}:h,A=a.styles,I=A===void 0?{}:A;if(t){var C=t.prefix,N=t.iconName,z=t.icon;return Ne(c({type:"icon"},t),function(){return Z("beforeDOMElementCreation",{iconDefinition:t,params:a}),vt({icons:{main:et(z),mask:f?et(f.icon):{found:!1,width:null,height:null,icon:{}}},prefix:C,iconName:N,transform:c(c({},U),n),symbol:o,maskId:m,extra:{attributes:k,styles:I,classes:S}})})}},ho={mixout:function(){return{icon:vo(po)}},hooks:function(){return{mutationObserverCallbacks:function(a){return a.treeCallback=Bt,a.nodeCallback=mo,a}}},provides:function(t){t.i2svg=function(a){var r=a.node,n=r===void 0?M:r,i=a.callback,o=i===void 0?function(){}:i;return Bt(n,o)},t.generateSvgReplacementMutation=function(a,r){var n=r.iconName,i=r.prefix,o=r.transform,l=r.symbol,f=r.mask,d=r.maskId,m=r.extra;return new Promise(function(v,S){Promise.all([tt(n,i),f.iconName?tt(f.iconName,f.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(h){var k=Pe(h,2),A=k[0],I=k[1];v([a,vt({icons:{main:A,mask:I},prefix:i,iconName:n,transform:o,symbol:l,maskId:d,extra:m,watchable:!0})])}).catch(S)})},t.generateAbstractIcon=function(a){var r=a.children,n=a.attributes,i=a.main,o=a.transform,l=a.styles,f=Ie(l);f.length>0&&(n.style=f);var d;return ut(o)&&(d=J("generateAbstractTransformGrouping",{main:i,transform:o,containerWidth:i.width,iconWidth:i.width})),r.push(d||i.icon),{children:r,attributes:n}}}},go={mixout:function(){return{layer:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=r.classes,i=n===void 0?[]:n;return Ne({type:"layer"},function(){Z("beforeDOMElementCreation",{assembler:a,params:r});var o=[];return a(function(l){Array.isArray(l)?l.map(function(f){o=o.concat(f.abstract)}):o=o.concat(l.abstract)}),[{tag:"span",attributes:{class:["".concat(p.cssPrefix,"-layers")].concat($(i)).join(" ")},children:o}]})}}}},yo={mixout:function(){return{counter:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};r.title;var n=r.classes,i=n===void 0?[]:n,o=r.attributes,l=o===void 0?{}:o,f=r.styles,d=f===void 0?{}:f;return Ne({type:"counter",content:a},function(){return Z("beforeDOMElementCreation",{content:a,params:r}),Vi({content:a.toString(),extra:{attributes:l,styles:d,classes:["".concat(p.cssPrefix,"-layers-counter")].concat($(i))}})})}}}},bo={mixout:function(){return{text:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=r.transform,i=n===void 0?U:n,o=r.classes,l=o===void 0?[]:o,f=r.attributes,d=f===void 0?{}:f,m=r.styles,v=m===void 0?{}:m;return Ne({type:"text",content:a},function(){return Z("beforeDOMElementCreation",{content:a,params:r}),$t({content:a,transform:c(c({},U),i),extra:{attributes:d,styles:v,classes:["".concat(p.cssPrefix,"-layers-text")].concat($(l))}})})}}},provides:function(t){t.generateLayersText=function(a,r){var n=r.transform,i=r.extra,o=null,l=null;if(la){var f=parseInt(getComputedStyle(a).fontSize,10),d=a.getBoundingClientRect();o=d.width/f,l=d.height/f}return Promise.resolve([a,$t({content:a.innerHTML,width:o,height:l,transform:n,extra:i,watchable:!0})])}}},nr=new RegExp('"',"ug"),Gt=[1105920,1112319],qt=c(c(c(c({},{FontAwesome:{normal:"fas",400:"fas"}}),Zr),ii),fn),nt=Object.keys(qt).reduce(function(e,t){return e[t.toLowerCase()]=qt[t],e},{}),xo=Object.keys(nt).reduce(function(e,t){var a=nt[t];return e[t]=a[900]||$(Object.entries(a))[0][1],e},{});function So(e){var t=e.replace(nr,"");return Wa($(t)[0]||"")}function wo(e){var t=e.getPropertyValue("font-feature-settings").includes("ss01"),a=e.getPropertyValue("content"),r=a.replace(nr,""),n=r.codePointAt(0),i=n>=Gt[0]&&n<=Gt[1],o=r.length===2?r[0]===r[1]:!1;return i||o||t}function Ao(e,t){var a=e.replace(/^['"]|['"]$/g,"").toLowerCase(),r=parseInt(t),n=isNaN(r)?"normal":r;return(nt[a]||{})[n]||xo[a]}function Xt(e,t){var a="".concat(oi).concat(t.replace(":","-"));return new Promise(function(r,n){if(e.getAttribute(a)!==null)return r();var i=se(e.children),o=i.filter(function(q){return q.getAttribute(qe)===t})[0],l=X.getComputedStyle(e,t),f=l.getPropertyValue("font-family"),d=f.match(ui),m=l.getPropertyValue("font-weight"),v=l.getPropertyValue("content");if(o&&!d)return e.removeChild(o),r();if(d&&v!=="none"&&v!==""){var S=l.getPropertyValue("content"),h=Ao(f,m),k=So(S),A=d[0].startsWith("FontAwesome"),I=wo(l),C=mt(h,k),N=C;if(A){var z=Ni(k);z.iconName&&z.prefix&&(C=z.iconName,h=z.prefix)}if(C&&!I&&(!o||o.getAttribute(st)!==h||o.getAttribute(lt)!==N)){e.setAttribute(a,N),o&&e.removeChild(o);var F=fo(),w=F.extra;w.attributes[qe]=t,tt(C,h).then(function(q){var P=vt(c(c({},F),{},{icons:{main:q,mask:Ka()},prefix:h,iconName:N,extra:w,watchable:!0})),ee=M.createElementNS("http://www.w3.org/2000/svg","svg");t==="::before"?e.insertBefore(ee,e.firstChild):e.appendChild(ee),ee.outerHTML=P.map(function(le){return ye(le)}).join(`
`),e.removeAttribute(a),r()}).catch(n)}else r()}else r()})}function Eo(e){return Promise.all([Xt(e,"::before"),Xt(e,"::after")])}function ko(e){return e.parentNode!==document.head&&!~li.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(qe)&&(!e.parentNode||e.parentNode.tagName!=="svg")}var Co=function(t){return!!t&&za.some(function(a){return t.includes(a)})},Lo=function(t){if(!t)return[];var a=new Set,r=t.split(/,(?![^()]*\))/).map(function(f){return f.trim()});r=r.flatMap(function(f){return f.includes("(")?f:f.split(",").map(function(d){return d.trim()})});var n=we(r),i;try{for(n.s();!(i=n.n()).done;){var o=i.value;if(Co(o)){var l=za.reduce(function(f,d){return f.replace(d,"")},o);l!==""&&l!=="*"&&a.add(l)}}}catch(f){n.e(f)}finally{n.f()}return a};function Vt(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;if(G){var a;if(t)a=e;else if(p.searchPseudoElementsFullScan)a=e.querySelectorAll("*");else{var r=new Set,n=we(document.styleSheets),i;try{for(n.s();!(i=n.n()).done;){var o=i.value;try{var l=we(o.cssRules),f;try{for(l.s();!(f=l.n()).done;){var d=f.value,m=Lo(d.selectorText),v=we(m),S;try{for(v.s();!(S=v.n()).done;){var h=S.value;r.add(h)}}catch(A){v.e(A)}finally{v.f()}}}catch(A){l.e(A)}finally{l.f()}}catch(A){p.searchPseudoElementsWarnings&&console.warn("Font Awesome: cannot parse stylesheet: ".concat(o.href," (").concat(A.message,`)
If it declares any Font Awesome CSS pseudo-elements, they will not be rendered as SVG icons. Add crossorigin="anonymous" to the <link>, enable searchPseudoElementsFullScan for slower but more thorough DOM parsing, or suppress this warning by setting searchPseudoElementsWarnings to false.`))}}}catch(A){n.e(A)}finally{n.f()}if(!r.size)return;var k=Array.from(r).join(", ");try{a=e.querySelectorAll(k)}catch{}}return new Promise(function(A,I){var C=se(a).filter(ko).map(Eo),N=pt.begin("searchPseudoElements");ar(),Promise.all(C).then(function(){N(),rt(),A()}).catch(function(){N(),rt(),I()})})}}var Po={hooks:function(){return{mutationObserverCallbacks:function(a){return a.pseudoElementsCallback=Vt,a}}},provides:function(t){t.pseudoElements2svg=function(a){var r=a.node,n=r===void 0?M:r;p.searchPseudoElements&&Vt(n)}}},Jt=!1,Io={mixout:function(){return{dom:{unwatch:function(){ar(),Jt=!0}}}},hooks:function(){return{bootstrap:function(){Yt(Qe("mutationObserverCallbacks",{}))},noAuto:function(){io()},watch:function(a){var r=a.observeMutationsRoot;Jt?rt():Yt(Qe("mutationObserverCallbacks",{observeMutationsRoot:r}))}}}},Kt=function(t){var a={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce(function(r,n){var i=n.toLowerCase().split("-"),o=i[0],l=i.slice(1).join("-");if(o&&l==="h")return r.flipX=!0,r;if(o&&l==="v")return r.flipY=!0,r;if(l=parseFloat(l),isNaN(l))return r;switch(o){case"grow":r.size=r.size+l;break;case"shrink":r.size=r.size-l;break;case"left":r.x=r.x-l;break;case"right":r.x=r.x+l;break;case"up":r.y=r.y-l;break;case"down":r.y=r.y+l;break;case"rotate":r.rotate=r.rotate+l;break}return r},a)},_o={mixout:function(){return{parse:{transform:function(a){return Kt(a)}}}},hooks:function(){return{parseNodeAttributes:function(a,r){var n=r.getAttribute("data-fa-transform");return n&&(a.transform=Kt(n)),a}}},provides:function(t){t.generateAbstractTransformGrouping=function(a){var r=a.main,n=a.transform,i=a.containerWidth,o=a.iconWidth,l={transform:"translate(".concat(i/2," 256)")},f="translate(".concat(n.x*32,", ").concat(n.y*32,") "),d="scale(".concat(n.size/16*(n.flipX?-1:1),", ").concat(n.size/16*(n.flipY?-1:1),") "),m="rotate(".concat(n.rotate," 0 0)"),v={transform:"".concat(f," ").concat(d," ").concat(m)},S={transform:"translate(".concat(o/2*-1," -256)")},h={outer:l,inner:v,path:S};return{tag:"g",attributes:c({},h.outer),children:[{tag:"g",attributes:c({},h.inner),children:[{tag:r.icon.tag,children:r.icon.children,attributes:c(c({},r.icon.attributes),h.path)}]}]}}}},Ye={x:0,y:0,width:"100%",height:"100%"};function Qt(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}function Mo(e){return e.tag==="g"?e.children:[e]}var No={hooks:function(){return{parseNodeAttributes:function(a,r){var n=r.getAttribute("data-fa-mask"),i=n?Me(n.split(" ").map(function(o){return o.trim()})):Ka();return i.prefix||(i.prefix=V()),a.mask=i,a.maskId=r.getAttribute("data-fa-mask-id"),a}}},provides:function(t){t.generateAbstractMask=function(a){var r=a.children,n=a.attributes,i=a.main,o=a.mask,l=a.maskId,f=a.transform,d=i.width,m=i.icon,v=o.width,S=o.icon,h=wi({transform:f,containerWidth:v,iconWidth:d}),k={tag:"rect",attributes:c(c({},Ye),{},{fill:"white"})},A=m.children?{children:m.children.map(Qt)}:{},I={tag:"g",attributes:c({},h.inner),children:[Qt(c({tag:m.tag,attributes:c(c({},m.attributes),h.path)},A))]},C={tag:"g",attributes:c({},h.outer),children:[I]},N="mask-".concat(l||Nt()),z="clip-".concat(l||Nt()),F={tag:"mask",attributes:c(c({},Ye),{},{id:N,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[k,C]},w={tag:"defs",children:[{tag:"clipPath",attributes:{id:z},children:Mo(S)},F]};return r.push(w,{tag:"rect",attributes:c({fill:"currentColor","clip-path":"url(#".concat(z,")"),mask:"url(#".concat(N,")")},Ye)}),{children:r,attributes:n}}}},zo={provides:function(t){var a=!1;X.matchMedia&&(a=X.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){var r=[],n={fill:"currentColor"},i={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};r.push({tag:"path",attributes:c(c({},n),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var o=c(c({},i),{},{attributeName:"opacity"}),l={tag:"circle",attributes:c(c({},n),{},{cx:"256",cy:"364",r:"28"}),children:[]};return a||l.children.push({tag:"animate",attributes:c(c({},i),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:c(c({},o),{},{values:"1;0;1;1;0;1;"})}),r.push(l),r.push({tag:"path",attributes:c(c({},n),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:a?[]:[{tag:"animate",attributes:c(c({},o),{},{values:"1;0;0;0;0;1;"})}]}),a||r.push({tag:"path",attributes:c(c({},n),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:c(c({},o),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:r}}}},To={hooks:function(){return{parseNodeAttributes:function(a,r){var n=r.getAttribute("data-fa-symbol"),i=n===null?!1:n===""?!0:n;return a.symbol=i,a}}}},Oo=[ki,ho,go,yo,bo,Po,Io,_o,No,zo,To];Ui(Oo,{mixoutsTo:R});R.noAuto;var pe=R.config;R.library;R.dom;var ir=R.parse;R.findIconDefinition;R.toHtml;var Fo=R.icon;R.layer;R.text;R.counter;function Ro(e){return e=e-0,e===e}function or(e){return Ro(e)?e:(e=e.replace(/[_-]+(.)?/g,(t,a)=>a?a.toUpperCase():""),e.charAt(0).toLowerCase()+e.slice(1))}function jo(e){return e.charAt(0).toUpperCase()+e.slice(1)}var re=new Map,$o=1e3;function Do(e){if(re.has(e))return re.get(e);const t={};let a=0;const r=e.length;for(;a<r;){const n=e.indexOf(";",a),i=n===-1?r:n,o=e.slice(a,i).trim();if(o){const l=o.indexOf(":");if(l>0){const f=o.slice(0,l).trim(),d=o.slice(l+1).trim();if(f&&d){const m=or(f);t[m.startsWith("webkit")?jo(m):m]=d}}}a=i+1}if(re.size===$o){const n=re.keys().next().value;n&&re.delete(n)}return re.set(e,t),t}function sr(e,t,a={}){if(typeof t=="string")return t;const r=(t.children||[]).map(m=>sr(e,m)),n=t.attributes||{},i={};for(const[m,v]of Object.entries(n))switch(!0){case m==="class":{i.className=v;break}case m==="style":{i.style=Do(String(v));break}case m.startsWith("aria-"):case m.startsWith("data-"):{i[m.toLowerCase()]=v;break}default:i[or(m)]=v}const{style:o,role:l,"aria-label":f,...d}=a;return o&&(i.style=i.style?{...i.style,...o}:o),l&&(i.role=l),f&&(i["aria-label"]=f,i["aria-hidden"]="false"),e(t.tag,{...d,...i},...r)}var Uo=sr.bind(null,ra.createElement),Zt=(e,t)=>{const a=aa.useId();return e||(t?a:void 0)},Wo=class{constructor(e="react-fontawesome"){this.enabled=!1;let t=!1;try{t=typeof process<"u"&&!1}catch{}this.scope=e,this.enabled=t}log(...e){this.enabled&&console.log(`[${this.scope}]`,...e)}warn(...e){this.enabled&&console.warn(`[${this.scope}]`,...e)}error(...e){this.enabled&&console.error(`[${this.scope}]`,...e)}},Yo="searchPseudoElementsFullScan"in pe?"7.0.0":"6.0.0",Ho=Number.parseInt(Yo)>=7,me="fa",W={beat:"fa-beat",fade:"fa-fade",beatFade:"fa-beat-fade",bounce:"fa-bounce",shake:"fa-shake",spin:"fa-spin",spinPulse:"fa-spin-pulse",spinReverse:"fa-spin-reverse",pulse:"fa-pulse"},Bo={left:"fa-pull-left",right:"fa-pull-right"},Go={90:"fa-rotate-90",180:"fa-rotate-180",270:"fa-rotate-270"},qo={"2xs":"fa-2xs",xs:"fa-xs",sm:"fa-sm",lg:"fa-lg",xl:"fa-xl","2xl":"fa-2xl","1x":"fa-1x","2x":"fa-2x","3x":"fa-3x","4x":"fa-4x","5x":"fa-5x","6x":"fa-6x","7x":"fa-7x","8x":"fa-8x","9x":"fa-9x","10x":"fa-10x"},Y={border:"fa-border",fixedWidth:"fa-fw",flip:"fa-flip",flipHorizontal:"fa-flip-horizontal",flipVertical:"fa-flip-vertical",inverse:"fa-inverse",rotateBy:"fa-rotate-by",swapOpacity:"fa-swap-opacity",widthAuto:"fa-width-auto"};function Xo(e){const t=pe.cssPrefix||pe.familyPrefix||me;return t===me?e:e.replace(new RegExp(String.raw`(?<=^|\s)${me}-`,"g"),`${t}-`)}function Vo(e){const{beat:t,fade:a,beatFade:r,bounce:n,shake:i,spin:o,spinPulse:l,spinReverse:f,pulse:d,fixedWidth:m,inverse:v,border:S,flip:h,size:k,rotation:A,pull:I,swapOpacity:C,rotateBy:N,widthAuto:z,className:F}=e,w=[];return F&&w.push(...F.split(" ")),t&&w.push(W.beat),a&&w.push(W.fade),r&&w.push(W.beatFade),n&&w.push(W.bounce),i&&w.push(W.shake),o&&w.push(W.spin),f&&w.push(W.spinReverse),l&&w.push(W.spinPulse),d&&w.push(W.pulse),m&&w.push(Y.fixedWidth),v&&w.push(Y.inverse),S&&w.push(Y.border),h===!0&&w.push(Y.flip),(h==="horizontal"||h==="both")&&w.push(Y.flipHorizontal),(h==="vertical"||h==="both")&&w.push(Y.flipVertical),k!=null&&w.push(qo[k]),A!=null&&A!==0&&w.push(Go[A]),I!=null&&w.push(Bo[I]),C&&w.push(Y.swapOpacity),Ho?(N&&w.push(Y.rotateBy),z&&w.push(Y.widthAuto),(pe.cssPrefix||pe.familyPrefix||me)===me?w:w.map(Xo)):w}var Jo=e=>typeof e=="object"&&"icon"in e&&!!e.icon;function ea(e){if(e)return Jo(e)?e:ir.icon(e)}function Ko(e){return Object.keys(e)}var ta=new Wo("FontAwesomeIcon"),lr={border:!1,className:"",mask:void 0,maskId:void 0,fixedWidth:!1,inverse:!1,flip:!1,icon:void 0,listItem:!1,pull:void 0,pulse:!1,rotation:void 0,rotateBy:!1,size:void 0,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:void 0,transform:void 0,swapOpacity:!1,widthAuto:!1},Qo=new Set(Object.keys(lr)),Zo=ra.forwardRef((e,t)=>{const a={...lr,...e},{icon:r,mask:n,symbol:i,title:o,titleId:l,maskId:f,transform:d}=a,m=Zt(f,!!n),v=Zt(l,!!o),S=ea(r);if(!S)return ta.error("Icon lookup is undefined",r),null;const h=Vo(a),k=typeof d=="string"?ir.transform(d):d,A=ea(n),I=Fo(S,{...h.length>0&&{classes:h},...k&&{transform:k},...A&&{mask:A},symbol:i,title:o,titleId:v,maskId:m});if(!I)return ta.error("Could not find icon",S),null;const{abstract:C}=I,N={ref:t};for(const z of Ko(a))Qo.has(z)||(N[z]=a[z]);return Uo(C[0],N)});Zo.displayName="FontAwesomeIcon";var hs={prefix:"fas",iconName:"paste",icon:[512,512,["file-clipboard"],"f0ea","M64 0C28.7 0 0 28.7 0 64L0 384c0 35.3 28.7 64 64 64l112 0 0-224c0-61.9 50.1-112 112-112l64 0 0-48c0-35.3-28.7-64-64-64L64 0zM248 112l-144 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l144 0c13.3 0 24 10.7 24 24s-10.7 24-24 24zm40 48c-35.3 0-64 28.7-64 64l0 224c0 35.3 28.7 64 64 64l160 0c35.3 0 64-28.7 64-64l0-165.5c0-17-6.7-33.3-18.7-45.3l-58.5-58.5c-12-12-28.3-18.7-45.3-18.7L288 160z"]},gs={prefix:"fas",iconName:"question",icon:[320,512,[10067,10068,61736],"3f","M64 160c0-53 43-96 96-96s96 43 96 96c0 42.7-27.9 78.9-66.5 91.4-28.4 9.2-61.5 35.3-61.5 76.6l0 24c0 17.7 14.3 32 32 32s32-14.3 32-32l0-24c0-1.7 .6-4.1 3.5-7.3 3-3.3 7.9-6.5 13.7-8.4 64.3-20.7 110.8-81 110.8-152.3 0-88.4-71.6-160-160-160S0 71.6 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm96 352c22.1 0 40-17.9 40-40s-17.9-40-40-40-40 17.9-40 40 17.9 40 40 40z"]},ys={prefix:"fas",iconName:"envelope",icon:[512,512,[128386,9993,61443],"f0e0","M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z"]},es={prefix:"fas",iconName:"cloud-arrow-up",icon:[576,512,[62338,"cloud-upload","cloud-upload-alt"],"f0ee","M144 480c-79.5 0-144-64.5-144-144 0-63.4 41-117.2 97.9-136.5-1.3-7.7-1.9-15.5-1.9-23.5 0-79.5 64.5-144 144-144 55.4 0 103.5 31.3 127.6 77.1 14.2-8.3 30.8-13.1 48.4-13.1 53 0 96 43 96 96 0 15.7-3.8 30.6-10.5 43.7 44 20.3 74.5 64.7 74.5 116.3 0 70.7-57.3 128-128 128l-304 0zM305 191c-9.4-9.4-24.6-9.4-33.9 0l-72 72c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l31-31 0 102.1c0 13.3 10.7 24 24 24s24-10.7 24-24l0-102.1 31 31c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-72-72z"]},bs=es,ts={prefix:"fas",iconName:"up-right-from-square",icon:[512,512,["external-link-alt"],"f35d","M290.4 19.8C295.4 7.8 307.1 0 320 0L480 0c17.7 0 32 14.3 32 32l0 160c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9L400 157.3 246.6 310.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L354.7 112 297.4 54.6c-9.2-9.2-11.9-22.9-6.9-34.9zM0 176c0-44.2 35.8-80 80-80l80 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-80 0c-8.8 0-16 7.2-16 16l0 256c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16l0-80c0-17.7 14.3-32 32-32s32 14.3 32 32l0 80c0 44.2-35.8 80-80 80L80 512c-44.2 0-80-35.8-80-80L0 176z"]},xs=ts,as={prefix:"fas",iconName:"magnifying-glass",icon:[512,512,[128269,"search"],"f002","M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"]},Ss=as,ws={prefix:"fas",iconName:"reply",icon:[512,512,[61714,"mail-reply"],"f3e5","M204.2 18.4c12 5 19.8 16.6 19.8 29.6l0 80 112 0c97.2 0 176 78.8 176 176 0 113.3-81.5 163.9-100.2 174.1-2.5 1.4-5.3 1.9-8.1 1.9-10.9 0-19.7-8.9-19.7-19.7 0-7.5 4.3-14.4 9.8-19.5 9.4-8.8 22.2-26.4 22.2-56.7 0-53-43-96-96-96l-96 0 0 80c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-160-160c-12.5-12.5-12.5-32.8 0-45.3l160-160c9.2-9.2 22.9-11.9 34.9-6.9z"]},As={prefix:"fas",iconName:"key",icon:[512,512,[128273],"f084","M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0 160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17l0 80c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24l0-40 40 0c13.3 0 24-10.7 24-24l0-40 40 0c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"]},Es={prefix:"fas",iconName:"eye",icon:[576,512,[128065],"f06e","M288 32c-80.8 0-145.5 36.8-192.6 80.6-46.8 43.5-78.1 95.4-93 131.1-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64-11.5 0-22.3-3-31.7-8.4-1 10.9-.1 22.1 2.9 33.2 13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-12.2-45.7-55.5-74.8-101.1-70.8 5.3 9.3 8.4 20.1 8.4 31.7z"]},ks={prefix:"fas",iconName:"trash",icon:[448,512,[],"f1f8","M136.7 5.9L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-8.7-26.1C306.9-7.2 294.7-16 280.9-16L167.1-16c-13.8 0-26 8.8-30.4 21.9zM416 144L32 144 53.1 467.1C54.7 492.4 75.7 512 101 512L347 512c25.3 0 46.3-19.6 47.9-44.9L416 144z"]},Cs={prefix:"fas",iconName:"clipboard-check",icon:[384,512,[],"f46c","M256 0c23.7 0 44.4 12.9 55.4 32l8.6 0c35.3 0 64 28.7 64 64l0 352c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l8.6 0C83.6 12.9 104.3 0 128 0L256 0zm26.9 212.6c-10.7-7.8-25.7-5.4-33.5 5.3l-85.6 117.7-26.5-27.4c-9.2-9.5-24.4-9.8-33.9-.6s-9.8 24.4-.6 33.9l46.4 48c4.9 5.1 11.8 7.8 18.9 7.3s13.6-4.1 17.8-9.8L288.2 246.1c7.8-10.7 5.4-25.7-5.3-33.5zM136 64c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L136 64z"]},rs={prefix:"fas",iconName:"note-sticky",icon:[448,512,[62026,"sticky-note"],"f249","M64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 213.5c0 17-6.7 33.3-18.7 45.3L322.7 461.3c-12 12-28.3 18.7-45.3 18.7L64 480zM389.5 304L296 304c-13.3 0-24 10.7-24 24l0 93.5 117.5-117.5z"]},Ls=rs,Ps={prefix:"fas",iconName:"book-skull",icon:[448,512,["book-dead"],"f6b7","M96 512l320 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-66.7c18.6-6.6 32-24.4 32-45.3l0-288c0-26.5-21.5-48-48-48L96 0C43 0 0 43 0 96L0 416c0 53 43 96 96 96zM64 416c0-17.7 14.3-32 32-32l256 0 0 64-256 0c-17.7 0-32-14.3-32-32zM272 163.2l0 12.8c0 8.8-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16l0-12.8c-19.4-11.7-32-30.3-32-51.2 0-35.3 35.8-64 80-64s80 28.7 80 64c0 20.9-12.6 39.5-32 51.2zM208 112a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm48 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32zm74.2 95.7c4.6 10.1 .1 21.9-9.9 26.5l-47.9 21.8 47.9 21.8c10.1 4.6 14.5 16.4 9.9 26.5s-16.4 14.5-26.5 9.9L224 294 144.3 330.2c-10.1 4.6-21.9 .1-26.5-9.9s-.1-21.9 9.9-26.5l47.9-21.8-47.9-21.8c-10.1-4.6-14.5-16.4-9.9-26.5s16.4-14.5 26.5-9.9L224 250 303.7 213.8c10.1-4.6 21.9-.1 26.5 9.9z"]},ns={prefix:"fas",iconName:"pen-to-square",icon:[512,512,["edit"],"f044","M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L368 46.1 465.9 144 490.3 119.6c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L432 177.9 334.1 80 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"]},Is=ns,_s={prefix:"fas",iconName:"heart",icon:[512,512,[128153,128154,128155,128156,128420,129293,129294,129505,9829,10084,61578],"f004","M241 87.1l15 20.7 15-20.7C296 52.5 336.2 32 378.9 32 452.4 32 512 91.6 512 165.1l0 2.6c0 112.2-139.9 242.5-212.9 298.2-12.4 9.4-27.6 14.1-43.1 14.1s-30.8-4.6-43.1-14.1C139.9 410.2 0 279.9 0 167.7l0-2.6C0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1z"]},Ms={prefix:"fas",iconName:"chevron-right",icon:[320,512,[9002],"f054","M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"]},Ns={prefix:"fas",iconName:"fire",icon:[448,512,[128293],"f06d","M160.5-26.4c9.3-7.8 23-7.5 31.9 .9 12.3 11.6 23.3 24.4 33.9 37.4 13.5 16.5 29.7 38.3 45.3 64.2 5.2-6.8 10-12.8 14.2-17.9 1.1-1.3 2.2-2.7 3.3-4.1 7.9-9.8 17.7-22.1 30.8-22.1 13.4 0 22.8 11.9 30.8 22.1 1.3 1.7 2.6 3.3 3.9 4.8 10.3 12.4 24 30.3 37.7 52.4 27.2 43.9 55.6 106.4 55.6 176.6 0 123.7-100.3 224-224 224S0 411.7 0 288c0-91.1 41.1-170 80.5-225 19.9-27.7 39.7-49.9 54.6-65.1 8.2-8.4 16.5-16.7 25.5-24.2zM225.7 416c25.3 0 47.7-7 68.8-21 42.1-29.4 53.4-88.2 28.1-134.4-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5-17.3-22.1-49.1-62.4-65.3-83-5.4-6.9-15.2-8-21.5-1.9-18.3 17.8-51.5 56.8-51.5 104.3 0 68.6 50.6 109.2 113.7 109.2z"]},zs={prefix:"fas",iconName:"venus-mars",icon:[640,512,[9892],"f228","M480-64c-17.7 0-32 14.3-32 32S462.3 0 480 0L530.7 0 474 56.7c-26.3-15.7-57.1-24.7-90-24.7-35.4 0-68.4 10.5-96 28.5-27.6-18-60.6-28.5-96-28.5-97.2 0-176 78.8-176 176 0 86.3 62.1 158.1 144 173.1l0 34.9-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0 0-34.9c23.3-4.3 44.9-13.1 64-25.6 27.6 18 60.6 28.5 96 28.5 97.2 0 176-78.8 176-176 0-41.1-14.1-79-37.8-109L576 45.3 576 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128c0-17.7-14.3-32-32-32L480-64zM336 309.2c20.2-28.6 32-63.5 32-101.2s-11.8-72.6-32-101.2c14.6-6.9 30.8-10.8 48-10.8 61.9 0 112 50.1 112 112S445.9 320 384 320c-17.2 0-33.5-3.9-48-10.8zM288 150.3c10.2 16.9 16 36.6 16 57.7s-5.8 40.9-16 57.7c-10.2-16.9-16-36.6-16-57.7s5.8-40.9 16-57.7zm-48-43.5c-20.2 28.6-32 63.5-32 101.2s11.8 72.6 32 101.2c-14.5 6.9-30.8 10.8-48 10.8-61.9 0-112-50.1-112-112S130.1 96 192 96c17.2 0 33.5 3.9 48 10.8z"]},Ts={prefix:"fas",iconName:"comment",icon:[512,512,[128489,61669],"f075","M512 240c0 132.5-114.6 240-256 240-37.1 0-72.3-7.4-104.1-20.7L33.5 510.1c-9.4 4-20.2 1.7-27.1-5.8S-2 485.8 2.8 476.8l48.8-92.2C19.2 344.3 0 294.3 0 240 0 107.5 114.6 0 256 0S512 107.5 512 240z"]},Os={prefix:"fas",iconName:"thumbs-down",icon:[512,512,[128078,61576],"f165","M384 32c26.5 0 48 21.5 48 48 0 6.3-1.3 12.2-3.4 17.7 20.4 5.5 35.4 24.1 35.4 46.3 0 9.1-2.6 17.6-7 24.9 22.2 4.2 39 23.7 39 47.1 0 19.7-11.9 36.6-28.9 44 17 7.4 28.9 24.3 28.9 44 0 26.5-21.5 48-48 48l-160 0 28.2 70.4c2.5 6.3 3.8 13.1 3.8 19.9l0 4.2c0 27.3-22.1 49.4-49.4 49.4-18.7 0-35.8-10.6-44.2-27.3L170.1 356.3c-6.7-13.3-10.1-28-10.1-42.9l0-186.6c0-19.4 8.9-37.8 24-50l12.2-9.7C224.6 44.4 259.8 32 296.1 32L384 32zM80 96c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-48 0c-17.7 0-32-14.3-32-32L0 128c0-17.7 14.3-32 32-32l48 0z"]},Fs={prefix:"fas",iconName:"crown",icon:[576,512,[128081],"f521","M313 87.2c9.2-7.3 15-18.6 15-31.2 0-22.1-17.9-40-40-40s-40 17.9-40 40c0 12.6 5.9 23.9 15 31.2L194.6 194.8c-10 15.7-31.3 19.6-46.2 8.4L88.9 158.7c4.5-6.4 7.1-14.3 7.1-22.7 0-22.1-17.9-40-40-40s-40 17.9-40 40c0 21.8 17.5 39.6 39.2 40L87.8 393.5c4.7 31.3 31.6 54.5 63.3 54.5l273.8 0c31.7 0 58.6-23.2 63.3-54.5L520.8 176c21.7-.4 39.2-18.2 39.2-40 0-22.1-17.9-40-40-40s-40 17.9-40 40c0 8.4 2.6 16.3 7.1 22.7l-59.4 44.6c-14.9 11.2-36.2 7.3-46.2-8.4L313 87.2z"]},Rs={prefix:"fas",iconName:"sun",icon:[576,512,[9728],"f185","M178.2-10.1c7.4-3.1 15.8-2.2 22.5 2.2l87.8 58.2 87.8-58.2c6.7-4.4 15.1-5.2 22.5-2.2S411.4-.5 413 7.3l20.9 103.2 103.2 20.9c7.8 1.6 14.4 7 17.4 14.3s2.2 15.8-2.2 22.5l-58.2 87.8 58.2 87.8c4.4 6.7 5.2 15.1 2.2 22.5s-9.6 12.8-17.4 14.3L433.8 401.4 413 504.7c-1.6 7.8-7 14.4-14.3 17.4s-15.8 2.2-22.5-2.2l-87.8-58.2-87.8 58.2c-6.7 4.4-15.1 5.2-22.5 2.2s-12.8-9.6-14.3-17.4L143 401.4 39.7 380.5c-7.8-1.6-14.4-7-17.4-14.3s-2.2-15.8 2.2-22.5L82.7 256 24.5 168.2c-4.4-6.7-5.2-15.1-2.2-22.5s9.6-12.8 17.4-14.3L143 110.6 163.9 7.3c1.6-7.8 7-14.4 14.3-17.4zM207.6 256a80.4 80.4 0 1 1 160.8 0 80.4 80.4 0 1 1 -160.8 0zm208.8 0a128.4 128.4 0 1 0 -256.8 0 128.4 128.4 0 1 0 256.8 0z"]},js={prefix:"fas",iconName:"lightbulb",icon:[384,512,[128161],"f0eb","M292.9 384c7.3-22.3 21.9-42.5 38.4-59.9 32.7-34.4 52.7-80.9 52.7-132.1 0-106-86-192-192-192S0 86 0 192c0 51.2 20 97.7 52.7 132.1 16.5 17.4 31.2 37.6 38.4 59.9l201.7 0zM288 432l-192 0 0 16c0 44.2 35.8 80 80 80l32 0c44.2 0 80-35.8 80-80l0-16zM184 112c-39.8 0-72 32.2-72 72 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-66.3 53.7-120 120-120 13.3 0 24 10.7 24 24s-10.7 24-24 24z"]},$s={prefix:"fas",iconName:"user-plus",icon:[640,512,[],"f234","M136 128a120 120 0 1 1 240 0 120 120 0 1 1 -240 0zM48 482.3C48 383.8 127.8 304 226.3 304l59.4 0c98.5 0 178.3 79.8 178.3 178.3 0 16.4-13.3 29.7-29.7 29.7L77.7 512C61.3 512 48 498.7 48 482.3zM544 96c13.3 0 24 10.7 24 24l0 48 48 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-48 0 0 48c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-48-48 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0 0-48c0-13.3 10.7-24 24-24z"]},is={prefix:"fas",iconName:"circle-plus",icon:[512,512,["plus-circle"],"f055","M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"]},Ds=is,Us={prefix:"fas",iconName:"thumbs-up",icon:[512,512,[128077,61575],"f164","M80 160c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-48 0c-17.7 0-32-14.3-32-32L0 192c0-17.7 14.3-32 32-32l48 0zM270.6 16C297.9 16 320 38.1 320 65.4l0 4.2c0 6.8-1.3 13.6-3.8 19.9L288 160 448 160c26.5 0 48 21.5 48 48 0 19.7-11.9 36.6-28.9 44 17 7.4 28.9 24.3 28.9 44 0 23.4-16.8 42.9-39 47.1 4.4 7.3 7 15.8 7 24.9 0 22.2-15 40.8-35.4 46.3 2.2 5.5 3.4 11.5 3.4 17.7 0 26.5-21.5 48-48 48l-87.9 0c-36.3 0-71.6-12.4-99.9-35.1L184 435.2c-15.2-12.1-24-30.5-24-50l0-186.6c0-14.9 3.5-29.6 10.1-42.9L226.3 43.3C234.7 26.6 251.8 16 270.6 16z"]},os={prefix:"fas",iconName:"user-group",icon:[576,512,[128101,"user-friends"],"f500","M64 128a112 112 0 1 1 224 0 112 112 0 1 1 -224 0zM0 464c0-97.2 78.8-176 176-176s176 78.8 176 176l0 6c0 23.2-18.8 42-42 42L42 512c-23.2 0-42-18.8-42-42l0-6zM432 64a96 96 0 1 1 0 192 96 96 0 1 1 0-192zm0 240c79.5 0 144 64.5 144 144l0 22.4c0 23-18.6 41.6-41.6 41.6l-144.8 0c6.6-12.5 10.4-26.8 10.4-42l0-6c0-51.5-17.4-98.9-46.5-136.7 22.6-14.7 49.6-23.3 78.5-23.3z"]},Ws=os,Ys={prefix:"fas",iconName:"right-from-bracket",icon:[512,512,["sign-out-alt"],"f2f5","M505 273c9.4-9.4 9.4-24.6 0-33.9L361 95c-6.9-6.9-17.2-8.9-26.2-5.2S320 102.3 320 112l0 80-112 0c-26.5 0-48 21.5-48 48l0 32c0 26.5 21.5 48 48 48l112 0 0 80c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2L505 273zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"]},Hs={prefix:"fas",iconName:"arrow-up",icon:[384,512,[8593],"f062","M214.6 17.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 117.3 160 488c0 17.7 14.3 32 32 32s32-14.3 32-32l0-370.7 105.4 105.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"]},ss={prefix:"fas",iconName:"up-down-left-right",icon:[512,512,["arrows-alt"],"f0b2","M278.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9S179.1 128 192 128l32 0 0 96-96 0 0-32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9S128 332.9 128 320l0-32 96 0 0 96-32 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9S332.9 384 320 384l-32 0 0-96 96 0 0 32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S384 179.1 384 192l0 32-96 0 0-96 32 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64z"]},Bs=ss,Gs={prefix:"fas",iconName:"calendar",icon:[448,512,[128197,128198],"f133","M128 0C110.3 0 96 14.3 96 32l0 32-32 0C28.7 64 0 92.7 0 128l0 48 448 0 0-48c0-35.3-28.7-64-64-64l-32 0 0-32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 32-128 0 0-32c0-17.7-14.3-32-32-32zM0 224L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-192-448 0z"]},ls={prefix:"fas",iconName:"house",icon:[512,512,[127968,63498,63500,"home","home-alt","home-lg-alt"],"f015","M277.8 8.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S18.8 272 32 272l16 0 0 176c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-176 16 0c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1l-224-208zM240 320l32 0c26.5 0 48 21.5 48 48l0 96-128 0 0-96c0-26.5 21.5-48 48-48z"]},qs=ls,Xs={prefix:"fas",iconName:"spinner",icon:[512,512,[],"f110","M208 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm0 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM48 208a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm368 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM75 369.1A48 48 0 1 1 142.9 437 48 48 0 1 1 75 369.1zM75 75A48 48 0 1 1 142.9 142.9 48 48 0 1 1 75 75zM437 369.1A48 48 0 1 1 369.1 437 48 48 0 1 1 437 369.1z"]},Vs={prefix:"fas",iconName:"brain",icon:[512,512,[129504],"f5dc","M120 56c0-30.9 25.1-56 56-56l24 0c17.7 0 32 14.3 32 32l0 448c0 17.7-14.3 32-32 32l-32 0c-29.8 0-54.9-20.4-62-48-.7 0-1.3 0-2 0-44.2 0-80-35.8-80-80 0-18 6-34.6 16-48-19.4-14.6-32-37.8-32-64 0-30.9 17.6-57.8 43.2-71.1-7.1-12-11.2-26-11.2-40.9 0-44.2 35.8-80 80-80l0-24zm272 0l0 24c44.2 0 80 35.8 80 80 0 15-4.1 29-11.2 40.9 25.7 13.3 43.2 40.1 43.2 71.1 0 26.2-12.6 49.4-32 64 10 13.4 16 30 16 48 0 44.2-35.8 80-80 80-.7 0-1.3 0-2 0-7.1 27.6-32.2 48-62 48l-32 0c-17.7 0-32-14.3-32-32l0-448c0-17.7 14.3-32 32-32l24 0c30.9 0 56 25.1 56 56z"]},Js={prefix:"fas",iconName:"user",icon:[448,512,[128100,62144,62470,"user-alt","user-large"],"f007","M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"]},Ks={prefix:"fas",iconName:"arrow-right",icon:[512,512,[8594],"f061","M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"]},fs={prefix:"fas",iconName:"xmark",icon:[384,512,[128473,10005,10006,10060,215,"close","multiply","remove","times"],"f00d","M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"]},Qs=fs,cs={prefix:"fas",iconName:"circle-check",icon:[512,512,[61533,"check-circle"],"f058","M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zM374 145.7c-10.7-7.8-25.7-5.4-33.5 5.3L221.1 315.2 169 263.1c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l72 72c5 5 11.8 7.5 18.8 7s13.4-4.1 17.5-9.8L379.3 179.2c7.8-10.7 5.4-25.7-5.3-33.5z"]},Zs=cs,e1={prefix:"fas",iconName:"moon",icon:[512,512,[127769,9214],"f186","M256 0C114.6 0 0 114.6 0 256S114.6 512 256 512c68.8 0 131.3-27.2 177.3-71.4 7.3-7 9.4-17.9 5.3-27.1s-13.7-14.9-23.8-14.1c-4.9 .4-9.8 .6-14.8 .6-101.6 0-184-82.4-184-184 0-72.1 41.5-134.6 102.1-164.8 9.1-4.5 14.3-14.3 13.1-24.4S322.6 8.5 312.7 6.3C294.4 2.2 275.4 0 256 0z"]},t1={prefix:"fas",iconName:"comment-dots",icon:[512,512,[128172,62075,"commenting"],"f4ad","M256 480c141.4 0 256-107.5 256-240S397.4 0 256 0 0 107.5 0 240c0 54.3 19.2 104.3 51.6 144.5L2.8 476.8c-4.8 9-3.3 20 3.6 27.5s17.8 9.8 27.1 5.8l118.4-50.7C183.7 472.6 218.9 480 256 480zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"]},a1={prefix:"fas",iconName:"inbox",icon:[512,512,[],"f01c","M91.8 32C59.9 32 32.9 55.4 28.4 86.9L.6 281.2c-.4 3-.6 6-.6 9.1L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-125.7c0-3-.2-6.1-.6-9.1L483.6 86.9C479.1 55.4 452.1 32 420.2 32L91.8 32zm0 64l328.5 0 27.4 192-59.9 0c-12.1 0-23.2 6.8-28.6 17.7l-14.3 28.6c-5.4 10.8-16.5 17.7-28.6 17.7l-120.4 0c-12.1 0-23.2-6.8-28.6-17.7l-14.3-28.6c-5.4-10.8-16.5-17.7-28.6-17.7L64.3 288 91.8 96z"]},r1={prefix:"fas",iconName:"chevron-left",icon:[320,512,[9001],"f053","M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"]},n1={prefix:"fas",iconName:"star",icon:[576,512,[11088,61446],"f005","M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"]},us={prefix:"fas",iconName:"triangle-exclamation",icon:[512,512,[9888,"exclamation-triangle","warning"],"f071","M256 0c14.7 0 28.2 8.1 35.2 21l216 400c6.7 12.4 6.4 27.4-.8 39.5S486.1 480 472 480L40 480c-14.1 0-27.2-7.4-34.4-19.5s-7.5-27.1-.8-39.5l216-400c7-12.9 20.5-21 35.2-21zm0 352a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm0-192c-18.2 0-32.7 15.5-31.4 33.7l7.4 104c.9 12.5 11.4 22.3 23.9 22.3 12.6 0 23-9.7 23.9-22.3l7.4-104c1.3-18.2-13.1-33.7-31.4-33.7z"]},i1=us,o1={prefix:"fas",iconName:"lock",icon:[384,512,[128274],"f023","M128 96l0 64 128 0 0-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160l0-64C64 25.3 121.3-32 192-32S320 25.3 320 96l0 64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64z"]},s1={prefix:"fas",iconName:"arrow-left",icon:[512,512,[8592],"f060","M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 105.4-105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"]},l1={prefix:"fas",iconName:"plus",icon:[448,512,[10133,61543,"add"],"2b","M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"]},f1={prefix:"fas",iconName:"copy",icon:[448,512,[],"f0c5","M192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-200.6c0-17.4-7.1-34.1-19.7-46.2L370.6 17.8C358.7 6.4 342.8 0 326.3 0L192 0zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-64 0 0 16-192 0 0-256 16 0 0-64-16 0z"]},c1={prefix:"fas",iconName:"bolt",icon:[448,512,[9889,"zap"],"f0e7","M338.8-9.9c11.9 8.6 16.3 24.2 10.9 37.8L271.3 224 416 224c13.5 0 25.5 8.4 30.1 21.1s.7 26.9-9.6 35.5l-288 240c-11.3 9.4-27.4 9.9-39.3 1.3s-16.3-24.2-10.9-37.8L176.7 288 32 288c-13.5 0-25.5-8.4-30.1-21.1s-.7-26.9 9.6-35.5l288-240c11.3-9.4 27.4-9.9 39.3-1.3z"]},u1={prefix:"fas",iconName:"compass",icon:[512,512,[129517],"f14e","M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"]},d1={prefix:"fas",iconName:"pen-nib",icon:[512,512,[10001],"f5ad","M368.5 18.3l-50.1 50.1 125.3 125.3 50.1-50.1c21.9-21.9 21.9-57.3 0-79.2L447.7 18.3c-21.9-21.9-57.3-21.9-79.2 0zM279.3 97.2l-.5 .1-144.1 43.2c-19.9 6-35.7 21.2-42.3 41L3.8 445.8c-2.9 8.7-1.9 18.2 2.5 26L161.7 316.4c-1.1-4-1.6-8.1-1.6-12.4 0-26.5 21.5-48 48-48s48 21.5 48 48-21.5 48-48 48c-4.3 0-8.5-.6-12.4-1.6L40.3 505.7c7.8 4.4 17.2 5.4 26 2.5l264.3-88.6c19.7-6.6 35-22.4 41-42.3l43.2-144.1 .1-.5-135.5-135.5z"]},m1={prefix:"fas",iconName:"bars",icon:[448,512,["navicon"],"f0c9","M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"]},v1={prefix:"fas",iconName:"dragon",icon:[640,512,[128009],"f6d5","M352 124.5l-51.9-13c-6.5-1.6-11.3-7.1-12-13.8s2.8-13.1 8.7-16.1l40.8-20.4-43.3-32.5c-5.5-4.1-7.8-11.3-5.6-17.9S297.1 0 304 0L464 0c30.2 0 58.7 14.2 76.8 38.4l57.6 76.8c6.2 8.3 9.6 18.4 9.6 28.8 0 26.5-21.5 48-48 48l-21.5 0c-17 0-33.3-6.7-45.3-18.7l-13.3-13.3-32 0 0 21.5c0 24.8 12.8 47.9 33.8 61.1l106.6 66.6c32.1 20.1 51.6 55.2 51.6 93.1 0 60.6-49.1 109.8-109.8 109.8L32.3 512c-3.3 0-6.6-.4-9.6-1.4-9.2-2.8-16.7-9.6-20.4-18.6-1.3-3.3-2.2-6.9-2.3-10.7-.2-3.7 .3-7.3 1.3-10.7 2.8-9.2 9.6-16.7 18.6-20.4 3-1.2 6.2-2 9.5-2.2L433.3 412c8.3-.7 14.7-7.7 14.7-16.1 0-4.3-1.7-8.4-4.7-11.4l-44.4-44.4c-30-30-46.9-70.7-46.9-113.1l0-102.5zM512 72.3c0-.1 0-.2 0-.3s0-.2 0-.3l0 .6zm-1.3 7.4L464.3 68.1c-.2 1.3-.3 2.6-.3 3.9 0 13.3 10.7 24 24 24 10.6 0 19.5-6.8 22.7-16.3zM130.9 116.5c16.3-14.5 40.4-16.2 58.5-4.1l130.6 87 0 27.5c0 32.8 8.4 64.8 24 93l-232 0c-6.7 0-12.7-4.2-15-10.4s-.5-13.3 4.6-17.7L171 232.3 18.4 255.8c-7 1.1-13.9-2.6-16.9-9S.1 232.8 5.4 228L130.9 116.5z"]},ds={prefix:"fas",iconName:"arrow-pointer",icon:[448,512,["mouse-pointer"],"f245","M77.3 2.5c8.1-4.1 17.9-3.2 25.1 2.3l320 239.9c8.3 6.2 11.6 17 8.4 26.8s-12.4 16.4-22.8 16.4l-152.3 0 88.9 177.7c7.9 15.8 1.5 35-14.3 42.9s-35 1.5-42.9-14.3l-88.9-177.7-91.3 121.8c-6.2 8.3-17 11.6-26.8 8.4S64 434.3 64 424L64 24c0-9.1 5.1-17.4 13.3-21.5z"]},p1=ds,ms={prefix:"fas",iconName:"cake-candles",icon:[448,512,[127874,"birthday-cake","cake"],"f1fd","M86.4-10.5L61.8 31.6C58 38.1 56 45.6 56 53.2L56 56c0 22.1 17.9 40 40 40s40-17.9 40-40l0-2.8c0-7.6-2-15-5.8-21.6L105.6-10.5c-2-3.4-5.7-5.5-9.6-5.5s-7.6 2.1-9.6 5.5zm128 0L189.8 31.6c-3.8 6.5-5.8 14-5.8 21.6l0 2.8c0 22.1 17.9 40 40 40s40-17.9 40-40l0-2.8c0-7.6-2-15-5.8-21.6L233.6-10.5c-2-3.4-5.7-5.5-9.6-5.5s-7.6 2.1-9.6 5.5zM317.8 31.6c-3.8 6.5-5.8 14-5.8 21.6l0 2.8c0 22.1 17.9 40 40 40s40-17.9 40-40l0-2.8c0-7.6-2-15-5.8-21.6L361.6-10.5c-2-3.4-5.7-5.5-9.6-5.5s-7.6 2.1-9.6 5.5L317.8 31.6zM128 160c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 53.5C26.7 226.6 0 262.2 0 304l0 20.8c20.9 1.3 41.6 7.3 60.3 18l7.1 4.1c26.3 15 58.9 13.4 83.6-4.2 43.7-31.2 102.3-31.2 146 0 24.6 17.6 57.3 19.3 83.6 4.2l7.1-4.1c18.7-10.7 39.3-16.7 60.3-18l0-20.8c0-41.8-26.7-77.4-64-90.5l0-53.5c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 48-64 0 0-48c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 48-64 0 0-48zM448 373c-12.7 1.2-25.1 5-36.5 11.5l-7.1 4.1c-42.6 24.3-95.4 21.7-135.3-6.8-27-19.3-63.2-19.3-90.2 0-39.9 28.5-92.7 31.2-135.3 6.8l-7.1-4.1C25.1 378 12.7 374.1 0 373l0 75c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-75z"]},h1=ms,vs={prefix:"fas",iconName:"circle-info",icon:[512,512,["info-circle"],"f05a","M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM224 160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-8 64l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z"]},g1=vs;var y1={prefix:"fab",iconName:"discord",icon:[576,512,[],"f392","M492.5 69.8c-.2-.3-.4-.6-.8-.7-38.1-17.5-78.4-30-119.7-37.1-.4-.1-.8 0-1.1 .1s-.6 .4-.8 .8c-5.5 9.9-10.5 20.2-14.9 30.6-44.6-6.8-89.9-6.8-134.4 0-4.5-10.5-9.5-20.7-15.1-30.6-.2-.3-.5-.6-.8-.8s-.7-.2-1.1-.2c-41.3 7.1-81.6 19.6-119.7 37.1-.3 .1-.6 .4-.8 .7-76.2 113.8-97.1 224.9-86.9 334.5 0 .3 .1 .5 .2 .8s.3 .4 .5 .6c44.4 32.9 94 58 146.8 74.2 .4 .1 .8 .1 1.1 0s.7-.4 .9-.7c11.3-15.4 21.4-31.8 30-48.8 .1-.2 .2-.5 .2-.8s0-.5-.1-.8-.2-.5-.4-.6-.4-.3-.7-.4c-15.8-6.1-31.2-13.4-45.9-21.9-.3-.2-.5-.4-.7-.6s-.3-.6-.3-.9 0-.6 .2-.9 .3-.5 .6-.7c3.1-2.3 6.2-4.7 9.1-7.1 .3-.2 .6-.4 .9-.4s.7 0 1 .1c96.2 43.9 200.4 43.9 295.5 0 .3-.1 .7-.2 1-.2s.7 .2 .9 .4c2.9 2.4 6 4.9 9.1 7.2 .2 .2 .4 .4 .6 .7s.2 .6 .2 .9-.1 .6-.3 .9-.4 .5-.6 .6c-14.7 8.6-30 15.9-45.9 21.8-.2 .1-.5 .2-.7 .4s-.3 .4-.4 .7-.1 .5-.1 .8 .1 .5 .2 .8c8.8 17 18.8 33.3 30 48.8 .2 .3 .6 .6 .9 .7s.8 .1 1.1 0c52.9-16.2 102.6-41.3 147.1-74.2 .2-.2 .4-.4 .5-.6s.2-.5 .2-.8c12.3-126.8-20.5-236.9-86.9-334.5zm-302 267.7c-29 0-52.8-26.6-52.8-59.2s23.4-59.2 52.8-59.2c29.7 0 53.3 26.8 52.8 59.2 0 32.7-23.4 59.2-52.8 59.2zm195.4 0c-29 0-52.8-26.6-52.8-59.2s23.4-59.2 52.8-59.2c29.7 0 53.3 26.8 52.8 59.2 0 32.7-23.2 59.2-52.8 59.2z"]},b1={prefix:"fab",iconName:"deviantart",icon:[320,512,[],"f1bd","M320 93.2l-98.2 179.1 7.4 9.5 90.8 0 0 127.7-160.9 0-13.5 9.2-43.7 84c-.3 0-8.6 8.6-9.2 9.2l-92.7 0 0-93.2 93.2-179.4-7.4-9.2-85.8 0 0-127.6 156 0 13.5-9.2 43.7-84c.3 0 8.6-8.6 9.2-9.2l97.6 0 0 93.1z"]};export{h1 as $,Ls as A,gs as B,Fs as C,Hs as D,i1 as E,Zo as F,Ns as G,d1 as H,b1 as I,y1 as J,Ps as K,xs as L,f1 as M,Cs as N,Zs as O,t1 as P,ks as Q,ra as R,bs as S,p1 as T,Bs as U,hs as V,Is as W,u1 as X,Ds as Y,zs as Z,_s as _,aa as a,Vs as a0,v1 as a1,Ws as a2,us as a3,Us as a4,Os as a5,n1 as a6,Es as a7,Ts as a8,ws as a9,pr as aa,Rs as b,e1 as c,Qs as d,m1 as e,Xs as f,l1 as g,$s as h,Ys as i,ps as j,qs as k,js as l,c1 as m,g1 as n,ys as o,o1 as p,s1 as q,br as r,Js as s,As as t,Ss as u,Ks as v,a1 as w,r1 as x,Ms as y,Gs as z};
