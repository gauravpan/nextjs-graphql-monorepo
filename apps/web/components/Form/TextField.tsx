import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Stack,
} from "@chakra-ui/react";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

interface TextFieldProps {
  name: string;
  label: string;
  helperText?: string;
  isRequired?: boolean;
  type?: "text" | "email" | "password";
}

export const TextField: FC<TextFieldProps> = ({
  name,
  label,
  helperText = "",
  type = "text",
  isRequired = true,
  children,
}) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  let error = errors[name];
  console.log({ register, error, errors, isRequired, children });

  return (
    <FormControl id={name} isInvalid={error}>
      <FormLabel>
        {label} {isRequired && "*"}
      </FormLabel>
      {children ? (
        children
      ) : (
        <Input
          type={type}
          {...register(name, {
            required: isRequired && `${label} is required.`,
          })}
        />
      )}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};
