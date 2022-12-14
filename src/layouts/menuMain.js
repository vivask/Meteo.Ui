export const useMenuHome = {
  href: '#/',
  icon: 'mdi-home',
  title: 'Home',
  active: false,
};

export const useMenuPeripheral = {
  model: false,
  icon: 'sensors',
  title: 'Peripheral',
  value: 'peripheral',
  menu: [
    {
      label: 'BME280',
      model: false,
      value: 'bme280',
      menu: [
        {
          href: null,
          icon: 'mdi-thermometer',
          title: 'Temperature',
          value: 'temperature',
          active: false,
        },
        {
          href: null,
          icon: 'mdi-gauge',
          title: 'Pressure',
          value: 'pressure',
          active: false,
        },
        {
          href: null,
          icon: 'mdi-water-percent',
          title: 'Humidity',
          value: 'humidity',
          active: false,
        },
      ],
    },
    {
      label: 'MICS6814',
      model: false,
      value: 'mics6814',
      menu: [
        {
          href: null,
          icon: 'mdi-gas-cylinder',
          title: 'NO2',
          value: 'no2',
          active: false,
        },
        {
          href: null,
          icon: 'mdi-gas-cylinder',
          title: 'NH3',
          value: 'nh3',
          active: false,
        },
        {
          href: null,
          icon: 'mdi-gas-cylinder',
          title: 'CO',
          value: 'co',
          active: false,
        },
      ],
    },
    {
      label: 'RadSens',
      model: false,
      value: 'radsens',
      menu: [
        {
          href: null,
          icon: 'mdi-radioactive',
          title: 'Static',
          value: 'static',
          active: false,
        },
        {
          href: null,
          icon: 'mdi-radioactive',
          title: 'Dynamic',
          value: 'dynamic',
          active: false,
        },
      ],
    },
    {
      label: 'ZE08CH2O',
      model: false,
      value: 'ze08ch2o',
      menu: [
        {
          href: null,
          icon: 'mdi-gas-cylinder',
          title: 'CH2O',
          value: 'ch2o',
          active: false,
        },
      ],
    },
    {
      label: 'DS18B20',
      model: false,
      value: 'ds18b20',
      menu: [
        {
          href: null,
          icon: 'mdi-thermometer',
          title: 'Temperature',
          value: 'temperature',
          active: false,
        },
      ],
    },
  ],
};

export const useMenuController = {
  model: false,
  icon: 'mdi-memory',
  title: 'Controller',
  value: 'esp32',
  menu: [
    {
      href: null,
      icon: 'mdi-cog-box',
      title: 'Settings',
      value: 'settings',
      active: false,
    },
    {
      href: null,
      icon: 'notifications',
      title: 'Alarm',
      value: 'alarm',
      active: false,
    },
    {
      href: null,
      icon: 'mdi-history',
      title: 'Journal',
      value: 'journal',
      active: false,
    },
  ],
};

export const useMenuServices = {
  model: false,
  icon: 'settings_suggest',
  title: 'Services',
  value: 'services',
  menu: [
    {
      label: 'Proxy',
      model: false,
      value: 'proxy',
      menu: [
        {
          href: null,
          icon: 'mdi-server-network',
          title: 'Servers',
          value: 'servers',
          active: false,
        },
        {
          href: null,
          icon: 'mdi-lan',
          title: 'Locale zones',
          value: 'zones',
          active: false,
        },
        {
          href: null,
          icon: 'mdi-playlist-star',
          title: 'Manual VPN',
          value: 'manualvpn',
          active: false,
        },
        {
          href: null,
          icon: 'mdi-playlist-check',
          title: 'Auto VPN',
          value: 'autovpn',
          active: false,
        },
        {
          href: null,
          icon: 'mdi-playlist-remove',
          title: 'Ignore VPN',
          value: 'ignorevpn',
          active: false,
        },
      ],
    },
    {
      label: 'Schedule',
      model: false,
      value: 'schedule',
      menu: [
        {
          href: null,
          icon: 'pending_actions',
          title: 'Timetable',
          value: 'timetable',
          active: false,
        },
        {
          href: null,
          icon: 'task',
          title: 'Tasks',
          value: 'tasks',
          active: false,
        },
        {
          href: null,
          icon: 'mdi-book-clock-outline',
          title: 'Cron',
          value: 'cron',
          active: false,
        },
      ],
    },
    {
      label: 'Secure',
      model: false,
      value: 'secure',
      menu: [
        {
          href: null,
          icon: 'mdi-key-variant',
          title: 'SSH Keys',
          value: 'sshkeys',
          active: false,
        },
        {
          href: null,
          icon: 'mdi-lan-pending',
          title: 'SSH Hosts',
          value: 'sshhosts',
          active: false,
        },
        {
          href: null,
          icon: 'mdi-account',
          title: 'Git Users',
          value: 'gitusers',
          active: false,
        },
      ],
    },
    {
      label: 'Servers',
      model: false,
      value: 'servers',
      menu: [
        {
          href: null,
          icon: 'mdi-server-network',
          title: 'Main (Chatreey)',
          value: 'main',
          active: false,
        },
        {
          href: null,
          icon: 'mdi-server-network',
          title: 'Backup (N2)',
          value: 'backup',
          active: false,
        },
      ],
    },
    {
      label: 'Radius',
      model: false,
      value: 'radius',
      menu: [
        {
          href: null,
          icon: 'mdi-account-circle-outline',
          title: 'Authorisation',
          value: 'auth',
          active: false,
        },
        {
          href: null,
          icon: 'mdi-table-account',
          title: 'Accounting',
          value: 'account',
          active: false,
        },
        {
          href: null,
          icon: 'verified_user',
          title: 'Verified',
          value: 'verified',
          active: false,
        },
      ],
    },
    {
      label: 'Database',
      model: false,
      value: 'database',
      menu: [
        {
          href: null,
          icon: 'mdi-table-large',
          title: 'Tables',
          value: 'tables',
          active: false,
        },
        {
          href: null,
          icon: 'sync',
          title: 'Sync',
          value: 'sync',
          active: false,
        },
      ],
    },
  ],
};
