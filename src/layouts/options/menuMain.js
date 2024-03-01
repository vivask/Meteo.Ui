export const useMenuHome = {
  href: '/',
  icon: 'mdi-home',
  title: 'Home',
};

export const useMenuPeripheral = {
  icon: 'sensors',
  title: 'Peripheral',
  value: 'peripheral',
  toggle: false,
  menu: [
    {
      title: 'GY39V3',
      value: 'gy39v3',
      toggle: false,
      menu: [
        {
          icon: 'mdi-thermometer',
          title: 'Temperature',
          value: 'temperature',
        },
        {
          icon: 'mdi-gauge',
          title: 'Pressure',
          value: 'pressure',
        },
        {
          icon: 'mdi-water-percent',
          title: 'Humidity',
          value: 'humidity',
        },
        {
          icon: 'mdi-sun-wireless',
          title: 'Lux',
          value: 'lux',
        },
      ],
    },
    {
      title: 'AHT25',
      value: 'aht25',
      toggle: false,
      menu: [
        {
          icon: 'mdi-thermometer',
          title: 'Temperature',
          value: 'tempr',
        },
        {
          icon: 'mdi-water-percent',
          title: 'Humidity',
          value: 'hum',
        },
      ],
    },
    {
      title: 'RadSens',
      value: 'radsens',
      toggle: false,
      menu: [
        {
          icon: 'mdi-radioactive',
          title: 'Static',
          value: 'static',
        },
        {
          icon: 'mdi-radioactive',
          title: 'Dynamic',
          value: 'dynamic',
        },
      ],
    },
    {
      title: 'ZE08',
      value: 'ze08ch2o',
      toggle: false,
      menu: [
        {
          icon: 'mdi-gas-cylinder',
          title: 'CH2O',
          value: 'ch2o',
        },
      ],
    },
    {
      title: 'SC16',
      value: 'sc16',
      toggle: false,
      menu: [
        {
          icon: 'mdi-gas-cylinder',
          title: 'CO',
          value: 'co',
        },
      ],
    },
  ],
};

export const useMenuController = {
  icon: 'mdi-memory',
  title: 'Controller',
  value: 'esp32',
  toggle: false,
  menu: [
    {
      icon: 'mdi-cog-box',
      title: 'Settings',
      value: 'settings',
    },
    {
      icon: 'notifications',
      title: 'Alarm',
      value: 'alarm',
    },
    {
      icon: 'mdi-history',
      title: 'Journal',
      value: 'journal',
    },
  ],
};

export const useMenuServices = {
  icon: 'settings_suggest',
  title: 'Services',
  value: 'services',
  toggle: false,
  menu: [
    {
      title: 'Proxy',
      value: 'proxy',
      toggle: false,
      menu: [
        {
          icon: 'mdi-server-network',
          title: 'Servers',
          value: 'servers',
        },
        {
          icon: 'mdi-lan',
          title: 'Locale zones',
          value: 'zones',
        },
        {
          icon: 'mdi-playlist-star',
          title: 'Manual VPN',
          value: 'manualvpn',
        },
        {
          icon: 'mdi-playlist-check',
          title: 'Auto VPN',
          value: 'autovpn',
        },
        {
          icon: 'mdi-playlist-remove',
          title: 'Ignore VPN',
          value: 'ignorevpn',
        },
      ],
    },
    {
      title: 'Schedule',
      value: 'schedule',
      toggle: false,
      menu: [
        {
          icon: 'pending_actions',
          title: 'Timetable',
          value: 'timetable',
        },
        {
          icon: 'task',
          title: 'Tasks',
          value: 'tasks',
        },
        {
          icon: 'mdi-book-clock-outline',
          title: 'Cron',
          value: 'cron',
        },
      ],
    },
    {
      title: 'Secure',
      value: 'secure',
      toggle: false,
      menu: [
        {
          icon: 'mdi-key-variant',
          title: 'SSH Keys',
          value: 'sshkeys',
        },
        {
          icon: 'mdi-lan-pending',
          title: 'SSH Hosts',
          value: 'sshhosts',
        },
        {
          icon: 'mdi-account',
          title: 'Git Users',
          value: 'gitusers',
        },
      ],
    },
    {
      title: 'Servers',
      value: 'servers',
      toggle: false,
      menu: [
        {
          icon: 'mdi-server-network',
          title: 'Main (Chatreey)',
          value: 'main',
        },
        {
          icon: 'mdi-server-network',
          title: 'Backup (N2)',
          value: 'backup',
        },
      ],
    },
    {
      title: 'Radius',
      value: 'radius',
      toggle: false,
      menu: [
        {
          icon: 'mdi-account-circle-outline',
          title: 'Authorisation',
          value: 'auth',
        },
        {
          icon: 'mdi-table-account',
          title: 'Accounting',
          value: 'accounting',
        },
        {
          icon: 'verified_user',
          title: 'Verified',
          value: 'verified',
        },
      ],
    },
    {
      title: 'Database',
      value: 'database',
      toggle: false,
      menu: [
        {
          icon: 'mdi-table-large',
          title: 'Tables',
          value: 'tables',
        },
        {
          icon: 'sync',
          title: 'Sync',
          value: 'sync',
        },
      ],
    },
  ],
};

export const useMenuCommunal = {
  href: 'communal',
  icon: 'mdi-home',
  title: 'Communal',
};
