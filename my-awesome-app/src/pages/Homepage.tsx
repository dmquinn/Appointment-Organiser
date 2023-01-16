import { useState, useEffect } from "react";
import {
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Table,
  Tag,
  Typography,
  Button,
} from "antd";
import { TableProps } from "antd/lib/table";
import moment from "moment";
// import data from "../json/data.json";
import "antd/dist/antd.css";
import { DataItem } from "../types";
import { CaretRightOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
// import Navbar from "../components/Navbar";
import AddModal from "./components/AddModal";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: "datePicker" | "text";
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
}) => (
  <td {...restProps}>
    {editing && inputType === "text" ? (
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
        <Input onChange={(e) => console.log(e.target.value)} />
      </Form.Item>
    ) : editing && inputType === "datePicker" ? (
      <DatePicker defaultValue={moment(record.targetDate)} />
    ) : (
      children
    )}
  </td>
);

const Homepage = ({ isConnected, orders }) => {
  const [displayData, setDisplayData] = useState();
  const [pagination, setPagination] = useState({});
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: DataItem) => record.orderNo === editingKey;
  const edit = (record: Partial<DataItem> & { key: React.Key }) => {
    form.setFieldsValue({
      item: "",
      customer: "",
      status: "",
      targetDate: "",
      ...record,
    });
    setEditingKey(record.orderNo);
  };
  useEffect(() => {
    setDisplayData(orders);
  }, [orders]);
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
      width: "20%",
    },
    {
      title: "Item",
      dataIndex: ["item", "title"],
      width: "20%",
      key: "item",
      editable: "true",
    },
    {
      title: "Customer",
      dataIndex: ["customer", "name"],
      width: "20%",
      key: "customer",
      editable: "true",
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        { text: "In Process", value: "in process" },
        { text: "Completed", value: "completed" },
        { text: "Rejected", value: "rejected" },
      ],
      onFilter: (value: string, record) => record.status.includes(value),
      width: "20%",
      editable: "true",
      render: (value) => (
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
      render: (date: string) => !!date && moment(date).format("DD/MM/YYYY"),
      sorter: (a, b) =>
        moment(a.targetDate).unix() - moment(b.targetDate).unix(),
    },
    {
      title: "Operation",
      dataIndex: "operation",
      key: "operation",
      render: (_, record: DataItem) => {
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
      render: (_, record: DataItem) => {
        return (
          <span className="proceed">
            <Link href={`/${record.orderNo}`} passHref>
              <CaretRightOutlined />
            </Link>
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
        inputType: col.dataIndex === "targetDate" ? "datePicker" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const handleTableChange: TableProps<any>["onChange"] = (pagination) => {
    setPagination(pagination);
  };
  const handleModal = () => {};
  return (
    <div style={{ padding: "50px" }}>
      {/* <Navbar /> */}
      <AddModal />
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
          dataSource={orders}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={pagination}
        />
      </Form>
    </div>
  );
};
export default Homepage;
