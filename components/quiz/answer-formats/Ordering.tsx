"use client";

import { useState, useCallback } from "react";

interface OrderingProps {
  items: { id: string; label: string }[];
  correctOrder: string[];
  answered: boolean;
  onSubmit: (orderedIds: string[]) => void;
}

export function Ordering({ items, correctOrder, answered, onSubmit }: OrderingProps) {
  const [orderedItems, setOrderedItems] = useState(() =>
    [...items].sort(() => Math.random() - 0.5),
  );
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const moveItem = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (answered) return;
      setOrderedItems((prev) => {
        const next = [...prev];
        const [moved] = next.splice(fromIndex, 1);
        next.splice(toIndex, 0, moved);
        return next;
      });
    },
    [answered],
  );

  const handleSubmit = () => {
    onSubmit(orderedItems.map((item) => item.id));
  };

  const getItemStatus = (item: { id: string }, index: number) => {
    if (!answered) return "";
    return correctOrder[index] === item.id ? "correct" : "wrong";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <p style={{ fontSize: 11, color: "var(--sumi-light)", margin: 0 }}>
        Drag to reorder, then submit
      </p>

      {orderedItems.map((item, index) => {
        const status = getItemStatus(item, index);
        return (
          <div
            key={item.id}
            draggable={!answered}
            onDragStart={() => setDragIndex(index)}
            onDragOver={(e) => {
              e.preventDefault();
              if (dragIndex !== null && dragIndex !== index) {
                moveItem(dragIndex, index);
                setDragIndex(index);
              }
            }}
            onDragEnd={() => setDragIndex(null)}
            className={`quiz-option ${status}`}
            style={{
              cursor: answered ? "default" : "grab",
              opacity: dragIndex === index ? 0.5 : 1,
            }}
          >
            <span
              className="option-letter"
              style={{
                background:
                  status === "correct"
                    ? "var(--moegi-light)"
                    : status === "wrong"
                      ? "var(--beni-light)"
                      : undefined,
              }}
            >
              {index + 1}
            </span>
            <span style={{ flex: 1 }}>{item.label}</span>
            {answered && status === "correct" && (
              <span style={{ color: "var(--moegi)", fontSize: 12 }}>&#10003;</span>
            )}
            {answered && status === "wrong" && (
              <span style={{ color: "var(--beni)", fontSize: 10 }}>
                should be #{correctOrder.indexOf(item.id) + 1}
              </span>
            )}
          </div>
        );
      })}

      {!answered && (
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          style={{ width: "100%", padding: "10px", fontSize: 13 }}
        >
          Submit Order
        </button>
      )}
    </div>
  );
}
