export type ActivityKind = "похавать" | "досуг" | "активный досуг";

export type ActivityOption = {
  kind: ActivityKind;
  title: string;
  description: string;
  icon: string;
};

export const options: ActivityOption[] = [
  {
    kind: "похавать",
    title: "Дом Флоу",
    description:
      "Кофейня, лучше бронировать места заранее (за день или за несколько часов).",
    icon: "☕",
  },
  {
    kind: "похавать",
    title: "PioNero",
    description:
      "Итальянский ресторан на Пионерской, витто тоннелло особенно хвалят.",
    icon: "🍝",
  },
  {
    kind: "похавать",
    title: "Ginza",
    description: "Суши-ресторан в центре, рядом с Зингером.",
    icon: "🍣",
  },
  {
    kind: "похавать",
    title: "La Piada",
    description: "Домашний итальянский ресторан.",
    icon: "🍕",
  },
  {
    kind: "похавать",
    title: "Frank by Basta",
    description: "Яркое мясное место с насыщенным меню.",
    icon: "🥩",
  },
  {
    kind: "похавать",
    title: "BolsheCoffee Roasters",
    description: "Хипстерская кофейня на Маяковской.",
    icon: "🫘",
  },
  {
    kind: "досуг",
    title: "Театр кукол",
    description: "Спектакль для взрослых: «Кафе Русалка».",
    icon: "🎭",
  },
  {
    kind: "досуг",
    title: "Мираж на Большом",
    description: "Можно сходить на «Проект конец света».",
    icon: "🎬",
  },
  {
    kind: "досуг",
    title: "КАРО 11 Black",
    description: "Премиальный зал, хорошо подходит для свидания.",
    icon: "🍿",
  },
  {
    kind: "досуг",
    title: "Ботанический сад Петра",
    description: "Спокойная прогулка и зелень.",
    icon: "🌿",
  },
  {
    kind: "досуг",
    title: "Зоопарк на Горьковской",
    description: "Классический формат прогулки и эмоций.",
    icon: "🦁",
  },
  {
    kind: "досуг",
    title: "Гончарная мастерская «База»",
    description: "Сделать что-то руками вдвоем.",
    icon: "🏺",
  },
  {
    kind: "досуг",
    title: "Кофейный каппинг",
    description: "Если любите кофе и дегустации.",
    icon: "🧪",
  },
  {
    kind: "активный досуг",
    title: "Велосипеды в прокат",
    description: "Прокатиться по городу в своем темпе.",
    icon: "🚲",
  },
  {
    kind: "активный досуг",
    title: "Бильярд «Сукно»",
    description: "Локация на Васильевском острове.",
    icon: "🎱",
  },
  {
    kind: "активный досуг",
    title: "YogaSpace",
    description: "Йога на Чернышевской.",
    icon: "🧘",
  },
  {
    kind: "активный досуг",
    title: "Трамонтана",
    description: "Скалолазание недалеко от Технологического института.",
    icon: "🧗",
  },
  {
    kind: "активный досуг",
    title: "PrimoKarting",
    description: "Картинг для драйва.",
    icon: "🏎️",
  },
  {
    kind: "активный досуг",
    title: "Эндуро у Изумрудного озера",
    description: "Аренда эндуро для активного дня.",
    icon: "🏍️",
  },
];

export const activityKinds: ActivityKind[] = [
  "похавать",
  "досуг",
  "активный досуг",
];
