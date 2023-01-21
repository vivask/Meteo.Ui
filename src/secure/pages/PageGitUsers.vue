<template>
  <ui-box-vue
    :columns="boxCols"
    header="Git users management"
    :buttonShow="buttonShow"
    buttonLabel="Add"
    :buttonClick="handleAdd"
    tooltip="Add new git user"
  >
    <q-table hide-header :rows="rows" :columns="columns" row-key="name" :rows-per-page-options="[10, 50, 100, 0]">
      <template #body-cell-state="props">
        <q-td :props="props" class="wd-20">
          <q-icon :name="activeIcon(props.row)" size="1.2rem" :color="activeColor(props.row)" />
        </q-td>
      </template>
      <template #body-cell-icon="props">
        <q-td :props="props" class="wd-80">
          <q-icon name="mdi-account" size="md" />
        </q-td>
      </template>
      <template #body-cell-user="props">
        <q-td :props="props" class="wd-100">
          <div class="text-subtitle1 text-bold text-left text-primary">
            {{ props.row.username }}
          </div>
          <div class="text-subtitle2 text-left">Key: {{ props.row.ssh_key.owner }}</div>
          <div class="text-meta text-left">Created {{ formatLongDate(props.row.created) }}</div>
          <div v-if="isEmptyTime(props.row.used)" class="text-meta text-left">
            Last used {{ formatLongDate(props.row.used) }}
          </div>
        </q-td>
      </template>
      <template #body-cell-actions="props">
        <q-td :props="props">
          <ui-round-btn-vue color="primary" icon="add" tooltip="Create git user" @click="handleAdd" />
          <ui-round-btn-vue color="positive" icon="mode_edit" tooltip="Edit git user" @click="handleEdit(props.row)" />
          <ui-round-btn-vue color="negative" icon="delete" tooltip="Delete git user" @click="handleDelete(props.row)" />
        </q-td>
      </template>
    </q-table>
  </ui-box-vue>

  <form-git-user-vue v-if="visible" ref="form" @submit="handleSubmit" @cancel="handleCancel" />
</template>

<script>
import { defineComponent, ref, computed, onMounted, inject, onActivated } from 'vue';

import UiBoxVue from '../../app/components/UiBox.vue';
import UiRoundBtnVue from '../../app/components/UiRoundBtn.vue';
import { useTableHandlers } from '../../app/composables/useTableHandlers';
import FormGitUserVue from '../forms/FormGitUser.vue';
import { useUtils } from '../../app/composables/useUtils.js';
import { createWrapper } from '../api/gitUsersApi';

const columns = [{ name: 'state' }, { name: 'icon' }, { name: 'user' }, { name: 'actions' }];

export default defineComponent({
  name: 'PageGitUsers',

  components: {
    UiBoxVue,
    UiRoundBtnVue,
    FormGitUserVue,
  },

  setup() {
    const rows = ref([]);
    const wrapper = createWrapper(rows);
    const form = ref(null);
    const boxCols = { xl: 5, lg: 5, md: 7, sm: 11, xs: 10 };
    const buttonShow = computed(() => rows.value.length === 0);
    const visible = ref(false);

    const { handleAdd, handleEdit, handleSubmit, handleDelete, handleCancel } = useTableHandlers(
      visible,
      form,
      rows,
      wrapper,
      {},
    );

    const { formatLongDate, isEmptyTime, activeIcon, activeColor } = useUtils();

    onMounted(async () => (rows.value = await wrapper.Get(true)));
    onActivated(async () => (rows.value = await wrapper.Get(false)));

    return {
      columns,
      rows,
      buttonShow,
      wrapper,
      form,
      boxCols,
      visible,

      formatLongDate,
      isEmptyTime,
      activeIcon,
      activeColor,

      handleAdd,
      handleEdit,
      handleSubmit,
      handleDelete,
      handleCancel,
    };
  },
});
</script>

<style lang="sass" scoped>
.wd-20
  width: 20px
  max-width: 20px
.wd-80
  width: 80px
  max-width: 80px
.wd-100
  width: 100px
  max-width: 100px
</style>
