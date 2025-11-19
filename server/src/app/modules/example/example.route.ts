import { Router } from "express";
import { ExampleControllers } from "./example.controller";

const router = Router();

router
  .route("/")
  .post(ExampleControllers.createExample)
  .get(ExampleControllers.getExamples);

router
  .route("/:slug")
  .get(ExampleControllers.getExampleById)
  .put(ExampleControllers.updateExample)
  .delete(ExampleControllers.deleteExample);

export const ExampleRoutes = router;
