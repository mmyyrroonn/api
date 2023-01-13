import {NextFunction, Request, Response} from 'express';
import { DB_NAME } from '../config';
import { loadDB } from '../db';

export async function withDbReady(fn: Function, next: NextFunction) {
  try {
    const db = await loadDB(DB_NAME);
    if (db === null) {
      next(new Error(`{
        statusCode: 500,
        message: 'Load database:${DB_NAME} failed.',
      }`));
      return;
    }
    await fn(db);
    next();
  } catch (e: any) {
    next(e);
  }
}
