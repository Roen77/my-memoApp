<template>
  <div>
    <div v-if="!hasError">
      <div>
        <h1 class="subheading grey--text">카드</h1>
        <v-container>
            <v-row no-gutters>
              <!-- 카드 리스트 -->
            <card-list v-for="card in cards" :key="card.id" :card="card"></card-list>
          </v-row>
        </v-container>
      </div>
      <router-link :to="`/board/${$route.params.id}/add`">
        <v-btn link fab color="cyan accent-4" bottom right fixed>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </router-link>
      <!-- 중첩 라우터 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CardList from '../components/card/CardList.vue'
import FetchMixin from '../mixin/FetchMixin'
export default {
  components: { CardList },
  mixins: [FetchMixin],
  computed: {
    ...mapState({ cards: 'dataList', hasError: 'hasError' })
  }

}
</script>

<style>

</style>
