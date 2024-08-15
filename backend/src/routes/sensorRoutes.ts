import { Router } from "express";
import multer from "multer";
import {
  receiveSensorData,
  getSensorData,
  uploadSensorDataCSV,
  getAverageSensorData,
} from "../controllers/sensorController";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.get("/data", getSensorData);
router.post("/data", receiveSensorData);
router.post("/upload", upload.single("file"), uploadSensorDataCSV);
router.get("/average", getAverageSensorData);

export default router;
