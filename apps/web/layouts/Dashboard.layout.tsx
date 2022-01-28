import {
  Avatar,
  Box,
  Button,
  Heading,
  Grid,
  HStack,
  Icon,
  IconButton,
  Spacer,
  Stack,
  useDisclosure,
  Container,
  Divider,
} from "@chakra-ui/react";
import { MdDashboard } from "react-icons/md";
import {
  HiBell,
  HiCash,
  HiChevronDown,
  HiCog,
  HiGlobe,
  HiMenuAlt1,
  HiOutlineBell,
  HiUsers,
} from "react-icons/hi";
import { AiFillCar } from "react-icons/ai";
import Head from "next/head";

import { ProtectedLayout } from "./Protected.layout";
import { IconType } from "react-icons/lib";

export default function DashboardLayout({
  children,
  title,
  bg = "white",
  shadow = "sm",
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>{title || "Hajurbuwa Express"}</title>
      </Head>
      <ProtectedLayout>
        <Grid gridTemplateColumns={["1fr", "1fr", "300px 1fr"]}>
          <SideNav {...{ isOpen, onOpen, onClose }} />
          <Box>
            <Header OpenMenu={onOpen} />
            <Box px="2" pb="10">
              <Box bg={bg} p="4" minH="60vh">
                {/* <Container maxW="container.xl"> */}
                <Heading size="lg">{title}</Heading>
                <Box h="4" />
                <Box> {children}</Box>
                {/* </Container> */}
              </Box>
            </Box>
          </Box>
        </Grid>
      </ProtectedLayout>
    </>
  );
}

const side = [
  { href: "/dashboard", label: "Dashboard", icon: MdDashboard },
  {
    label: "Users",
    icon: HiUsers,
    subMenu: [
      { href: "/", label: "External" },
      { href: "/", label: "Internal" },
    ],
  },

  { href: "/", label: "Payment", icon: HiCash },
  { href: "/", label: "Settings", icon: HiCog },
];

import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

function SideNav({ isOpen, onClose }) {
  const [s, se] = useState(0);

  useEffect(() => {
    se(5);
    return () => {
      console.log("bye", s);
    };
  }, []);

  useEffect(() => {
    console.log("hi", s);
  });
  return (
    <>
      <Stack
        bg="gray.50"
        h="100vh"
        w={"300px"}
        d={{ base: "none", lg: "block" }}
        overflowY={"auto"}
        px="2"
        display={{ base: "none", lg: "block" }}
      >
        <HStack h="16">
          <img src="/logo.png" alt="" />
        </HStack>

        <Stack color="gray.500" spacing="1" justifyContent={"center"}>
          {side.map((item) => (
            <SideNavItem key={item.label} {...item} />
          ))}
        </Stack>
      </Stack>
      <Box d={{ base: "block", lg: "none" }}>
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <Box>
                <HStack p="4">
                  <img src="/logo.png" alt="" />
                </HStack>
                <Stack pt="6" color="gray.500" spacing="2">
                  {side.map((item) => (
                    <SideNavItem key={item.label} {...item} />
                  ))}
                </Stack>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
}

function SideNavItem({ label, icon, subMenu = [], href = "#" }) {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();
  let isActive = router.pathname === href;

  if (!(subMenu && subMenu[0]))
    return (
      <Link href={href} passHref>
        <Button
          as="a"
          d="flex"
          variant="ghost"
          justifyContent="flex-start"
          alignItems="center"
          bg={isActive && "white"}
          color={isActive && "blue.500"}
          _hover={{ bg: "white" }}
        >
          {icon && <Icon as={icon} fontSize="lg" />}
          <Box w="3" />
          {label}
        </Button>
      </Link>
    );

  return (
    <Box>
      <Stack w="full">
        <Button
          d="flex"
          variant="ghost"
          justifyContent="flex-start"
          alignItems="center"
          onClick={onToggle}
          _hover={{ bg: "white" }}
        >
          {icon && <Icon as={icon} />}
          <Box w="3" />

          {label}
          <Spacer />
          {subMenu && (
            <Icon
              as={HiChevronDown}
              transform={`rotate(${!isOpen ? "0deg" : "180deg"})`}
              transition="transform .2s"
            />
          )}
        </Button>
        <Stack spacing="1" pl="2" d={isOpen ? "block" : "none"}>
          {subMenu?.map(({ label, icon, href = "#" }) => {
            let isActive = router.pathname === href;

            return (
              <Box pl="3" w="full" key={label}>
                <Link href={href} passHref>
                  <Button
                    as="a"
                    w="full"
                    py="1"
                    variant="ghost"
                    leftIcon={icon && <Icon as={icon} />}
                    justifyContent="flex-start"
                    bg={isActive && "white"}
                    color={isActive && "blue.500"}
                    _hover={{ bg: "white" }}
                  >
                    {label}
                  </Button>
                </Link>
              </Box>
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
}

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { memo } from "react";
import { useState } from "react";

function Header({ OpenMenu }) {
  return (
    <HStack h="16" px="3">
      <IconButton
        icon={<Icon as={HiMenuAlt1} />}
        aria-label="menu"
        onClick={OpenMenu}
      />
      <Spacer />
      <Box>
        <Menu>
          <MenuButton>
            <IconButton
              as="div"
              aria-label="notification"
              bg="transparent"
              icon={<Icon as={HiOutlineBell} fontSize="larger" />}
            />
          </MenuButton>
          <MenuList>
            <Box h="32" d="flex" justifyContent="center" alignItems="center">
              No Notifications!
            </Box>
          </MenuList>
        </Menu>
      </Box>
      <Box>
        <Menu>
          <MenuButton>
            <Avatar size="sm" name={"Gaurav Pandey"} />
          </MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              Log out
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </HStack>
  );
}
