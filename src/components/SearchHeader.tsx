
import { useState, useEffect } from "react";
import { Search, X, Mic, MicOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognitionClass) {
        const recognitionInstance = new SpeechRecognitionClass();
        
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onstart = () => {
          setIsListening(true);
          console.log('Voice recognition started');
        };

        recognitionInstance.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          console.log('Voice recognition result:', transcript);
          setSearchQuery(transcript);
          setIsSearchFocused(true);
        };

        recognitionInstance.onend = () => {
          setIsListening(false);
          console.log('Voice recognition ended');
        };

        recognitionInstance.onerror = (event) => {
          console.error('Voice recognition error:', event.error);
          setIsListening(false);
        };

        setRecognition(recognitionInstance);
      }
    }
  }, [setSearchQuery]);

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

  const toggleVoiceSearch = () => {
    if (!recognition) {
      alert('Voice search is not supported in your browser');
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  return (
    <div className="bg-red-600 text-white">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold">Target</div>
          <div className="flex-1 relative">
            <div className="relative flex items-center">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search My Account... (try voice search)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="pl-10 pr-20 bg-white text-black border-0 rounded-lg"
              />
              <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                <Button
                  onClick={toggleVoiceSearch}
                  size="sm"
                  variant="ghost"
                  className={cn(
                    "h-8 w-8 p-0 hover:bg-gray-100",
                    isListening && "bg-red-100 text-red-600"
                  )}
                >
                  {isListening ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="h-8 w-8 flex items-center justify-center hover:bg-gray-100 rounded"
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                )}
              </div>
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
                  <div className="p-4 text-gray-500 text-center">
                    Type to search account features or use voice search
                    {isListening && (
                      <div className="mt-2 text-red-600 font-medium">
                        🎤 Listening...
                      </div>
                    )}
                  </div>
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
