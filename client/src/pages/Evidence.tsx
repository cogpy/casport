/**
 * Evidence Page
 * Design: Forensic Command Center - Searchable Evidence Index
 * Features: Full-text search, category filtering, evidence cards
 */

import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  FileText,
  DollarSign,
  Users,
  Building,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

interface EvidenceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  amount?: string;
  date?: string;
  entities?: string[];
  severity?: string;
  verified?: boolean;
}

const evidenceData: EvidenceItem[] = [
  {
    id: "TB-001",
    title: "Inter-Company Debt: SLG to RST",
    category: "financial",
    description: "Strategic Logistics (SLG) carried a massive debt to RegimA Skin Treatments (RST), creating financial dependency and enabling profit shifting through interest payments.",
    amount: "R12,971,390.13",
    date: "2020-02-29",
    entities: ["SLG", "RST"],
    severity: "critical",
    verified: true,
  },
  {
    id: "TB-002",
    title: "Villa Via Members' Loan Account",
    category: "financial",
    description: "Villa Via's members' loan account (5.2x annual rental income) indicates systematic capital extraction from the business.",
    amount: "R22,806,538.74",
    date: "2020-04-30",
    entities: ["Villa Via"],
    severity: "critical",
    verified: true,
  },
  {
    id: "TB-003",
    title: "Cost Dumping on RWW",
    category: "financial",
    description: "RegimA Worldwide Distribution (RWW) was systematically used as an expense dumping ground, receiving production cost loans and bearing group-wide expenses.",
    amount: "R1,710,926.63",
    date: "2020-02-29",
    entities: ["RWW", "RST"],
    severity: "high",
    verified: true,
  },
  {
    id: "TB-004",
    title: "Coordinated Cost Reallocations",
    category: "financial",
    description: "On February 20, 2020, multiple entities executed simultaneous journal entries to reallocate over R1M in administrative fees to production costs.",
    amount: "R1,062,139.43",
    date: "2020-02-20",
    entities: ["SLG", "RST", "RWW"],
    severity: "high",
    verified: true,
  },
  {
    id: "TB-005",
    title: "Interest Payment Mechanism",
    category: "financial",
    description: "SLG paid 3.19% interest to RST (R414K annually on R13M debt), a suspiciously low rate indicating non-arm's length transaction.",
    amount: "R414,000.00",
    date: "2020-02-29",
    entities: ["SLG", "RST"],
    severity: "medium",
    verified: true,
  },
  {
    id: "REL-001",
    title: "Rynette's 2020 Financial Access",
    category: "relationship",
    description: "Email evidence proves Rynette Farrar had access to and involvement in financial matters five years before she led the 2025 cover-up.",
    date: "2020-08-13",
    entities: ["Rynette Farrar", "Danie Bantjes"],
    severity: "critical",
    verified: true,
  },
  {
    id: "REL-002",
    title: "Bantjies Accountant-to-Trustee Connection",
    category: "relationship",
    description: "Danie Bantjes, the external accountant who prepared the 2020 trial balances with a 6-month delay, was later appointed as Trustee by Rynette in July 2024.",
    date: "2024-07-01",
    entities: ["Danie Bantjes", "Rynette Farrar", "Faucitt Family Trust"],
    severity: "critical",
    verified: true,
  },
  {
    id: "REL-003",
    title: "Bernadine Wright Financial Authorization",
    category: "relationship",
    description: "Bernadine Wright was the primary recipient of 2020 financial statements and key to understanding authorization of manipulation.",
    date: "2020-08-13",
    entities: ["Bernadine Wright", "RST"],
    severity: "high",
    verified: true,
  },
  {
    id: "DOC-001",
    title: "2020-08-13 Email: Financial Statement Finalization",
    category: "document",
    description: "Email from Danie Bantjes coordinating the finalization of 2020 financial statements with a 6-month delay.",
    date: "2020-08-13",
    entities: ["Danie Bantjes", "Bernadine Wright", "Rynette Farrar"],
    severity: "high",
    verified: true,
  },
  {
    id: "DOC-002",
    title: "Trial Balance: RST Feb 2020",
    category: "document",
    description: "RegimA Skin Treatments trial balance showing inter-company receivables and profit concentration.",
    date: "2020-02-29",
    entities: ["RST"],
    severity: "medium",
    verified: true,
  },
  {
    id: "DOC-003",
    title: "Trial Balance: SLG 2020",
    category: "document",
    description: "Strategic Logistics trial balance showing R13M debt to RST and R5.4M manufactured loss.",
    date: "2020-02-29",
    entities: ["SLG"],
    severity: "critical",
    verified: true,
  },
  {
    id: "DOC-004",
    title: "Trial Balance: Villa Via Apr 2020",
    category: "document",
    description: "Villa Via trial balance showing R22.8M members' loan and capital extraction pattern.",
    date: "2020-04-30",
    entities: ["Villa Via"],
    severity: "critical",
    verified: true,
  },
  {
    id: "PAT-001",
    title: "Profit Shifting Pattern",
    category: "pattern",
    description: "Systematic concentration of profits in RST through inter-company debt and below-cost transfers from SLG.",
    entities: ["RST", "SLG"],
    severity: "critical",
    verified: true,
  },
  {
    id: "PAT-002",
    title: "Expense Dumping Pattern",
    category: "pattern",
    description: "Systematic dumping of group expenses onto RWW to obscure true profitability and create artificial losses.",
    entities: ["RWW"],
    severity: "critical",
    verified: true,
  },
  {
    id: "PAT-003",
    title: "Centralized Control Pattern",
    category: "pattern",
    description: "All entity accounts controlled by the co-director's personal bookkeeper, enabling coordinated manipulation.",
    entities: ["Rynette Farrar"],
    severity: "high",
    verified: true,
  },
];

const categories = [
  { id: "all", label: "All Evidence", icon: FileText },
  { id: "financial", label: "Financial", icon: DollarSign },
  { id: "relationship", label: "Relationships", icon: Users },
  { id: "document", label: "Documents", icon: FileText },
  { id: "pattern", label: "Patterns", icon: Building },
];

export default function Evidence() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);

  const filteredEvidence = useMemo(() => {
    return evidenceData.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.entities?.some((e) =>
          e.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;

      const matchesSeverity =
        severityFilter === null || item.severity === severityFilter;

      return matchesSearch && matchesCategory && matchesSeverity;
    });
  }, [searchQuery, activeCategory, severityFilter]);

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case "critical":
        return "bg-destructive/10 text-destructive border-destructive/30";
      case "high":
        return "bg-amber-500/10 text-amber-500 border-amber-500/30";
      case "medium":
        return "bg-primary/10 text-primary border-primary/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "financial":
        return DollarSign;
      case "relationship":
        return Users;
      case "document":
        return FileText;
      case "pattern":
        return Building;
      default:
        return FileText;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-mono font-bold text-foreground">
          Evidence Index
        </h1>
        <p className="text-muted-foreground mt-1">
          Search and filter through all documented evidence
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search evidence by title, description, or entity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50 border-border focus:border-primary"
              />
            </div>

            {/* Severity Filter */}
            <div className="flex gap-2">
              {["critical", "high", "medium"].map((severity) => (
                <Button
                  key={severity}
                  variant={severityFilter === severity ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    setSeverityFilter(severityFilter === severity ? null : severity)
                  }
                  className={
                    severityFilter === severity
                      ? ""
                      : getSeverityColor(severity)
                  }
                >
                  {severity.charAt(0).toUpperCase() + severity.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="bg-muted/50 p-1">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat.id}
              value={cat.id}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <cat.icon className="h-4 w-4 mr-2" />
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-4">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-mono text-foreground">
                {filteredEvidence.length}
              </span>{" "}
              evidence items
            </p>
          </div>

          {/* Evidence Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEvidence.map((item) => {
              const CategoryIcon = getCategoryIcon(item.category);
              return (
                <Card
                  key={item.id}
                  className="bg-card border-border hover:border-primary/30 transition-all duration-200 hover:shadow-[0_0_20px_-5px_oklch(0.72_0.15_195_/_0.2)]"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-md bg-muted/50">
                          <CategoryIcon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-mono text-xs text-muted-foreground">
                          {item.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.verified && (
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                        )}
                        {item.severity && (
                          <Badge
                            variant="outline"
                            className={getSeverityColor(item.severity)}
                          >
                            {item.severity}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <h3 className="font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.entities?.map((entity) => (
                        <Badge
                          key={entity}
                          variant="secondary"
                          className="text-xs"
                        >
                          {entity}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      {item.date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {item.date}
                        </span>
                      )}
                      {item.amount && (
                        <span className="font-mono text-primary font-semibold">
                          {item.amount}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredEvidence.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No evidence found matching your criteria
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
