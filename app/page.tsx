'use client';

import { useEffect, useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowLeft, ArrowRight, CalendarDays, Check, CircleMinus, Clock3, Info, ShieldCheck, Sparkles, TrendingDown, TrendingUp } from 'lucide-react';
import { historicalRates, type HistoryRow } from './rate-history';
import { modelProfile, modelRows, type ModelRow } from './model-data';

type ChartWindow = '10d' | '1m' | '3m';
type ClientState = 'now' | 'closing' | 'none' | 'no-session';

const decisionRates: HistoryRow[] = modelRows.map((row) => ({ d: row.d, r: row.rubPerKzt * 100 }));
const rateHistory: HistoryRow[] = [...historicalRates, ...decisionRates];

const windowOptions = [
  { id: '10d' as const, label: '10Д', before: 5, after: 5, note: '5 сессий до · 5 после' },
  { id: '1m' as const, label: '1М', before: 25, after: 5, note: '25 сессий до · 5 после' },
  { id: '3m' as const, label: '3М', before: 85, after: 5, note: '85 сессий до · 5 после' },
];

const stateContent = {
  now: { eyebrow: 'Уведомление о курсе', chip: 'Push · факт о курсе', delivery: 'Пользователь получает уведомление', accent: '#13a463', soft: '#eaf8f1', icon: Check },
  closing: { eyebrow: 'Уведомление о курсе', chip: 'Push · динамика изменилась', delivery: 'Пользователь получает обновлённый текст', accent: '#e46b1a', soft: '#fff3e9', icon: TrendingDown },
  none: { eyebrow: 'Состояние курса', chip: 'Без пуша', delivery: 'Проактивного уведомления нет', accent: '#657181', soft: '#eef1f4', icon: CircleMinus },
  'no-session': { eyebrow: 'Нет нового расчёта', chip: 'Без нового решения', delivery: 'Показана последняя доступная сессия', accent: '#657181', soft: '#eef1f4', icon: Clock3 },
} as const;

const ruDate = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const shortDate = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short', timeZone: 'UTC' });

function asDate(value: string) { return new Date(`${value}T00:00:00Z`); }
function compactDate(value: string) { return shortDate.format(asDate(value)).replace('.', ''); }
function percent(value: number, digits = 1) {
  const result = (value * 100).toFixed(digits).replace('.', ',');
  return `${value > 0 ? '+' : ''}${result}%`;
}
function score(value: number) { return `${(value * 100).toFixed(1).replace('.', ',')}%`; }
function closestSession(date: string): ModelRow { return [...modelRows].reverse().find((row) => row.d <= date) ?? modelRows[0]; }
function sessionWord(value: number) {
  const tail = value % 100;
  if (tail >= 11 && tail <= 14) return 'сессий';
  if (value % 10 === 1) return 'сессию';
  if (value % 10 >= 2 && value % 10 <= 4) return 'сессии';
  return 'сессий';
}
function weekStart(value: string) {
  const date = asDate(value);
  const offset = (date.getUTCDay() + 6) % 7;
  date.setUTCDate(date.getUTCDate() - offset);
  return date.toISOString().slice(0, 10);
}

function RateTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: HistoryRow }> }) {
  if (!active || !payload?.[0]) return null;
  const row = payload[0].payload;
  return <div className="chart-tooltip"><span>{compactDate(row.d)}</span><strong>{row.r.toFixed(2)} ₽ за 100 ₸</strong></div>;
}

export default function Home() {
  const [selectedDate, setSelectedDate] = useState('2026-06-02');
  const [chartWindow, setChartWindow] = useState<ChartWindow>('1m');
  const selectedSession = closestSession(selectedDate);
  const isSessionDay = selectedSession.d === selectedDate;
  const selectedDecisionIndex = modelRows.findIndex((row) => row.d === selectedSession.d);
  const historyIndex = Math.max(0, rateHistory.findIndex((row) => row.d === selectedSession.d));
  const selectedRate = rateHistory[historyIndex];
  const activeWindow = windowOptions.find((option) => option.id === chartWindow) ?? windowOptions[1];
  const clientState: ClientState = !isSessionDay ? 'no-session' : selectedSession.candidate ? (selectedSession.closing ? 'closing' : 'now') : 'none';
  const state = stateContent[clientState];
  const StateIcon = state.icon;

  const chartRows = useMemo(
    () => rateHistory.slice(Math.max(0, historyIndex - activeWindow.before), Math.min(rateHistory.length, historyIndex + activeWindow.after + 1)),
    [activeWindow.after, activeWindow.before, historyIndex],
  );
  const threeMonthRows = useMemo(() => rateHistory.slice(Math.max(0, historyIndex - 89), historyIndex + 1), [historyIndex]);
  const threeMonthMin = Math.min(...threeMonthRows.map((row) => row.r));
  const threeMonthMax = Math.max(...threeMonthRows.map((row) => row.r));
  const rangeSpan = Math.max(threeMonthMax - threeMonthMin, 0.0001);
  const rangePosition = Math.min(100, Math.max(0, ((selectedRate.r - threeMonthMin) / rangeSpan) * 100));
  const threeMonthChange = (selectedRate.r / threeMonthRows[0].r) - 1;
  const chartChange = (selectedRate.r / chartRows[0].r) - 1;
  const cheaperThanShare = Math.round((1 - selectedSession.pr60) * 100);
  const momentumDirection = selectedSession.ret1 < 0 ? -1 : 1;
  let momentumStreak = 0;
  for (const row of modelRows.slice(0, selectedDecisionIndex + 1).reverse()) {
    if ((row.ret1 < 0 ? -1 : 1) !== momentumDirection) break;
    momentumStreak += 1;
  }

  const clientTitle = clientState === 'no-session'
    ? 'На выбранную дату нового решения нет'
    : clientState === 'none'
      ? 'Сигнал на перевод не сформирован'
      : selectedSession.ret5 < 0
        ? `100 ₸ стали дешевле на ${Math.abs(selectedSession.ret5 * 100).toFixed(1).replace('.', ',')}%`
        : `100 ₸ стали дороже на ${(selectedSession.ret5 * 100).toFixed(1).replace('.', ',')}%`;
  const clientDescription = clientState === 'no-session'
    ? `Последний модельный срез — ${ruDate.format(asDate(selectedSession.d))} Решение не переносится на другую дату или цену.`
    : clientState === 'none'
      ? `Сейчас 100 ₸ стоят ${selectedRate.r.toFixed(2).replace('.', ',')} ₽. Стоимость ниже, чем в ${cheaperThanShare}% последних 60 модельных сессий.`
      : selectedSession.ret5 < 0
        ? `Для получения 100 ₸ теперь нужно меньше рублей. Это выгодная для отправителя динамика, подтверждённая историей курса.`
        : `Для получения 100 ₸ теперь нужно больше рублей. Модель учитывает эту динамику вместе с остальными признаками.`;

  const nowScorePassed = selectedSession.probability >= modelProfile.nowThreshold;
  const closingScorePassed = selectedSession.closingProbability >= modelProfile.closingThreshold;
  const positiveRet1 = selectedSession.ret1 > 0;
  const previousContacts = modelRows.slice(0, selectedDecisionIndex).filter((row) => row.candidate);
  const previousContact = previousContacts.at(-1);
  const sessionGap = previousContact ? selectedSession.session - previousContact.session : Number.POSITIVE_INFINITY;
  const cooldownPassed = sessionGap > modelProfile.cooldownSessions;
  const contactsThisWeek = previousContacts.filter((row) => weekStart(row.d) === weekStart(selectedSession.d)).length;
  const weeklyLimitPassed = contactsThisWeek < 2;
  const modelRules = [
    { name: 'Порог NOW', active: nowScorePassed, tone: 'neutral', detail: `${score(selectedSession.probability)} ${nowScorePassed ? '≥' : '<'} ${score(modelProfile.nowThreshold)}` },
    { name: 'Cooldown', active: cooldownPassed, tone: 'neutral', detail: previousContact ? `${sessionGap} сесс. после контакта · нужно > ${modelProfile.cooldownSessions}` : 'предыдущих контактов нет' },
    { name: 'Лимит недели', active: weeklyLimitPassed, tone: 'neutral', detail: `${contactsThisWeek} из 2 контактов до этой сессии` },
    { name: 'Порог CLOSING', active: closingScorePassed, tone: 'closing', detail: `${score(selectedSession.closingProbability)} ${closingScorePassed ? '≥' : '<'} ${score(modelProfile.closingThreshold)}` },
    { name: 'Разворот ret1', active: positiveRet1, tone: 'closing', detail: `${percent(selectedSession.ret1, 2)} · стоимость 100 KZT в RUB` },
  ];
  const verdict = selectedSession.candidate ? (selectedSession.closing ? 'NOW + CLOSING' : 'NOW') : 'NONE';
  const featureFacts = [
    { tone: selectedSession.ret1 < 0 ? 'favorable' : 'caution', icon: selectedSession.ret1 < 0 ? TrendingDown : TrendingUp, title: `Моментум · стоимость ${selectedSession.ret1 < 0 ? 'снижается' : 'растёт'} ${momentumStreak} ${sessionWord(momentumStreak)} подряд`, text: selectedSession.ret1 < 0 ? `За 5 сессий: ${percent(selectedSession.ret5, 1)}. За 100 ₸ нужно всё меньше рублей — для отправителя это хороший знак.` : `За 5 сессий: ${percent(selectedSession.ret5, 1)}. За 100 ₸ снова нужно больше рублей — окно может закрываться.` },
    { tone: 'neutral', icon: Sparkles, title: `Стоимость ниже, чем в ${cheaperThanShare}% сессий`, text: `Признак pr60: ${Math.round(selectedSession.pr60 * 100)}-й процентиль стоимости 100 KZT в рублях.` },
    { tone: 'neutral', icon: TrendingUp, title: `Волатильность vol20 · ${score(selectedSession.vol20)}`, text: 'Историческая изменчивость за 20 сессий — один из входов TabM.' },
  ];

  const moveDate = (step: number) => {
    const exactIndex = modelRows.findIndex((row) => row.d === selectedDate);
    const targetIndex = exactIndex >= 0 ? exactIndex + step : selectedDecisionIndex + (step > 0 ? 1 : 0);
    const next = Math.min(modelRows.length - 1, Math.max(0, targetIndex));
    setSelectedDate(modelRows[next].d);
  };

  useEffect(() => {
    const context = (document as Document & { modelContext?: { registerTool: (tool: { name: string; title: string; description: string; inputSchema: object; annotations: { readOnlyHint: boolean; untrustedContentHint: boolean }; execute: (input: unknown) => unknown }, options: { signal: AbortSignal }) => void | Promise<void> } }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    void Promise.resolve(context.registerTool({
      name: 'show_transfer_signal',
      title: 'Показать сигнал перевода',
      description: 'Выбирает модельную сессию AlphaTransfer и показывает сохранённый результат final_solution для RUB → KZT.',
      inputSchema: { type: 'object', properties: { date: { type: 'string', description: 'Дата модельной сессии в формате YYYY-MM-DD.', enum: modelRows.map((row) => row.d) }, window: { type: 'string', description: 'Масштаб графика.', enum: windowOptions.map((option) => option.id) } }, required: ['date'], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        const { date, window } = input as { date?: unknown; window?: unknown };
        const row = modelRows.find((item) => item.d === date);
        if (!row) throw new Error('Дата вне доступных модельных сессий');
        setSelectedDate(row.d);
        if (window === '10d' || window === '1m' || window === '3m') setChartWindow(window);
        return { date: row.d, verdict: row.candidate ? (row.closing ? 'NOW+CLOSING' : 'NOW') : 'NONE', probability: row.probability, closing_probability: row.closingProbability, model_config: modelProfile.configId };
      },
    }, { signal: lifecycle.signal })).catch(() => undefined);
    return () => lifecycle.abort();
  }, []);

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="AlphaTransfer — на главную"><span className="brand-mark" aria-hidden="true">A</span><span>AlphaTransfer</span></a>
        <div className="header-meta"><span className="live-dot" aria-hidden="true" />RUB → KZT · Стоимость 100 ₸</div>
      </header>
      <div id="top" className="content">
        <section className="intro" aria-labelledby="page-title"><div><div className="overline">Переводы · RUB → KZT</div><h1 id="page-title">Что происходило с курсом?</h1><p>Выберите дату — покажем, сколько рублей стоили 100 тенге, и точное решение финальной модели.</p></div></section>

        <section className="layer-heading" aria-labelledby="client-layer-title">
          <span className="layer-index">1</span><div><div className="card-kicker">Клиентский слой</div><h2 id="client-layer-title">Что видит пользователь</h2><p>Текущий курс и проверяемые факты о прошлом — без прогноза и искусственной срочности.</p></div><span className="layer-visibility">Экран приложения</span>
        </section>

        <section className="control-grid" aria-label="Выбор даты и результат">
          <div className="card date-card">
            <div className="card-kicker">Дата проверки</div>
            <div className="date-row">
              <button className="icon-button" type="button" onClick={() => moveDate(-1)} disabled={selectedDecisionIndex <= 0} aria-label="Предыдущая модельная сессия"><ArrowLeft size={20} /></button>
              <label className="date-field"><CalendarDays size={20} aria-hidden="true" /><span className="sr-only">Выберите дату</span><input type="date" value={selectedDate} min={modelRows[0].d} max={modelRows[modelRows.length - 1].d} onChange={(event) => setSelectedDate(event.target.value)} /></label>
              <button className="icon-button" type="button" onClick={() => moveDate(1)} disabled={selectedDecisionIndex === modelRows.length - 1} aria-label="Следующая модельная сессия"><ArrowRight size={20} /></button>
            </div>
            <div className="preset-row" aria-label="Быстрые сценарии"><span>Примеры:</span><button type="button" onClick={() => setSelectedDate('2026-05-21')}>NOW · дешевеет</button><button type="button" onClick={() => setSelectedDate('2026-06-02')}>NOW + CLOSING</button><button type="button" onClick={() => setSelectedDate('2026-06-04')}>порог без контакта</button></div>
          </div>
          <article className="card signal-card" style={{ '--signal': state.accent, '--signal-soft': state.soft } as React.CSSProperties} aria-live="polite">
            <div className="signal-icon"><StateIcon size={23} strokeWidth={2.3} /></div>
            <div className="signal-copy"><div className="card-kicker">{state.eyebrow} · {ruDate.format(asDate(selectedDate))}</div><h2>{clientTitle}</h2><p>{clientDescription}</p><span className="signal-chip">{state.chip}</span></div>
            <div className="signal-score"><span>Канал</span><strong>{clientState === 'now' || clientState === 'closing' ? 'Push' : 'In-app'}</strong><small>{state.delivery}</small></div>
          </article>
        </section>

        <section className="card chart-card" aria-labelledby="chart-title">
          <div className="chart-head"><div><div className="card-kicker">Курс валюты получателя в рублях</div><h2 id="chart-title">Сколько рублей за 100 тенге</h2></div><div className="chart-summary"><div className="rate-now"><strong>{selectedRate.r.toFixed(2).replace('.', ',')} ₽</strong><span>за 100 ₸</span></div><span className={`period-change ${chartChange <= 0 ? 'positive' : 'negative'}`}>{percent(chartChange, 2)}</span></div></div>
          <div className="timeframe-row"><div className="timeframe-switcher" aria-label="Масштаб графика">{windowOptions.map((option) => <button className={chartWindow === option.id ? 'active' : ''} type="button" key={option.id} onClick={() => setChartWindow(option.id)} aria-pressed={chartWindow === option.id}>{option.label}</button>)}</div><span>изменение от начала окна</span></div>
          <figure className="chart-wrap" aria-label={`График курса вокруг ${ruDate.format(asDate(selectedSession.d))}`}>
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={280} initialDimension={{ width: 960, height: 330 }}>
              <AreaChart data={chartRows} margin={{ top: 22, right: 10, left: -18, bottom: 0 }}><defs><linearGradient id="rateFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ef3124" stopOpacity={0.2} /><stop offset="100%" stopColor="#ef3124" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="#e8eaed" strokeDasharray="2 5" vertical={false} /><XAxis dataKey="d" tickFormatter={compactDate} axisLine={false} tickLine={false} tick={{ fill: '#7b8490', fontSize: 12 }} dy={10} minTickGap={32} /><YAxis domain={['dataMin - 0.05', 'dataMax + 0.05']} axisLine={false} tickLine={false} tick={{ fill: '#9aa2ac', fontSize: 12 }} tickFormatter={(value) => Number(value).toFixed(1)} /><Tooltip content={<RateTooltip />} cursor={{ stroke: '#b8bec6', strokeDasharray: '3 4' }} /><ReferenceLine x={selectedSession.d} stroke="#151d28" strokeDasharray="4 4" strokeWidth={1.5} /><Area type="monotone" dataKey="r" stroke="#ef3124" strokeWidth={3} fill="url(#rateFill)" activeDot={{ r: 6, fill: '#fff', stroke: '#ef3124', strokeWidth: 3 }} /></AreaChart>
            </ResponsiveContainer>
          </figure>
          <div className="chart-legend"><span><i className="legend-line" />Исторический курс</span><span><i className="legend-marker" />Модельная сессия</span><span className="window-note">{activeWindow.note}</span></div>
          <div className="range-panel" aria-label="Диапазон курса за 3 месяца">
            <div className="range-head"><div><div className="card-kicker">3 месяца до выбранной даты</div><strong>Стоимость 100 ₸ в диапазоне</strong></div><div className={`range-change ${threeMonthChange <= 0 ? 'positive' : 'negative'}`}>{threeMonthChange <= 0 ? <TrendingDown size={17} /> : <TrendingUp size={17} />}{percent(threeMonthChange)}</div></div>
            <div className="range-metrics"><div><span>Минимум</span><strong>{threeMonthMin.toFixed(2).replace('.', ',')} ₽</strong></div><div className="range-current"><span>Выбранная стоимость</span><strong>{selectedRate.r.toFixed(2).replace('.', ',')} ₽</strong></div><div><span>Максимум</span><strong>{threeMonthMax.toFixed(2).replace('.', ',')} ₽</strong></div></div>
            <div className="range-track" aria-hidden="true"><div className="range-fill" style={{ width: `${rangePosition}%` }} /><i className="range-marker-dot" style={{ left: `${rangePosition}%` }} /></div>
            <div className="range-caption"><span>{compactDate(threeMonthRows[0].d)}</span><span>чем ниже стоимость, тем больше тенге за ту же сумму</span><span>{compactDate(selectedSession.d)}</span></div>
          </div>
        </section>

        <section className="facts-section" aria-labelledby="facts-title">
          <div className="layer-heading interpretation-heading"><span className="layer-index dark">2</span><div><div className="card-kicker">Служебный слой</div><h2 id="facts-title">Интерпретация модели</h2><p>Вердикт, scores и правила ровно из выбранного профиля final_solution.</p></div><span className="layer-visibility internal"><ShieldCheck size={16} /> Не показывается клиенту</span></div>
          {!isSessionDay && <div className="session-note"><Clock3 size={17} />Для выбранной календарной даты нет новой сессии. Ниже — срез за {compactDate(selectedSession.d)}.</div>}
          <article className="card model-overview">
            <div className="strength-block"><div className="card-kicker">Вердикт финальной политики</div><div className="verdict-row"><strong>{verdict}</strong><span>сессия #{selectedSession.session}</span></div><div className="score-pair"><div><span>NOW-score</span><strong>{score(selectedSession.probability)}</strong><small>порог {score(modelProfile.nowThreshold)}</small></div><div><span>CLOSING-score</span><strong>{score(selectedSession.closingProbability)}</strong><small>порог {score(modelProfile.closingThreshold)}</small></div></div></div>
            <div className="trigger-block"><div className="card-kicker">Фактические условия решения</div><div className="trigger-grid">{modelRules.map((rule) => <div className={`trigger-item ${rule.active ? 'active' : ''} ${rule.tone === 'closing' ? 'closing' : ''}`} key={rule.name}><span>{rule.active ? <Check size={14} aria-hidden="true" /> : <CircleMinus size={14} aria-hidden="true" />}{rule.name}</span><small>{rule.active ? 'Выполнено' : 'Не выполнено'} · {rule.detail}</small></div>)}</div></div>
          </article>
          <div className="model-provenance"><span>{modelProfile.model}</span><span>{modelProfile.configId}</span><span>policy: {modelProfile.policy}</span></div>
          <div className="evidence-heading"><h3>Что поступило на вход модели</h3><span>Значения признаков, а не придуманные постфактум причины</span></div>
          <div className="facts-grid">{featureFacts.map((fact) => { const FactIcon = fact.icon; return <article className={`card fact-card ${fact.tone}`} key={fact.title}><div className="fact-icon"><FactIcon size={21} /></div><h3>{fact.title}</h3><p>{fact.text}</p></article>; })}</div>
        </section>

        <aside className="note" aria-label="Информация о курсе"><Info size={18} /><p>Курс носит информационный характер, не является публичной офертой и может измениться. Итоговый курс фиксируется в момент перевода.</p></aside>
      </div>
    </main>
  );
}
