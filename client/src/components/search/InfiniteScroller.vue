<template>
    <RecycleScroller class="scroller" :items="searchList" :item-size="160" key-field="id" page-mode v-slot="{ item }">
        <!-- {{item}} -->
        <router-link :to="`/card/${item.id}`">
            <v-card class="mb-1 pa-1 card scroll_card" :style="`border:5px solid ${item.bgcolor}`" height="140">
                <v-row no-gutters class="`pa-3 project" :class="{'complete':item.complete}">
                    <!-- 카드 제목 -->
                    <v-col md="6" sm="4">
                        <div class="caption grey--text txt">
                            카드 제목
                        </div>
                        <div>{{item.title}}</div>
                    </v-col>
                    <!-- 대표 카테고리 -->
                    <v-col class="category_area" md="2" sm="4">
                        <div class="caption grey--text txt">
                            대표 카테고리
                        </div>
                        <div>
                            <v-chip :color="item.bgcolor">{{item.Category && item.Category.type}}</v-chip>
                        </div>
                    </v-col>
                    <!-- 카드 내용 -->
                    <v-col md="4" sm="4">
                        <div class="caption grey--text">
                            카드 내용
                        </div>
                        <div class="overline des">{{item.description}}</div>
                    </v-col>
                </v-row>
            </v-card>
        </router-link>
    </RecycleScroller>
</template>

<script>
import { mapState } from 'vuex'
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
export default {
  component: {
    RecycleScroller
  },
  computed: {
    ...mapState({ searchList: 'dataList' })
  }

}
</script>

<style scoped>
.scroller {
  height: 100%;
}
.des{overflow: hidden; white-space:nowrap; text-overflow: ellipsis;}
@media (max-width:360px) {
    .scroll_card .txt{display: none;}
    .category_area{position: absolute; text-align: right; right: 3px; top:3px; }
}

</style>
