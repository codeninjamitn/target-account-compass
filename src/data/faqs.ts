
import { FAQ } from "@/types/customer-service";

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How can I track my order?',
    answer: 'You can track your order by going to "My Orders" in your account or using your order confirmation email. Enter your order number to see real-time tracking updates.',
    keywords: ['track', 'order', 'tracking', 'status', 'delivery', 'shipping']
  },
  {
    id: '2',
    question: 'What is your return policy?',
    answer: 'You can return most items within 90 days of purchase with a receipt. Items must be in original condition. Some exclusions apply for electronics and personal care items.',
    keywords: ['return', 'refund', 'exchange', 'policy', 'receipt']
  },
  {
    id: '3',
    question: 'How do I use my Target Circle rewards?',
    answer: 'Target Circle rewards are automatically applied at checkout when you scan your barcode or use your phone number. You can view your available rewards in the Target app.',
    keywords: ['circle', 'rewards', 'points', 'discount', 'benefits']
  },
  {
    id: '4',
    question: 'What payment methods do you accept?',
    answer: 'We accept major credit cards, debit cards, Target RedCard, PayPal, Apple Pay, Google Pay, and cash in stores.',
    keywords: ['payment', 'card', 'redcard', 'paypal', 'apple pay', 'google pay', 'cash']
  },
  {
    id: '5',
    question: 'How can I change or cancel my order?',
    answer: 'You can modify or cancel your order within 1 hour of placing it by going to "My Orders" in your account. After that, contact customer service for assistance.',
    keywords: ['cancel', 'change', 'modify', 'edit', 'order']
  }
];
