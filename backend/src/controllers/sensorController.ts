import { Request, Response } from "express";
import { prisma } from "../index";
import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
import path from "path";

// Configuração do multer para upload de arquivos
const upload = multer({ dest: "uploads/" });

export const receiveSensorData = async (req: Request, res: Response) => {
  console.log("Received request to store sensor data:", req.body);

  try {
    const { equipmentId, timestamp, value } = req.body;

    // Garantir que o equipmentId existe na tabela Equipment
    const equipment = await prisma.equipment.upsert({
      where: { equipmentId },
      update: {}, // Se o equipamento já existe, não precisa fazer nada
      create: { equipmentId }, // Se não existir, criar
    });

    // Agora, o equipamentoId já deve existir, e podemos inserir em SensorData
    const data = await prisma.sensorData.create({
      data: {
        equipmentId: equipment.equipmentId, // Certifique-se de usar equipmentId aqui
        timestamp: new Date(timestamp),
        value,
      },
    });

    console.log("Sensor data stored successfully:", data);
    res.status(201).json(data);
  } catch (error) {
    console.error("Failed to store sensor data:", error);
    res.status(500).json({ error: "Failed to store sensor data" });
  }
};

// Obtém todos os dados de sensores
export const getSensorData = async (req: Request, res: Response) => {
  try {
    const sensorData = await prisma.sensorData.findMany({
      include: {
        equipment: true,
      },
      orderBy: {
        timestamp: "desc",
      },
    });
    res.status(200).json(sensorData);
  } catch (error) {
    console.error("Failed to fetch sensor data:", error);
    res.status(500).json({ error: "Failed to fetch sensor data" });
  }
};

interface CsvData {
  equipmentId: string;
  timestamp: string;
  value: string;
}

export const uploadSensorDataCSV = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const results: CsvData[] = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data: CsvData) => results.push(data))
      .on("end", async () => {
        for (const row of results) {
          const { equipmentId, timestamp, value } = row;
          await prisma.equipment.upsert({
            where: { equipmentId },
            update: {},
            create: { equipmentId },
          });

          await prisma.sensorData.create({
            data: {
              equipmentId: equipmentId, // Use diretamente o equipmentId fornecido
              timestamp: new Date(timestamp),
              value: parseFloat(value),
            },
          });
        }

        res.status(201).json({ message: "CSV data uploaded successfully" });
      });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload CSV data" });
  }
};

export const getAverageSensorData = async (req: Request, res: Response) => {
  const { period } = req.query as { period?: string };
  let startDate: Date;

  switch (period) {
    case "24h":
      startDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
      break;
    case "48h":
      startDate = new Date(Date.now() - 48 * 60 * 60 * 1000);
      break;
    case "1w":
      startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "1m":
      startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      break;
    default:
      return res.status(400).json({ error: "Invalid period" });
  }

  try {
    // Obter todos os dados de sensores
    const allSensorData = await prisma.sensorData.findMany();

    // Filtrar os dados para obter apenas aqueles dentro do período especificado
    const filteredData = allSensorData.filter(
      (data) => new Date(data.timestamp) >= startDate
    );

    const averages = filteredData.reduce((acc, data) => {
      if (!acc[data.equipmentId]) {
        acc[data.equipmentId] = { total: 0, count: 0 };
      }
      acc[data.equipmentId].total += data.value;
      acc[data.equipmentId].count += 1;
      return acc;
    }, {} as Record<string, { total: number; count: number }>);

    // Formatar os dados para envio ao frontend
    const formattedData = Object.keys(averages).map((equipmentId) => ({
      equipmentId,
      _avg: {
        value: averages[equipmentId].total / averages[equipmentId].count,
      },
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Failed to fetch average sensor data:", error);
    res.status(500).json({ error: "Failed to fetch average sensor data" });
  }
};
