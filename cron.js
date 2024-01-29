import cron from 'node-cron'
import request from "./request.js";

function setupCronJob() {
    const interval = '0 */30 * * * *'

    return cron.schedule(interval, async () => {
        request()
    });
}
function stop(scheduledTask) {
    let timeout = 8 * 60 * 60 * 1000;

    setTimeout(() => {
      scheduledTask.stop()
    }, timeout)
}
export default function main () {
    let scheduledTask = setupCronJob()

    scheduledTask.start()
    stop(scheduledTask)
}
