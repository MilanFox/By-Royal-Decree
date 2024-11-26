<template>
  <VueMonacoEditor
    class="code-editor"
    theme="vs-dark"
    :options="MONACO_EDITOR_OPTIONS"
    language="javascript"
    :default-value="defaultFunctionContext"
    @update:value="(value: string) => code = value"
  />
</template>

<script setup lang="ts">
import { defaultFunctionContext } from '@atoms/CodeEditor/CodeEditor.const';
import { ref } from 'vue';
import { useLogicStore } from '@stores/logic';
import useUserLogic from '@composables/useUserLogic';
import useLevel from '@composables/useLevel';

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
};

const code = ref(defaultFunctionContext);
const logicStore = useLogicStore();

const runUserCode = () => {
  useLevel().initializeLevel(1);
  logicStore.gameLogic.pawn = eval(code.value);  // eslint-disable-line no-eval
  useUserLogic().runUserCode();
};

defineExpose({
  runUserCode,
});
</script>

<style lang="scss">
.code-editor {
  height: 100%;
}
</style>
