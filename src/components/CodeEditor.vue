<template>
  <div class="code-editor-wrapper">
    <div class="flex justify-between items-center mb-3">
      <h3 class="text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 text-transparent bg-clip-text flex items-center gap-2">
        <span class="animate-pulse">💻</span> Code Editor
      </h3>
      <button
        @click="resetCode"
        class="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 rounded-xl text-sm text-white font-bold transform hover:scale-105 transition-all shadow-lg"
      >
        🔄 Reset
      </button>
    </div>
    <div ref="editorRef" class="border-2 border-cyan-500/30 rounded-xl overflow-hidden shadow-2xl"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { EditorView, basicSetup } from 'codemirror';
import { typescriptLanguage } from '@codemirror/lang-javascript';
import { LanguageSupport } from '@codemirror/language';
import { oneDark } from '@codemirror/theme-one-dark';

const props = defineProps<{
  modelValue: string;
  readOnly?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const editorRef = ref<HTMLElement>();
let editorView: EditorView | null = null;

const resetCode = () => {
  emit('update:modelValue', props.modelValue);
};

onMounted(() => {
  if (!editorRef.value) return;

  editorView = new EditorView({
    doc: props.modelValue,
    extensions: [
      basicSetup,
      new LanguageSupport(typescriptLanguage),
      oneDark,
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          emit('update:modelValue', update.state.doc.toString());
        }
      }),
      EditorView.editable.of(!props.readOnly)
    ],
    parent: editorRef.value
  });
});

watch(() => props.modelValue, (newValue) => {
  if (editorView && newValue !== editorView.state.doc.toString()) {
    editorView.dispatch({
      changes: {
        from: 0,
        to: editorView.state.doc.length,
        insert: newValue
      }
    });
  }
});
</script>

<style scoped>
.code-editor-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.code-editor-wrapper :deep(.cm-editor) {
  height: 100%;
  font-size: 14px;
}

.code-editor-wrapper :deep(.cm-scroller) {
  overflow: auto;
}
</style>
