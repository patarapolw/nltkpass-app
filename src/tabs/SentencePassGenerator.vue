<template>
    <v-container>
        <SelectorPlus :items="sourceItems" />

        <v-btn block color="normal" light>Generate sentence</v-btn>

        <v-card class="mt-3">
            <v-card-title>
                {{sentence0}}
            </v-card-title>
        </v-card>

        <v-textarea class="mt-3" v-model="sentence1" label="Please type what you think the sentence says" filled/>

        <v-btn block color="primary" light>Generate password</v-btn>

        <v-card class="mt-3">
            <v-card-title class="password">
                {{password}}
            </v-card-title>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SelectorPlus from '../components/SelectorPlus.vue';

@Component({
    components: {SelectorPlus}
})
export default class SentencePassGenerator extends Vue {
    private sourceItems = [
        "brown.json"
    ];

    private sentence0 = "Check back tomorrow; I will see if the book has arrived.";
    private sentence1 = "Check back tomorrow; I will see if the book has arrived.";
    private password = "flappedAltho8Y'rePersistingEver'ill-starred7dIwyndham'sReactivityO'erCkohnstammSwasn'tFaTsBruisingIever'aerials";
}
</script>

