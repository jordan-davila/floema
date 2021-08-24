require("dotenv").config();

const app = require("./config");
const Prismic = require("@prismicio/client");
const PrismicDOM = require("prismic-dom");

const handleLinkResolver = (doc) => {
    // Return url depending on the document type
};

app.use((req, res, next) => {
    res.locals.ctx = {
        endpoint: process.env.PRISMIC_ENDPOINT,
        linkResolver: handleLinkResolver,
    };
    res.locals.PrismicDOM = PrismicDOM;
    next();
});

const initApi = (req) => {
    return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        req: req,
    });
};

// Routes
app.get("/", (req, res) => {
    res.render("pages/home");
});

app.get("/about", async (req, res) => {
    const api = await initApi(req);
    const meta = await api.getSingle("meta");
    const about = await api.getSingle("about");
    res.render("pages/about", { meta, about });
});

app.get("/collections", (req, res) => {
    res.render("pages/collections");
});

app.get("/details/:uid", async (req, res) => {
    const api = await initApi(req);
    const meta = await api.getSingle("meta");
    const product = await api.getByUID("product", req.params.uid, {
        fetchLinks: "collection.title",
    });
    res.render("pages/details", { meta, product });
});
