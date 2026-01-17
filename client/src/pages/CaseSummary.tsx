/**
 * Case Summary Page
 * Design: Forensic Command Center - Comprehensive Analysis
 * Features: Executive summary, key findings, strategic recommendations
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Shield,
  FileText,
  ArrowRight,
} from "lucide-react";

export default function CaseSummary() {
  const keyMechanisms = [
    {
      title: "Inter-Company Debt Leverage",
      amount: "R12,971,390.13",
      description: "SLG carried a massive debt to RST, creating financial dependency and enabling profit shifting through interest payments (R414K annually at 3.19%).",
    },
    {
      title: "Coordinated Cost Reallocations",
      amount: "R1,062,139.43",
      description: "On Feb 20, 2020, multiple entities executed simultaneous journal entries to reallocate admin fees to production costs.",
    },
    {
      title: "Cost Dumping on RWW",
      amount: "R1,710,926.63",
      description: "RWW was systematically used as an expense dumping ground, receiving production cost loans and bearing group-wide expenses.",
    },
    {
      title: "Capital Extraction via Villa Via",
      amount: "R22,806,538.74",
      description: "Villa Via's members' loan account (5.2x annual rental income) indicates systematic capital extraction from the business.",
    },
  ];

  const strategicImplications = [
    {
      title: "Establishes Pattern of Behavior",
      description: "The 2025 fraud is not an isolated incident but the culmination of a multi-year scheme. The 2020 evidence provides a documented baseline of manipulation.",
      icon: TrendingUp,
    },
    {
      title: "Proves Premeditation",
      description: "The sophisticated inter-company structures and control mechanisms established in 2020 demonstrate premeditation and intent.",
      icon: Target,
    },
    {
      title: "Vindicates Whistleblower",
      description: "The evidence clearly shows that Jax, as CEO of RST, was not in control of the financial manipulation. Her confrontation of the fraud proves her role as a whistleblower.",
      icon: Shield,
    },
    {
      title: "Implicates Key Actors",
      description: "The evidence directly implicates Rynette Farrar (continuity of financial access) and Danie Bantjes (accountant-to-Trustee connection) in the long-term scheme.",
      icon: Users,
    },
  ];

  const nextSteps = [
    {
      priority: "CRITICAL",
      action: "Investigate Bernadine Wright's role and current status",
      rationale: "She is the key financial decision-maker who authorized the 2020 financial statements.",
    },
    {
      priority: "CRITICAL",
      action: "Subpoena Danie Bantjes' records and communications",
      rationale: "His dual role as 2020 accountant and 2024 Trustee is central to the scheme.",
    },
    {
      priority: "HIGH",
      action: "Trace the R13M inter-company debt buildup in SLG",
      rationale: "This is the primary mechanism for profit shifting.",
    },
    {
      priority: "HIGH",
      action: "Analyze DERM entity financial structure",
      rationale: "This missing entity is key to understanding the full scope of cost dumping.",
    },
    {
      priority: "MEDIUM",
      action: "Cross-reference R414K interest payments with other years",
      rationale: "This will reveal if the pattern is consistent.",
    },
    {
      priority: "MEDIUM",
      action: "Examine Villa Via rental agreements for related party transactions",
      rationale: "This will clarify the capital extraction mechanism.",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-mono font-bold text-foreground">
          Case Summary
        </h1>
        <p className="text-muted-foreground mt-1">
          Comprehensive analysis and strategic recommendations
        </p>
      </div>

      {/* Executive Overview */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-mono">
            <BookOpen className="h-5 w-5 text-primary" />
            Executive Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This case involves a sophisticated, multi-year financial fraud scheme operating through
            the RegimA Group of companies. The newly discovered 2020 trial balance evidence provides
            a critical "blueprint" for understanding the systematic financial manipulation that
            predates and enables the 2025 fraud events.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <p className="text-xs text-muted-foreground mb-1">Case Reference</p>
              <p className="font-mono font-semibold text-foreground">2025-137857</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <p className="text-xs text-muted-foreground mb-1">Investigation Period</p>
              <p className="font-mono font-semibold text-foreground">2017 - 2026</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <p className="text-xs text-muted-foreground mb-1">Total Financial Impact</p>
              <p className="font-mono font-semibold text-primary">R50M+</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Financial Mechanisms */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-mono">
            <DollarSign className="h-5 w-5 text-primary" />
            2020 Financial Manipulation Blueprint
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            The trial balance evidence from 2019-2020 reveals a sophisticated, pre-existing system
            of financial manipulation. This is not an isolated incident but a long-standing
            <span className="text-primary font-semibold"> modus operandi</span>.
          </p>
          <div className="space-y-4">
            {keyMechanisms.map((mechanism, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{mechanism.title}</h3>
                  <span className="font-mono font-bold text-primary">{mechanism.amount}</span>
                </div>
                <p className="text-sm text-muted-foreground">{mechanism.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Connections */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-mono">
            <Users className="h-5 w-5 text-primary" />
            Critical Connections Established
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <h3 className="font-semibold text-foreground">Rynette's Continuity of Access</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                The 2020-08-13 email from Danie Bantjes lists Rynette Farrar as a recipient,
                establishing that she had access to and involvement in financial matters
                <span className="text-primary font-semibold"> five years before</span> she led
                the 2025 cover-up.
              </p>
              <Badge variant="destructive">Primary Suspect</Badge>
            </div>
            <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <h3 className="font-semibold text-foreground">The Bantjies Connection</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Danie Bantjes, the external accountant who prepared the 2020 trial balances with
                a suspicious 6-month delay, was later appointed as Trustee by Rynette in
                <span className="text-primary font-semibold"> July 2024</span> (T-10 months
                before the ZAR 18.75M Ketoni payout).
              </p>
              <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/30">
                Critical Investigation Target
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strategic Implications */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-mono">
            <Target className="h-5 w-5 text-primary" />
            Strategic Implications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategicImplications.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-muted/30 border border-border"
              >
                <div className="flex items-center gap-2 mb-2">
                  <item.icon className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommended Next Steps */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-mono">
            <ArrowRight className="h-5 w-5 text-primary" />
            Recommended Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {nextSteps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-3 rounded-lg bg-muted/30 border border-border"
              >
                <Badge
                  variant={
                    step.priority === "CRITICAL"
                      ? "destructive"
                      : step.priority === "HIGH"
                      ? "default"
                      : "secondary"
                  }
                  className="shrink-0 mt-0.5"
                >
                  {step.priority}
                </Badge>
                <div>
                  <p className="font-semibold text-foreground">{step.action}</p>
                  <p className="text-sm text-muted-foreground">{step.rationale}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conclusion */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <CheckCircle className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Conclusion</h3>
              <p className="text-muted-foreground">
                The analysis of the 2020 trial balance evidence has been successfully completed
                and integrated into the case repositories. This new evidence provides a powerful
                foundation for demonstrating a long-standing pattern of financial manipulation,
                strengthening the case against the perpetrators and vindicating the victims.
                All changes have been synced to the <code className="font-mono text-primary">revstream1</code> and{" "}
                <code className="font-mono text-primary">ad-res-j7</code> GitHub repositories.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Last Updated */}
      <div className="text-center text-sm text-muted-foreground">
        <Calendar className="h-4 w-4 inline mr-1" />
        Last Updated: 2026-01-18
      </div>
    </div>
  );
}
