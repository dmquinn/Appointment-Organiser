import { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Tag,
  Typography,
} from "antd";
import { TableProps } from "antd/lib/table";
// import Router from "next/router";

import data from "../json/data.json";
import "antd/dist/antd.css";
import { DataItem } from "../types";
import Router from "next/router";
import { CaretRightOutlined } from "@ant-design/icons";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: DataItem;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const App = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const [displayData, setDisplayData] = useState(data);
  const [pagination, setPagination] = useState({});
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: DataItem) => record.orderNo === editingKey;

  const edit = (record: Partial<DataItem> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.orderNo);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as DataItem;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.orderNo);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setDisplayData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setDisplayData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Order Number",
      dataIndex: "orderNo",
      key: "orderNo",
      width: "25%",
    },
    {
      title: "Item",
      dataIndex: ["item", "title"],
      width: "20%",
      key: "item",
      editable: "true",
    },
    {
      title: "customer",
      dataIndex: ["customer", "name"],
      width: "20%",
      key: "customer",
      editable: "true",
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
      editable: "true",
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
      editable: "true",
    },
    {
      title: "operation",
      dataIndex: "operation",
      key: "operation",
      render: (_: any, record: DataItem) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.orderNo)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: "",
      dataIndex: "link",
      width: "8%",
      key: "link",
      render: (_: any, record: DataItem) => {
        return (
          <span
            onClick={() => {
              if (record?.orderNo) {
                Router.push(`${record.orderNo}`);
              }
            }}
          >
            <CaretRightOutlined />
          </span>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataItem) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const handleTableChange: TableProps<any>["onChange"] = (pagination) => {
    setPagination(pagination);
  };

  return (
    <div>
      {/* <Table
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
      /> */}
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          onChange={handleTableChange}
          bordered
          rowKey="orderNo"
          dataSource={displayData}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={pagination}
        />
      </Form>
    </div>
  );
};

export default App;
