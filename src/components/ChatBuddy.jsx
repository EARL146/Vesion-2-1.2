import React, { useEffect, useRef, useState } from 'react';
import { X, Send, ArrowUpRight, RotateCcw, Sparkles } from 'lucide-react';
import { useRouter } from '../lib/router';
import { PROFILE } from '../data/site';

const INITIAL_MESSAGE = {
  sender: 'bot',
  text: 'Hi! I’m EarlBot. Tap a question below or ask me about Earl’s 7 shipped projects, core tech stack, 12 verified certificates, BSIT background, or how to work together.',
  meta: 'EarlBot · Online'
};

const KNOWLEDGE_BASE = [
  {
    triggers: ['what projects', 'shipped', 'all projects', 'projects has earl', 'portfolio projects', 'repositories', 'repos', 'built'],
    reply: 'Earl has shipped 7 public projects on GitHub across web, Java, and mobile:',
    items: [
      {
        num: '01',
        title: 'MotoFix E-Commerce',
        tag: 'Node.js · MySQL',
        desc: 'Motorcycle parts storefront, cart & order management.',
        to: '/projects'
      },
      {
        num: '02',
        title: 'PharmaCare Portal',
        tag: 'Next.js · TypeScript',
        desc: 'Responsive healthcare web platform & medicine catalog.',
        to: '/projects'
      },
      {
        num: '03',
        title: 'BurgerBites Mobile',
        tag: 'Flutter · PHP/MySQL',
        desc: 'Cross-platform mobile food ordering app + REST API.',
        to: '/projects'
      },
      {
        num: '04',
        title: 'HitoHouse Ordering',
        tag: 'Java · Spring Boot',
        desc: 'Commercial catfish online ordering web platform.',
        to: '/projects'
      },
      {
        num: '05',
        title: 'StreetFood POS',
        tag: 'Java 21 · Swing',
        desc: 'Desktop ordering system with custom FlatLaf UI.',
        to: '/projects'
      },
      {
        num: '06',
        title: 'BarberGo & Portfolio v1',
        tag: 'HTML5 · CSS3 · SVG',
        desc: 'Client barbershop landing page & pure-SVG v1 portfolio.',
        to: '/projects'
      }
    ],
    action: { label: 'Explore All 7 Projects', to: '/projects' }
  },
  {
    triggers: ['motofix', 'moto', 'ecommerce', 'motorcycle', 'parts'],
    reply:
      'MotoFix is a full-stack motorcycle parts e-commerce storefront built with Node.js, Express.js and MySQL.',
    items: [
      {
        num: '01',
        title: 'MotoFix Storefront & Admin',
        tag: 'Node.js · Express · MySQL',
        desc: 'Product catalog filtering, shopping cart flows, relational MySQL schema, and order tracking.',
        to: '/projects'
      }
    ],
    action: { label: 'Open MotoFix in Projects', to: '/projects' }
  },
  {
    triggers: ['burgerbites', 'burger', 'flutter', 'dart', 'mobile'],
    reply:
      'BurgerBites is a cross-platform mobile food-ordering application built with Flutter and Dart.',
    items: [
      {
        num: '01',
        title: 'BurgerBites Mobile App',
        tag: 'Flutter · Dart · PHP · MySQL',
        desc: 'Mobile ordering flow with category browsing, item customization, and a PHP/MySQL backend API.',
        to: '/projects'
      }
    ],
    action: { label: 'Inspect Mobile Builds', to: '/projects' }
  },
  {
    triggers: ['pharmacare', 'pharma', 'nextjs', 'next', 'typescript', 'health'],
    reply:
      'PharmaCare is a modern healthcare web portal built with Next.js and TypeScript.',
    items: [
      {
        num: '01',
        title: 'PharmaCare Web Portal',
        tag: 'Next.js · TypeScript · CSS',
        desc: 'Component-driven healthcare interface designed for fast navigation and responsive clarity.',
        to: '/projects'
      }
    ],
    action: { label: 'Open PharmaCare in Projects', to: '/projects' }
  },
  {
    triggers: ['streetfood', 'java 21', 'swing', 'flatlaf', 'desktop'],
    reply:
      'StreetFood is a desktop ordering application built with Java 21 and a custom FlatLaf Swing interface.',
    items: [
      {
        num: '01',
        title: 'StreetFood Desktop POS',
        tag: 'Java 21 · Swing · FlatLaf',
        desc: 'Event-driven desktop ordering workflow with receipt calculation and clean dark/light theming.',
        to: '/projects'
      }
    ],
    action: { label: 'Open Java Builds', to: '/projects' }
  },
  {
    triggers: ['hitohouse', 'hito', 'catfish', 'spring', 'spring boot'],
    reply:
      'HitoHouse is a commercial catfish online ordering platform powered by Java Spring Boot.',
    items: [
      {
        num: '01',
        title: 'HitoHouse Platform',
        tag: 'Java · Spring Boot · Web',
        desc: 'Structured MVC backend with product ordering and customer inquiry management.',
        to: '/projects'
      }
    ],
    action: { label: 'Open Projects', to: '/projects' }
  },
  {
    triggers: ['barbergo', 'barber', 'client', 'landing'],
    reply:
      'BarberGo is a responsive client landing page built for a barbershop using HTML5, CSS3 and JavaScript.',
    items: [
      {
        num: '01',
        title: 'BarberGo Client Site',
        tag: 'HTML5 · CSS3 · JavaScript',
        desc: 'Mobile-friendly service menu, pricing cards, and appointment call-to-actions.',
        to: '/projects'
      }
    ],
    action: { label: 'Open Projects', to: '/projects' }
  },
  {
    triggers: ['v1', 'version 1', 'svg', 'evolution', 'lab', 'cylinder', 'v2'],
    reply:
      'You can compare both generations of Earl’s portfolio side by side inside the Dev Lab:',
    items: [
      {
        num: 'v2',
        title: 'Version 2.0 (Current Flagship)',
        tag: 'React 18 · Vite',
        desc: 'Routed bento workspace with project/certificate modals & printable CV.',
        to: '/lab'
      },
      {
        num: 'v1',
        title: 'Version 1.0 (Original Build)',
        tag: 'HTML5 · Pure SVG',
        desc: 'Interactive vector-animated portfolio hosted on GitHub Pages.',
        to: '/lab'
      }
    ],
    action: { label: 'Open Dev Lab', to: '/lab' }
  },
  {
    triggers: ['cert', 'certificate', 'tesda', 'opswat', 'pycon', 'ghl', 'credential', 'datacamp', 'sql', 'python', 'git'],
    reply:
      'Earl holds 12 verified certificates across DataCamp, web development, cybersecurity, and national TVET:',
    items: [
      {
        num: '06',
        title: 'DataCamp Statements (6)',
        tag: 'SQL · Python · Git · GitHub',
        desc: 'Intro to SQL, Intermediate GitHub, Intro to GitHub, Python for Devs, Intermediate Git & Intro to Git.',
        to: '/certificates'
      },
      {
        num: '03',
        title: 'Web, AI & Automation (3)',
        tag: 'Full Stack · PyCon · GHL',
        desc: 'Full Stack Web Dev + AI (Level 0), PyCon Davao 2026 & GoHighLevel Workshop.',
        to: '/certificates'
      },
      {
        num: '03',
        title: 'Cybersecurity & TESDA (3)',
        tag: 'OPSWAT & TESDA',
        desc: 'OPSWAT ICIP, OPSWAT Cybersecurity Fundamentals (OCFA) & TESDA Visual Graphic Design.',
        to: '/certificates'
      }
    ],
    action: { label: 'View All 12 Certificates', to: '/certificates' }
  },
  {
    triggers: ['stack', 'tech', 'skill', 'language', 'tool', 'java', 'node', 'mysql', 'core'],
    reply:
      'Earl’s core technology stack is separated into three tracks:',
    items: [
      {
        num: '01',
        title: 'Backend & Systems',
        tag: 'Java 21 · Spring Boot · Node.js',
        desc: 'Express.js, PHP, REST APIs, and Swing/FlatLaf desktop apps.',
        to: '/services'
      },
      {
        num: '02',
        title: 'Frontend & Mobile',
        tag: 'React · Next.js · Flutter',
        desc: 'TypeScript, JavaScript, Dart, HTML5, CSS3, and Vite.',
        to: '/services'
      },
      {
        num: '03',
        title: 'Database & Workflow',
        tag: 'MySQL · Git · GitHub',
        desc: 'Relational schema design, phpMyAdmin & Exploring n8n/AI automation.',
        to: '/services'
      }
    ],
    action: { label: 'See Services & Stack', to: '/services' }
  },
  {
    triggers: ['school', 'college', 'bsit', 'education', 'about', 'who', 'where'],
    reply:
      'Earl is a BSIT undergraduate at Legacy Compostela College in Compostela, Davao de Oro, Philippines (GMT+8).',
    items: [
      {
        num: 'BSIT',
        title: 'Legacy Compostela College',
        tag: 'Compostela, Davao de Oro',
        desc: 'Started coding in 2025 in SHS TVL-ICT Computer Programming before advancing into full-stack web, Java & Flutter.',
        to: '/about'
      }
    ],
    action: { label: 'Read About Earl', to: '/about' }
  },
  {
    triggers: ['resume', 'cv', 'download', 'print'],
    reply:
      'You can inspect and print Earl’s official Curriculum Vitae right here on the site as a clean A4 PDF.',
    resume: true
  },
  {
    triggers: ['hire', 'contact', 'email', 'reach', 'work', 'service', 'inquire'],
    reply:
      'Earl is available for web, backend API, MySQL, and Flutter mobile projects.',
    items: [
      {
        num: '24h',
        title: 'Direct Project Inquiry',
        tag: 'earlypajo@gmail.com',
        desc: 'Send a short project outline via the contact form or email directly.',
        to: '/contact'
      }
    ],
    action: { label: 'Go to Contact Form', to: '/contact' }
  }
];

const QUICK_PROMPTS = [
  { label: 'Shipped projects (7)', query: 'What projects has Earl shipped?' },
  { label: 'Core tech stack', query: 'What is Earl’s core tech stack?' },
  { label: '12 Certificates', query: 'Show his 12 certificates' },
  { label: 'Resume / CV', query: 'Open Resume / CV' },
  { label: 'Contact Earl', query: 'How can I contact Earl?' }
];

export default function ChatBuddy({ onOpenResume }) {
  const { navigate } = useRouter();
  const [open, setOpen] = useState(false);
  const [hideHint, setHideHint] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const listRef = useRef(null);
  const lastMsgRef = useRef(null);

  useEffect(() => {
    if (!open || !listRef.current) return;
    if (messages.length <= 1) {
      listRef.current.scrollTop = 0;
      return;
    }
    if (lastMsgRef.current) {
      listRef.current.scrollTo({
        top: Math.max(0, lastMsgRef.current.offsetTop - 10),
        behavior: 'smooth'
      });
    }
  }, [messages, typing, open]);

  const sendQuestion = (raw) => {
    const q = (raw ?? input).trim();
    if (!q || typing) return;
    setMessages((prev) => [...prev, { sender: 'user', text: q, meta: 'You · just now' }]);
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
            items: found.items,
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
            text: 'Earl builds full-stack web apps, Java Spring Boot & Node.js APIs, MySQL databases and Flutter apps. Want to browse his 7 shipped projects or send a note?',
            action: { label: 'Explore Projects', to: '/projects' },
            meta: 'EarlBot · just now'
          }
        ]);
      }
      setTyping(false);
    }, 280);
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

            <div className="kchat__head-actions">
              {messages.length > 1 && (
                <button
                  type="button"
                  className="kchat__reset"
                  onClick={() => setMessages([INITIAL_MESSAGE])}
                  title="Clear chat history"
                  aria-label="Clear chat history"
                >
                  <RotateCcw size={13} />
                  <span>Reset ({Math.floor((messages.length - 1) / 2)})</span>
                </button>
              )}
              <button
                type="button"
                className="kchat__close"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </header>

          <div className="kchat__messages" ref={listRef}>
            {messages.map((m, idx) => {
              const turnStartIdx =
                messages.length > 1 && messages[messages.length - 1].sender === 'bot'
                  ? messages.length - 2
                  : messages.length - 1;
              const isTurnStart = idx === turnStartIdx;
              const isGrid = m.items && m.items.length > 3;
              return (
                <div
                  key={idx}
                  ref={isTurnStart ? lastMsgRef : null}
                  className={`kchat__msg kchat__msg--${m.sender} ${idx > 0 && m.sender === 'user' ? 'kchat__msg--turn' : ''}`}
                >
                  <div className="kchat__msg-box">
                    <p className="kchat__msg-lead">{m.text}</p>

                    {m.items && m.items.length > 0 && (
                      <div className={`kchat__items ${isGrid ? 'kchat__items--grid' : ''}`}>
                        {m.items.map((item) => (
                          <button
                            key={item.title}
                            type="button"
                            className="kchat__item-card"
                            onClick={() => {
                              if (item.to) {
                                navigate(item.to);
                                setOpen(false);
                              }
                            }}
                          >
                            <span className="kchat__item-num">{item.num}</span>
                            <div className="kchat__item-body">
                              <div className="kchat__item-head">
                                <strong>{item.title}</strong>
                                <span>{item.tag}</span>
                              </div>
                              <p>{item.desc}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {m.action && (
                      <div className="kchat__msg-foot">
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
                      </div>
                    )}

                    {m.resume && (
                      <div className="kchat__msg-foot">
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
                      </div>
                    )}
                  </div>
                  {m.meta && <small className="kchat__meta">{m.meta}</small>}
                </div>
              );
            })}

            {typing && (
              <div className="kchat__msg kchat__msg--bot" ref={lastMsgRef}>
                <div className="kchat__msg-box kchat__typing">
                  <i /><i /><i />
                </div>
              </div>
            )}
          </div>

          <div className="kchat__chips-wrap">
            <span className="kchat__chips-label">
              <Sparkles size={11} /> Quick questions
            </span>
            <div className="kchat__chips">
              {QUICK_PROMPTS.map((p) => (
                <button key={p.label} type="button" onClick={() => sendQuestion(p.query)}>
                  {p.label}
                </button>
              ))}
            </div>
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
              placeholder="Ask about projects, stack, certs..."
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
