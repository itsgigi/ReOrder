export interface ExpensesByCategory {
    salaries: number;
    supplies: number;
    services: number;
  }
  
  export interface Month {
    id: string;
    month: string;
    revenue: number;
    expenses: number;
    nonOperationalExpenses: number;
    operationalExpenses: number;
  }
  
  export interface Day {
    id: string;
    date: string;
    revenue: number;
    expenses: number;
  }

  export interface Product {
    _id: string,
    name: string,
    price: string,
    company: string,
    transactions: string[]
  }

  export interface Waiter {
    name: string;
    workingDates: Date[];
  }

  export interface GetWaiterResponse {
    name: string;
    workingDates: Date[];
  }
  
  export interface GetKpisResponse {
    id: string;
    _id: string;
    __v: number;
    totalProfit: number;
    totalRevenue: number;
    totalExpenses: number;
    expensesByCategory: ExpensesByCategory;
    monthlyData: Array<Month>;
    dailyData: Array<Day>;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface GetProductsResponse {
    id: string;
    _id: string;
    __v: number;
    price: number;
    company: string;
    transactions: Array<string>;
    createdAt: string;
    updatedAt: string;
    quantity?: number;
  }

  export interface GetCompanyResponse {
    name: string;
    orderDate: string;
    deliveryDate: string;
  }

  export interface GetEventResponse {
    name: string;
    date: Date;
    pax: number;
    price: number;
    menu: string;
  }
  
  export interface GetTransactionsResponse {
    id: string;
    _id: string;
    __v: number;
    buyer: string;
    amount: number;
    productIds: Array<string>;
    createdAt: string;
    updatedAt: string;
  }