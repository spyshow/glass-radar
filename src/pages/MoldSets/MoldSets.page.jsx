import React from "react";
import { PageHeader, Button, Skeleton, Modal } from "antd";
import { TableOutlined, AppstoreOutlined } from "@ant-design/icons";
import { useFind } from "figbird";

import AddMoldSet from "../../components/AddMoldSet/AddMoldSet.component";
import MoldSetCardView from "../../components/MoldSetCardView/MoldSetCardView.component";
import MoldSetTableView from "../../components/MoldSetTableView/MoldSetTableView.component";
import "./MoldSets.styles.css";

const MoldSets = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [listView, setListView] = React.useState(false);

  const moldsets = useFind("moldsets", {
    realtime: "refetch",
    fetchPolicy: "network-only",
  });
  if (moldsets.status !== "success") {
    return <Skeleton active />;
  }
  const Modalvisiblety = () => {
    setModalVisible(false);
  };
  const changeViewToList = () => {
    setListView(true);
  };
  const changeViewToCard = () => {
    setListView(false);
  };

  return (
    <div>
      <PageHeader
        ghost={true}
        title="Mold Sets"
        subTitle="Mold Sets Overview"
        extra={[
          <Button
            key="Add a Mold Set"
            type="primary"
            onClick={() => {
              setModalVisible(true);
            }}
            style={{ marginRight: "10px" }}
          >
            Add a Mold Set
          </Button>,
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
        <Modal
          title="Add a Mold Set"
          centered
          visible={modalVisible}
          onOk={() => {
            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
          width={1000}
          footer={[]}
        >
          <AddMoldSet ok={Modalvisiblety} />
        </Modal>
        {listView ? (
          <MoldSetTableView moldsets={moldsets} />
        ) : (
          <MoldSetCardView moldsets={moldsets} />
        )}
      </div>
    </div>
  );
};

export default MoldSets;
