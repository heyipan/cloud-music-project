import React from 'react';
import { Redirect } from "react-router-dom";
import Home from '../application/Home';
import Recommend from '../application/Recommend';


const routes = [
    {
      path: "/",
      component: Recommend,
      routes: [
        {
          path: "/",
          exact: true,
          render: () => (
            <Redirect to={"/recommend"}/>
          )
        },
        {
          path: "/recommend",
          component: Recommend
        },
      ]
    }
  ]

  export default routes;  