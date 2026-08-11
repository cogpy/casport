import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  Database,
  ExternalLink,
  FileText,
  GitBranch,
  Landmark,
  Network,
  Scale,
  Shield,
  Users,
} from "lucide-react";

const canonicalBase = "https://cogpy.github.io/revstream1";
const extendedBase = "https://cogpy.github.io/ad-res-j7";

const stats = [
  { label: "Canonical entities", value: "78", icon: Users },
  { label: "Canonical events", value: "182", icon: Clock },
  { label: "Canonical relations", value: "42", icon: Network },
  { label: "Dated chronology entries", value: "270", icon: GitBranch },
];

const applications = [
  {
    title: "Court and civil response",
    description:
      "Civil reconsideration and document-examiner working drafts: court files establish procedure and express determinations, while pleadings remain side-specific versions.",
    drafts: "2 working drafts",
    href: `${canonicalBase}/applications/court-civil/`,
    icon: Scale,
  },
  {
    title: "Regulatory and professional complaints",
    description:
      "CIPC, POPIA, LPC, and SAICA working complaints organized by forum, role, evidence class, and requested investigation.",
    drafts: "4 working drafts",
    href: `${canonicalBase}/applications/regulatory-professional/`,
    icon: Building2,
  },
  {
    title: "Criminal and financial referrals",
    description:
      "NPA commercial-crime, NPA tax/accounting, and FIC working referrals separated from civil findings and framed for independent investigation.",
    drafts: "3 working drafts",
    href: `${canonicalBase}/applications/criminal-financial/`,
    icon: Landmark,
  },
];

const matters = [
  {
    id: "2025-137857",
    status: "Primary repository case reference",
    control: "The official file controls procedure and express determinations; pleadings remain applicant/respondent versions.",
    href: `${canonicalBase}/matters/2025-137857/`,
  },
  {
    id: "2026-034662",
    status: "Divorce-record matter",
    control: "Filed notices can establish procedural status, not the truth of underlying divorce allegations.",
    href: `${canonicalBase}/matters/2026-034662/`,
  },
  {
    id: "2026-115880",
    status: "Urgent/reconsideration matter reference",
    control: "Court-file confirmation can resolve matter numbers, procedure, orders, and express findings—not disputed underlying events.",
    href: `${canonicalBase}/matters/2026-115880/`,
  },
];

const corrections = [
  "Founder and Trustee capacities in the Faucitt Family Trust remain distinct.",
  "Ketoni is the asserted obligor to the Trust for a total ZAR 18.75 million; alternative windows are not cumulative.",
  "No personal debt by Bantjies to the Trust is asserted.",
  "Rynette Farrar is not recorded as a ReZonance director; authority requires a primary instrument.",
  "Mazars material is described as an ISRS 4400 agreed-upon-procedures engagement pending the primary engagement records.",
  "EVENT_187 records transfers only; mandate, invoice, allocation, authority, purpose, and conflict implications remain unresolved.",
  "EVENT_188 records the KF0019 Part B filing and applicant version; it is not independent proof of the disputed underlying events.",
  "Court pleadings are applicant/respondent or plaintiff/defendant versions; orders establish only operative terms and express findings within scope.",
];

const sourceGaps = [
  "Complete court registers, filed papers, orders, service records, and matter-number confirmation for procedure and express determinations; side attribution for every pleading",
  "Signed Ketoni agreement, amendments, elections, statements, and payment records",
  "Trust deed, amendments, Letters of Authority, resolutions, and Master records",
  "Mazars engagement letter, agreed procedures, mandate, final report, limitations, and responses",
  "Elliott mandate, client authority, attendance notes, invoices, allocation, purpose, and conflict checks",
  "Transaction-level bank, platform, ledger, tax, stock, beneficiary, mandate, and reconciliation records",
];

const filings = [
  "Civil reconsideration",
  "Independent document-examiner brief",
  "CIPC complaint",
  "POPIA complaint",
  "LPC complaint",
  "SAICA complaint",
  "NPA commercial-crime referral",
  "NPA tax/accounting-record referral",
  "FIC report",
];

function ExternalButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Button asChild variant="outline" className="group">
      <a href={href} target="_blank" rel="noreferrer">
        {children}
        <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </a>
    </Button>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      <section className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-emerald-500/50 text-emerald-500">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Synchronized 11 August 2026
              </Badge>
              <Badge variant="outline" className="border-amber-500/50 text-amber-500">
                Working evidence and draft filings
              </Badge>
            </div>
            <h1 className="font-mono text-3xl font-bold tracking-tight text-foreground">
              Caselex synchronized evidence portal
            </h1>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              A public-safe navigation layer across three application bundles, three matter folders,
              the canonical entity–event–relation model, and nine controlled v31 working drafts.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <ExternalButton href={`${canonicalBase}/combined/`}>Combined view</ExternalButton>
            <ExternalButton href={extendedBase}>Extended evidence</ExternalButton>
          </div>
        </div>
        <div className="mt-6 flex items-start gap-3 rounded-lg border border-amber-500/25 bg-amber-500/5 p-4 text-sm leading-6 text-muted-foreground">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
          <p>
            This portal separates independent source records, procedural records, court determinations,
            and applicant/respondent or plaintiff/defendant versions. Court filings do not independently
            prove disputed underlying events. Independent-source verification, side attribution, annexure
            separation, and competent professional review remain required.
          </p>
        </div>
      </section>

      <section id="model" className="space-y-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Canonical model</p>
          <h2 className="mt-1 text-2xl font-semibold text-foreground">Verified synchronization status</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <Card key={label} className="evidence-card">
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="mt-1 font-mono text-3xl font-bold text-foreground">{value}</p>
                </div>
                <div className="rounded-lg bg-primary/10 p-3 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card className="evidence-card">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Model validation</p>
              <p className="mt-1 font-mono text-2xl font-bold text-emerald-500">74 / 74</p>
              <p className="mt-2 text-sm text-muted-foreground">Integrity, privacy, crosswalk, and repository identity checks passed.</p>
            </CardContent>
          </Card>
          <Card className="evidence-card">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">v31 drafting validation</p>
              <p className="mt-1 font-mono text-2xl font-bold text-emerald-500">139 / 139</p>
              <p className="mt-2 text-sm text-muted-foreground">Structure, privacy, burden language, and canonical-fact controls passed.</p>
            </CardContent>
          </Card>
          <Card className="evidence-card">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Timeline crosswalk</p>
              <p className="mt-1 font-mono text-lg font-bold text-foreground">159 represented</p>
              <p className="mt-2 text-sm text-muted-foreground">11 analysis artifacts excluded; 12 undated records remain source-gapped.</p>
            </CardContent>
          </Card>
          <Card className="evidence-card">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Perspectival evidence map</p>
              <p className="mt-1 font-mono text-lg font-bold text-foreground">182 / 182 classified</p>
              <p className="mt-2 text-sm text-muted-foreground">16 court-derived records; 19 events require annexure separation.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="applications" className="space-y-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Three application bundles</p>
          <h2 className="mt-1 text-2xl font-semibold text-foreground">Forum-specific working records</h2>
        </div>
        <div className="grid gap-4 xl:grid-cols-3">
          {applications.map(({ title, description, drafts, href, icon: Icon }) => (
            <Card key={title} className="evidence-card flex flex-col">
              <CardHeader>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-5">
                <div>
                  <p className="text-sm leading-6 text-muted-foreground">{description}</p>
                  <Badge variant="secondary" className="mt-4">{drafts}</Badge>
                </div>
                <ExternalButton href={href}>Open application bundle</ExternalButton>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="matters" className="space-y-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Three matter folders</p>
          <h2 className="mt-1 text-2xl font-semibold text-foreground">Matter-specific navigation and perspective controls</h2>
        </div>
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          {matters.map((matter, index) => (
            <a
              key={matter.id}
              href={matter.href}
              target="_blank"
              rel="noreferrer"
              className={`group grid gap-3 p-5 transition-colors hover:bg-muted/40 md:grid-cols-[170px_1fr_1.4fr_24px] md:items-center ${index ? "border-t border-border" : ""}`}
            >
              <span className="font-mono font-bold text-primary">{matter.id}</span>
              <span className="text-sm font-medium text-foreground">{matter.status}</span>
              <span className="text-sm leading-6 text-muted-foreground">{matter.control}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </a>
          ))}
        </div>
      </section>

      <section id="combined" className="grid gap-6 xl:grid-cols-2">
        <Card className="evidence-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5 text-primary" />
              Canonical corrections applied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 text-sm leading-6 text-muted-foreground">
              {corrections.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span className="font-mono text-primary">{String(index + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card className="evidence-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Database className="h-5 w-5 text-primary" />
              Source and version priority register
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
              {sourceGaps.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section id="filings" className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">v31 portfolio</p>
            <h2 className="mt-1 text-2xl font-semibold text-foreground">Nine controlled working drafts</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              All drafts remove synthetic proof percentages, classify court pleadings by side, distinguish
              procedural facts from disputed underlying events, record unresolved source-and-version gaps,
              and require professional review before use.
            </p>
          </div>
          <ExternalButton href={`${canonicalBase}/filings/v31/`}>Open full portfolio</ExternalButton>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filings.map((filing, index) => (
            <div key={filing} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-sm font-bold text-primary">
                {index + 1}
              </div>
              <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{filing}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Repository roles and publication controls</h2>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">
              Revstream1 is the canonical public navigation and filing surface. Ad-res-j7 preserves the
              extended evidence and source-reference view. Local caselex retains raw OCR derivatives,
              source documents, and sensitive identifiers. Fincosys receives only public-safe entity and
              financial-model projections.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <ExternalButton href={`${canonicalBase}/model/PERSPECTIVAL_EVIDENCE_POLICY.html`}>Perspective policy</ExternalButton>
            <ExternalButton href={`${canonicalBase}/model/CANONICAL_MODEL_VALIDATION.html`}>Model validation</ExternalButton>
            <ExternalButton href="https://github.com/cogpy/revstream1">Source repository</ExternalButton>
          </div>
        </div>
      </section>
    </div>
  );
}
