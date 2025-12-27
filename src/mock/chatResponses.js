// AI Chat response logic with keyword matching

const responses = {
  uipath: {
    message: "I've found 12 UiPath-certified developers available right now. They specialize in process automation, workflow design, and UiPath Orchestrator management. Would you like me to match you with a developer based on your project requirements?",
    action: "MATCHING RPA ENGINEERS...",
  },
  developer: {
    message: "I can connect you with experienced RPA developers skilled in UiPath, Automation Anywhere, and Blue Prism. Our developers have an average of 5+ years of experience and 95% success rate. What specific automation challenge are you looking to solve?",
    action: "SCANNING AVAILABLE DEVELOPERS...",
  },
  invoice: {
    message: "Invoice processing automation is one of our most common and successful use cases. Our team has completed 200+ invoice automation projects with an average 80% time reduction. I can connect you with specialists who've worked with major ERP systems like SAP, Oracle, and NetSuite.",
    action: "ANALYZING REQUIREMENTS...",
  },
  automation: {
    message: "We handle all types of RPA automation: data entry, document processing, report generation, email automation, and API integrations. Tell me more about your specific process, and I'll find the perfect developer or solution for you.",
    action: "PROCESSING REQUEST...",
  },
  training: {
    message: "We offer comprehensive RPA training programs for individuals and teams. Our certified trainers cover UiPath, Automation Anywhere, Blue Prism, and custom AI workflows. Training can be done remotely or on-site. What's your team size and preferred timeline?",
    action: "CONNECTING TO TRAINING TEAM...",
  },
  freelancer: {
    message: "Our freelance RPA experts are available for short-term projects, consulting, and specialized tasks. They offer flexible engagement models and competitive rates. Would you like to see available freelancers in your technology stack?",
    action: "SEARCHING FREELANCE TALENT...",
  },
  default: {
    message: "I'm here to help you find RPA solutions. Whether you need developers, trainers, freelancers, or want to post a project, I can assist. What would you like to explore?",
    action: "SYSTEM STATUS: OPERATIONAL",
  },
};

export const getChatResponse = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Keyword matching
  if (lowerMessage.includes('uipath')) {
    return responses.uipath;
  }
  if (lowerMessage.includes('developer') || lowerMessage.includes('engineer')) {
    return responses.developer;
  }
  if (lowerMessage.includes('invoice') || lowerMessage.includes('billing')) {
    return responses.invoice;
  }
  if (lowerMessage.includes('automation') || lowerMessage.includes('rpa')) {
    return responses.automation;
  }
  if (lowerMessage.includes('train') || lowerMessage.includes('learn') || lowerMessage.includes('course')) {
    return responses.training;
  }
  if (lowerMessage.includes('freelance') || lowerMessage.includes('freelancer')) {
    return responses.freelancer;
  }
  
  return responses.default;
};

export const getSystemMessage = () => {
  return {
    type: 'system',
    text: 'SYSTEM STATUS: OPERATIONAL',
    timestamp: new Date().toISOString(),
  };
};

