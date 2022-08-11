<template>
  <div>
    <v-autocomplete full-width class="font-weight-light rounded-lg" height="60" solo :hide-details="hideDetails"
      :items="publicaciones" dense :loading="isLoading" :search-input.sync="search" hide-no-data item-value="title"
      item-text="title" placeholder="Buscar..." :rounded="rounded" background-color="white" v-model="result"
      @keyup.enter="result = search">
      <template v-slot:prepend-inner>
        <v-slide-x-reverse-transition mode="out-in">
          <v-btn icon @click="emitSearch()">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-slide-x-reverse-transition>
      </template>
      <template v-slot:append>
        <v-slide-x-reverse-transition mode="out-in">
          <v-btn icon @click="openCreatePost = true">
            <v-icon color="primary">mdi-plus-circle</v-icon>
          </v-btn>
        </v-slide-x-reverse-transition>
      </template>
    </v-autocomplete>
    <PostsCreateComponent v-model="openCreatePost"></PostsCreateComponent>
  </div>
</template>
<script>
  /* eslint-disable */
  export default {
    name: "autocomplete",
    props: {
      outlined: Boolean,
      solo: Boolean,
      rounded: Boolean,
      value: String,
      icon: Boolean,
      hideDetails: Boolean,
    },
    data: () => ({
      openCreatePost:false,
      publicaciones: [],
      isLoading: false,
      search: "",
      result: {}
    }),
    methods: {},
    watch: {
      search(val) {
        // Items have already been requested
        this.isLoading = true;
        // Lazily load input items
        const query = `?_where[_or][1][title_contains]=${val}`
        this.$axios
          .get(`/publicaciones/${query}`)
          .then(data => {
            this.publicaciones = data.data;
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => (this.isLoading = false));
      },
      result(val) {
        console.log(val);
        this.$emit("input", val ?? "");
      }
    }
  };

</script>
