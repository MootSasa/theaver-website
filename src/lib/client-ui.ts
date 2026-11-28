// Shared top-layer dialog transitions, light-dismiss fallback, and accessible Invoker copy controls.

let supportsDisplayTransition: boolean | undefined;

export function canTransitionDisplay(): boolean {
  if (supportsDisplayTransition !== undefined) return supportsDisplayTransition;
  if (!window.CSS?.supports?.('transition-behavior', 'allow-discrete') || !document.body) {
    supportsDisplayTransition = false;
    return false;
  }
  const probe = document.createElement('div');
  probe.style.cssText = 'transition: display 1s allow-discrete !important; display: block;';
  document.body.appendChild(probe);
  getComputedStyle(probe).display;
  probe.style.display = 'none';
  supportsDisplayTransition = getComputedStyle(probe).display === 'block';
  probe.remove();
  return supportsDisplayTransition;
}

export function supportsTopLayerExit(): boolean {
  return Boolean(window.CSS?.supports?.('overlay', 'auto')) && canTransitionDisplay();
}

export async function closeTopLayer(element: HTMLDialogElement): Promise<void> {
  if (!element.open) return;
  if (!supportsTopLayerExit()) {
    element.setAttribute('data-closing', '');
    const animations = element.getAnimations({ subtree: true });
    if (animations.length > 0) {
      await Promise.race([
        Promise.allSettled(animations.map((a) => a.finished)),
        new Promise<void>((resolve) => setTimeout(resolve, 600)),
      ]);
    }
    if (!element.hasAttribute('data-closing')) return;
    element.removeAttribute('data-closing');
  }
  element.close();
}

export function wireDialogDismiss(dialog: HTMLDialogElement): void {
  if (dialog.dataset.theaverDialogWired === '1') return;
  dialog.dataset.theaverDialogWired = '1';

  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    void closeTopLayer(dialog);
  });

  if (!('closedBy' in HTMLDialogElement.prototype)) {
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const inside =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!inside) {
        void closeTopLayer(dialog);
      }
    });
  }
}

const copyTimers = new WeakMap<HTMLElement, number>();
let lastCopyAnnouncement = '';

function legacyCopyText(text: string): boolean {
  const previousFocus = document.activeElement as HTMLElement | null;
  const field = Object.assign(document.createElement('textarea'), { value: text });
  field.setAttribute('readonly', '');
  field.style.cssText = 'position:fixed;inset-block-start:0;opacity:0';
  document.body.append(field);
  field.select();
  try {
    return (document as unknown as { execCommand: (cmd: string) => boolean }).execCommand('copy');
  } catch {
    return false;
  } finally {
    field.remove();
    previousFocus?.focus?.({ preventScroll: true });
  }
}

function reportCopyState(button: HTMLElement, ok: boolean): void {
  const tip = button.nextElementSibling as HTMLElement | null;
  const prevTimer = copyTimers.get(button);
  if (prevTimer) window.clearTimeout(prevTimer);

  button.removeAttribute('data-copied');
  button.removeAttribute('data-failed');

  const isRu = document.documentElement.lang === 'ru';
  let message = ok
    ? button.getAttribute('data-copied-label') || (isRu ? 'Скопировано' : 'Copied')
    : button.getAttribute('data-failed-label') || (isRu ? 'Ошибка копирования' : 'Copy failed');

  if (message === lastCopyAnnouncement) {
    message += '\u00A0';
  }
  lastCopyAnnouncement = message;

  if (tip) tip.textContent = '';
  void button.offsetWidth;
  button.setAttribute(ok ? 'data-copied' : 'data-failed', '');
  if (tip) {
    requestAnimationFrame(() => {
      tip.textContent = message;
    });
  }

  const timerId = window.setTimeout(() => {
    button.removeAttribute('data-copied');
    button.removeAttribute('data-failed');
    if (tip) tip.textContent = '';
  }, 2000);
  copyTimers.set(button, timerId);
}

export async function performCopy(button: HTMLElement, target: Element): Promise<void> {
  const rawOverride = button.getAttribute('data-copy-value');
  const text = rawOverride
    ? rawOverride
    : target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement
      ? target.value
      : (target instanceof HTMLElement ? target.innerText : target.textContent || '').trim();
  if (!text) return;

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else if (!legacyCopyText(text)) {
      throw new Error('Clipboard unavailable');
    }
    reportCopyState(button, true);
  } catch {
    if (legacyCopyText(text)) {
      reportCopyState(button, true);
    } else {
      reportCopyState(button, false);
    }
  }
}

declare global {
  interface Window {
    __theaverCloseTopLayer?: (el: HTMLDialogElement) => Promise<void>;
    __theaverWireDialog?: (el: HTMLDialogElement) => void;
    __theaverCopyValue?: (btn: HTMLElement, value: string) => Promise<void>;
  }
}

export function initClientUI(): void {
  window.__theaverCloseTopLayer = closeTopLayer;
  window.__theaverWireDialog = wireDialogDismiss;
  window.__theaverCopyValue = async (btn: HTMLElement, value: string) => {
    btn.setAttribute('data-copy-value', value);
    await performCopy(btn, btn);
  };

  document.querySelectorAll('dialog.top-layer-dialog').forEach((dlg) => {
    if (dlg instanceof HTMLDialogElement) wireDialogDismiss(dlg);
  });

  if ('CommandEvent' in window) {
    document.addEventListener(
      'command',
      (rawEvent) => {
        const ev = rawEvent as Event & { command?: string; source?: HTMLElement; target?: Element };
        if (ev.command === '--copy' && ev.source && ev.target) {
          void performCopy(ev.source, ev.target);
        }
      },
      true,
    );
  } else {
    document.addEventListener('click', (event) => {
      if (event.defaultPrevented) return;
      const el = event.target instanceof Element ? event.target : null;
      const button = el?.closest('button[command="--copy"]') as HTMLElement | null;
      if (!button) return;
      const targetId = button.getAttribute('commandfor');
      const target = targetId ? document.getElementById(targetId) : button;
      if (target) void performCopy(button, target);
    });
  }
}
