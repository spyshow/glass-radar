import React from "react";
import { PageHeader, Button, Skeleton } from "antd";
import { useGet } from "figbird";
import { TableOutlined, AppstoreOutlined } from "@ant-design/icons";

import MoldsTableView from "../MoldsTableView/MoldsTableView.component";
import MoldsCardView from "../MoldsCardView/MoldsCardView.component";
import "./MoldSet.styles.css";

const MoldSet = ({ id }) => {
  const [listView, setListView] = React.useState(false);
  const changeViewToList = () => {
    setListView(true);
  };
  const changeViewToCard = () => {
    setListView(false);
  };
  const molds = useGet(id, "moldsets", {
    realtime: "refetch",
    fetchPolicy: "network-only",
  });
  if (molds.status !== "success") {
    return <Skeleton active />;
  }
  return (
    <div>
      <PageHeader
        ghost={true}
        title="Mold Sets"
        subTitle="Mold Sets Overview"
        extra={[
          <Button.Group key="15">
            <Button
              type="primary"
              key="AppstoreOutlined"
              onClick={changeViewToCard}
            >
              <AppstoreOutlined />
            </Button>
            <Button
              type="primary"
              key="TableOutlined"
              onClick={changeViewToList}
            >
              <TableOutlined />
            </Button>
          </Button.Group>,
        ]}
      ></PageHeader>
      <div className="mold-sets-container">
        {listView ? (
          <MoldsTableView molds={molds} />
        ) : (
          <MoldsCardView molds={molds} />
        )}
      </div>
    </div>
  );
};

export default MoldSet;
