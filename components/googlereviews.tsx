"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Header } from "./header";
import ResponsiveTable from "./reviews";
import ProfilePage from "./myaccount";
import UserResponsiveTable from "./users";
import SiteResponsiveTable from "./siteReviews";

export default function GoogleReviews() {
  const [activeTab, setActiveTab] = useState("all");
  const tabContent = {
    all: "Google Sites",
    site: "Site Only",
    user: "Users",
    account: "My Account",
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <main className="flex-grow container mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {Object.entries(tabContent).map(([tab, label]) => (
              <TabsTrigger key={tab} value={tab}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(tabContent).map(([tab, label]) => (
            <TabsContent key={tab} value={tab} className="mt-6">
              <h2 className="text-2xl font-bold mb-4">{label}</h2>
              {label === "Google Sites" ? <ResponsiveTable /> : null}
              {label === "Site Only" ? <SiteResponsiveTable /> : null}
              {label === "My Account" ? <ProfilePage /> : null}
              {label === "Users" ? <UserResponsiveTable /> : null}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
