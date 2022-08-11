<template>
  <div>
    <v-dialog :value="value">
      <v-card>
        <v-toolbar color="red accent-2">
          <v-toolbar-title class="font-weight-black white--text">
            AGREGAR MASCOTA
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn fab x-small depressed @click="$emit('input', false)">
            <v-icon color="black">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-stepper v-model="lostDogSteps" flat>
          <v-card-title class="d-flex justify-center">
            <v-stepper-header class="elevation-0 full-width d-flex justify-space-between">
              <v-stepper-step :complete="lostDogSteps > 1" step="1">
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="lostDogSteps > 2" step="2">
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="3">
              </v-stepper-step>
            </v-stepper-header>

          </v-card-title>
          <v-card-text class="overflow-card">
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card outlined>
                  <v-toolbar color="red accent-2 elevation-0">
                    <v-toolbar-title class="font-weight-black white--text">Informacion</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-form ref="infoForm">
                      <v-row>
                        <v-col class="col-12">
                          <v-text-field filled v-model="lostDog.name" class="rounded-lg" hide-details
                            :rules="rules.requerido" label="Nombre de la mascota">
                          </v-text-field>
                        </v-col>
                        <v-col class="col-12">
                          <v-text-field filled v-model="lostDog.city" class="rounded-lg" hide-details
                            :rules="rules.requerido" label="cIUDAD">
                          </v-text-field>
                        </v-col>

                        <v-col class="col-12">
                          <v-select filled v-model="lostDog.type" class="rounded-lg" hide-details
                            :rules="rules.requerido" label="Tipo" :items="['Perro','Gato','Otro']">
                          </v-select>
                        </v-col>
                        <v-col class="col-12">
                          <v-text-field filled v-model="lostDog.phone" class="rounded-lg" type="number" hide-details
                            :rules="rules.requerido" label="Telefono de contacto">
                          </v-text-field>
                        </v-col>
                        <v-col class="col-12">
                          <v-textarea filled v-model="lostDog.info" class="rounded-lg" hide-details
                            label="Info adicional (Opcional)">
                          </v-textarea>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-card color="rounded-lg" outlined>
                  <v-toolbar color="red accent-2 elevation-0">
                    <v-toolbar-title class="font-weight-black white--text">Fotos</v-toolbar-title>
                  </v-toolbar>

                  <v-card-text>
                    <DragAndDropPhotoCard v-model="lostDog.pictures" multiple></DragAndDropPhotoCard>
                  </v-card-text>
                  <v-card-text>
                    <div class="d-flex full-width overflow mb-3">
                      <v-card v-for="(picture,index) in lostDog.pictures" width="70vw" class="rounded-md mr-3"
                        :key="index">
                        <v-img :src="previewImg(picture)" height="25vh">
                          <v-btn @click="deleteImg(index)" x-small depressed absolute top right fab color="white"
                            class="mt-5 mr-n3">
                            <v-icon color="grey">mdi-close</v-icon>
                          </v-btn>
                        </v-img>
                      </v-card>
                    </div>
                  </v-card-text>
                </v-card>
              </v-stepper-content>
              <v-stepper-content step="3">
                <v-card color="rounded-lg" outlined>
                  <v-toolbar color="secondary elevation-0">
                    <v-toolbar-title class="font-weight-black white--text">
                      Donde encontraste la mascota
                    </v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <geosearchComponent v-model="lostDog"></geosearchComponent>
                    <mapComponent :value="lostDog" @input="($e)=>{ 
                lostDog = {...lostDog,...$e}
            }"></mapComponent>
                  </v-card-text>
                </v-card>
              </v-stepper-content>
            </v-stepper-items>
          </v-card-text>
        </v-stepper>
        <v-card-actions>
          <template v-if="lostDogSteps>1">
            <v-btn color="grey" width="10%" @click="lostDogSteps--">
              <v-icon class="white--text">mdi-chevron-left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
          </template>
          <v-btn :width="(lostDogSteps==1)?'100%':'80%'" color="success darken-1" class="font-weight-black"
            @click="nextStep()">
            <template v-if="lostDogSteps == 3">
              AGREGAR
            </template>
            <template v-else>
              SIGUIENTE
            </template>
          </v-btn>
        </v-card-actions>
      </v-card>
      <modalSuccess :action="()=>{
      $router.go(-1)
    }" v-model="successDialog">
        Te ayudaremos a encontrar su hogar!
      </modalSuccess>
    </v-dialog>
  </div>
</template>
<script>
  import DragAndDropPhotoCard from '~/components/DragAndDropPhotoCard.vue'
  import modalSuccess from '~/components/modalSuccess.vue'
  import mapComponent from '~/components/Map/mapComponent.vue'
  import geosearchComponent from '~/components/Map/geosearchComponent.vue'
  export default {
    components: {
      DragAndDropPhotoCard,
      geosearchComponent,
      modalSuccess,
      mapComponent
    },
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        lostDogSteps: 1,
        lostDog: {
          lat: -34.9185,
          lng: -54.9716,
          pictures: []
        },
        successDialog: false,
        rules: {
          requerido: [value => !!value || "Requerido."],
        },
      }
    },
    methods: {
      previewImg(file) {
        console.log(file)
        return URL.createObjectURL(file)
      },
      deleteImg(index) {
        this.$delete(this.lostDog.pictures, index)
      },
      nextStep() {
        if (this.lostDogSteps == 3) {
          return this.createLostDog()
        }
        if (!this.$refs.infoForm.validate()) return
        this.lostDogSteps++
      },
      async createLostDog() {
        let formData = new FormData()

        for (let index in this.lostDog.pictures) {
          let picture = this.lostDog.pictures[index]
          formData.append(`files.pictures`, picture, picture.name)
        }
        this.$delete(this.lostDog, 'pictures')
        formData.append('data', JSON.stringify(this.lostDog))
        try {
          await this.$axios.post('/lostdogs', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          this.$emit('input', false)
        } catch (error) {

        }
      }
    }
  }

</script>

<style scoped>
  .overflow {
    overflow: auto;
  }

</style>
