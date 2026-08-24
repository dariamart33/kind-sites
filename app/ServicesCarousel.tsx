"use client";

import { useStackCarousel } from "./useStackCarousel";

const services = [
  {
    title: "Структура и смыслы",
    text: "Собираем логику страницы и помогаем сформулировать главное без канцелярита.",
    artwork: "/service-structure-v1.webp",
  },
  {
    title: "Дизайн с характером",
    text: "Создаём визуальный язык под ваш бренд, а не подгоняем бизнес под готовый шаблон.",
    artwork: "/service-design-v1.webp",
  },
  {
    title: "Разработка",
    text: "Собираем быстрый адаптивный сайт, который одинаково хорошо работает на телефоне и компьютере.",
    artwork: "/service-development-v1.webp",
    hasMatrix: true,
  },
  {
    title: "Анимация",
    text: "Добавляем движение там, где оно усиливает историю и помогает вести взгляд пользователя.",
    artwork: "/service-animation-v1.webp",
  },
  {
    title: "Запуск",
    text: "Подключаем домен, формы и аналитику, проверяем основные сценарии перед публикацией.",
    artwork: "/service-launch-v1.webp",
  },
  {
    title: "Поддержка",
    text: "После запуска остаёмся рядом: объясняем, как всё устроено, и помогаем с обновлениями.",
    artwork: "/service-support-v1.webp",
  },
];

const matrixColumns = [
  "K\n8\n1\nD\n4\n0\nX\n7\n2",
  "3\nA\n9\nM\n6\n2\nB\n0\n5",
  "R\n1\n7\n4\nZ\n8\n3\nQ\n6",
  "5\nN\n0\n2\nK\n9\nA\n4\n7",
  "B\n6\n3\nX\n1\n8\nR\n5\n0",
  "2\nQ\n7\nM\n4\n9\nD\n1\n6",
];

export function ServicesCarousel() {
  const {
    activeIndex,
    cardPosition,
    finishPointer,
    handleKeyDown,
    handlePointerDown,
    handlePointerMove,
    isDragging,
    stageStyle,
  } = useStackCarousel(services.length);

  return (
    <section className="services-showcase reveal" id="services" aria-labelledby="services-title">
      <div className="services-header split-heading shell">
        <div>
          <p className="kicker soft-pill">Что мы делаем</p>
          <h2 id="services-title">Собираем сайт<br /><em>целиком.</em></h2>
        </div>
        <p>От первой мысли и текста до домена, аналитики и кнопки «опубликовать».</p>
      </div>

      <div
        className={`benefits-stage services-stage${isDragging ? " is-dragging" : ""}`}
        style={stageStyle}
        role="slider"
        tabIndex={0}
        aria-orientation="horizontal"
        aria-valuemin={1}
        aria-valuemax={services.length}
        aria-valuenow={activeIndex + 1}
        aria-valuetext={services[activeIndex].title}
        aria-label="Направления работы KIND SITES. Проведите влево или вправо, чтобы листать карточки."
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointer}
        onPointerCancel={(event) => finishPointer(event, true)}
        onKeyDown={handleKeyDown}
      >
        {services.map((service, index) => {
          const position = cardPosition(index);
          const isActive = position === "active";

          return (
            <article
              className={`benefit-card service-card is-${position}${service.hasMatrix ? " has-matrix" : ""}`}
              key={service.title}
              aria-hidden={!isActive}
            >
              <div className="benefit-card-copy service-card-copy">
                <span className="benefit-number">0{index + 1} / 06</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>

              <div className="service-artwork" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element -- Static GitHub Pages asset. */}
                <img src={service.artwork} alt="" />
                {service.hasMatrix && (
                  <div className="service-matrix">
                    {matrixColumns.map((column, columnIndex) => (
                      <span key={columnIndex}>{column}</span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <p className="benefits-status" aria-live="polite">{services[activeIndex].title}, {activeIndex + 1} из {services.length}</p>
    </section>
  );
}
