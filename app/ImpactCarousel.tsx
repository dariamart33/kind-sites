"use client";

import { useEffect, useRef, useState } from "react";

type Direction = "next" | "previous";

type ImpactSlide = {
  tags: string[];
  title: string;
  challenge: string;
  solution: string;
  quote: string;
  metrics: Array<{ value: string; label: string }>;
};

const impactSlides: ImpactSlide[] = [
  {
    tags: ["Процесс", "Коммуникация", "Запуск"],
    title: "Одна команда → от идеи до запуска",
    challenge: "Собрать структуру, текст, дизайн и разработку в один понятный маршрут без потери контекста между исполнителями.",
    solution: "Ведём проект последовательно: знакомимся, собираем основу, находим визуальный образ, разрабатываем и вместе публикуем сайт.",
    quote: "Вы всегда понимаете, кому написать, что уже готово и какой шаг будет следующим.",
    metrics: [
      { value: "01", label: "контакт на всём пути проекта" },
      { value: "05", label: "понятных этапов от знакомства до публикации" },
      { value: "100%", label: "прозрачность статуса и следующего шага" },
    ],
  },
  {
    tags: ["Телефон", "Планшет", "Компьютер"],
    title: "Один сайт → удобно на каждом экране",
    challenge: "Сохранить характер дизайна и понятный сценарий, когда экран становится заметно уже или шире.",
    solution: "Пересобираем сетку, типографику и интерактив для ключевых размеров, затем проверяем основные действия перед запуском.",
    quote: "Красивый первый экран важен, но удобство должно сохраняться на всём сайте и на любом устройстве.",
    metrics: [
      { value: "100%", label: "проектов адаптируем для мобильных устройств" },
      { value: "03", label: "ключевых формата экрана проверяем вручную" },
      { value: "0", label: "неудобных горизонтальных прокруток" },
    ],
  },
  {
    tags: ["Смета", "Этапы", "Согласование"],
    title: "Понятная смета → без сюрпризов после старта",
    challenge: "Заранее понять объём, стоимость и границы проекта, не получая неожиданные доплаты в процессе.",
    solution: "Фиксируем состав работ до старта. Новые пожелания сначала обсуждаем и оцениваем, а только потом добавляем в проект.",
    quote: "Всё нестандартное считаем отдельно и согласовываем до начала работ.",
    metrics: [
      { value: "0", label: "скрытых платежей после согласования сметы" },
      { value: "01", label: "зафиксированный объём работ на старте" },
      { value: "100%", label: "дополнений сначала обсуждаем с вами" },
    ],
  },
  {
    tags: ["Лендинг", "Под ключ", "Публикация"],
    title: "Компактный лендинг → от 7 дней",
    challenge: "Быстро запустить аккуратную страницу, не пропустив структуру, мобильную версию и техническую проверку.",
    solution: "Собираем смысловой каркас, дизайн и разработку в короткий цикл, подключаем домен и передаём уже опубликованный сайт.",
    quote: "Передаём не макет, а готовый сайт, который можно открыть по своему адресу.",
    metrics: [
      { value: "7+", label: "дней — срок разработки компактного лендинга" },
      { value: "05", label: "этапов от знакомства до запуска" },
      { value: "01", label: "готовый опубликованный сайт вместо макета" },
    ],
  },
];

function SlideContent({ slide, state, direction }: { slide: ImpactSlide; state: "entering" | "leaving"; direction: Direction }) {
  return (
    <div className={`impact-slide is-${state} is-${direction}`} aria-hidden={state === "leaving"}>
      <aside className="impact-metrics" aria-label="Показатели">
        {slide.metrics.map((metric) => (
          <div className="impact-metric" key={`${metric.value}-${metric.label}`}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </aside>

      <div className="impact-sheet-stack" aria-hidden="true"><span /><span /></div>

      <article className="impact-sheet">
        <div className="impact-tags">{slide.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <h2>{slide.title}</h2>
        <div className="impact-copy-block"><b>Задача:</b><p>{slide.challenge}</p></div>
        <div className="impact-copy-block"><b>Как работаем:</b><p>{slide.solution}</p></div>
      </article>

      <blockquote className="impact-quote">
        <span aria-hidden="true">“</span>
        <p>{slide.quote}</p>
      </blockquote>
    </div>
  );
}

export function ImpactCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<Direction>("next");
  const timerRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  }, []);

  const changeSlide = (step: -1 | 1) => {
    if (leavingIndex !== null) return;

    setDirection(step === 1 ? "next" : "previous");
    setLeavingIndex(activeIndex);
    setActiveIndex((current) => (current + step + impactSlides.length) % impactSlides.length);
    timerRef.current = window.setTimeout(() => setLeavingIndex(null), 720);
  };

  return (
    <section className="impact-showcase" aria-label="Кейсы KIND SITES">
      <div className="impact-glow" aria-hidden="true" />
      <div className="impact-carousel shell">
        <div className="impact-viewport" aria-live="polite">
          {leavingIndex !== null && (
            <SlideContent slide={impactSlides[leavingIndex]} state="leaving" direction={direction} />
          )}
          <SlideContent key={activeIndex} slide={impactSlides[activeIndex]} state="entering" direction={direction} />

          <div className="impact-envelope" aria-hidden="true">
            <div className="envelope-left" />
            <div className="envelope-right" />
            <div className="envelope-center" />
          </div>

          <div className="impact-controls">
            <button type="button" onClick={() => changeSlide(-1)} aria-label="Предыдущий кейс">←</button>
            <button type="button" onClick={() => changeSlide(1)} aria-label="Следующий кейс">→</button>
          </div>
        </div>
        <p className="impact-progress" aria-hidden="true">0{activeIndex + 1} / 0{impactSlides.length}</p>
      </div>
    </section>
  );
}
