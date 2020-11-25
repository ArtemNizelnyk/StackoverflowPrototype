import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

type IInputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  placeholder: string;
  label: string;
  textarea?: boolean;
};
export interface IInputFieldState {}

export const InputField: React.FC<IInputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  let InputOrTextArea = Input;
  if (textarea) {
    InputOrTextArea = Textarea;
  }
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextArea {...field} {...props} id={field.name}  />

      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
