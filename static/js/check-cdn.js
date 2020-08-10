(function(window,doc){
  if(!doc)doc = window.document
  var Vendors = [
    { name: "Vue", src: "/static/vendor/vue/vue.min.js", version: "2.6.11" },
    { name: "Vuex", src: "/static/vendor/vuex/vuex.min.js", version: "3.1.2" },
    {
      name: "VueI18n",
      src: "/static/vendor/vue-i18n/vue-i18n.min.js",
      version: "8.15.3"
    },
    {
      name: "VueRouter",
      src: "/static/vendor/vue-router/vue-router.min.js",
      version: "3.1.3"
    },
    { name: "jQuery", src: "/static/vendor/jquery.min.js", version: "3.5.1" },
    { name: "idb", src: "/static/vendor/idb.js", version: "3.0.2" },
    { name: "BasViewJson", src: "/static/js/abis/all.js", version: "0.0.3" },
    { name: "Web3", src: "/static/js/web3.min.js", version: "1.2.7" },
    // { name: "Web3", src: "/static/vendor/web3/web3-1.2.10.min.js", version: "1.2.10" },
    {
      name: "numeral",
      ignore:false ,
      src: [
        "/static/vendor/numeral/numeral.min.js",
        "/static/vendor/numeral/locales.min.js"
      ],
      version: "2.0.6"
    },
    {
      name: "ClipboardJS",
      src: "/static/vendor/clipboard.js-2.0.6/clipboard.min.js",
      version: "2.0.4"
    },
    { name: "Cookies", src: "/static/vendor/js.cookie.js", version: "2.2.1" },
    {
      name: "axios",
      src: "/static/vendor/axios/axios.min.js",
      version: "0.19.2"
    },
    { name: "_", src: "/static/vendor/lodash.min.js", version: "4.17.15" },
    {
      name: "BootstrapVue",
      src: "/static/vendor/bootstrap-vue/bootstrap-vue.min.js",
      version: "2.16.0"
    },
    {
      name: "BootstrapVueIcons",
      src: "/static/vendor/bootstrap-vue/bootstrap-vue-icons.min.js",
      version: "2.4.0"
    },
    {
      name: "ELEMENT",
      src: "/static/vendor/elemnet-ui/index.js",
      version: "2.13.2"
    },
    {
      name: "ELEMENT.lang.zhCN",
      subkey: "lang.zhCN",
      src: "/static/vendor/elemnet-ui/umd/locale/zh-CN.js",
      version: "2.13.2"
    },
    {
      name: "ELEMENT.lang.en",
      subkey: "lang.en",
      src: "/static/vendor/elemnet-ui/umd/locale/en.js",
      version: "2.13.2"
    },
    {
      name: "ELEMENT.lang.ja",
      subkey: "lang.ja",
      src: "/static/vendor/elemnet-ui/umd/locale/ja.js",
      version: "2.13.2"
    }
  ];
  //ELEMENT always at last
  checkEnv();

  function checkEnv(){
    console.log("Check Js Env")
    for (let j = 0; j < Vendors.length; j++) {
      const v = Vendors[j];

      const len = v.name.split(/\./g).length
      const singleSrc = typeof v.src === 'string'

      const ignore = v.ignore
      if(ignore) continue;

      if (len === 1) {
        if (typeof window[v.name] === 'undefined' && singleSrc) {
          writeTag(v.src);
        }else if (typeof v.src === "object" && v.src.length ) {
          writeTags(v.src);
        }
      } else if(len === 2 ){
        const names = v.name.split(/\./g)
        if (
          typeof window[names[0]] === "undefined" ||
          typeof window[names[0]][names[1]] === "undefined"
        ) {
          writeTag(v.src);
        }
      }else if (len === 3) {
         const namesc = v.name.split(/\./g);

        if (
          typeof window[namesc[0]] === "undefined" ||
          typeof window[namesc[0]][namesc[1]] === "undefined" ||
          typeof window[namesc[0]][namesc[1]][namesc[2]] === "undefined"
        ) {
          writeTag(v.src);
        }
      } else {
        // > 3
      }

      function writeTag(src) {
        doc.write(
          unescape(
            "%3Cscript src='" +
              src +
              "' type='text/javascript'%3E%3C/script%3E"
          )
        );
      }

      function writeTags(srcs) {
        for(let k = 0 ;k<srcs.length;k++){
          const _src = srcs[k]
          doc.write(
            unescape(
              "%3Cscript src='" +
                srcs[k] +
                "' type='text/javascript'%3E%3C/script%3E"
            )
          );
        }
      }
    }
  }
})(window,document)
