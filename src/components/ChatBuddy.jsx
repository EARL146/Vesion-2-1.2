import React, { useEffect, useRef, useState } from 'react';
import { X, Send, ArrowUpRight } from 'lucide-react';
import { useRouter } from '../lib/router';
import { PROFILE } from '../data/site';

const KNOWLEDGE_BASE = [
  {
    triggers: ['motofix', 'moto', 'ecommerce', 'motorcycle', 'parts'],
    reply:
      'MotoFix is a full-stack motorcycle parts e-commerce storefront built with Node.js, Express.js and MySQL, featuring product browsing, cart flows and order management.',
    action: { label: 'Open Projects', to: '/projects' }
  },
  {
    triggers: ['burgerbites', 'burger', 'flutter', 'dart', 'mobile'],
    reply:
      'BurgerBites is a cross-platform mobile food-ordering app built with Flutter and Dart, connected to a PHP and MySQL API.',
    action: { label: 'Inspect Mobile Builds', to: '/projects' }
  },
  {
    triggers: ['pharmacare', 'pharma', 'nextjs', 'next', 'typescript', 'health'],
    reply:
      'PharmaCare is a modern healthcare web portal built with Next.js and TypeScript.',
    action: { label: 'Open Projects', to: '/projects' }
  },
  {
    triggers: ['streetfood', 'java 21', 'swing', 'flatlaf', 'desktop'],
    reply:
      'StreetFood is a desktop ordering application built with Java 21 and a custom FlatLaf Swing interface.',
    action: { label: 'Open Projects', to: '/projects' }
  },
  {
    triggers: ['hitohouse', 'hito', 'catfish', 'spring', 'spring boot'],
    reply:
      'HitoHouse is a commercial catfish online ordering platform powered by Java Spring Boot.',
    action: { label: 'Open Projects', to: '/projects' }
  },
  {
    triggers: ['barbergo', 'barber', 'client', 'landing'],
    reply:
      'BarberGo is a responsive client landing page built for a barbershop using HTML5, CSS3 and JavaScript.',
    action: { label: 'Open Projects', to: '/projects' }
  },
  {
    triggers: ['v1', 'version 1', 'svg', 'evolution', 'lab', 'cylinder', 'v2'],
    reply:
      'Version 1.0 is Earl’s pure-SVG interactive portfolio (earl146.github.io/svgportfolio). Version 2.0 is this routed React & Vite workspace — you can compare both inside Dev Lab!',
    action: { label: 'Open Dev Lab', to: '/lab' }
  },
  {
    triggers: ['cert', 'certificate', 'tesda', 'opswat', 'pycon', 'ghl', 'credential', 'datacamp', 'sql', 'python', 'git'],
    reply:
      'Earl holds 12 verified certificates: 6 DataCamp Statements of Accomplishment (Introduction to SQL, Intermediate GitHub Concepts, Introduction to GitHub Concepts, Introduction to Python for Developers, Intermediate Git, Introduction to Git), plus Full Stack Web Dev + AI (Level 0), TESDA Visual Graphic Design, OPSWAT ICIP, OPSWAT OCFA, PyCon Davao 2026 and a GoHighLevel Workshop.',
    action: { label: 'View 12 Certificates', to: '/certificates' }
  },
  {
    triggers: ['stack', 'tech', 'skill', 'language', 'tool', 'java', 'node', 'mysql'],
    reply:
      'Daily drivers include Java 21, Spring Boot, Node.js, Express, PHP, MySQL, phpMyAdmin, Flutter, Dart, React, HTML5/CSS3 and Git/GitHub.',
    action: { label: 'See Services & Stack', to: '/services' }
  },
  {
    triggers: ['school', 'college', 'bsit', 'education', 'about', 'who', 'where'],
    reply:
      'Earl is a BSIT undergraduate at Legacy Compostela College in Compostela, Davao de Oro, Philippines (GMT+8). He started coding in 2025 in the SHS TVL-ICT Computer Programming strand.',
    action: { label: 'Read About Earl', to: '/about' }
  },
  {
    triggers: ['resume', 'cv', 'download', 'print'],
    reply:
      'You can view and print Earl’s official Curriculum Vitae right here on the site as a clean PDF.',
    resume: true
  },
  {
    triggers: ['hire', 'contact', 'email', 'reach', 'work', 'project', 'service'],
    reply:
      'Earl is open for web, backend, MySQL and Flutter projects! Reach him via the contact form or directly at earlypajo@gmail.com.',
    action: { label: 'Go to Contact', to: '/contact' }
  }
];

const QUICK_PROMPTS = [
  'What projects has Earl shipped?',
  'What is Earl’s core tech stack?',
  'Show his 12 certificates',
  'Open Resume / CV',
  'How can I contact Earl?'
];

export default function ChatBuddy({ onOpenResume }) {
  const { navigate } = useRouter();
  const [open, setOpen] = useState(false);
  const [hideHint, setHideHint] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hi! I’m EarlBot. Ask me about Earl’s projects, tech stack, 12 certificates (including DataCamp), BSIT background, or how to work together.',
      meta: 'EarlBot · just now'
    }
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, typing, open]);

  const sendQuestion = (raw) => {
    const q = (raw ?? input).trim();
    if (!q) return;
    setMessages((prev) => [...prev, { sender: 'user', text: q }]);
    setInput('');
    setTyping(true);

    window.setTimeout(() => {
      const lower = q.toLowerCase();
      const found = KNOWLEDGE_BASE.find((item) =>
        item.triggers.some((t) => lower.includes(t))
      );

      if (found) {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: found.reply,
            action: found.action,
            resume: found.resume,
            meta: 'EarlBot · just now'
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: 'Earl builds full-stack web apps, Java Spring Boot & Node.js APIs, MySQL databases and Flutter apps. Want to browse his work or send a note?',
            action: { label: 'Explore Projects', to: '/projects' },
            meta: 'EarlBot · just now'
          }
        ]);
      }
      setTyping(false);
    }, 420);
  };

  return (
    <div className={`kchat ${open ? 'is-open' : ''}`}>
      {!open && (
        <div className="kchat__launcher">
          {!hideHint && (
            <button
              type="button"
              className="kchat__bubble"
              onClick={() => {
                setHideHint(true);
                setOpen(true);
              }}
            >
              <span>How can I help?</span>
            </button>
          )}

          <button
            type="button"
            className="kchat__avatar-btn"
            onClick={() => {
              setHideHint(true);
              setOpen(true);
            }}
            aria-label="Ask EarlBot a question"
          >
            <img src={PROFILE.chatAvatar} alt="" />
            <span className="kchat__online" aria-hidden="true" />
          </button>
        </div>
      )}

      {open && (
        <div className="kchat__panel" role="dialog" aria-label="EarlBot portfolio assistant">
          <header className="kchat__head">
            <div className="kchat__who">
              <div className="kchat__mini-avatar">
                <img src={PROFILE.chatAvatar} alt="" />
                <span className="kchat__online" aria-hidden="true" />
              </div>
              <div>
                <strong>EarlBot</strong>
                <span>Portfolio guide · Online</span>
              </div>
            </div>
            <button
              type="button"
              className="kchat__close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </header>

          <div className="kchat__messages">
            {messages.map((m, idx) => (
              <div key={idx} className={`kchat__msg kchat__msg--${m.sender}`}>
                <div className="kchat__msg-box">
                  <p>{m.text}</p>
                  {m.action && (
                    <button
                      type="button"
                      className="kchat__jump"
                      onClick={() => {
                        navigate(m.action.to);
                        setOpen(false);
                      }}
                    >
                      <span>{m.action.label}</span>
                      <ArrowUpRight size={13} />
                    </button>
                  )}
                  {m.resume && (
                    <button
                      type="button"
                      className="kchat__jump"
                      onClick={() => {
                        setOpen(false);
                        onOpenResume();
                      }}
                    >
                      <span>View Resume / CV</span>
                      <ArrowUpRight size={13} />
                    </button>
                  )}
                </div>
                {m.meta && <small className="kchat__meta">{m.meta}</small>}
              </div>
            ))}

            {typing && (
              <div className="kchat__msg kchat__msg--bot">
                <div className="kchat__msg-box kchat__typing">
                  <i /><i /><i />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="kchat__chips">
            {QUICK_PROMPTS.map((p) => (
              <button key={p} type="button" onClick={() => sendQuestion(p)}>
                {p}
              </button>
            ))}
          </div>

          <form
            className="kchat__form"
            onSubmit={(e) => {
              e.preventDefault();
              sendQuestion();
            }}
          >
            <input
              type="text"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" aria-label="Send question">
              <Send size={15} />
            </button>
          </form>

          <p className="kchat__foot">
            Answers come from this site only. Chats are not stored.
          </p>
        </div>
      )}
    </div>
  );
}
