import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";
import { NextRequest, NextResponse } from "next/server";

type Data = { message: string } | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "El id no es válido" });
  }

  switch (req.method) {
    case "GET":
      return getEntry(req, res);
    case "PUT":
      return updateEntry(req, res);
    case "DELETE":
      return deleteEntry(req, res);
    default:
      return res.status(400).json({ message: "El método no existe" });
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();
  const entryToGet = await Entry.findById(id);
  await db.disconnect();

  if (!entryToGet) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay entrada con este ID: " + id });
  }

  res.status(200).json(entryToGet);
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay entrada con este ID: " + id });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );

    res.status(200).json(updatedEntry!);

    await db.disconnect();
  } catch (error) {
    await db.disconnect();
    res.status(400).json({ message: "bad request" });
  }
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entryToDelete = await Entry.findById(id);

  if (!entryToDelete) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay entrada con este ID: " + id });
  }

  try {
    const deletedEntry = await Entry.findByIdAndDelete(id);
    await db.disconnect();
    return res.status(200).json(deletedEntry!);
  } catch (error) {
    await db.disconnect();
    return res.status(400).json({ message: "Bad request" });
  }
};
