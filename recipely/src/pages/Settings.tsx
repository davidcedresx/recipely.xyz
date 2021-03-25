import {
  Box,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Flex,
  Spacer
} from "@chakra-ui/react"
import { FC } from "react"
import { Navbar } from "../components"

import { useAppDispatch } from "../app/store"
import { logout } from "../features/auth/authSlice"

const Settings: FC = () => {
  const dispatch = useAppDispatch()

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <Navbar />
      <Heading py={6}>Settings</Heading>

      <Box boxShadow="base" p={6} rounded="md">
        <form>
          <FormControl mb={6}>
            <FormLabel>Global Profit</FormLabel>
            <Input type="number" placeholder="20" name="profit" required />
            <FormHelperText>
              This is the money you will be making for every recipe you sell
            </FormHelperText>
          </FormControl>
        </form>
        <Flex>
          <Button colorScheme="teal">Save</Button>
          <Spacer />
          <Button variant="outline" colorScheme="pink" onClick={onLogout}>
            Log out
          </Button>
        </Flex>
      </Box>
    </>
  )
}

export default Settings
