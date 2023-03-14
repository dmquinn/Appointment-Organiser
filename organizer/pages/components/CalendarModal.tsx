import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal } from "antd";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";
import { selectOrders } from "../../redux/ordersSlice";
import moment from "moment";

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

const App: React.FC<Props> = ({ open, setOpen }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [modalText, setModalText] = useState("Content of the modal");
  const [dates, setDates] = useState([]);
  const items = useSelector(selectOrders);

  const handleOk = () => {
    // setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Calendar
          tileClassName={({ date }) => {
            if (
              items.orders[0].find(
                (x: { targetDate: string }) =>
                  x.targetDate === moment(date).format("YYYY-MM-DD")
              )
            ) {
              return "highlight";
            }
          }}
          tileContent={({ date }) => {
            console.log(date);
            if (
              items.orders[0].find(
                (x: { targetDate: string }) =>
                  x.targetDate === moment(date).format("YYYY-MM-DD")
              )
            ) {
              // return <p>{date}</p>;
            }
          }}
          tileDisabled={({ date }) => date.getDay() === 0}
        ></Calendar>
      </Modal>
    </>
  );
};

export default App;
