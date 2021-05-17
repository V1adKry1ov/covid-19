<template>
  <v-card
    class="ma-6 pa-3"
    :class="color"
    min-width="360"
    dark
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-icon class="icon">{{ icon }}</v-icon>
        <v-list-item-title class="headline mb-5 mt-5 text-center">{{amount}}</v-list-item-title>
        <v-list-item-subtitle class="text-center">{{ title }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

  </v-card>
</template>

<script>

  export default {
    name: 'Card',
    data() {
      return {}
    },
    props: {
      color: String,
      title: String,
      icon: String,
      amount: Number
    }
  }

</script>

<style scoped>
  .icon {
    margin: auto;
    width: 100%;
    font-size: 2.5rem;
  }
</style>