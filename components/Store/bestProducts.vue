<template>
  <v-card flat class="rounded-lg" :to="`/store/product/${product.id}`">
    <v-img height="180" cover :src="pictureUrl(product.main_picture)" class="rounded-lg elevation-3 d-flex align-end">
      <v-card-actions class="py-3 d-flex align-start">
        <v-row no-gutters>
          <v-col class="col-12 col-md-12">
            <h3 class="font-weight-black white--text">{{product.name}}</h3>
          </v-col>
          <v-col class="col-12 col-md-12"></v-col>
        </v-row>
        <v-spacer></v-spacer>
        <v-row no-gutters>
          <v-col class="col-12 col-md-12 text-right">
            <span class="font-weight-black white--text">$ {{product.price}}</span>
          </v-col>
          <v-col class="col-12 col-md-12 text-right">
            <span class="font-weight-light white--text caption">/{{product.main_category.name}}</span>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-img>
  </v-card>

</template>

<script>
  export default {
    props: {
      product: Object
    },
    methods: {
      pictureUrl(picture) {
        return picture.url;
        return (picture.formats.small) ? picture.formats.small.url : picture.formats.url
      },

    }
  }

</script>
