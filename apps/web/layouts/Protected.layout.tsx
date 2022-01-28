import { Center, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

export const ProtectedLayout: FC = ({ children }) => {
  const auth = { user: true, isLoading: false };
  const router = useRouter();

  useEffect(() => {
    if (auth.isLoading) return;
    if (!auth.user) router.push("/auth/login");
  }, [auth, router]);

  if (!auth.user)
    return (
      <Center h="100vh">
        <Spinner size={"lg"} />
      </Center>
    );

  return <>{children}</>;
};
