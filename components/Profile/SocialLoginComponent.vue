<template>
    <v-row>
      <v-col class="col-6 col-md-6 d-flex justify-end">
        <v-btn fab depressed @click="loginGoogle()" color="#de5246">
            <v-icon color="white">mdi-google</v-icon>
        </v-btn>
      </v-col>
      <v-col class="col-6 col-md-6 d-flex justify-start">
        <v-btn fab depressed @click="loginFacebook()" color="#4267B2">
            <v-icon color="white">mdi-facebook</v-icon>
        </v-btn>
      </v-col>
    </v-row>
</template>

<script>
  import axios from 'axios';
export default {
    data() {
        return {

        }
    },
    created(){
      this.checkSignIn()
    },
    methods:{
      checkSignIn(){
        if(this.$route.query.id_token){
          axios.get(this.$axios.defaults.baseURL +'/auth/google/callback/',{params:this.$route.query})
            .then((data)=>{
              this.$auth.setUserToken(data.data.jwt)
              this.$auth.fetchUser()
            })
        }else if(this.$route.query.access_token){
          axios.get(this.$axios.defaults.baseURL +'/auth/facebook/callback/',{params:this.$route.query})
            .then((data)=>{
              this.$auth.setUserToken(data.data.jwt)
              this.$auth.fetchUser()
            })
        }
      },
      loginGoogle() {
        location.href = `${this.$axios.defaults.baseURL}/connect/google/`
      },
      loginFacebook() {
        location.href = `${this.$axios.defaults.baseURL}/connect/facebook/`
      },

    }
}
</script>