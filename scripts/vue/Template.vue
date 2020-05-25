<template>
  <div class="__PACKAGE_NAME__">{{msg}}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class __PACKAGE_CLASS_NAME__ extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.__PACKAGE_NAME__ {
  /* styles here */
}
</style>
