// data/projects.js
export const PROJECTS = [
  {
    slug: 'mes-modernisation',
    title: 'MES System Modernisation',
    tag: 'Manufacturing Execution System',
    shortDescription: 'Modernised a legacy MES platform, reducing client support tickets by 98% and improving system reliability for factory-floor operations.',
    description: `
### Overview
A comprehensive modernisation of a Manufacturing Execution System (MES) used across multiple production facilities. The legacy system suffered from frequent downtime, poor scalability, and a brittle codebase that generated dozens of support tickets monthly.

### Problem
- Legacy .NET Framework monolith with tight coupling between modules
- No automated testing, deployments were manual and error-prone
- Real-time shop-floor data pipelines frequently stalled
- Client support tickets averaged 40–50 per month

### My Role
Lead engineer responsible for architecture redesign, migration strategy, and delivery. Worked directly with plant operations teams to understand domain requirements.

### Tech Stack
- **Backend**: .NET 8, ASP.NET Core, Entity Framework Core
- **Messaging**: RabbitMQ for event-driven communication between services
- **Data**: PostgreSQL with TimescaleDB for time-series telemetry
- **Observability**: Grafana, Prometheus, structured logging with Serilog
- **Infrastructure**: Docker, Kubernetes (AKS), Azure DevOps pipelines
- **Frontend**: React + TypeScript dashboard for operators

### Outcome
- **98% reduction in support tickets** (down to 1–2 per month)
- Zero-downtime deployments via blue-green strategy
- Sub-second latency for real-time telemetry dashboards
- Extensible plugin architecture for new production line integrations
- Team now ships features weekly instead of quarterly

### Links
- Repository: Private (enterprise)
- Demo: Internal only
    `,
    techStack: ['.NET 8', 'ASP.NET Core', 'PostgreSQL', 'RabbitMQ', 'Kubernetes', 'React', 'TypeScript', 'Grafana'],
    placeholder: true,
    featured: true,
    year: 2024,
  },
  {
    slug: 'iot-edge-gateway',
    title: 'IoT Edge-to-SaaS Gateway',
    tag: 'Industrial IoT + SaaS Integration',
    shortDescription: 'Built a secure edge gateway connecting factory PLCs and sensors to cloud SaaS platforms with MQTT, OPC-UA, and protocol translation.',
    description: `
### Overview
An industrial IoT edge gateway that bridges legacy PLCs, sensors, and SCADA systems to modern cloud SaaS platforms. Designed for harsh factory environments with intermittent connectivity.

### Problem
- Heterogeneous protocols on the shop floor (Modbus, OPC-UA, proprietary)
- Unreliable network connectivity requiring local buffering
- Security requirements: zero-trust, certificate-based auth, data encryption
- Need for over-the-air (OTA) updates to thousands of edge devices

### My Role
Designed the protocol abstraction layer and cloud sync engine. Implemented the device provisioning and certificate rotation pipeline.

### Tech Stack
- **Edge Runtime**: .NET 8 on Linux (Ubuntu Core / BalenaOS)
- **Protocols**: MQTT 3.1/5, OPC-UA, Modbus TCP/RTU
- **Security**: X.509 certs, TPM-backed key storage, mTLS
- **Cloud**: Azure IoT Hub, Device Provisioning Service
- **Local Storage**: SQLite with write-ahead logging for buffering
- **Orchestration**: BalenaCloud for fleet management and OTA

### Outcome
- 500+ edge devices deployed across 12 facilities
- 99.9% data delivery guarantee with store-and-forward
- Sub-minute provisioning for new devices via DPS
- Reduced cloud ingress costs by 60% via edge filtering/aggregation

### Links
- Repository: Private (enterprise)
- Demo: Internal only
    `,
    techStack: ['.NET 8', 'MQTT', 'OPC-UA', 'Azure IoT Hub', 'Linux', 'SQLite', 'BalenaCloud'],
    placeholder: true,
    featured: true,
    year: 2023,
  },
  {
    slug: 'mcp-agent-toolkit',
    title: 'MCP Agent Toolkit',
    tag: 'Model Context Protocol / Agentic Engineering',
    shortDescription: 'An open-source toolkit for building MCP servers and agentic workflows with TypeScript, featuring composable tools, resource management, and LLM-agnostic orchestration.',
    description: `
### Overview
A developer toolkit for building Model Context Protocol (MCP) servers and orchestrating agentic workflows. Designed to be LLM-agnostic and composable, enabling developers to expose tools, resources, and prompts to any MCP-compatible client.

### Problem
- MCP specification is new; few batteries-included frameworks exist
- Developers need to compose multiple tools into coherent workflows
- Testing and debugging agentic loops is difficult without observability
- Need for type-safe tool definitions across TypeScript and Python

### My Role
Sole author and maintainer. Designed the core abstractions, CLI, and plugin system.

### Tech Stack
- **Core**: TypeScript, Zod for schema validation
- **Transport**: stdio, SSE, WebSocket (MCP spec compliant)
- **Orchestration**: Custom workflow engine with DAG-based execution
- **Observability**: OpenTelemetry traces, structured logs
- **Testing**: Vitest with property-based testing for tool contracts
- **Distribution**: npm package, Docker image, GitHub Actions CI

### Outcome
- 50+ tools implemented across filesystem, Git, HTTP, database, and browser domains
- Used in 3 production agentic systems internally
- MIT licensed, open for community contributions

### Links
- Repository: https://github.com/hariz-harisun/mcp-agent-toolkit (placeholder)
- Demo: CLI playground included
    `,
    techStack: ['TypeScript', 'MCP', 'Zod', 'OpenTelemetry', 'Vitest', 'Docker'],
    placeholder: true,
    featured: false,
    year: 2025,
  },
  {
    slug: 'portfolio-nextjs',
    title: 'This Portfolio (Next.js Rebuild)',
    tag: 'Next.js + Tailwind + MDX + Static Export',
    shortDescription: 'A performant, accessible, dark-mode portfolio built with Next.js App Router, featuring MDX blog, project showcase, and GitHub Pages deployment.',
    description: `
### Overview
A complete rewrite of my personal portfolio from Quarto to Next.js with static export for GitHub Pages. Designed as a bento-grid dark theme with full accessibility and performance targets.

### Problem
- Quarto site was hard to customise beyond academic layouts
- No MDX support for interactive blog components
- Malay/English i18n added complexity without value
- Deployment to GitHub Pages required manual steps

### My Role
Sole developer. Designed the visual system, architected the content pipeline, and configured CI/CD.

### Tech Stack
- **Framework**: Next.js 15 (App Router), React 19
- **Styling**: Tailwind CSS v4, next/font (DM Sans + Caveat)
- **Content**: MDX with frontmatter, rehype-pretty-code for syntax highlighting
- **Icons**: react-icons (Font Awesome, Simple Icons)
- **Deployment**: GitHub Actions → GitHub Pages (static export)
- **Quality**: ESLint, link checker, Lighthouse CI

### Outcome
- 100/100 Lighthouse scores across all categories
- Sub-100ms TTFB on GitHub Pages
- Fully accessible (WCAG 2.1 AA)
- Content managed via .mdx files and data/*.js — no CMS needed

### Links
- Repository: https://github.com/hariz-harisun/hariz-harisun.github.io
- Live: https://hariz-harisun.github.io
    `,
    techStack: ['Next.js 15', 'React 19', 'Tailwind CSS v4', 'MDX', 'TypeScript', 'GitHub Actions'],
    placeholder: false,
    featured: false,
    year: 2025,
  },
];