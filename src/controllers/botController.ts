import { TurnContext } from 'botbuilder';
import { NextFunction, Request, Response } from 'express';

import { botFrameworkAdapter } from '../helpers/botFrameworkAdapterHelper';
import { BotService } from '../services/botService';

export default class BotController {
  private _botService: BotService;

  constructor() {
    this._botService = new BotService();
  }

  async messageHandler(req: Request, res: Response, _next: NextFunction): Promise<void> {
    await botFrameworkAdapter.process(req, res, (context: TurnContext) => this._botService.run(context));
  }
} 
