import { getCollection } from "sprinkles:content";

export async function ServerComponent() {
    let restaurants = await getCollection("restaurants");

    return (
        <main>
            <h1>Welcome to denver</h1>
            <section>
                <h2>Posts</h2>
                <ul>
                    {restaurants.map(restaurant => (
                        <li key={restaurant.id}>
                            <h3>{restaurant.data.name}</h3>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
