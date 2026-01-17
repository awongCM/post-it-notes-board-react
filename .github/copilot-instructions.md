# Copilot Instructions for Post-It Notes Board

## Architecture Overview

This is a React 16 application using class components with a separate Rails 5 API backend (hosted externally). The frontend is bundled with Webpack and served via Express in production.

**Component hierarchy:**

- `App` → `NotesContainer` (state management hub) → `ButtonsContainer`, `Note`/`NoteForm`, wrapped in `Draggable`
- `NotesContainer` holds all state (`notes[]`, `editing_note_id`) and handles CRUD operations
- `NoteForm` appears inline when editing; saves on blur via API

**Data flow:** API calls in [src/service/api.js](src/service/api.js) use Axios. State updates use `immutability-helper` with `$splice` and `$set` operators—maintain this pattern for consistency.

## Development Commands

```bash
npm run dev      # Webpack dev server with hot reload (opens browser)
npm run build    # Production build to /dist
npm start        # Build + run Express server on PORT 3000
```

## Key Patterns & Conventions

### State Management

- Use `immutability-helper` for state updates (see [NotesContainer.js#L42-L63](src/components/NotesContainer.js)):
  ```js
  const notes = update(this.state.notes, { $splice: [[0, 0, newNote]] });
  ```

### Component Structure

- Class components with `.bind(this)` in render methods for event handlers
- Each component has co-located `.scss` file (e.g., `Note.js` + `Note.scss`)
- PropTypes validation required for all props

### Note Colors

Three priority types defined by color: `yellow` (nice-to-have), `orange` (feature), `red` (urgent). Colors are stored in the note object and passed as inline styles.

### API Integration

- Backend URL in [src/service/api.js](src/service/api.js) points to Render-hosted Rails API
- Note payload structure: `{ note: { title, content, color } }`
- For local dev, uncomment the dev URL and update to your local API

### Draggable Notes

Notes use `react-draggable` with random initial positions via `randomPosition()`. Position data is NOT persisted—this is a known limitation (see README todos).

## File Naming

- Components: PascalCase (`NotesContainer.js`)
- Styles: Match component name (`NotesContainer.scss`)
- Single export per component file

## External Dependencies

- **API Server**: `https://post-it-notes-board-api.onrender.com` (Rails 5)
- Notes require the external API to be running for any CRUD operations

## Local Development with API

To use a local Rails API instead of the hosted one:

1. Clone and run the Rails API server locally (typically on port 5000)
2. In [src/service/api.js](src/service/api.js), uncomment the dev URL and comment out prod:
   ```js
   export const BASE_URL_API = "http://localhost:5000/v1/notes";
   // export const BASE_URL_API = 'https://post-it-notes-board-api.onrender.com/v1/notes';
   ```

## Environment Variables

**Current state:** API URL is hardcoded in `api.js` with a TODO for dotenv setup. When adding new config:

- Follow the existing pattern until dotenv is implemented
- Mark hardcoded values with `// TODO - refactor to use dot env setup`

## Deployment

- **Frontend**: Deployed via Heroku using `Procfile` → runs `node server.js`
- **API**: Hosted separately on Render at `post-it-notes-board-api.onrender.com`
- Production build outputs to `/dist` directory

## Testing

**Note:** No test suite currently exists. When adding tests:

- Use Jest + React Testing Library (compatible with React 16)
- Prioritize testing `NotesContainer` state management and API integration
- Mock `NotesBoardAPI` methods for unit tests
