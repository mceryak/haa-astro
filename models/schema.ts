import { sqliteTable, check, text, integer, foreignKey } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const homes = sqliteTable("Homes", {
	modelNumber: text().primaryKey().notNull(),
	type: text().notNull(),
	walkthroughUrl: text(),
	manufacturer: text().notNull(),
	onDisplay: integer().default(0).notNull(),
	beds: integer().notNull(),
	baths: integer().notNull(),
	sqft: integer().notNull(),
	series: text().notNull(),
	createdDate: text().notNull(),
	lastModifiedDate: text().notNull(),
	floorPlanR2Name: text(),
	isFeatured: integer().default(0).notNull(),
	thumbnailR2: text(),
},
(table) => [
	check("Homes_check_1", sql`onDisplay IN (0, 1`),
	check("Homes_check_2", sql`isFeatured IN (0, 1`),
]);

export const relatedFiles = sqliteTable("RelatedFiles", {
	id: integer().primaryKey().notNull(),
	parentKey: text().notNull().references(() => homes.modelNumber, { onDelete: "restrict" } ),
	r2Name: text().notNull(),
	tabName: text().notNull(),
},
(table) => [
	check("Homes_check_1", sql`onDisplay IN (0, 1`),
	check("Homes_check_2", sql`isFeatured IN (0, 1`),
]);

export const cfKv = sqliteTable("_cf_KV", {
},
(table) => [
	check("Homes_check_1", sql`onDisplay IN (0, 1`),
	check("Homes_check_2", sql`isFeatured IN (0, 1`),
]);

