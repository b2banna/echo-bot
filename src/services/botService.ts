import { Activity, ActivityHandler, MessageFactory, TurnContext } from 'botbuilder';

export class BotService extends ActivityHandler {
  constructor(conversationReferences: any) {
    super();

    // onConversationUpdate is called when conversation is updated.
    this.onConversationUpdate(async (context: TurnContext, next: () => Promise<void>): Promise<void> => {
      addConversationReference(context.activity);

      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });

    // onMessageHandler is called when a Member start a conversation with the bot.
    this.onMembersAdded(async (context: TurnContext, next: () => Promise<void>): Promise<void> => {
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

    // onMessageHandler is called when a Member sends a message to the bot.
    this.onMessage(async (context: TurnContext, next: () => Promise<void>): Promise<void> => {
      const replyText = `Echo: ${context.activity.text}`;
      await context.sendActivity(MessageFactory.text(replyText, replyText));

      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });

    const addConversationReference = (activity: Partial<Activity>): void => {
      const conversationReference = TurnContext.getConversationReference(activity);
      if (conversationReference.conversation?.id) {
        conversationReferences[conversationReference.conversation.id] = conversationReference;
      }
    }
  }

}
