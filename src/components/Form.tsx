import type {
  DeepRequired,
  FieldErrorsImpl,
  Path,
  UseFormRegister,
  UseFormReturn,
  UseFormSetValue,
} from "react-hook-form";

type FormProps<T, X> = {
  initialValues: { [K in keyof T]: T[K] };
  onSubmit: (values: { [K in keyof X]: X[K] }) => void;
  submitButton: string;
  useFormReturn: UseFormReturn<{ [K in keyof X]: X[K] }>;
};

export const Form = <
  T extends Record<string, unknown>,
  X extends Record<string, unknown>
>({
  initialValues,
  onSubmit,
  submitButton,
  useFormReturn,
}: FormProps<T, X>) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useFormReturn;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5">
        {Object.entries(initialValues).map(([index, value]) => (
          <div key={index} className="form-control">
            <label className="label">
              <span className="label-text capitalize">{index}</span>
            </label>
            <Input<X>
              index={index}
              value={value}
              errors={errors}
              register={register}
              setValue={setValue}
            />
          </div>
        ))}
        <button type="submit" className="btn-primary btn">
          {submitButton}
        </button>
      </div>
    </form>
  );
};

type InputProps<T> = {
  index: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  errors: Partial<FieldErrorsImpl<DeepRequired<{ [K in keyof T]: T[K] }>>>;
  register: UseFormRegister<{ [K in keyof T]: T[K] }>;
  setValue: UseFormSetValue<{ [K in keyof T]: T[K] }>;
};

const Input = <T extends Record<string, unknown>>({
  index,
  value,
  errors,
  register,
  setValue,
}: InputProps<T>) => {
  type keyType = Path<{ [K in keyof T]: T[K] }>;
  return (
    <>
      {(() => {
        switch (value.type) {
          case "text":
            return (
              <>
                <input
                  type="text"
                  placeholder={value.placeholder}
                  defaultValue={value.currentValue ?? ""}
                  className={`input-bordered input input-md w-full ${
                    errors[index] ? "input-error" : ""
                  }`}
                  {...register(index as keyType)}
                />
                {setValue(index as keyType, value.currentValue)}
                {errors[index]?.message ? (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors[index]?.message as string}
                    </span>
                  </label>
                ) : (
                  <></>
                )}
              </>
            );
          case "number":
            return (
              <>
                <input
                  type="number"
                  step="0.01"
                  placeholder={value.placeholder}
                  defaultValue={value.currentValue}
                  className={`input-bordered input input-md w-full ${
                    errors[index] ? "input-error" : ""
                  }`}
                  {...register(index as keyType, { valueAsNumber: true })}
                />
                {setValue(index as keyType, value.currentValue)}
                {errors[index]?.message ? (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors[index]?.message as string}
                    </span>
                  </label>
                ) : (
                  <></>
                )}
              </>
            );
          case "date":
            return (
              <>
                <input
                  type="date"
                  defaultValue={
                    value.currentValue
                      ? value.currentValue.toISOString().substring(0, 10)
                      : value.placeholder.toISOString().substring(0, 10)
                  }
                  className={`input-bordered input input-md w-full ${
                    errors[index] ? "input-error" : ""
                  }`}
                  {...register(index as keyType, { valueAsDate: true })}
                />
                {setValue(
                  index as keyType,
                  value.currentValue
                    ? value.currentValue.toISOString().substring(0, 10)
                    : value.placeholder.toISOString().substring(0, 10)
                )}
                {errors[index]?.message ? (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors[index]?.message as string}
                    </span>
                  </label>
                ) : (
                  <></>
                )}
              </>
            );
          case "select":
            return (
              <>
                <select
                  className="input-wd select-bordered select w-full"
                  defaultValue={value.currentValue}
                  {...register(index as keyType)}
                >
                  {setValue(index as keyType, value.currentValue)}
                  <option disabled value={""}>
                    {value.placeholder}
                  </option>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {value.options.map((value: any, index: any) => (
                    <option key={index} value={value.category}>
                      {value.category}
                    </option>
                  ))}
                </select>
                {errors[index]?.message ? (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors[index]?.message as string}
                    </span>
                  </label>
                ) : (
                  <></>
                )}
              </>
            );
          default:
            return <></>;
        }
      })()}
    </>
  );
};
