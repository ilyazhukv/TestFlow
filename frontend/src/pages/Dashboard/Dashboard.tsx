import { useState, useEffect } from "react";
import type { Test } from "../../types/test";

import api from "../../api/api";

const Dashboard = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await api.get("/test");
        setTests(resp.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <h1>Loading</h1>;

  return (
    <>
      <h1>Dashboard</h1>
      {tests.map((test) => (
        <div key={test._id}>
          <h3>{test.title}</h3>
          <p>Create By {test.createdBy.name}</p>
        </div>
      ))}
    </>
  );
};

export default Dashboard;
