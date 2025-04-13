import { expressjwt, GetVerificationKey } from 'express-jwt';
import jwksRsa from 'jwks-rsa';

const jwtCheck = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksUri: process.env.AZURE_AD_JWKS_URI!,
  }) as GetVerificationKey, // 👈 Type assertion here
  audience: process.env.AZURE_AD_AUDIENCE!,
  issuer: process.env.AZURE_AD_ISSUER!,
  algorithms: ['RS256'],
});

export default jwtCheck;
