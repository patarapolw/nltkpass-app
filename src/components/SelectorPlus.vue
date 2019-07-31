<template>
  <v-select :items="items" :value="currentItems" @input="onChoose" :label="label" outlined multiple>
    <template v-slot:prepend-item>
      <v-list-item ripple @click="$emit('more')">
        <v-list-item-content>
          <v-list-item-title>{{moreLabel}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-select>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class SelectorPlus extends Vue {
    @Prop() items!: string[];

    @Prop({default: "Source"}) label!: string;
    @Prop({default: "Download more sources"}) moreLabel!: string;

    private currentItems: string[] = [this.items[0]];

    @Emit("input")
    public onChoose(newValue: string[]) {
        console.log(newValue);
        this.currentItems = newValue;
        return newValue;
    }
}
</script>

