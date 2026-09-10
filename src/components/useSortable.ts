"use client";

import { useEffect, type RefObject } from "react";
import Sortable from "sortablejs";

/** products/categories blade dosyalarındaki SortableJS yapılandırmasının karşılığı. */
export function useSortable(
  ref: RefObject<HTMLElement | null>,
  handle: string,
  onEnd: (orderedIds: string[]) => void,
  itemSelector: string,
  dataAttribute: string,
  enabled = true
) {
  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    const sortable = Sortable.create(element, {
      handle,
      animation: 150,
      ghostClass: "sortable-ghost",
      chosenClass: "sortable-chosen",
      dragClass: "sortable-drag",
      onEnd: () => {
        const ids = Array.from(
          element.querySelectorAll<HTMLElement>(itemSelector)
        ).map((item) => item.dataset[dataAttribute] ?? "");
        onEnd(ids.filter(Boolean));
      },
    });

    return () => sortable.destroy();
  }, [ref, handle, onEnd, itemSelector, dataAttribute, enabled]);
}
