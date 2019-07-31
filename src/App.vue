<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>NLTK</span>
        <span class="font-weight-light">Pass</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/patarapolw/nltkpass-app"
        target="_blank"
      >
        <span class="mr-2">GitHub</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-tabs v-model="tabs" centered grow>
        <v-tab>
          Simple
        </v-tab>
        <v-tab>
          Sentence
        </v-tab>

        <v-tab-item>
          <SimplePassGenerator/>
        </v-tab-item>
        <v-tab-item>
          <SentencePassGenerator/>
        </v-tab-item>
      </v-tabs>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import SentencePassGenerator from './tabs/SentencePassGenerator.vue';
import SimplePassGenerator from './tabs/SimplePassGenerator.vue';

@Component({
  components: {SimplePassGenerator, SentencePassGenerator}
})
export default class App extends Vue {
  private tabs = 0;
}
</script>
