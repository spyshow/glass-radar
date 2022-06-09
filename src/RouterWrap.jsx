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
      roles: ["User"],
    },
    {
      path: "/dashboard/operator/:machineId&:lineId",
      component: <Operator />,
      roles: ["Admin", "Operator"],
    },
    {
      path: "/dashboard/login",
      component: <div />,
    },
    {
      path: "/dashboard/moldsets",
      component: <MoldSets />,
      roles: ["Admin", "Mold Admin"],
    },
    {
      path: "/dashboard/moldset/:id",
      component: <MoldSet />,
      roles: ["Admin", "Mold Admin"],
    },
    {
      path: "/dashboard/lines",
      component: <Lines />,
      roles: ["Admin", "Moderator"],
    },
    {
      path: "/dashboard/line/:id",
      component: <Line />,
      roles: ["Admin", "Moderator"],
    },
    {
      path: "/dashboard/machine/:id",
      component: <Machine />,
      roles: ["Admin", "Moderator"],
    },
    {
      path: "/dashboard/machines",
      component: <Machines />,
      roles: ["Admin", "Moderator"],
    },
    {
      path: "/dashboard/users",
      component: <Users />,
      roles: ["Admin"],
    },
    {
      path: "/dashboard/jobs",
      component: <Jobs />,
      roles: ["Admin", "Moderator"],
    },
  ];
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/unauthorized"} element={<Unauthorized />} />
        <Route
          element={
            <PrivateRoute roles={["Admin", "Operator", "Mold Admin", "User"]} />
          }
        >
          <Route path={"/*"} element={<Dashboard />} />
          <Route path={"/dashboard"} element={<Dashboard />}>
            {routes.map((route, index) => (
              <Route
                element={<PrivateRoute roles={route.roles} />}
                key={route.path + index}
              >
                <Route
                  path={route.path}
                  key={route.path + index}
                  element={route.component}
                />
              </Route>
            ))}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
