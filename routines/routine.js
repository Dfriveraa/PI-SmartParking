const trigger = require("../database/trigger");

const CronJob = require("cron").CronJob;
// const job = new CronJob('0 0 23 * * 6',()=> {
const job = new CronJob("0 * * * * *", () => {
  trigger.generateStatistics();
  console.log("Statistics generated");
});
job.start();
console.log(job);
