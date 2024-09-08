import Script from "next/script";

const PUBLISHER_ID = "1513283119557667";
const NONCE_VALUE = "fh1sK8KcLkati2v7UkBnbA";

export const GoogleAdScript = () => {
  if (process.env.VERCEL_ENV === "production") {
    return (
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${PUBLISHER_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    );
  }
  return <></>;
};

export const AdBlockRecoveryScript = () => {
  if (process.env.VERCEL_ENV === "production") {
    return (
      <>
        {/* Google AdSense Funding Choices Script */}
        <Script
          async
          src={`https://fundingchoicesmessages.google.com/i/pub-${PUBLISHER_ID}?ers=1`}
          nonce={NONCE_VALUE}
          strategy="beforeInteractive"
        />
        <Script
          id="googlefcPresent"
          nonce={NONCE_VALUE}
          strategy="beforeInteractive"
        >
          {`(function() {
              function signalGooglefcPresent() {
                if (!window.frames['googlefcPresent']) {
                  if (document.body) {
                    const iframe = document.createElement('iframe');
                    iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;';
                    iframe.style.display = 'none';
                    iframe.name = 'googlefcPresent';
                    document.body.appendChild(iframe);
                  } else {
                    setTimeout(signalGooglefcPresent, 0);
                  }
                }
              }
              signalGooglefcPresent();
            })();`}
        </Script>
      </>
    );
  }
};

export const AdBlockWarning = () => {
  if (process.env.VERCEL_ENV === "production") {
    return (
      <Script
        id="custom-script"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(){'use strict';function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}var ba=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};
          function ca(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");}var da=ca(this);function l(a,b){if(b)a:{var c=da;a=a.split(".");for(var d=0;d<a.length-1;d++){var e=a[d];if(!(e in c))break a;c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&b!=null&&ba(c,a,{configurable:!0,writable:!0,value:b})}}
          function ea(a){return a.raw=a}function n(a){var b=typeof Symbol!="undefined"&&Symbol.iterator&&a[Symbol.iterator];if(b)return b.call(a);if(typeof a.length=="number")return{next:aa(a)};throw Error(String(a)+" is not an iterable or ArrayLike");}function fa(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c}var ha=typeof Object.create=="function"?Object.create:function(a){function b(){}b.prototype=a;return new b},p;
          if(typeof Object.setPrototypeOf=="function")p=Object.setPrototypeOf;else{var q;a:{var ja={a:!0},ka={};try{ka.__proto__=ja;q=ka.a;break a}catch(a){}q=!1}p=q?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var la=p;
          function t(a,b){a.prototype=ha(b.prototype);a.prototype.constructor=a;if(la)la(a,b);else for(var c in b)if(c!="prototype")if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.A=b.prototype}function ma(){for(var a=Number(this),b=[],c=a;c<arguments.length;c++)b[c-a]=arguments[c];return b}l("Object.is",function(a){return a?a:function(b,c){return b===c?b!==0||1/b===1/c:b!==b&&c!==c}});
          l("Array.prototype.includes",function(a){return a?a:function(b,c){var d=this;d instanceof String&&(d=String(d));var e=d.length;c=c||0;for(c<0&&(c=Math.max(c+e,0));c<e;c++){var f=d[c];if(f===b||Object.is(f,b))return!0}return!1}});
          l("String.prototype.includes",function(a){return a?a:function(b,c){if(this==null)throw new TypeError("The 'this' value for String.prototype.includes must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype.includes must not be a regular expression");return this.indexOf(b,c||0)!==-1}});l("Number.MAX_SAFE_INTEGER",function(){return 9007199254740991});
          l("Number.isFinite",function(a){return a?a:function(b){return typeof b!=="number"?!1:!isNaN(b)&&b!==Infinity&&b!==-Infinity}});l("Number.isInteger",function(a){return a?a:function(b){return Number.isFinite(b)?b===Math.floor(b):!1}});l("Number.isSafeInteger",function(a){return a?a:function(b){return Number.isInteger(b)&&Math.abs(b)<=Number.MAX_SAFE_INTEGER}});
          l("Math.trunc",function(a){return a?a:function(b){b=Number(b);if(isNaN(b)||b===Infinity||b===-Infinity||b===0)return b;var c=Math.floor(Math.abs(b));return b<0?-c:c}});...`,
        }}
      />
    );
  }
};
