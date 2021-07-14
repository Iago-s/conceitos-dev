import { Request, Response } from 'express';

import {createUser, updateUser} from './services/User';

export function create(req: Request, res: Response) {
  const { name, email, password } = req.body;

  const user = createUser({
    name,
    email, 
    password,
  });

  return res.status(201).json({user});
}

export function update(req: Request, res: Response) {
  const { id } = req.params;
  const { name} = req.body;

  const user = updateUser({ name });
  
  return res.status(200).json({user});
}