import { Trash, UploadCloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants/EnvValues";
import { UploadWidgetProps, UploadWidgetValue } from "@/types";



export function UploadWidget({ value = null, onChange, disabled = false }: UploadWidgetProps) {
  const widgetRef = useRef<CloudinaryWidget | null>(null);
  const onChangeRef = useRef(onChange);

  const [preview, setPreview] = useState<UploadWidgetValue | null>(value);
  const [deleteToken, setDeleteToken] = useState<string | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    // Defer updating local state to avoid triggering cascading synchronous renders
    const handle = window.setTimeout(() => {
      setPreview(value);
      if (!value) {
        setDeleteToken(null);
      }
    }, 0);

    return () => window.clearTimeout(handle);
  }, [value]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initializeWidget = () => {
      if (!window.cloudinary || widgetRef.current) return false;

      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName: CLOUDINARY_CLOUD_NAME,
          uploadPreset: CLOUDINARY_UPLOAD_PRESET,
          multiple: false,
          folder: "uploads",
          maxFileSize: 5_000_000,
          clientAllowedFormats: ["png", "jpg", "jpeg"],
        },
        (error, result) => {
          if (!error && result.event === "success") {
            const payload: UploadWidgetValue = {
              url: result.info.secure_url,
              publicId: result.info.public_id,
            };

            setPreview(payload);
            setDeleteToken(result.info.delete_token ?? null);
            onChangeRef.current?.(payload);
          }
        },
      );

      return true;
    };

    if (initializeWidget()) return;

    const intervalId = window.setInterval(() => {
      if (initializeWidget()) {
        window.clearInterval(intervalId);
      }
    }, 500);

    return () => window.clearInterval(intervalId);
  }, []);

  const openWidget = () => {
    if (!disabled) {
      widgetRef.current?.open();
    }
  };

  const removeFromCloudinary = async () => {
    if (!preview) return;
    setIsRemoving(true);

    try {
      if (deleteToken) {
        const params = new URLSearchParams();
        params.append("token", deleteToken);

        await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/delete_by_token`, {
          method: "POST",
          body: params,
        });
      }
    } catch (error) {
      console.error("Failed to remove image from Cloudinary", error);
    } finally {
      setPreview(null);
      setDeleteToken(null);
      onChangeRef.current?.(null);
      setIsRemoving(false);
    }
  };

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="relative group max-w-sm overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
          <img src={preview.url} alt="Uploaded file" className="w-full h-40 object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={removeFromCloudinary}
              disabled={isRemoving || disabled}
              className="p-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <Trash className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6 bg-slate-50 dark:bg-slate-900/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900/80 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          role="button"
          tabIndex={0}
          onClick={openWidget}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openWidget();
            }
          }}
        >
          <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
          <div className="text-center">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Click to upload photo</p>
            <p className="text-xs text-slate-400">PNG, JPG up to 5MB</p>
          </div>
        </div>
      )}
    </div>
  );
}