import{c as k,a as h,f as u,t as y}from"./C8W2LUnC.js";import{R as _}from"./D_FA5QwP.js";import{k as T,g as b,n as x,F as m,aM as R,q as d,_ as $,o as A,$ as D,t as C,a0 as j}from"./n8ENmZf5.js";import{i as P,l as B,s as I}from"./CvxvsaYy.js";import{C as M,Q as S}from"./DTymnJdW.js";import{D as E}from"./CsF5zQn5.js";import{s as F}from"./CRkm95oG.js";import{C as O}from"./BuK7PFFs.js";const Y="0123456789ABCDEFGHJKMNPQRSTVWXYZ";function g(s,t){let e=t>>>0;for(let a=0;a<s.length;a++)e^=s.charCodeAt(a),e=Math.imul(e,16777619)>>>0;return e}function q(s){const t=s.trim(),e=g(t,2166136261),a=g(t,2654435769);let c=BigInt(e)<<8n|BigInt(a&255),o="";for(let i=0;i<8;i++)o=Y[Number(c&31n)]+o,c>>=5n;return`DR-${o.slice(0,4)}-${o.slice(4)}`}var z=u('<p class="stamp svelte-1280m42">desk ref <b class="svelte-1280m42"> </b></p>'),J=u(`<p class="stamp missing svelte-1280m42">no desk ref: this page isn't signed (no <code>signature</code> in its frontmatter)</p>`);function L(s,t){T(t,!0);const e=R(()=>t.signature?q(t.signature):null);var a=k(),c=b(a);{var o=r=>{var n=z(),l=d($(n)),p=A(l,!0);D(n),C(()=>F(p,m(e))),h(r,n)},i=r=>{var n=J();h(r,n)};P(c,r=>{m(e)?r(o):r(i,-1)})}h(s,a),x()}const f={layout:"runbook",title:"#4471 review: two causes behind one date ticket",owner:"Will (pb3975) with Codex",status:"investigated",reviewed:"2026-10-30",signature:"Will / pb3975 / S01E03 / 2026-10-30"},{layout:ae,title:oe,owner:re,status:se,reviewed:ne,signature:H}=f;var N=u(`<p>The <a href="/kb/incidents/4471">original incident</a> says one issue and one fix. Its rendered
table shows two causes. A shared symptom and a shared ticket do not establish a shared
failure. This review uses the synthetic course export dated 4 October, not a live
production feed. The review date records when we checked it, not when the data ended.</p> <h2>Separate the problems</h2> <!> <p>The table’s “no ticket of its own” describes the exported desk state. The separate
GitHub tickets linked below are this review’s proposed split.</p> <p>Counts above come from <code>uniqueById</code>, <code>groupByCause</code>, and <code>tenantOf</code>. Export pages
overlap, so count each report ID once before filtering for the ticket. Resolve the
tenant’s locale and form from the directory. <code>meta.browserLocale</code> and <code>meta.intakeTag</code> are intake guesses, not the cause. Every report in this export has
a tenant on file; unknown tenants should remain unplaced for investigation.</p> <h3>Shared parser reads day-first dates month first</h3> <p><a href="https://github.com/pb3975/mega-s01e03-what-it-shows/issues/1" rel="nofollow">Parser ticket</a>.
The shared parser assumes month-first input although these tenants use day-first
dates. For example, R-41200 at harbour.dental reports 7 April becoming 4 July.
This affects app and email reports and forms whose hint is already day-first.
Changing a form hint alone cannot fix those paths. Make the parser respect an
explicit input contract and verify ambiguous dates on every affected path.</p> <h3>Booking-v3 tells day-first tenants to enter month first</h3> <p><a href="https://github.com/pb3975/mega-s01e03-what-it-shows/issues/2" rel="nofollow">Form hint ticket</a>.
For day-first tenants, booking-v3 prints <code>MM/DD/YYYY</code> while its form reads dates
the tenant’s way. This is a different failure: a person can follow the displayed
instructions and still get the wrong date. R-41241 at alder.physio reports 6 August
becoming 8 June. It arrives through the form; the tenant runs booking-v3. Align
the hint with the form’s interpretation and check it separately from the shared parser.</p> <!> <p>The follow-up report IDs are R-41202, R-41209, R-41236, R-41344, and R-41620.
R-41236 even describes an invite arriving before the booking. Preserve these
accounts and ask for timestamps, input, expected date, actual date, and timezone.</p> <h2>Read arrival time separately from merge time</h2> <!> <p>Reports arrived from April through October. The large July merge bar describes
desk processing, not the start of a sudden product incident. Later arrivals keep
being merged into the known ticket. A queued parser fix therefore cannot stand
in for a ticket for the form-hint failure, and “known” does not mean resolved.</p> <h2>Triage by evidence, not subject</h2> <p>The <a href="/kb/triage/dedupe">accepted triage page</a> tells the desk to merge matching
subjects without reading the body, citing <a href="/kb/decisions/0001-dedupe-by-subject">decision 0001</a>.
Those words disagree with the rendered explorer below, which compares causes.
The old reviewed date also triggers the layout’s stale warning. The recent date
on the original incident does not make its one-issue conclusion true.</p> <!> <p>Different subjects can describe the same cause. The same subject can describe
different causes when channel or tenant form differs. An unknown tenant gives
no confirmed cause, even if both subjects match.</p> <p><strong>Proposed desk rule:</strong> read the body, resolve tenant locale and form, check the
channel, and compare the failure before merging. Keep uncertain reports separate
until that evidence exists. Link each confirmed cause to its own ticket and
review the live component output before marking the page known.</p> <p>Decision 0001 remains unchanged because accepted decisions are immutable. This
review proposes a replacement decision; it does not claim the desk has approved
or deployed that change. No product fix has been implemented by this investigation.</p> <!>`,1);function Q(s,t){const e=B(t,["children","$$slots","$$events","$$legacy"]);_(s,I(()=>e,()=>f,{children:(a,c)=>{var o=N(),i=d(b(o),4);M(i,{ticket:4471});var r=d(i,14);O(r,{kind:"warn",children:(v,W)=>{j();var w=y(`The one-day-move reports are retained in the parser group and footnoted by the
component. Their bodies raise a follow-up question about timezones, date-only
handling, and chronology. Tenant classification is not proof of each report's
root cause. Do not silently subtract these reports or claim a confirmed third bug
without reproduction evidence.`);h(v,w)},$$slots:{default:!0}});var n=d(r,6);S(n,{ticket:4471});var l=d(n,8);E(l,{});var p=d(l,8);L(p,{get signature(){return H}}),h(a,o)},$$slots:{default:!0}}))}const ie=Object.freeze(Object.defineProperty({__proto__:null,default:Q,metadata:f},Symbol.toStringTag,{value:"Module"}));export{ie as _,Q as a};
