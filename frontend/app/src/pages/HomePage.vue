<template>
    <v-container fluid>
        <v-row>
          <v-col class="debts-list">
            <debts-list :list="debts" v-model="selected" />
          </v-col>
          <v-col>
            <debts-form
              :selected="selected"
              :type="selected.formType"
              @add="handleFormAdd"
              @update="handleFormUpdate"
              @del="handleFormDel"
            />
          </v-col>
        </v-row>
        <v-fab-transition>
          <v-btn
            key="mdi-plus"
            color="primary"
            fab
            large
            dark
            absolute
            bottom
            right
            class="v-btn--example"
            @click="handlePlusButton"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
    </v-container>
</template>

<script>
import DebtsList from '../components/DebtsList';
import DebtsForm from '../components/DebtsForm';

export default {
  name: 'HomePage',
  components: {
    DebtsList,
    DebtsForm
  },
  data: () => ({
    debts: [],
    selected: {
      formType: 2,
      id: '',
      userID: '',
      userName: '',
      cause: '',
      value: '',
      date: ''
    }
  }),
  mounted () {
    this.$instanceDebtsAPI
      .listAll()
      .then(response => {
        this.debts = response.data
      })
  },
  methods: {
    handlePlusButton () {
      this.formType = 2
      this.selected = {
        id: '',
        userID: '',
        userName: '',
        cause: '',
        value: '',
        date: ''
      }
    },
    handleFormDel (id) {
      this.handlePlusButton()
      const index = this.debts.findIndex(d => d._id === id)
      this.debts.splice(index, 1)
    },
    handleFormAdd (d) {
      this.handlePlusButton()
      this.debts.push(d)
    },
    handleFormUpdate (updated) {
      this.handlePlusButton()
      const index = this.debts.findIndex(d => d._id === updated._id)
      console.log(index)
      this.$set(this.debts, index, updated)
      console.log(this.debts[index])
    }
  }
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