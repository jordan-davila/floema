require("dotenv").config();

const app = require("./config");
const Prismic = require("@prismicio/client");
const PrismicDOM = require("prismic-dom");

const handleLinkResolver = (doc) => {
    if (doc.type === "product") {
        return `/details/${doc.slug}`;
    }

    if (doc.type === "collections") {
        return `/collections`;
    }

    if (doc.type === "about") {
        return `/about`;
    }

    return "/";
};

app.use((req, res, next) => {
    res.locals.Link = handleLinkResolver;
    res.locals.PrismicDOM = PrismicDOM;
    res.locals.getNumberByIndex = (index) => {
        return index == 0 ? "One" : index == 1 ? "Two" : index == 2 ? "Three" : (index = 3 ? "Four" : " ");
    };
    next();
});

const handleRequests = async (api) => {
    const meta = await api.getSingle("meta");
    const preloader = await api.getSingle("preloader");
    const navigation = await api.getSingle("navigation");

    return {
        meta,
        navigation,
        preloader,
    };
};

const initApi = (req) => {
    return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        req: req,
    });
};

// Routes
app.get("/", async (req, res) => {
    const api = await initApi(req);
    const defaults = await handleRequests(api);
    const home = await api.getSingle("home");

    const { results: collections } = await api.query(Prismic.Predicates.at("document.type", "collection"), {
        fetchLinks: "product.image",
    });

    res.render("pages/home", { ...defaults, home, collections });
});

app.get("/about", async (req, res) => {
    const api = await initApi(req);
    const defaults = await handleRequests(api);
    const about = await api.getSingle("about");
    res.render("pages/about", { ...defaults, about });
});

app.get("/collections", async (req, res) => {
    const api = await initApi(req);
    const defaults = await handleRequests(api);
    const home = await api.getSingle("home");
    const { results: collections } = await api.query(Prismic.Predicates.at("document.type", "collection"), {
        fetchLinks: "product.image",
    });

    res.render("pages/collections", { ...defaults, collections, home });
});

app.get("/details/:uid", async (req, res) => {
    const api = await initApi(req);
    const defaults = await handleRequests(api);
    const product = await api.getByUID("product", req.params.uid, {
        fetchLinks: "collection.title",
    });
    res.render("pages/details", { ...defaults, product });
});
