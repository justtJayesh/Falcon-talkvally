import {
    Flex,
    Box,
    FormControl,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    HStack,
} from "@chakra-ui/react";
import { RxPerson } from "react-icons/rx";
import { MdFacebook, MdLockOutline } from "react-icons/md";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserAuth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [toggleSwitch, setToggleSwitch] = useState(true);
    const navigate = useNavigate();

    const loginUserData = (data) => {
        axios
            .post("https://backend-talkvally.onrender.com/users/login", data)
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                navigate("/talkvally");
            });
    };

    const handleLogin = () => {
        const userData = { email, password };
        loginUserData(userData);
    };

    const SignUpData = (data) => {
        axios
            .post("https://backend-talkvally.onrender.com/users/register", data)
            .then((res) => {
                console.log(res.data);
                setName("");
                setEmail("");
                setPassword("");
                setToggleSwitch(!toggleSwitch);
            });
    };

    const handleSignUp = () => {
        console.log("Signup button working..");
        const newUserData = { name, email, password };
        SignUpData(newUserData);
        // fetch("https://backend-talkvally.onrender.com/users/register", {
        //     method: "POST",
        //     headers: {
        //         "Content-type": "application/json",
        //     },
        //     body: JSON.stringify(newUserData),
        // })
        //     .then((res) => res.json())
        //     .then((res) => console.log(res))
        //     .catch((err) => console.log(err));
    };

    const handleToggle = () => {
        setToggleSwitch(!toggleSwitch);
    };

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            {toggleSwitch ? (
                <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={4}>
                    <Stack align={"center"}>
                        <Heading fontSize={"4xl"}>Welcome to Falcon</Heading>
                        <Text fontSize={"lg"} color={"gray.600"}>
                            Log into your account to continue
                        </Text>
                    </Stack>
                    <Box rounded={"lg"}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <div id="input-section">
                                    <RxPerson color="lightgray" />
                                    <Input
                                        type="email"
                                        width={"80%"}
                                        variant={"unstyled"}
                                        placeholder="Some@mail.com"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                            </FormControl>
                            <FormControl id="password">
                                <div id="input-section">
                                    <MdLockOutline color="lightgray" />
                                    <Input
                                        type="password"
                                        width={"80%"}
                                        variant={"unstyled"}
                                        placeholder="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                            </FormControl>
                            <Stack spacing={5}>
                                <Stack
                                    direction={{ base: "column", sm: "row" }}
                                    align={"end"}
                                    justify={"space-between"}
                                >
                                    <Box></Box>
                                    <Text color={"teal.400"}>
                                        Forgot password?
                                    </Text>
                                </Stack>
                                <Button
                                    bg={"teal.400"}
                                    color={"white"}
                                    _hover={{
                                        bg: "teal.500",
                                    }}
                                    borderRadius={"20px"}
                                    w={"100px"}
                                    margin={"auto"}
                                    onClick={handleLogin}
                                >
                                    Login
                                </Button>

                                <Stack
                                    direction={{ base: "column", sm: "row" }}
                                    align={"end"}
                                    display={"flex"}
                                    justifyContent={"space-evenly"}
                                    alignItems={"center"}
                                >
                                    <Text>Dont have an account?</Text>
                                    <Button
                                        variant={"unstyled"}
                                        onClick={handleToggle}
                                        fontWeight={"400"}
                                    >
                                        <Text color={"teal.400"}>SignUp!</Text>
                                    </Button>
                                </Stack>

                                <Stack margin={"auto"}>
                                    <HStack spacing={"20px"}>
                                        <MdFacebook
                                            size={"30px"}
                                            color="lightgray"
                                        />
                                        <FaTwitter
                                            size={"30px"}
                                            color="lightgray"
                                        />
                                        <FaLinkedin
                                            size={"30px"}
                                            color="lightgray"
                                        />
                                    </HStack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            ) : (
                <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={4}>
                    <Stack align={"center"}>
                        <Heading fontSize={"4xl"}>Welcome to Falcon</Heading>
                        <Text fontSize={"lg"} color={"gray.600"}>
                            Create new account to continue
                        </Text>
                    </Stack>
                    <Box rounded={"lg"}>
                        <Stack spacing={4}>
                            <FormControl id="name">
                                <div id="input-section">
                                    <RxPerson color="lightgray" />
                                    <Input
                                        type="text"
                                        width={"80%"}
                                        variant={"unstyled"}
                                        placeholder="Enter your Name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>
                            </FormControl>
                            <FormControl id="email">
                                <div id="input-section">
                                    <RxPerson color="lightgray" />
                                    <Input
                                        type="email"
                                        width={"80%"}
                                        variant={"unstyled"}
                                        placeholder="Some@mail.com"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                            </FormControl>
                            <FormControl id="password">
                                <div id="input-section">
                                    <MdLockOutline color="lightgray" />
                                    <Input
                                        type="password"
                                        width={"80%"}
                                        variant={"unstyled"}
                                        placeholder="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                            </FormControl>
                            <Stack spacing={5}>
                                <Button
                                    bg={"teal.400"}
                                    color={"white"}
                                    _hover={{
                                        bg: "teal.500",
                                    }}
                                    borderRadius={"20px"}
                                    w={"100px"}
                                    margin={"auto"}
                                    onClick={handleSignUp}
                                >
                                    SignUp
                                </Button>

                                <Stack
                                    direction={{ base: "column", sm: "row" }}
                                    align={"end"}
                                    display={"flex"}
                                    justifyContent={"space-evenly"}
                                    alignItems={"center"}
                                >
                                    <Text>Already have an account?</Text>
                                    <Button
                                        variant={"unstyled"}
                                        onClick={handleToggle}
                                        fontWeight={"400"}
                                    >
                                        <Text color={"teal.400"}>Login</Text>
                                    </Button>
                                </Stack>

                                <Stack margin={"auto"}>
                                    <HStack spacing={"20px"}>
                                        <MdFacebook
                                            size={"30px"}
                                            color="lightgray"
                                        />
                                        <FaTwitter
                                            size={"30px"}
                                            color="lightgray"
                                        />
                                        <FaLinkedin
                                            size={"30px"}
                                            color="lightgray"
                                        />
                                    </HStack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            )}
        </Flex>
    );
}
