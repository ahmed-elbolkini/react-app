import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerTable from "./components/CustomerTable";
import TransactionGraph from "./components/TransactionGraph";

const App = () => {
  const [data, setData] = useState({ customers: [], transactions: [] });
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/customers")
      .then((response) =>
        setData((prevData) => ({ ...prevData, customers: response.data }))
      )
      .catch((error) => console.error("Error fetching customers:", error));

    axios
      .get("http://localhost:3001/transactions")
      .then((response) =>
        setData((prevData) => ({ ...prevData, transactions: response.data }))
      )
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div className="App">
      <h1>Customer Transactions</h1>
      <CustomerTable
        customers={data.customers}
        transactions={data.transactions}
        onCustomerSelect={handleCustomerSelect}
      />
      {selectedCustomer && (
        <TransactionGraph
          transactions={data.transactions.filter(
            (txn) => txn.customer_id === selectedCustomer.id
          )}
        />
      )}
    </div>
  );
};

export default App;
