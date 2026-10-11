# School program implementation

## Current implementation — 2026-10-05 school planning revision

This section supersedes older snapshots below. Public name: Elly’s Arts & Crafts — School & Group Programs; subtitle Create & Celebrate. Class size: 20–30. Service area: NYC, select Long Island communities and nearby New Jersey; venue availability and return delivery are confirmed by inquiry.

- Six public folder pages: overview, calendar, pricing, request, questions, planning-summary. All primary menus include School Q&A. The planning summary has a letter-size print stylesheet and a Print This Summary button.
- Overview keeps the approved classroom background, photo pile, process illustrations and grade illustrations. It now puts the school inquiry CTA earlier, gives observable grade-specific learning aims, a clearly labeled sample 60-minute outline and a three-column division of roles.
- Calendar workspace appears before teacher activity ideas. All projects are available from an accessible dropdown. Artwork cards sit in a native details disclosure. Find Dates links target the compact planner directly.
- Community Celebrations uses custom event timing; its legacy stored dates are not public promised visit/return windows. Renderer also recognizes the existing community ID for older local-browser records. Its requested return is planned around the institution’s actual celebration. Standard seasonal projects still use editable date windows.
- Initial inquiry has five required fields: organization, contact name, email, neighborhood/ZIP, and free-text grades/ages plus approximate group size. Timing is optional. Additional dates, phone, group type, class count, occasion and notes sit in an optional disclosure. There is no extra month requirement. A selected calendar date appears in the visible timing/context and remains editable in details.
- EmailJS retains the existing service/template mapping to user_name, user_email, subject and message. The message now includes group_summary and timing, rather than the old separate grades/estimated_students/preferred_month fields. All optional fields are included in message. Mailbox receipt and Reply-To still need account-level verification; no email was sent during this revision.
- Q&A covers the experience, school-day arrangements, finished work, pricing/approval, and other groups/locations. No fabricated school case, instructor biography, review, vendor approval, insurance claim, replacement policy or fixed turnaround was added. Unconfirmed operational details are described as arrangements to agree before booking.
- The five-minute steps in the sample schedule are illustrative, not an established service-level promise. Arrival/setup, cleanup responsibility, staff assignments, identification, return deadline and changes/damage handling require owner confirmation in the written proposal.
- Shared administration is still a localStorage prototype without authenticated shared persistence. Do not publish the admin as a real production booking system. No deployment or Git push was performed.

Local browser observations: school CTA is visible at y≈505 on a 1280×720 viewport, previously y≈722. Mobile week planner is approximately 560px high, April month view approximately 656px and six-week May view approximately 710px; date cells approximately 45px wide. Find Dates scrolls the week planner below the 130px sticky header. Custom-date inquiry remains available for weekdays outside the selected seasonal window. Loading data preserves the selected week/month view. Q&A disclosure opens correctly. Selected April 6, 2027 and spring-family pass to the inquiry, which exposes five required inputs. The initial mobile form is approximately 783px high with details closed, previously approximately 1544px. No live email was submitted. The browser screenshot facility failed, so these observations use the rendered DOM and element bounds; pixel-level visual confirmation and physical print pagination remain unverified.

Four static folder pages are provided under /school-programs/. Use a static server at the repository root, not file://, because assets use site-root paths. The existing main React bundle is unchanged. An authored school-entry.js inserts a school banner after the main homepage hero. Integrate a proper desktop/mobile navigation link in the original React source when that source is available.

The inquiry form sends directly through the existing Contact Us EmailJS service and template, using its existing user_name/user_email/subject/message variables. Structured school fields are composed into message. The EmailJS dashboard recipient, Reply-To, domain restrictions, quota and template rendering still need owner verification. No mail was sent during development. Public-key settings are intentionally client-side; no SMTP password is included.

Photos currently reuse real Elly’s studio assets with a studio caption. The approved hands-from-behind school photo concepts are not yet integrated as standalone photographic assets. Do not use an entire mockup screenshot as a photograph. Obtain individual licensed/approved images for replacement.

Seasonal dates are interest-only. No fabricated remaining count or bookable date is shown. Current calendar is a planning display, not a live reservation system. Confirm capacity and school calendars before adding bookable slots. Manual season data is at data/seasons.json; the current renderer intentionally handles interest registration only. Live availability counters require a later implementation.

Pages are noindex until prices, seasonal operations and email configuration are approved for public launch. No tests were added or run. No deployment or Git push was performed.

## Integration check — 2026-10-04
Desktop overview, calendar season switching, Thanksgiving inquiry selection, pricing, required-field focus and the 390px mobile menu were checked in a local browser. JavaScript syntax for inquiry.js passed. No email was transmitted, so mailbox receipt is unverified.
Remote v26 remains at 390e6e7600b5c156f157b3f4bea837e106c7e213. Publishing was blocked: GitHub integration returned 403 Resource not accessible by integration for create-tree. Local Git credential manager could not access its Windows credential store. No remote files changed.


## Scope correction — local only
The owner requested local preview and testing only. Do not deploy or push without a new explicit request. Local preview: http://127.0.0.1:8765/school-programs/. Email delivery is connected but no actual test inquiry was sent.


## Editorial restyle — local only
The four pages now share editorial.css: warm dark layers, serif headings, pink accents, photographic project windows, refined pricing cards and a two-column inquiry layout. Approved mockup artwork is displayed using CSS image windows for local design review; source screenshots are not presented as whole-page website images. Standalone production photo exports should replace these review assets before publishing. No remote changes or email transmission.


Background asset: assets/studio-atmosphere-v2.png, generated with the built-in imagegen tool. Prompt: wide photorealistic editorial pottery studio at dusk; warm tungsten light; dark shelves, worktable, brushes and ceramics; left side quiet for text; no people, signage, letters or logos. This is an atmospheric concept image, not a photograph of Elly's actual premises.


## NYC school planning calendar
School dates: data/nyc-school-calendar.json, official NYCPS 2026-27 source checked 2026-10-04; 2027 Jan-Jun covered. Later 2027 dates are unverified. Program visit and return windows in seasons.json are proposed business planning periods, not confirmed capacity. Selecting a project jumps to its first visit week; week/month views and day details show closures, conferences, exams and windows. Click eligible weekdays to prefill the inquiry. School-specific events can be added to localEvents with start/end/title/type/scope after the school confirms dates. No summer open-school assumption is made. No deployment or email transmission.


## Local admin prototype
/admin/ supports program CRUD/archive, per-day confirmed/hold/unavailable records, hold expiration, JSON export/import and local reset. Storage is localStorage scoped to browser+origin. Calendar reads the same data, syncs open tabs through storage events, and masks internal date labels. Blocked days cannot produce date-inquiry links; request submission also checks local blocks. This is NOT secure administration and is not for deployment. Production needs authenticated server-side authorization, shared storage and atomic date-conflict handling. Do not store sensitive data here.


## Booking UX refinement
Selecting a linked program in date administration suggests its first unblocked weekday and constrains visit dates to that program window. Hold deadline is shown only for temporary holds, defaults to seven days from New York current date, and automatically reopens after that day. Calendar blocked, closed and weekend cells are disabled; confirmed dates display Reserved by another school with muted appearance. No school identity is displayed publicly. Runtime verification: program selection populated 2027-04-05; hold field hidden for confirmed status and shown with 2026-10-11 deadline for hold on 2026-10-04. Existing stored booking data was not changed.


## Classroom atmosphere — 2026-10-04
Shared public-page backgrounds now use assets/nyc-classroom-atmosphere-v3.png. Built-in imagegen prompt: authentic older NYC public school art classroom, tall windows and radiator, ordinary tables and chairs, chalkboard and abstract student artwork, ceramic painting materials, warm afternoon light, dark quiet left composition, no people or text. Generated concept image, not documentation of an actual school. Existing dark overlays preserve readable text. Previous studio asset retained. Local only.


## Service area copy — 2026-10-05
Public pages identify the program as NYC-based, serving NYC, select Long Island communities and nearby New Jersey communities close to NYC. This owner-requested scope supersedes the earlier borough-only wording. Exact addresses, route availability, travel costs and return delivery require confirmation; no automatic ZIP rejection is implemented. Inquiry location help is linked with aria-describedby. Local only.

Service-area copy refinement: removed travel-cost and travel-charge wording from overview and inquiry guidance/FAQ at owner request; visit availability and return delivery remain.


## Whole-grade recommendation — 2026-10-05
Recommended offer is now a whole-grade project with custom quotation, class-by-class scheduling and coordinated firing/return. One/two/three-class planning prices remain as secondary options; two-class recommendation removed. Whole-grade CTA prefills inquiry interest and editable notes without assuming student counts or sending email. Local only.

## Pricing layout revision — 2026-10-05
Owner requested four pricing columns in the original card style: one class, two classes, three classes, and recommended whole grade with Custom Quote. Separate whole-grade panel removed. Responsive layout uses two columns on medium widths and one on mobile; whole-grade inquiry link retained. Local only.

## Animated photo stack — 2026-10-05
Overview rectangular artwork panel replaced by three overlapping photographic prints using existing Elly’s gallery JPGs. Classroom remains visible between prints. Staggered entrance fade and subtle floating motion; explicit pause/resume control, hover pause and reduced-motion static layout. No stock/AI school-photo claim. Local only.

## Continuous gallery — 2026-10-05
20 existing Elly’s ceramic gallery photos copied into school-programs/assets/gallery. Three overlapping prints remain visible; one slot fades out and is replaced approximately every 4.5 seconds, cycling slots without simultaneous duplicate images. Pause/resume button removed at owner request. Reduced-motion preference keeps static images, and hidden tabs stop scheduling. Images decode before replacement; load failures preserve the current print. Local only.

## Placed-photo pile — 2026-10-05
Replaced fixed-slot swapping with a FIFO stack: initial three prints enter in order; every next print is appended above all earlier prints and lands with slight randomized position and rotation. Oldest print fades and is removed, leaving three settled prints. Brief fourth print during the transition. Gallery retains 20 photos, reduced-motion static layout, hidden-tab scheduling and predecode. Local only.

## Illustrated process — 2026-10-05
Overview process cards replaced by native inline SVG line illustrations: planning conversation, teacher/student ceramic painting and firing/return truck. Cream and pink pen strokes match the existing theme. Decorative illustrations are hidden from assistive technology; step titles and explanations remain real text. Three columns with arrows on desktop, vertical sequence on mobile. Local only.

## Hand-sketch refinement — 2026-10-05
Owner rejected richly detailed generated illustration direction. Generated image was not applied. Original inline line drawings retained and gently enriched with face/clothing/tool details, sparse hatch strokes and faint rose/sage/ochre washes. Local only.

## User-reference illustration — 2026-10-05
Replaced native sketch process drawings with assets/process-editorial-v3.png, generated through built-in imagegen using the supplied fashion illustration as visual reference: fine espresso pen outlines, restrained faces, warm apricot/off-white flat fills, three transparent vignettes for planning, classroom painting, firing/return. Single triptych shown through three CSS image windows; headings and descriptions remain HTML text. Local only.

Return illustration correction: built-in imagegen edited the reference triptych to put the kiln behind the worker, and a receiving teacher at the school ahead. New asset process-return-to-school-v4.png used only for scene 3; scenes 1 and 2 retain original asset. Transparent hand-drawn style preserved. Local only.


Brand illustration revision: built-in imagegen edit of process-return-to-school-v4.png creates process-brand-pink-v5.png. First scene now shows school teacher with ID lanyard and schedule clipboard, no apron, consulting an art instructor. All scenes use dusty blush pink, cream, warm taupe and espresso to match site/logo. Correct firing-to-school return direction retained. Transparent asset saved locally; no deployment.


Grade section revision: added an explicit section title and age-adapted approach, elementary/middle/high labels, project ideas, instructor guidance and skills practiced. Existing ceramic inspiration photos retained. Built-in imagegen created transparent grade-students-v1.png using process-brand-pink-v5.png as style reference: three student groups ages 9-10, 12-13, 16-17, cream/dusty pink/espresso editorial pen style. CSS image windows show matching age group above each card. Local only.


## Grade card layout correction — 2026-10-05
Removed large illustration strip above each photo. Student illustration is now a small 112px decorative sign-off at bottom right inside card copy. Photos remain the lead visual; section heading, copy and list padding/margins normalized. Cards use flex columns for aligned bottom illustrations, with single-column cards below 850px for readable content. Local only.

Grade illustration placement revision: small student illustration now sits right of the grade/stage/theme title inside each card, rather than at the bottom. Body guidance continues below full width. Local only.

Grade panel correction: exported three independent transparent panels from existing generated triptych (no artwork redraw), trimmed empty alpha margins, and replaced sprite backgrounds with contained img elements. Prevents neighboring-panel bleed and cropped figures. Local only.

Grade overlap refinement: applied requested margin -40px 0 0 0. Re-exported v3 individual student assets at actual transparent separation gaps rather than equal thirds, eliminating the neighboring figure fragment in the middle card. Original artwork scale and contained rendering retained. Local only.

Staff character edit: built-in imagegen edit of process-friendly-faces-v6.png saved as process-staff-v7.png. Middle instructor changed to a different woman with chestnut bob; receiving teacher at far right changed to blonde ponytail. Existing scene narrative, palette and composition retained. Applied locally only.


Pricing explanation revision: cards distinguish starting totals, per-student rates and separate 20-student minimum per class. Added session length, sequential same-day scheduling, 20-30 class sizing and examples. Whole-grade card explains class rotation, individual designs and quotation inputs. Existing prices unchanged. Local only.

Pricing content simplified: cards retain differentiated rates, starting totals, class scope and examples. Shared 20-30 sizing, session timing, scheduling and separate minimum billing moved below cards. Existing included-materials/firing/return section retained. Local only.

Teacher inspiration section: six suggested school occasions added above seasonal planner: post-exam reward, activity day, letter and family keepsake, appreciation, graduation/moving up, class community/after-school. Each gives purpose, project suggestion, timing and inquiry CTA. Ideas are suggestions, not official school events or booked programs. Whitelisted idea query prefills editable inquiry notes and is included in existing email message. Finished-piece return timing must be agreed. Local only.

Teacher idea styling: rounded speech-bubble cards with alternating small tails, subtle rose/taupe backgrounds, circular line icons, highlighted project suggestions and compact pill links. Responsive spacing and reduced-motion handling retained. Local only.


Occasion illustrations: built-in imagegen generated and alpha-edited a six-vignette sheet referencing grade-students-v1.png. Original sheet saved as teacher-ideas-sheet-v1.png; six transparent cell exports teacher-idea-0..5-v1.png. Art covers post-exam, activity day, family gift, teacher thanks, graduation and friendship; small contained images sit at bottom right inside each bubble beside inquiry link. Source transparency verified; empty background pixels have alpha 0. Local only.

Audience expansion: public-facing school/group copy now explicitly welcomes private/faith schools, church groups, community/youth organizations, associations/nonprofits, hospital activity programs and company gatherings. Inquiry includes organization type and adult/participant wording, included in existing email message. School package rates remain school-class rates; other groups get tailored proposals. NYCPS calendar is identified as school reference; non-school event dates require inquiry. Local only.

Compact planner: moved project title and visit/return ranges above controls; collapsed descriptive/source notes; reduced cell heights and spacing; retained 7-column week view on mobile rather than 7 tall stacked rows. Day detail is compact and replaces generic inquiry CTA with date-specific CTA when a date is chosen. All calendar IDs and functions retained. Fits typical screens more closely, without fixed-height clipping or internal scrolling; expanded notes and very small screens can require page scrolling. Local only.

Sticky personal booking bar: added individual/family studio booking route above navigation on public program pages. Link reuses existing main-site booking provider https://waitwhile.com/locations/ellysartcraft found in bundled source, opens a new tab. No booking submitted. Header height measured for calendar sticky/scroll offsets; responsive short copy on mobile. Local only.

Personal/friends/family bar revised at owner request: CTA now Visit Our Studio Website, href=/, same-tab main homepage navigation; direct booking-provider link removed.
