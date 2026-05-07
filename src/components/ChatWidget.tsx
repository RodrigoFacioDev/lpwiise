"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./ChatWidget.module.css";

interface Message {
  role: "user" | "assistant";
  text: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Olá! Eu sou o assistente virtual do **Impact Hub**. Como posso ajudar você hoje?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize thread_id
  useEffect(() => {
    let savedId = sessionStorage.getItem("chat_thread_id");
    if (!savedId) {
      savedId = `thread_${Math.random().toString(36).substring(2, 15)}`;
      sessionStorage.setItem("chat_thread_id", savedId);
    }
    setThreadId(savedId);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          thread_id: threadId,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      const fullResponse = data.response;
      
      // Split response into paragraphs to avoid giant text blocks
      const parts = fullResponse
        .split("\n")
        .map((p: string) => p.trim())
        .filter((p: string) => p.length > 0);

      setIsLoading(false);

      // Add messages one by one with a delay to simulate typing
      for (let i = 0; i < parts.length; i++) {
        setIsLoading(true);
        
        // Dynamic delay based on length (15ms per char, min 600ms, max 1500ms)
        const delay = Math.min(Math.max(parts[i].length * 15, 600), 1500);
        await new Promise((resolve) => setTimeout(resolve, delay));
        
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: parts[i] },
        ]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Ops! Tive um problema para me conectar. Verifique se o serviço está ativo.",
        },
      ]);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  // Helper to render markdown-like bold text
  const formatText = (text: string) => {
    if (!text) return "";
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className={styles.container}>
      {/* Chat Window */}
      <div className={`${styles.window} ${isOpen ? styles.windowOpen : ""}`}>
        <div className={styles.header}>
          <div className={styles.avatar}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
          </div>
          <div className={styles.headerInfo}>
            <h3>Impact Hub Assistant</h3>
            <p>Sempre online para ajudar</p>
          </div>
          <button className={styles.closeButton} onClick={() => setIsOpen(false)} aria-label="Fechar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div className={styles.messages}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`${styles.message} ${msg.role === "user" ? styles.userMessage : styles.botMessage}`}>
              {formatText(msg.text)}
            </div>
          ))}
          {isLoading && (
            <div className={`${styles.message} ${styles.botMessage} ${styles.loading}`}>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputArea}>
          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              placeholder="Digite sua mensagem..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
          </div>
          <button 
            className={styles.sendButton} 
            onClick={handleSend} 
            disabled={isLoading || !input.trim()}
            aria-label="Enviar"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </button>
        </div>
      </div>

      {/* FAB */}
      <button className={styles.fab} onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Fechar chat" : "Abrir chat"}>
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}
      </button>
    </div>
  );
}
