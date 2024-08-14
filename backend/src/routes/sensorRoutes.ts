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

router.get("/data", getSensorData); // Rota para obter todos os dados
router.post("/data", receiveSensorData); // Rota para enviar dados em tempo real
router.post("/upload", upload.single("file"), uploadSensorDataCSV); // Rota para fazer upload de CSV
router.get("/average", getAverageSensorData); // Rota para obter a média dos dados

export default router;
