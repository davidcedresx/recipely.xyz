// global state
import { asyncLogin } from "./authSlice"
import { useAppDispatch } from "../../app/store"

// hooks and stuff
import { useHistory } from "react-router-dom"
import { useForm } from "react-hook-form"

// components and styles
import styled from "styled-components"
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  useToast
} from "@chakra-ui/react"
import { Navbar } from "../../components"

const CardStyles = styled.div`
  padding-top: 10rem;
`

interface FormValues {
  username: string
  password: string
}

const AuthCard = () => {
  const { register, handleSubmit } = useForm()
  const history = useHistory()
  const dispatch = useAppDispatch()
  const toast = useToast()

  const onSubmit = async (data: FormValues) => {
    const resultAction = await dispatch(
      asyncLogin({ ...data, action: "signin" })
    )

    if (asyncLogin.fulfilled.match(resultAction)) {
      history.replace("/init")
    }

    if (asyncLogin.rejected.match(resultAction)) {
      toast({
        title: "Error",
        description: resultAction.error.message,
        status: "error",
        duration: 2000,
        isClosable: true
      })
    }
  }

  return (
    <CardStyles>
      <Heading mb={6} fontWeight="lighter">
        Hi there!
      </Heading>
      <Box boxShadow="base" p={6} rounded="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={6}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="sickpizza?"
              name="username"
              ref={register({ required: true })}
              required
            />
            <FormHelperText>I bet yours is very cool</FormHelperText>
          </FormControl>

          <FormControl mb={6}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="******"
              name="password"
              ref={register({ required: true })}
              required
            />
            <FormHelperText>It's a secret</FormHelperText>
          </FormControl>

          <Button type="submit" colorScheme="teal">
            Submit
          </Button>
        </form>
      </Box>
    </CardStyles>
  )
}

export default function Auth() {
  return (
    <>
      <Navbar right={false} />
      <AuthCard />
    </>
  )
}
