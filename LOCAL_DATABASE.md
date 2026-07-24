# Legacy SQLite database mode

The backend can replace the ServiceNow Table API with a local SQLite database.
The project now uses MySQL by default; see `MYSQL_DATABASE.md`.
No additional package is required with Node.js 22.

## Enable local mode

Set this in `.env`:

```env
DATABASE_MODE=local
```

Records are stored in `.careconnect-local.sqlite`.

The database includes local equivalents of every table used by the app,
including users, senior profiles, caregiver connections, SOS alerts,
appointments, medicines, verification codes, check-ins, and sensor activity.

## Create local demo accounts

Run:

```powershell
npm run db:seed
```

Defaults:

```text
Senior: senior@example.com
Caregiver: caregiver@example.com
Password for both: Demo1234!
```

Or provide your own credentials:

```powershell
npm run db:seed -- senior@example.com SeniorPassword caregiver@example.com CaregiverPassword
```

Then start the application with `npm run dev`.

## Return to ServiceNow

Change `.env` back to:

```env
DATABASE_MODE=servicenow
```

Local and ServiceNow records are separate. Switching modes does not delete
either database. Existing ServiceNow records can only be imported after the
instance is available again.
