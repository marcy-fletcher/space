# Marcy's Private Space 💖

A sleek and sexy React + TypeScript + Tailwind CSS blog with pink-themed design, Supabase authentication, and full story reading functionality.

## Features

- 🎨 Beautiful pink gradient design with glassmorphism effects
- 🔍 Search functionality for titles and tags
- 🔒 Locked post display for private content
- 👥 Featured characters section for each post
- 🔐 User authentication with Supabase (email/password and Google OAuth)
- 📚 Bookmark system for saving favorite stories
- 👤 User profiles with avatar and preferences
- 📱 Fully responsive design
- ⚡ Built with Vite for fast development
- 🧭 React Router with HashRouter for seamless navigation
- 📖 Full story reading page with elegant typography
- 👤 Detailed character information pages with photos, backgrounds, and story connections
- 🏗️ Service-oriented architecture with separate data services

## Components

- **BlogPostCard**: Displays individual blog posts with title, tags, preview, date, characters, and "Read Full" button
- **LockedPostCard**: Shows locked/private posts with a lock icon
- **SearchBar**: Search posts by title or tags
- **Character**: Displays character avatars with emoji and names (clickable to view details)
- **Layout**: Shared layout component with background effects, navigation, and auth buttons
- **BlogList**: Main blog listing page with loading states
- **StoryPage**: Full story reading page with loading states
- **CharacterInfoPage**: Detailed character profile with image, background, personality, and related stories
- **Auth Components**: Login, Register, AuthModal, and UserMenu for authentication
- **AuthContext**: React context for authentication state management

## Services Architecture

The application now uses a service-oriented architecture with separate services for different data types:

- **AuthService**: Handles user authentication, registration, and session management
- **PostService**: Manages blog posts, search, and filtering operations
- **CharacterService**: Handles character data, search, and relationships
- **UserService**: Manages user profiles, bookmarks, and preferences

Each service provides async methods with proper error handling and loading states.

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- A Supabase account and project

### Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API to get your URL and anon key
3. Create the required database tables:

```sql
-- Profiles table
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookmarks table
CREATE TABLE bookmarks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    post_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, post_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Bookmarks policies
CREATE POLICY "Users can view their own bookmarks" ON bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own bookmarks" ON bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own bookmarks" ON bookmarks FOR DELETE USING (auth.uid() = user_id);
```

### Installation

```bash
npm install
```

### Environment Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update the `.env` file with your Supabase credentials:
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build

```bash
npm run build
```

## Project Structure

```
/workspace
├── src/
│   ├── components/
│   │   ├── auth/              # Authentication components
│   │   │   ├── Login.tsx      # Login form
│   │   │   ├── Register.tsx   # Registration form
│   │   │   ├── AuthModal.tsx  # Modal wrapper for auth
│   │   │   ├── UserMenu.tsx   # User dropdown menu
│   │   │   └── types.ts       # Auth component types
│   │   ├── BlogPostCard.tsx   # Main post card component
│   │   ├── LockedPostCard.tsx # Locked post display
│   │   ├── SearchBar.tsx      # Search functionality
│   │   ├── Character.tsx      # Character avatar component
│   │   └── Layout.tsx         # Shared layout with background and navigation
│   ├── pages/
│   │   ├── BlogList.tsx       # Blog listing page with loading states
│   │   ├── StoryPage.tsx      # Full story reading page with loading states
│   │   └── CharacterInfoPage.tsx # Character profile page with loading states
│   ├── services/              # Service layer for data management
│   │   ├── supabase.ts        # Supabase client configuration
│   │   ├── auth.ts           # Authentication service
│   │   ├── posts.ts          # Posts service with mock data
│   │   ├── characters.ts     # Characters service with mock data
│   │   └── user.ts           # User management service
│   ├── contexts/
│   │   └── AuthContext.tsx   # Authentication context provider
│   ├── types/
│   │   └── index.ts          # TypeScript type definitions
│   ├── App.tsx               # Main app with routing and auth provider
│   └── main.tsx              # Application entry point
├── .env.example              # Environment variables template
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Customization

### Adding Posts (Mock Data)

Currently, the application uses mock data for blog posts and characters. To add or modify content, edit the service files:

**Posts**: Edit `src/services/posts.ts` - modify the `mockPosts` array
**Characters**: Edit `src/services/characters.ts` - modify the `mockCharacters` object

```typescript
// In src/services/posts.ts
export const mockPosts: MaybePost[] = [
    {
        id: '1',
        title: 'Your Post Title',
        tags: ['tag1', 'tag2'],
        preview: 'Your preview text...',
        fullContent: 'Your full story content here...\n\nUse \\n\\n for paragraph breaks.',
        publishDate: '2025-11-16',
        characters: [
            { id: 'c1', name: 'Character Name', emoji: '🌟' }
        ]
    },
    undefined, // This will show as locked
];
```

### Switching to Database

To switch from mock data to a real database:

1. **Update PostService** in `src/services/posts.ts`:
   - Replace mock data with Supabase queries
   - Implement CRUD operations

2. **Update CharacterService** in `src/services/characters.ts`:
   - Replace mock data with database queries
   - Add character management features

3. **Example database structure**:
```sql
-- Posts table
CREATE TABLE posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    tags TEXT[],
    preview TEXT,
    full_content TEXT,
    publish_date DATE,
    characters TEXT[]
);

-- Characters table
CREATE TABLE characters (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    emoji TEXT,
    age INTEGER,
    description TEXT,
    picture_url TEXT,
    tags TEXT[],
    stories TEXT[],
    personality TEXT[],
    background TEXT
);
```

### Navigation

The app uses React Router with HashRouter for client-side routing:
- **`/`** - Blog listing page with search functionality
- **`/story/:id`** - Individual story reading page
- **`/character/:id`** - Character information page

**How to navigate:**
- Click "Read Full Story" on any post card to navigate to the full story page
- Click on any character avatar to view their detailed profile
- Use "Back" buttons to return to previous pages
- All navigation is smooth with HashRouter (no page reloads!)

### Styling

The design uses Tailwind CSS with custom pink color palette. Modify `tailwind.config` in `index.html` to adjust colors.

## Technologies

- React 18
- TypeScript
- Tailwind CSS
- React Router DOM 6 (HashRouter)
- Supabase (Authentication & Database)
- React Hot Toast (Notifications)
- Unsplash (character photos)
- Vite
- Google Fonts (Playfair Display + Inter)
