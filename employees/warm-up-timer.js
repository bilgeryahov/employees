// In seconds
const WARM_UP_TIME = 10;

// Warm-up for the Vue local server during the CI process.
 
setTimeout(() => process.exit(0), WARM_UP_TIME * 1000);