import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login/Login.page";
import Dashboard from "./pages/Dashboard/Dashboard.page";
import Lines from "./pages/Lines/Lines.page";
import Line from "./pages/Line/Line.page";
import Machines from "./pages/Machines/Machines.page";
import Machine from "./pages/machine/machine.page";
import Users from "./pages/Users/Users.page";
import Jobs from "./pages/Jobs/Jobs.page";
import Operator from "./pages/Operator/Operator.page";
import MoldSets from "./pages/MoldSets/MoldSets.page";
import MoldSet from "./components/MoldSet/MoldSet.component";
import Unauthorized from "./pages/Unauthorized/Unauthorized.page";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.component";

export default function RouterWrap() {
  const routes = [
    {
      path: "/dashboard/",
      component: <div>home</div>,
      roles: ["user"],
    },
    {
      path: "/dashboard/operator/:machineId&:lineId",
      component: <Operator />,
      roles: ["admin", "operator"],
    },
    {
      path: "/dashboard/login",
      component: <div />,
    },
    {
      path: "/dashboard/moldsets",
      component: <MoldSets />,
      roles: ["admin", "mold admin"],
    },
    {
      path: "/dashboard/moldset/:id",
      component: <MoldSet />,
    },
    {
      path: "/dashboard/lines",
      component: <Lines />,
    },
    {
      path: "/dashboard/line/:id",
      component: <Line />,
    },
    {
      path: "/dashboard/machine/:id",
      component: <Machine />,
    },
    {
      path: "/dashboard/machines",
      component: <Machines />,
    },
    {
      path: "/dashboard/users",
      component: <Users />,
    },
    {
      path: "/dashboard/jobs",
      component: <Jobs />,
    },
  ];
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/unauthorized"} element={<Unauthorized />} />
        <Route element={<PrivateRoute roles={["user"]} />}>
          <Route path={"/*"} element={<Dashboard />} />
          <Route path={"/dashboard"} element={<Dashboard />}>
            {routes.map((route) => (
              <Route
                path={route.path}
                key={route.path}
                element={route.component}
              />
            ))}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
