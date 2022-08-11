<template>
  <v-dialog v-model="value" scrollable persistent>
    <v-card outlined class="elevation-0">
      <v-toolbar class="elevation-0">
        <v-toolbar-title class="secondary--text font-weight-bold">
          {{user.username}}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn dense class="ml-2" fab @click="$emit('input',false)" x-small depressed>
          <v-icon color="grey">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text class="pa-0" style="min-height:500px">
        <v-tabs v-model="tabOption" background-color="transparent" grow>
          <v-tab>
            Seguidores
          </v-tab>
          <v-tab>
            Seguidos
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabOption">
          <v-tab-item>
            <v-list>
              <v-list-item class="grow" v-for="(seguidor,index) in seguidores" :key="seguidor.id">
                <v-list-item-avatar color="grey darken-3 mr-2" v-if="seguidor.seguidor.profile_picture!=null">
                  <v-img class="elevation-6" @click="goToProfile"
                    :src="$axios.defaults.baseURL + seguidor.seguidor.profile_picture.url" aspect-ratio="2" round>
                  </v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-medium">{{seguidor.seguidor.username}}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action v-show="seguidor.seguidor.id != $auth.user.id">
                  <v-btn depressed x-small color="primary" @click="follow(seguidor.seguidor.id, index,seguidores)"
                    v-show="!seguidor.following">
                    Seguir
                  </v-btn>
                  <v-btn depressed x-small color="black" @click="unfollow(seguidor.id, index,seguidores)" outlined
                    v-show="seguidor.following">
                    Siguiendo
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-list-item v-if="seguidores.length == 0">
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold overline">No se encontraron seguidores</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-tab-item>
          <v-tab-item>
            <v-list>
              <v-list-item class="grow" v-for="(seguido,index) in seguidos" :key="seguido.id">
                <v-list-item-avatar color="grey darken-3 mr-2" v-if="seguido.seguido.profile_picture!=null">
                  <v-img class="elevation-6" @click="goToProfile"
                    :src="$axios.defaults.baseURL + seguido.seguido.profile_picture.url" aspect-ratio="2" round>
                  </v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-medium">{{seguido.seguido.username}}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn depressed x-small color="primary" @click="follow(seguido.seguido.id, index,seguidos)"
                    v-show="!seguido.following">
                    Seguir
                  </v-btn>
                  <v-btn depressed x-small outlined color="black" @click="unfollow(seguido.id, index,seguidos)"
                    v-show="seguido.following">
                    Siguiendo
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-list-item v-if="seguidos.length == 0">
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold overline">No se encontraron seguidos</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>

  </v-dialog>
</template>

<script>
  import titleToolbars from '~/components/General/titleToolbars.vue'
  import axios from 'axios'
  export default {
    props: {
      value: false,
      user: Object
    },
    data() {
      return {
        idUser: this.$route.params.id_user,
        seguidores: [],
        seguidos: [],
        tabOption: 0
      }
    },
    components: {
      titleToolbars
    },
    created() {
      this.getSeguidoresSeguidos()
    },
    methods: {
      goToProfile() {
        return this.$router.push('account/user/profile/' + this.publication.user.id)
      },
      getSeguidoresSeguidos() {
        this.$axios.get(`/seguidor-seguidos/?seguido=${this.idUser}`).then((data) => {
          this.seguidores = data.data
        })
        this.$axios.get(`/seguidor-seguidos/?seguidor=${this.idUser}`).then((data) => {
          this.seguidos = data.data
        })
      },
      async follow(id, index, list) {
        let data = {
          seguidor: this.$auth.user.id,
          seguido: id
        }
        this.$axios.post('/seguidor-seguidos/', data)
          .then(() => {
            list[index].following = true
            this.$forceUpdate()
          })

      },
      async unfollow(id, index, list) {
        console.log(list[index])

        this.$axios.delete(`/seguidor-seguidos/${id}`)
          .then(() => {
            list[index].following = false
            this.$forceUpdate()
          })

      },
    }

  }

</script>
