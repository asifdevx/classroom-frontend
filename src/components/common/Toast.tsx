import { Toaster as SonnerToaster } from "@/components/ui/sonner";

/**
 * Drop this once inside your root layout or _app.tsx.
 * All `toast.*` calls from anywhere in the app will render here.
 */
export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      richColors
      closeButton
      duration={4000}
      visibleToasts={4}
      gap={8}
      toastOptions={{
        classNames: {
          toast: "font-sans text-sm",
          title: "font-medium",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
        },
      }}
    />
  );
}
