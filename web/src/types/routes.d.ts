import type { IndexRouteObject, NonIndexRouteObject } from 'react-router'

type CustomRouteFields = {
  name?: string
  icon?: JSX.Element
  meta?: { hide?: boolean }
}

type AppIndexRouteObject = IndexRouteObject & CustomRouteFields
type AppNonIndexRouteObject = Omit<NonIndexRouteObject, 'children'> &
  CustomRouteFields & {
    children?: (AppIndexRouteObject | AppNonIndexRouteObject)[]
  }

export type RouteProps = AppIndexRouteObject | AppNonIndexRouteObject
