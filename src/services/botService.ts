import { ActivityHandler, MessageFactory, TurnContext } from 'botbuilder';

export class BotService extends ActivityHandler {
  constructor() {
    super();
    // onMessageHandler is called when a Member start a conversation with the bot.
    this.onMembersAdded(this.onMembersAddedHandler);

    // onMessageHandler is called when a Member sends a message to the bot.
    this.onMessage(this.onMessageHandler);
  }

  async onMembersAddedHandler(context: TurnContext, next: () => Promise<void>): Promise<void> {
    const membersAdded = context.activity.membersAdded || [];
    const welcomeText = 'Hello and welcome!';
    for (const member of membersAdded) {
      if (member.id !== context.activity.recipient.id) {
        await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
      }
    }

    // By calling next() you ensure that the next BotHandler is run.
    await next();
  }

  async onMessageHandler(context: TurnContext, next: () => Promise<void>): Promise<void> {
    const replyText = `Echo: ${context.activity.text}`;
    await context.sendActivity(MessageFactory.text(replyText, replyText));

    // By calling next() you ensure that the next BotHandler is run.
    await next();
  }
}
