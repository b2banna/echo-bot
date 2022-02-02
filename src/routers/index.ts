// Export all routers
import { Router } from 'express';

import CONSTANTS from '../constants';
import { botRouters } from './botRouters';

export const routers = Router();

routers.use(CONSTANTS.ROUTER_PATH.BOT_WEBHOOK, botRouters);
