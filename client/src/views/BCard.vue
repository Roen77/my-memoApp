<template>
  <div>
    <v-row v-if="showCard && !hasError" justify="center">
      <v-dialog v-model="unitCard" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card class="unit_card">
          <v-toolbar dark :color="unitCard.bgcolor">
            <!-- 닫기 버튼 -->
            <router-link class="mr-3" :to='`/board/${unitCard.BoardId}`'>
              <v-btn @click="resetState" icon class="indigo" id=
              "card-close">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </router-link>
            <!-- 제목 -->
            <v-toolbar-title class="black--text font-weight-bold">내 카드</v-toolbar-title>
          </v-toolbar>
          <!-- container -->
          <v-container class="edit_container">
            <card-edit-form></card-edit-form>
          </v-container>
          <!-- 메뉴 -->
          <action-menu @onClickBtn="clickBtn" bottom right
             :direction="menu.direction"  :transition="menu.transition"
            :menus="menu.txts"></action-menu>
        </v-card>
      </v-dialog>
      <!--삭제 알림창 -->
      <alert-con-firm v-model="confirm" @agree="onAgree" @disagree="ondisAgree" :data="`카드 ${unitCard.title}`">
      </alert-con-firm>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import ActionMenu from '../components/common/ActionMenu.vue'
import AlertConFirm from '../components/common/AlertConFirm.vue'
import CardEditForm from '../components/form/CardEditForm.vue'
import FetchMixin from '../mixin/FetchMixin'
export default {
  components: { ActionMenu, CardEditForm, AlertConFirm },
  mixins: [FetchMixin],
  computed: {
    ...mapState(['unitCard', 'edit', 'hasError', 'showCard'])
  },
  data () {
    return {
      // 알림창
      confirm: false,
      showColorpicker: false,
      // 메뉴
      menu: {
        direction: 'top',
        transition: 'slide-y-reverse-transition',
        txts: [{
          icon: 'mdi-pencil',
          btnTxt: '수정모드',
          color: 'green'
        }, {
          icon: 'mdi-delete',
          btnTxt: '삭제',
          color: 'red'
        }]
      }
    }
  },
  created () {
    this.resetState()
  },
  methods: {
    ...mapActions(['DELETELIST']),
    ...mapMutations(['UPDATE_STATE']),
    // 카드편집모드
    onEditCard () {
      this.UPDATE_STATE({
        edit: {
          editState: true
        }
      })
    },
    // 카드 삭제
    onremoveCard () {
      this.DELETELIST({ routeName: this.$route.name, id: this.unitCard.id, BoardId: this.unitCard.BoardId })
        .then((data) => {
          // 보드가 가지고 있는 카드가 아예 존재 하지 않는다면 메인페이지로 이동시켜줍니다.
          data.isNotCard ? this.$router.push('/') : this.$router.push(`/board/${this.unitCard.BoardId}`)
        })
    },
    clickBtn (index) {
      switch (index) {
        // 수정모드
        case 0:
          this.onEditCard()
          break
          // 삭제
        case 1:
          this.confirm = true
          break

        default:
          break
      }
    },
    // 카드 삭제 동의 후 확인창 닫기
    onAgree () {
      this.onremoveCard()
      this.confirm = false
    },
    // 카드 삭제 비동의 후 확인창 닫기
    ondisAgree () {
      this.confirm = false
    },
    //  편집 모드 해제시 모든 상태를 초기화시켜줍니다.
    resetState () {
      this.UPDATE_STATE({
        edit: {
          editState: false,
          addState: false,
          removeState: false
        },
        mainCategory: {}
      })
    }
  }
}
</script>

<style>
.v-dialog--fullscreen {background-color:#fff;;}
.v-dialog--fullscreen > .v-card{width: 100%;}
.edit_container{padding: 0 7px;}
@media (max-width:360px){
  #card-close{width: 30px; height: 30px;}
  #card-edit-btn{min-width:45px; font-size: 12px; padding: 0 5px;}
  .unit_card .v-toolbar__content{padding: 2px 8px;}
}
</style>
