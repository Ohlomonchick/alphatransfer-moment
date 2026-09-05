'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CircleMinus,
  Info,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { historicalRates, type HistoryRow } from './rate-history';

type Signal = 'n' | 'c' | 'x';
type ChartWindow = '10d' | '1m' | '3m';

type DemoRow = {
  d: string;
  r: number;
  s: Signal;
  p: number;
  w: number;
  t: number;
  q: number;
};

// Демо-таблица подготовлена офлайн на историческом срезе RUB → KZT.
const demoRows: DemoRow[] = [
  { d: '2026-05-01', r: 6.1794, s: 'x', p: 73, w: 0.0, t: -2, q: 38 },
  { d: '2026-05-02', r: 6.1794, s: 'x', p: 73, w: 0.2, t: 1, q: 39 },
  { d: '2026-05-03', r: 6.1788, s: 'x', p: 67, w: 0.4, t: -1, q: 39 },
  { d: '2026-05-04', r: 6.1866, s: 'n', p: 80, w: 0.9, t: 1, q: 72 },
  { d: '2026-05-05', r: 6.1531, s: 'x', p: 40, w: 1.1, t: -1, q: 41 },
  { d: '2026-05-06', r: 6.1966, s: 'x', p: 83, w: -0.0, t: 1, q: 38 },
  { d: '2026-05-07', r: 6.2145, s: 'x', p: 87, w: 0.6, t: 2, q: 40 },
  { d: '2026-05-08', r: 6.2583, s: 'x', p: 93, w: 1.3, t: 3, q: 42 },
  { d: '2026-05-09', r: 6.2247, s: 'n', p: 87, w: 0.7, t: -1, q: 77 },
  { d: '2026-05-10', r: 6.1937, s: 'x', p: 70, w: 0.2, t: -2, q: 39 },
  { d: '2026-05-11', r: 6.2956, s: 'x', p: 97, w: 1.8, t: 1, q: 43 },
  { d: '2026-05-12', r: 6.2834, s: 'x', p: 90, w: 2.1, t: -1, q: 44 },
  { d: '2026-05-13', r: 6.2555, s: 'x', p: 83, w: 1.0, t: -2, q: 41 },
  { d: '2026-05-14', r: 6.4075, s: 'n', p: 100, w: 3.1, t: 1, q: 86 },
  { d: '2026-05-15', r: 6.4896, s: 'x', p: 100, w: 3.7, t: 2, q: 49 },
  { d: '2026-05-16', r: 6.4648, s: 'x', p: 97, w: 3.9, t: -1, q: 50 },
  { d: '2026-05-17', r: 6.4574, s: 'x', p: 93, w: 4.3, t: -2, q: 51 },
  { d: '2026-05-18', r: 6.4248, s: 'x', p: 90, w: 2.1, t: -3, q: 44 },
  { d: '2026-05-19', r: 6.6155, s: 'n', p: 100, w: 5.3, t: 1, q: 86 },
  { d: '2026-05-20', r: 6.6272, s: 'x', p: 100, w: 5.9, t: 2, q: 56 },
  { d: '2026-05-21', r: 6.6157, s: 'x', p: 97, w: 3.2, t: -1, q: 48 },
  { d: '2026-05-22', r: 6.58, s: 'x', p: 90, w: 1.4, t: -2, q: 42 },
  { d: '2026-05-23', r: 6.5716, s: 'x', p: 87, w: 1.7, t: -3, q: 43 },
  { d: '2026-05-24', r: 6.6294, s: 'n', p: 100, w: 2.7, t: 1, q: 86 },
  { d: '2026-05-25', r: 6.6259, s: 'x', p: 93, w: 3.1, t: -1, q: 47 },
  { d: '2026-05-26', r: 6.69, s: 'x', p: 100, w: 1.1, t: 1, q: 41 },
  { d: '2026-05-27', r: 6.7693, s: 'x', p: 100, w: 2.1, t: 2, q: 44 },
  { d: '2026-05-28', r: 6.8218, s: 'x', p: 100, w: 3.1, t: 3, q: 47 },
  { d: '2026-05-29', r: 6.8495, s: 'n', p: 100, w: 4.1, t: 4, q: 86 },
  { d: '2026-05-30', r: 6.8495, s: 'x', p: 100, w: 4.2, t: 0, q: 51 },
  { d: '2026-05-31', r: 6.8413, s: 'x', p: 93, w: 3.2, t: -1, q: 48 },
  { d: '2026-06-01', r: 6.7933, s: 'x', p: 87, w: 2.5, t: -2, q: 46 },
  { d: '2026-06-02', r: 6.7106, s: 'c', p: 80, w: 0.3, t: -3, q: 78 },
  { d: '2026-06-03', r: 6.6195, s: 'x', p: 63, w: -2.2, t: -4, q: 45 },
  { d: '2026-06-04', r: 6.6132, s: 'x', p: 53, w: -3.1, t: -5, q: 47 },
  { d: '2026-06-05', r: 6.6066, s: 'x', p: 50, w: -3.5, t: -6, q: 49 },
  { d: '2026-06-06', r: 6.6066, s: 'c', p: 50, w: -3.5, t: 0, q: 76 },
  { d: '2026-06-07', r: 6.6053, s: 'x', p: 43, w: -3.5, t: -1, q: 48 },
  { d: '2026-06-08', r: 6.668, s: 'x', p: 73, w: -1.8, t: 1, q: 44 },
  { d: '2026-06-09', r: 6.7827, s: 'x', p: 83, w: 1.1, t: 2, q: 41 },
  { d: '2026-06-10', r: 6.7548, s: 'x', p: 77, w: 2.0, t: -1, q: 44 },
  { d: '2026-06-11', r: 6.782, s: 'n', p: 80, w: 2.6, t: 1, q: 72 },
  { d: '2026-06-12', r: 6.7481, s: 'x', p: 70, w: 2.1, t: -1, q: 44 },
  { d: '2026-06-13', r: 6.7478, s: 'x', p: 67, w: 2.1, t: -2, q: 44 },
  { d: '2026-06-14', r: 6.7641, s: 'x', p: 73, w: 2.4, t: 1, q: 45 },
  { d: '2026-06-15', r: 6.7571, s: 'x', p: 70, w: 1.3, t: -1, q: 42 },
  { d: '2026-06-16', r: 6.7298, s: 'x', p: 57, w: -0.8, t: -2, q: 40 },
  { d: '2026-06-17', r: 6.7131, s: 'x', p: 53, w: -0.6, t: -3, q: 40 },
  { d: '2026-06-18', r: 6.661, s: 'c', p: 40, w: -1.8, t: -4, q: 76 },
  { d: '2026-06-19', r: 6.6735, s: 'x', p: 43, w: -1.1, t: 1, q: 41 },
  { d: '2026-06-20', r: 6.67, s: 'x', p: 40, w: -1.2, t: -1, q: 41 },
  { d: '2026-06-21', r: 6.6728, s: 'x', p: 40, w: -1.4, t: 1, q: 42 },
  { d: '2026-06-22', r: 6.5676, s: 'c', p: 3, w: -2.8, t: -1, q: 76 },
  { d: '2026-06-23', r: 6.542, s: 'x', p: 3, w: -2.8, t: -2, q: 46 },
  { d: '2026-06-24', r: 6.4969, s: 'x', p: 3, w: -3.2, t: -3, q: 48 },
  { d: '2026-06-25', r: 6.4481, s: 'x', p: 3, w: -3.2, t: -4, q: 48 },
  { d: '2026-06-26', r: 6.1501, s: 'c', p: 3, w: -7.8, t: -5, q: 91 },
  { d: '2026-06-27', r: 6.1543, s: 'x', p: 7, w: -7.7, t: 1, q: 61 },
  { d: '2026-06-28', r: 6.1495, s: 'x', p: 3, w: -7.8, t: -1, q: 62 },
  { d: '2026-06-29', r: 6.3058, s: 'x', p: 13, w: -4.0, t: 1, q: 50 },
  { d: '2026-06-30', r: 6.0794, s: 'c', p: 3, w: -7.1, t: -1, q: 84 },
  { d: '2026-07-01', r: 6.1862, s: 'x', p: 17, w: -4.8, t: 1, q: 52 },
  { d: '2026-07-02', r: 6.1257, s: 'x', p: 7, w: -5.0, t: -1, q: 53 },
  { d: '2026-07-03', r: 6.1357, s: 'x', p: 10, w: -0.2, t: 1, q: 39 },
];

const rateHistory: HistoryRow[] = [
  ...historicalRates,
  ...demoRows.map(({ d, r }) => ({ d, r })),
];

const windowOptions: Array<{
  id: ChartWindow;
  label: string;
  before: number;
  after: number;
  note: string;
}> = [
  { id: '10d', label: '10Д', before: 5, after: 5, note: '5 дней до · 5 дней после' },
  { id: '1m', label: '1М', before: 25, after: 5, note: '25 дней до · 5 дней после' },
  { id: '3m', label: '3М', before: 85, after: 5, note: '85 дней до · 5 дней после' },
];

const signalContent = {
  n: {
    eyebrow: 'Уведомление о курсе',
    chip: 'Пуш: факт о курсе',
    delivery: 'Пользователь получает уведомление',
    accent: '#13a463',
    soft: '#eaf8f1',
    icon: Check,
  },
  c: {
    eyebrow: 'Состояние курса',
    chip: 'Только в приложении',
    delivery: 'Проактивный пуш не отправляется',
    accent: '#e46b1a',
    soft: '#fff3e9',
    icon: TrendingDown,
  },
  x: {
    eyebrow: 'Состояние курса',
    chip: 'Без пуша',
    delivery: 'Порог уведомления не пройден',
    accent: '#657181',
    soft: '#eef1f4',
    icon: CircleMinus,
  },
} as const;

const ruDate = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

const shortDate = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
});

function asDate(value: string) {
  return new Date(`${value}T00:00:00Z`);
}

function compactDate(value: string) {
  return shortDate.format(asDate(value)).replace('.', '');
}

function RateTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: HistoryRow }> }) {
  if (!active || !payload?.[0]) return null;
  const row = payload[0].payload;

  return (
    <div className="chart-tooltip">
      <span>{compactDate(row.d)}</span>
      <strong>{row.r.toFixed(2)} ₸ за 1 ₽</strong>
    </div>
  );
}

export default function Home() {
  const [selectedDate, setSelectedDate] = useState('2026-06-02');
  const [chartWindow, setChartWindow] = useState<ChartWindow>('1m');
  const selectedIndex = Math.max(0, demoRows.findIndex((row) => row.d === selectedDate));
  const selected = demoRows[selectedIndex];
  const historyIndex = rateHistory.findIndex((row) => row.d === selectedDate);
  const activeWindow = windowOptions.find((option) => option.id === chartWindow) ?? windowOptions[1];

  const chartRows = useMemo(
    () => rateHistory.slice(
      Math.max(0, historyIndex - activeWindow.before),
      Math.min(rateHistory.length, historyIndex + activeWindow.after + 1),
    ),
    [activeWindow.after, activeWindow.before, historyIndex],
  );

  const threeMonthRows = useMemo(
    () => rateHistory.slice(Math.max(0, historyIndex - 89), historyIndex + 1),
    [historyIndex],
  );
  const threeMonthMin = Math.min(...threeMonthRows.map((row) => row.r));
  const threeMonthMax = Math.max(...threeMonthRows.map((row) => row.r));
  const rangeSpan = Math.max(threeMonthMax - threeMonthMin, 0.0001);
  const rangePosition = Math.min(100, Math.max(0, ((selected.r - threeMonthMin) / rangeSpan) * 100));
  const threeMonthChange = ((selected.r / threeMonthRows[0].r) - 1) * 100;
  const chartChange = ((selected.r / chartRows[0].r) - 1) * 100;
  const threeMonthPercentile = Math.round(
    (threeMonthRows.filter((row) => row.r <= selected.r).length / threeMonthRows.length) * 100,
  );
  const maxDrawdown = Math.max(0, (1 - selected.r / threeMonthMax) * 100);
  const previous = demoRows[Math.max(0, selectedIndex - 1)];
  const dailyChange = selectedIndex === 0 ? 0 : ((selected.r / previous.r) - 1) * 100;
  const state = signalContent[selected.s];
  const SignalIcon = state.icon;

  const clientTitle =
    selected.s === 'n'
      ? `Курс выше, чем в ${threeMonthPercentile}% дней за три месяца`
      : selected.s === 'c'
        ? `Курс снизился от максимума на ${maxDrawdown.toFixed(1).replace('.', ',')}%`
        : 'Явного курсового сигнала сегодня нет';

  const clientDescription =
    selected.s === 'n'
      ? 'Это факт об историческом положении курса — без прогноза дальнейшего движения.'
      : selected.s === 'c'
        ? 'На экране остаются актуальный курс и его положение в диапазоне — без срочности и совета подождать.'
        : 'Пользователь видит текущий курс и трёхмесячный диапазон без оценки «хорошо» или «плохо».';

  const modelTriggers = [
    {
      name: 'Уровень',
      active: selected.p >= 80 || selected.p <= 15,
      detail: `${selected.p}-й процентиль · 30 дней`,
    },
    {
      name: 'Моментум',
      active: Math.abs(selected.t) >= 3,
      detail: Math.abs(selected.t) >= 2 ? `${Math.abs(selected.t)} дня подряд` : 'стрика нет',
    },
    {
      name: 'Динамика',
      active: Math.abs(selected.w) >= 2,
      detail: `${selected.w >= 0 ? '+' : ''}${selected.w.toFixed(1).replace('.', ',')}% за 7 дней`,
    },
    {
      name: 'Волатильность',
      active: Math.abs(dailyChange) >= 1.2,
      detail: `${dailyChange >= 0 ? '+' : ''}${dailyChange.toFixed(2).replace('.', ',')}% за день`,
    },
  ];
  const activeTriggerCount = modelTriggers.filter((trigger) => trigger.active).length;
  const activeTriggerLabel = `${activeTriggerCount} ${activeTriggerCount === 1 ? 'активный триггер' : 'активных триггера'} из 4`;

  const moveDate = (step: number) => {
    const next = Math.min(demoRows.length - 1, Math.max(0, selectedIndex + step));
    setSelectedDate(demoRows[next].d);
  };

  useEffect(() => {
    const context = (document as Document & {
      modelContext?: {
        registerTool: (
          tool: {
            name: string;
            title: string;
            description: string;
            inputSchema: object;
            annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
            execute: (input: unknown) => unknown;
          },
          options: { signal: AbortSignal },
        ) => void | Promise<void>;
      };
    }).modelContext;

    if (!context?.registerTool) return;
    const lifecycle = new AbortController();

    void Promise.resolve(
      context.registerTool(
        {
          name: 'show_transfer_signal',
          title: 'Показать сигнал перевода',
          description: 'Выбирает дату в демо AlphaTransfer и показывает сохранённый для неё сигнал RUB → KZT.',
          inputSchema: {
            type: 'object',
            properties: {
              date: {
                type: 'string',
                description: 'Дата из демо-диапазона в формате YYYY-MM-DD.',
                enum: demoRows.map((row) => row.d),
              },
              window: {
                type: 'string',
                description: 'Масштаб графика: 10 дней, 1 месяц или 3 месяца.',
                enum: windowOptions.map((option) => option.id),
              },
            },
            required: ['date'],
            additionalProperties: false,
          },
          annotations: { readOnlyHint: false, untrustedContentHint: false },
          execute(input) {
            const { date, window } = input as { date?: unknown; window?: unknown };
            const row = demoRows.find((item) => item.d === date);
            if (!row) throw new Error('Дата вне демо-диапазона');
            setSelectedDate(row.d);
            if (window === '10d' || window === '1m' || window === '3m') setChartWindow(window);
            return {
              date: row.d,
              signal: row.s === 'n' ? 'rate_level' : row.s === 'c' ? 'reversal_from_local_high' : 'no_threshold_signal',
              rate: row.r,
              strength: row.q,
            };
          },
        },
        { signal: lifecycle.signal },
      ),
    ).catch(() => undefined);

    return () => lifecycle.abort();
  }, []);

  const trendLabel =
    selected.t > 1
      ? `Курс растёт ${selected.t} дня подряд`
      : selected.t < -1
        ? `Курс снижается ${Math.abs(selected.t)} дня подряд`
        : 'Резкого тренда несколько дней подряд нет';

  const facts = [
    {
      icon: selected.w >= 0 ? TrendingUp : TrendingDown,
      title: `Динамика · ${selected.w >= 0 ? '+' : ''}${selected.w.toFixed(1).replace('.', ',')}%`,
      text:
        selected.w >= 0
          ? 'За последние 7 дней рубль укрепился к тенге.'
          : 'За последние 7 дней рубль ослаб к тенге.',
    },
    {
      icon: Sparkles,
      title: `Уровень · ${selected.p}-й процентиль`,
      text: `Среди 30 последних значений курс был ниже текущего в ${selected.p}% случаев.`,
    },
    {
      icon: selected.t >= 0 ? TrendingUp : TrendingDown,
      title: `Моментум · ${trendLabel}`,
      text: 'Стрик учитывает только последовательность уже опубликованных значений.',
    },
  ];

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="AlphaTransfer — на главную">
          <span className="brand-mark" aria-hidden="true">A</span>
          <span>AlphaTransfer</span>
        </a>
        <div className="header-meta">
          <span className="live-dot" aria-hidden="true" />
          RUB → KZT · История курса
        </div>
      </header>

      <div id="top" className="content">
        <section className="intro" aria-labelledby="page-title">
          <div>
            <div className="overline">Переводы · RUB → KZT</div>
            <h1 id="page-title">Что происходило с курсом?</h1>
            <p>Выберите дату — покажем клиентский сигнал, историю курса и внутреннее объяснение модели.</p>
          </div>
        </section>

        <section className="layer-heading" aria-labelledby="client-layer-title">
          <span className="layer-index">1</span>
          <div>
            <div className="card-kicker">Клиентский слой</div>
            <h2 id="client-layer-title">Что видит пользователь</h2>
            <p>Только текущий курс и проверяемые факты о прошлом — без прогноза и искусственной срочности.</p>
          </div>
          <span className="layer-visibility">Экран приложения</span>
        </section>

        <section className="control-grid" aria-label="Выбор даты и результат">
          <div className="card date-card">
            <div className="card-kicker">Дата проверки</div>
            <div className="date-row">
              <button
                className="icon-button"
                type="button"
                onClick={() => moveDate(-1)}
                disabled={selectedIndex === 0}
                aria-label="Предыдущий день"
              >
                <ArrowLeft size={20} />
              </button>
              <label className="date-field">
                <CalendarDays size={20} aria-hidden="true" />
                <span className="sr-only">Выберите дату</span>
                <input
                  type="date"
                  value={selectedDate}
                  min={demoRows[0].d}
                  max={demoRows[demoRows.length - 1].d}
                  onChange={(event) => setSelectedDate(event.target.value)}
                />
              </label>
              <button
                className="icon-button"
                type="button"
                onClick={() => moveDate(1)}
                disabled={selectedIndex === demoRows.length - 1}
                aria-label="Следующий день"
              >
                <ArrowRight size={20} />
              </button>
            </div>
            <div className="preset-row" aria-label="Быстрые сценарии">
              <span>Примеры:</span>
              <button type="button" onClick={() => setSelectedDate('2026-05-29')}>сигнал уровня</button>
              <button type="button" onClick={() => setSelectedDate('2026-06-02')}>после максимума</button>
              <button type="button" onClick={() => setSelectedDate('2026-06-14')}>обычный диапазон</button>
            </div>
          </div>

          <article
            className="card signal-card"
            style={{ '--signal': state.accent, '--signal-soft': state.soft } as React.CSSProperties}
            aria-live="polite"
          >
            <div className="signal-icon"><SignalIcon size={23} strokeWidth={2.3} /></div>
            <div className="signal-copy">
              <div className="card-kicker">{state.eyebrow} · {ruDate.format(asDate(selected.d))}</div>
              <h2>{clientTitle}</h2>
              <p>{clientDescription}</p>
              <span className="signal-chip">{state.chip}</span>
            </div>
            <div className="signal-score">
              <span>Канал</span>
              <strong>{selected.s === 'n' ? 'Push' : 'In-app'}</strong>
              <small>{state.delivery}</small>
            </div>
          </article>
        </section>

        <section className="card chart-card" aria-labelledby="chart-title">
          <div className="chart-head">
            <div>
              <div className="card-kicker">Динамика вокруг даты</div>
              <h2 id="chart-title">Сколько тенге за 1 рубль</h2>
            </div>
            <div className="chart-summary">
              <div className="rate-now">
                <strong>{selected.r.toFixed(2).replace('.', ',')} ₸</strong>
                <span>на выбранную дату</span>
              </div>
              <span className={`period-change ${chartChange >= 0 ? 'positive' : 'negative'}`}>
                {chartChange >= 0 ? '+' : ''}{chartChange.toFixed(2).replace('.', ',')}%
              </span>
            </div>
          </div>
          <div className="timeframe-row">
            <div className="timeframe-switcher" aria-label="Масштаб графика">
              {windowOptions.map((option) => (
                <button
                  className={chartWindow === option.id ? 'active' : ''}
                  type="button"
                  key={option.id}
                  onClick={() => setChartWindow(option.id)}
                  aria-pressed={chartWindow === option.id}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <span>изменение от начала окна</span>
          </div>
          <figure className="chart-wrap" aria-label={`График курса вокруг ${ruDate.format(asDate(selected.d))}`}>
            <ResponsiveContainer
              width="100%"
              height="100%"
              minWidth={0}
              minHeight={280}
              initialDimension={{ width: 960, height: 330 }}
            >
              <AreaChart data={chartRows} margin={{ top: 22, right: 10, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="rateFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef3124" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#ef3124" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#e8eaed" strokeDasharray="2 5" vertical={false} />
                <XAxis dataKey="d" tickFormatter={compactDate} axisLine={false} tickLine={false} tick={{ fill: '#7b8490', fontSize: 12 }} dy={10} minTickGap={32} />
                <YAxis domain={['dataMin - 0.05', 'dataMax + 0.05']} axisLine={false} tickLine={false} tick={{ fill: '#9aa2ac', fontSize: 12 }} tickFormatter={(value) => Number(value).toFixed(1)} />
                <Tooltip content={<RateTooltip />} cursor={{ stroke: '#b8bec6', strokeDasharray: '3 4' }} />
                <ReferenceLine x={selected.d} stroke="#151d28" strokeDasharray="4 4" strokeWidth={1.5} />
                <Area type="monotone" dataKey="r" stroke="#ef3124" strokeWidth={3} fill="url(#rateFill)" activeDot={{ r: 6, fill: '#fff', stroke: '#ef3124', strokeWidth: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </figure>
          <div className="chart-legend">
            <span><i className="legend-line" />Исторический курс</span>
            <span><i className="legend-marker" />Выбранная дата</span>
            <span className="window-note">{activeWindow.note}</span>
          </div>
          <div className="range-panel" aria-label="Диапазон курса за 3 месяца">
            <div className="range-head">
              <div>
                <div className="card-kicker">3 месяца до выбранной даты</div>
                <strong>Позиция курса в диапазоне</strong>
              </div>
              <div className={`range-change ${threeMonthChange >= 0 ? 'positive' : 'negative'}`}>
                {threeMonthChange >= 0 ? <TrendingUp size={17} /> : <TrendingDown size={17} />}
                {threeMonthChange >= 0 ? '+' : ''}{threeMonthChange.toFixed(1).replace('.', ',')}%
              </div>
            </div>
            <div className="range-metrics">
              <div><span>Минимум</span><strong>{threeMonthMin.toFixed(2).replace('.', ',')} ₸</strong></div>
              <div className="range-current"><span>Выбранный курс</span><strong>{selected.r.toFixed(2).replace('.', ',')} ₸</strong></div>
              <div><span>Максимум</span><strong>{threeMonthMax.toFixed(2).replace('.', ',')} ₸</strong></div>
            </div>
            <div className="range-track" aria-hidden="true">
              <div className="range-fill" style={{ width: `${rangePosition}%` }} />
              <i className="range-marker-dot" style={{ left: `${rangePosition}%` }} />
            </div>
            <div className="range-caption">
              <span>{compactDate(threeMonthRows[0].d)}</span>
              <span>выше минимума на {((selected.r / threeMonthMin - 1) * 100).toFixed(1).replace('.', ',')}%</span>
              <span>{compactDate(selected.d)}</span>
            </div>
          </div>
        </section>

        <section className="facts-section" aria-labelledby="facts-title">
          <div className="layer-heading interpretation-heading">
            <span className="layer-index dark">2</span>
            <div>
              <div className="card-kicker">Служебный слой</div>
              <h2 id="facts-title">Интерпретация модели</h2>
              <p>Сила сигнала, активные правила и факты, из которых сложилось решение.</p>
            </div>
            <span className="layer-visibility internal"><ShieldCheck size={16} /> Не показывается клиенту</span>
          </div>
          <article className="card model-overview">
            <div className="strength-block">
              <div className="card-kicker">Сила сигнала</div>
              <div className="strength-value"><strong>{selected.q}%</strong><span>{activeTriggerLabel}</span></div>
              <div className="strength-track" aria-label={`Сила сигнала ${selected.q}%`}>
                <i style={{ width: `${selected.q}%` }} />
              </div>
            </div>
            <div className="trigger-block">
              <div className="card-kicker">Статус правил</div>
              <div className="trigger-grid">
                {modelTriggers.map((trigger) => (
                  <div className={`trigger-item ${trigger.active ? 'active' : ''}`} key={trigger.name}>
                    <span>
                      {trigger.active ? <Check size={14} aria-hidden="true" /> : <CircleMinus size={14} aria-hidden="true" />}
                      {trigger.name}
                    </span>
                    <small>{trigger.active ? 'Сработал' : 'Не сработал'} · {trigger.detail}</small>
                  </div>
                ))}
              </div>
            </div>
          </article>
          <div className="evidence-heading">
            <h3>Что увидела модель</h3>
            <span>Факты о прошлом и настоящем</span>
          </div>
          <div className="facts-grid">
            {facts.map((fact) => {
              const FactIcon = fact.icon;
              return (
                <article className="card fact-card" key={fact.title}>
                  <div className="fact-icon"><FactIcon size={21} /></div>
                  <h3>{fact.title}</h3>
                  <p>{fact.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <aside className="note" aria-label="О демо-данных">
          <Info size={18} />
          <p>Курс носит информационный характер, не является публичной офертой и может измениться. Итоговый курс фиксируется в момент перевода.</p>
        </aside>
      </div>
    </main>
  );
}
