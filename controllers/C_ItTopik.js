import TopikIt from "../models/M_ItTopik.js";
import MarketingMateri from "../models/M_MarketingMateri.js";
import Divisi from "../models/M_Divisi.js";
import upload from "../config/Multer.js";

// Create
export const createTopikIt = async (req, res) => {
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

      const newTopikIt = await TopikIt.create({
        id_Divisi,
        nama_divisi: divisi.nama_divisi, 
        judul,
        foto_topik,
        deskripsi,
      });

      res.status(201).json(newTopikIt);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
  });
};


// getAll
export const getAllIt = async (req, res) => {
    try {
      const topikIt = await TopikIt.findAll({
        include: [{ model: Divisi }], 
      });
      res.status(200).json(topikIt);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
  };


// getId
export const getItId = async (req, res) => {
    try {
      const topikIt = await TopikIt.findOne({
        where: { id: req.params.id },
        include: [
          { model: Divisi }, 
        ],
      });
  
      if (!topikIt) {
        return res.status(404).json({ msg: "Topik IT tidak ditemukan" });
      }
  
      res.status(200).json(topikIt);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
  };

// Update IT
export const updateTopikIT = async (req, res) => {
    upload.single("foto_topik")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ msg: err.message });
      }
  
      const { id_Divisi, judul, deskripsi } = req.body;
      const foto_topik = req.file ? req.file.filename : null;
  
      try {
        const topikIT = await TopikIt.findByPk(req.params.id);
  
        if (!topikIT) {
          return res.status(404).json({ msg: "Topik IT tidak ditemukan" });
        }
  
        if (id_Divisi) {
          const divisi = await Divisi.findByPk(id_Divisi);
          if (!divisi) {
            return res.status(404).json({ msg: "Divisi tidak ditemukan" });
          }
        }
  
        await TopikIt.update(
          {
            id_Divisi: id_Divisi || topikIT.id_Divisi,
            nama_divisi: id_Divisi
              ? Divisi.nama_divisi
              : topikIT.nama_divisi,
            judul: judul || topikIT.judul,
            deskripsi: deskripsi || topikIT.deskripsi,
            foto_topik: foto_topik || topikIT.foto_topik,
          },
          {
            where: { id: req.params.id },
          }
        );
  
        res.status(200).json({ msg: "Topik IT berhasil diperbarui" });
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
      }
    });
  };

  // Delete
  export const deleteTopikIT = async (req, res) => {
    try {
      const topikIT = await TopikIt.findByPk(req.params.id);
  
      if (!topikIT) {
        return res.status(404).json({ msg: "topik IT tidak ditemukan" });
      }
  
      await TopikIt.destroy({
        where: { id: req.params.id },
      });
  
      res.status(200).json({ msg: "Topik IT berhasil dihapus" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
  };