USE careconnect;

-- Keep the real senior profile ID in u_check_in and enforce its relationship.
ALTER TABLE u_check_in
  MODIFY COLUMN u_senior CHAR(32) NOT NULL;

DROP PROCEDURE IF EXISTS ensure_check_in_senior_link;

DELIMITER //
CREATE PROCEDURE ensure_check_in_senior_link()
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.statistics
    WHERE table_schema = DATABASE()
      AND table_name = 'u_check_in'
      AND index_name = 'idx_check_in_senior'
  ) THEN
    CREATE INDEX idx_check_in_senior ON u_check_in (u_senior);
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.table_constraints
    WHERE constraint_schema = DATABASE()
      AND table_name = 'u_check_in'
      AND constraint_name = 'fk_check_in_senior'
      AND constraint_type = 'FOREIGN KEY'
  ) THEN
    ALTER TABLE u_check_in
      ADD CONSTRAINT fk_check_in_senior
      FOREIGN KEY (u_senior)
      REFERENCES u_senior_profiles (sys_id)
      ON UPDATE CASCADE
      ON DELETE CASCADE;
  END IF;
END//
DELIMITER ;

CALL ensure_check_in_senior_link();
DROP PROCEDURE ensure_check_in_senior_link;

-- Workbench-friendly view: u_senior displays the person's name, while the
-- original relationship value remains available as u_senior_sys_id.
CREATE OR REPLACE VIEW v_check_in_details AS
SELECT
  check_in.sys_id,
  check_in.sys_created_on,
  check_in.sys_updated_on,
  profile.u_full_name AS u_senior,
  check_in.u_senior AS u_senior_sys_id,
  profile.u_email AS u_senior_email,
  check_in.u_status,
  check_in.u_last_check_in,
  check_in.u_check_in_window,
  check_in.u_check_in_date,
  check_in.u_notification_sent
FROM u_check_in AS check_in
JOIN u_senior_profiles AS profile
  ON profile.sys_id = check_in.u_senior;

SELECT *
FROM v_check_in_details
ORDER BY sys_created_on DESC;
