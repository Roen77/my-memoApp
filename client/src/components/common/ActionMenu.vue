<template>
    <v-speed-dial class="action_menu" v-model="fab" :top="top" :bottom="bottom" :right="right" :left="left" :direction="direction" :transition="transition">
        <template v-slot:activator>
            <v-btn v-model="fab" color="blue darken-2" dark fab>
                <v-icon v-if="fab">
                    mdi-close
                </v-icon>
                <v-icon v-else>
                    mdi-menu
                </v-icon>
            </v-btn>
        </template>
        <v-tooltip bottom v-for="(menu,index) in menus" :key="index">
      <template v-slot:activator="{ on, attrs }">
      <v-btn  @click="$emit('onClickBtn',index)" v-on="on" v-bind="attrs" fab dark small :color="menu.color">
            <v-icon>{{menu.icon}}</v-icon>
        </v-btn>
      </template>
      <span>{{menu.btnTxt}}</span>
    </v-tooltip>
    </v-speed-dial>
</template>

<script>
export default {
  props: {
    top: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    },
    left: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      required: true
    },
    transition: {
      type: String,
      required: true
    },
    menus: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      fab: false
    }
  }
}
</script>

<style>
  .action_menu.v-speed-dial {
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }
</style>
