import React, { Component } from "react";
import { Form, Formik } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
} from "@chakra-ui/react";
import { valueScaleCorrection } from "framer-motion/types/render/dom/layout/scale-correction";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useMutation } from "urql";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

export interface IregisterProps {}
export interface IregisterState {}

const Register: React.FC<IregisterProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={async (values, {setErrors}) => {
          console.log(values);
          const response = await register({options:values});
          if (response.data?.register.errors)
          {
            [{field: 'username', message:'something wrong'}]
            setErrors(toErrorMap(response.data.register.errors));

          }
          else if (response.data?.register.user) {
            console.log(response.data?.register?.user?.id);
            router.push("/");

          }
            
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4} >
            <InputField
              name="email"
              placeholder="email"
              label="Email"
            />
            </Box>

            <InputField
              name="password"
              placeholder="password"
              label="Password"
              type="password"
            />
            <Button
              mt={4}
              type="submit"
              backgroundColor="teal"
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
