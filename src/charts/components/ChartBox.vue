<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start">
      <div class="square rounded-borders" :class="cols">
        <div>
          <Line
            :options="options"
            :data="data"
            chart-id="one-line-chart"
            dataset-id-key="label"
            width="100"
            height="400"
          />
        </div>
        <div class="q-pa-md">
          <ui-square-btn-vue
            :disable="priorDisable"
            tooltip="Prior"
            color="primary"
            icon="navigate_before"
            class="wd-half"
            @click="prior"
          />
          <ui-square-btn-vue
            :disable="nextDisable"
            tooltip="Next"
            color="primary"
            icon="navigate_next"
            class="wd-half"
            @click="next"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, watch, toRefs, ref, onMounted } from 'vue';
import { Screen } from 'quasar';
import UiSquareBtnVue from 'src/app/components/UiSquareBtn.vue';
import { useLayoutStore } from 'src/app/stores/useLayoutStore.js';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);

export default defineComponent({
  name: 'ChartBox',

  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Line, UiSquareBtnVue },

  props: {
    label: {
      type: String,
      required: true,
    },

    values: {
      type: Array,
      required: true,
    },

    labels: {
      type: Array,
      required: true,
    },

    modelValue: {
      type: Object,
      required: true,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const { modelValue } = toRefs(props);
    const layoutStore = useLayoutStore();
    const period = computed(() => layoutStore.periodFilter.value);
    let end = null;
    let begin = null;
    const columns = { xl: 8, lg: 10, md: 7, sm: 7, xs: 10 };
    const cols = computed(() => `col-${columns[Screen.name]}`);

    const { values } = toRefs(props);
    const priorDisable = ref(false);
    const nextDisable = ref(true);

    const data = computed(() => ({
      labels: props.labels,
      datasets: [
        {
          label: props.label,
          backgroundColor: '#f87979',
          borderColor: '#f87979',
          data: props.values,
        },
      ],
    }));

    const options = {
      responsive: true,
      maintainAspectRatio: false,
    };

    const periodForward = () => {
      let date = new Date(end);
      if (period.value === 'day') {
        date.setHours(date.getHours() + 24);
      } else if (period.value === 'week') {
        date.setDate(date.getDate() + 6);
      } else if (period.value === 'month') {
        date.setMonth(date.getMonth() + 1);
      } else if (period.value === 'year') {
        date.setFullYear(date.getFullYear() + 1);
      }
      return new Date(date);
    };

    const periodBack = () => {
      let date = new Date(end);
      if (period.value === 'day') {
        date.setHours(date.getHours() - 24);
      } else if (period.value === 'week') {
        date.setDate(date.getDate() - 6);
      } else if (period.value === 'month') {
        date.setMonth(date.getMonth() - 1);
      } else if (period.value === 'year') {
        date.setFullYear(date.getFullYear() - 1);
      }
      return new Date(date);
    };

    const isDisableNext = () => {
      const nextDate = periodForward();
      const now = new Date();
      return nextDate > now;
    };

    const initPeriod = () => {
      end = new Date();
      begin = periodBack();
      emit('update:modelValue', { begin: begin, end: end });
      nextDisable.value = isDisableNext();
    };

    watch(period, () => initPeriod());

    onMounted(() => initPeriod());

    watch(values, (newVal) => {
      if (period.value === 'day') {
        priorDisable.value = newVal.length < 25;
      } else if (period.value === 'week') {
        priorDisable.value = newVal.length < 7;
      } else if (period.value === 'month') {
        priorDisable.value = newVal.length < 32;
      } else if (period.value === 'year') {
        priorDisable.value = newVal.length < 12;
      }
    });

    return {
      localModel: modelValue,
      cols,
      options,
      data,
      end,
      begin,
      periodForward,
      periodBack,
      nextDisable,
      priorDisable,

      next() {
        end = periodForward();
        begin = periodBack();
        emit('update:modelValue', { begin: begin, end: end });
        nextDisable.value = isDisableNext();
      },

      prior() {
        end = periodBack();
        begin = periodBack();
        emit('update:modelValue', { begin: begin, end: end });
        nextDisable.value = isDisableNext();
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.bot-line
  border-bottom: 1px solid rgba(86, 61, 124, .2)
.square
  margin: 5px
  background: rgba(86, 61, 124, .15)
  border: 1px solid rgba(86, 61, 124, .2)
.wd-half
  width: 49%
.ml-5
  margin-left: 7px
</style>
