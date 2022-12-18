import { defineComponent } from 'vue';
import { VueScreenSizeMixin } from 'vue-screen-size';

export default defineComponent({
  mixins: [VueScreenSizeMixin],

  //expose: ['create', 'vssName', 'vssCalss'],

  provide() {
    return {
      screen: {
        create: this.create,
        name: this.vssName,
        class: this.vssCalss,
      },
    };
  },

  data() {
    return {
      columns: {},
    };
  },

  computed: {
    vssName() {
      //console.log(this.$vssWidth, 'x', this.$vssHeight);
      return this.$vssWidth > 1900 ? 'large' : this.$vssWidth > 800 ? 'medium' : 'small';
    },

    vssCalss() {
      //console.log(`col-${this.columns[this.vssName]}`);
      return `col-${this.columns[this.vssName]}`;
    },
  },

  methods: {
    create(size = {}) {
      this.columns = size;
    },
  },
});
