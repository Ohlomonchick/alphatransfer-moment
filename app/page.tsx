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
  Clock3,
  Database,
  Info,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

type Signal = 'n' | 'c' | 'x';

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

const signalContent = {
  n: {
    eyebrow: 'Сигнал модели',
    title: 'Выгодный момент для перевода',
    description: 'Сейчас за рубль дают заметно больше тенге, чем обычно за последний месяц.',
    chip: 'Момент выгодный',
    accent: '#13a463',
    soft: '#eaf8f1',
    icon: Check,
  },
  c: {
    eyebrow: 'Сигнал модели',
    title: 'Окно закрывается',
    description: 'Курс отклонился от недавнего максимума. Перед переводом стоит проверить сумму к получению.',
    chip: 'Условия изменились',
    accent: '#e46b1a',
    soft: '#fff3e9',
    icon: Clock3,
  },
  x: {
    eyebrow: 'Результат модели',
    title: 'Сигнала на эту дату нет',
    description: 'Движение курса не прошло порог качества. Мы бы не тратили лимит уведомлений.',
    chip: 'Без уведомления',
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

function RateTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: DemoRow }> }) {
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
  const selectedIndex = Math.max(0, demoRows.findIndex((row) => row.d === selectedDate));
  const selected = demoRows[selectedIndex];
  const state = signalContent[selected.s];
  const SignalIcon = state.icon;

  const chartRows = useMemo(
    () => demoRows.slice(Math.max(0, selectedIndex - 5), Math.min(demoRows.length, selectedIndex + 6)),
    [selectedIndex],
  );

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
            },
            required: ['date'],
            additionalProperties: false,
          },
          annotations: { readOnlyHint: false, untrustedContentHint: false },
          execute(input) {
            const date = (input as { date?: unknown })?.date;
            const row = demoRows.find((item) => item.d === date);
            if (!row) throw new Error('Дата вне демо-диапазона');
            setSelectedDate(row.d);
            return {
              date: row.d,
              signal: row.s === 'n' ? 'favorable_now' : row.s === 'c' ? 'window_closing' : 'no_signal',
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
      title: `${selected.w >= 0 ? '+' : ''}${selected.w.toFixed(1).replace('.', ',')}% за неделю`,
      text:
        selected.w >= 0
          ? 'Столько добавилось к сумме в тенге за каждый рубль.'
          : 'Столько потерял рубль к тенге за последние 7 дней.',
    },
    {
      icon: Sparkles,
      title: `${selected.p}-й процентиль`,
      text: `Курс выше, чем в ${selected.p}% дней внутри 30-дневного окна.`,
    },
    {
      icon: selected.t >= 0 ? TrendingUp : TrendingDown,
      title: trendLabel,
      text: 'Учитываем только уже опубликованные значения — без прогноза будущего курса.',
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
          Демо · RUB → KZT
        </div>
      </header>

      <div id="top" className="content">
        <section className="intro" aria-labelledby="page-title">
          <div>
            <div className="overline">Историческая демонстрация</div>
            <h1 id="page-title">Когда переводить деньги?</h1>
            <p>Выберите дату — покажем, был ли сигнал, каким был курс и какие факты его подтверждали.</p>
          </div>
          <div className="data-badge"><Database size={15} /> Всё рассчитано заранее</div>
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
              <button type="button" onClick={() => setSelectedDate('2026-05-29')}>выгодный</button>
              <button type="button" onClick={() => setSelectedDate('2026-06-02')}>окно закрывается</button>
              <button type="button" onClick={() => setSelectedDate('2026-06-14')}>без сигнала</button>
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
              <h2>{state.title}</h2>
              <p>{state.description}</p>
              <span className="signal-chip">{state.chip}</span>
            </div>
            <div className="signal-score">
              <span>Сила сигнала</span>
              <strong>{selected.q}%</strong>
            </div>
          </article>
        </section>

        <section className="card chart-card" aria-labelledby="chart-title">
          <div className="chart-head">
            <div>
              <div className="card-kicker">Динамика вокруг даты</div>
              <h2 id="chart-title">Сколько тенге за 1 рубль</h2>
            </div>
            <div className="rate-now">
              <strong>{selected.r.toFixed(2).replace('.', ',')} ₸</strong>
              <span>на выбранную дату</span>
            </div>
          </div>
          <div className="chart-wrap" role="img" aria-label={`График курса вокруг ${ruDate.format(asDate(selected.d))}`}>
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
                <XAxis dataKey="d" tickFormatter={compactDate} axisLine={false} tickLine={false} tick={{ fill: '#7b8490', fontSize: 12 }} dy={10} />
                <YAxis domain={['dataMin - 0.05', 'dataMax + 0.05']} axisLine={false} tickLine={false} tick={{ fill: '#9aa2ac', fontSize: 12 }} tickFormatter={(value) => Number(value).toFixed(1)} />
                <Tooltip content={<RateTooltip />} cursor={{ stroke: '#b8bec6', strokeDasharray: '3 4' }} />
                <ReferenceLine x={selected.d} stroke="#151d28" strokeDasharray="4 4" strokeWidth={1.5} />
                <Area type="monotone" dataKey="r" stroke="#ef3124" strokeWidth={3} fill="url(#rateFill)" activeDot={{ r: 6, fill: '#fff', stroke: '#ef3124', strokeWidth: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-legend">
            <span><i className="legend-line" />Исторический курс</span>
            <span><i className="legend-marker" />Выбранная дата</span>
            <span className="window-note">5 дней до · 5 дней после</span>
          </div>
        </section>

        <section className="facts-section" aria-labelledby="facts-title">
          <div className="section-heading">
            <div>
              <div className="card-kicker">Объяснение</div>
              <h2 id="facts-title">Что увидела модель</h2>
            </div>
            <span><ShieldCheck size={17} /> Только факты о прошлом и настоящем</span>
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
          <p><strong>Это продуктовый прототип.</strong> Курс, сигналы и объяснения заранее сохранены в локальной демо-таблице. Сайт не запускает модель и не обращается к внешним сервисам.</p>
        </aside>
      </div>
    </main>
  );
}
