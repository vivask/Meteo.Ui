<template>
  <ui-box-vue
    :columns="boxCols"
    header="List of cron jobs"
    :buttonShow="true"
    buttonLabel="Refresh"
    :buttonClick="refresh"
  >
    <q-table hide-header :rows="rows" :columns="columns" row-key="name" :rows-per-page-options="[10, 50, 100, 0]">
      <template #body-cell-state="props">
        <q-td :props="props" class="wd-40">
          <q-icon name="schedule" size="2rem" />
        </q-td>
      </template>
      <template #body-cell-job="props">
        <q-td :props="props">
          <q-card square flat>
            <q-card-section align="left">
              <div class="text-subtitle1 text-bold text-left text-primary">
                {{ props.row.note }}
              </div>
              <div class="text-subtitle2 text-left">Next run at: {{ formatLongDate(props.row.time) }}</div>
            </q-card-section>
          </q-card>
        </q-td>
      </template>
    </q-table>
  </ui-box-vue>
</template>

<script>
import { defineComponent, ref, computed, onMounted, inject, onActivated } from 'vue';
import UiBoxVue from 'src/app/components/UiBox.vue';
import { createWarapper } from '../api/cronApi';
import { useUtils } from 'src/app/composables/useUtils';

const columns = [{ name: 'state' }, { name: 'job' }];

export default defineComponent({
  name: 'PageCron',

  components: {
    UiBoxVue,
  },

  setup() {
    const rows = ref([]);
    const wrapper = createWarapper(rows);
    const boxCols = { xl: 5, lg: 5, md: 7, sm: 11, xs: 10 };
    const { formatLongDate } = useUtils();

    const refresh = async () => (rows.value = await wrapper.Get(true));

    onMounted(async () => refresh());
    onActivated(async () => (rows.value = await wrapper.Get(false)));

    return {
      columns,
      rows,
      wrapper,
      boxCols,
      refresh,
      formatLongDate,
    };
  },
});
</script>

<style lang="sass" scoped>
.wd-30
  width: 30px
  max-width: 30px
.wd-100
  width: 100px
  max-width: 100px
</style>
