import type { ComponentType, DataEntry, DataStore, MarkdownHeading, RenderedEntry } from "./api.ts";

// MDX modules export a raw function component (not a factory), so the default is Function
type EntryImporter = () => Promise<{ default: Function; headings?: MarkdownHeading[] }>;

interface ReferenceEntry {
    collection: string;
    id: string;
}

export function createRuntime(
    stores: Map<string, DataStore>,
    importers: Record<string, EntryImporter>,
) {
    async function getCollection(
        collection: string,
        filter?: (entry: DataEntry) => unknown,
    ): Promise<DataEntry[]> {
        const store = stores.get(collection);
        if (!store) {
            return [];
        }
        const entries = store.values();
        if (filter) {
            return entries.filter(filter);
        }
        return entries;
    }

    async function getEntry(
        collectionOrRef: string | ReferenceEntry,
        slug?: string,
    ): Promise<DataEntry | undefined> {
        if (typeof collectionOrRef === "object") {
            const store = stores.get(collectionOrRef.collection);
            return store?.get(collectionOrRef.id);
        }
        const store = stores.get(collectionOrRef);
        return store?.get(slug!);
    }

    async function getEntries(refs: ReferenceEntry[]): Promise<DataEntry[]> {
        const results: DataEntry[] = [];
        for (const ref of refs) {
            const entry = await getEntry(ref);
            if (entry) {
                results.push(entry);
            }
        }
        return results;
    }

    async function render(entry: DataEntry): Promise<RenderedEntry> {
        const collectionName = findCollectionForEntry(entry);
        const key = `${collectionName}/${entry.id}`;
        const importer = importers[key];
        if (!importer) {
            throw new Error(`No content found for entry "${key}"`);
        }
        const mod = await importer();
        // Wrap MDX component in a factory — MDX compiles to a function that
        // returns JSX directly, but Remix 3 expects factory-pattern components
        // that return a render function.
        let MdxComponent = mod.default;
        let Content: ComponentType = () => () => MdxComponent({});
        return { Content, headings: mod.headings ?? [] };
    }

    function findCollectionForEntry(entry: DataEntry): string {
        for (const [name, store] of stores) {
            if (store.has(entry.id)) {
                return name;
            }
        }
        throw new Error(`Entry "${entry.id}" not found in any collection`);
    }

    return { getCollection, getEntries, getEntry, render };
}
