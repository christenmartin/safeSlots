const loopback = require("loopback");
module.exports = function (app) {
  const router = app.loopback.Router();
  const Bookings = app.models.Booking;
  const Slots = app.models.Slot;
  const bodyParser = require("body-parser");
  router.use(bodyParser.json({ extended: true }));

  router.post("/api/bookings", (req, res) => {
    const newBooking = req.body;

    const bookingsForSlot = Bookings.find({ "where": { "slotId": newBooking.slotId } });
    const slot = Slots.findById(newBooking.slotId, { include: 'bookings' }); 

    Promise.all([bookingsForSlot, slot])
        .then(queries => {
            const foundBookings = queries[0];
            const foundSlot = queries[1];

            if (!foundBookings || !foundSlot) {
                res.json({ "error": "This slot does not exist"})
            } else if (foundBookings.length < foundSlot.maxPeoplePerSlot) {
                Bookings.create(newBooking)
                    .then(createdBooking => res.json(createdBooking))
                    .catch(err => console.log(err));
            } else {
                res.json({ "error": "This slot is no longer available. Try a different slot."})
            }
        }) 
        .catch(err => console.log(err))
  })

//   For GET api/availableBookings 
//   -current date comes in 
//   -query db to see if slots for that date already exist in db. if yes, query bookings to check how many slots are still 
//   available for each slot that day, i.e. where bookings.length < maxPeoplePerSlot. Return 3-5 options to user. May be ways to optimize this so it is less costly. 

//   -if date does not exist in db, generate new slots for that date. return 3-5 options to user. 

//   -alternatively could possibly integrate cron jobs, which trigger at programmed intervals like per day or per week. 
//   but if we used this, we would need to know what duration the store wanted for slots the next day. cannot change 
//   slot time dynamically, or booked users will have to re-book their slots, which is a bad UX. 

  
  app.use(router);
};