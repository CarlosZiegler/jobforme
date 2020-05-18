export default async function api(url) {
    const response = await fetch(url)
    return await response.json();
}