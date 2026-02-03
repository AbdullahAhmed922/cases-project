# User Management Frontend

A modern Next.js frontend application for managing users with full CRUD functionality.

## Features

- ✅ **View Users** - Display all users in a responsive table
- ✅ **Create User** - Add new users with validation
- ✅ **Edit User** - Update existing user information
- ✅ **Delete User** - Remove users from the system
- ✅ **Responsive Design** - Works on desktop and mobile devices
- ✅ **Real-time Validation** - Client-side form validation
- ✅ **Error Handling** - User-friendly error messages

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React 19** - UI library

## Project Structure

```
app/
├── layout.tsx          # Root layout
├── page.tsx            # Home page with navigation
├── globals.css         # Global styles
└── users/
    ├── page.tsx        # Users list page
    ├── create/
    │   └── page.tsx    # Create user page
    └── [id]/
        └── edit/
            └── page.tsx # Edit user page

components/
├── UserForm.tsx        # Reusable form component
└── UserList.tsx        # Users table component

lib/
├── api.ts              # API client with fetch methods
└── types.ts            # TypeScript interfaces and types
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the frontend root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**Note:** The `NEXT_PUBLIC_` prefix makes this variable available in the browser.

### 3. Backend API Requirements

The backend should provide the following endpoints:

#### GET /api/users
Get all users
- **Response:** `{ data: User[] }`

#### GET /api/users/:id
Get a specific user
- **Response:** `{ data: User }`

#### POST /api/users
Create a new user
- **Body:** `{ name, email, phone? }`
- **Response:** `{ data: User }`

#### PATCH /api/users/:id
Update a user
- **Body:** `{ name?, email?, phone? }`
- **Response:** `{ data: User }`

#### DELETE /api/users/:id
Delete a user
- **Response:** Any success response

### 4. Run the Application

**Development Mode:**
```bash
npm run dev
```

The application will start at `http://localhost:3001` (or the next available port).

**Production Build:**
```bash
npm run build
npm start
```

## User Model

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
}
```

## API Client Usage

The `lib/api.ts` file provides a `userAPI` object with the following methods:

```typescript
// Get all users
const users = await userAPI.getAllUsers();

// Get a specific user
const user = await userAPI.getUserById(userId);

// Create a new user
const newUser = await userAPI.createUser({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890'
});

// Update a user
const updatedUser = await userAPI.updateUser(userId, {
  name: 'Jane Doe',
  email: 'jane@example.com'
});

// Delete a user
await userAPI.deleteUser(userId);
```

## Component Usage

### UserForm Component

A reusable form component for creating and editing users.

```tsx
<UserForm
  initialData={user}              // Optional: for edit mode
  onSubmit={handleSubmit}         // Callback on form submit
  isLoading={false}               // Optional: loading state
/>
```

### UserList Component

A table component for displaying users with edit/delete actions.

```tsx
<UserList
  users={users}                   // Array of users
  onDelete={handleDelete}         // Delete callback
  isLoading={false}               // Optional: loading state
/>
```

## Pages

### Home Page (`/`)
- Welcome page with navigation links
- Quick access to user management features

### Users List (`/users`)
- View all users in a table
- Edit and delete options for each user
- Create new user button

### Create User (`/users/create`)
- Form to create a new user
- Real-time validation
- Success redirect to users list

### Edit User (`/users/[id]/edit`)
- Form to edit an existing user
- Pre-populated with current user data
- Success redirect to users list

## Styling

The application uses **Tailwind CSS** for styling. Global styles are defined in `app/globals.css`.

### Color Scheme
- Primary: Blue (`bg-blue-500`, `text-blue-500`)
- Error: Red (`bg-red-100`, `text-red-700`)
- Background: Gray (`bg-gray-50`)
- Text: Gray (`text-gray-800`, `text-gray-600`)

## Error Handling

The application provides comprehensive error handling:

- API request errors are caught and displayed to users
- Form validation errors are shown inline
- Network errors trigger appropriate messages
- All async operations have loading states

## Next Steps / Future Enhancements

- [ ] Add authentication/authorization
- [ ] Implement pagination for large user lists
- [ ] Add search and filter functionality
- [ ] Add export to CSV/Excel
- [ ] Implement role-based access control
- [ ] Add user profile pages
- [ ] Implement soft delete functionality
- [ ] Add audit logs

## Troubleshooting

### "Failed to fetch users" error
- Ensure the backend is running on the correct port
- Check that `NEXT_PUBLIC_API_URL` is correctly set
- Verify backend API endpoints are implemented
- Check browser console for CORS errors

### Form not submitting
- Verify all required fields are filled
- Check backend API is responding
- Look for error messages in the form

### Port already in use
- Use a different port: `npm run dev -- -p 3002`
- Or kill the process using the port

## License

MIT
