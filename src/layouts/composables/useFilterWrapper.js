import { computed, watch, toRefs, ref } from 'vue';
import { useRouter } from 'vue-router';

export function useFilterWrapper(templateFilter, storeFunc) {
  const filter = ref(templateFilter);
  const { value: filterValue, label: filterLabel } = toRefs(filter.value);
  const router = useRouter();
  const currentRoute = computed(() => router.currentRoute.value.path);

  watch(
    filterValue,
    () => {
      storeFunc({ value: filterValue.value, label: filterLabel.value });
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
