export async function load(file) {
    try {
        const res = await fetch(file);
        if (!res.ok) {
            console.log("Status:", res.status);
            return;
        }
        if (file.includes("json")) {
            return await res.json();
        } else {
            return await res.text();
        }
    } catch (error) {
        console.log(error);
    }
}

let route = null;
export async function checkPath(url) {
    if (!route) {
        route = await load(`/config/route.json`);
        console.log(route);
    }
    if (url === "/index.html") {
        return route["/"];
    } else {
        if (route[url]) {
            return route[url];
        } else {
            return route["/404"];
        }
    }
}
