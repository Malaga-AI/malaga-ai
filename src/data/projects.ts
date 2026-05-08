import type { Project } from '@/types/community'

export const projects: Project[] = [
  {
    id: 'local-rag-assistant',
    title: 'Local RAG Assistant',
    description: 'A privacy-first assistant that searches local documents and explains its sources for small teams.',
    authors: ['Malaga AI Builders Circle'],
    stack: ['TypeScript', 'SQLite', 'Embeddings', 'Ollama'],
    repoUrl: '#',
    tags: ['RAG', 'Local AI', 'Knowledge bases'],
  },
  {
    id: 'event-notes',
    title: 'AI Event Notes Generator',
    description: 'Turns session transcripts into summaries, follow-up links, speaker highlights, and action points.',
    authors: ['Nora Castillo', 'Community contributors'],
    stack: ['React', 'Node.js', 'LLMs'],
    demoUrl: '#',
    tags: ['Automation', 'Summaries', 'Community ops'],
  },
  {
    id: 'vision-demo-lab',
    title: 'Computer Vision Demo Lab',
    description: 'Small browser demos for detection, segmentation, and uncertainty visualization during workshops.',
    authors: ['Marcus Chen', 'Malaga AI Lab Night'],
    stack: ['Python', 'ONNX', 'WebGPU'],
    tags: ['Computer vision', 'Demos', 'Education'],
  },
  {
    id: 'prompt-eval-toolkit',
    title: 'Prompt Evaluation Toolkit',
    description: 'A lightweight checklist and test harness for comparing prompts before shipping AI features.',
    authors: ['Samir Rojas'],
    stack: ['TypeScript', 'Vitest', 'CSV'],
    repoUrl: '#',
    tags: ['Evaluation', 'Prompting', 'Quality'],
  },
]
