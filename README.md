# TMS Frontend - React Application

## Technology Stack

- React 18.2
- Apollo Client (GraphQL)
- React Router v6
- SCSS Modules
- Modern JavaScript (ES6+)

## Prerequisites

1. **Node.js 18+**: Download from https://nodejs.org/
2. **npm** (comes with Node.js)

### Windows Installation

```bash
# Install Node.js
winget install OpenJS.NodeJS

# Verify installation
node -v
npm -v
```

## Setup & Run

### 1. Navigate to frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the application

```bash
npm start
```

### 4. Access the application

- **URL**: http://localhost:3000
- Login with default credentials (see below)

## Default Login Credentials

```
Admin:
  Username: admin
  Password: admin123
  (Can delete shipments)

Employee:
  Username: employee
  Password: emp123
  (Cannot delete shipments)
```

## Features

### 1. Authentication

- JWT-based authentication
- Protected routes
- Token storage in localStorage
- Auto-redirect to login if unauthorized

### 2. Layout

- **Sticky Header** with horizontal navigation
- **Hamburger Sidebar** with collapsible submenu
- **Responsive Design** (mobile, tablet, desktop)
- User profile display with avatar

### 3. Shipments Management

- **Grid View**: Table with 10 columns
- **Tile View**: Card-based layout
- **Toggle between views** with smooth transition
- **Click any row/tile** to see detailed view

### 4. CRUD Operations

- ✅ Create new shipments
- ✅ Edit existing shipments
- ✅ Delete shipments (Admin only)
- ✅ Flag/unflag shipments
- ✅ Real-time updates

### 5. Detail View

- Modal popup showing complete shipment information
- Organized sections for shipper, carrier, package info
- Special instructions display
- Timestamps (created/updated)

### 6. Actions Menu (Bun Button)

Each tile has a menu (⋮) with:

- ✏️ Edit
- 🚩 Flag/Unflag
- 🗑️ Delete (Admin only)

### 7. Pagination

- Previous/Next navigation
- Page counter
- Total elements display
- Configurable page size

## Folder Structure

```
src/
├── apollo/                  # Apollo Client configuration
├── components/
│   ├── common/             # Reusable components
│   │   ├── Button/
│   │   ├── Loader/
│   │   ├── ErrorMessage/
│   │   └── Modal/
│   ├── layout/             # Layout components
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   └── Layout/
│   └── shipments/          # Shipment-specific components
│       ├── ShipmentGrid/
│       ├── ShipmentTiles/
│       ├── ShipmentDetail/
│       └── ShipmentForm/
├── graphql/                # GraphQL queries & mutations
├── pages/                  # Page components
├── styles/                 # Global styles & variables
└── utils/                  # Utilities & constants
```

## Design Highlights

### Color Scheme

- **Primary**: Blue (#2563eb)
- **Secondary**: Green (#10b981)
- **Danger**: Red (#ef4444)
- **Warning**: Orange (#f59e0b)

### Status Colors

- Pending: Orange
- Picked Up: Blue
- In Transit: Light Blue
- Out for Delivery: Lime Green
- Delivered: Green
- Cancelled: Red
- Delayed: Orange-Red

### UI/UX Features

- Smooth transitions and animations
- Hover effects on interactive elements
- Loading states for async operations
- Error handling with retry options
- Responsive grid/flexbox layouts
- Module SCSS for component isolation
- Box shadows for depth
- Clean, modern design

## Component Breakdown

### Common Components

- **Button**: Multiple variants (primary, secondary, danger, outline)
- **Loader**: Full-page and inline loading indicators
- **ErrorMessage**: Error display with retry functionality
- **Modal**: Reusable modal with sizes and animations

### Layout Components

- **Header**: Top navigation with user menu and logout
- **Sidebar**: Collapsible menu with submenu support
- **Layout**: Main layout wrapper

### Shipment Components

- **ShipmentGrid**: Table view with sortable columns
- **ShipmentTiles**: Card view with compact information
- **ShipmentDetail**: Full detail modal view
- **ShipmentForm**: Create/Edit form with validation

## Environment Configuration

The app connects to the GraphQL API at `http://localhost:8082/graphql`. This can be modified in `src/apollo/client.js`.

## Build for Production

```bash
npm run build
```

Creates optimized production build in `build/` directory.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Code splitting with React.lazy (if needed)
- Module SCSS for CSS optimization
- Apollo Client caching
- Optimized re-renders with React best practices
- Lazy loading of images (if implemented)

## Accessibility

- Semantic HTML
- Keyboard navigation support
- ARIA labels where appropriate
- Focus management in modals
