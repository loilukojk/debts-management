<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
.container {
  position: relative;
  height: fit-content;
}

.debts-list {
  flex-grow: 0;
  min-width: 300px;
}

@media screen and (max-width: 900px) {
  .debts-list, .debts-list .v-card {
    min-width: 100%;
  }
}
</style>
