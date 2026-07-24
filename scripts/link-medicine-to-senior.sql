USE careconnect;

-- A senior may have many medicines, but every medicine must belong to one
-- valid senior profile.
ALTER TABLE u_medicine
  MODIFY COLUMN u_senior CHAR(32) NOT NULL;

ALTER TABLE u_senior_profiles
  MODIFY COLUMN u_user CHAR(32) NOT NULL;

ALTER TABLE u_caregiver_profiles
  MODIFY COLUMN u_user CHAR(32) NOT NULL,
  MODIFY COLUMN u_senior CHAR(32) NOT NULL;

DROP PROCEDURE IF EXISTS ensure_medicine_senior_link;

DELIMITER //
CREATE PROCEDURE ensure_medicine_senior_link()
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.statistics
    WHERE table_schema = DATABASE()
      AND table_name = 'u_medicine'
      AND index_name = 'idx_medicine_senior'
  ) THEN
    CREATE INDEX idx_medicine_senior ON u_medicine (u_senior);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.statistics
    WHERE table_schema = DATABASE()
      AND table_name = 'u_senior_profiles'
      AND index_name = 'idx_profile_user'
  ) THEN
    CREATE INDEX idx_profile_user ON u_senior_profiles (u_user);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.statistics
    WHERE table_schema = DATABASE()
      AND table_name = 'u_caregiver_profiles'
      AND index_name = 'idx_connection_user'
  ) THEN
    CREATE INDEX idx_connection_user ON u_caregiver_profiles (u_user);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.statistics
    WHERE table_schema = DATABASE()
      AND table_name = 'u_caregiver_profiles'
      AND index_name = 'idx_connection_senior'
  ) THEN
    CREATE INDEX idx_connection_senior ON u_caregiver_profiles (u_senior);
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.table_constraints
    WHERE constraint_schema = DATABASE()
      AND table_name = 'u_medicine'
      AND constraint_name = 'fk_medicine_senior'
      AND constraint_type = 'FOREIGN KEY'
  ) THEN
    ALTER TABLE u_medicine
      ADD CONSTRAINT fk_medicine_senior
      FOREIGN KEY (u_senior)
      REFERENCES u_senior_profiles (sys_id)
      ON UPDATE CASCADE
      ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_schema = DATABASE()
      AND table_name = 'u_senior_profiles'
      AND constraint_name = 'fk_profile_user'
      AND constraint_type = 'FOREIGN KEY'
  ) THEN
    ALTER TABLE u_senior_profiles
      ADD CONSTRAINT fk_profile_user
      FOREIGN KEY (u_user)
      REFERENCES u_user (sys_id)
      ON UPDATE CASCADE
      ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_schema = DATABASE()
      AND table_name = 'u_caregiver_profiles'
      AND constraint_name = 'fk_connection_user'
      AND constraint_type = 'FOREIGN KEY'
  ) THEN
    ALTER TABLE u_caregiver_profiles
      ADD CONSTRAINT fk_connection_user
      FOREIGN KEY (u_user)
      REFERENCES u_user (sys_id)
      ON UPDATE CASCADE
      ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_schema = DATABASE()
      AND table_name = 'u_caregiver_profiles'
      AND constraint_name = 'fk_connection_senior'
      AND constraint_type = 'FOREIGN KEY'
  ) THEN
    ALTER TABLE u_caregiver_profiles
      ADD CONSTRAINT fk_connection_senior
      FOREIGN KEY (u_senior)
      REFERENCES u_senior_profiles (sys_id)
      ON UPDATE CASCADE
      ON DELETE CASCADE;
  END IF;
END//
DELIMITER ;

CALL ensure_medicine_senior_link();
DROP PROCEDURE ensure_medicine_senior_link;

-- Verify the shared record used by the caregiver and senior screens.
SELECT
  profile.u_full_name AS senior_name,
  medicine.sys_id AS medicine_id,
  medicine.u_current_medication AS medicine,
  medicine.u_dosage AS dosage,
  medicine.u_time AS reminder_time,
  medicine.u_frequency AS frequency,
  medicine.u_status AS medication_status
FROM u_senior_profiles AS profile
JOIN u_medicine AS medicine
  ON medicine.u_senior = profile.sys_id
ORDER BY profile.u_full_name, medicine.u_time;
