import { BookOpenIcon } from "@heroicons/react/24/outline";
import { Divider, Heading, Button } from "@tailwindcss/ui";
import assert from "node:assert";
import { getCollection, getEntry, render } from "sprinkles:content";

export async function ServerComponent() {
    let restaurants = await getCollection("restaurants");

    return (
        <div className="flex flex-col gap-4">
            <Heading className="truncate">Denver Restaurants</Heading>
            <Divider />
            <ul className="flex flex-col border-black/15 *:border-b *:last:border-none dark:border-white/15">
                {restaurants.map(restaurant => (
                    <ListItem id={restaurant.id} key={restaurant.id} />
                ))}
            </ul>
        </div>
    );
}

async function ListItem({ id }: { id: string }) {
    let entry = await getEntry("restaurants", id);
    assert(entry, `Could not find entry for slug: ${id}`);
    let { Content } = await render(entry);

    return (
        <li className="border-black/15 py-6 first-of-type:pt-0! dark:border-white/15">
            <div className="flex flex-col items-start gap-6 md:flex-row">
                <div className="relative w-full md:w-auto">
                    <div className="aspect-3/2 md:aspect-square block w-full overflow-hidden rounded-lg bg-black/10 md:w-52 dark:bg-white/10">
                        <img alt="" className="size-full object-cover" src={entry.data.thumbnail} />
                    </div>
                </div>
                <div className="flex w-full flex-col justify-between gap-2 overflow-hidden">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-xl font-medium text-black/95 md:truncate dark:text-white/95">
                                {entry.data.name}
                            </h2>
                            <div className="text-sm text-black/70 dark:text-white/70">
                                <span className="inline-block text-wrap">
                                    {entry.data.cuisine} •{" "}
                                    <a
                                        className="underline hover:text-blue-500 dark:hover:text-blue-400"
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${entry.data.address
                                            .split(" ")
                                            .join("+")}`}
                                        target="_blank"
                                    >
                                        {entry.data.address}
                                    </a>
                                </span>
                            </div>
                        </div>
                        <div className="text-sm text-black/70 dark:text-white/70">
                            <Content />
                        </div>
                    </div>
                    <div>
                        {entry.data.menu !== undefined && (
                            <Button
                                className="text-blue-500 dark:text-blue-400"
                                href={entry.data.menu}
                                plain
                                target="_blank"
                            >
                                Menu
                                <BookOpenIcon className="stroke-blue-500 dark:stroke-blue-400" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </li>
    );
}
