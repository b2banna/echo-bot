import { Activity, ActivityHandler, BotState, ConversationState, MessageFactory, StatePropertyAccessor, TurnContext, UserState } from 'botbuilder';
import { Dialog, DialogState } from 'botbuilder-dialogs';
import { UserProfileDialog } from '../dialogs/userProfileDialog';

export class BotService extends ActivityHandler {
  private conversationState: BotState;
  private userState: BotState;
  private dialog: Dialog;
  private dialogState: StatePropertyAccessor<DialogState>;

  constructor(conversationReferences: any, conversationState: BotState, userState: BotState, dialog: Dialog) {
    super();
    if (!conversationState) throw new Error('[DialogBot]: Missing parameter. conversationState is required');
    if (!userState) throw new Error('[DialogBot]: Missing parameter. userState is required');
    if (!dialog) throw new Error('[DialogBot]: Missing parameter. dialog is required');

    this.conversationState = conversationState as ConversationState;
    this.userState = userState as UserState;
    this.dialog = dialog;
    this.dialogState = this.conversationState.createProperty('DialogState');

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
      // Run the Dialog with the new message Activity.
      await (this.dialog as UserProfileDialog).run(context, this.dialogState);

      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });

    this.onDialog(async (context, next) => {
      // Save any state changes. The load happened during the execution of the Dialog.
      await this.conversationState.saveChanges(context, false);
      await this.userState.saveChanges(context, false);
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
