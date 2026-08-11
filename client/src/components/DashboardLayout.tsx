/**
 * DashboardLayout Component
 * Design: Forensic Command Center - Intelligence Agency Aesthetic
 * Features: Persistent sidebar, collapsible navigation, dark theme
 */

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Search,
  Clock,
  Users,
  FileText,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  Shield,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: "/", label: "Overview", icon: LayoutDashboard },
  { path: "/applications", label: "Applications", icon: FileText },
  { path: "/matters", label: "Matter Views", icon: BookOpen },
  { path: "/timeline", label: "Model & Timeline", icon: Clock },
  { path: "/filings", label: "v31 Filings", icon: Users },
  { path: "/combined", label: "Combined View", icon: Search },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background grid-pattern">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-mono font-semibold text-sm text-sidebar-foreground">
                  CASELEX · 3 MATTERS
                </span>
              </div>
            )}
            {collapsed && <Shield className="h-6 w-6 text-primary mx-auto" />}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="h-8 w-8 text-sidebar-foreground hover:text-primary hover:bg-sidebar-accent"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 py-4">
            <nav className="space-y-1 px-2">
              {navItems.map((item) => {
                const isActive = location === item.path;
                return (
                  <Link key={item.path} href={item.path}>
                    <div
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 cursor-pointer group",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-primary shadow-[0_0_0_1px_oklch(0.72_0.15_195_/_0.3),0_0_20px_-5px_oklch(0.72_0.15_195_/_0.2)]"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5 shrink-0",
                          isActive ? "text-primary" : "group-hover:text-primary"
                        )}
                      />
                      {!collapsed && (
                        <span className="font-medium text-sm">{item.label}</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            {/* Case Status */}
            {!collapsed && (
              <div className="mb-4 p-3 rounded-md bg-sidebar-accent/50 border border-amber-500/20">
                <div className="flex items-center gap-2 text-amber-500">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-xs font-mono font-semibold">SYNCHRONIZED WORKING RECORD</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Last updated: 2026-08-11
                </p>
              </div>
            )}

            <Separator className="mb-4" />

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size={collapsed ? "icon" : "default"}
              onClick={toggleTheme}
              className={cn(
                "w-full justify-start text-sidebar-foreground hover:text-primary hover:bg-sidebar-accent",
                collapsed && "justify-center"
              )}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              {!collapsed && (
                <span className="ml-2 text-sm">
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </span>
              )}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "transition-all duration-300",
          collapsed ? "ml-16" : "ml-64"
        )}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-sm border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="font-mono text-lg font-semibold text-foreground">
              Synchronized Evidence Portal
            </h1>
            <span className="px-2 py-1 rounded text-xs font-mono bg-primary/10 text-primary border border-primary/20">
              v3.1
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-muted-foreground">
              Working evidence · no adjudicated findings
            </span>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
