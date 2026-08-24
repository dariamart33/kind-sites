"use client";

import { useStackCarousel } from "./useStackCarousel";

const benefits = [
  {
    title: "Не шаблон",
    text: "Каждый проект начинается с вашей задачи и собирается вокруг неё — от структуры до последней детали.",
    result: "Сайт выглядит как ваш бренд, а не как ещё одна готовая тема.",
    artwork: "/benefit-chrome-custom.webp",
  },
  {
    title: "Один контакт",
    text: "Вам не нужно координировать дизайнера, разработчика и редактора: весь путь ведёт одна команда.",
    result: "Вы всегда знаете, кому написать и какой шаг будет следующим.",
    artwork: "/benefit-chrome-contact.webp",
  },
  {
    title: "Без пропасти",
    text: "Показываем промежуточный результат, объясняем решения и не исчезаем до даты сдачи.",
    result: "Проект остаётся понятным и управляемым на каждом этапе.",
    artwork: "/benefit-chrome-process.webp",
  },
  {
    title: "Помощь с текстом",
    text: "Не ждём идеальных материалов: задаём вопросы, собираем смысл и помогаем сказать главное.",
    result: "Страница говорит ясно, живо и без канцелярита.",
    artwork: "/benefit-chrome-copy.webp",
  },
  {
    title: "Можно расти",
    text: "Закладываем аккуратную основу, которую можно развивать без полной пересборки проекта.",
    result: "Новые страницы и функции добавляются по мере роста бизнеса.",
    artwork: "/benefit-chrome-growth.webp",
  },
  {
    title: "Готово к запуску",
    text: "Проверяем мобильную версию, формы, ссылки, аналитику и подключаем ваш домен.",
    result: "Вы получаете не макет, а опубликованный работающий сайт.",
    artwork: "/benefit-chrome-launch.webp",
  },
];

export function BenefitsCarousel() {
  const {
    activeIndex,
    cardPosition,
    finishPointer,
    handleKeyDown,
    handlePointerDown,
    handlePointerMove,
    isDragging,
    stageStyle,
  } = useStackCarousel(benefits.length);

  return (
    <section className="benefits-showcase reveal" aria-labelledby="benefits-title">
      <div className="benefits-header shell">
        <div>
          <p className="kicker soft-pill">Наши преимущества</p>
          <h2 id="benefits-title">Почему стоит<br />выбрать <em>KIND SITES?</em></h2>
        </div>
      </div>

      <div
        className={`benefits-stage${isDragging ? " is-dragging" : ""}`}
        style={stageStyle}
        role="slider"
        tabIndex={0}
        aria-orientation="horizontal"
        aria-valuemin={1}
        aria-valuemax={benefits.length}
        aria-valuenow={activeIndex + 1}
        aria-valuetext={benefits[activeIndex].title}
        aria-label="Преимущества KIND SITES. Проведите влево или вправо, чтобы листать карточки."
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointer}
        onPointerCancel={(event) => finishPointer(event, true)}
        onKeyDown={handleKeyDown}
      >
        {benefits.map((benefit, index) => {
          const position = cardPosition(index);
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
                <img src={benefit.artwork} alt="" />
              </div>
            </article>
          );
        })}
      </div>

      <p className="benefits-status" aria-live="polite">{benefits[activeIndex].title}, {activeIndex + 1} из {benefits.length}</p>
    </section>
  );
}
