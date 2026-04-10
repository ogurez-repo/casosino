export type ActivityKind = "похавать" | "досуг" | "активный досуг";

export type ActivityOption = {
  kind: ActivityKind;
  title: string;
  description: string;
  icon: string;
  mapsUrl?: string;
};

export const options: ActivityOption[] = [
  {
    kind: "похавать",
    title: "Дом Флоу",
    description:
      "Кофейня, лучше бронировать места заранее (за день или за несколько часов).",
    icon: "☕",
    mapsUrl: "https://yandex.ru/maps/?text=Дом%20Флоу%20Санкт-Петербург&sll=30.365647,59.931959&z=13",
  },
  {
    kind: "похавать",
    title: "PioNero",
    description:
      "Итальянский ресторан на Пионерской, витто тоннелло особенно хвалят.",
    icon: "🍝",
    mapsUrl: "https://yandex.ru/maps/?text=PioNero%20Пионерская%20Санкт-Петербург&sll=30.365647,59.931959&z=13",
  },
  {
    kind: "похавать",
    title: "Ginza",
    description: "Суши-ресторан в центре, рядом с Зингером.",
    icon: "🍣",
    mapsUrl: "https://yandex.ru/maps/?text=Ginza%20Санкт-Петербург&sll=30.365647,59.931959&z=13",
  },
  {
    kind: "похавать",
    title: "La Piada",
    description: "Домашний итальянский ресторан.",
    icon: "🍕",
    mapsUrl: "https://yandex.ru/maps/?text=La%20Piada%20Санкт-Петербург&sll=30.365647,59.931959&z=13",
  },
  {
    kind: "похавать",
    title: "Frank by Basta",
    description: "Яркое мясное место с насыщенным меню.",
    icon: "🥩",
    mapsUrl: "https://yandex.ru/maps/?text=Frank%20by%20Basta%20Санкт-Петербург&sll=30.365647,59.931959&z=13",
  },
  {
    kind: "похавать",
    title: "BolsheCoffee Roasters",
    description: "Хипстерская кофейня на Маяковской.",
    icon: "🫘",
    mapsUrl: "https://yandex.ru/maps/?text=BolsheCoffee%20Roasters%20Маяковская%20Санкт-Петербург&sll=30.365647,59.931959&z=13",
  },
  {
    kind: "досуг",
    title: "Театр кукол",
    description: "Спектакль для взрослых: «Кафе Русалка».",
    icon: "🎭",
    mapsUrl: "https://teatrskazki.spb.ru/repertuar/868.html",
  },
  {
    kind: "досуг",
    title: "Мираж на Большом",
    description: "Можно сходить на все понравившееся из афиши.",
    icon: "🎬",
    mapsUrl: "https://yandex.ru/maps/?text=Мираж%20на%20Большом%20театр%20Санкт-Петербург&sll=30.365647,59.931959&z=13",
  },
  {
    kind: "досуг",
    title: "КАРО 11 Black",
    description: "можно сходить на все понравившееся из афиши.",
    icon: "🍿",
    mapsUrl: "https://yandex.ru/maps/?text=КАРО%2011%20Black%20Санкт-Петербург&sll=30.365647,59.931959&z=13",
  },
  {
    kind: "досуг",
    title: "Ботанический сад Петра",
    description: "Спокойная прогулка и зелень и пенсия",
    icon: "🌿",
    mapsUrl: "https://yandex.ru/maps/?text=Ботанический%20сад%20Петра%20Санкт-Петербург&sll=30.365647,59.931959&z=13",
  },
  {
    kind: "досуг",
    title: "Зоопарк на Горьковской",
    description: "Классика посмотреть на реальных животных а не на ежедневных",
    icon: "🦁",
    mapsUrl: "https://yandex.ru/maps/?text=Зоопарк%20Горьковская%20Санкт-Петербург&sll=30.365647,59.931959&z=13",
  },
  {
    kind: "досуг",
    title: "Гончарная мастерская «База»",
    description: "поглиномесить",
    icon: "🏺",
    mapsUrl: "https://yandex.com/maps/2/saint-petersburg/search/гончарная%20мастерская/?ll=30.364798%2C59.983024&sll=30.402381%2C59.953799&sspn=0.480652%2C0.143952&z=12",
  },
  {
    kind: "досуг",
    title: "Кофейный каппинг",
    description: "насколько я понял что-то типа сам приходишь пробуешь варить",
    icon: "🧪",
    mapsUrl: "https://yandex.ru/maps/?text=Кофейный%20каппинг%20Санкт-Петербург&sll=30.365647,59.931959&z=13",
  },
  {
    kind: "активный досуг",
    title: "Велосипеды в прокат",
    description: "ну тут пояснения излишне по погоде только надо подобрать",
    icon: "🚲",
    mapsUrl: "https://yandex.ru/maps/?text=Прокат%20велосипедов%20Санкт-Петербург&sll=30.365647,59.931959&z=13",
  },
  {
    kind: "активный досуг",
    title: "Бильярд «Сукно»",
    description: "шары погонять",
    icon: "🎱",
    mapsUrl: "https://yandex.ru/maps/?text=Бильярд%20Сукно%20Васильевский%20остров%20Санкт-Петербург&sll=30.365647,59.931959&z=13",
  },
  {
    kind: "активный досуг",
    title: "YogaSpace",
    description: "для прикола чисто вайб",
    icon: "🧘",
    mapsUrl: "https://yandex.ru/maps/?text=YogaSpace%20Чернышевская%20Санкт-Петербург&sll=30.365647,59.931959&z=13",
  },
  {
    kind: "активный досуг",
    title: "Трамонтана",
    description: "по карьерной лестнице",
    icon: "🧗",
    mapsUrl: "https://yandex.ru/maps/?text=Трамонтана%20скалолазание%20Технологический%20институт%20Санкт-Петербург&sll=30.365647,59.931959&z=13",
  },
  {
    kind: "активный досуг",
    title: "PrimoKarting",
    description: "на бибике я гоню быстро не подьедешь близко",
    icon: "🏎️",
    mapsUrl: "https://yandex.ru/maps/?text=PrimoKarting%20Санкт-Петербург&sll=30.365647,59.931959&z=13",
  },
  {
    kind: "активный досуг",
    title: "Эндуро у Изумрудного озера",
    description: "Доступно только после получения мной прав (начало мая +-)",
    icon: "🏍️",
    mapsUrl: "https://yandex.ru/maps/?text=Эндуро%20Изумрудное%20озеро%20Санкт-Петербург&sll=30.365647,59.931959&z=13",
  },
];

export const activityKinds: ActivityKind[] = [
  "похавать",
  "досуг",
  "активный досуг",
];
