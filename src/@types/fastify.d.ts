// ficheiro que terá apenas as definições de tipos
import fastify from 'fastify';

// esta é uma forma de extender interfaces existentes
declare module 'fastify' {
  export interface FastifyRequest {
    user?: {
      sub: string;
      role: 'student' | 'manager';
    }
  }
}