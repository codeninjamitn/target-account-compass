
import { FAQ } from "@/types/customer-service";
import { faqs } from "@/data/faqs";

export const isLiveChatAvailable = (): boolean => {
  const now = new Date();
  const currentHour = now.getHours();
  return currentHour >= 7 && currentHour < 22;
};

export const findFAQAnswer = (query: string): FAQ | null => {
  const lowerQuery = query.toLowerCase();
  return faqs.find(faq => 
    faq.keywords.some(keyword => lowerQuery.includes(keyword.toLowerCase())) ||
    faq.question.toLowerCase().includes(lowerQuery)
  ) || null;
};
