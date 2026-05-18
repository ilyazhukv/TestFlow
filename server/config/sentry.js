import Sentry, { init } from '@sentry/node';

init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV || 'development',
});

export default Sentry;