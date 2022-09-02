<template>
  <div>
    <v-card outlined class="fill-width" flat>
      <v-card-text class="pa-0 " style="height: 100%;overflow-y:auto">
        <div class="elevation-1">
          <div v-if="publication.video_url && publication.type =='video'">
            <iframe width="100%" height="315" :src="generateVideoUrl(publication.video_url)"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
          </div>
          <v-img v-else-if="publication.main_picture!=null" aspect-ratio="1" cover class="white" min-height="100%"
            :src="`${$axios.defaults.baseURL}${publication.main_picture.url}`"></v-img>
        </div>
      </v-card-text>
    </v-card>
    <v-container>
      <v-row>
        <v-col class="col-12 col-md-12">
          <v-list color="transparent pa-0">
            <v-list-item class="grow pa-0">
              <v-list-item-avatar color="grey darken-3 mr-2" v-if="publication.user.profile_picture!=null">
                <v-img class="elevation-6" :src="publication.user.profile_picture.url" aspect-ratio="2" round>
                </v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">{{publication.user.username}}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action class="font-weight-bold mt-0">
                {{formatDate(publication.created_at)}}
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col class="col-12">
          <p>{{publication.content}}</p>
        </v-col>
        <v-col class="col-12 col-md-12">
          <v-btn block outlined depressed color="red" v-show="$auth.user.is_admin"
            @click="deletePublication(publication.id)">
            <v-icon color="red">mdi-delete</v-icon> Eliminar
          </v-btn>
        </v-col>
        <v-col class="col-12 col-md-12">
          <v-text-field placeholder="Tu comentario..." class="font-weight-bold rounded-lg" append-icon="ion-ios-send"
            @click:append="addComment()" filled hide-details v-model="comentario.contenido">
          </v-text-field>
        </v-col>
      </v-row>
      <v-list three-line dense>
        <div class="text-center mt-2 " v-show="loadingComments">
          <v-progress-circular :width="3" color="green" indeterminate></v-progress-circular>
        </div>
        <template v-for="(comentario, index) in publication.comments">

          <v-list-item dense :key="index" color="black" class="mb-2">
            <v-list-item-avatar :color="randomColor()" class="font-weight-black white--text text-shadow">
              {{comentario.user.username.substring(0,1)}}
            </v-list-item-avatar>

            <v-list-item-content three-line class="grey lighten-4 pa-3 rounded-xl capitalize">
              <v-list-item-title class="font-weight-bold body-2 text-capitalize">{{comentario.user.username}}
                <span class="font-weight-light caption text-none"> - {{formatDate(comentario.created_at)}}</span>
              </v-list-item-title>
              <v-list-item-subtitle v-html="comentario.contenido"
                class="wrap-text grey--text text--darken-3 font-weight-medium"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn fab small depressed @click="deleteComment(comentario.id)">
              <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
    </v-container>
  </div>
</template>

<script>
  import moment from 'moment'
  import titleToolbars from '~/components/General/titleToolbars.vue'
  export default {
    layout: 'simpleWithBackButton',
    data() {
      return {
        idPost: this.$route.params.id_post,
        comentario: {},
        publication: {
          user: {}
        },
        start_comentarios: 0,
        limit_comentarios: 2,
        comentarios: [],
        loadingComments: false,
        theres_more_comments: true,
        like: false,

      }
    },
    created() {
      this.getPublication()
      this.$store.dispatch('titlePages/setTitlePage', {
        text: '...',
        color: 'green lighten-1'
      })
    },
    methods: {
      getPublication() {
        this.$axios.get(`/publicaciones/${this.idPost}/`).then((data) => {
          this.publication = data.data
          this.$store.dispatch('titlePages/setTitlePage', {
            text: `${data.data.title}`,
            color: 'green lighten-1'
          })
        })
      },
      urlProfile(comentario) {
        return this.$axios.defaults.baseURL + comentario.user?.profile_picture?.url
      },
      randomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16)
      },
      generateVideoUrl() {
        //generate video url to youtube frame 
        if (this.publication.video_url.indexOf("=") != -1) {
          let video_id = this.publication.video_url.split('=')[1]
          return `https://www.youtube.com/embed/${video_id}`
        }
        return ""
      },
      getMoreComments() {
        this.start_comentarios += this.limit_comentarios
        this.$axios.get(
          `/comentarios/?publicacion=${this.idPost}&_start=${this.start_comentarios}&_limit=${this.limit_comentarios}`
        ).then((data) => {
          this.comentarios = this.comentarios.concat(data.data)
          if (this.comentarios.length == this.publication.comentarios_cant) {
            this.theres_more_comments = false
          }
          this.$forceUpdate()
        })
      },
      addComment() {
        this.comentario.publicacion = this.publication.id
        this.comentario.user = this.$auth.user.id
        this.$axios.post('/comentarios/', this.comentario)
          .then((data) => {
            this.publication.comments.push(data.data)
            this.$forceUpdate()
            this.comentario = {}
          })
      },
      deleteComment(id) {
        this.$axios.delete(`/comentarios/${id}/`)
          .then((data) => {
            this.publication.comments = this.publication.comments.filter(
              (comentario) => comentario.id != id
            )
            this.$forceUpdate()
          })
      },
      formatDate(date) {
        return moment(date).lang("es").fromNow()
      },
      deletePublication(id) {
        this.$axios.delete(`/publicaciones/${id}/`).then((data) => {
          this.$router.push('/feed')
        })
      },
      changeLike() {
        var cambiarDeLikeADislike = this.like //Si like era verdadero, entonces ahora sera falso

        if (cambiarDeLikeADislike) {
          //Retirar el like del arreglo de likes de la publicacion brinada por ListPost
          this.like = false
          this.$emit('changeLike', false)
        } else {
          //Agregar el like del arreglo de likes de la publicacion brinada por ListPost
          this.like = true
          this.$emit('changeLike', true)
        }

      }

    },
    watch: {
      showPostDetailsDialog(newVal, oldVal) {
        this.loadingComments = true
        this.theres_more_comments = true
        this.comentarios = []
        this.start_comentarios = 0
        this.like = this.publication.likes.filter(element => element.user_id == this.$auth.user.id).length > 0
        this.$axios.get(
            `/comentarios/?publicacion=${this.idPost}&_start=${this.start_comentarios}&_limit=${this.limit_comentarios}`,
            this.comentario)
          .then((data) => {
            this.comentarios = data.data
            this.loadingComments = false
            if (data.data.length < this.limit_comentarios) {
              this.theres_more_comments = false
            }
          })
      }
    },
    computed: {
      imgUserPublicacion() {
        return (this.publication.user.profile_picture == undefined) ? '' : this.publication.user.profile_picture.url
      }
    },
    components: {
      titleToolbars
    }

  }

</script>

<style>
  .wrap-text {
    -webkit-line-clamp: unset !important;
  }

</style>
