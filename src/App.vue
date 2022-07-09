<template>
  <h1>Simple tool convert HEX, BIN, DEC</h1>

  Input your value: <input v-model="value" />
  <br />
  Select type value:
  <select v-model="from">
    <option value="hex">HEX</option>
    <option value="bin">BIN</option>
    <option value="dec">DEC</option>
  </select>
  to
  <select v-model="to">
    <option value="hex">HEX</option>
    <option value="bin">BIN</option>
    <option value="dec">DEC</option>
  </select>
  <br />
  Tutorial:
  <code v-html="result"> </code>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { binToDec } from "./logic/binToDec";
import { binToHex } from "./logic/binToHex";
import { decToBin } from "./logic/decToBin";
import { decToHex } from "./logic/decToHex";
import { hexToBin } from "./logic/hexToBin";
import { hexToDec } from "./logic/hexToDec";

type Type = "hex" | "bin" | "dec";

const value = ref("");

const from = ref<Type>("dec");
const to = ref<Type>("hex");

function noopDirectiveTransform() {
  return ["Noting transform"];
}
const mapMethods: Record<`${Type}-${Type}`, (v: string) => unknown> = {
  "hex-hex": noopDirectiveTransform,
  "bin-bin": noopDirectiveTransform,
  "dec-dec": noopDirectiveTransform,
  "hex-bin": hexToBin,
  "bin-hex": binToHex,
  "dec-hex": decToHex,
  "hex-dec": hexToDec,
  "bin-dec": binToDec,
  "dec-bin": decToBin,
};
const result = computed(() => {
  return mapMethods[`${from.value}-${to.value}`](value.value);
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
