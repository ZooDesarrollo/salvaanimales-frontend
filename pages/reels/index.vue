<template>
  <v-container>
    <v-row>
      <v-col class="col-12">
        <v-card color="orange darken-2" height="70" elevation="12" class="d-flex align-center justify-space-between rounded-xl">
          <img :src="`/logo.png`" position="center left" height="70" width="70" contain>
          <h3 class="text-h6 font-weight-black text-center text-shadow white--text">REELS</h3>
          <div style="width:70px"></div>
        </v-card>
      </v-col>
      <v-col class="col-12">
        <v-divider></v-divider>
      </v-col>
      <v-col class="col-12">
        <PostsListComponent v-model="publications">
        </PostsListComponent>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        openCreatePost: false,
        publications: {
          random: {}
        },
        randomPublications: [],
        followersPublications: false,
        start_publicaciones: 0,
        limit_publicaciones: 12,
        search: {
          title_contains: null,
          _start: 0,
          _limit: 12,
          type: 'video'
        }
      }
    },
    created() {
      this.getPosts()
    },
    mounted() {
      this.$root.$on('newPublication', (e) => {
        this.publications.data.unshift(e)
      })
      this.deletePost()
    },
    methods: {
      deletePost() {
        this.$root.$on('deletePublication', (index) => {
          console.log(index)
          this.$delete(this.publications.data, index)
        });
      },

      async getPosts() {
        let params = {
          _start: this.start_publicaciones,
          _limit: this.limit_publicaciones
        }
        this.publications = await this.$axios.get('/publicaciones/', {
          params: this.search
        })
      }
    },
    computed: {
      pets() {
        return this.$store.getters['myPets/pets']
      }
    },
    watch: {
      followersPublications() {
        this.getPosts()
      },
      lostDogs() {
        this.getPosts()
      },
      search: {
        handler() {
          this.getPosts()
        },
        deep: true
      }
    },
  }

</script>
