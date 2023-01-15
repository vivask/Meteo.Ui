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
            :class="priorClass"
            @click="prior"
          />
          <ui-square-btn-vue
            :disable="nextDisable"
            tooltip="Next"
            color="primary"
            icon="navigate_next"
            :class="nextClass"
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
    let end = null;
    let begin = null;
    const { modelValue } = toRefs(props);
    const layoutStore = useLayoutStore();
    const period = computed(() => layoutStore.periodFilter.value);
    const columns = { xl: 8, lg: 10, md: 10, sm: 10, xs: 10 };
    const cols = computed(() => `col-${columns[Screen.name]}`);
    const priorClass = computed(() => (Screen.name === 'xs' ? 'wd-100' : 'wd-half'));
    const nextClass = computed(() => (Screen.name === 'xs' ? 'wd-100 mt-10' : 'wd-half ml-5'));

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
      priorClass,
      nextClass,

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
.wd-100
  width: 100%
.ml-5
  margin-left: 7px
.mt-10
  margin-top: 10px
</style>
