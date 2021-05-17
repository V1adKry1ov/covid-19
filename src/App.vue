<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Infection statistics</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="#5465FF" dense dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="headline">
        <v-icon>mdi-virus</v-icon> Covid-19</v-toolbar-title
      >

      <v-spacer></v-spacer>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="country in countries"
            :key="country"
            @click="() => {}"
            link
            :to="'/country/' + country"
          >
            <v-list-item-title @click="updateCountry(country)">{{
              country
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main class="main">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      drawer: false,
      items: [
        { title: "Introduction", icon: "mdi-shield-home", link: "/" },
        { title: "World", icon: "mdi-earth", link: "/world" }
      ]
    };
  },
  mounted() {
    this.$store.dispatch("updateTopCountries");
    this.$store.dispatch("setTotalStat");
  },
  methods: {
    updateCountry(country) {
      this.$store.dispatch("newCountryName", country);
    }
  },
  computed: {
    countries() {
      return this.$store.getters.topCountries;
    }
  }
};
</script>
<style lang="scss" scoped>
.main {
  background-color: #d7d9d7;
}
</style>
