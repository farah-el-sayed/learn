import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import AIChat from '../components/AIChat.jsx';

// The full-page conversation view: layout lives on the Assistant page.
export function ThreadView({ thread, typing, onSend }) {useTranslation();
  return (
    <AIChat
      frame
      kicker="Learning companion"
      title={localizeText("What would you like to understand?")}
      messages={thread?.messages || []}
      typing={typing}
      onSend={onSend} />);


}
