import { RootState } from "../app/store"
import { useSelector } from "react-redux"

import { Route, Redirect, RouteProps } from "react-router-dom"
import { FC } from "react"

interface PrivateRouteProps extends RouteProps {
  component: any
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const auth = useSelector((store: RootState) => store.auth)
  const authenticated = Boolean(auth.token)

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        authenticated ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/start",
              state: { from: routeProps.location }
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
