const studentModal=document.getElementById("studentModal");
const renderStudents=()=>{
 const students=getData("students"), q=(document.getElementById("studentSearch").value||"").toLowerCase();
 document.getElementById("studentTable").innerHTML=students.filter(s=>(s.student_id+" "+s.full_name+" "+s.course).toLowerCase().includes(q)).map((s,i)=>`<tr><td>${s.student_id}</td><td>${s.full_name}</td><td>${s.course}</td><td>${s.year_level}</td><td>${s.email}</td><td>${statusBadge(s.status)}</td><td><button class="btn small" onclick="deleteStudent(${i})">Delete</button></td></tr>`).join("");
};
function deleteStudent(i){if(confirm("Delete this student?")){let d=getData("students");d.splice(i,1);saveData("students",d);renderStudents();}}
document.getElementById("addStudentBtn").onclick=()=>studentModal.classList.add("show");
document.getElementById("closeModal").onclick=()=>studentModal.classList.remove("show");
document.getElementById("studentSearch").oninput=renderStudents;
document.getElementById("studentForm").onsubmit=e=>{e.preventDefault();let d=getData("students");d.push({student_id:studentId.value,full_name:fullName.value,course:course.value,year_level:yearLevel.value,email:studentEmail.value,contact:contact.value,status:studentStatus.value});saveData("students",d);e.target.reset();studentModal.classList.remove("show");renderStudents();};
renderStudents();