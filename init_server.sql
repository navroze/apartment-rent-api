-- Database: rents

-- DROP DATABASE rents;

-- CREATE DATABASE rent_db
--     WITH 
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'English_United States.1252'
--     LC_CTYPE = 'English_United States.1252'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1;

DROP TABLE IF EXISTS "public"."rents";
CREATE TABLE "public"."rents" (
	"apartment_id" varchar(200) NOT NULL PRIMARY KEY,
	"zip_code" varchar(10), 
    "apartment_type" varchar(30),
    "apartment_size" SMALLINT,
    "rent" INTEGER,
    "deleted" BOOLEAN 
);

CREATE INDEX idx_aptsize_zipcode 
ON rents (apartment_size, zip_code);

TRUNCATE rents;