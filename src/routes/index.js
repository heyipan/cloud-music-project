import React from "react";
import { Navigate } from "react-router-dom";

import Recommend from "../application/Recommend";
import Home from "../application/Home";
import Singers from "../application/Singers";
import Rank from "../application/Rank";
import Album from "../application/Album";
import Singer from "../application/Singer";

const routes = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        index: true,
        element: <Navigate to={"/recommend"} />,
      },
      {
        path: "/recommend",
        element: <Recommend />,
        children: [
          {
            path: "/recommend/:id",
            element: <Album />,
          },
        ],
      },
      {
        path: "/singers",
        element: <Singers />,
        children: [
          {
            path: "/singers/:id",
            element: <Singer />,
          },
        ],
      },
      {
        path: "/rank",
        element: <Rank />,
        children: [
          {
            path: "/rank/:id",
            element: <Album />,
          },
        ],
      },
    ],
  },
];

export default routes;
