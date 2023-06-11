//! Configure your routes in this file

import { lazy } from "react";

import { urls } from "@utils/constants";

export const routes = [
  {
    key: "home",
    path: urls.home,
    Component: lazy(() => import("@pages/DividerPage/DividerPage")),
    isPrivate: false, //? If true, route only for authorized users
    isPublicOnly: false, //? If true, route only for unauthorized users
  },
  {
    key: "divider",
    path: urls.divider,
    Component: lazy(() => import("@pages/DividerPage/DividerPage")),
    isPrivate: false, //? If true, route only for authorized users
    isPublicOnly: false, //? If true, route only for unauthorized users
  },
];
