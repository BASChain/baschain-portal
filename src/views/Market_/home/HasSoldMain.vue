<template>
  <div class="bg-white">
    <h1 class="bas-market-title pt-5 pb-3">{{getTitle}}</h1>

    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-10 pb-5 row">
          <div v-for="idx in 12"
          class="col-md-3"
          :key="idx">
            <div class="bas-list-card">
              <div class="list-card--header">
                <div class="bas-block">
                  <h4>ETH</h4>
                  <p class="bas-small-owner">0xFd30...e865</p>
                </div>
                <!-- <div class="inline-btn-group">
                  <span class="small bas-expired">
                    过期时间:2020-03-32
                  </span>
                  <el-button type="info" plain size="mini" disabled>
                    已售
                  </el-button>
                </div> -->
              </div>
              <div class="list-card--footer">
                <div class="bas-sold-num">
                  <span class="number">400</span>
                  <p type="primary" class="el-icon-time bas-small-expire">2020-05-06</p>
                </div>
                <div class="bas-sold-btn">
                  <el-button type="info" plain size="medium" disabled>已售</el-button>
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
export default {
  name:"HasSoldMain",
  computed: {
    getTitle(){
      return '已出售的域名'
    }
  },

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
