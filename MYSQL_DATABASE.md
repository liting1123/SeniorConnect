# MySQL database

CareConnect is configured to use MySQL:

```env
DATABASE_MODE=mysql
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_DATABASE=careconnect
MYSQL_USER=careconnect
```

`npm run dev` starts the project-managed MySQL Server automatically when port
3306 is not already available.

## MySQL Workbench connection

Create a Standard TCP/IP connection:

```text
Connection Name: CareConnect Local
Hostname: 127.0.0.1
Port: 3306
Username: careconnect
Default Schema: careconnect
```

Use the `MYSQL_PASSWORD` value from `.env` when Workbench asks for the
password.

After connecting, refresh **SCHEMAS**, expand `careconnect`, and expand
**Tables**. Tables are created as the application uses them, including:

- `u_user`
- `u_senior_profiles`
- `u_caregiver_profiles`
- `u_sos_alert`
- `u_medicine`
- `u_appointment`
- `u_check_in`

## Migrate legacy SQLite records

The migration is safe to rerun:

```powershell
npm run db:migrate:mysql
```

The old `.careconnect-local.sqlite` file is retained as a backup.
