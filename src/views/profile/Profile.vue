<template>
    <div>
    <v-navigation-drawer class="blue-grey darken-4" dark fixed
      v-model="drawerRight"
      left
      clipped
      app>
    </v-navigation-drawer>
    <v-btn class='primary' dark @click.stop="drawerRight = !drawerRight"><v-icon>reorder</v-icon>Toggle</v-btn>
    <v-divider></v-divider>
        <v-container>
            <router-view></router-view>
        </v-container>
    </div>
</template>

<script>
export default {
    name: 'Profile',
    data(){
        return{
             
               drawer: true,
    drawerRight: true,
    right: null,
    left: null
        }
    }
}
</script>

<style>

</style>
