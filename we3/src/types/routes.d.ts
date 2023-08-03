import type { IndexRouteObject, NonIndexRouteObject } from 'react-router'

type CustomRouteFields = {
  name?: string
  icon?: string | JSX.Element
}

type AppIndexRouteObject = IndexRouteObject & CustomRouteFields
type AppNonIndexRouteObject = Omit<NonIndexRouteObject, 'children'> &
  CustomRouteFields & {
    children?: (AppIndexRouteObject | AppNonIndexRouteObject)[]
  }

export type RouteProps = AppIndexRouteObject | AppNonIndexRouteObject
