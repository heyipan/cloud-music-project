import React from "react";
import { Navigate } from "react-router-dom";

import Recommend from "../application/Recommend";
import Home from "../application/Home";
import Singers from "../application/Singers";
import Rank from "../application/Rank";
import Album from "../application/Album";

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
      },
      {
        path: "/rank",
        element: <Rank />,
      },
    ],
  },
];

export default routes;
