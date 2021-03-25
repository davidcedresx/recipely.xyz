// global state stuff
import { RootState } from "../app/store"
import { useSelector } from "react-redux"

// components and styles
import {
  Flex,
  ButtonGroup,
  Spacer,
  Button,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from "@chakra-ui/react"
import { FunctionComponent, useMemo } from "react"
import { Link as Linky } from "react-router-dom"
import LogoUrl from "../assets/cupcake.svg"
import { FaAngleDown, FaCog } from "react-icons/fa"

interface Props {
  left?: boolean
  right?: boolean
}

const Navbar: FunctionComponent<Props> = ({ left = true, right = true }) => {
  const auth = useSelector((store: RootState) => store.auth)
  const authenticated = Boolean(auth.token)

  const brandLink = useMemo(() => (authenticated ? "/home" : "/"), [
    authenticated
  ])

  return (
    <Flex p={4}>
      {left && (
        <>
          <Box as={Linky} to={brandLink} mr={6}>
            <img src={LogoUrl} width={32} alt="donnut" />
          </Box>
          {authenticated && <LeftPrivate />}
        </>
      )}
      <Spacer />
      {right && (authenticated ? <RightPrivate /> : <RightPublic />)}
    </Flex>
  )
}

export default Navbar

const LeftPrivate = () => (
  <ButtonGroup>
    <Button as={Linky} to="/recipes" variant="ghost">
      Recipes
    </Button>
    <Button as={Linky} to="/ingredients" variant="ghost">
      Ingredients
    </Button>
    <Button as={Linky} to="/utensils" variant="ghost">
      Utensils
    </Button>
    <Button as={Linky} to="/conversions" variant="ghost">
      Conversions
    </Button>
  </ButtonGroup>
)

const RightPrivate = () => (
  <Menu>
    <MenuButton as={Button} rightIcon={<FaAngleDown />}>
      <FaCog />
    </MenuButton>
    <MenuList>
      <MenuItem as={Linky} to="/settings">
        Settings
      </MenuItem>
    </MenuList>
  </Menu>
)

const RightPublic = () => (
  <ButtonGroup>
    <Button as={Linky} to="/start" variant="ghost">
      About
    </Button>
    <Button as={Linky} to="/start" variant="ghost">
      Product
    </Button>
    <Button as={Linky} to="/start" colorScheme="pink">
      Start
    </Button>
  </ButtonGroup>
)
