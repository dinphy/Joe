function words(e){for(var t={},n=e.split(" "),r=0;r<n.length;++r)t[n[r]]=!0;return t}function metaHook(e,t){return!!t.startOfLine&&(e.skipToEnd(),"meta")}var curPunc,keyword=words("abs acos allnodes ascii asin asstring atan atan2 ave case choose choosen choosesets clustersize combine correlation cos cosh count covariance cron dataset dedup define denormalize distribute distributed distribution ebcdic enth error evaluate event eventextra eventname exists exp failcode failmessage fetch fromunicode getisvalid global graph group hash hash32 hash64 hashcrc hashmd5 having if index intformat isvalid iterate join keyunicode length library limit ln local log loop map matched matchlength matchposition matchtext matchunicode max merge mergejoin min nolocal nonempty normalize parse pipe power preload process project pull random range rank ranked realformat recordof regexfind regexreplace regroup rejected rollup round roundup row rowdiff sample set sin sinh sizeof soapcall sort sorted sqrt stepped stored sum table tan tanh thisnode topn tounicode transfer trim truncate typeof ungroup unicodeorder variance which workunit xmldecode xmlencode xmltext xmlunicode"),variable=words("apply assert build buildindex evaluate fail keydiff keypatch loadxml nothor notify output parallel sequential soapcall wait"),variable_2=words("__compressed__ all and any as atmost before beginc++ best between case const counter csv descend encrypt end endc++ endmacro except exclusive expire export extend false few first flat from full function group header heading hole ifblock import in interface joined keep keyed last left limit load local locale lookup macro many maxcount maxlength min skew module named nocase noroot noscan nosort not of only opt or outer overwrite packed partition penalty physicallength pipe quote record relationship repeat return right scan self separator service shared skew skip sql store terminator thor threshold token transform trim true type unicodeorder unsorted validate virtual whole wild within xml xpath"),variable_3=words("ascii big_endian boolean data decimal ebcdic integer pattern qstring real record rule set of string token udecimal unicode unsigned varstring varunicode"),builtin=words("checkpoint deprecated failcode failmessage failure global independent onwarning persist priority recovery stored success wait when"),blockKeywords=words("catch class do else finally for if switch try while"),atoms=words("true false null"),hooks={"#":metaHook},isOperatorChar=/[+\-*&%=<>!?|\/]/;function tokenBase(e,t){var n=e.next();if(hooks[n]){var r=hooks[n](e,t);if(!1!==r)return r}if('"'==n||"'"==n)return t.tokenize=tokenString(n),t.tokenize(e,t);if(/[\[\]{}\(\),;\:\.]/.test(n))return curPunc=n,null;if(/\d/.test(n))return e.eatWhile(/[\w\.]/),"number";if("/"==n){if(e.eat("*"))return(t.tokenize=tokenComment)(e,t);if(e.eat("/"))return e.skipToEnd(),"comment"}if(isOperatorChar.test(n))return e.eatWhile(isOperatorChar),"operator";e.eatWhile(/[\w\$_]/);var o=e.current().toLowerCase();if(keyword.propertyIsEnumerable(o))return blockKeywords.propertyIsEnumerable(o)&&(curPunc="newstatement"),"keyword";if(variable.propertyIsEnumerable(o))return blockKeywords.propertyIsEnumerable(o)&&(curPunc="newstatement"),"variable";if(variable_2.propertyIsEnumerable(o))return blockKeywords.propertyIsEnumerable(o)&&(curPunc="newstatement"),"modifier";if(variable_3.propertyIsEnumerable(o))return blockKeywords.propertyIsEnumerable(o)&&(curPunc="newstatement"),"type";if(builtin.propertyIsEnumerable(o))return blockKeywords.propertyIsEnumerable(o)&&(curPunc="newstatement"),"builtin";for(var a=o.length-1;0<=a&&(!isNaN(o[a])||"_"==o[a]);)--a;if(0<a){e=o.substr(0,a+1);if(variable_3.propertyIsEnumerable(e))return blockKeywords.propertyIsEnumerable(e)&&(curPunc="newstatement"),"type"}return atoms.propertyIsEnumerable(o)?"atom":null}function tokenString(a){return function(e,t){for(var n,r=!1,o=!1;null!=(n=e.next());){if(n==a&&!r){o=!0;break}r=!r&&"\\"==n}return!o&&r||(t.tokenize=tokenBase),"string"}}function tokenComment(e,t){for(var n,r=!1;n=e.next();){if("/"==n&&r){t.tokenize=tokenBase;break}r="*"==n}return"comment"}function Context(e,t,n,r,o){this.indented=e,this.column=t,this.type=n,this.align=r,this.prev=o}function pushContext(e,t,n){return e.context=new Context(e.indented,t,n,null,e.context)}function popContext(e){var t=e.context.type;return")"!=t&&"]"!=t&&"}"!=t||(e.indented=e.context.indented),e.context=e.context.prev}const ecl={startState:function(e){return{tokenize:null,context:new Context(-e,0,"top",!1),indented:0,startOfLine:!0}},token:function(e,t){var n=t.context;if(e.sol()&&(null==n.align&&(n.align=!1),t.indented=e.indentation(),t.startOfLine=!0),e.eatSpace())return null;curPunc=null;var r=(t.tokenize||tokenBase)(e,t);if("comment"==r||"meta"==r)return r;if(null==n.align&&(n.align=!0),";"!=curPunc&&":"!=curPunc||"statement"!=n.type)if("{"==curPunc)pushContext(t,e.column(),"}");else if("["==curPunc)pushContext(t,e.column(),"]");else if("("==curPunc)pushContext(t,e.column(),")");else if("}"==curPunc){for(;"statement"==n.type;)n=popContext(t);for("}"==n.type&&(n=popContext(t));"statement"==n.type;)n=popContext(t)}else curPunc==n.type?popContext(t):("}"==n.type||"top"==n.type||"statement"==n.type&&"newstatement"==curPunc)&&pushContext(t,e.column(),"statement");else popContext(t);return t.startOfLine=!1,r},indent:function(e,t,n){if(e.tokenize!=tokenBase&&null!=e.tokenize)return 0;var r=e.context,e=t&&t.charAt(0),t=e==(r="statement"==r.type&&"}"==e?r.prev:r).type;return"statement"==r.type?r.indented+("{"==e?0:n.unit):r.align?r.column+(t?0:1):r.indented+(t?0:n.unit)},languageData:{indentOnInput:/^\s*[{}]$/}};export{ecl};
