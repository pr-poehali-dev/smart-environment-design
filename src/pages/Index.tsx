import ArcGalleryHero, { type Mathematician } from "@/components/ArcGalleryHero";

const mathematicians: Mathematician[] = [
  {
    name: "Гипатия Александрийская",
    years: "~360 — 415 н.э.",
    yearStart: 360,
    achievement:
      "Первая известная женщина-математик. Комментировала труды Диофанта и Аполлония, преподавала философию и астрономию в Александрии. Была убита фанатичной толпой.",
    historicalContext:
      "Эпоха упадка Римской империи, религиозные конфликты между язычеством и христианством. Александрия переживала волну погромов.",
    contextType: "political",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/0/07/Hypatia_portrait.png",
    color: "#c9a227",
  },
  {
    name: "Эмили дю Шатле",
    years: "1706 — 1749",
    yearStart: 1706,
    achievement:
      "Перевела «Начала» Ньютона на французский и написала блестящий математический комментарий. Первой обосновала понятие кинетической энергии.",
    historicalContext:
      "Война за австрийское наследство (1740–1748) опустошала Европу, пока она работала над переводом в своём замке.",
    contextType: "war",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Emilie_Chatelet_portrait_by_Latour.jpg/500px-Emilie_Chatelet_portrait_by_Latour.jpg",
    color: "#7c6fcd",
  },
  {
    name: "Софья Ковалевская",
    years: "1850 — 1891",
    yearStart: 1850,
    achievement:
      "Первая женщина — профессор математики в Европе. Доказала теорему Коши–Ковалевской, получила премию Бордена за работу о вращении твёрдого тела.",
    historicalContext:
      "Русско-турецкая война (1877–1878). В России женщинам был закрыт доступ в университеты — Ковалевская заключила фиктивный брак, чтобы уехать учиться.",
    contextType: "war",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Sofja_Wassiljewna_Kowalewskaja_1.jpg",
    color: "#e07b54",
  },
  {
    name: "Эмми Нётер",
    years: "1882 — 1935",
    yearStart: 1882,
    achievement:
      "Создала современную абстрактную алгебру. Теорема Нётер — фундамент теоретической физики. Эйнштейн назвал её «самым значительным творческим математическим гением».",
    historicalContext:
      "Первая мировая война и приход нацистов к власти: в 1933 году её уволили из университета Гёттингена за еврейское происхождение. Эмигрировала в США.",
    contextType: "war",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Emmy_Noether_%283x4_cropped%29.jpg/500px-Emmy_Noether_%283x4_cropped%29.jpg",
    color: "#5ba4a4",
  },
  {
    name: "Мэри Картрайт",
    years: "1900 — 1998",
    yearStart: 1900,
    achievement:
      "Пионер теории хаоса. Во время Второй мировой войны анализировала радиосигналы и обнаружила непредсказуемое поведение, ставшее основой хаотической динамики.",
    historicalContext:
      "Вторая мировая война (1939–1945). Её математические исследования велись параллельно с Блетчли-Парк — на пересечении науки и войны.",
    contextType: "war",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/7/76/Mary_cartwright.jpg",
    color: "#4a9e6b",
  },
  {
    name: "Кэтрин Джонсон",
    years: "1918 — 2020",
    yearStart: 1918,
    achievement:
      "Рассчитала траекторию первого американского орбитального полёта и лунной миссии Аполлон-11. Джон Гленн отказывался лететь без её проверки расчётов.",
    historicalContext:
      "Холодная война и космическая гонка. Джонсон работала в NASA как «человек-компьютер», преодолевая расовую сегрегацию в США.",
    contextType: "discovery",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Katherine_Johnson_1983.jpg/500px-Katherine_Johnson_1983.jpg",
    color: "#c9a227",
  },
  {
    name: "Мариам Мирзахани",
    years: "1977 — 2017",
    yearStart: 1977,
    achievement:
      "Первая женщина, получившая медаль Филдса — высшую награду в математике (2014). Открыла новые горизонты в геометрии поверхностей и динамических системах.",
    historicalContext:
      "Выросла в Иране во время последствий Исламской революции, где доступ женщин к высшему образованию был ограничен. Добилась успеха вопреки системе.",
    contextType: "political",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Maryam_Mirzakhani_%28cropped%29.jpg/440px-Maryam_Mirzakhani_%28cropped%29.jpg",
    color: "#9b59b6",
  },
];

const Index = () => {
  return (
    <main className="relative min-h-screen bg-[#0d0a1a]">
      <ArcGalleryHero
        mathematicians={mathematicians}
        startAngle={20}
        endAngle={160}
        radiusLg={480}
        radiusMd={360}
        radiusSm={260}
        cardSizeLg={130}
        cardSizeMd={105}
        cardSizeSm={80}
        className="pt-10 pb-16"
      />
    </main>
  );
};

export default Index;