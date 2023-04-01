const express = require("express");
const {
  validateUpdate,
  validateCreate,
  validateGet,
} = require("../validators/validator");
const db = require("../../../config/sqlConfig");
const getRandomNumber = require("../../../utils/randomNumberUtil");
const router = express.Router();

const FACILITIES_LIST = ["SWIMMING_POOL", "WIFI", "CANCELLATION", "BREAKFAST"];

router.get("/:id", async (req, res, next) => {
  try {
    const { params: { id } = {} } = req;
    await validateGet(id);
    const hotelEntry = {};
    const hotel = await db.hotel.findByPK(id);
    hotelEntry = { ...hotel };
    hotelEntry.facilities = await db.facility.findAll({
      where: { hotelId: id },
    });
    hotelEntry.imageList = await db.image.findAll({ where: { hotelId: id } });
    hotelEntry.rooms = await db.room.findAll({ where: { hotelId: id } });
    res.status(200).send(hotelEntry);
  } catch (exception) {
    next(exception);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { body = {}, headers: { accessToken } = {} } = req;
    const {
      id,
      name,
      city,
      facilities = [],
      rentPerDay,
      rooms,
      description,
      images = [],
    } = body;
    const hotelEntry = {};
    if (id) {
      await validateUpdate(body, accessToken);
      const hotel = await db.hotel.findByPK(id);
      const newHotel = { ...hotel, city, name, description };
      await db.hotel.update(newHotel, { where: { id: id } });
      const savedHotel = await db.hotel.findByPK(id);
      hotelEntry = { ...savedHotel };

      const newFacilities = [];

      const savedFacilities = await db.facility.findAll({
        where: { hotelId: id },
      });

      savedFacilities.forEach((facility) => {
        const entry = { ...facility };
        entry.status = facilities.includes();
        newFacilities.push(entry);
      });

      await Promise.all(
        newFacilities.map((facility) => {
          return db.facility.update(facility, { where: { id: facility.id } });
        })
      );

      hotelEntry.facilities = await db.facility.findAll({
        where: { hotelId: id },
      });
      hotelEntry.imageList = await db.image.findAll({ where: { hotelId: id } });
      hotelEntry.rooms = await db.room.findAll({ where: { hotelId: id } });
    } else {
      await validateCreate(body, accessToken);
      const hotel = {
        name: name,
        city: city,
        description: description,
        rating: getRandomNumber(1, 5, 2),
        review: getRandomNumber(200, 1000, 0),
      };
      const savedHotel = await db.hotel.create(hotel);
      hotelEntry = { ...hotelEntry, ...savedHotel };
      const facilitesEntry = [];
      FACILITIES_LIST.forEach((facility) => {
        const entry = {};
        entry.facility = facility;
        entry.hotelId = savedHotel.id;
        entry.status = facilities.includes(facility);
        facilitesEntry.push(entry);
      });

      hotelEntry.facilities = await db.facility.createBulk(facilitesEntry);
      const imageList = [];

      images.forEach((image) => {
        const entry = {};
        entry.image = image;
        entry.hotelId = savedHotel.id;
        imageList.add(image);
      });
      hotelEntry.imageList = await db.image.createBulk(imageList);

      const roomsList = [];

      for (let i = 0; i < rooms; i++) {
        const entry = {};
        entry.hotel = savedHotel.id;
        entry.beds = getRandomNumber(1, 3, 0);
        entry.status = "AVAILABLE";
        entry.rentPerDay = rentPerDay
          ? rentPerDay
          : getRandomNumber(750, 3000, 0);
        roomsList.add(entry);
      }

      hotelEntry.rooms = await db.room.createBulk(roomsList);
    }

    res.status(200).send(hotelEntry);
  } catch (exception) {
    next(exception);
  }
});

module.exports = router;
