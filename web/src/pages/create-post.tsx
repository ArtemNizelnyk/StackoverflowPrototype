import { Flex, Link, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { Component } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { toErrorMap } from "../utils/toErrorMap";
import login from "./login";

const CreatePost: React.FC<{}> = ({}) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="title" label="Title" />

            <InputField textarea name="text" placeholder="text" label="Body" />

            <Button
              mt={4}
              type="submit"
              backgroundColor="teal"
              isLoading={isSubmitting}
            >
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default CreatePost;
