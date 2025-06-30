import React, { useState } from 'react';

const Dashboard = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl mb-4">Counter App</h1>
        <h2 className="text-2xl mb-4">Count: {count}</h2>
        <button
          onClick={increment}
          className="bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Increment
        </button>
        <button
          onClick={decrement}
          className="bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded"
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Dashboard;