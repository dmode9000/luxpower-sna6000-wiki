# [ЧЕРНЕТКА / РЕФЕРЕНС — НЕ ДЛЯ ПУБЛІКАЦІЇ]

> [!WARNING] Цей файл не описує SNA6000:
> Матеріал знято зі сторінки **Monitor Center → Maintenance → General Grid Regulations**
> (https://eu.luxpowertek.com/WManage/web/maintain/generalGridRegulations) — це веб-інтерфейс
> інсталятора для **гібридних інверторів LuxPower GEN та TRIP2**, а не налаштування SNA6000.
> Призначення — референс: показує, як виглядають повні мережеві налаштування (Volt-Watt,
> Volt-Var, LVRT/HVRT, захисти) в новішому поколінні інверторів LuxPower.

## Статус опрацювання

- [ ] Каталог `drafts/` не публікується VitePress (білд іде лише з `docs/`) — файл видно тільки в репозиторії.
- [ ] Якщо вирішено додавати сторінки в вікі — матеріал розбити на: `connection-reconnection.html` (або об'єднати з `rule.html`), `interface-protection.html`, `reactive-power.html`, `active-power-control.html`.
- [ ] Оновити застарілий абзац «Відсутність ручного керування параметрами мережі» на `docs/settings/rule.md`.
- [ ] Перед публікацією виконати пункти з розділу «Що ще варто зробити перед публікацією» нижче.
- [ ] По можливості звірити з реальним GEN/TRIP2 (ці дані — з Monolith/Monitor Center, не з локального веб-UI інвертора).

## Джерело

Оригінальний файл: `gridregulationssettingslist.md` (надіслано 2026-08-24, збережено у Hermes-кеші).
Знімався з HTML-форми сторінки без вибору станції (робочі константи, не офіційна документація LuxPower);
значення профілю Rule=0 (Normal) знято з живого інвертора `5120920152` (станція Verest123).

---

# General Grid Regulations — список налаштувань для вікі

Джерело: `Maintenance → General Grid Regulations` (Monitor Center, https://eu.luxpowertek.com/WManage/web/maintain/generalGridRegulations)

Це сторінка інсталятора, яка нещодавно відкрила доступ до детальних параметрів мережі — тих самих Volt-Watt / Volt-Var / LVRT-HVRT алгоритмів, про відсутність яких зараз написано на сторінці [`settings/rule.html`](https://dmode9000.github.io/luxpower-sna6000-wiki/settings/rule.html) ("у стандартному інтерфейсі LuxPower... відсутні ручні налаштування алгоритмів Volt-Watt, Volt-Var, LVRT чи HVRT"). Тож окрім додавання нових сторінок, варто оновити той абзац на сторінці Rule.

Для кожного поля нижче в дужках `код` вказано внутрішнє ім'я Modbus holding-регістра (атрибут `holdparam` в DOM), яке я зняв напряму з HTML-форми без вибору конкретної станції — це working-константи, не документація LuxPower, але корисні як точний ідентифікатор параметра. Діапазони `[min, max]` вказані там, де вони прописані статично у формі (атрибути `min`/`max`/`placeholder`); більшість інших полів діапазону в розмітці не мають — він або відсутній, або підвантажується динамічно після вибору Rule/станції (це і є той момент, коли доведеться відкрити конкретний інвертор, щоб зняти реальні межі).

## 1. Connection and reconnection

Сторінка (можливо об'єднати з `rule.html` або зробити окремою `connection-reconnection.html`):

- **Permit service** (Enable/Disable) — головний дозвіл інвертору працювати паралельно з мережею.
- **Rule** (`ruleModelInput`) — той самий Grid Code, що вже описаний на `rule.html`. Повний список опцій із форми: `<Empty>`, 0 Normal (Same as VDE0126), 1 VDE0126 (Germany), 2 AS4777 (Australia), 3 NEWZEALAND, 4 CGC (China), 5 G99, 6 G98, 7 N4105 (Germany), 8 CEI0-21 (Italy), 9 EN50438, 10 EN50438_Finland, 11 Japan, 12 PEA, 13 MEA, 14 EN50438_Ireland, 15 Czech, 16 South Africa, 21 Poland TypeA V.2.0, 24 TOR.
- **Ramp rate (%)** (`HOLD_POWER_SOFT_START_SLOPE`) — діапазон **[0, 6000]**. Швидкість наростання потужності після підключення до мережі.
- **Applicable voltage low (V)** (`HOLD_GRID_VOLT_CONN_LOW`) — нижня межа напруги для роботи з мережею.
- **Applicable voltage high (V)** (`HOLD_GRID_VOLT_CONN_HIGH`) — верхня межа напруги.
- **Applicable frequency low (Hz)** (`HOLD_GRID_FREQ_CONN_LOW`) — нижня межа частоти.
- **Applicable frequency high (Hz)** (`HOLD_GRID_FREQ_CONN_HIGH`) — верхня межа частоти.
- **Connection delay time (s)** (`HOLD_CONNECT_TIME`) — діапазон **[0, 600]**. Затримка перед підключенням після появи/стабілізації мережі.
- **Reconnection delay time (s)** (`HOLD_RECONNECT_TIME`) — діапазон **[0, 3600]**. Затримка перед повторним підключенням після збою.

## 2. Interface protection (нова сторінка, напр. `interface-protection.html`)

Це саме ті "жорсткі" пороги відключення (High/Low Voltage & Frequency Trip), які раніше не можна було редагувати вручну. Три рівні (Limit 1/2/3) для напруги і три для частоти, кожен з окремим часом спрацювання. Регістри іменуються послідовно й прогнозовано (`HOLD_GRID_VOLT_LIMITx_LOW/HIGH[_TIME]`, `HOLD_GRID_FREQ_LIMITx_LOW/HIGH[_TIME]`):

- **Grid Volt Limit1 Low (V)** `HOLD_GRID_VOLT_LIMIT1_LOW` / **High (V)** `HOLD_GRID_VOLT_LIMIT1_HIGH` / **Low Time (s)** `HOLD_GRID_VOLT_LIMIT1_LOW_TIME` / **High Time (s)** `HOLD_GRID_VOLT_LIMIT1_HIGH_TIME`
- **Grid Volt Limit2** — ті самі 4 поля з суфіксом `LIMIT2_...`
- **Grid Volt Limit3** — ті самі 4 поля з суфіксом `LIMIT3_...`
- **Grid Freq Limit1 Low (Hz)** `HOLD_GRID_FREQ_LIMIT1_LOW` / **High (Hz)** `HOLD_GRID_FREQ_LIMIT1_HIGH` / **Low Time (s)** `HOLD_GRID_FREQ_LIMIT1_LOW_TIME` / **High Time (s)** `HOLD_GRID_FREQ_LIMIT1_HIGH_TIME`
- **Grid Freq Limit2** — ті самі 4 поля з суфіксом `LIMIT2_...`
- **Grid Freq Limit3** — ті самі 4 поля з суфіксом `LIMIT3_...`

Опис призначення: чим менший номер рівня (Limit1), тим "м'якший" поріг і довший дозволений час перебування поза межами; Limit3 зазвичай — миттєве або майже миттєве відключення при грубому виході за межі.

## 3. Reactive power capability (нова сторінка, напр. `reactive-power.html`)

- **Constant Power Factor Mode** (Enable/Disable) + **Constant Power Factor** (`HOLD_PF_CMD`, діапазон **[750, 2000]** — судячи з масштабу, це PF×1000 з якимось зсувом/знаком залежно від Under/Over-excited, реальну формулу варто перевірити на живому інверторі). Селектор режиму (`pfCMDSelect`): `-1 = Under-excited`, `1 = Over-excited`.
- **Constant Reactive Power Mode** (Enable/Disable) + **Reactive Power Percent CMD (%)** (`HOLD_REACTIVE_POWER_PERCENT_CMD`, діапазон **[0, 80]**). Селектор режиму (`constantReactivePowerModeSelect`): `4 = Under-excited`, `5 = Over-excited` — зверніть увагу, коди відрізняються від селектора Constant Power Factor (-1/1) вище.
- **Voltage-Reactive Power Mode** (він же **Volt-Var**, Q(V)):
  - Enable/Disable
  - **Vref (V)** (`HOLD_VREF`) — опорна напруга
  - **Autonomous Vref Adjustment** (Enable/Disable) + **Vref adjustment time constant (s)** (`HOLD_VREF_ADJUSTMENT_TIME_CONSTANT`)
  - **V1(V)** `HOLD_V2L`, **V2(V)** `HOLD_V1L`, **V3(V)** `HOLD_V1H`, **V4(V)** `HOLD_V2H` — ⚠️ нумерація полів у формі (V1-V4) не збігається з іменами регістрів (V2L, V1L, V1H, V2H): фактично поле "V1" зберігається в регістр V2L, а "V2" — у V1L. Варто перевірити на живому інверторі, перш ніж публікувати як факт, але для документації регістрів це важливо зафіксувати.
  - **Q1(%)** `HOLD_MAX_Q_PERCENT_FOR_QV`, **Q2(%)** `HOLD_MIN_Q_PERCENT_FOR_QV`, **Q3(%)** `HOLD_Q3`, **Q4(%)** `HOLD_Q4`
  - **Open Loop Response Time (s)** (`HOLD_DELAY_TIME_FOR_QV_CURVE`)
- **Active Power-Reactive Power Mode** (він же **P-Q**):
  - Enable/Disable
  - **AC Charge Power (kW)** (`HOLD_AC_CHARGE_POWER_CMD`, діапазон **[0, 25.5]**)
  - **P1(%)** `HOLD_P1` / **Q1(%)** `HOLD_Q3_TO_Q1`
  - **P2(%)** `HOLD_P2` / **Q2(%)** `HOLD_MIN_Q_PERCENT_FOR_QV`
  - **P3(%)** `HOLD_P3` / **Q3(%)** `HOLD_Q4_TO_Q3`
  - У формі під цією ж кривою є ще один, майже ідентичний блок полів з тими самими підписами, але зі штрихом (**P1'**, **Q1'**, **P2'**, **Q2'**, **P3'**, **Q3'**) — ймовірно друга (дзеркальна/розрядна) гілка P-Q кривої. У HTML вони прив'язані до тих самих `id`/`holdparam`, що й перша гілка (це або баг верстки сторінки, або значення дійсно дублюються) — обов'язково звірити на живому інтерфейсі перед публікацією.

## 4. Active power control (нова сторінка, напр. `active-power-control.html`)

- **Voltage-Active Power Mode** (він же **Volt-Watt**):
  - Enable/Disable
  - **Volt-Watt V1 (V)** `HOLD_VOLT_WATT_V1`, **Volt-Watt V2 (V)** `HOLD_VOLT_WATT_V2`, **Volt-Watt P2 (%)** `HOLD_VOLT_WATT_P2`
  - **Open Loop Response Time (s)** `HOLD_VOLT_WATT_DELAY_TIME`
  - **Return To Service Voltage (V)** `HOLD_RETURN_TO_SERVICE_VOLT` — це поле не потрапило в текстовий дамп сторінки раніше (сховане/під скролом), але присутнє в розмітці; варто перевірити, чи воно показане в UI і що саме означає (напруга повернення в сервіс після Volt-Watt відсічки).
- **Frequency-Active Power Mode** (він же **Frequency-Watt / droop control**):
  - Enable/Disable
  - **Open Loop Response Time (s)** `HOLD_DELAY_TIME_FOR_OVER_F_DERATE`
  - **Over frequency Droop dbOF (Hz)** `_12K_HOLD_OVF_DERATE_START_POINT` — незвичний префікс `_12K_` в імені регістра (можливо, специфічний для 12кВт-серії/паралельних систем; варто уточнити).
  - **Under frequency Droop dbUF (Hz)** `HOLD_UVF_DERATE_START_POINT`
  - **Over frequency Droop kOF (%)** `HOLD_OVF_DROOP_KOF`
  - **Under frequency Droop kUF (%)** `HOLD_UVF_DROOP_KUF`
  - **Over Frequency Load Shedding F-stop Enable** (Enable/Disable)
  - **End frequency of underfrequency response** `HOLD_END_FREQUENCY_UNDERFREQUENCY_RES`
  - **End frequency of overclocking and load shedding** `HOLD_END_FREQUENCY_OVERCLOCKING_LOAD_SHEDDING`
- **Limit Active Power Enable** (Enable/Disable) + **Active Power Percent (%)** (`HOLD_ACTIVE_POWER_PERCENT_CMD`) — просте обмеження активної потужності у відсотках від номіналу (не крива, а фіксована стеля).

## Реальні значення для профілю Rule = 0 (Normal — Same as VDE0126)

Знято з живого інвертора `5120920152` (станція Verest123) після вибору станції та Read. Це конкретні заводські/поточні значення саме для профілю **Normal**, з іншими Rule (VDE0126, G99, CEI0-21 тощо) вони майже напевно інші — це варто перевірити окремо, якщо буде потреба задокументувати кілька профілів.

**Connection and reconnection** — Permit service: **Enabled**. Ramp rate 100%, Applicable voltage 192–260 V, Applicable frequency 45–65 Hz, Connection delay 15 s, Reconnection delay 15 s.

**Interface protection** — усі три рівні (Limit1/2/3) для профілю Normal мають **однакові** значення, тобто триступеневий захист фактично не диференційований:
- Volt Limit1/2/3: Low 184 V, High 264.5 V, Low Time 0.06 s, High Time 0.06 s
- Freq Limit1/2/3: Low 45 Hz, High 65 Hz, Low Time 0.06 s, High Time 0.06 s

**Reactive power capability** — всі режими крім базового вимкнені за замовчуванням (підтверджує те, що вже написано на `rule.html` про профіль Normal — там вони справді неактивні, але тепер їх можна увімкнути вручну):
- Constant Power Factor Mode: **Disabled** (селектор виставлено на Over-excited, поле = 1)
- Constant Reactive Power Mode: **Disabled**, Reactive Power Percent CMD = 100% (⚠️ це за межами задокументованого раніше діапазону [0, 80] — можливо, ліміт форми ігнорується, поки режим вимкнено)
- Voltage-Reactive Power Mode (Volt-Var): **Disabled**. Vref = 0, Vref adjustment time constant = 0 (Autonomous Vref Adjustment теж Disabled). V1=192, V2=207, V3=252, V4=260 (нагадаю: ці підписи в полях відповідають регістрам V2L/V1L/V1H/V2H відповідно — не плутати з номерами). Q1=30%, Q2=0%, Q3=0%, Q4=0%. Open Loop Response Time = 0 s.
- Active Power-Reactive Power Mode (P-Q): **Disabled**. AC Charge Power = 5 kW. P1=0%, Q1=0%, P2=0%, Q2=0%, P3=0%, Q3=0%.
  - ⚠️ Уточнення по "штрихованій" гілці P1'/P2'/P3': на живих даних видно, що **P1'/P2'/P3' — це НЕ окремі input-поля**, а статичні нередаговані підписи `70%`, `80%`, `100%` (фіксовані опорні точки кривої, без власного значення). А **Q1'/Q2'/Q3'** — це справді ті самі DOM-елементи (той самий `id`), що й Q1/Q2/Q3 вище, тобто просто дублюють ті самі 0%/0%/0%. Тобто другого незалежного набору точок кривої P-Q на цій сторінці немає — це один і той самий графік, показаний із двома підписами шкали.

**Active power control**:
- Voltage-Active Power Mode (Volt-Watt): **Disabled**. Volt-Watt V1 = 254.4 V, Volt-Watt V2 = 264 V, Volt-Watt P2 = 20%, Open Loop Response Time = 10000 (одиниці не зрозумілі зі значення — 10000 s виглядає завелико, можливо мс; уточнити на UI).
- Return To Service Voltage: поле порожнє на профілі Normal. ⚠️ Важливо: у розмітці цей input має **той самий `id="p2Input"`**, що й Volt-Watt P2(%) і P-Q P2(%) — на сторінці щонайменше три різні поля діляться одним id. Це означає, що прямі виклики на кшталт `document.getElementById('p2Input')` поверне лише перше з них; для точних значень треба орієнтуватися на підпис поля, а не на id.
- Frequency-Active Power Mode (Freq-Watt): **Disabled**. Open Loop Response Time = 0 s. Over frequency Droop dbOF = **-9.75 Hz** (від'ємне значення — ймовірно, поле ще не проінціалізоване для вимкненого режиму, а не реальна робоча межа). Under frequency Droop dbUF = 60 Hz. Over/Under frequency Droop kOF/kUF = **NaN** (поле візуально порожнє/некоректне, поки режим вимкнено — не бага вікі, а стан самого інтерфейсу LuxPower).
- Over Frequency Load Shedding F-stop Enable: обидві кнопки Enable/Disable показані як неактивні (сірі) — стан не визначений, поки не увімкнено сам Frequency-Active Power Mode. End frequency of underfrequency response = 0, End frequency of overclocking and load shedding = 52.
- Limit Active Power Enable: **Enabled** (єдиний, крім Permit service, режим увімкнений за замовчуванням), Active Power Percent = 100% (тобто без реального обмеження).

## Що ще варто зробити перед публікацією

1. ~~Зняти реальні дефолтні значення на живому інверторі~~ — зроблено вище для профілю Normal (Rule 0). Якщо в документації планується показати значення для інших Rule (VDE0126, G99, CEI0-21 тощо), їх треба зняти окремо — перемикання Rule майже напевно міняє всі ці числа.
2. Перевірити, чи ці параметри доступні лише інсталятору (`installer web`), як і Rule — судячи з розташування (`Maintenance → General Grid Regulations`), таблиця доступу буде такою ж: installer web ✅, решта 🚫.
3. З'ясувати практичний сенс двох "дивних" значень, побачених у вимкненому стані (Over frequency Droop dbOF = -9.75, kOF/kUF = NaN) — увімкнути Frequency-Active Power Mode тимчасово (без Set!) і подивитись, чи підставляються осмислені дефолти, перш ніж описувати ці цифри як реальні межі.
4. Уточнити одиниці Open Loop Response Time у блоці Volt-Watt (значення 10000 — це секунди чи мс?).
5. Уточнити доступність через Modbus-регістри (якщо є бажання задокументувати протокол окремо) — на сторінці Rule вже згадується, що ці функції "перелічені на рівні протоколу Modbus"; імена регістрів вище (`HOLD_...`) — хороша відправна точка.
6. Оновити абзац "Відсутність ручного керування параметрами мережі" на `rule.html`, бо він застарів — тепер ці режими Enable/Disable є, просто вимкнені за замовчуванням (крім Permit service і Limit Active Power Enable).
