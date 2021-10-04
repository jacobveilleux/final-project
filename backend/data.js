// 2 users type: owners & riders
// 3 categories: moto, atv, snowmobile

const owners = [
    {
        _id: "1000",
        name: "Jacob",
        surname: "Veilleux",
        email: "jv@mail.com",
        category: "moto",
        city: "montreal",
    },
];

const riders = [
    {
        _id: "5000",
        name: "Rider",
        surname: "One",
        email: "riderone@mail.com",
    },
];

module.exports = { owners, riders };
