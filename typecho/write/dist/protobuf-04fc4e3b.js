function wordRegexp(e){return new RegExp("^(("+e.join(")|(")+"))\\b","i")}var keywordArray=["package","message","import","syntax","required","optional","repeated","reserved","default","extensions","packed","bool","bytes","double","enum","float","string","int32","int64","uint32","uint64","sint32","sint64","fixed32","fixed64","sfixed32","sfixed64","option","service","rpc","returns"],keywords=wordRegexp(keywordArray),identifiers=new RegExp("^[_A-Za-z¡-￿][_A-Za-z0-9¡-￿]*");function tokenBase(e){if(e.eatSpace())return null;if(e.match("//"))return e.skipToEnd(),"comment";if(e.match(/^[0-9\.+-]/,!1)){if(e.match(/^[+-]?0x[0-9a-fA-F]+/))return"number";if(e.match(/^[+-]?\d*\.\d+([EeDd][+-]?\d+)?/))return"number";if(e.match(/^[+-]?\d+([EeDd][+-]?\d+)?/))return"number"}return e.match(/^"([^"]|(""))*"/)||e.match(/^'([^']|(''))*'/)?"string":e.match(keywords)?"keyword":e.match(identifiers)?"variable":(e.next(),null)}const protobuf={token:tokenBase,languageData:{autocomplete:keywordArray}};export{protobuf};
