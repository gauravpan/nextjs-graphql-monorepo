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
import { TextField, Form } from "../../components/Form";
import * as yup from "yup";

const registerSchema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().min(6),
  })
  .required();

const LoginPage = () => {
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
              Log in
            </Heading>
            <Text textAlign={"center"} size={"sm"} color="gray.500">
              Do not have an account? <Link color={"blue.500"}>Register</Link>
            </Text>
          </Box>
          <Form schema={registerSchema} onSubmit={() => {}}>
            <TextField name="email" label="Email" type="email" />
            <TextField name="password" label="Password" type="password" />
            <Button type="submit" colorScheme={"telegram"} mt="3">
              Register
            </Button>
          </Form>
        </Stack>
      </Center>
    </>
  );
};
export default LoginPage;
