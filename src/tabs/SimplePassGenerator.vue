<template>
    <v-container>
        <SelectorPlus :items="sourceItems"/>

        <v-layout>
            <v-flex xs4>
                <v-text-field label="Word Count" v-model="wordCount" :rules="numberConstraint(3, 7)" required>
                </v-text-field>
            </v-flex>
            <v-flex xs4>
                <v-text-field label="Punctuation Count" v-model="punctuationCount" :rules="numberConstraint(0, 5)" required></v-text-field>
            </v-flex>
            <v-flex xs4>
                <v-text-field label="Digit Count" v-model="digitCount" :rules="numberConstraint(0, 5)" required></v-text-field>
            </v-flex>
        </v-layout>

        <v-btn block color="primary" light class="mt-3" @click="generatePassword">Generate password</v-btn>

        <v-card class="mt-3">
            <v-card-title class="password">
                {{password}}
            </v-card-title>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SelectorPlus from '../components/SelectorPlus.vue';
import NltkPass from '../lib/NltkPass';
import { g } from '../shared';

@Component({
    components: {SelectorPlus}
})
export default class SimplePassGenerator extends Vue {
    private sourceItems = [
        "brown-rare.json"
    ];
    private wordCount = "5";
    private punctuationCount = "2";
    private digitCount = "2";

    private password = "The generated password will be shown here.";

    private numberConstraint(min: number, max: number) {
        return [
            (x: string) => !isNaN(parseInt(x)) || "A number is required.",
            (x: string) => parseInt(x) >= min || `The number must be at least ${min}.`,
            (x: string) => parseInt(x) <= max || `The number must be at most ${max}.`
        ]
    }

    private generatePassword() {
        this.password = g.nltkPass.generatePassword(undefined,
        parseInt(this.punctuationCount),
        parseInt(this.digitCount),
        parseInt(this.wordCount)).password;
    }
}
</script>

