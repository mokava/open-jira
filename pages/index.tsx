import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import { Layout } from "../components/layouts";
import { EntryList, AddingModal } from "../components/ui";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useContext } from "react";
import { UIContext } from "../context/ui";

const HomePage: NextPage = () => {
  const { addingTask } = useContext(UIContext);
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Pendientes" />
            <CardContent>
              <EntryList status="pending" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="En Progreso" />
            <CardContent>
              <EntryList status="in-progress" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Completadas" />
            <CardContent>
              <EntryList status="finished" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "success.main",
        }}
        onClick={addingTask}
      >
        <AddRoundedIcon />
      </IconButton>
      <AddingModal />
    </Layout>
  );
};

export default HomePage;
