import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import React, { useState } from "react";
import data from "../json/data.json";

interface Item {
  orderNo: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  item: {
    title: string;
    category: string;
  };
  status: string;
  target_date: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
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

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  // const useAppDispatch: () => AppDispatch = useDispatch;
  // const dispatch = useAppDispatch();

  // const appointmentsState = useSelector((state: RootState) => {
  //     state.appointmentsData;
  // });
  // useEffect(() => {
  //     dispatch(appointmentsActions.getAppointments());
  // }, [dispatch]);

  const isEditing = (record: Item) => record.orderNo === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ item: "", customer: "", category: "", ...record });
    setEditingKey(record.orderNo);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Order Number",
      dataIndex: "item",
      width: "25%",
      editable: true,
    },
    {
      title: "Item",
      dataIndex: "item",
      width: "20%",
      editable: true,
    },
    {
      title: "customer",
      dataIndex: "customer",
      width: "15%",
      editable: true,
    },
    {
      title: "category",
      dataIndex: "status",
      width: "15%",
      editable: true,
    },
    {
      title: "status",
      dataIndex: "status",
      width: "15%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
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
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        // pagination={{
        //     onChange: cancel
        // }}
      />
    </Form>
  );
};

export default App;
