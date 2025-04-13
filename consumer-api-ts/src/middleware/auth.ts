import { expressjwt, GetVerificationKey } from 'express-jwt';
import jwksRsa from 'jwks-rsa';

// Define the secret verification key from Azure AD
const secret: GetVerificationKey = jwksRsa.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksUri: process.env.AZURE_AD_JWKS_URI!,  // Azure AD JWKS URI
}) as GetVerificationKey;

const jwtCheck = expressjwt({
  secret,
  audience: process.env.AZURE_AD_AUDIENCE!,  // Azure AD Audience
  issuer: process.env.AZURE_AD_ISSUER!,    // Azure AD Issuer
  algorithms: ['RS256'],
});

export default jwtCheck;
