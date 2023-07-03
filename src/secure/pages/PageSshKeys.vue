<template>
  <ui-box-vue
    :columns="boxCols"
    header="SSH key management"
    :buttonShow="buttonShow"
    buttonLabel="Add"
    :buttonClick="handleAdd"
    tooltip="Add new ssh key"
  >
    <q-table hide-header :rows="rows" :columns="columns" row-key="id" :rows-per-page-options="[10, 50, 100, 0]">
      <template #body-cell-state="props">
        <q-td :props="props" class="wd-20">
          <q-icon :name="activeIcon(props.row.activity)" size="1.2rem" :color="activeColor(props.row.activity)" />
        </q-td>
      </template>
      <template #body-cell-icon="props">
        <q-td :props="props" class="wd-80">
          <q-icon name="mdi-key-variant" size="md" />
        </q-td>
      </template>
      <template #body-cell-key="props">
        <q-td :props="props" class="wd-100">
          <div class="text-subtitle1 text-bold text-left text-primary">
            {{ props.row.owner }}
          </div>
          <div class="text-subtitle2" text-left>
            {{ props.row.short_finger }}
          </div>
          <div class="text-meta text-left">
            Created {{ formatLongDate(props.row.created, 'MMM DD, YYYY HH:mm:ss') }}
          </div>
          <div v-if="!isEmptyTime(props.row.used)" class="text-meta text-left">
            Last used {{ formatLongDate(props.row.used, 'MMM DD, YYYY HH:mm:ss') }}
          </div>
        </q-td>
      </template>
      <template #body-cell-actions="props">
        <q-td :props="props">
          <ui-round-btn-vue color="primary" icon="add" tooltip="Create ssh key" @click="handleAdd" />
          <!-- <ui-round-btn-vue color="positive" icon="mode_edit" tooltip="Edit ssh key" @click="handleEdit(props.row)" /> -->
          <ui-round-btn-vue color="negative" icon="delete" tooltip="Delete ssh key" @click="handleDelete(props.row)" />
        </q-td>
      </template>
    </q-table>
  </ui-box-vue>

  <form-ssh-key-vue v-if="visible" ref="form" @submit="handleSubmit" @cancel="handleCancel" />
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue';
import UiBoxVue from '../../app/components/UiBox.vue';
import UiRoundBtnVue from '../../app/components/UiRoundBtn.vue';
import { useTableHandlers } from '../../app/composables/useTableHandlers';
import FormSshKeyVue from '../forms/FormSshKey.vue';
import { useUtils } from '../../app/composables/useUtils.js';
import { createWrapper } from '../api/sshKeysApi';

const columns = [{ name: 'state' }, { name: 'icon' }, { name: 'key' }, { name: 'actions' }];

export default defineComponent({
  name: 'PageSshKeys',

  components: {
    UiBoxVue,
    UiRoundBtnVue,
    FormSshKeyVue,
  },

  setup() {
    const rows = ref([]);
    const wrapper = createWrapper(rows);
    const form = ref(null);
    const boxCols = { xl: 5, lg: 5, md: 7, sm: 11, xs: 10 };
    const buttonShow = computed(() => rows.value.length === 0);
    const visible = ref(false);

    const { handleAdd, /*handleEdit,*/ handleSubmit, handleDelete, handleCancel } = useTableHandlers(
      visible,
      form,
      rows,
      wrapper,
      {},
    );

    const { formatLongDate, isEmptyTime, activeIcon, activeColor } = useUtils();

    onMounted(async () => (rows.value = await wrapper.Get(true)));

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
      // handleEdit,
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
