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

function basePosition(index: number, activeIndex: number, itemCount: number): CardPosition {
  const offset = (index - activeIndex + itemCount) % itemCount;

  if (offset === 0) return "active";
  if (offset === 1) return "next";
  if (offset === 2) return "far-next";
  if (offset === itemCount - 1) return "previous";
  if (offset === itemCount - 2) return "far-previous";
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

export function useStackCarousel(itemCount: number) {
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
          ? (current + 1) % itemCount
          : (current - 1 + itemCount) % itemCount
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

  return {
    activeIndex,
    cardPosition: (index: number) => movingPosition(basePosition(index, activeIndex, itemCount), movement),
    finishPointer,
    handleKeyDown,
    handlePointerDown,
    handlePointerMove,
    isDragging,
    stageStyle,
  };
}
