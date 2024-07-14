import React, { useState } from "react";

const CustomerTable = ({ customers, transactions, onCustomerSelect }) => {
  const [filterName, setFilterName] = useState("");
  const [filterAmount, setFilterAmount] = useState("");

  const filteredTransactions = transactions.filter((transaction) => {
    const customer = customers.find((c) => c.id === transaction.customer_id);
    return (
      (!filterName ||
        customer.name.toLowerCase().includes(filterName.toLowerCase())) &&
      (!filterAmount || transaction.amount >= filterAmount)
    );
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by customer name"
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Filter by transaction amount"
        value={filterAmount}
        onChange={(e) => setFilterAmount(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => {
            const customer = customers.find(
              (c) => c.id === transaction.customer_id
            );
            return (
              <tr
                key={transaction.id}
                onClick={() => onCustomerSelect(customer)}
              >
                <td>{customer.name}</td>
                <td>{transaction.date}</td>
                <td>{transaction.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
