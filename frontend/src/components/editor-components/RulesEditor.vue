<template>
  <rule-list />
  <rule-editor />
</template>

<script lang="ts">
import RuleList from "./rule-editor-components/RuleList.vue";
import RuleEditor from "./rule-editor-components/RuleEditor.vue";
export default {
  components: { RuleList, RuleEditor },
};
</script>

<style></style>
