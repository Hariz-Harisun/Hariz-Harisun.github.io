import {
  SiDotnet,
  SiSharp,
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiPostgresql,
  SiTailwindcss,
  SiDocker,
  SiGithub,
  SiAnthropic,
  SiMqtt,
  SiKubernetes,
  SiGrafana,
  SiPrometheus,
  SiRedis,
  SiRabbitmq,
  SiLinux,
  SiPython,
} from 'react-icons/si';
import { FaMicrosoft } from 'react-icons/fa';

export const SKILL_CATEGORIES = [
  {
    category: 'Backend / .NET',
    skills: [
      { name: '.NET / ASP.NET Core', Icon: SiDotnet, color: '#512BD4' },
      { name: 'C#', Icon: SiSharp, color: '#239120' },
      { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
      { name: 'Redis', Icon: SiRedis, color: '#DC382D' },
      { name: 'RabbitMQ', Icon: SiRabbitmq, color: '#FF6600' },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'React', Icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', Icon: SiNextdotjs, color: '#000000' },
      { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
      { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
    ],
  },
  {
    category: 'Industrial IoT & Data',
    skills: [
      { name: 'MQTT', Icon: SiMqtt, color: '#3C9BDC' },
      { name: 'Grafana', Icon: SiGrafana, color: '#F46800' },
      { name: 'Prometheus', Icon: SiPrometheus, color: '#E6522C' },
      { name: 'Python', Icon: SiPython, color: '#3776AB' },
    ],
  },
  {
    category: 'AI & Agents',
    skills: [
      { name: 'Claude / MCP', Icon: SiAnthropic, color: '#D4A27F' },
      { name: 'Agentic Workflows', Icon: SiAnthropic, color: '#D4A27F' },
    ],
  },
  {
    category: 'Tools & DevOps',
    skills: [
      { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
      { name: 'Kubernetes', Icon: SiKubernetes, color: '#326CE5' },
      { name: 'Azure / Microsoft', Icon: FaMicrosoft, color: '#0078D7' },
      { name: 'GitHub', Icon: SiGithub, color: '#FFFFFF' },
      { name: 'Linux', Icon: SiLinux, color: '#FCC624' },
    ],
  },
];

export const ALL_SKILLS = SKILL_CATEGORIES.flatMap((c) => c.skills);