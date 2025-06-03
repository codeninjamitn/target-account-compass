
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: any[];
  setSearchResults: (results: any[]) => void;
}

const accountFeatures = [
  { title: "Order History", description: "View your past orders", category: "Orders" },
  { title: "Family Manager Settings", description: "Manage family members", category: "Family" },
  { title: "Customer Service", description: "Get help and support", category: "Support" },
  { title: "Payment Methods", description: "Manage cards and payment", category: "Payment" },
  { title: "Addresses", description: "Shipping and billing addresses", category: "Account" },
  { title: "Target Circle", description: "Rewards and offers", category: "Rewards" },
  { title: "RedCard", description: "Target credit card", category: "Payment" },
  { title: "Privacy Settings", description: "Manage your privacy", category: "Account" },
  { title: "Email Preferences", description: "Email notifications", category: "Account" },
  { title: "Family Members", description: "Add or remove family members", category: "Family" },
  { title: "Chat Support", description: "Chat with customer service", category: "Support" },
  { title: "Phone Support", description: "Call customer service", category: "Support" },
];

export function SearchHeader({ searchQuery, setSearchQuery, searchResults, setSearchResults }: SearchHeaderProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = accountFeatures.filter(
        (feature) =>
          feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          feature.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          feature.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, setSearchResults]);

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchFocused(false);
  };

  return (
    <div className="bg-red-600 text-white">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold">Target</div>
          <div className="flex-1 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search My Account..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="pl-10 pr-10 bg-white text-black border-0 rounded-lg"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </div>
            
            {/* Search Results Dropdown */}
            {(isSearchFocused || searchQuery) && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="p-2">
                    {searchResults.map((result, index) => (
                      <div
                        key={index}
                        className="p-3 hover:bg-gray-50 rounded cursor-pointer border-b last:border-b-0"
                        onClick={() => {
                          // Navigate to feature
                          clearSearch();
                        }}
                      >
                        <div className="font-medium text-gray-900">{result.title}</div>
                        <div className="text-sm text-gray-600">{result.description}</div>
                        <div className="text-xs text-red-600 mt-1">{result.category}</div>
                      </div>
                    ))}
                  </div>
                ) : searchQuery ? (
                  <div className="p-4 text-gray-500 text-center">No results found</div>
                ) : (
                  <div className="p-4 text-gray-500 text-center">Type to search account features</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Overlay when search is active */}
      {(isSearchFocused || searchQuery) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={() => setIsSearchFocused(false)}
        />
      )}
    </div>
  );
}
