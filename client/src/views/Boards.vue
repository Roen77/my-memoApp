<template>
    <div>
        <div>
            <h1 class="subheading grey--text ">보드</h1>
            <v-container>
                <v-row no-gutters>
                    <v-col class="py-1" cols="12" md="4" lg="3" v-for="board in boards" :key="board.id">
                        <board-card :board="board"></board-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
import FetchMixin from '../mixin/FetchMixin'
import { mapState } from 'vuex'
import BoardCard from '../components/board/BoardCard.vue'
export default {
  components: { BoardCard },
  mixins: [FetchMixin],
  computed: {
    ...mapState({ boards: 'dataList' })
  }
}
</script>

<style>

</style>
