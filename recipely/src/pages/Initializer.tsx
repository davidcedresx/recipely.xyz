import { FC, useEffect } from "react"
import { Box, CircularProgress, useToast } from "@chakra-ui/react"
import styled from "styled-components"

import { useAppDispatch } from "../app/store"
import { asyncFetch as asyncIngredientsFetch } from "../features/ingredients/ingredientsSlice"
import { asyncFetch as asyncUtensilsFetch } from "../features/utensils/utensilsSlice"
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
    /* This method should download all rows for all entities in the backend
        this is a bit harsh but it is not expected to grow that much and it works for now

        TODO:
        - fetch recipes
        - fetch utensils
        - fetch ingredientUsages
        - fetch utensilUsages
    */
    const initialize = async () => {
      const fetchIngredientsAction = await dispatch(asyncIngredientsFetch())

      if (asyncIngredientsFetch.rejected.match(fetchIngredientsAction)) {
        // handle error
        return
      }

      const fetchUtensilsAction = await dispatch(asyncUtensilsFetch())

      if (asyncUtensilsFetch.rejected.match(fetchUtensilsAction)) {
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
