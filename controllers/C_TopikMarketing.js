import TopikMarketing from "../models/M_TopikMarketing.js";
import MarketingMateri from "../models/M_MarketingMateri.js";
import Divisi from "../models/M_Divisi.js";
import upload from "../config/Multer.js";


// Create
export const createTopikMarketing = async (req, res) => {
  upload.single("foto_topik")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }

    const { id_Divisi, judul, deskripsi } = req.body;
    const foto_topik = req.file ? req.file.filename : null;

    try {
      const divisi = await Divisi.findByPk(id_Divisi);
      if (!divisi) {
        return res.status(404).json({ msg: "Divisi tidak ditemukan" });
      }

      const newTopikMarketing = await TopikMarketing.create({
        id_Divisi,
        nama_divisi: divisi.nama_divisi, 
        judul,
        foto_topik,
        deskripsi,
      });

      res.status(201).json(newTopikMarketing);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
  });
};

// getAll
export const getAllTopikMarketing = async (req, res) => {
  try {
    const topikMarketing = await TopikMarketing.findAll({
      include: [{ model: Divisi }], 
    });
    res.status(200).json(topikMarketing);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};


// getiById
export const getTopikMarketingById = async (req, res) => {
  try {
    const topikMarketing = await TopikMarketing.findOne({
      where: { id: req.params.id },
      include: [
        { model: Divisi },
        { model: MarketingMateri }, 
      ],
    });

    if (!topikMarketing) {
      return res.status(404).json({ msg: "TopikMarketing tidak ditemukan" });
    }

    res.status(200).json(topikMarketing);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};


// Update
export const updateTopikMarketing = async (req, res) => {
  upload.single("foto_topik")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }

    const { id_Divisi, judul, deskripsi } = req.body;
    const foto_topik = req.file ? req.file.filename : null;

    try {
      const topikMarketing = await TopikMarketing.findByPk(req.params.id);

      if (!topikMarketing) {
        return res.status(404).json({ msg: "Topik Marketing tidak ditemukan" });
      }

      if (id_Divisi) {
        const divisi = await Divisi.findByPk(id_Divisi);
        if (!divisi) {
          return res.status(404).json({ msg: "Divisi tidak ditemukan" });
        }
      }

      // Perbarui data
      await TopikMarketing.update(
        {
          id_Divisi: id_Divisi || topikMarketing.id_Divisi,
          nama_divisi: id_Divisi
            ? Divisi.nama_divisi
            : topikMarketing.nama_divisi,
          judul: judul || topikMarketing.judul,
          deskripsi: deskripsi || topikMarketing.deskripsi,
          foto_topik: foto_topik || topikMarketing.foto_topik,
        },
        {
          where: { id: req.params.id },
        }
      );

      res.status(200).json({ msg: "Topik Marketing berhasil diperbarui" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
  });
};

// Delete
export const deleteTopikMarketing = async (req, res) => {
  try {
    const topikMarketing = await TopikMarketing.findByPk(req.params.id);

    if (!topikMarketing) {
      return res.status(404).json({ msg: "Topik Marketing tidak ditemukan" });
    }

    await TopikMarketing.destroy({
      where: { id: req.params.id },
    });

    res.status(200).json({ msg: "Topik Marketing berhasil dihapus" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};
