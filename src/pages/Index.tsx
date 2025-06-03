
import { useState } from "react";
import { SearchHeader } from "@/components/SearchHeader";
import { AccountHeader } from "@/components/AccountHeader";
import { FamilySection } from "@/components/FamilySection";
import { CustomerServiceSection } from "@/components/CustomerServiceSection";
import { AccountMenuSection } from "@/components/AccountMenuSection";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <AccountHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-6">
            <FamilySection />
            <CustomerServiceSection />
            <AccountMenuSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
