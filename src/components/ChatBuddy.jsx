import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  Sparkles, 
  ChevronRight,
  User,
  CheckCircle2
} from 'lucide-react';

const KNOWLEDGE_BASE = [
  {
    triggers: ['motofix', 'moto', 'ecommerce', 'motorcycle', 'parts'],
    reply: "MotoFix is Earl's motorcycle parts and services platform! Built with Node.js, Express.js, and MySQL, it features product browsing, shopping cart, customer accounts, administrative order management, and responsive inventory displays."
  },
  {
    triggers: ['burgerbites', 'burger', 'flutter', 'dart', 'mobile', 'app'],
    reply: "BurgerBites is Earl's Flutter and Dart food-ordering app connected to a PHP and MySQL API."
  },
  {
    triggers: ['pharmacare', 'pharma', 'nextjs', 'next', 'typescript'],
    reply: "PharmaCare is a healthcare portal built with Next.js and TypeScript."
  },
  {
    triggers: ['streetfood', 'java 21', 'swing', 'flatlaf', 'kiosk'],
    reply: "StreetFood is a Java 21 desktop ordering system built with FlatLaf Swing."
  },
  {
    triggers: ['hitohouse', 'hito', 'catfish', 'food', 'spring boot'],
    reply: "HitoHouse is a dedicated online food ordering system for a local commercial catfish business. Earl built the frontend using clean HTML, CSS, and Vanilla JS, and engineered the backend REST APIs with Java Spring Boot and MySQL."
  },
  {
    triggers: ['barbergo', 'coffee', 'freelancer', 'client'],
    reply: "BarberGo is a client landing page for a barbershop, built as a responsive web project."
  },
  {
    triggers: ['version 1', 'v1', 'svgportfolio', 'versions'],
    reply: "Portfolio Version 1 is Earl's original SVG-animated interactive portfolio (earl146.github.io/svgportfolio) built with custom vector animations. This current portfolio is Version 2, rebuilt with Three.js 3D WebGL and production-ready architecture!"
  },
  {
    triggers: ['cert', 'certification', 'tesda', 'opswat', 'pycon', 'ghl'],
    reply: "The portfolio shows six certificate records: TESDA Visual Graphic Design, OPSWAT ICIP, OPSWAT OCFA, PyCon Davao participation, Full Stack Web Development + AI Level 0, and a GoHighLevel workshop."
  },
  {
    triggers: ['stack', 'tech', 'technologies', 'skills', 'language', 'tools'],
    reply: "Earl's core stack includes responsive HTML5, CSS3, and JavaScript; Java 21 and Spring Boot; Node.js and Express; PHP; MySQL and phpMyAdmin; and Flutter with Dart."
  },
  {
    triggers: ['hire', 'freelance', 'available', 'job', 'work', 'rates'],
    reply: "Earl is open for full-stack and freelance projects. He is based in Compostela, Davao de Oro, Philippines (GMT+8). You can send a note through the contact section or email earlypajo@gmail.com."
  },
  {
    triggers: ['contact', 'email', 'reach', 'message'],
    reply: "You can email Earl directly at earlypajo@gmail.com, or check his GitHub at github.com/EARL146. You can also fill out the contact form right below on this page!"
  },
  {
    triggers: ['deploy', 'hosting', 'cloud', 'online'],
    reply: "This portfolio is pre-configured for production cloud deployment! It includes optimized SPA routing and compiles into clean static assets with `npm run build` for fast, reliable hosting across modern cloud and web platforms."
  },
  {
    triggers: ['n8n', 'automation', 'ai integration'],
    reply: "n8n and AI integrations are foundational and exploratory workflows for Earl. His main focus is full-stack web development, backend applications, databases, and mobile apps."
  }
];

export default function ChatBuddy() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hey! I'm EarlBot, Earl's portfolio guide. Ask about MotoFix, BurgerBites, PharmaCare, Java projects, the certificate gallery, or Portfolio V1 and V2."
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const quickChips = [
    "Tell me about BurgerBites (Flutter)",
    "What is PharmaCare?",
    "Tell me about StreetFood (Java 21)",
    "Compare Portfolio V1 vs V2",
    "What are your 6 certifications?"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (userText) => {
    const text = (userText || inputVal).trim();
    if (!text) return;

    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let match = KNOWLEDGE_BASE.find((k) => k.triggers.some((t) => lower.includes(t)));

      let responseText = match 
        ? match.reply 
        : `Thanks for asking! Earl focuses on full-stack web development, Flutter apps, Java projects, and MySQL databases. n8n and AI workflows are exploratory. You can email him at earlypajo@gmail.com.`;

      setMessages((prev) => [...prev, { sender: 'bot', text: responseText }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="chat-buddy-container">
      {/* Floating Trigger Bubble */}
      {!isOpen && (
        <button 
          className="chat-toggle-pill glass-card"
          onClick={() => setIsOpen(true)}
          aria-label="Open Chat with EarlBot"
        >
          <div className="chat-bot-avatar-frame">
            <Bot size={18} className="chat-bot-icon" />
            <span className="chat-online-dot" />
          </div>
          <span className="chat-pill-label">Ask EarlBot</span>
        </button>
      )}

      {/* Expanded Chat Drawer */}
      {isOpen && (
        <div className="chat-window glass-card">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-bot-avatar-frame">
                <Bot size={18} className="chat-bot-icon" />
                <span className="chat-online-dot" />
              </div>
              <div>
                <h4 className="chat-bot-name">EarlBot</h4>
                <span className="chat-bot-sub">Project &amp; Stack Guide</span>
              </div>
            </div>
            <button 
              className="chat-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close Chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Flow */}
          <div className="chat-messages-area">
            {messages.map((m, idx) => (
              <div key={idx} className={`chat-bubble chat-bubble--${m.sender}`}>
                {m.sender === 'bot' && <Bot size={14} className="bubble-icon" />}
                <p>{m.text}</p>
              </div>
            ))}

            {isTyping && (
              <div className="chat-bubble chat-bubble--bot is-typing">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Action Chips */}
          <div className="chat-quick-chips">
            {quickChips.map((chip, i) => (
              <button 
                key={i} 
                className="chip-btn"
                onClick={() => handleSend(chip)}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form 
            className="chat-input-bar"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input 
              type="text" 
              placeholder="Ask about Earl's apps, stack, or certifications..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="chat-text-input"
            />
            <button type="submit" className="chat-send-btn" aria-label="Send">
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
