<template>
  <div>
    <v-dialog :value="value">
      <v-card>
        <v-toolbar class="elevation-0">
          <v-toolbar-title class="primary--text font-weight-bold">
            Crear publicacion
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn dense class="ml-2" fab @click="$emit('input',false)" x-small depressed>
            <v-icon color="grey">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="pt-3">
          <v-text-field class="rounded-lg" label="  Titulo" height="50" v-model="publicacion.title"
            background-color="grey lighten-3"></v-text-field>
          <v-select :items="[{text:'Video',value:'video'},{text:'Publicacion',value:'publication'}]" class="rounded-lg"
            label="Tipo" height="50" v-model="publicacion.type" background-color="grey lighten-3"></v-select>
          <v-text-field v-show="publicacion.type=='video'" class="rounded-lg" label="  Url" height="50"
            v-model="publicacion.video_url" background-color="grey lighten-3"></v-text-field>
          <v-textarea class="rounded-lg" v-model="publicacion.content" filled label="Que estas pensando...">
          </v-textarea>
          <v-sheet color="indigo lighten-4" width="50%" height="150" v-show="publicacion.main_picture != null"
            class="pa-2 rounded d-flex justify-center align-center dotted-border" @click="selectPhoto">
            <v-icon size="80" v-show="publicacion.main_picture == null">mdi-camera-plus-outline</v-icon>
            <img id="previewImg" v-show="publicacion.main_picture != null">
          </v-sheet>
          <input type="file" style="display:none;" id="uploadFile" @change="onFileChange" accept="image/*">
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded class="primary font-weight-bold" @click="createPublication()">
            AGREGAR PUBLICACION
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <modalSuccess :action="()=>{
      successDialog = false
    }" v-model="successDialog">
      <template v-slot:icon>
        mdi-check
      </template>

      <template v-slot:title>
        Publicacion creada con exito!
      </template>
    </modalSuccess>

  </div>
</template>


<script>
  import titleToolbars from '~/components/General/titleToolbars.vue'
  export default {
    components: {
      titleToolbars
    },
    props: {
      value: Boolean
    },
    data() {
      return {
        successDialog: false,
        publicacion: {
          contenido: ''
        }
      }
    },
    methods: {
      selectPhoto() {
        uploadFile.click()
      },
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files
        if (!files.length)
          return
        this.publicacion.main_picture = files[0]
        previewImg.src = URL.createObjectURL(files[0])
        previewImg.style = "max-height: 100%;max-width: 100%"
        this.$forceUpdate()

      },
      createPublication() {

        if (this.publicacion.content == '' && !this.publicacion.main_picture)
          return;

        const data = new FormData()
        data.append('files.main_picture', this.publicacion.main_picture)
        this.$delete(this.publicacion, 'main_picture')
        this.publicacion.user = this.$auth.user.id
        data.append('data', JSON.stringify(this.publicacion))
        this.$axios.post('/publicaciones/', data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((data) => {
            this.publicacion = {}
            this.$root.$emit('newPublication', data.data)
            this.$emit('input', false)
            this.successDialog = true
          })
      }
    }
  }

</script>

<style scoped>
  .dotted-border {
    border: 1px dotted black;
  }

</style>
