'use client';

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type SelectHTMLAttributes,
} from 'react';

/** 의존성 없는 최소 className 결합기. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/* ---------------------------------- Button --------------------------------- */

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'destructive';

const BUTTON_VARIANT: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground hover:opacity-90',
  outline: 'border border-border bg-background hover:bg-muted',
  ghost: 'hover:bg-muted',
  destructive: 'bg-destructive text-white hover:opacity-90',
};

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
        BUTTON_VARIANT[variant],
        className,
      )}
      {...props}
    />
  );
}

/* ---------------------------------- Input ---------------------------------- */

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'min-h-[72px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'h-9 w-full rounded-md border border-input bg-background px-2 text-sm outline-none focus:ring-2 focus:ring-ring disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

/* ---------------------------------- Field ---------------------------------- */

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn('flex flex-col gap-1', className)}>
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      {children}
      {hint ? <span className="text-sm text-muted-foreground">{hint}</span> : null}
    </label>
  );
}

/* ----------------------------------- Card ---------------------------------- */

export function Card({
  title,
  description,
  dirty,
  actions,
  children,
}: {
  title: string;
  description?: string;
  dirty?: boolean;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        'rounded-xl border bg-card p-4 shadow-sm sm:p-5',
        dirty ? 'border-amber-400 ring-1 ring-amber-400/40' : 'border-border',
      )}
    >
      <header className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-foreground">{title}</h2>
            {dirty ? (
              <Badge tone="warn">수정됨</Badge>
            ) : null}
          </div>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </header>
      {children}
    </section>
  );
}

/* ---------------------------------- Badge ---------------------------------- */

const BADGE_TONE = {
  neutral: 'bg-muted text-muted-foreground',
  warn: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  success: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
} as const;

export function Badge({
  tone = 'neutral',
  className,
  children,
}: {
  tone?: keyof typeof BADGE_TONE;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-sm font-medium',
        BADGE_TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------- ConfirmModal ------------------------------ */

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = '삭제',
  onConfirm,
  onCancel,
  pending,
}: {
  open: boolean;
  title: string;
  message: ReactNode;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  pending?: boolean;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-xl border border-border bg-card p-5 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <div className="mt-2 text-sm text-muted-foreground">{message}</div>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel} disabled={pending}>
            취소
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={pending}>
            {pending ? '처리 중…' : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- Toast ---------------------------------- */

type ToastTone = 'success' | 'error' | 'info';
interface ToastItem {
  id: number;
  tone: ToastTone;
  message: string;
}

const ToastContext = createContext<((tone: ToastTone, message: string) => void) | null>(
  null,
);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
}

const TOAST_TONE: Record<ToastTone, string> = {
  success: 'border-green-500/50 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100',
  error: 'border-red-500/50 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100',
  info: 'border-blue-500/50 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-100',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const push = useCallback((tone: ToastTone, message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, tone, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'pointer-events-auto rounded-lg border px-4 py-2 text-sm shadow-md',
              TOAST_TONE[t.tone],
            )}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
