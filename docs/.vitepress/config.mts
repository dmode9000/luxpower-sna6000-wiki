// https://vitepress.dev/reference/site-config
const base = process.env.VITEPRESS_BASE || "/";
const isProd = process.env.NODE_ENV === "production";

export default {
  base,
  lastUpdated: true,
  locales: {
    root: {
      label: "Українська",
      lang: "uk-UA",
      title: "LuxPower SNA6000",
      description: "Wiki по налаштуванню LuxPower SNA6000",
      themeConfig: {
        nav: [{ text: "Головна", link: "/" }],
        sidebar: [
          {
            text: "Settings",
            collapsed: false,
            items: [
              {
                text: "Model Setting",
                collapsed: true,
                items: [{ text: "Rule", link: "/settings/rule" }],
              },
              {
                text: "Application Setting",
                collapsed: true,
                items: [
                  {
                    text: "General",
                    collapsed: true,
                    items: [
                      { text: "Restart Inverter", link: "/settings/restart_inverter" },
                      { text: "Buzzer Enable", link: "/settings/buzzer_enable" },
                      {
                        text: "Grid Loss Warning Clear",
                        link: "/settings/grid_loss_warning_clear",
                      },
                      { text: "Normal / Standby", link: "/settings/standby" },
                      { text: "Max AC Input Power", link: "/settings/max_ac_input_power" },
                    ],
                  },
                  {
                    text: "EPS Output",
                    collapsed: true,
                    items: [
                      { text: "EPS Voltage Set", link: "/settings/eps_voltage_set" },
                      { text: "EPS Frequency Set", link: "/settings/eps_frequency_set" },
                      { text: "AC Input Range", link: "/settings/ac_input_range" },
                      { text: "PV Grid Off", link: "/settings/pv_grid_off" },
                    ],
                  },
                  {
                    text: "Parallel Settings",
                    collapsed: true,
                    items: [
                      { text: "Set System Type", link: "/settings/set_system_type" },
                      { text: "Share Battery", link: "/settings/share_battery" },
                      { text: "Set Composed Phase", link: "/settings/set_composed_phase" },
                    ],
                  },
                  {
                    text: "Hybrid Setting",
                    collapsed: true,
                    items: [
                      {
                        text: "PV&AC Take Load Jointly",
                        link: "/settings/pv_ac_take_load_jointly",
                      },
                      { text: "Export to Grid", link: "/settings/export_to_grid" },
                      { text: "Export Power Percent(%)", link: "/settings/export_power_percent" },
                      { text: "Grid CT Connection", link: "/settings/grid_ct_connection" },
                    ],
                  },
                  {
                    text: "PV Setting",
                    collapsed: true,
                    items: [{ text: "PV Input Mode", link: "/settings/pv_input_mode" }],
                  },
                  {
                    text: "Energy saving mode",
                    collapsed: true,
                    items: [{ text: "Battery ECO Enable", link: "/settings/battery_eco_enable" }],
                  },
                  { text: "N-PE Bond", link: "/settings/n_pe_bond" },
                ],
              },
              {
                text: "Battery Setting",
                collapsed: true,
                items: [
                  { text: "Battery Type", link: "/settings/battery_type" },
                  { text: "Lithium Type", link: "/settings/lithium_type" },
                  { text: "Lead-acid Capacity", link: "/settings/lead_acid_capacity" },
                  { text: "Absorb Voltage(V)", link: "/settings/absorb_voltage" },
                  { text: "Float Voltage(V)", link: "/settings/float_voltage" },
                  { text: "Equalization Voltage(V)", link: "/settings/equalization_voltage" },
                  {
                    text: "Charging",
                    collapsed: true,
                    items: [
                      {
                        text: "Charge Current Limit(Adc)",
                        link: "/settings/charge_current_limit_adc",
                      },
                      {
                        text: "System Charge SOC Limit(%)",
                        link: "/settings/system_charge_soc_limit",
                      },
                      {
                        text: "System Charge Volt Limit(V)",
                        link: "/settings/system_charge_volt_limit",
                      },
                    ],
                  },
                  {
                    text: "Discharging",
                    collapsed: true,
                    items: [
                      {
                        text: "Batt Discharge Control",
                        link: "/settings/batt_discharge_control",
                      },
                      {
                        text: "Discharge Current Limit(Adc)",
                        link: "/settings/discharge_current_limit_adc",
                      },
                      {
                        text: "Battery Warning Voltage(V)",
                        link: "/settings/battery_warning_voltage",
                      },
                      {
                        text: "Battery Warning SOC(%)",
                        link: "/settings/battery_warning_soc",
                      },
                      {
                        text: "Off-Grid Cut-Off SOC(%)",
                        link: "/settings/off_grid_cut_off_soc",
                      },
                      {
                        text: "On-Grid Cut-Off SOC(%)",
                        link: "/settings/on_grid_cut_off_soc",
                      },
                      {
                        text: "Off-Grid Cut-Off Volt(V)",
                        link: "/settings/off_grid_cut_off_volt",
                      },
                      {
                        text: "On-Grid Cut-Off Volt(V)",
                        link: "/settings/on_grid_cut_off_volt",
                      },
                      {
                        text: "Discharge Resume SOC(%)",
                        link: "/settings/discharge_resume_soc",
                      },
                      {
                        text: "Discharge Resume Volt(V)",
                        link: "/settings/discharge_resume_volt",
                      },
                    ],
                  },
                  {
                    text: "Battery Calibration",
                    collapsed: true,
                    items: [
                      {
                        text: "Battery Calibration Enable",
                        link: "/settings/battery_calibration_enable",
                      },
                      {
                        text: "Accumulated Uncalibrated Count(Days)",
                        link: "/settings/accumulated_uncalibrated_count_days",
                      },
                      {
                        text: "Calibration Period(Days)",
                        link: "/settings/calibration_period_days",
                      },
                    ],
                  },
                ],
              },
              {
                text: "Working Mode Setting",
                collapsed: true,
                items: [
                  {
                    text: "AC Charge",
                    collapsed: true,
                    items: [
                      {
                        text: "AC Charge Battery Current",
                        link: "/settings/ac_charge_battery_current",
                      },
                      { text: "AC Charge Based On", link: "/settings/ac_charge_based_on" },
                      { text: "Start AC Charge SOC", link: "/settings/start_ac_charge_soc" },
                      { text: "Stop AC Charge SOC", link: "/settings/stop_ac_charge_soc" },
                      { text: "T1 T2 T3", link: "/settings/ac_charge_t1_t2_t3" },
                    ],
                  },
                  {
                    text: "AC First",
                    collapsed: true,
                    items: [
                      { text: "AC First Mode", link: "/settings/ac_first_mode" },
                      {
                        text: "Stop Charge First SOC",
                        link: "/settings/stop_charge_first_soc",
                      },
                      {
                        text: "Stop Charge First Volt",
                        link: "/settings/stop_charge_first_volt",
                      },
                      { text: "T1 T2 T3", link: "/settings/ac_first_t1_t2_t3" },
                    ],
                  },
                  {
                    text: "Forced Discharge",
                    collapsed: true,
                    items: [
                      {
                        text: "Forced Discharge Enable",
                        link: "/settings/forced_discharge_enable",
                      },
                      {
                        text: "Forced Discharge Power(kW)",
                        link: "/settings/forced_discharge_power",
                      },
                      {
                        text: "Stop Discharge SOC(%)",
                        link: "/settings/stop_discharge_soc",
                      },
                      {
                        text: "Stop Discharge Volt(V)",
                        link: "/settings/stop_discharge_volt",
                      },
                      { text: "T1 T2 T3", link: "/settings/forced_discharge_t1_t2_t3" },
                    ],
                  },
                  {
                    text: "Self Consumption",
                    link: "/settings/self_consumption",
                  },
                ],
              },
              {
                text: "Gen Function",
                collapsed: true,
                items: [
                  {
                    text: "Generator",
                    collapsed: true,
                    items: [
                      { text: "Generator Boost", link: "/settings/gen_generator_boost" },
                      {
                        text: "Generator Charge Type",
                        link: "/settings/gen_generator_charge_type",
                      },
                      {
                        text: "Generator Cool-Down Time(Min)",
                        link: "/settings/gen_cool_down_time_min",
                      },
                      {
                        text: "Max. Generator Input Power(W)",
                        link: "/settings/gen_max_input_power_w",
                      },
                      {
                        text: "Generator Charge Battery Current(A)",
                        link: "/settings/gen_charge_battery_current_a",
                      },
                      { text: "Charge Start/Stop", link: "/settings/gen_charge_start_stop" },
                      { text: "Gen Time", link: "/settings/gen_time" },
                    ],
                  },
                  {
                    text: "Smart Load",
                    collapsed: true,
                    items: [
                      { text: "Smart Load", link: "/settings/smart_load" },
                      { text: "Grid Always On", link: "/settings/smart_load_grid_always_on" },
                      {
                        text: "Start PV Power(kW)",
                        link: "/settings/smart_load_start_pv_power_kw",
                      },
                      {
                        text: "Smart Load Start / Stop",
                        link: "/settings/smart_load_start_stop",
                      },
                    ],
                  },
                  {
                    text: "AC coupling",
                    collapsed: true,
                    items: [
                      { text: "AC Couple", link: "/settings/ac_couple" },
                      { text: "AC Couple Start/Stop", link: "/settings/ac_couple_start_stop" },
                    ],
                  },
                ],
              },
              {
                text: "Other Setting",
                collapsed: true,
                items: [
                  { text: "Fan speed slope", link: "/settings/fan_speed_slope" },
                  { text: "Fan Max Speed(%)", link: "/settings/fan_max_speed" },
                  { text: "CT Power Offset(W)", link: "/settings/ct_power_offset" },
                ],
              },
              {
                text: "Manufacturer Setting",
                collapsed: true,
                items: [{ text: "All to Default", link: "/settings/all_to_default" }],
              },
              {
                text: "Dongle Setting",
                collapsed: true,
                items: [{ text: "Server IP and Port", link: "/settings/server_ip_and_port" }],
              },
            ],
          },
          {
            text: "Trouble shooting",
            collapsed: true,
            items: [
              { text: "Помилки", link: "/troubleshooting/faults" },
              { text: "Попередження", link: "/troubleshooting/warnings" },
              { text: "Коди батареї", link: "/troubleshooting/battery_status_codes" },
              { text: "Таблиця історії", link: "/troubleshooting/history_table" },
            ],
          },
          {
            text: "FAQ Часті запитання",
            collapsed: true,
            items: [
              { text: "Акумулятори та BMS", link: "/faq/faq-battery-and-bms" },
              { text: "Сонячні панелі та Експорт", link: "/faq/faq-solar-panels" },
              { text: "Електромонтаж та Захист", link: "/faq/faq-electrical-and-protection" },
              { text: "Режими роботи та Навантаження", link: "/faq/faq-modes-and-load" },
              { text: "Паралельна робота", link: "/faq/faq-parallel" },
              { text: "Моніторинг та Інтеграція", link: "/faq/faq-monitoring-integration" },
              { text: "Помилки та Несправності", link: "/faq/faq-troubleshooting" },
            ],
          },

          {
            text: "Telegram група",
            items: [{ text: "LuxPower SNA/LXP/GEN/TRIP", link: "https://t.me/+IZ2RyXDHTCUyNThi" }],
          },
        ],
        langMenuLabel: "Мова",
        returnToTopLabel: "Вгору",
        outline: {
          label: "На сторінці",
        },
      },
    },
  },

  themeConfig: {
    search: {
      provider: "local",
    },
  },

  head: [
    isProd && [
      "script",
      {
        async: "",
        src: "https://www.googletagmanager.com/gtag/js?id=G-J3BNT9WRGT",
      },
    ],
    isProd && [
      "script",
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-J3BNT9WRGT');`,
    ],
  ].filter(Boolean) as any[],
};
