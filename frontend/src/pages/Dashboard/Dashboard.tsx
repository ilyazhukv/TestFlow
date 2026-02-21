import { useState, useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import type { Test } from "../../types/test";

import api from "../../api/api";
const API_URL = import.meta.env.VITE_API_URL

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
    <Container>
      <Grid container spacing={3}>
        {tests.map((test) => (
          <Grid key={test._id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={`${API_URL}${test.testImage}`}
                  alt="Test image"
                />
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
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
