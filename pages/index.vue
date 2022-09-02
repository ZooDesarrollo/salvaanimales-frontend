<template>
  <v-container class="d-flex flex-column align-center full-height">
    <v-row class="full-width mb-12 mb-sm-n12" no-gutters>
      <v-col class="col-12">
        <v-card color="cyan lighten-3" height="70" elevation="12"
          class="d-flex align-center justify-space-between rounded-xl mt-6">
          <img :src="`/logo.png`" position="center left" height="70" width="70" contain>
          <h3 class="text-h6 font-weight-black text-center text-shadow white--text">BIENVENIDOS</h3>
          <div style="width:70px"></div>
        </v-card>

      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="col-6 pa-1" v-for="(category,index) in categories" :key="index">
        <categoriesCardComponent :to="`/${category.title}`" :index="index+1" :category="category">
        </categoriesCardComponent>
      </v-col>
    </v-row>
    <v-card height="50" class="hide-card" flat></v-card>
    <generalCreateComponent></generalCreateComponent>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        categories: [{
            title: 'adopciones',
            color: '#00b7b7',
          }, {
            title: 'donaciones',
            color: 'cyan lighten-3',
          },
          {
            title: 'feed',
            color: 'green lighten-1',
          },
          {
            title: 'reels',
            color: 'orange darken-2',
          },
          {
            title: 'paseos',
            color: 'yellow darken-2',
          },
          {
            title: 'tienda',
            color: 'teal lighten-1',
          },
          {
            title: 'veterinarias',
            color: 'blue accent-2',
          },
          {
            title: 'extraviados',
            color: 'red accent-2',
          },


        ]
      }
    },
    created() {},
    mounted() {},
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
        if (this.search.title_contains == null || this.search.title_contains == '')
          this.$delete(this.search, 'title_contains')
        this.publications = await this.$axios.get('/publicaciones/', {
          params: this.search
        })
        await this.$axios.get('/publicaciones/random')
          .then((data) => {
            this.randomPublications = data.data
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

<style scoped>
  @media(max-height:700px) {
    .hide-card {
      display: none;
    }

  }

</style>
