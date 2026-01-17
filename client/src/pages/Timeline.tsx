/**
 * Timeline Page
 * Design: Forensic Command Center - Interactive Timeline
 * Features: Chronological event display, filtering by year/category
 */

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Clock,
  Calendar,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  DollarSign,
  Users,
  FileText,
  Shield,
} from "lucide-react";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: string;
  significance: string;
  actors?: string[];
  amount?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "TL-001",
    date: "2017-01-01",
    title: "RegimA Group Operations Established",
    description: "The inter-company structure between RST, SLG, RWW, and Villa Via is established with centralized bookkeeping control.",
    category: "organizational",
    significance: "Foundation of the financial manipulation structure",
    actors: ["Peter Faucitt", "Rynette Farrar"],
  },
  {
    id: "TL-002",
    date: "2020-02-20",
    title: "Coordinated Cost Reallocations",
    description: "Multiple entities execute simultaneous journal entries to reallocate over R1M in administrative fees to production costs.",
    category: "financial",
    significance: "Evidence of coordinated manipulation across entities",
    actors: ["Rynette Farrar"],
    amount: "R1,062,139.43",
  },
  {
    id: "TL-003",
    date: "2020-02-29",
    title: "RST/SLG Financial Year End",
    description: "Trial balances reveal R13M inter-company debt from SLG to RST and systematic profit shifting patterns.",
    category: "financial",
    significance: "Blueprint for financial manipulation documented",
    actors: ["Danie Bantjes", "Bernadine Wright"],
    amount: "R12,971,390.13",
  },
  {
    id: "TL-004",
    date: "2020-04-30",
    title: "Villa Via Year End",
    description: "Villa Via trial balance shows R22.8M members' loan account, indicating systematic capital extraction.",
    category: "financial",
    significance: "Capital extraction mechanism exposed",
    amount: "R22,806,538.74",
  },
  {
    id: "TL-005",
    date: "2020-08-13",
    title: "Financial Statement Finalization Email",
    description: "Danie Bantjes coordinates finalization of 2020 financial statements with 6-month delay. Rynette Farrar is a recipient.",
    category: "document",
    significance: "Establishes Rynette's 2020 financial access",
    actors: ["Danie Bantjes", "Bernadine Wright", "Rynette Farrar"],
  },
  {
    id: "TL-006",
    date: "2021-04-14",
    title: "Luxury Products Online Incorporated",
    description: "Rynette's son incorporates first of three companies in April 2021.",
    category: "organizational",
    significance: "Potential conflict of interest established",
    actors: ["Rynette's Son"],
  },
  {
    id: "TL-007",
    date: "2021-04-29",
    title: "Luxuré Incorporated",
    description: "Competitor to RégimA incorporated by Rynette's son.",
    category: "organizational",
    significance: "Direct competitor created by related party",
    actors: ["Rynette's Son"],
  },
  {
    id: "TL-008",
    date: "2021-04-30",
    title: "Adderory Incorporated",
    description: "Adderory becomes supplier of RegimA packaging, creating supply chain conflict.",
    category: "organizational",
    significance: "Supply chain conflict of interest",
    actors: ["Rynette's Son"],
  },
  {
    id: "TL-009",
    date: "2024-07-01",
    title: "Danie Bantjes Appointed as Trustee",
    description: "Rynette appoints Danie Bantjes as Trustee of the Faucitt Family Trust, T-10 months before Ketoni payout.",
    category: "legal",
    significance: "Critical control consolidation before major payout",
    actors: ["Rynette Farrar", "Danie Bantjes"],
  },
  {
    id: "TL-010",
    date: "2025-03-01",
    title: "Revenue Diversion Begins - RegimA SA",
    description: "Diversion of revenue streams begins with RegimA SA.",
    category: "fraud",
    significance: "Start of active revenue stream hijacking",
    actors: ["Rynette Farrar"],
  },
  {
    id: "TL-011",
    date: "2025-03-30",
    title: "Expense Dumping Pressure",
    description: "Rynette and Peter dump two years of unallocated expenses into RegimA Worldwide, pressure Daniel to sign off within 12 hours.",
    category: "fraud",
    significance: "Attempted forced authorization of fraudulent accounts",
    actors: ["Rynette Farrar", "Peter Faucitt", "Daniel Faucitt"],
  },
  {
    id: "TL-012",
    date: "2025-04-14",
    title: "RegimA Worldwide Diversion",
    description: "Rynette's bank letter diverts RegimA Worldwide revenue.",
    category: "fraud",
    significance: "Second revenue stream hijacked",
    actors: ["Rynette Farrar"],
  },
  {
    id: "TL-013",
    date: "2025-05-23",
    title: "Shopify Orders Removed",
    description: "Orders removed from Shopify platform, disrupting e-commerce operations.",
    category: "fraud",
    significance: "Sabotage of digital sales channel",
    actors: ["Rynette Farrar"],
  },
  {
    id: "TL-014",
    date: "2025-06-06",
    title: "Daniel Reports Fraud to Bantjes",
    description: "Daniel Faucitt reports discovered fraud to Danie Bantjes, unaware of his Trustee status.",
    category: "legal",
    significance: "Whistleblower report to conflicted party",
    actors: ["Daniel Faucitt", "Danie Bantjes"],
  },
  {
    id: "TL-015",
    date: "2025-06-07",
    title: "Secret Card Cancellations",
    description: "Bank cards secretly cancelled, cutting off financial access.",
    category: "fraud",
    significance: "Financial isolation of whistleblower",
    actors: ["Rynette Farrar"],
  },
  {
    id: "TL-016",
    date: "2025-06-20",
    title: "Email Redirect Instruction",
    description: "Instruction sent to redirect customers away from regima.zone to regimaskin.co.za.",
    category: "fraud",
    significance: "Customer diversion from legitimate channels",
    actors: ["Rynette Farrar"],
  },
  {
    id: "TL-017",
    date: "2025-09-11",
    title: "Accounts Emptied",
    description: "Company accounts emptied after Daniel continues to pay creditors despite 6 months of sabotage.",
    category: "fraud",
    significance: "Final financial extraction",
    actors: ["Rynette Farrar"],
  },
  {
    id: "TL-018",
    date: "2026-01-18",
    title: "2020 Trial Balance Evidence Integrated",
    description: "Analysis of 2020 trial balances reveals financial manipulation blueprint predating 2025 fraud.",
    category: "investigation",
    significance: "Historical pattern established",
    actors: ["Investigation Team"],
  },
];

const categoryColors: Record<string, string> = {
  organizational: "bg-purple-500/10 text-purple-500 border-purple-500/30",
  financial: "bg-primary/10 text-primary border-primary/30",
  document: "bg-muted text-muted-foreground border-border",
  legal: "bg-amber-500/10 text-amber-500 border-amber-500/30",
  fraud: "bg-destructive/10 text-destructive border-destructive/30",
  investigation: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
};

const categoryIcons: Record<string, typeof Clock> = {
  organizational: Users,
  financial: DollarSign,
  document: FileText,
  legal: Shield,
  fraud: AlertTriangle,
  investigation: Clock,
};

export default function Timeline() {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());

  const years = useMemo(() => {
    const yearSet = new Set(timelineEvents.map((e) => e.date.substring(0, 4)));
    return Array.from(yearSet).sort();
  }, []);

  const categories = useMemo(() => {
    const catSet = new Set(timelineEvents.map((e) => e.category));
    return Array.from(catSet);
  }, []);

  const filteredEvents = useMemo(() => {
    return timelineEvents.filter((event) => {
      const matchesYear =
        selectedYear === null || event.date.startsWith(selectedYear);
      const matchesCategory =
        selectedCategory === null || event.category === selectedCategory;
      return matchesYear && matchesCategory;
    });
  }, [selectedYear, selectedCategory]);

  const toggleExpand = (id: string) => {
    setExpandedEvents((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-mono font-bold text-foreground">
          Case Timeline
        </h1>
        <p className="text-muted-foreground mt-1">
          Chronological view of events from 2017 to present
        </p>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            {/* Year Filter */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">Filter by Year</p>
              <div className="flex gap-2">
                <Button
                  variant={selectedYear === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedYear(null)}
                >
                  All
                </Button>
                {years.map((year) => (
                  <Button
                    key={year}
                    variant={selectedYear === year ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedYear(year)}
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">Filter by Category</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </Button>
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className={selectedCategory !== cat ? categoryColors[cat] : ""}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />

        {/* Events */}
        <div className="space-y-4">
          {filteredEvents.map((event, index) => {
            const CategoryIcon = categoryIcons[event.category] || Clock;
            const isExpanded = expandedEvents.has(event.id);

            return (
              <div key={event.id} className="relative pl-20 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                {/* Timeline Node */}
                <div className="absolute left-6 w-5 h-5 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>

                {/* Event Card */}
                <Card className="bg-card border-border hover:border-primary/30 transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="outline"
                            className={categoryColors[event.category]}
                          >
                            <CategoryIcon className="h-3 w-3 mr-1" />
                            {event.category}
                          </Badge>
                          <span className="font-mono text-xs text-muted-foreground">
                            {event.id}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Calendar className="h-4 w-4" />
                          <span className="font-mono">{event.date}</span>
                        </div>

                        <h3 className="font-semibold text-foreground mb-2">
                          {event.title}
                        </h3>

                        <p className="text-sm text-muted-foreground">
                          {event.description}
                        </p>

                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-border space-y-3">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">
                                Significance
                              </p>
                              <p className="text-sm text-foreground">
                                {event.significance}
                              </p>
                            </div>

                            {event.actors && event.actors.length > 0 && (
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">
                                  Key Actors
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {event.actors.map((actor) => (
                                    <Badge key={actor} variant="secondary">
                                      {actor}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        {event.amount && (
                          <span className="font-mono text-sm font-semibold text-primary">
                            {event.amount}
                          </span>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpand(event.id)}
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            No events found matching your criteria
          </p>
        </div>
      )}
    </div>
  );
}
