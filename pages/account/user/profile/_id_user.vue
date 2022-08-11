<template>
  <v-container class="mt-n16">
    <div class="relative d-flex flex-column align-center ml-n3 mr-n3">
      <v-img class="cover-photo" src="/steps/3.jpg" height="30vh" width="100vw">
      </v-img>
      <div :class="{
        'mt-n20':user.id !=this.$auth.user.id,
        'mt-n14':user.id ==this.$auth.user.id  || user.following
        }" class="d-flex align-center flex-column">
        <v-btn rounded color="primary white--text mb-4 font-weight-bold" @click="followUser()"
          v-if="user.id !=this.$auth.user.id && !user.following">
          SEGUIR&nbsp;&nbsp;<v-icon>mdi-account-plus</v-icon>
        </v-btn>
        <ProfileInfoCardComponent :user="user"></ProfileInfoCardComponent>
      </div>
    </div>
    <businessesCardComponent v-show="user.type=='negocio'" readonly :business="business"></businessesCardComponent>
    <PostsListComponent class="mt-10" v-model="publications" myPublications></PostsListComponent>
    <!-- Info post -->
    <!-- Lista de seguidores -->
    <ProfileListSeguidoresSeguidosComponent :user="user" v-model="showModalSeguidoresSeguidos">
    </ProfileListSeguidoresSeguidosComponent>
    <v-speed-dial v-if="$auth.user.id == user.id" v-model="configOptions" fixed right bottom direction="top"
      transition="slide-y-reverse-transition">
      <template v-slot:activator>
        <v-btn v-model="configOptions" color="mb-12 primary" dark fab>
          <v-icon v-if="configOptions">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-account-circle
          </v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green" @click="modalEditProfile = true">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo" @click="openCreatePost= true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-speed-dial>


    <PostsCreateComponent @newPublication="setNewPost($event)" v-model="openCreatePost"></PostsCreateComponent>

    <ProfileUpdateComponent v-model="modalEditProfile"></ProfileUpdateComponent>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        idUser: this.$route.params.id_user,
        user: {
          likes: 0,
          followers: 0,
          followings: 0,
          following: true,
        },
        openCreatePost: false,
        configOptions: false,
        modalEditProfile: false,
        profile: {
          profile_picture: {}
        },
        publications: {},
        subscription: {},
        seguidores: 0,
        seguidos: 0,
        showModalSeguidoresSeguidos: false,
        list_seguidores: [],
        list_seguidos: [],
        show_seguidores: false,
        start: 0,
        limit: 12,
        business: {}

      }
    },
    created() {
      this.getUser()
      this.getPosts()
      this.getSubscriptionData()
    },
    methods: {
      setNewPost(e) {
        this.publications.unshift(e)
      },
      async getSubscriptionData() {
        this.subscription = await this.getSubscription()
      },
      async getPosts() {
        this.publications = []
        let params = {
          user: this.idUser,
          _start: this.start,
          _limit: this.limit

        }
        this.publications = {}

        this.publications = await this.$axios.get('/publicaciones/', {
          params: params
        })
      },
      getUser() {
        this.$axios.get(`/users/${this.idUser}/`)
          .then((data) => {
            this.user = data.data
            if (this.user.type == 'negocio') {
              this.$axios.get('/businesses/' + this.idUser)
                .then((data) => {
                  this.business = data.data
                })

            }
          })
      },
      followUser() {
        let data = {
          seguidor: this.$auth.user.id,
          seguido: this.user.id
        }
        this.$axios.post('/seguidor-seguidos/', data)
          .then(() => {
            this.user.following = true
            this.user.followers += 1
          })
      },
      closeModalPerfil(messageError) {
        this.modalEditProfile = false
        this.showSnackbar = true
        if (messageError != "")
          this.snackbarMessage = messageError
        this.getUser()
        this.$forceUpdate()
      },
      showListSeguidos() {
        this.show_seguidores = false;
        this.showListSeguidoresSeguidos = true;
      },
      showListSeguidores() {
        this.show_seguidores = true;
        this.showListSeguidoresSeguidos = true;
      },
    },
  }

</script>


<style scoped>
  .relative {
    position: relative !important;
  }

  .cover-photo {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  .mt-n20 {
    margin-top: -100px
  }

</style>
