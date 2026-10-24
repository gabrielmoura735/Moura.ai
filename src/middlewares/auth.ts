import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../config/index.js';
import { DB } from '../db/index.js';
import { UserRole } from '../models/index.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    planId: string;
  };
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Para simplificar a experiência inicial no frontend local, se não passar token, utiliza usuário demo padrão
    const demo = DB.findUserByEmail('demo@moura.ai');
    if (demo) {
      req.user = {
        id: demo.id,
        email: demo.email,
        name: demo.name,
        role: demo.role,
        planId: demo.planId
      };
      next();
      return;
    }
    res.status(401).json({ error: 'Token de autenticação não fornecido ou inválido.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded: any = jwt.verify(token, CONFIG.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token expirado ou inválido.' });
  }
}

export function requireRole(allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403).json({ error: 'Acesso negado: permissões insuficientes para esta operação.' });
      return;
    }
    next();
  };
}
