import { BotFrameworkAdapter, BotFrameworkAdapterSettings, TurnContext } from 'botbuilder';

const settings: BotFrameworkAdapterSettings = {
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
}

export const adapter = new BotFrameworkAdapter(settings);

adapter.onTurnError = async (context: TurnContext, error: Error) => {
  console.error(`\n [onTurnError] unhandled error: ${error}`);
  console.log('****** error print from bot *********', error);
  await context.sendTraceActivity(
    'OnTurnError Trace',
    `${error}`,
    'https://www.botframework.com/schemas/error',
    'TurnError'
  );
};
