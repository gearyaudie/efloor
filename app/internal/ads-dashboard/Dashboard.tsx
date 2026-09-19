"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { DashboardPayload, DateRange } from "@/app/lib/adsDashboard/aggregate";

const SERIES_PAID = "#2a78d6"; // categorical slot 1
const SERIES_OTHER = "#eb6834"; // categorical slot 2
const GRIDLINE = "#e1e0d9";
const AXIS = "#c3c2b7";
const TEXT_PRIMARY = "#0b0b0b";
const TEXT_SECONDARY = "#52514e";
const TEXT_MUTED = "#898781";
const GOOD = "#006300";
const BAD = "#d03b3b";
const STATUS_GOOD = "#0ca30c";
const STATUS_WARNING = "#fab219";
const STATUS_CRITICAL = "#d03b3b";

function formatIdr(micros: number): string {
  const value = micros / 1_000_000;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPct(fraction: number): string {
  return `${(fraction * 100).toFixed(1)}%`;
}

function formatNumber(n: number): string {
  return new Intl.NumberFormat("id-ID").format(n);
}

function Delta({ deltaPct, goodDirection }: { deltaPct: number | null; goodDirection: "up" | "down" }) {
  if (deltaPct === null) {
    return <span className="text-sm text-[--muted]" style={{ color: TEXT_MUTED }}>vs prior period: n/a</span>;
  }
  const isUp = deltaPct >= 0;
  const isGood = goodDirection === "up" ? isUp : !isUp;
  const color = deltaPct === 0 ? TEXT_MUTED : isGood ? GOOD : BAD;
  const arrow = deltaPct === 0 ? "•" : isUp ? "▲" : "▼";
  return (
    <span className="text-sm font-medium" style={{ color }}>
      {arrow} {formatPct(Math.abs(deltaPct))} vs prior period
    </span>
  );
}

function StatTile({
  label,
  value,
  deltaPct,
  goodDirection,
  sub,
}: {
  label: string;
  value: string;
  deltaPct: number | null;
  goodDirection: "up" | "down";
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-[rgba(11,11,11,0.10)] bg-[#fcfcfb] p-4">
      <p className="text-sm" style={{ color: TEXT_SECONDARY }}>
        {label}
      </p>
      <p className="mt-1 text-[1.75rem] font-semibold" style={{ color: TEXT_PRIMARY }}>
        {value}
      </p>
      <div className="mt-1">
        <Delta deltaPct={deltaPct} goodDirection={goodDirection} />
      </div>
      {sub ? (
        <p className="mt-0.5 text-xs" style={{ color: TEXT_MUTED }}>
          {sub}
        </p>
      ) : null}
    </div>
  );
}

function TrendChart({ trend }: { trend: DashboardPayload["trend"] }) {
  if (trend.length === 0) {
    return (
      <p className="text-sm" style={{ color: TEXT_MUTED }}>
        No logged leads in this range yet.
      </p>
    );
  }

  const width = 800;
  const height = 220;
  const padding = { top: 12, right: 12, bottom: 24, left: 36 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const maxTotal = Math.max(1, ...trend.map((d) => d.paidLeads + d.otherLeads));
  const niceMax = Math.ceil(maxTotal / 5) * 5 || 5;

  const barSlot = plotWidth / trend.length;
  const barWidth = Math.min(24, barSlot * 0.6);
  const gap = 2;

  const yFor = (v: number) => padding.top + plotHeight * (1 - v / niceMax);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Daily leads by source">
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const v = niceMax * t;
        const y = yFor(v);
        return (
          <g key={t}>
            <line x1={padding.left} x2={width - padding.right} y1={y} y2={y} stroke={GRIDLINE} strokeWidth={1} />
            <text x={padding.left - 8} y={y + 3} textAnchor="end" fontSize={11} fill={TEXT_MUTED}>
              {Math.round(v)}
            </text>
          </g>
        );
      })}
      <line
        x1={padding.left}
        x2={width - padding.right}
        y1={height - padding.bottom}
        y2={height - padding.bottom}
        stroke={AXIS}
        strokeWidth={1}
      />

      {trend.map((d, i) => {
        const x = padding.left + i * barSlot + (barSlot - barWidth) / 2;
        const otherHeight = plotHeight * (d.otherLeads / niceMax);
        const paidHeight = plotHeight * (d.paidLeads / niceMax);
        const baseline = height - padding.bottom;
        const otherY = baseline - otherHeight;
        const paidY = otherY - gap - paidHeight;
        const showLabel = i === trend.length - 1 || i === 0 || i % Math.ceil(trend.length / 8) === 0;

        return (
          <g key={d.date}>
            {d.otherLeads > 0 ? (
              <rect
                x={x}
                y={otherY}
                width={barWidth}
                height={Math.max(otherHeight, 0)}
                rx={4}
                fill={SERIES_OTHER}
              >
                <title>{`${d.date}: ${d.otherLeads} organic/other`}</title>
              </rect>
            ) : null}
            {d.paidLeads > 0 ? (
              <rect x={x} y={paidY} width={barWidth} height={Math.max(paidHeight, 0)} rx={4} fill={SERIES_PAID}>
                <title>{`${d.date}: ${d.paidLeads} from Google Ads`}</title>
              </rect>
            ) : null}
            {showLabel ? (
              <text
                x={x + barWidth / 2}
                y={height - padding.bottom + 14}
                textAnchor="middle"
                fontSize={10}
                fill={TEXT_MUTED}
              >
                {d.date.slice(5)}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

function Legend() {
  return (
    <div className="mt-2 flex gap-4 text-sm" style={{ color: TEXT_SECONDARY }}>
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: SERIES_PAID }} />
        Google Ads click
      </span>
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: SERIES_OTHER }} />
        Organic / other
      </span>
    </div>
  );
}

function Badge({ tone, children }: { tone: "good" | "warning" | "critical" | "muted"; children: React.ReactNode }) {
  const color =
    tone === "good" ? STATUS_GOOD : tone === "warning" ? STATUS_WARNING : tone === "critical" ? STATUS_CRITICAL : TEXT_MUTED;
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color }}>
      <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      {children}
    </span>
  );
}

function ConversionsByActionTable({ rows }: { rows: DashboardPayload["conversionsByAction"] }) {
  if (rows.length === 0) {
    return (
      <p className="text-sm" style={{ color: TEXT_MUTED }}>
        No conversion activity in this range yet.
      </p>
    );
  }
  return (
    <table className="w-full text-left text-sm">
      <thead>
        <tr style={{ color: TEXT_SECONDARY }}>
          <th className="pb-2 font-medium">Action</th>
          <th className="pb-2 font-medium">Counted in bidding?</th>
          <th className="pb-2 font-medium">Conversions</th>
          <th className="pb-2 font-medium">All activity</th>
        </tr>
      </thead>
      <tbody style={{ fontVariantNumeric: "tabular-nums" }}>
        {rows.map((r) => (
          <tr key={r.name} className="border-t" style={{ borderColor: GRIDLINE }}>
            <td className="py-2 pr-2" style={{ color: TEXT_PRIMARY }}>
              {r.name}
            </td>
            <td className="py-2">
              {r.countedInBidding ? <Badge tone="good">Counted</Badge> : <Badge tone="muted">Not counted</Badge>}
            </td>
            <td className="py-2" style={{ color: TEXT_PRIMARY }}>
              {r.conversions.toFixed(1)}
            </td>
            <td className="py-2" style={{ color: TEXT_PRIMARY }}>
              {r.allConversions.toFixed(1)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function KeywordTable({ keywords, currency }: { keywords: DashboardPayload["keywords"]; currency: string }) {
  if (keywords.length === 0) {
    return (
      <p className="text-sm" style={{ color: TEXT_MUTED }}>
        No keyword activity in the last 60 days.
      </p>
    );
  }
  return (
    <table className="w-full text-left text-sm">
      <thead>
        <tr style={{ color: TEXT_SECONDARY }}>
          <th className="pb-2 font-medium">Keyword</th>
          <th className="pb-2 font-medium">Match</th>
          <th className="pb-2 font-medium">QS</th>
          <th className="pb-2 font-medium">Clicks</th>
          <th className="pb-2 font-medium">Cost</th>
          <th className="pb-2 font-medium">CPC</th>
          <th className="pb-2 font-medium">Conversions</th>
          <th className="pb-2 font-medium">Conv %</th>
        </tr>
      </thead>
      <tbody style={{ fontVariantNumeric: "tabular-nums" }}>
        {keywords.map((k) => (
          <tr key={k.keywordId} className="border-t" style={{ borderColor: GRIDLINE }}>
            <td className="py-2 pr-2" style={{ color: TEXT_PRIMARY }}>
              {k.keywordText}
              {k.status !== "ENABLED" ? (
                <span className="ml-1.5">
                  <Badge tone="muted">{k.status.toLowerCase()}</Badge>
                </span>
              ) : null}
            </td>
            <td className="py-2" style={{ color: TEXT_SECONDARY }}>
              {k.matchType.toLowerCase()}
            </td>
            <td className="py-2">
              {k.qualityScore === null ? (
                <span style={{ color: TEXT_MUTED }}>–</span>
              ) : k.qualityScore <= 4 ? (
                <Badge tone="critical">{k.qualityScore}</Badge>
              ) : k.qualityScore <= 6 ? (
                <Badge tone="warning">{k.qualityScore}</Badge>
              ) : (
                <Badge tone="good">{k.qualityScore}</Badge>
              )}
            </td>
            <td className="py-2" style={{ color: TEXT_PRIMARY }}>
              {formatNumber(k.clicks)}
            </td>
            <td className="py-2" style={{ color: TEXT_PRIMARY }}>
              {currency === "IDR" ? formatIdr(k.costMicros) : k.costMicros / 1_000_000}
            </td>
            <td className="py-2" style={{ color: TEXT_PRIMARY }}>
              {k.clicks === 0 ? "–" : formatIdr(k.costMicros / k.clicks)}
            </td>
            <td className="py-2" style={{ color: TEXT_PRIMARY }}>
              {k.conversions.toFixed(1)}
            </td>
            <td className="py-2" style={{ color: TEXT_PRIMARY }}>
              {formatPct(k.convRate)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SearchTermsTable({ terms, currency }: { terms: DashboardPayload["searchTerms"]; currency: string }) {
  const [expanded, setExpanded] = useState(false);
  if (terms.length === 0) {
    return (
      <p className="text-sm" style={{ color: TEXT_MUTED }}>
        No search-term activity in the last 60 days.
      </p>
    );
  }
  const shown = expanded ? terms : terms.slice(0, 30);
  return (
    <>
      <table className="w-full text-left text-sm">
        <thead>
          <tr style={{ color: TEXT_SECONDARY }}>
            <th className="pb-2 font-medium">Search term</th>
            <th className="pb-2 font-medium">Clicks</th>
            <th className="pb-2 font-medium">Cost</th>
            <th className="pb-2 font-medium">Conversions</th>
          </tr>
        </thead>
        <tbody style={{ fontVariantNumeric: "tabular-nums" }}>
          {shown.map((t, i) => (
            <tr key={`${t.searchTerm}-${i}`} className="border-t" style={{ borderColor: GRIDLINE }}>
              <td className="py-2 pr-2" style={{ color: TEXT_PRIMARY }}>
                {t.searchTerm}
                {t.zeroConversionSpend ? (
                  <span className="ml-1.5">
                    <Badge tone="warning">0 conversions</Badge>
                  </span>
                ) : null}
              </td>
              <td className="py-2" style={{ color: TEXT_PRIMARY }}>
                {formatNumber(t.clicks)}
              </td>
              <td className="py-2" style={{ color: TEXT_PRIMARY }}>
                {currency === "IDR" ? formatIdr(t.costMicros) : t.costMicros / 1_000_000}
              </td>
              <td className="py-2" style={{ color: TEXT_PRIMARY }}>
                {t.conversions.toFixed(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {terms.length > 30 ? (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-sm underline"
          style={{ color: TEXT_SECONDARY }}
        >
          {expanded ? "Show fewer" : `Show all ${terms.length}`}
        </button>
      ) : null}
    </>
  );
}

function CampaignTable({ campaigns, currency }: { campaigns: DashboardPayload["campaigns"]; currency: string }) {
  if (campaigns.length === 0) {
    return (
      <p className="text-sm" style={{ color: TEXT_MUTED }}>
        No campaign spend in this range.
      </p>
    );
  }
  return (
    <table className="w-full text-left text-sm">
      <thead>
        <tr style={{ color: TEXT_SECONDARY }}>
          <th className="pb-2 font-medium">Campaign</th>
          <th className="pb-2 font-medium">Clicks</th>
          <th className="pb-2 font-medium">Cost</th>
          <th className="pb-2 font-medium">CPC</th>
          <th className="pb-2 font-medium">Conversions</th>
          <th className="pb-2 font-medium">Conv %</th>
        </tr>
      </thead>
      <tbody style={{ fontVariantNumeric: "tabular-nums" }}>
        {campaigns.map((c) => (
          <tr key={c.campaignId} className="border-t" style={{ borderColor: GRIDLINE }}>
            <td className="py-2 pr-2" style={{ color: TEXT_PRIMARY }}>
              {c.campaignName}
            </td>
            <td className="py-2" style={{ color: TEXT_PRIMARY }}>
              {formatNumber(c.clicks)}
            </td>
            <td className="py-2" style={{ color: TEXT_PRIMARY }}>
              {currency === "IDR" ? formatIdr(c.costMicros) : c.costMicros / 1_000_000}
            </td>
            <td className="py-2" style={{ color: TEXT_PRIMARY }}>
              {c.clicks === 0 ? "–" : formatIdr(c.costMicros / c.clicks)}
            </td>
            <td className="py-2" style={{ color: TEXT_PRIMARY }}>
              {c.conversions.toFixed(1)}
            </td>
            <td className="py-2" style={{ color: TEXT_PRIMARY }}>
              {formatPct(c.convRate)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const [range, setRange] = useState<DateRange>("mtd");
  const [data, setData] = useState<DashboardPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/ads-dashboard/data?range=${range}`)
      .then((res) => {
        if (res.status === 401) {
          router.refresh();
          return null;
        }
        return res.json();
      })
      .then((json) => {
        if (!cancelled && json?.ok) setData(json.data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [range, router]);

  const lastUpdated = useMemo(() => {
    if (!data?.fetchedAt) return null;
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    }).format(new Date(data.fetchedAt));
  }, [data?.fetchedAt]);

  async function handleLogout() {
    await fetch("/api/ads-dashboard/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[1.5rem] font-semibold" style={{ color: TEXT_PRIMARY }}>
            EFLOOR Google Ads overview
          </h1>
          <p className="text-sm" style={{ color: TEXT_SECONDARY }}>
            Ad spend and WhatsApp leads. Conversions are Google Ads&apos; own reported count, not sales-verified.
          </p>
          {lastUpdated ? (
            <p className="mt-1 text-xs" style={{ color: TEXT_MUTED }}>
              Ads data last refreshed {lastUpdated} WIB
            </p>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex overflow-hidden rounded-full border" style={{ borderColor: AXIS }}>
            {(["mtd", "28d"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className="px-3 py-1.5 text-sm font-medium"
                style={{
                  background: range === r ? "#2a78d6" : "transparent",
                  color: range === r ? "#fff" : TEXT_SECONDARY,
                }}
              >
                {r === "mtd" ? "MTD" : "Last 28 days"}
              </button>
            ))}
          </div>
          <button onClick={handleLogout} className="text-sm underline" style={{ color: TEXT_MUTED }}>
            Sign out
          </button>
        </div>
      </div>

      {loading && !data ? (
        <p className="mt-8 text-sm" style={{ color: TEXT_MUTED }}>
          Loading…
        </p>
      ) : !data ? (
        <p className="mt-8 text-sm" style={{ color: BAD }}>
          Couldn&apos;t load dashboard data.
        </p>
      ) : (
        <>
          <p className="mt-4 text-xs" style={{ color: TEXT_MUTED }}>
            Showing {data.range.start} – {data.range.end} vs {data.range.compareStart} – {data.range.compareEnd}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
            <StatTile
              label="Total leads (WhatsApp)"
              value={formatNumber(data.kpis.totalLeads.current)}
              deltaPct={data.kpis.totalLeads.deltaPct}
              goodDirection="up"
            />
            <StatTile
              label="Leads from Google Ads"
              value={formatPct(data.kpis.paidLeadShare.current)}
              deltaPct={data.kpis.paidLeadShare.deltaPct}
              goodDirection="up"
            />
            <StatTile
              label="Ad spend"
              value={formatIdr(data.kpis.adSpendMicros.current)}
              deltaPct={data.kpis.adSpendMicros.deltaPct}
              goodDirection="down"
            />
            <StatTile
              label="Blended CPL"
              value={data.kpis.blendedCplMicros ? formatIdr(data.kpis.blendedCplMicros.current) : "–"}
              deltaPct={data.kpis.blendedCplMicros?.deltaPct ?? null}
              goodDirection="down"
              sub="Ad spend ÷ leads from Google Ads clicks"
            />
            <StatTile
              label="WhatsApp Click conversions"
              value={data.kpis.whatsappClickConversions.current.toFixed(1)}
              deltaPct={data.kpis.whatsappClickConversions.deltaPct}
              goodDirection="up"
              sub="The one Ads-reported action that means a real lead"
            />
            <StatTile
              label="Ads-reported conversions (all actions)"
              value={data.kpis.adsReportedConversions.current.toFixed(1)}
              deltaPct={data.kpis.adsReportedConversions.deltaPct}
              goodDirection="up"
              sub="Includes Directions/Calls — see breakdown below"
            />
            <StatTile
              label="CTR"
              value={formatPct(data.kpis.ctr.current)}
              deltaPct={data.kpis.ctr.deltaPct}
              goodDirection="up"
            />
          </div>

          <div className="mt-6 rounded-xl border border-[rgba(11,11,11,0.10)] bg-[#fcfcfb] p-4">
            <h2 className="text-sm font-semibold" style={{ color: TEXT_PRIMARY }}>
              Leads trend by source
            </h2>
            <Legend />
            <div className="mt-2">
              <TrendChart trend={data.trend} />
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-[rgba(11,11,11,0.10)] bg-[#fcfcfb] p-4">
            <h2 className="text-sm font-semibold" style={{ color: TEXT_PRIMARY }}>
              Campaign performance
            </h2>
            <div className="mt-2 overflow-x-auto">
              <CampaignTable campaigns={data.campaigns} currency={data.currency} />
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-[rgba(11,11,11,0.10)] bg-[#fcfcfb] p-4">
            <h2 className="text-sm font-semibold" style={{ color: TEXT_PRIMARY }}>
              Conversions by action
            </h2>
            <p className="text-xs" style={{ color: TEXT_MUTED }}>
              What Google Ads is actually counting vs. what it's just recording.
            </p>
            <div className="mt-2 overflow-x-auto">
              <ConversionsByActionTable rows={data.conversionsByAction} />
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-[rgba(11,11,11,0.10)] bg-[#fcfcfb] p-4">
            <h2 className="text-sm font-semibold" style={{ color: TEXT_PRIMARY }}>
              Keyword performance
            </h2>
            <p className="text-xs" style={{ color: TEXT_MUTED }}>
              Last 60 days, not affected by the MTD/28-day toggle above.
            </p>
            <div className="mt-2 overflow-x-auto">
              <KeywordTable keywords={data.keywords} currency={data.currency} />
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-[rgba(11,11,11,0.10)] bg-[#fcfcfb] p-4">
            <h2 className="text-sm font-semibold" style={{ color: TEXT_PRIMARY }}>
              Search terms
            </h2>
            <p className="text-xs" style={{ color: TEXT_MUTED }}>
              Last 60 days, top 200 by cost. Flagged rows spent Rp20,000+ with zero conversions — candidates for a
              negative keyword.
            </p>
            <div className="mt-2 overflow-x-auto">
              <SearchTermsTable terms={data.searchTerms} currency={data.currency} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
