<template>
  <v-app-bar v-scroll="onScroll" color="white" dense
    class="elevation-0" app>
    <slot :offsetTop="offsetTop"></slot>
  </v-app-bar>
</template>

<script>
  export default {
    props:{
      color:{
        default:'transparent'
      }
    },
    data() {
      return {
        offsetTop: 0,
      }
    },
    methods: {
      onScroll(e) {
        this.offsetTop = e?.currentTarget?.scrollY
      },
      logout() {
        this.$auth.logout()
        return this.$router.push('/home')
      }
    },
  }

</script>

