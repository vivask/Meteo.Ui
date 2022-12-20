import { ref, computed, onMounted, onUnmounted } from 'vue';

export function useScreenSize(columns) {
  const event = ref(null);
  const width = ref(null);
  const height = ref(null);

  const ssEvent = computed(() => event);
  const ssWidth = computed(() => width.value || getScreenWidth());
  const ssHeigth = computed(() => height.value || getScreenHeight());
  const ssSize = computed(() => (ssWidth.value > 1900 ? 'large' : ssWidth.value > 800 ? 'medium' : 'small'));
  const ssCols = computed(() => `col-${columns[ssSize]}`);

  const getScreenWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const getScreenHeight = () =>
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  const handleResize = (e) => {
    event.value = e;
    width.value = getScreenWidth();
    height.value = getScreenHeight();
  };

  onMounted(() => {
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => window.removeEventListener('resize', handleResize));

  return { ssCols, ssSize, ssHeigth, ssWidth, ssEvent };
}
