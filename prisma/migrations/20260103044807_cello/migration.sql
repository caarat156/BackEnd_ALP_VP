-- CreateTable
CREATE TABLE "PlaceCategory" (
    "placeCategoryId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PlaceCategory_pkey" PRIMARY KEY ("placeCategoryId")
);

-- CreateTable
CREATE TABLE "Location" (
    "locationId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("locationId")
);

-- CreateTable
CREATE TABLE "PlaceReview" (
    "placeReviewId" SERIAL NOT NULL,
    "placeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "PlaceReview_pkey" PRIMARY KEY ("placeReviewId")
);

-- CreateTable
CREATE TABLE "ReelsContent" (
    "reelsContentId" SERIAL NOT NULL,
    "placeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "ReelsContent_pkey" PRIMARY KEY ("reelsContentId")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "selectedLocation" INTEGER,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "profilePhoto" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Place" (
    "placeId" SERIAL NOT NULL,
    "placeCategoryId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,
    "placeName" TEXT NOT NULL,
    "placeDescription" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "gmaksLink" TEXT,
    "imageUrl" TEXT,
    "ratingAvg" DOUBLE PRECISION DEFAULT 0,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("placeId")
);

-- CreateTable
CREATE TABLE "PerformanceEvent" (
    "performanceEventId" SERIAL NOT NULL,
    "placeId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "eventDescription" TEXT NOT NULL,
    "venueAddress" TEXT NOT NULL,
    "gmapsLink" TEXT,
    "imageUrl" TEXT,

    CONSTRAINT "PerformanceEvent_pkey" PRIMARY KEY ("performanceEventId")
);

-- CreateTable
CREATE TABLE "EventSchedule" (
    "eventScheduleId" SERIAL NOT NULL,
    "performanceEventId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "EventSchedule_pkey" PRIMARY KEY ("eventScheduleId")
);

-- CreateTable
CREATE TABLE "EventBooking" (
    "eventBookingId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "performanceEventId" INTEGER NOT NULL,
    "eventScheduleId" INTEGER NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "EventBooking_pkey" PRIMARY KEY ("eventBookingId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "PlaceReview" ADD CONSTRAINT "PlaceReview_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("placeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaceReview" ADD CONSTRAINT "PlaceReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReelsContent" ADD CONSTRAINT "ReelsContent_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("placeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReelsContent" ADD CONSTRAINT "ReelsContent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_placeCategoryId_fkey" FOREIGN KEY ("placeCategoryId") REFERENCES "PlaceCategory"("placeCategoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("locationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceEvent" ADD CONSTRAINT "PerformanceEvent_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("placeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSchedule" ADD CONSTRAINT "EventSchedule_performanceEventId_fkey" FOREIGN KEY ("performanceEventId") REFERENCES "PerformanceEvent"("performanceEventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventBooking" ADD CONSTRAINT "EventBooking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventBooking" ADD CONSTRAINT "EventBooking_performanceEventId_fkey" FOREIGN KEY ("performanceEventId") REFERENCES "PerformanceEvent"("performanceEventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventBooking" ADD CONSTRAINT "EventBooking_eventScheduleId_fkey" FOREIGN KEY ("eventScheduleId") REFERENCES "EventSchedule"("eventScheduleId") ON DELETE RESTRICT ON UPDATE CASCADE;
