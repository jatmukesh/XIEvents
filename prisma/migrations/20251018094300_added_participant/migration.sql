-- CreateTable
CREATE TABLE "Participant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "event_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "class_id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    CONSTRAINT "Participant_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Participant_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Participant_event_id_idx" ON "Participant"("event_id");

-- CreateIndex
CREATE INDEX "Participant_class_id_idx" ON "Participant"("class_id");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_event_id_email_key" ON "Participant"("event_id", "email");
