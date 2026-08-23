"use client";

import { useEffect, useRef, useState } from "react";

type Direction = "next" | "previous";
type CardPosition = "far-previous" | "previous" | "active" | "next" | "far-next" | "hidden";

const benefits = [
  {
    title: "Не шаблон",
    text: "Каждый проект начинается с вашей задачи и собирается вокруг неё — от структуры до последней детали.",
    result: "Сайт выглядит как ваш бренд, а не как ещё одна готовая тема.",
  },
  {
    title: "Один контакт",
    text: "Вам не нужно координировать дизайнера, разработчика и редактора: весь путь ведёт одна команда.",
    result: "Вы всегда знаете, кому написать и какой шаг будет следующим.",
  },
  {
    title: "Без пропасти",
    text: "Показываем промежуточный результат, объясняем решения и не исчезаем до даты сдачи.",
    result: "Проект остаётся понятным и управляемым на каждом этапе.",
  },
  {
    title: "Помощь с текстом",
    text: "Не ждём идеальных материалов: задаём вопросы, собираем смысл и помогаем сказать главное.",
    result: "Страница говорит ясно, живо и без канцелярита.",
  },
  {
    title: "Можно расти",
    text: "Закладываем аккуратную основу, которую можно развивать без полной пересборки проекта.",
    result: "Новые страницы и функции добавляются по мере роста бизнеса.",
  },
  {
    title: "Готово к запуску",
    text: "Проверяем мобильную версию, формы, ссылки, аналитику и подключаем ваш домен.",
    result: "Вы получаете не макет, а опубликованный работающий сайт.",
  },
];

function basePosition(index: number, activeIndex: number): CardPosition {
  const offset = (index - activeIndex + benefits.length) % benefits.length;

  if (offset === 0) return "active";
  if (offset === 1) return "next";
  if (offset === 2) return "far-next";
  if (offset === benefits.length - 1) return "previous";
  if (offset === benefits.length - 2) return "far-previous";
  return "hidden";
}

function movingPosition(position: CardPosition, direction: Direction | null): CardPosition {
  if (direction === "next") {
    const positions: Record<CardPosition, CardPosition> = {
      "far-previous": "hidden",
      previous: "far-previous",
      active: "previous",
      next: "active",
      "far-next": "next",
      hidden: "far-next",
    };
    return positions[position];
  }

  if (direction === "previous") {
    const positions: Record<CardPosition, CardPosition> = {
      "far-previous": "previous",
      previous: "active",
      active: "next",
      next: "far-next",
      "far-next": "hidden",
      hidden: "far-previous",
    };
    return positions[position];
  }

  return position;
}

export function BenefitsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [movement, setMovement] = useState<Direction | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  }, []);

  const move = (direction: Direction) => {
    if (movement !== null) return;

    setMovement(direction);
    timerRef.current = window.setTimeout(() => {
      setActiveIndex((current) => (
        direction === "next"
          ? (current + 1) % benefits.length
          : (current - 1 + benefits.length) % benefits.length
      ));
      setMovement(null);
    }, 760);
  };

  return (
    <section className="benefits-showcase reveal" aria-labelledby="benefits-title">
      <div className="benefits-header shell">
        <div>
          <p className="kicker soft-pill">Наши преимущества</p>
          <h2 id="benefits-title">Почему стоит<br />выбрать <em>KIND SITES?</em></h2>
        </div>

        <div className="benefits-controls" aria-label="Переключение преимуществ">
          <button type="button" onClick={() => move("previous")} disabled={movement !== null} aria-label="Предыдущее преимущество">←</button>
          <button type="button" onClick={() => move("next")} disabled={movement !== null} aria-label="Следующее преимущество">→</button>
        </div>
      </div>

      <div className="benefits-stage">
        {benefits.map((benefit, index) => {
          const position = movingPosition(basePosition(index, activeIndex), movement);
          const isActive = position === "active";

          return (
            <article
              className={`benefit-card is-${position}`}
              key={benefit.title}
              aria-hidden={!isActive}
            >
              <div className="benefit-card-copy">
                <span className="benefit-number">0{index + 1}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
                <div className="benefit-result"><b>Для вас:</b><span>{benefit.result}</span></div>
              </div>

              <div className="benefit-chrome" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element -- Static GitHub Pages asset. */}
                <img src="/ks-chrome-ribbon-v1.webp" alt="" />
              </div>
            </article>
          );
        })}
      </div>

      <p className="benefits-status" aria-live="polite">{benefits[activeIndex].title}, {activeIndex + 1} из {benefits.length}</p>
    </section>
  );
}
