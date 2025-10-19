import { useGetDashboard } from "@/libs/queries/student";


export default function Dashboard() {
  u

 const { data, error, isLoading } = useGetDashboard("");

  return (
    <div>
      <h1>Dashboard</h1>
     
    </div>
  );
}
