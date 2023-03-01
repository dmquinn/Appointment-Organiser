import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal } from "antd";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";
import { selectOrders } from "../../redux/ordersSlice";

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

const App: React.FC<Props> = ({ open, setOpen }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [dates, setDates] = useState([]);
  const items = useSelector(selectOrders);

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
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
  useEffect(() => {
    console.log(items.orders);
  }, [items]);

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
          onDrillDown={({ activeStartDate, view }) =>
            console.log("Drilled down to: ", activeStartDate, view)
          }
          onChange={() => console.log("change")}
          tileContent={({ date, view }) =>
            view === "month" && date.getDay() === 0 ? "s" : null
          }
        />{" "}
      </Modal>
    </>
  );
};

export default App;
