<template>
    <div>
        <v-chip v-for="(choice,index) in selectList" :key="index" @click="$emit('onRepresent',choice)"
            text-color="white" color="pink" :close="edit.editState && edit.removeState"
            @click:close="onChipClose(choice,index)" class="ma-1 c_chip">
            <!-- 카테고리 이미지가 아니라면 아이콘 보여주기 -->
            <v-icon v-if="!choice.imagetype" left>{{choice.icon}}</v-icon>
            <!-- 카테고리 이미지라면 이미지 보여주기 -->
            <v-avatar class="mr-1" v-else>
              <v-progress-circular v-if="$store.state.imageLoading"  :size="25" indeterminate color="red"></v-progress-circular>
              <img v-else :src="choice.icon" alt="#">
            </v-avatar>
            {{choice.type}}
        </v-chip>
        <!-- 오류 메세지 -->
        <v-alert class="mt-1 alert_msg card" v-if="errmsg && edit.editState" outlined border="right" color="red" dense
            elevation="2" type="warning">{{errmsg}}</v-alert>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    selectList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      errmsg: ''
    }
  },
  computed: {
    ...mapState(['unitCard', 'edit'])
  },
  watch: {
    'edit.editState': function (value) {
      if (value) {
        this.errmsg = ''
      }
    }
  },
  methods: {
    ...mapActions(['DELETECATEGORY']),
    onChipClose (choice) {
      try {
        if (choice.id === this.unitCard.Category.id) {
          this.errmsg = `현재 등록된 대표 카테고리 ${this.unitCard.Category.type}은/는 삭제 할 수 없습니다`
          return
        }
        this.DELETECATEGORY({
          BoardId: this.unitCard.BoardId,
          CardId: this.unitCard.id,
          choice
        })
          .then(() => {
            this.errmsg = ''
          })
      } catch (error) {
        console.error(error)
        this.errmsg = error.response.data.msg
      }
    }
  }
}
</script>

<style>
 .alert_msg.card{width: 50%; font-size: 13px; padding: 3px;}
</style>
