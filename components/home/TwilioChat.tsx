"use client";

import { useEffect, useRef, useState } from "react";
import {
  Client as ConversationsClient,
  Conversation,
  Client,
} from "@twilio/conversations";
import { initializeConversationsClient } from "@/constants/initializeSdk";
import { Send } from "iconsax-react";

export default function TwilioChat() {
  const [messages, setMessages] = useState<any[] | null>([]);
  const [input, setInput] = useState("");
  const convRef = useRef<Conversation | null>(null);

   const [client, setClient] = useState<Client| undefined>(undefined);

  useEffect(() => {
    async function setupClient() {
      const res = await fetch('/api/token?identity=user123');
      const { token } = await res.json();

      const twilioClient = await initializeConversationsClient(token);
      setClient(twilioClient);
    }

    setupClient();
  }, []);

  useEffect(() => {
    async function initChat() {
      const res = await fetch("/api/token");
      const { token } = await res.json();

      const client = new ConversationsClient(token); // ✅ updated way

      client.on("conversationJoined", (conv) => {
        convRef.current = conv;

        conv.on("messageAdded", (msg: any) => {
          if (messages === null) return;

          // setMessages((prev) => [ prev === null ? null : ...prev, , msg.body]);
          setMessages((prev) => [...(prev ?? []), msg.body]);
        });
      });

      let conversation;

      try {
        conversation = await client.getConversationByUniqueName("support-chat");
      } catch (err) {
        conversation = await client.createConversation({
          uniqueName: "support-chat",
        });
      }

      await conversation.join();
    }

    initChat();
  }, []);

  const sendMessage = async () => {
    if(messages === null) return
    setMessages([...messages, input])
    if (convRef.current && input.trim()) {
      await convRef.current.sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="fixed z-[999999999] bottom-10 right-10 p-2 px-4 rounded-xl shadow-lg w-[300px] bg-white ">
      <div className="flex w-full items-center justify-between">
      <h2 className="text-sm font-normal mb-2 text-[#474747]">Chat with Support</h2>
      <h2 className="text-lg font-normal mb-2 text-[#474747] h-10 w-10 flex items-center justify-center rounded-full hoverActiveGrey">x</h2>

      </div>
      <div className="h-64 overflow-y-auto p-2 bg-gray-100 rounded mb-4 scroll-vertical">
        {messages?.map((msg, idx) => (
          <p key={idx} className="text-sm text-gray-800 bg-white w-[80%] pl-4 py-2 rounded-full rounded-bl-none mb-4">
            {msg}
          </p>
        ))}
      </div>

      <div className="flex gap-2 border-t border-gray-100 pt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 bg-gray-50 rounded text-sm"
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white h-8 w-8 flex items-center justify-center rounded-full hoverActiveScale2"
        >
          <Send size="20" color="#fff" variant="Bold"/>
        </button>
      </div>
    </div>
  );
}
