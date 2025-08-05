- **Optimized State Management**: Zustand with devtools and persistence

## 🛠 Tech Stack

- **Framework**: Next.js 13 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: Zustand with persistence
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **API**: Mock API with JSONPlaceholder integration

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard page
│   ├── posts/             # Post management pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── auth/              # Authentication components
│   ├── common/            # Shared components
│   ├── posts/             # Post-related components
│   └── ui/                # UI components (shadcn/ui)
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and API functions
├── stores/                # Zustand stores
└── types/                 # TypeScript type definitions
```

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blogapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔑 Demo Credentials

Use these credentials to test the application:

- **Email**: `john@example.com`
- **Password**: `password123`