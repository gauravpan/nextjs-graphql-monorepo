import { Button } from "ui";
import DashboardLayout from "../../layouts/Dashboard.layout";
import { AppPage } from "../../types";

const Dashboard: AppPage = () => {
  return <div>empty</div>;
};

Dashboard.getLayout = (page) => (
  <DashboardLayout title="Dashboard"> {page}</DashboardLayout>
);
export default Dashboard;
