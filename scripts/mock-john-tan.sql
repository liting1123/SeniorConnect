USE careconnect;

-- Add profile fields that did not exist in the initial demo record.
-- The helper makes the script safe to run more than once.
DROP PROCEDURE IF EXISTS add_profile_column_if_missing;

DELIMITER //
CREATE PROCEDURE add_profile_column_if_missing(
  IN column_name_value VARCHAR(64)
)
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = DATABASE()
      AND table_name = 'u_senior_profiles'
      AND column_name = column_name_value
  ) THEN
    SET @alter_sql = CONCAT(
      'ALTER TABLE u_senior_profiles ADD COLUMN `',
      REPLACE(column_name_value, '`', '``'),
      '` TEXT NULL'
    );
    PREPARE alter_statement FROM @alter_sql;
    EXECUTE alter_statement;
    DEALLOCATE PREPARE alter_statement;
  END IF;
END//
DELIMITER ;

CALL add_profile_column_if_missing('u_date_of_birth');
CALL add_profile_column_if_missing('u_gender');
CALL add_profile_column_if_missing('u_address');
CALL add_profile_column_if_missing('u_emergency_contact_name');
CALL add_profile_column_if_missing('u_emergency_contact_phone');
CALL add_profile_column_if_missing('u_blood_type');
CALL add_profile_column_if_missing('u_allergies');
CALL add_profile_column_if_missing('u_medical_conditions');

DROP PROCEDURE add_profile_column_if_missing;

SET @john_user_id = (
  SELECT sys_id
  FROM u_user
  WHERE LOWER(u_email) = 'john@gmail.com'
  LIMIT 1
);

SET @john_profile_id = (
  SELECT sys_id
  FROM u_senior_profiles
  WHERE u_user = @john_user_id
  LIMIT 1
);

START TRANSACTION;

UPDATE u_user
SET
  u_full_name = 'John Tan',
  u_email = 'john@gmail.com',
  u_username = 'john@gmail.com',
  u_role = 'elderly',
  u_active = 'true',
  sys_updated_on = NOW()
WHERE sys_id = @john_user_id;

UPDATE u_senior_profiles
SET
  u_full_name = 'John Tan',
  u_email = 'john@gmail.com',
  u_phone = '90000001',
  u_date_of_birth = '1948-05-12',
  u_gender = 'Male',
  u_address = '123 Ang Mo Kio Avenue 3, Singapore 560123',
  u_location_zones = 'Home - Ang Mo Kio',
  u_emergency_contact_name = 'Mary Tan',
  u_emergency_contact_phone = '91234567',
  u_blood_type = 'O+',
  u_allergies = 'Penicillin',
  u_medical_conditions = 'Hypertension, Type 2 Diabetes',
  sys_updated_on = NOW()
WHERE sys_id = @john_profile_id;

UPDATE u_caregiver_profiles
SET
  u_relationship = 'Next of Kin',
  u_is_nok = 'true',
  sys_updated_on = NOW()
WHERE u_senior = @john_profile_id;

UPDATE u_medicine
SET
  u_current_medication = 'Metformin',
  u_dosage = '500 mg',
  u_time = '08:00',
  u_frequency = 'Once daily after breakfast',
  u_status = 'Pending',
  u_notes = 'Take with food. Monitor blood glucose.',
  u_is_extra = 'true',
  sys_updated_on = NOW()
WHERE u_senior = @john_profile_id
  AND u_current_medication = 'Local Test Medicine';

SET @updated_medicine_rows = ROW_COUNT();

INSERT INTO u_medicine (
  sys_id,
  sys_created_on,
  sys_updated_on,
  u_senior,
  u_current_medication,
  u_dosage,
  u_time,
  u_frequency,
  u_status,
  u_notes,
  u_is_extra
)
SELECT
  REPLACE(UUID(), '-', ''),
  NOW(),
  NOW(),
  @john_profile_id,
  'Metformin',
  '500 mg',
  '08:00',
  'Once daily after breakfast',
  'Pending',
  'Take with food. Monitor blood glucose.',
  'true'
WHERE @updated_medicine_rows = 0
  AND @john_profile_id IS NOT NULL;

COMMIT;

-- Verification result shown after running the script in MySQL Workbench.
SELECT
  profile.u_full_name AS full_name,
  profile.u_date_of_birth AS date_of_birth,
  profile.u_gender AS gender,
  connection.u_relationship AS relationship,
  profile.u_address AS address,
  profile.u_phone AS phone_number,
  profile.u_email AS email,
  profile.u_emergency_contact_name AS emergency_contact_name,
  profile.u_emergency_contact_phone AS emergency_contact_phone,
  profile.u_blood_type AS blood_type,
  profile.u_allergies AS allergies,
  profile.u_medical_conditions AS medical_conditions,
  medicine.u_current_medication AS current_medication,
  medicine.u_dosage AS medication_dosage,
  medicine.u_frequency AS medication_frequency
FROM u_senior_profiles AS profile
LEFT JOIN u_caregiver_profiles AS connection
  ON connection.u_senior = profile.sys_id
LEFT JOIN u_medicine AS medicine
  ON medicine.u_senior = profile.sys_id
WHERE profile.sys_id = @john_profile_id;
