import type { Path, UseFormReturn } from "react-hook-form";

type FormProps<T> = {
  initialValues: { [K in keyof T]: T[K] };
  onSubmit: (values: { [K in keyof T]: T[K] }) => void;
  submitButton: string;
  useFormReturn: UseFormReturn<{ [K in keyof T]: T[K] }>;
};

export const Form = <T extends Record<string, unknown>>({
  initialValues,
  onSubmit,
  submitButton,
  useFormReturn,
}: FormProps<T>) => {
  type keyType = Path<{ [K in keyof T]: T[K] }>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormReturn;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5">
        {Object.entries(initialValues).map(([key, value]) => (
          <div key={key} className="form-control">
            <label className="label">
              <span className="label-text capitalize">{key}</span>
            </label>
            <input
              type={value.type}
              placeholder={value.placeholder}
              className={`input-bordered input input-md w-full ${
                errors[key as keyType] ? "input-error" : ""
              }`}
              {...register(key as keyType)}
            />
            {errors[key as keyType]?.message ? (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors[key as keyType]?.message as string}
                </span>
              </label>
            ) : (
              <></>
            )}
          </div>
        ))}
        <button type="submit" className="btn-primary btn">
          {submitButton}
        </button>
      </div>
    </form>
  );
};
