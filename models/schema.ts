import { sqliteTable, AnySQLiteColumn, text, integer } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const homes = sqliteTable("homes", {
	modelNumber: text().primaryKey().notNull(),
	type: text().notNull(),
	series: text().notNull(),
	created: integer().default(sql`(STRFTIME('%s', 'now') * 1000)`),
	beds: integer().default(1).notNull(),
	baths: integer().default(1).notNull(),
});

export const cfKv = sqliteTable("_cf_KV", {
});

