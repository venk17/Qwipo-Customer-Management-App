# Customer Management App

A full-stack web application for managing customers and their addresses, built with Node.js, Express.js, SQLite, and React.

## Features

- **Customer Management**: Create, read, update, and delete customer records
- **Address Management**: Manage multiple addresses per customer
- **Search & Filter**: Search customers by name/phone and filter by city
- **Pagination**: Efficient handling of large customer lists
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Validation**: Client and server-side form validation
- **Professional UI**: Clean, modern interface with smooth interactions

## Tech Stack

### Backend
- **Node.js** with **Express.js** framework
- **SQLite** database for data storage
- **express-validator** for input validation
- RESTful API architecture

### Frontend
- **React.js** with functional components and hooks
- **React Router** for navigation
- **Axios** for API communications
- **Lucide React** for icons
- Responsive CSS with modern design principles

## Project Structure

```
customer-management-app/
├── server/                 # Backend Node.js application
│   ├── database/
│   │   ├── init.js        # Database initialization
│   │   └── database.db    # SQLite database file (auto-created)
│   ├── routes/
│   │   ├── customers.js   # Customer API routes
│   │   └── addresses.js   # Address API routes
│   ├── middleware/
│   │   └── validation.js  # Validation middleware
│   ├── server.js          # Express server setup
│   └── package.json       # Backend dependencies
├── client/                 # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   ├── App.js         # Main App component
│   │   └── index.js       # React entry point
│   └── package.json       # Frontend dependencies
└── package.json           # Root package.json for scripts
```

## Database Schema

### customers table
- `id` - INTEGER (Primary Key, Auto-increment)
- `first_name` - TEXT (NOT NULL)
- `last_name` - TEXT (NOT NULL)
- `phone_number` - TEXT (NOT NULL, UNIQUE)
- `created_at` - DATETIME (Default: CURRENT_TIMESTAMP)
- `updated_at` - DATETIME (Default: CURRENT_TIMESTAMP)

### addresses table
- `id` - INTEGER (Primary Key, Auto-increment)
- `customer_id` - INTEGER (Foreign Key → customers.id)
- `address_details` - TEXT (NOT NULL)
- `city` - TEXT (NOT NULL)
- `state` - TEXT (NOT NULL)
- `pin_code` - TEXT (NOT NULL)
- `created_at` - DATETIME (Default: CURRENT_TIMESTAMP)
- `updated_at` - DATETIME (Default: CURRENT_TIMESTAMP)

## API Endpoints

### Customer Routes
- `POST /api/customers` - Create new customer
- `GET /api/customers` - Get all customers (with search, sort, pagination)
- `GET /api/customers/:id` - Get customer by ID
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Address Routes
- `POST /api/customers/:id/addresses` - Add address for customer
- `GET /api/customers/:id/addresses` - Get all addresses of customer
- `PUT /api/addresses/:addressId` - Update address
- `DELETE /api/addresses/:addressId` - Delete address

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd customer-management-app
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Start the application**
   ```bash
   npm run dev
   ```

This will start both the backend server (port 5000) and frontend development server (port 3000).

### Manual Setup

If you prefer to set up manually:

1. **Install root dependencies**
   ```bash
   npm install
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   npm run dev
   ```

3. **Setup Frontend** (in new terminal)
   ```bash
   cd client
   npm install
   npm start
   ```

## Usage

1. **Access the application**: Open http://localhost:3000 in your browser
2. **Add customers**: Click "Add Customer" to create new customer records
3. **Manage addresses**: View customer details to add/edit/delete addresses
4. **Search & filter**: Use the search bar and city filter to find customers
5. **Edit/Delete**: Use the action buttons to modify or remove records

## Features in Detail

### Search & Filtering
- Search by customer name or phone number
- Filter customers by city
- Real-time search with debouncing

### Pagination
- Configurable page size (default: 10 customers per page)
- Navigation with page numbers
- Display of total records and current range

### Validation
- Client-side form validation with real-time feedback
- Server-side validation using express-validator
- Comprehensive error handling and user feedback

### Responsive Design
- Mobile-first approach
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements

## Development

### Backend Development
```bash
cd server
npm run dev  # Runs with nodemon for auto-restart
```

### Frontend Development
```bash
cd client
npm start    # Runs React dev server with hot reload
```

### Building for Production
```bash
npm run build  # Builds optimized production bundle
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.