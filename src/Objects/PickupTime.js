function PickupTime(location_id, iso_8601_timestamp, pickup_time) {
  this.location_id = location_id;
  this.iso_8601_timestamp = iso_8601_timestamp;
  this.pickup_time = pickup_time;
}

module.exports = PickupTime;