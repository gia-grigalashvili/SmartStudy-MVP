

export default function Dashboard() {
  const { data, error, isLoading } = useGetdashboard();

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error("Dashboard fetch error:", error);
    return <div>Error loading dashboard</div>;
  }

  console.log("Dashboard data:", data); // 👈 აქ უკვე დაინახავ პასუხს console-ში

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
