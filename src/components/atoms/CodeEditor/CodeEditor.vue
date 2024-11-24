<template>
  <VueMonacoEditor
    class="code-editor"
    theme="vs-dark"
    :options="MONACO_EDITOR_OPTIONS"
    language="javascript"
    :default-value="defaultFunctionContext"
    @keydown="handleSave"
    @update:value="(value: string) => code = value"
  />
</template>

<script setup lang="ts">
import { defaultFunctionContext } from '@atoms/CodeEditor/CodeEditor.const';
import { ref } from 'vue';
import { useLogicStore } from '@stores/logic';
import useUserLogic from '@composables/useUserLogic';

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
};

const code = ref(defaultFunctionContext);
const logicStore = useLogicStore();

const handleSave = (event: KeyboardEvent) => {
  if ((event.metaKey || event.ctrlKey) && event.key === 's') {
    event.preventDefault();
    logicStore.gameLogic.pawn = eval(code.value);  // eslint-disable-line no-eval
    useUserLogic().runUserCode();
  }
};
</script>

<style lang="scss">
.code-editor {
  height: 100%;
}
</style>
