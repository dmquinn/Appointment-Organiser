export type DataItem = {
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
  targetDate: string | Date;
};
