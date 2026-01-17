/**
 * Dashboard Page
 * Design: Forensic Command Center - Main Overview
 * Features: Key metrics, recent activity, quick access cards
 */

import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  FileText,
  Clock,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  ArrowRight,
  Shield,
  Database,
  Network,
} from "lucide-react";

interface InsightData {
  integration_date: string;
  new_entities: any[];
  new_events: any[];
  new_relations: any[];
  financial_patterns: any[];
  control_mechanisms: any[];
}

export default function Dashboard() {
  const [insights, setInsights] = useState<InsightData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/TRIAL_BALANCE_INSIGHTS_2026_01_18.json")
      .then((res) => res.json())
      .then((data) => {
        setInsights(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const stats = [
    {
      title: "Entities Tracked",
      value: insights?.new_entities?.length ? "45+" : "40+",
      change: "+5 new",
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Timeline Events",
      value: insights?.new_events?.length ? "85+" : "80+",
      change: "+6 new",
      icon: Clock,
      color: "text-emerald-500",
    },
    {
      title: "Relations Mapped",
      value: insights?.new_relations?.length ? "120+" : "115+",
      change: "+6 new",
      icon: Network,
      color: "text-amber-500",
    },
    {
      title: "Financial Impact",
      value: "R50M+",
      change: "Documented",
      icon: DollarSign,
      color: "text-destructive",
    },
  ];

  const keyFindings = [
    {
      title: "Inter-Company Debt Leverage",
      amount: "R12,971,390.13",
      description: "SLG debt to RST enabling profit shifting through interest payments",
      severity: "critical",
    },
    {
      title: "Capital Extraction via Villa Via",
      amount: "R22,806,538.74",
      description: "Members' loan account (5.2x annual rental income)",
      severity: "critical",
    },
    {
      title: "Cost Dumping on RWW",
      amount: "R1,710,926.63",
      description: "Systematic expense dumping including admin fees and warehouse charges",
      severity: "high",
    },
    {
      title: "Coordinated Cost Reallocations",
      amount: "R1,062,139.43",
      description: "Simultaneous journal entries on Feb 20, 2020",
      severity: "high",
    },
  ];

  const quickActions = [
    { label: "Search Evidence", href: "/evidence", icon: Database },
    { label: "View Timeline", href: "/timeline", icon: Clock },
    { label: "Explore Entities", href: "/entities", icon: Users },
    { label: "Legal Filings", href: "/filings", icon: FileText },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-mono font-bold text-foreground">
            Case Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            RegimA Group Financial Fraud Investigation - Case 2025-137857
          </p>
        </div>
        <Badge variant="outline" className="border-amber-500/50 text-amber-500">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Active Investigation
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="evidence-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-mono font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-primary mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg bg-muted/50 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Key Financial Findings */}
        <div className="lg:col-span-2">
          <Card className="evidence-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 font-mono text-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
                Key Financial Findings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {keyFindings.map((finding, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">
                          {finding.title}
                        </h3>
                        <Badge
                          variant={finding.severity === "critical" ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {finding.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {finding.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold text-lg text-primary">
                        {finding.amount}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Recent Updates */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="evidence-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 font-mono text-lg">
                <Shield className="h-5 w-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickActions.map((action) => (
                <Link key={action.href} href={action.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-between hover:bg-muted/50 hover:text-primary group"
                  >
                    <span className="flex items-center gap-2">
                      <action.icon className="h-4 w-4" />
                      {action.label}
                    </span>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Latest Update */}
          <Card className="evidence-card pulse-glow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 font-mono text-lg">
                <Database className="h-5 w-5 text-primary" />
                Latest Update
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-emerald-500/50 text-emerald-500">
                    NEW
                  </Badge>
                  <span className="text-sm font-mono text-muted-foreground">
                    2026-01-18
                  </span>
                </div>
                <p className="text-sm text-foreground">
                  2020 Trial Balance Evidence integrated revealing financial manipulation blueprint
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 5 new entities added</li>
                  <li>• 6 new timeline events</li>
                  <li>• 6 new relations documented</li>
                  <li>• 5 financial patterns identified</li>
                </ul>
                <Link href="/summary">
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View Full Analysis
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Key Persons of Interest */}
      <Card className="evidence-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 font-mono text-lg">
            <Users className="h-5 w-5 text-primary" />
            Key Persons of Interest
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                name: "Rynette Farrar",
                role: "Financial Controller",
                status: "Primary",
                note: "2020-2025 financial access continuity",
              },
              {
                name: "Danie Bantjes",
                role: "Accountant → Trustee",
                status: "Critical",
                note: "Appointed T-10 months before Ketoni payout",
              },
              {
                name: "Bernadine Wright",
                role: "Financial Decision-Maker",
                status: "Witness",
                note: "Authorized 2020 financial statements",
              },
              {
                name: "Peter Faucitt",
                role: "Trust Founder",
                status: "Primary",
                note: "Additional powers under trust deed",
              },
            ].map((person, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{person.name}</h3>
                  <Badge
                    variant={
                      person.status === "Critical"
                        ? "destructive"
                        : person.status === "Primary"
                        ? "default"
                        : "secondary"
                    }
                    className="text-xs"
                  >
                    {person.status}
                  </Badge>
                </div>
                <p className="text-sm text-primary font-mono">{person.role}</p>
                <p className="text-xs text-muted-foreground mt-2">{person.note}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
