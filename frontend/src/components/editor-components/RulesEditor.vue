<template>
  <div style="border: 1px solid red; margin: 10px">
    <p>RulesEdutor</p>
    <rule-list />
    <rule-editor />
  </div>
</template>

<script lang="ts">
import RuleList from "./rule-editor-components/RuleList.vue";
import RuleEditor from "./rule-editor-components/RuleEditor.vue";
export default {
  components: { RuleList, RuleEditor },
};
</script>

<style></style>
