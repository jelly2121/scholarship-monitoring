// Supabase configuration.
// Replace these values after creating your Supabase project.
const SUPABASE_URL = "https://ngpxsucdmyxssdezrxeo.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_w2Z1DSrEEJWAlUp3ZxGmqA_4wyJxojr";

// Demo/local data is used until Supabase credentials are configured.
const USE_SUPABASE = SUPABASE_URL !== "YOUR_SUPABASE_URL";

const demoData = {
  students: [
    {student_id:"2026-001",full_name:"Juan Dela Cruz",course:"BS Information Technology",year_level:"2nd Year",email:"juan@example.com",contact:"09171234567",status:"Active"},
    {student_id:"2026-002",full_name:"Maria Santos",course:"BS Education",year_level:"3rd Year",email:"maria@example.com",contact:"09181234567",status:"Active"},
    {student_id:"2026-003",full_name:"Mark Reyes",course:"BS Business Administration",year_level:"1st Year",email:"mark@example.com",contact:"09191234567",status:"Active"}
  ],
  scholarships: [
    {scholarship_name:"University Scholarship",provider:"School Scholarship Office",amount:10000,deadline:"2026-10-30",status:"Active"},
    {scholarship_name:"CHED Scholarship",provider:"CHED",amount:20000,deadline:"2026-11-15",status:"Active"}
  ],
  requirements: [
    {student:"Juan Dela Cruz",requirement_name:"Certificate of Enrollment",submission_date:"2026-09-10",submission_status:"Submitted",remarks:"Verified"},
    {student:"Maria Santos",requirement_name:"Latest Grades",submission_date:"",submission_status:"Pending",remarks:"Awaiting submission"},
    {student:"Mark Reyes",requirement_name:"Income Certificate",submission_date:"",submission_status:"Missing",remarks:"Please submit"}
  ],
  compliance: [
    {student:"Juan Dela Cruz",semester:"1st Semester",school_year:"2026-2027",gwa:1.75,attendance:96,compliance_status:"Compliant",remarks:"Meets requirements"},
    {student:"Maria Santos",semester:"1st Semester",school_year:"2026-2027",gwa:2.00,attendance:92,compliance_status:"Compliant",remarks:"Meets requirements"},
    {student:"Mark Reyes",semester:"1st Semester",school_year:"2026-2027",gwa:2.75,attendance:84,compliance_status:"Pending",remarks:"Needs academic review"}
  ]
};

function getData(key){ return JSON.parse(localStorage.getItem("scholar_"+key) || "null") || demoData[key] || []; }
function saveData(key,data){ localStorage.setItem("scholar_"+key, JSON.stringify(data)); }
function statusBadge(value){ return `<span class="status ${String(value).toLowerCase()}">${value}</span>`; }
function setupLogout(){
  const btn=document.getElementById("logoutBtn");
  if(btn) btn.onclick=()=>{sessionStorage.removeItem("loggedIn");location.href="index.html";};
}
document.addEventListener("DOMContentLoaded",setupLogout);
