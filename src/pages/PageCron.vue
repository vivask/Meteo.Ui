<template>
  <ui-box-vue
    :columns="boxCols"
    header="List of cron jobs"
    :spinner="spinner"
    :buttonShow="buttonShow"
    buttonLabel="Refresh"
    :buttonClick="getJobs"
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
              <div class="text-subtitle2 text-left">
                Next run at: {{ date.formatDate(props.row.time, 'MMM DD, YYYY HH:mm:ss') }}
              </div>
            </q-card-section>
          </q-card>
        </q-td>
      </template>
    </q-table>
  </ui-box-vue>
</template>

<script>
import { defineComponent, ref, computed, onMounted, inject } from 'vue';
import { date } from 'quasar';
import UiBoxVue from '@/components/UiBox.vue';
import { useTableWrapper } from '@/composables/useTableWrapper.js';

const columns = [{ name: 'state' }, { name: 'job' }];

export default defineComponent({
  name: 'PageCron',

  components: {
    UiBoxVue,
  },

  beforeRouteEnter(to, from) {
    if (from.path === '/schedule/jobs') {
      return (vm) => {
        vm.getJobs();
      };
    }
  },

  setup() {
    const axios = inject('axios');
    const rows = ref([]);
    const wrapper = useTableWrapper('/schedule/cron', axios, rows);
    const spinner = ref(true);
    const boxCols = { xl: 5, lg: 5, md: 7, sm: 11, xs: 10 };
    const buttonShow = ref(true);

    onMounted(async () => {
      rows.value = await wrapper.Get();
      spinner.value = false;
    });

    return {
      spinner,
      columns,
      rows,
      buttonShow,
      wrapper,
      boxCols,
      date,

      async getJobs() {
        rows.value = await wrapper.Get();
      },
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
