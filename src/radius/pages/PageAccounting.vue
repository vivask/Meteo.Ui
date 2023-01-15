<template>
  <ui-box-vue
    :columns="boxCols"
    header="Accounting Radius"
    :buttonShow="true"
    buttonLabel="Clear"
    :buttonClick="handleClear"
  >
    <q-table :rows="rows" :columns="columns" row-key="name" :rows-per-page-options="[10, 50, 100, 0]">
      <template #body-cell-state="props">
        <q-td :props="props" class="wd-60">
          <q-btn
            class="q-ml-xs"
            dense
            round
            :color="color(props.row)"
            size="md"
            :icon="icon(props.row)"
            @click="handleVerify(props.row)"
          >
            <q-tooltip>Confirm verify user</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </ui-box-vue>
</template>

<script>
import { defineComponent, ref, onMounted, watch, computed } from 'vue';
import UiBoxVue from 'src/app/components/UiBox.vue';
import { useUtils } from 'src/app/composables/useUtils.js';
import { useConfirmDialog } from 'src/app/composables/useConfirmDialog.js';
import { useLayoutStore } from 'src/app/stores/useLayoutStore.js';
import { getAccounting, applyValidation, Clear } from '../api/accountingApi';

export default defineComponent({
  name: 'PageAccounting',

  components: {
    UiBoxVue,
  },

  setup() {
    const columns = [
      {
        name: 'state',
      },
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
        name: 'acctstarttime',
        label: 'Start time',
        align: 'left',
        field: 'acctstarttime',
        sortable: true,
        format: (val, row) => formatLongDate(val),
      },
      {
        name: 'nasportid',
        label: 'AP',
        align: 'left',
        field: 'nasportid',
        sortable: true,
      },
      {
        name: 'acctupdatetime',
        label: 'Update time',
        align: 'left',
        field: 'acctupdatetime',
        sortable: true,
        format: (val, row) => formatLongDate(val),
      },
      {
        name: 'acctstoptime',
        label: 'Stop time',
        align: 'left',
        field: 'acctstoptime',
        sortable: true,
        format: (val, row) => formatLongDate(val),
      },
      {
        name: 'calledstationid',
        label: 'Station Id',
        align: 'left',
        field: 'calledstationid',
        sortable: true,
      },
    ];

    const rows = ref([]);
    const confirm = useConfirmDialog();
    const boxCols = { xl: 9, lg: 9, md: 7, sm: 11, xs: 10 };
    const { formatLongDate } = useUtils();
    const layoutStore = useLayoutStore();
    const filter = computed(() => layoutStore.usersFilter.value);

    const isVerifiedUser = (row) => row.verified && row.verified.length > 0 && row.valid && row.valid.length > 0;
    const isValidUser = (row) => isVerifiedUser(row) && row.valid === row.username;

    const color = (row) => (isValidUser(row) ? 'positive' : isVerifiedUser(row) ? 'warning' : 'negative');
    const icon = (row) => (row.verified.length > 0 ? 'verified_user' : 'mdi-shield-account');

    const refresh = async () => (rows.value = await getAccounting(filter.value));

    onMounted(() => refresh());

    watch(filter, () => refresh());

    return {
      columns,
      rows,
      confirm,
      boxCols,
      formatLongDate,
      refresh,
      color,
      icon,

      async handleVerify(row) {
        if (!isVerifiedUser(row)) {
          const ok = await applyValidation(row.id);
          if (ok) refresh();
        }
      },

      async handleClear() {
        const ok = await Clear(filter.value);
        if (ok) refresh();
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
