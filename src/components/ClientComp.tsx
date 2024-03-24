"use client";

import { FormApi, mergeForm, useTransform } from "@tanstack/react-form";

import { formFactory } from "@/lib/form-factory";
import someAction from "@/actions/some-action";
import { useFormState } from "react-dom";

const ClientComp = () => {
  const [state, action] = useFormState(
    someAction,
    formFactory.initialFormState
  );

  const { useStore, Subscribe, handleSubmit, Field } = formFactory.useForm({
    transform: useTransform(
      (baseForm: FormApi<any, any>) => mergeForm(baseForm, state),
      [state]
    ),
  });

  const formErrors = useStore((formState) => formState.errors);

  return (
    <form action={action as never} onSubmit={() => handleSubmit()}>
      {formErrors.map((error) => (
        <p key={error as string}>{error}</p>
      ))}

      <Field
        name="age"
        validators={{
          onChange: ({ value }) =>
            value < 8 ? "Client validation: You must be at least 8" : undefined,
        }}
      >
        {(field) => {
          return (
            <div>
              <input
                className="text-black border border-gray p-2"
                name="age"
                type="number"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              />
              {field.state.meta.errors.map((error) => (
                <p key={error as string}>{error}</p>
              ))}
            </div>
          );
        }}
      </Field>
      <Subscribe
        selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <button
            type="submit"
            disabled={!canSubmit}
            className="text-white bg-blue-700 hover:bg-blue-800 p-2 mt-2 rounded-lg"
          >
            {isSubmitting ? "..." : "Submit"}
          </button>
        )}
      </Subscribe>
    </form>
  );
};

export default ClientComp;
