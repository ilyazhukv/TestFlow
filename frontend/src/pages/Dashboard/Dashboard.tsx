import { useState, useEffect } from "react";
import { Card, CardActionArea, CardContent, Container, Typography } from "@mui/material";

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
    <Container sx={{display: "flex", justifyContent: "space-around"}}>
      {tests.map((test) => (
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {test.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {test.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Container>
  );
};

export default Dashboard;
