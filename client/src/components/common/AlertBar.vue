<template>
    <v-snackbar class="alert-bar" v-model="alert.success" :timeout="alert.timeout" color="teal" transition="scale-transition">
        {{ alert.text }}
    </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      success: true
    }
  },
  computed: {
    ...mapState(['alert'])
  }
}
</script>

<style>
.v-snack.alert-bar{width: 100%;}
.v-sheet.v-snack__wrapper{min-width:120px;}
.v-snack__wrapper .v-snack__content{word-break:break-all;}
</style>
