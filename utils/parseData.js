const Veteran = require("../models/VeteranSchema")


async function parseData(data) {
    let arr = [];
    
    for (let veteran of data) {
        const item = new Veteran({
            name: veteran?.name || "Unknown",
            from: veteran?.from || "Unknown",
            death: veteran?.death || "Unknown",
            squadron: veteran?.squadron || "Unknown",
            inscribed: veteran?.inscribed || "Unknown",
            grave: veteran?.grave || "Unknown",
            full_description: veteran?.full_description || "Unknown"
        });
        arr.push(item);
    }
    return arr;
}

module.exports = parseData;
