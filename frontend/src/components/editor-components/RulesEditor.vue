<template>
  <div id="ruleseditor">
    <p>RulesEditor</p>
    <!-- <rule-list />
    <rule-editor /> -->
  </div>
</template>

<script lang="ts">
import RuleList from "./rule-editor-components/RuleList.vue";
import RuleEditor from "./rule-editor-components/RuleEditor.vue";
export default {
  components: { RuleList, RuleEditor },
};
</script>

<style>
#ruleseditor {
  border: 1px solid red;
  margin: 10px;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 5px;
}
</style>
