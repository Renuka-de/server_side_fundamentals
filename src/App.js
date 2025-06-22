import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  ChevronDown, 
  Code, 
  Database, 
  Shield, 
  Globe, 
  Settings, 
  GitBranch, 
  Server, 
  Lock
} from 'react-feather';
import './App.css';

const fundamentalsData = [
  {
    id: 1,
    title: "Server-Side Languages",
    icon: <Code className="icon" />,
    description: "Languages used to develop backend systems that handle HTTP requests, interact with databases, and return responses to clients.",
    detailedDescription: "Server-side languages are the programming languages used to build the backend logic of web applications. These languages run on the server and are responsible for processing business logic, handling database operations, managing user sessions, and generating dynamic content. Unlike frontend languages that run in the browser, server-side languages execute on the server and can access system resources, databases, and external APIs securely. The choice of server-side language significantly impacts development speed, performance, scalability, and maintenance of your application.",
    codeSnippet: `// Node.js (JavaScript) example\nconst http = require('http');\nhttp.createServer((req, res) => {\n  res.write('Hello from Node.js!');\n  res.end();\n}).listen(3000);`,
    details: {
      languages: [
        { name: "Node.js (JavaScript)", desc: "Non-blocking I/O, ideal for scalable applications" },
        { name: "Python (Django, Flask)", desc: "Quick development, rich ecosystem" },
        { name: "Java (Spring Boot)", desc: "Enterprise-grade applications, strong typing" },
        { name: "PHP (Laravel, Symfony)", desc: "Common in CMS and small-medium sites" },
        { name: "Ruby (Rails)", desc: "Convention over configuration, rapid development" },
        { name: "Go", desc: "Lightweight, excellent concurrency" },
        { name: "C# (ASP.NET)", desc: "Used in enterprise and Microsoft environments" }
      ],
      characteristics: ["Synchronous vs. asynchronous processing", "Type safety and error handling"],
      challenges: ["Matching language to use case", "Managing concurrency and performance"],
      references: [
        { name: "Node.js Docs", url: "https://nodejs.org/en/docs/" },
        { name: "Django Docs", url: "https://docs.djangoproject.com/en/stable/" }
      ]
    }
  },
  {
    id: 2,
    title: "Web Servers",
    icon: <Server className="icon" />,
    description: "Software that accepts HTTP requests from clients and serves responses.",
    detailedDescription: "Web servers are the foundation of web applications, acting as the gateway between clients and your application logic. They handle incoming HTTP requests, route them to the appropriate application handlers, and return responses to clients. Web servers manage connection pooling, load balancing, SSL/TLS termination, and static file serving. They can also handle caching, compression, and security features like rate limiting and DDoS protection. Modern web servers are highly optimized for performance and can handle thousands of concurrent connections efficiently.",
    codeSnippet: `# NGINX config example\nserver {\n  listen 80;\n  server_name example.com;\n  location / {\n    proxy_pass http://localhost:3000;\n  }\n}`,
    details: {
      examples: [
        { name: "Apache HTTP Server", desc: "Traditional, robust" },
        { name: "NGINX", desc: "Lightweight, handles static files, reverse proxy" },
        { name: "Node.js (built-in server)", desc: "JavaScript runtime server" },
        { name: "IIS (Microsoft)", desc: "Microsoft's web server" }
      ],
      responsibilities: ["Request routing", "Load balancing", "TLS termination"],
      challenges: ["Handling simultaneous connections", "Configuration for performance and security"],
      references: [
        { name: "NGINX Docs", url: "https://nginx.org/en/docs/" }
      ]
    }
  },
  {
    id: 3,
    title: "Databases",
    icon: <Database className="icon" />,
    description: "Persistent data storage systems supporting read/write operations from the server.",
    detailedDescription: "Databases are the heart of data persistence in web applications, storing and managing all the information your application needs to function. They provide structured ways to store, retrieve, update, and delete data while ensuring data integrity, consistency, and security. Databases handle complex queries, relationships between data, indexing for performance, and backup/recovery operations. The choice between different database types (relational vs NoSQL) depends on your data structure, scalability requirements, and consistency needs.",
    codeSnippet: `-- SQL example\nSELECT * FROM users WHERE email = 'user@example.com';`,
    details: {
      types: [
        { 
          name: "Relational (SQL)", 
          desc: "Structured databases with predefined schemas, relationships between tables, and ACID compliance. Examples: PostgreSQL, MySQL, Oracle. Best for complex queries, data integrity, and transactional applications." 
        },
        { 
          name: "NoSQL", 
          desc: "Non-relational databases with flexible schemas, horizontal scaling, and BASE properties. Examples: MongoDB (document), Redis (key-value), Cassandra (column-family). Best for high scalability, rapid development, and unstructured data." 
        }
      ],
      characteristics: ["Data normalization vs. denormalization", "ACID vs. BASE properties"],
      challenges: ["Scaling and sharding", "Designing efficient queries and indexes"],
      references: [
        { name: "PostgreSQL Docs", url: "https://www.postgresql.org/docs/" },
        { name: "MongoDB Docs", url: "https://docs.mongodb.com/" }
      ]
    }
  },
  {
    id: 4,
    title: "Authentication & Authorization",
    icon: <Shield className="icon" />,
    description: "Processes to verify identity (authentication) and access permissions (authorization).",
    detailedDescription: "Authentication and authorization are critical security mechanisms that control who can access your application and what they can do within it. Authentication verifies the identity of users through various methods like passwords, tokens, or biometric data. Authorization determines what resources and actions a user can access based on their role, permissions, or other criteria. These systems must be robust, secure, and scalable to protect sensitive data and prevent unauthorized access. Modern authentication systems often use standards like OAuth 2.0, OpenID Connect, and JWT tokens for secure, stateless authentication.",
    codeSnippet: `// JWT authentication example (Node.js)\nconst jwt = require('jsonwebtoken');\nconst token = jwt.sign({ userId: 123 }, 'secret', { expiresIn: '1h' });\n// To verify:\njwt.verify(token, 'secret');`,
    details: {
      techniques: [
        "Sessions + cookies",
        "JWT (stateless)",
        "OAuth2 / OpenID Connect",
        "API keys"
      ],
      advantages: ["Controlled access", "Supports roles and scopes"],
      challenges: ["Token expiry", "Security threats (e.g., session hijacking, CSRF)"],
      references: [
        { name: "JWT Introduction", url: "https://jwt.io/introduction" },
        { name: "OAuth 2.0 Official Site", url: "https://oauth.net/2/" }
      ]
    }
  },
  {
    id: 5,
    title: "API Layer",
    icon: <Globe className="icon" />,
    description: "Interface through which clients and other services communicate with the backend.",
    detailedDescription: "The API layer serves as the communication interface between your backend services and external clients or other systems. It defines the contract for how data is exchanged, what operations are available, and how requests should be formatted. APIs can follow different architectural patterns like REST, GraphQL, or gRPC, each with their own advantages for different use cases. A well-designed API provides clear documentation, consistent error handling, versioning strategies, and security measures. APIs are essential for building scalable, maintainable systems that can integrate with multiple frontends and third-party services.",
    codeSnippet: `// REST API endpoint example (Express.js)\napp.get('/api/users', (req, res) => {\n  // Fetch users from database\n  res.json(users);\n});`,
    details: {
      types: [
        { 
          name: "REST", 
          desc: "Representational State Transfer - Resource-oriented architecture using HTTP methods (GET, POST, PUT, DELETE). Stateless, cacheable, and follows REST principles. Best for CRUD operations, web services, and public APIs." 
        },
        { 
          name: "GraphQL", 
          desc: "Query language and runtime for APIs with a single endpoint. Allows clients to request exactly the data they need. Strong typing, introspection, and efficient data fetching. Best for complex data requirements and mobile applications." 
        },
        { 
          name: "gRPC", 
          desc: "High-performance RPC framework using Protocol Buffers. Supports streaming, bidirectional communication, and code generation. Best for microservices, real-time applications, and high-throughput systems." 
        }
      ],
      characteristics: ["Stateless", "Versioned", "Secure (OAuth, CORS, rate limits)"],
      challenges: ["Backward compatibility", "Performance bottlenecks"],
      references: [
        { name: "Introduction to REST", url: "https://restfulapi.net/" },
        { name: "GraphQL Documentation", url: "https://graphql.org/learn/" },
        { name: "gRPC Documentation", url: "https://grpc.io/docs/what-is-grpc/introduction/" }
      ]
    }
  },
  {
    id: 6,
    title: "Business Logic Layer",
    icon: <Code className="icon" />,
    description: "Implements the core functionality of an application independent of delivery mechanisms.",
    detailedDescription: "The business logic layer contains the core rules, calculations, and processes that define how your application works. This layer is independent of how data is presented or stored, focusing purely on implementing business requirements and domain logic. It handles complex calculations, validation rules, workflow processes, and decision-making logic. A well-designed business logic layer is modular, testable, and reusable across different interfaces (web, mobile, API). This separation of concerns makes your application more maintainable and allows you to change the presentation or data layers without affecting core business functionality.",
    details: {
      examples: [
        { name: "Calculating prices, tax, shipping", desc: "Core business calculations" },
        { name: "Applying discounts or rules", desc: "Business rule processing" }
      ],
      characteristics: ["Should be modular and testable", "Decoupled from transport layers"],
      challenges: ["Keeping code clean and scalable"],
      references: [
        { name: "Martin Fowler on Domain Logic", url: "https://www.martinfowler.com/ieeeSoftware/domainLogic.pdf" },
        { name: "Wikipedia: Separation of Concerns", url: "https://en.wikipedia.org/wiki/Separation_of_concerns" }
      ]
    }
  },
  {
    id: 7,
    title: "Networking & Protocols",
    icon: <Globe className="icon" />,
    description: "How the server communicates with clients, databases, and other systems.",
    detailedDescription: "Networking and protocols define how your server communicates with various systems and clients. This includes the underlying communication protocols, network architecture, and how data is transmitted between different components. Understanding networking is crucial for building distributed systems, microservices, and applications that need to communicate with external APIs or databases. Network protocols determine factors like data transfer speed, reliability, security, and compatibility between different systems. Modern applications often use multiple protocols for different purposes, such as HTTP for web requests, WebSockets for real-time communication, and specialized protocols for database connections.",
    details: {
      protocols: ["HTTP/HTTPS", "WebSockets (for real-time apps)", "gRPC, MQTT"],
      challenges: ["Latency and bandwidth limitations", "Connection management"],
      references: [
        { name: "MDN: An overview of HTTP", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview" },
        { name: "WebSocket Protocol (RFC 6455)", url: "https://tools.ietf.org/html/rfc6455" }
      ]
    }
  },
  {
    id: 8,
    title: "Concurrency & Asynchronous Processing",
    icon: <Code className="icon" />,
    description: "Managing multiple tasks simultaneously without blocking server resources.",
    detailedDescription: "Concurrency and asynchronous processing are essential for building high-performance server applications that can handle multiple requests simultaneously. Concurrency allows your server to process multiple tasks at the same time, while asynchronous processing prevents blocking operations from slowing down the entire system. This includes techniques like multi-threading, event-driven programming, and background job processing. Proper concurrency management is crucial for scalability, as it allows your application to efficiently utilize server resources and provide responsive user experiences even under high load.",
    details: {
      techniques: [
        "Event-driven (Node.js)",
        "Multi-threading (Java)",
        "Background workers (Celery, Sidekiq)"
      ],
      useCases: ["Email sending", "Batch data processing"],
      challenges: ["Data consistency", "Error handling in async jobs"],
      references: [
        { name: "Node.js Guide on Concurrency", url: "https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/" },
        { name: "Concurrency vs Parallelism", url: "https://www.baeldung.com/cs/concurrency-vs-parallelism" }
      ]
    }
  },
  {
    id: 9,
    title: "Testing & Debugging",
    icon: <Settings className="icon" />,
    description: "Verifying the backend system works as expected and identifying bugs.",
    detailedDescription: "Testing and debugging are critical processes that ensure your server-side application works correctly, performs well, and is free of bugs. Testing involves creating automated checks that verify your code behaves as expected under various conditions. This includes unit tests for individual functions, integration tests for component interactions, and performance tests for system behavior under load. Debugging is the process of identifying and fixing issues when they occur. Effective testing and debugging practices help catch problems early, reduce maintenance costs, and improve code quality. Modern development practices emphasize test-driven development and continuous integration to maintain high code quality.",
    details: {
      types: [
        { 
          name: "Unit tests", 
          desc: "Tests individual functions, methods, or classes in isolation. Fast execution, high coverage, and easy to maintain. Uses mocks and stubs to isolate dependencies. Best for testing business logic and edge cases." 
        },
        { 
          name: "Integration tests", 
          desc: "Tests interactions between multiple components or services. Validates data flow, API contracts, and database operations. Slower than unit tests but catches integration issues. Best for testing service boundaries and data persistence." 
        },
        { 
          name: "Load/performance tests", 
          desc: "Tests system behavior under various load conditions. Measures response times, throughput, and resource usage. Identifies bottlenecks and scalability issues. Best for ensuring system performance under production-like conditions." 
        }
      ],
      tools: ["Jest, Mocha (JavaScript)", "PyTest (Python)", "JUnit (Java)"],
      challenges: ["Mocking external APIs", "Ensuring test coverage"],
      references: [
        { name: "Martin Fowler on Unit Testing", url: "https://martinfowler.com/bliki/UnitTest.html" },
        { name: "Jest Documentation", url: "https://jestjs.io/docs/getting-started" }
      ]
    }
  },
  {
    id: 10,
    title: "Deployment & Hosting",
    icon: <GitBranch className="icon" />,
    description: "Making your server-side code accessible to users.",
    detailedDescription: "Deployment and hosting involve making your server-side application available to users in a production environment. This includes choosing the right hosting platform, configuring servers, setting up databases, and implementing deployment strategies. Modern deployment practices often use containerization (Docker), orchestration (Kubernetes), and continuous deployment pipelines. The deployment process must ensure high availability, scalability, security, and performance. Different hosting options (cloud, on-premise, hybrid) offer various trade-offs in terms of cost, control, and complexity. Proper deployment practices include monitoring, logging, backup strategies, and disaster recovery plans.",
    details: {
      platforms: [
        "Cloud: AWS, GCP, Azure",
        "PaaS: Heroku, Vercel",
        "Containers: Docker, Kubernetes"
      ],
      ciCdTools: ["Jenkins", "GitHub Actions", "GitLab CI/CD"],
      challenges: ["Downtime", "Environment configuration", "Rollbacks"],
      references: [
        { name: "The Twelve-Factor App", url: "https://12factor.net/" },
        { name: "Docker Documentation", url: "https://docs.docker.com/get-started/" },
        { name: "Kubernetes Documentation", url: "https://kubernetes.io/docs/home/" }
      ]
    }
  },
  {
    id: 11,
    title: "Monitoring & Logging",
    icon: <Settings className="icon" />,
    description: "Tracking performance and identifying issues in real-time.",
    detailedDescription: "Monitoring and logging are essential for maintaining and troubleshooting production applications. Monitoring involves tracking system metrics like CPU usage, memory consumption, response times, and error rates to ensure your application is performing well. Logging captures detailed information about application events, errors, and user actions for debugging and auditing purposes. Together, these systems provide visibility into your application's health and help you identify and resolve issues quickly. Modern monitoring systems use dashboards, alerts, and automated responses to maintain application reliability and performance.",
    details: {
      tools: [
        "Prometheus + Grafana (metrics)",
        "ELK stack (logs)",
        "Sentry (error tracking)"
      ],
      useCases: ["Track HTTP errors", "Monitor memory/CPU usage"],
      responsibilities: ["Error tracking", "Performance metric collection", "Log aggregation"],
      challenges: ["Data volume", "Alert fatigue", "Finding root causes"],
      references: [
        { name: "Prometheus Documentation", url: "https://prometheus.io/docs/introduction/overview/" },
        { name: "The ELK Stack Explained", url: "https://www.elastic.co/what-is/elk-stack" }
      ]
    }
  },
  {
    id: 12,
    title: "Security Considerations",
    icon: <Lock className="icon" />,
    description: "Ensuring the backend system is protected against threats.",
    detailedDescription: "Security is a critical aspect of server-side development that protects your application, data, and users from various threats and attacks. This includes implementing authentication and authorization, securing data transmission, protecting against common vulnerabilities like SQL injection and XSS, and ensuring compliance with security standards and regulations. Security must be considered at every layer of your application, from the network level to the application code. Regular security audits, penetration testing, and staying updated with security best practices are essential for maintaining a secure application. A security breach can have severe consequences, including data loss, financial damage, and loss of user trust.",
    details: {
      threats: ["SQL Injection", "XSS/CSRF", "DDoS"],
      mitigations: ["Input validation", "Security headers", "Rate limiting"],
      references: [
        { name: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" },
        { name: "MDN Web Security", url: "https://developer.mozilla.org/en-US/docs/Web/Security" }
      ]
    }
  }
];

const Sidebar = ({ fundamentals, onNavigate, isOpen, onToggle }) => {
  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sidebar-overlay"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="sidebar"
      >
        <div className="sidebar-header">
          <h3 className="sidebar-title">Concepts</h3>
        </div>
        
        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <button
                className="nav-link home-link"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  if (window.innerWidth < 768) {
                    setTimeout(() => onToggle(), 100);
                  }
                }}
              >
                <div className="nav-icon home-icon">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9,22 9,12 15,12 15,22"/>
                  </svg>
                </div>
                <span className="nav-text">Home</span>
              </button>
            </li>
            {fundamentals.map((fundamental) => (
              <li key={fundamental.id} className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => {
                    onNavigate(fundamental.id);
                    // Close sidebar on mobile after a short delay to ensure navigation completes
                    if (window.innerWidth < 768) {
                      setTimeout(() => onToggle(), 100);
                    }
                  }}
                >
                  <div className="nav-icon">
                    {fundamental.icon}
                  </div>
                  <span className="nav-text">{fundamental.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </>
  );
};

function App() {
  const [expandedCards, setExpandedCards] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCardToggle = (cardId) => {
    setExpandedCards(expandedCards.includes(cardId) ? expandedCards.filter((id) => id !== cardId) : [...expandedCards, cardId]);
  };

  const handleNavigate = (cardId) => {
    // First, expand the card
    setExpandedCards([cardId]);
    
    // Use a longer delay to ensure the card is fully expanded and rendered
    setTimeout(() => {
      const element = document.getElementById(`fundamental-${cardId}`);
      if (element) {
        // Use scrollIntoView with specific options for precise positioning
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 400); // Increased delay to ensure expansion animation completes
  };

  return (
    <div className="app">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="background-overlay"></div>
        <div className="particles-container">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              animate={{
                x: [0, Math.random() * window.innerWidth],
                y: [0, Math.random() * window.innerHeight],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
            />
          ))}
        </div>
      </div>

      {/* Sidebar Navigation */}
      <Sidebar 
        fundamentals={fundamentalsData}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="main-container">
        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="icon" />
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="header"
        >
          <h1 className="main-title">
            Server-Side Fundamentals
          </h1>
          <p className="main-description">
            A comprehensive guide to backend engineering, covering everything from languages and databases 
            to security and deployment strategies.
          </p>
        </motion.div>

        {/* Detailed Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="description-section"
        >
          <div className="description-content">
            <h2 className="description-title">What are Server-Side Fundamentals?</h2>
            <div className="description-text">
              <p>
                <strong>Server-Side Fundamentals</strong> are the core principles, technologies, and practices that form the foundation of backend development. 
                They encompass everything that happens "behind the scenes" of web applications, from processing user requests to managing data and ensuring 
                system security and performance.
              </p>
              
              <p>
                Unlike frontend development that focuses on what users see and interact with, server-side fundamentals deal with:
              </p>
              
              <ul className="description-list">
                <li><strong>Data Processing:</strong> Handling business logic, calculations, and data transformations</li>
                <li><strong>Database Management:</strong> Storing, retrieving, and managing application data</li>
                <li><strong>Security:</strong> Protecting data, authenticating users, and preventing attacks</li>
                <li><strong>Performance:</strong> Optimizing response times and handling multiple concurrent users</li>
                <li><strong>Scalability:</strong> Building systems that can grow with user demand</li>
                <li><strong>Integration:</strong> Connecting with external services, APIs, and third-party systems</li>
              </ul>
              
              <p>
                These fundamentals are essential for building robust, secure, and scalable web applications that can handle real-world demands. 
                Whether you're building a simple blog or a complex e-commerce platform, understanding these server-side fundamentals is crucial 
                for creating reliable and efficient backend systems.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Fundamentals Grid */}
        <div className="fundamentals-grid">
          {fundamentalsData.map((fundamental) => (
            <motion.div
              key={fundamental.id}
              id={`fundamental-${fundamental.id}`}
              className="fundamental-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: fundamental.id * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleCardToggle(fundamental.id)}
            >
              <div className="card-header">
                <div className="card-icon">{fundamental.icon}</div>
                <div className="card-content-header">
                  <h3>{fundamental.title}</h3>
                  <p className="card-overview">{fundamental.description}</p>
                </div>
                <motion.div
                  className="expand-icon"
                  animate={{ rotate: expandedCards.includes(fundamental.id) ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown />
                </motion.div>
              </div>
              
              <motion.div
                className="card-content"
                initial={false}
                animate={{
                  height: expandedCards.includes(fundamental.id) ? "auto" : 0,
                  opacity: expandedCards.includes(fundamental.id) ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="description-section">
                  <h4>Detailed Explanation</h4>
                  <p className="detailed-description">{fundamental.detailedDescription}</p>
                </div>

                {fundamental.details && (
                  <div className="details-section">
                    {fundamental.details.languages && (
                      <div className="detail-group languages-section">
                        <h4>Languages & Technologies</h4>
                        <div className="detail-items">
                          {fundamental.details.languages.map((lang, index) => (
                            <div key={index} className="detail-item">
                              <strong>{lang.name}:</strong> {lang.desc}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {fundamental.details.examples && (
                      <div className="detail-group examples-section">
                        <h4>Examples</h4>
                        <div className="detail-items">
                          {fundamental.details.examples.map((example, index) => (
                            <div key={index} className="detail-item">
                              <strong>{example.name}:</strong> {example.desc}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {fundamental.details.types && (
                      <div className="detail-group types-section">
                        <h4>Types & Categories</h4>
                        <div className="detail-items">
                          {fundamental.details.types.map((type, index) => (
                            <div key={index} className="detail-item">
                              <strong>{type.name}:</strong> {type.desc}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {fundamental.details.techniques && (
                      <div className="detail-group techniques-section">
                        <h4>Techniques & Methods</h4>
                        <div className="detail-items">
                          {fundamental.details.techniques.map((technique, index) => (
                            <div key={index} className="detail-item">
                              {technique}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {fundamental.details.protocols && (
                      <div className="detail-group protocols-section">
                        <h4>Protocols</h4>
                        <div className="detail-items">
                          {fundamental.details.protocols.map((protocol, index) => (
                            <div key={index} className="detail-item">
                              {protocol}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {fundamental.details.platforms && (
                      <div className="detail-group platforms-section">
                        <h4>Platforms & Tools</h4>
                        <div className="detail-items">
                          {fundamental.details.platforms.map((platform, index) => (
                            <div key={index} className="detail-item">
                              {platform}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {fundamental.details.tools && (
                      <div className="detail-group tools-section">
                        <h4>Tools & Technologies</h4>
                        <div className="detail-items">
                          {fundamental.details.tools.map((tool, index) => (
                            <div key={index} className="detail-item">
                              {tool}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {fundamental.details.ciCdTools && (
                      <div className="detail-group cicd-section">
                        <h4>CI/CD Tools</h4>
                        <div className="detail-items">
                          {fundamental.details.ciCdTools.map((tool, index) => (
                            <div key={index} className="detail-item">
                              {tool}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {fundamental.details.useCases && (
                      <div className="detail-group use-cases-section">
                        <h4>Use Cases</h4>
                        <div className="detail-items">
                          {fundamental.details.useCases.map((useCase, index) => (
                            <div key={index} className="detail-item">
                              {useCase}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {fundamental.details.characteristics && (
                      <div className="detail-group characteristics-section">
                        <h4>Key Characteristics</h4>
                        <div className="detail-items">
                          {fundamental.details.characteristics.map((char, index) => (
                            <div key={index} className="detail-item">
                              {char}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {fundamental.details.responsibilities && (
                      <div className="detail-group responsibilities-section">
                        <h4>Responsibilities</h4>
                        <div className="detail-items">
                          {fundamental.details.responsibilities.map((resp, index) => (
                            <div key={index} className="detail-item">
                              {resp}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {fundamental.details.advantages && (
                      <div className="detail-group advantages-section">
                        <h4>Advantages</h4>
                        <div className="detail-items">
                          {fundamental.details.advantages.map((adv, index) => (
                            <div key={index} className="detail-item">
                              {adv}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {fundamental.details.threats && (
                      <div className="detail-group threats-section">
                        <h4>Common Threats</h4>
                        <div className="detail-items">
                          {fundamental.details.threats.map((threat, index) => (
                            <div key={index} className="detail-item threat-item">
                              {threat}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {fundamental.details.mitigations && (
                      <div className="detail-group mitigations-section">
                        <h4>Security Mitigations</h4>
                        <div className="detail-items">
                          {fundamental.details.mitigations.map((mitigation, index) => (
                            <div key={index} className="detail-item">
                              {mitigation}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {fundamental.details.challenges && (
                      <div className="detail-group challenges-section">
                        <h4>Challenges & Considerations</h4>
                        <div className="detail-items">
                          {fundamental.details.challenges.map((challenge, index) => (
                            <div key={index} className="detail-item challenge-item">
                              {challenge}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {fundamental.details.references && (
                      <div className="detail-group references-section">
                        <h4>References</h4>
                        <div className="detail-items">
                          {fundamental.details.references.map((ref, index) => (
                            <div key={index} className="detail-item reference-item">
                              <a href={ref.url} target="_blank" rel="noopener noreferrer">
                                {ref.name}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {fundamental.codeSnippet && (
                  <div className="code-snippet-section">
                    <h4>Code Snippet</h4>
                    <pre className="code-block">
                      <code>{fundamental.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="footer"
        >
          <p className="footer-text">
            Master these fundamentals to build robust, scalable, and secure server-side systems.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
