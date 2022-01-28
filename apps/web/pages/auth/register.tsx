import {
  Box,
  Center,
  Heading,
  Link,
  Stack,
  Button,
  Text,
  Circle,
  HStack,
} from "@chakra-ui/react";
import * as yup from "yup";

import { TextField, Form } from "../../components/Form";

const registerSchema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().min(6),
  })
  .required();

const RegisterPage = () => {
  return (
    <>
      <Center
        h="100vh"
        bg="gray.50"
        bgGradient="linear(to-r, green.200, pink.300)"
      >
        <Stack
          p={{ base: "3", md: "4" }}
          spacing={"4"}
          rounded="md"
          shadow="sm"
          w="md"
          bg="white"
        >
          <HStack justifyContent={"center"}>
            <Circle boxSize="24" bg="gray.200" />
          </HStack>
          <Box>
            <Heading textAlign={"center"} size="lg">
              Create account
            </Heading>
            <Text textAlign={"center"} size={"sm"} color="gray.500">
              Already have an account? <Link color={"blue.500"}>Sign in</Link>
            </Text>
          </Box>
          <Form schema={registerSchema} onSubmit={() => {}}>
            <TextField name="email" label="Email" type="email" />
            <TextField name="password" label="Password" type="password" />
            <Box h="3" />
            <Button type="submit" colorScheme={"telegram"}>
              Register
            </Button>
          </Form>
        </Stack>
      </Center>
    </>
  );
};
export default RegisterPage;
