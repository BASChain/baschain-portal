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
    {
      name: "numeral",
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
      version: "2.4.0"
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
    }
  ];
  //ELEMENT always at last
  checkEnv();

  function checkEnv(){
    console.log("Check Js Env")
    for (let j = 0; j < Vendors.length; j++) {
      const v = Vendors[j];

      if (typeof window[v.name] === "undefined") {
        console.log("load local js:", v.src);
        if (typeof v.src === "string") {
          doc.write(
            unescape(
              "%3Cscript src='" +
                v.src +
                "' type='text/javascript'%3E%3C/script%3E"
            )
          );
        } else {
          const srcs = v.src;
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
  }
})(window,document)