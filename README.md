# StudySnap - AI Notes Builder

Transform your study materials into AI-powered notes instantly.

## Features

- ✨ AI-powered note generation using Google Gemini API
- 📱 Mobile-responsive design
- 🌙 Dark mode support
- 📚 Multiple note formats (short, detailed, bullet points, flashcards, MCQs, etc.)
- 📄 Support for PDF, DOCX, PPT, and images
- 🔐 Secure authentication with Supabase
- 💳 Subscription management (Free & Pro plans)
- 📊 Admin dashboard

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Authentication & Database)
- **AI**: Google Gemini API
- **State Management**: Zustand
- **UI Components**: Lucide Icons

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/studysnap-ai-notes.git
cd studysnap-ai-notes
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 4. Get API Keys

**Supabase:**
1. Go to https://supabase.com
2. Create a new project
3. Copy your Project URL and Anon Key from Settings > API

**Google Gemini API:**
1. Go to https://makersuite.google.com/app/apikey
2. Create a new API key
3. Copy and paste it into your .env.local file

### 5. Run the development server
```bash
npm run dev
```

The app will open at http://localhost:3000

## Database Schema

See `DATABASE_SCHEMA.sql` for the complete schema setup.

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Connect your GitHub repo to Netlify
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For support, email support@studysnap.com or open an issue on GitHub.
