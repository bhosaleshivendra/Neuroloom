const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

dns.resolveSrv(
  "_mongodb._tcp.cluster0.8u4vv64.mongodb.net",
  (err, records) => {
    console.log(err);
    console.log(records);
  }
);