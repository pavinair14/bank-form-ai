# Bank AI Form

A modern, interactive bank form application with PDF viewing and dynamic form filling capabilities. Built with React, TypeScript, and Tailwind CSS.

## 🔗 Preview

Run locally (see setup below) and open the printed localhost URL from Vite (typically http://localhost:5173 or a nearby port).

## Tech Stack

- **Framework/Build:** Vite + React 19 + TypeScript
- **Forms:** react-hook-form
- **State Management:** Context API
- **Validation:** Zod
- **Styling:** Tailwind CSS + Shadcn UI
- **Animations:** Framer Motion
- **Icons:** lucide-react
- **PDF rendering:** react-pdf
- **AI Suggestion:** Document AI (mock data)

## Features

✨ **Dynamic Form Generation**
- Auto-generates form fields from PDF data
- Real-time validation with Zod
- Responsive grid layout (1 column on mobile, 2 columns on desktop)
- Support for text, number, checkbox, and date fields

📄 **Interactive PDF Viewer**
- Side-by-side PDF and form display
- Interactive field highlighting with green focus indicators
- Smooth animations and visual feedback
- Synchronized field focus between PDF and form
- **Automatic scroll-to-field highlight on large screens**
- **Highlight overlays use only Tailwind CSS classes (no style tags)**

🎯 **Form Validation**
- Client-side validation with Zod schemas
- Custom validation rules for numeric fields
- Date format validation (DD/MM/YYYY)
- Real-time error messages
- Optional field support

✅ **User Experience**
- Smooth animations with Framer Motion
- Auto-hide success messages after 3 seconds
- Disabled submit button during form submission
- Clean, modern UI with shadcn/ui components
- Accessible form controls with proper labels


## Project Structure

```bash
src/
  main.tsx
  app/
      App.tsx
      Layout.tsx
  assets/
    sample-form.pdf
  components/
    ui/
      button.tsx
      card.tsx
      input.tsx
      label.tsx
      checkbox.
  context/
    FieldContext.tsx
    FieldProvider.tsx
    types.ts
    useFieldContext.ts
  features/
    document-ai/
      aiServices.ts
      data.ts
      useLoadFormData.ts
    form/
      animations.ts
      DynamicForm.tsx
      schema.ts
      submitForm.ts
    modals/
      animations.ts
      PdfViewer.tsx
      types.ts
    lib/
      utils.ts
```


## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bank-ai-form
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## Form Fields

### Validation Rules

### Numeric Fields
- **account_number**: Exactly 9 digits (e.g., `321502150`)
- **mobile_number**: Exactly 10 digits (e.g., `6378951260`)
- **primary_acc_id**: Exactly 10 digits (e.g., `4458312548`)

### Date Fields
- Format: `DD/MM/YYYY` (e.g., `06/03/1976`)

### Optional Fields
- `last_name`
- `post_office`

All other fields are required.

## Performance Optimizations

✅ Memoized form submission handler with `useCallback`
✅ Memoized default values computation with `useMemo`
✅ Memoized PDF page load callback with `useCallback`
✅ Pre-calculated pixel field coordinates with `useMemo`
✅ Pre-computed style objects to avoid recreation
✅ React Context memoization to prevent unnecessary re-renders


### Responsive Breakpoints
- **Mobile**: Single column form layout
- **Large screens (lg)**: Two-column form layout

## 🤝 Contributing

PRs and issues are welcome. Please include tests when changing behavior.


## 📄 License

MIT