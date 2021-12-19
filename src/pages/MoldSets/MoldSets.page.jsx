import React from "react";
import { PageHeader, Button, Skeleton, Modal, Card, List } from "antd";
import MoldStatus from "../../components/MoldStatus/MoldStatus.component";
import { useFind } from "figbird";

import "./MoldSets.styles.css";

const MoldSets = () => {
  const { Meta } = Card;
  const moldsets = useFind("moldsets", {
    realtime: "refetch",
    fetchPolicy: "network-only",
  });
  if (moldsets.status !== "success") {
    return <Skeleton active />;
  }

  return (
    <div>
      <PageHeader
        ghost={true}
        title="Mold Sets"
        subTitle="Mold Sets Overview"
        extra={[
          <Button key="1" type="primary" onClick={() => {}}>
            Add Line
          </Button>,
        ]}
      ></PageHeader>
      <div className="mold-sets-container">
        <List
          grid={{
            gutter: 40,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={moldsets.data}
          renderItem={(moldset) => (
            <List.Item>
              <Card key={moldset.id} hoverable style={{ width: 240 }}>
                <Meta title={moldset.name} />
                Blanks {moldset.number_of_blanks}/Blows{" "}
                {moldset.number_of_blows}
                <MoldStatus moldStatus={moldset.moldStatus} />
              </Card>
            </List.Item>
          )}
        />

       
      </div>
    </div>
  );
};

export default MoldSets;
