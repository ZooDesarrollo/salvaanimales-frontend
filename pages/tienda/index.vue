<template>
  <v-container>
    <v-row class="mt-2">
      <v-col class="col-12">
        <v-card color="teal lighten-1" height="70" elevation="12" class="d-flex align-center justify-space-between rounded-xl">
          <img :src="`/logo.png`" position="center left" height="70" width="70" contain>
          <h3 class="text-h6 font-weight-black text-center text-shadow white--text">TIENDA</h3>
          <div style="width:70px"></div>
        </v-card>
      </v-col>
      <v-col class="col-12 col-md-12" v-for="(product) in products" :key="product.id">
        <generalProducts :product="product"></generalProducts>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import bestProducts from '~/components/Store/bestProducts.vue'
  import generalProducts from '~/components/Store/generalProducts.vue'
  export default {
    components: {
      bestProducts,
      generalProducts
    },
    data() {
      return {
        modalCategories: false,
        categories: [],
        products: [],
        search: {}
      }
    },
    created() {
      this.getProducts()
      this.$store.dispatch('titlePages/setTitlePage', {
        text: 'Pet Store',
        color: 'white'
      })
    },

    methods: {
      getCategories() {
        this.$axios.get('/categories/?level=1&_sort=name:ASC')
          .then((data) => {
            this.categories = data.data
          })
      },
      getProducts() {
        this.products = []

        this.$axios.get(`/productos/`, {
            params: this.search
          })
          .then((data) => {
            this.products = data.data
          })
      }
    },
  }

</script>
<style scoped>
  .top-background {
    height: 30vh;
    border-bottom-left-radius: 30px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }

</style>
