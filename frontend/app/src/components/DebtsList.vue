<template>
  <v-card
    class="mx-auto"
    max-width="300"
    tile
  >
    <v-list dense>
      <v-subheader>Danh sách các con nợ của tôi</v-subheader>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in list"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.userName"></v-list-item-title>
            <v-list-item-title v-text="item.value"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
  </v-list>
</v-card>
</template>

<script>
  export default {
    model: {
      event: 'change'
    },
    props: {
      list: Array
    },
    data: () => ({
      selectedItem: -1
    }),
    watch: {
      selectedItem (val) {
        if (val !== undefined) {
          this.$emit('change', { ...this.list[val], formType: 1 })
        } else {
          this.$emit('change', { ...this.list[val], formType: 2 })
        }
      }
    }
  }
</script>
