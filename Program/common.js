function $(i){return document.getElementById(i);}
var AC3_lolz="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function hexByte(num){var out="";var i=0;var a1=num>>4;var a2=num&15;out+=AC3_lolz.charAt(a1);out+=AC3_lolz.charAt(a2);return out;}
function hexCode(str){var g=str;var i=0;var a1=0;var a2=0;if(g.charCodeAt(0)>=0x61){a1=g.charCodeAt(0)-0x61+10;}
	else if(g.charCodeAt(0)>=0x41){a1=g.charCodeAt(0)-0x41+10;}else{a1=g.charCodeAt(0)-0x30;}
if(g.charCodeAt(1)>=0x61){a2=g.charCodeAt(1)-0x61+10;}else if(g.charCodeAt(1)>=0x41){a2=g.charCodeAt(1)-0x41+10;}
else{a2=g.charCodeAt(1)-0x30;}return (a1*16+a2*1);}
function hexstrToString(str){var out="";var i;var c=str;for(i=0;i<c.length;i+=2){out+=String.fromCharCode(hexCode(c.charAt(i)+c.charAt(i+1)));}return out;}
function include(p,r){var c = document.getElementsByTagName("script");if(!r){for(var i=0;i<c.length;i++)
{if(c[i].src&&c[i].src.toLowerCase()==p.toLowerCase()){return false;}}}var s=document.createElement('script');s.type="text/javascript";s.src=p;
var h=document.getElementsByTagName('head')[0];h.appendChild(s);}
function ampEncode(c){var o="";for(var i=0;i<c.length;i++){o+="&#"+c.charCodeAt(i)+";";}return o;}
function ampDecode(d){while(d.match(/&#[0-9]+;/)){var wp=d.match(/&#([0-9]+);/)[1];d=d.replace(/&#[0-9]+;/,String.fromCharCode(parseInt(wp)));}return d;}