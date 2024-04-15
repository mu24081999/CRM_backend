const Imap = require("node-imap");
const { simpleParser } = require("mailparser");

const config = {
  user: "mu24081999@gmail.com", // Your email
  password: "isqzrulwfzdkitpl", // Your password
  host: "imap.gmail.com", // Your email server host
  port: 993, // Typically 993 for IMAP over SSL
  tls: true, // Use TLS
};

const imap = new Imap(config);

imap.once("ready", function () {
  imap.openBox("INBOX", true, function (err, box) {
    if (err) {
      console.error(err);
      return;
    }

    const fetchOptions = {
      bodies: ["HEADER.FIELDS (FROM TO SUBJECT DATE)"],
      struct: true,
    };

    const fetcher = imap.fetch("1:*", fetchOptions);

    fetcher.on("message", function (msg, seqno) {
      console.log(`Message ${seqno}`);

      msg.on("body", function (stream, info) {
        simpleParser(stream, (err, mail) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`From: ${mail.from.text}`);
            console.log(`To: ${mail.to.text}`);
            console.log(`Subject: ${mail.subject}`);
            console.log(`Body: ${mail}`);
            console.log(`Date: ${mail.date}`);
            // You can process or store the mail object further
          }
        });
      });
    });

    fetcher.on("end", function () {
      console.log("Done fetching all emails.");
      imap.end();
    });
  });
});

imap.once("error", function (err) {
  console.error(err);
});

imap.once("end", function () {
  console.log("Connection ended");
});

imap.connect();
