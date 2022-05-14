import React from "react";
import { Card, List } from "antd";

import MoldsStatus from "../../components/MoldsStatus/MoldsStatus.component";

export default function MoldSetCardView({ molds }) {
  const { Meta } = Card;
  return (
    <List
      grid={{
        gutter: 20,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 4,
        xxl: 5,
      }}
      dataSource={molds.data}
      renderItem={(mold) => (
        <List.Item>
          <Card key={mold.id} hoverable style={{ width: 240 }}>
            <Meta title={mold.name} />
            Blanks {mold.number_of_blanks}/Blows {mold.number_of_blows}
            <MoldsStatus moldStatus={mold.moldStatus} />
          </Card>
        </List.Item>
      )}
    />
  );
}
