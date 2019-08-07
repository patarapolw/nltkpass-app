<template>
    <v-container>
        <SelectorPlus :items="sourceItems" />

        <v-btn block color="normal" light @click="generateSentence">Generate sentence</v-btn>

        <v-card class="mt-3" v-if="sentence0">
            <v-card-title>
                {{sentence0}}
            </v-card-title>
        </v-card>

        <v-textarea class="mt-3" v-model="sentence1" label="Please type what you think the sentence says" filled
        v-if="sentence0"/>

        <v-btn block color="primary" light v-if="sentence1" @click="generatePassword">Generate password</v-btn>

        <v-card class="mt-3" v-if="password">
            <v-card-title class="password">
                {{password}}
            </v-card-title>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SelectorPlus from '../components/SelectorPlus.vue';
import NltkPass from '../lib/NltkPass';
import { g } from "@/shared";

@Component({
    components: {SelectorPlus}
})
export default class SentencePassGenerator extends Vue {
    private sourceItems = [
        "brown-tagged.ndjson"
    ];

    private sentence0 = "";
    private sentence1 = "";
    private password = "";

    private generateSentence() {
        this.sentence0 = g.nltkPass.generateSentence();
        this.sentence1 = this.sentence0;
    }

    private generatePassword() {
        this.password = g.nltkPass.generatePassword(this.sentence1).password;
    }
}
</script>

