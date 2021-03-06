const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" }
      }
    }
  ])
    .sort({ date: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" }
      }
    }
  ])
    .sort({ day: 1 })
    .then(dbWorkout => {
      console.log(dbWorkout);
      if (dbWorkout.length > 7) {
        res.json(dbWorkout.slice(dbWorkout.length - 7));
      } else {
        res.json(dbWorkout);
      }
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  if (req.body.name && req.body.duration) {
    Workout.updateOne(
      { _id: req.params.id },
      { $push: { exercises: req.body } }
    )
      .then(dbWorkout => {
        console.log;
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
});

router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      console.log;
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
