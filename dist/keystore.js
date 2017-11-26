require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function check(e){if(e.length<8)return!1;if(e.length>72)return!1;if(48!==e[0])return!1;if(e[1]!==e.length-2)return!1;if(2!==e[2])return!1;var r=e[3];if(0===r)return!1;if(5+r>=e.length)return!1;if(2!==e[4+r])return!1;var n=e[5+r];return 0!==n&&(6+r+n===e.length&&(!(128&e[4])&&(!(r>1&&0===e[4]&&!(128&e[5]))&&(!(128&e[r+6])&&!(n>1&&0===e[r+6]&&!(128&e[r+7]))))))}function decode(e){if(e.length<8)throw new Error("DER sequence length is too short");if(e.length>72)throw new Error("DER sequence length is too long");if(48!==e[0])throw new Error("Expected DER sequence");if(e[1]!==e.length-2)throw new Error("DER sequence length is invalid");if(2!==e[2])throw new Error("Expected DER integer");var r=e[3];if(0===r)throw new Error("R length is zero");if(5+r>=e.length)throw new Error("R length is too long");if(2!==e[4+r])throw new Error("Expected DER integer (2)");var n=e[5+r];if(0===n)throw new Error("S length is zero");if(6+r+n!==e.length)throw new Error("S length is invalid");if(128&e[4])throw new Error("R value is negative");if(r>1&&0===e[4]&&!(128&e[5]))throw new Error("R value excessively padded");if(128&e[r+6])throw new Error("S value is negative");if(n>1&&0===e[r+6]&&!(128&e[r+7]))throw new Error("S value excessively padded");return{r:e.slice(4,4+r),s:e.slice(6+r)}}function encode(e,r){var n=e.length,t=r.length;if(0===n)throw new Error("R length is zero");if(0===t)throw new Error("S length is zero");if(n>33)throw new Error("R length is too long");if(t>33)throw new Error("S length is too long");if(128&e[0])throw new Error("R value is negative");if(128&r[0])throw new Error("S value is negative");if(n>1&&0===e[0]&&!(128&e[1]))throw new Error("R value excessively padded");if(t>1&&0===r[0]&&!(128&r[1]))throw new Error("S value excessively padded");var o=Buffer.allocUnsafe(6+n+t);return o[0]=48,o[1]=o.length-2,o[2]=2,o[3]=e.length,e.copy(o,4),o[4+n]=2,o[5+n]=r.length,r.copy(o,6+n),o}var Buffer=require("safe-buffer").Buffer;module.exports={check:check,decode:decode,encode:encode};

},{"safe-buffer":52}],2:[function(require,module,exports){
!function(t,i){"use strict";function r(t,i){if(!t)throw new Error(i||"Assertion failed")}function h(t,i){t.super_=i;var r=function(){};r.prototype=i.prototype,t.prototype=new r,t.prototype.constructor=t}function n(t,i,r){if(n.isBN(t))return t;this.negative=0,this.words=null,this.length=0,this.red=null,null!==t&&("le"!==i&&"be"!==i||(r=i,i=10),this._init(t||0,i||10,r||"be"))}function e(t,i,r){for(var h=0,n=Math.min(t.length,r),e=i;e<n;e++){var o=t.charCodeAt(e)-48;h<<=4,h|=o>=49&&o<=54?o-49+10:o>=17&&o<=22?o-17+10:15&o}return h}function o(t,i,r,h){for(var n=0,e=Math.min(t.length,r),o=i;o<e;o++){var s=t.charCodeAt(o)-48;n*=h,n+=s>=49?s-49+10:s>=17?s-17+10:s}return n}function s(t,i,r){r.negative=i.negative^t.negative;var h=t.length+i.length|0;r.length=h,h=h-1|0;var n=0|t.words[0],e=0|i.words[0],o=n*e,s=67108863&o,u=o/67108864|0;r.words[0]=s;for(var a=1;a<h;a++){for(var l=u>>>26,m=67108863&u,f=Math.min(a,i.length-1),d=Math.max(0,a-t.length+1);d<=f;d++){var p=a-d|0;l+=(o=(n=0|t.words[p])*(e=0|i.words[d])+m)/67108864|0,m=67108863&o}r.words[a]=0|m,u=0|l}return 0!==u?r.words[a]=0|u:r.length--,r.strip()}function u(t,i,r){return(new a).mulp(t,i,r)}function a(t,i){this.x=t,this.y=i}function l(t,i){this.name=t,this.p=new n(i,16),this.n=this.p.bitLength(),this.k=new n(1).iushln(this.n).isub(this.p),this.tmp=this._tmp()}function m(){l.call(this,"k256","ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")}function f(){l.call(this,"p224","ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")}function d(){l.call(this,"p192","ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")}function p(){l.call(this,"25519","7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")}function M(t){if("string"==typeof t){var i=n._prime(t);this.m=i.p,this.prime=i}else r(t.gtn(1),"modulus must be greater than 1"),this.m=t,this.prime=null}function v(t){M.call(this,t),this.shift=this.m.bitLength(),this.shift%26!=0&&(this.shift+=26-this.shift%26),this.r=new n(1).iushln(this.shift),this.r2=this.imod(this.r.sqr()),this.rinv=this.r._invmp(this.m),this.minv=this.rinv.mul(this.r).isubn(1).div(this.m),this.minv=this.minv.umod(this.r),this.minv=this.r.sub(this.minv)}"object"==typeof t?t.exports=n:i.BN=n,n.BN=n,n.wordSize=26;var g;try{g=require("buffer").Buffer}catch(t){}n.isBN=function(t){return t instanceof n||null!==t&&"object"==typeof t&&t.constructor.wordSize===n.wordSize&&Array.isArray(t.words)},n.max=function(t,i){return t.cmp(i)>0?t:i},n.min=function(t,i){return t.cmp(i)<0?t:i},n.prototype._init=function(t,i,h){if("number"==typeof t)return this._initNumber(t,i,h);if("object"==typeof t)return this._initArray(t,i,h);"hex"===i&&(i=16),r(i===(0|i)&&i>=2&&i<=36);var n=0;"-"===(t=t.toString().replace(/\s+/g,""))[0]&&n++,16===i?this._parseHex(t,n):this._parseBase(t,i,n),"-"===t[0]&&(this.negative=1),this.strip(),"le"===h&&this._initArray(this.toArray(),i,h)},n.prototype._initNumber=function(t,i,h){t<0&&(this.negative=1,t=-t),t<67108864?(this.words=[67108863&t],this.length=1):t<4503599627370496?(this.words=[67108863&t,t/67108864&67108863],this.length=2):(r(t<9007199254740992),this.words=[67108863&t,t/67108864&67108863,1],this.length=3),"le"===h&&this._initArray(this.toArray(),i,h)},n.prototype._initArray=function(t,i,h){if(r("number"==typeof t.length),t.length<=0)return this.words=[0],this.length=1,this;this.length=Math.ceil(t.length/3),this.words=new Array(this.length);for(var n=0;n<this.length;n++)this.words[n]=0;var e,o,s=0;if("be"===h)for(n=t.length-1,e=0;n>=0;n-=3)o=t[n]|t[n-1]<<8|t[n-2]<<16,this.words[e]|=o<<s&67108863,this.words[e+1]=o>>>26-s&67108863,(s+=24)>=26&&(s-=26,e++);else if("le"===h)for(n=0,e=0;n<t.length;n+=3)o=t[n]|t[n+1]<<8|t[n+2]<<16,this.words[e]|=o<<s&67108863,this.words[e+1]=o>>>26-s&67108863,(s+=24)>=26&&(s-=26,e++);return this.strip()},n.prototype._parseHex=function(t,i){this.length=Math.ceil((t.length-i)/6),this.words=new Array(this.length);for(var r=0;r<this.length;r++)this.words[r]=0;var h,n,o=0;for(r=t.length-6,h=0;r>=i;r-=6)n=e(t,r,r+6),this.words[h]|=n<<o&67108863,this.words[h+1]|=n>>>26-o&4194303,(o+=24)>=26&&(o-=26,h++);r+6!==i&&(n=e(t,i,r+6),this.words[h]|=n<<o&67108863,this.words[h+1]|=n>>>26-o&4194303),this.strip()},n.prototype._parseBase=function(t,i,r){this.words=[0],this.length=1;for(var h=0,n=1;n<=67108863;n*=i)h++;h--,n=n/i|0;for(var e=t.length-r,s=e%h,u=Math.min(e,e-s)+r,a=0,l=r;l<u;l+=h)a=o(t,l,l+h,i),this.imuln(n),this.words[0]+a<67108864?this.words[0]+=a:this._iaddn(a);if(0!==s){var m=1;for(a=o(t,l,t.length,i),l=0;l<s;l++)m*=i;this.imuln(m),this.words[0]+a<67108864?this.words[0]+=a:this._iaddn(a)}},n.prototype.copy=function(t){t.words=new Array(this.length);for(var i=0;i<this.length;i++)t.words[i]=this.words[i];t.length=this.length,t.negative=this.negative,t.red=this.red},n.prototype.clone=function(){var t=new n(null);return this.copy(t),t},n.prototype._expand=function(t){for(;this.length<t;)this.words[this.length++]=0;return this},n.prototype.strip=function(){for(;this.length>1&&0===this.words[this.length-1];)this.length--;return this._normSign()},n.prototype._normSign=function(){return 1===this.length&&0===this.words[0]&&(this.negative=0),this},n.prototype.inspect=function(){return(this.red?"<BN-R: ":"<BN: ")+this.toString(16)+">"};var c=["","0","00","000","0000","00000","000000","0000000","00000000","000000000","0000000000","00000000000","000000000000","0000000000000","00000000000000","000000000000000","0000000000000000","00000000000000000","000000000000000000","0000000000000000000","00000000000000000000","000000000000000000000","0000000000000000000000","00000000000000000000000","000000000000000000000000","0000000000000000000000000"],w=[0,0,25,16,12,11,10,9,8,8,7,7,7,7,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],y=[0,0,33554432,43046721,16777216,48828125,60466176,40353607,16777216,43046721,1e7,19487171,35831808,62748517,7529536,11390625,16777216,24137569,34012224,47045881,64e6,4084101,5153632,6436343,7962624,9765625,11881376,14348907,17210368,20511149,243e5,28629151,33554432,39135393,45435424,52521875,60466176];n.prototype.toString=function(t,i){t=t||10,i=0|i||1;var h;if(16===t||"hex"===t){h="";for(var n=0,e=0,o=0;o<this.length;o++){var s=this.words[o],u=(16777215&(s<<n|e)).toString(16);h=0!==(e=s>>>24-n&16777215)||o!==this.length-1?c[6-u.length]+u+h:u+h,(n+=2)>=26&&(n-=26,o--)}for(0!==e&&(h=e.toString(16)+h);h.length%i!=0;)h="0"+h;return 0!==this.negative&&(h="-"+h),h}if(t===(0|t)&&t>=2&&t<=36){var a=w[t],l=y[t];h="";var m=this.clone();for(m.negative=0;!m.isZero();){var f=m.modn(l).toString(t);h=(m=m.idivn(l)).isZero()?f+h:c[a-f.length]+f+h}for(this.isZero()&&(h="0"+h);h.length%i!=0;)h="0"+h;return 0!==this.negative&&(h="-"+h),h}r(!1,"Base should be between 2 and 36")},n.prototype.toNumber=function(){var t=this.words[0];return 2===this.length?t+=67108864*this.words[1]:3===this.length&&1===this.words[2]?t+=4503599627370496+67108864*this.words[1]:this.length>2&&r(!1,"Number can only safely store up to 53 bits"),0!==this.negative?-t:t},n.prototype.toJSON=function(){return this.toString(16)},n.prototype.toBuffer=function(t,i){return r(void 0!==g),this.toArrayLike(g,t,i)},n.prototype.toArray=function(t,i){return this.toArrayLike(Array,t,i)},n.prototype.toArrayLike=function(t,i,h){var n=this.byteLength(),e=h||Math.max(1,n);r(n<=e,"byte array longer than desired length"),r(e>0,"Requested array length <= 0"),this.strip();var o,s,u="le"===i,a=new t(e),l=this.clone();if(u){for(s=0;!l.isZero();s++)o=l.andln(255),l.iushrn(8),a[s]=o;for(;s<e;s++)a[s]=0}else{for(s=0;s<e-n;s++)a[s]=0;for(s=0;!l.isZero();s++)o=l.andln(255),l.iushrn(8),a[e-s-1]=o}return a},Math.clz32?n.prototype._countBits=function(t){return 32-Math.clz32(t)}:n.prototype._countBits=function(t){var i=t,r=0;return i>=4096&&(r+=13,i>>>=13),i>=64&&(r+=7,i>>>=7),i>=8&&(r+=4,i>>>=4),i>=2&&(r+=2,i>>>=2),r+i},n.prototype._zeroBits=function(t){if(0===t)return 26;var i=t,r=0;return 0==(8191&i)&&(r+=13,i>>>=13),0==(127&i)&&(r+=7,i>>>=7),0==(15&i)&&(r+=4,i>>>=4),0==(3&i)&&(r+=2,i>>>=2),0==(1&i)&&r++,r},n.prototype.bitLength=function(){var t=this.words[this.length-1],i=this._countBits(t);return 26*(this.length-1)+i},n.prototype.zeroBits=function(){if(this.isZero())return 0;for(var t=0,i=0;i<this.length;i++){var r=this._zeroBits(this.words[i]);if(t+=r,26!==r)break}return t},n.prototype.byteLength=function(){return Math.ceil(this.bitLength()/8)},n.prototype.toTwos=function(t){return 0!==this.negative?this.abs().inotn(t).iaddn(1):this.clone()},n.prototype.fromTwos=function(t){return this.testn(t-1)?this.notn(t).iaddn(1).ineg():this.clone()},n.prototype.isNeg=function(){return 0!==this.negative},n.prototype.neg=function(){return this.clone().ineg()},n.prototype.ineg=function(){return this.isZero()||(this.negative^=1),this},n.prototype.iuor=function(t){for(;this.length<t.length;)this.words[this.length++]=0;for(var i=0;i<t.length;i++)this.words[i]=this.words[i]|t.words[i];return this.strip()},n.prototype.ior=function(t){return r(0==(this.negative|t.negative)),this.iuor(t)},n.prototype.or=function(t){return this.length>t.length?this.clone().ior(t):t.clone().ior(this)},n.prototype.uor=function(t){return this.length>t.length?this.clone().iuor(t):t.clone().iuor(this)},n.prototype.iuand=function(t){var i;i=this.length>t.length?t:this;for(var r=0;r<i.length;r++)this.words[r]=this.words[r]&t.words[r];return this.length=i.length,this.strip()},n.prototype.iand=function(t){return r(0==(this.negative|t.negative)),this.iuand(t)},n.prototype.and=function(t){return this.length>t.length?this.clone().iand(t):t.clone().iand(this)},n.prototype.uand=function(t){return this.length>t.length?this.clone().iuand(t):t.clone().iuand(this)},n.prototype.iuxor=function(t){var i,r;this.length>t.length?(i=this,r=t):(i=t,r=this);for(var h=0;h<r.length;h++)this.words[h]=i.words[h]^r.words[h];if(this!==i)for(;h<i.length;h++)this.words[h]=i.words[h];return this.length=i.length,this.strip()},n.prototype.ixor=function(t){return r(0==(this.negative|t.negative)),this.iuxor(t)},n.prototype.xor=function(t){return this.length>t.length?this.clone().ixor(t):t.clone().ixor(this)},n.prototype.uxor=function(t){return this.length>t.length?this.clone().iuxor(t):t.clone().iuxor(this)},n.prototype.inotn=function(t){r("number"==typeof t&&t>=0);var i=0|Math.ceil(t/26),h=t%26;this._expand(i),h>0&&i--;for(var n=0;n<i;n++)this.words[n]=67108863&~this.words[n];return h>0&&(this.words[n]=~this.words[n]&67108863>>26-h),this.strip()},n.prototype.notn=function(t){return this.clone().inotn(t)},n.prototype.setn=function(t,i){r("number"==typeof t&&t>=0);var h=t/26|0,n=t%26;return this._expand(h+1),this.words[h]=i?this.words[h]|1<<n:this.words[h]&~(1<<n),this.strip()},n.prototype.iadd=function(t){var i;if(0!==this.negative&&0===t.negative)return this.negative=0,i=this.isub(t),this.negative^=1,this._normSign();if(0===this.negative&&0!==t.negative)return t.negative=0,i=this.isub(t),t.negative=1,i._normSign();var r,h;this.length>t.length?(r=this,h=t):(r=t,h=this);for(var n=0,e=0;e<h.length;e++)i=(0|r.words[e])+(0|h.words[e])+n,this.words[e]=67108863&i,n=i>>>26;for(;0!==n&&e<r.length;e++)i=(0|r.words[e])+n,this.words[e]=67108863&i,n=i>>>26;if(this.length=r.length,0!==n)this.words[this.length]=n,this.length++;else if(r!==this)for(;e<r.length;e++)this.words[e]=r.words[e];return this},n.prototype.add=function(t){var i;return 0!==t.negative&&0===this.negative?(t.negative=0,i=this.sub(t),t.negative^=1,i):0===t.negative&&0!==this.negative?(this.negative=0,i=t.sub(this),this.negative=1,i):this.length>t.length?this.clone().iadd(t):t.clone().iadd(this)},n.prototype.isub=function(t){if(0!==t.negative){t.negative=0;var i=this.iadd(t);return t.negative=1,i._normSign()}if(0!==this.negative)return this.negative=0,this.iadd(t),this.negative=1,this._normSign();var r=this.cmp(t);if(0===r)return this.negative=0,this.length=1,this.words[0]=0,this;var h,n;r>0?(h=this,n=t):(h=t,n=this);for(var e=0,o=0;o<n.length;o++)e=(i=(0|h.words[o])-(0|n.words[o])+e)>>26,this.words[o]=67108863&i;for(;0!==e&&o<h.length;o++)e=(i=(0|h.words[o])+e)>>26,this.words[o]=67108863&i;if(0===e&&o<h.length&&h!==this)for(;o<h.length;o++)this.words[o]=h.words[o];return this.length=Math.max(this.length,o),h!==this&&(this.negative=1),this.strip()},n.prototype.sub=function(t){return this.clone().isub(t)};var b=function(t,i,r){var h,n,e,o=t.words,s=i.words,u=r.words,a=0,l=0|o[0],m=8191&l,f=l>>>13,d=0|o[1],p=8191&d,M=d>>>13,v=0|o[2],g=8191&v,c=v>>>13,w=0|o[3],y=8191&w,b=w>>>13,_=0|o[4],k=8191&_,A=_>>>13,x=0|o[5],S=8191&x,Z=x>>>13,q=0|o[6],R=8191&q,B=q>>>13,N=0|o[7],L=8191&N,I=N>>>13,z=0|o[8],T=8191&z,E=z>>>13,O=0|o[9],j=8191&O,K=O>>>13,P=0|s[0],F=8191&P,C=P>>>13,D=0|s[1],H=8191&D,J=D>>>13,U=0|s[2],G=8191&U,Q=U>>>13,V=0|s[3],W=8191&V,X=V>>>13,Y=0|s[4],$=8191&Y,tt=Y>>>13,it=0|s[5],rt=8191&it,ht=it>>>13,nt=0|s[6],et=8191&nt,ot=nt>>>13,st=0|s[7],ut=8191&st,at=st>>>13,lt=0|s[8],mt=8191&lt,ft=lt>>>13,dt=0|s[9],pt=8191&dt,Mt=dt>>>13;r.negative=t.negative^i.negative,r.length=19;var vt=(a+(h=Math.imul(m,F))|0)+((8191&(n=(n=Math.imul(m,C))+Math.imul(f,F)|0))<<13)|0;a=((e=Math.imul(f,C))+(n>>>13)|0)+(vt>>>26)|0,vt&=67108863,h=Math.imul(p,F),n=(n=Math.imul(p,C))+Math.imul(M,F)|0,e=Math.imul(M,C);var gt=(a+(h=h+Math.imul(m,H)|0)|0)+((8191&(n=(n=n+Math.imul(m,J)|0)+Math.imul(f,H)|0))<<13)|0;a=((e=e+Math.imul(f,J)|0)+(n>>>13)|0)+(gt>>>26)|0,gt&=67108863,h=Math.imul(g,F),n=(n=Math.imul(g,C))+Math.imul(c,F)|0,e=Math.imul(c,C),h=h+Math.imul(p,H)|0,n=(n=n+Math.imul(p,J)|0)+Math.imul(M,H)|0,e=e+Math.imul(M,J)|0;var ct=(a+(h=h+Math.imul(m,G)|0)|0)+((8191&(n=(n=n+Math.imul(m,Q)|0)+Math.imul(f,G)|0))<<13)|0;a=((e=e+Math.imul(f,Q)|0)+(n>>>13)|0)+(ct>>>26)|0,ct&=67108863,h=Math.imul(y,F),n=(n=Math.imul(y,C))+Math.imul(b,F)|0,e=Math.imul(b,C),h=h+Math.imul(g,H)|0,n=(n=n+Math.imul(g,J)|0)+Math.imul(c,H)|0,e=e+Math.imul(c,J)|0,h=h+Math.imul(p,G)|0,n=(n=n+Math.imul(p,Q)|0)+Math.imul(M,G)|0,e=e+Math.imul(M,Q)|0;var wt=(a+(h=h+Math.imul(m,W)|0)|0)+((8191&(n=(n=n+Math.imul(m,X)|0)+Math.imul(f,W)|0))<<13)|0;a=((e=e+Math.imul(f,X)|0)+(n>>>13)|0)+(wt>>>26)|0,wt&=67108863,h=Math.imul(k,F),n=(n=Math.imul(k,C))+Math.imul(A,F)|0,e=Math.imul(A,C),h=h+Math.imul(y,H)|0,n=(n=n+Math.imul(y,J)|0)+Math.imul(b,H)|0,e=e+Math.imul(b,J)|0,h=h+Math.imul(g,G)|0,n=(n=n+Math.imul(g,Q)|0)+Math.imul(c,G)|0,e=e+Math.imul(c,Q)|0,h=h+Math.imul(p,W)|0,n=(n=n+Math.imul(p,X)|0)+Math.imul(M,W)|0,e=e+Math.imul(M,X)|0;var yt=(a+(h=h+Math.imul(m,$)|0)|0)+((8191&(n=(n=n+Math.imul(m,tt)|0)+Math.imul(f,$)|0))<<13)|0;a=((e=e+Math.imul(f,tt)|0)+(n>>>13)|0)+(yt>>>26)|0,yt&=67108863,h=Math.imul(S,F),n=(n=Math.imul(S,C))+Math.imul(Z,F)|0,e=Math.imul(Z,C),h=h+Math.imul(k,H)|0,n=(n=n+Math.imul(k,J)|0)+Math.imul(A,H)|0,e=e+Math.imul(A,J)|0,h=h+Math.imul(y,G)|0,n=(n=n+Math.imul(y,Q)|0)+Math.imul(b,G)|0,e=e+Math.imul(b,Q)|0,h=h+Math.imul(g,W)|0,n=(n=n+Math.imul(g,X)|0)+Math.imul(c,W)|0,e=e+Math.imul(c,X)|0,h=h+Math.imul(p,$)|0,n=(n=n+Math.imul(p,tt)|0)+Math.imul(M,$)|0,e=e+Math.imul(M,tt)|0;var bt=(a+(h=h+Math.imul(m,rt)|0)|0)+((8191&(n=(n=n+Math.imul(m,ht)|0)+Math.imul(f,rt)|0))<<13)|0;a=((e=e+Math.imul(f,ht)|0)+(n>>>13)|0)+(bt>>>26)|0,bt&=67108863,h=Math.imul(R,F),n=(n=Math.imul(R,C))+Math.imul(B,F)|0,e=Math.imul(B,C),h=h+Math.imul(S,H)|0,n=(n=n+Math.imul(S,J)|0)+Math.imul(Z,H)|0,e=e+Math.imul(Z,J)|0,h=h+Math.imul(k,G)|0,n=(n=n+Math.imul(k,Q)|0)+Math.imul(A,G)|0,e=e+Math.imul(A,Q)|0,h=h+Math.imul(y,W)|0,n=(n=n+Math.imul(y,X)|0)+Math.imul(b,W)|0,e=e+Math.imul(b,X)|0,h=h+Math.imul(g,$)|0,n=(n=n+Math.imul(g,tt)|0)+Math.imul(c,$)|0,e=e+Math.imul(c,tt)|0,h=h+Math.imul(p,rt)|0,n=(n=n+Math.imul(p,ht)|0)+Math.imul(M,rt)|0,e=e+Math.imul(M,ht)|0;var _t=(a+(h=h+Math.imul(m,et)|0)|0)+((8191&(n=(n=n+Math.imul(m,ot)|0)+Math.imul(f,et)|0))<<13)|0;a=((e=e+Math.imul(f,ot)|0)+(n>>>13)|0)+(_t>>>26)|0,_t&=67108863,h=Math.imul(L,F),n=(n=Math.imul(L,C))+Math.imul(I,F)|0,e=Math.imul(I,C),h=h+Math.imul(R,H)|0,n=(n=n+Math.imul(R,J)|0)+Math.imul(B,H)|0,e=e+Math.imul(B,J)|0,h=h+Math.imul(S,G)|0,n=(n=n+Math.imul(S,Q)|0)+Math.imul(Z,G)|0,e=e+Math.imul(Z,Q)|0,h=h+Math.imul(k,W)|0,n=(n=n+Math.imul(k,X)|0)+Math.imul(A,W)|0,e=e+Math.imul(A,X)|0,h=h+Math.imul(y,$)|0,n=(n=n+Math.imul(y,tt)|0)+Math.imul(b,$)|0,e=e+Math.imul(b,tt)|0,h=h+Math.imul(g,rt)|0,n=(n=n+Math.imul(g,ht)|0)+Math.imul(c,rt)|0,e=e+Math.imul(c,ht)|0,h=h+Math.imul(p,et)|0,n=(n=n+Math.imul(p,ot)|0)+Math.imul(M,et)|0,e=e+Math.imul(M,ot)|0;var kt=(a+(h=h+Math.imul(m,ut)|0)|0)+((8191&(n=(n=n+Math.imul(m,at)|0)+Math.imul(f,ut)|0))<<13)|0;a=((e=e+Math.imul(f,at)|0)+(n>>>13)|0)+(kt>>>26)|0,kt&=67108863,h=Math.imul(T,F),n=(n=Math.imul(T,C))+Math.imul(E,F)|0,e=Math.imul(E,C),h=h+Math.imul(L,H)|0,n=(n=n+Math.imul(L,J)|0)+Math.imul(I,H)|0,e=e+Math.imul(I,J)|0,h=h+Math.imul(R,G)|0,n=(n=n+Math.imul(R,Q)|0)+Math.imul(B,G)|0,e=e+Math.imul(B,Q)|0,h=h+Math.imul(S,W)|0,n=(n=n+Math.imul(S,X)|0)+Math.imul(Z,W)|0,e=e+Math.imul(Z,X)|0,h=h+Math.imul(k,$)|0,n=(n=n+Math.imul(k,tt)|0)+Math.imul(A,$)|0,e=e+Math.imul(A,tt)|0,h=h+Math.imul(y,rt)|0,n=(n=n+Math.imul(y,ht)|0)+Math.imul(b,rt)|0,e=e+Math.imul(b,ht)|0,h=h+Math.imul(g,et)|0,n=(n=n+Math.imul(g,ot)|0)+Math.imul(c,et)|0,e=e+Math.imul(c,ot)|0,h=h+Math.imul(p,ut)|0,n=(n=n+Math.imul(p,at)|0)+Math.imul(M,ut)|0,e=e+Math.imul(M,at)|0;var At=(a+(h=h+Math.imul(m,mt)|0)|0)+((8191&(n=(n=n+Math.imul(m,ft)|0)+Math.imul(f,mt)|0))<<13)|0;a=((e=e+Math.imul(f,ft)|0)+(n>>>13)|0)+(At>>>26)|0,At&=67108863,h=Math.imul(j,F),n=(n=Math.imul(j,C))+Math.imul(K,F)|0,e=Math.imul(K,C),h=h+Math.imul(T,H)|0,n=(n=n+Math.imul(T,J)|0)+Math.imul(E,H)|0,e=e+Math.imul(E,J)|0,h=h+Math.imul(L,G)|0,n=(n=n+Math.imul(L,Q)|0)+Math.imul(I,G)|0,e=e+Math.imul(I,Q)|0,h=h+Math.imul(R,W)|0,n=(n=n+Math.imul(R,X)|0)+Math.imul(B,W)|0,e=e+Math.imul(B,X)|0,h=h+Math.imul(S,$)|0,n=(n=n+Math.imul(S,tt)|0)+Math.imul(Z,$)|0,e=e+Math.imul(Z,tt)|0,h=h+Math.imul(k,rt)|0,n=(n=n+Math.imul(k,ht)|0)+Math.imul(A,rt)|0,e=e+Math.imul(A,ht)|0,h=h+Math.imul(y,et)|0,n=(n=n+Math.imul(y,ot)|0)+Math.imul(b,et)|0,e=e+Math.imul(b,ot)|0,h=h+Math.imul(g,ut)|0,n=(n=n+Math.imul(g,at)|0)+Math.imul(c,ut)|0,e=e+Math.imul(c,at)|0,h=h+Math.imul(p,mt)|0,n=(n=n+Math.imul(p,ft)|0)+Math.imul(M,mt)|0,e=e+Math.imul(M,ft)|0;var xt=(a+(h=h+Math.imul(m,pt)|0)|0)+((8191&(n=(n=n+Math.imul(m,Mt)|0)+Math.imul(f,pt)|0))<<13)|0;a=((e=e+Math.imul(f,Mt)|0)+(n>>>13)|0)+(xt>>>26)|0,xt&=67108863,h=Math.imul(j,H),n=(n=Math.imul(j,J))+Math.imul(K,H)|0,e=Math.imul(K,J),h=h+Math.imul(T,G)|0,n=(n=n+Math.imul(T,Q)|0)+Math.imul(E,G)|0,e=e+Math.imul(E,Q)|0,h=h+Math.imul(L,W)|0,n=(n=n+Math.imul(L,X)|0)+Math.imul(I,W)|0,e=e+Math.imul(I,X)|0,h=h+Math.imul(R,$)|0,n=(n=n+Math.imul(R,tt)|0)+Math.imul(B,$)|0,e=e+Math.imul(B,tt)|0,h=h+Math.imul(S,rt)|0,n=(n=n+Math.imul(S,ht)|0)+Math.imul(Z,rt)|0,e=e+Math.imul(Z,ht)|0,h=h+Math.imul(k,et)|0,n=(n=n+Math.imul(k,ot)|0)+Math.imul(A,et)|0,e=e+Math.imul(A,ot)|0,h=h+Math.imul(y,ut)|0,n=(n=n+Math.imul(y,at)|0)+Math.imul(b,ut)|0,e=e+Math.imul(b,at)|0,h=h+Math.imul(g,mt)|0,n=(n=n+Math.imul(g,ft)|0)+Math.imul(c,mt)|0,e=e+Math.imul(c,ft)|0;var St=(a+(h=h+Math.imul(p,pt)|0)|0)+((8191&(n=(n=n+Math.imul(p,Mt)|0)+Math.imul(M,pt)|0))<<13)|0;a=((e=e+Math.imul(M,Mt)|0)+(n>>>13)|0)+(St>>>26)|0,St&=67108863,h=Math.imul(j,G),n=(n=Math.imul(j,Q))+Math.imul(K,G)|0,e=Math.imul(K,Q),h=h+Math.imul(T,W)|0,n=(n=n+Math.imul(T,X)|0)+Math.imul(E,W)|0,e=e+Math.imul(E,X)|0,h=h+Math.imul(L,$)|0,n=(n=n+Math.imul(L,tt)|0)+Math.imul(I,$)|0,e=e+Math.imul(I,tt)|0,h=h+Math.imul(R,rt)|0,n=(n=n+Math.imul(R,ht)|0)+Math.imul(B,rt)|0,e=e+Math.imul(B,ht)|0,h=h+Math.imul(S,et)|0,n=(n=n+Math.imul(S,ot)|0)+Math.imul(Z,et)|0,e=e+Math.imul(Z,ot)|0,h=h+Math.imul(k,ut)|0,n=(n=n+Math.imul(k,at)|0)+Math.imul(A,ut)|0,e=e+Math.imul(A,at)|0,h=h+Math.imul(y,mt)|0,n=(n=n+Math.imul(y,ft)|0)+Math.imul(b,mt)|0,e=e+Math.imul(b,ft)|0;var Zt=(a+(h=h+Math.imul(g,pt)|0)|0)+((8191&(n=(n=n+Math.imul(g,Mt)|0)+Math.imul(c,pt)|0))<<13)|0;a=((e=e+Math.imul(c,Mt)|0)+(n>>>13)|0)+(Zt>>>26)|0,Zt&=67108863,h=Math.imul(j,W),n=(n=Math.imul(j,X))+Math.imul(K,W)|0,e=Math.imul(K,X),h=h+Math.imul(T,$)|0,n=(n=n+Math.imul(T,tt)|0)+Math.imul(E,$)|0,e=e+Math.imul(E,tt)|0,h=h+Math.imul(L,rt)|0,n=(n=n+Math.imul(L,ht)|0)+Math.imul(I,rt)|0,e=e+Math.imul(I,ht)|0,h=h+Math.imul(R,et)|0,n=(n=n+Math.imul(R,ot)|0)+Math.imul(B,et)|0,e=e+Math.imul(B,ot)|0,h=h+Math.imul(S,ut)|0,n=(n=n+Math.imul(S,at)|0)+Math.imul(Z,ut)|0,e=e+Math.imul(Z,at)|0,h=h+Math.imul(k,mt)|0,n=(n=n+Math.imul(k,ft)|0)+Math.imul(A,mt)|0,e=e+Math.imul(A,ft)|0;var qt=(a+(h=h+Math.imul(y,pt)|0)|0)+((8191&(n=(n=n+Math.imul(y,Mt)|0)+Math.imul(b,pt)|0))<<13)|0;a=((e=e+Math.imul(b,Mt)|0)+(n>>>13)|0)+(qt>>>26)|0,qt&=67108863,h=Math.imul(j,$),n=(n=Math.imul(j,tt))+Math.imul(K,$)|0,e=Math.imul(K,tt),h=h+Math.imul(T,rt)|0,n=(n=n+Math.imul(T,ht)|0)+Math.imul(E,rt)|0,e=e+Math.imul(E,ht)|0,h=h+Math.imul(L,et)|0,n=(n=n+Math.imul(L,ot)|0)+Math.imul(I,et)|0,e=e+Math.imul(I,ot)|0,h=h+Math.imul(R,ut)|0,n=(n=n+Math.imul(R,at)|0)+Math.imul(B,ut)|0,e=e+Math.imul(B,at)|0,h=h+Math.imul(S,mt)|0,n=(n=n+Math.imul(S,ft)|0)+Math.imul(Z,mt)|0,e=e+Math.imul(Z,ft)|0;var Rt=(a+(h=h+Math.imul(k,pt)|0)|0)+((8191&(n=(n=n+Math.imul(k,Mt)|0)+Math.imul(A,pt)|0))<<13)|0;a=((e=e+Math.imul(A,Mt)|0)+(n>>>13)|0)+(Rt>>>26)|0,Rt&=67108863,h=Math.imul(j,rt),n=(n=Math.imul(j,ht))+Math.imul(K,rt)|0,e=Math.imul(K,ht),h=h+Math.imul(T,et)|0,n=(n=n+Math.imul(T,ot)|0)+Math.imul(E,et)|0,e=e+Math.imul(E,ot)|0,h=h+Math.imul(L,ut)|0,n=(n=n+Math.imul(L,at)|0)+Math.imul(I,ut)|0,e=e+Math.imul(I,at)|0,h=h+Math.imul(R,mt)|0,n=(n=n+Math.imul(R,ft)|0)+Math.imul(B,mt)|0,e=e+Math.imul(B,ft)|0;var Bt=(a+(h=h+Math.imul(S,pt)|0)|0)+((8191&(n=(n=n+Math.imul(S,Mt)|0)+Math.imul(Z,pt)|0))<<13)|0;a=((e=e+Math.imul(Z,Mt)|0)+(n>>>13)|0)+(Bt>>>26)|0,Bt&=67108863,h=Math.imul(j,et),n=(n=Math.imul(j,ot))+Math.imul(K,et)|0,e=Math.imul(K,ot),h=h+Math.imul(T,ut)|0,n=(n=n+Math.imul(T,at)|0)+Math.imul(E,ut)|0,e=e+Math.imul(E,at)|0,h=h+Math.imul(L,mt)|0,n=(n=n+Math.imul(L,ft)|0)+Math.imul(I,mt)|0,e=e+Math.imul(I,ft)|0;var Nt=(a+(h=h+Math.imul(R,pt)|0)|0)+((8191&(n=(n=n+Math.imul(R,Mt)|0)+Math.imul(B,pt)|0))<<13)|0;a=((e=e+Math.imul(B,Mt)|0)+(n>>>13)|0)+(Nt>>>26)|0,Nt&=67108863,h=Math.imul(j,ut),n=(n=Math.imul(j,at))+Math.imul(K,ut)|0,e=Math.imul(K,at),h=h+Math.imul(T,mt)|0,n=(n=n+Math.imul(T,ft)|0)+Math.imul(E,mt)|0,e=e+Math.imul(E,ft)|0;var Lt=(a+(h=h+Math.imul(L,pt)|0)|0)+((8191&(n=(n=n+Math.imul(L,Mt)|0)+Math.imul(I,pt)|0))<<13)|0;a=((e=e+Math.imul(I,Mt)|0)+(n>>>13)|0)+(Lt>>>26)|0,Lt&=67108863,h=Math.imul(j,mt),n=(n=Math.imul(j,ft))+Math.imul(K,mt)|0,e=Math.imul(K,ft);var It=(a+(h=h+Math.imul(T,pt)|0)|0)+((8191&(n=(n=n+Math.imul(T,Mt)|0)+Math.imul(E,pt)|0))<<13)|0;a=((e=e+Math.imul(E,Mt)|0)+(n>>>13)|0)+(It>>>26)|0,It&=67108863;var zt=(a+(h=Math.imul(j,pt))|0)+((8191&(n=(n=Math.imul(j,Mt))+Math.imul(K,pt)|0))<<13)|0;return a=((e=Math.imul(K,Mt))+(n>>>13)|0)+(zt>>>26)|0,zt&=67108863,u[0]=vt,u[1]=gt,u[2]=ct,u[3]=wt,u[4]=yt,u[5]=bt,u[6]=_t,u[7]=kt,u[8]=At,u[9]=xt,u[10]=St,u[11]=Zt,u[12]=qt,u[13]=Rt,u[14]=Bt,u[15]=Nt,u[16]=Lt,u[17]=It,u[18]=zt,0!==a&&(u[19]=a,r.length++),r};Math.imul||(b=s),n.prototype.mulTo=function(t,i){var r=this.length+t.length;return 10===this.length&&10===t.length?b(this,t,i):r<63?s(this,t,i):r<1024?function(t,i,r){r.negative=i.negative^t.negative,r.length=t.length+i.length;for(var h=0,n=0,e=0;e<r.length-1;e++){var o=n;n=0;for(var s=67108863&h,u=Math.min(e,i.length-1),a=Math.max(0,e-t.length+1);a<=u;a++){var l=e-a,m=(0|t.words[l])*(0|i.words[a]),f=67108863&m;s=67108863&(f=f+s|0),n+=(o=(o=o+(m/67108864|0)|0)+(f>>>26)|0)>>>26,o&=67108863}r.words[e]=s,h=o,o=n}return 0!==h?r.words[e]=h:r.length--,r.strip()}(this,t,i):u(this,t,i)},a.prototype.makeRBT=function(t){for(var i=new Array(t),r=n.prototype._countBits(t)-1,h=0;h<t;h++)i[h]=this.revBin(h,r,t);return i},a.prototype.revBin=function(t,i,r){if(0===t||t===r-1)return t;for(var h=0,n=0;n<i;n++)h|=(1&t)<<i-n-1,t>>=1;return h},a.prototype.permute=function(t,i,r,h,n,e){for(var o=0;o<e;o++)h[o]=i[t[o]],n[o]=r[t[o]]},a.prototype.transform=function(t,i,r,h,n,e){this.permute(e,t,i,r,h,n);for(var o=1;o<n;o<<=1)for(var s=o<<1,u=Math.cos(2*Math.PI/s),a=Math.sin(2*Math.PI/s),l=0;l<n;l+=s)for(var m=u,f=a,d=0;d<o;d++){var p=r[l+d],M=h[l+d],v=r[l+d+o],g=h[l+d+o],c=m*v-f*g;g=m*g+f*v,v=c,r[l+d]=p+v,h[l+d]=M+g,r[l+d+o]=p-v,h[l+d+o]=M-g,d!==s&&(c=u*m-a*f,f=u*f+a*m,m=c)}},a.prototype.guessLen13b=function(t,i){var r=1|Math.max(i,t),h=1&r,n=0;for(r=r/2|0;r;r>>>=1)n++;return 1<<n+1+h},a.prototype.conjugate=function(t,i,r){if(!(r<=1))for(var h=0;h<r/2;h++){var n=t[h];t[h]=t[r-h-1],t[r-h-1]=n,n=i[h],i[h]=-i[r-h-1],i[r-h-1]=-n}},a.prototype.normalize13b=function(t,i){for(var r=0,h=0;h<i/2;h++){var n=8192*Math.round(t[2*h+1]/i)+Math.round(t[2*h]/i)+r;t[h]=67108863&n,r=n<67108864?0:n/67108864|0}return t},a.prototype.convert13b=function(t,i,h,n){for(var e=0,o=0;o<i;o++)e+=0|t[o],h[2*o]=8191&e,e>>>=13,h[2*o+1]=8191&e,e>>>=13;for(o=2*i;o<n;++o)h[o]=0;r(0===e),r(0==(-8192&e))},a.prototype.stub=function(t){for(var i=new Array(t),r=0;r<t;r++)i[r]=0;return i},a.prototype.mulp=function(t,i,r){var h=2*this.guessLen13b(t.length,i.length),n=this.makeRBT(h),e=this.stub(h),o=new Array(h),s=new Array(h),u=new Array(h),a=new Array(h),l=new Array(h),m=new Array(h),f=r.words;f.length=h,this.convert13b(t.words,t.length,o,h),this.convert13b(i.words,i.length,a,h),this.transform(o,e,s,u,h,n),this.transform(a,e,l,m,h,n);for(var d=0;d<h;d++){var p=s[d]*l[d]-u[d]*m[d];u[d]=s[d]*m[d]+u[d]*l[d],s[d]=p}return this.conjugate(s,u,h),this.transform(s,u,f,e,h,n),this.conjugate(f,e,h),this.normalize13b(f,h),r.negative=t.negative^i.negative,r.length=t.length+i.length,r.strip()},n.prototype.mul=function(t){var i=new n(null);return i.words=new Array(this.length+t.length),this.mulTo(t,i)},n.prototype.mulf=function(t){var i=new n(null);return i.words=new Array(this.length+t.length),u(this,t,i)},n.prototype.imul=function(t){return this.clone().mulTo(t,this)},n.prototype.imuln=function(t){r("number"==typeof t),r(t<67108864);for(var i=0,h=0;h<this.length;h++){var n=(0|this.words[h])*t,e=(67108863&n)+(67108863&i);i>>=26,i+=n/67108864|0,i+=e>>>26,this.words[h]=67108863&e}return 0!==i&&(this.words[h]=i,this.length++),this},n.prototype.muln=function(t){return this.clone().imuln(t)},n.prototype.sqr=function(){return this.mul(this)},n.prototype.isqr=function(){return this.imul(this.clone())},n.prototype.pow=function(t){var i=function(t){for(var i=new Array(t.bitLength()),r=0;r<i.length;r++){var h=r/26|0,n=r%26;i[r]=(t.words[h]&1<<n)>>>n}return i}(t);if(0===i.length)return new n(1);for(var r=this,h=0;h<i.length&&0===i[h];h++,r=r.sqr());if(++h<i.length)for(var e=r.sqr();h<i.length;h++,e=e.sqr())0!==i[h]&&(r=r.mul(e));return r},n.prototype.iushln=function(t){r("number"==typeof t&&t>=0);var i,h=t%26,n=(t-h)/26,e=67108863>>>26-h<<26-h;if(0!==h){var o=0;for(i=0;i<this.length;i++){var s=this.words[i]&e,u=(0|this.words[i])-s<<h;this.words[i]=u|o,o=s>>>26-h}o&&(this.words[i]=o,this.length++)}if(0!==n){for(i=this.length-1;i>=0;i--)this.words[i+n]=this.words[i];for(i=0;i<n;i++)this.words[i]=0;this.length+=n}return this.strip()},n.prototype.ishln=function(t){return r(0===this.negative),this.iushln(t)},n.prototype.iushrn=function(t,i,h){r("number"==typeof t&&t>=0);var n;n=i?(i-i%26)/26:0;var e=t%26,o=Math.min((t-e)/26,this.length),s=67108863^67108863>>>e<<e,u=h;if(n-=o,n=Math.max(0,n),u){for(var a=0;a<o;a++)u.words[a]=this.words[a];u.length=o}if(0===o);else if(this.length>o)for(this.length-=o,a=0;a<this.length;a++)this.words[a]=this.words[a+o];else this.words[0]=0,this.length=1;var l=0;for(a=this.length-1;a>=0&&(0!==l||a>=n);a--){var m=0|this.words[a];this.words[a]=l<<26-e|m>>>e,l=m&s}return u&&0!==l&&(u.words[u.length++]=l),0===this.length&&(this.words[0]=0,this.length=1),this.strip()},n.prototype.ishrn=function(t,i,h){return r(0===this.negative),this.iushrn(t,i,h)},n.prototype.shln=function(t){return this.clone().ishln(t)},n.prototype.ushln=function(t){return this.clone().iushln(t)},n.prototype.shrn=function(t){return this.clone().ishrn(t)},n.prototype.ushrn=function(t){return this.clone().iushrn(t)},n.prototype.testn=function(t){r("number"==typeof t&&t>=0);var i=t%26,h=(t-i)/26,n=1<<i;if(this.length<=h)return!1;return!!(this.words[h]&n)},n.prototype.imaskn=function(t){r("number"==typeof t&&t>=0);var i=t%26,h=(t-i)/26;if(r(0===this.negative,"imaskn works only with positive numbers"),this.length<=h)return this;if(0!==i&&h++,this.length=Math.min(h,this.length),0!==i){var n=67108863^67108863>>>i<<i;this.words[this.length-1]&=n}return this.strip()},n.prototype.maskn=function(t){return this.clone().imaskn(t)},n.prototype.iaddn=function(t){return r("number"==typeof t),r(t<67108864),t<0?this.isubn(-t):0!==this.negative?1===this.length&&(0|this.words[0])<t?(this.words[0]=t-(0|this.words[0]),this.negative=0,this):(this.negative=0,this.isubn(t),this.negative=1,this):this._iaddn(t)},n.prototype._iaddn=function(t){this.words[0]+=t;for(var i=0;i<this.length&&this.words[i]>=67108864;i++)this.words[i]-=67108864,i===this.length-1?this.words[i+1]=1:this.words[i+1]++;return this.length=Math.max(this.length,i+1),this},n.prototype.isubn=function(t){if(r("number"==typeof t),r(t<67108864),t<0)return this.iaddn(-t);if(0!==this.negative)return this.negative=0,this.iaddn(t),this.negative=1,this;if(this.words[0]-=t,1===this.length&&this.words[0]<0)this.words[0]=-this.words[0],this.negative=1;else for(var i=0;i<this.length&&this.words[i]<0;i++)this.words[i]+=67108864,this.words[i+1]-=1;return this.strip()},n.prototype.addn=function(t){return this.clone().iaddn(t)},n.prototype.subn=function(t){return this.clone().isubn(t)},n.prototype.iabs=function(){return this.negative=0,this},n.prototype.abs=function(){return this.clone().iabs()},n.prototype._ishlnsubmul=function(t,i,h){var n,e=t.length+h;this._expand(e);var o,s=0;for(n=0;n<t.length;n++){o=(0|this.words[n+h])+s;var u=(0|t.words[n])*i;s=((o-=67108863&u)>>26)-(u/67108864|0),this.words[n+h]=67108863&o}for(;n<this.length-h;n++)s=(o=(0|this.words[n+h])+s)>>26,this.words[n+h]=67108863&o;if(0===s)return this.strip();for(r(-1===s),s=0,n=0;n<this.length;n++)s=(o=-(0|this.words[n])+s)>>26,this.words[n]=67108863&o;return this.negative=1,this.strip()},n.prototype._wordDiv=function(t,i){var r=this.length-t.length,h=this.clone(),e=t,o=0|e.words[e.length-1];0!==(r=26-this._countBits(o))&&(e=e.ushln(r),h.iushln(r),o=0|e.words[e.length-1]);var s,u=h.length-e.length;if("mod"!==i){(s=new n(null)).length=u+1,s.words=new Array(s.length);for(var a=0;a<s.length;a++)s.words[a]=0}var l=h.clone()._ishlnsubmul(e,1,u);0===l.negative&&(h=l,s&&(s.words[u]=1));for(var m=u-1;m>=0;m--){var f=67108864*(0|h.words[e.length+m])+(0|h.words[e.length+m-1]);for(f=Math.min(f/o|0,67108863),h._ishlnsubmul(e,f,m);0!==h.negative;)f--,h.negative=0,h._ishlnsubmul(e,1,m),h.isZero()||(h.negative^=1);s&&(s.words[m]=f)}return s&&s.strip(),h.strip(),"div"!==i&&0!==r&&h.iushrn(r),{div:s||null,mod:h}},n.prototype.divmod=function(t,i,h){if(r(!t.isZero()),this.isZero())return{div:new n(0),mod:new n(0)};var e,o,s;return 0!==this.negative&&0===t.negative?(s=this.neg().divmod(t,i),"mod"!==i&&(e=s.div.neg()),"div"!==i&&(o=s.mod.neg(),h&&0!==o.negative&&o.iadd(t)),{div:e,mod:o}):0===this.negative&&0!==t.negative?(s=this.divmod(t.neg(),i),"mod"!==i&&(e=s.div.neg()),{div:e,mod:s.mod}):0!=(this.negative&t.negative)?(s=this.neg().divmod(t.neg(),i),"div"!==i&&(o=s.mod.neg(),h&&0!==o.negative&&o.isub(t)),{div:s.div,mod:o}):t.length>this.length||this.cmp(t)<0?{div:new n(0),mod:this}:1===t.length?"div"===i?{div:this.divn(t.words[0]),mod:null}:"mod"===i?{div:null,mod:new n(this.modn(t.words[0]))}:{div:this.divn(t.words[0]),mod:new n(this.modn(t.words[0]))}:this._wordDiv(t,i)},n.prototype.div=function(t){return this.divmod(t,"div",!1).div},n.prototype.mod=function(t){return this.divmod(t,"mod",!1).mod},n.prototype.umod=function(t){return this.divmod(t,"mod",!0).mod},n.prototype.divRound=function(t){var i=this.divmod(t);if(i.mod.isZero())return i.div;var r=0!==i.div.negative?i.mod.isub(t):i.mod,h=t.ushrn(1),n=t.andln(1),e=r.cmp(h);return e<0||1===n&&0===e?i.div:0!==i.div.negative?i.div.isubn(1):i.div.iaddn(1)},n.prototype.modn=function(t){r(t<=67108863);for(var i=(1<<26)%t,h=0,n=this.length-1;n>=0;n--)h=(i*h+(0|this.words[n]))%t;return h},n.prototype.idivn=function(t){r(t<=67108863);for(var i=0,h=this.length-1;h>=0;h--){var n=(0|this.words[h])+67108864*i;this.words[h]=n/t|0,i=n%t}return this.strip()},n.prototype.divn=function(t){return this.clone().idivn(t)},n.prototype.egcd=function(t){r(0===t.negative),r(!t.isZero());var i=this,h=t.clone();i=0!==i.negative?i.umod(t):i.clone();for(var e=new n(1),o=new n(0),s=new n(0),u=new n(1),a=0;i.isEven()&&h.isEven();)i.iushrn(1),h.iushrn(1),++a;for(var l=h.clone(),m=i.clone();!i.isZero();){for(var f=0,d=1;0==(i.words[0]&d)&&f<26;++f,d<<=1);if(f>0)for(i.iushrn(f);f-- >0;)(e.isOdd()||o.isOdd())&&(e.iadd(l),o.isub(m)),e.iushrn(1),o.iushrn(1);for(var p=0,M=1;0==(h.words[0]&M)&&p<26;++p,M<<=1);if(p>0)for(h.iushrn(p);p-- >0;)(s.isOdd()||u.isOdd())&&(s.iadd(l),u.isub(m)),s.iushrn(1),u.iushrn(1);i.cmp(h)>=0?(i.isub(h),e.isub(s),o.isub(u)):(h.isub(i),s.isub(e),u.isub(o))}return{a:s,b:u,gcd:h.iushln(a)}},n.prototype._invmp=function(t){r(0===t.negative),r(!t.isZero());var i=this,h=t.clone();i=0!==i.negative?i.umod(t):i.clone();for(var e=new n(1),o=new n(0),s=h.clone();i.cmpn(1)>0&&h.cmpn(1)>0;){for(var u=0,a=1;0==(i.words[0]&a)&&u<26;++u,a<<=1);if(u>0)for(i.iushrn(u);u-- >0;)e.isOdd()&&e.iadd(s),e.iushrn(1);for(var l=0,m=1;0==(h.words[0]&m)&&l<26;++l,m<<=1);if(l>0)for(h.iushrn(l);l-- >0;)o.isOdd()&&o.iadd(s),o.iushrn(1);i.cmp(h)>=0?(i.isub(h),e.isub(o)):(h.isub(i),o.isub(e))}var f;return(f=0===i.cmpn(1)?e:o).cmpn(0)<0&&f.iadd(t),f},n.prototype.gcd=function(t){if(this.isZero())return t.abs();if(t.isZero())return this.abs();var i=this.clone(),r=t.clone();i.negative=0,r.negative=0;for(var h=0;i.isEven()&&r.isEven();h++)i.iushrn(1),r.iushrn(1);for(;;){for(;i.isEven();)i.iushrn(1);for(;r.isEven();)r.iushrn(1);var n=i.cmp(r);if(n<0){var e=i;i=r,r=e}else if(0===n||0===r.cmpn(1))break;i.isub(r)}return r.iushln(h)},n.prototype.invm=function(t){return this.egcd(t).a.umod(t)},n.prototype.isEven=function(){return 0==(1&this.words[0])},n.prototype.isOdd=function(){return 1==(1&this.words[0])},n.prototype.andln=function(t){return this.words[0]&t},n.prototype.bincn=function(t){r("number"==typeof t);var i=t%26,h=(t-i)/26,n=1<<i;if(this.length<=h)return this._expand(h+1),this.words[h]|=n,this;for(var e=n,o=h;0!==e&&o<this.length;o++){var s=0|this.words[o];e=(s+=e)>>>26,s&=67108863,this.words[o]=s}return 0!==e&&(this.words[o]=e,this.length++),this},n.prototype.isZero=function(){return 1===this.length&&0===this.words[0]},n.prototype.cmpn=function(t){var i=t<0;if(0!==this.negative&&!i)return-1;if(0===this.negative&&i)return 1;this.strip();var h;if(this.length>1)h=1;else{i&&(t=-t),r(t<=67108863,"Number is too big");var n=0|this.words[0];h=n===t?0:n<t?-1:1}return 0!==this.negative?0|-h:h},n.prototype.cmp=function(t){if(0!==this.negative&&0===t.negative)return-1;if(0===this.negative&&0!==t.negative)return 1;var i=this.ucmp(t);return 0!==this.negative?0|-i:i},n.prototype.ucmp=function(t){if(this.length>t.length)return 1;if(this.length<t.length)return-1;for(var i=0,r=this.length-1;r>=0;r--){var h=0|this.words[r],n=0|t.words[r];if(h!==n){h<n?i=-1:h>n&&(i=1);break}}return i},n.prototype.gtn=function(t){return 1===this.cmpn(t)},n.prototype.gt=function(t){return 1===this.cmp(t)},n.prototype.gten=function(t){return this.cmpn(t)>=0},n.prototype.gte=function(t){return this.cmp(t)>=0},n.prototype.ltn=function(t){return-1===this.cmpn(t)},n.prototype.lt=function(t){return-1===this.cmp(t)},n.prototype.lten=function(t){return this.cmpn(t)<=0},n.prototype.lte=function(t){return this.cmp(t)<=0},n.prototype.eqn=function(t){return 0===this.cmpn(t)},n.prototype.eq=function(t){return 0===this.cmp(t)},n.red=function(t){return new M(t)},n.prototype.toRed=function(t){return r(!this.red,"Already a number in reduction context"),r(0===this.negative,"red works only with positives"),t.convertTo(this)._forceRed(t)},n.prototype.fromRed=function(){return r(this.red,"fromRed works only with numbers in reduction context"),this.red.convertFrom(this)},n.prototype._forceRed=function(t){return this.red=t,this},n.prototype.forceRed=function(t){return r(!this.red,"Already a number in reduction context"),this._forceRed(t)},n.prototype.redAdd=function(t){return r(this.red,"redAdd works only with red numbers"),this.red.add(this,t)},n.prototype.redIAdd=function(t){return r(this.red,"redIAdd works only with red numbers"),this.red.iadd(this,t)},n.prototype.redSub=function(t){return r(this.red,"redSub works only with red numbers"),this.red.sub(this,t)},n.prototype.redISub=function(t){return r(this.red,"redISub works only with red numbers"),this.red.isub(this,t)},n.prototype.redShl=function(t){return r(this.red,"redShl works only with red numbers"),this.red.shl(this,t)},n.prototype.redMul=function(t){return r(this.red,"redMul works only with red numbers"),this.red._verify2(this,t),this.red.mul(this,t)},n.prototype.redIMul=function(t){return r(this.red,"redMul works only with red numbers"),this.red._verify2(this,t),this.red.imul(this,t)},n.prototype.redSqr=function(){return r(this.red,"redSqr works only with red numbers"),this.red._verify1(this),this.red.sqr(this)},n.prototype.redISqr=function(){return r(this.red,"redISqr works only with red numbers"),this.red._verify1(this),this.red.isqr(this)},n.prototype.redSqrt=function(){return r(this.red,"redSqrt works only with red numbers"),this.red._verify1(this),this.red.sqrt(this)},n.prototype.redInvm=function(){return r(this.red,"redInvm works only with red numbers"),this.red._verify1(this),this.red.invm(this)},n.prototype.redNeg=function(){return r(this.red,"redNeg works only with red numbers"),this.red._verify1(this),this.red.neg(this)},n.prototype.redPow=function(t){return r(this.red&&!t.red,"redPow(normalNum)"),this.red._verify1(this),this.red.pow(this,t)};var _={k256:null,p224:null,p192:null,p25519:null};l.prototype._tmp=function(){var t=new n(null);return t.words=new Array(Math.ceil(this.n/13)),t},l.prototype.ireduce=function(t){var i,r=t;do{this.split(r,this.tmp),i=(r=(r=this.imulK(r)).iadd(this.tmp)).bitLength()}while(i>this.n);var h=i<this.n?-1:r.ucmp(this.p);return 0===h?(r.words[0]=0,r.length=1):h>0?r.isub(this.p):r.strip(),r},l.prototype.split=function(t,i){t.iushrn(this.n,0,i)},l.prototype.imulK=function(t){return t.imul(this.k)},h(m,l),m.prototype.split=function(t,i){for(var r=Math.min(t.length,9),h=0;h<r;h++)i.words[h]=t.words[h];if(i.length=r,t.length<=9)return t.words[0]=0,void(t.length=1);var n=t.words[9];for(i.words[i.length++]=4194303&n,h=10;h<t.length;h++){var e=0|t.words[h];t.words[h-10]=(4194303&e)<<4|n>>>22,n=e}n>>>=22,t.words[h-10]=n,0===n&&t.length>10?t.length-=10:t.length-=9},m.prototype.imulK=function(t){t.words[t.length]=0,t.words[t.length+1]=0,t.length+=2;for(var i=0,r=0;r<t.length;r++){var h=0|t.words[r];i+=977*h,t.words[r]=67108863&i,i=64*h+(i/67108864|0)}return 0===t.words[t.length-1]&&(t.length--,0===t.words[t.length-1]&&t.length--),t},h(f,l),h(d,l),h(p,l),p.prototype.imulK=function(t){for(var i=0,r=0;r<t.length;r++){var h=19*(0|t.words[r])+i,n=67108863&h;h>>>=26,t.words[r]=n,i=h}return 0!==i&&(t.words[t.length++]=i),t},n._prime=function(t){if(_[t])return _[t];var i;if("k256"===t)i=new m;else if("p224"===t)i=new f;else if("p192"===t)i=new d;else{if("p25519"!==t)throw new Error("Unknown prime "+t);i=new p}return _[t]=i,i},M.prototype._verify1=function(t){r(0===t.negative,"red works only with positives"),r(t.red,"red works only with red numbers")},M.prototype._verify2=function(t,i){r(0==(t.negative|i.negative),"red works only with positives"),r(t.red&&t.red===i.red,"red works only with red numbers")},M.prototype.imod=function(t){return this.prime?this.prime.ireduce(t)._forceRed(this):t.umod(this.m)._forceRed(this)},M.prototype.neg=function(t){return t.isZero()?t.clone():this.m.sub(t)._forceRed(this)},M.prototype.add=function(t,i){this._verify2(t,i);var r=t.add(i);return r.cmp(this.m)>=0&&r.isub(this.m),r._forceRed(this)},M.prototype.iadd=function(t,i){this._verify2(t,i);var r=t.iadd(i);return r.cmp(this.m)>=0&&r.isub(this.m),r},M.prototype.sub=function(t,i){this._verify2(t,i);var r=t.sub(i);return r.cmpn(0)<0&&r.iadd(this.m),r._forceRed(this)},M.prototype.isub=function(t,i){this._verify2(t,i);var r=t.isub(i);return r.cmpn(0)<0&&r.iadd(this.m),r},M.prototype.shl=function(t,i){return this._verify1(t),this.imod(t.ushln(i))},M.prototype.imul=function(t,i){return this._verify2(t,i),this.imod(t.imul(i))},M.prototype.mul=function(t,i){return this._verify2(t,i),this.imod(t.mul(i))},M.prototype.isqr=function(t){return this.imul(t,t.clone())},M.prototype.sqr=function(t){return this.mul(t,t)},M.prototype.sqrt=function(t){if(t.isZero())return t.clone();var i=this.m.andln(3);if(r(i%2==1),3===i){var h=this.m.add(new n(1)).iushrn(2);return this.pow(t,h)}for(var e=this.m.subn(1),o=0;!e.isZero()&&0===e.andln(1);)o++,e.iushrn(1);r(!e.isZero());var s=new n(1).toRed(this),u=s.redNeg(),a=this.m.subn(1).iushrn(1),l=this.m.bitLength();for(l=new n(2*l*l).toRed(this);0!==this.pow(l,a).cmp(u);)l.redIAdd(u);for(var m=this.pow(l,e),f=this.pow(t,e.addn(1).iushrn(1)),d=this.pow(t,e),p=o;0!==d.cmp(s);){for(var M=d,v=0;0!==M.cmp(s);v++)M=M.redSqr();r(v<p);var g=this.pow(m,new n(1).iushln(p-v-1));f=f.redMul(g),m=g.redSqr(),d=d.redMul(m),p=v}return f},M.prototype.invm=function(t){var i=t._invmp(this.m);return 0!==i.negative?(i.negative=0,this.imod(i).redNeg()):this.imod(i)},M.prototype.pow=function(t,i){if(i.isZero())return new n(1).toRed(this);if(0===i.cmpn(1))return t.clone();var r=new Array(16);r[0]=new n(1).toRed(this),r[1]=t;for(var h=2;h<r.length;h++)r[h]=this.mul(r[h-1],t);var e=r[0],o=0,s=0,u=i.bitLength()%26;for(0===u&&(u=26),h=i.length-1;h>=0;h--){for(var a=i.words[h],l=u-1;l>=0;l--){var m=a>>l&1;e!==r[0]&&(e=this.sqr(e)),0!==m||0!==o?(o<<=1,o|=m,(4===++s||0===h&&0===l)&&(e=this.mul(e,r[o]),s=0,o=0)):s=0}u=26}return e},M.prototype.convertTo=function(t){var i=t.umod(this.m);return i===t?i.clone():i},M.prototype.convertFrom=function(t){var i=t.clone();return i.red=null,i},n.mont=function(t){return new v(t)},h(v,M),v.prototype.convertTo=function(t){return this.imod(t.ushln(this.shift))},v.prototype.convertFrom=function(t){var i=this.imod(t.mul(this.rinv));return i.red=null,i},v.prototype.imul=function(t,i){if(t.isZero()||i.isZero())return t.words[0]=0,t.length=1,t;var r=t.imul(i),h=r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),n=r.isub(h).iushrn(this.shift),e=n;return n.cmp(this.m)>=0?e=n.isub(this.m):n.cmpn(0)<0&&(e=n.iadd(this.m)),e._forceRed(this)},v.prototype.mul=function(t,i){if(t.isZero()||i.isZero())return new n(0)._forceRed(this);var r=t.mul(i),h=r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),e=r.isub(h).iushrn(this.shift),o=e;return e.cmp(this.m)>=0?o=e.isub(this.m):e.cmpn(0)<0&&(o=e.iadd(this.m)),o._forceRed(this)},v.prototype.invm=function(t){return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)}}("undefined"==typeof module||module,this);

},{"buffer":91}],3:[function(require,module,exports){
function Rand(t){this.rand=t}var r;if(module.exports=function(t){return r||(r=new Rand(null)),r.generate(t)},module.exports.Rand=Rand,Rand.prototype.generate=function(t){return this._rand(t)},Rand.prototype._rand=function(t){if(this.rand.getBytes)return this.rand.getBytes(t);for(var r=new Uint8Array(t),e=0;e<r.length;e++)r[e]=this.rand.getByte();return r},"object"==typeof self)self.crypto&&self.crypto.getRandomValues?Rand.prototype._rand=function(t){var r=new Uint8Array(t);return self.crypto.getRandomValues(r),r}:self.msCrypto&&self.msCrypto.getRandomValues?Rand.prototype._rand=function(t){var r=new Uint8Array(t);return self.msCrypto.getRandomValues(r),r}:"object"==typeof window&&(Rand.prototype._rand=function(){throw new Error("Not implemented yet")});else try{var crypto=require("crypto");if("function"!=typeof crypto.randomBytes)throw new Error("Not supported");Rand.prototype._rand=function(t){return crypto.randomBytes(t)}}catch(t){}

},{"crypto":91}],4:[function(require,module,exports){
function CipherBase(t){Transform.call(this),this.hashMode="string"==typeof t,this.hashMode?this[t]=this._finalOrDigest:this.final=this._finalOrDigest,this._final&&(this.__final=this._final,this._final=null),this._decoder=null,this._encoding=null}var Buffer=require("safe-buffer").Buffer,Transform=require("stream").Transform,StringDecoder=require("string_decoder").StringDecoder,inherits=require("inherits");inherits(CipherBase,Transform),CipherBase.prototype.update=function(t,e,r){"string"==typeof t&&(t=Buffer.from(t,e));var i=this._update(t);return this.hashMode?this:(r&&(i=this._toString(i,r)),i)},CipherBase.prototype.setAutoPadding=function(){},CipherBase.prototype.getAuthTag=function(){throw new Error("trying to get auth tag in unsupported state")},CipherBase.prototype.setAuthTag=function(){throw new Error("trying to set auth tag in unsupported state")},CipherBase.prototype.setAAD=function(){throw new Error("trying to set aad in unsupported state")},CipherBase.prototype._transform=function(t,e,r){var i;try{this.hashMode?this._update(t):this.push(this._update(t))}catch(t){i=t}finally{r(i)}},CipherBase.prototype._flush=function(t){var e;try{this.push(this.__final())}catch(t){e=t}t(e)},CipherBase.prototype._finalOrDigest=function(t){var e=this.__final()||Buffer.alloc(0);return t&&(e=this._toString(e,t,!0)),e},CipherBase.prototype._toString=function(t,e,r){if(this._decoder||(this._decoder=new StringDecoder(e),this._encoding=e),this._encoding!==e)throw new Error("can't switch encodings");var i=this._decoder.write(t);return r&&(i+=this._decoder.end()),i},module.exports=CipherBase;

function CipherBase (hashMode) {
  Transform.call(this)
  this.hashMode = typeof hashMode === 'string'
  if (this.hashMode) {
    this[hashMode] = this._finalOrDigest
  } else {
    this.final = this._finalOrDigest
  }
  if (this._final) {
    this.__final = this._final
    this._final = null
  }
  this._decoder = null
  this._encoding = null
}
inherits(CipherBase, Transform)

CipherBase.prototype.update = function (data, inputEnc, outputEnc) {
  if (typeof data === 'string') {
    data = Buffer.from(data, inputEnc)
  }

  var outData = this._update(data)
  if (this.hashMode) return this

  if (outputEnc) {
    outData = this._toString(outData, outputEnc)
  }

  return outData
}

CipherBase.prototype.setAutoPadding = function () {}
CipherBase.prototype.getAuthTag = function () {
  throw new Error('trying to get auth tag in unsupported state')
}

CipherBase.prototype.setAuthTag = function () {
  throw new Error('trying to set auth tag in unsupported state')
}

CipherBase.prototype.setAAD = function () {
  throw new Error('trying to set aad in unsupported state')
}

CipherBase.prototype._transform = function (data, _, next) {
  var err
  try {
    if (this.hashMode) {
      this._update(data)
    } else {
      this.push(this._update(data))
    }
  } catch (e) {
    err = e
  } finally {
    next(err)
  }
}
CipherBase.prototype._flush = function (done) {
  var err
  try {
    this.push(this.__final())
  } catch (e) {
    err = e
  }

  done(err)
}
CipherBase.prototype._finalOrDigest = function (outputEnc) {
  var outData = this.__final() || Buffer.alloc(0)
  if (outputEnc) {
    outData = this._toString(outData, outputEnc, true)
  }
  return outData
}

CipherBase.prototype._toString = function (value, enc, fin) {
  if (!this._decoder) {
    this._decoder = new StringDecoder(enc)
    this._encoding = enc
  }

  if (this._encoding !== enc) throw new Error('can\'t switch encodings')

  var out = this._decoder.write(value)
  if (fin) {
    out += this._decoder.end()
  }

  return out
}

module.exports = CipherBase

},{"inherits":40,"safe-buffer":52,"stream":224,"string_decoder":225}],5:[function(require,module,exports){
(function (Buffer){
"use strict";function HashNoConstructor(s){Base.call(this,"digest"),this._hash=s,this.buffers=[]}function Hash(s){Base.call(this,"digest"),this._hash=s}var inherits=require("inherits"),md5=require("./md5"),RIPEMD160=require("ripemd160"),sha=require("sha.js"),Base=require("cipher-base");inherits(HashNoConstructor,Base),HashNoConstructor.prototype._update=function(s){this.buffers.push(s)},HashNoConstructor.prototype._final=function(){var s=Buffer.concat(this.buffers),t=this._hash(s);return this.buffers=null,t},inherits(Hash,Base),Hash.prototype._update=function(s){this._hash.update(s)},Hash.prototype._final=function(){return this._hash.digest()},module.exports=function(s){return"md5"===(s=s.toLowerCase())?new HashNoConstructor(md5):new Hash("rmd160"===s||"ripemd160"===s?new RIPEMD160:sha(s))};

}).call(this,require("buffer").Buffer)
},{"./md5":7,"buffer":120,"cipher-base":4,"inherits":40,"ripemd160":50,"sha.js":61}],6:[function(require,module,exports){
(function (Buffer){
"use strict";function toArray(e){if(e.length%intSize!=0){var r=e.length+(intSize-e.length%intSize);e=Buffer.concat([e,zeroBuffer],r)}for(var t=new Array(e.length>>>2),n=0,i=0;n<e.length;n+=intSize,i++)t[i]=e.readInt32LE(n);return t}var intSize=4,zeroBuffer=new Buffer(intSize);zeroBuffer.fill(0);var charSize=8,hashSize=16;module.exports=function(e,r){var t=r(toArray(e),e.length*charSize);e=new Buffer(hashSize);for(var n=0;n<t.length;n++)e.writeInt32LE(t[n],n<<2,!0);return e};

}).call(this,require("buffer").Buffer)
},{"buffer":120}],7:[function(require,module,exports){
"use strict";function core_md5(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,i=-1732584194,h=271733878,g=0;g<d.length;g+=16){var n=m,r=f,e=i,a=h;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,i=md5_ff(i,h=md5_ff(h,m=md5_ff(m,f,i,h,d[g+0],7,-680876936),f,i,d[g+1],12,-389564586),m,f,d[g+2],17,606105819),h,m,d[g+3],22,-1044525330),i=md5_ff(i,h=md5_ff(h,m=md5_ff(m,f,i,h,d[g+4],7,-176418897),f,i,d[g+5],12,1200080426),m,f,d[g+6],17,-1473231341),h,m,d[g+7],22,-45705983),i=md5_ff(i,h=md5_ff(h,m=md5_ff(m,f,i,h,d[g+8],7,1770035416),f,i,d[g+9],12,-1958414417),m,f,d[g+10],17,-42063),h,m,d[g+11],22,-1990404162),i=md5_ff(i,h=md5_ff(h,m=md5_ff(m,f,i,h,d[g+12],7,1804603682),f,i,d[g+13],12,-40341101),m,f,d[g+14],17,-1502002290),h,m,d[g+15],22,1236535329),i=md5_gg(i,h=md5_gg(h,m=md5_gg(m,f,i,h,d[g+1],5,-165796510),f,i,d[g+6],9,-1069501632),m,f,d[g+11],14,643717713),h,m,d[g+0],20,-373897302),i=md5_gg(i,h=md5_gg(h,m=md5_gg(m,f,i,h,d[g+5],5,-701558691),f,i,d[g+10],9,38016083),m,f,d[g+15],14,-660478335),h,m,d[g+4],20,-405537848),i=md5_gg(i,h=md5_gg(h,m=md5_gg(m,f,i,h,d[g+9],5,568446438),f,i,d[g+14],9,-1019803690),m,f,d[g+3],14,-187363961),h,m,d[g+8],20,1163531501),i=md5_gg(i,h=md5_gg(h,m=md5_gg(m,f,i,h,d[g+13],5,-1444681467),f,i,d[g+2],9,-51403784),m,f,d[g+7],14,1735328473),h,m,d[g+12],20,-1926607734),i=md5_hh(i,h=md5_hh(h,m=md5_hh(m,f,i,h,d[g+5],4,-378558),f,i,d[g+8],11,-2022574463),m,f,d[g+11],16,1839030562),h,m,d[g+14],23,-35309556),i=md5_hh(i,h=md5_hh(h,m=md5_hh(m,f,i,h,d[g+1],4,-1530992060),f,i,d[g+4],11,1272893353),m,f,d[g+7],16,-155497632),h,m,d[g+10],23,-1094730640),i=md5_hh(i,h=md5_hh(h,m=md5_hh(m,f,i,h,d[g+13],4,681279174),f,i,d[g+0],11,-358537222),m,f,d[g+3],16,-722521979),h,m,d[g+6],23,76029189),i=md5_hh(i,h=md5_hh(h,m=md5_hh(m,f,i,h,d[g+9],4,-640364487),f,i,d[g+12],11,-421815835),m,f,d[g+15],16,530742520),h,m,d[g+2],23,-995338651),i=md5_ii(i,h=md5_ii(h,m=md5_ii(m,f,i,h,d[g+0],6,-198630844),f,i,d[g+7],10,1126891415),m,f,d[g+14],15,-1416354905),h,m,d[g+5],21,-57434055),i=md5_ii(i,h=md5_ii(h,m=md5_ii(m,f,i,h,d[g+12],6,1700485571),f,i,d[g+3],10,-1894986606),m,f,d[g+10],15,-1051523),h,m,d[g+1],21,-2054922799),i=md5_ii(i,h=md5_ii(h,m=md5_ii(m,f,i,h,d[g+8],6,1873313359),f,i,d[g+15],10,-30611744),m,f,d[g+6],15,-1560198380),h,m,d[g+13],21,1309151649),i=md5_ii(i,h=md5_ii(h,m=md5_ii(m,f,i,h,d[g+4],6,-145523070),f,i,d[g+11],10,-1120210379),m,f,d[g+2],15,718787259),h,m,d[g+9],21,-343485551),m=safe_add(m,n),f=safe_add(f,r),i=safe_add(i,e),h=safe_add(h,a)}return[m,f,i,h]}function md5_cmn(d,_,m,f,i,h){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,h)),i),m)}function md5_ff(d,_,m,f,i,h,g){return md5_cmn(_&m|~_&f,d,_,i,h,g)}function md5_gg(d,_,m,f,i,h,g){return md5_cmn(_&f|m&~f,d,_,i,h,g)}function md5_hh(d,_,m,f,i,h,g){return md5_cmn(_^m^f,d,_,i,h,g)}function md5_ii(d,_,m,f,i,h,g){return md5_cmn(m^(_|~f),d,_,i,h,g)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}var makeHash=require("./make-hash");module.exports=function(d){return makeHash(d,core_md5)};

},{"./make-hash":6}],8:[function(require,module,exports){
"use strict";var elliptic=exports;elliptic.version=require("../package.json").version,elliptic.utils=require("./elliptic/utils"),elliptic.rand=require("brorand"),elliptic.curve=require("./elliptic/curve"),elliptic.curves=require("./elliptic/curves"),elliptic.ec=require("./elliptic/ec"),elliptic.eddsa=require("./elliptic/eddsa");

},{"../package.json":23,"./elliptic/curve":11,"./elliptic/curves":14,"./elliptic/ec":15,"./elliptic/eddsa":18,"./elliptic/utils":22,"brorand":3}],9:[function(require,module,exports){
"use strict";function BaseCurve(t,e){this.type=t,this.p=new BN(e.p,16),this.red=e.prime?BN.red(e.prime):BN.mont(this.p),this.zero=new BN(0).toRed(this.red),this.one=new BN(1).toRed(this.red),this.two=new BN(2).toRed(this.red),this.n=e.n&&new BN(e.n,16),this.g=e.g&&this.pointFromJSON(e.g,e.gRed),this._wnafT1=new Array(4),this._wnafT2=new Array(4),this._wnafT3=new Array(4),this._wnafT4=new Array(4);var n=this.n&&this.p.div(this.n);!n||n.cmpn(100)>0?this.redN=null:(this._maxwellTrick=!0,this.redN=this.n.toRed(this.red))}function BasePoint(t,e){this.curve=t,this.type=e,this.precomputed=null}var BN=require("bn.js"),elliptic=require("../../elliptic"),utils=elliptic.utils,getNAF=utils.getNAF,getJSF=utils.getJSF,assert=utils.assert;module.exports=BaseCurve,BaseCurve.prototype.point=function(){throw new Error("Not implemented")},BaseCurve.prototype.validate=function(){throw new Error("Not implemented")},BaseCurve.prototype._fixedNafMul=function(t,e){assert(t.precomputed);var n=t._getDoubles(),r=getNAF(e,1),i=(1<<n.step+1)-(n.step%2==0?2:1);i/=3;for(var o=[],s=0;s<r.length;s+=n.step){for(var a=0,e=s+n.step-1;e>=s;e--)a=(a<<1)+r[e];o.push(a)}for(var p=this.jpoint(null,null,null),u=this.jpoint(null,null,null),d=i;d>0;d--){for(s=0;s<o.length;s++){(a=o[s])===d?u=u.mixedAdd(n.points[s]):a===-d&&(u=u.mixedAdd(n.points[s].neg()))}p=p.add(u)}return p.toP()},BaseCurve.prototype._wnafMul=function(t,e){var n=4,r=t._getNAFPoints(n);n=r.wnd;for(var i=r.points,o=getNAF(e,n),s=this.jpoint(null,null,null),a=o.length-1;a>=0;a--){for(e=0;a>=0&&0===o[a];a--)e++;if(a>=0&&e++,s=s.dblp(e),a<0)break;var p=o[a];assert(0!==p),s="affine"===t.type?p>0?s.mixedAdd(i[p-1>>1]):s.mixedAdd(i[-p-1>>1].neg()):p>0?s.add(i[p-1>>1]):s.add(i[-p-1>>1].neg())}return"affine"===t.type?s.toP():s},BaseCurve.prototype._wnafMulAdd=function(t,e,n,r,i){for(var o=this._wnafT1,s=this._wnafT2,a=this._wnafT3,p=0,u=0;u<r;u++){var d=(N=e[u])._getNAFPoints(t);o[u]=d.wnd,s[u]=d.points}for(u=r-1;u>=1;u-=2){var l=u-1,h=u;if(1===o[l]&&1===o[h]){var f=[e[l],null,null,e[h]];0===e[l].y.cmp(e[h].y)?(f[1]=e[l].add(e[h]),f[2]=e[l].toJ().mixedAdd(e[h].neg())):0===e[l].y.cmp(e[h].y.redNeg())?(f[1]=e[l].toJ().mixedAdd(e[h]),f[2]=e[l].add(e[h].neg())):(f[1]=e[l].toJ().mixedAdd(e[h]),f[2]=e[l].toJ().mixedAdd(e[h].neg()));var c=[-3,-1,-5,-7,0,7,5,1,3],g=getJSF(n[l],n[h]);p=Math.max(g[0].length,p),a[l]=new Array(p),a[h]=new Array(p);for(b=0;b<p;b++){var v=0|g[0][b],m=0|g[1][b];a[l][b]=c[3*(v+1)+(m+1)],a[h][b]=0,s[l]=f}}else a[l]=getNAF(n[l],o[l]),a[h]=getNAF(n[h],o[h]),p=Math.max(a[l].length,p),p=Math.max(a[h].length,p)}for(var y=this.jpoint(null,null,null),w=this._wnafT4,u=p;u>=0;u--){for(var B=0;u>=0;){for(var A=!0,b=0;b<r;b++)w[b]=0|a[b][u],0!==w[b]&&(A=!1);if(!A)break;B++,u--}if(u>=0&&B++,y=y.dblp(B),u<0)break;for(b=0;b<r;b++){var N,_=w[b];0!==_&&(_>0?N=s[b][_-1>>1]:_<0&&(N=s[b][-_-1>>1].neg()),y="affine"===N.type?y.mixedAdd(N):y.add(N))}}for(u=0;u<r;u++)s[u]=null;return i?y:y.toP()},BaseCurve.BasePoint=BasePoint,BasePoint.prototype.eq=function(){throw new Error("Not implemented")},BasePoint.prototype.validate=function(){return this.curve.validate(this)},BaseCurve.prototype.decodePoint=function(t,e){t=utils.toArray(t,e);var n=this.p.byteLength();if((4===t[0]||6===t[0]||7===t[0])&&t.length-1==2*n){6===t[0]?assert(t[t.length-1]%2==0):7===t[0]&&assert(t[t.length-1]%2==1);return this.point(t.slice(1,1+n),t.slice(1+n,1+2*n))}if((2===t[0]||3===t[0])&&t.length-1===n)return this.pointFromX(t.slice(1,1+n),3===t[0]);throw new Error("Unknown point format")},BasePoint.prototype.encodeCompressed=function(t){return this.encode(t,!0)},BasePoint.prototype._encode=function(t){var e=this.curve.p.byteLength(),n=this.getX().toArray("be",e);return t?[this.getY().isEven()?2:3].concat(n):[4].concat(n,this.getY().toArray("be",e))},BasePoint.prototype.encode=function(t,e){return utils.encode(this._encode(e),t)},BasePoint.prototype.precompute=function(t){if(this.precomputed)return this;var e={doubles:null,naf:null,beta:null};return e.naf=this._getNAFPoints(8),e.doubles=this._getDoubles(4,t),e.beta=this._getBeta(),this.precomputed=e,this},BasePoint.prototype._hasDoubles=function(t){if(!this.precomputed)return!1;var e=this.precomputed.doubles;return!!e&&e.points.length>=Math.ceil((t.bitLength()+1)/e.step)},BasePoint.prototype._getDoubles=function(t,e){if(this.precomputed&&this.precomputed.doubles)return this.precomputed.doubles;for(var n=[this],r=this,i=0;i<e;i+=t){for(var o=0;o<t;o++)r=r.dbl();n.push(r)}return{step:t,points:n}},BasePoint.prototype._getNAFPoints=function(t){if(this.precomputed&&this.precomputed.naf)return this.precomputed.naf;for(var e=[this],n=(1<<t)-1,r=1===n?null:this.dbl(),i=1;i<n;i++)e[i]=e[i-1].add(r);return{wnd:t,points:e}},BasePoint.prototype._getBeta=function(){return null},BasePoint.prototype.dblp=function(t){for(var e=this,n=0;n<t;n++)e=e.dbl();return e};

},{"../../elliptic":8,"bn.js":2}],10:[function(require,module,exports){
"use strict";function EdwardsCurve(t){this.twisted=1!=(0|t.a),this.mOneA=this.twisted&&-1==(0|t.a),this.extended=this.mOneA,Base.call(this,"edwards",t),this.a=new BN(t.a,16).umod(this.red.m),this.a=this.a.toRed(this.red),this.c=new BN(t.c,16).toRed(this.red),this.c2=this.c.redSqr(),this.d=new BN(t.d,16).toRed(this.red),this.dd=this.d.redAdd(this.d),assert(!this.twisted||0===this.c.fromRed().cmpn(1)),this.oneC=1==(0|t.c)}function Point(t,r,e,i,d){Base.BasePoint.call(this,t,"projective"),null===r&&null===e&&null===i?(this.x=this.curve.zero,this.y=this.curve.one,this.z=this.curve.one,this.t=this.curve.zero,this.zOne=!0):(this.x=new BN(r,16),this.y=new BN(e,16),this.z=i?new BN(i,16):this.curve.one,this.t=d&&new BN(d,16),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)),this.t&&!this.t.red&&(this.t=this.t.toRed(this.curve.red)),this.zOne=this.z===this.curve.one,this.curve.extended&&!this.t&&(this.t=this.x.redMul(this.y),this.zOne||(this.t=this.t.redMul(this.z.redInvm()))))}var curve=require("../curve"),elliptic=require("../../elliptic"),BN=require("bn.js"),inherits=require("inherits"),Base=curve.base,assert=elliptic.utils.assert;inherits(EdwardsCurve,Base),module.exports=EdwardsCurve,EdwardsCurve.prototype._mulA=function(t){return this.mOneA?t.redNeg():this.a.redMul(t)},EdwardsCurve.prototype._mulC=function(t){return this.oneC?t:this.c.redMul(t)},EdwardsCurve.prototype.jpoint=function(t,r,e,i){return this.point(t,r,e,i)},EdwardsCurve.prototype.pointFromX=function(t,r){(t=new BN(t,16)).red||(t=t.toRed(this.red));var e=t.redSqr(),i=this.c2.redSub(this.a.redMul(e)),d=this.one.redSub(this.c2.redMul(this.d).redMul(e)),s=i.redMul(d.redInvm()),u=s.redSqrt();if(0!==u.redSqr().redSub(s).cmp(this.zero))throw new Error("invalid point");var n=u.fromRed().isOdd();return(r&&!n||!r&&n)&&(u=u.redNeg()),this.point(t,u)},EdwardsCurve.prototype.pointFromY=function(t,r){(t=new BN(t,16)).red||(t=t.toRed(this.red));var e=t.redSqr(),i=e.redSub(this.one),d=e.redMul(this.d).redAdd(this.one),s=i.redMul(d.redInvm());if(0===s.cmp(this.zero)){if(r)throw new Error("invalid point");return this.point(this.zero,t)}var u=s.redSqrt();if(0!==u.redSqr().redSub(s).cmp(this.zero))throw new Error("invalid point");return u.isOdd()!==r&&(u=u.redNeg()),this.point(u,t)},EdwardsCurve.prototype.validate=function(t){if(t.isInfinity())return!0;t.normalize();var r=t.x.redSqr(),e=t.y.redSqr(),i=r.redMul(this.a).redAdd(e),d=this.c2.redMul(this.one.redAdd(this.d.redMul(r).redMul(e)));return 0===i.cmp(d)},inherits(Point,Base.BasePoint),EdwardsCurve.prototype.pointFromJSON=function(t){return Point.fromJSON(this,t)},EdwardsCurve.prototype.point=function(t,r,e,i){return new Point(this,t,r,e,i)},Point.fromJSON=function(t,r){return new Point(t,r[0],r[1],r[2])},Point.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" y: "+this.y.fromRed().toString(16,2)+" z: "+this.z.fromRed().toString(16,2)+">"},Point.prototype.isInfinity=function(){return 0===this.x.cmpn(0)&&0===this.y.cmp(this.z)},Point.prototype._extDbl=function(){var t=this.x.redSqr(),r=this.y.redSqr(),e=this.z.redSqr();e=e.redIAdd(e);var i=this.curve._mulA(t),d=this.x.redAdd(this.y).redSqr().redISub(t).redISub(r),s=i.redAdd(r),u=s.redSub(e),n=i.redSub(r),h=d.redMul(u),o=s.redMul(n),l=d.redMul(n),c=u.redMul(s);return this.curve.point(h,o,c,l)},Point.prototype._projDbl=function(){var t,r,e,i=this.x.redAdd(this.y).redSqr(),d=this.x.redSqr(),s=this.y.redSqr();if(this.curve.twisted){var u=(o=this.curve._mulA(d)).redAdd(s);if(this.zOne)t=i.redSub(d).redSub(s).redMul(u.redSub(this.curve.two)),r=u.redMul(o.redSub(s)),e=u.redSqr().redSub(u).redSub(u);else{var n=this.z.redSqr(),h=u.redSub(n).redISub(n);t=i.redSub(d).redISub(s).redMul(h),r=u.redMul(o.redSub(s)),e=u.redMul(h)}}else{var o=d.redAdd(s),n=this.curve._mulC(this.c.redMul(this.z)).redSqr(),h=o.redSub(n).redSub(n);t=this.curve._mulC(i.redISub(o)).redMul(h),r=this.curve._mulC(o).redMul(d.redISub(s)),e=o.redMul(h)}return this.curve.point(t,r,e)},Point.prototype.dbl=function(){return this.isInfinity()?this:this.curve.extended?this._extDbl():this._projDbl()},Point.prototype._extAdd=function(t){var r=this.y.redSub(this.x).redMul(t.y.redSub(t.x)),e=this.y.redAdd(this.x).redMul(t.y.redAdd(t.x)),i=this.t.redMul(this.curve.dd).redMul(t.t),d=this.z.redMul(t.z.redAdd(t.z)),s=e.redSub(r),u=d.redSub(i),n=d.redAdd(i),h=e.redAdd(r),o=s.redMul(u),l=n.redMul(h),c=s.redMul(h),p=u.redMul(n);return this.curve.point(o,l,p,c)},Point.prototype._projAdd=function(t){var r,e,i=this.z.redMul(t.z),d=i.redSqr(),s=this.x.redMul(t.x),u=this.y.redMul(t.y),n=this.curve.d.redMul(s).redMul(u),h=d.redSub(n),o=d.redAdd(n),l=this.x.redAdd(this.y).redMul(t.x.redAdd(t.y)).redISub(s).redISub(u),c=i.redMul(h).redMul(l);return this.curve.twisted?(r=i.redMul(o).redMul(u.redSub(this.curve._mulA(s))),e=h.redMul(o)):(r=i.redMul(o).redMul(u.redSub(s)),e=this.curve._mulC(h).redMul(o)),this.curve.point(c,r,e)},Point.prototype.add=function(t){return this.isInfinity()?t:t.isInfinity()?this:this.curve.extended?this._extAdd(t):this._projAdd(t)},Point.prototype.mul=function(t){return this._hasDoubles(t)?this.curve._fixedNafMul(this,t):this.curve._wnafMul(this,t)},Point.prototype.mulAdd=function(t,r,e){return this.curve._wnafMulAdd(1,[this,r],[t,e],2,!1)},Point.prototype.jmulAdd=function(t,r,e){return this.curve._wnafMulAdd(1,[this,r],[t,e],2,!0)},Point.prototype.normalize=function(){if(this.zOne)return this;var t=this.z.redInvm();return this.x=this.x.redMul(t),this.y=this.y.redMul(t),this.t&&(this.t=this.t.redMul(t)),this.z=this.curve.one,this.zOne=!0,this},Point.prototype.neg=function(){return this.curve.point(this.x.redNeg(),this.y,this.z,this.t&&this.t.redNeg())},Point.prototype.getX=function(){return this.normalize(),this.x.fromRed()},Point.prototype.getY=function(){return this.normalize(),this.y.fromRed()},Point.prototype.eq=function(t){return this===t||0===this.getX().cmp(t.getX())&&0===this.getY().cmp(t.getY())},Point.prototype.eqXToP=function(t){var r=t.toRed(this.curve.red).redMul(this.z);if(0===this.x.cmp(r))return!0;for(var e=t.clone(),i=this.curve.redN.redMul(this.z);;){if(e.iadd(this.curve.n),e.cmp(this.curve.p)>=0)return!1;if(r.redIAdd(i),0===this.x.cmp(r))return!0}return!1},Point.prototype.toP=Point.prototype.normalize,Point.prototype.mixedAdd=Point.prototype.add;

},{"../../elliptic":8,"../curve":11,"bn.js":2,"inherits":40}],11:[function(require,module,exports){
"use strict";var curve=exports;curve.base=require("./base"),curve.short=require("./short"),curve.mont=require("./mont"),curve.edwards=require("./edwards");

},{"./base":9,"./edwards":10,"./mont":12,"./short":13}],12:[function(require,module,exports){
"use strict";function MontCurve(t){Base.call(this,"mont",t),this.a=new BN(t.a,16).toRed(this.red),this.b=new BN(t.b,16).toRed(this.red),this.i4=new BN(4).toRed(this.red).redInvm(),this.two=new BN(2).toRed(this.red),this.a24=this.i4.redMul(this.a.redAdd(this.two))}function Point(t,r,e){Base.BasePoint.call(this,t,"projective"),null===r&&null===e?(this.x=this.curve.one,this.z=this.curve.zero):(this.x=new BN(r,16),this.z=new BN(e,16),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)))}var curve=require("../curve"),BN=require("bn.js"),inherits=require("inherits"),Base=curve.base,elliptic=require("../../elliptic"),utils=elliptic.utils;inherits(MontCurve,Base),module.exports=MontCurve,MontCurve.prototype.validate=function(t){var r=t.normalize().x,e=r.redSqr(),i=e.redMul(r).redAdd(e.redMul(this.a)).redAdd(r);return 0===i.redSqrt().redSqr().cmp(i)},inherits(Point,Base.BasePoint),MontCurve.prototype.decodePoint=function(t,r){return this.point(utils.toArray(t,r),1)},MontCurve.prototype.point=function(t,r){return new Point(this,t,r)},MontCurve.prototype.pointFromJSON=function(t){return Point.fromJSON(this,t)},Point.prototype.precompute=function(){},Point.prototype._encode=function(){return this.getX().toArray("be",this.curve.p.byteLength())},Point.fromJSON=function(t,r){return new Point(t,r[0],r[1]||t.one)},Point.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" z: "+this.z.fromRed().toString(16,2)+">"},Point.prototype.isInfinity=function(){return 0===this.z.cmpn(0)},Point.prototype.dbl=function(){var t=this.x.redAdd(this.z).redSqr(),r=this.x.redSub(this.z).redSqr(),e=t.redSub(r),i=t.redMul(r),o=e.redMul(r.redAdd(this.curve.a24.redMul(e)));return this.curve.point(i,o)},Point.prototype.add=function(){throw new Error("Not supported on Montgomery curve")},Point.prototype.diffAdd=function(t,r){var e=this.x.redAdd(this.z),i=this.x.redSub(this.z),o=t.x.redAdd(t.z),n=t.x.redSub(t.z).redMul(e),u=o.redMul(i),d=r.z.redMul(n.redAdd(u).redSqr()),s=r.x.redMul(n.redISub(u).redSqr());return this.curve.point(d,s)},Point.prototype.mul=function(t){for(var r=t.clone(),e=this,i=this.curve.point(null,null),o=this,n=[];0!==r.cmpn(0);r.iushrn(1))n.push(r.andln(1));for(var u=n.length-1;u>=0;u--)0===n[u]?(e=e.diffAdd(i,o),i=i.dbl()):(i=e.diffAdd(i,o),e=e.dbl());return i},Point.prototype.mulAdd=function(){throw new Error("Not supported on Montgomery curve")},Point.prototype.jumlAdd=function(){throw new Error("Not supported on Montgomery curve")},Point.prototype.eq=function(t){return 0===this.getX().cmp(t.getX())},Point.prototype.normalize=function(){return this.x=this.x.redMul(this.z.redInvm()),this.z=this.curve.one,this},Point.prototype.getX=function(){return this.normalize(),this.x.fromRed()};

},{"../../elliptic":8,"../curve":11,"bn.js":2,"inherits":40}],13:[function(require,module,exports){
"use strict";function ShortCurve(r){Base.call(this,"short",r),this.a=new BN(r.a,16).toRed(this.red),this.b=new BN(r.b,16).toRed(this.red),this.tinv=this.two.redInvm(),this.zeroA=0===this.a.fromRed().cmpn(0),this.threeA=0===this.a.fromRed().sub(this.p).cmpn(-3),this.endo=this._getEndomorphism(r),this._endoWnafT1=new Array(4),this._endoWnafT2=new Array(4)}function Point(r,e,t,d){Base.BasePoint.call(this,r,"affine"),null===e&&null===t?(this.x=null,this.y=null,this.inf=!0):(this.x=new BN(e,16),this.y=new BN(t,16),d&&(this.x.forceRed(this.curve.red),this.y.forceRed(this.curve.red)),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.inf=!1)}function JPoint(r,e,t,d){Base.BasePoint.call(this,r,"jacobian"),null===e&&null===t&&null===d?(this.x=this.curve.one,this.y=this.curve.one,this.z=new BN(0)):(this.x=new BN(e,16),this.y=new BN(t,16),this.z=new BN(d,16)),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)),this.zOne=this.z===this.curve.one}var curve=require("../curve"),elliptic=require("../../elliptic"),BN=require("bn.js"),inherits=require("inherits"),Base=curve.base,assert=elliptic.utils.assert;inherits(ShortCurve,Base),module.exports=ShortCurve,ShortCurve.prototype._getEndomorphism=function(r){if(this.zeroA&&this.g&&this.n&&1===this.p.modn(3)){var e,t;if(r.beta)e=new BN(r.beta,16).toRed(this.red);else{var d=this._getEndoRoots(this.p);e=(e=d[0].cmp(d[1])<0?d[0]:d[1]).toRed(this.red)}if(r.lambda)t=new BN(r.lambda,16);else{var i=this._getEndoRoots(this.n);0===this.g.mul(i[0]).x.cmp(this.g.x.redMul(e))?t=i[0]:(t=i[1],assert(0===this.g.mul(t).x.cmp(this.g.x.redMul(e))))}var n;return n=r.basis?r.basis.map(function(r){return{a:new BN(r.a,16),b:new BN(r.b,16)}}):this._getEndoBasis(t),{beta:e,lambda:t,basis:n}}},ShortCurve.prototype._getEndoRoots=function(r){var e=r===this.p?this.red:BN.mont(r),t=new BN(2).toRed(e).redInvm(),d=t.redNeg(),i=new BN(3).toRed(e).redNeg().redSqrt().redMul(t);return[d.redAdd(i).fromRed(),d.redSub(i).fromRed()]},ShortCurve.prototype._getEndoBasis=function(r){for(var e,t,d,i,n,u,s,o,h,l=this.n.ushrn(Math.floor(this.n.bitLength()/2)),p=r,a=this.n.clone(),c=new BN(1),f=new BN(0),v=new BN(0),S=new BN(1),b=0;0!==p.cmpn(0);){var I=a.div(p);o=a.sub(I.mul(p)),h=v.sub(I.mul(c));var y=S.sub(I.mul(f));if(!d&&o.cmp(l)<0)e=s.neg(),t=c,d=o.neg(),i=h;else if(d&&2==++b)break;s=o,a=p,p=o,v=c,c=h,S=f,f=y}n=o.neg(),u=h;var A=d.sqr().add(i.sqr());return n.sqr().add(u.sqr()).cmp(A)>=0&&(n=e,u=t),d.negative&&(d=d.neg(),i=i.neg()),n.negative&&(n=n.neg(),u=u.neg()),[{a:d,b:i},{a:n,b:u}]},ShortCurve.prototype._endoSplit=function(r){var e=this.endo.basis,t=e[0],d=e[1],i=d.b.mul(r).divRound(this.n),n=t.b.neg().mul(r).divRound(this.n),u=i.mul(t.a),s=n.mul(d.a),o=i.mul(t.b),h=n.mul(d.b);return{k1:r.sub(u).sub(s),k2:o.add(h).neg()}},ShortCurve.prototype.pointFromX=function(r,e){(r=new BN(r,16)).red||(r=r.toRed(this.red));var t=r.redSqr().redMul(r).redIAdd(r.redMul(this.a)).redIAdd(this.b),d=t.redSqrt();if(0!==d.redSqr().redSub(t).cmp(this.zero))throw new Error("invalid point");var i=d.fromRed().isOdd();return(e&&!i||!e&&i)&&(d=d.redNeg()),this.point(r,d)},ShortCurve.prototype.validate=function(r){if(r.inf)return!0;var e=r.x,t=r.y,d=this.a.redMul(e),i=e.redSqr().redMul(e).redIAdd(d).redIAdd(this.b);return 0===t.redSqr().redISub(i).cmpn(0)},ShortCurve.prototype._endoWnafMulAdd=function(r,e,t){for(var d=this._endoWnafT1,i=this._endoWnafT2,n=0;n<r.length;n++){var u=this._endoSplit(e[n]),s=r[n],o=s._getBeta();u.k1.negative&&(u.k1.ineg(),s=s.neg(!0)),u.k2.negative&&(u.k2.ineg(),o=o.neg(!0)),d[2*n]=s,d[2*n+1]=o,i[2*n]=u.k1,i[2*n+1]=u.k2}for(var h=this._wnafMulAdd(1,d,i,2*n,t),l=0;l<2*n;l++)d[l]=null,i[l]=null;return h},inherits(Point,Base.BasePoint),ShortCurve.prototype.point=function(r,e,t){return new Point(this,r,e,t)},ShortCurve.prototype.pointFromJSON=function(r,e){return Point.fromJSON(this,r,e)},Point.prototype._getBeta=function(){if(this.curve.endo){var r=this.precomputed;if(r&&r.beta)return r.beta;var e=this.curve.point(this.x.redMul(this.curve.endo.beta),this.y);if(r){var t=this.curve,d=function(r){return t.point(r.x.redMul(t.endo.beta),r.y)};r.beta=e,e.precomputed={beta:null,naf:r.naf&&{wnd:r.naf.wnd,points:r.naf.points.map(d)},doubles:r.doubles&&{step:r.doubles.step,points:r.doubles.points.map(d)}}}return e}},Point.prototype.toJSON=function(){return this.precomputed?[this.x,this.y,this.precomputed&&{doubles:this.precomputed.doubles&&{step:this.precomputed.doubles.step,points:this.precomputed.doubles.points.slice(1)},naf:this.precomputed.naf&&{wnd:this.precomputed.naf.wnd,points:this.precomputed.naf.points.slice(1)}}]:[this.x,this.y]},Point.fromJSON=function(r,e,t){function d(e){return r.point(e[0],e[1],t)}"string"==typeof e&&(e=JSON.parse(e));var i=r.point(e[0],e[1],t);if(!e[2])return i;var n=e[2];return i.precomputed={beta:null,doubles:n.doubles&&{step:n.doubles.step,points:[i].concat(n.doubles.points.map(d))},naf:n.naf&&{wnd:n.naf.wnd,points:[i].concat(n.naf.points.map(d))}},i},Point.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" y: "+this.y.fromRed().toString(16,2)+">"},Point.prototype.isInfinity=function(){return this.inf},Point.prototype.add=function(r){if(this.inf)return r;if(r.inf)return this;if(this.eq(r))return this.dbl();if(this.neg().eq(r))return this.curve.point(null,null);if(0===this.x.cmp(r.x))return this.curve.point(null,null);var e=this.y.redSub(r.y);0!==e.cmpn(0)&&(e=e.redMul(this.x.redSub(r.x).redInvm()));var t=e.redSqr().redISub(this.x).redISub(r.x),d=e.redMul(this.x.redSub(t)).redISub(this.y);return this.curve.point(t,d)},Point.prototype.dbl=function(){if(this.inf)return this;var r=this.y.redAdd(this.y);if(0===r.cmpn(0))return this.curve.point(null,null);var e=this.curve.a,t=this.x.redSqr(),d=r.redInvm(),i=t.redAdd(t).redIAdd(t).redIAdd(e).redMul(d),n=i.redSqr().redISub(this.x.redAdd(this.x)),u=i.redMul(this.x.redSub(n)).redISub(this.y);return this.curve.point(n,u)},Point.prototype.getX=function(){return this.x.fromRed()},Point.prototype.getY=function(){return this.y.fromRed()},Point.prototype.mul=function(r){return r=new BN(r,16),this._hasDoubles(r)?this.curve._fixedNafMul(this,r):this.curve.endo?this.curve._endoWnafMulAdd([this],[r]):this.curve._wnafMul(this,r)},Point.prototype.mulAdd=function(r,e,t){var d=[this,e],i=[r,t];return this.curve.endo?this.curve._endoWnafMulAdd(d,i):this.curve._wnafMulAdd(1,d,i,2)},Point.prototype.jmulAdd=function(r,e,t){var d=[this,e],i=[r,t];return this.curve.endo?this.curve._endoWnafMulAdd(d,i,!0):this.curve._wnafMulAdd(1,d,i,2,!0)},Point.prototype.eq=function(r){return this===r||this.inf===r.inf&&(this.inf||0===this.x.cmp(r.x)&&0===this.y.cmp(r.y))},Point.prototype.neg=function(r){if(this.inf)return this;var e=this.curve.point(this.x,this.y.redNeg());if(r&&this.precomputed){var t=this.precomputed,d=function(r){return r.neg()};e.precomputed={naf:t.naf&&{wnd:t.naf.wnd,points:t.naf.points.map(d)},doubles:t.doubles&&{step:t.doubles.step,points:t.doubles.points.map(d)}}}return e},Point.prototype.toJ=function(){if(this.inf)return this.curve.jpoint(null,null,null);return this.curve.jpoint(this.x,this.y,this.curve.one)},inherits(JPoint,Base.BasePoint),ShortCurve.prototype.jpoint=function(r,e,t){return new JPoint(this,r,e,t)},JPoint.prototype.toP=function(){if(this.isInfinity())return this.curve.point(null,null);var r=this.z.redInvm(),e=r.redSqr(),t=this.x.redMul(e),d=this.y.redMul(e).redMul(r);return this.curve.point(t,d)},JPoint.prototype.neg=function(){return this.curve.jpoint(this.x,this.y.redNeg(),this.z)},JPoint.prototype.add=function(r){if(this.isInfinity())return r;if(r.isInfinity())return this;var e=r.z.redSqr(),t=this.z.redSqr(),d=this.x.redMul(e),i=r.x.redMul(t),n=this.y.redMul(e.redMul(r.z)),u=r.y.redMul(t.redMul(this.z)),s=d.redSub(i),o=n.redSub(u);if(0===s.cmpn(0))return 0!==o.cmpn(0)?this.curve.jpoint(null,null,null):this.dbl();var h=s.redSqr(),l=h.redMul(s),p=d.redMul(h),a=o.redSqr().redIAdd(l).redISub(p).redISub(p),c=o.redMul(p.redISub(a)).redISub(n.redMul(l)),f=this.z.redMul(r.z).redMul(s);return this.curve.jpoint(a,c,f)},JPoint.prototype.mixedAdd=function(r){if(this.isInfinity())return r.toJ();if(r.isInfinity())return this;var e=this.z.redSqr(),t=this.x,d=r.x.redMul(e),i=this.y,n=r.y.redMul(e).redMul(this.z),u=t.redSub(d),s=i.redSub(n);if(0===u.cmpn(0))return 0!==s.cmpn(0)?this.curve.jpoint(null,null,null):this.dbl();var o=u.redSqr(),h=o.redMul(u),l=t.redMul(o),p=s.redSqr().redIAdd(h).redISub(l).redISub(l),a=s.redMul(l.redISub(p)).redISub(i.redMul(h)),c=this.z.redMul(u);return this.curve.jpoint(p,a,c)},JPoint.prototype.dblp=function(r){if(0===r)return this;if(this.isInfinity())return this;if(!r)return this.dbl();if(this.curve.zeroA||this.curve.threeA){for(var e=this,t=0;t<r;t++)e=e.dbl();return e}for(var d=this.curve.a,i=this.curve.tinv,n=this.x,u=this.y,s=this.z,o=s.redSqr().redSqr(),h=u.redAdd(u),t=0;t<r;t++){var l=n.redSqr(),p=h.redSqr(),a=p.redSqr(),c=l.redAdd(l).redIAdd(l).redIAdd(d.redMul(o)),f=n.redMul(p),v=c.redSqr().redISub(f.redAdd(f)),S=f.redISub(v),b=c.redMul(S);b=b.redIAdd(b).redISub(a);var I=h.redMul(s);t+1<r&&(o=o.redMul(a)),n=v,s=I,h=b}return this.curve.jpoint(n,h.redMul(i),s)},JPoint.prototype.dbl=function(){return this.isInfinity()?this:this.curve.zeroA?this._zeroDbl():this.curve.threeA?this._threeDbl():this._dbl()},JPoint.prototype._zeroDbl=function(){var r,e,t;if(this.zOne){var d=this.x.redSqr(),i=this.y.redSqr(),n=i.redSqr(),u=this.x.redAdd(i).redSqr().redISub(d).redISub(n);u=u.redIAdd(u);var s=d.redAdd(d).redIAdd(d),o=s.redSqr().redISub(u).redISub(u),h=n.redIAdd(n);h=(h=h.redIAdd(h)).redIAdd(h),r=o,e=s.redMul(u.redISub(o)).redISub(h),t=this.y.redAdd(this.y)}else{var l=this.x.redSqr(),p=this.y.redSqr(),a=p.redSqr(),c=this.x.redAdd(p).redSqr().redISub(l).redISub(a);c=c.redIAdd(c);var f=l.redAdd(l).redIAdd(l),v=f.redSqr(),S=a.redIAdd(a);S=(S=S.redIAdd(S)).redIAdd(S),r=v.redISub(c).redISub(c),e=f.redMul(c.redISub(r)).redISub(S),t=(t=this.y.redMul(this.z)).redIAdd(t)}return this.curve.jpoint(r,e,t)},JPoint.prototype._threeDbl=function(){var r,e,t;if(this.zOne){var d=this.x.redSqr(),i=this.y.redSqr(),n=i.redSqr(),u=this.x.redAdd(i).redSqr().redISub(d).redISub(n);u=u.redIAdd(u);var s=d.redAdd(d).redIAdd(d).redIAdd(this.curve.a),o=s.redSqr().redISub(u).redISub(u);r=o;var h=n.redIAdd(n);h=(h=h.redIAdd(h)).redIAdd(h),e=s.redMul(u.redISub(o)).redISub(h),t=this.y.redAdd(this.y)}else{var l=this.z.redSqr(),p=this.y.redSqr(),a=this.x.redMul(p),c=this.x.redSub(l).redMul(this.x.redAdd(l));c=c.redAdd(c).redIAdd(c);var f=a.redIAdd(a),v=(f=f.redIAdd(f)).redAdd(f);r=c.redSqr().redISub(v),t=this.y.redAdd(this.z).redSqr().redISub(p).redISub(l);var S=p.redSqr();S=(S=(S=S.redIAdd(S)).redIAdd(S)).redIAdd(S),e=c.redMul(f.redISub(r)).redISub(S)}return this.curve.jpoint(r,e,t)},JPoint.prototype._dbl=function(){var r=this.curve.a,e=this.x,t=this.y,d=this.z,i=d.redSqr().redSqr(),n=e.redSqr(),u=t.redSqr(),s=n.redAdd(n).redIAdd(n).redIAdd(r.redMul(i)),o=e.redAdd(e),h=(o=o.redIAdd(o)).redMul(u),l=s.redSqr().redISub(h.redAdd(h)),p=h.redISub(l),a=u.redSqr();a=(a=(a=a.redIAdd(a)).redIAdd(a)).redIAdd(a);var c=s.redMul(p).redISub(a),f=t.redAdd(t).redMul(d);return this.curve.jpoint(l,c,f)},JPoint.prototype.trpl=function(){if(!this.curve.zeroA)return this.dbl().add(this);var r=this.x.redSqr(),e=this.y.redSqr(),t=this.z.redSqr(),d=e.redSqr(),i=r.redAdd(r).redIAdd(r),n=i.redSqr(),u=this.x.redAdd(e).redSqr().redISub(r).redISub(d),s=(u=(u=(u=u.redIAdd(u)).redAdd(u).redIAdd(u)).redISub(n)).redSqr(),o=d.redIAdd(d);o=(o=(o=o.redIAdd(o)).redIAdd(o)).redIAdd(o);var h=i.redIAdd(u).redSqr().redISub(n).redISub(s).redISub(o),l=e.redMul(h);l=(l=l.redIAdd(l)).redIAdd(l);var p=this.x.redMul(s).redISub(l);p=(p=p.redIAdd(p)).redIAdd(p);var a=this.y.redMul(h.redMul(o.redISub(h)).redISub(u.redMul(s)));a=(a=(a=a.redIAdd(a)).redIAdd(a)).redIAdd(a);var c=this.z.redAdd(u).redSqr().redISub(t).redISub(s);return this.curve.jpoint(p,a,c)},JPoint.prototype.mul=function(r,e){return r=new BN(r,e),this.curve._wnafMul(this,r)},JPoint.prototype.eq=function(r){if("affine"===r.type)return this.eq(r.toJ());if(this===r)return!0;var e=this.z.redSqr(),t=r.z.redSqr();if(0!==this.x.redMul(t).redISub(r.x.redMul(e)).cmpn(0))return!1;var d=e.redMul(this.z),i=t.redMul(r.z);return 0===this.y.redMul(i).redISub(r.y.redMul(d)).cmpn(0)},JPoint.prototype.eqXToP=function(r){var e=this.z.redSqr(),t=r.toRed(this.curve.red).redMul(e);if(0===this.x.cmp(t))return!0;for(var d=r.clone(),i=this.curve.redN.redMul(e);;){if(d.iadd(this.curve.n),d.cmp(this.curve.p)>=0)return!1;if(t.redIAdd(i),0===this.x.cmp(t))return!0}return!1},JPoint.prototype.inspect=function(){return this.isInfinity()?"<EC JPoint Infinity>":"<EC JPoint x: "+this.x.toString(16,2)+" y: "+this.y.toString(16,2)+" z: "+this.z.toString(16,2)+">"},JPoint.prototype.isInfinity=function(){return 0===this.z.cmpn(0)};

},{"../../elliptic":8,"../curve":11,"bn.js":2,"inherits":40}],14:[function(require,module,exports){
"use strict";function PresetCurve(f){"short"===f.type?this.curve=new elliptic.curve.short(f):"edwards"===f.type?this.curve=new elliptic.curve.edwards(f):this.curve=new elliptic.curve.mont(f),this.g=this.curve.g,this.n=this.curve.n,this.hash=f.hash,assert(this.g.validate(),"Invalid curve"),assert(this.g.mul(this.n).isInfinity(),"Invalid curve, G*N != O")}function defineCurve(f,e){Object.defineProperty(curves,f,{configurable:!0,enumerable:!0,get:function(){var a=new PresetCurve(e);return Object.defineProperty(curves,f,{configurable:!0,enumerable:!0,value:a}),a}})}var curves=exports,hash=require("hash.js"),elliptic=require("../elliptic"),assert=elliptic.utils.assert;curves.PresetCurve=PresetCurve,defineCurve("p192",{type:"short",prime:"p192",p:"ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",a:"ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",b:"64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",n:"ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",hash:hash.sha256,gRed:!1,g:["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012","07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"]}),defineCurve("p224",{type:"short",prime:"p224",p:"ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",a:"ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",b:"b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",n:"ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",hash:hash.sha256,gRed:!1,g:["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21","bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"]}),defineCurve("p256",{type:"short",prime:null,p:"ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",a:"ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",b:"5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",n:"ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",hash:hash.sha256,gRed:!1,g:["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296","4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"]}),defineCurve("p384",{type:"short",prime:null,p:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",a:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",b:"b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",n:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",hash:hash.sha384,gRed:!1,g:["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7","3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"]}),defineCurve("p521",{type:"short",prime:null,p:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",a:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",b:"00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",n:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",hash:hash.sha512,gRed:!1,g:["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66","00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"]}),defineCurve("curve25519",{type:"mont",prime:"p25519",p:"7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",a:"76d06",b:"1",n:"1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",hash:hash.sha256,gRed:!1,g:["9"]}),defineCurve("ed25519",{type:"edwards",prime:"p25519",p:"7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",a:"-1",c:"1",d:"52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",n:"1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",hash:hash.sha256,gRed:!1,g:["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a","6666666666666666666666666666666666666666666666666666666666666658"]});var pre;try{pre=require("./precomputed/secp256k1")}catch(f){pre=void 0}defineCurve("secp256k1",{type:"short",prime:"k256",p:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",a:"0",b:"7",n:"ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",h:"1",hash:hash.sha256,beta:"7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",lambda:"5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",basis:[{a:"3086d221a7d46bcde86c90e49284eb15",b:"-e4437ed6010e88286f547fa90abfe4c3"},{a:"114ca50f7a8e2f3f657c1108d9d44cfd8",b:"3086d221a7d46bcde86c90e49284eb15"}],gRed:!1,g:["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798","483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",pre]});

},{"../elliptic":8,"./precomputed/secp256k1":21,"hash.js":27}],15:[function(require,module,exports){
"use strict";function EC(e){if(!(this instanceof EC))return new EC(e);"string"==typeof e&&(assert(elliptic.curves.hasOwnProperty(e),"Unknown curve "+e),e=elliptic.curves[e]),e instanceof elliptic.curves.PresetCurve&&(e={curve:e}),this.curve=e.curve.curve,this.n=this.curve.n,this.nh=this.n.ushrn(1),this.g=this.curve.g,this.g=e.curve.g,this.g.precompute(e.curve.n.bitLength()+1),this.hash=e.hash||e.curve.hash}var BN=require("bn.js"),HmacDRBG=require("hmac-drbg"),elliptic=require("../../elliptic"),utils=elliptic.utils,assert=utils.assert,KeyPair=require("./key"),Signature=require("./signature");module.exports=EC,EC.prototype.keyPair=function(e){return new KeyPair(this,e)},EC.prototype.keyFromPrivate=function(e,t){return KeyPair.fromPrivate(this,e,t)},EC.prototype.keyFromPublic=function(e,t){return KeyPair.fromPublic(this,e,t)},EC.prototype.genKeyPair=function(e){e||(e={});for(var t=new HmacDRBG({hash:this.hash,pers:e.pers,persEnc:e.persEnc||"utf8",entropy:e.entropy||elliptic.rand(this.hash.hmacStrength),entropyEnc:e.entropy&&e.entropyEnc||"utf8",nonce:this.n.toArray()}),r=this.n.byteLength(),n=this.n.sub(new BN(2));;){var i=new BN(t.generate(r));if(!(i.cmp(n)>0))return i.iaddn(1),this.keyFromPrivate(i)}},EC.prototype._truncateToN=function(e,t){var r=8*e.byteLength()-this.n.bitLength();return r>0&&(e=e.ushrn(r)),!t&&e.cmp(this.n)>=0?e.sub(this.n):e},EC.prototype.sign=function(e,t,r,n){"object"==typeof r&&(n=r,r=null),n||(n={}),t=this.keyFromPrivate(t,r),e=this._truncateToN(new BN(e,16));for(var i=this.n.byteLength(),s=t.getPrivate().toArray("be",i),u=e.toArray("be",i),o=new HmacDRBG({hash:this.hash,entropy:s,nonce:u,pers:n.pers,persEnc:n.persEnc||"utf8"}),c=this.n.sub(new BN(1)),h=0;!0;h++){var a=n.k?n.k(h):new BN(o.generate(this.n.byteLength()));if(!((a=this._truncateToN(a,!0)).cmpn(1)<=0||a.cmp(c)>=0)){var p=this.g.mul(a);if(!p.isInfinity()){var m=p.getX(),v=m.umod(this.n);if(0!==v.cmpn(0)){var y=a.invm(this.n).mul(v.mul(t.getPrivate()).iadd(e));if(0!==(y=y.umod(this.n)).cmpn(0)){var l=(p.getY().isOdd()?1:0)|(0!==m.cmp(v)?2:0);return n.canonical&&y.cmp(this.nh)>0&&(y=this.n.sub(y),l^=1),new Signature({r:v,s:y,recoveryParam:l})}}}}}},EC.prototype.verify=function(e,t,r,n){e=this._truncateToN(new BN(e,16)),r=this.keyFromPublic(r,n);var i=(t=new Signature(t,"hex")).r,s=t.s;if(i.cmpn(1)<0||i.cmp(this.n)>=0)return!1;if(s.cmpn(1)<0||s.cmp(this.n)>=0)return!1;var u=s.invm(this.n),o=u.mul(e).umod(this.n),c=u.mul(i).umod(this.n);if(!this.curve._maxwellTrick){return!(h=this.g.mulAdd(o,r.getPublic(),c)).isInfinity()&&0===h.getX().umod(this.n).cmp(i)}var h=this.g.jmulAdd(o,r.getPublic(),c);return!h.isInfinity()&&h.eqXToP(i)},EC.prototype.recoverPubKey=function(e,t,r,n){assert((3&r)===r,"The recovery param is more than two bits"),t=new Signature(t,n);var i=this.n,s=new BN(e),u=t.r,o=t.s,c=1&r,h=r>>1;if(u.cmp(this.curve.p.umod(this.curve.n))>=0&&h)throw new Error("Unable to find sencond key candinate");u=h?this.curve.pointFromX(u.add(this.curve.n),c):this.curve.pointFromX(u,c);var a=t.r.invm(i),p=i.sub(s).mul(a).umod(i),m=o.mul(a).umod(i);return this.g.mulAdd(p,u,m)},EC.prototype.getKeyRecoveryParam=function(e,t,r,n){if(null!==(t=new Signature(t,n)).recoveryParam)return t.recoveryParam;for(var i=0;i<4;i++){var s;try{s=this.recoverPubKey(e,t,i)}catch(e){continue}if(s.eq(r))return i}throw new Error("Unable to find valid recovery factor")};

},{"../../elliptic":8,"./key":16,"./signature":17,"bn.js":2,"hmac-drbg":39}],16:[function(require,module,exports){
"use strict";function KeyPair(i,t){this.ec=i,this.priv=null,this.pub=null,t.priv&&this._importPrivate(t.priv,t.privEnc),t.pub&&this._importPublic(t.pub,t.pubEnc)}var BN=require("bn.js"),elliptic=require("../../elliptic"),utils=elliptic.utils,assert=utils.assert;module.exports=KeyPair,KeyPair.fromPublic=function(i,t,e){return t instanceof KeyPair?t:new KeyPair(i,{pub:t,pubEnc:e})},KeyPair.fromPrivate=function(i,t,e){return t instanceof KeyPair?t:new KeyPair(i,{priv:t,privEnc:e})},KeyPair.prototype.validate=function(){var i=this.getPublic();return i.isInfinity()?{result:!1,reason:"Invalid public key"}:i.validate()?i.mul(this.ec.curve.n).isInfinity()?{result:!0,reason:null}:{result:!1,reason:"Public key * N != O"}:{result:!1,reason:"Public key is not a point"}},KeyPair.prototype.getPublic=function(i,t){return"string"==typeof i&&(t=i,i=null),this.pub||(this.pub=this.ec.g.mul(this.priv)),t?this.pub.encode(t,i):this.pub},KeyPair.prototype.getPrivate=function(i){return"hex"===i?this.priv.toString(16,2):this.priv},KeyPair.prototype._importPrivate=function(i,t){this.priv=new BN(i,t||16),this.priv=this.priv.umod(this.ec.curve.n)},KeyPair.prototype._importPublic=function(i,t){if(i.x||i.y)return"mont"===this.ec.curve.type?assert(i.x,"Need x coordinate"):"short"!==this.ec.curve.type&&"edwards"!==this.ec.curve.type||assert(i.x&&i.y,"Need both x and y coordinate"),void(this.pub=this.ec.curve.point(i.x,i.y));this.pub=this.ec.curve.decodePoint(i,t)},KeyPair.prototype.derive=function(i){return i.mul(this.priv).getX()},KeyPair.prototype.sign=function(i,t,e){return this.ec.sign(i,this,t,e)},KeyPair.prototype.verify=function(i,t){return this.ec.verify(i,t,this)},KeyPair.prototype.inspect=function(){return"<Key priv: "+(this.priv&&this.priv.toString(16,2))+" pub: "+(this.pub&&this.pub.inspect())+" >"};

},{"../../elliptic":8,"bn.js":2}],17:[function(require,module,exports){
"use strict";function Signature(t,r){if(t instanceof Signature)return t;this._importDER(t,r)||(assert(t.r&&t.s,"Signature without r or s"),this.r=new BN(t.r,16),this.s=new BN(t.s,16),void 0===t.recoveryParam?this.recoveryParam=null:this.recoveryParam=t.recoveryParam)}function Position(){this.place=0}function getLength(t,r){var e=t[r.place++];if(!(128&e))return e;for(var n=15&e,i=0,a=0,c=r.place;a<n;a++,c++)i<<=8,i|=t[c];return r.place=c,i}function rmPadding(t){for(var r=0,e=t.length-1;!t[r]&&!(128&t[r+1])&&r<e;)r++;return 0===r?t:t.slice(r)}function constructLength(t,r){if(r<128)t.push(r);else{var e=1+(Math.log(r)/Math.LN2>>>3);for(t.push(128|e);--e;)t.push(r>>>(e<<3)&255);t.push(r)}}var BN=require("bn.js"),elliptic=require("../../elliptic"),utils=elliptic.utils,assert=utils.assert;module.exports=Signature,Signature.prototype._importDER=function(t,r){t=utils.toArray(t,r);var e=new Position;if(48!==t[e.place++])return!1;if(getLength(t,e)+e.place!==t.length)return!1;if(2!==t[e.place++])return!1;var n=getLength(t,e),i=t.slice(e.place,n+e.place);if(e.place+=n,2!==t[e.place++])return!1;var a=getLength(t,e);if(t.length!==a+e.place)return!1;var c=t.slice(e.place,a+e.place);return 0===i[0]&&128&i[1]&&(i=i.slice(1)),0===c[0]&&128&c[1]&&(c=c.slice(1)),this.r=new BN(i),this.s=new BN(c),this.recoveryParam=null,!0},Signature.prototype.toDER=function(t){var r=this.r.toArray(),e=this.s.toArray();for(128&r[0]&&(r=[0].concat(r)),128&e[0]&&(e=[0].concat(e)),r=rmPadding(r),e=rmPadding(e);!(e[0]||128&e[1]);)e=e.slice(1);var n=[2];constructLength(n,r.length),(n=n.concat(r)).push(2),constructLength(n,e.length);var i=n.concat(e),a=[48];return constructLength(a,i.length),a=a.concat(i),utils.encode(a,t)};

},{"../../elliptic":8,"bn.js":2}],18:[function(require,module,exports){
"use strict";function EDDSA(t){if(assert("ed25519"===t,"only tested with ed25519 so far"),!(this instanceof EDDSA))return new EDDSA(t);t=elliptic.curves[t].curve;this.curve=t,this.g=t.g,this.g.precompute(t.n.bitLength()+1),this.pointClass=t.point().constructor,this.encodingLength=Math.ceil(t.n.bitLength()/8),this.hash=hash.sha512}var hash=require("hash.js"),elliptic=require("../../elliptic"),utils=elliptic.utils,assert=utils.assert,parseBytes=utils.parseBytes,KeyPair=require("./key"),Signature=require("./signature");module.exports=EDDSA,EDDSA.prototype.sign=function(t,e){t=parseBytes(t);var i=this.keyFromSecret(e),r=this.hashInt(i.messagePrefix(),t),n=this.g.mul(r),s=this.encodePoint(n),o=this.hashInt(s,i.pubBytes(),t).mul(i.priv()),u=r.add(o).umod(this.curve.n);return this.makeSignature({R:n,S:u,Rencoded:s})},EDDSA.prototype.verify=function(t,e,i){t=parseBytes(t),e=this.makeSignature(e);var r=this.keyFromPublic(i),n=this.hashInt(e.Rencoded(),r.pubBytes(),t),s=this.g.mul(e.S());return e.R().add(r.pub().mul(n)).eq(s)},EDDSA.prototype.hashInt=function(){for(var t=this.hash(),e=0;e<arguments.length;e++)t.update(arguments[e]);return utils.intFromLE(t.digest()).umod(this.curve.n)},EDDSA.prototype.keyFromPublic=function(t){return KeyPair.fromPublic(this,t)},EDDSA.prototype.keyFromSecret=function(t){return KeyPair.fromSecret(this,t)},EDDSA.prototype.makeSignature=function(t){return t instanceof Signature?t:new Signature(this,t)},EDDSA.prototype.encodePoint=function(t){var e=t.getY().toArray("le",this.encodingLength);return e[this.encodingLength-1]|=t.getX().isOdd()?128:0,e},EDDSA.prototype.decodePoint=function(t){var e=(t=utils.parseBytes(t)).length-1,i=t.slice(0,e).concat(-129&t[e]),r=0!=(128&t[e]),n=utils.intFromLE(i);return this.curve.pointFromY(n,r)},EDDSA.prototype.encodeInt=function(t){return t.toArray("le",this.encodingLength)},EDDSA.prototype.decodeInt=function(t){return utils.intFromLE(t)},EDDSA.prototype.isPoint=function(t){return t instanceof this.pointClass};

},{"../../elliptic":8,"./key":19,"./signature":20,"hash.js":27}],19:[function(require,module,exports){
"use strict";function KeyPair(e,t){this.eddsa=e,this._secret=parseBytes(t.secret),e.isPoint(t.pub)?this._pub=t.pub:this._pubBytes=parseBytes(t.pub)}var elliptic=require("../../elliptic"),utils=elliptic.utils,assert=utils.assert,parseBytes=utils.parseBytes,cachedProperty=utils.cachedProperty;KeyPair.fromPublic=function(e,t){return t instanceof KeyPair?t:new KeyPair(e,{pub:t})},KeyPair.fromSecret=function(e,t){return t instanceof KeyPair?t:new KeyPair(e,{secret:t})},KeyPair.prototype.secret=function(){return this._secret},cachedProperty(KeyPair,"pubBytes",function(){return this.eddsa.encodePoint(this.pub())}),cachedProperty(KeyPair,"pub",function(){return this._pubBytes?this.eddsa.decodePoint(this._pubBytes):this.eddsa.g.mul(this.priv())}),cachedProperty(KeyPair,"privBytes",function(){var e=this.eddsa,t=this.hash(),i=e.encodingLength-1,r=t.slice(0,e.encodingLength);return r[0]&=248,r[i]&=127,r[i]|=64,r}),cachedProperty(KeyPair,"priv",function(){return this.eddsa.decodeInt(this.privBytes())}),cachedProperty(KeyPair,"hash",function(){return this.eddsa.hash().update(this.secret()).digest()}),cachedProperty(KeyPair,"messagePrefix",function(){return this.hash().slice(this.eddsa.encodingLength)}),KeyPair.prototype.sign=function(e){return assert(this._secret,"KeyPair can only verify"),this.eddsa.sign(e,this)},KeyPair.prototype.verify=function(e,t){return this.eddsa.verify(e,t,this)},KeyPair.prototype.getSecret=function(e){return assert(this._secret,"KeyPair is public only"),utils.encode(this.secret(),e)},KeyPair.prototype.getPublic=function(e){return utils.encode(this.pubBytes(),e)},module.exports=KeyPair;

},{"../../elliptic":8}],20:[function(require,module,exports){
"use strict";function Signature(e,t){this.eddsa=e,"object"!=typeof t&&(t=parseBytes(t)),Array.isArray(t)&&(t={R:t.slice(0,e.encodingLength),S:t.slice(e.encodingLength)}),assert(t.R&&t.S,"Signature without R or S"),e.isPoint(t.R)&&(this._R=t.R),t.S instanceof BN&&(this._S=t.S),this._Rencoded=Array.isArray(t.R)?t.R:t.Rencoded,this._Sencoded=Array.isArray(t.S)?t.S:t.Sencoded}var BN=require("bn.js"),elliptic=require("../../elliptic"),utils=elliptic.utils,assert=utils.assert,cachedProperty=utils.cachedProperty,parseBytes=utils.parseBytes;cachedProperty(Signature,"S",function(){return this.eddsa.decodeInt(this.Sencoded())}),cachedProperty(Signature,"R",function(){return this.eddsa.decodePoint(this.Rencoded())}),cachedProperty(Signature,"Rencoded",function(){return this.eddsa.encodePoint(this.R())}),cachedProperty(Signature,"Sencoded",function(){return this.eddsa.encodeInt(this.S())}),Signature.prototype.toBytes=function(){return this.Rencoded().concat(this.Sencoded())},Signature.prototype.toHex=function(){return utils.encode(this.toBytes(),"hex").toUpperCase()},module.exports=Signature;

},{"../../elliptic":8,"bn.js":2}],21:[function(require,module,exports){
module.exports={doubles:{step:4,points:[["e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a","f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"],["8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508","11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"],["175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739","d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"],["363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640","4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"],["8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c","4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"],["723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda","96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"],["eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa","5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"],["100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0","cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"],["e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d","9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"],["feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d","e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"],["da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1","9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"],["53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0","5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"],["8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047","10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"],["385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862","283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"],["6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7","7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"],["3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd","56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"],["85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83","7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"],["948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a","53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"],["6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8","bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"],["e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d","4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"],["e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725","7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"],["213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754","4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"],["4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c","17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"],["fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6","6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"],["76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39","c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"],["c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891","893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"],["d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b","febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"],["b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03","2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"],["e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d","eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"],["a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070","7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"],["90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4","e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"],["8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da","662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"],["e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11","1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"],["8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e","efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"],["e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41","2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"],["b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef","67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"],["d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8","db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"],["324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d","648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"],["4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96","35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"],["9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd","ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"],["6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5","9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"],["a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266","40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"],["7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71","34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"],["928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac","c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"],["85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751","1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"],["ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e","493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"],["827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241","c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"],["eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3","be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"],["e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f","4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"],["1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19","aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"],["146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be","b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"],["fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9","6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"],["da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2","8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"],["a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13","7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"],["174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c","ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"],["959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba","2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"],["d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151","e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"],["64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073","d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"],["8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458","38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"],["13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b","69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"],["bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366","d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"],["8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa","40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"],["8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0","620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"],["dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787","7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"],["f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e","ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"]]},naf:{wnd:7,points:[["f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9","388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"],["2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4","d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"],["5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc","6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"],["acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe","cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"],["774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb","d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"],["f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8","ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"],["d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e","581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"],["defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34","4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"],["2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c","85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"],["352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5","321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"],["2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f","2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"],["9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714","73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"],["daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729","a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"],["c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db","2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"],["6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4","e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"],["1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5","b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"],["605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479","2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"],["62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d","80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"],["80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f","1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"],["7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb","d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"],["d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9","eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"],["49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963","758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"],["77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74","958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"],["f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530","e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"],["463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b","5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"],["f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247","cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"],["caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1","cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"],["2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120","4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"],["7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435","91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"],["754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18","673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"],["e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8","59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"],["186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb","3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"],["df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f","55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"],["5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143","efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"],["290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba","e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"],["af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45","f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"],["766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a","744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"],["59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e","c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"],["f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8","e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"],["7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c","30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"],["948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519","e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"],["7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab","100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"],["3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca","ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"],["d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf","8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"],["1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610","68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"],["733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4","f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"],["15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c","d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"],["a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940","edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"],["e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980","a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"],["311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3","66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"],["34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf","9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"],["f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63","4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"],["d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448","fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"],["32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf","5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"],["7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5","8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"],["ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6","8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"],["16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5","5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"],["eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99","f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"],["78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51","f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"],["494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5","42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"],["a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5","204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"],["c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997","4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"],["841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881","73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"],["5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5","39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"],["36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66","d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"],["336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726","ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"],["8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede","6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"],["1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94","60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"],["85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31","3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"],["29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51","b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"],["a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252","ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"],["4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5","cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"],["d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b","6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"],["ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4","322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"],["af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f","6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"],["e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889","2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"],["591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246","b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"],["11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984","998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"],["3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a","b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"],["cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030","bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"],["c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197","6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"],["c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593","c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"],["a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef","21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"],["347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38","60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"],["da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a","49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"],["c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111","5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"],["4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502","7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"],["3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea","be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"],["cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26","8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"],["b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986","39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"],["d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e","62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"],["48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4","25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"],["dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda","ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"],["6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859","cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"],["e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f","f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"],["eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c","6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"],["13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942","fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"],["ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a","1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"],["b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80","5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"],["ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d","438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"],["8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1","cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"],["52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63","c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"],["e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352","6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"],["7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193","ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"],["5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00","9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"],["32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58","ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"],["e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7","d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"],["8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8","c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"],["4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e","67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"],["3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d","cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"],["674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b","299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"],["d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f","f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"],["30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6","462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"],["be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297","62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"],["93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a","7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"],["b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c","ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"],["d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52","4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"],["d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb","bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"],["463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065","bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"],["7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917","603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"],["74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9","cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"],["30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3","553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"],["9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57","712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"],["176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66","ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"],["75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8","9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"],["809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721","9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"],["1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180","4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"]]}};

},{}],22:[function(require,module,exports){
"use strict";function getNAF(t,r){for(var i=[],e=1<<r+1,n=t.clone();n.cmpn(1)>=0;){var s;if(n.isOdd()){var u=n.andln(e-1);s=u>(e>>1)-1?(e>>1)-u:u,n.isubn(s)}else s=0;i.push(s);for(var l=0!==n.cmpn(0)&&0===n.andln(e-1)?r+1:1,o=1;o<l;o++)i.push(0);n.iushrn(l)}return i}function getJSF(t,r){var i=[[],[]];t=t.clone(),r=r.clone();for(var e=0,n=0;t.cmpn(-e)>0||r.cmpn(-n)>0;){var s=t.andln(3)+e&3,u=r.andln(3)+n&3;3===s&&(s=-1),3===u&&(u=-1);var l;if(0==(1&s))l=0;else{l=3!==(a=t.andln(7)+e&7)&&5!==a||2!==u?s:-s}i[0].push(l);var o;if(0==(1&u))o=0;else{var a=r.andln(7)+n&7;o=3!==a&&5!==a||2!==s?u:-u}i[1].push(o),2*e===l+1&&(e=1-e),2*n===o+1&&(n=1-n),t.iushrn(1),r.iushrn(1)}return i}function cachedProperty(t,r,i){var e="_"+r;t.prototype[r]=function(){return void 0!==this[e]?this[e]:this[e]=i.call(this)}}function parseBytes(t){return"string"==typeof t?utils.toArray(t,"hex"):t}function intFromLE(t){return new BN(t,"hex","le")}var utils=exports,BN=require("bn.js"),minAssert=require("minimalistic-assert"),minUtils=require("minimalistic-crypto-utils");utils.assert=minAssert,utils.toArray=minUtils.toArray,utils.zero2=minUtils.zero2,utils.toHex=minUtils.toHex,utils.encode=minUtils.encode,utils.getNAF=getNAF,utils.getJSF=getJSF,utils.cachedProperty=cachedProperty,utils.parseBytes=parseBytes,utils.intFromLE=intFromLE;

},{"bn.js":2,"minimalistic-assert":48,"minimalistic-crypto-utils":49}],23:[function(require,module,exports){
module.exports={
  "_args": [
    [
      "elliptic@6.4.0",
      "/Users/liyadong/WorkSpace/loopering/loopring.js"
    ]
  ],
  "_from": "elliptic@6.4.0",
  "_id": "elliptic@6.4.0",
  "_inBundle": false,
  "_integrity": "sha1-ysmvh2LIWDYYcAPI3+GT5eLq5d8=",
  "_location": "/elliptic",
  "_phantomChildren": {},
  "_requested": {
    "type": "version",
    "registry": true,
    "raw": "elliptic@6.4.0",
    "name": "elliptic",
    "escapedName": "elliptic",
    "rawSpec": "6.4.0",
    "saveSpec": null,
    "fetchSpec": "6.4.0"
  },
  "_requiredBy": [
    "/browserify-sign",
    "/create-ecdh",
    "/secp256k1"
  ],
  "_resolved": "https://registry.npmjs.org/elliptic/-/elliptic-6.4.0.tgz",
  "_spec": "6.4.0",
  "_where": "/Users/liyadong/WorkSpace/loopering/loopring.js",
  "author": {
    "name": "Fedor Indutny",
    "email": "fedor@indutny.com"
  },
  "bugs": {
    "url": "https://github.com/indutny/elliptic/issues"
  },
  "dependencies": {
    "bn.js": "^4.4.0",
    "brorand": "^1.0.1",
    "hash.js": "^1.0.0",
    "hmac-drbg": "^1.0.0",
    "inherits": "^2.0.1",
    "minimalistic-assert": "^1.0.0",
    "minimalistic-crypto-utils": "^1.0.0"
  },
  "description": "EC cryptography",
  "devDependencies": {
    "brfs": "^1.4.3",
    "coveralls": "^2.11.3",
    "grunt": "^0.4.5",
    "grunt-browserify": "^5.0.0",
    "grunt-cli": "^1.2.0",
    "grunt-contrib-connect": "^1.0.0",
    "grunt-contrib-copy": "^1.0.0",
    "grunt-contrib-uglify": "^1.0.1",
    "grunt-mocha-istanbul": "^3.0.1",
    "grunt-saucelabs": "^8.6.2",
    "istanbul": "^0.4.2",
    "jscs": "^2.9.0",
    "jshint": "^2.6.0",
    "mocha": "^2.1.0"
  },
  "files": [
    "lib"
  ],
  "homepage": "https://github.com/indutny/elliptic",
  "keywords": [
    "EC",
    "Elliptic",
    "curve",
    "Cryptography"
  ],
  "license": "MIT",
  "main": "lib/elliptic.js",
  "name": "elliptic",
  "repository": {
    "type": "git",
    "url": "git+ssh://git@github.com/indutny/elliptic.git"
  },
  "scripts": {
    "jscs": "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",
    "jshint": "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",
    "lint": "npm run jscs && npm run jshint",
    "test": "npm run lint && npm run unit",
    "unit": "istanbul test _mocha --reporter=spec test/index.js",
    "version": "grunt dist && git add dist/"
  },
  "version": "6.4.0"
}

},{}],24:[function(require,module,exports){
(function (Buffer){
"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},createKeccakHash=require("keccak"),secp256k1=require("secp256k1"),assert=require("assert"),rlp=require("rlp"),BN=require("bn.js"),createHash=require("create-hash");Object.assign(exports,require("ethjs-util")),exports.MAX_INTEGER=new BN("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",16),exports.TWO_POW256=new BN("10000000000000000000000000000000000000000000000000000000000000000",16),exports.SHA3_NULL_S="c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",exports.SHA3_NULL=Buffer.from(exports.SHA3_NULL_S,"hex"),exports.SHA3_RLP_ARRAY_S="1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",exports.SHA3_RLP_ARRAY=Buffer.from(exports.SHA3_RLP_ARRAY_S,"hex"),exports.SHA3_RLP_S="56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",exports.SHA3_RLP=Buffer.from(exports.SHA3_RLP_S,"hex"),exports.BN=BN,exports.rlp=rlp,exports.secp256k1=secp256k1,exports.zeros=function(e){return Buffer.allocUnsafe(e).fill(0)},exports.setLengthLeft=exports.setLength=function(e,r,t){var f=exports.zeros(r);return e=exports.toBuffer(e),t?e.length<r?(e.copy(f),f):e.slice(0,r):e.length<r?(e.copy(f,r-e.length),f):e.slice(-r)},exports.setLengthRight=function(e,r){return exports.setLength(e,r,!0)},exports.unpad=exports.stripZeros=function(e){for(var r=(e=exports.stripHexPrefix(e))[0];e.length>0&&"0"===r.toString();)r=(e=e.slice(1))[0];return e},exports.toBuffer=function(e){if(!Buffer.isBuffer(e))if(Array.isArray(e))e=Buffer.from(e);else if("string"==typeof e)e=exports.isHexString(e)?Buffer.from(exports.padToEven(exports.stripHexPrefix(e)),"hex"):Buffer.from(e);else if("number"==typeof e)e=exports.intToBuffer(e);else if(null===e||void 0===e)e=Buffer.allocUnsafe(0);else{if(!e.toArray)throw new Error("invalid type");e=Buffer.from(e.toArray())}return e},exports.bufferToInt=function(e){return new BN(exports.toBuffer(e)).toNumber()},exports.bufferToHex=function(e){return"0x"+(e=exports.toBuffer(e)).toString("hex")},exports.fromSigned=function(e){return new BN(e).fromTwos(256)},exports.toUnsigned=function(e){return Buffer.from(e.toTwos(256).toArray())},exports.sha3=function(e,r){return e=exports.toBuffer(e),r||(r=256),createKeccakHash("keccak"+r).update(e).digest()},exports.sha256=function(e){return e=exports.toBuffer(e),createHash("sha256").update(e).digest()},exports.ripemd160=function(e,r){e=exports.toBuffer(e);var t=createHash("rmd160").update(e).digest();return!0===r?exports.setLength(t,32):t},exports.rlphash=function(e){return exports.sha3(rlp.encode(e))},exports.isValidPrivate=function(e){return secp256k1.privateKeyVerify(e)},exports.isValidPublic=function(e,r){return 64===e.length?secp256k1.publicKeyVerify(Buffer.concat([Buffer.from([4]),e])):!!r&&secp256k1.publicKeyVerify(e)},exports.pubToAddress=exports.publicToAddress=function(e,r){return e=exports.toBuffer(e),r&&64!==e.length&&(e=secp256k1.publicKeyConvert(e,!1).slice(1)),assert(64===e.length),exports.sha3(e).slice(-20)};var privateToPublic=exports.privateToPublic=function(e){return e=exports.toBuffer(e),secp256k1.publicKeyCreate(e,!1).slice(1)};exports.importPublic=function(e){return 64!==(e=exports.toBuffer(e)).length&&(e=secp256k1.publicKeyConvert(e,!1).slice(1)),e},exports.ecsign=function(e,r){var t=secp256k1.sign(e,r),f={};return f.r=t.signature.slice(0,32),f.s=t.signature.slice(32,64),f.v=t.recovery+27,f},exports.hashPersonalMessage=function(e){var r=exports.toBuffer("Ethereum Signed Message:\n"+e.length.toString());return exports.sha3(Buffer.concat([r,e]))},exports.ecrecover=function(e,r,t,f){var o=Buffer.concat([exports.setLength(t,32),exports.setLength(f,32)],64),s=r-27;if(0!==s&&1!==s)throw new Error("Invalid signature v value");var n=secp256k1.recover(e,o,s);return secp256k1.publicKeyConvert(n,!1).slice(1)},exports.toRpcSig=function(e,r,t){if(27!==e&&28!==e)throw new Error("Invalid recovery id");return exports.bufferToHex(Buffer.concat([exports.setLengthLeft(r,32),exports.setLengthLeft(t,32),exports.toBuffer(e-27)]))},exports.fromRpcSig=function(e){if(65!==(e=exports.toBuffer(e)).length)throw new Error("Invalid signature length");var r=e[64];return r<27&&(r+=27),{v:r,r:e.slice(0,32),s:e.slice(32,64)}},exports.privateToAddress=function(e){return exports.publicToAddress(privateToPublic(e))},exports.isValidAddress=function(e){return/^0x[0-9a-fA-F]{40}$/i.test(e)},exports.toChecksumAddress=function(e){e=exports.stripHexPrefix(e).toLowerCase();for(var r=exports.sha3(e).toString("hex"),t="0x",f=0;f<e.length;f++)parseInt(r[f],16)>=8?t+=e[f].toUpperCase():t+=e[f];return t},exports.isValidChecksumAddress=function(e){return exports.isValidAddress(e)&&exports.toChecksumAddress(e)===e},exports.generateAddress=function(e,r){return e=exports.toBuffer(e),r=new BN(r),r=r.isZero()?null:Buffer.from(r.toArray()),exports.rlphash([e,r]).slice(-20)},exports.isPrecompiled=function(e){var r=exports.unpad(e);return 1===r.length&&r[0]>0&&r[0]<5},exports.addHexPrefix=function(e){return"string"!=typeof e?e:exports.isHexPrefixed(e)?e:"0x"+e},exports.isValidSignature=function(e,r,t,f){var o=new BN("7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0",16),s=new BN("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141",16);return 32===r.length&&32===t.length&&((27===e||28===e)&&(r=new BN(r),t=new BN(t),!(r.isZero()||r.gt(s)||t.isZero()||t.gt(s))&&(!1!==f||1!==new BN(t).cmp(o))))},exports.baToJSON=function(e){if(Buffer.isBuffer(e))return"0x"+e.toString("hex");if(e instanceof Array){for(var r=[],t=0;t<e.length;t++)r.push(exports.baToJSON(e[t]));return r}},exports.defineProperties=function(e,r,t){if(e.raw=[],e._fields=[],e.toJSON=function(r){if(r){var t={};return e._fields.forEach(function(r){t[r]="0x"+e[r].toString("hex")}),t}return exports.baToJSON(this.raw)},e.serialize=function(){return rlp.encode(e.raw)},r.forEach(function(r,t){function f(){return e.raw[t]}function o(f){"00"!==(f=exports.toBuffer(f)).toString("hex")||r.allowZero||(f=Buffer.allocUnsafe(0)),r.allowLess&&r.length?(f=exports.stripZeros(f),assert(r.length>=f.length,"The field "+r.name+" must not have more "+r.length+" bytes")):r.allowZero&&0===f.length||!r.length||assert(r.length===f.length,"The field "+r.name+" must have byte length of "+r.length),e.raw[t]=f}e._fields.push(r.name),Object.defineProperty(e,r.name,{enumerable:!0,configurable:!0,get:f,set:o}),r.default&&(e[r.name]=r.default),r.alias&&Object.defineProperty(e,r.alias,{enumerable:!1,configurable:!0,set:o,get:f})}),t)if("string"==typeof t&&(t=Buffer.from(exports.stripHexPrefix(t),"hex")),Buffer.isBuffer(t)&&(t=rlp.decode(t)),Array.isArray(t)){if(t.length>e._fields.length)throw new Error("wrong number of fields in data");t.forEach(function(r,t){e[e._fields[t]]=exports.toBuffer(r)})}else{if("object"!==(void 0===t?"undefined":_typeof(t)))throw new Error("invalid data");var f=Object.keys(t);r.forEach(function(r){-1!==f.indexOf(r.name)&&(e[r.name]=t[r.name]),-1!==f.indexOf(r.alias)&&(e[r.alias]=t[r.alias])})}};

}).call(this,require("buffer").Buffer)
},{"assert":87,"bn.js":2,"buffer":120,"create-hash":5,"ethjs-util":25,"keccak":42,"rlp":51,"secp256k1":54}],25:[function(require,module,exports){
(function (Buffer){
"use strict";function padToEven(r){var e=r;if("string"!=typeof e)throw new Error("[ethjs-util] while padding to even, value must be string, is currently "+typeof e+", while padToEven.");return e.length%2&&(e="0"+e),e}function intToHex(r){return"0x"+padToEven(r.toString(16))}function intToBuffer(r){var e=intToHex(r);return new Buffer(e.slice(2),"hex")}function getBinarySize(r){if("string"!=typeof r)throw new Error("[ethjs-util] while getting binary size, method getBinarySize requires input 'str' to be type String, got '"+typeof r+"'.");return Buffer.byteLength(r,"utf8")}function arrayContainsArray(r,e,t){if(!0!==Array.isArray(r))throw new Error("[ethjs-util] method arrayContainsArray requires input 'superset' to be an array got type '"+typeof r+"'");if(!0!==Array.isArray(e))throw new Error("[ethjs-util] method arrayContainsArray requires input 'subset' to be an array got type '"+typeof e+"'");return e[Boolean(t)&&"some"||"every"](function(e){return r.indexOf(e)>=0})}function toUtf8(r){return new Buffer(padToEven(stripHexPrefix(r).replace(/^0+|0+$/g,"")),"hex").toString("utf8")}function toAscii(r){var e="",t=0,i=r.length;for("0x"===r.substring(0,2)&&(t=2);t<i;t+=2){var n=parseInt(r.substr(t,2),16);e+=String.fromCharCode(n)}return e}function fromUtf8(r){return"0x"+padToEven(new Buffer(r,"utf8").toString("hex")).replace(/^0+|0+$/g,"")}function fromAscii(r){for(var e="",t=0;t<r.length;t++){var i=r.charCodeAt(t).toString(16);e+=i.length<2?"0"+i:i}return"0x"+e}function getKeys(r,e,t){if(!Array.isArray(r))throw new Error("[ethjs-util] method getKeys expecting type Array as 'params' input, got '"+typeof r+"'");if("string"!=typeof e)throw new Error("[ethjs-util] method getKeys expecting type String for input 'key' got '"+typeof e+"'.");for(var i=[],n=0;n<r.length;n++){var o=r[n][e];if(t&&!o)o="";else if("string"!=typeof o)throw new Error("invalid abi");i.push(o)}return i}function isHexString(r,e){return!("string"!=typeof r||!r.match(/^0x[0-9A-Fa-f]*$/))&&(!e||r.length===2+2*e)}var isHexPrefixed=require("is-hex-prefixed"),stripHexPrefix=require("strip-hex-prefix");module.exports={arrayContainsArray:arrayContainsArray,intToBuffer:intToBuffer,getBinarySize:getBinarySize,isHexPrefixed:isHexPrefixed,stripHexPrefix:stripHexPrefix,padToEven:padToEven,intToHex:intToHex,fromAscii:fromAscii,fromUtf8:fromUtf8,toAscii:toAscii,toUtf8:toUtf8,getKeys:getKeys,isHexString:isHexString};

}).call(this,require("buffer").Buffer)
},{"buffer":120,"is-hex-prefixed":41,"strip-hex-prefix":68}],26:[function(require,module,exports){
(function (Buffer){
"use strict";function HashBase(t){Transform.call(this),this._block=new Buffer(t),this._blockSize=t,this._blockOffset=0,this._length=[0,0,0,0],this._finalized=!1}var Transform=require("stream").Transform,inherits=require("inherits");inherits(HashBase,Transform),HashBase.prototype._transform=function(t,e,r){var s=null;try{"buffer"!==e&&(t=new Buffer(t,e)),this.update(t)}catch(t){s=t}r(s)},HashBase.prototype._flush=function(t){var e=null;try{this.push(this._digest())}catch(t){e=t}t(e)},HashBase.prototype.update=function(t,e){if(!Buffer.isBuffer(t)&&"string"!=typeof t)throw new TypeError("Data must be a string or a buffer");if(this._finalized)throw new Error("Digest already called");Buffer.isBuffer(t)||(t=new Buffer(t,e||"binary"));for(var r=this._block,s=0;this._blockOffset+t.length-s>=this._blockSize;){for(var i=this._blockOffset;i<this._blockSize;)r[i++]=t[s++];this._update(),this._blockOffset=0}for(;s<t.length;)r[this._blockOffset++]=t[s++];for(var o=0,a=8*t.length;a>0;++o)this._length[o]+=a,(a=this._length[o]/4294967296|0)>0&&(this._length[o]-=4294967296*a);return this},HashBase.prototype._update=function(t){throw new Error("_update is not implemented")},HashBase.prototype.digest=function(t){if(this._finalized)throw new Error("Digest already called");this._finalized=!0;var e=this._digest();return void 0!==t&&(e=e.toString(t)),e},HashBase.prototype._digest=function(){throw new Error("_digest is not implemented")},module.exports=HashBase;

}).call(this,require("buffer").Buffer)
},{"buffer":120,"inherits":40,"stream":224}],27:[function(require,module,exports){
var hash = exports;

},{"./hash/common":28,"./hash/hmac":29,"./hash/ripemd":30,"./hash/sha":31,"./hash/utils":38}],28:[function(require,module,exports){
"use strict";function BlockHash(){this.pending=null,this.pendingTotal=0,this.blockSize=this.constructor.blockSize,this.outSize=this.constructor.outSize,this.hmacStrength=this.constructor.hmacStrength,this.padLength=this.constructor.padLength/8,this.endian="big",this._delta8=this.blockSize/8,this._delta32=this.blockSize/32}var utils=require("./utils"),assert=require("minimalistic-assert");exports.BlockHash=BlockHash,BlockHash.prototype.update=function(t,i){if(t=utils.toArray(t,i),this.pending?this.pending=this.pending.concat(t):this.pending=t,this.pendingTotal+=t.length,this.pending.length>=this._delta8){var n=(t=this.pending).length%this._delta8;this.pending=t.slice(t.length-n,t.length),0===this.pending.length&&(this.pending=null),t=utils.join32(t,0,t.length-n,this.endian);for(var s=0;s<t.length;s+=this._delta32)this._update(t,s,s+this._delta32)}return this},BlockHash.prototype.digest=function(t){return this.update(this._pad()),assert(null===this.pending),this._digest(t)},BlockHash.prototype._pad=function(){var t=this.pendingTotal,i=this._delta8,n=i-(t+this.padLength)%i,s=new Array(n+this.padLength);s[0]=128;for(var e=1;e<n;e++)s[e]=0;if(t<<=3,"big"===this.endian){for(var h=8;h<this.padLength;h++)s[e++]=0;s[e++]=0,s[e++]=0,s[e++]=0,s[e++]=0,s[e++]=t>>>24&255,s[e++]=t>>>16&255,s[e++]=t>>>8&255,s[e++]=255&t}else for(s[e++]=255&t,s[e++]=t>>>8&255,s[e++]=t>>>16&255,s[e++]=t>>>24&255,s[e++]=0,s[e++]=0,s[e++]=0,s[e++]=0,h=8;h<this.padLength;h++)s[e++]=0;return s};

},{"./utils":38,"minimalistic-assert":48}],29:[function(require,module,exports){
"use strict";function Hmac(t,i,e){if(!(this instanceof Hmac))return new Hmac(t,i,e);this.Hash=t,this.blockSize=t.blockSize/8,this.outSize=t.outSize/8,this.inner=null,this.outer=null,this._init(utils.toArray(i,e))}var utils=require("./utils"),assert=require("minimalistic-assert");module.exports=Hmac,Hmac.prototype._init=function(t){t.length>this.blockSize&&(t=(new this.Hash).update(t).digest()),assert(t.length<=this.blockSize);for(var i=t.length;i<this.blockSize;i++)t.push(0);for(i=0;i<t.length;i++)t[i]^=54;for(this.inner=(new this.Hash).update(t),i=0;i<t.length;i++)t[i]^=106;this.outer=(new this.Hash).update(t)},Hmac.prototype.update=function(t,i){return this.inner.update(t,i),this},Hmac.prototype.digest=function(t){return this.outer.update(this.inner.digest()),this.outer.digest(t)};

},{"./utils":38,"minimalistic-assert":48}],30:[function(require,module,exports){
"use strict";function RIPEMD160(){if(!(this instanceof RIPEMD160))return new RIPEMD160;BlockHash.call(this),this.h=[1732584193,4023233417,2562383102,271733878,3285377520],this.endian="little"}function f(t,s,h,i){return t<=15?s^h^i:t<=31?s&h|~s&i:t<=47?(s|~h)^i:t<=63?s&i|h&~i:s^(h|~i)}function K(t){return t<=15?0:t<=31?1518500249:t<=47?1859775393:t<=63?2400959708:2840853838}function Kh(t){return t<=15?1352829926:t<=31?1548603684:t<=47?1836072691:t<=63?2053994217:0}var utils=require("./utils"),common=require("./common"),rotl32=utils.rotl32,sum32=utils.sum32,sum32_3=utils.sum32_3,sum32_4=utils.sum32_4,BlockHash=common.BlockHash;utils.inherits(RIPEMD160,BlockHash),exports.ripemd160=RIPEMD160,RIPEMD160.blockSize=512,RIPEMD160.outSize=160,RIPEMD160.hmacStrength=192,RIPEMD160.padLength=64,RIPEMD160.prototype._update=function(t,h){for(var i=this.h[0],u=this.h[1],o=this.h[2],e=this.h[3],l=this.h[4],n=i,m=u,c=o,a=e,_=l,D=0;D<80;D++){var E=sum32(rotl32(sum32_4(i,f(D,u,o,e),t[r[D]+h],K(D)),s[D]),l);i=l,l=e,e=rotl32(o,10),o=u,u=E,E=sum32(rotl32(sum32_4(n,f(79-D,m,c,a),t[rh[D]+h],Kh(D)),sh[D]),_),n=_,_=a,a=rotl32(c,10),c=m,m=E}E=sum32_3(this.h[1],o,a),this.h[1]=sum32_3(this.h[2],e,_),this.h[2]=sum32_3(this.h[3],l,n),this.h[3]=sum32_3(this.h[4],i,m),this.h[4]=sum32_3(this.h[0],u,c),this.h[0]=E},RIPEMD160.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h,"little"):utils.split32(this.h,"little")};var r=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13],rh=[5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11],s=[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6],sh=[8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11];

},{"./common":28,"./utils":38}],31:[function(require,module,exports){
"use strict";exports.sha1=require("./sha/1"),exports.sha224=require("./sha/224"),exports.sha256=require("./sha/256"),exports.sha384=require("./sha/384"),exports.sha512=require("./sha/512");

},{"./sha/1":32,"./sha/224":33,"./sha/256":34,"./sha/384":35,"./sha/512":36}],32:[function(require,module,exports){
"use strict";function SHA1(){if(!(this instanceof SHA1))return new SHA1;BlockHash.call(this),this.h=[1732584193,4023233417,2562383102,271733878,3285377520],this.W=new Array(80)}var utils=require("../utils"),common=require("../common"),shaCommon=require("./common"),rotl32=utils.rotl32,sum32=utils.sum32,sum32_5=utils.sum32_5,ft_1=shaCommon.ft_1,BlockHash=common.BlockHash,sha1_K=[1518500249,1859775393,2400959708,3395469782];utils.inherits(SHA1,BlockHash),module.exports=SHA1,SHA1.blockSize=512,SHA1.outSize=160,SHA1.hmacStrength=80,SHA1.padLength=64,SHA1.prototype._update=function(t,h){for(var s=this.W,i=0;i<16;i++)s[i]=t[h+i];for(;i<s.length;i++)s[i]=rotl32(s[i-3]^s[i-8]^s[i-14]^s[i-16],1);var o=this.h[0],r=this.h[1],u=this.h[2],e=this.h[3],l=this.h[4];for(i=0;i<s.length;i++){var m=~~(i/20),n=sum32_5(rotl32(o,5),ft_1(m,r,u,e),l,s[i],sha1_K[m]);l=e,e=u,u=rotl32(r,30),r=o,o=n}this.h[0]=sum32(this.h[0],o),this.h[1]=sum32(this.h[1],r),this.h[2]=sum32(this.h[2],u),this.h[3]=sum32(this.h[3],e),this.h[4]=sum32(this.h[4],l)},SHA1.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h,"big"):utils.split32(this.h,"big")};

},{"../common":28,"../utils":38,"./common":37}],33:[function(require,module,exports){
"use strict";function SHA224(){if(!(this instanceof SHA224))return new SHA224;SHA256.call(this),this.h=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428]}var utils=require("../utils"),SHA256=require("./256");utils.inherits(SHA224,SHA256),module.exports=SHA224,SHA224.blockSize=512,SHA224.outSize=224,SHA224.hmacStrength=192,SHA224.padLength=64,SHA224.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h.slice(0,7),"big"):utils.split32(this.h.slice(0,7),"big")};

},{"../utils":38,"./256":34}],34:[function(require,module,exports){
"use strict";function SHA256(){if(!(this instanceof SHA256))return new SHA256;BlockHash.call(this),this.h=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],this.k=sha256_K,this.W=new Array(64)}var utils=require("../utils"),common=require("../common"),shaCommon=require("./common"),assert=require("minimalistic-assert"),sum32=utils.sum32,sum32_4=utils.sum32_4,sum32_5=utils.sum32_5,ch32=shaCommon.ch32,maj32=shaCommon.maj32,s0_256=shaCommon.s0_256,s1_256=shaCommon.s1_256,g0_256=shaCommon.g0_256,g1_256=shaCommon.g1_256,BlockHash=common.BlockHash,sha256_K=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];utils.inherits(SHA256,BlockHash),module.exports=SHA256,SHA256.blockSize=512,SHA256.outSize=256,SHA256.hmacStrength=192,SHA256.padLength=64,SHA256.prototype._update=function(s,h){for(var t=this.W,i=0;i<16;i++)t[i]=s[h+i];for(;i<t.length;i++)t[i]=sum32_4(g1_256(t[i-2]),t[i-7],g0_256(t[i-15]),t[i-16]);var m=this.h[0],o=this.h[1],u=this.h[2],e=this.h[3],n=this.h[4],a=this.h[5],r=this.h[6],l=this.h[7];for(assert(this.k.length===t.length),i=0;i<t.length;i++){var _=sum32_5(l,s1_256(n),ch32(n,a,r),this.k[i],t[i]),c=sum32(s0_256(m),maj32(m,o,u));l=r,r=a,a=n,n=sum32(e,_),e=u,u=o,o=m,m=sum32(_,c)}this.h[0]=sum32(this.h[0],m),this.h[1]=sum32(this.h[1],o),this.h[2]=sum32(this.h[2],u),this.h[3]=sum32(this.h[3],e),this.h[4]=sum32(this.h[4],n),this.h[5]=sum32(this.h[5],a),this.h[6]=sum32(this.h[6],r),this.h[7]=sum32(this.h[7],l)},SHA256.prototype._digest=function(s){return"hex"===s?utils.toHex32(this.h,"big"):utils.split32(this.h,"big")};

},{"../common":28,"../utils":38,"./common":37,"minimalistic-assert":48}],35:[function(require,module,exports){
"use strict";function SHA384(){if(!(this instanceof SHA384))return new SHA384;SHA512.call(this),this.h=[3418070365,3238371032,1654270250,914150663,2438529370,812702999,355462360,4144912697,1731405415,4290775857,2394180231,1750603025,3675008525,1694076839,1203062813,3204075428]}var utils=require("../utils"),SHA512=require("./512");utils.inherits(SHA384,SHA512),module.exports=SHA384,SHA384.blockSize=1024,SHA384.outSize=384,SHA384.hmacStrength=192,SHA384.padLength=128,SHA384.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h.slice(0,12),"big"):utils.split32(this.h.slice(0,12),"big")};

},{"../utils":38,"./512":36}],36:[function(require,module,exports){
"use strict";function SHA512(){if(!(this instanceof SHA512))return new SHA512;BlockHash.call(this),this.h=[1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209],this.k=sha512_K,this.W=new Array(160)}function ch64_hi(t,h,r,i,s){var _=t&r^~t&s;return _<0&&(_+=4294967296),_}function ch64_lo(t,h,r,i,s,_){var o=h&i^~h&_;return o<0&&(o+=4294967296),o}function maj64_hi(t,h,r,i,s){var _=t&r^t&s^r&s;return _<0&&(_+=4294967296),_}function maj64_lo(t,h,r,i,s,_){var o=h&i^h&_^i&_;return o<0&&(o+=4294967296),o}function s0_512_hi(t,h){var r=rotr64_hi(t,h,28)^rotr64_hi(h,t,2)^rotr64_hi(h,t,7);return r<0&&(r+=4294967296),r}function s0_512_lo(t,h){var r=rotr64_lo(t,h,28)^rotr64_lo(h,t,2)^rotr64_lo(h,t,7);return r<0&&(r+=4294967296),r}function s1_512_hi(t,h){var r=rotr64_hi(t,h,14)^rotr64_hi(t,h,18)^rotr64_hi(h,t,9);return r<0&&(r+=4294967296),r}function s1_512_lo(t,h){var r=rotr64_lo(t,h,14)^rotr64_lo(t,h,18)^rotr64_lo(h,t,9);return r<0&&(r+=4294967296),r}function g0_512_hi(t,h){var r=rotr64_hi(t,h,1)^rotr64_hi(t,h,8)^shr64_hi(t,h,7);return r<0&&(r+=4294967296),r}function g0_512_lo(t,h){var r=rotr64_lo(t,h,1)^rotr64_lo(t,h,8)^shr64_lo(t,h,7);return r<0&&(r+=4294967296),r}function g1_512_hi(t,h){var r=rotr64_hi(t,h,19)^rotr64_hi(h,t,29)^shr64_hi(t,h,6);return r<0&&(r+=4294967296),r}function g1_512_lo(t,h){var r=rotr64_lo(t,h,19)^rotr64_lo(h,t,29)^shr64_lo(t,h,6);return r<0&&(r+=4294967296),r}var utils=require("../utils"),common=require("../common"),assert=require("minimalistic-assert"),rotr64_hi=utils.rotr64_hi,rotr64_lo=utils.rotr64_lo,shr64_hi=utils.shr64_hi,shr64_lo=utils.shr64_lo,sum64=utils.sum64,sum64_hi=utils.sum64_hi,sum64_lo=utils.sum64_lo,sum64_4_hi=utils.sum64_4_hi,sum64_4_lo=utils.sum64_4_lo,sum64_5_hi=utils.sum64_5_hi,sum64_5_lo=utils.sum64_5_lo,BlockHash=common.BlockHash,sha512_K=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];utils.inherits(SHA512,BlockHash),module.exports=SHA512,SHA512.blockSize=1024,SHA512.outSize=512,SHA512.hmacStrength=192,SHA512.padLength=128,SHA512.prototype._prepareBlock=function(t,h){for(var r=this.W,i=0;i<32;i++)r[i]=t[h+i];for(;i<r.length;i+=2){var s=g1_512_hi(r[i-4],r[i-3]),_=g1_512_lo(r[i-4],r[i-3]),o=r[i-14],u=r[i-13],l=g0_512_hi(r[i-30],r[i-29]),n=g0_512_lo(r[i-30],r[i-29]),e=r[i-32],m=r[i-31];r[i]=sum64_4_hi(s,_,o,u,l,n,e,m),r[i+1]=sum64_4_lo(s,_,o,u,l,n,e,m)}},SHA512.prototype._update=function(t,h){this._prepareBlock(t,h);var r=this.W,i=this.h[0],s=this.h[1],_=this.h[2],o=this.h[3],u=this.h[4],l=this.h[5],n=this.h[6],e=this.h[7],m=this.h[8],a=this.h[9],c=this.h[10],f=this.h[11],v=this.h[12],g=this.h[13],H=this.h[14],S=this.h[15];assert(this.k.length===r.length);for(var p=0;p<r.length;p+=2){var A=H,k=S,B=s1_512_hi(m,a),d=s1_512_lo(m,a),j=ch64_hi(m,a,c,f,v,g),y=ch64_lo(m,a,c,f,v,g),b=this.k[p],q=this.k[p+1],x=r[p],W=r[p+1],w=sum64_5_hi(A,k,B,d,j,y,b,q,x,W),z=sum64_5_lo(A,k,B,d,j,y,b,q,x,W);A=s0_512_hi(i,s),k=s0_512_lo(i,s),B=maj64_hi(i,s,_,o,u,l),d=maj64_lo(i,s,_,o,u,l);var K=sum64_hi(A,k,B,d),L=sum64_lo(A,k,B,d);H=v,S=g,v=c,g=f,c=m,f=a,m=sum64_hi(n,e,w,z),a=sum64_lo(e,e,w,z),n=u,e=l,u=_,l=o,_=i,o=s,i=sum64_hi(w,z,K,L),s=sum64_lo(w,z,K,L)}sum64(this.h,0,i,s),sum64(this.h,2,_,o),sum64(this.h,4,u,l),sum64(this.h,6,n,e),sum64(this.h,8,m,a),sum64(this.h,10,c,f),sum64(this.h,12,v,g),sum64(this.h,14,H,S)},SHA512.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h,"big"):utils.split32(this.h,"big")};

},{"../common":28,"../utils":38,"minimalistic-assert":48}],37:[function(require,module,exports){
"use strict";function ft_1(r,t,o,n){return 0===r?ch32(t,o,n):1===r||3===r?p32(t,o,n):2===r?maj32(t,o,n):void 0}function ch32(r,t,o){return r&t^~r&o}function maj32(r,t,o){return r&t^r&o^t&o}function p32(r,t,o){return r^t^o}function s0_256(r){return rotr32(r,2)^rotr32(r,13)^rotr32(r,22)}function s1_256(r){return rotr32(r,6)^rotr32(r,11)^rotr32(r,25)}function g0_256(r){return rotr32(r,7)^rotr32(r,18)^r>>>3}function g1_256(r){return rotr32(r,17)^rotr32(r,19)^r>>>10}var utils=require("../utils"),rotr32=utils.rotr32;exports.ft_1=ft_1,exports.ch32=ch32,exports.maj32=maj32,exports.p32=p32,exports.s0_256=s0_256,exports.s1_256=s1_256,exports.g0_256=g0_256,exports.g1_256=g1_256;

},{"../utils":38}],38:[function(require,module,exports){
"use strict";function toArray(r,t){if(Array.isArray(r))return r.slice();if(!r)return[];var o=[];if("string"==typeof r)if(t){if("hex"===t)for((r=r.replace(/[^a-z0-9]+/gi,"")).length%2!=0&&(r="0"+r),n=0;n<r.length;n+=2)o.push(parseInt(r[n]+r[n+1],16))}else for(var n=0;n<r.length;n++){var e=r.charCodeAt(n),s=e>>8,u=255&e;s?o.push(s,u):o.push(u)}else for(n=0;n<r.length;n++)o[n]=0|r[n];return o}function toHex(r){for(var t="",o=0;o<r.length;o++)t+=zero2(r[o].toString(16));return t}function htonl(r){return(r>>>24|r>>>8&65280|r<<8&16711680|(255&r)<<24)>>>0}function toHex32(r,t){for(var o="",n=0;n<r.length;n++){var e=r[n];"little"===t&&(e=htonl(e)),o+=zero8(e.toString(16))}return o}function zero2(r){return 1===r.length?"0"+r:r}function zero8(r){return 7===r.length?"0"+r:6===r.length?"00"+r:5===r.length?"000"+r:4===r.length?"0000"+r:3===r.length?"00000"+r:2===r.length?"000000"+r:1===r.length?"0000000"+r:r}function join32(r,t,o,n){var e=o-t;assert(e%4==0);for(var s=new Array(e/4),u=0,i=t;u<s.length;u++,i+=4){var h;h="big"===n?r[i]<<24|r[i+1]<<16|r[i+2]<<8|r[i+3]:r[i+3]<<24|r[i+2]<<16|r[i+1]<<8|r[i],s[u]=h>>>0}return s}function split32(r,t){for(var o=new Array(4*r.length),n=0,e=0;n<r.length;n++,e+=4){var s=r[n];"big"===t?(o[e]=s>>>24,o[e+1]=s>>>16&255,o[e+2]=s>>>8&255,o[e+3]=255&s):(o[e+3]=s>>>24,o[e+2]=s>>>16&255,o[e+1]=s>>>8&255,o[e]=255&s)}return o}function rotr32(r,t){return r>>>t|r<<32-t}function rotl32(r,t){return r<<t|r>>>32-t}function sum32(r,t){return r+t>>>0}function sum32_3(r,t,o){return r+t+o>>>0}function sum32_4(r,t,o,n){return r+t+o+n>>>0}function sum32_5(r,t,o,n,e){return r+t+o+n+e>>>0}function sum64(r,t,o,n){var e=r[t],s=n+r[t+1]>>>0,u=(s<n?1:0)+o+e;r[t]=u>>>0,r[t+1]=s}function sum64_hi(r,t,o,n){return(t+n>>>0<t?1:0)+r+o>>>0}function sum64_lo(r,t,o,n){return t+n>>>0}function sum64_4_hi(r,t,o,n,e,s,u,i){var h=0,_=t;h+=(_=_+n>>>0)<t?1:0,h+=(_=_+s>>>0)<s?1:0;return r+o+e+u+(h+=(_=_+i>>>0)<i?1:0)>>>0}function sum64_4_lo(r,t,o,n,e,s,u,i){return t+n+s+i>>>0}function sum64_5_hi(r,t,o,n,e,s,u,i,h,_){var l=0,f=t;l+=(f=f+n>>>0)<t?1:0,l+=(f=f+s>>>0)<s?1:0,l+=(f=f+i>>>0)<i?1:0;return r+o+e+u+h+(l+=(f=f+_>>>0)<_?1:0)>>>0}function sum64_5_lo(r,t,o,n,e,s,u,i,h,_){return t+n+s+i+_>>>0}function rotr64_hi(r,t,o){return(t<<32-o|r>>>o)>>>0}function rotr64_lo(r,t,o){return(r<<32-o|t>>>o)>>>0}function shr64_hi(r,t,o){return r>>>o}function shr64_lo(r,t,o){return(r<<32-o|t>>>o)>>>0}var assert=require("minimalistic-assert"),inherits=require("inherits");exports.inherits=inherits,exports.toArray=toArray,exports.toHex=toHex,exports.htonl=htonl,exports.toHex32=toHex32,exports.zero2=zero2,exports.zero8=zero8,exports.join32=join32,exports.split32=split32,exports.rotr32=rotr32,exports.rotl32=rotl32,exports.sum32=sum32,exports.sum32_3=sum32_3,exports.sum32_4=sum32_4,exports.sum32_5=sum32_5,exports.sum64=sum64,exports.sum64_hi=sum64_hi,exports.sum64_lo=sum64_lo,exports.sum64_4_hi=sum64_4_hi,exports.sum64_4_lo=sum64_4_lo,exports.sum64_5_hi=sum64_5_hi,exports.sum64_5_lo=sum64_5_lo,exports.rotr64_hi=rotr64_hi,exports.rotr64_lo=rotr64_lo,exports.shr64_hi=shr64_hi,exports.shr64_lo=shr64_lo;

},{"inherits":40,"minimalistic-assert":48}],39:[function(require,module,exports){
"use strict";function HmacDRBG(t){if(!(this instanceof HmacDRBG))return new HmacDRBG(t);this.hash=t.hash,this.predResist=!!t.predResist,this.outLen=this.hash.outSize,this.minEntropy=t.minEntropy||this.hash.hmacStrength,this._reseed=null,this.reseedInterval=null,this.K=null,this.V=null;var e=utils.toArray(t.entropy,t.entropyEnc||"hex"),i=utils.toArray(t.nonce,t.nonceEnc||"hex"),s=utils.toArray(t.pers,t.persEnc||"hex");assert(e.length>=this.minEntropy/8,"Not enough entropy. Minimum is: "+this.minEntropy+" bits"),this._init(e,i,s)}var hash=require("hash.js"),utils=require("minimalistic-crypto-utils"),assert=require("minimalistic-assert");module.exports=HmacDRBG,HmacDRBG.prototype._init=function(t,e,i){var s=t.concat(e).concat(i);this.K=new Array(this.outLen/8),this.V=new Array(this.outLen/8);for(var h=0;h<this.V.length;h++)this.K[h]=0,this.V[h]=1;this._update(s),this._reseed=1,this.reseedInterval=281474976710656},HmacDRBG.prototype._hmac=function(){return new hash.hmac(this.hash,this.K)},HmacDRBG.prototype._update=function(t){var e=this._hmac().update(this.V).update([0]);t&&(e=e.update(t)),this.K=e.digest(),this.V=this._hmac().update(this.V).digest(),t&&(this.K=this._hmac().update(this.V).update([1]).update(t).digest(),this.V=this._hmac().update(this.V).digest())},HmacDRBG.prototype.reseed=function(t,e,i,s){"string"!=typeof e&&(s=i,i=e,e=null),t=utils.toArray(t,e),i=utils.toArray(i,s),assert(t.length>=this.minEntropy/8,"Not enough entropy. Minimum is: "+this.minEntropy+" bits"),this._update(t.concat(i||[])),this._reseed=1},HmacDRBG.prototype.generate=function(t,e,i,s){if(this._reseed>this.reseedInterval)throw new Error("Reseed is required");"string"!=typeof e&&(s=i,i=e,e=null),i&&(i=utils.toArray(i,s||"hex"),this._update(i));for(var h=[];h.length<t;)this.V=this._hmac().update(this.V).digest(),h=h.concat(this.V);var r=h.slice(0,t);return this._update(i),this._reseed++,utils.encode(r,e)};

},{"hash.js":27,"minimalistic-assert":48,"minimalistic-crypto-utils":49}],40:[function(require,module,exports){
"function"==typeof Object.create?module.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:module.exports=function(t,e){t.super_=e;var o=function(){};o.prototype=e.prototype,t.prototype=new o,t.prototype.constructor=t};

},{}],41:[function(require,module,exports){
module.exports=function(e){if("string"!=typeof e)throw new Error("[is-hex-prefixed] value must be type 'string', is currently type "+typeof e+", while checking isHexPrefixed.");return"0x"===e.slice(0,2)};

},{}],42:[function(require,module,exports){
"use strict";module.exports=require("./lib/api")(require("./lib/keccak"));

},{"./lib/api":43,"./lib/keccak":47}],43:[function(require,module,exports){
"use strict";var createKeccak=require("./keccak"),createShake=require("./shake");module.exports=function(e){var r=createKeccak(e),a=createShake(e);return function(e,c){switch("string"==typeof e?e.toLowerCase():e){case"keccak224":return new r(1152,448,null,224,c);case"keccak256":return new r(1088,512,null,256,c);case"keccak384":return new r(832,768,null,384,c);case"keccak512":return new r(576,1024,null,512,c);case"sha3-224":return new r(1152,448,6,224,c);case"sha3-256":return new r(1088,512,6,256,c);case"sha3-384":return new r(832,768,6,384,c);case"sha3-512":return new r(576,1024,6,512,c);case"shake128":return new a(1344,256,31,c);case"shake256":return new a(1088,512,31,c);default:throw new Error("Invald algorithm: "+e)}}};

},{"./keccak":44,"./shake":45}],44:[function(require,module,exports){
"use strict";var Buffer=require("safe-buffer").Buffer,Transform=require("stream").Transform,inherits=require("inherits");module.exports=function(t){function i(i,e,r,s,a){Transform.call(this,a),this._rate=i,this._capacity=e,this._delimitedSuffix=r,this._hashBitLength=s,this._options=a,this._state=new t,this._state.initialize(i,e),this._finalized=!1}return inherits(i,Transform),i.prototype._transform=function(t,i,e){var r=null;try{this.update(t,i)}catch(t){r=t}e(r)},i.prototype._flush=function(t){var i=null;try{this.push(this.digest())}catch(t){i=t}t(i)},i.prototype.update=function(t,i){if(!Buffer.isBuffer(t)&&"string"!=typeof t)throw new TypeError("Data must be a string or a buffer");if(this._finalized)throw new Error("Digest already called");return Buffer.isBuffer(t)||(t=Buffer.from(t,i)),this._state.absorb(t),this},i.prototype.digest=function(t){if(this._finalized)throw new Error("Digest already called");this._finalized=!0,this._delimitedSuffix&&this._state.absorbLastFewBits(this._delimitedSuffix);var i=this._state.squeeze(this._hashBitLength/8);return void 0!==t&&(i=i.toString(t)),this._resetState(),i},i.prototype._resetState=function(){return this._state.initialize(this._rate,this._capacity),this},i.prototype._clone=function(){var t=new i(this._rate,this._capacity,this._delimitedSuffix,this._hashBitLength,this._options);return this._state.copy(t._state),t._finalized=this._finalized,t},i};

module.exports = function (KeccakState) {
  function Keccak (rate, capacity, delimitedSuffix, hashBitLength, options) {
    Transform.call(this, options)

    this._rate = rate
    this._capacity = capacity
    this._delimitedSuffix = delimitedSuffix
    this._hashBitLength = hashBitLength
    this._options = options

    this._state = new KeccakState()
    this._state.initialize(rate, capacity)
    this._finalized = false
  }

  inherits(Keccak, Transform)

  Keccak.prototype._transform = function (chunk, encoding, callback) {
    var error = null
    try {
      this.update(chunk, encoding)
    } catch (err) {
      error = err
    }

    callback(error)
  }

  Keccak.prototype._flush = function (callback) {
    var error = null
    try {
      this.push(this.digest())
    } catch (err) {
      error = err
    }

    callback(error)
  }

  Keccak.prototype.update = function (data, encoding) {
    if (!Buffer.isBuffer(data) && typeof data !== 'string') throw new TypeError('Data must be a string or a buffer')
    if (this._finalized) throw new Error('Digest already called')
    if (!Buffer.isBuffer(data)) data = Buffer.from(data, encoding)

    this._state.absorb(data)

    return this
  }

  Keccak.prototype.digest = function (encoding) {
    if (this._finalized) throw new Error('Digest already called')
    this._finalized = true

    if (this._delimitedSuffix) this._state.absorbLastFewBits(this._delimitedSuffix)
    var digest = this._state.squeeze(this._hashBitLength / 8)
    if (encoding !== undefined) digest = digest.toString(encoding)

    this._resetState()

    return digest
  }

  // remove result from memory
  Keccak.prototype._resetState = function () {
    this._state.initialize(this._rate, this._capacity)
    return this
  }

  // because sometimes we need hash right now and little later
  Keccak.prototype._clone = function () {
    var clone = new Keccak(this._rate, this._capacity, this._delimitedSuffix, this._hashBitLength, this._options)
    this._state.copy(clone._state)
    clone._finalized = this._finalized

    return clone
  }

  return Keccak
}

},{"inherits":40,"safe-buffer":52,"stream":224}],45:[function(require,module,exports){
'use strict'
var Buffer = require('safe-buffer').Buffer
var Transform = require('stream').Transform
var inherits = require('inherits')

module.exports = function (KeccakState) {
  function Shake (rate, capacity, delimitedSuffix, options) {
    Transform.call(this, options)

    this._rate = rate
    this._capacity = capacity
    this._delimitedSuffix = delimitedSuffix
    this._options = options

    this._state = new KeccakState()
    this._state.initialize(rate, capacity)
    this._finalized = false
  }

  inherits(Shake, Transform)

  Shake.prototype._transform = function (chunk, encoding, callback) {
    var error = null
    try {
      this.update(chunk, encoding)
    } catch (err) {
      error = err
    }

    callback(error)
  }

  Shake.prototype._flush = function () {}

  Shake.prototype._read = function (size) {
    this.push(this.squeeze(size))
  }

  Shake.prototype.update = function (data, encoding) {
    if (!Buffer.isBuffer(data) && typeof data !== 'string') throw new TypeError('Data must be a string or a buffer')
    if (this._finalized) throw new Error('Squeeze already called')
    if (!Buffer.isBuffer(data)) data = Buffer.from(data, encoding)

    this._state.absorb(data)

    return this
  }

  Shake.prototype.squeeze = function (dataByteLength, encoding) {
    if (!this._finalized) {
      this._finalized = true
      this._state.absorbLastFewBits(this._delimitedSuffix)
    }

    var data = this._state.squeeze(dataByteLength)
    if (encoding !== undefined) data = data.toString(encoding)

    return data
  }

  Shake.prototype._resetState = function () {
    this._state.initialize(this._rate, this._capacity)
    return this
  }

  Shake.prototype._clone = function () {
    var clone = new Shake(this._rate, this._capacity, this._delimitedSuffix, this._options)
    this._state.copy(clone._state)
    clone._finalized = this._finalized

    return clone
  }

  return Shake
}

},{"inherits":40,"safe-buffer":52,"stream":224}],46:[function(require,module,exports){
'use strict'
var P1600_ROUND_CONSTANTS = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648]

},{}],47:[function(require,module,exports){
"use strict";function Keccak(){this.state=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],this.blockSize=null,this.count=0,this.squeezing=!1}var Buffer=require("safe-buffer").Buffer,keccakState=require("./keccak-state-unroll");Keccak.prototype.initialize=function(t,e){for(var s=0;s<50;++s)this.state[s]=0;this.blockSize=t/8,this.count=0,this.squeezing=!1},Keccak.prototype.absorb=function(t){for(var e=0;e<t.length;++e)this.state[~~(this.count/4)]^=t[e]<<this.count%4*8,this.count+=1,this.count===this.blockSize&&(keccakState.p1600(this.state),this.count=0)},Keccak.prototype.absorbLastFewBits=function(t){this.state[~~(this.count/4)]^=t<<this.count%4*8,0!=(128&t)&&this.count===this.blockSize-1&&keccakState.p1600(this.state),this.state[~~((this.blockSize-1)/4)]^=128<<(this.blockSize-1)%4*8,keccakState.p1600(this.state),this.count=0,this.squeezing=!0},Keccak.prototype.squeeze=function(t){this.squeezing||this.absorbLastFewBits(1);for(var e=Buffer.alloc(t),s=0;s<t;++s)e[s]=this.state[~~(this.count/4)]>>>this.count%4*8&255,this.count+=1,this.count===this.blockSize&&(keccakState.p1600(this.state),this.count=0);return e},Keccak.prototype.copy=function(t){for(var e=0;e<50;++e)t.state[e]=this.state[e];t.blockSize=this.blockSize,t.count=this.count,t.squeezing=this.squeezing},module.exports=Keccak;

},{"./keccak-state-unroll":46,"safe-buffer":52}],48:[function(require,module,exports){
function assert(r,e){if(!r)throw new Error(e||"Assertion failed")}module.exports=assert,assert.equal=function(r,e,s){if(r!=e)throw new Error(s||"Assertion failed: "+r+" != "+e)};

},{}],49:[function(require,module,exports){
"use strict";function toArray(r,t){if(Array.isArray(r))return r.slice();if(!r)return[];var e=[];if("string"!=typeof r){for(n=0;n<r.length;n++)e[n]=0|r[n];return e}if("hex"===t){(r=r.replace(/[^a-z0-9]+/gi,"")).length%2!=0&&(r="0"+r);for(n=0;n<r.length;n+=2)e.push(parseInt(r[n]+r[n+1],16))}else for(var n=0;n<r.length;n++){var o=r.charCodeAt(n),u=o>>8,i=255&o;u?e.push(u,i):e.push(i)}return e}function zero2(r){return 1===r.length?"0"+r:r}function toHex(r){for(var t="",e=0;e<r.length;e++)t+=zero2(r[e].toString(16));return t}var utils=exports;utils.toArray=toArray,utils.zero2=zero2,utils.toHex=toHex,utils.encode=function(r,t){return"hex"===t?toHex(r):r};

},{}],50:[function(require,module,exports){
(function (Buffer){
"use strict";function RIPEMD160(){HashBase.call(this,64),this._a=1732584193,this._b=4023233417,this._c=2562383102,this._d=271733878,this._e=3285377520}function rotl(t,r){return t<<r|t>>>32-r}function fn1(t,r,n,o,f,l,i,s){return rotl(t+(r^n^o)+l+i|0,s)+f|0}function fn2(t,r,n,o,f,l,i,s){return rotl(t+(r&n|~r&o)+l+i|0,s)+f|0}function fn3(t,r,n,o,f,l,i,s){return rotl(t+((r|~n)^o)+l+i|0,s)+f|0}function fn4(t,r,n,o,f,l,i,s){return rotl(t+(r&o|n&~o)+l+i|0,s)+f|0}function fn5(t,r,n,o,f,l,i,s){return rotl(t+(r^(n|~o))+l+i|0,s)+f|0}var inherits=require("inherits"),HashBase=require("hash-base");inherits(RIPEMD160,HashBase),RIPEMD160.prototype._update=function(){for(var t=new Array(16),r=0;r<16;++r)t[r]=this._block.readInt32LE(4*r);var n=this._a,o=this._b,f=this._c,l=this._d,i=this._e;i=fn1(i,n=fn1(n,o,f,l,i,t[0],0,11),o,f=rotl(f,10),l,t[1],0,14),o=fn1(o=rotl(o,10),f=fn1(f,l=fn1(l,i,n,o,f,t[2],0,15),i,n=rotl(n,10),o,t[3],0,12),l,i=rotl(i,10),n,t[4],0,5),l=fn1(l=rotl(l,10),i=fn1(i,n=fn1(n,o,f,l,i,t[5],0,8),o,f=rotl(f,10),l,t[6],0,7),n,o=rotl(o,10),f,t[7],0,9),n=fn1(n=rotl(n,10),o=fn1(o,f=fn1(f,l,i,n,o,t[8],0,11),l,i=rotl(i,10),n,t[9],0,13),f,l=rotl(l,10),i,t[10],0,14),f=fn1(f=rotl(f,10),l=fn1(l,i=fn1(i,n,o,f,l,t[11],0,15),n,o=rotl(o,10),f,t[12],0,6),i,n=rotl(n,10),o,t[13],0,7),i=fn2(i=rotl(i,10),n=fn1(n,o=fn1(o,f,l,i,n,t[14],0,9),f,l=rotl(l,10),i,t[15],0,8),o,f=rotl(f,10),l,t[7],1518500249,7),o=fn2(o=rotl(o,10),f=fn2(f,l=fn2(l,i,n,o,f,t[4],1518500249,6),i,n=rotl(n,10),o,t[13],1518500249,8),l,i=rotl(i,10),n,t[1],1518500249,13),l=fn2(l=rotl(l,10),i=fn2(i,n=fn2(n,o,f,l,i,t[10],1518500249,11),o,f=rotl(f,10),l,t[6],1518500249,9),n,o=rotl(o,10),f,t[15],1518500249,7),n=fn2(n=rotl(n,10),o=fn2(o,f=fn2(f,l,i,n,o,t[3],1518500249,15),l,i=rotl(i,10),n,t[12],1518500249,7),f,l=rotl(l,10),i,t[0],1518500249,12),f=fn2(f=rotl(f,10),l=fn2(l,i=fn2(i,n,o,f,l,t[9],1518500249,15),n,o=rotl(o,10),f,t[5],1518500249,9),i,n=rotl(n,10),o,t[2],1518500249,11),i=fn2(i=rotl(i,10),n=fn2(n,o=fn2(o,f,l,i,n,t[14],1518500249,7),f,l=rotl(l,10),i,t[11],1518500249,13),o,f=rotl(f,10),l,t[8],1518500249,12),o=fn3(o=rotl(o,10),f=fn3(f,l=fn3(l,i,n,o,f,t[3],1859775393,11),i,n=rotl(n,10),o,t[10],1859775393,13),l,i=rotl(i,10),n,t[14],1859775393,6),l=fn3(l=rotl(l,10),i=fn3(i,n=fn3(n,o,f,l,i,t[4],1859775393,7),o,f=rotl(f,10),l,t[9],1859775393,14),n,o=rotl(o,10),f,t[15],1859775393,9),n=fn3(n=rotl(n,10),o=fn3(o,f=fn3(f,l,i,n,o,t[8],1859775393,13),l,i=rotl(i,10),n,t[1],1859775393,15),f,l=rotl(l,10),i,t[2],1859775393,14),f=fn3(f=rotl(f,10),l=fn3(l,i=fn3(i,n,o,f,l,t[7],1859775393,8),n,o=rotl(o,10),f,t[0],1859775393,13),i,n=rotl(n,10),o,t[6],1859775393,6),i=fn3(i=rotl(i,10),n=fn3(n,o=fn3(o,f,l,i,n,t[13],1859775393,5),f,l=rotl(l,10),i,t[11],1859775393,12),o,f=rotl(f,10),l,t[5],1859775393,7),o=fn4(o=rotl(o,10),f=fn4(f,l=fn3(l,i,n,o,f,t[12],1859775393,5),i,n=rotl(n,10),o,t[1],2400959708,11),l,i=rotl(i,10),n,t[9],2400959708,12),l=fn4(l=rotl(l,10),i=fn4(i,n=fn4(n,o,f,l,i,t[11],2400959708,14),o,f=rotl(f,10),l,t[10],2400959708,15),n,o=rotl(o,10),f,t[0],2400959708,14),n=fn4(n=rotl(n,10),o=fn4(o,f=fn4(f,l,i,n,o,t[8],2400959708,15),l,i=rotl(i,10),n,t[12],2400959708,9),f,l=rotl(l,10),i,t[4],2400959708,8),f=fn4(f=rotl(f,10),l=fn4(l,i=fn4(i,n,o,f,l,t[13],2400959708,9),n,o=rotl(o,10),f,t[3],2400959708,14),i,n=rotl(n,10),o,t[7],2400959708,5),i=fn4(i=rotl(i,10),n=fn4(n,o=fn4(o,f,l,i,n,t[15],2400959708,6),f,l=rotl(l,10),i,t[14],2400959708,8),o,f=rotl(f,10),l,t[5],2400959708,6),o=fn5(o=rotl(o,10),f=fn4(f,l=fn4(l,i,n,o,f,t[6],2400959708,5),i,n=rotl(n,10),o,t[2],2400959708,12),l,i=rotl(i,10),n,t[4],2840853838,9),l=fn5(l=rotl(l,10),i=fn5(i,n=fn5(n,o,f,l,i,t[0],2840853838,15),o,f=rotl(f,10),l,t[5],2840853838,5),n,o=rotl(o,10),f,t[9],2840853838,11),n=fn5(n=rotl(n,10),o=fn5(o,f=fn5(f,l,i,n,o,t[7],2840853838,6),l,i=rotl(i,10),n,t[12],2840853838,8),f,l=rotl(l,10),i,t[2],2840853838,13),f=fn5(f=rotl(f,10),l=fn5(l,i=fn5(i,n,o,f,l,t[10],2840853838,12),n,o=rotl(o,10),f,t[14],2840853838,5),i,n=rotl(n,10),o,t[1],2840853838,12),i=fn5(i=rotl(i,10),n=fn5(n,o=fn5(o,f,l,i,n,t[3],2840853838,13),f,l=rotl(l,10),i,t[8],2840853838,14),o,f=rotl(f,10),l,t[11],2840853838,11),o=fn5(o=rotl(o,10),f=fn5(f,l=fn5(l,i,n,o,f,t[6],2840853838,8),i,n=rotl(n,10),o,t[15],2840853838,5),l,i=rotl(i,10),n,t[13],2840853838,6),l=rotl(l,10);var s=this._a,h=this._b,e=this._c,_=this._d,c=this._e;c=fn5(c,s=fn5(s,h,e,_,c,t[5],1352829926,8),h,e=rotl(e,10),_,t[14],1352829926,9),h=fn5(h=rotl(h,10),e=fn5(e,_=fn5(_,c,s,h,e,t[7],1352829926,9),c,s=rotl(s,10),h,t[0],1352829926,11),_,c=rotl(c,10),s,t[9],1352829926,13),_=fn5(_=rotl(_,10),c=fn5(c,s=fn5(s,h,e,_,c,t[2],1352829926,15),h,e=rotl(e,10),_,t[11],1352829926,15),s,h=rotl(h,10),e,t[4],1352829926,5),s=fn5(s=rotl(s,10),h=fn5(h,e=fn5(e,_,c,s,h,t[13],1352829926,7),_,c=rotl(c,10),s,t[6],1352829926,7),e,_=rotl(_,10),c,t[15],1352829926,8),e=fn5(e=rotl(e,10),_=fn5(_,c=fn5(c,s,h,e,_,t[8],1352829926,11),s,h=rotl(h,10),e,t[1],1352829926,14),c,s=rotl(s,10),h,t[10],1352829926,14),c=fn4(c=rotl(c,10),s=fn5(s,h=fn5(h,e,_,c,s,t[3],1352829926,12),e,_=rotl(_,10),c,t[12],1352829926,6),h,e=rotl(e,10),_,t[6],1548603684,9),h=fn4(h=rotl(h,10),e=fn4(e,_=fn4(_,c,s,h,e,t[11],1548603684,13),c,s=rotl(s,10),h,t[3],1548603684,15),_,c=rotl(c,10),s,t[7],1548603684,7),_=fn4(_=rotl(_,10),c=fn4(c,s=fn4(s,h,e,_,c,t[0],1548603684,12),h,e=rotl(e,10),_,t[13],1548603684,8),s,h=rotl(h,10),e,t[5],1548603684,9),s=fn4(s=rotl(s,10),h=fn4(h,e=fn4(e,_,c,s,h,t[10],1548603684,11),_,c=rotl(c,10),s,t[14],1548603684,7),e,_=rotl(_,10),c,t[15],1548603684,7),e=fn4(e=rotl(e,10),_=fn4(_,c=fn4(c,s,h,e,_,t[8],1548603684,12),s,h=rotl(h,10),e,t[12],1548603684,7),c,s=rotl(s,10),h,t[4],1548603684,6),c=fn4(c=rotl(c,10),s=fn4(s,h=fn4(h,e,_,c,s,t[9],1548603684,15),e,_=rotl(_,10),c,t[1],1548603684,13),h,e=rotl(e,10),_,t[2],1548603684,11),h=fn3(h=rotl(h,10),e=fn3(e,_=fn3(_,c,s,h,e,t[15],1836072691,9),c,s=rotl(s,10),h,t[5],1836072691,7),_,c=rotl(c,10),s,t[1],1836072691,15),_=fn3(_=rotl(_,10),c=fn3(c,s=fn3(s,h,e,_,c,t[3],1836072691,11),h,e=rotl(e,10),_,t[7],1836072691,8),s,h=rotl(h,10),e,t[14],1836072691,6),s=fn3(s=rotl(s,10),h=fn3(h,e=fn3(e,_,c,s,h,t[6],1836072691,6),_,c=rotl(c,10),s,t[9],1836072691,14),e,_=rotl(_,10),c,t[11],1836072691,12),e=fn3(e=rotl(e,10),_=fn3(_,c=fn3(c,s,h,e,_,t[8],1836072691,13),s,h=rotl(h,10),e,t[12],1836072691,5),c,s=rotl(s,10),h,t[2],1836072691,14),c=fn3(c=rotl(c,10),s=fn3(s,h=fn3(h,e,_,c,s,t[10],1836072691,13),e,_=rotl(_,10),c,t[0],1836072691,13),h,e=rotl(e,10),_,t[4],1836072691,7),h=fn2(h=rotl(h,10),e=fn2(e,_=fn3(_,c,s,h,e,t[13],1836072691,5),c,s=rotl(s,10),h,t[8],2053994217,15),_,c=rotl(c,10),s,t[6],2053994217,5),_=fn2(_=rotl(_,10),c=fn2(c,s=fn2(s,h,e,_,c,t[4],2053994217,8),h,e=rotl(e,10),_,t[1],2053994217,11),s,h=rotl(h,10),e,t[3],2053994217,14),s=fn2(s=rotl(s,10),h=fn2(h,e=fn2(e,_,c,s,h,t[11],2053994217,14),_,c=rotl(c,10),s,t[15],2053994217,6),e,_=rotl(_,10),c,t[0],2053994217,14),e=fn2(e=rotl(e,10),_=fn2(_,c=fn2(c,s,h,e,_,t[5],2053994217,6),s,h=rotl(h,10),e,t[12],2053994217,9),c,s=rotl(s,10),h,t[2],2053994217,12),c=fn2(c=rotl(c,10),s=fn2(s,h=fn2(h,e,_,c,s,t[13],2053994217,9),e,_=rotl(_,10),c,t[9],2053994217,12),h,e=rotl(e,10),_,t[7],2053994217,5),h=fn1(h=rotl(h,10),e=fn2(e,_=fn2(_,c,s,h,e,t[10],2053994217,15),c,s=rotl(s,10),h,t[14],2053994217,8),_,c=rotl(c,10),s,t[12],0,8),_=fn1(_=rotl(_,10),c=fn1(c,s=fn1(s,h,e,_,c,t[15],0,5),h,e=rotl(e,10),_,t[10],0,12),s,h=rotl(h,10),e,t[4],0,9),s=fn1(s=rotl(s,10),h=fn1(h,e=fn1(e,_,c,s,h,t[1],0,12),_,c=rotl(c,10),s,t[5],0,5),e,_=rotl(_,10),c,t[8],0,14),e=fn1(e=rotl(e,10),_=fn1(_,c=fn1(c,s,h,e,_,t[7],0,6),s,h=rotl(h,10),e,t[6],0,8),c,s=rotl(s,10),h,t[2],0,13),c=fn1(c=rotl(c,10),s=fn1(s,h=fn1(h,e,_,c,s,t[13],0,6),e,_=rotl(_,10),c,t[14],0,5),h,e=rotl(e,10),_,t[0],0,15),h=fn1(h=rotl(h,10),e=fn1(e,_=fn1(_,c,s,h,e,t[3],0,13),c,s=rotl(s,10),h,t[9],0,11),_,c=rotl(c,10),s,t[11],0,11),_=rotl(_,10);var a=this._b+f+_|0;this._b=this._c+l+c|0,this._c=this._d+i+s|0,this._d=this._e+n+h|0,this._e=this._a+o+e|0,this._a=a},RIPEMD160.prototype._digest=function(){this._block[this._blockOffset++]=128,this._blockOffset>56&&(this._block.fill(0,this._blockOffset,64),this._update(),this._blockOffset=0),this._block.fill(0,this._blockOffset,56),this._block.writeUInt32LE(this._length[0],56),this._block.writeUInt32LE(this._length[1],60),this._update();var t=new Buffer(20);return t.writeInt32LE(this._a,0),t.writeInt32LE(this._b,4),t.writeInt32LE(this._c,8),t.writeInt32LE(this._d,12),t.writeInt32LE(this._e,16),t},module.exports=RIPEMD160;

}).call(this,require("buffer").Buffer)
},{"buffer":120,"hash-base":26,"inherits":40}],51:[function(require,module,exports){
(function (Buffer){
function safeParseInt(e,r){if("00"===e.slice(0,2))throw new Error("invalid RLP: extra zeros");return parseInt(e,r)}function encodeLength(e,r){if(e<56)return new Buffer([e+r]);var n=intToHex(e),t=intToHex(r+55+n.length/2);return new Buffer(t+n,"hex")}function _decode(e){var r,n,t,i,f,a=[],o=e[0];if(o<=127)return{data:e.slice(0,1),remainder:e.slice(1)};if(o<=183){if(r=o-127,t=128===o?new Buffer([]):e.slice(1,r),2===r&&t[0]<128)throw new Error("invalid rlp encoding: byte must be less 0x80");return{data:t,remainder:e.slice(r)}}if(o<=191){if(n=o-182,r=safeParseInt(e.slice(1,n).toString("hex"),16),(t=e.slice(n,r+n)).length<r)throw new Error("invalid RLP");return{data:t,remainder:e.slice(r+n)}}if(o<=247){for(r=o-191,i=e.slice(1,r);i.length;)f=_decode(i),a.push(f.data),i=f.remainder;return{data:a,remainder:e.slice(r)}}var u=(n=o-246)+(r=safeParseInt(e.slice(1,n).toString("hex"),16));if(u>e.length)throw new Error("invalid rlp: total length is larger than the data");if(0===(i=e.slice(n,u)).length)throw new Error("invalid rlp, List has a invalid length");for(;i.length;)f=_decode(i),a.push(f.data),i=f.remainder;return{data:a,remainder:e.slice(u)}}function isHexPrefixed(e){return"0x"===e.slice(0,2)}function stripHexPrefix(e){return"string"!=typeof e?e:isHexPrefixed(e)?e.slice(2):e}function intToHex(e){var r=e.toString(16);return r.length%2&&(r="0"+r),r}function padToEven(e){return e.length%2&&(e="0"+e),e}function intToBuffer(e){var r=intToHex(e);return new Buffer(r,"hex")}function toBuffer(e){if(!Buffer.isBuffer(e))if("string"==typeof e)e=isHexPrefixed(e)?new Buffer(padToEven(stripHexPrefix(e)),"hex"):new Buffer(e);else if("number"==typeof e)e=e?intToBuffer(e):new Buffer([]);else if(null===e||void 0===e)e=new Buffer([]);else{if(!e.toArray)throw new Error("invalid type");e=new Buffer(e.toArray())}return e}const assert=require("assert");exports.encode=function(e){if(e instanceof Array){for(var r=[],n=0;n<e.length;n++)r.push(exports.encode(e[n]));var t=Buffer.concat(r);return Buffer.concat([encodeLength(t.length,192),t])}return 1===(e=toBuffer(e)).length&&e[0]<128?e:Buffer.concat([encodeLength(e.length,128),e])},exports.decode=function(e,r){if(!e||0===e.length)return new Buffer([]);var n=_decode(e=toBuffer(e));return r?n:(assert.equal(n.remainder.length,0,"invalid remainder"),n.data)},exports.getLength=function(e){if(!e||0===e.length)return new Buffer([]);var r=(e=toBuffer(e))[0];if(r<=127)return e.length;if(r<=183)return r-127;if(r<=191)return r-182;if(r<=247)return r-191;var n=r-246;return n+safeParseInt(e.slice(1,n).toString("hex"),16)};

}).call(this,require("buffer").Buffer)
},{"assert":87,"buffer":120}],52:[function(require,module,exports){
function copyProps(f,r){for(var e in f)r[e]=f[e]}function SafeBuffer(f,r,e){return Buffer(f,r,e)}var buffer=require("buffer"),Buffer=buffer.Buffer;Buffer.from&&Buffer.alloc&&Buffer.allocUnsafe&&Buffer.allocUnsafeSlow?module.exports=buffer:(copyProps(buffer,exports),exports.Buffer=SafeBuffer),copyProps(Buffer,SafeBuffer),SafeBuffer.from=function(f,r,e){if("number"==typeof f)throw new TypeError("Argument must not be a number");return Buffer(f,r,e)},SafeBuffer.alloc=function(f,r,e){if("number"!=typeof f)throw new TypeError("Argument must be a number");var u=Buffer(f);return void 0!==r?"string"==typeof e?u.fill(r,e):u.fill(r):u.fill(0),u},SafeBuffer.allocUnsafe=function(f){if("number"!=typeof f)throw new TypeError("Argument must be a number");return Buffer(f)},SafeBuffer.allocUnsafeSlow=function(f){if("number"!=typeof f)throw new TypeError("Argument must be a number");return buffer.SlowBuffer(f)};

},{"buffer":120}],53:[function(require,module,exports){
(function (Buffer){
function scrypt(r,o,f,a,e,t,n){function c(r,o,f,a){var e;for(arraycopy(r,o+64*(2*a-1),A,0,64),e=0;e<2*a;e++)p(r,64*e,A,0,64),function(r){var o;for(o=0;o<16;o++)v[o]=(255&r[4*o+0])<<0,v[o]|=(255&r[4*o+1])<<8,v[o]|=(255&r[4*o+2])<<16,v[o]|=(255&r[4*o+3])<<24;for(arraycopy(v,0,w,0,16),o=8;o>0;o-=2)w[4]^=y(w[0]+w[12],7),w[8]^=y(w[4]+w[0],9),w[12]^=y(w[8]+w[4],13),w[0]^=y(w[12]+w[8],18),w[9]^=y(w[5]+w[1],7),w[13]^=y(w[9]+w[5],9),w[1]^=y(w[13]+w[9],13),w[5]^=y(w[1]+w[13],18),w[14]^=y(w[10]+w[6],7),w[2]^=y(w[14]+w[10],9),w[6]^=y(w[2]+w[14],13),w[10]^=y(w[6]+w[2],18),w[3]^=y(w[15]+w[11],7),w[7]^=y(w[3]+w[15],9),w[11]^=y(w[7]+w[3],13),w[15]^=y(w[11]+w[7],18),w[1]^=y(w[0]+w[3],7),w[2]^=y(w[1]+w[0],9),w[3]^=y(w[2]+w[1],13),w[0]^=y(w[3]+w[2],18),w[6]^=y(w[5]+w[4],7),w[7]^=y(w[6]+w[5],9),w[4]^=y(w[7]+w[6],13),w[5]^=y(w[4]+w[7],18),w[11]^=y(w[10]+w[9],7),w[8]^=y(w[11]+w[10],9),w[9]^=y(w[8]+w[11],13),w[10]^=y(w[9]+w[8],18),w[12]^=y(w[15]+w[14],7),w[13]^=y(w[12]+w[15],9),w[14]^=y(w[13]+w[12],13),w[15]^=y(w[14]+w[13],18);for(o=0;o<16;++o)v[o]=w[o]+v[o];for(o=0;o<16;o++){var f=4*o;r[f+0]=v[o]>>0&255,r[f+1]=v[o]>>8&255,r[f+2]=v[o]>>16&255,r[f+3]=v[o]>>24&255}}(A),arraycopy(A,0,r,f+64*e,64);for(e=0;e<a;e++)arraycopy(r,f+2*e*64,r,o+64*e,64);for(e=0;e<a;e++)arraycopy(r,f+64*(2*e+1),r,o+64*(e+a),64)}function y(r,o){return r<<o|r>>>32-o}function p(r,o,f,a,e){for(var t=0;t<e;t++)f[a+t]^=r[o+t]}if(0===f||0!=(f&f-1))throw Error("N must be > 0 and a power of 2");if(f>MAX_VALUE/128/a)throw Error("Parameter N is too large");if(a>MAX_VALUE/128/e)throw Error("Parameter r is too large");var u,i=new Buffer(256*a),s=new Buffer(128*a*f),v=new Int32Array(16),w=new Int32Array(16),A=new Buffer(64),B=crypto.pbkdf2Sync(r,o,1,128*e*a,"sha256");if(n){var E=e*f*2,d=0;u=function(){++d%1e3==0&&n({current:d,total:E,percent:d/E*100})}}for(var h=0;h<e;h++)!function(r,o,f,a,e,t){var n,y=128*f;for(r.copy(t,0,o,o+y),n=0;n<a;n++)t.copy(e,n*y,0,0+y),c(t,0,y,f),u&&u();for(n=0;n<a;n++){var i=0+64*(2*f-1);p(e,(t.readUInt32LE(i)&a-1)*y,t,0,y),c(t,0,y,f),u&&u()}t.copy(r,o,0,0+y)}(B,128*h*a,a,f,s,i);return crypto.pbkdf2Sync(r,B,1,t,"sha256")}function arraycopy(r,o,f,a,e){if(Buffer.isBuffer(r)&&Buffer.isBuffer(f))r.copy(f,a,o,o+e);else for(;e--;)f[a++]=r[o++]}var crypto=require("crypto"),MAX_VALUE=2147483647;module.exports=scrypt;

}).call(this,require("buffer").Buffer)
},{"buffer":120,"crypto":129}],54:[function(require,module,exports){
"use strict";module.exports=require("./lib")(require("./lib/elliptic"));

},{"./lib":58,"./lib/elliptic":57}],55:[function(require,module,exports){
(function (Buffer){
"use strict";var toString=Object.prototype.toString;exports.isArray=function(r,t){if(!Array.isArray(r))throw TypeError(t)},exports.isBoolean=function(r,t){if("[object Boolean]"!==toString.call(r))throw TypeError(t)},exports.isBuffer=function(r,t){if(!Buffer.isBuffer(r))throw TypeError(t)},exports.isFunction=function(r,t){if("[object Function]"!==toString.call(r))throw TypeError(t)},exports.isNumber=function(r,t){if("[object Number]"!==toString.call(r))throw TypeError(t)},exports.isObject=function(r,t){if("[object Object]"!==toString.call(r))throw TypeError(t)},exports.isBufferLength=function(r,t,o){if(r.length!==t)throw RangeError(o)},exports.isBufferLength2=function(r,t,o,e){if(r.length!==t&&r.length!==o)throw RangeError(e)},exports.isLengthGTZero=function(r,t){if(0===r.length)throw RangeError(t)},exports.isNumberInInterval=function(r,t,o,e){if(r<=t||r>=o)throw RangeError(e)};

// TypeError
exports.isArray = function (value, message) {
  if (!Array.isArray(value)) throw TypeError(message)
}

exports.isBoolean = function (value, message) {
  if (toString.call(value) !== '[object Boolean]') throw TypeError(message)
}

exports.isBuffer = function (value, message) {
  if (!Buffer.isBuffer(value)) throw TypeError(message)
}

exports.isFunction = function (value, message) {
  if (toString.call(value) !== '[object Function]') throw TypeError(message)
}

exports.isNumber = function (value, message) {
  if (toString.call(value) !== '[object Number]') throw TypeError(message)
}

exports.isObject = function (value, message) {
  if (toString.call(value) !== '[object Object]') throw TypeError(message)
}

// RangeError
exports.isBufferLength = function (buffer, length, message) {
  if (buffer.length !== length) throw RangeError(message)
}

exports.isBufferLength2 = function (buffer, length1, length2, message) {
  if (buffer.length !== length1 && buffer.length !== length2) throw RangeError(message)
}

exports.isLengthGTZero = function (value, message) {
  if (value.length === 0) throw RangeError(message)
}

exports.isNumberInInterval = function (number, x, y, message) {
  if (number <= x || number >= y) throw RangeError(message)
}

}).call(this,{"isBuffer":require("../../../../../../../../usr/local/lib/node_modules/browserify/node_modules/is-buffer/index.js")})
},{"../../../../../../../../usr/local/lib/node_modules/browserify/node_modules/is-buffer/index.js":175}],56:[function(require,module,exports){
'use strict'
var Buffer = require('safe-buffer').Buffer
var bip66 = require('bip66')

},{"bip66":1,"safe-buffer":52}],57:[function(require,module,exports){
"use strict";function loadCompressedPublicKey(e,r){var n=new BN(r);if(n.cmp(ecparams.p)>=0)return null;var s=(n=n.toRed(ecparams.red)).redSqr().redIMul(n).redIAdd(ecparams.b).redSqrt();return 3===e!==s.isOdd()&&(s=s.redNeg()),ec.keyPair({pub:{x:n,y:s}})}function loadUncompressedPublicKey(e,r,n){var s=new BN(r),a=new BN(n);if(s.cmp(ecparams.p)>=0||a.cmp(ecparams.p)>=0)return null;if(s=s.toRed(ecparams.red),a=a.toRed(ecparams.red),(6===e||7===e)&&a.isOdd()!==(7===e))return null;var c=s.redSqr().redIMul(s);return a.redSqr().redISub(c.redIAdd(ecparams.b)).isZero()?ec.keyPair({pub:{x:s,y:a}}):null}function loadPublicKey(e){var r=e[0];switch(r){case 2:case 3:return 33!==e.length?null:loadCompressedPublicKey(r,e.slice(1,33));case 4:case 6:case 7:return 65!==e.length?null:loadUncompressedPublicKey(r,e.slice(1,33),e.slice(33,65));default:return null}}var Buffer=require("safe-buffer").Buffer,createHash=require("create-hash"),BN=require("bn.js"),EC=require("elliptic").ec,messages=require("../messages.json"),ec=new EC("secp256k1"),ecparams=ec.curve;exports.privateKeyVerify=function(e){var r=new BN(e);return r.cmp(ecparams.n)<0&&!r.isZero()},exports.privateKeyExport=function(e,r){var n=new BN(e);if(n.cmp(ecparams.n)>=0||n.isZero())throw new Error(messages.EC_PRIVATE_KEY_EXPORT_DER_FAIL);return Buffer.from(ec.keyFromPrivate(e).getPublic(r,!0))},exports.privateKeyTweakAdd=function(e,r){var n=new BN(r);if(n.cmp(ecparams.n)>=0)throw new Error(messages.EC_PRIVATE_KEY_TWEAK_ADD_FAIL);if(n.iadd(new BN(e)),n.cmp(ecparams.n)>=0&&n.isub(ecparams.n),n.isZero())throw new Error(messages.EC_PRIVATE_KEY_TWEAK_ADD_FAIL);return n.toArrayLike(Buffer,"be",32)},exports.privateKeyTweakMul=function(e,r){var n=new BN(r);if(n.cmp(ecparams.n)>=0||n.isZero())throw new Error(messages.EC_PRIVATE_KEY_TWEAK_MUL_FAIL);return n.imul(new BN(e)),n.cmp(ecparams.n)&&(n=n.umod(ecparams.n)),n.toArrayLike(Buffer,"be",32)},exports.publicKeyCreate=function(e,r){var n=new BN(e);if(n.cmp(ecparams.n)>=0||n.isZero())throw new Error(messages.EC_PUBLIC_KEY_CREATE_FAIL);return Buffer.from(ec.keyFromPrivate(e).getPublic(r,!0))},exports.publicKeyConvert=function(e,r){var n=loadPublicKey(e);if(null===n)throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL);return Buffer.from(n.getPublic(r,!0))},exports.publicKeyVerify=function(e){return null!==loadPublicKey(e)},exports.publicKeyTweakAdd=function(e,r,n){var s=loadPublicKey(e);if(null===s)throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL);if((r=new BN(r)).cmp(ecparams.n)>=0)throw new Error(messages.EC_PUBLIC_KEY_TWEAK_ADD_FAIL);return Buffer.from(ecparams.g.mul(r).add(s.pub).encode(!0,n))},exports.publicKeyTweakMul=function(e,r,n){var s=loadPublicKey(e);if(null===s)throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL);if((r=new BN(r)).cmp(ecparams.n)>=0||r.isZero())throw new Error(messages.EC_PUBLIC_KEY_TWEAK_MUL_FAIL);return Buffer.from(s.pub.mul(r).encode(!0,n))},exports.publicKeyCombine=function(e,r){for(var n=new Array(e.length),s=0;s<e.length;++s)if(n[s]=loadPublicKey(e[s]),null===n[s])throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL);for(var a=n[0].pub,c=1;c<n.length;++c)a=a.add(n[c].pub);if(a.isInfinity())throw new Error(messages.EC_PUBLIC_KEY_COMBINE_FAIL);return Buffer.from(a.encode(!0,r))},exports.signatureNormalize=function(e){var r=new BN(e.slice(0,32)),n=new BN(e.slice(32,64));if(r.cmp(ecparams.n)>=0||n.cmp(ecparams.n)>=0)throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL);var s=Buffer.from(e);return 1===n.cmp(ec.nh)&&ecparams.n.sub(n).toArrayLike(Buffer,"be",32).copy(s,32),s},exports.signatureExport=function(e){var r=e.slice(0,32),n=e.slice(32,64);if(new BN(r).cmp(ecparams.n)>=0||new BN(n).cmp(ecparams.n)>=0)throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL);return{r:r,s:n}},exports.signatureImport=function(e){var r=new BN(e.r);r.cmp(ecparams.n)>=0&&(r=new BN(0));var n=new BN(e.s);return n.cmp(ecparams.n)>=0&&(n=new BN(0)),Buffer.concat([r.toArrayLike(Buffer,"be",32),n.toArrayLike(Buffer,"be",32)])},exports.sign=function(e,r,n,s){if("function"==typeof n){var a=n;n=function(n){var c=a(e,r,null,s,n);if(!Buffer.isBuffer(c)||32!==c.length)throw new Error(messages.ECDSA_SIGN_FAIL);return new BN(c)}}var c=new BN(r);if(c.cmp(ecparams.n)>=0||c.isZero())throw new Error(messages.ECDSA_SIGN_FAIL);var o=ec.sign(e,r,{canonical:!0,k:n,pers:s});return{signature:Buffer.concat([o.r.toArrayLike(Buffer,"be",32),o.s.toArrayLike(Buffer,"be",32)]),recovery:o.recoveryParam}},exports.verify=function(e,r,n){var s={r:r.slice(0,32),s:r.slice(32,64)},a=new BN(s.r),c=new BN(s.s);if(a.cmp(ecparams.n)>=0||c.cmp(ecparams.n)>=0)throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL);if(1===c.cmp(ec.nh)||a.isZero()||c.isZero())return!1;var o=loadPublicKey(n);if(null===o)throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL);return ec.verify(e,s,{x:o.pub.x,y:o.pub.y})},exports.recover=function(e,r,n,s){var a={r:r.slice(0,32),s:r.slice(32,64)},c=new BN(a.r),o=new BN(a.s);if(c.cmp(ecparams.n)>=0||o.cmp(ecparams.n)>=0)throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL);try{if(c.isZero()||o.isZero())throw new Error;var u=ec.recoverPubKey(e,a,n);return Buffer.from(u.encode(!0,s))}catch(e){throw new Error(messages.ECDSA_RECOVER_FAIL)}},exports.ecdh=function(e,r){var n=exports.ecdhUnsafe(e,r,!0);return createHash("sha256").update(n).digest()},exports.ecdhUnsafe=function(e,r,n){var s=loadPublicKey(e);if(null===s)throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL);var a=new BN(r);if(a.cmp(ecparams.n)>=0||a.isZero())throw new Error(messages.ECDH_FAIL);return Buffer.from(s.pub.mul(a).encode(!0,n))};

},{"../messages.json":59,"bn.js":2,"create-hash":5,"elliptic":8,"safe-buffer":52}],58:[function(require,module,exports){
"use strict";function initCompressedValue(e,s){return void 0===e?s:(assert.isBoolean(e,messages.COMPRESSED_TYPE_INVALID),e)}var assert=require("./assert"),der=require("./der"),messages=require("./messages.json");module.exports=function(e){return{privateKeyVerify:function(s){return assert.isBuffer(s,messages.EC_PRIVATE_KEY_TYPE_INVALID),32===s.length&&e.privateKeyVerify(s)},privateKeyExport:function(s,r){assert.isBuffer(s,messages.EC_PRIVATE_KEY_TYPE_INVALID),assert.isBufferLength(s,32,messages.EC_PRIVATE_KEY_LENGTH_INVALID),r=initCompressedValue(r,!0);var _=e.privateKeyExport(s,r);return der.privateKeyExport(s,_,r)},privateKeyImport:function(s){if(assert.isBuffer(s,messages.EC_PRIVATE_KEY_TYPE_INVALID),(s=der.privateKeyImport(s))&&32===s.length&&e.privateKeyVerify(s))return s;throw new Error(messages.EC_PRIVATE_KEY_IMPORT_DER_FAIL)},privateKeyTweakAdd:function(s,r){return assert.isBuffer(s,messages.EC_PRIVATE_KEY_TYPE_INVALID),assert.isBufferLength(s,32,messages.EC_PRIVATE_KEY_LENGTH_INVALID),assert.isBuffer(r,messages.TWEAK_TYPE_INVALID),assert.isBufferLength(r,32,messages.TWEAK_LENGTH_INVALID),e.privateKeyTweakAdd(s,r)},privateKeyTweakMul:function(s,r){return assert.isBuffer(s,messages.EC_PRIVATE_KEY_TYPE_INVALID),assert.isBufferLength(s,32,messages.EC_PRIVATE_KEY_LENGTH_INVALID),assert.isBuffer(r,messages.TWEAK_TYPE_INVALID),assert.isBufferLength(r,32,messages.TWEAK_LENGTH_INVALID),e.privateKeyTweakMul(s,r)},publicKeyCreate:function(s,r){return assert.isBuffer(s,messages.EC_PRIVATE_KEY_TYPE_INVALID),assert.isBufferLength(s,32,messages.EC_PRIVATE_KEY_LENGTH_INVALID),r=initCompressedValue(r,!0),e.publicKeyCreate(s,r)},publicKeyConvert:function(s,r){return assert.isBuffer(s,messages.EC_PUBLIC_KEY_TYPE_INVALID),assert.isBufferLength2(s,33,65,messages.EC_PUBLIC_KEY_LENGTH_INVALID),r=initCompressedValue(r,!0),e.publicKeyConvert(s,r)},publicKeyVerify:function(s){return assert.isBuffer(s,messages.EC_PUBLIC_KEY_TYPE_INVALID),e.publicKeyVerify(s)},publicKeyTweakAdd:function(s,r,_){return assert.isBuffer(s,messages.EC_PUBLIC_KEY_TYPE_INVALID),assert.isBufferLength2(s,33,65,messages.EC_PUBLIC_KEY_LENGTH_INVALID),assert.isBuffer(r,messages.TWEAK_TYPE_INVALID),assert.isBufferLength(r,32,messages.TWEAK_LENGTH_INVALID),_=initCompressedValue(_,!0),e.publicKeyTweakAdd(s,r,_)},publicKeyTweakMul:function(s,r,_){return assert.isBuffer(s,messages.EC_PUBLIC_KEY_TYPE_INVALID),assert.isBufferLength2(s,33,65,messages.EC_PUBLIC_KEY_LENGTH_INVALID),assert.isBuffer(r,messages.TWEAK_TYPE_INVALID),assert.isBufferLength(r,32,messages.TWEAK_LENGTH_INVALID),_=initCompressedValue(_,!0),e.publicKeyTweakMul(s,r,_)},publicKeyCombine:function(s,r){assert.isArray(s,messages.EC_PUBLIC_KEYS_TYPE_INVALID),assert.isLengthGTZero(s,messages.EC_PUBLIC_KEYS_LENGTH_INVALID);for(var _=0;_<s.length;++_)assert.isBuffer(s[_],messages.EC_PUBLIC_KEY_TYPE_INVALID),assert.isBufferLength2(s[_],33,65,messages.EC_PUBLIC_KEY_LENGTH_INVALID);return r=initCompressedValue(r,!0),e.publicKeyCombine(s,r)},signatureNormalize:function(s){return assert.isBuffer(s,messages.ECDSA_SIGNATURE_TYPE_INVALID),assert.isBufferLength(s,64,messages.ECDSA_SIGNATURE_LENGTH_INVALID),e.signatureNormalize(s)},signatureExport:function(s){assert.isBuffer(s,messages.ECDSA_SIGNATURE_TYPE_INVALID),assert.isBufferLength(s,64,messages.ECDSA_SIGNATURE_LENGTH_INVALID);var r=e.signatureExport(s);return der.signatureExport(r)},signatureImport:function(s){assert.isBuffer(s,messages.ECDSA_SIGNATURE_TYPE_INVALID),assert.isLengthGTZero(s,messages.ECDSA_SIGNATURE_LENGTH_INVALID);var r=der.signatureImport(s);if(r)return e.signatureImport(r);throw new Error(messages.ECDSA_SIGNATURE_PARSE_DER_FAIL)},signatureImportLax:function(s){assert.isBuffer(s,messages.ECDSA_SIGNATURE_TYPE_INVALID),assert.isLengthGTZero(s,messages.ECDSA_SIGNATURE_LENGTH_INVALID);var r=der.signatureImportLax(s);if(r)return e.signatureImport(r);throw new Error(messages.ECDSA_SIGNATURE_PARSE_DER_FAIL)},sign:function(s,r,_){assert.isBuffer(s,messages.MSG32_TYPE_INVALID),assert.isBufferLength(s,32,messages.MSG32_LENGTH_INVALID),assert.isBuffer(r,messages.EC_PRIVATE_KEY_TYPE_INVALID),assert.isBufferLength(r,32,messages.EC_PRIVATE_KEY_LENGTH_INVALID);var E=null,t=null;return void 0!==_&&(assert.isObject(_,messages.OPTIONS_TYPE_INVALID),void 0!==_.data&&(assert.isBuffer(_.data,messages.OPTIONS_DATA_TYPE_INVALID),assert.isBufferLength(_.data,32,messages.OPTIONS_DATA_LENGTH_INVALID),E=_.data),void 0!==_.noncefn&&(assert.isFunction(_.noncefn,messages.OPTIONS_NONCEFN_TYPE_INVALID),t=_.noncefn)),e.sign(s,r,t,E)},verify:function(s,r,_){return assert.isBuffer(s,messages.MSG32_TYPE_INVALID),assert.isBufferLength(s,32,messages.MSG32_LENGTH_INVALID),assert.isBuffer(r,messages.ECDSA_SIGNATURE_TYPE_INVALID),assert.isBufferLength(r,64,messages.ECDSA_SIGNATURE_LENGTH_INVALID),assert.isBuffer(_,messages.EC_PUBLIC_KEY_TYPE_INVALID),assert.isBufferLength2(_,33,65,messages.EC_PUBLIC_KEY_LENGTH_INVALID),e.verify(s,r,_)},recover:function(s,r,_,E){return assert.isBuffer(s,messages.MSG32_TYPE_INVALID),assert.isBufferLength(s,32,messages.MSG32_LENGTH_INVALID),assert.isBuffer(r,messages.ECDSA_SIGNATURE_TYPE_INVALID),assert.isBufferLength(r,64,messages.ECDSA_SIGNATURE_LENGTH_INVALID),assert.isNumber(_,messages.RECOVERY_ID_TYPE_INVALID),assert.isNumberInInterval(_,-1,4,messages.RECOVERY_ID_VALUE_INVALID),E=initCompressedValue(E,!0),e.recover(s,r,_,E)},ecdh:function(s,r){return assert.isBuffer(s,messages.EC_PUBLIC_KEY_TYPE_INVALID),assert.isBufferLength2(s,33,65,messages.EC_PUBLIC_KEY_LENGTH_INVALID),assert.isBuffer(r,messages.EC_PRIVATE_KEY_TYPE_INVALID),assert.isBufferLength(r,32,messages.EC_PRIVATE_KEY_LENGTH_INVALID),e.ecdh(s,r)},ecdhUnsafe:function(s,r,_){return assert.isBuffer(s,messages.EC_PUBLIC_KEY_TYPE_INVALID),assert.isBufferLength2(s,33,65,messages.EC_PUBLIC_KEY_LENGTH_INVALID),assert.isBuffer(r,messages.EC_PRIVATE_KEY_TYPE_INVALID),assert.isBufferLength(r,32,messages.EC_PRIVATE_KEY_LENGTH_INVALID),_=initCompressedValue(_,!0),e.ecdhUnsafe(s,r,_)}}};

},{"./assert":55,"./der":56,"./messages.json":59}],59:[function(require,module,exports){
module.exports={
  "COMPRESSED_TYPE_INVALID": "compressed should be a boolean",
  "EC_PRIVATE_KEY_TYPE_INVALID": "private key should be a Buffer",
  "EC_PRIVATE_KEY_LENGTH_INVALID": "private key length is invalid",
  "EC_PRIVATE_KEY_TWEAK_ADD_FAIL": "tweak out of range or resulting private key is invalid",
  "EC_PRIVATE_KEY_TWEAK_MUL_FAIL": "tweak out of range",
  "EC_PRIVATE_KEY_EXPORT_DER_FAIL": "couldn't export to DER format",
  "EC_PRIVATE_KEY_IMPORT_DER_FAIL": "couldn't import from DER format",
  "EC_PUBLIC_KEYS_TYPE_INVALID": "public keys should be an Array",
  "EC_PUBLIC_KEYS_LENGTH_INVALID": "public keys Array should have at least 1 element",
  "EC_PUBLIC_KEY_TYPE_INVALID": "public key should be a Buffer",
  "EC_PUBLIC_KEY_LENGTH_INVALID": "public key length is invalid",
  "EC_PUBLIC_KEY_PARSE_FAIL": "the public key could not be parsed or is invalid",
  "EC_PUBLIC_KEY_CREATE_FAIL": "private was invalid, try again",
  "EC_PUBLIC_KEY_TWEAK_ADD_FAIL": "tweak out of range or resulting public key is invalid",
  "EC_PUBLIC_KEY_TWEAK_MUL_FAIL": "tweak out of range",
  "EC_PUBLIC_KEY_COMBINE_FAIL": "the sum of the public keys is not valid",
  "ECDH_FAIL": "scalar was invalid (zero or overflow)",
  "ECDSA_SIGNATURE_TYPE_INVALID": "signature should be a Buffer",
  "ECDSA_SIGNATURE_LENGTH_INVALID": "signature length is invalid",
  "ECDSA_SIGNATURE_PARSE_FAIL": "couldn't parse signature",
  "ECDSA_SIGNATURE_PARSE_DER_FAIL": "couldn't parse DER signature",
  "ECDSA_SIGNATURE_SERIALIZE_DER_FAIL": "couldn't serialize signature to DER format",
  "ECDSA_SIGN_FAIL": "nonce generation function failed or private key is invalid",
  "ECDSA_RECOVER_FAIL": "couldn't recover public key from signature",
  "MSG32_TYPE_INVALID": "message should be a Buffer",
  "MSG32_LENGTH_INVALID": "message length is invalid",
  "OPTIONS_TYPE_INVALID": "options should be an Object",
  "OPTIONS_DATA_TYPE_INVALID": "options.data should be a Buffer",
  "OPTIONS_DATA_LENGTH_INVALID": "options.data length is invalid",
  "OPTIONS_NONCEFN_TYPE_INVALID": "options.noncefn should be a Function",
  "RECOVERY_ID_TYPE_INVALID": "recovery should be a Number",
  "RECOVERY_ID_VALUE_INVALID": "recovery should have value between -1 and 4",
  "TWEAK_TYPE_INVALID": "tweak should be a Buffer",
  "TWEAK_LENGTH_INVALID": "tweak length is invalid"
}

},{}],60:[function(require,module,exports){
function Hash(t,i){this._block=Buffer.alloc(t),this._finalSize=i,this._blockSize=t,this._len=0}var Buffer=require("safe-buffer").Buffer;Hash.prototype.update=function(t,i){"string"==typeof t&&(i=i||"utf8",t=Buffer.from(t,i));for(var e=this._block,s=this._blockSize,h=t.length,o=this._len,l=0;l<h;){for(var r=o%s,_=Math.min(h-l,s-r),n=0;n<_;n++)e[r+n]=t[l+n];l+=_,(o+=_)%s==0&&this._update(e)}return this._len+=h,this},Hash.prototype.digest=function(t){var i=this._len%this._blockSize;this._block[i]=128,this._block.fill(0,i+1),i>=this._finalSize&&(this._update(this._block),this._block.fill(0));var e=8*this._len;if(e<=4294967295)this._block.writeUInt32BE(e,this._blockSize-4);else{var s=4294967295&e,h=(e-s)/4294967296;this._block.writeUInt32BE(h,this._blockSize-8),this._block.writeUInt32BE(s,this._blockSize-4)}this._update(this._block);var o=this._hash();return t?o.toString(t):o},Hash.prototype._update=function(){throw new Error("_update must be implemented by subclass")},module.exports=Hash;

},{"safe-buffer":52}],61:[function(require,module,exports){
var exports=module.exports=function(e){e=e.toLowerCase();var r=exports[e];if(!r)throw new Error(e+" is not supported (we accept pull requests)");return new r};exports.sha=require("./sha"),exports.sha1=require("./sha1"),exports.sha224=require("./sha224"),exports.sha256=require("./sha256"),exports.sha384=require("./sha384"),exports.sha512=require("./sha512");

},{"./sha":62,"./sha1":63,"./sha224":64,"./sha256":65,"./sha384":66,"./sha512":67}],62:[function(require,module,exports){
function Sha(){this.init(),this._w=W,Hash.call(this,64,56)}function rotl5(t){return t<<5|t>>>27}function rotl30(t){return t<<30|t>>>2}function ft(t,i,r,h){return 0===t?i&r|~i&h:2===t?i&r|i&h|r&h:i^r^h}var inherits=require("inherits"),Hash=require("./hash"),Buffer=require("safe-buffer").Buffer,K=[1518500249,1859775393,-1894007588,-899497514],W=new Array(80);inherits(Sha,Hash),Sha.prototype.init=function(){return this._a=1732584193,this._b=4023233417,this._c=2562383102,this._d=271733878,this._e=3285377520,this},Sha.prototype._update=function(t){for(var i=this._w,r=0|this._a,h=0|this._b,s=0|this._c,e=0|this._d,n=0|this._e,_=0;_<16;++_)i[_]=t.readInt32BE(4*_);for(;_<80;++_)i[_]=i[_-3]^i[_-8]^i[_-14]^i[_-16];for(var a=0;a<80;++a){var o=~~(a/20),f=rotl5(r)+ft(o,h,s,e)+n+i[a]+K[o]|0;n=e,e=s,s=rotl30(h),h=r,r=f}this._a=r+this._a|0,this._b=h+this._b|0,this._c=s+this._c|0,this._d=e+this._d|0,this._e=n+this._e|0},Sha.prototype._hash=function(){var t=Buffer.allocUnsafe(20);return t.writeInt32BE(0|this._a,0),t.writeInt32BE(0|this._b,4),t.writeInt32BE(0|this._c,8),t.writeInt32BE(0|this._d,12),t.writeInt32BE(0|this._e,16),t},module.exports=Sha;

},{"./hash":60,"inherits":40,"safe-buffer":52}],63:[function(require,module,exports){
function Sha1(){this.init(),this._w=W,Hash.call(this,64,56)}function rotl1(t){return t<<1|t>>>31}function rotl5(t){return t<<5|t>>>27}function rotl30(t){return t<<30|t>>>2}function ft(t,i,r,h){return 0===t?i&r|~i&h:2===t?i&r|i&h|r&h:i^r^h}var inherits=require("inherits"),Hash=require("./hash"),Buffer=require("safe-buffer").Buffer,K=[1518500249,1859775393,-1894007588,-899497514],W=new Array(80);inherits(Sha1,Hash),Sha1.prototype.init=function(){return this._a=1732584193,this._b=4023233417,this._c=2562383102,this._d=271733878,this._e=3285377520,this},Sha1.prototype._update=function(t){for(var i=this._w,r=0|this._a,h=0|this._b,s=0|this._c,e=0|this._d,n=0|this._e,_=0;_<16;++_)i[_]=t.readInt32BE(4*_);for(;_<80;++_)i[_]=rotl1(i[_-3]^i[_-8]^i[_-14]^i[_-16]);for(var a=0;a<80;++a){var o=~~(a/20),f=rotl5(r)+ft(o,h,s,e)+n+i[a]+K[o]|0;n=e,e=s,s=rotl30(h),h=r,r=f}this._a=r+this._a|0,this._b=h+this._b|0,this._c=s+this._c|0,this._d=e+this._d|0,this._e=n+this._e|0},Sha1.prototype._hash=function(){var t=Buffer.allocUnsafe(20);return t.writeInt32BE(0|this._a,0),t.writeInt32BE(0|this._b,4),t.writeInt32BE(0|this._c,8),t.writeInt32BE(0|this._d,12),t.writeInt32BE(0|this._e,16),t},module.exports=Sha1;

},{"./hash":60,"inherits":40,"safe-buffer":52}],64:[function(require,module,exports){
function Sha224(){this.init(),this._w=W,Hash.call(this,64,56)}var inherits=require("inherits"),Sha256=require("./sha256"),Hash=require("./hash"),Buffer=require("safe-buffer").Buffer,W=new Array(64);inherits(Sha224,Sha256),Sha224.prototype.init=function(){return this._a=3238371032,this._b=914150663,this._c=812702999,this._d=4144912697,this._e=4290775857,this._f=1750603025,this._g=1694076839,this._h=3204075428,this},Sha224.prototype._hash=function(){var t=Buffer.allocUnsafe(28);return t.writeInt32BE(this._a,0),t.writeInt32BE(this._b,4),t.writeInt32BE(this._c,8),t.writeInt32BE(this._d,12),t.writeInt32BE(this._e,16),t.writeInt32BE(this._f,20),t.writeInt32BE(this._g,24),t},module.exports=Sha224;

},{"./hash":60,"./sha256":65,"inherits":40,"safe-buffer":52}],65:[function(require,module,exports){
function Sha256(){this.init(),this._w=W,Hash.call(this,64,56)}function ch(t,i,h){return h^t&(i^h)}function maj(t,i,h){return t&i|h&(t|i)}function sigma0(t){return(t>>>2|t<<30)^(t>>>13|t<<19)^(t>>>22|t<<10)}function sigma1(t){return(t>>>6|t<<26)^(t>>>11|t<<21)^(t>>>25|t<<7)}function gamma0(t){return(t>>>7|t<<25)^(t>>>18|t<<14)^t>>>3}function gamma1(t){return(t>>>17|t<<15)^(t>>>19|t<<13)^t>>>10}var inherits=require("inherits"),Hash=require("./hash"),Buffer=require("safe-buffer").Buffer,K=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],W=new Array(64);inherits(Sha256,Hash),Sha256.prototype.init=function(){return this._a=1779033703,this._b=3144134277,this._c=1013904242,this._d=2773480762,this._e=1359893119,this._f=2600822924,this._g=528734635,this._h=1541459225,this},Sha256.prototype._update=function(t){for(var i=this._w,h=0|this._a,s=0|this._b,r=0|this._c,e=0|this._d,n=0|this._e,_=0|this._f,a=0|this._g,f=0|this._h,u=0;u<16;++u)i[u]=t.readInt32BE(4*u);for(;u<64;++u)i[u]=gamma1(i[u-2])+i[u-7]+gamma0(i[u-15])+i[u-16]|0;for(var o=0;o<64;++o){var c=f+sigma1(n)+ch(n,_,a)+K[o]+i[o]|0,m=sigma0(h)+maj(h,s,r)|0;f=a,a=_,_=n,n=e+c|0,e=r,r=s,s=h,h=c+m|0}this._a=h+this._a|0,this._b=s+this._b|0,this._c=r+this._c|0,this._d=e+this._d|0,this._e=n+this._e|0,this._f=_+this._f|0,this._g=a+this._g|0,this._h=f+this._h|0},Sha256.prototype._hash=function(){var t=Buffer.allocUnsafe(32);return t.writeInt32BE(this._a,0),t.writeInt32BE(this._b,4),t.writeInt32BE(this._c,8),t.writeInt32BE(this._d,12),t.writeInt32BE(this._e,16),t.writeInt32BE(this._f,20),t.writeInt32BE(this._g,24),t.writeInt32BE(this._h,28),t},module.exports=Sha256;

},{"./hash":60,"inherits":40,"safe-buffer":52}],66:[function(require,module,exports){
function Sha384(){this.init(),this._w=W,Hash.call(this,128,112)}var inherits=require("inherits"),SHA512=require("./sha512"),Hash=require("./hash"),Buffer=require("safe-buffer").Buffer,W=new Array(160);inherits(Sha384,SHA512),Sha384.prototype.init=function(){return this._ah=3418070365,this._bh=1654270250,this._ch=2438529370,this._dh=355462360,this._eh=1731405415,this._fh=2394180231,this._gh=3675008525,this._hh=1203062813,this._al=3238371032,this._bl=914150663,this._cl=812702999,this._dl=4144912697,this._el=4290775857,this._fl=1750603025,this._gl=1694076839,this._hl=3204075428,this},Sha384.prototype._hash=function(){function h(h,t,s){i.writeInt32BE(h,s),i.writeInt32BE(t,s+4)}var i=Buffer.allocUnsafe(48);return h(this._ah,this._al,0),h(this._bh,this._bl,8),h(this._ch,this._cl,16),h(this._dh,this._dl,24),h(this._eh,this._el,32),h(this._fh,this._fl,40),i},module.exports=Sha384;

},{"./hash":60,"./sha512":67,"inherits":40,"safe-buffer":52}],67:[function(require,module,exports){
function Sha512(){this.init(),this._w=W,Hash.call(this,128,112)}function Ch(h,t,i){return i^h&(t^i)}function maj(h,t,i){return h&t|i&(h|t)}function sigma0(h,t){return(h>>>28|t<<4)^(t>>>2|h<<30)^(t>>>7|h<<25)}function sigma1(h,t){return(h>>>14|t<<18)^(h>>>18|t<<14)^(t>>>9|h<<23)}function Gamma0(h,t){return(h>>>1|t<<31)^(h>>>8|t<<24)^h>>>7}function Gamma0l(h,t){return(h>>>1|t<<31)^(h>>>8|t<<24)^(h>>>7|t<<25)}function Gamma1(h,t){return(h>>>19|t<<13)^(t>>>29|h<<3)^h>>>6}function Gamma1l(h,t){return(h>>>19|t<<13)^(t>>>29|h<<3)^(h>>>6|t<<26)}function getCarry(h,t){return h>>>0<t>>>0?1:0}var inherits=require("inherits"),Hash=require("./hash"),Buffer=require("safe-buffer").Buffer,K=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591],W=new Array(160);inherits(Sha512,Hash),Sha512.prototype.init=function(){return this._ah=1779033703,this._bh=3144134277,this._ch=1013904242,this._dh=2773480762,this._eh=1359893119,this._fh=2600822924,this._gh=528734635,this._hh=1541459225,this._al=4089235720,this._bl=2227873595,this._cl=4271175723,this._dl=1595750129,this._el=2917565137,this._fl=725511199,this._gl=4215389547,this._hl=327033209,this},Sha512.prototype._update=function(h){for(var t=this._w,i=0|this._ah,s=0|this._bh,r=0|this._ch,_=0|this._dh,a=0|this._eh,e=0|this._fh,l=0|this._gh,n=0|this._hh,f=0|this._al,g=0|this._bl,u=0|this._cl,c=0|this._dl,m=0|this._el,o=0|this._fl,y=0|this._gl,C=0|this._hl,d=0;d<32;d+=2)t[d]=h.readInt32BE(4*d),t[d+1]=h.readInt32BE(4*d+4);for(;d<160;d+=2){var b=t[d-30],p=t[d-30+1],G=Gamma0(b,p),v=Gamma0l(p,b),B=Gamma1(b=t[d-4],p=t[d-4+1]),S=Gamma1l(p,b),w=t[d-14],E=t[d-14+1],I=t[d-32],j=t[d-32+1],q=v+E|0,H=G+w+getCarry(q,v)|0;H=(H=H+B+getCarry(q=q+S|0,S)|0)+I+getCarry(q=q+j|0,j)|0,t[d]=H,t[d+1]=q}for(var W=0;W<160;W+=2){H=t[W],q=t[W+1];var x=maj(i,s,r),A=maj(f,g,u),U=sigma0(i,f),k=sigma0(f,i),z=sigma1(a,m),D=sigma1(m,a),F=K[W],J=K[W+1],L=Ch(a,e,l),M=Ch(m,o,y),N=C+D|0,O=n+z+getCarry(N,C)|0;O=(O=(O=O+L+getCarry(N=N+M|0,M)|0)+F+getCarry(N=N+J|0,J)|0)+H+getCarry(N=N+q|0,q)|0;var P=k+A|0,Q=U+x+getCarry(P,k)|0;n=l,C=y,l=e,y=o,e=a,o=m,a=_+O+getCarry(m=c+N|0,c)|0,_=r,c=u,r=s,u=g,s=i,g=f,i=O+Q+getCarry(f=N+P|0,N)|0}this._al=this._al+f|0,this._bl=this._bl+g|0,this._cl=this._cl+u|0,this._dl=this._dl+c|0,this._el=this._el+m|0,this._fl=this._fl+o|0,this._gl=this._gl+y|0,this._hl=this._hl+C|0,this._ah=this._ah+i+getCarry(this._al,f)|0,this._bh=this._bh+s+getCarry(this._bl,g)|0,this._ch=this._ch+r+getCarry(this._cl,u)|0,this._dh=this._dh+_+getCarry(this._dl,c)|0,this._eh=this._eh+a+getCarry(this._el,m)|0,this._fh=this._fh+e+getCarry(this._fl,o)|0,this._gh=this._gh+l+getCarry(this._gl,y)|0,this._hh=this._hh+n+getCarry(this._hl,C)|0},Sha512.prototype._hash=function(){function h(h,i,s){t.writeInt32BE(h,s),t.writeInt32BE(i,s+4)}var t=Buffer.allocUnsafe(64);return h(this._ah,this._al,0),h(this._bh,this._bl,8),h(this._ch,this._cl,16),h(this._dh,this._dl,24),h(this._eh,this._el,32),h(this._fh,this._fl,40),h(this._gh,this._gl,48),h(this._hh,this._hl,56),t},module.exports=Sha512;

},{"./hash":60,"inherits":40,"safe-buffer":52}],68:[function(require,module,exports){
var isHexPrefixed=require("is-hex-prefixed");module.exports=function(e){return"string"!=typeof e?e:isHexPrefixed(e)?e.slice(2):e};

},{"is-hex-prefixed":41}],69:[function(require,module,exports){
function bytesToUuid(e,t){var o=t||0,i=byteToHex;return i[e[o++]]+i[e[o++]]+i[e[o++]]+i[e[o++]]+"-"+i[e[o++]]+i[e[o++]]+"-"+i[e[o++]]+i[e[o++]]+"-"+i[e[o++]]+i[e[o++]]+"-"+i[e[o++]]+i[e[o++]]+i[e[o++]]+i[e[o++]]+i[e[o++]]+i[e[o++]]}for(var byteToHex=[],i=0;i<256;++i)byteToHex[i]=(i+256).toString(16).substr(1);module.exports=bytesToUuid;

},{}],70:[function(require,module,exports){
(function (global){
var rng,crypto=global.crypto||global.msCrypto;if(crypto&&crypto.getRandomValues){var rnds8=new Uint8Array(16);rng=function(){return crypto.getRandomValues(rnds8),rnds8}}if(!rng){var rnds=new Array(16);rng=function(){for(var r,n=0;n<16;n++)0==(3&n)&&(r=4294967296*Math.random()),rnds[n]=r>>>((3&n)<<3)&255;return rnds}}module.exports=rng;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],71:[function(require,module,exports){
function v4(r,n,e){var i=n&&e||0;"string"==typeof r&&(n="binary"==r?new Array(16):null,r=null);var u=(r=r||{}).random||(r.rng||rng)();if(u[6]=15&u[6]|64,u[8]=63&u[8]|128,n)for(var o=0;o<16;++o)n[i+o]=u[o];return n||bytesToUuid(u)}var rng=require("./lib/rng"),bytesToUuid=require("./lib/bytesToUuid");module.exports=v4;

},{"./lib/bytesToUuid":69,"./lib/rng":70}],72:[function(require,module,exports){
(function (Buffer){
"use strict";const crypto=require("crypto");exports.decryptPrivKey=((e,t)=>{let r=e.slice(0,128);r=crypto.decodeCryptojsSalt(r);const c=this.evp_kdf(new Buffer(t),r.salt,{keysize:32,ivsize:16}),s=crypto.createDecipheriv("aes-256-cbc",c.key,c.iv),i=this.decipherBuffer(s,new Buffer(r.ciphertext));return new Buffer(i.toString(),"hex")}),exports.decodeCryptojsSalt=(e=>{const t=new Buffer(e,"base64");return"Salted__"===t.slice(0,8).toString()?{salt:t.slice(8,16),ciphertext:t.slice(16)}:{ciphertext:t}}),exports.decipherBuffer=((e,t)=>Buffer.concat([e.update(t),e.final()])),exports.evp_kdf=((e,t,r)=>{const c=r.keysize||16,s=r.ivsize||16,i=[];let o=0;for(;Buffer.concat(i).length<c+s;)i[o]=function(c){let s=crypto.createHash(r.digest||"md5");s.update(c),s.update(e),s.update(t),c=s.digest();for(let e=1;e<(r.count||1);e++)(s=crypto.createHash(r.digest||"md5")).update(c),c=s.digest();return c}(0===o?new Buffer(0):i[o-1]),o++;const f=Buffer.concat(i);return{key:f.slice(0,c),iv:f.slice(c,c+s)}});

}).call(this,require("buffer").Buffer)
},{"buffer":120,"crypto":129}],73:[function(require,module,exports){
var asn1=exports;asn1.bignum=require("bn.js"),asn1.define=require("./asn1/api").define,asn1.base=require("./asn1/base"),asn1.constants=require("./asn1/constants"),asn1.decoders=require("./asn1/decoders"),asn1.encoders=require("./asn1/encoders");

},{"./asn1/api":74,"./asn1/base":76,"./asn1/constants":80,"./asn1/decoders":82,"./asn1/encoders":85,"bn.js":89}],74:[function(require,module,exports){
function Entity(e,t){this.name=e,this.body=t,this.decoders={},this.encoders={}}var asn1=require("../asn1"),inherits=require("inherits"),api=exports;api.define=function(e,t){return new Entity(e,t)},Entity.prototype._createNamed=function(e){var t;try{t=require("vm").runInThisContext("(function "+this.name+"(entity) {\n  this._initNamed(entity);\n})")}catch(e){t=function(e){this._initNamed(e)}}return inherits(t,e),t.prototype._initNamed=function(t){e.call(this,t)},new t(this)},Entity.prototype._getDecoder=function(e){return e=e||"der",this.decoders.hasOwnProperty(e)||(this.decoders[e]=this._createNamed(asn1.decoders[e])),this.decoders[e]},Entity.prototype.decode=function(e,t,n){return this._getDecoder(t).decode(e,n)},Entity.prototype._getEncoder=function(e){return e=e||"der",this.encoders.hasOwnProperty(e)||(this.encoders[e]=this._createNamed(asn1.encoders[e])),this.encoders[e]},Entity.prototype.encode=function(e,t,n){return this._getEncoder(t).encode(e,n)};

var api = exports;

api.define = function define(name, body) {
  return new Entity(name, body);
};

function Entity(name, body) {
  this.name = name;
  this.body = body;

  this.decoders = {};
  this.encoders = {};
};

Entity.prototype._createNamed = function createNamed(base) {
  var named;
  try {
    named = require('vm').runInThisContext(
      '(function ' + this.name + '(entity) {\n' +
      '  this._initNamed(entity);\n' +
      '})'
    );
  } catch (e) {
    named = function (entity) {
      this._initNamed(entity);
    };
  }
  inherits(named, base);
  named.prototype._initNamed = function initnamed(entity) {
    base.call(this, entity);
  };

  return new named(this);
};

Entity.prototype._getDecoder = function _getDecoder(enc) {
  enc = enc || 'der';
  // Lazily create decoder
  if (!this.decoders.hasOwnProperty(enc))
    this.decoders[enc] = this._createNamed(asn1.decoders[enc]);
  return this.decoders[enc];
};

Entity.prototype.decode = function decode(data, enc, options) {
  return this._getDecoder(enc).decode(data, options);
};

Entity.prototype._getEncoder = function _getEncoder(enc) {
  enc = enc || 'der';
  // Lazily create encoder
  if (!this.encoders.hasOwnProperty(enc))
    this.encoders[enc] = this._createNamed(asn1.encoders[enc]);
  return this.encoders[enc];
};

Entity.prototype.encode = function encode(data, enc, /* internal */ reporter) {
  return this._getEncoder(enc).encode(data, reporter);
};

},{"../asn1":73,"inherits":174,"vm":230}],75:[function(require,module,exports){
var inherits = require('inherits');
var Reporter = require('../base').Reporter;
var Buffer = require('buffer').Buffer;

},{"../base":76,"buffer":120,"inherits":174}],76:[function(require,module,exports){
var base=exports;base.Reporter=require("./reporter").Reporter,base.DecoderBuffer=require("./buffer").DecoderBuffer,base.EncoderBuffer=require("./buffer").EncoderBuffer,base.Node=require("./node");

},{"./buffer":75,"./node":77,"./reporter":78}],77:[function(require,module,exports){
function Node(e,t){var r={};this._baseState=r,r.enc=e,r.parent=t||null,r.children=null,r.tag=null,r.args=null,r.reverseArgs=null,r.choice=null,r.optional=!1,r.any=!1,r.obj=!1,r.use=null,r.useDecoder=null,r.key=null,r.default=null,r.explicit=null,r.implicit=null,r.contains=null,r.parent||(r.children=[],this._wrap())}var Reporter=require("../base").Reporter,EncoderBuffer=require("../base").EncoderBuffer,DecoderBuffer=require("../base").DecoderBuffer,assert=require("minimalistic-assert"),tags=["seq","seqof","set","setof","objid","bool","gentime","utctime","null_","enum","int","objDesc","bitstr","bmpstr","charstr","genstr","graphstr","ia5str","iso646str","numstr","octstr","printstr","t61str","unistr","utf8str","videostr"],methods=["key","obj","use","optional","explicit","implicit","def","choice","any","contains"].concat(tags),overrided=["_peekTag","_decodeTag","_use","_decodeStr","_decodeObjid","_decodeTime","_decodeNull","_decodeInt","_decodeBool","_decodeList","_encodeComposite","_encodeStr","_encodeObjid","_encodeTime","_encodeNull","_encodeInt","_encodeBool"];module.exports=Node;var stateProps=["enc","parent","children","tag","args","reverseArgs","choice","optional","any","obj","use","alteredUse","key","default","explicit","implicit","contains"];Node.prototype.clone=function(){var e=this._baseState,t={};stateProps.forEach(function(r){t[r]=e[r]});var r=new this.constructor(t.parent);return r._baseState=t,r},Node.prototype._wrap=function(){var e=this._baseState;methods.forEach(function(t){this[t]=function(){var r=new this.constructor(this);return e.children.push(r),r[t].apply(r,arguments)}},this)},Node.prototype._init=function(e){var t=this._baseState;assert(null===t.parent),e.call(this),t.children=t.children.filter(function(e){return e._baseState.parent===this},this),assert.equal(t.children.length,1,"Root node can have only one child")},Node.prototype._useArgs=function(e){var t=this._baseState,r=e.filter(function(e){return e instanceof this.constructor},this);e=e.filter(function(e){return!(e instanceof this.constructor)},this),0!==r.length&&(assert(null===t.children),t.children=r,r.forEach(function(e){e._baseState.parent=this},this)),0!==e.length&&(assert(null===t.args),t.args=e,t.reverseArgs=e.map(function(e){if("object"!=typeof e||e.constructor!==Object)return e;var t={};return Object.keys(e).forEach(function(r){r==(0|r)&&(r|=0);var i=e[r];t[i]=r}),t}))},overrided.forEach(function(e){Node.prototype[e]=function(){var t=this._baseState;throw new Error(e+" not implemented for encoding: "+t.enc)}}),tags.forEach(function(e){Node.prototype[e]=function(){var t=this._baseState,r=Array.prototype.slice.call(arguments);return assert(null===t.tag),t.tag=e,this._useArgs(r),this}}),Node.prototype.use=function(e){assert(e);var t=this._baseState;return assert(null===t.use),t.use=e,this},Node.prototype.optional=function(){return this._baseState.optional=!0,this},Node.prototype.def=function(e){var t=this._baseState;return assert(null===t.default),t.default=e,t.optional=!0,this},Node.prototype.explicit=function(e){var t=this._baseState;return assert(null===t.explicit&&null===t.implicit),t.explicit=e,this},Node.prototype.implicit=function(e){var t=this._baseState;return assert(null===t.explicit&&null===t.implicit),t.implicit=e,this},Node.prototype.obj=function(){var e=this._baseState,t=Array.prototype.slice.call(arguments);return e.obj=!0,0!==t.length&&this._useArgs(t),this},Node.prototype.key=function(e){var t=this._baseState;return assert(null===t.key),t.key=e,this},Node.prototype.any=function(){return this._baseState.any=!0,this},Node.prototype.choice=function(e){var t=this._baseState;return assert(null===t.choice),t.choice=e,this._useArgs(Object.keys(e).map(function(t){return e[t]})),this},Node.prototype.contains=function(e){var t=this._baseState;return assert(null===t.use),t.contains=e,this},Node.prototype._decode=function(e,t){var r=this._baseState;if(null===r.parent)return e.wrapResult(r.children[0]._decode(e,t));var i=r.default,n=!0,o=null;if(null!==r.key&&(o=e.enterKey(r.key)),r.optional){var s=null;if(null!==r.explicit?s=r.explicit:null!==r.implicit?s=r.implicit:null!==r.tag&&(s=r.tag),null!==s||r.any){if(n=this._peekTag(e,s,r.any),e.isError(n))return n}else{u=e.save();try{null===r.choice?this._decodeGeneric(r.tag,e,t):this._decodeChoice(e,t),n=!0}catch(e){n=!1}e.restore(u)}}var a;if(r.obj&&n&&(a=e.enterObject()),n){if(null!==r.explicit){var c=this._decodeTag(e,r.explicit);if(e.isError(c))return c;e=c}var l=e.offset;if(null===r.use&&null===r.choice){if(r.any)var u=e.save();var d=this._decodeTag(e,null!==r.implicit?r.implicit:r.tag,r.any);if(e.isError(d))return d;r.any?i=e.raw(u):e=d}if(t&&t.track&&null!==r.tag&&t.track(e.path(),l,e.length,"tagged"),t&&t.track&&null!==r.tag&&t.track(e.path(),e.offset,e.length,"content"),i=r.any?i:null===r.choice?this._decodeGeneric(r.tag,e,t):this._decodeChoice(e,t),e.isError(i))return i;if(r.any||null!==r.choice||null===r.children||r.children.forEach(function(r){r._decode(e,t)}),r.contains&&("octstr"===r.tag||"bitstr"===r.tag)){var h=new DecoderBuffer(i);i=this._getUse(r.contains,e._reporterState.obj)._decode(h,t)}}return r.obj&&n&&(i=e.leaveObject(a)),null===r.key||null===i&&!0!==n?null!==o&&e.exitKey(o):e.leaveKey(o,r.key,i),i},Node.prototype._decodeGeneric=function(e,t,r){var i=this._baseState;return"seq"===e||"set"===e?null:"seqof"===e||"setof"===e?this._decodeList(t,e,i.args[0],r):/str$/.test(e)?this._decodeStr(t,e,r):"objid"===e&&i.args?this._decodeObjid(t,i.args[0],i.args[1],r):"objid"===e?this._decodeObjid(t,null,null,r):"gentime"===e||"utctime"===e?this._decodeTime(t,e,r):"null_"===e?this._decodeNull(t,r):"bool"===e?this._decodeBool(t,r):"objDesc"===e?this._decodeStr(t,e,r):"int"===e||"enum"===e?this._decodeInt(t,i.args&&i.args[0],r):null!==i.use?this._getUse(i.use,t._reporterState.obj)._decode(t,r):t.error("unknown tag: "+e)},Node.prototype._getUse=function(e,t){var r=this._baseState;return r.useDecoder=this._use(e,t),assert(null===r.useDecoder._baseState.parent),r.useDecoder=r.useDecoder._baseState.children[0],r.implicit!==r.useDecoder._baseState.implicit&&(r.useDecoder=r.useDecoder.clone(),r.useDecoder._baseState.implicit=r.implicit),r.useDecoder},Node.prototype._decodeChoice=function(e,t){var r=this._baseState,i=null,n=!1;return Object.keys(r.choice).some(function(o){var s=e.save(),a=r.choice[o];try{var c=a._decode(e,t);if(e.isError(c))return!1;i={type:o,value:c},n=!0}catch(t){return e.restore(s),!1}return!0},this),n?i:e.error("Choice not matched")},Node.prototype._createEncoderBuffer=function(e){return new EncoderBuffer(e,this.reporter)},Node.prototype._encode=function(e,t,r){var i=this._baseState;if(null===i.default||i.default!==e){var n=this._encodeValue(e,t,r);if(void 0!==n&&!this._skipDefault(n,t,r))return n}},Node.prototype._encodeValue=function(e,t,r){var i=this._baseState;if(null===i.parent)return i.children[0]._encode(e,t||new Reporter);a=null;if(this.reporter=t,i.optional&&void 0===e){if(null===i.default)return;e=i.default}var n=null,o=!1;if(i.any)a=this._createEncoderBuffer(e);else if(i.choice)a=this._encodeChoice(e,t);else if(i.contains)n=this._getUse(i.contains,r)._encode(e,t),o=!0;else if(i.children)n=i.children.map(function(r){if("null_"===r._baseState.tag)return r._encode(null,t,e);if(null===r._baseState.key)return t.error("Child should have a key");var i=t.enterKey(r._baseState.key);if("object"!=typeof e)return t.error("Child expected, but input is not object");var n=r._encode(e[r._baseState.key],t,e);return t.leaveKey(i),n},this).filter(function(e){return e}),n=this._createEncoderBuffer(n);else if("seqof"===i.tag||"setof"===i.tag){if(!i.args||1!==i.args.length)return t.error("Too many args for : "+i.tag);if(!Array.isArray(e))return t.error("seqof/setof, but data is not Array");var s=this.clone();s._baseState.implicit=null,n=this._createEncoderBuffer(e.map(function(r){var i=this._baseState;return this._getUse(i.args[0],e)._encode(r,t)},s))}else null!==i.use?a=this._getUse(i.use,r)._encode(e,t):(n=this._encodePrimitive(i.tag,e),o=!0);var a;if(!i.any&&null===i.choice){var c=null!==i.implicit?i.implicit:i.tag,l=null===i.implicit?"universal":"context";null===c?null===i.use&&t.error("Tag could be omitted only for .use()"):null===i.use&&(a=this._encodeComposite(c,o,l,n))}return null!==i.explicit&&(a=this._encodeComposite(i.explicit,!1,"context",a)),a},Node.prototype._encodeChoice=function(e,t){var r=this._baseState,i=r.choice[e.type];return i||assert(!1,e.type+" not found in "+JSON.stringify(Object.keys(r.choice))),i._encode(e.value,t)},Node.prototype._encodePrimitive=function(e,t){var r=this._baseState;if(/str$/.test(e))return this._encodeStr(t,e);if("objid"===e&&r.args)return this._encodeObjid(t,r.reverseArgs[0],r.args[1]);if("objid"===e)return this._encodeObjid(t,null,null);if("gentime"===e||"utctime"===e)return this._encodeTime(t,e);if("null_"===e)return this._encodeNull();if("int"===e||"enum"===e)return this._encodeInt(t,r.args&&r.reverseArgs[0]);if("bool"===e)return this._encodeBool(t);if("objDesc"===e)return this._encodeStr(t,e);throw new Error("Unsupported tag: "+e)},Node.prototype._isNumstr=function(e){return/^[0-9 ]*$/.test(e)},Node.prototype._isPrintstr=function(e){return/^[A-Za-z0-9 '\(\)\+,\-\.\/:=\?]*$/.test(e)};

// Supported tags
var tags = [
  'seq', 'seqof', 'set', 'setof', 'objid', 'bool',
  'gentime', 'utctime', 'null_', 'enum', 'int', 'objDesc',
  'bitstr', 'bmpstr', 'charstr', 'genstr', 'graphstr', 'ia5str', 'iso646str',
  'numstr', 'octstr', 'printstr', 't61str', 'unistr', 'utf8str', 'videostr'
];

// Public methods list
var methods = [
  'key', 'obj', 'use', 'optional', 'explicit', 'implicit', 'def', 'choice',
  'any', 'contains'
].concat(tags);

// Overrided methods list
var overrided = [
  '_peekTag', '_decodeTag', '_use',
  '_decodeStr', '_decodeObjid', '_decodeTime',
  '_decodeNull', '_decodeInt', '_decodeBool', '_decodeList',

  '_encodeComposite', '_encodeStr', '_encodeObjid', '_encodeTime',
  '_encodeNull', '_encodeInt', '_encodeBool'
];

function Node(enc, parent) {
  var state = {};
  this._baseState = state;

  state.enc = enc;

  state.parent = parent || null;
  state.children = null;

  // State
  state.tag = null;
  state.args = null;
  state.reverseArgs = null;
  state.choice = null;
  state.optional = false;
  state.any = false;
  state.obj = false;
  state.use = null;
  state.useDecoder = null;
  state.key = null;
  state['default'] = null;
  state.explicit = null;
  state.implicit = null;
  state.contains = null;

  // Should create new instance on each method
  if (!state.parent) {
    state.children = [];
    this._wrap();
  }
}
module.exports = Node;

var stateProps = [
  'enc', 'parent', 'children', 'tag', 'args', 'reverseArgs', 'choice',
  'optional', 'any', 'obj', 'use', 'alteredUse', 'key', 'default', 'explicit',
  'implicit', 'contains'
];

Node.prototype.clone = function clone() {
  var state = this._baseState;
  var cstate = {};
  stateProps.forEach(function(prop) {
    cstate[prop] = state[prop];
  });
  var res = new this.constructor(cstate.parent);
  res._baseState = cstate;
  return res;
};

Node.prototype._wrap = function wrap() {
  var state = this._baseState;
  methods.forEach(function(method) {
    this[method] = function _wrappedMethod() {
      var clone = new this.constructor(this);
      state.children.push(clone);
      return clone[method].apply(clone, arguments);
    };
  }, this);
};

Node.prototype._init = function init(body) {
  var state = this._baseState;

  assert(state.parent === null);
  body.call(this);

  // Filter children
  state.children = state.children.filter(function(child) {
    return child._baseState.parent === this;
  }, this);
  assert.equal(state.children.length, 1, 'Root node can have only one child');
};

Node.prototype._useArgs = function useArgs(args) {
  var state = this._baseState;

  // Filter children and args
  var children = args.filter(function(arg) {
    return arg instanceof this.constructor;
  }, this);
  args = args.filter(function(arg) {
    return !(arg instanceof this.constructor);
  }, this);

  if (children.length !== 0) {
    assert(state.children === null);
    state.children = children;

    // Replace parent to maintain backward link
    children.forEach(function(child) {
      child._baseState.parent = this;
    }, this);
  }
  if (args.length !== 0) {
    assert(state.args === null);
    state.args = args;
    state.reverseArgs = args.map(function(arg) {
      if (typeof arg !== 'object' || arg.constructor !== Object)
        return arg;

      var res = {};
      Object.keys(arg).forEach(function(key) {
        if (key == (key | 0))
          key |= 0;
        var value = arg[key];
        res[value] = key;
      });
      return res;
    });
  }
};

//
// Overrided methods
//

overrided.forEach(function(method) {
  Node.prototype[method] = function _overrided() {
    var state = this._baseState;
    throw new Error(method + ' not implemented for encoding: ' + state.enc);
  };
});

//
// Public methods
//

tags.forEach(function(tag) {
  Node.prototype[tag] = function _tagMethod() {
    var state = this._baseState;
    var args = Array.prototype.slice.call(arguments);

    assert(state.tag === null);
    state.tag = tag;

    this._useArgs(args);

    return this;
  };
});

Node.prototype.use = function use(item) {
  assert(item);
  var state = this._baseState;

  assert(state.use === null);
  state.use = item;

  return this;
};

Node.prototype.optional = function optional() {
  var state = this._baseState;

  state.optional = true;

  return this;
};

Node.prototype.def = function def(val) {
  var state = this._baseState;

  assert(state['default'] === null);
  state['default'] = val;
  state.optional = true;

  return this;
};

Node.prototype.explicit = function explicit(num) {
  var state = this._baseState;

  assert(state.explicit === null && state.implicit === null);
  state.explicit = num;

  return this;
};

Node.prototype.implicit = function implicit(num) {
  var state = this._baseState;

  assert(state.explicit === null && state.implicit === null);
  state.implicit = num;

  return this;
};

Node.prototype.obj = function obj() {
  var state = this._baseState;
  var args = Array.prototype.slice.call(arguments);

  state.obj = true;

  if (args.length !== 0)
    this._useArgs(args);

  return this;
};

Node.prototype.key = function key(newKey) {
  var state = this._baseState;

  assert(state.key === null);
  state.key = newKey;

  return this;
};

Node.prototype.any = function any() {
  var state = this._baseState;

  state.any = true;

  return this;
};

Node.prototype.choice = function choice(obj) {
  var state = this._baseState;

  assert(state.choice === null);
  state.choice = obj;
  this._useArgs(Object.keys(obj).map(function(key) {
    return obj[key];
  }));

  return this;
};

Node.prototype.contains = function contains(item) {
  var state = this._baseState;

  assert(state.use === null);
  state.contains = item;

  return this;
};

//
// Decoding
//

Node.prototype._decode = function decode(input, options) {
  var state = this._baseState;

  // Decode root node
  if (state.parent === null)
    return input.wrapResult(state.children[0]._decode(input, options));

  var result = state['default'];
  var present = true;

  var prevKey = null;
  if (state.key !== null)
    prevKey = input.enterKey(state.key);

  // Check if tag is there
  if (state.optional) {
    var tag = null;
    if (state.explicit !== null)
      tag = state.explicit;
    else if (state.implicit !== null)
      tag = state.implicit;
    else if (state.tag !== null)
      tag = state.tag;

    if (tag === null && !state.any) {
      // Trial and Error
      var save = input.save();
      try {
        if (state.choice === null)
          this._decodeGeneric(state.tag, input, options);
        else
          this._decodeChoice(input, options);
        present = true;
      } catch (e) {
        present = false;
      }
      input.restore(save);
    } else {
      present = this._peekTag(input, tag, state.any);

      if (input.isError(present))
        return present;
    }
  }

  // Push object on stack
  var prevObj;
  if (state.obj && present)
    prevObj = input.enterObject();

  if (present) {
    // Unwrap explicit values
    if (state.explicit !== null) {
      var explicit = this._decodeTag(input, state.explicit);
      if (input.isError(explicit))
        return explicit;
      input = explicit;
    }

    var start = input.offset;

    // Unwrap implicit and normal values
    if (state.use === null && state.choice === null) {
      if (state.any)
        var save = input.save();
      var body = this._decodeTag(
        input,
        state.implicit !== null ? state.implicit : state.tag,
        state.any
      );
      if (input.isError(body))
        return body;

      if (state.any)
        result = input.raw(save);
      else
        input = body;
    }

    if (options && options.track && state.tag !== null)
      options.track(input.path(), start, input.length, 'tagged');

    if (options && options.track && state.tag !== null)
      options.track(input.path(), input.offset, input.length, 'content');

    // Select proper method for tag
    if (state.any)
      result = result;
    else if (state.choice === null)
      result = this._decodeGeneric(state.tag, input, options);
    else
      result = this._decodeChoice(input, options);

    if (input.isError(result))
      return result;

    // Decode children
    if (!state.any && state.choice === null && state.children !== null) {
      state.children.forEach(function decodeChildren(child) {
        // NOTE: We are ignoring errors here, to let parser continue with other
        // parts of encoded data
        child._decode(input, options);
      });
    }

    // Decode contained/encoded by schema, only in bit or octet strings
    if (state.contains && (state.tag === 'octstr' || state.tag === 'bitstr')) {
      var data = new DecoderBuffer(result);
      result = this._getUse(state.contains, input._reporterState.obj)
          ._decode(data, options);
    }
  }

  // Pop object
  if (state.obj && present)
    result = input.leaveObject(prevObj);

  // Set key
  if (state.key !== null && (result !== null || present === true))
    input.leaveKey(prevKey, state.key, result);
  else if (prevKey !== null)
    input.exitKey(prevKey);

  return result;
};

Node.prototype._decodeGeneric = function decodeGeneric(tag, input, options) {
  var state = this._baseState;

  if (tag === 'seq' || tag === 'set')
    return null;
  if (tag === 'seqof' || tag === 'setof')
    return this._decodeList(input, tag, state.args[0], options);
  else if (/str$/.test(tag))
    return this._decodeStr(input, tag, options);
  else if (tag === 'objid' && state.args)
    return this._decodeObjid(input, state.args[0], state.args[1], options);
  else if (tag === 'objid')
    return this._decodeObjid(input, null, null, options);
  else if (tag === 'gentime' || tag === 'utctime')
    return this._decodeTime(input, tag, options);
  else if (tag === 'null_')
    return this._decodeNull(input, options);
  else if (tag === 'bool')
    return this._decodeBool(input, options);
  else if (tag === 'objDesc')
    return this._decodeStr(input, tag, options);
  else if (tag === 'int' || tag === 'enum')
    return this._decodeInt(input, state.args && state.args[0], options);

  if (state.use !== null) {
    return this._getUse(state.use, input._reporterState.obj)
        ._decode(input, options);
  } else {
    return input.error('unknown tag: ' + tag);
  }
};

Node.prototype._getUse = function _getUse(entity, obj) {

  var state = this._baseState;
  // Create altered use decoder if implicit is set
  state.useDecoder = this._use(entity, obj);
  assert(state.useDecoder._baseState.parent === null);
  state.useDecoder = state.useDecoder._baseState.children[0];
  if (state.implicit !== state.useDecoder._baseState.implicit) {
    state.useDecoder = state.useDecoder.clone();
    state.useDecoder._baseState.implicit = state.implicit;
  }
  return state.useDecoder;
};

Node.prototype._decodeChoice = function decodeChoice(input, options) {
  var state = this._baseState;
  var result = null;
  var match = false;

  Object.keys(state.choice).some(function(key) {
    var save = input.save();
    var node = state.choice[key];
    try {
      var value = node._decode(input, options);
      if (input.isError(value))
        return false;

      result = { type: key, value: value };
      match = true;
    } catch (e) {
      input.restore(save);
      return false;
    }
    return true;
  }, this);

  if (!match)
    return input.error('Choice not matched');

  return result;
};

//
// Encoding
//

Node.prototype._createEncoderBuffer = function createEncoderBuffer(data) {
  return new EncoderBuffer(data, this.reporter);
};

Node.prototype._encode = function encode(data, reporter, parent) {
  var state = this._baseState;
  if (state['default'] !== null && state['default'] === data)
    return;

  var result = this._encodeValue(data, reporter, parent);
  if (result === undefined)
    return;

  if (this._skipDefault(result, reporter, parent))
    return;

  return result;
};

Node.prototype._encodeValue = function encode(data, reporter, parent) {
  var state = this._baseState;

  // Decode root node
  if (state.parent === null)
    return state.children[0]._encode(data, reporter || new Reporter());

  var result = null;

  // Set reporter to share it with a child class
  this.reporter = reporter;

  // Check if data is there
  if (state.optional && data === undefined) {
    if (state['default'] !== null)
      data = state['default']
    else
      return;
  }

  // Encode children first
  var content = null;
  var primitive = false;
  if (state.any) {
    // Anything that was given is translated to buffer
    result = this._createEncoderBuffer(data);
  } else if (state.choice) {
    result = this._encodeChoice(data, reporter);
  } else if (state.contains) {
    content = this._getUse(state.contains, parent)._encode(data, reporter);
    primitive = true;
  } else if (state.children) {
    content = state.children.map(function(child) {
      if (child._baseState.tag === 'null_')
        return child._encode(null, reporter, data);

      if (child._baseState.key === null)
        return reporter.error('Child should have a key');
      var prevKey = reporter.enterKey(child._baseState.key);

      if (typeof data !== 'object')
        return reporter.error('Child expected, but input is not object');

      var res = child._encode(data[child._baseState.key], reporter, data);
      reporter.leaveKey(prevKey);

      return res;
    }, this).filter(function(child) {
      return child;
    });
    content = this._createEncoderBuffer(content);
  } else {
    if (state.tag === 'seqof' || state.tag === 'setof') {
      // TODO(indutny): this should be thrown on DSL level
      if (!(state.args && state.args.length === 1))
        return reporter.error('Too many args for : ' + state.tag);

      if (!Array.isArray(data))
        return reporter.error('seqof/setof, but data is not Array');

      var child = this.clone();
      child._baseState.implicit = null;
      content = this._createEncoderBuffer(data.map(function(item) {
        var state = this._baseState;

        return this._getUse(state.args[0], data)._encode(item, reporter);
      }, child));
    } else if (state.use !== null) {
      result = this._getUse(state.use, parent)._encode(data, reporter);
    } else {
      content = this._encodePrimitive(state.tag, data);
      primitive = true;
    }
  }

  // Encode data itself
  var result;
  if (!state.any && state.choice === null) {
    var tag = state.implicit !== null ? state.implicit : state.tag;
    var cls = state.implicit === null ? 'universal' : 'context';

    if (tag === null) {
      if (state.use === null)
        reporter.error('Tag could be ommited only for .use()');
    } else {
      if (state.use === null)
        result = this._encodeComposite(tag, primitive, cls, content);
    }
  }

  // Wrap in explicit
  if (state.explicit !== null)
    result = this._encodeComposite(state.explicit, false, 'context', result);

  return result;
};

Node.prototype._encodeChoice = function encodeChoice(data, reporter) {
  var state = this._baseState;

  var node = state.choice[data.type];
  if (!node) {
    assert(
        false,
        data.type + ' not found in ' +
            JSON.stringify(Object.keys(state.choice)));
  }
  return node._encode(data.value, reporter);
};

Node.prototype._encodePrimitive = function encodePrimitive(tag, data) {
  var state = this._baseState;

  if (/str$/.test(tag))
    return this._encodeStr(data, tag);
  else if (tag === 'objid' && state.args)
    return this._encodeObjid(data, state.reverseArgs[0], state.args[1]);
  else if (tag === 'objid')
    return this._encodeObjid(data, null, null);
  else if (tag === 'gentime' || tag === 'utctime')
    return this._encodeTime(data, tag);
  else if (tag === 'null_')
    return this._encodeNull();
  else if (tag === 'int' || tag === 'enum')
    return this._encodeInt(data, state.args && state.reverseArgs[0]);
  else if (tag === 'bool')
    return this._encodeBool(data);
  else if (tag === 'objDesc')
    return this._encodeStr(data, tag);
  else
    throw new Error('Unsupported tag: ' + tag);
};

Node.prototype._isNumstr = function isNumstr(str) {
  return /^[0-9 ]*$/.test(str);
};

Node.prototype._isPrintstr = function isPrintstr(str) {
  return /^[A-Za-z0-9 '\(\)\+,\-\.\/:=\?]*$/.test(str);
};

},{"../base":76,"minimalistic-assert":180}],78:[function(require,module,exports){
function Reporter(r){this._reporterState={obj:null,path:[],options:r||{},errors:[]}}function ReporterError(r,t){this.path=r,this.rethrow(t)}var inherits=require("inherits");exports.Reporter=Reporter,Reporter.prototype.isError=function(r){return r instanceof ReporterError},Reporter.prototype.save=function(){var r=this._reporterState;return{obj:r.obj,pathLen:r.path.length}},Reporter.prototype.restore=function(r){var t=this._reporterState;t.obj=r.obj,t.path=t.path.slice(0,r.pathLen)},Reporter.prototype.enterKey=function(r){return this._reporterState.path.push(r)},Reporter.prototype.exitKey=function(r){var t=this._reporterState;t.path=t.path.slice(0,r-1)},Reporter.prototype.leaveKey=function(r,t,e){var o=this._reporterState;this.exitKey(r),null!==o.obj&&(o.obj[t]=e)},Reporter.prototype.path=function(){return this._reporterState.path.join("/")},Reporter.prototype.enterObject=function(){var r=this._reporterState,t=r.obj;return r.obj={},t},Reporter.prototype.leaveObject=function(r){var t=this._reporterState,e=t.obj;return t.obj=r,e},Reporter.prototype.error=function(r){var t,e=this._reporterState,o=r instanceof ReporterError;if(t=o?r:new ReporterError(e.path.map(function(r){return"["+JSON.stringify(r)+"]"}).join(""),r.message||r,r.stack),!e.options.partial)throw t;return o||e.errors.push(t),t},Reporter.prototype.wrapResult=function(r){var t=this._reporterState;return t.options.partial?{result:this.isError(r)?null:r,errors:t.errors}:r},inherits(ReporterError,Error),ReporterError.prototype.rethrow=function(r){if(this.message=r+" at: "+(this.path||"(shallow)"),Error.captureStackTrace&&Error.captureStackTrace(this,ReporterError),!this.stack)try{throw new Error(this.message)}catch(r){this.stack=r.stack}return this};

},{"inherits":174}],79:[function(require,module,exports){
var constants=require("../constants");exports.tagClass={0:"universal",1:"application",2:"context",3:"private"},exports.tagClassByName=constants._reverse(exports.tagClass),exports.tag={0:"end",1:"bool",2:"int",3:"bitstr",4:"octstr",5:"null_",6:"objid",7:"objDesc",8:"external",9:"real",10:"enum",11:"embed",12:"utf8str",13:"relativeOid",16:"seq",17:"set",18:"numstr",19:"printstr",20:"t61str",21:"videostr",22:"ia5str",23:"utctime",24:"gentime",25:"graphstr",26:"iso646str",27:"genstr",28:"unistr",29:"charstr",30:"bmpstr"},exports.tagByName=constants._reverse(exports.tag);

},{"../constants":80}],80:[function(require,module,exports){
var constants=exports;constants._reverse=function(r){var e={};return Object.keys(r).forEach(function(n){(0|n)==n&&(n|=0);var t=r[n];e[t]=n}),e},constants.der=require("./der");

},{"./der":79}],81:[function(require,module,exports){
function DERDecoder(r){this.enc="der",this.name=r.name,this.entity=r,this.tree=new DERNode,this.tree._init(r.body)}function DERNode(r){base.Node.call(this,"der",r)}function derDecodeTag(r,e){var t=r.readUInt8(e);if(r.isError(t))return t;var i=der.tagClass[t>>6],o=0==(32&t);if(31==(31&t)){var n=t;for(t=0;128==(128&n);){if(n=r.readUInt8(e),r.isError(n))return n;t<<=7,t|=127&n}}else t&=31;return{cls:i,primitive:o,tag:t,tagStr:der.tag[t]}}function derDecodeLen(r,e,t){var i=r.readUInt8(t);if(r.isError(i))return i;if(!e&&128===i)return null;if(0==(128&i))return i;var o=127&i;if(o>4)return r.error("length octect is too long");i=0;for(var n=0;n<o;n++){i<<=8;var s=r.readUInt8(t);if(r.isError(s))return s;i|=s}return i}var inherits=require("inherits"),asn1=require("../../asn1"),base=asn1.base,bignum=asn1.bignum,der=asn1.constants.der;module.exports=DERDecoder,DERDecoder.prototype.decode=function(r,e){return r instanceof base.DecoderBuffer||(r=new base.DecoderBuffer(r,e)),this.tree._decode(r,e)},inherits(DERNode,base.Node),DERNode.prototype._peekTag=function(r,e,t){if(r.isEmpty())return!1;var i=r.save(),o=derDecodeTag(r,'Failed to peek tag: "'+e+'"');return r.isError(o)?o:(r.restore(i),o.tag===e||o.tagStr===e||o.tagStr+"of"===e||t)},DERNode.prototype._decodeTag=function(r,e,t){var i=derDecodeTag(r,'Failed to decode tag of "'+e+'"');if(r.isError(i))return i;var o=derDecodeLen(r,i.primitive,'Failed to get length of "'+e+'"');if(r.isError(o))return o;if(!t&&i.tag!==e&&i.tagStr!==e&&i.tagStr+"of"!==e)return r.error('Failed to match tag: "'+e+'"');if(i.primitive||null!==o)return r.skip(o,'Failed to match body of: "'+e+'"');var n=r.save(),s=this._skipUntilEnd(r,'Failed to skip indefinite length body: "'+this.tag+'"');return r.isError(s)?s:(o=r.offset-n.offset,r.restore(n),r.skip(o,'Failed to match body of: "'+e+'"'))},DERNode.prototype._skipUntilEnd=function(r,e){for(;;){var t=derDecodeTag(r,e);if(r.isError(t))return t;var i=derDecodeLen(r,t.primitive,e);if(r.isError(i))return i;var o;if(o=t.primitive||null!==i?r.skip(i):this._skipUntilEnd(r,e),r.isError(o))return o;if("end"===t.tagStr)break}},DERNode.prototype._decodeList=function(r,e,t,i){for(var o=[];!r.isEmpty();){var n=this._peekTag(r,"end");if(r.isError(n))return n;var s=t.decode(r,"der",i);if(r.isError(s)&&n)break;o.push(s)}return o},DERNode.prototype._decodeStr=function(r,e){if("bitstr"===e){var t=r.readUInt8();return r.isError(t)?t:{unused:t,data:r.raw()}}if("bmpstr"===e){var i=r.raw();if(i.length%2==1)return r.error("Decoding of string type: bmpstr length mismatch");for(var o="",n=0;n<i.length/2;n++)o+=String.fromCharCode(i.readUInt16BE(2*n));return o}if("numstr"===e){var s=r.raw().toString("ascii");return this._isNumstr(s)?s:r.error("Decoding of string type: numstr unsupported characters")}if("octstr"===e)return r.raw();if("objDesc"===e)return r.raw();if("printstr"===e){var a=r.raw().toString("ascii");return this._isPrintstr(a)?a:r.error("Decoding of string type: printstr unsupported characters")}return/str$/.test(e)?r.raw().toString():r.error("Decoding of string type: "+e+" unsupported")},DERNode.prototype._decodeObjid=function(r,e,t){for(var i,o=[],n=0;!r.isEmpty();){var s=r.readUInt8();n<<=7,n|=127&s,0==(128&s)&&(o.push(n),n=0)}128&s&&o.push(n);var a=o[0]/40|0,d=o[0]%40;if(i=t?o:[a,d].concat(o.slice(1)),e){var u=e[i.join(" ")];void 0===u&&(u=e[i.join(".")]),void 0!==u&&(i=u)}return i},DERNode.prototype._decodeTime=function(r,e){var t=r.raw().toString();if("gentime"===e)var i=0|t.slice(0,4),o=0|t.slice(4,6),n=0|t.slice(6,8),s=0|t.slice(8,10),a=0|t.slice(10,12),d=0|t.slice(12,14);else{if("utctime"!==e)return r.error("Decoding "+e+" time is not supported yet");var i=0|t.slice(0,2),o=0|t.slice(2,4),n=0|t.slice(4,6),s=0|t.slice(6,8),a=0|t.slice(8,10),d=0|t.slice(10,12);i=i<70?2e3+i:1900+i}return Date.UTC(i,o-1,n,s,a,d,0)},DERNode.prototype._decodeNull=function(r){return null},DERNode.prototype._decodeBool=function(r){var e=r.readUInt8();return r.isError(e)?e:0!==e},DERNode.prototype._decodeInt=function(r,e){var t=r.raw(),i=new bignum(t);return e&&(i=e[i.toString(10)]||i),i},DERNode.prototype._use=function(r,e){return"function"==typeof r&&(r=r(e)),r._getDecoder("der").tree};

},{"../../asn1":73,"inherits":174}],82:[function(require,module,exports){
var decoders=exports;decoders.der=require("./der"),decoders.pem=require("./pem");

},{"./der":81,"./pem":83}],83:[function(require,module,exports){
function PEMDecoder(e){DERDecoder.call(this,e),this.enc="pem"}var inherits=require("inherits"),Buffer=require("buffer").Buffer,DERDecoder=require("./der");inherits(PEMDecoder,DERDecoder),module.exports=PEMDecoder,PEMDecoder.prototype.decode=function(e,r){for(var o=e.toString().split(/[\r\n]+/g),i=r.label.toUpperCase(),t=/^-----(BEGIN|END) ([^-]+)-----$/,c=-1,n=-1,f=0;f<o.length;f++){var a=o[f].match(t);if(null!==a&&a[2]===i){if(-1!==c){if("END"!==a[1])break;n=f;break}if("BEGIN"!==a[1])break;c=f}}if(-1===c||-1===n)throw new Error("PEM section not found for: "+i);var d=o.slice(c+1,n).join("");d.replace(/[^a-z0-9\+\/=]+/gi,"");var D=new Buffer(d,"base64");return DERDecoder.prototype.decode.call(this,D,r)};

},{"./der":81,"buffer":120,"inherits":174}],84:[function(require,module,exports){
function DEREncoder(e){this.enc="der",this.name=e.name,this.entity=e,this.tree=new DERNode,this.tree._init(e.body)}function DERNode(e){base.Node.call(this,"der",e)}function two(e){return e<10?"0"+e:e}function encodeTag(e,r,t,n){var o;if("seqof"===e?e="seq":"setof"===e&&(e="set"),der.tagByName.hasOwnProperty(e))o=der.tagByName[e];else{if("number"!=typeof e||(0|e)!==e)return n.error("Unknown tag: "+e);o=e}return o>=31?n.error("Multi-octet tag encoding unsupported"):(r||(o|=32),o|=der.tagClassByName[t||"universal"]<<6)}var inherits=require("inherits"),Buffer=require("buffer").Buffer,asn1=require("../../asn1"),base=asn1.base,der=asn1.constants.der;module.exports=DEREncoder,DEREncoder.prototype.encode=function(e,r){return this.tree._encode(e,r).join()},inherits(DERNode,base.Node),DERNode.prototype._encodeComposite=function(e,r,t,n){var o=encodeTag(e,r,t,this.reporter);if(n.length<128){return(s=new Buffer(2))[0]=o,s[1]=n.length,this._createEncoderBuffer([s,n])}for(var i=1,f=n.length;f>=256;f>>=8)i++;var s=new Buffer(2+i);s[0]=o,s[1]=128|i;for(var f=1+i,u=n.length;u>0;f--,u>>=8)s[f]=255&u;return this._createEncoderBuffer([s,n])},DERNode.prototype._encodeStr=function(e,r){if("bitstr"===r)return this._createEncoderBuffer([0|e.unused,e.data]);if("bmpstr"===r){for(var t=new Buffer(2*e.length),n=0;n<e.length;n++)t.writeUInt16BE(e.charCodeAt(n),2*n);return this._createEncoderBuffer(t)}return"numstr"===r?this._isNumstr(e)?this._createEncoderBuffer(e):this.reporter.error("Encoding of string type: numstr supports only digits and space"):"printstr"===r?this._isPrintstr(e)?this._createEncoderBuffer(e):this.reporter.error("Encoding of string type: printstr supports only latin upper and lower case letters, digits, space, apostrophe, left and rigth parenthesis, plus sign, comma, hyphen, dot, slash, colon, equal sign, question mark"):/str$/.test(r)?this._createEncoderBuffer(e):"objDesc"===r?this._createEncoderBuffer(e):this.reporter.error("Encoding of string type: "+r+" unsupported")},DERNode.prototype._encodeObjid=function(e,r,t){if("string"==typeof e){if(!r)return this.reporter.error("string objid given, but no values map found");if(!r.hasOwnProperty(e))return this.reporter.error("objid not found in values map");e=r[e].split(/[\s\.]+/g);for(o=0;o<e.length;o++)e[o]|=0}else if(Array.isArray(e)){e=e.slice();for(o=0;o<e.length;o++)e[o]|=0}if(!Array.isArray(e))return this.reporter.error("objid() should be either array or string, got: "+JSON.stringify(e));if(!t){if(e[1]>=40)return this.reporter.error("Second objid identifier OOB");e.splice(0,2,40*e[0]+e[1])}for(var n=0,o=0;o<e.length;o++){s=e[o];for(n++;s>=128;s>>=7)n++}for(var i=new Buffer(n),f=i.length-1,o=e.length-1;o>=0;o--){var s=e[o];for(i[f--]=127&s;(s>>=7)>0;)i[f--]=128|127&s}return this._createEncoderBuffer(i)},DERNode.prototype._encodeTime=function(e,r){var t,n=new Date(e);return"gentime"===r?t=[two(n.getFullYear()),two(n.getUTCMonth()+1),two(n.getUTCDate()),two(n.getUTCHours()),two(n.getUTCMinutes()),two(n.getUTCSeconds()),"Z"].join(""):"utctime"===r?t=[two(n.getFullYear()%100),two(n.getUTCMonth()+1),two(n.getUTCDate()),two(n.getUTCHours()),two(n.getUTCMinutes()),two(n.getUTCSeconds()),"Z"].join(""):this.reporter.error("Encoding "+r+" time is not supported yet"),this._encodeStr(t,"octstr")},DERNode.prototype._encodeNull=function(){return this._createEncoderBuffer("")},DERNode.prototype._encodeInt=function(e,r){if("string"==typeof e){if(!r)return this.reporter.error("String int or enum given, but no values map");if(!r.hasOwnProperty(e))return this.reporter.error("Values map doesn't contain: "+JSON.stringify(e));e=r[e]}if("number"!=typeof e&&!Buffer.isBuffer(e)){var t=e.toArray();!e.sign&&128&t[0]&&t.unshift(0),e=new Buffer(t)}if(Buffer.isBuffer(e)){n=e.length;0===e.length&&n++;i=new Buffer(n);return e.copy(i),0===e.length&&(i[0]=0),this._createEncoderBuffer(i)}if(e<128)return this._createEncoderBuffer(e);if(e<256)return this._createEncoderBuffer([0,e]);for(var n=1,o=e;o>=256;o>>=8)n++;for(var i,o=(i=new Array(n)).length-1;o>=0;o--)i[o]=255&e,e>>=8;return 128&i[0]&&i.unshift(0),this._createEncoderBuffer(new Buffer(i))},DERNode.prototype._encodeBool=function(e){return this._createEncoderBuffer(e?255:0)},DERNode.prototype._use=function(e,r){return"function"==typeof e&&(e=e(r)),e._getEncoder("der").tree},DERNode.prototype._skipDefault=function(e,r,t){var n,o=this._baseState;if(null===o.default)return!1;var i=e.join();if(void 0===o.defaultBuffer&&(o.defaultBuffer=this._encodeValue(o.default,r,t).join()),i.length!==o.defaultBuffer.length)return!1;for(n=0;n<i.length;n++)if(i[n]!==o.defaultBuffer[n])return!1;return!0};

},{"../../asn1":73,"buffer":120,"inherits":174}],85:[function(require,module,exports){
var encoders=exports;encoders.der=require("./der"),encoders.pem=require("./pem");

},{"./der":84,"./pem":86}],86:[function(require,module,exports){
function PEMEncoder(e){DEREncoder.call(this,e),this.enc="pem"}var inherits=require("inherits"),DEREncoder=require("./der");inherits(PEMEncoder,DEREncoder),module.exports=PEMEncoder,PEMEncoder.prototype.encode=function(e,r){for(var n=DEREncoder.prototype.encode.call(this,e).toString("base64"),o=["-----BEGIN "+r.label+"-----"],E=0;E<n.length;E+=64)o.push(n.slice(E,E+64));return o.push("-----END "+r.label+"-----"),o.join("\n")};

},{"./der":84,"inherits":174}],87:[function(require,module,exports){
(function (global){
"use strict";function compare(e,t){if(e===t)return 0;for(var r=e.length,n=t.length,i=0,a=Math.min(r,n);i<a;++i)if(e[i]!==t[i]){r=e[i],n=t[i];break}return r<n?-1:n<r?1:0}function isBuffer(e){return global.Buffer&&"function"==typeof global.Buffer.isBuffer?global.Buffer.isBuffer(e):!(null==e||!e._isBuffer)}function pToString(e){return Object.prototype.toString.call(e)}function isView(e){return!isBuffer(e)&&("function"==typeof global.ArrayBuffer&&("function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(e):!!e&&(e instanceof DataView||!!(e.buffer&&e.buffer instanceof ArrayBuffer))))}function getName(e){if(util.isFunction(e)){if(functionsHaveNames)return e.name;var t=e.toString().match(regex);return t&&t[1]}}function truncate(e,t){return"string"==typeof e?e.length<t?e:e.slice(0,t):e}function inspect(e){if(functionsHaveNames||!util.isFunction(e))return util.inspect(e);var t=getName(e);return"[Function"+(t?": "+t:"")+"]"}function getMessage(e){return truncate(inspect(e.actual),128)+" "+e.operator+" "+truncate(inspect(e.expected),128)}function fail(e,t,r,n,i){throw new assert.AssertionError({message:r,actual:e,expected:t,operator:n,stackStartFunction:i})}function ok(e,t){e||fail(e,!0,t,"==",assert.ok)}function _deepEqual(e,t,r,n){if(e===t)return!0;if(isBuffer(e)&&isBuffer(t))return 0===compare(e,t);if(util.isDate(e)&&util.isDate(t))return e.getTime()===t.getTime();if(util.isRegExp(e)&&util.isRegExp(t))return e.source===t.source&&e.global===t.global&&e.multiline===t.multiline&&e.lastIndex===t.lastIndex&&e.ignoreCase===t.ignoreCase;if(null!==e&&"object"==typeof e||null!==t&&"object"==typeof t){if(isView(e)&&isView(t)&&pToString(e)===pToString(t)&&!(e instanceof Float32Array||e instanceof Float64Array))return 0===compare(new Uint8Array(e.buffer),new Uint8Array(t.buffer));if(isBuffer(e)!==isBuffer(t))return!1;var i=(n=n||{actual:[],expected:[]}).actual.indexOf(e);return-1!==i&&i===n.expected.indexOf(t)||(n.actual.push(e),n.expected.push(t),objEquiv(e,t,r,n))}return r?e===t:e==t}function isArguments(e){return"[object Arguments]"==Object.prototype.toString.call(e)}function objEquiv(e,t,r,n){if(null===e||void 0===e||null===t||void 0===t)return!1;if(util.isPrimitive(e)||util.isPrimitive(t))return e===t;if(r&&Object.getPrototypeOf(e)!==Object.getPrototypeOf(t))return!1;var i=isArguments(e),a=isArguments(t);if(i&&!a||!i&&a)return!1;if(i)return e=pSlice.call(e),t=pSlice.call(t),_deepEqual(e,t,r);var s,o,u=objectKeys(e),f=objectKeys(t);if(u.length!==f.length)return!1;for(u.sort(),f.sort(),o=u.length-1;o>=0;o--)if(u[o]!==f[o])return!1;for(o=u.length-1;o>=0;o--)if(s=u[o],!_deepEqual(e[s],t[s],r,n))return!1;return!0}function notDeepStrictEqual(e,t,r){_deepEqual(e,t,!0)&&fail(e,t,r,"notDeepStrictEqual",notDeepStrictEqual)}function expectedException(e,t){if(!e||!t)return!1;if("[object RegExp]"==Object.prototype.toString.call(t))return t.test(e);try{if(e instanceof t)return!0}catch(e){}return!Error.isPrototypeOf(t)&&!0===t.call({},e)}function _tryBlock(e){var t;try{e()}catch(e){t=e}return t}function _throws(e,t,r,n){var i;if("function"!=typeof t)throw new TypeError('"block" argument must be a function');"string"==typeof r&&(n=r,r=null),i=_tryBlock(t),n=(r&&r.name?" ("+r.name+").":".")+(n?" "+n:"."),e&&!i&&fail(i,r,"Missing expected exception"+n);var a="string"==typeof n,s=!e&&util.isError(i),o=!e&&i&&!r;if((s&&a&&expectedException(i,r)||o)&&fail(i,r,"Got unwanted exception"+n),e&&i&&r&&!expectedException(i,r)||!e&&i)throw i}var util=require("util/"),hasOwn=Object.prototype.hasOwnProperty,pSlice=Array.prototype.slice,functionsHaveNames="foo"===function(){}.name,assert=module.exports=ok,regex=/\s*function\s+([^\(\s]*)\s*/;assert.AssertionError=function(e){this.name="AssertionError",this.actual=e.actual,this.expected=e.expected,this.operator=e.operator,e.message?(this.message=e.message,this.generatedMessage=!1):(this.message=getMessage(this),this.generatedMessage=!0);var t=e.stackStartFunction||fail;if(Error.captureStackTrace)Error.captureStackTrace(this,t);else{var r=new Error;if(r.stack){var n=r.stack,i=getName(t),a=n.indexOf("\n"+i);if(a>=0){var s=n.indexOf("\n",a+1);n=n.substring(s+1)}this.stack=n}}},util.inherits(assert.AssertionError,Error),assert.fail=fail,assert.ok=ok,assert.equal=function(e,t,r){e!=t&&fail(e,t,r,"==",assert.equal)},assert.notEqual=function(e,t,r){e==t&&fail(e,t,r,"!=",assert.notEqual)},assert.deepEqual=function(e,t,r){_deepEqual(e,t,!1)||fail(e,t,r,"deepEqual",assert.deepEqual)},assert.deepStrictEqual=function(e,t,r){_deepEqual(e,t,!0)||fail(e,t,r,"deepStrictEqual",assert.deepStrictEqual)},assert.notDeepEqual=function(e,t,r){_deepEqual(e,t,!1)&&fail(e,t,r,"notDeepEqual",assert.notDeepEqual)},assert.notDeepStrictEqual=notDeepStrictEqual,assert.strictEqual=function(e,t,r){e!==t&&fail(e,t,r,"===",assert.strictEqual)},assert.notStrictEqual=function(e,t,r){e===t&&fail(e,t,r,"!==",assert.notStrictEqual)},assert.throws=function(e,t,r){_throws(!0,e,t,r)},assert.doesNotThrow=function(e,t,r){_throws(!1,e,t,r)},assert.ifError=function(e){if(e)throw e};var objectKeys=Object.keys||function(e){var t=[];for(var r in e)hasOwn.call(e,r)&&t.push(r);return t};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"util/":229}],88:[function(require,module,exports){
'use strict'

},{}],89:[function(require,module,exports){
!function(t,i){"use strict";function r(t,i){if(!t)throw new Error(i||"Assertion failed")}function h(t,i){t.super_=i;var r=function(){};r.prototype=i.prototype,t.prototype=new r,t.prototype.constructor=t}function n(t,i,r){if(n.isBN(t))return t;this.negative=0,this.words=null,this.length=0,this.red=null,null!==t&&("le"!==i&&"be"!==i||(r=i,i=10),this._init(t||0,i||10,r||"be"))}function e(t,i,r){for(var h=0,n=Math.min(t.length,r),e=i;e<n;e++){var o=t.charCodeAt(e)-48;h<<=4,h|=o>=49&&o<=54?o-49+10:o>=17&&o<=22?o-17+10:15&o}return h}function o(t,i,r,h){for(var n=0,e=Math.min(t.length,r),o=i;o<e;o++){var s=t.charCodeAt(o)-48;n*=h,n+=s>=49?s-49+10:s>=17?s-17+10:s}return n}function s(t,i,r){r.negative=i.negative^t.negative;var h=t.length+i.length|0;r.length=h,h=h-1|0;var n=0|t.words[0],e=0|i.words[0],o=n*e,s=67108863&o,u=o/67108864|0;r.words[0]=s;for(var a=1;a<h;a++){for(var l=u>>>26,m=67108863&u,f=Math.min(a,i.length-1),d=Math.max(0,a-t.length+1);d<=f;d++){var p=a-d|0;l+=(o=(n=0|t.words[p])*(e=0|i.words[d])+m)/67108864|0,m=67108863&o}r.words[a]=0|m,u=0|l}return 0!==u?r.words[a]=0|u:r.length--,r.strip()}function u(t,i,r){return(new a).mulp(t,i,r)}function a(t,i){this.x=t,this.y=i}function l(t,i){this.name=t,this.p=new n(i,16),this.n=this.p.bitLength(),this.k=new n(1).iushln(this.n).isub(this.p),this.tmp=this._tmp()}function m(){l.call(this,"k256","ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")}function f(){l.call(this,"p224","ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")}function d(){l.call(this,"p192","ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")}function p(){l.call(this,"25519","7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")}function M(t){if("string"==typeof t){var i=n._prime(t);this.m=i.p,this.prime=i}else r(t.gtn(1),"modulus must be greater than 1"),this.m=t,this.prime=null}function v(t){M.call(this,t),this.shift=this.m.bitLength(),this.shift%26!=0&&(this.shift+=26-this.shift%26),this.r=new n(1).iushln(this.shift),this.r2=this.imod(this.r.sqr()),this.rinv=this.r._invmp(this.m),this.minv=this.rinv.mul(this.r).isubn(1).div(this.m),this.minv=this.minv.umod(this.r),this.minv=this.r.sub(this.minv)}"object"==typeof t?t.exports=n:i.BN=n,n.BN=n,n.wordSize=26;var g;try{g=require("buffer").Buffer}catch(t){}n.isBN=function(t){return t instanceof n||null!==t&&"object"==typeof t&&t.constructor.wordSize===n.wordSize&&Array.isArray(t.words)},n.max=function(t,i){return t.cmp(i)>0?t:i},n.min=function(t,i){return t.cmp(i)<0?t:i},n.prototype._init=function(t,i,h){if("number"==typeof t)return this._initNumber(t,i,h);if("object"==typeof t)return this._initArray(t,i,h);"hex"===i&&(i=16),r(i===(0|i)&&i>=2&&i<=36);var n=0;"-"===(t=t.toString().replace(/\s+/g,""))[0]&&n++,16===i?this._parseHex(t,n):this._parseBase(t,i,n),"-"===t[0]&&(this.negative=1),this.strip(),"le"===h&&this._initArray(this.toArray(),i,h)},n.prototype._initNumber=function(t,i,h){t<0&&(this.negative=1,t=-t),t<67108864?(this.words=[67108863&t],this.length=1):t<4503599627370496?(this.words=[67108863&t,t/67108864&67108863],this.length=2):(r(t<9007199254740992),this.words=[67108863&t,t/67108864&67108863,1],this.length=3),"le"===h&&this._initArray(this.toArray(),i,h)},n.prototype._initArray=function(t,i,h){if(r("number"==typeof t.length),t.length<=0)return this.words=[0],this.length=1,this;this.length=Math.ceil(t.length/3),this.words=new Array(this.length);for(var n=0;n<this.length;n++)this.words[n]=0;var e,o,s=0;if("be"===h)for(n=t.length-1,e=0;n>=0;n-=3)o=t[n]|t[n-1]<<8|t[n-2]<<16,this.words[e]|=o<<s&67108863,this.words[e+1]=o>>>26-s&67108863,(s+=24)>=26&&(s-=26,e++);else if("le"===h)for(n=0,e=0;n<t.length;n+=3)o=t[n]|t[n+1]<<8|t[n+2]<<16,this.words[e]|=o<<s&67108863,this.words[e+1]=o>>>26-s&67108863,(s+=24)>=26&&(s-=26,e++);return this.strip()},n.prototype._parseHex=function(t,i){this.length=Math.ceil((t.length-i)/6),this.words=new Array(this.length);for(var r=0;r<this.length;r++)this.words[r]=0;var h,n,o=0;for(r=t.length-6,h=0;r>=i;r-=6)n=e(t,r,r+6),this.words[h]|=n<<o&67108863,this.words[h+1]|=n>>>26-o&4194303,(o+=24)>=26&&(o-=26,h++);r+6!==i&&(n=e(t,i,r+6),this.words[h]|=n<<o&67108863,this.words[h+1]|=n>>>26-o&4194303),this.strip()},n.prototype._parseBase=function(t,i,r){this.words=[0],this.length=1;for(var h=0,n=1;n<=67108863;n*=i)h++;h--,n=n/i|0;for(var e=t.length-r,s=e%h,u=Math.min(e,e-s)+r,a=0,l=r;l<u;l+=h)a=o(t,l,l+h,i),this.imuln(n),this.words[0]+a<67108864?this.words[0]+=a:this._iaddn(a);if(0!==s){var m=1;for(a=o(t,l,t.length,i),l=0;l<s;l++)m*=i;this.imuln(m),this.words[0]+a<67108864?this.words[0]+=a:this._iaddn(a)}},n.prototype.copy=function(t){t.words=new Array(this.length);for(var i=0;i<this.length;i++)t.words[i]=this.words[i];t.length=this.length,t.negative=this.negative,t.red=this.red},n.prototype.clone=function(){var t=new n(null);return this.copy(t),t},n.prototype._expand=function(t){for(;this.length<t;)this.words[this.length++]=0;return this},n.prototype.strip=function(){for(;this.length>1&&0===this.words[this.length-1];)this.length--;return this._normSign()},n.prototype._normSign=function(){return 1===this.length&&0===this.words[0]&&(this.negative=0),this},n.prototype.inspect=function(){return(this.red?"<BN-R: ":"<BN: ")+this.toString(16)+">"};var c=["","0","00","000","0000","00000","000000","0000000","00000000","000000000","0000000000","00000000000","000000000000","0000000000000","00000000000000","000000000000000","0000000000000000","00000000000000000","000000000000000000","0000000000000000000","00000000000000000000","000000000000000000000","0000000000000000000000","00000000000000000000000","000000000000000000000000","0000000000000000000000000"],w=[0,0,25,16,12,11,10,9,8,8,7,7,7,7,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],y=[0,0,33554432,43046721,16777216,48828125,60466176,40353607,16777216,43046721,1e7,19487171,35831808,62748517,7529536,11390625,16777216,24137569,34012224,47045881,64e6,4084101,5153632,6436343,7962624,9765625,11881376,14348907,17210368,20511149,243e5,28629151,33554432,39135393,45435424,52521875,60466176];n.prototype.toString=function(t,i){t=t||10,i=0|i||1;var h;if(16===t||"hex"===t){h="";for(var n=0,e=0,o=0;o<this.length;o++){var s=this.words[o],u=(16777215&(s<<n|e)).toString(16);h=0!==(e=s>>>24-n&16777215)||o!==this.length-1?c[6-u.length]+u+h:u+h,(n+=2)>=26&&(n-=26,o--)}for(0!==e&&(h=e.toString(16)+h);h.length%i!=0;)h="0"+h;return 0!==this.negative&&(h="-"+h),h}if(t===(0|t)&&t>=2&&t<=36){var a=w[t],l=y[t];h="";var m=this.clone();for(m.negative=0;!m.isZero();){var f=m.modn(l).toString(t);h=(m=m.idivn(l)).isZero()?f+h:c[a-f.length]+f+h}for(this.isZero()&&(h="0"+h);h.length%i!=0;)h="0"+h;return 0!==this.negative&&(h="-"+h),h}r(!1,"Base should be between 2 and 36")},n.prototype.toNumber=function(){var t=this.words[0];return 2===this.length?t+=67108864*this.words[1]:3===this.length&&1===this.words[2]?t+=4503599627370496+67108864*this.words[1]:this.length>2&&r(!1,"Number can only safely store up to 53 bits"),0!==this.negative?-t:t},n.prototype.toJSON=function(){return this.toString(16)},n.prototype.toBuffer=function(t,i){return r(void 0!==g),this.toArrayLike(g,t,i)},n.prototype.toArray=function(t,i){return this.toArrayLike(Array,t,i)},n.prototype.toArrayLike=function(t,i,h){var n=this.byteLength(),e=h||Math.max(1,n);r(n<=e,"byte array longer than desired length"),r(e>0,"Requested array length <= 0"),this.strip();var o,s,u="le"===i,a=new t(e),l=this.clone();if(u){for(s=0;!l.isZero();s++)o=l.andln(255),l.iushrn(8),a[s]=o;for(;s<e;s++)a[s]=0}else{for(s=0;s<e-n;s++)a[s]=0;for(s=0;!l.isZero();s++)o=l.andln(255),l.iushrn(8),a[e-s-1]=o}return a},Math.clz32?n.prototype._countBits=function(t){return 32-Math.clz32(t)}:n.prototype._countBits=function(t){var i=t,r=0;return i>=4096&&(r+=13,i>>>=13),i>=64&&(r+=7,i>>>=7),i>=8&&(r+=4,i>>>=4),i>=2&&(r+=2,i>>>=2),r+i},n.prototype._zeroBits=function(t){if(0===t)return 26;var i=t,r=0;return 0==(8191&i)&&(r+=13,i>>>=13),0==(127&i)&&(r+=7,i>>>=7),0==(15&i)&&(r+=4,i>>>=4),0==(3&i)&&(r+=2,i>>>=2),0==(1&i)&&r++,r},n.prototype.bitLength=function(){var t=this.words[this.length-1],i=this._countBits(t);return 26*(this.length-1)+i},n.prototype.zeroBits=function(){if(this.isZero())return 0;for(var t=0,i=0;i<this.length;i++){var r=this._zeroBits(this.words[i]);if(t+=r,26!==r)break}return t},n.prototype.byteLength=function(){return Math.ceil(this.bitLength()/8)},n.prototype.toTwos=function(t){return 0!==this.negative?this.abs().inotn(t).iaddn(1):this.clone()},n.prototype.fromTwos=function(t){return this.testn(t-1)?this.notn(t).iaddn(1).ineg():this.clone()},n.prototype.isNeg=function(){return 0!==this.negative},n.prototype.neg=function(){return this.clone().ineg()},n.prototype.ineg=function(){return this.isZero()||(this.negative^=1),this},n.prototype.iuor=function(t){for(;this.length<t.length;)this.words[this.length++]=0;for(var i=0;i<t.length;i++)this.words[i]=this.words[i]|t.words[i];return this.strip()},n.prototype.ior=function(t){return r(0==(this.negative|t.negative)),this.iuor(t)},n.prototype.or=function(t){return this.length>t.length?this.clone().ior(t):t.clone().ior(this)},n.prototype.uor=function(t){return this.length>t.length?this.clone().iuor(t):t.clone().iuor(this)},n.prototype.iuand=function(t){var i;i=this.length>t.length?t:this;for(var r=0;r<i.length;r++)this.words[r]=this.words[r]&t.words[r];return this.length=i.length,this.strip()},n.prototype.iand=function(t){return r(0==(this.negative|t.negative)),this.iuand(t)},n.prototype.and=function(t){return this.length>t.length?this.clone().iand(t):t.clone().iand(this)},n.prototype.uand=function(t){return this.length>t.length?this.clone().iuand(t):t.clone().iuand(this)},n.prototype.iuxor=function(t){var i,r;this.length>t.length?(i=this,r=t):(i=t,r=this);for(var h=0;h<r.length;h++)this.words[h]=i.words[h]^r.words[h];if(this!==i)for(;h<i.length;h++)this.words[h]=i.words[h];return this.length=i.length,this.strip()},n.prototype.ixor=function(t){return r(0==(this.negative|t.negative)),this.iuxor(t)},n.prototype.xor=function(t){return this.length>t.length?this.clone().ixor(t):t.clone().ixor(this)},n.prototype.uxor=function(t){return this.length>t.length?this.clone().iuxor(t):t.clone().iuxor(this)},n.prototype.inotn=function(t){r("number"==typeof t&&t>=0);var i=0|Math.ceil(t/26),h=t%26;this._expand(i),h>0&&i--;for(var n=0;n<i;n++)this.words[n]=67108863&~this.words[n];return h>0&&(this.words[n]=~this.words[n]&67108863>>26-h),this.strip()},n.prototype.notn=function(t){return this.clone().inotn(t)},n.prototype.setn=function(t,i){r("number"==typeof t&&t>=0);var h=t/26|0,n=t%26;return this._expand(h+1),this.words[h]=i?this.words[h]|1<<n:this.words[h]&~(1<<n),this.strip()},n.prototype.iadd=function(t){var i;if(0!==this.negative&&0===t.negative)return this.negative=0,i=this.isub(t),this.negative^=1,this._normSign();if(0===this.negative&&0!==t.negative)return t.negative=0,i=this.isub(t),t.negative=1,i._normSign();var r,h;this.length>t.length?(r=this,h=t):(r=t,h=this);for(var n=0,e=0;e<h.length;e++)i=(0|r.words[e])+(0|h.words[e])+n,this.words[e]=67108863&i,n=i>>>26;for(;0!==n&&e<r.length;e++)i=(0|r.words[e])+n,this.words[e]=67108863&i,n=i>>>26;if(this.length=r.length,0!==n)this.words[this.length]=n,this.length++;else if(r!==this)for(;e<r.length;e++)this.words[e]=r.words[e];return this},n.prototype.add=function(t){var i;return 0!==t.negative&&0===this.negative?(t.negative=0,i=this.sub(t),t.negative^=1,i):0===t.negative&&0!==this.negative?(this.negative=0,i=t.sub(this),this.negative=1,i):this.length>t.length?this.clone().iadd(t):t.clone().iadd(this)},n.prototype.isub=function(t){if(0!==t.negative){t.negative=0;var i=this.iadd(t);return t.negative=1,i._normSign()}if(0!==this.negative)return this.negative=0,this.iadd(t),this.negative=1,this._normSign();var r=this.cmp(t);if(0===r)return this.negative=0,this.length=1,this.words[0]=0,this;var h,n;r>0?(h=this,n=t):(h=t,n=this);for(var e=0,o=0;o<n.length;o++)e=(i=(0|h.words[o])-(0|n.words[o])+e)>>26,this.words[o]=67108863&i;for(;0!==e&&o<h.length;o++)e=(i=(0|h.words[o])+e)>>26,this.words[o]=67108863&i;if(0===e&&o<h.length&&h!==this)for(;o<h.length;o++)this.words[o]=h.words[o];return this.length=Math.max(this.length,o),h!==this&&(this.negative=1),this.strip()},n.prototype.sub=function(t){return this.clone().isub(t)};var b=function(t,i,r){var h,n,e,o=t.words,s=i.words,u=r.words,a=0,l=0|o[0],m=8191&l,f=l>>>13,d=0|o[1],p=8191&d,M=d>>>13,v=0|o[2],g=8191&v,c=v>>>13,w=0|o[3],y=8191&w,b=w>>>13,_=0|o[4],k=8191&_,A=_>>>13,x=0|o[5],S=8191&x,Z=x>>>13,q=0|o[6],R=8191&q,B=q>>>13,N=0|o[7],L=8191&N,I=N>>>13,z=0|o[8],T=8191&z,E=z>>>13,O=0|o[9],j=8191&O,K=O>>>13,P=0|s[0],F=8191&P,C=P>>>13,D=0|s[1],H=8191&D,J=D>>>13,U=0|s[2],G=8191&U,Q=U>>>13,V=0|s[3],W=8191&V,X=V>>>13,Y=0|s[4],$=8191&Y,tt=Y>>>13,it=0|s[5],rt=8191&it,ht=it>>>13,nt=0|s[6],et=8191&nt,ot=nt>>>13,st=0|s[7],ut=8191&st,at=st>>>13,lt=0|s[8],mt=8191&lt,ft=lt>>>13,dt=0|s[9],pt=8191&dt,Mt=dt>>>13;r.negative=t.negative^i.negative,r.length=19;var vt=(a+(h=Math.imul(m,F))|0)+((8191&(n=(n=Math.imul(m,C))+Math.imul(f,F)|0))<<13)|0;a=((e=Math.imul(f,C))+(n>>>13)|0)+(vt>>>26)|0,vt&=67108863,h=Math.imul(p,F),n=(n=Math.imul(p,C))+Math.imul(M,F)|0,e=Math.imul(M,C);var gt=(a+(h=h+Math.imul(m,H)|0)|0)+((8191&(n=(n=n+Math.imul(m,J)|0)+Math.imul(f,H)|0))<<13)|0;a=((e=e+Math.imul(f,J)|0)+(n>>>13)|0)+(gt>>>26)|0,gt&=67108863,h=Math.imul(g,F),n=(n=Math.imul(g,C))+Math.imul(c,F)|0,e=Math.imul(c,C),h=h+Math.imul(p,H)|0,n=(n=n+Math.imul(p,J)|0)+Math.imul(M,H)|0,e=e+Math.imul(M,J)|0;var ct=(a+(h=h+Math.imul(m,G)|0)|0)+((8191&(n=(n=n+Math.imul(m,Q)|0)+Math.imul(f,G)|0))<<13)|0;a=((e=e+Math.imul(f,Q)|0)+(n>>>13)|0)+(ct>>>26)|0,ct&=67108863,h=Math.imul(y,F),n=(n=Math.imul(y,C))+Math.imul(b,F)|0,e=Math.imul(b,C),h=h+Math.imul(g,H)|0,n=(n=n+Math.imul(g,J)|0)+Math.imul(c,H)|0,e=e+Math.imul(c,J)|0,h=h+Math.imul(p,G)|0,n=(n=n+Math.imul(p,Q)|0)+Math.imul(M,G)|0,e=e+Math.imul(M,Q)|0;var wt=(a+(h=h+Math.imul(m,W)|0)|0)+((8191&(n=(n=n+Math.imul(m,X)|0)+Math.imul(f,W)|0))<<13)|0;a=((e=e+Math.imul(f,X)|0)+(n>>>13)|0)+(wt>>>26)|0,wt&=67108863,h=Math.imul(k,F),n=(n=Math.imul(k,C))+Math.imul(A,F)|0,e=Math.imul(A,C),h=h+Math.imul(y,H)|0,n=(n=n+Math.imul(y,J)|0)+Math.imul(b,H)|0,e=e+Math.imul(b,J)|0,h=h+Math.imul(g,G)|0,n=(n=n+Math.imul(g,Q)|0)+Math.imul(c,G)|0,e=e+Math.imul(c,Q)|0,h=h+Math.imul(p,W)|0,n=(n=n+Math.imul(p,X)|0)+Math.imul(M,W)|0,e=e+Math.imul(M,X)|0;var yt=(a+(h=h+Math.imul(m,$)|0)|0)+((8191&(n=(n=n+Math.imul(m,tt)|0)+Math.imul(f,$)|0))<<13)|0;a=((e=e+Math.imul(f,tt)|0)+(n>>>13)|0)+(yt>>>26)|0,yt&=67108863,h=Math.imul(S,F),n=(n=Math.imul(S,C))+Math.imul(Z,F)|0,e=Math.imul(Z,C),h=h+Math.imul(k,H)|0,n=(n=n+Math.imul(k,J)|0)+Math.imul(A,H)|0,e=e+Math.imul(A,J)|0,h=h+Math.imul(y,G)|0,n=(n=n+Math.imul(y,Q)|0)+Math.imul(b,G)|0,e=e+Math.imul(b,Q)|0,h=h+Math.imul(g,W)|0,n=(n=n+Math.imul(g,X)|0)+Math.imul(c,W)|0,e=e+Math.imul(c,X)|0,h=h+Math.imul(p,$)|0,n=(n=n+Math.imul(p,tt)|0)+Math.imul(M,$)|0,e=e+Math.imul(M,tt)|0;var bt=(a+(h=h+Math.imul(m,rt)|0)|0)+((8191&(n=(n=n+Math.imul(m,ht)|0)+Math.imul(f,rt)|0))<<13)|0;a=((e=e+Math.imul(f,ht)|0)+(n>>>13)|0)+(bt>>>26)|0,bt&=67108863,h=Math.imul(R,F),n=(n=Math.imul(R,C))+Math.imul(B,F)|0,e=Math.imul(B,C),h=h+Math.imul(S,H)|0,n=(n=n+Math.imul(S,J)|0)+Math.imul(Z,H)|0,e=e+Math.imul(Z,J)|0,h=h+Math.imul(k,G)|0,n=(n=n+Math.imul(k,Q)|0)+Math.imul(A,G)|0,e=e+Math.imul(A,Q)|0,h=h+Math.imul(y,W)|0,n=(n=n+Math.imul(y,X)|0)+Math.imul(b,W)|0,e=e+Math.imul(b,X)|0,h=h+Math.imul(g,$)|0,n=(n=n+Math.imul(g,tt)|0)+Math.imul(c,$)|0,e=e+Math.imul(c,tt)|0,h=h+Math.imul(p,rt)|0,n=(n=n+Math.imul(p,ht)|0)+Math.imul(M,rt)|0,e=e+Math.imul(M,ht)|0;var _t=(a+(h=h+Math.imul(m,et)|0)|0)+((8191&(n=(n=n+Math.imul(m,ot)|0)+Math.imul(f,et)|0))<<13)|0;a=((e=e+Math.imul(f,ot)|0)+(n>>>13)|0)+(_t>>>26)|0,_t&=67108863,h=Math.imul(L,F),n=(n=Math.imul(L,C))+Math.imul(I,F)|0,e=Math.imul(I,C),h=h+Math.imul(R,H)|0,n=(n=n+Math.imul(R,J)|0)+Math.imul(B,H)|0,e=e+Math.imul(B,J)|0,h=h+Math.imul(S,G)|0,n=(n=n+Math.imul(S,Q)|0)+Math.imul(Z,G)|0,e=e+Math.imul(Z,Q)|0,h=h+Math.imul(k,W)|0,n=(n=n+Math.imul(k,X)|0)+Math.imul(A,W)|0,e=e+Math.imul(A,X)|0,h=h+Math.imul(y,$)|0,n=(n=n+Math.imul(y,tt)|0)+Math.imul(b,$)|0,e=e+Math.imul(b,tt)|0,h=h+Math.imul(g,rt)|0,n=(n=n+Math.imul(g,ht)|0)+Math.imul(c,rt)|0,e=e+Math.imul(c,ht)|0,h=h+Math.imul(p,et)|0,n=(n=n+Math.imul(p,ot)|0)+Math.imul(M,et)|0,e=e+Math.imul(M,ot)|0;var kt=(a+(h=h+Math.imul(m,ut)|0)|0)+((8191&(n=(n=n+Math.imul(m,at)|0)+Math.imul(f,ut)|0))<<13)|0;a=((e=e+Math.imul(f,at)|0)+(n>>>13)|0)+(kt>>>26)|0,kt&=67108863,h=Math.imul(T,F),n=(n=Math.imul(T,C))+Math.imul(E,F)|0,e=Math.imul(E,C),h=h+Math.imul(L,H)|0,n=(n=n+Math.imul(L,J)|0)+Math.imul(I,H)|0,e=e+Math.imul(I,J)|0,h=h+Math.imul(R,G)|0,n=(n=n+Math.imul(R,Q)|0)+Math.imul(B,G)|0,e=e+Math.imul(B,Q)|0,h=h+Math.imul(S,W)|0,n=(n=n+Math.imul(S,X)|0)+Math.imul(Z,W)|0,e=e+Math.imul(Z,X)|0,h=h+Math.imul(k,$)|0,n=(n=n+Math.imul(k,tt)|0)+Math.imul(A,$)|0,e=e+Math.imul(A,tt)|0,h=h+Math.imul(y,rt)|0,n=(n=n+Math.imul(y,ht)|0)+Math.imul(b,rt)|0,e=e+Math.imul(b,ht)|0,h=h+Math.imul(g,et)|0,n=(n=n+Math.imul(g,ot)|0)+Math.imul(c,et)|0,e=e+Math.imul(c,ot)|0,h=h+Math.imul(p,ut)|0,n=(n=n+Math.imul(p,at)|0)+Math.imul(M,ut)|0,e=e+Math.imul(M,at)|0;var At=(a+(h=h+Math.imul(m,mt)|0)|0)+((8191&(n=(n=n+Math.imul(m,ft)|0)+Math.imul(f,mt)|0))<<13)|0;a=((e=e+Math.imul(f,ft)|0)+(n>>>13)|0)+(At>>>26)|0,At&=67108863,h=Math.imul(j,F),n=(n=Math.imul(j,C))+Math.imul(K,F)|0,e=Math.imul(K,C),h=h+Math.imul(T,H)|0,n=(n=n+Math.imul(T,J)|0)+Math.imul(E,H)|0,e=e+Math.imul(E,J)|0,h=h+Math.imul(L,G)|0,n=(n=n+Math.imul(L,Q)|0)+Math.imul(I,G)|0,e=e+Math.imul(I,Q)|0,h=h+Math.imul(R,W)|0,n=(n=n+Math.imul(R,X)|0)+Math.imul(B,W)|0,e=e+Math.imul(B,X)|0,h=h+Math.imul(S,$)|0,n=(n=n+Math.imul(S,tt)|0)+Math.imul(Z,$)|0,e=e+Math.imul(Z,tt)|0,h=h+Math.imul(k,rt)|0,n=(n=n+Math.imul(k,ht)|0)+Math.imul(A,rt)|0,e=e+Math.imul(A,ht)|0,h=h+Math.imul(y,et)|0,n=(n=n+Math.imul(y,ot)|0)+Math.imul(b,et)|0,e=e+Math.imul(b,ot)|0,h=h+Math.imul(g,ut)|0,n=(n=n+Math.imul(g,at)|0)+Math.imul(c,ut)|0,e=e+Math.imul(c,at)|0,h=h+Math.imul(p,mt)|0,n=(n=n+Math.imul(p,ft)|0)+Math.imul(M,mt)|0,e=e+Math.imul(M,ft)|0;var xt=(a+(h=h+Math.imul(m,pt)|0)|0)+((8191&(n=(n=n+Math.imul(m,Mt)|0)+Math.imul(f,pt)|0))<<13)|0;a=((e=e+Math.imul(f,Mt)|0)+(n>>>13)|0)+(xt>>>26)|0,xt&=67108863,h=Math.imul(j,H),n=(n=Math.imul(j,J))+Math.imul(K,H)|0,e=Math.imul(K,J),h=h+Math.imul(T,G)|0,n=(n=n+Math.imul(T,Q)|0)+Math.imul(E,G)|0,e=e+Math.imul(E,Q)|0,h=h+Math.imul(L,W)|0,n=(n=n+Math.imul(L,X)|0)+Math.imul(I,W)|0,e=e+Math.imul(I,X)|0,h=h+Math.imul(R,$)|0,n=(n=n+Math.imul(R,tt)|0)+Math.imul(B,$)|0,e=e+Math.imul(B,tt)|0,h=h+Math.imul(S,rt)|0,n=(n=n+Math.imul(S,ht)|0)+Math.imul(Z,rt)|0,e=e+Math.imul(Z,ht)|0,h=h+Math.imul(k,et)|0,n=(n=n+Math.imul(k,ot)|0)+Math.imul(A,et)|0,e=e+Math.imul(A,ot)|0,h=h+Math.imul(y,ut)|0,n=(n=n+Math.imul(y,at)|0)+Math.imul(b,ut)|0,e=e+Math.imul(b,at)|0,h=h+Math.imul(g,mt)|0,n=(n=n+Math.imul(g,ft)|0)+Math.imul(c,mt)|0,e=e+Math.imul(c,ft)|0;var St=(a+(h=h+Math.imul(p,pt)|0)|0)+((8191&(n=(n=n+Math.imul(p,Mt)|0)+Math.imul(M,pt)|0))<<13)|0;a=((e=e+Math.imul(M,Mt)|0)+(n>>>13)|0)+(St>>>26)|0,St&=67108863,h=Math.imul(j,G),n=(n=Math.imul(j,Q))+Math.imul(K,G)|0,e=Math.imul(K,Q),h=h+Math.imul(T,W)|0,n=(n=n+Math.imul(T,X)|0)+Math.imul(E,W)|0,e=e+Math.imul(E,X)|0,h=h+Math.imul(L,$)|0,n=(n=n+Math.imul(L,tt)|0)+Math.imul(I,$)|0,e=e+Math.imul(I,tt)|0,h=h+Math.imul(R,rt)|0,n=(n=n+Math.imul(R,ht)|0)+Math.imul(B,rt)|0,e=e+Math.imul(B,ht)|0,h=h+Math.imul(S,et)|0,n=(n=n+Math.imul(S,ot)|0)+Math.imul(Z,et)|0,e=e+Math.imul(Z,ot)|0,h=h+Math.imul(k,ut)|0,n=(n=n+Math.imul(k,at)|0)+Math.imul(A,ut)|0,e=e+Math.imul(A,at)|0,h=h+Math.imul(y,mt)|0,n=(n=n+Math.imul(y,ft)|0)+Math.imul(b,mt)|0,e=e+Math.imul(b,ft)|0;var Zt=(a+(h=h+Math.imul(g,pt)|0)|0)+((8191&(n=(n=n+Math.imul(g,Mt)|0)+Math.imul(c,pt)|0))<<13)|0;a=((e=e+Math.imul(c,Mt)|0)+(n>>>13)|0)+(Zt>>>26)|0,Zt&=67108863,h=Math.imul(j,W),n=(n=Math.imul(j,X))+Math.imul(K,W)|0,e=Math.imul(K,X),h=h+Math.imul(T,$)|0,n=(n=n+Math.imul(T,tt)|0)+Math.imul(E,$)|0,e=e+Math.imul(E,tt)|0,h=h+Math.imul(L,rt)|0,n=(n=n+Math.imul(L,ht)|0)+Math.imul(I,rt)|0,e=e+Math.imul(I,ht)|0,h=h+Math.imul(R,et)|0,n=(n=n+Math.imul(R,ot)|0)+Math.imul(B,et)|0,e=e+Math.imul(B,ot)|0,h=h+Math.imul(S,ut)|0,n=(n=n+Math.imul(S,at)|0)+Math.imul(Z,ut)|0,e=e+Math.imul(Z,at)|0,h=h+Math.imul(k,mt)|0,n=(n=n+Math.imul(k,ft)|0)+Math.imul(A,mt)|0,e=e+Math.imul(A,ft)|0;var qt=(a+(h=h+Math.imul(y,pt)|0)|0)+((8191&(n=(n=n+Math.imul(y,Mt)|0)+Math.imul(b,pt)|0))<<13)|0;a=((e=e+Math.imul(b,Mt)|0)+(n>>>13)|0)+(qt>>>26)|0,qt&=67108863,h=Math.imul(j,$),n=(n=Math.imul(j,tt))+Math.imul(K,$)|0,e=Math.imul(K,tt),h=h+Math.imul(T,rt)|0,n=(n=n+Math.imul(T,ht)|0)+Math.imul(E,rt)|0,e=e+Math.imul(E,ht)|0,h=h+Math.imul(L,et)|0,n=(n=n+Math.imul(L,ot)|0)+Math.imul(I,et)|0,e=e+Math.imul(I,ot)|0,h=h+Math.imul(R,ut)|0,n=(n=n+Math.imul(R,at)|0)+Math.imul(B,ut)|0,e=e+Math.imul(B,at)|0,h=h+Math.imul(S,mt)|0,n=(n=n+Math.imul(S,ft)|0)+Math.imul(Z,mt)|0,e=e+Math.imul(Z,ft)|0;var Rt=(a+(h=h+Math.imul(k,pt)|0)|0)+((8191&(n=(n=n+Math.imul(k,Mt)|0)+Math.imul(A,pt)|0))<<13)|0;a=((e=e+Math.imul(A,Mt)|0)+(n>>>13)|0)+(Rt>>>26)|0,Rt&=67108863,h=Math.imul(j,rt),n=(n=Math.imul(j,ht))+Math.imul(K,rt)|0,e=Math.imul(K,ht),h=h+Math.imul(T,et)|0,n=(n=n+Math.imul(T,ot)|0)+Math.imul(E,et)|0,e=e+Math.imul(E,ot)|0,h=h+Math.imul(L,ut)|0,n=(n=n+Math.imul(L,at)|0)+Math.imul(I,ut)|0,e=e+Math.imul(I,at)|0,h=h+Math.imul(R,mt)|0,n=(n=n+Math.imul(R,ft)|0)+Math.imul(B,mt)|0,e=e+Math.imul(B,ft)|0;var Bt=(a+(h=h+Math.imul(S,pt)|0)|0)+((8191&(n=(n=n+Math.imul(S,Mt)|0)+Math.imul(Z,pt)|0))<<13)|0;a=((e=e+Math.imul(Z,Mt)|0)+(n>>>13)|0)+(Bt>>>26)|0,Bt&=67108863,h=Math.imul(j,et),n=(n=Math.imul(j,ot))+Math.imul(K,et)|0,e=Math.imul(K,ot),h=h+Math.imul(T,ut)|0,n=(n=n+Math.imul(T,at)|0)+Math.imul(E,ut)|0,e=e+Math.imul(E,at)|0,h=h+Math.imul(L,mt)|0,n=(n=n+Math.imul(L,ft)|0)+Math.imul(I,mt)|0,e=e+Math.imul(I,ft)|0;var Nt=(a+(h=h+Math.imul(R,pt)|0)|0)+((8191&(n=(n=n+Math.imul(R,Mt)|0)+Math.imul(B,pt)|0))<<13)|0;a=((e=e+Math.imul(B,Mt)|0)+(n>>>13)|0)+(Nt>>>26)|0,Nt&=67108863,h=Math.imul(j,ut),n=(n=Math.imul(j,at))+Math.imul(K,ut)|0,e=Math.imul(K,at),h=h+Math.imul(T,mt)|0,n=(n=n+Math.imul(T,ft)|0)+Math.imul(E,mt)|0,e=e+Math.imul(E,ft)|0;var Lt=(a+(h=h+Math.imul(L,pt)|0)|0)+((8191&(n=(n=n+Math.imul(L,Mt)|0)+Math.imul(I,pt)|0))<<13)|0;a=((e=e+Math.imul(I,Mt)|0)+(n>>>13)|0)+(Lt>>>26)|0,Lt&=67108863,h=Math.imul(j,mt),n=(n=Math.imul(j,ft))+Math.imul(K,mt)|0,e=Math.imul(K,ft);var It=(a+(h=h+Math.imul(T,pt)|0)|0)+((8191&(n=(n=n+Math.imul(T,Mt)|0)+Math.imul(E,pt)|0))<<13)|0;a=((e=e+Math.imul(E,Mt)|0)+(n>>>13)|0)+(It>>>26)|0,It&=67108863;var zt=(a+(h=Math.imul(j,pt))|0)+((8191&(n=(n=Math.imul(j,Mt))+Math.imul(K,pt)|0))<<13)|0;return a=((e=Math.imul(K,Mt))+(n>>>13)|0)+(zt>>>26)|0,zt&=67108863,u[0]=vt,u[1]=gt,u[2]=ct,u[3]=wt,u[4]=yt,u[5]=bt,u[6]=_t,u[7]=kt,u[8]=At,u[9]=xt,u[10]=St,u[11]=Zt,u[12]=qt,u[13]=Rt,u[14]=Bt,u[15]=Nt,u[16]=Lt,u[17]=It,u[18]=zt,0!==a&&(u[19]=a,r.length++),r};Math.imul||(b=s),n.prototype.mulTo=function(t,i){var r=this.length+t.length;return 10===this.length&&10===t.length?b(this,t,i):r<63?s(this,t,i):r<1024?function(t,i,r){r.negative=i.negative^t.negative,r.length=t.length+i.length;for(var h=0,n=0,e=0;e<r.length-1;e++){var o=n;n=0;for(var s=67108863&h,u=Math.min(e,i.length-1),a=Math.max(0,e-t.length+1);a<=u;a++){var l=e-a,m=(0|t.words[l])*(0|i.words[a]),f=67108863&m;s=67108863&(f=f+s|0),n+=(o=(o=o+(m/67108864|0)|0)+(f>>>26)|0)>>>26,o&=67108863}r.words[e]=s,h=o,o=n}return 0!==h?r.words[e]=h:r.length--,r.strip()}(this,t,i):u(this,t,i)},a.prototype.makeRBT=function(t){for(var i=new Array(t),r=n.prototype._countBits(t)-1,h=0;h<t;h++)i[h]=this.revBin(h,r,t);return i},a.prototype.revBin=function(t,i,r){if(0===t||t===r-1)return t;for(var h=0,n=0;n<i;n++)h|=(1&t)<<i-n-1,t>>=1;return h},a.prototype.permute=function(t,i,r,h,n,e){for(var o=0;o<e;o++)h[o]=i[t[o]],n[o]=r[t[o]]},a.prototype.transform=function(t,i,r,h,n,e){this.permute(e,t,i,r,h,n);for(var o=1;o<n;o<<=1)for(var s=o<<1,u=Math.cos(2*Math.PI/s),a=Math.sin(2*Math.PI/s),l=0;l<n;l+=s)for(var m=u,f=a,d=0;d<o;d++){var p=r[l+d],M=h[l+d],v=r[l+d+o],g=h[l+d+o],c=m*v-f*g;g=m*g+f*v,v=c,r[l+d]=p+v,h[l+d]=M+g,r[l+d+o]=p-v,h[l+d+o]=M-g,d!==s&&(c=u*m-a*f,f=u*f+a*m,m=c)}},a.prototype.guessLen13b=function(t,i){var r=1|Math.max(i,t),h=1&r,n=0;for(r=r/2|0;r;r>>>=1)n++;return 1<<n+1+h},a.prototype.conjugate=function(t,i,r){if(!(r<=1))for(var h=0;h<r/2;h++){var n=t[h];t[h]=t[r-h-1],t[r-h-1]=n,n=i[h],i[h]=-i[r-h-1],i[r-h-1]=-n}},a.prototype.normalize13b=function(t,i){for(var r=0,h=0;h<i/2;h++){var n=8192*Math.round(t[2*h+1]/i)+Math.round(t[2*h]/i)+r;t[h]=67108863&n,r=n<67108864?0:n/67108864|0}return t},a.prototype.convert13b=function(t,i,h,n){for(var e=0,o=0;o<i;o++)e+=0|t[o],h[2*o]=8191&e,e>>>=13,h[2*o+1]=8191&e,e>>>=13;for(o=2*i;o<n;++o)h[o]=0;r(0===e),r(0==(-8192&e))},a.prototype.stub=function(t){for(var i=new Array(t),r=0;r<t;r++)i[r]=0;return i},a.prototype.mulp=function(t,i,r){var h=2*this.guessLen13b(t.length,i.length),n=this.makeRBT(h),e=this.stub(h),o=new Array(h),s=new Array(h),u=new Array(h),a=new Array(h),l=new Array(h),m=new Array(h),f=r.words;f.length=h,this.convert13b(t.words,t.length,o,h),this.convert13b(i.words,i.length,a,h),this.transform(o,e,s,u,h,n),this.transform(a,e,l,m,h,n);for(var d=0;d<h;d++){var p=s[d]*l[d]-u[d]*m[d];u[d]=s[d]*m[d]+u[d]*l[d],s[d]=p}return this.conjugate(s,u,h),this.transform(s,u,f,e,h,n),this.conjugate(f,e,h),this.normalize13b(f,h),r.negative=t.negative^i.negative,r.length=t.length+i.length,r.strip()},n.prototype.mul=function(t){var i=new n(null);return i.words=new Array(this.length+t.length),this.mulTo(t,i)},n.prototype.mulf=function(t){var i=new n(null);return i.words=new Array(this.length+t.length),u(this,t,i)},n.prototype.imul=function(t){return this.clone().mulTo(t,this)},n.prototype.imuln=function(t){r("number"==typeof t),r(t<67108864);for(var i=0,h=0;h<this.length;h++){var n=(0|this.words[h])*t,e=(67108863&n)+(67108863&i);i>>=26,i+=n/67108864|0,i+=e>>>26,this.words[h]=67108863&e}return 0!==i&&(this.words[h]=i,this.length++),this},n.prototype.muln=function(t){return this.clone().imuln(t)},n.prototype.sqr=function(){return this.mul(this)},n.prototype.isqr=function(){return this.imul(this.clone())},n.prototype.pow=function(t){var i=function(t){for(var i=new Array(t.bitLength()),r=0;r<i.length;r++){var h=r/26|0,n=r%26;i[r]=(t.words[h]&1<<n)>>>n}return i}(t);if(0===i.length)return new n(1);for(var r=this,h=0;h<i.length&&0===i[h];h++,r=r.sqr());if(++h<i.length)for(var e=r.sqr();h<i.length;h++,e=e.sqr())0!==i[h]&&(r=r.mul(e));return r},n.prototype.iushln=function(t){r("number"==typeof t&&t>=0);var i,h=t%26,n=(t-h)/26,e=67108863>>>26-h<<26-h;if(0!==h){var o=0;for(i=0;i<this.length;i++){var s=this.words[i]&e,u=(0|this.words[i])-s<<h;this.words[i]=u|o,o=s>>>26-h}o&&(this.words[i]=o,this.length++)}if(0!==n){for(i=this.length-1;i>=0;i--)this.words[i+n]=this.words[i];for(i=0;i<n;i++)this.words[i]=0;this.length+=n}return this.strip()},n.prototype.ishln=function(t){return r(0===this.negative),this.iushln(t)},n.prototype.iushrn=function(t,i,h){r("number"==typeof t&&t>=0);var n;n=i?(i-i%26)/26:0;var e=t%26,o=Math.min((t-e)/26,this.length),s=67108863^67108863>>>e<<e,u=h;if(n-=o,n=Math.max(0,n),u){for(var a=0;a<o;a++)u.words[a]=this.words[a];u.length=o}if(0===o);else if(this.length>o)for(this.length-=o,a=0;a<this.length;a++)this.words[a]=this.words[a+o];else this.words[0]=0,this.length=1;var l=0;for(a=this.length-1;a>=0&&(0!==l||a>=n);a--){var m=0|this.words[a];this.words[a]=l<<26-e|m>>>e,l=m&s}return u&&0!==l&&(u.words[u.length++]=l),0===this.length&&(this.words[0]=0,this.length=1),this.strip()},n.prototype.ishrn=function(t,i,h){return r(0===this.negative),this.iushrn(t,i,h)},n.prototype.shln=function(t){return this.clone().ishln(t)},n.prototype.ushln=function(t){return this.clone().iushln(t)},n.prototype.shrn=function(t){return this.clone().ishrn(t)},n.prototype.ushrn=function(t){return this.clone().iushrn(t)},n.prototype.testn=function(t){r("number"==typeof t&&t>=0);var i=t%26,h=(t-i)/26,n=1<<i;if(this.length<=h)return!1;return!!(this.words[h]&n)},n.prototype.imaskn=function(t){r("number"==typeof t&&t>=0);var i=t%26,h=(t-i)/26;if(r(0===this.negative,"imaskn works only with positive numbers"),this.length<=h)return this;if(0!==i&&h++,this.length=Math.min(h,this.length),0!==i){var n=67108863^67108863>>>i<<i;this.words[this.length-1]&=n}return this.strip()},n.prototype.maskn=function(t){return this.clone().imaskn(t)},n.prototype.iaddn=function(t){return r("number"==typeof t),r(t<67108864),t<0?this.isubn(-t):0!==this.negative?1===this.length&&(0|this.words[0])<t?(this.words[0]=t-(0|this.words[0]),this.negative=0,this):(this.negative=0,this.isubn(t),this.negative=1,this):this._iaddn(t)},n.prototype._iaddn=function(t){this.words[0]+=t;for(var i=0;i<this.length&&this.words[i]>=67108864;i++)this.words[i]-=67108864,i===this.length-1?this.words[i+1]=1:this.words[i+1]++;return this.length=Math.max(this.length,i+1),this},n.prototype.isubn=function(t){if(r("number"==typeof t),r(t<67108864),t<0)return this.iaddn(-t);if(0!==this.negative)return this.negative=0,this.iaddn(t),this.negative=1,this;if(this.words[0]-=t,1===this.length&&this.words[0]<0)this.words[0]=-this.words[0],this.negative=1;else for(var i=0;i<this.length&&this.words[i]<0;i++)this.words[i]+=67108864,this.words[i+1]-=1;return this.strip()},n.prototype.addn=function(t){return this.clone().iaddn(t)},n.prototype.subn=function(t){return this.clone().isubn(t)},n.prototype.iabs=function(){return this.negative=0,this},n.prototype.abs=function(){return this.clone().iabs()},n.prototype._ishlnsubmul=function(t,i,h){var n,e=t.length+h;this._expand(e);var o,s=0;for(n=0;n<t.length;n++){o=(0|this.words[n+h])+s;var u=(0|t.words[n])*i;s=((o-=67108863&u)>>26)-(u/67108864|0),this.words[n+h]=67108863&o}for(;n<this.length-h;n++)s=(o=(0|this.words[n+h])+s)>>26,this.words[n+h]=67108863&o;if(0===s)return this.strip();for(r(-1===s),s=0,n=0;n<this.length;n++)s=(o=-(0|this.words[n])+s)>>26,this.words[n]=67108863&o;return this.negative=1,this.strip()},n.prototype._wordDiv=function(t,i){var r=this.length-t.length,h=this.clone(),e=t,o=0|e.words[e.length-1];0!==(r=26-this._countBits(o))&&(e=e.ushln(r),h.iushln(r),o=0|e.words[e.length-1]);var s,u=h.length-e.length;if("mod"!==i){(s=new n(null)).length=u+1,s.words=new Array(s.length);for(var a=0;a<s.length;a++)s.words[a]=0}var l=h.clone()._ishlnsubmul(e,1,u);0===l.negative&&(h=l,s&&(s.words[u]=1));for(var m=u-1;m>=0;m--){var f=67108864*(0|h.words[e.length+m])+(0|h.words[e.length+m-1]);for(f=Math.min(f/o|0,67108863),h._ishlnsubmul(e,f,m);0!==h.negative;)f--,h.negative=0,h._ishlnsubmul(e,1,m),h.isZero()||(h.negative^=1);s&&(s.words[m]=f)}return s&&s.strip(),h.strip(),"div"!==i&&0!==r&&h.iushrn(r),{div:s||null,mod:h}},n.prototype.divmod=function(t,i,h){if(r(!t.isZero()),this.isZero())return{div:new n(0),mod:new n(0)};var e,o,s;return 0!==this.negative&&0===t.negative?(s=this.neg().divmod(t,i),"mod"!==i&&(e=s.div.neg()),"div"!==i&&(o=s.mod.neg(),h&&0!==o.negative&&o.iadd(t)),{div:e,mod:o}):0===this.negative&&0!==t.negative?(s=this.divmod(t.neg(),i),"mod"!==i&&(e=s.div.neg()),{div:e,mod:s.mod}):0!=(this.negative&t.negative)?(s=this.neg().divmod(t.neg(),i),"div"!==i&&(o=s.mod.neg(),h&&0!==o.negative&&o.isub(t)),{div:s.div,mod:o}):t.length>this.length||this.cmp(t)<0?{div:new n(0),mod:this}:1===t.length?"div"===i?{div:this.divn(t.words[0]),mod:null}:"mod"===i?{div:null,mod:new n(this.modn(t.words[0]))}:{div:this.divn(t.words[0]),mod:new n(this.modn(t.words[0]))}:this._wordDiv(t,i)},n.prototype.div=function(t){return this.divmod(t,"div",!1).div},n.prototype.mod=function(t){return this.divmod(t,"mod",!1).mod},n.prototype.umod=function(t){return this.divmod(t,"mod",!0).mod},n.prototype.divRound=function(t){var i=this.divmod(t);if(i.mod.isZero())return i.div;var r=0!==i.div.negative?i.mod.isub(t):i.mod,h=t.ushrn(1),n=t.andln(1),e=r.cmp(h);return e<0||1===n&&0===e?i.div:0!==i.div.negative?i.div.isubn(1):i.div.iaddn(1)},n.prototype.modn=function(t){r(t<=67108863);for(var i=(1<<26)%t,h=0,n=this.length-1;n>=0;n--)h=(i*h+(0|this.words[n]))%t;return h},n.prototype.idivn=function(t){r(t<=67108863);for(var i=0,h=this.length-1;h>=0;h--){var n=(0|this.words[h])+67108864*i;this.words[h]=n/t|0,i=n%t}return this.strip()},n.prototype.divn=function(t){return this.clone().idivn(t)},n.prototype.egcd=function(t){r(0===t.negative),r(!t.isZero());var i=this,h=t.clone();i=0!==i.negative?i.umod(t):i.clone();for(var e=new n(1),o=new n(0),s=new n(0),u=new n(1),a=0;i.isEven()&&h.isEven();)i.iushrn(1),h.iushrn(1),++a;for(var l=h.clone(),m=i.clone();!i.isZero();){for(var f=0,d=1;0==(i.words[0]&d)&&f<26;++f,d<<=1);if(f>0)for(i.iushrn(f);f-- >0;)(e.isOdd()||o.isOdd())&&(e.iadd(l),o.isub(m)),e.iushrn(1),o.iushrn(1);for(var p=0,M=1;0==(h.words[0]&M)&&p<26;++p,M<<=1);if(p>0)for(h.iushrn(p);p-- >0;)(s.isOdd()||u.isOdd())&&(s.iadd(l),u.isub(m)),s.iushrn(1),u.iushrn(1);i.cmp(h)>=0?(i.isub(h),e.isub(s),o.isub(u)):(h.isub(i),s.isub(e),u.isub(o))}return{a:s,b:u,gcd:h.iushln(a)}},n.prototype._invmp=function(t){r(0===t.negative),r(!t.isZero());var i=this,h=t.clone();i=0!==i.negative?i.umod(t):i.clone();for(var e=new n(1),o=new n(0),s=h.clone();i.cmpn(1)>0&&h.cmpn(1)>0;){for(var u=0,a=1;0==(i.words[0]&a)&&u<26;++u,a<<=1);if(u>0)for(i.iushrn(u);u-- >0;)e.isOdd()&&e.iadd(s),e.iushrn(1);for(var l=0,m=1;0==(h.words[0]&m)&&l<26;++l,m<<=1);if(l>0)for(h.iushrn(l);l-- >0;)o.isOdd()&&o.iadd(s),o.iushrn(1);i.cmp(h)>=0?(i.isub(h),e.isub(o)):(h.isub(i),o.isub(e))}var f;return(f=0===i.cmpn(1)?e:o).cmpn(0)<0&&f.iadd(t),f},n.prototype.gcd=function(t){if(this.isZero())return t.abs();if(t.isZero())return this.abs();var i=this.clone(),r=t.clone();i.negative=0,r.negative=0;for(var h=0;i.isEven()&&r.isEven();h++)i.iushrn(1),r.iushrn(1);for(;;){for(;i.isEven();)i.iushrn(1);for(;r.isEven();)r.iushrn(1);var n=i.cmp(r);if(n<0){var e=i;i=r,r=e}else if(0===n||0===r.cmpn(1))break;i.isub(r)}return r.iushln(h)},n.prototype.invm=function(t){return this.egcd(t).a.umod(t)},n.prototype.isEven=function(){return 0==(1&this.words[0])},n.prototype.isOdd=function(){return 1==(1&this.words[0])},n.prototype.andln=function(t){return this.words[0]&t},n.prototype.bincn=function(t){r("number"==typeof t);var i=t%26,h=(t-i)/26,n=1<<i;if(this.length<=h)return this._expand(h+1),this.words[h]|=n,this;for(var e=n,o=h;0!==e&&o<this.length;o++){var s=0|this.words[o];e=(s+=e)>>>26,s&=67108863,this.words[o]=s}return 0!==e&&(this.words[o]=e,this.length++),this},n.prototype.isZero=function(){return 1===this.length&&0===this.words[0]},n.prototype.cmpn=function(t){var i=t<0;if(0!==this.negative&&!i)return-1;if(0===this.negative&&i)return 1;this.strip();var h;if(this.length>1)h=1;else{i&&(t=-t),r(t<=67108863,"Number is too big");var n=0|this.words[0];h=n===t?0:n<t?-1:1}return 0!==this.negative?0|-h:h},n.prototype.cmp=function(t){if(0!==this.negative&&0===t.negative)return-1;if(0===this.negative&&0!==t.negative)return 1;var i=this.ucmp(t);return 0!==this.negative?0|-i:i},n.prototype.ucmp=function(t){if(this.length>t.length)return 1;if(this.length<t.length)return-1;for(var i=0,r=this.length-1;r>=0;r--){var h=0|this.words[r],n=0|t.words[r];if(h!==n){h<n?i=-1:h>n&&(i=1);break}}return i},n.prototype.gtn=function(t){return 1===this.cmpn(t)},n.prototype.gt=function(t){return 1===this.cmp(t)},n.prototype.gten=function(t){return this.cmpn(t)>=0},n.prototype.gte=function(t){return this.cmp(t)>=0},n.prototype.ltn=function(t){return-1===this.cmpn(t)},n.prototype.lt=function(t){return-1===this.cmp(t)},n.prototype.lten=function(t){return this.cmpn(t)<=0},n.prototype.lte=function(t){return this.cmp(t)<=0},n.prototype.eqn=function(t){return 0===this.cmpn(t)},n.prototype.eq=function(t){return 0===this.cmp(t)},n.red=function(t){return new M(t)},n.prototype.toRed=function(t){return r(!this.red,"Already a number in reduction context"),r(0===this.negative,"red works only with positives"),t.convertTo(this)._forceRed(t)},n.prototype.fromRed=function(){return r(this.red,"fromRed works only with numbers in reduction context"),this.red.convertFrom(this)},n.prototype._forceRed=function(t){return this.red=t,this},n.prototype.forceRed=function(t){return r(!this.red,"Already a number in reduction context"),this._forceRed(t)},n.prototype.redAdd=function(t){return r(this.red,"redAdd works only with red numbers"),this.red.add(this,t)},n.prototype.redIAdd=function(t){return r(this.red,"redIAdd works only with red numbers"),this.red.iadd(this,t)},n.prototype.redSub=function(t){return r(this.red,"redSub works only with red numbers"),this.red.sub(this,t)},n.prototype.redISub=function(t){return r(this.red,"redISub works only with red numbers"),this.red.isub(this,t)},n.prototype.redShl=function(t){return r(this.red,"redShl works only with red numbers"),this.red.shl(this,t)},n.prototype.redMul=function(t){return r(this.red,"redMul works only with red numbers"),this.red._verify2(this,t),this.red.mul(this,t)},n.prototype.redIMul=function(t){return r(this.red,"redMul works only with red numbers"),this.red._verify2(this,t),this.red.imul(this,t)},n.prototype.redSqr=function(){return r(this.red,"redSqr works only with red numbers"),this.red._verify1(this),this.red.sqr(this)},n.prototype.redISqr=function(){return r(this.red,"redISqr works only with red numbers"),this.red._verify1(this),this.red.isqr(this)},n.prototype.redSqrt=function(){return r(this.red,"redSqrt works only with red numbers"),this.red._verify1(this),this.red.sqrt(this)},n.prototype.redInvm=function(){return r(this.red,"redInvm works only with red numbers"),this.red._verify1(this),this.red.invm(this)},n.prototype.redNeg=function(){return r(this.red,"redNeg works only with red numbers"),this.red._verify1(this),this.red.neg(this)},n.prototype.redPow=function(t){return r(this.red&&!t.red,"redPow(normalNum)"),this.red._verify1(this),this.red.pow(this,t)};var _={k256:null,p224:null,p192:null,p25519:null};l.prototype._tmp=function(){var t=new n(null);return t.words=new Array(Math.ceil(this.n/13)),t},l.prototype.ireduce=function(t){var i,r=t;do{this.split(r,this.tmp),i=(r=(r=this.imulK(r)).iadd(this.tmp)).bitLength()}while(i>this.n);var h=i<this.n?-1:r.ucmp(this.p);return 0===h?(r.words[0]=0,r.length=1):h>0?r.isub(this.p):r.strip(),r},l.prototype.split=function(t,i){t.iushrn(this.n,0,i)},l.prototype.imulK=function(t){return t.imul(this.k)},h(m,l),m.prototype.split=function(t,i){for(var r=Math.min(t.length,9),h=0;h<r;h++)i.words[h]=t.words[h];if(i.length=r,t.length<=9)return t.words[0]=0,void(t.length=1);var n=t.words[9];for(i.words[i.length++]=4194303&n,h=10;h<t.length;h++){var e=0|t.words[h];t.words[h-10]=(4194303&e)<<4|n>>>22,n=e}n>>>=22,t.words[h-10]=n,0===n&&t.length>10?t.length-=10:t.length-=9},m.prototype.imulK=function(t){t.words[t.length]=0,t.words[t.length+1]=0,t.length+=2;for(var i=0,r=0;r<t.length;r++){var h=0|t.words[r];i+=977*h,t.words[r]=67108863&i,i=64*h+(i/67108864|0)}return 0===t.words[t.length-1]&&(t.length--,0===t.words[t.length-1]&&t.length--),t},h(f,l),h(d,l),h(p,l),p.prototype.imulK=function(t){for(var i=0,r=0;r<t.length;r++){var h=19*(0|t.words[r])+i,n=67108863&h;h>>>=26,t.words[r]=n,i=h}return 0!==i&&(t.words[t.length++]=i),t},n._prime=function(t){if(_[t])return _[t];var i;if("k256"===t)i=new m;else if("p224"===t)i=new f;else if("p192"===t)i=new d;else{if("p25519"!==t)throw new Error("Unknown prime "+t);i=new p}return _[t]=i,i},M.prototype._verify1=function(t){r(0===t.negative,"red works only with positives"),r(t.red,"red works only with red numbers")},M.prototype._verify2=function(t,i){r(0==(t.negative|i.negative),"red works only with positives"),r(t.red&&t.red===i.red,"red works only with red numbers")},M.prototype.imod=function(t){return this.prime?this.prime.ireduce(t)._forceRed(this):t.umod(this.m)._forceRed(this)},M.prototype.neg=function(t){return t.isZero()?t.clone():this.m.sub(t)._forceRed(this)},M.prototype.add=function(t,i){this._verify2(t,i);var r=t.add(i);return r.cmp(this.m)>=0&&r.isub(this.m),r._forceRed(this)},M.prototype.iadd=function(t,i){this._verify2(t,i);var r=t.iadd(i);return r.cmp(this.m)>=0&&r.isub(this.m),r},M.prototype.sub=function(t,i){this._verify2(t,i);var r=t.sub(i);return r.cmpn(0)<0&&r.iadd(this.m),r._forceRed(this)},M.prototype.isub=function(t,i){this._verify2(t,i);var r=t.isub(i);return r.cmpn(0)<0&&r.iadd(this.m),r},M.prototype.shl=function(t,i){return this._verify1(t),this.imod(t.ushln(i))},M.prototype.imul=function(t,i){return this._verify2(t,i),this.imod(t.imul(i))},M.prototype.mul=function(t,i){return this._verify2(t,i),this.imod(t.mul(i))},M.prototype.isqr=function(t){return this.imul(t,t.clone())},M.prototype.sqr=function(t){return this.mul(t,t)},M.prototype.sqrt=function(t){if(t.isZero())return t.clone();var i=this.m.andln(3);if(r(i%2==1),3===i){var h=this.m.add(new n(1)).iushrn(2);return this.pow(t,h)}for(var e=this.m.subn(1),o=0;!e.isZero()&&0===e.andln(1);)o++,e.iushrn(1);r(!e.isZero());var s=new n(1).toRed(this),u=s.redNeg(),a=this.m.subn(1).iushrn(1),l=this.m.bitLength();for(l=new n(2*l*l).toRed(this);0!==this.pow(l,a).cmp(u);)l.redIAdd(u);for(var m=this.pow(l,e),f=this.pow(t,e.addn(1).iushrn(1)),d=this.pow(t,e),p=o;0!==d.cmp(s);){for(var M=d,v=0;0!==M.cmp(s);v++)M=M.redSqr();r(v<p);var g=this.pow(m,new n(1).iushln(p-v-1));f=f.redMul(g),m=g.redSqr(),d=d.redMul(m),p=v}return f},M.prototype.invm=function(t){var i=t._invmp(this.m);return 0!==i.negative?(i.negative=0,this.imod(i).redNeg()):this.imod(i)},M.prototype.pow=function(t,i){if(i.isZero())return new n(1).toRed(this);if(0===i.cmpn(1))return t.clone();var r=new Array(16);r[0]=new n(1).toRed(this),r[1]=t;for(var h=2;h<r.length;h++)r[h]=this.mul(r[h-1],t);var e=r[0],o=0,s=0,u=i.bitLength()%26;for(0===u&&(u=26),h=i.length-1;h>=0;h--){for(var a=i.words[h],l=u-1;l>=0;l--){var m=a>>l&1;e!==r[0]&&(e=this.sqr(e)),0!==m||0!==o?(o<<=1,o|=m,(4===++s||0===h&&0===l)&&(e=this.mul(e,r[o]),s=0,o=0)):s=0}u=26}return e},M.prototype.convertTo=function(t){var i=t.umod(this.m);return i===t?i.clone():i},M.prototype.convertFrom=function(t){var i=t.clone();return i.red=null,i},n.mont=function(t){return new v(t)},h(v,M),v.prototype.convertTo=function(t){return this.imod(t.ushln(this.shift))},v.prototype.convertFrom=function(t){var i=this.imod(t.mul(this.rinv));return i.red=null,i},v.prototype.imul=function(t,i){if(t.isZero()||i.isZero())return t.words[0]=0,t.length=1,t;var r=t.imul(i),h=r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),n=r.isub(h).iushrn(this.shift),e=n;return n.cmp(this.m)>=0?e=n.isub(this.m):n.cmpn(0)<0&&(e=n.iadd(this.m)),e._forceRed(this)},v.prototype.mul=function(t,i){if(t.isZero()||i.isZero())return new n(0)._forceRed(this);var r=t.mul(i),h=r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),e=r.isub(h).iushrn(this.shift),o=e;return e.cmp(this.m)>=0?o=e.isub(this.m):e.cmpn(0)<0&&(o=e.iadd(this.m)),o._forceRed(this)},v.prototype.invm=function(t){return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)}}("undefined"==typeof module||module,this);

},{"buffer":91}],90:[function(require,module,exports){
function Rand(t){this.rand=t}var r;if(module.exports=function(t){return r||(r=new Rand(null)),r.generate(t)},module.exports.Rand=Rand,Rand.prototype.generate=function(t){return this._rand(t)},Rand.prototype._rand=function(t){if(this.rand.getBytes)return this.rand.getBytes(t);for(var r=new Uint8Array(t),e=0;e<r.length;e++)r[e]=this.rand.getByte();return r},"object"==typeof self)self.crypto&&self.crypto.getRandomValues?Rand.prototype._rand=function(t){var r=new Uint8Array(t);return self.crypto.getRandomValues(r),r}:self.msCrypto&&self.msCrypto.getRandomValues?Rand.prototype._rand=function(t){var r=new Uint8Array(t);return self.msCrypto.getRandomValues(r),r}:"object"==typeof window&&(Rand.prototype._rand=function(){throw new Error("Not implemented yet")});else try{var crypto=require("crypto");if("function"!=typeof crypto.randomBytes)throw new Error("Not supported");Rand.prototype._rand=function(t){return crypto.randomBytes(t)}}catch(t){}

},{"crypto":91}],91:[function(require,module,exports){

},{}],92:[function(require,module,exports){
function asUInt32Array(r){Buffer.isBuffer(r)||(r=Buffer.from(r));for(var e=r.length/4|0,t=new Array(e),n=0;n<e;n++)t[n]=r.readUInt32BE(4*n);return t}function scrubVec(r){for(;0<r.length;r++)r[0]=0}function cryptBlock(r,e,t,n,o){for(var S,B,c,i,u=t[0],f=t[1],s=t[2],a=t[3],y=r[0]^e[0],_=r[1]^e[1],I=r[2]^e[2],l=r[3]^e[3],X=4,h=1;h<o;h++)S=u[y>>>24]^f[_>>>16&255]^s[I>>>8&255]^a[255&l]^e[X++],B=u[_>>>24]^f[I>>>16&255]^s[l>>>8&255]^a[255&y]^e[X++],c=u[I>>>24]^f[l>>>16&255]^s[y>>>8&255]^a[255&_]^e[X++],i=u[l>>>24]^f[y>>>16&255]^s[_>>>8&255]^a[255&I]^e[X++],y=S,_=B,I=c,l=i;return S=(n[y>>>24]<<24|n[_>>>16&255]<<16|n[I>>>8&255]<<8|n[255&l])^e[X++],B=(n[_>>>24]<<24|n[I>>>16&255]<<16|n[l>>>8&255]<<8|n[255&y])^e[X++],c=(n[I>>>24]<<24|n[l>>>16&255]<<16|n[y>>>8&255]<<8|n[255&_])^e[X++],i=(n[l>>>24]<<24|n[y>>>16&255]<<16|n[_>>>8&255]<<8|n[255&I])^e[X++],S>>>=0,B>>>=0,c>>>=0,i>>>=0,[S,B,c,i]}function AES(r){this._key=asUInt32Array(r),this._reset()}var Buffer=require("safe-buffer").Buffer,RCON=[0,1,2,4,8,16,32,64,128,27,54],G=function(){for(var r=new Array(256),e=0;e<256;e++)r[e]=e<128?e<<1:e<<1^283;for(var t=[],n=[],o=[[],[],[],[]],S=[[],[],[],[]],B=0,c=0,i=0;i<256;++i){var u=c^c<<1^c<<2^c<<3^c<<4;u=u>>>8^255&u^99,t[B]=u,n[u]=B;var f=r[B],s=r[f],a=r[s],y=257*r[u]^16843008*u;o[0][B]=y<<24|y>>>8,o[1][B]=y<<16|y>>>16,o[2][B]=y<<8|y>>>24,o[3][B]=y,y=16843009*a^65537*s^257*f^16843008*B,S[0][u]=y<<24|y>>>8,S[1][u]=y<<16|y>>>16,S[2][u]=y<<8|y>>>24,S[3][u]=y,0===B?B=c=1:(B=f^r[r[r[a^f]]],c^=r[r[c]])}return{SBOX:t,INV_SBOX:n,SUB_MIX:o,INV_SUB_MIX:S}}();AES.blockSize=16,AES.keySize=32,AES.prototype.blockSize=AES.blockSize,AES.prototype.keySize=AES.keySize,AES.prototype._reset=function(){for(var r=this._key,e=r.length,t=e+6,n=4*(t+1),o=[],S=0;S<e;S++)o[S]=r[S];for(S=e;S<n;S++){var B=o[S-1];S%e==0?(B=B<<8|B>>>24,B=G.SBOX[B>>>24]<<24|G.SBOX[B>>>16&255]<<16|G.SBOX[B>>>8&255]<<8|G.SBOX[255&B],B^=RCON[S/e|0]<<24):e>6&&S%e==4&&(B=G.SBOX[B>>>24]<<24|G.SBOX[B>>>16&255]<<16|G.SBOX[B>>>8&255]<<8|G.SBOX[255&B]),o[S]=o[S-e]^B}for(var c=[],i=0;i<n;i++){var u=n-i,f=o[u-(i%4?0:4)];c[i]=i<4||u<=4?f:G.INV_SUB_MIX[0][G.SBOX[f>>>24]]^G.INV_SUB_MIX[1][G.SBOX[f>>>16&255]]^G.INV_SUB_MIX[2][G.SBOX[f>>>8&255]]^G.INV_SUB_MIX[3][G.SBOX[255&f]]}this._nRounds=t,this._keySchedule=o,this._invKeySchedule=c},AES.prototype.encryptBlockRaw=function(r){return r=asUInt32Array(r),cryptBlock(r,this._keySchedule,G.SUB_MIX,G.SBOX,this._nRounds)},AES.prototype.encryptBlock=function(r){var e=this.encryptBlockRaw(r),t=Buffer.allocUnsafe(16);return t.writeUInt32BE(e[0],0),t.writeUInt32BE(e[1],4),t.writeUInt32BE(e[2],8),t.writeUInt32BE(e[3],12),t},AES.prototype.decryptBlock=function(r){var e=(r=asUInt32Array(r))[1];r[1]=r[3],r[3]=e;var t=cryptBlock(r,this._invKeySchedule,G.INV_SUB_MIX,G.INV_SBOX,this._nRounds),n=Buffer.allocUnsafe(16);return n.writeUInt32BE(t[0],0),n.writeUInt32BE(t[3],4),n.writeUInt32BE(t[2],8),n.writeUInt32BE(t[1],12),n},AES.prototype.scrub=function(){scrubVec(this._keySchedule),scrubVec(this._invKeySchedule),scrubVec(this._key)},module.exports.AES=AES;

var Buffer = require('safe-buffer').Buffer

function asUInt32Array (buf) {
  if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf)

  var len = (buf.length / 4) | 0
  var out = new Array(len)

  for (var i = 0; i < len; i++) {
    out[i] = buf.readUInt32BE(i * 4)
  }

  return out
}

function scrubVec (v) {
  for (var i = 0; i < v.length; v++) {
    v[i] = 0
  }
}

function cryptBlock (M, keySchedule, SUB_MIX, SBOX, nRounds) {
  var SUB_MIX0 = SUB_MIX[0]
  var SUB_MIX1 = SUB_MIX[1]
  var SUB_MIX2 = SUB_MIX[2]
  var SUB_MIX3 = SUB_MIX[3]

  var s0 = M[0] ^ keySchedule[0]
  var s1 = M[1] ^ keySchedule[1]
  var s2 = M[2] ^ keySchedule[2]
  var s3 = M[3] ^ keySchedule[3]
  var t0, t1, t2, t3
  var ksRow = 4

  for (var round = 1; round < nRounds; round++) {
    t0 = SUB_MIX0[s0 >>> 24] ^ SUB_MIX1[(s1 >>> 16) & 0xff] ^ SUB_MIX2[(s2 >>> 8) & 0xff] ^ SUB_MIX3[s3 & 0xff] ^ keySchedule[ksRow++]
    t1 = SUB_MIX0[s1 >>> 24] ^ SUB_MIX1[(s2 >>> 16) & 0xff] ^ SUB_MIX2[(s3 >>> 8) & 0xff] ^ SUB_MIX3[s0 & 0xff] ^ keySchedule[ksRow++]
    t2 = SUB_MIX0[s2 >>> 24] ^ SUB_MIX1[(s3 >>> 16) & 0xff] ^ SUB_MIX2[(s0 >>> 8) & 0xff] ^ SUB_MIX3[s1 & 0xff] ^ keySchedule[ksRow++]
    t3 = SUB_MIX0[s3 >>> 24] ^ SUB_MIX1[(s0 >>> 16) & 0xff] ^ SUB_MIX2[(s1 >>> 8) & 0xff] ^ SUB_MIX3[s2 & 0xff] ^ keySchedule[ksRow++]
    s0 = t0
    s1 = t1
    s2 = t2
    s3 = t3
  }

  t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++]
  t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++]
  t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++]
  t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++]
  t0 = t0 >>> 0
  t1 = t1 >>> 0
  t2 = t2 >>> 0
  t3 = t3 >>> 0

  return [t0, t1, t2, t3]
}

// AES constants
var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36]
var G = (function () {
  // Compute double table
  var d = new Array(256)
  for (var j = 0; j < 256; j++) {
    if (j < 128) {
      d[j] = j << 1
    } else {
      d[j] = (j << 1) ^ 0x11b
    }
  }

  var SBOX = []
  var INV_SBOX = []
  var SUB_MIX = [[], [], [], []]
  var INV_SUB_MIX = [[], [], [], []]

  // Walk GF(2^8)
  var x = 0
  var xi = 0
  for (var i = 0; i < 256; ++i) {
    // Compute sbox
    var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4)
    sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63
    SBOX[x] = sx
    INV_SBOX[sx] = x

    // Compute multiplication
    var x2 = d[x]
    var x4 = d[x2]
    var x8 = d[x4]

    // Compute sub bytes, mix columns tables
    var t = (d[sx] * 0x101) ^ (sx * 0x1010100)
    SUB_MIX[0][x] = (t << 24) | (t >>> 8)
    SUB_MIX[1][x] = (t << 16) | (t >>> 16)
    SUB_MIX[2][x] = (t << 8) | (t >>> 24)
    SUB_MIX[3][x] = t

    // Compute inv sub bytes, inv mix columns tables
    t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100)
    INV_SUB_MIX[0][sx] = (t << 24) | (t >>> 8)
    INV_SUB_MIX[1][sx] = (t << 16) | (t >>> 16)
    INV_SUB_MIX[2][sx] = (t << 8) | (t >>> 24)
    INV_SUB_MIX[3][sx] = t

    if (x === 0) {
      x = xi = 1
    } else {
      x = x2 ^ d[d[d[x8 ^ x2]]]
      xi ^= d[d[xi]]
    }
  }

  return {
    SBOX: SBOX,
    INV_SBOX: INV_SBOX,
    SUB_MIX: SUB_MIX,
    INV_SUB_MIX: INV_SUB_MIX
  }
})()

function AES (key) {
  this._key = asUInt32Array(key)
  this._reset()
}

AES.blockSize = 4 * 4
AES.keySize = 256 / 8
AES.prototype.blockSize = AES.blockSize
AES.prototype.keySize = AES.keySize
AES.prototype._reset = function () {
  var keyWords = this._key
  var keySize = keyWords.length
  var nRounds = keySize + 6
  var ksRows = (nRounds + 1) * 4

  var keySchedule = []
  for (var k = 0; k < keySize; k++) {
    keySchedule[k] = keyWords[k]
  }

  for (k = keySize; k < ksRows; k++) {
    var t = keySchedule[k - 1]

    if (k % keySize === 0) {
      t = (t << 8) | (t >>> 24)
      t =
        (G.SBOX[t >>> 24] << 24) |
        (G.SBOX[(t >>> 16) & 0xff] << 16) |
        (G.SBOX[(t >>> 8) & 0xff] << 8) |
        (G.SBOX[t & 0xff])

      t ^= RCON[(k / keySize) | 0] << 24
    } else if (keySize > 6 && k % keySize === 4) {
      t =
        (G.SBOX[t >>> 24] << 24) |
        (G.SBOX[(t >>> 16) & 0xff] << 16) |
        (G.SBOX[(t >>> 8) & 0xff] << 8) |
        (G.SBOX[t & 0xff])
    }

    keySchedule[k] = keySchedule[k - keySize] ^ t
  }

  var invKeySchedule = []
  for (var ik = 0; ik < ksRows; ik++) {
    var ksR = ksRows - ik
    var tt = keySchedule[ksR - (ik % 4 ? 0 : 4)]

    if (ik < 4 || ksR <= 4) {
      invKeySchedule[ik] = tt
    } else {
      invKeySchedule[ik] =
        G.INV_SUB_MIX[0][G.SBOX[tt >>> 24]] ^
        G.INV_SUB_MIX[1][G.SBOX[(tt >>> 16) & 0xff]] ^
        G.INV_SUB_MIX[2][G.SBOX[(tt >>> 8) & 0xff]] ^
        G.INV_SUB_MIX[3][G.SBOX[tt & 0xff]]
    }
  }

  this._nRounds = nRounds
  this._keySchedule = keySchedule
  this._invKeySchedule = invKeySchedule
}

AES.prototype.encryptBlockRaw = function (M) {
  M = asUInt32Array(M)
  return cryptBlock(M, this._keySchedule, G.SUB_MIX, G.SBOX, this._nRounds)
}

AES.prototype.encryptBlock = function (M) {
  var out = this.encryptBlockRaw(M)
  var buf = Buffer.allocUnsafe(16)
  buf.writeUInt32BE(out[0], 0)
  buf.writeUInt32BE(out[1], 4)
  buf.writeUInt32BE(out[2], 8)
  buf.writeUInt32BE(out[3], 12)
  return buf
}

AES.prototype.decryptBlock = function (M) {
  M = asUInt32Array(M)

  // swap
  var m1 = M[1]
  M[1] = M[3]
  M[3] = m1

  var out = cryptBlock(M, this._invKeySchedule, G.INV_SUB_MIX, G.INV_SBOX, this._nRounds)
  var buf = Buffer.allocUnsafe(16)
  buf.writeUInt32BE(out[0], 0)
  buf.writeUInt32BE(out[3], 4)
  buf.writeUInt32BE(out[2], 8)
  buf.writeUInt32BE(out[1], 12)
  return buf
}

AES.prototype.scrub = function () {
  scrubVec(this._keySchedule)
  scrubVec(this._invKeySchedule)
  scrubVec(this._key)
}

module.exports.AES = AES

},{"safe-buffer":215}],93:[function(require,module,exports){
var aes = require('./aes')
var Buffer = require('safe-buffer').Buffer
var Transform = require('cipher-base')
var inherits = require('inherits')
var GHASH = require('./ghash')
var xor = require('buffer-xor')
var incr32 = require('./incr32')

function xorTest (a, b) {
  var out = 0
  if (a.length !== b.length) out++

  var len = Math.min(a.length, b.length)
  for (var i = 0; i < len; ++i) {
    out += (a[i] ^ b[i])
  }

  return out
}

function calcIv (self, iv, ck) {
  if (iv.length === 12) {
    self._finID = Buffer.concat([iv, Buffer.from([0, 0, 0, 1])])
    return Buffer.concat([iv, Buffer.from([0, 0, 0, 2])])
  }
  var ghash = new GHASH(ck)
  var len = iv.length
  var toPad = len % 16
  ghash.update(iv)
  if (toPad) {
    toPad = 16 - toPad
    ghash.update(Buffer.alloc(toPad, 0))
  }
  ghash.update(Buffer.alloc(8, 0))
  var ivBits = len * 8
  var tail = Buffer.alloc(8)
  tail.writeUIntBE(ivBits, 0, 8)
  ghash.update(tail)
  self._finID = ghash.state
  var out = Buffer.from(self._finID)
  incr32(out)
  return out
}
function StreamCipher (mode, key, iv, decrypt) {
  Transform.call(this)

  var h = Buffer.alloc(4, 0)

  this._cipher = new aes.AES(key)
  var ck = this._cipher.encryptBlock(h)
  this._ghash = new GHASH(ck)
  iv = calcIv(this, iv, ck)

  this._prev = Buffer.from(iv)
  this._cache = Buffer.allocUnsafe(0)
  this._secCache = Buffer.allocUnsafe(0)
  this._decrypt = decrypt
  this._alen = 0
  this._len = 0
  this._mode = mode

  this._authTag = null
  this._called = false
}

inherits(StreamCipher, Transform)

StreamCipher.prototype._update = function (chunk) {
  if (!this._called && this._alen) {
    var rump = 16 - (this._alen % 16)
    if (rump < 16) {
      rump = Buffer.alloc(rump, 0)
      this._ghash.update(rump)
    }
  }

  this._called = true
  var out = this._mode.encrypt(this, chunk)
  if (this._decrypt) {
    this._ghash.update(chunk)
  } else {
    this._ghash.update(out)
  }
  this._len += chunk.length
  return out
}

StreamCipher.prototype._final = function () {
  if (this._decrypt && !this._authTag) throw new Error('Unsupported state or unable to authenticate data')

  var tag = xor(this._ghash.final(this._alen * 8, this._len * 8), this._cipher.encryptBlock(this._finID))
  if (this._decrypt && xorTest(tag, this._authTag)) throw new Error('Unsupported state or unable to authenticate data')

  this._authTag = tag
  this._cipher.scrub()
}

StreamCipher.prototype.getAuthTag = function getAuthTag () {
  if (this._decrypt || !Buffer.isBuffer(this._authTag)) throw new Error('Attempting to get auth tag in unsupported state')

  return this._authTag
}

StreamCipher.prototype.setAuthTag = function setAuthTag (tag) {
  if (!this._decrypt) throw new Error('Attempting to set auth tag in unsupported state')

  this._authTag = tag
}

StreamCipher.prototype.setAAD = function setAAD (buf) {
  if (this._called) throw new Error('Attempting to set AAD in unsupported state')

  this._ghash.update(buf)
  this._alen += buf.length
}

module.exports = StreamCipher

},{"./aes":92,"./ghash":97,"./incr32":98,"buffer-xor":119,"cipher-base":121,"inherits":174,"safe-buffer":215}],94:[function(require,module,exports){
var ciphers = require('./encrypter')
var deciphers = require('./decrypter')
var modes = require('./modes/list.json')

},{"./decrypter":95,"./encrypter":96,"./modes/list.json":106}],95:[function(require,module,exports){
function Decipher(e,t,r){Transform.call(this),this._cache=new Splitter,this._last=void 0,this._cipher=new aes.AES(t),this._prev=Buffer.from(r),this._mode=e,this._autopadding=!0}function Splitter(){this.cache=Buffer.allocUnsafe(0)}function unpad(e){for(var t=e[15],r=-1;++r<t;)if(e[r+(16-t)]!==t)throw new Error("unable to decrypt data");if(16!==t)return e.slice(0,16-t)}function createDecipheriv(e,t,r){var i=MODES[e.toLowerCase()];if(!i)throw new TypeError("invalid suite type");if("string"==typeof r&&(r=Buffer.from(r)),"GCM"!==i.mode&&r.length!==i.iv)throw new TypeError("invalid iv length "+r.length);if("string"==typeof t&&(t=Buffer.from(t)),t.length!==i.key/8)throw new TypeError("invalid key length "+t.length);return"stream"===i.type?new StreamCipher(i.module,t,r,!0):"auth"===i.type?new AuthCipher(i.module,t,r,!0):new Decipher(i.module,t,r)}function createDecipher(e,t){var r=MODES[e.toLowerCase()];if(!r)throw new TypeError("invalid suite type");var i=ebtk(t,!1,r.key,r.iv);return createDecipheriv(e,i.key,i.iv)}var AuthCipher=require("./authCipher"),Buffer=require("safe-buffer").Buffer,MODES=require("./modes"),StreamCipher=require("./streamCipher"),Transform=require("cipher-base"),aes=require("./aes"),ebtk=require("evp_bytestokey"),inherits=require("inherits");inherits(Decipher,Transform),Decipher.prototype._update=function(e){this._cache.add(e);for(var t,r,i=[];t=this._cache.get(this._autopadding);)r=this._mode.decrypt(this,t),i.push(r);return Buffer.concat(i)},Decipher.prototype._final=function(){var e=this._cache.flush();if(this._autopadding)return unpad(this._mode.decrypt(this,e));if(e)throw new Error("data not multiple of block length")},Decipher.prototype.setAutoPadding=function(e){return this._autopadding=!!e,this},Splitter.prototype.add=function(e){this.cache=Buffer.concat([this.cache,e])},Splitter.prototype.get=function(e){var t;if(e){if(this.cache.length>16)return t=this.cache.slice(0,16),this.cache=this.cache.slice(16),t}else if(this.cache.length>=16)return t=this.cache.slice(0,16),this.cache=this.cache.slice(16),t;return null},Splitter.prototype.flush=function(){if(this.cache.length)return this.cache},exports.createDecipher=createDecipher,exports.createDecipheriv=createDecipheriv;

function Decipher (mode, key, iv) {
  Transform.call(this)

  this._cache = new Splitter()
  this._last = void 0
  this._cipher = new aes.AES(key)
  this._prev = Buffer.from(iv)
  this._mode = mode
  this._autopadding = true
}

inherits(Decipher, Transform)

Decipher.prototype._update = function (data) {
  this._cache.add(data)
  var chunk
  var thing
  var out = []
  while ((chunk = this._cache.get(this._autopadding))) {
    thing = this._mode.decrypt(this, chunk)
    out.push(thing)
  }
  return Buffer.concat(out)
}

Decipher.prototype._final = function () {
  var chunk = this._cache.flush()
  if (this._autopadding) {
    return unpad(this._mode.decrypt(this, chunk))
  } else if (chunk) {
    throw new Error('data not multiple of block length')
  }
}

Decipher.prototype.setAutoPadding = function (setTo) {
  this._autopadding = !!setTo
  return this
}

function Splitter () {
  this.cache = Buffer.allocUnsafe(0)
}

Splitter.prototype.add = function (data) {
  this.cache = Buffer.concat([this.cache, data])
}

Splitter.prototype.get = function (autoPadding) {
  var out
  if (autoPadding) {
    if (this.cache.length > 16) {
      out = this.cache.slice(0, 16)
      this.cache = this.cache.slice(16)
      return out
    }
  } else {
    if (this.cache.length >= 16) {
      out = this.cache.slice(0, 16)
      this.cache = this.cache.slice(16)
      return out
    }
  }

  return null
}

Splitter.prototype.flush = function () {
  if (this.cache.length) return this.cache
}

function unpad (last) {
  var padded = last[15]
  var i = -1
  while (++i < padded) {
    if (last[(i + (16 - padded))] !== padded) {
      throw new Error('unable to decrypt data')
    }
  }
  if (padded === 16) return

  return last.slice(0, 16 - padded)
}

function createDecipheriv (suite, password, iv) {
  var config = MODES[suite.toLowerCase()]
  if (!config) throw new TypeError('invalid suite type')

  if (typeof iv === 'string') iv = Buffer.from(iv)
  if (config.mode !== 'GCM' && iv.length !== config.iv) throw new TypeError('invalid iv length ' + iv.length)

  if (typeof password === 'string') password = Buffer.from(password)
  if (password.length !== config.key / 8) throw new TypeError('invalid key length ' + password.length)

  if (config.type === 'stream') {
    return new StreamCipher(config.module, password, iv, true)
  } else if (config.type === 'auth') {
    return new AuthCipher(config.module, password, iv, true)
  }

  return new Decipher(config.module, password, iv)
}

function createDecipher (suite, password) {
  var config = MODES[suite.toLowerCase()]
  if (!config) throw new TypeError('invalid suite type')

  var keys = ebtk(password, false, config.key, config.iv)
  return createDecipheriv(suite, keys.key, keys.iv)
}

exports.createDecipher = createDecipher
exports.createDecipheriv = createDecipheriv

},{"./aes":92,"./authCipher":93,"./modes":105,"./streamCipher":108,"cipher-base":121,"evp_bytestokey":157,"inherits":174,"safe-buffer":215}],96:[function(require,module,exports){
var MODES = require('./modes')
var AuthCipher = require('./authCipher')
var Buffer = require('safe-buffer').Buffer
var StreamCipher = require('./streamCipher')
var Transform = require('cipher-base')
var aes = require('./aes')
var ebtk = require('evp_bytestokey')
var inherits = require('inherits')

function Cipher (mode, key, iv) {
  Transform.call(this)

  this._cache = new Splitter()
  this._cipher = new aes.AES(key)
  this._prev = Buffer.from(iv)
  this._mode = mode
  this._autopadding = true
}

inherits(Cipher, Transform)

Cipher.prototype._update = function (data) {
  this._cache.add(data)
  var chunk
  var thing
  var out = []

  while ((chunk = this._cache.get())) {
    thing = this._mode.encrypt(this, chunk)
    out.push(thing)
  }

  return Buffer.concat(out)
}

var PADDING = Buffer.alloc(16, 0x10)

Cipher.prototype._final = function () {
  var chunk = this._cache.flush()
  if (this._autopadding) {
    chunk = this._mode.encrypt(this, chunk)
    this._cipher.scrub()
    return chunk
  }

  if (!chunk.equals(PADDING)) {
    this._cipher.scrub()
    throw new Error('data not multiple of block length')
  }
}

Cipher.prototype.setAutoPadding = function (setTo) {
  this._autopadding = !!setTo
  return this
}

function Splitter () {
  this.cache = Buffer.allocUnsafe(0)
}

Splitter.prototype.add = function (data) {
  this.cache = Buffer.concat([this.cache, data])
}

Splitter.prototype.get = function () {
  if (this.cache.length > 15) {
    var out = this.cache.slice(0, 16)
    this.cache = this.cache.slice(16)
    return out
  }
  return null
}

Splitter.prototype.flush = function () {
  var len = 16 - this.cache.length
  var padBuff = Buffer.allocUnsafe(len)

  var i = -1
  while (++i < len) {
    padBuff.writeUInt8(len, i)
  }

  return Buffer.concat([this.cache, padBuff])
}

function createCipheriv (suite, password, iv) {
  var config = MODES[suite.toLowerCase()]
  if (!config) throw new TypeError('invalid suite type')

  if (typeof password === 'string') password = Buffer.from(password)
  if (password.length !== config.key / 8) throw new TypeError('invalid key length ' + password.length)

  if (typeof iv === 'string') iv = Buffer.from(iv)
  if (config.mode !== 'GCM' && iv.length !== config.iv) throw new TypeError('invalid iv length ' + iv.length)

  if (config.type === 'stream') {
    return new StreamCipher(config.module, password, iv)
  } else if (config.type === 'auth') {
    return new AuthCipher(config.module, password, iv)
  }

  return new Cipher(config.module, password, iv)
}

function createCipher (suite, password) {
  var config = MODES[suite.toLowerCase()]
  if (!config) throw new TypeError('invalid suite type')

  var keys = ebtk(password, false, config.key, config.iv)
  return createCipheriv(suite, keys.key, keys.iv)
}

exports.createCipheriv = createCipheriv
exports.createCipher = createCipher

},{"./aes":92,"./authCipher":93,"./modes":105,"./streamCipher":108,"cipher-base":121,"evp_bytestokey":157,"inherits":174,"safe-buffer":215}],97:[function(require,module,exports){
var Buffer = require('safe-buffer').Buffer
var ZEROES = Buffer.alloc(16, 0)

function toArray (buf) {
  return [
    buf.readUInt32BE(0),
    buf.readUInt32BE(4),
    buf.readUInt32BE(8),
    buf.readUInt32BE(12)
  ]
}

function fromArray (out) {
  var buf = Buffer.allocUnsafe(16)
  buf.writeUInt32BE(out[0] >>> 0, 0)
  buf.writeUInt32BE(out[1] >>> 0, 4)
  buf.writeUInt32BE(out[2] >>> 0, 8)
  buf.writeUInt32BE(out[3] >>> 0, 12)
  return buf
}

function GHASH (key) {
  this.h = key
  this.state = Buffer.alloc(16, 0)
  this.cache = Buffer.allocUnsafe(0)
}

// from http://bitwiseshiftleft.github.io/sjcl/doc/symbols/src/core_gcm.js.html
// by Juho Vähä-Herttua
GHASH.prototype.ghash = function (block) {
  var i = -1
  while (++i < block.length) {
    this.state[i] ^= block[i]
  }
  this._multiply()
}

GHASH.prototype._multiply = function () {
  var Vi = toArray(this.h)
  var Zi = [0, 0, 0, 0]
  var j, xi, lsbVi
  var i = -1
  while (++i < 128) {
    xi = (this.state[~~(i / 8)] & (1 << (7 - (i % 8)))) !== 0
    if (xi) {
      // Z_i+1 = Z_i ^ V_i
      Zi[0] ^= Vi[0]
      Zi[1] ^= Vi[1]
      Zi[2] ^= Vi[2]
      Zi[3] ^= Vi[3]
    }

    // Store the value of LSB(V_i)
    lsbVi = (Vi[3] & 1) !== 0

    // V_i+1 = V_i >> 1
    for (j = 3; j > 0; j--) {
      Vi[j] = (Vi[j] >>> 1) | ((Vi[j - 1] & 1) << 31)
    }
    Vi[0] = Vi[0] >>> 1

    // If LSB(V_i) is 1, V_i+1 = (V_i >> 1) ^ R
    if (lsbVi) {
      Vi[0] = Vi[0] ^ (0xe1 << 24)
    }
  }
  this.state = fromArray(Zi)
}

GHASH.prototype.update = function (buf) {
  this.cache = Buffer.concat([this.cache, buf])
  var chunk
  while (this.cache.length >= 16) {
    chunk = this.cache.slice(0, 16)
    this.cache = this.cache.slice(16)
    this.ghash(chunk)
  }
}

GHASH.prototype.final = function (abl, bl) {
  if (this.cache.length) {
    this.ghash(Buffer.concat([this.cache, ZEROES], 16))
  }

  this.ghash(fromArray([0, abl, 0, bl]))
  return this.state
}

module.exports = GHASH

},{"safe-buffer":215}],98:[function(require,module,exports){
function incr32 (iv) {
  var len = iv.length
  var item
  while (len--) {
    item = iv.readUInt8(len)
    if (item === 255) {
      iv.writeUInt8(0, len)
    } else {
      item++
      iv.writeUInt8(item, len)
      break
    }
  }
}
module.exports = incr32

},{}],99:[function(require,module,exports){
var xor=require("buffer-xor");exports.encrypt=function(r,e){var p=xor(e,r._prev);return r._prev=r._cipher.encryptBlock(p),r._prev},exports.decrypt=function(r,e){var p=r._prev;r._prev=e;var c=r._cipher.decryptBlock(e);return xor(c,p)};

},{"buffer-xor":119}],100:[function(require,module,exports){
function encryptStart(e,r,c){var f=r.length,t=xor(r,e._cache);return e._cache=e._cache.slice(f),e._prev=Buffer.concat([e._prev,c?r:t]),t}var Buffer=require("safe-buffer").Buffer,xor=require("buffer-xor");exports.encrypt=function(e,r,c){for(var f,t=Buffer.allocUnsafe(0);r.length;){if(0===e._cache.length&&(e._cache=e._cipher.encryptBlock(e._prev),e._prev=Buffer.allocUnsafe(0)),!(e._cache.length<=r.length)){t=Buffer.concat([t,encryptStart(e,r,c)]);break}f=e._cache.length,t=Buffer.concat([t,encryptStart(e,r.slice(0,f),c)]),r=r.slice(f)}return t};

function encryptStart (self, data, decrypt) {
  var len = data.length
  var out = xor(data, self._cache)
  self._cache = self._cache.slice(len)
  self._prev = Buffer.concat([self._prev, decrypt ? data : out])
  return out
}

exports.encrypt = function (self, data, decrypt) {
  var out = Buffer.allocUnsafe(0)
  var len

  while (data.length) {
    if (self._cache.length === 0) {
      self._cache = self._cipher.encryptBlock(self._prev)
      self._prev = Buffer.allocUnsafe(0)
    }

    if (self._cache.length <= data.length) {
      len = self._cache.length
      out = Buffer.concat([out, encryptStart(self, data.slice(0, len), decrypt)])
      data = data.slice(len)
    } else {
      out = Buffer.concat([out, encryptStart(self, data, decrypt)])
      break
    }
  }

  return out
}

},{"buffer-xor":119,"safe-buffer":215}],101:[function(require,module,exports){
var Buffer = require('safe-buffer').Buffer

function encryptByte (self, byteParam, decrypt) {
  var pad
  var i = -1
  var len = 8
  var out = 0
  var bit, value
  while (++i < len) {
    pad = self._cipher.encryptBlock(self._prev)
    bit = (byteParam & (1 << (7 - i))) ? 0x80 : 0
    value = pad[0] ^ bit
    out += ((value & 0x80) >> (i % 8))
    self._prev = shiftIn(self._prev, decrypt ? bit : value)
  }
  return out
}

function shiftIn (buffer, value) {
  var len = buffer.length
  var i = -1
  var out = Buffer.allocUnsafe(buffer.length)
  buffer = Buffer.concat([buffer, Buffer.from([value])])

  while (++i < len) {
    out[i] = buffer[i] << 1 | buffer[i + 1] >> (7)
  }

  return out
}

exports.encrypt = function (self, chunk, decrypt) {
  var len = chunk.length
  var out = Buffer.allocUnsafe(len)
  var i = -1

  while (++i < len) {
    out[i] = encryptByte(self, chunk[i], decrypt)
  }

  return out
}

},{"safe-buffer":215}],102:[function(require,module,exports){
(function (Buffer){
function encryptByte (self, byteParam, decrypt) {
  var pad = self._cipher.encryptBlock(self._prev)
  var out = pad[0] ^ byteParam

  self._prev = Buffer.concat([
    self._prev.slice(1),
    Buffer.from([decrypt ? byteParam : out])
  ])

  return out
}

exports.encrypt = function (self, chunk, decrypt) {
  var len = chunk.length
  var out = Buffer.allocUnsafe(len)
  var i = -1

  while (++i < len) {
    out[i] = encryptByte(self, chunk[i], decrypt)
  }

  return out
}

}).call(this,require("buffer").Buffer)
},{"buffer":120}],103:[function(require,module,exports){
(function (Buffer){
var xor = require('buffer-xor')

var incr32 = require('../incr32')

function getBlock (self) {
  var out = self._cipher.encryptBlockRaw(self._prev)
  incr32(self._prev)
  return out
}

var blockSize = 16
exports.encrypt = function (self, chunk) {
  var chunkNum = Math.ceil(chunk.length / blockSize)
  var start = self._cache.length
  self._cache = Buffer.concat([
    self._cache,
    Buffer.allocUnsafe(chunkNum * blockSize)
  ])
  for (var i = 0; i < chunkNum; i++) {
    var out = getBlock(self)
    var offset = start + i * blockSize
    self._cache.writeUInt32BE(out[0], offset + 0)
    self._cache.writeUInt32BE(out[1], offset + 4)
    self._cache.writeUInt32BE(out[2], offset + 8)
    self._cache.writeUInt32BE(out[3], offset + 12)
  }
  var pad = self._cache.slice(0, chunk.length)
  self._cache = self._cache.slice(chunk.length)
  return xor(chunk, pad)
}

}).call(this,require("buffer").Buffer)
},{"../incr32":98,"buffer":120,"buffer-xor":119}],104:[function(require,module,exports){
exports.encrypt = function (self, block) {
  return self._cipher.encryptBlock(block)
}

},{}],105:[function(require,module,exports){
var modeModules={ECB:require("./ecb"),CBC:require("./cbc"),CFB:require("./cfb"),CFB8:require("./cfb8"),CFB1:require("./cfb1"),OFB:require("./ofb"),CTR:require("./ctr"),GCM:require("./ctr")},modes=require("./list.json");for(var key in modes)modes[key].module=modeModules[modes[key].mode];module.exports=modes;

},{"./cbc":99,"./cfb":100,"./cfb1":101,"./cfb8":102,"./ctr":103,"./ecb":104,"./list.json":106,"./ofb":107}],106:[function(require,module,exports){
module.exports={
  "aes-128-ecb": {
    "cipher": "AES",
    "key": 128,
    "iv": 0,
    "mode": "ECB",
    "type": "block"
  },
  "aes-192-ecb": {
    "cipher": "AES",
    "key": 192,
    "iv": 0,
    "mode": "ECB",
    "type": "block"
  },
  "aes-256-ecb": {
    "cipher": "AES",
    "key": 256,
    "iv": 0,
    "mode": "ECB",
    "type": "block"
  },
  "aes-128-cbc": {
    "cipher": "AES",
    "key": 128,
    "iv": 16,
    "mode": "CBC",
    "type": "block"
  },
  "aes-192-cbc": {
    "cipher": "AES",
    "key": 192,
    "iv": 16,
    "mode": "CBC",
    "type": "block"
  },
  "aes-256-cbc": {
    "cipher": "AES",
    "key": 256,
    "iv": 16,
    "mode": "CBC",
    "type": "block"
  },
  "aes128": {
    "cipher": "AES",
    "key": 128,
    "iv": 16,
    "mode": "CBC",
    "type": "block"
  },
  "aes192": {
    "cipher": "AES",
    "key": 192,
    "iv": 16,
    "mode": "CBC",
    "type": "block"
  },
  "aes256": {
    "cipher": "AES",
    "key": 256,
    "iv": 16,
    "mode": "CBC",
    "type": "block"
  },
  "aes-128-cfb": {
    "cipher": "AES",
    "key": 128,
    "iv": 16,
    "mode": "CFB",
    "type": "stream"
  },
  "aes-192-cfb": {
    "cipher": "AES",
    "key": 192,
    "iv": 16,
    "mode": "CFB",
    "type": "stream"
  },
  "aes-256-cfb": {
    "cipher": "AES",
    "key": 256,
    "iv": 16,
    "mode": "CFB",
    "type": "stream"
  },
  "aes-128-cfb8": {
    "cipher": "AES",
    "key": 128,
    "iv": 16,
    "mode": "CFB8",
    "type": "stream"
  },
  "aes-192-cfb8": {
    "cipher": "AES",
    "key": 192,
    "iv": 16,
    "mode": "CFB8",
    "type": "stream"
  },
  "aes-256-cfb8": {
    "cipher": "AES",
    "key": 256,
    "iv": 16,
    "mode": "CFB8",
    "type": "stream"
  },
  "aes-128-cfb1": {
    "cipher": "AES",
    "key": 128,
    "iv": 16,
    "mode": "CFB1",
    "type": "stream"
  },
  "aes-192-cfb1": {
    "cipher": "AES",
    "key": 192,
    "iv": 16,
    "mode": "CFB1",
    "type": "stream"
  },
  "aes-256-cfb1": {
    "cipher": "AES",
    "key": 256,
    "iv": 16,
    "mode": "CFB1",
    "type": "stream"
  },
  "aes-128-ofb": {
    "cipher": "AES",
    "key": 128,
    "iv": 16,
    "mode": "OFB",
    "type": "stream"
  },
  "aes-192-ofb": {
    "cipher": "AES",
    "key": 192,
    "iv": 16,
    "mode": "OFB",
    "type": "stream"
  },
  "aes-256-ofb": {
    "cipher": "AES",
    "key": 256,
    "iv": 16,
    "mode": "OFB",
    "type": "stream"
  },
  "aes-128-ctr": {
    "cipher": "AES",
    "key": 128,
    "iv": 16,
    "mode": "CTR",
    "type": "stream"
  },
  "aes-192-ctr": {
    "cipher": "AES",
    "key": 192,
    "iv": 16,
    "mode": "CTR",
    "type": "stream"
  },
  "aes-256-ctr": {
    "cipher": "AES",
    "key": 256,
    "iv": 16,
    "mode": "CTR",
    "type": "stream"
  },
  "aes-128-gcm": {
    "cipher": "AES",
    "key": 128,
    "iv": 12,
    "mode": "GCM",
    "type": "auth"
  },
  "aes-192-gcm": {
    "cipher": "AES",
    "key": 192,
    "iv": 12,
    "mode": "GCM",
    "type": "auth"
  },
  "aes-256-gcm": {
    "cipher": "AES",
    "key": 256,
    "iv": 12,
    "mode": "GCM",
    "type": "auth"
  }
}

},{}],107:[function(require,module,exports){
(function (Buffer){
function getBlock(e){return e._prev=e._cipher.encryptBlock(e._prev),e._prev}var xor=require("buffer-xor");exports.encrypt=function(e,c){for(;e._cache.length<c.length;)e._cache=Buffer.concat([e._cache,getBlock(e)]);var r=e._cache.slice(0,c.length);return e._cache=e._cache.slice(c.length),xor(c,r)};

}).call(this,require("buffer").Buffer)
},{"buffer":120,"buffer-xor":119}],108:[function(require,module,exports){
function StreamCipher(e,r,i,t){Transform.call(this),this._cipher=new aes.AES(r),this._prev=Buffer.from(i),this._cache=Buffer.allocUnsafe(0),this._secCache=Buffer.allocUnsafe(0),this._decrypt=t,this._mode=e}var aes=require("./aes"),Buffer=require("safe-buffer").Buffer,Transform=require("cipher-base"),inherits=require("inherits");inherits(StreamCipher,Transform),StreamCipher.prototype._update=function(e){return this._mode.encrypt(this,e,this._decrypt)},StreamCipher.prototype._final=function(){this._cipher.scrub()},module.exports=StreamCipher;

function StreamCipher (mode, key, iv, decrypt) {
  Transform.call(this)

  this._cipher = new aes.AES(key)
  this._prev = Buffer.from(iv)
  this._cache = Buffer.allocUnsafe(0)
  this._secCache = Buffer.allocUnsafe(0)
  this._decrypt = decrypt
  this._mode = mode
}

inherits(StreamCipher, Transform)

StreamCipher.prototype._update = function (chunk) {
  return this._mode.encrypt(this, chunk, this._decrypt)
}

StreamCipher.prototype._final = function () {
  this._cipher.scrub()
}

module.exports = StreamCipher

},{"./aes":92,"cipher-base":121,"inherits":174,"safe-buffer":215}],109:[function(require,module,exports){
var ebtk = require('evp_bytestokey')
var aes = require('browserify-aes/browser')
var DES = require('browserify-des')
var desModes = require('browserify-des/modes')
var aesModes = require('browserify-aes/modes')
function createCipher (suite, password) {
  var keyLen, ivLen
  suite = suite.toLowerCase()
  if (aesModes[suite]) {
    keyLen = aesModes[suite].key
    ivLen = aesModes[suite].iv
  } else if (desModes[suite]) {
    keyLen = desModes[suite].key * 8
    ivLen = desModes[suite].iv
  } else {
    throw new TypeError('invalid suite type')
  }
  var keys = ebtk(password, false, keyLen, ivLen)
  return createCipheriv(suite, keys.key, keys.iv)
}
function createDecipher (suite, password) {
  var keyLen, ivLen
  suite = suite.toLowerCase()
  if (aesModes[suite]) {
    keyLen = aesModes[suite].key
    ivLen = aesModes[suite].iv
  } else if (desModes[suite]) {
    keyLen = desModes[suite].key * 8
    ivLen = desModes[suite].iv
  } else {
    throw new TypeError('invalid suite type')
  }
  var keys = ebtk(password, false, keyLen, ivLen)
  return createDecipheriv(suite, keys.key, keys.iv)
}

},{"browserify-aes/browser":94,"browserify-aes/modes":105,"browserify-des":110,"browserify-des/modes":111,"evp_bytestokey":157}],110:[function(require,module,exports){
(function (Buffer){
function DES(e){CipherBase.call(this);var s,d=e.mode.toLowerCase(),t=modes[d];s=e.decrypt?"decrypt":"encrypt";var r=e.key;"des-ede"!==d&&"des-ede-cbc"!==d||(r=Buffer.concat([r,r.slice(0,8)]));var i=e.iv;this._des=t.create({key:r,iv:i,type:s})}var CipherBase=require("cipher-base"),des=require("des.js"),inherits=require("inherits"),modes={"des-ede3-cbc":des.CBC.instantiate(des.EDE),"des-ede3":des.EDE,"des-ede-cbc":des.CBC.instantiate(des.EDE),"des-ede":des.EDE,"des-cbc":des.CBC.instantiate(des.DES),"des-ecb":des.DES};modes.des=modes["des-cbc"],modes.des3=modes["des-ede3-cbc"],module.exports=DES,inherits(DES,CipherBase),DES.prototype._update=function(e){return new Buffer(this._des.update(e))},DES.prototype._final=function(){return new Buffer(this._des.final())};

}).call(this,require("buffer").Buffer)
},{"buffer":120,"cipher-base":121,"des.js":130,"inherits":174}],111:[function(require,module,exports){
exports["des-ecb"]={key:8,iv:0},exports["des-cbc"]=exports.des={key:8,iv:8},exports["des-ede3-cbc"]=exports.des3={key:24,iv:8},exports["des-ede3"]={key:24,iv:0},exports["des-ede-cbc"]={key:16,iv:8},exports["des-ede"]={key:16,iv:0};

},{}],112:[function(require,module,exports){
(function (Buffer){
function blind(e){var n=getr(e);return{blinder:n.toRed(bn.mont(e.modulus)).redPow(new bn(e.publicExponent)).fromRed(),unblinder:n.invm(e.modulus)}}function crt(e,n){var r=blind(n),o=n.modulus.byteLength(),u=(bn.mont(n.modulus),new bn(e).mul(r.blinder).umod(n.modulus)),m=u.toRed(bn.mont(n.prime1)),d=u.toRed(bn.mont(n.prime2)),t=n.coefficient,i=n.prime1,b=n.prime2,l=m.redPow(n.exponent1),s=d.redPow(n.exponent2);l=l.fromRed(),s=s.fromRed();var p=l.isub(s).imul(t).umod(i);return p.imul(b),s.iadd(p),new Buffer(s.imul(r.unblinder).umod(n.modulus).toArray(!1,o))}function getr(e){for(var n=e.modulus.byteLength(),r=new bn(randomBytes(n));r.cmp(e.modulus)>=0||!r.umod(e.prime1)||!r.umod(e.prime2);)r=new bn(randomBytes(n));return r}var bn=require("bn.js"),randomBytes=require("randombytes");module.exports=crt,crt.getr=getr;

}).call(this,require("buffer").Buffer)
},{"bn.js":89,"buffer":120,"randombytes":200}],113:[function(require,module,exports){
module.exports=require("./browser/algorithms.json");

},{"./browser/algorithms.json":114}],114:[function(require,module,exports){
module.exports={
  "sha224WithRSAEncryption": {
    "sign": "rsa",
    "hash": "sha224",
    "id": "302d300d06096086480165030402040500041c"
  },
  "RSA-SHA224": {
    "sign": "ecdsa/rsa",
    "hash": "sha224",
    "id": "302d300d06096086480165030402040500041c"
  },
  "sha256WithRSAEncryption": {
    "sign": "rsa",
    "hash": "sha256",
    "id": "3031300d060960864801650304020105000420"
  },
  "RSA-SHA256": {
    "sign": "ecdsa/rsa",
    "hash": "sha256",
    "id": "3031300d060960864801650304020105000420"
  },
  "sha384WithRSAEncryption": {
    "sign": "rsa",
    "hash": "sha384",
    "id": "3041300d060960864801650304020205000430"
  },
  "RSA-SHA384": {
    "sign": "ecdsa/rsa",
    "hash": "sha384",
    "id": "3041300d060960864801650304020205000430"
  },
  "sha512WithRSAEncryption": {
    "sign": "rsa",
    "hash": "sha512",
    "id": "3051300d060960864801650304020305000440"
  },
  "RSA-SHA512": {
    "sign": "ecdsa/rsa",
    "hash": "sha512",
    "id": "3051300d060960864801650304020305000440"
  },
  "RSA-SHA1": {
    "sign": "rsa",
    "hash": "sha1",
    "id": "3021300906052b0e03021a05000414"
  },
  "ecdsa-with-SHA1": {
    "sign": "ecdsa",
    "hash": "sha1",
    "id": ""
  },
  "sha256": {
    "sign": "ecdsa",
    "hash": "sha256",
    "id": ""
  },
  "sha224": {
    "sign": "ecdsa",
    "hash": "sha224",
    "id": ""
  },
  "sha384": {
    "sign": "ecdsa",
    "hash": "sha384",
    "id": ""
  },
  "sha512": {
    "sign": "ecdsa",
    "hash": "sha512",
    "id": ""
  },
  "DSA-SHA": {
    "sign": "dsa",
    "hash": "sha1",
    "id": ""
  },
  "DSA-SHA1": {
    "sign": "dsa",
    "hash": "sha1",
    "id": ""
  },
  "DSA": {
    "sign": "dsa",
    "hash": "sha1",
    "id": ""
  },
  "DSA-WITH-SHA224": {
    "sign": "dsa",
    "hash": "sha224",
    "id": ""
  },
  "DSA-SHA224": {
    "sign": "dsa",
    "hash": "sha224",
    "id": ""
  },
  "DSA-WITH-SHA256": {
    "sign": "dsa",
    "hash": "sha256",
    "id": ""
  },
  "DSA-SHA256": {
    "sign": "dsa",
    "hash": "sha256",
    "id": ""
  },
  "DSA-WITH-SHA384": {
    "sign": "dsa",
    "hash": "sha384",
    "id": ""
  },
  "DSA-SHA384": {
    "sign": "dsa",
    "hash": "sha384",
    "id": ""
  },
  "DSA-WITH-SHA512": {
    "sign": "dsa",
    "hash": "sha512",
    "id": ""
  },
  "DSA-SHA512": {
    "sign": "dsa",
    "hash": "sha512",
    "id": ""
  },
  "DSA-RIPEMD160": {
    "sign": "dsa",
    "hash": "rmd160",
    "id": ""
  },
  "ripemd160WithRSA": {
    "sign": "rsa",
    "hash": "rmd160",
    "id": "3021300906052b2403020105000414"
  },
  "RSA-RIPEMD160": {
    "sign": "rsa",
    "hash": "rmd160",
    "id": "3021300906052b2403020105000414"
  },
  "md5WithRSAEncryption": {
    "sign": "rsa",
    "hash": "md5",
    "id": "3020300c06082a864886f70d020505000410"
  },
  "RSA-MD5": {
    "sign": "rsa",
    "hash": "md5",
    "id": "3020300c06082a864886f70d020505000410"
  }
}

},{}],115:[function(require,module,exports){
module.exports={
  "1.3.132.0.10": "secp256k1",
  "1.3.132.0.33": "p224",
  "1.2.840.10045.3.1.1": "p192",
  "1.2.840.10045.3.1.7": "p256",
  "1.3.132.0.34": "p384",
  "1.3.132.0.35": "p521"
}

},{}],116:[function(require,module,exports){
(function (Buffer){
function Sign(e){stream.Writable.call(this);var t=algorithms[e];if(!t)throw new Error("Unknown message digest");this._hashType=t.hash,this._hash=createHash(t.hash),this._tag=t.id,this._signType=t.sign}function Verify(e){stream.Writable.call(this);var t=algorithms[e];if(!t)throw new Error("Unknown message digest");this._hash=createHash(t.hash),this._tag=t.id,this._signType=t.sign}function createSign(e){return new Sign(e)}function createVerify(e){return new Verify(e)}var createHash=require("create-hash"),stream=require("stream"),inherits=require("inherits"),sign=require("./sign"),verify=require("./verify"),algorithms=require("./algorithms.json");Object.keys(algorithms).forEach(function(e){algorithms[e].id=new Buffer(algorithms[e].id,"hex"),algorithms[e.toLowerCase()]=algorithms[e]}),inherits(Sign,stream.Writable),Sign.prototype._write=function(e,t,i){this._hash.update(e),i()},Sign.prototype.update=function(e,t){return"string"==typeof e&&(e=new Buffer(e,t)),this._hash.update(e),this},Sign.prototype.sign=function(e,t){this.end();var i=this._hash.digest(),r=sign(i,e,this._hashType,this._signType,this._tag);return t?r.toString(t):r},inherits(Verify,stream.Writable),Verify.prototype._write=function(e,t,i){this._hash.update(e),i()},Verify.prototype.update=function(e,t){return"string"==typeof e&&(e=new Buffer(e,t)),this._hash.update(e),this},Verify.prototype.verify=function(e,t,i){"string"==typeof t&&(t=new Buffer(t,i)),this.end();var r=this._hash.digest();return verify(t,r,e,this._signType,this._tag)},module.exports={Sign:createSign,Verify:createVerify,createSign:createSign,createVerify:createVerify};

}).call(this,require("buffer").Buffer)
},{"./algorithms.json":114,"./sign":117,"./verify":118,"buffer":120,"create-hash":124,"inherits":174,"stream":224}],117:[function(require,module,exports){
(function (Buffer){
function sign(e,r,t,n,a){var u=parseKeys(r);if(u.curve){if("ecdsa"!==n&&"ecdsa/rsa"!==n)throw new Error("wrong private key type");return ecSign(e,u)}if("dsa"===u.type){if("dsa"!==n)throw new Error("wrong private key type");return dsaSign(e,u,t)}if("rsa"!==n&&"ecdsa/rsa"!==n)throw new Error("wrong private key type");e=Buffer.concat([a,e]);for(var i=u.modulus.byteLength(),o=[0,1];e.length+o.length+1<i;)o.push(255);o.push(0);for(var c=-1;++c<e.length;)o.push(e[c]);return crt(o,u)}function ecSign(e,r){var t=curves[r.curve.join(".")];if(!t)throw new Error("unknown curve "+r.curve.join("."));var n=new EC(t).keyFromPrivate(r.privateKey).sign(e);return new Buffer(n.toDER())}function dsaSign(e,r,t){for(var n,a=r.params.priv_key,u=r.params.p,i=r.params.q,o=r.params.g,c=new BN(0),f=bits2int(e,i).mod(i),s=!1,g=getKey(a,i,e,t);!1===s;)c=makeR(o,n=makeKey(i,g,t),u,i),0===(s=n.invm(i).imul(f.add(a.mul(c))).mod(i)).cmpn(0)&&(s=!1,c=new BN(0));return toDER(c,s)}function toDER(e,r){e=e.toArray(),r=r.toArray(),128&e[0]&&(e=[0].concat(e)),128&r[0]&&(r=[0].concat(r));var t=[48,e.length+r.length+4,2,e.length];return t=t.concat(e,[2,r.length],r),new Buffer(t)}function getKey(e,r,t,n){if((e=new Buffer(e.toArray())).length<r.byteLength()){var a=new Buffer(r.byteLength()-e.length);a.fill(0),e=Buffer.concat([a,e])}var u=t.length,i=bits2octets(t,r),o=new Buffer(u);o.fill(1);var c=new Buffer(u);return c.fill(0),c=createHmac(n,c).update(o).update(new Buffer([0])).update(e).update(i).digest(),o=createHmac(n,c).update(o).digest(),c=createHmac(n,c).update(o).update(new Buffer([1])).update(e).update(i).digest(),o=createHmac(n,c).update(o).digest(),{k:c,v:o}}function bits2int(e,r){var t=new BN(e),n=(e.length<<3)-r.bitLength();return n>0&&t.ishrn(n),t}function bits2octets(e,r){e=(e=bits2int(e,r)).mod(r);var t=new Buffer(e.toArray());if(t.length<r.byteLength()){var n=new Buffer(r.byteLength()-t.length);n.fill(0),t=Buffer.concat([n,t])}return t}function makeKey(e,r,t){var n,a;do{for(n=new Buffer(0);8*n.length<e.bitLength();)r.v=createHmac(t,r.k).update(r.v).digest(),n=Buffer.concat([n,r.v]);a=bits2int(n,e),r.k=createHmac(t,r.k).update(r.v).update(new Buffer([0])).digest(),r.v=createHmac(t,r.k).update(r.v).digest()}while(-1!==a.cmp(e));return a}function makeR(e,r,t,n){return e.toRed(BN.mont(t)).redPow(r).fromRed().mod(n)}var createHmac=require("create-hmac"),crt=require("browserify-rsa"),EC=require("elliptic").ec,BN=require("bn.js"),parseKeys=require("parse-asn1"),curves=require("./curves.json");module.exports=sign,module.exports.getKey=getKey,module.exports.makeKey=makeKey;

}).call(this,require("buffer").Buffer)
},{"./curves.json":115,"bn.js":89,"browserify-rsa":112,"buffer":120,"create-hmac":127,"elliptic":140,"parse-asn1":186}],118:[function(require,module,exports){
(function (Buffer){
function verify(e,r,n,a,t){var o=parseKeys(n);if("ec"===o.type){if("ecdsa"!==a&&"ecdsa/rsa"!==a)throw new Error("wrong public key type");return ecVerify(e,r,o)}if("dsa"===o.type){if("dsa"!==a)throw new Error("wrong public key type");return dsaVerify(e,r,o)}if("rsa"!==a&&"ecdsa/rsa"!==a)throw new Error("wrong public key type");r=Buffer.concat([t,r]);for(var u=o.modulus.byteLength(),i=[1],d=0;r.length+i.length+2<u;)i.push(255),d++;i.push(0);for(var c=-1;++c<r.length;)i.push(r[c]);i=new Buffer(i);var s=BN.mont(o.modulus);e=(e=new BN(e).toRed(s)).redPow(new BN(o.publicExponent)),e=new Buffer(e.fromRed().toArray());var f=d<8?1:0;for(u=Math.min(e.length,i.length),e.length!==i.length&&(f=1),c=-1;++c<u;)f|=e[c]^i[c];return 0===f}function ecVerify(e,r,n){var a=curves[n.data.algorithm.curve.join(".")];if(!a)throw new Error("unknown curve "+n.data.algorithm.curve.join("."));var t=new EC(a),o=n.data.subjectPrivateKey.data;return t.verify(r,e,o)}function dsaVerify(e,r,n){var a=n.data.p,t=n.data.q,o=n.data.g,u=n.data.pub_key,i=parseKeys.signature.decode(e,"der"),d=i.s,c=i.r;checkValue(d,t),checkValue(c,t);var s=BN.mont(a),f=d.invm(t);return 0===o.toRed(s).redPow(new BN(r).mul(f).mod(t)).fromRed().mul(u.toRed(s).redPow(c.mul(f).mod(t)).fromRed()).mod(a).mod(t).cmp(c)}function checkValue(e,r){if(e.cmpn(0)<=0)throw new Error("invalid sig");if(e.cmp(r)>=r)throw new Error("invalid sig")}var BN=require("bn.js"),EC=require("elliptic").ec,parseKeys=require("parse-asn1"),curves=require("./curves.json");module.exports=verify;

}).call(this,require("buffer").Buffer)
},{"./curves.json":115,"bn.js":89,"buffer":120,"elliptic":140,"parse-asn1":186}],119:[function(require,module,exports){
(function (Buffer){
module.exports=function(e,n){for(var r=Math.min(e.length,n.length),t=new Buffer(r),f=0;f<r;++f)t[f]=e[f]^n[f];return t};

}).call(this,require("buffer").Buffer)
},{"buffer":120}],120:[function(require,module,exports){
"use strict";function typedArraySupport(){try{var e=new Uint8Array(1);return e.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===e.foo()}catch(e){return!1}}function createBuffer(e){if(e>K_MAX_LENGTH)throw new RangeError("Invalid typed array length");var t=new Uint8Array(e);return t.__proto__=Buffer.prototype,t}function Buffer(e,t,r){if("number"==typeof e){if("string"==typeof t)throw new Error("If encoding is specified then the first argument must be a string");return allocUnsafe(e)}return from(e,t,r)}function from(e,t,r){if("number"==typeof e)throw new TypeError('"value" argument must not be a number');return isArrayBuffer(e)?fromArrayBuffer(e,t,r):"string"==typeof e?fromString(e,t):fromObject(e)}function assertSize(e){if("number"!=typeof e)throw new TypeError('"size" argument must be a number');if(e<0)throw new RangeError('"size" argument must not be negative')}function alloc(e,t,r){return assertSize(e),e<=0?createBuffer(e):void 0!==t?"string"==typeof r?createBuffer(e).fill(t,r):createBuffer(e).fill(t):createBuffer(e)}function allocUnsafe(e){return assertSize(e),createBuffer(e<0?0:0|checked(e))}function fromString(e,t){if("string"==typeof t&&""!==t||(t="utf8"),!Buffer.isEncoding(t))throw new TypeError('"encoding" must be a valid string encoding');var r=0|byteLength(e,t),n=createBuffer(r),f=n.write(e,t);return f!==r&&(n=n.slice(0,f)),n}function fromArrayLike(e){for(var t=e.length<0?0:0|checked(e.length),r=createBuffer(t),n=0;n<t;n+=1)r[n]=255&e[n];return r}function fromArrayBuffer(e,t,r){if(t<0||e.byteLength<t)throw new RangeError("'offset' is out of bounds");if(e.byteLength<t+(r||0))throw new RangeError("'length' is out of bounds");var n;return n=void 0===t&&void 0===r?new Uint8Array(e):void 0===r?new Uint8Array(e,t):new Uint8Array(e,t,r),n.__proto__=Buffer.prototype,n}function fromObject(e){if(Buffer.isBuffer(e)){var t=0|checked(e.length),r=createBuffer(t);return 0===r.length?r:(e.copy(r,0,0,t),r)}if(e){if(isArrayBufferView(e)||"length"in e)return"number"!=typeof e.length||numberIsNaN(e.length)?createBuffer(0):fromArrayLike(e);if("Buffer"===e.type&&Array.isArray(e.data))return fromArrayLike(e.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function checked(e){if(e>=K_MAX_LENGTH)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+K_MAX_LENGTH.toString(16)+" bytes");return 0|e}function SlowBuffer(e){return+e!=e&&(e=0),Buffer.alloc(+e)}function byteLength(e,t){if(Buffer.isBuffer(e))return e.length;if(isArrayBufferView(e)||isArrayBuffer(e))return e.byteLength;"string"!=typeof e&&(e=""+e);var r=e.length;if(0===r)return 0;for(var n=!1;;)switch(t){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":case void 0:return utf8ToBytes(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return base64ToBytes(e).length;default:if(n)return utf8ToBytes(e).length;t=(""+t).toLowerCase(),n=!0}}function slowToString(e,t,r){var n=!1;if((void 0===t||t<0)&&(t=0),t>this.length)return"";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return"";if(r>>>=0,t>>>=0,r<=t)return"";for(e||(e="utf8");;)switch(e){case"hex":return hexSlice(this,t,r);case"utf8":case"utf-8":return utf8Slice(this,t,r);case"ascii":return asciiSlice(this,t,r);case"latin1":case"binary":return latin1Slice(this,t,r);case"base64":return base64Slice(this,t,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return utf16leSlice(this,t,r);default:if(n)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),n=!0}}function swap(e,t,r){var n=e[t];e[t]=e[r],e[r]=n}function bidirectionalIndexOf(e,t,r,n,f){if(0===e.length)return-1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),r=+r,numberIsNaN(r)&&(r=f?0:e.length-1),r<0&&(r=e.length+r),r>=e.length){if(f)return-1;r=e.length-1}else if(r<0){if(!f)return-1;r=0}if("string"==typeof t&&(t=Buffer.from(t,n)),Buffer.isBuffer(t))return 0===t.length?-1:arrayIndexOf(e,t,r,n,f);if("number"==typeof t)return t&=255,"function"==typeof Uint8Array.prototype.indexOf?f?Uint8Array.prototype.indexOf.call(e,t,r):Uint8Array.prototype.lastIndexOf.call(e,t,r):arrayIndexOf(e,[t],r,n,f);throw new TypeError("val must be string, number or Buffer")}function arrayIndexOf(e,t,r,n,f){function i(e,t){return 1===o?e[t]:e.readUInt16BE(t*o)}var o=1,u=e.length,s=t.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(e.length<2||t.length<2)return-1;o=2,u/=2,s/=2,r/=2}var a;if(f){var h=-1;for(a=r;a<u;a++)if(i(e,a)===i(t,-1===h?0:a-h)){if(-1===h&&(h=a),a-h+1===s)return h*o}else-1!==h&&(a-=a-h),h=-1}else for(r+s>u&&(r=u-s),a=r;a>=0;a--){for(var c=!0,l=0;l<s;l++)if(i(e,a+l)!==i(t,l)){c=!1;break}if(c)return a}return-1}function hexWrite(e,t,r,n){r=Number(r)||0;var f=e.length-r;n?(n=Number(n))>f&&(n=f):n=f;var i=t.length;if(i%2!=0)throw new TypeError("Invalid hex string");n>i/2&&(n=i/2);for(var o=0;o<n;++o){var u=parseInt(t.substr(2*o,2),16);if(numberIsNaN(u))return o;e[r+o]=u}return o}function utf8Write(e,t,r,n){return blitBuffer(utf8ToBytes(t,e.length-r),e,r,n)}function asciiWrite(e,t,r,n){return blitBuffer(asciiToBytes(t),e,r,n)}function latin1Write(e,t,r,n){return asciiWrite(e,t,r,n)}function base64Write(e,t,r,n){return blitBuffer(base64ToBytes(t),e,r,n)}function ucs2Write(e,t,r,n){return blitBuffer(utf16leToBytes(t,e.length-r),e,r,n)}function base64Slice(e,t,r){return 0===t&&r===e.length?base64.fromByteArray(e):base64.fromByteArray(e.slice(t,r))}function utf8Slice(e,t,r){r=Math.min(e.length,r);for(var n=[],f=t;f<r;){var i=e[f],o=null,u=i>239?4:i>223?3:i>191?2:1;if(f+u<=r){var s,a,h,c;switch(u){case 1:i<128&&(o=i);break;case 2:128==(192&(s=e[f+1]))&&(c=(31&i)<<6|63&s)>127&&(o=c);break;case 3:s=e[f+1],a=e[f+2],128==(192&s)&&128==(192&a)&&(c=(15&i)<<12|(63&s)<<6|63&a)>2047&&(c<55296||c>57343)&&(o=c);break;case 4:s=e[f+1],a=e[f+2],h=e[f+3],128==(192&s)&&128==(192&a)&&128==(192&h)&&(c=(15&i)<<18|(63&s)<<12|(63&a)<<6|63&h)>65535&&c<1114112&&(o=c)}}null===o?(o=65533,u=1):o>65535&&(o-=65536,n.push(o>>>10&1023|55296),o=56320|1023&o),n.push(o),f+=u}return decodeCodePointsArray(n)}function decodeCodePointsArray(e){var t=e.length;if(t<=MAX_ARGUMENTS_LENGTH)return String.fromCharCode.apply(String,e);for(var r="",n=0;n<t;)r+=String.fromCharCode.apply(String,e.slice(n,n+=MAX_ARGUMENTS_LENGTH));return r}function asciiSlice(e,t,r){var n="";r=Math.min(e.length,r);for(var f=t;f<r;++f)n+=String.fromCharCode(127&e[f]);return n}function latin1Slice(e,t,r){var n="";r=Math.min(e.length,r);for(var f=t;f<r;++f)n+=String.fromCharCode(e[f]);return n}function hexSlice(e,t,r){var n=e.length;(!t||t<0)&&(t=0),(!r||r<0||r>n)&&(r=n);for(var f="",i=t;i<r;++i)f+=toHex(e[i]);return f}function utf16leSlice(e,t,r){for(var n=e.slice(t,r),f="",i=0;i<n.length;i+=2)f+=String.fromCharCode(n[i]+256*n[i+1]);return f}function checkOffset(e,t,r){if(e%1!=0||e<0)throw new RangeError("offset is not uint");if(e+t>r)throw new RangeError("Trying to access beyond buffer length")}function checkInt(e,t,r,n,f,i){if(!Buffer.isBuffer(e))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>f||t<i)throw new RangeError('"value" argument is out of bounds');if(r+n>e.length)throw new RangeError("Index out of range")}function checkIEEE754(e,t,r,n,f,i){if(r+n>e.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function writeFloat(e,t,r,n,f){return t=+t,r>>>=0,f||checkIEEE754(e,t,r,4,3.4028234663852886e38,-3.4028234663852886e38),ieee754.write(e,t,r,n,23,4),r+4}function writeDouble(e,t,r,n,f){return t=+t,r>>>=0,f||checkIEEE754(e,t,r,8,1.7976931348623157e308,-1.7976931348623157e308),ieee754.write(e,t,r,n,52,8),r+8}function base64clean(e){if((e=e.trim().replace(INVALID_BASE64_RE,"")).length<2)return"";for(;e.length%4!=0;)e+="=";return e}function toHex(e){return e<16?"0"+e.toString(16):e.toString(16)}function utf8ToBytes(e,t){t=t||1/0;for(var r,n=e.length,f=null,i=[],o=0;o<n;++o){if((r=e.charCodeAt(o))>55295&&r<57344){if(!f){if(r>56319){(t-=3)>-1&&i.push(239,191,189);continue}if(o+1===n){(t-=3)>-1&&i.push(239,191,189);continue}f=r;continue}if(r<56320){(t-=3)>-1&&i.push(239,191,189),f=r;continue}r=65536+(f-55296<<10|r-56320)}else f&&(t-=3)>-1&&i.push(239,191,189);if(f=null,r<128){if((t-=1)<0)break;i.push(r)}else if(r<2048){if((t-=2)<0)break;i.push(r>>6|192,63&r|128)}else if(r<65536){if((t-=3)<0)break;i.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((t-=4)<0)break;i.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return i}function asciiToBytes(e){for(var t=[],r=0;r<e.length;++r)t.push(255&e.charCodeAt(r));return t}function utf16leToBytes(e,t){for(var r,n,f,i=[],o=0;o<e.length&&!((t-=2)<0);++o)n=(r=e.charCodeAt(o))>>8,f=r%256,i.push(f),i.push(n);return i}function base64ToBytes(e){return base64.toByteArray(base64clean(e))}function blitBuffer(e,t,r,n){for(var f=0;f<n&&!(f+r>=t.length||f>=e.length);++f)t[f+r]=e[f];return f}function isArrayBuffer(e){return e instanceof ArrayBuffer||null!=e&&null!=e.constructor&&"ArrayBuffer"===e.constructor.name&&"number"==typeof e.byteLength}function isArrayBufferView(e){return"function"==typeof ArrayBuffer.isView&&ArrayBuffer.isView(e)}function numberIsNaN(e){return e!=e}var base64=require("base64-js"),ieee754=require("ieee754");exports.Buffer=Buffer,exports.SlowBuffer=SlowBuffer,exports.INSPECT_MAX_BYTES=50;var K_MAX_LENGTH=2147483647;exports.kMaxLength=K_MAX_LENGTH,Buffer.TYPED_ARRAY_SUPPORT=typedArraySupport(),Buffer.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),"undefined"!=typeof Symbol&&Symbol.species&&Buffer[Symbol.species]===Buffer&&Object.defineProperty(Buffer,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1}),Buffer.poolSize=8192,Buffer.from=function(e,t,r){return from(e,t,r)},Buffer.prototype.__proto__=Uint8Array.prototype,Buffer.__proto__=Uint8Array,Buffer.alloc=function(e,t,r){return alloc(e,t,r)},Buffer.allocUnsafe=function(e){return allocUnsafe(e)},Buffer.allocUnsafeSlow=function(e){return allocUnsafe(e)},Buffer.isBuffer=function(e){return null!=e&&!0===e._isBuffer},Buffer.compare=function(e,t){if(!Buffer.isBuffer(e)||!Buffer.isBuffer(t))throw new TypeError("Arguments must be Buffers");if(e===t)return 0;for(var r=e.length,n=t.length,f=0,i=Math.min(r,n);f<i;++f)if(e[f]!==t[f]){r=e[f],n=t[f];break}return r<n?-1:n<r?1:0},Buffer.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},Buffer.concat=function(e,t){if(!Array.isArray(e))throw new TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return Buffer.alloc(0);var r;if(void 0===t)for(t=0,r=0;r<e.length;++r)t+=e[r].length;var n=Buffer.allocUnsafe(t),f=0;for(r=0;r<e.length;++r){var i=e[r];if(!Buffer.isBuffer(i))throw new TypeError('"list" argument must be an Array of Buffers');i.copy(n,f),f+=i.length}return n},Buffer.byteLength=byteLength,Buffer.prototype._isBuffer=!0,Buffer.prototype.swap16=function(){var e=this.length;if(e%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)swap(this,t,t+1);return this},Buffer.prototype.swap32=function(){var e=this.length;if(e%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)swap(this,t,t+3),swap(this,t+1,t+2);return this},Buffer.prototype.swap64=function(){var e=this.length;if(e%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)swap(this,t,t+7),swap(this,t+1,t+6),swap(this,t+2,t+5),swap(this,t+3,t+4);return this},Buffer.prototype.toString=function(){var e=this.length;return 0===e?"":0===arguments.length?utf8Slice(this,0,e):slowToString.apply(this,arguments)},Buffer.prototype.equals=function(e){if(!Buffer.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e||0===Buffer.compare(this,e)},Buffer.prototype.inspect=function(){var e="",t=exports.INSPECT_MAX_BYTES;return this.length>0&&(e=this.toString("hex",0,t).match(/.{2}/g).join(" "),this.length>t&&(e+=" ... ")),"<Buffer "+e+">"},Buffer.prototype.compare=function(e,t,r,n,f){if(!Buffer.isBuffer(e))throw new TypeError("Argument must be a Buffer");if(void 0===t&&(t=0),void 0===r&&(r=e?e.length:0),void 0===n&&(n=0),void 0===f&&(f=this.length),t<0||r>e.length||n<0||f>this.length)throw new RangeError("out of range index");if(n>=f&&t>=r)return 0;if(n>=f)return-1;if(t>=r)return 1;if(t>>>=0,r>>>=0,n>>>=0,f>>>=0,this===e)return 0;for(var i=f-n,o=r-t,u=Math.min(i,o),s=this.slice(n,f),a=e.slice(t,r),h=0;h<u;++h)if(s[h]!==a[h]){i=s[h],o=a[h];break}return i<o?-1:o<i?1:0},Buffer.prototype.includes=function(e,t,r){return-1!==this.indexOf(e,t,r)},Buffer.prototype.indexOf=function(e,t,r){return bidirectionalIndexOf(this,e,t,r,!0)},Buffer.prototype.lastIndexOf=function(e,t,r){return bidirectionalIndexOf(this,e,t,r,!1)},Buffer.prototype.write=function(e,t,r,n){if(void 0===t)n="utf8",r=this.length,t=0;else if(void 0===r&&"string"==typeof t)n=t,r=this.length,t=0;else{if(!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t>>>=0,isFinite(r)?(r>>>=0,void 0===n&&(n="utf8")):(n=r,r=void 0)}var f=this.length-t;if((void 0===r||r>f)&&(r=f),e.length>0&&(r<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var i=!1;;)switch(n){case"hex":return hexWrite(this,e,t,r);case"utf8":case"utf-8":return utf8Write(this,e,t,r);case"ascii":return asciiWrite(this,e,t,r);case"latin1":case"binary":return latin1Write(this,e,t,r);case"base64":return base64Write(this,e,t,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return ucs2Write(this,e,t,r);default:if(i)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),i=!0}},Buffer.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var MAX_ARGUMENTS_LENGTH=4096;Buffer.prototype.slice=function(e,t){var r=this.length;e=~~e,t=void 0===t?r:~~t,e<0?(e+=r)<0&&(e=0):e>r&&(e=r),t<0?(t+=r)<0&&(t=0):t>r&&(t=r),t<e&&(t=e);var n=this.subarray(e,t);return n.__proto__=Buffer.prototype,n},Buffer.prototype.readUIntLE=function(e,t,r){e>>>=0,t>>>=0,r||checkOffset(e,t,this.length);for(var n=this[e],f=1,i=0;++i<t&&(f*=256);)n+=this[e+i]*f;return n},Buffer.prototype.readUIntBE=function(e,t,r){e>>>=0,t>>>=0,r||checkOffset(e,t,this.length);for(var n=this[e+--t],f=1;t>0&&(f*=256);)n+=this[e+--t]*f;return n},Buffer.prototype.readUInt8=function(e,t){return e>>>=0,t||checkOffset(e,1,this.length),this[e]},Buffer.prototype.readUInt16LE=function(e,t){return e>>>=0,t||checkOffset(e,2,this.length),this[e]|this[e+1]<<8},Buffer.prototype.readUInt16BE=function(e,t){return e>>>=0,t||checkOffset(e,2,this.length),this[e]<<8|this[e+1]},Buffer.prototype.readUInt32LE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},Buffer.prototype.readUInt32BE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},Buffer.prototype.readIntLE=function(e,t,r){e>>>=0,t>>>=0,r||checkOffset(e,t,this.length);for(var n=this[e],f=1,i=0;++i<t&&(f*=256);)n+=this[e+i]*f;return f*=128,n>=f&&(n-=Math.pow(2,8*t)),n},Buffer.prototype.readIntBE=function(e,t,r){e>>>=0,t>>>=0,r||checkOffset(e,t,this.length);for(var n=t,f=1,i=this[e+--n];n>0&&(f*=256);)i+=this[e+--n]*f;return f*=128,i>=f&&(i-=Math.pow(2,8*t)),i},Buffer.prototype.readInt8=function(e,t){return e>>>=0,t||checkOffset(e,1,this.length),128&this[e]?-1*(255-this[e]+1):this[e]},Buffer.prototype.readInt16LE=function(e,t){e>>>=0,t||checkOffset(e,2,this.length);var r=this[e]|this[e+1]<<8;return 32768&r?4294901760|r:r},Buffer.prototype.readInt16BE=function(e,t){e>>>=0,t||checkOffset(e,2,this.length);var r=this[e+1]|this[e]<<8;return 32768&r?4294901760|r:r},Buffer.prototype.readInt32LE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},Buffer.prototype.readInt32BE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},Buffer.prototype.readFloatLE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),ieee754.read(this,e,!0,23,4)},Buffer.prototype.readFloatBE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),ieee754.read(this,e,!1,23,4)},Buffer.prototype.readDoubleLE=function(e,t){return e>>>=0,t||checkOffset(e,8,this.length),ieee754.read(this,e,!0,52,8)},Buffer.prototype.readDoubleBE=function(e,t){return e>>>=0,t||checkOffset(e,8,this.length),ieee754.read(this,e,!1,52,8)},Buffer.prototype.writeUIntLE=function(e,t,r,n){if(e=+e,t>>>=0,r>>>=0,!n){checkInt(this,e,t,r,Math.pow(2,8*r)-1,0)}var f=1,i=0;for(this[t]=255&e;++i<r&&(f*=256);)this[t+i]=e/f&255;return t+r},Buffer.prototype.writeUIntBE=function(e,t,r,n){if(e=+e,t>>>=0,r>>>=0,!n){checkInt(this,e,t,r,Math.pow(2,8*r)-1,0)}var f=r-1,i=1;for(this[t+f]=255&e;--f>=0&&(i*=256);)this[t+f]=e/i&255;return t+r},Buffer.prototype.writeUInt8=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,1,255,0),this[t]=255&e,t+1},Buffer.prototype.writeUInt16LE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,2,65535,0),this[t]=255&e,this[t+1]=e>>>8,t+2},Buffer.prototype.writeUInt16BE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,2,65535,0),this[t]=e>>>8,this[t+1]=255&e,t+2},Buffer.prototype.writeUInt32LE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,4,4294967295,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e,t+4},Buffer.prototype.writeUInt32BE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,4,4294967295,0),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},Buffer.prototype.writeIntLE=function(e,t,r,n){if(e=+e,t>>>=0,!n){var f=Math.pow(2,8*r-1);checkInt(this,e,t,r,f-1,-f)}var i=0,o=1,u=0;for(this[t]=255&e;++i<r&&(o*=256);)e<0&&0===u&&0!==this[t+i-1]&&(u=1),this[t+i]=(e/o>>0)-u&255;return t+r},Buffer.prototype.writeIntBE=function(e,t,r,n){if(e=+e,t>>>=0,!n){var f=Math.pow(2,8*r-1);checkInt(this,e,t,r,f-1,-f)}var i=r-1,o=1,u=0;for(this[t+i]=255&e;--i>=0&&(o*=256);)e<0&&0===u&&0!==this[t+i+1]&&(u=1),this[t+i]=(e/o>>0)-u&255;return t+r},Buffer.prototype.writeInt8=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,1,127,-128),e<0&&(e=255+e+1),this[t]=255&e,t+1},Buffer.prototype.writeInt16LE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,2,32767,-32768),this[t]=255&e,this[t+1]=e>>>8,t+2},Buffer.prototype.writeInt16BE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=255&e,t+2},Buffer.prototype.writeInt32LE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,4,2147483647,-2147483648),this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24,t+4},Buffer.prototype.writeInt32BE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},Buffer.prototype.writeFloatLE=function(e,t,r){return writeFloat(this,e,t,!0,r)},Buffer.prototype.writeFloatBE=function(e,t,r){return writeFloat(this,e,t,!1,r)},Buffer.prototype.writeDoubleLE=function(e,t,r){return writeDouble(this,e,t,!0,r)},Buffer.prototype.writeDoubleBE=function(e,t,r){return writeDouble(this,e,t,!1,r)},Buffer.prototype.copy=function(e,t,r,n){if(r||(r=0),n||0===n||(n=this.length),t>=e.length&&(t=e.length),t||(t=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===e.length||0===this.length)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),e.length-t<n-r&&(n=e.length-t+r);var f,i=n-r;if(this===e&&r<t&&t<n)for(f=i-1;f>=0;--f)e[f+t]=this[f+r];else if(i<1e3)for(f=0;f<i;++f)e[f+t]=this[f+r];else Uint8Array.prototype.set.call(e,this.subarray(r,r+i),t);return i},Buffer.prototype.fill=function(e,t,r,n){if("string"==typeof e){if("string"==typeof t?(n=t,t=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),1===e.length){var f=e.charCodeAt(0);f<256&&(e=f)}if(void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!Buffer.isEncoding(n))throw new TypeError("Unknown encoding: "+n)}else"number"==typeof e&&(e&=255);if(t<0||this.length<t||this.length<r)throw new RangeError("Out of range index");if(r<=t)return this;t>>>=0,r=void 0===r?this.length:r>>>0,e||(e=0);var i;if("number"==typeof e)for(i=t;i<r;++i)this[i]=e;else{var o=Buffer.isBuffer(e)?e:new Buffer(e,n),u=o.length;for(i=0;i<r-t;++i)this[i+t]=o[i%u]}return this};var INVALID_BASE64_RE=/[^+/0-9A-Za-z-_]/g;

},{"base64-js":88,"ieee754":172}],121:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4,"inherits":174,"safe-buffer":215,"stream":224,"string_decoder":225}],122:[function(require,module,exports){
(function (Buffer){
function isArray(r){return Array.isArray?Array.isArray(r):"[object Array]"===objectToString(r)}function isBoolean(r){return"boolean"==typeof r}function isNull(r){return null===r}function isNullOrUndefined(r){return null==r}function isNumber(r){return"number"==typeof r}function isString(r){return"string"==typeof r}function isSymbol(r){return"symbol"==typeof r}function isUndefined(r){return void 0===r}function isRegExp(r){return"[object RegExp]"===objectToString(r)}function isObject(r){return"object"==typeof r&&null!==r}function isDate(r){return"[object Date]"===objectToString(r)}function isError(r){return"[object Error]"===objectToString(r)||r instanceof Error}function isFunction(r){return"function"==typeof r}function isPrimitive(r){return null===r||"boolean"==typeof r||"number"==typeof r||"string"==typeof r||"symbol"==typeof r||void 0===r}function objectToString(r){return Object.prototype.toString.call(r)}exports.isArray=isArray,exports.isBoolean=isBoolean,exports.isNull=isNull,exports.isNullOrUndefined=isNullOrUndefined,exports.isNumber=isNumber,exports.isString=isString,exports.isSymbol=isSymbol,exports.isUndefined=isUndefined,exports.isRegExp=isRegExp,exports.isObject=isObject,exports.isDate=isDate,exports.isError=isError,exports.isFunction=isFunction,exports.isPrimitive=isPrimitive,exports.isBuffer=Buffer.isBuffer;

}).call(this,{"isBuffer":require("../../is-buffer/index.js")})
},{"../../is-buffer/index.js":175}],123:[function(require,module,exports){
(function (Buffer){
function ECDH(e){this.curveType=aliases[e],this.curveType||(this.curveType={name:e}),this.curve=new elliptic.ec(this.curveType.name),this.keys=void 0}function formatReturnValue(e,t,r){Array.isArray(e)||(e=e.toArray());var i=new Buffer(e);if(r&&i.length<r){var s=new Buffer(r-i.length);s.fill(0),i=Buffer.concat([s,i])}return t?i.toString(t):i}var elliptic=require("elliptic"),BN=require("bn.js");module.exports=function(e){return new ECDH(e)};var aliases={secp256k1:{name:"secp256k1",byteLength:32},secp224r1:{name:"p224",byteLength:28},prime256v1:{name:"p256",byteLength:32},prime192v1:{name:"p192",byteLength:24},ed25519:{name:"ed25519",byteLength:32},secp384r1:{name:"p384",byteLength:48},secp521r1:{name:"p521",byteLength:66}};aliases.p224=aliases.secp224r1,aliases.p256=aliases.secp256r1=aliases.prime256v1,aliases.p192=aliases.secp192r1=aliases.prime192v1,aliases.p384=aliases.secp384r1,aliases.p521=aliases.secp521r1,ECDH.prototype.generateKeys=function(e,t){return this.keys=this.curve.genKeyPair(),this.getPublicKey(e,t)},ECDH.prototype.computeSecret=function(e,t,r){t=t||"utf8",Buffer.isBuffer(e)||(e=new Buffer(e,t));return formatReturnValue(this.curve.keyFromPublic(e).getPublic().mul(this.keys.getPrivate()).getX(),r,this.curveType.byteLength)},ECDH.prototype.getPublicKey=function(e,t){var r=this.keys.getPublic("compressed"===t,!0);return"hybrid"===t&&(r[r.length-1]%2?r[0]=7:r[0]=6),formatReturnValue(r,e)},ECDH.prototype.getPrivateKey=function(e){return formatReturnValue(this.keys.getPrivate(),e)},ECDH.prototype.setPublicKey=function(e,t){return t=t||"utf8",Buffer.isBuffer(e)||(e=new Buffer(e,t)),this.keys._importPublic(e),this},ECDH.prototype.setPrivateKey=function(e,t){t=t||"utf8",Buffer.isBuffer(e)||(e=new Buffer(e,t));var r=new BN(e);return r=r.toString(16),this.keys._importPrivate(r),this};

}).call(this,require("buffer").Buffer)
},{"bn.js":89,"buffer":120,"elliptic":140}],124:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"./md5":126,"buffer":120,"cipher-base":121,"dup":5,"inherits":174,"ripemd160":214,"sha.js":217}],125:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"buffer":120,"dup":6}],126:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"./make-hash":125,"dup":7}],127:[function(require,module,exports){
'use strict'
var inherits = require('inherits')
var Legacy = require('./legacy')
var Base = require('cipher-base')
var Buffer = require('safe-buffer').Buffer
var md5 = require('create-hash/md5')
var RIPEMD160 = require('ripemd160')

}).call(this,require("buffer").Buffer)
},{"./md5":126,"buffer":120,"cipher-base":121,"inherits":174,"ripemd160":215,"sha.js":218}],125:[function(require,module,exports){
(function (Buffer){
"use strict";function toArray(e){if(e.length%intSize!=0){var r=e.length+(intSize-e.length%intSize);e=Buffer.concat([e,zeroBuffer],r)}for(var t=new Array(e.length>>>2),n=0,i=0;n<e.length;n+=intSize,i++)t[i]=e.readInt32LE(n);return t}var intSize=4,zeroBuffer=new Buffer(intSize);zeroBuffer.fill(0);var charSize=8,hashSize=16;module.exports=function(e,r){var t=r(toArray(e),e.length*charSize);e=new Buffer(hashSize);for(var n=0;n<t.length;n++)e.writeInt32LE(t[n],n<<2,!0);return e};

}).call(this,require("buffer").Buffer)
},{"buffer":120}],126:[function(require,module,exports){
"use strict";function core_md5(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,i=-1732584194,h=271733878,g=0;g<d.length;g+=16){var n=m,r=f,e=i,a=h;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,i=md5_ff(i,h=md5_ff(h,m=md5_ff(m,f,i,h,d[g+0],7,-680876936),f,i,d[g+1],12,-389564586),m,f,d[g+2],17,606105819),h,m,d[g+3],22,-1044525330),i=md5_ff(i,h=md5_ff(h,m=md5_ff(m,f,i,h,d[g+4],7,-176418897),f,i,d[g+5],12,1200080426),m,f,d[g+6],17,-1473231341),h,m,d[g+7],22,-45705983),i=md5_ff(i,h=md5_ff(h,m=md5_ff(m,f,i,h,d[g+8],7,1770035416),f,i,d[g+9],12,-1958414417),m,f,d[g+10],17,-42063),h,m,d[g+11],22,-1990404162),i=md5_ff(i,h=md5_ff(h,m=md5_ff(m,f,i,h,d[g+12],7,1804603682),f,i,d[g+13],12,-40341101),m,f,d[g+14],17,-1502002290),h,m,d[g+15],22,1236535329),i=md5_gg(i,h=md5_gg(h,m=md5_gg(m,f,i,h,d[g+1],5,-165796510),f,i,d[g+6],9,-1069501632),m,f,d[g+11],14,643717713),h,m,d[g+0],20,-373897302),i=md5_gg(i,h=md5_gg(h,m=md5_gg(m,f,i,h,d[g+5],5,-701558691),f,i,d[g+10],9,38016083),m,f,d[g+15],14,-660478335),h,m,d[g+4],20,-405537848),i=md5_gg(i,h=md5_gg(h,m=md5_gg(m,f,i,h,d[g+9],5,568446438),f,i,d[g+14],9,-1019803690),m,f,d[g+3],14,-187363961),h,m,d[g+8],20,1163531501),i=md5_gg(i,h=md5_gg(h,m=md5_gg(m,f,i,h,d[g+13],5,-1444681467),f,i,d[g+2],9,-51403784),m,f,d[g+7],14,1735328473),h,m,d[g+12],20,-1926607734),i=md5_hh(i,h=md5_hh(h,m=md5_hh(m,f,i,h,d[g+5],4,-378558),f,i,d[g+8],11,-2022574463),m,f,d[g+11],16,1839030562),h,m,d[g+14],23,-35309556),i=md5_hh(i,h=md5_hh(h,m=md5_hh(m,f,i,h,d[g+1],4,-1530992060),f,i,d[g+4],11,1272893353),m,f,d[g+7],16,-155497632),h,m,d[g+10],23,-1094730640),i=md5_hh(i,h=md5_hh(h,m=md5_hh(m,f,i,h,d[g+13],4,681279174),f,i,d[g+0],11,-358537222),m,f,d[g+3],16,-722521979),h,m,d[g+6],23,76029189),i=md5_hh(i,h=md5_hh(h,m=md5_hh(m,f,i,h,d[g+9],4,-640364487),f,i,d[g+12],11,-421815835),m,f,d[g+15],16,530742520),h,m,d[g+2],23,-995338651),i=md5_ii(i,h=md5_ii(h,m=md5_ii(m,f,i,h,d[g+0],6,-198630844),f,i,d[g+7],10,1126891415),m,f,d[g+14],15,-1416354905),h,m,d[g+5],21,-57434055),i=md5_ii(i,h=md5_ii(h,m=md5_ii(m,f,i,h,d[g+12],6,1700485571),f,i,d[g+3],10,-1894986606),m,f,d[g+10],15,-1051523),h,m,d[g+1],21,-2054922799),i=md5_ii(i,h=md5_ii(h,m=md5_ii(m,f,i,h,d[g+8],6,1873313359),f,i,d[g+15],10,-30611744),m,f,d[g+6],15,-1560198380),h,m,d[g+13],21,1309151649),i=md5_ii(i,h=md5_ii(h,m=md5_ii(m,f,i,h,d[g+4],6,-145523070),f,i,d[g+11],10,-1120210379),m,f,d[g+2],15,718787259),h,m,d[g+9],21,-343485551),m=safe_add(m,n),f=safe_add(f,r),i=safe_add(i,e),h=safe_add(h,a)}return[m,f,i,h]}function md5_cmn(d,_,m,f,i,h){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,h)),i),m)}function md5_ff(d,_,m,f,i,h,g){return md5_cmn(_&m|~_&f,d,_,i,h,g)}function md5_gg(d,_,m,f,i,h,g){return md5_cmn(_&f|m&~f,d,_,i,h,g)}function md5_hh(d,_,m,f,i,h,g){return md5_cmn(_^m^f,d,_,i,h,g)}function md5_ii(d,_,m,f,i,h,g){return md5_cmn(m^(_|~f),d,_,i,h,g)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}var makeHash=require("./make-hash");module.exports=function(d){return makeHash(d,core_md5)};

},{"./make-hash":125}],127:[function(require,module,exports){
"use strict";function Hmac(e,a){Base.call(this,"digest"),"string"==typeof a&&(a=Buffer.from(a));var r="sha512"===e||"sha384"===e?128:64;if(this._alg=e,this._key=a,a.length>r){a=("rmd160"===e?new RIPEMD160:sha(e)).update(a).digest()}else a.length<r&&(a=Buffer.concat([a,ZEROS],r));for(var s=this._ipad=Buffer.allocUnsafe(r),t=this._opad=Buffer.allocUnsafe(r),i=0;i<r;i++)s[i]=54^a[i],t[i]=92^a[i];this._hash="rmd160"===e?new RIPEMD160:sha(e),this._hash.update(s)}var inherits=require("inherits"),Legacy=require("./legacy"),Base=require("cipher-base"),Buffer=require("safe-buffer").Buffer,md5=require("create-hash/md5"),RIPEMD160=require("ripemd160"),sha=require("sha.js"),ZEROS=Buffer.alloc(128);inherits(Hmac,Base),Hmac.prototype._update=function(e){this._hash.update(e)},Hmac.prototype._final=function(){var e=this._hash.digest();return("rmd160"===this._alg?new RIPEMD160:sha(this._alg)).update(this._opad).update(e).digest()},module.exports=function(e,a){return"rmd160"===(e=e.toLowerCase())||"ripemd160"===e?new Hmac("rmd160",a):"md5"===e?new Legacy(md5,a):new Hmac(e,a)};

  var blocksize = (alg === 'sha512' || alg === 'sha384') ? 128 : 64

  this._alg = alg
  this._key = key
  if (key.length > blocksize) {
    var hash = alg === 'rmd160' ? new RIPEMD160() : sha(alg)
    key = hash.update(key).digest()
  } else if (key.length < blocksize) {
    key = Buffer.concat([key, ZEROS], blocksize)
  }

  var ipad = this._ipad = Buffer.allocUnsafe(blocksize)
  var opad = this._opad = Buffer.allocUnsafe(blocksize)

  for (var i = 0; i < blocksize; i++) {
    ipad[i] = key[i] ^ 0x36
    opad[i] = key[i] ^ 0x5C
  }
  this._hash = alg === 'rmd160' ? new RIPEMD160() : sha(alg)
  this._hash.update(ipad)
}

inherits(Hmac, Base)

Hmac.prototype._update = function (data) {
  this._hash.update(data)
}

Hmac.prototype._final = function () {
  var h = this._hash.digest()
  var hash = this._alg === 'rmd160' ? new RIPEMD160() : sha(this._alg)
  return hash.update(this._opad).update(h).digest()
}

module.exports = function createHmac (alg, key) {
  alg = alg.toLowerCase()
  if (alg === 'rmd160' || alg === 'ripemd160') {
    return new Hmac('rmd160', key)
  }
  if (alg === 'md5') {
    return new Legacy(md5, key)
  }
  return new Hmac(alg, key)
}

},{"./legacy":128,"cipher-base":121,"create-hash/md5":126,"inherits":174,"ripemd160":214,"safe-buffer":215,"sha.js":217}],128:[function(require,module,exports){
'use strict'
var inherits = require('inherits')
var Buffer = require('safe-buffer').Buffer

var Base = require('cipher-base')

var ZEROS = Buffer.alloc(128)
var blocksize = 64

function Hmac (alg, key) {
  Base.call(this, 'digest')
  if (typeof key === 'string') {
    key = Buffer.from(key)
  }

  this._alg = alg
  this._key = key

  if (key.length > blocksize) {
    key = alg(key)
  } else if (key.length < blocksize) {
    key = Buffer.concat([key, ZEROS], blocksize)
  }

  var ipad = this._ipad = Buffer.allocUnsafe(blocksize)
  var opad = this._opad = Buffer.allocUnsafe(blocksize)

  for (var i = 0; i < blocksize; i++) {
    ipad[i] = key[i] ^ 0x36
    opad[i] = key[i] ^ 0x5C
  }

  this._hash = [ipad]
}

inherits(Hmac, Base)

Hmac.prototype._update = function (data) {
  this._hash.push(data)
}

Hmac.prototype._final = function () {
  var h = this._alg(Buffer.concat(this._hash))
  return this._alg(Buffer.concat([this._opad, h]))
}
module.exports = Hmac

},{"cipher-base":121,"inherits":174,"safe-buffer":215}],129:[function(require,module,exports){
'use strict'

exports.randomBytes = exports.rng = exports.pseudoRandomBytes = exports.prng = require('randombytes')
exports.createHash = exports.Hash = require('create-hash')
exports.createHmac = exports.Hmac = require('create-hmac')

var algos = require('browserify-sign/algos')
var algoKeys = Object.keys(algos)
var hashes = ['sha1', 'sha224', 'sha256', 'sha384', 'sha512', 'md5', 'rmd160'].concat(algoKeys)
exports.getHashes = function () {
  return hashes
}

var p = require('pbkdf2')
exports.pbkdf2 = p.pbkdf2
exports.pbkdf2Sync = p.pbkdf2Sync

var aes = require('browserify-cipher')

exports.Cipher = aes.Cipher
exports.createCipher = aes.createCipher
exports.Cipheriv = aes.Cipheriv
exports.createCipheriv = aes.createCipheriv
exports.Decipher = aes.Decipher
exports.createDecipher = aes.createDecipher
exports.Decipheriv = aes.Decipheriv
exports.createDecipheriv = aes.createDecipheriv
exports.getCiphers = aes.getCiphers
exports.listCiphers = aes.listCiphers

var dh = require('diffie-hellman')

exports.DiffieHellmanGroup = dh.DiffieHellmanGroup
exports.createDiffieHellmanGroup = dh.createDiffieHellmanGroup
exports.getDiffieHellman = dh.getDiffieHellman
exports.createDiffieHellman = dh.createDiffieHellman
exports.DiffieHellman = dh.DiffieHellman

var sign = require('browserify-sign')

exports.createSign = sign.createSign
exports.Sign = sign.Sign
exports.createVerify = sign.createVerify
exports.Verify = sign.Verify

exports.createECDH = require('create-ecdh')

var publicEncrypt = require('public-encrypt')

exports.publicEncrypt = publicEncrypt.publicEncrypt
exports.privateEncrypt = publicEncrypt.privateEncrypt
exports.publicDecrypt = publicEncrypt.publicDecrypt
exports.privateDecrypt = publicEncrypt.privateDecrypt

// the least I can do is make error messages for the rest of the node.js/crypto api.
// ;[
//   'createCredentials'
// ].forEach(function (name) {
//   exports[name] = function () {
//     throw new Error([
//       'sorry, ' + name + ' is not implemented yet',
//       'we accept pull requests',
//       'https://github.com/crypto-browserify/crypto-browserify'
//     ].join('\n'))
//   }
// })

exports.createCredentials = function () {
  throw new Error([
    'sorry, createCredentials is not implemented yet',
    'we accept pull requests',
    'https://github.com/crypto-browserify/crypto-browserify'
  ].join('\n'))
}

exports.constants = {
  'DH_CHECK_P_NOT_SAFE_PRIME': 2,
  'DH_CHECK_P_NOT_PRIME': 1,
  'DH_UNABLE_TO_CHECK_GENERATOR': 4,
  'DH_NOT_SUITABLE_GENERATOR': 8,
  'NPN_ENABLED': 1,
  'ALPN_ENABLED': 1,
  'RSA_PKCS1_PADDING': 1,
  'RSA_SSLV23_PADDING': 2,
  'RSA_NO_PADDING': 3,
  'RSA_PKCS1_OAEP_PADDING': 4,
  'RSA_X931_PADDING': 5,
  'RSA_PKCS1_PSS_PADDING': 6,
  'POINT_CONVERSION_COMPRESSED': 2,
  'POINT_CONVERSION_UNCOMPRESSED': 4,
  'POINT_CONVERSION_HYBRID': 6
}

},{"browserify-cipher":109,"browserify-sign":116,"browserify-sign/algos":113,"create-ecdh":123,"create-hash":124,"create-hmac":127,"diffie-hellman":136,"pbkdf2":187,"public-encrypt":194,"randombytes":200}],130:[function(require,module,exports){
'use strict';

},{"./des/cbc":131,"./des/cipher":132,"./des/des":133,"./des/ede":134,"./des/utils":135}],131:[function(require,module,exports){
"use strict";function CBCState(t){assert.equal(t.length,8,"Invalid IV length"),this.iv=new Array(8);for(var i=0;i<this.iv.length;i++)this.iv[i]=t[i]}function instantiate(t){function i(i){t.call(this,i),this._cbcInit()}inherits(i,t);for(var e=Object.keys(proto),r=0;r<e.length;r++){var n=e[r];i.prototype[n]=proto[n]}return i.create=function(t){return new i(t)},i}var assert=require("minimalistic-assert"),inherits=require("inherits"),proto={};exports.instantiate=instantiate,proto._cbcInit=function(){var t=new CBCState(this.options.iv);this._cbcState=t},proto._update=function(t,i,e,r){var n=this._cbcState,s=this.constructor.super_.prototype,o=n.iv;if("encrypt"===this.type){for(a=0;a<this.blockSize;a++)o[a]^=t[i+a];s._update.call(this,o,0,e,r);for(a=0;a<this.blockSize;a++)o[a]=e[r+a]}else{s._update.call(this,t,i,e,r);for(a=0;a<this.blockSize;a++)e[r+a]^=o[a];for(var a=0;a<this.blockSize;a++)o[a]=t[i+a]}};

},{"inherits":174,"minimalistic-assert":180}],132:[function(require,module,exports){
"use strict";function Cipher(t){this.options=t,this.type=this.options.type,this.blockSize=8,this._init(),this.buffer=new Array(this.blockSize),this.bufferOff=0}var assert=require("minimalistic-assert");module.exports=Cipher,Cipher.prototype._init=function(){},Cipher.prototype.update=function(t){return 0===t.length?[]:"decrypt"===this.type?this._updateDecrypt(t):this._updateEncrypt(t)},Cipher.prototype._buffer=function(t,e){for(var r=Math.min(this.buffer.length-this.bufferOff,t.length-e),i=0;i<r;i++)this.buffer[this.bufferOff+i]=t[e+i];return this.bufferOff+=r,r},Cipher.prototype._flushBuffer=function(t,e){return this._update(this.buffer,0,t,e),this.bufferOff=0,this.blockSize},Cipher.prototype._updateEncrypt=function(t){var e=0,r=0,i=(this.bufferOff+t.length)/this.blockSize|0,f=new Array(i*this.blockSize);0!==this.bufferOff&&(e+=this._buffer(t,e),this.bufferOff===this.buffer.length&&(r+=this._flushBuffer(f,r)));for(var h=t.length-(t.length-e)%this.blockSize;e<h;e+=this.blockSize)this._update(t,e,f,r),r+=this.blockSize;for(;e<t.length;e++,this.bufferOff++)this.buffer[this.bufferOff]=t[e];return f},Cipher.prototype._updateDecrypt=function(t){for(var e=0,r=0,i=Math.ceil((this.bufferOff+t.length)/this.blockSize)-1,f=new Array(i*this.blockSize);i>0;i--)e+=this._buffer(t,e),r+=this._flushBuffer(f,r);return e+=this._buffer(t,e),f},Cipher.prototype.final=function(t){var e;t&&(e=this.update(t));var r;return r="encrypt"===this.type?this._finalEncrypt():this._finalDecrypt(),e?e.concat(r):r},Cipher.prototype._pad=function(t,e){if(0===e)return!1;for(;e<t.length;)t[e++]=0;return!0},Cipher.prototype._finalEncrypt=function(){if(!this._pad(this.buffer,this.bufferOff))return[];var t=new Array(this.blockSize);return this._update(this.buffer,0,t,0),t},Cipher.prototype._unpad=function(t){return t},Cipher.prototype._finalDecrypt=function(){assert.equal(this.bufferOff,this.blockSize,"Not enough data to decrypt");var t=new Array(this.blockSize);return this._flushBuffer(t,0),this._unpad(t)};

},{"minimalistic-assert":180}],133:[function(require,module,exports){
"use strict";function DESState(){this.tmp=new Array(2),this.keys=null}function DES(t){Cipher.call(this,t);var e=new DESState;this._desState=e,this.deriveKeys(e,t.key)}var assert=require("minimalistic-assert"),inherits=require("inherits"),des=require("../des"),utils=des.utils,Cipher=des.Cipher;inherits(DES,Cipher),module.exports=DES,DES.create=function(t){return new DES(t)};var shiftTable=[1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,1];DES.prototype.deriveKeys=function(t,e){t.keys=new Array(32),assert.equal(e.length,this.blockSize,"Invalid key length");var r=utils.readUInt32BE(e,0),s=utils.readUInt32BE(e,4);utils.pc1(r,s,t.tmp,0),r=t.tmp[0],s=t.tmp[1];for(var i=0;i<t.keys.length;i+=2){var n=shiftTable[i>>>1];r=utils.r28shl(r,n),s=utils.r28shl(s,n),utils.pc2(r,s,t.keys,i)}},DES.prototype._update=function(t,e,r,s){var i=this._desState,n=utils.readUInt32BE(t,e),p=utils.readUInt32BE(t,e+4);utils.ip(n,p,i.tmp,0),n=i.tmp[0],p=i.tmp[1],"encrypt"===this.type?this._encrypt(i,n,p,i.tmp,0):this._decrypt(i,n,p,i.tmp,0),n=i.tmp[0],p=i.tmp[1],utils.writeUInt32BE(r,n,s),utils.writeUInt32BE(r,p,s+4)},DES.prototype._pad=function(t,e){for(var r=t.length-e,s=e;s<t.length;s++)t[s]=r;return!0},DES.prototype._unpad=function(t){for(var e=t[t.length-1],r=t.length-e;r<t.length;r++)assert.equal(t[r],e);return t.slice(0,t.length-e)},DES.prototype._encrypt=function(t,e,r,s,i){for(var n=e,p=r,u=0;u<t.keys.length;u+=2){var l=t.keys[u],a=t.keys[u+1];utils.expand(p,t.tmp,0),l^=t.tmp[0],a^=t.tmp[1];var h=utils.substitute(l,a),o=p;p=(n^utils.permute(h))>>>0,n=o}utils.rip(p,n,s,i)},DES.prototype._decrypt=function(t,e,r,s,i){for(var n=r,p=e,u=t.keys.length-2;u>=0;u-=2){var l=t.keys[u],a=t.keys[u+1];utils.expand(n,t.tmp,0),l^=t.tmp[0],a^=t.tmp[1];var h=utils.substitute(l,a),o=n;n=(p^utils.permute(h))>>>0,p=o}utils.rip(n,p,s,i)};

},{"../des":130,"inherits":174,"minimalistic-assert":180}],134:[function(require,module,exports){
"use strict";function EDEState(e,t){assert.equal(t.length,24,"Invalid key length");var r=t.slice(0,8),p=t.slice(8,16),i=t.slice(16,24);this.ciphers="encrypt"===e?[DES.create({type:"encrypt",key:r}),DES.create({type:"decrypt",key:p}),DES.create({type:"encrypt",key:i})]:[DES.create({type:"decrypt",key:i}),DES.create({type:"encrypt",key:p}),DES.create({type:"decrypt",key:r})]}function EDE(e){Cipher.call(this,e);var t=new EDEState(this.type,this.options.key);this._edeState=t}var assert=require("minimalistic-assert"),inherits=require("inherits"),des=require("../des"),Cipher=des.Cipher,DES=des.DES;inherits(EDE,Cipher),module.exports=EDE,EDE.create=function(e){return new EDE(e)},EDE.prototype._update=function(e,t,r,p){var i=this._edeState;i.ciphers[0]._update(e,t,r,p),i.ciphers[1]._update(r,p,r,p),i.ciphers[2]._update(r,p,r,p)},EDE.prototype._pad=DES.prototype._pad,EDE.prototype._unpad=DES.prototype._unpad;

},{"../des":130,"inherits":174,"minimalistic-assert":180}],135:[function(require,module,exports){
"use strict";exports.readUInt32BE=function(r,o){return(r[0+o]<<24|r[1+o]<<16|r[2+o]<<8|r[3+o])>>>0},exports.writeUInt32BE=function(r,o,t){r[0+t]=o>>>24,r[1+t]=o>>>16&255,r[2+t]=o>>>8&255,r[3+t]=255&o},exports.ip=function(r,o,t,e){for(var f=0,n=0,a=6;a>=0;a-=2){for(p=0;p<=24;p+=8)f<<=1,f|=o>>>p+a&1;for(p=0;p<=24;p+=8)f<<=1,f|=r>>>p+a&1}for(a=6;a>=0;a-=2){for(p=1;p<=25;p+=8)n<<=1,n|=o>>>p+a&1;for(var p=1;p<=25;p+=8)n<<=1,n|=r>>>p+a&1}t[e+0]=f>>>0,t[e+1]=n>>>0},exports.rip=function(r,o,t,e){for(var f=0,n=0,a=0;a<4;a++)for(p=24;p>=0;p-=8)f<<=1,f|=o>>>p+a&1,f<<=1,f|=r>>>p+a&1;for(a=4;a<8;a++)for(var p=24;p>=0;p-=8)n<<=1,n|=o>>>p+a&1,n<<=1,n|=r>>>p+a&1;t[e+0]=f>>>0,t[e+1]=n>>>0},exports.pc1=function(r,o,t,e){for(var f=0,n=0,a=7;a>=5;a--){for(p=0;p<=24;p+=8)f<<=1,f|=o>>p+a&1;for(p=0;p<=24;p+=8)f<<=1,f|=r>>p+a&1}for(p=0;p<=24;p+=8)f<<=1,f|=o>>p+a&1;for(a=1;a<=3;a++){for(p=0;p<=24;p+=8)n<<=1,n|=o>>p+a&1;for(p=0;p<=24;p+=8)n<<=1,n|=r>>p+a&1}for(var p=0;p<=24;p+=8)n<<=1,n|=r>>p+a&1;t[e+0]=f>>>0,t[e+1]=n>>>0},exports.r28shl=function(r,o){return r<<o&268435455|r>>>28-o};var pc2table=[14,11,17,4,27,23,25,0,13,22,7,18,5,9,16,24,2,20,12,21,1,8,15,26,15,4,25,19,9,1,26,16,5,11,23,8,12,7,17,0,22,3,10,14,6,20,27,24];exports.pc2=function(r,o,t,e){for(var f=0,n=0,a=pc2table.length>>>1,p=0;p<a;p++)f<<=1,f|=r>>>pc2table[p]&1;for(p=a;p<pc2table.length;p++)n<<=1,n|=o>>>pc2table[p]&1;t[e+0]=f>>>0,t[e+1]=n>>>0},exports.expand=function(r,o,t){var e=0,f=0;e=(1&r)<<5|r>>>27;for(n=23;n>=15;n-=4)e<<=6,e|=r>>>n&63;for(var n=11;n>=3;n-=4)f|=r>>>n&63,f<<=6;f|=(31&r)<<1|r>>>31,o[t+0]=e>>>0,o[t+1]=f>>>0};var sTable=[14,0,4,15,13,7,1,4,2,14,15,2,11,13,8,1,3,10,10,6,6,12,12,11,5,9,9,5,0,3,7,8,4,15,1,12,14,8,8,2,13,4,6,9,2,1,11,7,15,5,12,11,9,3,7,14,3,10,10,0,5,6,0,13,15,3,1,13,8,4,14,7,6,15,11,2,3,8,4,14,9,12,7,0,2,1,13,10,12,6,0,9,5,11,10,5,0,13,14,8,7,10,11,1,10,3,4,15,13,4,1,2,5,11,8,6,12,7,6,12,9,0,3,5,2,14,15,9,10,13,0,7,9,0,14,9,6,3,3,4,15,6,5,10,1,2,13,8,12,5,7,14,11,12,4,11,2,15,8,1,13,1,6,10,4,13,9,0,8,6,15,9,3,8,0,7,11,4,1,15,2,14,12,3,5,11,10,5,14,2,7,12,7,13,13,8,14,11,3,5,0,6,6,15,9,0,10,3,1,4,2,7,8,2,5,12,11,1,12,10,4,14,15,9,10,3,6,15,9,0,0,6,12,10,11,1,7,13,13,8,15,9,1,4,3,5,14,11,5,12,2,7,8,2,4,14,2,14,12,11,4,2,1,12,7,4,10,7,11,13,6,1,8,5,5,0,3,15,15,10,13,3,0,9,14,8,9,6,4,11,2,8,1,12,11,7,10,1,13,14,7,2,8,13,15,6,9,15,12,0,5,9,6,10,3,4,0,5,14,3,12,10,1,15,10,4,15,2,9,7,2,12,6,9,8,5,0,6,13,1,3,13,4,14,14,0,7,11,5,3,11,8,9,4,14,3,15,2,5,12,2,9,8,5,12,15,3,10,7,11,0,14,4,1,10,7,1,6,13,0,11,8,6,13,4,13,11,0,2,11,14,7,15,4,0,9,8,1,13,10,3,14,12,3,9,5,7,12,5,2,10,15,6,8,1,6,1,6,4,11,11,13,13,8,12,1,3,4,7,10,14,7,10,9,15,5,6,0,8,15,0,14,5,2,9,3,2,12,13,1,2,15,8,13,4,8,6,10,15,3,11,7,1,4,10,12,9,5,3,6,14,11,5,0,0,14,12,9,7,2,7,2,11,1,4,14,1,7,9,4,12,10,14,8,2,13,0,15,6,12,10,9,13,0,15,3,3,5,5,6,8,11];exports.substitute=function(r,o){for(var t=0,e=0;e<4;e++){t<<=4,t|=n=sTable[64*e+(f=r>>>18-6*e&63)]}for(e=0;e<4;e++){var f=o>>>18-6*e&63,n=sTable[256+64*e+f];t<<=4,t|=n}return t>>>0};var permuteTable=[16,25,12,11,3,20,4,15,31,17,9,6,27,14,1,22,30,24,8,18,0,5,29,23,13,19,2,26,10,21,28,7];exports.permute=function(r){for(var o=0,t=0;t<permuteTable.length;t++)o<<=1,o|=r>>>permuteTable[t]&1;return o>>>0},exports.padSplit=function(r,o,t){for(var e=r.toString(2);e.length<o;)e="0"+e;for(var f=[],n=0;n<o;n+=t)f.push(e.slice(n,n+t));return f.join(" ")};

},{}],136:[function(require,module,exports){
(function (Buffer){
function getDiffieHellman(e){var r=new Buffer(primes[e].prime,"hex"),f=new Buffer(primes[e].gen,"hex");return new DH(r,f)}function createDiffieHellman(e,r,f,i){return Buffer.isBuffer(r)||void 0===ENCODINGS[r]?createDiffieHellman(e,"binary",r,f):(r=r||"binary",i=i||"binary",f=f||new Buffer([2]),Buffer.isBuffer(f)||(f=new Buffer(f,i)),"number"==typeof e?new DH(generatePrime(e,f),f,!0):(Buffer.isBuffer(e)||(e=new Buffer(e,r)),new DH(e,f,!0)))}var generatePrime=require("./lib/generatePrime"),primes=require("./lib/primes.json"),DH=require("./lib/dh"),ENCODINGS={binary:!0,hex:!0,base64:!0};exports.DiffieHellmanGroup=exports.createDiffieHellmanGroup=exports.getDiffieHellman=getDiffieHellman,exports.createDiffieHellman=exports.DiffieHellman=createDiffieHellman;

}).call(this,require("buffer").Buffer)
},{"./lib/dh":137,"./lib/generatePrime":138,"./lib/primes.json":139,"buffer":120}],137:[function(require,module,exports){
(function (Buffer){
function setPublicKey(e,r){return r=r||"utf8",Buffer.isBuffer(e)||(e=new Buffer(e,r)),this._pub=new BN(e),this}function setPrivateKey(e,r){return r=r||"utf8",Buffer.isBuffer(e)||(e=new Buffer(e,r)),this._priv=new BN(e),this}function checkPrime(e,r){var t=r.toString("hex"),i=[t,e.toString(16)].join("_");if(i in primeCache)return primeCache[i];var n=0;if(e.isEven()||!primes.simpleSieve||!primes.fermatTest(e)||!millerRabin.test(e))return n+=1,n+="02"===t||"05"===t?8:4,primeCache[i]=n,n;millerRabin.test(e.shrn(1))||(n+=2);var u;switch(t){case"02":e.mod(TWENTYFOUR).cmp(ELEVEN)&&(n+=8);break;case"05":(u=e.mod(TEN)).cmp(THREE)&&u.cmp(SEVEN)&&(n+=8);break;default:n+=4}return primeCache[i]=n,n}function DH(e,r,t){this.setGenerator(r),this.__prime=new BN(e),this._prime=BN.mont(this.__prime),this._primeLen=e.length,this._pub=void 0,this._priv=void 0,this._primeCode=void 0,t?(this.setPublicKey=setPublicKey,this.setPrivateKey=setPrivateKey):this._primeCode=8}function formatReturnValue(e,r){var t=new Buffer(e.toArray());return r?t.toString(r):t}var BN=require("bn.js"),MillerRabin=require("miller-rabin"),millerRabin=new MillerRabin,TWENTYFOUR=new BN(24),ELEVEN=new BN(11),TEN=new BN(10),THREE=new BN(3),SEVEN=new BN(7),primes=require("./generatePrime"),randomBytes=require("randombytes");module.exports=DH;var primeCache={};Object.defineProperty(DH.prototype,"verifyError",{enumerable:!0,get:function(){return"number"!=typeof this._primeCode&&(this._primeCode=checkPrime(this.__prime,this.__gen)),this._primeCode}}),DH.prototype.generateKeys=function(){return this._priv||(this._priv=new BN(randomBytes(this._primeLen))),this._pub=this._gen.toRed(this._prime).redPow(this._priv).fromRed(),this.getPublicKey()},DH.prototype.computeSecret=function(e){var r=(e=(e=new BN(e)).toRed(this._prime)).redPow(this._priv).fromRed(),t=new Buffer(r.toArray()),i=this.getPrime();if(t.length<i.length){var n=new Buffer(i.length-t.length);n.fill(0),t=Buffer.concat([n,t])}return t},DH.prototype.getPublicKey=function(e){return formatReturnValue(this._pub,e)},DH.prototype.getPrivateKey=function(e){return formatReturnValue(this._priv,e)},DH.prototype.getPrime=function(e){return formatReturnValue(this.__prime,e)},DH.prototype.getGenerator=function(e){return formatReturnValue(this._gen,e)},DH.prototype.setGenerator=function(e,r){return r=r||"utf8",Buffer.isBuffer(e)||(e=new Buffer(e,r)),this.__gen=e,this._gen=new BN(e),this};

}).call(this,require("buffer").Buffer)
},{"./generatePrime":138,"bn.js":89,"buffer":120,"miller-rabin":179,"randombytes":200}],138:[function(require,module,exports){
function _getPrimes(){if(null!==primes)return primes;var e=[];e[0]=2;for(var r=1,i=3;i<1048576;i+=2){for(var n=Math.ceil(Math.sqrt(i)),t=0;t<r&&e[t]<=n&&i%e[t]!=0;t++);r!==t&&e[t]<=n||(e[r++]=i)}return primes=e,e}function simpleSieve(e){for(var r=_getPrimes(),i=0;i<r.length;i++)if(0===e.modn(r[i]))return 0===e.cmpn(r[i]);return!0}function fermatTest(e){var r=BN.mont(e);return 0===TWO.toRed(r).redPow(e.subn(1)).fromRed().cmpn(1)}function findPrime(e,r){if(e<16)return new BN(2===r||5===r?[140,123]:[140,39]);r=new BN(r);for(var i,n;;){for(i=new BN(randomBytes(Math.ceil(e/8)));i.bitLength()>e;)i.ishrn(1);if(i.isEven()&&i.iadd(ONE),i.testn(1)||i.iadd(TWO),r.cmp(TWO)){if(!r.cmp(FIVE))for(;i.mod(TEN).cmp(THREE);)i.iadd(FOUR)}else for(;i.mod(TWENTYFOUR).cmp(ELEVEN);)i.iadd(FOUR);if(n=i.shrn(1),simpleSieve(n)&&simpleSieve(i)&&fermatTest(n)&&fermatTest(i)&&millerRabin.test(n)&&millerRabin.test(i))return i}}var randomBytes=require("randombytes");module.exports=findPrime,findPrime.simpleSieve=simpleSieve,findPrime.fermatTest=fermatTest;var BN=require("bn.js"),TWENTYFOUR=new BN(24),MillerRabin=require("miller-rabin"),millerRabin=new MillerRabin,ONE=new BN(1),TWO=new BN(2),FIVE=new BN(5),SIXTEEN=new BN(16),EIGHT=new BN(8),TEN=new BN(10),THREE=new BN(3),SEVEN=new BN(7),ELEVEN=new BN(11),FOUR=new BN(4),TWELVE=new BN(12),primes=null;

},{"bn.js":89,"miller-rabin":179,"randombytes":200}],139:[function(require,module,exports){
module.exports={
    "modp1": {
        "gen": "02",
        "prime": "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff"
    },
    "modp2": {
        "gen": "02",
        "prime": "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff"
    },
    "modp5": {
        "gen": "02",
        "prime": "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff"
    },
    "modp14": {
        "gen": "02",
        "prime": "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff"
    },
    "modp15": {
        "gen": "02",
        "prime": "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff"
    },
    "modp16": {
        "gen": "02",
        "prime": "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff"
    },
    "modp17": {
        "gen": "02",
        "prime": "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff"
    },
    "modp18": {
        "gen": "02",
        "prime": "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff"
    }
}
},{}],140:[function(require,module,exports){
"use strict";var elliptic=exports;elliptic.version=require("../package.json").version,elliptic.utils=require("./elliptic/utils"),elliptic.rand=require("brorand"),elliptic.curve=require("./elliptic/curve"),elliptic.curves=require("./elliptic/curves"),elliptic.ec=require("./elliptic/ec"),elliptic.eddsa=require("./elliptic/eddsa");

},{"../package.json":155,"./elliptic/curve":143,"./elliptic/curves":146,"./elliptic/ec":147,"./elliptic/eddsa":150,"./elliptic/utils":154,"brorand":90}],141:[function(require,module,exports){
"use strict";function BaseCurve(t,e){this.type=t,this.p=new BN(e.p,16),this.red=e.prime?BN.red(e.prime):BN.mont(this.p),this.zero=new BN(0).toRed(this.red),this.one=new BN(1).toRed(this.red),this.two=new BN(2).toRed(this.red),this.n=e.n&&new BN(e.n,16),this.g=e.g&&this.pointFromJSON(e.g,e.gRed),this._wnafT1=new Array(4),this._wnafT2=new Array(4),this._wnafT3=new Array(4),this._wnafT4=new Array(4);var n=this.n&&this.p.div(this.n);!n||n.cmpn(100)>0?this.redN=null:(this._maxwellTrick=!0,this.redN=this.n.toRed(this.red))}function BasePoint(t,e){this.curve=t,this.type=e,this.precomputed=null}var BN=require("bn.js"),elliptic=require("../../elliptic"),utils=elliptic.utils,getNAF=utils.getNAF,getJSF=utils.getJSF,assert=utils.assert;module.exports=BaseCurve,BaseCurve.prototype.point=function(){throw new Error("Not implemented")},BaseCurve.prototype.validate=function(){throw new Error("Not implemented")},BaseCurve.prototype._fixedNafMul=function(t,e){assert(t.precomputed);var n=t._getDoubles(),r=getNAF(e,1),i=(1<<n.step+1)-(n.step%2==0?2:1);i/=3;for(var o=[],s=0;s<r.length;s+=n.step){for(var a=0,e=s+n.step-1;e>=s;e--)a=(a<<1)+r[e];o.push(a)}for(var p=this.jpoint(null,null,null),u=this.jpoint(null,null,null),d=i;d>0;d--){for(s=0;s<o.length;s++){(a=o[s])===d?u=u.mixedAdd(n.points[s]):a===-d&&(u=u.mixedAdd(n.points[s].neg()))}p=p.add(u)}return p.toP()},BaseCurve.prototype._wnafMul=function(t,e){var n=4,r=t._getNAFPoints(n);n=r.wnd;for(var i=r.points,o=getNAF(e,n),s=this.jpoint(null,null,null),a=o.length-1;a>=0;a--){for(e=0;a>=0&&0===o[a];a--)e++;if(a>=0&&e++,s=s.dblp(e),a<0)break;var p=o[a];assert(0!==p),s="affine"===t.type?p>0?s.mixedAdd(i[p-1>>1]):s.mixedAdd(i[-p-1>>1].neg()):p>0?s.add(i[p-1>>1]):s.add(i[-p-1>>1].neg())}return"affine"===t.type?s.toP():s},BaseCurve.prototype._wnafMulAdd=function(t,e,n,r,i){for(var o=this._wnafT1,s=this._wnafT2,a=this._wnafT3,p=0,u=0;u<r;u++){var d=(N=e[u])._getNAFPoints(t);o[u]=d.wnd,s[u]=d.points}for(u=r-1;u>=1;u-=2){var l=u-1,h=u;if(1===o[l]&&1===o[h]){var f=[e[l],null,null,e[h]];0===e[l].y.cmp(e[h].y)?(f[1]=e[l].add(e[h]),f[2]=e[l].toJ().mixedAdd(e[h].neg())):0===e[l].y.cmp(e[h].y.redNeg())?(f[1]=e[l].toJ().mixedAdd(e[h]),f[2]=e[l].add(e[h].neg())):(f[1]=e[l].toJ().mixedAdd(e[h]),f[2]=e[l].toJ().mixedAdd(e[h].neg()));var c=[-3,-1,-5,-7,0,7,5,1,3],g=getJSF(n[l],n[h]);p=Math.max(g[0].length,p),a[l]=new Array(p),a[h]=new Array(p);for(b=0;b<p;b++){var v=0|g[0][b],m=0|g[1][b];a[l][b]=c[3*(v+1)+(m+1)],a[h][b]=0,s[l]=f}}else a[l]=getNAF(n[l],o[l]),a[h]=getNAF(n[h],o[h]),p=Math.max(a[l].length,p),p=Math.max(a[h].length,p)}for(var y=this.jpoint(null,null,null),w=this._wnafT4,u=p;u>=0;u--){for(var B=0;u>=0;){for(var A=!0,b=0;b<r;b++)w[b]=0|a[b][u],0!==w[b]&&(A=!1);if(!A)break;B++,u--}if(u>=0&&B++,y=y.dblp(B),u<0)break;for(b=0;b<r;b++){var N,_=w[b];0!==_&&(_>0?N=s[b][_-1>>1]:_<0&&(N=s[b][-_-1>>1].neg()),y="affine"===N.type?y.mixedAdd(N):y.add(N))}}for(u=0;u<r;u++)s[u]=null;return i?y:y.toP()},BaseCurve.BasePoint=BasePoint,BasePoint.prototype.eq=function(){throw new Error("Not implemented")},BasePoint.prototype.validate=function(){return this.curve.validate(this)},BaseCurve.prototype.decodePoint=function(t,e){t=utils.toArray(t,e);var n=this.p.byteLength();if((4===t[0]||6===t[0]||7===t[0])&&t.length-1==2*n){6===t[0]?assert(t[t.length-1]%2==0):7===t[0]&&assert(t[t.length-1]%2==1);return this.point(t.slice(1,1+n),t.slice(1+n,1+2*n))}if((2===t[0]||3===t[0])&&t.length-1===n)return this.pointFromX(t.slice(1,1+n),3===t[0]);throw new Error("Unknown point format")},BasePoint.prototype.encodeCompressed=function(t){return this.encode(t,!0)},BasePoint.prototype._encode=function(t){var e=this.curve.p.byteLength(),n=this.getX().toArray("be",e);return t?[this.getY().isEven()?2:3].concat(n):[4].concat(n,this.getY().toArray("be",e))},BasePoint.prototype.encode=function(t,e){return utils.encode(this._encode(e),t)},BasePoint.prototype.precompute=function(t){if(this.precomputed)return this;var e={doubles:null,naf:null,beta:null};return e.naf=this._getNAFPoints(8),e.doubles=this._getDoubles(4,t),e.beta=this._getBeta(),this.precomputed=e,this},BasePoint.prototype._hasDoubles=function(t){if(!this.precomputed)return!1;var e=this.precomputed.doubles;return!!e&&e.points.length>=Math.ceil((t.bitLength()+1)/e.step)},BasePoint.prototype._getDoubles=function(t,e){if(this.precomputed&&this.precomputed.doubles)return this.precomputed.doubles;for(var n=[this],r=this,i=0;i<e;i+=t){for(var o=0;o<t;o++)r=r.dbl();n.push(r)}return{step:t,points:n}},BasePoint.prototype._getNAFPoints=function(t){if(this.precomputed&&this.precomputed.naf)return this.precomputed.naf;for(var e=[this],n=(1<<t)-1,r=1===n?null:this.dbl(),i=1;i<n;i++)e[i]=e[i-1].add(r);return{wnd:t,points:e}},BasePoint.prototype._getBeta=function(){return null},BasePoint.prototype.dblp=function(t){for(var e=this,n=0;n<t;n++)e=e.dbl();return e};

},{"../../elliptic":140,"bn.js":89}],142:[function(require,module,exports){
"use strict";function EdwardsCurve(t){this.twisted=1!=(0|t.a),this.mOneA=this.twisted&&-1==(0|t.a),this.extended=this.mOneA,Base.call(this,"edwards",t),this.a=new BN(t.a,16).umod(this.red.m),this.a=this.a.toRed(this.red),this.c=new BN(t.c,16).toRed(this.red),this.c2=this.c.redSqr(),this.d=new BN(t.d,16).toRed(this.red),this.dd=this.d.redAdd(this.d),assert(!this.twisted||0===this.c.fromRed().cmpn(1)),this.oneC=1==(0|t.c)}function Point(t,r,e,i,d){Base.BasePoint.call(this,t,"projective"),null===r&&null===e&&null===i?(this.x=this.curve.zero,this.y=this.curve.one,this.z=this.curve.one,this.t=this.curve.zero,this.zOne=!0):(this.x=new BN(r,16),this.y=new BN(e,16),this.z=i?new BN(i,16):this.curve.one,this.t=d&&new BN(d,16),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)),this.t&&!this.t.red&&(this.t=this.t.toRed(this.curve.red)),this.zOne=this.z===this.curve.one,this.curve.extended&&!this.t&&(this.t=this.x.redMul(this.y),this.zOne||(this.t=this.t.redMul(this.z.redInvm()))))}var curve=require("../curve"),elliptic=require("../../elliptic"),BN=require("bn.js"),inherits=require("inherits"),Base=curve.base,assert=elliptic.utils.assert;inherits(EdwardsCurve,Base),module.exports=EdwardsCurve,EdwardsCurve.prototype._mulA=function(t){return this.mOneA?t.redNeg():this.a.redMul(t)},EdwardsCurve.prototype._mulC=function(t){return this.oneC?t:this.c.redMul(t)},EdwardsCurve.prototype.jpoint=function(t,r,e,i){return this.point(t,r,e,i)},EdwardsCurve.prototype.pointFromX=function(t,r){(t=new BN(t,16)).red||(t=t.toRed(this.red));var e=t.redSqr(),i=this.c2.redSub(this.a.redMul(e)),d=this.one.redSub(this.c2.redMul(this.d).redMul(e)),s=i.redMul(d.redInvm()),u=s.redSqrt();if(0!==u.redSqr().redSub(s).cmp(this.zero))throw new Error("invalid point");var n=u.fromRed().isOdd();return(r&&!n||!r&&n)&&(u=u.redNeg()),this.point(t,u)},EdwardsCurve.prototype.pointFromY=function(t,r){(t=new BN(t,16)).red||(t=t.toRed(this.red));var e=t.redSqr(),i=e.redSub(this.one),d=e.redMul(this.d).redAdd(this.one),s=i.redMul(d.redInvm());if(0===s.cmp(this.zero)){if(r)throw new Error("invalid point");return this.point(this.zero,t)}var u=s.redSqrt();if(0!==u.redSqr().redSub(s).cmp(this.zero))throw new Error("invalid point");return u.isOdd()!==r&&(u=u.redNeg()),this.point(u,t)},EdwardsCurve.prototype.validate=function(t){if(t.isInfinity())return!0;t.normalize();var r=t.x.redSqr(),e=t.y.redSqr(),i=r.redMul(this.a).redAdd(e),d=this.c2.redMul(this.one.redAdd(this.d.redMul(r).redMul(e)));return 0===i.cmp(d)},inherits(Point,Base.BasePoint),EdwardsCurve.prototype.pointFromJSON=function(t){return Point.fromJSON(this,t)},EdwardsCurve.prototype.point=function(t,r,e,i){return new Point(this,t,r,e,i)},Point.fromJSON=function(t,r){return new Point(t,r[0],r[1],r[2])},Point.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" y: "+this.y.fromRed().toString(16,2)+" z: "+this.z.fromRed().toString(16,2)+">"},Point.prototype.isInfinity=function(){return 0===this.x.cmpn(0)&&0===this.y.cmp(this.z)},Point.prototype._extDbl=function(){var t=this.x.redSqr(),r=this.y.redSqr(),e=this.z.redSqr();e=e.redIAdd(e);var i=this.curve._mulA(t),d=this.x.redAdd(this.y).redSqr().redISub(t).redISub(r),s=i.redAdd(r),u=s.redSub(e),n=i.redSub(r),h=d.redMul(u),o=s.redMul(n),l=d.redMul(n),c=u.redMul(s);return this.curve.point(h,o,c,l)},Point.prototype._projDbl=function(){var t,r,e,i=this.x.redAdd(this.y).redSqr(),d=this.x.redSqr(),s=this.y.redSqr();if(this.curve.twisted){var u=(o=this.curve._mulA(d)).redAdd(s);if(this.zOne)t=i.redSub(d).redSub(s).redMul(u.redSub(this.curve.two)),r=u.redMul(o.redSub(s)),e=u.redSqr().redSub(u).redSub(u);else{var n=this.z.redSqr(),h=u.redSub(n).redISub(n);t=i.redSub(d).redISub(s).redMul(h),r=u.redMul(o.redSub(s)),e=u.redMul(h)}}else{var o=d.redAdd(s),n=this.curve._mulC(this.c.redMul(this.z)).redSqr(),h=o.redSub(n).redSub(n);t=this.curve._mulC(i.redISub(o)).redMul(h),r=this.curve._mulC(o).redMul(d.redISub(s)),e=o.redMul(h)}return this.curve.point(t,r,e)},Point.prototype.dbl=function(){return this.isInfinity()?this:this.curve.extended?this._extDbl():this._projDbl()},Point.prototype._extAdd=function(t){var r=this.y.redSub(this.x).redMul(t.y.redSub(t.x)),e=this.y.redAdd(this.x).redMul(t.y.redAdd(t.x)),i=this.t.redMul(this.curve.dd).redMul(t.t),d=this.z.redMul(t.z.redAdd(t.z)),s=e.redSub(r),u=d.redSub(i),n=d.redAdd(i),h=e.redAdd(r),o=s.redMul(u),l=n.redMul(h),c=s.redMul(h),p=u.redMul(n);return this.curve.point(o,l,p,c)},Point.prototype._projAdd=function(t){var r,e,i=this.z.redMul(t.z),d=i.redSqr(),s=this.x.redMul(t.x),u=this.y.redMul(t.y),n=this.curve.d.redMul(s).redMul(u),h=d.redSub(n),o=d.redAdd(n),l=this.x.redAdd(this.y).redMul(t.x.redAdd(t.y)).redISub(s).redISub(u),c=i.redMul(h).redMul(l);return this.curve.twisted?(r=i.redMul(o).redMul(u.redSub(this.curve._mulA(s))),e=h.redMul(o)):(r=i.redMul(o).redMul(u.redSub(s)),e=this.curve._mulC(h).redMul(o)),this.curve.point(c,r,e)},Point.prototype.add=function(t){return this.isInfinity()?t:t.isInfinity()?this:this.curve.extended?this._extAdd(t):this._projAdd(t)},Point.prototype.mul=function(t){return this._hasDoubles(t)?this.curve._fixedNafMul(this,t):this.curve._wnafMul(this,t)},Point.prototype.mulAdd=function(t,r,e){return this.curve._wnafMulAdd(1,[this,r],[t,e],2,!1)},Point.prototype.jmulAdd=function(t,r,e){return this.curve._wnafMulAdd(1,[this,r],[t,e],2,!0)},Point.prototype.normalize=function(){if(this.zOne)return this;var t=this.z.redInvm();return this.x=this.x.redMul(t),this.y=this.y.redMul(t),this.t&&(this.t=this.t.redMul(t)),this.z=this.curve.one,this.zOne=!0,this},Point.prototype.neg=function(){return this.curve.point(this.x.redNeg(),this.y,this.z,this.t&&this.t.redNeg())},Point.prototype.getX=function(){return this.normalize(),this.x.fromRed()},Point.prototype.getY=function(){return this.normalize(),this.y.fromRed()},Point.prototype.eq=function(t){return this===t||0===this.getX().cmp(t.getX())&&0===this.getY().cmp(t.getY())},Point.prototype.eqXToP=function(t){var r=t.toRed(this.curve.red).redMul(this.z);if(0===this.x.cmp(r))return!0;for(var e=t.clone(),i=this.curve.redN.redMul(this.z);;){if(e.iadd(this.curve.n),e.cmp(this.curve.p)>=0)return!1;if(r.redIAdd(i),0===this.x.cmp(r))return!0}return!1},Point.prototype.toP=Point.prototype.normalize,Point.prototype.mixedAdd=Point.prototype.add;

},{"../../elliptic":140,"../curve":143,"bn.js":89,"inherits":174}],143:[function(require,module,exports){
"use strict";var curve=exports;curve.base=require("./base"),curve.short=require("./short"),curve.mont=require("./mont"),curve.edwards=require("./edwards");

},{"./base":141,"./edwards":142,"./mont":144,"./short":145}],144:[function(require,module,exports){
"use strict";function MontCurve(t){Base.call(this,"mont",t),this.a=new BN(t.a,16).toRed(this.red),this.b=new BN(t.b,16).toRed(this.red),this.i4=new BN(4).toRed(this.red).redInvm(),this.two=new BN(2).toRed(this.red),this.a24=this.i4.redMul(this.a.redAdd(this.two))}function Point(t,r,e){Base.BasePoint.call(this,t,"projective"),null===r&&null===e?(this.x=this.curve.one,this.z=this.curve.zero):(this.x=new BN(r,16),this.z=new BN(e,16),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)))}var curve=require("../curve"),BN=require("bn.js"),inherits=require("inherits"),Base=curve.base,elliptic=require("../../elliptic"),utils=elliptic.utils;inherits(MontCurve,Base),module.exports=MontCurve,MontCurve.prototype.validate=function(t){var r=t.normalize().x,e=r.redSqr(),i=e.redMul(r).redAdd(e.redMul(this.a)).redAdd(r);return 0===i.redSqrt().redSqr().cmp(i)},inherits(Point,Base.BasePoint),MontCurve.prototype.decodePoint=function(t,r){return this.point(utils.toArray(t,r),1)},MontCurve.prototype.point=function(t,r){return new Point(this,t,r)},MontCurve.prototype.pointFromJSON=function(t){return Point.fromJSON(this,t)},Point.prototype.precompute=function(){},Point.prototype._encode=function(){return this.getX().toArray("be",this.curve.p.byteLength())},Point.fromJSON=function(t,r){return new Point(t,r[0],r[1]||t.one)},Point.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" z: "+this.z.fromRed().toString(16,2)+">"},Point.prototype.isInfinity=function(){return 0===this.z.cmpn(0)},Point.prototype.dbl=function(){var t=this.x.redAdd(this.z).redSqr(),r=this.x.redSub(this.z).redSqr(),e=t.redSub(r),i=t.redMul(r),o=e.redMul(r.redAdd(this.curve.a24.redMul(e)));return this.curve.point(i,o)},Point.prototype.add=function(){throw new Error("Not supported on Montgomery curve")},Point.prototype.diffAdd=function(t,r){var e=this.x.redAdd(this.z),i=this.x.redSub(this.z),o=t.x.redAdd(t.z),n=t.x.redSub(t.z).redMul(e),u=o.redMul(i),d=r.z.redMul(n.redAdd(u).redSqr()),s=r.x.redMul(n.redISub(u).redSqr());return this.curve.point(d,s)},Point.prototype.mul=function(t){for(var r=t.clone(),e=this,i=this.curve.point(null,null),o=this,n=[];0!==r.cmpn(0);r.iushrn(1))n.push(r.andln(1));for(var u=n.length-1;u>=0;u--)0===n[u]?(e=e.diffAdd(i,o),i=i.dbl()):(i=e.diffAdd(i,o),e=e.dbl());return i},Point.prototype.mulAdd=function(){throw new Error("Not supported on Montgomery curve")},Point.prototype.jumlAdd=function(){throw new Error("Not supported on Montgomery curve")},Point.prototype.eq=function(t){return 0===this.getX().cmp(t.getX())},Point.prototype.normalize=function(){return this.x=this.x.redMul(this.z.redInvm()),this.z=this.curve.one,this},Point.prototype.getX=function(){return this.normalize(),this.x.fromRed()};

},{"../../elliptic":140,"../curve":143,"bn.js":89,"inherits":174}],145:[function(require,module,exports){
"use strict";function ShortCurve(r){Base.call(this,"short",r),this.a=new BN(r.a,16).toRed(this.red),this.b=new BN(r.b,16).toRed(this.red),this.tinv=this.two.redInvm(),this.zeroA=0===this.a.fromRed().cmpn(0),this.threeA=0===this.a.fromRed().sub(this.p).cmpn(-3),this.endo=this._getEndomorphism(r),this._endoWnafT1=new Array(4),this._endoWnafT2=new Array(4)}function Point(r,e,t,d){Base.BasePoint.call(this,r,"affine"),null===e&&null===t?(this.x=null,this.y=null,this.inf=!0):(this.x=new BN(e,16),this.y=new BN(t,16),d&&(this.x.forceRed(this.curve.red),this.y.forceRed(this.curve.red)),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.inf=!1)}function JPoint(r,e,t,d){Base.BasePoint.call(this,r,"jacobian"),null===e&&null===t&&null===d?(this.x=this.curve.one,this.y=this.curve.one,this.z=new BN(0)):(this.x=new BN(e,16),this.y=new BN(t,16),this.z=new BN(d,16)),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)),this.zOne=this.z===this.curve.one}var curve=require("../curve"),elliptic=require("../../elliptic"),BN=require("bn.js"),inherits=require("inherits"),Base=curve.base,assert=elliptic.utils.assert;inherits(ShortCurve,Base),module.exports=ShortCurve,ShortCurve.prototype._getEndomorphism=function(r){if(this.zeroA&&this.g&&this.n&&1===this.p.modn(3)){var e,t;if(r.beta)e=new BN(r.beta,16).toRed(this.red);else{var d=this._getEndoRoots(this.p);e=(e=d[0].cmp(d[1])<0?d[0]:d[1]).toRed(this.red)}if(r.lambda)t=new BN(r.lambda,16);else{var i=this._getEndoRoots(this.n);0===this.g.mul(i[0]).x.cmp(this.g.x.redMul(e))?t=i[0]:(t=i[1],assert(0===this.g.mul(t).x.cmp(this.g.x.redMul(e))))}var n;return n=r.basis?r.basis.map(function(r){return{a:new BN(r.a,16),b:new BN(r.b,16)}}):this._getEndoBasis(t),{beta:e,lambda:t,basis:n}}},ShortCurve.prototype._getEndoRoots=function(r){var e=r===this.p?this.red:BN.mont(r),t=new BN(2).toRed(e).redInvm(),d=t.redNeg(),i=new BN(3).toRed(e).redNeg().redSqrt().redMul(t);return[d.redAdd(i).fromRed(),d.redSub(i).fromRed()]},ShortCurve.prototype._getEndoBasis=function(r){for(var e,t,d,i,n,u,s,o,h,l=this.n.ushrn(Math.floor(this.n.bitLength()/2)),p=r,a=this.n.clone(),c=new BN(1),f=new BN(0),v=new BN(0),S=new BN(1),b=0;0!==p.cmpn(0);){var I=a.div(p);o=a.sub(I.mul(p)),h=v.sub(I.mul(c));var y=S.sub(I.mul(f));if(!d&&o.cmp(l)<0)e=s.neg(),t=c,d=o.neg(),i=h;else if(d&&2==++b)break;s=o,a=p,p=o,v=c,c=h,S=f,f=y}n=o.neg(),u=h;var A=d.sqr().add(i.sqr());return n.sqr().add(u.sqr()).cmp(A)>=0&&(n=e,u=t),d.negative&&(d=d.neg(),i=i.neg()),n.negative&&(n=n.neg(),u=u.neg()),[{a:d,b:i},{a:n,b:u}]},ShortCurve.prototype._endoSplit=function(r){var e=this.endo.basis,t=e[0],d=e[1],i=d.b.mul(r).divRound(this.n),n=t.b.neg().mul(r).divRound(this.n),u=i.mul(t.a),s=n.mul(d.a),o=i.mul(t.b),h=n.mul(d.b);return{k1:r.sub(u).sub(s),k2:o.add(h).neg()}},ShortCurve.prototype.pointFromX=function(r,e){(r=new BN(r,16)).red||(r=r.toRed(this.red));var t=r.redSqr().redMul(r).redIAdd(r.redMul(this.a)).redIAdd(this.b),d=t.redSqrt();if(0!==d.redSqr().redSub(t).cmp(this.zero))throw new Error("invalid point");var i=d.fromRed().isOdd();return(e&&!i||!e&&i)&&(d=d.redNeg()),this.point(r,d)},ShortCurve.prototype.validate=function(r){if(r.inf)return!0;var e=r.x,t=r.y,d=this.a.redMul(e),i=e.redSqr().redMul(e).redIAdd(d).redIAdd(this.b);return 0===t.redSqr().redISub(i).cmpn(0)},ShortCurve.prototype._endoWnafMulAdd=function(r,e,t){for(var d=this._endoWnafT1,i=this._endoWnafT2,n=0;n<r.length;n++){var u=this._endoSplit(e[n]),s=r[n],o=s._getBeta();u.k1.negative&&(u.k1.ineg(),s=s.neg(!0)),u.k2.negative&&(u.k2.ineg(),o=o.neg(!0)),d[2*n]=s,d[2*n+1]=o,i[2*n]=u.k1,i[2*n+1]=u.k2}for(var h=this._wnafMulAdd(1,d,i,2*n,t),l=0;l<2*n;l++)d[l]=null,i[l]=null;return h},inherits(Point,Base.BasePoint),ShortCurve.prototype.point=function(r,e,t){return new Point(this,r,e,t)},ShortCurve.prototype.pointFromJSON=function(r,e){return Point.fromJSON(this,r,e)},Point.prototype._getBeta=function(){if(this.curve.endo){var r=this.precomputed;if(r&&r.beta)return r.beta;var e=this.curve.point(this.x.redMul(this.curve.endo.beta),this.y);if(r){var t=this.curve,d=function(r){return t.point(r.x.redMul(t.endo.beta),r.y)};r.beta=e,e.precomputed={beta:null,naf:r.naf&&{wnd:r.naf.wnd,points:r.naf.points.map(d)},doubles:r.doubles&&{step:r.doubles.step,points:r.doubles.points.map(d)}}}return e}},Point.prototype.toJSON=function(){return this.precomputed?[this.x,this.y,this.precomputed&&{doubles:this.precomputed.doubles&&{step:this.precomputed.doubles.step,points:this.precomputed.doubles.points.slice(1)},naf:this.precomputed.naf&&{wnd:this.precomputed.naf.wnd,points:this.precomputed.naf.points.slice(1)}}]:[this.x,this.y]},Point.fromJSON=function(r,e,t){function d(e){return r.point(e[0],e[1],t)}"string"==typeof e&&(e=JSON.parse(e));var i=r.point(e[0],e[1],t);if(!e[2])return i;var n=e[2];return i.precomputed={beta:null,doubles:n.doubles&&{step:n.doubles.step,points:[i].concat(n.doubles.points.map(d))},naf:n.naf&&{wnd:n.naf.wnd,points:[i].concat(n.naf.points.map(d))}},i},Point.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" y: "+this.y.fromRed().toString(16,2)+">"},Point.prototype.isInfinity=function(){return this.inf},Point.prototype.add=function(r){if(this.inf)return r;if(r.inf)return this;if(this.eq(r))return this.dbl();if(this.neg().eq(r))return this.curve.point(null,null);if(0===this.x.cmp(r.x))return this.curve.point(null,null);var e=this.y.redSub(r.y);0!==e.cmpn(0)&&(e=e.redMul(this.x.redSub(r.x).redInvm()));var t=e.redSqr().redISub(this.x).redISub(r.x),d=e.redMul(this.x.redSub(t)).redISub(this.y);return this.curve.point(t,d)},Point.prototype.dbl=function(){if(this.inf)return this;var r=this.y.redAdd(this.y);if(0===r.cmpn(0))return this.curve.point(null,null);var e=this.curve.a,t=this.x.redSqr(),d=r.redInvm(),i=t.redAdd(t).redIAdd(t).redIAdd(e).redMul(d),n=i.redSqr().redISub(this.x.redAdd(this.x)),u=i.redMul(this.x.redSub(n)).redISub(this.y);return this.curve.point(n,u)},Point.prototype.getX=function(){return this.x.fromRed()},Point.prototype.getY=function(){return this.y.fromRed()},Point.prototype.mul=function(r){return r=new BN(r,16),this._hasDoubles(r)?this.curve._fixedNafMul(this,r):this.curve.endo?this.curve._endoWnafMulAdd([this],[r]):this.curve._wnafMul(this,r)},Point.prototype.mulAdd=function(r,e,t){var d=[this,e],i=[r,t];return this.curve.endo?this.curve._endoWnafMulAdd(d,i):this.curve._wnafMulAdd(1,d,i,2)},Point.prototype.jmulAdd=function(r,e,t){var d=[this,e],i=[r,t];return this.curve.endo?this.curve._endoWnafMulAdd(d,i,!0):this.curve._wnafMulAdd(1,d,i,2,!0)},Point.prototype.eq=function(r){return this===r||this.inf===r.inf&&(this.inf||0===this.x.cmp(r.x)&&0===this.y.cmp(r.y))},Point.prototype.neg=function(r){if(this.inf)return this;var e=this.curve.point(this.x,this.y.redNeg());if(r&&this.precomputed){var t=this.precomputed,d=function(r){return r.neg()};e.precomputed={naf:t.naf&&{wnd:t.naf.wnd,points:t.naf.points.map(d)},doubles:t.doubles&&{step:t.doubles.step,points:t.doubles.points.map(d)}}}return e},Point.prototype.toJ=function(){if(this.inf)return this.curve.jpoint(null,null,null);return this.curve.jpoint(this.x,this.y,this.curve.one)},inherits(JPoint,Base.BasePoint),ShortCurve.prototype.jpoint=function(r,e,t){return new JPoint(this,r,e,t)},JPoint.prototype.toP=function(){if(this.isInfinity())return this.curve.point(null,null);var r=this.z.redInvm(),e=r.redSqr(),t=this.x.redMul(e),d=this.y.redMul(e).redMul(r);return this.curve.point(t,d)},JPoint.prototype.neg=function(){return this.curve.jpoint(this.x,this.y.redNeg(),this.z)},JPoint.prototype.add=function(r){if(this.isInfinity())return r;if(r.isInfinity())return this;var e=r.z.redSqr(),t=this.z.redSqr(),d=this.x.redMul(e),i=r.x.redMul(t),n=this.y.redMul(e.redMul(r.z)),u=r.y.redMul(t.redMul(this.z)),s=d.redSub(i),o=n.redSub(u);if(0===s.cmpn(0))return 0!==o.cmpn(0)?this.curve.jpoint(null,null,null):this.dbl();var h=s.redSqr(),l=h.redMul(s),p=d.redMul(h),a=o.redSqr().redIAdd(l).redISub(p).redISub(p),c=o.redMul(p.redISub(a)).redISub(n.redMul(l)),f=this.z.redMul(r.z).redMul(s);return this.curve.jpoint(a,c,f)},JPoint.prototype.mixedAdd=function(r){if(this.isInfinity())return r.toJ();if(r.isInfinity())return this;var e=this.z.redSqr(),t=this.x,d=r.x.redMul(e),i=this.y,n=r.y.redMul(e).redMul(this.z),u=t.redSub(d),s=i.redSub(n);if(0===u.cmpn(0))return 0!==s.cmpn(0)?this.curve.jpoint(null,null,null):this.dbl();var o=u.redSqr(),h=o.redMul(u),l=t.redMul(o),p=s.redSqr().redIAdd(h).redISub(l).redISub(l),a=s.redMul(l.redISub(p)).redISub(i.redMul(h)),c=this.z.redMul(u);return this.curve.jpoint(p,a,c)},JPoint.prototype.dblp=function(r){if(0===r)return this;if(this.isInfinity())return this;if(!r)return this.dbl();if(this.curve.zeroA||this.curve.threeA){for(var e=this,t=0;t<r;t++)e=e.dbl();return e}for(var d=this.curve.a,i=this.curve.tinv,n=this.x,u=this.y,s=this.z,o=s.redSqr().redSqr(),h=u.redAdd(u),t=0;t<r;t++){var l=n.redSqr(),p=h.redSqr(),a=p.redSqr(),c=l.redAdd(l).redIAdd(l).redIAdd(d.redMul(o)),f=n.redMul(p),v=c.redSqr().redISub(f.redAdd(f)),S=f.redISub(v),b=c.redMul(S);b=b.redIAdd(b).redISub(a);var I=h.redMul(s);t+1<r&&(o=o.redMul(a)),n=v,s=I,h=b}return this.curve.jpoint(n,h.redMul(i),s)},JPoint.prototype.dbl=function(){return this.isInfinity()?this:this.curve.zeroA?this._zeroDbl():this.curve.threeA?this._threeDbl():this._dbl()},JPoint.prototype._zeroDbl=function(){var r,e,t;if(this.zOne){var d=this.x.redSqr(),i=this.y.redSqr(),n=i.redSqr(),u=this.x.redAdd(i).redSqr().redISub(d).redISub(n);u=u.redIAdd(u);var s=d.redAdd(d).redIAdd(d),o=s.redSqr().redISub(u).redISub(u),h=n.redIAdd(n);h=(h=h.redIAdd(h)).redIAdd(h),r=o,e=s.redMul(u.redISub(o)).redISub(h),t=this.y.redAdd(this.y)}else{var l=this.x.redSqr(),p=this.y.redSqr(),a=p.redSqr(),c=this.x.redAdd(p).redSqr().redISub(l).redISub(a);c=c.redIAdd(c);var f=l.redAdd(l).redIAdd(l),v=f.redSqr(),S=a.redIAdd(a);S=(S=S.redIAdd(S)).redIAdd(S),r=v.redISub(c).redISub(c),e=f.redMul(c.redISub(r)).redISub(S),t=(t=this.y.redMul(this.z)).redIAdd(t)}return this.curve.jpoint(r,e,t)},JPoint.prototype._threeDbl=function(){var r,e,t;if(this.zOne){var d=this.x.redSqr(),i=this.y.redSqr(),n=i.redSqr(),u=this.x.redAdd(i).redSqr().redISub(d).redISub(n);u=u.redIAdd(u);var s=d.redAdd(d).redIAdd(d).redIAdd(this.curve.a),o=s.redSqr().redISub(u).redISub(u);r=o;var h=n.redIAdd(n);h=(h=h.redIAdd(h)).redIAdd(h),e=s.redMul(u.redISub(o)).redISub(h),t=this.y.redAdd(this.y)}else{var l=this.z.redSqr(),p=this.y.redSqr(),a=this.x.redMul(p),c=this.x.redSub(l).redMul(this.x.redAdd(l));c=c.redAdd(c).redIAdd(c);var f=a.redIAdd(a),v=(f=f.redIAdd(f)).redAdd(f);r=c.redSqr().redISub(v),t=this.y.redAdd(this.z).redSqr().redISub(p).redISub(l);var S=p.redSqr();S=(S=(S=S.redIAdd(S)).redIAdd(S)).redIAdd(S),e=c.redMul(f.redISub(r)).redISub(S)}return this.curve.jpoint(r,e,t)},JPoint.prototype._dbl=function(){var r=this.curve.a,e=this.x,t=this.y,d=this.z,i=d.redSqr().redSqr(),n=e.redSqr(),u=t.redSqr(),s=n.redAdd(n).redIAdd(n).redIAdd(r.redMul(i)),o=e.redAdd(e),h=(o=o.redIAdd(o)).redMul(u),l=s.redSqr().redISub(h.redAdd(h)),p=h.redISub(l),a=u.redSqr();a=(a=(a=a.redIAdd(a)).redIAdd(a)).redIAdd(a);var c=s.redMul(p).redISub(a),f=t.redAdd(t).redMul(d);return this.curve.jpoint(l,c,f)},JPoint.prototype.trpl=function(){if(!this.curve.zeroA)return this.dbl().add(this);var r=this.x.redSqr(),e=this.y.redSqr(),t=this.z.redSqr(),d=e.redSqr(),i=r.redAdd(r).redIAdd(r),n=i.redSqr(),u=this.x.redAdd(e).redSqr().redISub(r).redISub(d),s=(u=(u=(u=u.redIAdd(u)).redAdd(u).redIAdd(u)).redISub(n)).redSqr(),o=d.redIAdd(d);o=(o=(o=o.redIAdd(o)).redIAdd(o)).redIAdd(o);var h=i.redIAdd(u).redSqr().redISub(n).redISub(s).redISub(o),l=e.redMul(h);l=(l=l.redIAdd(l)).redIAdd(l);var p=this.x.redMul(s).redISub(l);p=(p=p.redIAdd(p)).redIAdd(p);var a=this.y.redMul(h.redMul(o.redISub(h)).redISub(u.redMul(s)));a=(a=(a=a.redIAdd(a)).redIAdd(a)).redIAdd(a);var c=this.z.redAdd(u).redSqr().redISub(t).redISub(s);return this.curve.jpoint(p,a,c)},JPoint.prototype.mul=function(r,e){return r=new BN(r,e),this.curve._wnafMul(this,r)},JPoint.prototype.eq=function(r){if("affine"===r.type)return this.eq(r.toJ());if(this===r)return!0;var e=this.z.redSqr(),t=r.z.redSqr();if(0!==this.x.redMul(t).redISub(r.x.redMul(e)).cmpn(0))return!1;var d=e.redMul(this.z),i=t.redMul(r.z);return 0===this.y.redMul(i).redISub(r.y.redMul(d)).cmpn(0)},JPoint.prototype.eqXToP=function(r){var e=this.z.redSqr(),t=r.toRed(this.curve.red).redMul(e);if(0===this.x.cmp(t))return!0;for(var d=r.clone(),i=this.curve.redN.redMul(e);;){if(d.iadd(this.curve.n),d.cmp(this.curve.p)>=0)return!1;if(t.redIAdd(i),0===this.x.cmp(t))return!0}return!1},JPoint.prototype.inspect=function(){return this.isInfinity()?"<EC JPoint Infinity>":"<EC JPoint x: "+this.x.toString(16,2)+" y: "+this.y.toString(16,2)+" z: "+this.z.toString(16,2)+">"},JPoint.prototype.isInfinity=function(){return 0===this.z.cmpn(0)};

},{"../../elliptic":140,"../curve":143,"bn.js":89,"inherits":174}],146:[function(require,module,exports){
"use strict";function PresetCurve(f){"short"===f.type?this.curve=new elliptic.curve.short(f):"edwards"===f.type?this.curve=new elliptic.curve.edwards(f):this.curve=new elliptic.curve.mont(f),this.g=this.curve.g,this.n=this.curve.n,this.hash=f.hash,assert(this.g.validate(),"Invalid curve"),assert(this.g.mul(this.n).isInfinity(),"Invalid curve, G*N != O")}function defineCurve(f,e){Object.defineProperty(curves,f,{configurable:!0,enumerable:!0,get:function(){var a=new PresetCurve(e);return Object.defineProperty(curves,f,{configurable:!0,enumerable:!0,value:a}),a}})}var curves=exports,hash=require("hash.js"),elliptic=require("../elliptic"),assert=elliptic.utils.assert;curves.PresetCurve=PresetCurve,defineCurve("p192",{type:"short",prime:"p192",p:"ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",a:"ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",b:"64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",n:"ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",hash:hash.sha256,gRed:!1,g:["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012","07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"]}),defineCurve("p224",{type:"short",prime:"p224",p:"ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",a:"ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",b:"b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",n:"ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",hash:hash.sha256,gRed:!1,g:["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21","bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"]}),defineCurve("p256",{type:"short",prime:null,p:"ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",a:"ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",b:"5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",n:"ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",hash:hash.sha256,gRed:!1,g:["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296","4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"]}),defineCurve("p384",{type:"short",prime:null,p:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",a:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",b:"b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",n:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",hash:hash.sha384,gRed:!1,g:["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7","3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"]}),defineCurve("p521",{type:"short",prime:null,p:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",a:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",b:"00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",n:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",hash:hash.sha512,gRed:!1,g:["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66","00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"]}),defineCurve("curve25519",{type:"mont",prime:"p25519",p:"7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",a:"76d06",b:"1",n:"1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",hash:hash.sha256,gRed:!1,g:["9"]}),defineCurve("ed25519",{type:"edwards",prime:"p25519",p:"7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",a:"-1",c:"1",d:"52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",n:"1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",hash:hash.sha256,gRed:!1,g:["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a","6666666666666666666666666666666666666666666666666666666666666658"]});var pre;try{pre=require("./precomputed/secp256k1")}catch(f){pre=void 0}defineCurve("secp256k1",{type:"short",prime:"k256",p:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",a:"0",b:"7",n:"ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",h:"1",hash:hash.sha256,beta:"7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",lambda:"5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",basis:[{a:"3086d221a7d46bcde86c90e49284eb15",b:"-e4437ed6010e88286f547fa90abfe4c3"},{a:"114ca50f7a8e2f3f657c1108d9d44cfd8",b:"3086d221a7d46bcde86c90e49284eb15"}],gRed:!1,g:["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798","483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",pre]});

},{"../elliptic":140,"./precomputed/secp256k1":153,"hash.js":159}],147:[function(require,module,exports){
"use strict";function EC(e){if(!(this instanceof EC))return new EC(e);"string"==typeof e&&(assert(elliptic.curves.hasOwnProperty(e),"Unknown curve "+e),e=elliptic.curves[e]),e instanceof elliptic.curves.PresetCurve&&(e={curve:e}),this.curve=e.curve.curve,this.n=this.curve.n,this.nh=this.n.ushrn(1),this.g=this.curve.g,this.g=e.curve.g,this.g.precompute(e.curve.n.bitLength()+1),this.hash=e.hash||e.curve.hash}var BN=require("bn.js"),HmacDRBG=require("hmac-drbg"),elliptic=require("../../elliptic"),utils=elliptic.utils,assert=utils.assert,KeyPair=require("./key"),Signature=require("./signature");module.exports=EC,EC.prototype.keyPair=function(e){return new KeyPair(this,e)},EC.prototype.keyFromPrivate=function(e,t){return KeyPair.fromPrivate(this,e,t)},EC.prototype.keyFromPublic=function(e,t){return KeyPair.fromPublic(this,e,t)},EC.prototype.genKeyPair=function(e){e||(e={});for(var t=new HmacDRBG({hash:this.hash,pers:e.pers,persEnc:e.persEnc||"utf8",entropy:e.entropy||elliptic.rand(this.hash.hmacStrength),entropyEnc:e.entropy&&e.entropyEnc||"utf8",nonce:this.n.toArray()}),r=this.n.byteLength(),n=this.n.sub(new BN(2));;){var i=new BN(t.generate(r));if(!(i.cmp(n)>0))return i.iaddn(1),this.keyFromPrivate(i)}},EC.prototype._truncateToN=function(e,t){var r=8*e.byteLength()-this.n.bitLength();return r>0&&(e=e.ushrn(r)),!t&&e.cmp(this.n)>=0?e.sub(this.n):e},EC.prototype.sign=function(e,t,r,n){"object"==typeof r&&(n=r,r=null),n||(n={}),t=this.keyFromPrivate(t,r),e=this._truncateToN(new BN(e,16));for(var i=this.n.byteLength(),s=t.getPrivate().toArray("be",i),u=e.toArray("be",i),o=new HmacDRBG({hash:this.hash,entropy:s,nonce:u,pers:n.pers,persEnc:n.persEnc||"utf8"}),c=this.n.sub(new BN(1)),h=0;!0;h++){var a=n.k?n.k(h):new BN(o.generate(this.n.byteLength()));if(!((a=this._truncateToN(a,!0)).cmpn(1)<=0||a.cmp(c)>=0)){var p=this.g.mul(a);if(!p.isInfinity()){var m=p.getX(),v=m.umod(this.n);if(0!==v.cmpn(0)){var y=a.invm(this.n).mul(v.mul(t.getPrivate()).iadd(e));if(0!==(y=y.umod(this.n)).cmpn(0)){var l=(p.getY().isOdd()?1:0)|(0!==m.cmp(v)?2:0);return n.canonical&&y.cmp(this.nh)>0&&(y=this.n.sub(y),l^=1),new Signature({r:v,s:y,recoveryParam:l})}}}}}},EC.prototype.verify=function(e,t,r,n){e=this._truncateToN(new BN(e,16)),r=this.keyFromPublic(r,n);var i=(t=new Signature(t,"hex")).r,s=t.s;if(i.cmpn(1)<0||i.cmp(this.n)>=0)return!1;if(s.cmpn(1)<0||s.cmp(this.n)>=0)return!1;var u=s.invm(this.n),o=u.mul(e).umod(this.n),c=u.mul(i).umod(this.n);if(!this.curve._maxwellTrick){return!(h=this.g.mulAdd(o,r.getPublic(),c)).isInfinity()&&0===h.getX().umod(this.n).cmp(i)}var h=this.g.jmulAdd(o,r.getPublic(),c);return!h.isInfinity()&&h.eqXToP(i)},EC.prototype.recoverPubKey=function(e,t,r,n){assert((3&r)===r,"The recovery param is more than two bits"),t=new Signature(t,n);var i=this.n,s=new BN(e),u=t.r,o=t.s,c=1&r,h=r>>1;if(u.cmp(this.curve.p.umod(this.curve.n))>=0&&h)throw new Error("Unable to find sencond key candinate");u=h?this.curve.pointFromX(u.add(this.curve.n),c):this.curve.pointFromX(u,c);var a=t.r.invm(i),p=i.sub(s).mul(a).umod(i),m=o.mul(a).umod(i);return this.g.mulAdd(p,u,m)},EC.prototype.getKeyRecoveryParam=function(e,t,r,n){if(null!==(t=new Signature(t,n)).recoveryParam)return t.recoveryParam;for(var i=0;i<4;i++){var s;try{s=this.recoverPubKey(e,t,i)}catch(e){continue}if(s.eq(r))return i}throw new Error("Unable to find valid recovery factor")};

},{"../../elliptic":140,"./key":148,"./signature":149,"bn.js":89,"hmac-drbg":171}],148:[function(require,module,exports){
"use strict";function KeyPair(i,t){this.ec=i,this.priv=null,this.pub=null,t.priv&&this._importPrivate(t.priv,t.privEnc),t.pub&&this._importPublic(t.pub,t.pubEnc)}var BN=require("bn.js"),elliptic=require("../../elliptic"),utils=elliptic.utils,assert=utils.assert;module.exports=KeyPair,KeyPair.fromPublic=function(i,t,e){return t instanceof KeyPair?t:new KeyPair(i,{pub:t,pubEnc:e})},KeyPair.fromPrivate=function(i,t,e){return t instanceof KeyPair?t:new KeyPair(i,{priv:t,privEnc:e})},KeyPair.prototype.validate=function(){var i=this.getPublic();return i.isInfinity()?{result:!1,reason:"Invalid public key"}:i.validate()?i.mul(this.ec.curve.n).isInfinity()?{result:!0,reason:null}:{result:!1,reason:"Public key * N != O"}:{result:!1,reason:"Public key is not a point"}},KeyPair.prototype.getPublic=function(i,t){return"string"==typeof i&&(t=i,i=null),this.pub||(this.pub=this.ec.g.mul(this.priv)),t?this.pub.encode(t,i):this.pub},KeyPair.prototype.getPrivate=function(i){return"hex"===i?this.priv.toString(16,2):this.priv},KeyPair.prototype._importPrivate=function(i,t){this.priv=new BN(i,t||16),this.priv=this.priv.umod(this.ec.curve.n)},KeyPair.prototype._importPublic=function(i,t){if(i.x||i.y)return"mont"===this.ec.curve.type?assert(i.x,"Need x coordinate"):"short"!==this.ec.curve.type&&"edwards"!==this.ec.curve.type||assert(i.x&&i.y,"Need both x and y coordinate"),void(this.pub=this.ec.curve.point(i.x,i.y));this.pub=this.ec.curve.decodePoint(i,t)},KeyPair.prototype.derive=function(i){return i.mul(this.priv).getX()},KeyPair.prototype.sign=function(i,t,e){return this.ec.sign(i,this,t,e)},KeyPair.prototype.verify=function(i,t){return this.ec.verify(i,t,this)},KeyPair.prototype.inspect=function(){return"<Key priv: "+(this.priv&&this.priv.toString(16,2))+" pub: "+(this.pub&&this.pub.inspect())+" >"};

},{"../../elliptic":140,"bn.js":89}],149:[function(require,module,exports){
"use strict";function Signature(t,r){if(t instanceof Signature)return t;this._importDER(t,r)||(assert(t.r&&t.s,"Signature without r or s"),this.r=new BN(t.r,16),this.s=new BN(t.s,16),void 0===t.recoveryParam?this.recoveryParam=null:this.recoveryParam=t.recoveryParam)}function Position(){this.place=0}function getLength(t,r){var e=t[r.place++];if(!(128&e))return e;for(var n=15&e,i=0,a=0,c=r.place;a<n;a++,c++)i<<=8,i|=t[c];return r.place=c,i}function rmPadding(t){for(var r=0,e=t.length-1;!t[r]&&!(128&t[r+1])&&r<e;)r++;return 0===r?t:t.slice(r)}function constructLength(t,r){if(r<128)t.push(r);else{var e=1+(Math.log(r)/Math.LN2>>>3);for(t.push(128|e);--e;)t.push(r>>>(e<<3)&255);t.push(r)}}var BN=require("bn.js"),elliptic=require("../../elliptic"),utils=elliptic.utils,assert=utils.assert;module.exports=Signature,Signature.prototype._importDER=function(t,r){t=utils.toArray(t,r);var e=new Position;if(48!==t[e.place++])return!1;if(getLength(t,e)+e.place!==t.length)return!1;if(2!==t[e.place++])return!1;var n=getLength(t,e),i=t.slice(e.place,n+e.place);if(e.place+=n,2!==t[e.place++])return!1;var a=getLength(t,e);if(t.length!==a+e.place)return!1;var c=t.slice(e.place,a+e.place);return 0===i[0]&&128&i[1]&&(i=i.slice(1)),0===c[0]&&128&c[1]&&(c=c.slice(1)),this.r=new BN(i),this.s=new BN(c),this.recoveryParam=null,!0},Signature.prototype.toDER=function(t){var r=this.r.toArray(),e=this.s.toArray();for(128&r[0]&&(r=[0].concat(r)),128&e[0]&&(e=[0].concat(e)),r=rmPadding(r),e=rmPadding(e);!(e[0]||128&e[1]);)e=e.slice(1);var n=[2];constructLength(n,r.length),(n=n.concat(r)).push(2),constructLength(n,e.length);var i=n.concat(e),a=[48];return constructLength(a,i.length),a=a.concat(i),utils.encode(a,t)};

},{"../../elliptic":140,"bn.js":89}],150:[function(require,module,exports){
"use strict";function EDDSA(t){if(assert("ed25519"===t,"only tested with ed25519 so far"),!(this instanceof EDDSA))return new EDDSA(t);t=elliptic.curves[t].curve;this.curve=t,this.g=t.g,this.g.precompute(t.n.bitLength()+1),this.pointClass=t.point().constructor,this.encodingLength=Math.ceil(t.n.bitLength()/8),this.hash=hash.sha512}var hash=require("hash.js"),elliptic=require("../../elliptic"),utils=elliptic.utils,assert=utils.assert,parseBytes=utils.parseBytes,KeyPair=require("./key"),Signature=require("./signature");module.exports=EDDSA,EDDSA.prototype.sign=function(t,e){t=parseBytes(t);var i=this.keyFromSecret(e),r=this.hashInt(i.messagePrefix(),t),n=this.g.mul(r),s=this.encodePoint(n),o=this.hashInt(s,i.pubBytes(),t).mul(i.priv()),u=r.add(o).umod(this.curve.n);return this.makeSignature({R:n,S:u,Rencoded:s})},EDDSA.prototype.verify=function(t,e,i){t=parseBytes(t),e=this.makeSignature(e);var r=this.keyFromPublic(i),n=this.hashInt(e.Rencoded(),r.pubBytes(),t),s=this.g.mul(e.S());return e.R().add(r.pub().mul(n)).eq(s)},EDDSA.prototype.hashInt=function(){for(var t=this.hash(),e=0;e<arguments.length;e++)t.update(arguments[e]);return utils.intFromLE(t.digest()).umod(this.curve.n)},EDDSA.prototype.keyFromPublic=function(t){return KeyPair.fromPublic(this,t)},EDDSA.prototype.keyFromSecret=function(t){return KeyPair.fromSecret(this,t)},EDDSA.prototype.makeSignature=function(t){return t instanceof Signature?t:new Signature(this,t)},EDDSA.prototype.encodePoint=function(t){var e=t.getY().toArray("le",this.encodingLength);return e[this.encodingLength-1]|=t.getX().isOdd()?128:0,e},EDDSA.prototype.decodePoint=function(t){var e=(t=utils.parseBytes(t)).length-1,i=t.slice(0,e).concat(-129&t[e]),r=0!=(128&t[e]),n=utils.intFromLE(i);return this.curve.pointFromY(n,r)},EDDSA.prototype.encodeInt=function(t){return t.toArray("le",this.encodingLength)},EDDSA.prototype.decodeInt=function(t){return utils.intFromLE(t)},EDDSA.prototype.isPoint=function(t){return t instanceof this.pointClass};

},{"../../elliptic":140,"./key":151,"./signature":152,"hash.js":159}],151:[function(require,module,exports){
"use strict";function KeyPair(e,t){this.eddsa=e,this._secret=parseBytes(t.secret),e.isPoint(t.pub)?this._pub=t.pub:this._pubBytes=parseBytes(t.pub)}var elliptic=require("../../elliptic"),utils=elliptic.utils,assert=utils.assert,parseBytes=utils.parseBytes,cachedProperty=utils.cachedProperty;KeyPair.fromPublic=function(e,t){return t instanceof KeyPair?t:new KeyPair(e,{pub:t})},KeyPair.fromSecret=function(e,t){return t instanceof KeyPair?t:new KeyPair(e,{secret:t})},KeyPair.prototype.secret=function(){return this._secret},cachedProperty(KeyPair,"pubBytes",function(){return this.eddsa.encodePoint(this.pub())}),cachedProperty(KeyPair,"pub",function(){return this._pubBytes?this.eddsa.decodePoint(this._pubBytes):this.eddsa.g.mul(this.priv())}),cachedProperty(KeyPair,"privBytes",function(){var e=this.eddsa,t=this.hash(),i=e.encodingLength-1,r=t.slice(0,e.encodingLength);return r[0]&=248,r[i]&=127,r[i]|=64,r}),cachedProperty(KeyPair,"priv",function(){return this.eddsa.decodeInt(this.privBytes())}),cachedProperty(KeyPair,"hash",function(){return this.eddsa.hash().update(this.secret()).digest()}),cachedProperty(KeyPair,"messagePrefix",function(){return this.hash().slice(this.eddsa.encodingLength)}),KeyPair.prototype.sign=function(e){return assert(this._secret,"KeyPair can only verify"),this.eddsa.sign(e,this)},KeyPair.prototype.verify=function(e,t){return this.eddsa.verify(e,t,this)},KeyPair.prototype.getSecret=function(e){return assert(this._secret,"KeyPair is public only"),utils.encode(this.secret(),e)},KeyPair.prototype.getPublic=function(e){return utils.encode(this.pubBytes(),e)},module.exports=KeyPair;

},{"../../elliptic":140}],152:[function(require,module,exports){
"use strict";function Signature(e,t){this.eddsa=e,"object"!=typeof t&&(t=parseBytes(t)),Array.isArray(t)&&(t={R:t.slice(0,e.encodingLength),S:t.slice(e.encodingLength)}),assert(t.R&&t.S,"Signature without R or S"),e.isPoint(t.R)&&(this._R=t.R),t.S instanceof BN&&(this._S=t.S),this._Rencoded=Array.isArray(t.R)?t.R:t.Rencoded,this._Sencoded=Array.isArray(t.S)?t.S:t.Sencoded}var BN=require("bn.js"),elliptic=require("../../elliptic"),utils=elliptic.utils,assert=utils.assert,cachedProperty=utils.cachedProperty,parseBytes=utils.parseBytes;cachedProperty(Signature,"S",function(){return this.eddsa.decodeInt(this.Sencoded())}),cachedProperty(Signature,"R",function(){return this.eddsa.decodePoint(this.Rencoded())}),cachedProperty(Signature,"Rencoded",function(){return this.eddsa.encodePoint(this.R())}),cachedProperty(Signature,"Sencoded",function(){return this.eddsa.encodeInt(this.S())}),Signature.prototype.toBytes=function(){return this.Rencoded().concat(this.Sencoded())},Signature.prototype.toHex=function(){return utils.encode(this.toBytes(),"hex").toUpperCase()},module.exports=Signature;

},{"../../elliptic":140,"bn.js":89}],153:[function(require,module,exports){
module.exports={doubles:{step:4,points:[["e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a","f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"],["8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508","11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"],["175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739","d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"],["363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640","4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"],["8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c","4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"],["723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda","96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"],["eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa","5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"],["100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0","cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"],["e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d","9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"],["feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d","e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"],["da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1","9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"],["53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0","5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"],["8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047","10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"],["385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862","283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"],["6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7","7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"],["3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd","56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"],["85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83","7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"],["948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a","53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"],["6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8","bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"],["e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d","4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"],["e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725","7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"],["213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754","4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"],["4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c","17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"],["fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6","6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"],["76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39","c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"],["c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891","893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"],["d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b","febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"],["b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03","2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"],["e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d","eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"],["a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070","7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"],["90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4","e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"],["8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da","662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"],["e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11","1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"],["8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e","efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"],["e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41","2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"],["b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef","67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"],["d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8","db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"],["324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d","648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"],["4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96","35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"],["9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd","ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"],["6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5","9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"],["a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266","40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"],["7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71","34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"],["928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac","c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"],["85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751","1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"],["ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e","493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"],["827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241","c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"],["eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3","be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"],["e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f","4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"],["1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19","aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"],["146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be","b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"],["fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9","6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"],["da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2","8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"],["a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13","7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"],["174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c","ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"],["959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba","2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"],["d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151","e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"],["64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073","d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"],["8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458","38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"],["13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b","69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"],["bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366","d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"],["8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa","40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"],["8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0","620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"],["dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787","7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"],["f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e","ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"]]},naf:{wnd:7,points:[["f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9","388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"],["2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4","d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"],["5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc","6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"],["acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe","cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"],["774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb","d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"],["f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8","ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"],["d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e","581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"],["defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34","4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"],["2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c","85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"],["352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5","321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"],["2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f","2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"],["9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714","73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"],["daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729","a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"],["c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db","2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"],["6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4","e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"],["1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5","b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"],["605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479","2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"],["62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d","80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"],["80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f","1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"],["7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb","d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"],["d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9","eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"],["49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963","758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"],["77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74","958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"],["f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530","e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"],["463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b","5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"],["f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247","cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"],["caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1","cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"],["2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120","4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"],["7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435","91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"],["754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18","673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"],["e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8","59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"],["186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb","3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"],["df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f","55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"],["5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143","efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"],["290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba","e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"],["af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45","f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"],["766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a","744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"],["59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e","c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"],["f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8","e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"],["7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c","30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"],["948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519","e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"],["7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab","100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"],["3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca","ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"],["d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf","8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"],["1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610","68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"],["733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4","f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"],["15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c","d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"],["a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940","edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"],["e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980","a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"],["311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3","66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"],["34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf","9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"],["f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63","4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"],["d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448","fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"],["32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf","5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"],["7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5","8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"],["ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6","8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"],["16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5","5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"],["eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99","f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"],["78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51","f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"],["494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5","42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"],["a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5","204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"],["c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997","4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"],["841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881","73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"],["5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5","39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"],["36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66","d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"],["336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726","ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"],["8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede","6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"],["1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94","60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"],["85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31","3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"],["29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51","b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"],["a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252","ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"],["4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5","cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"],["d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b","6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"],["ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4","322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"],["af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f","6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"],["e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889","2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"],["591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246","b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"],["11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984","998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"],["3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a","b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"],["cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030","bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"],["c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197","6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"],["c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593","c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"],["a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef","21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"],["347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38","60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"],["da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a","49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"],["c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111","5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"],["4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502","7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"],["3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea","be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"],["cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26","8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"],["b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986","39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"],["d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e","62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"],["48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4","25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"],["dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda","ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"],["6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859","cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"],["e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f","f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"],["eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c","6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"],["13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942","fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"],["ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a","1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"],["b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80","5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"],["ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d","438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"],["8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1","cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"],["52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63","c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"],["e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352","6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"],["7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193","ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"],["5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00","9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"],["32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58","ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"],["e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7","d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"],["8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8","c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"],["4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e","67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"],["3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d","cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"],["674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b","299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"],["d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f","f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"],["30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6","462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"],["be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297","62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"],["93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a","7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"],["b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c","ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"],["d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52","4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"],["d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb","bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"],["463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065","bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"],["7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917","603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"],["74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9","cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"],["30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3","553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"],["9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57","712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"],["176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66","ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"],["75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8","9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"],["809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721","9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"],["1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180","4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"]]}};

},{}],154:[function(require,module,exports){
"use strict";function getNAF(t,r){for(var i=[],e=1<<r+1,n=t.clone();n.cmpn(1)>=0;){var s;if(n.isOdd()){var u=n.andln(e-1);s=u>(e>>1)-1?(e>>1)-u:u,n.isubn(s)}else s=0;i.push(s);for(var l=0!==n.cmpn(0)&&0===n.andln(e-1)?r+1:1,o=1;o<l;o++)i.push(0);n.iushrn(l)}return i}function getJSF(t,r){var i=[[],[]];t=t.clone(),r=r.clone();for(var e=0,n=0;t.cmpn(-e)>0||r.cmpn(-n)>0;){var s=t.andln(3)+e&3,u=r.andln(3)+n&3;3===s&&(s=-1),3===u&&(u=-1);var l;if(0==(1&s))l=0;else{l=3!==(a=t.andln(7)+e&7)&&5!==a||2!==u?s:-s}i[0].push(l);var o;if(0==(1&u))o=0;else{var a=r.andln(7)+n&7;o=3!==a&&5!==a||2!==s?u:-u}i[1].push(o),2*e===l+1&&(e=1-e),2*n===o+1&&(n=1-n),t.iushrn(1),r.iushrn(1)}return i}function cachedProperty(t,r,i){var e="_"+r;t.prototype[r]=function(){return void 0!==this[e]?this[e]:this[e]=i.call(this)}}function parseBytes(t){return"string"==typeof t?utils.toArray(t,"hex"):t}function intFromLE(t){return new BN(t,"hex","le")}var utils=exports,BN=require("bn.js"),minAssert=require("minimalistic-assert"),minUtils=require("minimalistic-crypto-utils");utils.assert=minAssert,utils.toArray=minUtils.toArray,utils.zero2=minUtils.zero2,utils.toHex=minUtils.toHex,utils.encode=minUtils.encode,utils.getNAF=getNAF,utils.getJSF=getJSF,utils.cachedProperty=cachedProperty,utils.parseBytes=parseBytes,utils.intFromLE=intFromLE;

},{"bn.js":89,"minimalistic-assert":180,"minimalistic-crypto-utils":181}],155:[function(require,module,exports){
module.exports={
  "_from": "elliptic@^6.0.0",
  "_id": "elliptic@6.4.0",
  "_inBundle": false,
  "_integrity": "sha1-ysmvh2LIWDYYcAPI3+GT5eLq5d8=",
  "_location": "/browserify/elliptic",
  "_phantomChildren": {},
  "_requested": {
    "type": "range",
    "registry": true,
    "raw": "elliptic@^6.0.0",
    "name": "elliptic",
    "escapedName": "elliptic",
    "rawSpec": "^6.0.0",
    "saveSpec": null,
    "fetchSpec": "^6.0.0"
  },
  "_requiredBy": [
    "/browserify/browserify-sign",
    "/browserify/create-ecdh"
  ],
  "_resolved": "http://registry.npm.taobao.org/elliptic/download/elliptic-6.4.0.tgz",
  "_shasum": "cac9af8762c85836187003c8dfe193e5e2eae5df",
  "_spec": "elliptic@^6.0.0",
  "_where": "/usr/local/lib/node_modules/browserify/node_modules/browserify-sign",
  "author": {
    "name": "Fedor Indutny",
    "email": "fedor@indutny.com"
  },
  "bugs": {
    "url": "https://github.com/indutny/elliptic/issues"
  },
  "bundleDependencies": false,
  "dependencies": {
    "bn.js": "^4.4.0",
    "brorand": "^1.0.1",
    "hash.js": "^1.0.0",
    "hmac-drbg": "^1.0.0",
    "inherits": "^2.0.1",
    "minimalistic-assert": "^1.0.0",
    "minimalistic-crypto-utils": "^1.0.0"
  },
  "deprecated": false,
  "description": "EC cryptography",
  "devDependencies": {
    "brfs": "^1.4.3",
    "coveralls": "^2.11.3",
    "grunt": "^0.4.5",
    "grunt-browserify": "^5.0.0",
    "grunt-cli": "^1.2.0",
    "grunt-contrib-connect": "^1.0.0",
    "grunt-contrib-copy": "^1.0.0",
    "grunt-contrib-uglify": "^1.0.1",
    "grunt-mocha-istanbul": "^3.0.1",
    "grunt-saucelabs": "^8.6.2",
    "istanbul": "^0.4.2",
    "jscs": "^2.9.0",
    "jshint": "^2.6.0",
    "mocha": "^2.1.0"
  },
  "files": [
    "lib"
  ],
  "homepage": "https://github.com/indutny/elliptic",
  "keywords": [
    "EC",
    "Elliptic",
    "curve",
    "Cryptography"
  ],
  "license": "MIT",
  "main": "lib/elliptic.js",
  "name": "elliptic",
  "repository": {
    "type": "git",
    "url": "git+ssh://git@github.com/indutny/elliptic.git"
  },
  "scripts": {
    "jscs": "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",
    "jshint": "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",
    "lint": "npm run jscs && npm run jshint",
    "test": "npm run lint && npm run unit",
    "unit": "istanbul test _mocha --reporter=spec test/index.js",
    "version": "grunt dist && git add dist/"
  },
  "version": "6.4.0"
}

},{}],156:[function(require,module,exports){
function EventEmitter(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function isFunction(e){return"function"==typeof e}function isNumber(e){return"number"==typeof e}function isObject(e){return"object"==typeof e&&null!==e}function isUndefined(e){return void 0===e}module.exports=EventEmitter,EventEmitter.EventEmitter=EventEmitter,EventEmitter.prototype._events=void 0,EventEmitter.prototype._maxListeners=void 0,EventEmitter.defaultMaxListeners=10,EventEmitter.prototype.setMaxListeners=function(e){if(!isNumber(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},EventEmitter.prototype.emit=function(e){var t,i,n,s,r,o;if(this._events||(this._events={}),"error"===e&&(!this._events.error||isObject(this._events.error)&&!this._events.error.length)){if((t=arguments[1])instanceof Error)throw t;var h=new Error('Uncaught, unspecified "error" event. ('+t+")");throw h.context=t,h}if(i=this._events[e],isUndefined(i))return!1;if(isFunction(i))switch(arguments.length){case 1:i.call(this);break;case 2:i.call(this,arguments[1]);break;case 3:i.call(this,arguments[1],arguments[2]);break;default:s=Array.prototype.slice.call(arguments,1),i.apply(this,s)}else if(isObject(i))for(s=Array.prototype.slice.call(arguments,1),n=(o=i.slice()).length,r=0;r<n;r++)o[r].apply(this,s);return!0},EventEmitter.prototype.addListener=function(e,t){var i;if(!isFunction(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,isFunction(t.listener)?t.listener:t),this._events[e]?isObject(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,isObject(this._events[e])&&!this._events[e].warned&&(i=isUndefined(this._maxListeners)?EventEmitter.defaultMaxListeners:this._maxListeners)&&i>0&&this._events[e].length>i&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace()),this},EventEmitter.prototype.on=EventEmitter.prototype.addListener,EventEmitter.prototype.once=function(e,t){function i(){this.removeListener(e,i),n||(n=!0,t.apply(this,arguments))}if(!isFunction(t))throw TypeError("listener must be a function");var n=!1;return i.listener=t,this.on(e,i),this},EventEmitter.prototype.removeListener=function(e,t){var i,n,s,r;if(!isFunction(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(i=this._events[e],s=i.length,n=-1,i===t||isFunction(i.listener)&&i.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(isObject(i)){for(r=s;r-- >0;)if(i[r]===t||i[r].listener&&i[r].listener===t){n=r;break}if(n<0)return this;1===i.length?(i.length=0,delete this._events[e]):i.splice(n,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},EventEmitter.prototype.removeAllListeners=function(e){var t,i;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(i=this._events[e],isFunction(i))this.removeListener(e,i);else if(i)for(;i.length;)this.removeListener(e,i[i.length-1]);return delete this._events[e],this},EventEmitter.prototype.listeners=function(e){return this._events&&this._events[e]?isFunction(this._events[e])?[this._events[e]]:this._events[e].slice():[]},EventEmitter.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(isFunction(t))return 1;if(t)return t.length}return 0},EventEmitter.listenerCount=function(e,t){return e.listenerCount(t)};

},{}],157:[function(require,module,exports){
function EVP_BytesToKey(e,f,r,t){if(Buffer.isBuffer(e)||(e=Buffer.from(e,"binary")),f&&(Buffer.isBuffer(f)||(f=Buffer.from(f,"binary")),8!==f.length))throw new RangeError("salt should be Buffer with 8 byte length");for(var u=r/8,a=Buffer.alloc(u),l=Buffer.alloc(t||0),n=Buffer.alloc(0);u>0||t>0;){var i=new MD5;i.update(n),i.update(e),f&&i.update(f),n=i.digest();var o=0;if(u>0){var B=a.length-u;o=Math.min(u,n.length),n.copy(a,B,0,o),u-=o}if(o<n.length&&t>0){var h=l.length-t,s=Math.min(t,n.length-o);n.copy(l,h,o,o+s),t-=s}}return n.fill(0),{key:a,iv:l}}var Buffer=require("safe-buffer").Buffer,MD5=require("md5.js");module.exports=EVP_BytesToKey;

},{"md5.js":177,"safe-buffer":216}],158:[function(require,module,exports){
(function (Buffer){
"use strict";function HashBase(t){Transform.call(this),this._block=new Buffer(t),this._blockSize=t,this._blockOffset=0,this._length=[0,0,0,0],this._finalized=!1}var Transform=require("stream").Transform,inherits=require("inherits");inherits(HashBase,Transform),HashBase.prototype._transform=function(t,e,r){var s=null;try{"buffer"!==e&&(t=new Buffer(t,e)),this.update(t)}catch(t){s=t}r(s)},HashBase.prototype._flush=function(t){var e=null;try{this.push(this._digest())}catch(t){e=t}t(e)},HashBase.prototype.update=function(t,e){if(!Buffer.isBuffer(t)&&"string"!=typeof t)throw new TypeError("Data must be a string or a buffer");if(this._finalized)throw new Error("Digest already called");Buffer.isBuffer(t)||(t=new Buffer(t,e||"binary"));for(var r=this._block,s=0;this._blockOffset+t.length-s>=this._blockSize;){for(var i=this._blockOffset;i<this._blockSize;)r[i++]=t[s++];this._update(),this._blockOffset=0}for(;s<t.length;)r[this._blockOffset++]=t[s++];for(var o=0,a=8*t.length;a>0;++o)this._length[o]+=a,(a=this._length[o]/4294967296|0)>0&&(this._length[o]-=4294967296*a);return this},HashBase.prototype._update=function(t){throw new Error("_update is not implemented")},HashBase.prototype.digest=function(t){if(this._finalized)throw new Error("Digest already called");this._finalized=!0;var e=this._digest();return void 0!==t&&(e=e.toString(t)),e},HashBase.prototype._digest=function(){throw new Error("_digest is not implemented")},module.exports=HashBase;

}).call(this,require("buffer").Buffer)
},{"buffer":120,"inherits":174,"stream":225}],159:[function(require,module,exports){
var hash=exports;hash.utils=require("./hash/utils"),hash.common=require("./hash/common"),hash.sha=require("./hash/sha"),hash.ripemd=require("./hash/ripemd"),hash.hmac=require("./hash/hmac"),hash.sha1=hash.sha.sha1,hash.sha256=hash.sha.sha256,hash.sha224=hash.sha.sha224,hash.sha384=hash.sha.sha384,hash.sha512=hash.sha.sha512,hash.ripemd160=hash.ripemd.ripemd160;

},{"./hash/common":160,"./hash/hmac":161,"./hash/ripemd":162,"./hash/sha":163,"./hash/utils":170}],160:[function(require,module,exports){
"use strict";function BlockHash(){this.pending=null,this.pendingTotal=0,this.blockSize=this.constructor.blockSize,this.outSize=this.constructor.outSize,this.hmacStrength=this.constructor.hmacStrength,this.padLength=this.constructor.padLength/8,this.endian="big",this._delta8=this.blockSize/8,this._delta32=this.blockSize/32}var utils=require("./utils"),assert=require("minimalistic-assert");exports.BlockHash=BlockHash,BlockHash.prototype.update=function(t,i){if(t=utils.toArray(t,i),this.pending?this.pending=this.pending.concat(t):this.pending=t,this.pendingTotal+=t.length,this.pending.length>=this._delta8){var n=(t=this.pending).length%this._delta8;this.pending=t.slice(t.length-n,t.length),0===this.pending.length&&(this.pending=null),t=utils.join32(t,0,t.length-n,this.endian);for(var s=0;s<t.length;s+=this._delta32)this._update(t,s,s+this._delta32)}return this},BlockHash.prototype.digest=function(t){return this.update(this._pad()),assert(null===this.pending),this._digest(t)},BlockHash.prototype._pad=function(){var t=this.pendingTotal,i=this._delta8,n=i-(t+this.padLength)%i,s=new Array(n+this.padLength);s[0]=128;for(var e=1;e<n;e++)s[e]=0;if(t<<=3,"big"===this.endian){for(var h=8;h<this.padLength;h++)s[e++]=0;s[e++]=0,s[e++]=0,s[e++]=0,s[e++]=0,s[e++]=t>>>24&255,s[e++]=t>>>16&255,s[e++]=t>>>8&255,s[e++]=255&t}else for(s[e++]=255&t,s[e++]=t>>>8&255,s[e++]=t>>>16&255,s[e++]=t>>>24&255,s[e++]=0,s[e++]=0,s[e++]=0,s[e++]=0,h=8;h<this.padLength;h++)s[e++]=0;return s};

},{"./utils":170,"minimalistic-assert":180}],161:[function(require,module,exports){
"use strict";function Hmac(t,i,e){if(!(this instanceof Hmac))return new Hmac(t,i,e);this.Hash=t,this.blockSize=t.blockSize/8,this.outSize=t.outSize/8,this.inner=null,this.outer=null,this._init(utils.toArray(i,e))}var utils=require("./utils"),assert=require("minimalistic-assert");module.exports=Hmac,Hmac.prototype._init=function(t){t.length>this.blockSize&&(t=(new this.Hash).update(t).digest()),assert(t.length<=this.blockSize);for(var i=t.length;i<this.blockSize;i++)t.push(0);for(i=0;i<t.length;i++)t[i]^=54;for(this.inner=(new this.Hash).update(t),i=0;i<t.length;i++)t[i]^=106;this.outer=(new this.Hash).update(t)},Hmac.prototype.update=function(t,i){return this.inner.update(t,i),this},Hmac.prototype.digest=function(t){return this.outer.update(this.inner.digest()),this.outer.digest(t)};

},{"./utils":170,"minimalistic-assert":180}],162:[function(require,module,exports){
"use strict";function RIPEMD160(){if(!(this instanceof RIPEMD160))return new RIPEMD160;BlockHash.call(this),this.h=[1732584193,4023233417,2562383102,271733878,3285377520],this.endian="little"}function f(t,s,h,i){return t<=15?s^h^i:t<=31?s&h|~s&i:t<=47?(s|~h)^i:t<=63?s&i|h&~i:s^(h|~i)}function K(t){return t<=15?0:t<=31?1518500249:t<=47?1859775393:t<=63?2400959708:2840853838}function Kh(t){return t<=15?1352829926:t<=31?1548603684:t<=47?1836072691:t<=63?2053994217:0}var utils=require("./utils"),common=require("./common"),rotl32=utils.rotl32,sum32=utils.sum32,sum32_3=utils.sum32_3,sum32_4=utils.sum32_4,BlockHash=common.BlockHash;utils.inherits(RIPEMD160,BlockHash),exports.ripemd160=RIPEMD160,RIPEMD160.blockSize=512,RIPEMD160.outSize=160,RIPEMD160.hmacStrength=192,RIPEMD160.padLength=64,RIPEMD160.prototype._update=function(t,h){for(var i=this.h[0],u=this.h[1],o=this.h[2],e=this.h[3],l=this.h[4],n=i,m=u,c=o,a=e,_=l,D=0;D<80;D++){var E=sum32(rotl32(sum32_4(i,f(D,u,o,e),t[r[D]+h],K(D)),s[D]),l);i=l,l=e,e=rotl32(o,10),o=u,u=E,E=sum32(rotl32(sum32_4(n,f(79-D,m,c,a),t[rh[D]+h],Kh(D)),sh[D]),_),n=_,_=a,a=rotl32(c,10),c=m,m=E}E=sum32_3(this.h[1],o,a),this.h[1]=sum32_3(this.h[2],e,_),this.h[2]=sum32_3(this.h[3],l,n),this.h[3]=sum32_3(this.h[4],i,m),this.h[4]=sum32_3(this.h[0],u,c),this.h[0]=E},RIPEMD160.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h,"little"):utils.split32(this.h,"little")};var r=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13],rh=[5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11],s=[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6],sh=[8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11];

},{"./common":160,"./utils":170}],163:[function(require,module,exports){
"use strict";exports.sha1=require("./sha/1"),exports.sha224=require("./sha/224"),exports.sha256=require("./sha/256"),exports.sha384=require("./sha/384"),exports.sha512=require("./sha/512");

},{"./sha/1":164,"./sha/224":165,"./sha/256":166,"./sha/384":167,"./sha/512":168}],164:[function(require,module,exports){
"use strict";function SHA1(){if(!(this instanceof SHA1))return new SHA1;BlockHash.call(this),this.h=[1732584193,4023233417,2562383102,271733878,3285377520],this.W=new Array(80)}var utils=require("../utils"),common=require("../common"),shaCommon=require("./common"),rotl32=utils.rotl32,sum32=utils.sum32,sum32_5=utils.sum32_5,ft_1=shaCommon.ft_1,BlockHash=common.BlockHash,sha1_K=[1518500249,1859775393,2400959708,3395469782];utils.inherits(SHA1,BlockHash),module.exports=SHA1,SHA1.blockSize=512,SHA1.outSize=160,SHA1.hmacStrength=80,SHA1.padLength=64,SHA1.prototype._update=function(t,h){for(var s=this.W,i=0;i<16;i++)s[i]=t[h+i];for(;i<s.length;i++)s[i]=rotl32(s[i-3]^s[i-8]^s[i-14]^s[i-16],1);var o=this.h[0],r=this.h[1],u=this.h[2],e=this.h[3],l=this.h[4];for(i=0;i<s.length;i++){var m=~~(i/20),n=sum32_5(rotl32(o,5),ft_1(m,r,u,e),l,s[i],sha1_K[m]);l=e,e=u,u=rotl32(r,30),r=o,o=n}this.h[0]=sum32(this.h[0],o),this.h[1]=sum32(this.h[1],r),this.h[2]=sum32(this.h[2],u),this.h[3]=sum32(this.h[3],e),this.h[4]=sum32(this.h[4],l)},SHA1.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h,"big"):utils.split32(this.h,"big")};

},{"../common":160,"../utils":170,"./common":169}],165:[function(require,module,exports){
"use strict";function SHA224(){if(!(this instanceof SHA224))return new SHA224;SHA256.call(this),this.h=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428]}var utils=require("../utils"),SHA256=require("./256");utils.inherits(SHA224,SHA256),module.exports=SHA224,SHA224.blockSize=512,SHA224.outSize=224,SHA224.hmacStrength=192,SHA224.padLength=64,SHA224.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h.slice(0,7),"big"):utils.split32(this.h.slice(0,7),"big")};

},{"md5.js":177,"safe-buffer":215}],158:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"buffer":120,"dup":26,"inherits":174,"stream":224}],159:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"./hash/common":160,"./hash/hmac":161,"./hash/ripemd":162,"./hash/sha":163,"./hash/utils":170,"dup":27}],160:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"./utils":170,"dup":28,"minimalistic-assert":180}],161:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"./utils":170,"dup":29,"minimalistic-assert":180}],162:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"./common":160,"./utils":170,"dup":30}],163:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"./sha/1":164,"./sha/224":165,"./sha/256":166,"./sha/384":167,"./sha/512":168,"dup":31}],164:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"../common":160,"../utils":170,"./common":169,"dup":32}],165:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"../utils":170,"./256":166,"dup":33}],166:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"../common":160,"../utils":170,"./common":169,"dup":34,"minimalistic-assert":180}],167:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"../utils":170,"./512":168,"dup":35}],168:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"../common":160,"../utils":170,"dup":36,"minimalistic-assert":180}],169:[function(require,module,exports){
arguments[4][37][0].apply(exports,arguments)
},{"../utils":170,"dup":37}],170:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"dup":38,"inherits":174,"minimalistic-assert":180}],171:[function(require,module,exports){
arguments[4][39][0].apply(exports,arguments)
},{"dup":39,"hash.js":159,"minimalistic-assert":180,"minimalistic-crypto-utils":181}],172:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

},{"../common":160,"../utils":170,"./common":169,"minimalistic-assert":180}],167:[function(require,module,exports){
"use strict";function SHA384(){if(!(this instanceof SHA384))return new SHA384;SHA512.call(this),this.h=[3418070365,3238371032,1654270250,914150663,2438529370,812702999,355462360,4144912697,1731405415,4290775857,2394180231,1750603025,3675008525,1694076839,1203062813,3204075428]}var utils=require("../utils"),SHA512=require("./512");utils.inherits(SHA384,SHA512),module.exports=SHA384,SHA384.blockSize=1024,SHA384.outSize=384,SHA384.hmacStrength=192,SHA384.padLength=128,SHA384.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h.slice(0,12),"big"):utils.split32(this.h.slice(0,12),"big")};

},{"../utils":170,"./512":168}],168:[function(require,module,exports){
"use strict";function SHA512(){if(!(this instanceof SHA512))return new SHA512;BlockHash.call(this),this.h=[1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209],this.k=sha512_K,this.W=new Array(160)}function ch64_hi(t,h,r,i,s){var _=t&r^~t&s;return _<0&&(_+=4294967296),_}function ch64_lo(t,h,r,i,s,_){var o=h&i^~h&_;return o<0&&(o+=4294967296),o}function maj64_hi(t,h,r,i,s){var _=t&r^t&s^r&s;return _<0&&(_+=4294967296),_}function maj64_lo(t,h,r,i,s,_){var o=h&i^h&_^i&_;return o<0&&(o+=4294967296),o}function s0_512_hi(t,h){var r=rotr64_hi(t,h,28)^rotr64_hi(h,t,2)^rotr64_hi(h,t,7);return r<0&&(r+=4294967296),r}function s0_512_lo(t,h){var r=rotr64_lo(t,h,28)^rotr64_lo(h,t,2)^rotr64_lo(h,t,7);return r<0&&(r+=4294967296),r}function s1_512_hi(t,h){var r=rotr64_hi(t,h,14)^rotr64_hi(t,h,18)^rotr64_hi(h,t,9);return r<0&&(r+=4294967296),r}function s1_512_lo(t,h){var r=rotr64_lo(t,h,14)^rotr64_lo(t,h,18)^rotr64_lo(h,t,9);return r<0&&(r+=4294967296),r}function g0_512_hi(t,h){var r=rotr64_hi(t,h,1)^rotr64_hi(t,h,8)^shr64_hi(t,h,7);return r<0&&(r+=4294967296),r}function g0_512_lo(t,h){var r=rotr64_lo(t,h,1)^rotr64_lo(t,h,8)^shr64_lo(t,h,7);return r<0&&(r+=4294967296),r}function g1_512_hi(t,h){var r=rotr64_hi(t,h,19)^rotr64_hi(h,t,29)^shr64_hi(t,h,6);return r<0&&(r+=4294967296),r}function g1_512_lo(t,h){var r=rotr64_lo(t,h,19)^rotr64_lo(h,t,29)^shr64_lo(t,h,6);return r<0&&(r+=4294967296),r}var utils=require("../utils"),common=require("../common"),assert=require("minimalistic-assert"),rotr64_hi=utils.rotr64_hi,rotr64_lo=utils.rotr64_lo,shr64_hi=utils.shr64_hi,shr64_lo=utils.shr64_lo,sum64=utils.sum64,sum64_hi=utils.sum64_hi,sum64_lo=utils.sum64_lo,sum64_4_hi=utils.sum64_4_hi,sum64_4_lo=utils.sum64_4_lo,sum64_5_hi=utils.sum64_5_hi,sum64_5_lo=utils.sum64_5_lo,BlockHash=common.BlockHash,sha512_K=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];utils.inherits(SHA512,BlockHash),module.exports=SHA512,SHA512.blockSize=1024,SHA512.outSize=512,SHA512.hmacStrength=192,SHA512.padLength=128,SHA512.prototype._prepareBlock=function(t,h){for(var r=this.W,i=0;i<32;i++)r[i]=t[h+i];for(;i<r.length;i+=2){var s=g1_512_hi(r[i-4],r[i-3]),_=g1_512_lo(r[i-4],r[i-3]),o=r[i-14],u=r[i-13],l=g0_512_hi(r[i-30],r[i-29]),n=g0_512_lo(r[i-30],r[i-29]),e=r[i-32],m=r[i-31];r[i]=sum64_4_hi(s,_,o,u,l,n,e,m),r[i+1]=sum64_4_lo(s,_,o,u,l,n,e,m)}},SHA512.prototype._update=function(t,h){this._prepareBlock(t,h);var r=this.W,i=this.h[0],s=this.h[1],_=this.h[2],o=this.h[3],u=this.h[4],l=this.h[5],n=this.h[6],e=this.h[7],m=this.h[8],a=this.h[9],c=this.h[10],f=this.h[11],v=this.h[12],g=this.h[13],H=this.h[14],S=this.h[15];assert(this.k.length===r.length);for(var p=0;p<r.length;p+=2){var A=H,k=S,B=s1_512_hi(m,a),d=s1_512_lo(m,a),j=ch64_hi(m,a,c,f,v,g),y=ch64_lo(m,a,c,f,v,g),b=this.k[p],q=this.k[p+1],x=r[p],W=r[p+1],w=sum64_5_hi(A,k,B,d,j,y,b,q,x,W),z=sum64_5_lo(A,k,B,d,j,y,b,q,x,W);A=s0_512_hi(i,s),k=s0_512_lo(i,s),B=maj64_hi(i,s,_,o,u,l),d=maj64_lo(i,s,_,o,u,l);var K=sum64_hi(A,k,B,d),L=sum64_lo(A,k,B,d);H=v,S=g,v=c,g=f,c=m,f=a,m=sum64_hi(n,e,w,z),a=sum64_lo(e,e,w,z),n=u,e=l,u=_,l=o,_=i,o=s,i=sum64_hi(w,z,K,L),s=sum64_lo(w,z,K,L)}sum64(this.h,0,i,s),sum64(this.h,2,_,o),sum64(this.h,4,u,l),sum64(this.h,6,n,e),sum64(this.h,8,m,a),sum64(this.h,10,c,f),sum64(this.h,12,v,g),sum64(this.h,14,H,S)},SHA512.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h,"big"):utils.split32(this.h,"big")};

},{"../common":160,"../utils":170,"minimalistic-assert":180}],169:[function(require,module,exports){
"use strict";function ft_1(r,t,o,n){return 0===r?ch32(t,o,n):1===r||3===r?p32(t,o,n):2===r?maj32(t,o,n):void 0}function ch32(r,t,o){return r&t^~r&o}function maj32(r,t,o){return r&t^r&o^t&o}function p32(r,t,o){return r^t^o}function s0_256(r){return rotr32(r,2)^rotr32(r,13)^rotr32(r,22)}function s1_256(r){return rotr32(r,6)^rotr32(r,11)^rotr32(r,25)}function g0_256(r){return rotr32(r,7)^rotr32(r,18)^r>>>3}function g1_256(r){return rotr32(r,17)^rotr32(r,19)^r>>>10}var utils=require("../utils"),rotr32=utils.rotr32;exports.ft_1=ft_1,exports.ch32=ch32,exports.maj32=maj32,exports.p32=p32,exports.s0_256=s0_256,exports.s1_256=s1_256,exports.g0_256=g0_256,exports.g1_256=g1_256;

},{"../utils":170}],170:[function(require,module,exports){
"use strict";function toArray(r,t){if(Array.isArray(r))return r.slice();if(!r)return[];var o=[];if("string"==typeof r)if(t){if("hex"===t)for((r=r.replace(/[^a-z0-9]+/gi,"")).length%2!=0&&(r="0"+r),n=0;n<r.length;n+=2)o.push(parseInt(r[n]+r[n+1],16))}else for(var n=0;n<r.length;n++){var e=r.charCodeAt(n),s=e>>8,u=255&e;s?o.push(s,u):o.push(u)}else for(n=0;n<r.length;n++)o[n]=0|r[n];return o}function toHex(r){for(var t="",o=0;o<r.length;o++)t+=zero2(r[o].toString(16));return t}function htonl(r){return(r>>>24|r>>>8&65280|r<<8&16711680|(255&r)<<24)>>>0}function toHex32(r,t){for(var o="",n=0;n<r.length;n++){var e=r[n];"little"===t&&(e=htonl(e)),o+=zero8(e.toString(16))}return o}function zero2(r){return 1===r.length?"0"+r:r}function zero8(r){return 7===r.length?"0"+r:6===r.length?"00"+r:5===r.length?"000"+r:4===r.length?"0000"+r:3===r.length?"00000"+r:2===r.length?"000000"+r:1===r.length?"0000000"+r:r}function join32(r,t,o,n){var e=o-t;assert(e%4==0);for(var s=new Array(e/4),u=0,i=t;u<s.length;u++,i+=4){var h;h="big"===n?r[i]<<24|r[i+1]<<16|r[i+2]<<8|r[i+3]:r[i+3]<<24|r[i+2]<<16|r[i+1]<<8|r[i],s[u]=h>>>0}return s}function split32(r,t){for(var o=new Array(4*r.length),n=0,e=0;n<r.length;n++,e+=4){var s=r[n];"big"===t?(o[e]=s>>>24,o[e+1]=s>>>16&255,o[e+2]=s>>>8&255,o[e+3]=255&s):(o[e+3]=s>>>24,o[e+2]=s>>>16&255,o[e+1]=s>>>8&255,o[e]=255&s)}return o}function rotr32(r,t){return r>>>t|r<<32-t}function rotl32(r,t){return r<<t|r>>>32-t}function sum32(r,t){return r+t>>>0}function sum32_3(r,t,o){return r+t+o>>>0}function sum32_4(r,t,o,n){return r+t+o+n>>>0}function sum32_5(r,t,o,n,e){return r+t+o+n+e>>>0}function sum64(r,t,o,n){var e=r[t],s=n+r[t+1]>>>0,u=(s<n?1:0)+o+e;r[t]=u>>>0,r[t+1]=s}function sum64_hi(r,t,o,n){return(t+n>>>0<t?1:0)+r+o>>>0}function sum64_lo(r,t,o,n){return t+n>>>0}function sum64_4_hi(r,t,o,n,e,s,u,i){var h=0,_=t;h+=(_=_+n>>>0)<t?1:0,h+=(_=_+s>>>0)<s?1:0;return r+o+e+u+(h+=(_=_+i>>>0)<i?1:0)>>>0}function sum64_4_lo(r,t,o,n,e,s,u,i){return t+n+s+i>>>0}function sum64_5_hi(r,t,o,n,e,s,u,i,h,_){var l=0,f=t;l+=(f=f+n>>>0)<t?1:0,l+=(f=f+s>>>0)<s?1:0,l+=(f=f+i>>>0)<i?1:0;return r+o+e+u+h+(l+=(f=f+_>>>0)<_?1:0)>>>0}function sum64_5_lo(r,t,o,n,e,s,u,i,h,_){return t+n+s+i+_>>>0}function rotr64_hi(r,t,o){return(t<<32-o|r>>>o)>>>0}function rotr64_lo(r,t,o){return(r<<32-o|t>>>o)>>>0}function shr64_hi(r,t,o){return r>>>o}function shr64_lo(r,t,o){return(r<<32-o|t>>>o)>>>0}var assert=require("minimalistic-assert"),inherits=require("inherits");exports.inherits=inherits,exports.toArray=toArray,exports.toHex=toHex,exports.htonl=htonl,exports.toHex32=toHex32,exports.zero2=zero2,exports.zero8=zero8,exports.join32=join32,exports.split32=split32,exports.rotr32=rotr32,exports.rotl32=rotl32,exports.sum32=sum32,exports.sum32_3=sum32_3,exports.sum32_4=sum32_4,exports.sum32_5=sum32_5,exports.sum64=sum64,exports.sum64_hi=sum64_hi,exports.sum64_lo=sum64_lo,exports.sum64_4_hi=sum64_4_hi,exports.sum64_4_lo=sum64_4_lo,exports.sum64_5_hi=sum64_5_hi,exports.sum64_5_lo=sum64_5_lo,exports.rotr64_hi=rotr64_hi,exports.rotr64_lo=rotr64_lo,exports.shr64_hi=shr64_hi,exports.shr64_lo=shr64_lo;

},{"inherits":174,"minimalistic-assert":180}],171:[function(require,module,exports){
"use strict";function HmacDRBG(t){if(!(this instanceof HmacDRBG))return new HmacDRBG(t);this.hash=t.hash,this.predResist=!!t.predResist,this.outLen=this.hash.outSize,this.minEntropy=t.minEntropy||this.hash.hmacStrength,this._reseed=null,this.reseedInterval=null,this.K=null,this.V=null;var e=utils.toArray(t.entropy,t.entropyEnc||"hex"),i=utils.toArray(t.nonce,t.nonceEnc||"hex"),s=utils.toArray(t.pers,t.persEnc||"hex");assert(e.length>=this.minEntropy/8,"Not enough entropy. Minimum is: "+this.minEntropy+" bits"),this._init(e,i,s)}var hash=require("hash.js"),utils=require("minimalistic-crypto-utils"),assert=require("minimalistic-assert");module.exports=HmacDRBG,HmacDRBG.prototype._init=function(t,e,i){var s=t.concat(e).concat(i);this.K=new Array(this.outLen/8),this.V=new Array(this.outLen/8);for(var h=0;h<this.V.length;h++)this.K[h]=0,this.V[h]=1;this._update(s),this._reseed=1,this.reseedInterval=281474976710656},HmacDRBG.prototype._hmac=function(){return new hash.hmac(this.hash,this.K)},HmacDRBG.prototype._update=function(t){var e=this._hmac().update(this.V).update([0]);t&&(e=e.update(t)),this.K=e.digest(),this.V=this._hmac().update(this.V).digest(),t&&(this.K=this._hmac().update(this.V).update([1]).update(t).digest(),this.V=this._hmac().update(this.V).digest())},HmacDRBG.prototype.reseed=function(t,e,i,s){"string"!=typeof e&&(s=i,i=e,e=null),t=utils.toArray(t,e),i=utils.toArray(i,s),assert(t.length>=this.minEntropy/8,"Not enough entropy. Minimum is: "+this.minEntropy+" bits"),this._update(t.concat(i||[])),this._reseed=1},HmacDRBG.prototype.generate=function(t,e,i,s){if(this._reseed>this.reseedInterval)throw new Error("Reseed is required");"string"!=typeof e&&(s=i,i=e,e=null),i&&(i=utils.toArray(i,s||"hex"),this._update(i));for(var h=[];h.length<t;)this.V=this._hmac().update(this.V).digest(),h=h.concat(this.V);var r=h.slice(0,t);return this._update(i),this._reseed++,utils.encode(r,e)};

},{"hash.js":159,"minimalistic-assert":180,"minimalistic-crypto-utils":181}],172:[function(require,module,exports){
exports.read=function(a,o,t,r,h){var M,p,w=8*h-r-1,f=(1<<w)-1,e=f>>1,i=-7,N=t?h-1:0,n=t?-1:1,s=a[o+N];for(N+=n,M=s&(1<<-i)-1,s>>=-i,i+=w;i>0;M=256*M+a[o+N],N+=n,i-=8);for(p=M&(1<<-i)-1,M>>=-i,i+=r;i>0;p=256*p+a[o+N],N+=n,i-=8);if(0===M)M=1-e;else{if(M===f)return p?NaN:1/0*(s?-1:1);p+=Math.pow(2,r),M-=e}return(s?-1:1)*p*Math.pow(2,M-r)},exports.write=function(a,o,t,r,h,M){var p,w,f,e=8*M-h-1,i=(1<<e)-1,N=i>>1,n=23===h?Math.pow(2,-24)-Math.pow(2,-77):0,s=r?0:M-1,u=r?1:-1,l=o<0||0===o&&1/o<0?1:0;for(o=Math.abs(o),isNaN(o)||o===1/0?(w=isNaN(o)?1:0,p=i):(p=Math.floor(Math.log(o)/Math.LN2),o*(f=Math.pow(2,-p))<1&&(p--,f*=2),(o+=p+N>=1?n/f:n*Math.pow(2,1-N))*f>=2&&(p++,f/=2),p+N>=i?(w=0,p=i):p+N>=1?(w=(o*f-1)*Math.pow(2,h),p+=N):(w=o*Math.pow(2,N-1)*Math.pow(2,h),p=0));h>=8;a[t+s]=255&w,s+=u,w/=256,h-=8);for(p=p<<h|w,e+=h;e>0;a[t+s]=255&p,s+=u,p/=256,e-=8);a[t+s-u]|=128*l};

},{}],173:[function(require,module,exports){
var indexOf=[].indexOf;module.exports=function(e,n){if(indexOf)return e.indexOf(n);for(var r=0;r<e.length;++r)if(e[r]===n)return r;return-1};

},{}],174:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"dup":40}],175:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

},{}],175:[function(require,module,exports){
function isBuffer(f){return!!f.constructor&&"function"==typeof f.constructor.isBuffer&&f.constructor.isBuffer(f)}function isSlowBuffer(f){return"function"==typeof f.readFloatLE&&"function"==typeof f.slice&&isBuffer(f.slice(0,0))}module.exports=function(f){return null!=f&&(isBuffer(f)||isSlowBuffer(f)||!!f._isBuffer)};

},{}],176:[function(require,module,exports){
var toString={}.toString;module.exports=Array.isArray||function(r){return"[object Array]"==toString.call(r)};

},{}],177:[function(require,module,exports){
(function (Buffer){
"use strict";function MD5(){HashBase.call(this,64),this._a=1732584193,this._b=4023233417,this._c=2562383102,this._d=271733878}function rotl(n,f){return n<<f|n>>>32-f}function fnF(n,f,t,i,s,h,e){return rotl(n+(f&t|~f&i)+s+h|0,e)+f|0}function fnG(n,f,t,i,s,h,e){return rotl(n+(f&i|t&~i)+s+h|0,e)+f|0}function fnH(n,f,t,i,s,h,e){return rotl(n+(f^t^i)+s+h|0,e)+f|0}function fnI(n,f,t,i,s,h,e){return rotl(n+(t^(f|~i))+s+h|0,e)+f|0}var inherits=require("inherits"),HashBase=require("hash-base"),ARRAY16=new Array(16);inherits(MD5,HashBase),MD5.prototype._update=function(){for(var n=ARRAY16,f=0;f<16;++f)n[f]=this._block.readInt32LE(4*f);var t=this._a,i=this._b,s=this._c,h=this._d;i=fnI(i=fnI(i=fnI(i=fnI(i=fnH(i=fnH(i=fnH(i=fnH(i=fnG(i=fnG(i=fnG(i=fnG(i=fnF(i=fnF(i=fnF(i=fnF(i,s=fnF(s,h=fnF(h,t=fnF(t,i,s,h,n[0],3614090360,7),i,s,n[1],3905402710,12),t,i,n[2],606105819,17),h,t,n[3],3250441966,22),s=fnF(s,h=fnF(h,t=fnF(t,i,s,h,n[4],4118548399,7),i,s,n[5],1200080426,12),t,i,n[6],2821735955,17),h,t,n[7],4249261313,22),s=fnF(s,h=fnF(h,t=fnF(t,i,s,h,n[8],1770035416,7),i,s,n[9],2336552879,12),t,i,n[10],4294925233,17),h,t,n[11],2304563134,22),s=fnF(s,h=fnF(h,t=fnF(t,i,s,h,n[12],1804603682,7),i,s,n[13],4254626195,12),t,i,n[14],2792965006,17),h,t,n[15],1236535329,22),s=fnG(s,h=fnG(h,t=fnG(t,i,s,h,n[1],4129170786,5),i,s,n[6],3225465664,9),t,i,n[11],643717713,14),h,t,n[0],3921069994,20),s=fnG(s,h=fnG(h,t=fnG(t,i,s,h,n[5],3593408605,5),i,s,n[10],38016083,9),t,i,n[15],3634488961,14),h,t,n[4],3889429448,20),s=fnG(s,h=fnG(h,t=fnG(t,i,s,h,n[9],568446438,5),i,s,n[14],3275163606,9),t,i,n[3],4107603335,14),h,t,n[8],1163531501,20),s=fnG(s,h=fnG(h,t=fnG(t,i,s,h,n[13],2850285829,5),i,s,n[2],4243563512,9),t,i,n[7],1735328473,14),h,t,n[12],2368359562,20),s=fnH(s,h=fnH(h,t=fnH(t,i,s,h,n[5],4294588738,4),i,s,n[8],2272392833,11),t,i,n[11],1839030562,16),h,t,n[14],4259657740,23),s=fnH(s,h=fnH(h,t=fnH(t,i,s,h,n[1],2763975236,4),i,s,n[4],1272893353,11),t,i,n[7],4139469664,16),h,t,n[10],3200236656,23),s=fnH(s,h=fnH(h,t=fnH(t,i,s,h,n[13],681279174,4),i,s,n[0],3936430074,11),t,i,n[3],3572445317,16),h,t,n[6],76029189,23),s=fnH(s,h=fnH(h,t=fnH(t,i,s,h,n[9],3654602809,4),i,s,n[12],3873151461,11),t,i,n[15],530742520,16),h,t,n[2],3299628645,23),s=fnI(s,h=fnI(h,t=fnI(t,i,s,h,n[0],4096336452,6),i,s,n[7],1126891415,10),t,i,n[14],2878612391,15),h,t,n[5],4237533241,21),s=fnI(s,h=fnI(h,t=fnI(t,i,s,h,n[12],1700485571,6),i,s,n[3],2399980690,10),t,i,n[10],4293915773,15),h,t,n[1],2240044497,21),s=fnI(s,h=fnI(h,t=fnI(t,i,s,h,n[8],1873313359,6),i,s,n[15],4264355552,10),t,i,n[6],2734768916,15),h,t,n[13],1309151649,21),s=fnI(s,h=fnI(h,t=fnI(t,i,s,h,n[4],4149444226,6),i,s,n[11],3174756917,10),t,i,n[2],718787259,15),h,t,n[9],3951481745,21),this._a=this._a+t|0,this._b=this._b+i|0,this._c=this._c+s|0,this._d=this._d+h|0},MD5.prototype._digest=function(){this._block[this._blockOffset++]=128,this._blockOffset>56&&(this._block.fill(0,this._blockOffset,64),this._update(),this._blockOffset=0),this._block.fill(0,this._blockOffset,56),this._block.writeUInt32LE(this._length[0],56),this._block.writeUInt32LE(this._length[1],60),this._update();var n=new Buffer(16);return n.writeInt32LE(this._a,0),n.writeInt32LE(this._b,4),n.writeInt32LE(this._c,8),n.writeInt32LE(this._d,12),n},module.exports=MD5;

}).call(this,require("buffer").Buffer)
},{"buffer":120,"hash-base":178,"inherits":174}],178:[function(require,module,exports){
"use strict";function throwIfNotStringOrBuffer(t,e){if(!Buffer.isBuffer(t)&&"string"!=typeof t)throw new TypeError(e+" must be a string or a buffer")}function HashBase(t){Transform.call(this),this._block=Buffer.allocUnsafe(t),this._blockSize=t,this._blockOffset=0,this._length=[0,0,0,0],this._finalized=!1}var Buffer=require("safe-buffer").Buffer,Transform=require("stream").Transform,inherits=require("inherits");inherits(HashBase,Transform),HashBase.prototype._transform=function(t,e,r){var s=null;try{this.update(t,e)}catch(t){s=t}r(s)},HashBase.prototype._flush=function(t){var e=null;try{this.push(this.digest())}catch(t){e=t}t(e)},HashBase.prototype.update=function(t,e){if(throwIfNotStringOrBuffer(t,"Data"),this._finalized)throw new Error("Digest already called");Buffer.isBuffer(t)||(t=Buffer.from(t,e));for(var r=this._block,s=0;this._blockOffset+t.length-s>=this._blockSize;){for(var i=this._blockOffset;i<this._blockSize;)r[i++]=t[s++];this._update(),this._blockOffset=0}for(;s<t.length;)r[this._blockOffset++]=t[s++];for(var f=0,o=8*t.length;o>0;++f)this._length[f]+=o,(o=this._length[f]/4294967296|0)>0&&(this._length[f]-=4294967296*o);return this},HashBase.prototype._update=function(){throw new Error("_update is not implemented")},HashBase.prototype.digest=function(t){if(this._finalized)throw new Error("Digest already called");this._finalized=!0;var e=this._digest();void 0!==t&&(e=e.toString(t)),this._block.fill(0),this._blockOffset=0;for(var r=0;r<4;++r)this._length[r]=0;return e},HashBase.prototype._digest=function(){throw new Error("_digest is not implemented")},module.exports=HashBase;

function throwIfNotStringOrBuffer (val, prefix) {
  if (!Buffer.isBuffer(val) && typeof val !== 'string') {
    throw new TypeError(prefix + ' must be a string or a buffer')
  }
}

function HashBase (blockSize) {
  Transform.call(this)

  this._block = Buffer.allocUnsafe(blockSize)
  this._blockSize = blockSize
  this._blockOffset = 0
  this._length = [0, 0, 0, 0]

  this._finalized = false
}

inherits(HashBase, Transform)

HashBase.prototype._transform = function (chunk, encoding, callback) {
  var error = null
  try {
    this.update(chunk, encoding)
  } catch (err) {
    error = err
  }

  callback(error)
}

HashBase.prototype._flush = function (callback) {
  var error = null
  try {
    this.push(this.digest())
  } catch (err) {
    error = err
  }

  callback(error)
}

HashBase.prototype.update = function (data, encoding) {
  throwIfNotStringOrBuffer(data, 'Data')
  if (this._finalized) throw new Error('Digest already called')
  if (!Buffer.isBuffer(data)) data = Buffer.from(data, encoding)

  // consume data
  var block = this._block
  var offset = 0
  while (this._blockOffset + data.length - offset >= this._blockSize) {
    for (var i = this._blockOffset; i < this._blockSize;) block[i++] = data[offset++]
    this._update()
    this._blockOffset = 0
  }
  while (offset < data.length) block[this._blockOffset++] = data[offset++]

  // update length
  for (var j = 0, carry = data.length * 8; carry > 0; ++j) {
    this._length[j] += carry
    carry = (this._length[j] / 0x0100000000) | 0
    if (carry > 0) this._length[j] -= 0x0100000000 * carry
  }

  return this
}

HashBase.prototype._update = function () {
  throw new Error('_update is not implemented')
}

HashBase.prototype.digest = function (encoding) {
  if (this._finalized) throw new Error('Digest already called')
  this._finalized = true

  var digest = this._digest()
  if (encoding !== undefined) digest = digest.toString(encoding)

  // reset state
  this._block.fill(0)
  this._blockOffset = 0
  for (var i = 0; i < 4; ++i) this._length[i] = 0

  return digest
}

HashBase.prototype._digest = function () {
  throw new Error('_digest is not implemented')
}

module.exports = HashBase

},{"inherits":174,"safe-buffer":215,"stream":224}],179:[function(require,module,exports){
var bn = require('bn.js');
var brorand = require('brorand');

},{"bn.js":89,"brorand":90}],180:[function(require,module,exports){
function assert(r,e){if(!r)throw new Error(e||"Assertion failed")}module.exports=assert,assert.equal=function(r,e,s){if(r!=e)throw new Error(s||"Assertion failed: "+r+" != "+e)};

},{}],181:[function(require,module,exports){
"use strict";function toArray(r,t){if(Array.isArray(r))return r.slice();if(!r)return[];var e=[];if("string"!=typeof r){for(n=0;n<r.length;n++)e[n]=0|r[n];return e}if("hex"===t){(r=r.replace(/[^a-z0-9]+/gi,"")).length%2!=0&&(r="0"+r);for(n=0;n<r.length;n+=2)e.push(parseInt(r[n]+r[n+1],16))}else for(var n=0;n<r.length;n++){var o=r.charCodeAt(n),u=o>>8,i=255&o;u?e.push(u,i):e.push(i)}return e}function zero2(r){return 1===r.length?"0"+r:r}function toHex(r){for(var t="",e=0;e<r.length;e++)t+=zero2(r[e].toString(16));return t}var utils=exports;utils.toArray=toArray,utils.zero2=zero2,utils.toHex=toHex,utils.encode=function(r,t){return"hex"===t?toHex(r):r};

},{}],182:[function(require,module,exports){
module.exports={"2.16.840.1.101.3.4.1.1": "aes-128-ecb",
"2.16.840.1.101.3.4.1.2": "aes-128-cbc",
"2.16.840.1.101.3.4.1.3": "aes-128-ofb",
"2.16.840.1.101.3.4.1.4": "aes-128-cfb",
"2.16.840.1.101.3.4.1.21": "aes-192-ecb",
"2.16.840.1.101.3.4.1.22": "aes-192-cbc",
"2.16.840.1.101.3.4.1.23": "aes-192-ofb",
"2.16.840.1.101.3.4.1.24": "aes-192-cfb",
"2.16.840.1.101.3.4.1.41": "aes-256-ecb",
"2.16.840.1.101.3.4.1.42": "aes-256-cbc",
"2.16.840.1.101.3.4.1.43": "aes-256-ofb",
"2.16.840.1.101.3.4.1.44": "aes-256-cfb"
}
},{}],183:[function(require,module,exports){
"use strict";var asn1=require("asn1.js");exports.certificate=require("./certificate");var RSAPrivateKey=asn1.define("RSAPrivateKey",function(){this.seq().obj(this.key("version").int(),this.key("modulus").int(),this.key("publicExponent").int(),this.key("privateExponent").int(),this.key("prime1").int(),this.key("prime2").int(),this.key("exponent1").int(),this.key("exponent2").int(),this.key("coefficient").int())});exports.RSAPrivateKey=RSAPrivateKey;var RSAPublicKey=asn1.define("RSAPublicKey",function(){this.seq().obj(this.key("modulus").int(),this.key("publicExponent").int())});exports.RSAPublicKey=RSAPublicKey;var PublicKey=asn1.define("SubjectPublicKeyInfo",function(){this.seq().obj(this.key("algorithm").use(AlgorithmIdentifier),this.key("subjectPublicKey").bitstr())});exports.PublicKey=PublicKey;var AlgorithmIdentifier=asn1.define("AlgorithmIdentifier",function(){this.seq().obj(this.key("algorithm").objid(),this.key("none").null_().optional(),this.key("curve").objid().optional(),this.key("params").seq().obj(this.key("p").int(),this.key("q").int(),this.key("g").int()).optional())}),PrivateKeyInfo=asn1.define("PrivateKeyInfo",function(){this.seq().obj(this.key("version").int(),this.key("algorithm").use(AlgorithmIdentifier),this.key("subjectPrivateKey").octstr())});exports.PrivateKey=PrivateKeyInfo;var EncryptedPrivateKeyInfo=asn1.define("EncryptedPrivateKeyInfo",function(){this.seq().obj(this.key("algorithm").seq().obj(this.key("id").objid(),this.key("decrypt").seq().obj(this.key("kde").seq().obj(this.key("id").objid(),this.key("kdeparams").seq().obj(this.key("salt").octstr(),this.key("iters").int())),this.key("cipher").seq().obj(this.key("algo").objid(),this.key("iv").octstr()))),this.key("subjectPrivateKey").octstr())});exports.EncryptedPrivateKey=EncryptedPrivateKeyInfo;var DSAPrivateKey=asn1.define("DSAPrivateKey",function(){this.seq().obj(this.key("version").int(),this.key("p").int(),this.key("q").int(),this.key("g").int(),this.key("pub_key").int(),this.key("priv_key").int())});exports.DSAPrivateKey=DSAPrivateKey,exports.DSAparam=asn1.define("DSAparam",function(){this.int()});var ECPrivateKey=asn1.define("ECPrivateKey",function(){this.seq().obj(this.key("version").int(),this.key("privateKey").octstr(),this.key("parameters").optional().explicit(0).use(ECParameters),this.key("publicKey").optional().explicit(1).bitstr())});exports.ECPrivateKey=ECPrivateKey;var ECParameters=asn1.define("ECParameters",function(){this.choice({namedCurve:this.objid()})});exports.signature=asn1.define("signature",function(){this.seq().obj(this.key("r").int(),this.key("s").int())});

},{"./certificate":184,"asn1.js":73}],184:[function(require,module,exports){
"use strict";var asn=require("asn1.js"),Time=asn.define("Time",function(){this.choice({utcTime:this.utctime(),generalTime:this.gentime()})}),AttributeTypeValue=asn.define("AttributeTypeValue",function(){this.seq().obj(this.key("type").objid(),this.key("value").any())}),AlgorithmIdentifier=asn.define("AlgorithmIdentifier",function(){this.seq().obj(this.key("algorithm").objid(),this.key("parameters").optional())}),SubjectPublicKeyInfo=asn.define("SubjectPublicKeyInfo",function(){this.seq().obj(this.key("algorithm").use(AlgorithmIdentifier),this.key("subjectPublicKey").bitstr())}),RelativeDistinguishedName=asn.define("RelativeDistinguishedName",function(){this.setof(AttributeTypeValue)}),RDNSequence=asn.define("RDNSequence",function(){this.seqof(RelativeDistinguishedName)}),Name=asn.define("Name",function(){this.choice({rdnSequence:this.use(RDNSequence)})}),Validity=asn.define("Validity",function(){this.seq().obj(this.key("notBefore").use(Time),this.key("notAfter").use(Time))}),Extension=asn.define("Extension",function(){this.seq().obj(this.key("extnID").objid(),this.key("critical").bool().def(!1),this.key("extnValue").octstr())}),TBSCertificate=asn.define("TBSCertificate",function(){this.seq().obj(this.key("version").explicit(0).int(),this.key("serialNumber").int(),this.key("signature").use(AlgorithmIdentifier),this.key("issuer").use(Name),this.key("validity").use(Validity),this.key("subject").use(Name),this.key("subjectPublicKeyInfo").use(SubjectPublicKeyInfo),this.key("issuerUniqueID").implicit(1).bitstr().optional(),this.key("subjectUniqueID").implicit(2).bitstr().optional(),this.key("extensions").explicit(3).seqof(Extension).optional())}),X509Certificate=asn.define("X509Certificate",function(){this.seq().obj(this.key("tbsCertificate").use(TBSCertificate),this.key("signatureAlgorithm").use(AlgorithmIdentifier),this.key("signatureValue").bitstr())});module.exports=X509Certificate;

},{"asn1.js":73}],185:[function(require,module,exports){
(function (Buffer){
var findProc=/Proc-Type: 4,ENCRYPTED\n\r?DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)\n\r?\n\r?([0-9A-z\n\r\+\/\=]+)\n\r?/m,startRegex=/^-----BEGIN ((?:.* KEY)|CERTIFICATE)-----\n/m,fullRegex=/^-----BEGIN ((?:.* KEY)|CERTIFICATE)-----\n\r?([0-9A-z\n\r\+\/\=]+)\n\r?-----END \1-----$/m,evp=require("evp_bytestokey"),ciphers=require("browserify-aes");module.exports=function(e,r){var n,a=e.toString(),t=a.match(findProc);if(t){var f="aes"+t[1],c=new Buffer(t[2],"hex"),s=new Buffer(t[3].replace(/\r?\n/g,""),"base64"),i=evp(r,c.slice(0,8),parseInt(t[1],10)).key,p=[],u=ciphers.createDecipheriv(f,i,c);p.push(u.update(s)),p.push(u.final()),n=Buffer.concat(p)}else{var E=a.match(fullRegex);n=new Buffer(E[2].replace(/\r?\n/g,""),"base64")}return{tag:a.match(startRegex)[1],data:n}};

}).call(this,require("buffer").Buffer)
},{"browserify-aes":94,"buffer":120,"evp_bytestokey":157}],186:[function(require,module,exports){
(function (Buffer){
function parseKeys(e){var r;"object"!=typeof e||Buffer.isBuffer(e)||(r=e.passphrase,e=e.key),"string"==typeof e&&(e=new Buffer(e));var a,t,s=fixProc(e,r),i=s.tag,c=s.data;switch(i){case"CERTIFICATE":t=asn1.certificate.decode(c,"der").tbsCertificate.subjectPublicKeyInfo;case"PUBLIC KEY":switch(t||(t=asn1.PublicKey.decode(c,"der")),a=t.algorithm.algorithm.join(".")){case"1.2.840.113549.1.1.1":return asn1.RSAPublicKey.decode(t.subjectPublicKey.data,"der");case"1.2.840.10045.2.1":return t.subjectPrivateKey=t.subjectPublicKey,{type:"ec",data:t};case"1.2.840.10040.4.1":return t.algorithm.params.pub_key=asn1.DSAparam.decode(t.subjectPublicKey.data,"der"),{type:"dsa",data:t.algorithm.params};default:throw new Error("unknown key id "+a)}throw new Error("unknown key type "+i);case"ENCRYPTED PRIVATE KEY":c=decrypt(c=asn1.EncryptedPrivateKey.decode(c,"der"),r);case"PRIVATE KEY":switch(t=asn1.PrivateKey.decode(c,"der"),a=t.algorithm.algorithm.join(".")){case"1.2.840.113549.1.1.1":return asn1.RSAPrivateKey.decode(t.subjectPrivateKey,"der");case"1.2.840.10045.2.1":return{curve:t.algorithm.curve,privateKey:asn1.ECPrivateKey.decode(t.subjectPrivateKey,"der").privateKey};case"1.2.840.10040.4.1":return t.algorithm.params.priv_key=asn1.DSAparam.decode(t.subjectPrivateKey,"der"),{type:"dsa",params:t.algorithm.params};default:throw new Error("unknown key id "+a)}throw new Error("unknown key type "+i);case"RSA PUBLIC KEY":return asn1.RSAPublicKey.decode(c,"der");case"RSA PRIVATE KEY":return asn1.RSAPrivateKey.decode(c,"der");case"DSA PRIVATE KEY":return{type:"dsa",params:asn1.DSAPrivateKey.decode(c,"der")};case"EC PRIVATE KEY":return c=asn1.ECPrivateKey.decode(c,"der"),{curve:c.parameters.value,privateKey:c.privateKey};default:throw new Error("unknown key type "+i)}}function decrypt(e,r){var a=e.algorithm.decrypt.kde.kdeparams.salt,t=parseInt(e.algorithm.decrypt.kde.kdeparams.iters.toString(),10),s=aesid[e.algorithm.decrypt.cipher.algo.join(".")],i=e.algorithm.decrypt.cipher.iv,c=e.subjectPrivateKey,d=parseInt(s.split("-")[1],10)/8,n=compat.pbkdf2Sync(r,a,t,d),o=ciphers.createDecipheriv(s,n,i),u=[];return u.push(o.update(c)),u.push(o.final()),Buffer.concat(u)}var asn1=require("./asn1"),aesid=require("./aesid.json"),fixProc=require("./fixProc"),ciphers=require("browserify-aes"),compat=require("pbkdf2");module.exports=parseKeys,parseKeys.signature=asn1.signature;

}).call(this,require("buffer").Buffer)
},{"./aesid.json":182,"./asn1":183,"./fixProc":185,"browserify-aes":94,"buffer":120,"pbkdf2":187}],187:[function(require,module,exports){
exports.pbkdf2=require("./lib/async"),exports.pbkdf2Sync=require("./lib/sync");

},{"./lib/async":188,"./lib/sync":191}],188:[function(require,module,exports){
(function (process,global){
function checkNative(e){if(global.process&&!global.process.browser)return Promise.resolve(!1);if(!subtle||!subtle.importKey||!subtle.deriveBits)return Promise.resolve(!1);if(void 0!==checks[e])return checks[e];var r=browserPbkdf2(ZERO_BUF=ZERO_BUF||Buffer.alloc(8),ZERO_BUF,10,128,e).then(function(){return!0}).catch(function(){return!1});return checks[e]=r,r}function browserPbkdf2(e,r,n,t,o){return subtle.importKey("raw",e,{name:"PBKDF2"},!1,["deriveBits"]).then(function(e){return subtle.deriveBits({name:"PBKDF2",salt:r,iterations:n,hash:{name:o}},e,t<<3)}).then(function(e){return Buffer.from(e)})}function resolvePromise(e,r){e.then(function(e){process.nextTick(function(){r(null,e)})},function(e){process.nextTick(function(){r(e)})})}var ZERO_BUF,checkParameters=require("./precondition"),defaultEncoding=require("./default-encoding"),sync=require("./sync"),Buffer=require("safe-buffer").Buffer,subtle=global.crypto&&global.crypto.subtle,toBrowser={sha:"SHA-1","sha-1":"SHA-1",sha1:"SHA-1",sha256:"SHA-256","sha-256":"SHA-256",sha384:"SHA-384","sha-384":"SHA-384","sha-512":"SHA-512",sha512:"SHA-512"},checks=[];module.exports=function(e,r,n,t,o,s){if(Buffer.isBuffer(e)||(e=Buffer.from(e,defaultEncoding)),Buffer.isBuffer(r)||(r=Buffer.from(r,defaultEncoding)),checkParameters(n,t),"function"==typeof o&&(s=o,o=void 0),"function"!=typeof s)throw new Error("No callback provided to pbkdf2");var c=toBrowser[(o=o||"sha1").toLowerCase()];if(!c||"function"!=typeof global.Promise)return process.nextTick(function(){var c;try{c=sync(e,r,n,t,o)}catch(e){return s(e)}s(null,c)});resolvePromise(checkNative(c).then(function(s){return s?browserPbkdf2(e,r,n,t,c):sync(e,r,n,t,o)}),s)};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./default-encoding":189,"./precondition":190,"./sync":191,"_process":193,"safe-buffer":215}],189:[function(require,module,exports){
(function (process){
var defaultEncoding;if(process.browser)defaultEncoding="utf-8";else{var pVersionMajor=parseInt(process.version.split(".")[0].slice(1),10);defaultEncoding=pVersionMajor>=6?"utf-8":"binary"}module.exports=defaultEncoding;

}).call(this,require('_process'))
},{"_process":193}],190:[function(require,module,exports){
var MAX_ALLOC=Math.pow(2,30)-1;module.exports=function(r,e){if("number"!=typeof r)throw new TypeError("Iterations not a number");if(r<0)throw new TypeError("Bad iterations");if("number"!=typeof e)throw new TypeError("Key length not a number");if(e<0||e>MAX_ALLOC||e!=e)throw new TypeError("Bad key length")};

},{}],191:[function(require,module,exports){
function Hmac(e,r,a){var s=getDigest(e),f="sha512"===e||"sha384"===e?128:64;r.length>f?r=s(r):r.length<f&&(r=Buffer.concat([r,ZEROS],f));for(var i=Buffer.allocUnsafe(f+sizes[e]),t=Buffer.allocUnsafe(f+sizes[e]),h=0;h<f;h++)i[h]=54^r[h],t[h]=92^r[h];var n=Buffer.allocUnsafe(f+a+4);i.copy(n,0,0,f),this.ipad1=n,this.ipad2=i,this.opad=t,this.alg=e,this.blocksize=f,this.hash=s,this.size=sizes[e]}function getDigest(e){return"rmd160"===e||"ripemd160"===e?rmd160:"md5"===e?md5:function(r){return sha(e).update(r).digest()}}function pbkdf2(e,r,a,s,f){Buffer.isBuffer(e)||(e=Buffer.from(e,defaultEncoding)),Buffer.isBuffer(r)||(r=Buffer.from(r,defaultEncoding)),checkParameters(a,s);var i=new Hmac(f=f||"sha1",e,r.length),t=Buffer.allocUnsafe(s),h=Buffer.allocUnsafe(r.length+4);r.copy(h,0,0,r.length);for(var n=0,u=sizes[f],o=Math.ceil(s/u),c=1;c<=o;c++){h.writeUInt32BE(c,r.length);for(var d=i.run(h,i.ipad1),l=d,p=1;p<a;p++){l=i.run(l,i.ipad2);for(var m=0;m<u;m++)d[m]^=l[m]}d.copy(t,n),n+=u}return t}var md5=require("create-hash/md5"),rmd160=require("ripemd160"),sha=require("sha.js"),checkParameters=require("./precondition"),defaultEncoding=require("./default-encoding"),Buffer=require("safe-buffer").Buffer,ZEROS=Buffer.alloc(128),sizes={md5:16,sha1:20,sha224:28,sha256:32,sha384:48,sha512:64,rmd160:20,ripemd160:20};Hmac.prototype.run=function(e,r){e.copy(r,this.blocksize);return this.hash(r).copy(this.opad,this.blocksize),this.hash(this.opad)},module.exports=pbkdf2;

var checkParameters = require('./precondition')
var defaultEncoding = require('./default-encoding')
var Buffer = require('safe-buffer').Buffer
var ZEROS = Buffer.alloc(128)
var sizes = {
  md5: 16,
  sha1: 20,
  sha224: 28,
  sha256: 32,
  sha384: 48,
  sha512: 64,
  rmd160: 20,
  ripemd160: 20
}

function Hmac (alg, key, saltLen) {
  var hash = getDigest(alg)
  var blocksize = (alg === 'sha512' || alg === 'sha384') ? 128 : 64

  if (key.length > blocksize) {
    key = hash(key)
  } else if (key.length < blocksize) {
    key = Buffer.concat([key, ZEROS], blocksize)
  }

  var ipad = Buffer.allocUnsafe(blocksize + sizes[alg])
  var opad = Buffer.allocUnsafe(blocksize + sizes[alg])
  for (var i = 0; i < blocksize; i++) {
    ipad[i] = key[i] ^ 0x36
    opad[i] = key[i] ^ 0x5C
  }

  var ipad1 = Buffer.allocUnsafe(blocksize + saltLen + 4)
  ipad.copy(ipad1, 0, 0, blocksize)
  this.ipad1 = ipad1
  this.ipad2 = ipad
  this.opad = opad
  this.alg = alg
  this.blocksize = blocksize
  this.hash = hash
  this.size = sizes[alg]
}

Hmac.prototype.run = function (data, ipad) {
  data.copy(ipad, this.blocksize)
  var h = this.hash(ipad)
  h.copy(this.opad, this.blocksize)
  return this.hash(this.opad)
}

function getDigest (alg) {
  function shaFunc (data) {
    return sha(alg).update(data).digest()
  }

  if (alg === 'rmd160' || alg === 'ripemd160') return rmd160
  if (alg === 'md5') return md5
  return shaFunc
}

function pbkdf2 (password, salt, iterations, keylen, digest) {
  if (!Buffer.isBuffer(password)) password = Buffer.from(password, defaultEncoding)
  if (!Buffer.isBuffer(salt)) salt = Buffer.from(salt, defaultEncoding)

  checkParameters(iterations, keylen)

  digest = digest || 'sha1'

  var hmac = new Hmac(digest, password, salt.length)

  var DK = Buffer.allocUnsafe(keylen)
  var block1 = Buffer.allocUnsafe(salt.length + 4)
  salt.copy(block1, 0, 0, salt.length)

  var destPos = 0
  var hLen = sizes[digest]
  var l = Math.ceil(keylen / hLen)

  for (var i = 1; i <= l; i++) {
    block1.writeUInt32BE(i, salt.length)

    var T = hmac.run(block1, hmac.ipad1)
    var U = T

    for (var j = 1; j < iterations; j++) {
      U = hmac.run(U, hmac.ipad2)
      for (var k = 0; k < hLen; k++) T[k] ^= U[k]
    }

    T.copy(DK, destPos)
    destPos += hLen
  }

  return DK
}

module.exports = pbkdf2

},{"./default-encoding":189,"./precondition":190,"create-hash/md5":126,"ripemd160":214,"safe-buffer":215,"sha.js":217}],192:[function(require,module,exports){
(function (process){
"use strict";function nextTick(e,n,c,r){if("function"!=typeof e)throw new TypeError('"callback" argument must be a function');var s,t,o=arguments.length;switch(o){case 0:case 1:return process.nextTick(e);case 2:return process.nextTick(function(){e.call(null,n)});case 3:return process.nextTick(function(){e.call(null,n,c)});case 4:return process.nextTick(function(){e.call(null,n,c,r)});default:for(s=new Array(o-1),t=0;t<s.length;)s[t++]=arguments[t];return process.nextTick(function(){e.apply(null,s)})}}!process.version||0===process.version.indexOf("v0.")||0===process.version.indexOf("v1.")&&0!==process.version.indexOf("v1.8.")?module.exports=nextTick:module.exports=process.nextTick;

}).call(this,require('_process'))
},{"_process":193}],193:[function(require,module,exports){
function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}function runTimeout(e){if(cachedSetTimeout===setTimeout)return setTimeout(e,0);if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout)return cachedSetTimeout=setTimeout,setTimeout(e,0);try{return cachedSetTimeout(e,0)}catch(t){try{return cachedSetTimeout.call(null,e,0)}catch(t){return cachedSetTimeout.call(this,e,0)}}}function runClearTimeout(e){if(cachedClearTimeout===clearTimeout)return clearTimeout(e);if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout)return cachedClearTimeout=clearTimeout,clearTimeout(e);try{return cachedClearTimeout(e)}catch(t){try{return cachedClearTimeout.call(null,e)}catch(t){return cachedClearTimeout.call(this,e)}}}function cleanUpNextTick(){draining&&currentQueue&&(draining=!1,currentQueue.length?queue=currentQueue.concat(queue):queueIndex=-1,queue.length&&drainQueue())}function drainQueue(){if(!draining){var e=runTimeout(cleanUpNextTick);draining=!0;for(var t=queue.length;t;){for(currentQueue=queue,queue=[];++queueIndex<t;)currentQueue&&currentQueue[queueIndex].run();queueIndex=-1,t=queue.length}currentQueue=null,draining=!1,runClearTimeout(e)}}function Item(e,t){this.fun=e,this.array=t}function noop(){}var cachedSetTimeout,cachedClearTimeout,process=module.exports={};!function(){try{cachedSetTimeout="function"==typeof setTimeout?setTimeout:defaultSetTimout}catch(e){cachedSetTimeout=defaultSetTimout}try{cachedClearTimeout="function"==typeof clearTimeout?clearTimeout:defaultClearTimeout}catch(e){cachedClearTimeout=defaultClearTimeout}}();var currentQueue,queue=[],draining=!1,queueIndex=-1;process.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];queue.push(new Item(e,t)),1!==queue.length||draining||runTimeout(drainQueue)},Item.prototype.run=function(){this.fun.apply(null,this.array)},process.title="browser",process.browser=!0,process.env={},process.argv=[],process.version="",process.versions={},process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.prependListener=noop,process.prependOnceListener=noop,process.listeners=function(e){return[]},process.binding=function(e){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(e){throw new Error("process.chdir is not supported")},process.umask=function(){return 0};

},{}],194:[function(require,module,exports){
exports.publicEncrypt=require("./publicEncrypt"),exports.privateDecrypt=require("./privateDecrypt"),exports.privateEncrypt=function(r,p){return exports.publicEncrypt(r,p,!0)},exports.publicDecrypt=function(r,p){return exports.privateDecrypt(r,p,!0)};

},{"./privateDecrypt":196,"./publicEncrypt":197}],195:[function(require,module,exports){
(function (Buffer){
function i2ops(e){var r=new Buffer(4);return r.writeUInt32BE(e,0),r}var createHash=require("create-hash");module.exports=function(e,r){for(var t,a=new Buffer(""),n=0;a.length<r;)t=i2ops(n++),a=Buffer.concat([a,createHash("sha1").update(e).update(t).digest()]);return a.slice(0,r)};

}).call(this,require("buffer").Buffer)
},{"buffer":120,"create-hash":124}],196:[function(require,module,exports){
(function (Buffer){
function oaep(r,e){r.modulus;var n=r.modulus.byteLength(),t=(e.length,createHash("sha1").update(new Buffer("")).digest()),i=t.length;if(0!==e[0])throw new Error("decryption error");var o=e.slice(1,i+1),u=e.slice(i+1),a=xor(o,mgf(u,i)),c=xor(u,mgf(a,n-i-1));if(compare(t,c.slice(0,i)))throw new Error("decryption error");for(var f=i;0===c[f];)f++;if(1!==c[f++])throw new Error("decryption error");return c.slice(f)}function pkcs1(r,e,n){for(var t=e.slice(0,2),i=2,o=0;0!==e[i++];)if(i>=e.length){o++;break}var u=e.slice(2,i-1);e.slice(i-1,i);if(("0002"!==t.toString("hex")&&!n||"0001"!==t.toString("hex")&&n)&&o++,u.length<8&&o++,o)throw new Error("decryption error");return e.slice(i)}function compare(r,e){r=new Buffer(r),e=new Buffer(e);var n=0,t=r.length;r.length!==e.length&&(n++,t=Math.min(r.length,e.length));for(var i=-1;++i<t;)n+=r[i]^e[i];return n}var parseKeys=require("parse-asn1"),mgf=require("./mgf"),xor=require("./xor"),bn=require("bn.js"),crt=require("browserify-rsa"),createHash=require("create-hash"),withPublic=require("./withPublic");module.exports=function(r,e,n){var t;t=r.padding?r.padding:n?1:4;var i=parseKeys(r),o=i.modulus.byteLength();if(e.length>o||new bn(e).cmp(i.modulus)>=0)throw new Error("decryption error");var u;u=n?withPublic(new bn(e),i):crt(e,i);var a=new Buffer(o-u.length);if(a.fill(0),u=Buffer.concat([a,u],o),4===t)return oaep(i,u);if(1===t)return pkcs1(i,u,n);if(3===t)return u;throw new Error("unknown padding")};

}).call(this,require("buffer").Buffer)
},{"./mgf":195,"./withPublic":198,"./xor":199,"bn.js":89,"browserify-rsa":112,"buffer":120,"create-hash":124,"parse-asn1":186}],197:[function(require,module,exports){
(function (Buffer){
function oaep(e,r){var n=e.modulus.byteLength(),o=r.length,t=createHash("sha1").update(new Buffer("")).digest(),f=t.length,u=2*f;if(o>n-u-2)throw new Error("message too long");var a=new Buffer(n-o-u-2);a.fill(0);var s=n-f-1,i=randomBytes(f),w=xor(Buffer.concat([t,a,new Buffer([1]),r],s),mgf(i,s)),c=xor(i,mgf(w,f));return new bn(Buffer.concat([new Buffer([0]),c,w],n))}function pkcs1(e,r,n){var o=r.length,t=e.modulus.byteLength();if(o>t-11)throw new Error("message too long");var f;return n?(f=new Buffer(t-o-3)).fill(255):f=nonZero(t-o-3),new bn(Buffer.concat([new Buffer([0,n?1:2]),f,new Buffer([0]),r],t))}function nonZero(e,r){for(var n,o=new Buffer(e),t=0,f=randomBytes(2*e),u=0;t<e;)u===f.length&&(f=randomBytes(2*e),u=0),(n=f[u++])&&(o[t++]=n);return o}var parseKeys=require("parse-asn1"),randomBytes=require("randombytes"),createHash=require("create-hash"),mgf=require("./mgf"),xor=require("./xor"),bn=require("bn.js"),withPublic=require("./withPublic"),crt=require("browserify-rsa"),constants={RSA_PKCS1_OAEP_PADDING:4,RSA_PKCS1_PADDIN:1,RSA_NO_PADDING:3};module.exports=function(e,r,n){var o;o=e.padding?e.padding:n?1:4;var t,f=parseKeys(e);if(4===o)t=oaep(f,r);else if(1===o)t=pkcs1(f,r,n);else{if(3!==o)throw new Error("unknown padding");if((t=new bn(r)).cmp(f.modulus)>=0)throw new Error("data too long for modulus")}return n?crt(t,f):withPublic(t,f)};

}).call(this,require("buffer").Buffer)
},{"./mgf":195,"./withPublic":198,"./xor":199,"bn.js":89,"browserify-rsa":112,"buffer":120,"create-hash":124,"parse-asn1":186,"randombytes":200}],198:[function(require,module,exports){
(function (Buffer){
function withPublic(e,n){return new Buffer(e.toRed(bn.mont(n.modulus)).redPow(new bn(n.publicExponent)).fromRed().toArray())}var bn=require("bn.js");module.exports=withPublic;

}).call(this,require("buffer").Buffer)
},{"bn.js":89,"buffer":120}],199:[function(require,module,exports){
module.exports=function(r,e){for(var n=r.length,o=-1;++o<n;)r[o]^=e[o];return r};

},{}],200:[function(require,module,exports){
(function (process,global){
"use strict";function oldBrowser(){throw new Error("secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11")}function randomBytes(r,e){if(r>65536)throw new Error("requested too many random bytes");var o=new global.Uint8Array(r);r>0&&crypto.getRandomValues(o);var t=Buffer.from(o.buffer);return"function"==typeof e?process.nextTick(function(){e(null,t)}):t}var Buffer=require("safe-buffer").Buffer,crypto=global.crypto||global.msCrypto;crypto&&crypto.getRandomValues?module.exports=randomBytes:module.exports=oldBrowser;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":193,"safe-buffer":215}],201:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":202}],202:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

'use strict';

/*<replacement>*/

var processNextTick = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var Readable = require('./_stream_readable');
var Writable = require('./_stream_writable');

util.inherits(Duplex, Readable);

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  processNextTick(cb, err);
};

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}
},{"./_stream_readable":204,"./_stream_writable":206,"core-util-is":122,"inherits":174,"process-nextick-args":192}],203:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

'use strict';

module.exports = PassThrough;

var Transform = require('./_stream_transform');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":205,"core-util-is":122,"inherits":174}],204:[function(require,module,exports){
(function (process,global){
"use strict";function _uint8ArrayToBuffer(e){return Buffer.from(e)}function _isUint8Array(e){return Buffer.isBuffer(e)||e instanceof OurUint8Array}function prependListener(e,t,r){if("function"==typeof e.prependListener)return e.prependListener(t,r);e._events&&e._events[t]?isArray(e._events[t])?e._events[t].unshift(r):e._events[t]=[r,e._events[t]]:e.on(t,r)}function ReadableState(e,t){Duplex=Duplex||require("./_stream_duplex"),e=e||{},this.objectMode=!!e.objectMode,t instanceof Duplex&&(this.objectMode=this.objectMode||!!e.readableObjectMode);var r=e.highWaterMark,n=this.objectMode?16:16384;this.highWaterMark=r||0===r?r:n,this.highWaterMark=Math.floor(this.highWaterMark),this.buffer=new BufferList,this.length=0,this.pipes=null,this.pipesCount=0,this.flowing=null,this.ended=!1,this.endEmitted=!1,this.reading=!1,this.sync=!0,this.needReadable=!1,this.emittedReadable=!1,this.readableListening=!1,this.resumeScheduled=!1,this.destroyed=!1,this.defaultEncoding=e.defaultEncoding||"utf8",this.awaitDrain=0,this.readingMore=!1,this.decoder=null,this.encoding=null,e.encoding&&(StringDecoder||(StringDecoder=require("string_decoder/").StringDecoder),this.decoder=new StringDecoder(e.encoding),this.encoding=e.encoding)}function Readable(e){if(Duplex=Duplex||require("./_stream_duplex"),!(this instanceof Readable))return new Readable(e);this._readableState=new ReadableState(e,this),this.readable=!0,e&&("function"==typeof e.read&&(this._read=e.read),"function"==typeof e.destroy&&(this._destroy=e.destroy)),Stream.call(this)}function readableAddChunk(e,t,r,n,a){var i=e._readableState;if(null===t)i.reading=!1,onEofChunk(e,i);else{var d;a||(d=chunkInvalid(i,t)),d?e.emit("error",d):i.objectMode||t&&t.length>0?("string"==typeof t||i.objectMode||Object.getPrototypeOf(t)===Buffer.prototype||(t=_uint8ArrayToBuffer(t)),n?i.endEmitted?e.emit("error",new Error("stream.unshift() after end event")):addChunk(e,i,t,!0):i.ended?e.emit("error",new Error("stream.push() after EOF")):(i.reading=!1,i.decoder&&!r?(t=i.decoder.write(t),i.objectMode||0!==t.length?addChunk(e,i,t,!1):maybeReadMore(e,i)):addChunk(e,i,t,!1))):n||(i.reading=!1)}return needMoreData(i)}function addChunk(e,t,r,n){t.flowing&&0===t.length&&!t.sync?(e.emit("data",r),e.read(0)):(t.length+=t.objectMode?1:r.length,n?t.buffer.unshift(r):t.buffer.push(r),t.needReadable&&emitReadable(e)),maybeReadMore(e,t)}function chunkInvalid(e,t){var r;return _isUint8Array(t)||"string"==typeof t||void 0===t||e.objectMode||(r=new TypeError("Invalid non-string/buffer chunk")),r}function needMoreData(e){return!e.ended&&(e.needReadable||e.length<e.highWaterMark||0===e.length)}function computeNewHighWaterMark(e){return e>=MAX_HWM?e=MAX_HWM:(e--,e|=e>>>1,e|=e>>>2,e|=e>>>4,e|=e>>>8,e|=e>>>16,e++),e}function howMuchToRead(e,t){return e<=0||0===t.length&&t.ended?0:t.objectMode?1:e!=e?t.flowing&&t.length?t.buffer.head.data.length:t.length:(e>t.highWaterMark&&(t.highWaterMark=computeNewHighWaterMark(e)),e<=t.length?e:t.ended?t.length:(t.needReadable=!0,0))}function onEofChunk(e,t){if(!t.ended){if(t.decoder){var r=t.decoder.end();r&&r.length&&(t.buffer.push(r),t.length+=t.objectMode?1:r.length)}t.ended=!0,emitReadable(e)}}function emitReadable(e){var t=e._readableState;t.needReadable=!1,t.emittedReadable||(debug("emitReadable",t.flowing),t.emittedReadable=!0,t.sync?processNextTick(emitReadable_,e):emitReadable_(e))}function emitReadable_(e){debug("emit readable"),e.emit("readable"),flow(e)}function maybeReadMore(e,t){t.readingMore||(t.readingMore=!0,processNextTick(maybeReadMore_,e,t))}function maybeReadMore_(e,t){for(var r=t.length;!t.reading&&!t.flowing&&!t.ended&&t.length<t.highWaterMark&&(debug("maybeReadMore read 0"),e.read(0),r!==t.length);)r=t.length;t.readingMore=!1}function pipeOnDrain(e){return function(){var t=e._readableState;debug("pipeOnDrain",t.awaitDrain),t.awaitDrain&&t.awaitDrain--,0===t.awaitDrain&&EElistenerCount(e,"data")&&(t.flowing=!0,flow(e))}}function nReadingNextTick(e){debug("readable nexttick read 0"),e.read(0)}function resume(e,t){t.resumeScheduled||(t.resumeScheduled=!0,processNextTick(resume_,e,t))}function resume_(e,t){t.reading||(debug("resume read 0"),e.read(0)),t.resumeScheduled=!1,t.awaitDrain=0,e.emit("resume"),flow(e),t.flowing&&!t.reading&&e.read(0)}function flow(e){var t=e._readableState;for(debug("flow",t.flowing);t.flowing&&null!==e.read(););}function fromList(e,t){if(0===t.length)return null;var r;return t.objectMode?r=t.buffer.shift():!e||e>=t.length?(r=t.decoder?t.buffer.join(""):1===t.buffer.length?t.buffer.head.data:t.buffer.concat(t.length),t.buffer.clear()):r=fromListPartial(e,t.buffer,t.decoder),r}function fromListPartial(e,t,r){var n;return e<t.head.data.length?(n=t.head.data.slice(0,e),t.head.data=t.head.data.slice(e)):n=e===t.head.data.length?t.shift():r?copyFromBufferString(e,t):copyFromBuffer(e,t),n}function copyFromBufferString(e,t){var r=t.head,n=1,a=r.data;for(e-=a.length;r=r.next;){var i=r.data,d=e>i.length?i.length:e;if(d===i.length?a+=i:a+=i.slice(0,e),0===(e-=d)){d===i.length?(++n,r.next?t.head=r.next:t.head=t.tail=null):(t.head=r,r.data=i.slice(d));break}++n}return t.length-=n,a}function copyFromBuffer(e,t){var r=Buffer.allocUnsafe(e),n=t.head,a=1;for(n.data.copy(r),e-=n.data.length;n=n.next;){var i=n.data,d=e>i.length?i.length:e;if(i.copy(r,r.length-e,0,d),0===(e-=d)){d===i.length?(++a,n.next?t.head=n.next:t.head=t.tail=null):(t.head=n,n.data=i.slice(d));break}++a}return t.length-=a,r}function endReadable(e){var t=e._readableState;if(t.length>0)throw new Error('"endReadable()" called on non-empty stream');t.endEmitted||(t.ended=!0,processNextTick(endReadableNT,t,e))}function endReadableNT(e,t){e.endEmitted||0!==e.length||(e.endEmitted=!0,t.readable=!1,t.emit("end"))}function forEach(e,t){for(var r=0,n=e.length;r<n;r++)t(e[r],r)}function indexOf(e,t){for(var r=0,n=e.length;r<n;r++)if(e[r]===t)return r;return-1}var processNextTick=require("process-nextick-args");module.exports=Readable;var Duplex,isArray=require("isarray");Readable.ReadableState=ReadableState;var EE=require("events").EventEmitter,EElistenerCount=function(e,t){return e.listeners(t).length},Stream=require("./internal/streams/stream"),Buffer=require("safe-buffer").Buffer,OurUint8Array=global.Uint8Array||function(){},util=require("core-util-is");util.inherits=require("inherits");var debugUtil=require("util"),debug=void 0;debug=debugUtil&&debugUtil.debuglog?debugUtil.debuglog("stream"):function(){};var StringDecoder,BufferList=require("./internal/streams/BufferList"),destroyImpl=require("./internal/streams/destroy");util.inherits(Readable,Stream);var kProxyEvents=["error","close","destroy","pause","resume"];Object.defineProperty(Readable.prototype,"destroyed",{get:function(){return void 0!==this._readableState&&this._readableState.destroyed},set:function(e){this._readableState&&(this._readableState.destroyed=e)}}),Readable.prototype.destroy=destroyImpl.destroy,Readable.prototype._undestroy=destroyImpl.undestroy,Readable.prototype._destroy=function(e,t){this.push(null),t(e)},Readable.prototype.push=function(e,t){var r,n=this._readableState;return n.objectMode?r=!0:"string"==typeof e&&((t=t||n.defaultEncoding)!==n.encoding&&(e=Buffer.from(e,t),t=""),r=!0),readableAddChunk(this,e,t,!1,r)},Readable.prototype.unshift=function(e){return readableAddChunk(this,e,null,!0,!1)},Readable.prototype.isPaused=function(){return!1===this._readableState.flowing},Readable.prototype.setEncoding=function(e){return StringDecoder||(StringDecoder=require("string_decoder/").StringDecoder),this._readableState.decoder=new StringDecoder(e),this._readableState.encoding=e,this};var MAX_HWM=8388608;Readable.prototype.read=function(e){debug("read",e),e=parseInt(e,10);var t=this._readableState,r=e;if(0!==e&&(t.emittedReadable=!1),0===e&&t.needReadable&&(t.length>=t.highWaterMark||t.ended))return debug("read: emitReadable",t.length,t.ended),0===t.length&&t.ended?endReadable(this):emitReadable(this),null;if(0===(e=howMuchToRead(e,t))&&t.ended)return 0===t.length&&endReadable(this),null;var n=t.needReadable;debug("need readable",n),(0===t.length||t.length-e<t.highWaterMark)&&debug("length less than watermark",n=!0),t.ended||t.reading?debug("reading or ended",n=!1):n&&(debug("do read"),t.reading=!0,t.sync=!0,0===t.length&&(t.needReadable=!0),this._read(t.highWaterMark),t.sync=!1,t.reading||(e=howMuchToRead(r,t)));var a;return null===(a=e>0?fromList(e,t):null)?(t.needReadable=!0,e=0):t.length-=e,0===t.length&&(t.ended||(t.needReadable=!0),r!==e&&t.ended&&endReadable(this)),null!==a&&this.emit("data",a),a},Readable.prototype._read=function(e){this.emit("error",new Error("_read() is not implemented"))},Readable.prototype.pipe=function(e,t){function r(t,h){debug("onunpipe"),t===s&&h&&!1===h.hasUnpiped&&(h.hasUnpiped=!0,debug("cleanup"),e.removeListener("close",d),e.removeListener("finish",o),e.removeListener("drain",f),e.removeListener("error",i),e.removeListener("unpipe",r),s.removeListener("end",n),s.removeListener("end",u),s.removeListener("data",a),p=!0,!l.awaitDrain||e._writableState&&!e._writableState.needDrain||f())}function n(){debug("onend"),e.end()}function a(t){debug("ondata"),c=!1;!1!==e.write(t)||c||((1===l.pipesCount&&l.pipes===e||l.pipesCount>1&&-1!==indexOf(l.pipes,e))&&!p&&(debug("false write response, pause",s._readableState.awaitDrain),s._readableState.awaitDrain++,c=!0),s.pause())}function i(t){debug("onerror",t),u(),e.removeListener("error",i),0===EElistenerCount(e,"error")&&e.emit("error",t)}function d(){e.removeListener("finish",o),u()}function o(){debug("onfinish"),e.removeListener("close",d),u()}function u(){debug("unpipe"),s.unpipe(e)}var s=this,l=this._readableState;switch(l.pipesCount){case 0:l.pipes=e;break;case 1:l.pipes=[l.pipes,e];break;default:l.pipes.push(e)}l.pipesCount+=1,debug("pipe count=%d opts=%j",l.pipesCount,t);var h=(!t||!1!==t.end)&&e!==process.stdout&&e!==process.stderr?n:u;l.endEmitted?processNextTick(h):s.once("end",h),e.on("unpipe",r);var f=pipeOnDrain(s);e.on("drain",f);var p=!1,c=!1;return s.on("data",a),prependListener(e,"error",i),e.once("close",d),e.once("finish",o),e.emit("pipe",s),l.flowing||(debug("pipe resume"),s.resume()),e},Readable.prototype.unpipe=function(e){var t=this._readableState,r={hasUnpiped:!1};if(0===t.pipesCount)return this;if(1===t.pipesCount)return e&&e!==t.pipes?this:(e||(e=t.pipes),t.pipes=null,t.pipesCount=0,t.flowing=!1,e&&e.emit("unpipe",this,r),this);if(!e){var n=t.pipes,a=t.pipesCount;t.pipes=null,t.pipesCount=0,t.flowing=!1;for(var i=0;i<a;i++)n[i].emit("unpipe",this,r);return this}var d=indexOf(t.pipes,e);return-1===d?this:(t.pipes.splice(d,1),t.pipesCount-=1,1===t.pipesCount&&(t.pipes=t.pipes[0]),e.emit("unpipe",this,r),this)},Readable.prototype.on=function(e,t){var r=Stream.prototype.on.call(this,e,t);if("data"===e)!1!==this._readableState.flowing&&this.resume();else if("readable"===e){var n=this._readableState;n.endEmitted||n.readableListening||(n.readableListening=n.needReadable=!0,n.emittedReadable=!1,n.reading?n.length&&emitReadable(this):processNextTick(nReadingNextTick,this))}return r},Readable.prototype.addListener=Readable.prototype.on,Readable.prototype.resume=function(){var e=this._readableState;return e.flowing||(debug("resume"),e.flowing=!0,resume(this,e)),this},Readable.prototype.pause=function(){return debug("call pause flowing=%j",this._readableState.flowing),!1!==this._readableState.flowing&&(debug("pause"),this._readableState.flowing=!1,this.emit("pause")),this},Readable.prototype.wrap=function(e){var t=this._readableState,r=!1,n=this;e.on("end",function(){if(debug("wrapped end"),t.decoder&&!t.ended){var e=t.decoder.end();e&&e.length&&n.push(e)}n.push(null)}),e.on("data",function(a){if(debug("wrapped data"),t.decoder&&(a=t.decoder.write(a)),(!t.objectMode||null!==a&&void 0!==a)&&(t.objectMode||a&&a.length)){n.push(a)||(r=!0,e.pause())}});for(var a in e)void 0===this[a]&&"function"==typeof e[a]&&(this[a]=function(t){return function(){return e[t].apply(e,arguments)}}(a));for(var i=0;i<kProxyEvents.length;i++)e.on(kProxyEvents[i],n.emit.bind(n,kProxyEvents[i]));return n._read=function(t){debug("wrapped _read",t),r&&(r=!1,e.resume())},n},Readable._fromList=fromList;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./_stream_duplex":202,"./internal/streams/BufferList":207,"./internal/streams/destroy":208,"./internal/streams/stream":209,"_process":193,"core-util-is":122,"events":156,"inherits":174,"isarray":176,"process-nextick-args":192,"safe-buffer":215,"string_decoder/":225,"util":91}],205:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

'use strict';

module.exports = Transform;

var Duplex = require('./_stream_duplex');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(Transform, Duplex);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return stream.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er, data) {
      done(stream, er, data);
    });else done(stream);
  });
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data !== null && data !== undefined) stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}
},{"./_stream_duplex":202,"core-util-is":122,"inherits":174}],206:[function(require,module,exports){
(function (process,global){
"use strict";function WriteReq(e,t,r){this.chunk=e,this.encoding=t,this.callback=r,this.next=null}function CorkedRequest(e){var t=this;this.next=null,this.entry=null,this.finish=function(){onCorkedFinish(t,e)}}function _uint8ArrayToBuffer(e){return Buffer.from(e)}function _isUint8Array(e){return Buffer.isBuffer(e)||e instanceof OurUint8Array}function nop(){}function WritableState(e,t){Duplex=Duplex||require("./_stream_duplex"),e=e||{},this.objectMode=!!e.objectMode,t instanceof Duplex&&(this.objectMode=this.objectMode||!!e.writableObjectMode);var r=e.highWaterMark,i=this.objectMode?16:16384;this.highWaterMark=r||0===r?r:i,this.highWaterMark=Math.floor(this.highWaterMark),this.finalCalled=!1,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1,this.destroyed=!1;var n=!1===e.decodeStrings;this.decodeStrings=!n,this.defaultEncoding=e.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.corked=0,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(e){onwrite(t,e)},this.writecb=null,this.writelen=0,this.bufferedRequest=null,this.lastBufferedRequest=null,this.pendingcb=0,this.prefinished=!1,this.errorEmitted=!1,this.bufferedRequestCount=0,this.corkedRequestsFree=new CorkedRequest(this)}function Writable(e){if(Duplex=Duplex||require("./_stream_duplex"),!(realHasInstance.call(Writable,this)||this instanceof Duplex))return new Writable(e);this._writableState=new WritableState(e,this),this.writable=!0,e&&("function"==typeof e.write&&(this._write=e.write),"function"==typeof e.writev&&(this._writev=e.writev),"function"==typeof e.destroy&&(this._destroy=e.destroy),"function"==typeof e.final&&(this._final=e.final)),Stream.call(this)}function writeAfterEnd(e,t){var r=new Error("write after end");e.emit("error",r),processNextTick(t,r)}function validChunk(e,t,r,i){var n=!0,o=!1;return null===r?o=new TypeError("May not write null values to stream"):"string"==typeof r||void 0===r||t.objectMode||(o=new TypeError("Invalid non-string/buffer chunk")),o&&(e.emit("error",o),processNextTick(i,o),n=!1),n}function decodeChunk(e,t,r){return e.objectMode||!1===e.decodeStrings||"string"!=typeof t||(t=Buffer.from(t,r)),t}function writeOrBuffer(e,t,r,i,n,o){if(!r){var s=decodeChunk(t,i,n);i!==s&&(r=!0,n="buffer",i=s)}var a=t.objectMode?1:i.length;t.length+=a;var f=t.length<t.highWaterMark;if(f||(t.needDrain=!0),t.writing||t.corked){var u=t.lastBufferedRequest;t.lastBufferedRequest={chunk:i,encoding:n,isBuf:r,callback:o,next:null},u?u.next=t.lastBufferedRequest:t.bufferedRequest=t.lastBufferedRequest,t.bufferedRequestCount+=1}else doWrite(e,t,!1,a,i,n,o);return f}function doWrite(e,t,r,i,n,o,s){t.writelen=i,t.writecb=s,t.writing=!0,t.sync=!0,r?e._writev(n,t.onwrite):e._write(n,o,t.onwrite),t.sync=!1}function onwriteError(e,t,r,i,n){--t.pendingcb,r?(processNextTick(n,i),processNextTick(finishMaybe,e,t),e._writableState.errorEmitted=!0,e.emit("error",i)):(n(i),e._writableState.errorEmitted=!0,e.emit("error",i),finishMaybe(e,t))}function onwriteStateUpdate(e){e.writing=!1,e.writecb=null,e.length-=e.writelen,e.writelen=0}function onwrite(e,t){var r=e._writableState,i=r.sync,n=r.writecb;if(onwriteStateUpdate(r),t)onwriteError(e,r,i,t,n);else{var o=needFinish(r);o||r.corked||r.bufferProcessing||!r.bufferedRequest||clearBuffer(e,r),i?asyncWrite(afterWrite,e,r,o,n):afterWrite(e,r,o,n)}}function afterWrite(e,t,r,i){r||onwriteDrain(e,t),t.pendingcb--,i(),finishMaybe(e,t)}function onwriteDrain(e,t){0===t.length&&t.needDrain&&(t.needDrain=!1,e.emit("drain"))}function clearBuffer(e,t){t.bufferProcessing=!0;var r=t.bufferedRequest;if(e._writev&&r&&r.next){var i=t.bufferedRequestCount,n=new Array(i),o=t.corkedRequestsFree;o.entry=r;for(var s=0,a=!0;r;)n[s]=r,r.isBuf||(a=!1),r=r.next,s+=1;n.allBuffers=a,doWrite(e,t,!0,t.length,n,"",o.finish),t.pendingcb++,t.lastBufferedRequest=null,o.next?(t.corkedRequestsFree=o.next,o.next=null):t.corkedRequestsFree=new CorkedRequest(t)}else{for(;r;){var f=r.chunk,u=r.encoding,l=r.callback;if(doWrite(e,t,!1,t.objectMode?1:f.length,f,u,l),r=r.next,t.writing)break}null===r&&(t.lastBufferedRequest=null)}t.bufferedRequestCount=0,t.bufferedRequest=r,t.bufferProcessing=!1}function needFinish(e){return e.ending&&0===e.length&&null===e.bufferedRequest&&!e.finished&&!e.writing}function callFinal(e,t){e._final(function(r){t.pendingcb--,r&&e.emit("error",r),t.prefinished=!0,e.emit("prefinish"),finishMaybe(e,t)})}function prefinish(e,t){t.prefinished||t.finalCalled||("function"==typeof e._final?(t.pendingcb++,t.finalCalled=!0,processNextTick(callFinal,e,t)):(t.prefinished=!0,e.emit("prefinish")))}function finishMaybe(e,t){var r=needFinish(t);return r&&(prefinish(e,t),0===t.pendingcb&&(t.finished=!0,e.emit("finish"))),r}function endWritable(e,t,r){t.ending=!0,finishMaybe(e,t),r&&(t.finished?processNextTick(r):e.once("finish",r)),t.ended=!0,e.writable=!1}function onCorkedFinish(e,t,r){var i=e.entry;for(e.entry=null;i;){var n=i.callback;t.pendingcb--,n(r),i=i.next}t.corkedRequestsFree?t.corkedRequestsFree.next=e:t.corkedRequestsFree=e}var processNextTick=require("process-nextick-args");module.exports=Writable;var Duplex,asyncWrite=!process.browser&&["v0.10","v0.9."].indexOf(process.version.slice(0,5))>-1?setImmediate:processNextTick;Writable.WritableState=WritableState;var util=require("core-util-is");util.inherits=require("inherits");var internalUtil={deprecate:require("util-deprecate")},Stream=require("./internal/streams/stream"),Buffer=require("safe-buffer").Buffer,OurUint8Array=global.Uint8Array||function(){},destroyImpl=require("./internal/streams/destroy");util.inherits(Writable,Stream),WritableState.prototype.getBuffer=function(){for(var e=this.bufferedRequest,t=[];e;)t.push(e),e=e.next;return t},function(){try{Object.defineProperty(WritableState.prototype,"buffer",{get:internalUtil.deprecate(function(){return this.getBuffer()},"_writableState.buffer is deprecated. Use _writableState.getBuffer instead.","DEP0003")})}catch(e){}}();var realHasInstance;"function"==typeof Symbol&&Symbol.hasInstance&&"function"==typeof Function.prototype[Symbol.hasInstance]?(realHasInstance=Function.prototype[Symbol.hasInstance],Object.defineProperty(Writable,Symbol.hasInstance,{value:function(e){return!!realHasInstance.call(this,e)||e&&e._writableState instanceof WritableState}})):realHasInstance=function(e){return e instanceof this},Writable.prototype.pipe=function(){this.emit("error",new Error("Cannot pipe, not readable"))},Writable.prototype.write=function(e,t,r){var i=this._writableState,n=!1,o=_isUint8Array(e)&&!i.objectMode;return o&&!Buffer.isBuffer(e)&&(e=_uint8ArrayToBuffer(e)),"function"==typeof t&&(r=t,t=null),o?t="buffer":t||(t=i.defaultEncoding),"function"!=typeof r&&(r=nop),i.ended?writeAfterEnd(this,r):(o||validChunk(this,i,e,r))&&(i.pendingcb++,n=writeOrBuffer(this,i,o,e,t,r)),n},Writable.prototype.cork=function(){this._writableState.corked++},Writable.prototype.uncork=function(){var e=this._writableState;e.corked&&(e.corked--,e.writing||e.corked||e.finished||e.bufferProcessing||!e.bufferedRequest||clearBuffer(this,e))},Writable.prototype.setDefaultEncoding=function(e){if("string"==typeof e&&(e=e.toLowerCase()),!(["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le","raw"].indexOf((e+"").toLowerCase())>-1))throw new TypeError("Unknown encoding: "+e);return this._writableState.defaultEncoding=e,this},Writable.prototype._write=function(e,t,r){r(new Error("_write() is not implemented"))},Writable.prototype._writev=null,Writable.prototype.end=function(e,t,r){var i=this._writableState;"function"==typeof e?(r=e,e=null,t=null):"function"==typeof t&&(r=t,t=null),null!==e&&void 0!==e&&this.write(e,t),i.corked&&(i.corked=1,this.uncork()),i.ending||i.finished||endWritable(this,i,r)},Object.defineProperty(Writable.prototype,"destroyed",{get:function(){return void 0!==this._writableState&&this._writableState.destroyed},set:function(e){this._writableState&&(this._writableState.destroyed=e)}}),Writable.prototype.destroy=destroyImpl.destroy,Writable.prototype._undestroy=destroyImpl.undestroy,Writable.prototype._destroy=function(e,t){this.end(),t(e)};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./_stream_duplex":202,"./internal/streams/destroy":208,"./internal/streams/stream":209,"_process":193,"core-util-is":122,"inherits":174,"process-nextick-args":192,"safe-buffer":215,"util-deprecate":226}],207:[function(require,module,exports){
'use strict';

/*<replacement>*/

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = require('safe-buffer').Buffer;
/*</replacement>*/

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();
},{"safe-buffer":215}],208:[function(require,module,exports){
'use strict';

/*<replacement>*/

var processNextTick = require('process-nextick-args');
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      processNextTick(emitErrorNT, this, err);
    }
    return;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      processNextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};
},{"process-nextick-args":192}],209:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":156}],210:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":211}],211:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":202,"./lib/_stream_passthrough.js":203,"./lib/_stream_readable.js":204,"./lib/_stream_transform.js":205,"./lib/_stream_writable.js":206}],212:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":211}],213:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":206}],214:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"buffer":120,"dup":50,"hash-base":158,"inherits":174}],215:[function(require,module,exports){
arguments[4][52][0].apply(exports,arguments)
},{"buffer":120,"dup":52}],216:[function(require,module,exports){
arguments[4][60][0].apply(exports,arguments)
},{"dup":60,"safe-buffer":215}],217:[function(require,module,exports){
arguments[4][61][0].apply(exports,arguments)
},{"./sha":218,"./sha1":219,"./sha224":220,"./sha256":221,"./sha384":222,"./sha512":223,"dup":61}],218:[function(require,module,exports){
arguments[4][62][0].apply(exports,arguments)
},{"./hash":216,"dup":62,"inherits":174,"safe-buffer":215}],219:[function(require,module,exports){
arguments[4][63][0].apply(exports,arguments)
},{"./hash":216,"dup":63,"inherits":174,"safe-buffer":215}],220:[function(require,module,exports){
arguments[4][64][0].apply(exports,arguments)
},{"./hash":216,"./sha256":221,"dup":64,"inherits":174,"safe-buffer":215}],221:[function(require,module,exports){
arguments[4][65][0].apply(exports,arguments)
},{"./hash":216,"dup":65,"inherits":174,"safe-buffer":215}],222:[function(require,module,exports){
arguments[4][66][0].apply(exports,arguments)
},{"./hash":216,"./sha512":223,"dup":66,"inherits":174,"safe-buffer":215}],223:[function(require,module,exports){
arguments[4][67][0].apply(exports,arguments)
},{"./hash":216,"dup":67,"inherits":174,"safe-buffer":215}],224:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

}).call(this,require("buffer").Buffer)
},{"buffer":120,"hash-base":158,"inherits":174}],216:[function(require,module,exports){
function copyProps(f,r){for(var e in f)r[e]=f[e]}function SafeBuffer(f,r,e){return Buffer(f,r,e)}var buffer=require("buffer"),Buffer=buffer.Buffer;Buffer.from&&Buffer.alloc&&Buffer.allocUnsafe&&Buffer.allocUnsafeSlow?module.exports=buffer:(copyProps(buffer,exports),exports.Buffer=SafeBuffer),copyProps(Buffer,SafeBuffer),SafeBuffer.from=function(f,r,e){if("number"==typeof f)throw new TypeError("Argument must not be a number");return Buffer(f,r,e)},SafeBuffer.alloc=function(f,r,e){if("number"!=typeof f)throw new TypeError("Argument must be a number");var u=Buffer(f);return void 0!==r?"string"==typeof e?u.fill(r,e):u.fill(r):u.fill(0),u},SafeBuffer.allocUnsafe=function(f){if("number"!=typeof f)throw new TypeError("Argument must be a number");return Buffer(f)},SafeBuffer.allocUnsafeSlow=function(f){if("number"!=typeof f)throw new TypeError("Argument must be a number");return buffer.SlowBuffer(f)};

},{"buffer":120}],217:[function(require,module,exports){
function Hash(t,i){this._block=Buffer.alloc(t),this._finalSize=i,this._blockSize=t,this._len=0}var Buffer=require("safe-buffer").Buffer;Hash.prototype.update=function(t,i){"string"==typeof t&&(i=i||"utf8",t=Buffer.from(t,i));for(var e=this._block,s=this._blockSize,h=t.length,o=this._len,l=0;l<h;){for(var r=o%s,_=Math.min(h-l,s-r),n=0;n<_;n++)e[r+n]=t[l+n];l+=_,(o+=_)%s==0&&this._update(e)}return this._len+=h,this},Hash.prototype.digest=function(t){var i=this._len%this._blockSize;this._block[i]=128,this._block.fill(0,i+1),i>=this._finalSize&&(this._update(this._block),this._block.fill(0));var e=8*this._len;if(e<=4294967295)this._block.writeUInt32BE(e,this._blockSize-4);else{var s=4294967295&e,h=(e-s)/4294967296;this._block.writeUInt32BE(h,this._blockSize-8),this._block.writeUInt32BE(s,this._blockSize-4)}this._update(this._block);var o=this._hash();return t?o.toString(t):o},Hash.prototype._update=function(){throw new Error("_update must be implemented by subclass")},module.exports=Hash;

},{"safe-buffer":216}],218:[function(require,module,exports){
var exports=module.exports=function(e){e=e.toLowerCase();var r=exports[e];if(!r)throw new Error(e+" is not supported (we accept pull requests)");return new r};exports.sha=require("./sha"),exports.sha1=require("./sha1"),exports.sha224=require("./sha224"),exports.sha256=require("./sha256"),exports.sha384=require("./sha384"),exports.sha512=require("./sha512");

},{"./sha":219,"./sha1":220,"./sha224":221,"./sha256":222,"./sha384":223,"./sha512":224}],219:[function(require,module,exports){
function Sha(){this.init(),this._w=W,Hash.call(this,64,56)}function rotl5(t){return t<<5|t>>>27}function rotl30(t){return t<<30|t>>>2}function ft(t,i,r,h){return 0===t?i&r|~i&h:2===t?i&r|i&h|r&h:i^r^h}var inherits=require("inherits"),Hash=require("./hash"),Buffer=require("safe-buffer").Buffer,K=[1518500249,1859775393,-1894007588,-899497514],W=new Array(80);inherits(Sha,Hash),Sha.prototype.init=function(){return this._a=1732584193,this._b=4023233417,this._c=2562383102,this._d=271733878,this._e=3285377520,this},Sha.prototype._update=function(t){for(var i=this._w,r=0|this._a,h=0|this._b,s=0|this._c,e=0|this._d,n=0|this._e,_=0;_<16;++_)i[_]=t.readInt32BE(4*_);for(;_<80;++_)i[_]=i[_-3]^i[_-8]^i[_-14]^i[_-16];for(var a=0;a<80;++a){var o=~~(a/20),f=rotl5(r)+ft(o,h,s,e)+n+i[a]+K[o]|0;n=e,e=s,s=rotl30(h),h=r,r=f}this._a=r+this._a|0,this._b=h+this._b|0,this._c=s+this._c|0,this._d=e+this._d|0,this._e=n+this._e|0},Sha.prototype._hash=function(){var t=Buffer.allocUnsafe(20);return t.writeInt32BE(0|this._a,0),t.writeInt32BE(0|this._b,4),t.writeInt32BE(0|this._c,8),t.writeInt32BE(0|this._d,12),t.writeInt32BE(0|this._e,16),t},module.exports=Sha;

},{"./hash":217,"inherits":174,"safe-buffer":216}],220:[function(require,module,exports){
function Sha1(){this.init(),this._w=W,Hash.call(this,64,56)}function rotl1(t){return t<<1|t>>>31}function rotl5(t){return t<<5|t>>>27}function rotl30(t){return t<<30|t>>>2}function ft(t,i,r,h){return 0===t?i&r|~i&h:2===t?i&r|i&h|r&h:i^r^h}var inherits=require("inherits"),Hash=require("./hash"),Buffer=require("safe-buffer").Buffer,K=[1518500249,1859775393,-1894007588,-899497514],W=new Array(80);inherits(Sha1,Hash),Sha1.prototype.init=function(){return this._a=1732584193,this._b=4023233417,this._c=2562383102,this._d=271733878,this._e=3285377520,this},Sha1.prototype._update=function(t){for(var i=this._w,r=0|this._a,h=0|this._b,s=0|this._c,e=0|this._d,n=0|this._e,_=0;_<16;++_)i[_]=t.readInt32BE(4*_);for(;_<80;++_)i[_]=rotl1(i[_-3]^i[_-8]^i[_-14]^i[_-16]);for(var a=0;a<80;++a){var o=~~(a/20),f=rotl5(r)+ft(o,h,s,e)+n+i[a]+K[o]|0;n=e,e=s,s=rotl30(h),h=r,r=f}this._a=r+this._a|0,this._b=h+this._b|0,this._c=s+this._c|0,this._d=e+this._d|0,this._e=n+this._e|0},Sha1.prototype._hash=function(){var t=Buffer.allocUnsafe(20);return t.writeInt32BE(0|this._a,0),t.writeInt32BE(0|this._b,4),t.writeInt32BE(0|this._c,8),t.writeInt32BE(0|this._d,12),t.writeInt32BE(0|this._e,16),t},module.exports=Sha1;

},{"./hash":217,"inherits":174,"safe-buffer":216}],221:[function(require,module,exports){
function Sha224(){this.init(),this._w=W,Hash.call(this,64,56)}var inherits=require("inherits"),Sha256=require("./sha256"),Hash=require("./hash"),Buffer=require("safe-buffer").Buffer,W=new Array(64);inherits(Sha224,Sha256),Sha224.prototype.init=function(){return this._a=3238371032,this._b=914150663,this._c=812702999,this._d=4144912697,this._e=4290775857,this._f=1750603025,this._g=1694076839,this._h=3204075428,this},Sha224.prototype._hash=function(){var t=Buffer.allocUnsafe(28);return t.writeInt32BE(this._a,0),t.writeInt32BE(this._b,4),t.writeInt32BE(this._c,8),t.writeInt32BE(this._d,12),t.writeInt32BE(this._e,16),t.writeInt32BE(this._f,20),t.writeInt32BE(this._g,24),t},module.exports=Sha224;

},{"./hash":217,"./sha256":222,"inherits":174,"safe-buffer":216}],222:[function(require,module,exports){
function Sha256(){this.init(),this._w=W,Hash.call(this,64,56)}function ch(t,i,h){return h^t&(i^h)}function maj(t,i,h){return t&i|h&(t|i)}function sigma0(t){return(t>>>2|t<<30)^(t>>>13|t<<19)^(t>>>22|t<<10)}function sigma1(t){return(t>>>6|t<<26)^(t>>>11|t<<21)^(t>>>25|t<<7)}function gamma0(t){return(t>>>7|t<<25)^(t>>>18|t<<14)^t>>>3}function gamma1(t){return(t>>>17|t<<15)^(t>>>19|t<<13)^t>>>10}var inherits=require("inherits"),Hash=require("./hash"),Buffer=require("safe-buffer").Buffer,K=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],W=new Array(64);inherits(Sha256,Hash),Sha256.prototype.init=function(){return this._a=1779033703,this._b=3144134277,this._c=1013904242,this._d=2773480762,this._e=1359893119,this._f=2600822924,this._g=528734635,this._h=1541459225,this},Sha256.prototype._update=function(t){for(var i=this._w,h=0|this._a,s=0|this._b,r=0|this._c,e=0|this._d,n=0|this._e,_=0|this._f,a=0|this._g,f=0|this._h,u=0;u<16;++u)i[u]=t.readInt32BE(4*u);for(;u<64;++u)i[u]=gamma1(i[u-2])+i[u-7]+gamma0(i[u-15])+i[u-16]|0;for(var o=0;o<64;++o){var c=f+sigma1(n)+ch(n,_,a)+K[o]+i[o]|0,m=sigma0(h)+maj(h,s,r)|0;f=a,a=_,_=n,n=e+c|0,e=r,r=s,s=h,h=c+m|0}this._a=h+this._a|0,this._b=s+this._b|0,this._c=r+this._c|0,this._d=e+this._d|0,this._e=n+this._e|0,this._f=_+this._f|0,this._g=a+this._g|0,this._h=f+this._h|0},Sha256.prototype._hash=function(){var t=Buffer.allocUnsafe(32);return t.writeInt32BE(this._a,0),t.writeInt32BE(this._b,4),t.writeInt32BE(this._c,8),t.writeInt32BE(this._d,12),t.writeInt32BE(this._e,16),t.writeInt32BE(this._f,20),t.writeInt32BE(this._g,24),t.writeInt32BE(this._h,28),t},module.exports=Sha256;

},{"./hash":217,"inherits":174,"safe-buffer":216}],223:[function(require,module,exports){
function Sha384(){this.init(),this._w=W,Hash.call(this,128,112)}var inherits=require("inherits"),SHA512=require("./sha512"),Hash=require("./hash"),Buffer=require("safe-buffer").Buffer,W=new Array(160);inherits(Sha384,SHA512),Sha384.prototype.init=function(){return this._ah=3418070365,this._bh=1654270250,this._ch=2438529370,this._dh=355462360,this._eh=1731405415,this._fh=2394180231,this._gh=3675008525,this._hh=1203062813,this._al=3238371032,this._bl=914150663,this._cl=812702999,this._dl=4144912697,this._el=4290775857,this._fl=1750603025,this._gl=1694076839,this._hl=3204075428,this},Sha384.prototype._hash=function(){function h(h,t,s){i.writeInt32BE(h,s),i.writeInt32BE(t,s+4)}var i=Buffer.allocUnsafe(48);return h(this._ah,this._al,0),h(this._bh,this._bl,8),h(this._ch,this._cl,16),h(this._dh,this._dl,24),h(this._eh,this._el,32),h(this._fh,this._fl,40),i},module.exports=Sha384;

},{"./hash":217,"./sha512":224,"inherits":174,"safe-buffer":216}],224:[function(require,module,exports){
function Sha512(){this.init(),this._w=W,Hash.call(this,128,112)}function Ch(h,t,i){return i^h&(t^i)}function maj(h,t,i){return h&t|i&(h|t)}function sigma0(h,t){return(h>>>28|t<<4)^(t>>>2|h<<30)^(t>>>7|h<<25)}function sigma1(h,t){return(h>>>14|t<<18)^(h>>>18|t<<14)^(t>>>9|h<<23)}function Gamma0(h,t){return(h>>>1|t<<31)^(h>>>8|t<<24)^h>>>7}function Gamma0l(h,t){return(h>>>1|t<<31)^(h>>>8|t<<24)^(h>>>7|t<<25)}function Gamma1(h,t){return(h>>>19|t<<13)^(t>>>29|h<<3)^h>>>6}function Gamma1l(h,t){return(h>>>19|t<<13)^(t>>>29|h<<3)^(h>>>6|t<<26)}function getCarry(h,t){return h>>>0<t>>>0?1:0}var inherits=require("inherits"),Hash=require("./hash"),Buffer=require("safe-buffer").Buffer,K=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591],W=new Array(160);inherits(Sha512,Hash),Sha512.prototype.init=function(){return this._ah=1779033703,this._bh=3144134277,this._ch=1013904242,this._dh=2773480762,this._eh=1359893119,this._fh=2600822924,this._gh=528734635,this._hh=1541459225,this._al=4089235720,this._bl=2227873595,this._cl=4271175723,this._dl=1595750129,this._el=2917565137,this._fl=725511199,this._gl=4215389547,this._hl=327033209,this},Sha512.prototype._update=function(h){for(var t=this._w,i=0|this._ah,s=0|this._bh,r=0|this._ch,_=0|this._dh,a=0|this._eh,e=0|this._fh,l=0|this._gh,n=0|this._hh,f=0|this._al,g=0|this._bl,u=0|this._cl,c=0|this._dl,m=0|this._el,o=0|this._fl,y=0|this._gl,C=0|this._hl,d=0;d<32;d+=2)t[d]=h.readInt32BE(4*d),t[d+1]=h.readInt32BE(4*d+4);for(;d<160;d+=2){var b=t[d-30],p=t[d-30+1],G=Gamma0(b,p),v=Gamma0l(p,b),B=Gamma1(b=t[d-4],p=t[d-4+1]),S=Gamma1l(p,b),w=t[d-14],E=t[d-14+1],I=t[d-32],j=t[d-32+1],q=v+E|0,H=G+w+getCarry(q,v)|0;H=(H=H+B+getCarry(q=q+S|0,S)|0)+I+getCarry(q=q+j|0,j)|0,t[d]=H,t[d+1]=q}for(var W=0;W<160;W+=2){H=t[W],q=t[W+1];var x=maj(i,s,r),A=maj(f,g,u),U=sigma0(i,f),k=sigma0(f,i),z=sigma1(a,m),D=sigma1(m,a),F=K[W],J=K[W+1],L=Ch(a,e,l),M=Ch(m,o,y),N=C+D|0,O=n+z+getCarry(N,C)|0;O=(O=(O=O+L+getCarry(N=N+M|0,M)|0)+F+getCarry(N=N+J|0,J)|0)+H+getCarry(N=N+q|0,q)|0;var P=k+A|0,Q=U+x+getCarry(P,k)|0;n=l,C=y,l=e,y=o,e=a,o=m,a=_+O+getCarry(m=c+N|0,c)|0,_=r,c=u,r=s,u=g,s=i,g=f,i=O+Q+getCarry(f=N+P|0,N)|0}this._al=this._al+f|0,this._bl=this._bl+g|0,this._cl=this._cl+u|0,this._dl=this._dl+c|0,this._el=this._el+m|0,this._fl=this._fl+o|0,this._gl=this._gl+y|0,this._hl=this._hl+C|0,this._ah=this._ah+i+getCarry(this._al,f)|0,this._bh=this._bh+s+getCarry(this._bl,g)|0,this._ch=this._ch+r+getCarry(this._cl,u)|0,this._dh=this._dh+_+getCarry(this._dl,c)|0,this._eh=this._eh+a+getCarry(this._el,m)|0,this._fh=this._fh+e+getCarry(this._fl,o)|0,this._gh=this._gh+l+getCarry(this._gl,y)|0,this._hh=this._hh+n+getCarry(this._hl,C)|0},Sha512.prototype._hash=function(){function h(h,i,s){t.writeInt32BE(h,s),t.writeInt32BE(i,s+4)}var t=Buffer.allocUnsafe(64);return h(this._ah,this._al,0),h(this._bh,this._bl,8),h(this._ch,this._cl,16),h(this._dh,this._dl,24),h(this._eh,this._el,32),h(this._fh,this._fl,40),h(this._gh,this._gl,48),h(this._hh,this._hl,56),t},module.exports=Sha512;

},{"./hash":217,"inherits":174,"safe-buffer":216}],225:[function(require,module,exports){
function Stream(){EE.call(this)}module.exports=Stream;var EE=require("events").EventEmitter,inherits=require("inherits");inherits(Stream,EE),Stream.Readable=require("readable-stream/readable.js"),Stream.Writable=require("readable-stream/writable.js"),Stream.Duplex=require("readable-stream/duplex.js"),Stream.Transform=require("readable-stream/transform.js"),Stream.PassThrough=require("readable-stream/passthrough.js"),Stream.Stream=Stream,Stream.prototype.pipe=function(e,r){function t(r){e.writable&&!1===e.write(r)&&m.pause&&m.pause()}function n(){m.readable&&m.resume&&m.resume()}function a(){u||(u=!0,e.end())}function o(){u||(u=!0,"function"==typeof e.destroy&&e.destroy())}function i(e){if(s(),0===EE.listenerCount(this,"error"))throw e}function s(){m.removeListener("data",t),e.removeListener("drain",n),m.removeListener("end",a),m.removeListener("close",o),m.removeListener("error",i),e.removeListener("error",i),m.removeListener("end",s),m.removeListener("close",s),e.removeListener("close",s)}var m=this;m.on("data",t),e.on("drain",n),e._isStdio||r&&!1===r.end||(m.on("end",a),m.on("close",o));var u=!1;return m.on("error",i),e.on("error",i),m.on("end",s),m.on("close",s),e.on("close",s),e.emit("pipe",m),e};

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":156,"inherits":174,"readable-stream/duplex.js":201,"readable-stream/passthrough.js":210,"readable-stream/readable.js":211,"readable-stream/transform.js":212,"readable-stream/writable.js":213}],225:[function(require,module,exports){
'use strict';

var Buffer = require('safe-buffer').Buffer;

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return -1;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// UTF-8 replacement characters ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd'.repeat(p);
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd'.repeat(p + 1);
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd'.repeat(p + 2);
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character for each buffered byte of a (partial)
// character needs to be added to the output.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd'.repeat(this.lastTotal - this.lastNeed);
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}
},{"safe-buffer":215}],226:[function(require,module,exports){
(function (global){
function deprecate(r,e){if(config("noDeprecation"))return r;var o=!1;return function(){if(!o){if(config("throwDeprecation"))throw new Error(e);config("traceDeprecation")?console.trace(e):console.warn(e),o=!0}return r.apply(this,arguments)}}function config(r){try{if(!global.localStorage)return!1}catch(r){return!1}var e=global.localStorage[r];return null!=e&&"true"===String(e).toLowerCase()}module.exports=deprecate;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],227:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"dup":40}],228:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],229:[function(require,module,exports){
(function (process,global){
function inspect(e,r){var t={seen:[],stylize:stylizeNoColor};return arguments.length>=3&&(t.depth=arguments[2]),arguments.length>=4&&(t.colors=arguments[3]),isBoolean(r)?t.showHidden=r:r&&exports._extend(t,r),isUndefined(t.showHidden)&&(t.showHidden=!1),isUndefined(t.depth)&&(t.depth=2),isUndefined(t.colors)&&(t.colors=!1),isUndefined(t.customInspect)&&(t.customInspect=!0),t.colors&&(t.stylize=stylizeWithColor),formatValue(t,e,t.depth)}function stylizeWithColor(e,r){var t=inspect.styles[r];return t?"["+inspect.colors[t][0]+"m"+e+"["+inspect.colors[t][1]+"m":e}function stylizeNoColor(e,r){return e}function arrayToHash(e){var r={};return e.forEach(function(e,t){r[e]=!0}),r}function formatValue(e,r,t){if(e.customInspect&&r&&isFunction(r.inspect)&&r.inspect!==exports.inspect&&(!r.constructor||r.constructor.prototype!==r)){var n=r.inspect(t,e);return isString(n)||(n=formatValue(e,n,t)),n}var i=formatPrimitive(e,r);if(i)return i;var o=Object.keys(r),s=arrayToHash(o);if(e.showHidden&&(o=Object.getOwnPropertyNames(r)),isError(r)&&(o.indexOf("message")>=0||o.indexOf("description")>=0))return formatError(r);if(0===o.length){if(isFunction(r)){var u=r.name?": "+r.name:"";return e.stylize("[Function"+u+"]","special")}if(isRegExp(r))return e.stylize(RegExp.prototype.toString.call(r),"regexp");if(isDate(r))return e.stylize(Date.prototype.toString.call(r),"date");if(isError(r))return formatError(r)}var c="",a=!1,l=["{","}"];if(isArray(r)&&(a=!0,l=["[","]"]),isFunction(r)){c=" [Function"+(r.name?": "+r.name:"")+"]"}if(isRegExp(r)&&(c=" "+RegExp.prototype.toString.call(r)),isDate(r)&&(c=" "+Date.prototype.toUTCString.call(r)),isError(r)&&(c=" "+formatError(r)),0===o.length&&(!a||0==r.length))return l[0]+c+l[1];if(t<0)return isRegExp(r)?e.stylize(RegExp.prototype.toString.call(r),"regexp"):e.stylize("[Object]","special");e.seen.push(r);var p;return p=a?formatArray(e,r,t,s,o):o.map(function(n){return formatProperty(e,r,t,s,n,a)}),e.seen.pop(),reduceToSingleString(p,c,l)}function formatPrimitive(e,r){if(isUndefined(r))return e.stylize("undefined","undefined");if(isString(r)){var t="'"+JSON.stringify(r).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(t,"string")}return isNumber(r)?e.stylize(""+r,"number"):isBoolean(r)?e.stylize(""+r,"boolean"):isNull(r)?e.stylize("null","null"):void 0}function formatError(e){return"["+Error.prototype.toString.call(e)+"]"}function formatArray(e,r,t,n,i){for(var o=[],s=0,u=r.length;s<u;++s)hasOwnProperty(r,String(s))?o.push(formatProperty(e,r,t,n,String(s),!0)):o.push("");return i.forEach(function(i){i.match(/^\d+$/)||o.push(formatProperty(e,r,t,n,i,!0))}),o}function formatProperty(e,r,t,n,i,o){var s,u,c;if((c=Object.getOwnPropertyDescriptor(r,i)||{value:r[i]}).get?u=c.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):c.set&&(u=e.stylize("[Setter]","special")),hasOwnProperty(n,i)||(s="["+i+"]"),u||(e.seen.indexOf(c.value)<0?(u=isNull(t)?formatValue(e,c.value,null):formatValue(e,c.value,t-1)).indexOf("\n")>-1&&(u=o?u.split("\n").map(function(e){return"  "+e}).join("\n").substr(2):"\n"+u.split("\n").map(function(e){return"   "+e}).join("\n")):u=e.stylize("[Circular]","special")),isUndefined(s)){if(o&&i.match(/^\d+$/))return u;(s=JSON.stringify(""+i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(s=s.substr(1,s.length-2),s=e.stylize(s,"name")):(s=s.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),s=e.stylize(s,"string"))}return s+": "+u}function reduceToSingleString(e,r,t){var n=0;return e.reduce(function(e,r){return n++,r.indexOf("\n")>=0&&n++,e+r.replace(/\u001b\[\d\d?m/g,"").length+1},0)>60?t[0]+(""===r?"":r+"\n ")+" "+e.join(",\n  ")+" "+t[1]:t[0]+r+" "+e.join(", ")+" "+t[1]}function isArray(e){return Array.isArray(e)}function isBoolean(e){return"boolean"==typeof e}function isNull(e){return null===e}function isNullOrUndefined(e){return null==e}function isNumber(e){return"number"==typeof e}function isString(e){return"string"==typeof e}function isSymbol(e){return"symbol"==typeof e}function isUndefined(e){return void 0===e}function isRegExp(e){return isObject(e)&&"[object RegExp]"===objectToString(e)}function isObject(e){return"object"==typeof e&&null!==e}function isDate(e){return isObject(e)&&"[object Date]"===objectToString(e)}function isError(e){return isObject(e)&&("[object Error]"===objectToString(e)||e instanceof Error)}function isFunction(e){return"function"==typeof e}function isPrimitive(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||void 0===e}function objectToString(e){return Object.prototype.toString.call(e)}function pad(e){return e<10?"0"+e.toString(10):e.toString(10)}function timestamp(){var e=new Date,r=[pad(e.getHours()),pad(e.getMinutes()),pad(e.getSeconds())].join(":");return[e.getDate(),months[e.getMonth()],r].join(" ")}function hasOwnProperty(e,r){return Object.prototype.hasOwnProperty.call(e,r)}var formatRegExp=/%[sdj%]/g;exports.format=function(e){if(!isString(e)){for(var r=[],t=0;t<arguments.length;t++)r.push(inspect(arguments[t]));return r.join(" ")}for(var t=1,n=arguments,i=n.length,o=String(e).replace(formatRegExp,function(e){if("%%"===e)return"%";if(t>=i)return e;switch(e){case"%s":return String(n[t++]);case"%d":return Number(n[t++]);case"%j":try{return JSON.stringify(n[t++])}catch(e){return"[Circular]"}default:return e}}),s=n[t];t<i;s=n[++t])isNull(s)||!isObject(s)?o+=" "+s:o+=" "+inspect(s);return o},exports.deprecate=function(e,r){if(isUndefined(global.process))return function(){return exports.deprecate(e,r).apply(this,arguments)};if(!0===process.noDeprecation)return e;var t=!1;return function(){if(!t){if(process.throwDeprecation)throw new Error(r);process.traceDeprecation?console.trace(r):console.error(r),t=!0}return e.apply(this,arguments)}};var debugEnviron,debugs={};exports.debuglog=function(e){if(isUndefined(debugEnviron)&&(debugEnviron=process.env.NODE_DEBUG||""),e=e.toUpperCase(),!debugs[e])if(new RegExp("\\b"+e+"\\b","i").test(debugEnviron)){var r=process.pid;debugs[e]=function(){var t=exports.format.apply(exports,arguments);console.error("%s %d: %s",e,r,t)}}else debugs[e]=function(){};return debugs[e]},exports.inspect=inspect,inspect.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},inspect.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},exports.isArray=isArray,exports.isBoolean=isBoolean,exports.isNull=isNull,exports.isNullOrUndefined=isNullOrUndefined,exports.isNumber=isNumber,exports.isString=isString,exports.isSymbol=isSymbol,exports.isUndefined=isUndefined,exports.isRegExp=isRegExp,exports.isObject=isObject,exports.isDate=isDate,exports.isError=isError,exports.isFunction=isFunction,exports.isPrimitive=isPrimitive,exports.isBuffer=require("./support/isBuffer");var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];exports.log=function(){console.log("%s - %s",timestamp(),exports.format.apply(exports,arguments))},exports.inherits=require("inherits"),exports._extend=function(e,r){if(!r||!isObject(r))return e;for(var t=Object.keys(r),n=t.length;n--;)e[t[n]]=r[t[n]];return e};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":228,"_process":193,"inherits":227}],230:[function(require,module,exports){
var indexOf = require('indexof');

},{"indexof":173}],"keystore":[function(require,module,exports){
(function (Buffer){
"use strict";const crypto=require("crypto"),scrypt=require("scryptsy"),ethereuUtil=require("ethereumjs-util"),uuid=require("uuid/v4"),decrypt=require("./decrypt.js"),kdf="scrypt";exports.decryptKeystoreToPkey=((e,r)=>{let t;const s=JSON.parse(e);switch(this.determineKeystoreType(e)){case"presale":t=this.decryptPresaleToPrivKey(e,r);break;case"v1-unencrypted":t=Buffer.from(s.private,"hex");break;case"v1-encrypted":t=this.decryptMewV1ToPrivKey(e,r);break;case"v2-unencrypted":t=Buffer.from(s.privKey,"hex");break;case"v2-v3-utc":t=this.decryptUtcKeystoreToPkey(e,r);break;default:return new Error("unrecognized type of keystore")}return t}),exports.pkeyToKeystore=((e,r,t)=>{const s=crypto.randomBytes(32),c=crypto.randomBytes(16),o={dklen:32,salt:s.toString("hex")};o.n=1024,o.r=8,o.p=1;const p=scrypt(new Buffer(t),s,o.n,o.r,o.p,o.dklen),n=crypto.createCipheriv("aes-128-ctr",p.slice(0,16),c);if(!n)throw new Error("Unsupported cipher");const i=Buffer.concat([n.update(e),n.final()]),a=ethereuUtil.sha3(Buffer.concat([p.slice(16,32),new Buffer(i,"hex")]));return{version:3,id:uuid({random:crypto.randomBytes(16)}),address:r,Crypto:{ciphertext:i.toString("hex"),cipherparams:{iv:c.toString("hex")},cipher:"aes-128-ctr",kdf:kdf,kdfparams:o,mac:a.toString("hex")}}}),exports.decryptUtcKeystoreToPkey=((e,r)=>{const t=JSON.parse(e.toLowerCase());if(3!==t.version)throw new Error("Not a V3 wallet");let s,c;if("scrypt"===t.crypto.kdf)c=t.crypto.kdfparams,s=scrypt(new Buffer(r),new Buffer(c.salt,"hex"),c.n,c.r,c.p,c.dklen);else{if("pbkdf2"!==t.crypto.kdf)throw new Error("Unsupported key derivation scheme");if("hmac-sha256"!==(c=t.crypto.kdfparams).prf)throw new Error("Unsupported parameters to PBKDF2");s=crypto.pbkdf2Sync(new Buffer(r),new Buffer(c.salt,"hex"),c.c,c.dklen,"sha256")}const o=new Buffer(t.crypto.ciphertext,"hex");if(ethereuUtil.sha3(Buffer.concat([s.slice(16,32),o])).toString("hex")!==t.crypto.mac)throw new Error("Key derivation failed - possibly wrong passphrase");const p=crypto.createDecipheriv(t.crypto.cipher,s.slice(0,16),new Buffer(t.crypto.cipherparams.iv,"hex"));let n=decrypt.decipherBuffer(p,o);for(;n.length<32;){const e=new Buffer([0]);n=Buffer.concat([e,n])}return n}),exports.determineKeystoreType=(e=>{const r=JSON.parse(e);if(r.encseed)return"presale";if(r.Crypto||r.crypto)return"v2-v3-utc";if(r.hash&&!0===r.locked)return"v1-encrypted";if(r.hash&&!1===r.locked)return"v1-unencrypted";if("MyEtherWallet"===r.publisher)return"v2-unencrypted";throw new Error("Invalid keystore")}),exports.decryptPresaleToPrivKey=((e,r)=>{const t=JSON.parse(e),s=new Buffer(t.encseed,"hex"),c=crypto.pbkdf2Sync(new Buffer(r),new Buffer(r),2e3,32,"sha256").slice(0,16),o=crypto.createDecipheriv("aes-128-cbc",c,s.slice(0,16)),p=decrypt.decipherBuffer(o,s.slice(16)),n=ethereuUtil.sha3(p);if(ethereuUtil.privateToAddress(n).toString("hex")!==t.ethaddr)throw new Error("Decoded key mismatch - possibly wrong passphrase");return n}),exports.decryptMewV1ToPrivKey=((e,r)=>{const t=JSON.parse(e);let s;if("string"!=typeof r)throw new Error("Password required");if(r.length<9)throw new Error("Password must be at least 9 characters");let c=t.encrypted?t.private.slice(0,128):t.private;c=decrypt.decodeCryptojsSalt(c);const o=decrypt.evp_kdf(new Buffer(r),c.salt,{keysize:32,ivsize:16}),p=crypto.createDecipheriv("aes-256-cbc",o.key,o.iv);if(s=decrypt.decipherBuffer(p,new Buffer(c.ciphertext)),s=new Buffer(s.toString(),"hex"),"0x"+ethereuUtil.privateToAddress(s).toString("hex")!==t.address)throw new Error("Invalid private key or address");return s}),exports.isKeystorePassRequired=(e=>{switch(this.determineKeystoreType(e)){case"presale":return!0;case"v1-unencrypted":return!1;case"v1-encrypted":return!0;case"v2-unencrypted":return!1;case"v2-v3-utc":return!0;default:return!1}});

}).call(this,require("buffer").Buffer)
},{"./decrypt.js":72,"buffer":120,"crypto":129,"ethereumjs-util":24,"scryptsy":53,"uuid/v4":71}]},{},[]);
