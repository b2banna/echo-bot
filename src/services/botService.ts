import { ActivityHandler, MessageFactory, TurnContext } from 'botbuilder';

export class BotService extends ActivityHandler {
  constructor() {
    super();

    this.onMembersAdded(async (context: TurnContext, next) => {
      const membersAdded = context.activity.membersAdded || [];
      const welcomeText = 'Hello and welcome!';
      for (const member of membersAdded) {
        if (member.id !== context.activity.recipient.id) {
          await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
        }
      }

      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });

    this.onMessage(async (context, next) => {
      const replyText = `Echo: ${context.activity.text}`;
      await context.sendActivity(MessageFactory.text(replyText, replyText));

      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });
  }
}
