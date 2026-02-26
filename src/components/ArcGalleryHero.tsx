import { useEffect, useState } from 'react';

export type Mathematician = {
  name: string;
  years: string;
  yearStart: number;
  achievement: string;
  historicalContext: string;
  contextType: 'war' | 'discovery' | 'political';
  portrait: string;
  color: string;
};

type ArcGalleryHeroProps = {
  mathematicians: Mathematician[];
  startAngle?: number;
  endAngle?: number;
  radiusLg?: number;
  radiusMd?: number;
  radiusSm?: number;
  cardSizeLg?: number;
  cardSizeMd?: number;
  cardSizeSm?: number;
  className?: string;
};

const contextIcon = (type: 'war' | 'discovery' | 'political') => {
  if (type === 'war') return '⚔️';
  if (type === 'discovery') return '🔭';
  return '⚖️';
};

const contextLabel = (type: 'war' | 'discovery' | 'political') => {
  if (type === 'war') return 'Война';
  if (type === 'discovery') return 'Открытие';
  return 'Политика';
};

const typeColor = (type: 'war' | 'discovery' | 'political') => {
  if (type === 'war') return '#e07b54';
  if (type === 'discovery') return '#5ba4a4';
  return '#c9a227';
};

const TIMELINE_EVENTS = [
  { year: 415,  label: 'Убийство Гипатии', type: 'political' as const },
  { year: 1687, label: 'Ньютон — «Начала»', type: 'discovery' as const },
  { year: 1740, label: 'Война за австр. наследство', type: 'war' as const },
  { year: 1877, label: 'Русско-турецкая война', type: 'war' as const },
  { year: 1905, label: 'Теория относительности', type: 'discovery' as const },
  { year: 1914, label: 'Первая мировая', type: 'war' as const },
  { year: 1939, label: 'Вторая мировая', type: 'war' as const },
  { year: 1969, label: 'Аполлон-11', type: 'discovery' as const },
  { year: 1979, label: 'Иранская революция', type: 'political' as const },
  { year: 2014, label: 'Медаль Филдса — Мирзахани', type: 'discovery' as const },
];

function Timeline({ mathematicians, selected, onSelect }: {
  mathematicians: Mathematician[];
  selected: Mathematician | null;
  onSelect: (m: Mathematician | null) => void;
}) {
  const MIN_YEAR = 300;
  const MAX_YEAR = 2030;
  const RANGE = MAX_YEAR - MIN_YEAR;
  const toPercent = (year: number) => ((year - MIN_YEAR) / RANGE) * 100;

  return (
    <div className="w-full px-6 sm:px-12 lg:px-20 py-8">
      <p className="text-[10px] uppercase tracking-[0.25em] text-slate-600 mb-8 text-center">
        Хронологическая шкала
      </p>

      <div className="relative h-16">
        {/* Основная линия */}
        <div className="absolute top-6 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c9a227]/20 via-white/15 to-[#9b59b6]/20 rounded-full" />

        {/* Исторические события — засечки */}
        {TIMELINE_EVENTS.map((ev, i) => (
          <div
            key={i}
            className="absolute flex flex-col items-center"
            style={{ left: `${toPercent(ev.year)}%`, top: '18px', transform: 'translateX(-50%)' }}
          >
            <div
              className="w-px h-3 opacity-30"
              style={{ backgroundColor: typeColor(ev.type) }}
            />
            <span
              className="hidden lg:block text-[7px] mt-1 text-center leading-tight max-w-[60px] opacity-40"
              style={{ color: typeColor(ev.type) }}
            >
              {ev.year}
            </span>
          </div>
        ))}

        {/* Портреты учёных */}
        {mathematicians.map((m, i) => {
          const isActive = selected?.name === m.name;
          return (
            <div
              key={i}
              className="absolute flex flex-col items-center cursor-pointer group"
              style={{
                left: `${toPercent(m.yearStart)}%`,
                top: isActive ? '-4px' : '0px',
                transform: 'translateX(-50%)',
                zIndex: isActive ? 20 : 10,
                transition: 'top 0.2s ease',
              }}
              onClick={() => onSelect(isActive ? null : m)}
            >
              {/* Вертикальная линия к шкале */}
              <div
                className="w-px mb-1 transition-all duration-300"
                style={{
                  height: isActive ? 16 : 10,
                  backgroundColor: isActive ? m.color : 'rgba(255,255,255,0.15)',
                }}
              />
              <div
                className="rounded-full overflow-hidden border-2 transition-all duration-300"
                style={{
                  width: isActive ? 44 : 34,
                  height: isActive ? 44 : 34,
                  borderColor: isActive ? m.color : 'rgba(255,255,255,0.15)',
                  boxShadow: isActive ? `0 0 16px ${m.color}60` : 'none',
                }}
              >
                <img
                  src={m.portrait}
                  alt={m.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  draggable={false}
                />
              </div>
              <div
                className="text-[8px] mt-1 font-medium transition-all duration-300 whitespace-nowrap"
                style={{ color: isActive ? m.color : 'rgba(255,255,255,0.25)' }}
              >
                {m.yearStart < 1000 ? `${m.yearStart} н.э.` : m.yearStart}
              </div>
              {/* Тултип с именем */}
              <div
                className="absolute bottom-full mb-1 text-[9px] whitespace-nowrap bg-[#12082a]/95 border rounded px-2 py-1 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{ borderColor: m.color + '60' }}
              >
                {m.name.split(' ').slice(0, 2).join(' ')}
              </div>
            </div>
          );
        })}
      </div>

      {/* Легенда */}
      <div className="flex justify-between mt-6 text-[9px]">
        <span className="text-slate-700">IV в. н.э.</span>
        <span className="flex gap-3 sm:gap-5">
          <span style={{ color: '#e07b54' }}>⚔️ войны</span>
          <span style={{ color: '#5ba4a4' }}>🔭 открытия</span>
          <span style={{ color: '#c9a227' }}>⚖️ политика</span>
        </span>
        <span className="text-slate-700">XXI век</span>
      </div>
    </div>
  );
}

const ArcGalleryHero = ({
  mathematicians,
  startAngle = 20,
  endAngle = 160,
  radiusLg = 480,
  radiusMd = 360,
  radiusSm = 260,
  cardSizeLg = 130,
  cardSizeMd = 105,
  cardSizeSm = 80,
  className = '',
}: ArcGalleryHeroProps) => {
  const [dimensions, setDimensions] = useState({ radius: radiusLg, cardSize: cardSizeLg });
  const [selected, setSelected] = useState<Mathematician | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setDimensions({ radius: radiusSm, cardSize: cardSizeSm });
      else if (w < 1024) setDimensions({ radius: radiusMd, cardSize: cardSizeMd });
      else setDimensions({ radius: radiusLg, cardSize: cardSizeLg });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [radiusLg, radiusMd, radiusSm, cardSizeLg, cardSizeMd, cardSizeSm]);

  const count = Math.max(mathematicians.length, 2);
  const step = (endAngle - startAngle) / (count - 1);

  return (
    <section className={`relative overflow-hidden bg-[#0d0a1a] min-h-screen flex flex-col ${className}`}>
      {/* Фоновые звёзды */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: (((i * 7) % 2) + 1) + 'px',
              height: (((i * 7) % 2) + 1) + 'px',
              top: ((i * 13) % 70) + '%',
              left: ((i * 17) % 100) + '%',
              opacity: ((i * 11) % 5) * 0.1 + 0.05,
            }}
          />
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#1a0a2e] to-transparent" />
      </div>

      {/* Заголовок */}
      <div
        className="relative z-10 text-center pt-12 pb-4 px-6 opacity-0 animate-fade-in"
        style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-[#c9a227] mb-2 font-medium"></p>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Лента <span className="text-[#c9a227]">времени</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          Женщины-математики, изменившие науку вопреки войнам, запретам и историческим бурям
        </p>
      </div>

      {/* Дуга с портретами */}
      <div className="relative mx-auto" style={{ width: '100%', height: dimensions.radius * 1.15 }}>
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
          {mathematicians.map((m, i) => {
            const angle = startAngle + step * i;
            const angleRad = (angle * Math.PI) / 180;
            const x = Math.cos(angleRad) * dimensions.radius;
            const y = Math.sin(angleRad) * dimensions.radius;
            const isSelected = selected?.name === m.name;

            return (
              <div
                key={i}
                className="absolute opacity-0 animate-fade-in-up cursor-pointer"
                style={{
                  width: dimensions.cardSize,
                  height: dimensions.cardSize,
                  left: `calc(50% + ${x}px)`,
                  bottom: `${y}px`,
                  transform: `translate(-50%, 50%)`,
                  animationDelay: `${i * 100}ms`,
                  animationFillMode: 'forwards',
                  zIndex: isSelected ? 50 : count - i,
                }}
                onClick={() => setSelected(isSelected ? null : m)}
              >
                <div
                  className="rounded-2xl overflow-hidden w-full h-full transition-all duration-300 group"
                  style={{
                    transform: `rotate(${angle / 4}deg) ${isSelected ? 'scale(1.15)' : 'scale(1)'}`,
                    boxShadow: isSelected
                      ? `0 0 0 3px ${m.color}, 0 8px 32px rgba(0,0,0,0.6)`
                      : `0 4px 20px rgba(0,0,0,0.5)`,
                  }}
                >
                  <img
                    src={m.portrait}
                    alt={m.name}
                    className="block w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                    <p className="text-white text-[9px] sm:text-[10px] font-semibold leading-tight text-center w-full">
                      {m.name.split(' ').slice(-1)[0]}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Карточка с информацией */}
      <div className="relative z-10 flex items-start justify-center px-4 -mt-32 sm:-mt-44 lg:-mt-56 pb-4">
        {selected ? (
          <div
            className="bg-[#12082a]/90 backdrop-blur-md border rounded-2xl shadow-2xl max-w-lg w-full p-6 text-left"
            style={{ borderColor: selected.color }}
          >
            <div className="flex items-start gap-4">
              <img
                src={selected.portrait}
                alt={selected.name}
                className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
              />
              <div>
                <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: selected.color }}>
                  {selected.years}
                </p>
                <h2 className="text-lg font-bold text-white leading-tight">{selected.name}</h2>
              </div>
            </div>
            <p className="mt-4 text-slate-200 text-sm leading-relaxed">{selected.achievement}</p>
            <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-[10px] uppercase tracking-widest mb-1 text-slate-500">
                {contextIcon(selected.contextType)} Исторический контекст · {contextLabel(selected.contextType)}
              </p>
              <p className="text-slate-400 text-xs leading-relaxed">{selected.historicalContext}</p>
            </div>
            <button
              className="mt-4 text-xs text-slate-500 hover:text-slate-300 transition-colors"
              onClick={() => setSelected(null)}
            >
              ✕ закрыть
            </button>
          </div>
        ) : (
          <div
            className="text-center max-w-md opacity-0 animate-fade-in px-4"
            style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}
          >
            <p className="text-slate-400 text-sm">
              Нажмите на портрет, чтобы узнать об учёной и историческом контексте её эпохи
            </p>
          </div>
        )}
      </div>

      {/* Хронологическая шкала */}
      <div
        className="relative z-10 w-full opacity-0 animate-fade-in"
        style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}
      >
        <Timeline mathematicians={mathematicians} selected={selected} onSelect={setSelected} />
      </div>
    </section>
  );
};

export default ArcGalleryHero;