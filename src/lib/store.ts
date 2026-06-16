import { create } from 'zustand'
import { supabase } from './supabase'

interface User {
  id: string
  email: string
  name: string
  subscription: 'free' | 'pro'
  notesUsed: number
  notesLimit: number
}

interface Note {
  id: string
  userId: string
  title: string
  content: string
  type: string
  createdAt: string
  updatedAt: string
  folderId?: string
  isBookmarked: boolean
}

interface Store {
  user: User | null
  notes: Note[]
  folders: Array<{ id: string; name: string; userId: string }>
  setUser: (user: User | null) => void
  setNotes: (notes: Note[]) => void
  addNote: (note: Note) => void
  deleteNote: (id: string) => void
  updateNote: (id: string, note: Partial<Note>) => void
  toggleBookmark: (id: string) => void
}

export const useStore = create<Store>((set) => ({
  user: null,
  notes: [],
  folders: [],
  setUser: (user) => set({ user }),
  setNotes: (notes) => set({ notes }),
  addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
    })),
  updateNote: (id, note) =>
    set((state) => ({
      notes: state.notes.map((n) => (n.id === id ? { ...n, ...note } : n)),
    })),
  toggleBookmark: (id) =>
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === id ? { ...n, isBookmarked: !n.isBookmarked } : n
      ),
    })),
}))