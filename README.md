# Student Scholarship Monitoring and Academic Compliance System

## Technology
- HTML
- CSS
- JavaScript
- Supabase
- GitHub Pages

## Demo Login
Email: admin@example.com
Password: admin123

## Run locally
Open `index.html` in a browser, or use VS Code Live Server.

## Supabase setup
1. Create a Supabase project.
2. Open SQL Editor.
3. Run `supabase.sql`.
4. Copy your Project URL and anon public key.
5. Put them in `js/supabase.js`.

## GitHub Pages
1. Create a GitHub repository.
2. Upload all files and folders.
3. Go to Settings > Pages.
4. Select Deploy from branch.
5. Select `main` and `/root`.
6. Save.
7. Open the generated GitHub Pages URL.

## System modules
- Authentication prototype
- Dashboard
- Student Management
- Scholarship Management
- Requirements Monitoring
- Academic Compliance
- Reports

## Systems Analysis
Actors:
- Scholarship Administrator
- Scholarship Coordinator
- Student

Main use cases:
- Login
- Manage Students
- Manage Scholarships
- Monitor Requirements
- Monitor Academic Compliance
- Generate Reports
- View Scholarship Status

NOTE:
The included login is a classroom/demo frontend login. For a real deployment, replace it with Supabase Auth and secure Row Level Security policies.
