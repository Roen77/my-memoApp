<template>
    <div class="project">
        <h1 class="subheading grey--text">검색</h1>
        <h5 class="subheading red--text ">진행/완료중인 카드를 선택해주세요</h5>
        <v-container>
            <v-row>
                <v-col cols="12" md="12" class="ma-3">
                    <v-tooltip bottom>
                        <template v-slot:activator="{on}">
                            <v-btn :class="{'on':completeBtn}" @click="onCompleteFetchCard" v-on="on" small color="blue darken-1" class="ing_card mr-2 stateBtn" dark>
                                <v-icon left small>mdi-folder</v-icon>
                                <span class="caption text-lowercase">완료된 카드</span>
                            </v-btn>
                        </template>
                        <span>업데이트 순</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{on}">
                            <v-btn :class="{'on':ingBtn}" v-on="on" small color="blue darken-1" @click="ondisCompleteFetchCard" class="mr-2 stateBtn" dark>
                                <v-icon left small>mdi-folder</v-icon>
                                <span class="caption text-lowercase">진행중인 카드</span>
                            </v-btn>
                        </template>
                        <span>업데이트 순</span>
                    </v-tooltip>
                </v-col>
            </v-row>
            <template v-if="searchList.length>0">
                <template v-if="loading"></template>
                <infinite-scroller></infinite-scroller>
            </template>
            <template v-else>
                <v-card>
                    <v-card-subtitle>카드가 없어요.</v-card-subtitle>
                </v-card>
            </template>
        </v-container>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import InfiniteScroller from '../components/search/InfiniteScroller.vue'
export default {
  components: { InfiniteScroller },
  data () {
    return {
      completeBtn: false,
      ingBtn: false
    }
  },
  created () {
    // 검색 결과 초기화
    if (this.searchList) this.UPDATE_STATE({ dataList: [] })
  },
  computed: {
    ...mapState({ searchList: 'dataList', loading: 'loading' })
    // 진행상황에 따라 버튼 색 다르게 보여주기(완료된 카드 버튼)
  },
  methods: {
    ...mapActions(['FETCHSEARCHCARD']),
    ...mapMutations(['UPDATE_STATE']),
    // 완료된 카드 버튼 클릭시, 완료된 카드 가져오기
    onCompleteFetchCard () {
      this.completeBtn = true
      this.ingBtn = false
      this.FETCHSEARCHCARD({
        routeName: 'cards',
        complete: '2'
      })
    },
    // 진행중인 카드 버튼 클릭시, 진행중인 카드 가져오기
    ondisCompleteFetchCard () {
      this.ingBtn = true
      this.completeBtn = false
      // 진행중인 카드 버튼
      this.FETCHSEARCHCARD({
        routeName: 'cards',
        complete: '1'
      })
    }
  }
}
</script>

<style scroped>
button.v-btn.stateBtn.on{background-color: rgb(235, 41, 79) !important; font-weight: bold;}
@media (max-width:360px) {
    .project .row{display: block;}
    .project .row button{display: block; margin-top: 2px;}
}
</style>
