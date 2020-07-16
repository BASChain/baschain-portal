<template>
  <div class="bg-white">
    <h1 class="bas-market-title pt-5 pb-3">{{getTitle}}</h1>

    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-10 pb-5 row">
          <div v-for="item in soldItems"
          class="col-md-3"
          :key="item.hash">
            <div class="bas-list-card">
              <div class="list-card--header">
                <div class="bas-block">
                  <h4>{{paraseDomain(item.name)}}</h4>
                  <p class="bas-small-owner">{{item.from | ellipsis}}</p>
                </div>
              </div>
              <div class="list-card--footer">
                <div class="bas-sold-num">
                  <span class="number">{{item.price}}</span>
                  <p type="primary" class="el-icon-time bas-small-expire">{{item.expire}}</p>
                </div>
                <div class="bas-sold-btn">
                  <el-button type="info" plain size="medium" disabled>{{ $t('p.MarketSoldDomainBtn') }}</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {parseHexDomain} from  '@/web3-lib/utils/index.js'
export default {
  name:"HasSoldMain",
  computed: {
    getTitle(){
      return this.$t('p.MarketSoldDomainTitle')
    },
    ...Vuex.mapState({
      soldItems:state => state.market.marketSolds
    })
  },
  async mounted() {
    const web3State = this.$store.getters['web3State']
    // if (web3State.chainId && web3State.wallet) {
      this.$store.dispatch('market/loadMarketSolds', web3State)
    // }
  },
  methods: {
    paraseDomain(name) {
      return parseHexDomain(name)
    }
  },
  filters: {
    ellipsis (value) {
      let len=value.length;
      if (!value) return ''
      if (value.length > 10) {
        return value.substring(0,6) + '...' +value.substring(len-4,len)
      }
      return value
		}
  }
}
</script>
<style scoped>
.bas-block {
  width: 100%;
  text-align: center;
}
.bas-sold-num > span {
  font-size:26px;
  font-family:Lato-Semibold,Lato;
  font-weight:400;
  color:rgba(4,6,46,1);
}
.bas-sold-num > span::after {
  content: 'Bas';
  font-size: 14px;
  color:rgba(4,6,46,1);
  font-family:Lato-Light,Lato;
  font-weight: 300;
}
.bas-sold-num {
  width: 55%;
  margin-top: 3px;
}
.bas-sold-num > p {
  margin: 0px;
}
.bas-sold-btn {
  position: absolute;
  right: 0px;
  bottom: 6px;
}
</style>
