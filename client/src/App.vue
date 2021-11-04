<template>
 <v-app>
   <ie-check></ie-check>
   <!-- 알림창 -->
   <alert-bar></alert-bar>
   <!-- 스피너 -->
   <spinner></spinner>
    <!-- 사용자 정보가 없다면 -->
   <template v-if="!getUser">
     <app-header></app-header>
   </template>
     <!-- 사용자 정보가 있다면 -->
  <template v-else>
    <navbar></navbar>
  </template>
    <!-- 메인 -->
   <v-main class="ma-4">
     <error-page></error-page>
     <router-view></router-view>
   </v-main>
    <!-- 푸터 -->
   <app-footer></app-footer>
 </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import AlertBar from './components/common/AlertBar.vue'
import AppFooter from './components/common/AppFooter.vue'
import AppHeader from './components/common/AppHeader.vue'
import ErrorPage from './components/common/ErrorPage.vue'
import Navbar from './components/common/Navbar.vue'
import Spinner from './components/common/Spinner.vue'
import IeCheck from './components/IeCheck.vue'

export default {
  components: { Navbar, AppFooter, Spinner, AppHeader, AlertBar, ErrorPage, IeCheck },
  name: 'App',
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>

<style>
a{text-decoration: none; color:#222;}
.link-text{text-decoration: none; color:#fff; display: block; width: 100%; height: 100%;}
@media (max-width:600px){
  .container{padding: 0;}
  .v-application--wrap main.ma-4{margin: 16px 6px !important;}
}
</style>
