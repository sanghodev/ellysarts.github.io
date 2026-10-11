(() => {
const form=document.getElementById('school-inquiry');if(!form)return;
const status=document.getElementById('form-status'),button=document.getElementById('send-inquiry'),context=document.getElementById('request-context'),params=new URLSearchParams(location.search);
const field=name=>form.elements.namedItem(name);
const nyDay=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const newID=()=> 'EC-'+nyDay().replaceAll('-','')+'-'+crypto.randomUUID().slice(0,8);
let inquiryID=newID(),busy=false,lastSend=0;
const planNames={one:'One class',two:'Two classes',three:'Three classes','whole-grade':'Whole-grade project'},classCounts={one:'1',two:'2',three:'3','whole-grade':'Other'};
const ideas={'post-exam':'After the Exams','activity-day':'Make It an Activity Day','family-gift':'A Letter & a Keepsake','thank-you':'A Thank-You That Lasts','next-chapter':'Celebrate Their Next Chapter',belonging:'Our Class, Our Community'};
const plan=Object.hasOwn(planNames,params.get('plan'))?params.get('plan'):null,idea=Object.hasOwn(ideas,params.get('idea'))?params.get('idea'):null;
const requested=params.get('visit')||'';
if(/^2027-\d{2}-\d{2}$/.test(requested))field('preferred_visit_date').value=requested;
const visitDate=field('preferred_visit_date'),returnDate=field('needed_by_date');
let suggestedReturn='';
const twoWeeksAfter=value=>{const date=new Date(value+'T12:00:00');date.setDate(date.getDate()+14);return [date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');};
function syncReturnDate(){const earliest=visitDate.value?twoWeeksAfter(visitDate.value):'';returnDate.min=earliest;returnDate.setCustomValidity('');if(earliest&&(!returnDate.value||returnDate.value===suggestedReturn||returnDate.value<earliest))returnDate.value=earliest;else if(!earliest&&returnDate.value===suggestedReturn)returnDate.value='';suggestedReturn=earliest;}
function validateReturnDate(){returnDate.setCustomValidity(visitDate.value&&returnDate.value&&returnDate.value<twoWeeksAfter(visitDate.value)?'Please allow at least two weeks after your requested visit date for kiln firing and return delivery.':'');}
syncReturnDate();visitDate.addEventListener('change',syncReturnDate);returnDate.addEventListener('input',validateReturnDate);
form.addEventListener('reset',()=>{returnDate.min='';returnDate.setCustomValidity('');suggestedReturn='';});
const readable=s=>new Date(s+'T12:00:00').toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
if(field('preferred_visit_date').value)field('timing').value=readable(field('preferred_visit_date').value);
if(plan)field('estimated_classes').value=classCounts[plan];
if(params.get('organizer')==='pta'){field('organization_type').value='PTA / PA';document.getElementById('request-more').open=true;}
if(plan==='whole-grade')field('notes').value='Whole-grade project: please help us plan sessions for the entire grade.';
if(idea)field('notes').value='School activity idea: '+ideas[idea]+'. Please help us plan a ceramic painting project around this occasion.';
function showContext(){const selected=field('occasion_id').selectedOptions[0],parts=[];if(plan)parts.push(planNames[plan]);if(idea)parts.push(ideas[idea]);if(selected&&selected.value!=='other')parts.push(selected.textContent);if(field('preferred_visit_date').value)parts.push('Requested visit: '+readable(field('preferred_visit_date').value));context.hidden=!parts.length;context.textContent=parts.length?'Your planning interest: '+parts.join(' · ')+'. You can edit dates in the optional details. This is not a reservation.':'';}
if([...field('occasion_id').options].some(o=>o.value===params.get('occasion')))field('occasion_id').value=params.get('occasion');showContext();
SchoolLocal.data().then(data=>{const select=field('occasion_id'),current=select.value;select.replaceChildren(new Option('Other / Not sure yet','other'));for(const event of data.events.filter(e=>e.visibility!=='archived'))select.add(new Option(event.name,event.id));if([...select.options].some(o=>o.value===current))select.value=current;showContext();}).catch(()=>{});
for(const el of [field('preferred_visit_date'),field('occasion_id')])el.addEventListener('change',showContext);
form.addEventListener('submit',async event=>{event.preventDefault();validateReturnDate();if(busy||!form.checkValidity()){if(!form.checkValidity())document.getElementById('request-more').open=true;form.reportValidity();return;}
const localDate=field('preferred_visit_date').value,blocks=SchoolLocal.read().blocks||[];
if(localDate&&([0,6].includes(new Date(localDate+'T12:00:00').getDay())||SchoolLocal.closedWeekday(localDate))){document.getElementById('request-more').open=true;status.textContent='Visiting classes are not available on this day. Choose an open weekday or leave the date blank so we can suggest one.';field('preferred_visit_date').focus();return;}
if(localDate&&blocks.some(b=>b.date===localDate&&(b.status!=='hold'||b.expires>=nyDay()))){document.getElementById('request-more').open=true;status.textContent='This date is no longer available. Choose another requested date or leave it blank so we can suggest a schedule.';field('preferred_visit_date').focus();return;}
if(field('website').value){status.textContent='We could not process this inquiry. Please contact us directly.';return;}
if(Date.now()-lastSend<15000){status.textContent='Please wait briefly before sending again. If a previous request timed out, it may already have been received.';return;}
const data=new FormData(form),labels={organization:'School / Organization',user_name:'Contact',user_email:'Email',location:'City / Neighborhood / ZIP',group_summary:'Grades / Ages / Approximate Group Size',timing:'Preferred Timing',phone:'Phone',planning_budget:'Planning Budget',proposal_needed_by:'Proposal Needed By',organization_type:'Organization Type',estimated_classes:'Classes / Groups',preferred_visit_date:'Requested Visit Date',needed_by_date:'Finished Pieces Needed By',notes:'Planning Notes'};
const occasionName=field('occasion_id').selectedOptions[0]?.textContent||'Other / Not sure yet';
const message='Elly’s Arts & Crafts — School & Group Programs\nCreate & Celebrate\nInquiry reference: '+inquiryID+'\nOccasion: '+occasionName+'\nPlan: '+(plan?planNames[plan]:'Not specified')+'\n\n'+Object.entries(labels).map(([key,label])=>label+': '+(String(data.get(key)||'').trim()||'Not specified')).join('\n')+'\n\nThis is an inquiry, not a confirmed reservation.';
const cfg=window.SCHOOL_EMAIL_CONFIG;if(!cfg?.publicKey){status.textContent='Online inquiries are unavailable. Please email ellysartscrafts@gmail.com.';return;}
busy=true;lastSend=Date.now();button.disabled=true;button.textContent='Sending your inquiry…';status.textContent='Sending to Elly’s…';const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),20000);
try{const response=await fetch('https://api.emailjs.com/api/v1.0/email/send',{method:'POST',headers:{'Content-Type':'application/json'},signal:controller.signal,body:JSON.stringify({service_id:cfg.serviceID,template_id:cfg.templateID,user_id:cfg.publicKey,template_params:{user_name:String(data.get('user_name')).trim(),user_email:String(data.get('user_email')).trim(),subject:'School & Group Program Inquiry — '+String(data.get('organization')).trim(),message}})});if(!response.ok)throw Error('send_failed');status.textContent='Your inquiry has been sent. Reference: '+inquiryID+'. Your visit is not booked yet. We’ll review your request and reply with a proposal.';form.reset();context.hidden=true;document.getElementById('request-more').open=false;inquiryID=newID();}
catch(error){status.textContent=error.name==='AbortError'?'We could not confirm whether your inquiry was sent. Reference: '+inquiryID+'. Please email or call before trying again to avoid duplicates.':'We couldn’t send your inquiry. Your details are still here. Please try again or email ellysartscrafts@gmail.com.';}
finally{clearTimeout(timeout);busy=false;button.disabled=false;button.textContent='Request Dates & a Proposal →';}
});
})();
