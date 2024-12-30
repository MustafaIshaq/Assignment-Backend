const express = require("express");
const app = express();
const events = require("./data.json"); // Import the JSON file

// Endpoint to get events
app.get("/events/count", (req, res) => {
  res.json({ count: 4000 });
});

app.get("/events", (req, res) => {
  let result = events;
  let { offset, limit, category, slte, sgte } = req.query;
  if (!limit) {
    limit = 20;
    offset = 0;
  }
  offset = parseInt(offset);
  limit = parseInt(limit);

  if (category) {
    result = result.filter((event) => event.category === category);
  }
  if (slte && sgte) {
    const date1 = new Date(slte);
    const date2 = new Date(sgte);

    result = result.filter((event) => {
      const eventStartDate = new Date(event.start);
      return date2 < eventStartDate && eventStartDate < date1;
    });
  }
  res.json(result.slice(offset, offset + limit));
});

// Serve on a free port or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
