const express = require("express");
const {
  validateUpdate,
  validateCreate,
  validateGet,
  validateAccess,
} = require("../validators/validator");
const { Op } = require("sequelize");
const db = require("../../../config/sqlConfig");
const getRandomNumber = require("../../../utils/randomNumberUtil");
const router = express.Router();

const FACILITIES_LIST = ["SWIMMING_POOL", "WIFI", "CANCELLATION", "BREAKFAST"];

router.get("/refresh", async (req, res, next) => {
  try {
    const transactionList = await db.transaction.findAll({
      where: {
        endDate: {
          [Op.lt]: new Date(),
        },
      },
    });

    await Promise.all(
      transactionList.map((transaction) => {
        return db.room.update(
          { status: "AVAILABLE" },
          { where: { id: transaction.dataValues.roomId } }
        );
      })
    );
    res.status(200).send({ success: true });
  } catch (exception) {
    next(exception);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { params: { id } = {} } = req;
    await validateGet(id);
    let hotelEntry = {};
    const hotel = await db.hotel.findByPk(id);
    hotelEntry = { ...hotel.dataValues };
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

router.get("/", async (req, res, next) => {
  try {
    const allHotels = await db.hotel.findAll();
    const allHotelsList = allHotels.map((hotel) => {
      return hotel.dataValues;
    });
    const allRooms = await db.room.findAll();
    const allRoomsMap = {};
    allRooms.forEach((rooms) => {
      if (!allRoomsMap[rooms.dataValues.hotelId]) {
        allRoomsMap[rooms.dataValues.hotelId] = [];
      }
      allRoomsMap[rooms.dataValues.hotelId].push(rooms.dataValues);
    });

    const allImages = await db.image.findAll();
    const allImagesMap = {};

    allImages.forEach((image) => {
      if (!allImagesMap[image.dataValues.hotelId]) {
        allImagesMap[image.dataValues.hotelId] = [];
      }
      allImagesMap[image.dataValues.hotelId].push(image.dataValues);
    });

    const allFacilities = await db.facility.findAll();
    const allFacilitiesMap = {};

    allFacilities.forEach((facility) => {
      if (!allFacilitiesMap[facility.dataValues.hotelId]) {
        allFacilitiesMap[facility.dataValues.hotelId] = [];
      }
      allFacilitiesMap[facility.dataValues.hotelId].push(facility.dataValues);
    });

    const result = allHotelsList.map((hotel) => {
      const hotelId = hotel.id;
      const entry = { ...hotel };
      entry.facilities = allFacilitiesMap[hotelId] || [];
      entry.imageList = allImages[hotelId] || [];
      entry.rooms = allRooms[hotelId] || [];
      return entry;
    });

    res.status(200).send({ result: result, total_count: result.length });
  } catch (exception) {
    next(exception);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { body = {}, headers: { accesstoken: accessToken } = {} } = req;
    accessToken == accessToken || req.accessToken;
    const {
      id,
      name,
      city,
      facilities = [],
      price,
      rooms,
      discount = 0,
      description,
      url,
      images = [],
    } = body;
    let hotelEntry = {};
    if (id) {
      await validateUpdate(body, accessToken);
      const hotel = await db.hotel.findByPk(id);
      const newHotel = { ...hotel, city, name, description, url };
      await db.hotel.update(newHotel, { where: { id: id } });
      const savedHotel = await db.hotel.findByPk(id);
      hotelEntry = { ...savedHotel.dataValues };

      const newFacilities = [];

      const savedFacilities = await db.facility.findAll({
        where: { hotelId: id },
      });

      savedFacilities.forEach((facility) => {
        const entry = { ...facility.dataValues };
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
        description: description || "",
        rating: getRandomNumber(1, 5, 1),
        review: getRandomNumber(200, 1000, 0),
        status: true,
        url: url,
      };
      const savedHotel = await db.hotel.create(hotel);
      hotelEntry = { ...savedHotel.dataValues };
      const facilitesEntry = [];
      FACILITIES_LIST.forEach((facility) => {
        const entry = {};
        entry.facility = facility;
        entry.hotelId = savedHotel.id;
        entry.status = facilities.includes(facility);
        facilitesEntry.push(entry);
      });

      hotelEntry.facilities = await db.facility.bulkCreate(facilitesEntry);
      const imageList = [];

      images.forEach((image) => {
        const entry = {};
        entry.imageUrl = image;
        entry.hotelId = savedHotel.id;
        imageList.push(entry);
      });
      hotelEntry.imageList = await db.image.bulkCreate(imageList);

      const roomsList = [];

      for (let i = 0; i < rooms; i++) {
        const entry = {};
        entry.hotelId = savedHotel.id;
        entry.beds = getRandomNumber(1, 3, 0);
        entry.status = "AVAILABLE";
        entry.discount = discount;
        entry.price = price ? price : getRandomNumber(750, 3000, 0);
        roomsList.push(entry);
      }

      hotelEntry.rooms = await db.room.bulkCreate(roomsList);
    }

    res.status(200).send(hotelEntry);
  } catch (exception) {
    next(exception);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const {
      params: { id } = {},
      headers: { accesstoken: accessToken },
    } = req;
    accessToken == accessToken || req.accessToken;
    await validateAccess(accessToken);
    if (id) {
      const hotel = await db.hotel.findByPk(id);
      if (hotel) {
        const hotelId = hotel.dataValues.id;
        await hotel.destroy();
        await db.room.update(
          { status: "NOT_AVAILABLE" },
          { where: { hotelId: hotelId } }
        );
        await db.facility.update(
          { status: false },
          { where: { hotelId: hotelId } }
        );
      }
      res.status(200).send({ success: true });
    } else {
      res.status(200).send({ success: false });
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = router;
