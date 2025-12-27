"use client";

import { ReactNode } from "react";
import { Sidebar } from "./components/Sidebar";
import { MobileNav } from "./components/MobileNav";
import "../globals.css";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 lg:pl-64">
        {/* Mobile Navigation */}
        <MobileNav />

        <main className="p-4 md:p-8 max-w-7xl mx-auto animate-in fade-in duration-500">
          {children}
        </main>
      </div>
    </div>
  );
}
