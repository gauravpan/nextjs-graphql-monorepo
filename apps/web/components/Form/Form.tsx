import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@chakra-ui/react";

export function Form({ children, onSubmit, schema }) {
  const methods = useForm({ resolver: yupResolver(schema) });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={"2"}>{children}</Stack>
      </form>
    </FormProvider>
  );
}
