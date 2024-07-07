<<<<<<< HEAD
import rateLimit from 'express-rate-limit';

const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: 'Demasiadas solicitudes desde esta IP, por favor intente de nuevo después de 10 minutos'
});

export default rateLimiter;
=======
import rateLimit from 'express-rate-limit';

const loginRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutos
  max: 5,
  message: 'Demasiados intentos de inicio de sesión, por favor intente nuevamente más tarde.'
});

export default loginRateLimiter;
>>>>>>> 093d2a40d2abac1aebb4d0d0585656f3fd708929
