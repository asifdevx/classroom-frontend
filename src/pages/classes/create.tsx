import Heading from "@/components/common/Heading";
import { UploadWidget } from "@/components/common/upload-widget";
import { classSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FieldErrors, FieldValues, Path, Resolver, SubmitHandler, useForm, UseFormRegister, useWatch } from "react-hook-form";
import z from "zod";

type ClassFormValues = z.infer<typeof classSchema>;

// ==========================================
// 2. MOCK CONFIGURATIONS
// ==========================================
const MOCK_SUBJECTS = [
  { id: 101, name: "Introduction to Biology", code: "BIO-101" },
  { id: 102, name: "General Chemistry", code: "CHEM-202" },
  { id: 103, name: "Multivariable Calculus", code: "MATH-301" },
];

const MOCK_TEACHERS = [
  { id: "t1", name: "Prof. Sarah Jenkins" },
  { id: "t2", name: "Dr. Alan Turing" },
  { id: "t3", name: "Dr. Rosalind Franklin" },
];

// ==========================================
// 3. CORE CLASSES CREATE COMPONENT
// ==========================================
export default function ClassesCreate() {
  const [subjectsLoading, setSubjectsLoading] = useState(true);
  const [teachersLoading, setTeachersLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ClassFormValues>({
    resolver: zodResolver(classSchema) as Resolver<ClassFormValues>,
    defaultValues: {
      status: "active",
      bannerUrl: "",
      bannerCldPubId: "",
    },
  });
  const bannerUrl = useWatch({
    control,
    name: "bannerUrl",
  });

  const bannerPublicId = useWatch({
    control,
    name: "bannerCldPubId",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setSubjectsLoading(false);
      setTeachersLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit: SubmitHandler<ClassFormValues> = async (values) => {
    try {
      console.log("Submitting Clean Form Data:", values);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  return (
    <div className="space-y-6">
      <Heading path={["Classes", "Create"]} title="Create Classes" />

      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Provide the required information below to add a class.</p>

      <hr className="border-slate-200 dark:border-slate-700/60" />

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700/60">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-amber-500">Fill out form</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
              Banner Image <span className="text-orange-600">*</span>
            </label>
            <UploadWidget
              value={bannerUrl ? { url: bannerUrl, publicId: bannerPublicId } : null}
              onChange={(file) => {
                if (file) {
                  setValue("bannerUrl", file.url, { shouldValidate: true, shouldDirty: true });
                  setValue("bannerCldPubId", file.publicId, { shouldValidate: true, shouldDirty: true });
                } else {
                  setValue("bannerUrl", "", { shouldValidate: true, shouldDirty: true });
                  setValue("bannerCldPubId", "", { shouldValidate: true, shouldDirty: true });
                }
              }}
            />
            {errors.bannerUrl && <p className="text-xs font-medium text-rose-500">{errors.bannerUrl.message}</p>}
            {errors.bannerCldPubId && !errors.bannerUrl && <p className="text-xs font-medium text-rose-500">{errors.bannerCldPubId.message}</p>}
          </div>

          <FormInput label="Class Name" name="name" required placeholder="Introduction to Biology - Section A" register={register} errors={errors} />

          <div className="grid sm:grid-cols-2 gap-4">
            <FormSelect
              label="Subject"
              name="subjectId"
              required
              disabled={subjectsLoading}
              placeholder={subjectsLoading ? "Loading subjects..." : "Select a subject"}
              options={MOCK_SUBJECTS.map((s) => ({ value: s.id.toString(), label: `${s.name} (${s.code})` }))}
              register={register}
              errors={errors}
              valueAsNumber
            />

            <FormSelect
              label="Teacher"
              name="teacherId"
              required
              disabled={teachersLoading}
              placeholder={teachersLoading ? "Loading teachers..." : "Select a teacher"}
              options={MOCK_TEACHERS.map((t) => ({ value: t.id, label: t.name }))}
              register={register}
              errors={errors}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <FormInput label="Capacity" name="capacity" type="number" required placeholder="30" register={register} errors={errors} valueAsNumber />

            <FormSelect
              label="Status"
              name="status"
              required
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
              register={register}
              errors={errors}
            />
          </div>

          <FormTextarea label="Description" name="description" required placeholder="Brief description about the class" register={register} errors={errors} />

          <hr className="border-slate-100 dark:border-slate-700/60 pt-2" />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center h-11 px-4 text-sm font-medium rounded-lg text-white bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <span>Creating Class...</span>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
            ) : (
              "Create Class"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 4. GENERIC REUSABLE ATOMIC REGISTRATION PRIMITIVES
// ==========================================
interface BaseFieldProps<TFieldValues extends FieldValues> {
  label: string;
  name: Path<TFieldValues>;
  required?: boolean;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  valueAsNumber?: boolean;
  disabled?: boolean;
}

// Helper to reliably read nested error properties (e.g., errors.schedules[0].day)
const getNestedError = <TFieldValues extends FieldValues>(errors: FieldErrors<TFieldValues>, path: string) => {
  return path.split(".").reduce<unknown>((obj, key) => {
    if (obj && typeof obj === "object" && key in obj) {
      return (obj as Record<string, unknown>)[key];
    }
    return undefined;
  }, errors);
};

function FieldWrapper<TFieldValues extends FieldValues>({
  label,
  name,
  required,
  errors,
  children,
}: Omit<BaseFieldProps<TFieldValues>, "register"> & {
  children: React.ReactNode;
}) {
  const errorEntry = getNestedError(errors, name);

  const errorMessage = typeof errorEntry === "object" && errorEntry !== null && "message" in errorEntry ? String((errorEntry as { message?: unknown }).message) : undefined;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
        {label} {required && <span className="text-orange-600">*</span>}
      </label>

      {children}

      {errorMessage && <p className="text-xs font-medium text-rose-500 animate-in fade-in duration-150">{errorMessage}</p>}
    </div>
  );
}
export function FormInput<TFieldValues extends FieldValues>({
  placeholder,
  type = "text",
  valueAsNumber,
  ...props
}: Omit<BaseFieldProps<TFieldValues>, "valueAsNumber"> & { placeholder?: string; type?: string; valueAsNumber?: boolean }) {
  const hasError = !!getNestedError(props.errors, props.name);
  return (
    <FieldWrapper {...props}>
      <input
        type={type}
        placeholder={placeholder}
        disabled={props.disabled}
        {...props.register(props.name, { valueAsNumber })}
        className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${
          hasError ? "border-rose-400 focus:border-rose-500" : "border-slate-200 dark:border-slate-700 focus:border-indigo-500"
        }`}
      />
    </FieldWrapper>
  );
}

export function FormSelect<TFieldValues extends FieldValues>({
  placeholder,
  options,
  valueAsNumber,
  ...props
}: Omit<BaseFieldProps<TFieldValues>, "valueAsNumber"> & { placeholder?: string; options: { value: string; label: string }[]; valueAsNumber?: boolean }) {
  const hasError = !!getNestedError(props.errors, props.name);
  return (
    <FieldWrapper {...props}>
      <div className="relative w-full">
        <select
          defaultValue=""
          disabled={props.disabled}
          {...props.register(props.name, { valueAsNumber })}
          className={`w-full px-3.5 py-2 pr-10 text-sm appearance-none rounded-lg border bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
            hasError ? "border-rose-400 focus:border-rose-500" : "border-slate-200 dark:border-slate-700 focus:border-indigo-500"
          }`}
        >
          <option value="" disabled hidden>
            {placeholder || "Select an option"}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </FieldWrapper>
  );
}

export function FormTextarea<TFieldValues extends FieldValues>({ placeholder, rows = 4, ...props }: BaseFieldProps<TFieldValues> & { placeholder?: string; rows?: number }) {
  const hasError = !!getNestedError(props.errors, props.name);
  return (
    <FieldWrapper {...props}>
      <textarea
        placeholder={placeholder}
        rows={rows}
        disabled={props.disabled}
        {...props.register(props.name)}
        className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-y ${
          hasError ? "border-rose-400 focus:border-rose-500" : "border-slate-200 dark:border-slate-700 focus:border-indigo-500"
        }`}
      />
    </FieldWrapper>
  );
}
