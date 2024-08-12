import Divisi from "../models/M_Divisi.js";
import TopikMarketing from "../models/M_TopikMarketing.js";
import MarketingMateri from "../models/M_MarketingMateri.js";
import upload from "../config/Multer.js";

// Get All Divisi
export const getAllDivisi = async (req, res) => {
  try {
    const divisies = await Divisi.findAll();
    res.status(200).json(divisies);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

// Get id
export const getDivisiById = async (req, res) => {
  try {
    const divisi = await Divisi.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: TopikMarketing,
          include: [
            {
              model: MarketingMateri,
            },
          ],
        },
      ],
    });

    if (!divisi) {
      return res.status(404).json({ msg: "Divisi tidak ditemukan" });
    }

    res.status(200).json(divisi);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

// Create Divisi with Image
export const createDivisi = async (req, res) => {
  upload.single("foto_divisi")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }

    const { nama_divisi } = req.body;
    const foto_divisi = req.file ? req.file.filename : null;

    try {
      const newDivisi = await Divisi.create({
        nama_divisi,
        foto_divisi,
      });
      res.status(201).json(newDivisi);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
  });
};
