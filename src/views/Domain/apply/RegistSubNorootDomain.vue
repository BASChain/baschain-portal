<template>
  <div class="container">
    <div class="row justify-content-center pt-3">
      <div class="col-md-7 col-sm-10 bas-card" v-loading="ctrl.loading">
        <div class="bas-card__header">
          <div class="bas-card__header-title">
            {{$t('p.DomainRegistSubTitle')}}
          </div>
        </div>
        <div class="bas-gray-split" />
        <div class="bas-card__body bas-border-none">
          <el-form class="col-10"
            label-width="160px">
            <el-form-item :label="$t('l.Domain')" >
              <el-input v-model="subText"
                 @input="changeLowerHandle"
                class="bas-regist--domain-input"
                placeholder="please enter domain...">
                <template slot="append">{{ `.${topasset.domaintext}` }}</template>
              </el-input>
              <div class="bas-text-warning" v-if="Boolean(ctrl.tipMsg)">
                <i class="fa fa-warning"></i>
                {{ctrl.tipMsg}}
              </div>
            </el-form-item>


            <el-form-item :label="$t('l.PriceBas')" >
              <span> {{ ruleState.subBas }} </span>
              <span> BAS/year </span>
            </el-form-item>

            <el-form-item :label="$t('l.PurchaseYears')">
              <el-input-number v-model="years" name="years"
                :controls="true"
                controls-position=""
                :min="1" :max="ruleState.maxRegYears">
              </el-input-number>
              <span>Year</span>
            </el-form-item>
          </el-form>
          <div class="row justify-content-center align-items-center">
            <el-form class="col-10 bas-topinfo-container"
              size="mini" label-position="right"
              >
              <el-form-item>
                <h6 slot="label" class="pt-2">{{$t('p.DomainRegistSubRootInfoTitle')}}</h6>
              </el-form-item>
              <el-form-item
                label-width="120px" class="root-domain-wrapper">
                <label slot="label" class="root-domain-label">
                  {{$t('p.ApplyTabRootName')}}
                </label>
                <span class="root-domain-text">{{ topasset.domaintext}}</span>
                <span v-if="!topasset.owner">{{ $t('l.Unregist')}}</span>
              </el-form-item>
            </el-form>
          </div>
          <div class="col-12 text-center pt-3">
            <span class="bas-text-green">{{$t('l.Total')}}:</span>
            <h2 class="d-inline bas-text-green">{{getTotalBas}}</h2>
            <span class="bas-text-green">BAS</span>
          </div>
        </div>

        <div class="bas-card__footer">
          <button class="btn w-25 bas-btn-primary"
            :disabled="ctrl.loading"
            @click="commitRegist">
              {{$t('l.RegistBtn')}}
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  wei2Bas
} from '@/utils'

export default {
  name:"DomainRegistSubNotRoot",
  components:{},
  computed: {
    ...Vuex.mapGetters({
      ruleState:'dapp/ruleState'
    }),
    getTotalBas(){
      const unitBas = this.ruleState.subBas

      return this.years * unitBas
    }
  },
  data() {
    return {
      subText:'',
      years:1,
      ctrl:{
        loading:false,
        tipMsg:''
      },
      topasset:{
        domaintext:'notext',
        hash:'',
        owner:''
      }
    }
  },
  methods: {
    changeLowerHandle(){

    },
    commitRegist(){

    }
  },
  mounted() {

  },
}
</script>
<style>
.root-domain-wrapper * {
  font-size: 16px;
  line-height: 28px;
}

.root-domain-wrapper .root-domain-text {
  font-weight: 400;
}

</style>
