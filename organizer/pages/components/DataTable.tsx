import { useState, useEffect } from "react";
import { Form, Popconfirm, Table, Tag, Typography } from "antd";
import { TableProps } from "antd/lib/table";
import moment from "moment";
import "antd/dist/reset.css";
import { DataType } from "../../types";
import {
  CaretRightOutlined,
  CloseCircleOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Navbar from "./Navbar";
import AddModal from "./AddModal";
import { useDispatch } from "react-redux";
import { setOrders } from "../../redux/ordersSlice";
import { EditableCell } from "./EditableCell";

const DataTable = ({ isConnected, loadOrders }) => {
  const [displayData, setDisplayData] = useState();
  const [pagination, setPagination] = useState({});
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [expandedKey, setExpandedKey] = useState(null);

  const dispatch = useDispatch();

  // const onExpand = (_, { key }) =>
  //   expandedKey === key ? setExpandedKey(null) : setExpandedKey(key);
  const isEditing = (record: DataType) => record._id === editingKey;
  const edit = (record: Partial<DataType> & { key: React.Key }) => {
    form.setFieldsValue({
      item: "",
      customer: "",
      status: "",
      targetDate: "",
      ...record,
    });
    //@ts-ignore
    setEditingKey(record._id);
  };

  const getOrders = async () => {
    const response = await fetch(`http://localhost:3000/api/getOrders`);
    const data = await response.json();
    dispatch(setOrders(data));
    setDisplayData(data);
  };
  useEffect(() => {
    getOrders();
  }, []);
  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as DataType;

      let response = await fetch("http://localhost:3000/api/updateOrder", {
        method: "POST",
        body: JSON.stringify({
          row,
          key,
        }),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
      response = await response.json();

      setEditingKey("");
      {
        setEditingKey("");
      }
      getOrders();
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Order Number",
      dataIndex: "_id",
      key: "_id",
      width: "10%",
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
      render: (_, record: DataType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record._id)}
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
      render: (_, record: DataType) => {
        return (
          <span className="proceed">
            <Link href={`/${record._id}`} passHref>
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
      onCell: (record: DataType) => ({
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

  return (
    <div style={{ padding: "50px" }}>
      <Navbar />
      <AddModal refresh={loadOrders} />
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          onChange={handleTableChange}
          bordered
          dataSource={displayData}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={pagination}
          rowKey="_id"
          expandedRowRender={(record) => (
            <p style={{ margin: 0 }}>{record.comment}</p>
          )}
          expandIcon={({ expanded, onExpand, record }) =>
            expanded ? (
              <CloseCircleOutlined
                onClick={(e) => onExpand(record, e)}
                style={{ fontSize: "22px", color: "#969696" }}
              />
            ) : (
              <MessageOutlined
                onClick={(e) => onExpand(record, e)}
                style={{ fontSize: "22px", color: "#969696" }}
              />
            )
          }
        />
      </Form>
    </div>
  );
};
export default DataTable;
