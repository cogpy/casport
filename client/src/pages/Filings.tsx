/**
 * Filings Page
 * Design: Forensic Command Center - Legal Filings Section
 * Features: Document cards, status tracking, filing categories
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Scale,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  ExternalLink,
  Download,
  Gavel,
  Building,
  Lock,
} from "lucide-react";

interface Filing {
  id: string;
  title: string;
  type: string;
  status: "draft" | "filed" | "pending" | "active";
  lastUpdated: string;
  description: string;
  keyPoints: string[];
  evidenceCount: number;
  burdenOfProof: string;
}

const filings: Filing[] = [
  {
    id: "CIPC-001",
    title: "CIPC Companies Act Complaint",
    type: "regulatory",
    status: "active",
    lastUpdated: "2026-01-18",
    description: "Complaint to the Companies and Intellectual Property Commission regarding director misconduct, breach of fiduciary duties, and fraudulent financial reporting.",
    keyPoints: [
      "Director breach of fiduciary duty (Section 76)",
      "Failure to maintain proper accounting records (Section 28)",
      "Fraudulent conduct in company affairs (Section 77)",
      "Reckless trading (Section 22)",
    ],
    evidenceCount: 45,
    burdenOfProof: "Balance of Probabilities (50%+)",
  },
  {
    id: "CIVIL-001",
    title: "Civil Action Summons",
    type: "civil",
    status: "draft",
    lastUpdated: "2026-01-18",
    description: "Civil claim for damages arising from fraudulent misrepresentation, breach of fiduciary duty, and unlawful interference with business operations.",
    keyPoints: [
      "Fraudulent misrepresentation",
      "Breach of fiduciary duty",
      "Unlawful interference with contractual relations",
      "Damages quantification: R50M+",
    ],
    evidenceCount: 52,
    burdenOfProof: "Balance of Probabilities (50%+)",
  },
  {
    id: "CRIM-001",
    title: "Criminal Case Submission",
    type: "criminal",
    status: "pending",
    lastUpdated: "2026-01-18",
    description: "Criminal complaint for fraud, theft, and money laundering submitted to SAPS Commercial Crime Unit.",
    keyPoints: [
      "Fraud (Common Law)",
      "Theft (Common Law)",
      "Money Laundering (POCA)",
      "Tax Evasion (Tax Administration Act)",
    ],
    evidenceCount: 68,
    burdenOfProof: "Beyond Reasonable Doubt (95%+)",
  },
  {
    id: "NPA-001",
    title: "NPA Tax Fraud Report",
    type: "criminal",
    status: "filed",
    lastUpdated: "2026-01-18",
    description: "Report to the National Prosecuting Authority regarding tax fraud, including VAT fraud, income tax evasion, and fraudulent financial statements.",
    keyPoints: [
      "VAT fraud through inter-company transactions",
      "Income tax evasion via profit shifting",
      "Fraudulent financial statements",
      "Transfer pricing manipulation",
    ],
    evidenceCount: 41,
    burdenOfProof: "Beyond Reasonable Doubt (95%+)",
  },
  {
    id: "POPIA-001",
    title: "POPIA Criminal Complaint",
    type: "regulatory",
    status: "active",
    lastUpdated: "2026-01-18",
    description: "Complaint to the Information Regulator regarding unlawful processing of personal information and interference with data subject rights.",
    keyPoints: [
      "Unlawful processing of personal information",
      "Interference with data subject access rights",
      "Failure to implement security safeguards",
      "Obstruction of Information Officer duties",
    ],
    evidenceCount: 23,
    burdenOfProof: "Balance of Probabilities (50%+)",
  },
  {
    id: "COMM-001",
    title: "Commercial Crime Submission",
    type: "criminal",
    status: "draft",
    lastUpdated: "2026-01-18",
    description: "Comprehensive submission to the Hawks Commercial Crime Unit detailing the full scope of financial fraud and corporate malfeasance.",
    keyPoints: [
      "Organized commercial crime",
      "Corporate fraud scheme",
      "Asset stripping",
      "Revenue stream hijacking",
    ],
    evidenceCount: 75,
    burdenOfProof: "Beyond Reasonable Doubt (95%+)",
  },
];

const typeIcons: Record<string, typeof FileText> = {
  regulatory: Shield,
  civil: Scale,
  criminal: Gavel,
};

const statusColors: Record<string, string> = {
  draft: "bg-muted text-muted-foreground border-border",
  filed: "bg-primary/10 text-primary border-primary/30",
  pending: "bg-amber-500/10 text-amber-500 border-amber-500/30",
  active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
};

const statusIcons: Record<string, typeof Clock> = {
  draft: FileText,
  filed: CheckCircle,
  pending: Clock,
  active: AlertTriangle,
};

export default function Filings() {
  const [activeType, setActiveType] = useState("all");

  const filteredFilings = filings.filter(
    (f) => activeType === "all" || f.type === activeType
  );

  const stats = {
    total: filings.length,
    draft: filings.filter((f) => f.status === "draft").length,
    filed: filings.filter((f) => f.status === "filed").length,
    active: filings.filter((f) => f.status === "active").length,
    pending: filings.filter((f) => f.status === "pending").length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-mono font-bold text-foreground">
          Legal Filings
        </h1>
        <p className="text-muted-foreground mt-1">
          Case filings across regulatory, civil, and criminal jurisdictions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total Filings", value: stats.total, color: "text-foreground" },
          { label: "Draft", value: stats.draft, color: "text-muted-foreground" },
          { label: "Filed", value: stats.filed, color: "text-primary" },
          { label: "Pending", value: stats.pending, color: "text-amber-500" },
          { label: "Active", value: stats.active, color: "text-emerald-500" },
        ].map((stat) => (
          <Card key={stat.label} className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-mono font-bold ${stat.color}`}>
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Type Filter */}
      <Tabs value={activeType} onValueChange={setActiveType}>
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <FileText className="h-4 w-4 mr-2" />
            All Filings
          </TabsTrigger>
          <TabsTrigger
            value="regulatory"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Shield className="h-4 w-4 mr-2" />
            Regulatory
          </TabsTrigger>
          <TabsTrigger
            value="civil"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Scale className="h-4 w-4 mr-2" />
            Civil
          </TabsTrigger>
          <TabsTrigger
            value="criminal"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Gavel className="h-4 w-4 mr-2" />
            Criminal
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeType} className="mt-4">
          <div className="space-y-4">
            {filteredFilings.map((filing) => {
              const TypeIcon = typeIcons[filing.type] || FileText;
              const StatusIcon = statusIcons[filing.status] || Clock;

              return (
                <Card
                  key={filing.id}
                  className="bg-card border-border hover:border-primary/30 transition-all duration-200"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-muted/50">
                          <TypeIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg text-foreground">
                              {filing.title}
                            </h3>
                            <Badge
                              variant="outline"
                              className={statusColors[filing.status]}
                            >
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {filing.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="font-mono">{filing.id}</span>
                            <span>Updated: {filing.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">
                      {filing.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Key Points</p>
                        <ul className="space-y-1">
                          {filing.keyPoints.map((point, index) => (
                            <li
                              key={index}
                              className="text-sm text-foreground flex items-start gap-2"
                            >
                              <span className="text-primary mt-1">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-muted/50">
                          <p className="text-xs text-muted-foreground mb-1">
                            Evidence Items
                          </p>
                          <p className="text-xl font-mono font-bold text-primary">
                            {filing.evidenceCount}
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/50">
                          <p className="text-xs text-muted-foreground mb-1">
                            Burden of Proof
                          </p>
                          <p className="text-sm font-mono text-foreground">
                            {filing.burdenOfProof}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-border">
                      <Button variant="outline" size="sm" disabled>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button variant="outline" size="sm" disabled>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Full Document
                      </Button>
                      <span className="text-xs text-muted-foreground ml-auto">
                        <Lock className="h-3 w-3 inline mr-1" />
                        Confidential
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* 2020 Evidence Appendix Notice */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                2020 Trial Balance Evidence Integrated
              </h4>
              <p className="text-sm text-muted-foreground">
                All filings have been updated with the 2020 Financial Manipulation Blueprint
                appendix, documenting the historical pattern of inter-company debt leverage,
                coordinated cost reallocations, and capital extraction mechanisms.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
