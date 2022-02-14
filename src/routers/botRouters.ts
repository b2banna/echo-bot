import { Router } from 'express';

import CONSTANTS from '../constants';
import BotController from '../controllers/botController';

export const botRouters = Router();
const botController = new BotController();

botRouters.post(CONSTANTS.ROUTER_PATH.INDEX, (...arg) => botController.messageHandler(...arg));

botRouters.get("/notify", (...arg) => botController.notifyMessageHandler(...arg));
