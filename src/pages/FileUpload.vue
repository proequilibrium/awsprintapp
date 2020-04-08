<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-uploader
        url="http://localhost:5000/file-upload"
        multiple
        style="max-width: 300px"
      />
      <q-uploader
          ref="uploader"
          :factory="factoryFn"
          style="max-width: 300px"
        />
    </div>
     <q-btn type="submit" @click="filup" label="Uloz" class="q-mt-md" color="teal" />
     <q-btn type="submit" @click="fildown" label="Nahraj" class="q-mt-md" color="teal" />
     <q-btn type="submit" @click="listfiles" label="List" class="q-mt-md" color="teal" />
     <q-img ref='mainimage' :src="imgsource" />
  </q-page>
</template>

<script>
// import fs from 'fs'

export default {
  name: 'FileUp',
  data () {
    return {
      imgsource: 'https://www.parma.cz/katalog-obrazku/clanek-363/detail-3008-tatra-traktor-8x6-s-pevnou-nastavbou-fliegl.jpg'
    }
  },
  methods: {
    listfiles () {
      this.$Storage.list('protected/').then(result => console.log(result)).catch(err => console.log(err))
    },
    filup () {
      this.$Storage.put('textik_file.txt', 'Ty pico fakci to', {
        contentType: 'text/plain'
      })
        .then(result => console.log(result))
        .catch(err => console.log(err))
    },
    fildown () {
      this.$Storage.get('srdce.png').then(result => { this.$refs.mainimage.src = result }).catch(err => console.log(err))
    },
    factTst (files) {
      return new Promise((resolve, reject) => {
        // var myUploader = this.$refs.uploader[0]
        var file = files[0]
        var fileSrc
        var fileData

        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onerror = err => console.error(`Failed to read file: ${err}`)
        reader.onload = function () {
          fileSrc = reader.result
          fileData = fileSrc.substr(fileSrc.indexOf(',') + 1)
          return fileData // smazat
          // stitchClient.callFunction('uploadImageToS3', [fileData, 'elever-erp-document-store', file.name, file.type])
          //   .then(result => {
          //     alert('fatto')
          //     console.log(file)
          //     myUploader.removeFile(file)
          //     resolve(files)
          //   })
          //   .catch(err => {
          //     console.error(`Failed to upload file: ${err}`)
          //     reject()
          //   })
        }
      })
    },
    factoryFn (file) {
      var fileA = file[0]
      console.log(fileA.__img.attributes.src.baseURI, '\n')
      console.log(fileA.__img)

      this.$Storage.put('srdce.png', fileA, {
        contentType: 'application/octet-stream'
      })
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }
  }
}
</script>
