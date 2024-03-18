import SQLite from 'react-native-sqlite-storage';
import moment from 'moment';
import {MenuType} from '../types/menu';
import {BillingData} from '../types/billing';
import {PaymentType} from '../types/payment';

const openDB = async () => {
  SQLite.enablePromise(true);
  var db = await SQLite.openDatabase({
    name: 'BPS',
  });
  return db;
};

const getTransaction = async (): Promise<SQLite.Transaction> => {
  try {
    const db = await openDB();
    return new Promise<SQLite.Transaction>((resolve, reject) => {
      db.transaction(async tx => {
        if (tx) return resolve(tx);
        else return reject();
      });
    });
  } catch (e) {
    throw e;
  }
};

const createMenuTable = async () => {
  const tx = await getTransaction();
  return await tx.executeSql(
    'CREATE Table IF NOT EXISTS menu_table  (' +
      ' item_id INTEGER primary key ,' +
      ' item_name varchar(255),' +
      ' price int' +
      ')',
    [],
  );
};
const createOrderTable = async () => {
  const tx = await getTransaction();
  return await tx.executeSql(
    'CREATE Table IF NOT EXISTS order_table  (' +
      ' order_id INTEGER primary key ,' +
      ' date timestamp,' +
      ' amount int, ' +
      ' payment_mode int' +
      ')',
    [],
  );
};

const createOrderDetailsTable = async () => {
  const tx = await getTransaction();
  return await tx.executeSql(
    'CREATE Table IF NOT EXISTS order_details  (' +
      ' id INTEGER primary key ,' +
      ' order_id int,' +
      ' item_id int,' +
      ' item_name varchar(255) ,' +
      ' quantity int,' +
      ' amount int' +
      ')',
    [],
  );
};

const createDB = async () => {
  try {
    await createMenuTable();
    console.log('TRANSACTION 1');
    await createOrderTable();
    console.log('TRANSACTION 2');
    await createOrderDetailsTable();
    console.log('TRANSACTION 3');
  } catch (e) {
    console.error('createDB', e);
  }
};

const getMenu = async (): Promise<MenuType[] | undefined> => {
  try {
    const tx = await getTransaction();
    const [tx2, results] = await tx.executeSql('Select * from menu_table;', []);
    return results.rows.raw() as MenuType[];
  } catch (e) {
    console.error('ERROR', e);
  }
};
const addMenuItem = async (item: MenuType) => {
  try {
    const tx = await getTransaction();
    const [tx2, results] = await tx.executeSql(
      `insert into menu_table (item_name,price) values ('${item.item_name}','${item.price}')`,
      [],
    );
    return results.rows.raw();
  } catch (e) {
    console.error('ERROR', e);
  }
};
const updateMenuItem = async (item: MenuType) => {
  try {
    const tx = await getTransaction();
    const [tx2, results] = await tx.executeSql(
      `update menu_table set item_name = '${item.item_name}',price = '${item.price}' where item_id = ${item.item_id}`,
      [],
    );
    return results.rows.raw();
  } catch (e) {
    console.error('ERROR', e);
  }
};
const deleteMenuItem = async (item: MenuType) => {
  try {
    const tx = await getTransaction();
    const [tx2, results] = await tx.executeSql(
      `delete from menu_table where item_id = ${item.item_id}`,
      [],
    );
    return results.rows.raw();
  } catch (e) {
    console.error('ERROR', e);
  }
};

const createOrder = async (items: BillingData[], paymentType: PaymentType) => {
  try {
    const tx = await getTransaction();
    const amount = items.reduce((prev, item) => {
      return prev + item.price * item.quantity;
    }, 0);
    const [tx2, results] = await tx.executeSql(
      `insert into order_table (date,amount,payment_mode) values ('${moment().format(
        'YYYY-MM-DD HH:mm:ss',
      )}','${amount}',${parseInt(paymentType)})`,
      [],
    );
    const orderId = results.insertId;
    for (let i = 0; i < items.length; i++) {
      const transaction = await getTransaction();
      const [tx3, results] = await transaction.executeSql(
        `insert into order_details (order_id,item_id,item_name,quantity,amount) values ('${orderId}','${
          items[i].item_id
        }','${items[i].item_name}','${items[i].quantity}','${
          items[i].quantity * items[i].price
        }')`,
        [],
      );
    }
  } catch (e) {
    console.error('ERROR', e);
  }
};

interface ReportData {
  total: number;
  amount: number;
}

const getReportByDateAndPaymentType = async (
  startDate: string,
  endDate: string,
  payment: PaymentType,
) => {
  try {
    const tx = await getTransaction();
    const [_, results] = await tx.executeSql(
      `select count(*) as total , sum(amount) as amount from order_table where strftime('%m/%d/%Y',date) >= '${startDate}' and strftime('%m/%d/%Y',date) <= '${endDate}'  and payment_mode = ${payment}`,
      [],
    );
    console.log('results', results.rows.raw()[0]);
    return results.rows.raw()[0] as ReportData;
  } catch (e) {
    console.error('ERROR', e);
    throw e;
  }
};

export interface DayReport {
  upi: ReportData;
  cash: ReportData;
}

const getReports = async (startDate: string,endDate: string): Promise<DayReport> => {
  try {
    const upi = await getReportByDateAndPaymentType(startDate,endDate, PaymentType.UPI);
    const cash = await getReportByDateAndPaymentType(startDate,endDate, PaymentType.CASH);
    return {
      upi,
      cash,
    };
  } catch (e) {
    console.error('ERROR', e);
    throw e;
  }
};

export interface ReportsDetails {
  item_id: number;
  item_name: string;
  itemCount: number;
  totalAmount: number;
}

const getDetailedReportByDate = async (
  startDate: string,
  endDate: string
): Promise<ReportsDetails[]> => {
  try {
    const tx = await getTransaction();
    const [_, results] = await tx.executeSql(
      `select item_id,item_name,sum(quantity) as itemCount,sum(amount) as totalAmount from order_details where  order_id in (  select order_id  from order_table where strftime('%m/%d/%Y',date) >= '${startDate}' and strftime('%m/%d/%Y',date) <= '${endDate}'  ) group by item_id order by itemCount DESC`,
      [],
    );
    console.log("results.rows.raw()",results.rows.raw())
    return results.rows.raw() as ReportsDetails[];
  } catch (e) {
    console.error('ERROR', e);
    throw e;
  }
};

export const SQL = {
  createDB,
  getMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  createOrder,
  getReports,
  getDetailedReportByDate,
};
