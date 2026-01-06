/*
  Warnings:

  - You are about to drop the `EventBooking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventSchedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PerformanceEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Place` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlaceCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlaceReview` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReelsContent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventBooking" DROP CONSTRAINT "EventBooking_eventScheduleId_fkey";

-- DropForeignKey
ALTER TABLE "EventBooking" DROP CONSTRAINT "EventBooking_performanceEventId_fkey";

-- DropForeignKey
ALTER TABLE "EventBooking" DROP CONSTRAINT "EventBooking_userId_fkey";

-- DropForeignKey
ALTER TABLE "EventSchedule" DROP CONSTRAINT "EventSchedule_performanceEventId_fkey";

-- DropForeignKey
ALTER TABLE "PerformanceEvent" DROP CONSTRAINT "PerformanceEvent_placeId_fkey";

-- DropForeignKey
ALTER TABLE "Place" DROP CONSTRAINT "Place_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Place" DROP CONSTRAINT "Place_placeCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "PlaceReview" DROP CONSTRAINT "PlaceReview_placeId_fkey";

-- DropForeignKey
ALTER TABLE "PlaceReview" DROP CONSTRAINT "PlaceReview_userId_fkey";

-- DropForeignKey
ALTER TABLE "ReelsContent" DROP CONSTRAINT "ReelsContent_placeId_fkey";

-- DropForeignKey
ALTER TABLE "ReelsContent" DROP CONSTRAINT "ReelsContent_userId_fkey";

-- DropTable
DROP TABLE "EventBooking";

-- DropTable
DROP TABLE "EventSchedule";

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "PerformanceEvent";

-- DropTable
DROP TABLE "Place";

-- DropTable
DROP TABLE "PlaceCategory";

-- DropTable
DROP TABLE "PlaceReview";

-- DropTable
DROP TABLE "ReelsContent";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "event_booking" (
    "event_booking_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "performance_event_id" INTEGER,
    "total_price" DECIMAL(12,2),
    "quantity" INTEGER,
    "status" VARCHAR(50),

    CONSTRAINT "event_booking_pkey" PRIMARY KEY ("event_booking_id")
);

-- CreateTable
CREATE TABLE "event_schedule" (
    "event_schedule_id" SERIAL NOT NULL,
    "performance_event_id" INTEGER,
    "date" DATE,
    "start_time" TIME(6),
    "end_time" TIME(6),
    "price" DECIMAL(12,2),

    CONSTRAINT "event_schedule_pkey" PRIMARY KEY ("event_schedule_id")
);

-- CreateTable
CREATE TABLE "location" (
    "location_id" SERIAL NOT NULL,
    "city_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "performance_event" (
    "performance_event_id" SERIAL NOT NULL,
    "place_id" INTEGER,
    "title" VARCHAR(255),
    "event_description" TEXT,
    "venue_address" TEXT,
    "gmaps_link" TEXT,
    "image_url" TEXT,

    CONSTRAINT "performance_event_pkey" PRIMARY KEY ("performance_event_id")
);

-- CreateTable
CREATE TABLE "place" (
    "place_id" SERIAL NOT NULL,
    "place_category_id" INTEGER,
    "location_id" INTEGER,
    "place_name" VARCHAR(255),
    "place_description" TEXT,
    "address" TEXT,
    "gmaps_link" TEXT,
    "image_url" TEXT,
    "rating_avg" DECIMAL(3,2),

    CONSTRAINT "place_pkey" PRIMARY KEY ("place_id")
);

-- CreateTable
CREATE TABLE "place_category" (
    "place_category_id" SERIAL NOT NULL,
    "category_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "place_category_pkey" PRIMARY KEY ("place_category_id")
);

-- CreateTable
CREATE TABLE "place_review" (
    "review_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "place_id" INTEGER,
    "rating" INTEGER,
    "comment" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "place_review_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "reels_content" (
    "content_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "place_id" INTEGER,
    "content_url" TEXT,
    "caption" VARCHAR(150),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reels_content_pkey" PRIMARY KEY ("content_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "selected_location" INTEGER,
    "name" VARCHAR(100),
    "username" VARCHAR(100),
    "email" VARCHAR(150),
    "password" VARCHAR(255),
    "phone_number" VARCHAR(20),
    "profile_photo" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "event_booking" ADD CONSTRAINT "event_booking_performance_event_id_fkey" FOREIGN KEY ("performance_event_id") REFERENCES "performance_event"("performance_event_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "event_booking" ADD CONSTRAINT "event_booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "event_schedule" ADD CONSTRAINT "event_schedule_performance_event_id_fkey" FOREIGN KEY ("performance_event_id") REFERENCES "performance_event"("performance_event_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "performance_event" ADD CONSTRAINT "performance_event_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "place"("place_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "place" ADD CONSTRAINT "place_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("location_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "place" ADD CONSTRAINT "place_place_category_id_fkey" FOREIGN KEY ("place_category_id") REFERENCES "place_category"("place_category_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "place_review" ADD CONSTRAINT "place_review_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "place"("place_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "place_review" ADD CONSTRAINT "place_review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reels_content" ADD CONSTRAINT "reels_content_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "place"("place_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reels_content" ADD CONSTRAINT "reels_content_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_selected_location_fkey" FOREIGN KEY ("selected_location") REFERENCES "location"("location_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
