<template>
  <div @click="goToPublication()">
    <v-card class="mb-3" flat v-if="publication.main_picture!=null">
      <v-card class="rounded-lg">
        <v-img aspect-ratio="2" lazy-src="/logo.png" gradient="to top right, #0000001c, #00000040"
          :src="mainPictureUrl()" max-height="200" class="d-flex align-end"
          cover>
          <postComments :publication="publication" :goToPublication="goToPublication" :likeOrDislike="likeOrDislike"></postComments>
        </v-img>
      </v-card>
      <v-card-text class="font-weight-bold black--text pl-0" v-if="publication.content!=null">
        {{publication.title}}
      </v-card-text>
    </v-card>
    <v-card class="mb-3" flat v-else>
      <v-card class="rounded-lg">
        <v-card-text class="font-weight-bold black--text text-left" v-if="publication.content!=null">
          {{publication.content.substr(0,80)}}
        </v-card-text>
        <v-divider></v-divider>
          <postComments textColor="black" class="py-1" :publication="publication" :goToPublication="goToPublication" :likeOrDislike="likeOrDislike"></postComments>
      </v-card>
    </v-card>
  </div>
</template>

<script>
  import moment from 'moment';
  import postComments from '~/components/Posts/PostCard/postComments.vue';
  export default {
    components:{
      postComments
    },
    props: {
      index:Number,
      publicProp: {
        type: Object,
        default: {
          likes: [],
        }
      }
    },
    data() {
      return {
        publication: this.publicProp,
        openBottomFollow: false
      }
    },
    methods: {
      goToProfile() {
        return this.$router.push('account/user/profile/' + this.publication.user.id)
      },
      goToPublication(){
        if(this.publication.comments_active)
          return this.$router.push(`/post/${this.publication.id}`)
      },
      formatDate(date) {
        return moment(date).format('DD/MM/YYYY');
      },
      mainPictureUrl() {
        if(this.publication.main_picture!=null)
          return this.$axios.defaults.baseURL+this.publication.main_picture.url
        else
          return '/logo.png'
      },
      likeOrDislike() {

        if (this.publication.likeUser) {
          this.$axios.delete(`/publicaciones/removeLike/${this.publication.id}`).then(response => {
            this.publication.likeUser = false
            this.publication.likes -= 1
          })
        } else {
          this.$axios.post(`/publicaciones/addLike/${this.publication.id}`).then(response => {
            this.likeId = response.data.id
            this.publication.likeUser = true
            this.publication.likes += 1
          })
        }
      },
      deletePublication(id, index) {
        this.$axios.delete(`/publicaciones/${id}/`)
          .then(() => {
            this.$root.$emit('deletePublication',this.index)
          })
      }
    }
  }

</script>
