import { ConversationReference, ConversationState, MemoryStorage, TurnContext, UserState } from 'botbuilder';
import { NextFunction, Request, Response } from 'express';
import { UserProfileDialog } from '../dialogs/userProfileDialog';

import { adapter } from '../helpers/botFrameworkAdapterHelper';
import { BotService } from '../services/botService';

const conversationReferences = {}; // save in db or file
export default class BotController {
  private _botService: BotService;

  constructor() {
    const memoryStorage = new MemoryStorage();

    // Create conversation state with in-memory storage provider.
    const conversationState = new ConversationState(memoryStorage);
    const userState = new UserState(memoryStorage);

    // Create the main dialog.
    const dialog = new UserProfileDialog(userState);
    this._botService = new BotService(conversationReferences, conversationState, userState, dialog);
  }

  async messageHandler(req: Request, res: Response, _next: NextFunction): Promise<void> {
    await adapter.process(req, res, (context: TurnContext) => this._botService.run(context));
  }

  async notifyMessageHandler(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    for (const conversationReference of Object.values(conversationReferences)) {
      const reference = conversationReference as Partial<ConversationReference>;
      adapter.continueConversation(reference, async (context: TurnContext): Promise<void> => {
        await context.sendActivity('proactive hello');
      });
    }
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.write('<html><body><h1>Proactive messages have been sent.</h1></body></html>');
    res.end();
  }
} 
