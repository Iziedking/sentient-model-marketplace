-- CreateTable
CREATE TABLE "public"."Rating" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rating_userId_modelId_key" ON "public"."Rating"("userId", "modelId");

-- AddForeignKey
ALTER TABLE "public"."Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Rating" ADD CONSTRAINT "Rating_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "public"."ModelListing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
