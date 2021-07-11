import styled from "styled-components"
import { Navbar } from "../components"
import { Box, Heading, Button } from "@chakra-ui/react"

const HeaderStyles = styled.div`
  padding-top: 10rem;
`

function Header() {
  return (
    <HeaderStyles>
      <Box pt={8}>
        <Heading
          size="4xl"
          mb={4}
          bgGradient="linear(to-l, #7928CA,#FF0080)"
          bgClip="text"
        >
          Recipely
        </Heading>
        <Heading mb={8} size="md" fontWeight="lighter" fontSize="28px">
          Management software for the home cook
        </Heading>
        <Button colorScheme="pink">Learn more</Button>
      </Box>
    </HeaderStyles>
  )
}

export default function Landing() {
  return (
    <>
      <Navbar />
      <Header />
    </>
  )
}
