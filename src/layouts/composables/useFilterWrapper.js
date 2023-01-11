import { computed, watch, toRefs, ref } from 'vue';
import { useRouter } from 'vue-router';

export function useFilterWrapper(templateFilter, storeSet, storeGet) {
  const filter = ref(templateFilter);
  const { value: filterValue } = toRefs(filter.value);
  const router = useRouter();
  const currentRoute = computed(() => router.currentRoute.value.path);

  filter.value.value = storeGet.value;
  filter.value.label = storeGet.label;

  watch(
    filterValue,
    () => {
      const val = { value: filter.value.value, label: filter.value.label };
      storeSet(val);
    },
    { immediate: true },
  );

  watch(
    currentRoute,
    (newVal) => {
      filter.value.show = filter.value.routes.includes(newVal);
    },
    { immediate: true },
  );

  return { filter };
}
