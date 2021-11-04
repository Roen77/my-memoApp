<template>
    <v-container v-if="hasError">
        <v-row no-gutters>
            <v-col cols="12">
                <template v-if="errMsg.status">
                    <v-card elevation="2" shaped>
                        <v-card-title>{{errMsg.status}}에러</v-card-title>
                        <v-card-subtitle>{{showMsg}}</v-card-subtitle>
                    </v-card>
                </template>
            </v-col>
        </v-row>
</v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['hasError', 'errMsg']),
    showMsg () {
      if (this.errMsg.data && this.errMsg.data.msg) return this.errMsg.data.msg
      return '존재하지 않는 페이지이거나 잘못된 페이지입니다.'
    }
  }
}
</script>

<style>

</style>
