"use client";

import {
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type Direction = "next" | "previous";
type CardPosition = "far-previous" | "previous" | "active" | "next" | "far-next" | "hidden";

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
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const timerRef = useRef<number | null>(null);
  const dragStartRef = useRef<number | null>(null);
  const pointerIdRef = useRef<number | null>(null);

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

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (movement !== null) return;

    dragStartRef.current = event.clientX;
    pointerIdRef.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId || dragStartRef.current === null) return;

    const distance = event.clientX - dragStartRef.current;
    setDragOffset(Math.max(-120, Math.min(120, distance)));
  };

  const finishPointer = (event: ReactPointerEvent<HTMLDivElement>, cancelled = false) => {
    if (pointerIdRef.current !== event.pointerId || dragStartRef.current === null) return;

    const distance = event.clientX - dragStartRef.current;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragStartRef.current = null;
    pointerIdRef.current = null;
    setIsDragging(false);
    setDragOffset(0);

    if (!cancelled && Math.abs(distance) >= 48) {
      move(distance < 0 ? "next" : "previous");
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move("previous");
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move("next");
    }
  };

  const stageStyle = {
    "--benefits-drag": `${dragOffset}px`,
  } as CSSProperties;

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
