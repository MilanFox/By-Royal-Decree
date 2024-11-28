<template>
  <VueMonacoEditor
    class="code-editor"
    theme="vs-dark"
    :options="MONACO_EDITOR_OPTIONS"
    language="javascript"
    :default-value="defaultCode"
    @update:value="(value: string) => code = value"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLogicStore } from '@stores/logic';
import type { CodeEditorProps } from '@atoms/CodeEditor/CodeEditor.types';

const props = defineProps<CodeEditorProps>();

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
  minimap: { enabled: false },
};

const code = ref(props.defaultCode);
const logicStore = useLogicStore();

const saveUserCode = (scope: keyof typeof logicStore.gameLogic) => {
  logicStore.gameLogic[scope] = eval(`async (entity) => { ${code.value} }`);  // eslint-disable-line no-eval
};

defineExpose({
  saveUserCode,
});
</script>

<style lang="scss">
.code-editor {
  height: 100%;
}
</style>
