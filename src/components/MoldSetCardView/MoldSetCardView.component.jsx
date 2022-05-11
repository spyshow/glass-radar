import React from "react";
import { Card, List } from "antd";

import MoldStatus from "../../components/MoldStatus/MoldStatus.component";

export default function MoldSetCardView({ moldsets }) {
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
      dataSource={moldsets.data}
      renderItem={(moldset) => (
        <List.Item>
          <Card key={moldset.id} hoverable style={{ width: 240 }}>
            <Meta title={moldset.name} />
            Blanks {moldset.number_of_blanks}/Blows {moldset.number_of_blows}
            <MoldStatus moldStatus={moldset.moldStatus} />
          </Card>
        </List.Item>
      )}
    />
  );
}
