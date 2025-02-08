import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const homes = sqliteTable('homes', {
  type: text(),
	modelNumber: text().primaryKey(),
	series: text(),
	manufacturer: text(),
	walkthroughUrl: text(),
	status: text(),
	onDisplay: integer(),
	space: text(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
  lastModifiedAt: integer("last_modified_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});