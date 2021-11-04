<template>
  <nav>
      <v-app-bar color="indigo darken-1" dark app>
          <v-app-bar-nav-icon @click.stop="drawer=!drawer">
          </v-app-bar-nav-icon>
          <v-toolbar-title>
              <span><router-link class="link-text white--text font-weight" to="/">Memo</router-link></span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
            <v-menu offset-y>
            <template v-slot:activator="{on}">
            <v-btn class="menu" text v-on="on">
                <v-icon left>mdi-animation</v-icon>
                <span>메뉴</span>
            </v-btn>
        </template>
        <v-list flat>
            <v-list-item v-for="link in links" :key="link.text" router :to="link.route" active-class="border">
                <v-list-item-title>{{link.text}}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
          <v-btn text @click="logout">
              <span>로그아웃</span>
              <v-icon right>mdi-exit-to-app</v-icon>
          </v-btn>
      </v-app-bar>
      <!-- 사이드 메뉴 -->
      <v-navigation-drawer v-model="drawer" dark app class="indigo">
          <div v-if="getUser" class="mt-5">
              <v-avatar size="60" color="primary" class="d-block ma-auto my-3">
                 <v-icon dark>mdi-account-circle</v-icon>
              </v-avatar>
              <p class="white--text subheading mt-1 text-center">{{getUser}}</p>
          </div>
          <div class="my-6">
              <!-- 보드 추가 팝업 -->
              <v-row justify="center">
                <board-popup :title="`새 보드`" :btnTxt="`보드 추가`"></board-popup>
              </v-row>
          </div>
          <v-list flat>
              <v-list-item v-for="link of links" :key="link.text" router :to="link.route" active-class="border">
                  <v-list-item-action>
                      <v-icon>{{link.icon}}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                      <v-list-item-title>{{link.text}}</v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
          </v-list>
      </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import BoardPopup from '../board/BoardPopup.vue'
export default {
  components: { BoardPopup },
  data () {
    return {
      drawer: false,
      links: [{
        icon: 'mdi-view-dashboard',
        text: '홈',
        route: '/'
      },
      {
        icon: 'mdi-folder',
        text: '검색',
        route: '/projects'
      }
      ]
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    ...mapMutations(['LOGOUT']),
    logout () {
      this.LOGOUT()
      this.$router.push('/login')
    }
  }

}
</script>

<style>
.border{border-left: 4px solid #0ba518;}
@media (max-width:400px) {
    .menu{display: none;}
}
</style>
