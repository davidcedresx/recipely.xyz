import { FC, useEffect } from "react"
import { Box, CircularProgress, useToast } from "@chakra-ui/react"
import styled from "styled-components"

import { useAppDispatch } from "../app/store"
import { asyncFetch as asyncIngredientsFetch } from "../features/ingredients/ingredientsSlice"
import { useHistory } from "react-router"

const LoaderStyles = styled.div`
  #loader {
    position: absolute;
    left: 50vw;
    top: 50vh;
    transform: translateX(-50%) translateY(-100%);
  }
`

const Fetcher: FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const toast = useToast()

  useEffect(() => {
    const initialize = async () => {
      const fetchIngredientsAction = await dispatch(asyncIngredientsFetch())

      if (asyncIngredientsFetch.rejected.match(fetchIngredientsAction)) {
        // handle error
        return
      }

      toast({
        title: "Welcome",
        status: "success",
        duration: 2000,
        isClosable: true
      })

      history.replace("/home")
    }

    initialize()
  }, [history, dispatch, toast])
  console.log("mounted initializer")

  return (
    <LoaderStyles>
      <Box id="loader">
        <CircularProgress isIndeterminate color="green.500" size="150px" />
      </Box>
    </LoaderStyles>
  )
}

export default Fetcher
