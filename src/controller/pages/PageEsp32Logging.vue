<template>
  <ui-box-vue :columns="boxCols" header="Message log" :buttonShow="true" buttonLabel="Clear" :buttonClick="handleClear">
    <q-table dense :rows="rows" :columns="columns" row-key="date" :rows-per-page-options="[10, 50, 100, 0]">
      <template #body-cell-date="props">
        <q-td :props="props" class="wd-80" :class="logColor(props.row.type)">
          {{ shortDate(props.row.date_time) }}
        </q-td>
      </template>
      <template #body-cell-time="props">
        <q-td :props="props" class="wd-70" :class="logColor(props.row.type)">
          {{ shortTime(props.row.date_time) }}
        </q-td>
      </template>
      <template #body-cell-message="props">
        <q-td :props="props" :class="logColor(props.row.type)">
          {{ props.row.message }}
        </q-td>
      </template>
    </q-table>
  </ui-box-vue>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import UiBoxVue from '@/shared/components/UiBox.vue';
import { useConfirmDialog } from '@/shared/composables/useConfirmDialog.js';
import { useUtils } from '@/shared/composables/useUtils.js';
import { getLogging, clearLogging } from '../api/loggingApi';

const columns = [
  {
    name: 'date',
    align: 'left',
    label: 'Date',
  },
  {
    name: 'time',
    align: 'left',
    label: 'Time',
  },
  {
    name: 'message',
    align: 'left',
    label: 'Message',
  },
];

export default defineComponent({
  name: 'PageEsp32Logging',

  components: {
    UiBoxVue,
  },

  setup() {
    const rows = ref([]);
    const boxCols = { xl: 9, lg: 9, md: 7, sm: 11, xs: 10 };
    const { shortDate, shortTime } = useUtils();
    const confirm = useConfirmDialog();

    const refresh = async () => (rows.value = await getLogging());

    onMounted(() => refresh());

    return {
      columns,
      rows,
      confirm,
      boxCols,
      refresh,
      shortDate,
      shortTime,

      async handleClear() {
        const ok = await confirm.show('Are you sure you want to clear logging?');
        if (ok) {
          clearLogging(rows);
        }
      },

      logColor(msgType) {
        switch (msgType) {
          case 'I':
            return 'text-subtitle1 text-positive';
          case 'W':
            return 'text-subtitle1 text-warning';
          case 'E':
            return 'text-subtitle1 text-negative';
          default:
            return 'text-subtitle1 text-grey';
        }
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.wd-70
  width: 70px
  max-width: 70px
.wd-80
  width: 80px
  max-width: 80px
</style>
