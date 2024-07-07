import rateLimit from 'express-rate-limit';

const loginRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutos
  max: 5,
  message: 'Demasiados intentos de inicio de sesión, por favor intente nuevamente más tarde.'
});

export default loginRateLimiter;