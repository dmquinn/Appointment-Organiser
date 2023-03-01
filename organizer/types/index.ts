import { MongoClient } from 'mongodb'

declare global {
  var _mongoClientPromise: Promise<MongoClient>
}

export interface DataItem {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: "datePicker" | "text";
  record: DataItem;
  index: number;
  children: React.ReactNode;
}

export interface DataType {
  key: React.Key;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  _id: string | number;
  targetDate: string | Date;
  status: string;
  item: {
    title: string;
    category: string;
  };
  repairs: string;
}

