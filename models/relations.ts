import { relations } from "drizzle-orm/relations";
import { homes, relatedFiles } from "./schema";

export const relatedFilesRelations = relations(relatedFiles, ({one}) => ({
	home: one(homes, {
		fields: [relatedFiles.parentKey],
		references: [homes.modelNumber]
	}),
}));

export const homesRelations = relations(homes, ({many}) => ({
	relatedFiles: many(relatedFiles),
}));