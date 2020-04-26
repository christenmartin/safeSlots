// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status

  const router = server.loopback.Router();
  router.get('/', server.loopback.status());
  router.post('/api/bookings', (req, res) => {
      //frontend needs to send slotId, bookingInfo 
      //check api/slots/:id/bookings
      // const newBooking = req.body; 
      res.json('sigh')
  
      // Slots.find({ where: { "id": req.body.slotId } }, { include: 'bookings' })
      //   .then(stuff => {
      //       console.log(stuff);
      //     res.json(stuff)
      //   })
      //   .catch(err => console.log(err));
      // //check slot exists and check slot has not been filled since the time user clicked submit
      // //by checking bookings.length < maxPeoplePerSlot 
      //     //post it 
      // //else res.json error 
    })

  server.use(router);
  
};
