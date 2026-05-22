# ServiceNow Setup

Your React app does not call ServiceNow directly. It calls the local Node API, and the Node API calls ServiceNow.

```text
React app -> /api/users/... -> server/index.mjs -> ServiceNow Table API
```

## 1. Create The ServiceNow Table

In your ServiceNow instance:

```text
https://dev201489.service-now.com
```

Create a custom table for users. A suggested table name is:

```text
u_senior_connect_user
```

Add these fields:

| Label | Column name | Type |
| --- | --- | --- |
| Email | `u_email` | String or Email |
| Name | `u_name` | String |
| Points | `u_points` | Integer or String |
| Last Check In At | `u_last_check_in_at` | Date/Time |

If ServiceNow creates a different table name, copy that exact table name into `.env`.

## 2. Update `.env`

Open `.env` and replace:

```env
SERVICE_NOW_PASSWORD=put_your_servicenow_password_here
```

with your real ServiceNow password.

Also confirm this line matches your real ServiceNow table name:

```env
SERVICE_NOW_TABLE=u_senior_connect_user
```

## 3. Run The Project

Use:

```powershell
npm run dev
```

This starts:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:3001
```

## 4. Test The Link

After logging in to the app, press the daily check-in button. The app should create or update a record in your ServiceNow table.

Check-in points are only awarded twice per Singapore day:

- Morning: 5:00 AM-8:59 AM, +5 points
- Evening: 4:00 PM-5:59 PM, +5 points

The `u_last_check_in_at` field is required because the backend uses it to prevent duplicate rewards in the same time window.

The backend uses these ServiceNow API actions:

```text
GET   /api/now/table/{table}/{sys_id}
POST  /api/now/table/{table}
PATCH /api/now/table/{table}/{sys_id}
```

## Common Problems

If the app still uses local points, check the browser console and backend terminal.

Common causes:

- `.env` password still says `put_your_servicenow_password_here`
- `SERVICE_NOW_TABLE` does not match the real table name
- ServiceNow table field names are different
- ServiceNow table does not allow web service/API access
- ServiceNow admin password is wrong or expired
