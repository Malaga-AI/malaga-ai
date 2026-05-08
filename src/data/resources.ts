import type { Resource } from '@/types/community'

export const resources: Resource[] = [
  {
    id: 'intro-agents',
    title: 'Intro to AI Agents',
    description: 'A concise guide to agent loops, tool use, memory, planning, and practical failure modes.',
    type: 'guide',
    url: '#',
    tags: ['Agents', 'Foundations'],
    level: 'beginner',
  },
  {
    id: 'rag-checklist',
    title: 'RAG Architecture Checklist',
    description: 'Questions to ask before building retrieval systems, from chunking to ranking and observability.',
    type: 'tool',
    url: '#',
    tags: ['RAG', 'Architecture'],
    level: 'intermediate',
  },
  {
    id: 'prompt-evaluation',
    title: 'Prompt Evaluation Guide',
    description: 'A working template for scoring prompts with examples, regression cases, and user outcomes.',
    type: 'slides',
    url: '#',
    tags: ['Evaluation', 'Prompting'],
    level: 'all',
  },
  {
    id: 'responsible-deployment',
    title: 'Responsible AI Deployment Notes',
    description: 'Community notes on safety reviews, documentation, feedback loops, and human escalation paths.',
    type: 'paper',
    url: '#',
    tags: ['Responsible AI', 'Deployment'],
    level: 'all',
  },
]
