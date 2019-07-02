\c rent_db;

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

CREATE DATABASE rent_db_test;

\c rent_db_test;

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