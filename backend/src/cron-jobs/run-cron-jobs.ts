import cron from "node-cron";

export const startCronJobs = () => {
  cron.schedule("0 * * * *", async () => {
    // This job runs at the start of every hour
  });
};
