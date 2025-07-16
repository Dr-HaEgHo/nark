// frontend/chat.js or chat.tsx
import { Client as ConversationsClient } from '@twilio/conversations';

export async function initializeConversationsClient(jwtToken: any) {
  try {
    const client = await ConversationsClient.create(jwtToken);

    client.on('connectionStateChanged', (state) => {
      console.log('Connection state changed:', state);
    });

    client.on('conversationJoined', (conversation) => {
      console.log('Joined conversation:', conversation.friendlyName);

      conversation.on('messageAdded', (message) => {
        console.log('New message:', message.body);
      });
    });

    return client;
  } catch (err) {
    console.error('Twilio Conversations Client error:', err);
  }
}
