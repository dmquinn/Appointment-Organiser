import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Button, Modal, Form, Input, Radio } from "antd";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import { DataType } from "../../types";

interface Props {
  refresh: Dispatch<SetStateAction<undefined>>;
}

const AddModal: React.FC<Props> = ({ refresh }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<DataType>({
    status: "in process",
    key: null,
    orderNo: null,
    customer: { name: null, email: null, phone: null },
    item: { title: null, category: null },
    targetDate: null,
    repairs: null,
  });
  const [error, setError] = useState("");

  const onDateChange = (date, dateString) => {
    setData({ ...data, targetDate: dateString });
  };
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const showModal = () => {
    setOpen(true);
  };
  const { TextArea } = Input;

  const handleOk = async (e: any) => {
    e.preventDefault();
    if (data) {
      try {
        let response = await fetch("http://localhost:3000/api/addOrder", {
          method: "POST",
          body: JSON.stringify({
            data,
          }),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        });
        response = await response.json();
        setData(null);
        setOpen(false);
        refresh(null);
      } catch (errorMessage: any) {
        setError(errorMessage);
      }
    } else {
      return setError("Something went wrong");
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{
          padding: "5px",
          marginBottom: "10px",
          backgroundColor: "#88d2fc",
          border: "none",
        }}
      >
        Add New Field
      </Button>
      <Modal open={open} title="Title" onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h4 style={{ borderBottom: "1px solid #dedede", padding: "10px" }}>
            Customer Details
          </h4>
          <Form.Item
            label="name"
            name="name"
            rules={[{ required: true, message: "Please input user's name!" }]}
          >
            <Input
              onChange={(e) =>
                setData({
                  ...data,
                  customer: { ...data.customer, name: e.target.value },
                })
              }
            />
          </Form.Item>
          <Form.Item
            label="email"
            name="email"
            rules={[{ required: true, message: "Please input user's email!" }]}
          >
            <Input
              onChange={(e) =>
                setData({
                  ...data,
                  customer: { ...data.customer, email: e.target.value },
                })
              }
            />
          </Form.Item>
          <Form.Item
            label="phone number"
            name="phoneNo"
            rules={[
              { required: true, message: "Please input user's phone number!" },
            ]}
          >
            <Input
              onChange={(e) =>
                setData({
                  ...data,
                  customer: { ...data.customer, phone: e.target.value },
                })
              }
            />
          </Form.Item>
          <h4 style={{ borderBottom: "1px solid #dedede", padding: "10px" }}>
            Item Details
          </h4>
          <Form.Item
            label="title"
            name="title"
            rules={[{ required: true, message: "Please input a title" }]}
          >
            <Input
              onChange={(e) =>
                setData({
                  ...data,
                  item: { ...data.item, title: e.target.value },
                })
              }
            />
          </Form.Item>
          <Form.Item
            label="category"
            name="category"
            rules={[{ required: true, message: "Please input a category" }]}
          >
            <Radio.Group
              onChange={(e) =>
                setData({
                  ...data,
                  item: { ...data.item, category: e.target.value },
                })
              }
            >
              <Radio value="amplifiers"> Amplifiers </Radio>
              <Radio value="guitars"> Guitars </Radio>
              <Radio value="microphones"> Microphones </Radio>
              <Radio value="other"> Other </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="target date"
            name="targetDate"
            rules={[{ required: true, message: "Please input a target date" }]}
          >
            <DatePicker onChange={onDateChange} />{" "}
          </Form.Item>
          <Form.Item
            label="repairs necessary"
            name="repairs"
            rules={[{ required: true, message: "Please input a repair" }]}
          >
            <TextArea
              rows={4}
              placeholder="Please enter repairs necessary for this equipment"
              onChange={(e) =>
                setData({
                  ...data,
                  repairs: e.target.value,
                })
              }
            />
          </Form.Item>
        </Form>{" "}
      </Modal>
    </>
  );
};

export default AddModal;
