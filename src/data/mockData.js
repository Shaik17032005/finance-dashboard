import { subDays, format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

const today = new Date();

export const initialTransactions = [
  {
    id: uuidv4(),
    date: format(today, 'yyyy-MM-dd'),
    amount: 150.0,
    category: 'Groceries',
    type: 'expense',
    description: 'Whole Foods Market',
  },
  {
    id: uuidv4(),
    date: format(subDays(today, 1), 'yyyy-MM-dd'),
    amount: 5200.0,
    category: 'Salary',
    type: 'income',
    description: 'Acme Corp Monthly Salary',
  },
  {
    id: uuidv4(),
    date: format(subDays(today, 2), 'yyyy-MM-dd'),
    amount: 60.0,
    category: 'Entertainment',
    type: 'expense',
    description: 'Movie Tickets',
  },
  {
    id: uuidv4(),
    date: format(subDays(today, 3), 'yyyy-MM-dd'),
    amount: 1500.0,
    category: 'Rent',
    type: 'expense',
    description: 'Monthly Apartment Rent',
  },
  {
    id: uuidv4(),
    date: format(subDays(today, 5), 'yyyy-MM-dd'),
    amount: 45.5,
    category: 'Transportation',
    type: 'expense',
    description: 'Uber Rides',
  },
  {
    id: uuidv4(),
    date: format(subDays(today, 6), 'yyyy-MM-dd'),
    amount: 250.0,
    category: 'Freelance',
    type: 'income',
    description: 'Web Design Project',
  },
  {
    id: uuidv4(),
    date: format(subDays(today, 10), 'yyyy-MM-dd'),
    amount: 120.0,
    category: 'Utilities',
    type: 'expense',
    description: 'Electricity Bill',
  },
  {
    id: uuidv4(),
    date: format(subDays(today, 15), 'yyyy-MM-dd'),
    amount: 80.0,
    category: 'Dining',
    type: 'expense',
    description: 'Dinner at Italian Restaurant',
  },
];

export const categories = [
  'Groceries',
  'Salary',
  'Entertainment',
  'Rent',
  'Transportation',
  'Freelance',
  'Utilities',
  'Dining',
  'Others'
];
