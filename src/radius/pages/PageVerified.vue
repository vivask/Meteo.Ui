<template>
  <ui-box-vue
    :columns="boxCols"
    header="Verified users"
    :buttonShow="true"
    buttonLabel="Refresh"
    :buttonClick="refresh"
  >
    <q-table :rows="rows" :columns="columns" row-key="name" :rows-per-page-options="[0, 10, 50, 100]">
      <template #body-cell-actions="props">
        <q-td :props="props">
          <ui-round-btn-vue
            color="warning"
            icon="mdi-minus-thick"
            tooltip="Exclude user from verified"
            @click="handleExclude(props.row)"
          />
        </q-td>
      </template>
    </q-table>
  </ui-box-vue>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import UiBoxVue from 'src/components/UiBox.vue';
import { useUtils } from 'src/composables/useUtils.js';
import UiRoundBtnVue from 'src/components/UiRoundBtn.vue';
import { useConfirmDialog } from 'src/composables/useConfirmDialog.js';
import { createWrapper } from '../api/verifiedApi';

export default defineComponent({
  name: 'PageVerified',

  components: {
    UiBoxVue,
    UiRoundBtnVue,
  },

  setup() {
    const columns = [
      {
        name: 'username',
        label: 'User',
        align: 'left',
        field: 'username',
        sortable: true,
      },
      {
        name: 'callingstationid',
        label: 'User Id',
        align: 'left',
        field: 'callingstationid',
        sortable: true,
      },
      {
        name: 'acctupdatetime',
        label: 'Last used',
        align: 'left',
        field: 'acctupdatetime',
        sortable: true,
        format: (val, row) => formatLongDate(val),
      },
      { name: 'actions' },
    ];

    const rows = ref([]);
    const wrapper = createWrapper(rows);
    const confirm = useConfirmDialog();
    const boxCols = { xl: 6, lg: 6, md: 7, sm: 11, xs: 10 };
    const { formatLongDate } = useUtils();

    const refresh = async () => (rows.value = await wrapper.Get());

    onMounted(() => refresh());

    return {
      columns,
      rows,
      boxCols,
      formatLongDate,
      refresh,

      async handleExclude(row) {
        const ok = await confirm.show('Are you sure to exclude this item?');
        if (ok) {
          rows.value = await wrapper.Delete(row);
        }
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.wd-60
  width: 60px
  max-width: 60px
</style>
