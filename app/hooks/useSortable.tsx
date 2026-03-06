import { useEffect } from 'react';
import Sortable from '~/utils/sortable-adapter';

export const useSortable = (selector: string, data?: any) => {
  useEffect(() => {
    const element = document.querySelector(selector);

    let sortable: any = null;

    if (element) {
      sortable = new Sortable(element as HTMLElement, {
        draggable: "tr",
        handle: "tr",
        animation: 150,
        forceFallback: true,
        fallbackOnBody: true,
        fallbackTolerance: 2,

        setData: function (dataTransfer:any, dragEl: any) {
          dataTransfer.setData('Text', dragEl.textContent || '');
          dragEl.classList.add('dragging-row');
          document.body.style.cursor = 'grabbing';
        },

        onStart: function (evt:any) {
          if (!evt?.item) return;
          const rect = evt.item.getBoundingClientRect();
          evt.item.style.width = `${rect.width}px`;
          evt.item.style.height = `${rect.height}px`;
        },

        onEnd: function (evt:any) {
          if (!evt?.item) return;
          evt.item.classList.remove('dragging-row');
          document.body.style.cursor = '';
        },

        onMove: function () {
          return true; // tu peux ajouter une logique conditionnelle ici
        }
      });
    }

    return () => {
      if (sortable) {
        sortable.destroy();
        sortable = null;
      }
    };
  },[]);
};
