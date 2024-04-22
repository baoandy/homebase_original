-- CreateEnum
CREATE TYPE "citizen" AS ENUM ('US');

-- CreateEnum
CREATE TYPE "addr_type" AS ENUM ('Physical', 'Mailing');

-- CreateTable
CREATE TABLE "waitlist" (
    "id" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "monthlyMortgageAmount" TEXT,
    "mortgageOriginator" TEXT,
    "maritalStatus" TEXT,
    "employmentStatus" TEXT,
    "homeType" TEXT,
    "referralCode" TEXT,
    "referredBy" TEXT,
    "inviteSent" BOOLEAN NOT NULL DEFAULT false,
    "inviteSentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "waitlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3) NOT NULL,
    "password" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "date_of_birth" TEXT,
    "phone_number" TEXT,
    "citizenship" "citizen" NOT NULL DEFAULT 'US',
    "tin" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "application_id" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_users" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "sessionToken" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "verification_token" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verification_token_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "card_application" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "status" TEXT NOT NULL,
    "currentAddressId" UUID,
    "mortgageAddressId" UUID,
    "employmentStatus" TEXT,
    "companyName" TEXT,
    "jobTitle" TEXT,
    "annualIncome" DOUBLE PRECISION,
    "mortgageAmount" DOUBLE PRECISION,
    "yearMortgageOriginated" INTEGER,
    "ssid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "card_application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "_id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "userAddress" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "address_type" "addr_type" NOT NULL DEFAULT 'Physical',
    "street_line_1" TEXT NOT NULL,
    "street_line_2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "userAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accountProduct" (
    "id" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "account_product_id" TEXT NOT NULL,
    "primary_person_application_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "ownership_type" TEXT NOT NULL,
    "person_applications" JSONB NOT NULL,
    "business_application_id" TEXT,
    "account_id" TEXT,
    "product" TEXT,
    "account_number" TEXT,
    "deposit_id" TEXT,
    "account_number_reservation_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "bankdata" JSONB,
    "userdata" JSONB,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "waitlist_email_key" ON "waitlist"("email");

-- CreateIndex
CREATE UNIQUE INDEX "waitlist_referralCode_key" ON "waitlist"("referralCode");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_application_id_key" ON "user"("application_id");

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_userId_key" ON "admin_users"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_sessionToken_key" ON "session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "card_application_userId_key" ON "card_application"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "userAddress_userId_address_type_key" ON "userAddress"("userId", "address_type");

-- CreateIndex
CREATE UNIQUE INDEX "accountProduct_id_key" ON "accountProduct"("id");

-- CreateIndex
CREATE UNIQUE INDEX "account_id_key" ON "account"("id");

-- AddForeignKey
ALTER TABLE "admin_users" ADD CONSTRAINT "admin_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_application" ADD CONSTRAINT "card_application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_application" ADD CONSTRAINT "card_application_currentAddressId_fkey" FOREIGN KEY ("currentAddressId") REFERENCES "address"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_application" ADD CONSTRAINT "card_application_mortgageAddressId_fkey" FOREIGN KEY ("mortgageAddressId") REFERENCES "address"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userAddress" ADD CONSTRAINT "userAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_account_product_id_fkey" FOREIGN KEY ("account_product_id") REFERENCES "accountProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
