/**
 * Entities Page
 * Design: Forensic Command Center - Entity Relationship Explorer
 * Features: Person/Organization cards, relationship mapping
 */

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Building,
  Search,
  AlertTriangle,
  CheckCircle,
  Link as LinkIcon,
  DollarSign,
  Shield,
} from "lucide-react";

interface Person {
  id: string;
  name: string;
  role: string;
  status: "primary" | "critical" | "witness" | "secondary";
  involvement: string;
  financialImpact?: string;
  connections: string[];
}

interface Organization {
  id: string;
  name: string;
  type: string;
  significance: string;
  financialRole?: string;
  relatedEntities: string[];
}

const persons: Person[] = [
  {
    id: "PER-001",
    name: "Rynette Farrar",
    role: "Financial Controller / Bookkeeper",
    status: "primary",
    involvement: "Controlled all entity accounts using Peter's email. Led 2025 cover-up. 2020 financial access established via email evidence.",
    financialImpact: "Direct control over R50M+ in transactions",
    connections: ["Peter Faucitt", "Danie Bantjes", "Linda (Sister)", "RST", "SLG", "RWW", "Villa Via"],
  },
  {
    id: "PER-002",
    name: "Danie Bantjes",
    role: "External Accountant → Trustee",
    status: "critical",
    involvement: "Prepared 2020 trial balances with 6-month delay. Appointed as Trustee by Rynette in July 2024 (T-10 months before Ketoni payout).",
    financialImpact: "Authorized financial statements enabling manipulation",
    connections: ["Rynette Farrar", "Bernadine Wright", "Faucitt Family Trust"],
  },
  {
    id: "PER-003",
    name: "Bernadine Wright",
    role: "Financial Decision-Maker",
    status: "witness",
    involvement: "Primary recipient of 2020 financial statements. Key to understanding authorization of manipulation.",
    connections: ["Danie Bantjes", "RST"],
  },
  {
    id: "PER-004",
    name: "Peter Faucitt",
    role: "Trust Founder / Director",
    status: "primary",
    involvement: "Founder of Faucitt Family Trust with additional powers under trust deed. Co-director of SLG and RWW.",
    financialImpact: "50% owner of RST and Villa Via",
    connections: ["Rynette Farrar", "Daniel Faucitt", "Jacqueline Faucitt", "Faucitt Family Trust"],
  },
  {
    id: "PER-005",
    name: "Daniel Faucitt",
    role: "Co-Director / Whistleblower",
    status: "witness",
    involvement: "33% shareholder of SLG and RWW. Discovered and reported fraud in June 2025. Subject of revenue stream sabotage.",
    connections: ["Peter Faucitt", "Jacqueline Faucitt", "Danie Bantjes"],
  },
  {
    id: "PER-006",
    name: "Jacqueline Faucitt",
    role: "CEO of RST / Information Officer",
    status: "witness",
    involvement: "CEO of RegimA Skin Treatments. Statutory Information Officer for POPIA compliance. Confronted fraud in May 2025.",
    connections: ["Daniel Faucitt", "Peter Faucitt", "RST"],
  },
  {
    id: "PER-007",
    name: "Linda",
    role: "Employed Bookkeeper",
    status: "secondary",
    involvement: "Rynette's sister employed to do the books, yet two years of expenses remained unallocated.",
    connections: ["Rynette Farrar"],
  },
];

const organizations: Organization[] = [
  {
    id: "ORG-001",
    name: "RegimA Skin Treatments (RST)",
    type: "Operating Company",
    significance: "Profit concentration entity. Receives inter-company debt payments and interest from SLG.",
    financialRole: "R12.97M receivable from SLG, R414K annual interest income",
    relatedEntities: ["SLG", "RWW", "Villa Via", "Peter Faucitt", "Jacqueline Faucitt"],
  },
  {
    id: "ORG-002",
    name: "Strategic Logistics (SLG)",
    type: "Manufacturing/Logistics",
    significance: "Carries R13M debt to RST. Manufactured R5.4M loss through suspicious inventory adjustment.",
    financialRole: "R12.97M debt to RST, R5.4M manufactured loss",
    relatedEntities: ["RST", "RWW", "Peter Faucitt", "Daniel Faucitt"],
  },
  {
    id: "ORG-003",
    name: "RegimA Worldwide Distribution (RWW)",
    type: "Distribution Company",
    significance: "Expense dumping ground. Forced to pay group expenses then blamed for excessive spending.",
    financialRole: "R1.71M in dumped expenses, R750K production cost loan",
    relatedEntities: ["RST", "SLG", "Peter Faucitt", "Daniel Faucitt"],
  },
  {
    id: "ORG-004",
    name: "Villa Via",
    type: "Property Holding",
    significance: "Capital extraction vehicle. R22.8M members' loan (5.2x annual rental income).",
    financialRole: "R3.7M rental profit, R22.8M members' loan",
    relatedEntities: ["Peter Faucitt", "Faucitt Family Trust"],
  },
  {
    id: "ORG-005",
    name: "Faucitt Family Trust",
    type: "Trust",
    significance: "Owns RWW and Villa Via. Unusual powers granted to Trustees with absence of Beneficiary powers.",
    financialRole: "R18.75M Ketoni payout expected May 2026",
    relatedEntities: ["Peter Faucitt", "Danie Bantjes", "Daniel Faucitt", "RWW", "Villa Via"],
  },
  {
    id: "ORG-006",
    name: "Adderory",
    type: "Supplier (Related Party)",
    significance: "Rynette's son's company. Became supplier of RegimA packaging, creating supply chain conflict.",
    relatedEntities: ["RST", "Rynette Farrar"],
  },
  {
    id: "ORG-007",
    name: "Luxuré",
    type: "Competitor (Related Party)",
    significance: "Rynette's son's company. Direct competitor to RégimA incorporated April 2021.",
    relatedEntities: ["Rynette Farrar"],
  },
];

const statusColors: Record<string, string> = {
  primary: "bg-destructive/10 text-destructive border-destructive/30",
  critical: "bg-amber-500/10 text-amber-500 border-amber-500/30",
  witness: "bg-primary/10 text-primary border-primary/30",
  secondary: "bg-muted text-muted-foreground border-border",
};

export default function Entities() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("persons");

  const filteredPersons = useMemo(() => {
    return persons.filter(
      (p) =>
        searchQuery === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.involvement.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredOrgs = useMemo(() => {
    return organizations.filter(
      (o) =>
        searchQuery === "" ||
        o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.significance.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-mono font-bold text-foreground">
          Entity Explorer
        </h1>
        <p className="text-muted-foreground mt-1">
          Persons of interest and organizations involved in the case
        </p>
      </div>

      {/* Search */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search entities by name, role, or involvement..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-border focus:border-primary"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger
            value="persons"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Users className="h-4 w-4 mr-2" />
            Persons ({filteredPersons.length})
          </TabsTrigger>
          <TabsTrigger
            value="organizations"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Building className="h-4 w-4 mr-2" />
            Organizations ({filteredOrgs.length})
          </TabsTrigger>
        </TabsList>

        {/* Persons Tab */}
        <TabsContent value="persons" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredPersons.map((person) => (
              <Card
                key={person.id}
                className="bg-card border-border hover:border-primary/30 transition-all duration-200"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {person.name}
                        </h3>
                        <p className="text-sm text-primary font-mono">
                          {person.role}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className={statusColors[person.status]}>
                      {person.status}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">
                    {person.involvement}
                  </p>

                  {person.financialImpact && (
                    <div className="flex items-center gap-2 text-sm mb-3">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span className="text-foreground">{person.financialImpact}</span>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <LinkIcon className="h-3 w-3" />
                      Connections
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {person.connections.map((conn) => (
                        <Badge key={conn} variant="secondary" className="text-xs">
                          {conn}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Organizations Tab */}
        <TabsContent value="organizations" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredOrgs.map((org) => (
              <Card
                key={org.id}
                className="bg-card border-border hover:border-primary/30 transition-all duration-200"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <Building className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {org.name}
                        </h3>
                        <p className="text-sm text-primary font-mono">
                          {org.type}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      {org.id}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">
                    {org.significance}
                  </p>

                  {org.financialRole && (
                    <div className="p-2 rounded bg-muted/50 mb-3">
                      <p className="text-xs text-muted-foreground mb-1">Financial Role</p>
                      <p className="text-sm font-mono text-primary">
                        {org.financialRole}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <LinkIcon className="h-3 w-3" />
                      Related Entities
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {org.relatedEntities.map((entity) => (
                        <Badge key={entity} variant="secondary" className="text-xs">
                          {entity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
