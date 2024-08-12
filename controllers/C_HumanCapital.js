import TopikHuman from "../models/M_HumanCapital.js";
import Divisi from "../models/M_Divisi.js";
import upload from "../config/Multer.js";

// Create

export const createTopikHuman = async (req, res) => {
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
  
        const newTopikHuman = await TopikHuman.create({
          id_Divisi,
          nama_divisi: divisi.nama_divisi, 
          judul,
          foto_topik,
          deskripsi,
        });
  
        res.status(201).json(newTopikHuman);
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
      }
    });
  };

// readALl
export const getAllHuman = async (req, res) => {
    try {
      const topikHuman = await TopikHuman.findAll({
        include: [{ model: Divisi }], 
      });
      res.status(200).json(topikHuman);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
  };


// readByID
export const getHumanId = async (req, res) => {
    try {
      const topikHuman = await TopikHuman.findOne({
        where: { id: req.params.id },
        include: [
          { model: Divisi }, 
        ],
      });
  
      if (!topikHuman) {
        return res.status(404).json({ msg: "Topik Human Capital tidak ditemukan" });
      }
  
      res.status(200).json(topikHuman);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
  };

// Update
export const updateTopikHuman = async (req, res) => {
    upload.single("foto_topik")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ msg: err.message });
      }
  
      const { id_Divisi, judul, deskripsi } = req.body;
      const foto_topik = req.file ? req.file.filename : null;
  
      try {
        const topikHuman = await TopikHuman.findByPk(req.params.id);
  
        if (!topikHuman) {
          return res.status(404).json({ msg: "Topik Human Capital tidak ditemukan" });
        }
  
        if (id_Divisi) {
          const divisi = await Divisi.findByPk(id_Divisi);
          if (!divisi) {
            return res.status(404).json({ msg: "Divisi tidak ditemukan" });
          }
        }
  
        await TopikHuman.update(
          {
            id_Divisi: id_Divisi || topikHuman.id_Divisi,
            nama_divisi: id_Divisi
              ? Divisi.nama_divisi
              : topikHuman.nama_divisi,
            judul: judul || topikHuman.judul,
            deskripsi: deskripsi || topikHuman.deskripsi,
            foto_topik: foto_topik || topikHuman.foto_topik,
          },
          {
            where: { id: req.params.id },
          }
        );
  
        res.status(200).json({ msg: "Topik Human Capital berhasil diperbarui" });
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
      }
    });
  };

// delete
export const deleteTopikHuman = async (req, res) => {
    try {
      const topikHuman = await TopikHuman.findByPk(req.params.id);
  
      if (!topikHuman) {
        return res.status(404).json({ msg: "Topik Human Capital tidak ditemukan" });
      }
  
      await TopikHuman.destroy({
        where: { id: req.params.id },
      });
  
      res.status(200).json({ msg: "Topik Human Capital berhasil dihapus" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
  };