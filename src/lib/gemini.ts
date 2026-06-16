import axios from 'axios'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''
const API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent'

export interface GenerateNotesParams {
  content: string
  type: 'short' | 'detailed' | 'bullet' | 'chapter' | 'formulas' | 'definitions' | 'flashcards' | 'mcq'
}

export interface GenerateNotesResponse {
  text: string
  type: string
}

const prompts = {
  short: 'Create concise study notes (200-300 words) from the following content:',
  detailed: 'Create detailed, comprehensive notes (1000+ words) from the following content:',
  bullet: 'Create bullet point summary with key concepts from the following content:',
  chapter: 'Create a complete chapter summary with introduction, main points, and conclusion from:',
  formulas: 'Extract all important formulas, equations, and mathematical concepts from:',
  definitions: 'Extract all important definitions, terms, and concepts from:',
  flashcards: 'Create flashcards (Q&A format) suitable for studying from:',
  mcq: 'Create 10 multiple choice questions with answers based on:',
}

export async function generateNotes(params: GenerateNotesParams): Promise<GenerateNotesResponse> {
  try {
    const prompt = `${prompts[params.type]}

${params.content}`

    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }
    )

    const generatedText = response.data.candidates[0].content.parts[0].text

    return {
      text: generatedText,
      type: params.type,
    }
  } catch (error) {
    console.error('Error generating notes:', error)
    throw new Error('Failed to generate notes. Please try again.')
  }
}