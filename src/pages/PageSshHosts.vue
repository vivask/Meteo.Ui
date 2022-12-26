<template>
  <ui-box-vue
    :columns="boxCols"
    header="SSH hosts management"
    :spinner="spinner"
    :buttonShow="buttonShow"
    buttonLabel="Add"
    :buttonClick="handleAdd"
    tooltip="Add new ssh host"
  >
    <q-table hide-header :rows="rows" :columns="columns" row-key="host" :rows-per-page-options="[10, 50, 100, 0]">
      <template #body-cell-state="props">
        <q-td :props="props" class="wd-20">
          <q-icon :name="activeIcon(props.row.activity)" size="1.2rem" :color="activeColor(props.row.activity)" />
        </q-td>
      </template>
      <template #body-cell-icon="props">
        <q-td :props="props" class="wd-80">
          <q-icon name="computer" size="md" />
        </q-td>
      </template>
      <template #body-cell-host="props">
        <q-td :props="props" class="wd-100">
          <div class="text-subtitle1 text-bold text-left text-primary">
            {{ props.row.host }}
          </div>
          <div class="text-subtitle2 text-left">Key: {{ props.row.ssh_key.owner }}</div>
          <div class="text-subtitle2 text-left">
            {{ props.row.short_finger }}
          </div>
          <div class="text-meta text-left">Created {{ formatLongDate(props.row.created) }}</div>
          <div v-if="!isEmptyTime(props.row.used)" class="text-meta text-left">
            Last used {{ formatLongDate(props.row.used) }}
          </div>
        </q-td>
      </template>
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn class="q-ml-xs" dense round color="primary" size="md" icon="add" @click="handleAdd()">
            <q-tooltip> Add new ssh host </q-tooltip>
          </q-btn>
          <q-btn class="q-ml-xs" dense round color="positive" size="md" icon="mode_edit" @click="handleEdit(props.row)">
            <q-tooltip> Edit ssh host </q-tooltip>
          </q-btn>
          <q-btn class="q-ml-xs" dense round color="negative" size="md" icon="delete" @click="handleDelete(props.row)">
            <q-tooltip> Delete ssh host </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </ui-box-vue>

  <form-ssh-host-vue ref="form" @submit="handleSubmit" />
</template>

<script>
import { defineComponent, ref, computed, onMounted, inject, onActivated } from 'vue';

import UiBoxVue from '@/components/UiBox.vue';
import { useTableWrapper } from '@/composables/useTableWrapper.js';
import { useTableHandlers } from '@/composables/useTableHandlers';
import FormSshHostVue from '@/forms/FormSshHost.vue';
import { useUtils } from '@/composables/useUtils.js';
import { useRelationApi } from '@/composables/useRelatioApi';

const columns = [{ name: 'state' }, { name: 'icon' }, { name: 'host' }, { name: 'actions' }];

export default defineComponent({
  name: 'PageSshHosts',

  components: {
    UiBoxVue,
    FormSshHostVue,
  },

  setup() {
    const axios = inject('axios');
    const rows = ref([]);
    const wrapper = useTableWrapper('/sshclient/sshhosts', axios, rows);
    const spinner = ref(true);
    const form = ref(null);
    const boxCols = { xl: 5, lg: 5, md: 7, sm: 11, xs: 10 };
    const buttonShow = computed(() => rows.value.length === 0);

    const refresh = async () => (rows.value = await wrapper.Get());

    const { handleAdd, handleEdit, handleSubmit, handleDelete } = useTableHandlers(form, rows, wrapper, {});

    const { formatLongDate, isEmptyTime, activeIcon, activeColor } = useUtils();

    onMounted(() => {
      refresh();
    });

    return {
      spinner,
      columns,
      rows,
      buttonShow,
      wrapper,
      form,
      boxCols,

      formatLongDate,
      isEmptyTime,
      activeIcon,
      activeColor,

      handleAdd,
      handleEdit,
      handleSubmit,
      handleDelete,

      //onActivated,
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
