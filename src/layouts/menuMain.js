export const useMenuHome = {
  href: '#/',
  icon: 'mdi-home',
  title: 'Home',
};

export const useMenuPeripheral = {
  icon: 'sensors',
  title: 'Peripheral',
  value: 'peripheral',
  menu: [
    {
      label: 'BME280',
      value: 'bme280',
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
      ],
    },
    {
      label: 'MICS6814',
      value: 'mics6814',
      menu: [
        {
          icon: 'mdi-gas-cylinder',
          title: 'NO2',
          value: 'no2',
        },
        {
          icon: 'mdi-gas-cylinder',
          title: 'NH3',
          value: 'nh3',
        },
        {
          icon: 'mdi-gas-cylinder',
          title: 'CO',
          value: 'co',
        },
      ],
    },
    {
      label: 'RadSens',
      value: 'radsens',
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
      label: 'ZE08CH2O',
      value: 'ze08ch2o',
      menu: [
        {
          icon: 'mdi-gas-cylinder',
          title: 'CH2O',
          value: 'ch2o',
        },
      ],
    },
    {
      label: 'DS18B20',
      value: 'ds18b20',
      menu: [
        {
          icon: 'mdi-thermometer',
          title: 'Temperature',
          value: 'temperature',
        },
      ],
    },
  ],
};

export const useMenuController = {
  icon: 'mdi-memory',
  title: 'Controller',
  value: 'esp32',
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
  menu: [
    {
      label: 'Proxy',
      value: 'proxy',
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
      label: 'Schedule',
      value: 'schedule',
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
      label: 'Secure',
      value: 'secure',
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
      label: 'Servers',
      value: 'servers',
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
      label: 'Radius',
      value: 'radius',
      menu: [
        {
          icon: 'mdi-account-circle-outline',
          title: 'Authorisation',
          value: 'auth',
        },
        {
          icon: 'mdi-table-account',
          title: 'Accounting',
          value: 'account',
        },
        {
          icon: 'verified_user',
          title: 'Verified',
          value: 'verified',
        },
      ],
    },
    {
      label: 'Database',
      value: 'database',
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
