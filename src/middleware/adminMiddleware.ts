import { Request, Response, NextFunction } from "express";

const roleMiddleware =(requiredRole: 'user' | 'admin') => (req: Request, res: Response, next: NextFunction) => {
    
     const user = req.user as {id: string; role: string} | undefined
    
    if (!user || user.role !== requiredRole) {
      return res.status(403).json({ message: "Access forbidden" });
    }
    
    next();
  };

export default roleMiddleware;