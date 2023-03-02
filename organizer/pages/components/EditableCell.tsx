import { DatePicker, Form, Input } from "antd";
import { DataType } from "../../types";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: "datePicker" | "text";
  record: DataType;
  index: number;
  children: React.ReactNode;
}

export const EditableCell: React.FC<EditableCellProps> = ({
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
      <DatePicker />
    ) : (
      children
    )}
  </td>
);
