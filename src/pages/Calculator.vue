<template>
  <q-page class="flex flex-center">
      <div class="row">
        <q-input outlined class="col-4 q-pa-sm" type="number" v-model.number="productSize.width" label="Sirka uzitku" />
        <q-input outlined class="col-4 q-pa-sm" type="number" v-model.number="productSize.height" label="Vyska uzitku" />
        <q-input outlined class="col-4 q-pa-sm" type="number" v-model="pcs" label="Pocet ks" />
        <q-input outlined class="col-4 q-pa-sm" type="number" v-model="pages_num" label="Pocet stran" />
        <q-input outlined class="col-4 q-pa-sm" type="number" v-model="bleed" label="Spadavka" />
        <q-input outlined class="col-4 q-pa-sm" type="number" v-model="kgPrice" label="Cena za Kg" />
        <q-input outlined class="col-4 q-pa-sm" type="number" v-model="prePressCost" label="Cena prepress" />
        <q-input outlined class="col-4 q-pa-sm" type="number" v-model="comissionProc" label="Multiplikator provize" />
        <q-input outlined class="col-6 q-pa-sm" type="number" v-model="paperWeight" label="Plosna hmotnost gramy" />
        <q-input outlined class="col-6 q-pa-sm" type="number" v-model="arcPrintCost" label="Cena za tisk archu" />
        <q-toggle v-model="doubleSide" label="Oboustrane" />
        <q-select outlined class="col-6 q-pa-sm" v-model="format" :options="formatOptions" label="Vyber format" />
        <q-toggle v-model="pdfInput" label="Mam pdf k dispozici" />
        <div v-show="pdfInput">
          <q-uploader
            label="Nahrat PDF"
            :factory="uploadFile"
            style="max-width: 600px"
          />
        </div>
          <q-card
              dark bordered class="q-pa-md row bg-grey-6 text-white "
          >
            <q-card-section class="my-card">
              <div class="text-h6">Pocet arc je:{{this.numArc}}</div>
              <div class="text-subtitle1"> {{pcs / onArc}}</div>
            </q-card-section>
          </q-card>
          <q-card
            dark bordered class="row bg-grey-6 text-white q-pa-md"
          >
            <q-card-section class="my-card">
              <div class="text-h6">Cena archu</div>
              <div class="text-subtitle2">{{(sheetPrice).toFixed(3)}}Kc</div>
              <div class="text-h6">Cena papiru celkem:</div>
              <div class="text-subtitle2">{{paperPriceTotal().toFixed(2)}}Kc</div>
              <div class="text-h6">Hmotnost archu je:</div>
              <div class="text-subtitle2">{{(sheetSizeInMeters * paperWeight).toFixed(2)}}g</div>
              <div class="text-h6">Hmotnost zakazky je:</div>
              <div class="text-subtitle2">{{(sheetSizeInMeters * paperWeight * numArc).toFixed(2)}}g</div>
              <div class="text-h6">Na arch se vejde:</div>
              <div class="text-subtitle2">{{(onArc).toFixed(0)}}ks</div>
              <div class="text-h6">Za tisk:</div>
              <div class="text-subtitle2">{{(numArc * arcPrintCost).toFixed(0)}}kc---{{(printTime()).toFixed(0)}} minuty</div>
              <q-separator inset />
              <div class="text-h2">Celkem:</div>
              <div class="text-subtitle1">{{((printTotalPrice() + paperPriceTotal())*comissionProc).toFixed(0)}}kc</div>
            </q-card-section>
          </q-card>
      </div>

  </q-page>
</template>

<style lang="stylus" scoped>
.my-card
  width 100%
  max-width 250px
</style>

<script>
export default {
  name: 'PageIndex',

  data () {
    return {
      doubleSide: false,
      bleed: 2,
      arcPrintCost: 2.5,
      comissionProc: 1.2,
      pages_num: 1,
      productSize: {
        width: 148,
        height: 210
      },
      pcs: 100,
      kgPrice: 23,
      paperWeight: 130,
      pdfInput: false,
      format: '320x450',
      prePressCost: 250,
      paper: {
        width: 0,
        height: 0
      },
      formatOptions: [
        '320x450', '330x480', '305x428', '430x610', '450x640', '480x650'
      ]
    }
  },
  methods: {
    setPaperFromString: function (formatText) {
      this.paper.width = formatText.substr(0, 3)
      this.paper.height = formatText.substr(4, 6)
    },
    paperPriceTotal: function () {
      return this.sheetPrice * this.numArc
    },
    printTime: function () {
      if (this.doubleSide) {
        return this.numArc / 15 * 2
      }
      return this.numArc / 15
    },
    printTotalPrice: function () {
      let arcPrintCosts = this.arcPrintCost
      if (this.doubleSide) {
        arcPrintCosts = 2 * arcPrintCosts
      }
      return ((this.numArc * arcPrintCosts) + parseInt(this.prePressCost))
    },
    listObjs () {
      var prefix = 'testing'
      this.S3conn.listObjects({
        Prefix: prefix
      }, function (err, data) {
        if (err) {
          console.log('ERROR: ' + err)
        } else {
          var objKeys = ''
          data.Contents.forEach(function (obj) {
            objKeys += obj.Key + '<br>'
          })
          console.log('Nahrany objekty')
          console.log(objKeys)
        }
      })
    },
    uploadFile (file) {
      if (file) {
        var objKey = 'testing/' + file.name
        var params = {
          Key: objKey,
          ContentType: file.type,
          Body: file,
          ACL: 'public-read'
        }
        this.$S3conn.putObject(params, function (err, data) {
          if (err) {
            console.log('ERROR: ' + err)
          } else {
            this.listObjs()
          }
        })
      } else {
        console.log('nemam soubor')
      }
    }
  },
  computed: {
    onArc: function () {
      // here i can put non printable boundaries of the paper
      const paperW = this.paper.width
      const paperH = this.paper.height
      // here i can add bleed and etc.
      const productW = this.productSize.width + (this.bleed * 2)
      const productH = this.productSize.height + (this.bleed * 2)
      if ((productW === 0) || (productH === 0)) { return 1 }
      var var1x = Math.floor(paperW / productW)
      var var1y = Math.floor(paperH / productH)
      var var2x = Math.floor(paperH / productW)
      var var2y = Math.floor(paperW / productH)
      if ((var1x * var1y) > (var2x * var2y)) {
        return Math.floor(var1x * var1y)
      } else {
        return Math.floor(var2x * var2y)
      }
    },
    numArc: function () {
      if (this.doubleSide) {
        return Math.ceil((this.pcs / this.onArc) * this.pages_num / 2)
      } else {
        return Math.ceil((this.pcs / this.onArc) * this.pages_num)
      }
    },
    sheetSizeInMeters: function () {
      if (this.format == null) {
        return 0
      }
      this.setPaperFromString(this.format)
      return this.paper.width * this.paper.height / 1000000
    },
    sheetPrice: function () {
      this.setPaperFromString(this.format)
      return this.sheetSizeInMeters * this.paperWeight * this.kgPrice / 1000
    }
  },
  components: {
    // 'lazy-calc': require('vue-lazy-calc').default
    // example1: () => import('../components/Example1')
  }
}
</script>
