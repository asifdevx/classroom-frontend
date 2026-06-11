import { toast as sonner, type ExternalToast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

type ToastOptions = Omit<ExternalToast, "description">;

interface PromiseMessages<T> {
  loading: string;
  success: string | ((data: T) => string);
  error: string | ((err: unknown) => string);
}

// ─── Base variants ────────────────────────────────────────────────────────────

export const toast = {
  success(message: string, description?: string, opts?: ToastOptions) {
    return sonner.success(message, { description, ...opts });
  },

  error(message: string, description?: string, opts?: ToastOptions) {
    return sonner.error(message, { description, ...opts });
  },

  warning(message: string, description?: string, opts?: ToastOptions) {
    return sonner.warning(message, { description, ...opts });
  },

  info(message: string, description?: string, opts?: ToastOptions) {
    return sonner.info(message, { description, ...opts });
  },

  message(message: string, description?: string, opts?: ToastOptions) {
    return sonner(message, { description, ...opts });
  },

  loading(message: string, opts?: ToastOptions) {
    return sonner.loading(message, opts);
  },

  dismiss(id?: string | number) {
    sonner.dismiss(id);
  },

  // ─── Promise toast ──────────────────────────────────────────────────────────
  // Automatically transitions: loading → success | error
  // Perfect for API calls, mutations, form submissions.
  //
  // Usage:
  //   toast.promise(saveProfile(data), {
  //     loading: "Saving…",
  //     success: (res) => `Welcome back, ${res.name}!`,
  //     error:   (err) => err.message ?? "Something went wrong",
  //   });

  promise<T>(fn: Promise<T>, messages: PromiseMessages<T>, opts?: ToastOptions) {
    return sonner.promise(fn, { ...messages, ...opts });
  },

  // ─── Action toast (undo pattern) ────────────────────────────────────────────
  // Shows a toast with an action button. Set a long duration (5–8s)
  // so users have time to react.
  //
  // Usage:
  //   toast.action("Item deleted", {
  //     description: "report.pdf was moved to trash",
  //     actionLabel: "Undo",
  //     onAction: () => restoreFile(),
  //   });

  action(
    message: string,
    {
      description,
      actionLabel = "Undo",
      onAction,
      duration = 6000,
      ...opts
    }: {
      description?: string;
      actionLabel?: string;
      onAction: () => void;
      duration?: number;
    } & ToastOptions,
  ) {
    return sonner(message, {
      description,
      duration,
      action: { label: actionLabel, onClick: onAction },
      ...opts,
    });
  },

  // ─── Step toast (loading → success / error) ─────────────────────────────────
  // Use when you want manual control over state transitions,
  // e.g. multi-step uploads where you update progress messages.
  //
  // Usage:
  //   const id = toast.step.start("Uploading file…");
  //   await upload(file);
  //   toast.step.success(id, "Upload complete!", "3 files added");
  //   // or on failure:
  //   toast.step.error(id, "Upload failed", err.message);

  step: {
    start(message: string, opts?: ToastOptions) {
      return sonner.loading(message, opts);
    },

    success(id: string | number, message: string, description?: string) {
      sonner.success(message, { id, description });
    },

    error(id: string | number, message: string, description?: string) {
      sonner.error(message, { id, description });
    },

    update(id: string | number, message: string) {
      sonner.loading(message, { id });
    },
  },
};
