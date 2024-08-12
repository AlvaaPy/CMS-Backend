import TopikRedaksi from "../models/M_Redaksi.js";
import Divisi from "../models/M_Divisi.js";
import upload from "../config/Multer.js";

// Create
export const createTopikRedaksi = async (req, res) => {
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
        const newTOpikRedaksi = await TopikRedaksi
        .create({
          id_Divisi,
          nama_divisi: divisi.nama_divisi, 
          judul,
          foto_topik,
          deskripsi,
        });
  
        res.status(201).json(newTOpikRedaksi);
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
      }
    });
  };

// Read
export const getAllRedaksi = async (req, res) => {
    try {
      const topikRedaksi = await TopikRedaksi.findAll({
        include: [{ model: Divisi }], 
      });
      res.status(200).json(topikRedaksi);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
  };

// getById
export const getRedaksiId = async (req, res) => {
    try {
      const topikRedaksi = await TopikRedaksi.findOne({
        where: { id: req.params.id },
        include: [
          { model: Divisi }, 
        ],
      });
  
      if (!topikRedaksi) {
        return res.status(404).json({ msg: "Topik Redaksi tidak ditemukan" });
      }
  
      res.status(200).json(topikRedaksi);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
  };

// update
export const updateTopikRedaksi = async (req, res) => {
    upload.single("foto_topik")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ msg: err.message });
      }
  
      const { id_Divisi, judul, deskripsi } = req.body;
      const foto_topik = req.file ? req.file.filename : null;
  
      try {
        const topikRedaksi = await TopikRedaksi.findByPk(req.params.id);
  
        if (!topikRedaksi) {
          return res.status(404).json({ msg: "Topik Redaksi tidak ditemukan" });
        }
  
        if (id_Divisi) {
          const divisi = await Divisi.findByPk(id_Divisi);
          if (!divisi) {
            return res.status(404).json({ msg: "Divisi tidak ditemukan" });
          }
        }
  
        await TopikRedaksi.update(
          {
            id_Divisi: id_Divisi || topikRedaksi.id_Divisi,
            nama_divisi: id_Divisi
              ? Divisi.nama_divisi
              : topikRedaksi.nama_divisi,
            judul: judul || topikRedaksi.judul,
            deskripsi: deskripsi || topikRedaksi.deskripsi,
            foto_topik: foto_topik || topikRedaksi.foto_topik,
          },
          {
            where: { id: req.params.id },
          }
        );
  
        res.status(200).json({ msg: "Topik Redaksi berhasil diperbarui" });
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
      }
    });
  };

// delete
export const deleteTopikRedaksi = async (req, res) => {
    try {
      const topikRedaksi = await TopikRedaksi.findByPk(req.params.id);
  
      if (!topikRedaksi) {
        return res.status(404).json({ msg: "topik IT tidak ditemukan" });
      }
  
      await TopikRedaksi.destroy({
        where: { id: req.params.id },
      });
  
      res.status(200).json({ msg: "Topik Redaksi berhasil dihapus" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
  };