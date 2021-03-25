import { FC } from "react"
import { Container } from "@chakra-ui/react"

const Layout: FC = ({ children }) => (
  <Container maxW="container.lg">{children}</Container>
)

export default Layout
