<template>
  <section class="section">
    <div class="section-head">
      <h2>メモ帳</h2>
      <span class="hint">ローカル保存のシンプルノート</span>
    </div>
    <div class="grid cols-2">
      <div class="card stack">
        <div class="controls">
          <button class="btn btn-primary" type="button" @click="saveNote">保存</button>
          <button class="btn btn-secondary" type="button" @click="createNew">新規作成</button>
          <button class="btn btn-ghost" type="button" @click="deleteNote">削除</button>
        </div>
        <label class="stack">
          タイトル
          <input v-model="title" class="input" placeholder="無題のメモ">
        </label>
        <label class="stack">
          本文
          <textarea v-model="body" class="textarea" rows="10"></textarea>
        </label>
        <p class="muted">{{ status }}</p>
      </div>
      <div class="card stack">
        <p class="muted" style="margin:0;">メモ一覧</p>
        <ul class="stack" style="margin:0; padding:0; list-style:none;">
          <li
            v-for="note in sortedNotes"
            :key="note.id"
            :class="['card', 'stack']"
            style="margin:0; cursor:pointer; box-shadow:none;"
            @click="selectNote(note.id)"
          >
            <strong>{{ note.title || '無題のメモ' }}</strong>
            <span class="muted">最終更新: {{ formatDate(note.updatedAt) }}</span>
          </li>
          <li v-if="!sortedNotes.length" class="muted">まだメモがありません。</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: 'メモ帳'
});

type Note = { id: string; title: string; body: string; updatedAt: string };
const storageKey = 'yn_notepad_notes';
const notes = ref<Note[]>([]);
const activeId = ref<string | null>(null);
const title = ref('');
const body = ref('');
const status = ref('未保存');

const loadNotes = () => {
  try {
    const raw = localStorage.getItem(storageKey);
    notes.value = raw ? JSON.parse(raw) : [];
  } catch (e) {
    notes.value = [];
  }
};

const persist = () => {
  localStorage.setItem(storageKey, JSON.stringify(notes.value));
};

const sortedNotes = computed(() =>
  notes.value.slice().sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
);

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

const selectNote = (id: string) => {
  activeId.value = id;
  const note = notes.value.find((n) => n.id === id);
  title.value = note?.title ?? '';
  body.value = note?.body ?? '';
  status.value = note ? `選択中 / 最終更新: ${formatDate(note.updatedAt)}` : '未保存';
};

const createNew = () => {
  activeId.value = null;
  title.value = '';
  body.value = '';
  status.value = '新しいメモを作成中…';
};

const saveNote = () => {
  const now = new Date().toISOString();
  if (!activeId.value) {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: title.value.trim() || '無題のメモ',
      body: body.value,
      updatedAt: now
    };
    notes.value.push(newNote);
    persist();
    selectNote(newNote.id);
    status.value = '新しいメモを保存しました。';
    return;
  }
  const target = notes.value.find((n) => n.id === activeId.value);
  if (!target) return;
  target.title = title.value.trim() || '無題のメモ';
  target.body = body.value;
  target.updatedAt = now;
  persist();
  selectNote(target.id);
  status.value = '保存しました。';
};

const deleteNote = () => {
  if (!activeId.value) {
    status.value = '削除するメモが選択されていません。';
    return;
  }
  notes.value = notes.value.filter((n) => n.id !== activeId.value);
  persist();
  activeId.value = null;
  title.value = '';
  body.value = '';
  status.value = '削除しました。';
};

onMounted(() => {
  loadNotes();
  if (notes.value[0]) {
    selectNote(notes.value[0].id);
  }
});
</script>
