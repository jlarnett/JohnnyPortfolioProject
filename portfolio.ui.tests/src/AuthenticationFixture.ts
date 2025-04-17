import { randomUUID, generateKeyPairSync } from "crypto";
import jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';

class AuthBuilder {
    private _issuer: string = "johnnyarnett.com";
    private _audience: string = "https://localhost:7201";
    private _tokenIdentifier: string = randomUUID();
    private _subject: string = "";
    private _preferredUsername: string = "";
    private _email: string = "";
    private _name: string = "";
    private _oid: string = "";
    private _version: string = "2.0";
    private readonly _scopes: Set<string> = new Set<string>();
    private readonly _claims: Record<string, string> = {};

    /**
     * Add audience for the Authbuilder to use when generating mock token
     * @param audience - The user / local site https://localhost:7201 asking for token access
     * @constructor
     */
    WithAudience(audience: string): AuthBuilder {
        this._audience = audience;
        return this;
    }

    /**
     * Add email address we want associated with mock token to AuthBuilder. Might need to be specific to project / database
     * @param email - string representation of email address
     * @constructor
     */
    WithEmail(email: string): AuthBuilder {
        this._email = email;
        return this;
    }

    /**
     * Builds Mock JWT token using class properties and returns mock token string for use in Authorization HTTP header.
     * @constructor
     */
    BuildJwtToken(): string {
        interface JwtPayload {
            email: string;
            name: string;
            oid: string;
            ver: string;
            iat?: number;
            exp?: number;
            nbf?: number;
            preferred_username?: string;
        }

        const payload: JwtPayload = {

            email: this._email,
            name: this._name,
            ver: this._version,
            oid: this._oid,
            iat: Math.floor(Date.now() / 1000), 
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 10),
            preferred_username: this._preferredUsername,
        };

        const options: SignOptions = {
            jwtid: this._tokenIdentifier,
            subject: this._subject,
            issuer: this._issuer,
            audience: this._audience,
            algorithm: 'RS256',
            allowInvalidAsymmetricKeyTypes: true,
            allowInsecureKeySizes: true
        };

        const privateKey = this.generatePrivateKeyStub();
        const token = jwt.sign(payload, privateKey, options);
        return `Bearer ${token}`;
    }

    /**
     * Generates private key stub for use with authentication. Currently using RSA 2048 length
     */
    generatePrivateKeyStub(): string {
        const { privateKey } = generateKeyPairSync('rsa', {
            modulusLength: 2048,
        })
        return privateKey.export({
            format: 'pem',
            type: 'pkcs1',
        }) as string
    }




}
