import * as React from "react";
import { Table, Tag } from "antd";
import { TableProps } from "antd/lib/table";
import Router from "next/router";

import data from "../json/data.json";
import "antd/dist/antd.css";
import { DataItem } from "../types";

const { useState } = React;

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [displayData, setDisplayData] = useState(data);
  const [pagination, setPagination] = useState({});

  const columns = [
    {
      title: "Order Number",
      dataIndex: "orderNo",
      key: "orderNo",
    },
    {
      title: "Item",
      dataIndex: ["item", "title"],
      width: "20%",
      key: "item",
    },
    {
      title: "customer",
      dataIndex: ["customer", "name"],
      width: "20%",
      key: "customer",
    },
    {
      title: "status",
      dataIndex: "status",
      filters: [
        { text: "In Progress", value: "In Process" },
        { text: "Completed", value: "Completed" },
        { text: "Rejected", value: "Rejected" },
      ],
      width: "20%",
      render: (value, record) => (
        <Tag
          color={
            value === "completed"
              ? "success"
              : value === "rejected"
              ? "error"
              : "processing"
          }
        >
          {value}
        </Tag>
      ),
      key: "status",
    },
    {
      title: "Target Date",
      dataIndex: "targetDate",
      width: "20%",
      key: "targetDate",
    },
  ];

  const handleTableChange: TableProps<any>["onChange"] = (pagination) => {
    setPagination(pagination);
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={displayData}
        loading={isLoading}
        onChange={handleTableChange}
        pagination={pagination}
        rowKey="orderNo"
        onRow={(record: DataItem) => {
          return {
            onClick: () => {
              if (record?.orderNo) {
                Router.push(`${record.orderNo}`);
              }
            },
          };
        }}
      />
    </div>
  );
};

export default App;
