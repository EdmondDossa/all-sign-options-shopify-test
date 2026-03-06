type SortableEventLike = {
  item?: HTMLElement | null;
  oldIndex?: number;
  newIndex?: number;
};

type SortableOptions = {
  draggable?: string;
  handle?: string;
  animation?: number;
  chosenClass?: string;
  ghostClass?: string;
  group?: string;
  filter?: string;
  setData?: (dataTransfer: DataTransfer, dragEl: HTMLElement) => void;
  onStart?: (event: SortableEventLike & Record<string, unknown>) => void;
  onEnd?: (event: SortableEventLike & Record<string, unknown>) => void;
  onMove?: (event: SortableEventLike & Record<string, unknown>) => boolean;
  [key: string]: unknown;
};

type Listener = (event: any) => void;

export default class Sortable {
  private readonly container: HTMLElement;
  private readonly options: SortableOptions;
  private instance: any = null;
  private readonly listeners: Record<string, Listener>;
  private destroyed = false;

  constructor(container: HTMLElement, options: SortableOptions = {}) {
    this.container = container;
    this.options = options;
    this.listeners = {};
    void this.init();
  }

  static create(container: HTMLElement, options: SortableOptions = {}) {
    return new Sortable(container, options);
  }

  toArray() {
    const selector = this.options.draggable || "[data-id]";
    return Array.from(this.container.querySelectorAll(selector))
      .map((node) => (node as HTMLElement).getAttribute("data-id"))
      .filter((id): id is string => Boolean(id));
  }

  destroy() {
    this.destroyed = true;
    if (!this.instance) return;
    Object.entries(this.listeners).forEach(([name, listener]) => {
      this.instance.off(name as any, listener as any);
    });
    this.instance.destroy();
    this.instance = null;
  }

  private async init() {
    if (typeof window === "undefined") return;
    const module = await import("@shopify/draggable");
    if (this.destroyed) return;

    this.instance = new module.Sortable(this.container, {
      draggable: this.options.draggable || "tr",
      handle: this.options.handle,
    });

    this.attachListeners();
  }

  private attachListeners() {
    if (!this.instance) return;
    this.listeners["sortable:start"] = (event: any) => {
      const source = (event as any)?.dragEvent?.source as HTMLElement | undefined;
      if (source && this.options.chosenClass) {
        source.classList.add(this.options.chosenClass);
      }

      if (source && this.options.setData && event?.dragEvent?.dataTransfer) {
        this.options.setData(event.dragEvent.dataTransfer, source);
      }

      this.options.onStart?.({
        ...event,
        item: source || null,
        oldIndex: Number.isFinite(event?.startIndex) ? event.startIndex : -1,
      });
    };

    this.listeners["sortable:sort"] = (event: any) => {
      if (!this.options.onMove) return;
      this.options.onMove({
        ...event,
        item: (event as any)?.dragEvent?.source || null,
        oldIndex: Number.isFinite(event?.oldIndex) ? event.oldIndex : -1,
        newIndex: Number.isFinite(event?.newIndex) ? event.newIndex : -1,
      });
    };

    this.listeners["sortable:stop"] = (event: any) => {
      const source = (event as any)?.dragEvent?.source as HTMLElement | undefined;
      if (source && this.options.chosenClass) {
        source.classList.remove(this.options.chosenClass);
      }

      this.options.onEnd?.({
        ...event,
        item: source || null,
        oldIndex: Number.isFinite(event?.oldIndex) ? event.oldIndex : -1,
        newIndex: Number.isFinite(event?.newIndex) ? event.newIndex : -1,
      });
    };

    Object.entries(this.listeners).forEach(([name, listener]) => {
      this.instance.on(name as any, listener as any);
    });
  }
}
