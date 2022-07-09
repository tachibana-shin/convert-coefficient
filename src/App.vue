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

  <h5 class="my-none">Console</h5>
  <code v-html="ansi.toHtml(result.join('\n'))" />
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { binToDec } from "./logic/binToDec";
import { binToHex } from "./logic/binToHex";
import { decToBin } from "./logic/decToBin";
import { decToHex } from "./logic/decToHex";
import { hexToBin } from "./logic/hexToBin";
import { hexToDec } from "./logic/hexToDec";

import Ansi from "ansi-to-html";

const ansi = new Ansi();

type Type = "hex" | "bin" | "dec";

const value = ref("255");

const from = ref<Type>("dec");
const to = ref<Type>("hex");

function noopDirectiveTransform() {
  return ["Noting transform"];
}
const mapMethods: Record<`${Type}-${Type}`, (v: string) => string[]> = {
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
  /* color: #2c3e50; */
  margin-top: 60px;
}
body {
  background-color: #111;
  color: #eee;
  line-height: 1.5
}
</style>

<style lang="scss" scoped>
code {
  white-space: pre;
  text-align: left;
  background-color: #060a0e;
  color: #eee;
  display: block;
  padding: 10px 16px;
}
.my-none {
  margin: {
    top: 0;
    bottom: 0;
  }
}

h5 {
  text-align: left;
  padding-top: 12px;
  padding-left: 16px;
}
</style>
