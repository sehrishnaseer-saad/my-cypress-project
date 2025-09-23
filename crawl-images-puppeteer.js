const puppeteer = require("puppeteer");

const startUrl = "https://www.techsila.io/blogs"; // 👈 start from blogs page
const visited = new Set();
const pngImages = {};

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise(resolve => {
            let totalHeight = 0;
            const distance = 200;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 200);
        });
    });
}

async function crawlPage(page, url) {
    if (visited.has(url)) return;
    visited.add(url);

    try {
        console.log("🔍 Crawling:", url);
        await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

        // Scroll to load lazy images
        await autoScroll(page);

        // Extract all PNG images from src, srcset, and CSS backgrounds
        const images = await page.evaluate(() => {
            const results = [];

            // Normal img tags
            document.querySelectorAll("img").forEach(img => {
                if (img.src.toLowerCase().includes(".png")) results.push(img.src);
                if (img.srcset) {
                    img.srcset.split(",").forEach(src =>
                        src.trim().toLowerCase().endsWith(".png") ? results.push(src.trim()) : null
                    );
                }
            });

            // Background images
            document.querySelectorAll("*").forEach(el => {
                const bg = window.getComputedStyle(el).backgroundImage;
                if (bg && bg.includes(".png")) {
                    const match = bg.match(/url\(["']?(.*?)["']?\)/);
                    if (match && match[1]) results.push(match[1]);
                }
            });

            return [...new Set(results)];
        });

        if (images.length > 0) {
            pngImages[url] = images;
        }

        // Extract all internal links (crawl deeper)
        const links = await page.$$eval("a", as =>
            as.map(a => a.href).filter(h => h.startsWith("https://www.techsila.io"))
        );

        for (const link of links) {
            if (!visited.has(link)) {
                await crawlPage(page, link);
            }
        }
    } catch (err) {
        console.error("❌ Failed to fetch", url, ":", err.message);
    }
}

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await crawlPage(page, startUrl);

    console.log("\n📊 PNG Image Report:\n");
    let totalPngs = 0;
    for (const [pageUrl, images] of Object.entries(pngImages)) {
        console.log(`📍 ${pageUrl}`);
        images.forEach(img => console.log(`   🖼️ ${img}`));
        totalPngs += images.length;
    }

    console.log(`\n✅ Total PNG Images Found: ${totalPngs}`);
    console.log(`✅ Pages with PNGs: ${Object.keys(pngImages).length}`);

    await browser.close();
})();


