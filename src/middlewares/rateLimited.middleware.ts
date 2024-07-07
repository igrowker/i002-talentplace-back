import rateLimit from 'express-rate-limit';

const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: 'Demasiadas solicitudes desde esta IP, por favor intente de nuevo después de 10 minutos'
});

export default rateLimiter;